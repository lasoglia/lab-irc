# Credo, non credo, non so — note del docente

Classe I · UDA 1 «L’uomo che cerca oltre: il senso religioso» · Lezione 1 · artefatto interattivo · 7 ottobre 2026
Sorgente: `sorgenti-lezioni/i-1-1-credo-non-credo-non-so.js` · Artefatto: `uploads/i-1-1-credo-non-credo-non-so-artefatto.html` (stesso nome di prima, il sito lo collega così) · Testo di studio: `sorgenti-lezioni/i-1-1-credo-non-credo-non-so.testo.txt` · Fascicolo (invariato): `uploads/i-1-1-credo-non-credo-non-so-fascicolo.pdf`

Assemblaggio:

```bash
python3 -I design-system/assets/artefatti/skill-lezione/scripts/build_artefatto.py \
  sorgenti-lezioni/i-1-1-credo-non-credo-non-so.js -o uploads/i-1-1-credo-non-credo-non-so-artefatto.html --anno 1 \
  --titolo "Credo, non credo, non so" \
  --descrizione "Teismo, ateismo, agnosticismo e indifferenza: tre risposte precise a una domanda diretta"
node design-system/assets/artefatti/skill-lezione/scripts/esporta_testo.js \
  sorgenti-lezioni/i-1-1-credo-non-credo-non-so.js sorgenti-lezioni/i-1-1-credo-non-credo-non-so.testo.txt
```

Il CSS del componente proprio è dentro il sorgente (non serve `--css`).

## 1. Scheda della lezione

- **Titolo e identificativo:** «Credo, non credo, non so» · I 1-1.
- **Classe / età:** prima superiore, 14–15 anni.
- **UDA e posizione:** prima lezione dell’UDA «L’uomo che cerca oltre: il senso religioso», dopo l’accoglienza «Il nome e la domanda» (da cui riprende la distinzione fatto / interpretazione / giudizio). La segue «Segni e simboli» («Più di una cosa»), già rifatta: questa lezione non ne anticipa i contenuti e chiude con un rimando chiuso («Come se ne parla?»).
- **Domanda della lezione:** alla domanda «Dio esiste?» quali risposte sono possibili, come si chiamano, e come si discute fra chi risponde in modo diverso?
- **Risposta in una frase:** le risposte sono tre più un silenzio (teismo, ateismo, agnosticismo; indifferenza), ognuna con un nome preciso; le persone si rispettano tutte, le tesi si discutono perché non possono essere vere tutte insieme.
- **Obiettivo osservabile:** lo studente distingue un agnostico da un indifferente in un caso nuovo; spiega perché «Dio esiste» e «Dio non esiste» non possono essere vere insieme (principio di non contraddizione) e perché questo non contraddice il rispetto; riconosce che Tommaso riporta per primo l’obiezione del male. Criterio: almeno 2 su 3 nella prova finale; nella scena 8 la classe decide correttamente almeno 4 coppie su 5.
- **Fraintendimenti da smontare:** agnostico = disinteressato (il più probabile: scena 3, `verifica` con esito motivato, e Sfida); ateo = senza valori; credente = senza dubbi; rispetto = «tutto è ugualmente vero»; fede = sentimento contrario alla ragione.
- **Catena (nessi espliciti):**
  1. Alla domanda «Dio esiste?» ciascuno ha già una risposta (esistenziale).
  2. **Ma** le risposte non sono infinite: una domanda sì/no produce sì, no, «non si può sapere», più una non-risposta; ognuna ha un nome (teismo, ateismo, agnosticismo, indifferenza; e l’ateismo pratico, che riguarda la vita) (logico).
  3. **Per questo** le parole vanno usate con precisione: tre equivoci e il salto dal fatto al giudizio (logico).
  4. **Quindi** discutere senza caricature significa conoscere l’argomento migliore di ciascuno: il male, perché c’è qualcosa, i limiti della ragione; Tommaso comincia dando la parola all’ateo (testuale).
  5. **Eppure** rispetto non vuol dire «tutto uguale»: tesi opposte non possono essere vere insieme; le persone sì, tutte rispettate (logico).
  6. **Per questo** la Chiesa propone (non impone) una fede ragionevole: Dio conoscibile con la ragione (CCC 36), fede e ragione «due ali», autocritica sull’ateismo (GS 19), dialogo (GS 21, DH 1) (logico-teologico).
