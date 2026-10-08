# IV 1-1 · «Riformare una Chiesa: le indulgenze» (artefatto «Il denaro nella cassa») — note del docente

Artefatto: `uploads/iv1-1r~1.htm` (nome invariato: il sito lo collega così).
Sorgente: `sorgenti-lezioni/iv-1-1-riformare-una-chiesa-indulgenze.js` · Testo di studio: `sorgenti-lezioni/iv-1-1-riformare-una-chiesa-indulgenze.testo.txt`.
Fascicolo (invariato): `uploads/iv1-1r~1.pdf`.
Rifatto il 7 ottobre 2026 con la skill «IRC · Artefatto interattivo della lezione» (kit Lab IRC del 5 ottobre 2026), mascotte Bussolina.

Assemblaggio:

```bash
python3 -I design-system/assets/artefatti/skill-lezione/scripts/build_artefatto.py \
  sorgenti-lezioni/iv-1-1-riformare-una-chiesa-indulgenze.js \
  -o "uploads/iv1-1r~1.htm" --anno 4 --titolo "Il denaro nella cassa" \
  --descrizione "Indulgenze 1517: dottrina, procedura, distorsione"
node design-system/assets/artefatti/skill-lezione/scripts/esporta_testo.js \
  sorgenti-lezioni/iv-1-1-riformare-una-chiesa-indulgenze.js \
  sorgenti-lezioni/iv-1-1-riformare-una-chiesa-indulgenze.testo.txt
```

Lo stile dei tre componenti propri è dentro il sorgente (`<style id="dn-css">`, solo token): non serve `--css`.

## 1. Scheda della lezione

```text
Titolo e identificativo: IV 1-1 · Riformare una Chiesa: le indulgenze (artefatto «Il denaro nella cassa»)
Classe / età: IV, 17–18 anni
UDA e posizione: UDA 1 «Riformare una Chiesa, cambiare una cultura», lezione 1. La lezione 2, «Lutero a Worms»,
  è già nel nuovo stile: qui non si anticipano bolla Exsurge Domine, scomunica, dieta di Worms, coscienza.
  La chiusura rimanda a quella lezione (aggancio «Prossima lezione» nell'ultima scena e ultima sezione dello Studio).
Domanda centrale: Quando una protesta ha buone ragioni? (agganciata alla frase «La Chiesa vendeva il perdono»)
Obiettivo osservabile: lo studente distingue colpa e pena temporale; colloca un fatto del 1517 sul piano della
  dottrina, della procedura o della distorsione; riscrive «la Chiesa vendeva il perdono» in una forma critica ed esatta.
Criterio di riuscita: almeno 2 su 3 nella prova finale; nel componente «Due piani» la classe risolve i 4 gesti.
Dossier dei contenuti: non presente nel repository. Base: fascicolo PDF (invariato) e artefatto del 27 settembre 2026.
Catena: vedi § 2. Concetti: colpa / pena temporale; dottrina / procedura / distorsione; suffragio; commutazione.
Prova finale: scena 12 (quiz di 3 domande su un caso nuovo + riscrittura della frase) e sondaggio d'uscita.
```

## 2. Catena e mappa dell'essenziale

Catena (nessi storici e logico-teologici):

1. Un debito e un cantiere: Alberto deve a Roma, i Fugger anticipano, l'indulgenza per la Fabbrica rimborsa; Federico vieta in Sassonia. **Per questo** il contesto è politico prima che religioso — ma non è ancora la cosa predicata.
2. **Eppure** la dottrina predicata è precisa: remissione della pena temporale per peccati già perdonati, per chi è disposto.
3. **Ne segue che** colpa e pena sono due piani: «vendere il perdono» attribuisce alla dottrina ciò che non afferma.
4. La pratica nasce dalla penitenza antica e dalla commutazione: **per questo** l'elemosina entra nella storia, e lì può deformarsi.
5. **Quindi** servono tre parole: dottrina, procedura, distorsione.
6. La distorsione è documentata (Treccani; istruzione di Alberto; idee di Tetzel).
7. Lutero scrive prima di tutto una lettera a chi può rimediare; le tesi 27–28 colpiscono la distorsione con la dottrina stessa.
8. **Eppure** la tesi 36 tocca la procedura e la 62 la dottrina: il piano cambia.
9. La correzione cattolica arriva (1518 dottrina; 1562–1563 procedura) **ma** dopo 46 anni.

