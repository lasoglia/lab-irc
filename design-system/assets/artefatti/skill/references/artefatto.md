# Architettura dell'artefatto di lezione

L'artefatto ha tre modalità, scelte dalla testata:

| Modalità | A che cosa serve | Chi la usa |
|---|---|---|
| **Lezione** | Scene proiettate in sequenza. Il docente spiega, la classe interagisce. È il cuore dell'ora. | Docente alla LIM |
| **Studio** | Testo continuo con le fonti, con i pulsanti «Scarica il testo» e «Stampa». | Studente a casa |
| **Giochi** | Il motore giochi di LAB-IRC: dodici meccaniche, skin arcade o tavolo. | Classe, in pausa o in chiusura |

Studio e Giochi compaiono solo se `LEZIONE.studio` e `LEZIONE.giochi` esistono. Tutto il resto è fornito dal kit: testata con tema giorno/notte e schermo intero, navigazione fra le scene con i pallini, le frecce ←/→ o PagSu/PagGiù, mascotte dell'anno che reagisce alle risposte, alone che segue il cursore, festa discreta per i successi, AMDG.

## Il file `lezione.js`

È un normale script. Definisce `window.LEZIONE` e, se servono, registra componenti propri. I testi accettano `**grassetto**` e `*corsivo*`; i paragrafi si separano con una riga vuota (`\n\n`). Nei titoli, la parola in `*corsivo*` prende il colore dell'anno: usalo per una parola sola.

```js
window.LEZIONE = {
  slug: 'v-1-1-il-cosmo-esaurisce-le-domande',
  classe: 'Anno V',                     // mostrato in testata
  titolo: 'Il cosmo esaurisce *le domande*?',
  sottotitolo: 'Lemaître e le due vie della conoscenza.',
  saluto: 'Ultima tappa: torniamo alla domanda.',   // la mascotte lo dice all'ultima scena
  scene: [
    { momento: 'Apertura', titolo: '…', lead: '…', testo: '…', blocchi: [ /* vedi sotto */ ] },
    // 8 scene (7–9 se il tema lo richiede)
  ],
  studio: { sezioni: [{ titolo: '…', testo: '…' }], fonti: ['…'] },
  giochi: { quiz: [ … ], vf: [ … ], … }   // formato in gioco.md
};
```

Campi della lezione aggiuntivi: `percorsi` (facoltativo: 2–3 alternative complete da 50 minuti, vedi [strumenti.md](strumenti.md)).

