
/* ---- lezione ---- */
/* Classe V · Apertura dell'anno · «Il cuore inquieto» — sorgente dell'artefatto (kit LAB-IRC, formato lezione.js).
   Conversione fedele dell'artefatto originale (uploads/apertura-cuore-inquieto-artefatto.html): stessi testi, stesse fonti, stesso ordine.

   Note per il docente (dall'originale):
   - Occorrono solo foglietti bianchi identici (metà A5) e una scatola richiudibile.
   - Scrivere alla lavagna le cinque parole latine prima che la classe entri, senza traduzione e senza autore.
   - Rispettare il silenzio degli otto minuti: se si lascia parlare, la seconda riga diventa una battuta.
   - Mescolare i foglietti davanti alla classe: la fiducia nell'anonimato regge solo se è visibile.
   - Non commentare i foglietti durante la lettura. Se emerge qualcosa di serio, si riprende in privato e fuori dall'ora.
   - Le attese della terza riga sono il materiale con cui introdurre le cinque domande: agganciarne almeno due a ciò che è appena stato letto.
   - Sull'ammissione del libro X delle Confessioni (l'uomo che diventa una domanda per se stesso): il senso è documentato, la formulazione
     esatta varia secondo l'edizione, perciò nel testo è resa in forma indiretta e non fra virgolette.
   - Schema PRIMA/DOPO/PERCHÉ/CONSEGUENZE adattato: lezione laboratoriale e relazionale, non caso storico.
   - L'artefatto non salva né trasmette alcun dato: quanto viene scritto nella versione scritta delle tre righe resta in pagina e sparisce al ricaricamento. */
