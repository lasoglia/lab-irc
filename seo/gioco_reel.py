#!/usr/bin/env python3
"""
seo/gioco_reel.py — Dal video di una partita (seo/gioco_registra.mjs) al reel e al post del gioco.

Legge i «momenti» della registrazione (quando si parla, quando arriva la domanda, l'errore,
l'Ombra, la risposta giusta) e scrive:
  - il copione per seo/regia.py + seo/reel2.mjs: pezzi della partita in una cornice da schermo,
    con un'etichetta sopra e la voce sotto;
  - i testi del post (Facebook, Instagram, Telegram), con la presentazione che il docente ha
    scritto nella prima schermata del gioco.

Niente IA: le frasi sono queste, scelte e controllate una volta per tutte, e dicono solo ciò che
si vede nel video. Due varianti, per non ripetere lo stesso reel due giovedì di fila.
Non si promette l'accesso libero: la verifica si apre in classe con la password del docente.

USO
---
  python seo/gioco_reel.py uploads/<gioco>.html momenti.json <video: file o indirizzo> copione.json post.json [variante]
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

RADICE = Path(__file__).resolve().parent.parent
URL_SITO = "https://www.labirc.it"
ANNI = {"1": "prima", "2": "seconda", "3": "terza", "4": "quarta", "5": "quinta"}

# (etichetta sullo schermo, voce) per ogni pezzo; *parola* = in corsivo oro
VARIANTI = [
    {"gancio": ("E se la verifica fosse *un videogioco*?", "E se la verifica di religione fosse un videogioco?"),
     "domanda": ("Rispondi ai *testimoni*", "Incontri i testimoni, e ognuno ti fa una domanda."),
     "sbagliata": ("Sbagli? Arriva *un'Ombra*.", "Se sbagli, l'errore prende forma: un'Ombra da dissolvere."),
     "ombra": ("", "La dissolvi con la spada, poi torni e riprovi."),
     "giusta": ("Ogni risposta giusta: *un frammento*", "Ogni risposta giusta vale un frammento del documento."),
     "chiusa": ("Si gioca in classe, con la *password del prof*",
                "Si gioca in classe, con la password del prof. Tutto il resto è su labirc.it.")},
    {"gancio": ("La verifica di fine unità? *Si gioca.*", "La verifica di fine unità? Si gioca."),
     "domanda": ("Ogni testimone, *una domanda*", "Cammini, esplori, e chi incontri ti fa una domanda."),
     "sbagliata": ("L'errore diventa *un'Ombra*", "Sbagli? L'errore diventa un'Ombra."),
     "ombra": ("", "Prima la dissolvi, poi ci riprovi."),
     "giusta": ("Risposta giusta, *frammento conquistato*", "Con la risposta giusta conquisti un frammento."),
     "chiusa": ("La verifica si apre in classe, con la *password del prof*",
                "La verifica si apre in classe, con la password del prof. Il resto è su labirc.it.")},
]
POSE = {"gancio": "occhiolino", "domanda": "spiega", "sbagliata": "sorpreso", "ombra": "appunti",
        "giusta": "sorriso", "chiusa": "saluta"}


def scheda_gioco(gioco: str) -> dict:
    """Titolo e anno dal catalogo delle verifiche del sito."""
    try:
        dati = json.loads((RADICE / "data" / "verifiche.json").read_text(encoding="utf-8"))
    except (OSError, ValueError):
        dati = {}
    nome = "/" + gioco.lstrip("/")
    for v in dati.get("verifiche", []):
        if v.get("file") == nome:
            return {"titolo": v.get("titolo", ""), "anno": str(v.get("anno", "")), "uda": v.get("uda", "")}
    return {"titolo": Path(gioco).stem, "anno": "", "uda": ""}


def momento(m: dict, cosa: str) -> float | None:
    return next((x["s"] for x in m.get("momenti", []) if x["cosa"] == cosa), None)


def copione(gioco: str, m: dict, video: str, variante: int = 0) -> dict:
    v = VARIANTI[variante % len(VARIANTI)]
    s = scheda_gioco(gioco)
    # (pezzo, inizio nel video, durata); se un momento manca, il pezzo salta
    pezzi = [("gancio", momento(m, "parla"), 3.0), ("domanda", momento(m, "domanda"), 4.0),
             ("sbagliata", (momento(m, "sbagliata") or 0) - 0.6 if momento(m, "sbagliata") else None, 4.0),
             ("ombra", (momento(m, "ombra") or 0) + 0.4 if momento(m, "ombra") else None, 3.6),
             ("giusta", (momento(m, "giusta") or 0) - 0.2 if momento(m, "giusta") else None, 4.2)]
    inquadrature = []
    for nome, da, durata in pezzi:
        if da is None:
            continue
        testo, voce = v[nome]
        q = {"tipo": "clip", "video": video, "da": round(max(0.0, da), 2), "durata": durata, "voce": voce, "posa": POSE[nome]}
        if testo:
            q["testo"] = testo
        inquadrature.append(q)
    testo, voce = v["chiusa"]
    inquadrature.append({"tipo": "chiusa", "sopra": "Verifica di fine unità", "testo": testo, "voce": voce,
                         "durata": 4.0, "posa": POSE["chiusa"]})
    return {"serie": "Il gioco del Lab", "anno": int(s["anno"] or 1),
            "titolo": f"{s['titolo']} · verifica di fine unità", "inquadrature": inquadrature}


def post(gioco: str, m: dict, variante: int = 0) -> dict:
    s = scheda_gioco(gioco)
    classe = f" di {ANNI[s['anno']]}" if s["anno"] in ANNI else ""
    presentazione = (m.get("presentazione") or "").strip()
    url = f"{URL_SITO}/#verifiche"
    apertura = ["La verifica di fine unità può essere un videogioco?", "Una verifica che si gioca."][variante % 2]
    corpo = (f"«{s['titolo']}» è il gioco di verifica{classe}: un mondo a blocchi da esplorare, "
             "dove chi incontri ti fa una domanda. Rispondi bene e ricevi un frammento; sbagli, e l'errore "
             "diventa un'Ombra da dissolvere prima di riprovare.")
    chiusura = "Si gioca in classe: la verifica si apre con la password che il docente scrive alla lavagna."
    fb = "\n\n".join(x for x in [apertura, corpo, presentazione, chiusura,
                                 "Per chi insegna religione: tutti i giochi sono nella pagina Verifiche del Lab IRC."] if x)
    ig = "\n\n".join([apertura, corpo, chiusura, "Tutti i giochi del Lab: link nella bio."])
    tg = f"🎮 {s['titolo']}\n\n{corpo}\n\n{chiusura}"
    return {"titolo": f"Il gioco: {s['titolo']}", "anno": s["anno"], "gioco": gioco, "url": url,
            "facebook": fb + "\n\n" + url, "instagram": ig + "\n\n#religionecattolica #irc #gamification #scuola",
            "telegram": tg + "\n\n" + url}


def main() -> int:
    if len(sys.argv) not in (6, 7):
        print(__doc__)
        return 2
    gioco, f_momenti, video, f_copione, f_post = sys.argv[1:6]
    variante = int(sys.argv[6]) if len(sys.argv) == 7 else 0
    m = json.loads(Path(f_momenti).read_text(encoding="utf-8"))
    Path(f_copione).write_text(json.dumps(copione(gioco, m, video, variante), ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    Path(f_post).write_text(json.dumps(post(gioco, m, variante), ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print(f"Copione e post del gioco pronti (variante {variante % len(VARIANTI)})")
    return 0


if __name__ == "__main__":
    sys.exit(main())
