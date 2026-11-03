#!/usr/bin/env python3
"""
seo/reel.py — I video a fumetti delle lezioni (uno per ogni lezione che esce).

Per ogni mercoledì dei prossimi 7 giorni prende la lezione approvata in
data/social-coda.json che esce prima (il lunedì; senza coda, le prossime 5 del kit), chiede a Claude il
copione (un gancio, una frase breve per ogni scheda del carosello, le didascalie)
e lo scrive in promozione/reel.json. Il video lo monta seo/reel.mjs: il prof
(l'avatar) risponde nei fumetti, sopra i disegni del carosello. Lo pubblica
seo/pubblica.py il mercoledì (giorno «video» di seo/social_calendario.py).

  promozione/reel.json     i video da montare e pubblicare
  data/reel.json           i copioni già scritti, che fanno da cache

USO
---
  python seo/reel.py            prepara i copioni che mancano
  python seo/reel.py --senza-ia senza Claude: il copione è preso dal carosello
"""

from __future__ import annotations

import argparse
import datetime as dt
import hashlib
import json
import os
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import genera as g  # noqa: E402
import promozione as pr  # noqa: E402
import coda as coda_agenti  # noqa: E402
import social_calendario as cal  # noqa: E402
from rubriche import oggi_in_italia, pubblicato  # noqa: E402

GIORNI_AVANTI = 7           # i video si preparano per le lezioni dei prossimi 7 giorni
VERSIONE = "1"              # cambiala per far riscrivere i copioni

SCHEMA_REEL = {
    "type": "object",
    "properties": {
        "gancio": {"type": "string"},
        "scene": {"type": "array", "items": {
            "type": "object",
            "properties": {"titolo": {"type": "string"}, "testo": {"type": "string"}},
            "required": ["titolo", "testo"], "additionalProperties": False}},
        "facebook": {"type": "string"},
        "instagram": {"type": "string"},
        "telegram": {"type": "string"},
        "hashtag": {"type": "array", "items": {"type": "string"}},
    },
    "required": ["gancio", "scene", "facebook", "instagram", "telegram", "hashtag"],
    "additionalProperties": False,
}

ISTRUZIONI_REEL = """Scrivi il copione di un reel di 30 secondi per i social del Lab IRC, \
il sito di materiali di Religione Cattolica di Matteo Sestili, docente nella scuola \
secondaria di secondo grado. Il reel è un video verticale senza voce: scorrono delle \
scritte sopra le illustrazioni della lezione, una scena dopo l'altra. Lo guardano \
soprattutto colleghi docenti di religione e studenti, sul telefono, mentre scorrono.

Ricevi il titolo della lezione, la frase della cartolina e le schede del suo carosello. \
Restituisci nel formato JSON richiesto:
- gancio: la prima scritta, quella che ferma il pollice. Massimo 60 caratteri: una \
domanda vera o un'immagine concreta presa dal materiale, mai una formula generica;
- scene: esattamente una scena per ogni scheda del carosello, nello stesso ordine. Per \
ognuna: titolo (massimo 28 caratteri) e testo (massimo 90 caratteri), da leggere in \
quattro secondi: l'idea della scheda detta in una frase sola, semplice e viva;
- facebook: 200-400 caratteri; instagram: 200-500 caratteri, paragrafi corti, senza \
hashtag; telegram: 150-300 caratteri. Presentano il reel («la lezione in 30 secondi») \
e invitano ad aprire la lezione completa sul sito;
- hashtag: da 3 a 5, senza #, sempre religionecattolica e irc.

Regole vincolanti:
- Solo fatti presenti nel materiale: niente date, nomi o citazioni inventati.
- Al massimo due emoji per didascalia, nessuna nel gancio e nelle scene.
- Non scrivere link o «clicca qui»: il link alla lezione lo aggiunge il sistema.
- Italiano corretto e naturale.

""" + pr.TONO


def leggi(p: Path, vuoto):
    return json.loads(p.read_text(encoding="utf-8")) if p.exists() else vuoto


