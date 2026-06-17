// =====================================================================
//  Area docente: login, elenco verifiche, editor, risultati.
// =====================================================================
import { sb, configurato } from "./supabase.js";
import { $, esc, el, avviso } from "./comune.js";

const main = $("#contenuto");
const chiSono = $("#chiSono");
const btnEsci = $("#btnEsci");

// Stato dell'editor in corso (domande in bozza)
let editor = null;

// ---------------------------------------------------------------------
//  Avvio
// ---------------------------------------------------------------------
async function avvio() {
  if (!configurato) {
    main.innerHTML = `<div class="card">
      <h1>Configurazione mancante</h1>
      <p>Prima di usare l'area verifiche bisogna collegare Supabase.
      Apri il file <code>esami/config.js</code> e incolla l'indirizzo del progetto
      e la chiave <b>anon</b>. Trovi le istruzioni passo-passo nel README.</p>
    </div>`;
    $("#caricamento")?.remove();
    return;
  }
  const { data } = await sb.auth.getSession();
  if (data.session) mostraDashboard();
  else mostraLogin();
}

sb.auth.onAuthStateChange((_e, session) => {
  if (session) { btnEsci.hidden = false; }
  else { btnEsci.hidden = true; chiSono.textContent = ""; }
});

btnEsci.addEventListener("click", async () => {
  await sb.auth.signOut();
  mostraLogin();
});

// ---------------------------------------------------------------------
//  Login / registrazione docente
// ---------------------------------------------------------------------
function mostraLogin() {
  chiSono.textContent = "";
  btnEsci.hidden = true;
  main.innerHTML = "";
  const form = el("form", { class: "card", style: "max-width:440px;margin:30px auto" },
    el("h1", {}, "Accesso docente"),
    el("p", { class: "muted piccolo" },
      "Entra con la tua email per creare e gestire le verifiche. " +
      "Per sicurezza la sessione non resta salvata: se ricarichi la pagina dovrai rientrare."),
    etichettaInput("Email", el("input", { type: "email", id: "email", required: true, autocomplete: "username" })),
    etichettaInput("Password", el("input", { type: "password", id: "pwd", required: true, minlength: "6", autocomplete: "current-password" })),
    el("div", { class: "azioni" },
      el("button", { class: "btn", type: "submit" }, "Entra"),
      el("button", { class: "btn ghost", type: "button", id: "btnRegistra" }, "Crea un account")),
    el("p", { class: "nota", id: "msgLogin", hidden: true })
  );
  form.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const email = $("#email").value.trim();
    const password = $("#pwd").value;
    const { error } = await sb.auth.signInWithPassword({ email, password });
    if (error) return messaggio("Accesso non riuscito: " + traduci(error.message));
    mostraDashboard();
  });
  $("#btnRegistra", form).addEventListener("click", async () => {
    const email = $("#email").value.trim();
    const password = $("#pwd").value;
    if (!email || password.length < 6) return messaggio("Inserisci email e una password di almeno 6 caratteri.");
    const { error } = await sb.auth.signUp({ email, password });
    if (error) return messaggio("Registrazione non riuscita: " + traduci(error.message));
    messaggio("Account creato. Se Supabase richiede la conferma via email, controlla la posta, poi torna qui ed entra.");
  });
  main.append(form);

  function messaggio(t) { const m = $("#msgLogin", form); m.hidden = false; m.textContent = t; }
}

