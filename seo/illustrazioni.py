#!/usr/bin/env python3
"""
seo/illustrazioni.py — Le illustrazioni dei caroselli delle lezioni, disegnate da Claude.

Per ogni scheda del carosello (le 5 schede di contenuto di ogni lezione) Claude
disegna un'illustrazione didattica in SVG — una linea del tempo, uno schema, una
mappa di concetti, un simbolo o una scena semplice — nei colori del sito.
seo/cartoline.mjs la mette sopra il testo della scheda.

Le scritte nei disegni vengono solo dal testo della scheda. Ogni SVG passa da un
filtro: niente script, niente immagini o collegamenti esterni, solo forme e testo.

  promozione/illustrazioni/<impronta>.svg   i disegni
  data/illustrazioni.json                   lezione -> impronta del carosello e file

Una lezione si ridisegna solo se cambia il testo del suo carosello.

USO
---
  python seo/illustrazioni.py              disegna ciò che manca
  python seo/illustrazioni.py --senza-ia   aggiorna solo l'indice
"""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import sys
from concurrent.futures import ThreadPoolExecutor
import xml.etree.ElementTree as ET
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import genera as g  # noqa: E402
import promozione as pr  # noqa: E402

CARTELLA = g.RADICE / "promozione" / "illustrazioni"
INDICE = g.RADICE / "data" / "illustrazioni.json"
VERSIONE = "1"

SCHEMA = {
    "type": "object",
    "properties": {
        "illustrazioni": {"type": "array", "items": {
            "type": "object",
            "properties": {"idea": {"type": "string"}, "svg": {"type": "string"}},
            "required": ["idea", "svg"], "additionalProperties": False}},
    },
    "required": ["illustrazioni"],
    "additionalProperties": False,
}

ISTRUZIONI = """Sei l'illustratore del Lab IRC, il sito di materiali di Religione Cattolica \
per la scuola secondaria di secondo grado. Ricevi le 5 schede del carosello Instagram di \
una lezione. Per OGNUNA disegni un'illustrazione didattica che aiuti a capire il contenuto \
della scheda a colpo d'occhio, e la restituisci come SVG, nello stesso ordine delle schede.

Che cosa disegnare (scegli ciò che spiega meglio): una linea del tempo, uno schema a \
frecce, una piccola mappa di concetti, un confronto tra due colonne, un simbolo o una \
scena semplice con oggetti (non persone realistiche: al massimo figure stilizzate).

Regole tecniche, vincolanti:
- Radice: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">, sfondo trasparente.
- Solo questi elementi: svg, g, defs, linearGradient, radialGradient, stop, path, rect, \
circle, ellipse, line, polyline, polygon, text, tspan, title.
- Niente script, image, foreignObject, use, link, animazioni, attributi on…, url esterni.
- Colori: blu notte #14131F e #1D1B2B per i pieni scuri, testo chiaro #ECEAF5 e #C7C3DA, \
oro #E3C27A, viola #8B5CF6 e #A78BFA, ciano #22D3EE, corallo #FF7A59, azzurro #4FB0FF, \
rosa #FB7BB5, giallo #FBBF24, verde #34D399. Stile piatto, linee morbide e arrotondate \
(stroke-linecap="round"), spessori 4-8.
- Scritte: al massimo 6 per disegno, al massimo 4 parole ciascuna, font-family="Figtree, \
sans-serif", font-size tra 24 e 40, prese SOLO dal testo della scheda (nomi, date, \
parole chiave). Niente scritte inventate. Niente titoli: il titolo della scheda c'è già.
- Composizione ariosa, leggibile su un telefono; tutto dentro il riquadro 800×500.
- Rispetto: niente raffigurazioni di Dio, di Gesù o dei santi; per il sacro usa simboli \
(luce, croce semplice, colomba stilizzata, libro, roveto…).
- In «idea» scrivi in una riga che cosa hai disegnato."""

ELEMENTI_AMMESSI = {"svg", "g", "defs", "lineargradient", "radialgradient", "stop", "path", "rect",
                    "circle", "ellipse", "line", "polyline", "polygon", "text", "tspan", "title"}


