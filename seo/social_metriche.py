#!/usr/bin/env python3
"""
seo/social_metriche.py — Raccoglie i numeri dei post, senza dati personali.

Scrive data/social-metriche.json: reazioni, commenti e condivisioni per post,
follower, iscritti. Il repository è pubblico, quindi qui NON finiscono mai testi
dei commenti, nomi o profili di chi commenta: solo conteggi.

Bastano i permessi già presenti nella chiave META_TOKEN. Copertura, visualizzazioni
e salvataggi di Instagram richiedono anche instagram_manage_insights: se manca,
lo script lo segnala tra gli avvisi e prosegue con il resto.

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


def metriche_instagram(ig_id: str, chiave: str, indice: dict, avvisi: list[str]) -> tuple[list, int | None]:
    risposta = m.chiama("GET", f"{ig_id}/media", access_token=chiave, limit=50,
                        fields="caption,timestamp,permalink,like_count,comments_count")
    post = []
    approfondite = True
    for voce in risposta.get("data", []):
        k = indice.get(inizio(voce.get("caption", "")))
        if not k:
            continue
        riga = {"chiave": k, "data": voce.get("timestamp", "")[:10], "mi_piace": voce.get("like_count"),
                "commenti": voce.get("comments_count"), "link": voce.get("permalink")}
        if approfondite:
            try:
                dati = m.chiama("GET", f"{voce['id']}/insights", access_token=chiave,
                                metric="reach,views,saved,shares")
                for metrica in dati.get("data", []):
                    riga[metrica["name"]] = metrica.get("values", [{}])[0].get("value")
            except m.ErroreMeta as err:
                approfondite = False
                avvisi.append(f"Instagram: copertura e visualizzazioni non disponibili ({err}). "
                              "Serve il permesso instagram_manage_insights.")
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
    elenco = json.loads((g.RADICE / "promozione" / "cartoline.json").read_text(encoding="utf-8"))
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
