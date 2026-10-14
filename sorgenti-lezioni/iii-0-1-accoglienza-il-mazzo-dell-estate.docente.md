# Il mazzo dell'estate · Note del docente (Anno III, accoglienza)

Artefatto: `uploads/accoglienza-terza-mazzo-estate-artefatto.html` (stesso nome di prima: i collegamenti del sito restano validi).
Sorgente: `sorgenti-lezioni/iii-0-1-accoglienza-il-mazzo-dell-estate.js` · Testo di studio: `sorgenti-lezioni/iii-0-1-accoglienza-il-mazzo-dell-estate.testo.txt`.
Filo logico riscritto il 14 ottobre 2026 (otto scene, 50 minuti) con la skill «IRC · Artefatto interattivo della lezione» (kit Lab IRC definitivo del 5 ottobre 2026), poi ripassato lo stesso giorno sui rilievi di due revisori (§ 11). La grafica è quella approvata: kit, palette e mascotte non sono cambiati; il componente `Mazzo` ha la stessa grafica e un pulsante in più, «Carta ponte» (vedi § 3).

Riassemblaggio:

```bash
python3 -I design-system/assets/artefatti/skill-lezione/scripts/build_artefatto.py \
  sorgenti-lezioni/iii-0-1-accoglienza-il-mazzo-dell-estate.js \
  -o uploads/accoglienza-terza-mazzo-estate-artefatto.html --anno 3 \
  --titolo "Il mazzo dell'estate" \
  --descrizione "Accoglienza IRC per la classe III: un gioco di carte per raccontare l'estate e le attese, poi la presentazione dell'anno «Chi l'ha deciso?»."
node design-system/assets/artefatti/skill-lezione/scripts/esporta_testo.js \
  sorgenti-lezioni/iii-0-1-accoglienza-il-mazzo-dell-estate.js \
  sorgenti-lezioni/iii-0-1-accoglienza-il-mazzo-dell-estate.testo.txt
```

## 1. Scheda della lezione

```text
Titolo e identificativo: III 0-1 · Il mazzo dell'estate (accoglienza)
Classe / età: III, 16-17 anni
UDA e posizione: UDA 0 «Accoglienza», prima ora dell'anno. Segue l'UDA «I luoghi che cambiano la vita - regola
  di san Benedetto» (lezioni «La misura dei più deboli», «Chi può insegnare a chi»).
Domanda dell'anno (resta aperta apposta): chi l'ha deciso?
Obiettivo osservabile e criterio di riuscita:
  1. ciascuno si presenta rispondendo a voce a una carta (estate, attese, domande, sfide);
  2. la classe sa ripetere la domanda dell'anno e spiegare con «decidere» (tagliar via) perché ha senso porla;
  3. la classe sa nominare le tappe, dire che cosa si valuta e le tre regole del patto
     (Sfida a squadre: almeno 6 risposte giuste su 8 fra le due squadre).
Dossier dei contenuti: nessuno. È un'accoglienza: non c'è una tesi da dimostrare né una catena causa-effetto
  da percorrere; i contenuti sono il mazzo e la mappa dell'anno del docente (versione del 14 settembre 2026).
  Per questo la chiusura non è una prova su casi nuovi ma la carta dell'anno, uguale per tutti, e la domanda
  dell'anno resta aperta fino alla prima tappa.
Filo dell'ora (un solo racconto, ogni scena comincia dove finisce la precedente):
  mazzo → una carta del mazzo (la carta ponte) → quattro passi fino a «chi l'ha deciso?» e la parola «decidere»
  → la domanda ha due facce (deciso prima di voi / decidete voi) e le sei tappe le guardano una alla volta
  → con quali strumenti e che cosa conta → tre regole, anche per chi insegna → Sfida a squadre su tutto ciò
  che è stato mostrato → otto risposte, una domanda resta aperta: la carta dell'anno, poi la prossima ora.
Concetti e parole: decidere (de- + caedere, nell'etimo); nelle scene come parole nuove: verifica rovesciata,
  talenti, fonte, argomento. Nel glossario, per lo Studio: accoglienza, regola, monastero, università,
  vizi capitali, obiezione di coscienza.
Fraintendimenti da smontare: «è sempre stato così» (scena 3, passo 2); «in religione si valuta la fede»
  (scena 5, terza idea; scena 6, terza domanda); «se il prof lo dice devo crederci» (scena 6, prima domanda).
Chiusura: carta dell'anno (nuvola) con l'aggancio alla prossima ora; nessun sondaggio, nessun quiz.
```

Nessun punteggio sulle convinzioni: la nuvola e la riflessione dei giochi sono senza voto e senza nomi; nulla viene salvato (carte e parole restano in memoria finché la pagina è aperta). Le squadre della Sfida hanno nomi collettivi.

## 2. Mappa dell'essenziale

