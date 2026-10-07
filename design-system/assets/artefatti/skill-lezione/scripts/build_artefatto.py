#!/usr/bin/env python3
"""Assembla un artefatto di lezione LAB-IRC in UN SOLO file HTML autonomo e offline (kit definitivo, 5 ottobre 2026).

Uso:
  python3 build_artefatto.py lezione.js -o <slug>-artefatto.html --anno 3 \
      --titolo "Titolo" --descrizione "Una riga" [--skin arcade|tavolo] [--css extra.css] \
      [--tema scuro|chiaro] [--lim] [--senza-mascotte]

lezione.js definisce window.LEZIONE (vedi references/artefatto.md e il catalogo in references/strumenti.md § 6) e, se serve,
registra componenti con LabLezione.registra(...) o blocchi con LabLezione.blocco(...).
Lo script incorpora: React 18 + htm, font WOFF2 in base64, token e kit del Lab IRC Design System
(pacchetto «Lab-Irc»: lezione, strumenti, attività di classe, costrutti HTML nativi, percezione, LIM, barra dei giochi),
mascotte dell'anno (<lab-mascotte>) e motore dei giochi (dodici meccaniche). Nessuna richiesta di rete.
Richiede solo Python 3 (libreria standard).

Opzioni dell'artefatto:
  --skin            arcade (predefinita) o tavolo: aspetto dei giochi
  --css             CSS della singola lezione (solo token esistenti), per i componenti propri
  --tema            tema iniziale quando il dispositivo non ha una preferenza salvata (predefinito: scuro, «Notte Studio»)
  --lim             parte in modalità LIM (il pulsante LIM, il tasto L o ?lim=0 la tolgono)
  --senza-mascotte  niente mascotte nell'angolo (resta quella delle scene di apertura e chiusura)

Adattamenti al file unico (i file del kit restano quelli del design system, salvo quanto è scritto in assets/kit/LEGGIMI.md):
- le regole @import dei CSS si tolgono: token e percezione sono già incorporati;
- lab-artefatto.js del design system si avvia anche inline (la guardia esclude solo i bundle con src diverso).
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

CSS_KIT = ["kit/lab-tokens.css", "kit/lab-artefatto.css", "kit/lab-percezione.css",
           "kit/giochi.css", "kit/giochi-2.css", "kit/lab-lezione.css",
           "kit/lab-lezione-plus.css", "kit/lab-lezione-percezione.css",
           "kit/lab-lezione-attivita.css", "kit/lab-lezione-extra.css", "kit/lab-lezione-lim.css",
           "kit/lab-skill.css"]  # correzioni della skill al kit, per ultime

JS_KIT = ["vendor/react.production.min.js", "vendor/react-dom.production.min.js", "vendor/htm.umd.js",
          "mascotte/lab-mascotte.js", "kit/lab-artefatto.js", "kit/lab-lezione.js", "kit/lab-lezione-plus.js",
          "kit/lab-lezione-attivita.js", "kit/lab-lezione-extra.js", "kit/lab-lezione-percezione.js"]

IMPORT = re.compile(r"^[ \t]*@import\b[^;]*;[ \t]*\n?", re.M)


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


def kit_css(p):
    return IMPORT.sub("", read(p))


def artefatto_js():
    js = read("kit/lab-artefatto.js")
    if re.search(r"if \(!cs \|\|[^\n]*return;", js):
        sys.exit("Errore: lab-artefatto.js ha la vecchia guardia del bundle che spegne il kit inline; usa la versione del design system (5 ottobre 2026).")
    return js


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
    ap.add_argument("--css", help="CSS aggiuntivo della singola lezione (solo token esistenti)")
    ap.add_argument("--tema", default="scuro", choices=["scuro", "chiaro"], help="tema iniziale senza preferenza salvata")
    ap.add_argument("--lim", action="store_true", help="parte in modalità LIM")
    ap.add_argument("--senza-mascotte", action="store_true", help="niente mascotte nell'angolo")
    a = ap.parse_args()

    lez = pathlib.Path(a.lezione).read_text(encoding="utf-8")
    if re.search(r"https?://(?!www\.w3\.org)", lez) and "src:" in lez:
        print("Attenzione: lezione.js sembra caricare risorse remote; incorporale.", file=sys.stderr)
    if "window.LEZIONE" not in lez:
        sys.exit("Errore: lezione.js non definisce window.LEZIONE.")
    extra = pathlib.Path(a.css).read_text(encoding="utf-8") if a.css else ""
    if IMPORT.search(extra):
        print("Attenzione: il CSS di lezione contiene @import; le regole sono state tolte.", file=sys.stderr)
        extra = IMPORT.sub("", extra)

    css = "\n".join([font_css()] + [kit_css(p) for p in CSS_KIT] + [extra])
    js = [artefatto_js() if p == "kit/lab-artefatto.js" else read(p) for p in JS_KIT] + [
        "/* ---- lezione ---- */\n" + lez,
        "window.GIOCHI_DATI = Object.assign({ tema: (window.LEZIONE && window.LEZIONE.titolo) || '' }, (window.LEZIONE && window.LEZIONE.giochi) || {});",
        read("kit/giochi.js"),
        read("kit/giochi-2.js"),
        "LabLezione.avvia();",
    ]
    t, dsc = html.escape(a.titolo), html.escape(a.descrizione)
    html_attr = (' data-tema="chiaro"' if a.tema == "chiaro" else "") + (" data-lim" if a.lim else "")
    body_attr = " data-no-mascotte" if a.senza_mascotte else ""
    doc = f"""<!DOCTYPE html>
<html lang="it"{html_attr}>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{t} · Lab IRC</title>
<meta name="description" content="{dsc}">
<meta name="author" content="Matteo Sestili">
<meta name="copyright" content="© Matteo Sestili — Tutti i diritti riservati">
<meta name="generator" content="Lab IRC · kit definitivo 2026-10-05">
<style>
{css}
</style>
</head>
<body class="la g ll" data-anno="{a.anno}" data-skin="{a.skin}" data-skin-fixed="{a.skin}" data-modo="lezione"{body_attr}>
<div id="app"></div>
<noscript><p style="padding:21px">Per usare questa lezione interattiva serve JavaScript attivo.</p></noscript>
""" + "\n".join("<script>\n" + safe_js(s) + "\n</script>" for s in js) + "\n</body>\n</html>\n"
    out = pathlib.Path(a.out)
    out.write_text(doc, encoding="utf-8")
    print(f"Creato {out} ({out.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
