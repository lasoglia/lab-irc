# Stile LAB-IRC per gli artefatti

Fonte: pacchetto **«Lab-Irc»**, il Lab IRC Design System completo con token, componenti, logo, kit degli artefatti (lezione, strumenti, attività di classe, percezione, LIM), motore giochi e mascotte 2D, nella versione del **3 ottobre 2026** (la prima è del 27 settembre). Il testo integrale del design system è in [lab-irc-design-system.md](lab-irc-design-system.md). I valori sono già in `assets/`: token e kit in `assets/kit/`, mascotte in `assets/mascotte/`, logo in `assets/logo/`. Lo script di assemblaggio li incorpora tutti; le poche differenze della skill rispetto al kit sono in `assets/kit/LEGGIMI.md`. Questa pagina spiega le scelte da rispettare quando scrivi contenuti e componenti propri.

Non usare più il vecchio «stile aureo» del 23 settembre, basato su Fraunces, né `assets/lab-style.css` del repository: il design system lo tiene solo come riferimento storico (usa Fraunces e Plus Jakarta Sans).

Motto del sito, da usare solo in contesti di apertura: *«Le grandi domande meritano risposte all'altezza.»*

## Carattere

Serio ma caldo, intellettualmente curioso, giovane. La solennità viene dal serif liturgico, dalle capitali lapidarie e dall'oro usato con parsimonia. La vivacità viene dal sans geometrico, dagli accenti colorati dell'anno, dalla mascotte e dal movimento che risponde a ciò che si fa. Il risultato deve essere dinamico e simpatico, mai infantile: niente cartoni animati, premi casuali o effetti che distraggono dal ragionamento.

## Colori

Il tema predefinito è **Notte Studio**, scuro: fondo `#14131F`, superfici `#1E1C2E` e `#272438`, testo `#ECEAF5`. Il tema **chiaro** si attiva con `html[data-tema="chiaro"]` ed è pergamena calda (`#FAF7F1`). Il pulsante della testata alterna i due temi e li condivide con il sito attraverso la chiave `tema_lab`.

| Token | Uso |
|---|---|
| `--la-accent` | Colore dell'anno, impostato da `data-anno`: I `#FF7A59`, II `#4FB0FF`, III `#A78BFA`, IV `#FB7BB5`, V `#FBBF24`. È l'accento principale della lezione. |
| `--lab-oro` | Oro liturgico `#E3C27A`, per filetti, etichette, focus e AMDG. Non riempie mai grandi superfici. |
| `--lab-viola`, `--lab-ciano` | Il gradiente del marchio `--lab-grad` (viola → ciano), per i pulsanti principali. |
| `--lab-verde`, `--lab-rosso` | Solo per giusto e sbagliato, sempre accompagnati da una parola. |
| `--lab-grad-warm` | Rosa → ambra, per l'invito al gioco. |

Non scrivere colori esadecimali nei componenti: usa i token, così il tema chiaro funziona da solo.

## Caratteri

Tre voci, ciascuna con un compito, tutte incorporate nell'HTML.

- **Cormorant Garamond**, peso 600, con il corsivo 500 per la parola evidenziata. Serve per titoli, domande, citazioni e titoli delle carte. Ha il tono di un libro liturgico.
- **Cinzel**, peso 600 e interlinea larga (0,14–0,18 em). Serve per etichette brevi in maiuscolo, contatori, anni romani e AMDG. Non si usa mai per le frasi.
- **Figtree**, pesi 400–800. Serve per il testo corrente, i pulsanti e i controlli. Il testo corrente ha interlinea 1,618.

Scala: 16 → 20,5 → 26 → 33 → 42 → 55 → 68 px (√φ). Sulla LIM il testo corrente delle scene non scende sotto 17 px e i titoli restano sopra i 34 px.

## Proporzione aurea

φ = 1,618 è la struttura, non un ornamento. Non si scrive «sezione aurea» nell'interfaccia.

- Spazi di Fibonacci: 5 · 8 · 13 · 21 · 34 · 55 · 89 · 144 px (`--lab-space-1…8`). Il padding delle schede è 21 o 34, il ritmo fra sezioni 55 o 89.
- Raggi: 8 · 13 · 21 (scheda) · 34 (blocchi di rilievo) · pillola.
- Griglie: `1.618fr : 1fr` quando due elementi hanno peso diverso; colonne uguali solo per i confronti.
- Durate di Fibonacci in ms: 144 · 233 · 377 · 610 · 987; sfasamento di 89 ms.

## Movimento

Calmo e vivo, mai rimbalzante. L'entrata veloce e il ritorno lento danno il senso di solennità: hover in 144–233 ms, assestamento in 610 ms, curva `cubic-bezier(.16,1,.3,1)`. Il kit fornisce già:

