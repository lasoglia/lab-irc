# Kit artefatti Lab IRC

Stile condiviso per gli artefatti e i giochi interattivi delle lezioni: stessi colori, font, animazioni, mascotte dell'anno ed easter egg AMDG del sito.

## Uso — 3 righe in ogni artefatto

```html
<link rel="stylesheet" href="/assets/artefatti/lab-artefatto.css">
<body class="la" data-anno="3">   <!-- 1–5: sceglie colore e mascotte -->
  …
  <script src="/assets/artefatti/lab-artefatto.js"></script>
</body>
```

Il CSS importa `styles.css` dalla radice del sito: `styles.css` e `tokens/` devono stare lì.

## Classi

- Layout: `.la-stage` · `.la-eyebrow` · `.la-title` (usa `<em>` per la parola colorata) · `.la-lead`
- Scheda reattiva al cursore: `.la-card` (aggiungi `data-flat` per togliere l'inclinazione)
- Pulsanti: `.la-btn` · `.la-btn--ghost` · `.la-btn--gold`
- Quiz: `.la-choices` › `.la-choice` (+ `.is-right` / `.is-wrong` / `.is-dim`), `.la-key`, `.la-progress > i`, `.la-q`, `.la-foot`, `.la-note`, `.la-score`, `.la-row` / `.la-meta`
- Entrata animata: `data-reveal` con `style="--i:2"` per lo scaglionamento

## Mascotte (easter egg)

`data-anno` → 1 Semino · 2 Ichthy · 3 Navicella · 4 Bussolina · 5 Terra, in basso a destra. Segue il cursore con lo sguardo, parla quando la clicchi e al 7° clic mostra AMDG. Anche scrivere «amdg» apre l'easter egg.

Dal gioco puoi farla parlare: `LabArtefatto.cheer()` (risposta giusta), `LabArtefatto.oops()` (sbagliata), `LabArtefatto.say('…')`.

Esempio completo: `ui_kits/artefatto/index.html`.
