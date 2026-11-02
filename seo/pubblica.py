#!/usr/bin/env python3
"""
seo/pubblica.py — Ogni giorno decide che cosa esce sui social e lo pubblica.

Il calendario della settimana (ora italiana):
  lunedì, mercoledì, venerdì   una lezione (copertina + carosello)       promozione/cartoline.json
  martedì, sabato              «Il prof del Lab», l'avatar con il fumetto promozione/prof.json
  domenica                     «La domenica del Lab»                     promozione/domenica.json
  giovedì                      riposo

Per ogni canale esce il primo post della coda del giorno che su quel canale non
è ancora uscito (la domenica solo quello di quella data), e solo se le sue
immagini sono già online. Se c'è data/social-coda.json escono solo i post che
gli agenti hanno controllato e approvato per quella data (seo/coda.py). I post usciti sono segnati in data/telegram.json e
data/meta.json.

  Telegram   album di foto (o una foto) con il testo        TELEGRAM_BOT_TOKEN, TELEGRAM_CANALE
  Facebook   post con una o più foto sulla Pagina            META_TOKEN (META_PAGINA_ID facoltativo)
  Instagram  carosello (o una foto) con la didascalia        META_TOKEN

USO
---
  python seo/pubblica.py                         la coda di oggi, su tutti i canali
  python seo/pubblica.py --coda prof             un'altra coda (lezioni, prof, domenica)
  python seo/pubblica.py --canali telegram       solo alcuni canali (telegram, facebook, instagram)
  python seo/pubblica.py --anteprima             mostra soltanto
  python seo/pubblica.py --foto-profilo FILE     mette FILE come foto del canale Telegram
"""

from __future__ import annotations

import argparse
import datetime as dt
import json
import os
import sys
import time
import uuid
import urllib.request
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import coda as coda_agenti  # noqa: E402
import genera as g  # noqa: E402
import meta  # noqa: E402
import telegram as tg  # noqa: E402
from rubriche import oggi_in_italia  # noqa: E402

CODE = {0: "lezioni", 1: "prof", 2: "lezioni", 3: None, 4: "lezioni", 5: "prof", 6: "domenica"}
FILE_CODA = {"lezioni": "cartoline.json", "prof": "prof.json", "domenica": "domenica.json"}
CANALI = ("telegram", "facebook", "instagram")


def url_immagine(file: str, formato: str = "jpg") -> str:
    nome = file.removesuffix(".png") + "." + formato
    return f"{g.URL_SITO}/promozione/cartoline/{nome}"


def immagini(post: dict) -> list[str]:
    return post.get("immagini") or [post["file"]]


# --------------------------------------------------------------------------
# Telegram
# --------------------------------------------------------------------------
def su_telegram(post: dict, token: str, canale: str) -> None:
    testo = post["telegram"]
    foto = [url_immagine(f) for f in immagini(post)][:10]
    if len(foto) > 1 and len(testo) <= tg.LIMITE_DIDASCALIA:
        album = [{"type": "photo", "media": u} for u in foto]
        album[0]["caption"] = testo
        esito = tg.chiama(token, "sendMediaGroup", {"chat_id": canale, "media": album})
    elif len(testo) <= tg.LIMITE_DIDASCALIA:
        esito = tg.chiama(token, "sendPhoto", {"chat_id": canale, "photo": foto[0], "caption": testo})
    else:
        esito = tg.chiama(token, "sendMessage", {"chat_id": canale, "text": testo})
    if not esito.get("ok"):
        raise RuntimeError(f"Telegram: {esito.get('description')}")


def foto_profilo_telegram(percorso: Path, token: str, canale: str) -> None:
    """setChatPhoto vuole il file vero e proprio (multipart), non un indirizzo."""
    confine = uuid.uuid4().hex
    corpo = (f"--{confine}\r\nContent-Disposition: form-data; name=\"chat_id\"\r\n\r\n{canale}\r\n"
             f"--{confine}\r\nContent-Disposition: form-data; name=\"photo\"; filename=\"{percorso.name}\"\r\n"
             f"Content-Type: image/{'png' if percorso.suffix == '.png' else 'jpeg'}\r\n\r\n").encode() \
        + percorso.read_bytes() + f"\r\n--{confine}--\r\n".encode()
    richiesta = urllib.request.Request(f"https://api.telegram.org/bot{token}/setChatPhoto", data=corpo,
                                       headers={"Content-Type": f"multipart/form-data; boundary={confine}"})
    try:
        with urllib.request.urlopen(richiesta, timeout=60) as r:
            esito = json.loads(r.read())
    except urllib.error.HTTPError as err:
        esito = json.loads(err.read() or b"{}")
    if not esito.get("ok"):
        raise RuntimeError(f"Telegram: {esito.get('description')}")


# --------------------------------------------------------------------------
# Facebook e Instagram
# --------------------------------------------------------------------------
def su_facebook(post: dict, pagina_id: str, chiave: str) -> None:
    foto = [url_immagine(f) for f in immagini(post)]
    if len(foto) == 1:
        meta.pubblica_facebook(pagina_id, chiave, foto[0], post["facebook"])
        return
    # più foto: si caricano senza pubblicarle, poi un solo post le raccoglie
    ids = [meta.chiama("POST", f"{pagina_id}/photos", url=u, published="false", access_token=chiave)["id"]
           for u in foto]
    allegati = {f"attached_media[{i}]": json.dumps({"media_fbid": x}) for i, x in enumerate(ids)}
    meta.chiama("POST", f"{pagina_id}/feed", message=post["facebook"], access_token=chiave, **allegati)


