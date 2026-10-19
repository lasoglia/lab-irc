#!/usr/bin/env python3
"""
seo/genera.py — Rende LAB-IRC trovabile su Google.

PERCHÉ ESISTE
-------------
Il sito è una "single page app": tutte le lezioni vivono dietro indirizzi
con il cancelletto (#anno/1/uda/...). Google considera tutto ciò che segue
il "#" come la STESSA pagina, quindi oggi vede un solo documento con scritto
"JavaScript richiesto". Questo script crea, accanto all'app, una versione
statica e leggibile dai motori di ricerca:

  lezioni/index.html                       indice di tutte le lezioni
  lezioni/<anno>/<uda>/<lezione>/index.html una pagina vera per ogni lezione
  sitemap.xml                              elenco degli indirizzi per Google
  uploads/*.html                           (opzionale) meta description negli artefatti

FASI
----
1. Legge data/*.json (gli stessi file che scrive il pannello Decap).
2. Per ogni lezione estrae il testo dell'artefatto (o del PDF) e, se c'è
   la variabile ANTHROPIC_API_KEY, chiede a Claude titolo SEO, descrizione,
   sintesi e argomenti. I risultati finiscono in data/seo.json, che fa da
   cache: una lezione viene rielaborata SOLO se il suo testo cambia.
   Senza chiave lo script funziona lo stesso, con testi ricavati dai dati.
3. Genera le pagine statiche e la sitemap.

USO
---
  pip install anthropic pypdf
  export ANTHROPIC_API_KEY=sk-ant-...          (Windows: set ANTHROPIC_API_KEY=...)
  python seo/genera.py                         tutto
  python seo/genera.py --senza-ia              solo pagine, nessuna chiamata API
  python seo/genera.py --forza                 rigenera anche le lezioni in cache
  python seo/genera.py --no-artefatti          non tocca i file in uploads/

Per correggere a mano una descrizione: modificala in data/seo.json e metti
"bloccato": true in quella voce. Lo script non la sovrascriverà più.
"""

from __future__ import annotations

import argparse
import datetime as dt
import hashlib
import html
import json
import os
import re
import subprocess
import sys
import unicodedata
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import quote

# --------------------------------------------------------------------------
# Configurazione
# --------------------------------------------------------------------------
RADICE = Path(__file__).resolve().parent.parent
def _url_sito() -> str:
    """Se c'è il file CNAME (dominio personalizzato di GitHub Pages) usa quello,
    altrimenti l'indirizzo github.io. Così, quando cambi dominio, sitemap e link
    canonici si aggiornano da soli."""
    cname = RADICE / "CNAME"
    if cname.exists():
        dominio = cname.read_text(encoding="utf-8").strip().splitlines()[0].strip()
        if dominio:
            return "https://" + dominio.rstrip("/")
    return "https://lasoglia.github.io/lab-irc"


URL_SITO = _url_sito()
MODELLO = os.environ.get("SEO_MODELLO", "claude-sonnet-5-5")
CARATTERI_MAX_TESTO = 12000          # ~3-4k token: basta e avanza per capire una lezione
NOMI_ANNO = {"1": "prima", "2": "seconda", "3": "terza", "4": "quarta", "5": "quinta"}
MARCA_INIZIO = "<!-- seo:inizio (generato da seo/genera.py, non modificare a mano) -->"
MARCA_FINE = "<!-- seo:fine -->"


# --------------------------------------------------------------------------
# Utilità
# --------------------------------------------------------------------------
def leggi_json(nome: str, chiave: str | None = None):
    p = RADICE / "data" / nome
    if not p.exists():
        return [] if chiave else {}
    dati = json.loads(p.read_text(encoding="utf-8"))
    return dati.get(chiave, []) if chiave else dati


def slug(testo: str) -> str:
    t = unicodedata.normalize("NFKD", testo).encode("ascii", "ignore").decode()
    t = re.sub(r"[^a-zA-Z0-9]+", "-", t).strip("-").lower()
    return t[:70].rstrip("-") or "senza-titolo"