window.LEZIONE = {
  slug: 'v-0-1-apertura-il-cuore-inquieto',
  classe: 'Anno V',
  titolo: 'Il cuore *inquieto*',
  sottotitolo: 'Apertura dell\'anno: un fatto, un\'omissione, un\'attesa — e la domanda che regge l\'anno.',
  saluto: 'Ultima tappa: i foglietti vanno nella scatola.',
  scene: [
    /* 0–3 · Aggancio */
    { fase: 'Aggancio', momento: 'Alla lavagna', minuti: 3, titolo: 'Il cuore *inquieto*',
      lead: '*Inquietum est cor nostrum.* Cinque parole in latino: chi le ha scritte, quando, e perché aprono l\'ultimo anno.',
      blocchi: [
        { tipo: 'agenda', titolo: 'L\'ora di oggi' }
      ] },

    /* 3–11 · Fonte */
    { fase: 'Fonte', momento: 'Chi le ha scritte', minuti: 8, titolo: 'Non un diario: un *esame*',
      lead: 'Agostino, intorno al 397. Vescovo di Ippona, quarantatré anni. Padre e {Dottore della Chiesa}.',
      testo: 'Le parole sono nella prima pagina delle {Confessioni}. Agostino non racconta la propria vita per farla conoscere: la rilegge per capire che cosa cercava davvero mentre credeva di cercare altro.',
      blocchi: [
        { tipo: 'citazione',
          testo: 'ci hai fatti per te, e il nostro cuore è inquieto finché non riposa in te',
          fonte: 'Agostino, Confessioni I, 1, 1',
          pulsante: 'Che cosa dice di noi?',
          commento: 'La frase dice una cosa precisa e verificabile su di noi, prima ancora che su Dio: che l\'essere umano non si accontenta. Ottiene una cosa e ne vuole un\'altra; raggiunge un risultato e dopo due settimane gli sembra poco. Agostino chiama questa condizione {inquietudine|inquieto} e la considera un indizio, non un difetto: il segno che si sta cercando qualcosa di più grande di ciò che si sta cercando.' },
        { tipo: 'rivela', titolo: 'L\'esame guarda tre cose', iniziali: 0, pulsante: 'Mostra', passi: [
          { titolo: 'Ciò che ha fatto', testo: 'La carriera, il successo retorico, le relazioni, le scuole filosofiche frequentate una dopo l\'altra.' },
          { titolo: 'Ciò che ha evitato', testo: 'Quello che poteva fare e non ha fatto.' },
          { titolo: 'Ciò che desiderava senza saperlo', testo: 'Nel libro X arriva ad ammettere di essere diventato, per se stesso, una domanda a cui non sa rispondere. Viene da un uomo che di mestiere spiegava le cose agli altri.' }
        ], fine: 'Chi non ha mai guardato indietro con onestà non ha materiale per decidere che cosa fare davanti.' }
      ] },

    /* 11–21 · Attività: le tre righe */
    { fase: 'Attività', momento: 'La consegna', minuti: 10, titolo: 'Tre righe, nessun *nome*',
      lead: 'Lo stesso esame, ridotto a un\'estate e a otto minuti. Si scrive in silenzio, su un foglietto senza nome.',
      blocchi: [
        { tipo: 'custom', nome: 'TreRighe', props: {} },
        { tipo: 'consegna', titolo: 'Otto minuti di silenzio', modalita: 'Da soli', minuti: 8,
          passi: ['Riga 1 · Un fatto', 'Riga 2 · Un\'omissione', 'Riga 3 · Un\'attesa'],
          prodotto: 'un foglietto senza nome con tre righe. I foglietti vengono poi mescolati.',
          fine: 'Tempo. I foglietti si mescolano davanti alla classe.' }
      ] },

    /* 21–31 · Attività: la lettura */
    { fase: 'Attività', momento: 'Come si legge', minuti: 10, titolo: 'La riga di un *altro*',
      lead: 'I foglietti vengono mescolati e ridistribuiti: ciascuno leggerà quello di un altro.',
      blocchi: [
        { tipo: 'consegna', titolo: 'Il giro di lettura', modalita: 'Tutta la classe', minuti: 9,
          passi: [
            'Si legge ad alta voce, senza commentare e senza indovinare di chi sia.',
            'Chi preferisce non leggere passa il foglietto al vicino: non si chiede il motivo.',
            'Finito il giro, i foglietti finiscono in una scatola che non apre nessuno.'
          ],
          prodotto: 'tutti i foglietti letti e riposti nella scatola, chiusa fino a maggio.',
          fine: 'Tempo. La scatola si chiude.' },
        { tipo: 'nota', icona: '', t: 'L\'anonimato non serve a nascondersi: serve a permettere a una classe di dire cose che, con il nome sopra, non direbbe.' }
      ] },

    /* 31–35 · Scoperta: perché si comincia da qui */
    { fase: 'Scoperta', momento: 'Perché si comincia da qui', minuti: 4, titolo: 'Tre operazioni, non un *gioco*',
      lead: 'Le tre righe non sono un riscaldamento: contengono, in miniatura, le tre operazioni su cui si lavora tutto l\'anno.',
      blocchi: [
        { tipo: 'rivela', iniziali: 0, pulsante: 'Mostra', passi: [
          { titolo: 'Riga 1 · Hai scelto', testo: 'Fra decine di giorni ne hai indicato uno, e per farlo hai usato un **criterio**, anche se non lo hai scritto.' },
          { titolo: 'Riga 2 · Hai riconosciuto un limite', testo: 'Qualcosa che potevi fare e non hai fatto.' },
          { titolo: 'Riga 3 · Hai sperato', testo: 'Hai formulato un\'attesa: un giudizio sul futuro che non poggia su nulla di dimostrabile.' }
        ], fine: 'Nessuna macchina fa queste tre cose al posto tuo.' },
        { tipo: 'aggancio', etichetta: 'Oggi', titolo: 'Un modello linguistico e la tua estate',
          t: 'Un modello linguistico scrive un tema sulle vacanze meglio della media di questa classe. Non può dirti quale giorno della tua estate rifaresti.' }
      ] },

    /* 35–41 · Scoperta: la domanda dell'anno e i tre verbi */
    { fase: 'Scoperta', momento: 'La domanda dell\'anno', minuti: 6, titolo: 'Chi ha l\'*ultima* parola?',
      lead: 'La scienza, l\'{algoritmo} o la {coscienza}. È la domanda a cui rispondono, una per volta, tutte le unità di quest\'anno.',
      testo: 'Il metodo per affrontarla sta in tre verbi. Far scivolare un verbo nell\'altro è l\'errore che rovina quasi tutte le discussioni su questi temi: riconoscere lo scivolamento, dargli un nome e non caderci è la competenza che resta alla fine dell\'anno.',
      blocchi: [
        { tipo: 'carte', titolo: 'Il metodo, in tre verbi', carte: [
          { etichetta: 'Come', fronte: 'Come funziona il mondo', retro: 'Lo dice la **scienza**: è il suo mestiere, e lo fa con strumenti che nessun altro sapere possiede.' },
          { etichetta: 'Perché', fronte: 'Perché c\'è e che senso ha', retro: 'Se ne occupa la **fede**: una domanda che la scienza, per statuto, non pone.' },
          { etichetta: 'Fino a dove', fronte: 'Fino a dove ci si può spingere', retro: 'Risponde l\'**etica**, la domanda più scomoda: fino a dove ci si può spingere con ciò che la scienza permette di fare.' }
        ] },
        { tipo: 'smista', titolo: 'Dove scivola il verbo?', categorie: ['Il «come» scivola nel «perché»', 'Il «come» scivola nel «fino a dove»', 'Ogni verbo al suo posto'], voci: [
          { t: 'Un risultato scientifico dimostra che Dio esiste.', c: 0, why: 'La scienza dice come funziona il mondo; perché ci sia è una domanda che, per statuto, non pone. Usare un risultato scientifico per dimostrare Dio fa scivolare il «come» nel «perché».' },
          { t: '«Ma la scienza dice che si può»: il problema etico è chiuso.', c: 1, why: 'Che una cosa si possa fare risponde al «come». Fino a dove spingersi è un\'altra domanda, e la chiude l\'etica, non un risultato di laboratorio.' },
          { t: 'La scienza dice come funziona il mondo.', c: 2, why: 'È esattamente il suo mestiere: nessuno scivolamento.' },
          { t: 'La fede si occupa del perché il mondo ci sia e che senso abbia.', c: 2, why: 'È la domanda della fede, quella che la scienza non pone: ogni verbo al suo posto.' }
        ], chiusura: 'Riconoscere lo scivolamento, dargli un nome e non caderci: è la competenza che resta alla fine dell\'anno.' }
      ] },

    /* 41–45 · Scoperta: le cinque domande */
    { fase: 'Scoperta', momento: 'L\'anno', minuti: 4, titolo: 'L\'anno, in cinque *domande*',
      lead: 'Il programma è fatto di cinque domande in fila, più il lavoro finale.',
      blocchi: [
        { tipo: 'custom', nome: 'Programma', props: {} }
      ] },

    /* 45–48 · Chiusura: il patto */
    { fase: 'Chiusura', momento: 'Il patto', minuti: 3, titolo: 'Un\'ora a *settimana*',
      lead: 'Il patto è breve. Un\'ora alla settimana significa nessun minuto di riempitivo.',
      blocchi: [
        { tipo: 'idee', titolo: 'Il patto', pulsante: 'Il primo punto', idee: [
          'Ogni lezione porta un testo, una data e una fonte. Quando non so da dove viene una cosa che dico, lo dichiaro invece di farlo passare.',
          'Nessuna domanda è vietata, comprese quelle contro.',
          'Si può non credere e prendere il massimo: si valuta il pensiero, non l\'appartenenza. Non si giudica una posizione dal titolo, né una persona dalla sua.'
        ] },
        { tipo: 'citazione',
          testo: 'la coscienza è il nucleo più segreto e il sacrario dell\'uomo, dove egli è solo con Dio',
          fonte: 'Concilio Vaticano II, Gaudium et spes, n. 16, 7 dicembre 1965',
          pulsante: 'Perché è qui',
          commento: 'Il punto sulla {coscienza} non è una concessione, ma un principio che la Chiesa afferma in un documento del Concilio Vaticano II.' }
      ] },

    /* 48–50 · Chiusura */
    { fase: 'Chiusura', momento: 'Chiusura', minuti: 2, titolo: 'Le due *ali*',
      lead: 'I foglietti restano chiusi in una scatola fino a maggio.',
      blocchi: [
        { tipo: 'citazione',
          testo: 'La fede e la ragione sono come le due ali con le quali lo spirito umano s\'innalza verso la contemplazione della verità',
          fonte: 'Giovanni Paolo II, lettera enciclica Fides et ratio, incipit, 14 settembre 1998' },
        { tipo: 'continua', voci: [
          { t: 'La scatola', d: 'Si riapre a maggio, nell\'unità finale: quali attese si sono avverate, quali sono cambiate, quali sono rimaste dove stavano. È l\'unico compito di quest\'ora che si consegna fra nove mesi.', principale: true },
          { t: 'Prossima tappa', d: 'Domanda uno: la scienza e la fede rispondono alla stessa domanda? Si comincia dalla storia di un sacerdote che corregge Einstein e più tardi frena un Papa.' },
          { t: 'Da capo', d: 'Rivedere la lezione dalla prima scena.', vai: 'inizio' }
        ] }
      ] }
  ],

  glossario: {
    'inquieto': { parola: 'inquieto', etim: 'dal latino *in-* (non) e *quies* (riposo, quiete)', def: 'Che non trova riposo. Per Agostino l\'inquietudine è un indizio, non un difetto: il segno che si sta cercando qualcosa di più grande di ciò che si sta cercando.' },
    'confessioni': { parola: 'Confessioni', etim: 'dal latino *confiteri*, riconoscere apertamente', def: 'L\'opera in cui Agostino, intorno al 397, rilegge la propria vita per capire che cosa cercava davvero. Non un diario: un esame.' },
    'dottore della chiesa': { parola: 'Dottore della Chiesa', etim: 'dal latino *doctor*, chi insegna', def: 'Titolo che la Chiesa riconosce a un santo il cui insegnamento ha un valore particolare per tutti. Agostino è anche Padre della Chiesa.' },
    'algoritmo': { parola: 'algoritmo', etim: 'dal nome del matematico persiano al-Khwārizmī (IX secolo)', def: 'Una sequenza finita di istruzioni che porta da un dato a un risultato. Chi decide, quando decide un algoritmo? È la terza domanda dell\'anno.' },
    'coscienza': { parola: 'coscienza', etim: 'dal latino *cum* e *scire*: sapere con sé, sapere insieme', def: '«Il nucleo più segreto e il sacrario dell\'uomo, dove egli è solo con Dio» (Gaudium et spes, 16).' }
  },

  studio: {
    sezioni: [
      { titolo: 'Cinque parole in latino', testo: 'Alla lavagna ci sono cinque parole: *inquietum est cor nostrum*. Le ha scritte, intorno all\'anno 397, un vescovo dell\'Africa romana che aveva allora quarantatré anni: Agostino di Ippona, che la Chiesa riconosce come Padre e come {Dottore della Chiesa}. Fanno parte della prima pagina delle {Confessioni}, e sono probabilmente la frase più citata di tutta la letteratura cristiana.\n\n«ci hai fatti per te, e il nostro cuore è inquieto finché non riposa in te» (Agostino, Confessioni I, 1, 1).\n\nLa frase dice una cosa precisa e verificabile su di noi, prima ancora che su Dio: che l\'essere umano non si accontenta. Ottiene una cosa e ne vuole un\'altra; raggiunge un risultato e dopo due settimane gli sembra poco. Agostino chiama questa condizione inquietudine e la considera un indizio, non un difetto: il segno che si sta cercando qualcosa di più grande di ciò che si sta cercando.' },
      { titolo: 'Le Confessioni non sono un diario', testo: 'Le *Confessioni* vengono spesso presentate come la prima autobiografia della storia. È una descrizione imprecisa. Agostino non racconta la propria vita per farla conoscere: la rilegge per capire che cosa stesse cercando davvero negli anni in cui era convinto di cercare altro — la carriera, il successo retorico, le relazioni, le scuole filosofiche che frequentava una dopo l\'altra.\n\nIl libro è quindi un **esame**, e procede guardando tre cose: ciò che ha fatto, ciò che ha evitato di fare, ciò che desiderava senza saperlo nominare. Nel libro X arriva al punto in cui ammette di essere diventato, per se stesso, una domanda a cui non sa rispondere. È un\'ammissione che vale la pena tenere presente: viene da un uomo che di mestiere spiegava le cose agli altri.\n\nChi non ha mai guardato indietro con onestà non ha materiale per decidere che cosa fare davanti.' },
      { titolo: 'Le tre righe', testo: 'L\'esercizio di questa prima ora è lo stesso esame, ridotto a un\'estate e a otto minuti. Su un foglietto senza nome si scrivono tre righe.\n\n**Un fatto.** Il momento dell\'estate che rifaresti identico. Attenzione alla distinzione: non il momento più bello da raccontare, ma il più bello da vivere. Spesso non coincidono, e accorgersene in anticipo rende più semplice l\'unità di quest\'anno dedicata agli algoritmi.\n\n**Un\'omissione.** Una cosa che hai rimandato, evitato o non detto. Può essere minima — una telefonata, una risposta, una verità detta a metà. Deve essere vera.\n\n**Un\'attesa.** Che cosa ti aspetti da quest\'anno, in tre parole. Vale anche «niente»: è un dato onesto e vale quanto gli altri.\n\nI foglietti vengono poi mescolati e ridistribuiti, e ciascuno legge ad alta voce quello che gli è capitato, senza commentarlo e senza tentare di indovinare di chi sia. Chi preferisce non leggere passa il foglietto al vicino, e nessuno chiede il motivo. L\'anonimato non serve a nascondersi: serve a permettere a una classe di dire cose che, con il nome sopra, non direbbe.\n\n**Per riflettere.** Perché il ricordo più bello da raccontare e quello più bello da vivere spesso non coincidono? Che cosa cambia, nell\'ascoltare, quando non sai chi ha scritto la frase che stai leggendo?' },
      { titolo: 'Perché queste tre righe sono già il programma', testo: 'Le tre righe non sono un riscaldamento. Contengono, in miniatura, le tre operazioni su cui si lavora tutto l\'anno. Nella prima hai **scelto**: fra decine di giorni ne hai indicato uno, e per farlo hai usato un criterio, anche se non lo hai scritto. Nella seconda hai **riconosciuto un limite**: qualcosa che potevi fare e non hai fatto. Nella terza hai **formulato un\'attesa**, cioè un giudizio sul futuro che non poggia su nulla di dimostrabile.\n\nScegliere secondo un criterio, riconoscere un limite, sperare qualcosa che non si può dimostrare: sono tre operazioni che nessuna macchina compie al posto tuo. Un modello linguistico scrive un tema sulle vacanze meglio della media di questa classe. Non può dirti quale giorno della tua estate rifaresti.' },
      { titolo: 'La domanda dell\'anno e i tre verbi', testo: 'Chi ha l\'ultima parola: la scienza, l\'{algoritmo} o la {coscienza}? È la domanda a cui rispondono, una per volta, le unità di quest\'anno.\n\nIl metodo per affrontarla sta in tre verbi. La scienza dice **come** funziona il mondo: è il suo mestiere, e lo fa con strumenti che nessun altro sapere possiede. La fede si occupa del **perché** il mondo ci sia e che senso abbia: una domanda che la scienza, per statuto, non pone. L\'etica risponde alla terza, la più scomoda: **fino a dove** ci si può spingere con ciò che la scienza permette di fare.\n\nQuasi tutte le discussioni che capita di leggere su questi temi sbagliano allo stesso modo: fanno scivolare un verbo nell\'altro. Chi usa un risultato scientifico per dimostrare Dio fa scivolare il «come» nel «perché». Chi chiude un problema etico dicendo «ma la scienza dice che si può» fa scivolare il «come» nel «fino a dove». Riconoscere lo scivolamento, dargli un nome e non caderci è la competenza che resta alla fine dell\'anno.' },
      { titolo: 'Le cinque domande e il patto', testo: 'Il programma è fatto di cinque domande in fila, più il lavoro finale. **Uno:** la scienza e la fede rispondono alla stessa domanda? È l\'unità più lunga, e comincia dalla storia di un sacerdote che corregge Einstein e più tardi frena un Papa. **Due:** che cosa succede quando la scienza non ha più un limite? Il Novecento ha risposto con la bomba e con l\'eugenetica di Stato, ed è da lì che nasce l\'etica della ricerca che usiamo oggi. **Tre:** chi decide, quando decide un algoritmo? **Quattro:** che cosa si deve a chi sta morendo? **Cinque:** una promessa ha ancora senso, in un mondo che ottimizza tutto? Infine **Talenti**: l\'unità in cui ciascuno porta davanti a un pubblico ciò che sa fare meglio.\n\nIl patto è breve. Un\'ora alla settimana significa nessun minuto di riempitivo: ogni lezione porta un testo, una data e una fonte, e quando affermo qualcosa senza sapere da dove viene lo dichiaro invece di farlo passare. Dall\'altra parte: nessuna domanda è vietata, comprese quelle contro; si può non credere e prendere il massimo, perché qui si valuta il pensiero e non l\'appartenenza; e non si giudica una posizione dal titolo, né una persona dalla sua.\n\nQuesto secondo punto non è una concessione, ma un principio che la Chiesa afferma in un documento del Concilio Vaticano II: «la coscienza è il nucleo più segreto e il sacrario dell\'uomo, dove egli è solo con Dio» (Gaudium et spes, n. 16, 7 dicembre 1965).\n\nI foglietti delle tre righe finiscono in una scatola che non apre nessuno e si riaprono a maggio, nell\'unità finale: si guarderà quali attese si siano avverate, quali siano cambiate e quali siano rimaste dove stavano. È l\'unico compito di quest\'ora che si consegna fra nove mesi.\n\n«La fede e la ragione sono come le due ali con le quali lo spirito umano s\'innalza verso la contemplazione della verità» (Giovanni Paolo II, lettera enciclica Fides et ratio, incipit, 14 settembre 1998).' }
    ],
    fonti: [
      'Agostino, *Confessioni* I, 1, 1',
      'Agostino, *Confessioni* X (l\'ammissione di essere diventato una domanda per se stesso: senso documentato, formulazione resa in forma indiretta perché varia secondo l\'edizione)',
      'Concilio Vaticano II, costituzione pastorale *Gaudium et spes*, n. 16, 7 dicembre 1965',
      'Giovanni Paolo II, lettera enciclica *Fides et ratio*, incipit, 14 settembre 1998'
    ]
  }
};

