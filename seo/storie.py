#!/usr/bin/env python3
"""
seo/storie.py — Le storie di ogni giorno su Instagram e Facebook (Progetto Reel, fase 6).

Tre momenti, sul modello dei creatori che funzionano (presenza costante, poche parole):
  mattina (7:45)  la ricorrenza del giorno (date calcolate, mai inventate) oppure il post di oggi
                  (reel, carosello del martedì, Shabbat, grande domanda): «Oggi nel Lab»
  pranzo  (13:30) l'anticipo del reel della sera: il video di 10 secondi montato dal regista
                  (gancio, un'immagine, «Stasera alle 19»), o l'immagine con la frase di anticipo
                  (solo nei giorni di reel e di gioco)
Le API di Instagram e Facebook non permettono adesivi con link nelle storie: si rimanda al profilo.
  sera    (20:45) il reel uscito oggi, rilanciato come storia (Instagram e Facebook)
Senza IA: i testi vengono dal calendario e dai post già approvati. Niente quiz, niente link
nel testo. Una storia non esce due volte (data/storie.json).

  python seo/storie.py --fascia mattina|pranzo|sera [--anteprima] [--giorno AAAA-MM-GG]
"""

from __future__ import annotations

import argparse
import datetime as dt
import json
import os
import subprocess
import sys
import tempfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import social_calendario as cal  # noqa: E402

RADICE = Path(__file__).resolve().parent.parent
REGISTRO = RADICE / "data" / "storie.json"
GIORNI = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"]
MESI = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre",
        "ottobre", "novembre", "dicembre"]
MASCOTTE = {"1": "1-semino", "2": "2-ichthy", "3": "3-navicella", "4": "4-bussolina", "5": "5-terra"}
ORE = {"reel": "19", "gioco": "19", "lezione": "13:30", "shabbat": "11", "domenica": "18"}
# l'ora dell'uscita la decide il giorno della settimana (seo/orologio-cloudflare.js), non il tipo di
# post: prima del calendario nuovo anche i caroselli del lunedì, mercoledì e venerdì escono alle 19
ORE_DEL_GIORNO = {0: "19", 1: "13:30", 2: "19", 3: "19", 4: "19", 5: "11", 6: "18"}


def ora_di(tipo: str | None, oggi: dt.date) -> str:
    return ORE_DEL_GIORNO.get(oggi.weekday()) or ORE.get(tipo or "", "19")


def leggi(p: Path, vuoto):
    try:
        return json.loads(p.read_text(encoding="utf-8"))
    except (OSError, ValueError):
        return vuoto


def data_bella(d: dt.date) -> str:
    return f"{GIORNI[d.weekday()]} {d.day} {MESI[d.month - 1]}"


ELENCHI = {"reel": "reel.json", "lezione": "cartoline.json", "shabbat": "sabato.json", "domenica": "domenica.json"}


def post_di_oggi(oggi: dt.date) -> dict | None:
    """Il post principale di oggi, già approvato dagli agenti: il reel della lezione, il carosello
    del martedì, lo Shabbat, la grande domanda; oppure il reel del gioco (testi fissi, senza coda)."""
    tipo = cal.tipo_del_giorno(oggi)
    s = oggi.isoformat()
    if tipo == "gioco":
        return next((r for r in leggi(RADICE / "promozione" / "gioco.json", []) if r.get("data") == s), None)
    if tipo not in ELENCHI:
        return None
    coda = leggi(RADICE / "data" / "social-coda.json", {})
    if coda.get("pausa"):
        return None
    chiavi = {v.get("chiave") for v in coda.get("coda", []) if v.get("esito") == "approvato" and str(v.get("quando")) == s}
    campo = "origine" if tipo == "reel" else "chiave"
    return next((r for r in leggi(RADICE / "promozione" / ELENCHI[tipo], []) if r.get(campo) in chiavi), None)


def lezione_di(post: dict) -> dict:
    return next((c for c in leggi(RADICE / "promozione" / "cartoline.json", []) if c.get("chiave") == post.get("origine")), {})


