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

// Chiama una Edge Function e restituisce sempre { dati, erroreRete, errore }.
// Quando la funzione risponde con un codice non-2xx, supabase-js mette il
// corpo della risposta in error.context invece che in "data": qui lo
// recuperiamo, così l'utente vede sempre il messaggio specifico del server
// ("Hai già consegnato questa verifica", "Tempo scaduto"...) e non un
// messaggio generico.
export async function invocaFunzione(sb, nome, body) {
  const { data, error } = await sb.functions.invoke(nome, { body });
  if (!error) return { dati: data, erroreRete: false, errore: data?.errore ?? null };
  let corpo = null;
  try { corpo = typeof error.context?.json === "function" ? await error.context.json() : error.context; } catch (_e) {}
  return { dati: corpo, erroreRete: true, errore: corpo?.errore ?? null };
}