- **Impronta:** la distinzione fra rispetto delle persone e discussione delle tesi, e la tradizione cristiana (Tommaso) di presentare l’obiezione nella sua forma più forte prima di rispondere.
- **Prova finale:** `quiz` di 3 casi nuovi + sondaggio d’uscita con `confronta: 'ingresso'`.

## 2. Mappa dell’essenziale (fascicolo → scena)

| Contenuto del fascicolo | Scena | Studio |
|---|---|---|
| Domanda e scopo: discutere senza caricature | 1 (sondaggio, nuvola), 2 (lead) | La domanda |
| A · Tre risposte e un silenzio (struttura) | 2 animazione | Tre risposte e un silenzio |
| A.1 Teismo, Dio «personale» | 2, 3 spettro; glossario «personale» | sì |
| A.2 Ateismo, *á-theos*, ateismo teorico | 2, 3 spettro; glossario | sì |
| A.3 Agnosticismo, Huxley (1889, Metaphysical Society 1869), *ágnōstos*, Protagora, CCC 2127 | 3 spettro + aggancio «Per capire»; Sfida 4 | sì |
| A.4 Indifferenza e ateismo pratico | 2 (fotogrammi 4–5), 3 | sì |
| B · Equivoco agnostico/disinteressato | 3 `verifica` Marta; Sfida 3, 5; prova 1 | Tre equivoci |
| B · Ateo ≠ senza valori; credente ≠ senza dubbi (Giobbe, Salmi) | 4 `dubbi`; glossario «credere» | sì |
| B · Fatto / interpretazione / giudizio (caso Luca) | 4 `verifica` Luca; Sfida 8 | sì |
| C.1 Il male, Lattanzio/Epicuro, Tommaso ob. 1 e ad 1 | 6 `leggi` + aggancio «Con onestà»; 7 carta | Prendere sul serio l’altro |
| C.2 Perché c’è qualcosa, cinque vie, ob. 2 / ad 2 | 7 carta | sì |
| C.3 Limiti della ragione | 7 carta; aggancio finale (ponte a «Segni e simboli») | sì |
| D · Rispetto ≠ tutto uguale, non contraddizione, DH 1 | 8 VeroInsieme; 9 catena (anello 4); prova 2; uscita | Rispetto non vuol dire «tutto uguale» |
| E · CCC 36, Fides et ratio, GS 19 e 21 | 9 catena; prova 3 | La proposta cattolica |
| In sintesi, F · Domande, G · Conclusione | 10; Studio | In sintesi, Per lo studio, La risposta |

Parole del glossario (16 voci, con quelle dello spettro): teismo, ateismo, agnosticismo, indifferenza, ateismo pratico, personale, credere, sospendere il giudizio, obiezione, principio di non contraddizione, rispetto, ragione; teista, agnostico, ateo, indifferente (dallo spettro).

## 3. Regia degli strumenti

