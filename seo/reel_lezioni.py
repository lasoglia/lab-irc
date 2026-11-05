#!/usr/bin/env python3
"""
seo/reel_lezioni.py — Monta i reel nuovi delle lezioni (motore «reel2» in promozione/reel.json).

Per ogni reel del regista (seo/regista.py, scritto da seo/reel.py) il cui video non c'è ancora,
né sul sito né su Cloudflare R2: registra a schermo la lezione interattiva (seo/lezione_registra.mjs)
per le inquadrature «lezione», prepara le pagine del fascicolo e la voce (seo/regia.py, voce
Gemini se c'è GEMINI_API_KEY) e monta il video (seo/reel2.mjs) in promozione/reel/. Poi
seo/media_r2.py lo carica su R2. Se un montaggio fallisce, gli altri vanno avanti.

  python seo/reel_lezioni.py
"""

from __future__ import annotations

import json
import os
import subprocess
import sys
import tempfile
from pathlib import Path

RADICE = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(RADICE / "seo"))
import regista  # noqa: E402
CARTELLA = RADICE / "promozione" / "reel"


def su_r2(nome: str) -> bool:
    try:
        registro = json.loads((RADICE / "data" / "media-r2.json").read_text(encoding="utf-8"))
    except (OSError, ValueError):
        return False
    return f"reel/{nome}" in registro or nome in registro


def momento(m: dict, *nomi: str) -> float | None:
    for nome in nomi:
        s = next((x["s"] for x in m.get("momenti", []) if x["cosa"] == nome), None)
        if s is not None:
            return s
    return None


def con_lezione(copione: dict, cartella: Path) -> dict:
    """Le inquadrature «lezione» diventano pezzi della lezione interattiva registrata («clip»);
    se la lezione non c'è o la registrazione fallisce, frasi del prof."""
    lezioni = [q for q in copione.get("inquadrature", []) if q.get("tipo") == "lezione"]
    if not lezioni:
        return copione
    video, m = cartella / "lezione.mp4", None
    scelte = sorted({int(q["scena"]) for q in lezioni if int(q.get("scena") or 0) > 0})
    if copione.get("artefatto"):
        try:
            subprocess.run(["node", str(RADICE / "seo" / "lezione_registra.mjs"), copione["artefatto"], str(video),
                            str(cartella / "momenti.json"), ",".join(map(str, scelte))], check=True, cwd=RADICE)
            m = json.loads((cartella / "momenti.json").read_text(encoding="utf-8"))
        except (subprocess.CalledProcessError, OSError, ValueError) as err:
            print(f"  ! registrazione della lezione non riuscita ({err}): uso frasi del prof")
    for q in lezioni:
        da = momento(m, f"scena {q.get('scena')}") if m and video.exists() else None
        if da is not None:   # la scena che illustra la frase: 5 secondi registrati, se ne usano fino a 4,6
            q.update({"tipo": "clip", "video": str(video), "da": round(da + 0.3, 2),
                      "durata": min(max(float(q.get("durata") or 4), 3.5), 4.6)})
        else:
            q["tipo"] = "prof"
            q.setdefault("testo", q.get("voce", ""))
    return copione


def con_personaggi(copione: dict, cartella: Path) -> dict:
    """Le inquadrature «personaggio» diventano un'immagine dipinta (seo/personaggi.py); se la
    descrizione non è ammessa o nessun servizio risponde, diventano frasi del prof."""
    import personaggi
    for i, q in enumerate(copione.get("inquadrature", [])):
        if q.get("tipo") != "personaggio":
            continue
        try:
            immagine, chi = personaggi.dipingi(q.get("descrizione", ""))
            f = cartella / f"personaggio-{i}.jpg"
            f.write_bytes(immagine)
            q.update({"immagine": str(f), "etichetta_ia": personaggi.ETICHETTA})
            print(f"  ✓ personaggio dipinto da {chi}")
        except Exception as err:
            print(f"  ! personaggio non dipinto ({err}): frase del prof")
            q["tipo"] = "prof"
            q.setdefault("testo", q.get("voce", ""))
    return copione


def copione_anticipo(copione: dict, anticipo: str) -> dict:
    """L'anticipo per la storia delle 13:30 (circa 10 secondi): il gancio con la sua voce, una
    immagine del reel senza voce (non svela la scoperta) e la chiusa «Stasera alle 19»."""
    inq = copione.get("inquadrature", [])
    gancio = next((dict(q) for q in inq if q.get("tipo") == "gancio"), None)
    vista = next((dict(q) for q in inq if q.get("tipo") in ("pagina", "clip", "numero")), None)
    scelte = [q for q in (gancio, vista) if q]
    if vista:
        vista.pop("voce", None)
        vista["durata"] = 3.2
    chiusa = {"tipo": "chiusa", "sopra": "Stasera alle 19", "posa": "occhiolino", "durata": 3.2,
              "testo": anticipo or "Il reel completo, *stasera alle 19*",
              "voce": "Stasera alle diciannove, sul profilo del Lab."}
    return {**copione, "inquadrature": scelte + [chiusa]}


