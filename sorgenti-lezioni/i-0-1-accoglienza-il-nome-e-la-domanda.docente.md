# Il nome e la domanda — note del docente

Accoglienza, classe I · artefatto interattivo · 7 ottobre 2026
Sorgente: `sorgenti-lezioni/i-0-1-accoglienza-il-nome-e-la-domanda.js` · Artefatto: `uploads/accoglienza-classi-1.html` (stesso nome di prima, il sito lo collega così) · Testo di studio: `sorgenti-lezioni/i-0-1-accoglienza-il-nome-e-la-domanda.testo.txt`

Assemblaggio:

```bash
python3 -I design-system/assets/artefatti/skill-lezione/scripts/build_artefatto.py \
  sorgenti-lezioni/i-0-1-accoglienza-il-nome-e-la-domanda.js -o uploads/accoglienza-classi-1.html --anno 1 \
  --titolo "Il nome e la domanda" \
  --descrizione "Lezione inaugurale di IRC per la classe prima: il gioco dei nomi, la domanda dell'anno, la mappa delle quattro tappe, il patto e la scatola delle domande."
node design-system/assets/artefatti/skill-lezione/scripts/esporta_testo.js \
  sorgenti-lezioni/i-0-1-accoglienza-il-nome-e-la-domanda.js sorgenti-lezioni/i-0-1-accoglienza-il-nome-e-la-domanda.testo.txt
```

Il CSS dei componenti propri è dentro il sorgente (non serve `--css`).

## 1. Scheda della lezione

- **Titolo e identificativo:** «Il nome e la domanda» · I 0-1 (accoglienza).
- **Classe / età:** prima superiore, 14–15 anni. Primo giorno di IRC.
- **UDA e posizione:** UDA «Accoglienza» del sito; la segue «L’uomo che cerca oltre il senso religioso» («Credo, non credo, non so»; «Segni e simboli»).
- **Domanda dell’anno (aperta, non risolta oggi):** da dove viene l’idea che ogni persona conta?
- **Domanda dell’ora (verificata alla fine):** che cos’è quest’ora e come funziona?
- **Obiettivo osservabile:** alla fine lo studente sa dire chi sceglie l’IRC alle superiori e perché è una scelta; che cosa si valuta e che cosa no; distingue un fatto, un’interpretazione e un giudizio di valore in una frase nuova; sa riconoscere una domanda «da scatola». Criterio: almeno 2 risposte su 3 nella prova finale, e la classe colloca correttamente almeno 4 frasi su 5 nello smistamento.
- **Che cosa non è:** non è una verifica di conoscenze pregresse; nessun punteggio sulle opinioni. Le uniche domande a risposta giusta riguardano ciò che è stato presentato nell’ora.
- **Fraintendimenti da smontare:** «religione = catechismo»; «religione = ora di buco / non si valuta»; «la scelta la fanno i genitori»; «in religione ti chiedono che cosa credi»; «un’opinione forte è un fatto».
- **Catena (percorso dell’ora, nessi espliciti):**
  1. Ogni nome va sulla lavagna, uno per uno: nessuno è un numero (gioco dei nomi).
  2. **Per questo** si comincia da una libertà: quest’ora si sceglie, e alle superiori sceglie lo studente (1984, 1986, 1989).
  3. **Quindi** non è catechismo né un’ora di buco: si valuta il lavoro, mai le convinzioni.
  4. **Eppure** ciò che oggi pare ovvio, che ogni persona conti, non lo è sempre stato: Gilgamesh si conquista un nome; ad Abramo il nome viene promesso (Gen 12,2); oggi i vostri nomi sono sulla lavagna. Da dove viene questa idea? → la domanda dell’anno.
  5. **Per rispondere** serve una strada (quattro tappe e i Talenti) e un patto in due colonne.
  6. **E** serve uno strumento: distinguere fatto, interpretazione e giudizio di valore.
  7. **Così** le domande vere hanno un posto: la scatola.