| Anello | Che cosa deve capire la classe | Perché è difficile | Tipo | Strumento | Alternativa |
|---|---|---|---|---|---|
| 1 Domanda | Tutti hanno già una risposta; le risposte si raccolgono senza esporsi | Tema personale | Posizione personale | `domanda` d’ingresso (sull’idea «ognuno ha la sua verità») + `nuvola` in terza persona | mani alzate a voce |
| 2 Tre risposte e un silenzio | La struttura: una domanda sì/no → 3 risposte + 1 non-risposta; l’ateismo pratico sta su un altro piano | Si mettono tutte sullo stesso piano | Processo / struttura | **`animazione`** a 5 fotogrammi | `mappa` (versione precedente) |
| Nomi ed etimologie | *theós*, *a-*, *ágnōstos*, *in-differens* | Parole simili | Etimologia + distinzione | `spettro` con etimologie | `parola` ×4 (versione precedente, ridondante) |
| 3 Equivoco più probabile | Agnostico ≠ indifferente | Nel parlato si confondono | Equivoco — **decide la classe** | `verifica` (caso Marta) con esito motivato | `smista` |
| 3 Altri equivoci + tre piani | Ateo ≠ senza valori; credente ≠ senza dubbi; fatto/interpretazione/giudizio | Pregiudizi | Obiezioni con risposta | `dubbi` + `verifica` (caso Luca) | `rivela` |
| Pausa a metà | Fissare nomi, parole, equivoci | Molte parole nuove in 14′ | Cambio di ritmo | **pausa gioco: Sfida a squadre** + `rivela` di restituzione | `vf` |
| 4 Fonte principale | Tommaso apre con l’obiezione e risponde con Agostino | Testo medievale, argomento logico | Lettura di una fonte | **`leggi`** «trova la frase» (3 candidate) + `aggancio` «Con onestà» | `citazione` |
| 4 Argomento migliore di ciascuno | Tre argomenti seri | Si conosce solo il proprio | Distinzione | `carte` + `mascotte` (domanda orale) | `bilancia` (scartata: tre posizioni, non due piatti) |
| **5 Rispetto ≠ tutto uguale** (concetto più difficile) | Le tesi opposte si escludono; persone e tesi stanno su piani diversi | «Ognuno ha la sua verità» sembra rispettoso; logica astratta | Distinzione fra concetti vicini + decisione | **componente proprio `VeroInsieme`** | `custom` Compatibili (versione precedente), `smista` |
| 6 Proposta cattolica | Teista, ragionevole, autocritica, dialogica | Si pensa che la Chiesa chieda di «non pensare» | Nesso logico-teologico | `catena` con «Togli un anello» | `citazione` + commento |
| Chiusura | Prova su casi nuovi; cambio di idea | — | Prova + opinione | `quiz` (3) + `domanda` d’uscita `confronta` + `aggancio` alla lezione 2 | mani alzate |

**Perché un componente proprio per il concetto più difficile.** La regola «le tesi si escludono, le persone si rispettano» è astratta. `VeroInsieme` la fa vedere: due tessere con due frasi; la classe decide prima («possono stare insieme» / «si escludono»), poi le tessere si saldano (✓ verde) o si respingono (✕ rosso), con il perché. Le frasi che riguardano una persona hanno il bordo tratteggiato, quelle che sono tesi il bordo pieno: il piano diverso si vede. L’ultima coppia («Rispetto chi la pensa diversamente» / «Penso che abbia torto») è il punto d’arrivo. Il quadro finale separa «Le persone» e «Le tesi». Nessun blocco del kit mostrava insieme decisione, esito motivato e cambio di piano.

Elementi interattivi del componente e feedback: due scelte `la-choice` (hover bordo oro e spostamento, active 0,97, focus oro; esito verde/rosso sempre con la parola «Esatto» / «Non proprio»); «Prossima coppia» / «Vedi il quadro» (`ll-btn`); «Riprova» e «Ricomincia» (`ll-link`); tessere animate in 610 ms con la curva del kit, senza movimento con `prefers-reduced-motion`. Stato solo in memoria (oggetto `MEM`): tornando alla scena il componente riprende da dove era; ricaricando la pagina riparte. Nulla viene salvato.

Tipi interattivi usati: `domanda` ×2 (ingresso/uscita), `verifica` ×2, ogni altro tipo ×1. Strumenti che mostrano: animazione, spettro, catena, VeroInsieme. Punti in cui decide la classe: verifiche, leggi (trova), VeroInsieme, quiz, Sfida.

## 4. Piano minuto per minuto (50′)

| # | Minuti | Fase · momento | Scena | Strumento |
|---|---|---|---|---|
| 1 | 0–4 (4′) | Aggancio · Apertura | Credo, non credo, *non so* (mascotte) | `domanda` d’ingresso + `nuvola` |
| 2 | 4–9 (5′) | Scoperta · Spiegazione | Tre risposte e *un silenzio* | `animazione` 5 fotogrammi |
| 3 | 9–14 (5′) | Scoperta · Le parole | Che cosa c’è *nel nome* | `spettro` + `verifica` Marta + aggancio Protagora |
| 4 | 14–19 (5′) | Scoperta · Spiegazione | Che cosa *non* dicono | `dubbi` + `verifica` Luca |
| 5 | 19–26 (7′) | Attività · **Pausa gioco** | Sfida *a squadre* | `gioco: sfida` (8 domande) + `rivela` |
| 6 | 26–32 (6′) | Scoperta · Fonte | Un teologo dà la parola *all’ateo* | `leggi` Tommaso + aggancio «Con onestà» |
| 7 | 32–36 (4′) | Scoperta · Spiegazione | L’argomento *migliore* di ciascuno | `carte` + `mascotte` |
| 8 | 36–42 (6′) | Scoperta · Applicazione | Rispetto non vuol dire *tutto uguale* | `custom` VeroInsieme |
| 9 | 42–46 (4′) | Scoperta · Fonte | Fede e *ragione* | `catena` (4 anelli) |
| 10 | 46–50 (4′) | Chiusura · Prova e ritorno | Ognuno ha *la sua* verità? (mascotte) | `quiz` 3 + `domanda` d’uscita + aggancio «Prossima lezione» |

