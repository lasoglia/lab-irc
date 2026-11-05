#!/usr/bin/env python3
"""
seo/social_verifica.py — Il controllo generale della catena social, SENZA pubblicare niente.

Dice in italiano semplice se oggi un post potrebbe uscire davvero:
  1. Cloudflare R2: si scrive, si legge dall'indirizzo pubblico, si cancella (seo/media_r2.py);
  2. il post che uscirebbe oggi (stessa scelta di seo/pubblica.py) e se le sue immagini o il suo
     video risultano online con lo stesso controllo usato prima di pubblicare (meta.online);
  3. Meta riesce a scaricare quell'immagine da R2: si crea un contenitore Instagram NON pubblicato
     (scade da solo dopo 24 ore) e se ne guarda lo stato;
  4. Telegram: il bot risponde (getMe, nessun messaggio);
  5. i prossimi giorni: che cosa è previsto e che cosa è in coda, per vedere i buchi.

USO
---
  python seo/social_verifica.py [--giorno AAAA-MM-GG] [--giorni 7]
"""

from __future__ import annotations

import argparse
import datetime as dt
import os
import sys
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import coda as coda_agenti  # noqa: E402
import genera as g  # noqa: E402
import media_r2 as r2  # noqa: E402
import meta  # noqa: E402
import pubblica as pb  # noqa: E402
import social_calendario as cal  # noqa: E402

problemi: list[str] = []   # bloccano il post di oggi: l'Action fallisce e GitHub manda un'email
avvisi: list[str] = []     # da sapere (per esempio un giorno senza post in coda), non bloccano


def ok(testo: str) -> None:
    print(f"✓ {testo}")


def ko(testo: str) -> None:
    print(f"✗ {testo}")
    problemi.append(testo)


def post_di_oggi(oggi: dt.date) -> tuple[str | None, dict | None]:
    """(coda, primo post che uscirebbe oggi), con la stessa scelta di seo/pubblica.py."""
    coda = pb.CODE.get(cal.tipo_del_giorno(oggi))
    if not coda:
        return None, None
    elenco = pb.leggi_json(g.RADICE / "promozione" / pb.FILE_CODA[coda], [])
    s = oggi.isoformat()
    stato = coda_agenti.leggi() or {}
    if stato.get("pausa"):
        print("· i social sono in pausa (data/social-coda.json)")
        return coda, None
    if coda in ("domenica", "sabato", "gioco"):
        elenco = [d for d in elenco if d.get("data") == s]
    if coda == "lezioni":
        elenco = elenco + pb.leggi_json(g.RADICE / "promozione" / "prof.json", [])
    if coda == "reel":
        escluse = coda_agenti.chiavi_escluse(stato)
        di_oggi = {v.get("chiave") for v in stato.get("coda", []) if v.get("esito") == "approvato"
                   and str(v.get("quando")) == s and v.get("chiave") not in escluse}
        elenco = [r for r in elenco if r.get("origine") in di_oggi]
    elif coda != "gioco":
        elenco = coda_agenti.applica(elenco, s)
        if coda == "lezioni":
            elenco = pb.senza_reel(elenco)
    reg_meta = pb.leggi_json(g.RADICE / "data" / "meta.json", {})
    for p in elenco:
        if "instagram" not in reg_meta.get(p["chiave"], {}):
            return coda, p
    return coda, None