- **Impronta del cristianesimo (sobria):** la parola *talento* (dalla parabola di Mt 25,14-30) e il nome «ricevuto» di Abramo; la questione «ogni persona conta» resta aperta per l’anno.
- **Fonti controllate e limiti:** vedi § 9.
- **Prova finale:** quiz di tre domande (patto, fatto/valore, scatola) + sondaggio d’uscita confrontato con quello d’ingresso.

## 2. Mappa dell’essenziale

| Contenuto | Scena | Studio |
|---|---|---|
| Gioco dei nomi (tre regole, lavagna fotografata, «non lo so ancora») | 2 | §2 |
| Parola *talento* (etimologia, parabola) | 2 (blocco `parola`) | §2 |
| La scelta: 1929 → 1984 → 1986 → 1989 → 2012; *concordato*, *laicità* | 3 | §3 |
| Non è catechismo / si valuta (giudizio, nota a parte) / non è ora di buco | 4 | §3 |
| Domanda dell’anno; Gilgamesh, Enkidu, Abramo (Gen 12,2); «più di tremila anni» | 5 | §1 |
| Mappa dell’anno: 4 tappe + Talenti; san Carlo Acutis | 6 | §4 |
| Il patto (5 + 5 impegni); *patto* | 8 | §6 |
| Fatto / interpretazione / giudizio di valore | 9, prova 11 | §5 |
| Scatola delle domande (regola, novembre e aprile); *domanda* | 10, prova 11 | §7 |
| Ritorno alla domanda d’ingresso e alla domanda dell’anno | 11 | §9 |

Glossario (10 voci): nome, domanda, talento, concordato, laicità, patto, fatto, interpretazione, giudizio di valore, Gilgamesh.

## 3. Regia degli strumenti

| Anello | Che cosa deve capire la classe | Perché è difficile | Tipo | Strumento | Alternativa |
|---|---|---|---|---|---|
| Nomi e talenti | Nessuno è un numero; ogni capacità conta, anche piccola | Timidezza, paura del giudizio | Attività di classe | `custom` **CatenaNomi**: regole + mappa anonima dei talenti (il docente tocca la famiglia del talento detto) + `parola` «talento» | `nuvola` di parole |
| La scelta | È l’unica materia che si sceglie; sceglie lo studente | Lo ignorano quasi tutti | Dato che sorprende + collocazione nel tempo | `verifica` «Indovinate» + `tappe` 1929–2012 | `stima` (scartata: nessun dato numerico verificabile offline) |
| Che cosa non è | Non catechismo, si valuta, non ora di buco | Pregiudizi diffusi | Distinzione | `carte` + `verifica` lampo | `confronto` |
| **Domanda dell’anno** (concetto più difficile) | Che «ogni persona conta» non è ovvio: ha una storia | È un’idea astratta e data per scontata | Processo/contrasto nel tempo | **`animazione`** a 5 fotogrammi: nome conquistato (Gilgamesh) → vita senza fine cercata → nome promesso (Abramo) → i vostri nomi → «perché?» | `rivela` (versione precedente) |
| La strada dell’anno | Dove si va e con quali testi e film | Lista lunga | Orientamento | `custom` **MappaAnno** (cinque fermate) + `aggancio` Acutis | `tappe` |
| Ripasso a metà | Fissare scelta, valutazione, domanda, mappa | Molte informazioni nuove | Cambio di ritmo | **pausa gioco: Sfida a squadre** | `vf` |
| Il patto | Vale solo in due | Sembra un regolamento | Confronto | `confronto` a due colonne, riga per riga | lettura a voce |
| Lo strumento dell’anno | Fatto / interpretazione / valore | Confini sottili | Distinzione fra concetti vicini — **la classe decide** | `smista` con il perché | `cat` nei giochi |
| La scatola | Una domanda vera non si risolve online | Si confonde «domanda difficile» con «domanda vera» | Decisione su casi | `custom` **Scatola**: 4 domande d’esempio da giudicare + contatore dei foglietti | discussione orale |
| Chiusura | Verifica di comprensione e cambio di idea | — | Prova + opinione | `quiz` (3) + `domanda` d’uscita con `confronta: 'ingresso'` | mani alzate |

