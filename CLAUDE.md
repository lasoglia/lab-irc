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
- Il calendario sta in `seo/social_calendario.py` (`tipo_del_giorno`). A scuola: lezioni dal lunedì al
  venerdì, sabato niente, domenica «La grande domanda». In vacanza (`data/vacanze.json`, o le date
  nazionali più comuni): una striscia del prof lunedì, mercoledì e venerdì, nient'altro.
- `seo/pubblica.py` pubblica il post del giorno con la sua storia, poi (`--coda video`) il suo video a
  fumetti col prof: `seo/reel.py` scrive i copioni delle lezioni dei prossimi 7 giorni, `seo/rubriche.py`
  quelli della domenica, `seo/reel.mjs` monta i video (MP4 in `promozione/reel/`). Il video non va
  pianificato: esce solo se il suo post è uscito.
- `seo/coda.py` limita la pubblicazione ai post approvati in `data/social-coda.json`.
- Agenti in `.claude/agents/`, comandi in `.claude/skills/`, regole dei testi in `.claude/social-regole.md`.
- I file `seo/social_*.py` non usano l'IA: preparano i dati e controllano il lavoro degli agenti.

## Regole di lavoro
- Non pubblicare mai a mano: le pubblicazioni passano sempre dalle Action.
- Non scrivere chiavi nei file: vivono nei segreti di GitHub.
- Dopo una modifica agli script social esegui `python seo/test_social.py`.