def scheda(fascia: str, oggi: dt.date) -> dict | None:
    """Che cosa dice la storia (per seo/storie.mjs), oppure None se in quella fascia non serve."""
    tipo = cal.tipo_del_giorno(oggi)
    post = post_di_oggi(oggi)
    if fascia == "mattina":
        ricorrenze = [nome for giorno, nome in cal.eventi(oggi, 1)]
        if ricorrenze:
            return {"sopra": data_bella(oggi), "titolo": "Oggi: *" + ricorrenze[0].split(" · ")[0] + "*",
                    "testo": cal.tempo_liturgico(oggi), "piede": "Buongiorno dal Lab", "posa": "saluta"}
        if post:
            l = lezione_di(post) or post
            # alle 19 il reel; il carosello del martedì alle 13:30, lo Shabbat alle 11, la grande domanda alle 18
            piede = "Stasera alle 19" if ora_di(tipo, oggi) == "19" else f"Oggi alle {ora_di(tipo, oggi)}"
            rubrica = cal.rubrica_del_giorno(oggi) if tipo == "lezione" else ""
            return {"sopra": data_bella(oggi) + (f" · {rubrica}" if rubrica else " · oggi nel Lab"), "titolo": post.get("titolo", ""),
                    "testo": l.get("frase", ""), "anno": str(post.get("anno", "")),
                    "mascotte": MASCOTTE.get(str(post.get("anno", ""))), "piede": piede, "posa": "sorriso"}
        return None
    if fascia == "pranzo":
        if not post or tipo not in ("reel", "gioco"):
            return None
        if tipo == "gioco":   # la scritta del gancio della variante del reel (seo/gioco_reel.py)
            import gioco_reel
            gancio = gioco_reel.VARIANTI[int(post.get("variante") or 0) % len(gioco_reel.VARIANTI)]["gancio"][0]
        else:
            gancio = post.get("anticipo") or post.get("gancio") or lezione_di(post).get("frase", "") or post.get("titolo", "")
        return {"sopra": "Stasera alle " + ORE[tipo], "titolo": gancio, "testo": post.get("titolo", ""),
                "anno": str(post.get("anno", "")), "mascotte": MASCOTTE.get(str(post.get("anno", ""))),
                "piede": "Il reel esce alle " + ORE[tipo], "posa": "occhiolino"}
    return None


