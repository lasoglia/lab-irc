#!/usr/bin/env python3
"""
seo/vetrina.py — La vetrina dei profili social del Lab IRC.

  python seo/vetrina.py --prepara   scrive gli elenchi della vetrina:
        promozione/vetrina.json        il post «Benvenuto nel Lab» (le immagini e i testi della
                                       presentazione del sito), la copertina di Facebook e le
                                       icone delle storie in evidenza (le disegna seo/cartoline.mjs)
        promozione/reel-vetrina.json   il video «Il prof si presenta» (lo monta seo/reel.mjs)
  python seo/vetrina.py --pubblica  pubblica, una volta sola (segnato nei registri):
        Instagram, Facebook, Telegram  il carosello di benvenuto e il video del prof
        Telegram                       la descrizione del canale e il benvenuto fissato in alto
        Facebook                       la copertina e la descrizione della Pagina (se la chiave
                                       di Meta ha il permesso pages_manage_metadata)
  python seo/vetrina.py --controlla controlla la chiave di Meta (permessi, Pagina, Instagram)
Bio, foto profilo, post fissati e storie in evidenza di Instagram non si possono
cambiare da un programma: si fanno a mano dall'app (testi e immagini sono pronti qui).
"""

from __future__ import annotations

import argparse
import datetime as dt
import json
import os
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import genera as g  # noqa: E402
import meta  # noqa: E402
import pubblica as pb  # noqa: E402
import telegram as tg  # noqa: E402

CARTELLA = g.RADICE / "promozione"
PRESENTAZIONE = ("Il laboratorio di Religione per le superiori. Lezioni, fascicoli e giochi gratis, "
                 "dalla prima alla quinta. Ogni giorno di scuola una lezione a fumetti, il sabato lo "
                 "Shabbat, la domenica la grande domanda.")
DESCRIZIONE_TELEGRAM = ("Il Lab IRC: lezioni di Religione Cattolica per le superiori, in caroselli e video a "
                        "fumetti. Sabato lo Shabbat del Lab, domenica la grande domanda. Tutto gratis su "
                        "www.labirc.it")

SCENE_PROF = [
    ("Che cos'è", "Il Lab IRC è il laboratorio di Religione Cattolica per le superiori. Online e gratis."),
    ("Per chi", "Per i colleghi che cercano materiali pronti e per i ragazzi, dalla prima alla quinta."),
    ("Che cosa trovi", "Lezioni da proiettare, fascicoli da sfogliare e giochi per ripassare."),
    ("Ogni giorno di scuola", "Una lezione in un carosello e in un video a fumetti. Come questo, sì."),
    ("Il sabato", "Lo Shabbat del Lab: la cultura ebraica, raccontata dalle fonti ebraiche."),
    ("La domenica", "La grande domanda: quelle che i ragazzi fanno davvero. Con risposte serie."),
]
TESTI_PROF = {
    "instagram": ("Piacere, sono il prof del Lab IRC 👋\n\nQui trovi la Religione Cattolica delle superiori in "
                  "formato social: ogni giorno di scuola una lezione in un carosello e in un video a fumetti, "
                  "il sabato lo Shabbat del Lab, la domenica la grande domanda.\n\nLezioni, fascicoli e giochi "
                  "sono gratis, dalla prima alla quinta: il link è nella bio.\n\n"
                  "#religionecattolica #irc #insegnantidireligione"),
    "facebook": ("Piacere, sono il prof del Lab IRC 👋\n\nOgni giorno di scuola una lezione di Religione in un "
                 "carosello e in un video a fumetti; il sabato lo Shabbat del Lab, la domenica la grande "
                 "domanda. Lezioni, fascicoli e giochi sono gratis, dalla prima alla quinta.\n\n"
                 "https://www.labirc.it/"),
    "telegram": ("👋 Piacere, sono il prof del Lab IRC!\n\nOgni giorno di scuola una lezione a fumetti, il "
                 "sabato lo Shabbat del Lab, la domenica la grande domanda. Tutto gratis su "
                 "https://www.labirc.it/"),
}
ICONE = [("lezioni", "Lezioni"), ("domanda", "La grande domanda"), ("shabbat", "Shabbat"),
         ("prof", "Il prof"), ("come", "Come si usa")]


def leggi(p: Path, vuoto):
    return json.loads(p.read_text(encoding="utf-8")) if p.exists() else vuoto


