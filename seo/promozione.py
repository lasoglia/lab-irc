#!/usr/bin/env python3
"""
seo/promozione.py — Kit social del Lab IRC.

PERCHÉ ESISTE
-------------
Per far conoscere il sito servono post pronti per ogni lezione. Questo script
chiede a Claude, per ogni lezione, i testi per la Pagina Facebook, Instagram,
WhatsApp e Telegram, e li raccoglie in una pagina comoda da aprire dal
telefono, con il pulsante «Copia»:

  promozione/index.html            la pagina del kit (nascosta a Google)
  promozione/cartoline.json        elenco delle cartoline da disegnare
  data/promozione.json             i testi, che fanno da cache

Le cartoline (immagini per Instagram) le disegna seo/cartoline.mjs.
La pubblicazione automatica la fanno seo/telegram.py (Telegram) e
seo/meta.py (Pagina Facebook e Instagram).

Come per le pagine SEO, una lezione viene riscritta SOLO se il suo testo
cambia. I link li aggiunge lo script, non Claude: così sono sempre giusti.

USO
---
  pip install anthropic pypdf
  export ANTHROPIC_API_KEY=sk-ant-...
  python seo/promozione.py                 tutto
  python seo/promozione.py --senza-ia      solo la pagina, nessuna chiamata API
  python seo/promozione.py --forza         riscrive anche i testi in cache

Per correggere a mano un testo: modificalo in data/promozione.json e metti
"bloccato": true in quella voce. Lo script non la sovrascriverà più.
"""

from __future__ import annotations

import argparse
import datetime as dt
import hashlib
import json
import os
import sys
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import genera as g  # noqa: E402  (stesse letture dei dati delle pagine SEO)

MODELLO = os.environ.get("PROMO_MODELLO", "claude-opus-5-5")
VERSIONE = "3"                      # cambiala per far riscrivere tutti i testi (3: tono più leggero)
PARALLELI = int(os.environ.get("PROMO_PARALLELI", "6"))   # lezioni scritte contemporaneamente
CHIAVE_SITO = "_sito"               # la voce con il post di presentazione del sito
COLORI_ANNO = {"1": "#FF7A59", "2": "#4FB0FF", "3": "#A78BFA", "4": "#FB7BB5", "5": "#FBBF24"}
MASCOTTE = {"1": "1-semino", "2": "2-ichthy", "3": "3-navicella", "4": "4-bussolina", "5": "5-terra"}


# --------------------------------------------------------------------------
# 1. Testi con Claude
# --------------------------------------------------------------------------
SCHEMA_POST = {
    "type": "object",
    "properties": {
        "frase_cartolina": {"type": "string"},
        "facebook": {"type": "string"},
        "instagram": {"type": "string"},
        "hashtag": {"type": "array", "items": {"type": "string"}},
        "whatsapp": {"type": "string"},
        "telegram": {"type": "string"},
        "carosello": {"type": "array", "items": {
            "type": "object",
            "properties": {"titolo": {"type": "string"}, "testo": {"type": "string"}},
            "required": ["titolo", "testo"], "additionalProperties": False}},
    },
    "required": ["frase_cartolina", "facebook", "instagram", "hashtag", "whatsapp", "telegram", "carosello"],
    "additionalProperties": False,
}

