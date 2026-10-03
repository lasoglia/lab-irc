# Scegliere gli strumenti dal fascicolo

L'artefatto si costruisce **su misura per il fascicolo della lezione**: per il suo contenuto, la sua classe, la sua difficoltà. Non esiste una sequenza standard di blocchi. Il repertorio è ampio perché ogni passaggio difficile trovi lo strumento che lo fa capire; la scelta resta stretta perché in ogni scena lavora **uno strumento principale**.

## 0. Che cosa va sullo schermo

Lo schermo mostra **solo ciò che gli studenti devono imparare**: brevi spiegazioni sul tema, integrate da animazioni, attività e giochi. Niente etichette di regia («animazione», «quando usarla», minuti, obiettivi didattici): stanno nelle note del docente. Il `momento` della scena resta una parola che orienta la classe (Apertura, Contesto, Fonte, Spiegazione, Pausa gioco, Laboratorio, Prova).

- **La spiegazione è sull'argomento.** Apertura, catena e attività lavorano sul tema della lezione (la Regola, il testo biblico, il documento, l'evento), non su un caso di attualità che lo sostituisce.
- **L'attualità entra come rimando.** Quando un aggancio all'oggi aiuta a capire, usa il blocco `aggancio` (chiuso di default, sotto il blocco a cui si riferisce) o una variante del laboratorio. Con lo stesso blocco: `Per capire` per un prerequisito, `Con onestà` per un limite o un errore documentato. Al massimo un aggancio per scena, tre per lezione.
- **Prosa breve**: lead di una frase, `testo` entro circa 60 parole, didascalie delle animazioni di una frase. Il resto lo dice il docente.

## 1. Leggere il fascicolo prima di scegliere

Parti dal dossier dei contenuti (`docente/…-contenuti.md`) e, se esiste, dal fascicolo (`docente/…-fascicolo-docente.md` o il PDF in `pubblica/`). Annota in una tabella di lavoro, una riga per ogni anello della catena causa-effetto:

| Anello | Che cosa deve capire la classe | Perché è difficile | Tipo di difficoltà | Strumento scelto | Alternativa |
|---|---|---|---|---|---|

Il **tipo di difficoltà** decide lo strumento. Usa le voci della tabella al punto 2. Se un anello non è difficile, non serve un blocco: basta la parola del docente o un `testo` breve.

Individua poi:

- il **concetto più difficile** della lezione: riceve lo strumento più forte, di norma un'animazione (`animazione`, `catena`, `strati`) o un componente proprio;
- la **fonte principale**: si legge davvero in classe (`leggi`, `citazione`, `lente`), non si riassume soltanto;
- il **punto in cui la classe decide**: almeno uno nel nucleo della lezione (`bivio`, `bilancia`, `stima`, `smista`, `verifica`);
- l'**equivoco più probabile**: va smontato con un esito motivato (`verifica`, `smista`, `vf` nei giochi).

## 2. Dal tipo di difficoltà allo strumento

| Tipo di difficoltà | Strumento principale | Alternative | Da evitare |
|---|---|---|---|
| **Nesso causale** («per questo», «quindi», «eppure») | `catena` con la prova del togliere un anello | `rivela`, `animazione` con frecce | elenco puntato statico |
| **Processo, movimento, trasformazione** (espansione del cosmo, diffusione di un movimento, esodo, sviluppo di un dogma) | `animazione` a fotogrammi | componente proprio con SVG o canvas | testo lungo con «poi… poi…» |
| **Livelli di senso o di scala** (sensi della Scrittura, Chiesa locale e universale, scale del cosmo, coscienza) | `strati` | `mappa`, `carte` | tabella con quattro colonne |
| **Distinzione fra concetti vicini** (fine/regola/efficienza, fede/credenza) | `carte` + `verifica` | `confronto`, `smista` | definizioni in fila |
| **Collocazione nel tempo** | `tappe` per esplorare; `ordina` per ricostruire | `seq` nei giochi | memory di date |
| **Lettura di una fonte** (Bibbia, Regola, magistero, documento) | `leggi` (trova la frase, frasi che si aprono) | `citazione` con commento | parafrasi senza testo |
| **Opera d'arte, luogo, pianta, mappa** | `lente` su un'immagine documentata | `immagine` + `rivela` | immagine decorativa senza domanda |
| **Ragioni in tensione, obiezioni serie** | `bilancia` | `confronto`, `domanda` con dibattito | caricatura dell'obiezione |
| **Decisione su un caso, conseguenze di una scelta** | `bivio` | `smista` di casi, `verifica` | domanda retorica |
| **Ordine di grandezza, dato che sorprende** | `stima` (solo con dato documentato) | `verifica` | numeri decorativi |
| **Etimologia** | `parola` | `carte` | glossario in coda |
| **Posizione personale, coscienza** | `domanda` (mano alzata), `rifl` nei giochi | `bivio` con esiti neutri | punteggio su convinzioni |
| **Lavoro di gruppo o a coppie** | `consegna` con tempo, passi, ruoli, prodotto | `varianti` con più consegne | consegna orale senza prodotto |
| **Classi diverse, tempi incerti** | `varianti` nella scena del laboratorio; `percorsi` a livello di lezione | — | lezione rigida da 60 minuti |
| **Attualità, prerequisito, limite documentato** | `aggancio` (chiuso, sotto il blocco) | variante del laboratorio | aprire la lezione con l'attualità al posto del tema |
| **Niente di quanto sopra** | **componente proprio** (`LabLezione.registra`) | `LabLezione.blocco` per un blocco riusabile | forzare un blocco inadatto |

