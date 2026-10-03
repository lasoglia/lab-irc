Object.assign(window.GIOCHI_DATI, {
  quiz: [
    { q: 'Che cosa indica la parola «religiosità»?', a: ['Andare a Messa ogni domenica', 'L’apertura dell’uomo alle domande di senso', 'Appartenere a una Chiesa', 'Credere nei miracoli'], ok: 1, why: 'Viene prima di ogni religione: è la domanda sul senso che ogni persona si porta dentro.' },
    { q: 'Chi ha coniato il termine «agnostico» nel 1869?', a: ['Friedrich Nietzsche', 'Blaise Pascal', 'Thomas H. Huxley', 'Tommaso d’Aquino'], ok: 2, why: 'Il biologo inglese Huxley lo usò per chi ritiene inconoscibile l’esistenza di Dio.' },
    { q: 'Per Feuerbach Dio è…', a: ['una proiezione dei desideri dell’uomo', 'il motore immobile', 'la natura stessa', 'una scommessa ragionevole'], ok: 0, why: 'L’uomo attribuisce a Dio le sue qualità migliori: per Feuerbach la teologia è antropologia.' },
    { q: 'La «scommessa» di Pascal invita a…', a: ['non pensarci', 'puntare sull’esistenza di Dio', 'dimostrare Dio con la scienza', 'restare agnostici'], ok: 1, why: 'Se Dio c’è si guadagna tutto; se non c’è non si perde nulla.' },
    { q: 'Quale di queste frasi è di un teista?', a: ['«Non lo sapremo mai»', '«Dio ha creato e poi si è ritirato»', '«Dio mi conosce e mi ama»', '«Dio è tutto ciò che esiste»'], ok: 2, why: 'Il teista crede in un Dio personale, in relazione con l’uomo.' }
  ],
  vf: [
    { s: 'L’agnostico nega l’esistenza di Dio.', v: false, why: 'Non nega: sospende il giudizio.' },
    { s: 'Il deismo si diffonde con l’Illuminismo.', v: true, why: 'Voltaire e altri pensano a un Dio «orologiaio» che non interviene.' },
    { s: 'Religiosità e religione sono sinonimi.', v: false, why: 'La religiosità è la domanda, la religione una risposta organizzata.' },
    { s: '«Dio è morto» è una frase di Nietzsche.', v: true, why: 'Compare ne «La gaia scienza» (1882).' },
    { s: 'Si può essere atei «pratici» pur dicendosi credenti.', v: true, why: 'Succede quando la fede non incide sulla vita.' },
    { s: 'Il panteismo crede in un Dio distinto dal mondo.', v: false, why: 'Per il panteismo Dio e il mondo coincidono.' }
  ],
  abbina: [
    ['Teista', 'Dio c’è ed è una Persona'],
    ['Ateo', 'Dio non c’è'],
    ['Agnostico', 'Non si può sapere'],
    ['Deista', 'Dio ha creato, poi si è ritirato'],
    ['Panteista', 'Dio è tutto ciò che esiste']
  ],
  seq: [
    { t: 'Protagora: «Degli dèi non posso sapere né che sono né che non sono»', y: 'V sec. a.C.' },
    { t: 'Tommaso d’Aquino propone le «cinque vie» verso Dio', y: 'XIII sec.' },
    { t: 'Pascal scrive la «scommessa» nei Pensieri', y: '1670' },
    { t: 'Feuerbach: Dio è proiezione dell’uomo', y: '1841' },
    { t: 'Huxley conia la parola «agnostico»', y: '1869' },
    { t: 'Nietzsche annuncia «Dio è morto»', y: '1882' }
  ],
  cat: {
    bins: ['Teista', 'Agnostico', 'Ateo'],
    items: [
      ['Prego perché qualcuno mi ascolta', 0], ['La ragione non basta a decidere', 1], ['L’universo si spiega da solo', 2],
      ['Dio si è fatto vicino all’uomo', 0], ['Forse sì, forse no: non lo sapremo', 1], ['Dio è un’invenzione umana', 2],
      ['La vita ha un senso perché è donata', 0], ['Mancano prove in un senso e nell’altro', 1], ['Dopo la morte non c’è nulla', 2]
    ]
  },
  memory: [
    ['Teismo', 'Dio personale'], ['Deismo', 'Dio orologiaio'], ['Agnosticismo', 'Non si può sapere'],
    ['Ateismo', 'Dio non c’è'], ['Panteismo', 'Dio è tutto'], ['Religiosità', 'Domanda di senso']
  ],
  completa: {
    testo: 'La {religiosità} è l’apertura dell’uomo al mistero. Chi crede in un Dio personale è {teista}; chi nega che Dio esista è {ateo}; chi ritiene che la ragione non possa decidere è {agnostico}. Quest’ultima parola fu coniata da {Huxley} nel 1869.',
    extra: ['deista', 'Nietzsche', 'religione']
  },
  sondaggio: [
    { q: 'Si può essere felici senza Dio?', a: ['Sì', 'No', 'Non so', 'Dipende'], dibattito: 'Che cosa intendiamo per «felicità»? Basta stare bene?' },
    { q: 'La scienza rende inutile la fede?', a: ['Sì', 'No', 'In parte'], dibattito: 'Scienza e fede rispondono alle stesse domande?' },
    { q: 'Il dubbio è nemico della fede?', a: ['Sì', 'No', 'Non so'], dibattito: 'Pensate a un personaggio biblico che ha dubitato.' }
  ]
});
