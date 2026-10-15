# Guida ai contenuti del sito

Come aggiungere materiali, immagini, video e strumenti interattivi dal pannello
(`.../lab-irc/admin`). Dopo ogni modifica, clicca **Publish**: il sito si aggiorna
in 1–2 minuti.

---

## La nuova struttura

- **Home** → i 5 anni di corso + scorciatoie a Strumenti e Video
- **Anno (1–5)** → tutti i materiali, strumenti e video di quell'anno
- **Strumenti** → le app e gli artefatti interattivi
- **Video** → i video di YouTube
- **Verifiche** → l'archivio dei giochi di verifica di fine unità: i cinque anni
  di corso e, dentro ogni anno, le verifiche delle sue unità (punto 7); in fondo
  il collegamento alla piattaforma delle verifiche con codice (`/esami`)
- **Ricerca** → la barra in alto cerca in tutti i contenuti

Nel pannello trovi le sezioni: Impostazioni, Descrizioni degli anni, UDA, Lezioni,
Verifiche di fine unità, Materiali, Strumenti, Video.

---

## L'aspetto: tema "Notte studio" (scuro/chiaro)

Il sito usa di default un tema **scuro** moderno ("Notte studio"), pensato per
tenere viva l'attenzione e rendere bene anche da proiettore o telefono. In basso
a destra c'è un pulsante **🌙 / ☀️**: chi preferisce passa al **tema chiaro** con
un clic. La scelta resta salvata su quel dispositivo (vale anche per le verifiche).

Il sito è costruito **esattamente come il modello di Claude Design**: la cartella
`design-system/` è il pacchetto esportato dal designer (colori, caratteri,
componenti come il rosone, le schede degli anni, le mascotte, A·M·D·G), e il sito
usa proprio quei componenti. Tutto è proporzionato sulla **sezione aurea**
(φ = 1,618): spaziature di Fibonacci, titoli in scala aurea, colonne 1,618 : 1.
Tre caratteri: **Cormorant Garamond** per i titoli, **Cinzel** (capitali romane)
per sopratitoli e numeri degli anni, **Figtree** per il testo.

Gli effetti legati al cursore (rosone che si illumina, schede che si inclinano,
pulsanti "magnetici") esistono solo con il mouse: su telefono le schede restano
ferme, niente "flash". Se nel sistema è attivo "riduci movimento" si spengono.

Ogni anno ha la sua **mascotte**, disegnata con Claude Design (misure sulla
sezione aurea, aureola dorata): Semino (I), Ichthy (II), Navicella (III),
Bussolina (IV), Terra (V). Seguono il cursore con lo sguardo (Bussolina con l'ago),
sbattono le ciglia e, se le tocchi, dicono una frase. Il pacchetto è in
`assets/mascotte/` (anche in SVG statico per slide e stampe). Sono le stesse nel sito e negli artefatti.

I **font** (Cormorant Garamond, Cinzel, Figtree) sono salvati dentro il sito e
non vengono più scaricati da Google: il sito funziona anche se la rete della
scuola blocca siti esterni, e nessun dato di chi visita va a terzi.

**Quando cambi il design su Claude Design:** esporta di nuovo lo zip e dallo a
Claude: si sostituisce la cartella `design-system/` e si rigenera il sito.
I contenuti che carichi da Decap non ne sono toccati.

**Per gli artefatti/lezioni `.html` che costruiamo insieme:** il designer ha
preparato un kit con lo stesso stile (colori, font, mascotte dell'anno in basso a
destra, A·M·D·G). Bastano tre righe (esempio per un file dentro `uploads/`):

```html
<link rel="stylesheet" href="../design-system/assets/artefatti/lab-artefatto.css">
<body class="la" data-anno="3">   <!-- 1–5: sceglie colore e mascotte -->
  …
  <script src="../design-system/assets/artefatti/lab-artefatto.js"></script>
</body>
```

Le classi disponibili (schede, pulsanti, quiz…) sono descritte in
`design-system/assets/artefatti/README.md`. Il vecchio `assets/lab-style.css`
resta per gli artefatti già fatti che lo usano.

---

## Il percorso dello studente (percezione e attenzione)

Il sito segue le regole di **percezione** del design system (Gestalt):
- ogni pagina ha **un solo pulsante pieno**: indica il prossimo passo
  ("Inizia da qui", poi "Prossimo"); gli altri pulsanti sono leggeri;
- quando uno studente apre un materiale compare un **sigillo d'oro ✓**; le
  cartelle di unità e lezioni mostrano un **anello** che si chiude man mano
  ("2 contenuti · 1 aperto");
- in home compare **"Riprendi la lezione"** dall'ultima lezione lasciata a metà;
- in fondo a ogni unità e lezione c'è **"Per continuare"** (lezione o unità
  successiva, oppure il ritorno): nessuna pagina è un vicolo cieco;