La tabella orienta, non obbliga. Se il fascicolo contiene un'idea che nessun blocco rende bene, **scrivi un componente proprio**: una bilancia speciale, una pianta cliccabile, un esperimento mentale, un oggetto che si costruisce. La libertà è voluta: gli strumenti esistono per servire il contenuto.

## 3. Regole di regia

- **Uno strumento principale per scena**, al massimo due blocchi. Se ne servono di più, dividi la scena.
- **Varietà con una ragione.** Nella stessa lezione non usare lo stesso tipo di blocco interattivo più di due volte, salvo `verifica`. Alterna strumenti che *mostrano* (animazione, catena, strati, lente) e strumenti in cui *decide la classe* (bivio, bilancia, stima, smista, ordina, leggi in modalità trova).
- **Almeno un'animazione esplicativa** per il concetto più difficile, quando il tema ha un nesso, un processo o dei livelli. Se il tema non li ha, dichiaralo nelle note: non serve un'animazione decorativa.
- **Il docente guida il tempo.** Le animazioni avanzano a fotogrammi con le frecce o con «Riproduci»; la didascalia di ogni fotogramma è breve (una frase), il resto lo dice il docente.
- **Un laboratorio con varianti.** Nella scena del laboratorio offri di norma 2–3 `varianti` di pari durata e con lo stesso obiettivo, con «Sceglila se…». Non si sommano: se ne svolge una.
- **Percorsi alternativi.** Quando la lezione può svolgersi in modi davvero diversi (con o senza gruppi, gioco a metà o in chiusura, classe che ha già visto il tema), definisci 2–3 `percorsi` completi da 50 minuti. Le scene comuni non hanno il campo `percorsi`; quelle alternative lo dichiarano. Ogni percorso somma 50 minuti.
- **Minuti dichiarati.** Ogni scena ha `minuti`; la somma per percorso è 50, compresi istruzioni e restituzione.
- **Fonti anche negli strumenti.** Didascalie delle animazioni, dati di `stima`, punti di `lente` e glosse di `leggi` seguono le regole delle fonti: niente dati o citazioni non verificati. Una ricostruzione o uno schema immaginario si dichiarano tali.
- **Niente segnaposto in consegna.** `lente` e `immagine` si usano solo con un'immagine reale incorporata, con fonte e licenza; altrimenti scegli un altro strumento.

## 3 bis. Gestalt sullo schermo

Il kit applica i criteri del design system (`perception`); nel progettare le scene rispettali:

