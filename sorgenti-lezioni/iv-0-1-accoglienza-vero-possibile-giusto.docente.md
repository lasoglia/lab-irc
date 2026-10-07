# Note del docente · Vero, possibile, giusto (Anno IV, accoglienza)

Artefatto: `uploads/iv-0-1-accoglienza-vero-possibile-giusto-artefatto.html` (nome invariato, collegato dal sito alla lezione «Presentazione corso», UDA «Accoglienza»).
Sorgente: `sorgenti-lezioni/iv-0-1-accoglienza-vero-possibile-giusto.js` · testo di studio: `sorgenti-lezioni/iv-0-1-accoglienza-vero-possibile-giusto.testo.txt`.
Rifatta il 7 ottobre 2026 con la skill «IRC · Artefatto interattivo della lezione» (kit del 5 ottobre 2026), partendo dall’artefatto del 27 settembre 2026.

Riassemblaggio (il CSS della lezione è dentro il sorgente, non serve `--css`):

```bash
python3 -I design-system/assets/artefatti/skill-lezione/scripts/build_artefatto.py \
  sorgenti-lezioni/iv-0-1-accoglienza-vero-possibile-giusto.js \
  -o uploads/iv-0-1-accoglienza-vero-possibile-giusto-artefatto.html --anno 4 \
  --titolo "Vero, possibile, giusto" \
  --descrizione "Accoglienza della quarta: la bussola dell'estate, tre domande e la mappa dell'anno"
node design-system/assets/artefatti/skill-lezione/scripts/esporta_testo.js \
  sorgenti-lezioni/iv-0-1-accoglienza-vero-possibile-giusto.js \
  sorgenti-lezioni/iv-0-1-accoglienza-vero-possibile-giusto.testo.txt
```

## 1. Scheda della lezione

```text
Titolo e identificativo: IV 0-1 · «Vero, possibile, giusto» (nel sito: «Presentazione corso»)
Classe / età: IV, 17–18 anni
UDA e posizione: Accoglienza, incontro 1 di 28; segue l'UDA «Riformare una Chiesa, cambiare una cultura»
  («Riformare una Chiesa: le indulgenze», «Lutero a Worms»)
Domanda centrale: davanti a una novità, quale domanda stiamo facendo, e chi è competente a rispondere?
  In forma di frase da giudicare: «Funziona, quindi va bene.» Siete d'accordo?
Obiettivo osservabile: lo studente, davanti a una domanda su un caso nuovo (il braccialetto dell'attenzione),
  la colloca fra vero / possibile / giusto, indica la fonte competente e riconosce una caricatura.
  Criterio di riuscita: almeno 3 risposte su 4 nella prova della scena 10.
Obiettivi di accoglienza (senza punteggio): ritrovarsi dopo l'estate (bussola), scrivere il patto di
  confronto, conoscere la mappa dell'anno e il modo di valutare.
Dossier dei contenuti: non esiste un dossier separato; i contenuti vengono dall'artefatto del 27/09
  e dalla programmazione della classe IV. Catena e concetti sono qui sotto.
Catena (nesso logico):
  1. Davanti a una novità si possono porre tre domande: è vero? è possibile? è giusto?
  2. Per questo ogni domanda ha un metodo e una fonte competente diversi (prove controllabili;
     prototipi e collaudi; ragioni sul bene delle persone e coscienza).
  3. Quindi un numero o un dato non chiude una domanda sul giusto, e un'opinione non chiude una domanda
     sul vero: «funziona, quindi va bene» salta dal possibile al giusto (e presuppone il vero).
  4. Eppure non tutto ciò che sembra prova lo è (la percentuale di Veritas, i like, «lo fanno tutti»),
     e «legale» non coincide con «giusto».
  5. La distinzione ha una storia: Galileo (1615) distingue «come si va al cielo» da «come va il cielo»;
     nel 1616 e nel 1633 non fu applicata; nel 1992 Giovanni Paolo II riconobbe l'errore dei teologi.
  6. Per discutere bene fra posizioni diverse serve allora descrivere l'altro senza caricature:
     il patto di confronto della classe.
  7. Ne segue la bussola dell'anno: ogni UDA rimette alla prova vero, possibile e giusto.
Concetti e parole: vero, possibile, giusto; metodo; fonte competente; prova; caricatura; coscienza;
  legale; criterio; bussola (11 voci di glossario).
Fraintendimenti da smontare: «se funziona va bene»; «una percentuale è una prova»; «legale = giusto»;
  «la Chiesa è contro la scienza» (caricatura); «Galileo contro la fede» (distingueva due domande).
Prova finale: quiz di 4 domande (scena 10) + sondaggio d'uscita confrontato con l'ingresso.
```

