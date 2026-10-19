#!/usr/bin/env python3
"""
seo/meta.py — Pubblica in automatico sulla Pagina Facebook e su Instagram.

Come seo/telegram.py: ogni volta che parte pubblica UN solo post per canale,
il primo del kit social (promozione/cartoline.json, nell'ordine consigliato)
che su quel canale non è ancora uscito, con la sua cartolina.
I post già usciti sono segnati in data/meta.json con la data.

Serve un segreto, salvato su GitHub e mai scritto nei file:
  META_TOKEN         la chiave dell'«utente di sistema» di Meta Business,
                     con i permessi pages_show_list, pages_read_engagement,
                     pages_manage_posts, instagram_basic, instagram_content_publish
Facoltativo (non segreto): META_PAGINA_ID, se l'utente gestisce più Pagine.

La Pagina e l'account Instagram collegato li trova da solo dalla chiave.

USO
---
  python seo/meta.py               pubblica il prossimo post
  python seo/meta.py --anteprima   mostra il prossimo post senza pubblicarlo
"""

from __future__ import annotations

import argparse
import datetime as dt
import json
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import genera as g  # noqa: E402

API = "https://graph.facebook.com/" + os.environ.get("META_API_VERSIONE", "v23.0")


class ErroreMeta(Exception):
    pass


def chiama(metodo: str, percorso: str, **parametri) -> dict:
    dati = urllib.parse.urlencode(parametri).encode()
    if metodo == "GET":
        richiesta = urllib.request.Request(f"{API}/{percorso}?{dati.decode()}")
    else:
        richiesta = urllib.request.Request(f"{API}/{percorso}", data=dati, method="POST")
    try:
        with urllib.request.urlopen(richiesta, timeout=60) as r:
            return json.loads(r.read())
    except urllib.error.HTTPError as err:   # Meta spiega l'errore nel corpo della risposta
        try:
            msg = json.loads(err.read()).get("error", {}).get("message", str(err))
        except Exception:
            msg = str(err)
        raise ErroreMeta(msg) from None


def online(url: str) -> bool:
    try:
        with urllib.request.urlopen(urllib.request.Request(url, method="HEAD"), timeout=20) as r:
            return r.status == 200
    except Exception:
        return False


def trova_account(token: str) -> tuple[str, str, str | None]:
    """(id della Pagina, chiave della Pagina, id dell'account Instagram collegato)."""
    pagine = chiama("GET", "me/accounts", access_token=token,
                    fields="id,name,access_token,instagram_business_account").get("data", [])
    scelta = os.environ.get("META_PAGINA_ID")
    pagina = next((p for p in pagine if not scelta or p["id"] == scelta), None)
    if not pagina:
        raise ErroreMeta("nessuna Pagina Facebook raggiungibile con questa chiave")
    ig = (pagina.get("instagram_business_account") or {}).get("id")
    print(f"Pagina: {pagina.get('name')} · Instagram collegato: {'sì' if ig else 'no'}")
    return pagina["id"], pagina["access_token"], ig


def pubblica_facebook(pagina_id: str, chiave_pagina: str, foto: str, testo: str) -> None:
    chiama("POST", f"{pagina_id}/photos", url=foto, caption=testo, access_token=chiave_pagina)


def pubblica_instagram(ig_id: str, chiave: str, foto: str, testo: str) -> None:
    # Instagram pubblica in due tempi: prepara il contenuto, poi lo rende visibile
    contenitore = chiama("POST", f"{ig_id}/media", image_url=foto, caption=testo,
                         access_token=chiave)["id"]
    for _ in range(20):
        stato = chiama("GET", contenitore, fields="status_code", access_token=chiave).get("status_code")
        if stato == "FINISHED":
            break
        if stato in ("ERROR", "EXPIRED"):
            raise ErroreMeta(f"Instagram non ha accettato l'immagine ({stato})")
        time.sleep(5)
    chiama("POST", f"{ig_id}/media_publish", creation_id=contenitore, access_token=chiave)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--anteprima", action="store_true", help="non pubblica, mostra soltanto")
    a = ap.parse_args()

    elenco_file = g.RADICE / "promozione" / "cartoline.json"
    if not elenco_file.exists():
        print("Kit social non ancora pronto: niente da pubblicare.")
        return 0
    elenco = json.loads(elenco_file.read_text(encoding="utf-8"))
    registro_file = g.RADICE / "data" / "meta.json"
    registro = json.loads(registro_file.read_text(encoding="utf-8")) if registro_file.exists() else {}

    def prossimo(canale):
        return next((c for c in elenco if canale not in registro.get(c["chiave"], {})), None)

    canali = {c: prossimo(c) for c in ("facebook", "instagram")}
    for canale, post in canali.items():
        print(f"{canale}: {post['titolo'] if post else 'tutti i post sono già usciti'}")
    if a.anteprima or not any(canali.values()):
        return 0

    token = os.environ.get("META_TOKEN")
    if not token:
        print("! Segreto META_TOKEN non impostato: non pubblico nulla su Facebook e Instagram.")
        return 0

    try:
        pagina_id, chiave_pagina, ig_id = trova_account(token)
    except ErroreMeta as err:
        print(f"✗ Meta: {err}")
        return 1

    errori = 0
    for canale, post in canali.items():
        if not post:
            continue
        foto = f"{g.URL_SITO}/promozione/cartoline/{post['file'].removesuffix('.png')}.jpg"
        if not online(foto):
            print(f"✗ {canale}: la cartolina non è ancora online ({foto})")
            errori += 1
            continue
        try:
            if canale == "facebook":
                pubblica_facebook(pagina_id, chiave_pagina, foto, post["facebook"])
            elif ig_id:
                pubblica_instagram(ig_id, chiave_pagina, foto, post["instagram"])
            else:
                print("✗ instagram: nessun account Instagram professionale collegato alla Pagina")
                errori += 1
                continue
        except ErroreMeta as err:
            print(f"✗ {canale}: {err}")
            errori += 1
            continue
        registro.setdefault(post["chiave"], {})[canale] = dt.date.today().isoformat()
        print(f"✓ Pubblicato su {canale}: {post['titolo']}")

    registro_file.write_text(json.dumps(registro, ensure_ascii=False, indent=2, sort_keys=True) + "\n",
                             encoding="utf-8")
    return 1 if errori else 0


if __name__ == "__main__":
    sys.exit(main())
