/* Lab IRC — Dati della lezione. Classe II · UDA 1 «Gesù: quali tracce?» · Lezione 1 «Sotto l’aquila».
   Contenuti tratti dal fascicolo dello studente. Ricostruisci con  python3 build.py lezioni/sotto-l-aquila.js */
window.GIOCHI_DATI = {
  tema: 'Sotto l’aquila · Il mondo di Gesù',
  anno: 2,
  flash: [
    ['Prefetto', 'Il funzionario romano che amministra direttamente la Giudea: al tempo di Gesù è Ponzio Pilato.'],
    ['Tetrarca', 'Signore di una parte del territorio, come Erode Antipa in Galilea e Perea.'],
    ['Sinedrio', 'Il consiglio di Gerusalemme, presieduto dal sommo sacerdote, che regola le questioni religiose e giudiziarie sotto il controllo romano.'],
    ['Farisei', 'Studiosi e interpreti della Legge, stimati dal popolo; credono nella risurrezione.'],
    ['Sadducei', 'Pochi ma potenti, legati al Tempio e al sacerdozio; negano la risurrezione.'],
    ['Esseni', 'Vivono in comunità, mettono in comune i beni e si tengono a distanza dal Tempio.'],
    ['«Quarta filosofia»', 'La corrente di Giuda il Galileo: nessun signore se non Dio, quindi nessun tributo a Roma.'],
    ['Scribi', 'Non un partito ma una professione: gli esperti della Legge, di correnti diverse.'],
    ['Incarnazione', 'Il Figlio di Dio entra nella storia umana: in un popolo, in una terra, in un’epoca.']
  ],
  cruci: {
    rows: 11, cols: 10,
    words: [
      { n: 1, dir: 'o', r: 0, c: 4, w: 'ESSENI', clue: 'Vivono in comunità e mettono in comune i beni' },
      { n: 2, dir: 'v', r: 0, c: 5, w: 'SINEDRIO', clue: 'Il consiglio presieduto dal sommo sacerdote' },
      { n: 3, dir: 'v', r: 2, c: 8, w: 'TIBERIO', clue: 'L’imperatore dal 14 al 37 d.C.' },
      { n: 4, dir: 'o', r: 3, c: 4, w: 'TEMPIO', clue: 'Sulla sua grande porta Erode fece porre l’aquila d’oro' },
      { n: 5, dir: 'v', r: 4, c: 1, w: 'GALILEA', clue: 'La regione di Nazaret e Cafarnao' },
      { n: 6, dir: 'o', r: 5, c: 4, w: 'ERODE', clue: '… Antipa, tetrarca della Galilea e della Perea' },
      { n: 7, dir: 'v', r: 6, c: 3, w: 'CAIFA', clue: 'Sommo sacerdote in carica, genero di Anna' },
      { n: 8, dir: 'o', r: 7, c: 0, w: 'PILATO', clue: 'Prefetto della Giudea dal 26 al 36' },
      { n: 9, dir: 'o', r: 10, c: 3, w: 'AQUILA', clue: 'Quella d’oro fu abbattuta a colpi d’ascia' }
    ]
  },
  sfida: [
    { q: 'Chi racconta l’episodio dell’aquila d’oro sul Tempio?', a: ['Giuseppe Flavio', 'L’evangelista Luca', 'San Paolo', 'Tiberio'], ok: 0 },
    { q: 'Secondo i maestri Giuda e Mattia, l’aquila violava il comando di…', a: ['non uccidere', 'non farsi immagini (Es 20,4)', 'santificare il sabato', 'non rubare'], ok: 1 },
    { q: 'Che cosa fece entrare Pilato di notte a Gerusalemme?', a: ['Una statua di Tiberio', 'Le insegne con l’effigie dell’imperatore', 'Monete d’oro', 'Un’aquila d’argento'], ok: 1 },
    { q: 'Dove risiedeva il prefetto Pilato?', a: ['A Gerusalemme', 'A Cesarea', 'A Nazaret', 'A Roma'], ok: 1 },
    { q: 'Chi fa uccidere Giovanni Battista?', a: ['Ponzio Pilato', 'Erode Antipa', 'Caifa', 'Filippo'], ok: 1 },
    { q: 'Anna, che conserva grande autorità, è per Caifa…', a: ['il padre', 'il suocero', 'il maestro', 'il prefetto'], ok: 1 },
    { q: 'A quale ambiente molti studiosi collegano i manoscritti di Qumran?', a: ['Farisei', 'Sadducei', 'Esseni', 'Scribi'], ok: 2 },
    { q: 'Dove Gesù, di sabato, «si alzò a leggere» (Lc 4,16)?', a: ['Nel Tempio di Gerusalemme', 'Nella sinagoga di Nazaret', 'Sulla riva del lago', 'Nel palazzo di Erode'], ok: 1 }
  ],
  rifl: {
    domanda: 'Quanto ti fidi di una frase letta senza contesto?',
    poli: ['Mi fido', 'Dipende', 'Verifico sempre'],
    spunto: 'Pensa a una frase, antica o recente, che hai capito solo dopo aver saputo dove, quando e fra chi era stata detta.'
  },
  quiz: [
    { q: 'Chi governa la Giudea per conto di Roma quando Gesù predica?', a: ['Erode Antipa', 'Ponzio Pilato', 'Caifa', 'Filippo'], ok: 1, why: 'Pilato è prefetto dal 26 al 36. Il suo nome e il titolo compaiono su una pietra trovata a Cesarea Marittima nel 1961.' },
    { q: 'Nazaret e Cafarnao si trovano…', a: ['in Giudea, sotto il prefetto romano', 'in Galilea, sotto Erode Antipa', 'nell’Iturea, sotto Filippo', 'a Cesarea, sotto il Sinedrio'], ok: 1, why: 'La Galilea è governata da un principe ebreo alleato di Roma; la Giudea direttamente da un funzionario romano.' },
    { q: 'Perché la domanda sul tributo a Cesare (Mc 12,14) era una trappola?', a: ['Gesù non aveva denaro con sé', 'Con il «sì» sembrava complice di Roma, con il «no» un ribelle', 'I Romani non chiedevano tributi', 'Era una domanda sui sacrifici del Tempio'], ok: 1, why: 'Nel 6 d.C. il censimento romano aveva scatenato la rivolta di Giuda il Galileo: pagare sembrava accettare la schiavitù.' },
    { q: 'Che cosa significa «nato sotto la Legge» (Gal 4,4)?', a: ['Nato sotto l’impero romano', 'Gesù è un ebreo', 'Nato durante un processo', 'Nato in Giudea'], ok: 1, why: 'È circonciso, prega con i salmi, va al Tempio per le feste, legge nella sinagoga di Nazaret.' },
    { q: 'Che cosa afferma Nostra aetate n. 4 (1965)?', a: ['Gesù non era ebreo', 'La passione non può essere imputata a tutti gli Ebrei di allora né a quelli di oggi', 'Gli apostoli non erano ebrei', 'Il Tempio non aveva importanza'], ok: 1, why: 'Il Concilio ricorda che dal popolo ebraico sono nati Cristo secondo la carne e gli apostoli.' }
  ],
  vf: [
    { s: 'L’aquila d’oro sul Tempio fu fatta collocare da Ponzio Pilato.', v: false, why: 'Fu Erode il Grande, negli ultimi mesi della sua vita (morì nel 4 a.C.).' },
    { s: 'Il nome di Pilato è inciso su una pietra trovata a Cesarea Marittima.', v: true, why: 'Rinvenuta nel 1961 nel teatro, oggi è all’Israel Museum di Gerusalemme.' },
    { s: 'Gli scribi erano un partito religioso, come i farisei.', v: false, why: 'Erano una professione: esperti della Legge, anche di correnti diverse.' },
    { s: 'Sulla risurrezione Gesù è d’accordo con i sadducei.', v: false, why: 'Sostiene contro i sadducei la stessa posizione dei farisei (Mc 12,18-27).' },
    { s: 'Pilato rinvia Gesù a Erode perché era sotto la sua autorità.', v: true, why: 'Gesù veniva dalla Galilea, governata da Erode Antipa (Lc 23,7).' },
    { s: 'Gesù era ebreo, ed ebrei erano i suoi discepoli.', v: true, why: 'Ebrea era anche la prima comunità di Gerusalemme.' }
  ],
  abbina: [
    ['Tiberio', 'Imperatore dal 14 al 37 d.C.'],
    ['Ponzio Pilato', 'Prefetto della Giudea dal 26 al 36'],
    ['Erode Antipa', 'Tetrarca della Galilea e della Perea'],
    ['Filippo', 'Tetrarca dell’Iturea e della Traconitide'],
    ['Caifa', 'Sommo sacerdote in carica']
  ],
  seq: [
    { t: 'Muore Erode il Grande, poco dopo l’abbattimento dell’aquila d’oro', y: '4 a.C.' },
    { t: 'Roma prende il controllo diretto della Giudea: censimento e rivolta di Giuda il Galileo', y: '6 d.C.' },
    { t: 'Tiberio diventa imperatore', y: '14 d.C.' },
    { t: 'Ponzio Pilato diventa prefetto della Giudea', y: '26 d.C.' },
    { t: 'Quindicesimo anno di Tiberio: la parola di Dio viene su Giovanni', y: '28–29 d.C.' },
    { t: 'Inizia la rivolta giudaica contro Roma', y: '66 d.C.' },
    { t: 'A Cesarea Marittima si trova l’iscrizione di Pilato', y: '1961' },
    { t: 'Il Concilio Vaticano II approva Nostra aetate', y: '1965' }
  ],
  cat: {
    bins: ['Roma', 'Principi locali', 'Autorità religiosa'],
    items: [
      ['Tiberio Cesare', 0], ['Ponzio Pilato', 0], ['Il prefetto della Giudea', 0],
      ['Erode Antipa', 1], ['Filippo', 1], ['Lisania', 1],
      ['Anna', 2], ['Caifa', 2], ['Il Sinedrio', 2]
    ]
  },
  memory: [
    ['Tiberio', 'Imperatore'], ['Pilato', 'Prefetto'], ['Antipa', 'Tetrarca'],
    ['Caifa', 'Sommo sacerdote'], ['Farisei', 'Sì alla risurrezione'], ['Sadducei', 'No alla risurrezione']
  ],
  completa: {
    testo: 'Nell’anno quindicesimo dell’impero di {Tiberio} Cesare, mentre Ponzio {Pilato} era governatore della {Giudea}, {Erode} tetrarca della {Galilea}, e Filippo, suo fratello, tetrarca dell’Iturea e della Traconitide, e Lisania tetrarca dell’Abilene, sotto i sommi sacerdoti Anna e {Caifa}, la parola di Dio venne su {Giovanni}, figlio di Zaccaria, nel deserto. (Lc 3,1-2)',
    extra: ['Augusto', 'Samaria', 'Nerone']
  },
  sondaggio: [
    { q: 'Ti è mai capitato di fraintendere un messaggio perché mancava il contesto?', a: ['Sì, spesso', 'Qualche volta', 'Mai'], dibattito: 'Che cosa vi avrebbe aiutato a capire? Dove, quando, fra chi?' },
    { q: 'Davanti a un potere che offende la tua fede, che cosa è giusto fare?', a: ['Ribellarsi', 'Protestare senza violenza', 'Tacere', 'Non so'], dibattito: 'Confrontate i giovani dell’aquila e la folla di Cesarea davanti a Pilato: che cosa cambia?' },
    { q: 'Si può essere buoni cittadini e credenti allo stesso tempo?', a: ['Sì', 'No', 'Dipende'], dibattito: 'Nella vostra vita, che cosa è «di Cesare» e che cosa è «di Dio»?' }
  ]
};