Assunzioni dichiarate: età e calendario (28 incontri) come nell’artefatto precedente e nella programmazione; nessun dato sugli studenti; la classe ha la LIM.

## 2. Mappa dell’essenziale

| Anello, concetto o parola | Scena | Studio |
|---|---|---|
| Domanda della lezione («Funziona, quindi va bene») | 1 (sondaggio d’ingresso), 3 (verifica), 10 (ritorno) | La domanda; La risposta |
| Bussola (conoscersi, quattro direzioni) · {bussola} | 2 | La bussola dell’estate |
| Anello 1–2: tre domande, tre metodi · {metodo} {vero} {possibile} {giusto} {coscienza} | 3 (Rosa), 10 | Tre domande, tre metodi |
| Anello 3: il salto dal possibile al giusto | 3 (verifica), 10 (ritorno) | Tre domande, tre metodi |
| Anello 4: non tutto è prova · {prova} | 4 (Veritas: percentuale casuale), 7 (Sfida) | Il caso Veritas |
| Distinguere le domande in un caso | 5 (smista, 8 voci) | Il caso Veritas |
| Fonte competente · {competente} · {legale} | 7 (Sfida, rivela «Legale e giusto»), 10 (quiz 2 e 4) | La fonte competente |
| Anello 5: Galileo, 1615 · 1616/1633 · 1992 | 6 (leggi + aggancio «Con onestà») | Galileo e il cielo |
| Anello 6: senza caricature · {caricatura} · patto | 8 (carte + Patto), 10 (quiz 3) | Senza caricature |
| Anello 7: mappa dell’anno, tre piani, valutazione | 9 (Programma) | Il percorso e il modo di lavorare |
| {criterio} | solo glossario e Giochi (memory) | — |

## 3. Regia degli strumenti

| Anello | Che cosa deve capire la classe | Perché è difficile | Tipo di difficoltà | Strumento scelto | Alternativa |
|---|---|---|---|---|---|
| Domanda iniziale | Che la frase «funziona, quindi va bene» è discutibile | Sembra ovvia | Posizione personale | `domanda` d’ingresso, poi d’uscita con `confronta` | `rifl` nei Giochi |
| Conoscersi (bussola) | Raccontare in una o due frasi, o passare | Timidezza a inizio anno; tempi | Attività di classe | Componente **Bussola** (ago che gira, 12 domande, estrazione di numeri senza ripetizioni, barra di 30 s) | Giro di parola libero |
| 1–2 Tre domande, tre metodi (concetto più difficile) | Che cosa chiede ogni domanda, chi risponde, dove non arriva | Le tre domande si confondono nel parlare comune | Distinzione fra concetti vicini | Componente **Rosa** (la stessa bussola diventa la mappa del metodo: ogni direzione apre domanda, fonte competente, limite e legame con l’estate) + `verifica` sul salto | `carte` + `confronto` |
| 3 Il salto | Riconoscere il passaggio dal possibile al giusto | È implicito | Nesso logico | `verifica` lampo con perché | `scegli` |
| 4 Non tutto è prova | Una percentuale senza test non prova | Il numero sembra oggettivo | Equivoco | Componente **Veritas** (verdetto casuale svelato + «a quale domanda fingeva di rispondere?») | `vf` |
| Applicazione | Collocare 8 domande | Confini sottili (vero/possibile) | La classe decide | `smista` con perché | `cat` nei Giochi |
| 5 Galileo | La distinzione nel testo; i fatti del 1616/1633/1992 | Mito «Galileo contro la fede» | Lettura di fonte | `leggi` in modalità «trova la frase» + `aggancio` «Con onestà» + `mascotte` | `citazione` con commento (era nell’originale) |
| 4 bis Fonte competente, legale/giusto | Chi è competente su che cosa | Autorità confuse (legge, pubblicità) | Ripasso a squadre | **Sfida a squadre** (pausa gioco) + `rivela` «Al ritorno» | `cat` «La fonte giusta» |
| 6 Senza caricature | Descrivere l’altro in modo che si riconosca; scrivere regole | Le caricature sono comode | Attività di classe | `carte` (caricatura → posizione vera) + componente **Patto** | Patto alla lavagna |
| 7 Mappa dell’anno | Dove andiamo; come si valuta | 28 incontri sono tanti | Panoramica | Componente **Programma** (tappe, incontri, domande in gioco, «ci incuriosisce» per alzata di mano, tre piani) | `tappe` |
| Prova | Applicare a un caso nuovo | Trasferimento | Verifica | `quiz` di 4 domande + `domanda` d’uscita | Prova orale |

