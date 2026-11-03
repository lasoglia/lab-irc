#!/usr/bin/env python3
"""
seo/social_calendario.py — Le date che contano per i post del Lab IRC.

Le ricorrenze si calcolano qui, con un algoritmo, e non si chiedono a Claude:
la data di Pasqua e tutte quelle che ne dipendono non devono poter essere sbagliate.

Le date mobili seguono il calendario liturgico italiano, dove Ascensione e
Corpus Domini si celebrano di domenica.

Qui sta anche il calendario dei social (tipo_del_giorno), usato da chi pubblica,
dagli agenti e dai controlli:
  scuola     lunedì-venerdì una lezione (carosello, storia e video), sabato «Lo Shabbat
             del Lab» (la cultura ebraica), domenica «La grande domanda»
  vacanze    lunedì, mercoledì e venerdì una striscia simpatica del prof, nient'altro
  giochi     nei 14 giorni dopo l'uscita di un gioco di verifica, il giovedì il reel di una partita
Le vacanze sono quelle di data/vacanze.json (da correggere ogni anno con il calendario
della regione); se il file manca valgono le date nazionali più comuni.
"""

from __future__ import annotations

import datetime as dt
import json
from pathlib import Path

RADICE = Path(__file__).resolve().parent.parent

FISSE = {
    "01-01": "Maria Santissima Madre di Dio · Giornata mondiale della pace",
    "01-06": "Epifania del Signore",
    "01-27": "Giorno della Memoria",
    "01-28": "San Tommaso d'Aquino",
    "01-31": "San Giovanni Bosco, educatore",
    "02-10": "Giorno del Ricordo",
    "03-19": "San Giuseppe",
    "03-25": "Annunciazione del Signore",
    "04-25": "San Marco evangelista · Festa della Liberazione",
    "05-01": "San Giuseppe lavoratore",
    "06-29": "Santi Pietro e Paolo",
    "07-11": "San Benedetto, patrono d'Europa",
    "08-15": "Assunzione di Maria",
    "09-01": "Giornata per la custodia del creato",
    "10-04": "San Francesco d'Assisi",
    "11-01": "Tutti i Santi",
    "11-02": "Commemorazione dei defunti",
    "12-08": "Immacolata Concezione",
    "12-25": "Natale del Signore",
    "12-26": "Santo Stefano",
}


def pasqua(anno: int) -> dt.date:
    """Data della Pasqua (algoritmo anonimo gregoriano, detto di Meeus)."""
    a = anno % 19
    b, c = divmod(anno, 100)
    d, e = divmod(b, 4)
    f = (b + 8) // 25
    g = (b - f + 1) // 3
    h = (19 * a + b - d - g + 15) % 30
    i, k = divmod(c, 4)
    l = (32 + 2 * e + 2 * i - h - k) % 7
    m = (a + 11 * h + 22 * l) // 451
    mese, giorno = divmod(h + l - 7 * m + 114, 31)
    return dt.date(anno, mese, giorno + 1)


def prima_domenica_avvento(anno: int) -> dt.date:
    """È la domenica che cade tra il 27 novembre e il 3 dicembre."""
    giorno = dt.date(anno, 11, 27)
    return giorno + dt.timedelta(days=(6 - giorno.weekday()) % 7)


def mobili(anno: int) -> dict[dt.date, str]:
    p = pasqua(anno)
    avvento = prima_domenica_avvento(anno)
    passi = {-46: "Mercoledì delle Ceneri, inizio della Quaresima", -7: "Domenica delle Palme",
             -3: "Giovedì Santo", -2: "Venerdì Santo", -1: "Sabato Santo", 0: "Pasqua di Risurrezione",
             42: "Ascensione del Signore", 49: "Pentecoste", 56: "Santissima Trinità",
             63: "Corpus Domini"}
    date = {p + dt.timedelta(days=g): nome for g, nome in passi.items()}
    date[avvento - dt.timedelta(days=7)] = "Cristo Re"
    date[avvento] = "Prima domenica di Avvento"
    return date