/* ============================================================
   Componenti su misura
   ============================================================ */

/* Stile minimo dei componenti propri: solo token del kit, iniettato una volta. */
(function () {
  if (document.getElementById('v0-css')) return;
  var st = document.createElement('style'); st.id = 'v0-css';
  st.textContent = [
    '.v0-righe{display:grid;gap:13px}',
    '.v0-riga{display:grid;grid-template-columns:auto 1fr;gap:13px;align-items:start}',
    '.v0-riga.is-off{display:none}',
    '.v0-n{display:inline-grid;place-items:center;width:34px;height:34px;border-radius:50%;border:1.5px solid var(--lab-oro);color:var(--lab-oro);font-weight:700;font-variant-numeric:tabular-nums}',
    '.v0-riga b{display:block;font-size:1.15em;margin-bottom:3px}',
    '.v0-riga p{margin:0}',
    '.v0-riga .ll-hint{margin:3px 0 0}',
    '.v0-ta{width:100%;min-height:4.5em;resize:vertical;margin-top:8px;padding:8px 10px;border-radius:8px;border:1px solid var(--lab-line);background:var(--lab-surface);color:var(--lab-ink);font:inherit;line-height:1.5}',
    '.v0-ta:focus-visible{outline:2px solid var(--lab-oro);outline-offset:2px}',
    '.v0-prog{display:grid;gap:8px}',
    '.v0-tab{display:grid;grid-template-columns:auto 1fr;gap:13px;align-items:center;text-align:left;padding:10px 13px;border-radius:12px;border:1px solid var(--lab-line);background:var(--lab-surface);color:var(--lab-ink);font:inherit;cursor:pointer}',
    '.v0-tab:hover{border-color:var(--lab-oro)}',
    '.v0-tab:focus-visible{outline:2px solid var(--lab-oro);outline-offset:2px}',
    '.v0-tab:active{transform:translateY(1px)}',
    '.v0-tab.is-open{border-color:var(--la-accent);box-shadow:inset 3px 0 0 var(--la-accent)}',
    '.v0-tab.is-off{display:none}',
    '.v0-tab i{font-style:normal;display:inline-grid;place-items:center;min-width:34px;height:34px;padding:0 8px;border-radius:999px;border:1.5px solid var(--lab-oro);color:var(--lab-oro);font-weight:700}',
    '.v0-tab.is-open i{background:var(--la-accent);border-color:var(--la-accent);color:var(--lab-bg,#fff)}',
    '.v0-tab span{font-weight:600}',
    '.v0-det{margin-top:8px}',
    '.v0-det p{margin:0 0 8px}'
  ].join('\n');
  document.head.appendChild(st);
})();

