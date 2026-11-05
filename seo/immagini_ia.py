#!/usr/bin/env python3
"""
seo/immagini_ia.py — Gli sfondi pittorici dei video e delle copertine, fatti con l'IA (gratis).

Per ogni video del motore a fumetti (lezioni con il reel di prima, grande domanda, Shabbat) e
per le copertine della domenica e del sabato (i reel del regista, motore «reel2», non ne hanno
bisogno: mostrano pagine vere e scene della lezione):
  1. Claude descrive in inglese una scena d'atmosfera legata al tema: luoghi, paesaggi,
     oggetti, luce. Mai persone, volti, Dio, Gesù, Maria, santi o angeli; mai scritte.
  2. Cloudflare Workers AI (modello FLUX.1 schnell, nella quota gratuita giornaliera)
     la dipinge; l'immagine va in promozione/immagini-ia/.
  3. Negli elenchi (promozione/reel.json, reel-domenica.json, domenica.json, sabato.json)
     il post riceve "sfondo": seo/reel.mjs e seo/cartoline.mjs la mettono dietro, scurita.

Senza le chiavi di Cloudflare non fa nulla (e non chiama nemmeno Claude): i video e le
copertine escono come prima. Segreti su GitHub:
  CLOUDFLARE_ACCOUNT_ID   l'identificativo dell'account Cloudflare
  CLOUDFLARE_API_TOKEN    una chiave con il permesso «Workers AI»

  data/immagini-ia.json   le descrizioni già scritte, che fanno da cache

USO
---
  python seo/immagini_ia.py
"""

from __future__ import annotations

import base64
import hashlib
import json
import os
import subprocess
import sys
import urllib.error
import urllib.request
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import genera as g  # noqa: E402
import promozione as pr  # noqa: E402

CARTELLA = g.RADICE / "promozione" / "immagini-ia"
CACHE = g.RADICE / "data" / "immagini-ia.json"
MODELLO_IMMAGINI = os.environ.get("CLOUDFLARE_MODELLO", "@cf/black-forest-labs/flux-1-schnell")
MASSIMO_PER_GIRO = 12          # immagini nuove per esecuzione: resta ben dentro la quota gratuita
STILE = ("painterly digital illustration, soft cinematic light, wide atmospheric composition, "
         "deep indigo night palette with violet, cyan and warm gold accents, "
         "no text, no letters, no people, no faces, no hands")

SCHEMA = {"type": "object", "properties": {"scena": {"type": "string"}},
          "required": ["scena"], "additionalProperties": False}

ISTRUZIONI = """Descrivi in inglese lo sfondo pittorico di un post social del Lab IRC, un \
sito di materiali di Religione Cattolica per la scuola superiore. Ricevi il titolo e i \
testi del post. Restituisci in «scena» una descrizione visiva di massimo 250 caratteri, \
in inglese, di un luogo, un paesaggio, degli oggetti o una luce che evocano il tema \
(per esempio: a starry sky over an old observatory; a desert cave at dusk; oil lamps on \
a stone windowsill). Regole vincolanti: nessuna persona, nessun volto, nessuna mano, \
nessuna figura umana o animale antropomorfo; mai Dio, Gesù, Maria, santi, angeli o \
profeti; niente scritte, lettere o numeri; niente di violento o cupo. Per temi ebraici \
solo oggetti e luoghi rispettosi (candele, rotoli chiusi, una sinagoga vista da fuori), \
mai simboli usati a sproposito."""


def leggi(p: Path, vuoto):
    return json.loads(p.read_text(encoding="utf-8")) if p.exists() else vuoto


