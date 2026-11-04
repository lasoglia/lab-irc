#!/usr/bin/env python3
"""
seo/personaggi.py — Personaggi inventati per i reel (figure ricreate, mai persone reali).

Regola del Lab (scelta del docente, 4 novembre 2026): si possono mostrare PERSONAGGI INVENTATI E
GENERICI («un pescatore di Cafarnao», «una mercante di Roma», «un monaco copista»), in stile
illustrato o pittorico, sempre con la scritta «personaggio inventato · immagine generata con IA».
Mai: Gesù, Dio, Maria, santi, angeli, papi, personaggi biblici o storici veri, persone reali,
bambini o ragazzi, scene violente o che prendono in giro una fede o un popolo.

Chi dipinge: Nano Banana (immagini di Google Gemini, segreto GEMINI_API_KEY) se il piano gratuito lo
permette; altrimenti FLUX su Cloudflare Workers AI (gratis, segreti CLOUDFLARE_ACCOUNT_ID e
CLOUDFLARE_API_TOKEN). Il controllo delle parole vietate si fa PRIMA di chiedere l'immagine.

USO
---
  python seo/personaggi.py --prova "un pescatore di Cafarnao che ripara le reti al tramonto" prova.jpg
  python seo/personaggi.py --modelli      quali modelli di immagini vede la chiave di Gemini
"""

from __future__ import annotations

import base64
import json
import os
import re
import sys
import urllib.error
import urllib.request
from pathlib import Path

ETICHETTA = "personaggio inventato · immagine generata con IA"
VIETATE = [
    r"ges[uù]", r"\bcristo\b", r"\bdio\b", r"\bmaria\b", r"madonna", r"\bsant[oaie]?\b", r"\bsan\b", r"angel",
    r"\bpap[ai]\b", r"profet", r"apostol", r"\bmos[eè]\b", r"abramo", r"\bpietro\b", r"\bpaolo\b", r"\bdavide\b",
    r"bambin", r"ragazz", r"\bfanciull", r"bimb", r"\bchild", r"\bkid", r"\bboy\b", r"\bgirl\b", r"teen",
    r"jesus", r"\bgod\b", r"\bmary\b", r"\bsaint", r"\bpope\b", r"prophet", r"apostle",
    r"sangue", r"blood", r"crocifiss", r"crucif", r"violen", r"cadaver", r"\bmort[oi]\b",
]
STILE = ("Painterly digital illustration in a warm, cinematic storybook style (not photorealistic), soft rim "
         "light, deep indigo night tones with golden highlights, vertical 9:16 composition with empty space in "
         "the upper third for text. One invented, generic adult character from the past, respectful and "
         "dignified, historically plausible clothing. No text, no letters, no logos, no halos, no religious "
         "figures, no children. Scene: ")
NANO_BANANA = ["gemini-2.5-flash-image", "gemini-3.1-flash-image-preview", "gemini-3-pro-image-preview"]


def vietata(descrizione: str) -> str | None:
    """La prima parola vietata trovata (oppure None)."""
    t = descrizione.lower()
    return next((r for r in VIETATE if re.search(r, t)), None)


def _gemini(modello: str, chiave: str, testo: str) -> bytes:
    corpo = {"contents": [{"parts": [{"text": testo}]}],
             "generationConfig": {"responseModalities": ["IMAGE"], "imageConfig": {"aspectRatio": "9:16"}}}
    richiesta = urllib.request.Request(
        f"https://generativelanguage.googleapis.com/v1beta/models/{modello}:generateContent",
        data=json.dumps(corpo).encode(), method="POST",
        headers={"Content-Type": "application/json", "x-goog-api-key": chiave})
    with urllib.request.urlopen(richiesta, timeout=180) as r:
        dati = json.loads(r.read())
    for parte in dati.get("candidates", [{}])[0].get("content", {}).get("parts", []):
        if parte.get("inlineData", {}).get("data"):
            return base64.b64decode(parte["inlineData"]["data"])
    raise RuntimeError("nessuna immagine nella risposta")


def dipingi(descrizione: str) -> tuple[bytes, str]:
    """(immagine, chi l'ha dipinta). Solleva ValueError se la descrizione chiede qualcosa di vietato."""
    if (v := vietata(descrizione)):
        raise ValueError(f"descrizione non ammessa dalle regole del Lab ({v})")
    testo = STILE + descrizione
    chiave = os.environ.get("GEMINI_API_KEY", "").strip()
    if chiave:
        for modello in NANO_BANANA:
            try:
                return _gemini(modello, chiave, testo), f"Nano Banana ({modello})"
            except urllib.error.HTTPError as err:
                corpo = re.sub(r"\s+", " ", err.read()[:300].decode("utf-8", "replace"))[:160]
                print(f"  · {modello}: {err.code} {corpo}")
            except Exception as err:
                print(f"  · {modello}: {err}")
    account, token = os.environ.get("CLOUDFLARE_ACCOUNT_ID", ""), os.environ.get("CLOUDFLARE_API_TOKEN", "")
    if account and token:
        sys.path.insert(0, str(Path(__file__).resolve().parent))
        import immagini_ia
        vecchio, immagini_ia.STILE = immagini_ia.STILE, "No text."   # lo stile degli sfondi esclude le persone
        try:
            return immagini_ia.dipingi(testo, account, token), "FLUX (Cloudflare)"
        finally:
            immagini_ia.STILE = vecchio
    raise RuntimeError("nessun servizio di immagini disponibile")


def modelli() -> list[str]:
    chiave = os.environ.get("GEMINI_API_KEY", "").strip()
    richiesta = urllib.request.Request("https://generativelanguage.googleapis.com/v1beta/models?pageSize=200",
                                       headers={"x-goog-api-key": chiave})
    with urllib.request.urlopen(richiesta, timeout=60) as r:
        dati = json.loads(r.read())
    return [m["name"].split("/")[-1] for m in dati.get("models", []) if "image" in m["name"].lower()]


def main() -> int:
    if sys.argv[1:2] == ["--modelli"]:
        print("Modelli di immagini visti dalla chiave: " + ", ".join(modelli()))
        return 0
    if len(sys.argv) != 4 or sys.argv[1] != "--prova":
        print(__doc__)
        return 2
    immagine, chi = dipingi(sys.argv[2])
    Path(sys.argv[3]).write_bytes(immagine)
    print(f"Personaggio dipinto da {chi}: {sys.argv[3]}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