Perché l’animazione per la domanda dell’anno: il passaggio «PRIMA/DOPO» (un uomo solo non contava / oggi il tuo nome è sulla lavagna) è il solo nesso «forte» della lezione; mostrarlo come lo stesso palco che cambia (attori che si spengono, un nome promesso che si accende) lo rende visibile senza spiegazione lunga. Didascalie di una frase. È una **ricostruzione schematica**, non una cronologia: Gilgamesh e Abramo sono personaggi letterari/biblici, non fatti datati.

Componenti propri — elementi interattivi e feedback:

- **CatenaNomi:** pillole delle 7 famiglie (hover bordo anno −2 px, active 0,96, focus oro, lampo verde a ogni voce); «Annulla l’ultima» (contorno); «Azzera» a due tocchi (link). Nessun nome digitato: i nomi stanno solo sulla lavagna vera. Fa capire ciò che `nuvola` non dava: una mappa anonima, cumulativa, rivedibile a maggio senza raccogliere dati personali.
- **MappaAnno:** 5 fermate (`aria-pressed`; hover −3 px, active 0,94, focus oro); festa quando sono viste tutte.
- **Scatola:** due `la-choice` per ogni domanda d’esempio con esito motivato (verde/rosso + parola); «Prossima domanda», «Una domanda nella scatola», «Togli l’ultima». Nessuna domanda viene scritta nella pagina.
- Stato solo in memoria (oggetto `MEM` nel sorgente): tornando alla scena i conteggi restano; ricaricando la pagina si riparte da zero.

Tipi interattivi usati: `domanda` ×2 (ingresso/uscita), `verifica` ×2, ogni altro tipo ×1.

## 4. Piano minuto per minuto (50′)

| # | Minuti | Fase · momento | Scena | Strumento |
|---|---|---|---|---|
| 1 | 0–3 (3′) | Aggancio · Primo giorno | Il *nome* e la domanda | `domanda` d’ingresso + `agenda` |
| 2 | 3–14 (11′) | Attività · Il gioco dei nomi | La *catena* dei nomi | CatenaNomi + `parola` talento |
| 3 | 14–18 (4′) | Scoperta · Una cosa che nessuno sa | Avete *scelto* voi | `verifica` + `tappe` |
| 4 | 18–22 (4′) | Scoperta | Tre cose che quest’ora *non* è | `carte` + `verifica` |
| 5 | 22–27 (5′) | Scoperta · La domanda dell’anno | Ogni persona *conta*? | `animazione` |
| 6 | 27–31 (4′) | Scoperta · La mappa | Quattro tappe e un *finale* | MappaAnno + `aggancio` |
| 7 | 31–37 (6′) | Attività · **Pausa gioco** | Sfida *a squadre* | `gioco: sfida` + `rivela` al ritorno |
| 8 | 37–41 (4′) | Attività · Il patto | Il patto vale solo in *due* | `confronto` |
| 9 | 41–44 (3′) | Attività · Lo strumento dell’anno | Fatto, interpretazione, *valore* | `smista` |
| 10 | 44–47 (3′) | Chiusura · Un compito | La *scatola* delle domande | Scatola |
| 11 | 47–50 (3′) | Chiusura · Prova | Fine del *primo* giorno | `quiz` + `domanda` d’uscita |

Somma: 3+11+4+4+5+4+6+4+3+3+3 = **50**. Fasi nella barra: Aggancio 3′ · Attività 11′ · Scoperta 17′ · Attività 13′ · Chiusura 6′. Nessun tratto di solo ascolto oltre ~5′: la classe agisce in ogni scena (voti, catena, indovinate, carte, animazione commentata, mappa, sfida, patto a coppie, smistamento, prova della scatola, quiz).

**Pausa gioco:** a metà (min 31–37), dopo il blocco informativo più denso (scene 3–6), per cambiare ritmo e fissare ciò che si è appena visto. Le 8 domande riguardano solo contenuti già presentati.

## 5. Piano di regia

