/* ---- lezione ---- */
/* Classe I · Accoglienza (UDA 0) · Lezione 1 — «Il nome e la domanda».
   Artefatto interattivo, 7 ottobre 2026 (skill «IRC · Artefatto interattivo della lezione», kit definitivo del 5 ottobre 2026).
   Riscrittura della versione del 4 ottobre: stesse attività (gioco dei nomi, la scelta di quest'ora, la domanda dell'anno,
   la mappa, il patto, la scatola delle domande), nuova regia di 50 minuti con pausa gioco e Sfida a squadre.
   Nessun dato salvato: i nomi restano sulla lavagna vera; qui si contano solo voci anonime, in memoria, finché la pagina è aperta.
   Bibbia: CEI 2008. Norme: Accordo del 18 febbraio 1984 (legge 121/1985), legge 281/1986, Corte costituzionale 203/1989 e 13/1991,
   D.P.R. 176/2012, D.Lgs. 297/1994 art. 309. Etimologie secondo il Vocabolario Treccani (vedi note del docente per i limiti).
   © Matteo Sestili — Tutti i diritti riservati */
window.LEZIONE = {
  slug: 'i-0-1-accoglienza-il-nome-e-la-domanda',
  classe: 'Anno I',
  titolo: 'Il *nome* e la domanda',
  sottotitolo: 'Primo giorno: i nomi uno per uno, la scelta di quest’ora, la domanda dell’anno, la mappa delle quattro tappe, il patto e la scatola delle domande.',
  saluto: 'Fine del primo giorno: ci vediamo alla tappa 1.',

  glossario: {
    'nome': { parola: 'Nome', etim: 'dal latino *nomen*', def: 'La parola che indica una persona e la distingue da tutte le altre. Il primo giorno ogni nome va sulla lavagna, uno per uno: nessuno è un numero.' },
    'domanda': { parola: 'Domanda', etim: 'da *domandare*, dal latino *demandare*, «affidare»', def: 'Una richiesta di sapere. Nella sua origine c’è l’idea di affidare qualcosa a qualcuno: una domanda vera si affida, non si sbriga con una ricerca.' },
    'talento': { parola: 'Talento', etim: 'dal latino *talentum*, greco *tálanton*, «piatto della bilancia, peso», poi una grossa somma di denaro', def: 'Una capacità, un’inclinazione. Il significato viene dalla parabola dei talenti (Mt 25,14-30): il denaro affidato ai servi è diventato, nella lingua, il dono da far fruttare.' },
    'concordato': { parola: 'Concordato', etim: 'dal latino *concordare*, «accordarsi», da *cor*, «cuore»', def: 'Un accordo fra uno Stato e la Santa Sede. Quello italiano del 1929 è stato rivisto con l’Accordo del 18 febbraio 1984: da allora ciascuno sceglie se avvalersi dell’ora di religione.' },
    'laicità': { parola: 'Laicità', etim: 'da *laico*, dal latino tardo *laicus*, greco *laikós*, «del popolo» (da *laós*, «popolo»)', def: 'Il principio per cui lo Stato non si identifica con una religione e garantisce a tutti la libertà religiosa. La parola non è scritta nella Costituzione: la Corte costituzionale l’ha riconosciuta come «principio supremo» nella sentenza 203 del 1989, che riguardava proprio quest’ora.' },
    'patto': { parola: 'Patto', etim: 'dal latino *pactum*, da *pacisci*, «accordarsi»', def: 'Un impegno preso in due. Il patto della classe obbliga chi insegna e chi studia: se uno dei due lo rompe, non regge.' },
    'fatto': { parola: 'Fatto', etim: 'dal latino *factum*, «ciò che è stato fatto», da *facere*', def: 'Ciò che è accaduto o che si trova scritto: si può verificare, su un documento, su un testo, con un dato.' },
    'interpretazione': { parola: 'Interpretazione', etim: 'dal latino *interpretatio*, da *interpres*, «mediatore, chi spiega»', def: 'Una lettura che spiega un fatto o un testo: può essere più o meno convincente e si discute con ragioni.' },
    'giudizio di valore': { parola: 'Giudizio di valore', def: 'Un’affermazione su ciò che è giusto, buono, importante. Si può sostenere con buone ragioni, ma non si dimostra come un dato.' },
    'gilgamesh': { parola: 'Gilgamesh', def: 'Re di Uruk, in Mesopotamia, protagonista di uno dei poemi più antichi che conosciamo, l’*Epopea di Gilgamesh*: parte per conquistarsi un nome che non muoia, poi cerca la vita senza fine e torna sapendo che morirà.' }
  },

  scene: [
    /* 1 · Aggancio: la promessa dell'ora e un sondaggio d'ingresso anonimo (0–3) */
    { fase: 'Aggancio', momento: 'Primo giorno', minuti: 3, titolo: 'Il *nome* e la domanda',
      lead: 'Prima i nomi, uno per uno. Poi una {domanda} che ci terrà compagnia fino a giugno.',
      blocchi: [
        { tipo: 'domanda', id: 'ingresso', etichetta: 'Anonimo · per alzata di mano', q: 'Quest’ora, per voi, è soprattutto…',
          opzioni: ['Catechismo a scuola', 'Un’ora di buco', 'Un’ora per farsi domande e conoscere il cristianesimo', 'Non lo so ancora'],
          dibattito: 'Teniamo i voti: a fine ora rifaremo la stessa domanda.' },
        { tipo: 'agenda', titolo: 'Il primo giorno' }
      ] },

    /* 2 · Attività: la catena dei nomi e la mappa dei talenti (3–14) */
    { fase: 'Attività', momento: 'Il gioco dei nomi', minuti: 11, titolo: 'La *catena* dei nomi',
      lead: 'Tre regole. Ogni {nome} va sulla lavagna; ogni {talento|talento} sulla mappa della classe.',
      blocchi: [
        { tipo: 'custom', nome: 'CatenaNomi', props: {} },
        { tipo: 'parola', parola: 'talento', radice: 'talent', origine: 'Dal latino talentum, greco tálanton: «piatto della bilancia», poi «peso» e una grossa somma di denaro',
          significato: 'Nella parabola dei talenti (Mt 25,14-30) un uomo affida il suo denaro ai servi «secondo le capacità di ciascuno». Da quella parabola la parola è passata alle capacità stesse: un dono ricevuto, da far fruttare.',
          battuta: 'Una moneta antica è diventata una parola per dire che cosa sapete fare.' }
      ] },

    /* 3 · Scoperta: l'unica materia che si può rifiutare (14–18) */
    { fase: 'Scoperta', momento: 'Una cosa che nessuno sa', minuti: 4, titolo: 'Avete *scelto* voi',
      lead: 'Questa è l’unica materia dell’orario a cui potevate dire di no.',
      blocchi: [
        { tipo: 'verifica', etichetta: 'Indovinate', q: 'Alle superiori, chi sceglie se avvalersi dell’ora di religione?',
          opzioni: ['I genitori', 'Il dirigente scolastico', 'Lo studente, all’iscrizione', 'Nessuno: è obbligatoria'], ok: 2,
          why: 'Nella scuola secondaria superiore la scelta la esercita **personalmente lo studente**, all’atto dell’iscrizione (legge 281 del 1986). Per molti è la prima decisione scolastica presa in prima persona.' },
        { tipo: 'tappe', titolo: 'Come si è arrivati alla scelta', aperta: 1, voci: [
          { data: '1929', breve: 'obbligo', titolo: '«Fondamento e coronamento»', testo: 'Con il {Concordato|concordato} del 1929 lo Stato considera l’insegnamento della dottrina cristiana «fondamento e coronamento» dell’istruzione pubblica (art. 36).' },
          { data: '1984', breve: 'scelta', titolo: 'Si sceglie', testo: 'L’Accordo di revisione del Concordato, firmato il 18 febbraio 1984, garantisce «a ciascuno» il diritto di scegliere se avvalersi o non avvalersi di quest’insegnamento (art. 9, n. 2).' },
          { data: '1986', breve: 'studenti', titolo: 'Sceglie lo studente', testo: 'Alle superiori sono gli studenti a esercitare personalmente la scelta, all’atto dell’iscrizione (legge 281/1986, art. 1).' },
          { data: '1989', breve: 'laicità', titolo: 'Una parola nuova', testo: 'La Corte costituzionale riconosce la {laicità} come «principio supremo» e chiarisce che chi non si avvale si trova in uno «stato di non-obbligo» (sentenza 203/1989).' },
          { data: '2012', breve: 'programma', titolo: 'Un programma per tutti', testo: 'Le indicazioni per quest’ora nelle superiori sono fissate per decreto e valgono in tutta Italia, per chi crede e per chi non crede (D.P.R. 176/2012).' }
        ] }
      ] },

    /* 4 · Scoperta: tre cose che quest'ora non è (18–22) */
    { fase: 'Scoperta', minuti: 4, titolo: 'Tre cose che quest’ora *non* è',
      lead: 'Girate le carte: tre idee che girano sull’ora di religione.',
      blocchi: [
        { tipo: 'carte', carte: [
          { etichetta: 'Non è', fronte: 'Catechismo', retro: 'Il programma è fissato per decreto e vale per tutti allo stesso modo, credenti e non. **Nessuno vi chiederà che cosa credete.**' },
          { etichetta: 'Non è', fronte: 'Senza valutazione', retro: 'Si valuta, ma senza voto in decimi: un **giudizio**, su una nota a parte. Si valuta ciò che fate, mai ciò che pensate.' },
          { etichetta: 'Non è', fronte: 'Un’ora di buco', retro: 'Leggeremo testi, guarderemo pezzi di film, discuteremo, analizzeremo un caso. E le ultime sei ore saranno vostre.' }
        ] },
        { tipo: 'verifica', etichetta: 'Verifica lampo', q: 'Che cosa si valuta, in quest’ora?',
          opzioni: ['Ciò che credete', 'Quanto siete d’accordo con chi insegna', 'Il lavoro: attenzione, ragionamento, compiti', 'Niente: non c’è valutazione'], ok: 2,
          why: 'Si valuta con un giudizio, senza voto numerico, e si valuta ciò che **fate**: le convinzioni restano vostre. È anche uno degli impegni del patto per chi insegna.' }
      ] },

    /* 5 · Scoperta: la domanda dell'anno, mostrata con un'animazione (22–27) */
    { fase: 'Scoperta', momento: 'La domanda dell’anno', minuti: 5, titolo: 'Ogni persona *conta*?',
      lead: 'Sembra ovvio. Nel mondo antico contavano i re, gli dèi e le città: un uomo senza titoli e senza terra non contava niente.',
      blocchi: [
        { tipo: 'animazione', id: 'nomi', rapporto: 1.3, ritmo: 3200, pulsante: 'Avvia il racconto',
          attori: [
            { id: 'g', t: 'Gilgamesh', forma: 'pillola', colore: 'accent' },
            { id: 'f', t: 'un nome eterno', forma: 'pillola', colore: 'oro' },
            { id: 'e', t: 'Enkidu muore', forma: 'riquadro', colore: 'muted' },
            { id: 'v', t: 'vita senza fine?', forma: 'pillola', colore: 'rosa' },
            { id: 'a', t: 'Abramo', forma: 'pillola', colore: 'ciano' },
            { id: 'n', t: 'un nome promesso', forma: 'pillola', colore: 'oro' },
            { id: 'l', t: 'i vostri nomi, uno per uno', forma: 'riquadro', colore: 'verde' },
            { id: 'q', t: 'Ogni persona conta: perché?', forma: 'testo', colore: 'accent' }
          ],
          frecce: [
            { id: 'g-f', da: 'g', a: 'f', t: 'conquista' },
            { id: 'g-v', da: 'e', a: 'v', t: 'cerca', tratteggio: true },
            { id: 'a-n', da: 'a', a: 'n', t: 'riceve' }
          ],
          passi: [
            { didascalia: '{Gilgamesh|gilgamesh}, re di Uruk, parte per la Foresta dei Cedri: vuole un nome che non muoia.',
              attori: { g: { x: 20, y: 18, on: true }, f: { x: 74, y: 18 } }, frecce: ['g-f'] },
            { didascalia: 'Morto l’amico Enkidu, cerca la vita senza fine. Non la trova: torna a casa sapendo che morirà.',
              attori: { g: { on: false }, f: { o: .35 }, e: { x: 20, y: 48 }, v: { x: 74, y: 48, on: true } }, frecce: ['g-v'] },
            { didascalia: 'Dalla stessa terra parte un altro uomo, Abramo. Il nome non deve conquistarlo: gli viene promesso (Gen 12,2).',
              attori: { v: { o: .35, on: false }, e: { o: .35 }, a: { x: 20, y: 80, on: true }, n: { x: 74, y: 80 } }, frecce: ['a-n'] },
            { didascalia: 'Oggi i vostri nomi sono sulla lavagna, uno per uno, senza averli conquistati.',
              attori: { g: { o: .25 }, f: { o: 0 }, e: { o: 0 }, v: { o: 0 }, a: { o: .25, on: false }, n: { o: .25 }, l: { x: 50, y: 48, on: true, s: 1.1 } }, frecce: [] },
            { didascalia: 'In mezzo ci sono più di tremila anni. Da dove viene l’idea che ogni persona conta? È la domanda dell’anno.',
              attori: { l: { y: 34, on: false, s: 1 }, g: { o: 0 }, a: { o: 0 }, n: { o: 0 }, q: { x: 50, y: 70, s: 1.2 } }, frecce: [] }
          ] }
      ] },

    /* 6 · Scoperta: la mappa dell'anno (27–31) */
    { fase: 'Scoperta', momento: 'La mappa', minuti: 4, titolo: 'Quattro tappe e un *finale*',
      lead: 'La strada dell’anno: toccate una tappa per vedere dove porta.',
      blocchi: [
        { tipo: 'custom', nome: 'MappaAnno', props: {} },
        { tipo: 'aggancio', etichetta: 'Per capire', titolo: 'Il nome del nostro laboratorio',
          t: 'Il laboratorio di quest’ora è intitolato a **san Carlo Acutis** (1991–2006), un ragazzo cresciuto a Milano, appassionato di informatica, che usò quel talento per raccontare la fede. È stato proclamato santo il 7 settembre 2025.',
          fonte: 'Santa Sede, canonizzazione del 7 settembre 2025' }
      ] },

    /* 7 · Pausa gioco: Sfida a squadre su ciò che si è appena visto (31–37) */
    { fase: 'Attività', momento: 'Pausa gioco', minuti: 6, titolo: 'Sfida *a squadre*',
      testo: 'Le domande riguardano solo ciò che abbiamo visto oggi: la scelta, la valutazione, la domanda dell’anno, la mappa.',
      blocchi: [
        { tipo: 'gioco', id: 'sfida', titolo: 'Sfida a squadre', testo: 'Due metà della classe, otto domande, venti secondi a turno: chi sbaglia lascia la domanda all’altra squadra, che può rubarla.', pulsante: 'Si gioca' },
        { tipo: 'rivela', titolo: 'Al ritorno', iniziali: 1, pulsante: 'Altra domanda', passi: [
          { titolo: 'La più sorprendente', testo: 'Quale risposta non vi aspettavate, e perché?' },
          { titolo: 'Un fatto o un’opinione?', testo: '«Dal 1984 si può scegliere»: come facciamo a esserne sicuri?' }
        ] }
      ] },

    /* 8 · Attività: il patto in due colonne (37–41) */
    { fase: 'Attività', momento: 'Il patto', minuti: 4, titolo: 'Il patto vale solo in *due*',
      lead: 'Un {patto} obbliga entrambe le parti: cinque impegni per chi insegna, cinque per chi studia.',
      blocchi: [
        { tipo: 'confronto', a: 'Si obbliga chi insegna', b: 'Si obbliga chi studia', pulsante: 'Il primo impegno', righe: [
          { criterio: 'Chiarezza', a: 'a dire sempre su quale piano ci si trova: fatto, interpretazione, valore', b: 'a distinguere ciò che sa da ciò che ha sentito dire' },
          { criterio: 'Libertà', a: 'a non chiedere mai a nessuno che cosa crede', b: 'a rispettare chi sceglie di non parlare' },
          { criterio: 'Lavoro', a: 'a valutare il lavoro e mai le convinzioni', b: 'a portare in quest’ora la propria testa, non solo il corpo' },
          { criterio: 'Onestà', a: 'a dire «non lo so» quando non lo sa', b: 'a fare le domande scomode, che sono le più utili' },
          { criterio: 'Rispetto', a: 'a presentare le posizioni diverse dalla propria come le presenterebbe chi le abita', b: 'a dissentire quanto vuole e a non deridere mai' }
        ], domanda: 'Il patto entra in vigore alla fine del primo giorno. Non ha rinnovo tacito: si rinnova ogni settimana, o non si rinnova.' }
      ] },

    /* 9 · Attività: lo strumento dell'anno (41–44) */
    { fase: 'Attività', momento: 'Lo strumento dell’anno', minuti: 3, titolo: 'Fatto, interpretazione, *valore*',
      lead: 'Un {fatto} si verifica; un’{interpretazione} si discute; un {giudizio di valore} si sostiene, ma non si dimostra.',
      blocchi: [
        { tipo: 'smista', titolo: 'Dove la mettete?', categorie: ['Fatto', 'Interpretazione', 'Giudizio di valore'], voci: [
          { t: 'Dal 1984 ciascuno può scegliere se avvalersi dell’ora di religione.', c: 0, why: '**Fatto.** Si verifica su un documento: l’Accordo del 18 febbraio 1984, art. 9.' },
          { t: 'Molti scelgono quest’ora per abitudine.', c: 1, why: '**Interpretazione.** Prova a spiegare un comportamento: si discute, magari con dei dati, ma non sta scritto in un documento.' },
          { t: 'Ogni persona merita rispetto, anche chi la pensa diversamente.', c: 2, why: '**Giudizio di valore.** Dice che cosa è giusto: si sostiene con buone ragioni, non si dimostra come un dato.' },
          { t: 'Nel poema, Gilgamesh parte per la Foresta dei Cedri.', c: 0, why: '**Fatto.** Si controlla sul testo: è ciò che il poema racconta.' },
          { t: 'Gilgamesh cerca la fama perché ha paura di morire.', c: 1, why: '**Interpretazione.** È una lettura del personaggio: il testo la rende plausibile, ma si può discutere.' }
        ], chiusura: 'Quasi tutti i litigi nascono dal confondere questi tre piani. È il primo dei cinque attrezzi dei cinque anni: quest’anno si usa da subito.' }
      ] },

    /* 10 · Chiusura: la scatola delle domande (44–47) */
    { fase: 'Chiusura', momento: 'Un compito, uno solo', minuti: 3, titolo: 'La *scatola* delle domande',
      lead: 'Una domanda vera, scritta a mano, senza firma. La regola: se la risposta si trova cercandola online, non è quella giusta.',
      blocchi: [
        { tipo: 'custom', nome: 'Scatola', props: {} }
      ] },

    /* 11 · Chiusura: prova breve e ritorno alla domanda d'ingresso (47–50) */
    { fase: 'Chiusura', momento: 'Prova', minuti: 3, titolo: 'Fine del *primo* giorno',
      lead: 'Tre cose che quasi nessun adulto sa. Poi la domanda dell’inizio, di nuovo.',
      testo: 'La domanda dell’anno resta aperta: **da dove viene l’idea che ogni persona conta?** Oggi l’abbiamo posta; fino a giugno la percorriamo, una tappa alla volta.',
      blocchi: [
        { tipo: 'quiz', etichetta: 'Prova', domande: [
          { q: 'Un amico dice: «A religione ti chiedono che cosa credi». Che cosa gli rispondete, patto alla mano?',
            opzioni: ['Vero: è lo scopo dell’ora', 'No: chi insegna si impegna a non chiederlo mai', 'Solo a chi è battezzato', 'Solo nella verifica finale'], ok: 1,
            why: 'È il secondo impegno di chi insegna. Chi vuole dire che cosa pensa è libero di farlo; nessuno glielo chiederà.' },
          { q: '«Dal 1984 ciascuno sceglie se avvalersi dell’ora di religione.» Che cos’è questa frase?',
            opzioni: ['Un giudizio di valore', 'Un’interpretazione', 'Un fatto: si verifica su un documento'], ok: 2,
            why: 'Si controlla sull’Accordo del 18 febbraio 1984, art. 9. Un fatto non diventa vero perché piace, né falso perché non piace.' },
          { q: 'Quale di queste domande va nella scatola?',
            opzioni: ['Perché qualcuno crede e qualcun altro no?', 'Che cosa vuol dire «amen»?', 'In che anno è stato rivisto il Concordato?'], ok: 0,
            why: 'Le altre due hanno una risposta che si trova in un minuto. La prima no: è una domanda da affidare alla classe.' }
        ], perfetto: 'Tre su tre: il primo giorno è servito.' },
        { tipo: 'domanda', id: 'uscita', confronta: 'ingresso', etichetta: 'Di nuovo, a fine ora', q: 'Quest’ora, per voi, è soprattutto…',
          opzioni: ['Catechismo a scuola', 'Un’ora di buco', 'Un’ora per farsi domande e conoscere il cristianesimo', 'Non lo so ancora'],
          dibattito: 'Se il voto si è spostato, chiediamo a chi ha cambiato idea che cosa l’ha convinto. Nessun punteggio: le opinioni restano vostre.' }
      ] }
  ],

  studio: {
    sezioni: [
      { titolo: 'La domanda dell’anno',
        testo: 'Il primo giorno comincia dai nomi, uno per uno, e da una domanda che sembra ovvia e non lo è: **da dove viene l’idea che ogni persona conta?**\n\nNel mondo antico contavano i re, gli dèi e le città. Un uomo solo, senza titoli e senza terra, non contava niente, e lo sapeva. Uno dei poemi più antichi che conosciamo, l’*Epopea di Gilgamesh*, nato in Mesopotamia, racconta di un re di Uruk che parte per la Foresta dei Cedri con uno scopo dichiarato: procurarsi un nome che sopravviva a lui. Nel suo mondo è l’unica immortalità disponibile, e per ottenerla si può anche morire. **Ma** quando l’amico Enkidu muore, Gilgamesh scopre di essere mortale davvero e riparte, in cerca della vita senza fine. Non la trova. In una delle versioni del poema una donna incontrata lungo la strada gli dice, in sostanza: la vita eterna non è per te; torna a casa, mangia, fai festa, tieniti stretto chi ti vuole bene, perché questo è ciò che agli uomini è dato. È una risposta onesta, e amara.\n\n**Poi** dalla stessa terra parte un altro uomo, Abramo (Gen 11,31–12,4), e la sua storia va diversamente. Il nome non deve conquistarselo: gli viene promesso. «Farò di te una grande nazione e ti benedirò, renderò grande il tuo nome» (Gen 12,2). Gli viene promesso anche un futuro che lui non vedrà. Da lì comincia un popolo, e da quel popolo un modo nuovo di pensare l’essere umano.\n\nIn mezzo, fra Gilgamesh che rischia la vita per un nome e la lavagna del primo giorno con i vostri nomi scritti sopra senza averli conquistati, ci sono più di tremila anni. Quest’anno li attraversiamo. La risposta non si dà il primo giorno: si cerca, una tappa alla volta.' },
      { titolo: 'Il gioco dei nomi e i talenti',
        testo: 'Il primo giorno ognuno dice il proprio nome e una cosa che gli riesce bene, qualunque: cucinare, ascoltare, un videogioco. Prima di parlare ripete chi c’era prima di lui («Lei è Sara, che sa fare…»). Nessuno può passare, ma «non lo so ancora» è una risposta valida. La lavagna viene fotografata: è la prima mappa dei talenti della classe e la rivedremo a maggio.\n\nLa parola **talento** ha una storia curiosa. In latino *talentum*, in greco *tálanton*, indicava il piatto della bilancia, poi un peso e una grossa somma di denaro. Nella parabola dei talenti (Mt 25,14-30) un uomo affida il suo denaro ai servi «secondo le capacità di ciascuno». **Da quella parabola** la parola è passata a indicare le capacità stesse: un dono ricevuto, da far fruttare. È una piccola traccia che il Vangelo ha lasciato nella lingua di tutti.' },
      { titolo: 'Come funziona quest’ora',
        testo: '**Si può scegliere.** È l’unica materia dell’orario per cui è così. Con il Concordato del 1929 lo Stato considerava l’insegnamento della dottrina cristiana «fondamento e coronamento» dell’istruzione pubblica. Con l’Accordo di revisione del Concordato del 18 febbraio 1984 è garantito «a ciascuno» il diritto di scegliere se avvalersi o non avvalersi di quest’insegnamento (art. 9, n. 2). **E** nella scuola superiore la scelta la esercitano personalmente gli studenti, all’atto dell’iscrizione (legge 281/1986). Per molti è la prima decisione scolastica presa in prima persona.\n\n**Una parola nuova.** Nel 1989 la Corte costituzionale, decidendo proprio sull’ora di religione, ha riconosciuto la **laicità** come «principio supremo» dell’ordinamento: lo Stato non si identifica con una religione e garantisce la libertà di tutti. Chi non si avvale si trova in uno «stato di non-obbligo» (sentenze 203/1989 e 13/1991). La parola *laicità* non è scritta nella Costituzione.\n\n**Non è catechismo.** Le indicazioni per quest’ora sono fissate per decreto e valgono per tutti allo stesso modo, credenti e non (D.P.R. 176/2012). Nessuno vi chiederà che cosa credete.\n\n**Si valuta.** Non con un voto in decimi ma con un giudizio, su una nota a parte. Si valuta ciò che fate (l’attenzione, il ragionamento, i lavori), mai ciò che pensate.\n\n**Non è un’ora di buco.** Leggeremo testi, guarderemo pezzi di film, discuteremo, analizzeremo un caso. E le ultime sei ore dell’anno saranno vostre.\n\n**Una domanda per voi.** All’iscrizione avete scelto di stare in quest’ora. Quanto ha pesato una convinzione, quanto l’abitudine, quanto ciò che facevano gli altri? Nessuno leggerà la risposta.' },
      { titolo: 'Le quattro tappe e il finale',
        testo: '**1 · L’uomo che cerca oltre** (da ottobre). Prima di ogni religione c’è una domanda. Credo, non credo, non so: tre risposte precise alla domanda su Dio. Poi i segni e i simboli, il sacro e il profano. E un re antico, Gilgamesh, che parte per non morire.\n\n**2 · Un popolo che dice no agli dèi** (dicembre). Da Abramo all’Esodo e all’esilio: come un piccolo popolo del Vicino Oriente ha imparato un modo nuovo di stare al mondo. Con *Il principe d’Egitto*.\n\n**3 · Il libro che ha scritto il nostro alfabeto** (febbraio). La Bibbia non è un libro solo: è una biblioteca scritta in molti secoli, con generi diversi. Impariamo a leggerla senza prenderla alla lettera e senza liquidarla come favola, e scopriamo quante parole di ogni giorno vengono da lì: capro espiatorio, giubileo, sabato. Con *Il nipote del mago* di C. S. Lewis.\n\n**4 · Ogni persona conta: ma perché?** (aprile). Un solo Dio, un Dio che parla nella storia, l’essere umano creato «a sua immagine» (Gen 1,27): tre idee lette come pensiero accessibile a chiunque, non come catechismo. Poi torniamo a oggi: i diritti umani, le regole, chi arriva da fuori, il nome contro il numero. Si chiude con l’analisi di un caso. Con *Inside Out*, *L’onda* e *Wonder*.\n\n**Il finale · Talenti** (maggio). Le ultime sei ore dell’anno: in gruppo, ognuno mette davanti alla classe una cosa che sa fare. Si riparte dalla lavagna del primo giorno.\n\nIl laboratorio di quest’ora è intitolato a san Carlo Acutis (1991–2006), un ragazzo cresciuto a Milano che usò la sua passione per l’informatica per raccontare la fede; è stato proclamato santo il 7 settembre 2025.' },
      { titolo: 'Lo strumento dell’anno',
        testo: '*Non vi dirò che cosa pensare: vi darò uno strumento per pensarlo meglio.* Lo strumento di quest’anno è uno solo e si usa da subito: distinguere sempre **un fatto**, che si può verificare su un documento, un testo o un dato; **un’interpretazione**, che spiega un fatto e si può discutere; **un giudizio di valore**, che dice che cosa è giusto o importante e si può sostenere con buone ragioni, ma non dimostrare.\n\n«Dal 1984 ciascuno sceglie se avvalersi dell’ora di religione» è un fatto. «Molti la scelgono per abitudine» è un’interpretazione. «Ogni persona merita rispetto» è un giudizio di valore. Quasi tutti i litigi nascono dal confondere questi tre piani. È il primo di cinque attrezzi: uno nuovo ogni anno, e quelli vecchi restano.' },
      { titolo: 'Il patto',
        testo: '**Si obbliga chi insegna:** a dire sempre su quale piano ci si trova (fatto, interpretazione, valore); a non chiedere mai a nessuno che cosa crede; a valutare il lavoro e mai le convinzioni; a dire «non lo so» quando non lo sa; a presentare le posizioni diverse dalla propria come le presenterebbe chi le abita.\n\n**Si obbliga chi studia:** a portare in quest’ora la propria testa, non solo il corpo; a dissentire quanto vuole e a non deridere mai; a fare le domande scomode, che sono le più utili; a distinguere ciò che sa da ciò che ha sentito dire; a rispettare chi sceglie di non parlare.\n\nUn **patto** (dal latino *pactum*, da *pacisci*, «accordarsi») vale solo se lo tengono tutte e due le parti. Entra in vigore alla fine del primo giorno. Non ha rinnovo tacito: si rinnova ogni settimana, o non si rinnova.' },
      { titolo: 'La scatola delle domande',
        testo: 'La scatola resta in classe tutto l’anno. Ci si mette una domanda vera, scritta a mano, senza firma. La regola per capire se è vera: **se la risposta si trova cercandola online, non è quella giusta.** «Che cosa vuol dire amen?» si risolve in un minuto; «Perché qualcuno crede e qualcun altro no?» no. La apriamo due volte, a novembre e ad aprile, e discutiamo quello che c’è dentro.\n\n*Domanda* viene da *domandare*, dal latino *demandare*, «affidare»: una domanda vera si affida a qualcuno.' },
      { titolo: 'Per lo studio',
        testo: '1. Perché si dice che l’ora di religione è l’unica materia che si può scegliere? Chi sceglie, alle superiori?\n\n2. Spiega con un esempio la differenza fra un fatto, un’interpretazione e un giudizio di valore.\n\n3. Che cosa cercava Gilgamesh, e che cosa riceve invece Abramo (Gen 12,2)?\n\n4. Scegli un impegno del patto per chi insegna e uno per chi studia: perché, secondo te, il patto vale solo in due?\n\n5. Scrivi, senza firmarla, una domanda per la scatola che superi la regola: la risposta non si trova online.' },
      { titolo: 'Che cosa resta del primo giorno',
        testo: 'Quest’ora non serve a niente, se «servire» vuol dire produrre qualcosa di spendibile subito. Serve a non arrivare impreparati alle domande che, prima o poi, arrivano a tutti. Il primo giorno ha messo sulla lavagna i nomi, uno per uno, e ha aperto la domanda dell’anno: da dove viene l’idea che ogni persona conta? Abbiamo visto che quest’ora si sceglie, che non chiede di credere, che si valuta il lavoro e non le convinzioni, che ha un patto in due colonne e uno strumento per pensare meglio. La risposta alla domanda si cerca fino a giugno.' }
    ],
    fonti: [
      'Concordato fra la Santa Sede e l’Italia, 11 febbraio 1929, art. 36.',
      'Accordo di revisione del Concordato lateranense, 18 febbraio 1984, art. 9 n. 2 (ratificato con legge 25 marzo 1985, n. 121).',
      'Legge 18 giugno 1986, n. 281, art. 1 (scelta esercitata personalmente dagli studenti della scuola secondaria superiore).',
      'Corte costituzionale, sentenze n. 203/1989 (laicità «principio supremo»; «stato di non-obbligo») e n. 13/1991.',
      'D.Lgs. 16 aprile 1994, n. 297, art. 309 (speciale nota in luogo dei voti); D.P.R. 22 giugno 2009, n. 122, art. 2.',
      'D.P.R. 20 agosto 2012, n. 176 (Intesa MIUR–CEI: indicazioni didattiche per l’IRC nel secondo ciclo).',
      '*La Bibbia*, traduzione CEI 2008: Gen 1,27; Gen 11,31–12,4; Mt 25,14-30.',
      '*Epopea di Gilgamesh* (versione paleobabilonese e versione classica in dodici tavole), in una traduzione italiana corrente (per esempio a cura di G. Pettinato, Mondadori).',
      '*Vocabolario Treccani*, voci «nome», «domandare», «talento», «concordato», «laico», «patto», «fatto», «interpretazione».',
      'Santa Sede, canonizzazione di Carlo Acutis e Pier Giorgio Frassati, 7 settembre 2025.',
      'Film citati nella mappa: *Il principe d’Egitto* (1998); *Inside Out* (2015); *L’onda* (2008); *Wonder* (2017). Libro: C. S. Lewis, *Il nipote del mago* (1955).',
      'Il patto della classe e la scatola delle domande: Matteo Sestili.'
    ]
  },

  giochi: {
    tema: 'Il nome e la domanda — il primo giorno di IRC',
    sfida: [
      { q: 'Da quale anno ciascuno può scegliere se avvalersi dell’ora di religione?', a: ['1929', '1984', '2012', '1948'], ok: 1 },
      { q: 'Alle superiori, chi sceglie se avvalersi di quest’ora?', a: ['I genitori', 'Il dirigente', 'Il docente', 'Lo studente'], ok: 3 },
      { q: 'Come si valuta quest’ora?', a: ['Con un giudizio, senza voto numerico', 'Con un voto in decimi', 'Non si valuta', 'Con un esame finale'], ok: 0 },
      { q: 'Secondo il patto, che cosa non vi verrà mai chiesto?', a: ['Di fare domande', 'Di dissentire', 'Che cosa credete', 'Di portare la vostra testa'], ok: 2 },
      { q: 'Qual è la domanda dell’anno?', a: ['Che cos’è la Bibbia?', 'Da dove viene l’idea che ogni persona conta?', 'Perché studiare religione?', 'Chi era Gilgamesh?'], ok: 1 },
      { q: 'Che cosa cerca Gilgamesh dopo la morte di Enkidu?', a: ['La vita senza fine', 'Un regno più grande', 'Un nuovo amico', 'Un tesoro nascosto'], ok: 0 },
      { q: 'Quando una domanda è giusta per la scatola?', a: ['Quando è firmata', 'Quando parla di religione', 'Quando la risposta non si trova online', 'Quando è scritta al computer'], ok: 2 },
      { q: 'Quante sono le ore dei Talenti, a fine anno?', a: ['Due', 'Quattro', 'Dieci', 'Sei'], ok: 3 }
    ],
    vf: [
      { s: 'L’ora di religione è obbligatoria per tutti.', v: false, why: 'Dal 1984 ciascuno sceglie se avvalersene; con il Concordato del 1929 era «fondamento e coronamento» dell’istruzione pubblica. — Accordo del 18 febbraio 1984, art. 9 n. 2.' },
      { s: 'Alle superiori la scelta la fa lo studente, non i genitori.', v: true, why: 'Gli studenti della secondaria superiore la esercitano personalmente, all’iscrizione. — Legge 281/1986, art. 1.' },
      { s: 'In quest’ora si prende un voto in decimi.', v: false, why: 'Si valuta con un giudizio, su una nota a parte, senza voto numerico; si valuta il lavoro, mai le convinzioni. — D.Lgs. 297/1994, art. 309.' },
      { s: 'Il programma lo decide il docente insieme alla sua parrocchia.', v: false, why: 'Le indicazioni sono fissate per decreto e valgono in tutta Italia. — D.P.R. 176/2012.' },
      { s: 'Chi non è cattolico non può frequentare quest’ora.', v: false, why: 'Il diritto di scegliere è garantito «a ciascuno»: l’ora si rivolge a chi crede, a chi non crede e a chi non lo sa ancora. — Accordo del 1984, art. 9 n. 2.' },
      { s: 'Chi non si avvale deve per forza seguire un’altra materia.', v: false, why: 'La Corte parla di «stato di non-obbligo»: un’alternativa obbligatoria renderebbe la scelta non libera. — Corte costituzionale, sentenze 203/1989 e 13/1991.' },
      { s: 'In quest’ora vi verrà chiesto in che cosa credete.', v: false, why: 'Mai: è un impegno del patto per chi insegna. Chi vuole dirlo è libero di farlo.' },
      { s: 'La parola «laicità» è scritta nella Costituzione italiana.', v: false, why: 'Non compare nel testo: la Corte costituzionale l’ha riconosciuta come «principio supremo» nella sentenza 203/1989, che riguardava l’ora di religione.' }
    ],
    cat: { bins: ['Fatto', 'Interpretazione', 'Giudizio di valore'], items: [
      ['Il Concordato è stato rivisto nel 1984', 0],
      ['Gilgamesh è re di Uruk, nel poema', 0],
      ['La scatola si apre a novembre e ad aprile', 0],
      ['Molti scelgono quest’ora per abitudine', 1],
      ['Gilgamesh ha paura di morire', 1],
      ['Chi ride degli altri lo fa per insicurezza', 1],
      ['Ogni persona merita rispetto', 2],
      ['Una domanda scomoda vale più di una comoda', 2],
      ['Deridere qualcuno è sbagliato', 2]
    ] },
    quiz: [
      { q: 'Che cosa garantisce l’Accordo del 1984 sull’ora di religione?', a: ['Che sia obbligatoria per i cattolici', 'Il diritto di ciascuno di scegliere se avvalersene', 'Che la decida ogni scuola', 'Che sia valutata in decimi'], ok: 1, why: 'Art. 9 n. 2: è garantito «a ciascuno» il diritto di scegliere se avvalersi o non avvalersi.' },
      { q: '«Laicità» è una parola che…', a: ['si legge nell’articolo 7 della Costituzione', 'viene dal Concordato del 1929', 'la Corte costituzionale ha riconosciuto come principio supremo nel 1989', 'è stata inventata nel 2012'], ok: 2, why: 'Sentenza 203/1989, che riguardava proprio quest’ora.' },
      { q: 'Che cosa riceve Abramo, secondo Gen 12,2?', a: ['La vita senza fine', 'La promessa di un grande nome', 'Un regno in Mesopotamia', 'La Foresta dei Cedri'], ok: 1, why: '«Renderò grande il tuo nome»: il nome non è conquistato, è promesso.' },
      { q: 'Da dove viene il significato di «talento» come capacità?', a: ['Dalla parabola dei talenti del Vangelo', 'Dal nome di un filosofo greco', 'Da un programma televisivo', 'Dal latino «talis», «tale»'], ok: 0, why: 'Il talento era una somma di denaro: la parabola (Mt 25,14-30) lo ha fatto diventare il dono da far fruttare.' },
      { q: 'Quale di queste frasi è un giudizio di valore?', a: ['Il patto ha cinque impegni per parte', 'La scatola si apre a novembre', 'Le domande scomode sono le più utili', 'La lezione dura cinquanta minuti'], ok: 2, why: 'Dice che cosa è importante: si sostiene con ragioni, non si verifica come un dato.' }
    ],
    abbina: [
      ['Tappa 1 · L’uomo che cerca oltre', 'Credo, non credo, non so · Gilgamesh'],
      ['Tappa 2 · Un popolo che dice no agli dèi', 'Abramo, l’Esodo · Il principe d’Egitto'],
      ['Tappa 3 · Il libro che ha scritto il nostro alfabeto', 'La Bibbia · Il nipote del mago'],
      ['Tappa 4 · Ogni persona conta: ma perché?', 'Inside Out · L’onda · Wonder'],
      ['Il finale · Talenti', 'Le ultime sei ore dell’anno']
    ]
  }
};

