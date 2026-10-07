/* ---- lezione ---- */
/* Classe III · Accoglienza (UDA 0) · Lezione 1 — «Il mazzo dell'estate».
   Artefatto interattivo rifatto il 7 ottobre 2026 con la skill «IRC · Artefatto interattivo della lezione»
   (kit Lab IRC definitivo, 5 ottobre 2026). Contenuti: mazzo dell'estate e mappa dell'anno «Chi l'ha deciso?»
   del docente (versione del 4 ottobre 2026), riordinati in 10 scene da 50 minuti.
   Etimologie: Vocabolario Treccani (voci consultate attraverso i risultati di ricerca del 7 ottobre 2026; vedi note del docente).
   Nessun dato viene raccolto, salvato o trasmesso: carte, voti e parole restano solo nella pagina aperta.
   © Matteo Sestili — Tutti i diritti riservati */
window.LEZIONE = {
  slug: 'iii-0-1-accoglienza-il-mazzo-dell-estate',
  classe: 'Anno III',
  titolo: 'Il *mazzo* dell’estate',
  sottotitolo: 'Ventiquattro carte per raccontarsi, una domanda per tutto l’anno: chi l’ha deciso?',
  saluto: 'Ultima carta: vale per tutti. La rileggiamo a metà anno.',

  glossario: {
    'accoglienza': { parola: 'Accoglienza', etim: 'da *accogliere*, dal latino *accolligere*, composto di *ad-* e *colligere*, «raccogliere»', def: 'Il modo in cui si riceve qualcuno: le parole, i gesti, il tempo che gli si dedica. Oggi è il primo passo dell’anno: raccogliere ciò che ciascuno porta con sé.' },
    'talenti': { parola: 'Talenti', etim: 'dal latino *talentum*, dal greco *tálanton*: in origine un’unità di peso e di moneta. Il senso di «dote» viene dalla parabola evangelica dei talenti (Mt 25,14-30)', def: 'L’ultima tappa dell’anno, sei ore: in gruppo, ognuno mette in gioco davanti a un pubblico ciò che sa fare, con una griglia di valutazione nota in anticipo.' },
    'verifica rovesciata': { parola: 'Verifica rovesciata', def: 'Un’ora, a metà anno, in cui le domande le fanno gli studenti e risponde chi insegna: che cosa ha funzionato, che cosa no, che cosa cambiamo. Le attese di oggi si rileggono quel giorno.' },
    'vizi capitali': { parola: 'Vizi capitali', etim: '*vizio* dal latino *vitium*, «difetto»; *capitale* dal latino *capitalis*, da *caput*, «testa»', def: 'Sette, nella tradizione cristiana. Sono «capitali» perché sono la testa, cioè l’origine, di altri vizi; e sono vizi perché sono abitudini, non gesti isolati.' },
    'obiezione di coscienza': { parola: 'Obiezione di coscienza', etim: '*coscienza* dal latino *conscientia*, da *conscire*, «essere consapevole» (*cum* + *scire*, «sapere»)', def: 'Il rifiuto di eseguire un ordine o una legge che la propria coscienza giudica ingiusti. Nella tappa 4 vediamo da dove viene l’idea che chi comanda non sia l’ultima parola.' },
    'regola': { parola: 'Regola', etim: 'dal latino *regula*, «assicella, regolo», da *regere*, «guidare diritto»', def: 'In origine un’asta per tracciare linee diritte; poi una norma. La Regola di Benedetto (VI secolo) è il testo che ordina la vita di una comunità di monaci.' },
    'monastero': { parola: 'Monastero', etim: 'dal latino tardo *monasterium*, dal greco *monastḗrion*, da *monázō*, «vivere da solo» (*mónos*, «solo»)', def: 'In origine la dimora di un monaco; poi la casa stabile di una comunità che vive insieme sotto una regola. Il nome ricorda il solitario; la Regola di Benedetto organizza invece una vita comune.' },
    'università': { parola: 'Università', etim: 'dal latino *universitas*, «totalità»; nel Medioevo «corporazione, comunità»', def: 'In origine non un edificio, ma una comunità: maestri e studenti riuniti in corporazione. A Bologna, alla fine del XII secolo, nasce così la prima università d’Europa.' },
    'argomento': { parola: 'Argomento', etim: 'dal latino *argumentum*, da *arguere*, «dimostrare»', def: 'Ciò che si porta a sostegno di quanto si afferma: una ragione, una prova. Nel patto della classe, il dissenso è benvenuto se ha un argomento.' },
    'fonte': { parola: 'Fonte', etim: 'dal latino *fons, fontis*, «sorgente»', def: 'Il punto da cui viene un’informazione: un testo, un documento, un dato. «Come lo sappiamo?» significa: qual è la fonte?' }
  },

  scene: [
    /* 1 · Aggancio: l'ora di oggi e la domanda d'ingresso (anello 1) */
    { fase: 'Aggancio', momento: 'Apertura', minuti: 3, titolo: 'Bentornati: *ventiquattro* carte',
      lead: 'Tre mesi senza vederci. Un’ora di {accoglienza}: prima un mazzo per raccontarci, poi la domanda che ci terrà compagnia fino a giugno.',
      blocchi: [
        { tipo: 'agenda', titolo: 'L’ora di oggi' },
        { tipo: 'domanda', id: 'ingresso', etichetta: 'Prima domanda · per alzata di mano',
          q: 'Una scuola con orari e voti, un pronto soccorso, la domenica libera: secondo voi, da dove vengono?',
          opzioni: ['Ci sono sempre state', 'Sono naturali: ogni società ci arriva', 'Qualcuno le ha decise, in un tempo preciso', 'Non me lo sono mai chiesto'],
          dibattito: 'Teniamo i voti. A fine ora rifaremo la stessa domanda: nessuna risposta è sbagliata, conta la ragione.' }
      ] },

    /* 2 · Attività: il mazzo dell'estate (conoscersi) */
    { fase: 'Attività', momento: 'Il mazzo', minuti: 13, titolo: 'Pesca una *carta*',
      lead: 'Scegli un seme, rispondi a voce in quaranta secondi. «Passo» si può dire una volta sola. Comincia chi insegna.',
      blocchi: [
        { tipo: 'custom', nome: 'Mazzo', props: {} }
      ] },

    /* 3 · Scoperta: natura o decisione? (anelli 2-3, equivoco «è sempre stato così») */
    { fase: 'Scoperta', momento: 'La domanda', minuti: 5, titolo: 'Natura o *decisione*?',
      lead: 'Nel mazzo c’era una carta: «Una cosa che fai tutti i giorni e di cui non sai chi l’ha inventata». Proviamo a distinguere.',
      blocchi: [
        { tipo: 'smista', titolo: 'Viene dalla natura, o qualcuno l’ha deciso?', categorie: ['Viene dalla natura', 'Qualcuno l’ha deciso'],
          voci: [
            { t: 'Avere sonno la sera', c: 0, why: 'È il corpo: nessuno l’ha stabilito. A che ora si va a letto, invece, dipende anche da noi.' },
            { t: 'Entrare a scuola alle otto', c: 1, why: 'Un orario si fissa: qualcuno l’ha scelto, e altrove la campanella suona a un’altra ora.' },
            { t: 'Un pronto soccorso che cura anche chi non può pagare', c: 1, why: 'Curare chiunque non è un istinto: è una scelta, che ha una storia e qualcuno che l’ha voluta.' },
            { t: 'Avere fame', c: 0, why: 'Natura. Ma colazione, pranzo e cena a orari fissi sono già una decisione.' },
            { t: 'La domenica libera per legge', c: 1, why: 'Nel 321 una legge dell’imperatore Costantino ferma tribunali e mestieri cittadini nel «giorno del sole»: una decisione con una data.' },
            { t: 'Un titolo di studio che vale anche lontano da dove l’hai preso', c: 1, why: 'Nel Medioevo alcune università ottengono il diritto di dare la licenza di insegnare «ovunque»: qualcuno l’ha stabilito.' }
          ],
          chiusura: 'Ciò che usiamo ogni giorno sembra natura. Spesso è una decisione, con una data e un nome.' },
        { tipo: 'etimo', parola: 'decidere', etichetta: 'Da dove viene la parola · toccate le parti', battuta: 'Chi decide taglia via: per questo si poteva fare diversamente.',
          parti: [{ t: 'de-', d: 'latino: «via da»' }, { t: 'caedere', d: '«tagliare»' }, { t: 'decīdere', d: '«tagliar via»' }], nessi: ['+', '→'],
          spiegazione: 'Chi **decide** taglia via le altre strade e ne lascia una. Per questo una decisione si poteva prendere **diversamente**: e chiedersi chi l’ha presa è il primo passo per capirla.',
          etim: 'dal latino *decīdere*, «tagliar via», composto di *de-* e *caedere*, «tagliare»', def: 'Scegliere una possibilità scartando le altre.' }
      ] },

    /* 4 · Scoperta: la catena dell'anno (concetto più difficile) */
    { fase: 'Scoperta', momento: 'Spiegazione', minuti: 4, titolo: 'Chi l’ha *deciso*?',
      lead: 'Avete sedici anni: è l’età in cui cominciate a decidere voi. E in cui scoprite quante cose erano già state decise prima che nasceste.',
      blocchi: [
        { tipo: 'catena', titolo: 'Dalla carta alla domanda dell’anno', iniziali: 1, rottura: true,
          anelli: [
            { t: 'Usiamo ogni giorno cose che non abbiamo scelto', d: 'Orari, ospedali, titoli di studio, regole per chi comanda.', senza: 'Senza queste cose non ci sarebbe niente da chiedere: ma ci sono, ogni giorno.' },
            { nesso: 'Per questo', t: 'Diventano invisibili e sembrano naturali', d: 'Nessuno chiede più chi le ha inventate: la carta del mazzo lo ha mostrato.', senza: 'Se le notassimo sempre, la domanda sarebbe già fatta.' },
            { nesso: 'Eppure', t: 'Hanno una data, un luogo, qualcuno che le ha decise', d: '*Decidere*: tagliar via le altre strade.', senza: 'Senza questo anello resta «è sempre stato così»: e non c’è niente da capire.' },
            { nesso: 'Per questo', t: 'Si potevano decidere diversamente', d: 'Capire perché sono state decise così serve anche a chi, da ora, decide.', senza: 'Senza alternative, la storia sarebbe solo un elenco di date.' },
            { nesso: 'E spesso', t: 'Sono nate anche da idee cristiane', d: 'Monastero, università, ospedale, limiti al potere: in Europa fra tarda antichità e Medioevo, insieme a fattori economici e politici.', senza: 'Senza questo anello sapremmo che qualcuno ha deciso, ma non in nome di che cosa.' },
            { nesso: 'Quindi', t: 'La domanda dell’anno: chi l’ha deciso?', d: 'Sei tappe, una domanda, fino a giugno.' }
          ],
          fine: 'Chi l’ha deciso? Ce lo chiederemo a ogni tappa.' },
        { tipo: 'aggancio', etichetta: 'Con onestà', titolo: 'Non una causa unica',
          t: 'Dire che un’istituzione nasce «in ambiente cristiano» non significa che sia esistita solo grazie al cristianesimo: hanno pesato anche l’eredità greca e romana, le città, i commerci, i re. E quegli stessi secoli hanno avuto le loro ombre: le guarderemo senza sconti.' }
      ] },

    /* 5 · Scoperta: la mappa dell'anno */
    { fase: 'Scoperta', momento: 'La mappa', minuti: 6, titolo: 'Ventotto ore, *sei* tappe',
      lead: 'Un’ora a settimana. Ogni tappa dura circa un mese, comincia con una domanda e dice in anticipo **a che cosa vi serve**. Scegliete voi quale aprire.',
      blocchi: [
        { tipo: 'tappe', titolo: 'Le sei tappe', aperta: 0, voci: [
          { data: 'Tappa 1', breve: 'Storia', titolo: 'Chi ha costruito il mondo in cui vivi?',
            testo: 'Si comincia da un {monastero} che si dà una {regola} scritta, quella di Benedetto (VI secolo), poi le prime {università|università}; e ancora un ospedale che cura chiunque, una guerra con delle regole. Nessuna di queste cose è sempre esistita. **A che cosa vi serve:** accorgervi che quasi niente di ciò che usate era obbligatorio.' },
          { data: 'Tappa 2', breve: 'Teologia', titolo: 'Perché fai cose che non vuoi fare?',
            testo: 'I sette {vizi capitali} non sono una lista di peccatucci: descrivono come un gesto ripetuto diventa abitudine, e un’abitudine carattere. Con un dipinto del 1933, *I sette peccati capitali* di Otto Dix. **A che cosa vi serve:** la differenza fra «sono fatto così» e «ho preso un’abitudine». Solo la seconda si può cambiare.' },
          { data: 'Tappa 3', breve: 'Filosofia', titolo: 'È da stupidi credere?',
            testo: 'Quante delle cose che sapete per certe le avete verificate di persona? Quattro modi di essere sicuri: dimostrazione, esperimento, testimonianza, fiducia. **A che cosa vi serve:** sapere di quali {fonte|fonti} vi fidate e perché. Vale per un professore, per un video e per una macchina che risponde a tutto.' },
          { data: 'Metà anno', breve: 'A metà strada', titolo: 'La verifica rovesciata',
            testo: 'Un’ora intera in cui le domande le fate voi e rispondo io: che cosa ha funzionato, che cosa no, che cosa cambiamo. Le attese di oggi le rileggiamo quel giorno.' },
          { data: 'Tappa 4', breve: 'Politica e coscienza', titolo: 'C’è un ordine che non devi eseguire?',
            testo: 'Canossa, gennaio 1077: un re aspetta tre giorni nella neve davanti a una porta chiusa. Da lì passa l’idea che chi comanda non sia l’ultima parola, fino all’{obiezione di coscienza}. **A che cosa vi serve:** un motivo per dire no che regga anche quando tutti intorno dicono sì.' },
          { data: 'Tappa 5', breve: 'Bibbia', titolo: 'Chi sei quando nessuno ti guarda?',
            testo: 'Una carta del mazzo chiedeva come vi chiamano gli amici e come vi chiamano in famiglia. Quattro testi biblici fanno la stessa domanda, più sul serio: fra questi un uomo che lotta tutta la notte e riceve un nome nuovo. **A che cosa vi serve:** distinguere ciò che gli altri registrano di voi da ciò che siete.' },
          { data: 'Tappa 6', breve: 'Sei ore · fine anno', titolo: 'Talenti',
            testo: 'Sei ore a fine anno: in gruppo, ognuno mette in gioco davanti a un pubblico ciò che sa fare. Nel mazzo c’era già una carta che lo chiedeva. **A che cosa vi serve:** cominciare a pensarci oggi, non a maggio. L’anticipo è ciò che permette di scegliere davvero.' }
        ] },
        { tipo: 'aggancio', etichetta: 'Per capire', titolo: 'Il nome del laboratorio',
          t: 'Il Lab IRC è intitolato a san Carlo Acutis (1991-2006). Morto a quindici anni, aveva messo la sua passione per l’informatica al servizio di un sito sui miracoli eucaristici nel mondo. È stato canonizzato il 7 settembre 2025: un talento usato per gli altri, come chiede l’ultima tappa.',
          fonte: 'Sala Stampa della Santa Sede, Bollettino del 7 settembre 2025' }
      ] },

    /* 6 · Scoperta: come si lavora e come si valuta (equivoco «si valuta la fede») */
    { fase: 'Scoperta', momento: 'Il metodo', minuti: 4, titolo: 'Come si lavora, che cosa si *valuta*',
      lead: 'Quattro strumenti per l’anno. Giratele, poi una domanda secca.',
      blocchi: [
        { tipo: 'carte', titolo: 'Quattro strumenti', carte: [
          { etichetta: 'Si fa', fronte: 'Lezione interattiva', retro: 'In aula alla LIM; a casa si riapre dal telefono, con il testo di studio da scaricare.' },
          { etichetta: 'Si legge', fronte: 'Fascicolo', retro: 'Da leggere a casa: si sottolinea, si rilegge, si porta in classe.' },
          { etichetta: 'A fine tappa', fronte: 'Verifica', retro: 'Cinquanta domande in quarantacinque minuti, sulla piattaforma della classe.' },
          { etichetta: 'A fine anno', fronte: 'Talenti', retro: 'Sei ore in gruppo, con una griglia di valutazione che conoscete in anticipo.' }
        ] },
        { tipo: 'verifica', etichetta: 'Verifica lampo', q: 'In quest’ora, che cosa viene valutato?',
          opzioni: ['Quanto credete', 'Se siete d’accordo con chi insegna', 'Solo il compito di fine anno', 'Ciò che capite e come lo argomentate'], ok: 3,
          why: 'Contano la partecipazione (le domande valgono quanto le risposte), le verifiche di fine tappa e i {Talenti|talenti}. **Nessuno è valutato per ciò che crede**: tutti per ciò che capiscono e per come lo argomentano.' }
      ] },

    /* 7 · Attività: il patto */
    { fase: 'Attività', momento: 'Il patto', minuti: 3, titolo: 'Tre regole, *anche* per me',
      lead: 'Le domande che di solito non si fanno il primo giorno. Apritele una alla volta.',
      blocchi: [
        { tipo: 'dubbi', titolo: 'Il patto della classe', voci: [
          { q: 'Se chi insegna dice una cosa, devo crederci?', r: 'No. **Ogni affermazione ha una {fonte}**: chiedere «come lo sappiamo?» è sempre legittimo, anche verso chi insegna.' },
          { q: 'Posso non essere d’accordo?', r: 'Sì. **Si può dissentire, purché con argomenti**: un {argomento} è una ragione che si porta, non un’impressione.' },
          { q: 'Devo credere per andare bene in religione?', r: 'No. **Nessuno qui è obbligato a credere; tutti sono invitati a capire.** La fede cattolica si presenta con le sue ragioni; la valutazione riguarda la comprensione.' },
          { q: 'E se a sbagliare è chi insegna?', r: 'Le tre regole valgono anche per me: una fonte sbagliata si corregge, davanti a tutti.' }
        ], fine: 'Tre regole: valgono per chi impara e per chi insegna.' },
        { tipo: 'aggancio', etichetta: 'Tra sette giorni', titolo: 'Una regola di millecinquecento anni fa',
          t: 'Si parte da un {monastero}: una comunità che si dà una {regola} scritta, quella di Benedetto da Norcia. Che cosa c’entra con il tempo, il silenzio e i telefoni? Chi l’ha decisa, e perché?' }
      ] },

    /* 8 · Pausa gioco: Sfida a squadre (ripasso di tutto ciò che è stato presentato) */
    { fase: 'Attività', momento: 'Pausa gioco', minuti: 6, titolo: 'Sfida a *squadre*',
      testo: 'Due squadre, dieci domande su ciò che abbiamo appena visto: la domanda dell’anno, le tappe, il patto. Chi sbaglia lascia la domanda all’altra squadra, che può rubarla.',
      blocchi: [
        { tipo: 'gioco', id: 'sfida', titolo: 'Sfida a squadre', testo: 'Nomi di squadra collettivi, venti secondi per rispondere e dieci per rubare. Poi si torna qui.', pulsante: 'Si gioca' },
        { tipo: 'rivela', titolo: 'Al ritorno', iniziali: 1, pulsante: 'Altra domanda', passi: [
          { titolo: 'La più discussa', testo: 'Quale domanda ha diviso di più le squadre, e perché?' },
          { titolo: 'La tappa più attesa', testo: 'Quale tappa vi incuriosisce di più? Una ragione, non un voto.' }
        ] }
      ] },

    /* 9 · Chiusura: prova breve su casi nuovi */
    { fase: 'Chiusura', momento: 'Prova', minuti: 3, titolo: 'Avete *capito* le regole del gioco?',
      lead: 'Quattro domande rapide: la classe sceglie, chi insegna tocca.',
      blocchi: [
        { tipo: 'quiz', etichetta: 'Prova breve', perfetto: 'Quattro su quattro: conoscete la domanda, la mappa e il patto.',
          domande: [
            { q: 'Nel 321 una legge di Costantino ferma tribunali e mestieri nel «giorno del sole». Che cosa ci dice?', opzioni: ['Che il riposo della domenica è un fatto di natura', 'Che il riposo della domenica è stato deciso, con una data e un autore', 'Che Costantino ha inventato la settimana'], ok: 1,
              why: 'Il riposo in un giorno fisso è una decisione: ha una data (321) e un autore. La settimana di sette giorni, invece, esisteva già.' },
            { q: '«Decidere» viene dal latino *decīdere*, «tagliar via». Perché conta per la domanda dell’anno?', opzioni: ['Perché chi decide scarta altre strade: si poteva fare diversamente', 'Perché ogni decisione è violenta', 'Perché decidere è compito solo di chi comanda'], ok: 0,
              why: 'Se si poteva decidere diversamente, ha senso chiedersi chi ha deciso e in nome di che cosa.' },
            { q: 'Durante una lezione non sei d’accordo con chi insegna. Secondo il patto…', opzioni: ['Devi tacere', 'Puoi dissentire, con un argomento', 'Basta dire che non ti convince', 'Perdi punti nella valutazione'], ok: 1,
              why: 'Il dissenso è benvenuto se porta una ragione: un argomento, da *arguere*, «dimostrare».' },
            { q: 'Quale di queste frasi descrive la valutazione di quest’anno?', opzioni: ['Chi crede ha un voto più alto', 'Conta solo la presenza', 'Si valuta ciò che capisci e come lo argomenti, non ciò che credi'], ok: 2,
              why: 'Partecipazione, verifiche di fine tappa e Talenti: nessuno è valutato per ciò che crede.' }
          ] }
      ] },

    /* 10 · Chiusura: ritorno alla domanda e carta dell'anno */
    { fase: 'Chiusura', momento: 'La carta dell’anno', minuti: 3, titolo: 'La *carta* dell’anno',
      testo: '**La risposta di oggi:** ciò che usiamo ogni giorno sembra natura, ma spesso è una decisione, con una data e un nome. Chi l’ha deciso, e perché? È la domanda dell’anno.',
      blocchi: [
        { tipo: 'domanda', id: 'uscita', confronta: 'ingresso', etichetta: 'La stessa domanda dell’inizio',
          q: 'Una scuola con orari e voti, un pronto soccorso, la domenica libera: secondo voi, da dove vengono?',
          opzioni: ['Ci sono sempre state', 'Sono naturali: ogni società ci arriva', 'Qualcuno le ha decise, in un tempo preciso', 'Non me lo sono mai chiesto'],
          dibattito: 'Il tratteggio d’oro è il voto d’inizio. Se qualcuno ha cambiato idea, che cosa l’ha convinto? Nessun punteggio: conta la ragione.' },
        { tipo: 'nuvola', id: 'carta-anno', q: 'Una carta sola, per tutti: una cosa che vorresti decidere tu, quest’anno.',
          istruzione: 'Un giro rapido, senza commento: una parola chiave a testa. Va alla lavagna e la rileggiamo alla verifica rovesciata.' }
      ] }
  ],

  studio: {
    sezioni: [
      { titolo: 'La domanda dell’anno',
        testo: 'Ogni giorno usiamo cose che non abbiamo scelto: l’orario della scuola, un pronto soccorso che cura anche chi non può pagare, un titolo di studio riconosciuto lontano da dove l’abbiamo preso, la domenica libera, l’idea che chi comanda debba rispettare delle regole. **Per questo** diventano invisibili e sembrano naturali: nessuno si chiede più chi le abbia inventate. **Eppure** quasi nessuna di queste cose è sempre esistita. Ognuna ha una data, un luogo e qualcuno che l’ha decisa.\n\nLa parola lo dice già. *Decidere* viene dal latino *decīdere*, «tagliar via», composto di *de-* e *caedere*, «tagliare»: chi decide sceglie una strada e taglia via le altre. **Per questo** ogni decisione si poteva prendere diversamente, e chiedersi chi l’ha presa, e perché, è il primo passo per capirla. A sedici anni la domanda riguarda anche voi: è l’età in cui si comincia a decidere da soli, e conviene sapere che cosa è stato deciso prima.\n\nMolte delle decisioni che studieremo hanno preso forma in Europa fra la tarda antichità e il Medioevo, e spesso a partire da idee cristiane: il valore di chi non può restituire nulla, una vita comune ordinata da una regola, il sapere cercato insieme, il limite posto al potere. Non sono nate *solo* dal cristianesimo: hanno pesato anche l’eredità greca e romana, le città, i commerci, le scelte dei re. E gli stessi secoli hanno avuto le loro ombre, che guarderemo senza sconti. La domanda dell’anno è quindi una sola: **chi l’ha deciso?**' },
      { titolo: 'Il mazzo dell’estate',
        testo: 'L’anno comincia con un’ora di accoglienza. *Accogliere* viene dal latino *accolligere*, composto di *ad-* e *colligere*, «raccogliere»: prima di cominciare il percorso si raccoglie ciò che ciascuno porta con sé dall’estate.\n\nIl mazzo ha ventiquattro carte in quattro semi. **Estate**: una parola, una prima volta, un luogo, una canzone, una persona. **Attese**: che cosa cambiare rispetto all’anno scorso, che cosa si sa fare, che cosa ci si aspetta da quest’ora. **Domande**: un’abitudine, una cosa che tutti danno per vera, un nome. **Sfide**: due verità e una bugia, il titolo del film della propria estate. Si risponde a voce in quaranta secondi; «passo» vale una volta sola; comincia chi insegna. Una carta del seme Domande è il ponte verso il resto dell’ora: «Una cosa che fai tutti i giorni e di cui non sai chi l’ha inventata». Quasi nessuno sa rispondere, ed è normale: è proprio la domanda dell’anno.' },
      { titolo: 'Le sei tappe',
        testo: 'Ventotto ore, un’ora a settimana. Ogni tappa dura circa un mese, comincia con una domanda e dice in anticipo a che cosa serve.\n\n**1. Chi ha costruito il mondo in cui vivi?** (Storia). Si comincia da un **monastero**: una comunità che si dà una **regola** scritta, quella di Benedetto da Norcia, nel VI secolo. *Monastero* viene dal greco *monastḗrion*, da *monázō*, «vivere da solo»; *regola* dal latino *regula*, «assicella, regolo», da *regere*, «guidare diritto». Poi le prime **università**: *universitas* era, nel Medioevo, la corporazione di maestri e studenti, e a Bologna, alla fine del XII secolo, nasce così la prima università d’Europa. E ancora un ospedale che cura chiunque, una guerra con delle regole. *A che cosa serve:* accorgersi che quasi niente di ciò che usiamo era obbligatorio.\n\n**2. Perché fai cose che non vuoi fare?** (Teologia). I sette **vizi capitali** descrivono come un gesto ripetuto diventa abitudine e un’abitudine carattere. *Vizio* viene dal latino *vitium*, «difetto»; *capitale* da *caput*, «testa»: sono la testa, cioè l’origine, di altri vizi. Con un dipinto del 1933, *I sette peccati capitali* di Otto Dix. *A che cosa serve:* la differenza fra «sono fatto così» e «ho preso un’abitudine».\n\n**3. È da stupidi credere?** (Filosofia). Quattro modi di essere sicuri di qualcosa: dimostrazione, esperimento, testimonianza, fiducia. Quasi tutto ciò che sappiamo poggia sulla testimonianza di qualcuno. *A che cosa serve:* sapere di quali fonti ci si fida e perché.\n\nA metà anno, la **verifica rovesciata**: un’ora in cui le domande le fanno gli studenti e risponde chi insegna.\n\n**4. C’è un ordine che non devi eseguire?** (Politica e coscienza). Canossa, gennaio 1077: il re Enrico IV aspetta tre giorni nella neve davanti alla porta chiusa del castello dove si trova papa Gregorio VII. Da qui passa l’idea che il potere politico non sia l’ultima parola, fino all’**obiezione di coscienza** (*coscienza* dal latino *conscientia*, da *conscire*, «essere consapevole»). *A che cosa serve:* un motivo per dire no che regga anche quando tutti dicono sì.\n\n**5. Chi sei quando nessuno ti guarda?** (Bibbia). Quattro testi sul nome e sull’identità, fra cui un uomo che lotta una notte intera e riceve un nome nuovo. *A che cosa serve:* distinguere ciò che gli altri registrano di te da ciò che sei.\n\n**6. Talenti** (sei ore, a fine anno). In gruppo, ognuno mette in gioco davanti a un pubblico ciò che sa fare. *Talento* viene dal latino *talentum*, dal greco *tálanton*, un’unità di peso e di moneta: il senso di «dote» nasce dalla parabola evangelica dei talenti (Mt 25,14-30). Il laboratorio porta il nome di san Carlo Acutis (1991-2006), che a quindici anni aveva messo la sua passione per l’informatica al servizio di un sito sui miracoli eucaristici, canonizzato il 7 settembre 2025. Si comincia a pensarci da oggi: l’anticipo è ciò che rende possibile una scelta vera.' },
      { titolo: 'Come si lavora e come si valuta',
        testo: 'Ogni lezione ha la sua **lezione interattiva**, che si usa in aula alla LIM e si riapre dal telefono con il testo di studio da scaricare, e il suo **fascicolo**, da leggere a casa, sottolineare e rileggere. A fine tappa c’è una **verifica**: cinquanta domande in quarantacinque minuti, sulla piattaforma della classe. A fine anno, i **Talenti**, con una griglia di valutazione che si conosce in anticipo.\n\nContano tre cose: come si partecipa (le domande valgono quanto le risposte), le verifiche di fine tappa e i Talenti. **Nessuno è valutato per ciò che crede**; tutti per ciò che capiscono e per come lo argomentano.' },
      { titolo: 'Il patto',
        testo: 'Tre regole, che valgono per chi impara e per chi insegna.\n\n**Ogni affermazione ha una fonte.** *Fonte* viene dal latino *fons*, «sorgente»: è il punto da cui viene un’informazione. Chiedere «come lo sappiamo?» è sempre legittimo, anche verso chi insegna; e una fonte sbagliata si corregge, davanti a tutti.\n\n**Si può dissentire, purché con argomenti.** *Argomento* viene dal latino *argumentum*, da *arguere*, «dimostrare»: è una ragione che si porta a sostegno di ciò che si afferma, non un’impressione.\n\n**Nessuno qui è obbligato a credere; tutti sono invitati a capire.** La fede cattolica si presenta dall’interno, con le ragioni che la sostengono; ciascuno resta libero.' },
      { titolo: 'La carta dell’anno',
        testo: 'L’ora si chiude con una carta che vale per tutti: **una cosa che vorresti decidere tu, quest’anno.** Un giro rapido, una parola chiave a testa, senza commento. Le parole vanno alla lavagna e si rileggono alla verifica rovesciata, a metà anno.\n\nLa prossima ora si parte dalla prima tappa: un monastero, una regola scritta millecinquecento anni fa, e la domanda di sempre. Chi l’ha decisa, e perché?' },
      { titolo: 'Per lo studio',
        testo: '1. Scegli una cosa che usi ogni giorno e che non viene dalla natura. Prova a dire chi potrebbe averla decisa, e che cosa avrebbe potuto decidere diversamente.\n\n2. Spiega con l’etimologia di *decidere* perché ha senso chiedersi «chi l’ha deciso?».\n\n3. Perché dire che un’istituzione è nata in ambiente cristiano non significa che sia nata solo grazie al cristianesimo?\n\n4. Quale delle sei tappe ti incuriosisce di più? Scrivi la sua domanda e a che cosa, secondo te, potrebbe servirti.' },
      { titolo: 'La risposta',
        testo: 'Le cose che usiamo ogni giorno sembrano naturali perché sono diventate invisibili. In realtà molte sono decisioni: hanno una data, un luogo, qualcuno che ha scelto una strada e ne ha tagliate via altre. Molte di queste decisioni sono maturate in Europa anche a partire da idee cristiane, insieme ad altri fattori. Quest’anno, tappa dopo tappa, ci chiederemo chi le ha prese e perché: con le fonti, con gli argomenti e nella libertà di ciascuno.' }
    ],
    fonti: [
      'Mazzo dell’estate e mappa dell’anno «Chi l’ha deciso?»: materiali del docente per la classe III (Matteo Sestili).',
      '*Vocabolario Treccani*, voci «decidere», «accogliere», «talento», «vizio», «capitale», «coscienza», «regola», «monastero», «universitas», «argomento», «fonte» (treccani.it, consultate il 7 ottobre 2026).',
      'Costantino, legge del 7 marzo 321 sul riposo nel giorno del sole: *Codex Iustinianus* III,12,2.',
      'Canossa (gennaio 1077): Gregorio VII, lettera ai principi tedeschi, *Registrum* IV,12.',
      'Otto Dix, *I sette peccati capitali* (1933), Staatliche Kunsthalle Karlsruhe.',
      'Sala Stampa della Santa Sede, Bollettino del 7 settembre 2025 (canonizzazione di Carlo Acutis): press.vatican.va.',
      'Bibbia CEI 2008, Mt 25,14-30 (parabola dei talenti).'
    ]
  },

  giochi: {
    tema: 'Il mazzo dell’estate — Chi l’ha deciso?',
    sfida: [
      { q: 'Qual è la domanda dell’anno?', a: ['È da stupidi credere?', 'Chi l’ha deciso?', 'Che cosa è vero?', 'Di chi mi posso fidare?'], ok: 1 },
      { q: 'Da quale verbo latino viene «decidere»?', a: ['decīdere, «tagliar via»', 'dicere, «dire»', 'docere, «insegnare»', 'ducere, «guidare»'], ok: 0 },
      { q: 'Quale di queste cose è stata decisa da qualcuno?', a: ['Avere sonno', 'Avere fame', 'Sentire freddo', 'La domenica libera per legge'], ok: 3 },
      { q: 'Con quale tappa comincia l’anno?', a: ['Bibbia', 'Talenti', 'Storia: chi ha costruito il mondo in cui vivi?', 'Filosofia'], ok: 2 },
      { q: 'Che cos’è la verifica rovesciata?', a: ['Una verifica con le risposte al contrario', 'Un’ora in cui le domande le fanno gli studenti e risponde chi insegna', 'Una verifica senza voto, a sorpresa', 'Il compito delle vacanze'], ok: 1 },
      { q: 'Che cosa si valuta in quest’ora?', a: ['Quanto credete', 'Se siete d’accordo con chi insegna', 'Solo la presenza', 'Ciò che capite e come lo argomentate'], ok: 3 },
      { q: 'Secondo il patto, chi può chiedere «come lo sappiamo?»', a: ['Solo chi insegna', 'Solo chi crede', 'Tutti, anche verso chi insegna', 'Nessuno'], ok: 2 },
      { q: '«Talento», prima di indicare una dote, era…', a: ['un’unità di peso e di moneta', 'un attrezzo agricolo', 'un titolo nobiliare', 'una danza greca'], ok: 0 },
      { q: 'Canossa, 1077: un re aspetta tre giorni davanti a una porta chiusa. In quale tappa?', a: ['Teologia', 'Politica e coscienza', 'Bibbia', 'Filosofia'], ok: 1 },
      { q: 'Quale tappa chiude l’anno, con sei ore in gruppo?', a: ['Storia', 'Teologia', 'Bibbia', 'Talenti'], ok: 3 }
    ],
    vf: [
      { s: 'Le cose che usiamo ogni giorno vengono quasi tutte dalla natura.', v: false, why: 'Orari, ospedali, titoli di studio, la domenica libera: sono decisioni, con una data e qualcuno che le ha prese.' },
      { s: '«Decidere» significa, alla lettera, «tagliar via».', v: true, why: 'Dal latino *decīdere*, composto di *de-* e *caedere*, «tagliare».' },
      { s: 'In religione ha un voto più alto chi crede.', v: false, why: 'Nessuno è valutato per ciò che crede: si valuta ciò che si capisce e come lo si argomenta.' },
      { s: 'Si può dissentire da chi insegna, purché con argomenti.', v: true, why: 'È la seconda regola del patto.' },
      { s: 'Ciò che è nato in ambiente cristiano è nato solo grazie al cristianesimo.', v: false, why: 'Hanno pesato anche l’eredità greca e romana, le città, i commerci, le scelte politiche.' },
      { s: 'Il talento era, in origine, un’unità di peso e di moneta.', v: true, why: 'Il senso di «dote» viene dalla parabola evangelica dei talenti (Mt 25,14-30).' },
      { s: 'Nel mazzo si può dire «passo» tutte le volte che si vuole.', v: false, why: 'Una volta sola: è la regola del gioco.' },
      { s: 'La verifica rovesciata è un’ora in cui le domande le fanno gli studenti.', v: true, why: 'A metà anno: che cosa ha funzionato, che cosa no, che cosa cambiamo.' }
    ],
    abbina: [
      ['Storia', 'Chi ha costruito il mondo in cui vivi?'],
      ['Teologia', 'Perché fai cose che non vuoi fare?'],
      ['Filosofia', 'È da stupidi credere?'],
      ['Politica e coscienza', 'C’è un ordine che non devi eseguire?'],
      ['Bibbia', 'Chi sei quando nessuno ti guarda?']
    ],
    rifl: { domanda: 'Quest’anno, quanto senti di decidere tu?', poli: ['Decido io', 'In parte', 'Decidono altri'], spunto: 'Una cosa che vorresti decidere tu, quest’anno, e perché. La frase resta solo su questo schermo.' }
  }
};

