
/* ---- lezione ---- */
/* Classe III · Ora 01 · Accoglienza «Il mazzo dell'estate» — sorgente dell'artefatto (design system Lab-Irc, kit del 3 ottobre 2026).
   Conversione dell'artefatto originale (uploads/accoglienza-terza-mazzo-estate-artefatto.html): stesse carte, stesse slide, stessa mappa.
   Nessun dato viene raccolto, salvato o trasmesso: il mazzo si rimescola con il pulsante o ricaricando la pagina. */
window.LEZIONE = {
  slug: 'iii-0-1-accoglienza-il-mazzo-dell-estate',
  classe: 'Anno III',
  titolo: 'Il *mazzo* dell\'estate',
  sottotitolo: 'Ventiquattro carte per raccontarsi, una carta per tutti alla fine — e poi la mappa dell\'anno che comincia.',
  saluto: 'Ultima carta: vale per tutti, e la rileggiamo a gennaio.',
  scene: [
    /* 0–3 */
    { fase: 'Aggancio', momento: 'Apertura', minuti: 3, titolo: 'Bentornati: *ventiquattro* carte',
      lead: 'Tre mesi senza vederci. Si comincia con un mazzo: quattro semi, ventiquattro domande, quaranta secondi a testa. Poi la mappa dell\'anno.',
      blocchi: [
        { tipo: 'agenda', titolo: 'L\'ora di oggi' },
        { tipo: 'mascotte', etichetta: 'dice', t: 'Ventiquattro carte, quattro semi. E una carta, alla fine, che vale per tutti.' }
      ] },

    /* 3–25 */
    { fase: 'Attività', momento: 'Il gioco', minuti: 22, titolo: 'Pesca una *carta*',
      lead: 'Scegli un seme, rispondi in quaranta secondi, a voce. Si può sempre dire «passo» — ma solo una volta. Comincia chi insegna.',
      blocchi: [
        { tipo: 'custom', nome: 'Mazzo', props: {} }
      ] },

    /* 25–29 */
    { fase: 'Scoperta', momento: 'La domanda dell\'anno', minuti: 4, titolo: 'Chi l\'ha *deciso*?',
      lead: 'Nel mazzo c\'era una carta: «Una cosa che fai tutti i giorni e di cui non sai chi l\'ha inventata». Quasi nessuno riesce a rispondere, ed è normale.',
      blocchi: [
        { tipo: 'rivela', iniziali: 1, pulsante: 'Avanti', passi: [
          { titolo: 'Le cose che usiamo sempre diventano invisibili', testo: 'Non era una carta a caso. È la domanda su cui lavoriamo fino a giugno.' },
          { titolo: 'Avete sedici anni', testo: 'È l\'età in cui cominciate a decidere da soli. E in cui scoprite che una quantità enorme di cose era già stata decisa prima che nasceste: come funziona una scuola, cosa può fare chi comanda, quando è giusto dire no.' },
          { titolo: 'Qualcuno le ha decise davvero', testo: 'In un posto preciso e in un anno preciso. Quasi sempre nel Medioevo, e quasi sempre per ragioni che hanno a che fare con il cristianesimo.' }
        ], fine: 'Chi l\'ha deciso? È la domanda dell\'anno.' }
      ] },

    /* 29–37 */
    { fase: 'Scoperta', momento: 'Come funziona', minuti: 8, titolo: 'Ventotto ore, *sei* tappe',
      lead: 'Un\'ora a settimana. Ogni tappa dura circa un mese e comincia con una domanda.',
      testo: 'Ogni tappa dice in anticipo **a cosa vi serve** — se non serve a niente, non c\'è. A metà anno la **{verifica rovesciata}**: sarete voi a dire come sta andando. L\'ultima tappa è vostra: i **{Talenti|talenti}**.',
      blocchi: [
        { tipo: 'tappe', titolo: 'Le sei tappe', aperta: 0, voci: [
          { data: 'Tappa 1', breve: 'Storia', titolo: 'Chi ha costruito il mondo in cui vivi?',
            testo: 'Un ospedale che cura chiunque si presenti. Una scuola che rilascia un titolo valido ovunque. Una guerra con delle regole. Nessuna di queste tre cose è sempre esistita: ognuna ha una data e un nome. **A cosa vi serve:** accorgervi che quasi niente di quello che usate era obbligatorio. Qualcuno l\'ha deciso, e poteva decidere diversamente.' },
          { data: 'Tappa 2', breve: 'Teologia', titolo: 'Perché fai cose che non vuoi fare?',
            testo: 'I sette {vizi capitali} non sono una lista di peccatucci: sono un\'analisi di come un gesto ogni tanto diventa un\'abitudine, e di come un\'abitudine diventa un carattere. Con un dipinto del 1933 che li usa per raccontare il crollo di una nazione. **A cosa vi serve:** la differenza fra «sono fatto così» e «ho preso un\'abitudine». Solo la seconda si può cambiare.' },
          { data: 'Tappa 3', breve: 'Filosofia', titolo: 'È da stupidi credere?',
            testo: 'Quante delle cose che sapete per certe le avete verificate di persona? Quasi nessuna. Distingueremo quattro modi di essere sicuri: la dimostrazione, l\'esperimento, la testimonianza di qualcuno, la fiducia. **A cosa vi serve:** sapere di quali fonti vi fidate e perché. Vale per un professore, per un video e per una macchina che risponde a tutto.' },
          { data: 'Metà anno', breve: 'A metà strada', titolo: 'La verifica rovesciata',
            testo: 'Un\'ora intera in cui le domande le fate voi e rispondo io: cosa ha funzionato, cosa no, cosa cambiamo. Le attese che avete detto oggi le rileggiamo quel giorno. Per questo oggi le scrivo tutte alla lavagna. Fotografia compresa.' },
          { data: 'Tappa 4', breve: 'Politica e coscienza', titolo: 'C\'è un ordine che non devi eseguire?',
            testo: 'Un re costretto ad aspettare tre giorni sotto la neve, nel 1077, davanti a una porta chiusa. È il momento in cui l\'Europa scrive per la prima volta che chi comanda non è l\'ultima parola. **A cosa vi serve:** un motivo per dire no che regga anche quando tutti intorno stanno dicendo sì.' },
          { data: 'Tappa 5', breve: 'Bibbia', titolo: 'Chi sei quando nessuno ti guarda?',
            testo: 'Una carta del mazzo chiedeva come vi chiamano gli amici e come vi chiamano in famiglia. Quattro testi biblici fanno la stessa domanda, molto più sul serio: uno di questi è un uomo che lotta tutta la notte e alla fine riceve un nome nuovo. **A cosa vi serve:** distinguere quello che gli altri registrano di voi da quello che siete.' },
          { data: 'Tappa 6', breve: 'Sei ore · fine anno', titolo: 'Talenti',
            testo: 'Sei ore a fine anno. In gruppo, ognuno mette in gioco davanti a un pubblico ciò che sa fare — e nel mazzo c\'era già una carta che lo chiedeva. Iniziate a pensarci oggi, non a maggio. L\'anticipo è ciò che permette di scegliere davvero.' }
        ] }
      ] },

    /* 37–41 */
    { fase: 'Scoperta', momento: 'Come si lavora', minuti: 4, titolo: 'Come si lavora, come si *valuta*',
      lead: 'Ogni lezione ha tre materiali. A fine anno contano tre cose.',
      testo: 'Nessuno è valutato per ciò che crede. Tutti per ciò che capiscono e per come lo argomentano.',
      blocchi: [
        { tipo: 'carte', titolo: 'Tre materiali per ogni lezione', carte: [
          { etichetta: 'Si legge', fronte: 'Fascicolo', retro: 'Da leggere a casa, scritto come un atto: si legge, si sottolinea.' },
          { etichetta: 'Si vede', fronte: 'Slide', retro: 'Proiettate in aula: si vede.' },
          { etichetta: 'Si fa', fronte: 'Lezione interattiva', retro: 'Si riapre dal telefono: si fa.' },
          { etichetta: 'A fine tappa', fronte: 'Verifica', retro: 'Cinquanta domande in quarantacinque minuti. Tutto sta sulla piattaforma della classe.' }
        ] },
        { tipo: 'idee', titolo: 'Tre cose contano', pulsante: 'La prima', idee: [
          'Come partecipate: le domande valgono quanto le risposte.',
          'Le verifiche di fine tappa.',
          'I {Talenti|talenti}, con una griglia che conoscete in anticipo.'
        ] }
      ] },

    /* 41–45 */
    { fase: 'Scoperta', momento: 'Il patto', minuti: 4, titolo: 'Tre regole, *anche* per me',
      lead: 'Valgono per chi impara e per chi insegna.',
      blocchi: [
        { tipo: 'rivela', iniziali: 1, pulsante: 'La regola successiva', passi: [
          { titolo: 'Ogni affermazione ha una fonte', testo: 'Chiedere «come lo sappiamo?» è sempre legittimo, anche verso chi insegna.' },
          { titolo: 'Si può dissentire', testo: 'Purché con argomenti.' },
          { titolo: 'Nessuno qui è obbligato a credere', testo: 'Tutti sono invitati a capire.' }
        ], fine: 'Tre regole: valgono anche per me.' },
        { tipo: 'aggancio', etichetta: 'La prossima ora', titolo: 'Sotto casa vostra.',
          t: 'A Roma, sul Tevere, c\'è un edificio che a un certo punto ha cominciato a fare una cosa che nessuno al mondo faceva: curare chiunque si presentasse alla porta, senza chiedere chi fosse, da dove venisse o chi pagasse.\n\nTra sette giorni andiamo a vedere quando è successo, chi l\'ha deciso e perché. E che cosa c\'entra con il pronto soccorso in cui finite quando vi rompete un braccio.' }
      ] },

    /* 45–50 */
    { fase: 'Chiusura', momento: 'Chiusura', minuti: 5, titolo: 'La *carta* dell\'anno',
      lead: 'Una carta sola, per tutti. Un giro rapido, senza commento.',
      blocchi: [
        { tipo: 'nuvola', id: 'carta-anno', q: 'Una cosa che vorresti decidere tu, quest\'anno.',
          istruzione: 'Tutti, un giro rapido: una parola chiave a testa. Va alla lavagna, e la rileggiamo a gennaio.' },
        { tipo: 'continua', voci: [
          { t: 'A gennaio', d: 'Le parole di oggi tornano alla {verifica rovesciata}: sarete voi a dire come sta andando.' },
          { t: 'Tra sette giorni', d: 'Sotto casa vostra: quando è successo, chi l\'ha deciso e perché.' },
          { t: 'Un altro giro', d: 'Torna all\'inizio e rimescola il mazzo.', vai: 'inizio' }
        ] }
      ] }
  ],

  glossario: {
    'talenti': { parola: 'Talenti', etim: 'Dal greco *tálanton*, «bilancia, peso»: in origine un\'unità di peso e di moneta. Il senso di «dote, capacità» viene dalla parabola dei talenti (Mt 25,14-30).', def: 'L\'ultima tappa dell\'anno, sei ore: in gruppo, ognuno mette in gioco davanti a un pubblico ciò che sa fare. Si sceglie da oggi, non a maggio.' },
    'verifica rovesciata': { parola: 'Verifica rovesciata', def: 'Un\'ora, a metà anno, in cui le domande le fanno gli studenti e risponde chi insegna: cosa ha funzionato, cosa no, cosa cambiamo. Le attese dette oggi si rileggono quel giorno.' },
    'vizi capitali': { parola: 'Vizi capitali', etim: 'Dal latino *vitium*, «difetto», e *caput*, «testa»: capitali perché sono la testa, cioè l\'origine, di altri vizi.', def: 'Sette, nella tradizione cristiana. Nella tappa 2 li leggiamo come analisi di come un gesto occasionale diventa abitudine e un\'abitudine diventa carattere.' },
    'obiezione di coscienza': { parola: 'Obiezione di coscienza', etim: '*Coscienza* dal latino *conscientia*, «sapere insieme, essere consapevoli» (*cum* + *scire*).', def: 'Il rifiuto di eseguire un ordine o una legge che la propria coscienza giudica ingiusti. Nella tappa 4 vediamo da dove viene l\'idea che il potere non sia l\'ultima parola.' }
  },

  studio: {
    sezioni: [
      { titolo: 'La domanda', testo: 'Quest\'anno ha una domanda sola, e nel gioco c\'era già una carta che la faceva: **chi l\'ha deciso?** Un ospedale che cura chiunque, una scuola che rilascia un titolo, il fatto che chi comanda debba rispettare delle regole, l\'idea che tu valga qualcosa anche quando non produci niente. Sono cose che sembrano naturali e non lo sono: ognuna è stata decisa da qualcuno, in un anno preciso, spesso per ragioni religiose. Il percorso attraversa il Medioevo, che è il periodo in cui quasi tutte queste decisioni sono state prese, ma ogni tappa dice in anticipo a che cosa serve oggi.' },
      { titolo: 'Le sei tappe', testo: '**1. Chi ha costruito il mondo in cui vivi?** (Storia · circa un mese). Quattro invenzioni che usiamo ancora: l\'ospedale aperto a tutti, l\'università, le prime regole scritte su cosa non si può fare in guerra, il lavoro manuale che smette di essere una vergogna. Con le ombre di quegli stessi secoli, senza sconti. *A cosa serve:* accorgersi che quasi niente di ciò che usiamo era obbligatorio.\n\n**2. Perché fai cose che non vuoi fare?** (Teologia · circa un mese). I sette {vizi capitali} come analisi di come un gesto occasionale diventa abitudine e un\'abitudine diventa carattere. Ogni vizio ribalta un ordine: nella gola non sei più tu a mangiare il cibo, è il cibo a mangiare te. Con un dipinto del 1933 che li usa per raccontare un Paese che sta per crollare. *A cosa serve:* la differenza fra «sono fatto così» e «ho preso un\'abitudine».\n\n**3. È da stupidi credere?** (Filosofia · circa un mese). Quattro modi di essere sicuri di qualcosa — dimostrazione, esperimento, testimonianza, fiducia — e il fatto, scomodo, che quasi tutto ciò che sappiamo poggia sul terzo. Poi due scorciatoie speculari: chi dice che conta solo la scienza e chi dice che non conta affatto. *A cosa serve:* sapere di quali fonti ci si fida e perché.\n\nA metà anno, la {verifica rovesciata}: un\'ora in cui le domande le fate voi.\n\n**4. C\'è un ordine che non devi eseguire?** (Politica e coscienza · circa un mese). Un re che aspetta tre giorni sotto la neve nel 1077 davanti a una porta chiusa, e la nascita dell\'idea che il potere politico non sia l\'ultima parola. Da lì arrivano l\'{obiezione di coscienza} e la frase «eseguivo ordini», che a Norimberga non è bastata. *A cosa serve:* un motivo per dire no che regga anche quando tutti stanno dicendo sì.\n\n**5. Chi sei quando nessuno ti guarda?** (Bibbia · circa un mese). Quattro testi sul nome e sull\'identità: un salmo, un uomo che lotta una notte intera e riceve un nome nuovo, la chiamata di un ragazzo troppo giovane, e una domanda fatta ai discepoli senza preavviso. *A cosa serve:* distinguere ciò che gli altri registrano di te da ciò che sei.\n\n**6. {Talenti}** (Sei ore · fine anno). In gruppo, ognuno mette in gioco davanti a un pubblico ciò che sa fare. Si sceglie da oggi, non a maggio: l\'anticipo è ciò che rende possibile una scelta vera.' },
      { titolo: 'Come si lavora e come si valuta', testo: 'Ogni lezione ha tre materiali: un fascicolo da leggere a casa, scritto come un atto, che si sottolinea e si rilegge; le slide proiettate in aula; una lezione interattiva che si riapre dal telefono. A fine tappa, cinquanta domande in quarantacinque minuti. Tutto sta sulla piattaforma della classe.\n\nContano tre cose: come si partecipa — le domande valgono quanto le risposte —, le verifiche di fine tappa e i {Talenti|talenti}, valutati con una griglia che conoscete in anticipo. Nessuno è valutato per ciò che crede; tutti per ciò che capiscono e per come lo argomentano.' },
      { titolo: 'Il patto', testo: 'Ogni affermazione ha una fonte. Chiedere «come lo sappiamo?» è sempre legittimo, anche verso chi insegna.\n\nSi può dissentire, purché con argomenti.\n\nNessuno qui è obbligato a credere. Tutti sono invitati a capire.\n\nE la carta dell\'anno, quella che vale per tutti: **una cosa che vorresti decidere tu, quest\'anno.** Detta oggi, scritta alla lavagna, riletta a gennaio.' }
    ],
    fonti: [
      'Mappa dell\'anno «Chi l\'ha deciso?» e mazzo dell\'estate: materiali del docente per la classe III (Matteo Sestili)'
    ]
  }
};

