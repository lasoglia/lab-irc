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

export const colore = (n) => (annoMeta(n) ? `var(--lab-anno-${n})` : "var(--lab-viola)");

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
