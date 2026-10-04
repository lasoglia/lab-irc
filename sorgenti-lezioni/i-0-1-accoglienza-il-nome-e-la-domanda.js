
/* ---- lezione ---- */
/* Classe I · Ora 01 · Accoglienza «Il nome e la domanda» — sorgente dell'artefatto (design system Lab-Irc).
   Conversione dell'artefatto «Il nome e la domanda — Primo giorno» (M. Sestili) nel formato del kit lezione.
   Nessun dato salvato: i nomi scritti sulla lavagna digitale restano in memoria finché la pagina è aperta. */
window.LEZIONE = {
  slug: 'i-0-1-accoglienza-il-nome-e-la-domanda',
  classe: 'Anno I',
  titolo: 'Il *nome* e la domanda',
  sottotitolo: 'Primo giorno: i nomi uno per uno, la domanda dell\'anno, la mappa delle quattro tappe, il patto e la scatola delle domande.',
  saluto: 'Ci vediamo alla tappa 1.',

  glossario: {
    'concordato': { parola: 'Concordato', etim: 'dal latino *concordare*, «accordarsi»', def: 'L\'accordo fra lo Stato italiano e la Santa Sede che regola, fra l\'altro, l\'insegnamento della religione a scuola. Rivisto nel 1984: da allora ciascuno sceglie se avvalersi dell\'ora di religione.' },
    'laicità': { parola: 'laicità', etim: 'dal greco *laikós*, «del popolo»', def: 'La parola non compare nella Costituzione italiana. È entrata nel diritto italiano come «principio supremo» con la sentenza n. 203/1989 della Corte costituzionale, che decideva proprio sull\'ora di religione.' },
    'gilgamesh': { parola: 'Gilgamesh', def: 'Il re del primo grande libro dell\'umanità, l\'*Epopea di Gilgamesh*: parte per non morire e torna sapendo che morirà.' },
    'talenti': { parola: 'Talenti', def: 'Le ultime sei ore dell\'anno. Si lavora in gruppo per mettere davanti alla classe una cosa che si sa fare; si riparte dalla lavagna del primo giorno.' }
  },

  scene: [
    /* 0–3 */
    { fase: 'Aggancio', minuti: 3, titolo: 'Il *nome* e la domanda',
      lead: 'Prima i nomi, uno per uno. Poi una domanda che ci terrà compagnia fino a giugno.',
      blocchi: [
        { tipo: 'agenda', titolo: 'Il primo giorno' }
      ] },

    /* 3–18 */
    { fase: 'Attività', minuti: 15, titolo: 'La *catena* dei nomi',
      lead: 'Tre regole. Ogni nome e ogni cosa che sapete fare finiscono sulla lavagna.',
      blocchi: [
        { tipo: 'custom', nome: 'CatenaNomi', props: {} }
      ] },

    /* 18–23 */
    { fase: 'Scoperta', minuti: 5, titolo: 'Una cosa che *nessuno* sa',
      lead: 'Questa è l\'unica materia dell\'orario a cui potevate dire di no.',
      blocchi: [
        { tipo: 'sondaggio', id: 'sapevo', q: 'Lo sapevate?',
          opzioni: ['Sì, lo sapevo', 'No, non lo sapevo'],
          istruzione: 'Alzata di mano. Nessun nome, nessun punteggio.' },
        { tipo: 'sondaggio', id: 'casella', q: 'E quella casella, chi l\'ha barrata?',
          opzioni: ['Io', 'I miei genitori', 'Non lo so'],
          istruzione: 'Alzata di mano. Nessun nome, nessun punteggio.',
          dibattito: 'Dal 1984, quando Italia e Santa Sede hanno rivisto il {Concordato|concordato}, ciascuno sceglie se avvalersi di quest\'ora. E nella scuola superiore la scelta spetta a voi, non ai vostri genitori: per molti è la prima decisione scolastica presa in prima persona.' }
      ] },

    /* 23–28 */
    { fase: 'Scoperta', minuti: 5, titolo: 'La domanda *dell\'anno*',
      lead: 'Sembra ovvia. Non lo è mai stata.',
      blocchi: [
        { tipo: 'rivela', iniziali: 1, pulsante: 'E poi?', passi: [
          { titolo: 'Da dove viene l\'idea che ogni persona conta?', testo: 'È la domanda che ci terrà compagnia fino a giugno.' },
          { titolo: 'Nel mondo antico contavano i re, gli dèi e le città', testo: 'Un uomo solo, senza titoli e senza terra, non contava niente. Il primo grande libro dell\'umanità racconta di un re, {Gilgamesh|gilgamesh}, che parte per non morire e torna sapendo che morirà.' },
          { titolo: 'Eppure oggi i vostri nomi sono su quella lavagna, uno per uno', testo: 'In mezzo c\'è una storia lunga tremila anni. Quest\'anno la percorriamo.' }
        ], fine: 'Tremila anni in un anno di scuola. Si parte dalla tappa 1.' }
      ] },

    /* 28–35 */
    { fase: 'Scoperta', minuti: 7, titolo: 'Quattro tappe e un *finale*',
      lead: 'La mappa dell\'anno: toccate una tappa per vedere dove porta.',
      blocchi: [
        { tipo: 'custom', nome: 'MappaAnno', props: {} }
      ] },

    /* 35–40 */
    { fase: 'Scoperta', minuti: 5, titolo: 'Tre cose che quest\'ora *non* è',
      lead: 'Girate le carte. Poi una domanda sola, per vedere se è chiaro.',
      blocchi: [
        { tipo: 'carte', carte: [
          { etichetta: 'Non è', fronte: 'Catechismo', retro: 'Il programma è fissato per decreto e vale per tutti allo stesso modo, credenti e non. Nessuno vi chiederà che cosa credete.' },
          { etichetta: 'Non è', fronte: 'Senza valutazione', retro: 'Si valuta: non con un voto in decimi ma con un giudizio, su una nota separata. Si valuta ciò che fate (l\'attenzione, il ragionamento, i lavori), mai ciò che pensate.' },
          { etichetta: 'Non è', fronte: 'Un\'ora di buco', retro: 'Leggeremo testi, guarderemo pezzi di film, discuteremo, analizzeremo un caso. E le ultime sei ore saranno interamente vostre.' }
        ] },
        { tipo: 'verifica', etichetta: 'Verifica lampo', q: 'Che cosa si valuta, in quest\'ora?',
          opzioni: ['Ciò che credete', 'Il lavoro: attenzione, ragionamento, lavori', 'Niente: non c\'è valutazione', 'Quanto siete d\'accordo con chi insegna'], ok: 1,
          why: 'Si valuta, con un giudizio su una nota separata e non con un voto in decimi. Si valuta ciò che fate, mai ciò che pensate: è uno degli obblighi del patto per chi insegna.' }
      ] },

    /* 40–45 */
    { fase: 'Attività', minuti: 5, titolo: 'Il patto vale solo in *due*',
      lead: 'Cinque obblighi per chi insegna, cinque per chi studia. Si scoprono a coppie.',
      blocchi: [
        { tipo: 'confronto', a: 'Si obbliga chi insegna', b: 'Si obbliga chi studia', pulsante: 'La prima coppia', righe: [
          { criterio: '1', a: 'a dire sempre su quale piano ci si trova: fatto, interpretazione, valore', b: 'a distinguere ciò che sa da ciò che ha sentito dire' },
          { criterio: '2', a: 'a non chiedere mai a nessuno che cosa crede', b: 'a rispettare chi sceglie di non parlare' },
          { criterio: '3', a: 'a valutare il lavoro e mai le convinzioni', b: 'a portare in quest\'ora la propria testa, non solo il corpo' },
          { criterio: '4', a: 'a dire «non lo so» quando non lo sa', b: 'a fare le domande scomode, che sono le più utili' },
          { criterio: '5', a: 'a presentare le posizioni diverse dalla propria come le presenterebbe chi le abita', b: 'a dissentire quanto vuole e a non deridere mai' }
        ], domanda: 'Il patto entra in vigore alla fine del primo giorno. Non ha rinnovo tacito: si rinnova ogni settimana, o non si rinnova.' },
        { tipo: 'aggancio', etichetta: 'Per capire', titolo: 'Fatto, interpretazione, giudizio di valore',
          t: 'Lo strumento di quest\'anno è uno solo, e si usa da subito: distinguere sempre **un fatto** (si può verificare), **un\'interpretazione** (si può discutere) e **un giudizio di valore** (si può sostenere, ma non dimostrare). Quasi tutti i litigi del mondo nascono dal confonderli.\n\nÈ il primo di cinque attrezzi: uno nuovo ogni anno, e quelli vecchi restano.' }
      ] },

    /* 45–48 */
    { fase: 'Chiusura', minuti: 3, titolo: 'La *scatola* delle domande',
      lead: 'Un compito, uno solo.',
      blocchi: [
        { tipo: 'custom', nome: 'Scatola', props: {} }
      ] },

    /* 48–50 */
    { fase: 'Chiusura', minuti: 2, titolo: 'Fine del *primo* giorno',
      lead: 'Quest\'ora non serve a niente, se «servire» vuol dire produrre qualcosa di spendibile subito.',
      testo: 'Serve a non arrivare impreparati alle uniche domande che, prima o poi, arrivano a tutti.',
      blocchi: [
        { tipo: 'idee', titolo: 'Tre cose che quasi nessun adulto sa', pulsante: 'La prima', idee: [
          'Avete scelto voi. Nella scuola superiore la scelta sull\'ora di religione spetta allo studente, non ai genitori.',
          'Nessuno vi chiederà che cosa credete. È un obbligo del patto per chi insegna.',
          'La parola «{laicità}» non è scritta nella Costituzione: è entrata in Italia dalla porta di quest\'ora, con una sentenza della Corte costituzionale.'
        ] },
        { tipo: 'continua', voci: [
          { t: 'Vero o falso?', d: 'Otto cose che si dicono sull\'ora di religione. Alcune sono vere, la maggior parte no: dopo ogni risposta il perché e la fonte.', vai: 'giochi', gioco: 'vf', principale: true },
          { t: 'La scatola', d: 'Una domanda vera, scritta a mano, senza firma. La apriamo la prima volta a novembre.' },
          { t: 'Tappa 1 · da ottobre', d: 'Un popolo che dice no agli dèi.' }
        ] }
      ] }
  ],

  studio: {
    sezioni: [
      { titolo: 'La domanda dell\'anno', testo: 'Quest\'anno partiamo da una domanda che sembra ovvia e non lo è: **da dove viene l\'idea che ogni persona conta?** Nel mondo antico contavano i re, gli dèi e le città. Un uomo solo, senza titoli e senza terra, non contava niente, e lo sapeva. Il primo grande libro dell\'umanità, l\'*Epopea di Gilgamesh*, racconta di un re che parte per non morire e torna sapendo che morirà.\n\nVale la pena fermarsi su cosa Gilgamesh cercasse davvero. Parte per la Foresta dei Cedri con uno scopo dichiarato nel testo: procurarsi una fama imperitura, un nome che sopravviva a lui. Nel suo mondo è l\'unica immortalità disponibile, e per ottenerla si può anche morire. Quando l\'amico Enkidu muore, Gilgamesh capisce di essere mortale davvero e riparte, stavolta in cerca della vita senza fine. Non la trova. Lungo la strada una locandiera gli dice in sostanza: la vita eterna non è per te, torna a casa, mangia, bevi, tieniti stretto chi ti vuole bene, perché quello è quanto agli uomini è concesso. È una risposta onesta, e amara.\n\nPoi un altro uomo parte dalla stessa terra, e la sua storia va diversamente: non gli viene promessa la vita eterna e nemmeno la fama, gli viene promesso un futuro che lui non vedrà. Da lì comincia un popolo, e da quel popolo un modo nuovo di pensare l\'essere umano: che a contare non siano i re e le città, ma ogni singola persona.\n\nIn mezzo, fra Gilgamesh che si ammazza per un nome e la lavagna del primo giorno con i vostri nomi scritti sopra gratis, ci sono tremila anni. Quest\'anno li attraversiamo.' },
      { titolo: 'Le quattro tappe', testo: '**1 · Un popolo che dice no agli dèi.** Da Gilgamesh ad Abramo, dall\'Esodo all\'esilio: come un piccolo popolo del Vicino Oriente ha inventato un modo nuovo di stare al mondo. Cinque lezioni, da ottobre. Con l\'*Epopea di Gilgamesh* e *Il Principe d\'Egitto*.\n\n**2 · Il libro che ha scritto il nostro alfabeto.** L\'Antico Testamento non è un libro: è una biblioteca scritta in mille anni, con generi diversi. Impariamo a leggerlo senza prenderlo alla lettera e senza liquidarlo come favola, e scopriamo quante parole che usate ogni giorno (capro espiatorio, giubileo, sabato) vengono da lì. Quattro lezioni. Con *Il nipote del mago* di C. S. Lewis.\n\n**3 · Un Dio che non sta in un tempio.** Tre idee che hanno cambiato il modo di pensare la persona: un solo Dio, un Dio che parla nella storia, l\'uomo «a sua immagine». Le leggiamo come filosofia, accessibile a chiunque, non come catechismo. Quattro lezioni. Con *Inside Out*.\n\n**4 · Ogni persona conta: ma perché?** Torniamo a oggi con gli strumenti raccolti: i diritti umani, le regole (ci rendono liberi o prigionieri?), il diritto a non produrre, chi arriva da fuori, il nome contro il numero. Cinque lezioni; l\'ultima è l\'analisi di un caso. Con *L\'onda* e *Wonder*.\n\n*Non vi dirò cosa pensare. Vi darò uno strumento per pensarlo meglio.* Lo strumento di quest\'anno è uno solo, e si usa da subito: distinguere sempre **un fatto** (si può verificare), **un\'interpretazione** (si può discutere) e **un giudizio di valore** (si può sostenere, ma non dimostrare). Quasi tutti i litigi del mondo nascono dal confonderli. È il primo di cinque attrezzi: uno nuovo ogni anno, e quelli vecchi restano.' },
      { titolo: 'Come funziona quest\'ora', testo: '**Si può rifiutare.** È l\'unica materia dell\'orario per cui è così: dal 1984, quando Italia e Santa Sede hanno rivisto il Concordato, ciascuno sceglie se avvalersene. E nella scuola superiore la scelta spetta a voi, non ai vostri genitori: per molti è la prima decisione scolastica presa in prima persona.\n\n**Non è catechismo.** Il programma è fissato per decreto e vale per tutti allo stesso modo, credenti e non. Nessuno vi chiederà che cosa credete.\n\n**Si valuta.** Non con un voto in decimi ma con un giudizio, su una nota separata. Si valuta ciò che fate (l\'attenzione, il ragionamento, i lavori), mai ciò che pensate.\n\n**Non è un\'ora di buco.** Leggeremo testi, guarderemo pezzi di film, discuteremo, analizzeremo un caso, e le ultime sei ore saranno interamente vostre.\n\n**Una domanda per voi.** Avete scelto voi, all\'iscrizione, se stare in quest\'ora. Quanto ha pesato una convinzione, quanto l\'abitudine, quanto ciò che facevano gli altri? Nessuno leggerà la risposta.' },
      { titolo: 'Il patto', testo: '**Si obbliga chi insegna:** a dire sempre su quale piano ci si trova: fatto, interpretazione, valore; a non chiedere mai a nessuno che cosa crede; a valutare il lavoro e mai le convinzioni; a dire «non lo so» quando non lo sa; a presentare le posizioni diverse dalla propria come le presenterebbe chi le abita.\n\n**Si obbliga chi studia:** a portare in quest\'ora la propria testa, non solo il corpo; a dissentire quanto vuole e a non deridere mai; a fare le domande scomode, che sono le più utili; a distinguere ciò che sa da ciò che ha sentito dire; a rispettare chi sceglie di non parlare.\n\nIl patto entra in vigore alla fine del primo giorno. Non ha rinnovo tacito: si rinnova ogni settimana, o non si rinnova.' },
      { titolo: 'La scatola e i Talenti', testo: '**La scatola delle domande** resta in classe tutto l\'anno. Ci si mette una domanda vera, scritta a mano, senza firma. La regola per capire se è vera: se la risposta si trova cercandola online, non è quella giusta. La apriamo due volte, a novembre e ad aprile, e discutiamo quello che c\'è dentro.\n\n**I Talenti** sono le ultime sei ore dell\'anno. Lavorerete in gruppo per mettere davanti alla classe una cosa che sapete fare. La lavagna del primo giorno, con i vostri nomi e le cose che vi riescono bene, è il punto da cui ripartiremo.' }
    ],
    fonti: [
      'Accordo fra la Repubblica italiana e la Santa Sede del 18 febbraio 1984, art. 9 n. 2 (legge 121/1985)',
      'Corte costituzionale, sentenza n. 203/1989',
      'Corte costituzionale, sentenza n. 13/1991',
      'D.P.R. 176/2012 (Intesa MIUR–CEI): indicazioni per l\'insegnamento della religione cattolica',
      'Costituzione della Repubblica italiana, art. 3',
      '*Epopea di Gilgamesh*; *Il Principe d\'Egitto*; C. S. Lewis, *Le Cronache di Narnia — Il nipote del mago*; *Inside Out*; *L\'onda*; *Wonder*',
      'Il patto della classe (Matteo Sestili)'
    ]
  }
};

