# Lab IRC

Sito statico di materiali per l'ora di Religione Cattolica, online su www.labirc.it.
Il repository è pubblico: non scrivere mai qui dati personali, chiavi o nomi di studenti.

## Rami
- `main`: riceve il pannello /admin e i workflow. Le Action a orario girano solo da qui.
- `claude/lab-irc-exam-platform-v2-712y8s`: il ramo da cui si pubblica il sito. Riceve `main`
  in automatico con `sync-main-to-branch.yml`, che rigenera anche le pagine per Google e l'indice.
- Il 21/11/2026 la storia è stata ripulita (tolte `promozione/` e le versioni vecchie di `uploads/`) e i rami
  vecchi cancellati. Le copie del repository fatte prima di quel giorno vanno riscaricate e non vanno mai
  rimandate su GitHub: riporterebbero dentro la storia tolta. Matteo ha una copia di sicurezza completa.
- Giochi pesanti (i giochi 3D): non vanno in `uploads/`, si pubblicano su Cloudflare Pages (progetto
  `lab-irc-giochi`, https://giochi.labirc.it) e nel catalogo il campo `file` è l'indirizzo completo.

## Ricerca e indice del sito
- `seo/indice.py` (lo chiama `seo/genera.py` nella sincronizzazione, senza IA) scrive `data/testi.json` (testo
  dei fascicoli pagina per pagina: la casella «Cerca…» lo scarica alla prima ricerca), `data/indice-uso.json`
  e le pagine `indice/` (A–Z e una per voce; `indice/proposte/` nascosta, con i nomi da aggiungere).
- Le voci le decide Matteo in `data/indice.json` (pannello /admin → «Indice dei nomi»): nome, tipo, forme,
  esclusioni (es. «il Galileo» detto di Gesù), Wikipedia. Ogni lezione ha «Ne parlano anche…».
- `seo/indexnow.py` avvisa Bing delle pagine cambiate (codice pubblico in `indexnow.txt`). La ricerca è anche
  un indirizzo: `www.labirc.it/?q=parola`.

## Social
- **Dal 21 novembre 2026 i social non passano più da questo repository** (decisione di Matteo): le Action
  social sono state tolte, la cartella `promozione/` è stata tolta dal sito e dalla storia e da qui non si
  pubblica più niente sui social. Il lavoro si riautomatizza in un progetto a parte (anche con Codex): vedi
  `docs/stato-social.md`. Non rimettere qui workflow social né file in `promozione/` (è in `.gitignore`).
- Restano qui solo come riferimento, finché non passano al progetto nuovo: gli script dei social in `seo/`
  (`social_*.py`, `promozione.py`, `rubriche.py`, `pubblica.py`, `storie.py`, reel, voce, immagini), i dati
  `data/social-*.json` e `data/rubriche.json`, gli agenti `.claude/agents/social-*` e le regole
  `.claude/social-*.md`. I workflow tolti si trovano nella storia, prima del 21/11/2026.
- L'orologio su Cloudflare (`seo/orologio-cloudflare.js`) chiama ancora le Action tolte: GitHub risponde 404
  e non succede niente; va spento dal pannello di Cloudflare.

## Regole di lavoro
- Non pubblicare mai a mano: le pubblicazioni passano sempre dalle Action.
- Non scrivere chiavi nei file: vivono nei segreti di GitHub.
- Dopo una modifica agli script social esegui `python seo/test_social.py`.
