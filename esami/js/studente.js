// =====================================================================
//  Area studente: avvio verifica, svolgimento, timer, autosalvataggio,
//  consegna. Tutto passa dalle Edge Function: il client invia solo le
//  risposte, mai un voto.
// =====================================================================
import { sb, configurato } from "./supabase.js";
import { $, esc, el, avviso, mmss } from "./comune.js";

const main = $("#contenuto");
const barra = $("#barra");

const TOKEN_PUBBLICO = new URLSearchParams(location.search).get("e");
const CHIAVE = "verifica_" + TOKEN_PUBBLICO;

let stato = null;     // { token_consegna, started_at, durata, titolo, domande, risposte, anticheat }
let timer = null;
let autosaveTimer = null;
let salvataggioInSospeso = false;
let consegnato = false;

// ---------------------------------------------------------------------
//  Avvio
// ---------------------------------------------------------------------
function avvio() {
  if (!configurato) {
    main.innerHTML = `<div class="card"><h1>Verifica non disponibile</h1>
      <p>Il sistema non è ancora configurato. Avvisa l'insegnante.</p></div>`;
    return;
  }
  if (!TOKEN_PUBBLICO) {
    main.innerHTML = `<div class="card"><h1>Link non valido</h1>
      <p>Manca il codice della verifica nel link. Chiedi all'insegnante l'indirizzo corretto.</p></div>`;
    return;
  }
  const salvato = leggiSessione();
  if (salvato && salvato.token_consegna && !salvato.consegnato) {
    stato = salvato;
    riprendi();
  } else if (salvato && salvato.consegnato) {
    schermataConsegnata();
  } else {
    mostraInizio();
  }
}

// ---------------------------------------------------------------------
//  Schermata iniziale: codice + classe
// ---------------------------------------------------------------------
function mostraInizio() {
  const form = el("form", { class: "card", style: "max-width:460px;margin:30px auto" },
    el("h1", {}, "Inizia la verifica"),
    el("p", { class: "muted piccolo" }, "Inserisci il tuo codice e la classe. Il codice te lo ha dato l'insegnante."),
    campo("Il tuo codice", el("input", { type: "text", id: "codice", required: true, autocomplete: "off" })),
    campo("Classe", el("input", { type: "text", id: "classe", required: true, placeholder: "es. 3A", autocomplete: "off" })),
    el("details", { style: "margin-top:10px" },
      el("summary", { class: "muted piccolo", style: "cursor:pointer" }, "Nome e cognome (solo se l'insegnante lo richiede)"),
      campo("Nome e cognome", el("input", { type: "text", id: "nome", autocomplete: "off" }))),
    el("div", { class: "azioni" }, el("button", { class: "btn oro", type: "submit" }, "Inizia →")),
    el("p", { class: "nota", id: "msg", hidden: true }),
    el("p", { class: "muted piccolo", style: "margin-top:14px" },
      "I tuoi dati restano sui server europei e servono solo per questa verifica. ",
      el("a", { href: "privacy.html" }, "Informativa privacy"))
  );
  form.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const codice = $("#codice").value.trim();
    const classe = $("#classe").value.trim();
    const nome = $("#nome")?.value.trim();
    if (!codice || !classe) return msg("Inserisci codice e classe.");
    const btn = form.querySelector("button");
    btn.disabled = true; btn.textContent = "Avvio…";
    const { data, error } = await sb.functions.invoke("avvia-verifica", {
      body: { token_pubblico: TOKEN_PUBBLICO, codice_studente: codice, classe, nome_reale: nome },
    });
    if (error || data?.errore) {
      btn.disabled = false; btn.textContent = "Inizia →";
      return msg(data?.errore || "Impossibile avviare la verifica. Riprova.");
    }
    stato = {
      token_consegna: data.token_consegna,
      started_at: data.started_at,
      durata: data.esame.durata_minuti,
      titolo: data.esame.titolo,
      anticheat: data.esame.anticheat,
      domande: data.domande,
      risposte: {},
      consegnato: false,
    };
    salvaSessione();
    riprendi();
  });
  barra.innerHTML = "";
  main.innerHTML = "";
  main.append(form);

  function msg(t) { const m = $("#msg", form); m.hidden = false; m.textContent = t; }
}

// ---------------------------------------------------------------------
//  Svolgimento
// ---------------------------------------------------------------------
function riprendi() {
  renderBarra();
  renderDomande();
  avviaTimer();
  avviaAutosave();
  attivaAnticheat();
  window.addEventListener("beforeunload", (e) => {
    if (!consegnato) { e.preventDefault(); e.returnValue = ""; }
  });
}