/* Le tre righe: le consegne si mostrano una alla volta (il docente le legge mentre la classe scrive);
   la versione scritta serve a chi era assente o vuole rifarlo con calma. Nulla viene salvato né inviato. */
LabLezione.registra('TreRighe', function (p) {
  var RIGHE = [
    { t: 'Un fatto', d: 'Il momento dell\'estate che rifaresti identico.', nota: 'Non il più bello da raccontare: il più bello da vivere. Spesso non coincidono.', ph: 'Una riga basta.' },
    { t: 'Un\'omissione', d: 'Una cosa che hai rimandato, evitato o non detto.', nota: 'Può essere minima. Deve essere vera.', ph: 'Una riga basta.' },
    { t: 'Un\'attesa', d: 'Che cosa ti aspetti da quest\'anno. Tre parole, non una frase.', nota: 'Vale anche «niente», se è quello che pensi.', ph: 'Tre parole.' }
  ];
  var s = React.useState(1), n = s[0], setN = s[1];
  var w = React.useState(false), scritta = w[0], setScritta = w[1];
  var v = React.useState(['', '', '']), val = v[0], setVal = v[1];
  var e = React.useState(''), esito = e[0], setEsito = e[1];
  function scrivi(i, x) { var c = val.slice(); c[i] = x; setVal(c); }
  function scarica() {
    var pieni = val.filter(function (x) { return x.trim() !== ''; }).length;
    if (pieni < 3) { setEsito('Mancano ancora ' + (3 - pieni) + ' righe su 3.'); return; }
    var out = ['LE MIE TRE RIGHE', ''];
    RIGHE.forEach(function (r, i) { out.push((i + 1) + ' · ' + r.t, val[i].trim(), ''); });
    try {
      var b = new Blob([out.join('\n')], { type: 'text/plain;charset=utf-8' }), a = document.createElement('a');
      a.href = URL.createObjectURL(b); a.download = 'le-mie-tre-righe.txt'; document.body.appendChild(a); a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
      setEsito('Tre righe complete. Nessun dato è stato salvato o inviato.'); p.ctx.cheer();
    } catch (err) { setEsito('Tre righe complete: ricopiale sul foglietto.'); }
  }
  return html`<div className="la-card" data-flat>
    <span className="la-meta">Sul foglietto, senza nome</span>
    <div className="v0-righe" aria-live="polite">
      ${RIGHE.map(function (r, i) { return html`<div key=${i} className=${'v0-riga' + (i < n ? '' : ' is-off')} aria-hidden=${i >= n}>
        <span className="v0-n" aria-hidden="true">${i + 1}</span>
        <div>
          <b>${r.t}</b>
          <p>${r.d}</p>
          <p className="ll-hint">${r.nota}</p>
          ${scritta && html`<textarea className="v0-ta" aria-label=${'Riga ' + (i + 1) + ': ' + r.t} placeholder=${r.ph} value=${val[i]} onInput=${function (ev) { scrivi(i, ev.target.value); }}></textarea>`}
        </div>
      </div>`; })}
    </div>
    <div className="ll-row">
      ${n < 3
        ? html`<button className="ll-btn" onClick=${function () { setN(n + 1); }}>Mostra la riga ${n + 1}</button>`
        : html`<button className=${'ll-btn' + (scritta ? '' : ' ll-btn--ghost')} aria-pressed=${scritta} onClick=${function () { setScritta(!scritta); setEsito(''); }}>${scritta ? 'Nascondi la versione scritta' : 'Versione scritta'}</button>`}
      ${n >= 3 && !scritta && html`<button className="ll-link" onClick=${function () { setN(1); }}>Ricomincia dalla riga 1</button>`}
      <span className="ll-tally">${n} / 3</span>
    </div>
    ${scritta && html`<div>
      <div className="ll-row">
        <button className="ll-btn" onClick=${scarica}>Scarica le mie tre righe</button>
        <button className="ll-btn ll-btn--ghost" onClick=${function () { setVal(['', '', '']); setEsito('Cancellato.'); }}>Cancella</button>
        <span className="ll-tally" role="status" aria-live="polite">${esito}</span>
      </div>
      <p className="ll-hint">Per chi era assente o vuole rifarlo con calma. Nessun dato viene raccolto, salvato o trasmesso: chiudendo o ricaricando la pagina, quanto hai scritto sparisce.</p>
    </div>`}
  </div>`;
});