**In ritardo** (il cronometro segna +N′):
- scena 2: chiudere la catena a metà classe e completarla la volta dopo (−3′), oppure saltare il blocco `parola` (lo si legge nello Studio);
- scena 3: mostrare solo le date 1984 e 1986 (−1′);
- scena 7: Sfida con le prime 5 domande e restituzione di una sola domanda (−2′);
- scena 6: aprire solo tappa 1 e finale (−2′).

**In anticipo:**
- alla scena 3, l’alzata di mano personale «Quella casella all’iscrizione, chi l’ha barrata? Io / i miei genitori / non lo so» (solo a voce, senza registrare nulla);
- a fine ora, il gioco `vf` (otto cose che si dicono sull’ora di religione) o `cat` (fatto / interpretazione / valore);
- dibattito: «Una regola del patto che vi sembra difficile da tenere?».

## 6. Traccia orale per scena

1. «Prima i nomi, poi una domanda che ci terrà compagnia fino a giugno. Prima però una domanda anonima: che cos’è per voi quest’ora?» Votare per alzata di mano, mostrare i risultati senza commentarli: «Teniamoli, li riguardiamo alla fine.»
2. Leggere le tre regole. Comincia chi sta in cattedra, con una cosa piccola. Scrivere ogni nome sulla lavagna vera; sull’artefatto toccare solo la famiglia del talento. Se qualcuno ride di qualcuno: si ferma il gioco, si richiama la regola del patto «dissentire sì, deridere no», si riparte (è il primo caso dell’anno, meglio che accada il primo giorno). A fine giro: fotografare la lavagna («la rivediamo a maggio»). Poi la parola *talento*: «Una moneta antica è diventata la parola per dire che cosa sapete fare.»
3. «Questa è l’unica materia a cui potevate dire di no. Chi sceglie, secondo voi?» Far votare la verifica, poi scorrere le date: 1929 obbligo come «fondamento e coronamento»; 1984 si sceglie; 1986 sceglie lo studente; 1989 la parola *laicità*; 2012 il programma uguale per tutti.
4. Far girare le carte a tre studenti diversi. Verifica lampo sulla valutazione: insistere su «si valuta ciò che fate, mai ciò che pensate».
5. Avviare l’animazione fotogramma per fotogramma. Fotogramma 1: Gilgamesh vuole un nome eterno; 2: l’amico muore, cerca di non morire, torna sapendo che morirà; 3: Abramo non conquista il nome, lo riceve (leggere Gen 12,2); 4: «i vostri nomi stanno lì gratis»; 5: «Da dove viene l’idea che ogni persona conta? Oggi non rispondo: è la domanda dell’anno.»
6. Toccare le fermate in ordine, un minuto al massimo ciascuna; nominare i film come promessa. Se c’è tempo, aprire il rimando a san Carlo Acutis in una frase.
7. Dividere la classe in due metà (nomi collettivi delle squadre, nessun nome di studente). Regola: 20″, chi sbaglia passa la domanda all’altra squadra che può rubare. Al ritorno, le due domande di restituzione.
8. Svelare il patto riga per riga; a coppie, ogni coppia legge una riga ad alta voce. Chiudere con «non ha rinnovo tacito».
9. «Lo strumento dell’anno è uno solo.» Leggere il lead, poi smistare le 5 frasi chiedendo ogni volta «come facciamo a saperlo?».
10. Leggere la regola; giudicare le quattro domande d’esempio; consegnare i foglietti (a casa o subito); a ogni foglietto nella scatola vera, toccare «Una domanda nella scatola».
11. Quiz di tre domande, poi il sondaggio d’uscita: mostrare il confronto con l’inizio. Chiudere con la domanda dell’anno, ancora aperta, e con «Ci vediamo alla tappa 1».

## 7. Soluzioni