def enc(testo: str) -> str:
    """Equivalente di encodeURIComponent di JavaScript (usato dall'app)."""
    return quote(str(testo).strip(), safe="-_.!~*'()")


def e(testo) -> str:
    return html.escape(str(testo or ""), quote=True)


def chiave_lezione(l: dict) -> str:
    return f"{l.get('anno','')}|{l.get('uda','')}|{l.get('titolo','')}"


def file_locale(percorso_web: str) -> Path:
    return RADICE / percorso_web.lstrip("/")


def url_assoluto(percorso_web: str) -> str:
    return URL_SITO + "/" + quote(percorso_web.lstrip("/"))


def ultima_modifica(p: Path) -> str:
    """Data dell'ultimo commit che ha toccato il file (serve alla sitemap)."""
    try:
        out = subprocess.run(
            ["git", "-C", str(RADICE), "log", "-1", "--format=%cs", "--", str(p)],
            capture_output=True, text=True, timeout=20,
        ).stdout.strip()
        if out:
            return out
    except Exception:
        pass
    return dt.date.today().isoformat()


class _Testo(HTMLParser):
    """Estrae il testo visibile da un artefatto, saltando script e stili."""

    SALTA = {"script", "style", "noscript", "svg", "template"}

    def __init__(self):
        super().__init__()
        self.parti: list[str] = []
        self._salto = 0

    def handle_starttag(self, tag, attrs):
        if tag in self.SALTA:
            self._salto += 1

    def handle_endtag(self, tag):
        if tag in self.SALTA and self._salto:
            self._salto -= 1

    def handle_data(self, data):
        if not self._salto and data.strip():
            self.parti.append(data.strip())


def testo_da_file(p: Path) -> str:
    if not p.exists():
        return ""
    if p.suffix.lower() == ".html":
        parser = _Testo()
        parser.feed(p.read_text(encoding="utf-8", errors="ignore"))
        testo = " ".join(parser.parti)
    elif p.suffix.lower() == ".pdf":
        try:
            from pypdf import PdfReader
            testo = " ".join((pg.extract_text() or "") for pg in PdfReader(str(p)).pages)
        except Exception:
            return ""
    else:
        return ""
    return re.sub(r"\s+", " ", testo).strip()


# --------------------------------------------------------------------------
# 1. Raccolta dei dati (lezioni + materiali, come li vede l'app)
# --------------------------------------------------------------------------
def raccogli():
    uda = leggi_json("uda.json", "uda")
    lezioni = leggi_json("lezioni.json", "lezioni")
    materiali = leggi_json("materiali.json", "materiali")
    verifiche = leggi_json("verifiche.json", "verifiche")
    anni = leggi_json("anni.json")
    sito = leggi_json("site.json")

    # I materiali possono stare dentro la lezione OPPURE in materiali.json
    # con i campi uda/lezione: li uniamo, senza doppioni.
    for l in lezioni:
        l.setdefault("materiali", [])
        visti = {m.get("file") for m in l["materiali"]}
        for m in materiali:
            if (m.get("anno") == l.get("anno") and m.get("uda") == l.get("uda")
                    and m.get("lezione") == l.get("titolo") and m.get("file") not in visti):
                l["materiali"].append(m)
                visti.add(m.get("file"))

    # Materiali e verifiche legati alla sola UDA (es. Accoglienza, giochi di fine UDA)
    extra_uda: dict[tuple, list] = {}
    for m in materiali:
        if not m.get("lezione"):
            extra_uda.setdefault((m.get("anno"), m.get("uda")), []).append(m)
    for v in verifiche:
        extra_uda.setdefault((v.get("anno"), v.get("uda")), []).append(
            {**v, "tipo": "Gioco di ripasso"})

    return sito, anni, uda, lezioni, extra_uda


