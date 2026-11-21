#!/usr/bin/env python3
"""
seo/indice.py — Ricerca nel testo e indice dei nomi del Lab IRC (senza IA).

Lo chiama seo/genera.py a ogni sincronizzazione; si può anche lanciare da solo
(`python seo/indice.py`) per vedere le voci e le proposte senza toccare le pagine.

CHE COSA PRODUCE
----------------
  data/testi.json        il testo dei fascicoli, pagina per pagina: lo scarica il sito
                         solo quando qualcuno cerca, e cerca lì dentro (ricerca nel testo)
  data/indice-uso.json   per ogni voce dell'indice le lezioni che ne parlano (con la frase
                         e la pagina del fascicolo) e, per ogni lezione, le lezioni vicine
                         («Ne parlano anche…»)
  indice/                le pagine dell'indice per Google: /indice/ (dalla A alla Z) e una
                         pagina per voce; /indice/proposte/ (nascosta) elenca i nomi che
                         ricorrono nei fascicoli e non sono ancora nell'indice

L'INDICE LO DECIDE IL DOCENTE
-----------------------------
Le voci stanno in data/indice.json (si modifica dal pannello /admin, «Indice dei nomi»):
  nome         come compare nell'indice («Galileo Galilei»)
  tipo         persona, luogo, documento, evento, tema
  forme        come si trova scritto nei testi («Galileo», «Galilei»). Una forma con almeno
               una maiuscola si cerca così com'è (Galileo ≠ galileo); una forma tutta
               minuscola si cerca senza badare alle maiuscole («indulgenze»)
  escludi      frasi che NON valgono («il Galileo», detto di Gesù; «Agostino Bea»).
               Il segno # vale «un numero qualsiasi» («canone #» esclude «canone 11»)
  wikipedia    indirizzo della voce di Wikipedia (facoltativo: aiuta Google a capire chi è)
  descrizione  una riga che compare nella pagina della voce (facoltativa)
e `scartate` raccoglie i nomi proposti che non devono più essere proposti.
"""

from __future__ import annotations

import json
import math
import re
import sys
import unicodedata
from collections import Counter, defaultdict
from pathlib import Path

RADICE = Path(__file__).resolve().parent.parent
FILE_VOCI = RADICE / "data" / "indice.json"
FILE_TESTI = RADICE / "data" / "testi.json"
FILE_USO = RADICE / "data" / "indice-uso.json"
CARTELLA = RADICE / "indice"

TIPI = {"persona": "Persone", "luogo": "Luoghi", "documento": "Libri e documenti",
        "evento": "Eventi", "tema": "Temi"}
UNO = {"persona": "Persona", "luogo": "Luogo", "documento": "Libro o documento", "evento": "Evento", "tema": "Tema"}
# una voce presente in troppe lezioni non dice niente su quali lezioni si somigliano
QUOTA_MAX_VICINI = 0.25
MAX_VICINI = 5

# testa e piede che ogni pagina dei fascicoli ripete
_TESTATA = re.compile(r"^©\s*Matteo Sestili\s*[—–-]\s*Tutti i diritti riservati\s*\d*\s*")


def norm(t: str) -> str:
    """Minuscole e senza accenti: la stessa normalizzazione che usa il sito."""
    t = unicodedata.normalize("NFD", str(t or ""))
    return "".join(c for c in t if unicodedata.category(c) != "Mn").lower()


def slug(testo: str) -> str:
    t = unicodedata.normalize("NFKD", testo).encode("ascii", "ignore").decode()
    t = re.sub(r"[^a-zA-Z0-9]+", "-", t).strip("-").lower()
    return t[:70].rstrip("-") or "voce"


def pulisci(t: str) -> str:
    t = re.sub(r"\s+", " ", t or "").strip()
    t = _TESTATA.sub("", t)
    # parole spezzate a fine riga: «evan- gelo» → «evangelo»
    t = re.sub(r"(\w)- (\w)", r"\1\2", t)
    return t


