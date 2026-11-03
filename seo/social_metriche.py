#!/usr/bin/env python3
"""
seo/social_metriche.py — Raccoglie i numeri dei post, senza dati personali.

Scrive data/social-metriche.json: reazioni, commenti e condivisioni per post,
follower, iscritti. Il repository è pubblico, quindi qui NON finiscono mai testi
dei commenti, nomi o profili di chi commenta: solo conteggi.

Per ogni post Instagram anche tipo (reel o carosello), ora di uscita, copertura,
visualizzazioni, salvataggi, condivisioni e, per i reel, il tempo medio di visione:
sono i dati con cui il quaderno del Lab (data/social-quaderno.json) impara che cosa funziona.

USO
---
  python seo/social_metriche.py
"""

from __future__ import annotations

import datetime as dt
import json
import os
import re
import sys
import urllib.request
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import genera as g  # noqa: E402
import meta as m  # noqa: E402

FILE_METRICHE = g.RADICE / "data" / "social-metriche.json"
STORICO_MAX = 60


def inizio(testo: str) -> str:
    return re.sub(r"\s+", " ", testo or "").strip()[:50]


def indice_testi(elenco: list[dict], canale: str) -> dict[str, str]:
    return {inizio(c.get(canale, "")): c["chiave"] for c in elenco if c.get(canale)}


def conta(voce: dict, campo: str) -> int | None:
    return (voce.get(campo) or {}).get("summary", {}).get("total_count")


def metriche_facebook(pagina_id: str, chiave_pagina: str, indice: dict) -> tuple[list, int | None]:
    risposta = m.chiama("GET", f"{pagina_id}/published_posts", access_token=chiave_pagina, limit=50,
                        fields="message,created_time,permalink_url,shares,"
                               "reactions.summary(true).limit(0),comments.summary(true).limit(0)")
    post = []
    for voce in risposta.get("data", []):
        chiave = indice.get(inizio(voce.get("message", "")))
        if chiave:
            post.append({"chiave": chiave, "data": voce.get("created_time", "")[:10],
                         "reazioni": conta(voce, "reactions"), "commenti": conta(voce, "comments"),
                         "condivisioni": (voce.get("shares") or {}).get("count", 0),
                         "link": voce.get("permalink_url")})
    pagina = m.chiama("GET", pagina_id, access_token=chiave_pagina, fields="followers_count")
    return post, pagina.get("followers_count")


# le statistiche chieste a Instagram per tipo di post (una metrica non adatta al tipo fa fallire la richiesta)
METRICHE_IG = {"REELS": "reach,views,saved,shares,total_interactions,ig_reels_avg_watch_time,ig_reels_video_view_total_time",
               "FEED": "reach,views,saved,shares,total_interactions"}


def ora_di_roma(istante: str) -> str:
    try:
        from zoneinfo import ZoneInfo
        return dt.datetime.fromisoformat(istante.replace("+0000", "+00:00")).astimezone(ZoneInfo("Europe/Rome")).strftime("%H:%M")
    except (ValueError, KeyError):
        return ""


def metriche_instagram(ig_id: str, chiave: str, indice: dict, avvisi: list[str]) -> tuple[list, int | None]:
    risposta = m.chiama("GET", f"{ig_id}/media", access_token=chiave, limit=50,
                        fields="caption,timestamp,permalink,like_count,comments_count,media_type,media_product_type")
    post = []
    errori = 0
    for voce in risposta.get("data", []):
        k = indice.get(inizio(voce.get("caption", "")))
        if not k:
            continue
        tipo = voce.get("media_product_type") or "FEED"
        riga = {"chiave": k, "data": voce.get("timestamp", "")[:10], "ora": ora_di_roma(voce.get("timestamp", "")),
                "tipo": "reel" if tipo == "REELS" else ("carosello" if voce.get("media_type") == "CAROUSEL_ALBUM" else "foto"),
                "mi_piace": voce.get("like_count"), "commenti": voce.get("comments_count"), "link": voce.get("permalink")}
        try:
            dati = m.chiama("GET", f"{voce['id']}/insights", access_token=chiave, metric=METRICHE_IG.get(tipo, METRICHE_IG["FEED"]))
            for metrica in dati.get("data", []):
                riga[metrica["name"]] = metrica.get("values", [{}])[0].get("value")
        except m.ErroreMeta as err:
            errori += 1
            if errori == 1:
                avvisi.append(f"Instagram: statistiche di un post non disponibili ({err}).")
        post.append(riga)
    account = m.chiama("GET", ig_id, access_token=chiave, fields="followers_count")
    return post, account.get("followers_count")


