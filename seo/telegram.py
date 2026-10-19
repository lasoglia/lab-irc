#!/usr/bin/env python3
"""
seo/telegram.py — Pubblica in automatico sul canale Telegram del Lab IRC.

Ogni volta che parte, pubblica UN solo post: il primo del kit social
(promozione/cartoline.json, nell'ordine consigliato) che non è ancora uscito.
Così il canale riceve un post alla volta, al ritmo deciso dall'Action
(promozione-telegram.yml), invece di trenta post tutti insieme.

I post già usciti sono segnati in data/telegram.json con la data.

Servono due segreti, salvati su GitHub e mai scritti nei file:
  TELEGRAM_BOT_TOKEN   la chiave del bot, data da @BotFather
  TELEGRAM_CANALE      il canale, per esempio @labirc

USO
---
  python seo/telegram.py               pubblica il prossimo post
  python seo/telegram.py --anteprima   mostra il prossimo post senza pubblicarlo
"""

from __future__ import annotations

import argparse
import datetime as dt
import json
import os
import sys
import urllib.error
import urllib.request
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import genera as g  # noqa: E402

LIMITE_DIDASCALIA = 1024     # Telegram non accetta didascalie più lunghe sotto una foto


def chiama(token: str, metodo: str, dati: dict) -> dict:
    richiesta = urllib.request.Request(
        f"https://api.telegram.org/bot{token}/{metodo}",
        data=json.dumps(dati).encode(), headers={"Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(richiesta, timeout=30) as r:
            return json.loads(r.read())
    except urllib.error.HTTPError as err:   # Telegram spiega l'errore nel corpo della risposta
        return json.loads(err.read() or b"{}") or {"ok": False, "description": str(err)}


def online(url: str) -> bool:
    try:
        with urllib.request.urlopen(urllib.request.Request(url, method="HEAD"), timeout=20) as r:
            return r.status == 200
    except Exception:
        return False


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--anteprima", action="store_true", help="non pubblica, mostra soltanto")
    a = ap.parse_args()

    elenco_file = g.RADICE / "promozione" / "cartoline.json"
    if not elenco_file.exists():
        print("Kit social non ancora pronto: niente da pubblicare.")
        return 0
    elenco = json.loads(elenco_file.read_text(encoding="utf-8"))
    registro_file = g.RADICE / "data" / "telegram.json"
    registro = json.loads(registro_file.read_text(encoding="utf-8")) if registro_file.exists() else {}

    prossimo = next((c for c in elenco if c["chiave"] not in registro), None)
    if not prossimo:
        print("Tutti i post del kit sono già usciti su Telegram.")
        return 0
    testo = prossimo["telegram"]
    print(f"Prossimo post: {prossimo['titolo']}\n\n{testo}\n")
    if a.anteprima:
        return 0

    token, canale = os.environ.get("TELEGRAM_BOT_TOKEN"), os.environ.get("TELEGRAM_CANALE")
    if not token or not canale:
        print("! Segreti TELEGRAM_BOT_TOKEN / TELEGRAM_CANALE non impostati: non pubblico nulla.")
        return 0

    foto = f"{g.URL_SITO}/promozione/cartoline/{prossimo['file']}"
    if len(testo) <= LIMITE_DIDASCALIA and online(foto):
        esito = chiama(token, "sendPhoto", {"chat_id": canale, "photo": foto, "caption": testo})
    else:
        esito = chiama(token, "sendMessage", {"chat_id": canale, "text": testo})
    if not esito.get("ok"):
        print(f"✗ Telegram ha rifiutato il post: {esito.get('description')}")
        return 1

    registro[prossimo["chiave"]] = dt.date.today().isoformat()
    registro_file.write_text(json.dumps(registro, ensure_ascii=False, indent=2, sort_keys=True) + "\n",
                             encoding="utf-8")
    print(f"✓ Pubblicato su Telegram: {prossimo['titolo']}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