Campi della scena: `minuti` (durata stimata, mostrata accanto al momento), `percorsi` (lista degli id in cui la scena compare; senza il campo la scena è comune), `mascotte` (true o false; di default è true sulla prima e sull'ultima scena e mette la mascotte grande a 144 px accanto al titolo, in proporzione 1,618 : 1), `momento` (etichetta breve in capitali lapidarie: Apertura, Spiegazione, Fonte, Pausa, Applicazione, Sintesi, Prova), `titolo`, `lead` (una frase di aggancio), `testo` (prosa breve), `blocchi` (lista). Usa il `momento` solo quando orienta davvero; non serve su ogni scena.

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
| `domanda` | Domanda alla classe, con conteggio per alzata di mano e risultati in percentuale | `q`, `opzioni:[]`, `dibattito?`, `istruzione?` |
| `verifica` | Verifica lampo a scelta multipla con spiegazione dell'esito | `q`, `opzioni:[]`, `ok` (indice), `why`, `etichetta?` |
| `smista` | Una voce alla volta da collocare in una categoria: fatto/interpretazione, posizioni, epoche | `titolo?`, `categorie:[]`, `voci:[{t, c, why}]`, `chiusura?` |
| `mappa` | Mappa radiale: il centro e 3–7 concetti collegati, ciascuno con una spiegazione | `titolo?`, `centro`, `nodi:[{t, d}]`, `istruzione?` |
| `parola` | Etimologia che si scompone al tocco; la radice si illumina | `parola`, `radice?`, `origine`, `significato`, `battuta?` |
| `nota` | Avvertimento o errore frequente, nel riquadro ambra del design system | `t`, `icona?` (default 💡, `''` per nessuna) |
| `mascotte` | La mascotte dell'anno interviene con una battuta, un indizio o una domanda | `t`, `etichetta?` (default «dice»), `nascosta?`, `pulsante?` |
| `immagine` | Figura con didascalia e fonte (file incorporato come `data:` o percorso relativo nel pacchetto) | `src`, `alt`, `didascalia`, `fonte` |
| `gioco` | Invito alla pausa gioco: apre la modalità Giochi sul gioco indicato | `id`, `titolo?`, `testo?`, `pulsante?` |
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

I campi completi e gli esempi dei blocchi nuovi sono in [strumenti.md](strumenti.md), insieme alla guida per sceglierli dal fascicolo.

Regole d'uso:

- In una scena usa **uno o due blocchi** (il blocco `varianti` conta come uno; un `aggancio` non conta). Se ne servono di più, dividi la scena.
- Sullo schermo va solo ciò che gli studenti devono imparare: niente indicazioni di regia, che stanno nelle note del docente. La spiegazione resta sul tema; l'attualità entra come `aggancio` o come variante.
- Il concetto più difficile riceve uno strumento che lo **mostra** (`catena`, `animazione`, `strati` o un componente proprio); almeno un punto della lezione fa **decidere** la classe.
- Le opzioni di `verifica` hanno un ordine fisso: varia la posizione della risposta corretta da una domanda all'altra.
- `domanda` non registra nomi e non attribuisce voti. Per le domande personali non esiste una risposta giusta.
- `smista` e `verifica` spiegano **sempre** il perché, anche quando la risposta è corretta.
- I contenuti di `tappe`, `citazione` e `parola` richiedono fonti controllate (principi). Un'etimologia discussa va presentata come discussa (metodo dei contenuti, § 7).
- Per mostrare la catena causa-effetto il blocco naturale è `rivela`: un anello per passo, con il connettivo nel titolo («Per questo…», «Eppure…»).

## Attività di classe, glossario, cronometro e LIM (kit del 3 ottobre 2026)

Blocchi di `lab-lezione-attivita.js` (stato solo in memoria: voti e parole restano cambiando scena, nulla viene salvato):

- `domanda` / `sondaggio` — `{ id, q, opzioni, etichetta, istruzione, confronta, dibattito }`. Alzata di mano: il docente tocca, «✓ Votato» a ogni tocco, «Annulla l'ultimo», «Azzera» a due tocchi, risultati con % e numero di voti. Con `confronta: 'ingresso'` il sondaggio d'uscita mostra il voto d'inizio come tratteggio d'oro. Solo per opinioni senza risposta giusta.
- `nuvola` — `{ id, q, semi: [...] }`: parole scritte dal docente; la parola ripetuta cresce in scala φ.
- `spettro` — `{ poli: [sx, centro, dx], punti: [{ t, x: 0–100, fuori, etim, def, es }] }`: posizioni su una linea (e chi ne sta fuori); ogni punto entra nel glossario.
- `chi` — «Chi lo dice?»: `{ opzioni: [...], frasi: [{ t, chi, ok, why }] }`.
- `quiz` — `{ domande: [{ q, opzioni, ok, why }] }`: più domande in fila, pallini, stelle alla fine.
- `idee` — `{ idee: [...] }`: tre idee da portare a casa, una alla volta.
- `continua` — `{ voci: [{ t, d, vai: 'giochi' | 'inizio' | numero di scena | url, gioco, principale }] }`.
- `etimo` — `{ parola, parti: [{ t, d }], nessi: ['→', 'o'], spiegazione, etim, def }`: la parola chiave si scompone.
- `agenda` — scaletta cliccabile delle fasi con i minuti (di solito nella prima scena). `timer` è un alias di `consegna` (che ora suona alla fine).

**Fasi e cronometro.** Ogni scena può dichiarare `fase` (Aggancio · Scoperta · Attività · Chiusura): la barra in basso raggruppa i pallini per fase e mostra il cronometro, che parte da solo al primo «Avanti» e confronta il tempo con i `minuti` (in orario, +N′, in anticipo). Senza `fase` si raggruppa per `momento`.

**Parole nuove.** In ogni testo `{parola}` o `{forma|lemma}` diventa una parola sottolineata d'oro: si tocca e mostra etimologia e spiegazione. Le schede vengono da `LEZIONE.glossario` (`{ lemma: { etim, def, parola } }`) e, da sole, dai blocchi `parola`, `etimo` e `spettro`; il pulsante «Glossario» in testata le elenca in ordine alfabetico.

**LIM.** Pulsante «LIM» in testata, tasto L o `?lim=1`: la scena cresce di φ (oltre 1100 px; √φ sotto), testata e barra di √φ; pesi più alti e domande in sans 800. Le proporzioni restano quelle del disegno normale. La barra delle scene non copre mai il contenuto e la mascotte ha la sua corsia a destra. Sul telefono (≤ 720 px) il pulsante LIM non compare e sotto i 480 px il cronometro mostra solo ▶.

**In visore.** Il sito apre l'artefatto in un iframe con sandbox (niente storage) aggiungendo `?in=visore`: il kit mette `data-visore` su `<html>` e la testata si riduce a una riga da 55 px con le sole schede Lezione · Studio · Giochi (e il tema), senza logo, eyebrow, titolo, ⛶ e LIM, che il Visore ha già nella sua barra. Il fumetto della mascotte (`bubble`) dura in proporzione al testo (2618–4181 ms) e si dissolve in 377 ms con la classe `via`.

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
  --titolo "Il cosmo esaurisce le domande?" --descrizione "Lemaître e le due vie" [--skin tavolo] [--css lezione.css]
node scripts/esporta_testo.js lezione.js <slug>-testo.txt
```

Il file assemblato pesa circa 490 KB: React, font, kit, mascotte e logo sono incorporati. Le immagini incorporate aumentano il peso; ridimensionale prima, tenendo ogni figura sotto i 300 KB circa.

Collaudo minimo con un browser automatico (Playwright o equivalente):

1. apertura senza errori in console e senza richieste di rete;
2. tutte le scene con → e con «Avanti»; ogni blocco interattivo provato almeno una volta, con un errore voluto;
3. Studio: download del `.txt`; Giochi: ogni scheda presente si monta;
4. tema chiaro e scuro; larghezza di 360 px con `scrollWidth` uguale alla larghezza della finestra;
5. apertura dentro un iframe con il sandbox descritto in `pubblicazione.md`.

Guarda almeno tre schermate (apertura, una spiegazione, un gioco): la correttezza del codice non garantisce l'impaginazione.