/* =====================================================================
   Componente della lezione: il mazzo dell'estate (React con htm).
   Interazioni: quattro semi (la-choice: hover bordo oro e −2 px, active 0,97, focus oro; disabilitati a seme esaurito),
   «Carta a caso» (ll-btn: magnetico, lama di luce, active 0,96, focus oro), «Rimescola» a due tocchi (ll-btn--ghost),
   cronometro dei quaranta secondi (ll-btn--ghost + barra d'oro, ultimi dieci secondi in rosa con la parola «ultimi secondi»).
   Memoria solo in pagina: tornando alla scena (anche dopo la pausa gioco) il mazzo riprende da dove era rimasto. Nulla va nel browser.
   ===================================================================== */
(function () {
  var MEM = {};
  function useMem(key, iniziale) {
    var s = React.useState(function () { return Object.prototype.hasOwnProperty.call(MEM, key) ? MEM[key] : (typeof iniziale === 'function' ? iniziale() : iniziale); });
    return [s[0], function (v) { MEM[key] = v; s[1](v); }];
  }

  var CSS = '' +
    /* lab-percezione.css del kit aggiunge 144 px sotto i 720 px (pensati per gli artefatti a pagina libera):
       nel guscio a griglia della lezione sollevano la barra delle scene e lasciano una fascia vuota sul telefono. */
    'body.ll.la,body.ll.g{padding-bottom:0}' +
    '.m3-semi{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-bottom:21px}' +
    '@media(min-width:720px){.m3-semi{grid-template-columns:repeat(4,minmax(0,1fr))}}' +
    '.m3-seme.la-choice{flex-direction:column;align-items:flex-start;gap:3px;padding:13px;min-width:0;text-align:left}' +
    '.m3-seme.la-choice:hover:not(:disabled){transform:translateY(-2px);border-color:var(--lab-oro)}' +
    '.m3-seme.la-choice:active:not(:disabled){transform:scale(.97)}' +
    '.m3-seme.la-choice:focus-visible{outline:1.5px solid var(--lab-oro);outline-offset:2px}' +
    '.m3-seme[aria-pressed="true"]{border-color:var(--lab-oro);background:var(--lab-oro-soft)}' +
    '.m3-seme:disabled{opacity:.38;cursor:default}' +
    '.m3-seme b{display:flex;align-items:center;font-weight:700}' +
    '.m3-seme small{color:var(--lab-muted);font-size:13px;line-height:1.35}' +
    '.m3-dot{display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:8px;flex:none}' +
    '.m3-tavolo{position:relative;perspective:1200px}' +
    '.m3-carta{position:relative;min-height:233px;display:flex;flex-direction:column;justify-content:center;gap:13px;padding:34px 21px;border-radius:21px;border-left:5px solid var(--m3-col,var(--lab-oro));animation:m3flip 610ms var(--lab-ease-out,ease) both;transform-origin:50% 50%}' +
    '.m3-carta.is-vuota{background:transparent;border:1.5px dashed var(--lab-line);box-shadow:none;text-align:center;animation:none;align-items:center}' +
    '.m3-carta .la-meta{display:flex;align-items:center;gap:0;flex-wrap:wrap}' +
    '.m3-num{margin-left:auto;font-family:var(--lab-font-inscription,serif);letter-spacing:.14em;font-size:12px;color:var(--lab-muted)}' +
    '.m3-testo{font:600 clamp(23px,4.6vw,36px)/1.22 var(--lab-font-display,serif);color:var(--lab-ink);margin:0;text-wrap:balance;overflow-wrap:anywhere}' +
    '.m3-testo--vuoto{color:var(--lab-muted);font-size:21px}' +
    '.m3-ponte{display:inline-flex;align-self:flex-start;gap:8px;align-items:center;padding:3px 13px;border-radius:999px;border:1px solid var(--lab-oro);color:var(--lab-oro);font-size:13px;font-weight:700}' +
    '.m3-pila{display:flex;gap:5px;justify-content:center;margin-top:8px}' +
    '.m3-pila i{width:21px;height:30px;border-radius:5px;border:1px solid var(--lab-line);background:var(--lab-grad-soft,transparent)}' +
    '@keyframes m3flip{from{transform:rotateY(80deg) translateY(8px);opacity:0}to{transform:none;opacity:1}}' +
    '@media(prefers-reduced-motion:reduce){.m3-carta{animation:none}}' +
    '.m3-azioni{margin-top:21px}' +
    '.m3-timer{display:flex;align-items:center;gap:13px;flex-wrap:wrap;margin-top:13px}' +
    '.m3-barra{flex:1;min-width:89px;height:5px;background:var(--lab-line);border-radius:3px;overflow:hidden}' +
    '.m3-barra i{display:block;height:100%;background:var(--lab-oro);transition:width 1s linear}' +
    '.m3-cifra{font:600 28px/1 var(--lab-font-display,serif);min-width:2.2em;text-align:right;font-variant-numeric:tabular-nums;color:var(--lab-ink)}' +
    '.m3-timer.is-fine .m3-barra i{background:var(--lab-rosa)}' +
    '.m3-timer.is-fine .m3-cifra{color:var(--lab-rosa)}' +
    '.m3-avviso{font-size:13px;font-weight:700;color:var(--lab-rosa)}' +
    '@media(prefers-reduced-motion:reduce){.m3-barra i{transition:none}}';
  (function () {
    try {
      if (document.getElementById('m3-css')) return;
      var st = document.createElement('style'); st.id = 'm3-css'; st.textContent = CSS; document.head.appendChild(st);
    } catch (e) { /* nessuno stile aggiuntivo: il mazzo resta usabile con le classi del kit */ }
  })();

  var PONTE = 'Una cosa che fai tutti i giorni e di cui non sai chi l’ha inventata.';
  var SEMI = [
    { nome: 'Estate', d: 'Ricordi dei tre mesi', col: 'var(--lab-oro)', carte: [
      'L’estate in una parola. Poi spiegala in una frase.',
      'Una cosa che hai fatto per la prima volta.',
      'Il posto più bello in cui sei stato. Vale anche a due chilometri da casa.',
      'La canzone che hai ascoltato di più. E perché non ti sei ancora stancato.',
      'Una giornata intera passata a non fare niente: raccontala.',
      'Una persona con cui hai passato più tempo del solito.',
      'Una cosa che hai mangiato e che ti ricorderai.'
    ] },
    { nome: 'Attese', d: 'L’anno che comincia', col: 'var(--lab-ciano)', carte: [
      'Una cosa che vuoi fare diversamente rispetto all’anno scorso. Non vale dire «studiare di più».',
      'Una materia che ti preoccupa quest’anno. Di’ anche perché.',
      'Che cosa sai fare che quasi nessuno qui sa fare? Serve per la fine dell’anno.',
      'Che cosa ti aspetti dall’ora di religione? Vale anche «niente», ma spiegalo.',
      'Una cosa che vuoi aver imparato entro giugno. Anche fuori dalla scuola.',
      'Una cosa che vorresti succedesse in questa classe quest’anno.',
      'Se potessi togliere una cosa dalla giornata di scuola, quale?'
    ] },
    { nome: 'Domande', d: 'Per pensarci un po’', col: 'var(--la-accent)', carte: [
      PONTE,
      'Un’abitudine che vorresti toglierti. Non dire quale: di’ solo da quanto tempo ce l’hai.',
      'Una cosa che tutti danno per vera e che a te non convince.',
      'Ti è mai capitato di dire sì a qualcosa solo perché lo dicevano tutti?',
      'Come ti chiamano gli amici e come ti chiamano in famiglia. È la stessa persona?',
      'Una domanda che hai fatto a un adulto e a cui non ti ha risposto davvero.'
    ] },
    { nome: 'Sfide', d: 'Per chi si offre', col: 'var(--lab-rosa)', carte: [
      'Due verità e una bugia sulla tua estate. La classe indovina la bugia.',
      'La tua estate in tre emoji, dette a voce. La classe le interpreta.',
      'Il titolo del film della tua estate. Il genere è obbligatorio.',
      'Presenta chi siede alla tua destra come se fosse un ospite famoso. Trenta secondi.'
    ] }
  ];
  var TOT = SEMI.reduce(function (a, s) { return a + s.carte.length; }, 0), T = 40;
  function fresco() { return SEMI.map(function (s) { return s.carte.slice(); }); }

  LabLezione.registra('Mazzo', function (p) {
    var r = useMem('rimaste', fresco), rimaste = r[0], setRimaste = r[1];
    var c = useMem('carta', null), carta = c[0], setCarta = c[1];
    var n = useMem('pescate', 0), pescate = n[0], setPescate = n[1];
    var tm = React.useState(T), resto = tm[0], setResto = tm[1];
    var rn = React.useState(false), run = rn[0], setRun = rn[1];
    var ar = React.useState(false), armato = ar[0], setArmato = ar[1];
    var tArm = React.useRef(0);
    React.useEffect(function () { return function () { clearTimeout(tArm.current); }; }, []);
    React.useEffect(function () {
      if (!run) return;
      var t = setInterval(function () { setResto(function (x) { if (x <= 1) { setRun(false); return 0; } return x - 1; }); }, 1000);
      return function () { clearInterval(t); };
    }, [run]);
    function azzeraTimer() { setRun(false); setResto(T); }
    function pesca(i) {
      var m = rimaste[i]; if (!m || !m.length) return;
      var j = Math.floor(Math.random() * m.length), testo = m[j];
      setRimaste(rimaste.map(function (a, k) { return k === i ? a.filter(function (_, q) { return q !== j; }) : a; }));
      setCarta({ s: i, t: testo, id: pescate + 1 });
      setPescate(pescate + 1);
      azzeraTimer();
      if (testo === PONTE) p.ctx.say('Tenetela a mente: fra poco diventa la domanda dell’anno.');
      else if (pescate + 1 === TOT) { p.ctx.festa(); p.ctx.say('Mazzo finito: ventiquattro carte, ventiquattro racconti.'); }
    }
    function aCaso() {
      var disp = []; rimaste.forEach(function (m, i) { if (m.length) disp.push(i); });
      if (!disp.length) return;
      pesca(disp[Math.floor(Math.random() * disp.length)]);
    }
    function rimescola() {
      clearTimeout(tArm.current);
      if (!armato) { setArmato(true); tArm.current = setTimeout(function () { setArmato(false); }, 3000); return; }
      setArmato(false); setRimaste(fresco()); setCarta(null); setPescate(0); azzeraTimer();
    }
    function timer() {
      if (run) { setRun(false); return; }
      if (resto === 0) setResto(T);
      setRun(true);
    }
    var S = carta ? SEMI[carta.s] : null, finito = pescate >= TOT, fine10 = resto <= 10 && resto > 0 && run;
    var etTimer = run ? 'Pausa' : resto === T ? 'Avvia 40 s' : resto === 0 ? 'Di nuovo' : 'Riprendi';
    return html`<div className="m3">
      <div className="m3-semi" role="group" aria-label="Semi del mazzo">
        ${SEMI.map(function (s, i) {
          var q = rimaste[i].length;
          return html`<button key=${s.nome} type="button" className="la-choice m3-seme" disabled=${!q} aria-pressed=${!!(carta && carta.s === i)} onClick=${function () { pesca(i); }}>
            <b><i className="m3-dot" style=${{ background: s.col }} aria-hidden="true"></i>${s.nome}</b>
            <small>${s.d} · ${q} ${q === 1 ? 'carta' : 'carte'}</small>
          </button>`;
        })}
      </div>
      <div className="m3-tavolo">
        <div key=${carta ? carta.id : 'vuota'} className=${'la-card m3-carta' + (carta ? '' : ' is-vuota')} data-flat style=${S ? { '--m3-col': S.col } : null} aria-live="polite">
          ${carta
            ? html`<span className="la-meta"><i className="m3-dot" style=${{ background: S.col }} aria-hidden="true"></i>${S.nome}<span className="m3-num">Carta ${carta.id} di ${TOT}</span></span>
                   <p className="m3-testo">${carta.t}</p>
                   ${carta.t === PONTE && html`<span className="m3-ponte">Carta ponte: torna fra poco</span>`}
                   <p className="ll-hint">Quaranta secondi, a voce. «Passo» vale una volta sola.</p>`
            : html`<p className="m3-testo m3-testo--vuoto">${finito ? 'Mazzo finito. Rimescola per un altro giro.' : 'Il mazzo è coperto. Scegli un seme o pesca a caso.'}</p>
                   ${!finito && html`<span className="m3-pila" aria-hidden="true"><i></i><i></i><i></i><i></i></span>`}`}
        </div>
      </div>
      <div className="ll-row m3-azioni">
        <button type="button" className="ll-btn" disabled=${finito} onClick=${aCaso}>Carta a caso</button>
        <button type="button" className="ll-btn ll-btn--ghost" onClick=${rimescola}>${armato ? 'Sicuro? Tocca ancora' : 'Rimescola'}</button>
        <span className="ll-tally" aria-live="polite">Carte pescate: ${pescate} di ${TOT}</span>
      </div>
      <div className=${'m3-timer' + (fine10 ? ' is-fine' : '')} role="timer" aria-label="Cronometro di quaranta secondi">
        <button type="button" className="ll-btn ll-btn--ghost" onClick=${timer} disabled=${!carta}>${etTimer}</button>
        <span className="m3-barra" aria-hidden="true"><i style=${{ width: (100 * resto / T) + '%' }}></i></span>
        ${fine10 && html`<span className="m3-avviso">ultimi secondi</span>`}
        ${resto === 0 && html`<span className="m3-avviso">tempo!</span>`}
        <b className="m3-cifra" aria-live="off">${resto}</b>
      </div>
    </div>`;
  });
})();
