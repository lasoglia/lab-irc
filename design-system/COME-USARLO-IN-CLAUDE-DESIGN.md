# Come usare questo design system in Claude Design

Questa cartella è il design system di Lab IRC **aggiornato con tutto il lavoro
fatto sul sito** (ottobre 2026): fascia "vetrata", percorso con sigilli e
anelli, telefono, LIM, visore con schermo intero, santo patrono con lapide,
titoli puliti, kit delle lezioni con modalità «in visore».

## Caricarlo in Claude Design

1. Apri claude.ai/design e il progetto del design system di Lab IRC (oppure creane uno nuovo di tipo *Design system*).
2. Carica il contenuto di questa cartella (puoi trascinare lo zip o la cartella intera).
3. Chiedi a Claude Design di **ricompilare il design system** (il file `_ds_bundle.js` è quello vecchio: le nuove proprietà `compatto`, `tint` e la variante `neutro` compaiono dopo la ricompilazione).
4. Le regole nuove sono in `readme.md`, sezione **"Site rules — October 2026"**: Claude Design le legge da lì.

## Chiedere un artefatto nuovo nello stile giusto

Copia e incolla in Claude Design, cambiando l'argomento:

> Crea una lezione interattiva per l'anno III, unità «I luoghi che cambiano la vita»,
> lezione 3 «…». Usa il kit `assets/artefatti/lezione` e lo skill in
> `assets/artefatti/skill` (formato `lezione.js`), rispettando le regole della
> sezione "Site rules — October 2026" del readme: mascotte dell'anno, modalità
> LIM e «in visore», un solo pulsante pieno per schermata, AMDG solo in latino.
> Restituisci il file `lezione.js` e l'artefatto HTML unico.

Poi carica sul sito il file HTML con la pagina **Importa** (in fondo al sito),
mettendolo in una cartella con il nome della lezione: il titolo «Lezione
interattiva» e l'ordine li mette da sola.

## Se preferisci lavorare direttamente qui

Il file `lezione.js` si può anche salvare in `sorgenti-lezioni/` del repository e
assemblare con lo script descritto in `sorgenti-lezioni/README.md`: il risultato
usa esattamente i caratteri, la mascotte e il kit del sito.
