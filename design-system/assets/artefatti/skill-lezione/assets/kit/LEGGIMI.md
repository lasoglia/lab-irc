# Kit LAB-IRC della skill — versione definitiva (5 ottobre 2026)

Origine: pacchetto **«Lab-Irc»** (Lab IRC Design System, cartella `Lab-IRC-design-system` del 5 ottobre 2026), cartelle `tokens/`, `assets/artefatti/` (lezione, giochi, percezione) e `assets/mascotte/`. Lo script `scripts/build_artefatto.py` incorpora questi file, nell'ordine indicato lì, in un solo HTML offline.

| File | Provenienza |
|---|---|
| `lab-tokens.css` | `tokens/*.css` nell'ordine di `styles.css` (colori, tipografia, spazi, ombre, movimento, percezione, tema chiaro, base), senza `fonts.css`: i font sono incorporati dallo script. |
| `lab-artefatto.css`, `lab-percezione.css`, `giochi.css`, `giochi-2.css`, `lab-lezione-plus.*`, `lab-lezione-attivita.*`, `lab-lezione-percezione.*`, `lab-lezione-lim.css`, `../mascotte/lab-mascotte.js` | identici al design system (versione con modalità visore, 4–5 ottobre). |
| `lab-artefatto.js` | design system + **una riga**: con `lim_lab = 0` salvato toglie `data-lim` (così `--lim` dello script rispetta la scelta del docente). |
| `lab-lezione.js`, `lab-lezione.css` | design system + **barra dei giochi**: in modalità Giochi «Torna alla lezione · scena N» e «Suoni» stanno nella stessa fascia della barra delle scene (`BarraGiochi`, `.ll-nav--giochi`), non più sopra le schede; il ritorno è sempre disponibile. |
| `giochi.js`, `giochi-2.js` | design system + riflessione e voti del sondaggio solo in memoria (`Giochi.mem`) + **contatore dei punti** che arriva al totale entro 610 ms anche quando `requestAnimationFrame` è fermo (visore o scheda nascosta). |
| `lab-lezione-extra.js`, `lab-lezione-extra.css` | **nuovi, solo della skill** (da portare nel design system in `lezione/`): dodici strumenti con costrutti HTML nativi — html, dubbi, scegli, griglia, dialogo, storia, originale, traguardi, prima-dopo, scheda, sintesi, galleria. Dopo `-attivita`, prima di `-lim`. |
| `lab-skill.css` | correzioni della skill, per ultime: cronometro e mascotte sotto i 720 px, stati `:active` mancanti, **palco delle animazioni alla LIM** (`max-height:46vh` e `min-height:240px` di `.lp-stage` divisi per `--ll-z`: lo zoom della LIM li moltiplicava e la didascalia finiva sotto la barra delle scene). |

Da riportare nel design system (`assets/artefatti/`) perché i due restino allineati: `lab-artefatto.js` (riga `lim_lab`), `lezione/lab-lezione.js` e `lezione/lab-lezione.css` (barra dei giochi), `lezione/lab-lezione-extra.js` e `.css` (nuovi), `giochi/giochi.js` (contatore; senza la parte `Giochi.mem`, che è solo della skill), `lezione/lab-lezione-lim.css` (la regola del palco delle animazioni, in fondo a `lab-skill.css`).

Per aggiornare da una nuova versione del design system: copia i file indicati, riapplica le quattro modifiche sopra (cerca `BarraGiochi`, `lim_lab`, `fin = setTimeout`, `Giochi.mem`), rigenera `lab-tokens.css`, assembla `assets/esempio/catalogo-lezione.js` e collauda nel browser: scene, Giochi con ritorno alla scena, suoni, tema, LIM, 360 px.
