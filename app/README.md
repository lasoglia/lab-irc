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

## Mascotte in 3D

I modelli stanno in `assets/3d/` e si elencano in `MODELLI_3D` dentro `src/main.jsx`
(1 Semino, 2 Ichthy, 3 Navicella, 4 Bussolina, 5 Terra). Il rosone della home
è `assets/3d/lab-irc-rosone.glb` (`montaRosone3D`): si carica dopo la pagina, solo con
WebGL e senza risparmio dati; altrimenti resta il rosone SVG del design. Il 3D (three.js) è in un file a parte (`assets/app-parti/`)
che si scarica solo nelle pagine che lo mostrano. Prima di aggiungere un modello
conviene comprimerlo (da 1,6 MB a ~230 KB, stesso aspetto):

```bash
npx @gltf-transform/cli dedup in.glb t1.glb
npx @gltf-transform/cli weld t1.glb t2.glb
npx @gltf-transform/cli meshopt t2.glb assets/3d/lab-irc-NOME.glb
```

Le animazioni (`src/mascotte3d.js`) si agganciano ai nomi dei pezzi: `asse` (gira),
`occhio_*_pupilla` (seguono il cursore), `occhio_*` (sbattono), `foglia*` (ondeggiano),
`braccio_*` (salutano al tocco), `coda` e `bolla_N` (Ichthy), `barca` (dondola),
`ago` (punta il cursore). Rosone: `petalo_N` → anno dal materiale `vetro_anno_N`,
`croce`/`medaglione` → A·M·D·G.

## Font

Sono nel sito (`design-system/fonts/`, licenza OFL), non più da Google Fonts:
`design-system/tokens/fonts.css` li dichiara.