/* =====================================================================
   Stile dei componenti propri (solo token del Lab IRC Design System).
   Iniettato dal sorgente: l'assemblaggio del sito non passa un --css separato.
   ===================================================================== */
(function () {
  if (typeof document === 'undefined') return; // esporta_testo.js legge il sorgente senza DOM
  var st = document.createElement('style');
  st.textContent = [
    /* CatenaNomi */
    '.cn-rules{list-style:none;margin:0 0 21px;padding:0;display:grid;gap:8px;grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr))}',
    '.cn-rule{display:flex;gap:13px;align-items:flex-start;padding:13px 13px 13px 0;border-top:1.5px solid var(--lab-line)}',
    '.cn-rule b{flex:none;font:600 34px/1 var(--lab-font-display);color:var(--lab-oro);min-width:21px}',
    '.cn-rule strong{display:block;font:600 21px/1.25 var(--lab-font-display);color:var(--lab-ink)}',
    '.cn-rule small{display:block;margin-top:5px;font-size:15px;line-height:1.45;color:var(--lab-ink-soft)}',
    '.cn-board{padding:21px;border-radius:21px;background:var(--lab-surface);border:1px solid var(--lab-line)}',
    '.cn-head{display:flex;flex-wrap:wrap;align-items:baseline;justify-content:space-between;gap:8px 21px;margin:0 0 13px}',
    '.cn-count{font:600 42px/1 var(--lab-font-display);color:var(--la-accent)}',
    '.cn-count small{margin-left:8px;font:600 12px/1 var(--lab-font-inscription);letter-spacing:.14em;text-transform:uppercase;color:var(--lab-muted)}',
    '.cn-cats{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 21px}',
    '.cn-cat{min-height:44px;display:inline-flex;align-items:center;gap:8px;padding:8px 15px;border-radius:999px;border:1.5px solid var(--lab-line);background:var(--lab-surface-2);color:var(--lab-ink);font:600 15px/1.25 var(--lab-font-body);cursor:pointer;transition:transform 233ms var(--lab-ease-out),border-color 144ms,background 233ms}',
    '.cn-cat:hover{border-color:var(--la-accent);transform:translateY(-2px)}',
    '.cn-cat:active{transform:scale(.96)}',
    '.cn-cat:focus-visible{outline:1.5px solid var(--lab-oro);outline-offset:3px}',
    '.cn-cat i{font-style:normal;min-width:24px;height:24px;padding:0 5px;border-radius:999px;display:inline-grid;place-items:center;font:700 13px/1 var(--lab-font-body);background:var(--lab-bg);color:var(--lab-ink-soft)}',
    '.cn-cat.is-flash{border-color:var(--lab-verde);background:color-mix(in srgb,var(--lab-verde) 14%,var(--lab-surface-2))}',
    '.cn-cat--nonso{border-style:dashed}',
    '.cn-map{list-style:none;margin:0 0 13px;padding:0;display:grid;gap:5px}',
    '.cn-bar{display:grid;grid-template-columns:minmax(0,1fr) 34px;align-items:center;gap:8px;font-size:14px;color:var(--lab-ink-soft)}',
    '.cn-bar span{position:relative;display:block;padding:5px 8px;border-radius:8px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}',
    '.cn-bar span::before{content:"";position:absolute;inset:0 auto 0 0;width:var(--w);background:color-mix(in srgb,var(--la-accent) 26%,transparent);border-radius:8px;transition:width 610ms var(--lab-ease-out);z-index:-1}',
    '.cn-bar span{z-index:0}',
    '.cn-bar b{text-align:right;color:var(--lab-ink)}',
    '.cn-empty{margin:0 0 13px;color:var(--lab-muted);font-style:italic}',
    /* MappaAnno */
    '.ma-road{position:relative;display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:5px;margin:0 0 21px;padding:0}',
    '.ma-road::before{content:"";position:absolute;left:10%;right:10%;top:27px;border-top:2px dashed var(--lab-line);z-index:0}',
    '.ma-stop{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;gap:5px;padding:0;border:0;background:none;color:var(--lab-ink);cursor:pointer;font:inherit;min-width:0}',
    '.ma-dot{width:54px;height:54px;border-radius:50%;display:grid;place-items:center;border:1.5px solid var(--lab-line);background:var(--lab-surface-2);font:600 26px/1 var(--lab-font-display);color:var(--lab-oro);transition:transform 233ms var(--lab-ease-out),border-color 144ms,background 233ms}',
    '.ma-stop small{font:600 11px/1.3 var(--lab-font-inscription);letter-spacing:.1em;text-transform:uppercase;color:var(--lab-muted);text-align:center}',
    '.ma-stop:hover .ma-dot{border-color:var(--la-accent);transform:translateY(-3px)}',
    '.ma-stop:active .ma-dot{transform:scale(.94)}',
    '.ma-stop:focus-visible{outline:none}',
    '.ma-stop:focus-visible .ma-dot{outline:1.5px solid var(--lab-oro);outline-offset:3px}',
    '.ma-stop.is-seen .ma-dot{border-color:color-mix(in srgb,var(--la-accent) 55%,var(--lab-line))}',
    '.ma-stop[aria-pressed="true"] .ma-dot{background:var(--la-accent);border-color:var(--la-accent);color:var(--lab-bg)}',
    '.ma-card{padding:21px;border-radius:21px;background:var(--lab-surface);border:1px solid var(--lab-line);animation:maIn 610ms var(--lab-ease-out) both}',
    '.ma-card h3{margin:5px 0 8px;font:600 26px/1.2 var(--lab-font-display);color:var(--lab-ink)}',
    '.ma-card p{margin:0 0 8px;font-size:17px;line-height:1.55;color:var(--lab-ink)}',
    '.ma-con{color:var(--lab-ink-soft)!important;font-size:15px!important}',
    '@keyframes maIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}',
    /* Scatola */
    '.sc{display:grid;gap:21px;grid-template-columns:minmax(0,1fr)}',
    '@media (min-width:720px){.sc{grid-template-columns:1fr 1.618fr;align-items:start}}',
    '.sc-box{display:block;width:100%;max-width:200px;margin:0 auto}',
    '.sc-note{fill:var(--lab-oro);stroke:var(--lab-bg);stroke-width:1;animation:scDrop 610ms var(--lab-ease-out) both}',
    '@keyframes scDrop{from{transform:translateY(-34px);opacity:0}to{transform:none;opacity:1}}',
    '.sc-q{padding:21px;border-radius:21px;background:var(--lab-surface);border:1px solid var(--lab-line)}',
    '.sc-t{margin:5px 0 13px;font:600 22px/1.3 var(--lab-font-display);color:var(--lab-ink)}',
    '.sc-opts{grid-template-columns:1fr 1fr}',
    '@media (max-width:560px){.sc-opts{grid-template-columns:1fr}}',
    '@media (prefers-reduced-motion:reduce){.ma-card,.sc-note{animation:none}.cn-cat,.ma-dot,.cn-bar span::before{transition:none}}',
    /* LIM */
    ':root[data-lim] .cn-rule strong{font-size:25px}:root[data-lim] .cn-cat{font-size:17px}:root[data-lim] .ma-card p{font-size:19px}:root[data-lim] .sc-t{font-size:25px}',
    /* guscio sotto i 720 px: lab-percezione.css dà a body.la 144 px di margine in basso (pensato per pagine che scorrono);
       nel guscio a tutta altezza della lezione spingeva in su la barra delle scene e lasciava una fascia vuota */
    '@media (max-width:720px){body.ll.la,body.ll.g{padding-bottom:0}}',
    /* visore sul telefono: la riga delle schede resta una sola */
    '@media (max-width:440px){:root[data-visore] body.ll .ll-tools{flex-wrap:nowrap;gap:5px}:root[data-visore] body.ll .ll-modes button{padding:8px 9px;font-size:13px;min-height:38px}:root[data-visore] body.ll .ll-tools .ll-chip{padding-left:9px;padding-right:9px;font-size:13px}:root[data-visore] body.ll .ll-tools>.ll-icon{width:36px;height:36px;flex:none}}',
    /* telefono */
    '@media (max-width:440px){.ma-dot{width:44px;height:44px;font-size:21px}.ma-road::before{top:22px}.ma-stop small{font-size:9.5px;letter-spacing:.04em}.cn-board,.ma-card,.sc-q{padding:13px}.cn-count{font-size:34px}}'
  ].join('\n');
  document.head.appendChild(st);
})();

