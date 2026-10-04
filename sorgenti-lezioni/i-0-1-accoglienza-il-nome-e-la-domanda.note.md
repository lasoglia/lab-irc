# Note di conversione — «Il nome e la domanda» (Anno I, accoglienza)

Sorgente: `uploads/accoglienza-classi-1.html` (15 slide + Studio + Esercizio V/F + note docente).
Destinazione: `lezione.js` nel formato kit (9 scene, 50 minuti, 3 componenti propri, giochi, studio, glossario).

## Mappa sezione originale → scena / blocco

| Sezione originale | Scena | Blocco / componente |
|---|---|---|
| Slide 1 · Hook «Il nome e la domanda» | 1 · Aggancio (3′) «Il *nome* e la domanda» | lead = frase del hook; `agenda` (scaletta delle fasi con i minuti) |
| Slide 2 · «La catena dei nomi», tre regole + «comincia chi sta in cattedra» | 2 · Attività (15′) «La *catena* dei nomi» | componente `CatenaNomi`: le tre regole, il suggerimento «prima di te: … che sa fare …», pulsante «Non lo so ancora» |
| Slide 3 · «Questa lavagna la fotografo» (mappa dei talenti, maggio) | 2 (stesso componente) | lavagna digitale dei nomi (solo in memoria) + avviso di fotografare la lavagna vera |
| Slide 4 · «Una cosa che nessuno sa» (alzi la mano chi lo sapeva / voi o i genitori) | 3 · Scoperta (5′) «Una cosa che *nessuno* sa» | due `sondaggio` (alzata di mano); il `dibattito` riprende dal testo Studio §3 il 1984, il Concordato e la titolarità della scelta |
| Slide 5–6 · «La domanda dell'anno» + «Perché non è ovvia» | 4 · Scoperta (5′) «La domanda *dell'anno*» | `rivela` in tre passi (domanda → mondo antico → la lavagna di oggi): è il passaggio PRIMA/DOPO indicato nelle note docente |
| Slide 7–11 · Mappa dell'anno + Tappe 1–4 (mesi, testi, film) | 5 · Scoperta (7′) «Quattro tappe e un *finale*» | componente `MappaAnno`: 4 tappe + ★ Talenti, ognuna con mese, testo della slide, numero di lezioni (da Studio §2) e «Con: …» |
| Slide 12 · «Tre cose che quest'ora non è» | 6 · Scoperta (5′) «Tre cose che quest'ora *non* è» | `carte` (3 carte, retro ampliato con le frasi di Studio §3) + `verifica` lampo sulla valutazione (punto che fa decidere la classe) |
| Slide 13 · «Il patto · vale solo in due» + Studio §4 (versione a 5 punti) | 7 · Attività (5′) «Il patto vale solo in *due*» | `confronto` a due colonne svelato a coppie (5 righe, testo integrale di Studio §4) + `aggancio` «Per capire» con fatto/interpretazione/valore (pull quote e paragrafo di Studio §2) |
| Slide 14 · «La scatola delle domande» + Studio §5 | 8 · Chiusura (3′) «La *scatola* delle domande» | componente `Scatola`: regola, prova «la risposta si trova online?», conteggio dei foglietti (nessuna domanda viene scritta nella pagina) |
| Slide 15 · «Fine del primo giorno» + testo di chiusura dell'Esercizio («tre cose che quasi nessun adulto sa») | 9 · Chiusura (2′) «Fine del *primo* giorno» | lead/testo = la citazione finale; `idee` con le tre cose; `continua` → gioco V/F, scatola, tappa 1. `saluto` = «Ci vediamo alla tappa 1.» |
| Studio §1–5 (testo integrale) | — | `studio.sezioni` (5 sezioni, testo riportato quasi alla lettera; la «DOMANDA» riflessiva è inclusa in §3) + `studio.fonti` |
| Esercizio · 8 vero/falso con perché e fonte | — | `giochi.vf` (8 voci, perché + fonte nel `why`). Aggiunti, derivati dallo stesso contenuto: `quiz` (5), `abbina` (tappe ↔ film), `sfida` (6) |
| Parole: Concordato, laicità, Gilgamesh, Talenti | — | `glossario` (schede toccabili nel testo) |

Minuti: 3 + 15 + 5 + 5 + 7 + 5 + 5 + 3 + 2 = 50. Fasi: Aggancio 3′ · Attività 15′ · Scoperta 22′ · Attività 5′ · Chiusura 5′.

## Che cosa non è stato rappresentato (o è cambiato)

- **Note per il docente** (uso in aula, «se qualcuno ride di qualcuno si ferma il gioco e si ripete la regola del patto», deviazione dallo schema PRIMA/DOPO, privacy): sono regia, non vanno sullo schermo. Vanno riportate nella scheda docente dell'artefatto; qui restano solo in questa nota.
- **Pulsanti «Scarica il testo» / «Stampa», schermo intero, frecce da tastiera**: li fornisce il kit (modalità Studio e testata), non sono stati ricreati.
- **Messaggio finale dell'Esercizio** («Fatto: N su 8. Il numero non va da nessuna parte…»): il motore giochi mostra il proprio esito; la parte di contenuto («tre cose che quasi nessun adulto sa») è diventata il blocco `idee` dell'ultima scena.
- **La «DOMANDA» riflessiva di Studio §3** («quanto ha pesato una convinzione, l'abitudine, gli altri?») è rimasta solo nel testo di Studio: non è stata resa come gioco `rifl` perché quel gioco salva la risposta sul dispositivo e la fonte promette «nessuno leggerà la risposta».
- **Il patto**: sullo schermo va la versione completa a 5 punti (Studio), non quella abbreviata della slide. L'accoppiamento riga per riga (insegnante ↔ studente) è una scelta editoriale di impaginazione, non è nella fonte, che presenta due elenchi separati.
- **Esempio della regola 3** («Lei è Sara, che sa fare X»): mantenuto alla lettera come esempio; il suggerimento dinamico usa la forma neutra «Prima di te: Nome, che sa fare …».
- **Mese del finale ★**: «Maggio» è ricavato da «La rivedremo a maggio» (slide 3); la slide 7 non indica un mese per i Talenti.
- **Glossario**: le definizioni vengono dal testo della fonte; le due etimologie (Concordato ← lat. *concordare*; laicità ← gr. *laikós*) sono aggiunte standard di dizionario, non presenti nella fonte. Da togliere se non si vogliono.
- **Distrattori** dei `quiz`/`sfida` aggiunti (per es. «1948», «Il dirigente», «Chi era Gilgamesh?») sono opzioni sbagliate inventate come tali; le risposte corrette e i `why` vengono tutti dalla fonte.
- **Scena 3**: due sondaggi nella stessa scena (le due alzate di mano della slide 4); nessun altro `sondaggio` nella lezione, per rispettare il limite di due usi dello stesso blocco interattivo.
- Stile dei componenti: iniettato dal file stesso con un piccolo `<style>` (classi `acc1-*`, solo token del design system), così non serve un `--css` separato.
- Non è stato eseguito un collaudo in browser (solo `node --check` e controlli strutturali): l'impaginazione a 360 px e il comportamento dei componenti vanno provati con l'artefatto assemblato.