def pulisci_svg(svg: str) -> str:
    """Controlla e ripulisce l'SVG di Claude; solleva ValueError se non è sicuro."""
    svg = svg.strip()
    svg = re.sub(r"^```(?:svg|xml)?\s*|\s*```$", "", svg)
    radice = ET.fromstring(svg)
    if radice.tag.split("}")[-1] != "svg":
        raise ValueError("la radice non è <svg>")
    for el in radice.iter():
        nome = el.tag.split("}")[-1].lower()
        if nome not in ELEMENTI_AMMESSI:
            raise ValueError(f"elemento non ammesso: {nome}")
        for att, val in el.attrib.items():
            a = att.split("}")[-1].lower()
            if a.startswith("on") or a == "href" or "javascript" in val.lower():
                raise ValueError(f"attributo non ammesso: {a}")
            if "url(" in val and not re.fullmatch(r"\s*url\(#[\w-]+\)\s*", val):
                raise ValueError("riferimento esterno non ammesso")
    radice.set("viewBox", radice.get("viewBox") or "0 0 800 500")
    for att in ("width", "height"):
        radice.attrib.pop(att, None)
    ET.register_namespace("", "http://www.w3.org/2000/svg")
    return ET.tostring(radice, encoding="unicode")


def impronta(testi: dict) -> str:
    return hashlib.sha256((VERSIONE + json.dumps(testi.get("carosello", []), ensure_ascii=False))
                          .encode()).hexdigest()[:12]


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--senza-ia", action="store_true", help="non chiama l'API di Claude")
    a = ap.parse_args()

    testi = json.loads((g.RADICE / "data" / "promozione.json").read_text(encoding="utf-8"))
    indice = json.loads(INDICE.read_text(encoding="utf-8")) if INDICE.exists() else {}
    CARTELLA.mkdir(parents=True, exist_ok=True)
    _, _, _, lezioni, _ = g.raccogli()
    per_chiave = {g.chiave_lezione(l): l for l in lezioni}

    client = None
    if not a.senza_ia and os.environ.get("ANTHROPIC_API_KEY"):
        import anthropic
        client = anthropic.Anthropic()
    elif not a.senza_ia:
        print("! ANTHROPIC_API_KEY non impostata: procedo senza IA")

    lavori = []
    for chiave, t in sorted(testi.items()):
        schede = t.get("carosello") or []
        if not schede:
            continue
        imp = impronta(t)
        voce = indice.get(chiave)
        if voce and voce.get("impronta") == imp and all((CARTELLA / f).exists() for f in voce["file"] if f):
            continue
        if not client:
            continue
        l = per_chiave.get(chiave)
        contesto = (f"Lezione: {l['titolo']} (classe {g.NOMI_ANNO.get(str(l.get('anno')), '')}, unità «{l.get('uda', '')}»)"
                    if l else "Presentazione del sito Lab IRC")
        messaggio = contesto + "\n\n" + "\n\n".join(
            f"Scheda {i}: {s['titolo']}\n{s['testo']}" for i, s in enumerate(schede, start=1))
        lavori.append((chiave, imp, len(schede), messaggio))

    def disegna(lavoro):
        chiave, imp, n, messaggio = lavoro
        try:
            return lavoro, *pr.chiama_claude(client, ISTRUZIONI, messaggio, SCHEMA, "medium", 48000), None
        except Exception as err:
            return lavoro, None, None, err

    fatte = tok_in = tok_out = 0
    # più lezioni insieme: ogni disegno chiede qualche minuto
    with ThreadPoolExecutor(max_workers=pr.PARALLELI) as gruppo:
        for (chiave, imp, n, _), dati, risposta, err in gruppo.map(disegna, lavori):
            if err:
                print(f"  ✗ {chiave}: {err}")
                continue
            tok_in += risposta.usage.input_tokens
            tok_out += risposta.usage.output_tokens
            file = []
            for i, ill in enumerate(dati.get("illustrazioni", [])[:n], start=1):
                try:
                    svg = pulisci_svg(ill["svg"])
                except Exception as err:   # un disegno non valido: quella scheda resta senza
                    print(f"  ! {chiave} scheda {i}: disegno scartato ({err})")
                    file.append("")
                    continue
                nome = f"{imp}-{i}.svg"
                (CARTELLA / nome).write_text(svg, encoding="utf-8")
                file.append(nome)
            file += [""] * (n - len(file))
            indice[chiave] = {"impronta": imp, "file": file}
            fatte += 1
            print(f"  ✓ {chiave}: {sum(1 for f in file if f)} disegni", flush=True)

    # via le lezioni e i disegni che non servono più
    indice = {k: v for k, v in sorted(indice.items()) if k in testi}
    usati = {f for v in indice.values() for f in v["file"] if f}
    for f in CARTELLA.glob("*.svg"):
        if f.name not in usati:
            f.unlink()
    INDICE.write_text(json.dumps(indice, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    if fatte:
        costo = tok_in / 1e6 * 4 + tok_out / 1e6 * 20   # listino Opus 5.5 al 10/2026
        print(f"Illustrazioni: {fatte} lezioni disegnate · {tok_in} token in, {tok_out} out · circa {costo:.2f} $")
    print(f"Illustrazioni: {len(usati)} disegni in tutto")


if __name__ == "__main__":
    sys.exit(main())
