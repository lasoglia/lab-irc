#!/usr/bin/env python3
"""
seo/reel_lezioni.py — Monta i reel nuovi delle lezioni (motore «reel2» in promozione/reel.json).

Per ogni reel del regista (seo/regista.py, scritto da seo/reel.py) il cui video non c'è ancora,
né sul sito né su Cloudflare R2: registra a schermo la lezione interattiva (seo/lezione_registra.mjs)
per le inquadrature «lezione», prepara le pagine del fascicolo e la voce (seo/regia.py, voce
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
sys.path.insert(0, str(RADICE / "seo"))
import regista  # noqa: E402
CARTELLA = RADICE / "promozione" / "reel"


def su_r2(nome: str) -> bool:
    try:
        registro = json.loads((RADICE / "data" / "media-r2.json").read_text(encoding="utf-8"))
    except (OSError, ValueError):
        return False
    return f"reel/{nome}" in registro or nome in registro


def momento(m: dict, *nomi: str) -> float | None:
    for nome in nomi:
        s = next((x["s"] for x in m.get("momenti", []) if x["cosa"] == nome), None)
        if s is not None:
            return s
    return None


def con_lezione(copione: dict, cartella: Path) -> dict:
    """Le inquadrature «lezione» diventano pezzi della lezione interattiva registrata («clip»);
    se la lezione non c'è o la registrazione fallisce, frasi del prof."""
    lezioni = [q for q in copione.get("inquadrature", []) if q.get("tipo") == "lezione"]
    if not lezioni:
        return copione
    video, m = cartella / "lezione.mp4", None
    scelte = sorted({int(q["scena"]) for q in lezioni if int(q.get("scena") or 0) > 0})
    if copione.get("artefatto"):
        try:
            subprocess.run(["node", str(RADICE / "seo" / "lezione_registra.mjs"), copione["artefatto"], str(video),
                            str(cartella / "momenti.json"), ",".join(map(str, scelte))], check=True, cwd=RADICE)
            m = json.loads((cartella / "momenti.json").read_text(encoding="utf-8"))
        except (subprocess.CalledProcessError, OSError, ValueError) as err:
            print(f"  ! registrazione della lezione non riuscita ({err}): uso frasi del prof")
    for q in lezioni:
        da = momento(m, f"scena {q.get('scena')}") if m and video.exists() else None
        if da is not None:   # la scena che illustra la frase: 5 secondi registrati, se ne usano fino a 4,6
            q.update({"tipo": "clip", "video": str(video), "da": round(da + 0.3, 2),
                      "durata": min(max(float(q.get("durata") or 4), 3.5), 4.6)})
        else:
            q["tipo"] = "prof"
            q.setdefault("testo", q.get("voce", ""))
    return copione


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
            try:
                copione = dict(r["regia"])
                if "artefatto" not in copione:   # copioni scritti prima della lezione interattiva
                    a = regista.artefatto_di(r)
                    copione["artefatto"] = str(a.relative_to(RADICE)) if a else ""
                if copione.get("artefatto") and not copione.get("scene_lezione"):
                    copione["scene_lezione"] = regista.scene_di(r)
                copione = con_lezione(regista.garantisci_lezione(copione), t)
                (t / "copione.json").write_text(json.dumps(copione, ensure_ascii=False), encoding="utf-8")
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