// ---------------------------------------------------------------------
//  Dashboard: elenco verifiche
// ---------------------------------------------------------------------
async function mostraDashboard() {
  editor = null;
  const { data: u } = await sb.auth.getUser();
  if (u?.user) chiSono.textContent = u.user.email;
  btnEsci.hidden = false;

  main.innerHTML = `<p class="muted">Carico le verifiche…</p>`;
  const { data: esami, error } = await sb
    .from("esami")
    .select("id, titolo, classe, durata_minuti, stato, token_pubblico, created_at")
    .order("created_at", { ascending: false });

  if (error) { main.innerHTML = `<div class="card">Errore nel caricamento: ${esc(error.message)}</div>`; return; }

  const testa = el("div", { class: "lista-esame" },
    el("h1", {}, "Le tue verifiche"),
    el("span", { class: "spazio" }),
    el("button", { class: "btn oro", onclick: () => apriEditor() }, "+ Nuova verifica"));

  const card = el("div", { class: "card" }, testa);

  if (!esami.length) {
    card.append(el("p", { class: "muted" }, "Non hai ancora creato verifiche. Inizia con “Nuova verifica”."));
  } else {
    for (const e of esami) {
      card.append(el("div", { class: "lista-esame" },
        el("div", {},
          el("div", { class: "titolo" }, e.titolo),
          el("div", { class: "muted piccolo" }, `Classe ${e.classe} · ${e.durata_minuti} min`)),
        el("span", { class: "spazio" }),
        el("span", { class: "badge " + e.stato }, e.stato),
        e.stato === "bozza"
          ? el("button", { class: "btn ghost piccolo", onclick: () => apriEditor(e.id) }, "Modifica")
          : el("button", { class: "btn ghost piccolo", onclick: () => mostraRisultati(e.id) }, "Risultati"),
        botoniStato(e)
      ));
    }
  }
  main.innerHTML = "";
  main.append(card);
}

function botoniStato(e) {
  const cont = el("span", { style: "display:flex;gap:8px" });
  if (e.stato === "bozza") {
    cont.append(el("button", { class: "btn piccolo", onclick: () => cambiaStato(e.id, "pubblicata") }, "Pubblica"));
  } else if (e.stato === "pubblicata") {
    cont.append(el("button", { class: "btn ghost piccolo", onclick: () => mostraLink(e) }, "Link"));
    cont.append(el("button", { class: "btn danger piccolo", onclick: () => cambiaStato(e.id, "chiusa") }, "Chiudi"));
  }
  return cont;
}

async function cambiaStato(id, stato) {
  const patch = { stato };
  if (stato === "pubblicata") patch.published_at = new Date().toISOString();
  const { error } = await sb.from("esami").update(patch).eq("id", id);
  if (error) return avviso("Errore: " + error.message, "err");
  avviso(stato === "pubblicata" ? "Verifica pubblicata." : "Stato aggiornato.", "ok");
  if (stato === "pubblicata") {
    const { data } = await sb.from("esami").select("id,titolo,token_pubblico,stato").eq("id", id).single();
    mostraDashboard().then(() => data && mostraLink(data));
  } else mostraDashboard();
}

function linkStudente(token) {
  const base = location.href.replace(/index\.html(\?.*)?$/, "").replace(/\/$/, "");
  return `${base}/studente.html?e=${token}`;
}

function mostraLink(e) {
  const url = linkStudente(e.token_pubblico);
  const box = el("div", { class: "card" },
    el("h2", {}, `Link per gli studenti — ${esc(e.titolo)}`),
    el("p", { class: "muted piccolo" }, "Copia questo indirizzo e dallo alla classe. Funziona finché la verifica è pubblicata."),
    el("div", { class: "linkbox" },
      el("input", { type: "text", readonly: true, value: url, id: "linkUrl" }),
      el("button", { class: "btn piccolo", onclick: copia }, "Copia")),
    el("div", { class: "azioni" }, el("button", { class: "btn ghost", onclick: mostraDashboard }, "← Torna")));
  main.innerHTML = "";
  main.append(box);
  function copia() {
    const i = $("#linkUrl"); i.select();
    navigator.clipboard?.writeText(i.value).then(() => avviso("Link copiato.", "ok"), () => avviso("Seleziona e copia manualmente."));
  }
}

