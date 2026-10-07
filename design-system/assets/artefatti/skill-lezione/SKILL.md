---
name: irc-gioco-interattivo
description: Crea l'artefatto interattivo di una lezione IRC di 50 minuti, cuore della lezione, costruito su misura del contenuto. Contiene spiegazione a scene in React, strumenti e attività di classe, pausa gioco e testo di studio, nello stile del Lab IRC Design System (Notte Studio, φ, mascotte dell'anno, modalità LIM), in un unico HTML offline per il sito. Usala per lezioni interattive, spiegazioni animate, giochi, quiz e artefatti HTML, anche senza PDF né slide.
---

# IRC · Artefatto interattivo della lezione

Produci l'**artefatto interattivo della lezione**: la pagina che il docente proietta sulla LIM e che guida l'intera ora. Contiene la **spiegazione a scene**, le attività, i giochi e il testo di studio. È il prodotto centrale della lezione. Il fascicolo PDF è il materiale di studio; le slide sono facoltative. Classi I–V della secondaria di secondo grado. Autore: Matteo Sestili. Lingua italiana.

La skill è autonoma. Non richiede le altre skill IRC, una programmazione annuale o materiali già prodotti. Se il docente chiede anche fascicolo o slide, le altre skill possono lavorare in qualsiasi ordine sullo stesso dossier dei contenuti e sulla stessa scheda di lezione.

## Prima di progettare

Leggi, in quest'ordine:

1. [principi e lezione di 50 minuti](references/principi-e-lezione.md): identità, rigore sulle fonti, calibrazione e 50 minuti reali;
2. [metodo dei contenuti](references/metodo-contenuti.md): la parte teorica, cioè dispense e fonti, catena causa-effetto, concetti, etimologie, fede della Chiesa con onestà, registro per l'età;
3. [architettura dell'artefatto](references/artefatto.md): scene, fasi e minuti, blocchi, attività di classe, glossario, cronometro, LIM, componenti React, formato di `lezione.js`, assemblaggio;
4. [scegliere gli strumenti dal dossier](references/strumenti.md): la **regia degli strumenti**, cioè come si passa dagli anelli della catena agli strumenti (animazioni, catene, strati, lettura delle fonti, bilancia, bivio, varianti, percorsi), con il riferimento dei blocchi. È la guida che rende ogni artefatto **su misura**. Il suo § 6 è il **catalogo** completo di strumenti, attività, giochi e opzioni fra cui scegliere; il campionario assemblabile è `assets/esempio/catalogo-lezione.js`;
5. [stile LAB-IRC](references/stile-lab-irc.md): colori, caratteri, φ, **mascotte dell'anno**, logo, pulsanti, movimento, LIM, cose da evitare. Lo stile è **obbligatorio** per ogni artefatto. Il design system completo, dal pacchetto «Lab-Irc» del 3 ottobre 2026, è in [lab-irc-design-system.md](references/lab-irc-design-system.md);
6. [giochi](references/gioco.md): pausa gioco, meccaniche, collocazione, formato dei dati del motore giochi;
7. [attenzione e stile](references/attenzione-e-stile.md): come la pagina guida lo sguardo, cosa evitare, controllo prima della consegna;
8. [consegna sul sito](references/pubblicazione.md).

Dalla conversazione e dalla cartella ricava tema, classe, UDA, domanda della lezione e fonti. Se la lezione ha un dossier dei contenuti (`docente/…-contenuti.md`), parti da quello. Se la classe manca e non si può dedurre, chiedila: cambiano linguaggio, contenuti e colore dell'anno. Il resto va ricavato; dichiara le assunzioni nelle note del docente.

## Una lezione su misura, in 50 minuti

Non esiste una struttura fissa: né un numero di scene stabilito, né una sequenza standard di blocchi. Si parte dal **tempo**, cioè 50 minuti, e dal **contenuto** del dossier, e si costruisce la lezione che serve a quel tema, perché i ragazzi imparino tutto l'essenziale divertendosi.

**Sempre fisso**

1. **50 minuti esatti.** Ogni scena dichiara i suoi `minuti` e la somma fa 50 (per ogni percorso, se ce n'è più d'uno). Il cronometro della barra confronta il piano con il tempo reale. Se il contenuto non ci sta, togli un nucleo secondario: non comprimere tutto.
2. **Tutto l'essenziale del dossier.** Ogni anello della catena, ogni concetto e ogni parola chiave compare in almeno una scena e nello Studio. La prova finale controlla quelli decisivi.
3. **Il divertimento c'è sempre.** Almeno una **pausa gioco** presa dal motore giochi (blocco `gioco`, 5–8 minuti compresa la restituzione), con ritorno alla scena da cui si era partiti. Ogni lezione interattiva include sempre **Sfida a squadre**, con dati non vuoti in `LEZIONE.giochi.sfida`: può essere il gioco della pausa oppure una scheda aggiuntiva. Un'attività chiamata «sfida» nelle scene non sostituisce questo gioco. Se si svolge nell'ora, il tempo rientra nei 50 minuti. Il resto del divertimento sta dentro le scene: attività di classe, la mascotte, la festa per i traguardi veri.
4. **La classe agisce spesso.** Mai più di circa 10 minuti di solo ascolto: di norma sono 4–6 momenti brevi con un esito visibile a tutti.
5. **La chiusura** è una prova breve di comprensione con il ritorno alla domanda iniziale.

**Deciso dal contenuto**

- **Quante scene:** quelle che servono, ciascuna di 2–10 minuti (di solito tra 6 e 12). Le fasi (`fase`: Aggancio · Scoperta · Attività · Chiusura) disegnano un arco, non caselle da riempire: un'attività può stare dentro la Scoperta.
- **Quali strumenti:** li sceglie la regia di [strumenti.md](references/strumenti.md). Il tipo di difficoltà di ogni anello decide lo strumento; il concetto più difficile riceve lo strumento più forte; nessun tipo di blocco interattivo compare più di due volte (salvo `verifica`).
- **Dove va la pausa gioco e quale:** in apertura, se bisogna attivare ciò che i ragazzi già sanno; a metà, se serve cambiare ritmo dopo il nucleo più denso; in chiusura, se serve ripassare. La meccanica segue il contenuto ([gioco.md](references/gioco.md)): le date vanno sulla linea del tempo, i concetti vicini nelle categorie, gli equivoci nel vero/falso.
- **Laboratorio e percorsi:** un laboratorio con 2–3 `varianti` di pari durata solo quando il tema ha un'applicazione; 2–3 `percorsi` alternativi solo se la lezione può svolgersi davvero in modi diversi.

**Adattabile in aula.** Le note del docente contengono un **piano di regia**: che cosa accorciare se il cronometro segna ritardo (una scena, una variante più breve, il gioco da 8 a 5 minuti) e che cosa aggiungere se si è in anticipo (un gioco di ripasso, una variante, una domanda di dibattito).

## Progettazione

1. **Contenuti.** Usa il dossier della lezione o costruiscilo con il metodo (domanda, catena causa-effetto, concetti, parole, fonti controllate). Poi scrivi la scheda della lezione (reference dei principi) con obiettivo osservabile, fraintendimenti da smontare ed elenco dell'essenziale da far imparare.
2. **Regia degli strumenti.** Prima di scrivere le scene compila la tabella di [strumenti.md](references/strumenti.md): per ogni anello della catena, che cosa deve capire la classe, perché è difficile, quale strumento lo fa capire e quale alternativa esiste. La fonte principale si legge davvero; c'è almeno un punto in cui decide la classe; l'equivoco più probabile si smonta con un esito motivato. Due lezioni su temi diversi non devono avere la stessa struttura.
3. **Piano dei 50 minuti.** Elenca le scene con fase, momento, minuti e strumento, colloca la pausa gioco dove la chiede il contenuto e controlla i vincoli fissi: somma **esattamente** 50 per ogni percorso (la lezione non supera mai i 50 minuti: se il piano sfora si toglie una scena o si sposta un gioco nel ripasso; il catalogo di `strumenti.md` § 6 è il menu da cui scegliere pochi strumenti, non un modello da riempire), tutto l'essenziale coperto, nessun tratto di solo ascolto oltre i 10 minuti circa.
4. **Scene.** La mascotte dell'anno apre e chiude la lezione (copertina della prima e dell'ultima scena) e può intervenire con il blocco `mascotte`. Le scene di spiegazione sono il cuore: seguono gli anelli della catena, uno o due per scena, e ogni passaggio dichiara il suo *perché*. Ogni anello difficile viene **mostrato facendo**, con lo strumento scelto nella regia: catena, animazione a fotogrammi, strati, lettura ravvicinata, lente, bilancia, bivio, stima, ordina, oltre ai blocchi di base e alle attività di classe. In una scena stanno al massimo circa 60 parole di prosa: il resto lo dice il docente. Le parole nuove del dossier si segnano nel testo con `{parola}` e hanno la loro voce in `LEZIONE.glossario` (etimologia verificata e spiegazione); per l'etimologia da esplorare usa `parola` o `etimo`. Lo schermo mostra solo ciò che gli studenti devono imparare; l'attualità entra come rimando (`aggancio`), mai al posto dell'argomento. Applica i criteri Gestalt di [strumenti.md](references/strumenti.md). Testi sullo schermo e traccia orale seguono il registro della classe: mai banale, mai colloquiale.
5. **Prova finale** di comprensione e **ritorno alla domanda iniziale**: per le domande d'opinione, un sondaggio d'uscita con `confronta: 'ingresso'` mostra se la classe ha cambiato idea. Non si assegna un punteggio alle convinzioni personali.
6. **Modalità Studio:** il testo continuo che lo studente rilegge a casa. Contiene gli stessi contenuti delle scene in prosa ordinata, con i nessi della catena espliciti e le fonti. Il pulsante «Scarica il testo» ne produce il file `.txt`.
7. **Carattere.** Quando nessuno strumento del kit rende bene un'idea del dossier, scrivi un **componente su misura** (`LabLezione.registra`): una pianta cliccabile, un esperimento mentale, un oggetto che si costruisce passo per passo, un'animazione SVG o canvas propria. Hai piena libertà di inventare lo strumento adatto, nei vincoli di stile, accessibilità e assenza di rete. La lezione deve risultare dinamica e accattivante, mai infantile.

