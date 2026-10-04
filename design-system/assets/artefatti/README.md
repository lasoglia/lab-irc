<!-- Nel sito Lab IRC i percorsi assoluti partono da /design-system/; da un file in uploads/ usa ../design-system/assets/... -->
# Kit artefatti Lab IRC

Stile condiviso per gli artefatti e i giochi interattivi delle lezioni: stessi colori, font, animazioni, mascotte dell'anno ed easter egg AMDG del sito.

## Uso — 3 righe in ogni artefatto

```html
<link rel="stylesheet" href="/design-system/assets/artefatti/lab-artefatto.css">
<body class="la" data-anno="3">   <!-- 1–5: sceglie colore e mascotte -->
  …
  <script src="/design-system/assets/artefatti/lab-artefatto.js"></script>
</body>
```

Il CSS importa `styles.css` dalla radice del sito: `styles.css` e `tokens/` devono stare lì.

## Modalità LIM (caratteri grandi)

Pulsante **LIM** (aggiunto in automatico, nella barra `.g-tools` dei giochi o in alto a destra), tasto **L**, oppure `?lim=1` nell'indirizzo — la scelta resta salvata (`?lim=0` la toglie). Mette `data-lim` su `<html>`: tutto si ridimensiona in % della larghezza della lavagna (scala Fibonacci/10: 1.3 · 2.1 · 2.67 · 3.4 · 5.5 · 8.9), aree di tocco ≥ 5.5%, domande in Figtree 800, grigi più chiari, niente bagliori. Regole in `lab-percezione.css` (importato da `lab-artefatto.css`). Da JS: `LabArtefatto.lim(true)`.

Regole d'oro per la LIM: una domanda per schermata · max 4 opzioni · frasi sotto i 32 caratteri per riga · un solo pulsante pieno.

## Lezione interattiva (`lezione/`) — versione definitiva

Una lezione è un file di dati (`window.LEZIONE`: scene e blocchi) montato dal motore React + htm, senza compilazione né rete. Tre modalità in testata: **Lezione**, **Studio** (testo da rileggere, scaricabile), **Giochi** (stessi dati, ritorno alla scena). Guscio a tre fasce: testata · scena che scorre · barra delle scene. La barra non copre mai il contenuto e la mascotte ha la sua corsia a destra.

```html
<link rel="stylesheet" href="/design-system/assets/artefatti/lab-artefatto.css">
<link rel="stylesheet" href="/design-system/assets/artefatti/giochi/giochi.css"> <link rel="stylesheet" href="/design-system/assets/artefatti/giochi/giochi-2.css">
<link rel="stylesheet" href="/design-system/assets/artefatti/lezione/lab-lezione.css"> … -plus.css · -percezione.css · -attivita.css · -lim.css
<body class="la g ll" data-anno="3" data-skin="arcade" data-skin-fixed="arcade" data-modo="lezione"><div id="app"></div>
<script src="/design-system/assets/vendor/react.production.min.js"></script> … react-dom · htm.umd.js
<script src="/design-system/assets/artefatti/lab-artefatto.js"></script>
<script src="/design-system/assets/artefatti/lezione/lab-lezione.js"></script> … -plus.js · -attivita.js · -percezione.js
<script src="lezione.js"></script>  <!-- window.LEZIONE -->
<script src="/design-system/assets/artefatti/giochi/giochi.js"></script> <script src="/design-system/assets/artefatti/giochi/giochi-2.js"></script>
<script>LabLezione.avvia();</script>
```