// ---------------------------------------------------------------------
//  Editor verifica (solo in stato bozza)
// ---------------------------------------------------------------------
async function apriEditor(id = null) {
  editor = { id, titolo: "", classe: "", durata: 30, mostraNomi: false, domande: [] };

  if (id) {
    const { data: e } = await sb.from("esami").select("*").eq("id", id).single();
    if (e) { editor.titolo = e.titolo; editor.classe = e.classe; editor.durata = e.durata_minuti; editor.mostraNomi = e.mostra_nomi_reali; }
    const { data: dom } = await sb.from("domande").select("*").eq("esame_id", id).order("ordine");
    const ids = (dom ?? []).map((d) => d.id);
    const { data: sol } = ids.length ? await sb.from("soluzioni").select("*").in("domanda_id", ids) : { data: [] };
    const solMap = new Map((sol ?? []).map((s) => [s.domanda_id, s.risposta_corretta]));
    editor.domande = (dom ?? []).map((d) => ({
      tipo: d.tipo, testo: d.testo, punteggio: d.punteggio,
      opzioni: d.opzioni ?? ["", ""],
      corretta: solMap.get(d.id)?.indice ?? 0,
    }));
  }
  if (!editor.domande.length) aggiungiDomanda();
  renderEditor();
}

function aggiungiDomanda() {
  editor.domande.push({ tipo: "scelta_multipla", testo: "", punteggio: 1, opzioni: ["", ""], corretta: 0 });
}

function renderEditor() {
  main.innerHTML = "";
  const cont = el("div", {});

  const datiBase = el("div", { class: "card" },
    el("h1", {}, editor.id ? "Modifica verifica" : "Nuova verifica"),
    etichettaInput("Titolo", el("input", { type: "text", id: "edTitolo", value: editor.titolo })),
    el("div", { class: "riga" },
      etichettaInput("Classe", el("input", { type: "text", id: "edClasse", value: editor.classe, placeholder: "es. 3A" })),
      etichettaInput("Durata (minuti)", el("input", { type: "number", id: "edDurata", min: "1", value: editor.durata }))),
    el("label", { style: "display:flex;gap:8px;align-items:center;font-weight:400;margin-top:14px" },
      checkbox("edNomi", editor.mostraNomi),
      el("span", {}, "Raccogli nome e cognome reali (NON consigliato)")),
    el("div", { class: "nota" },
      el("b", {}, "Privacy: "),
      "di norma gli studenti si identificano con un codice + la classe, non con nome e cognome. " +
      "Attiva i nomi reali solo dopo aver verificato la base giuridica con DS/DSGA/DPO della scuola.")
  );

  const domCard = el("div", { class: "card" }, el("h2", {}, "Domande"));
  editor.domande.forEach((d, i) => domCard.append(renderDomanda(d, i)));
  domCard.append(el("button", { class: "btn ghost", onclick: () => { leggiDom(); aggiungiDomanda(); renderEditor(); } }, "+ Aggiungi domanda"));

  const azioni = el("div", { class: "azioni" },
    el("button", { class: "btn oro", onclick: salva }, "Salva bozza"),
    el("button", { class: "btn ghost", onclick: mostraDashboard }, "Annulla"));

  cont.append(datiBase, domCard, azioni);
  main.append(cont);
}

function renderDomanda(d, i) {
  const blocco = el("div", { class: "domanda-edit" });
  const tipoSel = el("select", { onchange: (ev) => { leggiDom(); editor.domande[i].tipo = ev.target.value; renderEditor(); } },
    opt("scelta_multipla", "Scelta multipla", d.tipo),
    opt("aperta", "Risposta aperta", d.tipo));

  blocco.append(el("div", { class: "testa" },
    el("b", {}, "Domanda " + (i + 1)),
    tipoSel,
    el("span", { style: "margin-left:auto" }),
    el("label", { style: "margin:0;font-weight:400;display:flex;gap:6px;align-items:center" },
      "Punti", el("input", { type: "number", min: "0", step: "0.5", style: "width:80px",
        class: "dpunteggio", value: d.punteggio })),
    el("button", { class: "btn danger piccolo", type: "button",
      onclick: () => { leggiDom(); editor.domande.splice(i, 1); if (!editor.domande.length) aggiungiDomanda(); renderEditor(); } }, "Elimina")
  ));

  blocco.append(el("textarea", { class: "dtesto", placeholder: "Testo della domanda" }, d.testo));

  if (d.tipo === "scelta_multipla") {
    const opz = el("div", { class: "dopzioni" });
    d.opzioni.forEach((o, j) => {
      opz.append(el("div", { class: "opzione-riga" },
        el("input", { type: "radio", name: "corretta-" + i, value: j, checked: d.corretta === j, "aria-label": "Segna come corretta" }),
        el("input", { type: "text", class: "dopzione", value: o, placeholder: "Opzione " + (j + 1) }),
        el("button", { class: "btn ghost piccolo", type: "button",
          onclick: () => { leggiDom(); editor.domande[i].opzioni.splice(j, 1); if (editor.domande[i].corretta >= editor.domande[i].opzioni.length) editor.domande[i].corretta = 0; renderEditor(); } }, "✕")));
    });
    opz.append(el("button", { class: "btn ghost piccolo", type: "button",
      onclick: () => { leggiDom(); editor.domande[i].opzioni.push(""); renderEditor(); } }, "+ Opzione"));
    opz.append(el("p", { class: "campo-hint" }, "Seleziona il pallino dell'opzione corretta. La risposta corretta resta sul server e non è mai visibile agli studenti."));
    blocco.append(opz);
  }
  return blocco;
}