- la mascotte dell'anno saluta una volta e commenta i progressi, senza mai
  rimproverare.

Tutto questo resta **solo nel browser dello studente**: niente account, niente
dati inviati. In fondo alla pagina c'è "Dimentica" per cancellare tutto.

**Modalità LIM (lavagna):** pulsante **LIM** in basso a destra, oppure tasto
**L**. Ingrandisce tutto per la proiezione e nasconde i progressi personali.
Anche gli artefatti aperti dal sito si aprono in modalità LIM.

---

## Le lezioni interattive nel nuovo stile

Le lezioni di accoglienza dei cinque anni sono ora nel formato del **kit lezione**
del design system: scene in sequenza (frecce ←/→), scaletta con i minuti, modalità
Studio per lo studente, giochi quando ci sono, glossario, mascotte dell'anno,
pulsante LIM. Ogni lezione è un unico file autonomo: funziona anche senza internet.

I testi "sorgente" di queste lezioni stanno in `sorgenti-lezioni/` (uno per lezione,
più una nota su come è stata trasposta la versione precedente). Per cambiare una
lezione si modifica il suo sorgente e si riassembla con lo script indicato nel
`README.md` di quella cartella; oppure la chiedi a Claude.

---

## 1. Aggiungere immagini accattivanti (anche con l'AI)

Ogni materiale e ogni strumento ha un campo **"Immagine di copertina"**:
se la carichi, la scheda mostra l'immagine; se la lasci vuota, compare uno sfondo
colorato con il numero dell'anno. Quindi è sempre bello, ma con le immagini è più vivo.

**Come caricarla:** nel pannello, dentro il materiale, clicca su *Immagine di
copertina* → *Choose an image* → seleziona il file. Va tutto in automatico.

**Formato consigliato:** orizzontale, circa **1200×675 px** (formato 16:9), file
sotto i ~500 KB (così il sito resta veloce).

**Come crearle con l'AI:** generi l'immagine con uno strumento, la scarichi e la
carichi nel campo qui sopra. Strumenti utili:
- **Google Gemini / Imagen** (se hai Google AI) — ottimo e immediato
- **Microsoft Copilot / Bing Image Creator** — gratuito
- **Adobe Firefly** — buona resa, pensato per uso lecito
- **Ideogram** — il migliore se vuoi del testo dentro l'immagine

**Consigli per un risultato coerente e adatto all'IRC:**
- Tieni **uno stile unico** per tutto il sito (es. "illustrazione minimal",
  "acquerello luminoso", "stile rinascimentale sobrio") così le copertine
  sembrano una collezione.
- Chiedi immagini **simboliche** (luce, cammino, libro, finestra, mani, paesaggi):
  evita di generare persone reali o personaggi protetti da copyright, e tratta
  con rispetto i soggetti sacri.
- Esempio di prompt: *"illustrazione minimal, colori caldi su sfondo avorio, un
  libro aperto da cui esce luce, stile editoriale elegante, 16:9"*.

> Posso anche crearti io delle copertine grafiche (vettoriali, su misura per i
> tuoi argomenti): basta chiedermele.

---

## 2. Aggiungere un video di YouTube

1. Pannello → **Video** → *Add video*.
2. **Titolo** e **Descrizione**.
3. **Link YouTube**: incolla l'indirizzo del video. Va bene qualsiasi formato
   (`https://youtu.be/…`, `https://www.youtube.com/watch?v=…`, gli Shorts…):
   il sito riconosce il video da solo.
4. (Facoltativo) scegli l'**anno** così comparirà anche nella pagina di quell'anno.
5. **Publish**.

Sul sito il video appare con l'anteprima; al clic parte direttamente nella scheda,
con un player rispettoso della privacy.