ISTRUZIONI = """Scrivi i post social del Lab IRC, il sito di Matteo Sestili, docente di \
Religione Cattolica nella scuola secondaria di secondo grado. Il sito raccoglie lezioni \
interattive, fascicoli e giochi di verifica per le cinque classi, consultabili online \
gratuitamente. Chi legge i post è soprattutto un collega docente di religione che cerca \
materiali per le sue classi; a volte uno studente o un genitore.

Ricevi il testo di una lezione (oppure la presentazione del sito) e restituisci, nel \
formato JSON richiesto:
- frase_cartolina: massimo 90 caratteri. Una frase che dice l'argomento della lezione, \
da stampare sotto il titolo nell'immagine per Instagram. Niente virgolette.
- facebook: 500-900 caratteri, per la Pagina Facebook del Lab IRC. Si apre con una \
domanda o un'immagine concreta presa dalla lezione, poi dice che cosa contiene la \
lezione e come la si può usare in classe. Al massimo due emoji.
- instagram: 500-1000 caratteri, didascalia per Instagram. Più breve e visiva, con \
paragrafi corti. Chiude invitando a trovare il link nella bio. Al massimo tre emoji. \
Senza hashtag (vanno nel campo apposito).
- hashtag: da 3 a 5 hashtag in italiano, senza il simbolo #, senza spazi; sempre \
religionecattolica e irc, poi l'argomento e la classe (es. classeprima).
- whatsapp: 200-400 caratteri, messaggio da collega a collega per un gruppo di docenti. \
Tono diretto e cordiale, in prima persona («ho preparato…»). Al massimo un'emoji.
- telegram: 300-600 caratteri, per il canale Telegram del Lab IRC. Una riga iniziale \
che fa da titolo, poi due o tre frasi sul contenuto. Al massimo due emoji.
- carosello: esattamente 5 schede per un carosello di Instagram, da sfogliare sul \
telefono. Ogni scheda ha un titolo (massimo 40 caratteri) e un testo (massimo 190 \
caratteri) che si regge da solo. 1) La domanda da cui parte la lezione. 2, 3, 4) Le \
tre idee chiave, una per scheda, concrete. 5) Come la si usa in classe (che cosa fanno \
gli studenti). Per la presentazione del sito: che cos'è il Lab, che cosa c'è, per chi è, \
come è fatto, come si usa. Niente emoji nelle schede.

Regole vincolanti:
- Usa solo ciò che il testo contiene davvero: niente contenuti, autori, citazioni o \
attività inventati.
- Non scrivere indirizzi web, link o «clicca qui»: il link lo aggiunge il sistema in fondo.
- Nessun nome di scuola, città, studenti o anno scolastico.
- Niente toni pubblicitari, superlativi, urgenze («affrettati», «non perdere») o \
punti esclamativi a raffica: registro sobrio, caldo e preciso, da insegnante.
- Rispetto per la fede e per chi non crede: si propone, non si impone.
- Italiano corretto, con accenti e apostrofi normali."""


TONO = """Tono (vale più di ogni altra indicazione sul registro): leggero e simpatico, \
come un prof che piace ai ragazzi, ma con misura. Immagini concrete e quotidiane, una \
curiosità che sorprende, al massimo una battuta garbata per post: deve strappare un \
sorriso, non una risata forzata. Niente esagerazioni, iperboli, giochi di parole tirati \
o entusiasmo sopra le righe; poche emoji. Mai serioso, pesante o da predica. L'umorismo \
non prende mai in giro persone, fedi o chi non crede, e i fatti restano esatti. Restano \
vietati i toni pubblicitari e le urgenze."""


# Il tono della versione 3, usato solo nella firma dei testi in cache: così il tono nuovo vale
# per i testi nuovi, ma quelli già scritti (e magari già approvati dagli agenti) non si
# riscrivono di nascosto. Con il rifacimento dei post (VERSIONE 4) questa riga se ne va.
TONO_FIRMA = """Tono (vale più di ogni altra indicazione sul registro): leggero, simpatico e \
vivace, come un prof che piace ai ragazzi. Immagini concrete e quotidiane, qualche \
battuta bonaria, una sorpresa, domande che incuriosiscono: mai serioso, pesante o da \
predica. L'umorismo non prende mai in giro persone, fedi o chi non crede, e i fatti \
restano esatti. Restano vietati i toni pubblicitari e le urgenze."""


