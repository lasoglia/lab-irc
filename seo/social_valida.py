#!/usr/bin/env python3
"""
seo/social_valida.py — Il cancello tra Claude e il sito.

Claude nel flusso automatico prepara soltanto file. Questo script, che non usa
l'IA, decide se quei file si possono salvare:

  1. Claude ha toccato solo i file permessi?
  2. La coda è scritta bene e le sue chiavi esistono davvero?
  3. Le riscritture rispettano lunghezze e divieti?

Con --applica riporta le riscritture in data/promozione.json e le segna
"bloccato": true, così seo/promozione.py non le sovrascrive.

USO
---
  python seo/social_valida.py             controlla soltanto
  python seo/social_valida.py --applica   controlla e applica le riscritture
  python seo/social_valida.py --senza-git salta il controllo 1
"""

from __future__ import annotations

import argparse
import datetime as dt
import json
import re
import subprocess
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import coda  # noqa: E402
import social_calendario as cal  # noqa: E402

RADICE = coda.RADICE
FILE_PERMESSI = {"data/social-coda.json", "data/social-metriche.json"}
CAMPI = {  # campo: lunghezza minima e massima
    "frase_cartolina": (20, 90),
    "facebook": (300, 1000),
    "instagram": (300, 1100),
    "telegram": (200, 700),
    "whatsapp": (100, 450),
}
HASHTAG_MAX = 5
# il calendario è quello di seo/social_calendario.py: a scuola una lezione lunedì, martedì,
# mercoledì e venerdì (il martedì come carosello, gli altri giorni come reel), sabato lo
# Shabbat, domenica la grande domanda; in vacanza le strisce del prof lunedì e giovedì
MASSIMO_PER_TIPO = {"lezione": 4, "prof": 2, "shabbat": 1, "domenica": 1}
VIETATI = [
    (r"https?://|www\.", "contiene un link: i link li aggiunge lo script"),
    (r"clicca qui", "contiene «clicca qui»"),
    (r"torricelli", "nomina la scuola"),
    (r"[\w.+-]+@[\w-]+\.\w+", "contiene un indirizzo email"),
    (r"affrettati|non perdere|imperdibile|!{2,}", "tono pubblicitario"),
    (r"\b\d{1}[A-E]\b", "sembra nominare una classe reale"),
]


def file_toccati() -> set[str]:
    uscita = subprocess.run(["git", "status", "--porcelain", "--untracked-files=all"], cwd=RADICE,
                            capture_output=True, text=True, check=True).stdout
    toccati = {riga[3:].strip().strip('"') for riga in uscita.splitlines() if riga.strip()}
    return {p for p in toccati if "__pycache__" not in p}


def controlla_file(errori: list[str]) -> None:
    for percorso in sorted(file_toccati() - FILE_PERMESSI):
        errori.append(f"file non permesso modificato: {percorso}")


