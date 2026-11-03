#!/usr/bin/env python3
"""
seo/rubriche.py — Le rubriche social del Lab IRC, oltre ai post delle lezioni.

  · «Il prof del Lab» (martedì e sabato): post leggeri e simpatici con l'avatar
    illustrato del prof e un fumetto. Ognuno nasce da una lezione vera: una
    curiosità («Lo sapevi?»), una domanda degli studenti («Il prof risponde»),
    un piccolo indovinello, oppure un momento di vita da insegnante.
  · «La grande domanda» (domenica): il super post della settimana. Claude sceglie
    una domanda vera degli studenti e le lezioni del sito che rispondono, poi
    scrive un carosello di 10 immagini (copertina, 8 schede, saluto) e le scene
    di un video. Ogni scheda ha un disegno fatto da Claude (seo/illustrazioni.py,
    in promozione/illustrazioni/domenica/); il video lo monta seo/reel.mjs.

Come per il kit delle lezioni, scrive Claude e un secondo passaggio da
caporedattore rilegge. Lo script prepara i post IN ANTICIPO (una riserva di
post del prof e le prossime due domeniche), così le immagini sono già online
quando arriva il giorno di pubblicarle.

  data/rubriche.json        i testi (cache)
  promozione/prof.json      i post del prof, per seo/cartoline.mjs e seo/pubblica.py
  promozione/domenica.json  i super post della domenica
  promozione/reel-domenica.json  i loro video (per seo/reel.mjs e seo/pubblica.py)

USO
---
  python seo/rubriche.py              prepara ciò che manca
  python seo/rubriche.py --senza-ia   solo gli elenchi, nessuna chiamata API
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
import coda as coda_agenti  # noqa: E402
import social_calendario as cal  # noqa: E402
import illustrazioni as ill  # noqa: E402
import promozione as pr  # noqa: E402

RISERVA_PROF = 6           # strisce del prof pronte in anticipo, solo se arrivano le vacanze
DOMENICHE_AVANTI = 2       # domeniche preparate in anticipo
GIORNI_ARCHIVIO = 45       # dopo quanti giorni un post già uscito lascia gli elenchi
FORMATO_DOMENICA = "grande-domanda"
VERSIONE_DOMENICA = "2"   # cambiala per far riscrivere le domeniche non ancora uscite né approvate (2: tono)
CARTELLA_DOMENICA = g.RADICE / "promozione" / "illustrazioni" / "domenica"
POSE = ["sorriso", "buffo", "pensieroso", "sorpreso", "spiega", "ride"]
FORMATI = ["Lo sapevi?", "Il prof risponde", "Indovina un po'", "Vita da prof"]


# --------------------------------------------------------------------------
# Il calendario liturgico (rito romano, in Italia): calcolato, non indovinato
# --------------------------------------------------------------------------
def pasqua(anno: int) -> dt.date:
    a, b, c = anno % 19, anno // 100, anno % 100
    d, e = b // 4, b % 4
    f = (b + 8) // 25
    g_ = (b - f + 1) // 3
    h = (19 * a + b - d - g_ + 15) % 30
    i, k = c // 4, c % 4
    l = (32 + 2 * e + 2 * i - h - k) % 7
    m = (a + 11 * h + 22 * l) // 451
    mese = (h + l - 7 * m + 114) // 31
    giorno = (h + l - 7 * m + 114) % 31 + 1
    return dt.date(anno, mese, giorno)


def prima_avvento(anno: int) -> dt.date:
    natale = dt.date(anno, 12, 25)
    quarta = natale - dt.timedelta(days=(natale.weekday() + 1) % 7 or 7)
    return quarta - dt.timedelta(days=21)


VIOLA, ORO, VERDE, ROSSO = "#A78BFA", "#E3C27A", "#34D399", "#FF7A59"


def tempo_liturgico(d: dt.date) -> tuple[str, str, str]:
    """(tempo, festa del giorno o '', colore) per una domenica."""
    p = pasqua(d.year)
    feste_fisse = {(1, 1): "Maria Santissima Madre di Dio", (1, 6): "Epifania del Signore",
                   (6, 29): "Santi Pietro e Paolo", (8, 15): "Assunzione di Maria",
                   (11, 1): "Tutti i Santi", (11, 2): "Commemorazione dei fedeli defunti",
                   (12, 25): "Natale del Signore"}
    mobili = {p - dt.timedelta(days=7): "Domenica delle Palme", p: "Pasqua di Risurrezione",
              p + dt.timedelta(days=7): "Domenica della Divina Misericordia",
              p + dt.timedelta(days=42): "Ascensione del Signore",
              p + dt.timedelta(days=49): "Pentecoste", p + dt.timedelta(days=56): "Santissima Trinità",
              p + dt.timedelta(days=63): "Corpus Domini",
              prima_avvento(d.year) - dt.timedelta(days=7): "Cristo Re dell'universo"}
    # Santa Famiglia: la domenica tra il 26 e il 31 dicembre
    if d.month == 12 and 26 <= d.day <= 31:
        mobili[d] = "Santa Famiglia di Gesù, Maria e Giuseppe"
    festa = mobili.get(d) or feste_fisse.get((d.month, d.day), "")

    avvento = prima_avvento(d.year)
    epifania = dt.date(d.year, 1, 6)
    battesimo = epifania + dt.timedelta(days=(6 - epifania.weekday()) or 7)
    ceneri = p - dt.timedelta(days=46)
    if d >= avvento and d < dt.date(d.year, 12, 25):
        n = (d - avvento).days // 7 + 1
        return f"{n}ª domenica di Avvento", festa, VIOLA
    if d >= dt.date(d.year, 12, 25) or d <= battesimo:
        return "Tempo di Natale", festa or ("Battesimo del Signore" if d == battesimo else ""), ORO
    if ceneri <= d < p - dt.timedelta(days=7):
        n = (d - ceneri).days // 7 + 1
        return f"{n}ª domenica di Quaresima", festa, VIOLA
    if p - dt.timedelta(days=7) <= d < p:
        return "Settimana Santa", festa, ROSSO
    if p <= d <= p + dt.timedelta(days=49):
        return "Tempo di Pasqua", festa, ROSSO if d == p + dt.timedelta(days=49) else ORO
    return "Tempo ordinario", festa, VERDE


MESI = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto",
        "settembre", "ottobre", "novembre", "dicembre"]


def oggi_in_italia() -> dt.date:
    try:
        from zoneinfo import ZoneInfo
        return dt.datetime.now(ZoneInfo("Europe/Rome")).date()
    except Exception:
        return dt.date.today()


# --------------------------------------------------------------------------
# I testi
# --------------------------------------------------------------------------
SCHEMA_PROF = {
    "type": "object",
    "properties": {
        "titolo": {"type": "string"},
        "vignette": {"type": "array", "items": {
            "type": "object",
            "properties": {
                "parla": {"type": "string", "enum": ["prof", "studente"]},
                "posa": {"type": "string", "enum": POSE},
                "fumetto": {"type": "string"},
                "didascalia": {"type": "string"},
            },
            "required": ["parla", "posa", "fumetto", "didascalia"],
            "additionalProperties": False}},
        "facebook": {"type": "string"},
        "instagram": {"type": "string"},
        "hashtag": {"type": "array", "items": {"type": "string"}},
        "telegram": {"type": "string"},
    },
    "required": ["titolo", "vignette", "facebook", "instagram", "hashtag", "telegram"],
    "additionalProperties": False,
}

ISTRUZIONI_PROF = """Scrivi una striscia a fumetti della rubrica «Il prof del Lab» per \
i social del Lab IRC, il sito di materiali di Religione Cattolica di Matteo Sestili, \
docente nella scuola secondaria di secondo grado. I personaggi sono due: il prof (il suo \
avatar illustrato: ricci scuri, sorriso largo, un po' buffo, appassionato) e lo studente, \
che è la mascotte della classe della lezione (un semino in prima, un pesciolino in \
seconda, una navicella in terza, una bussola in quarta, la Terra in quinta): curioso, \
diretto, a volte spiritoso. Sono post leggeri e simpatici, due volte a settimana, \
alternati ai post sulle lezioni: devono strappare un sorriso o un «ah, non lo sapevo» e \
far venire voglia di aprire la lezione. La striscia si sfoglia come un carosello: una \
vignetta per immagine.

Ricevi il formato della rubrica e il testo di una lezione. Formati:
- «Lo sapevi?»: una curiosità vera e sorprendente presa dalla lezione;
- «Il prof risponde»: una domanda che uno studente potrebbe fare davvero, e la risposta \
del prof, breve e chiara, presa dalla lezione;
- «Indovina un po'»: un piccolo indovinello o quiz; la soluzione sta nel testo del post \
(per Instagram: «risposta nei commenti» non va bene, mettila in fondo alla didascalia);
- «Vita da prof»: un momento simpatico e affettuoso della vita da insegnante di \
religione, collegato all'argomento della lezione.

Restituisci nel formato JSON richiesto:
- titolo: massimo 50 caratteri, l'argomento della striscia;
- vignette: da 3 a 4 vignette, con un ritmo da striscia: situazione, sviluppo, battuta \
finale (l'ultima vignetta deve far sorridere o sorprendere). Per ognuna: parla (chi \
parla: «prof» o «studente»), posa (l'espressione del prof in quella vignetta: sorriso, \
buffo, pensieroso, sorpreso, spiega, ride; il prof compare sempre), fumetto (massimo \
110 caratteri, parlato naturale, la battuta di chi parla), didascalia (massimo 50 \
caratteri, il riquadro del narratore, per esempio «Il giorno dopo…»; stringa vuota se \
non serve);
- facebook: 300-600 caratteri; instagram: 300-700 caratteri, paragrafi corti, senza \
hashtag; telegram: 200-450 caratteri;
- hashtag: da 3 a 5, senza #, sempre religionecattolica e irc.

Regole vincolanti:
- Ogni fatto deve venire dal testo della lezione: niente date, nomi o citazioni inventati.
- Umorismo bonario da insegnante: mai prendere in giro persone, studenti, fedi o chi non \
crede. Niente doppi sensi.
- Al massimo tre emoji per testo, nessuna nei fumetti.
- Non scrivere link o «clicca qui»: il link alla lezione lo aggiunge il sistema.
- Italiano corretto e naturale."""

SCHEMA_SCELTA = {
    "type": "object",
    "properties": {
        "domanda": {"type": "string"},
        "lezioni": {"type": "array", "items": {"type": "integer"}},
        "perche": {"type": "string"},
    },
    "required": ["domanda", "lezioni", "perche"],
    "additionalProperties": False,
}

ISTRUZIONI_SCELTA = """Sei il redattore di «La grande domanda», il super post della \
domenica sui social del Lab IRC, il sito di materiali di Religione Cattolica di Matteo \
Sestili per la scuola secondaria di secondo grado. Ogni domenica il post risponde a una \
domanda vera, di quelle che gli studenti fanno davvero in classe o si chiedono tra loro \
(per esempio: «Gesù è esistito davvero?», «La scienza ha smentito la Bibbia?», «Perché la \
Chiesa ha condannato Galileo?», «Che differenza c'è tra fede e superstizione?»).

Ricevi l'elenco numerato delle lezioni del sito con la loro sintesi e le domande già \
usate nelle domeniche passate. Scegli:
- domanda: una domanda nuova (diversa da quelle già usate), formulata come la direbbe \
uno studente, massimo 70 caratteri, a cui le lezioni del sito sanno rispondere bene;
- lezioni: i numeri di 1, 2 o 3 lezioni dell'elenco che contengono la risposta (meglio \
se di classi diverse);
- perche: in una riga, perché queste lezioni rispondono alla domanda."""

SCHEMA_DOMENICA = {
    "type": "object",
    "properties": {
        "titolo": {"type": "string"},
        "frase": {"type": "string"},
        "carosello": {"type": "array", "items": {
            "type": "object",
            "properties": {"titolo": {"type": "string"}, "testo": {"type": "string"}},
            "required": ["titolo", "testo"], "additionalProperties": False}},
        "gancio": {"type": "string"},
        "scene_video": {"type": "array", "items": {
            "type": "object",
            "properties": {"titolo": {"type": "string"}, "testo": {"type": "string"},
                           "scheda": {"type": "integer"}},
            "required": ["titolo", "testo", "scheda"], "additionalProperties": False}},
        "facebook": {"type": "string"},
        "instagram": {"type": "string"},
        "hashtag": {"type": "array", "items": {"type": "string"}},
        "telegram": {"type": "string"},
    },
    "required": ["titolo", "frase", "carosello", "gancio", "scene_video", "facebook", "instagram",
                 "hashtag", "telegram"],
    "additionalProperties": False,
}

ISTRUZIONI_DOMENICA = """Scrivi «La grande domanda», il super post della domenica sui \
social del Lab IRC, il sito di materiali di Religione Cattolica di Matteo Sestili, docente \
nella scuola secondaria di secondo grado. È il pezzo forte della settimana: un carosello \
da sfogliare e un breve video che rispondono a una domanda vera degli studenti, in modo \
chiaro, preciso e simpatico: si sfoglia con il sorriso e si impara qualcosa. Lo leggono \
studenti, colleghi e famiglie.

Ricevi la domanda della settimana e il testo delle lezioni del sito che contengono la \
risposta. Restituisci nel formato JSON:
- titolo: la domanda, come apparirà in copertina (massimo 70 caratteri);
- frase: il sottotitolo della copertina, che promette la risposta senza darla tutta \
(massimo 120 caratteri);
- carosello: esattamente 8 schede, ognuna con titolo (massimo 30 caratteri) e testo \
(massimo 200 caratteri, si legge in pochi secondi sul telefono). Un percorso che si \
sfoglia con il desiderio di arrivare in fondo: si parte da ciò che si pensa di solito, \
poi i fatti, i testi e le fonti delle lezioni, le distinzioni che fanno capire, fino \
alla risposta; l'ultima scheda lascia una domanda aperta per chi legge. Ogni scheda \
dice una cosa sola;
- gancio: la prima scritta del video, massimo 60 caratteri;
- scene_video: esattamente 6 scene per il video (verticale, senza voce, una scena ogni \
quattro secondi), ognuna con titolo (massimo 28 caratteri), testo (massimo 90 caratteri) \
e scheda (il numero, da 1 a 8, della scheda del carosello di cui riusa il disegno);
- facebook: 500-900 caratteri; instagram: 400-800 caratteri, paragrafi corti, senza \
hashtag; telegram: 300-500 caratteri. Presentano la domanda, anticipano un po' della \
risposta e invitano a sfogliare il carosello e ad aprire le lezioni;
- hashtag: da 3 a 5, senza #, sempre religionecattolica e irc.

Regole vincolanti:
- Ogni fatto, data, nome e citazione deve venire dal testo delle lezioni: niente di \
inventato. Se le lezioni non bastano per una parte della risposta, non riempirla.
- Sulla fede, sulla Chiesa e sulla Scrittura sii preciso come un buon libro di testo: \
niente formule vaghe che indeboliscono o deformano ciò che la Chiesa insegna.
- Rispetto per chi crede e per chi non crede: si propone, non si impone; si distingue ciò \
che dice la scienza, la storia e la fede.
- Al massimo due emoji per testo, nessuna nel carosello e nel video. Non scrivere link: \
li aggiunge il sistema.
- Italiano corretto e naturale.

""" + pr.TONO


def nome_file(prefisso: str, chiave: str, contenuto: dict) -> str:
    impronta = hashlib.sha256((chiave + json.dumps(contenuto, ensure_ascii=False, sort_keys=True))
                              .encode()).hexdigest()[:8]
    return f"{prefisso}-{g.slug(chiave)[:50]}-{impronta}.png"


def testi_canali(t: dict, url: str) -> dict:
    voce = {"testi": t, "url": url}
    return {c: pr.testo_completo(voce, c) for c in ("facebook", "instagram", "telegram")}


def pubblicato(chiave: str, registri: tuple) -> str:
    """La data più vecchia in cui il post è uscito su un canale ('' se mai)."""
    telegram, meta = registri
    date = [telegram.get(chiave, "")] + list(meta.get(chiave, {}).values())
    date = [d for d in date if d]
    return min(date) if date else ""


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--senza-ia", action="store_true", help="non chiama l'API di Claude")
    a = ap.parse_args()

    sito, anni, uda, lezioni, _ = g.raccogli()
    seo = json.loads((g.RADICE / "data" / "seo.json").read_text(encoding="utf-8")) \
        if (g.RADICE / "data" / "seo.json").exists() else {}
    cache_file = g.RADICE / "data" / "rubriche.json"
    cache = json.loads(cache_file.read_text(encoding="utf-8")) if cache_file.exists() else {}
    cache.setdefault("prof", [])
    cache.setdefault("domenica", {})

    def registro(nome):
        p = g.RADICE / "data" / nome
        return json.loads(p.read_text(encoding="utf-8")) if p.exists() else {}
    registri = (registro("telegram.json"), registro("meta.json"))
    oggi = oggi_in_italia()

    client = None
    if not a.senza_ia and os.environ.get("ANTHROPIC_API_KEY"):
        try:
            import anthropic
            client = anthropic.Anthropic()
        except ImportError:
            print("! Pacchetto 'anthropic' non installato: procedo senza IA")
    elif not a.senza_ia:
        print("! ANTHROPIC_API_KEY non impostata: procedo senza IA")

    ordinate = [l for l in pr.ordine_pubblicazione(uda, lezioni) if g.testo_lezione(l)]
    tok_in = tok_out = 0

    # --- il prof: si tiene una riserva di post pronti ---
    in_attesa = [p for p in cache["prof"] if not pubblicato(p["chiave"], registri)]
    usate = [p.get("lezione_chiave") for p in cache["prof"]]
    # le strisce escono solo nelle vacanze (seo/social_calendario.py): se ne scrivono solo quando servono
    riserva = min(RISERVA_PROF, len(cal.giorni_di("prof", oggi, 21)))
    while client and ordinate and len(in_attesa) < riserva:
        n = len(cache["prof"]) + 1
        # la lezione usata meno volte, nell'ordine del kit; il formato a rotazione
        l = min(ordinate, key=lambda x: (usate.count(g.chiave_lezione(x)), ordinate.index(x)))
        formato = FORMATI[(n - 1) % len(FORMATI)]
        messaggio = (f"Formato: {formato}\n"
                     f"Lezione: {l['titolo']} (classe {g.NOMI_ANNO.get(str(l.get('anno')), '')}, "
                     f"unità «{l.get('uda', '')}»)\n\n<testo_lezione>\n{g.testo_lezione(l)}\n</testo_lezione>")
        try:
            t = pr.scrivi_e_rivedi(client, ISTRUZIONI_PROF, messaggio, SCHEMA_PROF)
        except Exception as err:
            print(f"  ✗ prof {n}: {err}")
            break
        tok_in += t["token"]["input"]; tok_out += t["token"]["output"]
        voce = {"chiave": f"prof-{n:03d}", "formato": formato, "lezione_chiave": g.chiave_lezione(l),
                "anno": str(l.get("anno", "")), "lezione": l["titolo"], "url": pr.url_lezione(l), "testi": t}
        cache["prof"].append(voce)
        in_attesa.append(voce); usate.append(voce["lezione_chiave"])
        print(f"  ✓ prof {n:03d} · {formato} · {l['titolo']}")

    # --- la domenica: «La grande domanda», le prossime due se mancano ---
    # le domeniche di scuola (nelle vacanze la grande domanda non esce)
    domeniche = cal.giorni_di("domenica", oggi - dt.timedelta(days=1), 7 * DOMENICHE_AVANTI)[:DOMENICHE_AVANTI]
    elenco_lez = "\n".join(f"{i}. {l['titolo']} (classe {g.NOMI_ANNO.get(str(l.get('anno')), '')}): "
                           f"{seo.get(g.chiave_lezione(l), {}).get('sintesi', '')}"
                           for i, l in enumerate(ordinate, start=1))
    usate_dom = cache.setdefault("domande_usate", [])
    try:   # le domeniche già approvate dagli agenti non si riscrivono
        approvate = {v.get("chiave") for v in (coda_agenti.leggi() or {}).get("coda", []) if v.get("esito") == "approvato"}
    except (ValueError, OSError):
        approvate = set()
    for d in domeniche:
        k = d.isoformat()
        vecchia = k in cache["domenica"] \
            and (cache["domenica"][k].get("formato"), cache["domenica"][k].get("versione")) != (FORMATO_DOMENICA, VERSIONE_DOMENICA) \
            and not pubblicato(cache["domenica"][k]["chiave"], registri) \
            and cache["domenica"][k]["chiave"] not in approvate
        if not client or (k in cache["domenica"] and not vecchia) or not ordinate:
            continue
        try:
            prima = cache["domenica"].get(k, {})
            per_titolo = {l["titolo"]: l for l in ordinate}
            if prima.get("formato") == FORMATO_DOMENICA and all(x["titolo"] in per_titolo for x in prima.get("lezioni", [])):
                # si riscrive una domenica già pensata: stessa domanda, stesse lezioni
                scelta = {"domanda": prima["testi"]["titolo"]}
                scelte = [per_titolo[x["titolo"]] for x in prima["lezioni"]]
            else:
                # prima la domanda e le lezioni che rispondono, poi i testi letti per intero
                scelta, r = pr.chiama_claude(client, ISTRUZIONI_SCELTA,
                                             f"Domande già usate:\n" + ("\n".join(f"- {x}" for x in usate_dom[-60:]) or "nessuna")
                                             + f"\n\nLezioni del sito:\n{elenco_lez}", SCHEMA_SCELTA, "medium")
                tok_in += r.usage.input_tokens; tok_out += r.usage.output_tokens
                scelte = [ordinate[i - 1] for i in scelta["lezioni"] if 1 <= i <= len(ordinate)][:3] or [ordinate[0]]
            messaggio = (f"Domanda della settimana: {scelta['domanda']}\n\n" + "\n\n".join(
                f"<lezione titolo=\"{l['titolo']}\" classe=\"{g.NOMI_ANNO.get(str(l.get('anno')), '')}\">\n"
                f"{g.testo_lezione(l)}\n</lezione>" for l in scelte))
            t = pr.scrivi_e_rivedi(client, ISTRUZIONI_DOMENICA, messaggio, SCHEMA_DOMENICA)
        except Exception as err:
            print(f"  ✗ domenica {k}: {err}")
            continue
        tok_in += t["token"]["input"]; tok_out += t["token"]["output"]
        anno = str(scelte[0].get("anno", ""))
        voce = {"chiave": f"dom-{k}", "data": k, "formato": FORMATO_DOMENICA, "versione": VERSIONE_DOMENICA, "tempo": "",
                "colore": pr.COLORI_ANNO.get(anno, ORO), "anno": anno,
                "lezione": " · ".join(l["titolo"] for l in scelte), "url": pr.url_lezione(scelte[0]),
                "lezioni": [{"titolo": l["titolo"], "url": pr.url_lezione(l)} for l in scelte],
                "testi": t, "illustrazioni": []}
        schede = t.get("carosello", [])[:8]
        try:
            messaggio = (f"«La grande domanda»: {t['titolo']}. Le schede del carosello sono {len(schede)}.\n\n"
                         + "\n\n".join(f"Scheda {i}: {x['titolo']}\n{x['testo']}" for i, x in enumerate(schede, start=1)))
            file, r = ill.disegna(client, messaggio, len(schede), CARTELLA_DOMENICA,
                                  f"{k}-{hashlib.sha256(json.dumps(schede).encode()).hexdigest()[:6]}")
            voce["illustrazioni"] = file
            tok_in += r.usage.input_tokens; tok_out += r.usage.output_tokens
        except Exception as err:   # senza disegni il carosello esce lo stesso
            print(f"  ! domenica {k}: disegni non fatti ({err})")
        cache["domenica"][k] = voce
        if t["titolo"] not in usate_dom:
            usate_dom.append(t["titolo"])
        print(f"  ✓ domenica {k} · {t['titolo']} · {sum(1 for f in voce['illustrazioni'] if f)} disegni")

    # --- gli elenchi per il disegnatore e per la pubblicazione ---
    limite = (oggi - dt.timedelta(days=GIORNI_ARCHIVIO)).isoformat()
    tieni = lambda v: (pubblicato(v["chiave"], registri) or "9999") >= limite   # noqa: E731
    cache["prof"] = [p for p in cache["prof"] if tieni(p) or pubblicato(p["chiave"], registri) == ""]
    cache["domenica"] = {k: v for k, v in sorted(cache["domenica"].items()) if k >= limite}
    cache_file.write_text(json.dumps(cache, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    # via i disegni delle domeniche uscite dall'archivio
    usati = {f for v in cache["domenica"].values() for f in v.get("illustrazioni", []) if f}
    for f in CARTELLA_DOMENICA.glob("*.svg"):
        if f.name not in usati:
            f.unlink()

    prof = []
    for p in cache["prof"]:
        t = p["testi"]
        base = nome_file("prof", p["chiave"], {"v": t["vignette"], "t": t["titolo"]}).removesuffix(".png")
        vignette = t["vignette"][:4]
        prof.append({"chiave": p["chiave"], "tipo": "prof", "formato": p["formato"], "titolo": t["titolo"],
                     "anno": p.get("anno", ""), "lezione": p["lezione"], "url": p["url"], "vignette": vignette,
                     "file": f"{base}-1.png", "immagini": [f"{base}-{i}.png" for i in range(1, len(vignette) + 1)],
                     **testi_canali(t, p["url"])})
    domenica, reel_domenica = [], []
    for k, v in cache["domenica"].items():
        t, d = v["testi"], dt.date.fromisoformat(k)
        schede = t.get("carosello", [])[:8]
        disegni = ["promozione/illustrazioni/domenica/" + f if f else "" for f in v.get("illustrazioni", [])]
        f = nome_file("domenica", k, {"t": t["titolo"], "f": t["frase"], "c": v["colore"], "s": schede, "d": disegni})
        base = f.removesuffix(".png")
        # copertina, le schede, il saluto finale (al massimo 10 immagini: il limite di Instagram)
        immagini = [f] + ([f"{base}-{i}.png" for i in range(2, len(schede) + 3)] if schede else [])
        domenica.append({"chiave": v["chiave"], "tipo": "domenica", "formato": v.get("formato", ""), "data": k,
                         "data_breve": f"Domenica {d.day} {MESI[d.month - 1]}", "tempo": v.get("tempo", ""),
                         "colore": v["colore"], "titolo": t["titolo"], "frase": t["frase"],
                         "lezione": v["lezione"], "lezioni": v.get("lezioni", []), "url": v["url"],
                         "carosello": schede, "illustrazioni": disegni, "file": f, "immagini": immagini,
                         "gancio": t.get("gancio", ""), "scene_video": t.get("scene_video", []),
                         **testi_canali(t, v["url"])})
        # il video della domenica: stesse idee, scene brevi, i disegni del carosello
        if v.get("formato") == FORMATO_DOMENICA and t.get("scene_video"):
            scene = [{"titolo": x["titolo"], "testo": x["testo"],
                      "disegno": disegni[x["scheda"] - 1] if 1 <= x.get("scheda", 0) <= len(disegni) else ""}
                     for x in t["scene_video"][:6]]
            impronta = hashlib.sha256(json.dumps([t["gancio"], scene], ensure_ascii=False).encode()).hexdigest()[:8]
            reel_domenica.append({
                "chiave": f"reel|{v['chiave']}", "origine": v["chiave"], "data": k, "titolo": t["titolo"],
                "anno": v.get("anno", ""), "classe": "", "etichetta": "La grande domanda",
                "sottotitolo": "La grande domanda della domenica", "colore": v["colore"],
                "mascotte": pr.MASCOTTE.get(v.get("anno", ""), ""), "url": v["url"], "gancio": t["gancio"],
                "scene": scene, "video": f"domenica-{k}-{impronta}.mp4",
                **testi_canali(t, v["url"])})
    cartella = g.RADICE / "promozione"
    cartella.mkdir(exist_ok=True)
    for nome, dati in (("prof.json", prof), ("domenica.json", domenica), ("reel-domenica.json", reel_domenica)):
        (cartella / nome).write_text(json.dumps(dati, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    if tok_in:
        costo = tok_in / 1e6 * 4 + tok_out / 1e6 * 20   # listino Opus 5.5 al 10/2026
        print(f"Rubriche: {tok_in} token in, {tok_out} out · circa {costo:.2f} $")
    print(f"Rubriche: {len(prof)} post del prof, {len(domenica)} domeniche")


if __name__ == "__main__":
    sys.exit(main())
