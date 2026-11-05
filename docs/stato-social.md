# Stato dei social · passaggio di consegne (6 novembre 2026)

Per chi riprende il lavoro sui social del Lab (un'altra sessione di Claude, o Matteo). Completa
`docs/revisione-social-2026-11-04.md` (la revisione della sessione con Fable): qui ci sono le decisioni
prese con Matteo, che cosa si è rotto e come è stato sistemato, e che cosa resta da fare. Il repository è
pubblico: niente chiavi, niente dati personali, niente nomi di studenti.

## 1. Le decisioni di Matteo (da rispettare)

- **Voce dei reel**: Gemini «Sadachbia», modello 2.5 (con riserva 3.1 se finisce la quota del giorno),
  stile da narratore appassionato (`GEMINI_STILE_NARRATORE` in `seo/voce.py`), velocità 1.03. Scelta il
  4 novembre dopo Charon e Rasalgethi. Il campione della voce non va mai nel repository.
- **Scritte dei reel**: a tempo con la voce vera, parola per parola (Whisper su Cloudflare Workers AI).
- **Regista libero**: «unico obiettivo è diventare virale». Restano solo i paletti di fondo: fatti veri,
  citazioni esatte, rispetto, attenzione ai minori, almeno un'immagine vera (pagina del fascicolo) e una
  scena della lezione interattiva. Il regista è Fable con pensiero esteso, poi il direttore creativo.
- **Lezione interattiva**: non si «presenta»; si usa per illustrare la curiosità del reel (come nel reel
  su Dionigi il Piccolo e la cronologia di Gesù).
- **Durata**: i reel possono arrivare a circa un minuto, se serve.
- **Personaggi inventati**: sì, nello stile C (vettoriale, con i colori del Lab), sempre con la scritta
  «personaggio inventato · immagine generata con IA». Mai Gesù, Dio, Maria, santi, angeli, papi, figure
  bibliche o storiche vere, persone reali, bambini o ragazzi, violenza. Nano Banana ha quota gratuita
  zero: dipinge FLUX su Cloudflare (`seo/personaggi.py`).
- **Storie**: 7:45, 13:30 e 20:45, su Instagram e su Facebook, anche video. Le API non permettono adesivi
  con link: le storie rimandano al profilo.
- **Giochi di verifica**: nei 14 giorni dopo l'uscita, il giovedì il reel registrato dal gioco. Il numero
  del lucchetto vive solo nel segreto `LUCCHETTO_NUMERO`, mai nei file.
- **Crediti**: per ora si usa `ANTHROPIC_API_KEY` (crediti API). `CLAUDE_CODE_OAUTH_TOKEN` resta la
  strada di riserva se i crediti finiscono.
- **Fuori dai social non si tocca nulla** in questa fase (i sondaggi con Supabase restano in pausa). Mai
  toccare `esami/`, il file CNAME, la sorgente di Pages, `RAMO = 'main'` in `admin/importa.html`,
  `branch: main` e `repo` in `admin/config.yml`. Mai pubblicare a mano: escono solo dalle Action.

## 2. Il guasto del 4-5 novembre e che cosa è stato corretto

Dal passaggio delle immagini a Cloudflare R2 nessun post usciva: prima di pubblicare `seo/meta.py`
controllava le immagini con una richiesta HEAD senza User-Agent, che r2.dev rifiuta, e quindi diceva
sempre «immagini non ancora online». Il 4 e il 5 novembre non è uscito nulla.

| Commit (su `main`, salvo dove detto) | Che cosa |
|---|---|
| `d15e0cd` | Il controllo «online» chiede il primo byte con GET e un User-Agent, come `seo/media_r2.py`. |
| `9700edb` | `seo/social_verifica.py` e l'Action «Social · controllo generale»: senza pubblicare niente controlla R2, le immagini del post di oggi, che Instagram scarichi da R2 (contenitore mai pubblicato), il bot di Telegram e la coda dei giorni dopo. Provata il 5/11 alle 23:30 UTC: tutto verde. |
| `9700edb` | La rete di sicurezza serale, se GitHub la fa partire dopo mezzanotte, non pubblica (prima avrebbe pubblicato di notte il post del giorno nuovo). |
| `9700edb` | Il martedì non esce come carosello una lezione messa in coda per un giorno di reel (`senza_reel` in `seo/pubblica.py`). |
| `cfd1bfb` | Rubriche del weekend nei formati che il guardiano controlla (titolo su Telegram, link nella bio su Instagram, una battuta, schede entro 190 caratteri, hashtag fissi, niente «domande dai banchi»); per tutti i testi le correzioni di forma senza IA (`rifinisci_canali`, `accorcia_schede` in `seo/promozione.py`); le obiezioni dei controllori in `data/rubriche-da-rifare.md` tornano a chi riscrive. Storie del mattino con l'ora presa dal giorno della settimana. |
| `29bff2a` | I numeri dei post ogni mattina, nel controllo delle uscite (prima solo la domenica). |
| `f1e0a15` (ramo del sito) | Coda riallineata: «Lo screenshot non basta» all'11/11 e «le indulgenze» al 13/11, come reel. |

## 3. La settimana in coda (al 6 novembre)

| Giorno | Che cosa |
|---|---|
| ven 6 | carosello «Gerusalemme, una città di memorie» (calendario di prima: alle 19) |
| sab 7, dom 8 | Shabbat e grande domanda riscritti la notte del 6 con le obiezioni; vanno in coda solo se il piano della settimana lanciato la stessa notte li approva |
| lun 9 | reel «Chi può insegnare a chi» (già montato, voce Sadachbia, scritte a tempo) |
| mar 10 | carosello «Cambiare il modo di leggere e di partecipare» (rubrica «Parole con una storia») |
| mer 11 | reel «Lo screenshot non basta» |
| gio 12 | reel del gioco «Le due vie di Lemaître» (si prepara il mercoledì sera) |
| ven 13 | reel «Riformare una Chiesa: le indulgenze» |
| sab 14, dom 15 | li controlla il piano di domenica 8 |

## 4. Che cosa resta da fare

1. **Permesso `instagram_manage_insights`** (lo fa Matteo in Meta Business, poi rigenera `META_TOKEN`):
   senza, Instagram non dà copertura, salvataggi e tempo di visione e il quaderno non impara nulla sui
   reel. È il passo che più serve al miglioramento automatico.
2. **Rubriche respinte**: ora si riscrivono da sole con le obiezioni, ma il controllo successivo arriva
   solo al piano della domenica, quando il loro sabato e la loro domenica possono essere già passati.
   Proposta: un secondo giro del piano a metà settimana, solo per le rubriche.
3. **Etichette sovrapposte ai disegni** nelle cartoline del weekend (`seo/cartoline.mjs`): il guardiano
   le ha segnalate il 3/11 (scheda 6 dello Shabbat, cartolina 7 della domenica).
4. **Fatti dubbi nelle lezioni**: l'elenco è nel §7 della revisione. Due precisazioni. «Quo primum» è
   datata «il giorno prima delle Idi di luglio» del 1570, cioè il 14 luglio, come dicono quasi tutte le
   fonti: il fascicolo dice 13. Per «Dignitas infinita» il dubbio è da ricontrollare prima di correggere:
   il 25 marzo 2024 è l'udienza in cui il papa la approva e l'8 aprile la pubblicazione, ma il documento
   sul sito vaticano porta la data del 2 aprile 2024 (anche nell'indirizzo), che è quella del fascicolo.
   Chi scrive i post deve evitare i dettagli dubbi finché le lezioni non sono corrette.
5. **TikTok**: Matteo crea l'account. Poi un'app TikTok for Developers: si parte dalla bozza nella casella
   dell'app (`video.upload`, senza revisione) e si chiede la revisione per pubblicare da soli.
6. **ChatGPT Plus**: non ha un'API automatica per le immagini (il piano Plus e le API si pagano a parte).
   Uso possibile a mano: creare una volta una «compagnia» di 15-20 personaggi nello stile C, 2-3 pose
   ciascuno, da mettere su R2 e far scegliere al regista.
7. **Progetto Reel**: fase 5 (i copioni dei reel controllati dagli agenti prima dell'uscita) e fase 8
   (rifare come reel i post già usciti: elenco nel §6 della revisione). La fase 7 (caroselli del martedì)
   l'ha fatta la sessione con Fable.
8. **Bio e vetrina** dicono ancora «ogni giorno di scuola una lezione»: si cambiano a mano.

## 5. Come si controlla che tutto funzioni

- **«Social · controllo generale»** (Action, sola lettura): da lanciare dopo ogni modifica o quando un post
  non esce. Se qualcosa blocca il post di oggi fallisce, e GitHub manda un'email.
- **«Social · controllo delle uscite»** ogni mattina: se manca un post apre un Issue «allarme» con la
  diagnosi del meccanico; ora salva anche i numeri dei post.
- **«Social · piano della settimana»** la domenica: Issue «piano» con le scelte e i controlli.
- Dopo ogni modifica agli script social: `python seo/test_social.py`.