def controlla_coda(errori: list[str]) -> None:
    try:
        dati = coda.leggi()
    except ValueError as err:
        errori.append(f"data/social-coda.json non è un JSON valido: {err}")
        return
    if dati is None:
        errori.append("manca data/social-coda.json")
        return
    tipi: dict[str, str] = {}   # chiave -> lezione | prof | domenica
    for nome, tipo in (("cartoline.json", "lezione"), ("prof.json", "prof"), ("sabato.json", "shabbat"),
                       ("domenica.json", "domenica")):
        p = RADICE / "promozione" / nome
        for c in (json.loads(p.read_text(encoding="utf-8")) if p.exists() else []):
            tipi[c["chiave"]] = tipo
    chiavi = set(tipi)
    viste: set[str] = set()
    per_settimana: dict[tuple, int] = {}
    oggi = dt.date.today()
    for voce in dati.get("coda", []):
        chiave, quando = voce.get("chiave"), voce.get("quando")
        if chiave not in chiavi:
            errori.append(f"coda: chiave inesistente: {chiave}")
        if chiave in viste:
            errori.append(f"coda: chiave doppia: {chiave}")
        viste.add(chiave)
        if voce.get("esito") != "approvato":
            errori.append(f"coda: esito non valido per {chiave}: {voce.get('esito')}")
        try:
            giorno = dt.date.fromisoformat(str(quando))
        except ValueError:
            errori.append(f"coda: data non valida per {chiave}: {quando}")
            continue
        tipo = tipi.get(chiave, "lezione")
        del_giorno = cal.tipo_del_giorno(giorno)
        if del_giorno in cal.DI_LEZIONE:   # nei giorni «reel» la lezione esce come video
            del_giorno = "lezione"
        if giorno > oggi and del_giorno != tipo:   # le voci di oggi e passate restano come sono
            errori.append(f"coda: {quando} non è un giorno di uscita per «{tipo}» ({chiave})")
        if tipo in ("domenica", "shabbat") and not str(chiave).endswith(str(quando)):
            errori.append(f"coda: la domenica {chiave} va pubblicata nella sua data, non il {quando}")
        if giorno >= oggi:
            settimana = tuple(giorno.isocalendar())[:2] + (tipo,)
            per_settimana[settimana] = per_settimana.get(settimana, 0) + 1
    for settimana, quanti in per_settimana.items():
        if quanti > MASSIMO_PER_TIPO[settimana[2]]:
            errori.append(f"coda: {quanti} post «{settimana[2]}» nella settimana {settimana[:2]}, "
                          f"il massimo è {MASSIMO_PER_TIPO[settimana[2]]}")
    for voce in dati.get("coda", []):   # le note di regia del direttore e del regista: brevi, senza link
        regia = voce.get("regia")
        if regia is None:
            continue
        if not isinstance(regia, dict) or any(not isinstance(v, str) or len(v) > 500 for v in regia.values()):
            errori.append(f"coda: le note di regia di {voce.get('chiave')} devono essere testi brevi (campo «regia»)")
        elif re.search(r"https?://|www\.", json.dumps(regia)):
            errori.append(f"coda: le note di regia di {voce.get('chiave')} contengono un link")
    for voce in dati.get("escluse", []):
        if not isinstance(voce, dict) or not voce.get("chiave") or not voce.get("motivo"):
            errori.append(f"escluse: ogni voce vuole chiave e motivo: {voce}")


def controlla_testo(chiave: str, campo: str, testo: object, errori: list[str]) -> None:
    if not isinstance(testo, str):
        errori.append(f"{chiave} · {campo}: non è un testo")
        return
    minimo, massimo = CAMPI[campo]
    if not minimo <= len(testo) <= massimo:
        errori.append(f"{chiave} · {campo}: {len(testo)} caratteri, ammessi {minimo}-{massimo}")
    for schema, motivo in VIETATI:
        if re.search(schema, testo, re.IGNORECASE if schema != VIETATI[5][0] else 0):
            errori.append(f"{chiave} · {campo}: {motivo}")


def leggi_riscritture(errori: list[str], scartati: dict[str, list[str]] | None = None) -> list[dict]:
    """Le riscritture degli agenti. Gli errori di testo di un post (un link, una lunghezza
    sbagliata…) vanno in «scartati»: quel post si toglie dalla coda e il resto del piano
    si salva. Gli altri errori (file illeggibili, chiavi inesistenti) vanno in «errori»."""
    scartati = {} if scartati is None else scartati
    voci = []
    cartella = RADICE / ".social" / "riscritture"
    testi = json.loads((RADICE / "data" / "promozione.json").read_text(encoding="utf-8"))
    for file in sorted(cartella.glob("*.json")) if cartella.exists() else []:
        try:
            voce = json.loads(file.read_text(encoding="utf-8"))
        except ValueError as err:
            errori.append(f"{file.name}: JSON non valido: {err}")
            continue
        chiave, campi = voce.get("chiave"), voce.get("campi") or {}
        if chiave not in testi:
            errori.append(f"{file.name}: chiave inesistente: {chiave}")
            continue
        difetti: list[str] = []
        for campo, valore in campi.items():
            if campo == "hashtag":
                if not (isinstance(valore, list) and 1 <= len(valore) <= HASHTAG_MAX):
                    difetti.append(f"{chiave} · hashtag: ne servono da 1 a {HASHTAG_MAX}")
                elif any(not re.fullmatch(r"[^\s#]+", str(h)) for h in valore):
                    difetti.append(f"{chiave} · hashtag: senza # e senza spazi")
            elif campo in CAMPI:
                controlla_testo(chiave, campo, valore, difetti)
            else:
                difetti.append(f"{chiave}: campo non permesso: {campo}")
        if difetti:
            scartati.setdefault(chiave, []).extend(difetti)
        else:
            voci.append(voce)
    return voci


