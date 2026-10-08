/* ---- lezione ---- */
/* Classe IV · UDA 1 «Riformare una Chiesa, cambiare una cultura» · Lezione 1 — «Riformare una Chiesa: le indulgenze».
   Artefatto «Il denaro nella cassa», 7 ottobre 2026, rifatto con la skill «IRC · Artefatto interattivo della lezione»
   a partire dall'artefatto del 27 settembre 2026 e dal fascicolo (uploads/iv1-1r~1.pdf), che resta invariato.
   Fonti come nel fascicolo: Paolo VI, Indulgentiarum doctrina (1967); CCC 1472; Lutero, 95 tesi (testo latino,
   Taylor Editions, Oxford; traduzioni di servizio); lettera ad Alberto (forma indiretta); G. Martina (1993); Treccani;
   Cum postquam (1518); Trento, sess. XXI e XXV; Spes non confundit (2024). Controllo in rete limitato in questa
   sessione (vatican.va e Oxford non raggiungibili): vedi note del docente.
   La lezione 2 dell'UDA («Lutero a Worms») è già nel nuovo stile: qui non si anticipano bolla, scomunica e Worms.
   Il CSS della lezione è incorporato qui sotto (si inserisce da solo nel <head>): basta assemblare senza --css.
   Nessun dato salvato: voti e risposte restano solo nella pagina aperta.
   © Matteo Sestili — Tutti i diritti riservati */