Motivazione dello strumento più forte: il tema non ha un processo o una catena storica da animare; il concetto difficile è una **distinzione a tre**. La Rosa riusa la bussola che la classe ha appena fatto girare: lo stesso oggetto passa dal racconto dell’estate al metodo, e l’ago che si orienta su ogni domanda mostra che si tratta di direzioni diverse, non di gradi di una stessa scala. Nessun blocco del kit permetteva questo passaggio dall’attività di conoscenza al concetto.

Componenti propri (che cosa mostrano che i blocchi non mostravano): **Bussola** (estrazione casuale di direzione, domanda e numero del registro senza ripetizioni, con barra di mezzo minuto); **Rosa** (sopra); **Veritas** (una «prova» che si rivela casuale, e la domanda a cui fingeva di rispondere); **Patto** (regola composta da inizio + fine o scritta, da 3 a 5 regole); **Programma** (mappa dell’anno con contatore di curiosità). Stati interattivi: pulsanti del kit (`ll-btn` magnetico con lama di luce; `ll-btn--ghost`; `ll-btn--solenne`; `ll-link`), pillole direzione `vp-dbtn` e tappe `vp-tappa` (hover bordo colore anno/oro −2 px, active 0,96, focus oro), contatori `vp-pm` (hover, active 0,94, focus oro), scelte `la-choice`, campo di testo con hover e focus oro. Stato solo in memoria (si conserva cambiando scena, sparisce chiudendo la pagina).

Uso dei blocchi: `domanda` 2 volte (ingresso/uscita), `verifica` 1, `smista` 1, `leggi` 1, `carte` 1, `quiz` 1, `rivela` 1, `agenda` 1, `gioco` 1, `custom` 5 componenti diversi, `mascotte` 1, `aggancio` 1.

## 4. Piano minuto per minuto (50′)