// Legge i valori correnti dei campi nel DOM dentro lo stato (prima di re-render/salvataggio)
function leggiDom() {
  const blocchi = main.querySelectorAll(".domanda-edit");
  blocchi.forEach((b, i) => {
    if (!editor.domande[i]) return;
    editor.domande[i].testo = b.querySelector(".dtesto")?.value ?? "";
    editor.domande[i].punteggio = parseFloat(b.querySelector(".dpunteggio")?.value) || 0;
    const opzInput = [...b.querySelectorAll(".dopzione")];
    if (opzInput.length) editor.domande[i].opzioni = opzInput.map((x) => x.value);
    const radio = b.querySelector('input[type=radio]:checked');
    if (radio) editor.domande[i].corretta = parseInt(radio.value, 10);
  });
  if ($("#edTitolo")) {
    editor.titolo = $("#edTitolo").value.trim();
    editor.classe = $("#edClasse").value.trim();
    editor.durata = parseInt($("#edDurata").value, 10) || 1;
    editor.mostraNomi = $("#edNomi").checked;
  }
}

async function salva() {
  leggiDom();
  if (!editor.titolo) return avviso("Dai un titolo alla verifica.", "err");
  if (!editor.classe) return avviso("Indica la classe.", "err");
  for (const [i, d] of editor.domande.entries()) {
    if (!d.testo.trim()) return avviso(`La domanda ${i + 1} è vuota.`, "err");
    if (d.tipo === "scelta_multipla") {
      const piene = d.opzioni.filter((o) => o.trim());
      if (piene.length < 2) return avviso(`La domanda ${i + 1} deve avere almeno 2 opzioni.`, "err");
    }
  }

  const { data: u } = await sb.auth.getUser();
  const base = {
    titolo: editor.titolo, classe: editor.classe,
    durata_minuti: editor.durata, mostra_nomi_reali: editor.mostraNomi,
    stato: "bozza",
  };

  let esameId = editor.id;
  if (esameId) {
    const { error } = await sb.from("esami").update(base).eq("id", esameId);
    if (error) return avviso("Errore nel salvataggio: " + error.message, "err");
    // riscrivo le domande da zero (consentito perché è una bozza senza consegne)
    await sb.from("domande").delete().eq("esame_id", esameId);
  } else {
    const { data, error } = await sb.from("esami").insert({ ...base, created_by: u.user.id }).select("id").single();
    if (error) return avviso("Errore nella creazione: " + error.message, "err");
    esameId = data.id;
  }

  // Inserisco domande e soluzioni
  for (const [i, d] of editor.domande.entries()) {
    const opzioni = d.tipo === "scelta_multipla" ? d.opzioni.filter((o) => o.trim()) : null;
    const { data: dom, error: dErr } = await sb.from("domande").insert({
      esame_id: esameId, tipo: d.tipo, testo: d.testo.trim(),
      opzioni, punteggio: d.punteggio, ordine: i,
    }).select("id").single();
    if (dErr) return avviso("Errore nelle domande: " + dErr.message, "err");
    if (d.tipo === "scelta_multipla") {
      const corretta = Math.min(d.corretta, opzioni.length - 1);
      const { error: sErr } = await sb.from("soluzioni").insert({
        domanda_id: dom.id, risposta_corretta: { indice: corretta },
      });
      if (sErr) return avviso("Errore nel salvare la soluzione: " + sErr.message, "err");
    }
  }
  avviso("Verifica salvata come bozza.", "ok");
  mostraDashboard();
}

