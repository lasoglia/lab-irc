# Il mazzo dell'estate · Note del docente (Anno III, accoglienza)

Artefatto: `uploads/accoglienza-terza-mazzo-estate-artefatto.html` (stesso nome di prima, così i collegamenti del sito restano validi).
Sorgente: `sorgenti-lezioni/iii-0-1-accoglienza-il-mazzo-dell-estate.js` · Testo di studio: `sorgenti-lezioni/iii-0-1-accoglienza-il-mazzo-dell-estate.testo.txt`.
Rifatto il 7 ottobre 2026 con la skill «IRC · Artefatto interattivo della lezione» (kit Lab IRC definitivo del 5 ottobre 2026).

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
  di san Benedetto» (lezioni «I benedettini» → «La misura dei più deboli», «Chi può insegnare a chi»).
Domanda centrale: le cose che usiamo ogni giorno vengono dalla natura o qualcuno le ha decise? → «Chi l'ha deciso?»
Obiettivo osservabile e criterio di riuscita:
  1. ciascuno si presenta rispondendo a voce a una carta (estate, attese, domande, sfide);
  2. la classe distingue un fatto di natura da una decisione con una data e un autore (smista 5-6 su 6;
     prova breve, domanda 1) e spiega con l'etimologia di «decidere» perché ha senso chiedersi chi ha deciso;
  3. la classe sa dire la domanda dell'anno, nominare le tappe, che cosa si valuta e le tre regole del patto
     (Sfida a squadre e prova breve: almeno 3 risposte su 4).
Dossier dei contenuti: nessun dossier separato. È un'accoglienza: i contenuti sono il mazzo e la mappa
  dell'anno del docente; i pochi dati storici usati sono verificati qui sotto (§ 9).
Catena (anelli essenziali):
  1. usiamo ogni giorno cose che non abbiamo scelto (orari, ospedali, titoli di studio, regole per chi comanda);
  2. per questo diventano invisibili e sembrano naturali (la «carta ponte» del mazzo);
  3. eppure hanno una data, un luogo, qualcuno che le ha decise (decidere = «tagliar via»);
  4. per questo si potevano decidere diversamente, e a sedici anni conviene sapere che cosa è stato deciso prima;
  5. e spesso sono nate anche da idee cristiane (monastero, università, ospedale, limiti al potere),
     insieme ad altri fattori: non una causa unica;
  6. quindi la domanda dell'anno: chi l'ha deciso? Sei tappe, un metodo (fonti, argomenti, libertà), una valutazione
     sulla comprensione.
Concetti e parole: decidere (de- + caedere), accoglienza, regola, monastero, università, vizi capitali,
  obiezione di coscienza, talenti, fonte, argomento, verifica rovesciata.
Fraintendimenti da smontare: «è sempre stato così» / «è naturale» (scena 3, catena); «in religione si valuta
  la fede» (scena 6, prova); «nato in ambiente cristiano = nato solo grazie al cristianesimo» (aggancio «Con onestà»);
  «se il prof lo dice devo crederci» (patto).
