# Lab IRC

Sito statico di materiali per l'ora di Religione Cattolica, online su www.labirc.it.
Il repository è pubblico: non scrivere mai qui dati personali, chiavi o nomi di studenti.

## Rami
- `main`: riceve il pannello /admin e i workflow. Le Action a orario girano solo da qui.
- `claude/lab-irc-exam-platform-v2-712y8s`: il ramo da cui si pubblica il sito. Riceve `main`
  in automatico con `sync-main-to-branch.yml`, che rigenera anche pagine SEO e kit social.

## Social
- `seo/promozione.py` scrive il kit delle lezioni (con il carosello), `seo/rubriche.py` le strisce
  del prof e lo speciale della domenica, `seo/cartoline.mjs` tutte le immagini.
- `seo/pubblica.py` pubblica ogni giorno: lezioni lunedì, mercoledì, venerdì; striscia del prof
  martedì e sabato; «La domenica del Lab» la domenica. Dopo ogni post su Facebook e Instagram
  esce anche la sua storia verticale.
- Il giovedì esce il reel: `seo/reel.py` sceglie l'ultima lezione uscita e fa scrivere il copione
  a Claude, `seo/reel.mjs` monta il video (MP4 in `promozione/reel/`). Non va pianificato nella
  coda degli agenti: rilancia una lezione già approvata.
- `seo/coda.py` limita la pubblicazione ai post approvati in `data/social-coda.json`.
- Agenti in `.claude/agents/`, comandi in `.claude/skills/`, regole dei testi in `.claude/social-regole.md`.
- I file `seo/social_*.py` non usano l'IA: preparano i dati e controllano il lavoro degli agenti.

## Regole di lavoro
- Non pubblicare mai a mano: le pubblicazioni passano sempre dalle Action.
- Non scrivere chiavi nei file: vivono nei segreti di GitHub.
- Dopo una modifica agli script social esegui `python seo/test_social.py`.
