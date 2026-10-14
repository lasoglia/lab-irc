# Chi può insegnare a chi? · Note del docente (Anno III, UDA 1, lezione 2)

Artefatto: `uploads/iii-1-2-chi-puo-insegnare-a-chi-artefatto.html` (stesso nome di prima: il sito lo collega per nome).
Sorgente: `sorgenti-lezioni/iii-1-2-chi-puo-insegnare-a-chi.js` + CSS della lezione `…-chi-puo-insegnare-a-chi.css` (il componente «Disputa», una regola per il blocco leggi e le regole LIM per la Disputa e per l'animazione) · Testo di studio: `…-chi-puo-insegnare-a-chi.testo.txt`.
Fascicolo di riferimento (invariato): `uploads/iii-1-2-chi-puo-insegnare-a-chi-fascicolo.pdf`.
Versione del 14 ottobre 2026, seconda stesura (dopo la revisione di due lettori): stesse 12 scene, stessi strumenti e stessa grafica del 4 ottobre; filo logico reso continuo con un lead-ponte di una frase su ogni scena, scena 9 alleggerita e ricucita, parole marcate ridotte a cinque lemmi, LIM sistemata nelle scene 3, 6 e 8; ricostruzione con il kit definitivo del 5 ottobre (modalità visore, LIM corretta per le animazioni). Skill «IRC · Artefatto interattivo della lezione». Lezione-modello per i ponti: `ii-1-2-gesu-quali-tracce-lo-screenshot-non-basta.js`.

Comando di ricostruzione (dalla cartella del progetto):

```bash
python3 -I design-system/assets/artefatti/skill-lezione/scripts/build_artefatto.py \
  sorgenti-lezioni/iii-1-2-chi-puo-insegnare-a-chi.js -o uploads/iii-1-2-chi-puo-insegnare-a-chi-artefatto.html \
  --anno 3 --titolo "Chi può insegnare a chi?" \
  --descrizione "La nascita delle università tra fede, sapere e discussione: lezione interattiva di 50 minuti, classe III." \
  --css sorgenti-lezioni/iii-1-2-chi-puo-insegnare-a-chi.css
```

Nessun dato degli studenti viene raccolto o salvato: voti, scelte e risposte restano solo nella pagina aperta. Il kit ricorda soltanto le preferenze previste (tema, LIM, suoni, skin, ultima scheda gioco, nomi collettivi delle squadre).

---

## 1. Scheda della lezione

```text
Titolo e identificativo: III 1-2 · «Chi può insegnare a chi?»
Classe / età: III, 16-17 anni
UDA e posizione: UDA 1 «Luoghi che cambiano la vita», lezione 2 di 2 (dopo la Regola di Benedetto)
Domanda centrale: chi ha il diritto di insegnare, e chi può mettere alla prova ciò che viene insegnato?
Una sola storia: dal cercare Dio nelle Scritture alle università (città, Bologna e Parigi), dal metodo
  della disputa agli statuti che autorizzano il maestro, fino alla distinzione fra autorità e
  autorevolezza; ritorno alla domanda con le parole della lezione.
Obiettivo osservabile: lo studente spiega perché le università nascono da più fattori (fede, città,
  diritto, traduzioni), distingue universitas (corporazione) da «edificio» e 1088 (data convenzionale)
  da «fondazione», riconosce la mossa della distinzione in una disputa e, davanti a un caso nuovo,
  separa il ruolo (autorità) dalla fiducia motivata (autorevolezza).
Criterio di riuscita: nella Disputa la classe trova la mossa giusta al massimo al secondo tentativo;
  smista 3/4 al primo colpo; ordina 6/6 (anche dopo una correzione); verifica finale corretta.
Dossier dei contenuti: il fascicolo PDF (e la sua versione in testo) + l'artefatto del 4 ottobre.
Catena causa-effetto (una scena per anello):
  1. Nel cristianesimo la fede passa anche dalle Scritture: per capirle bisogna imparare → per
     questo monasteri e scuole delle cattedrali coltivano lingua, lettura e biblioteche. [scena 2]
  2. Ma le scuole da sole non spiegano le università: fra XI e XIII secolo città, commerci, diritto e traduzioni
     chiedono competenze → studenti e maestri convergono in una città. [scena 3]
  3. Quando molti studenti arrivano, servono organizzazione e tutele → a Bologna si associano gli
     studenti (universitas = corporazione; 1088 convenzionale; Habita 1155); a Parigi i maestri
     (riconoscimenti 1200, 1215, 1231). [scene 4-5]
  4. Una comunità di studio deve decidere anche come si impara → lectio, quaestio, disputatio:
     davanti all'obiezione il maestro distingue (caso immaginario); Tommaso fa la stessa mossa
     sull'autorità (Summa I, q. 1, a. 8, ad 2). [scene 6-7]
  5. Ma la disputa funziona solo se la comunità distingue competenza reale e pretesa → gli statuti
     (Parigi 1215) fissano requisiti, tutele e limiti; una norma prescrive, non prova. [scena 9]
  6. Requisiti e limiti dicono chi ha l'autorità di insegnare, non quando fidarsi → autorità e
     autorevolezza non coincidono; un'obiezione vale per la ragione che porta. [scena 10]
  Risposta: preparazione verificata, riconoscimento e discussione. [scene 11-12]
Parole nuove marcate nelle scene (cinque lemmi, sei sottolineature): statuto (scene 5 e 9),
  quaestio e distinzione (scena 6), autorevolezza (scena 7), autorità (scena 10); università è
  nell'etimo della scena 4. Le altre voci (nationes, corporazione, diritto romano e canonico, data
  convenzionale, bolla, scolastica, lectio, disputatio, legato pontificio, licenza, arti, scuola,
  maestro, studente) restano nel glossario di testata (21 voci) per lo Studio; sullo schermo sono in
  corsivo (latino), in grassetto (didascalie) o spiegate in riga («legato pontificio (l'inviato del
  papa)», «le arti, le discipline di base come grammatica e logica»).
Fonti: § 9. Piano: § 4. Pausa gioco: Sfida a squadre a metà (scena 8), dopo il nucleo più denso
  (Disputa e Tommaso), con domande solo su ciò che è già stato visto.
Prova finale: ordina (sei passaggi) + verifica su un caso nuovo (scena 11) + sondaggio d'uscita
  confrontato con quello d'ingresso (scena 12).
```

**Fraintendimenti da smontare**
- «Un papa ha fondato Bologna nel 1088» → verifica della scena 4, bivio della scena 10, verifica finale, V/F.
- «Universitas = edificio o tutte le materie» → etimo della scena 4, Sfida, V/F, memory.
- «Le università nascono da una causa sola (la Chiesa, o le città)» → animazione e verifica della scena 3, idee finali.
- «Un'obiezione è un insulto; chi obietta ha ragione per il fatto di obiettare» → Disputa (scena 6), carte e bivio (scena 10), quiz.
- «L'autorità rende vera ogni frase» / «l'argomento d'autorità non vale mai» → leggi su Tommaso (scena 7), carte (scena 10).
- «Nel Medioevo c'era la libertà di ricerca di oggi» o, all'opposto, «la Chiesa vietava ogni filosofia» → smista con la chiusura (scena 9), verifica finale.
- «Lo statuto prova che tutti lo rispettavano» → perché della voce su Aristotele nello smista (scena 9), quiz 5 e V/F 7.

**Essenziale da far imparare**: la frase di Benedetto XVI e il suo limite («con onestà»); i quattro fattori; *universitas* = corporazione, nationes, 1088 convenzionale, Habita 1155; Bologna studenti / Parigi maestri, *Parens scientiarum* 1231; lectio, quaestio, disputatio, distinzione; Tommaso: l'autorità soltanto umana è l'argomento più debole, quella della rivelazione il più efficace; statuti 1215: vent'anni, sei anni di studio, nessuna licenza comprata, divieto della metafisica di Aristotele, 1231; autorità ≠ autorevolezza; la risposta in tre parole.

---

## 2. Mappa dell'essenziale (anello → scena → Studio)

| Anello, concetto o parola | Scena | Studio |
|---|---|---|
| Domanda: chi decide chi può insegnare | 1, 12 | La domanda · La risposta |
| Anello 1 · Scritture → imparare; Benedetto XVI 2008; *scuola* (*scholḗ*); limite «con onestà» | 2 (citazione, parola, aggancio) | § 2 |
| Anello 2 · città, diritto romano e canonico, traduzioni; «nessuna causa da sola basta» | 3 (animazione, verifica) | § 3 |
| Anello 3 · Bologna: nationes, *universitas* = corporazione, studenti pagano i maestri, 1088 convenzionale, Habita 1155 | 4 (etimo, verifica, aggancio) | § 4 (anche Carducci 1888) |
| Anello 3 · Parigi: maestri, 1200-1215-1231, *Parens scientiarum*; due strade, nessuna «scena di fondazione» | 5 (confronto) | § 5 |
| Anello 4 · lectio, quaestio, disputatio, distinzione, scolastica; caso immaginario della testimonianza scritta | 6 (componente «Disputa») | § 6 |
| Anello 4 · Tommaso, Summa I, q. 1, a. 8, ad 2; Boezio; Agostino a Girolamo; grazia e natura | 7 (leggi, trova la frase) | § 7 |
| Anello 5 · statuti 1215 (prima che i maestri possano darsene di propri, 1231): requisiti (20 anni, 6 di studio, esame), tutele (niente licenza comprata, accordi), limiti (Aristotele; «un divieto prescrive, non prova»); 1231; collegi e Sorbona | 9 (stima, smista, aggancio) | § 8 |
| Anello 6 · autorità / autorevolezza / obiezione; caso dell'ospite famoso; bilancia delle ragioni; quaestio in quattro mosse | 10 (carte, varianti) | § 9 |
| Catena intera; caso nuovo (1088 + «insegnare qualunque cosa») | 11 (ordina, verifica) | — |
| Risposta: preparazione verificata, riconoscimento, discussione; tre idee | 12 (domanda d'uscita, idee) | La risposta |
| Solo nello Studio e nei giochi: Giustiniano e Graziano (glossario), nome di Filippo Augusto (il «re (1200)» del confronto), sospensione delle lezioni (1231), Carducci 1888 (anche nella linea del tempo); «una norma prescrive, non prova» sta nel perché dello smista (scena 9) e in quiz 5, V/F 7 | giochi (quiz, vf, seq) | §§ 3, 4, 5, 8 |

---

## 3. Regia degli strumenti

| Anello | Che cosa deve capire la classe | Perché è difficile | Tipo di difficoltà | Strumento scelto | Alternativa |
|---|---|---|---|---|---|
| Domanda | Non c'è una risposta ovvia: autorità, studenti, colleghi, «chi spiega bene» | Si risponde d'istinto | Posizione personale | `domanda` d'ingresso, con `confronta` in uscita | nuvola |
| 1. Cercare Dio → imparare | La fede dà allo studio una ragione e dei luoghi, senza inventarlo | Rischio di apologetica («ogni scuola nasce dal cristianesimo») | Lettura di una fonte + etimologia | `citazione` con commento + `parola` (scuola) + `aggancio` «Con onestà» | `leggi` |
| 2. Le città chiedono competenze | Quattro fattori convergono; nessuno basta da solo | Si cerca una causa unica | Processo, convergenza | `animazione` a 5 fotogrammi con le frecce + `verifica` | `catena` |
| 3. Bologna e Parigi | *Universitas* è una corporazione; 1088 è convenzionale; due strade diverse | Parola di oggi proiettata sul passato; «fondazione» | Etimologia + distinzione + confronto | `etimo` + `verifica` + `aggancio` (Habita); `confronto` a quattro righe | `tappe` |
| **4. Il metodo: obiezione e distinzione** (concetto più difficile) | Davanti a un'obiezione il maestro non zittisce e non cede: distingue; anche chi obietta porta una ragione | È una mossa, non una nozione: va fatta | Decisione dentro un processo | **componente proprio «Disputa»** (cinque fasi, tre strade, due rami) | `storia`, `bivio` |
| 4. Tommaso | La stessa mossa in un testo vero; due autorità, due pesi | Testo denso, lessico tecnico | Lettura di una fonte | `leggi` in modalità «trova la frase» (quattro candidate) | `citazione` |
| 5. Chi autorizza il maestro | Requisiti, tutele e limiti stanno nello stesso testo; una norma prescrive, non prova | Si legge lo statuto o come «libertà» o come «censura» | Dato che sorprende + classificazione | `stima` (20 anni) + `smista` (requisito / tutela / limite) + `aggancio` (Sorbona) | `griglia` |
| 6. Autorità e autorevolezza | Il ruolo non rende vera ogni frase; l'obiezione vale per la ragione | Due parole quasi uguali | Distinzione fra concetti vicini + applicazione | `carte` + `varianti` (bivio / bilancia / consegna) | `bilancia` sola |
| Prova e ritorno | Ricostruire la catena, usare i criteri su un caso nuovo | — | Verifica | `ordina` + `verifica`; `domanda` d'uscita + `idee` | `quiz` |

**Perché un componente proprio per il concetto più difficile.** Nessun blocco del kit fa *compiere* la mossa della disputa: «Disputa» mette la classe nel ruolo del maestro davanti a un'obiezione vera (una menzogna può essere scritta) e offre tre strade; solo la distinzione sblocca il passo successivo, che disegna i due rami (testimonianza controllata / soltanto scritta) e poi la risposta. Le cinque fasi in alto (lectio, quaestio, disputatio, distinctio, risposta) sono il metodo della scolastica reso visibile: per questo il testo della scena non le definisce più una per una, ma rimanda a «le mosse che vedete in alto» (le definizioni restano nel glossario e nello Studio § 6). Il codice è identico alla versione del 4 ottobre; il CSS aggiunge solo regole valide in LIM (§ 11).

**Vincoli rispettati**: un solo strumento principale per scena, al massimo due blocchi oltre a un eventuale aggancio (tre agganci in tutto: scene 2, 4, 9); fonte principale letta davvero (scena 7; citazione in 2); la classe decide in 3, 4, 6, 7, 9, 10, 11; equivoco più probabile (1088, «fondazione») smontato con esito motivato in 4, 10 e 11; nessun tipo di blocco interattivo più di due volte; il secondo smista della scena 9 è stato tolto (la sua idea sta nella chiusura del primo, nel quiz e nel V/F).

---

## 4. Piano minuto per minuto (50′)

| # | Minuti | Fase · momento | Scena | Strumento principale | La classe agisce |
|---|---|---|---|---|---|
| 1 | 0–3 (3′) | Aggancio · Apertura | Chi può *insegnare* a chi? | `domanda` d'ingresso | voto per alzata di mano |
| 2 | 3–7 (4′) | Scoperta · Fonte 2008 | Cercare Dio chiede di *imparare* | `citazione` + `parola` (+ aggancio) | apre il commento, scompone la parola |
| 3 | 7–11 (4′) | Scoperta | Le città chiedono *competenze* | `animazione` + `verifica` | segue i fotogrammi, risponde |
| 4 | 11–15 (4′) | Scoperta | Bologna: prima vengono gli *studenti* | `etimo` + `verifica` (+ aggancio) | tocca le parti, risponde sul 1088 |
| 5 | 15–18 (3′) | Scoperta | Parigi: una comunità di *maestri* | `confronto` | svela le righe |
| 6 | 18–24 (6′) | Scoperta | Un'obiezione, una *distinzione* | componente «Disputa» | sceglie la mossa del maestro |
| 7 | 24–28 (4′) | Scoperta · Fonte | Tommaso e l'argomento più *debole* | `leggi` (trova la frase) | cerca la frase della distinzione |
| 8 | 28–35 (7′) | Attività · Pausa gioco | Sfida a *squadre* | `gioco` → Sfida a squadre | due squadre |
| 9 | 35–40 (5′) | Attività · Fonte 1215 | Chi autorizza il *maestro*? | `stima` + `smista` (+ aggancio) | stima, smista |
| 10 | 40–45 (5′) | Attività · Laboratorio | Autorità o *autorevolezza*? | `carte` + `varianti` | gira le carte, una variante a scelta |
| 11 | 45–48 (3′) | Chiusura · Prova | Rimettete in fila il *percorso* | `ordina` + `verifica` | ordina, risponde al caso nuovo |
| 12 | 48–50 (2′) | Chiusura | Torniamo alla *domanda* | `domanda` d'uscita + `idee` | voto, confronto con l'ingresso |

Somma: 3+4+4+4+3+6+4+7+5+5+3+2 = **50**. Per fase, come nella barra: Aggancio 3′, Scoperta 25′, Attività 17′, Chiusura 5′. Tratto più lungo di solo ascolto: circa 3 minuti (ogni scena ha un'azione della classe). Mascotte (Navicella) grande in apertura e chiusura.

---

## 5. Piano di regia

**Se il cronometro segna ritardo**
- Scena 2: non aprite l'aggancio (lo riprende lo Studio): −1′.
- Scena 3: «Avvia l'animazione» e lasciatela scorrere senza commentare ogni fotogramma: −1′.
- Scena 5: «Inizia il confronto» e svelate solo le prime due righe: −1′.
- Scena 8: Sfida a squadre con sole 5 domande (fermate la partita e tornate alla lezione): da 7′ a 5′.
- Scena 9: saltate la stima e andate allo smista (dite voi il dato dei vent'anni): −1′.
- Scena 10: variante «Due voci, un documento» (la più rapida) e carte lette senza commento.

**Se si è in anticipo**
- Scena 6: fate votare le tre strade per alzata di mano prima di toccarle; dopo la risposta, «Rifate la disputa» con un'obiezione inventata dalla classe.
- Scena 7: aprite anche la terza frase (grazia e natura) e la quarta (Agostino): perché per Tommaso la ragione non dimostra la fede ma la chiarisce?
- Scena 9: aprite l'aggancio sulla Sorbona: chi poteva studiare davvero?
- Scena 10: una seconda variante (bilancia o quaestio a coppie).
- Scena 12: dibattito sulla domanda del dibattito: perché un'obiezione giusta non rende lo studente più competente del maestro?
- Modalità Giochi: Quiz (6 con il perché), Vero o falso (8), Linea del tempo (6), Memory (6 coppie).

---

## 6. Traccia orale per scena, con i ponti detti a voce

1. **Apertura.** Lead: «Un maestro può conoscere molti libri e spiegare male; uno studente può porre una domanda che il maestro non si era posto.» La domanda la pone il sondaggio: «Chi dovrebbe decidere se una persona può insegnare?» Votate, mostrate i risultati, non commentate; **tenete i voti** (il kit li ricorda e li confronta alla scena 12): «le università medievali hanno provato quasi tutte queste risposte; alla fine rivotiamo e confrontiamo».
2. **Cercare Dio.** Ponte: «Per rispondere partiamo da una pratica più antica delle università: leggere insieme un testo importante.» Leggete la frase di Benedetto XVI e aprite il commento: è una lettura dall'interno della fede, e **per questo** monasteri e scuole delle cattedrali coltivano lingua, lettura e biblioteche (è la conseguenza che prima stava in un paragrafo sotto il lead: ora la dite voi, dopo la fonte). Toccate *scuola*: tempo liberato, non tempo perso. Aprite «Con onestà»: il cristianesimo non inventa lo studio.
3. **Le città.** Ponte: «Le scuole da sole non spiegano le università: che cosa cambia fra XI e XIII secolo?» Fotogrammi uno alla volta; all'ultimo: «nessuna causa, da sola, basta». Verifica: perché studenti e maestri si raccolgono a Bologna?
4. **Bologna.** Ponte: «Quando molti studenti arrivano in una città servono organizzazione e tutele: a Bologna se le danno gli studenti.» Toccate le tre parti di *università*: corporazione, non edificio. Verifica sul 1088: convenzionale, non falso (Carducci 1888 è nello Studio e nella linea del tempo: citatelo solo se c'è tempo). Aggancio: la *Constitutio Habita*.
5. **Parigi.** Ponte: «A Bologna si sono associati gli studenti. A Parigi la stessa domanda riceve un'altra risposta: i maestri.» Svelate le quattro righe. Chiudete sulla domanda del confronto: «due strade, nessuna scena di fondazione; ma in entrambe bisogna decidere anche *come* si impara».
6. **La disputa.** Ponte: «Una comunità di studio, comunque sia organizzata, deve decidere come si impara: il metodo parte da un testo autorevole e da un'obiezione.» Il testo sotto dà solo il nome del metodo (*scolastica*) e rimanda alle cinque mosse scritte in alto nel componente: le parole latine le dite voi mentre le fasi si accendono (lectio: il maestro legge e spiega; quaestio: la difficoltà diventa domanda; disputatio: argomenti e obiezioni; distinctio; risposta). Leggete la tesi, fate arrivare l'obiezione, poi le tre strade: fate scegliere la classe, aprite anche le strade sbagliate (zittire, cedere). Distinzione: i due rami. Risposta: «la domanda non ha reso inutile il maestro; ma anche lo studente ha dovuto portare una ragione». In LIM, dopo la scelta, il perché e il pulsante «Mostra la distinzione» sono in vista; al passo 5 resta sotto la barra solo «Rifate la disputa» (facoltativo).
7. **Tommaso.** Ponte: «Il caso era immaginario. Tommaso, maestro a Parigi, fa la stessa mossa in un testo vero, proprio sull'autorità.» L'obiezione cita «un autore antico, Boezio» (basta così: non ha voce di glossario). Cercate la frase della distinzione: chi indica la prima ha trovato la tesi; la seconda è la distinzione (autorità umana / rivelazione). Se c'è tempo, Agostino: santità e dottrina non bastano a rendere vera una frase.
8. **Sfida a squadre.** Ponte: «Dalle scuole alla disputa: otto domande, poi chi autorizza il maestro.» Il pulsante «Si gioca» è il primo blocco (in LIM è in vista senza scorrere); l'indizio della mascotte sta sotto. Due squadre con nomi collettivi; al ritorno («Torna alla lezione · scena 8»): quale domanda ha diviso di più?
9. **Gli statuti.** Ponte: «Per Tommaso l'autorità di un uomo vale quanto le sue ragioni; ma la comunità deve saper distinguere una competenza reale da una pretesa: per questo gli statuti fissano chi può insegnare.» Il testo lega i due dati della lezione: prima che i maestri possano darsi statuti propri (1231, scena 5), a Parigi li promulga nel 1215 il legato del papa Robert de Courçon. Stima dell'età (vent'anni); poi smistate: requisito, tutela, limite. Alla voce su Aristotele il perché aggiunge: «un divieto dice che cosa si prescrive, non che tutti lo rispettassero». Chiusura: stesso testo, sostiene e delimita; 1231. Aggancio: la Sorbona.
10. **Autorità e autorevolezza.** Ponte: «Requisiti, tutele e limiti dicono chi ha l'autorità di insegnare, non ancora quando fidarsi di ciò che insegna.» Il resto lo dicono le carte: chi ha il ruolo non ha per questo sempre ragione; chi obietta non è per questo più competente. Girate le tre carte; scegliete una variante: il caso dell'ospite famoso (il metodo della disputa), la bilancia (fate motivare ogni peso), o la quaestio a coppie.
11. **Il percorso.** Ponte: «Dal cercare Dio all'autorevolezza: i sei passaggi di oggi. Rimetteteli in fila; poi un caso nuovo.» (Sei anelli, non sei scene: Bologna e Parigi sono un anello, Disputa e Tommaso un altro.) La classe detta l'ordine, voi toccate; poi la verifica sul compagno che dice «un papa fondò Bologna nel 1088, quindi…».
12. **Ritorno.** Ponte: «Il percorso è in fila. Ora, con le parole di oggi, torniamo alla domanda dell'inizio.» Rivotate: il tratteggio d'oro è il voto d'inizio. Leggete la risposta nel dibattito (preparazione verificata, riconoscimento, discussione) e le tre idee.

---

## 7. Soluzioni

- **Scena 1 e 12 · sondaggio**: nessuna risposta giusta; il confronto mostra se la classe si è spostata (di solito verso «colleghi esperti, con un esame», che è anche la risposta degli statuti, e verso una combinazione).
- **Scena 3 · verifica**: B (più fattori). **Animazione**: scuole → città → diritto → traduzioni → convergenza con quattro frecce.
- **Scena 4 · verifica 1088**: C (data convenzionale). **Etimo**: unus + versus → universitas, «totalità», nel Medioevo «corporazione».
- **Scena 6 · Disputa**: A («il maestro sono io») non risolve; B («nessuna testimonianza vale») non risolve; **C («Distinguo»)** è la mossa; rami: testimonianza controllata (tesi regge) / soltanto scritta (vale l'obiezione); risposta: merita fiducia la testimonianza controllata.
- **Scena 7 · leggi**: la frase da trovare è la seconda («Benché l'argomento tratto da un'autorità fondata sulla ragione umana sia il più debole, quello tratto da un'autorità fondata sulla rivelazione divina è il più efficace»). La prima è la tesi, la terza il compito della ragione, la quarta la conseguenza per i maestri umani (Agostino).
- **Scena 8 · Sfida a squadre** (8 domande, in quest'ordine): per cercare Dio nelle Scritture bisogna capirne le parole; una corporazione di persone associate; gli studenti; il diritto, romano e canonico; una data convenzionale; una difficoltà del testo trasformata in domanda; distingue in che senso la tesi vale; il più debole. Regola: a turno, 20 secondi; chi sbaglia lascia la domanda all'altra squadra, che può rubarla per metà punti. Restituzione: «Quale domanda ha diviso di più le squadre, e perché?»; «Che differenza c'è fra una data convenzionale e una falsa?».
- **Scena 9 · stima**: 20 anni (tolleranza ±2); sei anni di studio; teologia: 35 anni e otto di studio. **Smista**: sei anni di lezioni = requisito; nessuna licenza comprata = tutela; non leggere la metafisica di Aristotele = limite (il perché aggiunge: un divieto prescrive, non prova che tutti lo rispettassero); accordi se uno studente è ferito = tutela. Chiusura: stesso testo, sostiene e delimita; 1231.
- **Scena 10 · bivio**: A (ko) la fama non è una prova; B (neutro) la fonte gli dà ragione, ma non perché obietta; **C (ok)** si esamina la fonte e si chiedono le ragioni. **Bilancia**: nessun esito «giusto»: la classe assegna i pesi e li motiva; le note dicono da dove viene ogni ragione. **Consegna**: quattro righe per coppia (questione, obiezione con ragione, argomento contrario, distinzione).
- **Scena 11 · ordina**: cercare Dio → città → universitas → questioni → requisiti e limiti → autorevolezza. **Verifica finale**: A (entrambe le affermazioni: origini graduali e statuti che limitavano anche i libri).
- **Giochi per il ripasso a casa**: Quiz (6, con il perché), Vero o falso (8: compresa la frase «dopo il 1215 nessuno lesse più la metafisica», falsa perché un divieto non prova l'obbedienza), Linea del tempo (1088, 1155, 1200, 1215, 1231, 1888), Memory (6 coppie).

---

## 8. Varianti senza proiettore

- **Scene 1 e 12**: alzata di mano con le quattro opzioni alla lavagna; segnate i numeri e rifate il conteggio alla fine.
- **Scena 2**: la frase di Benedetto XVI letta a voce; *schola* / *scholḗ* alla lavagna.
- **Scena 3**: quattro foglietti (scuole, città, diritto, traduzioni) attaccati intorno a un cerchio «studenti e maestri»; frecce col gesso.
- **Scena 4**: *unus* + *versus* → *universitas* alla lavagna; la domanda sul 1088 a voce.
- **Scena 5**: tabella Bologna / Parigi a due colonne, compilata con la classe.
- **Scena 6**: drammatizzazione: un «maestro» legge la tesi, uno «studente» l'obiezione, la classe sceglie fra le tre strade scritte alla lavagna; poi i due rami.
- **Scena 7**: fotocopia del passo di Tommaso con le quattro frasi; si sottolinea quella della distinzione.
- **Pausa gioco**: Sfida a squadre a voce, punteggio alla lavagna; chi sbaglia passa la domanda.
- **Scena 9**: l'età stimata per alzata di mano (sotto i 18, 18-25, oltre); le quattro voci dello statuto su foglietti in tre colonne.
- **Scena 10**: tre parole in tre colonne; il caso dell'ospite letto a voce, tre angoli dell'aula.
- **Scena 11**: i sei passaggi su sei foglietti da rimettere in fila; la verifica a voce.

---

## 9. Fonti e verifiche

| Contenuto | Fonte | Stato |
|---|---|---|
| «La ricerca di Dio richiede quindi per intrinseca esigenza una cultura della parola» | Benedetto XVI, discorso al Collège des Bernardins, 12 settembre 2008, vatican.va | Ripresa parola per parola dal fascicolo e dal sorgente del 4 ottobre, che la dichiarano verificata; **non ricontrollata oggi** in rete. |
| Bologna: nationes, universitates, studenti che pagano i maestri, 1088 convenzionale, celebrazioni del 1888, Constitutio Habita 1155 | Università di Bologna, «Nove secoli di storia» e «La nascita dello Studio e del Comune», unibo.it | Dal fascicolo e dal sorgente del 4 ottobre; non ricontrollato oggi. |
| Carducci: «si compose per movimento proprio, sorse e grandeggiò privata» (solo nello Studio) | Discorso del 1888, come riportato nel sorgente del 4 ottobre | Non ricontrollato oggi sull'originale. |
| Parigi: diploma di Filippo Augusto 1200, statuti di Courçon 1215, *Parens scientiarum* 1231 (statuti, sospensione delle lezioni, quindici giorni) | Internet Medieval Sourcebook (Fordham), trad. Univ. of Pennsylvania; Chancellerie des Universités de Paris | Dal sorgente del 4 ottobre, che dichiara il controllo del 3 ottobre; **parafrasi italiana redazionale**, non citazioni. I dati dello statuto 1215 (20 anni, 6 anni di studio, 35 e 8 per la teologia, licenza non comprata, Aristotele, accordi se uno studente è ferito) sono gli stessi del 4 ottobre. |
| Gregorio IX 1231: libri di filosofia naturale «finché non siano esaminati e liberati da ogni sospetto di errore» | Statuti del 1231, Internet Medieval Sourcebook | Parafrasi dal sorgente del 4 ottobre. |
| Tommaso, *Summa theologiae* I, q. 1, a. 8, ad 2; Agostino, Lettera 82, 1, 3 | Corpus Thomisticum (ed. leonina) | Traduzione **redazionale** con tagli, ripresa dal sorgente del 4 ottobre; non ricontrollata oggi sul latino. |
| Sorbona: collegio di Robert de Sorbon, metà del Duecento | Chancellerie des Universités de Paris, «The Sorbonne in the Middle Ages» | Dal fascicolo; non ricontrollato oggi. |
| Traduzioni dal greco e dall'arabo, autori arabi ed ebrei | J. Marenbon, «Medieval Philosophy», SEP, §§ 1.3.2–1.3.3 | Dal fascicolo. |
| Etimologie (21 voci del glossario) | *Vocabolario Treccani* e dizionari etimologici | Riprese dal sorgente del 4 ottobre; non ricontrollate oggi. |
| Caso della testimonianza scritta; caso dell'ospite famoso | — | **Immaginari**, dichiarati sullo schermo («Caso immaginario») e nello Studio. |

Nessuna citazione nuova in questa revisione: tutte le virgolette sono quelle già presenti nel sorgente del 4 ottobre e nel fascicolo.

---

## 10. Collaudo (14 ottobre 2026, seconda stesura)

Playwright con Chromium, artefatto aperto da `file://`. Tutti i numeri sono dell'ultima ricostruzione.

**Collaudo generico** (`collaudo.mjs`): **54 controlli superati, 0 falliti** (TUTTO OK). Struttura: 12 scene, minuti 50, Sfida a squadre con 8 domande, pausa gioco presente, Studio con 10 sezioni e 7 fonti, al massimo 2 blocchi per scena oltre agli agganci, nessun tipo di blocco oltre 2 volte, nessuna parola nuova senza voce di glossario; tutte le scene con «Avanti», senza graffe grezze, console senza errori, nessuna richiesta di rete; Studio e Giochi (5 schede); 360 px senza scorrimento orizzontale in nessuna scena; LIM con `?lim=1` a 1366×768 con il palco dell'animazione dentro la schermata; visore `?in=visore` con testata di una riga (55 px).

**Sonda sulle correzioni** (`lez2-fix-sonda.mjs`): **44 controlli superati, 0 falliti**. Marcature nelle scene: 6 per 5 lemmi (statuto ×2, quaestio, distinzione, autorevolezza, autorità), glossario di testata a 21 voci; i popup di «statuti», «quaestio», «distingue» (voce *distinzione*) e «autorità» si aprono con la voce giusta. Scena 1: lead senza la domanda doppia, dibattito con «confronteremo i voti». Scena 2: nessun paragrafo sotto il lead; il commento della citazione contiene «Per questo monasteri e scuole delle cattedrali coltivano…». Scena 3: lead «non spiegano le università»; fotogramma 3 con diritto romano e canonico in grassetto e senza marcatura; verifica «Perché studenti e maestri si raccolgono a Bologna?» con il perché. Scena 4: lead di una frase, *nationes* in corsivo senza marcature, perché del 1088 senza Carducci. Scena 5: marcato solo «statuti». Scena 6: testo di lancio breve con «distingue» visibile; battuta della mascotte presente al passo 2 e assente al passo 4; Respondeo al passo 5. Scena 7: «un autore antico, Boezio»; «autorevolezza» marcata nella glossa di Agostino. Scena 8: ordine dei blocchi gioco → mascotte; «Si gioca» apre la Sfida; «← Torna alla lezione · scena 8» riporta alla scena 8. Scena 9: lead di una frase; testo con il nesso 1215/1231 e le parole spiegate in riga; marcato solo «statuti»; smista 4/4 con il perché della voce su Aristotele («un divieto dice che cosa si prescrive, non che tutti lo rispettassero») e chiusura a due frasi. Scene 10 e 11: lead di una frase, «i sei passaggi di oggi». Studio: download identico al `.testo.txt` (11 817 byte). Console senza errori. 360 px: passo 4 della Disputa senza fumetto sopra «La risposta del maestro»; scena 8 senza scorrimento orizzontale.

**Sonda LIM a 1366×768** (`lez2-fix-lim.mjs`): **12 controlli superati, 1 fallito**, voluto e spiegato. Scena 3: palco 450..678 (barra a 689), didascalia e comandi a destra, «Fotogramma successivo» a 588 px: tutto nella prima schermata senza scorrere. Scena 6: la Disputa è alta 258 px al passo 1, 339 al passo 2, 523 al passo 3, 581 dopo la scelta (perché a 554..612 e «Mostra la distinzione» a 635..699, barra a 689), 514 al passo 4 e **642 al passo 5** (unico sopra i 590 richiesti: il Respondeo è in vista a 547..675, sotto la barra resta il solo «Rifate la disputa», facoltativo). Scena 8: «Si gioca» a 505..576. Console senza errori. Nota di regia: il browser ancora lo scorrimento al pulsante premuto; se lo si preme quando è in fondo allo schermo, il contenuto inserito sopra può salire sotto la testata: basta uno scorrimento breve, perché il componente intero sta in una schermata nei passi da 1 a 4.

**Script completo del revisore** (`lez2-rev.mjs`, 203 controlli, rilanciato sul nuovo artefatto con i due testi attesi aggiornati): **196 superati, 7 falliti**, tutti previsti: tre parole della scena 4 non più marcate per scelta («data convenzionale», «nationes», «corporazioni»); la frase sullo statuto che «prescrive» cercata nella chiusura dello smista (ora è nel perché della voce su Aristotele); il suo controllo di fine Sfida (falso positivo del suo regex, come nella sua stessa esecuzione); il puntino «Scena 12» fuori finestra a 360 px (barra del kit, non della lezione); la Disputa in LIM nel suo flusso (k2 −101, k3-ok −30, k5 −82 px sotto la barra: effetto dell'ancoraggio dello scorrimento, con il componente ridotto da 643/1173/1058 px a 339/581/642). Il resto del suo percorso (tutte le scene con Avanti, frecce, Indietro; ogni blocco con risposte sbagliate e giuste; Sfida intera con ritorno; sandbox del sito; tema chiaro; sola tastiera; 360 px; visore) passa.

**Schermate guardate** (Read sul PNG): LIM scena 2, 3 (apertura e fotogramma 5), 6 (passi 2, 3 dopo la scelta, 4, 5), 8, 9; desktop scene 1, 2, 4, 9, 12; 360 px scene 3, 6 (passo 4), 8, 9. Nessun testo tagliato, nessun pulsante coperto.

---

## 11. Che cosa è cambiato il 14 ottobre 2026 e perché

**La richiesta.** Le lezioni del terzo anno «passano di palo in frasca». Questa lezione era già nello stile della lezione-modello e la sua catena era chiara (la scena finale la ricapitola bene), ma alcune scene partivano da zero: Bologna (scena 4) e Parigi (scena 5) cominciavano con un paragrafo senza dire perché dalla convergenza dei fattori si passava alle corporazioni; la Disputa (scena 6) saltava da Parigi al metodo; gli statuti (scena 9) arrivavano dopo la pausa senza riprendere il filo di Tommaso. La scena 9 era anche troppo piena (stima, due smista e un aggancio in sei minuti).

**La soluzione: ogni scena comincia da dove finisce la precedente.** Il lead di ogni scena è ora un ponte che riprende la conclusione della scena prima e pone la domanda della nuova: «Le scuole da sole non spiegano le università: che cosa cambia fra XI e XIII secolo?»; «Quando molti studenti arrivano in una città servono organizzazione e tutele: a Bologna se le danno gli studenti»; «A Bologna si sono associati gli studenti. A Parigi la stessa domanda riceve un'altra risposta»; «Una comunità di studio, comunque sia organizzata, deve decidere anche come si impara»; «Il caso era immaginario. Tommaso… fa la stessa mossa in un testo vero»; «Per Tommaso l'autorità di un uomo vale quanto le sue ragioni… per questo gli statuti fissano chi può insegnare»; «Requisiti, tutele e limiti dicono chi ha l'autorità di insegnare, non ancora quando fidarsi». Anche la domanda finale del confronto Bologna/Parigi e il testo della scena 6 e 7 ora «lanciano» la scena successiva («ma in entrambe una comunità deve decidere anche come si impara»; «provatelo su un caso»; «cercate la frase in cui Tommaso distingue»).

**Che cosa è stato alleggerito o spostato nella prima stesura** (nulla è uscito dalla lezione: tutto resta nello Studio e nei giochi):
- scena 9: tolto il secondo smista («Lo dice lo statuto, o servirebbe un'altra fonte?»), una digressione di metodo; la sua idea resta nello smista (nella seconda stesura, nel perché della voce su Aristotele), nel quiz di ripasso e in una nuova frase del Vero o falso; la scena passa da 6 a 5 minuti;
- scena 2: il testo sotto il lead era stato ridotto a una frase (nella seconda stesura è stato tolto del tutto: vedi sotto); la scena passa da 3 a 4 minuti, così la somma resta 50;
- scena 3: titolo più breve («Le città chiedono competenze») e lead di una riga, anche perché in LIM l'animazione deve stare nella prima schermata;
- scena 4: le parole comuni *studenti* e *maestri* non sono più sottolineate come parole nuove (restano nel glossario per lo Studio);
- scena 8: il lead della Sfida riprende il percorso e anticipa la scena dopo (nella seconda stesura è di una riga: «Dalle scuole alla disputa: otto domande, poi chi autorizza il maestro»);
- Studio: stesse sezioni e stessi contenuti, con quattro frasi di raccordo in più all'inizio delle sezioni su Parigi, Tommaso, gli statuti e l'autorevolezza, allineate ai lead delle scene.

**Che cosa non è cambiato**: grafica e kit, codice del componente «Disputa», animazione, confronto, lettura di Tommaso, le tre varianti del laboratorio, ordina, sondaggi, glossario (21 voci), citazioni (nessuna nuova), Sfida a squadre e giochi di ripasso (salvo la frase aggiunta al Vero o falso e il perché del quiz 5, che ora elenca «registri, lettere, cronache, processi»), nome del file pubblicato.

**Seconda stesura, lo stesso giorno, dopo la revisione di due lettori.** I lettori hanno confermato che la lezione non salta più di palo in frasca (undici passaggi fra scene, tutti con un connettivo), ma hanno trovato densità e ripetizioni. Che cosa è cambiato, scena per scena:
- scena 1: il lead non termina più con la domanda che il sondaggio ripete subito sotto; «Teniamo i voti» è passato in queste note (è un'indicazione di regia); il dibattito dice che alla fine «confronteremo i voti»;
- scena 2: tolto il paragrafo sotto il lead (lead, testo e commento dicevano tre volte la stessa idea, e la regola arrivava prima della fonte); la conseguenza «per questo monasteri e scuole delle cattedrali coltivano lingua, lettura e biblioteche» sta ora nel commento della citazione, dopo la fonte;
- scena 3: lead con l'oggetto («Le scuole da sole non spiegano le università»); nella didascalia diritto romano e canonico in grassetto come gli altri fattori; la verifica chiede «perché studenti e maestri si raccolgono a Bologna?» (nei fotogrammi non c'è «da tutta Europa»);
- scena 4: lead di una frase; il perché della verifica sul 1088 non cita più Carducci (dato erudito: resta nello Studio e nella linea del tempo);
- scena 6: il testo non definisce più cinque termini prima del caso (contro «prima il caso, poi la parola»): dà il nome del metodo, *scolastica*, e rimanda alle mosse scritte in alto nel componente; marcate solo *quaestio* e *distingue*; tolta la battuta della mascotte al passo 4 («Né zittire né cedere»), che sul telefono copriva per quattro secondi l'etichetta del pulsante ed era già nell'esito della scelta C;
- scena 7: «un'obiezione cita un autore antico, Boezio»;
- scena 8: prima il blocco «Si gioca», poi l'indizio della mascotte; lead e testo del blocco di una riga, così in LIM il pulsante è in vista senza scorrere;
- scena 9: lead di una frase; il testo lega i due dati della lezione («prima che i maestri possano darsene di propri (1231), a Parigi li promulga nel 1215 Robert de Courçon, legato pontificio (l'inviato del papa)») e spiega in riga «le arti, le discipline di base come grammatica e logica»; la chiusura dello smista tiene due frasi (stesso testo; 1231) e la frase «un divieto dice che cosa si prescrive, non che tutti lo rispettassero» sta nel perché della voce su Aristotele, dove è pertinente;
- scena 10 e 11: lead di una frase («…non ancora quando fidarsi di ciò che insegna»; «i sei passaggi di oggi» invece di «sei passaggi, uno per scena», perché gli anelli sono sei e le scene dodici);
- parole marcate: da 17 lemmi a 5 (statuto, quaestio, distinzione, autorevolezza, autorità; università nell'etimo), secondo il criterio «2–4 per lezione»; le altre restano nel glossario di testata per lo Studio e sullo schermo sono in corsivo, in grassetto o spiegate in riga;
- note: la mappa dell'essenziale non rimanda più a una voce del Vero o falso che non esiste; il commento di testa del CSS elenca ciò che il file contiene davvero.

**Kit attuale e LIM.** L'artefatto è ricostruito con il kit definitivo del 5 ottobre: modalità visore per il sito (`?in=visore`, testata di una riga) e correzione della LIM per le animazioni. Il CSS della lezione aggiunge regole valide **solo in LIM** (disegno normale e 360 px invariati):
- scena 3: il blocco dell'animazione diventa a due colonne, palco a sinistra (alto quanto lo spazio che resta sotto titolo e lead, largo secondo il suo rapporto) e didascalia e comandi a destra; prima il palco a tutta larghezza stava sopra la barra ma «Avvia l'animazione» finiva 165 px sotto, e il docente doveva scorrere prima del primo clic; ora palco, didascalia e comandi stanno nella prima schermata a 1366×768 («→» a 588 px, barra a 689);
- scena 6: la Disputa superava i 594 px utili in ogni passo dopo il primo (fino a 1173 px): tesi, obiezione e tre strade non stavano mai insieme e, dopo la scelta, il perché e il pulsante finivano sotto la barra. Ora il componente è scalato di 0,9 solo in LIM (scala effettiva 1,456 invece di 1,618: i testi restano fra 21 e 28 px sullo schermo), con spazi e schede più compatti, tre strade affiancate, tesi e obiezione in colonne uguali. Misure a 1366×768: 258, 339, 523, 581 (dopo la scelta), 514 e 642 px nei passi da 1 a 5; sotto la barra resta solo, al passo 5, il pulsante facoltativo «Rifate la disputa»;
- scena 8: nessuna regola CSS; basta l'ordine dei blocchi e il lead di una riga («Si gioca» a 505 px).

**Risultato**: 12 scene, 50 minuti esatti, tre agganci, un solo strumento principale per scena, un lead-ponte di una frase su ogni scena, cinque parole marcate, e una storia che chi guarda la LIM può ripetere alla fine con le parole della lezione: cercare Dio chiede di imparare; le città chiedono competenze; studenti e maestri si associano; la comunità decide come si impara; gli statuti dicono chi può insegnare; l'autorità diventa autorevolezza quando porta ragioni.