# --------------------------------------------------------------------------
# 1. Il testo dei materiali
# --------------------------------------------------------------------------
def pagine_di(p: Path) -> list[str]:
    """Il testo di un file, pagina per pagina (un HTML è una pagina sola)."""
    if not p.exists():
        return []
    suf = p.suffix.lower()
    if suf == ".pdf":
        try:
            from pypdf import PdfReader
            return [pulisci(pg.extract_text() or "") for pg in PdfReader(str(p)).pages]
        except Exception as ex:
            print(f"  ! non riesco a leggere {p.name}: {ex}", file=sys.stderr)
            return []
    if suf in (".html", ".htm"):
        sys.path.insert(0, str(Path(__file__).parent))
        from genera import _Testo   # stesso estrattore delle pagine per Google
        parser = _Testo()
        parser.feed(p.read_text(encoding="utf-8", errors="ignore"))
        t = pulisci(" ".join(parser.parti))
        return [t] if len(t) > 200 else []
    return []


def raccogli_testi(lezioni: list[dict], extra_uda: dict) -> list[dict]:
    """Un documento per ogni file con del testo: anno, unità, lezione, file, pagine."""
    docs, visti = [], set()

    def aggiungi(anno, uda, lez, m):
        f = str(m.get("file") or "")
        if not f or (anno, uda, lez, f) in visti:
            return
        visti.add((anno, uda, lez, f))
        pagine = pagine_di(RADICE / f.lstrip("/"))
        if sum(len(x) for x in pagine) < 200:
            return
        d = {"a": str(anno), "u": uda or "", "l": lez or "", "f": "/" + f.lstrip("/"), "p": pagine}
        if not lez:
            d["t"] = m.get("titolo") or ""
        docs.append(d)

    for l in lezioni:
        for m in l.get("materiali", []):
            aggiungi(l.get("anno"), l.get("uda"), l.get("titolo"), m)
    for (anno, uda), mats in extra_uda.items():
        for m in mats:
            if m.get("tipo") == "Gioco di ripasso":
                continue   # i giochi di verifica no: si troverebbero le risposte
            aggiungi(anno, uda, "", m)
    return docs


# --------------------------------------------------------------------------
# 2. Le voci dell'indice
# --------------------------------------------------------------------------
def leggi_voci() -> tuple[list[dict], set[str]]:
    if not FILE_VOCI.exists():
        return [], set()
    dati = json.loads(FILE_VOCI.read_text(encoding="utf-8"))
    voci = []
    for v in dati.get("voci", []):
        nome = str(v.get("nome") or "").strip()
        if not nome:
            continue
        forme = [str(f).strip() for f in (v.get("forme") or []) if str(f).strip()] or [nome]
        voci.append({**v, "nome": nome, "forme": forme,
                     "escludi": [str(x).strip() for x in (v.get("escludi") or []) if str(x).strip()],
                     "tipo": v.get("tipo") if v.get("tipo") in TIPI else "tema",
                     "slug": slug(nome)})
    return voci, {norm(s) for s in dati.get("scartate", []) if str(s).strip()}


def _regex(forma: str) -> re.Pattern:
    flag = re.I if forma == forma.lower() else 0
    corpo = re.escape(forma).replace(r"\#", r"\d+")
    return re.compile(r"(?<!\w)" + corpo + r"(?!\w)", flag)


def compila(v: dict) -> dict:
    # le forme più lunghe prima: «Galileo Galilei» conta una volta, non due
    forme = sorted(set(v["forme"]), key=len, reverse=True)
    return {"forme": [_regex(f) for f in forme],
            "escludi": [_regex(x) for x in v["escludi"]]}


def occorrenze(c: dict, testo: str) -> list[tuple[int, int]]:
    no = [m.span() for r in c["escludi"] for m in r.finditer(testo)]
    prese: list[tuple[int, int]] = []
    for r in c["forme"]:
        for m in r.finditer(testo):
            a, b = m.span()
            if any(a < y and x < b for x, y in no) or any(a < y and x < b for x, y in prese):
                continue
            prese.append((a, b))
    return sorted(prese)


_INTESTAZIONE = re.compile(r"Insegnamento della Religione Cattolica|Materiale ad uso personale dello studente")
_NOTA = re.compile(r"pp?\.\s*\d|a cura di|https?://|^…?\[\d+\]|ed\.\s|cit\.")