def scrivi(p: Path, dati) -> None:
    p.write_text(json.dumps(dati, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def prepara() -> int:
    sito = next((c for c in leggi(CARTELLA / "cartoline.json", []) if c["chiave"] == "_sito"), None)
    if not sito:
        print("! Manca la presentazione del sito in promozione/cartoline.json")
        return 1
    benvenuto = {"chiave": "vetrina-benvenuto", "titolo": "Benvenuto nel Lab IRC",
                 "file": sito["immagini"][0], "immagini": sito["immagini"],
                 "facebook": sito["facebook"], "instagram": sito["instagram"], "telegram": sito["telegram"]}
    scrivi(CARTELLA / "vetrina.json", {
        "benvenuto": benvenuto,
        "copertina_facebook": "vetrina-copertina-facebook.png",
        "storia": "vetrina-benvenuto-storia.png",
        "icone": [{"chiave": k, "titolo": t, "file": f"vetrina-icona-{k}.png"} for k, t in ICONE],
        "presentazione": PRESENTAZIONE, "descrizione_telegram": DESCRIZIONE_TELEGRAM,
    })
    scrivi(CARTELLA / "reel-vetrina.json", [{
        "chiave": "reel|vetrina-prof", "origine": "vetrina-prof", "titolo": "Il prof si presenta",
        "anno": "", "classe": "", "etichetta": "Lab IRC", "sottotitolo": "Piacere!", "finale": "Ti aspetto nel Lab!",
        "colore": "#E3C27A", "mascotte": "1-semino", "url": g.URL_SITO + "/",
        "gancio": "Ciao! Sono il prof del Lab IRC",
        "scene": [{"titolo": t, "testo": x, "disegno": ""} for t, x in SCENE_PROF],
        "video": "vetrina-prof-1.mp4", **TESTI_PROF}])
    print("Vetrina pronta: benvenuto, video del prof, copertina di Facebook, 5 icone.")
    return 0


def pubblica_storia() -> int:
    """Una storia di benvenuto su Instagram e Facebook (Telegram non ha storie per i bot)."""
    vetrina = leggi(CARTELLA / "vetrina.json", {})
    if not vetrina.get("storia"):
        print("! Prima: python seo/vetrina.py --prepara")
        return 1
    u = pb.url_immagine(vetrina["storia"])
    if not pb.attendi_online([u], 10):
        print(f"✗ La storia non è ancora online: {u}")
        return 1
    pagina_id, chiave, ig_id = meta.trova_account(os.environ["META_TOKEN"])
    errori = 0
    try:
        foto = meta.chiama("POST", f"{pagina_id}/photos", url=u, published="false", access_token=chiave)["id"]
        meta.chiama("POST", f"{pagina_id}/photo_stories", photo_id=foto, access_token=chiave)
        print("✓ storia su Facebook")
    except Exception as err:
        print(f"✗ storia su Facebook: {err}"); errori += 1
    try:
        c = meta.chiama("POST", f"{ig_id}/media", media_type="STORIES", image_url=u, access_token=chiave)["id"]
        pb.attendi_contenitore(c, chiave)
        meta.chiama("POST", f"{ig_id}/media_publish", creation_id=c, access_token=chiave)
        print("✓ storia su Instagram")
    except Exception as err:
        print(f"✗ storia su Instagram: {err}"); errori += 1
    return 1 if errori else 0


def pubblica_vetrina() -> int:
    vetrina = leggi(CARTELLA / "vetrina.json", {})
    video = leggi(CARTELLA / "reel-vetrina.json", [])
    if not vetrina or not video:
        print("! Prima: python seo/vetrina.py --prepara")
        return 1
    oggi = dt.date.today().isoformat()
    reg_tg_file, reg_meta_file = g.RADICE / "data" / "telegram.json", g.RADICE / "data" / "meta.json"
    reg_tg, reg_meta = leggi(reg_tg_file, {}), leggi(reg_meta_file, {})
    post = [vetrina["benvenuto"], *video]
    if not all(pb.attendi_online(pb.da_controllare(p), 10) for p in post):
        print("✗ Le immagini o il video della vetrina non sono ancora online.")
        return 1
    errori = 0

    # --- Telegram: benvenuto (fissato in alto), video, descrizione del canale ---
    token, canale = os.environ.get("TELEGRAM_BOT_TOKEN"), os.environ.get("TELEGRAM_CANALE")
    if token and canale:
        b = vetrina["benvenuto"]
        if b["chiave"] not in reg_tg:
            foto = [pb.url_immagine(f) for f in b["immagini"]][:10]
            album = [{"type": "photo", "media": u} for u in foto]
            album[0]["caption"] = b["telegram"][:tg.LIMITE_DIDASCALIA]
            esito = tg.chiama(token, "sendMediaGroup", {"chat_id": canale, "media": album})
            if esito.get("ok"):
                reg_tg[b["chiave"]] = oggi
                primo = esito["result"][0]["message_id"]
                fissa = tg.chiama(token, "pinChatMessage", {"chat_id": canale, "message_id": primo,
                                                           "disable_notification": True})
                print("✓ Telegram: benvenuto" + (" (fissato in alto)" if fissa.get("ok") else f" (non fissato: {fissa.get('description')})"))
            else:
                print(f"✗ Telegram benvenuto: {esito.get('description')}"); errori += 1
        for v in video:
            if v["chiave"] not in reg_tg:
                try:
                    pb.su_telegram(v, token, canale); reg_tg[v["chiave"]] = oggi; print("✓ Telegram: video del prof")
                except Exception as err:
                    print(f"✗ Telegram video: {err}"); errori += 1
        d = tg.chiama(token, "setChatDescription", {"chat_id": canale, "description": vetrina["descrizione_telegram"][:255]})
        print("✓ Telegram: descrizione del canale" if d.get("ok") or "not modified" in str(d.get("description"))
              else f"! Telegram descrizione: {d.get('description')}")
    else:
        print("! Segreti di Telegram non impostati: salto Telegram.")

    # --- Facebook e Instagram ---
    chiave_meta = os.environ.get("META_TOKEN")
    if chiave_meta:
        pagina_id, chiave, ig_id = meta.trova_account(chiave_meta)
        for p in post:
            for c in ("facebook", "instagram"):
                if c in reg_meta.get(p["chiave"], {}):
                    continue
                try:
                    if c == "facebook":
                        pb.su_facebook(p, pagina_id, chiave)
                    elif ig_id:
                        pb.su_instagram(p, ig_id, chiave)
                    else:
                        continue
                    reg_meta.setdefault(p["chiave"], {})[c] = oggi
                    print(f"✓ {c}: {p['titolo']}")
                except Exception as err:
                    print(f"✗ {c} {p['titolo']}: {err}"); errori += 1
        # copertina e descrizione della Pagina: servono permessi in più, se mancano si fanno a mano
        try:
            foto = meta.chiama("POST", f"{pagina_id}/photos", url=pb.url_immagine(vetrina["copertina_facebook"]),
                               published="false", access_token=chiave)["id"]
            meta.chiama("POST", pagina_id, cover=foto, access_token=chiave)
            print("✓ Facebook: copertina della Pagina")
        except Exception as err:
            print(f"! Facebook copertina non cambiata ({err}): si può caricare a mano.")
        try:
            meta.chiama("POST", pagina_id, about=vetrina["presentazione"][:255], access_token=chiave)
            print("✓ Facebook: descrizione della Pagina")
        except Exception as err:
            print(f"! Facebook descrizione non cambiata ({err}): si può scrivere a mano.")
    else:
        print("! META_TOKEN non impostato: salto Facebook e Instagram.")

    for f, dati in ((reg_tg_file, reg_tg), (reg_meta_file, reg_meta)):
        f.write_text(json.dumps(dati, ensure_ascii=False, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    return 1 if errori else 0


PERMESSI_UTILI = {
    "pages_show_list": "trovare la Pagina", "pages_read_engagement": "leggere la Pagina",
    "pages_manage_posts": "pubblicare su Facebook", "publish_video": "video su Facebook",
    "pages_manage_metadata": "copertina e descrizione della Pagina",
    "pages_read_user_content": "leggere i commenti su Facebook", "read_insights": "statistiche di Facebook",
    "instagram_basic": "trovare l'account Instagram", "instagram_content_publish": "pubblicare su Instagram",
    "instagram_manage_insights": "statistiche di Instagram",
    "instagram_manage_comments": "commenti su Instagram (facoltativo)",
    "pages_manage_engagement": "commenti su Facebook (facoltativo)",
}


def controlla_chiave() -> int:
    """Solo lettura: dice quali permessi ha la chiave di Meta e se trova Pagina e Instagram."""
    token = os.environ.get("META_TOKEN")
    if not token:
        print("✗ META_TOKEN non impostato.")
        return 1
    try:
        dati = meta.chiama("GET", "me/permissions", access_token=token).get("data", [])
        concessi = {d["permission"] for d in dati if d.get("status") == "granted"}
    except Exception as err:
        print(f"! Elenco dei permessi non leggibile ({err}): provo comunque Pagina e Instagram.")
        concessi = None
    if concessi is not None:
        for nome, uso in PERMESSI_UTILI.items():
            print(f"{'✓' if nome in concessi else '✗'} {nome:28} {uso}")
    errori = 0
    try:
        pagina_id, chiave, ig_id = meta.trova_account(token)
        print(f"✓ Pagina raggiungibile ({pagina_id})")
        if ig_id:
            ig = meta.chiama("GET", ig_id, fields="username,followers_count,media_count", access_token=chiave)
            print(f"✓ Instagram @{ig.get('username')}: {ig.get('followers_count')} follower, {ig.get('media_count')} post")
        else:
            print("✗ Instagram non collegato alla Pagina"); errori += 1
    except Exception as err:
        print(f"✗ Pagina non raggiungibile: {err}"); errori += 1
    obbligatori = [n for n in PERMESSI_UTILI if "facoltativo" not in PERMESSI_UTILI[n]]
    if concessi is not None and any(n not in concessi for n in obbligatori):
        errori += 1
    return 1 if errori else 0


if __name__ == "__main__":
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--prepara", action="store_true")
    ap.add_argument("--pubblica", action="store_true")
    ap.add_argument("--storia", action="store_true", help="pubblica solo la storia di benvenuto")
    ap.add_argument("--controlla", action="store_true", help="controlla la chiave di Meta, senza pubblicare")
    a = ap.parse_args()
    sys.exit(prepara() if a.prepara else pubblica_vetrina() if a.pubblica else pubblica_storia() if a.storia
             else controlla_chiave() if a.controlla else ap.print_help() or 0)