def patrono_del_sito() -> dict[str, str]:
    try:
        sito = json.loads((RADICE / "data" / "site.json").read_text(encoding="utf-8"))
    except (OSError, ValueError):
        return {}
    festa, nome = sito.get("patrono_festa"), sito.get("patrono")
    return {festa: f"{nome}, patrono del Lab IRC"} if festa and nome else {}


def eventi(inizio: dt.date, giorni: int) -> list[tuple[dt.date, str]]:
    fisse = {**FISSE, **patrono_del_sito()}
    uscita = []
    mobili_per_anno: dict[int, dict] = {}
    for n in range(giorni):
        giorno = inizio + dt.timedelta(days=n)
        tabella = mobili_per_anno.setdefault(giorno.year, mobili(giorno.year))
        nomi = [t for t in (fisse.get(giorno.strftime("%m-%d")), tabella.get(giorno)) if t]
        uscita.extend((giorno, nome) for nome in nomi)
    return uscita


def tempo_liturgico(giorno: dt.date) -> str:
    p = pasqua(giorno.year)
    avvento = prima_domenica_avvento(giorno.year)
    ceneri = p - dt.timedelta(days=46)
    pentecoste = p + dt.timedelta(days=49)
    if ceneri <= giorno < p - dt.timedelta(days=3):
        return "Quaresima"
    if p - dt.timedelta(days=3) <= giorno < p:
        return "Triduo pasquale"
    if p <= giorno <= pentecoste:
        return "Tempo di Pasqua"
    if avvento <= giorno < dt.date(giorno.year, 12, 25):
        return "Avvento"
    if giorno >= dt.date(giorno.year, 12, 25) or giorno <= dt.date(giorno.year, 1, 6):
        return "Tempo di Natale"
    return "Tempo ordinario"


# --------------------------------------------------------------------------
# Il calendario dei social: scuola e vacanze
# --------------------------------------------------------------------------
FILE_VACANZE = RADICE / "data" / "vacanze.json"


def vacanze_predefinite(anno: int) -> list[tuple[dt.date, dt.date, str]]:
    """Le vacanze più comuni in Italia (le regioni cambiano qualche giorno)."""
    p = pasqua(anno)
    return [(dt.date(anno - 1, 12, 23), dt.date(anno, 1, 6), "vacanze di Natale"),
            (p - dt.timedelta(days=3), p + dt.timedelta(days=2), "vacanze di Pasqua"),
            (dt.date(anno, 6, 10), dt.date(anno, 9, 13), "vacanze estive"),
            (dt.date(anno, 12, 23), dt.date(anno + 1, 1, 6), "vacanze di Natale")]


def vacanze(anno: int) -> list[tuple[dt.date, dt.date, str]]:
    if FILE_VACANZE.exists():
        dati = json.loads(FILE_VACANZE.read_text(encoding="utf-8"))
        return [(dt.date.fromisoformat(v["dal"]), dt.date.fromisoformat(v["al"]), v.get("nome", "vacanze"))
                for v in dati.get("vacanze", [])]
    return vacanze_predefinite(anno)


def in_vacanza(giorno: dt.date) -> str:
    """Il nome del periodo di vacanza in cui cade il giorno, oppure ''."""
    return next((nome for dal, al, nome in vacanze(giorno.year) if dal <= giorno <= al), "")


# La settimana del Lab (Progetto Reel), sul modello dei canali che funzionano meglio: più reel
# che caroselli, meno uscite e più curate. Lunedì, mercoledì e venerdì il reel di una lezione
# (alle 19), martedì il carosello di una lezione (alle 13:30), giovedì solo storie, sabato lo
# Shabbat (carosello), domenica la grande domanda (carosello e video). In vacanza una striscia
# del prof lunedì e giovedì. Gli orari li dà l'orologio su Cloudflare (seo/orologio-cloudflare.js).
SETTIMANA_SCUOLA = {0: "reel", 1: "lezione", 2: "reel", 4: "reel", 5: "shabbat", 6: "domenica"}
SETTIMANA_VACANZA = {0: "prof", 3: "prof"}
DI_LEZIONE = ("lezione", "reel")   # i giorni che usano una lezione del kit (approvata dagli agenti)

INIZIO_SETTIMANA_NUOVA = dt.date(2026, 11, 9)   # prima: lezioni dal lunedì al venerdì


