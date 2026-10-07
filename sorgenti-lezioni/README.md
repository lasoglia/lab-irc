# Sorgenti delle lezioni interattive

Da ottobre 2026 le lezioni si scrivono con la skill **«IRC · Artefatto interattivo
della lezione»**, installata in `design-system/assets/artefatti/skill-lezione/`
(leggi lì `SKILL.md`). Il kit è quello definitivo del 5 ottobre 2026 e include
già modalità visore, LIM, telefono, mascotte senza AMDG e AMDG solo in latino.
La lezione-modello scelta dal docente è
`ii-1-2-gesu-quali-tracce-lo-screenshot-non-basta.js`.

Per assemblare una lezione:

```bash
python3 -I design-system/assets/artefatti/skill-lezione/scripts/build_artefatto.py \
  sorgenti-lezioni/<sorgente>.js -o uploads/<file-pubblicato>.html \
  --anno <1-5> --titolo "<titolo>" --descrizione "<una riga>"
node design-system/assets/artefatti/skill-lezione/scripts/esporta_testo.js \
  sorgenti-lezioni/<sorgente>.js sorgenti-lezioni/<sorgente>.testo.txt
```

Per ogni lezione ci sono tre file: il sorgente `.js`, le note del docente
`.docente.md` (scheda, regia, piano dei 50 minuti, traccia orale, soluzioni,
fonti) e il testo di studio `.testo.txt`.

| Sorgente | Artefatto in `uploads/` | Anno |
|---|---|---|
| `i-0-1-accoglienza-il-nome-e-la-domanda.js` | `accoglienza-classi-1.html` | I |
| `ii-0-1-accoglienza-di-chi-mi-posso-fidare.js` | `accoglienza-mi-fido-perche-artefatto-classe-2.html` | II |
| `ii-1-2-gesu-quali-tracce-lo-screenshot-non-basta.js` | `ii-1-2-gesu-quali-tracce-lo-screenshot-non-basta-artefatto.html` | II |
| `iii-0-1-accoglienza-il-mazzo-dell-estate.js` | `accoglienza-terza-mazzo-estate-artefatto.html` | III |
| `iv-0-1-accoglienza-vero-possibile-giusto.js` | `iv-0-1-accoglienza-vero-possibile-giusto-artefatto.html` | IV |
| `v-0-1-apertura-il-cuore-inquieto.js` | `apertura-cuore-inquieto-artefatto.html` | V |

I nomi dei file in `uploads/` restano quelli vecchi, così i collegamenti nel
pannello continuano a funzionare.

Le altre lezioni già pubblicate (`i-1-1-…`, `i-1-2-…`, `ii-1-1-…`, `iii-1-1-…`,
`iii-1-2-…`, `iv1-1r~1.htm`, `iv-1-2-…`, `v1-1il~1.htm`, `v-1-2-…`) non hanno
ancora un sorgente qui: verranno rifatte con la skill una alla volta. Fino ad
allora hanno solo patch mirate (visore, LIM, telefono, mascotte).

Il vecchio script `design-system/assets/artefatti/skill/scripts/build_artefatto_sito.py`
resta per riferimento ma non si usa più per le lezioni nuove.
