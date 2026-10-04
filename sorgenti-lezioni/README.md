# Sorgenti delle lezioni interattive

Qui stanno i file `lezione.js` da cui si assemblano gli artefatti in `uploads/`
(un unico file HTML autonomo: niente richieste a internet, font inclusi,
mascotte del sito, modalità LIM).

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
| `iv-0-1-accoglienza-vero-possibile-giusto.js` | `iv-0-1-accoglienza-vero-possibile-giusto-artefatto.html` | IV |
| `v-0-1-apertura-il-cuore-inquieto.js` | `apertura-cuore-inquieto-artefatto.html` | V |

I nomi dei file in `uploads/` restano quelli vecchi, così i collegamenti nel
pannello Decap continuano a funzionare. Ogni `*.note.md` racconta come la
lezione originale è stata trasposta nel nuovo formato e che cosa è cambiato.

Il formato di `lezione.js` è descritto in
`design-system/assets/artefatti/skill/references/artefatto.md` e `strumenti.md`.
