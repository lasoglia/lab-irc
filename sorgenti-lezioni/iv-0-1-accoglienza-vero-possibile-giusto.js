/* ---- lezione ---- */
/* Classe IV · Accoglienza (UDA 0) · Lezione 1 — «Vero, possibile, giusto» (nel sito: «Presentazione corso»).
   Artefatto interattivo, 7 ottobre 2026, rifatto con la skill «IRC · Artefatto interattivo della lezione»
   a partire dall'artefatto del 27 settembre 2026 (bussola dell'estate, tre domande, Veritas, mappa dell'anno).
   Esempio inventato e dichiarato: gli occhiali «Veritas» non esistono; la demo estrae il verdetto a caso.
   Galileo, Lettera a Cristina di Lorena (1615), Edizione Nazionale vol. V. Etimologie: Vocabolario Treccani
   (controllo in rete non riuscito in questa sessione: vedi note del docente).
   Il CSS della lezione è incorporato qui sotto (si inserisce da solo nel <head>): basta assemblare senza --css.
   Nessun dato salvato: voti, numeri estratti e regole del patto restano solo nella pagina aperta.
   © Matteo Sestili — Tutti i diritti riservati */
window.LEZIONE = {
  slug: 'iv-0-1-accoglienza-vero-possibile-giusto',
  classe: 'Anno IV',
  titolo: 'Vero, possibile, *giusto*',
  sottotitolo: 'Accoglienza. Davanti a una novità: quale domanda stiamo facendo, e chi è competente a rispondere?',
  saluto: 'Ultima tappa: ventotto incontri, tre domande.',
  glossario: {
    'vero': { parola: 'Vero', etim: 'dal latino *verus*, «vero, reale»', def: 'Ciò che corrisponde a come stanno le cose. La domanda «è vero?» si risolve con prove che altri possono controllare.' },
    'possibile': { parola: 'Possibile', etim: 'dal latino *possibilis*, da *posse*, «potere»', def: 'Ciò che si può fare, con certi mezzi e a un certo prezzo. Che una cosa sia possibile non dice ancora se sia giusto farla.' },
    'giusto': { parola: 'Giusto', etim: 'dal latino *iustus*, da *ius, iuris*, «diritto»', def: 'Ciò che rende a ciascuno ciò che gli spetta ed è un bene per le persone coinvolte. Si argomenta con ragioni, non con un esperimento.' },
    'bussola': { parola: 'Bussola', etim: 'dal latino medievale *buxida*, dal greco *pyxís*, «scatoletta» di legno di bosso (*buxus*)', def: 'Lo strumento con l’ago magnetico che indica il nord. Il nome viene dalla scatoletta che lo conteneva: l’ago orienta, la strada la sceglie chi cammina.' },
    'metodo': { parola: 'Metodo', etim: 'dal greco *méthodos*, «ricerca», composto di *metá* e *hodós*, «via»', def: 'La via ordinata per rispondere a una domanda. Ogni domanda ha la sua: il vero si controlla con prove, il possibile con prototipi e collaudi, il giusto con ragioni sul bene delle persone.' },
    'criterio': { parola: 'Criterio', etim: 'dal latino tardo *criterium*, dal greco *kritḗrion*, da *krínō*, «distinguere, giudicare»', def: 'La regola con cui si distingue e si giudica. Senza criteri non si capisce neppure se una cosa è cambiata.' },
    'competente': { parola: 'Competente', etim: 'dal latino *competens*, participio di *competere*, «spettare, essere adatto» (*cum* e *petere*, «dirigersi verso»)', def: 'Si dice della fonte o della persona a cui spetta rispondere a una certa domanda. Un ingegnere è competente sul possibile: non per questo lo è sul giusto.' },
    'prova': { parola: 'Prova', etim: 'da *provare*, dal latino *probare*, «riconoscere buono», da *probus*, «buono, onesto»', def: 'Ciò che permette ad altri di controllare un’affermazione. Una percentuale su uno schermo non è una prova se nessuno può verificare come è stata ottenuta.' },
    'caricatura': { parola: 'Caricatura', etim: 'da *caricare*, nel senso di «calcare, esagerare»', def: 'In origine il ritratto che esagera i tratti di una persona; in una discussione, la posizione dell’altro deformata per renderla più debole o più cattiva di quanto sia.' },
    'coscienza': { parola: 'Coscienza', etim: 'dal latino *conscientia*, da *conscire*, «essere consapevole» (*cum* e *scire*, «sapere»)', def: 'Il giudizio con cui la persona riconosce il bene da fare e il male da evitare, qui e ora. Il Concilio Vaticano II la chiama il «sacrario» dell’uomo (*Gaudium et spes* 16). È il simbolo di Bussolina.' },
    'legale': { parola: 'Legale', etim: 'dal latino *legalis*, da *lex, legis*, «legge»', def: 'Conforme alla legge: dice che cosa è permesso. Spesso la legge protegge ciò che è giusto, ma «legale» e «giusto» non sono sinonimi.' }
  },
  scene: [
    /* 1 · Aggancio — la domanda della lezione, in forma di frase da giudicare */
    { fase: 'Aggancio', momento: 'Apertura', minuti: 3, titolo: 'Bentornati: *da dove* ripartiamo?',
      lead: 'Prima di raccontarci l’estate, una frase da giudicare. La ritroveremo alla fine dell’ora.',
      blocchi: [
        { tipo: 'domanda', id: 'ingresso', etichetta: 'Anonimo · per alzata di mano', q: '«Funziona, quindi va bene.» Siete d’accordo?',
          opzioni: ['Sì: se funziona, il resto è secondario', 'Dipende soprattutto da quanto costa', 'Non sempre: funzionare e andare bene sono due cose diverse', 'Non saprei dirlo'],
          dibattito: 'Teniamo i voti: a fine ora rifaremo la stessa domanda. Non c’è un punteggio sulle opinioni, contano le ragioni.' },
        { tipo: 'agenda', titolo: 'L’ora di oggi' }
      ] },

    /* 2 · Aggancio — la bussola dell'estate: conoscersi (attività del 2025-26 mantenuta) */
    { fase: 'Aggancio', momento: 'Si comincia', minuti: 8, titolo: 'La bussola *dell’estate*',
      lead: 'L’ago della {bussola} gira e indica una direzione. Chi viene estratto risponde in una o due frasi, oppure dice «passo».',
      blocchi: [
        { tipo: 'custom', nome: 'Bussola', props: {} }
      ] },

    /* 3 · Scoperta — tre domande, tre metodi (concetto più difficile: componente Rosa + verifica) */
    { fase: 'Scoperta', momento: 'Il metodo', minuti: 4, titolo: 'Avete già risposto a *tre domande*',
      lead: 'Nord, Est e Sud non erano direzioni a caso: ognuna è una domanda diversa, con il suo {metodo}. Toccate una direzione.',
      blocchi: [
        { tipo: 'custom', nome: 'Rosa', props: {} },
        { tipo: 'verifica', etichetta: 'Verifica lampo', q: '«Funziona, quindi va bene.» Dove sta il salto?',
          opzioni: ['Da «è vero?» a «è possibile?»', 'Da «è giusto?» a «è vero?»', 'Da «è possibile?» a «è giusto?»', 'Non c’è nessun salto'], ok: 2,
          why: '«Funziona» dice che una cosa si può fare e fa ciò che promette; «va bene» dice che è un bene per le persone. Il secondo giudizio chiede ragioni diverse: che si possa fare non dice ancora che si debba.' }
      ] },

    /* 4 · Scoperta — il caso inventato: gli occhiali Veritas */
    { fase: 'Scoperta', momento: 'Un caso', minuti: 5, titolo: 'Un’invenzione *sul tavolo*',
      lead: 'Proviamo le tre domande su un oggetto. Attenzione: l’oggetto è **inventato** per la lezione.',
      blocchi: [
        { tipo: 'custom', nome: 'Veritas', props: {} }
      ] },

    /* 5 · Attività — quale domanda stai facendo? */
    { fase: 'Scoperta', momento: 'Applicazione', minuti: 4, titolo: 'Quale domanda *stai facendo*?',
      lead: 'Otto domande su Veritas. Prima di toccare, qualcuno dice perché.',
      blocchi: [
        { tipo: 'smista', categorie: ['È vero?', 'È possibile?', 'È giusto?'], voci: [
          { t: 'Quando mentiamo, la voce cambia davvero in modo riconoscibile?', c: 0, why: 'È una domanda sui fatti: la risposta viene da studi ripetuti, non da un’impressione.' },
          { t: 'La batteria regge un’intera mattina di scuola?', c: 1, why: 'È una prestazione tecnica: si misura provando il dispositivo.' },
          { t: 'È lecito analizzare la voce di chi non ha dato il consenso?', c: 2, why: 'Riguarda il rispetto delle persone: è una domanda morale.' },
          { t: 'Gli occhiali riconoscono una bugia più spesso di quanto farebbe il caso?', c: 0, why: 'Chiede come stanno le cose: serve un test con dati controllabili da altri.' },
          { t: 'Si possono produrre a un prezzo che una famiglia può permettersi?', c: 1, why: 'Costi e materiali: è una domanda di fattibilità.' },
          { t: 'Un professore potrebbe usarli durante un’interrogazione?', c: 2, why: 'Tecnicamente si potrebbe; la domanda è se sia rispettoso e giusto.' },
          { t: 'Funzionano anche senza connessione a internet?', c: 1, why: 'Riguarda il modo in cui il dispositivo è costruito.' },
          { t: 'Chi verrebbe danneggiato da un errore degli occhiali?', c: 2, why: 'Pesa le conseguenze sulle persone: è una domanda di giustizia.' }
        ], chiusura: 'Le domande sul **giusto** non si chiudono con un test di laboratorio, e quelle sul **vero** non si chiudono con un’opinione.' }
      ] },

    /* 6 · Scoperta — la fonte: Galileo, due domande diverse */
    { fase: 'Scoperta', momento: 'Fonte', minuti: 4, titolo: 'Come si va al cielo, *come va il cielo*',
      lead: 'Nel 1615 Galileo Galilei, credente e scienziato, scrive a Cristina di Lorena che la Scrittura e l’astronomia rispondono a domande diverse.',
      blocchi: [
        { tipo: 'leggi', q: 'Quale frase distingue le due domande?',
          testo: '«[[Io qui direi quello che intesi da persona ecclesiastica costituita in eminentissimo grado::**Chi parla.** Galileo riprende il detto di un ecclesiastico di altissimo grado, identificato con il cardinale Cesare Baronio. È la cornice, non ancora la distinzione.]], ciò è [[l’intenzione dello Spirito Santo::**Di chi è lo scopo.** Galileo parla dello scopo della Scrittura ispirata: non lo mette in dubbio, lo precisa.]] essere d’insegnarci [[!come si vadia al cielo, e non come vadia il cielo::**La distinzione.** «Come si va al cielo» chiede che cosa rende buona e salva la vita; «come va il cielo» chiede com’è fatto il cosmo. Due domande, due competenze. *Vadia* è la forma antica di *vada*.]].»',
          fonte: 'Galileo Galilei, Lettera a Madama Cristina di Lorena (1615), in Le Opere, Edizione Nazionale, vol. V' },
        { tipo: 'aggancio', etichetta: 'Con onestà', titolo: 'Una distinzione non applicata',
          t: 'Nel 1616 e nel 1633 le autorità ecclesiastiche non applicarono questa distinzione al caso di Galileo. Il 31 ottobre 1992 Giovanni Paolo II riconobbe che i teologi di allora avevano portato nel campo della fede una questione che spettava alla ricerca scientifica. Lo studieremo sui documenti negli incontri 10–13.',
          fonte: 'Giovanni Paolo II, Discorso alla Pontificia Accademia delle Scienze, 31 ottobre 1992' },
        { tipo: 'mascotte', etichetta: 'dice', t: 'Io sono una bussola: indico il nord, ma non vi dico se vale la pena andarci. Per quello serve la {coscienza}.' }
      ] },

    /* 7 · Pausa gioco — Sfida a squadre sulla fonte competente */
    { fase: 'Attività', momento: 'Pausa gioco', minuti: 7, titolo: 'Chi è *competente*?',
      testo: 'Ogni domanda ha la sua fonte {competente}. E alcune «prove» non sono {prove|prova}. Due squadre, una domanda per turno.',
      blocchi: [
        { tipo: 'gioco', id: 'sfida', titolo: 'Sfida a squadre', testo: 'Due squadre, otto domande, a turno: chi sbaglia lascia la domanda all’altra squadra, che può rubarla.', pulsante: 'Si gioca' },
        { tipo: 'rivela', titolo: 'Al ritorno', iniziali: 1, pulsante: 'Altra domanda', passi: [
          { titolo: 'La più discussa', testo: 'Quale domanda ha diviso di più le squadre? Su quale delle tre domande stavate discutendo?' },
          { titolo: 'Legale e giusto', testo: 'Una legge dice che cosa è permesso, e spesso protegge ciò che è giusto. Ma «{legale}» e «giusto» non sono sinonimi: la storia ha conosciuto leggi ingiuste.' }
        ] }
      ] },

    /* 8 · Attività — senza caricature, il patto di confronto */
    { fase: 'Attività', momento: 'Il patto', minuti: 6, titolo: 'Il nostro *patto* di confronto',
      lead: 'Una posizione si critica solo dopo averla descritta in modo che l’altro la riconosca. Prima giriamo le {caricature|caricatura}, poi scriviamo le regole.',
      blocchi: [
        { tipo: 'carte', carte: [
          { etichetta: 'Caricatura', fronte: '«La Chiesa è contro la scienza.»', retro: 'La Chiesa chiede che una scoperta sia usata per il bene della persona, e da secoli sostiene scuole, università e ricerca.' },
          { etichetta: 'Caricatura', fronte: '«Chi vuole Veritas non ha morale.»', retro: 'Chi è favorevole spera di proteggere i più deboli dalle bugie e dalle truffe.' },
          { etichetta: 'Caricatura', fronte: '«Gli scienziati credono solo in ciò che si misura.»', retro: 'Molti scienziati distinguono ciò che il loro metodo può misurare da ciò che resta fuori dal suo campo.' },
          { etichetta: 'Caricatura', fronte: '«Chi è contro Veritas vuole tornare alle candele.»', retro: 'Chi è contrario teme che un controllo continuo tolga fiducia e riservatezza alle relazioni.' }
        ] },
        { tipo: 'custom', nome: 'Patto', props: {} }
      ] },

    /* 9 · Chiusura — la mappa dell'anno */
    { fase: 'Chiusura', momento: 'L’anno', minuti: 5, titolo: 'Ventotto incontri, *tre domande*',
      lead: 'Ogni tappa rimette alla prova il vero, il possibile e il giusto. Toccate una tappa; per alzata di mano, segnate quella che vi incuriosisce di più.',
      blocchi: [
        { tipo: 'custom', nome: 'Programma', props: {} }
      ] },

    /* 10 · Chiusura — prova breve e ritorno alla domanda iniziale */
    { fase: 'Chiusura', momento: 'Prova', minuti: 4, titolo: 'Allora: *funziona*, quindi va bene?',
      testo: '**La risposta:** «funziona» risponde a «è {possibile}?», «va bene» a «è {giusto}?»; e prima ancora serve sapere «è {vero}?». Ogni domanda ha il suo {metodo} e la sua fonte {competente}.',
      blocchi: [
        { tipo: 'quiz', etichetta: 'Prova', perfetto: 'Quattro su quattro: sapete riconoscere la domanda e la fonte che le spetta.', domande: [
          { q: 'Un’azienda propone un braccialetto che misura l’attenzione in classe. «È rispettoso controllare così chi non l’ha scelto?» è una domanda su…',
            opzioni: ['il vero', 'il possibile', 'il giusto'], ok: 2,
            why: 'Riguarda il bene e i diritti delle persone coinvolte: si risponde con ragioni morali, non con una misura.' },
          { q: 'Sullo stesso braccialetto: quale fonte è competente per «misura davvero l’attenzione?»',
            opzioni: ['Il numero di scuole che l’hanno comprato', 'Studi indipendenti, con i dati, ripetibili', 'Lo spot del produttore', 'Un voto della classe'], ok: 1,
            why: 'È una domanda sul vero: serve una prova che altri possano controllare. Vendite e pubblicità non sono prove.' },
          { q: 'Quale frase riporta la posizione di un compagno in modo che lui la riconosca?',
            opzioni: ['«Tu pensi che il braccialetto aiuterebbe chi si distrae, e che questo valga il rischio.»', '«Tu vuoi spiare tutti.»', '«Tu sei contrario a qualsiasi tecnologia.»', '«Tu non hai mai pensato alle conseguenze.»'], ok: 0,
            why: 'Le altre attribuiscono al compagno un’intenzione o un’ignoranza: sono caricature. La prima riporta la sua ragione e il suo giudizio, e ora si può discutere nel merito.' },
          { q: '«È legale, quindi è giusto.» Che cosa manca al ragionamento?',
            opzioni: ['Un esperimento di laboratorio', 'Niente: legge e giustizia coincidono', 'Un sondaggio fra amici', 'Una ragione sul bene delle persone'], ok: 3,
            why: 'La legge dice che cosa è permesso; se sia giusto si argomenta sul bene delle persone. La storia conosce leggi ingiuste.' }
        ] },
        { tipo: 'domanda', id: 'uscita', confronta: 'ingresso', etichetta: 'Di nuovo, a fine ora', q: '«Funziona, quindi va bene.» Siete d’accordo?',
          opzioni: ['Sì: se funziona, il resto è secondario', 'Dipende soprattutto da quanto costa', 'Non sempre: funzionare e andare bene sono due cose diverse', 'Non saprei dirlo'],
          dibattito: 'Se il voto si è spostato, chiediamo a chi ha cambiato idea che cosa l’ha convinto. Non c’è un punteggio sulle opinioni: conta la ragione.' }
      ] }
  ],

  studio: {
    sezioni: [
      { titolo: 'La domanda',
        testo: '«Funziona, quindi va bene.» È una frase che si sente spesso davanti a un’invenzione, a un’applicazione, a una scelta. Sembra un ragionamento, ma contiene un salto: passa da una domanda a un’altra senza dirlo. La lezione di accoglienza della classe quarta parte da qui. Davanti a una novità, quale domanda stiamo facendo? E chi è competente a rispondere?' },
      { titolo: 'La bussola dell’estate',
        testo: 'Per ritrovarci dopo l’estate abbiamo fatto girare una bussola. La *bussola* deve il nome alla scatoletta di legno di bosso che conteneva l’ago (dal latino medievale *buxida*, dal greco *pyxís*): indica il nord, ma la strada la sceglie chi cammina. Ogni direzione chiedeva una cosa diversa: a **Nord** una cosa vera che abbiamo scoperto, a **Est** una cosa possibile che abbiamo imparato a fare, a **Sud** una cosa giusta che abbiamo visto o ricevuto, a **Ovest** una domanda che ci portiamo dietro. Senza saperlo, abbiamo già risposto alle tre domande dell’anno.' },
      { titolo: 'Tre domande, tre metodi',
        testo: 'Davanti a una scoperta, a un’invenzione o a una scelta possiamo porre tre domande diverse, e ciascuna ha il suo **metodo** (dal greco *méthodos*, composto di *metá* e *hodós*, «via»: la via per arrivare a una risposta).\n\n**È vero?** chiede com’è fatta la realtà, che cosa è accaduto davvero. Rispondono osservazioni, dati, documenti, esperimenti che altri possono ripetere e controllare. **È possibile?** chiede se una cosa si può fare, con quali mezzi e a quale costo. Rispondono la tecnica, i progetti, i prototipi, i collaudi. **È giusto?** chiede se una cosa è un bene per le persone coinvolte. Rispondono le ragioni morali e la **coscienza** (dal latino *conscientia*, da *conscire*, «essere consapevole»), che per un credente è illuminata dalla fede, senza che la fede prenda il posto della ragione.\n\nLe tre domande sono distinte ma non separate: per decidere bene servono tutte e tre. **Per questo** molte discussioni si incagliano: uno dice che una cosa funziona, l’altro che non va fatta, e nessuno dei due si accorge che stanno rispondendo a domande diverse. «Funziona, quindi va bene» salta dal possibile al giusto: che una cosa si possa fare non dice ancora che si debba fare.' },
      { titolo: 'Il caso Veritas',
        testo: 'Per esercitarci abbiamo usato un’invenzione **immaginaria**: gli occhiali Veritas, che promettono di dire in tempo reale se chi parla sta mentendo, con tanto di percentuale di sicurezza. Nella demo della lezione il verdetto e la percentuale erano estratti a caso. Una percentuale sembra una prova, ma senza un test controllabile non lo è: fingeva di rispondere alla domanda «è vero?» senza averla mai posta.\n\nSu Veritas si possono chiedere cose vere o false (la voce cambia davvero quando mentiamo? gli occhiali indovinano più del caso?), cose possibili (quanto dura la batteria? quanto costano? funzionano senza connessione?) e cose giuste (è lecito analizzare chi non ha dato il consenso? chi viene danneggiato da un errore?). Rispondere «li userei» non dice se funzionano: esprime un giudizio su ciò che è bene fare. Anche le macchine della verità reali, i poligrafi, esistono da circa un secolo e la loro affidabilità è tuttora discussa.' },
      { titolo: 'La fonte competente',
        testo: 'Ogni domanda ha le sue fonti **competenti** (dal latino *competere*, «spettare»: è competente la fonte a cui spetta rispondere). Per il **vero**: esperimenti ripetuti da gruppi indipendenti, studi pubblicati con i dati, documenti originali. Per il **possibile**: prototipi, collaudi, progetti con costi e materiali. Per il **giusto**: argomentazioni sul bene delle persone, i diritti umani, la riflessione morale e, per la Chiesa, il Magistero, che propone a tutti criteri e ragioni.\n\nNon sono prove il numero di visualizzazioni, i preordini, lo spot pubblicitario, «lo fanno tutti». Una legge dice che cosa è **permesso** e spesso protegge ciò che è giusto, ma *legale* (da *lex*, «legge») e *giusto* (da *ius*, «diritto») non sono sinonimi: la storia ha conosciuto leggi ingiuste.' },
      { titolo: 'Galileo e il cielo',
        testo: 'Nella *Lettera a Madama Cristina di Lorena* (1615) Galileo Galilei riprende un detto che attribuisce a una «persona ecclesiastica costituita in eminentissimo grado», identificata con il cardinale Cesare Baronio: «l’intenzione dello Spirito Santo essere d’insegnarci come si vadia al cielo, e non come vadia il cielo». Galileo non oppone fede e scienza: distingue due domande. «Come va il cielo» chiede com’è fatto il cosmo; «come si va al cielo» chiede che cosa rende buona e salva la vita. Il Concilio Vaticano II insegna che la Scrittura comunica senza errore la verità che Dio ha voluto consegnare per la nostra salvezza (*Dei Verbum* 11).\n\n**Eppure** nel 1616 e nel 1633 le autorità ecclesiastiche non applicarono questa distinzione al caso di Galileo. Nel discorso del 31 ottobre 1992 alla Pontificia Accademia delle Scienze Giovanni Paolo II riconobbe che i teologi di allora non avevano distinto la Scrittura dalla sua interpretazione e avevano portato nel campo della fede una questione che spettava alla ricerca scientifica. Negli incontri 10–13 leggeremo i documenti per distinguere il mito da ciò che accadde davvero.' },
      { titolo: 'Senza caricature: il patto di confronto',
        testo: 'Una **caricatura** (da *caricare*, «calcare, esagerare») attribuisce all’altro una posizione più stupida o più cattiva di quella che sostiene: «la Chiesa è contro la scienza», «chi è contrario vuole tornare alle candele». È comoda, perché si vince facilmente, ma non convince nessuno. La regola dell’anno: prima di criticare una posizione, la descriviamo in modo che chi la sostiene la riconosca; solo allora discutiamo nel merito.\n\nSu questa base la classe ha scritto il proprio **patto di confronto**, da tre a cinque regole: per esempio dire su quale domanda si sta discutendo, chiedere quale sia la fonte competente, criticare l’idea e non la persona, poter cambiare idea senza perdere la faccia, lasciare in aula ciò che ciascuno racconta di sé.' },
      { titolo: 'Il percorso e il modo di lavorare',
        testo: 'Ventotto incontri di un’ora. Accoglienza (1); UDA 1 «Riformare una Chiesa, cambiare una cultura»: le indulgenze nel 1517, Lutero a Worms, Trento e le immagini, la Dichiarazione congiunta sulla giustificazione del 1999 (2–5); UDA 2 «Devo meritarmi tutto?»: grazia, libertà, la parabola del padre e dei due figli (6–9); UDA 3 «Galileo: le prove e l’autorità» (10–13); verifica rovesciata (14); UDA 4 «Possiamo farlo: dovremmo farlo?»: corpo, CRISPR, rifiuti elettronici, *Laudato si’* (15–18); UDA 5 «L’amore è più forte della morte?»: Cantico dei Cantici, il Piccolo Principe, consenso, 1 Corinzi 13 (19–22); UDA 6 «Talenti: costruire qualcosa che gli altri possano usare», in gruppi di 3–4 (23–28).\n\nDurante l’anno terremo distinti tre piani: **che cosa attestano le fonti e le prove**, **come le interpretiamo**, **che cosa giudichiamo giusto**. Il voto riguarda come si usano fonti e ragioni e come si argomenta. La fede di ciascuno, o la sua assenza, e le situazioni personali non sono mai oggetto di voto.' },
      { titolo: 'Per lo studio',
        testo: '1. Spiega con un esempio tuo la differenza fra le domande «è vero?», «è possibile?» ed «è giusto?», indicando per ciascuna una fonte competente.\n\n2. Perché la percentuale degli occhiali Veritas non era una prova?\n\n3. Che cosa distingue Galileo con la frase «come si vadia al cielo, e non come vadia il cielo»? Che cosa accadde, invece, nel 1616 e nel 1633?\n\n4. Riscrivi in modo corretto una caricatura a tua scelta, così che chi sostiene quella posizione la riconosca.' },
      { titolo: 'La risposta',
        testo: '«Funziona, quindi va bene» non regge da sola: «funziona» risponde alla domanda **è possibile?**, «va bene» alla domanda **è giusto?**, e prima ancora bisogna sapere **è vero?**, cioè se la cosa fa davvero ciò che promette. Ogni domanda ha il suo metodo e la sua fonte competente; le tre non si sostituiscono, ma insieme permettono di decidere. È la bussola con cui attraverseremo l’anno, dalla Riforma a Galileo, dalla tecnica all’amore.' }
    ],
    fonti: [
      'Galileo Galilei, *Lettera a Madama Cristina di Lorena Granduchessa di Toscana* (1615), in *Le Opere*, Edizione Nazionale, vol. V.',
      'Giovanni Paolo II, Discorso ai partecipanti alla sessione plenaria della Pontificia Accademia delle Scienze, 31 ottobre 1992 (vatican.va).',
      'Concilio Vaticano II, *Dei Verbum*, n. 11 (1965); *Gaudium et spes*, n. 16 (1965), testo italiano della Santa Sede.',
      'Programmazione IRC classe IV (Matteo Sestili), secondo le Indicazioni per l’IRC nei licei (DPR 176/2012).',
      '*Vocabolario Treccani*, voci «bussola», «metodo», «criterio», «competente», «prova», «caricatura», «coscienza», «legale», «vero», «possibile», «giusto».',
      'Gli occhiali Veritas e i loro «verdetti» sono inventati per la lezione.'
    ]
  }
};