| Contenuto | Scena | Studio |
|---|---|---|
| L'ora in tre tempi: mazzo · la domanda dell'anno · come lavoreremo | 1 (lead + scaletta `html` a tre voci) | — |
| Conoscersi: estate, attese, domande, sfide; 24 carte, 4 semi, 40 secondi, «passo» una volta, comincia chi insegna | 2 (Mazzo) | «Il mazzo dell'estate» |
| *Accoglienza* (ad + colligere) | — (solo Studio e glossario) | «Il mazzo dell'estate» |
| La carta ponte: «Una cosa che fai tutti i giorni e di cui non sai chi l'ha inventata» | 2 (pulsante «Carta ponte», carta segnalata), 3 (lead: tutti provano a rispondere) | «Il mazzo dell'estate» → «La domanda dell'anno» |
| Invisibili → decise (orario, ospedale, domenica) → si poteva decidere diversamente | 3 (rivela, passi 1-2) | «La domanda dell'anno» |
| E riguarda voi: avete sedici anni, per questo conviene scoprire che cosa era già deciso, e da chi | 3 (rivela, passo 3) | «La domanda dell'anno» |
| Chi l'ha deciso? Medioevo e cristianesimo, insieme a Greci e Romani, città, commerci, re | 3 (rivela, passo 4); la sola domanda torna in 8 (lead) | «La domanda dell'anno» |
| *Decidere* = tagliar via | 3 (etimo) | «La domanda dell'anno» |
| La domanda ha due facce (deciso prima di voi / decidete voi); sei tappe con «A che cosa vi serve», ognuna dice di quale decisione si tratta; verifica rovesciata (nella tappa 3) | 4 (lead + tappe, sei voci) | «Le sei tappe» |
| San Carlo Acutis, nome del laboratorio | 4 (aggancio «Per capire», una riga senza date) | «Le sei tappe» (con le date) |
| Tre strumenti (lezione interattiva, fascicolo, verifica); tre cose contano (partecipazione, verifiche, Talenti con griglia); nessuno è valutato per ciò che crede | 5 (carte + idee) | «Come si lavora e come si valuta» |
| Il patto: fonte, argomento, libertà; vale anche per chi insegna | 6 (lead + dubbi) | «Il patto» |
| Ripasso di domanda, tappe, strumenti, valutazione, patto; due domande al ritorno | 7 (Sfida a squadre + idee «Al ritorno») | «La carta dell'anno» (prima riga) |
| Carta dell'anno: una cosa che vorresti decidere tu | 8 (nuvola) | «La carta dell'anno» |
| Prossima ora: la Regola di Benedetto, a che cosa serve una regola, il telefono vietato a scuola | 8 (aggancio «Tra sette giorni», sotto la nuvola) | «La carta dell'anno» |

## 3. Regia degli strumenti

| Momento | Che cosa deve capire la classe | Perché è difficile | Strumento | Alternativa |
|---|---|---|---|---|
| Apertura | L'ora ha tre tempi, in quest'ordine | Primo giorno: serve una mappa dell'ora, non un sondaggio | `html`: scaletta di tre voci scritte a mano, con le parole del lead (l'`agenda` del kit mostrerebbe le cinque fasi con le etichette di regia «Aggancio, Scoperta…», che non sono le tre cose dette a voce) | Scaletta alla lavagna |
| Conoscersi | L'ora è anche loro: si parla, si ascolta | Imbarazzo; rischio che parlino sempre gli stessi | **Componente proprio `Mazzo`** (24 carte in 4 semi, pesca senza ripetizioni, carta a caso, pulsante «Carta ponte», rimescola a due tocchi, cronometro di 40 s, carta ponte segnalata, memoria in pagina) | Mazzo di carta stampato |
| La domanda | Dalla carta alla domanda dell'anno in quattro passi | È un ragionamento, non un dato: va scoperto un passo alla volta | `rivela` («E quindi?») + `etimo` *decidere* | Quattro frasi alla lavagna |
| La mappa | Le due facce della domanda; sei tappe, a che cosa servono | Tanta informazione, poco tempo | `tappe` a sei voci (la classe sceglie quale aprire) + `aggancio` Acutis | Mappa stampata |
| Il metodo | Tre strumenti; tre cose contano; non si valuta la fede | Equivoco diffuso sull'IRC | `carte` (tre) + `idee` (tre) | Mani alzate |
| Il patto | Fonte, argomento, libertà | Detto dal docente suona come predica | `dubbi` (le domande che non si fanno) | `rivela` |
| Ripasso | Fissare domanda, tappe, metodo, patto | Molte novità in pochi minuti | **Sfida a squadre** (pausa gioco, 8 domande) + `idee` «Al ritorno» (parte con zero voci: le due domande compaiono solo dopo la partita) | Sfida a voce |
| Chiusura | Otto risposte, una domanda aperta; la carta dell'anno; la prossima ora | — | `nuvola` + `aggancio` «Tra sette giorni» (sotto la nuvola) | Lavagna e fotografia |

Nessuna catena né animazione: un'accoglienza non ha un dossier con un nesso causale da mostrare; il passaggio da scoprire è il `rivela` della scena 3, che la classe apre un passo alla volta. L'unico punto con risposta giusta o sbagliata è la Sfida a squadre: nelle scene non ci sono quiz né verifiche, perché sarebbero doppioni della Sfida sugli stessi contenuti.