// ---------------------------------------------------------------------
//  Risultati di una verifica
// ---------------------------------------------------------------------
async function mostraRisultati(esameId) {
  main.innerHTML = `<p class="muted">Carico i risultati…</p>`;
  const { data: e } = await sb.from("esami").select("titolo, classe, mostra_nomi_reali").eq("id", esameId).single();
  const { data: consegne } = await sb.from("consegne")
    .select("id, codice_studente, classe, nome_reale, submitted_at, punteggio, punteggio_max, percentuale, stato")
    .eq("esame_id", esameId)
    .order("submitted_at", { ascending: false, nullsFirst: false });

  const card = el("div", { class: "card" },
    el("div", { class: "lista-esame" },
      el("h1", {}, "Risultati — " + esc(e?.titolo ?? "")),
      el("span", { class: "spazio" }),
      el("button", { class: "btn ghost", onclick: mostraDashboard }, "← Torna")));

  if (!consegne?.length) {
    card.append(el("p", { class: "muted" }, "Ancora nessuna consegna."));
  } else {
    const tab = el("table", {},
      el("thead", {}, el("tr", {},
        el("th", {}, e?.mostra_nomi_reali ? "Studente" : "Codice"),
        el("th", {}, "Classe"),
        el("th", {}, "Punteggio"),
        el("th", {}, "%"),
        el("th", {}, "Stato"),
        el("th", {}, "Consegnata"))));
    const tb = el("tbody", {});
    for (const c of consegne) {
      const ident = e?.mostra_nomi_reali && c.nome_reale ? c.nome_reale : c.codice_studente;
      const punti = c.punteggio == null ? "—" : `${c.punteggio} / ${c.punteggio_max}`;
      tb.append(el("tr", {},
        el("td", {}, ident),
        el("td", {}, c.classe),
        el("td", {}, punti),
        el("td", {}, c.percentuale == null ? "—" : c.percentuale + "%"),
        el("td", {}, el("span", { class: "badge " + c.stato }, etichettaStato(c.stato))),
        el("td", {}, c.submitted_at ? new Date(c.submitted_at).toLocaleString("it-IT") : "—")));
    }
    tab.append(tb);
    card.append(tab);
    const daCorr = consegne.filter((c) => c.stato === "consegnata").length;
    if (daCorr) card.append(el("p", { class: "nota" },
      `${daCorr} consegn${daCorr === 1 ? "a ha" : "e hanno"} domande aperte in attesa di correzione manuale (arriverà nella Fase 3).`));
  }
  main.innerHTML = "";
  main.append(card);
}

function etichettaStato(s) {
  return s === "corretta" ? "corretta" : s === "consegnata" ? "da correggere" : "in corso";
}

// ---------------------------------------------------------------------
//  Mini-helper UI
// ---------------------------------------------------------------------
function etichettaInput(testo, input) {
  const id = input.id || "f" + Math.random().toString(36).slice(2);
  input.id = id;
  return el("div", {}, el("label", { for: id }, testo), input);
}
function checkbox(id, checked) { const c = el("input", { type: "checkbox", id, style: "width:auto" }); c.checked = !!checked; return c; }
function opt(v, t, sel) { const o = el("option", { value: v }, t); if (v === sel) o.selected = true; return o; }

function traduci(msg) {
  if (/Invalid login/i.test(msg)) return "email o password errate.";
  if (/already registered/i.test(msg)) return "questa email è già registrata.";
  if (/Email not confirmed/i.test(msg)) return "devi prima confermare l'email.";
  return msg;
}

avvio();
