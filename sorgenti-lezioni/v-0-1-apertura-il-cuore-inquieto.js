/* ---- lezione ---- */
/* Classe V · Accoglienza (UDA 0) · Lezione 1 — «Il cuore inquieto». Apertura dell'anno.
   Artefatto interattivo, 7 ottobre 2026, rifatto con la skill «IRC · Artefatto interattivo della lezione».
   Testi di Agostino: traduzioni originali dal latino delle Confessioni (I,1,1; VIII,7,17; X,8,15; X,33,50).
   Gaudium et spes 16 e Fides et ratio (incipit): testo italiano della Santa Sede. Etimologie: Vocabolario Treccani.
   Note per il docente, piano dei 50 minuti, soluzioni e fonti: v-0-1-apertura-il-cuore-inquieto.docente.md.
   Nulla viene salvato: sondaggi, nuvola e giochi restano in memoria finché la pagina è aperta.
   © Matteo Sestili — Tutti i diritti riservati */
window.LEZIONE = {
  slug: 'v-0-1-apertura-il-cuore-inquieto',
  classe: 'Anno V',
  titolo: 'Il cuore *inquieto*',
  sottotitolo: 'Apertura dell’anno: l’esame di sé di Agostino, tre righe senza nome e la domanda che regge l’anno. Chi ha l’ultima parola: la scienza, l’algoritmo o la coscienza?',
  saluto: 'Ultima tappa: i foglietti restano nella scatola fino a maggio.',
  glossario: {
    'inquieto': { etim: 'dal latino *inquietus*, composto di *in-*, «non», e *quietus*, «quieto» (da *quies*, «riposo»)', def: 'Che non trova riposo. Per Agostino l’inquietudine non è un difetto: è l’indizio che si cerca qualcosa di più grande di ciò che si ha.' },
    'confessione': { parola: 'Confessioni', etim: 'dal latino *confessio*, da *confiteri*, «riconoscere apertamente», composto di *con-* e *fateri*, «ammettere, dichiarare»', def: 'L’opera in cui Agostino, intorno al 397–400, rilegge la propria vita davanti a Dio. Per lui *confessio* è insieme riconoscere le proprie colpe e lodare Dio: non un diario, un esame.' },
    'esame': { etim: 'dal latino *examen*, «ago della bilancia», poi «pesatura, esame» (da *exigere*, «pesare»)', def: 'Prima di essere una prova a scuola, l’esame è l’ago che si ferma quando i due piatti sono in equilibrio. Esaminarsi è pesare la propria vita senza truccare la bilancia.' },
    'dottore della chiesa': { parola: 'Dottore della Chiesa', etim: 'dal latino *doctor*, «maestro», da *docere*, «insegnare»', def: 'Titolo con cui la Chiesa riconosce un santo il cui insegnamento vale per tutti. Agostino (354–430), vescovo di Ippona, è Padre e Dottore della Chiesa.' },
    'omissione': { etim: 'dal latino *omissio*, da *omittere*, «tralasciare», composto di *ob-* e *mittere*, «lasciar andare»', def: 'Ciò che si poteva fare e non si è fatto. Anche una cosa tralasciata dice chi siamo.' },
    'criterio': { etim: 'dal latino tardo *criterium*, dal greco *kritḗrion*, da *krínō*, «distinguere, giudicare»', def: 'La regola con cui si sceglie fra più possibilità. Chi sceglie usa sempre un criterio, anche quando non lo dichiara.' },
    'algoritmo': { etim: 'dal latino medievale *algorismus*, dal nome del matematico persiano al-Khwārizmī (IX secolo), con l’influsso del greco *arithmós*, «numero»', def: 'Una sequenza finita di istruzioni che porta da certi dati a un risultato. Calcola e prevede; resta da capire chi decide quando decide un algoritmo.' },
    'coscienza': { etim: 'dal latino *conscientia*, da *conscire*, «essere consapevole», composto di *con-* e *scire*, «sapere»', def: 'Il luogo interiore in cui la persona giudica ciò che fa e ciò che deve fare. Per il Concilio Vaticano II è «il nucleo più segreto e il sacrario dell’uomo» (*Gaudium et spes* 16).' },
    'etica': { etim: 'dal latino *ethica*, dal greco *ēthikḗ*, da *êthos*, «costume, carattere»', def: 'La riflessione su ciò che è bene fare. Davanti alla scienza chiede «fino a dove»: non tutto ciò che si può fare si deve fare.' },
    'scivolamento': { def: 'L’errore di passare da una domanda all’altra senza un argomento: da «come funziona» a «che senso ha», oppure da «si può fare» a «si deve fare».' }
  },
  scene: [
    /* 1 · Aggancio — cinque parole latine e il sondaggio d'ingresso */
    { fase: 'Aggancio', momento: 'Apertura', minuti: 3, titolo: 'Il cuore *inquieto*',
      lead: 'Cinque parole latine, scritte più di sedici secoli fa. Prima di sapere chi le ha scritte, proviamo a leggerle.',
      blocchi: [
        { tipo: 'originale', lingua: 'Latino · cinque parole', lang: 'la', istruzione: 'Tocca una parola: sopra la pronuncia, sotto il significato.',
          parole: [
            { o: 'inquietum', tr: 'in-kuiètum', it: '«**inquieto**»: *in-*, «non», e *quies*, «riposo». Ciò che non sta fermo.' },
            { o: 'est', tr: 'est', it: '«è»: il verbo è al presente. Non «era», non «sarà».' },
            { o: 'cor', tr: 'kor', it: '«**cuore**»: per gli antichi non solo i sentimenti, ma il centro della persona, dove si decide.' },
            { o: 'nostrum', tr: 'nòstrum', it: '«nostro»: chi scrive non parla solo di sé. Parla di tutti.' },
            { o: 'donec…', tr: 'dònek', it: '«**finché**…»: la frase non è finita. L’inquietudine ha un termine: lo scopriremo nella prossima scena.' }
          ],
          traduzione: '«Il nostro cuore è inquieto, finché…»' },
        { tipo: 'domanda', id: 'ingresso', etichetta: 'Anonimo · per alzata di mano',
          q: 'Un algoritmo che conoscesse tutta la vostra estate, foto, posizioni, acquisti e messaggi, saprebbe dire quale giorno rifareste identico?',
          opzioni: ['Sì, meglio di me', 'Lo indovinerebbe, ma non lo saprebbe', 'No', 'Non so'],
          dibattito: 'Teniamo questi voti: a fine ora rifaremo la stessa domanda.' }
      ] },

    /* 2 · Fonte — Confessioni I,1,1: la frase intera (anello 1) */
    { fase: 'Scoperta', momento: 'Fonte', minuti: 4, titolo: 'Finché *non riposa*',
      lead: 'Agostino, vescovo di Ippona e {Dottore della Chiesa}, scrive intorno al 397 la prima pagina delle {Confessioni|confessione}. Ecco la frase intera.',
      blocchi: [
        { tipo: 'leggi', q: 'Quale frase spiega **perché** il cuore non trova pace?',
          testo: '«Grande sei, Signore, e degno di ogni lode […]. Eppure [[un uomo, una piccola parte della tua creazione, vuole lodarti::**Il desiderio.** Prima dell’inquietudine c’è un desiderio: l’uomo vuole qualcosa che lo supera. È un sintomo, non ancora la spiegazione.]]. Sei tu che lo spingi a trovare gioia nel lodarti, perché [[!ci hai fatti per te::**La ragione.** In latino *fecisti nos ad te*: letteralmente «verso di te». L’uomo è fatto con una direzione; per questo nulla di meno lo ferma.]], e [[il nostro cuore è inquieto finché non riposa in te::**La conseguenza.** Il cuore {inquieto} è l’effetto, non la causa: è il segno di quella direzione. Ed è la prima volta che l’espressione compare nella letteratura latina.]].»',
          fonte: 'Agostino, Confessioni I,1,1 (scritte intorno al 397–400). Traduzione originale dal latino' }
      ] },

    /* 3 · Scoperta — che cosa pesa un esame (anello 2) */
    { fase: 'Scoperta', momento: 'Spiegazione', minuti: 4, titolo: 'Non un diario: un *esame*',
      lead: 'Agostino non racconta la sua vita per farla conoscere: la rilegge per capire che cosa cercava davvero.',
      blocchi: [
        { tipo: 'parola', parola: 'examen', radice: 'ex', origine: 'Dal latino examen, «ago della bilancia» (da exigere, «pesare»)',
          significato: 'Prima di essere una prova a scuola, l’{esame} è l’**ago della bilancia**: si ferma quando i piatti sono in equilibrio. Esaminarsi è pesare la propria vita senza truccare la bilancia.',
          battuta: 'Un esame pesa: non punisce.' },
        { tipo: 'strati', titolo: 'Che cosa mette sulla bilancia Agostino', pulsante: 'Che cosa ha fatto',
          livelli: [
            { t: 'Il fatto', d: 'Ciò che ha fatto: la carriera di retore, il successo, le relazioni, le scuole filosofiche frequentate una dopo l’altra.' },
            { t: 'Il rinvio', d: 'Ciò che ha evitato e rimandava. Ricorda di aver pregato così: «Dammi la castità e la continenza, ma non subito» (VIII,7,17).' },
            { t: 'Il desiderio', d: 'Ciò che desiderava senza saperlo: sotto tutte le ricerche, una sola, che non sapeva nominare: il riposo del cuore della prima pagina.' },
            { t: 'La domanda', d: 'Chi è lui? Nel libro X ammette: *mihi quaestio factus sum*, «sono diventato una domanda per me stesso» (X,33,50). Lo scrive un uomo che di mestiere spiegava le cose agli altri.' }
          ],
          fine: 'Chi non guarda indietro con onestà non ha materiale per decidere davanti.' }
      ] },

    /* 4 · Attività — le tre righe, in silenzio (anello 3) */
    { fase: 'Attività', momento: 'Laboratorio', minuti: 8, titolo: 'Tre righe, nessun *nome*',
      lead: 'Lo stesso esame, ridotto a un’estate e a cinque minuti. Un foglietto bianco, nessun nome, silenzio.',
      blocchi: [
        { tipo: 'custom', nome: 'Foglietto', props: {} },
        { tipo: 'consegna', titolo: 'Cinque minuti di silenzio', modalita: 'Da soli', minuti: 5,
          passi: ['Riga 1 · Un fatto', 'Riga 2 · Un’{omissione}', 'Riga 3 · Un’attesa, in tre parole'],
          prodotto: 'un foglietto senza nome, piegato in due. Poi si mescolano tutti, davanti a tutti.',
          fine: 'Tempo. Piegate il foglietto: si mescola.' }
      ] },

    /* 5 · Attività — si legge la riga di un altro: solo le attese (anello 3) */
    { fase: 'Attività', minuti: 5, titolo: 'La riga di un *altro*',
      lead: 'Ognuno pesca un foglietto che non è il suo e legge ad alta voce **solo la terza riga**. Le prime due restano piegate.',
      blocchi: [
        { tipo: 'nuvola', id: 'attese', q: 'Che cosa si aspetta questa classe dall’ultimo anno?',
          istruzione: 'Il docente scrive le parole che tornano; toccate una parola ripetuta per farla crescere. Vale anche «niente»: è un dato onesto.' },
        { tipo: 'nota', icona: '', t: 'Si legge senza commentare e senza indovinare di chi sia. Chi preferisce non leggere passa il foglietto al vicino: nessuno chiede il motivo. L’anonimato non serve a nascondersi: permette a una classe di dire ciò che, con il nome sopra, non direbbe.' }
      ] },

    /* 6 · Scoperta — tre operazioni che nessuno fa al posto tuo (anello 4) */
    { fase: 'Attività', momento: 'Decidete voi', minuti: 4, titolo: 'Al posto *tuo*?',
      lead: 'Nelle tre righe avete fatto tre cose: **scelto** con un {criterio}, **riconosciuto** un limite, **sperato**. Che cosa può fare una macchina, e che cosa no?',
      blocchi: [
        { tipo: 'smista', titolo: 'Chi può farlo?', categorie: ['Una macchina può farlo', 'Nessuno può farlo al posto tuo'],
          voci: [
            { t: 'Scrivere un buon tema sulle vacanze', c: 0, why: 'Un modello linguistico lo scrive meglio della media di una classe: combina bene ciò che ha letto.' },
            { t: 'Dire quale giorno della tua estate rifaresti identico', c: 1, why: 'Una macchina può **prevedere** il giorno più fotografato. **Scegliere** il più bello da vivere richiede il tuo criterio: è la prima riga.' },
            { t: 'Contare i messaggi a cui non hai risposto', c: 0, why: 'È un calcolo: lo fa qualunque telefono.' },
            { t: 'Riconoscere che quel silenzio era un tuo limite', c: 1, why: 'Il conteggio dice quanti; riconoscere il limite è un giudizio su di sé. È la seconda riga.' },
            { t: 'Prevedere che cosa comprerai a settembre', c: 0, why: 'Dai dati del passato si stima il futuro probabile: è il mestiere degli {algoritmi|algoritmo}.' },
            { t: 'Sperare qualcosa da quest’anno', c: 1, why: 'Una speranza non è una previsione: non poggia su nulla di dimostrabile, e impegna chi la formula. È la terza riga.' }
          ],
          chiusura: 'Scegliere secondo un criterio, riconoscere un limite, sperare: **calcolare non basta** per nessuna delle tre. Su questo confine si gioca l’anno.' },
        { tipo: 'aggancio', etichetta: 'Oggi', titolo: 'Un modello linguistico e la tua estate',
          t: 'Un modello linguistico scrive un tema sulle vacanze meglio della media di questa classe. Non può dirti quale giorno della tua estate rifaresti: può solo indovinare quello che hai raccontato di più.' }
      ] },

    /* 7 · Scoperta — la domanda dell'anno e i tre verbi (anelli 5-6, concetto più difficile) */
    { fase: 'Scoperta', momento: 'La domanda dell’anno', minuti: 6, titolo: 'Chi ha l’*ultima* parola?',
      lead: 'La scienza, l’{algoritmo} o la {coscienza}? Per rispondere servono tre verbi, e un errore da riconoscere: lo {scivolamento}.',
      blocchi: [
        { tipo: 'citazione',
          testo: 'E gli uomini vanno ad ammirare le vette dei monti, le onde enormi del mare, il corso larghissimo dei fiumi, l’ampiezza dell’Oceano e le orbite delle stelle, e trascurano se stessi.',
          fonte: 'Agostino, Confessioni X,8,15. Traduzione originale',
          pulsante: 'Che cosa c’entra con quest’anno?',
          commento: 'Agostino non disprezza chi guarda le stelle: chiede lo stesso stupore per chi guarda. Quest’anno faremo le due cose. Guarderemo il cosmo con la scienza, e chiederemo chi lo guarda e che cosa può fare con ciò che sa.' },
        { tipo: 'animazione', id: 'verbi', titolo: 'Tre verbi, due scivolamenti', rapporto: 1.618, ritmo: 3236, pulsante: 'Avvia l’animazione',
          attori: [
            { id: 'C', t: 'Come', forma: 'riquadro', colore: 'ciano' },
            { id: 'P', t: 'Perché', forma: 'riquadro', colore: 'accent' },
            { id: 'F', t: 'Fino a dove', forma: 'riquadro', colore: 'rosa' },
            { id: 'a', t: 'Il cosmo si espande', forma: 'pillola', colore: 'oro' },
            { id: 'ax', t: 'Allora Dio è provato', forma: 'pillola', colore: 'rosso' },
            { id: 'b', t: 'La tecnica lo permette', forma: 'pillola', colore: 'oro' },
            { id: 'bx', t: 'Allora è lecito', forma: 'pillola', colore: 'rosso' },
            { id: 'p2', t: 'Che senso ha?', forma: 'pillola', colore: 'verde' },
            { id: 'f2', t: 'È giusto farlo?', forma: 'pillola', colore: 'verde' }
          ],
          frecce: [
            { id: 's1', da: 'a', a: 'ax', t: 'scivola', tratteggio: true, curva: 8 },
            { id: 's2', da: 'b', a: 'bx', t: 'scivola', tratteggio: true, curva: -8 },
            { id: 'o1', da: 'a', a: 'p2', t: 'apre' },
            { id: 'o2', da: 'b', a: 'f2', t: 'apre' }
          ],
          passi: [
            { didascalia: 'Tre domande, tre saperi: la **scienza** dice come funziona il mondo, la **fede** cerca perché c’è e che senso ha, l’**etica** chiede fino a dove spingersi.',
              attori: { C: { x: 16, y: 16, on: true }, P: { x: 16, y: 50, on: true }, F: { x: 16, y: 84, on: true } } },
            { didascalia: 'Un risultato della cosmologia: l’universo si espande. È un «come», e sta al suo posto.',
              attori: { C: { on: true }, P: { on: false }, F: { on: false }, a: { x: 63, y: 16, on: true } } },
            { didascalia: 'Primo scivolamento: «allora Dio è provato». Dal «come» si salta al «perché» senza un argomento.',
              attori: { ax: { x: 63, y: 50, on: true }, P: { on: true } }, frecce: ['s1'] },
            { didascalia: 'Secondo scivolamento: «la tecnica lo permette, allora è lecito». Dal «come» si salta al «fino a dove».',
              attori: { a: { o: 0 }, ax: { o: 0 }, P: { on: false }, b: { x: 63, y: 16, on: true }, bx: { x: 63, y: 84, on: true }, F: { on: true } }, frecce: ['s2'] },
            { didascalia: 'Ogni verbo al suo posto: «il cosmo si espande» non chiude la domanda sul senso, la apre. E la passa a un altro sapere.',
              attori: { bx: { o: 0 }, b: { o: 0 }, F: { on: false }, a: { x: 63, y: 16, o: 1, on: true }, p2: { x: 63, y: 50, on: true }, P: { on: true } }, frecce: ['o1'] },
            { didascalia: 'Allo stesso modo «la tecnica lo permette» apre la domanda «è giusto farlo?»: la risposta spetta all’etica, non alla tecnica.',
              attori: { a: { o: 0 }, p2: { o: 0 }, P: { on: false }, b: { x: 63, y: 16, o: 1, on: true }, f2: { x: 63, y: 84, on: true }, F: { on: true } }, frecce: ['o2'] }
          ] },
        { tipo: 'aggancio', etichetta: 'Per capire', titolo: 'Petrarca, in cima al Mont Ventoux',
          t: 'Petrarca racconta di essere salito sul Mont Ventoux, in Provenza, e di aver aperto in cima le *Confessioni* che portava con sé: gli capitò proprio questa frase. Da lì, scrive, smise di guardare il panorama e guardò se stesso.',
          fonte: 'F. Petrarca, Familiares IV,1 (la salita è datata 26 aprile 1336)' }
      ] },

    /* 8 · Pausa gioco — Sfida a squadre (anelli 1-6) */
    { fase: 'Attività', momento: 'Pausa gioco', minuti: 6, titolo: 'Dove sta il *verbo*?',
      lead: 'Due squadre, nomi collettivi, nessun nome di persona. Si gioca su ciò che abbiamo appena visto.',
      blocchi: [
        { tipo: 'gioco', id: 'sfida', titolo: 'Sfida a squadre', testo: 'Dieci domande su Agostino, l’esame e i tre verbi. Chi sbaglia lascia la domanda all’altra squadra, che può rubarla.', pulsante: 'Si gioca' },
        { tipo: 'rivela', titolo: 'Al ritorno', iniziali: 1, pulsante: 'Altra domanda', passi: [
          { titolo: 'La più discussa', testo: 'Quale frase ha diviso di più le squadre? Era un «come», un «perché», un «fino a dove», o uno scivolamento?' },
          { titolo: 'Una vostra', testo: 'Pensate a una discussione che avete letto o sentito di recente: dove scivolava il verbo?' }
        ] }
      ] },

    /* 9 · Scoperta — il programma: cinque domande e il lavoro finale (anello 6) */
    { fase: 'Chiusura', momento: 'L’anno', minuti: 3, titolo: 'L’anno, in cinque *domande*',
      lead: 'Cinque domande in fila, più il lavoro finale. In ciascuna lavorano due verbi: ora sapete riconoscerli.',
      blocchi: [
        { tipo: 'custom', nome: 'Programma', props: {} }
      ] },

    /* 10 · Chiusura — il patto e la coscienza */
    { fase: 'Chiusura', momento: 'Il patto', minuti: 2, titolo: 'Un’ora a *settimana*',
      lead: 'Un’ora alla settimana significa nessun minuto di riempitivo. Il patto è breve.',
      blocchi: [
        { tipo: 'idee', titolo: 'Il patto', pulsante: 'Il primo punto', idee: [
          'Ogni lezione porta un testo, una data e una fonte. Quando non so da dove viene una cosa che dico, lo dichiaro invece di farla passare.',
          'Nessuna domanda è vietata, comprese quelle contro.',
          'Si può non credere e prendere il massimo: si valuta il pensiero, non l’appartenenza. Non si giudica una posizione dal titolo, né una persona dalla sua.'
        ] },
        { tipo: 'citazione',
          testo: 'La coscienza è il nucleo più segreto e il sacrario dell’uomo, dove egli si trova solo con Dio, la cui voce risuona nell’intimità propria.',
          fonte: 'Concilio Vaticano II, Gaudium et spes, n. 16 (7 dicembre 1965)',
          pulsante: 'Perché sta nel patto?',
          commento: 'Il terzo punto non è una concessione del docente: è un principio che la Chiesa afferma. Nella {coscienza} nessuno può entrare al posto di un altro, e un voto non la misura.' }
      ] },

    /* 11 · Chiusura — prova breve su casi nuovi */
    { fase: 'Chiusura', momento: 'Prova', minuti: 3, titolo: 'Rimettete il verbo *al suo posto*',
      lead: 'Tre casi nuovi. Non si chiede che cosa credete: si chiede se riconoscete la domanda giusta.',
      blocchi: [
        { tipo: 'quiz', etichetta: 'Prova', domande: [
          { q: '«Le neuroscienze mostrano quali aree del cervello si attivano quando scegliamo: quindi la coscienza non decide niente.» Che cosa succede?',
            opzioni: ['Ogni verbo è al suo posto', 'È solo una domanda di fede', 'Il «come» scivola in una conclusione sul senso della persona', 'È solo un problema etico'], ok: 2,
            why: 'Descrivere **come** il cervello lavora mentre scegliamo è scienza. Concluderne che cosa sia la persona e che la sua scelta non conti è un salto di livello: serve un altro argomento.' },
          { q: 'Un’app sceglie per te il percorso più veloce. Che cosa **non** ha fatto al posto tuo?',
            opzioni: ['Decidere se valeva la pena partire', 'Calcolare i tempi di percorrenza', 'Confrontare le strade possibili', 'Leggere i dati del traffico'], ok: 0,
            why: 'Calcolare, confrontare e leggere dati sono operazioni di un {algoritmo}. Decidere se il viaggio valga la pena richiede un {criterio} tuo.' },
          { q: 'Per Agostino il cuore inquieto è…',
            opzioni: ['un difetto di carattere da correggere', 'il segno che non si crede in nulla', 'qualcosa che la tecnica prima o poi risolverà', 'l’indizio di ciò che si cerca davvero'], ok: 3,
            why: '«Ci hai fatti per te»: l’inquietudine è l’effetto di una direzione. Per questo nessun oggetto la placa del tutto.' }
        ], perfetto: 'Tre su tre: ogni verbo al suo posto.' }
      ] },

    /* 12 · Chiusura — ritorno alla domanda iniziale */
    { fase: 'Chiusura', minuti: 2, titolo: 'Il cuore *inquieto*, a giugno',
      testo: '**La risposta di oggi:** un algoritmo calcola e prevede; scegliere con un criterio, riconoscere un limite e sperare restano a chi li vive. «La fede e la ragione sono come le due ali con le quali lo spirito umano s’innalza verso la contemplazione della verità» (Giovanni Paolo II, *Fides et ratio*, 1998). Quest’anno le useremo tutte e due.',
      blocchi: [
        { tipo: 'domanda', id: 'uscita', confronta: 'ingresso', etichetta: 'Di nuovo, a fine ora',
          q: 'Un algoritmo che conoscesse tutta la vostra estate, foto, posizioni, acquisti e messaggi, saprebbe dire quale giorno rifareste identico?',
          opzioni: ['Sì, meglio di me', 'Lo indovinerebbe, ma non lo saprebbe', 'No', 'Non so'],
          dibattito: 'Se il voto si è spostato, chiediamo a chi ha cambiato idea che cosa l’ha convinto. Non c’è un punteggio sulle opinioni: conta la ragione.' },
        { tipo: 'continua', voci: [
          { t: 'La scatola', d: 'I foglietti restano chiusi fino a maggio, nell’unità Talenti: quali attese si sono avverate, quali sono cambiate.' },
          { t: 'Prossima tappa', d: 'La scienza e la fede rispondono alla stessa domanda? Si comincia da Georges Lemaître, sacerdote e fisico.' },
          { t: 'Ripassa giocando', d: 'Categorie dei tre verbi, vero o falso, abbinamenti.', vai: 'giochi', gioco: 'cat', principale: true }
        ] }
      ] }
  ],

  studio: {
    sezioni: [
      { titolo: 'La domanda',
        testo: 'Un algoritmo che conoscesse tutta la vostra estate, le foto, le posizioni, gli acquisti e i messaggi, saprebbe dire quale giorno rifareste identico? La domanda sembra tecnica, ma apre la questione che accompagna l’ultimo anno: **chi ha l’ultima parola, la scienza, l’algoritmo o la coscienza?** Per cominciare a rispondere partiamo da un uomo che, più di sedici secoli fa, ha provato a capire che cosa cercava davvero.' },
      { titolo: 'Cinque parole in latino',
        testo: '*Inquietum est cor nostrum*: «il nostro cuore è inquieto». Le ha scritte Agostino (354–430), vescovo di Ippona nell’Africa romana, che la Chiesa riconosce come Padre e **Dottore della Chiesa** (dal latino *doctor*, «maestro»). Stanno nella prima pagina delle **Confessioni**, composte intorno al 397–400. La frase intera dice: «Eppure un uomo, una piccola parte della tua creazione, vuole lodarti. Sei tu che lo spingi a trovare gioia nel lodarti, perché ci hai fatti per te, e il nostro cuore è inquieto finché non riposa in te» (*Confessioni* I,1,1).\n\nLa frase ha una struttura causale. Il **desiderio** viene prima: l’uomo vuole qualcosa che lo supera. La **ragione** è «ci hai fatti per te», in latino *fecisti nos ad te*, letteralmente «verso di te»: l’uomo è fatto con una direzione. **Per questo** il cuore è **inquieto** (dal latino *in-quietus*, «senza riposo») finché non arriva dove è diretto. L’inquietudine non è dunque un difetto da curare, ma un indizio: il segno che si cerca qualcosa di più grande di ciò che si ha. Ottenuta una cosa, se ne vuole un’altra; raggiunto un risultato, dopo due settimane sembra poco.' },
      { titolo: 'Le Confessioni non sono un diario',
        testo: 'Le *Confessioni* vengono spesso presentate come la prima autobiografia della storia. È una descrizione imprecisa. *Confessio*, da *confiteri*, «riconoscere apertamente», per Agostino vuol dire insieme riconoscere le proprie colpe e lodare Dio. Agostino non racconta la sua vita per farla conoscere: la rilegge per capire che cosa cercasse davvero negli anni in cui era convinto di cercare altro.\n\nIl libro è quindi un **esame**. La parola viene dal latino *examen*, l’**ago della bilancia**: esaminarsi è pesare la propria vita senza truccare la bilancia. Agostino mette sui piatti ciò che ha fatto (la carriera di retore, il successo, le relazioni, le scuole filosofiche frequentate una dopo l’altra), ciò che ha evitato (ricorda di aver pregato: «Dammi la castità e la continenza, ma non subito», VIII,7,17) e ciò che desiderava senza saperlo nominare. Nel libro X arriva ad ammettere: «sono diventato una domanda per me stesso» (*mihi quaestio factus sum*, X,33,50). Lo scrive un uomo che di mestiere spiegava le cose agli altri. **Ne segue** una regola semplice: chi non guarda indietro con onestà non ha materiale per decidere che cosa fare davanti.' },
      { titolo: 'Le tre righe',
        testo: 'L’esercizio della prima ora è lo stesso esame, ridotto a un’estate e a cinque minuti. Su un foglietto senza nome si scrivono tre righe.\n\n**Un fatto.** Il momento dell’estate che rifaresti identico. Attenzione alla distinzione: non il momento più bello da raccontare, ma il più bello da vivere. Spesso non coincidono.\n\n**Un’omissione.** Una cosa che hai rimandato, evitato o non detto (*omissione* viene da *omittere*, «tralasciare»). Può essere minima: una telefonata, una risposta, una verità detta a metà. Deve essere vera.\n\n**Un’attesa.** Che cosa ti aspetti da quest’anno, in tre parole. Vale anche «niente»: è un dato onesto.\n\nI foglietti si piegano e si mescolano davanti a tutti; ciascuno ne pesca uno e legge ad alta voce soltanto la terza riga, senza commentarla e senza cercare di indovinare chi l’abbia scritta. Chi preferisce non leggere passa il foglietto al vicino, e nessuno chiede il motivo. Le attese della classe diventano una nuvola di parole. L’anonimato non serve a nascondersi: permette a una classe di dire ciò che, con il nome sopra, non direbbe. Poi i foglietti finiscono in una scatola che nessuno apre fino a maggio.\n\nChi era assente può fare l’esercizio a casa, su carta: tre righe, per sé.' },
      { titolo: 'Tre operazioni che nessuno fa al posto tuo',
        testo: 'Le tre righe non sono un riscaldamento: contengono, in miniatura, le operazioni su cui si lavora tutto l’anno. Nella prima hai **scelto**: fra decine di giorni ne hai indicato uno, e per farlo hai usato un **criterio** (dal greco *kritḗrion*, da *krínō*, «distinguere, giudicare»), anche se non lo hai scritto. Nella seconda hai **riconosciuto un limite**: qualcosa che potevi fare e non hai fatto. Nella terza hai **sperato**: hai formulato un’attesa che non poggia su nulla di dimostrabile.\n\nUna macchina può fare molto: scrivere un tema sulle vacanze meglio della media di una classe, contare i messaggi rimasti senza risposta, prevedere che cosa comprerai a settembre. Un **algoritmo** (dal nome del matematico persiano al-Khwārizmī, IX secolo) è una sequenza finita di istruzioni che porta da certi dati a un risultato: calcola e prevede. Ma prevedere il giorno più fotografato non è scegliere il più bello da vivere; contare i silenzi non è riconoscere un limite; stimare il futuro probabile non è sperare. **Per questo** scegliere secondo un criterio, riconoscere un limite e sperare restano a chi li vive: nessuno li fa al posto tuo.' },
      { titolo: 'La domanda dell’anno e i tre verbi',
        testo: '«E gli uomini vanno ad ammirare le vette dei monti, le onde enormi del mare, il corso larghissimo dei fiumi, l’ampiezza dell’Oceano e le orbite delle stelle, e trascurano se stessi» (*Confessioni* X,8,15). Agostino non disprezza chi guarda le stelle: chiede lo stesso stupore per chi guarda. Francesco Petrarca racconta (*Familiares* IV,1) di aver letto proprio queste righe in cima al Mont Ventoux, e di aver smesso di guardare il panorama per guardare se stesso.\n\nQuest’anno faremo le due cose, e la domanda che le tiene insieme è: **chi ha l’ultima parola, la scienza, l’algoritmo o la coscienza?** Il metodo sta in tre verbi. La **scienza** dice **come** funziona il mondo: è il suo mestiere, e lo fa con strumenti che nessun altro sapere possiede. La **fede** si occupa del **perché** il mondo ci sia e di che senso abbia: una domanda che la scienza, per il suo metodo, non pone. L’**etica** (dal greco *êthos*, «costume») risponde alla terza, la più scomoda: **fino a dove** ci si può spingere con ciò che la scienza permette di fare.\n\nQuasi tutte le discussioni su questi temi sbagliano allo stesso modo: fanno **scivolare** un verbo nell’altro. Chi usa un risultato scientifico, come l’espansione dell’universo, per dimostrare Dio fa scivolare il «come» nel «perché». Chi chiude un problema etico dicendo «la tecnica lo permette, quindi è lecito» fa scivolare il «come» nel «fino a dove». Ogni verbo al suo posto, invece, il «come» non chiude le altre domande: le apre e le passa ad altri saperi. Riconoscere lo scivolamento, dargli un nome e non caderci è la competenza che resta alla fine dell’anno.' },
      { titolo: 'Le cinque domande',
        testo: 'Il programma è fatto di cinque domande in fila, più il lavoro finale. **Uno:** la scienza e la fede rispondono alla stessa domanda? È l’unità più lunga, e comincia da Georges Lemaître, sacerdote e fisico belga, che propone un universo in espansione quando Einstein lo pensava immobile, e che si rifiuta di usare la sua teoria come prova della creazione. **Due:** che cosa succede quando la scienza non ha più un limite? Il Novecento ha risposto con la bomba e con l’eugenetica di Stato, ed è da lì che nasce l’etica della ricerca che usiamo oggi. **Tre:** chi decide, quando decide un algoritmo? **Quattro:** che cosa si deve a chi sta morendo? **Cinque:** una promessa ha ancora senso, in un mondo che ottimizza tutto? Infine **Talenti**: l’unità in cui ciascuno porta davanti a un pubblico ciò che sa fare meglio, e in cui si riapre la scatola dei foglietti.' },
      { titolo: 'Il patto e la coscienza',
        testo: 'Il patto è breve. Un’ora alla settimana significa nessun minuto di riempitivo: ogni lezione porta un testo, una data e una fonte, e quando affermo qualcosa senza sapere da dove viene lo dichiaro invece di farlo passare. Dall’altra parte: nessuna domanda è vietata, comprese quelle contro; si può non credere e prendere il massimo, perché si valuta il pensiero e non l’appartenenza; non si giudica una posizione dal titolo, né una persona dalla sua.\n\nQuest’ultimo punto non è una concessione, ma un principio che la Chiesa afferma: «La coscienza è il nucleo più segreto e il sacrario dell’uomo, dove egli si trova solo con Dio, la cui voce risuona nell’intimità propria» (Concilio Vaticano II, *Gaudium et spes*, n. 16). La **coscienza** (dal latino *conscientia*, da *cum* e *scire*, «sapere con») è il luogo dove la persona giudica ciò che fa: nessuno può entrarvi al posto di un altro, e un voto non la misura.' },
      { titolo: 'La risposta',
        testo: 'Torniamo alla domanda iniziale. Un algoritmo che conoscesse tutta la vostra estate potrebbe indovinare il giorno più fotografato o più raccontato; non saprebbe quale rifareste identico, perché quella è una scelta secondo un criterio vostro. Il cuore inquieto di Agostino dice la stessa cosa da un’altra parte: l’uomo è fatto «verso» qualcosa, e per questo non si lascia ridurre a ciò che si può calcolare. Quest’anno la scienza dirà come funziona il mondo, e lo dirà con autorità; resteranno da porre, al loro posto, le domande del perché e del fino a dove. «La fede e la ragione sono come le due ali con le quali lo spirito umano s’innalza verso la contemplazione della verità» (Giovanni Paolo II, *Fides et ratio*, incipit, 14 settembre 1998).' },
      { titolo: 'Per lo studio',
        testo: '1. Spiega perché, nella frase di *Confessioni* I,1,1, l’inquietudine è una conseguenza e non una causa.\n\n2. Che cosa aggiunge l’etimologia di *esame* («ago della bilancia») al modo in cui Agostino rilegge la sua vita?\n\n3. Distingui, con un esempio tuo, una previsione di un algoritmo da una scelta secondo un criterio.\n\n4. Scrivi una frase in cui il «come» scivola nel «perché» e una in cui scivola nel «fino a dove»; poi correggile.' }
    ],
    fonti: [
      'Agostino, *Confessioni* I,1,1; VIII,7,17; X,8,15; X,33,50. Testo latino dell’edizione critica di L. Verheijen (CCSL 27, 1981), ripreso in J. J. O’Donnell, *Augustine: Confessions*, Oxford 1992. Traduzioni originali per questa lezione.',
      'F. Petrarca, *Familiares* IV,1, a Dionigi da Borgo San Sepolcro (salita datata 26 aprile 1336).',
      'Concilio Vaticano II, costituzione pastorale *Gaudium et spes*, n. 16 (7 dicembre 1965), testo italiano della Santa Sede; ripresa in Catechismo della Chiesa Cattolica, n. 1776.',
      'Giovanni Paolo II, lettera enciclica *Fides et ratio*, incipit (14 settembre 1998), testo italiano della Santa Sede.',
      'G. Lemaître, «Un univers homogène de masse constante et de rayon croissant…», *Annales de la Société scientifique de Bruxelles* A 47 (1927).',
      '*Vocabolario Treccani*, voci «inquieto», «confessione», «esame», «omissione», «criterio», «algoritmo», «coscienza», «etica», «dottore».'
    ]
  },

  giochi: {
    tema: 'Il cuore inquieto — Agostino, l’esame e i tre verbi',
    sfida: [
      { q: '«Ci hai fatti per te, e il nostro cuore è inquieto finché non riposa in te». Chi lo scrive?', a: ['Agostino', 'Petrarca', 'Giovanni Paolo II', 'Il Concilio Vaticano II'], ok: 0 },
      { q: 'Per Agostino l’inquietudine del cuore è…', a: ['un difetto da curare', 'l’indizio che si cerca qualcosa di più grande', 'una malattia della giovinezza', 'il segno che non si crede'], ok: 1 },
      { q: '«Esame» viene dal latino examen, che indicava…', a: ['il voto finale', 'il registro del maestro', 'l’ago della bilancia', 'la confessione dei peccati'], ok: 2 },
      { q: 'Nella seconda riga del foglietto, l’omissione, che cosa hai fatto?', a: ['Hai scelto con un criterio', 'Hai calcolato una probabilità', 'Hai sperato', 'Hai riconosciuto un limite'], ok: 3 },
      { q: '«Le galassie lontane si allontanano da noi.» Quale verbo?', a: ['Come', 'Perché', 'Fino a dove', 'Uno scivolamento'], ok: 0 },
      { q: '«Ha senso che esista qualcosa, invece del nulla?» Quale verbo?', a: ['Come', 'Perché', 'Fino a dove', 'Uno scivolamento'], ok: 1 },
      { q: '«È giusto lasciar decidere a un algoritmo chi assumere?» Quale verbo?', a: ['Come', 'Perché', 'Fino a dove', 'Uno scivolamento'], ok: 2 },
      { q: '«L’universo ha avuto un inizio: quindi la scienza ha dimostrato Dio.»', a: ['Il «come» al suo posto', 'Il «perché» al suo posto', 'Scivola dal «come» al «perché»', 'Scivola dal «come» al «fino a dove»'], ok: 2 },
      { q: '«Una tecnica permette di farlo: quindi è lecito.»', a: ['Il «come» al suo posto', 'Scivola dal «come» al «fino a dove»', 'Scivola dal «come» al «perché»', 'Il «fino a dove» al suo posto'], ok: 1 },
      { q: 'Nel libro X Agostino ammette di essere diventato…', a: ['un maestro di retorica', 'vescovo di Ippona', 'una domanda per se stesso', 'un uomo senza dubbi'], ok: 2 }
    ],
    cat: { bins: ['Come', 'Perché', 'Fino a dove'], items: [
      ['L’universo si espande', 0],
      ['Che senso ha la mia vita?', 1],
      ['Si può modificare il DNA di un embrione?', 0],
      ['È giusto farlo?', 2],
      ['Come prevede un algoritmo i miei acquisti?', 0],
      ['Perché esiste qualcosa invece del nulla?', 1],
      ['Fino a che punto un’app può decidere per me?', 2],
      ['Che cosa si deve a chi sta morendo?', 2],
      ['Perché il cuore non trova riposo?', 1]
    ] },
    vf: [
      { s: 'Le Confessioni sono un diario scritto giorno per giorno.', v: false, why: 'Sono un esame: Agostino rilegge la vita per capire che cosa cercava davvero.' },
      { s: 'Esame viene dal latino examen, «ago della bilancia».', v: true, why: 'Esaminare è pesare: si guarda dove si ferma l’ago.' },
      { s: 'Per Agostino l’inquietudine è un difetto da eliminare.', v: false, why: 'È un indizio: il cuore è fatto «verso» Dio e per questo non si ferma prima.' },
      { s: 'Prevedere il giorno più fotografato equivale a scegliere il giorno più bello da vivere.', v: false, why: 'La previsione legge i dati; la scelta richiede un criterio tuo.' },
      { s: 'La scienza dice come funziona il mondo, con strumenti che nessun altro sapere possiede.', v: true, why: 'È il suo mestiere: nel suo campo ha l’ultima parola.' },
      { s: '«Si può fare, quindi si deve permettere» è un ragionamento corretto.', v: false, why: 'Fa scivolare il «come» nel «fino a dove»: la possibilità tecnica non decide la liceità.' },
      { s: 'Per il Concilio Vaticano II la coscienza è il sacrario dell’uomo, dove egli si trova solo con Dio.', v: true, why: 'Gaudium et spes, n. 16.' }
    ],
    abbina: [
      ['Inquieto', 'senza riposo'],
      ['Esame', 'ago della bilancia'],
      ['Criterio', 'ciò con cui si distingue'],
      ['Coscienza', 'sapere con sé'],
      ['Algoritmo', 'dal nome di al-Khwārizmī']
    ],
    rifl: { domanda: 'Quale delle tre righe è stata più difficile da scrivere?', poli: ['Il fatto', 'L’omissione', 'L’attesa'], spunto: 'Perché proprio quella? Scrivilo per te: questa frase non viene salvata.' }
  }
};