def scrivi(p: Path, dati) -> None:
    p.write_text(json.dumps(dati, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def impronta(*parti) -> str:
    return hashlib.sha256(json.dumps(parti, ensure_ascii=False, sort_keys=True).encode()).hexdigest()[:8]


def copione_di_riserva(c: dict) -> dict:
    """Senza Claude: il gancio è la frase della cartolina, le scene sono le schede."""
    return {"gancio": c.get("frase", c["titolo"]),
            "scene": [{"titolo": s["titolo"], "testo": s["testo"]} for s in c["carosello"]],
            "facebook": c.get("facebook", ""), "instagram": c.get("instagram", "").split("\n\n#")[0],
            "telegram": c.get("telegram", ""), "hashtag": ["religionecattolica", "irc"]}


def da_preparare(lezioni: list[dict], registri: tuple, oggi: dt.date) -> list[dict]:
    """Le lezioni che usciranno nei prossimi 7 giorni e non hanno ancora il video uscito."""
    per_chiave = {c["chiave"]: c for c in lezioni}
    try:
        stato = coda_agenti.leggi()
    except (ValueError, OSError):
        stato = {"coda": []}
    if stato is None:
        scelte = [c for c in lezioni if not pubblicato(c["chiave"], registri)][:5]
    else:
        # per ogni mercoledì dei prossimi 7 giorni, la lezione in coda che esce prima (il lunedì)
        voci = [v for v in stato.get("coda", []) if v.get("esito") == "approvato" and v.get("chiave") in per_chiave]
        scelte = []
        for giorno in cal.giorni_di("video", oggi - dt.timedelta(days=1), GIORNI_AVANTI + 1):
            prima = [v for v in voci if (giorno - dt.timedelta(days=7)).isoformat() <= str(v.get("quando", ""))
                     < giorno.isoformat()]
            if prima:
                c = per_chiave[max(prima, key=lambda v: str(v["quando"]))["chiave"]]
                if c not in scelte:
                    scelte.append(c)
    return [c for c in scelte if c.get("carosello") and not pubblicato("reel|" + c["chiave"], registri)]


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--sempre", action="store_true", help="(non serve più: tenuto per compatibilità)")
    ap.add_argument("--senza-ia", action="store_true", help="non chiama l'API di Claude")
    a = ap.parse_args()

    oggi = oggi_in_italia()
    lezioni = [c for c in leggi(g.RADICE / "promozione" / "cartoline.json", []) if c.get("anno")]
    registri = (leggi(g.RADICE / "data" / "telegram.json", {}), leggi(g.RADICE / "data" / "meta.json", {}))
    elenco_file, cache_file = g.RADICE / "promozione" / "reel.json", g.RADICE / "data" / "reel.json"
    cache = leggi(cache_file, {})
    reel = [r for c in da_preparare(lezioni, registri, oggi) if (r := prepara(c, cache, a.senza_ia))]
    scrivi(cache_file, cache)
    scrivi(elenco_file, reel)
    print(f"Video da montare: {len(reel)}" + "".join(f"\n  · {r['titolo']}" for r in reel))
    return 0


def prepara(c: dict, cache: dict, senza_ia: bool) -> dict | None:
    materiale = {"titolo": c["titolo"], "frase": c.get("frase", ""), "carosello": c["carosello"]}
    firma = impronta(VERSIONE, materiale)
    voce = cache.get(c["chiave"])
    if not voce or voce.get("firma") != firma or len(voce["testi"]["scene"]) != len(c["carosello"]):
        testi = None
        if not senza_ia and os.environ.get("ANTHROPIC_API_KEY"):
            try:
                import anthropic
                messaggio = (f"Lezione: {c['titolo']} (classe {c.get('classe', '')}, unità «{c.get('uda', '')}»)\n"
                             f"Frase della cartolina: {c.get('frase', '')}\n\n<carosello>\n"
                             + "\n".join(f"{i}. {s['titolo']}: {s['testo']}" for i, s in enumerate(c["carosello"], 1))
                             + "\n</carosello>")
                testi = pr.scrivi_e_rivedi(anthropic.Anthropic(), ISTRUZIONI_REEL, messaggio, SCHEMA_REEL)
                print(f"  ✓ copione scritto da Claude ({testi['token']['input']} + {testi['token']['output']} token)")
            except Exception as err:
                print(f"  ! Claude non ha scritto il copione ({err}): uso il carosello")
        testi = testi if testi and len(testi["scene"]) == len(c["carosello"]) else copione_di_riserva(c)
        voce = {"firma": firma, "testi": testi}
        cache[c["chiave"]] = voce

    t = voce["testi"]
    disegni = c.get("illustrazioni") or []
    scene = [{"titolo": s["titolo"], "testo": s["testo"], "disegno": disegni[i] if i < len(disegni) else ""}
             for i, s in enumerate(t["scene"])]
    video = f"reel-{g.slug(c['anno'] + '-' + c['titolo'])[:50]}-{impronta(t['gancio'], scene)}.mp4"
    canali = pr.testo_completo({"testi": t, "url": c["url"]}, "instagram")
    return {"chiave": "reel|" + c["chiave"], "origine": c["chiave"], "titolo": c["titolo"],
            "anno": c["anno"], "classe": c.get("classe", ""), "uda": c.get("uda", ""),
            "colore": c.get("colore", ""), "mascotte": c.get("mascotte", ""), "url": c["url"],
            "gancio": t["gancio"], "scene": scene, "video": video,
            "facebook": pr.testo_completo({"testi": t, "url": c["url"]}, "facebook"),
            "instagram": canali,
            "telegram": pr.testo_completo({"testi": t, "url": c["url"]}, "telegram")}


if __name__ == "__main__":
    sys.exit(main())
