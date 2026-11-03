#!/usr/bin/env python3
"""
seo/social_controllo.py — Controlla che i post del giorno siano usciti davvero.

Nell'Action di pubblicazione i passi hanno continue-on-error: un post rifiutato da
Meta lascia il segno di spunta verde e nessuno lo viene a sapere. Questo script
guarda i registri, che si aggiornano solo dopo una pubblicazione riuscita.
Esce con errore (e GitHub manda un'email) se manca qualcosa.

Un canale conta solo se ha già pubblicato almeno una volta.

USO
---
  python seo/social_controllo.py                     controlla ieri
  python seo/social_controllo.py --giorno 2026-11-09 controlla quel giorno
"""

from __future__ import annotations

import argparse
import datetime as dt
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import coda  # noqa: E402
import social_calendario as cal  # noqa: E402

RADICE = coda.RADICE


def carica(nome: str) -> dict:
    p = RADICE / "data" / nome
    return json.loads(p.read_text(encoding="utf-8")) if p.exists() else {}


def valuta(giorno: str, telegram: dict, meta: dict, stato_coda: dict | None) -> tuple[str, list[str]]:
    """(esito, canali mancanti). Esiti: ok, non-previsto, in-pausa, mancante."""
    settimana = dt.date.fromisoformat(giorno).weekday()
    if cal.tipo_del_giorno(dt.date.fromisoformat(giorno)) is None:   # sabato, o vacanza senza striscia
        return "non-previsto", []
    if stato_coda is not None and stato_coda.get("pausa"):
        return "in-pausa", []

    attivi = {}
    if telegram:
        attivi["telegram"] = any(v == giorno for v in telegram.values())
    for canale in ("facebook", "instagram"):
        if any(canale in v for v in meta.values()):
            attivi[canale] = any(v.get(canale) == giorno for v in meta.values())
    mancanti = sorted(c for c, fatto in attivi.items() if not fatto)

    # il reel del gioco non passa dalla coda degli agenti (testi fissi, seo/gioco_reel.py)
    del_gioco = cal.tipo_del_giorno(dt.date.fromisoformat(giorno)) == "gioco"
    if stato_coda is not None and stato_coda.get("solo_coda", True) and not any(attivi.values()) and not del_gioco:
        escluse = coda.chiavi_escluse(stato_coda)
        previsti = [v for v in stato_coda.get("coda", [])
                    if v.get("quando") == giorno and v.get("chiave") not in escluse]
        if not previsti:
            return "mancante", ["nessun post in coda: piano non preparato o uscita lasciata scoperta"]
    return ("mancante" if mancanti else "ok"), mancanti


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--giorno", help="AAAA-MM-GG, predefinito ieri")
    a = ap.parse_args()
    giorno = a.giorno or (dt.date.today() - dt.timedelta(days=1)).isoformat()

    esito, mancanti = valuta(giorno, carica("telegram.json"), carica("meta.json"), coda.leggi())
    cartella = RADICE / ".social"
    cartella.mkdir(exist_ok=True)
    testo = f"Controllo del {giorno}: {esito}."
    if mancanti:
        testo += "\n\nManca: " + "; ".join(mancanti) + "."
    (cartella / "controllo.md").write_text(testo + "\n", encoding="utf-8")
    print(testo)
    return 1 if esito == "mancante" else 0


if __name__ == "__main__":
    sys.exit(main())
