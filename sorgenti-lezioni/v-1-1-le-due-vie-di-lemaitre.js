/* ---- lezione ---- */
/* Classe V · UDA 1 «Le due vie di Lemaître» (nel fascicolo: «Il cosmo esaurisce le domande?») · Lezione 1 —
   «La visione cosmologica di Lemaître». Artefatto «Le due vie di Lemaître» (50 minuti, 12 scene, 4 fasi).
   Rifatto il 7-8 ottobre 2026 con la skill «IRC · Artefatto interattivo della lezione» (kit Lab IRC del 5 ottobre 2026),
   mascotte Terra. Contenuti: fascicolo «Le due vie di Lemaître» (uploads/v1-1il~1.pdf, invariato) e artefatto
   del 28 settembre 2026. Note del docente: v-1-1-le-due-vie-di-lemaitre.docente.md.
   Correzioni rispetto alla versione precedente (dettagli nelle note): la lettera trovata da Mario Livio è resa nota
   nel 2011 (Nature 479, 10 novembre 2011), non nel 2010; la misura DESI del 30 luglio 2026 (foresta Lyman-alfa) sposta
   il valore centrale verso il modello standard ma non chiude la questione; Tommaso, Summa theologiae I, q. 46, aa. 1-2
   (non solo a. 2); nella frase di Pio XII il passaggio di piano avviene già alla parola «creazione»; la frase di
   Einstein del 1927 non si cita fra virgolette (ne è certo il senso, non le parole); traduzioni dal latino dichiarate.
   Componenti propri: TreInizi (tre domande sullo stesso stato iniziale), Salto (la frase di Pio XII, 1951).
   Lo stile dei componenti è dentro questo file (<style id="lm-css">, solo token): non serve --css.
   La lezione 2 dell'UDA («Creazione e primo istante») sviluppa conservazione, ex nihilo, Genesi 1 e il rapporto
   inizio/fondamento: qui non si anticipano, si rimanda. © Matteo Sestili — Tutti i diritti riservati */