def attendi_contenitore(contenitore: str, chiave: str) -> None:
    for _ in range(24):
        stato = meta.chiama("GET", contenitore, fields="status_code", access_token=chiave).get("status_code")
        if stato == "FINISHED":
            return
        if stato in ("ERROR", "EXPIRED"):
            raise meta.ErroreMeta(f"Instagram non ha accettato l'immagine ({stato})")
        time.sleep(5)


def su_instagram(post: dict, ig_id: str, chiave: str) -> None:
    foto = [url_immagine(f) for f in immagini(post)][:10]
    if len(foto) == 1:
        meta.pubblica_instagram(ig_id, chiave, foto[0], post["instagram"])
        return
    figli = []
    for u in foto:
        c = meta.chiama("POST", f"{ig_id}/media", image_url=u, is_carousel_item="true", access_token=chiave)["id"]
        attendi_contenitore(c, chiave)
        figli.append(c)
    album = meta.chiama("POST", f"{ig_id}/media", media_type="CAROUSEL", children=",".join(figli),
                        caption=post["instagram"], access_token=chiave)["id"]
    attendi_contenitore(album, chiave)
    meta.chiama("POST", f"{ig_id}/media_publish", creation_id=album, access_token=chiave)


# --------------------------------------------------------------------------
def leggi_json(p: Path, vuoto):
    return json.loads(p.read_text(encoding="utf-8")) if p.exists() else vuoto


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--coda", choices=sorted(FILE_CODA), help="quale coda (di solito decide il giorno)")
    ap.add_argument("--canali", default="telegram,facebook,instagram")
    ap.add_argument("--anteprima", action="store_true", help="non pubblica, mostra soltanto")
    ap.add_argument("--foto-profilo", help="immagine da mettere come foto del canale Telegram")
    a = ap.parse_args()

    tg_token, tg_canale = os.environ.get("TELEGRAM_BOT_TOKEN"), os.environ.get("TELEGRAM_CANALE")
    if a.foto_profilo:
        if not tg_token or not tg_canale:
            print("! Segreti di Telegram non impostati.")
            return 1
        foto_profilo_telegram(g.RADICE / a.foto_profilo, tg_token, tg_canale)
        print("✓ Foto del canale Telegram aggiornata.")
        return 0

    oggi = oggi_in_italia()
    coda = a.coda or CODE[oggi.weekday()]
    if not coda:
        print("Oggi è giorno di riposo: niente da pubblicare.")
        return 0
    elenco = leggi_json(g.RADICE / "promozione" / FILE_CODA[coda], [])
    if coda == "domenica" and not a.coda:
        elenco = [d for d in elenco if d.get("data") == oggi.isoformat()]
    # solo i post approvati dagli agenti con la data arrivata (se c'è data/social-coda.json)
    elenco = coda_agenti.applica(elenco, oggi.isoformat())
    reg_tg_file, reg_meta_file = g.RADICE / "data" / "telegram.json", g.RADICE / "data" / "meta.json"
    reg_tg, reg_meta = leggi_json(reg_tg_file, {}), leggi_json(reg_meta_file, {})

    def uscito(post, canale):
        return post["chiave"] in reg_tg if canale == "telegram" else canale in reg_meta.get(post["chiave"], {})

    canali = [c for c in a.canali.split(",") if c in CANALI]
    scelti = {c: next((p for p in elenco if not uscito(p, c)), None) for c in canali}
    print(f"Coda di oggi ({oggi.isoformat()}): {coda}")
    for c, p in scelti.items():
        print(f"  {c}: {p['titolo'] + ' (' + str(len(immagini(p))) + ' immagini)' if p else 'niente di nuovo'}")
    if a.anteprima or not any(scelti.values()):
        return 0

    errori = 0
    pronti = {}
    for c, p in scelti.items():
        if p and not all(meta.online(url_immagine(f)) for f in immagini(p)):
            print(f"✗ {c}: le immagini di «{p['titolo']}» non sono ancora online")
            errori += 1
        elif p:
            pronti[c] = p

    if "telegram" in pronti:
        if not tg_token or not tg_canale:
            print("! Segreti di Telegram non impostati: salto Telegram.")
        else:
            try:
                su_telegram(pronti["telegram"], tg_token, tg_canale)
                reg_tg[pronti["telegram"]["chiave"]] = oggi.isoformat()
                print(f"✓ Telegram: {pronti['telegram']['titolo']}")
            except Exception as err:
                print(f"✗ {err}"); errori += 1

    if {"facebook", "instagram"} & set(pronti):
        token = os.environ.get("META_TOKEN")
        if not token:
            print("! Segreto META_TOKEN non impostato: salto Facebook e Instagram.")
        else:
            try:
                pagina_id, chiave, ig_id = meta.trova_account(token)
            except meta.ErroreMeta as err:
                print(f"✗ Meta: {err}"); return 1
            for c in ("facebook", "instagram"):
                if c not in pronti:
                    continue
                try:
                    if c == "facebook":
                        su_facebook(pronti[c], pagina_id, chiave)
                    elif ig_id:
                        su_instagram(pronti[c], ig_id, chiave)
                    else:
                        raise meta.ErroreMeta("nessun Instagram professionale collegato alla Pagina")
                    reg_meta.setdefault(pronti[c]["chiave"], {})[c] = oggi.isoformat()
                    print(f"✓ {c}: {pronti[c]['titolo']}")
                except Exception as err:
                    print(f"✗ {c}: {err}"); errori += 1

    for f, dati in ((reg_tg_file, reg_tg), (reg_meta_file, reg_meta)):
        f.write_text(json.dumps(dati, ensure_ascii=False, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    return 1 if errori else 0


if __name__ == "__main__":
    sys.exit(main())
