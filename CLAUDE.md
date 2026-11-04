# Lab IRC

Sito statico di materiali per l'ora di Religione Cattolica, online su www.labirc.it.
Il repository è pubblico: non scrivere mai qui dati personali, chiavi o nomi di studenti.

## Rami
- `main`: riceve il pannello /admin e i workflow. Le Action a orario girano solo da qui.
- `claude/lab-irc-exam-platform-v2-712y8s`: il ramo da cui si pubblica il sito. Riceve `main`
  in automatico con `sync-main-to-branch.yml`, che rigenera anche pagine SEO e kit social.

## Social
- `seo/promozione.py` scrive il kit delle lezioni (con il carosello), `seo/rubriche.py` le strisce
  del prof e «La grande domanda» della domenica (carosello di 10 immagini e video), `seo/cartoline.mjs` tutte le immagini.
- Il calendario sta in `seo/social_calendario.py` (`tipo_del_giorno`), dal 9 novembre 2026 più reel che caroselli.
  A scuola: lunedì, mercoledì e venerdì il reel di una lezione (19:00), martedì il carosello di una lezione
  (13:30), giovedì niente, sabato «Lo Shabbat del Lab» (11:00; cultura ebraica: Claude cerca solo su fonti
  ebraiche autorevoli, `FONTI_EBRAICHE` in `seo/rubriche.py`, e scrive solo ciò che ha trovato), domenica
  «La grande domanda» (carosello alle 18, video alle 19:30). In vacanza (`data/vacanze.json`, o le date
  nazionali più comuni): una striscia del prof lunedì e giovedì, nient'altro. Gli orari li dà l'orologio
  su Cloudflare (`seo/orologio-cloudflare.js`); l'Action programmata di GitHub è la rete di sicurezza serale.
- Immagini e video dei post non stanno nel repo: `seo/cartoline.mjs` disegna solo i post in coda,
  `seo/media_r2.py` li carica su Cloudflare R2 (cancellati dopo 30 giorni).
- `seo/pubblica.py` pubblica il post del giorno con la sua storia, poi (`--coda video`) il suo video a
  fumetti col prof: `seo/reel.py` scrive i copioni delle lezioni dei prossimi 7 giorni, `seo/rubriche.py`
  quelli della domenica, `seo/reel.mjs` monta i video (MP4 in `promozione/reel/`). Il video non va
  pianificato: esce solo se il suo post è uscito.
- Storie ogni giorno (`seo/storie.py` + `seo/storie.mjs`, Action «Social · storie del giorno»): 7:45 la
  ricorrenza o la lezione di oggi, 13:30 «stasera alle 19» nei giorni di reel, 20:45 il reel di oggi come storia.
- Giochi di verifica: nei 14 giorni dopo l'uscita di un gioco (`data/social-giochi.json`) il giovedì esce il
  reel di una partita registrata (`seo/gioco_registra.mjs`, `seo/gioco_reel.py`, Action «Social · reel del gioco»).
- I reel delle lezioni li scrive il regista (`seo/regista.py`) e li monta `seo/reel_lezioni.py` con `seo/reel2.mjs`
  e la voce Gemini (`seo/voce.py`); `REEL_MOTORE=vecchio` torna al reel di prima.
- `seo/immagini_ia.py` fa gli sfondi pittorici di video e copertine del weekend: Claude descrive la
  scena (mai persone, volti, Dio o santi, mai scritte), Cloudflare Workers AI la dipinge gratis
  (segreti CLOUDFLARE_ACCOUNT_ID e CLOUDFLARE_API_TOKEN; senza, non fa nulla).
- `seo/coda.py` limita la pubblicazione ai post approvati in `data/social-coda.json`.
- Il Lab impara: `seo/social_metriche.py` misura ogni post (reel con tempo di visione), e ogni settimana
  l'esploratore cerca idee nuove e l'analista aggiorna `data/social-quaderno.json` (regole imparate,
  esperimento della settimana, idee; controllato da `seo/social_quaderno.py`). Chi scrive i post riceve
  da solo le regole confermate e l'istruzione dell'esperimento.
- Agenti in `.claude/agents/`, comandi in `.claude/skills/`, regole dei testi in `.claude/social-regole.md`,
  metodo per angoli, ganci, copioni e didascalie in `.claude/social-metodo.md` (`/social-reel <argomento>` lo applica tutto).
- I file `seo/social_*.py` non usano l'IA: preparano i dati e controllano il lavoro degli agenti.

## Regole di lavoro
- Non pubblicare mai a mano: le pubblicazioni passano sempre dalle Action.
- Non scrivere chiavi nei file: vivono nei segreti di GitHub.
- Dopo una modifica agli script social esegui `python seo/test_social.py`.
