/* Lab IRC — Catalogo degli strumenti (kit definitivo, 5 ottobre 2026).
   Una lezione-campionario: ogni scena presenta uno o due strumenti con un esempio reale, la modalità Giochi ha le dodici
   meccaniche con dati d’esempio, la modalità Studio contiene la guida per scegliere gli strumenti dal fascicolo.
   Assemblaggio: python3 scripts/build_artefatto.py assets/esempio/catalogo-lezione.js -o catalogo.html --anno 3
                 --titolo "Il catalogo degli strumenti" --css assets/esempio/catalogo.css */

/* ---------- componente proprio: l’orologio delle Ore (LabLezione.registra) ---------- */
(function () {
  var LL = window.LabLezione, html = window.html, R = window.React;
  if (!LL || !html) return;
  LL.registra('Orologio', function (p) {
    var s = R.useState(null), a = s[0], setA = s[1], ore = p.ore || [], n = ore.length || 1;
    return html`<div className="la-card cat-clock" data-flat>
      <p className="ll-hint">${p.q}</p>
      <div className="cat-clock-g">
        <svg viewBox="0 0 200 200" aria-hidden="true">
          <circle cx="100" cy="100" r="88" fill="none" stroke="var(--lab-line)" stroke-width="2" />
          <circle cx="100" cy="100" r="88" fill="none" stroke="var(--lab-oro)" stroke-width="3" pathLength="1" stroke-dasharray="1" stroke-dashoffset=${a === null ? 1 : 1 - (a + 1) / n} transform="rotate(-90 100 100)" style=${{ transition: 'stroke-dashoffset 610ms cubic-bezier(.16,1,.3,1)' }} />
        </svg>
        ${ore.map(function (o, i) { var t = -Math.PI / 2 + i * 2 * Math.PI / n;
          return html`<button key=${i} type="button" className=${'cat-ora' + (a === i ? ' is-on' : '')} style=${{ left: (50 + 44 * Math.cos(t)) + '%', top: (50 + 44 * Math.sin(t)) + '%' }} aria-pressed=${a === i} onClick=${function () { setA(i); if (i === n - 1) p.ctx.say(p.fine || 'E poi il grande silenzio.'); }}>${o.t}</button>`; })}
        <div className="cat-clock-c">${a === null ? html`<small>Tocca un’ora</small>` : html`<small>${ore[a].h}</small><b>${ore[a].t}</b>`}</div>
      </div>
      <div aria-live="polite">${a !== null && html`<p key=${a} className="ll-gloss">${LL.inline(ore[a].d, 'o')}</p>`}</div>
      ${p.nota && html`<p className="ll-hint">${p.nota}</p>`}
    </div>`;
  });
})();

