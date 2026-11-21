# Giochi pesanti su Cloudflare Pages (giochi.labirc.it)

Decisione di Matteo, 21 novembre 2026. I giochi 3D, e in generale i giochi più pesanti di 5 MB, non vanno
più in `uploads/` di questo repository: ogni versione pubblicata resterebbe per sempre nella sua storia, e i
giochi chiusi dal lucchetto non si comprimono. Vanno su Cloudflare Pages; il sito li collega.

## Dove stanno
- Progetto Cloudflare Pages `lab-irc-giochi` (piano Free, caricamento diretto, senza GitHub), pubblicato
  su **https://giochi.labirc.it** (indirizzo tecnico `lab-irc-giochi.pages.dev`).
- Il dominio è il record CNAME `giochi` → `lab-irc-giochi.pages.dev.` nella zona DNS di labirc.it su OVH.
  I DNS restano su OVH.
- Costo zero: Pages Free ha traffico illimitato e dominio personalizzato gratuito; il CNAME fa parte della
  zona DNS già pagata.

## Limiti (da ricontrollare se cambiano)
- Ogni file al massimo **25 MiB**: un gioco più grande va diviso (modelli e texture in file a parte).
- Al massimo 20.000 file per progetto.
- Ogni pubblicazione è una fotografia completa della cartella: se si pubblica solo il gioco nuovo, gli altri
  spariscono. Wrangler ricarica solo i file cambiati.
- Pages toglie l'estensione: `/nome.html` viene rimandato a `/nome`. È normale.

## La cartella dei giochi pubblicati (sul PC, progetto Programmazione IRC)
Contiene sempre **tutto** il sito dei giochi:
- `index.html`: la pagina «Giochi del Lab IRC» (quella pubblicata il 21/11/2026);
- `404.html`: una pagina semplice «Gioco non trovato», così un file che manca risponde «non trovato»
  invece di mostrare `index.html`;
- `_headers`, con esattamente queste righe:
  ```
  /*
    X-Robots-Tag: noindex
    Access-Control-Allow-Origin: https://www.labirc.it
  ```
  La prima tiene i giochi fuori da Google. La seconda permette alla pagina Importa del sito di leggere i
  giochi pubblicati per controllarli: senza, Importa non può collegare i giochi pesanti.
- tutti i giochi, **chiusi a chiave**, con il loro nome: minuscole e trattini, es. `v-3-g-<titolo>-gioco.html`.

## Come si pubblica un gioco
1. **Chiudere a chiave** con lo stesso lucchetto di Importa. Lo strumento è `admin/chiudi-gioco.mjs`, che va
   copiato in una cartella insieme ad `admin/lucchetto.js` (si trovano su
   https://www.labirc.it/admin/chiudi-gioco.mjs e https://www.labirc.it/admin/lucchetto.js). Serve Node.js 20+.
   ```
   node chiudi-gioco.mjs <cartella dei giochi pubblicati>
   ```
   Chiede il numero segreto del lucchetto, che non si salva da nessuna parte. In alternativa lo legge da
   `LUCCHETTO_NUMERO` impostata solo in quella finestra del terminale. Chiude i giochi in chiaro e rinnova
   quelli già chiusi fino al 31 agosto. Riscrive i file al loro posto.
2. **Controllare** che nessun gioco sia aperto (non serve il numero):
   ```
   node chiudi-gioco.mjs --controlla <cartella dei giochi pubblicati>
   ```
   Se uno risulta APERTO non si pubblica.
3. **Pubblicare** tutta la cartella:
   ```
   npx wrangler pages deploy <cartella> --project-name lab-irc-giochi --branch main
   ```
   La prima volta si accede con `npx wrangler login` dal browser: nessuna chiave nei file. Nel pannello di
   Cloudflare il deploy deve risultare «Production»; se risulta «Preview», si usa in `--branch` il ramo di
   produzione indicato nelle impostazioni del progetto.
4. **Collegarlo al sito**: Matteo trascina in Importa (admin/importa.html) il pacchetto preparato come sempre,
   con il gioco dentro (in chiaro o chiuso, è uguale). Importa vede che il gioco è già su giochi.labirc.it,
   controlla che lì sia chiuso a chiave e uguale (lo riapre con il numero segreto) e scrive nel catalogo il
   link, senza caricarlo su GitHub.
   - Se online il gioco è senza lucchetto, è diverso o è chiuso con un altro numero, Importa si ferma e lo dice.
   - Un gioco più pesante di 5 MB che non è ancora online viene fermato: su GitHub non va.
   - In alternativa, a mano: pannello /admin → Verifiche → nuova voce, con il campo «File del gioco» vuoto e
     `https://giochi.labirc.it/<nome>.html` in «Oppure un link esterno».

## Ogni settembre
Il lucchetto vale fino al 31 agosto. A settembre si rilancia `node chiudi-gioco.mjs` sulla cartella e si
ripubblica. Il pulsante «Chiudi a chiave (o rinnova)» di Importa rinnova solo i giochi in `uploads/`.

## Per gli studenti
- La password è quella del giorno, come per gli altri giochi: giorno × mese + il numero segreto.
- Su giochi.labirc.it la password va scritta una volta al giorno anche se è già stata scritta nella pagina
  Verifiche del sito, perché è un altro indirizzo.
- I giochi di verifica si aprono in una scheda nuova. Il lucchetto controlla la data con il server, quindi
  per aprirli serve la connessione, come per quelli in `uploads/`.

## prepara_caricamento.py
- Per i file che restano in `uploads/` (lezioni, fascicoli, giochi leggeri) la verifica non cambia: stesso
  repository, ramo `main`, cartella `uploads/`. La pulizia della storia del 21/11/2026 non ha cambiato gli sha
  dei blob.
- I giochi su Cloudflare non vanno in `uploads/`: il controllo lo fa Importa al momento del collegamento. Se si
  vuole anche un controllo dallo script: scaricare `https://giochi.labirc.it/<nome>` e confrontare lo SHA-256
  con il file chiuso della cartella pubblicata (non con quello in chiaro).

## Parti comuni (facoltativo)
three.js, che è codice pubblico, si può tenere fuori dal blocco cifrato: online in un file comune
(es. `https://giochi.labirc.it/comune/three.min.js`), scaricato una volta sola per tutti i giochi.

## Visore delle lezioni
Il visore apre i materiali in un iframe con `sandbox` senza `allow-same-origin`, che protegge la sessione del
docente. Un gioco che usa il blocco del puntatore (visuale con il mouse) lì non lo ottiene. Come gioco di
verifica, che si apre in una scheda nuova, funziona. Se serve nel visore, si aggiunge `allow-pointer-lock`
al sandbox in `app/src/main.jsx`.
