/* ---- lezione ---- */
/* Classe I · UDA 1 «L’uomo che cerca oltre: il senso religioso» · Lezione 1 — «Credo, non credo, non so».
   Artefatto interattivo, 7 ottobre 2026, rifatto con la skill «IRC · Artefatto interattivo della lezione».
   Contenuti: fascicolo uploads/i-1-1-credo-non-credo-non-so-fascicolo.pdf (sezioni A–G) e versione precedente dell’artefatto.
   Tommaso d’Aquino, Summa theologiae I, q. 2, a. 3, ob. 1 e ad 1: traduzione dal latino a cura dell’autore (come nel fascicolo).
   Magistero: testi italiani della Santa Sede citati come nel fascicolo; in questa sessione la rete non permetteva
   di riscontrarli su vatican.va (vedi note del docente). Etimologie: Vocabolario Treccani.
   Il CSS dei componenti propri è dentro questo file (non serve --css).
   © Matteo Sestili — Tutti i diritti riservati */

/* =====================================================================
   COMPONENTI PROPRI
   ===================================================================== */
(function () {
  var LL = window.LabLezione, I = LL.inline, useState = React.useState;

  /* Memoria in pagina: tornando alla scena il componente riprende da dove era. Nulla va nel browser. */
  var MEM = {};
  function useMem(key, iniziale) {
    var s = useState(function () { return Object.prototype.hasOwnProperty.call(MEM, key) ? MEM[key] : iniziale; });
    return [s[0], function (v) { MEM[key] = v; s[1](v); }];
  }

  /* ---------- CSS dei componenti (solo token del design system) ---------- */
  if (typeof document !== 'undefined' && !document.getElementById('cn1-css')) {
    var st = document.createElement('style'); st.id = 'cn1-css';
    st.textContent = [
      '.vi{display:grid;gap:21px}',
      '.vi-top{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px 13px;padding-right:68px;min-height:34px}',
      '.vi-pips{display:inline-flex;gap:5px}',
      '.vi-pips i{width:10px;height:10px;border-radius:50%;border:1.5px solid var(--lab-line);display:block}',
      '.vi-pips i.is-on{border-color:var(--la-accent);background:var(--la-accent)}',
      '.vi-pips i.is-ok{border-color:var(--lab-verde);background:var(--lab-verde)}',
      '.vi-pips i.is-ko{border-color:var(--lab-rosso);background:var(--lab-rosso)}',
      '.vi-stage{position:relative;display:grid;grid-template-columns:1fr 1fr;gap:21px;align-items:stretch;padding:21px 34px;border-radius:21px;background:var(--lab-surface);border:1px solid var(--lab-line);overflow:hidden}',
      '.vi-tile{position:relative;z-index:1;display:flex;flex-direction:column;justify-content:center;gap:5px;min-height:89px;padding:13px 15px;border-radius:13px;border:1.5px solid var(--lab-line);background:var(--lab-surface-2);color:var(--lab-ink);font:600 21px/1.2 var(--lab-font-display);transition:transform 610ms cubic-bezier(.16,1,.3,1),border-color 233ms,box-shadow 233ms}',
      '.vi-tile small{font:600 11px/1 var(--lab-font-inscription);letter-spacing:.16em;text-transform:uppercase;color:var(--lab-muted)}',
      '.vi-tile.is-pers{border-style:dashed}',
      '.vi-stage.is-insieme .vi-a{transform:translateX(8px);border-color:var(--lab-verde)}',
      '.vi-stage.is-insieme .vi-b{transform:translateX(-8px);border-color:var(--lab-verde)}',
      '.vi-stage.is-escluse .vi-a{transform:translateX(-8px) rotate(-1.5deg);border-color:var(--lab-rosso)}',
      '.vi-stage.is-escluse .vi-b{transform:translateX(8px) rotate(1.5deg);border-color:var(--lab-rosso)}',
      '.vi-mid{position:absolute;left:50%;top:50%;z-index:2;transform:translate(-50%,-50%) scale(.4);opacity:0;width:44px;height:44px;border-radius:50%;display:grid;place-items:center;font:800 20px/1 var(--lab-font-body);transition:transform 610ms cubic-bezier(.16,1,.3,1) 144ms,opacity 233ms 144ms}',
      '.vi-stage.is-insieme .vi-mid{opacity:1;transform:translate(-50%,-50%) scale(1);background:var(--lab-surface);border:2.5px solid var(--lab-verde);color:var(--lab-verde);box-shadow:0 0 0 5px var(--lab-oro-soft)}',
      '.vi-stage.is-escluse .vi-mid{opacity:1;transform:translate(-50%,-50%) scale(1);background:var(--lab-surface);border:2.5px solid var(--lab-rosso);color:var(--lab-rosso)}',
      '.vi-choices{display:grid;gap:8px;grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))}',
      '.vi-end{display:grid;gap:13px;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr))}',
      '.vi-row{padding:15px 18px;border-radius:13px;border:1.5px solid var(--lab-line);background:var(--lab-surface)}',
      '.vi-row b{display:block;font:600 22px/1.2 var(--lab-font-display);color:var(--lab-ink);margin-bottom:5px}',
      '.vi-row span{font-size:15px;line-height:1.5;color:var(--lab-ink-soft)}',
      '.vi-row.is-pers{border-style:dashed;border-color:var(--lab-oro)}',
      '.vi-row.is-tesi{border-color:var(--la-accent)}',
      '@media (max-width:440px){.vi-stage{gap:21px;padding:13px}.vi-tile{font-size:17px;padding:10px 12px;min-height:76px;overflow-wrap:anywhere}.vi-stage.is-insieme .vi-a{transform:translateX(5px)}.vi-stage.is-insieme .vi-b{transform:translateX(-5px)}.vi-stage.is-escluse .vi-a{transform:translateX(-2px) rotate(-1.5deg)}.vi-stage.is-escluse .vi-b{transform:translateX(2px) rotate(1.5deg)}.vi-mid{width:34px;height:34px;font-size:16px}}',
      '@media (prefers-reduced-motion:reduce){.vi-tile,.vi-mid{transition:none}}'
    ].join('\n');
    (document.head || document.documentElement).appendChild(st);
  }

  /* ---------- VeroInsieme: possono essere vere insieme? (concetto più difficile) ----------
     Cinque coppie di frasi, una alla volta. La classe decide prima: «possono stare insieme» o «si escludono».
     Le due tessere si avvicinano e si saldano (verde, ✓) oppure si respingono (rosso, ✕): esito con il perché.
     Le frasi su una persona hanno il bordo tratteggiato: si vede che il rispetto riguarda le persone, la verità le tesi.
     Interazioni: due la-choice (hover bordo oro +3 px, active 0,97, focus oro; esito verde/rosso con parola),
     «Prossima coppia» (ll-btn), «Riprova» e «Ricomincia» (ll-link). Stato solo in memoria. */
  var COPPIE = [
    { a: 'Dio esiste', b: 'Dio non esiste', insieme: false,
      why: 'Una afferma esattamente ciò che l’altra nega: se una è vera, l’altra è falsa. È il **principio di non contraddizione**, lo stesso della matematica.' },
    { a: 'Dio esiste', b: 'Non possiamo saperlo con certezza', insieme: true,
      why: 'La prima frase parla di **Dio**, la seconda di **ciò che noi sappiamo**. Dio potrebbe esistere anche se noi non riuscissimo a esserne certi.' },
    { a: 'Dio non esiste', b: 'Chi crede merita rispetto', pb: true, insieme: true,
      why: 'La prima è una **tesi**, la seconda riguarda una **persona**. Si può negare Dio e rispettare profondamente chi crede: e viceversa.' },
    { a: 'Tutte le risposte su Dio sono vere', b: 'Dio non esiste', insieme: false,
      why: 'Se tutte le risposte fossero vere, sarebbe vera anche «Dio esiste», che contraddice «Dio non esiste». «Tutto è vero» sembra gentile, ma non regge: **toglie serietà alla domanda**.' },
    { a: 'Rispetto chi la pensa diversamente', pa: true, b: 'Penso che abbia torto', insieme: true,
      why: 'È la coppia più importante. Rispettare non vuol dire dare ragione: vuol dire **conoscere bene le ragioni dell’altro** e discuterle senza costringere nessuno.' }
  ];

  LL.registra('VeroInsieme', function (p) {
    var s = useMem('vi-k', 0), k = s[0], setK = s[1];
    var a = useMem('vi-pick', null), pick = a[0], setPick = a[1];
    var r = useMem('vi-res', []), res = r[0], setRes = r[1];
    var n = COPPIE.length, fine = k >= n, c = COPPIE[k] || {};
    function scegli(v) {
      if (pick !== null) return;
      var ok = v === c.insieme; setPick(v);
      var nr = res.slice(); if (nr[k] == null) nr[k] = ok; setRes(nr);
      if (ok) p.ctx.cheer(); else p.ctx.oops();
    }
    function avanti() {
      setPick(null); setK(k + 1);
      if (k + 1 >= n) { p.ctx.festa(); p.ctx.say('Le persone si rispettano tutte; le tesi si discutono.'); }
    }
    var giuste = res.filter(Boolean).length;
    if (fine) return html`<div className="vi">
      <div className="vi-top"><span className="la-meta">Cinque coppie · ${giuste} giuste al primo tentativo</span></div>
      <div className="vi-end">
        <div className="vi-row is-pers"><b>Le persone</b><span>meritano tutte lo stesso rispetto, qualunque cosa rispondano.</span></div>
        <div className="vi-row is-tesi"><b>Le tesi</b><span>non possono essere tutte vere insieme: si conoscono bene e si discutono.</span></div>
      </div>
      <p className="ll-gloss">${I('**Rispetto non vuol dire «tutto uguale».** Dire «ognuno ha la sua verità» sembra gentile, ma se tutto è vero nessuno ha davvero qualcosa da dirmi.', 'f')}</p>
      <div className="ll-row"><button className="ll-link" onClick=${function () { setK(0); setPick(null); setRes([]); }}>Ricomincia dalla prima coppia</button></div>
    </div>`;
    var stato = pick === null ? '' : (c.insieme ? ' is-insieme' : ' is-escluse');
    var ok = pick !== null && pick === c.insieme;
    return html`<div className="vi">
      <div className="vi-top">
        <span className="la-meta">Possono essere vere insieme?</span>
        <span className="vi-pips" aria-hidden="true">${COPPIE.map(function (_, i) { return html`<i key=${i} className=${res[i] === true ? 'is-ok' : res[i] === false ? 'is-ko' : i === k ? 'is-on' : ''}></i>`; })}</span>
        <span className="ll-tally">${k + 1} / ${n}</span>
      </div>
      <div className=${'vi-stage' + stato} key=${'st' + k}>
        <div className=${'vi-tile vi-a' + (c.pa ? ' is-pers' : '')}><small>${c.pa ? 'Una persona' : 'Una tesi'}</small>«${c.a}»</div>
        <div className=${'vi-tile vi-b' + (c.pb ? ' is-pers' : '')}><small>${c.pb ? 'Una persona' : 'Una tesi'}</small>«${c.b}»</div>
        <span className="vi-mid" aria-hidden="true">${pick === null ? '' : c.insieme ? '✓' : '✕'}</span>
      </div>
      <div className="vi-choices">
        ${[true, false].map(function (v) {
          var cls = 'la-choice' + (pick === null ? '' : v === c.insieme ? ' is-right' : v === pick ? ' is-wrong' : ' is-dim');
          return html`<button key=${k + '-' + v} className=${cls} disabled=${pick !== null} onClick=${function () { scegli(v); }}>${v ? 'Possono stare insieme' : 'Si escludono'}</button>`;
        })}
      </div>
      <div aria-live="polite">${pick !== null && html`<p className=${'ll-why ' + (ok ? 'is-ok' : 'is-ko')}><strong>${ok ? 'Esatto. ' : 'Non proprio. '}</strong>${I(c.why, 'w' + k)}</p>`}</div>
      ${pick !== null && html`<div className="ll-row">
        <button className="ll-btn" onClick=${avanti}>${k < n - 1 ? 'Prossima coppia' : 'Vedi il quadro'}</button>
        ${!ok && html`<button className="ll-link" onClick=${function () { setPick(null); }}>Riprova</button>`}
      </div>`}
    </div>`;
  });
})();