- **Scena 3** — Verifica: C, *Lo studente, all’iscrizione* (legge 281/1986, art. 1).
- **Scena 4** — Verifica: C, *Il lavoro* (giudizio senza voto numerico; si valuta ciò che si fa).
- **Scena 9** — Smista: 1984 → Fatto (si verifica sull’Accordo); «per abitudine» → Interpretazione (spiega un comportamento, si discute); «ogni persona merita rispetto» → Giudizio di valore (si sostiene, non si dimostra); «Gilgamesh parte per la Foresta dei Cedri» → Fatto (lo dice il testo); «Gilgamesh cerca la fama perché ha paura di morire» → Interpretazione (lettura del personaggio).
- **Scena 10** — «Amen?» → si trova online (parola ebraica di assenso e fiducia); «Perché qualcuno crede e qualcun altro no?» → scatola; «Quanti anni aveva Carlo Acutis?» → si trova (15); «Se Dio c’è, perché il male?» → scatola.
- **Scena 11** — Quiz: 1 B (patto, impegno di chi insegna); 2 C (fatto: Accordo 1984, art. 9); 3 A (domanda da scatola). Il sondaggio d’uscita non ha soluzione.
- **Sfida a squadre** (8): 1 B 1984 · 2 D lo studente · 3 A giudizio senza voto · 4 C che cosa credete · 5 B ogni persona conta · 6 A la vita senza fine · 7 C risposta non online · 8 D sei. Restituzione: «Quale risposta non vi aspettavate?»; «“Dal 1984 si può scegliere”: come facciamo a esserne sicuri?» (è un fatto: si controlla sul documento).
- **Giochi di ripasso:** `vf` 8 (solo la 2 è vera, con perché e fonte); `cat` fatto/interpretazione/valore (9 frasi, 3 per categoria); `quiz` 5; `abbina` tappe ↔ contenuti.

## 8. Varianti senza proiettore

- Sondaggi: alzata di mano, il docente scrive i numeri alla lavagna (ingresso a sinistra, uscita a destra).
- Catena dei nomi: identica; la mappa dei talenti si fa con sette parole in colonna e le tacche.
- Scelta e tappe: il docente detta le cinque date, la classe indovina «chi sceglie» per alzata di mano.
- Carte: tre fogli piegati con «Non è…» davanti e la spiegazione dietro.
- Domanda dell’anno: racconto orale in tre quadri alla lavagna (corona / tenda / lavagna di classe) e la domanda in grande.
- Mappa: una linea con cinque cerchi sulla lavagna.
- Sfida a squadre: due metà della classe, il docente legge domanda e quattro opzioni, 20″ con l’orologio, rubata a voce; punti alla lavagna (100 se giusta, 50 se rubata).
- Patto: due colonne alla lavagna, completate dettando.
- Smista: tre angoli dell’aula (fatto / interpretazione / valore), ci si sposta per ogni frase.
- Scatola: identica (è già analogica).
- Prova: tre domande dettate, risposta su un foglietto anonimo, correzione a voce.

## 9. Fonti e limiti

- Concordato fra la Santa Sede e l’Italia, 11 febbraio 1929, art. 36 («fondamento e coronamento»).
- Accordo di revisione del Concordato, 18 febbraio 1984, art. 9 n. 2 (legge 121/1985): «è garantito a ciascuno il diritto di scegliere se avvalersi o non avvalersi».
- Legge 18 giugno 1986, n. 281, art. 1: nella secondaria superiore la scelta è esercitata personalmente dagli studenti.
- Corte costituzionale, sentenza 203/1989 (laicità «principio supremo»; «stato di non-obbligo») e sentenza 13/1991.
- D.Lgs. 297/1994, art. 309 («speciale nota» in luogo di voti) e D.P.R. 122/2009, art. 2 (IRC valutato senza voto numerico).
- D.P.R. 176/2012 (Intesa MIUR–CEI, indicazioni per l’IRC nel secondo ciclo).
- Bibbia CEI 2008: Gen 1,27; Gen 11,31–12,4 (Gen 12,2: «Farò di te una grande nazione e ti benedirò, renderò grande il tuo nome»); Mt 25,14-30 (v. 15: «secondo le capacità di ciascuno»).
- *Epopea di Gilgamesh*: viaggio alla Foresta dei Cedri per un nome duraturo; morte di Enkidu; ricerca della vita; il consiglio della locandiera Siduri si trova nella versione paleobabilonese (tavoletta di Sippar/Meissner), per questo nello Studio «in una delle versioni» e in discorso indiretto.
- San Carlo Acutis (Londra 1991 – Monza 2006), canonizzato il 7 settembre 2025.
- Film: *Il principe d’Egitto* (1998), *Inside Out* (2015), *L’onda* (2008), *Wonder* (2017); C. S. Lewis, *Il nipote del mago* (1955).
- Etimologie (*Vocabolario Treccani*, voci «nome», «domandare», «talento», «concordato», «laico», «patto», «fatto», «interpretazione»).