Somma: 4+5+5+5+7+6+4+6+4+4 = **50**. Barra delle fasi: Aggancio 4′ · Scoperta 15′ · Attività 7′ · Scoperta 20′ · Chiusura 4′. La classe agisce in ogni scena: nessun tratto di solo ascolto oltre ~5′.

**Pausa gioco a metà** (min 19–26), dopo il primo nucleo denso (14 parole e distinzioni nuove), prima della fonte. Le 8 domande della Sfida riguardano solo le scene 1–4. Gli altri giochi (Quiz, Vero o falso, Memory, Abbinamenti, Categorie, Riflessione) sono per il ripasso o per l’anticipo, fuori dai 50 minuti.

## 5. Piano di regia

**In ritardo:**
- scena 1: saltare la nuvola, tenere solo il sondaggio (−2′);
- scena 3: aprire nello spettro solo agnostico e indifferente, lasciare chiuso l’aggancio su Protagora (−1′);
- scena 5: Sfida sulle prime 5 domande, una sola domanda di restituzione (−2′);
- scena 7: girare solo la carta del teista (le altre due sono già emerse) e saltare la domanda della mascotte (−2′);
- scena 9: mostrare la catena con «Riproduci tutto» senza «Togli un anello» (−1′).

**In anticipo:**
- in modalità Giochi: «Vero o falso» (8 affermazioni) o «Categorie» (chi potrebbe dirlo?);
- dibattito alla scena 8: «Trovate voi una coppia di frasi che sembrano escludersi ma possono stare insieme»;
- domanda 4 del fascicolo (quale argomento è più forte, anche se non è il vostro) a coppie, a voce;
- «Riflessione» (gioco `rifl`): ognuno si colloca da solo sullo schermo, a fine ora, senza condividere (la frase resta solo in memoria e sparisce).

## 6. Traccia orale per scena

1. «Oggi una domanda diretta, ma nessuno deve dire che cosa crede.» Sondaggio sulla frase «Su Dio ognuno ha la sua verità»: contare le mani, mostrare i risultati senza commentare («li riguardiamo alla fine»). Poi la nuvola: «Che cosa rispondono le persone che conoscete?» Scrivere le risposte (sì, no, boh, dipende, non lo so, non mi interessa…).
2. «Le risposte della nuvola sembrano tante. Guardiamo la domanda: ammette un sì o un no.» Un fotogramma alla volta: 1 la domanda; 2 tre risposte (riprendere le parole della nuvola e collocarle); 3 i nomi; 4 l’indifferenza esce dal sistema: non è una risposta; 5 l’ateismo pratico: «riguarda come si vive; può riguardare anche chi va in chiesa».
3. Toccare i quattro punti dello spettro e leggere le etimologie: «teista e ateo usano la stessa parola, cambia una lettera davanti». Su «agnostico»: Huxley la inventa contro gli «gnostici», che dicevano di sapere tutto. Poi la verifica su Marta: far votare, poi leggere il perché. Se c’è tempo, aprire l’aggancio su Protagora.
4. Aprire i due dubbi (si apre uno alla volta). Su «credente senza dubbi» leggere Sal 22,2. Poi il caso Luca: «Luca dice di essere ateo» è un fatto; che cos’è la seconda frase? Ricordare lo strumento dell’accoglienza: fatto, interpretazione, giudizio.
5. Due squadre (nomi collettivi: nessun nome di studente). Regola: 20″; chi sbaglia lascia la domanda all’altra squadra, che può rubare in 10″. «Torna alla lezione» riporta qui; restituzione con le due domande del `rivela`.
6. «Un grande teologo, scrivendo dell’esistenza di Dio, comincia dando la parola all’ateo.» Leggere ad alta voce tutto il testo, poi far cercare la frase in cui Tommaso risponde. Toccare anche le altre due frasi: perché non sono la risposta. Aprire l’aggancio: la risposta non chiude il problema.
7. Far girare le tre carte a tre studenti diversi. Domanda della mascotte a voce: due interventi, ciascuno con una ragione. Non si commenta chi ha ragione.
8. «Ora decidete voi.» Per ogni coppia: votare a mani alzate «stanno insieme / si escludono», poi toccare la scelta della maggioranza. Insistere sul bordo tratteggiato (persona) e pieno (tesi). L’ultima coppia è il punto della lezione. «Vedi il quadro»: leggere le due righe.
9. Agganciare gli anelli uno alla volta, leggendo le citazioni. Poi «Togli un anello»: togliere il terzo (l’autocritica di GS 19) e chiedere che cosa cambia. Chiudere con «Si propone, non si impone».
10. Quiz di tre casi (votare, poi toccare). Sondaggio d’uscita sulla stessa frase dell’inizio: il tratteggio d’oro mostra il voto d’ingresso. Leggere la risposta di oggi. Aprire l’aggancio «Prossima lezione»: «Dio non è un oggetto fra gli oggetti: come ne parlano allora gli uomini? La prossima volta.»

