/* ---- lezione ---- */
/* Classe II · UDA 1 «Gesù: quali tracce?» · Lezione 1 — «Gesù sotto il segno dell'aquila» (artefatto «Sotto l'aquila»).
   Artefatto interattivo, rifatto il 7 ottobre 2026 con la skill «IRC · Artefatto interattivo della lezione».
   Contenuti: fascicolo uploads/ii-1-1-gesu-quali-tracce-sotto-l-aquila-fascicolo.pdf e versione precedente dell'artefatto
   (dossier del 28 settembre 2026). Testi biblici: Bibbia CEI 2008. Giuseppe Flavio: racconti riferiti in forma indiretta.
   Magistero: testi italiani della Santa Sede. Etimologie: Vocabolario Treccani. Le carte sono schematiche, non in scala.
   © Matteo Sestili — Tutti i diritti riservati */
window.LEZIONE = {
  slug: 'ii-1-1-gesu-quali-tracce-sotto-l-aquila',
  classe: 'Anno II',
  titolo: 'Sotto *l’aquila*',
  sottotitolo: 'Giudea, Galilea e Roma: dove, quando e fra chi è vissuto Gesù, e perché una frase cambia quando se ne conosce il contesto.',
  saluto: 'Ultima tappa: la frase su Cesare, ora, ha una mappa intorno.',
  glossario: {
    'Legge': { parola: 'Legge', etim: 'in ebraico *tôrāh*, «insegnamento, istruzione»', def: 'La Legge di Mosè, cioè l’insegnamento che Dio dà al suo popolo nei primi cinque libri della Bibbia. Fra i suoi comandi: «Non ti farai idolo né immagine alcuna» (Es 20,4).' },
    'tetrarca': { parola: 'Tetrarca', etim: 'dal greco *tetrárchēs*, da *tetra-*, «quattro», e *árchō*, «comandare»', def: 'In origine il signore di una quarta parte di un regno. Al tempo di Gesù è un principe dipendente da Roma, sotto il rango di re: Erode Antipa in Galilea e Perea, Filippo a nord-est.' },
    'prefetto': { etim: 'dal latino *praefectus*, «messo a capo», da *praeficere*', def: 'Il governatore romano della Giudea dal 6 d.C. Ponzio Pilato lo è dal 26 al 36: una pietra trovata a Cesarea Marittima nel 1961 porta il suo nome e questo titolo. «Procuratore» è il titolo dei governatori venuti dopo.' },
    'censimento': { etim: 'da *censo*, dal latino *census*, legato a *censere*, «valutare, stimare»', def: 'La registrazione di persone e beni che Roma ordina nel 6 d.C. in Giudea per stabilire il tributo da pagare.' },
    'tributo': { etim: 'dal latino *tributum*, legato a *tribuere*, «assegnare, ripartire»', def: 'La tassa che una popolazione sottomessa paga a Roma. Per molti ebrei pagarlo significava riconoscere un signore diverso da Dio.' },
    'sinedrio': { parola: 'Sinedrio', etim: 'dal greco *synédrion*, «assemblea», da *syn*, «insieme», e *hédra*, «seggio»', def: 'Il consiglio di Gerusalemme, presieduto dal sommo sacerdote, che regola le questioni religiose e giudiziarie sotto il controllo romano.' },
    'farisei': { parola: 'Farisei', etim: 'dall’aramaico *pərîšayyā*, «separati» (in ebraico *pərûšîm*): da che cosa, gli studiosi lo discutono', def: 'Interpreti della Legge, stimati dal popolo; credono nella risurrezione dei morti. «Fariseo» nel senso di «ipocrita» è un uso nato dopo e non descrive il gruppo storico.' },
    'sadducei': { parola: 'Sadducei', etim: 'dall’ebraico *ṣədûqîm*: molti lo collegano a Sadoc, sacerdote al tempo di Salomone; l’origine è discussa', def: 'Gruppo ristretto delle famiglie più potenti, legato al Tempio e al sacerdozio; nega la risurrezione (Mc 12,18).' },
    'esseni': { parola: 'Esseni', etim: 'dal greco *essaîoi* o *essēnoí*; l’origine del nome è incerta', def: 'Comunità che vivono con i beni in comune; Giuseppe Flavio ne conta circa quattromila. Molti studiosi collegano al loro ambiente i manoscritti di Qumran.' },
    'erodiani': { parola: 'Erodiani', etim: 'dal nome di Erode', def: 'Nei Vangeli, i sostenitori della dinastia di Erode, cioè di Antipa. In Mc 12,13 fanno la domanda sul tributo insieme ai farisei.' },
    'scribi': { parola: 'Scribi', etim: 'dal latino *scriba*, da *scribere*, «scrivere»', def: 'Non un partito, ma una professione: gli esperti della Legge, che la copiano, la studiano e la insegnano.' },
    'denaro': { etim: 'dal latino *denarius*, «che contiene dieci», perché in origine valeva dieci assi', def: 'La moneta d’argento romana. Quella mostrata a Gesù porta l’immagine e l’iscrizione di Cesare (Mc 12,16).' },
    'incarnazione': { parola: 'Incarnazione', etim: 'dal latino ecclesiastico *incarnatio*, da *caro, carnis*, «carne»', def: 'Per la fede cristiana, il Figlio di Dio che si fa uomo: in un popolo, in una terra, in un’epoca precisi.' }
  },
  scene: [
    /* 1 · Aggancio — la frase famosa e il sondaggio d'ingresso (domanda della lezione) */
    { fase: 'Aggancio', momento: 'Apertura', minuti: 3, titolo: 'Una frase *famosa*',
      lead: '«Quello che è di Cesare rendetelo a Cesare, e quello che è di Dio, a Dio» (Mc 12,17). Molti la conoscono; non tutti le danno lo stesso senso.',
      blocchi: [
        { tipo: 'domanda', id: 'ingresso', etichetta: 'Anonimo · per alzata di mano', q: 'Secondo voi, che cosa vuol dire questa frase?',
          opzioni: ['Paga le tasse e non discutere', 'Religione e politica sono cose separate', 'Dio viene prima dello Stato', 'Non lo so ancora'],
          dibattito: 'Teniamo i voti. Si può capire una frase senza sapere **dove, quando e fra chi** è stata detta? Alla fine dell’ora la rileggeremo con la sua mappa intorno.' }
      ] },

    /* 2 · L'aquila d'oro (anello 1): racconto a fotogrammi + fatto o interpretazione */
    { fase: 'Aggancio', momento: 'Un fatto', minuti: 5, titolo: 'L’aquila sulla *porta*',
      lead: 'Gerusalemme, ultimi mesi di Erode il Grande. Lo racconta lo storico ebreo Giuseppe Flavio, alla fine del I secolo.',
      blocchi: [
        { tipo: 'custom', nome: 'Aquila', props: {} },
        { tipo: 'smista', titolo: 'Lo dice la fonte o lo ricostruiscono gli storici?', categorie: ['Lo dice la fonte', 'Lo ricostruiscono gli storici'],
          voci: [
            { t: 'Un’aquila d’oro stava sopra la grande porta del Tempio.', c: 0, why: 'È il racconto di Giuseppe Flavio, in tutte e due le sue opere.' },
            { t: 'L’aquila era anche un omaggio a Roma.', c: 1, why: 'L’aquila era un emblema di Roma, ma Giuseppe Flavio non lo dice: per i maestri il problema è l’**immagine vietata dalla Legge**. È un’interpretazione plausibile, non una notizia della fonte.' },
            { t: 'I maestri insegnavano che l’immagine violava la Legge.', c: 0, why: 'È la ragione che la fonte attribuisce ai maestri e ai giovani (Es 20,4).' },
            { t: 'Erode morì nel 4 a.C.', c: 1, why: 'Giuseppe Flavio non usa i nostri numeri degli anni: la data è calcolata dagli storici sui dati che fornisce. È la datazione più seguita.' }
          ],
          chiusura: 'In quella terra obbedire al potere poteva scontrarsi con la fedeltà a Dio, fino a costare la vita. Perché?' }
      ] },

    /* 3 · Un regno spezzato (anello 2): concetto più difficile, carta animata a fotogrammi */
    { fase: 'Scoperta', momento: 'Il tempo', minuti: 7, titolo: 'Un regno *spezzato*',
      lead: '**Per capire perché**, guardiamo chi comandava: cinque fotogrammi, dal 63 a.C. agli anni di Gesù adulto.',
      blocchi: [
        { tipo: 'custom', nome: 'RegnoSpezzato', props: {} },
        { tipo: 'parola', parola: 'Tetrarca', radice: 'tetra', origine: 'Dal greco tetrárchēs',
          significato: '*Tetra-*, «quattro», e *árchō*, «comandare»: in origine il signore di una **quarta parte**. Al tempo di Gesù è un principe dipendente da Roma, sotto il rango di re. La parola stessa dice che il regno di Erode è stato **spezzato**.',
          battuta: 'Antipa non ha davvero un quarto: ha Galilea e Perea. Ma il titolo ricorda che il regno non è più uno.' }
      ] },

    /* 4 · Lc 3,1-2: la fonte principale letta davvero + i nomi sulla carta (anello 3) */
    { fase: 'Scoperta', momento: 'Fonte', minuti: 7, titolo: 'Una frase che è *una mappa*',
      lead: '**È dentro questa situazione** che Luca colloca l’inizio della predicazione. Non ha un numero di anno: elenca chi comanda.',
      blocchi: [
        { tipo: 'leggi', fonte: 'Lc 3,1-2 · Bibbia CEI 2008', q: 'Quale parte dice chi governa Gerusalemme per conto di Roma?',
          testo: '[[«Nell’anno quindicesimo dell’impero di Tiberio Cesare,::**La data.** Tiberio è imperatore dal 14 al 37 d.C.: il suo quindicesimo anno cade intorno al 28–29. Ma governa da Roma, non da Gerusalemme.]] [[!mentre Ponzio Pilato era governatore della Giudea,::**Il governatore romano.** Pilato è {prefetto} della Giudea dal 26 al 36, e Gerusalemme è in Giudea. Una pietra trovata a Cesarea nel 1961 porta il suo nome e il titolo di *praefectus*.]] [[Erode tetrarca della Galilea,::**Il principe locale.** È Erode Antipa, figlio di Erode il Grande: governa Galilea e Perea, cioè anche Nazaret, non Gerusalemme.]] e Filippo, suo fratello, tetrarca dell’Iturea e della Traconitide, e Lisania tetrarca dell’Abilene, [[sotto i sommi sacerdoti Anna e Caifa,::**L’autorità religiosa.** Caifa è sommo sacerdote, il suocero Anna conserva grande autorità; il sommo sacerdote presiede il {sinedrio}, sotto il controllo romano.]] la parola di Dio venne su Giovanni, figlio di Zaccaria, nel deserto.»' },
        { tipo: 'custom', nome: 'MappaPotere', props: { istruzione: 'Ora, alla carta: scegliete un nome della frase di Luca, poi toccate il luogo in cui governa.' } }
      ] },

    /* 5 · Un popolo, molte voci (anello 4) */
    { fase: 'Scoperta', momento: 'Spiegazione', minuti: 5, titolo: 'Un popolo, *molte voci*',
      lead: '**Eppure** lo stesso popolo non risponde in un solo modo. Tutti riconoscono il Dio unico, la {Legge} di Mosè e il Tempio: discutono su come restare fedeli.',
      blocchi: [
        { tipo: 'chi', etichetta: 'Chi potrebbe dirlo? · frasi d’esempio', opzioni: ['Farisei', 'Sadducei', 'Esseni', 'Quarta filosofia'],
          fine: 'Quattro risposte, dentro lo stesso popolo.',
          why: 'Giuseppe Flavio descrive quattro correnti, che chiama «filosofie». Gesù discute dentro questo popolo: sulla risurrezione sta con i farisei contro i sadducei (Mc 12,18-27).',
          frasi: [
            { t: 'Alla fine i morti risorgeranno.', ok: 0, why: 'I {farisei}, interpreti della Legge stimati dal popolo, credono nella risurrezione.' },
            { t: 'Non c’è risurrezione: conta il Tempio, con il suo sacerdozio.', ok: 1, why: 'I {sadducei}, pochi ma delle famiglie più potenti, negano la risurrezione (Mc 12,18).' },
            { t: 'Nessun signore se non Dio: niente tributo a Roma.', ok: 3, why: 'È la tesi di Giuda il Galileo, che nel 6 d.C. guida la rivolta contro il {censimento}.' },
            { t: 'Viviamo in comunità e mettiamo in comune i beni.', ok: 2, why: 'Così Giuseppe Flavio descrive gli {esseni}; molti studiosi li collegano a Qumran.' }
          ] },
        { tipo: 'nota', t: '**Attenzione:** «fariseo» nel senso di «ipocrita» è un uso nato dopo e non descrive il gruppo storico. Gli {scribi} sono una professione, non un partito. E la maggior parte della gente non apparteneva a nessun gruppo: contadini, pescatori, artigiani, la sinagoga del villaggio e le feste a Gerusalemme.' }
      ] },

    /* 6 · Pausa gioco: Sfida a squadre (anelli 1-4) */
    { fase: 'Attività', momento: 'Pausa gioco', minuti: 6, titolo: 'Due squadre, *una mappa*',
      testo: 'Chi comanda dove, chi pensa che cosa. Prima di rispondere chiedetevi: **dove** siamo, **quando**, **fra chi**?',
      blocchi: [
        { tipo: 'gioco', id: 'sfida', titolo: 'Sfida a squadre', testo: 'Due squadre, otto domande, venti secondi a turno: chi sbaglia lascia la domanda all’altra squadra, che può rubarla.', pulsante: 'Si gioca' },
        { tipo: 'rivela', titolo: 'Al ritorno', iniziali: 1, pulsante: 'Altra domanda', passi: [
          { titolo: 'La più discussa', testo: 'Quale domanda ha diviso di più le squadre, e perché?' },
          { titolo: 'Due governi', testo: 'Nazaret e Gerusalemme: chi comanda nell’una e nell’altra?' }
        ] }
      ] },

    /* 7 · La trappola del tributo (anello 5): decide la classe, poi la fonte letta a parti */
    { fase: 'Attività', momento: 'Fonte', minuti: 6, titolo: 'Torniamo a *Cesare*',
      lead: '**Ora si capisce** perché una domanda era pericolosa. A Gerusalemme mandano da Gesù «alcuni farisei ed {erodiani}, per coglierlo in fallo nel discorso» (Mc 12,13).',
      blocchi: [
        { tipo: 'bivio', etichetta: 'Mettetevi al suo posto',
          caso: '«È lecito o no pagare il {tributo} a Cesare? Dobbiamo dare, o no?» (Mc 12,14). Davanti c’è la folla; in città c’è il prefetto romano. **Che cosa rispondereste?**',
          scelte: [
            { t: '«Sì, pagate.»', esito: 'I Romani non hanno nulla da ridire. Ma per chi la pensa come Giuda il Galileo, e per molta gente, diventate **complici dell’occupante**.', tono: 'ko' },
            { t: '«No, non pagate.»', esito: 'Forse la folla applaude. Ma è una frase da **ribelle**: basta riferirla al prefetto.', tono: 'ko' },
            { t: '«Non rispondo.»', esito: 'Nessun rischio immediato, ma davanti a tutti un maestro che tace sulla Legge **perde autorità**: la trappola funziona lo stesso.', tono: 'neutro' }
          ],
          pulsante: 'Che cosa risponde Gesù?', battuta: 'Leggiamolo a due voci.',
          chiusura: 'Marco racconta una risposta che **non entra in nessuna delle caselle**. Leggiamola a parti: un lettore per Gesù, uno per chi lo interroga, uno per il narratore. Eppure, nel processo, la frase verrà rovesciata: lo accuseranno di impedire «di pagare tributi a Cesare» (Lc 23,2).' },
        { tipo: 'dialogo', fonte: 'Mc 12,14-17 · Bibbia CEI 2008', iniziali: 1, istruzione: 'Tre lettori: chi interroga, Gesù, il narratore.',
          fine: 'Al potere ciò che gli spetta, a Dio ciò che spetta solo a Dio. Eppure nel processo lo accuseranno di impedire «di pagare tributi a Cesare» (Lc 23,2).',
          voci: [
            { chi: 'Farisei ed erodiani', t: '«Maestro, sappiamo che sei veritiero e non hai soggezione di alcuno, perché non guardi in faccia a nessuno, ma insegni la via di Dio secondo verità. È lecito o no pagare il tributo a Cesare? Dobbiamo dare, o no?»' },
            { chi: 'Gesù', t: '«Perché volete mettermi alla prova? Portatemi un {denaro}: voglio vederlo».' },
            { chi: 'Narratore', t: 'Ed essi glielo portarono. Allora disse loro:' },
            { chi: 'Gesù', t: '«Questa immagine e l’iscrizione, di chi sono?»' },
            { chi: 'Farisei ed erodiani', t: '«Di Cesare».' },
            { chi: 'Gesù', t: '«Quello che è di Cesare rendetelo a Cesare, e quello che è di Dio, a Dio».' },
            { chi: 'Narratore', t: 'E rimasero ammirati di lui.' }
          ] },
        { tipo: 'aggancio', etichetta: 'Per capire', titolo: 'L’immagine sulla moneta, l’immagine nell’uomo',
          t: 'Intorno al 200 lo scrittore cristiano Tertulliano commenta così: l’immagine di Cesare, che è sulla moneta, va a Cesare; l’immagine di Dio, che è nell’uomo, va a Dio. Il denaro si può rendere; la persona no.',
          fonte: 'Tertulliano, De idololatria 15,3 (in forma indiretta)' }
      ] },

    /* 8 · Nato sotto la Legge (anello 6, impronta) */
    { fase: 'Chiusura', momento: 'Il significato', minuti: 5, titolo: 'Nato *sotto la Legge*',
      lead: '**Per la fede cristiana** tutta questa concretezza non è un dettaglio.',
      blocchi: [
        { tipo: 'citazione', testo: 'Ma quando venne la pienezza del tempo, Dio mandò il suo Figlio, nato da donna, nato sotto la Legge.',
          fonte: 'Gal 4,4 · Bibbia CEI 2008', pulsante: 'Che cosa significa?',
          commento: 'È il senso dell’{incarnazione}: il Figlio di Dio si fa uomo non in generale, ma in un popolo, in una terra, in un’epoca. Per questo Luca data il racconto con i governanti, il Credo nomina Ponzio Pilato e il Catechismo dice Gesù «morto crocifisso a Gerusalemme, sotto il procuratore Ponzio Pilato, mentre regnava l’imperatore Tiberio» (CCC 423).' },
        { tipo: 'carte', titolo: 'Tre tracce rimaste', carte: [
          { etichetta: '525', fronte: 'Una fede con una data', retro: 'Il monaco Dionigi il Piccolo conta gli anni dalla nascita di Gesù; nei secoli successivi l’Occidente adotta questo calcolo. Sbagliò di qualche anno: Erode muore nel 4 a.C., e Gesù era già nato.' },
          { etichetta: '494', fronte: 'Cesare e Dio', retro: 'Papa Gelasio I scrive all’imperatore che il mondo è guidato da due poteri distinti. Il Vaticano II: Chiesa e comunità politica sono «indipendenti e autonome l’una dall’altra nel proprio campo» (*Gaudium et spes* 76). Distinzione spesso tradita, anche da cristiani.' },
          { etichetta: '1965', fronte: 'Gesù ebreo', retro: 'Per secoli molti cristiani hanno letto i Vangeli contro «gli ebrei». Il Concilio lo respinge: la passione non si imputa «né indistintamente a tutti gli Ebrei allora viventi, né agli Ebrei del nostro tempo» (*Nostra aetate* 4).' }
        ] }
      ] },

    /* 9 · Prova breve */
    { fase: 'Chiusura', momento: 'Prova', minuti: 4, titolo: 'Sapete *collocarlo*?',
      lead: 'Tre domande, da soli: poi si risponde per alzata di mano.',
      blocchi: [
        { tipo: 'quiz', etichetta: 'Prova', domande: [
          { q: 'Gesù a Gerusalemme, intorno al 30: quale autorità romana ha davanti?',
            opzioni: ['Erode il Grande', 'Il tetrarca Filippo', 'Il prefetto Ponzio Pilato', 'L’imperatore Augusto'], ok: 2,
            why: 'Gerusalemme è in Giudea, che dal 6 d.C. ha un governatore romano: Pilato dal 26 al 36. Erode il Grande è morto nel 4 a.C., Augusto nel 14 d.C.; Filippo governa il nord-est.' },
          { q: '«Gesù era contro gli ebrei.» Quale correzione è storicamente corretta?',
            opzioni: ['Gesù era un romano di Galilea', 'Gesù non ebbe contatti con il giudaismo', 'Gesù era contro tutti i farisei', 'Gesù, ebreo di Galilea, discute con altri ebrei su come vivere la Legge'], ok: 3,
            why: 'Gesù è «nato sotto la Legge» (Gal 4,4) e di sabato va in sinagoga (Lc 4,16). Discute *dentro* il suo popolo: sulla risurrezione sta con i farisei contro i sadducei.' },
          { q: 'Perché la domanda sul tributo era una trappola?',
            opzioni: ['Perché «sì» lo faceva sembrare complice di Roma e «no» un ribelle', 'Perché era vietato parlare di denaro nel Tempio', 'Perché Gesù non aveva monete', 'Perché i farisei non pagavano il tributo'], ok: 0,
            why: 'Farisei ed erodiani, con posizioni diverse verso il potere, si uniscono per coglierlo in fallo: ogni risposta secca lo metteva in pericolo con qualcuno.' }
        ], perfetto: 'Tre su tre: sapete dove, quando e fra chi.' }
      ] },

    /* 10 · Ritorno alla domanda iniziale e passaggio alla lezione 2 */
    { fase: 'Chiusura', minuti: 2, titolo: 'Rendete a *Cesare*',
      testo: '**La risposta:** detta da un ebreo di Galilea, sotto un tetrarca e un prefetto, a un popolo diviso proprio sul tributo, la frase non è né «paga e taci» né la separazione fra Stato e religione di oggi: **distingue** ciò che spetta al potere da ciò che spetta a Dio.',
      blocchi: [
        { tipo: 'domanda', id: 'uscita', confronta: 'ingresso', etichetta: 'Di nuovo, a fine lezione', q: 'Secondo voi, che cosa vuol dire questa frase?',
          opzioni: ['Paga le tasse e non discutere', 'Religione e politica sono cose separate', 'Dio viene prima dello Stato', 'Non lo so ancora'],
          dibattito: 'Il tratteggio d’oro è il voto d’inizio. A chi ha cambiato idea: che cosa vi ha convinto? Non c’è punteggio sulle opinioni: conta la ragione.' },
        { tipo: 'continua', voci: [
          { t: 'Prossima lezione · Lo screenshot non basta', d: 'Abbiamo la mappa. Ma fuori dai Vangeli, chi ricorda Gesù? E che cosa possono dire, davvero, quelle voci?' },
          { t: 'Giochi per il ripasso', d: 'Linea del tempo, vero o falso, abbinamenti', vai: 'giochi' }
        ] }
      ] }
  ],

  studio: {
    sezioni: [
      { titolo: 'La domanda',
        testo: '«Quello che è di Cesare rendetelo a Cesare, e quello che è di Dio, a Dio» (Mc 12,17). Molti conoscono questa frase di Gesù e le danno significati diversi: paga le tasse e non discutere, oppure religione e politica sono cose separate. Ma si può capire una frase senza sapere **dove, quando e fra chi** è stata detta? Per rispondere bisogna ricostruire la terra in cui Gesù è vissuto: chi vi comandava, che cosa pensava la gente, perché certe domande erano pericolose.' },
      { titolo: 'Un’aquila sulla porta del Tempio',
        testo: 'Lo storico ebreo Giuseppe Flavio, che scrive alla fine del I secolo, racconta un episodio degli ultimi mesi di Erode il Grande. Il re aveva fatto collocare sopra la grande porta del Tempio di Gerusalemme una grande aquila d’oro. Due maestri della **Legge**, Giuda e Mattia, insegnavano ai loro allievi che quell’immagine violava la Legge di Dio, che proibisce di farsi immagini (Es 20,4). La parola ebraica per la Legge è *tôrāh*, «insegnamento»: non un regolamento qualsiasi, ma l’istruzione che Dio dà al suo popolo. Quando si diffuse la voce che il re stava morendo, alcuni giovani si calarono con funi dal tetto, in pieno giorno e davanti alla folla, e abbatterono l’aquila a colpi d’ascia. Erode non era morto. Circa quaranta giovani furono arrestati; quelli che si erano calati dal tetto e i loro due maestri furono bruciati vivi.\n\nNel racconto bisogna distinguere due livelli. Per i maestri il problema era l’immagine proibita: questo lo dice la fonte. Molti storici vi leggono anche un omaggio a Roma, di cui l’aquila era un emblema: è un’**interpretazione**, plausibile, ma non una notizia della fonte. Anche la data della morte di Erode, il 4 a.C., è un calcolo degli storici sui dati di Giuseppe Flavio, che non usava i nostri numeri degli anni. Il fatto, invece, è chiaro: in quella terra obbedire al potere poteva scontrarsi con la fedeltà a Dio, fino a costare la vita.' },
      { titolo: 'Un regno spezzato',
        testo: '**Per capire perché**, bisogna sapere chi comandava. Nel 63 a.C. il generale romano Pompeo entra a Gerusalemme: da allora la terra d’Israele è sotto il controllo di Roma. Erode il Grande, nominato re dal senato romano nel 40 a.C., conquista Gerusalemme nel 37 e regna come re alleato dei Romani fino alla morte. Alla sua morte il regno **non resta unito**: Archelao riceve la Giudea, la Samaria e l’Idumea; Erode Antipa la Galilea e la Perea; Filippo le regioni a nord-est del lago di Tiberiade. Antipa e Filippo portano il titolo di **tetrarca**, dal greco *tetrárchēs*, «signore di una quarta parte»: al tempo di Gesù indica un principe dipendente da Roma, sotto il rango di re, e la parola stessa dice che il regno di Erode è stato spezzato.\n\nNel 6 d.C. Archelao viene deposto e la Giudea passa sotto un governatore romano, il **prefetto** (dal latino *praefectus*, «messo a capo»). Roma ordina un **censimento** per imporre il **tributo**, e un certo Giuda il Galileo guida una rivolta: per lui pagare significava riconoscere un altro signore oltre Dio. Una ventina d’anni dopo il prefetto Ponzio Pilato fece entrare di notte a Gerusalemme le insegne militari con l’effigie dell’imperatore; una folla andò a supplicarlo per giorni a Cesarea, pronta a morire piuttosto che veder violata la Legge, e Pilato le fece riportare indietro. **Immagini, tributo, fedeltà a Dio**: sono le parole che rendevano quella terra una polveriera.' },
      { titolo: 'Una frase che è una mappa',
        testo: 'È dentro questa situazione che Luca colloca l’inizio della predicazione di Giovanni Battista e, subito dopo, quella di Gesù. Non usa un numero di anno, che allora non esisteva: elenca chi comanda. «Nell’anno quindicesimo dell’impero di Tiberio Cesare, mentre Ponzio Pilato era governatore della Giudea, Erode tetrarca della Galilea, e Filippo, suo fratello, tetrarca dell’Iturea e della Traconitide, e Lisania tetrarca dell’Abilene, sotto i sommi sacerdoti Anna e Caifa, la parola di Dio venne su Giovanni, figlio di Zaccaria, nel deserto» (Lc 3,1-2).\n\nSciogliamola dall’alto verso il basso. **Tiberio** è imperatore dal 14 al 37 d.C.: il suo quindicesimo anno cade intorno al 28–29. **Ponzio Pilato** governa la Giudea dal 26 al 36. Nel 1961, nell’area del teatro di Cesarea Marittima, è stata trovata una pietra con un’iscrizione latina che ne riporta il nome e il titolo di *praefectus*, prefetto, della Giudea; oggi è all’Israel Museum di Gerusalemme. Molti testi lo chiamano «procuratore», il titolo dei governatori venuti più tardi. **Erode Antipa** è il tetrarca della Galilea, **Filippo** quello del nord-est. **Caifa** è sommo sacerdote, mentre il suocero **Anna** conserva grande autorità; il sommo sacerdote presiede il **Sinedrio** (dal greco *synédrion*, «assemblea»), il consiglio che a Gerusalemme regola le questioni religiose e giudiziarie, sotto il controllo romano.\n\nNe segue che Galilea e Giudea hanno **due governi**. Nazaret e Cafarnao sono in Galilea, sotto un principe ebreo, Erode Antipa, alleato di Roma. Gerusalemme è in Giudea, amministrata da un funzionario romano, il prefetto. Quando Gesù va a Gerusalemme passa da un governo all’altro. Luca lo mostra nel processo: Pilato, «saputo che stava sotto l’autorità di Erode», glielo rinvia (Lc 23,7).' },
      { titolo: 'Un popolo, molte voci',
        testo: '**Eppure** lo stesso popolo non rispondeva in un solo modo a questa situazione. Tutti riconoscevano il Dio unico, la Legge di Mosè e il Tempio, ma discutevano su come restare fedeli. Giuseppe Flavio descrive quattro correnti, che chiama «filosofie»; i Vangeli ne nominano anche un’altra. I **farisei** sono interpreti della Legge, stimati dal popolo, e credono nella risurrezione; il nome viene dall’aramaico e significa «separati», ma da che cosa, gli studiosi lo discutono. L’uso di «fariseo» per dire «ipocrita» è nato dopo e non descrive il gruppo storico. I **sadducei** sono pochi, ma delle famiglie più potenti, legate al Tempio e al sacerdozio; negano la risurrezione (Mc 12,18). Gli **esseni**, circa quattromila secondo Giuseppe Flavio, vivono in comunità e mettono in comune i beni; molti studiosi collegano al loro ambiente i manoscritti di Qumran. La «**quarta filosofia**» è quella di Giuda il Galileo: nessun signore se non Dio, quindi nessun tributo a Roma. Gli **erodiani**, nei Vangeli, sono i sostenitori della dinastia di Erode, cioè di Antipa.\n\nLa maggior parte della gente non apparteneva a nessun gruppo: contadini, pescatori, artigiani che pregavano nella sinagoga del villaggio e salivano a Gerusalemme per le feste. Gli **scribi** non sono un partito ma una professione: gli esperti della Legge. Gesù, ebreo di Galilea, discute dentro questo popolo. Sulla risurrezione, per esempio, sostiene contro i sadducei la stessa posizione dei farisei (Mc 12,18-27).' },
      { titolo: 'Una domanda che era una trappola',
        testo: '**Ora si capisce** perché una certa domanda era pericolosa. Marco racconta che a Gerusalemme mandarono da Gesù «alcuni farisei ed erodiani, per coglierlo in fallo nel discorso» (Mc 12,13): due gruppi con posizioni diverse verso il potere, uniti per l’occasione. Gli chiedono: «È lecito o no pagare il tributo a Cesare?» (Mc 12,14). Rispondere «sì» significava apparire complici dell’occupante; «no», apparire ribelli davanti ai Romani. Gesù si fa portare un **denaro**, la moneta d’argento romana (dal latino *denarius*, perché in origine valeva dieci assi), e chiede di chi siano l’immagine e l’iscrizione. «Di Cesare». Allora risponde: «Quello che è di Cesare rendetelo a Cesare, e quello che è di Dio, a Dio». E rimasero ammirati di lui (Mc 12,15-17).\n\nGesù non entra in nessuna delle due caselle: riconosce al potere ciò che gli spetta, il denaro che porta la sua immagine, e gli nega ciò che spetta soltanto a Dio. Intorno al 200 lo scrittore cristiano Tertulliano commenterà: l’immagine di Cesare, che è sulla moneta, a Cesare; l’immagine di Dio, che è nell’uomo, a Dio (*De idololatria* 15). Staccata dal contesto, però, la frase si può perfino rovesciare: nel processo davanti a Pilato lo accusano proprio di impedire «di pagare tributi a Cesare» (Lc 23,2).' },
      { titolo: 'Nato sotto la Legge',
        testo: '**Per la fede cristiana** tutta questa concretezza non è un dettaglio. San Paolo scrive che «quando venne la pienezza del tempo, Dio mandò il suo Figlio, nato da donna, nato sotto la Legge» (Gal 4,4). È il senso della parola **incarnazione** (dal latino ecclesiastico *incarnatio*, da *caro*, «carne»): il Figlio di Dio si fa uomo non in generale, ma in un popolo, in una terra, in un’epoca. Per questo Luca data il suo racconto con i governanti, il Credo nomina Ponzio Pilato e il Catechismo colloca Gesù «al tempo del re Erode il Grande e dell’imperatore Cesare Augusto» e lo dice «morto crocifisso a Gerusalemme, sotto il procuratore Ponzio Pilato, mentre regnava l’imperatore Tiberio» (CCC 423). È un’affermazione di fede; la storia ne mostra la cornice, non la dimostra.\n\nQuesta fede con una data ha lasciato tracce nella nostra cultura. Nel 525 il monaco Dionigi il Piccolo cominciò a contare gli anni dalla nascita di Gesù; nei secoli successivi l’Occidente ha adottato questo calcolo, e lo usa ancora. Sbagliò di qualche anno: Erode muore nel 4 a.C., e Gesù era già nato. Anche la distinzione fra Cesare e Dio ha avuto una lunga storia: nel 494 papa Gelasio I scrisse all’imperatore Anastasio che il mondo è guidato da due poteri distinti, l’autorità sacra dei pontefici e il potere dei re, e oggi il Concilio Vaticano II afferma che «la comunità politica e la Chiesa sono indipendenti e autonome l’una dall’altra nel proprio campo» (*Gaudium et spes* 76). Quella distinzione è stata spesso tradita, anche da cristiani, e la laicità moderna ha anche altre radici: il Vangelo l’ha aperta, non l’ha prodotta da solo.\n\n«Nato sotto la Legge» significa infine che Gesù è ebreo: a Nazaret «secondo il suo solito, di sabato, entrò nella sinagoga» (Lc 4,16). Ebrei erano i suoi discepoli, la prima comunità, alcuni suoi avversari e molti suoi amici. Per secoli, però, molti cristiani hanno letto i Vangeli contro «gli ebrei», e questa lettura ha alimentato un’ostilità dalle conseguenze gravissime. Il Concilio l’ha respinta perché falsa: «E se autorità ebraiche con i propri seguaci si sono adoperate per la morte di Cristo, tuttavia quanto è stato commesso durante la sua passione, non può essere imputato né indistintamente a tutti gli Ebrei allora viventi, né agli Ebrei del nostro tempo» (*Nostra aetate* 4).' },
      { titolo: 'Per lo studio',
        testo: '1. Nella frase di Lc 3,1-2 individua chi governa per conto di Roma, chi è un principe locale e chi ha un’autorità religiosa. Sotto quale autorità vive Gesù a Nazaret? E a Gerusalemme?\n\n2. Spiega in tre righe perché la domanda sul tributo (Mc 12,13-14) era una trappola, e perché conta che venisse da farisei ed erodiani insieme.\n\n3. Riscrivi la frase «Gesù era contro gli ebrei» in una forma storicamente corretta, usando almeno due informazioni di questo testo.\n\n4. Nel racconto dell’aquila d’oro, distingui una notizia della fonte da un’interpretazione degli storici.\n\n5. Domanda aperta. Pensa a una frase di oggi, letta in una chat o in un video, che cambia significato se non sai chi l’ha detta, dove e a chi. Che cosa ti servirebbe sapere?' },
      { titolo: 'La risposta',
        testo: 'Si può capire una frase senza sapere dove, quando e fra chi è stata detta? No. «Rendete a Cesare», detto da un ebreo di Galilea, sotto un tetrarca e un prefetto romano, a un popolo diviso proprio sul tributo, non è né «paga e taci» né la separazione fra Stato e religione di oggi: distingue ciò che spetta al potere da ciò che spetta a Dio. Conoscere questa mappa non dimostra la fede cristiana; permette però di leggere i Vangeli senza fraintenderli e di collocare Gesù dove è stato davvero: dentro il suo popolo, non contro di esso. **Una frase si capisce quando si sa dove, quando e fra chi è stata detta.**\n\nLa prossima lezione, «Lo screenshot non basta», cambia punto di vista: che cosa dicono di Gesù e dei primi cristiani le voci che vengono da fuori della fede, e fin dove arrivano.' }
    ],
    fonti: [
      'Bibbia CEI 2008: Es 20,4; Mc 12,13-27; Lc 3,1-2; 4,16; 23,2.6-7; Gal 4,4-5.',
      'Giuseppe Flavio, *Guerra giudaica* I,648-655 (= I,33,2-4) e *Antichità giudaiche* XVII,149-167 (= XVII,6,2-4): l’aquila d’oro; *Antichità* XVIII,1-25 (= XVIII,1,1-6): le quattro «filosofie» e Giuda il Galileo; *Antichità* XVIII,55-59 (= XVIII,3,1) e *Guerra giudaica* II,169-174: Pilato e le insegne. Racconti riferiti in forma indiretta.',
      'Tertulliano, *De idololatria* 15,3 (in forma indiretta).',
      'Concilio Vaticano II, *Nostra aetate* 4 e *Gaudium et spes* 76 (1965); *Catechismo della Chiesa Cattolica* 423. Testi italiani su vatican.va.',
      'Gelasio I e i «due poteri» (lettera ad Anastasio, 494): Treccani, *Enciclopedia dei Papi*, voce «Gelasio I». Dionigi il Piccolo: Treccani, voce «Dionigi il Piccolo».',
      'Iscrizione di Ponzio Pilato, Cesarea Marittima, 1961; Gerusalemme, Israel Museum.',
      '*Vocabolario Treccani*, voci «tetrarca», «prefetto», «censimento», «tributo», «sinedrio», «fariseo», «sadduceo», «esseno», «scriba», «denaro», «incarnazione».',
      'P. Franchi, *Sintesi di NT Sinottici* e *Storia della Chiesa I*, dispense (ambiente del Nuovo Testamento).',
      'Le carte della lezione sono schematiche e non in scala: mostrano chi governa dove, non i confini esatti.'
    ]
  },

  giochi: {
    tema: 'Sotto l’aquila — la terra di Gesù sotto Roma',
    sfida: [
      { q: 'Perché, secondo Giuseppe Flavio, i giovani abbatterono l’aquila d’oro?', a: ['Per rubarne l’oro', 'Perché era un’immagine vietata dalla Legge', 'Per ordine di Roma', 'Perché Erode era già morto'], ok: 1 },
      { q: 'Alla morte di Erode il Grande, nel 4 a.C., il suo regno…', a: ['passa intero ad Antipa', 'diventa subito provincia romana', 'si divide fra tre figli', 'torna agli Asmonei'], ok: 2 },
      { q: 'Chi governa la Galilea quando Gesù è adulto?', a: ['Ponzio Pilato', 'Erode il Grande', 'Caifa', 'Erode Antipa'], ok: 3 },
      { q: 'Che titolo ha Pilato sulla pietra di Cesarea?', a: ['Prefetto', 'Tetrarca', 'Re', 'Sommo sacerdote'], ok: 0 },
      { q: 'Nell’«anno quindicesimo» di Luca, chi è l’imperatore?', a: ['Augusto', 'Tiberio', 'Nerone', 'Tito'], ok: 1 },
      { q: 'Quale gruppo nega la risurrezione?', a: ['I farisei', 'Gli esseni', 'I sadducei', 'La quarta filosofia'], ok: 2 },
      { q: 'Chi guida nel 6 d.C. la rivolta contro il censimento?', a: ['Giuda il Galileo', 'Mattia', 'Caifa', 'Filippo'], ok: 0 },
      { q: 'Gli scribi erano…', a: ['un partito politico', 'soldati romani', 'sacerdoti del Tempio', 'esperti della Legge'], ok: 3 }
    ],
    seq: [
      { t: 'Pompeo entra a Gerusalemme', y: '63 a.C.' },
      { t: 'Erode il Grande conquista Gerusalemme', y: '37 a.C.' },
      { t: 'Morte di Erode; il regno si divide', y: '4 a.C.' },
      { t: 'Censimento e rivolta di Giuda il Galileo', y: '6 d.C.' },
      { t: 'Pilato diventa prefetto della Giudea', y: '26 d.C.' },
      { t: 'Anno quindicesimo di Tiberio (Lc 3,1)', y: 'c. 28–29' },
      { t: 'Gelasio I: due poteri distinti', y: '494' },
      { t: 'Dionigi il Piccolo conta gli anni da Cristo', y: '525' }
    ],
    vf: [
      { s: 'Gesù cresce in Giudea, sotto Pilato.', v: false, why: 'Cresce a Nazaret, in Galilea, sotto il tetrarca Erode Antipa.' },
      { s: 'Che l’aquila fosse un omaggio a Roma lo scrive Giuseppe Flavio.', v: false, why: 'La fonte parla della Legge sulle immagini; l’omaggio a Roma è un’interpretazione degli storici.' },
      { s: 'La domanda sul tributo venne da farisei ed erodiani insieme.', v: true, why: 'Mc 12,13: due gruppi con posizioni diverse verso il potere, uniti per coglierlo in fallo.' },
      { s: 'I farisei credono nella risurrezione.', v: true, why: 'È uno dei punti che li distingue dai sadducei; su questo Gesù sta con loro (Mc 12,18-27).' },
      { s: '«Fariseo» voleva dire «ipocrita» già al tempo di Gesù.', v: false, why: 'Quel senso è nato dopo; il nome significa «separati» e indica interpreti della Legge stimati dal popolo.' },
      { s: 'Tutti gli ebrei del tempo appartenevano a un gruppo religioso.', v: false, why: 'La maggior parte della gente non apparteneva a nessuna corrente.' },
      { s: 'Erode il Grande era vivo durante la predicazione di Gesù.', v: false, why: 'Morì nel 4 a.C.; nell’anno quindicesimo di Tiberio governano i suoi figli e un prefetto romano.' },
      { s: 'Il Concilio Vaticano II esclude che la passione si imputi a tutti gli ebrei.', v: true, why: '*Nostra aetate* 4: né a tutti gli ebrei di allora, né a quelli di oggi.' }
    ],
    abbina: [
      ['Tiberio', 'imperatore a Roma'],
      ['Ponzio Pilato', 'prefetto della Giudea'],
      ['Erode Antipa', 'tetrarca della Galilea'],
      ['Caifa', 'sommo sacerdote'],
      ['Giuda il Galileo', 'no al tributo']
    ],
    quiz: [
      { q: 'Perché Luca apre il racconto con una lista di governanti?', a: ['Per mostrare di conoscere la corte di Roma', 'Per datare i fatti con persone note anche da altri documenti', 'Perché erano tutti presenti alla predicazione', 'Per criticare Roma'], ok: 1, why: 'Allora non esisteva un numero di anno comune: la data si dava con chi governava.' },
      { q: 'Che cosa significa in origine «tetrarca»?', a: ['Signore di una quarta parte', 'Sacerdote del Tempio', 'Generale romano', 'Maestro della Legge'], ok: 0, why: '*Tetra-* «quattro», *-árchēs* «che comanda»: la parola dice che il regno di Erode è stato spezzato.' },
      { q: 'Perché Pilato rinvia Gesù a Erode (Lc 23,7)?', a: ['Perché Erode era il suo superiore', 'Perché il Sinedrio lo aveva chiesto', 'Perché Gesù era galileo, quindi sotto l’autorità di Antipa', 'Perché Pilato era in Galilea'], ok: 2, why: 'Galilea e Giudea hanno due governi: Gesù viene dalla Galilea di Antipa.' },
      { q: 'Di che cosa accusano Gesù davanti a Pilato, secondo Lc 23,2?', a: ['Di aver abbattuto l’aquila', 'Di essere un sadduceo', 'Di non andare al Tempio', 'Di impedire di pagare tributi a Cesare'], ok: 3, why: 'È il rovesciamento della sua risposta: staccata dal contesto, una frase si usa contro chi l’ha detta.' },
      { q: 'Che cosa afferma Gaudium et spes 76?', a: ['Che Chiesa e comunità politica sono indipendenti e autonome nel proprio campo', 'Che lo Stato deve obbedire alla Chiesa', 'Che la Chiesa non deve mai parlare di politica', 'Che il tributo è sempre ingiusto'], ok: 0, why: 'Distingue i due campi; non chiede alla Chiesa di tacere né allo Stato di obbedirle.' }
    ],
    completa: {
      testo: 'Nazaret è in {Galilea}, governata dal tetrarca {Antipa}. Gerusalemme è in {Giudea}, governata dal prefetto {Pilato}. I {sadducei} negano la risurrezione.',
      extra: ['Samaria', 'farisei', 'Tiberio']
    }
  }
};

