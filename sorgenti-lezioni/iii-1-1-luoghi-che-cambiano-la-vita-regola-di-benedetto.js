/* ---- lezione ---- */
/* Classe III · UDA 1 «I luoghi che cambiano la vita» · Lezione 1 «I benedettini» — «La misura dei più deboli».
   Artefatto interattivo rifatto il 7 ottobre 2026 con la skill «IRC · Artefatto interattivo della lezione»
   (kit Lab IRC definitivo, 5 ottobre 2026). 50 minuti, 12 scene.
   Contenuti: fascicolo di studio della lezione (iii-1-1-…-fascicolo.pdf) e artefatto precedente (revisione del 28/09/2026),
   che seguono il dossier docente/III 1-1 …-contenuti.md.
   Citazioni della Regola: traduzione italiana dei Benedettini di Noci (Edizioni La Scala), come nel fascicolo;
   dove il fascicolo non riporta le parole, il passo è reso in discorso indiretto. Etimologie: Vocabolario Treccani.
   Componente proprio: «Misura» (su chi si calcola una misura comune: 40,3; 48,9; 64,19). Numeri del componente: schema immaginario.
   Nessun dato viene raccolto, salvato o trasmesso: scelte e voti restano solo nella pagina aperta.
   © Matteo Sestili — Tutti i diritti riservati */