| Minuti | Scena | Fase · momento | Strumento | La classe fa |
|---|---|---|---|---|
| 0–3 | 1 Bentornati: da dove ripartiamo? | Aggancio · Apertura | `domanda` d’ingresso + `agenda` | vota per alzata di mano |
| 3–11 | 2 La bussola dell’estate | Aggancio · Si comincia | Bussola | 8–10 racconti brevi, «passo» ammesso |
| 11–15 | 3 Avete già risposto a tre domande | Scoperta · Il metodo | Rosa + `verifica` | sceglie la direzione, individua il salto |
| 15–20 | 4 Un’invenzione sul tavolo | Scoperta · Un caso | Veritas | volontari leggono; vota «li useresti?»; scopre il trucco |
| 20–24 | 5 Quale domanda stai facendo? | Scoperta · Applicazione | `smista` | motiva e colloca 8 domande |
| 24–28 | 6 Come si va al cielo, come va il cielo | Scoperta · Fonte | `leggi` + `aggancio` + `mascotte` | trova la frase |
| 28–35 | 7 Chi è competente? | Attività · **Pausa gioco** | **Sfida a squadre** (8 domande) + `rivela` | due squadre, furti |
| 35–41 | 8 Il nostro patto di confronto | Attività · Il patto | `carte` + Patto | gira le caricature, scrive 3–5 regole |
| 41–46 | 9 Ventotto incontri, tre domande | Chiusura · L’anno | Programma | segna per alzata di mano la tappa che incuriosisce |
| 46–50 | 10 Allora: funziona, quindi va bene? | Chiusura · Prova | `quiz` (4) + `domanda` d’uscita | risponde; rivota |

Somma: 3 + 8 + 4 + 5 + 4 + 4 + 7 + 6 + 5 + 4 = **50**. Un solo percorso. Momenti in cui la classe agisce: 9 su 10 scene; il tratto più lungo di solo ascolto è la parte iniziale della scena 6 (circa 2 minuti).

Pausa gioco: a metà (minuto 28), dopo il nucleo più denso (scene 3–6), per cambiare ritmo e ripassare distinzioni appena viste; le domande della Sfida usano solo le scene 1–6. «Torna alla lezione · scena 7» riporta alla scena con le risposte già date.

## 5. Piano di regia

**In ritardo** (il cronometro segna +N′):
- bussola da 8 a 5 minuti (5–6 racconti; il resto alla prossima ora o a fine lezione);
- Sfida a squadre da 7 a 5 minuti (giocare le prime 5 domande, poi «Torna alla lezione»);
- scena 5: smistare 4 voci su 8 (le altre a voce);
- scena 8: saltare le carte e scrivere direttamente il patto partendo dai suggerimenti;
- scena 9: aprire solo l’UDA 1 e la verifica rovesciata, citare le altre.

**In anticipo**:
- altri giri di bussola (gli studenti non ancora estratti);
- dibattito sul risultato di «Li useresti?» (scena 4): su quale domanda stavate votando?
- Giochi: «Categorie» (La fonte giusta, 10 voci) o «Vero o falso» (7 affermazioni);
- domanda di dibattito: «Una cosa legale può essere ingiusta? Un esempio che non riguardi la scuola».

## 6. Traccia orale per scena

1. *Bentornati.* «Prima di tutto una frase: “Funziona, quindi va bene”. Non c’è risposta giusta: votate per alzata di mano. Teniamo il risultato, perché a fine ora rifaremo la stessa domanda.» Mostrare l’agenda: che cosa faremo nell’ora.
2. *Bussola.* Regola: chi è estratto risponde in una o due frasi o dice «passo», senza spiegazioni. Impostare il numero di alunni (± ), «Estrai un numero», «Gira la bussola». La barra sotto la domanda segna mezzo minuto. Non registrare nulla.
3. *Tre domande.* «Nord, Est e Sud non erano a caso.» Toccare N, E, S (poi O): per ciascuna leggere che cosa chiede, chi risponde, dove non basta. Poi la verifica: chiedere a uno studente di motivare prima di toccare.
4. *Veritas.* Dire subito che gli occhiali sono inventati. Un volontario legge la frase, poi «Analizza»; due o tre frasi. Votare «Li useresti?» prima di svelare. «Come funziona?»: il verdetto è casuale. Chiedere: a quale domanda fingeva di rispondere la percentuale? E il vostro «li userei»?
5. *Smista.* Una domanda alla volta; qualcuno motiva prima del tocco. Insistere sulla differenza vero/possibile: «la voce cambia davvero?» è un fatto, «la batteria regge?» è una prestazione tecnica.
6. *Galileo.* Contesto: lettera del 1615 alla granduchessa Cristina di Lorena. «Trovate la frase che distingue le due domande.» Poi aprire «Con onestà»: la distinzione non fu applicata nel 1616 e nel 1633; nel 1992 Giovanni Paolo II riconobbe l’errore dei teologi; ci torneremo negli incontri 10–13. Bussolina: la bussola indica il nord, non dice se vale la pena andarci.
7. *Sfida.* Due squadre (metà aula), nomi collettivi. A turno; se una squadra sbaglia, l’altra può rubare. Al ritorno: la domanda più discussa; poi «Legale e giusto».
8. *Patto.* Girare almeno due carte: la caricatura e la posizione vera. Poi comporre una regola (inizio + fine) o scriverla; aggiungere suggerimenti finché il patto ha 3–5 regole. Ricopiarlo alla lavagna o sul quaderno: la pagina non lo salva.
9. *L’anno.* Aprire l’UDA 1 (indulgenze, Worms), poi Galileo, Talenti. Per ogni tappa, mani alzate «ci incuriosisce». Chiudere con i tre piani e con la valutazione: si valuta l’uso di fonti e ragioni, mai la fede.
10. *Prova e ritorno.* Quiz di 4 domande a voce con la classe che propone; poi rivotare la frase iniziale e confrontare con il tratteggio d’oro del voto d’inizio. Chiedere a chi ha cambiato idea che cosa l’ha convinto.

