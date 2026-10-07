# Attenzione e stile

Questa reference serve a progettare e rivedere l'aspetto dei materiali IRC di Matteo Sestili: come la pagina guida lo sguardo, come la lezione tiene viva l'attenzione per 50 minuti e quali segnali evitare. È identica nelle skill dell'artefatto, del fascicolo e delle slide. Non sostituisce lo stile LAB-IRC (`stile-lab-irc.md`) né il modello del fascicolo: dice come usarli bene.

## Che cosa vuole il docente

Indicazioni date da Matteo nelle conversazioni del progetto (settembre–ottobre 2026), che prevalgono su ogni regola generale:

- **Stile comune LAB-IRC:** grafica del sito, tema giorno/notte, proporzione aurea per armonia, mascotte dell'anno, modalità LIM; il riferimento è il Lab IRC Design System (pacchetto «Lab-Irc» del 3 ottobre 2026). Gli artefatti sono in React, **dinamici e simpatici, mai infantili**.
- **L'artefatto è il cuore della lezione:** la spiegazione sta dentro le scene, non accanto.
- **Lezione di 50 minuti su misura del contenuto (dal 3 ottobre 2026).** Nessuna struttura troppo statica: niente numero di scene stabilito né sequenza standard di blocchi. Il contenuto si adatta alla lezione interattiva in modo flessibile e intelligente, perché i ragazzi imparino tutto l'essenziale divertendosi. Restano fissi i 50 minuti esatti, tutto l'essenziale del dossier, la classe che agisce spesso, la prova breve con il ritorno alla domanda e la **pausa gioco**, che c'è sempre, cade dove la chiede il contenuto e, finito il gioco, riporta alla scena da cui si era partiti. Le interazioni non sono decorazione da togliere per semplificare: ogni anello della catena si mostra facendo.
- **Stati interattivi completi:** ogni elemento cliccabile ha `:hover`, `:focus-visible` e `:active` reali, transizioni di 150–250 ms, feedback diverso per ruolo (pulsante principale, carta, link) e funzionante sia col mouse sia al tocco della LIM.
- **Niente segnali da «grafica generata con l'IA»:** fondo crema con accento terracotta o fondo nero con un solo accento acceso; carte tutte uguali per raggio e ombra; etichetta maiuscola sopra ogni titolo; numerazione decorativa 01/02/03; frecce automatiche sui pulsanti; la stessa animazione d'entrata ovunque.
- **Illustrazioni:** quando servono immagini generate (slide), lo stile preferito è manga/anime, curato e adatto all'età. Le opere d'arte e i documenti storici restano fotografie o riproduzioni autentiche.
- **Fonti nelle citazioni grafiche:** Scrittura, Padri e Dottori, Magistero. Una frase ad effetto di un autore estraneo alla disciplina non diventa il titolo di una scena.

## Come si guida lo sguardo

Principi di percezione visiva (Gestalt) utili a progettare ogni schermata. Sono strumenti di chiarezza, non regole di persuasione.

| Principio | Che cosa fare | Domanda di controllo |
|---|---|---|
| Punto focale | Una sola cosa domina la scena: la domanda, l'opera, la fonte o il gioco. Il colore dell'anno va su quella. | Guardando la LIM da fondo aula, si capisce subito su che cosa lavorare? |
| Vicinanza | Consegna, comandi e risposta stanno insieme; più spazio fra gruppi diversi che dentro lo stesso gruppo. | Si capisce a quale scelta appartiene il riscontro? |
| Somiglianza | Comandi con la stessa funzione hanno la stessa forma; ciò che si legge non sembra un pulsante e viceversa. | Una carta informativa viene scambiata per un comando? |
| Continuità | Nei diagrammi e nelle catene le frecce sono brevi, nella direzione di lettura, con l'etichetta del nesso («perciò», «per questo nasce»). | Il disegno mostra perché un passaggio porta al successivo? |

Nell'artefatto il kit del design system applica già questi criteri (prossimità 8 / 21 / 55 px, un solo accento per vista, esito entro 233 ms con il suo perché, al massimo quattro opzioni per domanda) e la modalità LIM per la lavagna: i contenuti devono offrirgli il materiale giusto.