window.LEZIONE = {
  slug: 'iii-1-1-luoghi-che-cambiano-la-vita-regola-di-benedetto',
  classe: 'Anno III',
  titolo: 'La misura dei *più deboli*',
  sottotitolo: 'Perché una comunità si dà una regola: fine, misura e autorità nella Regola di Benedetto.',
  saluto: 'Ultima tappa: a che cosa serve, allora, una regola?',

  glossario: {
    'cenobio': { parola: 'Cenobio', etim: 'dal latino tardo *coenobium*, dal greco *koinóbion*, composto di *koinós*, «comune», e *bíos*, «vita»', def: 'Il monastero in cui più monaci fanno vita comune sotto la stessa regola. Il nome dice già il problema: vivere insieme.' },
    'anacoreta': { parola: 'Anacoreta', etim: 'dal latino tardo *anachoreta*, dal greco *anachōrētḗs*, da *anachōréō*, «ritirarsi»', def: 'Il monaco che vive da solo, lontano dalle città. Il contrario del cenobita, che vive in comunità.' },
    'regola': { parola: 'Regola', etim: 'dal latino *regula*, «assicella, regolo», derivato di *regere*, «guidare diritto»', def: 'In origine l’assicella con cui si tracciano linee diritte; poi la norma. Nella lezione: la misura concreta che rende praticabile un fine giorno per giorno.' },
    'prologo': { parola: 'Prologo', etim: 'dal latino *prologus*, dal greco *prólogos*, composto di *pró*, «prima», e *lógos*, «discorso»', def: 'Il discorso che viene prima. Nel Prologo la Regola dichiara il fine del monastero, prima di ogni norma.' },
    'fine': { parola: 'Fine', etim: 'dal latino *finis*, «confine, termine»', def: 'Ciò per cui un gruppo esiste, il punto verso cui è diretto. Nessuna organizzazione, da sola, lo produce.' },
    'efficienza': { parola: 'Efficienza', etim: 'dal latino *efficientia*, da *efficere*, «compiere, produrre» (*ex* + *facere*, «fare»)', def: 'Il rapporto fra il risultato e le risorse impiegate: dice quanto bene si ottiene qualcosa, non a che cosa serva. Non è un male; sbaglia quando prende il posto del fine.' },
    'lectio divina': { parola: 'Lectio divina', etim: 'latino, «lettura divina»; *lectio* da *legere*, «leggere, raccogliere»', def: 'La lettura lenta e meditata della Scrittura. Nella Regola ha le sue ore ogni giorno, accanto al lavoro (cap. 48).' },
    'emina': { parola: 'Emina', etim: 'dal latino *hemina*, dal greco *hēmína*, legato a *hēmi-*, «metà»', def: 'Misura romana di capacità, mezzo sestario: circa 0,27 litri. La Regola la usa per la razione di vino (40,3); la quantità esatta del tempo di Benedetto è discussa.' },
    'ospite': { parola: 'Ospite', etim: 'dal latino *hospes, hospitis*, che indicava sia chi accoglie sia chi è accolto', def: 'Chi arriva e viene accolto. Per la Regola va ricevuto «come Cristo in persona» (53,1).' },
    'abate': { parola: 'Abate', etim: 'dal latino tardo *abbas, abbatis*, dal greco *abbâs*, dall’aramaico *abbā*, «padre»', def: 'Il superiore del monastero. Porta il nome di un padre, non di un padrone: per questo ha limiti scritti (2,4; 3,7).' },
    'discrezione': { parola: 'Discrezione', etim: 'dal latino *discretio*, da *discernere*, «distinguere, separare»', def: 'Nella Regola non significa riservatezza, ma la capacità di trovare la giusta misura nel caso concreto: «madre di tutte le virtù» (64,19).' },
    'patrono': { parola: 'Patrono', etim: 'dal latino *patronus*, derivato di *pater*, «padre»', def: 'Il santo scelto come protettore di una persona, di una città o di un popolo. Nel 1964 Paolo VI proclama Benedetto patrono d’Europa.' },
    'eccezione': { parola: 'Eccezione', etim: 'dal latino *exceptio*, da *excipere*, «trarre fuori»', def: 'Il caso che una norma tira fuori dalla misura comune, perché la misura non schiacci chi ne ha bisogno.' }
  },

  scene: [
    /* 1 · Aggancio: la regola del telefono e la domanda d'ingresso */
    { fase: 'Aggancio', momento: 'Apertura', minuti: 3, titolo: 'Una regola che *conoscete*',
      lead: 'Dall’anno scorso lo smartphone è vietato in orario scolastico. Prima di dire se è giusto, chiediamoci: **a che cosa serve** una regola?',
      blocchi: [
        { tipo: 'domanda', id: 'ingresso', etichetta: 'Anonimo · per alzata di mano',
          q: 'Perché, secondo voi, una comunità si dà una regola?',
          opzioni: ['Perché qualcuno deve comandare', 'Per funzionare meglio, con meno sprechi', 'Per proteggere chi è più debole', 'Per tenere fermo uno scopo comune'],
          dibattito: 'Teniamo i voti. Oggi leggiamo una regola scritta quindici secoli fa per una comunità di monaci; alla fine rifaremo la stessa domanda.' }
      ] },

    /* 2 · Scoperta: vita comune, cenobi, Benedetto (anelli 1-2) */
    { fase: 'Scoperta', momento: 'Contesto', minuti: 4, titolo: 'Vivere *insieme*',
      lead: 'Dal IV secolo molti cristiani dedicano la vita alla ricerca di Dio: gli {anacoreti|anacoreta} da soli, altri insieme, in un {cenobio}.',
      testo: 'Chi vive con altri deve stabilire quando si prega, quando si lavora, quanto si mangia, chi decide. **Per questo** i cenobi si danno delle regole.',
      blocchi: [
        { tipo: 'etimo', parola: 'Cenobio', etichetta: 'Da dove viene la parola · toccate le parti', battuta: 'Il nome dice già il problema: vivere insieme.',
          parti: [{ t: 'koinós', d: 'greco: «comune»' }, { t: 'bíos', d: '«vita»' }, { t: 'koinóbion', d: '«vita comune»' }], nessi: ['+', '→'],
          spiegazione: 'Chi vive da solo segue il proprio ritmo; chi vive in un **cenobio** deve accordarsi con gli altri. La parola contiene già la domanda della lezione.',
          etim: 'dal greco *koinóbion*, «vita comune», attraverso il latino tardo *coenobium*', def: 'Il monastero della vita comune.' },
        { tipo: 'tappe', titolo: 'Benedetto non parte da zero', aperta: 1, voci: [
          { data: 'IV sec.', breve: 'Cenobi', titolo: 'Le prime comunità', testo: 'In Egitto Pacomio organizza i primi cenobi; in Oriente la regola più influente è quella di Basilio di Cesarea. Per Basilio la regola non opprime: serve perché nessuno, da solo, tiene fermo uno scopo così alto.' },
          { data: 'c. 480', breve: 'Norcia', titolo: 'Nasce Benedetto', testo: 'Studia a Roma senza concludere gli studi, vive circa tre anni in una grotta sopra Subiaco, organizza alcuni monasteri nella valle dell’Aniene.' },
          { data: 'Inizio VI sec.', breve: 'Il Maestro', titolo: 'Una regola prima della sua', testo: 'Circola la *Regola del Maestro*, lunga e anonima. Per la maggior parte degli studiosi Benedetto la usa come fonte: la **seleziona, la accorcia e la corregge**. La sua è lunga circa un terzo.' },
          { data: '529', breve: 'Montecassino', titolo: 'Montecassino', testo: 'Benedetto si trasferisce a Montecassino, dove muore nel 547 (date tradizionali).' },
          { data: 'c. 593', breve: 'I Dialoghi', titolo: 'Chi racconta Benedetto', testo: 'Quasi tutto ciò che sappiamo della sua vita viene dal secondo libro dei *Dialoghi* di Gregorio Magno: un racconto spirituale, con miracoli, da non leggere come una cronaca. La Regola, invece, la leggiamo direttamente.' }
        ] }
      ] },

    /* 3 · Fonte: il Prologo dichiara il fine (anello 3) */
    { fase: 'Scoperta', momento: 'Fonte', minuti: 5, titolo: 'Prima delle norme, *il fine*',
      lead: 'Orari, cibo, vestiti, ospiti: la {regola} li stabilisce tutti. Ma prima dichiara per che cosa esiste il monastero.',
      blocchi: [
        { tipo: 'stima', q: 'Quanti capitoli ha la Regola di Benedetto, oltre al Prologo?', min: 10, max: 200, passo: 1, valore: 73, tolleranza: 12, unita: 'capitoli',
          why: 'Settantatré capitoli brevi, più un {prologo}. Alla fine l’autore la chiama «questa Regola così modesta, scritta per principianti» (73,8) e rimanda alla «Regola del nostro padre Basilio» (73,5).',
          fonte: 'Regola di san Benedetto, Prologo e capp. 1-73' },
        { tipo: 'leggi', q: 'Quale parte della frase dice per che cosa esiste il monastero?',
          fonte: 'Regola di san Benedetto, Prologo 45-46 (trad. Benedettini di Noci)',
          testo: '«[[Istituiremo a tale scopo::È l’annuncio di un’istituzione: dice **che** si fonda qualcosa, non ancora **per che cosa**.]] [[!una scuola di servizio divino::Il **{fine}**: imparare a servire Dio, come si impara in una scuola. Tutte le norme che seguono si giudicano su questo.]]; e nell’organizzarla speriamo di [[non programmare nulla di gravoso o d’insopportabile::Non è il fine, ma un **criterio** per l’organizzazione: nulla di insopportabile. Lo ritroveremo fra poco.]].»' }
      ] },

    /* 4 · Scoperta: fine, regola, efficienza (concetti; equivoco «efficiente = sbagliato») */
    { fase: 'Scoperta', minuti: 4, titolo: 'Tre parole da *non confondere*',
      lead: 'Nell’uso comune si sovrappongono. Per leggere la Regola, e qualunque regolamento, servono distinte.',
      blocchi: [
        { tipo: 'carte', carte: [
          { fronte: 'Fine', etichetta: 'Perché', retro: 'Ciò per cui un gruppo esiste. Nessuna organizzazione, da sola, lo produce.' },
          { fronte: 'Regola', etichetta: 'Come', retro: 'La misura concreta che rende praticabile il fine giorno per giorno: un’ora, una quantità, un limite.' },
          { fronte: 'Efficienza', etichetta: 'Quanto', retro: 'Il rapporto fra risultato e risorse: dice quanto bene ottieni qualcosa, non a che cosa serve. Non è un male: sbaglia quando prende il posto del fine.' }
        ] },
        { tipo: 'verifica', etichetta: 'Verifica lampo', q: '«La mensa chiude alle 13.30 per ottimizzare i turni di pulizia.» Che cosa dichiara questa norma?',
          opzioni: ['Il fine della comunità', 'Una norma sbagliata', 'Un criterio di efficienza'], ok: 2,
          why: 'È {efficienza}: dice come ottenere un risultato con meno risorse, non per che cosa la comunità mangia insieme. Non è sbagliata: semplicemente **non dichiara un fine**. Efficiente non vuol dire ingiusto.' }
      ] },

    /* 5 · Scoperta: la misura sui più deboli (anello 4, concetto più difficile: componente proprio) */
    { fase: 'Scoperta', momento: 'Spiegazione', minuti: 6, titolo: 'La misura dei *più deboli*',
      lead: '**Ne segue che** ogni norma si misura sul fine. Una comunità, forze diverse, una sola misura comune: su chi la calcolate?',
      blocchi: [
        { tipo: 'custom', nome: 'Misura', props: {} }
      ] },

    /* 6 · Attività: alla porta (53) e al mercato (57) (anello 4) */
    { fase: 'Attività', momento: 'Un caso', minuti: 4, titolo: 'Qualcuno bussa *alla porta*',
      lead: 'L’{ospite} arriva quando vuole e disfa l’orario. Decidete voi, poi leggiamo che cosa sceglie la Regola.',
      blocchi: [
        { tipo: 'bivio', etichetta: 'Un caso, tre strade', pulsante: 'Che cosa dice la Regola?',
          caso: 'Giorno di digiuno: la comunità mangerà soltanto la sera. A metà giornata bussa un pellegrino povero, stanco del viaggio. Che cosa si fa?',
          scelte: [
            { t: 'Aspetta la sera: l’orario vale per tutti', tono: 'ko', esito: 'È la risposta dell’organizzazione: ordinata, ma il pellegrino resta fuori. La Regola mette l’ospite davanti all’orario.' },
            { t: 'Il superiore rompe il digiuno e mangia con lui; gli altri lo proseguono', tono: 'ok', esito: 'È la scelta della Regola (53,10-11): il costo dell’accoglienza ricade su chi comanda, e la vita della comunità continua.' },
            { t: 'Tutta la comunità interrompe il digiuno e lo serve', tono: 'neutro', esito: 'In parte previsto: tutti gli lavano i piedi (53,13). Ma la Regola organizza l’accoglienza perché non scompagini la vita di tutti.' }
          ],
          chiusura: '«Tutti gli ospiti che giungono al monastero siano accolti **come Cristo in persona**» (53,1, con Mt 25,35); la premura maggiore va ai poveri e ai pellegrini, «poiché è proprio in loro che si accoglie di più il Cristo» (53,15). Il testo non è ingenuo: prevede una cucina separata, perché gli ospiti non disturbino i monaci (53,16). L’accoglienza è dovuta, e proprio per questo va organizzata.' },
        { tipo: 'aggancio', etichetta: 'Per capire', titolo: 'Anche al mercato',
          t: 'Se il monastero vende i prodotti dei suoi artigiani, non ci sia frode, e «ogni cosa si venda sempre a un prezzo più basso di quello usato dai secolari, affinché in tutto sia glorificato Dio» (57,8-9). Per l’efficienza è una scelta incomprensibile; per il fine è coerente.',
          fonte: 'Regola di san Benedetto, 57,8-9 (trad. Benedettini di Noci)' }
      ] },

    /* 7 · Pausa gioco: Sfida a squadre (ripasso delle scene 1-6) */
    { fase: 'Attività', momento: 'Pausa gioco', minuti: 6, titolo: 'Sfida a *squadre*',
      testo: 'Due squadre, otto domande su ciò che abbiamo visto: cenobio, Prologo, fine, regola, efficienza, la misura e la porta. Chi sbaglia lascia la domanda all’altra squadra, che può rubarla.',
      blocchi: [
        { tipo: 'mascotte', t: 'Un indizio: chiedetevi sempre se una frase dice **a che cosa serve** o soltanto **come** si fa.' },
        { tipo: 'gioco', id: 'sfida', titolo: 'Sfida a squadre', testo: 'Nomi di squadra collettivi, venti secondi per rispondere. Poi si torna qui.', pulsante: 'Si gioca' }
      ] },

    /* 8 · Scoperta: anche chi comanda sta sotto la Regola (anello 5) */
    { fase: 'Scoperta', momento: 'Spiegazione', minuti: 5, titolo: 'Anche chi comanda *sta sotto*',
      lead: '**Per questo** anche l’autorità ha dei limiti. Il superiore si chiama {abate}: guardate che cosa dice il suo nome.',
      blocchi: [
        { tipo: 'parola', parola: 'Abate', radice: 'ab', origine: 'Dal latino tardo abbas, dall’aramaico abbā',
          significato: '*Abbà*, «padre». La Regola lo spiega con san Paolo: l’abate fa le veci di Cristo ed è chiamato con il suo nome, «Abbà, Padre!» (2,2-3; Rm 8,15).',
          battuta: 'Un padre, non un padrone: per questo ha limiti scritti.' },
        { tipo: 'storia', etichetta: 'Come si decide in monastero', inizio: 'a',
          nodi: {
            a: { t: 'Un lavoro più redditizio costerebbe ogni giorno un’ora di lettura. È una questione importante: come si decide?', scelte: [
              { t: 'Decide subito l’abate: si fa prima', vai: 'b' },
              { t: 'Si vota: decide la maggioranza', vai: 'c' },
              { t: 'Si raduna tutta la comunità, anche il più giovane', vai: 'd' } ] },
            b: { t: 'Si guadagna tempo. Ma per le questioni importanti la Regola chiede all’abate di convocare tutta la comunità ed esporre di che cosa si tratta (3,1-2).', scelte: [
              { t: 'Allora raduniamo tutti', vai: 'd' } ] },
            c: { t: 'Il consiglio di tutti è previsto, il voto no: la decisione ultima resta all’abate (3,5).', scelte: [
              { t: 'Allora raduniamo tutti, e poi decide lui', vai: 'd' } ] },
            d: { t: 'Tutti parlano. Il più giovane propone di non toccare l’ora di lettura. Perché ascoltarlo?', scelte: [
              { t: 'Perché è il più competente', vai: 'e' },
              { t: 'Perché la soluzione migliore può venire da lui', vai: 'f' } ] },
            e: { t: 'Non è detto: è il più giovane, non il più esperto. La Regola dà un’altra ragione.', scelte: [
              { t: 'Quale?', vai: 'f' } ] },
            f: { t: '«Spesso è al più giovane che Dio rivela la soluzione migliore» (3,3): la parola utile può venire da dove l’autorità non la cercherebbe. Ora l’abate decide. Può decidere qualunque cosa?', scelte: [
              { t: 'Sì: è il superiore', vai: 'g' },
              { t: 'No: anche lui sta sotto la Regola', vai: 'h' } ] },
            g: { t: 'No. L’abate «non deve insegnare, stabilire o comandare nulla che sia contrario ai comandamenti di Dio» (2,4).', scelte: [
              { t: 'E quali altri limiti ha?', vai: 'h' } ] },
            h: { t: 'Decide lui (3,5), ma ne renderà conto (3,11) e sta sotto un limite che vale per tutti: «In ogni cosa tutti seguano la Regola come maestra» (3,7).', fine: true, tono: 'ok', esito: 'Una decisione secondo la Regola' }
          },
          chiusura: 'Chi comanda ascolta tutti e ha **limiti scritti**. Fra la regola e il caso concreto lavora la {discrezione}, «madre di tutte le virtù», perché «i forti desiderino fare di più e i deboli non si scoraggino» (64,19).' },
        { tipo: 'aggancio', etichetta: 'Con onestà', titolo: 'Non era una regola mite',
          t: 'Durante le ore di lettura alcuni monaci controllano chi perde tempo; chi non si corregge riceve castighi più duri (48,17-20), e per i più ostinati il testo prevede anche punizioni corporali (2,28), secondo l’uso educativo del tempo, che oggi giudichiamo inaccettabile. La novità sta altrove: **un limite scritto all’arbitrio di chi comanda**.',
          fonte: 'Regola di san Benedetto, 2,28; 48,17-20' }
      ] },

    /* 9 · Sintesi: che cosa è nato da una regola (anello 6, con l'«eppure») */
    { fase: 'Scoperta', momento: 'Sintesi', minuti: 4, titolo: 'Che cosa è nato *da una regola*',
      lead: '**Quindi**, dalla domanda all’istituzione. Agganciamo gli anelli, poi proviamo a toglierne uno.',
      blocchi: [
        { tipo: 'catena', titolo: 'Dal cenobio all’Europa', rottura: true, iniziali: 1,
          anelli: [
            { t: 'Chi vive insieme ha bisogno di misure', d: 'Quando pregare, lavorare, mangiare; chi decide.', senza: 'Senza vita comune basterebbe il ritmo di ciascuno: nessuna regola scritta.' },
            { nesso: 'Per questo', t: 'Le comunità si danno una regola', d: 'Basilio, il Maestro, Benedetto: nessuno, da solo, tiene fermo lo scopo.', senza: 'Senza una regola ogni misura dipenderebbe dall’umore del giorno o dal più forte.' },
            { nesso: 'Quindi', t: 'Il fine si scrive prima delle norme', d: '«Una scuola di servizio divino» (Prol. 45).', senza: 'Senza il fine le norme restano orari: non si saprebbe su che cosa giudicarle.' },
            { nesso: 'Ne segue che', t: 'La misura si calcola su chi fa più fatica', d: 'Il lavoro, il vino, l’ospite, il prezzo (48,9; 40,3; 53,1; 57,8-9).', senza: 'Senza questo criterio vincerebbe l’efficienza: i più deboli resterebbero indietro.' },
            { nesso: 'Per questo', t: 'Anche chi comanda sta sotto la Regola', d: 'L’abate è un padre, non un padrone (2,4; 3,7).', senza: 'Senza limiti all’abate la misura dipenderebbe dal suo arbitrio.' },
            { nesso: 'Quindi', t: 'Nasce un’istituzione', d: 'Lavoro e lettura hanno le loro ore, per tutti; nel monastero ci sono biblioteca e scuola. Nel 1964 Paolo VI proclama Benedetto {patrono} d’Europa.' }
          ],
          fine: 'Dal fine è nata una forma di vita, e da questa un’istituzione.' },
        { tipo: 'citazione', testo: 'Il loro obiettivo era: quaerere Deum, cercare Dio.',
          fonte: 'Benedetto XVI, Discorso al Collège des Bernardins, Parigi, 12 settembre 2008',
          pulsante: 'Eppure…',
          commento: 'Poco prima Benedetto XVI precisa che i monaci non intendevano «creare una cultura» né «conservare una cultura del passato»: la cultura fu un **effetto**, non un programma. Nello stesso discorso ricorda che nel mondo greco il lavoro fisico era cosa da servi, mentre per il monachesimo «il lavoro manuale è parte costitutiva». **Eppure** due precisazioni: i monasteri non furono l’unica via per cui i testi antichi arrivarono a noi, che passarono anche per Bisanzio e per il mondo islamico; e *ora et labora* non compare nel testo della Regola: è il motto con cui la tradizione ne riassume lo spirito.' }
      ] },

    /* 10 · Applicazione: la circolare letta con gli stessi tre piani */
    { fase: 'Attività', momento: 'Applicazione', minuti: 4, titolo: 'Leggiamo *la circolare*',
      lead: 'Torniamo al telefono: circolare del Ministero dell’Istruzione e del Merito n. 3392 del 16 giugno 2025. Una voce alla volta.',
      blocchi: [
        { tipo: 'smista', titolo: 'Che cosa dice questa parte del testo?', categorie: ['Fine', 'Misura', 'Eccezione'], voci: [
          { t: 'Tutelare la salute e il benessere degli adolescenti e i loro risultati scolastici', c: 0, why: 'È ciò per cui la norma esiste: la circolare lo motiva con studi dell’OCSE, dell’OMS e dell’Istituto superiore di sanità.' },
          { t: 'Divieto di usare lo smartphone in orario scolastico, «anche a fini didattici»', c: 1, why: 'È la misura concreta, uguale per tutti.' },
          { t: 'Uso ammesso se previsto dal PEI o dal PDP', c: 2, why: 'L’{eccezione} protegge chi ne ha bisogno per imparare: la misura comune non schiaccia i più fragili.' },
          { t: 'Uso ammesso per «motivate necessità personali»', c: 2, why: 'Un’eccezione affidata al giudizio sul caso concreto: è ciò che la Regola chiama discrezione.' }
        ], chiusura: 'Fine, misura, eccezioni: la stessa struttura che abbiamo trovato nella Regola.' },
        { tipo: 'verifica', etichetta: 'Un’obiezione seria', q: '«Un divieto, da solo, non insegna a usare bene il telefono.» Che cosa colpisce questa obiezione?',
          opzioni: ['La misura scelta', 'Il fine della norma', 'Le eccezioni'], ok: 0,
          why: 'Colpisce la **misura**, non il fine: infatti la circolare stessa chiede di educare a un uso responsabile e consapevole. Si può condividere il fine e contestare la misura; più difficile è accettare una misura senza sapere a che cosa serve.' }
      ] },

    /* 11 · Prova breve su casi nuovi */
    { fase: 'Chiusura', momento: 'Prova', minuti: 3, titolo: 'Tocca *a voi*',
      lead: 'Tre domande su casi nuovi: la classe sceglie, chi insegna tocca.',
      blocchi: [
        { tipo: 'quiz', etichetta: 'Prova breve', perfetto: 'Tre su tre: sapete leggere una regola dal suo fine.',
          domande: [
            { q: 'A: «Il refettorio chiude alle 13.30 per ottimizzare i turni». B: «Chi arriva dopo le 13.30 riceve comunque il pasto: un incaricato resta fino alle 14». Quale segue il criterio di 40,3?',
              opzioni: ['La A, perché è più efficiente', 'Nessuna delle due: sono solo orari', 'La B: la misura è pensata su chi fa più fatica'], ok: 2,
              why: 'La B costa di più e protegge chi arriva in ritardo: la misura è calcolata sui più deboli, come la razione di 40,3. La A non è sbagliata, ma non dichiara un fine.' },
            { q: 'Una regola di classe dice soltanto: «Compiti consegnati alle 8 in punto, senza eccezioni». Che cosa le manca, secondo la Regola?',
              opzioni: ['Il fine dichiarato e un’attenzione a chi fa più fatica', 'Una sanzione più dura', 'Un orario più preciso'], ok: 0,
              why: 'Ha la misura ma non dice a che cosa serve, e non prevede discrezione: rischia di diventare soltanto organizzazione.' },
            { q: 'Perché l’abate deve ascoltare anche il più giovane?',
              opzioni: ['Perché decide la maggioranza', 'Perché la soluzione migliore può venire da dove l’autorità non la cercherebbe', 'Perché il più giovane è il più competente'], ok: 1,
              why: '«Spesso è al più giovane che Dio rivela la soluzione migliore» (3,3). La decisione resta all’abate, che però sta sotto la Regola (3,5; 3,7).' }
          ] }
      ] },

    /* 12 · Ritorno alla domanda iniziale e passaggio alla lezione successiva */
    { fase: 'Chiusura', minuti: 2, titolo: 'A che cosa serve *una regola*?',
      testo: '**La risposta:** una comunità si dà una regola quando ha uno scopo che nessuno, da solo, tiene fermo. La regola non è quello scopo: ne è la misura quotidiana, ed è buona finché lo rende praticabile anche a chi fa più fatica. Quando smette di dire a che cosa serve, diventa soltanto organizzazione.',
      blocchi: [
        { tipo: 'domanda', id: 'uscita', confronta: 'ingresso', etichetta: 'La stessa domanda dell’inizio',
          q: 'Perché, secondo voi, una comunità si dà una regola?',
          opzioni: ['Perché qualcuno deve comandare', 'Per funzionare meglio, con meno sprechi', 'Per proteggere chi è più debole', 'Per tenere fermo uno scopo comune'],
          dibattito: 'Il tratteggio d’oro è il voto d’inizio. Chi ha cambiato idea, che cosa l’ha convinto? Resta aperta una domanda che il testo non chiude: chi stabilisce il fine di una comunità, quando non è più evidente a nessuno?' },
        { tipo: 'aggancio', etichetta: 'Tra sette giorni', titolo: 'Chi può insegnare a chi?',
          t: 'Cercare Dio nella Scrittura richiede di saper leggere: per questo nei monasteri ci sono la biblioteca e la scuola. Da lì parte la prossima domanda: chi ha il diritto di insegnare, e chi può mettere alla prova ciò che viene insegnato?' }
      ] }
  ],

  studio: {
    sezioni: [
      { titolo: 'La domanda',
        testo: 'Dall’anno scorso lo smartphone è vietato in orario scolastico. Prima di chiederci se la norma sia giusta, possiamo chiederci a che cosa serva: una misura comune si condivide, o almeno si discute, solo quando se ne conosce lo scopo. Un testo scritto nell’Italia del VI secolo per comunità di monaci, la Regola di Benedetto, permette di porre la domanda dall’inizio: perché una comunità si dà una regola, e da che cosa si riconosce una regola che ha smesso di servire?' },
      { titolo: 'Una vita in comune ha bisogno di una regola',
        testo: 'Nel IV secolo, quando il cristianesimo può essere vissuto senza persecuzioni, molti cristiani scelgono di dedicare tutta la vita alla ricerca di Dio. Alcuni vivono da soli, lontano dalle città: sono gli **anacoreti** (dal greco *anachōrētḗs*, da *anachōréō*, «ritirarsi»). Altri vivono insieme, in un **cenobio**: la parola viene dal greco *koinóbion*, composto di *koinós*, «comune», e *bíos*, «vita». Il nome dice già il problema. Chi vive da solo può seguire il proprio ritmo; chi vive con altri deve stabilire quando si prega, quando si lavora, quanto si mangia, chi decide.\n\n**Per questo** i cenobi si danno delle regole. In Egitto Pacomio organizza le prime comunità; in Oriente la regola più influente è quella di Basilio di Cesarea. Per Basilio la regola non serve a opprimere: serve perché nessuno, da solo, riesce a tenere fermo uno scopo così alto, e la vita comune è una scuola di correzione, in cui il fratello aiuta a migliorarsi.\n\nIn Italia, all’inizio del VI secolo, circola un testo lungo e anonimo, la cosiddetta *Regola del Maestro*. La maggior parte degli studiosi ritiene che Benedetto l’abbia usata come fonte: i primi sette capitoli, quelli spirituali, la riprendono quasi parola per parola; la parte sull’organizzazione la segue con libertà; gli ultimi sei capitoli sono interamente suoi. Il risultato è lungo circa un terzo del modello. Benedetto, dunque, non inventa una forma di vita: la seleziona, la accorcia e la corregge.\n\nDi lui sappiamo che nasce a Norcia intorno al 480, studia a Roma senza concludere gli studi, vive per circa tre anni in una grotta sopra Subiaco, organizza alcuni monasteri nella valle dell’Aniene e nel 529 si trasferisce a Montecassino, dove muore nel 547: sono le date tradizionali. Quasi tutto viene dal secondo libro dei *Dialoghi* di Gregorio Magno, scritto pochi decenni dopo, negli anni Novanta del VI secolo: un racconto spirituale, con episodi e miracoli, che non va letto come una cronaca. La Regola, invece, possiamo leggerla direttamente.' },
      { titolo: 'Il fine scritto prima delle norme',
        testo: '**Quindi** la Regola, che conta un prologo e settantatré capitoli, prima di stabilire a che ora ci si alza, quanto si mangia, come ci si veste e che cosa si fa quando arriva qualcuno, dichiara per che cosa esiste il monastero: «Istituiremo a tale scopo una scuola di servizio divino; e nell’organizzarla speriamo di non programmare nulla di gravoso o d’insopportabile» (Prologo 45-46). In una frase ci sono due cose: un **fine**, imparare a servire Dio come in una scuola, e un **criterio** per l’organizzazione, nulla di insopportabile. Le norme vengono dopo e vanno giudicate su questo. *Prologo* viene dal greco *prólogos*, «discorso che sta prima»: il fine, appunto, viene prima. Alla fine l’autore chiama il suo lavoro «questa Regola così modesta, scritta per principianti» (73,8) e rimanda a testi più alti, fra cui «la Regola del nostro padre Basilio» (73,5).\n\n*Regola* viene dal latino *regula*, derivato di *regere*, propriamente «guidare diritto»: in origine era l’assicella di legno, il regolo, con cui si tracciano linee diritte; poi il significato è passato a «norma». Una regola traccia una direzione: non cammina al posto di chi la segue.\n\nPer leggere questo testo, e qualunque regolamento, servono tre parole che nell’uso comune si confondono. Il **fine** (dal latino *finis*, «confine, termine») è ciò per cui un gruppo esiste: nessuna organizzazione, da sola, lo produce. La **regola** è la misura concreta che rende praticabile il fine giorno per giorno: un’ora, una quantità, un limite. L’**efficienza** (dal latino *efficientia*, da *efficere*, «compiere, produrre») è il rapporto fra il risultato e le risorse impiegate: dice quanto bene si ottiene qualcosa, non a che cosa serva. L’efficienza non è un male: diventa un criterio sbagliato quando prende il posto del fine. La Regola di Benedetto è un buon banco di prova perché, in più punti, sceglie apertamente la soluzione meno conveniente e dice perché.' },
      { titolo: 'Una misura pensata su chi fa più fatica',
        testo: '**Ne segue che** ogni norma si misura sul fine. Il capitolo 48 divide la giornata fra lavoro manuale e *lectio divina*, la lettura lenta e meditata della Scrittura: «L’ozio è nemico dell’anima» (48,1). Da Pasqua al 1° ottobre si lavora dopo la preghiera del mattino fin verso le dieci e si legge fino a mezzogiorno; dal 1° ottobre l’ordine si rovescia, perché le giornate sono più corte (48,3-11). In Quaresima ciascuno riceve dalla biblioteca un libro da leggere per intero (48,15). Poi, dopo aver fissato le ore, il testo cambia criterio: «Tutto però si faccia con moderazione, tenendo presente chi è di costituzione debole» (48,9). L’orario esiste ed è uguale per tutti, ma non decide da solo.\n\nLo stesso criterio regola la tavola. Il capitolo 40 fissa la razione di vino «con qualche scrupolo», perché ciascuno ha ricevuto da Dio un dono diverso (40,1-2): «Tuttavia, tenendo presente lo stato di salute dei più deboli, pensiamo che a ogni fratello basti mezzo litro circa di vino al giorno» (40,3). Il latino usa una misura romana, l’*hemina* (in italiano **emina**, dal greco *hēmína*, «metà»), che valeva circa 0,27 litri, cioè mezzo sestario; questa traduzione scrive «mezzo litro circa», altre «un quarto», e la misura esatta del tempo di Benedetto è discussa. Conta il criterio: la razione non è la massima sopportabile né quella che renderebbe di più, ma è calcolata sui più deboli e vale per tutti. Una misura calcolata sulla media sarebbe forse più efficiente, ma lascerebbe indietro qualcuno. L’abate può aumentarla per il clima o per la fatica (40,5).\n\nPoi c’è la porta. L’**ospite** (dal latino *hospes*, che indicava sia chi accoglie sia chi è accolto) arriva quando vuole e disfa l’orario, ma la Regola non lo tratta come un disturbo: «Tutti gli ospiti che giungono al monastero siano accolti come Cristo in persona», e cita il Vangelo: «Ho domandato ospitalità e voi mi avete accolto» (53,1; Mt 25,35). Il superiore interrompe il digiuno per fare compagnia a chi arriva, mentre i fratelli proseguono i digiuni consueti (53,10-11), e la premura maggiore va ai poveri e ai pellegrini, «poiché è proprio in loro che si accoglie di più il Cristo» (53,15). Il testo non è ingenuo: prevede una cucina separata per gli ospiti, perché non disturbino i monaci (53,16). L’accoglienza è dovuta, e proprio per questo va organizzata.\n\nAnche il mercato segue il fine. Se il monastero vende i prodotti dei suoi artigiani, non deve esserci frode, e «ogni cosa si venda sempre a un prezzo più basso di quello usato dai secolari, affinché in tutto sia glorificato Dio» (57,8-9). Dal punto di vista dell’efficienza è una scelta incomprensibile; dal punto di vista del fine è coerente.' },
      { titolo: 'Anche chi comanda sta sotto la Regola',
        testo: '**Per questo** anche l’autorità ha dei limiti. Il superiore del monastero si chiama **abate**: la parola viene dal latino tardo *abbas*, di origine aramaica, *abbā*, «padre». La Regola lo spiega con san Paolo: l’abate fa le veci di Cristo ed è chiamato con il suo nome, «Abbà, Padre!» (2,2-3; Rm 8,15). L’autorità del monastero porta il nome di un padre, non di un padrone, e per questo ha dei limiti scritti: l’abate «non deve insegnare, stabilire o comandare nulla che sia contrario ai comandamenti di Dio» (2,4).\n\nPer le questioni importanti l’abate raduna tutta la comunità ed espone di che cosa si tratta (3,1-2): «Abbiamo detto che tutti siano chiamati a esprimere il proprio parere, poiché spesso è al più giovane che Dio rivela la soluzione migliore» (3,3). Non è una votazione: la decisione ultima resta sua (3,5), ma ne renderà conto (3,11) e sta sotto un limite che vale per tutti: «In ogni cosa tutti seguano la Regola come maestra» (3,7). Il più giovane non va ascoltato perché sia più competente, ma perché la parola utile può venire da dove l’autorità non la cercherebbe.\n\nFra la regola e il caso concreto lavora la **discrezione** (dal latino *discretio*, da *discernere*, «distinguere»). Nella Regola non significa riservatezza, ma capacità di trovare la giusta misura nel caso concreto. Il capitolo sull’abate la chiama «madre di tutte le virtù» e ne indica lo scopo: regolare ogni cosa «in modo che i forti desiderino fare di più e i deboli non si scoraggino» (64,19). Senza discrezione una regola diventa un meccanismo; senza regola la discrezione diventa arbitrio.\n\nQuesto non vuol dire che la Regola fosse mite. Durante le ore di lettura alcuni monaci girano per il monastero a controllare chi perde tempo, e chi non si corregge riceve castighi più duri (48,17-20); per i più ostinati il testo prevede anche punizioni corporali (2,28), secondo l’uso educativo del tempo, che oggi giudichiamo inaccettabile. La novità sta altrove: un documento del VI secolo metteva per iscritto un limite all’arbitrio di chi comanda e vincolava anche lui.' },
      { titolo: 'Che cosa è nato da una regola',
        testo: '**Quindi** da questa forma di vita è nata un’istituzione che ha segnato l’Europa. Parlando a Parigi nel 2008, Benedetto XVI ha osservato che i monaci non avevano l’intenzione «di creare una cultura e nemmeno di conservare una cultura del passato»: il loro obiettivo era «quaerere Deum, cercare Dio». Ma poiché Dio parla nelle Scritture, la ricerca di Dio richiede di saper leggere: per questo fanno parte del monastero la biblioteca e la scuola. La cultura fu un effetto, non un programma.\n\nLo stesso vale per il lavoro. Nello stesso discorso Benedetto XVI ricorda che «nel mondo greco il lavoro fisico era considerato l’impegno dei servi», mentre nella tradizione ebraica anche i grandi maestri esercitavano un mestiere, e che il monachesimo ha accolto questa eredità: «il lavoro manuale è parte costitutiva del monachesimo cristiano». Il capitolo 48 ne è la prova: lavoro e lettura hanno le loro ore, per tutti. Nel 1964 Paolo VI, con la lettera apostolica *Pacis nuntius*, proclamò Benedetto **patrono** d’Europa (dal latino *patronus*, da *pater*, «padre»), scrivendo che lui e i suoi monaci portarono il Vangelo «con la croce, con il libro e con l’aratro».\n\n**Eppure** due precisazioni evitano le esagerazioni. I monasteri non furono l’unica via per cui i testi antichi arrivarono fino a noi: passarono anche per Bisanzio e per il mondo islamico. E la formula *ora et labora* non compare nel testo della Regola: è il modo in cui la tradizione benedettina ne ha riassunto lo spirito.' },
      { titolo: 'Una regola di oggi, letta allo stesso modo',
        testo: 'Torniamo alla norma da cui siamo partiti. La circolare del Ministero dell’Istruzione e del Merito n. 3392 del 16 giugno 2025 vieta lo smartphone in orario scolastico, «anche a fini didattici». Il **fine** dichiarato è la salute e il benessere degli adolescenti, insieme ai loro risultati scolastici, con il richiamo a studi dell’OCSE, dell’Organizzazione mondiale della sanità e dell’Istituto superiore di sanità. La **misura** è un divieto uguale per tutti. Le **eccezioni** (dal latino *exceptio*, da *excipere*, «trarre fuori») riguardano chi ne ha bisogno: gli studenti per cui l’uso è previsto dal Piano educativo individualizzato o dal Piano didattico personalizzato, e i casi di «motivate necessità personali».\n\nSi può obiettare che un divieto, da solo, non insegna a usare bene uno strumento. L’obiezione è seria, e colpisce la misura, non il fine: infatti la circolare stessa chiede di educare a un uso responsabile e consapevole. Distinguere i tre piani permette di discutere senza confondersi: si può condividere il fine e contestare la misura; più difficile è accettare una misura senza sapere a che cosa serve.' },
      { titolo: 'Per lo studio',
        testo: '1. Perché la Regola dedica un capitolo intero agli ospiti, se il loro arrivo scompagina l’orario? Rispondi usando 53,1 e 53,15, e spiega a che cosa serve la cucina separata di 53,16.\n\n2. In 40,3 la razione è calcolata «tenendo presente lo stato di salute dei più deboli». Che differenza fa, in pratica, calcolare una misura sulla media del gruppo oppure sui suoi membri più fragili? Fai un esempio dalla vita di classe o di squadra.\n\n3. Perché la parola «abate» aiuta a capire i limiti dell’autorità nel monastero? Usa 2,2-4 e 3,7.\n\n4. Una regola che non riesci a rispettare è per ciò stesso sbagliata? Rispondi in cinque righe: la risposta viene valutata per il ragionamento, non per la posizione scelta.' },
      { titolo: 'La risposta',
        testo: 'Una comunità si dà una regola quando ha uno scopo che non raggiunge per caso e che nessuno, da solo, riesce a tenere fermo. La regola non è quello scopo: ne è la misura quotidiana, ed è buona finché lo rende praticabile anche a chi fa più fatica. Quando smette di dire a che cosa serve, non diventa più leggera: diventa soltanto un’organizzazione. Resta aperta una domanda che il testo non chiude: chi stabilisce il fine di una comunità, quando non è più evidente a nessuno?' }
    ],
    fonti: [
      '*San Benedetto, Regola*, traduzione italiana in lingua corrente a cura dei Benedettini di Noci (Bari), Edizioni La Scala: Prologo 45-46; capp. 1-3, 40, 48, 53, 57, 64, 73. I curatori dichiarano una traduzione condotta «con una certa libertà».',
      'A. de Vogüé, «Regula Benedicti», in *Dizionario degli Istituti di Perfezione*, vol. II, coll. 1555-1564 (rapporto con la *Regola del Maestro*).',
      'Gregorio Magno, *Dialoghi*, libro II (vita di Benedetto).',
      'Benedetto XVI, Udienza generale del 9 aprile 2008; Discorso al Collège des Bernardins, Parigi, 12 settembre 2008, vatican.va.',
      'Paolo VI, lettera apostolica *Pacis nuntius*, 24 ottobre 1964, vatican.va.',
      '*Vocabolario Treccani*, voci «regola», «abate», «cenobio», «anacoreta», «emina», «discrezione», «prologo», «efficienza», «ospite», «patrono», «eccezione».',
      'Ministero dell’Istruzione e del Merito, circolare 16 giugno 2025, n. 3392 (uso degli smartphone nel secondo ciclo di istruzione).',
      'Bibbia CEI 2008: Mt 25,35; Rm 8,15.'
    ]
  },

  giochi: {
    tema: 'La misura dei più deboli — la Regola di Benedetto',
    sfida: [
      { q: 'Che cosa significa «cenobio»?', a: ['Luogo isolato', 'Vita comune', 'Casa di preghiera', 'Scuola di lettura'], ok: 1 },
      { q: 'Che cos’è la «Regola del Maestro»?', a: ['Una regola più tarda che copia Benedetto', 'Il nome antico della Regola di Benedetto', 'Una regola scritta da Gregorio Magno', 'Un testo anonimo più lungo, usato da Benedetto come fonte'], ok: 3 },
      { q: 'Da dove vengono quasi tutte le notizie sulla vita di Benedetto?', a: ['Dai Dialoghi di Gregorio Magno', 'Dalla Regola stessa', 'Da un diario di Montecassino', 'Da una cronaca romana'], ok: 0 },
      { q: 'Nel Prologo la Regola dichiara che il monastero è…', a: ['un’azienda agricola', 'un rifugio dalle guerre', 'una scuola di servizio divino', 'una biblioteca'], ok: 2 },
      { q: '«Un solo turno di mensa costa meno di due.» Questa frase parla di…', a: ['fine', 'efficienza', 'discrezione', 'accoglienza'], ok: 1 },
      { q: 'In 40,3 la razione di vino è calcolata…', a: ['sulla media della comunità', 'sui più robusti', 'sui più deboli', 'sul prezzo del vino'], ok: 2 },
      { q: 'Come va accolto l’ospite secondo la Regola (53,1)?', a: ['Come Cristo in persona', 'Dopo il pasto della comunità', 'Solo se è un monaco', 'Con una tassa d’ingresso'], ok: 0 },
      { q: 'Perché il monastero vende a un prezzo più basso (57,8-9)?', a: ['Per battere la concorrenza', 'Perché i prodotti erano peggiori', 'Per ordine del vescovo', 'Affinché in tutto sia glorificato Dio'], ok: 3 }
    ],
    cat: {
      bins: ['Fine', 'Regola', 'Efficienza'],
      items: [
        ['Una scuola di servizio divino', 0],
        ['Da Pasqua al 1° ottobre si lavora fin verso le dieci', 1],
        ['Un solo turno di mensa costa meno di due', 2],
        ['Accogliere l’ospite come Cristo', 0],
        ['Una razione di vino fissata per ogni fratello', 1],
        ['Più ore di lavoro producono più raccolto', 2],
        ['In Quaresima ciascuno riceve un libro da leggere per intero', 1],
        ['Decidere senza consultare fa risparmiare tempo', 2],
        ['Che in tutto sia glorificato Dio', 0],
        ['Una cucina separata per gli ospiti', 1],
        ['Vendere al prezzo più alto possibile', 2],
        ['Cercare Dio', 0]
      ]
    },
    quiz: [
      { q: 'Che cosa dice la Regola subito dopo aver fissato le ore di lavoro (48,9)?', a: ['Chi non lavora non mangia', 'Tutto si faccia con moderazione, tenendo presente chi è di costituzione debole', 'Il lavoro viene prima della preghiera', 'Le ore si possono cambiare a piacere'], ok: 1, why: 'L’orario esiste ed è uguale per tutti, ma non decide da solo: il criterio è chi fa più fatica.' },
      { q: '«Abate» viene da una parola aramaica che significa…', a: ['maestro', 'custode', 'anziano', 'padre'], ok: 3, why: '*Abbā*, «padre»: un padre, non un padrone. Per questo l’abate non può comandare nulla contro i comandamenti di Dio (2,4).' },
      { q: 'Nella Regola la «discrezione» è…', a: ['la riservatezza', 'la capacità di trovare la giusta misura nel caso concreto', 'il diritto di non rispondere', 'il silenzio dei monaci'], ok: 1, why: '«Madre di tutte le virtù»: regola tutto perché i forti desiderino fare di più e i deboli non si scoraggino (64,19).' },
      { q: 'Per le questioni importanti, come decide l’abate (cap. 3)?', a: ['Ascolta tutti, anche il più giovane, poi decide e ne risponde', 'Fa votare la comunità', 'Decide da solo senza consultare', 'Chiede al vescovo'], ok: 0, why: 'Il consiglio di tutti è previsto, il voto no: la decisione ultima è sua (3,5), ma sta sotto la Regola (3,7).' },
      { q: 'Per Benedetto XVI, che cosa cercavano i monaci?', a: ['Conservare la cultura antica', 'Creare una nuova cultura', 'Quaerere Deum, cercare Dio', 'Diventare ricchi'], ok: 2, why: 'Biblioteca e scuola ne furono l’effetto: cercare Dio nella Scrittura richiede di saper leggere.' },
      { q: 'L’obiezione «un divieto non insegna a usare bene il telefono» colpisce…', a: ['il fine della circolare', 'le eccezioni', 'nulla: non è un’obiezione', 'la misura scelta'], ok: 3, why: 'Si può condividere il fine (salute, benessere, apprendimento) e discutere il mezzo.' }
    ],
    vf: [
      { s: 'Benedetto inventa il monachesimo.', v: false, why: 'Esisteva da due secoli in Oriente, e in Italia circolavano altre regole, come quella del Maestro.' },
      { s: 'Dal 1° ottobre la Regola mette la lettura prima del lavoro.', v: true, why: 'Le giornate sono più corte e l’ordine si rovescia (48,10-11).' },
      { s: 'Per la Regola l’ospite è un disturbo da contenere.', v: false, why: 'Va accolto «come Cristo in persona» (53,1); la cucina separata serve a organizzare l’accoglienza, non a evitarla.' },
      { s: 'La Regola vincola anche l’abate.', v: true, why: '«In ogni cosa tutti seguano la Regola come maestra» (3,7), e l’abate renderà conto di ogni decisione (3,11).' },
      { s: 'La Regola non prevede punizioni.', v: false, why: 'Prevede controlli e castighi (48,17-20), anche corporali per gli ostinati (2,28), secondo l’uso del tempo.' },
      { s: '«Ora et labora» è una frase della Regola.', v: false, why: 'Non compare nel testo: è il motto con cui la tradizione ne riassume lo spirito.' },
      { s: 'Efficiente vuol dire sbagliato.', v: false, why: 'L’efficienza non è un male: sbaglia quando prende il posto del fine.' },
      { s: 'I monasteri furono l’unica via per cui la cultura antica arrivò a noi.', v: false, why: 'Passò anche per Bisanzio e per il mondo islamico.' }
    ],
    seq: [
      { t: 'Nascono i primi cenobi in Egitto e in Oriente', y: 'IV sec.' },
      { t: 'Benedetto nasce a Norcia', y: 'c. 480' },
      { t: 'Si trasferisce a Montecassino', y: '529' },
      { t: 'Muore a Montecassino', y: '547' },
      { t: 'Gregorio Magno scrive i Dialoghi', y: 'c. 593' },
      { t: 'Paolo VI lo proclama patrono d’Europa', y: '1964' }
    ],
    abbina: [
      ['Prologo 45', 'Una scuola di servizio divino'],
      ['40,3', 'La misura sui più deboli'],
      ['53,1', 'L’ospite come Cristo'],
      ['2,4', 'Il limite dell’abate'],
      ['64,19', 'La discrezione, madre delle virtù']
    ],
    flash: [
      ['Fine', 'Ciò per cui un gruppo esiste; nessuna organizzazione lo produce da sola.'],
      ['Regola', 'Dal latino regula, da regere, «guidare diritto»: la misura concreta che rende praticabile il fine.'],
      ['Efficienza', 'Il rapporto fra risultato e risorse: dice quanto, non perché.'],
      ['Discrezione', 'La capacità di trovare la giusta misura nel caso concreto.'],
      ['Cenobio', 'Dal greco koinóbion, «vita comune»: il monastero.'],
      ['Abate', 'Dall’aramaico abbā, «padre»: il superiore del monastero.'],
      ['Lectio divina', 'Lettura lenta e meditata della Scrittura.'],
      ['Emina', 'Misura romana di circa 0,27 litri, usata in 40,3; la quantità esatta del tempo è discussa.']
    ]
  }
};

