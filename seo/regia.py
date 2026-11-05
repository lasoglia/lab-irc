#!/usr/bin/env python3
"""
seo/regia.py — Prepara un copione di reel per il motore seo/reel2.mjs.

Il copione dice che cosa si vede e che cosa si dice, inquadratura per inquadratura:
  {"serie", "anno", "colore", "mascotte", "titolo", "fascicolo": "uploads/…pdf",
   "inquadrature": [{"tipo": "gancio|pagina|numero|prof|chiusa", "durata", "testo", "voce",
                     "posa", "citazione" (pagina: frase VERA del fascicolo), "cerchia", "numero"}]}

Questo script, senza IA:
  - per ogni inquadratura «pagina» trova la citazione nel fascicolo (seo/fascicolo.py), disegna
    la pagina, prepara evidenziatore, cerchio e movimento di macchina; se la citazione non c'è,
    l'inquadratura diventa una frase del prof (meglio che mostrare una pagina sbagliata);
  - se c'è la chiave GEMINI_API_KEY (o il campione VOCE_CAMPIONE per le voci clonate), fa dire
    le frasi alla voce dei reel (seo/voce.py; voce scelta: Sadachbia, da narratore appassionato);
    se la voce non riesce (quota di Gemini finita, rete assente) il reel esce con musica e sottotitoli.

USO
---
  python seo/regia.py copione.json uscita.json cartella/
"""

from __future__ import annotations

import json
import os
import subprocess
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import fascicolo as fa  # noqa: E402

RADICE = Path(__file__).resolve().parent.parent
ROMANI = {1: "I", 2: "II", 3: "III", 4: "IV", 5: "V"}
COLORI = {1: "#FF7A59", 2: "#4FB0FF", 3: "#A78BFA", 4: "#FB7BB5", 5: "#FBBF24"}
MASCOTTE = {1: "1-semino", 2: "2-ichthy", 3: "3-navicella", 4: "4-bussolina", 5: "5-terra"}


def movimento(righe: list[dict], cerchio: dict | None) -> tuple[dict, dict]:
    """Da tutta la frase al dettaglio: si parte dal centro delle righe e si stringe sul cerchio."""
    x0 = min(r["x"] for r in righe)
    x1 = max(r["x"] + r["w"] for r in righe)
    y0 = min(r["y"] for r in righe)
    y1 = max(r["y"] + r["h"] for r in righe)
    inizio = {"x": (x0 + x1) / 2, "y": (y0 + y1) / 2, "s": 1.15}
    fuoco = cerchio or righe[-1]
    fine = {"x": fuoco["x"] + fuoco["w"] / 2, "y": fuoco["y"] + fuoco["h"] / 2, "s": 1.65}
    return inizio, fine


def prepara(copione: dict, cartella: Path) -> dict:
    cartella.mkdir(parents=True, exist_ok=True)
    anno = int(copione.get("anno") or 1)
    r = {"serie": copione["serie"], "titolo": copione["titolo"], "anno_romano": ROMANI.get(anno, ""),
         "colore": copione.get("colore") or COLORI.get(anno, "#E3C27A"),
         "mascotte": copione.get("mascotte") or MASCOTTE.get(anno, "1-semino"), "inquadrature": []}
    pdf = RADICE / copione["fascicolo"] if copione.get("fascicolo") else None
    pagine_fatte: dict[int, str] = {}
    for q in copione["inquadrature"]:
        q = dict(q)
        if q["tipo"] == "pagina":
            trovata = fa.trova(pdf, q.get("citazione", ""), q.get("cerchia")) if pdf and pdf.exists() else None
            if not trovata:
                print(f"  ! citazione non trovata nel fascicolo: «{q.get('citazione', '')[:60]}…»: diventa una frase")
                q["tipo"] = "prof"
                q.setdefault("testo", q.get("voce", ""))
            else:
                n = trovata["pagina"]
                if n not in pagine_fatte:
                    pagine_fatte[n] = str(fa.immagine(pdf, n, cartella / f"pagina-{n}.jpg"))
                q["immagine"] = pagine_fatte[n]
                q["evidenzia"] = trovata["righe"]
                if trovata.get("cerchio"):
                    q["cerchio"] = trovata["cerchio"]
                q["zoom"], q["zoom2"] = movimento(trovata["righe"], trovata.get("cerchio"))
                q["fonte"] = f"Dal fascicolo della lezione, pagina {n}"
        r["inquadrature"].append(q)

    # la voce, se c'è la chiave di Gemini o un campione (altrimenti il reel resta con musica e sottotitoli)
    frasi = [q.get("voce", "") for q in r["inquadrature"]]
    if (os.environ.get("GEMINI_API_KEY") or os.environ.get("VOCE_CAMPIONE")) and any(frasi):
        (cartella / "frasi.json").write_text(json.dumps(frasi, ensure_ascii=False), encoding="utf-8")
        for i, q in enumerate(r["inquadrature"]):
            f = voce_di(cartella, i)
            if q.get("voce") and f:
                q["voce_file"] = f
    return r


def voce_di(cartella: Path, i: int) -> str | None:
    """Il file della voce dell'inquadratura i, dopo aver fatto parlare seo/voce.py (una volta sola).
    Se la voce non si può fare (Gemini senza quota, rete assente), il reel esce con musica e sottotitoli:
    meglio un reel senza voce che nessun reel."""
    if not (cartella / "voce").exists():
        esito = subprocess.run([sys.executable, str(RADICE / "seo" / "voce.py"), str(cartella / "frasi.json"),
                                str(cartella / "voce")])
        (cartella / "voce").mkdir(exist_ok=True)
        if esito.returncode != 0:
            print(f"  ! la voce non è riuscita (seo/voce.py è uscito con {esito.returncode}): "
                  "il reel esce con musica e sottotitoli")
    f = cartella / "voce" / f"voce-{i:02d}.wav"
    return str(f) if f.exists() else None


def main() -> int:
    if len(sys.argv) != 4:
        print(__doc__)
        return 2
    copione = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
    r = prepara(copione, Path(sys.argv[3]))
    Path(sys.argv[2]).write_text(json.dumps(r, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"Regia pronta: {len(r['inquadrature'])} inquadrature, voce {'sì' if any(q.get('voce_file') for q in r['inquadrature']) else 'no'}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