def iscritti_telegram() -> int | None:
    token, canale = os.environ.get("TELEGRAM_BOT_TOKEN"), os.environ.get("TELEGRAM_CANALE")
    if not token or not canale:
        return None
    richiesta = urllib.request.Request(
        f"https://api.telegram.org/bot{token}/getChatMemberCount",
        data=json.dumps({"chat_id": canale}).encode(), headers={"Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(richiesta, timeout=30) as r:
            return json.loads(r.read()).get("result")
    except Exception:
        return None


def main() -> int:
    token = os.environ.get("META_TOKEN")
    if not token:
        print("! Segreto META_TOKEN non impostato: metriche non aggiornate.")
        return 0
    # tutti i post del Lab, non solo le lezioni: reel, strisce, Shabbat, grande domanda
    elenco = []
    for nome in ("cartoline.json", "reel.json", "reel-domenica.json", "prof.json", "sabato.json", "domenica.json",
                 "gioco.json"):
        f = g.RADICE / "promozione" / nome
        if f.exists():
            elenco += json.loads(f.read_text(encoding="utf-8"))
    precedenti = json.loads(FILE_METRICHE.read_text(encoding="utf-8")) if FILE_METRICHE.exists() else {}
    avvisi: list[str] = []
    fb, ig, seguaci_fb, seguaci_ig = [], [], None, None

    try:
        pagina_id, chiave_pagina, ig_id = m.trova_account(token)
    except m.ErroreMeta as err:
        print(f"✗ Meta: {err}")
        return 1
    try:
        fb, seguaci_fb = metriche_facebook(pagina_id, chiave_pagina, indice_testi(elenco, "facebook"))
    except m.ErroreMeta as err:
        avvisi.append(f"Facebook: {err}")
    if ig_id:
        try:
            ig, seguaci_ig = metriche_instagram(ig_id, chiave_pagina, indice_testi(elenco, "instagram"), avvisi)
        except m.ErroreMeta as err:
            avvisi.append(f"Instagram: {err}")

    # per imparare (seo/social_quaderno.py): la serie del reel, la leva del suo gancio, il motore
    extra = {}
    for c in elenco:
        e = {}
        if c.get("regia"):
            e["serie"] = c["regia"].get("serie")
        if c.get("ganci"):
            e["leva"] = c["ganci"][0].get("leva")
        if c.get("motore") or str(c.get("chiave", "")).startswith("gioco|"):
            e["motore"] = c.get("motore") or "gioco"
        if e:
            extra[c["chiave"]] = e
    for riga in fb + ig:
        riga.update(extra.get(riga.get("chiave"), {}))

    oggi = dt.date.today().isoformat()
    storico = [s for s in precedenti.get("storico", []) if s.get("data") != oggi]
    storico.append({"data": oggi, "facebook": seguaci_fb, "instagram": seguaci_ig,
                    "telegram": iscritti_telegram()})
    uscita = {"aggiornato": oggi, "facebook": fb, "instagram": ig,
              "storico": storico[-STORICO_MAX:], "avvisi": avvisi}
    FILE_METRICHE.write_text(json.dumps(uscita, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Metriche: {len(fb)} post Facebook, {len(ig)} post Instagram, {len(avvisi)} avvisi.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