| Anello / concetto / parola | Scena |
|---|---|
| 1 Contesto (Leone X, Fabbrica, Alberto, Fugger, Tetzel, Federico) | 2 (animazione + aggancio) |
| 2 Definizione di Paolo VI | 3 (leggi) |
| 3 Colpa / pena temporale; pena eterna non in gioco; disposizione | 4 (DuePiani + verifica) |
| 4 Penitenza antica, commutazione, elemosina | 5 (ordina) |
| 5 Dottrina / procedura / distorsione | 6 (carte + mascotte), 7 (Sfida), 10, 12 |
| 6 Distorsione documentata, istruzione di Alberto, distico | 8 (testo, citazione, verifica) |
| Suffragio, purgatorio | 4, 8, 9 (tesi 28) |
| 7 Lettera del 31 ottobre, affissione «tradizionale», tesi 27–28 | 9 (Lettera) |
| 8 Tesi 36 e 62, che cosa cambia per chi risponde | 10 (Livelli) |
| 9 Egidio 1512, Cum postquam 1518, Trento 1562–1563, 1967, 2024; 46 anni | 11 (stima + tappe) |
| Esempio inventato del viaggio scolastico; risposta alla domanda | 12 |
| Glossario (16 voci con etimologia) | in tutte le scene con `{parola}`; pulsante «Glossario» |

## 3. Regia degli strumenti

| Anello | Che cosa deve capire la classe | Perché è difficile | Tipo | Strumento | Alternativa |
|---|---|---|---|---|---|
| 1 Contesto | Tetzel è l'ultimo anello di una catena di incarichi e di denaro | Molti attori, flussi incrociati | Processo / movimento | `animazione` a 6 fotogrammi «Segui il denaro» | `catena` |
| 2 Definizione | Che cosa dice esattamente la dottrina | Testo tecnico e denso | Lettura della fonte (principale) | `leggi` in modalità «trova la frase» | `citazione` |
| 3 Colpa / pena | **Concetto più difficile**: l'indulgenza non tocca la colpa, né la pena eterna, e richiede pentimento | L'equivoco «vendevano il perdono» è radicato e il lessico è nuovo | Distinzione + nesso | **componente proprio `DuePiani`** + `verifica` | `carte` + `verifica` |
| 4 Origine | La pratica nasce dalla commutazione della penitenza | Successione di secoli | Collocazione / processo | `ordina` | `tappe` |
| 5 Tre piani | Dottrina, procedura, distorsione | Concetti vicini, astratti | Distinzione | `carte` + `mascotte` | `confronto` |
| 6 Distorsione | Due deformazioni precise; il distico non è di Tetzel | Equivoco sul distico | Fonte + equivoco | `citazione` + `verifica` | `vf` |
| 7 Lettera e tesi 27–28 | Il primo gesto è una lettera; le tesi usano la dottrina | Latino; mito del martello | Lettura della fonte | componente proprio `Lettera` | `leggi` |
| 8 Il piano cambia | 27–28 distorsione, 36 procedura, 62 dottrina | Stesso autore, livelli diversi | Decisione della classe | componente proprio `Livelli` | `smista` |
| 9 Correzione e ritardo | Chiarita la dottrina, abolito l'abuso, ma tardi | Date, peso del ritardo | Dato che sorprende + tempo | `stima` (46 anni) + `tappe` | `seq` nei giochi |

Motivazione dello strumento più forte: `DuePiani` mostra due indicatori (legame spezzato/ricucito per la colpa, tre segni da purificare per la pena) e fa decidere la classe per ogni gesto; l'offerta senza pentimento e la promessa sull'inferno «non spostano nulla»: si vede che la distorsione non tocca nessuno dei due piani. Nessun blocco del kit mostrava insieme stato, gesto ed esito. `Lettera` rende il gesto del 31 ottobre come oggetto da aprire (destinatari, lamentela, richiesta, allegato) con il latino e la traduzione a richiesta. `Livelli` fa collocare quattro richieste sui tre piani e mostra alla fine che cosa cambia per chi deve rispondere.

Punti in cui decide la classe: scene 1, 3, 4, 5, 7, 8, 10, 11, 12. Equivoco più probabile («vendevano il perdono») smontato con esito motivato in scena 4 (DuePiani + verifica); secondo equivoco (distico di Tetzel) in scena 8.

Elementi interattivi dei componenti propri e feedback: scelte `la-choice` (hover bordo oro e spostamento, active 0,98, focus oro, esito verde/rosso con parola «Esatto/Ci ripensiamo/Regge/Non regge»); pulsanti `ll-btn` (magnetico, lama di luce), `ll-btn--ghost` per i sigilli della lettera e «Riprova», `ll-btn--solenne` per «E Alberto?», `ll-link` per «Traduci», «Ricomincia», «Riprova».