/* =====================================================================
   LEZIONE
   ===================================================================== */
window.LEZIONE = {
  slug: 'i-1-1-credo-non-credo-non-so',
  classe: 'Anno I',
  titolo: 'Credo, non credo, *non so*',
  sottotitolo: 'Tre risposte precise alla domanda più diretta: Dio esiste?',
  saluto: 'Ultima tappa: ogni risposta ha un nome. E adesso i nomi li avete voi.',
  glossario: {
    'teismo': { parola: 'Teismo', etim: 'dal greco *theós*, «dio»', def: 'La posizione di chi afferma che esiste un Dio **personale**, creatore del mondo, che conosce l’uomo e se ne prende cura. Ebrei, cristiani e musulmani sono teisti, pur con differenze profonde.' },
    'ateismo': { parola: 'Ateismo', etim: 'dal greco *á-theos*: *a-* privativo, «senza», e *theós*, «dio»', def: 'La posizione di chi nega che Dio esista. Si dice **teorico** quando la negazione è sostenuta con argomenti.' },
    'agnosticismo': { parola: 'Agnosticismo', etim: 'dal greco *ágnōstos*, «non conosciuto, non conoscibile»; la parola è coniata da T. H. Huxley intorno al 1869, in contrapposizione agli «gnostici» che pretendevano di sapere tutto', def: 'La posizione di chi ritiene che la ragione umana non possa né affermare né negare l’esistenza di Dio, e perciò **sospende il giudizio**.' },
    'indifferenza': { parola: 'Indifferenza', etim: 'dal latino *indifferens*: *in-*, «non», e *differens*, «che fa differenza»', def: 'L’atteggiamento di chi mette da parte la domanda su Dio perché non lo tocca. Non è una quarta tesi: è una non-risposta.' },
    'ateismo pratico': { def: 'Vivere **come se** Dio non ci fosse, anche senza negarlo e perfino dichiarandosi credenti. Riguarda come si vive, non che cosa si pensa.' },
    'personale': { def: 'Detto di Dio: che è **qualcuno e non qualcosa**, capace di conoscere, volere e rivolgere la parola. Non vuol dire che sia un uomo più grande.' },
    'credere': { etim: 'dal latino *credere*, «affidare, prestare fiducia»; molti linguisti lo collegano a un’antica formula indoeuropea che significa «porre il cuore» (ipotesi diffusa, non certa)', def: 'Affidarsi a qualcuno. Per questo chi crede non smette di pensare né di fare domande.' },
    'sospendere il giudizio': { def: 'Non affermare e non negare, perché si ritiene di non avere elementi sufficienti per decidere.' },
    'obiezione': { etim: 'dal latino *obiectio*, da *obicere*, «mettere davanti, opporre»', def: 'Un argomento messo davanti a una tesi per metterla alla prova. Una buona obiezione si presenta nella sua forma più forte.' },
    'principio di non contraddizione': { def: 'Due affermazioni che si negano a vicenda non possono essere vere insieme e sotto lo stesso aspetto. Lo formula Aristotele (*Metafisica* IV) e lo usa anche la matematica.' },
    'rispetto': { etim: 'dal latino *respectus*, da *respicere*, «guardare indietro, considerare»', def: 'Guardare l’altro con attenzione, prendendo sul serio le sue ragioni. Non vuol dire dargli ragione.' },
    'ragione': { etim: 'dal latino *ratio*, «calcolo, ragionamento»', def: 'La capacità umana di capire, collegare e argomentare. Per la Chiesa cattolica può riconoscere Dio a partire dalle cose create (CCC 36).' }
  },

  scene: [
    /* 1 · APERTURA ------------------------------------------------------ */
    { fase: 'Aggancio', momento: 'Apertura', minuti: 4, titolo: 'Credo, non credo, *non so*',
      lead: 'Alla domanda «Dio esiste?» ciascuno ha già una risposta, anche quando è un «boh».',
      blocchi: [
        { tipo: 'domanda', id: 'ingresso', etichetta: 'Anonimo · per alzata di mano',
          q: '«Su Dio ognuno ha la sua verità.» Siete d’accordo?',
          opzioni: ['Sì, del tutto', 'In parte', 'No', 'Non saprei'],
          dibattito: 'Teniamo questi numeri: alla fine della lezione rifaremo la stessa domanda.' },
        { tipo: 'nuvola', id: 'risposte', q: 'Che cosa rispondono le persone che conoscete, quando qualcuno chiede «Dio esiste?»',
          istruzione: 'Nessuno parla di sé: riferite le risposte che avete sentito. Il docente le scrive; quelle ripetute crescono.',
          semi: ['sì', 'no', 'boh'] }
      ] },

    /* 2 · TRE RISPOSTE E UN SILENZIO (animazione) ------------------------ */
    { fase: 'Scoperta', momento: 'Spiegazione', minuti: 5, titolo: 'Tre risposte e *un silenzio*',
      lead: 'Le risposte della nuvola sembrano infinite. In realtà sono poche, e ognuna ha un nome preciso.',
      blocchi: [
        { tipo: 'animazione', id: 'risposte', rapporto: 1.7, ritmo: 3200, pulsante: 'Avvia l’animazione',
          attori: [
            { id: 'q', t: 'Dio esiste?', forma: 'riquadro', colore: 'accent' },
            { id: 'si', t: 'Sì', forma: 'pillola', colore: 'verde' },
            { id: 'ns', t: 'Non si può sapere', forma: 'pillola', colore: 'oro' },
            { id: 'no', t: 'No', forma: 'pillola', colore: 'rosa' },
            { id: 'ind', t: 'Non mi interessa', forma: 'pillola', colore: 'muted' },
            { id: 'pra', t: 'Ateismo pratico', forma: 'riquadro', colore: 'ciano' }
          ],
          frecce: [
            { id: 'f1', da: 'q', a: 'si' }, { id: 'f2', da: 'q', a: 'ns' }, { id: 'f3', da: 'q', a: 'no' },
            { id: 'p1', da: 'pra', a: 'si', tratteggio: true, curva: 0.2 }
          ],
          passi: [
            { didascalia: 'Una domanda secca, che ammette un sì o un no.',
              attori: { q: { x: 50, y: 16, on: true } } },
            { didascalia: 'A rigore produce tre risposte: sì, no, oppure «non si può sapere».',
              attori: { si: { x: 16, y: 52 }, ns: { x: 50, y: 52 }, no: { x: 84, y: 52 } }, frecce: ['f1', 'f2', 'f3'] },
            { didascalia: 'Ognuna ha un nome: il teismo afferma, l’ateismo nega, l’agnosticismo sospende il giudizio.',
              attori: { si: { t: 'Teismo', on: true }, ns: { t: 'Agnosticismo', on: true }, no: { t: 'Ateismo', on: true } }, frecce: ['f1', 'f2', 'f3'] },
            { didascalia: 'C’è poi chi non risponde: l’indifferenza non è una quarta tesi, mette da parte la domanda.',
              attori: { si: { on: false }, ns: { on: false }, no: { on: false }, ind: { x: 78, y: 87, on: true, t: 'Indifferenza' } }, frecce: ['f1', 'f2', 'f3'] },
            { didascalia: 'E l’ateismo pratico riguarda come si vive, non che cosa si pensa: attraversa anche chi si dice credente.',
              attori: { ind: { on: false, o: 0.5 }, pra: { x: 26, y: 87, on: true } }, frecce: ['f1', 'f2', 'f3', 'p1'] }
          ] }
      ] },

    /* 3 · I NOMI E L’EQUIVOCO PIÙ PROBABILE ----------------------------- */
    { fase: 'Scoperta', momento: 'Le parole', minuti: 5, titolo: 'Che cosa c’è *nel nome*',
      lead: 'Tre parole su quattro nascono dal greco *theós*, «dio», o da un *a-* che dice «senza».',
      blocchi: [
        { tipo: 'spettro', q: 'Davanti alla domanda su Dio: toccate ogni parola.', poli: ['Sì', 'Non si può sapere', 'No'],
          fine: 'Tre posizioni sulla linea, una fuori: l’indifferente non risponde.',
          punti: [
            { t: 'teista', x: 8, etim: 'dal greco *theós*, «dio»', def: 'Chi afferma un Dio personale, creatore, che si prende cura dell’uomo.', es: '«Dio esiste e mi conosce.»' },
            { t: 'agnostico', x: 50, etim: 'dal greco *ágnōstos*, «non conoscibile». La parola la conia il biologo T. H. Huxley intorno al 1869, contro gli «gnostici», che dicevano di sapere tutto', def: 'Chi ritiene che la ragione non possa decidere, e sospende il giudizio.', es: '«Ci ho pensato: non si può sapere.»' },
            { t: 'ateo', x: 92, etim: 'dal greco *á-theos*, «senza dio»', def: 'Chi nega che Dio esista; se lo sostiene con argomenti, si parla di ateismo teorico.', es: '«Dio non c’è.»' },
            { t: 'indifferente', x: 50, fuori: 'fuori dalla linea', etim: 'dal latino *in-differens*, «per cui non fa differenza»', def: 'Chi mette da parte la domanda: non dice né sì né no.', es: '«Non mi riguarda.»' }
          ] },
        { tipo: 'verifica', etichetta: 'L’equivoco più frequente',
          q: 'Marta dice: «Non me lo sono mai chiesta: ho altro a cui pensare». Marta è…',
          opzioni: ['agnostica: non sa se Dio esiste', 'indifferente: mette da parte la domanda', 'atea: non crede in Dio'], ok: 1,
          why: '«Agnostico» **non** vuol dire disinteressato: l’agnostico la domanda se l’è posta e ha concluso che non si può decidere. Marta non afferma, non nega e non sospende il giudizio dopo averci pensato: semplicemente non se lo chiede. È **indifferenza**.' },
        { tipo: 'aggancio', etichetta: 'Per capire', titolo: 'Parola giovane, atteggiamento antico',
          t: 'La parola ha poco più di centocinquant’anni, ma l’atteggiamento è antico: nel V secolo a.C. il sofista Protagora dichiarava di non poter sapere se gli dèi esistano o no, per l’oscurità della questione e la brevità della vita umana.',
          fonte: 'Protagora, fr. DK 80 B4 (Diogene Laerzio IX, 51); T. H. Huxley, Agnosticism (1889)' }
      ] },

    /* 4 · DUE EQUIVOCI E TRE PIANI -------------------------------------- */
    { fase: 'Scoperta', momento: 'Spiegazione', minuti: 5, titolo: 'Che cosa *non* dicono',
      lead: 'Le parole giuste si usano spesso male. Apriamo gli altri due equivoci, poi un caso.',
      blocchi: [
        { tipo: 'dubbi', titolo: 'Equivoci da smontare', voci: [
          { q: '«Ateo» vuol dire «senza valori»?', r: 'No. L’ateismo è una risposta sull’**esistenza di Dio**, non un giudizio sull’onestà di chi la sostiene. Esistono atei generosi e credenti meschini, e viceversa: la tesi e la persona si giudicano con criteri diversi.' },
          { q: '«Credente» vuol dire «senza dubbi»?', r: 'No. Nella Bibbia Giobbe e molti salmi interrogano Dio, protestano, chiedono perché: «Dio mio, Dio mio, perché mi hai abbandonato?». {Credere} significa **fidarsi di qualcuno**, non smettere di pensare.', fonte: 'Salmo 22,2 (Bibbia CEI 2008); libro di Giobbe' }
        ] },
        { tipo: 'verifica', etichetta: 'Fatto, interpretazione o giudizio?',
          q: 'Caso immaginario. «Luca dice di essere ateo» è un fatto. E la frase «Gli atei come Luca non hanno una morale»?',
          opzioni: ['Un fatto: lo si vede da come vive', 'Un’interpretazione: si verifica chiedendo a lui', 'Un giudizio, e per giunta infondato'], ok: 2,
          why: 'È un **giudizio** su tutte le persone atee, e non regge: l’ateismo riguarda Dio, non la morale di chi lo sostiene. Un’**interpretazione** sarebbe «Luca non crede perché è arrabbiato con la vita»: può essere vera o falsa, e andrebbe verificata chiedendo a lui. Molti litigi sulla religione nascono dal saltare subito al terzo gradino.' }
      ] },

    /* 5 · PAUSA GIOCO: SFIDA A SQUADRE ----------------------------------- */
    { fase: 'Attività', momento: 'Pausa gioco', minuti: 7, titolo: 'Sfida *a squadre*',
      lead: 'Due squadre, otto domande su ciò che abbiamo appena visto: nomi, parole, equivoci.',
      blocchi: [
        { tipo: 'gioco', id: 'sfida', titolo: 'Sfida a squadre', testo: 'Venti secondi per rispondere; chi sbaglia lascia la domanda all’altra squadra, che può rubarla. Poi si torna qui.', pulsante: 'Si gioca' },
        { tipo: 'rivela', titolo: 'Al ritorno', iniziali: 1, pulsante: 'Altra domanda', passi: [
          { titolo: 'La più discussa', testo: 'Quale domanda ha diviso di più le squadre? Che cosa la rendeva difficile?' },
          { titolo: 'Agnostico o indifferente?', testo: 'Con parole vostre: che cosa ha fatto l’agnostico che l’indifferente non ha fatto?' }
        ] }
      ] },

    /* 6 · FONTE: TOMMASO DÀ LA PAROLA ALL’ATEO ---------------------------- */
    { fase: 'Scoperta', momento: 'Fonte', minuti: 6, titolo: 'Un teologo dà la parola *all’ateo*',
      lead: 'Per discutere senza caricature bisogna conoscere l’argomento migliore di chi la pensa diversamente. Tommaso d’Aquino comincia proprio da lì.',
      blocchi: [
        { tipo: 'leggi', fonte: 'Tommaso d’Aquino, Summa theologiae I, q. 2, a. 3, obiezione 1 e risposta · traduzione dal latino a cura dell’autore',
          q: 'In quale frase Tommaso risponde all’obiezione?',
          testo: '«[[Sembra che Dio non esista::Così, in latino *Videtur quod Deus non sit*, si apre l’articolo: la prima parola la ha l’{obiezione}, non la tesi di Tommaso. Qui non c’è ancora una risposta.]]. Infatti, se uno di due contrari fosse infinito, distruggerebbe del tutto l’altro. Ma con il nome «Dio» si intende un bene infinito. [[Se dunque Dio esistesse, non si troverebbe alcun male::È il cuore dell’obiezione, scritto nella sua forma più forte: un bene infinito non lascerebbe spazio al male. Ma è ancora la voce dell’ateo.]]. Ma nel mondo il male si trova. Dunque Dio non esiste.»\n\nRisposta: «Come dice Agostino, Dio, che è sommamente buono, [[!non permetterebbe alcun male nelle sue opere, se non fosse così onnipotente e buono da trarre il bene anche dal male::Ecco la risposta, presa da Agostino: Dio permette il male perché è capace di trarne un bene. È una **risposta**, non una formula che fa sparire il problema.]].»' },
        { tipo: 'aggancio', etichetta: 'Con onestà', titolo: 'Una domanda che resta aperta',
          t: 'L’obiezione del male è la più seria ed è antichissima: lo scrittore cristiano Lattanzio, nel IV secolo, la riferisce attribuendola a Epicuro. La risposta di Tommaso non chiude la questione: il male resta una domanda anche per chi crede.',
          fonte: 'Lattanzio, De ira Dei 13; Tommaso d’Aquino, Summa theologiae I, q. 2, a. 3, ad 1' }
      ] },

    /* 7 · L’ARGOMENTO MIGLIORE DI CIASCUNO --------------------------------- */
    { fase: 'Scoperta', momento: 'Spiegazione', minuti: 4, titolo: 'L’argomento *migliore* di ciascuno',
      lead: 'Ogni posizione ha almeno un argomento che merita rispetto. Conoscerlo non obbliga ad accettarlo.',
      blocchi: [
        { tipo: 'carte', titolo: 'Girate le carte', carte: [
          { etichetta: 'Per l’ateo', fronte: 'Il male', retro: 'Se Dio è buono e onnipotente, perché il dolore degli innocenti e l’ingiustizia? È l’obiezione che Tommaso mette per prima.' },
          { etichetta: 'Per il teista', fronte: 'Perché c’è qualcosa?', retro: 'Il mondo esiste e ha un ordine che la mente capisce. Da dove vengono? Su domande così Tommaso costruisce le «cinque vie»: le cause naturali spiegano **come** accadono le cose, non bastano a spiegare se stesse.' },
          { etichetta: 'Per l’agnostico', fronte: 'I limiti della ragione', retro: 'Dio, se esiste, non è un oggetto fra gli oggetti: non si osserva al telescopio né si pesa in laboratorio. Anche i credenti riconoscono che non si «dimostra» come un teorema.' }
        ] },
        { tipo: 'mascotte', t: 'Quale dei tre vi sembra più forte, **anche se non è il vostro**? Due voci, con una ragione ciascuna.' }
      ] },

    /* 8 · RISPETTO NON VUOL DIRE TUTTO UGUALE (concetto più difficile) ---- */
    { fase: 'Scoperta', momento: 'Applicazione', minuti: 6, titolo: 'Rispetto non vuol dire *tutto uguale*',
      lead: 'Le persone meritano tutte lo stesso {rispetto}; le tesi, invece, possono essere vere insieme? Decidete voi, coppia per coppia.',
      blocchi: [
        { tipo: 'custom', nome: 'VeroInsieme', props: {} }
      ] },

    /* 9 · LA PROPOSTA CATTOLICA (catena) ------------------------------------ */
    { fase: 'Scoperta', momento: 'Fonte', minuti: 4, titolo: 'Fede e *ragione*',
      lead: 'La Chiesa cattolica è teista e lo dichiara. Ma sostiene qualcosa che sorprende: la domanda su Dio riguarda la ragione.',
      blocchi: [
        { tipo: 'catena', titolo: 'Che cosa propone la Chiesa', iniziali: 1, rottura: true,
          anelli: [
            { t: 'Dio si può conoscere con la ragione', d: 'Il Catechismo insegna che Dio «può essere conosciuto con certezza con il lume naturale della ragione umana», a partire dalle cose create (CCC 36).',
              senza: 'Senza questo, la fede sarebbe solo un sentimento: non si potrebbe nemmeno discuterne.' },
            { nesso: 'Per questo', t: 'Credere non chiede di spegnere il cervello', d: '«La fede e la ragione sono come le due ali con le quali lo spirito umano s’innalza verso la contemplazione della verità» (Giovanni Paolo II, *Fides et ratio*, 1998).',
              senza: 'Senza le due ali, fede e ragione resterebbero nemiche: chi crede dovrebbe smettere di pensare.' },
            { nesso: 'Eppure', t: 'L’ateismo ha anche cause nei credenti', d: '«Nella genesi dell’ateismo possono contribuire non poco i credenti» (*Gaudium et spes* 19), quando la loro vita contraddice ciò che professano.',
              senza: 'Senza questa autocritica, l’ateismo sarebbe solo colpa degli altri.' },
            { nesso: 'Per questo', t: 'Dialogo sincero, senza costringere', d: 'Il Concilio chiede ai credenti un dialogo sincero con chi non crede (*Gaudium et spes* 21) e afferma che la verità si impone solo con la forza della verità stessa (*Dignitatis humanae* 1).' }
          ],
          fine: 'Si propone, non si impone.' }
      ] },

    /* 10 · PROVA E RITORNO ALLA DOMANDA ------------------------------------- */
    { fase: 'Chiusura', momento: 'Prova e ritorno', minuti: 4, titolo: 'Ognuno ha *la sua* verità?',
      lead: 'Tre casi nuovi, poi la domanda dell’inizio.',
      blocchi: [
        { tipo: 'quiz', etichetta: 'Prova breve', perfetto: 'Tre su tre: ogni risposta al suo nome, ogni persona al suo posto.',
          domande: [
            { q: 'Davide dice: «Ci ho pensato a lungo: secondo me nessuno può saperlo». È…',
              opzioni: ['indifferente', 'ateo', 'agnostico'], ok: 2,
              why: 'Si è posto la domanda e sospende il giudizio perché ritiene che la ragione non possa decidere: è la posizione agnostica. L’indifferente non se la pone; l’ateo nega.' },
            { q: '«Rispetto Sara, che è credente, ma penso che abbia torto.» Queste due frasi…',
              opzioni: ['si contraddicono: chi rispetta non dissente', 'stanno insieme: il rispetto riguarda la persona, il disaccordo la tesi', 'mostrano che ognuno ha la sua verità'], ok: 1,
              why: 'Rispettare non vuol dire dare ragione. «Dio esiste» e «Dio non esiste» non possono essere vere insieme; Sara e chi la contraddice meritano lo stesso rispetto.' },
            { q: 'Secondo il Catechismo (n. 36), l’esistenza di Dio…',
              opzioni: ['si può conoscere con la ragione, a partire dalle cose create', 'è solo una questione di sentimento', 'si dimostra come un teorema di geometria'], ok: 0,
              why: 'Per la Chiesa la domanda riguarda la ragione, non solo il sentimento. Non significa che ognuno ci arrivi di fatto, né che la fede sia un calcolo: credere non chiede di spegnere il cervello.' }
          ] },
        { tipo: 'domanda', id: 'uscita', confronta: 'ingresso', etichetta: 'Anonimo · la stessa domanda dell’inizio',
          q: '«Su Dio ognuno ha la sua verità.» Siete d’accordo?',
          opzioni: ['Sì, del tutto', 'In parte', 'No', 'Non saprei'],
          dibattito: 'La risposta di oggi: le **persone** hanno tutte la stessa dignità; le **risposte** no, perché «Dio esiste» e «Dio non esiste» non possono essere vere insieme. Per questo si conoscono bene e si discutono, senza costringere nessuno. Chi ha cambiato voto, che cosa l’ha convinto?' },
        { tipo: 'aggancio', etichetta: 'Prossima lezione', titolo: 'Come se ne parla?',
          t: 'Dio non è un oggetto fra gli oggetti. Eppure gli esseri umani ne parlano con cose che si vedono e si toccano: una pietra, una porta, un giorno della settimana. Lo scopriremo nella prossima lezione, «Segni e simboli».' }
      ] }
  ],

  /* =================== MODALITÀ STUDIO =================== */
  studio: {
    sezioni: [
      { titolo: 'La domanda',
        testo: 'Alla domanda «Dio esiste?» ciascuno ha già una risposta, anche quando è un «boh». Le risposte possibili, però, non sono infinite, e ognuna ha un nome preciso. Conoscere quei nomi serve a una cosa molto concreta: discutere senza caricature. Prima di dire se una posizione è convincente bisogna saperla descrivere come la descriverebbe chi la sostiene.' },
      { titolo: 'Tre risposte e un silenzio',
        testo: 'Una domanda che ammette un sì o un no produce, a rigore, tre risposte: sì, no, oppure «non si può sapere». A queste se ne aggiunge una quarta che, in realtà, non risponde: «non mi interessa».\n\nIl **teismo** afferma che esiste un Dio personale, creatore del mondo, che conosce l’uomo e se ne prende cura. La parola viene dal greco *theós*, «dio». Ebrei, cristiani e musulmani sono teisti, pur con differenze profonde nel modo di intendere Dio. «Personale» non significa che Dio sia un uomo più grande: significa che è qualcuno e non qualcosa, capace di conoscere, volere e rivolgere la parola.\n\nL’**ateismo** nega che Dio esista. La parola unisce l’*a-* privativo greco a *theós*: *á-theos*, «senza dio». Si parla di ateismo teorico quando la negazione è sostenuta con argomenti. L’ateo non dice «non lo so»: dice «so, o ritengo ragionevole, che non c’è».\n\nL’**agnosticismo** sostiene che la ragione umana non sia in grado né di affermare né di negare l’esistenza di Dio, e perciò sospende il giudizio. La parola è giovane: la coniò il biologo inglese Thomas H. Huxley, che nel saggio *Agnosticism* (1889) racconta di averla inventata negli anni in cui frequentava la Metaphysical Society di Londra, fondata nel 1869, in contrapposizione agli «gnostici» che pretendevano di sapere molto proprio su ciò che lui ignorava. Deriva dal greco *ágnōstos*, «non conoscibile». L’atteggiamento, invece, è antico: già il sofista Protagora, nel V secolo a.C., dichiarava di non poter sapere se gli dèi esistano o no, a causa dell’oscurità della questione e della brevità della vita umana. Il Catechismo della Chiesa Cattolica osserva che «l’agnosticismo assume parecchie forme»: c’è chi ammette un essere trascendente di cui però nessuno potrebbe dire nulla, e chi non si pronuncia affatto (CCC 2127).\n\nC’è infine chi non risponde perché la domanda non lo tocca. L’**indifferenza** (dal latino *in-differens*, «per cui non fa differenza») non è una quarta tesi su Dio: è un modo di metterla da parte. Accanto a essa si colloca l’**ateismo pratico**, che non riguarda ciò che si pensa ma come si vive: si vive come se Dio non ci fosse, anche senza negarlo, e perfino dichiarandosi credenti. È una categoria scomoda, perché non divide il mondo fra «noi» e «loro»: attraversa anche chi va in chiesa.' },
      { titolo: 'Tre equivoci da smontare',
        testo: 'Queste parole vengono spesso usate male. Tre errori sono i più frequenti.\n\n«Agnostico» non significa «disinteressato». L’agnostico ci ha pensato, e ha concluso che la questione non si può decidere. Chi non ci ha mai pensato è indifferente, non agnostico.\n\n«Ateo» non significa «senza valori». L’ateismo riguarda l’esistenza di Dio, non l’onestà di chi lo sostiene. Esistono atei generosi e credenti meschini, e viceversa: la tesi e la persona vanno giudicate con criteri diversi.\n\n«Credente» non significa «senza dubbi». Nella Bibbia Giobbe e molti salmi interrogano Dio, protestano, chiedono perché: «Dio mio, Dio mio, perché mi hai abbandonato?» (Sal 22,2). *Credere* viene dal latino *credere*, «affidare, prestare fiducia»: credere significa fidarsi di qualcuno, non smettere di pensare.\n\nQui torna utile la distinzione incontrata nella prima ora fra fatto, interpretazione e giudizio. Prendiamo un caso immaginario. «Luca dice di essere ateo» è un fatto: lo ha dichiarato. «Luca non crede perché è arrabbiato con la vita» è un’interpretazione: può essere vera o falsa, e andrebbe verificata chiedendo a lui. «Gli atei come Luca non hanno una morale» è un giudizio, e per giunta infondato. Molti litigi sulla religione nascono dal saltare direttamente al terzo gradino.' },
      { titolo: 'Prendere sul serio l’altro',
        testo: 'Ogni posizione ha almeno un argomento che merita rispetto. Conoscerlo non obbliga ad accettarlo, ma impedisce di vincere la discussione contro un avversario immaginario.\n\n**L’argomento dell’ateo: il male.** Se Dio è buono e onnipotente, perché esistono il dolore degli innocenti e l’ingiustizia? È l’obiezione più seria, ed è antichissima: lo scrittore cristiano Lattanzio, nel IV secolo, la riferisce attribuendola al filosofo greco Epicuro (*De ira Dei* 13). Colpisce che proprio un grande teologo cristiano, Tommaso d’Aquino, apra la sua trattazione sull’esistenza di Dio dando la parola all’ateo. L’articolo comincia con «Sembra che Dio non esista» (*Videtur quod Deus non sit*), e la prima obiezione dice: «Se uno di due contrari fosse infinito, distruggerebbe del tutto l’altro. Ma con il nome “Dio” si intende un bene infinito. Se dunque Dio esistesse, non si troverebbe alcun male. Ma nel mondo il male si trova. Dunque Dio non esiste» (*Summa theologiae* I, q. 2, a. 3, obiezione 1; traduzione dal latino). Tommaso non la liquida. Risponde con una frase di Agostino: Dio, che è sommamente buono, non permetterebbe alcun male nelle sue opere «se non fosse così onnipotente e buono da trarre il bene anche dal male». È una risposta, non una formula che fa sparire il problema: il male resta una domanda aperta anche per chi crede.\n\n**L’argomento del teista: perché c’è qualcosa?** Il mondo esiste, e non sembra avere in sé la ragione del proprio esistere; inoltre ha un ordine che la mente umana riesce a comprendere. Da dove vengono l’essere e l’ordine? Su domande di questo tipo Tommaso, nello stesso articolo, costruisce le sue «cinque vie», cinque percorsi che dal mondo risalgono a una causa prima. Anche qui c’è un’obiezione seria, che Tommaso stesso riporta: se la natura si spiega con le cause naturali, che bisogno c’è di Dio? La sua risposta è che anche ciò che avviene per natura va ricondotto a Dio «come alla causa prima»: le cause naturali spiegano come le cose accadono, ma non bastano a spiegare se stesse.\n\n**L’argomento dell’agnostico: i limiti della ragione.** Dio, se esiste, non è un oggetto fra gli oggetti: non si osserva al telescopio né si pesa in laboratorio. L’agnostico ne conclude che la domanda eccede ciò che possiamo sapere. È un argomento di umiltà, e ha una parte di verità che anche i credenti riconoscono: Dio non si «dimostra» come un teorema di geometria. La discussione verte su un punto preciso, cioè se la ragione possa almeno riconoscere delle tracce.' },
      { titolo: 'Rispetto non vuol dire «tutto uguale»',
        testo: 'Le persone meritano tutte lo stesso rispetto; le tesi, invece, non possono essere tutte vere insieme. «Dio esiste» e «Dio non esiste» si escludono: se una è vera, l’altra è falsa. È il **principio di non contraddizione**, formulato da Aristotele e usato anche in matematica. Altre frasi, invece, possono stare insieme: «Dio esiste» e «non possiamo saperlo con certezza» parlano una di Dio, l’altra di ciò che noi sappiamo; «Dio non esiste» e «chi crede merita rispetto» parlano una di una tesi, l’altra di una persona.\n\nDire «ognuno ha la sua verità» sembra gentile, ma in realtà toglie serietà alla domanda e anche all’altro: se tutto è vero, nessuno ha davvero qualcosa da dirmi. *Rispetto* viene dal latino *respicere*, «guardare indietro, considerare»: rispettare è guardare l’altro con attenzione. Il rispetto autentico consiste allora in due gesti: conoscere bene le ragioni di chi la pensa diversamente, e discuterle senza costringere nessuno. Il Concilio Vaticano II lo ha espresso affermando che la verità si impone soltanto con la forza della verità stessa, che entra nelle menti con dolcezza e insieme con vigore (*Dignitatis humanae* 1).' },
      { titolo: 'La proposta cattolica: fede e ragione',
        testo: 'La Chiesa cattolica è teista, e lo dichiara. Sostiene però anche qualcosa che sorprende molti: che l’esistenza di Dio non è soltanto una questione di sentimento, ma riguarda la ragione. Il Catechismo, riprendendo il Concilio Vaticano I, insegna che Dio «può essere conosciuto con certezza con il lume naturale della ragione umana» a partire dalle cose create (CCC 36). Non significa che ogni persona arrivi di fatto a questa conclusione, né che la fede sia il risultato di un calcolo: significa che credere non chiede di spegnere il cervello. Giovanni Paolo II lo ha detto con un’immagine rimasta celebre: «La fede e la ragione sono come le due ali con le quali lo spirito umano s’innalza verso la contemplazione della verità» (*Fides et ratio*, 1998, incipit).\n\nVerso l’ateismo la Chiesa ha un atteggiamento serio su entrambi i fronti. Lo respinge come dottrina, ma non si limita a condannare: nella costituzione *Gaudium et spes* il Concilio si domanda da dove nasca e ammette che «nella genesi dell’ateismo possono contribuire non poco i credenti» (n. 19), quando trascurano di educare la propria fede, presentano la dottrina in modo ingannevole o vivono in contrasto con ciò che professano. Nello stesso documento (n. 21) chiede ai credenti un dialogo sincero con chi non crede e riconosce che credenti e non credenti devono collaborare alla costruzione del mondo in cui vivono insieme.' },
      { titolo: 'In sintesi',
        testo: 'Teismo: Dio esiste. Ateismo: Dio non esiste. Agnosticismo: non si può sapere. Indifferenza: la domanda non interessa. Ateismo pratico: vivere come se Dio non ci fosse. Le persone si rispettano tutte; le tesi si discutono, perché non possono essere vere tutte insieme.' },
      { titolo: 'Per lo studio',
        testo: '1. Spiega con parole tue la differenza fra un agnostico e un indifferente.\n\n2. Perché «Dio esiste» e «Dio non esiste» non possono essere vere entrambe? Come si chiama il principio che lo stabilisce?\n\n3. Quale argomento dell’ateo riporta Tommaso d’Aquino, e che cosa rivela il fatto che sia proprio lui a riportarlo?\n\n4. Domanda aperta: quale fra i tre argomenti (il male, perché c’è qualcosa, i limiti della ragione) ti sembra più forte, anche se non è quello della posizione che condividi? Motiva in cinque o sei righe. Non si valuta la tua posizione, ma la chiarezza del ragionamento.' },
      { titolo: 'La risposta alla domanda',
        testo: 'La domanda «Dio esiste?» non si chiude in un’ora, e non era questo l’obiettivo. L’obiettivo era darle un vocabolario: sapere che cosa afferma chi crede, chi nega e chi sospende il giudizio, e che cosa invece non afferma. Con queste parole si può discutere a lungo e con franchezza, anche fra persone che la pensano in modo opposto, senza trasformare una differenza di idee in un giudizio sulle persone. Ogni risposta ha un nome; ogni persona merita di essere ascoltata prima di essere contraddetta.\n\nResta una domanda per la prossima lezione: se Dio non è un oggetto fra gli oggetti, come ne parlano gli esseri umani? Con cose che si vedono e si toccano, ma che dicono più di ciò che sono: segni e simboli.' }
    ],
    fonti: [
      'Tommaso d’Aquino, *Summa theologiae* I, q. 2, a. 3, obiezioni 1–2 e risposte (testo latino: corpusthomisticum.org/sth1002.html); traduzione dal latino a cura dell’autore.',
      'Agostino, *Enchiridion* 11, citato da Tommaso nella risposta alla prima obiezione.',
      'Lattanzio, *De ira Dei* 13, per l’obiezione del male attribuita a Epicuro.',
      'Concilio Vaticano II, *Gaudium et spes* (7 dicembre 1965), nn. 19–21 — vatican.va.',
      'Concilio Vaticano II, *Dignitatis humanae* (7 dicembre 1965), n. 1 — vatican.va.',
      'Giovanni Paolo II, *Fides et ratio* (14 settembre 1998), incipit — vatican.va.',
      '*Catechismo della Chiesa Cattolica*, nn. 31–36 e 2123–2128 — vatican.va.',
      'T. H. Huxley, *Agnosticism* (1889), in *Collected Essays*, vol. V — mathcs.clarku.edu/huxley.',
      'Protagora, fr. DK 80 B4, tramandato da Diogene Laerzio, *Vite dei filosofi* IX, 51.',
      'Aristotele, *Metafisica* IV (Γ), 3, per il principio di non contraddizione.',
      'Salmo 22,2, Bibbia CEI 2008.',
      '*Vocabolario Treccani*, voci «teismo», «ateo», «agnostico», «indifferente», «credere», «obiezione», «rispetto», «ragione».',
      'Il testo segue il fascicolo «Credo, non credo, non so» (stessa lezione) e lo integra con le parti della lezione interattiva.'
    ]
  },

  /* =================== GIOCHI =================== */
  giochi: {
    tema: 'Credo, non credo, non so',
    /* Pausa gioco della scena 5: otto domande, solo su ciò che è stato spiegato nelle scene 1–4. */
    sfida: [
      { q: 'Chi afferma un Dio personale, creatore, che si prende cura dell’uomo è…', a: ['agnostico', 'indifferente', 'teista', 'ateo'], ok: 2 },
      { q: '«Ateo» viene dal greco á-theos, che significa…', a: ['senza dio', 'contro dio', 'dio nascosto', 'nuovo dio'], ok: 0 },
      { q: 'Chi ritiene che la ragione non possa né affermare né negare Dio è…', a: ['indifferente', 'agnostico', 'ateo', 'teista'], ok: 1 },
      { q: 'Chi ha coniato la parola «agnostico»?', a: ['Tommaso d’Aquino', 'Protagora', 'Giovanni Paolo II', 'Thomas H. Huxley'], ok: 3 },
      { q: 'L’indifferenza, rispetto alla domanda su Dio…', a: ['è una quarta tesi', 'nega Dio con argomenti', 'mette da parte la domanda', 'afferma Dio senza dirlo'], ok: 2 },
      { q: 'L’ateismo pratico riguarda…', a: ['come si vive', 'che cosa si pensa', 'solo chi si dichiara ateo', 'solo i filosofi'], ok: 0 },
      { q: '«Personale», detto di Dio, significa che…', a: ['ha un corpo come il nostro', 'è qualcuno e non qualcosa', 'ognuno se lo inventa', 'appartiene a una sola persona'], ok: 1 },
      { q: 'Caso immaginario: «Luca non crede perché è arrabbiato con la vita» è…', a: ['un fatto', 'un giudizio di valore', 'un’interpretazione da verificare', 'una prova'], ok: 2 }
    ],
    /* Ripasso (fuori dai 50 minuti, o in anticipo). */
    cat: {
      bins: ['Teista', 'Ateo', 'Agnostico', 'Indifferente'],
      items: [
        ['«Prego perché so che qualcuno mi ascolta»', 0], ['«Il mondo ha un’origine perché qualcuno lo ha voluto»', 0],
        ['«Dio è un’invenzione umana»', 1], ['«Il mondo si spiega benissimo senza Dio»', 1],
        ['«Mancano prove sia per il sì sia per il no»', 2], ['«Ci ho pensato: non lo sapremo mai»', 2],
        ['«Sono cose che non mi riguardano»', 3], ['«Ho cose più importanti a cui pensare»', 3]
      ]
    },
    vf: [
      { s: 'L’agnostico nega che Dio esista.', v: false, why: 'Non nega: sospende il giudizio, perché ritiene che la ragione non possa decidere.' },
      { s: '«Ateo» significa letteralmente «senza dio».', v: true, why: 'Dal greco *a-* privativo e *theós*, «dio».' },
      { s: 'Chi è indifferente ha risposto alla domanda su Dio.', v: false, why: 'L’indifferenza mette da parte la domanda, non le risponde.' },
      { s: 'Si può essere atei pratici pur dicendosi credenti.', v: true, why: 'L’ateismo pratico riguarda come si vive: si vive come se Dio non ci fosse.' },
      { s: 'Chi crede non ha mai dubbi.', v: false, why: 'Giobbe e molti salmi interrogano Dio e chiedono perché: credere è fidarsi, non smettere di pensare.' },
      { s: 'Tommaso d’Aquino riporta un argomento contro l’esistenza di Dio.', v: true, why: 'L’articolo sull’esistenza di Dio si apre con l’obiezione del male (Summa theologiae I, q. 2, a. 3).' },
      { s: 'Per la Chiesa cattolica fede e ragione sono nemiche.', v: false, why: 'Sono «come le due ali» dello spirito umano (Fides et ratio, incipit); Dio si può conoscere con la ragione (CCC 36).' },
      { s: 'Rispettare tutti significa pensare che tutte le tesi siano vere.', v: false, why: 'Il rispetto riguarda le persone; tesi opposte non possono essere vere insieme.' }
    ],
    abbina: [
      ['Teista', 'Dio c’è ed è qualcuno'],
      ['Ateo', 'Dio non c’è'],
      ['Agnostico', 'Non si può sapere'],
      ['Indifferente', 'Non mi interessa'],
      ['Ateo pratico', 'Vive come se Dio non ci fosse']
    ],
    memory: [
      ['Teismo', 'Sì'], ['Ateismo', 'No'], ['Agnosticismo', 'Non si può sapere'],
      ['Indifferenza', 'Non mi interessa'], ['á-theos', 'Senza dio'], ['Huxley', 'Conia «agnostico»']
    ],
    quiz: [
      { q: 'Qual è l’obiezione più seria all’esistenza di Dio, secondo il fascicolo?', a: ['Nessuno l’ha mai fotografato', 'Il problema del male', 'Le religioni sono tante', 'La scienza è moderna'], ok: 1, why: 'Se Dio è buono e onnipotente, perché il male? Tommaso la mette per prima.' },
      { q: 'Come risponde Tommaso all’obiezione del male?', a: ['Dice che il male non esiste', 'Non risponde', 'Con Agostino: Dio sa trarre il bene anche dal male', 'Dice che Dio non è onnipotente'], ok: 2, why: 'È una risposta, non una formula che cancella il problema.' },
      { q: 'L’argomento dell’agnostico si basa su…', a: ['i limiti della ragione', 'il problema del male', 'l’ordine del mondo', 'la Bibbia'], ok: 0, why: 'Dio, se esiste, non è un oggetto da osservare o misurare.' },
      { q: 'Quale coppia di frasi può essere vera insieme?', a: ['«Dio esiste» e «Dio non esiste»', '«Tutto è vero» e «Dio non esiste»', '«Dio non esiste» e «Tutte le risposte sono vere»', '«Rispetto chi crede» e «Penso che abbia torto»'], ok: 3, why: 'Il rispetto riguarda la persona, il disaccordo la tesi.' },
      { q: 'Che cosa ammette Gaudium et spes 19?', a: ['Che l’ateismo è sempre in malafede', 'Che anche i credenti possono contribuire alla nascita dell’ateismo', 'Che fede e ragione si escludono', 'Che Dio non si può conoscere'], ok: 1, why: 'Quando trascurano la propria fede o vivono in contrasto con essa.' }
    ],
    rifl: {
      domanda: 'Oggi, dove ti collochi?',
      poli: ['Credo', 'Non so', 'Non credo'],
      spunto: 'Che cosa ti fa pensare così? La frase resta solo su questo schermo e sparisce alla chiusura.'
    }
  }
};
