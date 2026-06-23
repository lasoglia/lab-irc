# Guida ai contenuti del sito

Come aggiungere materiali, immagini, video e strumenti interattivi dal pannello
(`.../lab-irc/admin`). Dopo ogni modifica, clicca **Publish**: il sito si aggiorna
in 1–2 minuti.

---

## La nuova struttura

- **Home** → i 5 anni di corso + scorciatoie a Lezioni, Strumenti e Video
- **Anno (1–5)** → tutti i materiali, strumenti e video di quell'anno
- **Lezioni** → tutte le lezioni-pagina (artefatti HTML), raggruppate per anno e UDA
- **Strumenti** → le app e gli artefatti interattivi
- **Video** → i video di YouTube
- **Ricerca** → la barra in alto cerca in tutti i contenuti (lezioni comprese)

Nel pannello trovi le sezioni: Impostazioni, Descrizioni degli anni, UDA,
Lezioni, Materiali, Strumenti, Video.

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

## 4. Pubblicare una lezione come pagina del sito (con un indirizzo suo)

Quando una lezione è un artefatto `.html` (una lezione interattiva costruita
insieme), puoi pubblicarla come **vera pagina sfogliabile** del sito: si apre
**dentro** il sito nel browser (non si scarica) e ha un **indirizzo tutto suo**
che puoi copiare e condividere con la classe.

1. Pannello → **📖 Lezioni** → *Add lezione*.
2. **Titolo della lezione** (es. "Lezione 1 — Il caso Galileo").
3. Scegli l'**Anno di corso** e l'**UDA di appartenenza** (la cartella).
   *Suggerimento:* se l'UDA non esiste ancora, creala prima nella sezione **🗂 UDA**.
4. (Facoltativo) **Descrizione** e **Numero della lezione** (1, 2, 3… serve sia
   come numero sia per l'ordine in cui compaiono).
5. Nel campo **"Pagina HTML della lezione (l'artefatto)"** carica il file `.html`.
   (In alternativa puoi incollare un **link esterno**: in quel caso la lezione si
   aprirà in una nuova scheda.)
6. **Publish**. Dopo 1–2 minuti la lezione è online.

**Dove la trovi e come si condivide:**
- Nel menù in alto compare la voce **Lezioni**: è l'indice di tutte le lezioni,
  raggruppate per **Anno → UDA**, con un link diretto a ciascuna.
- La lezione compare anche dentro la sua UDA (con l'icona "pagina" e la scritta
  "Apri lezione").
- Aprendo la lezione, l'indirizzo nella barra del browser è quello **proprio**
  della lezione (finisce con `.../#anno/…/uda/…/lezione/…`): copialo per
  condividerlo. Chi lo apre vede subito la lezione dentro il sito.
- Dentro la pagina della lezione c'è il pulsante **"A tutto schermo"** (comodo da
  proiettare) e **"Apri in una nuova scheda"**.

> Nota: se in passato avevi caricato una lezione `.html` come **Materiale** o
> **Strumento**, continua a funzionare. Per darle un indirizzo proprio e farla
> comparire nell'indice **Lezioni**, ri-caricala qui nella sezione **Lezioni**.

> Come per gli strumenti, valgono gli artefatti **autonomi**: non serve Supabase,
> è tutto sito pubblico e si aggiorna da solo dopo *Publish*.

---

## Aggiornare il sito (file da sostituire su GitHub)

Se stai passando dalla versione precedente, su GitHub sostituisci/aggiungi:
- `index.html` (sostituisci)
- `admin/config.yml` (sostituisci)
- `data/site.json` (sostituisci)
- `data/materiali.json` (sostituisci)
- `data/anni.json`, `data/strumenti.json`, `data/video.json` (nuovi: aggiungi)

Il vecchio `data/classi.json` non serve più: puoi eliminarlo.