def video_di_oggi(oggi: dt.date) -> dict | None:
    """Il reel uscito oggi su Instagram (lezione, gioco o grande domanda), per la storia della sera."""
    meta = leggi(RADICE / "data" / "meta.json", {})
    s = oggi.isoformat()
    for nome in ("gioco.json", "reel.json", "reel-domenica.json"):
        for r in leggi(RADICE / "promozione" / nome, []):
            if r.get("video") and meta.get(r.get("chiave"), {}).get("instagram") == s:
                return r
    return None


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--fascia", choices=["mattina", "pranzo", "sera"], required=True)
    ap.add_argument("--anteprima", action="store_true", help="disegna e basta, non pubblica")
    ap.add_argument("--giorno", help="AAAA-MM-GG (predefinito oggi, ora italiana)")
    a = ap.parse_args()
    from rubriche import oggi_in_italia
    oggi = dt.date.fromisoformat(a.giorno) if a.giorno else oggi_in_italia()
    registro = leggi(REGISTRO, {})
    chiave = f"{oggi.isoformat()}|{a.fascia}"
    if registro.get(chiave) and not a.anteprima:
        print(f"Storia {chiave} già uscita.")
        return 0
    coda = leggi(RADICE / "data" / "social-coda.json", {})
    if coda.get("pausa"):
        print("Social in pausa: niente storie.")
        return 0

    import media_r2 as r2
    immagine = video = None
    if a.fascia == "sera":
        r = video_di_oggi(oggi)
        if not r:
            print("Stasera nessun reel uscito oggi: niente storia.")
            return 0
        video = r2.url_video(r["video"])
        if not video:
            print("! Il video di oggi non è su R2: niente storia.")
            return 0
        print(f"Storia della sera: il reel «{r['titolo']}»")
    else:
        s = scheda(a.fascia, oggi)
        if not s:
            print(f"Storia del {a.fascia}: oggi non serve.")
            return 0
        cartella = RADICE / "promozione" / "cartoline"
        cartella.mkdir(parents=True, exist_ok=True)
        nome = f"storia-{oggi.isoformat()}-{a.fascia}.jpg"
        with tempfile.TemporaryDirectory() as tmp:
            f = Path(tmp) / "scheda.json"
            f.write_text(json.dumps(s, ensure_ascii=False), encoding="utf-8")
            subprocess.run(["node", str(RADICE / "seo" / "storie.mjs"), str(f), str(cartella / nome)], check=True)
        print(f"Storia del {a.fascia}: {s['titolo']}")
        if a.anteprima:
            return 0
        chiave_id, segreto, account = (os.environ.get(k, "") for k in ("R2_ACCESS_KEY_ID", "R2_SECRET_ACCESS_KEY", "CLOUDFLARE_ACCOUNT_ID"))
        if not (chiave_id and segreto and account):
            print("! Chiavi di R2 mancanti: la storia non può andare online.")
            return 1
        r2.carica(cartella / nome, chiave_id, segreto, account, "cartoline")
        immagine = f"{r2.URL_PUBBLICO}/cartoline/{nome}"
        (cartella / nome).unlink(missing_ok=True)
        # a pranzo il video di anticipo montato dal regista (l'immagine resta di riserva)
        if a.fascia == "pranzo" and (p := post_di_oggi(oggi)) and p.get("anticipo_video"):
            video = r2.url_video(p["anticipo_video"])
            if video:
                print(f"Su Instagram il video di anticipo: {p['anticipo_video']}")
    if a.anteprima:
        return 0

    token = os.environ.get("META_TOKEN")
    if not token:
        print("! Segreto META_TOKEN non impostato.")
        return 1
    import meta
    from pubblica import attendi_contenitore
    pagina_id, chiave_pagina, ig_id = meta.trova_account(token)
    esiti = {}
    if ig_id:
        try:
            campi = {"video_url": video} if video else {"image_url": immagine}
            c = meta.chiama("POST", f"{ig_id}/media", media_type="STORIES", access_token=chiave_pagina, **campi)["id"]
            attendi_contenitore(c, chiave_pagina, volte=72 if video else 24)
            meta.chiama("POST", f"{ig_id}/media_publish", creation_id=c, access_token=chiave_pagina)
            esiti["instagram"] = True
            print("✓ storia su Instagram")
        except Exception as err:
            print(f"✗ Instagram: {err}")
    # Facebook: la storia video (si apre il caricamento, Meta scarica il video da R2, si pubblica);
    # se non riesce e c'è l'immagine, la storia con l'immagine
    if video:
        try:
            inizio = meta.chiama("POST", f"{pagina_id}/video_stories", upload_phase="start", access_token=chiave_pagina)
            meta.carica_video(inizio["upload_url"], chiave_pagina, video)
            meta.chiama("POST", f"{pagina_id}/video_stories", upload_phase="finish", video_id=inizio["video_id"],
                        access_token=chiave_pagina)
            esiti["facebook"] = True
            print("✓ storia video su Facebook")
        except Exception as err:
            print(f"✗ Facebook (video): {err}")
    if immagine and not esiti.get("facebook"):
        try:
            foto = meta.chiama("POST", f"{pagina_id}/photos", url=immagine, published="false", access_token=chiave_pagina)["id"]
            meta.chiama("POST", f"{pagina_id}/photo_stories", photo_id=foto, access_token=chiave_pagina)
            esiti["facebook"] = True
            print("✓ storia su Facebook")
        except Exception as err:
            print(f"✗ Facebook: {err}")
    if esiti:
        registro[chiave] = {**esiti, "ora": dt.datetime.now().strftime("%H:%M")}
        limite = (oggi - dt.timedelta(days=40)).isoformat()
        registro = {k: v for k, v in registro.items() if k[:10] >= limite}
        REGISTRO.write_text(json.dumps(registro, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    return 0 if esiti else 1


if __name__ == "__main__":
    sys.exit(main())
