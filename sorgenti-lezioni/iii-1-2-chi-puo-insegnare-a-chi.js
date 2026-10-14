/* ---- lezione ---- */
/* Classe III · UDA 1 «Luoghi che cambiano la vita» · Lezione 2 — «Chi può insegnare a chi?».
   Artefatto interattivo con la skill «IRC · Artefatto interattivo della lezione» (kit Lab IRC definitivo, 5 ottobre 2026).
   Versione del 14 ottobre 2026 (seconda stesura, dopo la revisione): stessi contenuti, strumenti e grafica del 4 ottobre;
   filo logico reso continuo in 12 scene, 50 minuti; lead di una frase, poche parole marcate, regole LIM nel CSS della lezione.
   Una sola storia: cercare Dio chiede di imparare → le città chiedono competenze → studenti e maestri si associano (Bologna, Parigi)
   → la comunità decide come si impara (lectio, quaestio, disputatio) → Tommaso distingue le autorità → gli statuti fissano chi può
   insegnare → autorità e autorevolezza → ritorno alla domanda. Ogni lead riprende la scena precedente e apre la nuova.
   Contenuti dal fascicolo di studio della lezione (iii-1-2-…-fascicolo.pdf) e dall'artefatto del 4 ottobre 2026, che seguono il
   dossier docente/III 1-2 chi-puo-insegnare-a-chi-contenuti.md (Università di Bologna; Statuti di Courçon 1215 e di Gregorio IX 1231,
   Internet Medieval Sourcebook; Summa theologiae I, q. 1, a. 8, Corpus Thomisticum; Treccani). Traduzioni dal latino: redazionali.
   Il caso della testimonianza scritta è immaginario e lo dice sullo schermo.
   Componente proprio: «Disputa» (lectio → quaestio → disputatio → distinctio → risposta). CSS nel file omonimo .css.
   Nessun dato viene raccolto, salvato o trasmesso: scelte e voti restano solo nella pagina aperta.
   © Matteo Sestili — Tutti i diritti riservati */
