# II 1-1 · «Gesù sotto il segno dell'aquila» (artefatto «Sotto l'aquila») — note del docente

Artefatto: `uploads/ii-1-1-gesu-quali-tracce-sotto-l-aquila-artefatto.html` (nome invariato: il sito lo collega così).
Sorgente: `sorgenti-lezioni/ii-1-1-gesu-quali-tracce-sotto-l-aquila.js` · Testo di studio: `sorgenti-lezioni/ii-1-1-gesu-quali-tracce-sotto-l-aquila.testo.txt`.
Fascicolo (invariato): `uploads/ii-1-1-gesu-quali-tracce-sotto-l-aquila-fascicolo.pdf`.
Rifatto il 7 ottobre 2026 con la skill «IRC · Artefatto interattivo della lezione» (kit Lab IRC del 5 ottobre 2026), mascotte Ichthy.

Assemblaggio:

```bash
python3 -I design-system/assets/artefatti/skill-lezione/scripts/build_artefatto.py \
  sorgenti-lezioni/ii-1-1-gesu-quali-tracce-sotto-l-aquila.js \
  -o uploads/ii-1-1-gesu-quali-tracce-sotto-l-aquila-artefatto.html --anno 2 \
  --titolo "Sotto l'aquila" \
  --descrizione "Giudea, Galilea e Roma: dove, quando e fra chi è vissuto Gesù"
node design-system/assets/artefatti/skill-lezione/scripts/esporta_testo.js \
  sorgenti-lezioni/ii-1-1-gesu-quali-tracce-sotto-l-aquila.js \
  sorgenti-lezioni/ii-1-1-gesu-quali-tracce-sotto-l-aquila.testo.txt
```

Lo stile dei componenti propri è dentro il sorgente (un `<style id="aq-css">` che usa solo i token): non serve `--css`.

## 1. Scheda della lezione

```text
Titolo e identificativo: II 1-1 · Gesù sotto il segno dell'aquila (artefatto «Sotto l'aquila»)
Classe / età: II, 15–16 anni
UDA e posizione: UDA 1 «Gesù: quali tracce?», lezione 1 di 2. La lezione 2, «Lo screenshot non basta»
  (Tacito, Plinio, Traiano), è già nel nuovo stile: questa lezione non ne anticipa i contenuti (niente fonti
  romane su Gesù, niente metodo «chi parla, quando, di che cosa» sviluppato) e chiude rimandando a quella.
Domanda centrale: Si può capire una frase senza sapere dove, quando e fra chi è stata detta?
  (la frase: «Quello che è di Cesare rendetelo a Cesare, e quello che è di Dio, a Dio», Mc 12,17)
Obiettivo osservabile: lo studente colloca Gesù nella mappa dei poteri del suo tempo (Nazaret sotto Antipa,
  Gerusalemme sotto il prefetto Pilato, il sommo sacerdote al Tempio), distingue almeno tre correnti del
  giudaismo, spiega perché la domanda sul tributo era una trappola e distingue in una fonte la notizia
  dall'interpretazione.
Criterio di riuscita: almeno 2 risposte su 3 nella prova finale; mappa di Lc 3,1-2 completata dalla classe.
Dossier dei contenuti: docente/II 1-1 gesu-quali-tracce-sotto-l-aquila-contenuti.md (28 settembre 2026),
  citato dalla versione precedente; non presente in questo repository. Base effettiva: il fascicolo PDF
  (invariato) e la versione precedente dell'artefatto.
Catena: § 2. Concetti e parole: § 2. Fonti controllate e limiti: § 9.
Piano di 50 minuti e gioco: § 4 (pausa gioco «Sfida a squadre» a metà, minuti 27–33).
Piano di regia: § 5.
Prova finale: quiz di tre domande + sondaggio d'uscita confrontato con quello d'ingresso.
Assunzioni: classe di 20–28 alunni; LIM o proiettore; un'ora da 50 minuti.
```