**Limite dichiarato:** dall’ambiente in cui è stata preparata la lezione (7 ottobre 2026) i siti Treccani, Normattiva, Santa Sede e BibbiaEdu non erano raggiungibili. Testi normativi, versetti CEI 2008 ed etimologie sono riportati secondo le fonti indicate ma **non sono stati ricontrollati online in questa sessione**: prima della pubblicazione definitiva conviene una rilettura rapida di Gen 12,2 e Mt 25,15 (CEI 2008), dell’art. 1 della legge 281/1986 e dell’art. 2 del D.P.R. 122/2009, e della voce Treccani «talento» (senso figurato dalla parabola). Le citazioni tra virgolette sono limitate a formule note e brevi.

**Assunzione da confermare:** la mappa dell’anno è stata riallineata al sito (UDA 1 = «L’uomo che cerca oltre il senso religioso», § 10). Se la sequenza delle tappe 2–4 o i mesi sono cambiati nella programmazione, basta correggere l’array `TAPPE` nel sorgente, la sezione 4 dello Studio e `giochi.abbina`.

## 10. Che cosa è cambiato rispetto alla versione del 4 ottobre (ex `.note.md`)

**Mantenuto:** titolo, tono, le tre regole del gioco dei nomi con l’esempio «Lei è Sara…», la lavagna fotografata e ripresa a maggio, «non lo so ancora» come risposta valida, l’ora che si può scegliere, le tre cose che l’ora non è con la verifica sulla valutazione, la domanda dell’anno e il contrasto Gilgamesh / lavagna, la mappa con quattro tappe e i Talenti (titoli, film e libri delle tappe), il patto a 5 + 5 impegni con «non ha rinnovo tacito», fatto / interpretazione / giudizio di valore come strumento dell’anno («primo di cinque attrezzi»), la scatola delle domande con la sua regola e le aperture di novembre e aprile, le «tre cose che quasi nessun adulto sa», la frase finale sull’ora che «non serve a niente», i giochi `vf`, `quiz`, `abbina`, `sfida`, lo Studio in cinque nuclei (ora ampliato).

**Cambiato nella forma e negli strumenti:**
- da 9 a 11 scene con fasi e minuti; scena dei nomi da 15′ a 11′ per far posto alla pausa gioco;
- **pausa gioco** nuova a metà ora (Sfida a squadre, 6′, con ritorno alla scena 7 e restituzione); prima il gioco era solo un rimando finale;
- **sondaggio d’ingresso e d’uscita** con confronto (nuovo); le due alzate di mano personali della vecchia scena 3 diventano una `verifica` «Indovinate» e una domanda orale facoltativa nel piano di regia;
- la scelta dell’IRC mostrata con una linea del tempo 1929–2012 (nuova);
- la domanda dell’anno passa da `rivela` a **animazione** a cinque fotogrammi, con Abramo che riceve il nome (Gen 12,2);
- **fatto / interpretazione / valore** passa da un `aggancio` chiuso a uno **smistamento** in cui decide la classe (scena propria) e torna nella prova finale e nel gioco `cat`;
- la **scatola** ora mette alla prova la regola su quattro domande d’esempio;
- la chiusura diventa **prova di tre domande** + ritorno alla domanda d’ingresso; le «tre cose che quasi nessun adulto sa» sono diventate il contenuto del quiz;
- blocco `parola` sul **talento** (nuovo) e glossario da 4 a 10 voci, con etimologie;
- rimando sobrio a **san Carlo Acutis**, patrono del laboratorio;
- giochi: aggiunto `cat`; `quiz`, `sfida` (8 domande) e `abbina` riscritti sulle novità.

