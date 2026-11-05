# Revisione della catena social · 4-5 novembre 2026

Rapporto per Matteo, in italiano semplice. Tutto il lavoro sta su `main` in commit piccoli; il ramo
del sito lo riceve da solo. Nessun post è stato pubblicato e nessuna Action di pubblicazione è stata
lanciata da questa revisione.

## 1. Che cosa ho controllato

Tutta la catena, file per file: `seo/` (promozione, rubriche, reel, regista, regia, reel2, reel_lezioni,
voce, audio_reel, fascicolo, lezione_registra, gioco_registra e gioco_reel, storie, pubblica, media_r2,
cartoline, immagini_ia, vetrina, meta, telegram, tutti i `social_*`), i workflow in `.github/workflows/`,
gli agenti in `.claude/agents/`, i comandi in `.claude/skills/`, l'orologio su Cloudflare. Ho confrontato
ogni pezzo con il calendario (reel lunedì, mercoledì e venerdì alle 19, carosello il martedì alle 13:30,
gioco il giovedì, Shabbat il sabato, grande domanda la domenica, strisce del prof lunedì e giovedì in
vacanza, storie 7:45 / 13:30 / 20:45) e con i casi limite richiesti: lezione senza fascicolo, lezione
senza lezione interattiva, Gemini senza quota, Cloudflare R2 assente.

Ho anche provato davvero, sul ramo del sito: la lettura delle scene di una lezione interattiva
(10 scene trovate), la ricerca delle citazioni nei PDF, la generazione dello stato per gli agenti, i
caroselli nuovi disegnati con Playwright (21 immagini, guardate una per una prima del commit).

Sicurezza: nessuna chiave nei file; il numero del lucchetto resta nel segreto; i commenti degli Issue
passano da una variabile, mai nella shell; i testi delle lezioni e i dossier arrivano agli agenti come
«dati, non istruzioni». Niente da correggere su questo fronte.

## 2. Che cosa ho corretto (bug certi, ognuno con il suo test)