window.LEZIONE = {
  slug: 'v-1-1-le-due-vie-di-lemaitre',
  classe: 'Anno V',
  titolo: 'Le due vie di *Lemaître*',
  sottotitolo: 'Un sacerdote, l’universo in espansione e il limite di ciò che una scoperta può dimostrare.',
  saluto: 'Ultima tappa: torniamo ai due titoli.',

  glossario: {
    'cosmologia': { etim: 'dal greco *kósmos*, «ordine, mondo ordinato», e *lógos*, «discorso»', def: 'La scienza che studia l’universo nel suo insieme, la sua struttura e la sua storia, con osservazioni e modelli matematici.' },
    'modello': { etim: 'dal latino *modulus*, diminutivo di *modus*, «misura», attraverso la forma volgare *modellus*', def: 'In fisica: una descrizione matematica che riproduce i dati osservati e fa previsioni controllabili. Si corregge o si sostituisce quando i dati lo chiedono.' },
    'ipotesi': { etim: 'dal greco *hypóthesis*, affine al verbo *hypotíthēmi*, «porre sotto»', def: 'Ciò che si mette alla base di un ragionamento per metterlo alla prova: né un’opinione arbitraria né una verità definitiva. Lemaître intitolò il suo libro del 1946 *L’hypothèse de l’atome primitif*.' },
    'biografia': { etim: 'dal greco tardo *biographía*: *bíos*, «vita», e *gráphein*, «scrivere»', def: 'Il racconto della vita di una persona. Spiega come è nata una ricerca; non la conferma e non la smentisce.' },
    'interpretazione': { etim: 'dal latino *interpretatio*, da *interpres*, «intermediario, traduttore»', def: 'Il significato che si attribuisce a un risultato rispetto a domande che la fisica non pone. È legittima, ma va dichiarata e argomentata.' },
    'espansione': { etim: 'dal latino tardo *expansio*, da *expandere*, «stendere, spiegare»', def: 'Nella cosmologia: le distanze fra le galassie lontane crescono nel tempo, perché è lo spazio stesso a dilatarsi. Non è un’esplosione dentro uno spazio già pronto.' },
    'atomo primitivo': { etim: '*atomo* dal greco *átomos*, «indivisibile» (da *témnō*, «tagliare», con *a* privativo); *primitivo* dal latino *primitivus*, «che è primo»', def: 'Il nome che Lemaître diede nel 1931 allo stato iniziale densissimo dell’universo, ricavato seguendo l’espansione all’indietro. È l’antenato di ciò che oggi chiamiamo Big Bang.' },
    'Big Bang': { parola: 'Big Bang', etim: 'inglese, «grande botto»: il nome lo usò nel 1949, alla radio della BBC, Fred Hoyle, che non credeva a un inizio', def: 'Il modello in cui l’universo si espande e si raffredda a partire da una fase molto calda e densa. Il nome ironico è rimasto.' },
    'metafisica': { etim: 'dal latino medievale *metaphysica*, dal greco *tà metà tà physiká*, «le cose dopo la fisica»: secondo la spiegazione tradizionale, il titolo dato agli scritti di Aristotele collocati, nell’ordinamento delle sue opere, dopo la *Fisica*', def: 'La parte della filosofia che si chiede che cosa significhi essere e perché esista qualcosa. Il nome indicava una posizione fra le opere di Aristotele; poi fu letto come «oltre la fisica».' },
    'creazione': { etim: 'dal latino *creatio*, da *creare*, «far nascere, produrre»', def: 'Nella fede cristiana: la relazione per cui Dio pone il mondo nell’essere, liberamente e dal nulla. Non coincide con lo stato iniziale descritto da un modello.' },
    'trascendente': { etim: 'dal latino *transcendens*, participio di *transcendere*, «oltrepassare, andare al di là»', def: 'Ciò che sta oltre il mondo e non ne è una parte: per la fede, Dio rispetto alle creature.' },
    'concordismo': { etim: 'derivato di *concordia*, dal latino *concors*, «di un solo cuore» (*cum*, «con», e *cor, cordis*, «cuore»)', def: 'La tendenza a cercare un accordo diretto fra le affermazioni della fede e i risultati della scienza: «il Big Bang conferma la Genesi».' },
    'fideismo': { etim: 'derivato moderno (XIX secolo) del latino *fides*, «fede»', def: 'L’errore opposto al concordismo: fede e ragione come due mondi isolati, che non hanno nulla da dirsi. La Chiesa lo ha respinto (Vaticano I, *Dei Filius*).' },
    'dialogo': { etim: 'dal greco *diálogos*, da *dialégomai*, «discorrere»: *diá* significa «attraverso», non «due»', def: 'Un confronto in cui la parola passa attraverso gli interlocutori. Fra scienza e fede: due vie distinte che si parlano, con consonanze e dissonanze.' }
  },

  scene: [
    /* ---------------- AGGANCIO · 4′ ---------------- */
    { fase: 'Aggancio', momento: 'Apertura', minuti: 4, titolo: 'Due titoli, una *domanda*',
      lead: 'Li abbiamo letti tutti, in una versione o nell’altra.',
      blocchi: [
        { tipo: 'domanda', id: 'ingresso', etichetta: 'Anonimo · per alzata di mano',
          q: 'Quale dei due titoli vi convince di più?',
          opzioni: ['«Il Big Bang conferma la Genesi»', '«La scienza ha dimostrato che Dio non serve»', 'Nessuno dei due', 'Non saprei'],
          dibattito: 'Teniamo da parte il risultato: alla fine dell’ora rifacciamo la stessa domanda.' },
        { tipo: 'rivela', titolo: 'Intanto la cosmologia si corregge', pulsante: 'E poi?', passi: [
          { titolo: 'Marzo 2025', testo: 'La collaborazione **DESI**, che ha mappato milioni di galassie, annuncia indizi più forti che l’energia oscura possa **cambiare nel tempo**: se confermati, il {modello} standard andrebbe ritoccato.' },
          { titolo: 'Luglio 2026', testo: 'Una nuova misura dello stesso progetto si avvicina di nuovo al modello standard. La questione resta **aperta**: i primi risultati sui cinque anni completi di osservazioni sono attesi nel 2027.' },
          { titolo: 'Per questo la domanda', testo: 'La {cosmologia} propone, controlla, corregge. Una fede può appoggiarsi a un modello dell’universo? Se lo chiese l’uomo che per primo propose un inizio dell’universo. **Era un prete.**' }
        ] }
      ] },

    /* ---------------- SCOPERTA · 23′ ---------------- */
    { fase: 'Scoperta', momento: 'Contesto', minuti: 4, titolo: 'Un prete che *fa i conti*',
      lead: 'Georges Lemaître (1894-1966): sacerdote e fisico per tutta la vita. Apriamo le date.',
      blocchi: [
        { tipo: 'tappe', voci: [
          { data: '1923', breve: 'Sacerdote', titolo: 'Ordinazione, poi Cambridge', testo: 'Il 22 settembre è ordinato dal cardinale Mercier. Studia la relatività con **Arthur Eddington** a Cambridge, poi va a Harvard e al MIT; dal 1925 insegna a Lovanio.' },
          { data: '1927', breve: 'Il modello', titolo: 'Un universo in espansione', testo: 'Dalle equazioni della relatività generale ricava un universo in {espansione}: le galassie si allontanano con velocità **proporzionale alla distanza**. Quel primo modello **non ha un inizio**: parte dall’universo statico di Einstein.' },
          { data: '1927', breve: 'Einstein', titolo: 'Bruxelles, Consiglio Solvay', testo: 'Einstein respinge la fisica del modello con una frase famosa, giunta a noi in **versioni diverse**: se ne conosce il senso, non le parole esatte.' },
          { data: '1929', breve: 'Hubble', titolo: 'Il nome che resta', testo: 'Edwin Hubble pubblica la stessa relazione su dati propri. Per decenni si dirà «legge di Hubble».' },
          { data: '1931', breve: 'Traduzione', titolo: 'Il calcolo che manca', testo: 'Nella traduzione inglese dell’articolo del 1927 manca proprio il calcolo che dava a Lemaître la precedenza. Per anni si sospettò una censura.' },
          { data: '2011', breve: 'Livio', titolo: 'La lettera ritrovata', testo: 'L’astrofisico Mario Livio trova negli archivi della Royal Astronomical Society una lettera di Lemaître: non riteneva opportuno ristampare la sua discussione provvisoria. **Il taglio era suo.**' },
          { data: '2018', breve: 'IAU', titolo: 'Legge di Hubble-Lemaître', testo: 'L’Unione Astronomica Internazionale raccomanda il nuovo nome: **78%** dei 4.060 voti espressi. Per argomenti scientifici, non per la tonaca.' }
        ] },
        { tipo: 'verifica', etichetta: 'Verifica lampo',
          q: 'Il modello del 1927 non aveva un inizio. Perché questo dettaglio conta?',
          opzioni: ['Perché dimostra che Lemaître sbagliava i calcoli', 'Perché mostra che non cercava nella fisica la prima pagina della Genesi', 'Perché Einstein lo aveva costretto a toglierlo', 'Perché un prete non poteva parlare di inizio'], ok: 1,
          why: 'Chi pensa che la fede gli abbia «suggerito» la teoria trova un modello senza inizio. La {biografia} spiega come nasce una ricerca, non che cosa trova: l’inizio arriverà nel 1931, e arriverà dalla fisica.' }
      ] },

    { fase: 'Scoperta', minuti: 5, titolo: 'Tre piani da *distinguere*',
      lead: 'Risultato, biografia, {interpretazione}: nei titoli dei giornali arrivano sempre mescolati. Separiamoli.',
      blocchi: [
        { tipo: 'carte', carte: [
          { etichetta: 'Primo piano', fronte: 'Risultato', retro: 'Un’affermazione su grandezze misurabili, controllabile con osservazioni. Ha lo statuto di {ipotesi}: il suo valore **non dipende da chi l’ha formulata**.' },
          { etichetta: 'Secondo piano', fronte: 'Biografia', retro: 'Chi era l’autore e che cosa credeva. Spiega **come è nata** una ricerca; non la conferma e non la smentisce.' },
          { etichetta: 'Terzo piano', fronte: 'Interpretazione', retro: 'Il significato attribuito a un risultato per domande che la fisica **non pone**, per esempio perché esista qualcosa. È legittima, ma va dichiarata e argomentata.' }
        ] },
        { tipo: 'smista', titolo: 'Ogni frase in un piano solo', categorie: ['Risultato', 'Biografia', 'Interpretazione'],
          voci: [
            { t: 'Le galassie si allontanano con velocità proporzionale alla distanza.', c: 0, why: 'Riguarda grandezze misurabili e si controlla con le osservazioni.' },
            { t: 'Lemaître fu ordinato sacerdote nel 1923.', c: 1, why: 'Vero e documentato, ma riguarda l’autore: non rende la fisica più o meno credibile.' },
            { t: '«Se l’universo ha avuto un inizio, allora qualcuno l’ha fatto cominciare.»', c: 2, why: 'La prima metà richiama un dato; l’«allora» no: è un passaggio filosofico, che andrebbe argomentato.' },
            { t: 'Fu Lemaître stesso a togliere dalla traduzione il calcolo della sua precedenza.', c: 1, why: 'Fatto d’archivio sulle scelte dell’autore: illumina la persona, non la sua fisica.' },
            { t: 'Risalendo nel tempo, a un certo punto le equazioni non sono più affidabili.', c: 0, why: 'Anche il limite fa parte del risultato: non è una cautela aggiunta per lasciare spazio a Dio.' },
            { t: '«La cosmologia spiega l’universo: di un creatore non c’è più bisogno.»', c: 2, why: 'È l’errore simmetrico della terza frase: cambia la conclusione, non cambia il salto.' }
          ],
          chiusura: 'Due frasi finiscono in «Interpretazione» con conclusioni opposte e **lo stesso salto**. E screditare Lemaître perché prete, o arruolarlo perché prete, è lo stesso errore: giudicare il risultato con la biografia.' }
      ] },

    { fase: 'Scoperta', momento: 'Spiegazione', minuti: 4, titolo: 'Riavvolgere *l’espansione*',
      lead: 'Nel 1931 l’inizio arriva, e arriva dalla fisica. Seguiamo l’espansione all’indietro.',
      testo: 'Un inizio ricordava la creazione biblica, lontana dal mondo eterno di Aristotele: per questo, riferisce il biografo Dominique Lambert, Einstein diffidava dell’{atomo primitivo}.',
      blocchi: [
        { tipo: 'animazione', id: 'riavvolgi', rapporto: 1.9, ritmo: 2618, pulsante: 'Riavvolgi', titolo: 'Dall’oggi allo stato iniziale',
          attori: [
            { id: 'g1', t: 'galassia', forma: 'punto', colore: 'accent' },
            { id: 'g2', t: 'galassia', forma: 'punto', colore: 'accent' },
            { id: 'g3', t: 'galassia', forma: 'punto', colore: 'accent' },
            { id: 'noi', t: 'noi', forma: 'cerchio', colore: 'ciano' },
            { id: 'calda', t: 'denso e caldo', forma: 'pillola', colore: 'rosa' },
            { id: 'atomo', t: 'atomo primitivo', forma: 'cerchio', colore: 'oro' },
            { id: 'fis', t: 'realtà fisica', forma: 'riquadro', colore: 'muted' },
            { id: 'q', t: 'e prima?', forma: 'pillola', colore: 'muted' }
          ],
          frecce: [
            { id: 'a1', da: 'noi', a: 'g3', t: 'più veloce' },
            { id: 'a2', da: 'noi', a: 'g2' },
            { id: 'a3', da: 'noi', a: 'g1' },
            { id: 'a4', da: 'fis', a: 'atomo', tratteggio: true },
            { id: 'a5', da: 'q', a: 'fis', tratteggio: true }
          ],
          passi: [
            { didascalia: 'Oggi: le galassie lontane si allontanano, e **più sono lontane, più si allontanano in fretta**. È il dato del 1927 e del 1929.',
              attori: { noi: { x: 42, y: 46 }, g1: { x: 88, y: 20 }, g2: { x: 12, y: 22 }, g3: { x: 88, y: 86 } }, frecce: ['a1', 'a2', 'a3'] },
            { didascalia: 'Riavvolgiamo: le distanze si accorciano. Le equazioni della relatività generale reggono bene.',
              attori: { g1: { x: 74, y: 30 }, g2: { x: 26, y: 30 }, g3: { x: 74, y: 76 } }, frecce: [] },
            { didascalia: 'Ancora più indietro: l’universo è sempre più **denso e caldo**. Siamo ancora dentro il modello.',
              attori: { g1: { x: 64, y: 42, o: 0.6 }, g2: { x: 36, y: 42, o: 0.6 }, g3: { x: 60, y: 70, o: 0.6 }, noi: { o: 0 }, calda: { x: 50, y: 14, on: true } } },
            { didascalia: '1931: uno stato iniziale densissimo, che Lemaître chiama **atomo primitivo**. Una risposta a Eddington, su «Nature», in 457 parole.',
              attori: { g1: { o: 0 }, g2: { o: 0 }, g3: { o: 0 }, noi: { o: 0 }, calda: { o: 0 }, atomo: { x: 50, y: 52, s: 1.15, on: true } } },
            { didascalia: 'Qui le equazioni **smettono di essere affidabili**. E lo stato iniziale è una realtà fisica che viene da un’altra: un inizio naturale, non ancora la creazione.',
              attori: { atomo: { x: 50, y: 74, s: 1, on: false }, fis: { x: 50, y: 30, on: true }, q: { x: 16, y: 14 } }, frecce: ['a4', 'a5'] }
          ] },
        { tipo: 'aggancio', etichetta: 'Per capire', titolo: 'Da «ripugnante» a «Big Bang»',
          t: 'Nel marzo 1931 Eddington scrive su «Nature» che l’idea di un inizio dell’ordine presente della natura gli risulta filosoficamente ripugnante. Lemaître risponde il 9 maggio. Il nome {Big Bang} lo darà nel 1949, alla radio della BBC, un avversario: Fred Hoyle.',
          fonte: 'A. S. Eddington, Nature 127 (21 marzo 1931); G. Lemaître, Nature 127, p. 706 (9 maggio 1931)' }
      ] },

    { fase: 'Scoperta', momento: 'Fonte', minuti: 5, titolo: 'Poteva *approfittarne*',
      lead: 'Un prete trova un inizio dell’universo. Lemaître fece il contrario di ciò che ci si aspetterebbe.',
      blocchi: [
        { tipo: 'citazione', testo: 'Penso che chiunque creda in un essere supremo che sostiene ogni essere e ogni agire creda anche che Dio sia essenzialmente nascosto, e possa rallegrarsi di vedere come la fisica attuale fornisca un velo che nasconde la creazione.',
          fonte: 'G. Lemaître, frase finale cancellata dal dattiloscritto della lettera a «Nature» (1931), Archives Lemaître, Lovanio; in J.-P. Luminet, 2011 · trad. dall’inglese',
          pulsante: 'Che cosa ci dice?',
          commento: 'La fisica non è presentata come **prova** di Dio: stende un **velo** sulla creazione. E l’autore cancellò la frase prima di spedire la lettera: non volle mescolare i piani nemmeno così.' },
        { tipo: 'leggi', q: 'Quale frase è la tesi, da cui seguono le altre?',
          testo: '«Personalmente ritengo che [l’ipotesi] [[!rimanga interamente al di fuori di ogni questione metafisica o religiosa::È la **tesi**: l’ipotesi fisica non decide la questione di Dio, **in nessuno dei due sensi**. Le frasi che seguono ne traggono le conseguenze.]]. [[Essa permette al materialista anche di negare ogni essere trascendente::È una **conseguenza** per chi non crede: l’ipotesi non lo obbliga ad ammettere un essere {trascendente}. Lo dice un sacerdote, a un congresso di astrofisici.]]. […] [[Per il credente essa esclude ogni tentativo di familiarità con Dio::È una **conseguenza** per chi crede: Dio non si «incontra» alla fine di un calcolo, come un oggetto fra gli oggetti.]] […]. E [[si accorda anche con i versetti di Isaia quando parlano del “Dio nascosto”::Is 45,15: «Veramente tu sei un Dio nascosto, Dio d’Israele, salvatore» (CEI 2008). Non una prova: un **accordo**. Dio resta nascosto anche all’inizio.]], nascosto anche all’inizio della creazione.»',
          fonte: 'G. Lemaître, Consiglio Solvay, Bruxelles 1958 · trad. it. in D. Lambert, «Lemaître», Dizionario interdisciplinare di scienza e fede, II, pp. 1913-1914' }
      ] },

    { fase: 'Scoperta', minuti: 5, titolo: 'Tre *inizi*',
      lead: 'Lemaître distingueva tre cose che nel linguaggio comune si confondono. Stesso stato iniziale, tre domande diverse.',
      blocchi: [ { tipo: 'custom', nome: 'TreInizi' } ] },

    /* ---------------- ATTIVITÀ · 17′ ---------------- */
    { fase: 'Attività', momento: 'Pausa gioco', minuti: 6, titolo: 'Sfida *a squadre*',
      lead: 'Due squadre, otto domande su ciò che abbiamo visto finora.',
      blocchi: [
        { tipo: 'gioco', id: 'sfida', titolo: 'Sfida a squadre', testo: 'Venti secondi a turno: chi sbaglia lascia la domanda all’altra squadra, che può rubarla. Poi si torna qui.', pulsante: 'Si gioca' },
        { tipo: 'rivela', titolo: 'Al ritorno', iniziali: 1, pulsante: 'Altra domanda', passi: [
          { titolo: 'La più contesa', testo: 'Quale domanda ha diviso di più le squadre? Su quale piano stava?' },
          { titolo: 'Fisica o metafisica?', testo: '«Da quale stato fisico viene l’atomo primitivo?» è ancora una domanda di fisica, anche se oggi il modello non sa rispondere. Perché?' }
        ] }
      ] },

    { fase: 'Attività', momento: 'Spiegazione', minuti: 4, titolo: 'Che cosa afferma *la fede*',
      lead: 'La distinzione di Lemaître non è un compromesso: corrisponde a ciò che la Chiesa intende per {creazione}.',
      blocchi: [
        { tipo: 'catena', titolo: 'Dalla fede alla conseguenza', rottura: true,
          anelli: [
            { t: 'Tutto riceve l’essere da Dio, dal nulla e in ogni istante', d: 'È la **dipendenza** (Tommaso d’Aquino, *Summa theologiae* I, q. 104, a. 1): la riprende la prossima lezione.', senza: 'Senza la dipendenza la creazione si riduce a un evento lontano, che un modello potrebbe sostituire.' },
            { nesso: 'E inoltre', t: 'Il mondo ha avuto inizio', d: 'Dio «fin dal principio del tempo produsse dal nulla» ogni creatura (*Dei Filius*, cap. I, trad. dal latino; riprende il Lateranense IV, 1215); «il mondo ha avuto inizio quando è stato tratto dal nulla dalla Parola di Dio» (CCC 338).', senza: 'Senza questa affermazione non ci sarebbe nulla da confrontare con un modello che ha un inizio.' },
            { nesso: 'Eppure', t: 'Quell’inizio si conosce per fede', d: 'Per Tommaso la ragione non dimostra né che il mondo abbia avuto inizio né che non l’abbia avuto (I, q. 46, aa. 1-2).', senza: 'Senza questo anello la fede dovrebbe attendere il verdetto di ogni nuovo articolo di cosmologia.' },
            { nesso: 'Ne segue', t: 'Un modello con un inizio non prova la creazione; uno senza inizio non la smentisce', d: 'Il primo descrive una realtà fisica che viene da un’altra; il secondo non tocca ciò che la fede non ha ricavato dalla fisica.', senza: 'Senza questa conclusione restano i due titoli dell’inizio.' },
            { nesso: 'Per questo', t: 'La domanda decisiva riguarda il senso', d: '«Non si tratta soltanto di sapere quando e come sia sorto materialmente il cosmo […] quanto piuttosto di scoprire quale sia il senso di tale origine» (CCC 284).' }
          ],
          fine: '«Esistono due vie per arrivare alla verità. Ho deciso di seguirle entrambe» (Lemaître, intervista del 1933, riferita da Lambert).' }
      ] },

    { fase: 'Attività', momento: 'Fonte', minuti: 4, titolo: 'Dove avviene *il salto*?',
      lead: '22 novembre 1951: Pio XII parla alla Pontificia Accademia delle Scienze, di cui Lemaître è membro dal 1936.',
      blocchi: [ { tipo: 'custom', nome: 'Salto' } ] },

    { fase: 'Attività', momento: 'Sintesi', minuti: 3, titolo: 'Distinguere non è *separare*',
      lead: 'Due errori opposti, una via.',
      blocchi: [
        { tipo: 'scegli', etichetta: 'La parola esatta',
          testo: 'Chi scrive «il Big Bang conferma la Genesi» fa [fideismo|*concordismo|dialogo]. Chi dice che fede e scienza non hanno nulla da dirsi fa [*fideismo|concordismo|dialogo]. Per il Vaticano I fra fede e ragione [c’è un conflitto inevitabile|non c’è alcun rapporto|*non può esserci vero dissenso].',
          why: 'Il {concordismo} lega la fede a un modello destinato a cambiare; il {fideismo} la chiude in un sentimento che non dice nulla del mondo. Il Vaticano I parla di un «duplice ordine di conoscenza» fra i quali non può esserci «vero dissenso» (*Dei Filius*, cap. IV, trad. dal latino): è la via del {dialogo}.' },
        { tipo: 'dubbi', titolo: 'Un’obiezione seria', voci: [
          { q: 'Se rispondono a domande diverse, la fede non diventa un sentimento privato?', r: 'Il rischio esiste: lo stesso Lambert riconosce che la distinzione di Lemaître, spinta troppo in là, può far sembrare inutile il dialogo. Ma per il Vaticano I fede e ragione non solo non possono mai contraddirsi, «si aiutano anche a vicenda» (*opem quoque sibi mutuam ferunt*).', fonte: 'Concilio Vaticano I, Dei Filius, cap. IV (DH 3015-3019), traduzione nostra dal latino; D. Lambert, Dizionario interdisciplinare, II' },
          { q: 'E se domani il modello cambia?', r: 'Il fisico e teologo Robert John Russell propone di cercare fra teorie scientifiche e teologiche **consonanze e dissonanze**: quando un modello cambia, la dissonanza è un’occasione di capire meglio. I dati DESI possono rafforzare o indebolire un modello, non la fede di chi non vi ha mai appoggiato la fede.', fonte: 'R. J. Russell, voce «Dialogo scienze-teologia», Dizionario interdisciplinare di scienza e fede' },
          { q: 'Allora la scienza non ha niente da dire al credente?', r: 'Ha moltissimo da dire sul mondo che il credente riconosce creato. La ricerca metodica, se procede in modo veramente scientifico e secondo le norme morali, «non sarà mai in reale contrasto con la fede» (CCC 159, da *Gaudium et spes* 36). Il ponte fra le due vie lo fa la filosofia.', fonte: 'Catechismo della Chiesa Cattolica, n. 159' }
        ] }
      ] },

    /* ---------------- CHIUSURA · 6′ ---------------- */
    { fase: 'Chiusura', momento: 'Prova', minuti: 4, titolo: 'Un titolo *nuovo*',
      lead: '«Nuovi dati: il modello cosmologico va corretto. Crolla la creazione.» È un titolo immaginario: smontiamolo.',
      blocchi: [
        { tipo: 'quiz', etichetta: 'Prova', perfetto: 'Tre su tre: sapete dove passa il confine fra le due vie.', domande: [
          { q: 'Che cosa fa il titolo?', opzioni: ['Riporta un dato biografico', 'Passa da un risultato a un’interpretazione che non argomenta', 'Riporta soltanto un risultato scientifico'], ok: 1,
            why: '«Il modello va corretto» è un risultato; «crolla la creazione» è un’interpretazione presentata come conseguenza. È lo scavalcamento di Pio XII, rovesciato.' },
          { q: '«Ho troppo rispetto per Dio per poterne fare un’ipotesi scientifica.» Che cosa intendeva Lemaître?', opzioni: ['Che Dio non è una grandezza da inserire in un modello che domani si corregge', 'Che la fede non ha nulla da dire sul mondo reale', 'Che la scienza è irrispettosa verso la religione'], ok: 0,
            why: 'Un’ipotesi si mette alla prova e si scarta: legare Dio a un modello lo renderebbe scartabile. Non è fideismo: le due vie restano distinte e si parlano.' },
          { q: 'Uno stato iniziale densissimo, se confermato, sarebbe…', opzioni: ['la prova che la creazione è avvenuta', 'la prova che un creatore non serve', 'un inizio naturale: una realtà fisica che viene da un’altra'], ok: 2,
            why: 'È ciò che Lemaître osservava del suo atomo primitivo: un inizio naturale non è un inizio assoluto, e la creazione è la relazione per cui Dio pone il mondo nell’essere.' }
        ] }
      ] },

    { fase: 'Chiusura', minuti: 2, titolo: 'Le due *vie*',
      testo: '17 giugno 1966, tre giorni prima di morire: a Lemaître riferiscono la scoperta della radiazione cosmica di fondo. «Je suis content… maintenant on a la preuve», «sono contento, adesso abbiamo la prova». Parlava del suo modello.',
      blocchi: [
        { tipo: 'domanda', id: 'uscita', confronta: 'ingresso', etichetta: 'Anonimo · la stessa domanda dell’inizio',
          q: 'Quale dei due titoli vi convince di più?',
          opzioni: ['«Il Big Bang conferma la Genesi»', '«La scienza ha dimostrato che Dio non serve»', 'Nessuno dei due', 'Non saprei'],
          dibattito: 'Una scoperta non vale di più o di meno secondo chi la fa; e una fede che avesse bisogno di una scoperta per reggersi dovrebbe cambiare a ogni nuovo articolo.' },
        { tipo: 'aggancio', etichetta: 'Prossima lezione', titolo: 'Creazione e primo istante',
          t: 'Abbiamo visto che un inizio fisico non è la creazione. Ma allora che cosa significa «creare»? Soltanto far cominciare il mondo? Leggeremo Genesi 1 e vedremo che cosa vuol dire dipendere da Dio **anche adesso**.' }
      ] }
  ],

  studio: {
    sezioni: [
      { titolo: 'La domanda', testo: 'Nel marzo 2025 la collaborazione DESI, che ha mappato la posizione di milioni di galassie, ha annunciato indizi più forti che l’energia oscura possa cambiare nel tempo: se fossero confermati, il {modello} cosmologico standard andrebbe ritoccato. Nel luglio 2026 una nuova misura dello stesso progetto, basata sulla luce dei quasar filtrata dal gas intergalattico, si è avvicinata di nuovo al modello standard, senza chiudere la questione: gli stessi ricercatori ammettono che gli indizi potrebbero svanire, oppure che servirà un modello più complesso, e i primi risultati sui cinque anni completi di osservazioni sono attesi nel 2027. La {cosmologia} funziona così: propone, controlla, corregge.\n\n**Per questo** vale la pena chiedersi se una fede possa appoggiarsi a un modello dell’universo. Novant’anni fa se lo chiese, con molta lucidità, l’uomo che per primo propose che l’universo avesse un inizio. Era un prete.' },
      { titolo: 'Un prete che fa i conti', testo: 'Georges Lemaître nasce a Charleroi, in Belgio, nel 1894. Dopo la Prima guerra mondiale entra in seminario e il 22 settembre 1923 è ordinato sacerdote dal cardinale Mercier. Va subito a Cambridge a studiare con Arthur Eddington, uno dei maggiori astrofisici del tempo; poi negli Stati Uniti, all’osservatorio di Harvard e al Massachusetts Institute of Technology. Dal 1925 insegna a Lovanio. Non smetterà mai di essere, insieme, prete e fisico.\n\nNel 1927 pubblica negli *Annales de la Société scientifique de Bruxelles* una soluzione delle equazioni della relatività generale in cui l’universo è in {espansione}, e ne ricava che le galassie si allontanano con una velocità proporzionale alla loro distanza. Un dettaglio conta più di quanto sembri: quel primo modello **non aveva un inizio**. Partiva, nel passato remoto, dall’universo statico di Einstein e tendeva, nel futuro, a un universo sempre più rarefatto. Il sacerdote non era andato a cercare nella fisica la prima pagina della Genesi. Nello stesso anno, a Bruxelles, Einstein respinse la fisica del modello con una frase famosa, giunta a noi in versioni diverse: se ne conosce con certezza il senso, non le parole.\n\nL’articolo esce in una rivista poco letta fuori dal Belgio; nel 1929 Edwin Hubble pubblica la stessa relazione su dati propri, e per decenni si parlerà di «legge di Hubble». Quando nel 1931 l’articolo viene tradotto in inglese manca proprio il calcolo che dava a Lemaître la precedenza, e a lungo si è sospettata una censura. Nel 2011 l’astrofisico Mario Livio ha reso noto di aver trovato negli archivi della Royal Astronomical Society una lettera in cui Lemaître scrive di non ritenere opportuno ristampare la sua discussione provvisoria: il taglio era suo. Nel 2018 l’Unione Astronomica Internazionale ha raccomandato di chiamare la relazione «legge di Hubble-Lemaître», con il 78 per cento dei 4.060 voti espressi.' },
      { titolo: 'Tre piani da distinguere', testo: 'Un sacerdote propone un universo in espansione, e presto anche un inizio: la conclusione rapida arriva da due lati opposti. Per alcuni è stata la fede a suggerirgli la teoria, che dunque è sospetta; per altri è la teoria a dimostrare la fede. Prima di valutarle servono tre distinzioni.\n\nIl **risultato scientifico** è un’affermazione su grandezze misurabili, che si controlla con le osservazioni: il suo valore non dipende da chi l’ha formulata. Il **dato biografico**, la {biografia}, dice chi era l’autore e che cosa credeva: spiega come è nata una ricerca, ma non la conferma e non la smentisce. L’**{interpretazione}** attribuisce a un risultato un significato rispetto a domande che la fisica non pone, per esempio perché esista qualcosa: è legittima, ma va dichiarata e argomentata.\n\nIl risultato scientifico ha lo statuto di un’{ipotesi}: la parola viene dal greco *hypóthesis*, affine al verbo che significa «porre sotto». È ciò che si mette alla base di un ragionamento per metterlo alla prova, non un’opinione arbitraria né una verità definitiva; Lemaître intitolò il suo libro del 1946 *L’hypothèse de l’atome primitif*. Mescolare risultato e biografia significa giudicare la persona invece della tesi: screditarlo perché prete e arruolarlo perché prete sono lo stesso errore. Mescolare risultato e interpretazione è più insidioso, perché il salto si presenta come una conseguenza.' },
      { titolo: 'Un inizio che fa sospettare', testo: 'L’inizio arriva nel 1931, e arriva dalla fisica. Nel marzo di quell’anno Eddington scrive su «Nature» che l’idea di un inizio dell’ordine presente della natura gli risulta filosoficamente ripugnante. Lemaître risponde con una lettera di 457 parole, pubblicata dalla stessa rivista il 9 maggio: con la teoria quantistica, se si segue l’espansione all’indietro, si può pensare a uno stato iniziale densissimo, che chiamerà {atomo primitivo}. È l’antenato di quello che oggi chiamiamo {Big Bang}; il nome glielo darà nel 1949, alla radio della BBC, un suo avversario, l’astronomo Fred Hoyle. Risalendo verso quello stato le equazioni a un certo punto smettono di essere affidabili: anche questo limite fa parte del risultato.\n\nPerché un inizio suscitava tanta diffidenza? Anche perché ricordava un’idea con una lunga storia. La filosofia greca, con Aristotele, pensava il mondo eterno; la Bibbia e la tradizione cristiana parlano invece di un mondo che ha cominciato a esistere per la libera decisione di Dio. Quell’idea era entrata così a fondo nella cultura europea che, secondo il biografo di Lemaître Dominique Lambert, Einstein diffidava dell’atomo primitivo perché gli sembrava implicare la fede in una creazione iniziale.' },
      { titolo: 'Un inizio non è la creazione', testo: 'Lemaître poteva approfittarne. Fece il contrario. Nel dattiloscritto della lettera a «Nature», conservato negli Archives Lemaître dell’Università di Lovanio, c’è una frase finale che l’autore cancellò e che non fu mai pubblicata: «Penso che chiunque creda in un essere supremo che sostiene ogni essere e ogni agire creda anche che Dio sia essenzialmente nascosto, e possa rallegrarsi di vedere come la fisica attuale fornisca un velo che nasconde la creazione» (traduzione dall’inglese). La frase non presenta la fisica come una prova di Dio: dice che la fisica la vela.\n\nNegli anni successivi Lemaître precisò il suo pensiero distinguendo tre cose che nel linguaggio comune si confondono: l’**inizio naturale**, cioè lo stato iniziale che la fisica descrive; l’**inizio metafisico**, cioè il fatto che il mondo esista invece di non esistere, domanda della {metafisica}; e la **{creazione}** in senso teologico, la relazione per cui Dio pone il mondo nell’essere. Il suo atomo primitivo, osservava, non è neppure un inizio assoluto: è il dispiegarsi di una realtà fisica a partire da un’altra realtà fisica. Nel 1958, a un congresso di astrofisici a Bruxelles, lo disse così: «Personalmente ritengo che [l’ipotesi] rimanga interamente al di fuori di ogni questione metafisica o religiosa. Essa permette al materialista anche di negare ogni essere {trascendente}. […] Per il credente essa esclude ogni tentativo di familiarità con Dio […]. E si accorda anche con i versetti di Isaia quando parlano del “Dio nascosto”, nascosto anche all’inizio della creazione» (traduzione italiana riportata da Lambert).\n\nIl versetto è Isaia 45,15: «Veramente tu sei un Dio nascosto, Dio d’Israele, salvatore» (CEI 2008). In un’intervista del 1933, riferita da Lambert, Lemaître aveva riassunto la sua posizione: «Esistono due vie per arrivare alla verità. Ho deciso di seguirle entrambe». E amava ripetere: «Ho troppo rispetto per Dio per poterne fare un’ipotesi scientifica».' },
      { titolo: 'Che cosa afferma la fede', testo: 'La distinzione di Lemaître non è un compromesso: corrisponde a ciò che la Chiesa intende per creazione, che comprende due affermazioni. La prima è la **dipendenza**: tutto ciò che esiste riceve l’essere da Dio, dal nulla, e non solo una volta ma in ogni istante. Tommaso d’Aquino paragonava le creature all’aria, che resta illuminata solo finché il sole la illumina (*Summa theologiae* I, q. 104, a. 1); la prossima lezione svilupperà questo punto. La seconda è l’**inizio del tempo**. Il Concilio Vaticano I, riprendendo il Lateranense IV del 1215, insegna che Dio «con liberissima decisione fin dal principio del tempo produsse dal nulla» ogni creatura (*Dei Filius*, cap. I; traduzione dal latino), e il Catechismo afferma che «il mondo ha avuto inizio quando è stato tratto dal nulla dalla Parola di Dio» (n. 338).\n\n**Eppure** questo inizio si conosce per fede. Tommaso sosteneva che la ragione non può dimostrare né che il mondo sia sempre esistito né che abbia cominciato: la novità del mondo si tiene per sola fede (*Summa theologiae* I, q. 46, aa. 1-2). **Ne segue** un punto decisivo. Un modello fisico che mostri uno stato iniziale non dimostra la creazione, perché descrive una realtà fisica che viene da un’altra; un modello che non preveda un inizio non la smentisce, perché la fede non l’ha ricavato dalla fisica. La domanda più profonda riguarda il senso: «Non si tratta soltanto di sapere quando e come sia sorto materialmente il cosmo, né quando sia apparso l’uomo, quanto piuttosto di scoprire quale sia il senso di tale origine» (CCC 284).' },
      { titolo: 'Quando i piani si scavalcano', testo: 'Il 22 novembre 1951 Pio XII parla alla Pontificia Accademia delle Scienze. Passa in rassegna i dati dell’astronomia del tempo, compreso l’allontanamento delle galassie, e conclude: «La creazione nel tempo, quindi; e perciò un Creatore; dunque Dio!». Nello stesso discorso aveva precisato che, sulla creazione nel tempo, «i fatti fin qui accertati non sono argomento di prova assoluta». La cautela c’è; ma la sequenza che resta impressa va dal dato astronomico al Creatore, e molti la lessero come un’adesione del Papa all’ipotesi di Lemaître. Il passaggio di piano avviene già nella prima parola: chiamare «creazione» lo stato iniziale descritto dai dati significa sostituire l’inizio naturale con l’atto di Dio; «Creatore» e «Dio» seguono poi dalla parola scelta.\n\nLemaître, membro dell’Accademia dal 1936, ne fu contrariato per due ragioni. La prima è quella di questa lezione: il passaggio dal modello al Creatore scavalca i piani. La seconda è scientifica: in quegli anni nessuna osservazione permetteva di escludere la teoria rivale dello stato stazionario, che non prevedeva alcun inizio. Secondo Lambert chiese di essere ricevuto dal Papa, probabilmente con l’aiuto del gesuita Daniel O’Connell della Specola Vaticana; del colloquio non esiste una prova scritta. Di certo nel discorso agli astronomi del 7 settembre 1952 Pio XII non ripeté l’accostamento. Dal 1960 al 1966 Lemaître fu presidente dell’Accademia.\n\nL’argomento di Lemaître difendeva la fede, non soltanto la scienza: chi lega la creazione al Big Bang dovrà rinunciare alla creazione il giorno in cui il Big Bang venisse corretto. L’errore opposto, oggi più diffuso, presenta la cosmologia come la prova che un creatore non serve: è lo stesso scavalcamento, con la conclusione rovesciata.' },
      { titolo: 'Distinguere non è separare', testo: 'Il {concordismo} (da *concordia*) cerca un accordo diretto fra le affermazioni della fede e i risultati della scienza: «il Big Bang conferma la Genesi». Il {fideismo} è l’errore opposto: tratta fede e ragione come due mondi isolati, che non hanno nulla da dirsi. Il {dialogo} fra scienza e fede evita entrambi.\n\nUn’obiezione seria va presa sul serio: se scienza e fede rispondono a domande diverse, la fede non rischia di diventare un sentimento privato che non dice nulla del mondo reale? Lo stesso Lambert riconosce che la distinzione di Lemaître, spinta troppo in là, rischia di suggerire che un dialogo fra cosmologia e teologia non sia pertinente. La risposta cattolica non è la separazione. Il Vaticano I parla di un «duplice ordine di conoscenza», afferma che fra fede e ragione non può esservi «nessun vero dissenso» e che le due «si aiutano anche a vicenda» (*Dei Filius*, cap. IV; traduzione dal latino). Il Catechismo ne trae la conseguenza: la ricerca metodica, se procede in modo veramente scientifico e secondo le norme morali, «non sarà mai in reale contrasto con la fede» (n. 159, che riprende *Gaudium et spes* 36).\n\nIl dialogo passa per la filosofia, che interpreta i dati senza confonderli con la teologia, e sa vivere anche i disaccordi. Il fisico e teologo Robert John Russell propone di cercare fra teorie scientifiche e teologiche sia le consonanze sia le dissonanze: quando un modello cambia, la dissonanza non è una minaccia ma l’occasione di capire meglio. È la situazione da cui siamo partiti: i dati DESI possono rafforzare o indebolire un modello, ma non toccano la fede di chi non ha mai affidato a un modello la propria fede.' },
      { titolo: 'Domande per lo studio', testo: '1. Il modello del 1927 non prevedeva un inizio. Perché questo fatto aiuta a distinguere il dato biografico dal risultato scientifico?\n\n2. Spiega la differenza fra inizio naturale, inizio metafisico e creazione, con un esempio per ciascuno.\n\n3. Nella frase di Pio XII «La creazione nel tempo, quindi; e perciò un Creatore; dunque Dio!» indica dove il discorso lascia il piano della fisica, e motiva.\n\n4. Domanda aperta: Lemaître diceva di avere «troppo rispetto per Dio» per farne un’ipotesi scientifica. Che cosa significa, secondo te? Motiva con un elemento della lezione.' },
      { titolo: 'La risposta', testo: 'L’inizio che la fisica descrive non è la creazione: il modello di Lemaître non la dimostra e non la smentisce, e la fede del suo autore non aggiunge né toglie nulla al suo valore scientifico. La fede cattolica afferma che tutto dipende da Dio e che il mondo ha avuto inizio, ma lo sa per fede e con l’aiuto della ragione filosofica, non con le equazioni; per questo non ha bisogno che la cosmologia resti ferma. Distinguere i piani, però, non significa separarli: le due vie restano distinte e si parlano.\n\nIl 17 giugno 1966, tre giorni prima di morire, in ospedale, a Lemaître riferirono la scoperta della radiazione cosmica di fondo, la traccia osservabile di quella fase calda e densa. Rispose: «Je suis content… maintenant on a la preuve», «sono contento, adesso abbiamo la prova». Parlava del suo modello.\n\n**Prossima lezione: Creazione e primo istante.** Se un inizio fisico non è la creazione, che cosa significa «creare»? Soltanto far cominciare il mondo? Leggeremo Genesi 1 e vedremo che cosa vuol dire dipendere da Dio anche adesso.' }
    ],
    fonti: [
      'D. Lambert, voce «Lemaître, Georges Edouard», in G. Tanzella-Nitti – A. Strumia (a cura di), *Dizionario interdisciplinare di scienza e fede*, Città Nuova, Roma 2002, vol. II, pp. 1908-1917.',
      'Th. Hertog, «The Figure and Legacy of Monseigneur Georges Lemaître», Pontificia Accademia delle Scienze — www.pas.va.',
      'J.-P. Luminet, «Editorial note to: The beginning of the world from the point of view of quantum theory», arXiv:1105.6271 (2011). G. Lemaître, «The Beginning of the World from the Point of View of Quantum Theory», *Nature* 127, n. 3210 (9 maggio 1931), p. 706. A. S. Eddington, «The End of the World (from the Standpoint of Mathematical Physics)», *Nature* 127 (21 marzo 1931).',
      'M. Livio, «Mystery of the missing text solved», *Nature* 479 (10 novembre 2011), pp. 171-173.',
      'Unione Astronomica Internazionale, comunicato iau1812 (29 ottobre 2018) — www.iau.org.',
      'Pio XII, discorso alla Pontificia Accademia delle Scienze del 22 novembre 1951 e discorso agli astronomi del 7 settembre 1952.',
      'Concilio Vaticano I, *Dei Filius*, capp. I e IV (Denzinger-Hünermann 3001-3002, 3015-3019); *Catechismo della Chiesa Cattolica*, nn. 159, 284, 338 — www.vatican.va; Isaia 45,15 (Bibbia CEI 2008).',
      'Tommaso d’Aquino, *Summa theologiae* I, q. 46, aa. 1-2; q. 104, a. 1. R. J. Russell, voce «Dialogo scienze-teologia», *Dizionario interdisciplinare di scienza e fede*.',
      'DESI, annunci del 19 marzo 2025 (DR2), dell’aprile 2026 (completate le osservazioni dei cinque anni) e del 30 luglio 2026 (foresta Lyman-alfa) — www.desi.lbl.gov.',
      '*Vocabolario Treccani*, voci «cosmologia», «modello», «ipotesi», «biografia», «interpretazione», «espansione», «atomo», «metafisica», «creazione», «trascendente», «concordia», «fideismo», «dialogo».',
      'Traduzioni dall’inglese (frase cancellata del 1931) e dal latino (*Dei Filius*) a cura dell’autore; le frasi del 1933 e del 1958 come le riporta in italiano Lambert.'
    ]
  },

  giochi: {
    tema: 'Le due vie di Lemaître',
    sfida: [
      { q: 'Che cosa ricavò Lemaître nel 1927?', a: ['L’atomo primitivo', 'Un universo in espansione, ancora senza inizio', 'Un universo statico ed eterno', 'Una prova dell’esistenza di Dio'], ok: 1 },
      { q: '«Il modello è sospetto: l’ha scritto un prete.» Quali piani confonde?', a: ['Risultato e interpretazione', 'Biografia e interpretazione', 'Risultato e biografia', 'Nessuno'], ok: 2 },
      { q: 'Chi diede il nome «Big Bang»?', a: ['Fred Hoyle', 'Lemaître', 'Einstein', 'Hubble'], ok: 0 },
      { q: 'Chi rese nota nel 2011 la lettera sul calcolo tolto dalla traduzione?', a: ['Edwin Hubble', 'Arthur Eddington', 'Fred Hoyle', 'Mario Livio'], ok: 3 },
      { q: '«Ipotesi» viene dal greco e significa…', a: ['vedere prima', 'porre sotto', 'dire il vero', 'mettere insieme'], ok: 1 },
      { q: 'Per Lemaître l’atomo primitivo era…', a: ['il nulla da cui tutto viene', 'la creazione', 'una realtà fisica che viene da un’altra', 'un’immagine poetica'], ok: 2 },
      { q: 'Che cosa fece Lemaître della frase su Dio nel dattiloscritto del 1931?', a: ['La cancellò', 'La pubblicò su «Nature»', 'La mandò al Papa', 'La lesse a Einstein'], ok: 0 },
      { q: '«Perché esiste qualcosa invece del nulla?» è una domanda…', a: ['di fisica', 'di biografia', 'di statistica', 'metafisica'], ok: 3 }
    ],
    cat: {
      bins: ['Risultato', 'Biografia', 'Interpretazione'],
      items: [
        ['La radiazione cosmica di fondo fu osservata nel 1964-1965', 0],
        ['Lemaître fu presidente della Pontificia Accademia delle Scienze', 1],
        ['Il Big Bang prova che Dio esiste', 2],
        ['Il modello prevede la relazione fra velocità e distanza', 0],
        ['Lemaître studiò con Eddington a Cambridge', 1],
        ['L’espansione dimostra che l’universo non ha senso', 2],
        ['I dati DESI del 2025 suggerivano un’energia oscura variabile', 0],
        ['Lemaître cancellò una frase dal dattiloscritto', 1],
        ['Se l’universo ha un inizio, allora ha una causa esterna', 2]
      ]
    },
    vf: [
      { s: 'Lemaître usò per primo l’espressione «Big Bang».', v: false, why: 'Parlava di «atomo primitivo»; il nome «Big Bang» lo usò nel 1949 un avversario, Fred Hoyle.' },
      { s: 'Il primo modello di Lemaître, nel 1927, aveva già un inizio.', v: false, why: 'Partiva dall’universo statico di Einstein: l’inizio arriva nel 1931, dalla fisica.' },
      { s: 'Il calcolo che dava a Lemaître la precedenza fu tolto dalla traduzione da Lemaître stesso.', v: true, why: 'Lo mostra la lettera resa nota da Mario Livio nel 2011.' },
      { s: 'Secondo Tommaso d’Aquino l’inizio del mondo nel tempo si può dimostrare con la ragione.', v: false, why: 'Si tiene per fede: la ragione non lo dimostra e non dimostra il contrario (I, q. 46, aa. 1-2).' },
      { s: 'Pio XII, nel 1951, disse che i fatti accertati erano una prova assoluta della creazione nel tempo.', v: false, why: 'Disse che «non sono argomento di prova assoluta»: la cautela era nel testo, il salto nella sequenza.' },
      { s: 'Lemaître seppe della radiazione cosmica di fondo poco prima di morire.', v: true, why: 'Il 17 giugno 1966, tre giorni prima della morte.' }
    ],
    quiz: [
      { q: 'Che cosa propose Lemaître nella lettera a «Nature» del 1931?', a: ['Che l’universo fosse eterno e immobile', 'Uno stato iniziale densissimo, l’«atomo primitivo»', 'Una prova dell’esistenza di Dio', 'La teoria della relatività'], ok: 1, why: 'Un’ipotesi fisica, nata come risposta a Eddington, che Lemaître tenne distinta dalla teologia.' },
      { q: 'Per la fede cattolica la creazione…', a: ['coincide con il Big Bang', 'è un’ipotesi scientifica', 'riguarda solo il primo istante', 'è la dipendenza di tutto da Dio, con un inizio del tempo conosciuto per fede'], ok: 3, why: '*Dei Filius*, cap. I; CCC 338. Per Tommaso l’inizio del tempo non si dimostra né si esclude con la ragione.' },
      { q: 'Che cosa afferma il Vaticano I sul rapporto fra fede e ragione?', a: ['Che fra le due non può esservi vero dissenso', 'Che la ragione deve tacere', 'Che la scienza decide la fede', 'Che sono la stessa cosa'], ok: 0, why: '*Dei Filius*, cap. IV: due ordini di conoscenza distinti, che si aiutano a vicenda.' },
      { q: 'Il fideismo è…', a: ['l’accordo diretto fra Bibbia e scienza', 'la fede nel Big Bang', 'l’idea che fede e ragione siano mondi isolati', 'la teoria dello stato stazionario'], ok: 2, why: 'È l’errore opposto al concordismo: la via cattolica è il dialogo.' },
      { q: 'Perché Lemaître fu contrariato dal discorso di Pio XII del 1951?', a: ['Perché il Papa negava l’espansione', 'Perché scavalcava i piani e la teoria rivale non era ancora esclusa', 'Perché non era stato invitato', 'Perché il Papa citava Hubble'], ok: 1, why: 'Due ragioni: una di metodo, una scientifica (lo stato stazionario).' }
    ],
    seq: [
      { t: 'Lemaître è ordinato sacerdote', y: '1923' },
      { t: 'Modello dell’universo in espansione, ancora senza inizio', y: '1927' },
      { t: 'Hubble pubblica la relazione velocità-distanza', y: '1929' },
      { t: 'Lettera a «Nature» sull’atomo primitivo', y: '1931' },
      { t: 'Membro della Pontificia Accademia delle Scienze', y: '1936' },
      { t: 'Discorso di Pio XII alla Pontificia Accademia', y: '1951' },
      { t: 'L’IAU raccomanda «legge di Hubble-Lemaître»', y: '2018' }
    ],
    abbina: [
      ['Risultato', 'Si controlla con osservazioni'],
      ['Interpretazione', 'Va dichiarata e argomentata'],
      ['Creazione', 'Dio pone il mondo nell’essere'],
      ['Concordismo', 'Accordo diretto fra fede e scienza'],
      ['Fideismo', 'Fede e ragione isolate']
    ],
    rifl: {
      domanda: 'Lemaître diceva di avere «troppo rispetto per Dio» per farne un’ipotesi scientifica. Che cosa proteggeva?',
      poli: ['La scienza', 'Entrambe', 'La fede'],
      spunto: 'Motiva con un elemento visto oggi. La frase resta solo su questo schermo e sparisce alla chiusura.'
    }
  }
};