Fraintendimenti da smontare: «Rendete a Cesare = paga e taci» oppure «= separazione Stato/religione di oggi» (sondaggio d'ingresso, scena 7, ritorno in scena 10); «quello che dice lo storico è tutto nella fonte» (fatto/interpretazione, scena 2); «Gesù viveva sotto i Romani e basta» (due governi, scene 3–4); «fariseo = ipocrita» e «tutti gli ebrei stavano in un partito» (scena 5, `nota`); «Gesù era contro gli ebrei» (scena 8 e prova, domanda 2).

## 2. Catena e mappa dell'essenziale

Catena (dal fascicolo, con il tipo di nesso):

1. Nel 4 a.C. alcuni giovani abbattono l'aquila d'oro sopra la porta del Tempio e muoiono per questo: **in quella terra obbedire al potere poteva scontrarsi con la fedeltà a Dio**. *Storico, da una fonte; distinguere fatto e interpretazione.*
2. **Perché** dal 63 a.C. la terra è sotto Roma; il regno di Erode si spezza nel 4 a.C. (tetrarchi); dal 6 d.C. la Giudea ha un governatore romano, il censimento per il tributo provoca la rivolta di Giuda il Galileo, Pilato porta le insegne: **immagini, tributo, fedeltà a Dio**. *Storico, più fattori.*
3. **Per questo** Luca data la predicazione elencando chi comanda (Lc 3,1-2): **due governi**, Galilea (Antipa) e Giudea (prefetto), più l'autorità del sommo sacerdote (Lc 23,7). *Testuale.*
4. **Eppure** lo stesso popolo non risponde in un solo modo: farisei, sadducei, esseni, quarta filosofia, erodiani; scribi come professione; la maggioranza senza gruppo. Gesù discute dentro questo popolo. *Storico.*
5. **Quindi** la domanda sul tributo, fatta da farisei ed erodiani insieme, è una trappola; la risposta di Gesù non entra nelle caselle; staccata dal contesto, la frase si può rovesciare (Lc 23,2). *Testuale.*
6. **Per la fede** questa concretezza è l'incarnazione: «nato sotto la Legge» (Gal 4,4; CCC 423); tracce: una fede con una data (Dionigi), Cesare e Dio (Gelasio, GS 76, distinzione spesso tradita), Gesù ebreo (NA 4). *Logico-teologico; impronta.*

Risposta: no; una frase si capisce quando si sa dove, quando e fra chi è stata detta. «Rendete a Cesare» distingue ciò che spetta al potere da ciò che spetta a Dio.

Test dell'anello: senza 2 l'aquila resta un episodio di fanatismo; senza 3 non si capisce perché Pilato rinvii Gesù a Erode; senza 4 la trappola sembra opera di un solo nemico; senza 5 la frase resta il proverbio dell'inizio; senza 6 la lezione non dice perché il cristianesimo tiene a date e governatori.

| Anello, concetto o parola | Scena | Studio |
|---|---|---|
| Domanda e frase di Mc 12,17 | 1, 10 | «La domanda», «La risposta» |
| 1 · aquila d'oro; fatto / interpretazione; *Legge* | 2 (Aquila + `smista`) | «Un'aquila sulla porta del Tempio» |
| 2 · Roma 63 a.C., Erode, regno spezzato, 6 d.C., Pilato e insegne; *tetrarca*, *prefetto*, *censimento*, *tributo* | 3 (RegnoSpezzato + `parola`) | «Un regno spezzato» |
| 3 · Lc 3,1-2, due governi, Lc 23,7; *sinedrio* | 4 (`leggi` + MappaPotere) | «Una frase che è una mappa» |
| 4 · correnti del giudaismo; *farisei*, *sadducei*, *esseni*, *scribi* | 5 (`chi` + `nota`) | «Un popolo, molte voci» |
| ripasso 1–4 | 6 (Sfida a squadre) | — |
| 5 · trappola del tributo, Mc 12,13-17, Tertulliano, Lc 23,2; *erodiani*, *denaro*, *tributo* | 7 (`bivio` + `dialogo` + `aggancio`) | «Una domanda che era una trappola» |
| 6 · Gal 4,4, CCC 423, *incarnazione*; Dionigi, Gelasio, GS 76, NA 4 | 8 (`citazione` + `carte`) | «Nato sotto la Legge» |
| prova | 9 (`quiz`) | «Per lo studio» |

Glossario: 13 voci con etimologia (Vocabolario Treccani e dizionari etimologici; etimologie discusse dichiarate tali: *farisei*, *sadducei*, *esseni*).

## 3. Regia degli strumenti

| Anello | Che cosa deve capire la classe | Perché è difficile | Strumento scelto | Alternativa |
|---|---|---|---|---|
| Apertura | Che la frase famosa ha più letture e una domanda aperta | Opinione, nessuna risposta giusta | `domanda` d'ingresso (anonima, alzata di mano) | domanda orale |
| 1 | Il fatto dell'aquila; notizia della fonte e ricostruzione degli storici | Racconto lontano; la distinzione fra livelli | componente **Aquila** (racconto a 4 fotogrammi, SVG schematico) + `smista` «Lo dice la fonte / lo ricostruiscono gli storici» — *la classe decide* | `rivela` + `verifica` |
| 2 | Chi comanda e come cambia dal 63 a.C. al 36 d.C. | **Concetto più difficile**: un processo nel tempo su uno spazio (regno unito → spezzato → Giudea romana) | componente **RegnoSpezzato** (carta animata a 5 fotogrammi, regioni che cambiano colore *e* nome del governante, crepe animate al 4 a.C., «Riproduci») + `parola` *Tetrarca* | `animazione` del kit, `tappe` |
| 3 | Lc 3,1-2 come mappa; due governi | Fonte densa di nomi | `leggi` in modalità «trova la frase» (fonte principale letta davvero) + componente **MappaPotere** (nome → luogo, errore Samaria spiegato, regioni che si colorano) — *la classe decide* | `citazione` + `abbina` |
| 4 | Un popolo, molte voci | Nomi nuovi, equivoco «fariseo = ipocrita» | `chi` (quattro frasi d'esempio, quattro correnti) + `nota` | `smista`, `mappa` |
| 1–4 | Ripasso e cambio di ritmo | Dopo il nucleo più denso | **pausa gioco** `sfida` + `rivela` per la restituzione | `seq`, `abbina` |
| 5 | La trappola e la risposta | Va sentita come scelta, poi letta | `bivio` (tre risposte possibili, esiti motivati) → `dialogo` Mc 12,14-17 a tre voci + `aggancio` Tertulliano — *la classe decide*, poi legge la fonte | componente Trappola (versione precedente) |
| 6 | Incarnazione e tre tracce | Affermazione di fede distinta dal dato storico | `citazione` Gal 4,4 con commento (CCC 423) + `carte` (525, 494, 1965) | `rivela` |
| Chiusura | Applicare; ritorno alla domanda; passaggio alla lezione 2 | Trasferimento | `quiz` (3 domande) + `domanda` d'uscita con `confronta: 'ingresso'` + `continua` | `verifica` |

Motivazione dello strumento più forte: la difficoltà vera della lezione è tenere insieme spazio e tempo (chi governa *dove* e *da quando*). Una linea del tempo separa le date dai luoghi; la carta animata mostra lo stesso territorio che cambia padrone, fotogramma per fotogramma, e rende visibile la parola *tetrarca* (il regno spezzato) e perché nel 30 Galilea e Giudea sono due mondi politici. La stessa carta torna nella scena 4, dove è la classe a ricostruirla dalla frase di Luca.

Fonte principale: Lc 3,1-2 (scena 4, `leggi` con «trova la frase»; le glosse delle quattro candidate spiegano ogni nome). Seconda fonte letta per intero: Mc 12,14-17 (scena 7, `dialogo` a parti).
Punti in cui decide la classe: scene 2 (`smista`), 4 (`leggi`, mappa), 5 (`chi`), 7 (`bivio`), 9 (`quiz`).
Equivoco più probabile smontato con esito motivato: la lettura moderna di «Rendete a Cesare» (bivio e dialogo della scena 7, ritorno nella 10); «Gesù contro gli ebrei» (prova, domanda 2, con il perché); «fariseo = ipocrita» (`nota`, `vf` nei giochi).

Componenti propri e che cosa aggiungono: **Aquila** dà un'immagine all'episodio che apre la catena (l'aquila sopra la porta, i maestri, la caduta, gli arresti) e resta schematica, dichiarata come ricostruzione; **RegnoSpezzato** mostra un processo su una carta, cosa che `tappe` e `animazione` del kit non fanno (regioni che cambiano governante); **MappaPotere** fa ricostruire alla classe la stessa carta dalla fonte. Stato solo in memoria di pagina (si conserva cambiando scena e tornando dalla pausa gioco), nulla nel browser.

Stati interattivi dei componenti: «Fotogramma successivo» / «Data successiva» `ll-btn` (magnetico, lama di luce, active 0,96, focus oro); «Fotogramma precedente» / «Data precedente», «Riproduci/Pausa» `ll-btn--ghost` (nomi diversi da «Avanti» e «Indietro» della barra, per non confonderli); «Da capo», «Ricomincia» `ll-link`; pallini dei fotogrammi e date `aq-dot` (hover bordo dell'anno e −2 px, active 0,95, attivo pieno, focus oro 2 px); nomi `mp-nome` (hover −2 px, active 0,96, premuto pieno, collocato = tratteggio verde con ✓); luoghi `mp-luogo` (hover bordo oro e scala 1,06, active 0,92, giusto = bordo verde con il nome, errore = bordo rosso, scossa e spiegazione scritta; Samaria e Idumea hanno una spiegazione propria). Nessun esito affidato al solo colore. `prefers-reduced-motion`: niente transizioni né crepe animate; «Riproduci» passa i fotogrammi senza transizioni.

## 4. Piano minuto per minuto (somma 50)

| Min | Scena | Fase · momento | Strumento | Classe che agisce |
|---|---|---|---|---|
| 0–3 | 1 Una frase famosa | Aggancio · Apertura | `domanda` ingresso | voto anonimo |
| 3–8 | 2 L'aquila sulla porta | Aggancio · Un fatto | Aquila + `smista` | smistano 4 affermazioni |
| 8–15 | 3 Un regno spezzato | Scoperta · Il tempo | RegnoSpezzato + `parola` | prevedono il fotogramma successivo; toccano la parola |
| 15–22 | 4 Una frase che è una mappa | Scoperta · Fonte | `leggi` Lc 3,1-2 + MappaPotere | trovano la frase; collocano 5 nomi |
| 22–27 | 5 Un popolo, molte voci | Scoperta · Spiegazione | `chi` + `nota` | abbinano 4 frasi |
| 27–33 | 6 Due squadre, una mappa | Attività · **Pausa gioco** | `gioco: sfida` + `rivela` | due squadre |
| 33–39 | 7 Torniamo a Cesare | Attività · Fonte | `bivio` + `dialogo` + `aggancio` | scelgono; leggono a tre voci |
| 39–44 | 8 Nato sotto la Legge | Chiusura · Il significato | `citazione` + `carte` | — (ascolto, 5′) |
| 44–48 | 9 Sapete collocarlo? | Chiusura · Prova | `quiz` | prova individuale, risposta per alzata di mano |
| 48–50 | 10 Rendete a Cesare | Chiusura | `domanda` uscita + `continua` | voto finale |

Fasi: Aggancio 8′ · Scoperta 19′ · Attività 12′ · Chiusura 11′. Il tratto più lungo di solo ascolto è la scena 8 (5′). Nove momenti con un esito visibile a tutti.

Pausa gioco a metà: cade dopo il nucleo più denso (regno, Luca, correnti) per cambiare ritmo prima della scena della trappola, che li usa tutti. Tutte le domande della Sfida riguardano scene 2–5. «Torna alla lezione · scena 6» riporta alla scena di partenza con le risposte date.

Nessun percorso alternativo e nessun laboratorio a varianti: la lezione ha un solo andamento narrativo; le alternative sono nel piano di regia.

## 5. Piano di regia

**In ritardo** (il cronometro segna +N′):

- scena 2: raccontare l'aquila a voce sui fotogrammi senza commento, smista con due sole affermazioni (la 2 e la 4) (−2′);
- scena 3: usare «Riproduci» invece di commentare ogni fotogramma, saltare la `parola` (si apre dal glossario) (−2′);
- scena 6: Sfida con 5 domande invece di 8, una sola domanda di restituzione (−2′);
- scena 8: aprire una sola carta (Gesù ebreo) e lasciare le altre allo Studio (−2′).

Non tagliare la lettura di Lc 3,1-2, il dialogo di Mc 12 e il voto d'uscita: sono la fonte e il ritorno alla domanda.

**In anticipo**:

- scena 4: far ricostruire la mappa da un secondo volontario con «Ricomincia», senza aiuti (+2′);
- scena 5: chiedere a coppie quale corrente avrebbe applaudito l'abbattimento dell'aquila, e perché (+2′);
- scena 7: domanda di dibattito: «Oggi, che cosa spetta "a Cesare" e che cosa no? Fate un esempio» (+3′);
- Giochi: `seq` (linea del tempo, 8 date) o `vf` (8 affermazioni con il perché) (+4′).

## 6. Traccia orale

1. **Apertura.** Leggere la frase ad alta voce. «La conoscete? Che cosa vuol dire?» Votare per alzata di mano, anonimo; contare senza commentare. «Teniamo i voti: alla fine la rileggiamo con la sua mappa intorno.»
2. **L'aquila.** Presentare Giuseppe Flavio in una frase (storico ebreo, scrive a Roma alla fine del I secolo). Scorrere i quattro fotogrammi con «Fotogramma successivo»; al terzo chiedere: «Che cosa rischiano?». Poi lo smista: per ogni frase, mani alzate «fonte» o «storici», poi si tocca. Sottolineare la frase 4: la data stessa è un calcolo. Chiudere con la domanda del blocco: perché?
3. **Il regno spezzato.** Prima di ogni «Data successiva» chiedere: «Che cosa cambierà?». Al 4 a.C. toccare la parola *Tetrarca*. Al 6 d.C. nominare il tributo e Giuda il Galileo. All'ultimo fotogramma: «Immagini, tributo, fedeltà a Dio: ecco perché un'aquila poteva costare la vita.»
4. **Luca.** «Luca non ha un numero di anno: come fa a dire quando?» Leggere Lc 3,1-2 ad alta voce, poi un volontario cerca la parte che dice chi governa Gerusalemme per Roma (le altre aprono la loro spiegazione). Poi la carta: a coppie per 30 secondi, poi alla LIM un nome alla volta. Se qualcuno sceglie la Samaria per Pilato, leggere la spiegazione. A carta completa leggere l'esito (Lc 23,7).
5. **Molte voci.** «Eppure lo stesso popolo non risponde in un solo modo.» Le frasi sono d'esempio, non citazioni: dirlo. Leggere la `nota`: «fariseo» non vuol dire «ipocrita»; la maggior parte della gente non era in nessun gruppo.
6. **Sfida.** Due squadre (metà aula), nomi collettivi, 20 secondi per rispondere, 10 per rubare. Al ritorno, due domande di restituzione.
7. **La trappola.** «Mettetevi al suo posto.» Far votare le tre risposte, aprirle tutte, poi «Che cosa risponde Gesù?» e leggere il dialogo a tre voci (tre volontari). All'ultima battuta: «Nessuna delle due caselle.» Aprire l'aggancio su Tertulliano se c'è tempo. Ricordare che «ipocrisia» in Mc 12,15 riguarda chi tende la trappola in quel momento, non un gruppo intero.
8. **Nato sotto la Legge.** Leggere Gal 4,4; aprire il commento. «Qui parla la fede: la storia mostra la cornice, non dimostra la fede.» Girare le tre carte; sulla seconda dire che la distinzione è stata spesso tradita; sulla terza leggere *Nostra aetate* 4.
9. **Prova.** Un minuto in silenzio per domanda (sul quaderno o con le dita alzate: A=1, B=2…), poi si tocca la risposta della maggioranza e si legge il perché.
10. **Ritorno.** Stesso sondaggio dell'inizio; il tratteggio d'oro è il voto d'ingresso. Chiedere a chi ha cambiato idea che cosa l'ha convinto. Lanciare la prossima lezione: «Abbiamo la mappa. Ma fuori dai Vangeli, chi ricorda Gesù?»

## 7. Soluzioni

**Scena 2 (smista).** 1 fonte; 2 storici (l'omaggio a Roma non è nella fonte); 3 fonte; 4 storici (la data è calcolata).

**Scena 4 (`leggi`).** Frase giusta: «mentre Ponzio Pilato era governatore della Giudea». Tiberio governa da Roma; Antipa la Galilea; Anna e Caifa sono l'autorità religiosa. **Mappa:** Tiberio → Roma; Pilato → Giudea; Antipa → Galilea (o Perea); Filippo → Nord-est; Caifa → Tempio. Samaria e Idumea: errore spiegato (erano sotto il prefetto, ma non sono nella frase).

**Scena 5 (`chi`).** Risurrezione → farisei; niente risurrezione, Tempio → sadducei; nessun signore se non Dio → quarta filosofia; beni in comune → esseni.

**Scena 7 (`bivio`).** Nessuna risposta «giusta»: sì = complice dell'occupante per molti; no = ribelle per Roma; tacere = perdere autorità. La fonte: Mc 12,14-17.

**Scena 9 (prova).** 1 C (il prefetto Ponzio Pilato); 2 D (ebreo di Galilea che discute sulla Legge); 3 A (sì = complice, no = ribelle). Il sondaggio d'ingresso e d'uscita non ha risposta giusta; la lettura che il fascicolo sostiene è che la frase **distingue** (vicina all'opzione «Dio viene prima dello Stato» solo in parte: Gesù riconosce anche ciò che spetta a Cesare).

**Sfida a squadre** (8 domande; regola: due squadre a turno, giusta 100 punti più un bonus per il tempo; se sbaglia, l'altra squadra può rubare):

1. Perché i giovani abbatterono l'aquila? (immagine vietata dalla Legge)
2. Alla morte di Erode il regno… (si divide fra tre figli)
3. Chi governa la Galilea quando Gesù è adulto? (Erode Antipa)
4. Titolo di Pilato sulla pietra di Cesarea? (prefetto)
5. Imperatore dell'«anno quindicesimo» di Luca? (Tiberio)
6. Quale gruppo nega la risurrezione? (i sadducei)
7. Chi guida la rivolta del 6 d.C.? (Giuda il Galileo)
8. Gli scribi erano… (esperti della Legge)

Restituzione: «Quale domanda ha diviso le squadre, e perché?»; «Nazaret e Gerusalemme: chi comanda nell'una e nell'altra?»

Altri giochi (ripasso, fuori dai 50 minuti): `seq` (8 date verificate), `vf` (8, con il perché), `abbina` (5 coppie), `quiz` (5, con il perché), `completa`. Nessuno dà punti a una convinzione personale.

## 8. Varianti senza proiettore

- **Apertura e uscita:** la frase alla lavagna, voto per alzata di mano, conteggio scritto in un angolo della lavagna (rimane per il confronto finale).
- **Aquila:** il docente racconta in quattro tempi; alla lavagna due colonne «lo dice la fonte / lo dicono gli storici», la classe colloca le quattro frasi.
- **Regno spezzato e mappa:** disegnare alla lavagna una carta a sei riquadri (Galilea, Samaria, Giudea, Idumea, Perea, Nord-est) e ricolorarla con i gessi a ogni data; poi Lc 3,1-2 fotocopiato: la classe sottolinea i nomi e li scrive nei riquadri.
- **Molte voci:** il docente legge le quattro frasi, mani alzate su quattro cartelli (F, S, E, Q).
- **Sfida a squadre:** il docente legge le domande con le quattro opzioni; squadre a turno, rubata con mano alzata, punteggio alla lavagna.
- **Trappola:** voto sulle tre risposte; Mc 12,14-17 letto a tre voci dal libro o dalla Bibbia.
- **Sotto la Legge:** lettura di Gal 4,4 e di *Nostra aetate* 4 dal fascicolo.
- **Prova:** tre domande dettate, risposta sul quaderno, correzione a voce.

## 9. Fonti

- Bibbia CEI 2008: Es 20,4; Mc 12,13-27; Lc 3,1-2; 4,16; 23,2.6-7; Gal 4,4-5. Le citazioni sono quelle del fascicolo e della versione precedente; **non è stato possibile ricontrollarle in rete in questa sessione** (siti bloccati dal proxy): il testo è quello CEI 2008 noto, ma va riletto sul testo ufficiale prima della pubblicazione, in particolare il dialogo di Mc 12,14-17 (scena 7), che riporta i versetti per intero.
- Giuseppe Flavio, *Guerra giudaica* I,648-655 (= I,33,2-4) e *Antichità giudaiche* XVII,149-167 (= XVII,6,2-4): l'aquila d'oro. Controllo indiretto il 7 ottobre 2026 tramite ricerca web sulla traduzione inglese di Whiston e su riassunti (Jewish Encyclopedia, voce «Judah b. Zippori»): a mezzogiorno, con funi dal tetto, circa quaranta catturati, bruciati vivi chi si era calato e i due maestri; secondo i riassunti consultati, nella *Guerra* la voce è che il re stia morendo, nelle *Antichità* che sia già morto (la lezione segue la *Guerra*, come il fascicolo). Riferito in forma indiretta, nessuna virgoletta.
- Giuseppe Flavio, *Antichità* XVIII,1-25 (= XVIII,1,1-6): le quattro «filosofie», Giuda il Galileo; esseni «circa quattromila» (XVIII,20). *Antichità* XVIII,55-59 (= XVIII,3,1) e *Guerra giudaica* II,169-174: Pilato, le insegne con l'effigie portate di notte, la folla a Cesarea per cinque giorni e cinque notti, il ritiro. Controllo indiretto come sopra.
- Tertulliano, *De idololatria* 15,3: in forma indiretta (come nel fascicolo).
- Concilio Vaticano II, *Nostra aetate* 4 e *Gaudium et spes* 76 (1965); *Catechismo della Chiesa Cattolica* 423: testi italiani della Santa Sede (vatican.va), citati come nel fascicolo; non ricontrollati in rete in questa sessione.
- Gelasio I, lettera *Famuli vestrae pietatis* all'imperatore Anastasio (494): Treccani, *Enciclopedia dei Papi*, voce «Gelasio I». Dionigi il Piccolo (tavole pasquali, 525): Treccani, voce «Dionigi il Piccolo».
- Iscrizione di Ponzio Pilato, Cesarea Marittima, 1961 (area del teatro); Gerusalemme, Israel Museum. Il titolo è in parte integrato dagli editori (*[praef]ectus Iuda[ea]e*), lettura comunemente accettata.
- *Vocabolario Treccani* per le etimologie (tetrarca, prefetto, censimento, tributo, sinedrio, fariseo, sadduceo, esseno, scriba, denaro, incarnazione); per *tôrāh*, *pərîšayyā*, *ṣədûqîm* i lessici biblici correnti. Etimologie discusse dichiarate tali nel glossario.
- P. Franchi, *Sintesi di NT Sinottici* e *Storia della Chiesa I*, dispense (ambiente del Nuovo Testamento), come indicato nel fascicolo: non consultate direttamente in questa sessione.
- Carte e disegni: originali, schematici, non in scala (dichiarato sullo schermo e nelle fonti dello Studio).

## 10. Collaudo (7 ottobre 2026)

Playwright con Chromium, server locale (porta 8782). Esito finale: **174 controlli superati, 0 falliti** (script di prova `test-ii.mjs` nella cartella di lavoro della sessione). Verificati: 10 scene avanti e indietro (pulsanti e frecce), somma dei minuti 50; ogni blocco con una risposta sbagliata e una giusta; i due racconti a fotogrammi (4 e 5 fotogrammi) uno per uno, anche a 360 px, con le etichette SVG dentro il disegno; pausa gioco e ritorno alla scena 6 con le risposte conservate; Sfida a squadre (avvio, turni, errore con rubata, punteggio, schermata finale); glossario e parole nuove; Studio con download del `.txt`; schede Giochi; tema chiaro e scuro; LIM con tasto L e con `?lim=1`; visore `?in=visore` (testata di una riga) a 1280 e 390 px; 360 px e iPhone 13 senza scorrimento orizzontale, con la barra delle scene in fondo; iframe con sandbox `allow-scripts allow-forms allow-modals allow-popups allow-downloads` funzionante; console senza errori e nessuna richiesta di rete esterna.

Record di catalogo: invariato (il sito collega già `/uploads/ii-1-1-gesu-quali-tracce-sotto-l-aquila-artefatto.html`).

## 11. Che cosa è cambiato rispetto alla versione precedente

Mantenuto: la domanda e la frase di Mc 12,17 in apertura e in chiusura con il sondaggio; l'aquila d'oro con la distinzione fatto/interpretazione; Lc 3,1-2 e la mappa del potere (stessi cinque nomi, stesso errore guidato sulla Samaria); la `parola` *Tetrarca*; le correnti del giudaismo con gli stessi contenuti; la trappola del tributo con il rovesciamento di Lc 23,2; Gal 4,4, CCC 423, Dionigi, Gelasio, GS 76, NA 4 con la stessa onestà («spesso tradita», «altre radici»); la Sfida a squadre; Studio in prosa con le fonti; il tono.

Cambiato:

- **Durata.** La versione precedente era pensata per 60 minuti (le note delle scene arrivavano a «52–60») e non dichiarava fasi né minuti: ora 10 scene con fase e minuti, somma 50.
- **Strumenti.** L'aquila diventa un racconto a fotogrammi con disegno, seguito da uno `smista` (prima era un `rivela` + una `verifica`); la linea del tempo `tappe` diventa la carta animata **RegnoSpezzato** (concetto più difficile: chi governa dove e da quando); Lc 3,1-2 si legge in modalità «trova la frase» invece della sola citazione con commento; la mappa del potere ora colora le regioni man mano e usa la stessa carta; le correnti passano da `mappa` + `smista` a `chi` + `nota` (equivoco «fariseo = ipocrita»); la trappola diventa `bivio` + **lettura a tre voci di Mc 12,14-17** (prima la risposta di Gesù era solo dentro un pulsante); le tre tracce diventano `carte`; nuova `quiz` di prova con ritorno alla domanda e `continua` verso «Lo screenshot non basta».
- **Tolti dalla scena** (restano in Studio, glossario o giochi): la tabella `confronto` Galilea/Giudea (assorbita dalla carta e dall'esito della mappa); la `verifica` su Lc 23,7 (nell'esito della mappa e nel quiz dei giochi); la scheda «Gente comune» e «Erodiani» della mappa radiale (nella `nota` e nella scena 7).
- **Nuovi:** glossario di 13 voci con etimologie (prima mancava); fasi e cronometro; stato dei componenti conservato in memoria di pagina; aggancio su Tertulliano; Studio riscritto e ampliato con «Per lo studio» (le domande del fascicolo più una sul fatto/interpretazione) e il rimando alla lezione 2; giochi `seq`, `vf`, `quiz`, `abbina`, `completa` aggiornati.

Corretto (errori o imprecisioni della versione precedente):

- **Erode il Grande «nominato re da Roma» nel 37 a.C.:** fu nominato re dal senato romano nel **40 a.C.** e conquistò Gerusalemme nel 37; ora è detto così (Studio, carta, giochi).
- **Data di nascita di Gesù:** la frase «Gesù è nato prima della morte di Erode, nel 4 a.C.» si poteva leggere come «Gesù è nato nel 4 a.C.»; ora: «Erode muore nel 4 a.C., e Gesù era già nato».
- **Dionigi il Piccolo «e contiamo ancora così»:** il calcolo è del 525, ma l'uso si diffonde nei secoli successivi; ora è detto.
- **«Una trentina d'anni dopo» il 6 d.C.** per le insegne di Pilato (che arriva nel 26): nello Studio ora «una ventina d'anni dopo». *Il fascicolo dice ancora «una trentina d'anni dopo»: è un'imprecisione del fascicolo, che non è stato modificato.*
- **Data della morte di Erode presentata come dato della fonte:** ora è dichiarata come calcolo degli storici (smista, Studio).
- **Insegne di Pilato «di notte»** attribuite alle sole *Antichità* XVIII,3,1: si aggiunge la *Guerra giudaica* II,169-174, il passo che lo dice più chiaramente.
- **Pietra di Pilato:** si segnala nelle note che il titolo *praefectus* è in parte integrato (lettura comunemente accettata).
- La sfida della versione precedente aveva 9 domande con la risposta giusta spesso in seconda posizione; ora 8, con la posizione variata.
