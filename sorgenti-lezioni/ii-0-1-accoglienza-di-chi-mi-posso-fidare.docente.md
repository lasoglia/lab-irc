# II 0-1 · «Di chi mi posso fidare?» — note del docente

Artefatto: `uploads/accoglienza-mi-fido-perche-artefatto-classe-2.html` (nome invariato: il sito lo collega così).
Sorgente: `sorgenti-lezioni/ii-0-1-accoglienza-di-chi-mi-posso-fidare.js` · Testo di studio: `sorgenti-lezioni/ii-0-1-accoglienza-di-chi-mi-posso-fidare.testo.txt`.
Rifatto il 7 ottobre 2026 con la skill «IRC · Artefatto interattivo della lezione» (kit Lab IRC del 5 ottobre 2026), mascotte Ichthy.

Assemblaggio:

```bash
python3 -I design-system/assets/artefatti/skill-lezione/scripts/build_artefatto.py \
  sorgenti-lezioni/ii-0-1-accoglienza-di-chi-mi-posso-fidare.js \
  -o uploads/accoglienza-mi-fido-perche-artefatto-classe-2.html --anno 2 \
  --titolo "Di chi mi posso fidare?" \
  --descrizione "Accoglienza della classe seconda: cartoline dall'estate, tre voci, il gioco dei riscontri e il patto di confronto."
node design-system/assets/artefatti/skill-lezione/scripts/esporta_testo.js \
  sorgenti-lezioni/ii-0-1-accoglienza-di-chi-mi-posso-fidare.js \
  sorgenti-lezioni/ii-0-1-accoglienza-di-chi-mi-posso-fidare.testo.txt
```

Lo stile dei componenti propri è dentro il sorgente (un `<style id="a2-css">` che usa solo i token): non serve `--css`.

## 1. Scheda della lezione

```text
Titolo e identificativo: II 0-1 · Di chi mi posso fidare? (accoglienza)
Classe / età: II, 15–16 anni
UDA e posizione: UDA 0 «Accoglienza», prima ora dell'anno. Prepara l'UDA «Gesù quali tracce»
  («Gesù sotto il segno dell'aquila», «Lo screenshot non basta») senza anticiparne i contenuti:
  niente Tacito, Plinio, Pilato o fonti su Gesù; solo il metodo (che tipo di voce è? quale riscontro le chiedo?).
Domanda centrale: Di chi mi posso fidare?
Obiettivo osservabile: davanti a un'affermazione nuova lo studente dice se è un fatto, un'opinione o una
  citazione e formula la domanda di riscontro adatta; riconosce i falsi riscontri (like, «me l'ha girato un amico»);
  trasforma un'etichetta in una domanda sull'idea.
Criterio di riuscita: 3 risposte su 3 nella prova finale (casi nuovi); almeno tre regole condivise nel patto.
Dossier dei contenuti: non esiste un dossier separato; la parte teorica è breve e sta in questa scheda (catena,
  concetti, fonti). È un'accoglienza: conoscersi, presentare l'anno e il metodo.
Catena: vedi § 2.
Concetti e parole: fiducia, fatto verificabile, opinione, citazione, riscontro / falso riscontro, testimone,
  etichetta, patto; tre piani (fonti, interpretazione, fede). Etimologie in § 2.
Fonti controllate e limiti: § 9.
Piano di 50 minuti e gioco: § 4 (pausa gioco «Sfida a squadre» a metà, minuti 31–37).
Piano di regia: § 5.
Prova finale: quiz di tre casi nuovi + sondaggio d'uscita confrontato con quello d'ingresso.
Assunzioni: classe di circa 25 alunni (modificabile nella scena 2); il programma dell'anno (28 incontri, 8 tappe)
  è quello della versione precedente, con descrizioni rese più generiche per non anticipare le lezioni.
```

Fraintendimenti da smontare: «fidarsi è da ingenui, conta solo ciò che vedo» (Agostino, scena 4); «se lo dicono in tanti è vero» e «me l'ha mandato un amico, quindi è vero» (falsi riscontri, scene 6 e 8); «una citazione famosa vale per il nome che porta» (scene 5 e 7); «chi non è d'accordo con me è un credulone / uno scettico» (etichette, scena 9); «in Religione si dà il voto alla fede» (tre piani, scena 11).