## 7. Soluzioni

- **Scena 3, Marta:** B, indifferente. Non afferma, non nega, non sospende il giudizio dopo averci pensato: non se lo chiede.
- **Scena 4, Luca:** C, giudizio (infondato). Un’interpretazione sarebbe «non crede perché è arrabbiato con la vita» (da verificare chiedendo a lui).
- **Scena 6, Tommaso:** la frase giusta è «non permetterebbe alcun male nelle sue opere, se non fosse così onnipotente e buono da trarre il bene anche dal male» (ad 1, citando Agostino). «Sembra che Dio non esista» è l’apertura dell’obiezione; «Se dunque Dio esistesse, non si troverebbe alcun male» è il cuore dell’obiezione.
- **Scena 8, VeroInsieme:** 1 si escludono; 2 stanno insieme (Dio / nostra conoscenza); 3 stanno insieme (tesi / persona); 4 si escludono («tutto è vero» implica anche «Dio esiste»); 5 stanno insieme (rispetto ≠ dare ragione).
- **Scena 9, catena:** senza l’anello 1 la fede diventa sentimento; senza il 2 fede e ragione sono nemiche; senza il 3 l’ateismo è «colpa degli altri»; il 4 è la conseguenza.
- **Prova finale:** 1 C agnostico; 2 B stanno insieme; 3 A si può conoscere con la ragione.
- **Sfida a squadre (8):** 1 C teista; 2 A senza dio; 3 B agnostico; 4 D Huxley; 5 C mette da parte la domanda; 6 A come si vive; 7 B qualcuno e non qualcosa; 8 C interpretazione da verificare. Restituzione: quale domanda ha diviso le squadre e perché; che cosa ha fatto l’agnostico che l’indifferente non ha fatto (si è posto la domanda).
- **Giochi di ripasso:** Categorie (teista: preghiera, Creatore; ateo: invenzione umana, mondo senza Dio; agnostico: mancano prove, non lo sapremo; indifferente: non mi riguarda, altro a cui pensare); Vero o falso: F, V, F, V, F, V, F, F; Quiz: B, C, A, D, B.

## 8. Varianti senza proiettore

- Scena 1: sondaggio a mani alzate con i numeri alla lavagna; nuvola scritta alla lavagna.
- Scena 2: disegnare alla lavagna la domanda con tre frecce (sì / non si può sapere / no) e, a parte, «non mi interessa» fuori dallo schema; poi «ateismo pratico» su un riquadro che attraversa.
- Scena 3–4: leggere i casi di Marta e Luca a voce, tre dita alzate per le opzioni.
- Sfida: due squadre a voce, il docente legge domanda e opzioni dalle Soluzioni; punti alla lavagna (100 la giusta, 50 la rubata).
- Scena 6: fotocopia del testo di Tommaso (dal fascicolo, sezione C.1) e sottolineatura a coppie.
- Scena 8: scrivere le cinque coppie alla lavagna; voto per alzata di mano; due colonne «Persone» / «Tesi».
- Scena 10: le tre domande della prova dettate; sondaggio d’uscita a mani alzate accanto ai numeri dell’inizio.