window.LEZIONE = {
  slug: 'iv-1-1-riformare-una-chiesa-indulgenze',
  classe: 'Anno IV',
  titolo: 'Il denaro *nella cassa*',
  sottotitolo: 'Indulgenze, 1517: che cosa la Chiesa insegnava, che cosa accadeva davvero, quando una protesta ha buone ragioni.',
  saluto: 'Ultima tappa: rileggiamo la frase di partenza.',

  glossario: {
    'indulgenza': { parola: 'Indulgenza', etim: 'dal latino *indulgentia*, da *indulgere*, «essere benevolo, concedere»', def: 'Nella dottrina cattolica, la remissione davanti a Dio della pena temporale per peccati già perdonati quanto alla colpa. Non è il perdono dei peccati e non si compra.' },
    'colpa': { parola: 'Colpa', etim: 'dal latino *culpa*, «mancanza, responsabilità»', def: 'La rottura del rapporto con Dio causata dal peccato. Si rimette nel sacramento della penitenza, gratuitamente.' },
    'pena temporale': { etim: '*pena*: dal latino *poena*, che riprende il greco *poinḗ*, «ammenda, riparazione»', def: 'Ciò che il peccato lascia anche dopo il perdono: per il Catechismo «un attaccamento malsano alle creature, che ha bisogno di purificazione» (n. 1472). È l’unico piano su cui agisce l’indulgenza.' },
    'penitenza': { parola: 'Penitenza', etim: 'dal latino *paenitentia*, da *paenitere*, «pentirsi, provare rincrescimento»', def: 'Il pentimento e le opere che lo esprimono. Nei primi secoli, per i peccati gravi, era pubblica e spesso lunga; oggi è anche il nome del sacramento della confessione.' },
    'commutazione': { parola: 'Commutazione', etim: 'dal latino *commutatio*, da *commutare*, «scambiare» (*cum* + *mutare*, «cambiare»)', def: 'La sostituzione di un’opera di penitenza con un’altra. Già nei primi secoli i vescovi la permettevano: da qui, nei secoli, nascono le indulgenze.' },
    'elemosina': { parola: 'Elemosina', etim: 'dal latino tardo *eleemosyna*, dal greco *eleēmosýnē*, «compassione», da *éleos*, «pietà»', def: 'Un dono libero a chi ha bisogno o a un’opera buona. Nella pratica delle indulgenze era una delle opere possibili: se diventa un prezzo fisso, cambia natura.' },
    'suffragio': { parola: 'Suffragio', etim: 'dal latino *suffragium*, «voto, appoggio»', def: 'Per i defunti l’indulgenza si applica «a modo di suffragio»: i vivi pregano e offrono, ma l’esito resta nelle mani di Dio.' },
    'purgatorio': { parola: 'Purgatorio', etim: 'dal latino medievale *purgatorium*, da *purgare*, «purificare»', def: 'Per la fede cattolica, la purificazione dopo la morte di chi muore in grazia di Dio ma non ancora del tutto purificato. Non è l’inferno: chi vi si trova è già salvo.' },
    'dottrina': { parola: 'Dottrina', etim: 'dal latino *doctrina*, da *docere*, «insegnare»', def: 'Ciò che un’istituzione afferma e si impegna a sostenere con le sue ragioni: la sua finalità religiosa. Si critica mostrando che è falsa o incoerente.' },
    'procedura': { parola: 'Procedura', etim: 'dal francese *procédure*, dal latino *procedere*, «andare avanti»', def: 'Il modo in cui un’affermazione viene amministrata: chi concede che cosa, a quali condizioni, con quale controllo. Si critica mostrando che è sproporzionata, opaca o esposta al ricatto.' },
    'distorsione': { parola: 'Distorsione', etim: 'dal latino tardo *distorsio*, da *distorquere*, «torcere da una parte e dall’altra»', def: 'Ciò che accade davvero nella pratica e contraddice dottrina o procedura. Si critica mostrando i fatti.' },
    'fabbrica': { parola: 'Fabbrica di San Pietro', etim: 'dal latino *fabrica*, «officina, lavoro dell’artigiano», da *faber*, «artigiano»', def: 'L’ente che gestisce il cantiere della nuova basilica di San Pietro, iniziato nel 1506. A lui era destinata l’indulgenza predicata da Tetzel.' },
    'tesi': { parola: 'Tesi', etim: 'dal greco *thésis*, «il porre, posizione», da *títhēmi*, «porre»', def: 'Un’affermazione proposta per essere discussa. Le 95 tesi di Lutero sono materia per una disputa fra dotti, scritte in latino.' },
    'giubileo': { parola: 'Giubileo', etim: 'dal latino ecclesiastico *iubilaeus*, dal greco *iōbēlaîos*, dall’ebraico *yōbēl*, il corno di montone che annunciava l’anno; accostato poi a *iubilare*, «gridare di gioia»', def: 'L’Anno Santo, con un’indulgenza plenaria solenne. Il primo lo bandisce Bonifacio VIII nel 1300.' },
    'questori': { parola: 'Questori delle elemosine', etim: 'dal latino *quaestor*, da *quaerere*, «cercare, chiedere»', def: 'Gli esattori itineranti che raccoglievano le offerte legate alle indulgenze. Il Concilio di Trento ne abolisce nome e ufficio il 16 luglio 1562.' },
    'decretale': { parola: 'Decretale', etim: 'dal latino *decretalis (epistula)*, da *decretum*, «decisione»', def: 'Lettera del papa che stabilisce una norma. La decretale *Cum postquam* (1518) chiarisce la dottrina sulle indulgenze.' }
  },

  scene: [
    /* 1 · 0–3 · Aggancio: la frase e il sondaggio d'ingresso */
    { fase: 'Aggancio', momento: 'Apertura', minuti: 3, titolo: 'La Chiesa *vendeva* il perdono?',
      lead: 'Una frase che abbiamo sentito tutti. Prima di discuterla, contiamo che cosa ne pensa la classe.',
      blocchi: [
        { tipo: 'domanda', id: 'ingresso', etichetta: 'Anonimo · per alzata di mano',
          q: '«Nel Cinquecento la Chiesa vendeva il perdono dei peccati.»',
          opzioni: ['Vero', 'Vero in parte', 'Falso', 'Non lo so'],
          dibattito: 'Teniamo i voti. Alla fine rifaremo la stessa domanda: nel frattempo chiediamoci **che cosa, esattamente,** sarebbe stato venduto. Il perdono, una pena, un documento, una promessa?' }
      ] },

    /* 2 · 3–7 · Contesto: la catena del denaro (anello 1) */
    { fase: 'Scoperta', momento: 'Contesto', minuti: 4, titolo: 'Segui *il denaro*',
      lead: 'Primavera 1517, Jüterbog, vicino a Wittenberg: un frate domenicano predica un’{indulgenza}. Chi c’è dietro di lui?',
      blocchi: [
        { tipo: 'animazione', id: 'denaro', rapporto: 1.9, ritmo: 3200, pulsante: 'Segui il denaro',
          attori: [
            { id: 'lx', t: 'Leone X', forma: 'pillola', colore: 'oro' },
            { id: 'sp', t: 'San Pietro', forma: 'riquadro', colore: 'muted' },
            { id: 'al', t: 'Alberto', forma: 'pillola', colore: 'accent' },
            { id: 'fu', t: 'Fugger', forma: 'pillola', colore: 'ciano' },
            { id: 'te', t: 'Tetzel', forma: 'pillola', colore: 'accent' },
            { id: 'fe', t: 'Fedeli', forma: 'cerchio', colore: 'verde' },
            { id: 'fr', t: 'Sassonia: no', forma: 'pillola', colore: 'rosso' }
          ],
          frecce: [
            { id: 'f1', da: 'al', a: 'lx' },
            { id: 'f2', da: 'fu', a: 'al' },
            { id: 'f3', da: 'al', a: 'te' },
            { id: 'f4', da: 'te', a: 'fe', t: 'predica' },
            { id: 'f5', da: 'fe', a: 'sp', t: 'metà', tratteggio: true },
            { id: 'f6', da: 'fe', a: 'fu', t: 'metà', tratteggio: true }
          ],
          passi: [
            { didascalia: 'Roma: dal 1506 è aperto il cantiere della nuova basilica, la {Fabbrica|fabbrica} di San Pietro. Papa è Leone X.',
              attori: { lx: { x: 14, y: 18, on: true }, sp: { x: 14, y: 82 } } },
            { didascalia: '1513–1514: Alberto di Brandeburgo, a ventitré anni, riunisce tre diocesi, fra cui Magonza. Per tenerle deve versare a Roma una somma che non ha.',
              attori: { lx: { on: false }, al: { x: 50, y: 18, on: true } }, frecce: ['f1'] },
            { didascalia: 'Il banco dei Fugger di Augusta gli anticipa il denaro. Il rimborso è affidato alla predicazione di un’indulgenza.',
              attori: { al: { on: false }, fu: { x: 50, y: 50, on: true } }, frecce: ['f1', 'f2'] },
            { didascalia: 'Ultimo anello: il domenicano Johann Tetzel, sottocommissario, predica ai fedeli. Non agisce per conto proprio.',
              attori: { fu: { on: false }, te: { x: 86, y: 18, on: true }, fe: { x: 86, y: 82 } }, frecce: ['f1', 'f2', 'f3', 'f4'] },
            { didascalia: 'Le offerte si dividono: metà ad Alberto, che la gira ai Fugger; metà a Roma, per la basilica.',
              attori: { te: { on: false }, fe: { on: true } }, frecce: ['f3', 'f4', 'f5', 'f6'] },
            { didascalia: 'Nella Sassonia elettorale Federico il Saggio vieta quella predicazione: a Wittenberg custodisce reliquie con indulgenze proprie.',
              attori: { fe: { on: false }, fr: { x: 50, y: 82, on: true } }, frecce: ['f1', 'f2', 'f3', 'f4'] }
          ] },
        { tipo: 'aggancio', etichetta: 'Con onestà', titolo: 'Criticabile, ma non ancora la cosa predicata',
          t: 'Un debito bancario, una carriera ecclesiastica, un principe che decide che cosa si predica nel suo Stato: il contesto è **politico prima ancora che religioso**. Resta da capire che cosa Tetzel stesse offrendo.',
          fonte: 'G. Martina, Storia della Chiesa da Lutero ai nostri giorni, I, Morcelliana 1993; Treccani, voce «Johann Tetzel»; Britannica, «Albert of Brandenburg»' }
      ] },

    /* 3 · 7–12 · La fonte principale: la definizione (anello 2) */
    { fase: 'Scoperta', momento: 'Fonte', minuti: 5, titolo: 'Che cosa si *predicava*',
      lead: 'La formulazione più limpida è del 1967, ma mette in fila elementi già discussi nel Cinquecento. Leggiamola davvero.',
      blocchi: [
        { tipo: 'leggi', q: 'Quale frase dice che il perdono è già avvenuto, prima dell’indulgenza?',
          testo: '«L’indulgenza è la remissione dinanzi a Dio [[della pena temporale::È l’oggetto dell’indulgenza: la **pena**, non la colpa. Cercate la frase che dice che cosa è già successo prima.]] per i peccati, [[!già rimessi quanto alla colpa::Proprio qui: il **perdono** è avvenuto prima, nella confessione. L’indulgenza riguarda ciò che viene dopo.]], che il fedele, [[debitamente disposto::È una **condizione interiore**: il pentimento, che nessun pagamento produce. Importante, ma non è la frase che cerchiamo.]] e a determinate condizioni, acquista per intervento della chiesa, la quale, come ministra della redenzione, autoritativamente [[dispensa ed applica il tesoro delle soddisfazioni di Cristo e dei santi::La Chiesa **non crea** nulla: amministra un tesoro che considera di Cristo e dei santi, non suo.]].»',
          fonte: 'Paolo VI, costituzione apostolica Indulgentiarum doctrina, 1 gennaio 1967, Norme, n. 1 (testo italiano della Santa Sede)' },
        { tipo: 'aggancio', etichetta: 'Per capire', titolo: 'Che cosa vuol dire «indulgenza»?',
          t: '*Indulgentia* viene da *indulgere*, «essere benevolo, concedere». Nel latino della Chiesa indica una **concessione** sulla pena: il nome stesso non parla di vendita.',
          fonte: 'Vocabolario Treccani, voce «indulgenza»' }
      ] },

    /* 4 · 12–18 · Colpa e pena: il concetto più difficile (anello 3) */
    { fase: 'Scoperta', momento: 'Spiegazione', minuti: 6, titolo: 'Che cosa resta *dopo il perdono*',
      lead: 'Due piani da non confondere: la {colpa} e la {pena temporale}. Per ogni gesto, decidete che cosa cambia.',
      blocchi: [
        { tipo: 'custom', nome: 'DuePiani', props: {} },
        { tipo: 'verifica', etichetta: 'Verifica lampo', q: 'Allora, secondo la dottrina, chi riceve un’indulgenza ottiene…',
          opzioni: ['il perdono dei peccati che non ha ancora confessato', 'la remissione della pena temporale di peccati già perdonati', 'la certezza di non andare all’inferno', 'l’esonero dal confessarsi per un anno'], ok: 1,
          why: 'La colpa si rimette nella confessione, gratuitamente; la pena eterna non è in gioco. L’indulgenza agisce solo sulla **pena temporale**. Chi dice «vendevano il perdono» attribuisce alla dottrina una cosa che non afferma: resta da vedere che cosa accadeva nella pratica.' }
      ] },

    /* 5 · 18–21 · Da dove veniva la pratica (anello 4) */
    { fase: 'Scoperta', momento: 'Storia', minuti: 3, titolo: 'Da dove *viene*',
      lead: 'Le indulgenze non ci sono sempre state. Rimettete in ordine come sono nate.',
      blocchi: [
        { tipo: 'ordina', q: 'Dalla {penitenza} pubblica all’indulgenza',
          voci: [
            { t: 'Chi ha commesso peccati gravi compie una penitenza pubblica, spesso lunga, prima della riconciliazione', y: 'primi secoli' },
            { t: 'I penitenti chiedono l’intercessione dei martiri per una riconciliazione più rapida', y: 'primi secoli' },
            { t: 'I vescovi permettono di riscattare le penitenze «con altre opere, forse più facili»: la {commutazione}', y: 'primi secoli' },
            { t: 'L’assoluzione comincia a precedere la penitenza, invece di seguirla', y: 'Medioevo' },
            { t: 'Si concedono opere che sostituiscono tutta la penitenza: un pellegrinaggio, una preghiera, un’{elemosina}', y: 'Medioevo' }
          ],
          why: 'L’opera restava, e restava il pentimento. È qui che l’offerta in denaro entra nella storia, e da qui si capisce anche dove potesse **deformarsi** (Indulgentiarum doctrina, nn. 6–7).' }
      ] },

    /* 6 · 21–24 · Tre parole: dottrina, procedura, distorsione (anello 5) */
    { fase: 'Scoperta', momento: 'Spiegazione', minuti: 3, titolo: 'Tre parole da *non confondere*',
      lead: 'Ogni critica a un’istituzione colpisce un piano. Giriamo le carte.',
      blocchi: [
        { tipo: 'carte', carte: [
          { fronte: 'Dottrina', etichetta: 'che cosa si afferma', retro: 'La finalità religiosa: ciò che l’istituzione afferma e sostiene con le sue ragioni. **Si critica** mostrando che è falsa o incoerente.' },
          { fronte: 'Procedura', etichetta: 'come si amministra', retro: 'Chi concede che cosa, a quali condizioni, con quale controllo. **Si critica** mostrando che è sproporzionata, opaca o esposta al ricatto.' },
          { fronte: 'Distorsione', etichetta: 'che cosa accade', retro: 'Ciò che avviene davvero e contraddice dottrina o procedura. **Si critica** mostrando i fatti.' }
        ] },
        { tipo: 'mascotte', t: 'Una prima risposta alla domanda: una protesta ha buone ragioni quando colpisce il piano su cui il problema si trova **davvero**.' }
      ] },

    /* 7 · 24–30 · Pausa gioco: Sfida a squadre (anelli 1-5) */
    { fase: 'Attività', momento: 'Pausa gioco', minuti: 6, titolo: 'Sfida *a squadre*',
      testo: 'Due squadre, nove domande su ciò che abbiamo visto: il denaro, la dottrina, colpa e pena, le tre parole. Chi sbaglia lascia la domanda all’altra squadra, che può rubarla.',
      blocchi: [
        { tipo: 'gioco', id: 'sfida', titolo: 'Sfida a squadre', testo: 'Venti secondi a turno. Prima di toccare, la squadra dice **perché**.', pulsante: 'Si gioca' },
        { tipo: 'rivela', titolo: 'Al ritorno', iniziali: 1, pulsante: 'Altra domanda', passi: [
          { titolo: 'La più discussa', testo: 'Quale domanda ha diviso di più le squadre, e perché?' },
          { titolo: 'Colpa o pena?', testo: 'In una frase: perché «la Chiesa vendeva il perdono» confonde due piani?' }
        ] }
      ] },

    /* 8 · 30–34 · La distorsione documentata (anello 6) */
    { fase: 'Scoperta', momento: 'Fonte', minuti: 4, titolo: 'Che cosa andò *storto*',
      testo: 'Il problema era reale e lo registrano gli strumenti ordinari. Nel 1517 la prudenza sul {suffragio} salta perfino in un testo ufficiale: l’istruzione pubblicata a nome di Alberto dice che chi offre per un’anima del {purgatorio} **non ha bisogno di pentirsi**.',
      blocchi: [
        { tipo: 'citazione',
          testo: 'taluni esattori osavano addirittura promettere la liberazione di dannati dall’inferno, cioè la remissione dalla pena eterna, o tariffavano le i[ndulgenze] preoccupandosi solo di procurare abbondante denaro alla Chiesa.',
          fonte: 'Indulgenza, in Dizionario di Storia Treccani',
          pulsante: 'Quali deformazioni?',
          commento: 'Due, precise. **Promettere la liberazione di un dannato** significa far toccare all’indulgenza la pena eterna, che la dottrina esclude. **Tariffare** significa trasformare un’{elemosina}, gesto libero legato al pentimento, in un prezzo. Non è un eccesso di zelo: è il rovesciamento della cosa predicata.' },
        { tipo: 'verifica', etichetta: 'L’equivoco del distico', q: '«Appena la moneta tintinna nella cassa, l’anima vola via dal purgatorio.» Da dove viene questa frase?',
          opzioni: ['È scritta in una predica di Tetzel conservata', 'È una formula dell’istruzione ufficiale di Alberto', 'Non si trova in uno scritto di Tetzel: corrisponde alle sue idee, «se non proprio alle sue parole»', 'È un’invenzione dei protestanti senza alcun fondamento'], ok: 2,
          why: 'Lo storico Giacomo Martina attribuisce a Tetzel la stessa idea, ma il distico non compare in un suo scritto. Lutero lo cita nella tesi 27 come ciò che **predicano** alcuni. Non è una prova contro Tetzel e non è un’invenzione: è una voce che circola.' }
      ] },

    /* 9 · 34–39 · Prima di tutto una lettera: le tesi 27-28 (anello 7) */
    { fase: 'Scoperta', momento: 'Fonte', minuti: 5, titolo: 'Prima di tutto, una *lettera*',
      lead: 'Il primo gesto documentato di Martin Lutero, frate agostiniano e professore a Wittenberg, non è un martello su una porta.',
      blocchi: [
        { tipo: 'custom', nome: 'Lettera', props: {} }
      ] },

    /* 10 · 39–43 · Il livello cambia: 27-28, lettera, 36, 62 (anello 8) */
    { fase: 'Scoperta', momento: 'Spiegazione', minuti: 4, titolo: 'Quando il piano *cambia*',
      lead: 'Nello stesso foglio Lutero colpisce piani diversi. Per ogni richiesta, decidete voi su quale piano sta.',
      blocchi: [
        { tipo: 'custom', nome: 'Livelli', props: {} }
      ] },

    /* 11 · 43–46 · La correzione e il suo ritardo (anello 9) */
    { fase: 'Scoperta', momento: 'Storia', minuti: 3, titolo: 'La correzione e il suo *ritardo*',
      lead: 'La risposta cattolica fu, alla lunga, abolire l’abuso e confermare la dottrina. Ma quando?',
      blocchi: [
        { tipo: 'stima', q: 'Quanti anni passano fra le 95 tesi e il decreto di Trento sulle indulgenze?', min: 0, max: 100, passo: 1, valore: 46, tolleranza: 5, unita: 'anni', pulsante: 'Svela il dato',
          why: '**1517–1563.** La correzione arrivò, e arrivò tardi, benché le voci che la chiedevano ci fossero da tempo: nel 1563 la divisione dell’Occidente cristiano era compiuta. Esplorate le date qui sotto.',
          fonte: 'Concilio di Trento, sess. XXV, 4 dicembre 1563' },
        { tipo: 'tappe', voci: [
          { data: '1300', breve: 'Giubileo', titolo: 'Il primo Giubileo', testo: 'Bonifacio VIII bandisce il primo Anno Santo, il {giubileo}, con un’indulgenza plenaria solenne per chi si reca a Roma. Da allora, scrive la Treccani, le concessioni «si estesero come frequenza e misura del condono di pene».' },
          { data: '1512', breve: 'Egidio', titolo: 'Una voce dall’interno', testo: 'Il 3 maggio, aprendo il quinto Concilio Lateranense, il generale degli agostiniani Egidio da Viterbo dice che «gli uomini devono essere cambiati dalla religione, e non la religione dagli uomini». Il concilio si chiude il 16 marzo 1517 con decreti rimasti in gran parte sulla carta.' },
          { data: '1517', breve: 'Lettera', titolo: 'La lettera e le tesi', testo: 'Il 31 ottobre Lutero scrive ad Alberto e allega le {tesi}. Alberto non risponde e le trasmette a Roma.' },
          { data: '1518', breve: 'Cum postquam', titolo: 'Roma chiarisce la dottrina', testo: 'Il 9 novembre la {decretale} *Cum postquam* di Leone X ribadisce: la colpa si rimette con il sacramento, l’indulgenza riguarda la pena temporale, ai defunti si applica *per modum suffragii*. La procedura resta in piedi.' },
          { data: '1562', breve: 'Questori', titolo: 'Via gli esattori', testo: 'Il 16 luglio il Concilio di Trento abolisce in tutta la cristianità il nome e l’ufficio dei {questori} delle elemosine.' },
          { data: '1563', breve: 'Decreto', titolo: 'Il decreto sulle indulgenze', testo: 'Il 4 dicembre Trento riafferma la dottrina, chiede moderazione nelle concessioni e ordina di abolire i guadagni illeciti.' },
          { data: '1967', breve: 'Paolo VI', titolo: 'Indulgentiarum doctrina', testo: 'Paolo VI riconosce che «si infiltrarono talvolta degli abusi» (n. 8) e riduce drasticamente le concessioni: «poco si apprezza quello che si offre in abbondanza» (n. 12).' },
          { data: '2024', breve: 'Giubileo 2025', titolo: 'Spes non confundit', testo: 'Nella bolla del Giubileo 2025 papa Francesco chiede che «si annunci al popolo l’Indulgenza Giubilare» (n. 6). La pratica continua, senza tariffe né esattori.' }
        ] }
      ] },

    /* 12 · 46–50 · Prova breve e ritorno alla domanda */
    { fase: 'Chiusura', momento: 'Prova', minuti: 4, titolo: 'Quando una protesta ha *buone ragioni*?',
      lead: 'Un caso nuovo, poi la frase di partenza.',
      blocchi: [
        { tipo: 'quiz', etichetta: 'Prova breve', perfetto: 'Tre su tre: sapete dire su quale piano sta un problema.', domande: [
          { q: 'Caso inventato: una scuola chiede una quota per un viaggio; chi non paga resta escluso da un’attività didattica. «La quota non è proporzionata né controllata» colpisce…',
            opzioni: ['la dottrina: il fine del viaggio', 'la procedura: come si amministra la quota', 'la distorsione: ciò che accade davvero'], ok: 1,
            why: 'Riguarda condizioni e controlli: è una critica di **procedura**, legittima ma da dimostrare. «Il viaggio non serve» toccherebbe il fine.' },
          { q: 'Nello stesso caso, quale critica si verifica in pochi minuti e obbliga chi risponde a guardare i fatti?',
            opzioni: ['«Il viaggio non serve a niente»', '«La quota è decisa male»', '«Si sta vendendo l’accesso a un’attività che dovrebbe essere di tutti»'], ok: 2,
            why: 'È una critica di **distorsione**: usa contro la pratica il criterio che la scuola stessa dichiara. Come le tesi 27 e 28.' },
          { q: 'Quale frase sul 1517 è critica e insieme esatta?',
            opzioni: ['Un’istruzione ufficiale e molti predicatori trattavano come merce la remissione della pena, promettendo effetti che la dottrina escludeva', 'La Chiesa vendeva il perdono dei peccati', 'Nel 1517 non ci fu nessun abuso: fu solo propaganda'], ok: 0,
            why: 'Resta una critica dura, ma colpisce la **distorsione** e distingue la pena dalla colpa. La seconda confonde i piani; la terza nega fatti documentati.' }
        ] },
        { tipo: 'domanda', id: 'uscita', confronta: 'ingresso', etichetta: 'Di nuovo, a fine lezione',
          q: '«Nel Cinquecento la Chiesa vendeva il perdono dei peccati.»',
          opzioni: ['Vero', 'Vero in parte', 'Falso', 'Non lo so'],
          dibattito: 'Che la Chiesa abbia poi abolito l’abuso non rende ingiusta la protesta; che la protesta avesse ragione su quel punto non significa che l’avesse su tutti gli altri. **Due giudizi distinti.** Chi ha cambiato voto, che cosa l’ha convinto?' },
        { tipo: 'aggancio', etichetta: 'Prossima lezione', titolo: 'Dalla cassa alla coscienza',
          t: 'La tesi 62 apre una domanda che le indulgenze non chiudono: **chi decide** che cosa è il Vangelo? Nel 1521, a Worms, a Lutero verrà chiesto di ritrattare davanti all’imperatore.',
          fonte: 'UDA 1, lezione 2: «Lutero a Worms»' }
      ] }
  ],

  studio: {
    sezioni: [
      { titolo: 'La domanda',
        testo: '«La Chiesa vendeva il perdono.» La frase l’abbiamo sentita tutti, e di solito passa senza che nessuno la controlli. Il problema non è che sia irriverente: è che tiene insieme tre cose diverse, cioè ciò che la Chiesa insegnava, il modo in cui quell’insegnamento veniva amministrato e ciò che accadeva davvero intorno alla cassa delle offerte. Distinguerle non serve a difendere nessuno. Serve a rispondere a una domanda precisa: **quando una protesta ha buone ragioni?** E a capire perché, nel 1517, una protesta riuscì a spaccare l’Europa.' },
      { titolo: 'Un predicatore, un cantiere, un debito',
        testo: 'Nella primavera del 1517 un frate domenicano, Johann Tetzel (Pirna, 1465 circa – Lipsia, 1519), predica a Jüterbog, non lontano da Wittenberg. Dal 1516 è *sottocommissario* per la predicazione di un’indulgenza destinata alla **Fabbrica di San Pietro** (dal latino *fabrica*, «officina»), cioè al cantiere della nuova basilica romana, iniziato nel 1506. La parola dice già qualcosa: Tetzel non agisce per conto proprio, è l’ultimo anello di una catena di incarichi che parte molto più in alto di lui.\n\nIn cima alla catena, nelle terre tedesche, c’è Alberto di Brandeburgo. Nel 1513, a ventitré anni, è arcivescovo di Magdeburgo e amministratore di Halberstadt; nel 1514 diventa anche arcivescovo di Magonza, una delle sedi che eleggono l’imperatore. Per tenere insieme tre diocesi deve versare a Roma una somma ingente, che non possiede: gliela anticipa il banco dei Fugger di Augusta. **Per questo** il rimborso è affidato alla predicazione dell’indulgenza nei suoi territori: metà dei proventi ad Alberto, che la gira ai banchieri, metà a Roma per la basilica.\n\nNella Sassonia elettorale, invece, Tetzel non può entrare: il principe Federico il Saggio lo vieta. Anche quel divieto ha una storia. A Wittenberg, nella chiesa di Ognissanti, Federico custodiva una delle più ricche raccolte di reliquie d’Europa, a cui erano legate indulgenze proprie: un’indulgenza concorrente non era benvenuta. Il contesto, dunque, è politico prima ancora che religioso: un debito bancario, una carriera ecclesiastica, un principe che decide che cosa si predica nel suo Stato. Si possono criticare, ma non sono ancora la cosa predicata.' },
      { titolo: 'Che cosa si predicava',
        testo: 'Resta da chiarire che cosa Tetzel stesse offrendo. La formulazione più limpida è recente, ma mette in fila elementi già in discussione nel Cinquecento:\n\n«L’indulgenza è la remissione dinanzi a Dio della pena temporale per i peccati, già rimessi quanto alla colpa, che il fedele, debitamente disposto e a determinate condizioni, acquista per intervento della chiesa, la quale, come ministra della redenzione, autoritativamente dispensa ed applica il tesoro delle soddisfazioni di Cristo e dei santi» (Paolo VI, *Indulgentiarum doctrina*, 1 gennaio 1967, Norme, n. 1).\n\nQuattro elementi meritano attenzione. Si parla di **pena temporale**, non di colpa. I peccati sono **già stati rimessi quanto alla colpa**: il perdono è avvenuto prima, nella confessione, e l’indulgenza riguarda ciò che viene dopo. Il fedele deve essere **debitamente disposto**, cioè pentito: una condizione interiore che nessun pagamento produce. La Chiesa **non crea nulla**: «dispensa ed applica» un tesoro che considera non suo, ma di Cristo e dei santi. La parola stessa, *indulgentia*, da *indulgere*, «essere benevolo, concedere», parla di una concessione, non di una vendita.' },
      { titolo: 'Colpa e pena',
        testo: 'La distinzione regge tutto il discorso. La **colpa** (dal latino *culpa*) è la rottura del rapporto con Dio: viene rimessa nel sacramento della penitenza, gratuitamente. La **pena temporale** (*poena*, dal greco *poinḗ*, «ammenda, riparazione») è ciò che il peccato lascia dietro di sé anche dopo il perdono: il *Catechismo della Chiesa Cattolica* parla di «un attaccamento malsano alle creature, che ha bisogno di purificazione» (n. 1472). Un’indulgenza interviene **solo su questo secondo piano**. **Ne segue che** chi dice «la Chiesa vendeva il perdono» attribuisce alla dottrina cattolica una cosa che quella dottrina non afferma. E ne segue anche che due promesse sono escluse in partenza: un’offerta senza pentimento non produce nulla, perché manca la disposizione; e nessuna indulgenza tocca la pena eterna, perché la dottrina non la mette in gioco.\n\nPer i defunti la dottrina è prudente: le indulgenze «possono essere sempre applicate ai defunti a modo di **suffragio**» (*Indulgentiarum doctrina*, Norme, n. 3). Il *suffragium* è un «voto», un appoggio: i vivi pregano e offrono a Dio i meriti di Cristo e dei santi, ma sui defunti la Chiesa non ha la giurisdizione che ha sui vivi, e l’esito resta nelle mani di Dio. Chi si trova nel **purgatorio** (da *purgare*, «purificare») è, per la fede cattolica, già salvo e in via di purificazione: non va confuso con l’inferno.' },
      { titolo: 'Da dove veniva questa pratica',
        testo: 'Le indulgenze non ci sono sempre state. Nei primi secoli chi aveva commesso peccati gravi compiva una **penitenza** pubblica, spesso lunga, prima di essere riconciliato. Già allora, ricorda Paolo VI, i penitenti ricorrevano all’intercessione dei martiri «per ottenere dai vescovi una più rapida riconciliazione», e i vescovi permettevano che le penitenze fossero «riscattate con altre opere, forse più facili, convenienti al bene comune» (*Indulgentiarum doctrina*, n. 6): è la **commutazione**, da *commutare*, «scambiare». Quando, nel Medioevo, l’assoluzione cominciò a precedere la penitenza invece di seguirla, questa possibilità di sostituire un’opera con un’altra si consolidò, fino alla concessione di opere che potevano sostituire tutta la penitenza (n. 7). Un pellegrinaggio, una preghiera, un’**elemosina** (dal greco *eleēmosýnē*, «compassione») per un ospedale o per una chiesa: l’opera restava, e restava il pentimento. È qui che l’offerta in denaro entra nella storia, e da qui si capisce anche dove potesse deformarsi.' },
      { titolo: 'Tre parole da non confondere',
        testo: 'Per valutare qualunque controversia su un’istituzione, allora come oggi, servono tre parole che nell’uso comune finiscono schiacciate una sull’altra. La **dottrina** (da *docere*, «insegnare») è la finalità religiosa: ciò che l’istituzione afferma e si impegna a sostenere con le sue ragioni; si critica mostrando che è falsa o incoerente. La **procedura** è il modo in cui quell’affermazione viene amministrata, cioè chi concede che cosa, a quali condizioni, con quale controllo; si critica mostrando che è sproporzionata, opaca o esposta al ricatto. La **distorsione** (da *distorquere*, «torcere») è ciò che accade davvero nella pratica e può contraddire sia la dottrina sia la procedura; si critica mostrando i fatti.\n\nUna prima risposta alla domanda della lezione è dunque questa: una protesta ha buone ragioni quando colpisce il piano su cui il problema si trova davvero. Una critica che scambia un piano per un altro può essere sincera e restare inefficace; una critica che li colpisce tutti insieme ottiene qualcosa di diverso dalla correzione. Nel 1517 accaddero entrambe le cose.' },
      { titolo: 'Che cosa accadde davvero',
        testo: 'Che ci fosse un problema reale non è una ricostruzione protestante: lo registrano gli strumenti di consultazione ordinari. Il 1300 è l’anno del primo **giubileo**, bandito da Bonifacio VIII: un’indulgenza plenaria solenne per chi si reca a Roma. Da allora, scrive la Treccani, le concessioni «si estesero come frequenza e misura del condono di pene», e con esse crebbero gli abusi: «taluni esattori osavano addirittura promettere la liberazione di dannati dall’inferno, cioè la remissione dalla pena eterna, o tariffavano le i[ndulgenze] preoccupandosi solo di procurare abbondante denaro alla Chiesa» (*Dizionario di Storia* Treccani, voce «Indulgenza»).\n\nLe due deformazioni sono precise. Promettere la liberazione di un dannato significa dire che l’indulgenza tocca la pena eterna, cioè proprio quello che la dottrina esclude. Tariffare significa stabilire un prezzo: trasformare un’elemosina, gesto libero legato a un pentimento, in un corrispettivo. Non è un eccesso di zelo: è il rovesciamento della cosa predicata.\n\nNel 1517 la prudenza sul suffragio saltò non soltanto nelle parole di qualche predicatore, ma in un testo ufficiale: l’istruzione ai sottocommissari pubblicata a nome di Alberto diceva che chi versava l’offerta per un’anima del purgatorio non aveva bisogno di essere pentito. Lo storico Giacomo Martina attribuisce la stessa idea a Tetzel. Il celebre distico «appena la moneta tintinna nella cassa, l’anima vola via dal purgatorio», invece, non si trova in un suo scritto: per Martina risponde alle sue idee, «se non proprio alle sue parole».' },
      { titolo: 'Una lettera e le tesi',
        testo: 'È qui che interviene Martin Lutero, frate agostiniano e professore di Sacra Scrittura a Wittenberg. Il suo primo gesto documentato non è un martello su una porta, ma una lettera. Il 31 ottobre 1517 scrive ad Alberto, e negli stessi giorni al vescovo di Brandeburgo, suo ordinario: lamenta le false convinzioni che la predicazione produce nella gente, chiede di ritirare quell’istruzione e di imporre ai predicatori un’altra forma di predicazione, e allega le sue **tesi** (dal greco *thésis*, «posizione»), proposte come materia di una disputa. Alberto non gli risponde e trasmette le tesi a Roma. L’affissione alla porta della chiesa del castello è invece il racconto tradizionale: la Treccani scrive con cautela che Lutero «avrebbe affisso» le tesi. Il testo, comunque, lo possediamo.\n\nTesi 27: *Hominem predicant, qui statim ut iactus nummus in cistam tinnierit evolare dicunt animam*, «Predicano cose da uomini quelli che dicono che, appena la moneta gettata tintinna nella cassa, l’anima vola via». Tesi 28: *Certum est, nummo in cistam tinniente augeri questum et avariciam posse: suffragium autem ecclesie est in arbitrio dei solius*, «È certo che, mentre la moneta tintinna nella cassa, guadagno e avidità possono crescere: ma il suffragio della Chiesa è nell’arbitrio di Dio solo» (traduzioni di servizio).\n\nQueste due righe non negano la dottrina: negano che quella predicazione la rispetti. La tesi 28 usa la parola tecnica corretta, *suffragium*, e ricorda che l’esito dipende da Dio soltanto. Sono critiche di **distorsione**, e per questo difficilissime da respingere: si appoggiano su ciò che la Chiesa stessa insegna. La lettera ad Alberto chiede di correggere l’amministrazione. La tesi 36 va oltre e tocca la **procedura**: ogni cristiano veramente pentito, vi si legge, ha la piena remissione della pena e della colpa anche senza lettere di indulgenza.\n\n**Eppure**, nello stesso elenco, il livello cambia. Alla tesi 62 Lutero scrive: *Verus thesaurus ecclesie est sacrosanctum euangelium glorie et gratie dei*, «il vero tesoro della Chiesa è il sacrosanto vangelo della gloria e della grazia di Dio». Qui non si corregge più un abuso: si ridefinisce che cosa sia il tesoro della Chiesa, e cade il presupposto delle indulgenze. È una critica di **dottrina**. Nel 1517 le due operazioni stanno nello stesso foglio; poi si separeranno, e la seconda porterà molto lontano.' },
      { titolo: 'La correzione, e il suo ritardo',
        testo: 'La necessità di una riforma non l’aveva scoperta Lutero. Il 3 maggio 1512, aprendo il quinto Concilio Lateranense, il generale degli agostiniani Egidio da Viterbo aveva detto che «gli uomini devono essere cambiati dalla religione, e non la religione dagli uomini». Il concilio si chiuse il 16 marzo 1517 con decreti che, osserva Martina, restarono in gran parte sulla carta: proprio mentre si approvava la riforma della curia, si autorizzava il cumulo di diocesi di Alberto.\n\nDopo le tesi, Roma chiarì anzitutto la dottrina. Il 9 novembre 1518 la **decretale** *Cum postquam* di Leone X, affidata al cardinale Caietano, ribadì che la colpa si rimette con il sacramento della penitenza, che l’indulgenza riguarda la pena temporale e che ai defunti si applica *per modum suffragii*. La procedura, però, restò in piedi. Il Concilio di Trento la toccò solo più tardi, e due volte. Il 16 luglio 1562 abolì in tutta la cristianità il nome e l’ufficio dei «**questori** delle elemosine» (da *quaerere*, «chiedere»), gli esattori itineranti. Il 4 dicembre 1563 il decreto *De indulgentiis* riaffermò la dottrina, chiese moderazione nelle concessioni e ordinò di abolire i guadagni illeciti legati al loro conseguimento.\n\nQuattro secoli dopo, Paolo VI riconosce la cosa senza attenuanti: «Purtroppo nell’uso delle indulgenze si infiltrarono talvolta degli abusi, sia perché a causa di concessioni non opportune e superflue veniva avvilito il potere delle chiavi e la soddisfazione penitenziale veniva abolita, sia perché a causa di “illeciti profitti” veniva infamato il nome di indulgenza» (*Indulgentiarum doctrina*, n. 8). Nello stesso paragrafo la Chiesa dichiara che, «biasimando e correggendo tali abusi», essa «insegna e stabilisce che l’uso delle indulgenze deve essere conservato»; le parole fra virgolette sono, nel testo di Paolo VI, una citazione di Trento. Questa è la forma precisa della correzione cattolica: si distingue, si tiene ciò che si ritiene vero, si elimina il dispositivo che lo stava corrompendo. Non si abbandona la dottrina perché è stata amministrata male, e non si difende l’amministrazione perché la dottrina è ritenuta vera.\n\nC’è però un fatto che non va addolcito: fra la protesta e il decreto passano **quarantasei anni**, e nel 1563 la divisione dell’Occidente cristiano era compiuta. La correzione arrivò, e arrivò tardi, benché le voci che la chiedevano ci fossero da tempo. Si può avere ragione su un punto e perdere moltissimo per la lentezza con cui si riconosce di avere torto su un altro.' },
      { titolo: 'Che cosa se ne ricava',
        testo: 'La riforma del 1967 è un nuovo atto di quella storia lunga. Paolo VI riduce drasticamente il numero delle concessioni con un argomento che riguarda la mente umana prima che la teologia: «si bada poco a ciò che si verifica frequentemente e poco si apprezza quello che si offre in abbondanza» (n. 12). La pratica non è scomparsa: nella bolla del Giubileo 2025, *Spes non confundit*, papa Francesco chiedeva che «si annunci al popolo l’Indulgenza Giubilare» (n. 6), sette secoli dopo il primo Anno Santo, senza tariffe né esattori.\n\nIl guadagno più trasferibile riguarda il modo di criticare un’istituzione. Una critica di distorsione è la più efficace, perché usa contro la pratica il criterio che l’istituzione stessa dichiara: è difficile rispondere «non è vero» a chi ti cita. Una critica di procedura è più impegnativa, perché va dimostrata. Una critica di dottrina è legittima, ma cambia la natura del confronto: non chiede più una correzione, chiede una conversione o una rottura. E conta anche il canale: la lettera ad Alberto si rivolgeva a chi aveva il potere di rimediare, e il suo silenzio è parte della storia tanto quanto le tesi.\n\nUn esempio inventato. Una scuola organizza un viaggio e chiede una quota; qualcuno sostiene che chi non versa resta escluso da un’attività didattica. «Il viaggio non serve» tocca il fine; «la quota non è proporzionata né controllata» tocca la procedura; «si sta vendendo l’accesso a un’attività che dovrebbe essere di tutti» tocca la distorsione. Solo l’ultima si verifica in pochi minuti, e solo l’ultima obbliga chi risponde a guardare i fatti.' },
      { titolo: 'Domande per lo studio',
        testo: '1. La frase «la Chiesa vendeva il perdono» è imprecisa. Riscrivila in una forma che resti critica ma dica esattamente che cosa non funzionava, usando le parole *colpa* e *pena*.\n\n2. Le tesi 27 e 28 attaccano la predicazione o la dottrina? Indica una parola del testo latino o della traduzione che sostiene la tua risposta.\n\n3. Nella lettera del 31 ottobre Lutero chiede ad Alberto di ritirare l’istruzione ai predicatori; alla tesi 62 ridefinisce il tesoro della Chiesa. Su quale piano si colloca ciascuna delle due mosse, e che cosa cambia per chi deve rispondere?\n\n4. Domanda aperta. Le voci che chiedevano una riforma c’erano già nel 1512, ma Trento corregge l’abuso nel 1563. Secondo te, che cosa rende lento il riconoscimento di un errore dentro un’organizzazione di cui si fa parte? Rispondi in cinque righe, senza usare la parola «ipocrisia».' },
      { titolo: 'La risposta',
        testo: 'Una protesta ha buone ragioni quando dice con precisione che cosa è andato storto, a quale livello, e lo dice a chi può rimediare. Nel 1517 le ragioni c’erano, ed erano documentabili: una pratica nata per accompagnare la riparazione del male si era trasformata, in un’istruzione ufficiale e in molte prediche, in una tariffa. Il fatto che la Chiesa abbia poi riconosciuto quell’abuso e lo abbia abolito non rende la protesta ingiusta; il fatto che la protesta avesse ragione su quel punto non significa che avesse ragione su tutti gli altri. Sono due giudizi distinti, e la storia si capisce solo tenendoli separati.\n\nRestano aperte due questioni che non si chiudono in un’ora: se il tesoro della Chiesa sia quello descritto dalla tesi 62 o quello descritto da Trento, e che cosa sarebbe successo se la correzione fosse arrivata nel 1518 anziché nel 1563. La prima porta alla lezione successiva: quando, nel 1521, a Worms, la domanda non riguarderà più la cassa delle offerte, ma chi abbia l’autorità di giudicare.' }
    ],
    fonti: [
      'Paolo VI, costituzione apostolica *Indulgentiarum doctrina*, 1 gennaio 1967: nn. 6–7 (origini della pratica), n. 8 (abusi e citazione di Trento), n. 12 (riforma); Norme, nn. 1 e 3 (definizione e defunti). Testo italiano della Santa Sede, vatican.va.',
      '*Catechismo della Chiesa Cattolica*, n. 1472, vatican.va.',
      'Francesco, bolla *Spes non confundit*, 9 maggio 2024, n. 6, vatican.va.',
      'M. Lutero, *95 tesi* (Wittenberg 1517), tesi 27, 28, 36 e 62: testo latino, edizione digitale a cura di Emma Huber, Taylor Editions, University of Oxford (editions.mml.ox.ac.uk). Traduzioni italiane di servizio.',
      'M. Lutero, lettera ad Alberto di Brandeburgo, vigilia di Ognissanti 1517, in traduzione inglese; riportata in forma indiretta.',
      'G. Martina, *Storia della Chiesa da Lutero ai nostri giorni*, I. *L’età della Riforma*, Morcelliana, Brescia 1993.',
      '*Indulgenza*, in *Dizionario di Storia* Treccani; *Johann Tetzel* e *Riforma protestante*, in *Enciclopedia on line* Treccani; *Egidio da Viterbo*, in *Dizionario Biografico degli Italiani*, vol. 42, 1993.',
      '*Johann Tetzel* e *Albert of Brandenburg*, in *Encyclopaedia Britannica*.',
      'Leone X, decretale *Cum postquam*, 9 novembre 1518, testo latino. Concilio di Trento, sess. XXI (16 luglio 1562), decreto di riforma, cap. 9, e sess. XXV (4 dicembre 1563), decreto sulle indulgenze, nella traduzione inglese di J. Waterworth (1848).',
      'Etimologie: Vocabolario Treccani, voci «indulgenza», «colpa», «pena», «penitenza», «commutare», «elemosina», «suffragio», «purgatorio», «dottrina», «procedura», «distorsione», «fabbrica», «tesi», «giubileo», «questore», «decretale».'
    ]
  },

  giochi: {
    tema: 'Il denaro nella cassa — indulgenze 1517: dottrina, procedura, distorsione',
    sfida: [
      { q: 'Chi anticipa ad Alberto di Brandeburgo il denaro dovuto a Roma?', a: ['I Medici di Firenze', 'Il banco dei Fugger di Augusta', 'Papa Leone X', 'Federico il Saggio'], ok: 1 },
      { q: 'A che cosa era destinata l’indulgenza predicata da Tetzel nel 1517?', a: ['Alla Fabbrica di San Pietro', 'A una crociata contro i Turchi', 'All’università di Wittenberg', 'Ai poveri di Magonza'], ok: 0 },
      { q: 'Perché Tetzel non predica nella Sassonia elettorale?', a: ['Lo vieta il papa', 'Wittenberg è già protestante', 'Lo vieta Alberto', 'Lo vieta Federico il Saggio, che ha indulgenze proprie'], ok: 3 },
      { q: 'Secondo la dottrina, un’indulgenza rimette…', a: ['la colpa del peccato', 'la pena eterna', 'la pena temporale di peccati già perdonati', 'l’obbligo di confessarsi'], ok: 2 },
      { q: 'Come si rimette la colpa?', a: ['Con un’offerta', 'Nel sacramento della penitenza, gratuitamente', 'Con un’indulgenza plenaria', 'Solo dopo la morte'], ok: 1 },
      { q: '«Debitamente disposto», nella definizione di Paolo VI, vuol dire…', a: ['iscritto in un registro', 'in grado di pagare', 'confessato da un vescovo', 'pentito'], ok: 3 },
      { q: 'Nei primi secoli i vescovi permettevano che le penitenze fossero…', a: ['riscattate con altre opere', 'abolite del tutto', 'pagate secondo una tariffa', 'rinviate al purgatorio'], ok: 0 },
      { q: 'Fissare un prezzo per un’indulgenza è un problema di…', a: ['dottrina', 'procedura', 'distorsione', 'nessun piano'], ok: 2 },
      { q: '«Chi concede che cosa, a quali condizioni, con quale controllo» descrive…', a: ['la dottrina', 'la procedura', 'la distorsione', 'il suffragio'], ok: 1 }
    ],
    cat: { bins: ['Dottrina', 'Procedura', 'Distorsione'], items: [
      ['Promettere di liberare un dannato dall’inferno con un’offerta', 2],
      ['L’indulgenza riguarda la pena temporale, non la colpa', 0],
      ['Metà dei proventi va ad Alberto, metà a Roma', 1],
      ['Fissare un prezzo per ogni indulgenza', 2],
      ['Per i defunti l’indulgenza vale a modo di suffragio', 0],
      ['Esattori itineranti raccolgono le offerte di città in città', 1],
      ['Un’istruzione ufficiale dice che per offrire per i defunti non serve pentirsi', 2],
      ['Il vero tesoro della Chiesa è il vangelo (tesi 62)', 0],
      ['Nel 1562 Trento abolisce i questori delle elemosine', 1],
      ['Nel 1967 Paolo VI riduce il numero delle concessioni', 1]
    ] },
    vf: [
      { s: 'Secondo la dottrina, l’indulgenza perdona la colpa del peccato.', v: false, why: 'Riguarda la pena temporale di peccati già rimessi quanto alla colpa (Indulgentiarum doctrina, Norme, n. 1).' },
      { s: 'La Treccani documenta esattori che tariffavano le indulgenze.', v: true, why: 'Lo scrive la voce «Indulgenza» del Dizionario di Storia.' },
      { s: 'Il distico «appena la moneta tintinna, l’anima vola via» si legge in uno scritto di Tetzel.', v: false, why: 'Non si trova in un suo scritto: per Martina risponde alle sue idee, «se non proprio alle sue parole».' },
      { s: 'L’affissione delle tesi alla porta è data per certa da tutte le fonti.', v: false, why: 'La Treccani scrive prudentemente che Lutero «avrebbe affisso» le tesi. Il gesto documentato è la lettera.' },
      { s: 'Le tesi 27 e 28 negano la dottrina del suffragio.', v: false, why: 'La usano: il suffragio è «nell’arbitrio di Dio solo». Criticano la predicazione che la tradiva.' },
      { s: 'Trento abolì le indulgenze.', v: false, why: 'Abolì i questori e i guadagni illeciti, ma confermò l’uso delle indulgenze.' },
      { s: 'Fra le 95 tesi e il decreto sulle indulgenze passano 46 anni.', v: true, why: '1517–1563: la correzione arrivò, ma tardi.' }
    ],
    quiz: [
      { q: 'Che cosa rimette un’indulgenza, secondo la dottrina cattolica?', a: ['La colpa', 'La pena eterna', 'La pena temporale di peccati già perdonati', 'Il dovere di confessarsi'], ok: 2, why: 'La colpa si rimette nella confessione; la pena eterna non è in gioco.' },
      { q: 'Qual è il primo gesto documentato di Lutero sulle indulgenze nel 1517?', a: ['Una lettera ad Alberto con le tesi allegate', 'Un sermone contro il papa a Roma', 'Il rogo di un documento papale', 'Un libro in tedesco per il popolo'], ok: 0, why: 'Il 31 ottobre scrive a chi poteva rimediare. L’affissione resta un racconto tradizionale.' },
      { q: 'Le tesi 27 e 28 criticano soprattutto…', a: ['la dottrina dell’indulgenza', 'l’esistenza del papa', 'la costruzione di San Pietro', 'una predicazione che prometteva effetti automatici'], ok: 3, why: 'Usano la dottrina del suffragio contro chi la tradiva: critica di distorsione.' },
      { q: 'Che cosa fa la decretale Cum postquam del 1518?', a: ['Abolisce le indulgenze', 'Chiarisce la dottrina, ma lascia in piedi la procedura', 'Abolisce i questori', 'Apre il Concilio di Trento'], ok: 1, why: 'Ribadisce colpa, pena temporale e suffragio. I questori saranno aboliti solo nel 1562.' },
      { q: 'La tesi 62 è diversa dalle tesi 27–28 perché…', a: ['è scritta in tedesco', 'difende Tetzel', 'ridefinisce il tesoro della Chiesa invece di correggere un abuso', 'riguarda solo i defunti'], ok: 2, why: 'Cambia piano: tocca la dottrina, il presupposto stesso delle indulgenze.' }
    ],
    seq: [
      { t: 'Bonifacio VIII bandisce il primo Giubileo', y: '1300' },
      { t: 'Si apre il cantiere della nuova basilica di San Pietro', y: '1506' },
      { t: 'Egidio da Viterbo apre il Lateranense V', y: '1512' },
      { t: 'Alberto di Brandeburgo diventa arcivescovo di Magonza', y: '1514' },
      { t: 'Lettera di Lutero ad Alberto e 95 tesi', y: '1517' },
      { t: 'Leone X, decretale Cum postquam', y: '1518' },
      { t: 'Trento abolisce i questori delle elemosine', y: '1562' },
      { t: 'Trento: decreto sulle indulgenze', y: '1563' },
      { t: 'Paolo VI, Indulgentiarum doctrina', y: '1967' }
    ],
    abbina: [
      ['Colpa', 'Rimessa nella confessione'],
      ['Pena temporale', 'Ciò che resta da purificare'],
      ['Suffragio', 'L’esito resta a Dio'],
      ['Commutazione', 'Una penitenza sostituita da un’altra opera'],
      ['Questori', 'Esattori aboliti nel 1562']
    ],
    completa: {
      testo: 'L’indulgenza rimette la {pena} temporale, non la {colpa}. Per i defunti vale a modo di {suffragio}. Prima delle tesi, Lutero scrive una {lettera} ad Alberto. Nel 1562 Trento abolisce i {questori} delle elemosine.',
      extra: ['perdono', 'tariffa', 'bolla']
    }
  }
};