/* =====================================================================
   Componenti della lezione (React con htm). Interazioni con <button> veri;
   hover / focus-visible / active nel CSS qui sotto (solo token) o dalle classi del kit.
   ===================================================================== */
(function () {
  var I = LabLezione.inline;
  var useState = React.useState, useEffect = React.useEffect, useRef = React.useRef;
  /* Memoria in pagina: tornando a una scena (anche dalla pausa gioco) il componente riprende da dove era. Nulla va nel browser. */
  var MEM = {};
  function useMem(key, iniziale) {
    var s = useState(function () { return Object.prototype.hasOwnProperty.call(MEM, key) ? MEM[key] : iniziale; });
    return [s[0], function (v) { MEM[key] = v; s[1](v); }];
  }
  function ridotto() { try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; } }

  /* ---------- Stile dei componenti: solo token del design system ---------- */
  (function () {
    if (typeof document === 'undefined' || document.getElementById('aq-css')) return;
    var s = document.createElement('style'); s.id = 'aq-css';
    s.textContent = [
      '.aq-wrap{display:grid;gap:21px}',
      '.lp-seg{text-align:left}',
      '@media(min-width:900px){.aq-wrap{grid-template-columns:1.618fr 1fr;align-items:start}}',
      '.aq-stage{position:relative;border-radius:21px;border:1px solid var(--lab-line);background:var(--lab-surface);overflow:hidden}',
      '.aq-stage svg{display:block;width:100%;height:auto;max-height:46vh}',
      '.aq-cap{margin:0;font:500 clamp(17px,1.6vw,20px)/1.5 var(--lab-font-body);color:var(--lab-ink)}',
      '.aq-cap b{color:var(--la-accent)}',
      '.aq-src{margin:8px 0 0;font-size:13px;line-height:1.4;color:var(--lab-muted)}',
      '.aq-ctrl{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-top:13px}',
      '.aq-dots{display:flex;gap:6px;flex-wrap:wrap}',
      '.aq-dot{min-width:44px;min-height:44px;padding:0 11px;border-radius:999px;border:1.5px solid var(--lab-line);background:var(--lab-surface-2);color:var(--lab-ink);font:600 13px/1 var(--lab-font-inscription);letter-spacing:.08em;cursor:pointer;transition:border-color 144ms,transform 144ms,background 144ms}',
      '.aq-dot:hover{border-color:var(--la-accent);transform:translateY(-2px)}.aq-dot:active{transform:scale(.95)}',
      '.aq-dot[aria-current="step"]{background:var(--la-accent);border-color:transparent;color:var(--lab-bg)}',
      '.aq-dot:focus-visible,.mp-nome:focus-visible,.mp-luogo:focus-visible{outline:2px solid var(--lab-oro);outline-offset:3px}',
      /* scena dell'aquila */
      '.aq-wall{fill:var(--lab-surface-2);stroke:var(--lab-line);stroke-width:1.5}',
      '.aq-gate{fill:var(--lab-bg);stroke:var(--lab-line);stroke-width:1.5}',
      '.aq-line{stroke:var(--lab-muted);stroke-width:1.5;fill:none}',
      '.aq-eagle{fill:var(--lab-oro);transition:transform 987ms cubic-bezier(.16,1,.3,1),opacity 610ms}',
      '.aq-eagle.is-down{transform:translate(70px,104px) rotate(-38deg)}',
      '.aq-eagle.is-broken{transform:translate(78px,112px) rotate(-62deg);opacity:.55}',
      '.aq-glow{fill:var(--lab-oro);opacity:.16}',
      '.aq-fig{fill:var(--lab-ink-soft)}',
      '.aq-fig--acc{fill:var(--la-accent)}',
      '.aq-rope{stroke:var(--lab-oro);stroke-width:1.5;stroke-dasharray:4 3;opacity:.85}',
      '.aq-t{font:600 11px/1 var(--lab-font-body);fill:var(--lab-ink)}',
      '.aq-k{font:600 9px/1 var(--lab-font-inscription);letter-spacing:.14em;fill:var(--lab-oro)}',
      '.aq-in{animation:aqIn 610ms cubic-bezier(.16,1,.3,1) both}',
      '@keyframes aqIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}',
      /* carta del regno */
      '.rs-mare{fill:color-mix(in srgb,var(--lab-ciano) 14%,var(--lab-surface))}',
      '.rs-acqua{fill:color-mix(in srgb,var(--lab-ciano) 30%,var(--lab-surface))}',
      '.rs-fiume{stroke:color-mix(in srgb,var(--lab-ciano) 55%,var(--lab-surface));stroke-width:2;fill:none}',
      '.rs-reg{stroke:var(--lab-bg);stroke-width:2;transition:fill 610ms cubic-bezier(.16,1,.3,1)}',
      '.rs-o-neutro{fill:var(--lab-surface-2)}',
      '.rs-o-erode{fill:color-mix(in srgb,var(--lab-oro) 55%,var(--lab-surface))}',
      '.rs-o-arch{fill:color-mix(in srgb,var(--lab-rosa) 45%,var(--lab-surface))}',
      '.rs-o-ant{fill:color-mix(in srgb,var(--la-accent) 50%,var(--lab-surface))}',
      '.rs-o-fil{fill:color-mix(in srgb,var(--lab-ambra) 40%,var(--lab-surface))}',
      '.rs-o-roma{fill:color-mix(in srgb,var(--lab-viola) 55%,var(--lab-surface))}',
      '.rs-crack{stroke:var(--lab-ink);stroke-width:2.5;fill:none;stroke-dasharray:6 5}',
      '.rs-crack.is-on{animation:rsCrack 987ms cubic-bezier(.16,1,.3,1) both}',
      '@keyframes rsCrack{from{stroke-dashoffset:120;opacity:0}to{stroke-dashoffset:0;opacity:1}}',
      '.rs-n{font:600 10px/1 var(--lab-font-inscription);letter-spacing:.12em;fill:var(--lab-ink);text-transform:uppercase}',
      '.rs-o{font:700 12px/1 var(--lab-font-body);fill:var(--lab-ink)}',
      '.rs-c{fill:var(--lab-ink)}',
      '.rs-cl{font:500 10px/1 var(--lab-font-body);fill:var(--lab-ink-soft)}',
      '.rs-badge rect{fill:var(--lab-bg);stroke:var(--lab-oro);stroke-width:1.2}',
      '.rs-badge text{font:700 10.5px/1 var(--lab-font-body);fill:var(--lab-ink)}',
      '.rs-leg{list-style:none;margin:13px 0 0;padding:0;display:grid;gap:8px}',
      '.rs-leg li{display:flex;align-items:center;gap:8px;font-size:15px;line-height:1.35}',
      '.rs-sw{flex:0 0 auto;width:18px;height:18px;border-radius:5px;border:1px solid var(--lab-line)}',
      '.rs-sw.rs-o-erode{background:color-mix(in srgb,var(--lab-oro) 55%,var(--lab-surface))}',
      '.rs-sw.rs-o-arch{background:color-mix(in srgb,var(--lab-rosa) 45%,var(--lab-surface))}',
      '.rs-sw.rs-o-ant{background:color-mix(in srgb,var(--la-accent) 50%,var(--lab-surface))}',
      '.rs-sw.rs-o-fil{background:color-mix(in srgb,var(--lab-ambra) 40%,var(--lab-surface))}',
      '.rs-sw.rs-o-roma{background:color-mix(in srgb,var(--lab-viola) 55%,var(--lab-surface))}',
      '.rs-sw.rs-o-neutro{background:var(--lab-surface-2)}',
      '.rs-year{display:block;font:600 13px/1 var(--lab-font-inscription);letter-spacing:.14em;color:var(--lab-oro);margin-bottom:8px}',
      /* mappa del potere */
      '.mp-nomi{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 13px}',
      '.mp-nome{min-height:44px;padding:8px 15px;border-radius:999px;border:1.5px solid var(--lab-line);background:var(--lab-surface-2);color:var(--lab-ink);font:600 15px/1.2 var(--lab-font-body);cursor:pointer;transition:border-color 144ms,transform 144ms,background 144ms}',
      '.mp-nome:hover:not(:disabled){border-color:var(--la-accent);transform:translateY(-2px)}.mp-nome:active:not(:disabled){transform:scale(.96)}',
      '.mp-nome[aria-pressed="true"]{background:var(--la-accent);border-color:transparent;color:var(--lab-bg)}',
      '.mp-nome:disabled{cursor:default;border-style:dashed;border-color:var(--lab-verde);opacity:.8}',
      '.mp-box{position:relative;max-width:440px;margin:0 auto}',
      '.mp-box svg{display:block;width:100%;height:auto}',
      '.mp-luogo{position:absolute;transform:translate(-50%,-50%);min-height:34px;padding:5px 10px;border-radius:999px;border:1.5px solid var(--lab-line);background:color-mix(in srgb,var(--lab-bg) 82%,transparent);color:var(--lab-ink);font:600 13px/1.15 var(--lab-font-body);cursor:pointer;display:grid;justify-items:center;gap:2px;max-width:46%;white-space:nowrap;transition:border-color 144ms,transform 144ms,background 144ms}',
      '.mp-luogo:hover{border-color:var(--lab-oro);transform:translate(-50%,-50%) scale(1.06)}.mp-luogo:active{transform:translate(-50%,-50%) scale(.92)}',
      '.mp-luogo.is-full{border-color:var(--lab-verde)}',
      '.mp-luogo.is-ko{border-color:var(--lab-rosso);animation:mpNo 377ms}',
      '.mp-luogo-c{font-size:11px;font-weight:700;color:var(--la-accent)}',
      '@keyframes mpNo{0%,100%{margin-left:0}25%{margin-left:-5px}75%{margin-left:5px}}',
      '@media(max-width:440px){.mp-luogo{font-size:11.5px;padding:4px 7px;min-height:30px}.mp-luogo-c{font-size:10px}}',
      '@media(prefers-reduced-motion:reduce){.aq-eagle,.rs-reg{transition:none}.rs-crack.is-on,.aq-in,.mp-luogo.is-ko{animation:none}}'
    ].join('\n');
    document.head.appendChild(s);
  })();

  /* ---------- Aquila: il racconto di Giuseppe Flavio in quattro fotogrammi (scena 2) ----------
     Ricostruzione grafica schematica, dichiarata. Interazioni: «Avanti» (ll-btn: magnetico, lama di luce, active 0,96,
     focus oro), «Indietro» (ll-btn--ghost), pallini dei fotogrammi (aq-dot: hover bordo anno −2 px, active 0,95, focus oro). */
  var AQ = [
    { k: 'L’aquila', d: 'Sopra la grande porta del Tempio, Erode fa collocare una grande **aquila d’oro**.' },
    { k: 'I maestri', d: 'Due maestri della {Legge}, Giuda e Mattia, insegnano che quell’immagine **viola la Legge** (Es 20,4).' },
    { k: 'La voce', d: 'Corre voce che il re stia morendo: alcuni giovani si calano con funi dal tetto, **a mezzogiorno**, davanti alla folla, e abbattono l’aquila a colpi d’ascia.' },
    { k: 'Il re è vivo', d: 'Erode non è morto: circa quaranta arrestati. Chi si era calato e i due maestri sono **bruciati vivi**.' }
  ];
  function Fig(x, y, acc, key) {
    return html`<g key=${key} className=${acc ? 'aq-fig aq-fig--acc' : 'aq-fig'}><circle cx=${x} cy=${y} r="5" /><path d=${'M' + (x - 5) + ' ' + (y + 22) + ' L' + x + ' ' + (y + 6) + ' L' + (x + 5) + ' ' + (y + 22) + ' Z'} /></g>`;
  }
  LabLezione.registra('Aquila', function (p) {
    var s = useMem('aq-k', 0), k = s[0], setK = s[1];
    var n = AQ.length;
    function vai(j) {
      var t = Math.max(0, Math.min(n - 1, j)); setK(t);
      if (t === n - 1 && k !== n - 1) p.ctx.say('Un’immagine sopra una porta è costata la vita. Teniamolo a mente.');
    }
    var eagleCls = 'aq-eagle' + (k === 2 ? ' is-down' : k === 3 ? ' is-broken' : '');
    return html`<div className="aq-wrap">
      <div className="aq-stage">
        <svg viewBox="0 0 320 210" role="img" aria-label=${'Ricostruzione schematica, fotogramma ' + (k + 1) + ' di ' + n + ': ' + LabLezione.plain(AQ[k].d)}>
          <rect className="aq-wall" x="40" y="40" width="240" height="160" rx="4" />
          <path className="aq-line" d="M30 40 H290 M40 52 H280" />
          <path className="aq-gate" d="M120 200 V120 Q160 86 200 120 V200 Z" />
          <path className="aq-line" d="M60 200 V70 M260 200 V70 M88 200 V70 M232 200 V70" />
          <text className="aq-k" x="160" y="196" text-anchor="middle">PORTA DEL TEMPIO</text>
          ${k < 2 && html`<ellipse className="aq-glow" cx="160" cy="70" rx="44" ry="20" />`}
          <g className=${eagleCls} style=${{ transformOrigin: '160px 70px', transformBox: 'view-box' }}>
            <path d="M160 58 L120 48 L132 62 L116 64 L136 72 L150 70 Z" />
            <path d="M160 58 L200 48 L188 62 L204 64 L184 72 L170 70 Z" />
            <ellipse cx="160" cy="70" rx="10" ry="15" />
            <circle cx="160" cy="54" r="6" />
            <path d="M150 84 L160 92 L170 84 Z" />
          </g>
          ${k === 1 && html`<g className="aq-in">
            ${Fig(26, 160, true, 'm1')}${Fig(296, 160, true, 'm2')}
            <text className="aq-t" x="26" y="152" text-anchor="middle">Giuda</text>
            <text className="aq-t" x="296" y="152" text-anchor="middle">Mattia</text>
            <rect x="122" y="96" width="76" height="20" rx="10" fill="var(--lab-bg)" stroke="var(--lab-oro)" />
            <text className="aq-t" x="160" y="110" text-anchor="middle">Es 20,4</text>
          </g>`}
          ${k === 2 && html`<g className="aq-in">
            <line className="aq-rope" x1="132" y1="28" x2="132" y2="74" /><line className="aq-rope" x1="190" y1="28" x2="190" y2="80" />
            ${Fig(132, 76, true, 'g1')}${Fig(190, 82, true, 'g2')}
            <text className="aq-k" x="160" y="22" text-anchor="middle">MEZZOGIORNO</text>
          </g>`}
          ${k === 3 && html`<g className="aq-in">
            ${[70, 92, 228, 250].map(function (x, i) { return Fig(x, 168, false, 'a' + i); })}
            <rect x="96" y="96" width="128" height="22" rx="11" fill="var(--lab-bg)" stroke="var(--lab-rosso)" />
            <text className="aq-t" x="160" y="111" text-anchor="middle">circa 40 arrestati</text>
          </g>`}
        </svg>
      </div>
      <div>
        <span className="rs-year">${'Fotogramma ' + (k + 1) + ' di ' + n + ' · ' + AQ[k].k}</span>
        <p className="aq-cap" aria-live="polite" key=${k}>${I(AQ[k].d, 'aq' + k)}</p>
        <div className="aq-ctrl">
          ${k > 0 && html`<button className="ll-btn ll-btn--ghost" onClick=${function () { vai(k - 1); }}>Fotogramma precedente</button>`}
          ${k < n - 1 ? html`<button className="ll-btn" onClick=${function () { vai(k + 1); }}>Fotogramma successivo</button>` : html`<button className="ll-link" onClick=${function () { vai(0); }}>Da capo</button>`}
        </div>
        <div className="aq-dots aq-ctrl" role="group" aria-label="Fotogrammi">
          ${AQ.map(function (f, j) { return html`<button key=${j} className="aq-dot" aria-current=${j === k ? 'step' : null} aria-label=${'Fotogramma ' + (j + 1) + ': ' + f.k} onClick=${function () { vai(j); }}>${j + 1}</button>`; })}
        </div>
        <p className="aq-src">Racconto di Giuseppe Flavio, <i>Guerra giudaica</i> I,648-655 e <i>Antichità giudaiche</i> XVII,149-167, in forma indiretta. Disegno schematico.</p>
      </div>
    </div>`;
  });

  /* ---------- Carta schematica condivisa (Regno spezzato, Mappa del potere) ----------
     viewBox 0 0 300 360; non in scala. Regioni: Galilea, Samaria, Giudea, Idumea, Perea, Nord-est (Iturea, Traconitide). */
  var REG = {
    gal: { n: 'Galilea', d: 'M75 28 L176 28 L184 72 L180 118 L62 124 L68 76 Z', x: 116, y: 52 },
    ne: { n: 'Nord-est', d: 'M188 0 L300 0 L300 128 L214 128 L208 100 L196 58 Z', x: 252, y: 46 },
    sam: { n: 'Samaria', d: 'M62 124 L180 118 L186 190 L52 198 Z', x: 118, y: 156 },
    giud: { n: 'Giudea', d: 'M52 198 L186 190 L191 252 L190 286 L42 290 Z', x: 104, y: 226 },
    idu: { n: 'Idumea', d: 'M42 290 L190 286 L188 360 L33 360 Z', x: 110, y: 326 },
    per: { n: 'Perea', d: 'M212 150 L264 150 L264 300 L214 300 L212 230 Z', x: 238, y: 196 }
  };
  var ORD = ['gal', 'ne', 'sam', 'giud', 'idu', 'per'];
  function Carta(o) {
    /* o.own: {reg: classe}, o.lab: {reg: testo del governante}, o.cracks, o.extra */
    return html`<g>
      <path className="rs-mare" d="M0 0 L78 0 L70 60 L62 120 L56 170 L48 230 L40 290 L32 360 L0 360 Z" />
      ${ORD.map(function (id) { return html`<path key=${id} className=${'rs-reg rs-o-' + ((o.own && o.own[id]) || 'neutro')} d=${REG[id].d} />`; })}
      <ellipse className="rs-acqua" cx="196" cy="94" rx="9" ry="17" />
      <path className="rs-fiume" d="M197 112 C193 150 206 180 199 210 C194 230 203 240 200 252" />
      <ellipse className="rs-acqua" cx="201" cy="292" rx="10" ry="38" />
      ${o.cracks && html`<g key=${'cr' + o.cracksKey}>
        <path className="rs-crack is-on" d="M62 124 L180 118 L184 72" />
        <path className="rs-crack is-on" d="M188 0 L196 58 L208 100 L214 128" />
        <path className="rs-crack is-on" d="M206 150 L212 230 L214 300" />
      </g>`}
      ${ORD.map(function (id) {
        var r = REG[id], l = o.lab && o.lab[id];
        if (o.nomi === false) return null;
        return html`<g key=${'t' + id}><text className="rs-n" x=${r.x} y=${r.y} text-anchor="middle">${r.n}</text>${l && html`<text className="rs-o" x=${r.x} y=${r.y + 15} text-anchor="middle">${l}</text>`}</g>`;
      })}
      ${(o.citta !== false) && html`<g>
        <circle className="rs-c" cx="128" cy="96" r="2.6" /><text className="rs-cl" x="124" y="108" text-anchor="end">Nazaret</text>
        <circle className="rs-c" cx="186" cy="80" r="2.6" /><text className="rs-cl" x="181" y="90" text-anchor="end">Cafarnao</text>
        <circle className="rs-c" cx="60" cy="160" r="2.6" /><text className="rs-cl" x="55" y="152" text-anchor="end">Cesarea</text>
        <circle className="rs-c" cx="150" cy="252" r="3.4" /><text className="rs-cl" x="146" y="266" text-anchor="end">Gerusalemme</text>
      </g>`}
      <text className="rs-cl" x="10" y="350" transform="rotate(-82 10 350)">Mar Mediterraneo</text>
      ${o.extra}
    </g>`;
  }
  function Badge(x, y, t, key) {
    var w = t.length * 5.9 + 14;
    return html`<g key=${key} className="rs-badge aq-in"><rect x=${x - w / 2} y=${y - 11} width=${w} height="20" rx="10" /><text x=${x} y=${y + 3} text-anchor="middle">${t}</text></g>`;
  }

  /* ---------- RegnoSpezzato: la carta che cambia dal 63 a.C. al 36 d.C. (scena 3, concetto più difficile) ----------
     Cinque fotogrammi; ogni regione mostra anche il nome di chi governa (mai solo il colore).
     Interazioni: date (aq-dot), «Avanti» (ll-btn), «Indietro» (ll-btn--ghost), «Riproduci» (ll-btn--ghost; rispetta reduced-motion). */
  var G = { a: 'Archelao', an: 'Antipa', f: 'Filippo', e: 'Erode', r: 'Roma' };
  var RS = [
    { y: '63 a.C.', t: 'Arriva Roma', d: 'Il generale **Pompeo** entra a Gerusalemme: da allora la terra d’Israele è sotto il controllo di Roma.',
      own: {}, lab: {}, leg: [['neutro', 'Regno sotto il controllo di Roma']], extra: function () { return [Badge(150, 18, '← Pompeo arriva da Roma', 'b0')]; } },
    { y: '37–4 a.C.', t: 'Un re alleato', d: '**Erode il Grande**, nominato re dal senato romano, regna su tutto il territorio come re alleato di Roma.',
      own: { gal: 'erode', ne: 'erode', sam: 'erode', giud: 'erode', idu: 'erode', per: 'erode' }, lab: { gal: 'Erode', ne: 'Erode', sam: 'Erode', giud: 'Erode', idu: 'Erode', per: 'Erode' },
      leg: [['erode', 'Erode il Grande · re alleato di Roma']], extra: function () { return [Badge(118, 262 - 30, 'aquila sul Tempio', 'b1')]; } },
    { y: '4 a.C.', t: 'Il regno si spezza', d: 'Morto Erode, il regno **non resta unito**: lo dividono tre figli. Antipa e Filippo sono {tetrarchi|tetrarca}.',
      own: { gal: 'ant', per: 'ant', ne: 'fil', sam: 'arch', giud: 'arch', idu: 'arch' }, lab: { gal: G.an, per: G.an, ne: G.f, sam: G.a, giud: G.a, idu: G.a }, cracks: true,
      leg: [['arch', 'Archelao · Giudea, Samaria, Idumea'], ['ant', 'Erode Antipa · tetrarca di Galilea e Perea'], ['fil', 'Filippo · tetrarca del nord-est']] },
    { y: '6 d.C.', t: 'Il tributo', d: 'Archelao è deposto: la Giudea passa a un **governatore romano**. Il {censimento} per il {tributo} fa insorgere **Giuda il Galileo**.',
      own: { gal: 'ant', per: 'ant', ne: 'fil', sam: 'roma', giud: 'roma', idu: 'roma' }, lab: { gal: G.an, per: G.an, ne: G.f, sam: 'Roma', giud: 'Roma', idu: 'Roma' },
      leg: [['roma', 'Governatore romano · Giudea, Samaria, Idumea'], ['ant', 'Antipa · Galilea e Perea'], ['fil', 'Filippo · nord-est']], extra: function () { return [Badge(120, 196 + 0, 'censimento · tributo', 'b3')]; } },
    { y: '26–36 d.C.', t: 'Le insegne', d: 'Il {prefetto} **Ponzio Pilato** porta di notte a Gerusalemme le insegne con l’effigie dell’imperatore; la folla protesta per giorni a Cesarea, e lui le ritira.',
      own: { gal: 'ant', per: 'ant', ne: 'fil', sam: 'roma', giud: 'roma', idu: 'roma' }, lab: { gal: G.an, per: G.an, ne: G.f, sam: 'Pilato', giud: 'Pilato', idu: 'Pilato' },
      leg: [['roma', 'Ponzio Pilato · prefetto della Giudea'], ['ant', 'Antipa · Galilea e Perea (qui cresce Gesù)'], ['fil', 'Filippo · nord-est']], extra: function () { return [Badge(150, 284, 'insegne con l’effigie', 'b4')]; } }
  ];
  LabLezione.registra('RegnoSpezzato', function (p) {
    var s = useMem('rs-k', 0), k = s[0], setK = s[1], pl = useState(false), play = pl[0], setPlay = pl[1], t = useRef(0);
    var n = RS.length, F = RS[k];
    function vai(j) {
      var x = Math.max(0, Math.min(n - 1, j)); setK(x);
      if (x === n - 1 && k !== n - 1) { p.ctx.cheer(); p.ctx.say('Immagini, tributo, fedeltà a Dio: ecco perché un’aquila poteva costare la vita.'); }
    }
    useEffect(function () {
      if (!play) return;
      if (k >= n - 1) { setPlay(false); return; }
      t.current = setTimeout(function () { vai(k + 1); }, ridotto() ? 1200 : 2618);
      return function () { clearTimeout(t.current); };
    }, [play, k]);
    return html`<div className="aq-wrap">
      <div className="aq-stage">
        <svg viewBox="0 0 300 360" role="img" aria-label=${'Carta schematica, ' + F.y + ': ' + F.leg.map(function (l) { return l[1]; }).join('; ')}>
          ${Carta({ own: F.own, lab: F.lab, cracks: !!F.cracks, cracksKey: k, extra: F.extra ? F.extra() : null })}
        </svg>
      </div>
      <div>
        <span className="rs-year">${F.y + ' · ' + F.t}</span>
        <p className="aq-cap" aria-live="polite" key=${k}>${I(F.d, 'rs' + k)}</p>
        <ul className="rs-leg">${F.leg.map(function (l, i) { return html`<li key=${i}><span className=${'rs-sw rs-o-' + l[0]} aria-hidden="true"></span>${l[1]}</li>`; })}</ul>
        <div className="aq-ctrl">
          ${k > 0 && html`<button className="ll-btn ll-btn--ghost" onClick=${function () { setPlay(false); vai(k - 1); }}>Data precedente</button>`}
          ${k < n - 1 ? html`<button className="ll-btn" onClick=${function () { setPlay(false); vai(k + 1); }}>Data successiva</button>` : html`<button className="ll-link" onClick=${function () { vai(0); }}>Da capo</button>`}
          ${k < n - 1 && html`<button className="ll-btn ll-btn--ghost" aria-pressed=${play} onClick=${function () { setPlay(!play); }}>${play ? 'Pausa' : 'Riproduci'}</button>`}
        </div>
        <div className="aq-dots aq-ctrl" role="group" aria-label="Date">
          ${RS.map(function (f, j) { return html`<button key=${j} className="aq-dot" aria-current=${j === k ? 'step' : null} onClick=${function () { setPlay(false); vai(j); }}>${f.y}</button>`; })}
        </div>
        ${k === n - 1 && html`<p className="ll-why is-ok"><strong>Una polveriera. </strong>Un potere straniero che si mostra con immagini e chiede un tributo, un popolo che vuole restare fedele alla Legge.</p>`}
        <p className="aq-src">Carta schematica, non in scala. Fonti: Giuseppe Flavio, <i>Antichità giudaiche</i> XVII–XVIII; <i>Guerra giudaica</i> II,169-174.</p>
      </div>
    </div>`;
  });

  /* ---------- MappaPotere: i nomi di Lc 3,1-2 sulla carta (scena 4) ----------
     Si sceglie un nome, poi si tocca il luogo: nessun trascinamento. Collocato un nome, la regione prende il suo colore e il suo nome.
     Interazioni: nomi (mp-nome: hover bordo anno −2 px, active 0,96, focus oro; collocato = tratteggio verde con ✓),
     luoghi (mp-luogo: hover bordo oro e scala 1,06, active 0,92, focus oro; errore = bordo rosso e scossa, con spiegazione),
     «Ricomincia» (ll-link). */
  var NOMI = [
    { id: 'tib', t: 'Tiberio', ok: ['roma'], why: 'L’imperatore: governa da Roma, fuori da questa carta.' },
    { id: 'pil', t: 'Ponzio Pilato', ok: ['giud'], why: 'Prefetto della Giudea per conto di Roma (26–36).', reg: ['giud', 'sam', 'idu'], cls: 'roma' },
    { id: 'ant', t: 'Erode Antipa', ok: ['gal', 'per'], why: 'Tetrarca della Galilea e della Perea: è il signore di Nazaret.', reg: ['gal', 'per'], cls: 'ant' },
    { id: 'fil', t: 'Filippo', ok: ['ne'], why: 'Tetrarca delle regioni a nord-est del lago: Iturea e Traconitide.', reg: ['ne'], cls: 'fil' },
    { id: 'cai', t: 'Caifa', ok: ['ger'], why: 'Sommo sacerdote: il Tempio di Gerusalemme e il Sinedrio, sotto il controllo romano.' }
  ];
  var LUOGHI = [
    { id: 'roma', t: '← Roma', x: 12, y: 4 },
    { id: 'ne', t: 'Nord-est', x: 84, y: 14 },
    { id: 'gal', t: 'Galilea', x: 40, y: 15 },
    { id: 'sam', t: 'Samaria', x: 40, y: 43 },
    { id: 'per', t: 'Perea', x: 80, y: 60 },
    { id: 'giud', t: 'Giudea', x: 34, y: 62 },
    { id: 'ger', t: 'Tempio', x: 50, y: 78 },
    { id: 'idu', t: 'Idumea', x: 37, y: 90 }
  ];
  LabLezione.registra('MappaPotere', function (p) {
    var a = useMem('mp-sel', null), sel = a[0], setSel = a[1];
    var b = useMem('mp-posti', {}), posti = b[0], setPosti = b[1];
    var c = useMem('mp-msg', ''), msg = c[0], setMsg = c[1];
    var e = useState(null), errore = e[0], setErrore = e[1];
    var fatti = Object.keys(posti).length, tutti = fatti === NOMI.length;
    var own = {}, lab = {};
    NOMI.forEach(function (x) { if (posti[x.id] && x.reg) x.reg.forEach(function (r) { own[r] = x.cls; lab[r] = x.t.split(' ').pop(); }); });
    function scegli(x) { if (posti[x.id]) return; setSel(x.id); setErrore(null); setMsg('Dove governa ' + x.t + '? Toccate un luogo.'); }
    function tocca(l) {
      if (!sel) { setMsg('Prima scegliete un nome.'); return; }
      var x = NOMI.filter(function (q) { return q.id === sel; })[0];
      if (x.ok.indexOf(l.id) >= 0) {
        var o = Object.assign({}, posti); o[x.id] = l.id; setPosti(o); setSel(null); setErrore(null);
        setMsg('Giusto: ' + x.why); p.ctx.cheer();
        if (Object.keys(o).length === NOMI.length) { p.ctx.festa(); p.ctx.say('Gesù a Nazaret è sotto Antipa; a Gerusalemme, sotto Pilato.'); }
      } else {
        setErrore(l.id); p.ctx.oops();
        setMsg(l.id === 'idu' ? 'L’Idumea non è nella frase di Luca: dal 6 d.C. era sotto il prefetto. Riprovate.' : l.id === 'sam' ? 'La Samaria non è nella frase di Luca: in quegli anni era sotto il prefetto, come la Giudea. Riprovate.' : 'Non qui. Rileggete la frase di Luca e riprovate.');
      }
    }
    function ricomincia() { setSel(null); setPosti({}); setErrore(null); setMsg(''); }
    function chi(lid) { return NOMI.filter(function (x) { return posti[x.id] === lid; }).map(function (x) { return x.t; }).join(' · '); }
    return html`<div className="mp">
      <p className="ll-hint">${p.istruzione}</p>
      <div className="mp-nomi" role="group" aria-label="Nomi da collocare">
        ${NOMI.map(function (x) {
          return html`<button key=${x.id} className="mp-nome" aria-pressed=${sel === x.id} disabled=${!!posti[x.id]} onClick=${function () { scegli(x); }}>${posti[x.id] ? '✓ ' : ''}${x.t}</button>`;
        })}
      </div>
      <div className="mp-box">
        <svg viewBox="0 0 300 360" aria-hidden="true">${Carta({ own: own, lab: {}, citta: false, nomi: false })}
          <circle className="rs-c" cx="128" cy="96" r="2.6" /><circle className="rs-c" cx="150" cy="252" r="3.4" />
          <text className="rs-cl" x="124" y="108" text-anchor="end">Nazaret</text>
        </svg>
        ${LUOGHI.map(function (l) {
          var occ = chi(l.id);
          var cls = 'mp-luogo' + (occ ? ' is-full' : '') + (errore === l.id ? ' is-ko' : '');
          return html`<button key=${l.id} className=${cls} style=${{ left: l.x + '%', top: l.y + '%' }} onClick=${function () { tocca(l); }}
            aria-label=${l.t.replace('← ', '') + (occ ? ': ' + occ : '')}>
            <span>${l.t}</span>${occ && html`<span className="mp-luogo-c">${occ}</span>`}
          </button>`;
        })}
      </div>
      <p className="ll-hint" aria-live="polite">${msg || 'Collocati: ' + fatti + ' su ' + NOMI.length + '.'}</p>
      ${tutti && html`<p className="ll-why is-ok"><strong>Due governi. </strong>Nazaret è nella Galilea di Antipa, Gerusalemme nella Giudea del prefetto. Per questo, nel processo, Pilato «saputo che stava sotto l’autorità di Erode», rinvia Gesù a lui (Lc 23,7).</p>`}
      ${fatti > 0 && html`<div className="ll-row"><button className="ll-link" onClick=${ricomincia}>Ricomincia</button></div>`}
    </div>`;
  });
})();
