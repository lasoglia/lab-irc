---
name: irc-gioco-interattivo
description: Crea l'artefatto interattivo di una lezione IRC di 50 minuti, cuore della lezione. Contiene spiegazione a scene in React, giochi e testo di studio, nello stile LAB-IRC (Notte Studio, φ, mascotte dell'anno), in un unico HTML offline per il sito. Usala per lezioni interattive, spiegazioni animate, giochi, quiz e artefatti HTML, anche senza PDF né slide.
---

# IRC · Artefatto interattivo della lezione

Produci l'**artefatto interattivo della lezione**: la pagina che il docente proietta sulla LIM e che guida l'intera ora. Contiene la **spiegazione a scene**, le attività, i giochi e il testo di studio. È il prodotto centrale della lezione. Il fascicolo PDF è il materiale di studio; le slide sono facoltative. Classi I–V della secondaria di secondo grado. Autore: Matteo Sestili. Lingua italiana.

La skill è autonoma. Non richiede le altre skill IRC, una programmazione annuale o materiali già prodotti. Se il docente chiede anche fascicolo o slide, le altre skill possono lavorare in qualsiasi ordine sullo stesso dossier dei contenuti e sulla stessa scheda di lezione.

## Prima di progettare

Leggi, in quest'ordine:

1. [principi e lezione di 50 minuti](references/principi-e-lezione.md): identità, rigore sulle fonti, calibrazione e 50 minuti reali;
2. [metodo dei contenuti](references/metodo-contenuti.md): la parte teorica, cioè dispense e fonti, catena causa-effetto, concetti, etimologie, fede della Chiesa con onestà, registro per l'età;
3. [architettura dell'artefatto](references/artefatto.md): scene, blocchi, componenti React, formato di `lezione.js`, assemblaggio;
4. [stile LAB-IRC](references/stile-lab-irc.md): colori, caratteri, φ, **mascotte dell'anno**, logo, pulsanti, movimento, cose da evitare. Lo stile è **obbligatorio** per ogni artefatto. Il design system completo, dal pacchetto «Lab-Irc», è in [lab-irc-design-system.md](references/lab-irc-design-system.md);
5. [scegliere gli strumenti dal fascicolo](references/strumenti.md): come si passa dagli anelli del dossier agli strumenti (animazioni, catene, strati, lettura delle fonti, bilancia, bivio, varianti, percorsi), con il riferimento dei blocchi nuovi. È la guida che rende ogni artefatto **su misura**;
6. [giochi](references/gioco.md): meccaniche, collocazione, formato dei dati del motore giochi;
7. [attenzione e stile](references/attenzione-e-stile.md): come la pagina guida lo sguardo, cosa evitare, controllo prima della consegna;
8. [consegna sul sito](references/pubblicazione.md).

Dalla conversazione e dalla cartella ricava tema, classe, UDA, domanda della lezione e fonti. Se la lezione ha un dossier dei contenuti (`docente/…-contenuti.md`), parti da quello. Se la classe manca e non si può dedurre, chiedila: cambiano linguaggio, contenuti e colore dell'anno. Il resto va ricavato; dichiara le assunzioni nelle note del docente.

## Progettazione

1. Stabilisci i contenuti: usa il dossier della lezione o costruiscilo con il metodo (domanda, catena causa-effetto, concetti, parole, fonti controllate). Poi scrivi la scheda della lezione (reference dei principi) con obiettivo osservabile, fraintendimenti da smontare e piano dei 50 minuti.
2. **Regia degli strumenti.** Prima di scrivere le scene, compila la tabella di [strumenti.md](references/strumenti.md): per ogni anello della catena, che cosa deve capire la classe, perché è difficile, quale strumento lo fa capire e quale alternativa esiste. Il concetto più difficile riceve lo strumento più forte (di norma un'animazione o un componente proprio); la fonte principale si legge davvero; c'è almeno un punto in cui decide la classe. Non esiste una sequenza standard di blocchi: due lezioni su temi diversi non devono avere la stessa struttura.
3. Traduci il piano in **6–10 scene**, ciascuna con `minuti` (somma 50 per ogni percorso). La mascotte dell'anno apre e chiude la lezione (copertina della prima e dell'ultima scena) e può intervenire nelle scene con il blocco `mascotte`. Ogni scena corrisponde a un momento dell'ora: apertura, spiegazione, fonte, pausa, applicazione, sintesi, prova finale. Le scene di spiegazione sono il cuore: seguono gli anelli della catena, uno o due per scena, e ogni passaggio dichiara il suo *perché*. Ogni anello difficile viene **mostrato facendo**, con lo strumento scelto nella regia: catena, animazione a fotogrammi, strati, lettura ravvicinata, lente, bilancia, bivio, stima, ordina, oltre ai blocchi di base (rivelazione progressiva, linea del tempo, confronto, mappa, parola, carte, citazione commentata). Le parole scelte per l'etimologia usano il blocco `parola`. Evita il testo lungo sullo schermo: in una scena stanno al massimo circa 60 parole di prosa, il resto lo dice il docente. Lo schermo mostra solo ciò che gli studenti devono imparare; la spiegazione resta sul tema e l'attualità entra come rimando (`aggancio`), mai al posto dell'argomento. Applica i criteri Gestalt di [strumenti.md](references/strumenti.md). Testi sullo schermo e traccia orale seguono il registro della classe: mai banale, mai colloquiale.
4. Inserisci **4–6 momenti di partecipazione** brevi e integrati nel contenuto, con esito visibile per la classe. Prevedi un **laboratorio** di 8–10 minuti con 2–3 `varianti` di pari durata fra cui il docente sceglie in aula, e, se la lezione può svolgersi in modi davvero diversi, 2–3 `percorsi` completi da 50 minuti. La pausa gioco (blocco `gioco`) è una delle possibili varianti, non un obbligo aggiuntivo: finito il gioco si torna alla stessa scena. La varietà disponibile non si somma: se ne svolge una.
5. Prevedi la **prova finale** di comprensione e il ritorno alla domanda iniziale. Non si assegna un punteggio alle convinzioni personali.
6. Scrivi la **modalità Studio**, cioè il testo continuo che lo studente rilegge a casa. Contiene gli stessi contenuti delle scene in prosa ordinata, con i nessi della catena espliciti e le fonti. Il pulsante «Scarica il testo» ne produce il file `.txt`.
7. Dai carattere all'artefatto con almeno **un componente su misura** (`LabLezione.registra`) quando nessuno strumento del kit rende bene l'idea del fascicolo: una pianta cliccabile, un esperimento mentale, un oggetto che si costruisce passo per passo, un'animazione SVG o canvas propria. Hai piena libertà di scegliere e inventare lo strumento adatto, nei vincoli di stile, accessibilità e assenza di rete. La lezione deve risultare dinamica e accattivante, mai infantile.

## Realizzazione

Scrivi **solo** il file `lezione.js` (dati delle scene, testo di studio, dati dei giochi e componenti propri) e assemblalo con lo script incluso:

```bash
python3 <skill>/scripts/build_artefatto.py lezione.js -o <slug>-artefatto.html \
  --anno <1-5> --titolo "<titolo>" --descrizione "<una riga>"
```

Poi esporta il testo di studio con `node <skill>/scripts/esporta_testo.js lezione.js <slug>-testo.txt`; se Node manca, salva il file dal pulsante «Scarica il testo».

Lo script incorpora React 18, htm, font, token, kit LAB-IRC (alone, schede reattive, pulsanti magnetici, AMDG), la mascotte 2D dell'anno (`<lab-mascotte>`), il logo e motore dei giochi in **un solo HTML offline**, senza CDN né richieste di rete. Non riscrivere a mano il kit e non cambiare palette, caratteri o proporzioni: si personalizza soltanto con il contenuto, con i componenti propri e, se serve, con un piccolo CSS di lezione (`--css`) che usa i token esistenti.

Un file di esempio completo è in `assets/esempio/lezione-esempio.js`. Parti da quello per la struttura, non per i contenuti.

Vincoli: nessun account, cookie, dato personale o chiamata di rete. Lo stato è in memoria; `localStorage` è ammesso soltanto per le preferenze già gestite dal kit (tema `tema_lab`, suoni, ultima scheda gioco), sempre protetto da try/catch. Non salvare mai risposte, riflessioni o nomi degli studenti. Tutto deve funzionare con tastiera, tocco e mouse, a 360 px e alla LIM, con `prefers-reduced-motion`.

## Verifica e consegna

Prova l'artefatto in un browser reale: tutte le scene con le frecce e con i pulsanti, in ogni percorso; ogni animazione fotogramma per fotogramma, anche a 360 px; ogni variante del laboratorio; il ritorno alla scena di partenza dopo la pausa gioco; ogni blocco con un errore e una risposta corretta; lo Studio con il download; ogni gioco presente; il tema chiaro e quello scuro; la larghezza di 360 px senza scorrimento orizzontale; l'iframe con il sandbox della reference di pubblicazione. Controlla che la console non mostri errori e che non partano richieste di rete. Se non puoi eseguire la prova, dichiaralo: un'ispezione del codice non vale come collaudo.

Consegna:

- `<slug>-artefatto.html`, il prodotto principale da caricare sul sito;
- `<slug>-testo.txt`, lo stesso testo della modalità Studio, da caricare a parte;
- `docente/<slug>-lezione.js`, il sorgente per revisioni successive;
- `docente/<slug>-contenuti.md`, se il dossier dei contenuti non esisteva e lo hai costruito;
- `docente/<slug>-artefatto-docente.md`, con la scheda della lezione, la **regia degli strumenti** (tabella anelli → strumenti, con motivazione), i percorsi con la somma dei minuti, le varianti del laboratorio con «quando sceglierla», il piano minuto per minuto con le scene, la traccia orale di ogni scena, le soluzioni, le varianti senza proiettore e le fonti;
- il record di catalogo per il file effettivamente prodotto.

Non fermarti a una descrizione o a un prototipo con pulsanti inerti.
