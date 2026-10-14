/* ---- lezione ---- */
/* Classe III · UDA 1 «Luoghi che cambiano la vita» · Lezione 3 (ora annuale 04)
   «Chi cura chi non può ricambiare?» — Santo Spirito in Sassia: dalla carità alla cura organizzata.
   Sorgente dell’artefatto LAB-IRC, assemblato con il kit che contiene la «Guida del docente» (regia e guida).
   NON ricostruire con design-system/…/build_artefatto.py: quel kit non ha la Guida e la perderebbe.
   Per aggiornare l’artefatto si sostituisce questo script dentro uploads/iii-1-3-chi-cura-chi-non-puo-ricambiare-artefatto.html
   (vedi sorgenti-lezioni/README.md).
   Contenuti dal dossier sorgenti/III 1-3 chi-cura-chi-non-puo-ricambiare-contenuti.md (rivisto l’8 ottobre 2026)
   e dal fascicolo (fonte dei contenuti; in classe non si usa: è il materiale di studio a casa);
   progetto in sorgenti/III 1-3 chi-cura-chi-non-puo-ricambiare-progetto-artefatto.md.
   14 ottobre 2026: filo logico ricucito. Santo Spirito in Sassia è il filo dell’ora fin dalla prima scena, che mostra
   la domanda e il percorso in quattro passi (un’idea, un problema, una soluzione, che cosa ne resta); ogni scena
   comincia riprendendo la precedente. Stesso ordine delle scene, stessi strumenti, stessi contenuti e fonti.
   Citazioni bibliche: Bibbia CEI 2008. Nessun componente proprio, nessuna immagine. © Matteo Sestili — Tutti i diritti riservati */