/* =====================================================================
   Componenti della lezione (React con htm). Interazioni con <button> veri;
   hover / focus-visible / active espliciti nello stile qui sotto (solo token del kit).
   ===================================================================== */
(function () {
  if (typeof document === 'undefined' || typeof LabLezione === 'undefined' || !LabLezione.registra) return;
  var useState = React.useState;
  var I = LabLezione.inline;
  /* Memoria in pagina: tornando a una scena (anche dopo la pausa gioco) il componente riprende da dove era. Nulla va nel browser. */
  var MEM = {};
  function useMem(key, iniziale) {
    var s = useState(function () { return Object.prototype.hasOwnProperty.call(MEM, key) ? MEM[key] : iniziale; });
    return [s[0], function (v) { MEM[key] = v; s[1](v); }];
  }

  if (!document.getElementById('v0-css')) {
    var st = document.createElement('style'); st.id = 'v0-css';
    st.textContent = [
      /* Foglietto */
      '.v0-sheet{position:relative;max-width:34rem;margin:0 auto;padding:21px 21px 13px;border-radius:8px;background:var(--lab-surface);border:1px solid var(--lab-line);box-shadow:0 13px 34px -21px rgba(0,0,0,.55);transform-origin:50% 0;transition:transform 610ms cubic-bezier(.16,1,.3,1),opacity 610ms}',
      '.v0-sheet::before{content:"";position:absolute;left:0;right:0;top:50%;border-top:1px dashed var(--lab-line);opacity:.0;transition:opacity 233ms}',
      '.v0-sheet.is-fold{transform:perspective(800px) rotateX(58deg) scale(.86);opacity:.72}',
      '.v0-sheet.is-fold::before{opacity:1}',
      '.v0-sheet-h{display:flex;justify-content:space-between;gap:8px;align-items:baseline;margin-bottom:13px}',
      '.v0-noname{font-family:var(--lab-font-inscription);letter-spacing:.14em;text-transform:uppercase;font-size:.72em;color:var(--lab-oro)}',
      '.v0-lines{list-style:none;margin:0;padding:0;display:grid;gap:13px}',
      '.v0-line{display:grid;grid-template-columns:34px 1fr;gap:13px;align-items:start}',
      '.v0-line+.v0-line{padding-top:13px;border-top:1px solid var(--lab-line)}',
      '.v0-line.is-off{display:none}',
      '.v0-line.is-new{animation:v0In 610ms cubic-bezier(.16,1,.3,1)}',
      '@keyframes v0In{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}',
      '.v0-n{display:inline-grid;place-items:center;width:34px;height:34px;border-radius:50%;border:1.5px solid var(--lab-oro);color:var(--lab-oro);font-weight:700}',
      '.v0-line b{display:block;font-size:1.1em}',
      '.v0-line p{margin:3px 0 0}',
      '.v0-line .ll-hint{margin:3px 0 0}',
      /* Programma */
      '.v0-prog{list-style:none;margin:0;padding:0;display:grid;gap:8px}',
      '.v0-q{width:100%;display:grid;grid-template-columns:auto 1fr;gap:13px;align-items:center;text-align:left;padding:10px 13px;border-radius:13px;border:1px solid var(--lab-line);background:var(--lab-surface);color:var(--lab-ink);font:inherit;cursor:pointer;transition:border-color 180ms,transform 180ms,background 180ms}',
      '.v0-q:hover{border-color:var(--lab-oro);transform:translateX(3px)}',
      '.v0-q:focus-visible{outline:1.5px solid var(--lab-oro);outline-offset:2px}',
      '.v0-q:active{transform:scale(.98)}',
      '.v0-q[aria-expanded="true"]{border-color:var(--la-accent);box-shadow:inset 3px 0 0 var(--la-accent)}',
      '.v0-k{display:inline-grid;place-items:center;min-width:34px;height:34px;padding:0 8px;border-radius:999px;border:1.5px solid var(--lab-oro);color:var(--lab-oro);font-weight:700}',
      '.v0-q.is-seen .v0-k{background:var(--lab-oro);color:var(--lab-bg)}',
      '.v0-q span:last-child{font-weight:600;min-width:0}',
      '.v0-det{margin:8px 0 5px 47px;padding:13px 13px 8px;border-left:2px solid var(--la-accent)}',
      '.v0-det p{margin:0 0 8px}',
      '.v0-verbs{display:flex;flex-wrap:wrap;gap:5px}',
      '.v0-verb{display:inline-block;padding:2px 10px;border-radius:999px;border:1px solid var(--lab-line);font-size:.86em;opacity:.45}',
      '.v0-verb.is-on{opacity:1;border-color:var(--la-accent);color:var(--lab-ink);font-weight:700}',
      '@media (max-width:480px){.v0-det{margin-left:0}.v0-sheet{padding:13px}}',
      /* Telefono: il kit aggiunge 144 px sotto il body per la mascotte; nella lezione lo scorrimento è interno (.ll-scroll)
         e la mascotte sta nella barra, quindi quello spazio resterebbe una fascia vuota sotto i comandi. */
      '@media (max-width:720px){body.ll.la,body.ll.g{padding-bottom:0}}',
      /* Visore sul telefono: la riga delle schede resta una sola. */
      '@media (max-width:520px){:root[data-visore] body.ll .ll-tools{flex-wrap:nowrap;gap:5px;min-width:0}:root[data-visore] body.ll .ll-modes button{padding:8px 9px}:root[data-visore] body.ll .ll-tools .ll-chip{padding-inline:9px}:root[data-visore] body.ll .ll-tools>.ll-icon{flex:none}}',
      '@media (prefers-reduced-motion:reduce){.v0-sheet,.v0-q{transition:none}.v0-line.is-new{animation:none}}'
    ].join('\n');
    document.head.appendChild(st);
  }

  /* ---------- Foglietto: le tre righe, una alla volta; alla fine si piega ----------
     Interazioni: «Riga successiva» (ll-btn: magnetico, lama di luce, active 0,96, focus oro),
     «Piega il foglietto» (ll-btn--ghost), «Riaprilo» (ll-link). Nessun campo di testo: si scrive su carta. */
  var RIGHE = [
    { t: 'Un fatto', d: 'Il momento dell’estate che rifaresti identico.', nota: 'Non il più bello da raccontare: il più bello da vivere. Spesso non coincidono.' },
    { t: 'Un’omissione', d: 'Una cosa che hai rimandato, evitato o non detto.', nota: 'Può essere minima. Deve essere vera.' },
    { t: 'Un’attesa', d: 'Che cosa ti aspetti da quest’anno, in tre parole.', nota: 'Vale anche «niente», se è quello che pensi. Questa riga verrà letta da un altro.' }
  ];
  LabLezione.registra('Foglietto', function (p) {
    var s = useMem('fo-n', 1), n = s[0], setN = s[1], f = useMem('fo-p', false), piegato = f[0], setP = f[1];
    function avanti() { var k = Math.min(3, n + 1); setN(k); }
    function piega() { setP(true); p.ctx.cheer(); p.ctx.say('Nessun nome: si piega e si mescola.'); }
    return html`<div>
      <div className=${'v0-sheet' + (piegato ? ' is-fold' : '')} aria-label="Il foglietto delle tre righe">
        <div className="v0-sheet-h"><span className="la-meta">Il foglietto</span><span className="v0-noname">senza nome</span></div>
        <ol className="v0-lines" aria-live="polite">
          ${RIGHE.map(function (r, i) {
            var on = i < n;
            return html`<li key=${i} className=${'v0-line' + (on ? '' : ' is-off') + (i === n - 1 && i > 0 ? ' is-new' : '')} aria-hidden=${!on}>
              <span className="v0-n" aria-hidden="true">${i + 1}</span>
              <div><b>${r.t}</b><p>${r.d}</p><p className="ll-hint">${r.nota}</p></div>
            </li>`;
          })}
        </ol>
      </div>
      <div className="ll-row">
        ${n < 3 && html`<button className="ll-btn" onClick=${avanti}>Riga successiva</button>`}
        ${n >= 3 && !piegato && html`<button className="ll-btn ll-btn--ghost" onClick=${piega}>Piega il foglietto</button>`}
        ${(n > 1 || piegato) && html`<button className="ll-link" onClick=${function () { setN(1); setP(false); }}>${piegato ? 'Riaprilo' : 'Dalla prima riga'}</button>`}
        <span className="ll-tally">Riga ${n} di 3</span>
      </div>
    </div>`;
  });

  /* ---------- Programma: le cinque domande dell'anno e Talenti, con i verbi in gioco ----------
     Interazioni: sei pulsanti-domanda (v0-q: hover bordo oro e +3 px, active 0,98, focus oro, aperto = filetto nel colore dell'anno);
     la domanda già vista ha il numero pieno d'oro. */
  var VERBI = ['Come', 'Perché', 'Fino a dove'];
  var UNITA = [
    { k: '1', q: 'La scienza e la fede rispondono alla stessa domanda?', d: 'L’unità più lunga. Comincia da Georges Lemaître, sacerdote e fisico, che propone un universo in espansione quando Einstein lo pensava immobile, e che non usa la sua teoria come prova della creazione.', v: [0, 1] },
    { k: '2', q: 'Che cosa succede quando la scienza non ha più un limite?', d: 'Il Novecento ha risposto con la bomba e con l’eugenetica di Stato: da lì nasce l’etica della ricerca che usiamo oggi.', v: [0, 2] },
    { k: '3', q: 'Chi decide, quando decide un algoritmo?', d: 'Prevedere non è scegliere: la prima riga del foglietto ne era già un esempio.', v: [0, 2] },
    { k: '4', q: 'Che cosa si deve a chi sta morendo?', d: 'Cure, verità, compagnia: dove passa il confine fra curare e accanirsi, fra accompagnare e abbandonare.', v: [2, 1] },
    { k: '5', q: 'Una promessa ha ancora senso, in un mondo che ottimizza tutto?', d: 'Che cosa resta della parola data quando conviene sempre cambiare.', v: [1, 2] },
    { k: '+', q: 'Talenti', d: 'Il lavoro finale: ciascuno porta davanti a un pubblico ciò che sa fare meglio. A maggio si riapre la scatola dei foglietti.', v: [] }
  ];
  LabLezione.registra('Programma', function (p) {
    var s = useMem('pr-a', null), a = s[0], setA = s[1], v = useMem('pr-v', {}), visti = v[0], setV = v[1];
    function apri(i) {
      setA(a === i ? null : i);
      var o = Object.assign({}, visti); o[i] = 1; setV(o);
      if (Object.keys(o).length === UNITA.length && Object.keys(visti).length < UNITA.length) { p.ctx.cheer(); p.ctx.say('Cinque domande e un lavoro finale: è l’anno.'); }
    }
    var nv = Object.keys(visti).length;
    return html`<div>
      <ul className="v0-prog" aria-label="Le domande dell’anno">
        ${UNITA.map(function (u, i) {
          var open = a === i;
          return html`<li key=${i}>
            <button type="button" className=${'v0-q' + (visti[i] ? ' is-seen' : '')} aria-expanded=${open} onClick=${function () { apri(i); }}>
              <span className="v0-k" aria-hidden="true">${u.k}</span><span>${u.q}</span>
            </button>
            ${open && html`<div className="v0-det" aria-live="polite">
              <p>${I(u.d, 'd' + i)}</p>
              ${u.v.length ? html`<div className="v0-verbs" aria-label="Verbi in gioco">${VERBI.map(function (x, j) { return html`<span key=${j} className=${'v0-verb' + (u.v.indexOf(j) > -1 ? ' is-on' : '')}>${x}</span>`; })}</div>` : null}
            </div>`}
          </li>`;
        })}
      </ul>
      <div className="ll-row"><span className="ll-tally">${nv} di ${UNITA.length} aperte</span></div>
      <p className="ll-hint">Agganciamo almeno due parole della nuvola delle attese a una di queste domande.</p>
    </div>`;
  });
})();
