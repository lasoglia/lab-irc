
/* ---- lezione ---- */
/* Classe II · Ora 01 · Accoglienza «Di chi mi posso fidare?» — sorgente dell'artefatto (kit lezione Lab-Irc, 3/10/2026).
   Conversione fedele dell'artefatto «Mi fido perché…»: cartoline dall'estate, vero o inventato, tre voci, il gioco dei riscontri,
   la correzione, Agostino, le etichette, la regola e il patto, il percorso dell'anno.
   Esempi inventati e dichiarati tali: il messaggio del compagno e il post con la citazione «di un premio Nobel». */
window.LEZIONE = {
  slug: 'ii-0-1-accoglienza-di-chi-mi-posso-fidare',
  classe: 'Anno II',
  titolo: 'Di chi mi posso *fidare*?',
  sottotitolo: 'Accoglienza della classe seconda: cartoline dall’estate, tre voci, il gioco dei riscontri e il patto di confronto.',
  saluto: 'Ultima tappa: ventotto incontri, una domanda.',
  scene: [
    /* 0–2 */
    { fase: 'Aggancio', minuti: 2, titolo: 'Di chi mi posso *fidare*?',
      lead: 'Una pietra, un messaggio, un post: ogni giorno qualcosa ci chiede di essere creduto.',
      testo: 'Cominciamo l’anno raccontandoci l’estate, poi fissiamo un metodo: capire quando la fiducia è ragionevole e discutere le idee senza etichettare le persone. Un’ora, nessun compito per casa.',
      blocchi: [
        { tipo: 'agenda', titolo: 'L’ora di oggi' }
      ] },

    /* 2–12 */
    { fase: 'Aggancio', minuti: 10, titolo: 'Com’è andata *l’estate*?',
      lead: 'Pescate una cartolina e rispondete in una o due frasi. Chi non vuole raccontare dice «passo», senza spiegare perché.',
      blocchi: [
        { tipo: 'custom', nome: 'Cartoline', props: {} },
        { tipo: 'custom', nome: 'VeroInventato', props: {} }
      ] },

    /* 12–15 */
    { fase: 'Scoperta', minuti: 3, titolo: 'Vi siete appena *fidati*',
      lead: 'Ogni giorno ci fidiamo di racconti che non possiamo controllare: l’orario del bus, un messaggio, una notizia.',
      blocchi: [
        { tipo: 'rivela', titolo: 'Credere a qualcuno richiede ragioni, ascolto e responsabilità.', pulsante: 'Mostra', passi: [
          { titolo: 'Ragioni', testo: 'Chiedo e offro motivi, non slogan.' },
          { titolo: 'Ascolto', testo: 'Prima di rispondere, capisco che cosa ha detto l’altro.' },
          { titolo: 'Responsabilità', testo: 'Controllo prima di condividere, anche quando una frase mi dà ragione.' }
        ], fine: 'La domanda dell’anno non è se fidarsi, ma di chi, e per quali ragioni.' }
      ] },

    /* 15–23 */
    { fase: 'Scoperta', minuti: 8, titolo: 'Tre *voci* sul tavolo',
      lead: 'Per ora non chiedetevi se sono vere: capite che tipo di affermazione avete davanti, e sceglietelo insieme.',
      blocchi: [
        { tipo: 'custom', nome: 'TreVoci', props: {} }
      ] },

    /* 23–30 */
    { fase: 'Attività', minuti: 7, titolo: 'Tre richieste di *riscontro*',
      lead: 'Cinque richieste di {riscontro}, una alla volta. Per ognuna la classe vota con la mano, poi toccate il posto giusto: una delle tre voci, oppure «falso riscontro».',
      blocchi: [
        { tipo: 'custom', nome: 'Riscontri', props: {} }
      ] },

    /* 30–38 */
    { fase: 'Attività', minuti: 8, titolo: 'Ora il riscontro *vero*',
      lead: 'Girate una voce alla volta e commentatela prima di passare alla successiva. Poi una {citazione} che, al contrario del post, ha un indirizzo.',
      blocchi: [
        { tipo: 'carte', titolo: 'La correzione', carte: [
          { etichetta: 'Il ritaglio · mostra il riscontro', fronte: 'A Cesarea spunta il nome di Ponzio Pilato',
            retro: '**Verificato.** Il blocco fu trovato nel 1961 durante gli scavi italiani a Cesarea Marittima: nel IV secolo era stato riutilizzato come gradino del teatro. Oggi è all’Israel Museum di Gerusalemme. L’iscrizione chiama Pilato *praefectus*, cioè prefetto, della Giudea. Curiosità: lo storico romano Tacito, negli *Annali*, lo chiama invece *procurator*. Anche le fonti antiche vanno confrontate fra loro. Fonte: Israel Museum, scheda della collezione (imj.org.il).' },
          { etichetta: 'Il messaggio · mostra il riscontro', fronte: '«Io mi fido solo di ciò che vedo con i miei occhi.»',
            retro: '**Da discutere.** Un’opinione non si smentisce con un documento: si discute con ragioni ed esempi. Avete visto con i vostri occhi il giorno della vostra nascita, il centro della Terra, un atomo? Eppure ve ne fidate, perché avete buone ragioni per credere a certi testimoni. Si può non essere d’accordo senza dare del credulone o dello scettico a nessuno.' },
          { etichetta: 'Il post · mostra il riscontro', fronte: '«Più studio la scienza, più mi convinco che senza la fede non si capisce nulla.»',
            retro: '**Inventata.** Questa citazione è stata inventata per la lezione e non ha alcuna fonte. Nessun nome, nessuna testata, nessuna data: «un premio Nobel» non è un indirizzo, e dodicimila cuori non lo sostituiscono. Vale anche quando una frase ci dà ragione: prima si controlla, poi si condivide.' }
        ] },
        { tipo: 'citazione',
          testo: '[…] consideravo quante cose, innumerevoli, credevo senza averle viste e senza essere presente quando accadevano: tanti fatti della storia dei popoli, tante cose su luoghi e città che non avevo visto, tante sulla parola di amici, di medici, di altre persone ancora; se non le credessimo, in questa vita non faremmo proprio nulla. E infine con quale salda fede tenevo per certo da quali genitori ero nato: cosa che non avrei potuto sapere, se non credendo a ciò che avevo sentito.',
          fonte: 'Agostino d’Ippona (354–430), Confessioni, libro VI, capitolo 5, paragrafo 7 · scritte fra il 397 e il 400 circa · latino, qui in traduzione di lavoro',
          pulsante: 'Perché questa citazione ha un indirizzo?',
          commento: '**Chi**, Agostino d’Ippona. **Dove**, *Confessioni* VI, 5, 7. **Quando**, fra il 397 e il 400 circa. Con un indirizzo così, chiunque può andare a controllare. E il contenuto risponde al messaggio del compagno: anche chi si fida solo di ciò che vede vive, ogni giorno, di cose credute. Testo latino: edizione di J. J. O’Donnell (faculty.georgetown.edu/jod/conf/text6.html).' }
      ] },

    /* 38–46 */
    { fase: 'Attività', minuti: 8, titolo: 'Discutere le idee, non *etichettare* le persone',
      lead: 'Toccate ogni etichetta: diventa una domanda sull’idea. Toccatela di nuovo per tornare indietro.',
      testo: 'Un’etichetta chiude il discorso sulla persona. Una domanda lo riapre sull’idea. Si può non essere d’accordo senza dare del credulone o dello scettico a nessuno: le idee si mettono alla prova, le persone si rispettano.',
      blocchi: [
        { tipo: 'carte', carte: [
          { etichetta: 'etichetta', fronte: '«Sei il solito credulone.»', retro: '*Domanda sull’idea:* «Da dove viene questa informazione? Controlliamola insieme.»' },
          { etichetta: 'etichetta', fronte: '«Voi scettici non credete a niente.»', retro: '*Domanda sull’idea:* «Che cosa ti renderebbe convincente questa fonte?»' },
          { etichetta: 'etichetta', fronte: '«Chi crede ha smesso di ragionare.»', retro: '*Domanda sull’idea:* «Perché pensi che credere e ragionare siano in contrasto?»' },
          { etichetta: 'etichetta', fronte: '«Chi non crede non ha valori.»', retro: '*Domanda sull’idea:* «Quali valori guidano le tue scelte?»' }
        ] },
        { tipo: 'custom', nome: 'Patto', props: {} }
      ] },

    /* 46–50 */
    { fase: 'Chiusura', minuti: 4, titolo: 'Ventotto incontri, *una* domanda',
      lead: 'Ogni tappa riprende la domanda di oggi da un’altra parte. Le ultime sei ore sono vostre.',
      blocchi: [
        { tipo: 'custom', nome: 'Programma', props: {} },
        { tipo: 'continua', voci: [
          { t: 'Prima di uscire', d: 'Su un foglietto: la vostra regola e una situazione della settimana in cui vi servirà.' },
          { t: 'Ripassa con i giochi', d: 'Fatti, opinioni, citazioni e falsi riscontri.', vai: 'giochi', gioco: 'cat', principale: true },
          { t: 'Da capo', d: 'Torna alla prima scena.', vai: 'inizio' }
        ] }
      ] }
  ],

  glossario: {
    riscontro: { etim: 'da *riscontrare*: incontrare di nuovo, mettere a confronto', def: 'Un controllo che si può ripetere: una fonte consultabile, una ragione, un indirizzo. Like e condivisioni non lo sono.' },
    citazione: { etim: 'dal latino *citare*, «chiamare, far venire»: si chiama un testo a testimone', def: 'Parole attribuite a qualcuno. Vale quanto il suo indirizzo: chi l’ha detta, dove e quando.' },
    opinione: { etim: 'dal latino *opinio*, da *opinari*, «pensare, ritenere»', def: 'Un giudizio personale. Non si smentisce con un documento: si discute con ragioni ed esempi.' },
    prefetto: { parola: 'prefetto', etim: 'dal latino *praefectus*, «posto a capo», da *praeficere*', def: 'Il titolo con cui l’iscrizione di Cesarea chiama Ponzio Pilato: governatore della Giudea.' }
  },

  studio: {
    sezioni: [
      { titolo: 'Vi siete appena fidati', testo: 'Ogni giorno ci fidiamo di racconti che non possiamo controllare: l’orario del bus, un messaggio, una notizia. Credere a qualcuno richiede **ragioni** (chiedo e offro motivi, non slogan), **ascolto** (prima di rispondere, capisco che cosa ha detto l’altro) e **responsabilità** (controllo prima di condividere, anche quando una frase mi dà ragione).\n\nLa domanda dell’anno non è se fidarsi, ma di chi, e per quali ragioni.' },
      { titolo: 'Tre voci: un fatto, un’opinione, una citazione', testo: 'Il **ritaglio** riferisce un evento con luogo, data e oggetto: nel 1961, durante gli scavi di una missione archeologica italiana a Cesarea Marittima, viene alla luce un blocco di pietra con un’iscrizione in latino che nomina Ponzio Pilato e lo chiama «prefetto della Giudea». È un fatto verificabile: la sua domanda è «Dove posso controllarlo?».\n\nIl **messaggio** di un compagno («Io mi fido solo di ciò che vedo con i miei occhi. Il resto sono chiacchiere.») è un’opinione: un giudizio personale su come fidarsi, che non si smentisce con un documento ma si discute. La sua domanda è «Con quali ragioni?».\n\nIl **post** («Più studio la scienza, più mi convinco che senza la fede non si capisce nulla», attribuito a «un premio Nobel per la fisica») è una citazione: mette parole in bocca a qualcuno. La prima domanda è «Chi, dove, quando?». Like e condivisioni («Quanti like? Chi me l’ha girato?») sono falsi riscontri: dicono quanto una frase circola, non se è vera.' },
      { titolo: 'Il riscontro vero', testo: 'Il blocco con il nome di Pilato fu trovato nel 1961 durante gli scavi italiani a Cesarea Marittima: nel IV secolo era stato riutilizzato come gradino del teatro. Oggi è all’Israel Museum di Gerusalemme. L’iscrizione chiama Pilato *praefectus*, cioè prefetto, della Giudea; lo storico romano Tacito, negli *Annali*, lo chiama invece *procurator*. Anche le fonti antiche vanno confrontate fra loro.\n\nIl messaggio è da discutere: avete visto con i vostri occhi il giorno della vostra nascita, il centro della Terra, un atomo? Eppure ve ne fidate, perché avete buone ragioni per credere a certi testimoni.\n\nLa citazione del post è stata **inventata per la lezione** e non ha alcuna fonte: nessun nome, nessuna testata, nessuna data. «Un premio Nobel» non è un indirizzo, e dodicimila cuori non lo sostituiscono. Vale anche quando una frase ci dà ragione: prima si controlla, poi si condivide.' },
      { titolo: 'Una citazione vera ha un indirizzo', testo: 'Agostino d’Ippona (354–430), *Confessioni*, libro VI, capitolo 5, paragrafo 7, scritte fra il 397 e il 400 circa (latino, qui in traduzione di lavoro): «[…] consideravo quante cose, innumerevoli, credevo senza averle viste e senza essere presente quando accadevano: tanti fatti della storia dei popoli, tante cose su luoghi e città che non avevo visto, tante sulla parola di amici, di medici, di altre persone ancora; se non le credessimo, in questa vita non faremmo proprio nulla. E infine con quale salda fede tenevo per certo da quali genitori ero nato: cosa che non avrei potuto sapere, se non credendo a ciò che avevo sentito».\n\nCon un indirizzo così, chiunque può andare a controllare. E il contenuto risponde al messaggio del compagno: anche chi si fida solo di ciò che vede vive, ogni giorno, di cose credute.' },
      { titolo: 'Idee e persone', testo: 'Un’etichetta chiude il discorso sulla persona («Sei il solito credulone», «Voi scettici non credete a niente», «Chi crede ha smesso di ragionare», «Chi non crede non ha valori»). Una domanda lo riapre sull’idea («Da dove viene questa informazione? Controlliamola insieme», «Che cosa ti renderebbe convincente questa fonte?», «Perché pensi che credere e ragionare siano in contrasto?», «Quali valori guidano le tue scelte?»).\n\nIl patto di confronto della classe raccoglie da tre a cinque regole, per esempio: discutiamo le idee, non le persone; prima di condividere, controllo la fonte; chiedo ragioni e ne offro; ascolto fino in fondo prima di rispondere; posso cambiare idea senza perdere la faccia.' },
      { titolo: 'Il percorso dell’anno', testo: 'Ventotto incontri. Incontro 1: Mi fido perché… (il racconto dell’estate, il metodo dell’anno e il patto di confronto). Incontri 2–5: Gesù, quali tracce? (Tacito, Plinio, Giuseppe Flavio, Paolo). Incontri 6–9: Quattro Vangeli, una Pasqua. Incontri 10–13: Quando credere costa (persecuzioni e martiri, le svolte del 313 e del 380, la libertà anche per chi crede diversamente). Incontro 14: Verifica rovesciata. Incontri 15–18: Una comunità che sa riparare (Atti degli Apostoli, i simboli delle catacombe). Incontri 19–22: Concili e immagini (i concili, le icone e i mosaici di Ravenna). Incontri 23–28: Talenti in gruppo. Nella parabola di Mt 25,14-30 il «talento» è una somma di denaro: il senso di «capacità» è un uso successivo.\n\nTerremo distinti tre piani: **che cosa attestano le fonti** (conoscenza storica), **come le interpretiamo** (interpretazione), **se e come ci crediamo** (adesione di fede). Il voto riguarda come usate fonti e ragioni. La fede di ciascuno, o la sua assenza, non è mai oggetto di voto.' }
    ],
    fonti: [
      'Israel Museum, Gerusalemme, scheda della collezione sull’iscrizione di Ponzio Pilato (imj.org.il/en/collections/395572)',
      'Tacito, *Annali*, sul titolo di *procurator* attribuito a Pilato',
      'Agostino d’Ippona, *Confessioni* VI, 5, 7; testo latino nell’edizione di J. J. O’Donnell (faculty.georgetown.edu/jod/conf/text6.html); traduzione di lavoro',
      'Il messaggio e il post sono esempi inventati per la lezione; la citazione del post è inventata e la correzione lo dichiara'
    ]
  }
};

