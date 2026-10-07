# Architettura dell'artefatto di lezione

L'artefatto ha tre modalità, scelte dalla testata:

| Modalità | A che cosa serve | Chi la usa |
|---|---|---|
| **Lezione** | Scene proiettate in sequenza. Il docente spiega, la classe interagisce. È il cuore dell'ora. | Docente alla LIM |
| **Studio** | Testo continuo con le fonti, con i pulsanti «Scarica il testo» e «Stampa». | Studente a casa |
| **Giochi** | Il motore giochi di LAB-IRC: dodici meccaniche, skin arcade o tavolo. | Classe, in pausa o in chiusura |

Studio e Giochi compaiono solo se `LEZIONE.studio` e `LEZIONE.giochi` esistono. Tutto il resto è fornito dal kit del Lab IRC Design System: testata con modalità, glossario, LIM, tema giorno/notte e schermo intero; barra delle scene con fasi, pallini e cronometro, frecce ←/→ o PagSu/PagGiù; mascotte dell'anno che reagisce alle risposte; alone che segue il cursore, festa discreta per i successi, AMDG.

## Il file `lezione.js`

È un normale script. Definisce `window.LEZIONE` e, se servono, registra componenti propri. I testi accettano `**grassetto**` e `*corsivo*`; i paragrafi si separano con una riga vuota (`\n\n`). Nei titoli, la parola in `*corsivo*` prende il colore dell'anno: usalo per una parola sola.

```js
window.LEZIONE = {
  slug: 'v-1-1-il-cosmo-esaurisce-le-domande',
  classe: 'Anno V',                     // mostrato in testata
  titolo: 'Il cosmo esaurisce *le domande*?',
  sottotitolo: 'Lemaître e le due vie della conoscenza.',
  saluto: 'Ultima tappa: torniamo alla domanda.',   // la mascotte lo dice all'ultima scena
  glossario: { 'cosmologia': { etim: 'dal greco *kósmos*, «ordine, mondo», e *lógos*, «discorso»', def: '…' } },
  scene: [
    { fase: 'Aggancio', momento: 'Apertura', minuti: 4, titolo: '…', lead: '…', testo: '… la {cosmologia} …', blocchi: [ /* vedi sotto */ ] },
    // quante scene servono (di solito 6–12), ciascuna con i suoi minuti: la somma fa 50
  ],
  studio: { sezioni: [{ titolo: '…', testo: '…' }], fonti: ['…'] },
  giochi: { quiz: [ … ], vf: [ … ], … }   // formato in gioco.md
};
```

Campi della lezione: `glossario` (le parole nuove, `{ lemma: { etim, def, parola? } }`: vedi «Parole nuove» più sotto) e `percorsi` (facoltativo: 2–3 alternative complete da 50 minuti, solo se la lezione può svolgersi davvero in modi diversi; vedi [strumenti.md](strumenti.md)).