/* ============================================================
   Stile dei componenti propri (solo token del design system)
   ============================================================ */
(function () {
  var st = document.createElement('style');
  st.textContent = [
    '.acc1-regole{list-style:none;margin:0 0 13px;padding:0;display:grid;gap:8px;grid-template-columns:repeat(auto-fit,minmax(200px,1fr))}',
    '.acc1-regole li{display:flex;gap:13px;align-items:flex-start;padding:13px;border:1px solid var(--lab-line);border-radius:13px;background:var(--lab-surface)}',
    '.acc1-regole li>b{font-size:1.618rem;line-height:1;color:var(--lab-oro);font-weight:600}',
    '.acc1-regole li strong{display:block;color:var(--lab-ink)}',
    '.acc1-regole li small{display:block;color:var(--lab-muted);margin-top:3px}',
    '.acc1-lav-h{display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;align-items:baseline}',
    '.acc1-prima{margin:8px 0;font-size:1.1rem}',
    '.acc1-form{display:flex;gap:8px;flex-wrap:wrap;margin:8px 0 13px}',
    '.acc1-form input{flex:1 1 140px;min-width:0;padding:8px 13px;border:1px solid var(--lab-line);border-radius:8px;background:var(--lab-surface-2);color:var(--lab-ink);font:inherit}',
    '.acc1-form input:focus-visible{outline:2px solid var(--lab-oro);outline-offset:2px}',
    '.acc1-nomi{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:8px}',
    '.acc1-nomi li{padding:5px 13px;border:1px solid var(--lab-line);border-radius:999px;background:var(--lab-surface-2);display:flex;gap:6px;align-items:baseline;max-width:100%;flex-wrap:wrap}',
    '.acc1-nomi li.is-new{border-color:var(--lab-oro);outline:2px solid var(--lab-oro);outline-offset:1px}',
    '.acc1-nomi li span{color:var(--lab-muted);font-size:.9em}',
    '.acc1-tappe{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:13px}',
    '.acc1-tappa{flex:1 1 56px;min-width:56px;display:flex;flex-direction:column;align-items:center;gap:3px;padding:8px 5px;border:1px solid var(--lab-line);border-radius:13px;background:var(--lab-surface);color:var(--lab-ink);cursor:pointer;font:inherit;transition:border-color .2s,transform .2s}',
    '.acc1-tappa i{font-style:normal;font-size:1.618rem;line-height:1;color:var(--lab-oro)}',
    '.acc1-tappa span{font-size:.75rem;color:var(--lab-muted);text-align:center}',
    '.acc1-tappa:hover{border-color:var(--lab-oro)}',
    '.acc1-tappa:focus-visible{outline:2px solid var(--lab-oro);outline-offset:2px}',
    '.acc1-tappa:active{transform:scale(.97)}',
    '.acc1-tappa.is-seen{border-style:dashed}',
    '.acc1-tappa.is-on{border-color:var(--la-accent);border-style:solid;background:var(--lab-surface-2)}',
    '.acc1-tappa.is-on i{color:var(--la-accent)}',
    '.acc1-det-h{display:block;font-size:1.272rem;margin:3px 0 8px}',
    '.acc1-con{color:var(--lab-muted);font-size:.9em}',
    '.acc1-scatola{display:grid;gap:21px;grid-template-columns:minmax(0,1fr)}',
    '@media(min-width:640px){.acc1-scatola{grid-template-columns:200px minmax(0,1fr);align-items:start}}',
    '.acc1-box{width:100%;max-width:200px;margin:0 auto;display:block}',
    '.acc1-regola{font-size:1.272rem;margin:0 0 5px}',
    '.acc1-prova{margin:13px 0}',
    '@media(prefers-reduced-motion:reduce){.acc1-tappa{transition:none}}'
  ].join('\n');
  document.head.appendChild(st);
})();