/* Il programma dell'anno: cinque domande in fila più il lavoro finale; si aprono una per volta */
LabLezione.registra('Programma', function (p) {
  var UNITA = [
    { k: '1', q: 'La scienza e la fede rispondono alla stessa domanda?', d: 'È l\'unità più lunga, e comincia dalla storia di un sacerdote che corregge Einstein e più tardi frena un Papa.' },
    { k: '2', q: 'Che cosa succede quando la scienza non ha più un limite?', d: 'Il Novecento ha risposto con la bomba e con l\'eugenetica di Stato, ed è da lì che nasce l\'etica della ricerca che usiamo oggi.' },
    { k: '3', q: 'Chi decide, quando decide un algoritmo?', d: 'È l\'unità a cui prepara la prima riga: il momento più bello da raccontare e quello più bello da vivere spesso non coincidono.' },
    { k: '4', q: 'Che cosa si deve a chi sta morendo?', d: '' },
    { k: '5', q: 'Una promessa ha ancora senso, in un mondo che ottimizza tutto?', d: '' },
    { k: '+', q: 'Talenti', d: 'L\'unità finale, in cui ciascuno porta davanti a un pubblico ciò che sa fare meglio. Qui si riapre la scatola dei foglietti.' }
  ];
  var s = React.useState(1), n = s[0], setN = s[1];
  var o = React.useState(null), aperta = o[0], setAperta = o[1];
  var u = aperta === null ? null : UNITA[aperta];
  return html`<div>
    <div className="v0-prog" role="list" aria-label="Le cinque domande dell'anno">
      ${UNITA.map(function (x, i) { return html`<button key=${i} role="listitem" className=${'v0-tab' + (aperta === i ? ' is-open' : '') + (i < n ? '' : ' is-off')} aria-pressed=${aperta === i} aria-hidden=${i >= n} onClick=${function () { setAperta(aperta === i ? null : i); }}>
        <i aria-hidden="true">${x.k}</i><span>${x.q}</span>
      </button>`; })}
    </div>
    <div aria-live="polite">${u && u.d && html`<div key=${aperta} className="la-card v0-det" data-flat><span className="la-meta">${u.k === '+' ? 'Unità finale' : 'Domanda ' + u.k}</span><p>${u.d}</p></div>`}</div>
    <div className="ll-row">
      ${n < UNITA.length
        ? html`<button className="ll-btn" onClick=${function () { setN(n + 1); if (n + 1 === UNITA.length) p.ctx.say('Cinque domande e un lavoro finale: è l\'anno.'); }}>${n < 5 ? 'La domanda successiva' : 'E alla fine'}</button>`
        : html`<button className="ll-btn ll-btn--ghost" onClick=${function () { setN(1); setAperta(null); }}>Ricomincia</button>`}
      <span className="ll-tally">${Math.min(n, 5)} / 5${n > 5 ? ' + Talenti' : ''}</span>
    </div>
    <p className="ll-hint">Toccate una domanda per aprirla: le attese appena lette si agganciano a queste.</p>
  </div>`;
});
