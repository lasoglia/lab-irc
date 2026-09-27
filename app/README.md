# app/ — il sito in React

Il sito (`index.html`) carica un solo file già pronto: `assets/app.js` (+ `assets/app.css`).
Quel file si genera da qui e **va ricompilato solo quando si cambia il codice o il design**.
Chi aggiorna i contenuti da Decap non deve fare niente: il sito legge `data/*.json` da solo.

- `src/main.jsx` — le pagine, ricopiate dal modello di Claude Design
  (`design-system/ui_kits/main-site/index.html`) e collegate ai dati veri.
- `src/dati.js` — lettura dei contenuti di Decap (anni, UDA, lezioni, materiali, strumenti, video).
- `src/app.css` — telefono, tocco, visore degli artefatti, "riduci movimento".
- I componenti (YearCard, Card, Button, Badge, Chip, YearMascot, AmdgEgg, Amdg) sono
  importati **così come sono** da `../design-system/components/`.

## Ricompilare

```bash
cd app
npm install      # la prima volta
npm run build    # scrive ../assets/app.js e ../assets/app.css
```

## Nuovo design da Claude Design

Si esporta lo zip, si sostituisce il contenuto di `design-system/` e si rilancia `npm run build`.

## Mascotte

Disegnate in SVG, stile anime, in `design-system/components/brand/mascotte-arte.js`
(usato da `YearMascot.jsx`). Il kit degli artefatti
(`design-system/assets/artefatti/lab-artefatto.js`) ne contiene una copia: se si
cambia il disegno, aggiornare entrambi.

## Font

Sono nel sito (`design-system/fonts/`, licenza OFL), non più da Google Fonts:
`design-system/tokens/fonts.css` li dichiara.