/* =====================================================================
   Componenti della lezione (React con htm). Interazioni con <button> veri;
   hover / focus-visible / active dal kit (la-choice, ll-btn, ll-link) e dal CSS qui sotto.
   Memoria solo in pagina: tornando a una scena (anche dopo la pausa gioco) il componente
   riprende da dove era rimasto. Nulla va nel browser.
   ===================================================================== */
(function () {
  var I = LabLezione.inline;
  var useState = React.useState;
  var MEM = {};
  function useMem(key, iniziale) {
    var s = useState(function () { return Object.prototype.hasOwnProperty.call(MEM, key) ? MEM[key] : iniziale; });
    return [s[0], function (v) { MEM[key] = v; s[1](v); }];
  }

  /* ---------- DuePiani: colpa e pena temporale (concetto più difficile) ----------
     Quattro gesti; per ciascuno la classe decide che cosa cambia: la colpa, la pena temporale o niente.
     Due indicatori mostrano lo stato: il legame spezzato/ricucito (colpa) e tre segni da purificare (pena).
     Interazioni: tre la-choice (hover bordo oro +5 px, active 0,98, focus oro; esito con parola),
     «Gesto successivo» (ll-btn), «Riprova» (ll-btn--ghost), «Ricomincia» (ll-link). */
  var GESTI = [
    { t: 'Il penitente si pente e **si confessa**.', ok: 0, colpa: false, pena: 3, tag: 'Dottrina',
      why: 'Nel sacramento della penitenza la **colpa** è rimessa, gratuitamente: il legame con Dio è ricucito. Ma restano i segni del peccato.',
      no: 'Guardate gli indicatori: che cosa si rompe con il peccato, e che cosa ricuce il perdono?' },
    { t: 'Già perdonato e pentito, **acquista un’indulgenza** alle condizioni stabilite: una preghiera, un pellegrinaggio, un’elemosina.', ok: 1, colpa: false, pena: 0, tag: 'Dottrina',
      why: 'L’indulgenza agisce sulla **pena temporale**, «un attaccamento malsano alle creature, che ha bisogno di purificazione» (CCC 1472). La colpa era già rimessa.',
      no: 'La colpa è già rimessa: su che cosa può agire, ancora, l’indulgenza?' },
    { t: 'Un altro versa una moneta nella cassa **senza pentirsi**, sicuro di essere a posto.', ok: 2, colpa: null, pena: null, tag: 'Distorsione',
      why: '**Niente.** Manca la condizione: il fedele deve essere «debitamente disposto», cioè pentito. Il denaro da solo non produce nulla.',
      no: 'Rileggete la definizione: chi acquista l’indulgenza deve essere «debitamente disposto». Lo è?' },
    { t: 'Un predicatore promette che l’offerta **libera un dannato dall’inferno**.', ok: 2, colpa: null, pena: null, tag: 'Distorsione',
      why: '**Niente.** La pena eterna non è in gioco: la dottrina lo esclude. È proprio una delle deformazioni che vedremo documentate.',
      no: 'L’indulgenza riguarda la pena **temporale**. L’inferno è un’altra cosa.' }
  ];
  var SCELTE = ['Cambia la colpa', 'Cambia la pena temporale', 'Non cambia niente'];

  LabLezione.registra('DuePiani', function (p) {
    var s1 = useMem('dp-k', 0), k = s1[0], setK = s1[1];
    var s2 = useMem('dp-sc', null), sc = s2[0], setSc = s2[1];
    var s3 = useMem('dp-primo', []), primo = s3[0], setPrimo = s3[1];
    var n = GESTI.length, fine = k >= n, g = GESTI[k];
    var giusto = sc !== null && g && sc === g.ok;
    /* stato degli indicatori: dall'inizio fino all'ultimo gesto risolto */
    var colpa = true, pena = 3, risolti = fine ? n : (giusto ? k + 1 : k);
    for (var j = 0; j < risolti; j++) { if (GESTI[j].colpa !== null) colpa = GESTI[j].colpa; if (GESTI[j].pena !== null) pena = GESTI[j].pena; }
    var rimbalzo = giusto && g.ok === 2;
    function scegli(i) {
      if (sc !== null) return;
      setSc(i);
      if (primo[k] === undefined) { var c = primo.slice(); c[k] = i === g.ok; setPrimo(c); }
      if (i === g.ok) p.ctx.cheer(); else p.ctx.oops();
    }
    function avanti() {
      var m = k + 1; setK(m); setSc(null);
      if (m >= n) { p.ctx.festa(); p.ctx.say('Due piani: il perdono non si compra, la pena non è la colpa.'); }
    }
    function ricomincia() { setK(0); setSc(null); setPrimo([]); }
    var bravi = primo.filter(Boolean).length;
    return html`<div className="la-card dp" data-flat>
      <div className="dp-meters" aria-live="polite">
        <div className=${'dp-m' + (colpa ? ' is-broken' : ' is-whole')}>
          <span className="la-meta">Colpa</span>
          <svg viewBox="0 0 120 40" aria-hidden="true" className="dp-link">
            <rect x="6" y="12" width="44" height="16" rx="8" className="dp-ring" />
            <rect x="70" y="12" width="44" height="16" rx="8" className="dp-ring" />
            <line x1="50" y1="20" x2="70" y2="20" className="dp-bridge" />
          </svg>
          <b>${colpa ? 'rapporto spezzato' : 'rimessa: legame ricucito'}</b>
        </div>
        <div className=${'dp-m' + (pena === 0 ? ' is-whole' : '')}>
          <span className="la-meta">Pena temporale</span>
          <div className="dp-dots" aria-hidden="true">${[0, 1, 2].map(function (i) { return html`<i key=${i} className=${i < pena ? 'is-on' : ''}></i>`; })}</div>
          <b>${pena === 3 ? 'da purificare' : pena === 0 ? 'rimessa' : 'in parte'}</b>
        </div>
        ${rimbalzo && html`<div key=${'r' + k} className="dp-coin">L’offerta non sposta nulla</div>`}
      </div>
      ${!fine ? html`<div key=${k} className="dp-step">
          <span className="la-meta">Gesto ${k + 1} di ${n}</span>
          <p className="dp-t">${I(g.t, 't' + k)}</p>
          <div className="la-choices">${SCELTE.map(function (t, i) {
            var cls = 'la-choice' + (sc === null ? '' : i === sc ? (giusto ? ' is-right' : ' is-wrong') : ' is-dim');
            return html`<button key=${i} type="button" className=${cls} disabled=${sc !== null} aria-pressed=${sc === i} onClick=${function () { scegli(i); }}><span className="la-key">${'ABC'[i]}</span>${t}</button>`;
          })}</div>
          <div aria-live="polite">${sc !== null && html`<p className=${'ll-why ' + (giusto ? 'is-ok' : 'is-ko')}><strong>${giusto ? g.tag + '. ' : 'Ci ripensiamo. '}</strong>${I(giusto ? g.why : g.no, 'w' + k)}</p>`}</div>
          ${sc !== null && html`<div className="ll-row">${giusto
            ? html`<button className="ll-btn" onClick=${avanti}>${k + 1 < n ? 'Gesto successivo' : 'Che cosa abbiamo visto'}</button>`
            : html`<button className="ll-btn ll-btn--ghost" onClick=${function () { setSc(null); }}>Riprova</button>`}</div>`}
        </div>`
      : html`<div className="dp-step">
          <p className="ll-why is-ok"><strong>${bravi} su ${n} al primo colpo. </strong>${I('La **colpa** si rimette nella confessione; l’indulgenza agisce solo sulla **pena temporale**, e solo per chi è pentito. Un’offerta senza pentimento e una promessa sull’inferno non toccano nessuno dei due piani: sono **distorsioni**.', 'f')}</p>
          <div className="ll-row"><button className="ll-link" onClick=${ricomincia}>Ricomincia</button></div>
        </div>`}
    </div>`;
  });

  /* ---------- Lettera: il 31 ottobre 1517 e le tesi 27-28 (fonte da leggere) ----------
     Quattro sigilli da aprire (ll-btn--ghost come sigillo: hover riempimento dal basso, focus oro);
     nell'allegato il latino delle tesi 27-28 e la traduzione a richiesta (ll-link);
     «E Alberto?» (ll-btn--solenne) si attiva quando la lettera è letta tutta. */
  var PARTI = [
    { k: 'A chi scrive', d: 'Ad **Alberto di Brandeburgo**, responsabile della predicazione, e negli stessi giorni al **vescovo di Brandeburgo**, suo superiore diretto. A chi può rimediare.' },
    { k: 'Che cosa lamenta', d: 'Le false convinzioni che la predicazione produce nella gente: di essere sicuri della salvezza con le lettere d’indulgenza, che un’anima esca dal purgatorio appena si versa l’offerta. E l’istruzione pubblicata a nome di Alberto.' },
    { k: 'Che cosa chiede', d: 'Di **ritirare quell’istruzione** e di imporre ai predicatori un’altra forma di predicazione.' },
    { k: 'Che cosa allega', d: 'Le sue {tesi}, in latino, proposte come materia di una disputa fra dotti. Due, lette per intero:', tesi: true }
  ];

  LabLezione.registra('Lettera', function (p) {
    var s = useMem('le-aperte', {}), aperte = s[0], setAperte = s[1];
    var t = useMem('le-trad', false), trad = t[0], setTrad = t[1];
    var r = useMem('le-risp', false), risposta = r[0], setRisposta = r[1];
    var n = Object.keys(aperte).length;
    function apri(i) {
      if (aperte[i]) return;
      var o = Object.assign({}, aperte); o[i] = 1; setAperte(o);
      if (Object.keys(o).length === PARTI.length) p.ctx.say('Letta tutta. E Alberto?');
    }
    return html`<div className="le">
      <div className="le-foglio">
        <p className="le-intest">Wittenberg · vigilia di Ognissanti · MDXVII</p>
        ${PARTI.map(function (x, i) {
          var on = !!aperte[i];
          return html`<div key=${i} className="le-parte">
            <button className=${'ll-btn ll-btn--ghost le-sig' + (on ? ' is-open' : '')} aria-expanded=${on} onClick=${function () { apri(i); }}>${x.k}</button>
            ${on && html`<div className="le-d">${LabLezione.md(x.d)}
              ${x.tesi && html`<div className="le-all">
                <p className="le-lat"><span className="la-meta">Tesi 27</span> <i lang="la">Hominem predicant, qui statim ut iactus nummus in cistam tinnierit evolare dicunt animam.</i></p>
                <p className="le-lat"><span className="la-meta">Tesi 28</span> <i lang="la">Certum est, nummo in cistam tinniente augeri questum et avariciam posse: suffragium autem ecclesie est in arbitrio dei solius.</i></p>
                <button className="ll-link" aria-pressed=${trad} onClick=${function () { setTrad(!trad); }}>${trad ? 'Nascondi la traduzione' : 'Traduci'}</button>
                ${trad && html`<div className="le-trad">${LabLezione.md('«Predicano cose da uomini quelli che dicono che, appena la moneta gettata tintinna nella cassa, l’anima vola via.»\n\n«È certo che, mentre la moneta tintinna nella cassa, guadagno e avidità possono crescere: ma il {suffragio} della Chiesa è nell’arbitrio di **Dio solo**.»\n\n*Traduzione di servizio dal latino (Taylor Editions, University of Oxford).*')}
                  <p className="ll-gloss">Lutero non nega la dottrina: usa la parola tecnica giusta, <i>suffragium</i>, contro chi la tradiva.</p></div>`}
              </div>`}
            </div>`}
          </div>`;
        })}
      </div>
      <div className="ll-row">
        <button className="ll-btn ll-btn--solenne" disabled=${n < PARTI.length} aria-pressed=${risposta}
          onClick=${function () { setRisposta(true); p.ctx.say('Silenzio. Le tesi, intanto, circolano.'); }}>E Alberto?</button>
        <span className="ll-tally">${n < PARTI.length ? 'Parti lette: ' + n + ' su ' + PARTI.length : 'Lettera letta'}</span>
      </div>
      ${risposta && html`<p className="ll-why is-ok" aria-live="polite">${I('Alberto **non risponde** e trasmette le tesi a Roma. L’affissione alla porta della chiesa del castello è il racconto tradizionale: la Treccani scrive con cautela che Lutero «avrebbe affisso» le tesi. Il gesto documentato è la lettera.', 'a')}</p>`}
    </div>`;
  });

  /* ---------- Livelli: su quale piano colpisce ciascuna richiesta di Lutero ----------
     Quattro richieste; per ciascuna la classe sceglie Distorsione, Procedura o Dottrina (la-choice).
     Alla fine compare che cosa cambia per chi deve rispondere. «Riprova» (ll-link) azzera. */
  var RICH = [
    { n: 'Tesi 27', t: '«Predicano cose da uomini quelli che dicono che, appena la moneta tintinna nella cassa, l’anima vola via.»', ok: [0],
      why: 'Contesta ciò che si predica **in nome** della dottrina, usando la dottrina stessa: critica di **distorsione**.' },
    { n: 'Lettera', t: 'Ritirate l’istruzione ai predicatori e date loro un’altra forma di predicazione.', ok: [1, 0],
      why: 'Chiede di cambiare **come** l’indulgenza è amministrata, a chi aveva il potere di farlo: **procedura** (e, insieme, la distorsione che l’istruzione conteneva).' },
    { n: 'Tesi 36', t: 'Ogni cristiano veramente pentito ha la piena remissione della pena e della colpa anche senza lettere di indulgenza.', ok: [1],
      why: 'Dice che lo strumento **non è necessario**: tocca la **procedura**. Letta in senso forte, prepara già il passo successivo.' },
    { n: 'Tesi 62', t: '«Il vero tesoro della Chiesa è il sacrosanto vangelo della gloria e della grazia di Dio.»', ok: [2],
      why: 'Non corregge un abuso: ridefinisce il **tesoro** che la Chiesa dispensa. Cade il presupposto delle indulgenze: è **dottrina**.' }
  ];
  var PIANI = ['Distorsione', 'Procedura', 'Dottrina'];

  LabLezione.registra('Livelli', function (p) {
    var s = useMem('lv-sc', {}), scelte = s[0], setScelte = s[1];
    var fatte = Object.keys(scelte).length;
    function scegli(i, l) {
      if (scelte[i] !== undefined) return;
      var o = Object.assign({}, scelte); o[i] = l; setScelte(o);
      if (RICH[i].ok.indexOf(l) >= 0) p.ctx.cheer(); else p.ctx.oops();
      if (Object.keys(o).length === RICH.length) p.ctx.say('Stesso foglio, piani diversi.');
    }
    return html`<div className="la-card lv" data-flat>
      ${RICH.map(function (x, i) {
        var sc = scelte[i], fatto = sc !== undefined, ok = fatto && x.ok.indexOf(sc) >= 0;
        return html`<div key=${i} className=${'lv-r' + (fatto ? ' is-done' : '')}>
          <p className="lv-t"><span className="la-meta">${x.n}</span> ${x.t}</p>
          <div className="lv-sc" role="group" aria-label=${'Piano: ' + x.n}>
            ${PIANI.map(function (l, j) {
              var cls = 'la-choice lv-b';
              if (fatto) cls += x.ok[0] === j ? ' is-right' : (sc === j ? (ok ? ' is-right' : ' is-wrong') : ' is-dim');
              return html`<button key=${j} type="button" className=${cls} aria-pressed=${sc === j} disabled=${fatto} onClick=${function () { scegli(i, j); }}>${l}</button>`;
            })}
          </div>
          <div aria-live="polite">${fatto && html`<p className=${'ll-why ' + (ok ? 'is-ok' : 'is-ko')}><strong>${ok ? 'Regge. ' : 'Non regge. '}</strong>${I(x.why, 'w' + i)}</p>`}</div>
        </div>`;
      })}
      ${fatte === RICH.length && html`<div className="lv-fine">
        <span className="la-meta">E chi deve rispondere?</span>
        <ul>
          <li><b>Distorsione</b> · si corregge senza rinunciare a nulla di ciò che si insegna: è difficile rispondere «non è vero» a chi ti cita.</li>
          <li><b>Procedura</b> · si può rivedere, ma la critica va dimostrata.</li>
          <li><b>Dottrina</b> · non chiede più una correzione: chiede una conversione o una rottura.</li>
        </ul>
      </div>`}
      ${fatte > 0 && html`<div className="ll-row"><button className="ll-link" onClick=${function () { setScelte({}); }}>Riprova</button></div>`}
    </div>`;
  });

  /* ---------- CSS della lezione: solo token del design system ---------- */
  var CSS = [
    '.dp{padding:21px}',
    '.dp-meters{display:grid;grid-template-columns:1fr 1fr;gap:13px;margin-bottom:21px}',
    '.dp-m{display:flex;flex-direction:column;gap:5px;align-items:flex-start;padding:13px;border:1.5px solid var(--lab-line);border-radius:13px;background:var(--lab-surface-2);transition:border-color 377ms var(--lab-ease-out)}',
    '.dp-m b{font:600 15px/1.3 var(--lab-font-body);color:var(--lab-ink)}',
    '.dp-m.is-broken{border-color:var(--lab-rosso)}',
    '.dp-m.is-whole{border-color:var(--lab-verde)}',
    '.dp-link{width:100%;max-width:150px;height:auto}',
    '.dp-ring{fill:none;stroke:var(--la-accent);stroke-width:4}',
    '.dp-bridge{stroke:var(--lab-oro);stroke-width:5;stroke-linecap:round;transition:opacity 610ms var(--lab-ease-out),transform 610ms var(--lab-ease-out);transform-origin:60px 20px}',
    '.dp-m.is-broken .dp-bridge{opacity:0;transform:scaleX(.2)}',
    '.dp-dots{display:flex;gap:8px;min-height:22px;align-items:center}',
    '.dp-dots i{width:18px;height:18px;border-radius:50%;border:2px dashed var(--lab-line);transition:background 610ms var(--lab-ease-out),border-color 610ms,transform 610ms var(--lab-ease-out)}',
    '.dp-dots i.is-on{background:var(--lab-oro);border:2px solid var(--lab-oro);transform:scale(1)}',
    '.dp-dots i:not(.is-on){transform:scale(.8)}',
    '.dp-coin{grid-column:1/-1;justify-self:center;padding:5px 13px;border-radius:999px;border:1.5px solid var(--lab-rosso);background:var(--lab-surface);font:600 13px/1.2 var(--lab-font-body);color:var(--lab-ink);animation:dpCoin 987ms var(--lab-ease-out) both}',
    '@keyframes dpCoin{0%{opacity:0;transform:translateY(-13px)}40%{opacity:1;transform:none}55%{transform:translateX(5px)}70%{transform:translateX(-5px)}85%,100%{opacity:1;transform:none}}',
    '.dp-step .la-choices{margin-top:13px}',
    '.dp-t{font:600 20px/1.35 var(--lab-font-display);color:var(--lab-ink);margin:5px 0 0}',
    '.le-foglio{padding:21px;border:1px solid var(--lab-line);border-left:3px solid var(--lab-oro);border-radius:8px 21px 21px 8px;background:var(--lab-surface)}',
    '.le-intest{font:600 12px/1.4 var(--lab-font-inscription);letter-spacing:.16em;text-transform:uppercase;color:var(--lab-oro);margin:0 0 13px}',
    '.le-parte{padding:8px 0;border-top:1px dashed var(--lab-line)}',
    '.le-parte:first-of-type{border-top:0}',
    '.le-sig{min-height:44px}',
    '.le-sig.is-open{border-color:var(--lab-oro)}',
    '.le-d{margin:8px 0 5px;line-height:1.618}',
    '.le-d p{margin:0 0 8px}',
    '.le-all{margin-top:8px;padding:13px;border-radius:13px;background:var(--lab-surface-2)}',
    '.le-lat{font:500 18px/1.5 var(--lab-font-display);margin:0 0 8px;overflow-wrap:anywhere}',
    '.le-lat .la-meta{margin-right:5px}',
    '.le-trad{margin-top:8px}',
    '.lv{display:grid;gap:21px;padding:21px}',
    '.lv-r{padding:13px 0;border-top:1px dashed var(--lab-line)}',
    '.lv-r:first-child{border-top:0;padding-top:0}',
    '.lv-t{font:500 19px/1.4 var(--lab-font-display);margin:0 0 8px;color:var(--lab-ink)}',
    '.lv-t .la-meta{margin-right:5px}',
    '.lv-sc{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}',
    '.lv-b{justify-content:center;text-align:center;padding:13px 8px}',
    '.lv-fine{padding:21px;border-radius:21px;border:1.5px solid var(--lab-oro);background:var(--lab-surface)}',
    '.lv-fine ul{margin:8px 0 0;padding-left:21px;line-height:1.618}',
    '@media (max-width:560px){.dp,.lv{padding:13px}.dp-meters{gap:8px}.dp-m{padding:8px}.dp-m b{font-size:13px}.dp-t{font-size:18px}.lv-sc{grid-template-columns:1fr}.lv-b{justify-content:flex-start;text-align:left}.le-foglio{padding:13px}.le-lat{font-size:16px}}',
    '@media (prefers-reduced-motion:reduce){.dp-coin{animation:none}.dp-bridge,.dp-dots i{transition:none}}',
    ':root[data-lim] .dp-t{font-size:26px}',
    ':root[data-lim] .lv-t{font-size:24px}',
    ':root[data-lim] .le-lat{font-size:22px}'
  ].join('\n');
  try {
    if (!document.getElementById('dn-css')) {
      var st = document.createElement('style'); st.id = 'dn-css'; st.textContent = CSS;
      (document.head || document.documentElement).appendChild(st);
    }
  } catch (e) { /* la lezione resta leggibile con il solo kit */ }
})();