---

## 3. Aggiungere uno strumento interattivo (artefatto)

Quando costruiamo insieme una lezione interattiva, ti consegno un file `.html`.

1. Pannello → **Strumenti** → *Add strumento*.
2. **Titolo** e **Descrizione**.
3. Nel campo **"File HTML dell'artefatto"** carica il file `.html`.
   (In alternativa puoi usare un **link esterno**.)
4. (Facoltativo) scegli l'**anno**.
5. **Publish**.

Sul sito lo strumento si apre **a tutto schermo** dentro il tuo sito, con un
pulsante per tornare indietro. Perfetto da proiettare o da far usare ai ragazzi.

> Nota importante: gli artefatti **autonomi** (quiz, linee del tempo,
> visualizzazioni, bacheche) funzionano perfettamente sul sito. Gli artefatti che
> dialogano "dal vivo" con l'AI funzionano solo dentro l'app di Claude e non una
> volta pubblicati qui: per il sito costruiremo quindi strumenti autonomi.

---

## 4. Mettere più file nella stessa lezione (il modo più comodo)

Non serve creare un materiale per ogni file:

1. Pannello → **📖 Lezioni** → apri la lezione (o creane una con *Aggiungi lezione*:
   titolo, anno, UDA).
2. In fondo trovi **File della lezione** → *Aggiungi file* → carica il file.
3. Ripeti *Aggiungi file* per ogni file: slide, PDF, artefatti `.html`, anche link.
4. **Publish**.

Titolo e tipo sono facoltativi: se li lasci vuoti il sito usa il nome del file
e capisce da solo il tipo (`.html` = artefatto che si apre nel sito, `.pdf` =
documento, `.ppt/.pptx` = slide). Anno e UDA sono quelli della lezione.

Nel pannello le liste lunghe (materiali, lezioni, UDA…) si mostrano **chiuse**,
una riga per elemento: clicca la freccia › per aprirne una. Gli elementi non si
trascinano più (deformava la pagina): l'ordine si decide col campo **Ordine**.
Quando aggiungi un elemento nuovo compare **in cima** alla lista.

---

## 5. Aggiungere un artefatto interattivo a una lezione (come materiale singolo)

Gli artefatti `.html` delle **lezioni** non vanno in una sezione a parte: si
caricano come **materiali**, dentro la loro struttura naturale
**Anno → UDA → Lezione → Materiali**. Così l'artefatto compare nel posto giusto
e, soprattutto, si **apre dentro il sito** (non si scarica).

1. Pannello → **📄 Materiali** → *Add materiale*.
2. **Titolo** e (facoltativo) **Descrizione**.
3. Scegli l'**Anno di corso**, l'**UDA (cartella)** e la **Lezione
   (sottocartella)** a cui appartiene l'artefatto.
   *Suggerimento:* se UDA o Lezione non esistono ancora, creale prima nelle
   sezioni **🗂 UDA** e **📖 Lezioni**.
4. In **Tipo** scegli **"Artefatto interattivo"**.
5. Nel campo **"File da caricare"** carica il file `.html`.
6. **Publish**.

Sul sito l'artefatto appare come scheda dentro la lezione: al clic su **"Apri"**
si mostra **a tutto schermo dentro il sito**, con il pulsante per tornare
indietro. I file `.html` si aprono così in automatico anche se per errore
scegli un altro "tipo".

---

## Ordine delle lezioni, titoli e dedica

- **Ordine**: nelle pagine le unità e le lezioni vanno da sinistra a destra
  seguendo il campo **Ordine** del pannello. Se manca, il sito usa il numero
  nel nome dei file (`ii-1-2-…` = anno II, unità 1, lezione 2). L'importazione
  rapida mette la lezione nuova dopo quelle che ci sono già.
- **Titoli**: sul sito i titoli compaiono "puliti" (prima lettera maiuscola,
  senza «UDA 1 -» o «Lezione 1», che diventano il numero nella riga sopra).
  I titoli dei file dentro una lezione sono «Lezione interattiva»,
  «Fascicolo di studio», «Slide». Se rinomini un'unità o una lezione, i link
  vecchi smettono di funzionare: meglio farlo a inizio anno.