## 9. Fonti e limiti

- Fascicolo della lezione (`uploads/i-1-1-credo-non-credo-non-so-fascicolo.pdf`, 5 pagine, letto il 7 ottobre 2026): base dei contenuti e delle citazioni; la lezione non se ne discosta.
- Tommaso d’Aquino, *Summa theologiae* I, q. 2, a. 3, ob. 1 e ad 1 (anche ob. 2 / ad 2 per la carta del teista). La traduzione della scena 6 è dal latino, a cura dell’autore; le frasi coincidono con quelle del fascicolo, completate con la premessa del «bene infinito» (*si unum contrariorum fuerit infinitum…*). **Da riscontrare** sul testo latino di corpusthomisticum.org/sth1002.html: in questa sessione la rete non permetteva l’accesso.
- Agostino, *Enchiridion* 11 (citato da Tommaso).
- Lattanzio, *De ira Dei* 13: l’attribuzione dell’obiezione a Epicuro è di Lattanzio (gli studiosi ne discutono): per questo il testo dice «la riferisce attribuendola».
- *Catechismo della Chiesa Cattolica* 36 (citato fra virgolette solo nella parte «può essere conosciuto con certezza con il lume naturale della ragione umana»; «a partire dalle cose create» in forma indiretta) e 2127 (come nel fascicolo).
- Giovanni Paolo II, *Fides et ratio*, incipit (testo noto, citato come nel fascicolo).
- Concilio Vaticano II, *Gaudium et spes* 19 («nella genesi dell’ateismo possono contribuire non poco i credenti») e 21; *Dignitatis humanae* 1. **Nota:** il fascicolo cita DH 1 fra virgolette («La verità non si impone che per la forza della verità stessa…»). Non ho potuto riscontrare il testo su vatican.va (accesso bloccato dalla rete) e una ricerca indica che circolano formulazioni italiane leggermente diverse; per prudenza artefatto e Studio lo riportano **in forma indiretta**. Se il docente verifica la frase esatta su vatican.va, può rimettere le virgolette.
- T. H. Huxley, *Agnosticism* (1889), *Collected Essays* V: la parola è coniata negli anni della Metaphysical Society (fondata nel 1869), in contrapposizione agli «gnostici». Il contrasto con «gnostico» è dichiarato da Huxley stesso nel saggio (non riscontrato online in questa sessione).
- Protagora, fr. DK 80 B4 (Diogene Laerzio IX, 51): in forma indiretta, come nel fascicolo.
- Aristotele, *Metafisica* IV (Γ) 3, per il principio di non contraddizione (citato senza virgolette).
- Salmo 22,2, Bibbia CEI 2008: «Dio mio, Dio mio, perché mi hai abbandonato?» (testo noto; da riscontrare su bibbiaedu.it se si vuole la conferma formale).
- Etimologie: Vocabolario Treccani (teismo, ateo, agnostico, indifferente, credere, obiezione, rispetto, ragione). Per *credere* l’origine indoeuropea («porre il cuore», cfr. sanscrito *śraddhā*) è dichiarata come ipotesi diffusa, non certa.
- **Rete:** vatican.va, corpusthomisticum.org e documentacatholicaomnia.eu erano bloccati dal proxy di questa sessione: nessuna citazione è stata riscontrata online oggi. Le citazioni fra virgolette sono quelle del fascicolo (già pubblicato) e testi molto noti; i punti dubbi sono passati al discorso indiretto.

## 10. Che cosa è cambiato rispetto alla versione precedente

**Mantenuto:** titolo, sottotitolo, catena del fascicolo; le quattro posizioni con le etimologie; i tre equivoci; i tre argomenti (male, perché c’è qualcosa, limiti della ragione); l’idea del componente sulle frasi compatibili (ora `VeroInsieme`); Fides et ratio e Gaudium et spes; i giochi Categorie, Vero o falso, Abbinamenti, Memory, Quiz, Riflessione (rivisti).