/* =====================================================================
   CSS della lezione (solo token del Lab IRC Design System), inserito nel <head>.
   ===================================================================== */
(function () {
  var CSS = [
    '/* IV 0-1 · Vero, possibile, giusto — componenti Bussola, Rosa, Veritas, Patto, Programma */',
    '.vp-grid{display:grid;grid-template-columns:1fr 1.618fr;gap:34px;align-items:center}',
    '.vp-grid--inv{grid-template-columns:1.618fr 1fr;align-items:start}',
    '.vp-svg{display:block;width:100%;max-width:280px;max-height:40vh;margin:0 auto;height:auto}',
    '.vp-ring{fill:var(--lab-surface);stroke:var(--lab-oro);stroke-width:1.5}',
    '.vp-ring2{fill:none;stroke:var(--lab-line);stroke-dasharray:2 6}',
    '.vp-ago{transform-origin:100px 100px;transition:transform 1597ms cubic-bezier(.16,1,.3,1)}',
    '.vp-ago--breve{transition-duration:987ms}',
    '.vp-dir{font:600 14px/1 var(--lab-font-inscription);letter-spacing:.14em;fill:var(--lab-muted)}',
    '.vp-dir.is-on{fill:var(--la-accent)}',
    '.vp-card{padding:21px 34px;border-radius:34px;border:1.5px solid var(--lab-oro);background:var(--lab-surface);min-height:144px}',
    '.vp-q{font:600 28px/1.25 var(--lab-font-display);margin:8px 0 13px;color:var(--lab-ink);max-width:30ch}',
    '.vp-in{animation:vpIn 610ms var(--lab-ease-out) both}',
    '@keyframes vpIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}',
    '.vp-mezzo{display:block;height:4px;border-radius:4px;background:var(--lab-line);overflow:hidden}',
    '.vp-mezzo i{display:block;height:100%;width:100%;background:var(--la-accent);transform-origin:left;animation:vpMezzo 30s linear forwards}',
    '@keyframes vpMezzo{from{transform:scaleX(1)}to{transform:scaleX(0)}}',
    '.vp-legenda{display:flex;flex-wrap:wrap;gap:8px 21px;margin-top:13px;font-size:14px;color:var(--lab-muted)}',
    '.vp-legenda b{font:600 12px/1 var(--lab-font-inscription);letter-spacing:.12em;color:var(--lab-oro);margin-right:5px}',
    '.vp-registro{display:flex;flex-wrap:wrap;align-items:center;gap:13px 21px;margin-top:21px;padding:13px 21px;border-left:3px solid var(--la-accent);border-radius:0 13px 13px 0;background:color-mix(in srgb,var(--la-accent) 6%,transparent)}',
    '.vp-num{display:inline-block;min-width:2ch;font:600 42px/1 var(--lab-font-display);color:var(--la-accent)}',
    '.vp-step{display:inline-flex;align-items:center;gap:8px;white-space:nowrap}',
    '.vp-step b{font:600 20px/1 var(--lab-font-body);min-width:2ch;text-align:center;color:var(--lab-ink)}',
    '.vp-pm{width:44px;height:44px;border-radius:50%;border:1.5px solid var(--lab-line);background:var(--lab-surface);color:var(--lab-ink);font:600 22px/1 var(--lab-font-body);cursor:pointer;transition:transform 144ms var(--lab-ease-out),border-color 144ms,background 233ms,color 144ms}',
    '.vp-pm:hover{border-color:var(--la-accent);color:var(--la-accent);transform:translateY(-2px)}',
    '.vp-pm:active{transform:scale(.94)}',
    '.vp-pm:focus-visible{outline:1.5px solid var(--lab-oro);outline-offset:2px}',
    '.vp-pm--pieno{background:var(--la-accent);border-color:var(--la-accent);color:var(--lab-bg)}',
    '.vp-pm--pieno:hover{color:var(--lab-bg);filter:brightness(1.1)}',
    /* Rosa */
    '.vp-pick{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 13px}',
    '.vp-dbtn{min-height:44px;padding:8px 18px;border-radius:999px;border:1.5px solid var(--lab-line);background:var(--lab-surface-2);color:var(--lab-ink);font:600 15px/1.2 var(--lab-font-body);cursor:pointer;transition:transform 233ms var(--lab-ease-out),border-color 144ms,background 233ms,color 144ms}',
    '.vp-dbtn small{font:600 11px/1 var(--lab-font-inscription);letter-spacing:.14em;color:var(--lab-oro);margin-right:8px}',
    '.vp-dbtn:hover{border-color:var(--la-accent);transform:translateY(-2px)}',
    '.vp-dbtn:active{transform:scale(.96)}',
    '.vp-dbtn:focus-visible{outline:1.5px solid var(--lab-oro);outline-offset:3px}',
    '.vp-dbtn[aria-pressed="true"]{background:var(--la-accent);border-color:var(--la-accent);color:var(--lab-bg)}',
    '.vp-dbtn[aria-pressed="true"] small{color:var(--lab-bg)}',
    '.vp-dbtn.is-seen:not([aria-pressed="true"])::after{content:" ✓";color:var(--lab-verde)}',
    '.vp-dl{display:grid;grid-template-columns:auto 1fr;gap:8px 13px;margin:0;font-size:16px;line-height:1.5}',
    '.vp-dl dt{font:600 11.5px/1.9 var(--lab-font-inscription);letter-spacing:.12em;text-transform:uppercase;color:var(--lab-muted)}',
    '.vp-dl dd{margin:0;color:var(--lab-ink)}',
    '.vp-dl dd.vp-no{color:var(--lab-ink-soft);font-style:italic}',
    /* Veritas */
    '.vp-inv{padding:21px 34px;border-radius:21px;border:1px dashed var(--lab-line);background:var(--lab-surface)}',
    '.vp-inv-nome{display:flex;flex-wrap:wrap;align-items:baseline;gap:5px 13px;font:600 34px/1.1 var(--lab-font-display);color:var(--la-accent)}',
    '.vp-badge{font:600 11px/1 var(--lab-font-inscription);letter-spacing:.14em;text-transform:uppercase;color:var(--lab-oro);padding:5px 8px;border:1px dashed var(--lab-oro);border-radius:5px}',
    '.vp-inv p{margin:8px 0}',
    '.vp-frase{font:500 22px/1.35 var(--lab-font-display);font-style:italic;color:var(--lab-ink);min-height:1.4em}',
    '.vp-verd{display:inline-flex;flex-wrap:wrap;align-items:baseline;gap:8px;padding:5px 13px;border-radius:999px;background:var(--lab-surface-2);font:600 15px/1.4 var(--lab-font-body)}',
    '.vp-verd b{font-weight:800;letter-spacing:.06em}',
    '.vp-verd.is-bugia b{color:var(--lab-rosso)}',
    '.vp-verd.is-vero b{color:var(--lab-verde)}',
    '.vp-occhiali{display:block;width:100%;max-width:240px;margin:0 auto 13px;color:var(--lab-ink-soft)}',
    '.vp-lente{transition:fill 377ms}',
    '.vp-voti{display:grid;grid-template-columns:1fr 1fr;gap:13px;margin:8px 0 13px}',
    '.vp-voto{padding:13px;border:1px solid var(--lab-line);border-radius:21px;text-align:center}',
    '.vp-voto-n{display:block;font:600 42px/1.2 var(--lab-font-display);color:var(--la-accent)}',
    '.vp-voto .ll-row{justify-content:center}',
    '.vp-sotto{margin-top:21px}',
    /* Patto */
    '.vp-patto{display:grid;grid-template-columns:1.618fr 1fr;gap:34px;align-items:start;margin-top:21px}',
    '.vp-chips{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:13px}',
    '.vp-chip{width:auto;min-height:44px;padding:8px 13px;font-size:15px}',
    '.vp-input{width:100%;box-sizing:border-box;min-height:44px;padding:8px 13px;border-radius:13px;border:1.5px solid var(--lab-line);background:var(--lab-surface);color:var(--lab-ink);font:400 16px/1.4 var(--lab-font-body);margin:5px 0 13px;transition:border-color 144ms}',
    '.vp-input:hover{border-color:var(--la-accent)}',
    '.vp-input:focus-visible{outline:1.5px solid var(--lab-oro);outline-offset:2px}',
    '.vp-regola{font:600 20px/1.4 var(--lab-font-display);min-height:56px;margin:0 0 8px;color:var(--lab-ink)}',
    '.vp-sugg{font-size:14px;text-align:left;white-space:normal}',
    '.vp-foglio{padding:21px;border-radius:21px;border:1.5px solid var(--lab-oro);background:var(--lab-surface)}',
    '.vp-foglio ol{margin:13px 0;padding-left:21px;font:600 19px/1.45 var(--lab-font-display);color:var(--lab-ink)}',
    '.vp-foglio li{margin-bottom:8px}',
    '.vp-foglio .ll-link{font:400 13px var(--lab-font-body);margin-left:5px}',
    /* Programma */
    '.vp-tappe{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:13px}',
    '.vp-tappa{position:relative;flex:1 1 0;min-width:104px;display:flex;flex-direction:column;align-items:flex-start;gap:3px;padding:8px 13px;border-radius:13px;border:1.5px solid var(--lab-line);background:var(--lab-surface);color:var(--lab-ink);text-align:left;cursor:pointer;transition:transform 233ms var(--lab-ease-out),border-color 144ms,background 233ms}',
    '.vp-tappa:hover{border-color:var(--lab-oro);transform:translateY(-2px)}',
    '.vp-tappa:active{transform:scale(.96)}',
    '.vp-tappa:focus-visible{outline:1.5px solid var(--lab-oro);outline-offset:2px}',
    '.vp-tappa.is-open{border-color:var(--la-accent);background:color-mix(in srgb,var(--la-accent) 14%,var(--lab-surface))}',
    '.vp-tappa-ore{font:600 10.5px/1.3 var(--lab-font-inscription);letter-spacing:.12em;text-transform:uppercase;color:var(--lab-muted)}',
    '.vp-tappa.is-oggi .vp-tappa-ore::after{content:" · oggi";color:var(--la-accent)}',
    '.vp-tappa-t{font:600 15px/1.25 var(--lab-font-display)}',
    '.vp-tappa-c{position:absolute;top:-8px;right:-5px;min-width:22px;height:22px;padding:0 5px;border-radius:999px;background:var(--la-accent);color:var(--lab-bg);font:700 12px/22px var(--lab-font-body);text-align:center}',
    '.vp-det{padding:21px;margin-bottom:13px;border-radius:21px;background:var(--lab-surface);border:1px solid var(--lab-line)}',
    '.vp-det-h{display:block;font:600 24px/1.2 var(--lab-font-display);color:var(--la-accent)}',
    '.vp-det p{margin:8px 0}',
    '.vp-ore{margin:8px 0;padding:0;list-style:none;display:grid;gap:5px}',
    '.vp-ore .la-meta{display:inline-block;min-width:2.4em;color:var(--lab-oro)}',
    '.vp-tags{display:flex;flex-wrap:wrap;gap:5px;margin:8px 0}',
    '.vp-tag{padding:3px 13px;border-radius:999px;font:600 13px/1.6 var(--lab-font-body);border:1px solid var(--lab-line);color:var(--lab-ink-soft)}',
    '.vp-tag.is-on{border-color:var(--la-accent);color:var(--lab-ink);background:color-mix(in srgb,var(--la-accent) 14%,transparent)}',
    '.vp-tag.is-on::before{content:"✓ ";color:var(--la-accent)}',
    '.vp-piani{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:8px 0}',
    '.vp-piani span{padding:8px 13px;border-left:3px solid var(--lab-oro);font-size:14px;line-height:1.4}',
    '@media (max-width:760px){.vp-grid,.vp-grid--inv,.vp-patto,.vp-piani{grid-template-columns:1fr;gap:21px}.vp-q{font-size:22px}.vp-card,.vp-inv{padding:21px}.vp-svg{max-width:220px}}',
    '@media (max-width:440px){.vp-tappa{min-width:calc(50% - 3px)}.vp-dl{grid-template-columns:1fr;gap:0 0}.vp-dl dd{margin-bottom:8px}.vp-inv-nome{font-size:28px}}',
    '@media (prefers-reduced-motion:reduce){.vp-ago,.vp-ago--breve{transition:none}.vp-in{animation:none}.vp-mezzo i{animation:none}}',
    /* lab-percezione.css del kit aggiunge 144 px sotto i 720 px a body.la: nella lezione (body.ll, altezza 100dvh)
       la barra delle scene salirebbe a metà schermo. Qui la si riporta in fondo, come negli artefatti precedenti. */
    '@media (max-width:720px){body.la.ll{padding-bottom:0}}',
    ':root[data-lim] .vp-q{font-size:32px}',
    ':root[data-lim] .vp-frase{font-size:26px}',
    ':root[data-lim] .vp-dl{font-size:19px}'
  ].join('\n');
  try {
    if (!document.getElementById('vp-css')) {
      var st = document.createElement('style'); st.id = 'vp-css'; st.textContent = CSS;
      (document.head || document.documentElement).appendChild(st);
    }
  } catch (e) { /* nessun problema: la lezione resta leggibile con il solo kit */ }
})();