## 7. Soluzioni

- **Verifica (scena 3):** C, da «è possibile?» a «è giusto?». «Funziona» riguarda la fattibilità e la prestazione; «va bene» riguarda il bene delle persone.
- **Veritas (scena 4):** la percentuale fingeva di rispondere a «è vero?» (se chi parla mente); «li userei» risponde a «è giusto?».
- **Smista (scena 5):** vero: voce che cambia; riconoscimento oltre il caso. Possibile: batteria; prezzo; funzionamento senza internet. Giusto: consenso; uso nelle interrogazioni; chi è danneggiato da un errore.
- **Leggi (scena 6):** «come si vadia al cielo, e non come vadia il cielo».
- **Sfida (8 domande):** 1 C «Chi viene danneggiato da un errore?»; 2 D non è una prova; 3 B il possibile; 4 A studi sperimentali ripetuti; 5 C come si va al cielo; 6 B estratta a caso; 7 A è vero?; 8 C dal possibile al giusto.
- **Quiz (scena 10):** 1 C il giusto; 2 B studi indipendenti con i dati; 3 A la posizione riconoscibile; 4 D una ragione sul bene delle persone.
- **Giochi di ripasso:** Categorie (vero: esperimento ripetuto, studio con i dati, documento d’archivio; possibile: prototipo, collaudo; giusto: argomentazione sul bene, Dichiarazione universale; non è una prova: visualizzazioni, spot, «lo fanno tutti»); Vero o falso: F, F, F, V, V, F, F.
- Il sondaggio d’ingresso e d’uscita, il voto «Li useresti?», le regole del patto e le curiosità sull’anno **non hanno risposta giusta né punteggio**.

Restituzione della pausa gioco (due domande): «Quale domanda ha diviso di più le squadre, e su quale delle tre domande stavate discutendo?»; «Perché una legge non basta a dire che una cosa è giusta?».

## 8. Varianti senza proiettore

- **Sondaggio d’ingresso/uscita:** la frase alla lavagna, conteggio per alzata di mano, i numeri scritti a lato e rifatti alla fine.
- **Bussola:** quattro punti cardinali disegnati alla lavagna; un dado (1–4) sceglie la direzione; le dodici domande lette dalla scheda; numeri del registro estratti da bigliettini.
- **Tre domande:** tabella a tre colonne (chiede / chi risponde / non basta per) compilata insieme.
- **Veritas:** il docente descrive gli occhiali e «dà il verdetto» lanciando una moneta, poi lo svela.
- **Smista:** le 8 domande lette a voce; la classe alza 1, 2 o 3 dita.
- **Galileo:** la frase scritta alla lavagna e letta; la classe sottolinea la parte decisiva.
- **Sfida:** due squadre, domande lette dal docente, risposta a voce del portavoce entro 20 secondi; se sbaglia, ruba l’altra squadra; punti alla lavagna.
- **Patto:** regole proposte a voce e votate per alzata di mano, scritte su un cartellone.
- **Mappa dell’anno:** elenco delle UDA alla lavagna; mani alzate per la curiosità.
- **Prova:** le 4 domande lette a voce, risposte su un foglietto anonimo corretto insieme.