# --------------------------------------------------------------------------
# 2. Testi SEO con Claude (con cache in data/seo.json)
# --------------------------------------------------------------------------
# Formato della risposta: l'API garantisce un JSON valido con questi campi
SCHEMA_SEO = {
    "type": "object",
    "properties": {
        "titolo_seo": {"type": "string",
                       "description": "Max 60 caratteri. Argomento reale della lezione + 'Religione' o 'IRC' + classe."},
        "meta_description": {"type": "string",
                             "description": "Tra 130 e 155 caratteri, frase completa."},
        "sintesi": {"type": "string",
                    "description": "60-90 parole: di che cosa tratta la lezione e che cosa fanno gli studenti."},
        "argomenti": {"type": "array", "items": {"type": "string"},
                      "description": "3-5 argomenti trattati, al massimo 5 parole ciascuno."},
        "parole_chiave": {"type": "array", "items": {"type": "string"},
                          "description": "5-8 espressioni che un docente scriverebbe su Google."},
    },
    "required": ["titolo_seo", "meta_description", "sintesi", "argomenti", "parole_chiave"],
    "additionalProperties": False,
}

ISTRUZIONI = """Sei un redattore editoriale esperto di didattica dell'Insegnamento della \
Religione Cattolica (IRC) nella scuola secondaria di secondo grado italiana e di SEO.
Ricevi il testo di una lezione di un sito di materiali didattici. Scrivi i testi che \
servono a farla trovare su Google da DOCENTI di religione che cercano materiali, e \
restituiscili nel formato JSON richiesto.

Campi da compilare:
- titolo_seo: massimo 60 caratteri; argomento reale + "Religione" o "IRC" + classe.
- meta_description: tra 130 e 155 caratteri, una frase completa.
- sintesi: 60-90 parole su che cosa tratta la lezione e che cosa fanno gli studenti.
- argomenti: 3-5 voci, al massimo 5 parole ciascuna.
- parole_chiave: 5-8 espressioni che un docente scriverebbe su Google.

Regole vincolanti:
- Usa solo ciò che il testo contiene davvero: niente contenuti, autori o attività inventati.
- Il titolo SEO deve dire l'argomento in parole che si cercano (es. "Segni e simboli \
religiosi"), non il titolo evocativo della lezione.
- Nessun nome di scuola, città, classe specifica o anno scolastico.
- Niente superlativi, punti esclamativi o toni pubblicitari: registro sobrio e preciso.
- Italiano corretto, con accenti e apostrofi tipografici normali."""


def testo_lezione(l: dict) -> str:
    """Preferisce l'artefatto interattivo; se manca, usa il fascicolo PDF."""
    ordinati = sorted(l.get("materiali", []),
                      key=lambda m: 0 if str(m.get("file", "")).endswith(".html") else 1)
    for m in ordinati:
        t = testo_da_file(file_locale(m.get("file", "")))
        if len(t) > 200:
            return t[:CARATTERI_MAX_TESTO]
    return ""


def fallback(l: dict, uda_desc: str) -> dict:
    classe = NOMI_ANNO.get(str(l.get("anno")), "")
    titolo = f"{l['titolo']} – Religione Cattolica, classe {classe}"
    desc = (f"Lezione di Religione Cattolica per la classe {classe} della secondaria di secondo "
            f"grado, nell'unità «{l.get('uda','')}». {uda_desc}").strip()
    return {"titolo_seo": titolo[:70], "meta_description": desc[:155].rsplit(" ", 1)[0] + "…"
            if len(desc) > 155 else desc, "sintesi": uda_desc, "argomenti": [], "parole_chiave": [],
            "origine": "automatica"}


def chiedi_a_claude(client, l: dict, uda_desc: str, testo: str) -> dict:
    classe = NOMI_ANNO.get(str(l.get("anno")), l.get("anno"))
    messaggio = (
        f"Classe: {classe} (secondaria di secondo grado)\n"
        f"Unità didattica: {l.get('uda')} — {uda_desc}\n"
        f"Titolo della lezione: {l.get('titolo')}\n\n"
        f"<testo_lezione>\n{testo}\n</testo_lezione>"
    )
    risposta = client.messages.create(
        model=MODELLO,
        max_tokens=4000,
        # Le istruzioni sono identiche per ogni lezione: le mettiamo in cache
        system=[{"type": "text", "text": ISTRUZIONI, "cache_control": {"type": "ephemeral"}}],
        # Compito breve: ragionamento leggero e risposta in JSON garantito
        output_config={"effort": "low",
                       "format": {"type": "json_schema", "schema": SCHEMA_SEO}},
        messages=[{"role": "user", "content": messaggio}],
    )
    if risposta.stop_reason != "end_turn":
        raise RuntimeError(f"Risposta incompleta ({risposta.stop_reason})")
    testo_json = next((b.text for b in risposta.content if b.type == "text"), "")
    dati = json.loads(testo_json)
    dati["origine"] = MODELLO
    dati["token"] = {"input": risposta.usage.input_tokens,
                     "output": risposta.usage.output_tokens}
    return dati