/* ============================================================
   Componenti su misura
   ============================================================ */

/* Il mazzo dell'estate: quattro semi, ventiquattro carte; una carta alla volta, senza ripetizioni;
   «Carta a caso», «Rimescola» (a due tocchi) e il cronometro visivo dei quaranta secondi.
   Stato solo in memoria: niente viene salvato. */
LabLezione.registra('Mazzo', function (p) {
  var SEMI = [
    { nome: 'Estate', col: 'var(--lab-oro)', carte: [
      'L\'estate in una parola. Poi spiegala in una frase.',
      'Una cosa che hai fatto per la prima volta.',
      'Il posto più bello in cui sei stato. Vale anche a due chilometri da casa.',
      'La canzone che hai ascoltato di più. E perché non ti sei ancora stancato.',
      'Una giornata intera passata a non fare niente: raccontala.',
      'Una persona con cui hai passato più tempo del solito.',
      'Una cosa che hai mangiato e che ti ricorderai.'
    ] },
    { nome: 'Attese', col: 'var(--lab-verde)', carte: [
      'Una cosa che vuoi fare diversamente rispetto all\'anno scorso. Non vale dire «studiare di più».',
      'Una materia che ti preoccupa quest\'anno. Di\' anche perché.',
      'Cosa sai fare che quasi nessuno qui sa fare. Serve per la fine dell\'anno.',
      'Cosa ti aspetti dall\'ora di religione. Vale anche «niente», ma spiegalo.',
      'Una cosa che vuoi aver imparato entro giugno. Anche fuori dalla scuola.',
      'Una cosa che vorresti succedesse in questa classe quest\'anno.',
      'Se potessi togliere una cosa dalla giornata di scuola, quale?'
    ] },
    { nome: 'Domande', col: 'var(--lab-ciano, var(--la-accent))', carte: [
      'Una cosa che fai tutti i giorni e di cui non sai chi l\'ha inventata.',
      'Un\'abitudine che vorresti toglierti. Non dire quale: di\' solo da quanto tempo ce l\'hai.',
      'Una cosa che tutti danno per vera e che a te non convince.',
      'Ti è mai capitato di dire sì a qualcosa solo perché lo dicevano tutti?',
      'Come ti chiamano gli amici e come ti chiamano in famiglia. È la stessa persona?',
      'Una domanda che hai fatto a un adulto e a cui non ti ha risposto davvero.'
    ] },
    { nome: 'Sfide', col: 'var(--lab-rosso)', carte: [
      'Due verità e una bugia sulla tua estate. La classe indovina la bugia.',
      'La tua estate in tre emoji, dette a voce. La classe le interpreta.',
      'Il titolo del film della tua estate. Il genere è obbligatorio.',
      'Presenta chi siede alla tua destra come se fosse un ospite famoso. Trenta secondi.'
    ] }
  ];
  var TOT = SEMI.reduce(function (a, s) { return a + s.carte.length; }, 0), T = 40;
  function fresco() { return SEMI.map(function (s) { return s.carte.slice(); }); }
  var r = React.useState(fresco), rimaste = r[0], setRimaste = r[1];
  var c = React.useState(null), carta = c[0], setCarta = c[1];
  var n = React.useState(0), pescate = n[0], setPescate = n[1];
  var tm = React.useState(T), resto = tm[0], setResto = tm[1];
  var rn = React.useState(false), run = rn[0], setRun = rn[1];
  var ar = React.useState(false), armato = ar[0], setArmato = ar[1];
  var tArm = React.useRef(0);
  React.useEffect(function () { return function () { clearTimeout(tArm.current); }; }, []);
  React.useEffect(function () {
    if (!run) return;
    var t = setInterval(function () { setResto(function (x) { if (x <= 1) { setRun(false); return 0; } return x - 1; }); }, 1000);
    return function () { clearInterval(t); };
  }, [run]);
  function azzeraTimer() { setRun(false); setResto(T); }
  function pesca(i) {
    var m = rimaste[i]; if (!m || !m.length) return;
    var j = Math.floor(Math.random() * m.length), testo = m[j];
    setRimaste(rimaste.map(function (a, k) { return k === i ? a.filter(function (_, q) { return q !== j; }) : a; }));
    setCarta({ s: i, t: testo, id: pescate + 1 });
    setPescate(pescate + 1);
    azzeraTimer();
    if (pescate + 1 === TOT) p.ctx.say('Mazzo finito: ventiquattro carte, ventiquattro racconti.');
  }
  function aCaso() {
    var disp = []; rimaste.forEach(function (m, i) { if (m.length) disp.push(i); });
    if (!disp.length) return;
    pesca(disp[Math.floor(Math.random() * disp.length)]);
  }
  function rimescola() {
    clearTimeout(tArm.current);
    if (!armato) { setArmato(true); tArm.current = setTimeout(function () { setArmato(false); }, 3000); return; }
    setArmato(false); setRimaste(fresco()); setCarta(null); setPescate(0); azzeraTimer();
  }
  var S = carta ? SEMI[carta.s] : null, finito = pescate >= TOT;
  var CSS = '.m3-semi{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-bottom:21px}' +
    '@media(min-width:640px){.m3-semi{grid-template-columns:repeat(4,1fr)}}' +
    '.m3-seme.la-choice{flex-direction:column;align-items:flex-start;gap:3px;padding:13px}' +
    '.m3-seme.la-choice:hover:not(:disabled){transform:translateY(-2px)}' +
    '.m3-seme[aria-pressed="true"]{border-color:var(--lab-oro)}' +
    '.m3-seme:disabled{opacity:.38}' +
    '.m3-seme small{color:var(--lab-muted);font-size:12.5px}' +
    '.m3-dot{display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:8px;vertical-align:middle;flex:none}' +
    '.m3-carta{min-height:233px;display:flex;flex-direction:column;justify-content:center;gap:13px;padding:34px 21px;animation:m3flip 450ms var(--lab-ease-out,ease)}' +
    '.m3-carta.is-vuota{background:transparent;border-style:dashed;box-shadow:none;text-align:center;animation:none}' +
    '.m3-carta .la-meta{display:flex;align-items:center}' +
    '.m3-testo{font:600 clamp(22px,4.6vw,34px)/1.2 var(--lab-font-display,serif);color:var(--lab-ink);margin:0;text-wrap:balance}' +
    '.m3-testo--vuoto{color:var(--lab-muted);font-size:20px}' +
    '@keyframes m3flip{from{transform:rotateY(90deg);opacity:0}to{transform:none;opacity:1}}' +
    '@media(prefers-reduced-motion:reduce){.m3-carta{animation:none}}' +
    '.m3-timer{display:flex;align-items:center;gap:13px;flex-wrap:wrap;margin-top:13px}' +
    '.m3-barra{flex:1;min-width:89px;height:3px;background:var(--lab-line);border-radius:2px;overflow:hidden}' +
    '.m3-barra i{display:block;height:100%;background:var(--lab-oro);transition:width 1s linear}' +
    '.m3-cifra{font:600 26px/1 var(--lab-font-display,serif);min-width:2.2em;text-align:right;font-variant-numeric:tabular-nums;color:var(--lab-ink)}' +
    '.m3-timer.is-fine .m3-cifra{color:var(--lab-rosso)}';
  return html`<div className="m3">
    <style>${CSS}</style>
    <div className="m3-semi" role="group" aria-label="Semi del mazzo">
      ${SEMI.map(function (s, i) {
        var q = rimaste[i].length;
        return html`<button key=${s.nome} type="button" className="la-choice m3-seme" disabled=${!q} aria-pressed=${!!(carta && carta.s === i)} onClick=${function () { pesca(i); }}>
          <b><i className="m3-dot" style=${{ background: s.col }} aria-hidden="true"></i>${s.nome}</b>
          <small>${q} ${q === 1 ? 'carta' : 'carte'}</small>
        </button>`;
      })}
    </div>
    <div key=${carta ? carta.id : 'vuota'} className=${'la-card m3-carta' + (carta ? '' : ' is-vuota')} data-flat aria-live="polite">
      ${carta
        ? html`<span className="la-meta"><i className="m3-dot" style=${{ background: S.col }} aria-hidden="true"></i>${S.nome}</span>
               <p className="m3-testo">${carta.t}</p>
               <p className="ll-hint">Quaranta secondi, a voce. «Passo» vale una volta sola.</p>`
        : html`<p className="m3-testo m3-testo--vuoto">${finito ? 'Mazzo finito. Rimescola per un altro giro.' : 'Il mazzo è coperto. Scegli un seme.'}</p>`}
    </div>
    <div className="ll-row">
      <button className="ll-btn" disabled=${finito} onClick=${aCaso}>Carta a caso</button>
      <button className="ll-btn ll-btn--ghost" onClick=${rimescola}>${armato ? 'Sicuro? Tocca ancora' : 'Rimescola'}</button>
      <span className="ll-tally" aria-live="polite">Carte pescate: ${pescate} di ${TOT}</span>
    </div>
    <div className=${'m3-timer' + (resto <= 10 && resto > 0 ? ' is-fine' : '')} role="timer" aria-label="Cronometro di quaranta secondi">
      <button className="ll-btn ll-btn--ghost" onClick=${function () { if (run) { azzeraTimer(); return; } if (resto === 0) setResto(T); setRun(true); }}>${run ? 'Ferma' : resto === T ? 'Avvia 40 s' : resto === 0 ? 'Di nuovo' : 'Riprendi'}</button>
      <span className="m3-barra" aria-hidden="true"><i style=${{ width: (100 * resto / T) + '%' }}></i></span>
      <b className="m3-cifra" aria-live="off">${resto}</b>
    </div>
  </div>`;
});