Prova finale: quiz di 4 domande (scena 9) + ritorno alla domanda d'ingresso con il confronto (scena 10).
```

Nessun punteggio sulle convinzioni: i due sondaggi, la nuvola e la riflessione dei giochi sono senza voto e senza nomi; nulla viene salvato (carte, voti e parole restano in memoria finché la pagina è aperta). Le squadre della Sfida hanno nomi collettivi.

## 2. Mappa dell'essenziale

| Anello, concetto o parola | Scena | Studio |
|---|---|---|
| Conoscersi: estate, attese, domande, sfide | 2 (Mazzo) | «Il mazzo dell'estate» |
| *Accoglienza* (ad + colligere) | 1 | «Il mazzo dell'estate» |
| 1-2 · cose non scelte che sembrano naturali; la carta ponte | 2 (carta ponte), 3 (smista), 4 (catena) | «La domanda dell'anno» |
| 3 · una data e un autore; *decidere* = tagliar via | 3 (etimo), 4 | «La domanda dell'anno» |
| 4 · si poteva decidere diversamente; avete sedici anni | 4 (lead + catena) | «La domanda dell'anno» |
| 5 · idee cristiane ma non causa unica | 4 (catena + aggancio «Con onestà») | «La domanda dell'anno» |
| 6 · la domanda dell'anno | 4, 10 | «La risposta» |
| Sei tappe; *regola*, *monastero*, *università*, *vizi capitali*, *obiezione di coscienza*, *talenti*; verifica rovesciata | 5 (tappe) | «Le sei tappe» |
| San Carlo Acutis, patrono del laboratorio | 5 (aggancio «Per capire») | «Le sei tappe» |
| Strumenti e valutazione: nessuno è valutato per ciò che crede | 6 (carte + verifica) | «Come si lavora e come si valuta» |
| Il patto: *fonte*, *argomento*, libertà | 7 (dubbi) | «Il patto» |
| Prossima ora: la Regola di Benedetto | 7 (aggancio «Tra sette giorni») | «La carta dell'anno» |
| Carta dell'anno | 10 (nuvola) | «La carta dell'anno» |

## 3. Regia degli strumenti

| Anello | Che cosa deve capire la classe | Perché è difficile | Tipo | Strumento | Alternativa |
|---|---|---|---|---|---|
| Conoscersi | Che l'ora è anche loro: si parla, si ascolta | Primo giorno, imbarazzo, rischio che parlino sempre gli stessi | Attività di classe | **Componente proprio `Mazzo`** (24 carte in 4 semi, pesca senza ripetizioni, carta a caso, rimescola a due tocchi, cronometro di 40 s, carta ponte segnalata) | Mazzo di carta stampato |
| 1-2 | Ciò che usiamo sembra natura | L'abitudine rende invisibile la domanda | Equivoco | `smista` «natura / decisione» con perché | `vf` nei giochi |
| 3 | Decidere = scartare altre strade | Parola ovvia, mai guardata | Etimologia | `etimo` | `parola` |
| 1-6 (**concetto più difficile**: da «è naturale» a «qualcuno l'ha deciso, anche per ragioni cristiane, non da solo») | Il nesso che regge tutto l'anno | È un passaggio logico in più tempi, con il rischio di una causa unica | Nesso causale | **`catena`** con «Togli un anello» + `aggancio` «Con onestà» | `rivela` (versione precedente) |
| Mappa dell'anno | Sei tappe, a che cosa servono | Tanta informazione, poco tempo | Collocazione | `tappe` (la classe sceglie quale aprire) | Foglio della mappa |
| Valutazione | Si valuta la comprensione, non la fede | Equivoco diffuso sull'IRC | Distinzione | `carte` + `verifica` | Mani alzate |
| Patto | Fonte, argomento, libertà | Detto dal docente suona come predica | Domande personali | `dubbi` (le domande «che non si fanno») | `rivela` |
| Ripasso | Fissare domanda, tappe, patto | Molte novità in un'ora | Pausa gioco | **Sfida a squadre** | Sfida a voce |
| Prova e ritorno | Applicare a un caso nuovo; vedere se l'idea è cambiata | — | Prova / opinione | `quiz` + `domanda` con `confronta` + `nuvola` | Carta e penna |

Motivazione del concetto più difficile: la catena fa vedere che «chi l'ha deciso?» non è una curiosità ma la conseguenza di tre passaggi (invisibile → deciso → poteva essere diverso); togliendo l'anello 3 crolla tutto («è sempre stato così»). L'aggancio «Con onestà» impedisce di trasformare l'anello 5 in una causa unica.

Componente proprio: `Mazzo` fa ciò che nessun blocco del kit fa, cioè un gioco di presentazione a turni con un mazzo che si consuma e un cronometro breve per ogni carta. Elementi interattivi e feedback: semi (`la-choice`: hover bordo oro e −2 px, active 0,97, focus oro, disabilitati a seme esaurito); «Carta a caso» (`ll-btn`: magnetico, lama di luce, active 0,96); «Rimescola» (`ll-btn--ghost`, conferma a due tocchi); cronometro (`ll-btn--ghost`; barra d'oro, negli ultimi dieci secondi rosa con la scritta «ultimi secondi», a zero «tempo!»). La carta ponte compare con l'etichetta «Carta ponte: torna fra poco» e la mascotte lo dice. Lo stato del mazzo resta in memoria cambiando scena e dopo la pausa gioco.

Nessuna animazione a fotogrammi: il tema non ha un processo da mostrare; lo strumento forte è la catena. Nessuna fonte primaria da leggere (`leggi`): è un'accoglienza; la «fonte» dell'ora è la mappa del docente.

Blocchi usati (nessun tipo interattivo più di due volte): agenda, domanda ×2 (ingresso e uscita), custom Mazzo, smista, etimo, catena, tappe, carte, verifica, dubbi, gioco, rivela, quiz, nuvola; aggancio ×3.

## 4. Piano minuto per minuto (50′)

| Min | Scena | Fase | Strumento | La classe fa |
|---|---|---|---|---|
| 0-3 | 1 · Bentornati: ventiquattro carte | Aggancio | agenda + sondaggio d'ingresso | vota per alzata di mano |
| 3-16 | 2 · Pesca una carta | Attività | Mazzo (40 s a carta) | ognuno risponde a una carta |
| 16-21 | 3 · Natura o decisione? | Scoperta | smista + etimo | decide 6 casi, scompone «decidere» |
| 21-25 | 4 · Chi l'ha deciso? | Scoperta | catena + aggancio «Con onestà» | toglie un anello e dice che cosa cade |
| 25-31 | 5 · Ventotto ore, sei tappe | Scoperta | tappe + aggancio Acutis | sceglie quali tappe aprire |
| 31-35 | 6 · Come si lavora, che cosa si valuta | Scoperta | carte + verifica lampo | risponde alla verifica |
| 35-38 | 7 · Tre regole, anche per me | Attività | dubbi + aggancio «Tra sette giorni» | apre le domande, commenta |
| 38-44 | 8 · Sfida a squadre (**pausa gioco**) | Attività | gioco `sfida` + rivela «Al ritorno» | gioca in due squadre |
| 44-47 | 9 · Avete capito le regole del gioco? | Chiusura | quiz (4 domande) | risponde |
| 47-50 | 10 · La carta dell'anno | Chiusura | sondaggio d'uscita con confronto + nuvola | rivota; una parola a testa |

Somma: 3 + 13 + 5 + 4 + 6 + 4 + 3 + 6 + 3 + 3 = **50**. Un solo percorso. Tratti di solo ascolto: mai oltre 4 minuti (scene 4-5 hanno comunque la classe che tocca e sceglie). Momenti attivi con esito visibile: sondaggio, mazzo, smista, etimo, catena, verifica, dubbi, sfida, quiz, sondaggio d'uscita, nuvola.

Pausa gioco: **in chiusura del nucleo** (scena 8), perché serve fissare in modo leggero le molte novità (domanda, tappe, metodo, patto). Le domande della Sfida riguardano solo ciò che è già stato presentato.

## 5. Piano di regia

**In ritardo** (il cronometro segna +N′):
- mazzo: una carta a testa, seme «Sfide» solo per i volontari; con più di 20 studenti si scende a 30 secondi detti a voce (−2/3′);
- scena 5: aprire solo tappa 1, metà anno e tappa 6; il resto è nello Studio (−2′);
- Sfida a squadre: fermarsi dopo 6 domande (il punteggio resta valido; −2′);
- scena 9: due domande invece di quattro (−1′).
Non tagliare mai: ritorno alla domanda e carta dell'anno.

**In anticipo**:
- secondo giro di mazzo (semi Domande e Attese);
- in scena 4, chiedere alla classe un'altra cosa «decisa» da mettere nella catena;
- in modalità Giochi: Vero o falso (8 affermazioni) o Abbinamenti tappa ↔ domanda;
- domanda di dibattito: «Che cosa vorreste decidere voi, e chi lo decide oggi?».

## 6. Traccia orale per scena

1. **Bentornati.** «Tre mesi senza vederci. Oggi due cose: ci raccontiamo con un mazzo, poi vi dico la domanda che ci accompagna fino a giugno. Prima, una domanda secca: da dove vengono la scuola con orari e voti, il pronto soccorso, la domenica libera?» Contare i voti, mostrare i risultati senza commentarli: «Li riguardiamo alla fine».
2. **Pesca una carta.** Pescare per primi e rispondere davvero: è il modello di misura e di sincerità che la classe copierà (in terza più che in quarta: il primo che si espone decide il registro). Poi a turno, in ordine di banco. Quaranta secondi; «passo» una volta. Se nessuno sceglie Domande, pescarne una verso la fine. Annotare (a mente o su carta, non nell'artefatto) chi dice di saper fare qualcosa che gli altri non sanno: è il primo censimento per i Talenti. La carta sull'abitudine chiede apposta di non dire quale: non chiederlo.
3. **Natura o decisione?** «La carta ponte: quasi nessuno sa rispondere, ed è normale. Proviamo a distinguere.» Sei casi a mano alzata; leggere sempre il perché. Poi «decidere»: toccare le tre parti. «Chi decide taglia via le altre strade: allora si poteva fare diversamente.»
4. **Chi l'ha deciso?** «Avete sedici anni: cominciate a decidere voi.» Agganciare gli anelli uno alla volta; poi «Togli un anello»: far scegliere alla classe quale togliere (il 3 è il più istruttivo). Aprire «Con onestà»: non una causa unica, e quei secoli hanno anche ombre.
5. **Sei tappe.** «Un'ora a settimana, sei tappe, e ognuna vi dice prima a che cosa serve. Scegliete voi da quale cominciamo.» Chiudere su tappa 6, Talenti: «Cominciate a pensarci da oggi». Eventuale cenno al patrono: Carlo Acutis, quindici anni, un talento informatico usato per gli altri.
6. **Come si lavora.** Girare le quattro carte; verifica lampo. Dire chiaramente: «Nessuno è valutato per ciò che crede».
7. **Il patto.** Far leggere le domande a voce alta da tre studenti; il docente risponde. «Valgono anche per me.» Aprire «Tra sette giorni»: un monastero, una regola scritta, il tempo e i telefoni.
8. **Sfida a squadre.** Due metà della classe, nomi collettivi (quelli proposti vanno bene). Regola in una frase: «A turno, venti secondi; se sbagliate, l'altra squadra può rubare per metà punti». Al ritorno, le due domande di restituzione.
9. **Prova.** Quattro domande; la classe sceglie a voce, il docente tocca. Leggere il perché anche quando è giusto.
10. **La carta dell'anno.** Rivotare la domanda d'inizio, mostrare il confronto (tratteggio d'oro) e chiedere a chi ha cambiato idea che cosa l'ha convinto. Poi la carta per tutti: giro rapido, una parola a testa, senza commento; scriverle nella nuvola (o alla lavagna) e **fotografarle**: si rileggono alla verifica rovesciata.

## 7. Soluzioni

**Smista (scena 3):** avere sonno → natura; entrare alle otto → deciso; pronto soccorso per chi non può pagare → deciso; avere fame → natura; domenica libera per legge → deciso (legge di Costantino del 321); titolo di studio valido lontano → deciso (licenza di insegnare «ovunque» delle università medievali).

**Verifica (scena 6):** D, «Ciò che capite e come lo argomentate».

**Quiz (scena 9):** 1 B (decisione con data e autore; la settimana esisteva già); 2 A (si poteva fare diversamente); 3 B (dissentire con un argomento); 4 C (si valuta la comprensione, non la fede).

**Sfida a squadre (10 domande):** 1 B «Chi l'ha deciso?» · 2 A *decīdere* · 3 D domenica libera per legge · 4 C Storia · 5 B un'ora in cui le domande le fanno gli studenti · 6 D ciò che capite e argomentate · 7 C tutti, anche verso chi insegna · 8 A unità di peso e di moneta · 9 B Politica e coscienza · 10 D Talenti.
Restituzione: «Quale domanda ha diviso di più le squadre, e perché?» · «Quale tappa vi incuriosisce di più? Una ragione.»

**Vero o falso (giochi):** F, V, F, V, F, V, F, V (ragioni nell'artefatto). **Abbinamenti:** Storia ↔ chi ha costruito il mondo; Teologia ↔ perché fai cose che non vuoi; Filosofia ↔ è da stupidi credere; Politica e coscienza ↔ un ordine da non eseguire; Bibbia ↔ chi sei quando nessuno ti guarda. **Riflessione:** senza soluzione e senza voto, resta solo sullo schermo.

## 8. Varianti senza proiettore

- **Mazzo:** 24 carte stampate in 4 colori (il testo è nella sezione «Il mazzo dell'estate» del sorgente, array `SEMI`); cronometro del telefono del docente.
- **Natura o decisione:** il docente legge i sei casi, la classe alza una o due dita; lavagna divisa in due colonne.
- **Catena:** sei frasi su sei fogli, appese alla lavagna con le parole-ponte; si toglie un foglio e si chiede che cosa cade.
- **Tappe e metodo:** la mappa dell'anno fotocopiata (o lo Studio stampato con «Stampa»).
- **Sfida a squadre:** il docente legge domande e quattro opzioni; le squadre rispondono a voce dopo dieci secondi di consultazione; errore → l'altra squadra può rubare per metà punti; punteggio alla lavagna.
- **Prova e carta dell'anno:** domande a voce; parole della carta dell'anno alla lavagna, poi una fotografia.

## 9. Fonti e verifiche

- Mazzo e mappa dell'anno «Chi l'ha deciso?»: materiali del docente (versione del 4 ottobre 2026, ripresa dal sorgente precedente).
- Etimologie: *Vocabolario Treccani*, voci «decidere» (lat. *decīdĕre*, «tagliar via», comp. di *de-* e *caedĕre*), «accogliere» (lat. *accollĭgĕre*, comp. di *ad-* e *collĭgĕre*), «talento» (lat. *talentum*, gr. *tálanton*; senso di «dote» dalla parabola evangelica), «vizio» (lat. *vitium*) e «capitale» (lat. *capitalis*, da *caput*), «coscienza» (lat. *conscientia*, da *conscire*), «regola» (lat. *regŭla*, «assicella, regolo», da *regĕre*), «monastero» (lat. tardo *monasterium*, gr. *monastḗrion*, da *monázō*, *mónos*), «universitas», «argomento» (lat. *argumentum*, da *arguĕre*, «dimostrare»), «fonte» (lat. *fons*). **Limite:** dall'ambiente di lavoro il sito treccani.it non era raggiungibile direttamente; le voci sono state controllate il 7 ottobre 2026 attraverso gli estratti dei risultati di ricerca del sito Treccani. Per «fonte» il controllo è solo sulla forma latina, notissima. Conviene una verifica a vista sul Vocabolario prima della pubblicazione definitiva.
- Domenica: legge di Costantino del 7 marzo 321, *Codex Iustinianus* III,12,2 (riposo di giudici, popolo cittadino e mestieri nel «venerabile giorno del sole»; esclusi i lavori dei campi). Riferimento noto, non ricontrollato sul testo latino in questa sessione.
- Canossa, gennaio 1077: Gregorio VII, lettera ai principi tedeschi, *Registrum* IV,12 (l'attesa di tre giorni davanti alla porta). Riferimento noto, non ricontrollato sul testo in questa sessione.
- Otto Dix, *I sette peccati capitali* (1933), Staatliche Kunsthalle Karlsruhe.
- Licenza di insegnare «ovunque» (*licentia ubique docendi*) delle università medievali: dato storiografico corrente, presentato senza date.
- Carlo Acutis (Londra, 3 maggio 1991 – Monza, 12 ottobre 2006), sito sui miracoli eucaristici, canonizzato da Leone XIV il 7 settembre 2025 con Pier Giorgio Frassati: Sala Stampa della Santa Sede, Bollettino del 7 settembre 2025 (press.vatican.va); LaPresse, 13 giugno 2025.
- Mt 25,14-30 (parabola dei talenti), Bibbia CEI 2008.
- Prossima lezione: `uploads/iii-1-1-luoghi-che-cambiano-la-vita-regola-di-benedetto-artefatto.html` («La misura dei più deboli») e `data/uda.json` («Una Regola di 1500 anni fa che parla ancora di tempo, silenzio e telefoni»).

Cinquanta domande in quarantacinque minuti per la verifica di fine tappa e «ventotto ore» sono dati del docente, ripresi senza modifiche.

## 10. Collaudo (7 ottobre 2026)

Chromium (Playwright), server locale: 110 controlli superati, 0 falliti. Scene avanti/indietro con pulsanti e frecce; minuti = 50; ogni blocco con errore e risposta giusta (smista, verifica, quiz, catena «togli un anello», sfida); pausa gioco → Sfida (avvio, turni alternati, errore e furto a 50 punti, punteggio, schermata finale) → «Torna alla lezione · scena 8» con il mazzo conservato; glossario (11 voci) e fumetto della parola nuova; Studio con download del `.txt`; tema chiaro e scuro; LIM con pulsante, tasto L e `?lim=1`; visore (`?in=visore`, testata di una riga, 55 px); 360 px e iPhone 13 senza scorrimento orizzontale, barra in fondo allo schermo e mascotte che non copre «Avanti»; iframe con sandbox `allow-scripts allow-forms allow-modals allow-popups allow-downloads` (mazzo, sfida, ritorno, download); console senza errori; nessuna richiesta di rete esterna (l'unico 404 è `/favicon.ico` del server locale).

## 11. Che cosa è cambiato rispetto alla versione del 4 ottobre

- **Struttura:** da 7 a 10 scene, sempre 50′. Il mazzo passa da 22′ a 13′ (con il piano di regia per le classi numerose) per fare spazio a ciò che la skill chiede: una classe che decide, la pausa gioco, la prova finale e il ritorno alla domanda.
- **Mantenuto:** le 24 carte alla lettera, i 4 semi, la regola dei 40 secondi e del «passo», «comincia chi insegna», la carta ponte come aggancio alla domanda, «Chi l'ha deciso?», le sei tappe con «A che cosa vi serve», la verifica rovesciata, i tre strumenti/valutazione, le tre regole del patto, la carta dell'anno («una cosa che vorresti decidere tu») con la nuvola e la rilettura a metà anno, il tono.
- **Nuovo:** sondaggio d'ingresso e d'uscita con confronto; smista «natura o decisione»; etimologia di *decidere*; catena con «togli un anello» al posto del `rivela`; aggancio «Con onestà» (non una causa unica); verifica lampo sulla valutazione; patto come `dubbi`; **Sfida a squadre** (10 domande) come pausa gioco, più Vero o falso, Abbinamenti e Riflessione in modalità Giochi; quiz finale; glossario da 4 a 11 voci con etimologie controllate; Studio riscritto in prosa continua con i nessi espliciti, domande di studio e fonti; aggancio sobrio a san Carlo Acutis nella tappa dei Talenti.
- **Mazzo migliorato:** memoria in pagina (il mazzo resta com'è cambiando scena e dopo il gioco), numero della carta, carta ponte segnalata, descrizione dei semi, colori dei semi senza verde e rosso (riservati a giusto/sbagliato), cronometro che si mette in pausa invece di azzerarsi, avviso «ultimi secondi» con parola e non solo colore, festa a mazzo finito.
- **Corretti:** «Quasi sempre nel Medioevo, e quasi sempre per ragioni cristiane» è diventato una formulazione a più fattori; la tappa 1 annuncia ciò che il sito pubblica davvero (monastero e Regola di Benedetto, poi università); l'aggancio «Sotto casa vostra» (un ospedale romano che avrebbe cominciato a curare chiunque «come nessuno al mondo») è stato sostituito da «Tra sette giorni: una regola di millecinquecento anni fa», perché la lezione successiva è quella su Benedetto e perché la primogenitura dell'ospedale non era documentata; i «tre materiali» (fascicolo, slide, lezione interattiva) sono diventati lezione interattiva, fascicolo, verifica e Talenti, come sul sito (le slide sono facoltative); il dipinto del 1933 ora ha autore e titolo.
- **Correzione locale al kit:** il CSS della lezione azzera il `padding-bottom: 144px` che `lab-percezione.css` aggiunge sotto i 720 px a `body.la`/`body.g`: nel guscio della lezione sollevava la barra delle scene e lasciava una fascia vuota sul telefono. Il kit non è stato toccato; la correzione andrebbe portata nel kit della skill.
- **Note di conversione** (`…note.md`) sostituite da queste note.