## 9. Fonti e limiti

- Galileo Galilei, *Lettera a Madama Cristina di Lorena* (1615), in *Le Opere*, Edizione Nazionale (a cura di A. Favaro), vol. V. Il testo citato («Io qui direi quello che intesi da persona ecclesiastica costituita in eminentissimo grado, ciò è l’intenzione dello Spirito Santo essere d’insegnarci come si vadia al cielo, e non come vadia il cielo») è quello dell’edizione nazionale; l’attribuzione al cardinale Cesare Baronio viene da una nota a margine ed è comunemente accolta.
- Giovanni Paolo II, Discorso alla Pontificia Accademia delle Scienze, 31 ottobre 1992: riportato **in discorso indiretto** (i teologi di allora non distinsero la Scrittura dalla sua interpretazione e portarono nel campo della fede una questione di ricerca scientifica).
- Concilio Vaticano II, *Dei Verbum* 11 (in discorso indiretto) e *Gaudium et spes* 16 (la coscienza come «sacrario» dell’uomo).
- Programmazione IRC classe IV (Matteo Sestili) per la mappa dell’anno, come nell’artefatto del 27 settembre; titoli delle prime lezioni dell’UDA 1 verificati su `data/lezioni.json`.
- Etimologie: Vocabolario Treccani (voci bussola, metodo, criterio, competente, prova, caricatura, coscienza, legale, vero, possibile, giusto).
- Macchine della verità (poligrafi) «da circa un secolo» e «affidabilità discussa»: dato generale, senza cifre.
- Gli occhiali Veritas sono inventati e dichiarati tali sullo schermo («inventati»), nel lead e nello Studio.

**Limite dichiarato:** in questa sessione la rete non raggiungeva treccani.it né vatican.va (accesso bloccato dal proxy). Le etimologie sono quelle correnti dei dizionari italiani e le citazioni sono testi noti, ma **non sono state ricontrollate in rete oggi**: prima di stampare materiali derivati, verificare in particolare le voci Treccani «bussola» (lat. mediev. *buxida*, gr. *pyxís*) e «competente» (lat. *competere*), il testo di GS 16 e la formulazione del discorso del 1992. Per questo le parole del 1992 e di DV 11 restano in discorso indiretto.

## 10. Collaudo (7 ottobre 2026, Chromium con Playwright)

37 controlli superati su 37: 10 scene avanti e indietro (pulsanti e frecce), somma 50; sondaggio d’ingresso e d’uscita con confronto; bussola (23 estrazioni senza ripetizioni); Rosa e verifica con errore e risposta giusta; Veritas (verdetto, voti, svelamento, scelta sbagliata); smista 8 voci con un errore voluto; leggi con tentativo sbagliato; aggancio; Sfida a squadre (avvio, alternanza dei turni, errore con «RUBATA!», furto riuscito e fallito, punteggio, «Vince Squadra Ciano»); altre 5 schede dei Giochi; ritorno alla scena 7 con le risposte conservate; patto (regola composta, libera, suggerimenti, togli); mappa con contatore; quiz con un errore (3/4); fumetto di glossario e pannello con 11 voci; Studio con download identico al `.txt` esportato; tema chiaro e scuro; LIM con tasto L e `?lim=1` a 1920 px; visore (`?in=visore`) con testata di una riga (55 px); 360 px e iPhone 13 senza scorrimento orizzontale, senza pulsanti sovrapposti e con la barra delle scene in fondo; iframe con sandbox `allow-scripts allow-forms allow-modals allow-popups allow-downloads` (scene, pausa gioco, ritorno, download); console senza errori; nessuna richiesta di rete esterna.