# I giochi di verifica: per GIORNI_GIOCO giorni da quando un gioco nuovo compare nella pagina
# Verifiche, il giovedì di scuola (libero) esce il reel di una partita registrata (seo/gioco_*.py/mjs).
# data/social-giochi.json ricorda quando ogni gioco è comparso; si può anche fissare un periodo a mano
# con «dal» e «al».
FILE_GIOCHI = RADICE / "data" / "social-giochi.json"
FILE_VERIFICHE = RADICE / "data" / "verifiche.json"
GIORNI_GIOCO = 14
GIORNO_GIOCO = 3   # giovedì


def giochi() -> list[dict]:
    try:
        return json.loads(FILE_GIOCHI.read_text(encoding="utf-8")).get("giochi", [])
    except (OSError, ValueError):
        return []


def gioco_del_giorno(giorno: dt.date) -> dict | None:
    """Il gioco da promuovere quel giorno (il più recente nel suo periodo), oppure None."""
    dentro = []
    for v in giochi():
        try:
            dal = dt.date.fromisoformat(v.get("dal") or v["uscito"])
            al = dt.date.fromisoformat(v["al"]) if v.get("al") else dal + dt.timedelta(days=GIORNI_GIOCO - 1)
        except (KeyError, ValueError):
            continue
        if dal <= giorno <= al:
            dentro.append((dal, v))
    return max(dentro, key=lambda x: x[0])[1] if dentro else None


def registra_giochi_nuovi(oggi: dt.date) -> list[dict]:
    """Segna in data/social-giochi.json i giochi della pagina Verifiche mai visti, con la data di oggi."""
    try:
        catalogo = json.loads(FILE_VERIFICHE.read_text(encoding="utf-8")).get("verifiche", [])
    except (OSError, ValueError):
        return []
    elenco = giochi()
    visti = {v["file"] for v in elenco}
    nuovi = [{"file": v["file"].lstrip("/"), "titolo": v.get("titolo", ""), "anno": str(v.get("anno", "")),
              "uscito": oggi.isoformat()} for v in catalogo
             if v.get("file", "").endswith("-gioco.html") and v["file"].lstrip("/") not in visti]
    if nuovi:
        FILE_GIOCHI.write_text(json.dumps({"nota": "Quando ogni gioco di verifica è comparso sul sito: nei "
                                           f"{GIORNI_GIOCO} giorni dopo, il giovedì esce il suo reel. "
                                           "Per un periodo diverso aggiungi «dal» e «al».",
                                           "giochi": elenco + nuovi}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return nuovi


def tipo_del_giorno(giorno: dt.date) -> str | None:
    """Che cosa esce quel giorno: 'reel', 'lezione', 'gioco', 'prof', 'shabbat', 'domenica' oppure None."""
    if giorno < INIZIO_SETTIMANA_NUOVA:   # il calendario di prima, per i post già approvati
        if in_vacanza(giorno):
            return "prof" if giorno.weekday() in (0, 2, 4) else None
        return {5: "shabbat", 6: "domenica"}.get(giorno.weekday(), "lezione")
    if in_vacanza(giorno):
        return SETTIMANA_VACANZA.get(giorno.weekday())
    if giorno.weekday() == GIORNO_GIOCO and gioco_del_giorno(giorno):
        return "gioco"
    return SETTIMANA_SCUOLA.get(giorno.weekday())


def giorni_di(tipo: str, inizio: dt.date, giorni: int) -> list[dt.date]:
    """I giorni in cui esce quel tipo di post, da domani per «giorni» giorni."""
    return [d for d in (inizio + dt.timedelta(days=i) for i in range(1, giorni + 1)) if tipo_del_giorno(d) == tipo]


if __name__ == "__main__":
    import sys
    if sys.argv[1:] == ["--giochi"]:   # segna i giochi nuovi (lo fa l'Action dei video dei giochi)
        from zoneinfo import ZoneInfo
        nuovi = registra_giochi_nuovi(dt.datetime.now(ZoneInfo("Europe/Rome")).date())
        print("Giochi nuovi: " + (", ".join(v["titolo"] for v in nuovi) if nuovi else "nessuno"))