## 2. Catena e mappa dell'essenziale

Catena (4–7 anelli, con il nesso):

1. Ogni giorno ci fidiamo di racconti che non possiamo controllare: senza fiducia «in questa vita non faremmo proprio nulla» (Agostino). *Nesso esistenziale.*
2. **Per questo** la domanda non è *se* fidarsi, ma *di chi* e per quali ragioni; e prima bisogna capire che tipo di affermazione si ha davanti: fatto, opinione, citazione. *Logico.*
3. **Quindi** ogni voce chiede il suo riscontro: dove controllarlo (fatto), con quali ragioni (opinione), chi, dove, quando (citazione). *Logico.*
4. **Ne segue che** like e amici sinceri sono falsi riscontri; un riscontro vero ha un testimone terzo, che altri possono consultare. *Logico.*
5. **Eppure** il metodo non basta se trattiamo male le persone: un'etichetta chiude il discorso, una domanda lo riapre sull'idea. Il patto fissa ragioni, ascolto e responsabilità. *Esistenziale.*
6. **Così**, per tutto l'anno, terremo distinti tre piani: che cosa attestano le fonti, come le interpretiamo, se e come ci crediamo. Il voto riguarda fonti e ragioni, mai la fede. *Logico-teologico.*

Test dell'anello: senza l'anello 1 il metodo sembra sospetto verso tutto; senza il 4 i like restano una prova; senza il 5 il metodo diventa un'arma contro le persone; senza il 6 la classe non sa come si userà il metodo nell'anno.

| Anello, concetto o parola | Scena | Studio |
|---|---|---|
| 1 · senza fiducia non si vive; *fiducia* | 2, 3 (esperienza), 4 (Agostino, `leggi`) | «Vi siete appena fidati» |
| 2 · fatto / opinione / citazione; *opinione*, *citazione* | 5 (Tre voci) | «Tre voci, tre domande» |
| 3 · un riscontro per ogni voce; *riscontro* | 6 (Riscontri) | «I falsi riscontri» |
| 4 · falsi riscontri, testimone terzo; *testimone*, *canonizzazione* | 6, 7 (carte + `parola`), 8 (Sfida) | «Il riscontro vero» |
| 5 · etichette e domande, patto; *etichetta*, *patto* | 9 (Etichette), 10 (Patto) | «Idee e persone» |
| 6 · tre piani, il voto | 11 (Programma + `strati`), 12 (prova, domanda 3) | «L'anno e i tre piani» |
| Ritorno alla domanda | 1 e 12 (sondaggio con `confronta`) | «La risposta» |

Glossario (8 voci, etimologie dal Vocabolario Treccani): fiducia (*fiducia* da *fidere*), riscontro (*riscontrare*, da *ri-* + *scontrare*), opinione (*opinio*, *opinari*), citazione (*citare*, «chiamare»), testimone (*testis*, «colui che sta come terzo», da *tres* e *stare*), canonizzazione (lat. tardo *canonizare*, gr. *kanonízō*, «giudicare secondo la regola, includere in un canone»), etichetta (fr. *étiquette*, ant. fr. *estiquer*, «attaccare»), patto (*pactum*, *pacisci*, stessa radice di *pax*). L'etimologia di *testis* è quella proposta dai dizionari (da \**tri-st-*); è presentata come spiegazione, non come dato certo.

## 3. Regia degli strumenti