window.LEZIONE = {
  slug: 'iii-1-2-chi-puo-insegnare-a-chi',
  classe: 'Anno III',
  titolo: 'Chi può *insegnare* a chi?',
  sottotitolo: 'La nascita delle università tra fede, sapere e discussione.',
  saluto: 'Ultima tappa: allora, chi può insegnare a chi?',

  glossario: {
    'scuola': { etim: 'dal latino *schola*, dal greco *scholḗ*: in origine il libero uso delle proprie forze, soprattutto spirituali, senza uno scopo pratico; poi il luogo dello studio (Treccani)', def: 'Il luogo dove ci si dedica allo studio. Nel Medioevo latino le scuole dei monasteri e delle cattedrali preparano il terreno alle università.' },
    'università': { etim: 'dal latino *universitas*, «totalità», da *universus*, «tutto intero», composto di *unus*, «uno», e *versus*, «volto» (Treccani)', def: 'Nel Medioevo indica una corporazione, cioè un insieme di persone associate. A Bologna, nell’ultimo quarto del XII secolo, la parola si applica alla corporazione degli studenti. Non un edificio, né «tutte le materie».' },
    'corporazione': { etim: 'dal latino tardo *corporatio*, da *corporare*, «formare un corpo» (Treccani)', def: 'Persone che si uniscono per tutelare interessi comuni e raggiungere fini comuni: mercanti, artigiani, e anche studenti o maestri.' },
    'natio': { parola: 'nationes', etim: 'plurale del latino *natio*, «nascita, popolo», da *nasci*, «nascere»', def: 'A Bologna, i gruppi di studenti riuniti secondo la provenienza; confluirono poi in corporazioni più ampie, le *universitates*.' },
    'diritto romano': { etim: 'dal latino *directum*, «ciò che è diritto, conforme alla regola»', def: 'Il diritto dell’antica Roma, raccolto per ordine dell’imperatore Giustiniano nel VI secolo (*Corpus iuris civilis*). A Bologna lo si studia e lo si commenta parola per parola.' },
    'diritto canonico': { etim: '*canonico* dal latino *canonicus*, dal greco *kanṓn*, «regola»', def: 'Le norme che regolano la vita e l’organizzazione della Chiesa. A Bologna nasce una scuola di diritto canonico a metà del XII secolo, legata ai discepoli del monaco Graziano.' },
    'data convenzionale': { etim: '*convenzionale* dal latino *conventio*, «accordo», da *convenire*, «venire insieme»', def: 'Una data scelta di comune accordo per ricordare un processo graduale. Non è falsa né arbitraria: semplicemente non indica un atto di fondazione.' },
    'bolla': { etim: 'dal latino *bulla*, che in età tarda significò anche «sigillo» (Treccani)', def: 'Documento solenne del papa, chiamato così dal sigillo di metallo appeso al testo. Si cita con le prime parole: *Parens scientiarum*, 1231.' },
    'scolastica': { etim: 'dal latino *scholasticus*, «della scuola», da *schola*', def: 'L’insieme delle pratiche di insegnamento e di ricerca delle scuole medievali: *lectio*, *quaestio*, *disputatio*. Non una dottrina unica condivisa da tutti i maestri.' },
    'lectio': { etim: 'latino, «lettura», da *legere*, «leggere, raccogliere»', def: 'La lettura spiegata: il maestro commenta un testo autorevole e ne chiarisce i passaggi difficili.' },
    'quaestio': { etim: 'latino, da *quaerere*, «cercare, chiedere»: lo stesso verbo di *quaerere Deum*, «cercare Dio»', def: 'Una difficoltà incontrata nel testo, trasformata in domanda da esaminare: «Se…» (*utrum*).' },
    'disputatio': { etim: 'latino, da *disputare*, composto di *dis-* e *putare*, «valutare, stimare»', def: 'Una discussione regolata: si presentano argomenti e obiezioni, poi il maestro dà una soluzione motivata e risponde alle obiezioni.' },
    'distinzione': { etim: 'dal latino *distinctio*, da *distinguere*, «separare, distinguere»', def: 'Nella disputa, la mossa che precisa in quale senso una tesi vale e in quale no: così l’obiezione trova il suo posto.' },
    'statuto': { etim: 'dal latino tardo *statutum*, «ciò che è stabilito», da *statuere*, «stabilire»', def: 'L’insieme delle regole che organizzano un’istituzione.' },
    'legato pontificio': { etim: '*legato* dal latino *legatus*, «inviato», da *legare*, «mandare con un incarico»', def: 'Un inviato del papa, con il potere di rappresentarlo. Robert de Courçon lo era a Parigi nel 1215.' },
    'licenza': { etim: 'dal latino *licentia*, «permesso», da *licet*, «è lecito»', def: 'Il permesso di insegnare (*licentia docendi*), concesso dopo un esame; a Parigi la rilasciava il cancelliere.' },
    'arti': { etim: 'dal latino *ars*, «abilità, tecnica»', def: 'Le arti liberali: discipline di formazione come grammatica e logica, base degli studi superiori. Non le arti figurative.' },
    'autorità': { etim: 'dal latino *auctoritas*, derivato di *auctor*, «autore»; propriamente «legittimità» (Treccani)', def: 'Anche un ruolo che permette di decidere o di insegnare. Da solo non rende vera ogni frase di chi lo ricopre.' },
    'autorevolezza': { etim: 'da *autorevole*, derivato di *autore*', def: 'In questa lezione: la fiducia motivata che si riconosce a chi mostra preparazione e sa spiegare le proprie ragioni.' },
    'maestro': { etim: 'dal latino *magister*, derivato di *magis*, «più»', def: 'Nel Medioevo, chi è riconosciuto per insegnare dopo un percorso di studio e un esame.' },
    'studente': { etim: 'dal latino *studens*, participio di *studere*, «applicarsi con impegno»', def: 'Chi segue un percorso di apprendimento; a Bologna anche protagonista dell’organizzazione dello studio.' }
  },

  scene: [
    /* 1 · AGGANCIO: la domanda ------------------------------------------------------- */
    { fase: 'Aggancio', momento: 'Apertura', minuti: 3, titolo: 'Chi può *insegnare* a chi?',
      lead: 'Un maestro può conoscere molti libri e spiegare male; uno studente può porre una domanda che il maestro non si era posto.',
      blocchi: [
        { tipo: 'domanda', id: 'ingresso', etichetta: 'Anonimo · per alzata di mano',
          q: 'Chi dovrebbe decidere se una persona può insegnare?',
          opzioni: ['Un’autorità che la nomina', 'Gli studenti che la ascoltano', 'Colleghi esperti, con un esame', 'Nessuno: conta solo se spiega bene'],
          dibattito: 'Le università medievali hanno messo alla prova, in modi diversi, quasi tutte queste risposte: oggi seguiamo come sono nate e che cosa resta della loro soluzione. Alla fine rifaremo la stessa domanda e confronteremo i voti.' }
      ] },

    /* 2 · ANELLO 1: cercare Dio chiede di imparare --------------------------------- */
    { fase: 'Scoperta', momento: 'Fonte · 2008', minuti: 4, titolo: 'Cercare Dio chiede di *imparare*',
      lead: 'Per rispondere partiamo da una pratica più antica delle università: leggere insieme un testo che si considera importante.',
      blocchi: [
        { tipo: 'citazione', testo: 'La ricerca di Dio richiede quindi per intrinseca esigenza una cultura della parola…',
          fonte: 'Benedetto XVI, discorso al Collège des Bernardins, Parigi, 12 settembre 2008',
          commento: 'È una lettura **dall’interno** della fede: se Dio parla anche con parole umane, chi lo cerca deve imparare a leggerle. **Per questo** monasteri e scuole delle cattedrali coltivano lingua, lettura e biblioteche. Non dice che ogni scuola sia nata dal cristianesimo.' },
        { tipo: 'parola', parola: 'Scuola', radice: 'sc', origine: 'Dal latino schola, dal greco scholḗ',
          significato: 'In origine *scholḗ* era il **tempo libero**: l’uso libero delle proprie forze, soprattutto dello spirito, senza uno scopo pratico. Poi è diventata il luogo dove ci si dedica allo studio.',
          battuta: 'Studiare era tempo liberato, non tempo perso.' },
        { tipo: 'aggancio', etichetta: 'Con onestà', titolo: 'Scuole e maestri c’erano già prima',
          t: 'Scuole e maestri esistevano nell’antichità greca e romana e in altre civiltà. Il cristianesimo non inventa lo studio: gli dà una ragione in più e luoghi stabili in cui custodirlo.' }
      ] },

    /* 3 · ANELLO 2: le città hanno bisogno di competenze ---------------------------- */
    { fase: 'Scoperta', minuti: 4, titolo: 'Le città chiedono *competenze*',
      lead: 'Le scuole da sole non spiegano le università: che cosa cambia fra XI e XIII secolo?',
      blocchi: [
        { tipo: 'animazione', id: 'convergenza', rapporto: 1.9, pulsante: 'Avvia l’animazione',
          attori: [
            { id: 'scuole', t: 'Scuole', forma: 'pillola', colore: 'oro' },
            { id: 'citta', t: 'Città', forma: 'pillola', colore: 'ciano' },
            { id: 'diritto', t: 'Diritto', forma: 'pillola', colore: 'rosa' },
            { id: 'testi', t: 'Traduzioni', forma: 'pillola', colore: 'verde' },
            { id: 'studio', t: 'Studenti e maestri', forma: 'cerchio', colore: 'accent' }
          ],
          frecce: [
            { id: 'f1', da: 'scuole', a: 'studio' }, { id: 'f2', da: 'citta', a: 'studio' },
            { id: 'f3', da: 'diritto', a: 'studio' }, { id: 'f4', da: 'testi', a: 'studio' }
          ],
          passi: [
            { didascalia: 'Prima condizione: le **scuole** di monasteri e cattedrali insegnano a leggere e a ragionare.', attori: { scuole: { x: 18, y: 22, on: true }, citta: { x: 82, y: 22 }, diritto: { x: 18, y: 78 }, testi: { x: 82, y: 78 } } },
            { didascalia: 'Crescono **città** e commerci: contratti, proprietà e liti chiedono persone capaci di interpretare testi e norme.', attori: { scuole: { on: false }, citta: { x: 82, y: 22, on: true } } },
            { didascalia: 'Si studiano il **diritto romano** e il **diritto canonico**: a Bologna diventano una calamita.', attori: { citta: { on: false }, diritto: { x: 18, y: 78, on: true } } },
            { didascalia: 'Arrivano **testi tradotti** dal greco e dall’arabo, con le riflessioni di autori arabi ed ebrei.', attori: { diritto: { on: false }, testi: { x: 82, y: 78, on: true } } },
            { didascalia: 'Tutto converge: **studenti e maestri** si raccolgono in una città. Nessuna causa, da sola, basta.', attori: { testi: { on: false }, studio: { x: 50, y: 50, on: true, s: 1.05 } }, frecce: ['f1', 'f2', 'f3', 'f4'] }
          ] },
        { tipo: 'verifica', q: 'Perché studenti e maestri si raccolgono a Bologna?',
          opzioni: ['Perché un papa vi fonda un’università', 'Perché vi convergono più fattori: scuole, città, diritto, testi', 'Perché era l’unica città con una cattedrale'], ok: 1,
          why: 'Le cause sono più d’una. La fede dà allo studio una ragione e dei luoghi; le città e il diritto creano il bisogno di competenze; le traduzioni portano nuovi testi. Nessun atto di fondazione.' }
      ] },

    /* 4 · ANELLO 3: Bologna, l'universitas ------------------------------------------- */
    { fase: 'Scoperta', minuti: 4, titolo: 'Bologna: prima vengono gli *studenti*',
      lead: 'Quando molti studenti arrivano in una città servono organizzazione e tutele: a Bologna se le danno gli studenti.',
      testo: 'Si associano prima per provenienza, nelle *nationes*, poi in corporazioni più ampie, le *universitates*: dettano gli scopi dell’insegnamento, ne controllano l’attuazione e, all’inizio, pagano direttamente i maestri.',
      blocchi: [
        { tipo: 'etimo', parola: 'Università', etim: 'dal latino *universitas*, «totalità», da *universus*, «tutto intero» (Treccani)',
          def: 'Nel Medioevo, una corporazione di persone associate.',
          parti: [ { t: 'unus', d: '«uno»' }, { t: 'versus', d: '«volto», da *vertere*' }, { t: 'universitas', d: '«totalità»; nel Medioevo «corporazione»' } ], nessi: ['+', '→'],
          spiegazione: '*Universus* è ciò che è volto tutto insieme, tutto intero; *universitas* la totalità. Nel Medioevo la parola indica una **corporazione**: a Bologna, nell’ultimo quarto del XII secolo, quella degli studenti. Non un edificio, né «tutte le materie».' },
        { tipo: 'verifica', q: 'Il 1088, «anno di nascita» dell’Università di Bologna, è…',
          opzioni: ['l’anno di una bolla papale di fondazione', 'l’anno in cui il Comune firmò l’atto di fondazione', 'una data convenzionale, scelta per origini graduali'], ok: 2,
          why: 'Non esiste un atto di fondazione: lo Studio nasce per iniziativa di studenti. Una data convenzionale non è falsa: distingue il processo dalla data con cui lo si ricorda.' },
        { tipo: 'aggancio', etichetta: 'Per capire', titolo: 'Chi protegge uno studente lontano da casa?',
          t: 'Nel 1155 l’imperatore Federico Barbarossa, con la *Constitutio Habita*, prende sotto la sua protezione gli studenti e li dichiara liberi da qualunque potere politico: così la ricostruisce l’Ateneo di Bologna.',
          fonte: 'Università di Bologna, «La nascita dello Studio e del Comune»' }
      ] },

    /* 5 · ANELLO 3: Parigi, i maestri ------------------------------------------------ */
    { fase: 'Scoperta', minuti: 3, titolo: 'Parigi: una comunità di *maestri*',
      lead: 'A Bologna si sono associati gli studenti. A Parigi la stessa domanda, chi organizza lo studio, riceve un’altra risposta: si associano i maestri.',
      testo: 'L’iniziativa viene soprattutto dai maestri delle scuole cittadine; re e papi ne riconoscono e ne regolano la vita. Nel 1231 la bolla *Parens scientiarum* di Gregorio IX riconosce ai maestri il diritto di darsi {statuti|statuto}.',
      blocchi: [
        { tipo: 'confronto', a: 'Bologna', b: 'Parigi', pulsante: 'Inizia il confronto',
          righe: [
            { criterio: 'Chi si associa', a: 'Soprattutto gli **studenti**, per provenienza', b: 'Soprattutto i **maestri** delle scuole cittadine' },
            { criterio: 'Studi più forti', a: 'Diritto romano e canonico', b: 'Arti e teologia' },
            { criterio: 'Chi riconosce', a: 'L’imperatore: *Constitutio Habita*, 1155', b: 'Il re (1200), il legato del papa (1215), il papa (1231)' },
            { criterio: 'Data simbolo', a: '1088, convenzionale', b: 'Nessuna: una serie di riconoscimenti' }
          ],
          domanda: 'Due strade diverse: per questo non esiste un’unica «scena di fondazione». Ma in entrambe una comunità deve decidere anche **come** si impara.' }
      ] },

    /* 6 · ANELLO 4: il metodo, componente proprio ------------------------------------ */
    { fase: 'Scoperta', minuti: 6, titolo: 'Un’obiezione, una *distinzione*',
      lead: 'Una comunità di studio, comunque sia organizzata, deve decidere anche **come** si impara. Il metodo delle scuole medievali parte da un testo autorevole e da un’obiezione.',
      testo: 'Il metodo delle scuole ha un nome, *scolastica*, e le mosse che vedete in alto: si legge un testo, una difficoltà diventa una {quaestio}, si discute, il maestro {distingue|distinzione}. Provatelo su un caso.',
      blocchi: [
        { tipo: 'custom', nome: 'Disputa', props: {
          etichetta: 'Caso immaginario',
          tesi: '«Ogni testimonianza scritta merita fiducia.»',
          obiezione: '«Ma anche una menzogna può essere messa per iscritto.»',
          quaestio: '*Utrum*… Se ogni testimonianza scritta meriti fiducia.',
          domanda: 'Il maestro ha tre strade. Quale risponde davvero all’obiezione?',
          scelte: [
            { t: '«Il maestro sono io: si fa come dico.»', esito: 'Il ruolo chiude la discussione, ma **non risponde** all’obiezione: la difficoltà resta dov’era.' },
            { t: '«Allora nessuna testimonianza scritta vale nulla.»', esito: 'Da un eccesso all’altro: l’obiezione colpiva una frase **troppo generale**, non ogni testimonianza.' },
            { t: '«Distinguo: dipende da come la testimonianza è controllata.»', ok: true, esito: 'Né zittire né cedere: il maestro **precisa** la tesi, e l’obiezione trova il suo posto.' }
          ],
          rami: [
            { t: 'Testimonianza controllata', d: 'Se ne verificano provenienza e contenuto, e la si confronta con altre fonti.', nota: 'Qui la tesi regge.' },
            { t: 'Testimonianza soltanto scritta', d: 'Nessuno ne ha controllato origine e contenuto.', nota: 'Qui vale l’obiezione.' }
          ],
          risposta: 'Merita fiducia la testimonianza **controllata**. La domanda non ha reso inutile il maestro: lo ha obbligato a **spiegare meglio**. Ma anche lo studente ha dovuto portare una ragione: contraddire senza argomenti non è ancora ricerca.',
          battute: [null, 'Un’obiezione non è un insulto: è una domanda con una ragione.', 'Tre strade. Solo una fa avanzare la ricerca.', null, 'Così si impara insieme, maestro e studente.'] } }
      ] },

    /* 7 · ANELLI 4 e 6: Tommaso, la fonte -------------------------------------------- */
    { fase: 'Scoperta', momento: 'Fonte · Summa theologiae', minuti: 4, titolo: 'Tommaso e l’argomento più *debole*',
      lead: 'Il caso era immaginario. Tommaso d’Aquino, maestro a Parigi, fa la stessa mossa in un testo vero, e proprio sull’autorità.',
      testo: 'Nella *Summa theologiae* si chiede se la teologia possa argomentare. Un’obiezione cita un autore antico, Boezio: l’argomento fondato sull’autorità è il più debole. Ecco la risposta: cercate la frase in cui Tommaso distingue.',
      blocchi: [
        { tipo: 'leggi', q: 'In quale frase Tommaso risponde a Boezio distinguendo due tipi di autorità?',
          fonte: 'Tommaso d’Aquino, Summa theologiae I, q. 1, a. 8, ad 2, che cita Agostino, Lettera 82, 1, 3 (testo latino: Corpus Thomisticum; traduzione redazionale, con tagli)',
          testo: '[[Argomentare a partire dall’autorità è massimamente proprio di questa dottrina, perché i suoi principi si ricevono per rivelazione.::È la **tesi**: in teologia i principi si ricevono per rivelazione, quindi si parte da un’autorità. Ma non risponde ancora a Boezio.]]\n\n[[!Benché l’argomento tratto da un’autorità fondata sulla ragione umana sia il più debole, quello tratto da un’autorità fondata sulla rivelazione divina è il più efficace.::È la **distinzione**: Boezio ha ragione per le autorità soltanto umane, non per la rivelazione. L’obiezione trova il suo posto, la tesi resta. Per chi crede, l’autorità della rivelazione è quella di Dio che parla.]]\n\n[[La sacra dottrina usa però anche la ragione umana, non per provare la fede, ma per chiarire altre cose che vi si insegnano: la grazia, infatti, non toglie la natura, ma la perfeziona.::È il **compito della ragione**: non dimostrare la fede, ma chiarirla. Segue la distinzione, non la compie.]] […]\n\nE cita Agostino, che scrive a Girolamo: [[“gli altri autori li leggo così: per quanto eccellano per santità e dottrina, non ritengo vera una cosa perché essi l’hanno pensata o scritta”::È la **conseguenza** per i maestri umani: santità e dottrina meritano rispetto, ma non bastano a rendere vera una frase: l’{autorevolezza} si fonda sulle ragioni.]]' }
      ] },

    /* 8 · PAUSA GIOCO: Sfida a squadre ----------------------------------------------- */
    { fase: 'Attività', momento: 'Pausa gioco', minuti: 7, titolo: 'Sfida a *squadre*',
      lead: 'Dalle scuole alla disputa: otto domande, poi chi autorizza il maestro.',
      blocchi: [
        { tipo: 'gioco', id: 'sfida', titolo: 'Sfida a squadre', testo: 'Due squadre, venti secondi a domanda; se una sbaglia, l’altra può rubare.', pulsante: 'Si gioca' },
        { tipo: 'mascotte', t: 'Un indizio: una data convenzionale non è una fondazione, e un’obiezione non è un insulto.' }
      ] },

    /* 9 · ANELLO 5: requisiti, tutele, limiti --------------------------------------- */
    { fase: 'Attività', momento: 'Fonte · Parigi, 1215', minuti: 5, titolo: 'Chi autorizza il *maestro*?',
      lead: 'Per Tommaso l’autorità di un uomo vale quanto le sue ragioni; ma la comunità deve saper distinguere una competenza reale da una pretesa: per questo gli statuti fissano chi può insegnare.',
      testo: 'Gli {statuti|statuto} sono le regole di un’istituzione. Prima che i maestri possano darsene di propri (1231), a Parigi li promulga nel 1215 Robert de Courçon, legato pontificio (l’inviato del papa): stabiliscono chi può ricevere la licenza di insegnare le arti, le discipline di base come grammatica e logica.',
      blocchi: [
        { tipo: 'stima', etichetta: 'Stima della classe', q: 'Parigi, 1215: da che età si potevano insegnare le arti?', min: 12, max: 40, passo: 1, valore: 20, tolleranza: 2, unita: 'anni',
          why: 'Lo statuto chiede almeno **vent’anni** e almeno **sei anni** di studio nelle arti. Per insegnare teologia: almeno trentacinque anni e otto di studio.',
          fonte: 'Statuti di Robert de Courçon, 1215 (trad. Univ. of Pennsylvania, Internet Medieval Sourcebook)' },
        { tipo: 'smista', titolo: 'Requisito, tutela o limite?', categorie: ['Requisito', 'Tutela', 'Limite'],
          voci: [
            { t: 'Aver ascoltato lezioni nelle arti per almeno sei anni', c: 0, why: 'È un **requisito**: la competenza si costruisce e si verifica prima di insegnare.' },
            { t: 'Nessuna licenza ottenuta con denaro, pegni o accordi', c: 1, why: 'È una **tutela**: protegge l’insegnamento dalla corruzione. Il posto non si compra.' },
            { t: 'Non leggere i libri di Aristotele di metafisica e filosofia naturale', c: 2, why: 'È un **limite** ai contenuti: l’autorità ecclesiastica sostiene lo studio e insieme lo delimita. Un divieto dice che cosa si prescrive, non che tutti lo rispettassero.' },
            { t: 'Accordi fra maestri e studenti se uno studente viene ferito e non si fa giustizia', c: 1, why: 'È una **tutela**: la comunità si organizza per difendere i suoi membri.' }
          ],
          chiusura: 'Requisiti, tutele e limiti stanno nello **stesso testo**: l’autorità ecclesiastica sostiene lo studio e insieme lo delimita. Il divieto non fu immutabile: nel 1231 Gregorio IX stabilisce che i libri di filosofia naturale non si usino finché non siano esaminati e liberati da ogni sospetto di errore.' },
        { tipo: 'aggancio', etichetta: 'Per capire', titolo: 'Chi poteva studiare?',
          t: 'Servivano il latino e i mezzi per vivere lontano da casa. A Parigi alcuni benefattori fondarono collegi che davano vitto e alloggio a studenti poveri: quello di Robert de Sorbon, a metà del Duecento, ha dato il nome alla Sorbona. Un aiuto vero, non ancora un accesso per tutti.',
          fonte: 'Chancellerie des Universités de Paris, «The Sorbonne in the Middle Ages»' }
      ] },

    /* 10 · ANELLO 6: autorità e autorevolezza, laboratorio --------------------------- */
    { fase: 'Attività', momento: 'Laboratorio', minuti: 5, titolo: 'Autorità o *autorevolezza*?',
      lead: 'Requisiti, tutele e limiti dicono chi ha l’{autorità} di insegnare, non ancora quando fidarsi di ciò che insegna.',
      blocchi: [
        { tipo: 'carte', carte: [
          { fronte: 'Autorità', etichetta: 'Il ruolo', retro: 'Il posto che permette di decidere o di insegnare: viene da una nomina, da un esame, da un riconoscimento. Da solo non rende vera ogni frase.' },
          { fronte: 'Autorevolezza', etichetta: 'La fiducia', retro: 'La fiducia **motivata** che si dà a chi mostra preparazione e sa spiegare le sue ragioni. Si guadagna e si può verificare.' },
          { fronte: 'Obiezione', etichetta: 'La domanda', retro: 'Una difficoltà **con una ragione**. Non basta contraddire: anche chi obietta deve portare argomenti o fonti.' }
        ] },
        { tipo: 'varianti', istruzione: 'Una sola attività, a scelta: tutte portano alla stessa distinzione.', opzioni: [
          { nome: 'Due voci, un documento', durata: '4 min', descrizione: 'Un ospite famoso e uno studente con un documento: scegliete e guardate che cosa succede.',
            quando: 'Classe che ha bisogno di un caso concreto e veloce.', blocchi: [
            { tipo: 'bivio', etichetta: 'Un caso, tre strade',
              caso: 'Durante una conferenza un ospite molto noto afferma che l’Università di Bologna fu fondata da un papa nel 1088. Non cita fonti. Uno studente obietta e mostra la pagina storica dell’Ateneo, che parla di una data convenzionale.',
              scelte: [
                { t: 'Si crede all’ospite: è famoso ed esperto', tono: 'ko', esito: 'La fama è un indizio di competenza, non una prova. Su **questo** punto l’ospite non porta ragioni, e la fonte dice altro.' },
                { t: 'Si crede allo studente: chi obietta ha sempre ragione', tono: 'neutro', esito: 'Questa volta la fonte gli dà ragione, ma **non** perché è studente o perché obietta: perché porta un documento pertinente. Su altri temi l’ospite può saperne molto di più.' },
                { t: 'Si esamina la fonte e si chiedono all’ospite le sue ragioni', tono: 'ok', esito: 'È il metodo della disputa: si confrontano gli argomenti. Il documento chiarisce il punto, e nessuno viene umiliato.' }
              ],
              chiusura: 'Con la distinzione di Tommaso: l’autorità soltanto umana è l’argomento più debole. Conta ciò che **ragioni e fonti** mostrano; la competenza resta un buon motivo per ascoltare.' } ] },
          { nome: 'Pesare le ragioni', durata: '4 min', descrizione: 'Mettete sulla bilancia le ragioni per fidarsi del maestro e quelle per accogliere un’obiezione.',
            quando: 'Classe che ama discutere: fate motivare ogni peso.', blocchi: [
            { tipo: 'bilancia', libero: true, piatti: ['Mi fido del maestro', 'Accolgo l’obiezione'], argomenti: [
              { t: 'Ha studiato a lungo ed è stato esaminato', lato: 0, nota: 'È la ragione degli statuti: la competenza si verifica **prima** di insegnare.' },
              { t: 'Nessuno può ricontrollare da solo ogni sapere', lato: 0, nota: 'Imparare richiede una **fiducia ragionevole** nel lavoro altrui.' },
              { t: 'L’obiezione indica una fonte precisa', lato: 1, nota: 'Una fonte pertinente si può controllare: va esaminata, chiunque la porti.' },
              { t: 'La tesi del maestro era troppo generale', lato: 1, nota: 'È il caso della testimonianza scritta: il maestro deve **distinguere**.' }
            ], domanda: 'La bilancia non decide da sola: in quale caso concreto pesano di più le ragioni di destra? E quelle di sinistra?' } ] },
          { nome: 'Disputa lampo', durata: '4 min', descrizione: 'A coppie: costruite una piccola *quaestio* in quattro mosse.',
            quando: 'Classe autonoma che lavora bene a coppie.', blocchi: [
            { tipo: 'consegna', titolo: 'Una quaestio in quattro mosse', modalita: 'Coppie', minuti: 3,
              passi: ['Questione: «Se gli studenti possano valutare un insegnante».', 'Sembra che… scrivete un’obiezione con la sua ragione.', 'Ma in contrario… scrivete un argomento opposto.', 'Rispondo distinguendo: in che senso sì, in che senso no?'],
              prodotto: 'quattro righe per coppia; due coppie le leggono alla classe.', fine: 'Tempo! Chi ha trovato una buona distinzione?' } ] }
        ] }
      ] },

    /* 11 · CHIUSURA: prova ------------------------------------------------------------ */
    { fase: 'Chiusura', momento: 'Prova', minuti: 3, titolo: 'Rimettete in fila il *percorso*',
      lead: 'Dal cercare Dio all’autorevolezza: i sei passaggi di oggi. Rimetteteli in fila; poi un caso nuovo.',
      blocchi: [
        { tipo: 'ordina', q: 'Dal cercare Dio all’autorevolezza: in che ordine?',
          voci: [
            'Chi cerca Dio nelle Scritture deve imparare a leggere e capire',
            'Le città hanno bisogno di chi sa interpretare testi e norme',
            'Studenti e maestri si associano: nasce l’universitas',
            'Le difficoltà dei testi diventano questioni da discutere',
            'Si fissano requisiti per insegnare, e anche limiti',
            'Ci si fida di chi mostra competenza e ragioni'
          ],
          why: 'Ogni passaggio prepara il successivo: lo studio dei testi crea maestri e scuole; il bisogno di competenze raduna le persone; la comunità si dà un metodo e delle regole; e così l’autorità può diventare autorevolezza.' },
        { tipo: 'verifica', etichetta: 'Ultima domanda',
          q: 'Un compagno dice: «Nel 1088 un papa fondò l’università di Bologna; quindi un maestro medievale poteva insegnare qualunque cosa». Che cosa non va?',
          opzioni: ['Entrambe le affermazioni: le origini sono graduali e gli statuti limitavano anche i libri', 'Solo la data: la fondazione avvenne nel 1155', 'Nulla: lo dicono le fonti'], ok: 0,
          why: 'Il 1088 è una data convenzionale: nessun papa fondò lo Studio, nato per iniziativa degli studenti. E lo statuto parigino del 1215 vietava alcuni libri di Aristotele: la libertà di ricerca di oggi non va proiettata sul Medioevo.' }
      ] },

    /* 12 · CHIUSURA: ritorno alla domanda --------------------------------------------- */
    { fase: 'Chiusura', minuti: 2, titolo: 'Torniamo alla *domanda*',
      lead: 'Il percorso è in fila. Ora, con le parole di oggi, torniamo alla domanda dell’inizio: votate di nuovo.',
      blocchi: [
        { tipo: 'domanda', id: 'uscita', confronta: 'ingresso', etichetta: 'Di nuovo, a fine lezione',
          q: 'Chi dovrebbe decidere se una persona può insegnare?',
          opzioni: ['Un’autorità che la nomina', 'Gli studenti che la ascoltano', 'Colleghi esperti, con un esame', 'Nessuno: conta solo se spiega bene'],
          dibattito: 'La risposta medievale tiene insieme **preparazione verificata, riconoscimento e discussione**. Ora a voce: perché uno studente può fare un’obiezione giusta senza diventare per questo più competente del maestro?' },
        { tipo: 'idee', idee: [
          'Le università nascono da più fattori: lo studio legato alla fede, i bisogni delle città, il diritto, i testi tradotti.',
          '*Universitas* è una comunità di persone associate, non un edificio; il 1088 è una data convenzionale.',
          'Insegnare richiede preparazione verificata; imparare richiede fiducia ragionevole e domande con ragioni.'
        ] }
      ] }
  ],

  studio: {
    sezioni: [
      { titolo: 'La domanda', testo: 'Un maestro può conoscere molti libri e spiegare male. Uno studente può porre una domanda che il maestro non si era posto. Chi ha dunque il diritto di insegnare, e chi può mettere alla prova ciò che viene insegnato? La nascita delle università medievali mostra come queste domande abbiano preso una forma stabile: una comunità in cui preparazione, riconoscimento e discussione rendono possibile trasmettere il sapere.' },
      { titolo: 'Cercare Dio richiede di imparare', testo: 'Il percorso comincia da una pratica più antica: leggere insieme un testo che si considera importante. Nel cristianesimo la fede passa anche attraverso le Scritture, e comprenderle richiede di conoscere le parole, distinguere i significati e spiegare ciò che a una prima lettura rimane oscuro. **Per questo** nei monasteri la ricerca di Dio ha favorito biblioteche, studio della lingua e formazione; accanto a essi, le scuole delle cattedrali hanno preparato persone capaci di leggere, ragionare e svolgere compiti ecclesiastici. Benedetto XVI lo ha espresso così: «La ricerca di Dio richiede quindi per intrinseca esigenza una cultura della parola» (discorso al Collège des Bernardins, 12 settembre 2008).\n\nÈ una lettura dall’interno della fede: se Dio si rivolge all’uomo anche mediante parole umane, chi lo cerca deve imparare a comprenderle. Non prova che ogni forma di istruzione sia nata dal cristianesimo: scuole e maestri esistevano già nell’antichità e in altre civiltà.\n\nAnche la parola **scuola** ha una storia: viene dal latino *schola*, dal greco *scholḗ*, che in origine indicava il libero uso delle proprie forze, soprattutto spirituali, senza uno scopo pratico, e più tardi il luogo dove ci si dedica allo studio.' },
      { titolo: 'Le città hanno bisogno di competenze', testo: 'La rete delle scuole è una condizione, ma da sola non spiega le università. Fra XI e XIII secolo la crescita delle città e degli scambi rende più complessa la vita dell’Europa occidentale: un contratto, una controversia su una proprietà, l’amministrazione di una comunità richiedono persone capaci di interpretare testi e norme. Anche la Chiesa ha bisogno di uomini preparati.\n\nSi studia il **diritto romano**, raccolto nel VI secolo per ordine dell’imperatore Giustiniano, e il **diritto canonico**, che regola la vita e l’organizzazione della Chiesa: due materie diverse, la prima ereditata dall’esperienza giuridica romana, la seconda sviluppata con norme e decisioni ecclesiastiche. A Bologna gli studi giuridici diventano un forte centro di attrazione.\n\nInoltre l’Europa latina riceve nuovi testi filosofici e scientifici attraverso le traduzioni, dal greco e dall’arabo, insieme alle riflessioni originali di autori arabi ed ebrei. **Quindi** le università non hanno una causa sola: motivazioni religiose, bisogni delle città, diritto e scambi culturali si incontrano.' },
      { titolo: 'Bologna: una comunità prima di una data', testo: 'Quando molti studenti raggiungono una città per seguire certi maestri, sorgono problemi che una lezione non risolve: chi organizza l’insegnamento, chi tutela chi vive lontano da casa, quali regole valgono con la città. A Bologna gli studenti si associano: prima secondo la provenienza, nelle *nationes*, poi in corporazioni più ampie, le *universitates*. Secondo la ricostruzione dell’Ateneo, queste associazioni dettavano gli scopi dell’insegnamento e ne controllavano l’attuazione, e i maestri erano pagati direttamente dagli studenti. Nel 1155 l’imperatore Federico Barbarossa, con la *Constitutio Habita*, prese gli studenti sotto la sua protezione.\n\nLa parola **università** viene dal latino *universitas*, «totalità», da *universus*, «tutto intero» (composto di *unus*, «uno», e *versus*, «volto»). Nel Medioevo indica una **corporazione**, cioè un insieme di persone associate; a Bologna, nell’ultimo quarto del XII secolo, la parola si applica alla corporazione degli studenti. Non significa anzitutto un edificio, né l’insieme di tutte le materie.\n\nIl **1088** è una **data convenzionale**: rappresenta origini graduali e non corrisponde a un atto di fondazione documentato. Nel 1888, celebrando l’ottavo centenario, Giosuè Carducci disse che la scuola di Bologna «si compose per movimento proprio, sorse e grandeggiò privata», e ammise che l’anniversario era artificioso. Convenzionale non significa falso: distingue il processo storico dalla data con cui lo si commemora.' },
      { titolo: 'Parigi: una comunità di maestri', testo: 'A Parigi la stessa domanda, chi organizza lo studio, riceve un’altra risposta. L’università si forma in stretto rapporto con le scuole cittadine e con la comunità dei maestri. Re e papi ne riconoscono e regolano la vita: un diploma di Filippo Augusto nel 1200, gli statuti del legato pontificio nel 1215, la bolla *Parens scientiarum* di Gregorio IX nel 1231. Quest’ultima riconosce ai maestri il diritto di darsi statuti su lezioni, dispute, abito e sepoltura, e di sospendere le lezioni se un torto grave non viene riparato entro quindici giorni dall’ammonizione. Bologna e Parigi mostrano strade diverse: non esiste un’unica scena di fondazione. **Ma** in entrambe la comunità deve decidere anche come si impara.' },
      { titolo: 'Leggere, domandare, discutere', testo: 'Una comunità di studio deve stabilire anche **come** si impara. Nelle scuole medievali si sviluppa il metodo della **scolastica** (da *schola*): un insieme di pratiche di insegnamento e ricerca, non una dottrina unica. Nella **lectio**, la lettura spiegata, il maestro commenta un testo autorevole. Quando emerge una difficoltà, essa diventa una **quaestio** (da *quaerere*, «cercare, chiedere»: lo stesso verbo di *quaerere Deum*). Nella **disputatio** si presentano argomenti e obiezioni, e il maestro formula una soluzione motivata. Leggere, domandare e discutere sono collegati: la difficoltà trovata nel testo alimenta la ricerca.\n\nUn esempio **immaginario**. Un maestro afferma che ogni testimonianza scritta merita fiducia. Uno studente osserva che anche una menzogna può essere messa per iscritto. Il maestro non lo zittisce e non rinuncia a tutto: **distingue**. Merita fiducia la testimonianza controllata nella provenienza, nel contenuto e nel confronto con altre fonti; non basta invece che una cosa sia scritta. La domanda non rende inutile il maestro: lo obbliga a spiegare meglio. Anche lo studente, però, ha dovuto portare una ragione: contraddire senza argomenti non è ancora ricerca.' },
      { titolo: 'Tommaso e l’argomento più debole', testo: 'Il caso era immaginario; Tommaso d’Aquino, maestro a Parigi, usa la stessa costruzione in un testo vero, nella *Summa theologiae*. Nella prima questione, articolo 8, si chiede se la teologia possa argomentare. Una delle obiezioni ricorda Boezio: l’argomento fondato sull’autorità è il più debole. Tommaso risponde **distinguendo**: «benché l’argomento tratto da un’autorità fondata sulla ragione umana sia il più debole, quello tratto da un’autorità fondata sulla rivelazione divina è il più efficace» (traduzione redazionale). La teologia parte da principi accolti nella fede e usa la ragione non per provare la fede, ma per chiarire ciò che ne segue e rispondere alle obiezioni, perché «la grazia non toglie la natura, ma la perfeziona».\n\nPer i maestri umani Tommaso cita Agostino, che scrive a Girolamo (Lettera 82, 1, 3): gli altri autori, per quanto eccellano per santità e dottrina, non li ritiene nel vero per il solo fatto che hanno pensato o scritto qualcosa. Per la fede cristiana l’autorità della rivelazione è quella di Dio che parla; quella di un uomo vale quanto le sue ragioni.' },
      { titolo: 'Chi autorizza il maestro, e con quali limiti?', testo: 'Se l’autorità di un uomo vale quanto le sue ragioni, la discussione funziona solo se la comunità distingue una competenza reale da una pretesa. **Per questo** gli **statuti**, cioè le regole che organizzano un’istituzione, fissano chi può insegnare. Quelli promulgati a Parigi nel 1215 da Robert de Courçon, **legato pontificio**, chiedevano a chi voleva insegnare le **arti** (discipline di formazione come grammatica e logica) almeno vent’anni di età, almeno sei anni di studio, una buona reputazione e un esame; per la teologia, almeno trentacinque anni e otto di studio. Vietavano di ottenere la **licenza** d’insegnare con denaro, pegni o accordi, e permettevano a maestri e studenti di accordarsi per difendersi se uno studente veniva ferito e non si faceva giustizia.\n\n**Eppure** lo stesso documento poneva limiti ai libri: ammetteva gli scritti logici di Aristotele, ma vietava allora l’insegnamento delle sue opere di metafisica e di filosofia naturale. Nel 1231 Gregorio IX stabilì che i libri di filosofia naturale non si usassero finché non fossero esaminati e liberati da ogni sospetto di errore. È una tensione interna: l’autorità ecclesiastica sosteneva e regolava lo studio, ma ne delimitava anche alcuni contenuti. Non si può quindi immaginare nel Medioevo la libertà di ricerca di oggi, né leggere quella norma come un divieto eterno di ogni filosofia. E una norma indica ciò che si prescrive: da sola non prova che tutti la rispettassero.\n\nContavano anche le condizioni materiali: servivano il latino e i mezzi per vivere lontano da casa. A Parigi alcuni benefattori fondarono collegi che davano vitto e alloggio a studenti poveri; quello di Robert de Sorbon, a metà del Duecento, ha dato il nome alla Sorbona. Un aiuto reale, non ancora un accesso per tutti.' },
      { titolo: 'Autorità e autorevolezza', testo: 'Requisiti, tutele e limiti dicono chi ha l’autorità di insegnare; non dicono ancora quando fidarsi di ciò che insegna. **Autorità** e **autorevolezza** non coincidono. L’autorità è anche un ruolo che permette di decidere o di insegnare (dal latino *auctoritas*, da *auctor*, «autore»); l’autorevolezza è la fiducia motivata che si riconosce a chi mostra preparazione e sa spiegare le proprie ragioni. Un incarico può favorire l’esercizio di una competenza, ma non rende vera ogni frase di chi lo ricopre. D’altra parte nessuno può ricontrollare da solo ogni sapere: imparare richiede una fiducia ragionevole nel lavoro altrui. E un’obiezione vale per la ragione che porta, non per chi la fa.' },
      { titolo: 'La risposta', testo: 'Chi può dunque insegnare a chi? Nel percorso studiato la risposta tiene insieme **preparazione verificata, riconoscimento e discussione**. Il cristianesimo ha contribuito a fare dello studio una pratica stabile e, insieme a città, diritto, tradizioni antiche e traduzioni, alla nascita delle università. L’eredità non è un’istituzione rimasta identica per secoli, ma un problema ancora riconoscibile: costruire luoghi in cui la competenza si trasmette, le fonti si controllano e le domande si affrontano con ragioni.' }
    ],
    fonti: [
      'Benedetto XVI, Discorso al Collège des Bernardins, Parigi, 12 settembre 2008, vatican.va.',
      'Università di Bologna, «Nove secoli di storia» e «La nascita dello Studio e del Comune (X e XII secolo)», unibo.it.',
      'Robert de Courçon, Statuti per l’Università di Parigi (1215), e Gregorio IX, Statuti per l’Università di Parigi (1231), trad. inglese in University of Pennsylvania, *Translations and Reprints*, vol. II, n. 3, nell’Internet Medieval Sourcebook (Fordham University); parafrasi italiana redazionale.',
      'Tommaso d’Aquino, *Summa theologiae* I, q. 1, a. 8, testo latino nel Corpus Thomisticum (ed. leonina); Agostino, Lettera 82, 1, 3 a Girolamo, citata da Tommaso. Traduzioni redazionali.',
      'Chancellerie des Universités de Paris, «The Sorbonne in the Middle Ages», sorbonne.fr.',
      'J. Marenbon, «Medieval Philosophy», *Stanford Encyclopedia of Philosophy*, §§ 1.3.2–1.3.3.',
      '*Vocabolario Treccani*, voci «università», «universo», «scuola», «questione», «disputa», «autorità», «corporazione», «bolla»; *Enciclopedia Treccani*, voce «Scolastica».'
    ]
  },

  giochi: {
    sfida: [
      { q: 'Perché nei monasteri lo studio della lingua entra nella vita religiosa?', a: ['Per cercare Dio nelle Scritture bisogna capirne le parole', 'Perché i monaci dovevano insegnare il diritto', 'Perché lo richiedevano le università', 'Per copiare libri da vendere'], ok: 0 },
      { q: 'Che cosa indicava la parola universitas nel Medioevo?', a: ['Un edificio con molte aule', 'L’insieme di tutte le materie', 'Una corporazione di persone associate', 'Un titolo di studio'], ok: 2 },
      { q: 'Nelle origini dello Studio di Bologna, chi pagava i maestri?', a: ['Il Comune', 'Il vescovo', 'L’imperatore', 'Gli studenti'], ok: 3 },
      { q: 'Quale materia attirava soprattutto gli studenti a Bologna?', a: ['La medicina', 'Il diritto, romano e canonico', 'L’astronomia', 'La musica'], ok: 1 },
      { q: 'Il 1088 come anno di nascita dell’Università di Bologna è…', a: ['una data convenzionale', 'l’anno di una bolla papale', 'l’anno della Constitutio Habita', 'la data di un atto del Comune'], ok: 0 },
      { q: 'Che cos’è una quaestio?', a: ['Un esame finale', 'Una tassa di iscrizione', 'Una difficoltà del testo trasformata in domanda', 'Un riassunto da imparare a memoria'], ok: 2 },
      { q: 'Davanti a un’obiezione a una tesi troppo generale, il maestro scolastico…', a: ['la respinge per autorità', 'rinuncia alla tesi', 'chiede l’intervento del vescovo', 'distingue in che senso la tesi vale e in che senso no'], ok: 3 },
      { q: 'Per Tommaso d’Aquino l’argomento fondato su un’autorità soltanto umana è…', a: ['il più efficace', 'il più debole', 'l’unico ammesso in teologia', 'vietato'], ok: 1 }
    ],
    quiz: [
      { q: 'Qual è il legame fra ricerca di Dio e studio, secondo Benedetto XVI?', a: ['La ricerca di Dio esige una cultura della parola', 'Lo studio sostituisce la preghiera', 'Dio si conosce solo all’università', 'Ogni scuola è nata nei monasteri'], ok: 0, why: 'Se Dio parla anche con parole umane, chi lo cerca deve imparare a leggerle. È una lettura dall’interno della fede, non la prova che ogni scuola sia nata dal cristianesimo.' },
      { q: 'Che cosa protegge la Constitutio Habita del 1155?', a: ['I mercanti bolognesi', 'Gli studenti, liberi da ogni potere politico', 'I diritti del papa su Bologna', 'Le biblioteche dei monasteri'], ok: 1, why: 'Con essa Federico Barbarossa prende gli studenti sotto la sua protezione: chi studia lontano da casa ha bisogno di tutele.' },
      { q: 'Che cosa riconosce ai maestri di Parigi la bolla Parens scientiarum (1231)?', a: ['Il diritto di eleggere il re', 'L’esenzione dagli esami', 'Il diritto di darsi statuti e di sospendere le lezioni', 'La proprietà della cattedrale'], ok: 2, why: 'I maestri possono regolare lezioni e dispute e, se un’offesa grave non viene riparata, sospendere le lezioni: la comunità ha un’autonomia riconosciuta.' },
      { q: 'Quale di questi è un LIMITE fissato dagli statuti parigini del 1215?', a: ['Almeno sei anni di studio', 'Nessuna licenza a pagamento', 'Un esame prima di insegnare', 'Il divieto di leggere la metafisica di Aristotele'], ok: 3, why: 'Gli altri sono requisiti o tutele. Il divieto delimita i contenuti; nel 1231 i libri di filosofia naturale furono sospesi finché non fossero esaminati.' },
      { q: 'Che cosa prova, da solo, uno statuto?', a: ['Ciò che si prescriveva', 'Che tutti lo rispettavano', 'Che nessuno lo rispettava', 'Che era stato scritto dal papa'], ok: 0, why: 'Una norma dice che cosa si chiede; per sapere come si viveva davvero servono altre fonti: registri, lettere, cronache, processi.' },
      { q: 'Uno studente presenta un’obiezione documentata a un professore. Che cosa ne segue?', a: ['Lo studente diventa più competente del professore', 'L’obiezione va esaminata per le sue ragioni', 'Il professore ha comunque ragione', 'La discussione è inutile'], ok: 1, why: 'L’obiezione vale per la ragione e la fonte che porta; non trasforma lo studente in un esperto, né il ruolo del professore la rende falsa.' }
    ],
    vf: [
      { s: 'Universitas significava in origine «un edificio con tutte le facoltà».', v: false, why: 'Significava «totalità» e, nel Medioevo, una corporazione di persone associate.' },
      { s: 'A Bologna, all’inizio, erano gli studenti a pagare i maestri.', v: true, why: 'Lo ricorda la ricostruzione storica dell’Ateneo: i maestri erano stipendiati direttamente dagli studenti.' },
      { s: 'Il 1088 è falso, quindi l’Università di Bologna è una leggenda.', v: false, why: 'La data è convenzionale, non falsa: l’istituzione esiste, ma nasce gradualmente.' },
      { s: 'Nella disputatio si discutevano obiezioni secondo regole precise.', v: true, why: 'Argomenti, obiezioni, soluzione motivata del maestro e risposte alle obiezioni.' },
      { s: 'Nel 1215 a Parigi si poteva comprare la licenza di insegnare.', v: false, why: 'Lo statuto lo vietava: nessuna licenza con denaro, pegni o accordi.' },
      { s: 'Tommaso d’Aquino ritiene che la ragione serva a dimostrare la fede.', v: false, why: 'Per Tommaso la ragione serve a chiarire ciò che la fede insegna e a rispondere alle obiezioni, non a provarla.' },
      { s: 'Dopo il 1215 a Parigi nessuno lesse più la metafisica di Aristotele.', v: false, why: 'Un divieto non prova l’obbedienza: lo statuto dice che cosa si prescrive. Se e quanto fu rispettato, va mostrato con altre fonti.' },
      { s: 'Le università medievali nacquero da più fattori, non da una causa sola.', v: true, why: 'Studio legato alla fede, città, diritto, traduzioni e riconoscimenti si intrecciano.' }
    ],
    seq: [
      { t: 'Data convenzionale delle origini dello Studio di Bologna', y: '1088' },
      { t: 'Federico Barbarossa protegge gli studenti con la Constitutio Habita', y: '1155' },
      { t: 'Diploma di Filippo Augusto per maestri e studenti di Parigi', y: '1200' },
      { t: 'Statuti di Robert de Courçon per Parigi', y: '1215' },
      { t: 'Bolla Parens scientiarum di Gregorio IX', y: '1231' },
      { t: 'Bologna celebra l’ottavo centenario', y: '1888' }
    ],
    memory: [
      ['Universitas', 'Corporazione di persone associate'],
      ['Lectio', 'Lettura spiegata di un testo'],
      ['Quaestio', 'Difficoltà diventata domanda'],
      ['Disputatio', 'Discussione con obiezioni'],
      ['Licenza', 'Permesso di insegnare'],
      ['Statuto', 'Regole di un’istituzione']
    ]
  }
};