## 11. Che cosa è cambiato rispetto all’artefatto del 27 settembre

**Mantenuto:** la bussola dell’estate con le stesse 12 domande e l’estrazione dal registro; le tre domande vero/possibile/giusto e la quarta direzione «una domanda»; gli occhiali Veritas inventati e dichiarati, con verdetto casuale svelato e le stesse sei frasi (una lievemente accorciata); le 8 voci da smistare; la frase di Galileo con l’onestà su 1616, 1633 e 1992; le quattro caricature; il patto di confronto con gli stessi inizi, fini e suggerimenti; la mappa dei 28 incontri con le stesse UDA e gli stessi titoli; i tre piani e la regola sulla valutazione; la battuta di Bussolina sulla coscienza; il tono.

**Cambiato:**
- **50 minuti esatti** con fasi e minuti per scena (prima le scene sommavano 60 minuti e non avevano minuti dichiarati): 11 scene → 10.
- **Domanda della lezione** esplicita, «Funziona, quindi va bene», con sondaggio d’ingresso e d’uscita confrontati; il sondaggio «Rispetto a giugno, quanto ti senti cambiato?» è stato tolto (non era confrontabile alla fine e avrebbe portato a tre sondaggi): la conoscenza reciproca resta tutta nella bussola.
- **Rosa** (nuovo componente) al posto del `rivela`: la stessa bussola diventa la mappa del metodo, con fonte competente e limite di ogni domanda; più una **verifica** sul salto logico.
- **Veritas**: aggiunta la domanda «a quale domanda fingeva di rispondere la percentuale?», con esito motivato; etichetta «inventati» sempre visibile.
- **Galileo**: da `citazione` a `leggi` («trova la frase»), con l’onestà storica in un `aggancio` chiuso; rimando datato al 1992 in discorso indiretto.
- **Pausa gioco**: ora è la **Sfida a squadre** (8 domande, solo su ciò che è già stato spiegato); la vecchia «La fonte giusta» resta fra i Giochi di ripasso (Categorie). La nota «legale e giusto» passa nella restituzione.
- **Caricature e patto** uniti in una scena; la verifica sulle caricature passa nella prova finale, su un caso nuovo.
- **Mappa dell’anno**: aggiunte le «domande in gioco» per ogni UDA (lettura del docente, discutibile) e il contatore «ci incuriosisce» per alzata di mano; la battuta finale di Bussolina sull’incontro 2 compare al primo voto.
- **Prova finale** (4 domande su un caso nuovo, il braccialetto dell’attenzione) e **ritorno alla domanda iniziale**.
- **Glossario** di 11 parole con etimologia (prima assente); **Studio** riscritto in prosa continua con i nessi espliciti; giochi: Sfida rifatta, aggiunto Memory delle etimologie, Vero o falso e Quiz aggiornati.
- Cronometro proprio della scena eliminato (c’è il cronometro della barra); stato dei componenti conservato cambiando scena.
- CSS della lezione dentro il sorgente (prefisso `vp-`), solo token del design system; correzione mirata per i telefoni (vedi sotto).

**Problema del kit segnalato:** `design-system/assets/artefatti/skill-lezione/assets/kit/lab-percezione.css` (e la copia in `design-system/assets/artefatti/lab-percezione.css`) contiene `@media (max-width:720px){body.g,body.la{padding-bottom:144px}}`; negli artefatti di lezione (`body.ll`, alto 100dvh) fa salire la barra delle scene a 144 px dal fondo sui telefoni. Questa lezione lo neutralizza nel proprio CSS (`body.la.ll{padding-bottom:0}`); gli altri artefatti assemblati con il kit del 5 ottobre andrebbero controllati.
