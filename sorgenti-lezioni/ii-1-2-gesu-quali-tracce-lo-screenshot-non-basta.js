/* ---- lezione ---- */
/* Classe II · UDA 1 «Gesù: quali tracce?» · Lezione 2 — «Lo screenshot non basta».
   Artefatto interattivo, 3 ottobre 2026. Contenuti dal dossier docente/II 1-2 …-contenuti.md (2 ottobre 2026).
   Testi antichi: traduzioni originali dal latino (Tacito, Annali XV,44 secondo DCC; Plinio, Lettere X,96-97 secondo The Latin Library),
   ricontrollate sul latino il 3 ottobre 2026. Dei Verbum 19: testo italiano della Santa Sede. Etimologie: Vocabolario Treccani.
   © Matteo Sestili — Tutti i diritti riservati */
window.LEZIONE = {
  slug: 'ii-1-2-gesu-quali-tracce-lo-screenshot-non-basta',
  classe: 'Anno II',
  titolo: 'Lo screenshot *non basta*',
  sottotitolo: 'Tacito, Plinio e Traiano: che cosa dicono le fonti romane su Gesù e sui primi cristiani, e dove ci fermiamo.',
  saluto: 'Ultima tappa: allora, lo screenshot basta?',
  glossario: {
    'fonte': { etim: 'dal latino *fons, fontis*, «sorgente»', def: 'Una traccia del passato da cui ricaviamo informazioni: un testo, un’iscrizione, un oggetto. Si interroga con una domanda precisa: non risponde a tutto.' },
    'annali': { parola: 'Annali', etim: 'dal latino *annales*, legato ad *annus*, «anno»', def: 'Racconto storico ordinato anno per anno. Gli *Annali* di Tacito narrano la storia di Roma dalla morte di Augusto agli anni di Nerone.' },
    'superstitio': { parola: 'superstitio', etim: 'parola latina: qui conta il valore negativo che le danno gli autori romani', def: 'Con questa parola Tacito e Plinio giudicano il culto dei cristiani: un culto estraneo, pericoloso per l’ordine religioso di Roma. È il loro giudizio, non una descrizione neutra da fare nostra.' },
    'punto di vista': { def: 'Lo scopo e i giudizi di chi scrive. Non vuol dire che ogni informazione sia inventata: si separa la notizia dal giudizio.' },
    'prefetto': { etim: 'dal latino *praefectus*, «preposto, messo a capo» (da *praeficere*)', def: 'Il titolo di Ponzio Pilato come governatore della Giudea, inciso sulla pietra trovata a Cesarea Marittima nel 1961. Tacito lo chiama invece *procurator*, il titolo dei governatori venuti dopo.' },
    'distanza temporale': { def: 'Il tempo che separa un fatto dal testo che lo racconta. Non rende vero o falso un racconto: dice se l’autore poteva essere presente.' },
    'attestare': { etim: 'dal latino *attestari*, da *testis*, «testimone»', def: 'Rendere testimonianza di qualcosa. Una fonte attesta ciò che ha visto o raccolto; non dimostra, per questo, tutto ciò che è compatibile con il testo.' },
    'portata': { def: 'Ciò che un documento permette di affermare, rispetto a una domanda. Una lettera sui processi ha una portata diversa da una biografia.' },
    'epistola': { parola: 'Epistola', etim: 'dal latino *epistula, epistola*, dal greco *epistolḗ*, legato a *epistéllō*, «inviare»', def: 'Una lettera: qualcosa che si manda. Quella di Plinio è corrispondenza ufficiale fra un governatore e l’imperatore, non una lettera religiosa né un diario.' },
    'incarnazione': { parola: 'Incarnazione', etim: 'dal latino ecclesiastico *incarnatio*, da *caro, carnis*, «carne»', def: 'Per la fede cristiana, il Figlio di Dio che si fa uomo in una vicenda reale, in un popolo e in un tempo precisi.' }
  },
  scene: [
    /* 1 · Aggancio — il caso ipotetico dello screenshot (anello 1) */
    { fase: 'Aggancio', momento: 'Apertura', minuti: 4, titolo: 'Lo *screenshot*',
      lead: 'Gira un post: una frase antica, un nome famoso, una conclusione sicura.',
      blocchi: [
        { tipo: 'custom', nome: 'Ritaglio', props: { modo: 'post' } },
        { tipo: 'domanda', id: 'ingresso', etichetta: 'Anonimo · per alzata di mano', q: 'Che cosa vale, per voi, questo post?',
          opzioni: ['Prova tutto: è una fonte antica', 'Prova tutto: l’autore non è cristiano', 'Dice qualcosa, ma devo saperne di più', 'Niente: è solo un ritaglio'],
          dibattito: 'Teniamo i voti. Alla fine rifaremo la stessa domanda, dopo aver restituito alla frase ciò che il ritaglio le ha tolto.' }
      ] },

    /* 2 · Tacito: il ritaglio si allarga (anelli 1-3) */
    { fase: 'Scoperta', momento: 'Fonte', minuti: 7, titolo: 'Che cosa ha *tolto* il ritaglio?',
      lead: 'Il ritaglio ha tolto autore, data e contesto. **Per questo** allarghiamo l’inquadratura: a ogni passo, una domanda da fare a ogni {fonte}.',
      blocchi: [
        { tipo: 'custom', nome: 'Ritaglio', props: { modo: 'allarga' } },
        { tipo: 'aggancio', etichetta: 'Per capire', titolo: 'Procuratore o prefetto?',
          t: 'Tacito chiama Pilato *procurator*, il titolo dei governatori della Giudea venuti dopo di lui. Una pietra trovata a Cesarea Marittima nel 1961 lo chiama *praefectus*, {prefetto}. Il testo si legge com’è: la precisazione è nostra.',
          fonte: 'Tacito, Annali XV,44,3; iscrizione di Pilato, Cesarea Marittima (oggi all’Israel Museum)' }
      ] },

    /* 3 · Distanza temporale: Tacito lontano, Plinio vicino (anelli 3-4) */
    { fase: 'Scoperta', minuti: 4, titolo: 'Quanto è *lontano* chi scrive?',
      lead: 'Quando scrive chi scrive? Tocca un autore: ecco la {distanza temporale} fra fatti e testo.',
      blocchi: [
        { tipo: 'custom', nome: 'DueDate', props: {} },
        { tipo: 'verifica', etichetta: 'Verifica lampo', q: 'Tacito scrive più di settant’anni dopo la morte di Gesù. Che cosa ne segue?',
          opzioni: ['Il suo racconto è inventato', 'Non è un testimone oculare: da dove viene la notizia?', 'Ha copiato il verbale dagli archivi di Roma', 'È testimone oculare, perché è uno storico'], ok: 1,
          why: 'La distanza non rende falso un racconto, ma impedisce di trattarlo come la parola di chi c’era. In questo passo Tacito non dice come ha saputo di Cristo: parlare di archivi sarebbe aggiungere al testo ciò che non c’è.' }
      ] },

    /* 4 · Plinio: procedura, pratica, condizioni, giudizio (anello 4) */
    { fase: 'Scoperta', momento: 'Fonte', minuti: 5, titolo: 'Plinio *interroga*',
      lead: '**Eppure** una fonte può essere vicinissima ai fatti. Intorno al 112 Plinio, governatore in Asia Minore, scrive a Traiano un’{epistola}: non sa come trattare i cristiani.',
      blocchi: [
        { tipo: 'leggi', q: 'Quale frase descrive che cosa facevano i cristiani?',
          testo: '«Ho chiesto loro [[se fossero cristiani::**Procedura.** È ciò che fa Plinio: su questo è testimone diretto, perché i processi sono suoi.]]; […] chi perseverava, l’ho fatto condurre a morte. […] Altri dicevano di esserlo stati, ma di aver smesso. Affermavano che tutta la loro colpa, o il loro errore, era riunirsi in un giorno stabilito, prima dell’alba, e cantare fra loro, a voci alterne, [[!un inno a Cristo come a un dio::**Pratica.** È ciò che facevano i cristiani, secondo chi aveva lasciato la comunità. Plinio non l’ha visto: lo riferisce.]]. […] Ho ritenuto necessario cercare la verità da due schiave chiamate *ministrae*, [[anche con la tortura::**Condizioni.** Plinio cerca conferme con la forza: conta anche come una notizia è stata ottenuta.]]. Non ho trovato altro che una [[superstizione perversa e smisurata::**Giudizio.** È la valutazione di Plinio, non una descrizione di che cosa facevano.]].»',
          fonte: 'Plinio il Giovane, Lettere X,96,3.6-8 (intorno al 112). Traduzione originale, estratti' }
      ] },

    /* 5 · Portata dell'attestazione: culto di Cristo ≠ prova della sua divinità (anello 4, concetto più difficile) */
    { fase: 'Scoperta', minuti: 6, titolo: 'Fin dove arriva la *luce*?',
      lead: '**Perciò** chiediamoci quale sia la {portata} della lettera: una fonte è come una torcia. Illumina qualcosa, non tutto. Decidete voi che cosa cade nel fascio.',
      blocchi: [
        { tipo: 'custom', nome: 'Fascio', props: {} }
      ] },

    /* 6 · Traiano: la risposta intera (anello 5) */
    { fase: 'Scoperta', momento: 'Fonte', minuti: 5, titolo: 'La risposta *intera*',
      lead: '**Poiché** Plinio chiede un criterio, Traiano risponde. Prima guardiamo un ritaglio della risposta, poi la lettera intera.',
      blocchi: [
        { tipo: 'custom', nome: 'Forbici', props: {} },
        { tipo: 'aggancio', etichetta: 'Con onestà', titolo: 'Una lettera, non tre secoli',
          t: 'La risposta di Traiano è una **norma**: dice come agire, non quante persone furono condannate. E documenta un luogo e un momento: non autorizza a immaginare una persecuzione continua e identica in tutto l’Impero per tre secoli.',
          fonte: 'Traiano a Plinio, Lettere X,97' }
      ] },

    /* 7 · Pausa gioco: Sfida a squadre (anelli 2-5) */
    { fase: 'Attività', momento: 'Pausa gioco', minuti: 7, titolo: 'A quale fonte lo *chiedi*?',
      testo: 'Per ogni domanda: quale documento può rispondere? Prima chiedetevi **chi scrive** e **di che cosa parla**. Attenzione alla quarta risposta: a volte **nessuno dei tre**.',
      blocchi: [
        { tipo: 'gioco', id: 'sfida', titolo: 'Sfida a squadre', testo: 'Due squadre, otto domande, venti secondi a turno: chi sbaglia lascia la domanda all’altra squadra, che può rubarla.', pulsante: 'Si gioca' },
        { tipo: 'rivela', titolo: 'Al ritorno', iniziali: 1, pulsante: 'Altra domanda', passi: [
          { titolo: 'La più discussa', testo: 'Quale domanda ha diviso di più le squadre, e perché?' },
          { titolo: 'Nessuno dei tre', testo: 'Perché a volte la risposta giusta era «nessuno dei tre»?' }
        ] }
      ] },

    /* 8 · Sintesi: diffusione documentata e fede della Chiesa (anello 6, impronta) */
    { fase: 'Chiusura', momento: 'Sintesi', minuti: 6, titolo: 'Dove ci *fermiamo*',
      lead: '**Quindi**: perché abbiamo queste voci romane, e dove si fermano? Agganciamo gli anelli, poi proviamo a toglierne uno.',
      blocchi: [
        { tipo: 'catena', titolo: 'Dalla croce alle lettere', rottura: true,
          anelli: [
            { t: 'Una fede si diffonde', d: 'Gerusalemme, intorno al 30; Roma, 64: per Tacito i condannati sono «una moltitudine enorme»; Bitinia-Ponto, intorno al 112.', senza: 'Senza comunità cristiane non ci sarebbero accusati: niente processi, niente lettere.' },
            { nesso: 'Ma', t: 'La fedeltà incontra il potere', d: 'Roma chiede gesti di culto agli dèi e all’imperatore; chi è davvero cristiano, si dice, non maledice Cristo.', senza: 'Senza questo conflitto Plinio non avrebbe bisogno di chiedere un criterio.' },
            { nesso: 'Per questo', t: 'Il conflitto lascia documenti', d: 'Tacito racconta la repressione di Nerone; Plinio chiede un criterio e Traiano risponde.', senza: 'Senza questi testi perderemmo queste voci romane: non ogni traccia di Gesù, che resta nelle fonti cristiane.' },
            { nesso: 'Così', t: 'Abbiamo fonti esterne alla fede', d: 'Attestano una morte sotto Pilato, processi e un culto a Cristo: con la loro portata, non oltre.', senza: 'Senza sguardi esterni resterebbero solo le testimonianze dei credenti: la vicenda di Gesù non sparirebbe, ma mancherebbe una voce da fuori.' }
          ],
          fine: 'Che Cristo sia il Figlio di Dio, queste lettere non possono dirlo: è la domanda della fede.' },
        { tipo: 'citazione',
          testo: 'La santa madre Chiesa ha ritenuto e ritiene con fermezza […] che i quattro suindicati Vangeli, di cui afferma senza esitazione la storicità, trasmettono fedelmente quanto Gesù Figlio di Dio, durante la sua vita tra gli uomini, effettivamente operò e insegnò.',
          fonte: 'Concilio Vaticano II, Dei Verbum, n. 19 (1965)',
          pulsante: 'Chi parla qui?',
          commento: 'Qui parla la **fede della Chiesa**, non Tacito o Plinio. Per la Chiesa il Figlio di Dio si è fatto uomo in una vicenda reale, con una data e un governatore: è l’{Incarnazione|incarnazione}. Le fonti romane mostrano che quella vicenda ha lasciato tracce; riconoscervi il Figlio di Dio resta un **atto di fede**, con le sue ragioni, non una deduzione da due lettere. E anche i Vangeli, dice lo stesso numero, si leggono come testimonianza, predicazione e redazione.' }
      ] },

    /* 9 · Prova breve */
    { fase: 'Chiusura', momento: 'Prova', minuti: 4, titolo: 'Correggiamo il *post*',
      lead: 'Un nuovo post: «Tacito vide Gesù, Plinio confermò tutti i Vangeli, Traiano diede ai cristiani la libertà». Correggiamolo, una frase alla volta.',
      blocchi: [
        { tipo: 'quiz', etichetta: 'Prova', domande: [
          { q: '«Tacito vide Gesù.» Quale correzione è giusta?',
            opzioni: ['Vero: è uno storico romano del I secolo', 'Tacito scrive all’inizio del II secolo: riferisce la morte di Cristo sotto Pilato, ma non era presente', 'Tacito non parla mai di Cristo', 'Tacito racconta negli Annali la vita di Gesù'], ok: 1,
            why: 'Tacito ricorda una condanna avvenuta sotto Tiberio, decenni prima di scrivere, e qui non dice da dove abbia la notizia: è una fonte su Cristo, non un testimone oculare.' },
          { q: '«Plinio confermò tutti i Vangeli.» Quale correzione è giusta?',
            opzioni: ['Plinio attesta processi in Bitinia e un culto a Cristo «come a un dio», riferito da ex cristiani', 'Plinio confrontò i quattro Vangeli in tribunale', 'Plinio dimostrò che Cristo è Dio', 'Plinio non nomina mai i cristiani'], ok: 0,
            why: 'La lettera è vicina ai suoi processi, non alla vita di Gesù: attesta una pratica dei cristiani, non la verità dei racconti evangelici.' },
          { q: '«Traiano diede ai cristiani la libertà.» Quale correzione è giusta?',
            opzioni: ['Vero: vietò di ricercarli d’ufficio', 'Vero: rifiutò le denunce anonime', 'No: chi è denunciato e resta cristiano va punito', 'No: ordinò di ricercarli casa per casa'], ok: 2,
            why: 'Il ritaglio inganna: Traiano limita alcuni modi della repressione, ma la punizione di chi resta cristiano rimane.' },
          { q: 'Allora, che cosa valgono queste fonti?',
            opzioni: ['Più dei Vangeli, perché gli autori sono ostili', 'Niente, perché sono di parte', 'Tutto: confermano l’intero Vangelo', 'Ciò che attestano: una morte sotto Pilato, un culto a Cristo, i processi del II secolo'], ok: 3,
            why: 'Ostile non vuol dire più affidabile, e «di parte» non vuol dire inutile: a ogni testo si chiede ciò che può dire. Lo stesso metodo vale per tutti i documenti, anche per i Vangeli.' }
        ], perfetto: 'Post corretto: ogni frase al suo posto, con le sue ragioni.' }
      ] },

    /* 10 · Ritorno alla domanda iniziale */
    { fase: 'Chiusura', minuti: 2, titolo: 'Lo screenshot *basta*?',
      testo: '**La risposta:** Tacito ricorda una morte sotto Pilato; Plinio processi e un culto a Cristo; Traiano una norma che limita senza liberare. Per usarle chiediamo **chi parla, quando e di che cosa**, e ci fermiamo dove si ferma il testo.',
      blocchi: [
        { tipo: 'domanda', id: 'uscita', confronta: 'ingresso', etichetta: 'Di nuovo, a fine lezione', q: 'Che cosa vale, per voi, questo post?',
          opzioni: ['Prova tutto: è una fonte antica', 'Prova tutto: l’autore non è cristiano', 'Dice qualcosa, ma devo saperne di più', 'Niente: è solo un ritaglio'],
          dibattito: 'Se il voto si è spostato, chiediamo a chi ha cambiato idea che cosa l’ha convinto. Non c’è un punteggio sulle opinioni: conta la ragione.' }
      ] }
  ],

  studio: {
    sezioni: [
      { titolo: 'La domanda',
        testo: 'Un post gira in rete: una frase antica, il nome di Cristo, un autore romano e una conclusione sicura, «Uno storico romano conferma i Vangeli». Basta leggere la frase per sapere che cosa è accaduto? Prima di rispondere occorre restituirle ciò che il ritaglio ha tolto: chi scrive, quando, per quale scopo, di che cosa sta parlando.\n\nTacito, Plinio il Giovane e l’imperatore Traiano permettono di affrontare una domanda precisa: che cosa possiamo affermare su Gesù e sui primi cristiani attraverso testimonianze esterne alla loro fede, e dove dobbiamo fermarci?' },
      { titolo: 'Restituire alla frase il suo autore',
        testo: 'Una **fonte** storica (dal latino *fons*, «sorgente») è una traccia del passato da cui ricaviamo informazioni: un testo, un’iscrizione, un oggetto. La traccia non risponde a qualsiasi domanda: un elenco di condannati può attestare una repressione, ma non racconta necessariamente che cosa i condannati credessero. **Per questo**, prima di usare un documento, bisogna capire come è nato.\n\nServono alcune domande. Chi scrive, e con quale scopo? Quando scrive? La **data dell’evento** è il momento in cui qualcosa accade; la **data del testo** è il momento in cui qualcuno ne scrive. La **distanza temporale** fra le due non rende falso un racconto, ma impedisce di trattarlo come la parola di chi era presente. Che tipo di testo è? Una narrazione storica e la lettera di un governatore hanno scopi diversi. Infine: che cosa è **informazione** e che cosa è **giudizio**? Dire che un gruppo esiste e definirlo pericoloso sono due affermazioni diverse: la prima si controlla come notizia, la seconda esprime il **punto di vista** dell’autore.' },
      { titolo: 'Tacito: un’origine ricordata dentro una repressione',
        testo: 'Tacito è uno storico e senatore romano. Compone gli *Annali* all’inizio del II secolo; il titolo viene dal latino *annus*, «anno», perché il racconto è ordinato anno per anno. Nel libro XV, capitolo 44, tratta le conseguenze dell’incendio di Roma del **64 d.C.**, sotto Nerone: non sta scrivendo una vita di Gesù. Secondo il suo racconto, poiché non cessava la voce che l’incendio fosse stato ordinato, Nerone presentò come colpevoli i cristiani e li punì con pene raffinatissime. Il sospetto riferito non è, da solo, una prova: poco prima Tacito scrive che non si sa se l’incendio sia stato un caso o un delitto del principe (XV,38).\n\nPer spiegare chi siano i perseguitati, Tacito risale all’origine del loro nome: «Cristo, da cui veniva quel nome, era stato messo a morte sotto Tiberio, per opera del procuratore Ponzio Pilato» (XV,44,3). È una notizia concreta, che lega Cristo a una condanna capitale, a Tiberio e a Pilato, riferita da un autore estraneo alla fede cristiana. **Ma** Tacito scrive più di settant’anni dopo quella morte: non è un testimone oculare e in questo passo non dice da dove ricavi l’informazione. Non possiamo quindi affermare che abbia letto un verbale del processo negli archivi di Roma.\n\nTacito chiama Pilato *procurator*, il titolo dei governatori della Giudea venuti dopo di lui; una pietra trovata a Cesarea Marittima nel 1961 lo chiama *praefectus*, prefetto. La parola dell’autore va distinta dalla precisazione che oggi possiamo fare. Anche il lessico ostile chiede attenzione: «funesta superstizione», *superstitio*, esprime la valutazione religiosa di un romano, non una definizione neutra da fare nostra.' },
      { titolo: 'Plinio: una lettera scritta mentre si decide',
        testo: '**Eppure** una fonte può essere vicinissima ai fatti che racconta. Intorno al **112 d.C.** Plinio il Giovane governa la provincia di Bitinia-Ponto, in Asia Minore, oggi parte della Turchia. Scrive all’imperatore Traiano un’*epistola*, cioè una lettera (dal latino *epistula*, che riprende il greco *epistolḗ*, legato al verbo «inviare»): è corrispondenza ufficiale. Dichiara di non aver mai partecipato a processi contro cristiani e chiede un criterio: si punisce il nome di cristiano in quanto tale, oppure i delitti legati a quel nome? La lettera, conservata come X,96, riguarda i processi che egli stesso conduce: su questi è testimone diretto, non sulla vita di Gesù.\n\nPlinio riferisce la sua procedura: chiedeva agli accusati se fossero cristiani, ripeteva la domanda una seconda e una terza volta minacciando il supplizio, faceva condurre a morte chi perseverava. Chi negava doveva invocare gli dèi, supplicare con incenso e vino l’immagine dell’imperatore e maledire Cristo. Riporta poi le dichiarazioni di persone che avevano lasciato la fede: erano soliti riunirsi in un giorno stabilito, prima dell’alba, e «cantare fra loro, a voci alterne, un inno a Cristo come a un dio» (X,96,7), impegnandosi a non commettere furti, rapine e adulteri e a non tradire la parola data; poi si ritrovavano per prendere un cibo comune e innocuo. Per verificare, Plinio fece interrogare anche con la tortura due schiave chiamate *ministrae*, e concluse di non aver trovato altro che una «superstizione perversa e smisurata». Nella stessa lettera stanno dunque una procedura, una pratica riferita, le condizioni in cui l’informazione è stata ottenuta e un giudizio.' },
      { titolo: 'Fin dove arriva una fonte',
        testo: '**Perciò** occorre chiedersi quale sia la **portata** di un documento, cioè che cosa permette di affermare. *Attestare* viene dal latino *attestari*, da *testis*, «testimone»: una fonte testimonia ciò che ha visto o raccolto. La lettera di Plinio **attesta che quelle persone rendevano culto a Cristo**; non dimostra che Cristo sia Dio. Il primo enunciato riguarda una pratica religiosa riferita a un governatore; il secondo riguarda la verità di ciò che i fedeli credono. Confonderli significa passare da un livello all’altro senza un argomento. Allo stesso modo, dal solo accenno a un cibo comune non possiamo ricostruire l’Eucaristia: servono altre fonti.\n\nLa lettera attesta invece un dato importante: all’inizio del II secolo, lontano dalla Giudea, ci sono cristiani. Secondo Plinio sono molti, di ogni età e condizione, uomini e donne, e il «contagio» di quel culto ha raggiunto non solo le città ma anche i villaggi e le campagne (X,96,9). «Contagio» è il suo giudizio; la presenza dei cristiani nella provincia è la notizia.' },
      { titolo: 'Traiano: una limitazione che lascia la repressione',
        testo: '**Poiché** Plinio chiede un criterio, Traiano risponde (X,97). L’imperatore dispone che i cristiani non siano ricercati d’ufficio e che le denunce anonime non siano accolte, perché sarebbe un pessimo esempio, non degno del suo tempo. **Tuttavia**, se vengono denunciati e riconosciuti colpevoli, devono essere puniti; chi nega di essere cristiano e lo dimostra supplicando gli dèi ottiene il perdono.\n\nSe uno screenshot conservasse soltanto il divieto di ricercarli e il rifiuto delle denunce anonime, potremmo scambiarlo per il riconoscimento della libertà religiosa. Il resto della risposta impedisce questa conclusione: la direttiva limita alcuni modi della repressione, ma lascia la punizione di chi rimane cristiano. È anche un **testo normativo**, che dice come agire: non registra quante persone siano state effettivamente condannate. E documenta un luogo e un momento: non autorizza a immaginare una persecuzione continua e identica in tutto l’Impero per tre secoli.\n\nPer l’autorità romana i gesti del culto pubblico verificano l’inserimento nell’ordine religioso e politico. Per chi crede in Cristo, maledirlo non è un semplice adempimento: Plinio stesso riferisce che, a quanto si dice, chi è davvero cristiano non può esservi costretto (X,96,5). Il contrasto rende visibile una fedeltà che il potere non ottiene con la sola richiesta di obbedienza.' },
      { titolo: 'Dove arrivano le fonti, dove ci fermiamo',
        testo: '**Quindi** ogni documento risponde a domande diverse. A Tacito chiediamo quale origine attribuisca al nome dei cristiani e che cosa racconti della repressione di Nerone; a Plinio, quali processi conduca e quali pratiche gli vengano riferite; a Traiano, quale criterio stabilisca. Nessuno dei tre contiene una biografia di Gesù. L’ostilità di un autore non rende inutilizzabile ogni sua informazione, ma neppure lo rende automaticamente più affidabile; una fonte scritta da un credente non si scarta perché crede. **Il metodo vale per tutti i testi**, anche per quelli da cui ci aspettiamo una conferma.\n\nMesse insieme, le tre lettere mostrano un movimento che dalla Giudea, dove Cristo è messo a morte sotto Pilato intorno al 30, raggiunge Roma, dove nel 64 i cristiani condannati sono per Tacito «una moltitudine enorme», e l’Asia Minore, dove circa ottant’anni dopo la croce Cristo è al centro del culto di comunità lontane. Qui vediamo una delle radici di una storia che segnerà l’Europa.\n\nPer la Chiesa questo lavoro conta perché la fede cristiana afferma che il Figlio di Dio si è fatto uomo in una vicenda reale: l’**Incarnazione** (dal latino ecclesiastico *incarnatio*, da *caro*, «carne») non è l’apparizione di un personaggio senza tempo. Il Concilio Vaticano II afferma che i quattro Vangeli, «di cui afferma senza esitazione la storicità, trasmettono fedelmente quanto Gesù Figlio di Dio, durante la sua vita tra gli uomini, effettivamente operò e insegnò», e descrive il loro formarsi attraverso testimonianza, predicazione e redazione (*Dei Verbum* 19). È la fede della Chiesa e il suo modo di comprendere quei testi. Tacito e Plinio aiutano a riconoscere una realtà storica, senza decidere da soli la verità dell’annuncio cristiano: l’adesione alla fede resta un atto distinto dal riconoscimento di questi dati.' },
      { titolo: 'Per lo studio',
        testo: '1. Perché la data del testo di Tacito e quella dell’incendio di Roma devono restare distinte? Indica anche un’informazione che il passo riferisce su Cristo.\n\n2. Quale differenza c’è fra «Plinio riferisce il culto di Cristo come Dio» e «Plinio dimostra che Cristo è Dio»?\n\n3. Quale parte della risposta di Traiano impedisce di leggerla come un riconoscimento della libertà religiosa?\n\n4. Un post ipotetico afferma: «Tacito vide Gesù e Plinio confermò tutti i Vangeli». Correggi entrambe le affermazioni, poi formula una conclusione sostenuta dai documenti.' },
      { titolo: 'La risposta',
        testo: 'Leggendo Tacito e Plinio possiamo affermare che un autore romano collega Cristo a una condanna a morte sotto Tiberio, per opera di Pilato, e racconta la repressione dei cristiani a Roma nel 64; che all’inizio del II secolo, in Asia Minore, i cristiani vengono processati e rendono culto a Cristo «come a un dio»; che Traiano limita alcuni modi della repressione senza concedere libertà. Dobbiamo fermarci dove si fermano i testi: non sono testimonianze oculari della vita di Gesù, non confermano tutti i Vangeli e non dimostrano la verità della fede. Lo screenshot non basta: serve sapere chi parla, quando e di che cosa.' }
    ],
    fonti: [
      'Tacito, *Annali* XV,38 e XV,44,2-5. Testo latino e commento di M. Owen e I. Gildenhard, Dickinson College Commentaries: https://dcc.dickinson.edu/tacitus-annals/15-44 (consultato il 3 ottobre 2026). Traduzioni originali.',
      'Plinio il Giovane, *Lettere* X,96; Traiano a Plinio, *Lettere* X,97. Testo latino: The Latin Library, https://www.thelatinlibrary.com/pliny.ep10.html (consultato il 3 ottobre 2026). Traduzioni originali.',
      'Datazione degli *Annali*: University of Warwick, scheda «Tacitus». Lettera di Plinio intorno al 112: University of Edinburgh, carta della diffusione del cristianesimo (AD 112).',
      'Iscrizione di Ponzio Pilato, Cesarea Marittima (1961), oggi all’Israel Museum di Gerusalemme.',
      'Concilio Vaticano II, *Dei Verbum*, n. 19 (1965), testo italiano della Santa Sede, vatican.va.',
      '*Vocabolario Treccani*, voci «annali», «epistola», «fonte», «attestare», «prefetto», «incarnazione».',
      'P. Franchi, *Storia della Chiesa I (fino al 320)*, dispensa, pp. PDF 21-23 e 26-29.'
    ]
  },

  giochi: {
    tema: 'Lo screenshot non basta — Tacito, Plinio e Traiano',
    sfida: [
      { q: 'Chi spiega il nome dei cristiani con Cristo, messo a morte sotto Tiberio?', a: ['Tacito', 'Plinio', 'Traiano', 'Nessuno dei tre'], ok: 0 },
      { q: 'Chi riferisce un inno cantato a Cristo «come a un dio»?', a: ['Tacito', 'Plinio', 'Traiano', 'Nessuno dei tre'], ok: 1 },
      { q: 'Chi stabilisce che le denunce anonime non vanno accolte?', a: ['Tacito', 'Plinio', 'Traiano', 'Nessuno dei tre'], ok: 2 },
      { q: 'Quale documento racconta che cosa insegnò Gesù?', a: ['Tacito', 'Plinio', 'Traiano', 'Nessuno dei tre'], ok: 3 },
      { q: 'Quando compone gli Annali Tacito?', a: ['Nel 64, durante l’incendio', 'All’inizio del II secolo', 'Intorno al 30, sotto Pilato', 'Nel IV secolo'], ok: 1 },
      { q: '«Funesta superstizione», in Tacito, è…', a: ['una notizia sui cristiani', 'una frase dei Vangeli', 'il giudizio di Tacito', 'il titolo di Pilato'], ok: 2 },
      { q: 'Chi è vicinissimo ai fatti che racconta, perché sono i suoi processi?', a: ['Tacito', 'Plinio', 'Traiano', 'Nessuno dei tre'], ok: 1 },
      { q: 'Quale documento dimostra che Cristo è Dio?', a: ['Tacito', 'Plinio', 'Traiano', 'Nessuno dei tre'], ok: 3 }
    ],
    cat: { bins: ['Notizia riferita', 'Giudizio di chi scrive', 'Norma da applicare'], items: [
      ['Cristo fu messo a morte sotto Tiberio, per opera di Pilato', 0],
      ['«Una funesta superstizione»', 1],
      ['Dopo l’incendio del 64 Nerone colpisce i cristiani', 0],
      ['«Una superstizione perversa e smisurata»', 1],
      ['Si riunivano in un giorno stabilito, prima dell’alba', 0],
      ['Non devono essere ricercati d’ufficio', 2],
      ['Le denunce anonime non vanno accolte', 2],
      ['Chi nega e supplica gli dèi ottiene il perdono', 2],
      ['Il «contagio» di quel culto', 1],
      ['Plinio governa la Bitinia-Ponto intorno al 112', 0]
    ] },
    vf: [
      { s: 'Tacito era presente alla morte di Gesù.', v: false, why: 'Scrive all’inizio del II secolo, più di settant’anni dopo, e in questo passo non dichiara da dove abbia la notizia.' },
      { s: 'Tacito afferma con certezza che Nerone appiccò l’incendio.', v: false, why: 'Riferisce la voce che l’incendio fosse stato ordinato; poco prima scrive che non si sa se fu un caso o un delitto del principe (XV,38).' },
      { s: 'Plinio riferisce che i cristiani cantavano un inno a Cristo «come a un dio».', v: true, why: 'Lo dichiarano, negli interrogatori, persone che avevano lasciato la fede (X,96,7).' },
      { s: 'Plinio assistette alle riunioni dei cristiani.', v: false, why: 'Riferisce dichiarazioni raccolte nei processi, anche con la tortura: non descrive ciò che ha visto.' },
      { s: 'Traiano ordina di non ricercare i cristiani d’ufficio.', v: true, why: 'Sì, ma chi è denunciato e resta cristiano va punito (X,97).' },
      { s: 'Traiano riconosce ai cristiani la libertà religiosa.', v: false, why: 'Limita alcuni modi della repressione, ma la punizione resta: non è libertà religiosa.' },
      { s: 'Un autore ostile ai cristiani è sempre più affidabile.', v: false, why: 'L’ostilità lo rende una voce esterna, non per forza meglio informata: va interrogato con lo stesso metodo.' },
      { s: 'Le lettere di Plinio e Traiano documentano tre secoli di persecuzione continua.', v: false, why: 'Documentano un luogo e un momento, all’inizio del II secolo.' }
    ],
    quiz: [
      { q: 'Che cosa sta raccontando Tacito in Annali XV,44?', a: ['La vita di Gesù', 'La repressione dei cristiani dopo l’incendio di Roma del 64', 'Il processo a Gesù davanti a Pilato', 'Le persecuzioni del IV secolo'], ok: 1, why: 'Risale a Cristo solo per spiegare il nome dei perseguitati: il suo argomento è Nerone.' },
      { q: 'Perché Plinio scrive a Traiano?', a: ['Per raccontargli la vita di Gesù', 'Per chiedere di diventare cristiano', 'Perché non sa come trattare gli accusati di essere cristiani', 'Per denunciare un altro governatore'], ok: 2, why: 'Non ha mai partecipato a processi contro cristiani e chiede un criterio (X,96,1-2).' },
      { q: 'La lettera di Plinio attesta che…', a: ['Cristo è Dio', 'alcuni cristiani rendevano culto a Cristo come a un dio', 'il pasto comune era l’Eucaristia descritta nei Vangeli', 'Gesù aveva predicato in Bitinia'], ok: 1, why: 'Attesta una pratica riferita, non la verità di ciò che quei cristiani credevano.' },
      { q: 'Tacito chiama Pilato procurator. Sulla pietra di Cesarea il suo titolo è…', a: ['tetrarca', 'console', 'prefetto', 're'], ok: 2, why: '*Praefectus*: procurator è il titolo dei governatori della Giudea venuti dopo.' },
      { q: 'Che cosa chiede Plinio a chi nega di essere cristiano?', a: ['Di invocare gli dèi, supplicare l’immagine dell’imperatore e maledire Cristo', 'Di pagare una multa', 'Di lasciare la provincia', 'Di leggere i Vangeli in pubblico'], ok: 0, why: 'Per Roma questi gesti provano la lealtà; si dice che chi è davvero cristiano non possa esservi costretto (X,96,5).' },
      { q: 'Perché la risposta di Traiano non è libertà religiosa?', a: ['Perché ordina di cercare i cristiani ovunque', 'Perché chi è denunciato e resta cristiano va punito', 'Perché accetta le denunce anonime', 'Perché vale solo per Roma'], ok: 1, why: 'Vieta la ricerca d’ufficio e le denunce anonime, ma lascia la punizione.' }
    ],
    seq: [
      { t: 'Tiberio diventa imperatore', y: '14' },
      { t: 'Ponzio Pilato prefetto della Giudea', y: '26' },
      { t: 'Gesù messo a morte sotto Pilato', y: 'c. 30' },
      { t: 'Incendio di Roma e repressione di Nerone', y: '64' },
      { t: 'Lettera di Plinio a Traiano', y: 'c. 112' }
    ],
    abbina: [
      ['Annali', 'racconto ordinato anno per anno'],
      ['Epistola', 'lettera: qualcosa che si invia'],
      ['Superstitio', 'giudizio romano su un culto'],
      ['Prefetto', 'il titolo di Pilato sulla pietra'],
      ['Attestare', 'rendere testimonianza']
    ]
  }
};

