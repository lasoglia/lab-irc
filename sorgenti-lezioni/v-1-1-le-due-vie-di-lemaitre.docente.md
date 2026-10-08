# V 1-1 · «La visione cosmologica di Lemaître» (artefatto «Le due vie di Lemaître») — note del docente

Classe V · UDA 1 «Le due vie di Lemaître» · Lezione 1 · artefatto interattivo · 7-8 ottobre 2026, con la skill «IRC · Artefatto interattivo della lezione» (kit Lab IRC del 5 ottobre 2026), mascotte Terra.
Artefatto: `uploads/v1-1il~1.htm` (nome invariato: il catalogo e il pannello lo collegano così) · Sorgente: `sorgenti-lezioni/v-1-1-le-due-vie-di-lemaitre.js` · Testo di studio: `sorgenti-lezioni/v-1-1-le-due-vie-di-lemaitre.testo.txt` (è lo stesso file che si scarica da Studio → «Scarica il testo», con il nome `v-1-1-le-due-vie-di-lemaitre-testo.txt`) · Fascicolo (invariato): `uploads/v1-1il~1.pdf`.

Assemblaggio:

```bash
python3 -I design-system/assets/artefatti/skill-lezione/scripts/build_artefatto.py \
  sorgenti-lezioni/v-1-1-le-due-vie-di-lemaitre.js -o "uploads/v1-1il~1.htm" --anno 5 \
  --titolo "Le due vie di Lemaître" \
  --descrizione "Lemaître, l'inizio dell'universo e la creazione: tre piani da distinguere"
node design-system/assets/artefatti/skill-lezione/scripts/esporta_testo.js \
  sorgenti-lezioni/v-1-1-le-due-vie-di-lemaitre.js sorgenti-lezioni/v-1-1-le-due-vie-di-lemaitre.testo.txt
```

Lo stile dei due componenti propri (e una correzione per la LIM, § 3) è dentro il sorgente (`<style id="lm-css">`, solo token e variabili del kit): non serve `--css`. Record di catalogo: invariato (`data/lezioni.json`, lezione «La visione cosmologica di Lemaître», materiale «Lezione interattiva», `tipo: "Artefatto interattivo"`, `file: "/uploads/v1-1il~1.htm"`). Il `.txt` va in catalogo solo se lo si vuole come `Documento/PDF`. Stato: **pronto da caricare** (non pubblicato).

## 1. Scheda della lezione

```text
Titolo e identificativo: «La visione cosmologica di Lemaître» (catalogo) · artefatto «Le due vie di Lemaître» · V 1-1
Classe / età: V, 18–19 anni
UDA e posizione: UDA 1 «Le due vie di Lemaître», lezione 1 di 2 (il fascicolo PDF porta ancora il titolo
  precedente dell'UDA, «Il cosmo esaurisce le domande?»). Viene dopo l'apertura dell'anno «Il cuore inquieto»
  (i tre verbi: come / perché / fino a dove). La lezione 2, «Creazione e primo istante» (artefatto «L'inizio
  non è tutto»), è già nel nuovo stile: qui NON si anticipano Genesi 1, ex nihilo, conservazione (costruttore
  e sole), inizio/fondamento, lettera di Giovanni Paolo II a Coyne, «chi ha creato Dio?», custodia del creato.
  La dipendenza da Dio «in ogni istante» è solo nominata (catena, anello 1) e rimandata; l'ultima scena e
  l'ultima sezione dello Studio rimandano a quella lezione.
Domanda centrale: «Il Big Bang conferma la Genesi» o «La scienza ha dimostrato che Dio non serve»?
  Una fede può appoggiarsi a un modello dell'universo che la cosmologia propone, controlla e corregge?
Risposta in una frase: l'inizio che la fisica descrive è un inizio naturale, non la creazione: il modello
  di Lemaître non la dimostra e non la smentisce, la fede del suo autore non ne cambia il valore scientifico,
  e distinguere i piani non significa separarli.
Obiettivo osservabile: lo studente (a) colloca un'affermazione nuova sul piano del risultato, della biografia
  o dell'interpretazione; (b) distingue inizio naturale, inizio metafisico e creazione; (c) indica in un
  titolo o in una frase (Pio XII, 1951) il punto in cui si passa dal dato all'interpretazione, e lo motiva.
Criterio di riuscita: almeno 2 su 3 nella prova (scena 11); almeno 5 frasi su 6 collocate nella scena 3;
  almeno 4 domande su 6 al primo colpo in «Tre inizi» (scena 6).
Dossier dei contenuti: non presente nel repository. Base: fascicolo PDF (6 pagine, invariato) e artefatto
  del 28 settembre 2026; correzioni nel § 11.
Prova finale: scena 11 (quiz di 3 domande su un titolo immaginario) + sondaggio d'uscita con confronto (scena 12).
```

**Fraintendimenti da smontare.** (1) «Il Big Bang prova la creazione» (concordismo): il più probabile, smontato con esito motivato nelle scene 3, 6, 9 e 11. (2) «La cosmologia ha dimostrato che un creatore non serve»: è lo stesso salto con la conclusione rovesciata (scene 3, 9, 11). (3) «La teoria è sospetta perché l'ha scritta un prete» e, rovesciato, «è vera perché l'ha scritta un prete»: si giudica il risultato con la biografia (scene 2, 3, Sfida 2). (4) «Lemaître cercava nella fisica la conferma della Genesi»: il modello del 1927 non aveva un inizio (scena 2). (5) «Distinguere scienza e fede vuol dire che non hanno niente da dirsi» (fideismo, scena 10). (6) «Il Big Bang è un'esplosione in uno spazio già pronto» (solo nel glossario, voce *espansione*).