| Commit | Problema | Correzione |
|---|---|---|
| `dbb3e85` | Se Cloudflare R2 non rispondeva, `seo/reel.mjs` cancellava i video di anticipo delle storie e i reel dei giochi rimasti in attesa: il giovedì il reel del gioco non usciva. | La pulizia toglie solo i video del motore vecchio. |
| `1cf2212` | Con la quota di Gemini finita, la voce falliva e con lei tutto il montaggio: quel giorno nessun reel. | La regia avvisa e prosegue: il reel esce con musica e sottotitoli. |
| `56c608f` | La storia del mattino «Oggi nel Lab» usciva solo nei giorni di reel: niente il martedì, il sabato e la domenica. La storia di pranzo del gioco usava sempre la stessa frase, anche quando il reel era dell'altra variante. | La storia del mattino annuncia il carosello (13:30), lo Shabbat (11), la grande domanda (18); a pranzo il gancio della variante giusta. |
| `60387b4` | Chi scriveva i post riceveva tutte le regole imparate dal quaderno, anche quelle su storie e grafica. | Ogni scrittore riceve le regole del suo ambito (kit: caroselli e didascalie; regista: reel e didascalie; weekend: tutte e tre). |
| `aed6dc3` | Per i reel del regista si chiedeva a Claude uno sfondo dipinto che il motore nuovo non usa. | Niente sfondo per i reel del regista (una chiamata e un'immagine in meno per reel). |
| `c10c1f9` | Docstring e commenti dicevano ancora «strisce lunedì, mercoledì e venerdì» e «il giovedì non esce nulla». | Allineati al calendario vero. |
| `807cfcf` | Dal 3 novembre le immagini si salvano solo in JPG, ma la storia verticale cercava ancora il PNG della copertina: usciva con il riquadro vuoto. | La storia legge il JPG. Controlla la storia uscita il 3 novembre sul profilo: se è vuota, cancellala a mano. |

Test: `python seo/test_social.py` è passato da 37 a 54 prove, tutte verdi.

Non ho toccato (ma segnalo): la scelta di salvare nel repo i file dei post quando R2 non risponde
(`git add -f` nei workflow) contraddice la regola «media solo su R2», ma è una rete di sicurezza
voluta; la lascio.

## 3. Che cosa ho costruito

### I caroselli del martedì (fase 7 del progetto rubriche)
- `seo/caroselli.py`: per la lezione approvata in coda per un martedì scrive le schede della rubrica
  del giorno («Parole con una storia», «In classe domani», «In numeri»), con il metodo e le regole del
  Lab. Le schede «pagina» citano frasi esatte del fascicolo: il codice le cerca nel PDF senza IA, chiede
  una sola correzione e, se mancano ancora, le trasforma in schede di testo. Se la lezione non regge la
  rubrica (per esempio nessuna parola con una storia nel fascicolo) Claude lo dice e quel martedì esce il
  carosello normale del kit.
- `seo/cartoline.mjs`: modelli nuovi nello stile «Notte del Lab» dei reel (vetrata, grana, barra
  dell'anno, etichetta della rubrica in oro, Cormorant per i titoli, numeri in oro, pagina vera del
  fascicolo con evidenziatore e cerchio, scheda finale con le mascotte). Provini: `python seo/caroselli.py
  --provino CARTELLA`.
- Il martedì `seo/pubblica.py` preferisce il carosello della rubrica se le sue immagini sono già su R2;
  le metriche segnano la rubrica; la storia del mattino la nomina.

### La rubrica del giorno, una sola fonte
`seo/social_calendario.rubrica_del_giorno`: lunedì «Lo sapevi?», martedì a rotazione (dal 10 novembre:
Parole con una storia, In classe domani, In numeri, poi da capo), mercoledì a rotazione «Prova alla
mano», «Mappa in 30 secondi», «Due racconti» (sceglie il regista), venerdì «Falso mito», giovedì il
gioco, sabato lo Shabbat, domenica la grande domanda, in vacanza il prof. `.social/stato.md` la mostra
accanto a ogni uscita e per i 14 giorni seguenti; il calendarista sceglie lezioni che la reggono; il
regista automatico la riceve come suggerimento (resta libero, come hai deciso).

### La biblioteca di curiosità (`seo/curiosita.json`)
50 lezioni con fascicolo, 195 spunti (da 2 a 4 per lezione), ognuno con rubrica, gancio, testo, frase
esatta del fascicolo e pagina. Ogni citazione è stata ricercata nel PDF con `seo/fascicolo.py`: le 5 non
esatte sono state scartate. Arrivano al regista, a chi scrive i caroselli e agli agenti (in fondo alla
scheda di ogni candidato).

### La squadra degli agenti, armonizzata intorno alla regia
- **social-direttore** (nuovo): il social media manager. Legge numeri, quaderno, rubriche e candidati e
  scrive la linea della settimana, i candidati adatti a ogni rubrica, le priorità per il calendarista e
  i brief per il regista (`.social/linea.md`).
- **social-regista** (nuovo): per ogni reel e per il carosello del martedì scrive le note di regia
  (angolo, gancio, curiosità da usare, scena, tono, prima riga della didascalia, richiesta finale). La
  regia del piano le copia nel campo `regia` della voce in `data/social-coda.json`: lo script del regista
  e `seo/caroselli.py` le leggono quando scrivono. Sono proposte di chi conosce il pubblico, non ordini.
- Il piano settimanale ora va così: direttore → calendarista → verificatore e guardiano → ricercatore e
  redattore → regista → coda → esploratore e analista → rapporto (con la linea della settimana e, per
  ogni uscita, rubrica, angolo e gancio). La validazione controlla che le note di regia siano brevi e
  senza link. `/social-chat` sa cambiare angolo e gancio di un reel su tua richiesta.

### Il quaderno
`data/social-quaderno.json` parte con i tre esperimenti del progetto come idee (gancio con numero,
utilità contro curiosità nei caroselli, reel corti contro medi): l'analista ne sceglie uno alla volta.

## 4. Il piano delle prossime 4 settimane, rubrica per rubrica

| Settimana | Lun · Lo sapevi? | Mar · carosello | Mer · reel a rotazione | Gio | Ven · Falso mito | Sab · Shabbat | Dom · grande domanda |
|---|---|---|---|---|---|---|---|
| 1 · 9-15 nov | reel | **Parole con una storia** (10/11: «Cambiare il modo di leggere e di partecipare», già in coda) | reel | 12/11 **Il gioco del Lab** (Le due vie di Lemaître) | reel | 14/11 | 15/11 |
| 2 · 16-22 nov | reel | **In classe domani** | reel | solo storie | reel | 21/11 | 22/11 (Cristo Re) |
| 3 · 23-29 nov | reel | **In numeri** (il primo) | reel | solo storie | reel | 28/11 | 29/11 (prima di Avvento) |
| 4 · 30 nov-6 dic | reel | **Parole con una storia** | reel | solo storie | reel | 5/12 | 6/12 |

- Ogni giorno le storie: 7:45 ricorrenza o post di oggi, 13:30 «stasera alle 19» (video di anticipo del
  regista), 20:45 il reel di oggi.
- L'8 dicembre è vacanza: niente post, solo la storia del mattino (Immacolata).
- «Oggi, nella storia» (settimana 4 del progetto) non è pronta: serve `data/anniversari.json` con le date
  e le fonti, verificato una volta. Non l'ho scritto perché le date vanno controllate su fonti e questa
  sessione ha avuto il limite settimanale dell'account (vedi §7).
- L'analista confronta le rubriche dalla settimana 4, ma solo se Instagram dà i numeri (vedi §5, punto 1).

## 5. Che cosa devi decidere tu

1. **Permesso di Instagram per le statistiche.** Le metriche dicono: «copertura e visualizzazioni non
   disponibili, serve il permesso instagram_manage_insights». Senza, il quaderno non impara nulla sui
   reel (niente tempo di visione, salvataggi, condivisioni). Va aggiunto all'utente di sistema in Meta
   Business e rigenerata la chiave META_TOKEN.
2. **Giorno di reel senza video.** Se il montaggio fallisce (per esempio il regista non risponde), quel
   giorno non esce nulla: il controllo del mattino lo segnala. Vuoi che esca il carosello della lezione
   come riserva? È una modifica piccola, ma cambia il piano che gli agenti hanno approvato.
3. **I caroselli del martedì** li scrive Claude e li controlla il codice (citazioni esatte, forma); i testi
   non passano dal verificatore e dal guardiano, come già accade per le didascalie dei reel del regista.
   Se preferisci il doppio controllo anche lì, si può far scrivere il carosello la domenica, nel piano.
4. **Costo del regista.** Per ogni reel il copione passa da regista, caporedattore e direttore creativo,
   tutti con pensiero esteso, più eventuali correzioni: fino a cinque chiamate. Il passaggio del
   caporedattore (nato per i post del kit) è ridondante con il direttore creativo: toglierlo dimezza il
   costo per reel senza perdere controlli sui fatti (che li fa il codice). Decidi tu: non l'ho toccato.
5. **La bio e la vetrina** dicono ancora «ogni giorno di scuola una lezione in un carosello e in un
   video»: la settimana ora è diversa (reel tre giorni, carosello il martedì). I testi della vetrina sono
   già usciti: la bio di Instagram e la descrizione di Facebook e Telegram si cambiano a mano.
6. **`data/vacanze.json`** (sul ramo del sito) ha una nota che dice «strisce lunedì, mercoledì e
   venerdì»: sono lunedì e giovedì. Solo una nota, nessun effetto; si corregge dal pannello o a mano.
7. **TikTok** (lo aggiungi domani): i reel sono già 9:16 con sottotitoli, quindi vanno bene così.
   Servono: un'app TikTok for Developers con la Content Posting API approvata (richiede revisione),
   un segreto TIKTOK_TOKEN, un canale «tiktok» in `seo/pubblica.py` (caricamento del video dall'indirizzo
   di R2 e didascalia) e una riga nel registro `data/meta.json` o in un registro a parte. Prima di scrivere
   codice conviene avere l'app approvata: TikTok rifiuta i video caricati da indirizzo se il dominio non è
   verificato.

## 6. Fase 8, solo preparazione: post già usciti da rifare col motore nuovo

Nessuno è stato messo in coda. Varrebbe la pena rifarli come reel del regista (pagine vere, scene della
lezione, voce), con un angolo diverso da quello del carosello già uscito:

| Post uscito | Quando | Perché rifarlo | Rubrica adatta |
|---|---|---|---|
| Gesù sotto il segno dell'aquila (2ª) | 22/10 | Fascicolo e lezione interattiva con la mappa del regno spezzato; curiosità forti (tetrarca, 525, 4 a.C.). | Mappa in 30 secondi, o In numeri il martedì |
| I benedettini (3ª) | 26/10 | «Ora et labora» non è nella Regola; l'abate ascolta il più giovane: due falsi miti pronti. | Falso mito |
| La visione cosmologica di Lemaître (5ª) | 29/10 | Il prete che fece il Big Bang e disse al papa di non usarlo come prova: sorpresa pura, con pagine citabili. | Lo sapevi? / Prova alla mano |
| Credo, non credo, non so (1ª) | 19/10 | Niente fascicolo né lezione interattiva: il motore nuovo non può lavorarci. Da rifare solo quando ci sarà il fascicolo. | — |
| Presentazione del sito, benvenuto, il prof si presenta | 19/10 e 3/11 | Vetrina: non si rifà, si aggiorna la bio (punto 5). | — |
| Striscia del prof «Agnostico» | 3/11 | Già nel formato giusto per le vacanze; non serve rifarla. | — |

## 7. Segnalazioni sulle lezioni (dai lettori dei fascicoli)

Gli agenti che hanno letto i 50 fascicoli hanno segnalato questi dubbi di fatto. Non ho potuto
verificarli tutti in rete (limite settimanale dell'account raggiunto durante la sessione): li metto con
la fonte da controllare, in ordine di sicurezza.

| Lezione | Pagina | Che cosa dice il fascicolo | Dubbio | Dove controllare |
|---|---|---|---|---|
| Cambiare il modo di leggere e di partecipare (5ª) | 9 | Quo primum «13 luglio 1570» | La bolla è datata 14 luglio 1570. | vatican.va, Treccani |
| L'evoluzione decide quanto valiamo (5ª) | 6 | Dignitas infinita «2 aprile 2024» | È datata 25 marzo 2024 e presentata l'8 aprile 2024. | vatican.va |
| La libertà vale anche per chi crede diversamente (5ª) | 1 | Beran arcivescovo di Praga nel 1949 | Fu nominato nel novembre 1946; il 1949 è l'internamento. | Treccani |
| Un papa può sbagliare (5ª) | 1 | Heinrich Fries «storico» | Era un teologo (teologia fondamentale, Monaco). | Treccani |
| Di che cosa vive la Chiesa (5ª) | 3 | Obolo di San Pietro dal VII secolo | Le fonti correnti dicono VIII secolo (re anglosassoni). | Treccani, obolodisanpietro.va |
| Un'Europa divisa (4ª) | 3 | Tommaso Moro «primo laico» cancelliere | Cancellieri laici esistevano già nel Trecento: meglio «il primo laico dopo lungo tempo». | Treccani |
| Un'Europa divisa (4ª) | 2 | Messa e immagini abolite a Zurigo nel 1523 | Decise nel 1523, attuate nel 1524-1525. | Treccani (Zwingli) |
| Genesi vuole spiegare un meccanismo (1ª) | 4 | Pio XII nel 1952 «precisò» che la cosmologia non parla di creazione | Il fascicolo di quinta su Lemaître dice che del colloquio non resta prova scritta: le due lezioni non dicono la stessa cosa. | i due fascicoli |
| Un libro o una biblioteca (1ª) | 4 | Canone rabbinico fissato «fine II – inizio III secolo» | Il titolo dice «dopo il 70»; la datazione corrente è fine I – II secolo. | Treccani |
| Perché fu condannato (2ª) | 1 | Nota: «la traduzione usata in Lo screenshot non basta» | In quel fascicolo la citazione di Tacito è tradotta diversamente. | i due fascicoli |
| Perché credere ai testimoni della Pasqua (2ª) | 3 | La Mishnah «del tempo» | Gli altri fascicoli la datano verso il 200: conviene precisare. | i fascicoli dell'unità |

## 8. Come si va avanti

1. Sul ramo del sito arriva tutto da solo (`sync-main-to-branch.yml`).
2. Il prossimo piano della settimana (domenica, o a mano con «Social · piano della settimana») userà
   direttore e regista; il carosello del 10 novembre lo scriverà `seo/caroselli.py` nella prima
   esecuzione di «Social · post automatico» con la chiave di Claude (serve poppler sul runner: il
   workflow lo installa).
3. Per vedere i modelli dei caroselli senza aspettare il martedì: `python seo/caroselli.py --provino
   CARTELLA` sul ramo del sito.