// ---------------------------------------------------------------------
//  Anticheat
// ---------------------------------------------------------------------
function attivaAnticheat() {
  // 1. Blocco copia su tutta la pagina
  document.addEventListener("copy", (e) => {
    e.preventDefault();
    avviso("La copia del testo non è consentita durante la verifica.", "err");
  });

  // 2. Blocco incolla su tutta la pagina
  document.addEventListener("paste", (e) => {
    e.preventDefault();
    avviso("L'incolla non è consentito durante la verifica.", "err");
  });

  // 3. Blocco tasto destro (previene copia dal menu contestuale)
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });

  // 4. Blocco scorciatoie tastiera (Ctrl+C, Ctrl+V, Ctrl+A, Ctrl+X)
  document.addEventListener("keydown", (e) => {
    const tasti = ["c", "v", "a", "x"];
    if ((e.ctrlKey || e.metaKey) && tasti.includes(e.key.toLowerCase())) {
      e.preventDefault();
      if (e.key.toLowerCase() === "v") {
        avviso("L'incolla non è consentito durante la verifica.", "err");
      } else if (e.key.toLowerCase() === "c") {
        avviso("La copia del testo non è consentita durante la verifica.", "err");
      }
    }
  });

  // 5. Rilevamento cambio scheda / perdita focus finestra
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && !consegnato) {
      registraEvento("cambio_scheda", { momento: new Date().toISOString() });
      avviso("⚠️ Attenzione: hai cambiato scheda. L'evento è stato registrato.", "err");
    }
  });

  // 6. Rilevamento finestra minimizzata o perdita focus
  window.addEventListener("blur", () => {
    if (!consegnato) {
      registraEvento("perdita_focus", { momento: new Date().toISOString() });
    }
  });
}

// Invia l'evento anticheat a Supabase
async function registraEvento(tipo, dettagli = {}) {
  if (!stato?.token_consegna) return;
  try {
    // Recuperiamo prima l'id della consegna tramite il token
    const { data: cons } = await sb
      .from("consegne")
      .select("id")
      .eq("token_consegna", stato.token_consegna)
      .single();
    if (!cons?.id) return;
    await sb.from("eventi_anticheat").insert({
      consegna_id: cons.id,
      tipo,
      dettagli,
    });
  } catch (_e) {
    // Silenzioso: non blocchiamo la verifica per un errore di logging
  }
}

// ---------------------------------------------------------------------
//  Render barra e domande
// ---------------------------------------------------------------------
function renderBarra() {
  barra.innerHTML = "";
  const b = el("div", { class: "barra-studente" },
    el("b", {}, esc(stato.titolo)),
    el("span", { class: "spazio" }),
    el("span", { class: "salvataggio", id: "statoSalv" }, "Salvato"),
    el("span", { class: "timer", id: "timer" }, "--:--"));
  barra.append(b);
}

function renderDomande() {
  main.innerHTML = "";
  const cont = el("div", {});
  stato.domande.forEach((d, i) => cont.append(renderDomanda(d, i)));
  cont.append(el("div", { class: "azioni", style: "margin-top:20px" },
    el("button", { class: "btn oro", id: "btnConsegna", onclick: confermaConsegna }, "Consegna la verifica")));
  main.append(cont);
}

function renderDomanda(d, i) {
  const blocco = el("div", { class: "domanda" },
    el("div", { class: "num" }, `Domanda ${i + 1} di ${stato.domande.length}`),
    el("div", { class: "testo", style: "user-select:none" }, d.testo));

  if (d.tipo === "scelta_multipla") {
    (d.opzioni || []).forEach((o, j) => {
      const sceltaSalvata = stato.risposte[d.id]?.indice;
      const riga = el("label", { class: "opzione" + (sceltaSalvata === j ? " scelta" : "") },
        el("input", { type: "radio", name: "d" + d.id, value: j, checked: sceltaSalvata === j }),
        el("span", { style: "user-select:none" }, o));
      riga.querySelector("input").addEventListener("change", () => {
        stato.risposte[d.id] = { indice: j };
        main.querySelectorAll(`[name="d${d.id}"]`).forEach((r) => r.closest(".opzione").classList.remove("scelta"));
        riga.classList.add("scelta");
        segnaDaSalvare();
      });
      blocco.append(riga);
    });
  } else {
    // Risposta aperta in STAMPATELLO MAIUSCOLO
    const ta = el("textarea", { class: "maiuscolo", placeholder: "SCRIVI QUI LA TUA RISPOSTA", "aria-label": "Risposta" },
      stato.risposte[d.id]?.testo || "");
    ta.addEventListener("input", () => {
      const ini = ta.selectionStart, fin = ta.selectionEnd;
      const su = ta.value.toUpperCase();
      if (su !== ta.value) { ta.value = su; ta.setSelectionRange(ini, fin); }
      stato.risposte[d.id] = { testo: ta.value };
      segnaDaSalvare();
    });
    blocco.append(ta);
  }
  return blocco;
}