/* =====================================================================
   Componente della lezione (React con htm): «Disputa».
   Lectio → quaestio → disputatio → distinctio → risposta: la classe sceglie la mossa del maestro
   fra tre strade; solo la distinzione sblocca il passo successivo. Interazioni con <button> veri
   e classi del kit (ll-btn, ll-link, la-choice, ll-why); stati hover/focus/active dal kit.
   Codice e CSS invariati rispetto al 4 ottobre 2026.
   ===================================================================== */
(function () {
  LabLezione.registra('Disputa', function (p) {
    var R = React, ctx = p.ctx, inl = LabLezione.inline;
    var s = R.useState(0), k = s[0], setK = s[1];
    var c = R.useState(null), pick = c[0], setPick = c[1];
    var v = R.useState([]), visti = v[0], setVisti = v[1];
    var FASI = ['Lectio', 'Quaestio', 'Disputatio', 'Distinctio', 'Risposta'];
    var sc = p.scelte || [], giusta = -1;
    sc.forEach(function (x, i) { if (x.ok) giusta = i; });
    var trovata = visti.indexOf(giusta) > -1;
    var B = p.battute || [];
    function vai(n) {
      setK(n);
      if (B[n]) ctx.say(B[n]);
      if (n === FASI.length - 1) { ctx.cheer(); LabLezione.festa(); }
    }
    function scegli(i) {
      setPick(i);
      if (visti.indexOf(i) < 0) setVisti(visti.concat(i));
      if (sc[i].ok) ctx.cheer(); else ctx.oops();
    }
    function riparti() { setK(0); setPick(null); setVisti([]); }
    var avanti = [
      { t: p.pulsanti && p.pulsanti[0] || 'Arriva un’obiezione' },
      { t: p.pulsanti && p.pulsanti[1] || 'Che cosa fa il maestro?' },
      { t: p.pulsanti && p.pulsanti[2] || 'Mostra la distinzione', off: !trovata },
      { t: p.pulsanti && p.pulsanti[3] || 'La risposta del maestro' }
    ];
    var distinta = k >= 3;
    return html`<div className=${'dz dz-k' + k}>
      <div className="dz-top">
        <span className="la-meta">${p.etichetta || 'Una disputa'}</span>
        <ol className="dz-fasi" aria-label="Fasi della disputa">${FASI.map(function (f, i) {
          return html`<li key=${i} className=${i === k ? 'is-on' : i < k ? 'is-done' : ''} aria-current=${i === k ? 'step' : null}>${f}</li>`; })}</ol>
      </div>

      <div className=${'dz-board' + (k >= 1 && !distinta ? ' is-due' : '')}>
        <div className="dz-card dz-tesi"><small>${p.chiTesi || 'Il maestro'}</small><p>${inl(p.tesi, 'te')}</p></div>
        ${k >= 1 && !distinta && html`<span className="dz-vs" aria-hidden="true">↯</span>`}
        ${k >= 1 && !distinta && html`<div className="dz-card dz-obi"><small>${p.chiObiezione || 'Lo studente obietta'}</small><p>${inl(p.obiezione, 'ob')}</p></div>`}
        ${k >= 1 && html`<p className="dz-q"><span>Quaestio</span>${inl(p.quaestio, 'qu')}</p>`}
      </div>

      ${k === 2 && html`<div className="dz-mosse">
        <p className="ll-hint">${p.domanda || 'Il maestro ha tre strade. Quale risponde davvero all’obiezione?'}</p>
        <div className="la-choices">${sc.map(function (x, i) {
          var cls = 'la-choice' + (pick === i ? (x.ok ? ' is-right' : ' is-wrong') : visti.indexOf(i) > -1 ? ' dz-seen' : '');
          return html`<button key=${i} type="button" className=${cls} aria-pressed=${pick === i} onClick=${function () { scegli(i); }}><span className="la-key">${'ABCD'[i]}</span>${inl(x.t, 's' + i)}</button>`; })}</div>
        <div aria-live="polite">${pick !== null && html`<p key=${pick} className=${'ll-why ' + (sc[pick].ok ? 'is-ok' : 'is-ko')}><strong>${sc[pick].ok ? 'È la mossa della disputa. ' : 'Non risolve. '}</strong>${inl(sc[pick].esito, 'e')}</p>`}</div>
      </div>`}

      ${distinta && html`<div className="dz-fork">
        <div className="dz-ramif" aria-hidden="true"><i className="dz-r-s"></i><i className="dz-r-b"></i><i className="dz-r-g dz-r-g1"></i><i className="dz-r-g dz-r-g2"></i></div>
        <div className="dz-rami">${(p.rami || []).map(function (r, i) {
          return html`<div key=${i} className=${'dz-ramo dz-ramo--' + i}>
            <b>${inl(r.t, 'rt' + i)}</b><span>${inl(r.d, 'rd' + i)}</span>${r.nota && html`<em>${inl(r.nota, 'rn' + i)}</em>`}
          </div>`; })}</div>
      </div>`}

      <div aria-live="polite">${k === 4 && html`<p className="ll-why is-ok"><strong>${p.titoloRisposta || 'Respondeo. '}</strong>${inl(p.risposta, 'ri')}</p>`}</div>

      <div className="ll-row">
        ${k < 4
          ? html`<button className="ll-btn" disabled=${!!avanti[k].off} onClick=${function () { vai(k + 1); }}>${avanti[k].t}</button>`
          : html`<button className="ll-btn ll-btn--ghost" onClick=${riparti}>Rifate la disputa</button>`}
        ${k > 0 && k < 4 && html`<button className="ll-link" onClick=${function () { setK(k - 1); }}>Un passo indietro</button>`}
        ${k === 2 && !trovata && visti.length > 0 && html`<span className="ll-hint" style=${{ margin: 0 }}>Provate un’altra strada.</span>`}
        <span className="ll-tally">${k + 1} / ${FASI.length}</span>
      </div>
    </div>`;
  });
})();
