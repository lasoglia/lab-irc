#!/usr/bin/env python3
"""
seo/social_calendario.py — Le date che contano per i post del Lab IRC.

Le ricorrenze si calcolano qui, con un algoritmo, e non si chiedono a Claude:
la data di Pasqua e tutte quelle che ne dipendono non devono poter essere sbagliate.

Le date mobili seguono il calendario liturgico italiano, dove Ascensione e
Corpus Domini si celebrano di domenica.
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