/* ============================================================
   Componenti su misura
   ============================================================ */

/* La catena dei nomi: le tre regole, il suggerimento per chi parla («ripeti chi c'era prima») e la lavagna dei talenti.
   I nomi restano in memoria finché la pagina è aperta: la lavagna vera va fotografata. */
LabLezione.registra('CatenaNomi', function (p) {
  var REGOLE = [
    { t: 'Dici il tuo nome.', d: '' },
    { t: 'Dici una cosa che ti riesce bene.', d: 'Qualunque: cucinare, ascoltare, dormire, un videogioco.' },
    { t: 'Prima di parlare, ripeti chi c\'era prima di te.', d: '«Lei è Sara, che sa fare X. Io sono…»' }
  ];
  var n = React.useState(''), nome = n[0], setNome = n[1];
  var c = React.useState(''), cosa = c[0], setCosa = c[1];
  var l = React.useState([]), lista = l[0], setLista = l[1];
  var nomeRef = React.useRef(null);
  var ultimo = lista.length ? lista[lista.length - 1] : null;
  function aggiungi(e) {
    e.preventDefault();
    var nm = nome.trim(), cs = cosa.trim();
    if (!nm) { if (nomeRef.current) nomeRef.current.focus(); return; }
    if (!cs) cs = 'non lo so ancora';
    var nl = lista.concat([{ nome: nm, cosa: cs }]);
    setLista(nl); setNome(''); setCosa('');
    if (nl.length > 1 && nl.length % 10 === 0) p.ctx.cheer();
    if (nomeRef.current) nomeRef.current.focus();
  }
  function togli() { setLista(lista.slice(0, -1)); }
  return html`<div className="acc1-catena">
    <ol className="acc1-regole">
      ${REGOLE.map(function (r, i) { return html`<li key=${i}><b>${i + 1}</b><div><strong>${r.t}</strong>${r.d && html`<small>${r.d}</small>`}</div></li>`; })}
    </ol>
    <p className="ll-hint">Comincia chi sta in cattedra. Nessuno può passare, ma «non lo so ancora» è una risposta valida.</p>
    <div className="la-card acc1-lavagna" data-flat>
      <div className="acc1-lav-h">
        <span className="la-meta">La lavagna · ${lista.length} ${lista.length === 1 ? 'nome' : 'nomi'}</span>
        <span className="ll-hint">Questa lavagna la fotografo.</span>
      </div>
      <div aria-live="polite">${ultimo
        ? html`<p className="acc1-prima">Prima di te: <b>${ultimo.nome}</b>, che sa fare <em>${ultimo.cosa}</em>. «Io sono…»</p>`
        : html`<p className="ll-hint">Il primo nome è di chi sta in cattedra: una cosa piccola, non un talento.</p>`}</div>
      <form className="acc1-form" onSubmit=${aggiungi}>
        <input ref=${nomeRef} value=${nome} maxLength="24" placeholder="Nome" aria-label="Nome" onChange=${function (e) { setNome(e.target.value); }} />
        <input value=${cosa} maxLength="40" placeholder="Una cosa che ti riesce bene" aria-label="Una cosa che ti riesce bene" onChange=${function (e) { setCosa(e.target.value); }} />
        <button className="ll-btn" type="submit">Sulla lavagna</button>
        <button className="ll-btn ll-btn--ghost" type="button" onClick=${function () { setCosa('non lo so ancora'); }}>Non lo so ancora</button>
      </form>
      <ul className="acc1-nomi">
        ${lista.map(function (x, i) { return html`<li key=${i} className=${i === lista.length - 1 ? 'is-new' : ''}><b>${x.nome}</b><span>${x.cosa}</span></li>`; })}
      </ul>
      ${lista.length > 0 && html`<div className="ll-row"><button className="ll-link" onClick=${togli}>Togli l'ultimo</button></div>`}
      <p className="ll-hint">È la prima mappa dei talenti della classe. La rivedremo a maggio, quando le ultime sei ore dell'anno saranno interamente vostre. I nomi restano solo su questa pagina: fotografate la lavagna vera.</p>
    </div>
  </div>`;
});

/* La mappa dell'anno: quattro tappe e un finale, ognuna con il mese, la domanda e i film */
LabLezione.registra('MappaAnno', function (p) {
  var T = [
    { k: '1', mese: 'Da ottobre', t: 'Un popolo che dice no agli dèi',
      d: 'Il primo grande libro dell\'umanità racconta di un re, Gilgamesh, che parte per non morire e torna sapendo che morirà. Poi un altro uomo parte dalla stessa terra, e la sua storia va diversamente. Seguiamo il suo popolo per mille anni.',
      extra: 'Da Gilgamesh ad Abramo, dall\'Esodo all\'esilio. Cinque lezioni.', con: 'Epopea di Gilgamesh · Il Principe d\'Egitto' },
    { k: '2', mese: 'Dicembre', t: 'Il libro che ha scritto il nostro alfabeto',
      d: 'Non un libro: una biblioteca scritta in mille anni. Come si legge senza prenderla alla lettera e senza liquidarla come favola, e quante parole che usate ogni giorno vengono da lì.',
      extra: 'Capro espiatorio, giubileo, sabato. Quattro lezioni.', con: 'Le Cronache di Narnia — Il nipote del mago' },
    { k: '3', mese: 'Febbraio', t: 'Un Dio che non sta in un tempio',
      d: 'Tre idee che hanno cambiato il modo di pensare l\'essere umano: un solo Dio, un Dio che parla nella storia, l\'uomo «a sua immagine». Lette come filosofia, non come catechismo.',
      extra: 'Quattro lezioni.', con: 'Inside Out' },
    { k: '4', mese: 'Aprile', t: 'Ogni persona conta: ma perché?',
      d: 'Torniamo a oggi: i diritti umani, le regole (ci rendono liberi o prigionieri?), il diritto a non produrre, chi arriva da fuori, il nome contro il numero. Si chiude con un caso vero.',
      extra: 'Cinque lezioni; l\'ultima è l\'analisi di un caso.', con: 'L\'onda · Wonder' },
    { k: '★', mese: 'Maggio', t: 'Talenti: le ultime sei ore sono vostre',
      d: 'Lavorerete in gruppo per mettere davanti alla classe una cosa che sapete fare. La lavagna del primo giorno, con i vostri nomi e le cose che vi riescono bene, è il punto da cui ripartiremo.',
      extra: '', con: '' }
  ];
  var s = React.useState(null), aperta = s[0], setAperta = s[1];
  var v = React.useState({}), visti = v[0], setVisti = v[1];
  function tocca(i) {
    setAperta(i);
    var nv = Object.assign({}, visti); nv[i] = 1; setVisti(nv);
    if (Object.keys(nv).length === T.length && Object.keys(visti).length < T.length) { p.ctx.festa(); p.ctx.say('Quattro tappe e un finale. Si parte a ottobre.'); }
  }
  var u = aperta === null ? null : T[aperta];
  return html`<div className="acc1-mappa">
    <div className="acc1-tappe" role="tablist" aria-label="Le tappe dell'anno">
      ${T.map(function (x, i) {
        return html`<button key=${i} role="tab" type="button" aria-selected=${aperta === i} className=${'acc1-tappa' + (aperta === i ? ' is-on' : '') + (visti[i] ? ' is-seen' : '')} onClick=${function () { tocca(i); }}>
          <i aria-hidden="true">${x.k}</i><span>${x.k === '★' ? 'Talenti' : 'Tappa ' + x.k}</span><span>${x.mese}</span>
        </button>`;
      })}
    </div>
    <div aria-live="polite">${u
      ? html`<div key=${aperta} className="la-card" data-flat>
          <span className="la-meta">${u.k === '★' ? 'Il finale' : 'Tappa ' + u.k} · ${u.mese}</span>
          <b className="acc1-det-h">${u.t}</b>
          <p>${u.d}</p>
          ${u.extra && html`<p className="ll-hint">${u.extra}</p>`}
          ${u.con && html`<p className="acc1-con"><span className="la-meta">Con:</span> <em>${u.con}</em></p>`}
        </div>`
      : html`<div className="la-card" data-flat><p className="ll-hint">Quattro tappe e un finale. Toccate una tappa: il titolo, i mesi, i film che la accompagnano.</p></div>`}</div>
  </div>`;
});

/* La scatola delle domande: la regola, la prova per capire se una domanda è vera, il conteggio dei foglietti.
   Nessuna domanda viene scritta qui: sono a mano, senza firma, nella scatola vera. */
LabLezione.registra('Scatola', function (p) {
  var n = React.useState(0), dentro = n[0], setDentro = n[1];
  var e = React.useState(null), esito = e[0], setEsito = e[1];
  function prova(online) {
    setEsito(online ? 'ko' : 'ok');
    if (online) p.ctx.oops(); else p.ctx.cheer();
  }
  function metti() { var k = dentro + 1; setDentro(k); if (k === 1) p.ctx.say('La prima domanda dell\'anno.'); }
  return html`<div className="acc1-scatola">
    <svg className="acc1-box" viewBox="0 0 200 150" role="img" aria-label=${'Scatola delle domande: ' + dentro + (dentro === 1 ? ' domanda' : ' domande')}>
      <path d="M30 60 L100 40 L170 60 L100 80 Z" fill="var(--lab-surface-2)" stroke="var(--lab-oro)" stroke-width="2" stroke-linejoin="round" />
      <path d="M30 60 L30 125 L100 145 L100 80 Z" fill="var(--lab-surface)" stroke="var(--lab-oro)" stroke-width="2" stroke-linejoin="round" />
      <path d="M170 60 L170 125 L100 145 L100 80 Z" fill="var(--lab-surface)" stroke="var(--lab-oro)" stroke-width="2" stroke-linejoin="round" />
      <path d="M78 58 L122 46" stroke="var(--la-accent)" stroke-width="4" stroke-linecap="round" />
      ${dentro > 0 && html`<path d="M96 36 L112 31 L116 44 L100 49 Z" fill="var(--lab-oro)" stroke="var(--lab-ink)" stroke-width="1" />`}
      <text x="100" y="118" textAnchor="middle" fontSize="26" fontWeight="600" fill="var(--lab-oro)">${dentro}</text>
    </svg>
    <div>
      <p className="acc1-regola">Una domanda vera, scritta a mano, senza firma.</p>
      <p className="ll-hint">La regola: <b>se la risposta si trova cercandola online, non è quella giusta.</b></p>
      <div className="la-card acc1-prova" data-flat>
        <span className="la-meta">Prova la tua domanda</span>
        <p>La risposta si trova cercandola online?</p>
        <div className="ll-row">
          <button className="ll-btn ll-btn--ghost" type="button" aria-pressed=${esito === 'ko'} onClick=${function () { prova(true); }}>Sì, si trova</button>
          <button className="ll-btn ll-btn--ghost" type="button" aria-pressed=${esito === 'ok'} onClick=${function () { prova(false); }}>No, non si trova</button>
        </div>
        <div aria-live="polite">${esito === 'ko' && html`<p className="ll-why is-ko"><strong>Allora non è quella giusta. </strong>Cercane un'altra: una a cui nessuna ricerca risponde al posto tuo.</p>`}
        ${esito === 'ok' && html`<p className="ll-why is-ok"><strong>Allora è una domanda vera. </strong>Scrivila a mano, senza firma, e mettila nella scatola.</p>`}</div>
      </div>
      <div className="ll-row">
        <button className="ll-btn" type="button" onClick=${metti}>Una domanda nella scatola</button>
        <button className="ll-link" type="button" disabled=${dentro === 0} onClick=${function () { setDentro(Math.max(0, dentro - 1)); }}>Togli l'ultima</button>
        <span className="ll-tally" aria-live="polite">${dentro} ${dentro === 1 ? 'domanda' : 'domande'}</span>
      </div>
      <p className="ll-hint">La scatola resta in classe tutto l'anno: la apriamo la prima volta a novembre, poi ad aprile, e discutiamo quello che c'è dentro.</p>
    </div>
  </div>`;
});

/* ============================================================
   Giochi (motore LAB-IRC)
   ============================================================ */
LEZIONE.giochi = {
  tema: 'Il nome e la domanda: otto cose che si dicono sull\'ora di religione',
  vf: [
    { s: 'L\'ora di religione è obbligatoria per tutti.', v: false, why: 'Dal 1984 ciascuno sceglie se avvalersene o no. Fino a quell\'anno era il «fondamento e coronamento» dell\'istruzione pubblica; con la revisione del Concordato è diventata una scelta. — Accordo del 18 febbraio 1984, art. 9 n. 2 (legge 121/1985).' },
    { s: 'Nella scuola superiore la scelta la fa lo studente, non i genitori.', v: true, why: 'La Corte costituzionale ha chiarito che nelle secondarie superiori la titolarità della scelta è direttamente degli studenti. Per molti di voi è la prima decisione scolastica presa in prima persona. — Corte costituzionale, sentenza n. 203/1989.' },
    { s: 'In quest\'ora si prende un voto in decimi.', v: false, why: 'Si valuta, ma con un giudizio su una nota separata, non con un voto in decimi. E si valuta il lavoro, mai le convinzioni. — Normativa sulla valutazione dell\'IRC; patto della classe.' },
    { s: 'Il programma lo decide il docente insieme alla sua parrocchia.', v: false, why: 'Il programma è fissato per decreto, uguale in tutta Italia, con tre competenze dichiarate, e nessuna delle tre chiede di credere. — D.P.R. 176/2012 (Intesa MIUR–CEI).' },
    { s: 'Chi non è cattolico non può frequentare quest\'ora.', v: false, why: 'L\'ora è aperta a tutti, senza distinzione di credo. Si rivolge a chi crede, a chi non crede e a chi non lo sa ancora, esattamente allo stesso modo. — Accordo del 1984, art. 9 n. 2; Costituzione, art. 3.' },
    { s: 'Chi non si avvale deve seguire obbligatoriamente un\'altra materia.', v: false, why: 'La Corte lo chiama «stato di non-obbligo». Se l\'alternativa fosse obbligatoria, la scelta sarebbe una scelta fra due obblighi, cioè non sarebbe libera. — Corte costituzionale, sentenze n. 203/1989 e n. 13/1991.' },
    { s: 'In quest\'ora vi verrà chiesto in che cosa credete.', v: false, why: 'Mai. È il secondo obbligo del patto per chi insegna. Se qualcuno vuole dirlo, è libero di farlo; nessuno glielo chiederà e nessuno ne trarrà conseguenze. — Patto della classe, colonna di chi insegna, punto 2.' },
    { s: 'La parola «laicità» è scritta nella Costituzione italiana.', v: false, why: 'Non compare da nessuna parte. È entrata nel diritto italiano come «principio supremo» con una sentenza della Corte costituzionale, che decideva proprio sull\'ora di religione. — Corte costituzionale, sentenza n. 203/1989.' }
  ],
  quiz: [
    { q: 'Da quale anno ciascuno sceglie se avvalersi dell\'ora di religione?', a: ['1948', '1984', '2012', '1989'], ok: 1, why: 'Con la revisione del Concordato: Accordo del 18 febbraio 1984, art. 9 n. 2.' },
    { q: 'Nella scuola superiore, chi sceglie se avvalersi dell\'ora di religione?', a: ['Lo studente', 'I genitori', 'Il dirigente', 'Il docente'], ok: 0, why: 'Corte costituzionale, sentenza n. 203/1989: la titolarità della scelta è direttamente degli studenti.' },
    { q: 'Qual è la domanda dell\'anno?', a: ['Che cos\'è la Bibbia?', 'Perché studiare religione?', 'Da dove viene l\'idea che ogni persona conta?', 'Chi era Gilgamesh?'], ok: 2, why: 'Sembra ovvia e non lo è: nel mondo antico contavano i re, gli dèi e le città.' },
    { q: 'Quando una domanda va bene per la scatola?', a: ['Se è firmata', 'Se la risposta non si trova cercandola online', 'Se riguarda la religione', 'Se è scritta al computer'], ok: 1, why: 'Una domanda vera, scritta a mano, senza firma: se la risposta si trova online, non è quella giusta.' },
    { q: 'Quante sono le ore dei Talenti?', a: ['Due', 'Quattro', 'Otto', 'Sei'], ok: 3, why: 'Le ultime sei ore dell\'anno sono interamente vostre: si riparte dalla lavagna del primo giorno.' }
  ],
  abbina: [
    ['Tappa 1 · Un popolo che dice no agli dèi', 'Epopea di Gilgamesh · Il Principe d\'Egitto'],
    ['Tappa 2 · Il libro che ha scritto il nostro alfabeto', 'Il nipote del mago'],
    ['Tappa 3 · Un Dio che non sta in un tempio', 'Inside Out'],
    ['Tappa 4 · Ogni persona conta: ma perché?', 'L\'onda · Wonder'],
    ['Il finale · Talenti', 'Le ultime sei ore dell\'anno']
  ],
  sfida: [
    { q: 'Quest\'ora si può rifiutare?', a: ['No, è obbligatoria', 'Sì, dal 1984', 'Solo alle medie', 'Solo con il permesso del docente'], ok: 1 },
    { q: 'Come si valuta in quest\'ora?', a: ['Voto in decimi', 'Non si valuta', 'Giudizio su nota separata', 'Esame finale'], ok: 2 },
    { q: 'Chi decide il programma?', a: ['Il docente con la parrocchia', 'Un decreto, uguale in tutta Italia', 'Gli studenti', 'Ogni scuola'], ok: 1 },
    { q: 'Chi non è cattolico può frequentare quest\'ora?', a: ['Sì, è aperta a tutti', 'No', 'Solo se battezzato', 'Solo in prima'], ok: 0 },
    { q: 'Quando apriamo la scatola delle domande la prima volta?', a: ['Domani', 'A novembre', 'A giugno', 'Mai'], ok: 1 },
    { q: 'Con quale film si chiude la tappa 4?', a: ['Inside Out', 'Il Principe d\'Egitto', 'L\'onda e Wonder', 'Il nipote del mago'], ok: 2 }
  ]
};