Campi della scena: `fase` (Aggancio · Scoperta · Attività · Chiusura: raggruppa i pallini della barra e i minuti del cronometro; è un arco, non una casella da riempire), `minuti` (durata prevista, di norma 2–10; la somma per percorso fa 50), `percorsi` (lista degli id in cui la scena compare; senza il campo la scena è comune), `mascotte` (true o false; di default è true sulla prima e sull'ultima scena e mette la mascotte grande a 144 px accanto al titolo, in proporzione 1,618 : 1), `momento` (etichetta breve in capitali lapidarie: Apertura, Spiegazione, Fonte, Pausa, Applicazione, Sintesi, Prova), `titolo`, `lead` (una frase di aggancio), `testo` (prosa breve), `blocchi` (lista). Usa il `momento` solo quando orienta davvero; non serve su ogni scena.

## Blocchi disponibili

Ogni blocco è un oggetto con `tipo`. Scegli il blocco per la **funzione didattica**, non per varietà: la guida è [strumenti.md](strumenti.md).

| `tipo` | Funzione | Campi |
|---|---|---|
| `testo` | Un paragrafo in più dentro la scena | `t` |
| `rivela` | Ragionamento passo per passo; il docente scopre un passaggio alla volta | `titolo?`, `passi:[{titolo, testo}]`, `pulsante?`, `iniziali?` (default 1), `fine?` |
| `tappe` | Linea del tempo esplorabile: ogni data apre la sua scheda | `titolo?`, `voci:[{data, breve?, titolo, testo}]`, `aperta?` |
| `confronto` | Tabella a due colonne svelata riga per riga | `titolo?`, `a`, `b`, `righe:[{criterio, a, b}]`, `pulsante?`, `domanda?`, `tutto?` |
| `carte` | Concetti da girare: termine sul fronte, spiegazione sul retro | `titolo?`, `carte:[{fronte, retro, etichetta?}]` |
| `citazione` | Fonte solenne, con commento che si apre su richiesta | `testo`, `fonte`, `commento?`, `pulsante?` |
| `domanda` | Sondaggio d'opinione per alzata di mano, con risultati in percentuale; d'ingresso e d'uscita con `confronta` | `q`, `opzioni:[]`, `id?`, `confronta?`, `etichetta?`, `dibattito?`, `istruzione?` |
| `verifica` | Verifica lampo a scelta multipla con spiegazione dell'esito | `q`, `opzioni:[]`, `ok` (indice), `why`, `etichetta?` |
| `smista` | Una voce alla volta da collocare in una categoria: fatto/interpretazione, posizioni, epoche | `titolo?`, `categorie:[]`, `voci:[{t, c, why}]`, `chiusura?` |
| `mappa` | Mappa radiale: il centro e 3–7 concetti collegati, ciascuno con una spiegazione | `titolo?`, `centro`, `nodi:[{t, d}]`, `istruzione?` |
| `parola` | Etimologia che si scompone al tocco; la radice si illumina | `parola`, `radice?`, `origine`, `significato`, `battuta?` |
| `nota` | Avvertimento o errore frequente, nel riquadro ambra del design system | `t`, `icona?` (default 💡, `''` per nessuna) |
| `mascotte` | La mascotte dell'anno interviene con una battuta, un indizio o una domanda | `t`, `etichetta?` (default «dice»), `nascosta?`, `pulsante?` |
| `immagine` | Figura con didascalia e fonte (file incorporato come `data:` o percorso relativo nel pacchetto) | `src`, `alt`, `didascalia`, `fonte` |
| `gioco` | La pausa gioco: apre la modalità Giochi sul gioco indicato; «Torna alla lezione» riporta alla stessa scena | `id`, `titolo?`, `testo?`, `pulsante?` |
| `custom` | Componente React scritto per la lezione | `nome`, `props?` |
| `catena` | **Animazione**: anelli causa-effetto che si agganciano; poi «togli un anello» | `anelli:[{nesso?, t, d?, senza?}]`, `rottura?`, `fine?` |
| `animazione` | **Animazione** a fotogrammi chiave: attori che si muovono, frecce che si disegnano | `attori`, `frecce?`, `passi:[{didascalia, attori, frecce?}]`, `rapporto?`, `ritmo?` |
| `strati` | **Animazione**: livelli concentrici con zoom | `livelli:[{t, d}]`, `fine?` |
| `bilancia` | Pesare argomenti; la classe può assegnare il peso | `piatti`, `argomenti:[{t, lato, peso?, nota?}]`, `libero?`, `domanda?` |
| `stima` | Stima della classe, poi il dato documentato | `q`, `min`, `max`, `passo?`, `valore`, `unita?`, `why`, `fonte?` |
| `lente` | Punti da esplorare su un'immagine; «trova il dettaglio» | `src?`, `alt`, `punti:[{x, y, t, d}]`, `trova?` |
| `leggi` | Lettura ravvicinata di una fonte; «trova la frase» | `testo` con `[[frase::glossa]]`, `fonte`, `q?` |
| `ordina` | Ricostruire l'ordine di fasi, passaggi o eventi | `q`, `voci`, `why?` |
| `bivio` | Un caso, più scelte, conseguenze, criterio della fonte | `caso`, `scelte:[{t, esito, tono?}]`, `chiusura?` |
| `varianti` | Il docente sceglie in aula fra attività di pari durata | `opzioni:[{nome, durata, descrizione, quando?, blocchi}]` |
| `aggancio` | Rimando breve chiuso: all'oggi, a un prerequisito, a un limite documentato | `etichetta`, `titolo`, `t`, `fonte?` |
| `consegna` | Lavoro di gruppo o a coppie con cronometro, passi, ruoli e prodotto | `titolo`, `minuti`, `passi`, `ruoli?`, `prodotto?`, `modalita?` |
| `html` · `dubbi` · `scegli` · `griglia` · `dialogo` · `storia` · `originale` · `traguardi` · `prima-dopo` · `scheda` · `sintesi` · `galleria` | **Costrutti HTML nativi** (kit definitivo): markup libero, details, select nel testo, tabella con caselle, dialogo a battute, bivi a più passi, ruby, checkbox + progress, cursore prima/dopo, dialog, contenteditable, scroll-snap | vedi [strumenti.md](strumenti.md) § 4 ter |

I campi completi e gli esempi dei blocchi nuovi sono in [strumenti.md](strumenti.md), insieme alla guida per sceglierli dal fascicolo.

Regole d'uso:

- In una scena usa **uno o due blocchi** (il blocco `varianti` conta come uno; un `aggancio` non conta). Se ne servono di più, dividi la scena. La scena di chiusura può riunire la prova breve e il ritorno alla domanda.
- La **pausa gioco** (blocco `gioco`) c'è sempre, almeno una, nel punto in cui la chiede il contenuto; finito il gioco si torna alla stessa scena con le risposte già date ([gioco.md](gioco.md)).
- Sullo schermo va solo ciò che gli studenti devono imparare: niente indicazioni di regia, che stanno nelle note del docente. La spiegazione resta sul tema; l'attualità entra come `aggancio` o come variante.
- Il concetto più difficile riceve uno strumento che lo **mostra** (`catena`, `animazione`, `strati` o un componente proprio); almeno un punto della lezione fa **decidere** la classe.
- Le opzioni di `verifica` hanno un ordine fisso: varia la posizione della risposta corretta da una domanda all'altra.
- `domanda` non registra nomi e non attribuisce voti. Per le domande personali non esiste una risposta giusta.
- `smista` e `verifica` spiegano **sempre** il perché, anche quando la risposta è corretta.
- I contenuti di `tappe`, `citazione` e `parola` richiedono fonti controllate (principi). Un'etimologia discussa va presentata come discussa (metodo dei contenuti, § 7).
- Per mostrare la catena causa-effetto lo strumento naturale è `catena`: gli anelli si agganciano con il connettivo («Per questo…», «Eppure…») e «Togli un anello» fa vedere che cosa crolla. `rivela` resta per un ragionamento da scoprire passo per passo.

## Attività di classe, glossario, cronometro e LIM (kit del 3 ottobre 2026)

Blocchi di `lab-lezione-attivita.js` (stato solo in memoria: voti e parole restano cambiando scena, nulla viene salvato):

- `domanda` / `sondaggio` — `{ id, q, opzioni, etichetta, istruzione, confronta, dibattito }`. Alzata di mano: il docente tocca, «✓ Votato» a ogni tocco, «Annulla l'ultimo», «Azzera» a due tocchi, risultati con % e numero di voti. Con `confronta: 'ingresso'` il sondaggio d'uscita mostra il voto d'inizio come tratteggio d'oro. Solo per opinioni senza risposta giusta.
- `nuvola` — `{ id, q, semi: [...] }`: parole scritte dal docente; la parola ripetuta cresce in scala φ.
- `spettro` — `{ poli: [sx, centro, dx], punti: [{ t, x: 0–100, fuori, etim, def, es }] }`: posizioni su una linea (e chi ne sta fuori); ogni punto entra nel glossario.
- `chi` — «Chi lo dice?»: `{ opzioni: [...], frasi: [{ t, chi, ok, why }] }`.
- `quiz` — `{ domande: [{ q, opzioni, ok, why }] }`: più domande in fila, pallini, stelle alla fine.
- `idee` — `{ idee: [...] }`: tre idee da portare a casa, una alla volta.
- `continua` — `{ voci: [{ t, d, vai: 'giochi' | 'inizio' | numero di scena | url, gioco, principale }] }`. Un url porta fuori dall'artefatto: usalo solo verso materiali del sito.
- `etimo` — `{ parola, parti: [{ t, d }], nessi: ['→', 'o'], spiegazione, etim, def }`: la parola chiave si scompone.
- `agenda` — scaletta cliccabile delle fasi con i minuti (di solito nella prima scena). `timer` è un alias di `consegna`, che a tempo scaduto emette un breve segnale sonoro.

**Fasi e cronometro.** Ogni scena può dichiarare `fase` (Aggancio · Scoperta · Attività · Chiusura): la barra in basso raggruppa i pallini per fase e mostra il cronometro, che parte da solo al primo «Avanti» e confronta il tempo con i `minuti` (in orario, +N′, in anticipo). Senza `fase` si raggruppa per `momento`.

**Parole nuove.** In ogni testo `{parola}` o `{forma|lemma}` diventa una parola sottolineata d'oro: si tocca e mostra etimologia e spiegazione. Le schede vengono da `LEZIONE.glossario` (`{ lemma: { etim, def, parola } }`) e, da sole, dai blocchi `parola`, `etimo` e `spettro`; il pulsante «Glossario» in testata le elenca in ordine alfabetico. Le voci vengono dalle parole del dossier: etimologia verificata e spiegazione breve, nel registro della classe. Non confondere con `giochi.completa`, dove le graffe segnano i buchi da completare.

**LIM.** Pulsante «LIM» in testata, tasto L o `?lim=1`: la scena cresce di φ (oltre 1100 px; √φ sotto), testata e barra di √φ; pesi più alti e domande in sans 800. Le proporzioni restano quelle del disegno normale. La barra delle scene non copre mai il contenuto e la mascotte ha la sua corsia a destra.

## Componenti propri (React con htm)

Nessuna compilazione: si usa `html` al posto del JSX. Gli hook sono quelli di React (`React.useState`, `React.useEffect`, `React.useRef`). Le classi del kit (`ll-btn`, `ll-btn--ghost`, `ll-link`, `ll-row`, `ll-hint`, `ll-why is-ok|is-ko`, `la-card`, `la-choice`, `ll-tally`) garantiscono stile e stati coerenti.

```js
LabLezione.registra('Bilancia', function (p) {
  var s = React.useState(0), peso = s[0], setPeso = s[1];
  var tilt = Math.max(-13, Math.min(13, peso * 4));
  return html`<div className="la-card" data-flat>
    <p className="ll-hint">${p.istruzione}</p>
    <svg viewBox="0 0 200 90" style=${{ width: '100%', maxWidth: 420 }} aria-hidden="true">
      <g style=${{ transform: 'rotate(' + tilt + 'deg)', transformOrigin: '100px 40px', transition: 'transform 610ms cubic-bezier(.16,1,.3,1)' }}>
        <line x1="20" y1="40" x2="180" y2="40" stroke="var(--lab-oro)" stroke-width="3" />
      </g>
      <path d="M100 42 L88 80 H112 Z" fill="var(--lab-line)" />
    </svg>
    <div className="ll-row">
      ${p.argomenti.map(function (a, i) { return html`<button key=${i} className="ll-btn ll-btn--ghost"
        onClick=${function () { setPeso(peso + a.peso); p.ctx.say(a.commento); }}>${a.t}</button>`; })}
    </div>
  </div>`;
});
// nella scena: { tipo: 'custom', nome: 'Bilancia', props: { istruzione: '…', argomenti: [ … ] } }
```

Per mostrare la mascotte dentro un componente proprio usa `html\`<${LabLezione.Mascotte} size=${89} />\`` (misure 34, 55, 89, 144). Per i pulsanti hai `ll-btn`, `ll-btn--ghost`, `ll-btn--oro` e `ll-btn--solenne`.

Ogni componente riceve `ctx` con `say(testo)` (fa parlare la mascotte visibile), `cheer()`, `oops()`, `festa()` e `gioca(id)`. Si può anche registrare un nuovo tipo di blocco riutilizzabile con `LabLezione.blocco('nome', function (props, ctx) { … })`.

Requisiti di un componente proprio: interazione con `<button>` veri; stati hover, focus-visible e active espliciti, anche attraverso le classi del kit; alternativa ai trascinamenti; nessun effetto che dipenda solo dal colore; uso delle variabili `--la-accent`, `--lab-oro`, `--lab-ink` invece di colori scritti a mano; funzionamento a 360 px.

## Assemblaggio e prova

```bash
python3 scripts/build_artefatto.py lezione.js -o <slug>-artefatto.html --anno 5 \
  --titolo "Il cosmo esaurisce le domande?" --descrizione "Lemaître e le due vie" [--skin tavolo] [--css lezione.css] \
  [--tema chiaro] [--lim] [--senza-mascotte]
node scripts/esporta_testo.js lezione.js <slug>-testo.txt
```

Kit definitivo (5 ottobre 2026): in modalità Giochi la fascia in basso resta e ospita «← Torna alla lezione · scena N» e «Suoni», nella stessa posizione dei comandi della lezione; il ritorno riporta alla scena di partenza con le risposte già date. In visore (`?in=visore`, iframe del sito) la testata si riduce alla riga delle schede. Il menu completo di strumenti, attività, giochi e opzioni è in [strumenti.md](strumenti.md) § 6; il campionario è `assets/esempio/catalogo-lezione.js`.

Il file assemblato pesa circa 620 KB: React, font, kit, mascotte e logo sono incorporati. Le immagini incorporate aumentano il peso; ridimensionale prima, tenendo ogni figura sotto i 300 KB circa.

Collaudo minimo con un browser automatico (Playwright o equivalente):

1. apertura senza errori in console e senza richieste di rete;
2. tutte le scene con → e con «Avanti», in ogni percorso; i minuti sommano 50; ogni blocco interattivo provato almeno una volta, con un errore voluto;
3. la pausa gioco e il ritorno alla stessa scena; le parole nuove e il «Glossario»; la modalità LIM con il pulsante e con il tasto L;
4. Studio: download del `.txt`; Giochi: ogni scheda presente si monta;
5. tema chiaro e scuro; larghezza di 360 px con `scrollWidth` uguale alla larghezza della finestra;
6. apertura dentro un iframe con il sandbox descritto in `pubblicazione.md`.

Guarda almeno tre schermate (apertura, una spiegazione, un gioco), anche in modalità LIM: la correttezza del codice non garantisce l'impaginazione.

Esempi completi, da usare per il formato dei dati e non come struttura da copiare: `assets/esempio/lezione-esempio.js` (attività di classe a fasi, glossario, pausa gioco a metà) e `assets/esempio/esempio-strumenti.js` (lettura della fonte, animazione, catena, laboratorio con tre varianti). Le scelte di fondo stanno in `assets/kit/LEGGIMI.md`.