**Essenziale da imparare.** Il modello del 1927 senza inizio; i tre piani (risultato, biografia, interpretazione) e il nome *ipotesi*; il 1931: l'atomo primitivo e il limite delle equazioni; la frase cancellata (la fisica stende un velo sulla creazione); inizio naturale / inizio metafisico / creazione; Lemaître nel 1958 (l'ipotesi resta fuori da ogni questione metafisica o religiosa; Is 45,15); che cosa afferma la fede (dipendenza, inizio del tempo, conosciuto per fede) e che cosa ne segue; il discorso di Pio XII del 1951 e il punto in cui scavalca i piani; concordismo, fideismo, dialogo (*Dei Filius*, cap. IV; CCC 159).

**Catena causa-effetto (nessi).**
1. Nel 2025-2026 la cosmologia propone, controlla e corregge (DESI): **per questo** ci si chiede se una fede possa appoggiarsi a un modello dell'universo (esistenziale).
2. Se lo chiese il primo che propose un inizio dell'universo, Lemaître, prete e fisico; ma il suo modello del 1927 non aveva un inizio: **quindi** non cercava nella fisica la prima pagina della Genesi (storico).
3. **Per questo** prima di giudicare servono tre piani: risultato, biografia, interpretazione (logico).
4. Nel 1931 l'inizio arriva dalla fisica (l'atomo primitivo), con un limite delle equazioni; **eppure** suscita diffidenza, perché ricorda la creazione biblica contro il mondo eterno di Aristotele (storico).
5. Lemaître non ne approfitta: cancella la frase sul velo e distingue inizio naturale, inizio metafisico e creazione (testuale).
6. La fede afferma la dipendenza e l'inizio del tempo, **eppure** quell'inizio si conosce per fede: **ne segue** che un modello con un inizio non prova la creazione e uno senza inizio non la smentisce (logico-teologico).
7. **Quando** i piani si scavalcano (Pio XII, 1951) la fede si lega a un modello; l'errore opposto fa lo stesso salto, rovesciato (storico e logico).
8. **Eppure** distinguere non è separare: due ordini di conoscenza che non possono contraddirsi e si aiutano a vicenda (logico-teologico).

**Impronta.** La distinzione cattolica fra due ordini di conoscenza (Tommaso, Vaticano I) e la figura di uno scienziato credente che non mescola i piani; sullo sfondo, l'idea biblica di un mondo che comincia, entrata così a fondo nella cultura europea da rendere sospetta un'ipotesi fisica (Lambert su Einstein).

## 2. Mappa dell'essenziale (fascicolo → scena → Studio)

