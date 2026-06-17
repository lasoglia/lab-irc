// Piccoli aiutanti condivisi dalle pagine dell'area verifiche.

// Mette in sicurezza il testo prima di inserirlo nell'HTML (anti-XSS).
export function esc(t) {
  return String(t == null ? "" : t).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

// Crea un elemento con attributi e figli, in modo conciso.
export function el(tag, attrs = {}, ...figli) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") e.className = v;
    else if (k === "html") e.innerHTML = v;
    else if (k.startsWith("on") && typeof v === "function") e.addEventListener(k.slice(2), v);
    else if (v != null && v !== false) e.setAttribute(k, v);
  }
  for (const f of figli.flat()) {
    if (f == null || f === false) continue;
    e.append(f.nodeType ? f : document.createTextNode(f));
  }
  return e;
}

// Mostra un breve messaggio in fondo allo schermo.
let avvisoTimer;
export function avviso(testo, tipo = "info") {
  let box = $("#avviso");
  if (!box) {
    box = el("div", { id: "avviso", role: "status", "aria-live": "polite" });
    document.body.append(box);
  }
  box.textContent = testo;
  box.className = "avviso on " + tipo;
  clearTimeout(avvisoTimer);
  avvisoTimer = setTimeout(() => box.classList.remove("on"), 4000);
}

export function mmss(secondi) {
  secondi = Math.max(0, Math.floor(secondi));
  const m = String(Math.floor(secondi / 60)).padStart(2, "0");
  const s = String(secondi % 60).padStart(2, "0");
  return `${m}:${s}`;
}