// ---------------------------------------------------------------------
//  Timer
// ---------------------------------------------------------------------
function scadenza() { return new Date(stato.started_at).getTime() + stato.durata * 60000; }

function avviaTimer() {
  clearInterval(timer);
  aggiornaTimer();
  timer = setInterval(aggiornaTimer, 1000);
}
function aggiornaTimer() {
  const restano = Math.round((scadenza() - Date.now()) / 1000);
  const t = $("#timer");
  if (t) {
    t.textContent = mmss(restano);
    t.classList.toggle("allarme", restano <= 60);
  }
  if (restano <= 0) {
    clearInterval(timer);
    avviso("Tempo scaduto: consegna automatica.", "info");
    consegna(true);
  }
}

// ---------------------------------------------------------------------
//  Autosalvataggio
// ---------------------------------------------------------------------
function segnaDaSalvare() {
  salvataggioInSospeso = true;
  const s = $("#statoSalv"); if (s) s.textContent = "Da salvare…";
  salvaSessione();
}
function avviaAutosave() {
  clearInterval(autosaveTimer);
  autosaveTimer = setInterval(() => { if (salvataggioInSospeso) salvaServer(); }, 12000);
}
async function salvaServer() {
  if (consegnato) return;
  salvataggioInSospeso = false;
  const risposte = Object.entries(stato.risposte).map(([domanda_id, contenuto]) => ({ domanda_id, contenuto }));
  const { data, error } = await sb.functions.invoke("salva-risposte", {
    body: { token_consegna: stato.token_consegna, risposte },
  });
  const s = $("#statoSalv");
  if (error || data?.errore) {
    if (data?.scaduto) { consegna(true); return; }
    salvataggioInSospeso = true;
    if (s) s.textContent = "Salvataggio in ritardo…";
  } else if (s) {
    s.textContent = "Salvato";
  }
}

// ---------------------------------------------------------------------
//  Consegna
// ---------------------------------------------------------------------
function confermaConsegna() {
  if (confirm("Vuoi consegnare la verifica? Dopo l'invio non potrai più modificarla.")) consegna(false);
}

async function consegna(automatica) {
  if (consegnato) return;
  consegnato = true;
  clearInterval(timer);
  clearInterval(autosaveTimer);
  const btn = $("#btnConsegna"); if (btn) { btn.disabled = true; btn.textContent = "Invio…"; }
  const risposte = Object.entries(stato.risposte).map(([domanda_id, contenuto]) => ({ domanda_id, contenuto }));
  const { data, error } = await sb.functions.invoke("consegna-verifica", {
    body: { token_consegna: stato.token_consegna, risposte },
  });
  if (error || (data?.errore && !data?.gia_consegnata)) {
    consegnato = false;
    if (btn) { btn.disabled = false; btn.textContent = "Consegna la verifica"; }
    return avviso(data?.errore || "Invio non riuscito. Riprova.", "err");
  }
  stato.consegnato = true;
  salvaSessione();
  schermataConsegnata(automatica);
}

function schermataConsegnata(automatica) {
  consegnato = true;
  clearInterval(timer); clearInterval(autosaveTimer);
  barra.innerHTML = "";
  main.innerHTML = "";
  main.append(el("div", { class: "card centro", style: "max-width:480px;margin:40px auto" },
    el("div", { class: "grande" }, "✓"),
    el("h1", {}, "Verifica consegnata"),
    el("p", { class: "muted" }, automatica
      ? "Il tempo è scaduto e la verifica è stata inviata automaticamente."
      : "La tua verifica è stata inviata correttamente. Ora è bloccata e non è più modificabile."),
    el("p", { class: "muted piccolo" }, "Puoi chiudere questa pagina.")));
}

// ---------------------------------------------------------------------
//  Persistenza locale
// ---------------------------------------------------------------------
function salvaSessione() { try { sessionStorage.setItem(CHIAVE, JSON.stringify(stato)); } catch (_e) {} }
function leggiSessione() { try { return JSON.parse(sessionStorage.getItem(CHIAVE)); } catch (_e) { return null; } }

function campo(testo, input) {
  const id = input.id || "f" + Math.random().toString(36).slice(2);
  input.id = id;
  return el("div", {}, el("label", { for: id }, testo), input);
}

avvio();