REDATTORE = """Sei il caporedattore dei social del Lab IRC. Ricevi le istruzioni date \
all'autore, il materiale di partenza e la BOZZA dei post in JSON. Rileggila con occhio \
severo e restituisci la versione definitiva, nello stesso formato JSON:
- attacco: la prima riga di ogni post deve fermare chi scorre, con un'immagine concreta \
o una domanda vera presa dal materiale, non con una formula generica;
- fedeltà: togli tutto ciò che il materiale non contiene (autori, citazioni, attività);
- chiarezza: frasi brevi, parole semplici, niente gergo da addetti ai lavori;
- ritmo: niente ripetizioni tra un canale e l'altro, ognuno con il suo tono;
- leggerezza: se un testo è serioso o pesante, rendilo più simpatico e vivo, senza perdere precisione;
- carosello e testi brevi: ogni scheda si legge in tre secondi sul telefono;
- rispetta tutte le lunghezze e le regole delle istruzioni.
Se una parte è già ottima, lasciala com'è."""


def chiama_claude(client, sistema: str, messaggio: str, schema: dict, sforzo: str,
                  max_token: int = 16000) -> tuple:
    """Una chiamata con risposta in JSON garantito; restituisce (dati, risposta).
    In streaming, così anche le risposte lunghe (i disegni) non vanno in timeout."""
    with client.beta.messages.stream(
        model=MODELLO,
        max_tokens=max_token,
        # Le istruzioni sono identiche per ogni post: le mettiamo in cache
        system=[{"type": "text", "text": sistema, "cache_control": {"type": "ephemeral"}}],
        output_config={"effort": sforzo, "format": {"type": "json_schema", "schema": schema}},
        # Se il modello rifiuta per un falso allarme, il server riprova su un altro modello
        betas=["server-side-fallback-2026-07-01"],
        fallbacks="default",
        messages=[{"role": "user", "content": messaggio}],
    ) as flusso:
        risposta = flusso.get_final_message()
    if risposta.stop_reason != "end_turn":
        raise RuntimeError(f"Risposta incompleta ({risposta.stop_reason})")
    testo_json = next((b.text for b in risposta.content if b.type == "text"), "")
    return json.loads(testo_json), risposta


def scrivi_e_rivedi(client, istruzioni: str, messaggio: str, schema: dict) -> dict:
    """L'autore scrive la bozza, il caporedattore la rilegge e la migliora."""
    bozza, r1 = chiama_claude(client, istruzioni, messaggio, schema, "medium")
    finale, r2 = chiama_claude(
        client, REDATTORE,
        f"<istruzioni_autore>\n{istruzioni}\n</istruzioni_autore>\n\n"
        f"<materiale>\n{messaggio}\n</materiale>\n\n"
        f"<bozza>\n{json.dumps(bozza, ensure_ascii=False, indent=1)}\n</bozza>",
        schema, "high")
    if "hashtag" in finale:
        finale["hashtag"] = [h.lstrip("#").replace(" ", "") for h in finale["hashtag"] if h.strip("# ")]
    finale["origine"] = r2.model
    finale["token"] = {"input": r1.usage.input_tokens + r2.usage.input_tokens,
                       "output": r1.usage.output_tokens + r2.usage.output_tokens}
    return finale


def messaggio_lezione(l: dict, uda_desc: str, sintesi: str, testo: str) -> str:
    classe = g.NOMI_ANNO.get(str(l.get("anno")), l.get("anno"))
    return (f"Classe: {classe} (secondaria di secondo grado)\n"
            f"Unità didattica: {l.get('uda')} — {uda_desc}\n"
            f"Titolo della lezione: {l.get('titolo')}\n"
            f"Sintesi già scritta per Google: {sintesi}\n\n"
            f"<testo_lezione>\n{testo}\n</testo_lezione>")


def messaggio_sito(sito: dict, anni: dict, uda: list) -> str:
    righe = []
    for n, nome in enumerate(["primo", "secondo", "terzo", "quarto", "quinto"], start=1):
        titoli = [u.get("titolo", "") for u in sorted(uda, key=lambda u: u.get("ordine", 99))
                  if str(u.get("anno")) == str(n)]
        righe.append(f"- Classe {g.NOMI_ANNO[str(n)]}: {anni.get(nome, '')} Unità: {'; '.join(titoli)}")
    return ("Questa volta non è una lezione: scrivi i post di PRESENTAZIONE del sito intero, "
            "per farlo conoscere a chi non lo ha mai visto. La frase_cartolina presenta il sito.\n\n"
            f"Nome: {sito.get('titolo', 'Lab IRC')} — {sito.get('sottotitolo', '')}\n"
            f"Presentazione: {sito.get('intro', '')}\n"
            f"Chi lo cura: {sito.get('bio', '')}\n"
            "Che cosa c'è, classe per classe:\n" + "\n".join(righe))