/* =====================================================================
   Componenti della lezione (React con htm). Interazioni con <button> veri;
   hover / focus-visible / active in lezione.css o dalle classi del kit.
   ===================================================================== */
(function () {
  var I = LabLezione.inline;
  var useState = React.useState;
  /* Memoria in pagina: tornando a una scena, il componente riprende da dove era rimasto. Nulla va nel browser. */
  var MEM = {};
  function useMem(key, iniziale) {
    var s = useState(function () { return Object.prototype.hasOwnProperty.call(MEM, key) ? MEM[key] : iniziale; });
    return [s[0], function (v) { MEM[key] = v; s[1](v); }];
  }

  /* Icone in stile Lucide (24×24, tratto 2, currentColor) */
  var ICO = {
    torcia: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6c0 2-2 2-2 4v10a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V10c0-2-2-2-2-4V2h12z"/><path d="M6 6h12"/><path d="M12 12v.01"/></svg>`,
    sole: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>`,
    buio: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>`,
    forbici: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="6" cy="6" r="3"/><path d="M8.12 8.12 12 12"/><path d="M20 4 8.12 15.88"/><circle cx="6" cy="18" r="3"/><path d="M14.8 14.8 20 20"/></svg>`
  };

  /* ---------- Ritaglio: lo screenshot (scena 1) e l'inquadratura che si allarga (scena 2) ----------
     Tacito, Annali XV,44,2-3, traduzione originale. Quattro passi = quattro domande alla fonte.
     Interazioni: «Allarga l’inquadratura» (ll-btn: magnetico, lama di luce, active 0,96, focus oro),
     «Torna al ritaglio» (ll-link). */
  var TAC = {
    contesto: 'Ma né i soccorsi umani, né i doni del principe, né i riti per placare gli dèi facevano cadere la voce che l’incendio fosse stato ordinato. Perciò, per soffocare la voce, Nerone presentò come colpevoli e punì con pene raffinatissime quelli che il popolo chiamava cristiani, odiati per le loro nefandezze.',
    nucleo: 'Cristo, da cui veniva quel nome, era stato messo a morte sotto Tiberio, per opera del procuratore Ponzio Pilato',
    giudizio: 'repressa per il momento, quella funesta superstizione erompeva di nuovo, non solo in Giudea, origine di quel male, ma anche a Roma…'
  };
  var SCHEDA = [
    { q: 'Che cosa riferisce?', a: 'Una **notizia**: Cristo è stato messo a morte sotto Tiberio, per opera di Pilato.' },
    { q: 'Con quale giudizio?', a: 'Per Tacito i cristiani seguono una «funesta superstizione» (*{superstitio}*), un «male»: è il suo **{punto di vista}**, non una descrizione neutra.' },
    { q: 'Di che cosa sta parlando?', a: 'Della **repressione di Nerone** dopo l’incendio di Roma del 64, non di una vita di Gesù. La «voce» contro Nerone è un sospetto riferito, non una prova.' },
    { q: 'Chi scrive, quando, che testo è?', a: '**Tacito**, senatore e storico, negli *{Annali|annali}*, scritti all’inizio del II secolo: la **data del testo** non è la **data dei fatti**.' }
  ];

  LabLezione.registra('Ritaglio', function (p) {
    var s = useMem('ritaglio-' + p.modo, 0), k = s[0], setK = s[1];
    if (p.modo === 'post') {
      return html`<article className="rt-post" aria-label="Post immaginario con una frase di Tacito">
        <div className="rt-post-h"><span className="rt-av" aria-hidden="true">SV</span><span><b>storia.vera</b><small>Post immaginario · frase di Tacito, <i>Annali</i> XV,44,3</small></span></div>
        <figure className="rt-shot">
          <blockquote className="rt-q"><span className="rt-cut">…</span><span className="rt-core">${TAC.nucleo}</span><span className="rt-cut">…</span></blockquote>
          <p className="rt-src">Tacito</p>
        </figure>
        <p className="rt-post-c">Uno storico romano conferma i Vangeli. Fine della discussione.</p>
      </article>`;
    }
    var fine = k >= 3;
    function allarga() {
      var n = Math.min(3, k + 1); setK(n);
      if (n === 3) { p.ctx.cheer(); p.ctx.say('Ora sappiamo che cosa chiedergli: come un romano spiegava il nome dei cristiani.'); }
    }
    return html`<div className="rt">
      <div className="rt-grid">
        <figure className=${'rt-shot' + (k > 0 ? ' is-open' : '')}>
          ${k >= 3 && html`<figcaption className="rt-book is-new"><span className="la-meta">Tacito · senatore e storico</span><b>Annali, libro XV, 44</b><small>Scritti all’inizio del II secolo · raccontano il 64 d.C.</small></figcaption>`}
          <blockquote className="rt-q">
            ${k === 0 && html`<span className="rt-cut">…</span>`}
            ${k >= 2 && html`<span className=${'rt-p' + (k === 2 ? ' is-new' : '')}>${TAC.contesto} </span>`}
            <span className="rt-core">${TAC.nucleo}${k >= 1 ? '; ' : ''}</span>
            ${k >= 1 ? html`<span className=${'rt-p' + (k === 1 ? ' is-new' : '')}>${TAC.giudizio}</span>` : html`<span className="rt-cut">…</span>`}
          </blockquote>
          ${k < 3 && html`<p className="rt-src">Tacito</p>`}
        </figure>
        <div>
          <p className="la-meta rt-card-h">Carta d’identità della fonte</p>
          <ol className="rt-card" aria-live="polite">
            ${SCHEDA.map(function (r, i) {
              var on = i <= k;
              return html`<li key=${i} className=${'rt-row' + (on ? ' is-on' : '') + (i === k ? ' is-new' : '')}>
                <span className="rt-row-q">${r.q}</span>
                ${on ? html`<p>${I(r.a, 'r' + i)}</p>` : html`<p className="rt-row-wait">${i === k + 1 ? 'Che cosa vi aspettate?' : '…'}</p>`}
              </li>`;
            })}
          </ol>
        </div>
      </div>
      <div className="ll-row">
        ${!fine && html`<button className="ll-btn" onClick=${allarga}>Allarga l’inquadratura</button>`}
        <span className="ll-tally">Inquadratura ${k + 1} di 4</span>
        ${k > 0 && html`<button className="ll-link" onClick=${function () { setK(0); }}>Torna al ritaglio</button>`}
      </div>
      ${fine && html`<p className="ll-why is-ok" aria-live="polite"><strong>Ora sappiamo che cosa chiedergli. </strong>Come un romano spiegava il nome dei cristiani e come Nerone li colpì nel 64. Non che cosa Gesù abbia detto o fatto.</p>`}
    </div>`;
  });

  /* ---------- DueDate: data dei fatti e data del testo, per Tacito e per Plinio ----------
     Interazioni: due pillole-autore (dd-btn: hover bordo anno e −2 px, active 0,96, focus oro, premuto = pieno).
     SVG schematico: asse 0-130 d.C., fatti in oro sull’asse, testo nel colore dell’anno, archi tratteggiati. */
  var DD = {
    tac: { nome: 'Tacito', opera: 'Annali XV,44', fatti: 'intorno al 30, la morte di Cristo; 64, l’incendio di Roma', testo: 'inizio del II secolo: più di 70 anni dopo la morte di Cristo', esito: 'Non è un **testimone oculare**; in questo passo non dice da dove prenda la notizia su Cristo.' },
    pli: { nome: 'Plinio', opera: 'Lettere X,96', fatti: 'intorno al 112, i processi in Bitinia-Ponto', testo: 'intorno al 112, mentre li conduce: distanza quasi nulla', esito: 'È **vicinissimo ai fatti**: ma i fatti sono i suoi processi, non la vita di Gesù.' }
  };
  function X(y) { return 56 + y * 2.5; }

  LabLezione.registra('DueDate', function (p) {
    var s = useMem('dd-v', null), v = s[0], setV = s[1], sv = useMem('dd-visti', {}), visti = sv[0], setVisti = sv[1];
    function mostra(id) {
      setV(id); var o = Object.assign({}, visti); o[id] = 1; setVisti(o);
      if (o.tac && o.pli && !(visti.tac && visti.pli)) { p.ctx.cheer(); p.ctx.say('Lontano o vicino ai fatti: conta anche di quali fatti si parla.'); }
    }
    var D = v ? DD[v] : null;
    var ticks = [25, 50, 75, 100, 125];
    return html`<div className="dd">
      <div className="dd-pick" role="group" aria-label="Scegli un autore">
        ${['tac', 'pli'].map(function (id) {
          return html`<button key=${id} className=${'dd-btn' + (visti[id] ? ' is-seen' : '')} aria-pressed=${v === id} onClick=${function () { mostra(id); }}>${DD[id].nome}<small>${DD[id].opera}</small></button>`;
        })}
      </div>
      <svg className="dd-svg" viewBox="0 34 400 160" role="img" aria-label=${D ? D.nome + ': fatti ' + D.fatti + '; testo ' + D.testo : 'Linea del tempo da 0 a 130 dopo Cristo'}>
        <text className="dd-row" x="6" y="64">TESTO</text>
        <text className="dd-row" x="6" y="144">FATTI</text>
        <line className="dd-axis" x1="52" y1="140" x2="392" y2="140" />
        ${ticks.map(function (t) { return html`<g key=${t}><line className="dd-tick" x1=${X(t)} y1="135" x2=${X(t)} y2="145" /><text className="dd-lbl" x=${X(t)} y="161" text-anchor="middle">${t}</text></g>`; })}
        <text className="dd-lbl" x="392" y="128" text-anchor="end">d.C.</text>
        <rect className="dd-tib" x=${X(14)} y="146" width=${X(37) - X(14)} height="5" rx="2" />
        <text className="dd-lbl" x=${(X(14) + X(37)) / 2} y="182" text-anchor="middle">Tiberio</text>
        ${v === 'tac' && html`<g key="tac" className="dd-show">
          <path className="dd-arc" d=${'M' + X(102) + ' 72 Q' + X(40) + ' 76 ' + X(30) + ' 131'} />
          <path className="dd-arc" d=${'M' + X(106) + ' 72 Q' + X(72) + ' 92 ' + X(64) + ' 131'} />
          <rect className="dd-text" x=${X(100)} y="48" width=${X(120) - X(100)} height="24" rx="12" />
          <text className="dd-text-t" x=${X(110)} y="64.5" text-anchor="middle">Annali</text>
          <circle className="dd-fact" cx=${X(30)} cy="140" r="7" />
          <circle className="dd-fact" cx=${X(64)} cy="140" r="7" />
          <text className="dd-pin" x=${X(30)} y="124" text-anchor="middle">Cristo</text>
          <text className="dd-pin" x=${X(64) + 4} y="124" text-anchor="start">incendio</text>
          <text className="dd-dist" x=${X(52)} y="80" text-anchor="middle">70+ anni</text>
          <text className="dd-dist" x=${X(90)} y="104" text-anchor="middle">≈ 50 anni</text>
        </g>`}
        ${v === 'pli' && html`<g key="pli" className="dd-show">
          <path className="dd-arc" d=${'M' + X(112) + ' 72 L' + X(112) + ' 131'} />
          <rect className="dd-text" x=${X(112) - 24} y="48" width="48" height="24" rx="12" />
          <text className="dd-text-t" x=${X(112)} y="64.5" text-anchor="middle">X,96</text>
          <circle className="dd-fact" cx=${X(112)} cy="140" r="7" />
          <text className="dd-pin" x=${X(112) - 10} y="124" text-anchor="end">processi</text>
          <text className="dd-dist" x=${X(112) - 10} y="100" text-anchor="end">stessi mesi</text>
          <circle className="dd-ghost" cx=${X(30)} cy="140" r="7" />
          <text className="dd-ink" x=${X(30)} y="124" text-anchor="middle">vita di Gesù?</text>
        </g>`}
        ${!v && html`<text className="dd-ink" x="222" y="92" text-anchor="middle">Tocca un autore</text>`}
      </svg>
      ${D ? html`<dl key=${v} className="dd-cap dd-show" aria-live="polite">
          <dt>Fatti</dt><dd>${D.fatti}</dd>
          <dt>Testo</dt><dd>${D.testo}</dd>
          <dt>Quindi</dt><dd>${I(D.esito, 'e')}</dd>
        </dl>` : html`<p className="ll-hint" style=${{ marginTop: 13 }}>Prima Tacito, poi Plinio.</p>`}
      ${visti.tac && visti.pli && html`<p className="ll-why is-ok"><strong>Due distanze, due domande: </strong>a Tacito l’origine del nome, a Plinio i suoi processi.</p>`}
    </div>`;
  });

  /* ---------- Fascio: la portata della lettera di Plinio (concetto più difficile) ----------
     Una frase alla volta; la classe decide se cade nel fascio (la lettera lo attesta) o al buio (non può dirlo).
     Interazioni: due scelte la-choice (hover bordo oro +5 px, active 0,98, focus oro; esito verde/rosso con parola),
     «Prossima frase» (ll-btn), «Ricomincia» (ll-link). Le frasi collocate restano visibili nelle due zone. */
  var FA = [
    { t: 'Plinio processava persone accusate di essere cristiane.', dentro: true, why: 'Lo scrive lui stesso: sono i processi che conduce. Qui è **testimone diretto**.' },
    { t: 'Cristo è Dio.', dentro: false, why: 'La lettera attesta che alcuni lo veneravano **come** un dio, non che lo sia: la verità di ciò che si crede non è un dato d’archivio. È la domanda della fede.' },
    { t: 'Ex cristiani raccontavano di un inno cantato a Cristo «come a un dio».', dentro: true, why: 'È una **dichiarazione riferita**: la lettera attesta che lo dicevano, e quindi una pratica dei cristiani.' },
    { t: 'Plinio conosceva bene la vita di Gesù.', dentro: false, why: 'La lettera non dice nulla della vita di Gesù: parla dei processi e di ciò che dichiaravano gli accusati. Plinio ammette perfino di non sapere che cosa si punisca e fin dove si indaghi (X,96,1).' },
    { t: 'All’inizio del II secolo c’erano cristiani in Bitinia-Ponto.', dentro: true, why: 'Plinio li processa lì intorno al 112: lontano dalla Giudea, circa ottant’anni dopo la croce.' },
    { t: 'Il cibo comune di cui parla era l’Eucaristia descritta nei Vangeli.', dentro: false, why: 'Plinio dice soltanto che prendevano un cibo «comune e innocuo». Per dire di più servono altre fonti.' }
  ];

  LabLezione.registra('Fascio', function (p) {
    var s = useMem('fa-i', 0), i = s[0], setI = s[1], r = useMem('fa-ris', []), ris = r[0], setRis = r[1];
    var n = FA.length, fine = i >= n, cur = FA[i], ans = ris[i];
    var giuste = ris.filter(function (x) { return x && x.ok; }).length;
    function scegli(d) {
      if (ans) return;
      var ok = d === cur.dentro, c = ris.slice(); c[i] = { d: d, ok: ok }; setRis(c);
      if (ok) p.ctx.cheer(); else p.ctx.oops();
    }
    function avanti() {
      var j = i + 1; setI(j);
      if (j >= n) { if (giuste === n) p.ctx.festa(); p.ctx.say('Attestare viene da testis, testimone: la fonte testimonia, non dimostra.'); }
    }
    function chips(dentro) {
      return FA.map(function (f, j) {
        var a = ris[j]; if (!a || f.dentro !== dentro) return null;
        return html`<li key=${j} className=${'fa-chip' + (a.ok ? '' : ' is-ko')}>${!a.ok && html`<span className="fa-x" title="Collocata dopo la correzione">↺</span>`}${f.t}</li>`;
      });
    }
    function cls(d) {
      if (!ans) return 'la-choice';
      if (d === cur.dentro) return 'la-choice is-right';
      return 'la-choice ' + (ans.d === d ? 'is-wrong' : 'is-dim');
    }
    return html`<div className="fa">
      <div className="fa-src"><span className="fa-lamp">${ICO.torcia}</span><span><span className="la-meta">La torcia</span><b>Plinio, Lettere X,96</b></span><span className="ll-tally">${Math.min(ris.filter(Boolean).length, n)} / ${n}</span></div>
      ${!fine ? html`<div key=${i} className="fa-cur">
          <p className="fa-t">${I(cur.t, 'c' + i)}</p>
          <div className="la-choices fa-opts">
            <button className=${cls(true)} disabled=${!!ans} onClick=${function () { scegli(true); }}><span className="la-key">${ICO.sole}</span>Nel fascio: la lettera lo attesta</button>
            <button className=${cls(false)} disabled=${!!ans} onClick=${function () { scegli(false); }}><span className="la-key">${ICO.buio}</span>Al buio: non può dirlo</button>
          </div>
          <div aria-live="polite">${ans && html`<p className=${'ll-why ' + (ans.ok ? 'is-ok' : 'is-ko')}><strong>${ans.ok ? 'Esatto. ' : 'Non proprio. '}</strong>${I(cur.why, 'w' + i)}</p>`}</div>
          ${ans && html`<div className="ll-row"><button className="ll-btn" onClick=${avanti}>${i < n - 1 ? 'Prossima frase' : 'Guarda il fascio'}</button></div>`}
        </div>` : html`<p className="ll-why is-ok" aria-live="polite"><strong>${giuste} su ${n} al primo colpo. </strong>${I('La lettera attesta processi, dichiarazioni e un **culto di Cristo**; non dimostra che Cristo sia Dio. *{Attestare|attestare}* viene da *testis*, «testimone»: la fonte testimonia, non dimostra.', 'f')}</p>`}
      <div className="fa-zones">
        <div className="fa-zone fa-luce"><span className="la-meta">Nel fascio · lo attesta</span><ul>${chips(true)}</ul></div>
        <div className="fa-zone fa-buio"><span className="la-meta">Al buio · non può dirlo</span><ul>${chips(false)}</ul></div>
      </div>
      ${(fine || ris.length > 0) && html`<div className="ll-row"><button className="ll-link" onClick=${function () { setI(0); setRis([]); }}>Ricomincia</button></div>`}
    </div>`;
  });

  /* ---------- Forbici: il ritaglio della risposta di Traiano e la lettera intera ----------
     Traiano a Plinio, Lettere X,97, traduzione originale.
     Interazioni: previsione con due la-choice (selezione nel colore dell’anno), «Mostra la lettera intera» (ll-btn),
     «Rimetti il ritaglio» (ll-link). La previsione non riceve punteggio: serve a far vedere l’effetto del taglio. */
  var TRA = {
    a: 'Hai seguito la procedura che dovevi, mio Secondo, nell’esaminare le cause di coloro che ti erano stati denunciati come cristiani. Non si può infatti stabilire una regola generale, con una forma fissa.',
    b: 'Non devono essere ricercati d’ufficio;',
    c: 'se vengono denunciati e riconosciuti colpevoli, devono essere puniti, in modo tuttavia che chi nega di essere cristiano e lo dimostra con i fatti, cioè supplicando i nostri dèi, ottenga il perdono per il pentimento, anche se sospetto per il passato.',
    d: 'Le denunce presentate senza il nome dell’autore non devono avere spazio in nessuna accusa: sarebbe un pessimo esempio e non è degno del nostro tempo.'
  };

  var CONCL = [
    { t: 'Traiano riconosce la libertà religiosa', ok: false, why: 'È ciò che il ritaglio faceva credere. Ma chi è denunciato, riconosciuto colpevole e non rinnega **va punito**.' },
    { t: 'Traiano limita il modo di procedere, ma la punizione resta', ok: true, why: 'Niente ricerca d’ufficio, niente denunce anonime; chi resta cristiano va punito. È una **norma**: dice come agire, non quante condanne ci furono.' },
    { t: 'Traiano annulla i processi contro i cristiani', ok: false, why: 'Non li annulla: stabilisce come il governatore deve condurli, e chi rinnega supplicando gli dèi ottiene il perdono.' }
  ];

  LabLezione.registra('Forbici', function (p) {
    var s = useMem('fo-sc', null), sc = s[0], setSc = s[1], o = useMem('fo-aperto', false), aperto = o[0], setAperto = o[1];
    var c = useMem('fo-concl', null), con = c[0], setCon = c[1];
    function scegli(x) { if (sc) return; setSc(x); }
    function apri() { setAperto(true); }
    function concludi(i) { setCon(i); if (CONCL[i].ok) { p.ctx.cheer(); p.ctx.festa(); p.ctx.say('Una norma che limita, non una libertà.'); } else p.ctx.oops(); }
    function rimetti() { setAperto(false); setSc(null); setCon(null); }
    function cls(x) { return 'la-choice' + (sc === x ? ' is-sel' : sc ? ' is-dim' : ''); }
    function clsC(i) { return 'la-choice' + (con === i ? (CONCL[i].ok ? ' is-right' : ' is-wrong') : ''); }
    return html`<div className="fo">
      <figure className=${'rt-shot' + (aperto ? ' is-open' : '')}>
        <figcaption className="rt-book"><span className="la-meta">Traiano a Plinio</span><b>Lettere X,97</b></figcaption>
        <blockquote className="rt-q">
          ${aperto && html`<span className="rt-fade">${TRA.a} </span>`}
          <span className="rt-core">${TRA.b}</span>
          ${aperto ? html` <mark className="fo-cut is-new">${TRA.c}</mark> ` : html` <span className="fo-scissors" role="img" aria-label="Qui il ritaglio ha tagliato una parte">${ICO.forbici}[…]</span> `}
          <span className="rt-core">${TRA.d}</span>
        </blockquote>
      </figure>
      ${!aperto && html`<div>
        <h3 className="la-q fo-q">Da questo ritaglio, che cosa sembra decidere Traiano?</h3>
        <div className="la-choices">
          <button className=${cls('pace')} disabled=${!!sc} aria-pressed=${sc === 'pace'} onClick=${function () { scegli('pace'); }}><span className="la-key">A</span>Che i cristiani vanno lasciati in pace</button>
          <button className=${cls('puniti')} disabled=${!!sc} aria-pressed=${sc === 'puniti'} onClick=${function () { scegli('puniti'); }}><span className="la-key">B</span>Che i cristiani vanno puniti</button>
        </div>
        <div aria-live="polite">${sc && html`<p className="ll-gloss">${sc === 'pace' ? 'È ciò che il ritaglio fa credere.' : 'Dal ritaglio non si poteva capire.'} Al posto delle forbici c’era una frase intera.</p>`}</div>
        ${sc && html`<div className="ll-row"><button className="ll-btn" onClick=${apri}>Mostra la lettera intera</button></div>`}
      </div>`}
      ${aperto && html`<div>
        <h3 className="la-q fo-q">Ora, con la lettera intera: quale conclusione regge?</h3>
        <div className="la-choices">
          ${CONCL.map(function (x, i) { return html`<button key=${i} className=${clsC(i)} aria-pressed=${con === i} onClick=${function () { concludi(i); }}><span className="la-key">${'ABC'[i]}</span>${x.t}</button>`; })}
        </div>
        <div aria-live="polite">${con !== null && html`<p className=${'ll-why ' + (CONCL[con].ok ? 'is-ok' : 'is-ko')}><strong>${CONCL[con].ok ? 'Regge. ' : 'Non regge. '}</strong>${I(CONCL[con].why, 'w')}</p>`}
          ${con !== null && CONCL[con].ok && html`<p className="ll-gloss">${I('Per Roma, supplicare gli dèi prova la lealtà. Per chi crede, maledire Cristo non è una formalità: Plinio stesso annota che, a quanto si dice, chi è davvero cristiano non può esservi costretto (X,96,5).', 'g')}</p>`}</div>
        <div className="ll-row"><button className="ll-link" onClick=${rimetti}>Rimetti il ritaglio</button></div>
      </div>`}
    </div>`;
  });
})();
