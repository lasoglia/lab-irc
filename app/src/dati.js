/* =====================================================================
   Dati del sito: li scrive il pannello Decap in data/*.json.
   Stessa logica della versione precedente del sito (UDA e lezioni
   "automatiche", tipo di contenuto, percorsi relativi…).
   ===================================================================== */

/* cartella del sito (su GitHub Pages è /lab-irc/) */
const BASE = (() => {
  const p = location.pathname;
  return p.endsWith("/") ? p : p.substring(0, p.lastIndexOf("/") + 1);
})();

export function resolvePath(p) {
  if (!p || p === "#") return p;
  p = String(p);
  if (/^https?:\/\//.test(p)) return p;
  return BASE + p.replace(/^\/+/, "");
}

export const ANNI = [
  { n: "1", rom: "I", nome: "Primo anno", key: "primo" },
  { n: "2", rom: "II", nome: "Secondo anno", key: "secondo" },
  { n: "3", rom: "III", nome: "Terzo anno", key: "terzo" },
  { n: "4", rom: "IV", nome: "Quarto anno", key: "quarto" },
  { n: "5", rom: "V", nome: "Quinto anno", key: "quinto" },
];

/* il colore dell'anno significa solo "anno": chi non ha anno resta neutro */
export const colore = (n) => (annoMeta(n) ? `var(--lab-anno-${n})` : "var(--lab-muted)");

export function annoMeta(n) {
  return ANNI.find((a) => a.n === String(n));
}

const SAMPLE = {
  site: {
    titolo: "Lab IRC",
    sottotitolo: "Il laboratorio di Religione",
    intro: "Uno spazio per fare lezione in modo vivo: slide, documenti, video e strumenti interattivi, organizzati per anno di corso.",
    pensiero: "Le grandi domande meritano risposte all'altezza.",
    email: "",
    autore: "Matteo Sestili",
  },
  anni: {},
  materiali: [],
  strumenti: [],
  video: [],
};

async function load(p, fb) {
  try {
    const r = await fetch(resolvePath(p), { cache: "no-store" });
    if (!r.ok) throw 0;
    return await r.json();
  } catch (e) {
    return fb;
  }
}

/* i JSON del pannello hanno la forma {chiave:[...]}: li riduciamo ad array */
function pickArr(x, key) {
  if (Array.isArray(x)) return x;
  if (x && Array.isArray(x[key])) return x[key];
  return [];
}

export const normT = (s) => String(s == null ? "" : s).trim().toLowerCase();

export function ytId(u) {
  if (!u) return "";
  u = String(u).trim();
  if (/^[\w-]{11}$/.test(u)) return u;
  const m = u.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
  return m ? m[1] : "";
}

/* "/uploads/i-1-1-credo-non-so_fascicolo.pdf" → "I 1 1 credo non so fascicolo" */
function nomeDaFile(p) {
  if (/^https?:\/\//i.test(String(p || ""))) {
    try { return new URL(p).hostname.replace(/^www\./, ""); } catch (e) { /* prosegue */ }
  }
  let base = String(p || "").split(/[?#]/)[0].split("/").pop() || "";
  try { base = decodeURIComponent(base); } catch (e) { /* nome con % strani: resta com'è */ }
  base = base.replace(/\.[a-z0-9]+$/i, "");
  const t = base.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
  return t ? t.charAt(0).toUpperCase() + t.slice(1) : "Materiale";
}

function tipoDaFile(file, link) {
  const f = String(file || "").toLowerCase().split(/[?#]/)[0];
  if (/\.html?$/.test(f)) return "Artefatto interattivo";
  if (/\.(pptx?|odp|key)$/.test(f)) return "Slide";
  if (f) return "Documento/PDF";
  return link ? "Link" : "Documento/PDF";
}

function byOrdine(a, b) {
  const oa = a.ordine == null || a.ordine === "" ? 999 : +a.ordine;
  const ob = b.ordine == null || b.ordine === "" ? 999 : +b.ordine;
  return oa - ob || String(a.titolo).localeCompare(String(b.titolo), "it");
}

export async function caricaDati() {
  const [site, anni, mat, str, vid, uda, lez] = await Promise.all([
    load("data/site.json", SAMPLE.site),
    load("data/anni.json", SAMPLE.anni),
    load("data/materiali.json", SAMPLE.materiali),
    load("data/strumenti.json", SAMPLE.strumenti),
    load("data/video.json", SAMPLE.video),
    load("data/uda.json", []),
    load("data/lezioni.json", []),
  ]);
  const MAT = pickArr(mat, "materiali");
  const STR = pickArr(str, "strumenti");
  const VID = pickArr(vid, "video");
  const UDA = pickArr(uda, "uda");
  const LEZ = pickArr(lez, "lezioni");

  /* i file caricati dentro una lezione ("File della lezione") diventano
     materiali di quella lezione: anno e UDA sono quelli della lezione */
  const DALLE_LEZIONI = [];
  LEZ.forEach((l) => {
    (Array.isArray(l.materiali) ? l.materiali : []).forEach((m) => {
      if (!m || (!m.file && !m.link)) return;
      DALLE_LEZIONI.push({
        ...m,
        anno: l.anno,
        uda: l.uda,
        lezione: l.titolo,
        titolo: String(m.titolo || "").trim() || nomeDaFile(m.file || m.link),
        tipo: m.tipo || tipoDaFile(m.file, m.link),
      });
    });
  });

  const ITEMS = [
    ...MAT.map((x) => ({ kind: "materiale", ...x })),
    ...DALLE_LEZIONI.map((x) => ({ kind: "materiale", ...x })),
    ...STR.map((x) => ({ kind: "strumento", tipo: "Strumento", ...x })),
    ...VID.map((x) => ({ kind: "video", tipo: "Video", ...x })),
  ];

  /* se un contenuto indica la lezione ma non l'UDA, l'UDA si deduce dalla lezione */
  ITEMS.forEach((it) => {
    if (normT(it.lezione) && !normT(it.uda)) {
      const L = LEZ.find((l) => String(l.anno) === String(it.anno) && normT(l.titolo) === normT(it.lezione));
      if (L && L.uda) it.uda = L.uda;
    }
  });

  return { SITE: { ...SAMPLE.site, ...(site || {}) }, ANNIDESC: anni || {}, UDA, LEZ, ITEMS };
}

export const matchAnno = (item, n) => String(item.anno) === String(n);

export function descAnno(D, n) {
  const a = annoMeta(n);
  return (a && D.ANNIDESC[a.key]) || D.ANNIDESC[n] || "";
}

export const itemsAnno = (D, n) => D.ITEMS.filter((it) => matchAnno(it, n));

/* UDA di un anno: quelle del pannello + cartelle "automatiche" citate dai contenuti */
export function udaForYear(D, n) {
  const list = D.UDA.filter((u) => String(u.anno) === String(n)).slice();
  const titles = new Set(list.map((u) => normT(u.titolo)));
  D.ITEMS.forEach((it) => {
    const t = normT(it.uda);
    if (matchAnno(it, n) && t && !titles.has(t)) {
      titles.add(t);
      list.push({ titolo: String(it.uda).trim(), anno: String(n) });
    }
  });
  return list.sort(byOrdine);
}

export const itemsInUda = (D, n, titolo) =>
  D.ITEMS.filter((it) => matchAnno(it, n) && normT(it.uda) === normT(titolo));

export function lezioniForUda(D, n, udaTitolo) {
  const list = D.LEZ.filter((l) => String(l.anno) === String(n) && normT(l.uda) === normT(udaTitolo)).slice();
  const titles = new Set(list.map((l) => normT(l.titolo)));
  D.ITEMS.forEach((it) => {
    const t = normT(it.lezione);
    if (matchAnno(it, n) && normT(it.uda) === normT(udaTitolo) && t && !titles.has(t)) {
      titles.add(t);
      list.push({ titolo: String(it.lezione).trim(), anno: String(n), uda: udaTitolo });
    }
  });
  return list.sort(byOrdine);
}

export const itemsInLezione = (D, n, udaT, lezT) =>
  D.ITEMS.filter((it) => matchAnno(it, n) && normT(it.uda) === normT(udaT) && normT(it.lezione) === normT(lezT));

export function trovaUda(D, n, titolo) {
  return D.UDA.find((x) => String(x.anno) === String(n) && normT(x.titolo) === normT(titolo)) || { titolo: String(titolo || "").trim() };
}

export function trovaLezione(D, n, udaT, lezT) {
  return (
    D.LEZ.find((x) => String(x.anno) === String(n) && normT(x.uda) === normT(udaT) && normT(x.titolo) === normT(lezT)) ||
    { titolo: String(lezT || "").trim() }
  );
}

/* Cosa fa il pulsante di un contenuto. Un artefatto .html si apre DENTRO il
   sito (visore in sandbox); i link esterni in una nuova scheda (molti siti
   bloccano gli iframe); gli altri file si scaricano. */
export function azione(it) {
  const fileStr = String(it.file || "");
  const isHtml = /\.html?($|\?|#)/i.test(fileStr);
  const isArt = it.kind === "strumento" || it.tipo === "Artefatto interattivo" || it.tipo === "Lezione interattiva" || isHtml;
  const raw = it.file || it.link || "";
  const href = raw && raw !== "#" ? resolvePath(raw) : "";

  if (it.kind === "video") {
    const id = ytId(it.youtube);
    return id ? { tipo: "video", id, testo: "Guarda ▶" } : { tipo: "nessuna", testo: "Video non valido" };
  }
  if (isArt && it.file) return { tipo: "visore", href, testo: "Apri" };
  if (isArt && href) {
    if (/^https?:\/\//.test(href)) return { tipo: "esterno", href, testo: "Apri ↗" };
    return { tipo: "visore", href, testo: "Apri" };
  }
  if (it.file) return { tipo: "esterno", href, testo: "Scarica" };
  if (href) return { tipo: "esterno", href, testo: "Apri ↗" };
  return { tipo: "nessuna", testo: "Presto disponibile" };
}

/* colore dell'etichetta per tipo di contenuto (come nel modello) */
export function varianteBadge(it) {
  if (it.kind === "video") return "rosa";
  if (it.kind === "strumento") return "viola";
  const t = normT(it.tipo);
  if (t === "slide") return "ciano";
  if (t.includes("pdf") || t.includes("documento")) return "verde";
  if (t.includes("artefatto") || t.includes("interattiv")) return "viola";
  if (t === "link") return "ambra";
  return "verde";
}

/* =====================================================================
   PERCORSO — le "orme" dello studente, SOLO in questo browser.
   Niente account, niente server, niente orari o conteggi di visite:
   la lista dei materiali aperti e l'ultima lezione/unità visitata.
   Se il browser non permette di salvare, si ricorda solo finché la
   pagina resta aperta (come una prima visita). In modalità LIM (lavagna
   di classe) non si legge e non si scrive nulla.
   ===================================================================== */
const CHIAVE_PERCORSO = "percorso_lab";
const VUOTO = { v: 1, aperti: [], ultima: null };
const MAX_APERTI = 377;

function leggiPercorso() {
  try {
    const x = JSON.parse(localStorage.getItem(CHIAVE_PERCORSO) || "null");
    if (x && x.v === 1 && Array.isArray(x.aperti)) {
      return { v: 1, aperti: x.aperti.filter((k) => typeof k === "string").slice(-MAX_APERTI), ultima: x.ultima && typeof x.ultima.hash === "string" ? x.ultima : null };
    }
  } catch (e) { /* storage bloccato o dati rovinati: si riparte vuoti */ }
  return VUOTO;
}

let statoPercorso = leggiPercorso();
const limAttivo = () => document.documentElement.hasAttribute("data-lim");

function salvaPercorso(n) {
  statoPercorso = n;
  try { localStorage.setItem(CHIAVE_PERCORSO, JSON.stringify(n)); } catch (e) { /* resta in memoria */ }
  window.dispatchEvent(new Event("lab:percorso"));
}

export const percorso = () => statoPercorso;

export function iscriviPercorso(f) {
  const su = (e) => {
    if (e.type === "storage") {
      if (e.key !== CHIAVE_PERCORSO && e.key !== null) return;
      statoPercorso = leggiPercorso();
    }
    f();
  };
  window.addEventListener("lab:percorso", su);
  window.addEventListener("storage", su);
  return () => { window.removeEventListener("lab:percorso", su); window.removeEventListener("storage", su); };
}

/* chiave stabile di un contenuto (non dipende dall'ordine nella lista) */
export const chiaveItem = (it) =>
  [it.kind || "", it.anno || "", normT(it.uda), normT(it.lezione), normT(it.file || it.link || it.youtube || it.titolo)].join("|");

export function segnaAperto(it) {
  if (limAttivo()) return;
  const k = chiaveItem(it);
  if (statoPercorso.aperti.includes(k)) return;
  salvaPercorso({ ...statoPercorso, aperti: [...statoPercorso.aperti, k].slice(-MAX_APERTI) });
}

export function segnaUltima(u) {
  if (limAttivo() || !u || !u.hash) return;
  if (statoPercorso.ultima && statoPercorso.ultima.hash === u.hash) return;
  salvaPercorso({ ...statoPercorso, ultima: { hash: u.hash, anno: String(u.anno), uda: u.uda || "", lezione: u.lezione || "", titolo: u.titolo || "" } });
}

export function dimenticaPercorso() {
  try { localStorage.removeItem(CHIAVE_PERCORSO); } catch (e) { /* niente */ }
  statoPercorso = VUOTO;
  window.dispatchEvent(new Event("lab:percorso"));
}

export const contaAperti = (items, set) => items.reduce((n, it) => n + (set.has(chiaveItem(it)) ? 1 : 0), 0);

/* posizione di un elemento in una lista ordinata (lezioni di un'unità, unità di un anno) */
export function vicini(list, titolo) {
  const i = list.findIndex((x) => normT(x.titolo) === normT(titolo));
  return { pos: i + 1, tot: list.length, prec: i > 0 ? list[i - 1] : null, succ: i >= 0 && i < list.length - 1 ? list[i + 1] : null };
}

export const slug = (s) => encodeURIComponent(String(s || "").trim());
export const hrefUda = (n, uda) => `#anno/${n}/uda/${slug(uda)}`;
export const hrefLezione = (n, uda, lez) => `#anno/${n}/uda/${slug(uda)}/lezione/${slug(lez)}`;

/* ordine "naturale" di una lezione: prima l'attività interattiva (aggancio),
   poi slide/video/link (scoperta), infine documenti e PDF (ripasso).
   L'ordine scelto dal docente (campo "ordine", "in evidenza") vince sempre. */
export function ruolo(it) {
  const t = normT(it.tipo);
  if (it.kind === "strumento" || azione(it).tipo === "visore" || /interattiv|artefatto/.test(t)) return 0;
  if (it.kind === "video" || t === "slide" || t === "link") return 1;
  return 2;
}

export function ordinaPercorso(items) {
  const ord = (x) => (x.ordine === "" || x.ordine == null || isNaN(+x.ordine) ? Infinity : +x.ordine);
  return items
    .map((it, i) => ({ it, i }))
    .sort((a, b) => ord(a.it) - ord(b.it) || (b.it.in_evidenza ? 1 : 0) - (a.it.in_evidenza ? 1 : 0) || ruolo(a.it) - ruolo(b.it) || a.i - b.i)
    .map((x) => x.it);
}

/* ---------- ricerca: senza accenti, anche su unità e lezioni ---------- */
export const norm = (s) => String(s == null ? "" : s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

export function cerca(D, q) {
  const k = norm(q);
  const ha = (...v) => v.some((x) => norm(x).includes(k));
  const items = D.ITEMS.filter((it) => ha(it.titolo, it.descrizione, it.tipo, it.uda, it.lezione));
  const cartelle = [];
  ANNI.forEach((a) => {
    udaForYear(D, a.n).forEach((u) => {
      if (ha(u.titolo, u.descrizione)) cartelle.push({ tipo: "uda", titolo: u.titolo, anno: a.n, href: hrefUda(a.n, u.titolo) });
      lezioniForUda(D, a.n, u.titolo).forEach((l) => {
        if (ha(l.titolo, l.descrizione)) cartelle.push({ tipo: "lezione", titolo: l.titolo, uda: u.titolo, anno: a.n, href: hrefLezione(a.n, u.titolo, l.titolo) });
      });
    });
  });
  return { cartelle, items };
}
