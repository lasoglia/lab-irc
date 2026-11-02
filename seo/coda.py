#!/usr/bin/env python3
"""
seo/coda.py — La coda dei post decisa dagli agenti social.

seo/pubblica.py pubblica il primo post della coda del giorno che non è ancora
uscito. Questo modulo mette davanti a loro l'elenco giusto: solo i post
approvati dagli agenti (data/social-coda.json) la cui data è arrivata.

  file assente          tutto come prima: l'ordine del kit
  file illeggibile      non si pubblica nulla, per prudenza
  "pausa": true         non si pubblica nulla
  "solo_coda": true     escono solo i post approvati (è il valore predefinito)
  "solo_coda": false    prima i post approvati, poi il resto del kit
"""

from __future__ import annotations

import datetime as dt
import json
from pathlib import Path

RADICE = Path(__file__).resolve().parent.parent
FILE_CODA = RADICE / "data" / "social-coda.json"


def leggi(percorso: Path | None = None) -> dict | None:
    p = percorso or FILE_CODA
    if not p.exists():
        return None
    return json.loads(p.read_text(encoding="utf-8"))


def chiavi_escluse(coda: dict) -> set[str]:
    return {e["chiave"] if isinstance(e, dict) else e for e in coda.get("escluse", [])}


def applica(elenco: list[dict], oggi: str | None = None, percorso: Path | None = None) -> list[dict]:
    """L'elenco dei post che oggi possono uscire, nell'ordine giusto."""
    try:
        coda = leggi(percorso)
    except (ValueError, OSError) as err:
        print(f"✗ data/social-coda.json illeggibile ({err}): per prudenza non pubblico nulla.")
        return []
    if coda is None:
        return elenco
    if coda.get("pausa"):
        print("Social in pausa (data/social-coda.json): non pubblico nulla.")
        return []

    oggi = oggi or dt.date.today().isoformat()
    per_chiave = {c["chiave"]: c for c in elenco}
    escluse = chiavi_escluse(coda)
    scelti = [per_chiave[v["chiave"]] for v in coda.get("coda", [])
              if v.get("chiave") in per_chiave
              and v.get("chiave") not in escluse
              and v.get("esito") == "approvato"
              and str(v.get("quando", "9999-12-31")) <= oggi]
    if coda.get("solo_coda", True):
        if not scelti:
            print("In coda non c'è nessun post approvato con la data di oggi.")
        return scelti
    gia = {c["chiave"] for c in scelti}
    return scelti + [c for c in elenco if c["chiave"] not in gia and c["chiave"] not in escluse]