def aggiorna_testi(sito, anni, uda, lezioni, usa_ia: bool, forza: bool) -> dict:
    percorso = g.RADICE / "data" / "promozione.json"
    cache = json.loads(percorso.read_text(encoding="utf-8")) if percorso.exists() else {}
    seo = json.loads((g.RADICE / "data" / "seo.json").read_text(encoding="utf-8")) \
        if (g.RADICE / "data" / "seo.json").exists() else {}
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

    # (chiave, testo da cui dipende l'impronta, messaggio per Claude)
    lavori = [(CHIAVE_SITO, messaggio_sito(sito, anni, uda), None)]
    for l in lezioni:
        k = g.chiave_lezione(l)
        testo = g.testo_lezione(l)
        if not testo:
            continue       # senza testo non si possono scrivere post fedeli
        uda_desc = desc_uda.get((l.get("anno"), l.get("uda")), "")
        lavori.append((k, testo + uda_desc,
                       messaggio_lezione(l, uda_desc, seo.get(k, {}).get("sintesi", ""), testo)))

    da_scrivere = []
    for k, base, messaggio in lavori:
        impronta = hashlib.sha256((base + MODELLO + VERSIONE + ISTRUZIONI + TONO_FIRMA).encode()).hexdigest()[:16]
        voce = cache.get(k)
        if voce and voce.get("bloccato"):
            continue
        if voce and voce.get("impronta") == impronta and not forza:
            continue
        if client:      # senza chiave i testi già scritti restano; quelli nuovi aspettano
            da_scrivere.append((k, impronta, messaggio or base))

    def scrivi(lavoro):
        k, impronta, messaggio = lavoro
        try:
            return k, impronta, scrivi_e_rivedi(client, ISTRUZIONI + "\n\n" + TONO, messaggio, SCHEMA_POST), None
        except Exception as err:   # un errore su una lezione non blocca le altre
            return k, impronta, None, err

    nuove, tok_in, tok_out = 0, 0, 0
    # più lezioni insieme: con decine di lezioni da riscrivere si finisce in minuti, non in ore
    with ThreadPoolExecutor(max_workers=PARALLELI) as gruppo:
        for k, impronta, dati, err in gruppo.map(scrivi, da_scrivere):
            if err:
                print(f"  ✗ {k}: {err}")
                continue
            dati["impronta"] = impronta
            cache[k] = dati
            nuove += 1
            tok_in += dati["token"]["input"]
            tok_out += dati["token"]["output"]
            print(f"  ✓ {k}", flush=True)

    # Le lezioni eliminate dal pannello spariscono anche dal kit
    valide = {CHIAVE_SITO} | {g.chiave_lezione(l) for l in lezioni}
    cache = {k: v for k, v in sorted(cache.items()) if k in valide}
    percorso.write_text(json.dumps(cache, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    if nuove:
        # Prezzo di listino di Opus 5.5 al 10/2026: 4 $ input, 20 $ output per milione di token
        costo = tok_in / 1e6 * 4 + tok_out / 1e6 * 20
        print(f"Kit social: {nuove} voci scritte · {tok_in} token in, {tok_out} out · circa {costo:.2f} $")
    return cache


# --------------------------------------------------------------------------
# 2. Ordine di pubblicazione: si alternano le classi, nell'ordine del corso
# --------------------------------------------------------------------------
def ordine_pubblicazione(uda: list, lezioni: list) -> list[dict]:
    ordine_uda = {(str(u.get("anno")), u.get("titolo")): u.get("ordine", 99) for u in uda}
    per_anno: dict[str, list] = {}
    for l in sorted(lezioni, key=lambda l: (str(l.get("anno")),
                                            ordine_uda.get((str(l.get("anno")), l.get("uda")), 99),
                                            l.get("ordine", 99))):
        per_anno.setdefault(str(l.get("anno")), []).append(l)
    sequenza = []
    while any(per_anno.values()):
        for anno in sorted(per_anno):
            if per_anno[anno]:
                sequenza.append(per_anno[anno].pop(0))
    return sequenza


def url_lezione(l: dict) -> str:
    return f"{g.URL_SITO}/lezioni/{l.get('anno')}/{g.slug(l.get('uda', ''))}/{g.slug(l['titolo'])}/"


def illustrazioni(chiave: str) -> dict:
    """I disegni delle schede del carosello (seo/illustrazioni.py), se ci sono."""
    p = g.RADICE / "data" / "illustrazioni.json"
    return (json.loads(p.read_text(encoding="utf-8")) if p.exists() else {}).get(chiave, {})


def nome_cartolina(chiave: str, titolo: str, testi: dict) -> str:
    contenuto = (testi.get("frase_cartolina", "") + json.dumps(testi.get("carosello", []), ensure_ascii=False)
                 + illustrazioni(chiave).get("impronta", "") + "-".join(illustrazioni(chiave).get("file", [])))
    impronta = hashlib.sha256((chiave + titolo + contenuto).encode()).hexdigest()[:8]
    return f"{g.slug(chiave.split('|')[0] + '-' + titolo)[:60]}-{impronta}.png"


def immagini_post(copertina: str, testi: dict) -> list[str]:
    """La copertina e, se c'è il carosello, le sue schede più quella finale con l'invito al sito."""
    base = copertina.removesuffix(".png")
    n = len(testi.get("carosello", []))
    return [copertina] + ([f"{base}-{i}.png" for i in range(2, n + 3)] if n else [])


def voci_kit(sito, uda, lezioni, testi) -> list[dict]:
    """Una voce per post, nell'ordine consigliato: prima la presentazione del sito."""
    voci = []
    t = testi.get(CHIAVE_SITO)
    if t:
        voci.append({"chiave": CHIAVE_SITO, "anno": "", "titolo": "Presentazione del Lab IRC",
                     "uda": "", "url": g.URL_SITO + "/", "testi": t,
                     "cartolina": nome_cartolina(CHIAVE_SITO, "Lab IRC", t)})
    for l in ordine_pubblicazione(uda, lezioni):
        k = g.chiave_lezione(l)
        t = testi.get(k)
        if not t:
            continue
        voci.append({"chiave": k, "anno": str(l.get("anno")), "titolo": l["titolo"],
                     "uda": l.get("uda", ""), "url": url_lezione(l), "testi": t,
                     "cartolina": nome_cartolina(k, l["titolo"], t)})
    return voci


def testo_completo(voce: dict, canale: str) -> str:
    """Il testo da copiare, con il link aggiunto dal sistema."""
    t = voce["testi"]
    if canale == "instagram":
        return t["instagram"].strip() + "\n\n" + " ".join("#" + h for h in t.get("hashtag", [])[:5])
    return t[canale].strip() + "\n\n" + voce["url"]


# --------------------------------------------------------------------------
# 3. La pagina del kit
# --------------------------------------------------------------------------
STILE_KIT = g.STILE + """
.wrap{max-width:820px}
.guida{background:var(--lab-surface);border:1px solid var(--lab-line);border-radius:16px;padding:6px 20px;font-size:15.5px}
.post{border:1px solid var(--lab-line);border-radius:18px;padding:18px 18px 8px;margin:26px 0;background:var(--lab-surface)}
.post header{display:flex;gap:16px;align-items:flex-start}
.post header img{width:96px;border-radius:10px;flex:none;border:1px solid var(--lab-line-soft)}
.post .num{font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase}
.post h2{margin:.15em 0 .2em;font-size:22px}
.post .uda{font-size:14px;color:var(--lab-muted)}
details{border-top:1px solid var(--lab-line-soft);padding:10px 0}
summary{cursor:pointer;font-weight:700;font-size:15.5px}
pre{white-space:pre-wrap;font:15px/1.55 var(--lab-font-body);background:var(--lab-bg);border-radius:12px;padding:12px 14px;margin:10px 0 8px;color:var(--lab-ink)}
.azioni{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:6px}
.azioni button,.azioni a{font:600 14px var(--lab-font-body);border:1px solid var(--lab-line);background:var(--lab-bg);color:var(--lab-ink);border-radius:10px;padding:7px 14px;cursor:pointer;text-decoration:none}
.azioni button.fatto{border-color:var(--lab-ciano);color:var(--lab-ciano)}
.tg{font-size:13.5px;color:var(--lab-muted)}
.strip{display:flex;gap:8px;overflow-x:auto;padding:10px 0 6px}
.strip img{width:120px;height:auto;border-radius:8px;border:1px solid var(--lab-line-soft);display:block}
"""

CANALI = [("facebook", "Pagina Facebook"), ("instagram", "Instagram"),
          ("whatsapp", "WhatsApp"), ("telegram", "Telegram")]

SCRIPT_COPIA = """<script>
document.addEventListener('click',function(ev){var b=ev.target.closest('button[data-copia]');if(!b)return;
var t=document.getElementById(b.dataset.copia).textContent;
function ok(){b.textContent='Copiato ✓';b.classList.add('fatto');setTimeout(function(){b.textContent='Copia';b.classList.remove('fatto')},1800)}
if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(ok,function(){sel(t);ok()})}else{sel(t);ok()}
function sel(x){var a=document.createElement('textarea');a.value=x;document.body.appendChild(a);a.select();try{document.execCommand('copy')}catch(e){}a.remove()}});
</script>"""


def scrivi_pagina(voci: list[dict]):
    e = g.e
    def registro(nome):
        p = g.RADICE / "data" / nome
        return json.loads(p.read_text(encoding="utf-8")) if p.exists() else {}
    telegram, meta = registro("telegram.json"), registro("meta.json")
    # le immagini dei post stanno su Cloudflare R2 (seo/media_r2.py) solo finché servono:
    # nella pagina si mostrano quelle che ci sono, gli altri post hanno solo i testi
    import media_r2
    jpg = lambda f: media_r2.url_immagine(f.removesuffix(".png") + ".jpg")
    blocchi = []
    for n, v in enumerate(voci, start=1):
        colore = COLORI_ANNO.get(v["anno"], "var(--lab-oro)")
        classe = f" · Classe {g.NOMI_ANNO[v['anno']]}" if v["anno"] else " · Tutto il sito"
        sezioni = []
        for canale, nome in CANALI:
            ident = f"t{n}-{canale}"
            sezioni.append(
                f'<details><summary>{nome}</summary><pre id="{ident}">{e(testo_completo(v, canale))}</pre>'
                f'<div class="azioni"><button type="button" data-copia="{ident}">Copia</button></div></details>')
        usciti = []
        if v["chiave"] in telegram:
            usciti.append(f"Telegram il {telegram[v['chiave']]}")
        for canale, nome in (("facebook", "Facebook"), ("instagram", "Instagram")):
            if canale in meta.get(v["chiave"], {}):
                usciti.append(f"{nome} il {meta[v['chiave']][canale]}")
        stato_tg = (f'<p class="tg">Pubblicato in automatico: {e(", ".join(usciti))}.</p>'
                    if usciti else "")
        schede = [u for u in (jpg(f) for f in immagini_post(v["cartolina"], v["testi"])) if u]
        carosello = ("" if len(schede) < 2 else
                     '<details><summary>Carosello per Instagram (' + str(len(schede)) + ' immagini)</summary>'
                     '<div class="strip">' + "".join(
                         f'<a href="{e(f)}" download><img src="{e(f)}" alt="Scheda {i}" '
                         f'loading="lazy" width="120" height="150"></a>' for i, f in enumerate(schede, start=1))
                     + '</div></details>')
        blocchi.append(f"""<article class="post">
<header>{f'<img src="{e(jpg(v["cartolina"]))}" alt="" loading="lazy" width="96" height="120">' if jpg(v["cartolina"]) else ""}
<div><div class="num" style="color:{colore}">Post {n} di {len(voci)}{e(classe)}</div>
<h2>{e(v['titolo'])}</h2><div class="uda">{e(v['uda'])}</div>
<div class="azioni" style="margin-top:10px">{f'<a href="{e(jpg(v["cartolina"]))}" download>Scarica la cartolina</a>' if jpg(v["cartolina"]) else ""}
<a href="{e(v['url'])}">Apri la pagina</a></div></div></header>
{carosello}{''.join(sezioni)}{stato_tg}
</article>""")

    corpo = f"""<nav class="bc"><a href="../">Lab IRC</a> › Kit social</nav>
<div class="kicker">Solo per te · pagina nascosta a Google</div>
<h1>Kit social del Lab IRC</h1>
<div class="guida">
<p><b>Come si usa.</b> I post sono già in ordine: si alternano le cinque classi. Un buon ritmo è
<b>due post a settimana</b>, per esempio il lunedì e il giovedì.</p>
<p><b>Telegram, Pagina Facebook e Instagram</b> escono da soli, un post il lunedì e uno il giovedì
(Facebook e Instagram solo quando la chiave di Meta è salvata su GitHub). <b>WhatsApp:</b> copia e incolla
nei gruppi di colleghi, senza mandare lo stesso messaggio a troppi gruppi lo stesso giorno.</p>
<p>Ogni lezione nuova che carichi riceve da sola i suoi post e la sua cartolina.</p>
</div>
{''.join(blocchi) or '<p>I post sono in preparazione: compariranno dopo il prossimo aggiornamento.</p>'}"""

    pagina = f"""<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Kit social · Lab IRC</title>
<link rel="icon" type="image/svg+xml" href="../assets/logo-lab-irc.svg">
<script>try{{var t=localStorage.getItem('tema_lab');if(t)document.documentElement.dataset.tema=t;}}catch(e){{}}</script>
<link rel="stylesheet" href="../design-system/styles.css">
<style>{STILE_KIT}</style>
</head>
<body>
<div class="wrap">
{corpo}
<footer>© Matteo Sestili · Tutti i diritti riservati · <a href="../">Lab IRC</a></footer>
</div>
{SCRIPT_COPIA}
</body>
</html>
"""
    cartella = g.RADICE / "promozione"
    cartella.mkdir(exist_ok=True)
    (cartella / "index.html").write_text(pagina, encoding="utf-8")

    # Elenco per seo/cartoline.mjs (che disegna le immagini), seo/telegram.py e seo/meta.py
    elenco = [{"file": v["cartolina"], "chiave": v["chiave"], "anno": v["anno"],
               "titolo": v["titolo"], "uda": v["uda"], "frase": v["testi"]["frase_cartolina"],
               "classe": g.NOMI_ANNO.get(v["anno"], ""), "colore": COLORI_ANNO.get(v["anno"], ""),
               "mascotte": MASCOTTE.get(v["anno"], ""), "url": v["url"],
               "telegram": testo_completo(v, "telegram"),
               "facebook": testo_completo(v, "facebook"),
               "instagram": testo_completo(v, "instagram"),
               "carosello": v["testi"].get("carosello", []),
               "illustrazioni": [f"promozione/illustrazioni/{f}" if f else ""
                                 for f in illustrazioni(v["chiave"]).get("file", [])],
               "immagini": immagini_post(v["cartolina"], v["testi"])} for v in voci]
    (cartella / "cartoline.json").write_text(
        json.dumps(elenco, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return len(voci)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--senza-ia", action="store_true", help="non chiama l'API di Claude")
    ap.add_argument("--forza", action="store_true", help="riscrive anche i testi già in cache")
    a = ap.parse_args()

    sito, anni, uda, lezioni, _ = g.raccogli()
    testi = aggiorna_testi(sito, anni, uda, lezioni, usa_ia=not a.senza_ia, forza=a.forza)
    n = scrivi_pagina(voci_kit(sito, uda, lezioni, testi))
    print(f"Kit social: {n} post nella pagina promozione/")


if __name__ == "__main__":
    sys.exit(main())