def scrivi(p: Path, dati) -> None:
    p.write_text(json.dumps(dati, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def descrizione(voce: dict) -> str:
    scene = voce.get("carosello") or voce.get("scene") or []
    return (f"Titolo: {voce.get('titolo', '')}\n" + (f"Sottotitolo: {voce['frase']}\n" if voce.get("frase") else "")
            + "\n".join(f"- {s.get('titolo', '')}: {s.get('testo', '')}" for s in scene[:8]))


def chiave_sfondo(nome_elenco: str, v: dict) -> str | None:
    """La chiave del post a cui appartiene lo sfondo, o None se quel post non ne usa uno:
    i reel del regista (motore «reel2») mostrano pagine vere e scene della lezione, non sfondi dipinti."""
    if nome_elenco.startswith("reel"):
        return None if v.get("motore") == "reel2" else v.get("origine")
    return v.get("chiave")


def voci_da_dipingere(elenchi: dict[str, list[dict]]) -> dict[str, dict]:
    """Un'immagine per post: il video usa quella del suo post (chiave «origine»)."""
    voci: dict[str, dict] = {}
    for nome, elenco in elenchi.items():
        for v in elenco:
            k = chiave_sfondo(nome, v)
            if k and (k not in voci or v.get("carosello")):
                voci[k] = v
    return voci


def dipingi(scena: str, account: str, chiave: str) -> bytes:
    """Cloudflare Workers AI: restituisce l'immagine (in base64 dentro result.image)."""
    richiesta = urllib.request.Request(
        f"https://api.cloudflare.com/client/v4/accounts/{account}/ai/run/{MODELLO_IMMAGINI}",
        data=json.dumps({"prompt": f"{scena}. {STILE}", "steps": 6}).encode(),
        headers={"Authorization": f"Bearer {chiave}", "Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(richiesta, timeout=120) as r:
            corpo = r.read()
    except urllib.error.HTTPError as err:
        raise RuntimeError(f"Cloudflare {err.code}: {err.read()[:300]!r}") from None
    if corpo[:3] == b"\xff\xd8\xff" or corpo[:8] == b"\x89PNG\r\n\x1a\n":
        return corpo                     # alcuni modelli rispondono direttamente con l'immagine
    dati = json.loads(corpo)
    if not dati.get("success", True) or not (dati.get("result") or {}).get("image"):
        raise RuntimeError(f"Cloudflare: {dati.get('errors') or 'nessuna immagine'}")
    return base64.b64decode(dati["result"]["image"])


def salva_jpg(immagine: bytes, destinazione: Path) -> None:
    destinazione.parent.mkdir(parents=True, exist_ok=True)
    if immagine[:3] == b"\xff\xd8\xff":
        destinazione.write_bytes(immagine)
        return
    provvisorio = destinazione.with_suffix(".tmp")
    provvisorio.write_bytes(immagine)
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(provvisorio), "-q:v", "3", str(destinazione)], check=True)
    provvisorio.unlink()


def main() -> int:
    account, chiave = os.environ.get("CLOUDFLARE_ACCOUNT_ID"), os.environ.get("CLOUDFLARE_API_TOKEN")
    if not account or not chiave:
        print("Immagini IA: chiavi di Cloudflare non impostate, niente sfondi (i post escono come prima).")
        return 0

    elenchi = {nome: leggi(g.RADICE / "promozione" / nome, [])
               for nome in ("reel.json", "reel-domenica.json", "reel-vetrina.json", "domenica.json", "sabato.json")}
    voci = voci_da_dipingere(elenchi)
    cache = leggi(CACHE, {})
    client = None
    nuove = errori = 0
    for k, v in voci.items():
        firma = hashlib.sha256(descrizione(v).encode()).hexdigest()[:12]
        voce = cache.get(k)
        if voce and voce.get("firma") == firma and (g.RADICE / voce["file"]).exists():
            continue
        if nuove >= MASSIMO_PER_GIRO:
            break
        try:
            if not voce or voce.get("firma") != firma:
                if client is None:
                    import anthropic
                    client = anthropic.Anthropic()
                dati, _ = pr.chiama_claude(client, ISTRUZIONI, descrizione(v), SCHEMA, "low", 2000)
                voce = {"firma": firma, "scena": dati["scena"][:400],
                        "file": f"promozione/immagini-ia/{g.slug(k)[:40]}-{firma}.jpg"}
            salva_jpg(dipingi(voce["scena"], account, chiave), g.RADICE / voce["file"])
            cache[k] = voce
            nuove += 1
            print(f"  ✓ sfondo {k}: {voce['scena'][:70]}…")
        except Exception as err:   # un'immagine che non arriva non blocca il resto
            errori += 1
            print(f"  ! sfondo {k}: {err}")
            if errori >= 3:
                print("  ! troppi errori di fila: mi fermo qui per oggi.")
                break

    # gli elenchi ricevono lo sfondo; il nome del video cambia, così seo/reel.mjs lo rimonta con lo sfondo
    for nome, elenco in elenchi.items():
        for v in elenco:
            k = chiave_sfondo(nome, v)
            voce = cache.get(k) if k else None
            if voce and (g.RADICE / voce["file"]).exists():
                v["sfondo"] = voce["file"]
                if nome.startswith("reel") and not v["video"].endswith("-ia.mp4"):
                    v["video"] = v["video"].removesuffix(".mp4") + "-ia.mp4"
        if (g.RADICE / "promozione" / nome).exists():
            scrivi(g.RADICE / "promozione" / nome, elenco)

    # via le immagini e le descrizioni dei post che non ci sono più
    cache = {k: v for k, v in cache.items() if k in voci}
    scrivi(CACHE, cache)
    usati = {Path(v["file"]).name for v in cache.values()}
    for f in CARTELLA.glob("*.jpg") if CARTELLA.exists() else []:
        if f.name not in usati:
            f.unlink()
    print(f"Immagini IA: {nuove} nuove, {len(usati)} in uso" + (f", {errori} non riuscite" if errori else ""))
    return 0


if __name__ == "__main__":
    sys.exit(main())
