# Sorgenti delle lezioni interattive

Qui stanno i file `lezione.js` da cui si assemblano gli artefatti in `uploads/`
(un unico file HTML autonomo: niente richieste a internet, font inclusi,
mascotte del sito, modalità LIM, modalità «in visore» con `?in=visore`).

Per riassemblare una lezione dopo una modifica:

```bash
python3 design-system/assets/artefatti/skill/scripts/build_artefatto_sito.py \
  sorgenti-lezioni/i-0-1-accoglienza-il-nome-e-la-domanda.js \
  -o uploads/accoglienza-classi-1.html --anno 1 \
  --titolo "Il nome e la domanda" --descrizione "Primo giorno, classe I"
```

| Sorgente | Artefatto in `uploads/` | Anno |
|---|---|---|
| `i-0-1-accoglienza-il-nome-e-la-domanda.js` | `accoglienza-classi-1.html` | I |
| `ii-0-1-accoglienza-di-chi-mi-posso-fidare.js` | `accoglienza-mi-fido-perche-artefatto-classe-2.html` | II |
| `iii-0-1-accoglienza-il-mazzo-dell-estate.js` | `accoglienza-terza-mazzo-estate-artefatto.html` | III |
| `iv-0-1-accoglienza-vero-possibile-giusto.js` (⚠ vedi sotto) | `iv-0-1-accoglienza-vero-possibile-giusto-artefatto.html` | IV |
| `v-0-1-apertura-il-cuore-inquieto.js` | `apertura-cuore-inquieto-artefatto.html` | V |

⚠ **Anno IV.** Il file `iv-0-1-accoglienza-vero-possibile-giusto.js` qui presente
**non è la lezione**: è una copia del vecchio `lab-lezione.js` del kit
(27/09/2026), salvata per errore al suo posto. La lezione vera (`window.LEZIONE`
con «Vero, possibile, giusto») esiste solo dentro
`uploads/iv-0-1-accoglienza-vero-possibile-giusto-artefatto.html`, che per
questo non si rigenera e viene trattato come gli artefatti autonomi qui sotto.
Per rimetterlo in riga: estrarre dal file in `uploads/` il blocco
`<script>` che comincia con `/* ---- lezione ---- */`, salvarlo come sorgente e
riassemblare con lo script (`--anno 4`): la lezione estratta si monta senza
errori con il kit attuale.

I nomi dei file in `uploads/` restano quelli vecchi, così i collegamenti nel
pannello Decap continuano a funzionare. Ogni `*.note.md` racconta come la
lezione originale è stata trasposta nel nuovo formato e che cosa è cambiato.
Dopo ogni modifica al kit (`design-system/assets/artefatti/`) o alla mascotte
(`assets/mascotte/lab-mascotte.js`) vanno riassemblati tutti e cinque, perché
il kit è incorporato nel file. Titolo e descrizione da passare allo script sono
il `<title>` (senza « · Lab IRC») e il `<meta name="description">` del file in
`uploads/`.

Gli altri artefatti collegati dal sito (`i-1-1-…`, `ii-1-1-…`, `iii-1-1-…`,
`iv1-1r~1.htm`, `v1-1il~1.htm`) sono file autonomi di una generazione
precedente senza sorgente qui: non si rigenerano; alla mascotte inline e al
`<head>` si applicano solo patch mirate.

Il formato di `lezione.js` è descritto in
`design-system/assets/artefatti/skill/references/artefatto.md` e `strumenti.md`.