**Cambiato:**
- struttura a 10 scene con fasi e minuti (50′ esatti), cronometro e piano di regia; la versione precedente non aveva minuti né fasi;
- **Sfida a squadre** aggiunta come pausa gioco (prima mancava, e mancavano i dati `giochi.sfida`);
- glossario con etimologie (16 voci) e parole cliccabili nel testo; prima non c’era;
- sondaggio d’apertura non più «Secondo te, Dio esiste?» per alzata di mano (esponeva le convinzioni di ciascuno davanti alla classe), ma una domanda sull’idea «ognuno ha la sua verità», ripresa in uscita con `confronta`; le risposte su Dio si raccolgono in terza persona nella nuvola;
- animazione della struttura «tre risposte e un silenzio» al posto della mappa statica;
- **lettura vera della fonte principale**: Tommaso, ob. 1 e risposta, con «trova la frase» (prima la fonte era solo riassunta in una carta);
- aggiunti i contenuti del fascicolo che mancavano: Protagora, CCC 2127 (nello Studio), caso Luca (fatto/interpretazione/giudizio), risposta di Tommaso con Agostino, ob. 2 / ad 2, CCC 36, GS 19 testuale, DH 1, principio di non contraddizione;
- tolti i quattro blocchi `parola` ridondanti (Agnostico compariva due volte) e il blocco `smista` sostituito da spettro + verifica + Sfida;
- chiusura con prova di 3 casi nuovi, ritorno alla domanda e rimando alla lezione «Segni e simboli»;
- Studio riscritto in prosa continua sul fascicolo, con fonti.

**Corretto (errori o imprecisioni della versione precedente):**
- «Il termine fu coniato nel 1869» era dato come fatto preciso: Huxley stesso (1889) lo colloca negli anni della Metaphysical Society, fondata nel 1869. Ora: «intorno al 1869», come nel fascicolo;
- la mappa definiva l’indifferenza confondendola con l’ateismo pratico («chi vive come se Dio non ci fosse pratica un ateismo pratico»): il fascicolo li distingue (l’ateismo pratico può riguardare anche chi si dice credente). Ora sono due voci distinte;
- intestazione del sorgente «Ora 02»: la lezione è la n. 1 dell’UDA;
- prova finale: il distrattore «Dio esiste ma non interviene» rimandava al deismo, mai spiegato; un distrattore del quiz («Nessuno ha visto Dio in televisione») era poco plausibile e di tono non adatto: sostituiti;
- il sondaggio personale «Dio esiste?» a mani alzate (vedi sopra).

## 11. Collaudo (7 ottobre 2026)

Playwright con Chromium, server locale su porta 8781: 134 controlli superati, 0 falliti. Tutte le 10 scene avanti/indietro (pulsanti e frecce), somma dei minuti 50; ogni blocco con risposta sbagliata e giusta; animazione fotogramma per fotogramma (5/5, anche indietro) senza sovrapposizioni a 1366 px, 1920 px LIM, 360 px e iPhone 13; pausa gioco → Sfida (avvio, turni alternati, errore e rubata +50, punteggio, schermata finale) → ritorno alla scena 5 con la restituzione aperta; glossario (16 voci) e fumetto delle parole nuove; Studio e download del `.txt`; tema chiaro e scuro; LIM con tasto L, pulsante e `?lim=1`; visore (`?in=visore`) con testata di una riga di 55 px a 1280 e 390 px; 360 px e iPhone 13 senza scorrimento orizzontale, barra delle scene in fondo, mascotte non sovrapposta ad Avanti; iframe con `sandbox="allow-scripts allow-forms allow-modals allow-popups allow-downloads"` (animazione, Sfida, ritorno, VeroInsieme, download); console senza errori; nessuna richiesta di rete esterna. `localStorage` contiene solo le preferenze del kit (tema, LIM, skin, ultima scheda gioco, nomi delle squadre). AMDG solo in latino.

Nota sul kit: i blocchi di base (`verifica`, `quiz`…) si azzerano se si cambia scena con Indietro/Avanti; il ritorno dalla pausa gioco conserva invece la scena di partenza. Il componente proprio `VeroInsieme` conserva il suo stato anche cambiando scena.