window.LEZIONE = {
  slug: 'iii-1-3-chi-cura-chi-non-puo-ricambiare',
  classe: 'Anno III',
  titolo: 'Chi cura chi non può *ricambiare*?',
  sottotitolo: 'Santo Spirito in Sassia: dalla carità alla cura organizzata.',
  saluto: 'Chi riceve non deve nulla; chi accoglie si organizza. Buon vento!',

  glossario: {
    'gratuità': { etim: 'da *gratuito*, latino *gratuitus*, dallo stesso tema di *gratus* e *gratia*', def: 'Aiutare senza pretendere un vantaggio da chi riceve; non significa senza costi.' },
    'carità': { etim: 'dal latino *caritas*, «affetto, amore», da *carus*, «caro»', def: 'Nel cristianesimo, la virtù per la quale si ama Dio sopra ogni cosa e il prossimo per amore di Dio (Catechismo 1822).' },
    'ospedale': { etim: 'dal latino *hospitale*, neutro sostantivato di *hospitalis*, «ospitale», da *hospes*, «ospite»', def: 'Nel Medioevo, casa di accoglienza per forestieri, poveri e malati; oggi, istituzione per la cura dei malati.' },
    'xenodochium': { etim: 'dal greco *xenodochéion*, «casa dello straniero» (si legge «csenodòchium»)', def: 'Nel Medioevo, altro nome dell’*hospitale*: casa che accoglie forestieri e bisognosi.' },
    'Sassia': { etim: 'dalla *schola Saxonum*, «ospizio dei Sassoni»', def: 'Il quartiere di Roma fra il Vaticano e il Tevere dove sorgeva l’ospizio dei pellegrini anglosassoni e dove nasce l’ospedale di Santo Spirito.' },
    'bolla': { etim: 'dal latino *bulla*, il sigillo di piombo appeso al documento', def: 'Documento solenne del papa.' },
    'regola': { etim: 'dal latino *regula*, «asticella, misura»', def: 'Testo che fissa che cosa una comunità deve fare: rende l’impegno riconoscibile e verificabile.' },
    'esposti': { etim: 'dal latino *expositi*, «messi fuori»; nel *Liber Regulae* anche *proiecti*, «gettati fuori»', def: 'I neonati abbandonati e affidati all’ospedale, che li nutriva e li educava.' },
    'dignità': { etim: 'dal latino *dignitas*, da *dignus*, «degno»', def: 'Il valore della persona in quanto persona, indipendente dalla produttività e dalla capacità di restituire.' }
  },

  guida: {
    "inBreve": "Domanda: chi cura chi non può ricambiare? Il filo dell’ora è un luogo che esiste ancora, l’ospedale di Santo Spirito in Sassia a Roma, terzo «luogo che cambia la vita» dopo il monastero e l’università. Quattro passi: un’idea (Lc 14,12–14, la gratuità); un problema (gratuito non vuol dire senza costi: serve un’istituzione); una soluzione (l’hospitale che un papa e una comunità costruiscono fra il 1198 e il 1204, e come sappiamo che cosa faceva); che cosa ne resta (la dignità di chi non può restituire, un caso di oggi, i criteri della Chiesa). Alla fine si torna al Lungotevere e alla domanda. Il fascicolo è il materiale di studio a casa: in classe non serve.",
    "materiali": [
      "L’artefatto alla LIM: il file «III 1-3 chi-cura-chi-non-puo-ricambiare-artefatto.html» (si apre con un doppio clic e funziona senza internet). Testi, fonti e attività sono tutti sullo schermo: nessuna fotocopia, nessun foglio, la lavagna non serve.",
      "Il fascicolo «Chi cura chi non può ricambiare?» (file «III 1-3 chi-cura-chi-non-puo-ricambiare-fascicolo.pdf») è il materiale di **studio a casa**: in classe non si stampa e non si usa. Contiene in prosa gli stessi contenuti dell’ora. Caricalo sul registro elettronico (o indica dove trovarlo sul sito) e assegnalo alla fine dell’ora, nella scena 10, con le quattro domande di «Per lo studio». Se non puoi caricarlo (per esempio se sei un supplente), il compito si detta e il fascicolo lo carica il docente della classe."
    ],
    "prima": [
      "La scena 1 mostra il percorso dell’ora in quattro passi (un’idea, un problema, una soluzione, che cosa ne resta): è la bussola della classe. All’inizio di ogni scena la frase della regia dice a che passo siete: leggila, così nessuno si chiede perché si cambia argomento.",
      "Nella scena 3 prova la freccia → sotto l’animazione; alla LIM il tasto L ingrandisce tutto.",
      "Leggi le sei domande della Sfida con le soluzioni (scena 7): le ragioni le leggi tu, il gioco non le mostra."
    ],
    "nozioni": [
      {
        "titolo": "Il testo: Lc 14,12–14",
        "testo": "Gesù è a pranzo, di sabato, in casa di uno dei capi dei farisei (un gruppo religioso ebraico attento alla Legge: qui uno dei loro capi è il padrone di casa). A chi lo ha invitato dice di non invitare amici, fratelli, parenti e ricchi vicini, perché ricambierebbero, ma «poveri, storpi, zoppi, ciechi», «perché non hanno da ricambiarti»; la ricompensa verrà da Dio «alla risurrezione dei giusti», cioè nel giudizio di Dio: il bene compiuto è affidato a lui, non all’ospite. Le stesse quattro categorie tornano in Lc 14,21, nella parabola del grande banchetto. Il testo parla di una tavola, non di un ospedale: dà un criterio, che chi riceve non debba nulla. È linguaggio paradossale, come altri detti di Gesù: non vieta le feste con gli amici."
      },
      {
        "titolo": "Gratuità, carità, istituzione",
        "testo": "**Gratuità**: aiutare senza pretendere un vantaggio da chi riceve (latino *gratuitus*, dalla radice di *gratia*). **Carità** (latino *caritas*, da *carus*, «caro»): per il Catechismo è «la virtù teologale per la quale amiamo Dio sopra ogni cosa per se stesso, e il nostro prossimo come noi stessi per amore di Dio» (n. 1822). Le **opere di misericordia** di Mt 25,35–36 sono sei (sfamare, dissetare, accogliere lo straniero, vestire, visitare il malato e il carcerato); la tradizione aggiunge seppellire i morti (Catechismo 2447). Gesù le lega alla frase «tutto quello che avete fatto a uno solo di questi miei fratelli più piccoli, l’avete fatto a me» (Mt 25,40). Gratuito non significa senza costi: i costi li sostiene qualcun altro (donazioni, terre, lasciti). Perché l’aiuto duri serve un’**istituzione**: un’organizzazione che rende durevole un compito, con persone incaricate, risorse, una regola e un luogo."
      },
      {
        "titolo": "La parola «ospedale» e l’ospedale medievale",
        "testo": "«Ospedale» viene dal latino *hospitale*, da *hospitalis*, «ospitale»: all’origine un alloggio per forestieri; *hospes* era insieme chi ospita e chi è ospitato. Nel Medioevo un *hospitale* (detto anche *xenodochium*, «casa dello straniero») era una casa di accoglienza per forestieri, poveri e malati, non un luogo di terapia: la malattia vi entrava come una forma del bisogno. Ospizi così esistevano già nell’alto Medioevo; dall’XI secolo si moltiplicano lungo le vie dei pellegrinaggi (Roma, Gerusalemme, Santiago). La cura ha una storia più ampia del cristianesimo: l’antichità ebbe luoghi di terapia e infermerie militari, il mondo islamico dall’VIII secolo istituzioni per la cura delle malattie con medici e scuole. La Regola di san Benedetto (VI secolo) chiede di accogliere ogni ospite «come Cristo in persona» (53,1), «soprattutto» i poveri e i pellegrini (53,15)."
      },
      {
        "titolo": "Santo Spirito: le date sicure",
        "testo": "Sassia: la *schola Saxonum*, ospizio dei pellegrini anglosassoni fondato dal re Ina verso il 727–729, fra il Vaticano e il Tevere, in rovina nel XII secolo. Innocenzo III (Lotario dei Conti di Segni), eletto papa l’8 gennaio 1198, conosceva dagli anni di studio in Francia l’opera di Guido di Montpellier (lo dice la lettera apostolica *Fide incensus*, 2024), un laico che prima del 1190 aveva aperto nella sua città una casa-ospedale per i poveri, con una comunità di fratelli e sorelle, laici e chierici. Nell’aprile 1198 il papa approvò la regola di quella comunità (bolla *Hiis precipue*, 22 aprile: i fratelli sono «non tanto accoglitori dei bisognosi, quanto piuttosto servi»). Fra il 1198 e il 1201 fece costruire un ospedale accanto a Santa Maria in Sassia; il 10 dicembre 1201 lo affidò a Guido; il 19 giugno 1204, con la bolla *Inter opera pietatis*, confermò l’ordine ospedaliero del Santo Spirito e la sua regola, i suoi compiti (le opere di misericordia) e il governo sulla casa romana, divenuta casa madre. Guido morì a Roma nel 1208."
      },
      {
        "titolo": "Norma, pratica, memoria",
        "testo": "La regola dell’ordine, confermata nel 1204, ci è arrivata nella forma del Duecento, copiata in un codice miniato (decorato con piccole pitture) della metà del Trecento, il *Liber Regulae* (Archivio di Stato di Roma); quanto fosse cambiata dalla regola di Montpellier approvata nel 1198, le fonti lette non lo dicono. Prescrive di accogliere i malati che arrivano o vengono portati e, per prima cosa, di farli confessare e comunicare, poi di metterli a letto (cap. XIII); di cercare i poveri infermi per le strade e le piazze (cap. XL); di vestire e accogliere i poveri anche se sani (capp. XXXIX e XLIII); di nutrire «gli orfani infanti proietti» e accogliere «le povere donne incinte» (cap. XLI). Gli esposti diventavano «figli della casa» e venivano avviati a un mestiere «di utilità all’Istituzione» (F. Micciarelli, 2013); la ruota che si vede oggi sul fianco dell’edificio è del Seicento. Una regola dice che cosa si deve fare, non dimostra che cosa è accaduto: le pergamene dei lasciti (la prima conservata in originale è del 28 giugno 1245) mostrano che l’opera era stimata, non che ogni ospite fosse ben curato. Le Corsie Sistine (1471–1478, Sisto IV), affrescate alla fine del Quattrocento, raccontano le origini quasi tre secoli dopo: il sogno del papa sui neonati gettati nel Tevere è una leggenda che i documenti del tempo non attestano."
      },
      {
        "titolo": "Dignità e il criterio di oggi",
        "testo": "La **dignità** (latino *dignitas*, da *dignus*, «degno») è il valore della persona in quanto persona: non dipende dalla produttività né dalla capacità di restituire. Per questo, a parità di valore, bisogni diversi chiedono risposte differenti, motivate e verificabili (il caso della scena 8 è immaginario). Il criterio con cui la Chiesa di oggi giudica le sue opere è in *Deus caritas est* (Benedetto XVI, 25 dicembre 2005), n. 31: «occorre innanzitutto la competenza professionale», che però «da sola non basta», perché le persone «hanno bisogno di umanità» (31a); alla spontaneità del singolo si uniscono «la programmazione, la previdenza, la collaborazione con altre istituzioni simili» (31b); «L’amore è gratuito; non viene esercitato per raggiungere altri scopi» e «Chi esercita la carità in nome della Chiesa non cercherà mai di imporre agli altri la fede della Chiesa» (31c)."
      }
    ],
    "contesto": [
      "Vangelo di Luca: terzo Vangelo, scritto verso l’80–90 (data discussa); Lc 14 sta nel lungo «viaggio verso Gerusalemme» (Lc 9,51–19,27).",
      "Farisei: gruppo religioso ebraico del tempo di Gesù, attento all’osservanza della Legge; in Lc 14,1 uno dei loro capi ospita Gesù a pranzo: è il padrone di casa.",
      "Vangelo di Matteo 25,31–46: la scena del giudizio finale, con le sei opere e la frase «l’avete fatto a me» (25,40).",
      "Regola di san Benedetto: VI secolo, Montecassino; il capitolo 53 riguarda l’accoglienza degli ospiti (se la classe ha fatto la lezione III 1-1, l’ha già incontrata). Si cita come la Bibbia: 53,1 = capitolo 53, versetto 1.",
      "Roma, Borgo e Sassia: il rione fra il Vaticano e il Tevere. L’ospedale di Santo Spirito è ancora lì, sul Lungotevere in Sassia: oggi è un ospedale pubblico, sede dell’ASL Roma 1.",
      "Innocenzo III: Lotario dei Conti di Segni, nato a Gavignano (Lazio) nel 1160 o 1161, studi di teologia a Parigi, papa dall’8 gennaio 1198 alla morte, a Perugia, il 16 luglio 1216; convoca il concilio Lateranense IV (1215).",
      "Guido di Montpellier: laico di Montpellier (Francia meridionale), di famiglia benestante; muore a Roma nei primi mesi del 1208. Il 18 maggio 2024 papa Francesco gli ha riconosciuto il culto di beato (lettera apostolica *Fide incensus*).",
      "Ordine del Santo Spirito: ordine ospedaliero, cioè comunità religiosa riconosciuta dal papa e dedicata all’assistenza (non monastica in senso stretto né cavalleresca); segno: croce a doppio braccio su mantello nero.",
      "*Liber Regulae*: «libro della regola», Archivio di Stato di Roma, Fondo Ospedale di S. Spirito, Ms. 3193. I capitoli citati vengono dallo studio di F. Micciarelli (*Medicina nei secoli*, 2013).",
      "Sisto IV: Francesco della Rovere (1414–1484), francescano, papa dal 1471; rifà l’ospedale fra il 1471 e il 1478: le Corsie Sistine, due grandi sale affrescate alla fine del Quattrocento, con iscrizioni latine dell’umanista Bartolomeo Platina.",
      "Benedetto XVI: Joseph Ratzinger (1927–2022), papa dal 2005 al 2013; *Deus caritas est* («Dio è amore», dalla frase di 1 Gv 4,16 con cui si apre) è la sua prima enciclica, firmata il 25 dicembre 2005 e resa pubblica il 25 gennaio 2006; il n. 31 sta nella seconda parte, sull’attività caritativa della Chiesa.",
      "Laici e chierici: i chierici sono i membri del clero (sacerdoti e chi ha ricevuto gli ordini sacri); i laici sono tutti gli altri fedeli. Nella comunità di Guido c’erano gli uni e gli altri, uomini e donne.",
      "Santa Maria in Sassia: la chiesa accanto alla quale Innocenzo III fece costruire l’ospedale; con la bolla del 1201 la chiesa e l’ospedale furono affidati a Guido.",
      "Catechismo della Chiesa Cattolica (1992): il testo ufficiale che espone la fede cattolica, citato per numeri; il n. 1822 definisce la carità, il n. 2447 elenca le opere di misericordia.",
      "Comunicarsi: ricevere l’eucaristia, la comunione."
    ],
    "pronuncia": [
      "*Sassia*: «sàssia»; *schola Saxonum*: «scòla sàxonum», «ospizio dei Sassoni».",
      "*hospitale*: «ospitàle», «alloggio per forestieri»; *hospitalis*: «ospitàlis», «ospitale»; *hospes*: «òspes», «ospite»; *xenodochium*: «csenodòchium», «casa dello straniero».",
      "*caritas*: «càritas», «amore, affetto»; *carus*: «càrus», «caro»; *gratuitus*: «gratùitus»; *dignitas*: «dìgnitas», da *dignus*, «dìgnus», «degno».",
      "*Liber Regulae*: «lìber règule», «libro della regola»; *Hiis precipue*: «ìis precìpue», «a questi soprattutto»; *Inter opera pietatis*: «ìnter òpera pietàtis», «tra le opere di pietà», cioè di misericordia.",
      "*proiecti*: «proiècti», «gettati fuori», cioè esposti.",
      "*Deus caritas est*: «dèus càritas est», «Dio è amore»; *Fide incensus*: «fìde incènsus», «infiammato di fede».",
      "Montpellier: «monpelié»; Lotario: «lotàrio»; Gavignano: «gavignàno»; Platina: «platìna».",
      "*bimaristan* (istituzioni islamiche per la cura dei malati): «bimaristàn»."
    ],
    "attenzione": [
      "Non dire «il primo ospedale d’Europa» o «la Chiesa ha inventato gli ospedali». Di’ invece: «uno dei grandi ospedali medievali, fondato da un papa; luoghi di cura esistevano già nell’antichità e nel mondo islamico». Le fonti non sostengono alcun primato.",
      "Non dire «fondato nel 1198» come data secca. Di’ invece: «fondato da Innocenzo III fra il 1198 e il 1201, affidato a Guido nel dicembre 1201, confermato nel 1204». Il 1198 è l’anno dell’elezione del papa e dell’approvazione della regola della comunità di Montpellier.",
      "Non confondere Innocenzo III (papa 1198–1216) con Sisto IV (papa 1471–1484): le Corsie Sistine sono la ricostruzione del Quattrocento, non «l’ospedale di Innocenzo III».",
      "Non dire «la ruota degli esposti del 1198». Di’ invece: «la ruota che si vede oggi è del Seicento; la cura degli esposti è prescritta dalla regola».",
      "Non presentare il sogno di Innocenzo III come un fatto. Di’ invece: «una leggenda posteriore, dipinta negli affreschi del Quattrocento; i documenti del tempo non ne parlano».",
      "Non dire che Guido era «un cavaliere crociato» né «un monaco». Di’ invece: «un laico di Montpellier, poi ‘fratel Guido’, a capo di una comunità ospedaliera di uomini e donne, laici e chierici».",
      "Non dire «gratuito vuol dire senza costi». Di’ invece: «gratuito per chi riceve; i costi li sostiene qualcun altro». È il concetto che regge l’ora.",
      "Non dire che «ospedale» nel Medioevo significa clinica o pronto soccorso. Di’ invece: «casa di accoglienza per forestieri, poveri e malati».",
      "Non dire «la regola dimostra che tutti erano curati bene». Di’ invece: «la regola dice che cosa si doveva fare; per sapere che cosa accadde servono altre fonti».",
      "Non dire «Gesù vieta di invitare gli amici». Di’ invece: «Gesù rovescia il criterio dell’invito: non scegliere solo chi può ricambiare».",
      "Nella scena 8 non applicare «chi può ricambiare» e «chi non può» agli studenti della classe: il caso è immaginario e riguarda ospiti di una casa di accoglienza.",
      "Non dire che la confessione era «un ricatto» né che «non era una condizione»: la regola la chiedeva al malato appena accolto; che cosa accadesse a chi rifiutava, le fonti lette non lo dicono."
    ],
    "domande": [
      {
        "q": "La Chiesa curava per convertire?",
        "r": "Nell’ospedale medievale cura dell’anima e del corpo stavano insieme: il *Liber Regulae* chiede che il malato, appena accolto, per prima cosa si confessi e si comunichi, e poi sia messo a letto. Era il modo di allora di curare tutta la persona. La regola chiede anche di andare a cercare i malati per le strade e fa accogliere i poveri anche se sani. Oggi la Chiesa dice esplicitamente che la carità non è un mezzo di proselitismo: chi la esercita «non cercherà mai di imporre agli altri la fede della Chiesa» (*Deus caritas est* 31c).",
        "seInsistono": "«Ma un malato poteva rifiutare la confessione? Era una condizione?» Le fonti lette non lo dicono: dillo come limite, senza indovinare in un senso o nell’altro. Ciò che sappiamo è la norma della regola e il criterio di oggi (nessuna imposizione)."
      },
      {
        "q": "Oggi la sanità è dello Stato: che c’entra la Chiesa?",
        "r": "Nel Medioevo non esisteva un servizio sanitario per tutti, pagato dallo Stato, come il nostro; a Roma il papa era anche il signore della città e l’ospedale fu una fondazione pontificia. Lo Stato ha assunto la sanità molto più tardi (in Italia il Servizio sanitario nazionale è del 1978). La lezione non chiede chi debba gestire gli ospedali oggi, ma come nasce l’idea che chi non può restituire nulla vada curato comunque: quell’idea ha contribuito a far nascere l’istituzione che lo Stato ha poi ereditato; Santo Spirito è oggi un ospedale pubblico.",
        "seInsistono": "«Quindi la Chiesa non serve più?» Non è una domanda a cui la lezione risponde: annotala. Oggi la Chiesa continua a gestire ospedali e opere caritative, e l’enciclica del 2005 dice con quali criteri."
      },
      {
        "q": "E gli ospedali islamici? Non li hanno inventati loro?",
        "r": "Nel mondo islamico, dall’VIII secolo, esistevano istituzioni per la cura delle malattie con medici e scuole di medicina (i *bimaristan*), che sotto questo aspetto precedono l’Occidente latino (Treccani, *Enciclopedia dell’Arte Medievale*). L’ospedale cristiano medievale nasce da un’altra idea, l’ospitalità verso il bisognoso in quanto tale; le due storie si sono influenzate e nessuna «inventa» tutto.",
        "seInsistono": "«Allora i cristiani hanno copiato?» I modelli circolavano fra Oriente e Occidente; la lezione mostra la motivazione cristiana, non un primato né una copia."
      },
      {
        "q": "Se la ricompensa arriva alla risurrezione, anche il cristiano fa i suoi conti: non è gratuito.",
        "r": "È un’obiezione seria. Il testo distingue due cose: ciò che si chiede a chi riceve (niente) e ciò che Dio promette a chi dà (la ricompensa «alla risurrezione dei giusti»). La gratuità di cui parla la lezione riguarda il rapporto fra chi aiuta e chi è aiutato: quest’ultimo non deve nulla.",
        "seInsistono": "«Ma allora lo fa per interesse.» Nella fede cristiana la ricompensa non è un pagamento ma la comunione con Dio, cioè lo stesso amore con cui si è agito; la lezione non chiede di crederci, ma di capire la distinzione."
      },
      {
        "q": "I frati e i medici venivano pagati? Allora non era gratis.",
        "r": "L’ospedale aveva beni, terre, rendite e lasciti (dal 1245 abbiamo pergamene di donazioni) e con questi manteneva fratelli, sorelle, balie e, nei secoli seguenti, medici. Era gratuito per chi era accolto, non senza costi: è la distinzione della scena 3.",
        "seInsistono": "«Quindi era un’azienda.» Divenne anche una potenza economica: amministrare beni serviva a far durare l’accoglienza. Il rischio che l’amministrazione prenda il posto del fine è reale, ed è uno dei due errori opposti di cui parla il fascicolo: ridurre tutto ad amministrazione, o credere che una buona intenzione sia già una cura."
      },
      {
        "q": "Il sogno di Innocenzo III è vero?",
        "r": "È una leggenda raccontata più tardi e dipinta negli affreschi del Quattrocento; i documenti del tempo (le bolle) non ne parlano. Serve a capire come l’ospedale voleva essere ricordato: nato per i neonati abbandonati.",
        "seInsistono": "«Perché la dipingevano se non era vera?» Nel Quattrocento la storia delle origini si raccontava per immagini; una leggenda può dire una verità sul fine di un’istituzione senza essere una cronaca."
      },
      {
        "q": "I bambini della ruota che fine facevano?",
        "r": "Secondo la regola e lo studio di F. Micciarelli (2013) sul Duecento, diventavano «figli della casa»: le balie li allattavano, ricevevano un’istruzione di base e un mestiere; i maschi lavoravano nelle terre dell’ospedale, le femmine ricevevano una dote per sposarsi o restavano al servizio della casa.",
        "seInsistono": "«Allora ricambiavano: altro che gratis!» In parte è vero, e va detto: secondo Micciarelli venivano avviati a un mestiere «di utilità all’Istituzione», e l’accoglienza aveva anche una logica economica. Ma da neonati erano accolti e nutriti senza che potessero dare nulla. E non sappiamo com’era la vita di ciascuno: le fonti dicono la norma e l’organizzazione; è un buon esempio della differenza fra norma e pratica."
      },
      {
        "q": "Prof, lei ci crede?",
        "r": "Puoi rispondere con semplicità ciò che pensi, oppure dire che non è il punto dell’ora; in tutti e due i casi riporta alla lezione: non serve credere per capire perché un papa e una comunità organizzarono un ospedale e che cosa prescriveva la loro regola. La lezione chiede di capire, non di aderire."
      }
    ],
    "seNonSai": "Per un dettaglio su Santo Spirito che qui non trovi (altri papi, i medici dei secoli successivi, le opere d’arte, il perché dell’abbandono dei neonati), di’: «È una buona domanda; le fonti di questa lezione non lo dicono: me la segno e la riprendiamo». Le fonti sono in fondo allo Studio (modalità «Studio» dell’artefatto, dopo le domande «Per lo studio») e in fondo al fascicolo. Sulla sanità di oggi o sulla politica non sei tenuto a dare la tua opinione: riporta la domanda alla distinzione fra gratuità e costi, fra norma e pratica.",
    "ritardo": [
      "Se cominci con più di due minuti di ritardo (appello, accensione della LIM), applica subito tutte le voci qui sotto.",
      "Scena 4: smista solo le prime due frasi, poi premi «Avanti»; il riquadro «Con onestà» leggilo comunque.",
      "Scena 5: apri solo le date 1198, 1198–1201 e 1204; le altre dille tu in una frase («l’ospizio dei Sassoni dell’VIII secolo, Guido a Montpellier prima del 1190, un centinaio di case alla fine del Duecento»).",
      "Scena 6: smista le cinque fonti senza fermarti sulle spiegazioni (leggi solo quella della pergamena), salta la domanda sulla pergamena e non aprire «Per capire»: di’ tu in una frase che la ruota degli esposti che si vede oggi è del Seicento.",
      "Scena 7: fermati dopo la domanda 4: leggi il punteggio delle due squadre in alto e premi «← Torna alla lezione».",
      "Scena 8: se la classe sceglie una strada che finisce male, leggi l’esito, premi «Torna indietro» e tocca tu l’altra scelta, senza un nuovo voto.",
      "Scena 9: apri solo il terzo dubbio, «La Chiesa curava per convertire?».",
      "Non saltare la storia a bivi (scena 8), la prova breve né il ritorno alla domanda (scena 10)."
    ],
    "anticipo": [
      "Scena 1: lascia crescere la nuvola fino a 12–15 parole e chiedi quale parola li ha sorpresi.",
      "Scena 8: dopo l’esito positivo premi «Da capo» e percorrete apposta le strade che finiscono male; chiedi che cosa le rende convincenti a prima vista (sembra giusto dare a tutti lo stesso; la donazione sembra utile a tutti).",
      "Dopo la scena 10: modalità «Giochi» (in alto), scheda «Vero o falso» o «Linea del tempo» per ripassare equivoci e date."
    ],
    "senzaProiettore": "Senza LIM l’ora si fa con voce e lavagna, usando l’appendice di questa guida con i testi dello schermo. Scena 1: scrivi alla lavagna le parole dette dai ragazzi e, in un angolo, i quattro passi dell’ora (un’idea, un problema, una soluzione, che cosa ne resta), da spuntare man mano. Scena 2: leggi tu Lc 14,12–14 e chiedi quale frase dà il motivo dell’invito. Scena 3: disegna due riquadri, «Chi accoglie» e «Poveri, storpi, zoppi, ciechi», con la freccia dell’invito; poi aggiungi i costi (pasto, letto, assistenza), chi li sostiene (donazioni, terre, lasciti) e infine persone incaricate e regola, e scrivi «un’istituzione». Scene 4–6: leggi le frasi da smistare e la classe vota per alzata di mano; le sei date di Santo Spirito scrivile alla lavagna. Scena 7: Sfida a voce, due squadre, con le sei domande delle soluzioni lette come domande aperte (senza opzioni): un punto per la risposta e uno per la ragione. Scena 8: leggi il caso e fai votare a ogni bivio. Scene 9–10: leggi i tre dubbi e le tre domande della prova; la frase finale scrivila alla lavagna. Il fascicolo resta per casa."
  },

  scene: [

    /* 1 · APERTURA ---------------------------------------------------- */
    { fase: 'Aggancio', momento: 'Apertura', minuti: 4, titolo: 'Un ospedale di *ottocento* anni',
      lead: 'Dopo il monastero e l’università, il terzo luogo che cambia la vita è un ospedale: Santo Spirito in Sassia, a Roma, accanto al Vaticano. Lo fece costruire un papa più di ottocento anni fa, ed è ancora un ospedale pubblico. All’inizio accoglieva poveri, malati e neonati abbandonati: persone che non potevano restituire nulla.',
      regia: {
        "obiettivo": "Il filo dell’ora è un luogo che esiste ancora, Santo Spirito in Sassia. Se l’aiuto va solo a chi può ricambiare, resta fuori proprio chi ne ha più bisogno: la domanda è chi cura queste persone e perché qualcuno ha costruito un luogo per farlo. La classe vede subito dove arriverà l’ora: quattro passi.",
        "passi": [
          {
            "di": "Nell’unità «I luoghi che cambiano la vita», dopo il monastero, con la Regola di Benedetto, e l’università, oggi il terzo luogo è un ospedale. A Roma, sul Lungotevere in Sassia, accanto al Vaticano, c’è l’ospedale di Santo Spirito: lo fece costruire un papa più di ottocento anni fa, ed è ancora un ospedale pubblico. All’inizio accoglieva poveri, malati e neonati abbandonati: persone che non potevano restituire nulla. Prima di entrarci, partiamo da voi."
          },
          {
            "di": "Immaginate che ogni aiuto, un pasto, un letto, una cura, fosse riservato solo a chi può restituire qualcosa. Chi resterebbe fuori? Ditemi una parola alla volta: una persona o una situazione."
          },
          {
            "fai": "Scrivi nel riquadro «Scrivi una parola…» ogni parola detta dai ragazzi e premi «Aggiungi»; se una parola è già scritta, toccala: cresce. Fermati a 8–10 parole (circa un minuto e mezzo). Se la classe tace, proponi tu «un neonato» o «un malato grave» e chiedi chi altro."
          },
          {
            "chiedi": "Guardate le parole più grandi: che cosa hanno in comune queste persone?",
            "r": "Hanno più bisogno degli altri e possono restituire poco o nulla: il neonato, il malato grave, l’anziano non autosufficiente, il povero. Se qualcuno dice «chi non lavora», accogli e precisa: «Il punto non è il lavoro ma il bisogno: chi ha più bisogno è spesso chi può restituire meno»."
          },
          {
            "di": "Proprio queste persone accoglieva Santo Spirito. Allora la domanda di oggi è questa, la vedete sotto la nuvola: chi cura chi non può ricambiare? E perché qualcuno costruisce un luogo per farlo? Ci arriviamo in quattro passi. Un’idea: perché aiutare chi non può restituire. Un problema: chi paga, e come si fa durare l’aiuto. Una soluzione: l’ospedale che un papa fa costruire a Roma, e come sappiamo che cosa faceva. Infine, che cosa ne resta oggi. Alla fine torneremo qui, al Lungotevere."
          },
          {
            "fai": "Mentre lo dici, indica una per una le quattro righe del riquadro «La domanda di oggi». Nelle scene seguenti la prima frase della regia dice a che passo siete: leggila sempre."
          }
        ],
        "poi": "«Primo passo, l’idea: perché aiutare chi non può restituire? La ragione è più antica dell’ospedale: un pranzo raccontato dal Vangelo di Luca.»"
      },
      blocchi: [
        { tipo: 'nuvola', id: 'fuori', q: 'Se l’aiuto fosse solo per chi può ricambiare, chi resterebbe fuori?',
          istruzione: 'Dite una parola alla volta: chi la ripete la fa crescere.' },
        { tipo: 'html', titolo: 'La domanda di oggi: chi cura chi non può ricambiare?',
          t: '<ol><li><b>Un’idea.</b> Perché aiutare chi non può restituire? Un pranzo nel Vangelo di Luca.</li><li><b>Un problema.</b> Gratuito non vuol dire senza costi: chi paga, e come si fa durare l’aiuto?</li><li><b>Una soluzione.</b> Un <i>hospitale</i> a Roma, fra il 1198 e il 1204: chi l’ha deciso, come, e come lo sappiamo.</li><li><b>Che cosa ne resta.</b> La dignità di chi non può restituire, e come servirla bene oggi.</li></ol>' }
      ] },

    /* 2 · LUCA 14,12–14 ----------------------------------------------- */
    { fase: 'Scoperta', momento: 'Fonte', minuti: 5, titolo: 'Un posto a tavola senza *debiti*',
      lead: 'Primo passo, l’idea: perché aiutare chi non può restituire? La ragione è più antica dell’ospedale. Un pranzo di sabato, in casa di uno dei capi dei farisei: Gesù si rivolge a chi lo ha invitato.',
      regia: {
        "obiettivo": "Gesù rovescia il criterio dell’invito: chi è accolto non deve nulla a chi lo accoglie; la ricompensa viene da Dio. Questo si chiama gratuità, ed è l’idea da cui nasceranno luoghi come Santo Spirito.",
        "passi": [
          {
            "di": "Primo passo, l’idea. Prima di vedere come nasce Santo Spirito, chiediamoci perché qualcuno dovrebbe accogliere chi non può restituire nulla. La ragione è più antica di ogni ospedale. Siamo nel Vangelo di Luca, scritto verso l’80–90 dopo Cristo. Gesù è a pranzo, di sabato, in casa di uno dei capi dei farisei: i farisei erano un gruppo religioso ebraico molto attento alla Legge; qui uno dei loro capi è il padrone di casa. Gesù ha appena parlato agli invitati della scelta dei posti; ora si rivolge a chi lo ha invitato. Leggo il capitolo 14, versetti 12, 13 e 14."
          },
          {
            "fai": "Leggi ad alta voce il testo sullo schermo, lentamente, fino a «risurrezione dei giusti». Poi leggi la domanda scritta sopra il testo e fai scegliere alla classe, per alzata di mano frase per frase, una delle quattro frasi sottolineate. Tocca la frase scelta dalla maggioranza: compare se è quella giusta e la sua spiegazione; se non lo è, leggi la spiegazione, di’ la frase di correzione qui sotto e poi tocca «perché non hanno da ricambiarti»."
          },
          {
            "chiedi": "Quale frase dice perché invitare proprio loro?",
            "r": "«Perché non hanno da ricambiarti»: chi è accolto non contrae alcun debito. Se scelgono «perché a loro volta non ti invitino…», di’: «Questo è il motivo per non invitare gli amici: lo scambio». Se scelgono «invita poveri, storpi, zoppi, ciechi», di’: «Questi sono gli invitati; il motivo viene subito dopo». Se scelgono la frase sulla ricompensa, di’: «Questa è la promessa a chi accoglie, non il motivo per cui loro sono invitati»."
          },
          {
            "chiedi": "Allora chi accoglie riceverà qualcosa? Da chi?",
            "r": "Sì, una ricompensa, ma da Dio, «alla risurrezione dei giusti», cioè nel giudizio di Dio: il bene compiuto è affidato a Dio e al suo giudizio, non all’ospite. Chi riceve non deve nulla. «Sarai beato» vuol dire: sarai felice, benedetto da Dio. Se qualcuno dice «allora lo fa per interesse», usa la risposta alla domanda «Se la ricompensa arriva alla risurrezione…» in «Domande che i ragazzi possono fare»."
          },
          {
            "di": "Attenzione: Gesù non vieta le feste con gli amici. Usa un linguaggio paradossale per rovesciare un criterio: non scegliere gli invitati in base a ciò che possono restituire. Questo atteggiamento ha un nome."
          },
          {
            "fai": "Tocca la parola GRATUITÀ nel riquadro sotto il testo: si scompone e mostra l’origine."
          },
          {
            "di": "Gratuità viene dal latino gratuitus, dalla stessa radice di gratia, «grazia»: è ciò che si dà senza che chi riceve lo debba meritare, e senza pretendere da lui un vantaggio in cambio. Sono due facce della stessa cosa: chi riceve non ha un debito."
          }
        ],
        "attenzione": "Non dire «Gesù vieta di invitare gli amici»: rovescia il criterio dell’invito. Se chiedono «chi sono i giusti?», di’: «Il passo non lo spiega; qui conta che la ricompensa viene da Dio e non dall’ospite». Annota la domanda.",
        "poi": "«Secondo passo, il problema: chi è accolto non paga. Ma un aiuto gratuito costa qualcosa? Chi paga?»"
      },
      blocchi: [
        { tipo: 'leggi', fonte: 'Vangelo secondo Luca 14,12–14 · Bibbia CEI 2008', q: 'Quale frase dice perché invitare proprio loro?',
          testo: '«Quando offri un pranzo o una cena, non invitare i tuoi amici né i tuoi fratelli né i tuoi parenti né i ricchi vicini, [[perché a loro volta non ti invitino anch’essi e tu abbia il contraccambio::È la logica dello scambio: si invita chi potrà invitare a sua volta. Gesù non vieta le feste con gli amici: rovescia il criterio.]]. Al contrario, quando offri un banchetto, [[invita poveri, storpi, zoppi, ciechi::Sono gli invitati; il motivo viene subito dopo. Le stesse quattro categorie tornano nella parabola del grande banchetto (Lc 14,21).]]; e sarai beato [[!perché non hanno da ricambiarti::Ecco il motivo: chi è accolto non contrae alcun debito con chi lo accoglie.]]. [[Riceverai infatti la tua ricompensa alla risurrezione dei giusti::Questa è la promessa a chi accoglie: la ricompensa viene da Dio, non dall’ospite.]].»' },
        { tipo: 'parola', parola: 'gratuità', radice: 'gratia', origine: 'dal latino *gratuitus*, dalla stessa radice di *gratia*',
          significato: 'Aiutare senza pretendere un vantaggio da chi riceve: ciò che è concesso senza che chi riceve lo debba meritare.' }
      ] },

    /* 3 · CHI PAGA IL PASTO (concetto più difficile) ----------------- */
    { fase: 'Scoperta', momento: 'Spiegazione', minuti: 5, titolo: 'Chi paga il *pasto*?',
      lead: 'Secondo passo, il problema. Chi è accolto non paga: ma il pasto, il letto e chi assiste costano. Chi paga? E come si fa durare l’aiuto, se non basta l’entusiasmo di uno?',
      testo: 'Nel cristianesimo la gratuità appartiene alla {carità}: «Tutto quello che avete fatto a uno solo di questi miei fratelli più piccoli, l’avete fatto a me» (Mt 25,40).',
      regia: {
        "obiettivo": "Gratuito per chi riceve non vuol dire senza costi: i costi li sostiene qualcun altro, e perché il gesto si ripeta domani servono persone, risorse, una regola e un luogo, cioè un’istituzione. È esattamente ciò che vedremo nascere a Santo Spirito.",
        "passi": [
          {
            "di": "Secondo passo, il problema. Abbiamo l’idea: chi è accolto non deve nulla. Ma accogliere costa, e un’idea da sola non dura. Nel cristianesimo la gratuità fa parte della carità: dal latino caritas, «affetto, amore», da carus, «caro». Il Catechismo, al numero 1822, la definisce così: «la virtù teologale per la quale amiamo Dio sopra ogni cosa per se stesso, e il nostro prossimo come noi stessi per amore di Dio». Il Vangelo di Matteo, al capitolo 25, la rende concreta con sei opere di misericordia: dar da mangiare, dar da bere, accogliere lo straniero, vestire, visitare il malato e il carcerato; la tradizione ne aggiunge una settima, seppellire i morti. E Gesù dice: «Tutto quello che avete fatto a uno solo di questi miei fratelli più piccoli, l’avete fatto a me»."
          },
          {
            "fai": "Nell’animazione usa la freccia → sotto il riquadro dell’animazione: un fotogramma alla volta, cinque in tutto. Non premere «Avvia l’animazione»: scorrerebbe da sola (se succede, premi «Pausa»). Leggi la didascalia di ogni fotogramma, poi aggiungi le frasi seguenti."
          },
          {
            "di": "Primo e secondo fotogramma: fra amici l’invito torna indietro, oggi tu inviti me e domani io invito te. Gesù chiede di invitare chi non può ricambiare: guardate, la freccia tratteggiata del contraccambio sparisce."
          },
          {
            "di": "Terzo e quarto: eppure il pasto, il letto, chi assiste costano. Chi paga? Non chi è accolto: i costi li sostiene qualcun altro, chi dona, le terre, i lasciti, cioè i beni lasciati in testamento."
          },
          {
            "di": "Quinto: perché il gesto si ripeta domani, senza dipendere dall’entusiasmo di una persona, servono persone incaricate, risorse, una regola e un luogo. Questo insieme si chiama istituzione: un’organizzazione che rende durevole un compito."
          },
          {
            "chiedi": "«Gratuito»: che cosa significa, esattamente? (verifica sotto l’animazione: fai votare per alzata di mano, poi tocca la risposta più votata)",
            "r": "C, «Che è gratuito per chi lo riceve: i costi li sostiene qualcun altro». Se scelgono A, di’: «Il pasto c’è: qualcuno l’ha pagato. Gratuito descrive il rapporto con chi riceve, non i costi». Se scelgono B: «Allora sarebbe un prestito, e chi riceve avrebbe un debito: proprio ciò che Luca esclude»."
          }
        ],
        "attenzione": "È il concetto che regge l’ora: non dire «gratuito vuol dire senza costi»; di’ «gratuito per chi riceve».",
        "poi": "«Terzo passo, la soluzione. Un’istituzione che accoglie chi non può ricambiare, nel Medioevo, ha un nome: hospitale. È quello che un papa farà costruire in Sassia. Ma la parola non vuol dire ciò che pensate.»"
      },
      blocchi: [
        { tipo: 'animazione', id: 'pasto', rapporto: 1.9, ritmo: 3200, pulsante: 'Avvia l’animazione',
          attori: [
            { id: 'chi', t: 'Chi accoglie', forma: 'riquadro', colore: 'accent' },
            { id: 'ospite', t: 'Amici e parenti', forma: 'pillola', colore: 'muted' },
            { id: 'tinv', t: 'invito', forma: 'testo', colore: 'muted' },
            { id: 'tcon', t: 'contraccambio', forma: 'testo', colore: 'oro' },
            { id: 'pasto', t: 'Pasto · letto · assistenza', forma: 'pillola', colore: 'oro' },
            { id: 'risorse', t: 'Donazioni · terre · lasciti', forma: 'riquadro', colore: 'ciano' },
            { id: 'persone', t: 'Persone incaricate', forma: 'pillola', colore: 'verde' },
            { id: 'regola', t: 'Una regola', forma: 'pillola', colore: 'oro' }
          ],
          frecce: [
            { id: 'f1', da: 'chi', a: 'ospite', curva: 24 },
            { id: 'f2', da: 'ospite', a: 'chi', curva: 24, tratteggio: true },
            { id: 'f3', da: 'pasto', a: 'ospite', t: 'riceve' },
            { id: 'f4', da: 'risorse', a: 'chi' },
            { id: 'f5', da: 'persone', a: 'chi' },
            { id: 'f6', da: 'regola', a: 'chi' }
          ],
          passi: [
            { didascalia: 'Fra amici l’invito torna indietro: oggi tu, domani io.',
              attori: { chi: { x: 24, y: 52 }, ospite: { x: 76, y: 52 }, tinv: { x: 50, y: 72 }, tcon: { x: 50, y: 32 } }, frecce: ['f1', 'f2'] },
            { didascalia: 'Gesù chiede di invitare chi non può ricambiare: nessuna freccia torna indietro.',
              attori: { ospite: { on: true, t: 'Poveri, storpi, zoppi, ciechi' }, tcon: { o: 0 } }, frecce: ['f1'] },
            { didascalia: 'Eppure il pasto, il letto e chi assiste costano.',
              attori: { ospite: { on: false }, pasto: { x: 76, y: 14, on: true } }, frecce: ['f1', 'f3'] },
            { didascalia: 'I costi li sostiene qualcun altro: chi dona, le terre, i lasciti.',
              attori: { pasto: { on: false }, risorse: { x: 22, y: 88, on: true } }, frecce: ['f1', 'f3', 'f4'] },
            { didascalia: 'Perché il gesto si ripeta domani servono persone incaricate, risorse, una regola, un luogo: un’istituzione.',
              attori: { tinv: { o: 0 }, risorse: { on: false }, chi: { on: true, s: 1.12, t: 'Un’istituzione' }, persone: { x: 22, y: 13 }, regola: { x: 54, y: 88 } }, frecce: ['f1', 'f3', 'f4', 'f5', 'f6'] }
          ] },
        { tipo: 'verifica', q: 'Un servizio è «gratuito». Che cosa significa, esattamente?',
          opzioni: ['Che non costa niente a nessuno', 'Che chi lo riceve pagherà più tardi, quando potrà', 'Che è gratuito per chi lo riceve: i costi li sostiene qualcun altro'],
          ok: 2, why: 'Gratuito descrive il rapporto con chi riceve: non gli si chiede nulla. I costi restano e li sostengono altri (chi dona, chi lavora, chi amministra i beni). Per questo un aiuto che deve durare diventa un’istituzione.' }
      ] },

    /* 4 · LA PAROLA OSPEDALE ------------------------------------------ */
    { fase: 'Scoperta', momento: 'Parola', minuti: 4, titolo: 'L’ospedale comincia dall’*ospitalità*',
      lead: 'Terzo passo, la soluzione. Un’istituzione che accoglie chi non può ricambiare, nel Medioevo, ha un nome: *hospitale*. È ciò che un papa farà costruire in Sassia. Ma la parola non dice ciò che pensate.',
      testo: 'Un *hospitale*, detto anche {xenodochium}, era una casa di accoglienza per forestieri, poveri e malati: la malattia vi entrava come una forma del bisogno. È l’ospitalità che la Regola di san Benedetto chiedeva ai monaci: accogliere ogni ospite «come Cristo in persona» (53,1).',
      regia: {
        "obiettivo": "«Ospedale» viene dall’ospitalità: nel Medioevo era una casa di accoglienza, non un luogo di terapia, e Santo Spirito nasce così; la cura ha una storia più ampia del cristianesimo.",
        "passi": [
          {
            "di": "Terzo passo, la soluzione. Abbiamo visto che per far durare l’accoglienza serve un’istituzione. Nel Medioevo un’istituzione che accoglie chi non può ricambiare ha un nome: hospitale. È quello che un papa farà costruire in Sassia. Prima di entrarci, guardiamo la parola: non vuol dire quello che pensate."
          },
          {
            "fai": "Tocca le tre parti della parola OSPEDALE, una alla volta, da sinistra: hospes, hospitalis, hospitale."
          },
          {
            "di": "Ospedale viene dal latino hospitale, «alloggio per forestieri», da hospitalis, «ospitale», e da hospes, «ospite»: in latino hospes era sia chi ospita sia chi è ospitato. Nel Medioevo un hospitale, detto anche xenodochium, «casa dello straniero», accoglieva forestieri, poveri e malati: i malati come una forma del bisogno. Non immaginate reparti e medici. Ospizi così c’erano già nell’alto Medioevo; dall’XI secolo, con i pellegrinaggi verso Roma, Gerusalemme e Santiago, si moltiplicano lungo le strade. La Regola di san Benedetto, la regola dei monaci del VI secolo, chiede di accogliere ogni ospite «come Cristo in persona»."
          },
          {
            "fai": "Smistamento «Medioevo o oggi?»: leggi la frase, fai votare per alzata di mano fra le tre categorie, tocca la più votata e leggi la spiegazione. Quattro frasi, mezzo minuto ciascuna. Il perché di ogni frase è nelle soluzioni qui sotto."
          },
          {
            "fai": "Apri il riquadro «Con onestà» (tocca il +) e leggilo ad alta voce."
          },
          {
            "di": "Quindi non diciamo che la Chiesa ha inventato gli ospedali: la cura ha una storia più ampia. Il contributo cristiano è l’ospitalità verso chi ha bisogno, per il solo fatto che ha bisogno, organizzata in istituzioni."
          }
        ],
        "attenzione": "Non dire «il primo ospedale d’Europa» né «la Chiesa ha inventato gli ospedali».",
        "poi": "«Santo Spirito, all’inizio, è un hospitale di questo tipo. Torniamo al Lungotevere: chi decise di costruirlo, e come?»"
      },
      blocchi: [
        { tipo: 'etimo', parola: 'ospedale',
          parti: [ { t: 'hospes', d: '«ospite»: chi ospita e chi è ospitato' }, { t: 'hospitalis', d: '«ospitale»' }, { t: 'hospitale', d: '«alloggio per forestieri»' } ],
          nessi: ['→', '→'],
          spiegazione: 'Prima di essere un luogo di cura, l’ospedale è una casa che accoglie: la parola conserva l’ospitalità.',
          etim: 'dal latino *hospitale*, neutro sostantivato di *hospitalis*, «ospitale», da *hospes*, «ospite»',
          def: 'Nel Medioevo, casa di accoglienza per forestieri, poveri e malati; oggi, istituzione per la cura dei malati.' },
        { tipo: 'smista', titolo: 'Medioevo o oggi?', categorie: ['Ospedale medievale', 'Ospedale di oggi', 'Tutti e due'],
          voci: [
            { t: 'Accoglie forestieri e pellegrini di passaggio', c: 0, why: '*Hospitale* era prima di tutto un alloggio per chi viaggiava. Ospizi così esistevano già nell’alto Medioevo; dall’XI secolo, con i pellegrinaggi, si moltiplicano lungo le strade.' },
            { t: 'Ha reparti, medici specialisti e terapie', c: 1, why: 'È l’ospedale moderno. Nel Medioevo la malattia era una delle forme del bisogno, non l’oggetto di una terapia organizzata.' },
            { t: 'Accoglie i poveri anche se sono sani', c: 0, why: 'Lo prescriveva, per esempio, la regola dell’ospedale di Santo Spirito, che incontriamo fra poco: il criterio era il bisogno, non la malattia.' },
            { t: 'Assiste i malati', c: 2, why: 'I malati c’erano anche nell’ospedale medievale, ma accolti come bisognosi; oggi sono la ragione stessa dell’ospedale.' }
          ],
          chiusura: 'Stessa parola, due istituzioni diverse. L’*hospitale* che il papa fa costruire a Roma è del primo tipo: prima di tutto una casa che accoglie.' },
        { tipo: 'aggancio', etichetta: 'Con onestà', titolo: 'La cura non nasce da una sola tradizione',
          t: 'L’antichità conobbe luoghi di terapia e infermerie militari; nel mondo islamico, fin dall’VIII secolo, sorsero istituzioni per la cura delle malattie, con medici e scuole. Il contributo cristiano è l’ospitalità verso il bisognoso in quanto tale, organizzata in istituzioni.',
          fonte: 'B. D’Agosta e I. Moretti, «Ospedale», *Enciclopedia dell’Arte Medievale*, Treccani 1997' }
      ] },

    /* 5 · SANTO SPIRITO: LE DATE --------------------------------------- */
    { fase: 'Scoperta', momento: 'Contesto', minuti: 5, titolo: 'Un papa, una comunità, un *luogo*',
      lead: 'Torniamo al Lungotevere dell’inizio: chi decise di costruire quell’*hospitale*, e come? Nelle date arrivano, una alla volta, le cose che servono a un’istituzione: un luogo, le persone, una regola, i mezzi.',
      testo: 'Nessuna basta da sola: a {Sassia}, fra il 1198 e il 1204, si incontrano tutte. Una {bolla} è un documento solenne del papa, dal sigillo di piombo.',
      regia: {
        "obiettivo": "Santo Spirito nasce quando si incontrano le quattro cose dell’animazione: un luogo (la Sassia), le persone (la comunità di Guido di Montpellier), una regola, i mezzi (il papa, Innocenzo III). Nessuna basta da sola, e la data non è «1198» secco.",
        "passi": [
          {
            "di": "Torniamo al luogo dell’inizio. Siamo a Roma, nel quartiere fra il Vaticano e il Tevere che si chiama ancora Borgo, nella zona detta Sassia. L’ospedale di Santo Spirito è ancora lì, sul Lungotevere in Sassia: oggi è un ospedale pubblico. Vediamo come è nato, in sei date. Guardate le etichette sotto le date: sono le cose che servono a un’istituzione, quelle dell’animazione di prima. Il luogo, le persone, la regola, i mezzi."
          },
          {
            "fai": "Tocca le date della linea del tempo una alla volta, da sinistra, e leggi la scheda che si apre. Quando apri «prima del 1190» aggiungi la prima frase qui sotto; quando apri «1198–1201», la seconda."
          },
          {
            "di": "Guido era un laico, non un monaco e non un cavaliere: Montpellier è una città della Francia del sud."
          },
          {
            "di": "Attenzione: l’ospedale non è «fondato nel 1198». Il 1198 è l’anno in cui Innocenzo diventa papa e approva la regola di Guido; l’ospedale si costruisce fra il 1198 e il 1201 e nel 1204 la bolla Inter opera pietatis, «tra le opere di pietà», cioè di misericordia, conferma l’ordine."
          },
          {
            "chiedi": "Quale elemento sarebbe bastato, da solo, a far nascere Santo Spirito? (verifica: alzata di mano, poi tocca la più votata)",
            "r": "D, «Nessuno: servivano insieme». Il papa porta la motivazione, le opere di misericordia, e i mezzi; la comunità di Guido sa assistere ogni giorno; il luogo, un antico ospizio ormai in rovina sulla strada dei pellegrini, era già legato all’accoglienza. Se scelgono A, di’: «Senza qualcuno che sapesse assistere ogni giorno, la volontà del papa sarebbe rimasta un desiderio». Se scelgono B: «La comunità c’era già a Montpellier; a Roma servivano anche il papa, con i suoi mezzi, e un luogo». Se scelgono C: «L’ospizio era in rovina: senza il papa e la comunità sarebbe rimasto un rudere»."
          }
        ],
        "attenzione": "Non confondere Innocenzo III (papa dal 1198 al 1216) con Sisto IV (papa dal 1471 al 1484), che compare nella scena successiva.",
        "poi": "«Sappiamo chi lo ha deciso e come. Ma che cosa faceva davvero Santo Spirito? La comunità di Guido aveva una regola: che cosa ci dice, e che cosa non può dirci?»"
      },
      blocchi: [
        { tipo: 'tappe', titolo: 'Santo Spirito in sei date',
          voci: [
            { data: '727–729', breve: 'Il luogo', titolo: 'L’ospizio dei Sassoni', testo: 'Il re Ina fonda per i pellegrini anglosassoni la *schola Saxonum*: da qui i nomi «Sassia» e, dal germanico *burg*, «Borgo». Nel XII secolo l’ospizio è in rovina.' },
            { data: 'prima del 1190', breve: 'Le persone', titolo: 'La casa di Guido', testo: 'Guido, un laico di Montpellier, apre una casa-ospedale per i poveri, affidata allo Spirito Santo, con una comunità di fratelli e sorelle, laici e chierici.' },
            { data: '1198', breve: 'La regola', titolo: 'Un papa e una regola', testo: 'Lotario dei Conti di Segni, che durante gli studi in Francia aveva conosciuto l’opera di Guido, è eletto papa l’8 gennaio: è Innocenzo III. Ad aprile approva la regola della comunità e scrive che i fratelli sono «non tanto accoglitori dei bisognosi, quanto piuttosto servi».' },
            { data: '1198–1201', breve: 'I mezzi', titolo: 'Accanto a Santa Maria in Sassia', testo: 'Con i suoi mezzi il papa fa costruire un ospedale accanto alla chiesa di Santa Maria in Sassia; con una bolla del 10 dicembre 1201 affida la chiesa e l’ospedale a Guido e ai suoi compagni.' },
            { data: '1204', breve: 'La conferma', titolo: 'L’ordine confermato', testo: 'Il 19 giugno la bolla *Inter opera pietatis* conferma l’ordine ospedaliero del Santo Spirito e la sua regola, i suoi compiti (le opere di misericordia) e il suo governo sulla casa romana, che diventa casa madre.' },
            { data: '1208–1300', breve: 'Cento case', titolo: 'Un ordine che si diffonde', testo: 'Guido muore a Roma nel 1208. Alla fine del Duecento l’ordine conta un centinaio di case fra Italia, Francia e Germania, riconoscibili dal mantello con la croce a doppio braccio.' }
          ] },
        { tipo: 'verifica', q: 'Quale di questi elementi sarebbe bastato, da solo, a far nascere Santo Spirito?',
          opzioni: ['La volontà del papa', 'L’esperienza della comunità di Guido', 'Il vecchio ospizio della Sassia', 'Nessuno: servivano insieme'],
          ok: 3, why: 'Il papa porta la motivazione (le opere di misericordia) e i mezzi; la comunità di Guido sa assistere ogni giorno; il luogo, un antico ospizio ormai in rovina sulla strada dei pellegrini, era già legato all’accoglienza. Sono le cose dell’animazione: persone, mezzi, una regola, un luogo. La motivazione religiosa agisce dentro condizioni concrete: non è una causa unica.' }
      ] },

    /* 6 · NORMA, PRATICA, MEMORIA ------------------------------------- */
    { fase: 'Scoperta', momento: 'Fonte', minuti: 6, titolo: 'Prescritto, accaduto, *ricordato*',
      lead: 'Sappiamo chi ha deciso di costruire Santo Spirito. Ma che cosa faceva davvero? La sua regola lo prescrive: e una regola dice che cosa si deve fare, non dimostra che cosa è accaduto.',
      testo: 'La {regola} dell’ordine, confermata nel 1204, ci è arrivata nella forma del Duecento, copiata in un codice miniato della metà del Trecento: il *Liber Regulae*. Le Corsie Sistine, due grandi sale affrescate, furono costruite fra il 1471 e il 1478 per papa Sisto IV: quasi tre secoli dopo Innocenzo III.',
      regia: {
        "obiettivo": "Una regola prescrive e rende l’impegno verificabile, ma non dimostra che cosa è accaduto; un atto (la pergamena del 1245) attesta; un affresco del Quattrocento ricorda e celebra.",
        "passi": [
          {
            "di": "Sappiamo chi ha deciso di costruire Santo Spirito e come. Ora: che cosa faceva davvero, e come facciamo a saperlo? Nel 1198 il papa aveva approvato la regola della comunità di Montpellier; nel 1204 conferma la regola dell’ordine. Il testo che possiamo leggere è nella forma del Duecento, copiato a metà del Trecento in un codice di lusso, decorato con miniature: il Liber Regulae, «libro della regola», all’Archivio di Stato di Roma. Quanto fosse cambiato dal 1198, le fonti che usiamo non lo dicono. Prescrive di accogliere i malati e, per prima cosa, farli confessare e comunicare, poi metterli a letto; di cercare i poveri infermi per le strade e le piazze, di accogliere i poveri anche se sani, di nutrire i bambini abbandonati e di accogliere le donne incinte povere. Così l’accoglienza non dipende più dalla sensibilità di qualcuno: diventa un impegno della comunità, al quale si può chiedere conto. Ma una regola dice che cosa si deve fare; non dimostra che cosa è accaduto."
          },
          {
            "di": "Le Corsie Sistine sono le due grandi sale che si vedono oggi: le fece costruire fra il 1471 e il 1478 papa Sisto IV, un francescano, quasi tre secoli dopo Innocenzo III, e furono affrescate alla fine del Quattrocento con la storia delle origini dell’ospedale e con la vita dello stesso Sisto IV."
          },
          {
            "fai": "Smistamento «Che cosa ci dice questa fonte?»: leggi la fonte, fai votare per alzata di mano fra le tre colonne, tocca la più votata e leggi la spiegazione. Cinque fonti."
          },
          {
            "chiedi": "Perché la pergamena del 1245 non dimostra che tutti fossero curati bene?",
            "r": "Perché attesta un dono reale, cioè che qualcuno stimava l’opera, ma non dice nulla della cura ricevuta da ciascun ospite. Per saperlo servirebbero altre fonti, e per molti casi non le abbiamo: dirlo è onestà, non sfiducia."
          },
          {
            "fai": "Apri il riquadro «Per capire» (tocca il +) e leggilo: gli esposti e la ruota."
          }
        ],
        "attenzione": "Non dire «la ruota degli esposti del 1198» né che il sogno del papa è un fatto: la ruota che si vede oggi è del Seicento, il sogno è una leggenda dipinta nel Quattrocento. Se per la bolla del 1204 la classe sceglie «Che cosa è accaduto», lo schermo la segnerà sbagliata: accogli il ragionamento e di’: «Ragionamento giusto a metà: che la bolla sia stata emanata è un fatto; ciò che dice dei compiti è una norma».",
        "poi": "«I primi tre passi sono fatti: l’idea, il problema, la soluzione. Pausa: sfida a squadre su tutto quello che abbiamo visto.»"
      },
      blocchi: [
        { tipo: 'smista', titolo: 'Che cosa ci dice questa fonte?', categorie: ['Che cosa si doveva fare', 'Che cosa è accaduto', 'Come lo si ricordava'],
          voci: [
            { t: 'Il Liber Regulae chiede di cercare i poveri infermi per le strade e le piazze.', c: 0, why: 'È una norma (cap. XL): dice che cosa i fratelli dovevano fare e rende l’impegno verificabile. Se lo facessero davvero, lo dicono altre fonti.' },
            { t: '«Gli orfani infanti proietti siano nutriti e le povere donne incinte siano accolte e accudite con carità.»', c: 0, why: 'Anche questa è una prescrizione del *Liber Regulae* (cap. XLI): un impegno al quale si può chiedere conto, non la prova di come andò.' },
            { t: 'Una pergamena del 28 giugno 1245 registra un lascito «per l’utilità dell’ospedale e dei poveri».', c: 1, why: 'È un atto reale: qualcuno donò davvero. Mostra che l’opera era stimata; non prova che ogni ospite fosse ben curato.' },
            { t: 'La bolla del 19 giugno 1204 stabilisce i compiti della casa: le opere di misericordia.', c: 0, why: 'Che il papa abbia emanato la bolla è un fatto attestato; ciò che la bolla dice dei compiti è una norma: fissa che cosa la casa deve fare, come la regola.' },
            { t: 'Un affresco delle Corsie Sistine mostra il papa che sogna i neonati gettati nel Tevere.', c: 2, why: 'Gli affreschi, dipinti alla fine del Quattrocento, raccontano le origini quasi tre secoli dopo; il sogno è una leggenda posteriore, che i documenti del tempo non attestano.' }
          ],
          chiusura: 'Una regola prescrive, un atto attesta, un affresco ricorda: tre fonti, tre domande diverse.' },
        { tipo: 'aggancio', etichetta: 'Per capire', titolo: 'Gli esposti e la ruota',
          t: 'I «proietti» o {esposti} erano i neonati abbandonati: all’ospedale diventavano «figli della casa» e imparavano un mestiere. La ruota di legno in cui lasciarli senza essere visti, che si vede ancora sul fianco dell’edificio, è del Seicento.',
          fonte: 'F. Micciarelli, *Medicina nei secoli* 25/2 (2013); ASL Roma 1, Complesso monumentale di Santo Spirito in Sassia' }
      ] },

    /* 7 · PAUSA GIOCO: SFIDA A SQUADRE --------------------------------- */
    { fase: 'Attività', momento: 'Pausa gioco', minuti: 7, titolo: 'Sfida a *squadre*',
      lead: 'L’idea, il problema, la soluzione: tre passi su quattro. Due squadre, sei domande: conta anche il perché.',
      regia: {
        "obiettivo": "I fatti e le distinzioni delle scene 2–6 (Luca 14, ospedale medievale, date di Santo Spirito, Guido, norma, pratica e memoria) si fissano giocando, con la ragione accanto alla risposta.",
        "passi": [
          {
            "fai": "Dividi la classe in due metà (lato finestra e lato porta), ognuna con un portavoce. Premi «Si gioca»: si apre la Sfida a squadre. Per non perdere tempo lascia i nomi già scritti nei riquadri «Squadra 1» e «Squadra 2» (per esempio «Squadra Viola» e «Squadra Ciano») e premi «Si comincia». Le opzioni di ogni domanda sono segnate A, B, C, D."
          },
          {
            "di": "Le regole: sei domande, una per squadra a turno: la prima alla squadra 1, la seconda alla squadra 2, e così via. Avete 20 secondi: vi consultate a bassa voce e il portavoce dice la lettera e il perché. Risposta giusta: 100 punti, più 5 punti per ogni secondo che avanza. Se sbagliate, l’altra squadra ha 10 secondi per rubare la domanda: se indovina prende 50 punti. Dite sempre il perché: non vince chi urla."
          },
          {
            "fai": "Tocca la lettera detta dal portavoce. Se è giusta diventa verde. Se è sbagliata (o finisce il tempo) diventa rossa e compare «Rubata!» con il nome dell’altra squadra: tocca la lettera che dice il suo portavoce entro 10 secondi; se sbaglia anche lei o il tempo finisce, il gioco mostra in verde la risposta giusta e nessuno prende punti. Sulla LIM il gioco mostra solo la risposta giusta in verde, non la spiegazione: leggi tu la ragione dalle soluzioni qui sotto, poi premi «Prossima domanda». Dopo la sesta premi «Vedi il risultato», leggi chi vince e premi «← Torna alla lezione» nella barra in basso."
          },
          {
            "chiedi": "Quale domanda vi ha ingannato di più, e perché?",
            "r": "Di solito le date (Innocenzo III o Sisto IV) o la pergamena del 1245. Rileggi la ragione: Innocenzo III fa costruire l’ospedale fra il 1198 e il 1201, Sisto IV lo rifà fra il 1471 e il 1478; la pergamena attesta un dono, non la qualità della cura."
          }
        ],
        "poi": "«Ultimo passo: che cosa ne resta? Santo Spirito accoglieva secondo il bisogno, non secondo ciò che si può restituire. Ora tocca a voi decidere, in un caso di oggi.»"
      },
      blocchi: [
        { tipo: 'mascotte', t: 'Un papa, un laico, una regola: vediamo chi tiene la rotta fra le date.' },
        { tipo: 'gioco', id: 'sfida', titolo: 'Sfida a squadre', testo: 'Rispondete a turno; se sbagliate, l’altra squadra può rubare.', pulsante: 'Si gioca' }
      ] },

    /* 8 · IL CASO DELLA CASA DI ACCOGLIENZA ---------------------------- */
    { fase: 'Attività', momento: 'Laboratorio', minuti: 6, titolo: 'Bisogni diversi, uguale *dignità*',
      lead: 'Ultimo passo: che cosa ne resta? Santo Spirito nutriva i «proietti», neonati che non potevano dare nulla: decideva il bisogno, non ciò che si può restituire. Vale ancora oggi? Un caso immaginario.',
      testo: 'La {dignità} non dipende dalla produttività, cioè da quanto una persona riesce a produrre, né da ciò che può restituire.',
      regia: {
        "obiettivo": "Il criterio di Santo Spirito, messo alla prova oggi. Uguale dignità, risposte differenti, motivate e verificabili: le ore si distribuiscono secondo il bisogno, non secondo ciò che un ospite può restituire.",
        "passi": [
          {
            "di": "Ultimo passo: che cosa ne resta oggi. Santo Spirito nutriva i proietti, neonati che non potevano dare nulla: il criterio era il bisogno, non ciò che si può restituire. Proviamo quel criterio in un caso di oggi. È un caso immaginario, non una ricostruzione di Santo Spirito: una piccola casa di accoglienza di oggi. Tutti hanno già pasti, letto e assistenza di base: non si decide chi escludere, si distribuiscono alcune ore di lavoro in più."
          },
          {
            "fai": "Leggi il caso nel riquadro «La casa di accoglienza». A ogni bivio dai alla classe quindici secondi per parlarne con il vicino, poi fai votare per alzata di mano e tocca la scelta più votata. Se la scelta finisce male, leggi l’esito, premi «Torna indietro» e prendete l’altra strada. Arrivate fino all’esito «Uguale dignità, risposte differenti». Fai ciascuna delle tre domande qui sotto subito dopo il voto del bivio a cui si riferisce, qualunque cosa abbia scelto la classe."
          },
          {
            "chiedi": "Primo bivio: perché «lo stesso intervento per tutti» non è giusto, anche se sembra uguale?",
            "r": "Perché i bisogni sono diversi: lo stesso intervento è inutile per chi si orienta da solo e insufficiente per il bambino. Uguale dignità non vuol dire risposte identiche: vuol dire risposte differenti e motivate."
          },
          {
            "chiedi": "Secondo bivio: la donazione aiuterebbe tutta la casa; perché non dare più ore a chi la promette?",
            "r": "Perché così le ore seguirebbero ciò che una persona può restituire, e il bambino, che non può dare nulla, perderebbe tempo di cura. La donazione è benvenuta, ma va alle risorse di tutti: non misura il valore di chi la offre."
          },
          {
            "chiedi": "Terzo bivio: perché serve un registro dei turni, se tutti sono di buona volontà?",
            "r": "Perché senza un controllo nessuno sa se il servizio è stato fatto davvero: è la stessa differenza fra ciò che si deve fare e ciò che accade che abbiamo visto con la regola di Santo Spirito."
          },
          {
            "fai": "Tocca la parola DIGNITÀ sotto il caso."
          },
          {
            "di": "Dignità viene dal latino dignitas, da dignus, «degno»: è il valore della persona in quanto persona. Non dipende dalla produttività, cioè da quanto si produce, né da ciò che si può restituire. Un adulto che si ammala non vale di meno; un bambino non deve promettere che sarà utile per meritare attenzione oggi."
          }
        ],
        "attenzione": "Non applicare «chi può ricambiare» e «chi non può» agli studenti della classe: il caso è immaginario e riguarda gli ospiti di una casa di accoglienza.",
        "poi": "«Ma basta la buona volontà per curare bene?»"
      },
      blocchi: [
        { tipo: 'storia', titolo: 'La casa di accoglienza', etichetta: 'Decidete voi', inizio: 'a',
          nodi: {
            a: { t: 'Una piccola casa di accoglienza dà già a tutti pasti, letto e assistenza di base. Ora ha alcune ore di lavoro in più. Tre ospiti: uno si muove da solo ma deve orientarsi nei servizi; uno ha bisogno di essere accompagnato; un bambino ha bisogno di un adulto sempre presente. Come distribuite le ore?',
              scelte: [ { t: 'In parti uguali: lo stesso intervento per tutti', vai: 'b' }, { t: 'Secondo il bisogno di ciascuno', vai: 'c' } ] },
            b: { t: 'Ognuno riceve lo stesso intervento. Chi si orienta da solo riceve un aiuto che quasi non gli serve; il bambino resta per ore senza un adulto. Un servizio identico può essere inutile per qualcuno e insufficiente per un altro.',
              fine: true, tono: 'ko', esito: 'Uguale, ma non giusto' },
            c: { t: 'Orientamento ai servizi per il primo, un accompagnatore con orari concordati per il secondo, un adulto presente a turni per il bambino. Poi un ospite dice: «Se avrò più attenzioni, lascerò una donazione alla casa».',
              scelte: [ { t: 'Gli diamo più ore: la donazione aiuterà tutti', vai: 'd' }, { t: 'Lo ringraziamo, ma le ore restano secondo il bisogno', vai: 'e' } ] },
            d: { t: 'Ora le ore seguono ciò che un ospite può restituire. Il bambino, che non può dare nulla, perde tempo di cura. Una donazione può sostenere le risorse di tutti, ma non misura il valore di chi la offre.',
              fine: true, tono: 'ko', esito: 'Premiare chi può ricambiare' },
            e: { t: 'Ogni ora ha un motivo: il bisogno. La donazione, se arriva, va alle risorse di tutta la casa. Resta un passo: come controllate che i servizi funzionino davvero?',
              scelte: [ { t: 'Ci fidiamo della buona volontà di chi lavora', vai: 'f' }, { t: 'Un registro dei turni e qualche domanda agli ospiti', vai: 'g' } ] },
            f: { t: 'Una buona intenzione non è ancora una cura: senza un controllo non sapete se il bambino ha avuto davvero un adulto accanto.',
              fine: true, tono: 'neutro', esito: 'Buone intenzioni, nessuna verifica' },
            g: { t: 'Il servizio si può verificare: chi organizza ascolta gli ospiti e rende conto delle scelte.',
              fine: true, tono: 'ok', esito: 'Uguale dignità, risposte differenti' }
          },
          chiusura: 'Uguale valore delle persone, risposte differenti, motivate e verificabili. La regola di Santo Spirito lo diceva a modo suo: nutrire i «proietti», neonati che non potevano dare nulla.' },
        { tipo: 'parola', parola: 'dignità', radice: 'dignus', origine: 'dal latino *dignitas*, da *dignus*, «degno»',
          significato: 'Il valore della persona in quanto persona: non si guadagna producendo e non si perde quando non si può restituire.' }
      ] },

    /* 9 · DEUS CARITAS EST 31 ----------------------------------------- */
    { fase: 'Attività', momento: 'Fonte', minuti: 4, titolo: 'Servire *bene*',
      lead: 'Il bisogno decide chi aiutare. Ma basta la buona volontà per aiutare bene? Voler bene a una persona chiede anche di servirla bene.',
      testo: 'Nel 2005, nell’enciclica *Deus caritas est*, Benedetto XVI fissa i criteri con cui la Chiesa di oggi giudica le sue opere di carità. Tre dubbi seri, con le sue parole.',
      regia: {
        "obiettivo": "Che cosa resta, oggi, nei criteri della Chiesa: la carità chiede competenza e attenzione del cuore, organizzazione e gratuità senza proselitismo (Deus caritas est 31).",
        "passi": [
          {
            "di": "Il bisogno decide chi aiutare; ma la buona volontà basta per aiutare bene? Nel 2005 papa Benedetto XVI, Joseph Ratzinger, ha scritto la sua prima enciclica, cioè una lettera solenne a tutta la Chiesa: Deus caritas est, «Dio è amore». Al numero 31 fissa i criteri dell’attività caritativa della Chiesa. Tre dubbi seri: apriamoli."
          },
          {
            "fai": "Chiedi alla classe quale dubbio aprire per primo; prima di aprirlo lascia dieci secondi perché qualcuno provi a rispondere, poi tocca la domanda e leggi la risposta e la fonte. Si apre un dubbio alla volta: aprili tutti e tre."
          },
          {
            "chiedi": "Allora, per la Chiesa, che cosa non può mai diventare la carità?",
            "r": "Un mezzo per altri scopi, come imporre la fede: «Chi esercita la carità in nome della Chiesa non cercherà mai di imporre agli altri la fede della Chiesa» (Deus caritas est 31c). Se qualcuno obietta che nel Medioevo i malati dovevano confessarsi, rispondi: «La regola lo chiedeva, perché univa cura del corpo e dell’anima; che cosa accadesse a chi rifiutava, le fonti che abbiamo non lo dicono»."
          }
        ],
        "poi": "«I quattro passi sono fatti. Torniamo al Lungotevere e alla domanda dell’inizio.»"
      },
      blocchi: [
        { tipo: 'dubbi', titolo: 'Tre dubbi seri',
          voci: [
            { q: 'Basta la buona volontà?', r: 'No. A chi serve i sofferenti «occorre innanzitutto la competenza professionale», che però «da sola non basta»: le persone «hanno bisogno di umanità», dell’«attenzione del cuore».', fonte: 'Benedetto XVI, *Deus caritas est*, n. 31a' },
            { q: 'Se chi lavora è pagato, la cura è ancora gratuita?', r: 'Sì, per chi la riceve: gratuito vuol dire che a chi è accolto non si chiede nulla, non che nessuno lavori. E perché la cura duri, quando la carità è un’iniziativa della comunità, alla spontaneità del singolo devono aggiungersi «la programmazione, la previdenza, la collaborazione con altre istituzioni simili».', fonte: '*Deus caritas est*, n. 31b (la frase fra virgolette)' },
            { q: 'La Chiesa curava per convertire?', r: 'Nell’ospedale medievale cura del corpo e dell’anima stavano insieme: la regola chiedeva che il malato, appena accolto, per prima cosa si confessasse e si comunicasse. Che cosa accadesse a chi rifiutava, le fonti lette non lo dicono; dicono che i fratelli dovevano accogliere i malati e andarli a cercare per le strade. Oggi la Chiesa fissa un criterio esplicito: «L’amore è gratuito; non viene esercitato per raggiungere altri scopi».', fonte: '*Liber Regulae*, capp. XIII e XL (Micciarelli 2013); *Deus caritas est*, n. 31c' }
          ] }
      ] },

    /* 10 · PROVA E RITORNO ALLA DOMANDA -------------------------------- */
    { fase: 'Chiusura', momento: 'Prova', minuti: 4, titolo: 'Allora, chi *cura*?',
      lead: 'Torniamo al Lungotevere e alla domanda dell’inizio: chi cura chi non può ricambiare? Tre casi nuovi, poi la vostra risposta.',
      regia: {
        "obiettivo": "Prova breve su gratuità, norma e pratica, dignità; poi la risposta della classe alla domanda dell’ora: una comunità che riconosce la dignità di chi non può restituire e organizza l’aiuto perché duri.",
        "passi": [
          {
            "fai": "Prova breve: leggi la prima domanda, fai votare per alzata di mano, tocca la risposta più votata, leggi la spiegazione e premi «Prossima domanda». Tre domande; alla fine compaiono le stelle. Nessun voto: serve a vedere che cosa è rimasto."
          },
          {
            "chiedi": "Allora: chi cura chi non può ricambiare? Una frase con «gratuità» e «organizzazione».",
            "r": "Una comunità che considera il valore di una persona indipendente da ciò che può restituire e organizza l’aiuto perché duri, con persone, risorse, una regola e un luogo. Frase modello: «Chi non può ricambiare è curato da una comunità che offre la cura con gratuità, senza chiedere nulla in cambio, e con un’organizzazione che la fa durare». A Santo Spirito, la risposta aveva nomi precisi: un papa che fonda, una comunità che serve, una regola che dice chi accogliere, dei beni che la fanno durare. Se la frase dice solo «la Chiesa» o «il papa», chiedi che cosa serviva oltre a lui (la comunità, la regola, i beni). Se manca la gratuità, chiedi: «E chi è curato, che cosa deve in cambio?»."
          },
          {
            "fai": "Raccogli due proposte e scrivi nel riquadro «Chi non può ricambiare è curato da…» una sola frase, mentre la dettano. Non viene salvata."
          },
          {
            "di": "Per casa: sul registro elettronico trovate il fascicolo «Chi cura chi non può ricambiare?». Rileggetelo e rispondete alle quattro domande della sezione «Per lo studio», in fondo."
          },
          {
            "fai": "Se non puoi caricare il fascicolo sul registro (per esempio se sei un supplente), di’ che lo troveranno lì, caricato dal docente della classe, e detta il compito: rileggere e rispondere alle quattro domande di «Per lo studio»."
          }
        ]
      },
      blocchi: [
        { tipo: 'quiz', etichetta: 'Prova breve', perfetto: 'Tre su tre: gratuità, regola e dignità sono al loro posto.',
          domande: [
            { q: 'Un ospedale accoglie gratis chi non può pagare. Che cosa è vero?', opzioni: ['Non costa niente a nessuno', 'È gratuito per chi è accolto; i costi li sostengono altri', 'Chi è accolto dovrà ricambiare più tardi'], ok: 1, why: 'Gratuito per chi riceve, non senza costi: per questo servono risorse, persone e una regola. E chi è accolto non contrae un debito («non hanno da ricambiarti», Lc 14,14).' },
            { q: 'Il *Liber Regulae* prescrive di nutrire gli esposti. Che cosa ci dice?', opzioni: ['Che tutti i bambini furono curati bene', 'Che una regola non conta nulla', 'Che cosa i fratelli dovevano fare; per sapere che cosa accadde servono altre fonti'], ok: 2, why: 'Una regola prescrive e rende l’impegno verificabile; la pratica si ricostruisce con altre fonti, come le pergamene dei lasciti.' },
            { q: 'Una persona non può più lavorare. La sua dignità…', opzioni: ['resta la stessa: non dipende da ciò che produce', 'diminuisce, perché non produce', 'dipende da ciò che potrà restituire'], ok: 0, why: 'La dignità è il valore della persona in quanto persona; per servirla bene servono però competenza e organizzazione (*Deus caritas est* 31).' }
          ] },
        { tipo: 'sintesi', q: 'Chi cura chi non può ricambiare? Una frase con «gratuità» e «organizzazione».', segnaposto: 'Chi non può ricambiare è curato da…', max: 240 }
      ] }
  ],

  studio: {
    "sezioni": [
      {
        "titolo": "La domanda e il luogo",
        "testo": "Nell’unità «I luoghi che cambiano la vita», dopo il monastero e l’università, il terzo luogo è un ospedale: Santo Spirito in Sassia, a Roma, fra il Vaticano e il Tevere. Lo fece costruire papa Innocenzo III fra il 1198 e il 1201, ed è ancora oggi un ospedale pubblico. All’inizio accoglieva poveri, malati e neonati abbandonati: persone che non potevano restituire nulla.\n\nUn bambino appena nato dipende interamente dagli altri. Una persona malata può perdere, per un periodo o per sempre, la capacità di lavorare. Se l’aiuto fosse riservato a chi può restituire qualcosa, proprio alcune delle persone che ne hanno più bisogno resterebbero escluse. Da qui la domanda: chi cura chi non può ricambiare, e perché qualcuno costruisce un luogo per farlo?\n\nIl percorso ha quattro passi. Un’**idea**: perché aiutare chi non può restituire (un pranzo nel Vangelo di Luca). Un **problema**: gratuito non vuol dire senza costi, e un aiuto che deve durare ha bisogno di un’organizzazione. Una **soluzione**: un *hospitale* a Roma, con un luogo, delle persone, una regola e dei mezzi, e il modo di sapere che cosa vi accadeva. Infine **che cosa ne resta**: la dignità di chi non può restituire e il modo di servirla bene."
      },
      {
        "titolo": "Un posto a tavola senza debiti",
        "testo": "Il primo passo è l’idea. La ragione cristiana per accogliere chi non può restituire è più antica di ogni ospedale.\n\nNel Vangelo di Luca, Gesù è a pranzo, di sabato, in casa di uno dei capi dei farisei; dopo aver parlato agli invitati della scelta dei posti, si rivolge a chi lo ha invitato.\n\n«Quando offri un pranzo o una cena, non invitare i tuoi amici né i tuoi fratelli né i tuoi parenti né i ricchi vicini, perché a loro volta non ti invitino anch’essi e tu abbia il contraccambio. Al contrario, quando offri un banchetto, invita poveri, storpi, zoppi, ciechi; e sarai beato perché non hanno da ricambiarti. Riceverai infatti la tua ricompensa alla risurrezione dei giusti.» (Vangelo secondo Luca 14,12–14, traduzione CEI 2008)\n\nUn banchetto era anche uno scambio, si invita chi potrà invitare a sua volta: Gesù rovescia il criterio. Le quattro categorie che nomina, poveri, storpi, zoppi, ciechi, tornano poco dopo nella parabola del grande banchetto, quando il padrone manda il servo a cercarle per le piazze al posto degli invitati che hanno rifiutato (Lc 14,21). Il passo si chiude con la promessa di una ricompensa «alla risurrezione dei giusti»: il bene compiuto è affidato a Dio e al suo giudizio. Chi viene accolto, però, non deve saldare alcun debito: Gesù sottrae il rapporto con il bisognoso alla logica del favore da restituire. Il testo parla di una tavola, non di un ospedale; offre un criterio che può orientare anche altre forme di aiuto.\n\nChiamiamo **gratuità** questa disponibilità ad aiutare senza pretendere un vantaggio dal destinatario: la parola viene dal latino *gratuitus*, dalla stessa radice di *gratia*, e indica ciò che è concesso senza che chi riceve lo debba meritare. Nella fede cristiana la gratuità appartiene alla **carità** (dal latino *caritas*, «affetto, amore», da *carus*, «caro»): l’amore per Dio che prende forma nell’amore del prossimo, con il tempo, l’ascolto e il servizio, non solo con il denaro. Il Vangelo di Matteo lo dice con l’elenco delle «opere di misericordia»: sfamare, dissetare, accogliere lo straniero, vestire, visitare il malato e il carcerato, perché «tutto quello che avete fatto a uno solo di questi miei fratelli più piccoli, l’avete fatto a me» (Mt 25,35–40). La ragione religiosa della cura riguarda anzitutto chi la offre; non obbliga chi la riceve a ricambiare con denaro, obbedienza o adesione personale.\n\nIl secondo passo è il problema: la gratuità non elimina i costi. Un pasto richiede alimenti, una stanza va mantenuta, chi assiste deve avere tempo e mezzi: se una comunità vuole accogliere anche chi non può pagare, deve trovare altre risorse. Qui nasce il problema dell’organizzazione: il gesto di oggi deve poter essere ripetuto domani, senza dipendere soltanto dall’entusiasmo di una persona."
      },
      {
        "titolo": "L’ospedale comincia dall’ospitalità",
        "testo": "Il terzo passo è la soluzione: un’istituzione che accoglie chi non può ricambiare. Nel Medioevo ha un nome, ed è quello del luogo da cui siamo partiti. La parola **ospedale** conserva una traccia di questa storia. Deriva dal latino *hospitale*, da *hospitalis*, «ospitale», e all’origine indicava un alloggio per i forestieri; *hospes*, da cui viene anche «ospite», era insieme chi accoglieva e chi era accolto. Nel Medioevo un *hospitale*, chiamato anche *xenodochium*, «casa dello straniero», era prima di tutto un luogo di ospitalità: vi si accoglievano anche i malati, ma perché la malattia era una delle forme del bisogno, non perché fosse un luogo di terapia.\n\nLa cura ha una storia più ampia di una sola tradizione religiosa: l’antichità conobbe luoghi di terapia e infermerie militari, e nel mondo islamico, fin dall’VIII secolo, sorsero istituzioni per la cura delle malattie, con medici e scuole. Nell’Occidente cristiano l’ospitalità verso il bisognoso era già un dovere scritto: la Regola di san Benedetto, nel VI secolo, chiede che tutti gli ospiti siano accolti «come Cristo in persona» e che ci si preoccupi «soprattutto» dei poveri e dei pellegrini (Regola 53,1.15). Dall’XI secolo, con la ripresa dei commerci e dei pellegrinaggi verso Roma, Gerusalemme e Santiago, le strade si riempirono di viandanti che avevano bisogno di un tetto, di cibo e, se si ammalavano, di assistenza: per questo gli ospedali medievali sorgono lungo le vie e alle porte delle città. Pellegrinaggi, motivazione religiosa e mezzi disponibili si incontrano senza coincidere: la carità ha contribuito alla storia degli ospedali con un’azione concreta, senza essere da sola tutta la storia della medicina.\n\nUn’**istituzione** è un’organizzazione che rende durevole un compito: stabilisce chi se ne occupa, con quali risorse e sotto quale responsabilità. L’edificio ne è una parte, ma non basta: una sala vuota ripara dalla pioggia, ma per accogliere stabilmente persone fragili servono lavoro, continuità e decisioni. L’ospitalità diventa così una responsabilità condivisa."
      },
      {
        "titolo": "Santo Spirito: un impegno prende forma",
        "testo": "Torniamo al luogo da cui siamo partiti: chi decise di costruirlo, e come? Nella sua storia arrivano, una dopo l’altra, le cose che servono a un’istituzione: un luogo, delle persone, una regola, dei mezzi.\n\nA Roma, fra il Vaticano e il Tevere, esisteva dall’VIII secolo l’ospizio dei pellegrini anglosassoni, la *schola Saxonum* fondata dal re Ina intorno al 727–729: da lì vengono il nome «Sassia» e, dal germanico *burg*, il nome «Borgo». Nel XII secolo quell’ospizio era in rovina.\n\nIl papa che ne cambiò la storia fu **Innocenzo III**, al secolo Lotario dei Conti di Segni, eletto nel gennaio 1198 a meno di quarant’anni, che durante gli studi in Francia aveva conosciuto l’opera di **Guido di Montpellier**: un laico che, prima del 1190, aveva aperto nella sua città una casa-ospedale per i poveri, affidata allo Spirito Santo, con una comunità di fratelli e sorelle, laici e chierici.\n\nNell’aprile 1198 Innocenzo III approvò la regola di quella comunità e scrisse che i suoi fratelli andavano chiamati «non tanto accoglitori dei bisognosi, quanto piuttosto servi». Nei primi anni di pontificato fece costruire un ospedale accanto alla chiesa di Santa Maria in Sassia; con una bolla del 10 dicembre 1201 lo affidò a Guido e ai suoi compagni e il 19 giugno 1204, con la bolla *Inter opera pietatis*, confermò l’ordine ospedaliero del Santo Spirito e la sua regola, i suoi compiti e il suo governo sulla casa romana, divenuta casa madre dell’ordine. Guido morì a Roma nel 1208. Alla fine del Duecento l’ordine contava un centinaio di case fra Italia, Francia e Germania, riconoscibili dal mantello con la croce a doppio braccio.\n\nLa motivazione di Innocenzo III era quella delle opere di misericordia, che la bolla del 1204 elenca come compiti della casa. Una tradizione posteriore, dipinta negli affreschi del Quattrocento come storia delle origini, aggiunge un sogno del papa sui neonati gettati nel Tevere: i documenti del tempo non la attestano.\n\nLa regola dell’ordine, confermata nel 1204, ci è arrivata nella forma del Duecento, in un codice miniato della metà del Trecento, il *Liber Regulae*, conservato all’Archivio di Stato di Roma. Vi si legge che i malati, giunti o portati alla casa, vanno accolti, per prima cosa confessati e comunicati, e poi messi a letto; che i fratelli devono cercare i poveri infermi per le strade e le piazze; che i poveri vanno vestiti e accolti anche se sani; che «gli orfani infanti proietti siano nutriti e le povere donne incinte siano accolte e accudite con carità». I «proietti» o **esposti**, i bambini abbandonati, diventavano «figli della casa» e imparavano un mestiere. La ruota di legno in cui lasciarli senza essere visti, ancora visibile sul fianco dell’edificio, è però del Seicento.\n\nUna regola introduce un passaggio decisivo: l’accoglienza non resta affidata alla sensibilità di qualcuno, ma diventa un impegno della comunità, al quale si può chiedere conto. Una regola però dice che cosa si deve fare, non dimostra che cosa è accaduto: per saperlo servono altre fonti. Le pergamene dei lasciti, dal 1245, mostrano che privati cittadini donavano terre e denaro all’ospedale e ai suoi poveri: segno che l’opera era stimata, non prova che ogni ospite fosse ben curato.\n\nL’edificio di oggi conserva trasformazioni successive. Le **Corsie Sistine**, due lunghe sale affrescate, furono costruite fra il 1471 e il 1478 per volontà di **Sisto IV**, il papa francescano Francesco della Rovere, che rifece l’ospedale; gli affreschi raccontano le origini dell’ospedale, la ricostruzione e la vita dello stesso Sisto IV, con iscrizioni latine dell’umanista Bartolomeo Platina. Non sono dunque la sala di Innocenzo III: un’immagine dipinta quasi tre secoli dopo un evento testimonia come quell’evento veniva ricordato e quale messaggio il committente voleva trasmettere.\n\nNella vicenda di Santo Spirito riconosciamo quindi tre elementi collegati, nessuno dei quali basta da solo: una motivazione cristiana, una comunità incaricata dell’assistenza, un luogo e una struttura destinati a durare. La fede spiega una ragione dell’impegno; l’organizzazione gli dà una forma concreta. Confonderli porta a due errori opposti: ridurre tutto ad amministrazione, o credere che una buona intenzione sia già una cura."
      },
      {
        "titolo": "Bisogni diversi, uguale dignità",
        "testo": "L’ultimo passo è chiedersi che cosa ne resta. Santo Spirito accoglieva secondo il bisogno, non secondo ciò che si può restituire: il criterio regge ancora? Consideriamo un **caso immaginario**, non una ricostruzione di Santo Spirito. Una piccola casa di accoglienza dispone già di pasti, posti letto e assistenza di base per tutti. Deve ora distribuire alcune ore aggiuntive di lavoro. Un ospite riesce a muoversi autonomamente ma ha bisogno di orientarsi nei servizi; un altro necessita di accompagnamento; un bambino richiede la presenza continuativa di un adulto. È sufficiente assegnare a ciascuno lo stesso intervento?\n\nUn servizio identico potrebbe essere inutile per qualcuno e insufficiente per un altro. Il criterio da discutere è il bisogno concreto: quale aiuto manca, chi sa offrirlo e come garantire che continui? Non si scelgono vite da salvare né terapie: si riconosce che l’uguale valore delle persone può richiedere risposte differenti, motivate e verificabili.\n\nLa **dignità** (dal latino *dignitas*, da *dignus*, «degno») è il valore della persona, che non dipende dalla sua produttività né dalla capacità di restituire quanto riceve. La **produttività** indica invece quanto si riesce a produrre in una certa attività. Le due cose non coincidono: un adulto che perde il lavoro o si ammala non diventa, per questo, una persona di minor valore; un bambino non deve promettere che da grande sarà utile per meritare attenzione oggi. La regola di Santo Spirito lo diceva a modo suo: nutrire i proietti, neonati che non potevano dare nulla.\n\nRicevere assistenza non cancella la propria voce: chi organizza un servizio ascolta esigenze e preferenze e riconosce il bisogno senza ridurre una persona a quel bisogno. Le risorse restano limitate: riconoscere la dignità non significa promettere tutto a tutti, ma rendere ragione delle scelte senza misurare il valore umano con la ricchezza o il vantaggio che qualcuno potrebbe offrire. Nel caso immaginario, la proposta migliore sarà quella che spiega il rapporto fra ciascun bisogno e il servizio assegnato, anziché premiare chi potrebbe ricambiare."
      },
      {
        "titolo": "La cura va anche verificata",
        "testo": "La storia di un’istituzione religiosa non si valuta soltanto dalle sue intenzioni. La fondazione di un ospedale è un fatto importante, ma non dimostra da sola che ogni assistito ricevesse ciò di cui aveva bisogno: per giudicarlo occorrerebbe conoscere condizioni reali, risorse e funzionamento del servizio. Ammettere questo limite evita l’idealizzazione del passato e le accuse che le fonti non sostengono.\n\nLa Chiesa di oggi lo dice con chiarezza. Nell’enciclica *Deus caritas est* (2005) Benedetto XVI scrive che a chi serve i sofferenti «occorre innanzitutto la competenza professionale», che però «da sola non basta», perché gli esseri umani «hanno bisogno di umanità», dell’«attenzione del cuore»; e che, quando la carità è un’iniziativa della comunità, alla spontaneità del singolo devono unirsi «la programmazione, la previdenza, la collaborazione con altre istituzioni simili».\n\n«L’amore è gratuito; non viene esercitato per raggiungere altri scopi. [...] Chi esercita la carità in nome della Chiesa non cercherà mai di imporre agli altri la fede della Chiesa.» (Benedetto XVI, *Deus caritas est*, 25 dicembre 2005, n. 31c)\n\nIl documento fissa un criterio dell’agire cristiano, utile anche per rileggere la storia; non descrive la pratica di ogni ospedale medievale. Ne deriva una conseguenza esigente: voler bene a una persona richiede anche imparare a servirla bene, con turni, preparazione e ascolto. Il lavoro retribuito non annulla la gratuità verso il beneficiario; la generosità, da sola, non sostituisce la competenza."
      },
      {
        "titolo": "In sintesi",
        "testo": "Chi cura chi non può ricambiare? A Santo Spirito, una comunità che traduce la carità cristiana in un compito stabile: un papa che fonda, un ordine che serve, una regola che dice chi accogliere, con risultati da verificare. La persona viene prima del vantaggio che può offrire; per questo la cura ha bisogno di mezzi, competenze e continuità, e non diventa mai un debito di chi la riceve."
      },
      {
        "titolo": "Per lo studio",
        "testo": "1. In Luca 14,12–14 quale criterio dell’invito cambia? Distingui la ricompensa promessa da Dio dal contraccambio richiesto all’ospite.\n\n2. Perché la parola «ospedale» non va applicata al Medioevo immaginando una struttura identica a quella odierna? Distingui le origini di Santo Spirito (1198–1204) dalle Corsie Sistine.\n\n3. Nel caso della casa di accoglienza, assegna due servizi a due bisogni differenti e motiva le scelte. Perché la possibilità di ricambiare non misura la dignità degli ospiti?\n\n4. Il *Liber Regulae* prescrive di cercare i poveri per le strade e di nutrire gli esposti: che cosa dimostra e che cosa resta da verificare? Perché gratuità, risorse e competenza devono stare insieme?"
      }
    ],
    "fonti": [
      "Bibbia, traduzione CEI 2008: Luca 14,1–24 e Matteo 25,31–46 (bibbiaedu.it).",
      "Treccani, Vocabolario: «Ospedale», «Ospite», «Carità», «Gratuito», «Dignità» (etimologie).",
      "B. D’Agosta e I. Moretti, «Ospedale», in *Enciclopedia dell’Arte Medievale*, Treccani, 1997; San Benedetto, *Regola*, cap. 53, traduzione dei Benedettini di Noci, Edizioni La Scala.",
      "Francesco, lettera apostolica *Fide incensus*, 18 maggio 2024, vatican.va (Guido di Montpellier; bolle del 1198, 1201 e 1204).",
      "F. Micciarelli, «L’ospedale di Santo Spirito in Saxia di Roma nel Duecento», *Medicina nei secoli* 25/2 (2013), pp. 565–580 (*Liber Regulae*, pergamene).",
      "W. Maleczek, «Innocenzo III», e G. Lombardi, «Sisto IV», in *Enciclopedia dei Papi*, Treccani, 2000.",
      "ASL Roma 1, Complesso Monumentale Santo Spirito in Sassia e comunicato sul restauro delle Corsie Sistine (affreschi, ruota seicentesca).",
      "Benedetto XVI, *Deus caritas est*, 25 dicembre 2005, n. 31 a–c; *Catechismo della Chiesa Cattolica*, nn. 1822 e 2447.",
      "Il caso della casa di accoglienza è immaginario."
    ]
  },

  giochi: {
    sfida: [
      { q: 'Nel Vangelo di Luca (14,13), chi dice Gesù di invitare?', a: ['Amici, fratelli, parenti e ricchi vicini', 'Poveri, storpi, zoppi, ciechi', 'I capi dei farisei', 'Chi può pagare il pranzo'], ok: 1, why: '«Perché non hanno da ricambiarti» (Lc 14,14): chi è accolto non contrae un debito; la ricompensa viene da Dio.' },
      { q: 'Nel Medioevo un hospitale era soprattutto…', a: ['Un luogo di terapie con medici specialisti', 'Una scuola di medicina', 'Una casa di accoglienza per forestieri, poveri e malati', 'Una prigione per i debitori'], ok: 2, why: 'La parola viene da hospes, l’ospite: la malattia vi entrava come una forma del bisogno.' },
      { q: 'Chi fece costruire l’ospedale di Santo Spirito, e quando?', a: ['Innocenzo III, fra il 1198 e il 1201', 'Sisto IV, fra il 1471 e il 1478', 'Innocenzo III, nel 1300', 'Guido di Montpellier, nel 1208'], ok: 0, why: 'Lo affidò a Guido il 10 dicembre 1201 e confermò l’ordine nel 1204; Sisto IV, quasi tre secoli dopo, costruì le Corsie Sistine.' },
      { q: 'Chi era Guido di Montpellier?', a: ['Un cavaliere crociato', 'Un monaco benedettino', 'Il papa che fondò l’ospedale', 'Un laico che aveva aperto a Montpellier una casa-ospedale per i poveri'], ok: 3, why: 'Prima del 1190, con una comunità di fratelli e sorelle, laici e chierici; morì a Roma nel 1208.' },
      { q: 'Una pergamena del 1245 registra un lascito all’ospedale. Che cosa dimostra?', a: ['Che ogni ospite era curato bene', 'Che l’opera era stimata: qualcuno donò davvero', 'Che il papa pagava tutto', 'Che la regola era rispettata alla lettera'], ok: 1, why: 'È una fonte della pratica: attesta un dono reale, non la qualità della cura di ciascuno.' },
      { q: 'Il sogno del papa sui neonati gettati nel Tevere è…', a: ['Un fatto raccontato dalla bolla del 1201', 'Un capitolo del Liber Regulae', 'Una leggenda posteriore, dipinta negli affreschi del Quattrocento', 'Una scena del Vangelo di Luca'], ok: 2, why: 'I documenti del tempo non la attestano: gli affreschi dicono come le origini venivano ricordate.' }
    ],
    vf: [
      { s: 'Gratuito vuol dire senza costi.', v: false, why: 'Gratuito per chi riceve: i costi li sostengono altri, con donazioni, terre e lasciti.' },
      { s: 'Nel Medioevo «ospedale» indicava prima di tutto una casa di accoglienza.', v: true, why: 'Da hospitale, «alloggio per forestieri»: vi si accoglievano forestieri, poveri e malati.' },
      { s: 'L’ospedale di Santo Spirito fu fondato da Sisto IV.', v: false, why: 'Lo fece costruire Innocenzo III fra il 1198 e il 1201; Sisto IV lo rifece fra il 1471 e il 1478.' },
      { s: 'La regola dimostra che tutti gli ospiti erano curati bene.', v: false, why: 'La regola dice che cosa si doveva fare; per sapere che cosa accadde servono altre fonti.' },
      { s: 'La ruota degli esposti che si vede oggi è del Seicento.', v: true, why: 'Lo dice la scheda dell’ASL Roma 1: non è delle origini.' },
      { s: 'Guido di Montpellier era un cavaliere crociato.', v: false, why: 'Era un laico di Montpellier, a capo di una comunità ospedaliera di uomini e donne, laici e chierici.' },
      { s: 'Per la Chiesa la carità non deve servire a imporre la fede.', v: true, why: '«Chi esercita la carità in nome della Chiesa non cercherà mai di imporre agli altri la fede della Chiesa» (Deus caritas est 31c).' }
    ],
    seq: [
      { t: 'Il re Ina fonda la schola Saxonum', y: '727–729' },
      { t: 'Guido apre la sua casa-ospedale a Montpellier', y: 'prima del 1190' },
      { t: 'Innocenzo III è eletto papa', y: '1198' },
      { t: 'L’ospedale romano è affidato a Guido', y: '1201' },
      { t: 'Bolla Inter opera pietatis', y: '1204' },
      { t: 'Prima donazione conservata in originale', y: '1245' },
      { t: 'Corsie Sistine di Sisto IV', y: '1471–1478' },
      { t: 'Deus caritas est', y: '2005' }
    ],
    abbina: [
      ['hospes', 'chi ospita e chi è ospitato'],
      ['caritas', 'affetto, amore'],
      ['dignitas', 'valore, da dignus, «degno»'],
      ['xenodochium', 'casa dello straniero'],
      ['proiecti', 'gettati fuori: i neonati abbandonati']
    ]
  }
};

