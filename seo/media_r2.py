#!/usr/bin/env python3
"""
seo/media_r2.py — Immagini e video dei post stanno su Cloudflare R2, non nel repo.

Salvati nel repo, i file dei post resterebbero per sempre nella sua storia, anche dopo
averli cancellati, e ogni versione nuova sarebbe un doppione. Così invece:
  1. seo/cartoline.mjs disegna le immagini dei soli post in coda (o dei candidati del
     piano) in promozione/cartoline/, seo/reel.mjs monta i video in promozione/reel/:
     sono cartelle di lavoro, escluse dal repo (.gitignore);
  2. questo script li carica nel bucket R2 «lab-irc-social» (cartoline/ e reel/), li segna
     in data/media-r2.json e cancella la copia locale;
  3. seo/pubblica.py dà a Instagram, Facebook e Telegram l'indirizzo pubblico di R2;
  4. il bucket cancella da solo ogni file dopo 30 giorni (regola impostata su Cloudflare):
     i post usciti ne hanno già una copia sui social, quelli mai usciti si ridisegnano se
     tornano in coda.

Senza le chiavi di R2 non fa nulla (le immagini della vetrina restano sempre nel repo).
Segreti su GitHub: R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY (e CLOUDFLARE_ACCOUNT_ID).

USO
---
  python seo/media_r2.py           carica immagini e video dei post e cancella le copie locali
  python seo/media_r2.py --prova   carica un file di prova, lo legge dall'indirizzo pubblico e lo cancella
"""

from __future__ import annotations

import datetime as dt
import json
import os
import subprocess
import sys
import urllib.error
import urllib.request
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import genera as g  # noqa: E402

BUCKET = os.environ.get("R2_BUCKET", "lab-irc-social")
URL_PUBBLICO = os.environ.get("R2_URL_PUBBLICO", "https://pub-77df32d20362411ba59cb8a80c90b295.r2.dev").rstrip("/")
# cartella su R2 -> (cartella locale, quali file)
CARTELLE = {"reel": (g.RADICE / "promozione" / "reel", "*.mp4"),
            "cartoline": (g.RADICE / "promozione" / "cartoline", "*.jpg")}
TIPI = {".mp4": "video/mp4", ".jpg": "image/jpeg"}
REGISTRO = g.RADICE / "data" / "media-r2.json"
GIORNI_VITA = 28        # il bucket li cancella dopo 30 giorni: dopo 28 li consideriamo spariti


def leggi(p: Path, vuoto):
    return json.loads(p.read_text(encoding="utf-8")) if p.exists() else vuoto


def registro_valido(oggi: dt.date | None = None) -> dict:
    """video -> data di caricamento, solo quelli ancora nel bucket."""
    oggi = oggi or dt.date.today()
    limite = (oggi - dt.timedelta(days=GIORNI_VITA)).isoformat()
    return {k: v for k, v in leggi(REGISTRO, {}).items() if v >= limite}


def url(cartella: str, nome: str) -> str | None:
    """L'indirizzo su R2 del file, se è stato caricato (altrimenti None: si usa il sito)."""
    return f"{URL_PUBBLICO}/{cartella}/{nome}" if f"{cartella}/{nome}" in registro_valido() else None


def url_video(nome: str) -> str | None:
    return url("reel", nome)


def url_immagine(nome: str) -> str | None:
    return url("cartoline", nome)


def carica(file: Path, chiave_id: str, segreto: str, account: str, cartella: str = "reel") -> None:
    """PUT nel bucket con la firma S3 (curl la calcola da sé: --aws-sigv4)."""
    destinazione = f"https://{account}.r2.cloudflarestorage.com/{BUCKET}/{cartella}/{file.name}"
    esito = subprocess.run(
        ["curl", "-sS", "--fail-with-body", "--retry", "3", "--aws-sigv4", "aws:amz:auto:s3",
         "--user", f"{chiave_id}:{segreto}", "-H", f"Content-Type: {TIPI.get(file.suffix, 'application/octet-stream')}",
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


def online(url: str, tentativi: int = 4) -> bool:
    """Il file si legge dall'indirizzo pubblico? (GET di un byte, con qualche tentativo:
    appena caricato può servire qualche secondo)."""
    import time
    ultimo = ""
    for n in range(tentativi):
        richiesta = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (LabIRC social)", "Range": "bytes=0-0"})
        try:
            with urllib.request.urlopen(richiesta, timeout=30) as r:
                if r.status in (200, 206):
                    return True
                ultimo = f"HTTP {r.status}"
        except urllib.error.HTTPError as err:
            ultimo = f"HTTP {err.code}: {err.read()[:120]!r}"
        except Exception as err:
            ultimo = str(err)
        time.sleep(3 * (n + 1))
    print(f"  (risposta di {url}: {ultimo})")
    return False


def main() -> int:
    chiave_id, segreto = os.environ.get("R2_ACCESS_KEY_ID"), os.environ.get("R2_SECRET_ACCESS_KEY")
    account = os.environ.get("CLOUDFLARE_ACCOUNT_ID")
    if not (chiave_id and segreto and account):
        print("R2: chiavi non impostate, immagini e video restano qui.")
        return 1 if "--prova" in sys.argv else 0
    if "--prova" in sys.argv:
        return prova(chiave_id, segreto, account)
    registro = registro_valido()
    caricati = errori = 0
    for cartella, (locale, schema) in CARTELLE.items():
        for file in sorted(locale.glob(schema)) if locale.exists() else []:
            if file.name.startswith("vetrina-"):     # la vetrina resta nel repo
                continue
            try:
                carica(file, chiave_id, segreto, account, cartella)
                if not online(f"{URL_PUBBLICO}/{cartella}/{file.name}"):
                    raise RuntimeError("caricato, ma l'indirizzo pubblico non risponde")
                registro[f"{cartella}/{file.name}"] = dt.date.today().isoformat()
                file.unlink()               # la copia locale non serve più
                caricati += 1
                print(f"  ✓ su R2: {cartella}/{file.name}")
            except Exception as err:        # se non si carica, resta qui e si pubblica dal sito
                errori += 1
                print(f"  ! {cartella}/{file.name} non caricato su R2: {err}")
    REGISTRO.write_text(json.dumps(registro, ensure_ascii=False, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    print(f"File dei post su R2: {caricati} caricati" + (f", {errori} non riusciti" if errori else ""))
    return 0


if __name__ == "__main__":
    sys.exit(main())