Componente proprio: `Mazzo` fa ciò che nessun blocco del kit fa, cioè un gioco di presentazione a turni con un mazzo che si consuma e un cronometro breve per ogni carta. Elementi interattivi e feedback: semi (`la-choice`: hover bordo oro e −2 px, active 0,97, focus oro, disabilitati a seme esaurito); «Carta a caso» (`ll-btn`: magnetico, lama di luce, active 0,96); **«Carta ponte»** (`ll-btn--ghost`, visibile solo finché la carta ponte è nel mazzo: la pesca a comando); «Rimescola» (`ll-btn--ghost`, conferma a due tocchi, si disarma dopo tre secondi e a qualsiasi altra azione sul mazzo); cronometro (`ll-btn--ghost`; barra d'oro, negli ultimi dieci secondi rosa con la scritta «ultimi secondi», a zero «tempo!» e «Di nuovo»). **La carta ponte non esce mai a caso**: toccando il seme Domande o «Carta a caso» escono le altre cinque carte del seme; la ponte esce solo con il suo pulsante, oppure come ultima carta del seme Domande. Così chi insegna la fa uscire quando vuole, di norma alla fine del giro, e la scena 3 può contare su di lei. Compare con l'etichetta «Carta ponte: torna fra poco» e la mascotte lo dice. A mazzo finito l'ultima carta resta sul tavolo, «Carta a caso» e i semi si disattivano, parte la festa. Lo stato del mazzo resta in memoria cambiando scena e dopo la pausa gioco.

Blocchi usati (nessun tipo interattivo più di due volte): html, custom Mazzo, rivela, etimo, tappe, carte, idee ×2, dubbi, gioco, nuvola; aggancio ×2.

## 4. Piano minuto per minuto (50′)

| Min | Scena | Fase | Strumento | La classe fa |
|---|---|---|---|---|
| 0-2 | 1 · Bentornati: ventiquattro carte | Aggancio | scaletta a tre voci (html) | ascolta i tre tempi dell'ora |
| 2-17 | 2 · Pesca una carta | Attività | Mazzo (40 s a carta; «Carta ponte» alla fine del giro) | ognuno risponde a una carta |
| 17-22 | 3 · Chi l'ha deciso? | Scoperta | rivela (4 passi) + etimo | tutti provano a rispondere alla carta ponte; apre i passi, scompone «decidere» |
| 22-30 | 4 · Ventotto ore, sei tappe | Scoperta | tappe (sei voci) + aggancio Acutis | sceglie quali tappe aprire |
| 30-34 | 5 · Come si lavora, che cosa si valuta | Scoperta | carte (tre) + idee (tre) | gira le carte, rivela le tre idee |
| 34-39 | 6 · Tre regole, anche per me | Attività | dubbi | legge e apre le domande |
| 39-45 | 7 · Sfida a squadre (**pausa gioco**) | Attività | gioco `sfida` + idee «Al ritorno» | gioca in due squadre |
| 45-50 | 8 · La carta dell'anno | Chiusura | nuvola + aggancio «Tra sette giorni» | una parola a testa |

Somma: 2 + 15 + 5 + 8 + 4 + 5 + 6 + 5 = **50**. Un solo percorso. Tratti di solo ascolto: mai oltre 3 minuti (anche nelle scene 3-5 la classe tocca e sceglie). Momenti attivi con esito visibile: mazzo, rivela, etimo, tappe, carte, idee, dubbi, sfida, nuvola.

Pausa gioco: **dopo il nucleo** (scena 7), perché serve fissare in modo leggero le molte novità (domanda, tappe, metodo, patto). Le otto domande della Sfida riguardano solo ciò che è già stato mostrato prima della pausa.

## 5. Piano di regia

**In ritardo** (il cronometro segna +N′):
- mazzo: una carta a testa, seme «Sfide» solo per i volontari; con più di 20 studenti si scende a 30 secondi detti a voce (−3′); la carta ponte esce solo con il pulsante «Carta ponte»: toccarlo per l'ultima pescata del giro (se proprio non c'è tempo, si salta: il lead della scena 3 la legge comunque e vale lo stesso);
- scena 4: aprire solo tappa 1, tappa 3 (con la verifica rovesciata) e tappa 6; il resto è nello Studio (−3′);
- Sfida a squadre: fermarsi dopo 6 domande (il punteggio resta valido; −2′).
Non tagliare mai: la scena 3 (è la domanda dell'anno) e la carta dell'anno.

**In anticipo**:
- secondo giro di mazzo (semi Domande e Attese);
- in scena 3, chiedere alla classe un'altra cosa «decisa» da aggiungere al passo 2;
- in modalità Giochi: Vero o falso (8 affermazioni) o Abbinamenti tappa ↔ domanda;
- domanda di dibattito: «Che cosa vorreste decidere voi, e chi lo decide oggi?».

## 6. Traccia orale per scena, con i ponti

1. **Bentornati.** «Tre mesi senza vederci. Oggi tre cose, in quest'ordine: ci raccontiamo con un mazzo di carte; una carta del mazzo diventa la domanda dell'anno; poi vediamo come lavoreremo fino a giugno.» Sullo schermo la scaletta dice le stesse tre cose, con una riga ciascuna: indicarla, non leggerla. Le fasi con i minuti stanno nella barra in basso. Niente sondaggio: il primo giorno non c'è una tesi da verificare.
2. **Pesca una carta.** Ponte: «Prima cosa: ci raccontiamo.» Pescare per primi e rispondere davvero: è il modello di misura e di sincerità che la classe copierà (in terza più che in quarta: il primo che si espone decide il registro). Poi a turno, in ordine di banco. Quaranta secondi; «passo» una volta. **La carta ponte esce solo quando la chiamate voi**: toccando il seme Domande escono le altre cinque carte del seme, mai la ponte; alla fine del giro toccate «Carta ponte» e rispondete voi per primi (onestamente: «non lo so»). La mascotte dice «Tenetela a mente». Se il tempo è finito e la ponte non è uscita, non cercatela: il lead della scena 3 la legge e la fa provare a tutti. Annotare (a mente o su carta, non nell'artefatto) chi dice di saper fare qualcosa che gli altri non sanno: è il primo censimento per i Talenti. La carta sull'abitudine chiede apposta di non dire quale: non chiederlo.
3. **Chi l'ha deciso?** Ponte: «Nel mazzo c'è una carta: una cosa che fai tutti i giorni e di cui non sai chi l'ha inventata. Provate a rispondere tutti, adesso, in dieci secondi.» Contare davvero dieci secondi; raccogliere due o tre tentativi. «Quasi nessuno ci riesce, ed è normale: non era una carta a caso.» Aprire i quattro passi con «E quindi?»: invisibili → eppure decise (orario, ospedale, domenica: si poteva fare diversamente) → e riguarda voi: avete sedici anni, per questo conviene scoprire che cosa era già deciso, e da chi → la domanda dell'anno (Medioevo e cristianesimo, insieme a Greci e Romani, città, commerci, re). Poi la parola: toccare *de-*, *caedere*, *decīdere*. «Chi decide taglia via le altre strade: allora si poteva fare diversamente, e ha senso chiedersi chi ha deciso.»
4. **Sei tappe.** Ponte: «La domanda ha due facce: che cosa è stato deciso prima di voi, e che cosa cominciate a decidere voi. Le sei tappe le guardano una alla volta: ognuna comincia con una domanda e dice in anticipo a che cosa vi serve. Scegliete voi quale aprire.» Ogni scheda finisce dicendo di quale decisione si tratta (tappa 1: qualcuno l'ha deciso e poteva decidere diversamente; tappa 2: l'abitudine l'avete decisa voi, un gesto alla volta; tappa 3: decidere di quali fonti fidarvi, e a metà anno la verifica rovesciata; tappa 4: un'idea decisa prima di voi; tappa 5: il nome l'hanno deciso altri, che cosa farne lo decidete voi; tappa 6: la tappa che decidete voi). Aprire almeno tappa 1, tappa 3 e tappa 6. Chiudere su tappa 6, Talenti: «Cominciate a pensarci da oggi». Eventuale cenno al patrono (aggancio «Per capire», una riga): Carlo Acutis, quindici anni, un talento informatico usato per gli altri.
5. **Come si lavora.** Ponte: «Sei tappe, un'ora a settimana: con quali strumenti, e che cosa conta alla fine?» Girare le tre carte (lezione interattiva, fascicolo, verifica); poi le tre cose che contano, una alla volta: partecipazione, verifiche di fine tappa, Talenti con la griglia. Dire chiaramente la coda della terza: «Nessuno è valutato per ciò che crede: tutti per ciò che capiscono e per come lo argomentano».
6. **Il patto.** Ponte: «Se si valuta ciò che capite e come lo argomentate, mai ciò che credete, servono tre regole: su come si sa una cosa, su come si discute, su che cosa nessuno è tenuto a credere. Valgono anche per chi insegna.» Far leggere le domande a voce alta da quattro studenti; il docente risponde; aprire una alla volta. «Valgono anche per me.»
7. **Sfida a squadre.** Ponte: «Domanda dell'anno, sei tappe, strumenti e patto: molte novità in pochi minuti. Due squadre, otto domande: vediamo che cosa è rimasto.» Due metà della classe, nomi collettivi. La regola è scritta nel riquadro, una volta sola: venti secondi per rispondere, dieci per rubare (a voce: «chi sbaglia lascia la domanda all'altra squadra, che vale metà punti»). Al ritorno (pulsante «Torna alla lezione · scena 7») il riquadro «Al ritorno» è vuoto: toccare «La prima domanda» (la più discussa, e perché), poi la seconda (una domanda a chi insegna, su una tappa, uno strumento o il patto: «il patto dice che è legittima»).
8. **La carta dell'anno.** Ponte: «Otto domande, otto risposte. Una sola resta senza risposta: chi l'ha deciso? Non si chiude oggi: la prima risposta arriva fra sette giorni, con la prima tappa. Prima, un'ultima carta, uguale per tutti: una cosa che vorresti decidere tu, quest'anno.» Giro rapido, una parola a testa, senza commento; scriverle nella nuvola (o alla lavagna) e **fotografarle**: si rileggono alla verifica rovesciata. Per ultimo aprire «Tra sette giorni», sotto la nuvola: un monastero, una regola scritta; a che cosa serve una regola, e che cosa c'entra con il telefono vietato a scuola (è l'apertura vera della prossima ora). «Chi l'ha decisa, e perché?»

## 7. Soluzioni

**Sfida a squadre (8 domande):** 1 B «Chi l'ha deciso?» · 2 D la domenica libera (i distrattori «avere sonno, avere fame, sentire freddo» sono casi nuovi, non detti nelle scene: si risponde per esclusione, perché la domenica libera è stata nominata al passo 2 fra le cose decise) · 3 C Storia · 4 B un'ora in cui le domande le fanno gli studenti · 5 D ciò che capite e come lo argomentate · 6 C tutti, anche verso chi insegna · 7 D Talenti · 8 B sì, purché con argomenti.
Restituzione (riquadro «Al ritorno», due voci che compaiono solo dopo la partita): «La più discussa: quale domanda ha diviso di più le squadre, e perché?» · «Una domanda a chi insegna: su una tappa, su uno strumento, sul patto.»

**Vero o falso (giochi):** F, V, F, V, F, V, F, V (ragioni nell'artefatto; la 5, «nate solo grazie al cristianesimo», si risponde con il passo 4 della scena 3: Greci e Romani, città, commerci, re). **Abbinamenti:** Storia ↔ chi ha costruito il mondo; Teologia ↔ perché fai cose che non vuoi; Filosofia ↔ è da stupidi credere; Politica e coscienza ↔ un ordine da non eseguire; Bibbia ↔ chi sei quando nessuno ti guarda. **Riflessione:** senza soluzione e senza voto, resta solo sullo schermo; lo spunto («una cosa decisa da altri prima di te, di cui vorresti sapere chi l'ha decisa e perché») è diverso dalla carta dell'anno, per non ripetere a casa lo stesso atto fatto in classe.

## 8. Varianti senza proiettore

- **Mazzo:** 24 carte stampate in 4 colori (il testo è nell'array `SEMI` del sorgente); cronometro del telefono del docente; la carta ponte la tiene in tasca il docente e la legge per ultima.
- **La domanda:** i quattro passi su quattro fogli, appesi uno alla volta; «decidere» scomposto alla lavagna.
- **Tappe e metodo:** la mappa dell'anno fotocopiata (o lo Studio stampato con «Stampa»).
- **Patto:** le quattro domande lette da quattro studenti, risposte a voce.
- **Sfida a squadre:** il docente legge domande e quattro opzioni; le squadre rispondono a voce dopo dieci secondi di consultazione; errore → l'altra squadra può rubare per metà punti; punteggio alla lavagna.
- **Carta dell'anno:** parole alla lavagna, poi una fotografia.

## 9. Fonti e stato della verifica

- Mazzo e mappa dell'anno «Chi l'ha deciso?»: materiali del docente (versione originale del 14 settembre 2026, ripresa parola per parola per le carte, le tappe, gli strumenti, le tre cose che contano, le tre regole e la carta dell'anno).
- Etimologie: *Vocabolario Treccani*, voci «decidere» (lat. *decīdĕre*, «tagliar via», comp. di *de-* e *caedĕre*), «accogliere» (lat. *accollĭgĕre*, comp. di *ad-* e *collĭgĕre*), «talento» (lat. *talentum*, gr. *tálanton*; senso di «dote» dalla parabola evangelica), «vizio» (lat. *vitium*) e «capitale» (lat. *capitalis*, da *caput*), «coscienza» (lat. *conscientia*, da *conscire*), «regola» (lat. *regŭla*, «assicella, regolo», da *regĕre*), «monastero» (lat. tardo *monasterium*, gr. *monastḗrion*, da *monázō*, *mónos*), «universitas», «argomento» (lat. *argumentum*, da *arguĕre*, «dimostrare»), «fonte» (lat. *fons*). **Stato:** controllate il 7 ottobre 2026 attraverso gli estratti dei risultati di ricerca del sito Treccani (il sito non era raggiungibile direttamente); il 14 ottobre non sono state ricontrollate. Conviene una verifica a vista sul Vocabolario prima della pubblicazione definitiva.
- Canossa, gennaio 1077: Gregorio VII, lettera ai principi tedeschi, *Registrum* IV,12 (l'attesa di tre giorni davanti alla porta). Riferimento noto, non ricontrollato sul testo.
- Otto Dix, *I sette peccati capitali* (1933), Staatliche Kunsthalle Karlsruhe. Nella scena 4 la tappa 2 dice solo «un dipinto del 1933 che li usa per raccontare il crollo di una nazione» (frase del docente, 14 settembre); autore e museo stanno nello Studio e qui.
- Carlo Acutis (Londra, 3 maggio 1991 – Monza, 12 ottobre 2006), sito sui miracoli eucaristici, canonizzato il 7 settembre 2025: Sala Stampa della Santa Sede, Bollettino del 7 settembre 2025 (press.vatican.va). Nella scena 4 l'aggancio è una riga senza date (il bollettino resta come fonte sotto il testo); le date stanno nello Studio.
- Prima università di Bologna: **tolta la datazione** («alla fine del XII secolo») dal glossario e dallo Studio, perché nessuna delle fonti elencate la copre e la data convenzionale che gli studenti conoscono è un'altra (1088); resta «a Bologna nasce così la prima università d'Europa». La tappa 1 darà la data con la sua fonte.
- Mt 25,14-30 (parabola dei talenti), Bibbia CEI 2008.
- Tolte rispetto al 7 ottobre: la legge di Costantino del 321 (*Codex Iustinianus* III,12,2) e la licenza di insegnare «ovunque» delle università medievali, perché i dati non compaiono più nella lezione (erano nello `smista` eliminato). La domenica libera resta citata senza data.
- Prossima lezione: `uploads/iii-1-1-luoghi-che-cambiano-la-vita-regola-di-benedetto-artefatto.html`.

Cinquanta domande in quarantacinque minuti per la verifica di fine tappa e «ventotto ore» sono dati del docente, ripresi senza modifiche.

## 10. Collaudo (14 ottobre 2026, seconda passata)

Chromium (Playwright 1.56), artefatto ricostruito e aperto da `file://`.

- **Collaudo generico** (`collaudo.mjs`, tag `acc3-fix`): **41 controlli superati, 0 falliti.** Struttura (8 scene, 50 minuti, Sfida con 8 domande, pausa gioco presente, 7 sezioni e 6 fonti nello Studio, al massimo 2 blocchi per scena, nessun tipo oltre 2 volte: idee ×2, aggancio ×2; nessuna parola nuova senza voce di glossario); tutte le scene con «Avanti» senza graffe grezze; console senza errori; nessuna richiesta di rete; Studio e Giochi (4 schede) si aprono; 360 px senza scorrimento orizzontale; LIM con `?lim=1`; visore (`?in=visore`, testata di 55 px).
- **Prova specifica** (`prova-accoglienza-fix.mjs`): **74 controlli superati, 0 falliti.** Scena 1: scaletta di tre voci con le parole del lead, nessuna etichetta di regia nel corpo della scena, mascotte grande. **Mazzo**: coperto; pulsante «Carta ponte» presente; cinque pescate dal seme Domande non danno mai la ponte (resta «1 carta»); «Carta ponte» la pesca con l'etichetta e il testo alla lettera e poi sparisce; il seme Domande scende a 5 e si esaurisce con le altre cinque; «Rimescola» si disarma pescando una carta e avviando il cronometro (il mazzo resta intatto, il tocco successivo è di nuovo il primo); 24 «Carta a caso» → mazzo finito con la ponte uscita come ultima del suo seme e tutti i semi disabilitati; memoria della carta dopo la pausa gioco; con il tempo simulato «ultimi secondi» a 9, «tempo!» a zero, «Di nuovo», rimescola che si disarma da solo dopo tre secondi. Scena 3: lead che fa rispondere tutti; rivela 1/4 → 4/4 con il passo 3 «E riguarda voi: avete sedici anni» e il passo 4 con Greci e Romani, città, commerci, re. Scena 4: lead con le due facce; **6 voci** con il titolo giusto; verifica rovesciata nella scheda della tappa 3 con il fumetto del glossario ed Esc; tappa 2 con la frase del docente sul dipinto (senza Otto Dix); aggancio Acutis di una riga senza date nel testo (la data resta nella fonte). Scena 5: 3 carte che si girano; 3 idee (partecipazione · verifiche · Talenti + nessuno è valutato per ciò che crede); «Talenti» detto una volta sola nella scena. Scena 6: lead con «ciò che capite e come lo argomentate»; dubbi 4/4. Scena 7: niente «Poi si torna qui», regola detta una volta; riquadro «Al ritorno» vuoto prima della partita; **Sfida** con domanda 2 «La domenica libera», sbagliata → rubata → 50 punti, giusta al primo colpo → 100 e oltre, fine, «Torna alla lezione · scena 7», poi le due domande di restituzione una alla volta. Scena 8: lead che riparte dalla Sfida; nuvola prima dell'aggancio; aggancio sul telefono vietato e su «a che cosa serve una regola», senza «silenzio»; nuvola con due parole. Glossario 11 voci, «università» senza datazione. Studio: 7 sezioni, **download identico al `.testo.txt`** (9393 caratteri, senza graffe né asterischi), con le due facce, il telefono vietato, niente «XII secolo», Otto Dix presente. Giochi: **Vero o falso giocato fino in fondo** (8 risposte, nessun perché con asterischi); nessun asterisco o graffa nei testi di Sfida, Vero o falso e Riflessione; Riflessione con lo spunto nuovo. 360 px: nessuno scorrimento orizzontale in nessuna scena con i blocchi aperti (compreso il mazzo con «Carta ponte»). **LIM 1366×768: le sei tappe stanno tutte in vista, senza scorrimento interno (0 px)**; «Avanti» dentro lo schermo. LIM 1280×720: le sei tappe (pallini ed etichette) sono tutte in vista; il riquadro ha 30 px di corsa vuota a destra (680 px utili contro i 710 minimi del kit: 6 × 110 + 5 × 8 + 10), quindi scegliendo la tappa 6 la linea si sposta di qualche pixel, con tutte le etichette ancora leggibili. Console senza errori in tutte le pagine.
- **Schermate guardate** (cartella `shots`, prefisso `acc3-fix`): desktop scene 1 (scaletta), 2 (carta ponte; riga dei pulsanti «Carta a caso · Carta ponte · Rimescola»), 3 (quattro passi), 4 (tappa 2 aperta, sei voci), 5 (tre idee), 7 (prima della Sfida, riquadro vuoto; al ritorno, due domande), 8 (nuvola e aggancio); 360 px scene 2 (riga dei pulsanti a capo in ordine), 4, 8 (aggancio aperto sotto la nuvola); LIM 1366 scene 1, 2 (semi e riga dei pulsanti), 4 (sei tappe in vista), 7; LIM 1280 scena 4; Vero o falso con il perché della frase 2.
- Nelle scene non ci sono blocchi con risposta giusta o sbagliata (quiz e verifica sono stati tolti come doppioni): la prova «sbagliata / giusta» riguarda la Sfida a squadre.
- Nota per chi collauda: il fumetto della parola nuova si chiude allo scorrimento (comportamento del kit); con un clic automatico istantaneo subito dopo uno scorrimento la chiusura può arrivare dopo l'apertura. Con un clic normale non succede. Lo spunto della Riflessione è il `placeholder` della casella di testo: non compare in `innerText`.

## 11. Che cosa è cambiato il 14 ottobre 2026 e perché

Il docente ha chiesto lezioni più fluide: la versione del 7 ottobre passava di palo in frasca. In dieci scene metteva, su un'ora di accoglienza, moduli da lezione che non le appartenevano: un sondaggio su ospedali e domenica prima ancora di conoscersi; uno smistamento «natura o decisione» con Costantino e le università medievali; una catena di sei anelli con «idee cristiane» e «non una causa unica»; una verifica lampo; un quiz di quattro domande che doppiava la Sfida; il sondaggio d'uscita. Il risultato era: mazzo → filosofia della decisione → mappa → metodo → patto → gioco → quiz → sondaggio, senza una storia.

Si è tornati al filo semplice della versione originale del docente (14 settembre): **il mazzo → una carta del mazzo diventa la domanda dell'anno → «avete sedici anni» → la mappa delle sei tappe → come si lavora e come si valuta → il patto → la carta dell'anno**, con in più la Sfida a squadre dove la chiede la skill. Otto scene, 50 minuti.

- **Tolto:** sondaggio d'ingresso e d'uscita (in un'accoglienza non c'è una tesi da verificare: la domanda dell'anno resta aperta apposta); `smista` e `catena` (sono materia della prima tappa, non del primo giorno: gli esempi restano in una riga del `rivela`); aggancio «Con onestà» (la cautela sta in una frase del passo 4 e nello Studio); verifica lampo e quiz finale (doppioni della Sfida). Le due domande della Sfida su *decīdere* e su Costantino sono state tolte; otto domande solo su ciò che la lezione ha mostrato prima della pausa.
- **Ogni lead è un ponte:** riprende la scena precedente e apre la nuova («Prima cosa: ci raccontiamo» · «Nel mazzo c'è una carta… provate a rispondere tutti» · «La domanda ha due facce… le sei tappe le guardano una alla volta» · «Sei tappe: con quali strumenti, e che cosa conta?» · «Se si valuta ciò che capite e come lo argomentate, mai ciò che credete, servono tre regole» · «Molte novità in pochi minuti: due squadre, otto domande» · «Otto domande, otto risposte: una sola resta senza risposta»).
- **La domanda dell'anno** (scena 3) non è più una catena astratta ma quattro passi da scoprire con «E quindi?», nell'ordine del docente: invisibili → decise → avete sedici anni → chi l'ha deciso?; poi la parola *decidere*.
- **Il metodo** (scena 5) dice le tre cose che contano con le idee una alla volta, come nella versione originale, invece di una verifica lampo.
- **Il mazzo** ha più tempo (15′ invece di 13′) ed è identico nel codice e nella grafica.
- **Parole nuove nelle scene** ridotte a quattro (verifica rovesciata, talenti, fonte, argomento); il glossario resta di dieci voci più «decidere», per lo Studio.
- **Studio** riordinato nello stesso ordine della lezione (mazzo → domanda → tappe → metodo → patto → carta dell'anno), con i nessi espliciti; tre consegne per lo studio; fonti ridotte a quelle dei dati ancora usati.
- **Mantenuto alla lettera:** le 24 carte, i 4 semi, i 40 secondi, «passo» una volta sola, «comincia chi insegna», la carta ponte, le sei tappe con «A che cosa vi serve», la verifica rovesciata, le tre cose che contano, le tre regole del patto, la carta dell'anno riletta alla verifica rovesciata, l'aggancio a san Carlo Acutis, l'aggancio «Tra sette giorni» alla Regola di Benedetto, il CSS della lezione che azzera il vuoto sotto la barra sul telefono.

### Seconda passata, lo stesso giorno: i ponti che tenevano a metà

Due revisori hanno riletto la versione riscritta e trovato otto punti in cui il filo teneva solo a metà, più alcuni difetti visibili. Sono stati corretti tutti; nessun rilievo è stato scartato. In italiano semplice:

- **Il primo schermo dice una cosa sola.** Il lead annuncia tre cose; prima lo schermo mostrava l'agenda del kit con cinque righe etichettate «Aggancio, Attività, Scoperta…», parole di regia. Ora sotto il lead c'è una scaletta di tre righe scritte a mano, con le stesse parole (mazzo · la domanda dell'anno · come lavoreremo); le fasi con i minuti restano nella barra in basso.
- **La carta ponte non è più un colpo di fortuna.** Prima usciva a caso dal seme Domande e il docente doveva «pescarla a mano» (fino a sei tocchi a vuoto); il lead della scena 3 diceva «quasi nessuno ha saputo rispondere» anche se aveva risposto uno studente solo. Ora il mazzo ha il pulsante «Carta ponte»: la carta esce solo quando la chiama chi insegna (o se è l'ultima del seme), e il lead della scena 3 la legge e la fa provare a tutti, in dieci secondi: è vero in ogni caso, anche se la carta non è uscita.
- **«E quindi?» ha davvero una conseguenza.** Il passo 3 era «Avete sedici anni», un cambio di soggetto; ora è «E riguarda voi: avete sedici anni… per questo conviene scoprire quante cose erano già state decise prima che nasceste, e da chi».
- **Le sei tappe rispondono davvero alla domanda.** Il lead prometteva «alla domanda rispondiamo in sei tappe», ma solo due tappe su sei dicevano chi ha deciso qualcosa. Ora il lead dice che la domanda ha due facce (deciso prima di voi / decidete voi) e ogni scheda finisce dicendo di quale decisione si tratta (l'abitudine decisa un gesto alla volta, decidere di chi fidarsi, il nome deciso da altri, la tappa che decidete voi). Stessa cosa nello Studio.
- **I Talenti si dicono una volta.** Erano in tre posti in due scene (tappa 6, quarta carta, seconda idea). Ora le carte sono i tre strumenti di lavoro (lezione interattiva, fascicolo, verifica) e le tre cose che contano sono quelle del docente: partecipazione, verifiche, Talenti con la griglia; «nessuno è valutato per ciò che crede» chiude la terza.
- **Il patto discende da tutta l'idea**, non da metà: «se si valuta ciò che capite e come lo argomentate, mai ciò che credete, servono tre regole: su come si sa una cosa, su come si discute, su che cosa nessuno è tenuto a credere».
- **La chiusura riparte dalla Sfida**: «Otto domande, otto risposte. Una sola resta senza risposta: chi l'ha deciso?». L'aggancio alla prossima ora sta sotto la nuvola (ultimo blocco) e dice l'apertura vera della lezione successiva: a che cosa serve una regola, e il telefono vietato a scuola (non più «il silenzio», che quella lezione non tratta).
- **Dati e dettagli al posto giusto.** Tolta la data di Bologna («fine del XII secolo»), non coperta dalle fonti; Otto Dix solo nello Studio (nella scena la frase del docente: «un dipinto del 1933 che li usa per raccontare il crollo di una nazione»); Carlo Acutis in una riga senza date; «insieme ad altri fattori» sostituito con «Greci e Romani, città, commerci, re»; Sfida 2 senza «per legge».
- **Sfida e restituzione.** La regola del gioco è scritta una volta sola e senza «poi si torna qui»; il riquadro «Al ritorno» è vuoto finché non si torna dalla partita (prima la prima domanda si vedeva già prima di giocare); la seconda domanda è «una domanda a chi insegna» (quella sulla tappa più attesa resta come consegna di Studio); la Riflessione dei Giochi non ripete la carta dell'anno.
- **Difetti visibili corretti.** La linea delle tappe ha sei voci (la verifica rovesciata sta nella scheda della tappa 3): con sette, alla LIM a 1366 la settima voce, i Talenti, finiva fuori schermo. Nel Vero o falso il perché della frase 2 mostrava gli asterischi grezzi. «Rimescola» ora si disarma a qualsiasi azione sul mazzo, non solo dopo tre secondi.
- **L'unica modifica al componente `Mazzo`** è logica, non grafica: il pulsante «Carta ponte» usa la stessa classe di «Rimescola» e la pescata a caso esclude la carta ponte. Tutto il resto del componente è identico.
- **Limite che resta:** alla LIM a 1280 px le sei tappe sono tutte in vista ma il riquadro ha 30 px di corsa vuota a destra (il kit fissa 110 px per voce); a 1366 non scorre affatto.
