# Il cuore inquieto — Anno V · conversione in `lezione.js`

Sorgente: `uploads/apertura-cuore-inquieto-artefatto.html` (15 slide + Studio in 6 sezioni + scheda Esercizio). Destinazione: `lezioni/acc5/lezione.js`, slug `v-0-1-apertura-il-cuore-inquieto`. 9 scene, 50 minuti, fasi Aggancio · Fonte · Attività · Scoperta · Chiusura.

## Mappa sezione originale → scena / blocco

| Originale (slide o § Studio) | Scena | Blocco | Minuti |
|---|---|---|---|
| Slide «Alla lavagna» · § 1 (indice) | 1 · Il cuore *inquieto* | lead con le cinque parole latine; `agenda` (scaletta dalle fasi) | 3 |
| Slide «Chi le ha scritte» · § 1 (citazione e commento) | 2 · Non un diario: un *esame* | `citazione` Confessioni I,1,1 con `commento` (testo di § 1) | 8 |
| Slide «Che cosa sono le Confessioni» · § 2 | 2 | `rivela` a tre passi (fatto / evitato / desiderava senza saperlo), libro X nel terzo passo, il pull-quote come `fine` detto dalla mascotte | — |
| Slide «La consegna» · Riga 1, 2, 3 · § 3 · scheda Esercizio | 3 · Tre righe, nessun *nome* | custom `TreRighe` (le tre consegne si mostrano una alla volta, con i testi esatti; «Versione scritta» = la scheda Esercizio, tre textarea in memoria) + `consegna` 8 minuti con i tre passi | 10 |
| Slide «Come si legge» · § 3 (anonimato) | 4 · La riga di un *altro* | `consegna` 9 minuti (lettura senza commenti, «passo» senza motivo, scatola) + `nota` sull'anonimato | 10 |
| Slide «Perché si comincia da qui» · § 4 | 5 · Tre operazioni, non un *gioco* | `rivela` (scelto / riconosciuto un limite / sperato), `fine` «Nessuna macchina…»; `aggancio` «Oggi» con la frase sul modello linguistico | 4 |
| Slide «La domanda dell'anno» + «Il metodo, in tre verbi» · § 5 | 6 · Chi ha l'*ultima* parola? | `carte` (Come / Perché / Fino a dove → scienza / fede / etica) + `smista` «Dove scivola il verbo?» con i due scivolamenti descritti in § 5 e le due frasi corrette | 6 |
| Slide «L'anno, in cinque domande I–II» · § 6 | 7 · L'anno, in cinque *domande* | custom `Programma` (le cinque domande + Talenti, con le descrizioni di § 6) | 4 |
| Slide «Il patto» · § 6 (patto + Gaudium et spes) | 8 · Un'ora a *settimana* | `idee` (i tre punti del patto) + `citazione` GS 16 con `commento` | 3 |
| Slide «Chiusura» · § 6 (scatola, Fides et ratio) | 9 · Le due *ali* | `citazione` Fides et ratio + `continua` (La scatola · Prossima tappa · Da capo) | 2 |
| Studio § 1–6 | modalità Studio | 6 sezioni riportate integralmente (citazioni incluse), `fonti` | — |
| Note per il docente | commento in testa a `lezione.js` | non renderizzate (il kit non ha un campo docente) | — |

## Scelte e piccoli adattamenti

- **Giochi**: omessi. La sorgente non ha quiz, vero/falso o abbinamenti; non ho inventato materiale. Lo `smista` dei tre verbi è l'unico esercizio a risposta chiusa, ed è costruito solo con le frasi di § 5 (i due scivolamenti) e le due definizioni dei verbi.
- **Scheda Esercizio** (tab a sé nell'originale): il kit ha solo Lezione/Studio/Giochi, quindi la versione scritta vive dentro `TreRighe` (scena 3), dietro il pulsante «Versione scritta». Il pulsante «Stampa» è diventato «Scarica le mie tre righe» (.txt): il kit non ha un CSS di stampa dedicato e `window.print()` avrebbe stampato tutta la pagina. Nulla viene salvato (stato in memoria).
- **«Per riflettere»** (le due domande di § 3): restano nello Studio; in aula non c'era spazio per un terzo blocco nella scena della lettura.
- **Programma**: per le domande 4 e 5 la sorgente non dà alcuna descrizione, quindi la scheda mostra solo la domanda. Per la 3 ho usato il rimando di § 3 (raccontare/vivere → unità sugli algoritmi); per Talenti ho aggiunto il rimando alla scatola che si riapre a maggio (§ 6).
- **Glossario** (5 voci: inquieto, Confessioni, Dottore della Chiesa, algoritmo, coscienza): etimologie standard non presenti nell'originale; le definizioni riprendono il testo della lezione. Da togliere se non si vogliono aggiunte.
- **Regia** tolta dallo schermo e lasciata nel commento in testa al file (foglietti A5, scatola, silenzio, mescolare davanti alla classe, agganciare almeno due attese alle cinque domande).
- Il titolo con la parola in corsivo è «Il cuore *inquieto*»; `saluto` finale: «Ultima tappa: i foglietti vanno nella scatola.»

## Verifica

- `node --check` superato; caricamento con stub: 9 scene, 50 minuti, ≤ 2 blocchi per scena, un solo corsivo per titolo, componenti `TreRighe` e `Programma` registrati.
- **Non collaudato in un browser**: `build_artefatto.py` si ferma perché nel checkout manca l'intera cartella `skill/assets/` (cerca `assets/fonts/cinzel-latin-600-normal.woff2`; i font esistono solo in `design-system/fonts/`). È un problema dell'ambiente, non del file di lezione; non c'è neppure un browser headless. Resta da fare la prova reale a 360 px e in LIM.