**Privacy:** la vecchia lavagna digitale chiedeva di scrivere nome e talento di ogni studente nella pagina (in memoria). Ora **nessun nome viene digitato**: si conta solo la famiglia del talento, in forma anonima; i nomi restano sulla lavagna vera.

**Correzioni di contenuto:**
- la scelta personale dello studente alle superiori è attribuita alla **legge 281/1986** (prima veniva attribuita alla sentenza 203/1989, che riguarda laicità e stato di non-obbligo);
- «tremila anni» fra Gilgamesh e oggi → **«più di tremila anni»** (le versioni del poema risalgono al II millennio a.C.);
- «il primo grande libro dell’umanità» → **«uno dei poemi più antichi che conosciamo»**;
- Abramo: la vecchia frase «non gli viene promessa … nemmeno la fama» contraddiceva Gen 12,2 («renderò grande il tuo nome»): ora il contrasto è *nome conquistato / nome promesso*;
- le cifre «cinque / quattro lezioni» per tappa sono state tolte perché la mappa è stata riallineata;
- **mappa dell’anno**: la tappa 1 coincide ora con l’UDA del sito «L’uomo che cerca oltre» (credo, non credo, non so; segni e simboli; Gilgamesh); Abramo ed Esodo passano alla tappa 2, la Bibbia alla 3; la vecchia tappa «Un Dio che non sta in un tempio» confluisce nella tappa 4 («a immagine di Dio», Gen 1,27). Da confermare (§ 9).

**Tecnico:** il kit dà a `body.la` 144 px di margine in basso sotto i 720 px (`lab-percezione.css`); nel guscio a tutta altezza della lezione questo alzava la barra delle scene lasciando una fascia vuota sul telefono. Il sorgente lo annulla con una regola propria (`body.ll.la{padding-bottom:0}` sotto i 720 px) e tiene su una riga la testata del visore sotto i 440 px. Il difetto era del kit: dal 7 ottobre 2026 la correzione è anche nel kit (`lab-skill.css`) e nel sito (`lab-percezione.css`), quindi la regola del sorgente resta ma non è più necessaria.

**Collaudo (7 ottobre 2026, Chromium/Playwright):** 11 scene, somma 50′; avanti/indietro con pulsanti, frecce e pallini; ogni blocco provato con risposta sbagliata e giusta; animazione fotogramma per fotogramma (anche a 360 px, attori mai sovrapposti né fuori dal palco); pausa gioco e ritorno alla scena 7; Sfida a squadre (avvio, alternanza, errore e rubata, doppio errore senza punti, punteggio, schermata finale); tutte le 5 schede dei giochi; glossario (10 voci, nessuna parola orfana) e fumetti; Studio e download del `.txt`; tema chiaro e scuro; LIM (`?lim=1`, pulsante, tasto L); visore (`?in=visore`, testata di una riga da 55 px anche a 360–390 px); 360 px, iPhone 13, 768, 1024, 1366, 1920 senza scorrimento orizzontale (la linea del tempo della scena 3 scorre dentro il proprio riquadro, come da kit) e senza sovrapposizioni fra cronometro e «Indietro» (sotto i 440 px il cronometro è nascosto dal kit); iframe con sandbox `allow-scripts allow-forms allow-modals allow-popups allow-downloads` (origine opaca, `localStorage` in eccezione gestita, tutto funzionante, download compreso); nessun errore in console della pagina, nessuna richiesta di rete esterna.

Ricontrollo dell’8 ottobre 2026, dopo la correzione del kit per la LIM (`lab-skill.css`): in LIM a 1366×768 e 1280×800 l’animazione sta in una schermata in tutti i fotogrammi (titolo, palco, didascalia e comandi; margine minimo 53 px sopra la barra delle scene), e c’è posto anche a 1920×1080; dentro il visore del sito, su computer, Android e iPhone: testata di una riga da 55 px, barra delle scene in fondo, nessuno scorrimento orizzontale, nessun errore.