/* =====================================================================
   Componenti della lezione (React con htm). Interazioni con <button> veri;
   hover / focus-visible / active nel CSS qui sopra o dalle classi del kit.
   ===================================================================== */
(function () {
  var I = LabLezione.inline;
  var useState = React.useState;
  /* Memoria in pagina: tornando a una scena il componente riprende da dove era rimasto. Nulla va nel browser. */
  var MEM = {};
  function useMem(key, iniziale) {
    var s = useState(function () {
      if (Object.prototype.hasOwnProperty.call(MEM, key)) return MEM[key];
      return typeof iniziale === 'function' ? iniziale() : iniziale;
    });
    return [s[0], function (v) { MEM[key] = v; s[1](v); }];
  }
  function mescola(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  /* Rosa dei venti in SVG, condivisa da Bussola e Rosa: quattro lettere e l'ago nel colore dell'anno. */
  var POS = [[100, 24], [178, 101], [100, 180], [22, 101]];
  var LETT = ['N', 'E', 'S', 'O'];
  function Rosa2D(rot, on, label, breve) {
    return html`<svg className="vp-svg" viewBox="0 0 200 200" role="img" aria-label=${label}>
      <circle className="vp-ring" cx="100" cy="100" r="92" />
      <circle className="vp-ring2" cx="100" cy="100" r="76" />
      ${LETT.map(function (k, i) { return html`<text key=${k} x=${POS[i][0]} y=${POS[i][1]} textAnchor="middle" dominantBaseline="middle" className=${'vp-dir' + (on === i ? ' is-on' : '')}>${k}</text>`; })}
      <g className=${'vp-ago' + (breve ? ' vp-ago--breve' : '')} style=${{ transform: 'rotate(' + rot + 'deg)' }}>
        <path d="M100 38 L109 100 L91 100 Z" fill="var(--la-accent)" />
        <path d="M100 162 L109 100 L91 100 Z" fill="var(--lab-muted)" />
      </g>
      <circle cx="100" cy="100" r="6" fill="var(--lab-oro)" />
    </svg>`;
  }

  /* ---------- Bussola: la bussola dell'estate (scena 2) ----------
     L'ago gira e sceglie una direzione e una domanda; estrazione di un numero del registro senza ripetizioni.
     Interazioni: «Gira la bussola» (ll-btn: magnetico, lama di luce, active 0,96, focus oro), «Altra domanda» e «Passo»
     (ll-btn--ghost: riempimento dal basso), «Estrai un numero» (ll-btn--ghost), ± alunni (vp-pm: hover bordo anno −2 px,
     active 0,94, focus oro). Barra di mezzo minuto sotto la domanda. Nessun nome: solo numeri, solo in memoria. */
  var DIR = [
    { nome: 'Nord', tema: 'Una cosa vera', ang: 0, q: [
      'Una cosa che hai scoperto quest’estate e che prima non sapevi.',
      'Un luogo che hai visto dal vivo ed era diverso da come lo immaginavi.',
      'Una notizia dell’estate che ti ha colpito: come hai capito che era vera?'] },
    { nome: 'Est', tema: 'Una cosa possibile', ang: 90, q: [
      'Qualcosa che hai imparato a fare: uno sport, un lavoro, una ricetta, un trucco.',
      'Un piccolo obiettivo che sei riuscito a raggiungere.',
      'Una cosa che credevi impossibile e che invece hai fatto.'] },
    { nome: 'Sud', tema: 'Una cosa giusta', ang: 180, q: [
      'Un gesto gentile che hai visto fare o che hai ricevuto.',
      'Una scelta dell’estate che rifaresti.',
      'Una volta in cui qualcuno ha fatto la cosa giusta anche se gli costava.'] },
    { nome: 'Ovest', tema: 'Una domanda', ang: 270, q: [
      'Una domanda che ti sei portato dietro in questi mesi.',
      'Un libro, un film o una serie che ti ha fatto pensare. Su che cosa?',
      'Una cosa che vorresti capire meglio quest’anno.'] }
  ];

  LabLezione.registra('Bussola', function (p) {
    var g = useMem('bu-giri', 0), giri = g[0], setGiri = g[1];
    var d = useMem('bu-dir', null), dir = d[0], setDir = d[1];
    var q = useMem('bu-q', 0), qi = q[0], setQi = q[1];
    var c = useMem('bu-racc', 0), racconti = c[0], setRacconti = c[1];
    var al = useMem('bu-alunni', 24), alunni = al[0], setAlunni = al[1];
    var es = useMem('bu-estratti', []), estratti = es[0], setEstratti = es[1];
    var nn = useMem('bu-num', null), numero = nn[0], setNumero = nn[1];
    var bk = useState(0), barKey = bk[0], setBarKey = bk[1];
    function gira(conta) {
      if (conta) setRacconti(racconti + 1);
      setGiri(giri + 1); setDir(Math.floor(Math.random() * 4)); setQi(Math.floor(Math.random() * 3)); setBarKey(barKey + 1);
    }
    function cambia() { setQi((qi + 1) % 3); setBarKey(barKey + 1); }
    function estrai() {
      var liberi = []; for (var i = 1; i <= alunni; i++) if (estratti.indexOf(i) < 0) liberi.push(i);
      if (!liberi.length) { setEstratti([]); setNumero(null); p.ctx.say('Tutti estratti: si ricomincia.'); return; }
      var n = liberi[Math.floor(Math.random() * liberi.length)];
      setNumero(n); setEstratti(estratti.concat([n]));
    }
    var D = dir === null ? null : DIR[dir];
    var rot = dir === null ? 20 : giri * 720 + D.ang;
    return html`<div>
      <div className="vp-grid">
        ${Rosa2D(rot, dir, D ? 'La bussola indica ' + D.nome + ': ' + D.tema : 'Bussola ferma', false)}
        <div className="vp-card" aria-live="polite">
          ${D ? html`<div key=${barKey} className="vp-in">
              <span className="la-meta">${D.nome} · ${D.tema}</span>
              <p className="vp-q">${D.q[qi]}</p>
              <span className="vp-mezzo" aria-hidden="true"><i></i></span>
            </div>`
            : html`<p className="vp-q">Quattro direzioni, dodici domande. Giriamo la bussola.</p>`}
          <div className="vp-legenda" aria-hidden="true">${DIR.map(function (x, i) { return html`<span key=${i}><b>${LETT[i]}</b>${x.tema}</span>`; })}</div>
        </div>
      </div>
      <div className="ll-row">
        <button className="ll-btn" onClick=${function () { gira(dir !== null); }}>${dir === null ? 'Gira la bussola' : 'Gira ancora'}</button>
        <button className="ll-btn ll-btn--ghost" disabled=${dir === null} onClick=${cambia}>Altra domanda</button>
        <button className="ll-btn ll-btn--ghost" disabled=${dir === null} onClick=${function () { gira(false); p.ctx.say('Passo: va benissimo.'); }}>Passo</button>
        <span className="ll-tally">Racconti: ${racconti}</span>
      </div>
      <div className="vp-registro">
        <span><span className="la-meta">Chi risponde?</span> <span className="vp-num" aria-live="polite">${numero == null ? '—' : numero}</span></span>
        <button className="ll-btn ll-btn--ghost" onClick=${estrai}>Estrai un numero</button>
        <span className="vp-step"><span className="ll-hint">Alunni</span>
          <button className="vp-pm" aria-label="Meno alunni" onClick=${function () { setAlunni(Math.max(5, alunni - 1)); }}>−</button>
          <b>${alunni}</b>
          <button className="vp-pm" aria-label="Più alunni" onClick=${function () { setAlunni(Math.min(35, alunni + 1)); }}>+</button></span>
        <span className="ll-hint">Da estrarre: ${Math.max(0, alunni - estratti.length)}</span>
      </div>
    </div>`;
  });

  /* ---------- Rosa: tre domande, tre metodi (scena 3, concetto più difficile) ----------
     Quattro pillole-direzione (vp-dbtn: hover bordo anno −2 px, active 0,96, focus oro, premuta = piena, vista = ✓).
     L'ago si orienta sulla direzione scelta; la scheda dice che cosa chiede, chi è competente e dove non arriva. */
  var ROSA = [
    { k: 'N', d: 'È vero?', chiede: 'Com’è fatta la realtà? Che cosa è accaduto davvero?', risponde: 'Osservazioni, dati, documenti, esperimenti che altri possono ripetere.', estate: 'La cosa che avete scoperto.', no: 'Non dice se una cosa vada fatta.' },
    { k: 'E', d: 'È possibile?', chiede: 'Si può fare? Con quali mezzi, a quale prezzo?', risponde: 'Tecnica, progetti, prototipi, collaudi.', estate: 'La cosa che avete imparato a fare.', no: 'Che si possa fare non dice che si debba.' },
    { k: 'S', d: 'È giusto?', chiede: 'È un bene per le persone coinvolte?', risponde: 'Ragioni morali e la {coscienza}; per chi crede, la luce della fede, che non prende il posto della ragione.', estate: 'Il gesto giusto che avete visto o ricevuto.', no: 'Un giudizio morale non dice com’è fatta la realtà.' },
    { k: 'O', d: 'Una domanda', chiede: 'Per che cosa vale la pena? Che senso ha?', risponde: 'Non un solo metodo: le domande di senso attraversano l’anno e chiedono tutte e tre le altre.', estate: 'La domanda che vi siete portati dietro.', no: 'Non si chiude in un’ora: si porta con sé.' }
  ];
  LabLezione.registra('Rosa', function (p) {
    var s = useMem('ro-v', null), v = s[0], setV = s[1], sv = useMem('ro-visti', {}), visti = sv[0], setVisti = sv[1];
    function mostra(i) {
      setV(i); var o = Object.assign({}, visti); o[i] = 1; setVisti(o);
      var tre = o[0] && o[1] && o[2], prima = visti[0] && visti[1] && visti[2];
      if (tre && !prima) { p.ctx.cheer(); p.ctx.say('Tre domande, tre metodi. Molti litigi nascono da qui: si risponde alla domanda sbagliata.'); }
    }
    var R = v === null ? null : ROSA[v];
    return html`<div>
      <div className="vp-pick" role="group" aria-label="Scegli una direzione">
        ${ROSA.map(function (r, i) {
          return html`<button key=${i} className=${'vp-dbtn' + (visti[i] ? ' is-seen' : '')} aria-pressed=${v === i} onClick=${function () { mostra(i); }}><small>${r.k}</small>${r.d}</button>`;
        })}
      </div>
      <div className="vp-grid">
        ${Rosa2D(v === null ? 20 : v * 90, v, R ? 'L’ago indica ' + R.d : 'Rosa delle tre domande', true)}
        <div className="vp-card" aria-live="polite">
          ${R ? html`<div key=${v} className="vp-in">
              <span className="la-meta">${['Nord', 'Est', 'Sud', 'Ovest'][v]}</span>
              <p className="vp-q">${R.d}</p>
              <dl className="vp-dl">
                <dt>Chiede</dt><dd>${R.chiede}</dd>
                <dt>Risponde</dt><dd>${I(R.risponde, 'r' + v)}</dd>
                <dt>Non basta</dt><dd className="vp-no">${R.no}</dd>
                <dt>Dall’estate</dt><dd>${R.estate}</dd>
              </dl>
            </div>`
            : html`<p className="vp-q">Toccate Nord, Est e Sud: che cosa chiede ogni direzione?</p>`}
        </div>
      </div>
    </div>`;
  });

  /* ---------- Veritas: gli occhiali (inventati) che «riconoscono le bugie» (scena 4) ----------
     Il verdetto e la percentuale sono estratti a caso, e lo si svela. Interazioni: «Analizza» (ll-btn), «Come funziona?»
     (ll-btn--solenne), tre scelte la-choice (hover bordo oro, active 0,98, focus oro; esito con parola),
     contatori Sì/No a mano alzata (vp-pm). Nessun dato salvato. */
  var FRASI = [
    'Quest’estate ho studiato tutti i giorni.',
    'Religione è la mia materia preferita.',
    'Ho letto tutto il libro, non solo il riassunto.',
    'Non ho mai toccato il telefono dopo mezzanotte.',
    'Il compito l’ha mangiato il mio cane.',
    'Sono arrivato in ritardo per colpa del bus.'
  ];
  var FINGE = [
    { t: 'È vero?', ok: true, why: 'La percentuale pretendeva di dire **come stanno le cose**: se chi parla mente. Ma nessuno aveva controllato come fosse ottenuta: un numero non è una {prova}.' },
    { t: 'È possibile?', ok: false, why: 'Che gli occhiali si accendano e mostrino un numero è possibile, e infatti accade. Ma il numero vuole dire se la persona **mente**: è una domanda sul vero.' },
    { t: 'È giusto?', ok: false, why: 'La domanda sul giusto è un’altra: «li useresti?». La percentuale finge di dire se chi parla mente, cioè come stanno le cose.' }
  ];
  LabLezione.registra('Veritas', function (p) {
    var o = useMem('ve-ordine', function () { return mescola(FRASI); }), ordine = o[0];
    var i = useMem('ve-k', -1), k = i[0], setK = i[1];
    var v = useMem('ve-ver', null), ver = v[0], setVer = v[1];
    var s = useMem('ve-sv', false), svelato = s[0], setSvelato = s[1];
    var f = useMem('ve-f', null), fi = f[0], setFi = f[1];
    var vt = useMem('ve-voti', [0, 0]), voti = vt[0], setVoti = vt[1];
    function analizza() {
      setK((k + 1) % ordine.length);
      setVer({ bugia: Math.random() < 0.5, perc: 61 + Math.floor(Math.random() * 38) });
    }
    function svela() { setSvelato(true); p.ctx.say('Vi siete fidati di una percentuale?'); }
    function finge(j) { if (fi !== null) return; setFi(j); if (FINGE[j].ok) p.ctx.cheer(); else p.ctx.oops(); }
    function cls(j) {
      if (fi === null) return 'la-choice';
      if (FINGE[j].ok) return 'la-choice is-right';
      return 'la-choice ' + (fi === j ? 'is-wrong' : 'is-dim');
    }
    function vota(j, d) { var x = voti.slice(); x[j] = Math.max(0, x[j] + d); setVoti(x); }
    var lente = ver ? (ver.bugia ? 'var(--lab-rosso)' : 'var(--lab-verde)') : 'var(--lab-surface-2)';
    return html`<div>
      <div className="vp-grid vp-grid--inv">
        <div className="vp-inv">
          <span className="vp-inv-nome">Veritas <span className="vp-badge">inventati</span></span>
          <p>Occhiali leggeri con microfono e processore. Ascoltano chi ti parla e ti dicono in tempo reale se sta mentendo, con la percentuale di sicurezza.</p>
          <p className="ll-hint">Un volontario legge la frase ad alta voce.</p>
          <p className="vp-frase" aria-live="polite">${k < 0 ? '«…»' : '«' + ordine[k] + '»'}</p>
          <p aria-live="polite">${ver ? html`<span className=${'vp-verd ' + (ver.bugia ? 'is-bugia' : 'is-vero')}><b>${ver.bugia ? 'BUGIA' : 'VERITÀ'}</b> sicurezza ${ver.perc}%</span>` : html`<span className="ll-hint">In attesa di una frase.</span>`}</p>
          <div className="ll-row">
            <button className="ll-btn" onClick=${analizza}>${k < 0 ? 'Analizza la prima frase' : 'Frase successiva'}</button>
            <button className="ll-btn ll-btn--solenne" disabled=${k < 0 || svelato} onClick=${svela}>Come funziona?</button>
          </div>
        </div>
        <div>
          <svg className="vp-occhiali" viewBox="0 0 220 90" aria-hidden="true">
            <rect className="vp-lente" x="14" y="22" width="80" height="54" rx="21" fill=${lente} fillOpacity="0.35" stroke="currentColor" strokeWidth="4" />
            <rect className="vp-lente" x="126" y="22" width="80" height="54" rx="21" fill=${lente} fillOpacity="0.35" stroke="currentColor" strokeWidth="4" />
            <path d="M94 40 Q110 28 126 40" fill="none" stroke="currentColor" strokeWidth="4" />
            <path d="M14 34 L2 26 M206 34 L218 26" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <circle cx="200" cy="30" r="4" fill="var(--lab-oro)" />
          </svg>
          <p className="ll-hint">Li useresti? Alzata di mano, prima di svelare.</p>
          <div className="vp-voti">
            ${['Sì', 'No'].map(function (t, j) {
              return html`<div key=${j} className="vp-voto">
                <span className="la-meta">${t}</span>
                <b className="vp-voto-n" aria-live="polite">${voti[j]}</b>
                <div className="ll-row">
                  <button className="vp-pm" aria-label=${'Togli un voto a ' + t} onClick=${function () { vota(j, -1); }}>−</button>
                  <button className="vp-pm vp-pm--pieno" aria-label=${'Aggiungi un voto a ' + t} onClick=${function () { vota(j, 1); }}>+</button>
                </div>
              </div>`;
            })}
          </div>
        </div>
      </div>
      ${svelato && html`<div className="vp-sotto vp-in" aria-live="polite">
        <p className="ll-why is-ko"><strong>Il verdetto è estratto a caso. </strong>Veritas non esiste e questa demo tira una moneta: anche la percentuale è inventata.</p>
        <h3 className="la-q">La percentuale fingeva di rispondere a quale domanda?</h3>
        <div className="la-choices">
          ${FINGE.map(function (x, j) { return html`<button key=${j} className=${cls(j)} disabled=${fi !== null} onClick=${function () { finge(j); }}><span className="la-key">${'ABC'[j]}</span>${x.t}</button>`; })}
        </div>
        ${fi !== null && html`<p className=${'ll-why ' + (FINGE[fi].ok ? 'is-ok' : 'is-ko')}><strong>${FINGE[fi].ok ? 'Esatto. ' : 'Non proprio. '}</strong>${I(FINGE[fi].why, 'w')} ${I('E il vostro «li userei»? Risponde a **è giusto?**', 'g')}</p>`}
      </div>`}
    </div>`;
  });

  /* ---------- Patto: il patto di confronto (scena 8) ----------
     Regola composta (inizio + fine) o scritta, suggerimenti; da tre a cinque regole. Solo in memoria.
     Interazioni: scelte la-choice (selezionata = is-right), campo di testo (hover bordo anno, focus oro),
     «Aggiungi al patto» (ll-btn), suggerimenti ll-btn--ghost, «togli» ll-link. */
  var INIZI = ['dico se parlo del vero, del possibile o del giusto', 'riassumo la tua posizione finché la riconosci', 'chiedo qual è la fonte competente', 'critico l’idea e non chi la sostiene'];
  var FINI = ['costruire una caricatura', 'usare i like come prova', 'rispondere a un’altra domanda', 'alzare la voce'];
  var SUGG = ['Prima di criticare una posizione, la descrivo in modo che l’altro la riconosca.', 'Dico su quale domanda sto discutendo: vero, possibile o giusto.', 'Ogni domanda ha la sua fonte competente.', 'Posso cambiare idea senza perdere la faccia.', 'Quello che raccontiamo di noi resta in quest’aula.'];
  LabLezione.registra('Patto', function (p) {
    var a = useMem('pa-ini', null), ini = a[0], setIni = a[1];
    var b = useMem('pa-fin', null), fin = b[0], setFin = b[1];
    var c = useState(''), libera = c[0], setLibera = c[1];
    var d = useMem('pa-patto', []), patto = d[0], setPatto = d[1];
    var regola = libera.trim() ? libera.trim() : (ini !== null && fin !== null ? 'Quando non sono d’accordo, ' + INIZI[ini] + ' invece di ' + FINI[fin] + '.' : '');
    function aggiungi(r) {
      if (!r || patto.indexOf(r) >= 0) return;
      if (patto.length >= 5) { p.ctx.say('Cinque regole bastano: meglio poche e vere.'); return; }
      var n = patto.concat([r]); setPatto(n);
      if (n.length === 3) { p.ctx.festa(); p.ctx.say('Tre regole: il patto c’è. Ricopiatelo alla lavagna.'); }
    }
    return html`<div className="vp-patto">
      <div>
        <p className="ll-hint"><b>Quando non sono d’accordo, io…</b></p>
        <div className="vp-chips">${INIZI.map(function (t, i) { return html`<button key=${i} className=${'la-choice vp-chip' + (ini === i ? ' is-right' : '')} aria-pressed=${ini === i} onClick=${function () { setIni(i); setLibera(''); }}>${t}</button>`; })}</div>
        <p className="ll-hint"><b>…invece di</b></p>
        <div className="vp-chips">${FINI.map(function (t, i) { return html`<button key=${i} className=${'la-choice vp-chip' + (fin === i ? ' is-right' : '')} aria-pressed=${fin === i} onClick=${function () { setFin(i); setLibera(''); }}>${t}</button>`; })}</div>
        <label className="ll-hint" htmlFor="vp-libera">Oppure con parole vostre</label>
        <input id="vp-libera" className="vp-input" value=${libera} maxLength="140" autoComplete="off" placeholder="La regola…" onInput=${function (e) { setLibera(e.target.value); }} onChange=${function (e) { setLibera(e.target.value); }} />
        <p className="vp-regola" aria-live="polite">${regola || 'Scegliete un inizio e una fine, oppure scrivete la regola.'}</p>
        <div className="ll-row">
          <button className="ll-btn" disabled=${!regola} onClick=${function () { aggiungi(regola); setLibera(''); setIni(null); setFin(null); }}>Aggiungi al patto</button>
        </div>
        <p className="ll-hint">Suggerimenti:</p>
        <div className="vp-chips">${SUGG.map(function (t, i) { return html`<button key=${i} className="ll-btn ll-btn--ghost vp-sugg" disabled=${patto.indexOf(t) >= 0} onClick=${function () { aggiungi(t); }}>${t}</button>`; })}</div>
      </div>
      <div className="vp-foglio">
        <span className="la-meta">Il patto · ${patto.length} ${patto.length === 1 ? 'regola' : 'regole'}</span>
        ${patto.length === 0 ? html`<p className="ll-hint">Il patto è ancora vuoto: aggiungete la prima regola.</p>`
          : html`<ol>${patto.map(function (r, i) { return html`<li key=${i}>${r} <button className="ll-link" aria-label=${'Togli la regola ' + (i + 1)} onClick=${function () { setPatto(patto.filter(function (_, j) { return j !== i; })); }}>togli</button></li>`; })}</ol>`}
        <p className="ll-hint">Il patto resta solo su questa pagina: ricopiatelo alla lavagna o sul quaderno.</p>
      </div>
    </div>`;
  });

  /* ---------- Programma: la mappa dell'anno (scena 9) ----------
     Otto tappe (tab), scheda con gli incontri e le domande in gioco, contatore «ci incuriosisce» per alzata di mano.
     Interazioni: tappe vp-tappa (hover bordo oro −2 px, active 0,96, focus oro, aperta = colore dell'anno),
     ± curiosità (vp-pm). Solo in memoria. */
  var TAG = ['vero', 'possibile', 'giusto', 'senso'];
  var UDA = [
    { ore: '1', t: 'Vero, possibile, giusto', d: 'La bussola dell’estate, le tre domande dell’anno e il patto di confronto. Siete qui.', oggi: true, tag: [1, 1, 1, 0], righe: [] },
    { ore: '2–5', t: 'Riformare una Chiesa, cambiare una cultura', d: 'Riforma protestante e risposta cattolica attraverso questioni reali: dottrina, abuso, riforma e ricezione.', tag: [1, 0, 1, 0], righe: [
      ['2', 'Quando una protesta ha buone ragioni?', 'Le indulgenze nel 1517: dottrina, abusi e contesto politico.'],
      ['3', '«Ritratta»: chi giudica la coscienza?', 'Lutero alla dieta di Worms, 1521.'],
      ['4', 'Un concilio può cambiare ciò che vediamo?', 'Trento, la riforma e il decreto sulle immagini.'],
      ['5', 'Discutere per ritrovarsi', 'La Dichiarazione congiunta sulla giustificazione, 1999.']],
      extra: 'Caso artistico: il Giudizio universale della Sistina e le coperture affidate a Daniele da Volterra.' },
    { ore: '6–9', t: 'Devo meritarmi tutto?', d: 'Grazia, libertà e responsabilità.', tag: [0, 0, 1, 1], righe: [
      ['6', 'Essere accolti prima di riuscire', 'Dono, merito e ricompensa.'],
      ['7', 'Il padre, due figli e una festa difficile', 'Lc 15,11–32.'],
      ['8', 'Quanto sono libero quando scelgo?', 'Condizionamenti, abitudini e deliberazione.'],
      ['9', 'Se è un dono, perché impegnarsi?', 'Fede e opere; una riparazione che non compra il valore personale.']] },
    { ore: '10–13', t: 'Galileo: le prove e l’autorità', d: 'Domande e metodi dei diversi saperi, sui documenti.', tag: [1, 0, 1, 0], righe: [
      ['10', 'Un’osservazione cambia tutto?', 'Il cannocchiale: osservazione e teoria.'],
      ['11', 'Che cosa accadde nel 1633?', 'La sentenza, il 1616, l’abiura.'],
      ['12', 'La Bibbia insegna astronomia?', 'Giovanni Paolo II nel 1992 e Dei Verbum.'],
      ['13', 'Come riconosco una prova?', 'Un grafico da correggere senza cambiare i numeri.']] },
    { ore: '14', t: 'Verifica rovesciata', d: 'Quattro affermazioni su Trento, grazia, Luca 15 e Galileo: le correggete voi, dossier alla mano. Contano le ragioni e la pertinenza delle fonti.', tag: [1, 0, 0, 0], righe: [] },
    { ore: '15–18', t: 'Possiamo farlo: dovremmo farlo?', d: 'Valutare la tecnica a partire dal bene delle persone.', tag: [0, 1, 1, 0], righe: [
      ['15', 'Sono un corpo o possiedo un corpo?', 'Unità della persona.'],
      ['16', 'Correggere una malattia o progettare una persona?', 'CRISPR, terapia e potenziamento.'],
      ['17', 'Dove finisce il telefono che cambiamo?', 'Rifiuti elettronici, risorse e lavoro.'],
      ['18', 'Una scelta buona per chi?', 'Laudato si’ e un acquisto per una comunità.']] },
    { ore: '19–22', t: 'L’amore è più forte della morte?', d: 'Il linguaggio biblico dell’amore: cura e possesso.', tag: [0, 0, 1, 1], righe: [
      ['19', 'L’amore si può comprare?', 'Ct 8,6–7: sigillo, fuoco, acque.'],
      ['20', 'Perché la volpe chiede tempo e riti?', 'Il Piccolo Principe, cap. XXI, e Deus caritas est.'],
      ['21', 'Il consenso basta a dire tutto?', 'Sincerità, reciprocità, responsabilità.'],
      ['22', 'Che cosa rimane quando passa l’entusiasmo?', '1 Cor 13,4–13.']] },
    { ore: '23–28', t: 'Talenti: costruire qualcosa che gli altri possano usare', d: 'Gruppi di 3–4, tema libero: ognuno mette in campo ciò che sa fare; il gruppo costruisce un prodotto che altri possano usare.', tag: [0, 1, 1, 0], righe: [
      ['23', 'Destinatario, scopo e ruoli', 'La mappa delle abilità del gruppo.'],
      ['24', 'Il prototipo', 'Guida, gioco, prodotto creativo o dimostrazione.'],
      ['25', 'La prova con gli utenti', 'Un altro gruppo prova e dà tre riscontri.'],
      ['26', 'La revisione', 'Prodotto migliorato e scheda delle fonti.'],
      ['27', 'La presentazione', 'Tre o quattro minuti e una dimostrazione.'],
      ['28', 'Consegna e bilancio', 'Le abilità emerse, gruppo per gruppo.']] }
  ];
  LabLezione.registra('Programma', function (p) {
    var s = useMem('pr-aperta', 0), aperta = s[0], setAperta = s[1];
    var c = useMem('pr-cur', [0, 0, 0, 0, 0, 0, 0, 0]), cur = c[0], setCur = c[1];
    var u = UDA[aperta];
    function cambia(d) {
      var x = cur.slice(); x[aperta] = Math.max(0, x[aperta] + d); setCur(x);
      if (d > 0 && x[aperta] === 1 && x.filter(function (n) { return n > 0; }).length === 1) p.ctx.say('Segnato. Io punto già l’ago sull’incontro 2: 1517, una cassa di denaro e una protesta.');
    }
    return html`<div>
      <div className="vp-tappe" role="tablist" aria-label="Tappe dell’anno">
        ${UDA.map(function (x, i) {
          return html`<button key=${i} role="tab" aria-selected=${aperta === i} className=${'vp-tappa' + (aperta === i ? ' is-open' : '') + (x.oggi ? ' is-oggi' : '')} onClick=${function () { setAperta(i); }}>
            <span className="vp-tappa-ore">${x.ore.indexOf('–') < 0 ? 'Incontro ' + x.ore : 'Incontri ' + x.ore}</span>
            <span className="vp-tappa-t">${x.t}</span>
            ${cur[i] > 0 && html`<span className="vp-tappa-c" aria-label=${cur[i] + ' voti di curiosità'}>${cur[i]}</span>`}
          </button>`;
        })}
      </div>
      <div key=${aperta} className="vp-det vp-in" role="tabpanel" aria-live="polite">
        <b className="vp-det-h">${u.t}</b>
        <p>${u.d}</p>
        <div className="vp-tags" aria-label="Le domande in gioco">${TAG.map(function (t, j) { return html`<span key=${j} className=${'vp-tag' + (u.tag[j] ? ' is-on' : '')}>${t}</span>`; })}</div>
        ${u.righe.length > 0 && html`<ol className="vp-ore">${u.righe.map(function (r) { return html`<li key=${r[0]}><span className="la-meta">${r[0]}</span> <b>${r[1]}</b> — ${r[2]}</li>`; })}</ol>`}
        ${u.extra && html`<p className="ll-hint">${u.extra}</p>`}
        <div className="ll-row">
          <span className="ll-hint">Ci incuriosisce:</span>
          <button className="vp-pm" aria-label="Togli un voto di curiosità" onClick=${function () { cambia(-1); }}>−</button>
          <b className="ll-tally">${cur[aperta]}</b>
          <button className="vp-pm vp-pm--pieno" aria-label="Aggiungi un voto di curiosità" onClick=${function () { cambia(1); }}>+</button>
        </div>
      </div>
      <span className="la-meta">Tre piani che terremo distinti</span>
      <div className="vp-piani">
        <span><b>Che cosa attestano fonti e prove</b><br/>il vero</span>
        <span><b>Come le interpretiamo</b><br/>il metodo</span>
        <span><b>Che cosa giudichiamo giusto</b><br/>il bene</span>
      </div>
      <p className="ll-hint">Il voto riguarda come usate fonti e ragioni. La fede di ciascuno, o la sua assenza, e le situazioni personali non sono mai oggetto di voto.</p>
    </div>`;
  });
})();

/* =====================================================================
   Giochi (motore LAB-IRC). La Sfida a squadre è la pausa gioco della scena 7:
   le domande usano solo ciò che è stato affrontato nelle scene 1–6.
   ===================================================================== */
LEZIONE.giochi = {
  tema: 'Vero, possibile, giusto: la fonte competente',
  sfida: [
    { q: 'Quale domanda riguarda il giusto?', a: ['Quanto costa?', 'Funziona senza internet?', 'Chi viene danneggiato da un errore?', 'Quanto pesa?'], ok: 2 },
    { q: 'Un milione di visualizzazioni è…', a: ['una prova sui fatti', 'un collaudo tecnico', 'una ragione morale', 'non è una prova'], ok: 3 },
    { q: '«Si può produrre a un prezzo accessibile?» è una domanda su…', a: ['il vero', 'il possibile', 'il giusto', 'nessuna delle tre'], ok: 1 },
    { q: 'Chi è competente su «la voce cambia quando mentiamo?»', a: ['Studi sperimentali ripetuti', 'Lo spot del produttore', 'Il numero di preordini', 'Una legge'], ok: 0 },
    { q: 'Per Galileo, la Scrittura insegna…', a: ['come va il cielo', 'la forma della Terra', 'come si va al cielo', 'le orbite dei pianeti'], ok: 2 },
    { q: 'Nella demo di Veritas, la percentuale di sicurezza era…', a: ['calcolata sulla voce', 'estratta a caso', 'presa da uno studio', 'decisa dal docente'], ok: 1 },
    { q: 'Il documento originale conservato in archivio risponde a…', a: ['è vero?', 'è possibile?', 'è giusto?', 'non è una prova'], ok: 0 },
    { q: '«Funziona, quindi va bene» salta…', a: ['dal vero al possibile', 'dal giusto al vero', 'dal possibile al giusto', 'non salta nulla'], ok: 2 }
  ],
  cat: {
    bins: ['È vero?', 'È possibile?', 'È giusto?', 'Non è una prova'],
    items: [
      ['Un esperimento ripetuto da gruppi indipendenti', 0],
      ['Uno studio pubblicato con tutti i dati', 0],
      ['Il documento originale conservato in archivio', 0],
      ['Un prototipo che funziona in laboratorio', 1],
      ['Il collaudo di un ingegnere, con costi e materiali', 1],
      ['Un’argomentazione sul bene delle persone coinvolte', 2],
      ['La Dichiarazione universale dei diritti umani', 2],
      ['Un milione di visualizzazioni', 3],
      ['Lo spot pubblicitario del produttore', 3],
      ['«Tanto lo fanno tutti»', 3]
    ]
  },
  vf: [
    { s: '«Li userei» risponde alla domanda «funzionano?».', v: false, why: 'Dice che cosa sceglierei: riguarda il giusto, non il vero.' },
    { s: 'Una percentuale mostrata da un dispositivo è già una prova.', v: false, why: 'Serve un test controllabile che mostri come è stata ottenuta.' },
    { s: 'Una cosa legale è sempre anche giusta.', v: false, why: 'La legge dice che cosa è permesso; la storia conosce leggi ingiuste.' },
    { s: 'Galileo scrisse che la Scrittura insegna «come si vadia al cielo».', v: true, why: 'Nella Lettera a Cristina di Lorena del 1615, riprendendo un detto attribuito al cardinale Baronio.' },
    { s: 'Nel 1992 Giovanni Paolo II tornò sul caso Galileo.', v: true, why: 'Nel discorso del 31 ottobre 1992 alla Pontificia Accademia delle Scienze.' },
    { s: 'Che una cosa si possa fare dimostra che si debba fare.', v: false, why: 'Il possibile e il giusto sono domande diverse: la seconda chiede ragioni sul bene delle persone.' },
    { s: 'In IRC si dà un voto alla fede di ciascuno.', v: false, why: 'Si valutano l’uso delle fonti e delle ragioni, mai l’adesione di fede.' }
  ],
  quiz: [
    { q: '«Si possono produrre a basso costo?» è una domanda su…', a: ['il vero', 'il possibile', 'il giusto', 'nessuna delle tre'], ok: 1, why: 'Costi e mezzi riguardano la fattibilità.' },
    { q: 'Che cos’è una caricatura in una discussione?', a: ['Un disegno satirico', 'Un riassunto fedele', 'Una posizione attribuita all’altro, più debole di quella che sostiene', 'Una citazione esatta'], ok: 2, why: 'Si vince facilmente, ma non si discute davvero.' },
    { q: 'Quale fonte è competente per «la voce cambia quando mentiamo?»', a: ['Studi sperimentali ripetuti', 'Un sondaggio fra amici', 'Il numero di preordini', 'Una legge'], ok: 0, why: 'È una domanda sui fatti: servono dati controllabili.' },
    { q: 'Per Galileo la Scrittura insegna…', a: ['come va il cielo', 'come si va al cielo', 'la forma della Terra', 'le orbite dei pianeti'], ok: 1, why: 'Distingue la via della salvezza dall’astronomia.' },
    { q: 'Da dove viene la parola «bussola»?', a: ['Dal nome di un navigatore', 'Da una scatoletta di legno di bosso', 'Dal latino «buscare», cercare', 'Dal greco «boulé», consiglio'], ok: 1, why: 'Dal latino medievale buxida, dal greco pyxís: la scatoletta che conteneva l’ago.' },
    { q: 'Quante ore dura l’UDA Talenti?', a: ['Due', 'Quattro', 'Sei', 'Otto'], ok: 2, why: 'Dall’incontro 23 al 28.' }
  ],
  abbina: [
    ['È vero?', 'Prove controllabili'],
    ['È possibile?', 'Prototipi e collaudi'],
    ['È giusto?', 'Ragioni sul bene delle persone'],
    ['Caricatura', 'Una posizione deformata'],
    ['Falsa prova', '«Lo fanno tutti»']
  ],
  memory: [
    ['Bussola', 'scatoletta di bosso'],
    ['Metodo', 'la via per arrivare'],
    ['Criterio', 'da krínō, distinguere'],
    ['Coscienza', 'cum + scire, sapere'],
    ['Competente', 'a cui spetta rispondere'],
    ['Legale', 'da lex, legge']
  ]
};
