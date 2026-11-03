#!/usr/bin/env python3
"""
seo/video_r2.py — I video dei social stanno su Cloudflare R2, non nel repo.

I video a fumetti (seo/reel.mjs) pesano qualche MB l'uno: salvati nel repo resterebbero
per sempre nella sua storia. Così invece:
  1. seo/reel.mjs monta i video in promozione/reel/ (cartella di lavoro);
  2. questo script li carica nel bucket R2 «lab-irc-social» (cartella reel/), li segna in
     data/video-r2.json e cancella la copia locale, che quindi non entra nel repo;
  3. seo/pubblica.py dà a Instagram, Facebook e Telegram l'indirizzo pubblico di R2;
  4. il bucket cancella da solo i video dopo 30 giorni (regola impostata su Cloudflare):
     i social ne hanno già una copia loro.

Senza le chiavi di R2 non fa nulla: i video restano nel repo e si pubblicano dal sito.
Segreti su GitHub: R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY (e CLOUDFLARE_ACCOUNT_ID).

USO
---
  python seo/video_r2.py           carica i video montati e cancella le copie locali
  python seo/video_r2.py --prova   carica un file di prova, lo legge dall'indirizzo pubblico e lo cancella
"""

from __future__ import annotations

import datetime as dt
import json
import os
import subprocess
import sys
import urllib.request
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import genera as g  # noqa: E402

BUCKET = os.environ.get("R2_BUCKET", "lab-irc-social")
URL_PUBBLICO = os.environ.get("R2_URL_PUBBLICO", "https://pub-77df32d20362411ba59cb8a80c90b295.r2.dev").rstrip("/")
CARTELLA = g.RADICE / "promozione" / "reel"
REGISTRO = g.RADICE / "data" / "video-r2.json"
GIORNI_VITA = 28        # il bucket li cancella dopo 30 giorni: dopo 28 li consideriamo spariti


def leggi(p: Path, vuoto):
    return json.loads(p.read_text(encoding="utf-8")) if p.exists() else vuoto


def registro_valido(oggi: dt.date | None = None) -> dict:
    """video -> data di caricamento, solo quelli ancora nel bucket."""
    oggi = oggi or dt.date.today()
    limite = (oggi - dt.timedelta(days=GIORNI_VITA)).isoformat()
    return {k: v for k, v in leggi(REGISTRO, {}).items() if v >= limite}


def url_video(nome: str) -> str | None:
    """L'indirizzo su R2 del video, se è stato caricato (altrimenti None: si usa il sito)."""
    return f"{URL_PUBBLICO}/reel/{nome}" if nome in registro_valido() else None


def carica(file: Path, chiave_id: str, segreto: str, account: str) -> None:
    """PUT nel bucket con la firma S3 (curl la calcola da sé: --aws-sigv4)."""
    destinazione = f"https://{account}.r2.cloudflarestorage.com/{BUCKET}/reel/{file.name}"
    esito = subprocess.run(
        ["curl", "-sS", "--fail-with-body", "--retry", "3", "--aws-sigv4", "aws:amz:auto:s3",
         "--user", f"{chiave_id}:{segreto}", "-H", "Content-Type: video/mp4",
         "-T", str(file), destinazione],
        capture_output=True, text=True, timeout=600)
    if esito.returncode != 0:
        raise RuntimeError((esito.stdout + esito.stderr).strip()[:300])


def cancella(nome: str, chiave_id: str, segreto: str, account: str) -> None:
    subprocess.run(["curl", "-sS", "--fail-with-body", "-X", "DELETE", "--aws-sigv4", "aws:amz:auto:s3",
                    "--user", f"{chiave_id}:{segreto}",
                    f"https://{account}.r2.cloudflarestorage.com/{BUCKET}/reel/{nome}"],
                   capture_output=True, text=True, timeout=60, check=True)


def prova(chiave_id: str, segreto: str, account: str) -> int:
    """Controllo della configurazione: scrittura, lettura pubblica, cancellazione."""
    import tempfile
    with tempfile.TemporaryDirectory() as cartella:
        file = Path(cartella) / "prova-lab-irc.mp4"
        file.write_bytes(b"prova del Lab IRC")
        try:
            carica(file, chiave_id, segreto, account)
            print(f"✓ R2: scrittura nel bucket {BUCKET}")
        except Exception as err:
            print(f"✗ R2: scrittura non riuscita: {err}")
            return 1
    esito = 0
    if online(f"{URL_PUBBLICO}/reel/prova-lab-irc.mp4"):
        print(f"✓ R2: lettura pubblica da {URL_PUBBLICO}")
    else:
        print(f"✗ R2: {URL_PUBBLICO} non risponde (accesso pubblico attivo?)")
        esito = 1
    try:
        cancella("prova-lab-irc.mp4", chiave_id, segreto, account)
        print("✓ R2: cancellazione")
    except Exception as err:
        print(f"✗ R2: cancellazione non riuscita: {err}")
        esito = 1
    return esito


def online(url: str) -> bool:
    try:
        with urllib.request.urlopen(urllib.request.Request(url, method="HEAD"), timeout=30) as r:
            return r.status == 200
    except Exception:
        return False


def main() -> int:
    chiave_id, segreto = os.environ.get("R2_ACCESS_KEY_ID"), os.environ.get("R2_SECRET_ACCESS_KEY")
    account = os.environ.get("CLOUDFLARE_ACCOUNT_ID")
    if not (chiave_id and segreto and account):
        print("Video su R2: chiavi non impostate, i video restano nel repo.")
        return 1 if "--prova" in sys.argv else 0
    if "--prova" in sys.argv:
        return prova(chiave_id, segreto, account)
    registro = registro_valido()
    caricati = errori = 0
    for file in sorted(CARTELLA.glob("*.mp4")) if CARTELLA.exists() else []:
        try:
            carica(file, chiave_id, segreto, account)
            if not online(f"{URL_PUBBLICO}/reel/{file.name}"):
                raise RuntimeError("caricato, ma l'indirizzo pubblico non risponde")
            registro[file.name] = dt.date.today().isoformat()
            file.unlink()               # la copia locale non serve più e non entra nel repo
            caricati += 1
            print(f"  ✓ su R2: {file.name}")
        except Exception as err:        # se non si carica, resta nel repo e si pubblica dal sito
            errori += 1
            print(f"  ! {file.name} non caricato su R2: {err}")
    REGISTRO.write_text(json.dumps(registro, ensure_ascii=False, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    print(f"Video su R2: {caricati} caricati" + (f", {errori} non riusciti" if errori else ""))
    return 0


if __name__ == "__main__":
    sys.exit(main())
