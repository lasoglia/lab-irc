/* Classe III · UDA 1 «Luoghi che cambiano la vita» · Lezione 1 — «La misura dei più deboli».
   Versione con gli strumenti nuovi (2 ottobre 2026). Contenuti dal dossier docente/III 1-1 …-contenuti.md.
   Citazioni della Regola: trad. Benedettini di Noci, Edizioni La Scala. Etimologie: Vocabolario Treccani. */
window.LEZIONE = {
  slug: 'iii-1-1-luoghi-che-cambiano-la-vita-regola-di-benedetto',
  classe: 'Anno III',
  titolo: 'La misura dei *più deboli*',
  sottotitolo: 'Perché una comunità si dà una regola: fine, misura e autorità nella Regola di Benedetto.',
  saluto: 'Ultima tappa: a che cosa serve, allora, una regola?',
  glossario: {
    'monastero': { etim: 'dal greco *monastḗrion*, da *mónos*, «solo»', def: 'La casa dove vivono i monaci. Il nome viene da «solo», eppure nel cenobio si vive insieme: per questo serve una regola.' },
    'emina': { parola: 'emina', etim: 'dal latino *hemina*, greco *hēmína*, «mezza» (metà di un sestario)', def: 'Antica misura romana di capacità, circa 0,27 litri.' },
    'discrezione': { etim: 'dal latino *discretio*, da *discernere*, «distinguere»', def: 'Nella Regola, la capacità di dare a ciascuno la misura giusta: «madre di tutte le virtù» (64,19).' }
  },
  scene: [
    { fase: 'Aggancio', momento: 'Apertura', minuti: 4, titolo: 'Dodici persone, *una casa*',
      lead: 'Immaginate di vivere in dodici nella stessa casa, per tutta la vita.',
      blocchi: [
        { tipo: 'domanda', id: 'ingresso', etichetta: 'Anonimo · per alzata di mano', q: 'Che cosa decidereste per primo?', opzioni: ['Gli orari', 'Chi comanda', 'Come dividere cibo e lavoro', 'Perché stiamo insieme'],
          dibattito: 'Di solito si parte dagli orari. Benedetto, quindici secoli fa, parte dall’ultima risposta: **perché** si sta insieme. Oggi seguiamo il suo ragionamento.' },
        { tipo: 'aggancio', etichetta: 'Oggi', titolo: 'Anche una regola della vostra scuola si legge così',
          t: 'La circolare del 16 giugno 2025 vieta lo smartphone in orario scolastico, con alcune eccezioni. Prima di chiederci se è giusta, possiamo chiederci **a che cosa serve**.', fonte: 'MIM, circolare n. 3392 del 16 giugno 2025' }
      ] },

    { fase: 'Scoperta', momento: 'Contesto', minuti: 5, titolo: 'Una vita *in comune*',
      testo: 'Dal IV secolo molti cristiani dedicano la vita alla ricerca di Dio, alcuni da soli, altri insieme. Chi vive con altri deve decidere quando si prega, si lavora, si mangia, chi decide. **Per questo** i {monasteri|monastero} si danno delle regole.',
      blocchi: [
        { tipo: 'parola', parola: 'Cenobio', radice: 'ceno', origine: 'Dal greco koinóbion, attraverso il latino tardo coenobium',
          significato: 'Da *koinós*, «comune», e *bíos*, «vita»: il luogo dove più monaci fanno vita comune sotto la stessa regola.', battuta: 'Il nome dice già il problema: vivere insieme.' },
        { tipo: 'tappe', voci: [
          { data: 'IV sec.', breve: 'Cenobi', titolo: 'Le prime comunità', testo: 'In Egitto Pacomio organizza i primi {cenobi|cenobio}; in Oriente Basilio di Cesarea scrive regole che valgono ancora oggi.' },
          { data: 'c. 480', breve: 'Norcia', titolo: 'Nasce Benedetto', testo: 'Studia a Roma, poi vive circa tre anni in una grotta sopra Subiaco e organizza alcuni monasteri nella valle dell’Aniene.' },
          { data: '529', breve: 'Montecassino', titolo: 'Montecassino', testo: 'Si trasferisce a Montecassino, dove scrive la Regola e muore nel 547.' },
          { data: 'c. 592', breve: 'Gregorio', titolo: 'I «Dialoghi»', testo: 'Gregorio Magno ne racconta la vita: un racconto spirituale, con miracoli, da non leggere come una cronaca.' }
        ] }
      ] },

    { fase: 'Scoperta', momento: 'Fonte', minuti: 5, titolo: 'Prima delle norme, *il fine*',
      lead: 'Prima di orari e razioni, la Regola dichiara per che cosa esiste il {monastero}.',
      blocchi: [
        { tipo: 'leggi', q: 'Quale parte della frase dà il criterio per giudicare tutte le norme che seguono?',
          testo: '«[[Istituiremo a tale scopo::Annuncia un progetto, ma non dice ancora come giudicare le norme.]] [[una scuola di servizio divino::È il **fine**: imparare a servire Dio, come in una scuola. Dice perché il monastero esiste.]]; e nell’organizzarla speriamo di [[!non programmare nulla di gravoso o d’insopportabile::È il **criterio**: ogni norma si giudica su questo limite. Per questo, più avanti, la misura si calcola sui più deboli.]].»',
          fonte: 'Regola di san Benedetto, Prologo 45-46 (trad. Benedettini di Noci)' },
        { tipo: 'parola', parola: 'Regola', radice: 'reg', origine: 'Dal latino regula, derivato di regere',
          significato: 'Propriamente «guidare diritto». In origine era il **regolo**, l’assicella con cui si tracciano linee diritte; poi è passata a significare «norma».', battuta: 'Una riga dritta indica la direzione, ma non cammina al posto tuo.' }
      ] },

    { fase: 'Scoperta', momento: 'Spiegazione', minuti: 5, titolo: 'Tre parole da *non confondere*',
      blocchi: [
        { tipo: 'carte', carte: [
          { fronte: 'Fine', etichetta: 'Perché', retro: 'Ciò per cui un gruppo esiste. Nessuna organizzazione, da sola, lo produce.' },
          { fronte: 'Regola', etichetta: 'Come', retro: 'La misura concreta che rende praticabile il fine ogni giorno: un’ora, una quantità, un limite.' },
          { fronte: 'Efficienza', etichetta: 'Quanto', retro: 'Il rapporto fra risultato e risorse. Dice quanto bene ottieni qualcosa, non a che cosa serve.' }
        ] },
        { tipo: 'verifica', q: '«La mensa chiude alle 13.30 per ottimizzare i turni di pulizia.» Che cosa dichiara questa norma?', opzioni: ['Un fine della comunità', 'Un criterio di efficienza', 'Una forma di discrezione'], ok: 1,
          why: 'Dice come ottenere un risultato con meno risorse, non per che cosa la comunità mangia insieme. Non è sbagliata: semplicemente **non dichiara un fine**.' }
      ] },

    { fase: 'Scoperta', momento: 'Spiegazione', minuti: 5, titolo: 'Una misura pensata *sui più deboli*',
      lead: 'Avanzate un passo alla volta: che cosa cambia quando il fine è scritto?',
      blocchi: [
        { tipo: 'animazione', id: 'fine', rapporto: 1.9, attori: [
            { id: 'fine', t: 'Il fine', forma: 'cerchio', colore: 'oro' },
            { id: 'o', t: 'Orario', forma: 'pillola' }, { id: 'r', t: 'Razione', forma: 'pillola' }, { id: 'l', t: 'Lavoro', forma: 'pillola' },
            { id: 'deb', t: 'Chi fa più fatica', forma: 'riquadro', colore: 'rosa' }
          ],
          frecce: [ { id: 'f1', da: 'fine', a: 'o' }, { id: 'f2', da: 'fine', a: 'r' }, { id: 'f3', da: 'fine', a: 'l' },
            { id: 'd1', da: 'deb', a: 'r', t: 'misura', curva: 6 }, { id: 'd2', da: 'deb', a: 'l', curva: -6 } ],
          passi: [
            { didascalia: 'Tre norme, nessuno scopo scritto: **un elenco**. Su che cosa le giudichiamo?', attori: { o: { x: 20, y: 34 }, r: { x: 52, y: 70 }, l: { x: 80, y: 30 } } },
            { didascalia: 'La Regola scrive il **fine** prima delle norme: ora ogni norma dipende da una ragione.', attori: { fine: { x: 50, y: 20, on: true }, o: { x: 18, y: 62 }, r: { x: 50, y: 66 }, l: { x: 82, y: 62 } }, frecce: ['f1', 'f2', 'f3'] },
            { didascalia: 'Entra **chi fa più fatica**: razione e lavoro si misurano su di lui.', attori: { fine: { on: false }, deb: { x: 66, y: 88 }, r: { x: 42, y: 60 }, l: { x: 86, y: 54 } }, frecce: ['f1', 'f2', 'f3', 'd1', 'd2'] },
            { didascalia: '«Tenendo presente lo stato di salute dei più deboli» (40,3): **la misura comune è calcolata su chi fa più fatica**, e vale per tutti.', attori: { deb: { on: true }, fine: { on: true } }, frecce: ['f1', 'f2', 'f3', 'd1', 'd2'] }
          ] },
        { tipo: 'aggancio', etichetta: 'Per capire', titolo: 'Quanto vino? Una misura discussa',
          t: 'Il latino dice {hemina|emina}, una misura romana di circa 0,27 litri. Quanto valesse esattamente al tempo di Benedetto è discusso; conta il criterio: la misura parte dai più deboli.', fonte: 'Regola 40,3; Vocabolario Treccani, voce «emina»' }
      ] },

    { fase: 'Scoperta', momento: 'Pausa gioco', minuti: 6, titolo: 'Fine, regola *o efficienza*?',
      testo: 'Ogni frase va nel suo contenitore. La classe decide, il docente tocca; dopo, confrontiamo le ragioni delle scelte da correggere.',
      blocchi: [
        { tipo: 'mascotte', t: 'Un indizio: «efficiente» non vuol dire «sbagliato». Chiedetevi soltanto se la frase **dice a che cosa serve**.' },
        { tipo: 'gioco', id: 'cat', titolo: 'Smistiamo le frasi', testo: 'Dodici frasi, tre contenitori.', pulsante: 'Si gioca' }
      ] },

    { fase: 'Scoperta', momento: 'Spiegazione', minuti: 4, titolo: 'Anche chi comanda *sta sotto* la Regola',
      testo: 'L’abate fa le veci di Cristo, ma non può comandare nulla contro i comandamenti di Dio (2,4). Consulta tutta la comunità, anche il più giovane (3,3), e segue la Regola come tutti (3,7).',
      blocchi: [
        { tipo: 'parola', parola: 'Abate', radice: 'ab', origine: 'Dal latino tardo abbas, voce di origine aramaica',
          significato: '*Abbà*, «padre». La Regola lo spiega con san Paolo: l’abate è chiamato con il nome di Cristo, «Abbà, Padre!» (2,2-3; Rm 8,15).', battuta: 'Un padre, non un padrone: per questo ha dei limiti scritti.' },
        { tipo: 'nota', icona: 'ℹ️', t: 'Non era una regola mite: prevede castighi (48,17-20) e, per gli ostinati, punizioni corporali (2,28), secondo l’uso del tempo, oggi inaccettabile. La novità è un’altra: **un limite scritto all’arbitrio di chi comanda**.' }
      ] },

    { fase: 'Scoperta', momento: 'Spiegazione', minuti: 4, titolo: 'Che cosa è nato *da una regola*',
      blocchi: [
        { tipo: 'catena', titolo: 'Dal cercare Dio alla biblioteca', anelli: [
          { t: 'Il fine: cercare Dio', d: '«Il loro obiettivo era: quaerere Deum» (Benedetto XVI, 2008).', senza: 'Senza questo fine resta un’organizzazione del lavoro: niente spinge a leggere e a studiare.' },
          { nesso: 'Ma', t: 'Dio parla nella Scrittura', d: 'Cercarlo significa ascoltare una Parola scritta.', senza: 'Se la ricerca non passa per un testo, i libri non sono necessari.' },
          { nesso: 'Per questo', t: 'Bisogna saper leggere', d: 'La lettura entra nella giornata: in Quaresima ognuno riceve un libro (48,15).', senza: 'Senza lettura, nessuna scuola: il testo resta chiuso.' },
          { nesso: 'Quindi', t: 'Biblioteca e scuola fanno parte del monastero', d: 'Non per conservare una cultura, ma per cercare Dio: la cultura ne è l’effetto.' }
        ], fine: 'Effetto, non scopo: è questo il punto.' },
        { tipo: 'aggancio', etichetta: 'Con onestà', titolo: 'Non fu l’unica strada della cultura antica',
          t: 'La cultura antica passò anche per Bisanzio e per il mondo islamico. E *ora et labora*, che Paolo VI chiama «il suo famoso motto», non compare nel testo della Regola.' },
        { tipo: 'aggancio', etichetta: 'Oggi', titolo: 'Benedetto, patrono d’Europa',
          t: 'Nel 1964 Paolo VI proclama Benedetto patrono d’Europa per l’impronta che i monasteri hanno lasciato sul continente.', fonte: 'Paolo VI, lettera apostolica *Pacis nuntius*, 24 ottobre 1964' }
      ] },

    { fase: 'Attività', momento: 'Laboratorio', minuti: 8, titolo: 'Tocca *a voi*',
      blocchi: [
        { tipo: 'varianti', opzioni: [
          { nome: 'Il caso della mensa', durata: '8 min', descrizione: 'Un caso concreto, tre soluzioni: scegliete e guardate che cosa succede.', blocchi: [
            { tipo: 'bivio', caso: 'Due studenti arrivano in mensa dopo le 13.30: il trasporto accessibile termina il giro più tardi. La mensa chiude alle 13.30 per i turni di pulizia.',
              scelte: [
                { t: 'La regola è uguale per tutti: si chiude alle 13.30', esito: 'La norma resta semplice ed efficiente. **Ma** chi ha un bisogno diverso resta senza pasto: la misura uguale tradisce il fine.' },
                { t: 'Si mette da parte un piatto, senza cambiare l’orario', esito: 'Il bisogno viene riconosciuto con poca spesa. **Però** i due mangiano da soli: il pasto è garantito, la vita comune no.' },
                { t: 'Un incaricato resta fino alle 14, a rotazione', esito: 'Fine e persone tornano al centro. **Resta da verificare** il costo per chi lavora: una soluzione si valuta anche sulle condizioni concrete.' }
              ],
              chiusura: 'La Regola chiama questo criterio **{discrezione}**, «madre di tutte le virtù»: ordinare ogni cosa «in modo che i forti desiderino fare di più e i deboli non si scoraggino» (64,19).' } ] },
          { nome: 'Riscrivere un articolo', durata: '8 min', descrizione: 'In gruppi: trasformate una norma di efficienza in una norma che dichiara il fine.', blocchi: [
            { tipo: 'consegna', titolo: 'In gruppi da quattro', modalita: 'Gruppi', minuti: 6, passi: ['Leggete: «La mensa chiude alle 13.30 per ottimizzare i turni di pulizia».', 'Scrivete quale bisogno dovrebbe proteggere.', 'Riscrivete l’articolo in una frase che dichiari il fine.', 'Scegliete chi la legge alla classe.'], ruoli: ['Lettore', 'Scrittore', 'Tempo', 'Portavoce'], prodotto: 'una frase per gruppo alla lavagna; due minuti di confronto.' } ] },
          { nome: 'Pesare le ragioni', durata: '8 min', descrizione: 'La circolare sugli smartphone: mettete gli argomenti sulla bilancia e motivate il peso.', blocchi: [
            { tipo: 'bilancia', libero: true, piatti: ['Divieto', 'Uso educato'], argomenti: [
              { t: 'Protegge concentrazione e benessere', lato: 0, nota: 'È il fine dichiarato dalla circolare, motivato con studi di OCSE, OMS e ISS.' },
              { t: 'Una misura uguale per tutti è più facile da rispettare', lato: 0, nota: 'Argomento di praticabilità: riguarda la **misura**, non il fine.' },
              { t: 'Un divieto non insegna a usare bene lo strumento', lato: 1, nota: 'Obiezione seria: colpisce la misura. La circolare stessa chiede di educare a un uso responsabile.' },
              { t: 'Alcuni studenti ne hanno bisogno per imparare', lato: 1, nota: 'La circolare lo prevede già come eccezione motivata: la misura comune non schiaccia i più fragili.' }
            ], domanda: 'Gli argomenti di destra contestano il **fine** o la **misura**? Si può condividere uno scopo e discutere il mezzo.' } ] }
        ] }
      ] },

    { fase: 'Chiusura', momento: 'Prova', minuti: 4, titolo: 'A che cosa *serve* una regola?',
      blocchi: [
        { tipo: 'ordina', q: 'Rimettete in ordine il ragionamento di oggi', voci: [
          'Una comunità ha uno scopo che nessuno, da solo, tiene fermo',
          'Per questo scrive il fine prima delle norme',
          'Ogni misura si giudica sul fine e su chi fa più fatica',
          'Anche chi comanda sta sotto la stessa regola'
        ], why: 'Una regola è buona finché rende praticabile il fine anche a chi fa più fatica; quando smette di dire a che cosa serve, diventa soltanto organizzazione.' },
        { tipo: 'verifica', etichetta: 'Ultima domanda', q: 'Quale di queste norme supera la prova di Benedetto?', opzioni: ['«Si lavora otto ore, senza eccezioni, perché rende di più»', '«Chi è malato riceve un lavoro adatto alle sue forze»', '«Decide l’abate, senza consultare nessuno, per fare prima»'], ok: 1,
          why: 'È la 48,24-25: la misura si adatta alla persona per non schiacciarla, e il fine resta lo stesso per tutti. Le altre due mettono l’efficienza al posto del fine.' },
        { tipo: 'domanda', id: 'uscita', confronta: 'ingresso', etichetta: 'Di nuovo, a fine lezione', q: 'Dodici persone, una casa: che cosa decidereste per primo?', opzioni: ['Gli orari', 'Chi comanda', 'Come dividere cibo e lavoro', 'Perché stiamo insieme'],
          dibattito: 'Benedetto parte dal **perché**. Se il voto si è spostato, chiedete a chi ha cambiato idea che cosa l’ha convinto.' }
      ] }
  ],
  studio: {
 "sezioni": [
  {
   "titolo": "La domanda",
   "testo": "La circolare del 16 giugno 2025 prevede il divieto dello smartphone durante l’orario scolastico, con alcune eccezioni. Prima di chiederci se la norma sia giusta, possiamo chiederci a che cosa serva: una misura comune si condivide, o almeno si discute, solo quando se ne conosce lo scopo. Un testo del VI secolo, la Regola di Benedetto, permette di porre la domanda dall’inizio: perché una comunità si dà una regola?"
  },
  {
   "titolo": "Una vita in comune ha bisogno di una regola",
   "testo": "Dal IV secolo molti cristiani dedicano la vita alla ricerca di Dio. Alcuni vivono da soli, gli anacoreti; altri insieme, in un **cenobio**, dal greco *koinóbion*: *koinós*, «comune», e *bíos*, «vita». Chi vive con altri deve stabilire quando si prega, quando si lavora, quanto si mangia, chi decide. **Per questo** i cenobi si danno delle regole. Per Basilio di Cesarea la regola non serve a opprimere: serve perché nessuno, da solo, tiene fermo uno scopo così alto.\n\nIn Italia, all’inizio del VI secolo, circola la *Regola del Maestro*, anonima, che la maggior parte degli studiosi considera la fonte di Benedetto: i primi sette capitoli la riprendono quasi alla lettera, la parte organizzativa con libertà, gli ultimi sei sono propri. Benedetto nasce a Norcia verso il 480, vive a Subiaco e dal 529 a Montecassino, dove muore nel 547. Quasi tutto ciò che sappiamo di lui viene dai *Dialoghi* di Gregorio Magno (verso il 592), un racconto spirituale da non leggere come una cronaca."
  },
  {
   "titolo": "Il fine scritto prima delle norme",
   "testo": "**Quindi** la Regola dichiara il fine prima delle norme: «Istituiremo a tale scopo una scuola di servizio divino; e nell’organizzarla speriamo di non programmare nulla di gravoso o d’insopportabile» (Prol. 45-46). *Regola* viene dal latino *regula*, da *regere*, «guidare diritto»: in origine era il regolo, l’assicella per tracciare linee diritte.\n\nServono tre parole distinte. Il **fine** è ciò per cui un gruppo esiste. La **regola** è la misura concreta che lo rende praticabile ogni giorno. L’**efficienza** è il rapporto fra risultato e risorse: dice quanto bene si ottiene qualcosa, non a che cosa serva. Non è un male, ma sbaglia quando prende il posto del fine."
  },
  {
   "titolo": "Una misura pensata su chi fa più fatica",
   "testo": "**Ne segue che** ogni norma si misura sul fine. Il capitolo 48 divide la giornata fra lavoro e *lectio divina* (da Pasqua al 1° ottobre prima il lavoro, poi l’ordine si rovescia), ma aggiunge: «Tutto però si faccia con moderazione, tenendo presente chi è di costituzione debole» (48,9). Nel lavoro, ai fratelli malati o gracili viene assegnato un compito adatto alle loro forze (48,24-25): non esiste una misura identica per ogni attività e ogni persona. La razione di vino è calcolata «tenendo presente lo stato di salute dei più deboli» (40,3); il latino dice *hemina*, una misura romana di circa 0,27 litri, e la quantità esatta del tempo di Benedetto è discussa. L’ospite va accolto «come Cristo in persona» (53,1, con Mt 25,35), soprattutto se povero o pellegrino (53,15), con una cucina separata perché la comunità non sia disturbata (53,16). I prodotti del monastero si vendono «a un prezzo più basso di quello usato dai secolari, affinché in tutto sia glorificato Dio» (57,8-9)."
  },
  {
   "titolo": "Anche chi comanda sta sotto la Regola",
   "testo": "**Per questo** anche l’autorità ha dei limiti. *Abate* viene dal latino tardo *abbas*, di origine aramaica: *abbà*, «padre» (2,2-3; Rm 8,15). L’abate «non deve insegnare, stabilire o comandare nulla che sia contrario ai comandamenti di Dio» (2,4); consulta tutta la comunità, perché «spesso è al più giovane che Dio rivela la soluzione migliore» (3,3); e segue la Regola come tutti (3,7). La **discrezione**, «madre di tutte le virtù», regola ogni cosa «in modo che i forti desiderino fare di più e i deboli non si scoraggino» (64,19). La Regola non era mite: prevede castighi (48,17-20) e, per gli ostinati, punizioni corporali (2,28), secondo l’uso del tempo, oggi inaccettabile."
  },
  {
   "titolo": "Che cosa è nato da una regola",
   "testo": "**Quindi** da questa forma di vita nasce un’istituzione. Per Benedetto XVI (Collège des Bernardins, 2008) i monaci non volevano creare né conservare una cultura: «Il loro obiettivo era: quaerere Deum, cercare Dio». Ma cercare Dio nella Scrittura richiede di saper leggere, e per questo nel monastero ci sono la biblioteca e la scuola. Nello stesso discorso ricorda che nel mondo greco il lavoro fisico era considerato cosa da servi, mentre per il monachesimo «il lavoro manuale è parte costitutiva». Nel 1964 Paolo VI proclama Benedetto patrono d’Europa (*Pacis nuntius*).\n\n**Eppure** i monasteri non furono l’unica via di trasmissione della cultura antica, che passò anche per Bisanzio e per il mondo islamico; e *ora et labora*, che Paolo VI chiama «il suo famoso motto», non compare nel testo della Regola."
  },
  {
   "titolo": "Una regola di oggi",
   "testo": "La circolare del Ministero n. 3392 del 16 giugno 2025 vieta lo smartphone in orario scolastico, «anche a fini didattici». Il fine dichiarato è la salute e il benessere degli adolescenti e i loro risultati scolastici; la misura è un divieto uguale per tutti; le eccezioni comprendono motivate necessità personali e, a precise condizioni del progetto formativo, gli indirizzi tecnici dedicati a informatica e telecomunicazioni. Si può obiettare che un divieto non insegna da solo a usare bene uno strumento: l’obiezione colpisce la misura, non il fine, e la circolare stessa chiede di educare a un uso responsabile."
  },
  {
   "titolo": "La risposta",
   "testo": "Una comunità si dà una regola quando ha uno scopo che non raggiunge per caso e che nessuno, da solo, tiene fermo. La regola ne è la misura quotidiana, ed è buona finché lo rende praticabile anche a chi fa più fatica; quando smette di dire a che cosa serve, diventa soltanto un’organizzazione."
  }
 ],
 "fonti": [
  "*San Benedetto, Regola*, traduzione italiana in lingua corrente a cura dei Benedettini di Noci (Bari), Edizioni La Scala: Prologo 45-46; capp. 2, 3, 40, 48, 53, 57, 64, 73.",
  "A. de Vogüé, «Regula Benedicti», in *Dizionario degli Istituti di Perfezione*, vol. II, coll. 1555-1564.",
  "Benedetto XVI, Udienza generale del 9 aprile 2008; Discorso al Collège des Bernardins, 12 settembre 2008, vatican.va.",
  "Paolo VI, lettera apostolica *Pacis nuntius*, 24 ottobre 1964, vatican.va.",
  "*Vocabolario Treccani*, voci «regola», «abate», «cenobio», «emina».",
  "Ministero dell’Istruzione e del Merito, circolare 16 giugno 2025, n. 3392; testo originale nell’allegato dell’USR Emilia-Romagna, verificato il 1 ottobre 2026: https://www.istruzioneer.gov.it/2025/06/17/disposizioni-in-merito-allutilizzo-degli-smartphone-nel-ii-ciclo-di-istruzione/?download=61618"
 ]
},
  giochi: {
 "cat": {
  "bins": [
   "Fine",
   "Regola",
   "Efficienza"
  ],
  "items": [
   [
    "Una scuola di servizio divino",
    0
   ],
   [
    "Da Pasqua al 1° ottobre si lavora fin verso le dieci",
    1
   ],
   [
    "Un solo turno di mensa costa meno di due",
    2
   ],
   [
    "Accogliere l’ospite come Cristo",
    0
   ],
   [
    "Una razione di vino fissata per ogni fratello",
    1
   ],
   [
    "Più ore di lavoro producono più raccolto",
    2
   ],
   [
    "In Quaresima ciascuno riceve un libro da leggere per intero",
    1
   ],
   [
    "Decidere senza consultare fa risparmiare tempo",
    2
   ],
   [
    "Che in tutto sia glorificato Dio",
    0
   ],
   [
    "Due fratelli incaricati della cucina degli ospiti",
    1
   ],
   [
    "Produrre la stessa quantità usando meno risorse",
    2
   ],
   [
    "Custodire la carità fra i fratelli",
    0
   ]
  ]
 },
 "vf": [
  {
   "s": "Benedetto inventa il monachesimo.",
   "v": false,
   "why": "Esisteva da due secoli in Oriente, e in Italia circolavano altre regole, come quella del Maestro."
  },
  {
   "s": "Dal 1° ottobre la Regola mette la lettura prima del lavoro.",
   "v": true,
   "why": "Le giornate sono più corte e l’ordine si rovescia (48,10-11)."
  },
  {
   "s": "Per la Regola l’ospite è un disturbo da contenere.",
   "v": false,
   "why": "Va accolto «come Cristo in persona» (53,1); la cucina separata serve a organizzare l’accoglienza, non a evitarla."
  },
  {
   "s": "La Regola vincola anche l’abate.",
   "v": true,
   "why": "«In ogni cosa tutti seguano la Regola come maestra» (3,7), e l’abate renderà conto di ogni decisione (3,11)."
  },
  {
   "s": "La Regola non prevede punizioni.",
   "v": false,
   "why": "Prevede controlli e castighi (48,17-20), anche corporali per gli ostinati (2,28), secondo l’uso del tempo."
  },
  {
   "s": "«Ora et labora» è una frase della Regola.",
   "v": false,
   "why": "Non compare nel testo: è il motto con cui la tradizione ne riassume lo spirito. Paolo VI lo chiama «il suo famoso motto»."
  },
  {
   "s": "Per Benedetto XVI i monaci volevano soprattutto conservare la cultura antica.",
   "v": false,
   "why": "Il loro obiettivo era «quaerere Deum, cercare Dio»: biblioteca e scuola ne furono l’effetto."
  }
 ],
 "seq": [
  {
   "t": "Nascono i primi cenobi in Egitto e in Oriente",
   "y": "IV sec."
  },
  {
   "t": "Benedetto nasce a Norcia",
   "y": "c. 480"
  },
  {
   "t": "Si trasferisce a Montecassino",
   "y": "529"
  },
  {
   "t": "Muore a Montecassino",
   "y": "547"
  },
  {
   "t": "Gregorio Magno scrive i Dialoghi",
   "y": "c. 592"
  },
  {
   "t": "Paolo VI lo proclama patrono d’Europa",
   "y": "1964"
  }
 ],
 "quiz": [
  {
   "q": "Da dove vengono quasi tutte le notizie sulla vita di Benedetto?",
   "a": [
    "Dalla Regola stessa",
    "Dai Dialoghi di Gregorio Magno",
    "Da un diario di Montecassino",
    "Da una cronaca romana"
   ],
   "ok": 1,
   "why": "Il secondo libro dei Dialoghi (verso il 592) è un racconto spirituale: va letto per il suo genere, non come una cronaca."
  },
  {
   "q": "Che cos’è la «Regola del Maestro»?",
   "a": [
    "Una regola più tarda che copia Benedetto",
    "Il nome antico della Regola di Benedetto",
    "Un testo anonimo più lungo, usato da Benedetto come fonte",
    "Una regola scritta da Gregorio Magno"
   ],
   "ok": 2,
   "why": "Per la maggior parte degli studiosi è precedente: Benedetto la seleziona, la accorcia e la corregge."
  },
  {
   "q": "La parola «cenobio» significa…",
   "a": [
    "vita in comune",
    "casa di preghiera",
    "luogo isolato",
    "scuola di lettura"
   ],
   "ok": 0,
   "why": "Dal greco koinós, «comune», e bíos, «vita»: il nome stesso dice perché serve una regola."
  },
  {
   "q": "In 40,3 la razione di vino è calcolata…",
   "a": [
    "sulla media della comunità",
    "sui più deboli",
    "sui più robusti",
    "sul prezzo del vino"
   ],
   "ok": 1,
   "why": "La misura è pensata su chi fa più fatica e vale per tutti; l’abate può aumentarla per clima o lavoro."
  },
  {
   "q": "«Abate» viene da una parola aramaica che significa…",
   "a": [
    "maestro",
    "custode",
    "anziano",
    "padre"
   ],
   "ok": 3,
   "why": "Abbà, «padre»: un padre, non un padrone. Per questo l’abate non può comandare nulla contro i comandamenti di Dio (2,4)."
  },
  {
   "q": "Perché i monasteri vendono a un prezzo più basso di quello comune (57,8-9)?",
   "a": [
    "Per battere la concorrenza",
    "Perché i prodotti erano peggiori",
    "Affinché in tutto sia glorificato Dio",
    "Per ordine del vescovo"
   ],
   "ok": 2,
   "why": "Il testo subordina il prezzo al fine religioso dichiarato. Il prezzo da solo non misura l’efficienza: per quella occorrono anche dati su risultati e risorse."
  }
 ]
}
};