- **Scena**: `{ fase, momento, minuti, titolo: 'Testo *parola in colore*', lead, testo, blocchi: [...] }`. `fase` (Aggancio · Scoperta · Attività · Chiusura) raggruppa i pallini nella barra; i `minuti` alimentano il **cronometro** (parte al primo «Avanti»: in orario / +N′ / in anticipo, pausa, azzera a due tocchi). Somma: 50.
- **Strumenti** (`-plus.js`): catena · animazione a fotogrammi · strati · bilancia · stima · lente · leggi la fonte · ordina · bivio · varianti del laboratorio · consegna con timer · aggancio. Base: testo, rivela, tappe, confronto, carte, citazione, verifica, smista, mappa, parola, immagine, nota, mascotte, gioco.
- **Attività di classe** (`-attivita.js`): `domanda` (sondaggio; `id` + `confronta: 'ingresso'` per il prima/dopo col tratteggio d'oro) · `nuvola` · `spettro` · `chi` (chi lo dice?) · `quiz` (più domande, stelle) · `idee` · `continua` · `etimo` · `agenda`. Voti e parole restano in memoria cambiando scena; nulla viene salvato.
- **Parole nuove (sempre)**: `{parola}` o `{forma|lemma}` in qualunque testo → sottolineatura d'oro puntinata, fumetto con etimologia e spiegazione. Le schede vengono da `LEZIONE.glossario` e, da sole, dai blocchi `parola`, `etimo`, `spettro`; pulsante **Glossario** in testata.
- **LIM**: pulsante in testata, tasto L, `?lim=1`. Scena ×φ (oltre 1100 px; ×√φ sotto), comandi ×√φ: stesse proporzioni, più contrasto, domande in Figtree 800. Sotto i 720 px il pulsante LIM sparisce (come nel sito) e sotto i 480 px il cronometro si riduce al solo pulsante ▶.
- **In visore**: `?in=visore` (lo aggiunge il Visore del sito, un iframe con sandbox senza storage e con la sua barra da 55 px) → `<html data-visore>`: la testata perde logo, «Lab IRC · anno», titolo, ⛶ e LIM e resta una sola riga da 55 px con le schede e il tema; il titolo della lezione resta nel corpo. Da JS: `LabArtefatto.visore`.

Esempi: `ui_kits/lezione/index.html` (religiosità, tutte le attività) · `ui_kits/lezione/benedetto.html` (La misura dei più deboli: animazione, fonte, varianti). Skill per l'HTML offline: `assets/artefatti/skill/` (`build_artefatto.py` incorpora tutto in un file).

**Il sondaggio sta nella lezione, non nei giochi.** Quando conviene: domande d'opinione senza risposta giusta; ripeterlo alla fine con `confronta` mostra se la classe ha cambiato idea. Non conviene: domande con una risposta corretta (usa `verifica` o `quiz`), temi personali delicati da esporre davanti a tutti.

## Classi

- Layout: `.la-stage` · `.la-eyebrow` · `.la-title` (usa `<em>` per la parola colorata) · `.la-lead`
- Scheda reattiva al cursore: `.la-card` (aggiungi `data-flat` per togliere l'inclinazione)
- Pulsanti: `.la-btn` · `.la-btn--ghost` · `.la-btn--gold`
- Quiz: `.la-choices` › `.la-choice` (+ `.is-right` / `.is-wrong` / `.is-dim`), `.la-key`, `.la-progress > i`, `.la-q`, `.la-foot`, `.la-note`, `.la-score`, `.la-row` / `.la-meta`
- Entrata animata: `data-reveal` con `style="--i:2"` per lo scaglionamento

## Giochi della lezione (`giochi/`)

Motore con 12 giochi pronti, tutti alimentati da un solo file di dati per lezione:
Quiz · Vero o falso · Flashcard · Memory · Abbinamenti · Categorie · Linea del tempo · Completa · Cruciverba · Sfida a squadre · Sondaggio · Riflessione.
Suoni (disattivabili), tema chiaro/scuro, punteggi e ultimo gioco salvati. La mascotte esulta (`cheer`) o incoraggia (`oops`) da sola.

```html
<link rel="stylesheet" href="/design-system/assets/artefatti/lab-artefatto.css">
<link rel="stylesheet" href="/design-system/assets/artefatti/giochi/giochi.css">
<link rel="stylesheet" href="/design-system/assets/artefatti/giochi/giochi-2.css">
<body class="g" data-anno="3" data-skin="arcade" data-skin-fixed="arcade">
  … header .g-top, nav .g-tabs con <button data-game-tab="quiz">, <main id="game"> …
  <script src="giochi-dati.js"></script>          <!-- i contenuti della lezione -->
  <script src="/design-system/assets/artefatti/lab-artefatto.js"></script>
  <script src="/design-system/assets/artefatti/giochi/giochi.js"></script>
  <script src="/design-system/assets/artefatti/giochi/giochi-2.js"></script>
</body>
```

Per una nuova lezione copia `ui_kits/giochi/` e riscrivi solo `giochi-dati.js` / `giochi-dati-2.js`. Formato (`window.GIOCHI_DATI`):
- `tema`: titolo · `flash`: [[termine, definizione]] · `memory`: [[a, b]] · `abbina`: [[a, b]]
- `quiz` / `sfida`: [{ q, a: [...], ok: indice, why }] · `vf`: [{ s, v: true/false, why }]
- `seq`: [{ t, y }] in ordine cronologico · `cat`: { bins: [...], items: [[testo, indiceBin]] }
- `completa`: { testo, extra } · `cruci`: { rows, cols, words: [{ n, dir: 'o'|'v', r, c, w, clue }] }
- `sondaggio` · `rifl`: { domanda, poli: [...], spunto }
Togli dal `nav` i pulsanti dei giochi che non ti servono. Skin: `arcade` o `tavolo` (`data-skin-fixed` la blocca).

## Mascotte (easter egg)

`data-anno` → 1 Semino · 2 Ichthy · 3 Navicella · 4 Bussolina · 5 Terra, in basso a destra (web component `<lab-mascotte>` da `/assets/mascotte/` alla radice del sito, caricato in automatico; `data-no-mascotte` sul body per toglierla). Segue il cursore con lo sguardo, parla quando la clicchi (niente AMDG al 7° clic). Scrivere «amdg» apre l'easter egg, solo con «Ad maiorem Dei gloria».

Dal gioco puoi farla parlare: `LabArtefatto.cheer()` (risposta giusta), `LabArtefatto.oops()` (sbagliata), `LabArtefatto.say('…')`. Il fumetto resta in proporzione al testo (2618 ms fino a 30 caratteri, +55 ms a carattere, massimo 4181) e poi si dissolve in 377 ms (classe `via`; con `prefers-reduced-motion` sparisce senza animazione).

Esempi: `ui_kits/artefatto/index.html` (quiz singolo) · `ui_kits/giochi/index.html` (12 giochi).