/* =====================================================================
   Componenti della lezione (React con htm). Pulsanti veri; hover / focus-visible / active
   dalle classi del kit (la-choice, ll-btn, ll-link) e dal CSS qui sotto. Nulla va nel browser:
   la memoria è in pagina, così tornando a una scena (anche dopo il gioco) il componente riprende.
   ===================================================================== */
(function () {
  var LL = window.LabLezione, html = window.html, R = window.React;
  if (!LL || !html || !R) return;
  var I = LL.inline, useState = R.useState;
  var MEM = {};
  function useMem(key, iniziale) {
    var s = useState(function () { return Object.prototype.hasOwnProperty.call(MEM, key) ? MEM[key] : iniziale; });
    return [s[0], function (v) { MEM[key] = v; s[1](v); }];
  }

  /* ---------- TreInizi: stesso stato iniziale, tre domande (concetto più difficile) ----------
     Tre anelli concentrici: inizio naturale (fisica), inizio metafisico (filosofia), creazione (teologia).
     Una domanda alla volta: la classe sceglie chi risponde; la risposta giusta accende l'anello e vi lascia la domanda.
     Interazioni: tre la-choice (hover bordo oro, active 0,97, focus oro; esito con parola), «Prossima domanda» (ll-btn),
     «Che cosa ne diceva Lemaître?» (ll-btn--solenne), «Ricomincia» (ll-link). */
  var PIANI = [
    { t: 'Inizio naturale', s: 'fisica', r: 58, y: 114 },
    { t: 'Inizio metafisico', s: 'filosofia', r: 100, y: 70 },
    { t: 'Creazione', s: 'teologia', r: 142, y: 30 }
  ];
  var DOM = [
    { q: 'Perché esiste qualcosa invece del nulla?', p: 1, why: 'Nessuna misura risponde: la domanda riguarda il fatto stesso di **esistere**, con tutte le leggi. È l’inizio **metafisico**, domanda della {metafisica}.' },
    { q: 'Quanto era densa e calda la materia nei primi istanti?', p: 0, why: 'Si risponde con osservazioni e modelli: è l’inizio **naturale**, quello che la fisica descrive.' },
    { q: 'Il mondo è posto nell’essere da Dio?', p: 2, why: 'È la **creazione** in senso teologico: una relazione con Dio, non un evento dentro la storia fisica.' },
    { q: 'Da quale stato fisico viene l’atomo primitivo?', p: 0, why: 'È ancora fisica, anche se oggi il modello non sa rispondere: per Lemaître l’atomo primitivo è una realtà fisica che viene **da un’altra realtà fisica**.' },
    { q: 'Perché Isaia chiama Dio «nascosto»?', p: 2, why: 'È una domanda di **teologia**: Lemaître la accostava alla sua ipotesi (Is 45,15), senza farne una prova.' },
    { q: 'Le leggi della fisica spiegano perché ci sono leggi?', p: 1, why: 'Una legge spiega i fenomeni; che esistano leggi, e un mondo che le segue, è una domanda **metafisica**.' }
  ];

  LL.registra('TreInizi', function (p) {
    var ctx = p.ctx;
    var s1 = useMem('ti-i', 0), i = s1[0], setI = s1[1];
    var s2 = useMem('ti-ris', []), ris = s2[0], setRis = s2[1];
    var s3 = useMem('ti-fine', false), lem = s3[0], setLem = s3[1];
    var n = DOM.length, fine = i >= n, cur = DOM[i], ans = ris[i];
    var primo = ris.filter(function (x) { return x && x.primo; }).length;
    function scegli(k) {
      if (ans && ans.ok) return;
      var ok = k === cur.p, c = ris.slice();
      c[i] = { k: k, ok: ok, primo: ans ? ans.primo : ok };
      setRis(c);
      if (ok) ctx.cheer(); else ctx.oops();
    }
    function avanti() {
      var j = i + 1; setI(j);
      if (j >= n) { ctx.festa(); ctx.say('Stesso punto di partenza, tre domande diverse.'); }
    }
    function quante(k) { return DOM.filter(function (d, j) { return d.p === k && ris[j] && ris[j].ok; }).length; }
    function cls(k) {
      if (!ans) return 'la-choice';
      if (ans.ok && k === cur.p) return 'la-choice is-right';
      if (!ans.ok && k === ans.k) return 'la-choice is-wrong';
      return ans.ok ? 'la-choice is-dim' : 'la-choice';
    }
    return html`<div className="lm-ti">
      <div className="lm-ti-g">
        <svg className="lm-ti-svg" viewBox="0 0 300 300" role="img" aria-label=${'Tre anelli concentrici: ' + PIANI.map(function (x, k) { return x.t + ', ' + quante(k) + ' domande su 2'; }).join('; ')}>
          ${PIANI.slice().reverse().map(function (x, rk) {
            var k = PIANI.length - 1 - rk, on = quante(k) > 0, full = quante(k) === 2;
            return html`<g key=${k} className=${'lm-ti-ring lm-ti-r' + k + (on ? ' is-on' : '') + (full ? ' is-full' : '') + (!fine && ans && ans.ok && cur.p === k ? ' is-now' : '')}>
              <circle cx="150" cy="150" r=${x.r} />
              <text x="150" y=${x.y} textAnchor="middle" className="lm-ti-t">${x.t}</text>
              <text x="150" y=${x.y + 12} textAnchor="middle" className="lm-ti-s">${x.s} · ${quante(k)}/2</text>
            </g>`;
          })}
          <circle cx="150" cy="160" r="7" className="lm-ti-dot" />
          <text x="150" y="182" textAnchor="middle" className="lm-ti-s">stato iniziale</text>
        </svg>
        <div className="lm-ti-q">
          ${!fine ? html`<div key=${i}>
              <p className="la-meta">Domanda ${i + 1} di ${n} · chi risponde?</p>
              <p className="lm-ti-d">${cur.q}</p>
              <div className="la-choices">
                ${PIANI.map(function (x, k) { return html`<button key=${k} type="button" className=${cls(k)} disabled=${!!(ans && ans.ok)} onClick=${function () { scegli(k); }}><span className="la-key">${'ABC'[k]}</span>${x.t} <small className="lm-ti-sm">· ${x.s}</small></button>`; })}
              </div>
              <div aria-live="polite">${ans && html`<p key=${i + '-' + ans.k} className=${'ll-why ' + (ans.ok ? 'is-ok' : 'is-ko')}><strong>${ans.ok ? 'Sì. ' : 'Non è questo piano. '}</strong>${ans.ok ? I(cur.why, 'w' + i) : 'Chiedetevi: si risponde con una misura, con un ragionamento sull’esistere, o alla luce della rivelazione?'}</p>`}</div>
              ${ans && ans.ok && html`<div className="ll-row"><button type="button" className="ll-btn" onClick=${avanti}>${i < n - 1 ? 'Prossima domanda' : 'Guarda gli anelli'}</button></div>`}
            </div>`
            : html`<div>
              <p className="ll-why is-ok" aria-live="polite"><strong>${primo} su ${n} al primo colpo. </strong>${I('Lo **stesso** stato iniziale regge tre domande diverse. Rispondere alla prima non risponde alle altre due.', 'f')}</p>
              ${!lem ? html`<div className="ll-row"><button type="button" className="ll-btn ll-btn--solenne" onClick=${function () { setLem(true); ctx.say('Un inizio fisico non è un inizio assoluto.'); }}>Che cosa ne diceva Lemaître?</button></div>`
                : html`<p className="ll-gloss">${I('Il suo atomo primitivo, osservava, **non è neppure un inizio assoluto**: è il dispiegarsi di una realtà fisica a partire da un’altra realtà fisica. Per questo nessun modello, da solo, arriva alla {creazione}: la fisica la **vela** (Lambert, *Dizionario interdisciplinare*, II).', 'l')}</p>`}
            </div>`}
          ${(ris.length > 0) && html`<div className="ll-row"><button type="button" className="ll-link" onClick=${function () { setI(0); setRis([]); setLem(false); }}>Ricomincia</button></div>`}
        </div>
      </div>
    </div>`;
  });

  /* ---------- Salto: dove la frase di Pio XII lascia il piano della fisica ----------
     Tre segmenti cliccabili (la-choice in Cormorant): la classe tocca quello in cui avviene il passaggio di piano.
     Poi «Perché Lemaître ne fu contrariato?» (ll-btn) apre le due ragioni e la nota di onestà sul testo. */
  var SEG = [
    { t: 'La creazione nel tempo, quindi;', ok: true,
      why: 'I dati dicevano al massimo: **uno stato iniziale**, un inizio naturale. Chiamarlo «creazione» è già cambiare piano: dal modello all’atto di Dio. Il «quindi» presenta il salto come una conseguenza.' },
    { t: 'e perciò un Creatore;', ok: false,
      why: 'Sembra il salto, ma «Creatore» è già contenuto nella parola **creazione**: se c’è una creazione, c’è chi crea. Il passaggio decisivo è avvenuto prima.' },
    { t: 'dunque Dio!', ok: false,
      why: 'È l’ultimo passo di una catena già decisa: dalla parola «creazione» seguono «Creatore» e «Dio». Il cambio di piano è avvenuto prima.' }
  ];
  LL.registra('Salto', function (p) {
    var ctx = p.ctx;
    var s1 = useMem('sa-t', []), tent = s1[0], setTent = s1[1];
    var s2 = useMem('sa-r', false), rag = s2[0], setRag = s2[1];
    var giusto = 0, risolto = tent.indexOf(giusto) > -1, ult = tent.length ? tent[tent.length - 1] : null;
    function tocca(i) {
      if (risolto) return;
      setTent(tent.concat(i));
      if (SEG[i].ok) { ctx.cheer(); ctx.say('Il salto sta in una parola.'); } else ctx.oops();
    }
    function cls(i) {
      if (tent.indexOf(i) < 0) return 'la-choice lm-sa-seg' + (risolto ? ' is-dim' : '');
      return 'la-choice lm-sa-seg ' + (SEG[i].ok ? 'is-right' : 'is-wrong');
    }
    return html`<div className="lm-sa">
      <p className="la-meta">I dati citati: l’allontanamento delle galassie, l’età stimata dell’universo. La conclusione del discorso:</p>
      <h3 className="la-q lm-sa-q">In quale punto il discorso lascia il piano della fisica?</h3>
      <div className="la-choices">
        ${SEG.map(function (x, i) { return html`<button key=${i} type="button" className=${cls(i)} disabled=${risolto} onClick=${function () { tocca(i); }}>«${x.t}»${risolto && i === giusto ? html` <span className="la-meta">· qui</span>` : null}</button>`; })}
      </div>
      <p className="lp-read-f">Pio XII, discorso alla Pontificia Accademia delle Scienze, 22 novembre 1951</p>
      <div aria-live="polite">${ult !== null && html`<p key=${tent.length} className=${'ll-why ' + (SEG[ult].ok ? 'is-ok' : 'is-ko')}><strong>${SEG[ult].ok ? 'Esatto. ' : 'Non ancora. '}</strong>${I(SEG[ult].why, 'w')}</p>`}</div>
      ${risolto && !rag && html`<div className="ll-row"><button type="button" className="ll-btn" onClick=${function () { setRag(true); }}>Perché Lemaître ne fu contrariato?</button></div>`}
      ${rag && html`<div className="lm-sa-r">
        <ol className="ll-steps">
          <li className="ll-step"><div><b>Per il metodo</b><p>${I('Il passaggio dal modello al Creatore **scavalca i piani**: è il concordismo che Lemaître aveva evitato già nel 1931, cancellando la frase sul velo.', 'r1')}</p></div></li>
          <li className="ll-step"><div><b>Per la scienza</b><p>${I('In quegli anni **nessuna osservazione escludeva** la teoria rivale dello stato stazionario, senza alcun inizio.', 'r2')}</p></div></li>
        </ol>
        <p className="ll-gloss">${I('**Con onestà verso il testo:** nello stesso discorso il Papa precisa che «i fatti fin qui accertati non sono argomento di prova assoluta». La cautela c’è; è la sequenza a restare impressa. Secondo Lambert, Lemaître chiese di essere ricevuto (del colloquio non c’è prova scritta); di certo nel discorso agli astronomi del 7 settembre 1952 Pio XII **non ripeté** l’accostamento.', 'on')}</p>
      </div>`}
      ${tent.length > 0 && html`<div className="ll-row"><button type="button" className="ll-link" onClick=${function () { setTent([]); setRag(false); }}>Riprova</button></div>`}
    </div>`;
  });

  /* ---------- CSS della lezione: solo token del design system ---------- */
  var CSS = [
    '.lm-ti-g{display:grid;grid-template-columns:1fr 1.618fr;gap:21px;align-items:start}',
    '.lm-ti-svg{width:100%;max-width:340px;height:auto;display:block;margin:0 auto}',
    '.lm-ti-ring circle{fill:none;stroke:var(--lab-line);stroke-width:2;transition:stroke 377ms var(--lab-ease-out),stroke-width 377ms var(--lab-ease-out),fill 610ms var(--lab-ease-out)}',
    '.lm-ti-ring.is-on circle{stroke:var(--la-accent);stroke-width:3}',
    '.lm-ti-r2.is-on circle{stroke:var(--lab-oro)}',
    '.lm-ti-ring.is-full circle{stroke-width:4}',
    '.lm-ti-ring.is-now circle{animation:lmPulse 987ms var(--lab-ease-out) 1}',
    '@keyframes lmPulse{0%{stroke-width:3}40%{stroke-width:9}100%{stroke-width:4}}',
    '.lm-ti-t{font:600 12.5px var(--lab-font-display);fill:var(--lab-ink)}',
    '.lm-ti-s{font:600 8.5px var(--lab-font-inscription);letter-spacing:.12em;text-transform:uppercase;fill:var(--lab-muted)}',
    '.lm-ti-dot{fill:var(--lab-oro)}',
    '.lm-ti-d{font:600 22px/1.3 var(--lab-font-display);color:var(--lab-ink);margin:5px 0 13px}',
    '.lm-ti-sm{color:var(--lab-muted);font-weight:500}',
    '.lm-sa-q{margin:8px 0 13px}',
    '.lm-sa-seg{font-family:var(--lab-font-display);font-size:21px;font-style:italic}',
    '.lm-sa-r{margin-top:13px}',
    '@media (max-width:640px){.lm-ti-g{grid-template-columns:1fr}.lm-ti-svg{max-width:300px}.lm-ti-d{font-size:19px}.lm-sa-seg{font-size:18px}}',
    '@media (prefers-reduced-motion:reduce){.lm-ti-ring circle{transition:none}.lm-ti-ring.is-now circle{animation:none}}',
    ':root[data-lim] .lm-ti-d{font-size:28px}',
    ':root[data-lim] .lm-sa-seg{font-size:26px}'
  ].join('\n');
  try {
    if (!document.getElementById('lm-css')) {
      var st = document.createElement('style'); st.id = 'lm-css'; st.textContent = CSS;
      (document.head || document.documentElement).appendChild(st);
    }
  } catch (e) { /* la lezione resta leggibile con il solo kit */ }
})();
