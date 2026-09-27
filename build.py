#!/usr/bin/env python3
"""Costruisce un artefatto di giochi in un unico file .html, pronto da caricare sul sito.

Uso:  python3 build.py lezioni/<lezione>.js   →   dist/giochi-<lezione>.html

Il sito apre gli artefatti in un visore isolato e accetta un solo file: per questo
fogli di stile, script e dati della lezione vengono incorporati nella pagina.
"""
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent


def build(lezione):
    lezione = pathlib.Path(lezione).resolve()
    html = (ROOT / 'giochi.html').read_text(encoding='utf-8')

    def css(m):
        return '<style>\n' + (ROOT / m.group(1)).read_text(encoding='utf-8').strip() + '\n</style>'

    def js(m):
        src = lezione if 'data-lezione' in m.group(0) else ROOT / m.group(1)
        code = src.read_text(encoding='utf-8').strip().replace('</script', '<\\/script')
        return '<script>\n' + code + '\n</script>'

    html = re.sub(r'<link rel="stylesheet" href="(kit/[^"]+)">', css, html)
    html = re.sub(r'<script src="([^"]+)"[^>]*></script>', js, html)
    out = ROOT / 'dist' / ('giochi-' + lezione.stem + '.html')
    out.parent.mkdir(exist_ok=True)
    out.write_text(html, encoding='utf-8')
    return out


if __name__ == '__main__':
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    print(build(sys.argv[1]).relative_to(ROOT))