def prova_instagram(url: str, video: bool) -> None:
    token = os.environ.get("META_TOKEN")
    if not token:
        ko("META_TOKEN non impostato: non posso provare Instagram")
        return
    try:
        _, chiave, ig_id = meta.trova_account(token)
    except meta.ErroreMeta as err:
        ko(f"Meta: {err}")
        return
    if not ig_id:
        ko("nessun Instagram professionale collegato alla Pagina")
        return
    try:
        campi = {"media_type": "REELS", "video_url": url} if video else {"image_url": url}
        c = meta.chiama("POST", f"{ig_id}/media", access_token=chiave, **campi)["id"]
        for _ in range(36 if video else 12):
            stato = meta.chiama("GET", c, fields="status_code", access_token=chiave).get("status_code")
            if stato in ("FINISHED", "ERROR", "EXPIRED"):
                break
            time.sleep(5)
        if stato == "FINISHED":
            ok("Instagram scarica il file da Cloudflare R2 (contenitore di prova creato, NON pubblicato)")
        else:
            ko(f"Instagram non riesce a usare il file da R2 (stato: {stato})")
    except Exception as err:
        ko(f"Instagram: {err}")


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--giorno", help="AAAA-MM-GG (predefinito oggi, ora italiana)")
    ap.add_argument("--giorni", type=int, default=7)
    a = ap.parse_args()
    from rubriche import oggi_in_italia
    oggi = dt.date.fromisoformat(a.giorno) if a.giorno else oggi_in_italia()

    print("## 1. Cloudflare R2")
    chiavi = [os.environ.get(k, "") for k in ("R2_ACCESS_KEY_ID", "R2_SECRET_ACCESS_KEY", "CLOUDFLARE_ACCOUNT_ID")]
    if all(chiavi):
        if r2.prova(*chiavi) != 0:
            problemi.append("Cloudflare R2 non funziona del tutto (vedi sopra)")
    else:
        ko("chiavi di R2 mancanti")

    print(f"\n## 2. Il post di oggi ({oggi.isoformat()}, {cal.tipo_del_giorno(oggi) or 'niente in calendario'})")
    coda, post = post_di_oggi(oggi)
    indirizzi: list[str] = []
    if not coda:
        print("· oggi il calendario non prevede un post")
    elif not post:
        print(f"· coda «{coda}»: nessun post da pubblicare (già uscito o niente in coda)")
    else:
        print(f"· coda «{coda}»: {pb.descrivi(post)}")
        indirizzi = pb.da_controllare(post)
        for u in indirizzi:
            (ok if meta.online(u) else ko)(f"online: {u}")

    print("\n## 3. Meta scarica da R2?")
    video = bool(post and post.get("video"))
    if not indirizzi:   # nessun post oggi: si prova con l'ultima immagine caricata su R2
        cartoline = sorted((d, k) for k, d in r2.registro_valido().items() if k.startswith("cartoline/"))
        indirizzi = [f"{r2.URL_PUBBLICO}/{cartoline[-1][1]}"] if cartoline else []
        video = False
    if indirizzi:
        prova_instagram(indirizzi[0], video)
    else:
        print("· nessun file su R2 con cui provare")

    print("\n## 4. Telegram")
    token = os.environ.get("TELEGRAM_BOT_TOKEN")
    if token:
        try:
            import telegram as tg
            esito = tg.chiama(token, "getMe", {})
            (ok if esito.get("ok") else ko)(f"bot Telegram: {esito.get('result', {}).get('username', esito)}")
        except Exception as err:
            ko(f"Telegram: {err}")
    else:
        ko("TELEGRAM_BOT_TOKEN non impostato")

    print(f"\n## 5. I prossimi {a.giorni} giorni")
    stato = coda_agenti.leggi() or {}
    reg_meta = pb.leggi_json(g.RADICE / "data" / "meta.json", {})
    reg_tg = pb.leggi_json(g.RADICE / "data" / "telegram.json", {})
    uscite = set(reg_tg) | {k for k, v in reg_meta.items() if v}
    uscite |= {r.get("origine") for r in pb.leggi_json(g.RADICE / "promozione" / "reel.json", [])
               if r.get("chiave") in uscite}   # per i reel la coda usa la chiave della lezione
    in_coda: dict[str, list[str]] = {}
    for v in stato.get("coda", []):
        chiave = v.get("chiave", "")
        if v.get("esito") != "approvato" or chiave in uscite:
            continue
        quando = str(v.get("quando"))
        if quando < oggi.isoformat():
            print(f"· in ritardo dal {quando}: {chiave[:70]}")
        in_coda.setdefault(quando, []).append(chiave[:60])
    for n in range(a.giorni):
        d = oggi + dt.timedelta(days=n)
        tipo = cal.tipo_del_giorno(d)
        if not tipo:
            continue
        cosa = ", ".join(in_coda.get(d.isoformat(), []))
        if tipo == "gioco":
            gioco = cal.gioco_del_giorno(d) or {}
            cosa = f"reel del gioco «{gioco.get('titolo', '?')}» (preparato il mercoledì sera)"
        print(f"· {d.isoformat()} {tipo:9} {cosa or '— NIENTE IN CODA —'}")
        if not cosa and tipo in ("lezione", "reel", "shabbat", "domenica", "prof"):
            avvisi.append(f"{d.isoformat()} ({tipo}): niente di approvato in coda")

    print("\n## Esito")
    if avvisi:
        print("Da sapere:\n" + "\n".join(f"- {p}" for p in avvisi))
    if problemi:
        print("Da sistemare:\n" + "\n".join(f"- {p}" for p in problemi))
        return 1
    print("La catena funziona: Cloudflare, Meta e Telegram rispondono.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