| Anello | Che cosa deve capire la classe | Perché è difficile | Strumento scelto | Alternativa |
|---|---|---|---|---|
| Apertura | Che la domanda riguarda tutti e avrà una risposta | Opinione personale, nessuna risposta giusta | `domanda` d'ingresso (anonima, alzata di mano) + `agenda` | domanda orale |
| Conoscersi | Raccontare e ascoltare; ci si fida già | Timidezza, privacy | componente **Cartoline** (mazzo, «passo» senza spiegazioni, estrazione dal registro, mezzo minuto) | giro dei banchi |
| 1 | Si crede a racconti non verificati | È esperienza, va vissuta | componente **VeroInventato** (voto, una domanda, svela; esito motivato, nessun punteggio) | mani alzate |
| 1 | Senza fiducia non si vive | Va letto in una fonte vera, non affermato | `leggi` in modalità «trova la frase» su Agostino + `mascotte` nascosta («E allora?») | `citazione` |
| 2 | Fatto, opinione, citazione | Concetti vicini; il post è un'opinione dentro una citazione | componente **TreVoci** (esiti Giusto / In parte / Da rivedere, sempre motivati) | `smista` |
| 3–4 | Ogni voce, la sua domanda; falsi riscontri | L'equivoco più probabile (like, amici) | componente **Riscontri** (5 richieste, 4 bersagli, bersaglio sbagliato si spegne, tabellone) — *la classe decide* | `cat` nei giochi |
| 4 | Che cosa resta dopo il controllo; il testimone terzo | Va mostrato l'esito del riscontro | `carte` (correzione) + `parola` «Testimone» | `rivela` |
| 1–4 | Ripasso e cambio di ritmo | Dopo il nucleo più denso | **pausa gioco** `sfida` (Sfida a squadre) + `rivela` per la restituzione | `cat`, `vf` |
| 5 | Etichetta → domanda sull'idea | Le domande-etichetta travestite | componente **Etichette** (due domande per etichetta, una è un'etichetta travestita; esito motivato) — *la classe decide* | `carte` |
| 5 | Il patto | Produrre poche regole condivise | componente **Patto** (suggerimenti per ragioni / ascolto / responsabilità, regola libera, massimo 7, «Proietta») | lavagna |
| 6 | Tre piani | **Concetto più difficile**: distinguere fatto attestato, interpretazione e fede sullo stesso esempio | `strati` (animazione a livelli concentrici: dalle fonti alla fede) sul ritaglio della canonizzazione + componente **Programma** | `mappa` |
| Chiusura | Applicare a casi nuovi; ritorno alla domanda | Trasferimento | `quiz` (3 domande) + `domanda` d'uscita con `confronta: 'ingresso'` | `verifica` |

Motivazione dello strumento più forte: i tre piani sono la regola dell'anno e il punto più facile da fraintendere («mi danno il voto sulla fede»); gli `strati` mostrano che sullo stesso fatto si scende da ciò che si controlla a ciò che si crede, e che ogni livello ha il suo modo di essere vagliato.

Componenti propri e che cosa aggiungono: Cartoline e VeroInventato servono all'accoglienza (nessun blocco del kit estrae un numero o tiene il mezzo minuto); TreVoci mostra tre oggetti diversi (ritaglio, chat, post) con un esito «in parte»; Riscontri permette di riprovare e riempie un tabellone (lo `smista` del kit ha un solo `why` per voce); Etichette fa scegliere fra domanda vera e domanda-etichetta; Patto e Programma sono strumenti di classe. Tutti tengono lo stato solo in memoria (tornando alla scena, anche dalla pausa gioco, si riprende da dove si era); nulla è salvato nel browser.

