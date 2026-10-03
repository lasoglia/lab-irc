window.GIOCHI_DATI = {
  tema: 'Religiosità, teisti, agnostici e atei',
  flash: [
    ['Religiosità', 'L’apertura dell’uomo al mistero e alle domande di senso, prima di ogni religione.'],
    ['Religione', 'La forma organizzata – credenze, riti, comunità – con cui l’uomo si rapporta al divino.'],
    ['Teismo', 'Fede in un Dio personale e creatore, che si prende cura del mondo.'],
    ['Deismo', 'Dio esiste e ha creato il mondo, ma non interviene nella storia.'],
    ['Agnosticismo', 'La ragione non può né dimostrare né negare l’esistenza di Dio.'],
    ['Ateismo teorico', 'Nega esplicitamente, con argomenti, che Dio esista.'],
    ['Ateismo pratico', 'Si vive come se Dio non ci fosse, senza porsi la questione.'],
    ['Panteismo', 'Dio coincide con la natura, con il tutto.']
  ],
  cruci: {
    rows: 8, cols: 9,
    words: [
      { n: 1, dir: 'v', r: 0, c: 8, w: 'DIO', clue: 'L’Essere supremo delle religioni monoteiste' },
      { n: 2, dir: 'o', r: 2, c: 0, w: 'AGNOSTICO', clue: 'Sospende il giudizio: non si può sapere se Dio esista' },
      { n: 2, dir: 'v', r: 2, c: 0, w: 'ATEO', clue: 'Nega l’esistenza di Dio' },
      { n: 3, dir: 'v', r: 2, c: 3, w: 'SACRO', clue: 'Ciò che è separato e riservato al divino' },
      { n: 4, dir: 'v', r: 2, c: 5, w: 'TEISTA', clue: 'Crede in un Dio personale che ama il mondo' }
    ]
  },
  sfida: [
    { q: 'Chi afferma che la ragione non può stabilire se Dio esista?', a: ['L’agnostico', 'L’ateo', 'Il teista', 'Il deista'], ok: 0 },
    { q: 'Il deista crede in un Dio che…', a: ['crea il mondo ma non interviene', 'si rivela nella storia', 'coincide con la natura', 'non esiste'], ok: 0 },
    { q: 'Religiosità e religione sono la stessa cosa.', a: ['Vero', 'Falso'], ok: 1 },
    { q: '«Ateo» viene dal greco a-theos. Significa…', a: ['senza Dio', 'contro gli dèi', 'oltre Dio', 'prima di Dio'], ok: 0 },
    { q: 'Chi vive come se Dio non esistesse, senza negarlo, pratica un ateismo…', a: ['teorico', 'pratico', 'militante', 'scientifico'], ok: 1 },
    { q: 'Il panteismo identifica Dio con…', a: ['la ragione', 'la natura, il tutto', 'la comunità', 'nessuna cosa'], ok: 1 },
    { q: 'Teista è chi…', a: ['sospende il giudizio', 'nega Dio', 'crede in un Dio personale', 'crede in molti dèi'], ok: 2 },
    { q: 'Pascal distingue il «Dio dei filosofi» dal «Dio di Abramo». Cioè…', a: ['due religioni diverse', 'politeismo e monoteismo', 'Dio pensato e Dio che si rivela', 'fede e superstizione'], ok: 2 }
  ],
  rifl: {
    domanda: 'Oggi, dove ti collochi?',
    poli: ['Credo', 'Non so', 'Non credo'],
    spunto: 'Che cosa ti fa pensare così? Un’esperienza, una domanda, una persona…'
  }
};