La varietà si ottiene cambiando **la forma dell'attività** da una scena all'altra (rivelare, ordinare, confrontare, scegliere, collegare), non moltiplicando bagliori, bordi e animazioni. Il movimento ha un compito: mostra una trasformazione, conferma una scelta o accompagna un passaggio.

## Il ritmo dei 50 minuti

L'attenzione si mantiene alternando ascolto e azione, non riempiendo ogni scena di effetti.

- **Apertura:** una domanda o un caso che incuriosisce e che riceverà risposta alla fine. La promessa deve essere verificabile («Alla fine saprai distinguere…»).
- **Spiegazione:** un anello della catena per scena, al massimo due, ciascuno con lo strumento che lo fa capire. Sullo schermo circa 60 parole di prosa al massimo: il resto lo dice il docente.
- **Partecipazione:** la classe agisce spesso, mai più di circa 10 minuti di solo ascolto: di norma 4–6 momenti brevi con esito visibile a tutta la classe (alzata di mano contata, verifica lampo, smistamento, «Chi lo dice?», nuvola di parole).
- **Pausa gioco:** sempre presente, 5–8 minuti con la restituzione, dove la chiede il contenuto: in apertura per attivare ciò che si sa, a metà per cambiare ritmo dopo il nucleo più denso, in chiusura per ripassare. Si lancia dalla scena e si rientra alla stessa scena.
- **Chiusura:** prova su un caso nuovo e ritorno alla domanda iniziale. Il finale mostra il progresso, senza morale appiccicata.
- **Adattamento in aula:** il cronometro della barra confronta il piano con il tempo reale; il piano di regia nelle note dice che cosa accorciare in ritardo e che cosa aggiungere in anticipo.

## Indicazioni dalla ricerca, usate con misura

- **Carico cognitivo (Mayer e Moreno, 2003):** parole accanto all'immagine a cui si riferiscono, segmenti che il docente controlla scena per scena, niente suoni o dettagli estranei al contenuto. Ridurre il superfluo non significa togliere le spiegazioni necessarie.
- **Comprensibilità (W3C, accessibilità cognitiva):** verbo chiaro sul pulsante («Rivela», «Confronta», «Gioca»), esempio prima della prova, stato selezionato visibile anche senza colore, ritorno sempre possibile al punto di partenza.
- **Cosa non trasferire:** il modello del «cervello rettiliano, limbico e razionale» è superato e non giustifica scelte grafiche; colori e sezione aurea non hanno effetti psicologici universali; urgenza artificiale, conteggi inventati o premi che coprono il contenuto non si usano. Bias e tecniche di persuasione non servono a far aderire gli studenti a una tesi.

## Fascicolo e slide

- **Fascicolo:** EB Garamond, monocromo, geometria del modello. Gerarchia dei titoli, vicinanza fra testo e nota, spazio bianco: niente effetti da interfaccia sulla carta.
- **Slide (solo su richiesta):** un'immagine o una domanda dominante per slide, testo breve vicino al dettaglio pertinente, identità LAB-IRC coerente con l'artefatto.

## Controllo prima della consegna

1. Ogni scena ha un punto focale riconoscibile e un'azione chiara.
2. Le interazioni mostrano un nesso della catena; nessuna è inerte o puramente decorativa.
3. La pausa gioco parte da una scena e il ritorno riporta a quella scena, con le risposte già date.
4. Stati hover, focus e active presenti; tutto usabile a tocco, tastiera, 360 px e in modalità LIM.
5. Nessuno dei segnali da «grafica IA» elencati sopra.
6. Tempi sommati: 50 minuti.
7. Tutto l'essenziale del dossier compare in una scena; nessun tratto di solo ascolto oltre i 10 minuti circa.

Il collaudo al computer non dimostra interesse e comprensione: il riscontro del docente in classe resta la prova decisiva.

## Fonti

1. Mayer, R. E.; Moreno, R. (2003), *Nine Ways to Reduce Cognitive Load in Multimedia Learning*, Educational Psychologist 38(1), 43–52.
2. W3C WAI, *Making Content Usable for People with Cognitive and Learning Disabilities*, obiettivo «Help Users Understand What Things Are and How to Use Them»: https://www.w3.org/WAI/WCAG2/supplemental/objectives/o1-understandable/
3. Steffen, P. R.; Hedges, D.; Matheson, R. (2022), *The Brain Is Adaptive Not Triune*, Frontiers in Psychiatry 13: 802606.
