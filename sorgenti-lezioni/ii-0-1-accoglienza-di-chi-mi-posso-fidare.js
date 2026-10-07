/* ---- lezione ---- */
/* Classe II · Accoglienza (UDA 0, lezione 1) — «Di chi mi posso fidare?».
   Artefatto interattivo, 7 ottobre 2026, rifatto con la skill «IRC · Artefatto interattivo della lezione».
   Conserva attività e idee della versione precedente (cartoline dall'estate, vero o inventato, tre voci, gioco dei riscontri,
   correzione, Agostino, etichette, patto di confronto, percorso dell'anno); il ritaglio sulla pietra di Pilato è sostituito
   da un fatto verificabile che non anticipa l'UDA «Gesù quali tracce»: la canonizzazione di Carlo Acutis (7 settembre 2025).
   Esempi inventati e dichiarati tali: il messaggio del compagno e il post con la citazione «di un premio Nobel».
   Agostino, Confessioni VI,5,7: traduzione di lavoro sul latino (CSEL). Etimologie: Vocabolario Treccani.
   Nessun dato degli studenti viene salvato: lo stato dei componenti resta in memoria finché la pagina è aperta.
   © Matteo Sestili — Tutti i diritti riservati */
window.LEZIONE = {
  slug: 'ii-0-1-accoglienza-di-chi-mi-posso-fidare',
  classe: 'Anno II',
  titolo: 'Di chi mi posso *fidare*?',
  sottotitolo: 'Accoglienza della classe seconda: cartoline dall’estate, tre voci, il gioco dei riscontri e il patto di confronto.',
  saluto: 'Ultima tappa: allora, di chi vi fidate?',
  glossario: {
    'fiducia': { parola: 'Fiducia', etim: 'dal latino *fiducia*, derivato di *fidere*, «fidarsi, confidare»', def: 'L’atteggiamento di chi si affida a qualcuno o a qualcosa che non può controllare da solo. È ragionevole quando ha delle ragioni: non è il contrario del pensare.' },
    'riscontro': { parola: 'Riscontro', etim: 'da *riscontrare*, composto di *ri-* e *scontrare*: mettere una cosa di fronte a un’altra per vedere se corrispondono', def: 'Un controllo che anche altri possono ripetere: una fonte consultabile, una ragione, un indirizzo. Like e condivisioni non lo sono.' },
    'opinione': { parola: 'Opinione', etim: 'dal latino *opinio*, legato a *opinari*, «ritenere, pensare»', def: 'Un giudizio personale su un fatto o su una scelta, dato sapendo di poter sbagliare. Non si smentisce con un documento: si discute con ragioni ed esempi.' },
    'citazione': { parola: 'Citazione', etim: 'da *citare*, dal latino *citare*, «chiamare, far venire»', def: 'Parole attribuite a qualcuno: si «chiama» un autore a testimone. Vale quanto il suo indirizzo: chi l’ha detta, dove e quando.' },
    'testimone': { parola: 'Testimone', etim: 'dal latino *testis*, che si spiega come «colui che sta come terzo» (da *tres*, «tre», e *stare*)', def: 'Chi riferisce ciò che ha visto o saputo. Il terzo che non è parte in causa e permette a due di controllare: per questo un riscontro ha bisogno di testimoni.' },
    'canonizzazione': { parola: 'Canonizzazione', etim: 'dal latino tardo *canonizare*, dal greco *kanonízō*, «giudicare secondo la regola, includere in un canone»', def: 'L’atto con cui il papa proclama santo un cristiano già dichiarato beato e ne inserisce il nome nell’elenco dei santi.' },
    'etichetta': { parola: 'Etichetta', etim: 'dal francese *étiquette*, legato all’antico francese *estiquer*, «attaccare»', def: 'Un cartellino attaccato sopra: in senso figurato, una formula che riassume una persona e chiude il discorso. Si attacca in fretta e si stacca con fatica.' },
    'patto': { parola: 'Patto', etim: 'dal latino *pactum*, da *pacisci*, «accordarsi»: la stessa radice di *pax*, «pace»', def: 'Un accordo fra due o più parti, che impegna tutti. Il patto di confronto della classe raccoglie poche regole scelte insieme.' }
  },
  scene: [
    /* 1 · Aggancio — la domanda dell'ora, voto d'ingresso */
    { fase: 'Aggancio', momento: 'Apertura', minuti: 2, titolo: 'Di chi mi posso *fidare*?',
      lead: 'Un racconto, un messaggio, un post: ogni giorno qualcosa ci chiede di essere creduto.',
      blocchi: [
        { tipo: 'domanda', id: 'ingresso', etichetta: 'Anonimo · per alzata di mano',
          q: 'Quando qualcuno vi dice una cosa che non potete vedere, che cosa vi fa fidare?',
          opzioni: ['Chi me la dice', 'Quante persone la ripetono', 'Se posso controllarla', 'Se mi sembra giusta'],
          dibattito: 'Teniamo i voti: a fine ora rifaremo la stessa domanda. Non c’è una risposta giusta, ci sono ragioni.' },
        { tipo: 'agenda', titolo: 'L’ora di oggi' }
      ] },

    /* 2 · Aggancio — cartoline dall'estate */
    { fase: 'Aggancio', momento: 'Cartoline', minuti: 7, titolo: 'Com’è andata *l’estate*?',
      lead: 'Si pesca una cartolina e si risponde in una o due frasi. Chi non vuole raccontare dice «passo», senza spiegare perché.',
      blocchi: [
        { tipo: 'custom', nome: 'Cartoline', props: {} }
      ] },

    /* 3 · Attività — vero o inventato */
    { fase: 'Aggancio', momento: 'Vero o inventato', minuti: 4, titolo: 'Vero o *inventato*?',
      lead: 'Per tre o quattro racconti, chi parla può aggiungere in segreto un solo dettaglio inventato. La classe vota e fa una sola domanda.',
      blocchi: [
        { tipo: 'custom', nome: 'VeroInventato', props: {} }
      ] },

    /* 4 · Scoperta — Agostino: senza fiducia non si vive (anello 1) */
    { fase: 'Scoperta', momento: 'Fonte', minuti: 4, titolo: 'Vi siete appena *fidati*',
      lead: 'Avete creduto a racconti che non potevate controllare. **Non è un’eccezione**: sedici secoli fa Agostino se ne accorse scrivendo la sua vita.',
      blocchi: [
        { tipo: 'leggi', q: 'Quale frase spiega perché non possiamo fare a meno di fidarci?',
          testo: '«[…] consideravo quante cose, innumerevoli, [[credevo senza averle viste::Il punto di partenza: gran parte di ciò che sappiamo **non l’abbiamo visto**. Ma non spiega ancora perché non possiamo farne a meno.]] e senza essere presente quando accadevano: tanti fatti della storia dei popoli, [[tante cose su luoghi e città::Storia e geografia: le conosciamo da **testimoni** e da libri. È un esempio, non la ragione.]] che non avevo visto, tante [[sulla parola di amici, di medici::Le persone: ci affidiamo alla loro **parola** ogni giorno. Ancora un esempio.]], di altre persone ancora; [[!se non le credessimo, in questa vita non faremmo proprio nulla::Ecco il perché: senza {fiducia} **non si vive**, non si impara, non si cura nessuno. La domanda allora non è *se* fidarsi, ma *di chi*.]]. E infine con quale salda fede tenevo per certo [[da quali genitori ero nato::Perfino questo lo sappiamo **credendo** a ciò che ci è stato detto: è l’esempio più vicino, ma la ragione sta nella frase prima.]]: cosa che non avrei potuto sapere, se non credendo a ciò che avevo sentito.»',
          fonte: 'Agostino d’Ippona (354–430), Confessioni VI, 5, 7, scritte fra il 397 e il 400 circa. Traduzione di lavoro dal latino' },
        { tipo: 'mascotte', nascosta: true, pulsante: 'E allora?', t: 'La domanda dell’anno non è *se* fidarsi, ma *di chi*, e per quali ragioni.' }
      ] },

    /* 5 · Scoperta — tre voci: fatto, opinione, citazione (anello 2) */
    { fase: 'Scoperta', momento: 'Tre voci', minuti: 5, titolo: 'Tre *voci* sul tavolo',
      lead: '**Per questo** serve un metodo. Prima di chiedersi se una cosa è vera, capiamo che tipo di affermazione abbiamo davanti.',
      blocchi: [
        { tipo: 'custom', nome: 'TreVoci', props: {} }
      ] },

    /* 6 · Attività — il gioco dei riscontri (anelli 3-4) */
    { fase: 'Scoperta', momento: 'Riscontri', minuti: 5, titolo: 'Ogni voce, *la sua* domanda',
      lead: '**Quindi** ogni voce chiede un {riscontro} diverso. Cinque richieste, una alla volta: la classe vota con la mano, poi si tocca il posto giusto.',
      blocchi: [
        { tipo: 'custom', nome: 'Riscontri', props: {} }
      ] },

    /* 7 · Scoperta — il riscontro vero, testimone (anello 4) */
    { fase: 'Scoperta', momento: 'Correzione', minuti: 4, titolo: 'Ora il riscontro *vero*',
      lead: 'Giriamo le tre voci una alla volta: che cosa resta dopo il controllo?',
      blocchi: [
        { tipo: 'carte', titolo: 'La correzione', carte: [
          { etichetta: 'Il ritaglio · gira', fronte: 'Carlo Acutis e Pier Giorgio Frassati proclamati santi',
            retro: '**Verificato.** Domenica 7 settembre 2025, piazza San Pietro: è la prima {canonizzazione} di Leone XIV. Lo confermano l’omelia sul sito della Santa Sede e i giornali di quel giorno.' },
          { etichetta: 'Il messaggio · gira', fronte: '«Io mi fido solo di ciò che vedo con i miei occhi.»',
            retro: '**Da discutere.** Un’{opinione} non si smentisce con un documento. Avete visto il giorno della vostra nascita? Eppure ve ne fidate, con buone ragioni: è la risposta di Agostino.' },
          { etichetta: 'Il post · gira', fronte: '«Più studio la scienza, più mi convinco che senza la fede non si capisce nulla.»',
            retro: '**Inventata.** Scritta per questa lezione, senza fonte: nessun nome, testata o data. «Un premio Nobel» non è un indirizzo, e dodicimila cuori non lo sostituiscono.' }
        ] },
        { tipo: 'parola', parola: 'Testimone', radice: 'tes', origine: 'Dal latino testis, spiegato come «colui che sta come terzo»',
          significato: 'Da *tres*, «tre», e *stare*: il {testimone} è il terzo che non è parte in causa. Un riscontro funziona perché qualcun altro, oltre a chi parla e a chi ascolta, può controllare.',
          battuta: 'Due non bastano: serve un terzo.' }
      ] },

    /* 8 · Attività — pausa gioco: Sfida a squadre (anelli 1-4) */
    { fase: 'Attività', momento: 'Pausa gioco', minuti: 6, titolo: 'Sfida a *squadre*',
      testo: 'Prima di rispondere chiedetevi: **che tipo di voce è**, e quale domanda le si fa?',
      blocchi: [
        { tipo: 'gioco', id: 'sfida', titolo: 'Sfida a squadre', testo: 'Due squadre, otto domande, a turno: chi sbaglia lascia la domanda all’altra squadra, che può rubarla.', pulsante: 'Si gioca' },
        { tipo: 'rivela', titolo: 'Al ritorno', iniziali: 1, pulsante: 'Altra domanda', passi: [
          { titolo: 'La più discussa', testo: 'Quale domanda ha diviso le squadre, e con quali ragioni?' },
          { titolo: 'Il falso riscontro', testo: 'Perché like e amici sinceri non bastano per fidarsi?' }
        ] }
      ] },

    /* 9 · Attività — etichette e domande (anello 5) */
    { fase: 'Attività', momento: 'Idee e persone', minuti: 3, titolo: 'Staccare le *etichette*',
      lead: '**Eppure** il metodo non basta se trattiamo male le persone. Un’{etichetta} chiude il discorso su chi parla; una domanda lo riapre sull’idea.',
      blocchi: [
        { tipo: 'custom', nome: 'Etichette', props: {} }
      ] },

    /* 10 · Attività — la regola e il patto di confronto (anello 5) */
    { fase: 'Attività', momento: 'Patto', minuti: 4, titolo: 'Il nostro *patto*',
      lead: 'Una regola a testa, poi da tre a cinque regole scelte insieme: ragioni, ascolto, responsabilità.',
      blocchi: [
        { tipo: 'custom', nome: 'Patto', props: {} }
      ] },

    /* 11 · Chiusura — l'anno e i tre piani (anello 6, concetto più difficile) */
    { fase: 'Chiusura', momento: 'L’anno', minuti: 3, titolo: 'Ventotto incontri, *tre* piani',
      lead: 'Ogni tappa dell’anno riprende la domanda di oggi. E ogni volta terremo distinti tre piani: proviamoli sul ritaglio.',
      blocchi: [
        { tipo: 'custom', nome: 'Programma', props: {} },
        { tipo: 'strati', titolo: 'Una notizia, tre piani', pulsante: 'Entra nel primo piano',
          livelli: [
            { t: 'Le fonti', d: '**Che cosa attestano le fonti.** Il 7 settembre 2025 Leone XIV ha proclamato santo Carlo Acutis: lo attestano il sito della Santa Sede e le cronache. È **conoscenza storica**: si controlla.' },
            { t: 'Interpretare', d: '**Come lo interpretiamo.** Perché la Chiesa propone come esempio un ragazzo morto a quindici anni? Il Catechismo spiega che i santi sono proposti come modelli e intercessori (CCC 828). Qui si ragiona e si discute: è **interpretazione**.' },
            { t: 'Fede', d: '**Se e come ci crediamo.** Per la fede cattolica un santo vive in Dio e prega per chi lo invoca. Non si dimostra con un documento e non si impone: è **adesione di fede**, libera.' }
          ],
          fine: 'Il voto riguarda come usate fonti e ragioni. La fede di ciascuno, o la sua assenza, non è mai oggetto di voto.' }
      ] },

    /* 12 · Chiusura — prova breve e ritorno alla domanda */
    { fase: 'Chiusura', momento: 'Prova', minuti: 3, titolo: 'Di chi *mi fido*, allora?',
      lead: 'Tre casi nuovi, poi la stessa domanda dell’inizio.',
      blocchi: [
        { tipo: 'quiz', etichetta: 'Prova breve', perfetto: 'Tre su tre: ogni voce con la sua domanda, ogni piano al suo posto.',
          domande: [
            { q: 'Un post: «Lo ha detto Einstein», con cinquantamila condivisioni. Qual è la prima domanda?',
              opzioni: ['Quante condivisioni ha?', 'Chi l’ha detto, dove e quando?', 'Mi dà ragione?', 'Chi me l’ha girato?'], ok: 1,
              why: 'È una **citazione**: vale quanto il suo indirizzo. Le condivisioni dicono quanto circola, non se Einstein l’ha detto.' },
            { q: 'Un compagno: «La musica di oggi è peggiore di quella di una volta». Che cosa gli chiedete?',
              opzioni: ['Dove posso controllarlo?', 'Chi l’ha detto per primo?', 'Quanti sono d’accordo?', 'Con quali ragioni lo sostieni?'], ok: 3,
              why: 'È un’**opinione**: non c’è un archivio da consultare. Si discutono le ragioni, senza dare del nostalgico a nessuno.' },
            { q: '«Il 7 settembre 2025 Carlo Acutis è stato proclamato santo» e «Carlo Acutis prega per noi». Che differenza c’è?',
              opzioni: ['La prima si controlla con le fonti; la seconda è un’affermazione di fede', 'Nessuna: sono due fatti', 'La prima è un’opinione, la seconda un fatto', 'Sono due citazioni senza indirizzo'], ok: 0,
              why: 'Stanno su **piani diversi**: la canonizzazione è un fatto attestato; che un santo interceda è ciò che la fede cattolica crede. Si capisce la differenza senza dover aderire.' }
          ] },
        { tipo: 'domanda', id: 'uscita', confronta: 'ingresso', etichetta: 'Di nuovo, a fine ora',
          q: 'Quando qualcuno vi dice una cosa che non potete vedere, che cosa vi fa fidare?',
          opzioni: ['Chi me la dice', 'Quante persone la ripetono', 'Se posso controllarla', 'Se mi sembra giusta'],
          dibattito: 'Il tratteggio d’oro è il voto d’inizio. Se qualcosa si è spostato, chiediamo a chi ha cambiato idea che cosa l’ha convinto. Prima di uscire: sul quaderno, la vostra regola del patto.' }
      ] }
  ],

  studio: {
    sezioni: [
      { titolo: 'La domanda',
        testo: 'Un racconto dell’estate, il messaggio di un compagno, un post che gira: ogni giorno qualcosa ci chiede di essere creduto. Di chi mi posso fidare? L’ora di accoglienza della classe seconda prova a rispondere con un metodo che servirà per tutto l’anno: capire che tipo di affermazione abbiamo davanti, chiederle il riscontro giusto e discutere le idee senza etichettare le persone.' },
      { titolo: 'Vi siete appena fidati',
        testo: 'L’ora comincia con le **cartoline dall’estate**: ciascuno pesca una domanda leggera (un luogo, un sapore, un incontro, un imprevisto) e risponde in una o due frasi; chi non vuole raccontare dice «passo», senza spiegare perché. Poi, per qualche racconto, chi parla può aggiungere in segreto un solo dettaglio inventato: la classe vota «mi fido» o «non mi fido», fa una sola domanda di riscontro e solo dopo chi ha raccontato svela. Ne esce una scoperta semplice: un racconto credibile non è ancora un racconto verificato, e il sospetto non è una prova.\n\nCi siamo appena fidati di racconti che non potevamo controllare. **Non è un’eccezione.** La **fiducia** (dal latino *fiducia*, derivato di *fidere*, «fidarsi») attraversa tutta la vita. Agostino d’Ippona (354–430) se ne accorse scrivendo le *Confessioni*, fra il 397 e il 400 circa: «consideravo quante cose, innumerevoli, credevo senza averle viste e senza essere presente quando accadevano: tanti fatti della storia dei popoli, tante cose su luoghi e città che non avevo visto, tante sulla parola di amici, di medici, di altre persone ancora; se non le credessimo, in questa vita non faremmo proprio nulla» (*Confessioni* VI, 5, 7, traduzione di lavoro). Persino da quali genitori siamo nati lo sappiamo credendo a ciò che ci è stato detto.\n\n**Per questo** la domanda dell’anno non è *se* fidarsi, ma *di chi*, e per quali ragioni.' },
      { titolo: 'Tre voci, tre domande',
        testo: 'Prima di chiederci se una cosa è vera, conviene capire che tipo di affermazione abbiamo davanti. Sul tavolo ci sono tre voci.\n\nIl **ritaglio** di giornale riferisce un evento con data, luogo e persone: domenica 7 settembre 2025, in piazza San Pietro, papa Leone XIV ha proclamato santi Pier Giorgio Frassati, morto a ventiquattro anni nel 1925, e Carlo Acutis, morto a quindici anni nel 2006. È un **fatto verificabile**. La sua domanda è: «Dove posso controllarlo anch’io?».\n\nIl **messaggio** di un compagno («Io mi fido solo di ciò che vedo con i miei occhi. Il resto sono chiacchiere») è un’**opinione**: dal latino *opinio*, legato a *opinari*, «ritenere», è un giudizio personale dato sapendo di poter sbagliare. Non si smentisce con un documento: si discute. La sua domanda è: «Con quali ragioni?».\n\nIl **post** («Più studio la scienza, più mi convinco che senza la fede non si capisce nulla», attribuito a «un premio Nobel per la fisica, in un’intervista del 2019», con dodicimila cuori) è una **citazione**: mette parole in bocca a qualcuno. *Citare* viene dal latino *citare*, «chiamare»: si chiama un autore a testimone. La prima domanda è: «Chi l’ha detto, dove e quando?».' },
      { titolo: 'I falsi riscontri',
        testo: '**Quindi** ogni voce chiede un **riscontro** diverso. *Riscontrare* significa mettere una cosa di fronte a un’altra per vedere se corrispondono: un riscontro è un controllo che anche altri possono ripetere. Per un fatto è una fonte consultabile; per un’opinione sono le ragioni; per una citazione è il suo indirizzo, cioè nome, opera o testata, data.\n\nCi sono poi richieste che sembrano controlli e non lo sono. «Quanti like ha?» misura quanto una frase è piaciuta e quanto circola, non da dove viene né se è vera. «Me l’ha girato un amico» dice che ci fidiamo della persona: un amico può essere sincero e sbagliarsi lo stesso. Sono **falsi riscontri**.' },
      { titolo: 'Il riscontro vero',
        testo: 'Il ritaglio è **verificato**: la celebrazione del 7 settembre 2025 è stata la prima canonizzazione di papa Leone XIV; l’omelia è pubblicata sul sito della Santa Sede e la cronaca è nei giornali di quel giorno. Più testimoni indipendenti dicono la stessa cosa. *Testimone* viene dal latino *testis*, che si spiega come «colui che sta come terzo»: il terzo che non è parte in causa e permette di controllare. Per questo un riscontro ha bisogno di testimoni.\n\nIl messaggio è **da discutere**. Avete visto con i vostri occhi il giorno della vostra nascita, il centro della Terra, un atomo? Eppure ve ne fidate, perché avete buone ragioni per credere a certi testimoni. È la risposta di Agostino.\n\nIl post è **inventato**: la frase è stata scritta per questa lezione e non ha alcuna fonte. Nessun nome, nessuna testata, nessuna data: «un premio Nobel» non è un indirizzo, e dodicimila cuori non lo sostituiscono. Vale anche quando una frase ci dà ragione: prima si controlla, poi si condivide. Al contrario, la frase di Agostino ha un indirizzo preciso (chi, *Confessioni* VI, 5, 7, fra il 397 e il 400): chiunque può andare a controllarla.' },
      { titolo: 'Idee e persone',
        testo: '**Eppure** il metodo non basta se trattiamo male le persone. Un’**etichetta** (dal francese *étiquette*, legato a *estiquer*, «attaccare») è un cartellino incollato sopra qualcuno: «Sei il solito credulone», «Voi scettici non credete a niente», «Chi crede ha smesso di ragionare», «Chi non crede non ha valori». Chiude il discorso sulla persona. Una domanda lo riapre sull’idea: «Da dove viene questa informazione? Controlliamola insieme», «Che cosa ti renderebbe convincente questa fonte?», «Perché pensi che credere e ragionare siano in contrasto?», «Quali valori guidano le tue scelte?». Attenzione alle domande che sono etichette travestite, come «Ma come fai a cascarci sempre?»: parlano ancora della persona.\n\nCredere a qualcuno, e discutere con lui, richiede **ragioni** (chiedo e offro motivi, non slogan), **ascolto** (prima di rispondere, capisco che cosa ha detto l’altro) e **responsabilità** (controllo prima di condividere, anche quando una frase mi dà ragione). Il **patto** di confronto della classe (dal latino *pactum*, da *pacisci*, «accordarsi», la stessa radice di *pax*, «pace») raccoglie da tre a cinque regole scelte insieme, per esempio: discutiamo le idee, non le persone; prima di condividere, controllo la fonte; ascolto fino in fondo prima di rispondere; posso cambiare idea senza perdere la faccia.' },
      { titolo: 'L’anno e i tre piani',
        testo: 'L’anno conta ventotto incontri: dopo questo, le tracce di Gesù nella storia; i quattro Vangeli e la Pasqua; il tempo in cui credere costava; una verifica rovesciata; le prime comunità che sanno riparare; concili e immagini; e alla fine sei ore di talenti in gruppo. Ogni tappa riprende la domanda di oggi da un’altra parte.\n\nOgni volta terremo distinti **tre piani**. Il primo è **che cosa attestano le fonti**: che il 7 settembre 2025 Leone XIV abbia proclamato santo Carlo Acutis, il ragazzo a cui è dedicato il nostro laboratorio, è conoscenza storica e si controlla. Il secondo è **come le interpretiamo**: perché la Chiesa propone come esempio un ragazzo morto a quindici anni? Il Catechismo spiega che i santi sono proposti ai fedeli come modelli e intercessori (CCC 828); su questo si ragiona e si discute. Il terzo è **se e come ci crediamo**: per la fede cattolica un santo vive in Dio e prega per chi lo invoca. Non si dimostra con un documento e non si impone: è adesione di fede, libera.\n\nIl voto riguarda come usate fonti e ragioni. La fede di ciascuno, o la sua assenza, non è mai oggetto di voto.' },
      { titolo: 'Per lo studio',
        testo: '1. Perché, secondo Agostino, non possiamo fare a meno di fidarci? Fai un esempio tuo.\n\n2. Quale domanda si fa a un fatto, quale a un’opinione, quale a una citazione? Perché «quanti like ha?» non è un riscontro?\n\n3. Trasforma l’etichetta «Sei il solito credulone» in una domanda sull’idea.\n\n4. Distingui i tre piani nella frase: «Il 7 settembre 2025 Carlo Acutis è stato proclamato santo e oggi prega per noi».' },
      { titolo: 'La risposta',
        testo: 'Non possiamo vivere senza fidarci: la domanda è di chi, e per quali ragioni. Mi posso fidare di chi offre un riscontro adatto a ciò che afferma: una fonte che altri possono controllare per un fatto, buone ragioni per un’opinione, un indirizzo preciso per una citazione. Like e amicizie non bastano. E quando non siamo d’accordo, discutiamo le idee senza etichettare le persone.' }
    ],
    fonti: [
      'Agostino d’Ippona, *Confessioni* VI, 5, 7 (testo latino dell’edizione CSEL, consultato su Bibliothek der Kirchenväter, bkv.unifr.ch, il 7 ottobre 2026). Traduzione di lavoro.',
      'Leone XIV, omelia della Santa Messa con il rito di canonizzazione dei beati Pier Giorgio Frassati e Carlo Acutis, piazza San Pietro, 7 settembre 2025: vatican.va/content/leo-xiv/it/homilies/2025/documents/20250907-omelia-frassati-acutis.html (indirizzo individuato il 7 ottobre 2026). Cronache: Avvenire, «Carlo Acutis e Pier Giorgio Frassati saranno santi insieme il 7 settembre»; AGI, 13 giugno 2025.',
      '*Catechismo della Chiesa Cattolica*, n. 828 (vatican.va).',
      '*Vocabolario Treccani*, voci «fiducia», «riscontrare», «opinione», «citare», «testimone», «canonizzare», «etichetta», «patto» (consultate il 7 ottobre 2026).',
      'Il messaggio del compagno e il post con la citazione «di un premio Nobel» sono esempi inventati per la lezione; la citazione del post è inventata e la correzione lo dichiara.'
    ]
  },

  giochi: {
    tema: 'Di chi mi posso fidare? Fatti, opinioni, citazioni e falsi riscontri',
    sfida: [
      { q: '«Dove posso controllarlo anch’io?» è la domanda giusta per…', a: ['un fatto', 'un’opinione', 'una citazione', 'nessuna: è un falso riscontro'], ok: 0 },
      { q: '«Con quali ragioni lo sostieni?» va chiesto a…', a: ['un fatto', 'un’opinione', 'una citazione', 'un post con molti like'], ok: 1 },
      { q: 'Davanti a una citazione, la prima domanda è…', a: ['Quanti like ha?', 'Mi dà ragione?', 'Chi l’ha detta, dove e quando?', 'È famosa?'], ok: 2 },
      { q: 'Dodicimila cuori sotto un post sono…', a: ['una fonte', 'una prova', 'un’opinione', 'un falso riscontro'], ok: 3 },
      { q: 'Il ritaglio sulla canonizzazione di Carlo Acutis è…', a: ['un fatto verificabile', 'un’opinione', 'una citazione inventata', 'un falso riscontro'], ok: 0 },
      { q: 'Secondo Agostino, se non credessimo a ciò che non vediamo…', a: ['saremmo più liberi', 'in questa vita non faremmo proprio nulla', 'sapremmo tutto da soli', 'non sbaglieremmo mai'], ok: 1 },
      { q: 'La citazione «di un premio Nobel» del post è…', a: ['verificata', 'di Agostino', 'inventata per la lezione', 'di un giornale del 2019'], ok: 2 },
      { q: '«Testimone» viene dal latino testis, spiegato come…', a: ['colui che sta come terzo', 'colui che scrive un testo', 'colui che giura', 'colui che ha visto tutto'], ok: 0 }
    ],
    cat: { bins: ['Un fatto', 'Un’opinione', 'Una citazione', 'Falso riscontro'], items: [
      ['Il 7 settembre 2025 Leone XIV proclama santi Frassati e Acutis', 0],
      ['«Dove posso controllarlo anch’io?»', 0],
      ['«Io mi fido solo di ciò che vedo con i miei occhi»', 1],
      ['«Con quali ragioni lo sostieni?»', 1],
      ['«Più studio la scienza…», attribuita a «un premio Nobel»', 2],
      ['«Chi l’ha detto, dove e quando?»', 2],
      ['«Quanti like ha?»', 3],
      ['«Me l’ha girato un amico: basta?»', 3]
    ] },
    vf: [
      { s: 'Carlo Acutis è stato proclamato santo il 7 settembre 2025 in piazza San Pietro.', v: true, why: 'Insieme a Pier Giorgio Frassati, da papa Leone XIV: lo attestano il sito della Santa Sede e le cronache.' },
      { s: 'La frase del post attribuita a «un premio Nobel» ha una fonte controllabile.', v: false, why: 'È stata inventata per la lezione: nessun nome, nessuna testata, nessuna data.' },
      { s: 'Dodicimila cuori dicono se una frase è vera.', v: false, why: 'I like dicono quanto una frase circola, non da dove viene né se è vera.' },
      { s: 'Agostino scrisse le Confessioni fra il 397 e il 400 circa.', v: true, why: 'Il brano letto in classe è nel libro VI, capitolo 5, paragrafo 7.' },
      { s: 'Un’opinione si smentisce con un documento.', v: false, why: 'Un’opinione si discute con ragioni ed esempi; il documento serve per un fatto.' },
      { s: '«Ma come fai a cascarci sempre?» è una domanda sull’idea.', v: false, why: 'Parla ancora della persona: è un’etichetta travestita da domanda.' },
      { s: 'Il voto in Religione riguarda la fede di ciascuno.', v: false, why: 'Riguarda come si usano fonti e ragioni: la fede, o la sua assenza, non è mai oggetto di voto.' }
    ],
    quiz: [
      { q: 'Che cosa diventa l’etichetta «Sei il solito credulone»?', a: ['«Ma come fai a cascarci sempre?»', '«Da dove viene questa informazione? Controlliamola insieme.»', '«Voi credenti siete fatti così.»', '«Quanti like aveva?»'], ok: 1, why: 'Un’etichetta chiude il discorso sulla persona; una domanda lo riapre sull’idea.' },
      { q: 'Un amico sincero ti gira una notizia. Basta per fidarsi?', a: ['Sì, se è un amico', 'Sì, se ha molti like', 'No: gli amici inventano sempre', 'No: può essere in buona fede e sbagliarsi lo stesso'], ok: 3, why: 'La fiducia nella persona non sostituisce il controllo.' },
      { q: 'Perché la frase di Agostino ha «un indirizzo»?', a: ['Perché è famosa', 'Perché sappiamo chi la scrive, in quale opera e quando', 'Perché è in latino', 'Perché è antica'], ok: 1, why: 'Chi, dove, quando: con queste tre cose chiunque può andare a controllarla.' },
      { q: '«Canonizzazione» viene dal greco kanonízō, che significa…', a: ['giudicare secondo la regola, includere in un elenco', 'cantare in coro', 'sparare a salve', 'scrivere una lettera'], ok: 0, why: 'Il *kanṓn* è la regola, e poi l’elenco: il santo è iscritto nell’elenco dei santi.' },
      { q: 'Su quale piano sta «un santo prega per chi lo invoca»?', a: ['Che cosa attestano le fonti', 'Come le interpretiamo', 'Se e come ci crediamo', 'Su nessun piano'], ok: 2, why: 'È ciò che la fede cattolica crede: si capisce e si rispetta, non si dimostra con un documento.' }
    ],
    abbina: [
      ['Un fatto', '«Dove posso controllarlo?»'],
      ['Un’opinione', '«Con quali ragioni?»'],
      ['Una citazione', '«Chi, dove, quando?»'],
      ['Un falso riscontro', '«Quanti like? Chi me l’ha girato?»'],
      ['Testimone', 'colui che sta come terzo']
    ]
  }
};