- **Prossimità** 8 / 21 / 55 px: dentro un gruppo, fra gruppi vicini, fra blocchi diversi. L'`aggancio` si attacca al blocco sopra (21), i blocchi si separano (55).
- **Regione comune**: ogni strumento interattivo sta in un solo riquadro con domanda, opzioni ed esito. Non spezzare una domanda e le sue opzioni in due blocchi.
- **Somiglianza**: stesso ruolo, stessa forma. Un solo pulsante pieno per blocco (azione principale), contorno per le secondarie, link per tornare indietro. Il colore indica un significato (esito, accento dell'anno), non decora.
- **Figura–sfondo e isolamento**: un solo punto focale per scena, una sola parola in colore nel titolo, decorazione che arretra durante le attività.
- **Limite di memoria di lavoro**: al massimo 4 opzioni per domanda, 4–7 anelli per catena, 3–6 fotogrammi per animazione, 3–5 livelli per gli strati.
- **Continuità e destino comune**: catene e linee del tempo si leggono in una direzione; le opzioni entrano insieme; i fotogrammi mostrano lo stesso palco che cambia.
- **Animazioni leggibili**: il palco sta in una schermata insieme alla didascalia (il kit lo limita al 46% dell'altezza); attori con etichette brevi, mai sovrapposti, provati a 360 px.

## 3 ter. Neuropsicologia grafica

Il kit (`lab-lezione-percezione.css` + `.js`) rende visibili questi meccanismi; le scene devono offrirgli il materiale giusto:

- **Dal basso verso l'alto**: prima lo sguardo (titolo breve, una parola in colore), poi l'emozione (domanda, caso, mascotte), poi la ragione (testo, fonte). Ogni scena apre con qualcosa che si vede, non con un paragrafo.
- **Regia dell'ingresso**: momento → titolo → lead → blocchi entrano in quest'ordine (89 ms di scarto). Metti il blocco più importante per primo: è quello che lo sguardo incontra.
- **Figura–sfondo**: quando si lavora su un riquadro, gli altri arretrano. Per questo ogni attività deve stare tutta nel suo riquadro.
- **Chiusura**: un compito risolto si chiude con un anello d'oro. Ogni attività ha quindi un esito riconoscibile (`why` della verifica, `why` dell'ordina, fine dello smista).
- **Ricompensa e «perché»**: l'esito si accende subito, la spiegazione segue. Il `why` è sempre presente e dice la ragione, non solo «giusto/sbagliato».
- **Effetto Zeigarnik e picco–fine**: il filo d'avanzamento sotto la testata mostra quanto manca; l'ultima scena lo chiude in oro. L'ultima scena è quindi una prova breve e soddisfacente, non un riassunto.
- **Posizione seriale**: il concetto chiave compare all'inizio (lead) e alla fine della scena (ultimo blocco o `aggancio`).
- **Isolamento**: un solo elemento caldo per vista. La pausa gioco è un riquadro calmo con una sola azione piena.

## 4. Riferimento dei blocchi nuovi

Si aggiungono a quelli di `artefatto.md`. Sono nel kit (`assets/kit/lab-lezione-plus.js` e `.css`) e lo script di assemblaggio li incorpora sempre.

### `catena` — anelli causa-effetto

```js
{ tipo: 'catena', titolo: '…', iniziali: 1, rottura: true, fine: 'battuta della mascotte',
  anelli: [ { t: 'Primo anello', d: 'dettaglio breve', senza: 'che cosa cade se lo togliamo' },
            { nesso: 'Per questo', t: '…', d: '…', senza: '…' } ] }
```
Gli anelli si agganciano uno alla volta (o con «Riproduci tutto»). A catena completa, «Togli un anello» fa vedere che cosa crolla: scrivi `senza` per ogni anello centrale. 4–7 anelli, come la catena del dossier.

### `animazione` — storyboard a fotogrammi chiave

```js
{ tipo: 'animazione', id: 'unico', rapporto: 1.9, ritmo: 2618, pulsante: 'Avvia l’animazione',
  attori: [ { id: 'a', t: 'Etichetta', forma: 'pillola|riquadro|cerchio|punto|testo', colore: 'accent|oro|ciano|rosa|verde|rosso|muted' } ],
  frecce: [ { id: 'f1', da: 'a', a: 'b', t: 'etichetta?', curva: 0, tratteggio: false } ],
  passi: [ { didascalia: 'Una frase.', attori: { a: { x: 30, y: 40, s: 1, o: 1, on: true, t: 'nuovo testo?' } }, frecce: ['f1'] } ] }
```
Coordinate in percentuale del palco; ogni passo eredita lo stato precedente e indica solo ciò che cambia. Un attore non ancora nominato in un passo è invisibile. `on` lo illumina; `o: 0` lo fa sparire; `s` lo ingrandisce. Le frecce visibili si elencano a ogni passo e si ridisegnano. 3–6 fotogrammi. Prova sempre a 360 px: etichette brevi, attori non sovrapposti.

### `strati` — livelli concentrici

```js
{ tipo: 'strati', titolo: '…', livelli: [ { t: 'Esterno', d: '…' }, { t: 'Più interno', d: '…' } ], fine: '…' }
```
Dal livello più evidente al più profondo, 3–5 livelli. Lo zoom accompagna la discesa.

### `bilancia` — pesare argomenti

```js
{ tipo: 'bilancia', piatti: ['A', 'B'], libero: true, domanda: 'rilancio finale',
  argomenti: [ { t: 'Argomento', lato: 0, peso: 2, nota: 'commento con la fonte' } ] }
```
Con `libero: true` la classe assegna il peso (tocchi successivi, 0–3) e deve motivarlo; senza, ogni argomento ha il `peso` indicato. La bilancia non decide: mostra il peso che la classe ha dato. Le obiezioni vanno rappresentate al meglio.

### `stima` — un dato da stimare

```js
{ tipo: 'stima', q: '…', min: 0, max: 100, passo: 1, valore: 73, tolleranza: 10, unita: '…', why: '…', fonte: '…' }
```
Solo con un dato documentato e significativo: lo scarto tra stima e dato deve aprire la spiegazione.

### `lente` — dettagli su un'immagine

```js
{ tipo: 'lente', src: 'data:image/…', alt: '…', rapporto: 1.5, didascalia: '…', fonte: '…',
  punti: [ { x: 30, y: 40, t: 'Nome', d: 'spiegazione', no: 'perché non è la risposta (modalità trova)' } ],
  trova: { q: 'Domanda', ok: 2, why: '…', indizio: '…' } }
```
Senza `src` mostra un segnaposto: in consegna l'immagine va incorporata, con fonte e licenza accertate.

### `leggi` — lettura ravvicinata

```js
{ tipo: 'leggi', fonte: 'Opera, passo (traduzione)', q: 'domanda per la modalità trova (facoltativa)',
  testo: '«Testo con [[frase::glossa]] e [[!frase da trovare::glossa]].»' }
```
Senza `q`, le frasi marcate si aprono per spiegare; con `q`, la classe cerca la frase giusta fra le candidate (2–4) e ogni tentativo riceve la sua glossa. Le virgolette valgono solo per parole documentate.

### `ordina` — ricostruire un ordine

```js
{ tipo: 'ordina', q: '…', voci: [ { t: 'Primo', y: 'data?' }, 'oppure una stringa' ], why: '…' }
```
Le voci si scrivono nell'ordine giusto: il blocco le mescola. Va bene per fasi di un ragionamento, non solo per date.

### `bivio` — un caso, più scelte

```js
{ tipo: 'bivio', caso: '…', scelte: [ { t: 'Scelta', esito: 'conseguenza', tono: 'ok|ko|neutro' } ],
  chiusura: 'criterio della fonte', pulsante: 'Che cosa ne dice la fonte?' }
```
Le scelte sono tutte difendibili; gli esiti mostrano guadagni e costi. Per temi personali usa `tono: 'neutro'`.

### `aggancio` — rimando breve, chiuso di default

```js
{ tipo: 'aggancio', etichetta: 'Oggi|Per capire|Con onestà', titolo: 'Una riga', t: 'Due o tre frasi.', fonte: '…' }
```
Si mette subito dopo il blocco a cui si riferisce. Non sostituisce la spiegazione: la completa per chi ne ha bisogno.

### `varianti` — attività alternative di pari durata

```js
{ tipo: 'varianti', opzioni: [ { nome: '…', durata: '8 min', descrizione: 'che cosa farete, per gli studenti', quando: 'per il docente, non mostrato', blocchi: [ /* blocchi */ ] } ] }
```

### `consegna` — lavoro con tempo

```js
{ tipo: 'consegna', titolo: '…', modalita: 'Coppie|Gruppi', minuti: 6, passi: ['…'], ruoli: ['…'], prodotto: '…' }
```
Il cronometro scandisce i passi; nessun suono, nessun dato salvato.

### Percorsi e minuti (livello di lezione)

```js
window.LEZIONE = { …,
  percorsi: [ { id: 'gruppi', nome: 'Con i gruppi', descrizione: '…' }, { id: 'lim', nome: 'Tutto alla LIM', descrizione: '…' } ],
  scene: [ { titolo: '…', minuti: 5 },                                  // comune a tutti i percorsi
           { titolo: '…', minuti: 9, percorsi: ['gruppi'] },            // solo in un percorso
           { titolo: '…', minuti: 9, percorsi: ['lim'] } ] }
```
Il selettore compare nella prima scena. Il primo percorso è quello predefinito.

## 5. Nelle note del docente

Aggiungi alla scheda la **regia degli strumenti**: la tabella del punto 1, compilata, con una riga di motivazione per lo strumento del concetto più difficile; per ogni percorso, la somma dei minuti; per ogni variante del laboratorio, quando sceglierla. Se hai scritto un componente proprio, spiega in una frase che cosa fa capire che i blocchi esistenti non mostravano.
