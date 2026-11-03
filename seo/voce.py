#!/usr/bin/env python3
"""
seo/voce.py — La voce del prof nei reel, clonata gratis con un modello libero (XTTS-v2).

Gira dentro le Action di GitHub (il modello si scarica da Hugging Face e resta in cache).
Il campione della voce del prof NON sta nel repo, che è pubblico: arriva dal segreto
VOCE_CAMPIONE (un breve audio Ogg/Opus in base64). Senza il segreto non fa nulla.

Per ogni frase scrive un WAV (24 kHz, mono) pulito e a volume giusto, con un tocco di
calore; poi seo/reel2.mjs le mette nel video sotto i sottotitoli.

Licenza del modello: Coqui Public Model License (uso non commerciale): va bene per il Lab,
che è gratuito. Nei video con questa voce si scrive «voce generata con IA».

USO
---
  python seo/voce.py frasi.json cartella/     frasi.json = ["prima frase", "seconda", ...]
"""

from __future__ import annotations

import base64
import json
import os
import subprocess
import sys
import tempfile
from pathlib import Path

MODELLO = "tts_models/multilingual/multi-dataset/xtts_v2"
# un po' di calore e volume costante, come il campione pulito
FILTRO = ("highpass=f=70,equalizer=f=180:t=q:w=1.0:g=2,highshelf=f=9000:g=-1.5,"
          "acompressor=threshold=-22dB:ratio=2.5:attack=10:release=160:makeup=3,loudnorm=I=-17:TP=-1.5")


def campione(cartella: Path) -> Path | None:
    dati = os.environ.get("VOCE_CAMPIONE", "").strip()
    if not dati:
        return None
    ogg = cartella / "campione.ogg"
    ogg.write_bytes(base64.b64decode(dati))
    wav = cartella / "campione.wav"
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(ogg), "-ac", "1", "-ar", "24000", str(wav)], check=True)
    return wav


def main() -> int:
    if len(sys.argv) != 3:
        print(__doc__)
        return 2
    frasi = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
    uscita = Path(sys.argv[2])
    uscita.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        riferimento = campione(Path(tmp))
        if riferimento is None:
            print("Voce: segreto VOCE_CAMPIONE non impostato, i video restano senza voce.")
            return 0
        os.environ.setdefault("COQUI_TOS_AGREED", "1")
        from TTS.api import TTS   # import qui: è pesante e serve solo con il campione
        tts = TTS(MODELLO)
        for i, frase in enumerate(frasi):
            grezzo = Path(tmp) / f"g{i}.wav"
            tts.tts_to_file(text=frase, speaker_wav=str(riferimento), language="it", file_path=str(grezzo),
                            temperature=0.7, speed=1.0, split_sentences=False)
            finale = uscita / f"voce-{i:02d}.wav"
            subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(grezzo), "-af", FILTRO, "-ac", "1", "-ar", "24000",
                            str(finale)], check=True)
            print(f"  ✓ {finale.name}: {frase[:60]}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