/* =====================================================================
   Componenti della lezione (React con htm). Interazioni con <button> veri;
   hover / focus-visible / active nello stile qui sotto o dalle classi del kit.
   ===================================================================== */
(function () {
  var I = LabLezione.inline;
  var useState = React.useState;
  /* Memoria in pagina: tornando a una scena (anche dalla pausa gioco) il componente riprende da dove era. Nulla va nel browser. */
  var MEM = {};
  function useMem(key, iniziale) {
    var s = useState(function () { return Object.prototype.hasOwnProperty.call(MEM, key) ? MEM[key] : (typeof iniziale === 'function' ? iniziale() : iniziale); });
    return [s[0], function (v) { MEM[key] = v; s[1](v); }];
  }
  function mescola(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function norm(s) { return String(s || '').toLowerCase().replace(/[\s.!?;:,]+$/g, '').trim(); }

  /* ---------- Stile dei componenti: solo token del design system ---------- */
  (function () {
    if (typeof document === 'undefined' || document.getElementById('a2-css')) return;
    var s = document.createElement('style'); s.id = 'a2-css';
    s.textContent = [
      /* comuni */
      '.lp-seg{text-align:left}',
      '.a2-chips{display:flex;flex-wrap:wrap;gap:8px}',
      '.a2-chip{display:inline-flex;align-items:center;gap:6px;min-height:44px;padding:8px 15px;border-radius:999px;border:1.5px solid var(--lab-line);background:var(--lab-surface-2);color:var(--lab-ink);font:600 15px/1.25 var(--lab-font-body);text-align:left;cursor:pointer;transition:border-color 144ms,background 144ms,transform 144ms}',
      '.a2-chip:hover{border-color:var(--la-accent);transform:translateY(-2px)}.a2-chip:active{transform:scale(.96)}',
      '.a2-chip[aria-pressed="true"]{background:var(--la-accent);border-color:transparent;color:var(--lab-bg)}',
      '.a2-chip.is-ok[aria-pressed="true"]{background:color-mix(in srgb,var(--lab-verde) 18%,var(--lab-surface-2));border-color:var(--lab-verde);color:var(--lab-ink)}',
      '.a2-chip.is-part[aria-pressed="true"]{background:color-mix(in srgb,var(--lab-oro) 20%,var(--lab-surface-2));border-color:var(--lab-oro);border-style:dashed;color:var(--lab-ink)}',
      '.a2-chip.is-ko[aria-pressed="true"]{background:color-mix(in srgb,var(--lab-rosso) 14%,var(--lab-surface-2));border-color:var(--lab-rosso);color:var(--lab-ink)}',
      '.ll-why.is-part{background:color-mix(in srgb,var(--lab-oro) 16%,transparent);color:var(--lab-ink)}',
      '.a2-chip:focus-visible,.a2-pm:focus-visible,.a2-switch:focus-visible,.a2-vote:focus-visible,.a2-t:focus-visible,.a2-blocco:focus-visible,.a2-sticker:focus-visible,.a2-in:focus-visible{outline:2px solid var(--lab-oro);outline-offset:3px}',
      /* cartoline */
      '.a2-cart{display:grid;gap:21px}@media(min-width:900px){.a2-cart{grid-template-columns:1.618fr 1fr;align-items:start}}',
      '.a2-pc{position:relative;overflow:hidden;min-height:220px;padding:21px 21px 26px;border-radius:13px;background:var(--lab-surface);border:1px solid var(--lab-line);box-shadow:var(--lab-shadow);display:grid;grid-template-columns:1fr auto;gap:8px 21px;align-content:start}',
      '.a2-pc::before{content:"";position:absolute;inset:8px;border:1px dashed color-mix(in srgb,var(--lab-oro) 45%,transparent);border-radius:8px;pointer-events:none}',
      '.a2-pc.is-new{animation:a2-gira 610ms cubic-bezier(.16,1,.3,1)}',
      '@keyframes a2-gira{from{transform:perspective(900px) rotateY(-70deg);opacity:.2}to{transform:none;opacity:1}}',
      '.a2-pc-k{grid-column:1;font:600 13px/1.2 var(--lab-font-inscription);letter-spacing:.16em;text-transform:uppercase;color:var(--lab-oro)}',
      '.a2-pc-q{grid-column:1/-1;margin:0;font:italic 500 clamp(22px,2.6vw,32px)/1.25 var(--lab-font-display);color:var(--lab-ink);text-wrap:balance}',
      '.a2-stamp{grid-column:2;grid-row:1;width:55px;height:55px;border-radius:5px;border:2px dotted var(--la-accent);display:grid;place-items:center;color:var(--la-accent)}',
      '.a2-stamp svg{width:34px;height:34px}',
      '.a2-pc-f{grid-column:1/-1;display:flex;justify-content:space-between;align-items:baseline;gap:13px;margin-top:5px}.a2-pc-f .ll-hint{margin:0}',
      '.a2-sec{font:600 15px/1 var(--lab-font-inscription);color:var(--lab-oro);font-variant-numeric:tabular-nums}.a2-sec.is-over{color:var(--lab-rosso)}',
      '.a2-bar{position:absolute;left:0;right:0;bottom:0;height:5px;background:var(--lab-line)}.a2-bar i{display:block;height:100%;background:var(--lab-oro);transition:width 200ms linear}',
      '.a2-tools{display:grid;gap:13px}',
      '.a2-tool{padding:13px 21px;border:1px solid var(--lab-line);border-radius:21px;background:var(--lab-surface-2)}.a2-tool .ll-hint{margin:8px 0 0}',
      '.a2-draw{display:flex;align-items:center;gap:13px;flex-wrap:wrap;margin:8px 0}',
      '.a2-num{min-width:2.2ch;text-align:center;font:600 clamp(34px,4vw,48px)/1 var(--lab-font-display);color:var(--la-accent);font-variant-numeric:tabular-nums}',
      '.a2-step{display:flex;align-items:center;gap:8px;flex-wrap:wrap}.a2-step .ll-hint{margin:0}.a2-step b{min-width:2.2ch;text-align:center}',
      '.a2-pm{width:40px;height:40px;border-radius:50%;border:1.5px solid var(--lab-line);background:var(--lab-surface);color:var(--lab-ink);font:700 18px/1 var(--lab-font-body);cursor:pointer;transition:border-color 144ms,transform 144ms}',
      '.a2-pm:hover{border-color:var(--la-accent)}.a2-pm:active{transform:scale(.92)}',
      '.a2-switch{display:inline-flex;align-items:center;gap:13px;min-height:44px;padding:0;border:0;background:none;color:var(--lab-ink);font:700 15px/1.2 var(--lab-font-body);cursor:pointer;text-align:left}',
      '.a2-switch:active .a2-track{transform:scale(.94)}',
      '.a2-track{position:relative;width:48px;height:28px;flex:none;border-radius:999px;background:var(--lab-surface);border:1.5px solid var(--lab-line);transition:background 233ms,border-color 233ms,transform 144ms}',
      '.a2-track::after{content:"";position:absolute;top:3px;left:3px;width:19px;height:19px;border-radius:50%;background:var(--lab-muted);transition:transform 233ms cubic-bezier(.16,1,.3,1),background 233ms}',
      '.a2-switch:hover .a2-track{border-color:var(--la-accent)}',
      '.a2-switch[aria-checked="true"] .a2-track{background:var(--la-accent);border-color:transparent}.a2-switch[aria-checked="true"] .a2-track::after{transform:translateX(20px);background:var(--lab-surface)}',
      /* vero o inventato */
      '.a2-vi{display:grid;gap:21px}@media(min-width:900px){.a2-vi{grid-template-columns:1.618fr 1fr;align-items:start}}',
      '.a2-passo{display:flex;align-items:baseline;gap:8px;margin:0 0 8px;font:700 15px/1.3 var(--lab-font-body)}.a2-passo span{font:600 13px/1 var(--lab-font-inscription);color:var(--lab-oro);letter-spacing:.12em}',
      '.a2-votes{display:grid;grid-template-columns:1fr 1fr;gap:13px;margin:0 0 21px}',
      '.a2-vote{display:grid;gap:8px;min-height:89px;padding:13px 21px;border-radius:21px;border:1.5px solid var(--lab-line);background:var(--lab-surface-2);color:var(--lab-ink);font:600 clamp(18px,2vw,22px)/1.2 var(--lab-font-display);text-align:left;cursor:pointer;transition:border-color 144ms,transform 144ms}',
      '.a2-vote:hover{border-color:var(--la-accent);transform:translateY(-3px)}.a2-vote:active{transform:scale(.97)}',
      '.a2-vote b{font:600 clamp(28px,3vw,40px)/1 var(--lab-font-display);font-variant-numeric:tabular-nums}',
      '.a2-vote i{display:block;height:6px;border-radius:6px;background:var(--lab-line);overflow:hidden}.a2-vote i span{display:block;height:100%;border-radius:6px;transition:width 377ms cubic-bezier(.16,1,.3,1)}',
      '.a2-vote--si i span{background:var(--lab-verde)}.a2-vote--no i span{background:var(--lab-rosso)}',
      '.a2-vi-side{padding:21px;border-radius:21px;border:1px dashed var(--lab-line)}',
      /* tre voci */
      '.a2-voci{display:grid;gap:21px}@media(min-width:900px){.a2-voci{grid-template-columns:1.618fr 1fr 1fr;align-items:start}}',
      '@media(min-width:640px) and (max-width:899px){.a2-voci{grid-template-columns:1fr 1fr}.a2-voce--a{grid-column:1/-1}}',
      '.a2-voce-n{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin:0 0 8px;font:700 14px/1.3 var(--lab-font-body);color:var(--lab-muted)}',
      '.a2-tag{padding:3px 10px;border-radius:999px;background:color-mix(in srgb,var(--lab-verde) 16%,transparent);color:var(--lab-verde);font-size:12px;font-weight:800}',
      '.a2-clip{background:var(--lab-surface);border:1px solid var(--lab-line);padding:21px;border-radius:5px;rotate:-.5deg;box-shadow:var(--lab-shadow)}',
      '.a2-kicker{display:block;margin-bottom:5px;font:600 12px/1.2 var(--lab-font-inscription);letter-spacing:.16em;text-transform:uppercase;color:var(--la-accent)}',
      '.a2-clip-t{margin:0 0 8px;font:600 clamp(20px,2.2vw,26px)/1.15 var(--lab-font-display);color:var(--lab-ink)}',
      '.a2-clip-b{margin:0;font:400 16px/1.5 var(--lab-font-display);color:var(--lab-ink)}',
      '.a2-chat{background:var(--lab-surface);border:1px solid var(--lab-line);border-radius:21px;padding:13px 21px;box-shadow:var(--lab-shadow)}.a2-chat>.ll-hint{margin:0 0 8px}',
      '.a2-bubble{background:color-mix(in srgb,var(--la-accent) 14%,transparent);border-radius:21px 21px 21px 5px;padding:13px 18px 8px;font-size:17px;line-height:1.45;max-width:34ch}',
      '.a2-bubble p{margin:0}.a2-bubble time{display:block;text-align:right;font-size:12px;color:var(--lab-muted);margin-top:3px}',
      '.a2-postx{background:var(--lab-surface);border:1px solid var(--lab-line);border-radius:13px;padding:21px;box-shadow:var(--lab-shadow)}',
      '.a2-post-h{display:flex;align-items:center;gap:10px;font-size:14px;font-weight:800}',
      '.a2-av{width:34px;height:34px;border-radius:50%;flex:none;background:var(--lab-grad)}',
      '.a2-post-quote{margin:13px 0 5px;font:500 clamp(18px,2vw,22px)/1.35 var(--lab-font-display);color:var(--lab-ink)}.a2-postx>.ll-hint{margin:0 0 8px}',
      '.a2-stats{display:flex;gap:21px;margin:0;color:var(--lab-muted);font-size:14px}',
      '.a2-cls{margin-top:13px}',
      /* riscontri */
      '.a2-game{display:grid;gap:21px}@media(min-width:900px){.a2-game{grid-template-columns:1.618fr 1fr;align-items:start}}',
      '.a2-count{display:flex;align-items:center;gap:13px;margin:0 0 13px}',
      '.a2-pips{display:flex;gap:5px}.a2-pips i{width:21px;height:6px;border-radius:6px;background:var(--lab-line)}.a2-pips i.is-on{background:var(--la-accent)}.a2-pips i.is-cur{background:var(--lab-oro)}',
      '.a2-tag-q{display:inline-block;max-width:100%;margin:0 0 21px;padding:21px 34px;border-radius:13px;background:var(--lab-surface);border:1.5px solid var(--lab-line);box-shadow:var(--lab-shadow);font:600 clamp(20px,2.4vw,30px)/1.2 var(--lab-font-display);rotate:-1deg}',
      '.a2-targets{display:grid;grid-template-columns:1fr 1fr;gap:13px}@media(max-width:520px){.a2-targets{grid-template-columns:1fr}}',
      '.a2-t{--k:var(--lab-verde);position:relative;display:grid;gap:3px;align-content:start;min-height:72px;padding:13px 21px 13px 19px;border-radius:13px;border:1.5px solid var(--lab-line);border-left:6px solid var(--k);background:var(--lab-surface-2);color:var(--lab-ink);text-align:left;cursor:pointer;transition:transform 144ms,border-color 144ms,background 144ms,opacity 144ms}',
      '.a2-t[data-z="B"]{--k:var(--lab-oro)}.a2-t[data-z="C"]{--k:var(--la-accent)}.a2-t[data-z="X"]{--k:var(--lab-muted)}',
      '.a2-t b{font:600 clamp(16px,1.8vw,20px)/1.2 var(--lab-font-display);padding-right:55px}.a2-t span{font-size:13px;color:var(--lab-muted)}',
      '.a2-t:hover:not(:disabled){transform:translateY(-3px);border-color:var(--k)}.a2-t:active:not(:disabled){transform:scale(.97)}',
      '.a2-t.is-wrong{border-color:var(--lab-rosso);background:color-mix(in srgb,var(--lab-rosso) 12%,var(--lab-surface-2));opacity:.7;cursor:not-allowed}',
      '.a2-t.is-right{border-color:var(--k);background:color-mix(in srgb,var(--k) 16%,var(--lab-surface-2))}',
      '.a2-t:disabled:not(.is-right):not(.is-wrong){opacity:.5;cursor:default}',
      '.a2-t i{position:absolute;right:10px;top:10px;padding:2px 9px;border-radius:999px;font:800 11px/1.4 var(--lab-font-body);font-style:normal}',
      '.a2-t.is-right i{background:color-mix(in srgb,var(--lab-verde) 18%,transparent);color:var(--lab-verde)}.a2-t.is-wrong i{background:color-mix(in srgb,var(--lab-rosso) 14%,transparent);color:var(--lab-rosso)}',
      '.a2-board{padding:21px;border:1px solid var(--lab-line);border-radius:21px;background:var(--lab-surface-2)}.a2-board>.la-meta{display:block;margin-bottom:8px}',
      '.a2-slot{--k:var(--lab-verde);padding:8px 0 8px 13px;border-top:1px solid var(--lab-line);border-left:4px solid var(--k)}',
      '.a2-slot[data-z="B"]{--k:var(--lab-oro)}.a2-slot[data-z="C"]{--k:var(--la-accent)}.a2-slot[data-z="X"]{--k:var(--lab-muted)}',
      '.a2-slot p{margin:0;font:700 13px/1.3 var(--lab-font-body)}',
      '.a2-slot ul{list-style:none;margin:3px 0 0;padding:0;display:grid;gap:3px;font:500 15px/1.35 var(--lab-font-display);color:var(--lab-muted)}.a2-slot ul:empty::before{content:"—"}',
      '.a2-slot li.is-new{animation:a2-cade 610ms cubic-bezier(.16,1,.3,1)}@keyframes a2-cade{from{transform:translateY(-13px);opacity:0}to{transform:none;opacity:1}}',
      '.a2-qa{display:grid;gap:8px;margin:13px 0}@media(min-width:640px){.a2-qa{grid-template-columns:1fr 1fr}}',
      '.a2-qa div{--k:var(--lab-verde);padding:13px 13px 13px 18px;border-radius:13px;background:var(--lab-surface-2);border:1px solid var(--lab-line);border-left:5px solid var(--k)}',
      '.a2-qa div:nth-child(2){--k:var(--lab-oro)}.a2-qa div:nth-child(3){--k:var(--la-accent)}.a2-qa div:nth-child(4){--k:var(--lab-muted)}',
      '.a2-qa dt{font:600 11px/1.3 var(--lab-font-inscription);letter-spacing:.14em;text-transform:uppercase;color:var(--k)}',
      '.a2-qa dd{margin:3px 0 0;font-size:14px}.a2-qa dd.q{font:600 17px/1.3 var(--lab-font-display);color:var(--lab-ink)}',
      '.a2-end h3{margin:0 0 8px;font:600 clamp(20px,2.2vw,26px)/1.2 var(--lab-font-display)}.a2-end>p{margin:0;color:var(--lab-ink)}',
      '.a2-rules{font:500 clamp(18px,2.2vw,24px)/1.3 var(--lab-font-display);max-width:36ch;margin:0 0 8px}',
      /* etichette */
      '.a2-stk{display:flex;flex-wrap:wrap;gap:13px;margin:0 0 21px}',
      '.a2-sticker{position:relative;min-height:55px;padding:13px 21px 13px 34px;border-radius:5px 13px 13px 5px;border:1.5px solid var(--lab-line);background:var(--lab-surface);box-shadow:var(--lab-shadow);color:var(--lab-ink);font:600 clamp(16px,1.8vw,19px)/1.25 var(--lab-font-display);text-align:left;cursor:pointer;rotate:var(--r,-1deg);transition:transform 233ms cubic-bezier(.16,1,.3,1),border-color 144ms,opacity 233ms}',
      '.a2-sticker::before{content:"";position:absolute;left:11px;top:50%;width:10px;height:10px;margin-top:-5px;border-radius:50%;border:2px solid var(--lab-line)}',
      '.a2-sticker:hover{transform:translateY(-3px) rotate(1deg);border-color:var(--la-accent)}.a2-sticker:active{transform:scale(.97)}',
      '.a2-sticker[aria-pressed="true"]{border-color:var(--la-accent);background:color-mix(in srgb,var(--la-accent) 12%,var(--lab-surface))}',
      '.a2-sticker.is-done{rotate:0deg;border-style:dashed;border-color:var(--lab-verde);font-style:italic;font-weight:500}',
      '.a2-sticker.is-done::before{border-color:var(--lab-verde);background:var(--lab-verde)}',
      '.a2-stk-q{margin:0 0 13px}',
      /* patto */
      '.a2-patto{display:grid;gap:21px}@media(min-width:900px){.a2-patto{grid-template-columns:1.618fr 1fr;align-items:start}}',
      '.a2-leg{display:block;margin:13px 0 5px;font:800 14px/1.3 var(--lab-font-body)}.a2-leg:first-child{margin-top:0}',
      '.a2-val{display:grid;gap:13px;margin:8px 0 0}@media(min-width:640px){.a2-val{grid-template-columns:repeat(3,1fr)}}',
      '.a2-val>div{padding:13px;border-radius:13px;border:1px solid var(--lab-line);background:var(--lab-surface-2)}',
      '.a2-val h4{margin:0 0 3px;font:600 12px/1.2 var(--lab-font-inscription);letter-spacing:.16em;text-transform:uppercase;color:var(--lab-oro)}',
      '.a2-val p{margin:0 0 8px;font-size:13px;color:var(--lab-muted)}',
      '.a2-val .a2-chips{flex-direction:column;align-items:stretch}',
      '.a2-in{width:100%;min-height:46px;padding:10px 13px;border-radius:13px;border:1.5px solid var(--lab-line);background:var(--lab-surface);color:var(--lab-ink);font:inherit;transition:border-color 144ms}.a2-in:hover{border-color:var(--la-accent)}',
      '.a2-in-row{display:flex;flex-wrap:wrap;gap:8px}.a2-in-row .a2-in{flex:1 1 12rem;width:auto}',
      '.a2-foglio.la-card{padding:21px}.a2-foglio>.la-meta{display:block}',
      '.a2-foglio ol{list-style:none;counter-reset:art;margin:8px 0 0;padding:0;border-top:1px solid var(--lab-line)}',
      '.a2-foglio li{counter-increment:art;display:grid;grid-template-columns:auto 1fr auto;gap:13px;align-items:center;padding:10px 0;border-bottom:1px solid var(--lab-line);font:500 18px/1.35 var(--lab-font-display)}',
      '.a2-foglio li::before{content:counter(art);font:600 22px/1 var(--lab-font-display);color:var(--la-accent);min-width:1.3ch;text-align:right}',
      '.a2-patto.is-big{grid-template-columns:1fr}.a2-patto.is-big>div:first-child{display:none}',
      '.a2-foglio.is-big li{font-size:clamp(22px,3vw,40px);padding:21px 0}.a2-foglio.is-big li::before{font-size:.8em}',
      '.a2-status{margin:8px 0 0;min-height:1.5em;font-size:14px;color:var(--lab-muted)}',
      /* programma */
      '.a2-strip{display:flex;align-items:flex-end;gap:3px;height:48px;margin:8px 0 5px}',
      '.a2-cell{flex:1 1 0;min-width:0;height:46%;border-radius:4px 4px 1px 1px;background:var(--la-accent);opacity:.3;transition:height 377ms cubic-bezier(.16,1,.3,1),opacity 233ms}',
      '.a2-cell.first{margin-left:6px}.a2-cell:first-child{margin-left:0}',
      '.a2-cell[data-b="b1"]{background:var(--lab-oro)}.a2-cell[data-b="b5"]{background:var(--lab-muted)}.a2-cell[data-b="b8"]{background:var(--lab-ciano);opacity:.6;height:62%}',
      '.a2-cell.is-active{opacity:1;height:100%}',
      '.a2-legend{display:flex;justify-content:space-between;font-size:12px;color:var(--lab-muted);margin-bottom:13px}',
      '.a2-blocchi{display:grid;gap:8px}@media(min-width:700px){.a2-blocchi{grid-template-columns:1fr 1fr}}',
      '.a2-blocco{--k:var(--la-accent);display:grid;gap:2px;align-content:start;width:100%;min-height:48px;padding:8px 13px 8px 16px;border-radius:13px;border:1px solid var(--lab-line);border-left:5px solid var(--k);background:var(--lab-surface-2);color:var(--lab-ink);text-align:left;cursor:pointer;transition:transform 144ms,border-color 144ms}',
      '.a2-blocco[data-b="b1"]{--k:var(--lab-oro)}.a2-blocco[data-b="b5"]{--k:var(--lab-muted)}.a2-blocco[data-b="b8"]{--k:var(--lab-ciano)}',
      '.a2-blocco:hover{transform:translateY(-2px);border-color:var(--k)}.a2-blocco:active{transform:scale(.98)}',
      '.a2-blocco small{font:600 11px/1.3 var(--lab-font-inscription);letter-spacing:.12em;text-transform:uppercase;color:var(--lab-muted)}',
      '.a2-blocco small em{display:inline-block;margin-left:6px;padding:1px 8px;border-radius:999px;background:var(--lab-oro);color:var(--lab-bg);font-style:normal}',
      '.a2-blocco b{font:600 17px/1.25 var(--lab-font-display)}',
      '.a2-blocco p{margin:4px 0 0;font-size:14px;line-height:1.5;color:var(--lab-ink)}.a2-blocco p span{display:block;margin-top:4px;color:var(--lab-muted)}',
      '.a2-blocco[aria-expanded="true"]{border-color:var(--k);grid-column:1/-1}',
      '@media(prefers-reduced-motion:reduce){.a2-pc.is-new,.a2-slot li.is-new{animation:none}.a2-cell,.a2-bar i,.a2-track,.a2-track::after,.a2-vote i span,.a2-sticker{transition:none}}'
    ].join('\n');
    document.head.appendChild(s);
  })();

  var ICO = {
    sole: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>`
  };

  /* ---------- Cartoline dall'estate: dodici domande leggere, chi racconta, mezzo minuto a testa ----------
     Interazioni: «Pesca / Fatto, la prossima» (ll-btn: magnetico, lama di luce, active 0,96, focus oro), «Cambia» e «Passo»
     (ll-btn--ghost: riempimento dal basso), «Estrai un numero» (ghost), ± (a2-pm: bordo anno, active 0,92), interruttore
     del mezzo minuto (a2-switch: bordo anno, active 0,94, stato visibile anche senza colore). La cartolina gira entrando. */
  var CARTOLINE = [
    ['Un luogo', 'Un posto dell’estate, anche a due passi da casa.'],
    ['Un sapore', 'Un sapore che ti porti dietro.'],
    ['Una scoperta', 'Una cosa nuova che hai imparato: un gioco, una ricetta, un trucco.'],
    ['Un incontro', 'Una persona che hai rivisto o conosciuto.'],
    ['Una colonna sonora', 'La canzone della tua estate.'],
    ['Un momento lento', 'Un pomeriggio di noia: com’è andato a finire?'],
    ['Una piccola impresa', 'Qualcosa per cui ci è voluto un po’ di coraggio.'],
    ['Un imprevisto', 'Una cosa andata storta che adesso fa sorridere.'],
    ['Da consigliare', 'Un libro, un film o una serie da consigliare. O da sconsigliare.'],
    ['Da tenere', 'Un’abitudine dell’estate che vorresti portare a scuola.'],
    ['Una sorpresa', 'Qualcosa che non ti aspettavi.'],
    ['Una domanda', 'Una domanda che ti è rimasta in testa.']
  ];
  LabLezione.registra('Cartoline', function (p) {
    var N = CARTOLINE.length, tutti = CARTOLINE.map(function (_, i) { return i; });
    var o = useMem('ca-ordine', function () { return mescola(tutti); }), ordine = o[0], setOrdine = o[1];
    var ps = useMem('ca-pos', -1), pos = ps[0], setPos = ps[1];
    var c = useMem('ca-conta', 0), conta = c[0], setConta = c[1];
    var r = useMem('ca-rim', false), rimescolato = r[0], setRimescolato = r[1];
    var m = useMem('ca-mezzo', false), mezzo = m[0], setMezzo = m[1];
    var e = useState(null), fine = e[0], setFine = e[1];
    var tk = useState(0), setTk = tk[1];
    var al = useMem('ca-alunni', 25), alunni = al[0], setAlunni = al[1];
    var es = useMem('ca-estratti', []), estratti = es[0], setEstratti = es[1];
    var nn = useMem('ca-numero', null), numero = nn[0], setNumero = nn[1];
    var mostrata = pos >= 0;
    React.useEffect(function () {
      if (!fine) return;
      var detto = false;
      var iv = setInterval(function () { setTk(Date.now()); if (Date.now() >= fine && !detto) { detto = true; clearInterval(iv); p.ctx.say('Mezzo minuto concluso.'); } }, 200);
      return function () { clearInterval(iv); };
    }, [fine]);
    function pesca(motivo, contare) {
      var ord = ordine, k = pos, resh = false;
      if (k >= ord.length - 1) { ord = mescola(tutti); k = -1; resh = true; }
      k++;
      setOrdine(ord); setPos(k); setRimescolato(resh && mostrata);
      if (contare) { setConta(conta + 1); MEM.racconti = conta + 1; }
      setFine(mezzo ? Date.now() + 30000 : null);
      if (motivo) p.ctx.say(motivo);
    }
    function toggleMezzo() {
      var on = !mezzo; setMezzo(on);
      setFine(on && mostrata ? Date.now() + 30000 : null);
      p.ctx.say(on ? 'Mezzo minuto a testa: attivo.' : 'Mezzo minuto a testa: spento.');
    }
    function estrai() {
      var liberi = [], i, ripartito = false;
      for (i = 1; i <= alunni; i++) if (estratti.indexOf(i) < 0) liberi.push(i);
      if (!liberi.length) { for (i = 1; i <= alunni; i++) liberi.push(i); ripartito = true; }
      var n = liberi[Math.floor(Math.random() * liberi.length)];
      setNumero(n); setEstratti(ripartito ? [n] : estratti.concat([n]));
      p.ctx.say((ripartito ? 'Tutti estratti, si ricomincia. ' : '') + 'Racconta il numero ' + n + '.');
    }
    function setN(n) { n = Math.max(5, Math.min(35, n)); setAlunni(n); setEstratti([]); setNumero(null); }
    var pr = mostrata ? CARTOLINE[ordine[pos]] : null;
    var left = fine ? Math.max(0, fine - Date.now()) : 0, sec = Math.ceil(left / 1000), barra = mezzo && mostrata && !!fine;
    return html`<div className="a2-cart">
      <div>
        <div key=${pos} className=${'a2-pc' + (mostrata ? ' is-new' : '')}>
          <span className="a2-pc-k">${pr ? pr[0] : 'Cartoline dall’estate'}</span>
          <span className="a2-stamp" aria-hidden="true">${ICO.sole}</span>
          <p className="a2-pc-q" aria-live="polite">${pr ? pr[1] : 'Un mazzo di domande leggere: una a testa.'}</p>
          <div className="a2-pc-f">
            <span className="ll-hint">${!mostrata ? 'Nel mazzo: ' + N + ' cartoline' : rimescolato ? 'Mazzo rimescolato' : 'Nel mazzo: ' + (ordine.length - pos - 1)}</span>
            ${barra ? html`<b className=${'a2-sec' + (left <= 0 ? ' is-over' : '')} aria-live="off">${left > 0 ? '0:' + (sec < 10 ? '0' : '') + sec : 'Tempo'}</b>` : null}
          </div>
          ${barra ? html`<span className="a2-bar" aria-hidden="true"><i style=${{ width: (left / 300) + '%' }}></i></span>` : null}
        </div>
        <div className="ll-row">
          <button type="button" className="ll-btn" onClick=${function () { pesca('', mostrata); }}>${mostrata ? 'Fatto, la prossima' : 'Pesca la prima cartolina'}</button>
          ${mostrata ? html`<button type="button" className="ll-btn ll-btn--ghost" onClick=${function () { pesca('Cartolina cambiata.', false); }}>Cambia</button>` : null}
          ${mostrata ? html`<button type="button" className="ll-btn ll-btn--ghost" onClick=${function () { pesca('Passo: nessuna spiegazione.', false); }}>Passo</button>` : null}
          <span className="ll-tally" aria-live="polite">Racconti: ${conta}</span>
        </div>
      </div>
      <div className="a2-tools">
        <div className="a2-tool">
          <span className="la-meta">Chi racconta?</span>
          <div className="a2-draw"><b className="a2-num" aria-live="polite">${numero == null ? '—' : numero}</b>
            <button type="button" className="ll-btn ll-btn--ghost" onClick=${estrai}>Estrai un numero</button></div>
          <div className="a2-step" role="group" aria-label="Numero di alunni"><span className="ll-hint">Alunni</span>
            <button type="button" className="a2-pm" aria-label="Uno in meno" onClick=${function () { setN(alunni - 1); }}>−</button><b>${alunni}</b>
            <button type="button" className="a2-pm" aria-label="Uno in più" onClick=${function () { setN(alunni + 1); }}>+</button>
            <span className="ll-hint">da estrarre: ${alunni - estratti.length}</span></div>
          <p className="ll-hint">Un numero del registro, senza ripetizioni. Oppure si seguono i banchi.</p>
        </div>
        <div className="a2-tool">
          <button type="button" className="a2-switch" role="switch" aria-checked=${mezzo} onClick=${toggleMezzo}><span className="a2-track" aria-hidden="true"></span>Mezzo minuto a testa ${mezzo ? '· sì' : '· no'}</button>
          <p className="ll-hint">Una barra sul bordo della cartolina segna il tempo. Nessun suono.</p>
        </div>
      </div>
    </div>`;
  });

  /* ---------- Vero o inventato: la classe vota, fa una sola domanda, chi racconta svela ----------
     Interazioni: due grandi pulsanti di voto (a2-vote: bordo anno e −3 px, active 0,97, focus oro; barra proporzionale),
     domande di riscontro (a2-chip, premuto = pieno), «Era tutto vero» / «C’era un’invenzione» (ghost), «Nuovo racconto» (ll-btn).
     Nessun dato salvato: i voti sono conteggi anonimi in memoria. */
  var DOMANDE = ['Chi c’era con te?', 'Quando, di preciso?', 'Come fai a ricordarlo?', 'Chi può confermarlo?'];
  LabLezione.registra('VeroInventato', function (p) {
    var a = useMem('vi-si', 0), si = a[0], setSi = a[1];
    var b = useMem('vi-no', 0), no = b[0], setNo = b[1];
    var q = useMem('vi-dom', null), dom = q[0], setDom = q[1];
    var r = useMem('vi-esito', null), esito = r[0], setEsito = r[1];
    var g = useMem('vi-giri', 0), giri = g[0], setGiri = g[1];
    var tot = si + no;
    function svela(vero) {
      var msg, tono = 'is-part';
      if (si === no) msg = 'Voti pari o nessun voto. Che cosa sarebbe servito per decidere?';
      else if (si > no) { msg = vero ? 'La classe si è fidata, ed era tutto vero.' : 'La classe si è fidata, ma c’era un’invenzione: un racconto credibile non è ancora un racconto verificato.'; tono = vero ? 'is-ok' : 'is-ko'; }
      else { msg = vero ? 'La classe non si è fidata, ma era tutto vero: il sospetto non è una prova.' : 'La classe ha fiutato l’invenzione. Da quale indizio?'; tono = vero ? 'is-ko' : 'is-ok'; }
      if (tono === 'is-ok') p.ctx.cheer(); else if (tono === 'is-ko') p.ctx.oops();
      if (!esito) setGiri(giri + 1);
      setEsito([tono, msg]);
    }
    function nuovo() { setSi(0); setNo(0); setDom(null); setEsito(null); p.ctx.say('Nuovo racconto: voti azzerati.'); }
    function w(n) { return (tot ? Math.round(n / tot * 100) : 0) + '%'; }
    return html`<div className="a2-vi">
      <div>
        <p className="a2-passo"><span>I</span>La classe vota</p>
        <div className="a2-votes">
          <button type="button" className="a2-vote a2-vote--si" disabled=${!!esito} onClick=${function () { setSi(si + 1); }} aria-label=${'Mi fido: ' + si + ' voti. Aggiungi un voto'}><span>Mi fido</span><b aria-hidden="true">${si}</b><i aria-hidden="true"><span style=${{ width: w(si) }}></span></i></button>
          <button type="button" className="a2-vote a2-vote--no" disabled=${!!esito} onClick=${function () { setNo(no + 1); }} aria-label=${'Non mi fido: ' + no + ' voti. Aggiungi un voto'}><span>Non mi fido</span><b aria-hidden="true">${no}</b><i aria-hidden="true"><span style=${{ width: w(no) }}></span></i></button>
        </div>
        <p className="a2-passo"><span>II</span>Una sola domanda di riscontro</p>
        <div className="a2-chips">${DOMANDE.map(function (t, i) { return html`<button key=${i} type="button" className="a2-chip" aria-pressed=${dom === i} onClick=${function () { setDom(dom === i ? null : i); }}>${t}</button>`; })}</div>
        <p className="a2-passo" style=${{ marginTop: 21 }}><span>III</span>Chi ha raccontato svela</p>
        <div className="a2-chips">
          <button type="button" className="ll-btn ll-btn--ghost" onClick=${function () { svela(true); }}>Era tutto vero</button>
          <button type="button" className="ll-btn ll-btn--ghost" onClick=${function () { svela(false); }}>C’era un’invenzione</button>
        </div>
        <div aria-live="polite">${esito ? html`<p className=${'ll-why ' + esito[0]}><strong>${esito[1]} </strong>Che cosa vi aveva convinto: i dettagli, il tono, la persona?</p>` : null}</div>
      </div>
      <div className="a2-vi-side">
        <span className="la-meta">Come si gioca</span>
        <p className="ll-hint">Chi racconta decide in segreto se inventare un dettaglio. Lo sa soltanto chi racconta.</p>
        <p className="ll-hint">Nessun punteggio: conta che cosa ci ha fatto fidare.</p>
        <div className="ll-row">
          <button type="button" className="ll-btn" onClick=${nuovo}>Nuovo racconto</button>
          <span className="ll-tally" aria-live="polite">Messi alla prova: ${giri}</span>
        </div>
      </div>
    </div>`;
  });

  /* ---------- Tre voci sul tavolo: ritaglio, messaggio, post; che tipo di affermazione è? ----------
     Interazioni: tre gruppi di a2-chip (hover bordo anno −2 px, active 0,96, focus oro; esito verde / oro tratteggiato / rosso,
     sempre con la parola «Giusto», «In parte», «Da rivedere»). Si può cambiare scelta. */
  var CL = {
    A: { fatto: ['ok', '**Giusto.** Riferisce un evento con data, luogo e persone: dati che anche altri possono controllare.'],
         opinione: ['ko', '**Da rivedere.** Cercate un giudizio personale: c’è? Data, luogo e nomi sono dati, non gusti.'],
         citazione: ['ko', '**Da rivedere.** Il ritaglio non riporta parole di qualcuno: racconta che cosa è successo, dove e quando.'] },
    B: { opinione: ['ok', '**Giusto.** È un giudizio personale su come fidarsi: non si smentisce con un documento, si discute.'],
         fatto: ['ko', '**Da rivedere.** Che cosa si potrebbe cercare in un archivio? «Mi fido solo di ciò che vedo» esprime un modo di pensare, non un evento.'],
         citazione: ['ko', '**Da rivedere.** Chi parla è lì con voi e dice la sua: non riporta parole di qualcun altro.'] },
    C: { citazione: ['ok', '**Giusto.** Mette parole in bocca a qualcuno: prima di discuterle, bisogna sapere chi le ha dette davvero.'],
         fatto: ['ko', '**Da rivedere.** L’unico «fatto» sarebbe che qualcuno l’abbia detto: ed è proprio ciò che va verificato.'],
         opinione: ['part', '**In parte.** Il contenuto è un’opinione, ma il post la attribuisce a un’autorità: è una citazione, e la prima domanda riguarda chi l’ha detta.'] }
  };
  LabLezione.registra('TreVoci', function (p) {
    var OPZ = [['fatto', 'Un fatto verificabile'], ['opinione', 'Un’opinione'], ['citazione', 'Una citazione']];
    var ETI = { A: 'Un fatto verificabile', B: 'Un’opinione', C: 'Una citazione' };
    var s = useMem('tv', {}), sc = s[0], setSc = s[1];
    function ok(v) { return !!sc[v] && CL[v][sc[v]][0] === 'ok'; }
    function scegli(v, val) {
      var n = Object.assign({}, sc); n[v] = val; setSc(n);
      var res = CL[v][val][0];
      if (res === 'ok') p.ctx.cheer(); else p.ctx.oops();
      var tutte = ['A', 'B', 'C'].every(function (k) { return n[k] && CL[k][n[k]][0] === 'ok'; });
      if (tutte && !MEM.tvFesta) { MEM.tvFesta = true; p.ctx.festa(); p.ctx.say('Tre voci, tre domande diverse.'); }
    }
    function scelte(v) {
      var val = sc[v], pair = val ? CL[v][val] : null;
      return html`<div className="a2-cls" role="group" aria-label="Che cosa è?">
        <div className="a2-chips">${OPZ.map(function (o) { var me = val === o[0]; return html`<button key=${o[0]} type="button" className=${'a2-chip' + (me ? ' is-' + pair[0] : '')} aria-pressed=${me} onClick=${function () { scegli(v, o[0]); }}>${o[1]}</button>`; })}</div>
        <div aria-live="polite">${pair ? html`<p className=${'ll-why is-' + pair[0]}>${I(pair[1], 'w' + v)}</p>` : null}</div>
      </div>`;
    }
    function nome(v, t) { return html`<h3 className="a2-voce-n">${t} ${ok(v) ? html`<span className="a2-tag">${ETI[v]}</span>` : null}</h3>`; }
    var tutte = ok('A') && ok('B') && ok('C');
    return html`<div>
      <div className="a2-voci">
        <article className="a2-voce a2-voce--a">
          ${nome('A', 'Il ritaglio')}
          <div className="a2-clip">
            <span className="a2-kicker">Roma · cronaca</span>
            <p className="a2-clip-t">Carlo Acutis e Pier Giorgio Frassati proclamati santi</p>
            <p className="a2-clip-b">Domenica 7 settembre 2025, in piazza San Pietro, papa Leone XIV ha proclamato santi Pier Giorgio Frassati, morto a ventiquattro anni nel 1925, e Carlo Acutis, morto a quindici anni nel 2006. In piazza, decine di migliaia di fedeli.</p>
          </div>
          ${scelte('A')}
        </article>
        <article className="a2-voce a2-voce--b">
          ${nome('B', 'Il messaggio')}
          <div className="a2-chat">
            <span className="ll-hint">Un compagno, all’intervallo</span>
            <div className="a2-bubble"><p>Io mi fido solo di ciò che vedo con i miei occhi. Il resto sono chiacchiere.</p><time>10:47</time></div>
          </div>
          ${scelte('B')}
        </article>
        <article className="a2-voce a2-voce--c">
          ${nome('C', 'Il post')}
          <div className="a2-postx">
            <div className="a2-post-h"><span className="a2-av" aria-hidden="true"></span><span>Pagina di citazioni</span></div>
            <p className="a2-post-quote">«Più studio la scienza, più mi convinco che senza la fede non si capisce nulla.»</p>
            <p className="ll-hint">Un premio Nobel per la fisica, in un’intervista del 2019</p>
            <p className="a2-stats"><span>12,4 mila cuori</span><span>3.180 condivisioni</span></p>
          </div>
          ${scelte('C')}
        </article>
      </div>
      <div aria-live="polite">${tutte ? html`<p className="ll-why is-ok"><strong>Tre forme diverse: </strong>un fatto, un’opinione, una citazione. Ognuna chiede una domanda diversa.</p>` : null}</div>
    </div>`;
  });

  /* ---------- Il gioco dei riscontri: cinque richieste, quattro posti; se sbagliate il bersaglio si spegne e riprovate ----------
     Interazioni: «Inizia» (ll-btn), quattro bersagli (a2-t: hover −3 px e bordo del colore della zona, active 0,97, focus oro;
     esito con la parola «Giusto» / «Non qui»), «Prossima richiesta» (ll-btn), «Rigioca» (ghost). Nessun punteggio. */
  var GQ = [
    { id: 'r1', t: 'Dove posso controllarlo anch’io?', z: 'A' },
    { id: 'r2', t: 'Con quali ragioni lo sostieni?', z: 'B' },
    { id: 'r3', t: 'Chi l’ha detto, dove e quando?', z: 'C' },
    { id: 'f1', t: 'Quanti like ha?', z: 'X' },
    { id: 'f2', t: 'Me l’ha girato un amico: basta?', z: 'X' }
  ];
  var LIKE_KO = 'I like dicono quanto una frase è piaciuta, non da dove viene né se è vera: è un falso riscontro.';
  var FRIEND_KO = 'Chi te lo manda può essere in buona fede e sbagliarsi lo stesso: la fiducia nell’amico non sostituisce il controllo.';
  var GFB = {
    r1: { A: 'Il ritaglio riferisce un fatto con data e luogo: chiunque può controllarlo sul sito della Santa Sede e nei giornali di quel giorno.',
          B: 'Nessun archivio conserva il «mi fido solo di ciò che vedo»: per un’opinione servono ragioni, non un documento.',
          C: 'Servirà, ma prima una citazione ha bisogno di un indirizzo: chi l’ha detta, dove e quando.',
          X: 'È un riscontro vero: rimanda a una fonte che anche altri possono consultare. Cercate la voce che riferisce un fatto.' },
    r2: { A: 'Per un fatto le ragioni non bastano: serve una fonte che altri possano controllare.',
          B: 'Un’opinione non si verifica con un documento: si discute con ragioni ed esempi.',
          C: 'Le ragioni contano, ma prima bisogna sapere chi ha parlato: a «un premio Nobel» senza nome non si può chiedere nulla.',
          X: 'Chiedere ragioni è un vero riscontro, per le opinioni. Cercate la voce che esprime un giudizio personale.' },
    r3: { A: 'Il ritaglio dichiara già data e luogo: la sua domanda è dove verificarli.',
          B: 'Qui si sa chi parla: un compagno, adesso. Il punto non è l’indirizzo, sono le sue ragioni.',
          C: 'Una citazione vale quanto il suo indirizzo: nome, opera o testata, data. Senza questi non c’è riscontro.',
          X: 'È il riscontro più importante per una citazione. Cercate la voce che mette parole in bocca a qualcuno.' },
    f1: { A: LIKE_KO, B: LIKE_KO, C: LIKE_KO, X: 'La popolarità misura quanto circola una frase, non se è vera.' },
    f2: { A: FRIEND_KO, B: FRIEND_KO, C: FRIEND_KO, X: 'Un amico può essere sincero e sbagliarsi comunque: la fiducia nella persona non sostituisce il controllo.' }
  };
  var ZONE = [
    ['A', 'Il ritaglio', 'La canonizzazione, 7 settembre 2025'],
    ['B', 'Il messaggio', '«Mi fido solo di ciò che vedo»'],
    ['C', 'Il post', '«Un premio Nobel», 12,4 mila cuori'],
    ['X', 'Falso riscontro', 'Sembra un controllo, ma non lo è']
  ];
  var QA = [
    ['Un fatto', '«Dove posso controllarlo?»', 'Mi fido di una fonte che anche altri possono consultare.'],
    ['Un’opinione', '«Con quali ragioni?»', 'Valuto gli argomenti, non la simpatia di chi parla.'],
    ['Una citazione', '«Chi, dove, quando?»', 'Prima l’indirizzo, poi il contenuto.'],
    ['Un falso riscontro', '«Quanti like? Chi me l’ha girato?»', 'Dice quanto una frase circola, non se è vera.']
  ];
  LabLezione.registra('Riscontri', function (p) {
    var VUOTO = { A: [], B: [], C: [], X: [] };
    var f = useMem('ri-fase', 'intro'), fase = f[0], setFase = f[1];
    var o = useMem('ri-ordine', []), ordine = o[0], setOrdine = o[1];
    var ii = useMem('ri-i', 0), i = ii[0], setI = ii[1];
    var w = useMem('ri-spenti', []), spenti = w[0], setSpenti = w[1];
    var g = useMem('ri-giusto', null), giusto = g[0], setGiusto = g[1];
    var fb = useMem('ri-esito', null), esito = fb[0], setEsito = fb[1];
    var sl = useMem('ri-slot', VUOTO), slot = sl[0], setSlot = sl[1];
    function inizia() { setOrdine(mescola(GQ)); setI(0); setSpenti([]); setGiusto(null); setEsito(null); setSlot(VUOTO); setFase('play'); }
    function tocca(z) {
      if (giusto) return;
      var q = ordine[i];
      if (z === q.z) {
        setGiusto(z); setEsito(['ok', 'Giusto. ', GFB[q.id][z]]);
        var ns = Object.assign({}, slot); ns[z] = ns[z].concat(['«' + q.t + '»']); setSlot(ns); p.ctx.cheer();
      } else { setSpenti(spenti.concat([z])); setEsito(['ko', 'Non qui. ', GFB[q.id][z]]); p.ctx.oops(); }
    }
    function avanti() {
      if (i + 1 >= ordine.length) { setFase('end'); p.ctx.festa(); p.ctx.say('Tabellone pieno: ogni voce ha la sua domanda.'); return; }
      setI(i + 1); setSpenti([]); setGiusto(null); setEsito(null);
    }
    var q = ordine[i];
    var board = html`<aside className="a2-board" aria-label="Il tabellone">
      <span className="la-meta">Il tabellone</span>
      ${ZONE.map(function (z) { return html`<div key=${z[0]} className="a2-slot" data-z=${z[0]}><p>${z[0] === 'X' ? 'Falsi riscontri' : z[1]}</p><ul>${slot[z[0]].map(function (t, k) { return html`<li key=${k} className=${k === slot[z[0]].length - 1 && giusto === z[0] ? 'is-new' : ''}>${t}</li>`; })}</ul></div>`; })}
    </aside>`;
    if (fase === 'intro') return html`<div className="a2-game">
      <div className="la-card" data-flat>
        <p className="a2-rules">Cinque richieste di riscontro. Per ognuna: dove va? Su una delle tre voci, oppure fra i falsi riscontri.</p>
        <p className="ll-hint">Nessun punteggio: se sbagliate, il bersaglio si spegne e si riprova.</p>
        <div className="ll-row"><button type="button" className="ll-btn" onClick=${inizia}>Inizia</button></div>
      </div>
      ${board}
    </div>`;
    return html`<div className="a2-game">
      <div>
        ${fase === 'play' ? html`<div key=${i}>
          <p className="a2-count"><span className="ll-tally">Richiesta ${i + 1} di ${GQ.length}</span><span className="a2-pips" aria-hidden="true">${GQ.map(function (_, k) { return html`<i key=${k} className=${k < i ? 'is-on' : k === i ? 'is-cur' : ''}></i>`; })}</span></p>
          <p className="a2-tag-q">«${q.t}»</p>
          <div className="a2-targets" role="group" aria-label="Dove va questa richiesta?">
            ${ZONE.map(function (z) {
              var sp = spenti.indexOf(z[0]) > -1, ok = giusto === z[0];
              return html`<button key=${z[0]} type="button" className=${'a2-t' + (ok ? ' is-right' : '') + (sp ? ' is-wrong' : '')} data-z=${z[0]} disabled=${sp || !!giusto} onClick=${function () { tocca(z[0]); }}>
                <b>${z[1]}</b><span>${z[2]}</span>${ok ? html`<i>Giusto</i>` : sp ? html`<i>Non qui</i>` : null}
              </button>`;
            })}
          </div>
          <div aria-live="polite">${esito ? html`<p className=${'ll-why is-' + esito[0]}><strong>${esito[1]}</strong>${esito[2]}</p>` : html`<p className="ll-hint" style=${{ marginTop: 13 }}>Prima votate con la mano, poi toccate un riquadro.</p>`}</div>
          ${giusto ? html`<div className="ll-row"><button type="button" className="ll-btn" onClick=${avanti}>${i === GQ.length - 1 ? 'Vedi il riepilogo' : 'Prossima richiesta'}</button></div>` : null}
        </div>` : html`<div className="a2-end">
          <h3>Che cosa abbiamo capito</h3>
          <p>Ogni voce chiede la sua domanda. Like e amicizie non sono riscontri.</p>
          <dl className="a2-qa">${QA.map(function (x, k) { return html`<div key=${k}><dt>${x[0]}</dt><dd className="q">${x[1]}</dd><dd>${x[2]}</dd></div>`; })}</dl>
          <div className="ll-row"><button type="button" className="ll-btn ll-btn--ghost" onClick=${inizia}>Rigioca</button></div>
        </div>`}
      </div>
      ${board}
    </div>`;
  });

  /* ---------- Staccare le etichette: per ogni etichetta, quale domanda riapre il discorso sull'idea? ----------
     La classe decide fra due domande: una è sull'idea, l'altra è un'etichetta travestita. Esito sempre motivato.
     Interazioni: etichette (a2-sticker: hover −3 px e lieve rotazione, active 0,97, focus oro; staccata = tratteggio verde
     e testo della domanda), due la-choice (kit), «Prossima etichetta» (ll-btn). */
  var ETICHETTE = [
    { e: '«Sei il solito credulone.»', q: ['«Ma come fai a cascarci sempre?»', '«Da dove viene questa informazione? Controlliamola insieme.»'], ok: 1,
      why: ['Parla ancora della persona: è un’etichetta con il punto interrogativo.', 'Sposta l’attenzione sull’**informazione** e propone di controllarla insieme.'] },
    { e: '«Voi scettici non credete a niente.»', q: ['«Che cosa ti renderebbe convincente questa fonte?»', '«Perché siete sempre contro tutto?»'], ok: 0,
      why: ['Chiede il **criterio** dell’altro: da lì si può ragionare insieme.', '«Sempre», «tutto», «voi»: giudica un gruppo, non discute un’idea.'] },
    { e: '«Chi crede ha smesso di ragionare.»', q: ['«Quindi i credenti sono ingenui?»', '«Perché pensi che credere e ragionare siano in contrasto?»'], ok: 1,
      why: ['Rilancia l’etichetta invece di discuterla.', 'Chiede la **ragione** di un’idea: si può rispondere con argomenti.'] },
    { e: '«Chi non crede non ha valori.»', q: ['«Quali valori guidano le tue scelte?»', '«Allora per te chi non crede vale meno?»'], ok: 0,
      why: ['Mette l’idea alla prova con un caso reale, **ascoltando** l’altro.', 'Attribuisce all’altro un’intenzione: è una provocazione, non una domanda sull’idea.'] }
  ];
  LabLezione.registra('Etichette', function (p) {
    var s = useMem('et-cur', 0), cur = s[0], setCur = s[1];
    var r = useMem('et-ris', {}), ris = r[0], setRis = r[1];
    var fatte = ETICHETTE.filter(function (_, k) { return ris[k] && ris[k].ok; }).length;
    var E = ETICHETTE[cur], a = ris[cur];
    function scegli(j) {
      if (a && a.ok) return;
      var ok = j === E.ok, n = Object.assign({}, ris); n[cur] = { j: j, ok: ok }; setRis(n);
      if (ok) { p.ctx.cheer(); var tot = ETICHETTE.filter(function (_, k) { return n[k] && n[k].ok; }).length; if (tot === ETICHETTE.length) { p.ctx.festa(); p.ctx.say('Quattro etichette staccate: si discute l’idea.'); } }
      else p.ctx.oops();
    }
    function prossima() { for (var k = 1; k <= ETICHETTE.length; k++) { var j = (cur + k) % ETICHETTE.length; if (!(ris[j] && ris[j].ok)) { setCur(j); return; } } }
    function cls(j) {
      if (!a) return 'la-choice';
      if (a.ok) return 'la-choice' + (j === E.ok ? ' is-right' : ' is-dim');
      return 'la-choice' + (j === a.j ? ' is-wrong' : '');
    }
    return html`<div>
      <div className="a2-stk" role="group" aria-label="Le etichette">
        ${ETICHETTE.map(function (x, k) {
          var done = ris[k] && ris[k].ok;
          return html`<button key=${k} type="button" className=${'a2-sticker' + (done ? ' is-done' : '')} style=${{ '--r': (k % 2 ? 1.2 : -1.4) + 'deg' }} aria-pressed=${cur === k} onClick=${function () { setCur(k); }}>${done ? x.q[x.ok] : x.e}</button>`;
        })}
      </div>
      <div className="la-card" data-flat key=${cur}>
        <p className="la-meta a2-stk-q">Etichetta ${cur + 1} di ${ETICHETTE.length} · ${E.e}</p>
        <h3 className="la-q">Quale domanda riapre il discorso sull’idea?</h3>
        <div className="la-choices">
          ${E.q.map(function (t, j) { return html`<button key=${j} type="button" className=${cls(j)} disabled=${!!(a && a.ok)} onClick=${function () { scegli(j); }}><span className="la-key">${'AB'[j]}</span>${t}</button>`; })}
        </div>
        <div aria-live="polite">${a && html`<p className=${'ll-why ' + (a.ok ? 'is-ok' : 'is-ko')}><strong>${a.ok ? 'Staccata. ' : 'È ancora un’etichetta. '}</strong>${I(E.why[a.j], 'w' + cur)}</p>`}</div>
        <div className="ll-row">
          ${a && a.ok && fatte < ETICHETTE.length && html`<button type="button" className="ll-btn" onClick=${prossima}>Prossima etichetta</button>`}
          <span className="ll-tally">Staccate: ${fatte} / ${ETICHETTE.length}</span>
        </div>
      </div>
      ${fatte === ETICHETTE.length && html`<p className="ll-why is-ok" aria-live="polite"><strong>Le idee si mettono alla prova, le persone si rispettano. </strong>Si può non essere d’accordo senza dare del credulone o dello scettico a nessuno.</p>`}
    </div>`;
  });

  /* ---------- La mia regola e il patto di confronto (solo in memoria) ----------
     Interazioni: suggerimenti raggruppati per Ragioni · Ascolto · Responsabilità (a2-chip: «+» / «✓», premuto = pieno),
     campo «Nuova regola» con «Aggiungi» (ghost), «Togli» (ll-link), «Proietta il patto» (ll-btn, aria-pressed). Massimo 7 regole. */
  var VALORI = [
    { t: 'Ragioni', d: 'Chiedo e offro motivi, non slogan.', s: ['Chiedo ragioni e ne offro.', 'Critico l’idea, non chi la sostiene.'] },
    { t: 'Ascolto', d: 'Prima di rispondere, capisco che cosa ha detto l’altro.', s: ['Ascolto fino in fondo prima di rispondere.', 'Posso cambiare idea senza perdere la faccia.'] },
    { t: 'Responsabilità', d: 'Controllo prima di condividere, anche quando una frase mi dà ragione.', s: ['Prima di condividere, controllo la fonte.', 'Discutiamo le idee, non le persone.'] }
  ];
  var MAXP = 7;
  LabLezione.registra('Patto', function (p) {
    var d = useMem('pa-nuova', ''), nuova = d[0], setNuova = d[1];
    var e = useMem('pa-patto', []), patto = e[0], setPatto = e[1];
    var st = useState(''), stato = st[0], setStato = st[1];
    var pj = useMem('pa-grande', false), grande = pj[0], setGrande = pj[1];
    function dentro(t) { return patto.some(function (x) { return norm(x) === norm(t); }); }
    function aggiungi(t) {
      t = String(t || '').trim().replace(/\s+/g, ' ');
      if (!t) { setStato('Scrivete prima una regola.'); return false; }
      t = t.charAt(0).toUpperCase() + t.slice(1);
      if (dentro(t)) { setStato('Questa regola è già nel patto.'); return false; }
      if (patto.length >= MAXP) { setStato('Il patto ha già ' + MAXP + ' regole: meglio poche e chiare. Toglietene una.'); return false; }
      var n = patto.concat([t]); setPatto(n); setStato('Regola aggiunta. Nel patto: ' + n.length + '.');
      if (n.length === 3) { p.ctx.festa(); p.ctx.say('Tre regole: il patto c’è. Meglio poche e chiare.'); }
      return true;
    }
    function togli(k) { var t = patto[k]; setPatto(patto.filter(function (_, j) { return j !== k; })); setStato('Regola tolta: ' + t); }
    return html`<div className=${'a2-patto' + (grande ? ' is-big' : '')}>
      <div>
        <span className="a2-leg">Scegliete dai suggerimenti…</span>
        <div className="a2-val">
          ${VALORI.map(function (v) { return html`<div key=${v.t}>
            <h4>${v.t}</h4><p>${v.d}</p>
            <div className="a2-chips">${v.s.map(function (t) { var on = dentro(t); return html`<button key=${t} type="button" className="a2-chip" aria-pressed=${on} onClick=${function () { if (on) togli(patto.map(norm).indexOf(norm(t))); else aggiungi(t); }}>${on ? '✓ ' : '+ '}${t}</button>`; })}</div>
          </div>`; })}
        </div>
        <label className="a2-leg" htmlFor="a2-nuova">…oppure con parole vostre</label>
        <form className="a2-in-row" onSubmit=${function (ev) { ev.preventDefault(); if (aggiungi(nuova)) setNuova(''); }}>
          <input id="a2-nuova" className="a2-in" value=${nuova} maxLength="140" autoComplete="off" placeholder="Quando non sono d’accordo, io…" onInput=${function (ev) { setNuova(ev.target.value); }} />
          <button type="submit" className="ll-btn ll-btn--ghost">Aggiungi</button>
        </form>
        <p className="a2-status" aria-live="polite">${stato}</p>
      </div>
      <div className=${'a2-foglio la-card' + (grande ? ' is-big' : '')} data-flat>
        <span className="la-meta">Il nostro patto di confronto · ${patto.length === 1 ? '1 regola' : patto.length + ' regole'}</span>
        ${patto.length ? html`<ol>${patto.map(function (t, k) { return html`<li key=${t}><span>${t}</span><button type="button" className="ll-link" aria-label=${'Togli la regola: ' + t} onClick=${function () { togli(k); }}>Togli</button></li>`; })}</ol>`
          : html`<p className="ll-hint">Il patto è ancora vuoto. Scegliete insieme da tre a cinque regole.</p>`}
        <div className="ll-row">
          <button type="button" className="ll-btn" disabled=${!patto.length} aria-pressed=${grande} onClick=${function () { setGrande(!grande); }}>${grande ? 'Riduci' : 'Proietta il patto'}</button>
        </div>
        <p className="ll-hint" style=${{ margin: '13px 0 0' }}>Il patto resta solo su questa pagina: ricopiatelo alla lavagna o sul quaderno.</p>
      </div>
    </div>`;
  });

  /* ---------- Il percorso dell'anno: ventotto incontri, otto tappe ----------
     Interazioni: tappe (a2-blocco: hover −2 px e bordo del colore della tappa, active 0,98, focus oro; aperta = a tutta riga,
     aria-expanded); la striscia di 28 celle si accende sulla tappa aperta. */
  var TAPPE = [
    { k: 'b1', n: 1, r: 'Incontro 1', t: 'Di chi mi posso fidare?', d: 'Il racconto dell’estate, il metodo dell’anno e il patto di confronto. Siete qui.', oggi: true },
    { k: 'b2', n: 4, r: 'Incontri 2–5', t: 'Gesù: quali tracce?', d: 'Le tracce di Gesù nella storia: che cosa dicono davvero i documenti antichi, e dove si fermano.' },
    { k: 'b3', n: 4, r: 'Incontri 6–9', t: 'Quattro Vangeli, una Pasqua', d: 'Perché quattro racconti; una parabola; la Pasqua ebraica e la Cena; il racconto pasquale.' },
    { k: 'b4', n: 4, r: 'Incontri 10–13', t: 'Quando credere costa', d: 'Persecuzioni e martiri, le svolte del 313 e del 380, la libertà anche per chi crede diversamente.' },
    { k: 'b5', n: 1, r: 'Incontro 14', t: 'Verifica rovesciata', d: 'Il docente sbaglia apposta: correggete voi, documenti alla mano.' },
    { k: 'b6', n: 4, r: 'Incontri 15–18', t: 'Una comunità che sa riparare', d: 'Gli Atti degli Apostoli, i simboli delle catacombe, un perdono che non rinuncia alla responsabilità.' },
    { k: 'b7', n: 4, r: 'Incontri 19–22', t: 'Concili e immagini', d: 'Parole e immagini che hanno cambiato la cultura: i concili, le icone e i mosaici di Ravenna.' },
    { k: 'b8', n: 6, r: 'Incontri 23–28', t: 'Talenti in gruppo', d: 'In gruppi di 3–4, su un tema libero, ognuno mette in risalto ciò che sa fare e il gruppo lo rende utile agli altri.', e: 'Nella parabola di Mt 25,14-30 il «talento» è una somma di denaro: il senso di «capacità» è un uso successivo.' }
  ];
  LabLezione.registra('Programma', function (p) {
    var s = useMem('pr-aperta', null), aperta = s[0], setAperta = s[1];
    var acceso = aperta === null ? 'b1' : TAPPE[aperta].k;
    var celle = [];
    TAPPE.forEach(function (t) { for (var k = 0; k < t.n; k++) celle.push({ b: t.k, first: k === 0 }); });
    return html`<div>
      <div className="a2-strip" aria-hidden="true">${celle.map(function (c, k) { return html`<span key=${k} className=${'a2-cell' + (c.first ? ' first' : '') + (c.b === acceso ? ' is-active' : '')} data-b=${c.b}></span>`; })}</div>
      <div className="a2-legend" aria-hidden="true"><span>Incontro 1</span><span>Incontro 28</span></div>
      <div className="a2-blocchi">${TAPPE.map(function (t, k) {
        var on = aperta === k;
        return html`<button key=${t.k} type="button" className="a2-blocco" data-b=${t.k} aria-expanded=${on} onClick=${function () { setAperta(on ? null : k); }}>
          <small>${t.r}${t.oggi ? html`<em>oggi</em>` : null}</small><b>${t.t}</b>
          ${on ? html`<p>${t.d}${t.e ? html`<span>${t.e}</span>` : null}</p>` : null}
        </button>`;
      })}</div>
    </div>`;
  });
})();
