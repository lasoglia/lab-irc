# Sorgenti delle lezioni interattive

Da ottobre 2026 le lezioni si scrivono con la skill **«IRC · Artefatto interattivo
della lezione»**, installata in `design-system/assets/artefatti/skill-lezione/`
(leggi lì `SKILL.md`). Il kit è quello definitivo del 5 ottobre 2026 e include
già modalità visore, LIM, telefono, mascotte senza AMDG e AMDG solo in latino.
In fondo a `assets/kit/lab-skill.css` ci sono le correzioni del sito (7 e 8
ottobre 2026: niente vuoto sotto la barra sul telefono, testata del visore su
una riga, animazioni che in LIM stanno in una schermata): dopo una modifica al
kit si ricostruiscono le lezioni con lo stesso comando qui sotto.
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
| `i-1-1-credo-non-credo-non-so.js` | `i-1-1-credo-non-credo-non-so-artefatto.html` | I |
| `ii-0-1-accoglienza-di-chi-mi-posso-fidare.js` | `accoglienza-mi-fido-perche-artefatto-classe-2.html` | II |
| `ii-1-1-gesu-quali-tracce-sotto-l-aquila.js` | `ii-1-1-gesu-quali-tracce-sotto-l-aquila-artefatto.html` | II |
| `ii-1-2-gesu-quali-tracce-lo-screenshot-non-basta.js` | `ii-1-2-gesu-quali-tracce-lo-screenshot-non-basta-artefatto.html` | II |
| `iii-0-1-accoglienza-il-mazzo-dell-estate.js` | `accoglienza-terza-mazzo-estate-artefatto.html` | III |
| `iii-1-1-luoghi-che-cambiano-la-vita-regola-di-benedetto.js` | `iii-1-1-luoghi-che-cambiano-la-vita-regola-di-benedetto-artefatto.html` | III |
| `iv-0-1-accoglienza-vero-possibile-giusto.js` | `iv-0-1-accoglienza-vero-possibile-giusto-artefatto.html` | IV |
| `iv-1-1-riformare-una-chiesa-indulgenze.js` | `iv1-1r~1.htm` | IV |
| `v-0-1-apertura-il-cuore-inquieto.js` | `apertura-cuore-inquieto-artefatto.html` | V |
| `v-1-1-le-due-vie-di-lemaitre.js` | `v1-1il~1.htm` | V |

I nomi dei file in `uploads/` restano quelli vecchi, così i collegamenti nel
pannello continuano a funzionare. I fascicoli PDF accanto agli artefatti non
sono stati rifatti.

Le lezioni 2 delle UDA (`i-1-2-…`, `iii-1-2-…`, `iv-1-2-…`, `v-1-2-…`, oltre a
`ii-1-2-…` qui sopra) sono già nello stile della lezione-modello e il docente
ha chiesto di non toccarle: le prime quattro non hanno un sorgente qui e vanno
lasciate come sono.

Il vecchio script `design-system/assets/artefatti/skill/scripts/build_artefatto_sito.py`
resta per riferimento ma non si usa più per le lezioni nuove.