/* =====================================================================
   Componenti della lezione (React con htm). Interazioni con <button> veri;
   stati hover / focus-visible / active nello stile qui sopra o dalle classi del kit.
   Memoria solo in pagina: tornando a una scena, il componente riprende da dove era rimasto. Nulla va nel browser.
   ===================================================================== */
(function () {
  if (typeof React === 'undefined' || typeof html === 'undefined') return;
  var I = LabLezione.inline;
  var useState = React.useState;
  var MEM = {};
  function useMem(key, iniziale) {
    var s = useState(function () { return Object.prototype.hasOwnProperty.call(MEM, key) ? MEM[key] : iniziale; });
    return [s[0], function (v) { MEM[key] = v; s[1](v); }];
  }

  /* ---------- CatenaNomi: le tre regole e la mappa anonima dei talenti ----------
     I nomi stanno sulla lavagna vera (che il docente fotografa); qui il docente tocca soltanto la famiglia di talento
     che ogni studente dichiara. Nessun nome viene scritto. Interazioni: pillole cn-cat (hover bordo anno −2 px, active 0,96,
     focus oro, lampo verde al voto), «Annulla l’ultima» (ll-btn--ghost), «Azzera» a due tocchi (ll-link). */
  var REGOLE = [
    { t: 'Dici il tuo nome.', d: 'Comincia chi sta in cattedra.' },
    { t: 'Dici una cosa che ti riesce bene.', d: 'Qualunque: cucinare, ascoltare, un videogioco. Una cosa piccola va benissimo.' },
    { t: 'Prima, ripeti chi c’era prima di te.', d: '«Lei è Sara, che sa fare… Io sono…» Nessuno passa; «non lo so ancora» è una risposta valida.' }
  ];
  var CAT = [
    'Sport e movimento', 'Musica, arte, scrittura', 'Cucinare, costruire, aggiustare', 'Ascoltare, aiutare, far ridere',
    'Giochi, schermi, tecnologia', 'Natura e animali', 'Non lo so ancora'
  ];

  LabLezione.registra('CatenaNomi', function (p) {
    var c = useMem('cn-conti', CAT.map(function () { return 0; })), conti = c[0], setConti = c[1];
    var h = useMem('cn-storia', []), storia = h[0], setStoria = h[1];
    var fl = useState(null), flash = fl[0], setFlash = fl[1], ar = useState(false), armato = ar[0], setArmato = ar[1];
    var tot = storia.length, max = Math.max.apply(null, conti.concat(1));
    function voto(i) {
      var n = conti.slice(); n[i]++; setConti(n); var s = storia.concat(i); setStoria(s); setFlash(i);
      setTimeout(function () { setFlash(function (x) { return x === i ? null : x; }); }, 987);
      if (s.length === 1) p.ctx.say('Il primo giro è di chi sta in cattedra: una cosa piccola, non un talento.');
      else if (i === CAT.length - 1 && n[i] === 1) p.ctx.say('«Non lo so ancora» vale: a maggio ne riparliamo.');
      else if (s.length % 10 === 0) { p.ctx.cheer(); }
    }
    function annulla() { if (!storia.length) return; var i = storia[storia.length - 1], n = conti.slice(); n[i] = Math.max(0, n[i] - 1); setConti(n); setStoria(storia.slice(0, -1)); }
    function azzera() { if (!armato) { setArmato(true); setTimeout(function () { setArmato(false); }, 3000); return; } setArmato(false); setConti(CAT.map(function () { return 0; })); setStoria([]); }
    var ordine = CAT.map(function (t, i) { return i; }).filter(function (i) { return conti[i] > 0; }).sort(function (a, b) { return conti[b] - conti[a] || a - b; });
    return html`<div className="cn">
      <ol className="cn-rules">${REGOLE.map(function (r, i) { return html`<li key=${i} className="cn-rule"><b aria-hidden="true">${i + 1}</b><div><strong>${r.t}</strong><small>${r.d}</small></div></li>`; })}</ol>
      <div className="cn-board">
        <div className="cn-head">
          <span className="la-meta">La mappa dei talenti della classe</span>
          <span className="cn-count" aria-live="polite">${tot}<small>${tot === 1 ? 'voce' : 'voci'}</small></span>
        </div>
        <p className="ll-hint">A ogni turno il docente tocca la famiglia del talento detto. I nomi restano sulla lavagna vera: la fotografo e la rivediamo a maggio.</p>
        <div className="cn-cats" role="group" aria-label="Famiglie di talenti">
          ${CAT.map(function (t, i) { return html`<button key=${i} type="button" className=${'cn-cat' + (i === CAT.length - 1 ? ' cn-cat--nonso' : '') + (flash === i ? ' is-flash' : '')} onClick=${function () { voto(i); }} aria-label=${t + ': aggiungi una voce (' + conti[i] + ')'}>${t}<i aria-hidden="true">${conti[i]}</i></button>`; })}
        </div>
        ${ordine.length ? html`<ul className="cn-map" aria-label="Mappa dei talenti">${ordine.map(function (i) { return html`<li key=${i} className="cn-bar"><span style=${{ '--w': Math.round(conti[i] / max * 100) + '%' }}>${CAT[i]}</span><b>${conti[i]}</b></li>`; })}</ul>`
          : html`<p className="cn-empty">La mappa si disegna mentre gira la catena.</p>`}
        <div className="ll-row">
          <button type="button" className="ll-btn ll-btn--ghost" disabled=${!tot} onClick=${annulla}>Annulla l’ultima</button>
          ${tot > 0 && html`<button type="button" className="ll-link" onClick=${azzera}>${armato ? 'Sicuro? Tocca ancora' : 'Azzera'}</button>`}
        </div>
      </div>
    </div>`;
  });

  /* ---------- MappaAnno: la strada delle quattro tappe e del finale ----------
     Interazioni: cinque fermate (button, aria-pressed; hover −3 px e bordo anno, active 0,94, focus oro sul cerchio).
     Visitate tutte: festa e battuta della mascotte. */
  var TAPPE = [
    { k: '1', mese: 'Da ottobre', t: 'L’uomo che cerca oltre',
      d: 'Prima di ogni religione c’è una domanda. Credo, non credo, non so: tre risposte precise. Poi segni e simboli, il sacro e il profano. E un re antico, Gilgamesh, che parte per non morire.',
      con: 'Con l’*Epopea di Gilgamesh*.' },
    { k: '2', mese: 'Dicembre', t: 'Un popolo che dice no agli dèi',
      d: 'Da Abramo all’Esodo e all’esilio: come un piccolo popolo del Vicino Oriente ha imparato un modo nuovo di stare al mondo.',
      con: 'Con *Il principe d’Egitto*.' },
    { k: '3', mese: 'Febbraio', t: 'Il libro che ha scritto il nostro alfabeto',
      d: 'Non un libro: una biblioteca scritta in molti secoli. Come si legge senza prenderla alla lettera e senza liquidarla come favola, e quante parole di ogni giorno vengono da lì: capro espiatorio, giubileo, sabato.',
      con: 'Con *Il nipote del mago* di C. S. Lewis.' },
    { k: '4', mese: 'Aprile', t: 'Ogni persona conta: ma perché?',
      d: 'L’essere umano «a immagine di Dio» (Gen 1,27), letto come pensiero accessibile a chiunque. Poi l’oggi: i diritti umani, le regole, chi arriva da fuori, il nome contro il numero. Si chiude con un caso vero.',
      con: 'Con *Inside Out*, *L’onda* e *Wonder*.' },
    { k: '★', mese: 'Maggio', t: 'Talenti: le ultime sei ore sono vostre',
      d: 'In gruppo, ognuno mette davanti alla classe una cosa che sa fare. Si riparte dalla lavagna del primo giorno, con i vostri nomi e la mappa dei talenti.',
      con: '' }
  ];
  LabLezione.registra('MappaAnno', function (p) {
    var s = useMem('ma-a', null), a = s[0], setA = s[1], v = useMem('ma-visti', {}), visti = v[0], setVisti = v[1];
    function tocca(i) {
      setA(i); var nv = Object.assign({}, visti); nv[i] = 1; setVisti(nv);
      if (Object.keys(nv).length === TAPPE.length && Object.keys(visti).length < TAPPE.length) { p.ctx.festa(); p.ctx.say('Quattro tappe e un finale. Si parte a ottobre.'); }
    }
    var u = a === null ? null : TAPPE[a];
    return html`<div className="ma">
      <div className="ma-road" role="group" aria-label="Le tappe dell’anno">
        ${TAPPE.map(function (x, i) { return html`<button key=${i} type="button" className=${'ma-stop' + (visti[i] ? ' is-seen' : '')} aria-pressed=${a === i} onClick=${function () { tocca(i); }} aria-label=${(x.k === '★' ? 'Finale' : 'Tappa ' + x.k) + ': ' + x.t}>
          <span className="ma-dot" aria-hidden="true">${x.k}</span><small>${x.mese}</small></button>`; })}
      </div>
      <div aria-live="polite">${u
        ? html`<div key=${a} className="ma-card"><span className="la-meta">${u.k === '★' ? 'Il finale' : 'Tappa ' + u.k} · ${u.mese}</span><h3>${u.t}</h3><p>${I(u.d, 'd')}</p>${u.con && html`<p className="ma-con">${I(u.con, 'c')}</p>`}</div>`
        : html`<p className="ll-hint">Cinque fermate: quattro tappe e un finale. Toccatele in ordine.</p>`}</div>
      <p className="ll-tally">${Object.keys(visti).length} / ${TAPPE.length} viste</p>
    </div>`;
  });

  /* ---------- Scatola: la regola alla prova e il conteggio dei foglietti ----------
     Quattro domande d'esempio: la classe decide se la risposta «si trova online» (non va nella scatola) o no.
     Interazioni: due la-choice (hover bordo oro, active 0,98, focus oro; esito con parola), «Prossima» (ll-btn),
     «Una domanda nella scatola» (ll-btn) e «Togli l’ultima» (ll-link). Nessuna domanda viene scritta qui. */
  var ESEMPI = [
    { t: 'Che cosa vuol dire «amen»?', online: true, why: 'Si trova in un minuto: è una parola ebraica che esprime assenso e fiducia. Una ricerca basta: non serve la scatola.' },
    { t: 'Perché qualcuno crede e qualcun altro no?', online: false, why: 'Nessuna ricerca risponde al posto vostro: è una domanda da affidare alla classe.' },
    { t: 'Quanti anni aveva Carlo Acutis quando è morto?', online: true, why: 'Quindici: è un dato, si trova subito. Va bene saperlo, ma non è una domanda per la scatola.' },
    { t: 'Se Dio c’è, perché esiste il male?', online: false, why: 'Online trovate opinioni, non la vostra risposta: è una delle domande che si cercano insieme.' }
  ];
  LabLezione.registra('Scatola', function (p) {
    var s = useMem('sc-i', 0), i = s[0], setI = s[1], r = useMem('sc-r', []), ris = r[0], setRis = r[1], n = useMem('sc-n', 0), dentro = n[0], setDentro = n[1];
    var fine = i >= ESEMPI.length, cur = ESEMPI[i], ans = ris[i];
    function scegli(online) { if (ans) return; var c = ris.slice(); c[i] = { online: online, ok: online === cur.online }; setRis(c); if (online === cur.online) p.ctx.cheer(); else p.ctx.oops(); }
    function cls(online) { if (!ans) return 'la-choice'; if (online === cur.online) return 'la-choice is-right'; return 'la-choice ' + (ans.online === online ? 'is-wrong' : 'is-dim'); }
    function metti() { var k = dentro + 1; setDentro(k); if (k === 1) p.ctx.say('La prima domanda dell’anno. La apriamo a novembre.'); }
    var giuste = ris.filter(function (x) { return x && x.ok; }).length;
    return html`<div className="sc">
      <div>
        <svg className="sc-box" viewBox="0 0 200 160" role="img" aria-label=${'La scatola delle domande: ' + dentro + (dentro === 1 ? ' domanda' : ' domande')}>
          <path d="M30 66 L100 46 L170 66 L100 86 Z" fill="var(--lab-surface-2)" stroke="var(--lab-oro)" stroke-width="2" stroke-linejoin="round" />
          <path d="M30 66 L30 132 L100 152 L100 86 Z" fill="var(--lab-surface)" stroke="var(--lab-oro)" stroke-width="2" stroke-linejoin="round" />
          <path d="M170 66 L170 132 L100 152 L100 86 Z" fill="var(--lab-surface)" stroke="var(--lab-oro)" stroke-width="2" stroke-linejoin="round" />
          <path d="M78 64 L122 52" stroke="var(--la-accent)" stroke-width="4" stroke-linecap="round" />
          ${dentro > 0 && html`<path key=${dentro} className="sc-note" d="M94 30 L114 25 L118 42 L98 47 Z" />`}
          <text x="100" y="124" textAnchor="middle" fontSize="28" fontWeight="600" fill="var(--lab-oro)">${dentro}</text>
        </svg>
        <div className="ll-row" style=${{ justifyContent: 'center' }}>
          <button type="button" className="ll-btn" onClick=${metti}>Una domanda nella scatola</button>
          <button type="button" className="ll-link" disabled=${dentro === 0} onClick=${function () { setDentro(Math.max(0, dentro - 1)); }}>Togli l’ultima</button>
        </div>
        <p className="ll-hint" style=${{ textAlign: 'center' }}>Si apre due volte: a novembre e ad aprile.</p>
      </div>
      <div className="sc-q">
        <div className="la-row"><span className="la-meta">La regola alla prova</span><span className="ll-tally">${Math.min(ris.filter(Boolean).length, ESEMPI.length)} / ${ESEMPI.length}</span></div>
        ${!fine ? html`<div key=${i}>
            <p className="sc-t">${I(cur.t, 't' + i)}</p>
            <div className="la-choices sc-opts">
              <button type="button" className=${cls(true)} disabled=${!!ans} onClick=${function () { scegli(true); }}><span className="la-key">A</span>Si trova online</button>
              <button type="button" className=${cls(false)} disabled=${!!ans} onClick=${function () { scegli(false); }}><span className="la-key">B</span>Va nella scatola</button>
            </div>
            <div aria-live="polite">${ans && html`<p className=${'ll-why ' + (ans.ok ? 'is-ok' : 'is-ko')}><strong>${ans.ok ? 'Esatto. ' : 'Non proprio. '}</strong>${I(cur.why, 'w' + i)}</p>`}</div>
            ${ans && html`<div className="ll-row"><button type="button" className="ll-btn" onClick=${function () { var j = i + 1; setI(j); if (j >= ESEMPI.length && giuste === ESEMPI.length) p.ctx.festa(); }}>${i < ESEMPI.length - 1 ? 'Prossima domanda' : 'Ho capito la regola'}</button></div>`}
          </div>`
          : html`<div aria-live="polite"><p className="ll-why is-ok"><strong>${giuste} su ${ESEMPI.length} al primo colpo. </strong>Ora tocca a voi: una domanda vera, scritta a mano, senza firma.</p>
            <div className="ll-row"><button type="button" className="ll-link" onClick=${function () { setI(0); setRis([]); }}>Rifate la prova</button></div></div>`}
      </div>
    </div>`;
  });
})();