def monta_anticipo(r: dict, copione: dict, t: Path) -> bool:
    """La storia delle 13:30: il video di anticipo del reel. Se non riesce, la storia resta un'immagine."""
    try:
        (t / "anticipo.json").write_text(json.dumps(copione_anticipo(copione, r.get("anticipo", "")),
                                                    ensure_ascii=False), encoding="utf-8")
        subprocess.run([sys.executable, str(RADICE / "seo" / "regia.py"), str(t / "anticipo.json"),
                        str(t / "regia-anticipo.json"), str(t / "lavoro-anticipo")], check=True)
        subprocess.run(["node", str(RADICE / "seo" / "reel2.mjs"), str(t / "regia-anticipo.json"),
                        str(CARTELLA / r["anticipo_video"])], check=True, env={**os.environ, "PYTHON": sys.executable})
        print(f"  ✓ anticipo per la storia: {r['anticipo_video']}")
        return True
    except subprocess.CalledProcessError as err:
        print(f"  ! anticipo non montato ({err}): la storia resta un'immagine")
        (CARTELLA / r["anticipo_video"]).unlink(missing_ok=True)
        return False


def anticipi_mancanti(elenco: list[dict], da_fare: list[dict], usciti: dict) -> list[dict]:
    """I reel già montati (per esempio prima che esistesse l'anticipo) ma non ancora usciti, senza video
    di anticipo: si monta solo quello."""
    return [r for r in elenco if r.get("motore") == "reel2" and r.get("regia") and r.get("anticipo_video")
            and r not in da_fare and r.get("chiave") not in usciti
            and not (CARTELLA / r["anticipo_video"]).exists() and not su_r2(r["anticipo_video"])]


def main() -> int:
    try:
        elenco = json.loads((RADICE / "promozione" / "reel.json").read_text(encoding="utf-8"))
    except (OSError, ValueError):
        elenco = []
    da_fare = [r for r in elenco if r.get("motore") == "reel2" and r.get("regia")
               and not (CARTELLA / r["video"]).exists() and not su_r2(r["video"])]
    print(f"Reel nuovi da montare: {len(da_fare)}")
    CARTELLA.mkdir(parents=True, exist_ok=True)
    errori = 0
    for r in da_fare:
        with tempfile.TemporaryDirectory() as tmp:
            t = Path(tmp)
            try:
                copione = dict(r["regia"])
                if "artefatto" not in copione:   # copioni scritti prima della lezione interattiva
                    a = regista.artefatto_di(r)
                    copione["artefatto"] = str(a.relative_to(RADICE)) if a else ""
                if copione.get("artefatto") and not copione.get("scene_lezione"):
                    copione["scene_lezione"] = regista.scene_di(r)
                copione = con_personaggi(con_lezione(regista.garantisci_lezione(copione), t), t)
                (t / "copione.json").write_text(json.dumps(copione, ensure_ascii=False), encoding="utf-8")
                subprocess.run([sys.executable, str(RADICE / "seo" / "regia.py"), str(t / "copione.json"),
                                str(t / "regia.json"), str(t / "lavoro")], check=True)
                subprocess.run(["node", str(RADICE / "seo" / "reel2.mjs"), str(t / "regia.json"),
                                str(CARTELLA / r["video"])], check=True, env={**os.environ, "PYTHON": sys.executable})
                print(f"  ✓ {r['titolo']}: {r['video']}")
                if r.get("anticipo_video"):   # la storia delle 13:30
                    monta_anticipo(r, copione, t)
            except subprocess.CalledProcessError as err:
                print(f"  ✗ {r['titolo']}: {err}")
                (CARTELLA / r["video"]).unlink(missing_ok=True)
                errori += 1
    # gli anticipi mancanti dei reel già montati: il copione così com'è, senza registrare la lezione
    # (l'immagine dell'anticipo è una pagina del fascicolo o un numero, mai una scena da registrare)
    try:
        usciti = json.loads((RADICE / "data" / "meta.json").read_text(encoding="utf-8"))
    except (OSError, ValueError):
        usciti = {}
    for r in anticipi_mancanti(elenco, da_fare, usciti):
        print(f"Anticipo da montare per un reel già pronto: {r['titolo']}")
        with tempfile.TemporaryDirectory() as tmp:
            monta_anticipo(r, dict(r["regia"]), Path(tmp))
    return 1 if errori and errori == len(da_fare) else 0


if __name__ == "__main__":
    sys.exit(main())