/* ============================================================
   Componenti su misura
   ============================================================ */

function a2Mescola(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
function a2Norm(s) { return String(s || '').toLowerCase().replace(/[\s.!?;:,]+$/g, '').trim(); }

/* Stile dei componenti propri: solo token del design system, nessun colore scritto a mano. */
(function () {
  if (document.getElementById('a2-css')) return;
  var s = document.createElement('style'); s.id = 'a2-css';
  s.textContent = [
    '.a2-cart{display:grid;gap:13px}',
    '.a2-post.la-card{padding:21px 21px 24px;border-radius:13px;max-width:560px}',
    '.a2-post-q{margin:8px 0 13px;font:italic 500 clamp(20px,2.4vw,28px)/1.25 var(--lab-font-display);color:var(--lab-ink);text-wrap:balance}',
    '.a2-post-f{display:flex;justify-content:space-between;align-items:baseline;gap:13px}.a2-post-f .ll-hint{margin:0}',
    '.a2-sec{font:700 15px/1 var(--lab-font-inscription);color:var(--lab-oro);font-variant-numeric:tabular-nums}.a2-sec.is-over{color:var(--lab-rosso)}',
    '.a2-post .a2-bar{position:absolute;left:0;right:0;bottom:0;height:5px;background:var(--lab-line)}.a2-bar i{display:block;height:100%;background:var(--lab-oro);transition:width 200ms linear}',
    '.a2-tools{display:grid;gap:13px}@media(min-width:720px){.a2-tools{grid-template-columns:1fr 1fr}}',
    '.a2-tool{padding:13px 21px;border:1px solid var(--lab-line);border-radius:13px;background:var(--lab-surface-2)}.a2-tool>.ll-hint:last-child{margin:8px 0 0}',
    '.a2-draw{display:flex;align-items:center;gap:13px;flex-wrap:wrap;margin:8px 0}',
    '.a2-num{min-width:2.2ch;text-align:center;font:600 clamp(28px,4vw,42px)/1 var(--lab-font-display);color:var(--la-accent);font-variant-numeric:tabular-nums}',
    '.a2-step{display:flex;align-items:center;gap:8px;flex-wrap:wrap}.a2-step .ll-hint{margin:0}.a2-step b{min-width:2.2ch;text-align:center}',
    '.a2-pm{width:36px;height:36px;border-radius:50%;border:1.5px solid var(--lab-line);background:var(--lab-surface);color:var(--lab-ink);font:700 16px/1 var(--lab-font-body);cursor:pointer;transition:border-color 144ms,transform 144ms}',
    '.a2-pm:hover{border-color:var(--la-accent)}.a2-pm:active{transform:scale(.92)}',
    '.a2-pm:focus-visible,.a2-switch:focus-visible,.a2-chip:focus-visible,.a2-vote:focus-visible,.a2-t:focus-visible,.a2-blocco:focus-visible{outline:3px solid var(--lab-oro);outline-offset:3px}',
    '.a2-switch{display:inline-flex;align-items:center;gap:13px;min-height:44px;padding:0;border:0;background:none;color:var(--lab-ink);font:700 15px/1.2 var(--lab-font-body);cursor:pointer;text-align:left}',
    '.a2-track{position:relative;width:48px;height:28px;flex:none;border-radius:999px;background:var(--lab-surface);border:1.5px solid var(--lab-line);transition:background 233ms,border-color 233ms}',
    '.a2-track::after{content:"";position:absolute;top:3px;left:3px;width:19px;height:19px;border-radius:50%;background:var(--lab-muted);transition:transform 233ms var(--lab-ease-out),background 233ms}',
    '.a2-switch[aria-checked="true"] .a2-track{background:var(--la-accent);border-color:transparent}.a2-switch[aria-checked="true"] .a2-track::after{transform:translateX(20px);background:var(--lab-surface)}',
    '.a2-votes{display:grid;grid-template-columns:1fr 1fr;gap:13px;margin:8px 0 13px}@media(max-width:480px){.a2-votes{grid-template-columns:1fr}}',
    '.a2-vote{display:flex;align-items:center;justify-content:space-between;gap:13px;min-height:64px;padding:13px 13px 13px 21px;border-radius:13px;border:1.5px solid var(--lab-line);background:var(--lab-surface-2);color:var(--lab-ink);font:600 clamp(16px,2vw,21px)/1.2 var(--lab-font-display);cursor:pointer;transition:border-color 144ms,transform 144ms}',
    '.a2-vote:hover{border-color:var(--la-accent)}.a2-vote:active{transform:scale(.97)}',
    '.a2-vote b{min-width:44px;height:44px;padding:0 8px;border-radius:999px;display:grid;place-items:center;font:600 22px/1 var(--lab-font-display);font-variant-numeric:tabular-nums}',
    '.a2-vote--si b{background:color-mix(in srgb,var(--lab-verde) 16%,transparent);color:var(--lab-verde)}.a2-vote--no b{background:color-mix(in srgb,var(--lab-rosso) 14%,transparent);color:var(--lab-rosso)}',
    '.a2-chips{display:flex;flex-wrap:wrap;gap:8px}',
    '.a2-chip{display:inline-flex;align-items:center;gap:6px;min-height:40px;padding:8px 15px;border-radius:999px;border:1.5px solid var(--lab-line);background:var(--lab-surface-2);color:var(--lab-ink);font:600 14px/1.25 var(--lab-font-body);text-align:left;cursor:pointer;transition:border-color 144ms,background 144ms,transform 144ms}',
    '.a2-chip:hover{border-color:var(--la-accent)}.a2-chip:active{transform:scale(.96)}',
    '.a2-chip[aria-pressed="true"]{background:var(--la-accent);border-color:transparent;color:var(--lab-bg)}',
    '.a2-chip.is-ok[aria-pressed="true"]{background:color-mix(in srgb,var(--lab-verde) 18%,var(--lab-surface-2));border-color:var(--lab-verde);color:var(--lab-ink)}',
    '.a2-chip.is-part[aria-pressed="true"]{background:color-mix(in srgb,var(--lab-ambra) 22%,var(--lab-surface-2));border-color:var(--lab-ambra);border-style:dashed;color:var(--lab-ink)}',
    '.a2-chip.is-ko[aria-pressed="true"]{background:color-mix(in srgb,var(--lab-rosso) 14%,var(--lab-surface-2));border-color:var(--lab-rosso);color:var(--lab-ink)}',
    '.ll-why.is-part{background:color-mix(in srgb,var(--lab-ambra) 18%,transparent);color:var(--lab-ink)}',
    '.a2-step-t{margin:13px 0 5px;font:700 15px/1.3 var(--lab-font-body)}',
    '.a2-how{margin:0 0 8px;padding-left:1.3em;display:grid;gap:5px;color:var(--lab-muted);font-size:14px}',
    '.a2-voci{display:grid;gap:21px}@media(min-width:900px){.a2-voci{grid-template-columns:1.618fr 1fr 1fr;align-items:start}}',
    '@media(min-width:640px) and (max-width:899px){.a2-voci{grid-template-columns:1fr 1fr}.a2-voce--a{grid-column:1/-1}}',
    '.a2-voce-n{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin:0 0 8px;font:700 14px/1.3 var(--lab-font-body);color:var(--lab-muted)}',
    '.a2-tag{padding:3px 10px;border-radius:999px;background:color-mix(in srgb,var(--lab-verde) 16%,transparent);color:var(--lab-verde);font-size:12px;font-weight:800}',
    '.a2-clip{background:var(--lab-surface);border:1px solid var(--lab-line);padding:21px;border-radius:4px;rotate:-.5deg;box-shadow:var(--lab-shadow)}',
    '.a2-kicker{display:block;margin-bottom:5px;font:italic 600 15px/1.2 var(--lab-font-display);color:var(--la-accent)}',
    '.a2-clip-t{margin:0 0 8px;font:600 clamp(20px,2.2vw,26px)/1.1 var(--lab-font-display);color:var(--lab-ink)}',
    '.a2-clip-b{margin:0;font:400 16px/1.5 var(--lab-font-display);color:var(--lab-ink)}',
    '.a2-chat{background:var(--lab-surface);border:1px solid var(--lab-line);border-radius:21px;padding:13px 21px;box-shadow:var(--lab-shadow)}.a2-chat>.ll-hint{margin:0 0 8px}',
    '.a2-bubble{background:color-mix(in srgb,var(--la-accent) 14%,transparent);border-radius:21px 21px 21px 5px;padding:13px 18px 8px;font-size:17px;line-height:1.45;max-width:34ch}',
    '.a2-bubble p{margin:0}.a2-bubble time{display:block;text-align:right;font-size:12px;color:var(--lab-muted);margin-top:3px}',
    '.a2-postx{background:var(--lab-surface);border:1px solid var(--lab-line);border-radius:13px;padding:21px;box-shadow:var(--lab-shadow)}',
    '.a2-post-h{display:flex;align-items:center;gap:10px;font-size:14px;font-weight:800}',
    '.a2-av{width:34px;height:34px;border-radius:50%;flex:none;background:conic-gradient(from 210deg,var(--lab-rosa,var(--lab-rosso)),var(--lab-oro),var(--lab-ciano,var(--la-accent)),var(--lab-rosa,var(--lab-rosso)))}',
    '.a2-post-quote{margin:13px 0 5px;font:500 clamp(18px,2vw,22px)/1.35 var(--lab-font-display);color:var(--lab-ink)}.a2-postx>.ll-hint{margin:0 0 8px}',
    '.a2-stats{display:flex;gap:21px;margin:0;color:var(--lab-muted);font-size:14px}',
    '.a2-cls{margin-top:13px}',
    '.a2-rules{font:500 clamp(18px,2.2vw,24px)/1.3 var(--lab-font-display);max-width:36ch;margin:0 0 8px}',
    '.a2-game{display:grid;gap:21px}@media(min-width:900px){.a2-game{grid-template-columns:1.618fr 1fr;align-items:start}}',
    '.a2-count{display:flex;align-items:center;gap:13px;margin:0 0 13px}',
    '.a2-pips{display:flex;gap:5px}.a2-pips i{width:21px;height:6px;border-radius:6px;background:var(--lab-line)}.a2-pips i.is-on{background:var(--la-accent)}.a2-pips i.is-cur{background:var(--lab-oro)}',
    '.a2-tag-q{display:inline-block;max-width:100%;margin:0 0 21px;padding:21px 34px;border-radius:13px;background:var(--lab-surface);border:1.5px solid var(--lab-line);box-shadow:var(--lab-shadow);font:600 clamp(20px,2.4vw,30px)/1.2 var(--lab-font-display);rotate:-1deg}',
    '.a2-targets{display:grid;grid-template-columns:1fr 1fr;gap:13px}@media(max-width:480px){.a2-targets{grid-template-columns:1fr}}',
    '.a2-t{--k:var(--lab-verde);position:relative;display:grid;gap:3px;align-content:start;min-height:72px;padding:13px 21px 13px 19px;border-radius:13px;border:1.5px solid var(--lab-line);border-left:6px solid var(--k);background:var(--lab-surface-2);color:var(--lab-ink);text-align:left;cursor:pointer;transition:transform 144ms,border-color 144ms,background 144ms,opacity 144ms}',
    '.a2-t[data-z="B"]{--k:var(--lab-ambra)}.a2-t[data-z="C"]{--k:var(--lab-rosa,var(--la-accent))}.a2-t[data-z="X"]{--k:var(--lab-muted)}',
    '.a2-t b{font:600 clamp(16px,1.8vw,20px)/1.2 var(--lab-font-display);padding-right:55px}.a2-t span{font-size:13px;color:var(--lab-muted)}',
    '.a2-t:hover:not(:disabled){transform:translateY(-2px);border-color:var(--k)}.a2-t:active:not(:disabled){transform:scale(.97)}',
    '.a2-t.is-wrong{border-color:var(--lab-rosso);background:color-mix(in srgb,var(--lab-rosso) 12%,var(--lab-surface-2));opacity:.7;cursor:not-allowed}',
    '.a2-t.is-right{border-color:var(--k);background:color-mix(in srgb,var(--k) 16%,var(--lab-surface-2))}',
    '.a2-t:disabled:not(.is-right):not(.is-wrong){opacity:.5;cursor:default}',
    '.a2-t i{position:absolute;right:10px;top:10px;padding:2px 9px;border-radius:999px;font:800 11px/1.4 var(--lab-font-body);font-style:normal}',
    '.a2-t.is-right i{background:color-mix(in srgb,var(--lab-verde) 18%,transparent);color:var(--lab-verde)}.a2-t.is-wrong i{background:color-mix(in srgb,var(--lab-rosso) 14%,transparent);color:var(--lab-rosso)}',
    '.a2-board{padding:21px;border:1px solid var(--lab-line);border-radius:13px;background:var(--lab-surface-2)}.a2-board>.la-meta{display:block;margin-bottom:8px}',
    '.a2-slot{--k:var(--lab-verde);padding:8px 0 8px 13px;border-top:1px solid var(--lab-line);border-left:4px solid var(--k)}',
    '.a2-slot[data-z="B"]{--k:var(--lab-ambra)}.a2-slot[data-z="C"]{--k:var(--lab-rosa,var(--la-accent))}.a2-slot[data-z="X"]{--k:var(--lab-muted)}',
    '.a2-slot p{margin:0;font:700 13px/1.3 var(--lab-font-body)}',
    '.a2-slot ul{list-style:none;margin:3px 0 0;padding:0;display:grid;gap:3px;font:500 14px/1.35 var(--lab-font-display);color:var(--lab-muted)}.a2-slot ul:empty::before{content:"—"}',
    '.a2-qa{display:grid;gap:8px;margin:13px 0}@media(min-width:640px){.a2-qa{grid-template-columns:1fr 1fr}}',
    '.a2-qa div{--k:var(--lab-verde);padding:13px 13px 13px 18px;border-radius:12px;background:var(--lab-surface-2);border:1px solid var(--lab-line);border-left:5px solid var(--k)}',
    '.a2-qa div:nth-child(2){--k:var(--lab-ambra)}.a2-qa div:nth-child(3){--k:var(--lab-rosa,var(--la-accent))}.a2-qa div:nth-child(4){--k:var(--lab-muted)}',
    '.a2-qa dt{font:800 11px/1.3 var(--lab-font-body);letter-spacing:.06em;text-transform:uppercase;color:var(--k)}',
    '.a2-qa dd{margin:3px 0 0;font-size:14px}.a2-qa dd.q{font:600 16px/1.3 var(--lab-font-display);color:var(--lab-ink)}',
    '.a2-end h3{margin:0 0 8px;font:600 clamp(20px,2.2vw,26px)/1.2 var(--lab-font-display)}.a2-end>p{margin:0;color:var(--lab-ink)}',
    '.a2-patto{display:grid;gap:21px}@media(min-width:900px){.a2-patto{grid-template-columns:1.618fr 1fr;align-items:start}}',
    '.a2-leg{margin:13px 0 5px;font:800 14px/1.3 var(--lab-font-body)}.a2-leg:first-child{margin-top:0}',
    '.a2-in{width:100%;min-height:46px;padding:10px 13px;border-radius:12px;border:1.5px solid var(--lab-line);background:var(--lab-surface);color:var(--lab-ink);font:inherit}.a2-in:focus-visible{outline:3px solid var(--lab-oro);outline-offset:1px}',
    '.a2-in-row{display:flex;flex-wrap:wrap;gap:8px}.a2-in-row .a2-in{flex:1 1 14rem;width:auto}',
    '.a2-regola{margin:13px 0 0;padding:13px 0;border-block:1px solid var(--lab-line);font:italic 500 clamp(18px,2vw,24px)/1.3 var(--lab-font-display);min-height:3em}',
    '.a2-regola.is-empty{font:400 14px/1.4 var(--lab-font-body);color:var(--lab-muted)}',
    '.a2-foglio.la-card{padding:21px}.a2-foglio>.la-meta{display:block}',
    '.a2-foglio ol{list-style:none;counter-reset:art;margin:8px 0 0;padding:0;border-top:1px solid var(--lab-line)}',
    '.a2-foglio li{counter-increment:art;display:grid;grid-template-columns:auto 1fr auto;gap:13px;align-items:center;padding:10px 0;border-bottom:1px solid var(--lab-line);font:500 17px/1.35 var(--lab-font-display)}',
    '.a2-foglio li::before{content:counter(art);font:600 22px/1 var(--lab-font-display);color:var(--la-accent);min-width:1.3ch;text-align:right}',
    '.a2-foglio.is-big li{font-size:clamp(22px,3vw,40px);padding:21px 0}.a2-foglio.is-big li::before{font-size:.8em}',
    '.a2-status{margin:8px 0 0;min-height:1.5em;font-size:14px;color:var(--lab-muted)}',
    '.a2-prog{display:grid;gap:21px}@media(min-width:900px){.a2-prog{grid-template-columns:1.618fr 1fr;align-items:start}}',
    '.a2-strip{display:flex;align-items:flex-end;gap:3px;height:48px;margin:8px 0 5px}',
    '.a2-cell{flex:1 1 0;min-width:0;height:46%;border-radius:4px 4px 1px 1px;background:var(--la-accent);opacity:.3;transition:height 377ms var(--lab-ease-out),opacity 233ms}',
    '.a2-cell.first{margin-left:8px}.a2-cell:first-child{margin-left:0}',
    '.a2-cell[data-b="b1"]{background:var(--lab-oro)}.a2-cell[data-b="b5"]{background:var(--lab-muted)}.a2-cell[data-b="b8"]{background:var(--lab-ciano,var(--lab-verde));opacity:.6;height:62%}',
    '.a2-cell.is-active{opacity:1;height:100%}',
    '.a2-legend{display:flex;justify-content:space-between;font-size:12px;color:var(--lab-muted);margin-bottom:13px}',
    '.a2-blocchi{display:grid;gap:6px}@media(min-width:700px){.a2-blocchi{grid-template-columns:1fr 1fr}}',
    '.a2-blocco{--k:var(--la-accent);display:grid;gap:2px;align-content:start;width:100%;min-height:48px;padding:7px 13px 7px 16px;border-radius:12px;border:1px solid var(--lab-line);border-left:5px solid var(--k);background:var(--lab-surface-2);color:var(--lab-ink);text-align:left;cursor:pointer;transition:transform 144ms,border-color 144ms}',
    '.a2-blocco[data-b="b1"]{--k:var(--lab-oro)}.a2-blocco[data-b="b5"]{--k:var(--lab-muted)}.a2-blocco[data-b="b8"]{--k:var(--lab-ciano,var(--lab-verde))}',
    '.a2-blocco:hover{transform:translateY(-2px);border-color:var(--k)}.a2-blocco:active{transform:scale(.98)}',
    '.a2-blocco small{font:800 11px/1.3 var(--lab-font-body);letter-spacing:.06em;text-transform:uppercase;color:var(--lab-muted)}',
    '.a2-blocco small em{display:inline-block;margin-left:6px;padding:1px 8px;border-radius:999px;background:var(--lab-oro);color:var(--lab-bg);font-style:normal}',
    '.a2-blocco b{font:600 16px/1.25 var(--lab-font-display)}',
    '.a2-blocco p{margin:4px 0 0;font-size:14px;line-height:1.5;color:var(--lab-ink)}.a2-blocco p span{display:block;margin-top:4px;color:var(--lab-muted)}',
    '.a2-blocco[aria-expanded="true"]{border-color:var(--k);grid-column:1/-1}',
    '.a2-piani{display:grid;gap:6px;margin:8px 0}',
    '.a2-piano{margin:0;padding:9px 13px;border-radius:12px;background:var(--lab-surface-2);border:1px solid var(--lab-line);display:flex;flex-direction:column}',
    '.a2-piano:nth-child(2){margin-left:13px}.a2-piano:nth-child(3){margin-left:34px;background:transparent;border-style:dashed}',
    '.a2-piano b{font:600 16px/1.25 var(--lab-font-display)}.a2-piano span{font-size:12px;font-weight:700;color:var(--lab-muted)}',
    '@media(prefers-reduced-motion:reduce){.a2-cell,.a2-bar i,.a2-track,.a2-track::after{transition:none}}'
  ].join('\n');
  document.head.appendChild(s);
})();

/* ---------- Cartoline dall'estate: un mazzo di dodici domande leggere, chi racconta, mezzo minuto a testa ---------- */
var A2_CARTOLINE = [
  ['Un luogo', 'Un posto dell’estate, anche a due passi da casa.'],
  ['Un sapore', 'Un sapore che ti porti dietro.'],
  ['Una scoperta', 'Una cosa nuova che hai imparato: un gioco, una ricetta, un trucco.'],
  ['Un incontro', 'Una persona che hai rivisto o conosciuto.'],
  ['Una colonna sonora', 'La canzone della tua estate.'],
  ['Un momento lento', 'Un pomeriggio di noia: com’è andato a finire?'],
  ['Una piccola impresa', 'Qualcosa per cui ci è voluto un po’ di coraggio.'],
  ['Un imprevisto', 'Una cosa andata storta che adesso fa sorridere.'],
  ['Da consigliare', 'Un libro, un film o una serie da consigliare. O da sconsigliare.'],
  ['Da tenere', 'Un’abitudine dell’estate che vorresti portare a scuola.'],
  ['Una sorpresa', 'Qualcosa che non ti aspettavi.'],
  ['Una domanda', 'Una domanda che ti è rimasta in testa.']
];
LabLezione.registra('Cartoline', function (p) {
  var N = A2_CARTOLINE.length, tutti = A2_CARTOLINE.map(function (_, i) { return i; });
  var o = React.useState(function () { return a2Mescola(tutti); }), ordine = o[0], setOrdine = o[1];
  var ps = React.useState(-1), pos = ps[0], setPos = ps[1];
  var c = React.useState(0), conta = c[0], setConta = c[1];
  var r = React.useState(false), rimescolato = r[0], setRimescolato = r[1];
  var m = React.useState(false), mezzo = m[0], setMezzo = m[1];
  var e = React.useState(null), fine = e[0], setFine = e[1];
  var tk = React.useState(0), setTk = tk[1];
  var al = React.useState(25), alunni = al[0], setAlunni = al[1];
  var es = React.useState([]), estratti = es[0], setEstratti = es[1];
  var nn = React.useState(null), numero = nn[0], setNumero = nn[1];
  var mostrata = pos >= 0;
  React.useEffect(function () {
    if (!fine) return;
    var detto = false;
    var iv = setInterval(function () { setTk(Date.now()); if (Date.now() >= fine && !detto) { detto = true; clearInterval(iv); p.ctx.say('Mezzo minuto concluso.'); } }, 200);
    return function () { clearInterval(iv); };
  }, [fine]);
  function pesca(motivo, contare) {
    var ord = ordine, k = pos, resh = false;
    if (k >= ord.length - 1) { ord = a2Mescola(tutti); k = -1; resh = true; }
    k++;
    setOrdine(ord); setPos(k); setRimescolato(resh && mostrata);
    if (contare) setConta(conta + 1);
    setFine(mezzo ? Date.now() + 30000 : null);
    if (motivo) p.ctx.say(motivo);
  }
  function toggleMezzo() {
    var on = !mezzo; setMezzo(on);
    setFine(on && mostrata ? Date.now() + 30000 : null);
    p.ctx.say(on ? (mostrata ? 'Mezzo minuto a testa: attivo.' : 'Mezzo minuto a testa: parte con la prima cartolina.') : 'Mezzo minuto a testa: spento.');
  }
  function estrai() {
    var liberi = [], i, ripartito = false;
    for (i = 1; i <= alunni; i++) if (estratti.indexOf(i) < 0) liberi.push(i);
    if (!liberi.length) { for (i = 1; i <= alunni; i++) liberi.push(i); ripartito = true; }
    var n = liberi[Math.floor(Math.random() * liberi.length)];
    setNumero(n); setEstratti(ripartito ? [n] : estratti.concat([n]));
    p.ctx.say((ripartito ? 'Tutti estratti, si ricomincia. ' : '') + 'Racconta il numero ' + n + '.');
  }
  function setN(n) { n = Math.max(5, Math.min(35, n)); setAlunni(n); setEstratti([]); setNumero(null); }
  var pr = mostrata ? A2_CARTOLINE[ordine[pos]] : null;
  var left = fine ? Math.max(0, fine - Date.now()) : 0, sec = Math.ceil(left / 1000), barra = mezzo && mostrata && !!fine;
  return html`<div className="a2-cart">
    <div className="a2-post la-card">
      <span className="la-meta">${pr ? pr[0] : 'Cartoline dall’estate'}</span>
      <p className="a2-post-q" aria-live="polite">${pr ? pr[1] : 'Un mazzo di domande leggere: una a testa.'}</p>
      <div className="a2-post-f">
        <span className="ll-hint">${!mostrata ? 'Nel mazzo: ' + N + ' cartoline' : rimescolato ? 'Mazzo rimescolato' : 'Nel mazzo: ' + (ordine.length - pos - 1)}</span>
        ${barra ? html`<b className=${'a2-sec' + (left <= 0 ? ' is-over' : '')} aria-live="off">${left > 0 ? '0:' + (sec < 10 ? '0' : '') + sec : 'Tempo!'}</b>` : null}
      </div>
      ${barra ? html`<span className="a2-bar" aria-hidden="true"><i style=${{ width: (left / 300) + '%' }}></i></span>` : null}
    </div>
    <div className="ll-row" style=${{ marginTop: 0 }}>
      <button type="button" className="ll-btn" onClick=${function () { pesca('', mostrata); }}>${mostrata ? 'Fatto, la prossima' : 'Pesca la prima cartolina'}</button>
      ${mostrata ? html`<button type="button" className="ll-btn ll-btn--ghost" onClick=${function () { pesca('Cartolina cambiata.', false); }}>Cambia cartolina</button>` : null}
      ${mostrata ? html`<button type="button" className="ll-btn ll-btn--ghost" onClick=${function () { pesca('Passo: nessuna spiegazione.', false); }}>Passo</button>` : null}
      <span className="ll-tally" aria-live="polite">Racconti ascoltati: ${conta}</span>
    </div>
    <div className="a2-tools">
      <div className="a2-tool">
        <span className="la-meta">Chi racconta?</span>
        <div className="a2-draw"><b className="a2-num" aria-live="polite">${numero == null ? '—' : numero}</b>
          <button type="button" className="ll-btn ll-btn--ghost" onClick=${estrai}>Estrai un numero</button></div>
        <div className="a2-step" role="group" aria-label="Numero di alunni"><span className="ll-hint">Alunni</span>
          <button type="button" className="a2-pm" aria-label="Uno in meno" onClick=${function () { setN(alunni - 1); }}>−</button><b>${alunni}</b>
          <button type="button" className="a2-pm" aria-label="Uno in più" onClick=${function () { setN(alunni + 1); }}>+</button>
          <span className="ll-hint">da estrarre: ${alunni - estratti.length}</span></div>
        <p className="ll-hint">Un numero del registro, senza ripetizioni. Oppure seguite i banchi.</p>
      </div>
      <div className="a2-tool">
        <button type="button" className="a2-switch" role="switch" aria-checked=${mezzo} onClick=${toggleMezzo}><span className="a2-track" aria-hidden="true"></span>Mezzo minuto a testa</button>
        <p className="ll-hint">Una barra sul bordo della cartolina segna il tempo di ciascuno. Nessun suono.</p>
      </div>
    </div>
  </div>`;
});

/* ---------- Vero o inventato: la classe vota, fa una sola domanda di riscontro, chi racconta svela ---------- */
LabLezione.registra('VeroInventato', function (p) {
  var DOMANDE = ['Chi c’era con te?', 'Quando, di preciso?', 'Come fai a ricordarlo?', 'Chi può confermarlo?'];
  var a = React.useState(0), si = a[0], setSi = a[1];
  var b = React.useState(0), no = b[0], setNo = b[1];
  var q = React.useState(null), dom = q[0], setDom = q[1];
  var r = React.useState(''), esito = r[0], setEsito = r[1];
  var v = React.useState(false), svelato = v[0], setSvelato = v[1];
  var g = React.useState(0), giri = g[0], setGiri = g[1];
  function svela(vero) {
    var msg;
    if (si === no) msg = 'Voti pari o nessun voto. Che cosa sarebbe servito per decidere?';
    else if (si > no) msg = vero ? 'La classe si è fidata, ed era tutto vero.' : 'La classe si è fidata, ma c’era un’invenzione: un racconto credibile non è ancora un racconto verificato.';
    else msg = vero ? 'La classe non si è fidata, ma era tutto vero: il sospetto non è una prova.' : 'La classe ha fiutato l’invenzione. Da quale indizio?';
    setEsito(msg + ' Che cosa vi ha convinto: i dettagli, il tono, la persona?');
    if (!svelato) { setSvelato(true); setGiri(giri + 1); }
  }
  function nuovo() { setSi(0); setNo(0); setDom(null); setEsito(''); setSvelato(false); p.ctx.say('Nuovo racconto: voti azzerati.'); }
  return html`<div className="la-card a2-vi">
    <span className="la-meta">Vero o inventato?</span>
    <p className="ll-hint">Per tre o quattro racconti: chi parla può aggiungere, se vuole, un solo dettaglio inventato. Lo sa soltanto chi racconta.</p>
    <p className="a2-step-t">1 · La classe vota</p>
    <div className="a2-votes">
      <button type="button" className="a2-vote a2-vote--si" onClick=${function () { setSi(si + 1); }} aria-label=${'Mi fido: ' + si + '. Aggiungi un voto'}><span>Mi fido</span><b aria-hidden="true">${si}</b></button>
      <button type="button" className="a2-vote a2-vote--no" onClick=${function () { setNo(no + 1); }} aria-label=${'Non mi fido: ' + no + '. Aggiungi un voto'}><span>Non mi fido</span><b aria-hidden="true">${no}</b></button>
    </div>
    <p className="a2-step-t">2 · Una sola domanda di riscontro</p>
    <div className="a2-chips">${DOMANDE.map(function (t, i) { return html`<button key=${i} type="button" className="a2-chip" aria-pressed=${dom === i} onClick=${function () { setDom(dom === i ? null : i); }}>${t}</button>`; })}</div>
    <p className="a2-step-t">3 · Svela</p>
    <div className="a2-chips">
      <button type="button" className="ll-btn ll-btn--ghost" onClick=${function () { svela(true); }}>Era tutto vero</button>
      <button type="button" className="ll-btn ll-btn--ghost" onClick=${function () { svela(false); }}>C’era un’invenzione</button>
    </div>
    <div aria-live="polite">${esito ? html`<p className="ll-gloss">${esito}</p>` : null}</div>
    <p className="a2-step-t">Come si gioca</p>
    <ol className="a2-how">
      <li>Chi racconta decide in segreto se inventare un dettaglio.</li>
      <li>La classe vota, poi fa una sola domanda.</li>
      <li>Chi ha raccontato svela. Poi ci si chiede: che cosa ci ha convinto?</li>
    </ol>
    <div className="ll-row" style=${{ marginTop: 8 }}>
      <button type="button" className="ll-btn" onClick=${nuovo}>Nuovo racconto</button>
      <span className="ll-tally" aria-live="polite">Racconti messi alla prova: ${giri}</span>
    </div>
  </div>`;
});

/* ---------- Tre voci sul tavolo: il ritaglio, il messaggio, il post; che tipo di affermazione è? ---------- */
var A2_CL = {
  A: { fatto: ['ok', 'Giusto. Riferisce un evento con luogo, data e oggetto: dati che anche altri possono controllare.'],
       opinione: ['ko', 'Da rivedere. Cercate un giudizio personale: c’è? Luogo, data, oggetto e museo sono dati, non gusti.'],
       citazione: ['ko', 'Da rivedere. Dentro c’è una breve espressione fra virgolette, ma il ritaglio nel suo insieme racconta che cosa è successo, dove e quando.'] },
  B: { opinione: ['ok', 'Giusto. È un giudizio personale su come fidarsi: non si smentisce con un documento, si discute.'],
       fatto: ['ko', 'Da rivedere. Che cosa si potrebbe cercare in un archivio? «Mi fido solo di ciò che vedo» esprime un modo di pensare, non un evento.'],
       citazione: ['ko', 'Da rivedere. Chi parla è lì con voi e dice la sua: non riporta parole di qualcun altro.'] },
  C: { citazione: ['ok', 'Giusto. Mette parole in bocca a qualcuno: prima di discuterle, bisogna sapere chi le ha dette davvero.'],
       fatto: ['ko', 'Da rivedere. L’unico «fatto» sarebbe che qualcuno l’abbia detto: ed è proprio ciò che va verificato.'],
       opinione: ['part', 'In parte. Il contenuto è un’opinione, ma il post la attribuisce a un’autorità: è una citazione, e la prima domanda riguarda chi l’ha detta.'] }
};
LabLezione.registra('TreVoci', function (p) {
  var OPZ = [['fatto', 'Un fatto verificabile'], ['opinione', 'Un’opinione'], ['citazione', 'Una citazione']];
  var ETI = { A: 'Un fatto verificabile', B: 'Un’opinione', C: 'Una citazione' };
  var s = React.useState({}), sc = s[0], setSc = s[1];
  var festa = React.useRef(false);
  function ok(v) { return !!sc[v] && A2_CL[v][sc[v]][0] === 'ok'; }
  function scegli(v, val) {
    var n = Object.assign({}, sc); n[v] = val; setSc(n);
    var res = A2_CL[v][val][0];
    if (res === 'ok') p.ctx.cheer(); else p.ctx.oops();
    var tutte = ['A', 'B', 'C'].every(function (k) { return n[k] && A2_CL[k][n[k]][0] === 'ok'; });
    if (tutte && !festa.current) { festa.current = true; p.ctx.festa(); setTimeout(function () { p.ctx.say('Tre voci riconosciute. Si passa al gioco.'); }, 900); }
  }
  function scelte(v) {
    var val = sc[v], pair = val ? A2_CL[v][val] : null;
    return html`<div className="a2-cls" role="group" aria-label="Che cosa è?">
      <div className="a2-chips">${OPZ.map(function (o) { var me = val === o[0]; return html`<button key=${o[0]} type="button" className=${'a2-chip' + (me ? ' is-' + pair[0] : '')} aria-pressed=${me} onClick=${function () { scegli(v, o[0]); }}>${o[1]}</button>`; })}</div>
      <div aria-live="polite">${pair ? html`<p className=${'ll-why is-' + pair[0]}>${pair[1]}</p>` : null}</div>
    </div>`;
  }
  function nome(v, t) { return html`<h3 className="a2-voce-n">${t} ${ok(v) ? html`<span className="a2-tag">${ETI[v]}</span>` : null}</h3>`; }
  var tutte = ok('A') && ok('B') && ok('C');
  return html`<div>
    <div className="a2-voci">
      <article className="a2-voce a2-voce--a">
        ${nome('A', 'Il ritaglio')}
        <div className="a2-clip">
          <span className="a2-kicker">Archeologia</span>
          <p className="a2-clip-t">A Cesarea spunta il nome di Ponzio Pilato</p>
          <p className="a2-clip-b">Nel 1961, durante gli scavi di una missione archeologica italiana a Cesarea Marittima, viene alla luce un blocco di pietra con un’iscrizione in latino. Nomina Ponzio Pilato e lo chiama «prefetto della Giudea». Oggi la pietra è conservata all’Israel Museum di Gerusalemme.</p>
        </div>
        ${scelte('A')}
      </article>
      <article className="a2-voce a2-voce--b">
        ${nome('B', 'Il messaggio')}
        <div className="a2-chat">
          <span className="ll-hint">Un compagno, all’intervallo</span>
          <div className="a2-bubble"><p>Io mi fido solo di ciò che vedo con i miei occhi. Il resto sono chiacchiere.</p><time>10:47</time></div>
        </div>
        ${scelte('B')}
      </article>
      <article className="a2-voce a2-voce--c">
        ${nome('C', 'Il post')}
        <div className="a2-postx">
          <div className="a2-post-h"><span className="a2-av" aria-hidden="true"></span><span>Pagina di citazioni</span></div>
          <p className="a2-post-quote">«Più studio la scienza, più mi convinco che senza la fede non si capisce nulla.»</p>
          <p className="ll-hint">Un premio Nobel per la fisica, in un’intervista del 2019</p>
          <p className="a2-stats"><span><span aria-hidden="true">♥ </span>12,4 mila<span className="sr-only"> cuori</span></span><span><span aria-hidden="true">⇄ </span>3.180<span className="sr-only"> condivisioni</span></span></p>
        </div>
        ${scelte('C')}
      </article>
    </div>
    <div aria-live="polite">${tutte ? html`<p className="ll-gloss"><strong>Tre forme diverse: </strong>un fatto, un’opinione, una citazione. Ognuna chiede una domanda diversa.</p>` : null}</div>
  </div>`;
});

/* ---------- Il gioco dei riscontri: cinque richieste, quattro posti; se sbagliate il bersaglio si spegne e riprovate ---------- */
var A2_GQ = [
  { id: 'r1', t: 'Dove posso controllarlo anch’io?', z: 'A' },
  { id: 'r2', t: 'Con quali ragioni lo sostieni?', z: 'B' },
  { id: 'r3', t: 'Chi l’ha detto, dove e quando?', z: 'C' },
  { id: 'f1', t: 'Quanti like ha?', z: 'X' },
  { id: 'f2', t: 'Me l’ha girato un amico: basta?', z: 'X' }
];
var A2_LIKE_KO = 'I like dicono quanto una frase è piaciuta, non da dove viene né se è vera: è un falso riscontro.';
var A2_FRIEND_KO = 'Chi te lo manda può essere in buona fede e sbagliarsi lo stesso: la fiducia nell’amico non sostituisce il controllo.';
var A2_GFB = {
  r1: { A: 'Il ritaglio riferisce un fatto con luogo, data e oggetto: chiunque può cercare la pietra e le pubblicazioni dello scavo.',
        B: 'Nessun archivio conserva il «mi fido solo di ciò che vedo»: per un’opinione servono ragioni, non un documento.',
        C: 'Servirà, ma prima una citazione ha bisogno di un indirizzo: chi l’ha detta, dove e quando.',
        X: 'È un riscontro vero: rimanda a una fonte che anche altri possono consultare. Cercate la voce che riferisce un fatto.' },
  r2: { A: 'Per un fatto le ragioni non bastano: serve una fonte che altri possano controllare.',
        B: 'Un’opinione non si verifica con un documento: si discute con ragioni ed esempi.',
        C: 'Le ragioni contano, ma prima bisogna sapere chi ha parlato: a «un premio Nobel» senza nome non si può chiedere nulla.',
        X: 'Chiedere ragioni è un vero riscontro, per le opinioni. Cercate la voce che esprime un giudizio personale.' },
  r3: { A: 'Il ritaglio dichiara già luogo e data: la sua domanda è dove verificarli.',
        B: 'Qui si sa chi parla: un compagno, adesso. Il punto non è l’indirizzo, sono le sue ragioni.',
        C: 'Una citazione vale quanto il suo indirizzo: nome, opera o testata, data. Senza questi non c’è riscontro.',
        X: 'È il riscontro più importante per una citazione. Cercate la voce che mette parole in bocca a qualcuno.' },
  f1: { A: A2_LIKE_KO, B: A2_LIKE_KO, C: A2_LIKE_KO, X: 'La popolarità misura quanto circola una frase, non se è vera.' },
  f2: { A: A2_FRIEND_KO, B: A2_FRIEND_KO, C: A2_FRIEND_KO, X: 'Un amico può essere sincero e sbagliarsi comunque: la fiducia nella persona non sostituisce il controllo.' }
};
var A2_ZONE = [
  ['A', 'Il ritaglio', 'La pietra di Pilato, 1961'],
  ['B', 'Il messaggio', '«Mi fido solo di ciò che vedo»'],
  ['C', 'Il post', '«Un premio Nobel», 12,4 mila cuori'],
  ['X', 'Falso riscontro', 'Sembra un controllo, ma non lo è']
];
var A2_QA = [
  ['Un fatto', '«Dove posso controllarlo?»', 'Mi fido di una fonte che anche altri possono consultare.'],
  ['Un’opinione', '«Con quali ragioni?»', 'Valuto gli argomenti, non la simpatia di chi parla.'],
  ['Una citazione', '«Chi, dove, quando?»', 'Prima l’indirizzo, poi il contenuto.'],
  ['Un falso riscontro', '«Quanti like? Chi me l’ha girato?»', 'Dice quanto una frase circola, non se è vera.']
];
LabLezione.registra('Riscontri', function (p) {
  var VUOTO = { A: [], B: [], C: [], X: [] };
  var f = React.useState('intro'), fase = f[0], setFase = f[1];
  var o = React.useState([]), ordine = o[0], setOrdine = o[1];
  var ii = React.useState(0), i = ii[0], setI = ii[1];
  var w = React.useState([]), spenti = w[0], setSpenti = w[1];
  var g = React.useState(null), giusto = g[0], setGiusto = g[1];
  var fb = React.useState(null), esito = fb[0], setEsito = fb[1];
  var sl = React.useState(VUOTO), slot = sl[0], setSlot = sl[1];
  function inizia() { setOrdine(a2Mescola(A2_GQ)); setI(0); setSpenti([]); setGiusto(null); setEsito(null); setSlot(VUOTO); setFase('play'); }
  function tocca(z) {
    if (giusto) return;
    var q = ordine[i];
    if (z === q.z) {
      setGiusto(z); setEsito(['ok', 'Giusto. ' + A2_GFB[q.id][z]]);
      var ns = Object.assign({}, slot); ns[z] = ns[z].concat(['«' + q.t + '»']); setSlot(ns); p.ctx.cheer();
    } else { setSpenti(spenti.concat([z])); setEsito(['ko', 'Non qui. ' + A2_GFB[q.id][z]]); p.ctx.oops(); }
  }
  function avanti() {
    if (i + 1 >= ordine.length) { setFase('end'); p.ctx.festa(); p.ctx.say('Tabellone pieno: ogni voce ha la sua domanda.'); return; }
    setI(i + 1); setSpenti([]); setGiusto(null); setEsito(null);
  }
  var q = ordine[i];
  if (fase === 'intro') return html`<div className="la-card">
    <p className="a2-rules">Cinque richieste, una alla volta. Per ognuna la classe vota con la mano, poi toccate il posto giusto: una delle tre voci, oppure «falso riscontro».</p>
    <p className="ll-hint">Nessun punteggio: se sbagliate, il bersaglio si spegne e riprovate.</p>
    <div className="ll-row" style=${{ marginTop: 8 }}><button type="button" className="ll-btn" onClick=${inizia}>Inizia</button></div>
  </div>`;
  return html`<div className="a2-game">
    <div>
      ${fase === 'play' ? html`<div key=${i}>
        <p className="a2-count"><span className="ll-tally">Richiesta ${i + 1} di ${A2_GQ.length}</span><span className="a2-pips" aria-hidden="true">${A2_GQ.map(function (_, k) { return html`<i key=${k} className=${k < i ? 'is-on' : k === i ? 'is-cur' : ''}></i>`; })}</span></p>
        <p className="a2-tag-q">«${q.t}»</p>
        <div className="a2-targets" role="group" aria-label="Dove va questa richiesta?">
          ${A2_ZONE.map(function (z) {
            var sp = spenti.indexOf(z[0]) > -1, ok = giusto === z[0];
            return html`<button key=${z[0]} type="button" className=${'a2-t' + (ok ? ' is-right' : '') + (sp ? ' is-wrong' : '')} data-z=${z[0]} disabled=${sp || !!giusto} onClick=${function () { tocca(z[0]); }}>
              <b>${z[1]}</b><span>${z[2]}</span>${ok ? html`<i>Giusto</i>` : sp ? html`<i>Non qui</i>` : null}
            </button>`;
          })}
        </div>
        <div aria-live="polite">${esito ? html`<p className=${'ll-why is-' + esito[0]}>${esito[1]}</p>` : html`<p className="ll-hint" style=${{ marginTop: 13 }}>Votate con la mano, poi toccate un riquadro.</p>`}</div>
        ${giusto ? html`<div className="ll-row"><button type="button" className="ll-btn" onClick=${avanti}>${i === A2_GQ.length - 1 ? 'Vedi il riepilogo' : 'Prossima richiesta'}</button></div>` : null}
      </div>` : html`<div className="a2-end">
        <h3 tabIndex="-1">Che cosa abbiamo capito</h3>
        <p>Ogni voce chiede la sua domanda. Like e amicizie non sono riscontri.</p>
        <dl className="a2-qa">${A2_QA.map(function (x, k) { return html`<div key=${k}><dt>${x[0]}</dt><dd className="q">${x[1]}</dd><dd>${x[2]}</dd></div>`; })}</dl>
        <div className="ll-row" style=${{ marginTop: 8 }}><button type="button" className="ll-btn ll-btn--ghost" onClick=${inizia}>Rigioca</button></div>
      </div>`}
    </div>
    <aside className="a2-board" aria-label="Il tabellone">
      <span className="la-meta">Il tabellone</span>
      ${A2_ZONE.map(function (z) { return html`<div key=${z[0]} className="a2-slot" data-z=${z[0]}><p>${z[0] === 'X' ? 'Falsi riscontri' : z[1]}</p><ul>${slot[z[0]].map(function (t, k) { return html`<li key=${k}>${t}</li>`; })}</ul></div>`; })}
    </aside>
  </div>`;
});

/* ---------- La mia regola e il patto di confronto: una frase composta o scritta, regole scelte insieme (solo in memoria) ---------- */
LabLezione.registra('Patto', function (p) {
  var INIZI = ['chiedo una ragione', 'chiedo da dove viene l’informazione', 'riassumo prima ciò che l’altro ha detto', 'critico l’idea e non chi la sostiene'];
  var FINI = ['mettere un’etichetta', 'ridere di chi parla', 'alzare la voce', 'condividere senza controllare'];
  var SUGG = ['Discutiamo le idee, non le persone.', 'Prima di condividere, controllo la fonte.', 'Chiedo ragioni e ne offro.', 'Ascolto fino in fondo prima di rispondere.', 'Posso cambiare idea senza perdere la faccia.'];
  var MAXP = 7;
  var a = React.useState(null), ini = a[0], setIni = a[1];
  var b = React.useState(null), fin = b[0], setFin = b[1];
  var c = React.useState(''), propria = c[0], setPropria = c[1];
  var d = React.useState(''), nuova = d[0], setNuova = d[1];
  var e = React.useState([]), patto = e[0], setPatto = e[1];
  var st = React.useState(''), stato = st[0], setStato = st[1];
  var pj = React.useState(false), grande = pj[0], setGrande = pj[1];
  var o = propria.trim().replace(/\s+/g, ' ');
  var regola = o ? o.charAt(0).toUpperCase() + o.slice(1) : (ini !== null && fin !== null ? 'Quando non sono d’accordo, ' + INIZI[ini] + ' invece di ' + FINI[fin] + '.' : '');
  function dentro(t) { return patto.some(function (x) { return a2Norm(x) === a2Norm(t); }); }
  function aggiungi(t) {
    t = String(t || '').trim().replace(/\s+/g, ' ');
    if (!t) { setStato('Scrivete prima una regola.'); return false; }
    if (dentro(t)) { setStato('Questa regola è già nel patto.'); return false; }
    if (patto.length >= MAXP) { setStato('Il patto ha già ' + MAXP + ' regole: meglio poche e chiare. Toglietene una per aggiungerne un’altra.'); return false; }
    var n = patto.concat([t]); setPatto(n); setStato('Regola aggiunta. Nel patto: ' + n.length + '.');
    if (n.length === 3) p.ctx.festa();
    return true;
  }
  function togli(k) { var t = patto[k]; setPatto(patto.filter(function (_, j) { return j !== k; })); setStato('Regola tolta: ' + t); }
  return html`<div className="a2-patto">
    <div>
      <span className="la-meta">La mia regola</span>
      <p className="ll-hint">Una frase sola, da portare nel patto della classe. Scegliete un inizio e una fine, oppure scrivetela con parole vostre.</p>
      <p className="a2-leg">Quando non sono d’accordo, io…</p>
      <div className="a2-chips" role="group" aria-label="Inizio della regola">${INIZI.map(function (t, k) { return html`<button key=${k} type="button" className="a2-chip" aria-pressed=${ini === k} onClick=${function () { setIni(k); setPropria(''); setStato(''); }}>${t}</button>`; })}</div>
      <p className="a2-leg">…invece di</p>
      <div className="a2-chips" role="group" aria-label="Fine della regola">${FINI.map(function (t, k) { return html`<button key=${k} type="button" className="a2-chip" aria-pressed=${fin === k} onClick=${function () { setFin(k); setPropria(''); setStato(''); }}>${t}</button>`; })}</div>
      <label className="a2-leg" htmlFor="a2-propria">Oppure con parole vostre</label>
      <input id="a2-propria" className="a2-in" value=${propria} maxLength="160" placeholder="Quando non sono d’accordo, io…" onInput=${function (ev) { setPropria(ev.target.value); setStato(''); }} />
      <p className=${'a2-regola' + (regola ? '' : ' is-empty')} aria-live="polite">${regola || 'Scegliete un inizio e una fine, oppure scrivete la regola con parole vostre.'}</p>
      <div className="ll-row" style=${{ marginTop: 13 }}>
        <button type="button" className="ll-btn" disabled=${!regola} onClick=${function () { if (aggiungi(regola)) { setIni(null); setFin(null); setPropria(''); } }}>Aggiungi al patto</button>
        <button type="button" className="ll-link" onClick=${function () { setIni(null); setFin(null); setPropria(''); setStato('Regola cancellata.'); }}>Cancella</button>
      </div>
      <p className="a2-leg" style=${{ marginTop: 21 }}>Suggerimenti per il patto</p>
      <div className="a2-chips">${SUGG.map(function (t, k) { var on = dentro(t); return html`<button key=${k} type="button" className="a2-chip" aria-pressed=${on} onClick=${function () { if (on) { togli(patto.map(a2Norm).indexOf(a2Norm(t))); } else aggiungi(t); }}>${on ? '✓ ' : '+ '}${t}</button>`; })}</div>
      <label className="a2-leg" htmlFor="a2-nuova">Nuova regola</label>
      <form className="a2-in-row" onSubmit=${function (ev) { ev.preventDefault(); if (aggiungi(nuova)) setNuova(''); }}>
        <input id="a2-nuova" className="a2-in" value=${nuova} maxLength="160" autoComplete="off" placeholder="Scrivete una regola e premete Aggiungi" onInput=${function (ev) { setNuova(ev.target.value); }} />
        <button type="submit" className="ll-btn ll-btn--ghost">Aggiungi</button>
      </form>
      <p className="a2-status" aria-live="polite">${stato}</p>
    </div>
    <div className=${'a2-foglio la-card' + (grande ? ' is-big' : '')}>
      <span className="la-meta">Il nostro patto di confronto · ${patto.length === 1 ? '1 regola' : patto.length + ' regole'}</span>
      ${patto.length ? html`<ol>${patto.map(function (t, k) { return html`<li key=${k}><span>${t}</span><button type="button" className="ll-link" aria-label=${'Togli la regola: ' + t} onClick=${function () { togli(k); }}>Togli</button></li>`; })}</ol>`
        : html`<p className="ll-hint">Il patto è ancora vuoto: aggiungete la prima regola. Scegliete insieme da tre a cinque regole.</p>`}
      <div className="ll-row" style=${{ marginTop: 13 }}>
        <button type="button" className="ll-btn" disabled=${!patto.length} aria-pressed=${grande} onClick=${function () { setGrande(!grande); }}>${grande ? 'Riduci' : 'Proietta il patto'}</button>
      </div>
      <p className="ll-hint" style=${{ margin: '13px 0 0' }}>Il patto resta solo su questa pagina: ricopiatelo alla lavagna o sul quaderno.</p>
    </div>
  </div>`;
});

/* ---------- Il percorso dell'anno: ventotto incontri, otto tappe, tre piani da tenere distinti ---------- */
var A2_TAPPE = [
  { k: 'b1', n: 1, r: 'Incontro 1', t: 'Mi fido perché…', d: 'Il racconto dell’estate, il metodo dell’anno e il patto di confronto. Siete qui.', oggi: true },
  { k: 'b2', n: 4, r: 'Incontri 2–5', t: 'Gesù: quali tracce?', d: 'Tacito, Plinio, Giuseppe Flavio, Paolo: che cosa attestano davvero le fonti antiche su Gesù.' },
  { k: 'b3', n: 4, r: 'Incontri 6–9', t: 'Quattro Vangeli, una Pasqua', d: 'Perché quattro racconti; il Samaritano; la Pasqua ebraica e la Cena; Aslan e il racconto pasquale.' },
  { k: 'b4', n: 4, r: 'Incontri 10–13', t: 'Quando credere costa', d: 'Persecuzioni e martiri, le svolte del 313 e del 380, la libertà anche per chi crede diversamente.' },
  { k: 'b5', n: 1, r: 'Incontro 14', t: 'Verifica rovesciata', d: 'Il docente sbaglia apposta: correggete voi, dossier alla mano.' },
  { k: 'b6', n: 4, r: 'Incontri 15–18', t: 'Una comunità che sa riparare', d: 'Gli Atti degli Apostoli, i simboli delle catacombe, un perdono che non rinuncia alla responsabilità.' },
  { k: 'b7', n: 4, r: 'Incontri 19–22', t: 'Concili e immagini', d: 'Parole e immagini che hanno cambiato la cultura: i concili, le icone e i mosaici di Ravenna.' },
  { k: 'b8', n: 6, r: 'Incontri 23–28', t: 'Talenti in gruppo', d: 'Rendere utile ciò che sappiamo fare. In gruppi di 3–4, su un tema libero (musica, sport, disegno, cucina, giochi, manualità…), ognuno mette in risalto ciò che sa fare e il gruppo lo rende utile agli altri.', e: 'Nella parabola di Mt 25,14-30 il «talento» è una somma di denaro: il senso di «capacità» è un uso successivo.' }
];
LabLezione.registra('Programma', function (p) {
  var s = React.useState(null), aperta = s[0], setAperta = s[1];
  var acceso = aperta === null ? 'b1' : A2_TAPPE[aperta].k;
  var celle = [];
  A2_TAPPE.forEach(function (t) { for (var k = 0; k < t.n; k++) celle.push({ b: t.k, first: k === 0 }); });
  return html`<div className="a2-prog">
    <div>
      <div className="a2-strip" aria-hidden="true">${celle.map(function (c, k) { return html`<span key=${k} className=${'a2-cell' + (c.first ? ' first' : '') + (c.b === acceso ? ' is-active' : '')} data-b=${c.b}></span>`; })}</div>
      <div className="a2-legend" aria-hidden="true"><span>Incontro 1</span><span>Incontro 28</span></div>
      <div className="a2-blocchi">${A2_TAPPE.map(function (t, k) {
        var on = aperta === k;
        return html`<button key=${t.k} type="button" className="a2-blocco" data-b=${t.k} aria-expanded=${on} onClick=${function () { setAperta(on ? null : k); p.ctx.say(t.t + ', ' + t.r.toLowerCase() + '.'); }}>
          <small>${t.r}${t.oggi ? html`<em>oggi</em>` : null}</small><b>${t.t}</b>
          ${on ? html`<p>${t.d}${t.e ? html`<span>${t.e}</span>` : null}</p>` : null}
        </button>`;
      })}</div>
    </div>
    <div className="la-card">
      <span className="la-meta">Tre piani che terremo distinti</span>
      <div className="a2-piani">
        <p className="a2-piano"><b>Che cosa attestano le fonti</b><span>conoscenza storica</span></p>
        <p className="a2-piano"><b>Come le interpretiamo</b><span>interpretazione</span></p>
        <p className="a2-piano"><b>Se e come ci crediamo</b><span>adesione di fede</span></p>
      </div>
      <p className="ll-hint" style=${{ margin: 0 }}>Il voto riguarda come usate fonti e ragioni. La fede di ciascuno, o la sua assenza, non è mai oggetto di voto.</p>
    </div>
  </div>`;
});

/* ============================================================
   Giochi (motore LAB-IRC)
   ============================================================ */
LEZIONE.giochi = {
  tema: 'Di chi mi posso fidare? Fatti, opinioni, citazioni e falsi riscontri',
  cat: {
    bins: ['Un fatto', 'Un’opinione', 'Una citazione', 'Falso riscontro'],
    items: [
      ['«Dove posso controllarlo anch’io?»', 0],
      ['Nel 1961 a Cesarea spunta una pietra con il nome di Ponzio Pilato', 0],
      ['«Con quali ragioni lo sostieni?»', 1],
      ['«Io mi fido solo di ciò che vedo con i miei occhi»', 1],
      ['«Chi l’ha detto, dove e quando?»', 2],
      ['«Più studio la scienza…», attribuita a «un premio Nobel»', 2],
      ['«Quanti like ha?»', 3],
      ['«Me l’ha girato un amico: basta?»', 3]
    ]
  },
  vf: [
    { s: 'La pietra con il nome di Pilato fu trovata nel 1961 a Cesarea Marittima.', v: true, why: 'Durante gli scavi di una missione archeologica italiana; oggi è all’Israel Museum di Gerusalemme.' },
    { s: 'L’iscrizione di Cesarea chiama Pilato «procuratore» della Giudea.', v: false, why: 'La pietra dice praefectus, prefetto. È Tacito, negli Annali, a chiamarlo procurator: anche le fonti antiche vanno confrontate.' },
    { s: 'La frase del post attribuita a «un premio Nobel» ha una fonte controllabile.', v: false, why: 'È stata inventata per la lezione: nessun nome, nessuna testata, nessuna data.' },
    { s: 'Dodicimila cuori dicono se una frase è vera.', v: false, why: 'I like dicono quanto una frase circola, non da dove viene né se è vera.' },
    { s: 'Agostino scrisse le Confessioni fra il 397 e il 400 circa.', v: true, why: 'Il brano letto in classe è nel libro VI, capitolo 5, paragrafo 7.' },
    { s: 'Un’opinione si smentisce con un documento.', v: false, why: 'Un’opinione si discute con ragioni ed esempi; il documento serve per un fatto.' }
  ],
  quiz: [
    { q: 'Davanti a una citazione, la prima domanda è…', a: ['«Quanti like ha?»', '«Chi l’ha detta, dove e quando?»', '«Con quali ragioni?»', '«Mi dà ragione?»'], ok: 1, why: 'Prima l’indirizzo, poi il contenuto.' },
    { q: 'Dove si trova oggi la pietra di Pilato?', a: ['Ancora nel teatro di Cesarea', 'In una collezione privata', 'All’Israel Museum di Gerusalemme', 'Nessuno lo sa'], ok: 2, why: 'La scheda della collezione dell’Israel Museum è la fonte che chiunque può consultare.' },
    { q: 'Che cosa diventa l’etichetta «Sei il solito credulone»?', a: ['«Da dove viene questa informazione? Controlliamola insieme.»', '«Voi scettici non credete a niente.»', '«Chi crede ha smesso di ragionare.»', '«Quanti like ha?»'], ok: 0, why: 'Un’etichetta chiude il discorso sulla persona; una domanda lo riapre sull’idea.' },
    { q: 'Un amico sincero ti gira una notizia. Basta per fidarsi?', a: ['Sì, se è un amico', 'Sì, se ha molti like', 'No: può essere in buona fede e sbagliarsi lo stesso', 'No: gli amici inventano sempre'], ok: 2, why: 'La fiducia nella persona non sostituisce il controllo.' },
    { q: 'Il voto in Religione riguarda…', a: ['la fede di ciascuno', 'come usate fonti e ragioni', 'quante regole del patto ricordate', 'quanto si partecipa ai giochi'], ok: 1, why: 'La fede di ciascuno, o la sua assenza, non è mai oggetto di voto.' }
  ],
  abbina: [
    ['Un fatto', '«Dove posso controllarlo?»'],
    ['Un’opinione', '«Con quali ragioni?»'],
    ['Una citazione', '«Chi, dove, quando?»'],
    ['Un falso riscontro', '«Quanti like? Chi me l’ha girato?»'],
    ['Ragioni', 'Chiedo e offro motivi, non slogan'],
    ['Ascolto', 'Prima di rispondere, capisco che cosa ha detto l’altro'],
    ['Responsabilità', 'Controllo prima di condividere']
  ],
  sfida: [
    { q: 'In che anno fu trovata la pietra di Pilato?', a: ['1861', '1961', '2019', '397'], ok: 1 },
    { q: 'Che titolo dà a Pilato l’iscrizione di Cesarea?', a: ['Procuratore', 'Re', 'Prefetto', 'Console'], ok: 2 },
    { q: 'La citazione del post «Più studio la scienza…» è…', a: ['di un premio Nobel', 'di Agostino', 'inventata per la lezione', 'di Tacito'], ok: 2 },
    { q: 'Di chi sono le Confessioni lette in classe?', a: ['Tacito', 'Agostino d’Ippona', 'Ponzio Pilato', 'Un premio Nobel'], ok: 1 },
    { q: 'Quanti incontri ha l’anno?', a: ['14', '20', '28', '30'], ok: 2 },
    { q: 'Le ultime sei ore dell’anno sono dedicate a…', a: ['Talenti in gruppo', 'Verifica rovesciata', 'Concili e immagini', 'Gesù: quali tracce?'], ok: 0 }
  ]
};
