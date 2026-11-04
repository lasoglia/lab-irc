#!/usr/bin/env python3
"""
seo/social_quaderno.py — Il quaderno del Lab: i social imparano un gradino alla volta.

data/social-quaderno.json è la memoria di che cosa funziona, aggiornata ogni settimana dagli
agenti (analista ed esploratore) nel piano settimanale e controllata da questo script:

  regole_apprese   ciò che i numeri hanno confermato (o suggeriscono), con la prova
                   {"regola", "prova", "dal", "forza": "ipotesi" | "confermata"}
  esperimento      l'esperimento della settimana: UNA cosa cambiata, con l'ipotesi
                   {"ipotesi", "istruzione", "misura", "dal", "al"}
  esperimenti      quelli finiti, con l'esito e i numeri
  idee             idee nuove da fuori (formati, tendenze), con fonte e stato
                   {"idea", "fonte", "stato": "nuova" | "in prova" | "adottata" | "scartata", "perché"}

Chi scrive i post (seo/promozione.py, seo/rubriche.py, seo/reel.py) riceve in coda alle sue
istruzioni le regole confermate e l'istruzione dell'esperimento in corso (istruzioni_apprese()).
Gli agenti scrivono solo una proposta in .social/quaderno-proposta.json: qui si controlla
(forma, lunghezze, niente link o dati personali) e si applica.
"""

from __future__ import annotations

import datetime as dt
import json
import re
from pathlib import Path

RADICE = Path(__file__).resolve().parent.parent
FILE = RADICE / "data" / "social-quaderno.json"
PROPOSTA = RADICE / ".social" / "quaderno-proposta.json"
MAX_REGOLE, MAX_IDEE, MAX_ESPERIMENTI = 12, 30, 40
STATI_IDEA = {"nuova", "in prova", "adottata", "scartata"}
# a chi vale una regola (facoltativo): così ogni agente riceve quelle che lo riguardano
AMBITI = {"tutti", "reel", "caroselli", "storie", "didascalie", "calendario", "grafica", "giochi"}
VUOTO = {"regole_apprese": [], "esperimento": None, "esperimenti": [], "idee": []}


def leggi() -> dict:
    return {**VUOTO, **(json.loads(FILE.read_text(encoding="utf-8")) if FILE.exists() else {})}


def _testo(v, massimo: int) -> bool:
    return isinstance(v, str) and 0 < len(v) <= massimo


def controlla(q: dict) -> list[str]:
    """Gli errori di forma della proposta (lista vuota = va bene)."""
    errori = []
    if not isinstance(q, dict):
        return ["il quaderno non è un oggetto JSON"]
    regole = q.get("regole_apprese", [])
    if not isinstance(regole, list) or len(regole) > MAX_REGOLE:
        errori.append(f"regole_apprese: al massimo {MAX_REGOLE}")
    for r in regole if isinstance(regole, list) else []:
        if not (_testo(r.get("regola"), 220) and _testo(r.get("prova"), 400)) or r.get("forza") not in ("ipotesi", "confermata"):
            errori.append(f"regola non valida: {str(r)[:80]}")
        elif r.get("per", "tutti") not in AMBITI:
            errori.append(f"regola con ambito sconosciuto «{r.get('per')}» (ammessi: {', '.join(sorted(AMBITI))})")
    e = q.get("esperimento")
    if e is not None and not (isinstance(e, dict) and _testo(e.get("ipotesi"), 300) and _testo(e.get("istruzione"), 300)
                              and _testo(e.get("misura"), 200)):
        errori.append("esperimento: servono ipotesi, istruzione e misura (brevi)")
    if len(q.get("esperimenti", [])) > MAX_ESPERIMENTI:
        errori.append(f"esperimenti: al massimo {MAX_ESPERIMENTI}")
    idee = q.get("idee", [])
    if not isinstance(idee, list) or len(idee) > MAX_IDEE:
        errori.append(f"idee: al massimo {MAX_IDEE}")
    for i in idee if isinstance(idee, list) else []:
        if not _testo(i.get("idea"), 300) or i.get("stato") not in STATI_IDEA:
            errori.append(f"idea non valida: {str(i)[:80]}")
    testo = json.dumps(q, ensure_ascii=False)
    if re.search(r"[\w.+-]+@[\w-]+\.\w+", testo):
        errori.append("contiene un indirizzo email")
    return errori


def applica_proposta() -> str:
    """Applica .social/quaderno-proposta.json se c'è ed è valida. Restituisce un messaggio."""
    if not PROPOSTA.exists():
        return "quaderno: nessuna proposta"
    try:
        q = json.loads(PROPOSTA.read_text(encoding="utf-8"))
    except ValueError as err:
        return f"quaderno: proposta non leggibile ({err}), resta quello di prima"
    errori = controlla(q)
    if errori:
        return "quaderno: proposta scartata (" + "; ".join(errori[:4]) + "), resta quello di prima"
    q = {**VUOTO, **{k: q[k] for k in VUOTO if k in q}, "aggiornato": dt.date.today().isoformat()}
    FILE.write_text(json.dumps(q, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return f"quaderno: aggiornato ({len(q['regole_apprese'])} regole, {len(q['idee'])} idee)"


def istruzioni_apprese(ambito: str | None = None) -> str:
    """Il testo da aggiungere alle istruzioni di chi scrive: regole confermate ed esperimento in corso.
    Con «ambito» (reel, caroselli, storie…) solo le regole per tutti e per quell'ambito."""
    q = leggi()
    oggi = dt.date.today().isoformat()
    righe = [f"- {r['regola']}" + (f" (per: {r['per']})" if r.get("per", "tutti") != "tutti" else "")
             for r in q.get("regole_apprese", [])
             if r.get("forza") == "confermata" and (ambito is None or r.get("per", "tutti") in ("tutti", ambito))]
    e = q.get("esperimento")
    attivo = e and (not e.get("al") or e["al"] >= oggi) and (not e.get("dal") or e["dal"] <= oggi)
    if not righe and not attivo:
        return ""
    testo = "\n\nCiò che il Lab ha imparato dai numeri dei post (valgono più delle abitudini):\n" + "\n".join(righe) if righe else ""
    if attivo:
        testo += f"\n\nEsperimento di questa settimana (applicalo): {e['istruzione']}"
    return testo