- **Santo patrono**: il laboratorio è intitolato a san Carlo Acutis, come una
  parrocchia al suo santo. In ⚙️ Impostazioni del sito trovi tre campi:
  «Santo patrono» (compare in home sotto il titolo: «San Carlo Acutis ·
  patrono»), «Festa del patrono» (12-10: quel giorno la home dice «oggi è la
  sua festa» e la lapide in fondo si illumina d'oro) e «Lapide di
  dedicazione», la formula latina in fondo a ogni pagina, una riga per riga
  (D·O·M = *Deo Optimo Maximo*, «a Dio ottimo massimo»; *Et Sancto Carolo
  Acutis dicatum* = «e dedicato a san Carlo Acutis»; A·D·MMXXVI = anno 2026).
  Lì trovi anche «Presentazione (Chi sono)».
- Il link **Importa**, in fondo a ogni pagina accanto ad «Accesso docente»,
  porta alla pagina di importazione rapida (è volutamente poco visibile).

---

## 6. Caricare molte lezioni in una volta (importazione rapida)

Quando hai tante lezioni da mettere online, farle una alla volta dal pannello
è lento. C'è una pagina apposta:

**`https://lasoglia.github.io/lab-irc/admin/importa.html`**

Funziona così:

1. **Collegamento a GitHub (solo la prima volta).** Serve una "chiave
   personale" di GitHub: la pagina spiega passo passo come crearla (5 minuti).
   La chiave dà il permesso di scrivere **solo** nel sito `lab-irc`, resta
   salvata nel tuo browser e si può revocare in ogni momento da GitHub.
2. **Scegli l'anno** e **trascina le cartelle** delle lezioni così come le
   tieni sul computer. La struttura consigliata è:

   ```
   Nome dell'unità (UDA)/
   ├── Nome della lezione/
   │   ├── slide.pptx
   │   ├── fascicolo.pdf
   │   └── lezione-interattiva.html
   └── un file sciolto.pdf     ← resta nell'unità, fuori dalle lezioni
   ```

   Vanno bene anche file sciolti: li sistemi nella tabella.

   Dall'**archivio delle lezioni** puoi trascinare la cartella `da-caricare`
   preparata dallo script, oppure direttamente le cartelle delle lezioni.
   Le cartelle `docente` e `sorgenti` vengono saltate, la cartella `pubblica`
   (e la stessa `da-caricare`) non conta come livello. Vengono presi solo i
   file che vanno sul sito: PDF, slide (ppt, pptx, odp, key), lezioni
   interattive `.html` e immagini; gli altri (testi, note, sorgenti) sono
   contati nel riepilogo come «ignorati».
3. **Controlla la tabella.** Per ogni file la pagina propone anno, unità,
   lezione, tipo e titolo. Dentro una lezione il titolo dice che cosa è il
   file: «Lezione interattiva» per gli `.html`, «Slide» per le slide e per i
   PDF che finiscono in `-slide.pdf`, «Fascicolo di approfondimento» per i PDF
   che finiscono in `-fascicolo.pdf`, «Documento» per gli altri PDF; per i file
   sciolti viene dal nome del file. Puoi cambiare tutto: mentre
   scrivi compaiono i nomi delle unità e delle lezioni che esistono già, così
   li riusi senza errori di battitura. Le unità e le lezioni che non esistono
   vengono create da sole.
4. **Pubblica su GitHub.** Tutti i file e le lezioni finiscono online con un
   solo salvataggio. Il sito si aggiorna in 1–2 minuti e nel pannello Decap
   le nuove lezioni compaiono come se le avessi create lì.

Note utili:
- La pagina mostra anche i **file già su GitHub ma non collegati a nessuna
  lezione**: con *Collega a una lezione* li sistemi senza ricaricarli.
- **Aggiornare una lezione già online**: ricarica il file con lo **stesso
  nome**. La pagina lo riconosce (anche i nomi vecchi come `iv1-1r~1.htm`),
  lo lascia nella lezione dov'è già e lo **sostituisce**, senza doppioni né
  collegamenti ripetuti; in tabella c'è scritto «→ sostituisce uploads/…».
  Un file nuovo nella **stessa cartella** di un file già online (per esempio
  le slide aggiunte dopo) va nella stessa lezione.
- I nomi dei file nuovi vengono "puliti" (minuscole, senza spazi né accenti);
  se il nome esiste già ma il file non è lo stesso (due file con lo stesso nome
  nella stessa importazione), viene aggiunto un numero («-2»). Per questo i
  nomi dei file conviene che siano specifici della lezione (come quelli
  dell'archivio, `ii-1-2-…-fascicolo.pdf`), non generici come `slide.pdf`:
  un `slide.pdf` già sul sito verrebbe sostituito.
- Se una cartella si chiama «Lezione 2 - Il caso Galileo» (o «UDA 3 - …»),
  il numero diventa l'**ordine** e sul sito il titolo compare pulito
  («Il caso Galileo»); nel pannello resta il nome intero.
- Limite di GitHub: **95 MB a file**. Le slide molto pesanti vanno alleggerite
  (o esportate in PDF).
- Per un singolo file o una correzione, il pannello Decap resta la strada più
  semplice (punto 4).
- La prima volta prova con **una lezione sola**, controlla che compaia sul sito
  e poi carica il resto.

---

## 7. Le verifiche di fine unità (giochi)

Al termine di ogni unità c'è un **gioco di verifica**: un file `.html` unico,
per esempio `I 1-G l-uomo-che-cerca-oltre-gioco.html` (il gioco della prima
unità del primo anno: anno romano, numero dell'unità, `G`, titolo breve,
`-gioco`).

### L'archivio delle verifiche sul sito

Le verifiche sono ordinate come le lezioni: **anno di corso → unità**.

- **Verifiche** (voce in alto, anche sul telefono): i cinque anni di corso. Ogni
  anno dice quante verifiche giocabili ha («1 verifica») e i titoli dei giochi,
  oppure «0 verifiche · In preparazione».
- **Verifiche › Anno I** (e così gli altri anni): i quattro passi per gli
  studenti (apri il gioco, scrivi nome e classe, gioca fino alla fine o, se il
  tempo finisce, Esc → «Consegna la prova», scarica il rapporto e consegnalo),
  che compaiono appena l'anno ha almeno una verifica, e
  poi **tutte le unità dell'anno in ordine di corso**, una scheda ciascuna: il
  gioco con il pulsante «Gioca ↗», oppure «In preparazione» se il gioco di
  quell'unità non c'è ancora. Il nome dell'unità sulla scheda porta alla sua
  pagina. L'Accoglienza non compare (non ha una verifica di fine unità), a meno
  che tu non le dia un gioco. Se una verifica è legata a un'unità che non esiste
  più (per esempio dopo un cambio di titolo), resta in fondo all'anno: non
  sparisce mai.
- In fondo alla **pagina dell'unità**, dopo le lezioni, c'è anche lì il suo
  gioco, sotto «Fine unità · Verifica». Quando lo studente ha aperto tutti i
  materiali dell'unità, il pulsante del gioco diventa quello pieno con il tag
  «Ora la verifica»: è il passo successivo.
- In fondo alla **pagina dell'anno** (le lezioni) c'è il rimando «Le verifiche
  del primo anno», quando l'anno ha almeno un gioco.

Il gioco si apre in una **nuova scheda** del browser, non nel visore delle
lezioni: chiede lo schermo intero, "cattura" il mouse e carica le sue librerie
da internet, cose che il visore non permette. Serve quindi la connessione e un
**computer con tastiera e mouse**: sul telefono e sul tablet il gioco non si
comanda (il sito lo dice sotto il pulsante). Il sito **non salva nulla**: alla
fine lo studente scarica (o copia) il rapporto con le risposte e lo consegna al
docente, che dà il voto. Il rapporto contiene nome, cognome e classe: sui
computer della scuola conviene che lo studente lo cancelli dopo la consegna
(il passo 4 della pagina lo ricorda).

### Come caricarlo

**Dalla pagina di importazione** (`admin/importa.html`, punto 6): trascina il
file del gioco, la cartella `pubblica` che lo contiene, oppure tutta la
cartella dell'archivio delle verifiche del tuo computer, ordinata come quella
delle lezioni:

```
Verifiche/giochi/
├── Anno I/
│   ├── UDA 1 - L'uomo che cerca oltre, il senso religioso/
│   │   ├── pubblica/   ← I 1-G l-uomo-che-cerca-oltre-gioco.html
│   │   └── sorgenti/   ← il pacchetto del gioco (viene ignorato)
│   └── UDA 2 - Israele, una promessa…/
│       └── pubblica/   ← I 2-G israele-gioco.html
└── Anno II/ …
```

Le cartelle `sorgenti` e `docente` vengono saltate e `pubblica` non conta come
livello. Da una cartella che si chiama `Verifiche` o `giochi` vanno sul sito
**solo i giochi** (i file che finiscono con `-gioco.html`): griglie di
correzione, soluzioni, immagini e appunti restano sul computer e il riepilogo
li conta tra gli «ignorati». Se invece trascini solo la cartella di un anno o di
un'unità, tieni quei file in `docente` o `sorgenti`, e prima di pubblicare
togli con × ogni riga della tabella che non è un gioco. Un gioco già online con
lo stesso nome viene sostituito, senza doppioni. Un nome che finisce
con `-gioco.html` viene riconosciuto da solo: in tabella la riga dice «Verifica
di fine unità», con l'anno (dal numero romano iniziale), l'unità (dal titolo
breve nel nome: `l-uomo-che-cerca-oltre` → «L'uomo che cerca oltre il senso
religioso») e il titolo preso dal gioco stesso. Controlla l'unità, correggila
se serve, e pubblica.

**Dal pannello** (`admin`): sezione **🎲 Verifiche di fine unità** → *Aggiungi
verifica*: titolo, anno, unità, il file del gioco, una descrizione facoltativa.
Nella stessa sezione c'è la **Nota per gli studenti**, che compare in cima alla
pagina Verifiche (per esempio «La verifica si fa in classe, con i computer
della scuola»).

Note:
- Per **aggiornare** un gioco, ricarica il file con lo **stesso nome**: viene
  sostituito, senza doppioni; il titolo scelto nel pannello resta. Un file già
  online resta quello che è (verifica, oppure materiale di una lezione) anche
  se il nome non segue lo schema.
- Conviene caricare i giochi dalla pagina di importazione: il nome del file
  viene pulito (`i-1-g-l-uomo-che-cerca-oltre-gioco.html`) e l'unità è
  riconosciuta da sola.
- Finché il gioco di un'unità non ha ancora il file, la sua scheda dice «Presto
  disponibile» e non conta come passo successivo. Le unità senza nessun gioco
  compaiono nell'archivio come «In preparazione», da sole: non serve fare nulla.
- L'unità si riconosce dal **titolo breve** nel nome del file: l'inizio del
  titolo dell'unità sul sito (`israele` → «Israele, una promessa, una storia,
  fino a oggi») oppure parole di seguito dentro il titolo (`due-vie-di-lemaitre`
  → «Le due vie di Lemaître»). Se non basta, si guarda il nome della cartella
  dell'unità, senza «UDA 2 - » davanti. Se la pagina non è sicura, la casella
  dell'unità resta **vuota** e la scegli tu dall'elenco: un nome di cartella non
  crea mai un'unità nuova. Prima di pubblicare, guarda che il riepilogo non
  abbia una riga «Unità nuove» che non ti aspetti.
- Il numero dell'unità nel nome del file (`I 2-G`) e nel nome della cartella
  serve solo a tenere in ordine il tuo archivio: è quello dell'archivio, senza
  contare l'Accoglienza, come per le lezioni (`i-2-1-…`); la pagina non lo usa
  per riconoscere l'unità.
- I giochi non entrano nel «percorso» dello studente (sigilli e conteggi):
  la verifica non è un materiale da aprire ma una prova da consegnare.
- La piattaforma delle verifiche con codice (`/esami`, vedi
  `GUIDA-VERIFICHE.md`) non cambia: dalla pagina Verifiche c'è ancora il
  collegamento, in fondo.

---

## Aggiornare il sito (file da sostituire su GitHub)

Se stai passando dalla versione precedente, su GitHub sostituisci/aggiungi:
- `index.html` (sostituisci)
- `admin/config.yml` (sostituisci)
- `data/site.json` (sostituisci)
- `data/materiali.json` (sostituisci)
- `data/anni.json`, `data/strumenti.json`, `data/video.json`, `data/verifiche.json` (nuovi: aggiungi)

Il vecchio `data/classi.json` non serve più: puoi eliminarlo.