def frase(testo: str, a: int, b: int, larg: int = 230) -> str:
    """La frase che contiene il punto [a, b), al massimo `larg` caratteri (con la parola dentro)."""
    ini = max(testo.rfind(". ", 0, a), testo.rfind("? ", 0, a), testo.rfind("! ", 0, a))
    ini = ini + 2 if ini >= 0 and a - ini < larg - (b - a) else max(0, a - larg // 2)
    fin = [i for i in (testo.find(". ", b), testo.find("? ", b), testo.find("! ", b)) if i >= 0]
    fin = min(fin) + 1 if fin and min(fin) - ini <= larg else max(b, min(len(testo), ini + larg))
    s = _INTESTAZIONE.sub("", testo[ini:fin]).replace("  ", " ").strip(" ·")
    if ini > 0 and not re.match(r"[A-ZÀ-Ý«“\"(]", s):
        s = "…" + s
    if fin < len(testo) and not s.endswith((".", "?", "!", "»")):
        s += "…"
    return s


def chiave(d: dict) -> tuple:
    return (d["a"], d["u"], d["l"])


def calcola_uso(docs: list[dict], voci: list[dict]) -> dict:
    """Per ogni voce: le lezioni che ne parlano, quante volte, la prima frase e la sua pagina."""
    lez_idx: dict[tuple, int] = {}
    elenco: list[list] = []
    for d in docs:
        k = chiave(d)
        if k not in lez_idx:
            lez_idx[k] = len(elenco)
            elenco.append([d["a"], d["u"], d["l"] or d.get("t", "")] + ([] if d["l"] else [1]))
    out = []
    for v in voci:
        c = compila(v)
        per_lez: dict[int, list] = {}
        for d in docs:
            li = lez_idx[chiave(d)]
            for np, testo in enumerate(d["p"], 1):
                occ = occorrenze(c, testo)
                if not occ:
                    continue
                r = per_lez.setdefault(li, [li, 0, None, None, "", True])
                r[1] += len(occ)
                for o in occ:
                    # la prima frase vera: intestazioni e note bibliografiche solo se non c'è altro
                    fr = frase(testo, *o)
                    debole = bool(_INTESTAZIONE.search(testo[max(0, o[0] - 160):o[0]]) or _NOTA.search(fr))
                    if r[2] is None or (r[5] and not debole):
                        r[2], r[3], r[4], r[5] = (np if d["f"].lower().endswith(".pdf") else 0,
                                                  d["f"], fr, debole)
                    if not debole:
                        break
        righe = sorted((r[:5] for r in per_lez.values()), key=lambda r: (elenco[r[0]][0], -r[1]))
        out.append({"s": v["slug"], "n": v["nome"], "t": v["tipo"],
                    "f": sorted({norm(x) for x in v["forme"] + [v["nome"]]}),
                    "w": v.get("wikipedia", ""), "d": v.get("descrizione", ""),
                    "l": righe})
    # lezioni vicine: quante voci "rare" hanno in comune (peso = rarità della voce)
    n_lez = max(1, len(elenco))
    per_lezione: dict[int, set[int]] = defaultdict(set)
    peso: dict[int, float] = {}
    for vi, v in enumerate(out):
        df = len(v["l"])
        if df < 2 or df > QUOTA_MAX_VICINI * n_lez:
            continue
        peso[vi] = math.log(n_lez / df)
        for r in v["l"]:
            per_lezione[r[0]].add(vi)
    vicini: dict[str, list] = {}
    for li, mie in per_lezione.items():
        punti = []
        for lj, loro in per_lezione.items():
            if lj == li:
                continue
            comuni = mie & loro
            if comuni:
                punti.append((sum(peso[x] for x in comuni), lj, sorted(comuni, key=lambda x: -peso[x])))
        punti.sort(key=lambda x: -x[0])
        scelti = [[lj, comuni[:3]] for p, lj, comuni in punti[:MAX_VICINI] if p >= 1.5]
        if scelti:
            vicini[str(li)] = scelti
    return {"v": 1, "lezioni": elenco, "voci": out, "vicini": vicini}


# --------------------------------------------------------------------------
# 3. Proposte di voci nuove (nomi che ricorrono e non sono nell'indice)
# --------------------------------------------------------------------------
_MAI = set("""Il La Lo Le Gli I Un Una Uno E Ed O Ma Se In Per Non Né Che Chi Come Quando Dove Questo
Questa Questi Quello Quella Quel Quelle Nel Nella Nei Nello Del Della Dei Delle Dal Dalla Al Alla Agli Ai
Con Da Di Su Tra Fra Anche Così Poi Ora Qui Lì Già Oggi Ogni Tutto Tutti Tutte Nessuno Perché Cosa Quale
Quali Anzi Infatti Dunque Allora Prima Dopo Secondo Ciclo Classe Insegnamento Religione Cattolica
Istruzione Note Fonti Bibliografia Scheda Domande Glossario Lessico Parole Lezione Unità Matteo Sestili
Diritti Materiale Resta Torniamo Possiamo Ecco Noi Voi Io Tu Lui Lei Egli Essi Sono Siamo Più Ho Hai
Proviamo Fermiamoci Pensiamo Ritorniamo Mettiamo Seguiamo Consideriamo Immaginiamo Prendiamo Abbiamo
Eravamo Bisogna Occorre Davvero Vale Devo Passano Subito Perciò Ciò Colui Quanto Guarda Ascolta Fin
Due Tre Quattro Sette Dodici Sintesi Introduzione Opere Storia Vita Corso Grande Piccolo Nuovo Credere
Essere Sta Va Vattene Férmati Rendete Mi Ci Ne Ivi Agli Saint The Of And Si Dal""".split())


def proposte(docs: list[dict], voci: list[dict], scartate: set[str], quante: int = 80) -> list[dict]:
    coperti = [compila(v) for v in voci]
    nomi_voci = {norm(v["nome"]) for v in voci}
    U, L = "A-ZÀ-ÖØ-Ý", "a-zà-öø-ÿ"
    pat = re.compile(rf"(?<![.!?»:]\s)(?<![\w'’])([{U}][{L}'’]+(?:\s+(?:di|de|da|del|della|d'|von|van)?\s*[{U}][{L}'’]+)*)")
    conta, lez, esempio = Counter(), defaultdict(set), {}
    for d in docs:
        for np, testo in enumerate(d["p"], 1):
            gia = [s for c in coperti for s in occorrenze(c, testo)]
            for m in pat.finditer(testo):
                n = m.group(1).strip(" '’")
                a, b = m.span(1)
                if (n.split()[0] in _MAI or len(n) < 4 or norm(n) in scartate or norm(n) in nomi_voci
                        or any(a < y and x < b for x, y in gia)):
                    continue
                conta[n] += 1
                lez[n].add(chiave(d))
                esempio.setdefault(n, (d, np, frase(testo, a, b)))
    righe = [(n, len(lez[n]), conta[n]) for n in conta if len(lez[n]) >= 2 and conta[n] >= 4]
    righe.sort(key=lambda r: (-r[1], -r[2]))
    out = []
    for n, nl, nc in righe[:quante]:
        d, np, fr = esempio[n]
        out.append({"nome": n, "lezioni": nl, "volte": nc, "esempio": fr,
                    "dove": f"{d['l'] or d.get('t', '')} (anno {d['a']}, pag. {np})"})
    return out


# --------------------------------------------------------------------------
# 4. Pagine per Google
# --------------------------------------------------------------------------
def url_lezione(a: str, u: str, l: str) -> str:
    return f"lezioni/{a}/{slug(u)}/{slug(l)}/"


def scrivi_pagine(uso: dict, prop: list[dict], pagina, e, url_sito: str, lastmod: str) -> list[tuple[str, str]]:
    """Scrive indice/…; `pagina` ed `e` sono quelli di genera.py. Restituisce gli URL per la sitemap."""
    if CARTELLA.exists():
        for vecchio in sorted(CARTELLA.rglob("index.html"), reverse=True):
            vecchio.unlink()
        for d in sorted(CARTELLA.rglob("*"), reverse=True):
            if d.is_dir() and not any(d.iterdir()):
                d.rmdir()
    CARTELLA.mkdir(exist_ok=True)
    L = uso["lezioni"]
    attive = [v for v in uso["voci"] if v["l"]]
    urls: list[tuple[str, str]] = []
    nomi_anno = {"1": "prima", "2": "seconda", "3": "terza", "4": "quarta", "5": "quinta"}

    for v in attive:
        rel = f"indice/{v['s']}/"
        su = "../../"
        per_anno: dict[str, list] = defaultdict(list)
        for li, n, np, f, fr in v["l"]:
            per_anno[L[li][0]].append((L[li], n, np, f, fr))
        blocchi = []
        for anno in sorted(per_anno):
            voci_html = []
            for lz, n, np, f, fr in per_anno[anno]:
                a, u, t = lz[0], lz[1], lz[2]
                href = su + (url_lezione(a, u, t) if len(lz) == 3 else "lezioni/#anno-" + a)
                pag = (f' · <a href="{e(su + f.lstrip("/"))}#page={np}">pagina {np} del fascicolo</a>'
                       if np else "")
                voci_html.append(
                    f'<li><a href="{e(href)}"><b>{e(t)}</b></a><br><small>{e(u)} · {n} '
                    f'{"volta" if n == 1 else "volte"}{pag}</small><blockquote>{e(fr)}</blockquote></li>')
            blocchi.append(f'<h2>Classe {nomi_anno.get(anno, anno)}</h2><ul class="occ">{"".join(voci_html)}</ul>')
        n_lez = len(v["l"])
        desc = (f"{v['n']} nelle lezioni di Religione Cattolica del Lab IRC: {n_lez} "
                f"{'lezione' if n_lez == 1 else 'lezioni'} per le superiori, con le frasi dei fascicoli in cui compare.")
        wiki = (f'<p><a href="{e(v["w"])}" rel="noopener">{e(v["n"])} su Wikipedia</a></p>' if v.get("w") else "")
        corpo = (f'<nav class="bc"><a href="{su}">Lab IRC</a> › <a href="../">Indice</a> › {e(v["n"])}</nav>'
                 f'<div class="kicker">Indice · {e(UNO[v["t"]])}</div>'
                 f'<h1>{e(v["n"])}</h1>'
                 + (f'<p class="sintesi">{e(v["d"])}</p>' if v.get("d") else "")
                 + f'<p>Ne parlano <b>{n_lez} {"lezione" if n_lez == 1 else "lezioni"}</b> del Lab. '
                 f'Per ognuna, la frase del fascicolo in cui compare.</p>'
                 + "".join(blocchi) + wiki
                 + f'<a class="cta" href="{su}?q={e(v["n"])}">Cerca «{e(v["n"])}» nel Lab</a>')
        canonical = f"{url_sito}/{rel}"
        jsonld = {
            "@context": "https://schema.org",
            "@graph": [
                {"@type": "CollectionPage", "name": f"{v['n']} · Indice del Lab IRC", "url": canonical,
                 "inLanguage": "it", "description": desc,
                 "about": {"@type": {"persona": "Person", "luogo": "Place"}.get(v["t"], "Thing"),
                           "name": v["n"], **({"sameAs": v["w"]} if v.get("w") else {})},
                 "hasPart": [{"@type": "LearningResource", "name": L[r[0]][2],
                              "url": f"{url_sito}/{url_lezione(*L[r[0]][:3])}"} for r in v["l"] if len(L[r[0]]) == 3]},
                {"@type": "BreadcrumbList", "itemListElement": [
                    {"@type": "ListItem", "position": 1, "name": "Lab IRC", "item": url_sito + "/"},
                    {"@type": "ListItem", "position": 2, "name": "Indice", "item": url_sito + "/indice/"},
                    {"@type": "ListItem", "position": 3, "name": v["n"], "item": canonical}]},
            ]}
        dest = RADICE / rel / "index.html"
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(pagina(f"{v['n']}: le lezioni di Religione che ne parlano · Lab IRC", desc,
                               canonical, 2, STILE_INDICE + corpo, jsonld), encoding="utf-8")
        urls.append((canonical, lastmod))

    # indice dalla A alla Z, diviso per tipo
    gruppi = []
    for tipo, titolo in TIPI.items():
        vv = sorted([v for v in attive if v["t"] == tipo], key=lambda v: norm(v["n"]))
        if not vv:
            continue
        righe = "".join(f'<li><a href="{v["s"]}/">{e(v["n"])}</a> <small>{len(v["l"])}</small></li>' for v in vv)
        gruppi.append(f'<h2 id="{tipo}">{titolo}</h2><ul class="az">{righe}</ul>')
    tutte = sorted(attive, key=lambda v: norm(v["n"]))
    lettere = sorted({norm(v["n"])[0].upper() for v in tutte})
    az = []
    for lt in lettere:
        vv = [v for v in tutte if norm(v["n"])[0].upper() == lt]
        az.append(f'<h3 id="lettera-{lt}">{lt}</h3><ul class="az">'
                  + "".join(f'<li><a href="{v["s"]}/">{e(v["n"])}</a> <small>{len(v["l"])}</small></li>' for v in vv)
                  + "</ul>")
    corpo = (f'<nav class="bc"><a href="../">Lab IRC</a> › Indice</nav>'
             f'<div class="kicker">Religione Cattolica · indice dei nomi e dei temi</div>'
             f'<h1>Indice del Lab</h1>'
             f'<p class="sintesi">Persone, luoghi, libri, eventi e temi di cui parlano le lezioni, '
             f'come nell\'indice di un libro. Accanto a ogni voce, quante lezioni ne parlano.</p>'
             f'<p class="salti">' + " ".join(f'<a href="#{t}">{TIPI[t]}</a>' for t in TIPI
                                              if any(v["t"] == t for v in attive)) + '</p>'
             + "".join(gruppi)
             + '<h2 id="az">Dalla A alla Z</h2><p class="salti">'
             + " ".join(f'<a href="#lettera-{lt}">{lt}</a>' for lt in lettere) + "</p>" + "".join(az))
    desc = ("L'indice delle lezioni di Religione Cattolica del Lab IRC: persone, luoghi, documenti, "
            "eventi e temi, con le lezioni per le superiori che ne parlano.")
    canonical = f"{url_sito}/indice/"
    (CARTELLA / "index.html").write_text(
        pagina("Indice dei nomi e dei temi · Lezioni di Religione Cattolica · Lab IRC", desc, canonical, 1,
               STILE_INDICE + corpo,
               {"@context": "https://schema.org", "@type": "CollectionPage", "name": "Indice del Lab IRC",
                "url": canonical, "inLanguage": "it", "description": desc}), encoding="utf-8")
    urls.insert(0, (canonical, lastmod))

    # proposte: pagina nascosta per il docente (fuori dalla sitemap, noindex)
    righe = "".join(
        f'<tr><td><b>{e(p["nome"])}</b></td><td>{p["lezioni"]}</td><td>{p["volte"]}</td>'
        f'<td><small>{e(p["esempio"])}<br><i>{e(p["dove"])}</i></small></td></tr>' for p in prop)
    corpo = ('<nav class="bc"><a href="../../">Lab IRC</a> › <a href="../">Indice</a> › Proposte</nav>'
             '<h1>Nomi da aggiungere all\'indice?</h1>'
             '<p>Nomi che ricorrono in più lezioni e non sono ancora nell\'indice, dal più diffuso. '
             'Per aggiungerne uno: pannello /admin → <b>Indice dei nomi</b> → nuova voce (nome, tipo, '
             'forme). Per non vederlo più qui: aggiungilo a <b>Nomi scartati</b>.</p>'
             '<table class="prop"><tr><th>Nome</th><th>Lezioni</th><th>Volte</th><th>Esempio</th></tr>'
             + righe + '</table>')
    dest = CARTELLA / "proposte" / "index.html"
    dest.parent.mkdir(parents=True, exist_ok=True)
    html_prop = pagina("Proposte per l'indice · Lab IRC", "Pagina di servizio.", f"{url_sito}/indice/proposte/",
                       2, STILE_INDICE + corpo)
    dest.write_text(html_prop.replace('<meta name="viewport"', '<meta name="robots" content="noindex">\n<meta name="viewport"', 1),
                    encoding="utf-8")
    return urls


STILE_INDICE = """<style>
ul.occ{list-style:none;padding:0}
ul.occ li{border:1px solid var(--lab-line);background:var(--lab-surface);border-radius:14px;padding:14px 18px;margin:10px 0}
ul.occ small{color:var(--lab-muted)}
ul.occ blockquote{margin:8px 0 0;padding-left:12px;border-left:3px solid var(--lab-oro, #c9a227);color:var(--lab-ink-soft);font-size:16px}
ul.az{columns:2 220px;padding-left:18px}
ul.az small{color:var(--lab-muted)}
p.salti{display:flex;flex-wrap:wrap;gap:6px 14px}
table.prop{border-collapse:collapse;font-size:15px}
table.prop td,table.prop th{border-bottom:1px solid var(--lab-line);padding:8px;vertical-align:top;text-align:left}
</style>
"""


# --------------------------------------------------------------------------
# 5. Tutto insieme (lo chiama genera.py)
# --------------------------------------------------------------------------
def esegui(lezioni: list[dict], extra_uda: dict) -> tuple[list[dict], dict, list[dict]]:
    docs = raccogli_testi(lezioni, extra_uda)
    voci, scartate = leggi_voci()
    uso = calcola_uso(docs, voci)
    prop = proposte(docs, voci, scartate)
    FILE_TESTI.write_text(json.dumps({"v": 1, "d": docs}, ensure_ascii=False, separators=(",", ":")),
                          encoding="utf-8")
    FILE_USO.write_text(json.dumps(uso, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    pagine = sum(len(d["p"]) for d in docs)
    usate = sum(1 for v in uso["voci"] if v["l"])
    print(f"Ricerca nel testo: {len(docs)} file, {pagine} pagine · indice: {usate}/{len(voci)} voci "
          f"presenti nelle lezioni · proposte: {len(prop)}")
    return docs, uso, prop


def estratti(docs: list[dict], parole: int = 380) -> dict[tuple, dict]:
    """L'inizio del fascicolo di ogni lezione (dopo l'intestazione), per le pagine per Google:
    testo vero e unico che dice a Google di che cosa parla la lezione."""
    out: dict[tuple, dict] = {}
    for d in docs:
        if not d["l"] or not d["f"].lower().endswith(".pdf") or chiave(d) in out:
            continue
        t = " ".join(d["p"][:3])
        m = re.search(r"Materiale ad uso personale dello studente\s*", t)
        if m and m.end() < 1500:
            t = t[m.end():]
        t = re.sub(r"\s*\[\d+(?:[,–-]\s*\d+)*\]", "", t)          # rimandi alle note
        t = re.sub(r"\s+", " ", t).strip()
        w = t.split(" ")
        if len(w) < 60:
            continue
        pezzo = " ".join(w[:parole])
        fine = max(pezzo.rfind(". "), pezzo.rfind("? "), pezzo.rfind("! "), pezzo.rfind(".» "))
        if fine > len(pezzo) * 0.6:
            pezzo = pezzo[:fine + 1]
        # paragrafi di 3-4 frasi, più leggibili
        frasi = re.split(r"(?<=[.?!»])\s+(?=[A-ZÀ-Ý«“])", pezzo)
        par, cur = [], []
        for f in frasi:
            cur.append(f)
            if len(" ".join(cur)) > 420:
                par.append(" ".join(cur)); cur = []
        if cur:
            par.append(" ".join(cur))
        out[chiave(d)] = {"paragrafi": par, "file": d["f"], "pagine": len(d["p"])}
    return out


def lezioni_per_pagina(uso: dict) -> dict[tuple, dict]:
    """Per ogni lezione (anno, uda, titolo): le sue voci e le lezioni vicine (per le pagine statiche)."""
    L = uso["lezioni"]
    out: dict[tuple, dict] = defaultdict(lambda: {"voci": [], "vicini": []})
    for v in uso["voci"]:
        for li, n, *_ in v["l"]:
            out[tuple(L[li][:3])]["voci"].append((v, n))
    for li, vv in uso["vicini"].items():
        out[tuple(L[int(li)][:3])]["vicini"] = [
            (L[lj], [uso["voci"][x]["n"] for x in comuni]) for lj, comuni in vv if len(L[lj]) == 3]
    for k in out:
        out[k]["voci"].sort(key=lambda x: -x[1])
    return out


if __name__ == "__main__":
    sys.path.insert(0, str(Path(__file__).parent))
    import genera
    _, _, _, lezioni, extra = genera.raccogli()
    docs, uso, prop = esegui(lezioni, extra)
    L = uso["lezioni"]
    for v in uso["voci"]:
        print(f"{v['n']}: {len(v['l'])} lezioni · " + "; ".join(f"{L[r[0]][2][:40]} ({r[1]})" for r in v["l"][:6]))
    print("\nPROPOSTE:", ", ".join(f"{p['nome']} {p['lezioni']}/{p['volte']}" for p in prop))