- l'entrata delle scene con direzione, da destra quando si avanza e da sinistra quando si torna;
- l'alone che segue il cursore e le schede `.la-card` che si inclinano verso di esso (con `data-flat` l'inclinazione si disattiva);
- la mascotte dell'anno in basso a destra: occhi che seguono il puntatore, battute al clic, `cheer()` o `oops()` sulle risposte;
- una festa di coriandoli leggera, solo per i traguardi veri: completamento, risposta giusta, risultati;
- **AMDG**, *Ad maiorem Dei gloria*, nascosto e mai pubblicizzato. Si apre digitando «amdg», con sette clic sulla mascotte o dal segno quasi invisibile nel piè di pagina.

Non ripetere la stessa animazione d'entrata in ogni blocco: il kit varia già fra scena, passo, scheda e carta. Rispetta sempre `prefers-reduced-motion`, come fa già il kit.

## Testata, barra delle scene e LIM

Il guscio dell'artefatto ha tre fasce: testata, scena che scorre, barra delle scene. La barra non copre mai il contenuto.

- **Testata:** logo (sette clic veloci aprono AMDG), classe e titolo; le modalità Lezione, Studio e Giochi; il pulsante **Glossario** con il numero delle parole nuove; **LIM**; tema giorno/notte; schermo intero. Sotto la testata un filo d'avanzamento mostra quanto manca e all'ultima scena si chiude in oro.
- **Barra delle scene:** il **cronometro** (parte da solo al primo «Avanti», confronta il tempo con i `minuti`: in orario, +N′, in anticipo; si mette in pausa e si azzera con due tocchi), i pallini raggruppati per **fase** con i minuti di ciascuna, il contatore, «Indietro» e «Avanti». A destra c'è la corsia della mascotte. Sotto i 720 px la barra si compatta; sotto i 440 px, sul telefono, il cronometro si nasconde.
- **Parole nuove:** ogni `{parola}` del testo ha una sottolineatura d'oro puntinata; al tocco si apre un fumetto con etimologia e spiegazione, e il glossario le raccoglie tutte.
- **Modalità LIM:** pulsante «LIM», tasto L o `?lim=1`. La scena cresce di φ oltre i 1100 px (di √φ sotto), testata e barra di √φ; le domande passano a Figtree 800, i grigi si schiariscono, spariscono bagliori e trame. Regole d'oro per la lavagna: una domanda per schermata, al massimo quattro opzioni, frasi brevi, un solo pulsante pieno.
- **Percezione:** il kit applica prossimità 8 / 21 / 55 px (dentro un gruppo, fra gruppi, fra sezioni), un solo accento caldo per vista, opzioni che entrano insieme, esito entro 233 ms con il suo perché, anello d'oro sui compiti risolti. I criteri da rispettare nelle scene sono in [strumenti.md](strumenti.md), § 3 bis e 3 ter.

## Mascotte degli anni (obbligatorie)

Ogni anno ha la propria mascotte **2D**, la stessa su sito, card e artefatti: I **Semino** (seme, le radici), II **Ichthy** (pesce, Gesù), III **Navicella** (la barca di Pietro, la Chiesa), IV **Bussolina** (la coscienza), V **Terra** (la casa comune). È il web component `<lab-mascotte anno="N" size="…">` (`assets/mascotte/lab-mascotte.js`). Ha un riquadro di 144×144 con geometria di Fibonacci e il corpo centrato a y = 89. Gli occhi seguono il cursore, l'ago di Bussolina punta verso il puntatore, la mascotte batte le ciglia, al clic dice una battuta e al settimo clic apre AMDG. È circondata da una sottile aureola d'oro.

| Dove | Misura |
|---|---|
| Card di un materiale | 34 px, senza aureola |
| Card dell'anno, intestazione dello Studio | 55 px |
| Corsia della barra delle scene | 55 px (44 px sotto i 720 px) |
| Blocco `mascotte` | 89 px |
| Copertina di scena (prima e ultima scena, o `mascotte: true`), pagina dell'anno | 144 px |

Nell'artefatto la mascotte c'è sempre, senza bisogno di aggiungerla:

- nella corsia a destra della barra delle scene (55 px; 44 px sotto i 720 px; più grande in modalità LIM), oppure grande nell'intestazione della prima e dell'ultima scena. Quando è grande, o quando la scena ha già il blocco `mascotte` o la pausa gioco, quella della barra si nasconde, così non compare doppia;
- esulta o incoraggia sulle risposte (`cheer()` e `oops()`) e parla con `ctx.say()`. Il fumetto esce dalla mascotte visibile;
- nel blocco `mascotte` interviene con una battuta o una domanda, con il suo nome in capitali d'oro.

