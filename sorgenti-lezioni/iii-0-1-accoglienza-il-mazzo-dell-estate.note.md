# Note di conversione · Il mazzo dell'estate (Anno III, accoglienza)

Sorgente: `uploads/accoglienza-terza-mazzo-estate-artefatto.html` (tre schede: Gioco · L'anno · Mappa, più «Note per chi insegna»).
Destinazione: `lezione.js` nel formato kit (7 scene, 50 minuti, un componente proprio `Mazzo`, glossario, Studio).

## Mappa sezione originale → scena / blocco

| Sezione originale | Scena | Blocco | Note |
|---|---|---|---|
| Testata (titolo, sottotitolo «Ventiquattro carte per raccontarsi…») | — | metadati `titolo`, `sottotitolo`, `classe` | Titolo con una sola parola in corsivo: «Il *mazzo* dell'estate». |
| Regola del gioco + schede | 1 · Apertura (3′) | `agenda` + `mascotte` | L'agenda sostituisce le tre schede: scaletta cliccabile con i minuti per fase. |
| **Gioco** «Pesca una carta»: 4 semi (7+7+6+4 = 24 carte), contatore, «Carta a caso», «Rimescola», cronometro 40 s | 2 · Il gioco (22′) | `custom: Mazzo` | Stesse 24 carte, stesso testo; un seme si esaurisce e si disabilita; «Rimescola» a due tocchi; cronometro solo visivo (nessun suono), si azzera a ogni carta; stato solo in memoria. |
| Pulsante «La carta dell'anno» del gioco | 7 · Chiusura | (vedi sotto) | Nel sorgente il pulsante mostrava «Una cosa che vorresti **fosse vera**, quest'anno», mentre slide 15 e Mappa dicono «Una cosa che vorresti **decidere tu**, quest'anno». Ho usato la seconda (coerente con «Chi l'ha deciso?» e ripetuta due volte); la carta sta nella scena finale, non nel componente. |
| Slide 1–2 «Chi l'ha deciso?» · «Avete sedici anni» | 3 · La domanda dell'anno (4′) | `rivela` (3 passi) | Lead = la carta delle Domande che apre la slide (come indicato nelle note del docente). |
| Slide 3 «Ventotto ore, sei tappe» (4 punti) | 4 · Come funziona (8′) | `lead` + `testo` della scena | I quattro punti sono prosa breve; `verifica rovesciata` e `Talenti` rimandano al glossario. |
| Slide 4–6, 7 (A metà strada), 8–10: le sei tappe + verifica rovesciata | 4 · Come funziona (8′) | `tappe` (7 voci) | Testo delle slide con «A cosa vi serve» in grassetto; `breve` = disciplina dalla Mappa (Storia, Teologia, Filosofia…). |
| Slide 11 «Tre materiali per ogni lezione» (+ verifica di fine tappa) | 5 · Come si lavora (4′) | `carte` (4 carte) | La quarta carta porta «cinquanta domande in quarantacinque minuti». |
| Slide 12 «Tre cose contano» | 5 · Come si lavora (4′) | `idee` (3) + `testo` della scena | «Nessuno è valutato per ciò che crede…» sta nel `testo` della scena. |
| Slide 13 «Il patto: tre regole» | 6 · Il patto (4′) | `rivela` (3 passi) | Ordine e parole originali. |
| Slide 14 «La prossima ora: Sotto casa vostra» | 6 · Il patto (4′) | `aggancio` (non conta come blocco) | Testo integrale della slide; richiamato in breve anche nel `continua` finale. |
| Slide 15 «La carta dell'anno» + cap «Tutti, un giro rapido. Va alla lavagna…» | 7 · Chiusura (5′) | `nuvola` + `continua` | La nuvola raccoglie le parole chiave dette dalla classe (solo in memoria), come «lavagna» da fotografare; `continua` rimanda a gennaio, alla prossima ora e all'inizio. |
| **Mappa** (foglio stampabile, 4 sezioni) | — | `studio.sezioni` (4) | Testo della Mappa ripreso quasi alla lettera; «Scarica la mappa» → «Scarica il testo» del kit. |
| Pulsante «Scarica la mappa» (.txt) | — | modalità Studio | Il `.txt` originale aveva in testa «COSA È VERO? — LA MAPPA DELL'ANNO» e nome file `cosa-e-vero-…`: refuso del sorgente (titolo di un'altra classe), non ripreso. |
| Note per chi insegna (6 punti) | — | **non rappresentate** | Vanno nella scheda docente (`docente/<slug>-artefatto-docente.md`); le riporto sotto. |