## 4. Piano minuto per minuto (somma 50)

| # | Fase | Minuti | Da–a | Scena | Strumento |
|---|---|---|---|---|---|
| 1 | Aggancio | 3 | 0–3 | La Chiesa vendeva il perdono? | `domanda` d'ingresso |
| 2 | Scoperta | 4 | 3–7 | Segui il denaro | `animazione` + `aggancio` |
| 3 | Scoperta | 5 | 7–12 | Che cosa si predicava | `leggi` (trova) + `aggancio` etimologia |
| 4 | Scoperta | 6 | 12–18 | Che cosa resta dopo il perdono | `DuePiani` + `verifica` |
| 5 | Scoperta | 3 | 18–21 | Da dove viene | `ordina` |
| 6 | Scoperta | 3 | 21–24 | Tre parole da non confondere | `carte` + `mascotte` |
| 7 | Attività | 6 | 24–30 | **Pausa gioco: Sfida a squadre** | `gioco` sfida + `rivela` |
| 8 | Scoperta | 4 | 30–34 | Che cosa andò storto | `citazione` + `verifica` |
| 9 | Scoperta | 5 | 34–39 | Prima di tutto, una lettera | `Lettera` |
| 10 | Scoperta | 4 | 39–43 | Quando il piano cambia | `Livelli` |
| 11 | Scoperta | 3 | 43–46 | La correzione e il suo ritardo | `stima` + `tappe` |
| 12 | Chiusura | 4 | 46–50 | Quando una protesta ha buone ragioni? | `quiz` + `domanda` d'uscita + aggancio a Worms |

Totale 50. La pausa gioco cade a metà, dopo il nucleo più denso (definizione, colpa/pena, tre piani), e usa solo nozioni già spiegate. Nessun tratto di solo ascolto supera i 5 minuti. Un solo percorso.

## 5. Piano di regia

In ritardo (in ordine):
- Sfida da 9 a 5 domande: fermarsi alla quinta e passare alla restituzione (−2′).
- Scena 5: mostrare subito «Mostra l'ordine giusto» e commentare (−2′).
- Scena 11: saltare le tappe e commentare solo la stima (−1′).
- Scena 2: avviare la riproduzione automatica invece dei fotogrammi uno per uno (−1′).
- Scena 9: aprire solo «Che cosa chiede» e «Che cosa allega» (−2′).

In anticipo:
- Domanda 4 del fascicolo («che cosa rende lento il riconoscimento di un errore…») come dibattito di 3–4 minuti dopo la scena 11.
- Gioco «Categorie» (dottrina/procedura/distorsione, 10 voci) in modalità Giochi, 4–5 minuti.
- In scena 10 far difendere a voce la doppia lettura della tesi 36.

## 6. Traccia orale

