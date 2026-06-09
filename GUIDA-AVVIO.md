# Guida all'avvio del tuo sito

Questa guida ti porta dal niente al sito online, con il pannello di gestione
funzionante. È pensata per chi non ha esperienza tecnica: segui i punti in
ordine. La parte "difficile" è solo il punto 6, e una volta fatto non si tocca più.

Tempo richiesto: circa 30–45 minuti, una volta sola.

---

## Cosa otterrai

- Un sito tutto tuo, gratuito, all'indirizzo `https://TUO-UTENTE.github.io/sito-irc`
- Un pannello (su `.../sito-irc/admin`) dove carichi slide, PDF e link e modifichi
  le pagine **senza toccare codice**
- Possibilità, quando vorrai, di collegare un dominio personale (es. `nometuo.it`)

---

## 1. Prepara i file

Hai scaricato l'archivio `sito-irc.zip`. Aprilo (doppio clic) per estrarre la
cartella `sito-irc`. Dentro trovi: `index.html`, le cartelle `admin`, `data`,
`uploads`, e questa guida. Lascia tutto com'è.

## 2. Crea un account GitHub (gratuito)

GitHub è il luogo dove vivranno il sito e i suoi contenuti: è davvero **tuo**.

1. Vai su **github.com** e clicca *Sign up*.
2. Scegli nome utente, email e password. Conferma l'email.

> Suggerimento: scegli un nome utente che ti rappresenti (es. `matteosestili`):
> comparirà nell'indirizzo del sito.

## 3. Crea il repository (lo spazio del sito)

1. In alto a destra clicca **+** → *New repository*.
2. **Repository name**: scrivi esattamente `sito-irc`.
3. Lascialo **Public**.
4. Clicca *Create repository*.

## 4. Carica i file del sito

1. Nella pagina del repository appena creato, clicca *uploading an existing file*
   (oppure *Add file* → *Upload files*).
2. **Trascina dentro tutto il contenuto** della cartella `sito-irc`
   (i file e le cartelle, non la cartella esterna).
3. In basso clicca *Commit changes*.

## 5. Attiva il sito (GitHub Pages)

1. Nel repository vai su **Settings** (in alto) → **Pages** (menù a sinistra).
2. Alla voce *Branch* scegli **main** e cartella **/ (root)**, poi *Save*.
3. Attendi 1–2 minuti: in cima comparirà l'indirizzo del tuo sito,
   tipo `https://TUO-UTENTE.github.io/sito-irc`.

A questo punto **il sito è già online** e mostra i materiali di esempio.
Manca solo l'accesso al pannello di gestione.

## 6. Attiva l'accesso al pannello (DecapBridge)

Questo è l'unico passaggio un po' tecnico. Usiamo **DecapBridge**, un servizio
gratuito che ti fa entrare nel pannello con email o account Google, **senza**
configurazioni complicate.

1. Vai su **decapbridge.com** e registrati (gratuito).
2. Crea un nuovo *Site* e **collega il tuo repository GitHub** `sito-irc`.
3. DecapBridge ti mostrerà alcuni valori da copiare: il **repo**
   (`TUO-UTENTE/sito-irc`) e un **identity_url** che contiene il tuo *site-id*.
4. Ora torna su GitHub, apri il file **`admin/config.yml`**, clicca la matita
   (✏️ *Edit*) e sostituisci **solo** le due righe segnate con `<-- DA DECAPBRIDGE`:
   - la riga `repo:` con il tuo `TUO-UTENTE/sito-irc`
   - la riga `identity_url:` con quella fornita da DecapBridge
   Salva con *Commit changes*.
5. In DecapBridge, alla voce *Manage collaborators*, aggiungi te stesso
   (la tua email) e imposta una password.

Fatto. L'accesso è configurato.

## 7. Entra nel pannello

1. Apri `https://TUO-UTENTE.github.io/sito-irc/admin`
2. Accedi con l'email/Google che hai impostato.
3. Vedrai due sezioni: **Impostazioni del sito** e **Materiali per le classi**.

---

## Uso quotidiano (la parte facile)

**Aggiungere un materiale:**
1. Pannello → *Materiali per le classi* → *Elenco materiali*.
2. Clicca *Add materiale*.
3. Compila Titolo, Classe (es. `3A`), scegli il Tipo.
4. Carica un **File** (slide, PDF…) **oppure** incolla un **Link**.
5. (Facoltativo) attiva *In evidenza*.
6. In alto clicca *Publish*. Dopo 1–2 minuti compare sul sito.

**Cambiare titolo, presentazione o email:** sezione *Impostazioni del sito*.

**Eliminare i 3 esempi:** entra in *Elenco materiali* e rimuovili dalla lista.

---

## Aggiungere le lezioni interattive in HTML

Le lezioni interattive che costruiamo insieme (file `.html`) si pubblicano così:
1. Carica il file `.html` nel repository, dentro una cartella `lezioni`
   (su GitHub: *Add file* → *Upload files*).
2. Nel pannello crea un nuovo materiale di tipo **Lezione interattiva**.
3. Nel campo **Link** scrivi: `lezioni/nome-del-file.html`.

Comparirà come scheda cliccabile, dentro il tuo sito.

---

## (Facoltativo) Un dominio tutto tuo

Quando vorrai un indirizzo come `nometuo.it` (circa 10–15€/anno):
1. Acquista il dominio presso un registrar (es. uno italiano qualunque).
2. Su GitHub: *Settings* → *Pages* → *Custom domain*, inserisci il dominio.
3. Segui le istruzioni per i record DNS dal pannello del registrar.

Se a questo punto vuoi, ti accompagno io nel collegamento, passo per passo.

---

## Se qualcosa non va

- Il sito non si vede dopo il punto 5 → attendi qualche minuto e ricarica.
- Il pannello `/admin` mostra errore di accesso → ricontrolla le due righe del
  punto 6.4 (devono combaciare esattamente con i valori di DecapBridge).
- In ogni caso, scrivimi: ricostruiamo insieme il passaggio che si è inceppato.