Minuti: 3 + 22 + 4 + 8 + 4 + 4 + 5 = 50. Fasi: Aggancio · Attività · Scoperta · Chiusura.

## Che cosa non ho rappresentato (o ho cambiato)

- **Giochi**: il sorgente non contiene quiz, vero/falso o abbinamenti; `LEZIONE.giochi` è quindi omesso (la scheda «Giochi» non compare). Se si vuole una pausa gioco, si può derivare un `abbina` tappa ↔ «a cosa serve» dai testi della Mappa, ma sarebbe materiale nuovo.
- **Fonti dello Studio**: la Mappa non cita fonti; ho scritto una sola riga onesta («materiali del docente per la classe III»). Nessuna fonte inventata.
- **Glossario** (quattro voci: talenti, verifica rovesciata, vizi capitali, obiezione di coscienza): le definizioni riprendono i testi della Mappa; le etimologie di *talento*, *vizio capitale* e *coscienza* sono quelle correnti dei dizionari, non presenti nel sorgente — da verificare secondo il metodo dei contenuti se si vuole essere rigorosi.
- **Linguaggio neutro**: due carte con forma maschile sono state ritoccate senza cambiare il senso: «di cui tu non sei convinto» → «che a te non convince»; «Presenta il compagno alla tua destra» → «Presenta chi siede alla tua destra». Le altre carte sono alla lettera (restano «sei stato», «ti sei stancato», «sono fatto così» nelle slide, perché cambiarle avrebbe toccato il tono del docente).
- **Schermo intero, frecce, scheda «L'anno» come slide separate**: forniti dal kit (navigazione fra scene, LIM, tema).
- **«Passo» una volta sola**: resta una regola detta a voce (lead e carta), non viene conteggiata.
- **Collaudo**: `node --check` passa; ho renderizzato in Node (React server-side) tutti gli 11 blocchi di tutte le scene senza errori, incluso il componente `Mazzo`. Non ho potuto assemblare l'HTML con `build_artefatto.py` (nel checkout mancano i font in `skill/assets/fonts/`) né provarlo in un browser (nessun Playwright): la prova a 360 px, il tema chiaro/scuro e il cronometro vanno controllati in un browser reale.

## Note per chi insegna (dal sorgente, da portare nella scheda docente)

- Chi insegna pesca per primo e risponde davvero: è il modello di misura e di sincerità che la classe copierà. In terza serve più che in quarta: a sedici anni il primo a esporsi decide il registro di tutti.
- Il seme «Domande» è il ponte verso l'anno: se nessuno lo sceglie, pescarne una a caso verso la fine del giro. La carta su ciò che si fa ogni giorno senza sapere chi l'ha inventato apre direttamente la scena 3.
- La carta delle Attese sui talenti («cosa sai fare che quasi nessuno qui sa») va annotata: è il primo censimento per l'UDA finale.
- La carta dell'anno si fa in un giro rapido, tutti, senza commento; le parole chiave vanno alla lavagna (o nella nuvola della scena 7) e in una fotografia da rileggere alla verifica rovesciata.
- Con più di ventidue studenti: una carta a testa, seme «Sfide» solo per i volontari. La carta sull'abitudine chiede apposta di non dire quale sia: se qualcuno la nomina va bene, ma non va chiesto.
- L'artefatto non raccoglie, non salva e non trasmette alcun dato: il mazzo si rimescola con il pulsante o ricaricando la pagina.