Stati interattivi dei componenti: pulsanti principali `ll-btn` (magnetico, lama di luce, active 0,96, focus oro); secondari `ll-btn--ghost`; scelte `a2-chip` e bersagli `a2-t` (hover −2/−3 px e bordo nel colore dell'anno o della zona, active 0,96–0,97, focus oro 2 px, esito sempre con una parola: Giusto, In parte, Da rivedere, Non qui); voti `a2-vote` (barra proporzionale); etichette `a2-sticker` (hover con lieve rotazione, staccata = tratteggio verde); interruttore `a2-switch` con «sì/no» scritto; `la-choice` del kit nelle Etichette.

## 4. Piano minuto per minuto (somma 50)

| Min | Scena | Fase · momento | Strumento | Classe che agisce |
|---|---|---|---|---|
| 0–2 | 1 Di chi mi posso fidare? | Aggancio · Apertura | `domanda` ingresso + `agenda` | voto anonimo |
| 2–9 | 2 Com'è andata l'estate? | Aggancio · Cartoline | Cartoline | 8–10 racconti brevi |
| 9–13 | 3 Vero o inventato? | Aggancio | VeroInventato | voto, una domanda, svela |
| 13–17 | 4 Vi siete appena fidati | Scoperta · Fonte | `leggi` Agostino + `mascotte` | trovano la frase |
| 17–22 | 5 Tre voci sul tavolo | Scoperta · Tre voci | TreVoci | classificano |
| 22–27 | 6 Ogni voce, la sua domanda | Scoperta · Riscontri | Riscontri | votano e toccano il bersaglio |
| 27–31 | 7 Ora il riscontro vero | Scoperta · Correzione | `carte` + `parola` | commentano ogni carta |
| 31–37 | 8 Sfida a squadre | Attività · **Pausa gioco** | `gioco: sfida` + `rivela` | due squadre |
| 37–40 | 9 Staccare le etichette | Attività · Idee e persone | Etichette | scelgono la domanda |
| 40–44 | 10 Il nostro patto | Attività · Patto | Patto | scrivono e scelgono le regole |
| 44–47 | 11 Ventotto incontri, tre piani | Chiusura · L'anno | Programma + `strati` | — (ascolto, 3′) |
| 47–50 | 12 Di chi mi fido, allora? | Chiusura · Prova | `quiz` + `domanda` uscita | prova e voto finale |

Fasi: Aggancio 13′ · Scoperta 18′ · Attività 13′ · Chiusura 6′. Il tratto più lungo di solo ascolto è la scena 11 (3′). Undici momenti con un esito visibile a tutti.

Pausa gioco a metà: cade dopo il nucleo più denso (voci, riscontri, correzione) per cambiare ritmo e ripassare; tutte le domande della Sfida riguardano nozioni già affrontate nelle scene 4–7. «Torna alla lezione · scena 8» riporta alla scena di partenza con le risposte date.

Nessun percorso alternativo e nessun laboratorio a varianti: l'accoglienza ha un solo andamento; le alternative sono nel piano di regia.

## 5. Piano di regia

**In ritardo** (il cronometro segna +N′):

- scena 2: 5–6 cartoline invece di 8–10 (−2′);
- scena 3: un solo racconto messo alla prova (−2′);
- scena 8: Sfida con 5 domande invece di 8 (si chiude con «Prossima domanda» e si torna alla lezione), restituzione con una sola domanda (−2′);
- scena 9: due etichette invece di quattro (−1′);
- scena 11: solo gli strati, senza aprire le tappe dell'anno (−1′).

Non tagliare la prova finale né il voto d'uscita: sono il ritorno alla domanda.

**In anticipo**:

- scena 3: un altro racconto (+2′);
- scena 6: «Rigioca» con un'altra classe di richieste inventate a voce dalla classe (+2′);
- scena 10: leggere ad alta voce il patto e chiedere a ciascuno quale regola gli costerà di più (+2′);
- Giochi: `cat` (Fatto, opinione, citazione o falso riscontro?) o `vf` (+4′);
- domanda di dibattito: «C'è qualcuno di cui vi fidate senza controllare? Perché è ragionevole?»

## 6. Traccia orale

1. **Apertura.** «Quest'anno avremo una domanda che ci accompagnerà fino a giugno. La facciamo subito, anonima: votate con la mano.» Contare i voti, non commentarli: «Li teniamo da parte. Alla fine rivoteremo.» Mostrare l'agenda in dieci secondi.
2. **Cartoline.** Pescare, leggere ad alta voce, far rispondere in una o due frasi. Ricordare che «passo» non richiede spiegazioni. Estrarre i numeri del registro o seguire i banchi. Il mezzo minuto si attiva solo se serve.
3. **Vero o inventato.** Prima di un racconto, il docente dice sottovoce a chi parla: «Se vuoi, aggiungi un solo dettaglio inventato.» La classe vota, sceglie una sola domanda, chi ha raccontato svela. Chiedere sempre: «Che cosa vi aveva convinto?»
4. **Agostino.** «Vi siete appena fidati: è grave?» Presentare in una frase Agostino (vescovo in Africa, IV–V secolo, racconta la sua vita a Dio nelle *Confessioni*). Leggere il testo, poi chiedere di trovare la frase che dice *perché* non si può fare a meno di fidarsi. Aprire il fumetto di Ichthy: la domanda dell'anno.
5. **Tre voci.** «Prima di chiederci se è vero, chiediamoci che cosa abbiamo davanti.» Far discutere a coppie per 30 secondi ogni voce, poi scegliere. Sul post, se la classe dice «opinione», valorizzare l'esito «in parte».
6. **Riscontri.** Per ogni richiesta: voto a mano alzata sul bersaglio, poi un volontario tocca. Se sbaglia, leggere la spiegazione e riprovare. Al riepilogo far ripetere le quattro domande.
7. **Correzione.** Girare una carta alla volta. Sul ritaglio: «Dove avreste controllato?» Sul messaggio: tornare ad Agostino. Sul post: dichiarare che la frase è inventata dal docente, apposta. Toccare *Testimone*: il terzo.
8. **Sfida.** Due squadre (metà aula), nomi collettivi; 20 secondi per rispondere, 10 per rubare. Al ritorno, le due domande della restituzione.
9. **Etichette.** «Un'etichetta si attacca in fretta e si stacca con fatica.» Per ogni etichetta la classe sceglie A o B; leggere sempre il perché, anche quando è giusto.
10. **Patto.** Ognuno pensa la propria regola (30″), poi tre–cinque regole scelte insieme. «Proietta il patto» e copiarlo sul quaderno o alla lavagna.
11. **L'anno.** Scorrere la striscia: una tappa, una riga. Poi gli strati sul ritaglio: «Che sia stato proclamato santo si controlla; perché la Chiesa lo proponga si discute; che preghi per noi si crede o non si crede. Il voto riguarda i primi due modi di lavorare, mai il terzo.» Se si vuole: il nostro laboratorio è dedicato proprio a san Carlo Acutis.
12. **Prova e ritorno.** Tre casi nuovi a mano alzata (o su un foglietto), poi lo stesso sondaggio dell'inizio: il tratteggio d'oro è il voto d'ingresso. Chiedere a chi ha cambiato idea che cosa l'ha convinto. Prima di uscire: la propria regola sul quaderno.

## 7. Soluzioni

**Scena 4 (`leggi`).** Frase giusta: «se non le credessimo, in questa vita non faremmo proprio nulla». Le altre sono esempi (cose non viste, storia e luoghi, parola di amici e medici, i genitori), non la ragione.

**Scena 5 (Tre voci).** Ritaglio = fatto verificabile; messaggio = opinione; post = citazione («opinione» è *in parte*: il contenuto è un'opinione, ma è attribuito a un'autorità).

**Scena 6 (Riscontri).** «Dove posso controllarlo anch'io?» → ritaglio; «Con quali ragioni lo sostieni?» → messaggio; «Chi l'ha detto, dove e quando?» → post; «Quanti like ha?» e «Me l'ha girato un amico: basta?» → falso riscontro.

**Scena 7 (carte).** Ritaglio verificato; messaggio da discutere; post inventato.

**Scena 9 (Etichette).** Credulone → «Da dove viene questa informazione? Controlliamola insieme» (B); scettici → «Che cosa ti renderebbe convincente questa fonte?» (A); chi crede → «Perché pensi che credere e ragionare siano in contrasto?» (B); chi non crede → «Quali valori guidano le tue scelte?» (A).

**Scena 12 (prova).** 1 B (citazione: chi, dove, quando); 2 D (opinione: ragioni); 3 A (fatto attestato / affermazione di fede). Il sondaggio d'ingresso e d'uscita non ha risposta giusta.

**Sfida a squadre** (8 domande; la risposta giusta è tra parentesi):

1. «Dove posso controllarlo anch'io?» è la domanda per… (un fatto)
2. «Con quali ragioni lo sostieni?» va chiesto a… (un'opinione)
3. Davanti a una citazione, la prima domanda è… (Chi l'ha detta, dove e quando?)
4. Dodicimila cuori sotto un post sono… (un falso riscontro)
5. Il ritaglio sulla canonizzazione di Carlo Acutis è… (un fatto verificabile)
6. Secondo Agostino, se non credessimo a ciò che non vediamo… (in questa vita non faremmo proprio nulla)
7. La citazione «di un premio Nobel» del post è… (inventata per la lezione)
8. «Testimone» viene da *testis*, spiegato come… (colui che sta come terzo)

Regola: due squadre a turno; risposta giusta 100 punti più un bonus per il tempo; se sbaglia, l'altra squadra può rubare per 50 punti. Restituzione: «Quale domanda ha diviso le squadre, e con quali ragioni?»; «Perché like e amici sinceri non bastano per fidarsi?»

Altri giochi (ripasso, fuori dai 50 minuti): `cat` con quattro contenitori, `vf` (7 affermazioni, con il perché), `quiz` (5), `abbina` (5 coppie). Nessuno dà punti a una convinzione personale.

## 8. Varianti senza proiettore

- **Cartoline:** dodici domande scritte su cartoncini in una busta; numeri del registro estratti da un bussolotto.
- **Vero o inventato:** come in aula, con le mani alzate contate dal docente.
- **Agostino:** il brano letto ad alta voce o fotocopiato; la classe sottolinea la frase che spiega il perché.
- **Tre voci e riscontri:** tre fogli alla lavagna (ritaglio, messaggio, post) e un quarto «falso riscontro»; il docente legge le cinque richieste e un volontario attacca un post-it sotto il foglio giusto.
- **Sfida a squadre:** il docente legge le domande con le quattro opzioni; due squadre a turno, rubata con mano alzata; punteggio alla lavagna.
- **Etichette:** il docente legge l'etichetta e le due domande; voto per alzata di mano, poi il perché.
- **Patto:** regole alla lavagna, votate per alzata di mano; ricopiate sul quaderno.
- **Tre piani:** tre cerchi concentrici disegnati alla lavagna, con la frase sul ritaglio scritta dentro ciascuno.

## 9. Fonti

- Agostino d'Ippona, *Confessioni* VI, 5, 7 (testo latino CSEL, consultato su Bibliothek der Kirchenväter, bkv.unifr.ch, 7 ottobre 2026). Traduzione di lavoro: «consideravo quante cose, innumerevoli, credevo senza averle viste…» (*considerans quam innumerabilia crederem quae non viderem…*). Data di composizione 397–400 circa: datazione corrente negli studi.
- Canonizzazione di Pier Giorgio Frassati e Carlo Acutis, domenica 7 settembre 2025, piazza San Pietro, presieduta da Leone XIV (prima canonizzazione del pontificato). Omelia: vatican.va/content/leo-xiv/it/homilies/2025/documents/20250907-omelia-frassati-acutis.html (indirizzo individuato tramite ricerca il 7 ottobre 2026; il sito vatican.va non era raggiungibile direttamente dall'ambiente di lavoro). Cronache: Avvenire, «Carlo Acutis e Pier Giorgio Frassati saranno santi insieme il 7 settembre»; AGI e LaPresse, 13 giugno 2025 (annuncio della data). Date biografiche: Frassati 1901–1925; Acutis 1991–2006.
- *Catechismo della Chiesa Cattolica*, n. 828 (i santi proposti come modelli e intercessori): citato in forma indiretta.
- *Vocabolario Treccani*, voci «fiducia», «riscontrare», «opinione», «citare», «testimone», «canonizzare», «etichetta», «patto» (consultate tramite ricerca il 7 ottobre 2026; treccani.it non era raggiungibile direttamente: le etimologie riportate coincidono con gli estratti delle voci).
- Esempi inventati e dichiarati tali: il messaggio del compagno e il post con la frase «di un premio Nobel per la fisica» (frase inventata; la correzione lo dice).
- Mt 25,14-30 (parabola dei talenti, nota sul significato di «talento»), Bibbia CEI 2008.

Limiti: non sono state verificate parola per parola le pagine vatican.va e treccani.it (accesso bloccato); la cifra dei fedeli in piazza è resa con «decine di migliaia» (le cronache parlano di oltre 80 000).

## 10. Collaudo (7 ottobre 2026)

Playwright con Chromium, server locale. Verificati: 12 scene avanti e indietro (pulsanti e frecce), somma dei minuti 50; ogni blocco con una risposta sbagliata e una giusta (sondaggio, cartoline, vero o inventato, `leggi`, tre voci, 5 richieste dei riscontri, carte, parola, etichette, patto con duplicato rifiutato e «Proietta», programma, strati, quiz con 3/3); pausa gioco e ritorno alla scena 8; Sfida a squadre (avvio, turni, errore con rubata da 50 punti, punteggio, schermata finale); glossario (8 voci) e parola nuova; Studio con download del `.txt`; schede Giochi (quiz, vf, abbina, cat, sfida); tema chiaro e scuro; LIM con tasto L e con `?lim=1`; visore `?in=visore` (testata di una riga, 55 px); 360 px e iPhone 13 senza scorrimento orizzontale in tutte le scene; iframe con sandbox `allow-scripts allow-forms allow-modals allow-popups allow-downloads` funzionante. Nessun errore della pagina in console, nessuna richiesta di rete esterna (l'unico 404 è `favicon.ico` del server di prova).

Record di catalogo: invariato (`data/materiali.json` punta già a `/uploads/accoglienza-mi-fido-perche-artefatto-classe-2.html`).

## 11. Che cosa è cambiato rispetto alla versione precedente

Mantenuto: le cartoline dall'estate (stesse 12 domande, «passo», estrazione dal registro, mezzo minuto); il gioco «vero o inventato» con le stesse quattro domande e la stessa logica degli esiti; le tre voci con il messaggio del compagno e il post inventato; il gioco dei riscontri (5 richieste, 4 bersagli, tabellone, riepilogo); la correzione a carte; Agostino, *Confessioni* VI,5,7, con la stessa traduzione; le quattro etichette e le quattro domande sull'idea; ragioni, ascolto e responsabilità; il patto di confronto (suggerimenti, regola propria, massimo 7, «Proietta»); i 28 incontri con le 8 tappe e la nota su Mt 25; i tre piani e la frase sul voto; il tono.

Cambiato:

- **Il ritaglio.** La pietra di Pilato (Cesarea 1961, *praefectus* / *procurator* in Tacito) è contenuto delle lezioni «Sotto il segno dell'aquila» e «Lo screenshot non basta»: anticipava l'UDA. È sostituita dalla canonizzazione di Carlo Acutis e Pier Giorgio Frassati (7 settembre 2025), un fatto verificabile vicino ai ragazzi, legato con sobrietà al patrono del laboratorio e riusato negli strati dei tre piani. Le descrizioni delle tappe dell'anno non nominano più Tacito, Plinio e Giuseppe Flavio.
- **Ritmo e minuti.** Da 8 scene lunghe (fino a 10′ con più componenti) a 12 scene di 2–7′, uno strumento principale ciascuna; fasi Aggancio 13′ · Scoperta 18′ · Attività 13′ · Chiusura 6′.
- **Agostino diventa la fonte letta davvero** (scena 4, «trova la frase»), subito dopo l'esperienza del fidarsi; la vecchia scena «Vi siete appena fidati» con il `rivela` dei tre valori è assorbita qui (domanda dell'anno) e nel Patto (i suggerimenti sono raggruppati per ragioni, ascolto, responsabilità).
- **Pausa gioco con Sfida a squadre** a metà ora, con ritorno alla scena (prima i giochi erano solo un rimando finale).
- **Etichette**: dalle carte da girare a un componente in cui la classe sceglie fra una domanda sull'idea e un'etichetta travestita, con il perché.
- **Nuovi**: sondaggio d'ingresso e d'uscita confrontati; `parola` «Testimone»; `strati` per i tre piani (concetto più difficile); prova finale di tre casi nuovi; glossario da 4 a 8 voci con etimologie Treccani (tolta «prefetto», legata a Pilato); Studio riscritto in prosa continua con «Per lo studio» e «La risposta».
- **Tolto**: la regola composta da inizio + fine (resta la regola con parole proprie e i suggerimenti); il `continua` finale (il rimando ai giochi è nel piano di regia).
- **Tecnica**: stato dei componenti in memoria di pagina (si conserva cambiando scena e tornando dalla pausa gioco); nulla nel browser; nuovo kit della skill.
- La vecchia `ii-0-1-accoglienza-di-chi-mi-posso-fidare.note.md` (note di conversione) è sostituita da questo file.