/* =====================================================================
   Componente della lezione: «Misura» (React con htm), scena 5.
   Che cosa fa capire: una misura comune si calcola su qualcuno. Calcolata sulla media rende di più ma lascia indietro
   i più deboli; calcolata sui più deboli costa resa, ma tutti reggono; con la discrezione i forti possono fare di più
   (40,3; 48,9; 64,19). Le forze e la «resa» sono uno schema immaginario, dichiarato sullo schermo.
   Interazioni: tre criteri (la-choice: hover bordo oro e spostamento, active 0,97, focus oro, scelta = bordo oro),
   «Che cosa sceglie la Regola?» e «E la discrezione?» (ll-btn: magnetico, lama di luce, active 0,96, focus oro),
   «Ricomincia» (ll-link). Esiti sempre con una parola, non solo con il colore («regge», «non regge»).
   Memoria solo in pagina: tornando alla scena (anche dopo la pausa gioco) il componente riprende da dove era rimasto.
   ===================================================================== */
(function () {
  var MEM = {};
  function useMem(key, iniziale) {
    var s = React.useState(function () { return Object.prototype.hasOwnProperty.call(MEM, key) ? MEM[key] : iniziale; });
    return [s[0], function (v) { MEM[key] = v; s[1](v); }];
  }
  var I = LabLezione.inline;

  var CSS = '' +
    '.ms{display:grid;gap:13px}' +
    '.ms-crit{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}' +
    '@media(max-width:560px){.ms-crit{grid-template-columns:1fr}}' +
    '.ms-crit .la-choice{flex-direction:column;align-items:flex-start;gap:2px;padding:10px 13px;min-width:0;text-align:left}' +
    '.ms-crit .la-choice small{color:var(--lab-muted);font-size:13px;line-height:1.3}' +
    '.ms-crit .la-choice:hover:not(:disabled){transform:translateY(-2px);border-color:var(--lab-oro)}' +
    '.ms-crit .la-choice:active:not(:disabled){transform:scale(.97)}' +
    '.ms-crit .la-choice:focus-visible{outline:1.5px solid var(--lab-oro);outline-offset:2px}' +
    '.ms-crit .la-choice[aria-pressed="true"]{border-color:var(--lab-oro);background:var(--lab-oro-soft,transparent)}' +
    '.ms-crit .la-choice.is-regola{border-color:var(--la-accent)}' +
    '.ms-stage{position:relative;border:1px solid var(--lab-line);border-radius:21px;padding:8px 8px 0;background:var(--lab-surface)}' +
    '.ms-svg{display:block;width:100%;max-width:620px;height:auto;max-height:46vh;margin:0 auto}' +
    '.ms-bar{transition:fill 377ms var(--lab-ease-out,ease),opacity 377ms}' +
    '.ms-bar.is-ok{fill:color-mix(in srgb,var(--la-accent) 70%,transparent)}' +
    '.ms-bar.is-ko{fill:color-mix(in srgb,var(--lab-rosso) 55%,transparent)}' +
    '.ms-bar.is-idle{fill:color-mix(in srgb,var(--lab-ink) 22%,transparent)}' +
    '.ms-extra{fill:color-mix(in srgb,var(--lab-oro) 45%,var(--lab-surface));stroke:var(--lab-oro);stroke-width:1.5;stroke-dasharray:4 3;animation:ms-up 610ms var(--lab-ease-out,ease) both}' +
    '@keyframes ms-up{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}' +
    '.ms-line{transition:transform 987ms cubic-bezier(.16,1,.3,1)}' +
    '.ms-line line{stroke:var(--lab-oro);stroke-width:2.5}' +
    '.ms-line text{fill:var(--lab-oro);font:700 11px var(--lab-font-ui,sans-serif);letter-spacing:.06em}' +
    '.ms-lbl{fill:var(--lab-muted);font:600 10px var(--lab-font-ui,sans-serif)}' +
    '.ms-mark{font:800 10px var(--lab-font-ui,sans-serif)}' +
    '.ms-mark.is-ko{fill:var(--lab-rosso)}' +
    '.ms-mark.is-ok{fill:var(--lab-ink)}' +
    '.ms-base{stroke:var(--lab-line);stroke-width:1.5}' +
    '.ms-note{margin:0;padding:5px 8px 8px;font-size:12px;color:var(--lab-muted)}' +
    '.ms-read{display:flex;flex-wrap:wrap;gap:8px 21px;align-items:baseline}' +
    '.ms-read b{font:600 26px/1 var(--lab-font-display,serif);color:var(--lab-ink);font-variant-numeric:tabular-nums}' +
    '.ms-read span{font-size:14px;color:var(--lab-muted)}' +
    '.ms-cmp{width:100%;border-collapse:collapse;font-size:14px}' +
    '.ms-cmp th,.ms-cmp td{padding:5px 8px;border-bottom:1px dashed var(--lab-line);text-align:left}' +
    '.ms-cmp th{font-family:var(--lab-font-inscription,serif);font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--lab-muted);font-weight:600}' +
    '.ms-cmp tr.is-cur td{color:var(--lab-ink);font-weight:700}' +
    '.ms-q{margin:0;padding:13px 21px;border-left:3px solid var(--lab-oro);font:500 italic 20px/1.4 var(--lab-font-display,serif);color:var(--lab-ink)}' +
    '.ms-q small{display:block;font:600 12px var(--lab-font-ui,sans-serif);font-style:normal;color:var(--lab-muted);margin-top:5px}' +
    /* linea del tempo della scena 2: cinque date in una riga anche sul telefono, senza scorrimento interno */
    '@media(max-width:560px){.ll-scene .ll-tl-b{flex:1 1 0;min-width:0;padding:0 1px;font-size:12px}.ll-scene .ll-tl-b span{font-size:11px;letter-spacing:.02em}}' +
    '@media(max-width:560px){.ms-lbl{font-size:14px}.ms-mark{font-size:14px}.ms-line text{font-size:14px}}' +
    '@media(prefers-reduced-motion:reduce){.ms-line,.ms-bar{transition:none}.ms-extra{animation:none}}';
  (function () {
    try {
      if (document.getElementById('ms-css')) return;
      var st = document.createElement('style'); st.id = 'ms-css'; st.textContent = CSS; document.head.appendChild(st);
    } catch (e) { /* senza stile aggiuntivo il componente resta usabile con le classi del kit */ }
  })();

  /* Schema immaginario: nove fratelli con forze diverse (0-10). */
  var FORZE = [2, 3, 5, 6, 6, 7, 8, 9, 10];
  var CRIT = [
    { id: 'forti', t: 'Sui più robusti', d: 'quanto regge chi ha più forza', v: 9 },
    { id: 'media', t: 'Sulla media', d: 'quanto regge il fratello medio', v: 6 },
    { id: 'deboli', t: 'Sui più deboli', d: 'quanto regge chi fa più fatica', v: 2 }
  ];
  function conta(v) { return FORZE.filter(function (f) { return f >= v; }).length; }

  LabLezione.registra('Misura', function (p) {
    var s1 = useMem('ms-c', null), c = s1[0], setC = s1[1];
    var s2 = useMem('ms-visti', {}), visti = s2[0], setVisti = s2[1];
    var s3 = useMem('ms-passo', 0), passo = s3[0], setPasso = s3[1]; /* 0 la classe prova · 1 la Regola · 2 la discrezione */
    var cur = c !== null ? CRIT[c] : null;
    var v = cur ? cur.v : null;
    var W = 400, H = 190, B = 160, U = 13, X0 = 14, SL = 36;
    function scegli(i) {
      if (passo > 0) return;
      setC(i); var o = Object.assign({}, visti); o[i] = 1; setVisti(o);
      var n = conta(CRIT[i].v);
      if (n < FORZE.length) p.ctx.oops(); else p.ctx.say('Reggono tutti. Ma guardate quanto rende.');
    }
    function regola() { setC(2); setPasso(1); p.ctx.cheer(); p.ctx.say('Tenendo presente lo stato di salute dei più deboli: 40,3.'); }
    function discrezione() { setPasso(2); p.ctx.festa(); p.ctx.say('I forti desiderino fare di più e i deboli non si scoraggino: 64,19.'); }
    function ricomincia() { setC(null); setVisti({}); setPasso(0); }
    var nVisti = Object.keys(visti).length;
    var reggono = v !== null ? conta(v) : null;

    return html`<div className="ms">
      <div className="ms-crit" role="group" aria-label="Su chi calcolate la misura comune?">
        ${CRIT.map(function (k, i) {
          return html`<button key=${k.id} type="button" className=${'la-choice' + (passo > 0 && i === 2 ? ' is-regola' : '')} aria-pressed=${c === i} disabled=${passo > 0 && i !== 2} onClick=${function () { scegli(i); }}>
            <b>${k.t}</b><small>${k.d}</small></button>`;
        })}
      </div>

      <figure className="ms-stage" style=${{ margin: 0 }}>
        <svg className="ms-svg" viewBox=${'0 0 ' + W + ' ' + H} role="img"
          aria-label=${cur ? 'Misura calcolata ' + cur.t.toLowerCase() + ': reggono ' + reggono + ' fratelli su ' + FORZE.length : 'Nove fratelli con forze diverse; nessuna misura ancora scelta'}>
          <line className="ms-base" x1="8" y1=${B} x2=${W - 8} y2=${B} />
          ${FORZE.map(function (f, i) {
            var x = X0 + i * SL, h = f * U, ok = v === null ? null : f >= v;
            var extra = passo === 2 && f > v ? f - v : 0;
            return html`<g key=${i}>
              <rect className=${'ms-bar ' + (ok === null ? 'is-idle' : ok ? 'is-ok' : 'is-ko')} x=${x} y=${B - h} width="24" height=${h} rx="5" />
              ${extra > 0 && html`<rect key=${'x' + passo} className="ms-extra" x=${x} y=${B - (v + extra) * U} width="24" height=${extra * U} rx="5" />`}
              ${ok !== null && html`<text className=${'ms-mark ' + (ok ? 'is-ok' : 'is-ko')} x=${x + 12} y=${B - h - 5} text-anchor="middle">${ok ? '✓' : '✗'}</text>`}
              <text className="ms-lbl" x=${x + 12} y=${B + 14} text-anchor="middle">${f}</text>
            </g>`;
          })}
          <text className="ms-lbl" x=${X0} y=${B + 27} text-anchor="start">forza di ciascun fratello (schema)</text>
          ${v !== null && html`<g className="ms-line" style=${{ transform: 'translateY(' + (B - v * U) + 'px)' }}>
            <line x1="6" y1="0" x2=${W - 6} y2="0" />
            <text x=${W - 6} y="-5" text-anchor="end">MISURA</text>
          </g>`}
        </svg>
        <figcaption className="ms-note">Schema immaginario: nove fratelli, forze da 2 a 10. La linea d’oro è la misura comune: chi ha forza pari o maggiore regge (✓), chi ne ha meno no (✗).${passo === 2 ? ' In oro tratteggiato: ciò che i più forti possono fare in più.' : ''}</figcaption>
      </figure>

      <div aria-live="polite">
        ${cur ? html`<div className="ms-read">
            <span><b>${reggono}</b> su ${FORZE.length} reggono</span>
            <span><b>${FORZE.length - reggono}</b> restano indietro</span>
            <span><b>${v * reggono}</b> resa del giorno (misura × chi regge)</span>
          </div>`
          : html`<p className="ll-hint" style=${{ margin: 0 }}>Scegliete un criterio: la linea d’oro è la misura comune, uguale per tutti.</p>`}
      </div>

      ${nVisti >= 2 && html`<table className="ms-cmp">
        <thead><tr><th>Criterio</th><th>Reggono</th><th>Resa</th></tr></thead>
        <tbody>${CRIT.map(function (k, i) { if (!visti[i]) return null; var n = conta(k.v);
          return html`<tr key=${i} className=${c === i ? 'is-cur' : ''}><td>${k.t}</td><td>${n} su ${FORZE.length}</td><td>${k.v * n}</td></tr>`; })}</tbody>
      </table>`}

      ${passo === 0 && nVisti > 0 && html`<p className="ll-why is-ko">${nVisti < 2
        ? I('Provate anche un altro criterio: che cosa cambia per chi ha meno forza?', 'h')
        : I('La misura **sulla media** rende di più, ma lascia indietro tre fratelli: è il criterio dell’**efficienza**. Che cosa sceglie la Regola?', 'h')}</p>`}

      ${passo >= 1 && html`<div>
        <blockquote className="ms-q">«Tuttavia, tenendo presente lo stato di salute dei più deboli, pensiamo che a ogni fratello basti mezzo litro circa di vino al giorno.»<small>Regola di san Benedetto, 40,3 (trad. Benedettini di Noci)</small></blockquote>
        <p className="ll-why is-ok">${I('La Regola sceglie la misura che **rende meno** e lo dice: è calcolata sui più deboli e **vale per tutti**. Lo stesso per il lavoro: «Tutto però si faccia con moderazione, tenendo presente chi è di costituzione debole» (48,9). L’{emina} di 40,3 valeva circa 0,27 litri: conta il criterio, non la quantità.', 'r')}</p>
      </div>`}

      ${passo === 2 && html`<p className="ll-why is-ok">${I('Con la {discrezione}, «madre di tutte le virtù», la misura comune non è un tetto: chi è più forte può fare di più (in oro tratteggiato), e l’abate può aumentare la razione per il clima o la fatica (40,5). Tutto «in modo che i forti desiderino fare di più e i deboli non si scoraggino» (64,19).', 'd')}</p>`}

      <div className="ll-row">
        ${passo === 0 && html`<button type="button" className="ll-btn" disabled=${nVisti < 2} onClick=${regola}>Che cosa sceglie la Regola?</button>`}
        ${passo === 1 && html`<button type="button" className="ll-btn" onClick=${discrezione}>E la discrezione?</button>`}
        ${(nVisti > 0 || passo > 0) && html`<button type="button" className="ll-link" onClick=${ricomincia}>Ricomincia</button>`}
        <span className="ll-tally">${passo === 0 ? 'Criteri provati: ' + nVisti + ' di 3' : passo === 1 ? 'La Regola' : 'La discrezione'}</span>
      </div>
    </div>`;
  });
})();
