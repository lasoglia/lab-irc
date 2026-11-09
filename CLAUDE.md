# Lab IRC

Sito statico di materiali per l'ora di Religione Cattolica, online su www.labirc.it.
Il repository è pubblico: non scrivere mai qui dati personali, chiavi o nomi di studenti.

## Rami
- `main`: riceve il pannello /admin e i workflow. Le Action a orario girano solo da qui.
- `claude/lab-irc-exam-platform-v2-712y8s`: il ramo da cui si pubblica il sito. Riceve `main`
  in automatico con `sync-main-to-branch.yml`, che rigenera anche pagine SEO e kit social.

## Social
- **Dal 9 novembre 2026 Claude è spento in tutte le Action** (decisione di Matteo, piano ridotto): nessun workflow passa
  ANTHROPIC_API_KEY o CLAUDE_CODE_OAUTH_TOKEN, il piano della settimana e la chat con @claude non partono, e gli
  script girano «senza IA». Le Action pubblicano solo ciò che è già approvato in coda. Il lavoro social passerà
  fuori da GitHub (Cloudflare o altro, da decidere con Matteo): vedi docs/stato-social.md.
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
  e la voce Gemini (`seo/voce.py`); `REEL_MOTORE=vecchio` torna al reel di prima. Il regista è libero (un solo
  obiettivo: diventare virale restando vero); riceve la rubrica del giorno dal calendario, le curiosità verificate
  della lezione (`seo/curiosita.json`: frasi esatte del fascicolo con la pagina) e le note di regia del piano
  settimanale (campo `regia` della voce in `data/social-coda.json`).
- Ogni uscita ha una rubrica (`seo/social_calendario.rubrica_del_giorno`, da `docs/progetto-rubriche.md`): lunedì
  «Lo sapevi?», mercoledì a rotazione, venerdì «Falso mito», martedì a rotazione «Parole con una storia», «In classe
  domani», «In numeri». I caroselli del martedì li scrive `seo/caroselli.py` (citazioni controllate nel PDF, modelli
  «Notte del Lab» in `seo/cartoline.mjs`, provini con `python seo/caroselli.py --provino CARTELLA`); se la lezione
  non regge la rubrica esce il carosello del kit.
- `seo/immagini_ia.py` fa gli sfondi pittorici di video e copertine del weekend: Claude descrive la
  scena (mai persone, volti, Dio o santi, mai scritte), Cloudflare Workers AI la dipinge gratis
  (segreti CLOUDFLARE_ACCOUNT_ID e CLOUDFLARE_API_TOKEN; senza, non fa nulla).
- `seo/coda.py` limita la pubblicazione ai post approvati in `data/social-coda.json`.
- Il Lab impara: `seo/social_metriche.py` misura ogni post (reel con tempo di visione), e ogni settimana
  l'esploratore cerca idee nuove e l'analista aggiorna `data/social-quaderno.json` (regole imparate,
  esperimento della settimana, idee; controllato da `seo/social_quaderno.py`). Le regole confermate (con il loro
  ambito: reel, caroselli, storie, calendario…) e l'esperimento in corso arrivano da soli a chi scrive i post,
  al regista e al direttore creativo dei reel, al redattore e al calendarista; i reel dei giochi scelgono la
  variante che rende di più.
- Agenti in `.claude/agents/` (il direttore decide la linea della settimana, il calendarista sceglie le lezioni,
  verificatore e guardiano controllano, ricercatore e redattore correggono, il regista scrive le note di regia,
  esploratore e analista fanno imparare il Lab), comandi in `.claude/skills/`, regole dei testi in
  `.claude/social-regole.md`, metodo per angoli, ganci, copioni e didascalie in `.claude/social-metodo.md`
  (`/social-reel <argomento>` lo applica tutto).
- I file `seo/social_*.py` non usano l'IA: preparano i dati e controllano il lavoro degli agenti.
- Per sapere se un post può uscire, senza pubblicare niente: Action «Social · controllo generale»
  (`seo/social_verifica.py`: R2, immagini online, Instagram che scarica da R2, Telegram, coda dei giorni dopo).
  Ogni mattina il controllo delle uscite apre un Issue «allarme» se un post manca e salva i numeri dei post.
- Le rubriche del weekend respinte dagli agenti si riscrivono da sole con le loro obiezioni
  (`data/rubriche-da-rifare.md`, una sezione `## <chiave>` per rubrica) e il giovedì un giro leggero degli
  agenti le ricontrolla (`/social-rubriche`, stessa Action del piano). Un'approvazione vale per la versione
  controllata: se una rubrica cambia dopo, non esce (`impronta` in `data/social-coda.json`).
- Decisioni di Matteo, stato e cose aperte: `docs/stato-social.md` (passaggio di consegne).

## Regole di lavoro
- Non pubblicare mai a mano: le pubblicazioni passano sempre dalle Action.
- Non scrivere chiavi nei file: vivono nei segreti di GitHub.
- Dopo una modifica agli script social esegui `python seo/test_social.py`.
