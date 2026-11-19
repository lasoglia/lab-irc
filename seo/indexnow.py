#!/usr/bin/env python3
"""
seo/indexnow.py — Avvisa subito Bing (e gli altri motori di IndexNow) delle pagine
nuove o cambiate, confrontando la sitemap di prima con quella di adesso.

  python seo/indexnow.py SITEMAP_PRIMA SITEMAP_DOPO

Il codice di verifica è in indexnow.txt alla radice del sito: è pubblico per
regola del protocollo (il motore lo scarica per controllare che il sito sia nostro),
non è una chiave segreta. Google non usa IndexNow: per Google basta la sitemap,
inviata una volta da Google Search Console.
Se la rete non risponde, lo script lo dice e finisce senza errore.
"""
from __future__ import annotations

import json
import re
import sys
import urllib.request
from pathlib import Path

RADICE = Path(__file__).resolve().parent.parent
HOST = "www.labirc.it"
MAX_URL = 1000


def leggi(p: str) -> dict[str, str]:
    f = Path(p)
    if not f.exists():
        return {}
    xml = f.read_text(encoding="utf-8")
    return {u: d for u, d in re.findall(r"<loc>(.*?)</loc><lastmod>(.*?)</lastmod>", xml)}


def main() -> int:
    if len(sys.argv) != 3:
        print(__doc__)
        return 2
    prima, dopo = leggi(sys.argv[1]), leggi(sys.argv[2])
    nuove = [u.replace("&amp;", "&") for u, d in dopo.items() if prima.get(u) != d and HOST in u]
    if not nuove:
        print("IndexNow: nessuna pagina nuova o cambiata.")
        return 0
    chiave = (RADICE / "indexnow.txt").read_text(encoding="utf-8").strip()
    corpo = {"host": HOST, "key": chiave, "keyLocation": f"https://{HOST}/indexnow.txt",
             "urlList": nuove[:MAX_URL]}
    req = urllib.request.Request("https://api.indexnow.org/indexnow", data=json.dumps(corpo).encode(),
                                 headers={"Content-Type": "application/json; charset=utf-8"}, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            print(f"IndexNow: segnalate {len(corpo['urlList'])} pagine (risposta {r.status}).")
    except Exception as ex:
        print(f"IndexNow: non sono riuscito a segnalare le pagine ({ex}). Nessun danno: ci riprovo alla prossima sincronizzazione.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