## Realizzazione

Scrivi **solo** il file `lezione.js` (glossario, scene, testo di studio, dati dei giochi e componenti propri) e assemblalo con lo script incluso:

```bash
python3 <skill>/scripts/build_artefatto.py lezione.js -o <slug>-artefatto.html \
  --anno <1-5> --titolo "<titolo>" --descrizione "<una riga>"
```

Poi esporta il testo di studio con `node <skill>/scripts/esporta_testo.js lezione.js <slug>-testo.txt`; se Node manca, salva il file dal pulsante «Scarica il testo».

Lo script incorpora React 18, htm, font, token e kit del **Lab IRC Design System** (pacchetto «Lab-Irc» del 3 ottobre 2026: testata con modalità, glossario, LIM e tema; barra delle scene con fasi e cronometro; strumenti e attività di classe; percezione; alone, schede reattive, pulsanti magnetici, AMDG), la mascotte 2D dell'anno (`<lab-mascotte>`), il logo e il motore dei giochi in **un solo HTML offline**, senza CDN né richieste di rete. Non riscrivere a mano il kit e non cambiare palette, caratteri o proporzioni: si personalizza soltanto con il contenuto, con i componenti propri e, se serve, con un piccolo CSS di lezione (`--css`) che usa i token esistenti.

Due esempi completi stanno in `assets/esempio/`: `lezione-esempio.js` (attività di classe a fasi, glossario, pausa gioco a metà) e `esempio-strumenti.js` (lettura della fonte, animazione, catena, laboratorio con tre varianti). Parti da quelli per il formato dei dati, non per la struttura né per i contenuti.

Vincoli: nessun account, cookie, dato personale o chiamata di rete. Lo stato è in memoria; `localStorage` è ammesso soltanto per le preferenze già gestite dal kit (tema `tema_lab`, LIM `lim_lab`, suoni, skin, ultima scheda gioco, nomi delle squadre della sfida), sempre protetto da try/catch. Non salvare mai risposte, riflessioni o nomi degli studenti: nella versione della skill anche riflessione e sondaggio dei giochi restano solo in memoria. Tutto deve funzionare con tastiera, tocco e mouse, a 360 px e alla LIM (anche in modalità LIM), con `prefers-reduced-motion`.

## Verifica e consegna

Prova l'artefatto in un browser reale: tutte le scene con le frecce e con i pulsanti, in ogni percorso, con la somma dei minuti a 50; ogni animazione fotogramma per fotogramma, anche a 360 px; ogni variante del laboratorio; la pausa gioco e il ritorno alla scena di partenza; ogni blocco con un errore e una risposta corretta; le parole nuove e il pulsante «Glossario»; la modalità LIM (pulsante e tasto L); lo Studio con il download; ogni gioco presente; il tema chiaro e quello scuro; la larghezza di 360 px senza scorrimento orizzontale; l'iframe con il sandbox della reference di pubblicazione. Controlla che la console non mostri errori e che non partano richieste di rete. Se non puoi eseguire la prova, dichiaralo: un'ispezione del codice non vale come collaudo.

Consegna:

- `<slug>-artefatto.html`, il prodotto principale da caricare sul sito;
- `<slug>-testo.txt`, lo stesso testo della modalità Studio, da caricare a parte;
- `docente/<slug>-lezione.js`, il sorgente per revisioni successive;
- `docente/<slug>-contenuti.md`, se il dossier dei contenuti non esisteva e lo hai costruito;
- `docente/<slug>-artefatto-docente.md`, con la scheda della lezione; la **mappa dell'essenziale** (anello, concetto o parola del dossier → scena); la **regia degli strumenti** (tabella anelli → strumenti, con motivazione); il piano minuto per minuto con le scene e la collocazione della pausa gioco; i percorsi con la somma dei minuti e le varianti del laboratorio con «quando sceglierla», se ci sono; il **piano di regia** (che cosa accorciare in ritardo, che cosa aggiungere in anticipo); la traccia orale di ogni scena; le soluzioni; le varianti senza proiettore; le fonti;
- il record di catalogo per il file effettivamente prodotto.

Prima della consegna controlla che **Sfida a squadre** compaia davvero nella modalità Giochi: prova avvio, turni, errore con possibilità di rubare, punteggio e fine partita. Le note includono soluzioni motivate e alternativa senza proiettore.

Non fermarti a una descrizione o a un prototipo con pulsanti inerti.