Falla parlare poco, con frasi brevi e pertinenti al tema, mai per ripetere il contenuto. Non ridisegnarla e non sostituirla con emoji o immagini. Per PDF, slide e stampa usa le versioni statiche in `assets/mascotte/svg/` (`1-semino.svg` … `5-terra.svg`).

## Logo

Il lettermark è un quadrato arrotondato (raggio 24 su 96) con il gradiente viola → ciano, una «L» in Cormorant e una stella d'oro. Sta nella testata di ogni artefatto; sette clic veloci sul logo aprono AMDG. C'è anche il wordmark «Lab IRC» in `assets/logo/wordmark.svg`. Non deformarli e non cambiarne i colori.

## Stati interattivi (obbligatori)

Ogni elemento cliccabile ha `:hover`, `:focus-visible` e `:active` espliciti, con transizioni di 150–250 ms, e funziona anche al tocco. Il feedback cambia secondo il ruolo:

| Ruolo | Hover | Active | Focus |
|---|---|---|---|
| Pulsante pieno (`ll-btn`, `ll-btn--oro`, `ll-navbtn--go`) | **magnetico** (segue il cursore di 0,236 × 0,382) e **lama di luce** che attraversa il pulsante in 987 ms | scala a 0,96 | contorno oro 1,5 px |
| Pulsante di contorno (`ll-btn--ghost`) | riempimento che sale dal basso nel colore dell'anno | scala a 0,96 | contorno oro |
| Pulsante solenne (`ll-btn--solenne`) | Cinzel maiuscolo in oro, riempimento d'oro tenue che sale | scala a 0,96 | contorno oro |
| Modalità in testata (chip del design system) | testo più chiaro, fondo sollevato | scala a 0,94; attiva = inchiostro invertito | contorno oro |
| Pulsanti Glossario e LIM (`ll-chip`) | bordo oro | scala a 0,95; attivo = inchiostro invertito | contorno oro |
| Parola nuova (`ll-dfn`), frase da trovare (`lp-seg`) | sottolineatura piena e fondo d'oro tenue | fondo d'oro più deciso | contorno oro |
| Opzione del sondaggio (`lx-opt`) | bordo nel colore dell'anno, spostamento di 3 px | scala a 0,985; a ogni voto bordo verde e «✓ Votato» | contorno oro |
| Collegamento testuale (`ll-link`) | filetto d'oro che cresce dal centro | opacità 0,7 | contorno oro |
| Scelta (`la-choice`, `ll-bin`) | bordo oro e spostamento di 3–5 px | scala a 0,97–0,98 | contorno oro |
| Carta, nodo, data | ingrandimento leggero o bordo oro | ritorno a 0,9–0,95 | contorno oro |

Prima di scrivere un componente proprio, elenca nelle note gli elementi interattivi e il feedback previsto per ciascuno.

## Altri componenti del design system

- **Nota** (blocco `nota`): riquadro ambra con bordo sinistro di 4 px e 💡, per un avvertimento o un errore frequente.
- **Badge**: etichetta piccola in maiuscolo su fondo tenue (viola, ciano, ambra, rosa, verde, rosso). Usala solo per stati o categorie reali.
- **Card**: superficie `--lab-surface`, bordo `--lab-line`, raggio 21, padding 21; al passaggio sale di 5 px e si inclina verso il cursore (`.la-card`).

## Emoji e icone

Si usano solo emoji con una funzione: 🌙 e ☀️ per il tema, ✓ per il completamento, 💡 per un suggerimento, ℹ️ per un avviso. Non si usano mai nei titoli, nelle schede o nei pulsanti. Le icone sono SVG in linea nello stile Lucide: 24×24, tratto di 2 px e `currentColor`.

## Da evitare

Si tratta dei segnali tipici della grafica generata dall'IA:

- schede tutte uguali per raggio, ombra e dimensione, allineate in griglia. Alterna le forme: pillola, scheda 21, blocco 34, riga tratteggiata;
- un'etichetta maiuscola sopra ogni titolo. Il `momento` della scena basta e va messo solo dove orienta;
- numerazioni decorative 01/02/03. I contatori sono ammessi solo quando indicano un avanzamento reale;
- frecce automatiche su tutti i pulsanti. La freccia si usa solo quando indica un movimento;
- fondo crema con accento terracotta, oppure fondo nero con un solo accento acceso. Resta nella palette LAB-IRC;
- testo lungo sullo schermo. La prosa estesa va nella modalità Studio.

## Voce

Italiano, prima persona plurale nelle consegne («proviamo», «confrontiamo»). I pulsanti usano verbi brevi: «Mostra», «Confronta», «Si gioca», «Riprova». Etichette di massimo 3–4 parole. Nel piè di pagina resta sempre `© Matteo Sestili — Tutti i diritti riservati`.