def aggiorna_seo(lezioni, uda, usa_ia: bool, forza: bool) -> dict:
    percorso = RADICE / "data" / "seo.json"
    cache = json.loads(percorso.read_text(encoding="utf-8")) if percorso.exists() else {}
    desc_uda = {(u.get("anno"), u.get("titolo")): u.get("descrizione", "") for u in uda}

    client = None
    if usa_ia and os.environ.get("ANTHROPIC_API_KEY"):
        try:
            import anthropic
            client = anthropic.Anthropic()
        except ImportError:
            print("! Pacchetto 'anthropic' non installato: procedo senza IA (pip install anthropic)")
    elif usa_ia:
        print("! ANTHROPIC_API_KEY non impostata: procedo senza IA")

    nuove, tok_in, tok_out = 0, 0, 0
    for l in lezioni:
        k = chiave_lezione(l)
        uda_desc = desc_uda.get((l.get("anno"), l.get("uda")), "")
        testo = testo_lezione(l)
        impronta = hashlib.sha256((testo + uda_desc + MODELLO).encode()).hexdigest()[:16]
        voce = cache.get(k)

        if voce and voce.get("bloccato"):
            continue
        aggiornata = voce and voce.get("impronta") == impronta and voce.get("origine") != "automatica"
        if aggiornata and not forza:
            continue

        if client and testo:
            try:
                dati = chiedi_a_claude(client, l, uda_desc, testo)
                tok_in += dati["token"]["input"]
                tok_out += dati["token"]["output"]
                nuove += 1
                print(f"  ✓ {l.get('anno')}ª · {l.get('titolo')}")
            except Exception as err:   # un errore su una lezione non blocca le altre
                print(f"  ✗ {l.get('titolo')}: {err}")
                dati = voce or fallback(l, uda_desc)
        else:
            dati = voce if (voce and voce.get("origine") != "automatica") else fallback(l, uda_desc)
        dati["impronta"] = impronta
        cache[k] = dati

    # Le lezioni eliminate dal pannello spariscono anche dalla cache
    valide = {chiave_lezione(l) for l in lezioni}
    cache = {k: v for k, v in sorted(cache.items()) if k in valide}
    percorso.write_text(json.dumps(cache, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    if nuove:
        # Prezzo di listino di Sonnet 5.5 al 10/2026: 2 $ input, 10 $ output per milione di token
        costo = tok_in / 1e6 * 2 + tok_out / 1e6 * 10
        print(f"→ {nuove} lezioni elaborate con {MODELLO}: {tok_in} token in, "
              f"{tok_out} token out, costo stimato ≈ {costo:.3f} $")
    return cache


# --------------------------------------------------------------------------
# 3. Pagine statiche
# --------------------------------------------------------------------------
STILE = """
body{margin:0;background:var(--lab-bg);color:var(--lab-ink);font:17px/1.65 var(--lab-font-body)}
.wrap{max-width:760px;margin:0 auto;padding:28px 16px 64px}
a{color:var(--lab-viola-2)}
nav.bc{font-size:14px;color:var(--lab-muted);margin-bottom:28px}
nav.bc a{color:var(--lab-muted)}
h1{font-family:var(--lab-font-display);font-weight:600;font-size:clamp(30px,6vw,44px);line-height:1.12;margin:.2em 0 .4em}
h2{font-family:var(--lab-font-display);font-weight:600;font-size:24px;margin:2em 0 .5em}
h3{font-size:17px;margin:1.4em 0 .3em}
.kicker{font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--lab-ciano)}
.sintesi{font-size:19px;color:var(--lab-ink-soft)}
ul.argomenti{display:flex;flex-wrap:wrap;gap:8px;padding:0;list-style:none}
ul.argomenti li{border:1px solid var(--lab-line);border-radius:99px;padding:3px 12px;font-size:14px;color:var(--lab-ink-soft)}
.mat{display:block;border:1px solid var(--lab-line);background:var(--lab-surface);border-radius:14px;padding:14px 18px;margin:10px 0;text-decoration:none;color:var(--lab-ink)}
.mat small{display:block;color:var(--lab-muted)}
.cta{display:inline-block;margin-top:24px;background:var(--lab-grad);color:var(--lab-on-brand);font-weight:700;padding:12px 22px;border-radius:12px;text-decoration:none}
ol.lez{padding-left:22px}
footer{margin-top:56px;font-size:14px;color:var(--lab-muted);border-top:1px solid var(--lab-line);padding-top:18px}
"""


def pagina(titolo, descrizione, canonical, profondita, corpo, jsonld=None) -> str:
    su = "../" * profondita
    ld = (f'<script type="application/ld+json">{json.dumps(jsonld, ensure_ascii=False)}</script>'
          if jsonld else "")
    return f"""<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{e(titolo)}</title>
<meta name="description" content="{e(descrizione)}">
<link rel="canonical" href="{e(canonical)}">
<meta property="og:type" content="article">
<meta property="og:title" content="{e(titolo)}">
<meta property="og:description" content="{e(descrizione)}">
<meta property="og:url" content="{e(canonical)}">
<meta property="og:locale" content="it_IT">
<meta property="og:site_name" content="Lab IRC">
<meta property="og:image" content="{e(URL_SITO)}/assets/condivisione.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Lab IRC · il laboratorio di Religione Cattolica">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/svg+xml" href="{su}assets/logo-lab-irc.svg">
<script>try{{var t=localStorage.getItem('tema_lab');if(t)document.documentElement.dataset.tema=t;}}catch(e){{}}</script>
<link rel="stylesheet" href="{su}design-system/styles.css">
<style>{STILE}</style>
{ld}
</head>
<body>
<div class="wrap">
{corpo}
<footer>© {dt.date.today().year} Matteo Sestili · Tutti i diritti riservati · <a href="{su}">Lab IRC</a> · <a href="{su}lezioni/">Indice delle lezioni</a></footer>
</div>
</body>
</html>
"""


def link_materiale(m: dict, su: str) -> str:
    f = m.get("file", "")
    tipo = m.get("tipo") or ("Documento/PDF" if f.endswith(".pdf") else "Artefatto interattivo")
    return (f'<a class="mat" href="{e(su + f.lstrip("/"))}"><b>{e(m.get("titolo") or tipo)}</b>'
            f'<small>{e(tipo)}</small></a>')


def costruisci(sito, anni, uda, lezioni, extra_uda, seo) -> list[tuple[str, str]]:
    """Scrive le pagine e restituisce (url, lastmod) per la sitemap."""
    cartella = RADICE / "lezioni"
    # Ripulisce le pagine generate in passato (lezioni rinominate o eliminate)
    if cartella.exists():
        for vecchio in sorted(cartella.rglob("index.html"), reverse=True):
            vecchio.unlink()
        for d in sorted(cartella.rglob("*"), reverse=True):
            if d.is_dir() and not any(d.iterdir()):
                d.rmdir()

    autore = {"@type": "Person", "name": sito.get("autore", "Matteo Sestili")}
    url_sitemap: list[tuple[str, str]] = []
    uda_ord = sorted(uda, key=lambda u: (str(u.get("anno")), u.get("ordine", 99)))

    for l in lezioni:
        s = seo.get(chiave_lezione(l), {})
        anno, classe = str(l.get("anno")), NOMI_ANNO.get(str(l.get("anno")), "")
        rel = f"lezioni/{anno}/{slug(l.get('uda',''))}/{slug(l['titolo'])}/"
        canonical = f"{URL_SITO}/{rel}"
        su = "../" * 4
        app = (f"{su}#anno/{enc(anno)}/uda/{enc(l.get('uda',''))}/lezione/{enc(l['titolo'])}")
        argomenti = "".join(f"<li>{e(a)}</li>" for a in s.get("argomenti", []))
        materiali = "".join(link_materiale(m, su) for m in l.get("materiali", []))
        corpo = f"""<nav class="bc"><a href="{su}">Lab IRC</a> › <a href="{su}lezioni/#anno-{anno}">Classe {e(classe)}</a> › {e(l.get('uda'))}</nav>
<div class="kicker">Religione Cattolica · classe {e(classe)}</div>
<h1>{e(l['titolo'])}</h1>
<p class="sintesi">{e(s.get('sintesi',''))}</p>
{'<ul class="argomenti">' + argomenti + '</ul>' if argomenti else ''}
<h2>Materiali della lezione</h2>
{materiali or '<p>I materiali di questa lezione sono in preparazione.</p>'}
<a class="cta" href="{e(app)}">Apri la lezione nel Lab</a>
<p style="margin-top:28px;color:var(--lab-muted)">Unità didattica: <b>{e(l.get('uda'))}</b>.</p>"""
        jsonld = {
            "@context": "https://schema.org", "@type": "LearningResource",
            "name": l["titolo"], "headline": s.get("titolo_seo", l["titolo"]),
            "description": s.get("meta_description", ""), "url": canonical,
            "inLanguage": "it", "author": autore, "isAccessibleForFree": True,
            "educationalLevel": f"Scuola secondaria di secondo grado – classe {classe}",
            "learningResourceType": "Lezione",
            "about": "Insegnamento della Religione Cattolica",
            "teaches": s.get("argomenti", []), "keywords": ", ".join(s.get("parole_chiave", [])),
            "isPartOf": {"@type": "Course", "name": l.get("uda", ""),
                         "provider": autore},
        }
        dest = RADICE / rel / "index.html"
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(pagina(s.get("titolo_seo") or l["titolo"], s.get("meta_description", ""),
                               canonical, 4, corpo, jsonld), encoding="utf-8")
        date = [ultima_modifica(file_locale(m["file"])) for m in l.get("materiali", []) if m.get("file")]
        url_sitemap.append((canonical, max(date) if date else ultima_modifica(RADICE / "data" / "lezioni.json")))

    # Indice generale
    blocchi = []
    for anno in ["1", "2", "3", "4", "5"]:
        uda_anno = [u for u in uda_ord if str(u.get("anno")) == anno]
        if not uda_anno:
            continue
        chiave_anno = ["primo", "secondo", "terzo", "quarto", "quinto"][int(anno) - 1]
        parti = [f'<h2 id="anno-{anno}">Classe {NOMI_ANNO[anno]}</h2><p>{e(anni.get(chiave_anno, ""))}</p>']
        for u in uda_anno:
            lez = sorted([l for l in lezioni if str(l.get("anno")) == anno and l.get("uda") == u.get("titolo")],
                         key=lambda x: x.get("ordine", 99))
            voci = "".join(
                f'<li><a href="{anno}/{slug(u["titolo"])}/{slug(l["titolo"])}/">{e(l["titolo"])}</a></li>'
                for l in lez)
            extra = "".join(link_materiale(m, "../") for m in extra_uda.get((anno, u.get("titolo")), []))
            parti.append(f'<h3>{e(u["titolo"])}</h3><p style="color:var(--lab-ink-soft)">{e(u.get("descrizione",""))}</p>'
                         + (f'<ol class="lez">{voci}</ol>' if voci else "") + extra)
        blocchi.append("".join(parti))
    corpo_indice = f"""<nav class="bc"><a href="../">Lab IRC</a> › Indice delle lezioni</nav>
<div class="kicker">Religione Cattolica · scuola secondaria di secondo grado</div>
<h1>Tutte le lezioni del Lab IRC</h1>
<p class="sintesi">{e(sito.get('intro',''))}</p>
{''.join(blocchi)}"""
    desc_indice = ("Lezioni interattive e fascicoli di studio di Religione Cattolica per le cinque "
                   "classi della secondaria di secondo grado, organizzati per unità didattica.")
    (RADICE / "lezioni").mkdir(exist_ok=True)
    (RADICE / "lezioni" / "index.html").write_text(
        pagina("Lezioni di Religione Cattolica per le superiori · Lab IRC", desc_indice,
               f"{URL_SITO}/lezioni/", 1, corpo_indice), encoding="utf-8")
    url_sitemap.insert(0, (f"{URL_SITO}/lezioni/", dt.date.today().isoformat()))
    url_sitemap.insert(0, (f"{URL_SITO}/", ultima_modifica(RADICE / "index.html")))
    return url_sitemap


# --------------------------------------------------------------------------
# 4. Meta description dentro gli artefatti (idempotente, tra due marcatori)
# --------------------------------------------------------------------------
def inietta_meta_artefatti(lezioni, seo) -> int:
    toccati = 0
    for l in lezioni:
        s = seo.get(chiave_lezione(l), {})
        if not s.get("meta_description"):
            continue
        rel = f"lezioni/{l.get('anno')}/{slug(l.get('uda',''))}/{slug(l['titolo'])}/"
        for m in l.get("materiali", []):
            p = file_locale(m.get("file", ""))
            if p.suffix != ".html" or not p.exists():
                continue
            src = p.read_text(encoding="utf-8")
            src = re.sub(re.escape(MARCA_INIZIO) + r".*?" + re.escape(MARCA_FINE) + r"\n?", "",
                         src, flags=re.S)
            if re.search(r'<meta\s+name=["\']description["\']', src, re.I):
                continue   # una descrizione scritta a mano vince sempre
            blocco = (f'{MARCA_INIZIO}\n<meta name="description" content="{e(s["meta_description"])}">\n'
                      f'<link rel="alternate" href="{e(URL_SITO + "/" + rel)}">\n{MARCA_FINE}\n')
            nuovo, n = re.subn(r"(<head[^>]*>\s*)", r"\1" + blocco.replace("\\", "\\\\"), src, count=1, flags=re.I)
            if n and nuovo != p.read_text(encoding="utf-8"):
                p.write_text(nuovo, encoding="utf-8")
                toccati += 1
    return toccati


def scrivi_sitemap(lezioni, extra_uda, url_pagine):
    righe = list(url_pagine)
    visti = {u for u, _ in righe}
    tutti = [m for l in lezioni for m in l.get("materiali", [])] + \
            [m for lst in extra_uda.values() for m in lst]
    for m in tutti:
        f = m.get("file", "")
        if not f or not file_locale(f).exists():
            continue
        u = url_assoluto(f)
        if u not in visti:
            visti.add(u)
            righe.append((u, ultima_modifica(file_locale(f))))
    xml = ['<?xml version="1.0" encoding="UTF-8"?>',
           '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    xml += [f"  <url><loc>{e(u)}</loc><lastmod>{d}</lastmod></url>" for u, d in righe]
    xml.append("</urlset>")
    (RADICE / "sitemap.xml").write_text("\n".join(xml) + "\n", encoding="utf-8")
    return len(righe)


# --------------------------------------------------------------------------
def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--senza-ia", action="store_true", help="non chiama l'API di Claude")
    ap.add_argument("--forza", action="store_true", help="rigenera anche le lezioni già in cache")
    ap.add_argument("--no-artefatti", action="store_true", help="non modifica i file in uploads/")
    a = ap.parse_args()

    sito, anni, uda, lezioni, extra_uda = raccogli()
    print(f"Lezioni trovate: {len(lezioni)}")
    seo = aggiorna_seo(lezioni, uda, usa_ia=not a.senza_ia, forza=a.forza)
    url_pagine = costruisci(sito, anni, uda, lezioni, extra_uda, seo)
    n_url = scrivi_sitemap(lezioni, extra_uda, url_pagine)
    n_art = 0 if a.no_artefatti else inietta_meta_artefatti(lezioni, seo)
    print(f"Pagine statiche: {len(lezioni) + 1} · URL in sitemap: {n_url} · artefatti aggiornati: {n_art}")


if __name__ == "__main__":
    sys.exit(main())
