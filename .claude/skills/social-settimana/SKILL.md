---
name: social-settimana
description: Prepara il piano social della settimana del Lab IRC facendo lavorare gli agenti social in sequenza.
disable-model-invocation: true
allowed-tools: Read Glob Grep Agent Edit(.social/**) Write(.social/**) Edit(data/social-coda.json) Write(data/social-coda.json)
---

Sei la regia dei social del Lab IRC. Coordini gli agenti, non scrivi i testi e non li giudichi.

Chiama sempre gli agenti in primo piano (`run_in_background: false`) e aspetta il loro risultato: ogni passo dipende dal precedente.

## 1. Quadro
Leggi `.claude/social-regole.md` e `.social/stato.md`. Se lo stato manca, fermati: va prima eseguito `python seo/social_stato.py`.

Se lo stato dice che i social sono in pausa, passa direttamente al punto 6 e scrivi che non è stato preparato nulla.

## 2. Scelta
Chiedi a **social-calendarista** il piano delle uscite delle lezioni (i giorni elencati in «Uscite da coprire»: a scuola dal lunedì al venerdì, in vacanza nessuna). Prepara un elenco di lavoro con i post scelti e le riserve.

## 3. Controllo
Per ogni post scelto, chiama **social-verificatore** e **social-guardiano** nello stesso turno, indicando a ciascuno il file `.social/candidati/NN.md`.

## 3b. Rubriche
Le strisce del prof (P1, P2…, solo nelle vacanze) e la domenica (D1, la grande domanda) hanno già la loro data: non si scelgono. Per ognuna chiama **social-verificatore** e **social-guardiano** nello stesso turno, indicando `.social/candidati/P1.md` (e così via). Il guardiano guarda tutte le immagini della striscia.
- Se entrambi approvano, mettila in coda con la data indicata nella scheda.
- Se uno dei due chiede correzioni o respinge, scartala senza riscriverla: non va in coda e la segnali in «Da guardare tu». Il post del prof successivo è già pronto per la settimana dopo.

## 4. Correzioni
- Se entrambi approvano, il post è approvato.
- Se almeno uno chiede correzioni, passa tutte le correzioni a **social-redattore**, poi fai ricontrollare a entrambi la riscrittura indicando il file `.social/riscritture/NN.json`. Una sola volta.
- Se dopo la riscrittura qualcuno non approva, oppure qualcuno ha risposto RESPINTO, scarta il post e controlla la prima riserva.
- Non approvare mai un post che abbia punti «DA VERIFICARE» non risolti.

Se finiscono le riserve e un'uscita resta scoperta, lasciala scoperta: meglio un post in meno che un post sbagliato.

## 5. Coda
Aggiorna `data/social-coda.json`, conservando le voci già presenti in `coda` e in `escluse` e il valore di `pausa`. Aggiungi le voci nuove:

```json
{
  "aggiornata": "AAAA-MM-GG",
  "pausa": false,
  "solo_coda": true,
  "coda": [
    {"chiave": "<chiave esatta>", "quando": "AAAA-MM-GG", "esito": "approvato", "motivo": "<una riga>"}
  ],
  "escluse": [
    {"chiave": "<chiave esatta>", "motivo": "<una riga>", "data": "AAAA-MM-GG"}
  ]
}
```

Metti in `escluse` solo i post RESPINTI dal verificatore. Quelli scartati per un motivo di data restano disponibili.

Se lo stato dice «Primo rapporto del mese da fare: sì», chiama anche **social-analista**.

## 6. Rapporto
Scrivi `.social/rapporto.md`. Il repository è pubblico: niente dati personali. Usa questa forma:

```markdown
## Piano della settimana

| Quando | Post | Classe | Perché |
|---|---|---|---|

## Controlli
Per ogni post: esito del verificatore, esito del guardiano, cartolina, eventuali correzioni fatte.

## Post scartati
Quali e perché.

## Da guardare tu
Segnalazioni sulle lezioni, punti da verificare, uscite rimaste scoperte. Se non c'è nulla, scrivi «Niente».

## WhatsApp
Per ogni post, il messaggio da mandare a mano ai colleghi.

## Numeri
Una riga con follower e iscritti. Se esiste `.social/analisi.md`, aggiungine qui il contenuto.
```
