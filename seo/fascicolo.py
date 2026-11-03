#!/usr/bin/env python3
"""
seo/fascicolo.py — Trova una frase nel fascicolo PDF di una lezione e dice dove sta.

Serve ai reel: il regista sceglie una frase vera del fascicolo, questo modulo trova la
pagina e i rettangoli delle righe (in pixel dell'immagine della pagina a 150 dpi), così il
video può mostrare la pagina vera, avvicinarsi e passarci sopra l'evidenziatore.
Usa pdftotext e pdftoppm (poppler-utils), niente IA.

  trova(pdf, frase)            -> {"pagina": n, "righe": [{x, y, w, h}, ...]} oppure None
  immagine(pdf, pagina, file)  -> scrive la pagina in JPG a 150 dpi
  parola(pdf, pagina, parola)  -> {x, y, w, h} della prima parola uguale (per il cerchio)

USO
---
  python seo/fascicolo.py copione.json   controlla che ogni citazione delle inquadrature «pagina»
                                         sia davvero nel fascicolo (esce con 1 se ne manca una)
  python seo/fascicolo.py file.pdf       stampa il testo del fascicolo, pagina per pagina
"""

from __future__ import annotations

import html
import json
import re
import subprocess
import sys
import unicodedata
from pathlib import Path

DPI = 150
SCALA = DPI / 72


def _norma(s: str) -> str:
    s = unicodedata.normalize("NFKD", s.replace("’", "'").replace("‘", "'")).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]", "", s.lower())


def _parole(pdf: Path, pagina: int) -> list[tuple[float, float, float, float, str]]:
    uscita = subprocess.run(["pdftotext", "-bbox-layout", "-f", str(pagina), "-l", str(pagina), str(pdf), "-"],
                            capture_output=True, text=True, check=True).stdout
    return [(float(a), float(b), float(c), float(d), html.unescape(t)) for a, b, c, d, t in re.findall(
        r'<word xMin="([\d.]+)" yMin="([\d.]+)" xMax="([\d.]+)" yMax="([\d.]+)">([^<]*)</word>', uscita)]


def pagine(pdf: Path) -> int:
    info = subprocess.run(["pdfinfo", str(pdf)], capture_output=True, text=True, check=True).stdout
    return int(re.search(r"Pages:\s+(\d+)", info).group(1))


def trova(pdf: Path, frase: str, cerchia: str | None = None) -> dict | None:
    """La frase (almeno 4 parole) cercata parola per parola, ignorando accenti e punteggiatura.
    Con «cerchia» (una parola o poche parole dentro la frase) dà anche il rettangolo da cerchiare."""
    cercate = [w for w in (_norma(p) for p in frase.split()) if w]
    if len(cercate) < 4:
        return None
    for n in range(1, pagine(pdf) + 1):
        parole = _parole(pdf, n)
        norme = [_norma(p[4]) for p in parole]
        for i in range(len(parole)):
            k, j = i, 0
            while k < len(parole) and j < len(cercate):
                if not norme[k]:
                    k += 1
                    continue
                if norme[k] != cercate[j]:
                    break
                k, j = k + 1, j + 1
            if j == len(cercate):
                esito = {"pagina": n, "righe": _righe(parole[i:k])}
                if cerchia:
                    esito["cerchio"] = _dentro(parole[i:k], cerchia)
                return esito
    return None


def _dentro(parole: list, cerchia: str) -> dict | None:
    """Il rettangolo delle parole «cerchia» dentro un gruppo di parole già trovato."""
    cercate = [w for w in (_norma(p) for p in cerchia.split()) if w]
    norme = [_norma(p[4]) for p in parole]
    for i in range(len(parole) - len(cercate) + 1):
        if norme[i:i + len(cercate)] == cercate:
            gruppo = parole[i:i + len(cercate)]
            x0, y0 = min(p[0] for p in gruppo), min(p[1] for p in gruppo)
            x1, y1 = max(p[2] for p in gruppo), max(p[3] for p in gruppo)
            return {"x": round(x0 * SCALA), "y": round(y0 * SCALA), "w": round((x1 - x0) * SCALA),
                    "h": round((y1 - y0) * SCALA)}
    return None


def _righe(parole: list) -> list[dict]:
    """Le parole raggruppate per riga, ognuna come rettangolo in pixel a 150 dpi."""
    righe: list[list] = []
    for p in parole:
        if righe and abs(righe[-1][-1][1] - p[1]) < 3:
            righe[-1].append(p)
        else:
            righe.append([p])
    esito = []
    for r in righe:
        x0, y0 = min(p[0] for p in r), min(p[1] for p in r)
        x1, y1 = max(p[2] for p in r), max(p[3] for p in r)
        esito.append({"x": round(x0 * SCALA) - 4, "y": round(y0 * SCALA) - 3,
                      "w": round((x1 - x0) * SCALA) + 8, "h": round((y1 - y0) * SCALA) + 6})
    return esito


def parola(pdf: Path, pagina: int, cercata: str) -> dict | None:
    bersaglio = _norma(cercata)
    for p in _parole(pdf, pagina):
        if _norma(p[4]) == bersaglio:
            return {"x": round(p[0] * SCALA), "y": round(p[1] * SCALA),
                    "w": round((p[2] - p[0]) * SCALA), "h": round((p[3] - p[1]) * SCALA)}
    return None


def immagine(pdf: Path, pagina: int, destinazione: Path) -> Path:
    destinazione.parent.mkdir(parents=True, exist_ok=True)
    radice = destinazione.with_suffix("")
    subprocess.run(["pdftoppm", "-r", str(DPI), "-f", str(pagina), "-l", str(pagina), "-singlefile", "-jpeg",
                    "-jpegopt", "quality=90", str(pdf), str(radice)], check=True)
    return radice.with_suffix(".jpg")


def controlla(copione: Path, radice: Path) -> list[str]:
    """Gli errori del copione: citazioni che non sono nel fascicolo o dettagli da cerchiare assenti."""
    c = json.loads(copione.read_text(encoding="utf-8"))
    pdf = radice / c.get("fascicolo", "")
    if not pdf.is_file():
        return [f"fascicolo non trovato: {c.get('fascicolo')}"]
    errori = []
    for n, q in enumerate(c.get("inquadrature", []), 1):
        if q.get("tipo") != "pagina":
            continue
        esito = trova(pdf, q.get("citazione", ""), q.get("cerchia"))
        if not esito:
            errori.append(f"inquadratura {n}: citazione non trovata (servono almeno 4 parole esatte)")
        elif q.get("cerchia") and not esito.get("cerchio"):
            errori.append(f"inquadratura {n}: «{q['cerchia']}» non è dentro la citazione")
    return errori


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    f = Path(sys.argv[1])
    if f.suffix == ".pdf":
        for n in range(1, pagine(f) + 1):
            testo = subprocess.run(["pdftotext", "-layout", "-f", str(n), "-l", str(n), str(f), "-"],
                                   capture_output=True, text=True, check=True).stdout
            try:
                print(f"===== pagina {n} =====\n{testo}")
            except BrokenPipeError:
                break
        sys.exit(0)
    sbagli = controlla(f, Path.cwd())
    print("\n".join(sbagli) if sbagli else "Tutte le citazioni sono nel fascicolo.")
    sys.exit(1 if sbagli else 0)
