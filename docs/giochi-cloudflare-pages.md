# Giochi pesanti su Cloudflare Pages (giochi.labirc.it)

Decisione di Matteo, 21 novembre 2026. I giochi 3D, e in generale i file pesanti, non vanno più in
`uploads/` di questo repository: ogni versione pubblicata resterebbe per sempre nella sua storia. I giochi
cifrati dal lucchetto, in più, non si comprimono, quindi ogni ripubblicazione aggiunge il file intero.

## Dove stanno
- Progetto Cloudflare Pages `lab-irc-giochi`, piano Free, pubblicato su **https://giochi.labirc.it**.
- Il dominio è un record CNAME `giochi` nella zona DNS di labirc.it su OVH, che punta all'indirizzo
  `.pages.dev` del progetto. I DNS restano su OVH.
- Costo zero: Pages Free ha traffico illimitato e dominio personalizzato gratuito; il record CNAME su OVH
  fa parte della zona DNS già pagata.

## Limiti (da ricontrollare se cambiano)
- Ogni file al massimo **25 MiB**. Un gioco più grande va diviso: modelli e texture in file a parte.
- Al massimo 20.000 file per progetto.
- Ogni pubblicazione è una fotografia completa della cartella. Sul PC serve quindi una cartella con
  **tutti** i giochi, più `index.html` (la pagina «Giochi del Lab IRC»), che si pubblica intera ogni volta:
  se si pubblica solo il gioco nuovo, gli altri spariscono. Wrangler ricarica solo i file cambiati.
- Pages toglie l'estensione: `/nome.html` viene rimandato a `/nome`. Nel catalogo si scrive comunque
  l'indirizzo con `.html`, che serve al sito per riconoscere il gioco. Il browser segue il rimando da solo,
  e anche il controllo dello SHA-256 deve seguire i rimandi.

## Come si pubblica (dal PC, progetto Programmazione IRC)
1. Il gioco finito va nella cartella locale dei giochi pubblicati, per esempio `giochi.labirc.it/`, con
   tutti gli altri giochi.
2. `npx wrangler pages deploy giochi.labirc.it --project-name lab-irc-giochi --branch main`
   La prima volta si accede con `npx wrangler login` dal browser: nessuna chiave nei file. Serve Node.js.
   Nel pannello di Cloudflare il deploy deve risultare «Production». Se risulta «Preview», si usa in
   `--branch` il ramo di produzione indicato nelle impostazioni del progetto.
3. Nel catalogo del sito va l'**indirizzo completo**: `https://giochi.labirc.it/<nome>.html`.
   - Giochi di fine unità: pannello /admin → Verifiche → nuova voce, con titolo, anno e unità. Il campo
     «File del gioco» si lascia vuoto e l'indirizzo va in «Oppure un link esterno». Oppure si scrive
     `link` (o `file`) in `data/verifiche.json`.
   - Materiale di una lezione: campo `file` del materiale con l'indirizzo completo.
   - La pagina admin/importa.html carica i file solo su GitHub (`uploads/`): **non** va usata per i giochi
     pesanti. Dal browser non può pubblicare su Cloudflare, perché servirebbe una chiave di Cloudflare
     nella pagina, e l'API di Cloudflare non accetta richieste dalle pagine web.
   - Il sito apre già così i giochi: quelli di verifica in una scheda nuova, i materiali delle lezioni
     nel visore.
   - Le pagine per Google (`seo/genera.py`) tengono il link così com'è.

## Che cosa va aggiornato in `prepara_caricamento.py`
- Oggi `--verifica` legge `https://api.github.com/repos/lasoglia/lab-irc/contents/uploads?ref=main` e
  confronta lo sha dei blob. Per i file che restano in `uploads/` (lezioni, fascicoli, i 5 giochi di oggi)
  non cambia niente: la pulizia della storia del 21/11/2026 non cambia gli sha dei blob.
- Per i giochi su Cloudflare Pages il controllo diventa: scaricare
  `https://giochi.labirc.it/<nome>.html` e confrontare lo **SHA-256 del contenuto** con quello del file
  locale. Cloudflare non espone uno sha di git.
- I giochi su Pages non vanno caricati anche in `uploads/`.

## Funziona senza rete
Un gioco a file unico, scaricato dal browser, si apre senza rete come oggi. Se un gioco 3D viene diviso in
più file, per l'uso senza rete serve anche una versione a file unico, oppure uno ZIP della cartella.

## Parti comuni (facoltativo)
- three.js (circa 0,7 MB) conviene tenerlo fuori dal blocco cifrato del lucchetto, perché è codice
  pubblico: online in un file comune, per esempio `https://giochi.labirc.it/comune/three.min.js`, scaricato
  una volta sola per tutti i giochi; nella versione da scaricare, incorporato nel file.
- Il lucchetto e il numero del lucchetto non cambiano: il numero vive solo nel segreto, mai nei file.

## Visore delle lezioni
Il visore apre i materiali in un iframe con `sandbox` senza `allow-same-origin` (protegge la sessione del
docente). Un gioco 3D che usa il blocco del puntatore (visuale con il mouse) nel visore non lo ottiene:
come gioco di verifica, che si apre in una scheda nuova, funziona. Se serve nel visore, si aggiunge
`allow-pointer-lock` al sandbox in `app/src/main.jsx`.