def togli_dalla_coda(scartati: dict[str, list[str]]) -> None:
    """I post con testi riscritti non validi non escono: via dalla coda, tra le escluse col motivo."""
    dati = coda.leggi() or {}
    dati["coda"] = [v for v in dati.get("coda", []) if v.get("chiave") not in scartati]
    escluse = [v for v in dati.get("escluse", []) if isinstance(v, dict) and v.get("chiave") not in scartati]
    for chiave, difetti in scartati.items():
        motivo = "; ".join(d.split(" · ", 1)[-1] for d in difetti)
        escluse.append({"chiave": chiave, "motivo": f"testi riscritti non validi ({motivo})"})
    dati["escluse"] = escluse
    (RADICE / "data" / "social-coda.json").write_text(json.dumps(dati, ensure_ascii=False, indent=2) + "\n",
                                                      encoding="utf-8")


def imprimi_impronte() -> int:
    """Le rubriche approvate in questo piano ricevono l'impronta di ciò che gli agenti hanno visto
    (.social/impronte.json, scritto da seo/social_stato.py): seo/coda.py le pubblica solo se non cambiano.
    Il valore lo mette lo script, non Claude."""
    try:
        impronte = json.loads((RADICE / ".social" / "impronte.json").read_text(encoding="utf-8"))
        dati = coda.leggi()
    except (OSError, ValueError):
        return 0
    if not dati or not isinstance(impronte, dict):
        return 0
    n = 0
    for v in dati.get("coda", []):
        k = v.get("chiave")
        if v.get("esito") == "approvato" and k in impronte and v.get("impronta") != impronte[k]:
            v["impronta"] = impronte[k]
            n += 1
    if n:
        (RADICE / "data" / "social-coda.json").write_text(json.dumps(dati, ensure_ascii=False, indent=2) + "\n",
                                                          encoding="utf-8")
    return n


def applica(voci: list[dict]) -> int:
    percorso = RADICE / "data" / "promozione.json"
    testi = json.loads(percorso.read_text(encoding="utf-8"))
    for voce in voci:
        testi[voce["chiave"]].update(voce["campi"])
        testi[voce["chiave"]]["bloccato"] = True
    if voci:
        percorso.write_text(json.dumps(testi, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return len(voci)


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--applica", action="store_true")
    ap.add_argument("--senza-git", action="store_true")
    a = ap.parse_args()

    errori: list[str] = []
    if not a.senza_git:
        controlla_file(errori)
    controlla_coda(errori)
    scartati: dict[str, list[str]] = {}
    voci = leggi_riscritture(errori, scartati)
    rapporto = RADICE / ".social" / "validazione.md"
    rapporto.parent.mkdir(exist_ok=True)
    if errori:
        testo = "\n".join(f"- {e}" for e in errori)
        rapporto.write_text(f"La validazione ha fermato il salvataggio:\n\n{testo}\n", encoding="utf-8")
        print(f"✗ Validazione non superata:\n{testo}")
        return 1
    avviso = ""
    if scartati:
        avviso = ("\n\nPost tolti dalla coda perché i testi riscritti non erano validi:\n"
                  + "\n".join(f"- {d}" for difetti in scartati.values() for d in difetti) + "\n")
        if a.applica:
            togli_dalla_coda(scartati)
        print(f"! Tolti dalla coda {len(scartati)} post con testi non validi:{avviso}")
    quaderno = ""
    if a.applica:
        import social_quaderno
        quaderno = social_quaderno.applica_proposta()
        print(quaderno)
    rapporto.write_text("Validazione superata." + avviso + (f"\n\n{quaderno}" if quaderno else "") + "\n", encoding="utf-8")
    applicate = applica(voci) if a.applica else 0
    impresse = imprimi_impronte() if a.applica else 0
    print(f"✓ Validazione superata. Riscritture applicate: {applicate}. Rubriche legate a ciò che è stato "
          f"controllato: {impresse}.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