| Contenuto del fascicolo | Scena | Studio |
|---|---|---|
| Apertura: DESI 2025 e 2026, la cosmologia si corregge; la domanda | 1 (sondaggio + `rivela`) | La domanda |
| § 1 Prete e fisico: 1923, Mercier, Eddington, Harvard e MIT, Lovanio | 2 (`tappe` 1923) | Un prete che fa i conti |
| § 1 1927: universo in espansione, velocità proporzionale alla distanza, **senza inizio** | 2 (`tappe` + `verifica`), 4 (fotogramma 1); Sfida 1 | idem |
| § 1 e § 3 Einstein 1927 a Bruxelles: frase in versioni diverse | 2 (`tappe`) | idem |
| § 1 Hubble 1929; traduzione del 1931 senza il calcolo; Livio (2011); IAU 2018, 78% di 4.060 voti | 2 (`tappe`); Sfida 4; Linea del tempo | idem |
| § 2 Tre piani: risultato, biografia, interpretazione | 3 (`carte` + `smista`); Sfida 2; Categorie, Abbinamenti; prova 1 | Tre piani da distinguere |
| § 2 *Ipotesi*, *hypóthesis*, «porre sotto»; *L'hypothèse de l'atome primitif* (1946) | 3 (carta «Risultato» + glossario); Sfida 5 | idem |
| § 2 Screditarlo o arruolarlo perché prete: stesso errore | 3 (chiusura dello `smista`) | idem |
| § 3 1931: Eddington («ripugnante»), lettera di 457 parole del 9 maggio, atomo primitivo; Big Bang (Hoyle, 1949) | 4 (`animazione` + aggancio «Per capire»); Sfida 3 | Un inizio che fa sospettare |
| § 3 Aristotele (mondo eterno) e Bibbia; Lambert: la diffidenza di Einstein | 4 (testo) | idem |
| § 4 La frase cancellata dal dattiloscritto | 5 (`citazione`); Sfida 7 | Un inizio non è la creazione |
| § 4 Inizio naturale / metafisico / creazione; l'atomo primitivo non è un inizio assoluto | 6 (`TreInizi`), 4 (fotogramma 5); Sfida 6 e 8; prova 3 | idem |
| § 4 Solvay 1958 e Is 45,15 | 5 (`leggi`, trova la tesi) | idem |
| § 4 «Due vie» (1933); «troppo rispetto per Dio» | 8 (battuta finale della catena); 11 (prova 2) | idem |
| § 5 Dipendenza (Tommaso I, q. 104, a. 1) e inizio del tempo (*Dei Filius* I, Lateranense IV, CCC 338) | 8 (`catena`, anelli 1–2) | Che cosa afferma la fede (l'immagine dell'aria e del sole resta nello Studio: la sviluppa la lezione 2) |
| § 5 L'inizio si conosce per fede (Tommaso I, q. 46); «ne segue»; CCC 284 | 8 (anelli 3–5); Vero o falso 4; Quiz 2 | idem |
| § 6 Pio XII, 22 novembre 1951; «prova assoluta»; due ragioni di Lemaître; O'Connell; 7 settembre 1952; presidente 1960–1966 | 9 (`Salto`); Vero o falso 5; Quiz 5 | Quando i piani si scavalcano |
| § 6 L'argomento di Lemaître difendeva la fede; l'errore opposto | 9 (ragioni), 11 (prova 1) | idem |
| § 7 Concordismo, fideismo, dialogo | 10 (`scegli`); Quiz 4; Abbinamenti | Distinguere non è separare |
| § 7 Obiezione seria (Lambert); *Dei Filius* IV; CCC 159 (GS 36); la filosofia come ponte; Russell; DESI | 10 (`dubbi`) | idem |
| Domande 1–4 | 2, 6, 9, 11 in classe | Domande per lo studio |
| Conclusione; 17 giugno 1966; frase finale | 12 (testo + rilancio del sondaggio d'uscita) | La risposta |

Glossario (14 voci, tutte cliccabili almeno una volta nelle scene): *modello*, *cosmologia* (scena 1); *espansione*, *biografia* (2); *interpretazione*, *ipotesi* (3); *atomo primitivo*, *Big Bang* (4); *trascendente* (5, nella glossa della seconda frase); *metafisica* (6, nella spiegazione), *creazione* (6 e 8); *concordismo*, *fideismo*, *dialogo* (10).

## 3. Regia degli strumenti

| Anello | Che cosa deve capire la classe | Perché è difficile | Tipo | Strumento | Alternativa |
|---|---|---|---|---|---|
| 1 La domanda | La cosmologia si corregge; la fede può appoggiarsi a un modello? | Notizia tecnica; rischio di aprire con l'attualità al posto del tema | Posizione personale + aggancio | `domanda` d'ingresso (i due titoli) + `rivela` in 3 passi | lettura a voce del riquadro iniziale del fascicolo |
| 2 Prete e fisico; 1927 senza inizio | Il modello non nasce dalla Genesi | Molte date; equivoco «l'ha inventato per la Bibbia» | Collocazione nel tempo + equivoco | `tappe` (7 date) + `verifica` | `seq` nei giochi |
| 3 Tre piani | Risultato, biografia, interpretazione | Concetti vicini, nei titoli arrivano mescolati | Distinzione · **decide la classe** | `carte` + `smista` (6 frasi) | `confronto` |
| 4 Il 1931 | Risalendo l'espansione si arriva a uno stato iniziale; il limite delle equazioni fa parte del risultato | Processo invisibile, scale enormi | Processo / trasformazione | `animazione` a 5 fotogrammi + aggancio «Per capire» | componente SVG (versione precedente) |
| 5 Fonte principale | La fisica non prova Dio; l'ipotesi resta fuori da ogni questione metafisica o religiosa | Testo denso; distinguere la tesi dalle conseguenze | Lettura della fonte | `citazione` con commento + **`leggi`** «trova la frase» (4 candidate) | `citazione` sola (versione precedente) |
| 6 **Tre inizi** (concetto più difficile) | Lo stesso stato iniziale regge tre domande diverse | Nel linguaggio comune «inizio» e «creazione» coincidono | Distinzione fra concetti vicini + decisione | **componente proprio `TreInizi`** | `carte` (versione precedente), `smista` |
| Pausa a metà | Fissare piani, nomi, date | 23′ di contenuti nuovi | Cambio di ritmo | **pausa gioco: Sfida a squadre** (8 domande) + `rivela` di restituzione | `vf` |
| 7 Che cosa afferma la fede | Dipendenza + inizio; l'inizio si conosce per fede; la conseguenza | Implicazione logico-teologica, testi magisteriali | Nesso causale | `catena` (5 anelli) con «Togli un anello» | `rivela` (versione precedente) |
| 8 Pio XII 1951 | Dove il discorso lascia la fisica; due ragioni di Lemaître; onestà verso il testo | La cautela c'è, ma la sequenza scavalca | Fonte + decisione | **componente proprio `Salto`** | `verifica` |
| 9 Distinguere non è separare | Concordismo / fideismo / dialogo; l'obiezione seria | Parole nuove simili; obiezione vera | Distinzione + obiezioni | `scegli` (3 menu) + `dubbi` (3) | `confronto` + `nota` (versione precedente) |
| Chiusura | Applicare i piani a un caso nuovo; tornare alla domanda | — | Prova + opinione | `quiz` (3) + `domanda` d'uscita con `confronta` + aggancio «Prossima lezione» | mani alzate |

**Perché due componenti propri.** `TreInizi` mette lo stesso punto d'oro («stato iniziale») al centro di tre anelli concentrici (fisica, filosofia, teologia). Per sei domande la classe decide quale piano risponde; la risposta giusta accende l'anello (due domande per anello) e il perché compare subito; alla fine i tre anelli sono completi e si apre l'osservazione di Lemaître sull'atomo primitivo. Nessun blocco del kit mostrava insieme lo *stesso* oggetto, tre domande diverse e un esito motivato: le `carte` della versione precedente elencavano tre definizioni. `Salto` divide la conclusione di Pio XII in tre segmenti: la classe tocca quello in cui si lascia il piano della fisica, ogni tentativo riceve la sua ragione, poi si aprono le due ragioni di Lemaître e la nota «Con onestà verso il testo». Il componente tiene insieme fonte, decisione e contesto nello stesso riquadro.

Elementi interattivi dei componenti e feedback: scelte `la-choice` (hover bordo oro e spostamento, active 0,97, focus oro; esito verde/rosso sempre con la parola «Sì.» / «Non è questo piano.», «Esatto.» / «Non ancora.»); `ll-btn` per «Prossima domanda», «Guarda gli anelli», «Perché Lemaître ne fu contrariato?»; `ll-btn--solenne` per «Che cosa ne diceva Lemaître?»; `ll-link` per «Ricomincia» e «Riprova». Gli anelli cambiano in 377–610 ms con la curva del kit, l'anello appena acceso pulsa una volta (987 ms); con `prefers-reduced-motion` niente transizioni. Stato solo in memoria (oggetto `MEM`): tornando alla scena, anche dopo il gioco, i componenti riprendono da dove erano; ricaricando la pagina ripartono. Nulla viene salvato.

**Correzione per la LIM (CSS della lezione).** In modalità LIM il kit ingrandisce la scena con `zoom` e, con essa, anche il limite del palco delle animazioni (46% dell'altezza): a 1366×768 e 1280×800 il palco occupava quasi tutto lo schermo e la didascalia finiva sotto la barra. Una regola nel `lm-css` della lezione riporta il limite al 46% dello schermo reale: palco, didascalia e comandi stanno in una schermata (misurato: § 10). Il difetto è del kit e riguarda tutte le lezioni con `animazione` alla LIM: va corretto nel kit (`lab-lezione-lim.css`), non qui.

Tipi interattivi: `domanda` ×2 (ingresso/uscita), `rivela` ×2, `custom` ×2 (componenti diversi), ogni altro tipo ×1. Strumenti che mostrano: `tappe`, `carte`, `animazione`, `catena`, `TreInizi`. Punti in cui decide la classe: scene 2, 3, 5, 6, 7, 8 («Togli un anello»), 9, 10, 11. Un solo percorso.

## 4. Piano minuto per minuto (50′)

| # | Minuti | Fase · momento | Scena | Strumento |
|---|---|---|---|---|
| 1 | 0–4 (4′) | Aggancio · Apertura | Due titoli, una *domanda* (mascotte Terra) | `domanda` d'ingresso + `rivela` DESI |
| 2 | 4–8 (4′) | Scoperta · Contesto | Un prete che *fa i conti* | `tappe` (7 date) + `verifica` |
| 3 | 8–13 (5′) | Scoperta | Tre piani da *distinguere* | `carte` + `smista` |
| 4 | 13–17 (4′) | Scoperta · Spiegazione | Riavvolgere *l'espansione* | `animazione` (5 fotogrammi) + aggancio «Per capire» |
| 5 | 17–22 (5′) | Scoperta · Fonte | Poteva *approfittarne* | `citazione` + `leggi` (trova la tesi) |
| 6 | 22–27 (5′) | Scoperta | Tre *inizi* | `custom` TreInizi |
| 7 | 27–33 (6′) | Attività · **Pausa gioco** | Sfida *a squadre* | `gioco: sfida` (8 domande) + `rivela` di restituzione |
| 8 | 33–37 (4′) | Attività · Spiegazione | Che cosa afferma *la fede* | `catena` (5 anelli) |
| 9 | 37–41 (4′) | Attività · Fonte | Dove avviene *il salto*? | `custom` Salto |
| 10 | 41–44 (3′) | Attività · Sintesi | Distinguere non è *separare* | `scegli` + `dubbi` |
| 11 | 44–48 (4′) | Chiusura · Prova | Un titolo *nuovo* | `quiz` (3 domande) |
| 12 | 48–50 (2′) | Chiusura | Le due *vie* (mascotte Terra) | `domanda` d'uscita con confronto + aggancio «Prossima lezione» |

Somma: 4+4+5+4+5+5+6+4+4+3+4+2 = **50**. Barra delle fasi: Aggancio 4′ · Scoperta 23′ · Attività 17′ · Chiusura 6′. La classe agisce in ogni scena; il tratto più lungo di solo ascolto è l'animazione della scena 4 (circa 4′, con le domande del docente fotogramma per fotogramma).

**Pausa gioco a metà** (min 27–33), dopo il nucleo più denso (tre piani, 1931, fonti, tre inizi) e prima della parte dottrinale. Le 8 domande della Sfida riguardano solo le scene 1–6; perché siano eque, nella scena 2 aprire la data 2011 (Livio → domanda 4), nella scena 3 toccare la parola *ipotesi* (etimologia → domanda 5), nella scena 4 aprire l'aggancio «Per capire» (Hoyle → domanda 3). Gli altri giochi (Quiz, Vero o falso, Abbinamenti, Categorie, Linea del tempo, Riflessione) servono al ripasso o all'anticipo e non entrano nei 50 minuti.

## 5. Piano di regia

**In ritardo** (in quest'ordine):
- scena 7: Sfida fermata alla quinta domanda e una sola domanda di restituzione (−2′);
- scena 6: `TreInizi` fino alla domanda 3 (una per anello), poi la conclusione a voce (−2′);
- scena 2: aprire solo 1927 (le due date), 1931 e 2011 (−1′; il 2011 serve alla Sfida);
- scena 10: aprire solo il primo dubbio, l'obiezione seria (−1′);
- scena 4: «Riavvolgi» in riproduzione automatica invece dei fotogrammi uno per uno (−1′);
- scena 8: «Riproduci tutto» senza «Togli un anello» (−1′).

**In anticipo:**
- domanda 4 del fascicolo («troppo rispetto per Dio») a coppie per 3′, poi due risposte a voce, senza giudizio sulle convinzioni;
- in modalità Giochi: «Categorie» (9 frasi sugli stessi tre piani) o «Vero o falso» (6 affermazioni), 4–5′;
- dibattito dopo la scena 9: «Chi dice che la cosmologia ha dimostrato che Dio non serve fa lo stesso salto di Pio XII?»;
- «Linea del tempo» (7 date) se serve fissare la cronologia;
- «Riflessione» a fine ora: ognuno si colloca da solo, la frase resta solo sullo schermo e sparisce.

## 6. Traccia orale per scena

1. «Due titoli che abbiamo letto tutti, in una versione o nell'altra. Nessun nome: alzate la mano.» Toccare una risposta per ogni voto, mostrare i risultati senza commentarli: «li riguardiamo alla fine». Poi il `rivela`: marzo 2025, luglio 2026 («chi ha ragione non lo sappiamo ancora: è il modo normale di lavorare della cosmologia»); toccare *cosmologia*. Terzo passo: «La domanda di oggi se la fece novant'anni fa il primo che propose un inizio dell'universo. Era un prete.»
2. Aprire le date in ordine. Sul 1927 di Einstein: «la frase che circola esiste in più versioni: ne conosciamo il senso, non le parole». Sul 2011: «il taglio era suo». Verifica a mani alzate, poi toccare la scelta della maggioranza e leggere il perché (*biografia* nel glossario).
3. Far girare le tre carte a tre studenti; sulla carta «Risultato» toccare *ipotesi* e leggere l'etimologia. Smista: una frase alla volta, voto della classe, poi tocco. Insistere sulle due frasi «Interpretazione» con conclusioni opposte e lo stesso salto. Facoltativo: «È lo scivolamento dei verbi dell'apertura dell'anno: dal *come* al *perché*.»
4. Leggere il testo (Aristotele e la Bibbia; Lambert su Einstein). Animazione un fotogramma alla volta, chiedendo prima che cosa succederà: 1 oggi, più lontane e più veloci; 2 riavvolgiamo; 3 denso e caldo, ancora dentro il modello; 4 il 1931, l'atomo primitivo, 457 parole; 5 «qui le equazioni non reggono più; e lo stato iniziale viene da un'altra realtà fisica: inizio naturale, non creazione». Aprire l'aggancio «Per capire» (Eddington, Hoyle). Alla LIM palco, didascalia e comandi stanno nella stessa schermata.
5. «Un prete trova un inizio dell'universo. Che cosa vi aspettereste che facesse?» Leggere la frase cancellata, poi «Che cosa ci dice?». Far leggere ad alta voce il testo del 1958; votare quale frase è la tesi, poi toccare. Dopo la soluzione aprire le altre (*trascendente*, Is 45,15).
6. «Stesso punto di partenza, tre domande diverse.» Per ogni domanda voto A/B/C a mani alzate, poi tocco. Fermarsi sulla domanda 4 («da quale stato fisico viene l'atomo primitivo?»): è ancora fisica, anche se oggi il modello non sa rispondere. Alla fine «Che cosa ne diceva Lemaître?».
7. Due squadre con nomi collettivi (nessun nome di studente; il browser ricorda i nomi delle squadre solo come preferenza). Regola: 20″ per rispondere; giusta = 100 punti più 5 per ogni secondo rimasto; chi sbaglia lascia la domanda all'altra squadra, che ha 10″ per rubarla (50 punti). Le domande dispari toccano alla prima squadra, le pari alla seconda. «← Torna alla lezione · scena 7» riporta qui; restituzione con le due domande del `rivela`.
8. Agganciare gli anelli uno alla volta, leggendo le citazioni (*Dei Filius* in traduzione dal latino, CCC 338, Tommaso, CCC 284). Non sviluppare qui l'immagine dell'aria e del sole: è della lezione 2. «Togli un anello»: togliere il terzo («si conosce per fede») e chiedere che cosa succede (la fede dovrebbe attendere il verdetto di ogni nuovo articolo). La mascotte chiude con le «due vie».
9. Leggere la conclusione del discorso. Voto: dove si lascia il piano della fisica? Poi toccare. Se la classe sceglie «e perciò un Creatore», valorizzare il ragionamento: «il *perciò* rende esplicito il passaggio, ma la parola *creazione* lo conteneva già». Poi «Perché Lemaître ne fu contrariato?» e la nota di onestà («non sono argomento di prova assoluta»; 1952).
10. `scegli`: leggere la frase, la classe propone le parole, il docente le imposta e controlla. Aprire il primo dubbio (l'obiezione seria); gli altri se c'è tempo.
11. Leggere il titolo immaginario. Tre domande: voto a mani alzate, poi tocco e lettura del perché.
12. Leggere il 17 giugno 1966. Sondaggio d'uscita con la stessa domanda: il tratteggio d'oro mostra il voto d'ingresso. Leggere la frase del rilancio. Aprire «Prossima lezione»: «Se un inizio fisico non è la creazione, che cosa vuol dire creare? Lo vedremo leggendo Genesi 1.»

## 7. Soluzioni motivate

- **Scena 1:** sondaggio d'opinione, nessuna risposta giusta né punteggio.
- **Scena 2, verifica:** B. Il modello del 1927 non aveva un inizio: chi pensa che la fede gli abbia «suggerito» la teoria trova un modello senza inizio. A: non risulta un errore di calcolo (Einstein contestava la fisica del modello); C e D non hanno fondamento.
- **Scena 3, smista:** 1 Risultato (grandezze misurabili); 2 Biografia (vero, ma riguarda l'autore); 3 Interpretazione (l'«allora» è un passaggio filosofico da argomentare); 4 Biografia (fatto d'archivio sulla persona); 5 Risultato (anche il limite fa parte del risultato); 6 Interpretazione (stesso salto della 3, conclusione opposta).
- **Scena 5, leggi:** la tesi è «rimanga interamente al di fuori di ogni questione metafisica o religiosa»; le altre due frasi ne sono conseguenze (per il materialista, per il credente); l'ultima è un accordo con Is 45,15, non una prova.
- **Scena 6, TreInizi:** 1 metafisico (perché esiste qualcosa); 2 naturale (densità e temperatura si misurano e si modellano); 3 creazione (relazione con Dio); 4 naturale (è ancora fisica); 5 creazione (domanda teologica su Is 45,15); 6 metafisico (perché ci sono leggi).
- **Scena 7, Sfida a squadre (8):** 1 B, universo in espansione ancora senza inizio; 2 C, risultato e biografia; 3 A, Fred Hoyle; 4 D, Mario Livio; 5 B, «porre sotto»; 6 C, una realtà fisica che viene da un'altra; 7 A, la cancellò; 8 D, metafisica. Restituzione: «Quale domanda ha diviso di più le squadre, e su quale piano stava?»; «Perché “da quale stato fisico viene l'atomo primitivo?” è ancora fisica?» (si risponde, o si risponderà, con osservazioni e modelli).
- **Scena 8, catena:** senza l'anello 1 la creazione si riduce a un evento lontano, sostituibile da un modello; senza il 2 non ci sarebbe nulla da confrontare; senza il 3 la fede dovrebbe attendere il verdetto di ogni articolo; senza il 4 restano i due titoli dell'inizio; il 5 è il punto d'arrivo (il senso).
- **Scena 9, Salto:** «La creazione nel tempo, quindi;». I dati dicevano al massimo uno stato iniziale, un inizio naturale; chiamarlo «creazione» è già cambiare piano (dal modello all'atto di Dio), e il «quindi» presenta il salto come conseguenza; «Creatore» e «Dio» seguono dalla parola scelta. È la lettura coerente con la distinzione di Lemaître. **Da accettare nella discussione**, se motivata, anche «e perciò un Creatore» (è lì che la causa diventa esplicita): la versione precedente dell'artefatto la dava come risposta giusta (§ 11).
- **Scena 10, scegli:** concordismo; fideismo; «non può esserci vero dissenso».
- **Scena 11, prova:** 1 B, passa da un risultato a un'interpretazione che non argomenta; 2 A, Dio non è una grandezza da inserire in un modello che domani si corregge; 3 C, un inizio naturale: una realtà fisica che viene da un'altra.
- **Giochi di ripasso:** Quiz: B, D, A, C, B. Vero o falso: F, F, V, F, F, V. Categorie: *Risultato* = radiazione di fondo 1964-1965, relazione velocità-distanza, DESI 2025; *Biografia* = presidente dell'Accademia, Eddington a Cambridge, frase cancellata; *Interpretazione* = «il Big Bang prova che Dio esiste», «l'espansione dimostra che l'universo non ha senso», «se ha un inizio, allora ha una causa esterna». Linea del tempo: 1923, 1927, 1929, 1931, 1936, 1951, 2018. Abbinamenti: come nel sorgente. Riflessione: nessuna soluzione, nessun punteggio.
- **Domande del fascicolo (Studio):** 1. Il modello del 1927 non aveva un inizio: la fede dell'autore non ne ha deciso il contenuto, e la biografia spiega come nasce una ricerca, non quanto vale. 2. Inizio naturale: lo stato denso e caldo descritto dal modello (domanda: quanto era densa la materia?); inizio metafisico: perché esiste qualcosa invece del nulla; creazione: il mondo posto nell'essere da Dio. 3. In «La creazione nel tempo, quindi»: si dà il nome dell'atto di Dio a ciò che i dati descrivono come stato iniziale (accettabile «e perciò un Creatore» se motivato). 4. Aperta, senza punteggio: un'ipotesi si mette alla prova e si scarta; Dio non è un oggetto fra gli oggetti; la fede non si lega a un modello.

## 8. Varianti senza proiettore

- Scene 1 e 12: alzata di mano con i numeri alla lavagna; quelli d'uscita accanto a quelli d'ingresso.
- Scena 2: cinque date alla lavagna (1923, 1927, 1931, 2011, 2018), racconto del docente; la verifica letta a voce, tre dita alzate.
- Scena 3: tre colonne alla lavagna (Risultato · Biografia · Interpretazione); il docente legge le sei frasi, la classe indica la colonna con 1, 2 o 3 dita.
- Scena 4: disegnare «noi» al centro e quattro galassie, poi ridisegnarle sempre più vicine fino a un punto; accanto «qui le equazioni non reggono» e «e prima?».
- Scena 5: fascicolo, p. 3 (le due citazioni); a coppie si sottolinea la frase-tesi.
- Scena 6: tre cerchi concentrici alla lavagna; il docente legge le sei domande, la classe indica il cerchio.
- Sfida a squadre: due squadre a voce; il docente legge domanda e opzioni dalle Soluzioni; 20″ e rubata in 10″; punti alla lavagna (100 la giusta, 50 la rubata).
- Scena 8: la catena scritta con i connettivi; si cancella un anello e si chiede che cosa crolla.
- Scena 9: la frase di Pio XII alla lavagna in tre pezzi; voto per alzata di mano.
- Scene 10–11: la frase con i tre spazi e le tre domande della prova dettate; risposta su un foglietto, correzione a voce.

## 9. Fonti e limiti (con ciò che va ricontrollato)

- **Fascicolo** (`uploads/v1-1il~1.pdf`, 6 pagine, riletto l'8 ottobre 2026): base dei contenuti; l'artefatto lo segue salvo le correzioni del § 11. Nel PDF restano da correggere alla prossima revisione: «Nel 2010» (Livio: 2011) e il titolo dell'UDA.
- **D. Lambert**, voce «Lemaître, Georges Edouard», in *Dizionario interdisciplinare di scienza e fede*, Città Nuova 2002, II, pp. 1908-1917: testo del 1958 (pp. 1913-1914), diffidenza di Einstein, «due vie» (1933), richiesta di udienza (O'Connell), limite della distinzione. Non riaperta in questa sessione: **da riscontrare** parole e pagine.
- **J.-P. Luminet**, arXiv:1105.6271 (2011): frase cancellata dal dattiloscritto; traduzione dall'inglese dell'autore (come nel fascicolo). **Da riscontrare** sull'originale inglese.
- G. Lemaître, *Nature* 127, p. 706 (9 maggio 1931); A. S. Eddington, *Nature* 127 (21 marzo 1931): «ripugnante» è in forma indiretta.
- **M. Livio**, «Mystery of the missing text solved», *Nature* 479 (10 novembre 2011), pp. 171-173: data e rivista **confermate** l'8 ottobre 2026 con una ricerca in rete (la lettera di Lemaître è del 9 marzo 1931).
- **IAU**, comunicato iau1812 (29 ottobre 2018; il voto elettronico si chiuse il 26): 78% dei 4.060 voti, **confermato** con una ricerca in rete.
- **DESI**: 19 marzo 2025 (DR2); aprile 2026 (completate le osservazioni dei cinque anni; i primi risultati sull'energia oscura dai dati completi sono attesi nel 2027); 30 luglio 2026 (misura «full-shape» della foresta Lyman-alfa: il valore centrale si sposta verso il modello standard, la preferenza per un'energia oscura variabile si riduce ma non scompare). **Confermato** con ricerche in rete; il sito desi.lbl.gov e gli articoli non erano raggiungibili direttamente. Il quadro cambierà nel 2027: **ricontrollare** prima di riusare la scena 1.
- **Pio XII**, discorso alla Pontificia Accademia delle Scienze del 22 novembre 1951: la data e la sequenza «La creazione nel tempo, quindi; e perciò un Creatore; dunque Dio!» sono confermate da traduzioni consultate in rete; la frase italiana «i fatti fin qui accertati non sono argomento di prova assoluta» non è stata ritrovata parola per parola (le traduzioni inglesi dicono «are not an absolute proof»): **da riscontrare** sul testo italiano (vatican.va o *Discorsi e radiomessaggi*). Discorso agli astronomi del 7 settembre 1952 come nel fascicolo.
- **Concilio Vaticano I**, *Dei Filius*, capp. I e IV (DH 3001-3002, 3015-3019): traduzioni dal latino dichiarate. Il cap. IV è tradotto dall'autore («duplice ordine di conoscenza», «vero dissenso», «si aiutano anche a vicenda», *opem quoque sibi mutuam ferunt*); il cap. I («con liberissima decisione fin dal principio del tempo produsse dal nulla») è quello del fascicolo: **da confrontare** con DH 3002 o con CCC 327, che riporta in italiano il testo del Lateranense IV.
- **Catechismo**, nn. 159 (da GS 36), 284, 338: come nel fascicolo, testo ufficiale italiano; non riaperto su vatican.va in questa sessione.
- **Is 45,15**, Bibbia CEI 2008: come nel fascicolo; **da riscontrare** su bibbiaedu.it se si vuole la conferma formale.
- **Tommaso d'Aquino**, *Summa theologiae* I, q. 46, aa. 1-2 (a. 2: *mundum non semper fuisse sola fide tenetur*), q. 104, a. 1.
- **R. J. Russell**, voce «Dialogo scienze-teologia», *Dizionario interdisciplinare*: come nel fascicolo; **da verificare** che la voce esista con questo titolo e questo autore.
- «Je suis content… maintenant on a la preuve» (17 giugno 1966): l'episodio (la notizia della radiazione di fondo pochi giorni prima della morte, il 20 giugno) è confermato; le parole francesi sono riferite (Godart, ripreso da Lambert) e non sono state ritrovate in una fonte primaria: **da riscontrare**.
- «Ho troppo rispetto per Dio per poterne fare un'ipotesi scientifica»: attribuzione riferita (fascicolo); **da riscontrare**. Per le «due vie» l'originale inglese sarebbe un'intervista al *New York Times* del 1933 (D. Aikman): **da verificare** prima di citarla.
- Etimologie: Vocabolario Treccani, non riaperto in questa sessione. *Metafisica* è data come spiegazione tradizionale (titolo degli scritti collocati dopo la *Fisica*); *modello* dal latino *modulus* attraverso *modellus*; *fideismo* come derivato moderno (XIX secolo).
- **Rete**: dal terminale di questa sessione vatican.va, desi.lbl.gov, arxiv.org, nature.com, iau.org e bibbiaedu.it non erano raggiungibili; i controlli indicati come «confermati» vengono da ricerche in rete (sintesi dei risultati), non dalla lettura diretta delle pagine.

## 10. Collaudo (8 ottobre 2026)

Playwright con Chromium, server locale sulla porta 8785, script in `scratchpad/lez1/test-v2.mjs`: **266 controlli superati, 0 falliti**; 50 schermate in `scratchpad/lez1/shots-v2/`.

- Somma dei minuti 50 (4+4+5+4+5+5+6+4+4+3+4+2); barra con fasi 4′ · 23′ · 17′ · 6′ e cronometro su 50′.
- Tutte le 12 scene avanti e indietro con i pulsanti, con ← → e con PagGiù / PagSu; Indietro disabilitato alla prima, Avanti all'ultima; mascotte Terra grande in apertura e in chiusura.
- Ogni blocco con un errore e con la risposta giusta, sempre con il perché: verifica, smista (5 su 6), leggi (candidata sbagliata, tesi, frasi aperte), TreInizi (errore, correzione, 5 su 6, tre anelli, chiusura), catena (5 anelli e «Togli un anello»), Salto (due errori, poi la risposta, le due ragioni), scegli (errore, poi tutte giuste), dubbi (3 aperti), prova (errore e giusta, 2/3), sondaggio d'ingresso («Annulla l'ultimo») e d'uscita con il confronto.
- Animazione fotogramma per fotogramma (5/5, anche indietro, riproduzione automatica) a 1366 px, 1920 px LIM, 1366 px LIM, 390 px e 360 px: attori ed etichette mai sovrapposti né fuori dal palco; fotogramma 1 con tre frecce distinte. Palco e didascalia in una schermata: 1366×860 (palco 396 px), LIM 1920×1080 (497 px), LIM 1366×768 (353 px).
- Pausa gioco: si apre la Sfida, la barra mostra «← Torna alla lezione · scena 7»; Sfida a squadre con avvio, cronometro di 20″, turni alternati, errore → «Rubata!» con 10″, rubata riuscita +50, doppio errore senza punti, punteggio, schermata finale con vincitore; ritorno alla scena 7; la scena 6 conserva lo stato di TreInizi dopo il gioco.
- Glossario: 14 voci con etimologia; fumetto delle parole nuove (anche dentro le carte, senza rigirarle).
- Studio: download di `v-1-1-le-due-vie-di-lemaitre-testo.txt` (16 195 caratteri), identico al `.testo.txt` esportato.
- Giochi: 7 schede (Quiz, Vero o falso, Abbinamenti, Categorie, Linea del tempo, Sfida a squadre, Riflessione), tutte si montano.
- Tema chiaro e scuro; LIM con tasto L, pulsante e `?lim=1`; AMDG solo in latino («Ad maiorem Dei gloriam»).
- Visore (`?in=visore`): testata di una sola riga da 55 px a 1280 e a 390 px, barra delle scene in fondo.
- 360 px e iPhone 13: nessuno scorrimento orizzontale in nessuna scena (anche in Giochi, Studio e a Sfida in corso), nessun elemento fuori finestra, barra delle scene in fondo allo schermo, mascotte e Indietro non sovrapposti ad Avanti, la barra non copre l'ultimo elemento.
- Iframe con `sandbox="allow-scripts allow-forms allow-modals allow-popups allow-downloads"` (senza `allow-same-origin`) a 1280 e 390 px: testata del visore di 55 px, animazione, componente proprio, Sfida, ritorno alla scena 7, download del testo.
- Console senza errori né avvisi; nessuna richiesta di rete esterna. `localStorage` contiene solo le preferenze del kit (tema, LIM, skin, ultima scheda dei giochi, nomi delle squadre); nessuna risposta, nessun nome di studente.

Nota sul kit: il sondaggio conserva i voti cambiando scena e i componenti propri conservano il loro stato; i blocchi di base (verifica, quiz, smista…) si azzerano se si esce dalla scena con Avanti o Indietro, mentre il ritorno dalla pausa gioco riporta alla scena di partenza.

## 11. Che cosa è cambiato rispetto alla versione precedente

Versione precedente: artefatto del 28 settembre 2026 (10 scene, senza minuti né fasi). Nuova versione: rifatta il 7 ottobre con la skill e rivista l'8 ottobre.

**Mantenuto:** titolo, sottotitolo e domanda d'apertura con i due titoli; catena e contenuti del fascicolo; le date della biografia; i tre piani con le carte e lo smistamento di sei frasi; la frase cancellata del 1931; il testo del 1958 con Is 45,15; inizio naturale / metafisico / creazione; dipendenza, inizio del tempo e limite della ragione; il discorso di Pio XII come caso di scavalcamento, con la cautela del testo e le due ragioni di Lemaître; concordismo e fideismo; i giochi Categorie, Quiz, Vero o falso, Linea del tempo, Abbinamenti e Riflessione (rivisti).

**Cambiato:**
- 12 scene con fasi e minuti, **50′ esatti**, cronometro e piano di regia (prima nessun minuto né fase);
- **Sfida a squadre** come pausa gioco a metà, con 8 domande e restituzione (prima mancava `giochi.sfida`; la pausa era «Categorie» dopo lo smista);
- **glossario** di 14 voci con etimologia e parole cliccabili (prima solo un blocco `parola` su *ipotesi*);
- l'espansione riavvolta diventa un'`animazione` del kit a 5 fotogrammi con attori ed etichette (prima un componente senza nomi sul palco);
- la fonte principale si legge davvero con «trova la frase» (prima solo citata);
- i tre inizi diventano il componente `TreInizi` (prima tre carte); la fede diventa una `catena` con «Togli un anello» (prima un `rivela`); concordismo e fideismo passano a `scegli` + `dubbi` con l'obiezione seria (prima `confronto` + `nota`);
- chiusura con prova su un titolo nuovo, **ritorno alla domanda iniziale** (sondaggio d'uscita con confronto) e rimando alla lezione 2 (prima due verifiche, nessun ritorno al sondaggio, nessun rimando);
- mascotte Terra in apertura e in chiusura;
- Studio in prosa continua che copre tutto il fascicolo (comprese le quattro domande e la frase finale), con i nessi espliciti e le fonti; tolto il gioco «Sondaggio» (l'opinione si raccoglie nella lezione);
- slug `v-1-1-le-due-vie-di-lemaitre`: cambia il nome del testo scaricato;
- Big Bang: «anni dopo» precisato in «nel 1949, alla radio della BBC»; radiazione di fondo «1964» → «1964-1965» (osservata nel 1964, pubblicata nel 1965); la radiazione di fondo è «la traccia osservabile di quella fase calda e densa» (il fascicolo: «di quello stato iniziale»).

**Corretto** (errori o imprecisioni):
- **Livio: 2010 → 2011** (*Nature* 479, 10 novembre 2011). Anche il fascicolo PDF dice 2010.
- **DESI, luglio 2026**: prima «nuove analisi concordano con il modello standard»; ora «si avvicina di nuovo al modello standard, senza chiudere la questione», con le due letture dei ricercatori e l'attesa dei dati completi nel 2027.
- **Tommaso**: *Summa theologiae* I, q. 46, **aa. 1-2** (prima solo a. 2: l'a. 1 serve per «né che non l'abbia avuto»).
- **Salto di Pio XII**: la risposta giusta passa da «e perciò un Creatore» a «La creazione nel tempo, quindi»; è una correzione d'interpretazione, motivata con la distinzione di Lemaître (§ 7: l'altra lettura si accetta se motivata).
- **Einstein 1927**: niente parole fra virgolette di una frase di cui si conosce il senso ma non il testo (prima «abominevole» nelle tappe e nel Vero o falso; nella revisione del 7 ottobre era rimasta nel titolo dell'aggancio della scena 4).
- **Traduzioni dichiarate**: *Dei Filius* capp. I e IV (dal latino), frase cancellata (dall'inglese), testo del 1958 (traduzione riportata da Lambert), con una riga apposita nelle fonti dello Studio.
- Corretti nella revisione dell'8 ottobre: animazione con due frecce sovrapposte verso la stessa galassia (una galassia restava senza freccia) → tre frecce distinte; anacronismo nel `Salto` («aveva evitato nel 1931 e nel 1958», a proposito di un discorso del 1951) → «già nel 1931»; «Quanto erano densa e calda la materia» → «Quanto era densa e calda»; etimologia circolare di *modello* («dall'italiano antico *modello*») → latino *modulus* attraverso *modellus*; *metafisica* presentata come spiegazione tradizionale (prima «una posizione negli scaffali»); commento alla frase cancellata «la fisica lo vela» → «stende un velo sulla creazione», come nel testo; «Consiglio Solvay di astrofisica» → «Consiglio Solvay, Bruxelles 1958»; *cosmologia*, *interpretazione*, *metafisica* e *trascendente* non erano cliccabili in nessuna scena (ora lo sono); «i risultati completi» DESI precisato in «i primi risultati sui cinque anni completi di osservazioni»; alla LIM la didascalia dell'animazione finiva sotto la barra a 1366×768 e 1280×800 (§ 3).
