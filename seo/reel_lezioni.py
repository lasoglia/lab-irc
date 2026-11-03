#!/usr/bin/env python3
"""
seo/reel_lezioni.py — Monta i reel nuovi delle lezioni (motore «reel2» in promozione/reel.json).

Per ogni reel del regista (seo/regista.py, scritto da seo/reel.py) il cui video non c'è ancora,
né sul sito né su Cloudflare R2: prepara le pagine del fascicolo e la voce (seo/regia.py, voce
Gemini se c'è GEMINI_API_KEY) e monta il video (seo/reel2.mjs) in promozione/reel/. Poi
seo/media_r2.py lo carica su R2. Se un montaggio fallisce, gli altri vanno avanti.

  python seo/reel_lezioni.py
"""

from __future__ import annotations

import json
import os
import subprocess
import sys
import tempfile
from pathlib import Path

RADICE = Path(__file__).resolve().parent.parent
CARTELLA = RADICE / "promozione" / "reel"


def su_r2(nome: str) -> bool:
    try:
        registro = json.loads((RADICE / "data" / "media-r2.json").read_text(encoding="utf-8"))
    except (OSError, ValueError):
        return False
    return f"reel/{nome}" in registro or nome in registro


def main() -> int:
    try:
        elenco = json.loads((RADICE / "promozione" / "reel.json").read_text(encoding="utf-8"))
    except (OSError, ValueError):
        elenco = []
    da_fare = [r for r in elenco if r.get("motore") == "reel2" and r.get("regia")
               and not (CARTELLA / r["video"]).exists() and not su_r2(r["video"])]
    print(f"Reel nuovi da montare: {len(da_fare)}")
    CARTELLA.mkdir(parents=True, exist_ok=True)
    errori = 0
    for r in da_fare:
        with tempfile.TemporaryDirectory() as tmp:
            t = Path(tmp)
            (t / "copione.json").write_text(json.dumps(r["regia"], ensure_ascii=False), encoding="utf-8")
            try:
                subprocess.run([sys.executable, str(RADICE / "seo" / "regia.py"), str(t / "copione.json"),
                                str(t / "regia.json"), str(t / "lavoro")], check=True)
                subprocess.run(["node", str(RADICE / "seo" / "reel2.mjs"), str(t / "regia.json"),
                                str(CARTELLA / r["video"])], check=True, env={**os.environ, "PYTHON": sys.executable})
                print(f"  ✓ {r['titolo']}: {r['video']}")
            except subprocess.CalledProcessError as err:
                print(f"  ✗ {r['titolo']}: {err}")
                (CARTELLA / r["video"]).unlink(missing_ok=True)
                errori += 1
    return 1 if errori and errori == len(da_fare) else 0


if __name__ == "__main__":
    sys.exit(main())
