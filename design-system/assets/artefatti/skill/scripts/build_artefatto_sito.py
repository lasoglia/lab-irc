#!/usr/bin/env python3
"""Assembla un artefatto di lezione Lab IRC in UN SOLO file HTML, leggendo
direttamente dal design system DEL SITO (design-system/), senza copie:
font woff2 locali, mascotte del sito (niente AMDG al 7° clic), kit lezione e giochi.

Uso (dalla cartella del repo):
  python3 design-system/assets/artefatti/skill/scripts/build_artefatto_sito.py lezione.js \
      -o uploads/<slug>-artefatto.html --anno 3 --titolo "Titolo" --descrizione "Una riga"
"""
import argparse, base64, html, pathlib, re, sys

QUI = pathlib.Path(__file__).resolve()
DS = QUI.parents[4]                      # design-system/
ROOT = DS.parent                         # radice del sito
ART = DS / "assets" / "artefatti"

FONTS = [
    ("Cinzel", "cinzel-latin-500-normal.woff2", "normal", "500"),
    ("Cinzel", "cinzel-latin-600-normal.woff2", "normal", "600"),
    ("Cinzel", "cinzel-latin-700-normal.woff2", "normal", "700"),
    ("Cormorant Garamond", "cormorant-garamond-latin-500-normal.woff2", "normal", "500"),
    ("Cormorant Garamond", "cormorant-garamond-latin-600-normal.woff2", "normal", "600"),
    ("Cormorant Garamond", "cormorant-garamond-latin-700-normal.woff2", "normal", "700"),
    ("Cormorant Garamond", "cormorant-garamond-latin-500-italic.woff2", "italic", "500"),
    ("Cormorant Garamond", "cormorant-garamond-latin-600-italic.woff2", "italic", "600"),
    ("Figtree", "figtree-latin-400-normal.woff2", "normal", "400"),
    ("Figtree", "figtree-latin-500-normal.woff2", "normal", "500"),
    ("Figtree", "figtree-latin-600-normal.woff2", "normal", "600"),
    ("Figtree", "figtree-latin-700-normal.woff2", "normal", "700"),
    ("Figtree", "figtree-latin-800-normal.woff2", "normal", "800 900"),
]
TOKENS = ["colors", "typography", "spacing", "shadows", "animation", "perception", "theme-light", "base"]


def read(p):
    return pathlib.Path(p).read_text(encoding="utf-8")


def font_css():
    out = []
    for fam, f, style, weight in FONTS:
        b64 = base64.b64encode((DS / "fonts" / f).read_bytes()).decode()
        out.append("@font-face{font-family:'%s';font-style:%s;font-weight:%s;font-display:swap;"
                   "src:url(data:font/woff2;base64,%s) format('woff2')}" % (fam, style, weight, b64))
    return "\n".join(out)


def senza_import(css):
    return re.sub(r"@import[^;]*;", "", css)


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

    lez = read(a.lezione)
    if re.search(r"https?://(?!www\.w3\.org)", lez) and "src:" in lez:
        print("Attenzione: lezione.js sembra caricare risorse remote; incorporale.", file=sys.stderr)
    extra = read(a.css) if a.css else ""

    tokens = "\n".join(senza_import(read(DS / "tokens" / (t + ".css"))) for t in TOKENS)
    css = "\n".join([font_css(), tokens,
                     senza_import(read(ART / "lab-artefatto.css")), read(ART / "lab-percezione.css"),
                     read(ART / "giochi" / "giochi.css"), read(ART / "giochi" / "giochi-2.css"),
                     read(ART / "lezione" / "lab-lezione.css"), read(ART / "lezione" / "lab-lezione-plus.css"),
                     read(ART / "lezione" / "lab-lezione-percezione.css"), read(ART / "lezione" / "lab-lezione-attivita.css"),
                     read(ART / "lezione" / "lab-lezione-lim.css"), extra])
    js = [
        read(DS / "assets" / "vendor" / "react.production.min.js"),
        read(DS / "assets" / "vendor" / "react-dom.production.min.js"),
        read(DS / "assets" / "vendor" / "htm.umd.js"),
        read(ROOT / "assets" / "mascotte" / "lab-mascotte.js"),   # la mascotte del sito
        read(ART / "lab-artefatto.js"),
        read(ART / "lezione" / "lab-lezione.js"),
        read(ART / "lezione" / "lab-lezione-plus.js"),
        read(ART / "lezione" / "lab-lezione-attivita.js"),
        read(ART / "lezione" / "lab-lezione-percezione.js"),
        "/* ---- lezione ---- */\n" + lez,
        "window.GIOCHI_DATI = Object.assign({ tema: (window.LEZIONE && window.LEZIONE.titolo) || '' }, (window.LEZIONE && window.LEZIONE.giochi) || {});",
        read(ART / "giochi" / "giochi.js"),
        read(ART / "giochi" / "giochi-2.js"),
        "LabLezione.avvia();",
    ]
    for s in js + [css]:
        if "fonts.googleapis" in s or "unpkg.com" in s:
            sys.exit("Trovato un riferimento esterno (Google Fonts/CDN): l'artefatto deve essere autonomo.")
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
<script>try{{var t=localStorage.getItem('tema_lab');if(t)document.documentElement.dataset.tema=t;}}catch(e){{}}</script>
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