1. Leggere la frase, votare per alzata di mano; non commentare. «Che cosa, esattamente, sarebbe stato venduto?»
2. Fotogramma per fotogramma: chi deve a chi, perché. Sottolineare: Tetzel «sottocommissario», non agisce in proprio. Federico vieta per interesse anche suo. Aprire «Con onestà»: criticabile, ma non è ancora la dottrina.
3. Far leggere ad alta voce la definizione; la classe cerca la frase. Dopo la soluzione aprire le altre tre frasi (pena temporale, disposizione, tesoro).
4. Per ogni gesto la classe vota prima di toccare. Usare l'analogia solo con il limite dichiarato: gli indicatori sono uno schema, non una «contabilità» del peccato. Poi verifica lampo.
5. Coppie di 1 minuto, poi controllo alla LIM. Insistere: l'opera restava, restava il pentimento.
6. Girare le carte e far proporre un esempio di oggi per ciascun piano (non scritto sullo schermo).
7. Sfida: nomi collettivi delle squadre, la squadra dice il perché prima di toccare. Al ritorno, due domande di restituzione.
8. Leggere la Treccani; chiedere quali due deformazioni. Poi la domanda sul distico.
9. Aprire i sigilli in ordine; leggere il latino di 27–28 (anche solo «nummus», «cista», «suffragium»), poi la traduzione. «E Alberto?»: silenzio e trasmissione a Roma. Il martello sulla porta resta «racconto tradizionale».
10. Una richiesta alla volta, voto per alzata di mano, poi tocco. Leggere il riquadro finale: distorsione / procedura / dottrina e che cosa chiedono a chi risponde.
11. Stima con un valore proposto dalla classe; svelare; poi tappe 1512, 1518, 1562, 1563 (le altre se c'è tempo).
12. Quiz a voce, poi sondaggio d'uscita e confronto con il tratteggio. Chiudere con i «due giudizi distinti» e l'aggancio a Worms.

## 7. Soluzioni

- Scena 3 (leggi): «già rimessi quanto alla colpa».
- Scena 4 (DuePiani): 1 colpa; 2 pena temporale; 3 niente (manca la disposizione: distorsione); 4 niente (la pena eterna non è in gioco: distorsione). Verifica: B, remissione della pena temporale di peccati già perdonati.
- Scena 5 (ordina): penitenza pubblica → intercessione dei martiri → commutazione → assoluzione prima della penitenza → opere che sostituiscono tutta la penitenza.
- Scena 8 (verifica): C, il distico non è in uno scritto di Tetzel; corrisponde alle sue idee «se non proprio alle sue parole» (Martina).
- Scena 10 (Livelli): tesi 27 distorsione; lettera procedura (accettata anche distorsione, perché l'istruzione conteneva la deformazione); tesi 36 procedura; tesi 62 dottrina.
- Scena 11 (stima): 46 anni (1517–1563).
- Scena 12 (quiz): 1 procedura (B); 2 «si sta vendendo l'accesso…» (C, distorsione); 3 la frase sull'istruzione ufficiale e i predicatori (A).
- Sfida a squadre (9): Fugger; Fabbrica di San Pietro; Federico il Saggio; pena temporale di peccati già perdonati; nel sacramento della penitenza, gratuitamente; pentito; riscattate con altre opere; distorsione; procedura. Restituzione: «Quale domanda ha diviso di più le squadre?»; «Perché la frase “vendevano il perdono” confonde due piani?».
- Domande del fascicolo: 1 es. «Nel 1517 un'istruzione ufficiale e molti predicatori presentavano come acquistabile con denaro, anche senza pentimento, la remissione della pena; la colpa, per la dottrina, si rimetteva solo nella confessione»; 2 la predicazione: «hominem predicant», «suffragium… in arbitrio dei solius»; 3 lettera = procedura (correggere l'amministrazione, rivolta a chi può); tesi 62 = dottrina (chiede conversione o rottura); 4 aperta, senza punteggio.

## 8. Varianti senza proiettore

- Scena 1 e 12: alzata di mano con conteggio alla lavagna.
- Scena 2: disegnare alla lavagna sei nomi e le frecce, una alla volta, con le didascalie lette dal docente.
- Scena 3: definizione fotocopiata (o dal fascicolo, p. 2); sottolineare la frase giusta.
- Scena 4: due colonne alla lavagna, «colpa» e «pena»; il docente legge i 4 gesti, la classe vota A/B/C con le dita.
- Scena 5: cinque cartoncini da ordinare a coppie.
- Sfida a squadre: domande lette dal docente, due squadre, risposta a voce entro 20 secondi, rubata all'altra squadra; punteggio alla lavagna.
- Scene 8–10: fascicolo pp. 3–4; per le quattro richieste, tre cartelli «Distorsione / Procedura / Dottrina» alzati dalla classe.
- Scena 11: stima scritta sul quaderno, poi il dato.

## 9. Fonti

- Paolo VI, *Indulgentiarum doctrina*, 1 gennaio 1967: nn. 6–8, 12; Norme nn. 1 e 3 (vatican.va).
- *Catechismo della Chiesa Cattolica*, n. 1472.
- Francesco, *Spes non confundit*, 9 maggio 2024, n. 6 (il numero è confermato da La Civiltà Cattolica, «Indulgenze: un invito ad attingere dal tesoro della Chiesa»; testo non riaperto su vatican.va).
- Lutero, *95 tesi*, tesi 27, 28, 36, 62: testo latino, Taylor Editions (Oxford); traduzioni di servizio. Lettera ad Alberto del 31 ottobre 1517 in forma indiretta.
- G. Martina, *Storia della Chiesa da Lutero ai nostri giorni*, I, Morcelliana 1993.
- Treccani: *Dizionario di Storia*, «Indulgenza»; *Enciclopedia*, «Johann Tetzel», «Riforma protestante»; DBI, «Egidio da Viterbo». Britannica: «Johann Tetzel», «Albert of Brandenburg».
- Leone X, *Cum postquam* (1518); Concilio di Trento, sess. XXI cap. 9 e sess. XXV (trad. Waterworth, 1848).
- Etimologie: Vocabolario Treccani.

**Limite dichiarato.** In questa sessione la rete in uscita non raggiungeva vatican.va, treccani.it né l'edizione di Oxford: le citazioni non sono state ricontrollate sulla fonte primaria in rete, ma riprese parola per parola dal fascicolo (che le cita con edizione e numero). Da verificare prima della pubblicazione: il testo italiano di *Indulgentiarum doctrina* nn. 6, 8, 12 e Norme 1 e 3; *Spes non confundit* n. 6; il latino delle tesi 27, 28, 36, 62; la citazione di Martina («se non proprio alle sue parole»); le etimologie (in particolare *suffragium* e *giubileo*). La data «dal 1516» per l'incarico di Tetzel segue il fascicolo e Britannica: alcune ricostruzioni datano la nomina di Alberto a sottocommissario generale all'inizio del 1517.

## 10. Collaudo (7 ottobre 2026)

Playwright + Chromium, server locale su porta 8784: 175 controlli superati, 0 falliti. Somma minuti 50; tutte le scene avanti e indietro (pulsanti e frecce); ogni blocco con errore e risposta giusta; animazione fotogramma per fotogramma a 1366, 1920 (LIM), 390 e 360 px, senza attori o etichette sovrapposti; pausa gioco e ritorno alla scena 7 con le risposte conservate; Sfida a squadre (avvio, turni alternati, errore e rubata riuscita, punteggio, schermata finale); glossario (16 voci) e fumetti; Studio con download del testo; tema chiaro/scuro; LIM con `?lim=1`, tasto L e pulsante; visore (`?in=visore`) con testata di una riga da 55 px a 1280 e 390 px; 360 px e iPhone 13 senza scorrimento orizzontale, barra delle scene in fondo, mascotte non sovrapposta; iframe con sandbox senza `allow-same-origin` funzionante (animazione, componente proprio, sfida, download). Console senza errori; nessuna richiesta di rete esterna. localStorage: solo preferenze del kit (tema, LIM, skin, ultima scheda, nomi predefiniti delle squadre).

Ricontrollo dell’8 ottobre 2026, dopo la correzione del kit per la LIM (`lab-skill.css`): in LIM a 1366×768 e 1280×800 l’animazione sta in una schermata in tutti i fotogrammi (titolo, palco, didascalia e comandi; margine minimo 53 px sopra la barra delle scene), e c’è posto anche a 1920×1080; dentro il visore del sito, su computer, Android e iPhone: testata di una riga da 55 px, barra delle scene in fondo, nessuno scorrimento orizzontale, nessun errore.

## 11. Che cosa è cambiato rispetto alla versione precedente

Mantenuto: titolo, domanda, catena e contenuti del fascicolo; i tre piani dottrina/procedura/distorsione; la citazione Treccani; la lettera del 31 ottobre con le tesi 27–28 in latino; la cronologia 1300–2024; la prova sulla frase «critica ed esatta»; i dati dei giochi (rivisti).

Cambiato:
- **Tempo**: la versione precedente sommava 60 minuti (dieci scene annotate 0–60) e non dichiarava fasi né minuti; ora 12 scene con fase e minuti, somma esatta 50, cronometro.
- **Strumenti**: la catena degli incarichi diventa un'animazione «Segui il denaro»; la definizione si legge con «trova la frase»; colpa/pena (concetto più difficile) ha un componente proprio con esito motivato; l'origine della pratica si ricostruisce con `ordina`; la correzione apre con una `stima` (46 anni); i «Livelli» seguono ora i tre piani del fascicolo.
- **Pausa gioco**: da «Categorie» (8′) a **Sfida a squadre** (6′, 9 domande), con restituzione; Categorie resta nei Giochi per il ripasso.
- **Glossario** con 16 voci ed etimologie (prima assente); **mascotte** Bussolina in apertura e chiusura; sondaggio d'uscita con confronto; rimando esplicito alla lezione 2 «Lutero a Worms».
- **Studio**: testo continuo che copre tutto il fascicolo (sezioni A–G, comprese le domande e l'esempio del viaggio), con i nessi espliciti.
- Origine, colpa/pena e definizione completa (con «tesoro delle soddisfazioni di Cristo e dei santi») ora sono sullo schermo, come nel fascicolo.

Corretto:
- **Durata**: 60 → 50 minuti.
- **Tesi 36**: prima classificata «a doppia lettura» (rivedere lo strumento o cambiare la dottrina); ora, come nel fascicolo, critica di **procedura**, con la lettura forte nominata nella spiegazione.
- **Lettera ad Alberto**: prima posta sullo stesso piano delle tesi 27–28; ora procedura (accettata anche distorsione), come chiede la domanda 3 del fascicolo.
- Non sono emersi errori di fatto nei contenuti della versione precedente rispetto al fascicolo; il purgatorio, prima non definito, ora è distinto dall'inferno nel glossario, perché il gesto 4 di `DuePiani` e la citazione Treccani lo richiedono.
