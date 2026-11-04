#!/usr/bin/env python3
"""
seo/reel.py — I video a fumetti delle lezioni (uno per ogni lezione che esce).

Per ogni lezione approvata in data/social-coda.json per un giorno «reel» dei prossimi 7
giorni (lunedì, mercoledì, venerdì; senza coda, le prossime 5 del kit) chiede a Claude il
copione (un gancio, una frase breve per ogni scheda del carosello, le didascalie)
e lo scrive in promozione/reel.json. Il video lo monta seo/reel.mjs: il prof
(l'avatar) risponde nei fumetti, sopra i disegni del carosello. Lo pubblica
seo/pubblica.py nel suo giorno, al posto del carosello.

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
- gancio: la prima scritta, quella che ferma il pollice. Massimo 60 caratteri e 12 \
parole, con una leva sola: una domanda spiazzante, un fatto controintuitivo, un numero \
inatteso o un contrasto, sempre preso dal materiale e mantenuto dal video. Mai una formula \
generica, mai clickbait, mai paura o urgenza. Pensane almeno cinque e scegli il migliore;
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

""" + pr.TONO + "\n\n" + pr.METODO


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
        # le lezioni in coda nei prossimi 7 giorni per un giorno «reel» (lunedì, mercoledì, venerdì)
        fine = (oggi + dt.timedelta(days=GIORNI_AVANTI)).isoformat()
        voci = sorted((v for v in stato.get("coda", []) if v.get("esito") == "approvato"
                       and oggi.isoformat() <= str(v.get("quando", "")) <= fine
                       and cal.tipo_del_giorno(dt.date.fromisoformat(str(v["quando"]))) == "reel"),
                      key=lambda v: str(v["quando"]))
        scelte = [{**per_chiave[v["chiave"]], "_quando": str(v["quando"])} for v in voci if v.get("chiave") in per_chiave]
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


VERSIONE_REGIA = "3"   # cambiala per far riscrivere i copioni (3: sempre anche la lezione interattiva)


def prepara_regia(c: dict, cache: dict) -> dict | None:
    """Il reel nuovo (Progetto Reel): copione del regista (seo/regista.py) con le pagine vere del
    fascicolo e la voce; lo monta seo/reel_lezioni.py con seo/reel2.mjs. None se non si può."""
    import regista
    if os.environ.get("REEL_MOTORE") == "vecchio" or not regista.fascicolo_di(c):
        return None
    quando = c.get("_quando")
    serie = regista.SERIE.get(dt.date.fromisoformat(quando).weekday(), "") if quando else ""
    firma = impronta(VERSIONE_REGIA, c["chiave"], c["titolo"], c.get("frase", ""), serie)
    voce = cache.get("regia|" + c["chiave"])
    if not voce or voce.get("firma") != firma:
        if not os.environ.get("ANTHROPIC_API_KEY"):
            return None
        try:
            testi = regista.scrivi(c, quando)
        except Exception as err:
            print(f"  ! il regista non ha scritto il copione ({err}): uso il reel di prima")
            return None
        if not testi:
            return None
        print(f"  ✓ copione del regista: {testi.get('serie')}, citazioni sbagliate {testi.get('citazioni_sbagliate')}")
        voce = {"firma": firma, "testi": testi}
        cache["regia|" + c["chiave"]] = voce
    t = voce["testi"]
    regia = regista.copione_regia(t, c)
    video = f"reel2-{g.slug(c['anno'] + '-' + c['titolo'])[:50]}-{impronta(regia)}.mp4"
    post = {"testi": t, "url": c["url"]}
    return {"chiave": "reel|" + c["chiave"], "origine": c["chiave"], "titolo": c["titolo"], "anno": c["anno"],
            "classe": c.get("classe", ""), "uda": c.get("uda", ""), "colore": c.get("colore", ""),
            "mascotte": c.get("mascotte", ""), "url": c["url"], "motore": "reel2", "regia": regia,
            "gancio": next((q.get("testo", "") for q in regia["inquadrature"] if q["tipo"] == "gancio"), ""),
            "ganci": t.get("ganci", []), "video": video,
            "facebook": pr.testo_completo(post, "facebook"), "instagram": pr.testo_completo(post, "instagram"),
            "telegram": pr.testo_completo(post, "telegram")}


def prepara(c: dict, cache: dict, senza_ia: bool) -> dict | None:
    if not senza_ia and (nuovo := prepara_regia(c, cache)):
        return nuovo
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
