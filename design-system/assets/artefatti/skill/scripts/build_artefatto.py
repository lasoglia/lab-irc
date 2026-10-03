#!/usr/bin/env python3
"""Assembla un artefatto di lezione LAB-IRC in UN SOLO file HTML autonomo e offline.

Uso:
  python3 build_artefatto.py lezione.js -o <slug>-artefatto.html --anno 3 \
      --titolo "Titolo" --descrizione "Una riga" [--skin arcade|tavolo] [--css extra.css]

lezione.js definisce window.LEZIONE (vedi references/artefatto.md) e, se serve,
registra componenti con LabLezione.registra(...). Lo script incorpora: React 18 + htm,
font WOFF2 in base64, token e kit LAB-IRC, mascotte dell'anno (<lab-mascotte>), motore dei giochi. Nessuna richiesta di rete.
Richiede solo Python 3 (libreria standard).
"""
import argparse, base64, html, pathlib, re, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent / "assets"

FONTS = [  # famiglia, file, stile, peso
    ("Cinzel", "cinzel-latin-600-normal.woff2", "normal", "500 700"),
    ("Cormorant Garamond", "cormorant-garamond-latin-600-normal.woff2", "normal", "500 700"),
    ("Cormorant Garamond", "cormorant-garamond-latin-500-italic.woff2", "italic", "500"),
    ("Cormorant Garamond", "cormorant-garamond-latin-600-italic.woff2", "italic", "600 700"),
    ("Figtree", "figtree-latin-wght-normal.woff2", "normal", "300 900"),
    ("Figtree", "figtree-latin-wght-italic.woff2", "italic", "300 900"),
]


def read(p):
    return (ROOT / p).read_text(encoding="utf-8")


def font_css():
    out = []
    for fam, f, style, weight in FONTS:
        b64 = base64.b64encode((ROOT / "fonts" / f).read_bytes()).decode()
        out.append(
            "@font-face{font-family:'%s';font-style:%s;font-weight:%s;font-display:swap;"
            "src:url(data:font/woff2;base64,%s) format('woff2')}" % (fam, style, weight, b64)
        )
    return "\n".join(out)


def safe_js(s):
    return s.replace("</script", "<\\/script")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("lezione")
    ap.add_argument("-o", "--out", required=True)
    ap.add_argument("--anno", required=True, choices=list("12345"))
    ap.add_argument("--titolo", required=True)
    ap.add_argument("--descrizione", default="")
    ap.add_argument("--skin", default="arcade", choices=["arcade", "tavolo"])
    ap.add_argument("--css", help="CSS aggiuntivo della singola lezione")
    a = ap.parse_args()

    lez = pathlib.Path(a.lezione).read_text(encoding="utf-8")
    if re.search(r"https?://(?!www\.w3\.org)", lez) and "src:" in lez:
        print("Attenzione: lezione.js sembra caricare risorse remote; incorporale.", file=sys.stderr)
    extra = pathlib.Path(a.css).read_text(encoding="utf-8") if a.css else ""

    css = "\n".join([font_css(), read("kit/lab-tokens.css"), read("kit/lab-artefatto.css"), read("kit/lab-percezione.css"),
                     read("kit/giochi.css"), read("kit/giochi-2.css"), read("kit/lab-lezione.css"),
                     read("kit/lab-lezione-plus.css"), read("kit/lab-lezione-percezione.css"),
                     read("kit/lab-lezione-attivita.css"), read("kit/lab-lezione-lim.css"), extra])
    js = [
        read("vendor/react.production.min.js"),
        read("vendor/react-dom.production.min.js"),
        read("vendor/htm.umd.js"),
        read("mascotte/lab-mascotte.js"),
        read("kit/lab-artefatto.js"),
        read("kit/lab-lezione.js"),
        read("kit/lab-lezione-plus.js"),
        read("kit/lab-lezione-attivita.js"),
        read("kit/lab-lezione-percezione.js"),
        "/* ---- lezione ---- */\n" + lez,
        "window.GIOCHI_DATI = Object.assign({ tema: (window.LEZIONE && window.LEZIONE.titolo) || '' }, (window.LEZIONE && window.LEZIONE.giochi) || {});",
        read("kit/giochi.js"),
        read("kit/giochi-2.js"),
        "LabLezione.avvia();",
    ]
    t, dsc = html.escape(a.titolo), html.escape(a.descrizione)
    doc = f"""<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{t} · Lab IRC</title>
<meta name="description" content="{dsc}">
<meta name="author" content="Matteo Sestili">
<meta name="copyright" content="© Matteo Sestili — Tutti i diritti riservati">
<style>
{css}
</style>
</head>
<body class="la g ll" data-anno="{a.anno}" data-skin="{a.skin}" data-skin-fixed="{a.skin}" data-modo="lezione">
<div id="app"></div>
<noscript><p style="padding:21px">Per usare questa lezione interattiva serve JavaScript attivo.</p></noscript>
""" + "\n".join("<script>\n" + safe_js(s) + "\n</script>" for s in js) + "\n</body>\n</html>\n"
    out = pathlib.Path(a.out)
    out.write_text(doc, encoding="utf-8")
    print(f"Creato {out} ({out.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
