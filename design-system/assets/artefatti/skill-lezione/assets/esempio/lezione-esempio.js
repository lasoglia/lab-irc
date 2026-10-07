/* ESEMPIO per build_artefatto.py — Anno III · «Religiosità, teisti, agnostici e atei» (50 minuti, 4 fasi, 12 scene).
   Dal design system Lab-Irc (3 ottobre 2026), adattato alle regole della skill: pausa gioco dal motore giochi con ritorno
   alla scena (al posto di un segnaposto d'immagine e di una scena di chiusura), dati dei giochi coerenti con ciò che si spiega.
   Formato: window.LEZIONE = { titolo, glossario, scene: [{ fase, momento, minuti, titolo, lead, testo, blocchi: [...] }], studio, giochi }.
   Parole nuove: {parola} o {forma|lemma} in qualunque testo → fumetto con etimologia + Glossario automatico.
   È un modello di formato e di regia, non di contenuto: date e attribuzioni vanno sempre ricontrollate sulle fonti. */
window.LEZIONE = {
  slug: 'iii-religiosita-teisti-agnostici-atei',
  classe: 'Anno III',
  titolo: 'Religiosità, teisti, *agnostici* e atei',
  sottotitolo: 'Davanti alla domanda su Dio le persone prendono strade diverse. Oggi diamo un nome a queste strade, e scopriamo dove siamo noi.',
  saluto: 'Ultima tappa: che cosa portate a casa?',
  glossario: {
    'religiosità': { etim: 'dal latino *religio*', def: 'L’apertura dell’uomo al mistero e alle grandi domande sul senso della vita. Viene prima di ogni religione.' },
    'mistero': { etim: 'dal greco *mystḗrion*, da *mýein*, «chiudere (occhi e bocca)»', def: 'Ciò che supera la nostra comprensione: non un enigma da risolvere, ma una realtà così grande che non si finisce mai di conoscere.' },
    'memoriale': { parola: 'Memoriale', etim: 'dal latino *memoriale*, da *memor*, «che ricorda»', def: 'Il foglietto su cui Pascal scrisse la sua esperienza di fede della notte del 23 novembre 1654. Lo tenne cucito nella giacca per tutta la vita.' },
    'rivelare': { etim: 'dal latino *re-velare*, «togliere il velo»', def: 'Nella fede cristiana, Dio si fa conoscere all’uomo per primo, mostrando chi è.' }
  },
  scene: [
    { fase: 'Aggancio', momento: 'Religione Cattolica · Anno III', minuti: 2, titolo: 'Religiosità, teisti, *agnostici* e atei',
      lead: 'Davanti alla domanda su Dio le persone prendono strade diverse. Oggi diamo un nome a queste strade, e scopriamo dove siamo noi.',
      blocchi: [ { tipo: 'agenda' } ] },

    { fase: 'Aggancio', momento: 'Sondaggio d’ingresso', minuti: 3, titolo: 'Una domanda *per cominciare*',
      blocchi: [ { tipo: 'domanda', id: 'ingresso', etichetta: 'Anonimo · per alzata di mano', q: 'Si può essere felici senza Dio?', opzioni: ['Sì', 'No', 'Non so', 'Dipende'] } ] },

    { fase: 'Aggancio', momento: 'Nuvola di parole', minuti: 3, titolo: 'Se dico *«Dio»*…',
      blocchi: [ { tipo: 'nuvola', id: 'dio', q: 'Che parola vi viene in mente?', semi: ['mistero', 'padre', 'amore', 'domanda', 'paura', 'creatore', 'niente', 'mistero', 'fede', 'amore'] } ] },

    { fase: 'Scoperta', momento: 'Parola chiave', minuti: 5, titolo: 'Una domanda *prima* di ogni religione',
      testo: 'La {religiosità} è l’apertura dell’uomo al {mistero} e alle domande di senso. Viene prima di ogni religione: credenti e non credenti se la portano dentro.',
      blocchi: [
        { tipo: 'etimo', parola: 'religione', etim: 'dal latino *religio*: da *re-ligare* o da *re-legere*', def: 'Il legame fra l’uomo e Dio, vissuto con parole, gesti e una comunità.',
          parti: [ { t: 'religio', d: 'latino: scrupolo, legame sacro' }, { t: 're-ligare', d: '«legare di nuovo» (Lattanzio)' }, { t: 're-legere', d: '«rileggere con cura» (Cicerone)' } ], nessi: ['→', 'o'],
          spiegazione: 'Due spiegazioni antiche: la religione è un **legame** fra l’uomo e Dio, oppure l’**attenzione** con cui si rilegge ciò che riguarda Dio.' },
        { tipo: 'carte', carte: [
          { fronte: 'Da dove vengo?', etichetta: 'L’origine', retro: 'La vita è un caso o un dono?' },
          { fronte: 'Chi sono?', etichetta: 'L’identità', retro: 'Che cosa mi rende davvero me?' },
          { fronte: 'Dove vado?', etichetta: 'Il destino', retro: 'La morte è la fine di tutto?' }
        ] }
      ] },

    { fase: 'Scoperta', momento: 'Quattro risposte', minuti: 6, titolo: 'Come si risponde alla *domanda su Dio*?',
      lead: 'Tre risposte stanno sulla stessa linea; una ne resta fuori.',
      blocchi: [ { tipo: 'spettro', poli: ['Dio c’è', 'Non si può sapere', 'Dio non c’è'], punti: [
        { t: 'Teista', x: 6, etim: 'dal greco *theós*, «Dio»', def: 'Crede in un Dio personale, creatore, che si prende cura del mondo e si può incontrare.', es: '«Credo in Dio, Padre onnipotente, creatore del cielo e della terra.»' },
        { t: 'Agnostico', x: 50, etim: 'dal greco *a-*, «non», e *gnōstós*, «conoscibile»: parola coniata da T. H. Huxley nel 1869', def: 'Sospende il giudizio: pensa che con la ragione non si possa sapere se Dio esiste o no.', es: '«Forse c’è, forse no: non lo posso sapere.»' },
        { t: 'Ateo', x: 94, etim: 'dal greco *á-theos*, «senza Dio»', def: 'Nega l’esistenza di Dio: il mondo si spiega da solo, senza un creatore.', es: '«Dio non esiste: è un’invenzione dell’uomo.»' },
        { t: 'Indifferente', x: 50, fuori: true, etim: 'dal latino *in-*, «non», e *differre*, «fare differenza»', def: 'Non si pone la domanda: la questione di Dio non lo interessa. Per questo sta fuori dalla linea: non risponde né sì né no.', es: '«Dio? Non ci ho mai pensato, e non mi cambia la vita.»' }
      ] } ] },

    { fase: 'Scoperta', momento: 'Chi lo dice?', minuti: 5, titolo: 'Di quale posizione è *ogni frase*?',
      blocchi: [ { tipo: 'chi', opzioni: ['Teista', 'Agnostico', 'Ateo'], frasi: [
        { t: '«Ci hai fatti per te, e il nostro cuore è inquieto finché non riposa in te.»', chi: 'Agostino d’Ippona · Confessioni', ok: 0, why: 'Per Agostino Dio è l’approdo del cuore umano: è la voce di chi crede.' },
        { t: '«Degli dèi non posso sapere né che esistono né che non esistono.»', chi: 'Protagora · V secolo a.C.', ok: 1, why: 'È una delle prime formulazioni di ciò che oggi chiamiamo agnosticismo: il giudizio resta sospeso.' },
        { t: '«Dio è morto! E noi l’abbiamo ucciso!»', chi: 'Friedrich Nietzsche · La gaia scienza', ok: 2, why: 'Lo grida l’«uomo folle» del racconto: Nietzsche descrive una cultura che ha smesso di credere.' }
      ] } ] },

    { fase: 'Scoperta', momento: 'Una fonte · 23 novembre 1654', minuti: 4, titolo: 'Il Dio *dei filosofi* e il Dio di Abramo',
      blocchi: [
        { tipo: 'citazione', testo: 'Dio di Abramo, Dio di Isacco, Dio di Giacobbe, non dei filosofi e dei sapienti.', fonte: 'Blaise Pascal, Memoriale', pulsante: 'Che cosa ci sta dicendo?',
          commento: 'Pascal scrive queste righe su un foglietto, il {Memoriale|memoriale}, e lo tiene cucito nella giacca per tutta la vita: per lui Dio non è soltanto un’idea, ma **Qualcuno che si incontra**.' },
        { tipo: 'confronto', a: 'Il Dio dei filosofi', b: 'Il Dio di Abramo', righe: [
          { criterio: 'Come lo si conosce', a: 'Un’idea a cui si arriva ragionando', b: 'Qualcuno che si {rivela|rivelare} e chiama per nome' },
          { criterio: 'Dove lo si trova', a: 'La «prima causa» del mondo', b: 'Dentro la storia di un popolo' },
          { criterio: 'Che cosa chiede', a: 'Si dimostra, ma resta lontano', b: 'Non si dimostra: si incontra' }
        ] }
      ] },

    { fase: 'Attività', momento: 'Pausa gioco', minuti: 5, titolo: 'Le parole *in coppia*',
      lead: 'Sei coppie da ritrovare: chi le scopre tutte con meno tentativi?',
      blocchi: [
        { tipo: 'mascotte', t: 'Attenti all’agnostico: non dice «no», dice «non si può sapere».' },
        { tipo: 'gioco', id: 'memory', titolo: 'Memory delle posizioni', testo: 'Cinque minuti, poi torniamo qui per lavorare a coppie.', pulsante: 'Si gioca' }
      ] },

    { fase: 'Attività', momento: 'A coppie', minuti: 6, titolo: 'Che cosa *gli rispondereste*?',
      lead: 'Un amico vi dice: «Non sono sicuro che Dio esista, ma ogni tanto me lo chiedo».',
      blocchi: [ { tipo: 'consegna', titolo: 'A coppie, tre minuti', modalita: 'Coppie', minuti: 3,
        passi: ['Che posizione è la sua?', 'Che cosa gli rispondereste?', 'Scegliete una frase da dire alla classe.'], prodotto: 'una frase per coppia, letta ad alta voce.', fine: 'Tempo! Chi vuole condividere?' } ] },

    { fase: 'Attività', momento: 'Verifica lampo', minuti: 5, titolo: 'Tre domande, *tre stelle*',
      blocchi: [ { tipo: 'quiz', domande: [
        { q: 'Chi «sospende il giudizio» sull’esistenza di Dio è…', opzioni: ['ateo', 'agnostico', 'teista'], ok: 1, why: 'Non afferma e non nega: pensa che la domanda resti senza una risposta certa.' },
        { q: 'La religiosità…', opzioni: ['riguarda solo chi va in chiesa', 'è nata con il cristianesimo', 'è una domanda di senso di ogni persona'], ok: 2, why: 'Viene prima di ogni religione: anche chi non crede se la pone.' },
        { q: 'Per Pascal il «Dio di Abramo» è un Dio che…', opzioni: ['si rivela e si incontra', 'si dimostra con la logica', 'non si interessa del mondo'], ok: 0, why: 'Non è soltanto un’idea: è Qualcuno che entra nella storia.' }
      ] } ] },

    { fase: 'Attività', momento: 'Sondaggio d’uscita', minuti: 3, titolo: 'Avete *cambiato idea*?',
      blocchi: [ { tipo: 'domanda', id: 'uscita', confronta: 'ingresso', etichetta: 'Anonimo · la stessa domanda dell’inizio', q: 'Si può essere felici senza Dio?', opzioni: ['Sì', 'No', 'Non so', 'Dipende'],
        dibattito: 'Che cosa ha fatto cambiare idea a qualcuno? E che cosa, invece, è rimasto fermo?' } ] },

    { fase: 'Chiusura', momento: 'Che cosa porto a casa', minuti: 3, titolo: 'Tre idee *da ricordare*',
      blocchi: [ { tipo: 'idee', idee: [
        'La {religiosità} è una domanda che tutti si portano dentro, prima di ogni religione.',
        'Teista, agnostico e ateo danno tre risposte diverse alla stessa domanda; l’indifferente non se la pone.',
        'Per la fede cristiana Dio non è solo un’idea da dimostrare: è Qualcuno che si incontra.'
      ] },
      { tipo: 'continua', voci: [
        { t: 'Ripassate con i giochi', d: 'Categorie, vero o falso e memory su questa lezione.', vai: 'giochi', gioco: 'cat', principale: true },
        { t: 'Per casa', d: 'In tre righe: oggi dove vi collocate sulla linea, e perché?' },
        { t: 'Da capo', d: 'Tornate all’inizio della lezione.', vai: 'inizio' }
      ] } ] }
  ],
  studio: {
    sezioni: [
      { titolo: 'La domanda', testo: 'Si può essere felici senza Dio? La domanda divide, ma prima ancora unisce: chiunque se la pone sta già cercando un senso. Per rispondere bisogna dare un nome alle strade che le persone prendono davanti a Dio.' },
      { titolo: 'La religiosità', testo: 'La {religiosità} è l’apertura dell’uomo al {mistero} e alle domande di senso: da dove vengo, chi sono, dove vado. Viene **prima** di ogni religione, e per questo riguarda credenti e non credenti.\n\nLa parola *religione* viene dal latino *religio*. Gli antichi la spiegavano in due modi: Lattanzio da *re-ligare*, «legare di nuovo», cioè un legame fra l’uomo e Dio; Cicerone da *re-legere*, «rileggere con cura», cioè l’attenzione con cui si torna su ciò che riguarda Dio.' },
      { titolo: 'Quattro posizioni', testo: 'Il **teista** (dal greco *theós*, «Dio») crede in un Dio personale e creatore. L’**agnostico** (*a-gnōstós*, «non conoscibile»; la parola è di T. H. Huxley, 1869) sospende il giudizio: con la ragione, pensa, non si può sapere. L’**ateo** (*á-theos*, «senza Dio») nega che Dio esista. L’**indifferente** non si pone la domanda: per questo non sta sulla stessa linea delle altre tre posizioni.' },
      { titolo: 'Il Dio dei filosofi e il Dio di Abramo', testo: 'La notte del 23 novembre 1654 Blaise Pascal scrive su un foglietto, il {Memoriale|memoriale}: «Dio di Abramo, Dio di Isacco, Dio di Giacobbe, non dei filosofi e dei sapienti». **Per questo** distingue due modi di pensare Dio: un’idea a cui si arriva ragionando, la «prima causa» del mondo, oppure Qualcuno che si {rivela|rivelare}, entra nella storia di un popolo e chiama per nome. Il primo si dimostra; il secondo si incontra.' },
      { titolo: 'Per ricordare', testo: 'La religiosità è una domanda di tutti. Teista, agnostico e ateo rispondono in modi diversi alla stessa domanda; l’indifferente non se la pone. Per la fede cristiana Dio non è soltanto un’idea da dimostrare, ma Qualcuno da incontrare.' }
    ],
    fonti: [
      'Blaise Pascal, *Memoriale* (23 novembre 1654).',
      'Agostino d’Ippona, *Confessioni* I, 1.',
      'Protagora, frammento sugli dèi (Diels-Kranz 80 B 4).',
      'Friedrich Nietzsche, *La gaia scienza*, § 125.',
      'Lattanzio, *Divinae institutiones* IV, 28; Cicerone, *De natura deorum* II, 72.',
      '*Vocabolario Treccani*, voci «religione», «agnostico», «ateo», «teismo», «mistero».'
    ]
  },
  giochi: {
    memory: [
      ['Teista', 'Dio c’è ed è una Persona'], ['Agnostico', 'Non si può sapere'], ['Ateo', 'Dio non c’è'],
      ['Indifferente', 'Non mi pongo la domanda'], ['Religiosità', 'Domanda di senso'], ['Memoriale', 'Il foglietto di Pascal']
    ],
    cat: {
      bins: ['Teista', 'Agnostico', 'Ateo'],
      items: [
        ['Prego perché qualcuno mi ascolta', 0], ['La ragione non basta a decidere', 1], ['L’universo si spiega da solo', 2],
        ['Dio si è fatto vicino all’uomo', 0], ['Forse sì, forse no: non lo sapremo', 1], ['Dio è un’invenzione umana', 2],
        ['La vita ha un senso perché è donata', 0], ['Mancano prove in un senso e nell’altro', 1], ['Dopo la morte non c’è nulla', 2]
      ]
    },
    vf: [
      { s: 'L’agnostico nega l’esistenza di Dio.', v: false, why: 'Non nega: sospende il giudizio.' },
      { s: 'Religiosità e religione sono sinonimi.', v: false, why: 'La religiosità è la domanda di senso; la religione è una risposta condivisa, con parole, gesti e una comunità.' },
      { s: 'L’indifferente sta a metà strada fra il teista e l’ateo.', v: false, why: 'Non sta sulla linea: non si pone la domanda, quindi non risponde né sì né no.' },
      { s: 'La parola «agnostico» è stata coniata nell’Ottocento.', v: true, why: 'La coniò il biologo Thomas H. Huxley nel 1869.' },
      { s: '«Dio è morto» è una frase di Nietzsche.', v: true, why: 'La grida l’«uomo folle» della *Gaia scienza* (§ 125).' },
      { s: 'Per Pascal il Dio di Abramo si conosce soprattutto con una dimostrazione.', v: false, why: 'È Qualcuno che si rivela e si incontra; il «Dio dei filosofi» è quello a cui si arriva ragionando.' }
    ],
    rifl: { domanda: 'Oggi, dove ti collochi?', poli: ['Dio c’è', 'Non si può sapere', 'Dio non c’è'], spunto: 'Che cosa ti fa pensare così? Un’esperienza, una domanda, una persona…' }
  }
};
