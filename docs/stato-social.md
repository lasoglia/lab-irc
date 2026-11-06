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
- **Crediti**: dal 6 novembre gli agenti (piano, controllo del giovedì, chat, diagnosi del mattino) usano
  l'abbonamento Claude con il segreto `CLAUDE_CODE_OAUTH_TOKEN` (dura circa un anno, si rinnova con
  `claude setup-token`); il «costo stimato» negli Issue è solo una stima, non crediti scalati. Gli script
  che chiamano l'API direttamente (regista dei reel, rubriche del weekend, caroselli del martedì, kit delle
  lezioni, sfondi) usano ancora `ANTHROPIC_API_KEY`, quindi i crediti API servono comunque.
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
| `f1e0a15`, `7bb1f3f` (ramo del sito) | Coda riallineata: «Lo screenshot non basta» all'11/11 come reel; «le indulgenze» spostata al 17/11 quando sembrava senza fascicolo (vedi `e8f81a3`: il fascicolo c'è). |
| `865de46` + `2c8a9d6` (ramo del sito) | `data/fatti-dubbi.json`: i dettagli dubbi delle lezioni arrivano a chi scrive con il divieto di usarli così come sono; il verificatore li controlla. |
| `d654553` | L'anticipo delle 13:30 si monta anche per i reel già pronti. |
| `f8b729c` | I caroselli del martedì di nuovo scrivibili (lo schema chiedeva un numero minimo di schede che l'API rifiuta); 32000 token di risposta per i testi lunghi. |
| `300a536` | Un'approvazione vale per la versione controllata: le rubriche approvate hanno in coda l'`impronta` di ciò che gli agenti hanno visto; se il testo cambia dopo, non escono (la notte del 6 lo Shabbat è stato riscritto mentre il piano lo controllava). |
| `e8f81a3` (+ `b2ca2d5` della sessione Fable) | I fascicoli caricati con il nome accorciato (le indulgenze: «iv1-1r~1.pdf») ora si trovano; il giovedì un giro leggero ricontrolla le rubriche del weekend riscritte (`/social-rubriche`); il piano si salva anche se la coda è cambiata nel frattempo, e l'Issue dice se il salvataggio è fallito. |
| `ddd0dc5` | Lo Shabbat chiude con le due candele, non con le mascotte delle classi (pesce e barca sono simboli cristiani). |

## 3. La settimana in coda (al 6 novembre, ore 2)

| Giorno | Che cosa |
|---|---|
| ven 6 | carosello «Gerusalemme, una città di memorie» (calendario di prima: alle 19). Controllo generale verde |
| sab 7, ore 11 | Shabbat sulla mezuzà, «Che cosa c'è in quell'astuccio sulla porta?» (corretto e approvato in sessione, con impronta) |
| dom 8, ore 18 e 19:30 | grande domanda su Galileo, carosello e video (corretta e approvata in sessione al terzo giro, con impronta) |
| lun 9 | reel «Chi può insegnare a chi» (montato, con l'anticipo per la storia delle 13:30) |
| mar 10 | carosello «Cambiare il modo di leggere e di partecipare», rubrica «Parole con una storia» (immagini su R2) |
| mer 11 | reel «Lo screenshot non basta» (montato, con l'anticipo) |
| gio 12 | reel del gioco «Le due vie di Lemaître» (si prepara il mercoledì sera, senza Claude) |
| ven 13 | reel «Riformare una Chiesa: le indulgenze», «Falso mito»: copione del regista scritto in sessione e controllato dal verificatore, nella cache `data/reel.json` |
| sab 14, dom 15 e dopo | servono i crediti: li sceglie e li controlla il piano di domenica 8 |

**Fino al 14 novembre il lavoro di IA si fa in sessione** (decisione di Matteo, 6 novembre): la sessione di Claude
Code (abbonamento) fa i controlli degli agenti, il piano della domenica e i copioni del regista, che mette nella
cache `data/reel.json` con la firma di `seo/reel.py`; le Action pubblicano, montano e fanno le storie. Gli orari
dell'Action del piano sono in pausa fino al 14.

**Crediti API finiti (6 novembre, notte).** Gli ultimi due piani si sono fermati con «Credit balance is too low».
Senza crediti non lavorano gli agenti (piano, controllo del giovedì, diagnosi del mattino), il regista, le
rubriche e i caroselli del martedì. Pubblicazione, storie, reel del gioco, numeri e controllo generale
non usano Claude e vanno avanti. Matteo deve ricaricare i crediti prima del piano di domenica 8 (17:23);
in alternativa, per gli agenti, il segreto `CLAUDE_CODE_OAUTH_TOKEN` (abbonamento Claude), ma regista,
rubriche e caroselli chiamano l'API e i crediti servono comunque.

## 4. Che cosa resta da fare

0. **Ricaricare i crediti API di Anthropic** (vedi sopra): senza, dal weekend del 14-15 non esce più
   niente di nuovo.
1. **Permesso `instagram_manage_insights`** (lo fa Matteo in Meta Business, poi rigenera `META_TOKEN`):
   senza, Instagram non dà copertura, salvataggi e tempo di visione e il quaderno non impara nulla sui
   reel. È il passo che più serve al miglioramento automatico.
2. **Due sessioni sullo stesso ramo**: la notte del 6 la sessione con Fable e quella di Opus hanno lanciato
   piani e cambiato la coda in parallelo, e un piano da 17 dollari è andato perso. Regola: prima di
   cambiare `data/social-coda.json` o di lanciare un piano, controllare che non ce ne sia uno in corso
   (Action «Social · piano della settimana»); ora comunque il salvataggio non si perde più.
3. **Etichette sovrapposte ai disegni** nelle cartoline del weekend (`seo/cartoline.mjs`): il guardiano
   le ha segnalate il 3/11; nelle schede ridisegnate il 6/11 non ce n'erano, ma vanno guardate.
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
