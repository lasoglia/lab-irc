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
| `v-0-1-apertura-il-cuore-inquieto.js` | `apertura-cuore-inquieto-artefatto.html` | V |

I nomi dei file in `uploads/` restano quelli vecchi, così i collegamenti nel
pannello Decap continuano a funzionare. Ogni `*.note.md` racconta come la
lezione originale è stata trasposta nel nuovo formato e che cosa è cambiato.
Dopo ogni modifica al kit (`design-system/assets/artefatti/`) o alla mascotte
(`assets/mascotte/lab-mascotte.js`) vanno riassemblati tutti e quattro, perché
il kit è incorporato nel file. Titolo e descrizione da passare allo script sono
il `<title>` (senza « · Lab IRC») e il `<meta name="description">` del file in
`uploads/`.

Gli altri artefatti collegati dal sito (`iv-0-1-accoglienza-vero-possibile-giusto-artefatto.html`
per l'accoglienza dell'anno IV, `i-1-1-…`, `ii-1-1-…`, `iii-1-1-…`,
`iv1-1r~1.htm`, `v1-1il~1.htm`) sono file autonomi di una generazione
precedente senza sorgente qui: non si rigenerano; alla mascotte inline e al
`<head>` si applicano solo patch mirate (modalità «in visore», LIM, telefono).
Se un giorno servirà modificare la lezione dell'anno IV, il suo testo sta nel
blocco `<script>` che comincia con `/* ---- lezione ---- */` dentro il file in
`uploads/`: si estrae, si salva qui come sorgente e si riassembla con `--anno 4`.

Il formato di `lezione.js` è descritto in
`design-system/assets/artefatti/skill/references/artefatto.md` e `strumenti.md`.
