#!/usr/bin/env python3
"""Costruisce un artefatto in un unico file .html, pronto da caricare sul sito.

Uso:  python3 build.py lezioni/<lezione>.js     →   dist/giochi-<lezione>.html   (i giochi, con quei dati)
      python3 build.py lezioni/<lezione>.html   →   dist/lezione-<lezione>.html  (una lezione interattiva)

Il sito apre gli artefatti in un visore isolato e accetta un solo file: per questo
fogli di stile e script locali (e i dati della lezione) vengono incorporati nella pagina.
"""
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent


def inline(page, data=None):
    """Incorpora nella pagina i <link rel="stylesheet"> e gli <script src> locali.
    Se `data` è indicato, sostituisce lo script marcato con data-lezione."""
    base = page.parent
    html = page.read_text(encoding='utf-8')

    def css(m):
        return '<style>\n' + (base / m.group(1)).read_text(encoding='utf-8').strip() + '\n</style>'

    def js(m):
        src = data if data and 'data-lezione' in m.group(0) else base / m.group(1)
        code = src.read_text(encoding='utf-8').strip().replace('</script', '<\\/script')
        return '<script>\n' + code + '\n</script>'

    html = re.sub(r'<link rel="stylesheet" href="((?!https?:)[^"]+)">', css, html)
    html = re.sub(r'<script src="((?!https?:)[^"]+)"[^>]*></script>', js, html)
    return html


def build(src):
    src = pathlib.Path(src).resolve()
    if src.suffix == '.html':
        html, name = inline(src), 'lezione-' + src.stem
    else:
        html, name = inline(ROOT / 'giochi.html', src), 'giochi-' + src.stem
    out = ROOT / 'dist' / (name + '.html')
    out.parent.mkdir(exist_ok=True)
    out.write_text(html, encoding='utf-8')
    return out


if __name__ == '__main__':
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    print(build(sys.argv[1]).relative_to(ROOT))