window.LEZIONE = {
  slug: 'catalogo-strumenti',
  classe: 'Kit definitivo · catalogo',
  titolo: 'Il *catalogo* degli strumenti',
  sottotitolo: 'Un campionario, non una lezione: da qui si scelgono di volta in volta gli strumenti per costruire i materiali. Una lezione vera usa pochi di questi blocchi e dura 50 minuti esatti.',
  saluto: 'Ultima tappa: la prova, le idee e la domanda dell’inizio.',
  percorsi: [
    { id: 'completo', nome: 'Catalogo completo', descrizione: 'Tutti gli strumenti, i costrutti HTML, le attività e le opzioni: 28 scene da sfogliare, non da svolgere in un’ora.' },
    { id: 'essenziale', nome: 'Solo l’essenziale', descrizione: 'Le famiglie che ogni lezione usa: catena, animazione, fonte, decisione, classe, chiusura.' }
  ],
  glossario: {
    'sacro': { etim: 'dal latino *sacer*, «consacrato, riservato alla divinità»', def: 'Ciò che una comunità riconosce in relazione al divino e distingue dall’uso ordinario.' },
    'profano': { etim: 'dal latino *pro fanum*, «davanti al tempio», cioè fuori dal recinto sacro', def: 'L’ambito comune, non riservato al culto. Non significa cattivo.' },
    'segno': { etim: 'dal latino *signum*, «contrassegno»', def: 'Qualcosa che rimanda a qualcos’altro. Il fumo è segno del fuoco anche se nessuno l’ha acceso per comunicare.' },
    'anello': { def: 'Un passaggio della catena causa-effetto del fascicolo: ogni anello regge quello dopo.' },
    'Gestalt': { etim: 'tedesco *Gestalt*, «forma, configurazione»', def: 'Psicologia della percezione: lo sguardo organizza ciò che vede per vicinanza, somiglianza, continuità e chiusura. Il kit applica queste regole da solo.' },
    'LIM': { def: 'Lavagna interattiva multimediale. Il pulsante LIM (o il tasto L) ingrandisce la pagina in proporzione aurea.' }
  },
  scene: [
    /* ========== APERTURA ========== */
    { fase: 'Apertura', momento: 'Apertura',
      titolo: 'Il *catalogo* degli strumenti',
      lead: 'Una lezione-campionario: ogni scena prova uno o due strumenti con un esempio vero.',
      testo: 'Il fascicolo dice *che cosa* va capito; questo catalogo mostra *con che cosa*. **Non è una lezione**: una lezione vera dura 50 minuti esatti, con i minuti dichiarati scena per scena, e usa 6–12 scene con uno strumento principale ciascuna, scelto da questo menu secondo il tipo di difficoltà. Le scene seguono le famiglie del kit: strumenti che **mostrano**, strumenti per **leggere la fonte**, strumenti in cui **decide la classe**, attività di classe, regia e chiusura. In alto: Studio contiene la guida alla scelta, Giochi le dodici meccaniche. Le parole con il filo d’oro, come {Gestalt} o {LIM}, aprono il glossario.',
      blocchi: [
        { tipo: 'agenda', titolo: 'Le famiglie del catalogo' },
        { tipo: 'domanda', id: 'ingresso', etichetta: 'Sondaggio d’ingresso · per alzata di mano',
          q: 'Che cosa rende difficile, di solito, un passaggio del fascicolo?',
          opzioni: ['Un nesso causale', 'Un processo nel tempo', 'Una distinzione sottile', 'Una fonte da leggere'] }
      ] },

    /* ========== MOSTRARE ========== */
    { fase: 'Mostrare', momento: 'Catena',
      titolo: 'Il nesso *causale*',
      lead: 'Per i «per questo» e gli «eppure»: gli anelli si agganciano uno alla volta, poi la prova del togliere.',
      testo: 'Si sceglie quando il fascicolo ha una catena causa-effetto. Da evitare l’elenco puntato statico: non mostra che cosa regge che cosa.',
      blocchi: [
        { tipo: 'catena', titolo: 'Dalla risurrezione al calendario', iniziali: 1,
          anelli: [
            { t: 'I cristiani credono che Gesù sia risorto «il primo giorno della settimana»', d: 'Così i Vangeli collocano la scoperta del sepolcro vuoto (Gv 20,1).', senza: 'Senza questo evento la domenica non avrebbe nulla da ricordare.' },
            { nesso: 'Per questo', t: 'Le comunità si radunano quel giorno per «spezzare il pane»', d: 'At 20,7; nel II secolo Giustino descrive la riunione «nel giorno detto del Sole» (I Apologia, 67).', senza: 'Senza l’assemblea il ricordo resta privato e non segna il tempo di una comunità.' },
            { nesso: 'Così', t: 'Il giorno prende un nome nuovo: *dies dominica*, «giorno del Signore»', d: 'Ap 1,10 parla già di «giorno del Signore».', senza: 'Senza il nome, la memoria non entra nella lingua di tutti.' },
            { nesso: 'Nel 321', t: 'Costantino ne fa un giorno di riposo per tribunali e botteghe', d: 'La legge parla ancora di «giorno del Sole» (Codice di Giustiniano III,12,2).', senza: 'Senza la legge il riposo resta un’usanza delle comunità, non il ritmo dell’impero.' },
            { nesso: 'Da allora', t: 'La settimana di tutti ha un giorno che porta il nome del Signore', d: 'Domenica, *domingo*, *dimanche*: lo dice anche chi non crede.' }
          ],
          fine: 'Una memoria è diventata un nome: lo usa anche chi non crede.' },
        { tipo: 'aggancio', etichetta: 'Con onestà', titolo: 'Non l’unica origine',
          t: 'In inglese e in tedesco il giorno ha conservato il nome del sole: *Sunday*, *Sonntag*. E un giorno di riposo settimanale esisteva già nell’ebraismo, con lo Shabbat. Il cristianesimo ha dato un nome e una memoria nuovi a un ritmo che in parte lo precedeva.',
          fonte: 'Vocabolario Treccani, «domenica»; Es 20,8-11' }
      ] },

    { fase: 'Mostrare', momento: 'Animazione',
      titolo: 'Un *processo* nel tempo',
      lead: 'Fotogrammi chiave: lo stesso palco che cambia, una frase per passo, il docente guida il ritmo.',
      testo: 'Per espansioni, diffusioni, trasformazioni. Gli attori restano al loro posto fra un passo e l’altro; le frecce si disegnano quando serve il nesso.',
      blocchi: [
        { tipo: 'animazione', id: 'regola', rapporto: 1.9, ritmo: 2618, pulsante: 'Avvia l’animazione', titolo: 'La Regola si diffonde',
          attori: [
            { id: 'mc', t: 'Montecassino', forma: 'cerchio', colore: 'accent' },
            { id: 'reg', t: 'La Regola', forma: 'pillola', colore: 'oro' },
            { id: 'm1', t: 'Monastero', forma: 'punto', colore: 'muted' },
            { id: 'm2', t: 'Monastero', forma: 'punto', colore: 'muted' },
            { id: 'm3', t: 'Monastero', forma: 'punto', colore: 'muted' },
            { id: 'aq', t: 'Aquisgrana 816–817', forma: 'riquadro', colore: 'ciano' }
          ],
          frecce: [
            { id: 'f1', da: 'mc', a: 'm1', tratteggio: true },
            { id: 'f2', da: 'mc', a: 'm2', tratteggio: true },
            { id: 'f3', da: 'aq', a: 'm3', t: 'norma' },
            { id: 'f4', da: 'aq', a: 'm1' }
          ],
          passi: [
            { didascalia: 'Verso il 530 Benedetto scrive a Montecassino una regola per la sua comunità.', attori: { mc: { x: 20, y: 58, on: true }, reg: { x: 20, y: 24 } } },
            { didascalia: 'Le copie viaggiano con i monaci: altri monasteri la adottano accanto ad altre regole.', attori: { mc: { on: false }, reg: { x: 36, y: 40 }, m1: { x: 52, y: 26 }, m2: { x: 56, y: 76 } }, frecce: ['f1', 'f2'] },
            { didascalia: 'Nell’816–817 i sinodi di Aquisgrana, con Benedetto d’Aniane, la impongono ai monasteri dell’impero carolingio.', attori: { aq: { x: 78, y: 24, on: true }, m3: { x: 84, y: 72 } }, frecce: ['f1', 'f2', 'f3', 'f4'] },
            { didascalia: 'Un solo testo per tante case: preghiera, lavoro e lettura scandiscono la giornata allo stesso modo.', attori: { aq: { on: false }, reg: { x: 50, y: 50, s: 1.25, on: true }, m1: { on: true }, m2: { on: true }, m3: { on: true } }, frecce: [] }
          ] }
      ] },

    { fase: 'Mostrare', momento: 'Strati',
      titolo: 'Livelli di *senso*',
      lead: 'Dal più evidente al più profondo: lo zoom accompagna la discesa.',
      testo: 'Per i livelli di senso o di scala: i sensi della Scrittura, Chiesa locale e universale, le scale del cosmo. Da evitare la tabella a quattro colonne.',
      blocchi: [
        { tipo: 'strati', titolo: 'I quattro sensi della Scrittura', pulsante: 'Entra nel primo livello',
          livelli: [
            { t: 'Letterale', d: 'Il senso delle parole, raggiunto con l’esegesi: che cosa racconta il testo. Su di esso si fondano gli altri (CCC 116).' },
            { t: 'Allegorico', d: 'Gli eventi letti nel loro significato in Cristo: il passaggio del Mar Rosso come segno del Battesimo (CCC 117).' },
            { t: 'Morale', d: 'Ciò che il testo chiede di fare: «sono stati scritti per nostro ammonimento» (1Cor 10,11).' },
            { t: 'Anagogico', d: 'Verso dove conduce: la Chiesa terrena come segno della Gerusalemme celeste.' }
          ],
          fine: 'Quattro sensi, un solo testo.' }
      ] },

    { fase: 'Mostrare', momento: 'Rivela · Tappe', percorsi: ['completo'],
      titolo: 'Passo per *passo*, data per data',
      lead: 'Rivela scopre un ragionamento un passaggio alla volta; Tappe fa esplorare una linea del tempo.',
      blocchi: [
        { tipo: 'rivela', titolo: 'Perché nasce un monastero?', pulsante: 'Il passo successivo',
          passi: [
            { titolo: 'Un uomo lascia la città', testo: 'Benedetto, nato a Norcia intorno al 480, abbandona gli studi a Roma e si ritira a Subiaco.' },
            { titolo: 'Per questo altri lo raggiungono', testo: 'Intorno a lui si formano piccole comunità: la vita solitaria diventa vita comune.' },
            { titolo: 'Eppure la vita comune ha bisogno di una misura', testo: 'Senza una regola condivisa la comunità dipende dall’umore di chi la guida. Benedetto la scrive a Montecassino.' }
          ],
          fine: 'Dalla fuga al testo: la Regola nasce per far durare una comunità.' },
        { tipo: 'tappe', titolo: 'Sei secoli in cinque date',
          voci: [
            { data: '313', breve: 'Milano', titolo: 'La libertà di culto', testo: 'Costantino e Licinio accordano libertà di culto ai cristiani: il cosiddetto Editto di Milano.' },
            { data: '325', breve: 'Nicea', titolo: 'Il primo concilio ecumenico', testo: 'I vescovi professano il Figlio «della stessa sostanza» del Padre.' },
            { data: 'c. 530', breve: 'Montecassino', titolo: 'La Regola di Benedetto', testo: 'Un prologo e settantatré capitoli per una comunità che prega e lavora.' },
            { data: '816–817', breve: 'Aquisgrana', titolo: 'Una regola per l’impero', testo: 'I sinodi carolingi la impongono ai monasteri dell’impero.' },
            { data: '1098', breve: 'Cîteaux', titolo: 'Il ritorno alla lettera', testo: 'I cistercensi rileggono la Regola alla lettera: nascono nuove abbazie.' }
          ] }
      ] },

    { fase: 'Mostrare', momento: 'Confronto · Carte', percorsi: ['completo'],
      titolo: 'Distinguere concetti *vicini*',
      lead: 'Confronto svela due colonne riga per riga; le Carte girano termine e spiegazione.',
      blocchi: [
        { tipo: 'confronto', a: 'Shabbat ebraico', b: 'Domenica cristiana', pulsante: 'Confronta i due giorni',
          righe: [
            { criterio: 'Quando', a: 'Il sabato, settimo giorno della settimana', b: 'Il primo giorno della settimana' },
            { criterio: 'Che cosa ricorda', a: 'Il riposo di Dio dopo la creazione e la liberazione dall’Egitto (Es 20; Dt 5)', b: 'La risurrezione di Gesù (Gv 20,1)' },
            { criterio: 'Come si vive', a: 'Astensione dal lavoro, cena del venerdì sera, preghiera in sinagoga', b: 'Eucaristia domenicale e riposo' },
            { criterio: 'Il nome', a: '*Shabbat*: «cessare, riposare»', b: '*Dominica*: «del Signore»' }
          ],
          domanda: 'Due giorni messi a parte, due significati: non sono due nomi della stessa festa.' },
        { tipo: 'carte', titolo: 'Tre parole da non confondere',
          carte: [
            { fronte: 'Segno', retro: 'Qualcosa che rimanda a qualcos’altro. Il fumo è segno del fuoco anche se nessuno l’ha acceso per comunicare.' },
            { fronte: 'Segnale', retro: 'Un segno fatto apposta per dare un’indicazione: la freccia dell’uscita, il semaforo, la campanella.' },
            { fronte: 'Simbolo', retro: 'Un segno che rende presente un significato più grande di ciò che si vede: l’anello, la bandiera, la croce.' }
          ] }
      ] },

    { fase: 'Mostrare', momento: 'Mappa · Parola', percorsi: ['completo'],
      titolo: 'Il *centro* e le sue parole',
      lead: 'La mappa radiale lega da tre a sette concetti a un centro; Parola scompone un’etimologia e illumina la radice.',
      blocchi: [
        { tipo: 'mappa', centro: 'Chiesa', istruzione: 'Toccate un’immagine della Chiesa per vedere come si lega al centro.',
          nodi: [
            { t: 'Assemblea', d: '*Ekklesía*, «convocazione»: la Chiesa è prima di tutto un popolo chiamato a radunarsi (CCC 751).' },
            { t: 'Popolo di Dio', d: 'Non si entra per nascita ma per la fede e il Battesimo (CCC 782).' },
            { t: 'Corpo di Cristo', d: 'Molte membra, un solo corpo (1Cor 12,12-27): il capo è Cristo.' },
            { t: 'Tempio dello Spirito', d: 'Lo Spirito abita nella Chiesa come l’anima nel corpo (CCC 797).' },
            { t: 'Edificio', d: 'Il luogo del raduno prende il nome dall’assemblea, non il contrario (CCC 756).' }
          ] },
        { tipo: 'parola', parola: 'Liturgia', radice: 'urg', origine: 'Dal greco leitourgía: leïtos, «del popolo», + érgon, «opera»',
          significato: 'In origine un servizio pubblico reso a proprie spese per la città. Nel Nuovo Testamento diventa il culto reso a Dio e il servizio ai fratelli; oggi indica la preghiera pubblica della Chiesa (CCC 1069).',
          battuta: 'Un’opera pubblica: non uno spettacolo da guardare.' }
      ] },

    { fase: 'Mostrare', momento: 'Etimo · Lente', percorsi: ['completo'],
      titolo: 'La parola si *scompone*, l’immagine si esplora',
      lead: 'Etimo fa toccare le parti della parola; Lente mette punti numerati su un’immagine documentata, con la modalità «trova».',
      testo: 'Qui la lente mostra il segnaposto: in consegna l’immagine va incorporata, con fonte e licenza. Senza un’immagine reale si sceglie un altro strumento.',
      blocchi: [
        { tipo: 'etimo', parola: 'simbolo', etichetta: 'Da dove viene la parola · toccate le parti',
          parti: [{ t: 'sýn', d: 'greco: «insieme»' }, { t: 'bállō', d: '«getto, metto»' }, { t: 'sýmbolon', d: '«segno di riconoscimento»' }], nessi: ['+', '→'],
          spiegazione: 'Nell’antica Grecia un *sýmbolon* era una delle due parti di un oggetto spezzato: chi ne conservava una metà si faceva riconoscere accostandola all’altra. Il simbolo **mette insieme** ciò che si vede e ciò che significa.',
          etim: 'dal greco *sýmbolon*, «segno di riconoscimento»', def: 'Un segno che rende presente un significato più grande di ciò che si vede.' },
        { tipo: 'lente', alt: 'Pianta di una basilica paleocristiana (immagine da incorporare)', rapporto: 1.618,
          didascalia: 'Segnaposto: in consegna si incorpora un’immagine reale, ridotta sotto i 300 KB.', fonte: 'fonte e licenza da indicare',
          punti: [
            { x: 12, y: 50, t: 'Nartece', d: 'L’atrio d’ingresso: qui sostavano i catecumeni, non ancora battezzati.', no: 'È la soglia, non il centro: da qui si entra.' },
            { x: 50, y: 50, t: 'Navata', d: 'Lo spazio dell’assemblea, orientato verso l’abside.', no: 'È il luogo del popolo: lo spazio guarda altrove.' },
            { x: 86, y: 50, t: 'Abside con l’altare', d: 'Il punto verso cui converge tutto lo spazio: la mensa della celebrazione.' }
          ],
          trova: { q: 'Verso quale punto è orientato tutto lo spazio?', ok: 2, why: 'Le navate convergono sull’abside: lo spazio ha una direzione e un centro.', indizio: 'Seguite le linee del pavimento.' } }
      ] },

    /* ========== FONTI ========== */
    { fase: 'Mostrare', momento: 'Originale · Costrutti HTML', percorsi: ['completo'],
      titolo: 'La lingua *originale* e il markup libero',
      lead: 'Originale mostra la fonte nella sua lingua con la pronuncia sopra (ruby); il blocco html accetta tabelle, elenchi, dettagli e ogni costrutto nativo con lo stile del kit.',
      blocchi: [
        { tipo: 'originale', lingua: 'Ebraico · Deuteronomio 6,4', direzione: 'rtl', lang: 'he', fonte: 'Dt 6,4 (testo masoretico); traduzione CEI 2008',
          parole: [
            { o: 'שְׁמַע', tr: 'shemaʿ', it: '«**Ascolta**»: imperativo. La fede d’Israele comincia da un ascolto, non da una visione.' },
            { o: 'יִשְׂרָאֵל', tr: 'Yisraʾel', it: '«Israele»: il popolo è chiamato per nome.' },
            { o: 'יְהוָה', tr: 'Adonai', it: 'Il Nome di Dio, le quattro lettere che non si pronunciano: si legge *Adonai*, «Signore».' },
            { o: 'אֱלֹהֵינוּ', tr: 'Elohenu', it: '«nostro Dio»: Dio di un popolo, in relazione.' },
            { o: 'יְהוָה', tr: 'Adonai', it: 'Di nuovo il Nome.' },
            { o: 'אֶחָד', tr: 'eḥad', it: '«**uno**»: l’unicità di Dio, cuore della preghiera quotidiana ebraica.' }
          ],
          traduzione: '«Ascolta, Israele: il Signore è il nostro Dio, unico è il Signore» (Dt 6,4).' },
        { tipo: 'html', titolo: 'Tre religioni, tre segni (tabella nativa)', fonte: 'Esempio del blocco html: table, mark, abbr, kbd',
          t: '<table><caption>Una tabella HTML con lo stile del kit: intestazioni lapidarie, righe sottili.</caption><thead><tr><th>Religione</th><th>Testo sacro</th><th>Luogo di culto</th><th>Giorno</th></tr></thead><tbody><tr><th scope="row">Ebraismo</th><td>Bibbia ebraica (<abbr title="Torah, Nevi’im, Ketuvim">Tanak</abbr>)</td><td>Sinagoga</td><td><mark>Sabato</mark></td></tr><tr><th scope="row">Cristianesimo</th><td>Bibbia (Antico e Nuovo Testamento)</td><td>Chiesa</td><td><mark>Domenica</mark></td></tr><tr><th scope="row">Islam</th><td>Corano</td><td>Moschea</td><td>Venerdì (preghiera comunitaria)</td></tr></tbody></table><p>Il blocco accetta anche <kbd>dl</kbd>, <kbd>details</kbd>, <kbd>figure</kbd>, <kbd>ruby</kbd>: ciò che il kit non ha come blocco si scrive in HTML e prende comunque il suo stile.</p>' }
      ] },

    { fase: 'Mostrare', momento: 'Galleria · Prima/dopo', percorsi: ['completo'],
      titolo: 'Più figure, un *confronto*',
      lead: 'La galleria scorre a scatti con frecce e pallini; Prima/dopo confronta due immagini con un cursore. Qui i segnaposto: in consegna le immagini vanno incorporate.',
      blocchi: [
        { tipo: 'galleria', titolo: 'Montecassino in tre momenti', rapporto: 1.9,
          figure: [
            { alt: 'Montecassino prima del 1944 (fotografia da incorporare)', didascalia: 'L’abbazia prima del bombardamento del 15 febbraio 1944.', fonte: 'fonte e licenza da indicare' },
            { alt: 'Le rovine del 1944 (fotografia da incorporare)', didascalia: 'Le rovine: la quarta distruzione nella storia dell’abbazia.', fonte: 'fonte e licenza da indicare' },
            { alt: 'L’abbazia ricostruita (fotografia da incorporare)', didascalia: 'Ricostruita «dov’era e com’era», riconsacrata nel 1964.', fonte: 'fonte e licenza da indicare' }
          ] },
        { tipo: 'prima-dopo', rapporto: 1.9, a: { alt: 'Rovine del 1944 (immagine da incorporare)', etichetta: '1944' }, b: { alt: 'Abbazia oggi (immagine da incorporare)', etichetta: 'Oggi' },
          didascalia: 'Trascinate il cursore: la stessa inquadratura prima e dopo la ricostruzione.' }
      ] },

    /* ========== FONTI ========== */
    { fase: 'Fonti', momento: 'Leggi · Citazione',
      titolo: 'Leggere *davvero*',
      lead: 'La fonte principale si legge in classe: frasi che si aprono, oppure «trova la frase». La citazione apre il commento su richiesta.',
      blocchi: [
        { tipo: 'leggi', fonte: 'Genesi 28,16-19 · Bibbia CEI 2008', q: 'In quale frase la pietra smette di essere un oggetto qualunque?',
          testo: 'Giacobbe si svegliò dal sonno e disse: «[[Certo, il Signore è in questo luogo e io non lo sapevo::Giacobbe **riconosce** l’incontro con Dio, ma della pietra non si parla ancora.]]». Ebbe timore e disse: «[[Quanto è terribile questo luogo! Questa è proprio la casa di Dio, questa è la porta del cielo::Il *luogo* diventa sacro; la pietra, per ora, è ancora un guanciale.]]». La mattina Giacobbe si alzò, [[!prese la pietra che si era posta come guanciale, la eresse come una stele e versò olio sulla sua sommità::Qui la pietra cambia funzione: da guanciale a **stele**, segno dell’incontro, consacrata con l’olio.]]. E chiamò quel luogo Betel.' },
        { tipo: 'citazione', testo: 'Ascolta, o figlio, i precetti del maestro e inclina l’orecchio del tuo cuore.', fonte: 'Regola di san Benedetto, Prologo 1',
          commento: 'La Regola comincia con un imperativo, **ascolta**, e con un nome, **figlio**: prima di ogni norma c’è una relazione. L’«orecchio del cuore» dice che obbedire (*ob-audire*, «ascoltare stando davanti») è un modo di ascoltare.' }
      ] },

    /* ========== DECIDERE ========== */
    { fase: 'Fonti', momento: 'Dialogo · Scheda', percorsi: ['completo'],
      titolo: 'Una fonte a *due voci*',
      lead: 'Il dialogo si legge battuta per battuta, anche a parti assegnate; la scheda apre un approfondimento in una finestra senza lasciare la scena.',
      blocchi: [
        { tipo: 'dialogo', titolo: 'Gesù e Nicodemo', fonte: 'Giovanni 3,2-5 · Bibbia CEI 2008', istruzione: 'Due lettori: uno per Nicodemo, uno per Gesù.',
          voci: [
            { chi: 'Nicodemo', t: '«Rabbì, sappiamo che sei venuto da Dio come maestro; nessuno infatti può compiere questi segni che tu compi, se Dio non è con lui».' },
            { chi: 'Gesù', t: '«In verità, in verità io ti dico, se uno non nasce dall’alto, non può vedere il regno di Dio».' },
            { chi: 'Nicodemo', t: '«Come può nascere un uomo quando è vecchio? Può forse entrare una seconda volta nel grembo di sua madre e rinascere?».' },
            { chi: 'Gesù', t: '«In verità, in verità io ti dico, se uno non nasce da acqua e Spirito, non può entrare nel regno di Dio».' }
          ],
          fine: 'Nicodemo capisce alla lettera; Gesù parla di una nascita diversa. Il fraintendimento è il motore del dialogo.' },
        { tipo: 'scheda', etichetta: 'Chi era', titolo: 'Nicodemo', sotto: 'Un fariseo, capo dei Giudei, che viene di notte', pulsante: 'Apri la scheda',
          t: 'Nicodemo compare tre volte nel Vangelo di Giovanni: di notte, per interrogare Gesù (Gv 3); nel sinedrio, per chiedere che non lo si condanni senza averlo ascoltato (Gv 7,50-51); dopo la morte, con circa trenta chili di mirra e àloe per la sepoltura (Gv 19,39).\n\nUn percorso in tre tappe: dalla curiosità notturna al gesto pubblico. Il Vangelo non dice che cosa abbia creduto alla fine: lo lascia capire dai gesti.',
          fonte: 'Gv 3,1-21; 7,45-52; 19,38-42' }
      ] },

    /* ========== DECIDERE ========== */
    { fase: 'Decidere', momento: 'Bivio',
      titolo: 'Un caso, più *strade*',
      lead: 'Scelte tutte difendibili, esiti con guadagni e costi, poi il criterio della fonte.',
      testo: 'Si sceglie quando una decisione ha conseguenze da vedere. Per i temi personali gli esiti hanno `tono: neutro`.',
      blocchi: [
        { tipo: 'bivio', caso: 'Un museo espone un anello d’oro con una piccola croce incisa, senza didascalia. Da quale ricerca cominciamo?', pulsante: 'Qual è il criterio?',
          scelte: [
            { t: 'Pesiamo l’oro e misuriamo la croce', tono: 'neutro', esito: 'Sapremo quanto vale e quanto è grande. La forma, da sola, non dice però se la croce era un ornamento, un segno di appartenenza o un oggetto di devozione.' },
            { t: 'Cerchiamo chi lo portava, dove e quando', tono: 'ok', esito: 'È la via più lunga ma la sola che apre al significato: una croce su un anello del IV secolo e una su un anello di oggi non dicono la stessa cosa.' },
            { t: 'Concludiamo che è un simbolo cristiano', tono: 'ko', esito: 'Forse. Ma senza il contesto è una scommessa: la stessa forma può essere decorazione, marchio di bottega o segno di fede.' }
          ],
          chiusura: 'Il metodo: prima la **forma** (che cosa si vede), poi il **contesto** (chi, dove, con quali gesti), infine il **significato**. Saltare il secondo passo è l’errore più comune.' }
      ] },

    { fase: 'Decidere', momento: 'Bilancia',
      titolo: 'Ragioni in *tensione*',
      lead: 'Argomenti sui due piatti; il peso lo dà la classe e lo motiva. La bilancia non decide: mostra.',
      blocchi: [
        { tipo: 'bilancia', titolo: 'Serve una regola scritta per vivere insieme?', piatti: ['Regola scritta', 'Libertà del singolo'], libero: true,
          argomenti: [
            { t: 'Una misura uguale protegge i più deboli', lato: 0, nota: 'RB 34: a ciascuno «secondo il bisogno», senza mormorazioni; chi ha meno forza non viene schiacciato dallo zelo dei forti.' },
            { t: 'Chi arriva sa che cosa aspettarsi', lato: 0, nota: 'La Regola si legge per intero al novizio tre volte nell’anno di prova (RB 58): nessuna sorpresa.' },
            { t: 'Ogni persona ha un ritmo e una storia', lato: 1, nota: 'La Regola stessa chiede all’abate di «servire i caratteri di molti» (RB 2,31).' },
            { t: '«La lettera uccide, lo Spirito dà vita»', lato: 1, nota: '2Cor 3,6: una norma applicata senza discernimento smette di servire la persona.' }
          ],
          domanda: 'Benedetto scrive la Regola ma chiede all’abate di «temperare ogni cosa» perché i forti desiderino di più e i deboli non fuggano (RB 64,19). Dove mettete l’equilibrio?' }
      ] },

    { fase: 'Decidere', momento: 'Stima',
      titolo: 'Un dato che *sorprende*',
      lead: 'Prima la stima della classe, poi il dato documentato: lo scarto apre la spiegazione.',
      blocchi: [
        { tipo: 'stima', q: 'Quanti capitoli ha la Regola di san Benedetto?', min: 10, max: 200, passo: 1, valore: 73, tolleranza: 10, unita: 'capitoli',
          why: 'Settantatré capitoli brevi, più un prologo. Benedetto la chiama «una piccola regola per principianti» (RB 73,8): la misura è parte del messaggio.',
          fonte: 'Regola di san Benedetto, Prologo e capp. 1–73' }
      ] },

    { fase: 'Decidere', momento: 'Smista · Ordina', percorsi: ['completo'],
      titolo: 'Collocare e *ricostruire*',
      lead: 'Smista colloca una voce alla volta in una categoria; Ordina rimette in fila fasi o eventi.',
      blocchi: [
        { tipo: 'smista', titolo: 'Fatto, ricostruzione o giudizio?', categorie: ['Fatto attestato', 'Ricostruzione', 'Giudizio'],
          voci: [
            { t: 'Gregorio Magno racconta la vita di Benedetto nel secondo libro dei Dialoghi (593–594).', c: 0, why: 'Il testo esiste ed è datato: è un fatto attestato, anche se il suo contenuto va interpretato.' },
            { t: 'Benedetto fondò Montecassino nel 529.', c: 1, why: 'La data è tradizionale: Gregorio non la indica. Gli studiosi la ricostruiscono intorno al 529–530.' },
            { t: 'Il monachesimo ha salvato la cultura europea.', c: 2, why: 'È un giudizio storico, discutibile e discusso: i monasteri copiarono molti testi, ma non furono i soli.' },
            { t: 'La Regola ha un prologo e settantatré capitoli.', c: 0, why: 'Si verifica aprendo il testo.' }
          ],
          chiusura: 'Distinguere i tre livelli è il primo passo di ogni lettura storica.' },
        { tipo: 'ordina', q: 'Rimettete in ordine il racconto di Giacobbe a Betel (Gen 28)',
          voci: ['Giacobbe si corica con una pietra come guanciale', 'Sogna una scala fra terra e cielo e riceve la promessa', 'Si sveglia: «Il Signore è in questo luogo»', 'Erige la pietra come stele e vi versa l’olio', 'Chiama quel luogo Betel, «casa di Dio»'],
          why: 'La pietra cambia senso solo **dopo** l’incontro: prima è un guanciale, poi una stele. Il significato viene dal contesto, non dalla forma.' }
      ] },

    { fase: 'Decidere', momento: 'Verifica · Chi lo dice?',
      titolo: 'L’equivoco da *smontare*',
      lead: 'La verifica lampo spiega sempre il perché; «Chi lo dice?» abbina frasi d’autore a una voce.',
      blocchi: [
        { tipo: 'verifica', etichetta: 'Nella fede cattolica', q: 'Per la Chiesa cattolica, che cosa sono i sacramenti?',
          opzioni: ['Oggetti che hanno un potere magico', 'Ricordi simbolici che fanno pensare a Gesù', 'Segni efficaci attraverso cui Cristo comunica la sua grazia'], ok: 2,
          why: 'Il Catechismo li chiama «segni efficaci della grazia» (CCC 1131): acqua, pane, olio e gesti, perché l’uomo comunica anche con il corpo. Non magia, perché non dipendono da una formula che costringe Dio; non solo ricordo, perché operano ciò che significano.' },
        { tipo: 'chi', opzioni: ['Agostino', 'Benedetto', 'Francesco'], fine: 'Tre voci, tre secoli.',
          frasi: [
            { t: 'Ascolta, o figlio, i precetti del maestro e inclina l’orecchio del tuo cuore.', ok: 1, why: 'Regola di san Benedetto, Prologo 1: l’inizio della Regola.' },
            { t: 'Ci hai fatti per te, e il nostro cuore è inquieto finché non riposa in te.', ok: 0, why: 'Agostino, Confessioni I,1,1.' },
            { t: 'Laudato si’, mi’ Signore, cum tucte le tue creature.', ok: 2, why: 'Francesco d’Assisi, Cantico delle creature (1224–1226).' }
          ] }
      ] },

    /* ========== CLASSE ========== */
    { fase: 'Decidere', momento: 'Scegli · Griglia', percorsi: ['completo'],
      titolo: 'La parola *esatta*, la casella giusta',
      lead: 'Scegli mette un menu a tendina dentro la frase; la griglia incrocia righe e colonne con caselle da spuntare.',
      blocchi: [
        { tipo: 'scegli', etichetta: 'Completa con precisione',
          testo: 'Il Concilio di Nicea ([381|*325|451]) professa che il Figlio è [simile|*della stessa sostanza|inferiore] al Padre, contro la dottrina di [*Ario|Pelagio|Nestorio].',
          why: 'Nicea (325) risponde ad Ario, che faceva del Figlio una creatura: il Credo dice *homooúsios*, «della stessa sostanza». Costantinopoli (381) e Calcedonia (451) vengono dopo.' },
        { tipo: 'griglia', titolo: 'Che cosa appartiene a chi?', righe: ['Ebraismo', 'Cristianesimo', 'Islam'], colonne: ['Un solo Dio', 'Gesù è il Figlio di Dio', 'Il Corano è parola di Dio', 'Abramo è un padre nella fede'],
          ok: [[1, 0, 0, 1], [1, 1, 0, 1], [1, 0, 1, 1]],
          why: 'Tre religioni monoteiste che riconoscono Abramo; le separa ciò che credono di Gesù e della rivelazione.' }
      ] },

    { fase: 'Decidere', momento: 'Storia a bivi', percorsi: ['completo'],
      titolo: 'Scelte che *si susseguono*',
      lead: 'Un bivio a più passi: il percorso resta visibile, si può tornare indietro e provare un’altra strada.',
      blocchi: [
        { tipo: 'storia', titolo: 'Cartagine, anno 250', inizio: 'a', etichetta: 'Mettersi nei panni di…',
          nodi: {
            a: { t: 'L’imperatore Decio ordina a tutti di sacrificare agli dèi e di farsi rilasciare un certificato (*libellus*). Sei un cristiano di Cartagine: chi non ha il certificato rischia il processo.', scelte: [
              { t: 'Sacrifico: salvo la vita e la famiglia', vai: 'b' },
              { t: 'Compro un certificato falso senza sacrificare', vai: 'c' },
              { t: 'Rifiuto e aspetto l’arresto', vai: 'd' } ] },
            b: { t: 'Hai salvato la vita. Ma la comunità ti chiama *lapsus*, «caduto»: potrai essere riammesso soltanto dopo una penitenza. Alcuni chiedono il perdono subito; altri non lo vogliono concedere mai.', fine: true, tono: 'neutro', esito: 'Sei un lapsus' },
            c: { t: 'Sei un *libellaticus*: non hai sacrificato, ma hai firmato il falso. La Chiesa discuterà a lungo se il tuo caso è come quello di chi ha sacrificato davvero.', fine: true, tono: 'neutro', esito: 'Sei un libellaticus' },
            d: { t: 'Vieni arrestato. Alcuni dei tuoi compagni muoiono (i *martiri*); chi sopravvive al carcere è chiamato *confessore* e avrà grande autorità nella comunità: molti lapsi gli chiederanno di intercedere.', fine: true, tono: 'ok', esito: 'Sei un confessore' } },
          chiusura: 'Cipriano di Cartagine (*De lapsis*, 251) distingue i casi e chiede misericordia con penitenza: da questa crisi nasce la prassi penitenziale della Chiesa antica. La storia non giudica i singoli: fa capire da dove vengono le regole.' }
      ] },

    /* ========== CLASSE ========== */
    { fase: 'Classe', momento: 'Nuvola · Spettro',
      titolo: 'Le parole della *classe*',
      lead: 'La nuvola cresce con le parole dei ragazzi; lo Spettro mette le posizioni su una linea e dice da dove viene il loro nome.',
      blocchi: [
        { tipo: 'nuvola', id: 'sacro', q: 'Che cosa vi viene in mente con la parola «{sacro}»?', semi: ['silenzio', 'chiesa', 'rispetto'] },
        { tipo: 'spettro', q: 'Davanti alla domanda su Dio, dove si collocano queste parole?', poli: ['Fede', 'Sospensione', 'Negazione'], fine: 'Quattro parole: tre posizioni e una non-posizione.',
          punti: [
            { t: 'credente', x: 8, etim: 'dal latino *credere*, «affidarsi, prestare fiducia»', def: 'Chi afferma che Dio esiste e vi si affida.', es: '«Credo in un solo Dio».' },
            { t: 'agnostico', x: 50, etim: 'dal greco *á-gnōstos*, «non conosciuto»; la parola è coniata da T. H. Huxley nel 1869', def: 'Chi ritiene che non si possa sapere se Dio esista.', es: '«Non posso saperlo».' },
            { t: 'ateo', x: 92, etim: 'dal greco *á-theos*, «senza dio»', def: 'Chi afferma che Dio non esiste.', es: '«Non c’è nessun Dio».' },
            { t: 'indifferente', x: 50, fuori: 'fuori dalla linea', etim: 'dal latino *in-differens*, «che non fa differenza»', def: 'Chi non si pone la domanda: non risponde né sì né no.' }
          ] }
      ] },

    { fase: 'Classe', momento: 'Laboratorio',
      titolo: 'Il *laboratorio* con varianti',
      lead: 'Il docente sceglie in aula fra attività di pari durata; la consegna ha cronometro, passi, ruoli e prodotto atteso.',
      blocchi: [
        { tipo: 'varianti', istruzione: 'Una sola attività, a scelta: tutte e due portano alla stessa domanda.',
          opzioni: [
            { nome: 'A coppie', durata: '4 min', descrizione: 'Ogni coppia descrive l’anello senza inventarne la storia, poi scrive che cosa servirebbe sapere per capirlo.', quando: 'La classe lavora bene in coppia; servono carta e penna.',
              blocchi: [
                { tipo: 'consegna', titolo: 'L’anello con la croce', modalita: 'Coppie',
                  passi: ['Descrivete l’anello senza inventarne la storia: che cosa si vede?', 'Scrivete tre cose che servirebbe sapere per capirlo', 'Scegliete la più importante e dite perché'],
                  prodotto: 'Una frase per coppia: «Per capire questo anello dovremmo sapere…»' }
              ] },
            { nome: 'In quattro gruppi', durata: '4 min', descrizione: 'Ogni gruppo prende un oggetto diverso (anello, bandiera, sciarpa, candela) e applica il metodo: forma, contesto, significato.', quando: 'Classe numerosa e abituata ai ruoli.',
              blocchi: [
                { tipo: 'consegna', titolo: 'Quattro oggetti, un metodo', modalita: 'Gruppi',
                  passi: ['Forma: che cosa si vede', 'Contesto: chi lo usa, dove, con quali gesti', 'Significato: che cosa rende presente'],
                  ruoli: ['Lettore', 'Scrivano', 'Portavoce', 'Custode del tempo'], prodotto: 'Tre righe per gruppo, una per passo' }
              ] }
          ] }
      ] },

    /* ========== REGIA ========== */
    { fase: 'Classe', momento: 'Dubbi · Sintesi', percorsi: ['completo'],
      titolo: 'Le *obiezioni* serie e la frase della classe',
      lead: 'I dubbi si aprono uno alla volta con la loro risposta e la fonte; la sintesi è la frase che la classe costruisce insieme e il docente scrive.',
      blocchi: [
        { tipo: 'dubbi', titolo: 'Dubbi e risposte', voci: [
          { q: 'Se Dio è ovunque, perché serve una chiesa?', r: 'Il culto cristiano non è legato a un unico luogo: Dio non è rinchiuso fra quattro mura. La chiesa raduna la comunità e orienta la celebrazione; la strada fuori non è un luogo indegno, è un luogo comune.', fonte: 'Catechismo della Chiesa Cattolica, nn. 1179-1181' },
          { q: 'Un simbolo non è «solo» un simbolo?', r: 'Nel linguaggio comune «simbolico» vuol dire «non reale». Nel senso originario è il contrario: il *sýmbolon* mette insieme ciò che si vede e ciò che significa, e lo rende presente. Una bandiera bruciata offende davvero.', fonte: 'E. Cassirer, Saggio sull’uomo (1944)' },
          { q: 'Perché i cristiani non riposano di sabato come gli ebrei?', r: 'Perché ricordano un altro evento: la risurrezione «il primo giorno della settimana». Il riposo resta, cambia la memoria che lo fonda.', fonte: 'Gv 20,1; At 20,7; CCC 2174-2176' } ] },
        { tipo: 'sintesi', q: 'In una frase: che cosa rende «sacro» un oggetto, un luogo o un giorno?', segnaposto: 'Un oggetto diventa sacro quando…', max: 240 }
      ] },

    /* ========== REGIA ========== */
    { fase: 'Regia', momento: 'Mascotte · Nota · Aggancio', percorsi: ['completo'],
      titolo: 'La *regia* discreta',
      lead: 'La mascotte interviene con una battuta; la Nota segnala un errore frequente; l’Aggancio resta chiuso finché serve.',
      blocchi: [
        { tipo: 'mascotte', etichetta: 'ricorda', t: 'Uno strumento principale per scena, al massimo due blocchi. Se ne servono di più, dividete la scena.' },
        { tipo: 'nota', t: '**Errore frequente:** «{profano}» non significa «cattivo». È ciò che sta *fuori dal recinto sacro* (*pro fanum*): la scuola e la strada sono luoghi profani, non indegni.' },
        { tipo: 'aggancio', etichetta: 'Oggi', titolo: 'Giorni che portano un nome',
          t: 'Lunedì (Luna), martedì (Marte), mercoledì (Mercurio), giovedì (Giove), venerdì (Venere): i giorni italiani conservano gli dèi romani. Sabato e domenica vengono invece dal lessico biblico e cristiano: *sabbatum* e *dies dominica*.',
          fonte: 'Vocabolario Treccani, voci «sabato» e «domenica»' }
      ] },

    { fase: 'Regia', momento: 'Pausa gioco',
      titolo: 'La *pausa* gioco',
      lead: 'Si lancia dalla scena e, finito il gioco, si torna alla stessa scena: 5–8 minuti con la restituzione.',
      testo: 'In modalità **Giochi** trovate tutte e dodici le meccaniche con dati d’esempio; nella lezione vera entrano solo quelle che servono. La Sfida a squadre c’è sempre, come pausa o come scheda in più.',
      blocchi: [
        { tipo: 'gioco', id: 'sfida', titolo: 'Sfida a squadre', testo: 'Due squadre, quattro domande, venti secondi per rispondere e dieci per rubare. Poi si torna qui.', pulsante: 'Si gioca' }
      ] },

    { fase: 'Regia', momento: 'Immagine · Componente proprio', percorsi: ['completo'],
      titolo: 'Figure e componenti *propri*',
      lead: 'Immagine con didascalia e fonte (qui il segnaposto); e un componente scritto per la lezione, quando nessun blocco rende l’idea.',
      blocchi: [
        { tipo: 'immagine', alt: 'Montecassino: l’abbazia ricostruita dopo il 1944 (fotografia da incorporare)', rapporto: 1.618, didascalia: 'Le immagini si incorporano come `data:` dopo averle ridotte sotto i 300 KB.', fonte: 'fonte e licenza da indicare' },
        { tipo: 'custom', nome: 'Orologio', props: {
          q: '«Sette volte al giorno io ti lodo» (Sal 119,164) e una volta nella notte: toccate un’ora.',
          ore: [
            { t: 'Vigilie', h: 'notte', d: 'La preghiera nella notte: «A mezzanotte mi alzo a renderti grazie» (Sal 119,62; RB 16).' },
            { t: 'Lodi', h: 'alba', d: 'All’alba: la lode che apre il giorno (RB 12–13).' },
            { t: 'Prima', h: 'circa le 6', d: 'La prima ora del giorno: si entra nel lavoro.' },
            { t: 'Terza', h: 'circa le 9', d: 'Breve sosta di preghiera nel lavoro del mattino.' },
            { t: 'Sesta', h: 'mezzogiorno', d: 'A metà giornata, prima del pasto.' },
            { t: 'Nona', h: 'circa le 15', d: 'Metà pomeriggio: il lavoro riprende dopo la lettura.' },
            { t: 'Vespri', h: 'tramonto', d: 'La preghiera della sera, con il *Magnificat*.' },
            { t: 'Compieta', h: 'prima del riposo', d: 'L’ultima preghiera: poi il silenzio della notte (RB 42).' }
          ],
          nota: 'Orari indicativi: nella Regola le ore seguono il sole e cambiano con le stagioni (RB 8; 48).',
          fine: 'E poi il grande silenzio.' } }
      ] },

    /* ========== CHIUSURA ========== */
    { fase: 'Chiusura', momento: 'Prova · Idee',
      titolo: '*Chiudere* bene',
      lead: 'Una prova breve con le stelle e tre idee da portare a casa: l’ultima scena è un picco, non un riassunto.',
      blocchi: [
        { tipo: 'quiz', etichetta: 'Prova breve', perfetto: 'Tre su tre: sapete leggere un segno nel suo contesto… e scegliere lo strumento giusto.',
          domande: [
            { q: 'Un tifoso appende in camera la sciarpa della sua squadra. Per lui la sciarpa è soprattutto…', opzioni: ['un segnale: indica dove si trova la camera', 'un simbolo: rende presente un’appartenenza', 'un oggetto: tiene caldo'], ok: 1, why: 'La forma è quella di ogni sciarpa; il contesto (la camera, il tifo) la rende segno di appartenenza.' },
            { q: 'Che cosa rende «sacro» un luogo, nel racconto di Giacobbe?', opzioni: ['La qualità della pietra', 'L’incontro con Dio che viene riconosciuto e ricordato', 'La decisione di costruire una città'], ok: 1, why: 'La pietra non cambia: cambia ciò che è accaduto lì e il gesto che lo ricorda (la stele, l’olio, il nome).' },
            { q: 'Perché Benedetto chiede all’abate di «temperare ogni cosa»?', opzioni: ['Perché la Regola è solo un consiglio', 'Perché la misura va adattata ai forti e ai deboli', 'Perché l’abate può cambiare la Regola a piacere'], ok: 1, why: 'RB 64,19: la misura è uguale per tutti ma applicata con discernimento, «perché i forti desiderino di più e i deboli non fuggano».' }
          ] },
        { tipo: 'idee', titolo: 'Tre idee da portare a casa', pulsante: 'Rivela la prima idea',
          idee: ['Il concetto più difficile riceve lo strumento più forte: un’animazione, una catena, gli strati.', 'La fonte principale si legge davvero in classe, non si riassume.', 'In ogni lezione la classe decide almeno una volta: bivio, bilancia, stima, smista.'] }
      ] },

    { fase: 'Chiusura', momento: 'Traguardi', percorsi: ['completo'],
      titolo: 'Che cosa *sappiamo* fare ora',
      lead: 'La scaletta degli obiettivi si spunta per alzata di mano: la barra si riempie in oro.',
      blocchi: [
        { tipo: 'traguardi', titolo: 'I traguardi della lezione', voci: [
          'Distinguere segno, segnale e simbolo con un esempio per ciascuno',
          'Spiegare perché la pietra di Giacobbe cambia senso dopo l’incontro',
          'Dire che cosa ricordano lo Shabbat e la domenica',
          'Scegliere lo strumento adatto al tipo di difficoltà del fascicolo' ] }
      ] },

    { fase: 'Chiusura', momento: 'Ritorno',
      titolo: 'La *stessa* domanda dell’inizio',
      lead: 'Il sondaggio d’uscita mostra il voto d’ingresso come tratteggio d’oro: si vede se la classe ha cambiato idea.',
      blocchi: [
        { tipo: 'domanda', id: 'uscita', confronta: 'ingresso', etichetta: 'La stessa domanda dell’inizio',
          q: 'Che cosa rende difficile, di solito, un passaggio del fascicolo?',
          opzioni: ['Un nesso causale', 'Un processo nel tempo', 'Una distinzione sottile', 'Una fonte da leggere'],
          dibattito: 'Se la classe ha cambiato idea, il tratteggio lo mostra: è il «prima». Lo strumento si sceglie dal tipo di difficoltà, non dalla varietà.' },
        { tipo: 'continua', voci: [
          { t: 'Tutti i giochi', d: 'Le dodici meccaniche con dati d’esempio', vai: 'giochi', principale: true },
          { t: 'Il testo guida', d: 'In modalità Studio: come scegliere gli strumenti dal fascicolo' },
          { t: 'Da capo', d: 'Torna alla prima scena', vai: 'inizio' }
        ] }
      ] }
  ],

  /* =================== MODALITÀ STUDIO: la guida alla scelta =================== */
  studio: {
    sezioni: [
      { titolo: 'Che cosa va sullo schermo', testo: 'Lo schermo mostra solo ciò che gli studenti devono imparare: brevi spiegazioni sul tema, integrate da animazioni, attività e giochi. Niente etichette di regia: stanno nelle note del docente. Lead di una frase, testo entro circa 60 parole, didascalie delle animazioni di una frase. Il resto lo dice il docente.\n\nLa spiegazione è sull’argomento; l’attualità entra come rimando (aggancio), al massimo uno per scena e tre per lezione.' },
      { titolo: 'Dal tipo di difficoltà allo strumento', testo: 'Nesso causale: catena, con la prova del togliere un anello (alternative: rivela, animazione con frecce). Processo o trasformazione nel tempo: animazione a fotogrammi (o un componente proprio). Livelli di senso o di scala: strati (o mappa, carte). Distinzione fra concetti vicini: carte e verifica (o confronto, smista). Collocazione nel tempo: tappe per esplorare, ordina per ricostruire. Lettura di una fonte: leggi, oppure citazione con commento. Opera d’arte, luogo, pianta: lente su un’immagine documentata. Ragioni in tensione: bilancia. Decisione su un caso: bivio. Dato che sorprende: stima, solo con un dato documentato. Etimologia: parola oppure etimo. Posizione personale: domanda (sondaggio) o riflessione nei giochi, senza punteggio. Lavoro di gruppo: consegna con tempo, passi, ruoli e prodotto. Tempi incerti: varianti nel laboratorio, percorsi a livello di lezione.\n\nSe nessuno strumento rende l’idea del fascicolo, si scrive un componente proprio con LabLezione.registra: una pianta cliccabile, un esperimento mentale, un oggetto che si costruisce.' },
      { titolo: 'Regole di regia', testo: 'La lezione dura 50 minuti esatti, mai di più: ogni scena dichiara i minuti e la somma per percorso è 50, istruzioni e restituzione comprese. Il catalogo serve a scegliere: in una lezione entrano pochi strumenti, uno per anello difficile. Uno strumento principale per scena, al massimo due blocchi. Nella stessa lezione lo stesso blocco interattivo compare al massimo due volte, salvo la verifica. Si alternano strumenti che mostrano (animazione, catena, strati, lente) e strumenti in cui decide la classe (bivio, bilancia, stima, smista, ordina, leggi in modalità trova). Il concetto più difficile riceve lo strumento più forte; la fonte principale si legge davvero; c’è almeno un punto in cui decide la classe; l’equivoco più probabile viene smontato con un esito motivato.\n\nIl cronometro della barra parte al primo «Avanti» e confronta il tempo con il piano: se segna ritardo si accorcia, mai si sfora.' },
      { titolo: 'Le attività di classe', testo: 'Sondaggio d’ingresso e d’uscita (domanda, con confronta per il prima e il dopo), nuvola di parole, spettro delle posizioni, «Chi lo dice?», quiz a più domande con le stelle, idee da portare a casa, continua, etimo, agenda. Voti e parole restano in memoria mentre la pagina è aperta; nulla viene salvato. Nessun nome, nessun punteggio alle convinzioni personali.' },
      { titolo: 'La pausa gioco e le dodici meccaniche', testo: 'Quiz, vero o falso, flashcard, memory, abbinamenti, categorie, linea del tempo, completa, cruciverba, sfida a squadre, sondaggio, riflessione. La pausa dura 5–8 minuti con la restituzione, si lancia da una scena con il blocco gioco e, finita, riporta alla stessa scena dalla barra in basso. La Sfida a squadre è sempre presente. Compaiono solo le schede dei giochi che hanno dati.' },
      { titolo: 'Le opzioni dell’artefatto', testo: 'Tema giorno e notte (pulsante in testata, scelta ricordata). Modalità LIM: pulsante, tasto L o ?lim=1; tutto cresce in proporzione aurea. Glossario automatico: ogni {parola} nei testi apre etimologia e spiegazione. Mascotte dell’anno: Semino, Ichthy, Navicella, Bussolina, Terra; apre e chiude la lezione, interviene nelle scene. Skin dei giochi: arcade o tavolo. Percorsi alternativi da 50 minuti e varianti del laboratorio. In visore (?in=visore) la testata si riduce alla riga delle schede. Dallo script di assemblaggio: --skin, --css, --tema, --lim, --senza-mascotte.' }
    ],
    fonti: [
      'Lab IRC Design System, pacchetto «Lab-Irc» (3 ottobre 2026): tokens/perception.css, assets/artefatti/',
      'R. E. Mayer, R. Moreno, Nine Ways to Reduce Cognitive Load in Multimedia Learning, Educational Psychologist 38 (2003)',
      'Regola di san Benedetto; Bibbia CEI 2008; Catechismo della Chiesa Cattolica'
    ]
  },

  /* =================== GIOCHI: le dodici meccaniche con dati d’esempio =================== */
  giochi: {
    quiz: [
      { q: 'Nel racconto di Genesi 28 la pietra diventa una stele…', a: ['appena Giacobbe la sceglie come guanciale', 'dopo il sogno, al risveglio', 'quando la città cambia nome', 'mai: resta un sasso'], ok: 1, why: 'Il gesto viene dopo l’incontro: la pietra eretta e unta ricorda ciò che è accaduto lì.' },
      { q: '«Profano» significa…', a: ['cattivo o irriverente', 'fuori dal recinto sacro', 'antico', 'segreto'], ok: 1, why: 'Pro fanum: davanti al tempio, cioè fuori dallo spazio riservato al culto.' },
      { q: 'Il nome «domenica» viene da…', a: ['dominus, «signore»', 'domus, «casa»', 'dies solis, «giorno del sole»', 'decimus, «decimo»'], ok: 0, why: 'Dies dominica, il giorno del Signore: una memoria cristiana entrata nel calendario di tutti.' }
    ],
    vf: [
      { s: 'Per la Chiesa cattolica i sacramenti sono oggetti con un potere magico.', v: false, why: 'Sono «segni efficaci della grazia» (CCC 1131): operano per l’azione di Cristo, non per una formula che costringe Dio.' },
      { s: 'La Regola di san Benedetto ha un prologo e settantatré capitoli.', v: true, why: 'E l’ultimo capitolo la chiama «piccola regola per principianti».' },
      { s: 'Lo Shabbat ebraico e la domenica cristiana sono due nomi della stessa festa.', v: false, why: 'Giorni diversi (il settimo e il primo), memorie diverse (creazione e liberazione; risurrezione).' },
      { s: 'Un segnale è un segno fatto apposta per dare un’indicazione.', v: true, why: 'La freccia dell’uscita, il semaforo, la campanella: segni costruiti per guidare un comportamento.' }
    ],
    flash: [['Segno', 'Qualcosa che rimanda a qualcos’altro'], ['Simbolo', 'Segno che rende presente un significato più grande di ciò che si vede'], ['Sacro', 'Ciò che una comunità riconosce in relazione al divino e distingue dall’uso ordinario'], ['Profano', 'Ciò che sta fuori dal recinto sacro: l’ambito comune'], ['Liturgia', '«Opera del popolo»: la preghiera pubblica della Chiesa'], ['Stele', 'Pietra eretta come segno e memoria']],
    memory: [['Betel', '«Casa di Dio»'], ['Shabbat', 'Settimo giorno'], ['Domenica', 'Giorno del Signore'], ['Montecassino', 'La Regola'], ['Nicea', 'Primo concilio'], ['Sýmbolon', 'Segno di riconoscimento']],
    abbina: [['Segnale', 'La freccia dell’uscita'], ['Simbolo', 'La bandiera della squadra'], ['Luogo sacro', 'La pietra di Betel'], ['Tempo sacro', 'La domenica']],
    cat: { bins: ['Fatto attestato', 'Giudizio'], items: [['Gregorio Magno scrive i Dialoghi nel 593–594', 0], ['Il monachesimo ha salvato la cultura europea', 1], ['La Regola ha 73 capitoli', 0], ['Benedetto è il più grande legislatore della storia', 1], ['Costantino regola il riposo nel «giorno del Sole» nel 321', 0], ['La domenica è il giorno più bello della settimana', 1]] },
    seq: [{ t: 'Libertà di culto ai cristiani (Milano)', y: '313' }, { t: 'Costantino: riposo nel «giorno del Sole»', y: '321' }, { t: 'Concilio di Nicea', y: '325' }, { t: 'Benedetto scrive la Regola a Montecassino', y: 'c. 530' }, { t: 'Sinodi di Aquisgrana: la Regola per l’impero', y: '816–817' }],
    completa: { testo: 'Un {segno} rimanda a qualcos’altro; un {simbolo} rende presente un significato più grande. {Sacro} è ciò che una comunità distingue dall’uso ordinario; {profano} è ciò che sta fuori dal recinto sacro.', extra: ['segnale', 'magico'] },
    cruci: { rows: 5, cols: 5, words: [
      { n: 1, dir: 'o', r: 0, c: 0, w: 'SACRO', clue: 'Ciò che una comunità riconosce in relazione al divino' },
      { n: 1, dir: 'v', r: 0, c: 0, w: 'SEGNO', clue: 'Rimanda a qualcos’altro: il fumo lo è del fuoco' },
      { n: 2, dir: 'v', r: 0, c: 2, w: 'CROCE', clue: 'Il segno cristiano per eccellenza' },
      { n: 3, dir: 'o', r: 4, c: 0, w: 'ORE', clue: 'Le preghiere che scandiscono la giornata del monaco: Liturgia delle…' }
    ] },
    sfida: [
      { q: 'Che cosa cambia la pietra di Giacobbe in una stele?', a: ['Il suo peso', 'L’incontro con Dio e il gesto che lo ricorda', 'Il nome della città', 'La luce del mattino'], ok: 1 },
      { q: 'Che cosa significa «profano»?', a: ['Cattivo', 'Fuori dal recinto sacro', 'Antico', 'Nascosto'], ok: 1 },
      { q: 'Da dove viene la parola «domenica»?', a: ['Dal sole', 'Da dominus, «Signore»', 'Da domus, «casa»', 'Da «dieci»'], ok: 1 },
      { q: 'Quanti capitoli ha la Regola di Benedetto?', a: ['12', '40', '73', '150'], ok: 2 }
    ],
    sondaggio: [{ q: 'Secondo voi, un luogo può essere sacro anche per chi non crede?', a: ['Sì, per rispetto di chi crede', 'No: sacro è solo per chi crede', 'Dipende dal luogo', 'Non so'], dibattito: 'Che cosa fate entrando in una chiesa, anche solo per visitarla?' }],
    rifl: { domanda: 'Un oggetto che per te «dice più di ciò che è»: quale, e perché?', poli: ['Un ricordo', 'Un’appartenenza', 'Una fede'], spunto: 'Descrivi l’oggetto, poi il contesto che gli dà significato…' }
  }
};
