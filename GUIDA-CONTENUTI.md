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
- **Ricerca** → la barra in alto cerca in tutti i contenuti

Nel pannello trovi le sezioni: Impostazioni, Descrizioni degli anni, Materiali,
Strumenti, Video.

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

## 4. Aggiungere un artefatto interattivo a una lezione (come materiale)

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

## Aggiornare il sito (file da sostituire su GitHub)

Se stai passando dalla versione precedente, su GitHub sostituisci/aggiungi:
- `index.html` (sostituisci)
- `admin/config.yml` (sostituisci)
- `data/site.json` (sostituisci)
- `data/materiali.json` (sostituisci)
- `data/anni.json`, `data/strumenti.json`, `data/video.json` (nuovi: aggiungi)

Il vecchio `data/classi.json` non serve più: puoi eliminarlo.
