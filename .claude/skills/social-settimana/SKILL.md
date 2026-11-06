---
name: social-settimana
description: Prepara il piano social della settimana del Lab IRC facendo lavorare gli agenti social in sequenza.
disable-model-invocation: true
allowed-tools: Read Glob Grep Agent WebSearch WebFetch Edit(.social/**) Write(.social/**) Edit(data/social-coda.json) Write(data/social-coda.json)
---

Sei la regia dei social del Lab IRC. Coordini gli agenti, non scrivi i testi e non li giudichi. La squadra: il direttore (la linea editoriale), il calendarista (quale lezione in quale giorno), verificatore e guardiano (i controlli), ricercatore e redattore (le correzioni), il regista (le note di regia per reel e caroselli), esploratore e analista (imparare dai numeri).

Chiama sempre gli agenti in primo piano (`run_in_background: false`) e aspetta il loro risultato: ogni passo dipende dal precedente. Dentro uno stesso passo, però, le chiamate indipendenti vanno nello stesso turno (verificatore e guardiano sullo stesso post; i regista delle diverse uscite; esploratore e analista no, perché l'analista aspetta l'esploratore): il tempo del lavoro è limitato.

## 1. Quadro
Leggi `.claude/social-regole.md` e `.social/stato.md`. Se lo stato manca, fermati: va prima eseguito `python seo/social_stato.py`.

Se lo stato dice che i social sono in pausa, passa direttamente al punto 6 e scrivi che non è stato preparato nulla.

## 2. Linea editoriale e scelta
Chiama prima **social-direttore**: legge numeri, quaderno, rubriche e candidati e scrive `.social/linea.md` (la linea della settimana, i candidati adatti a ogni rubrica, le priorità, i brief per il regista).

Poi chiedi a **social-calendarista** il piano delle uscite delle lezioni, passandogli le priorità del direttore (i giorni elencati in «Uscite da coprire», ognuno con la sua rubrica: a scuola lunedì, mercoledì e venerdì la lezione esce come REEL del regista, con le pagine vere del fascicolo e la voce: scegli lezioni con una curiosità o una storia che si racconta bene; martedì esce come carosello della rubrica del giorno, «Parole con una storia», «In classe domani» o «In numeri»; in vacanza nessuna). Prepara un elenco di lavoro con i post scelti e le riserve.

## 3. Controllo
Per ogni post scelto, chiama **social-verificatore** e **social-guardiano** nello stesso turno, indicando a ciascuno il file `.social/candidati/NN.md`.

## 3b. Rubriche
Le strisce del prof (P1, P2…, solo nelle vacanze), lo Shabbat del sabato (S1, cultura ebraica da fonti ebraiche) e la domenica (D1, la grande domanda) hanno già la loro data: non si scelgono. Per ognuna chiama **social-verificatore** e **social-guardiano** nello stesso turno, indicando `.social/candidati/P1.md` (e così via). Il guardiano guarda tutte le immagini della striscia.
- Se entrambi approvano, mettila in coda con la data indicata nella scheda.
- Se uno dei due chiede correzioni o respinge, non va in coda (le rubriche non si riscrivono qui, perché anche le immagini vanno rifatte). Scrivi sempre in `.social/rubriche-da-rifare.md` una sezione per ogni rubrica non approvata, che inizia con la riga `## <chiave>` (per esempio `## sab-2026-11-14`), con tutte le obiezioni del verificatore e del guardiano, una per riga; se riguardano fatti, chiama prima **social-ricercatore** e aggiungi le versioni corrette con le fonti. Il file si salva da solo in `data/rubriche-da-rifare.md` e seo/rubriche.py riscrive la rubrica tenendone conto (la riscrittura si ricontrolla al piano successivo). Segnalala in «Da guardare tu».

## 4. Correzioni
- Se entrambi approvano, il post è approvato.
- Se almeno uno chiede correzioni o respinge, non scartare subito: un errore si corregge.
  1. Se le obiezioni riguardano fatti (date, nomi, numeri, citazioni, attribuzioni), chiama prima **social-ricercatore** con le obiezioni: le verifica su fonti autorevoli e indica la versione corretta.
  2. Passa a **social-redattore** tutte le correzioni e, se c'è, la risposta del ricercatore.
  3. Fai ricontrollare a entrambi la riscrittura, indicando il file `.social/riscritture/NN.json`.
  4. Se qualcuno chiede ancora correzioni, ripeti una seconda volta (al massimo due giri).
- Scarta il post solo se dopo due giri qualcuno non approva, o se il problema non si può risolvere restando fedeli alla lezione. Allora controlla la prima riserva.
- Se il ricercatore trova un errore nella lezione stessa, segnalalo in «Da guardare tu» con la fonte.
- Non approvare mai un post che abbia punti «DA VERIFICARE» non risolti.

Se finiscono le riserve e un'uscita resta scoperta, lasciala scoperta: meglio un post in meno che un post sbagliato.

## 4b. Regia
Per ogni lezione approvata per un reel (lunedì, mercoledì, venerdì) e per il carosello del martedì chiama **social-regista** con il numero del candidato, la data e la rubrica (tutte le uscite nello stesso turno, in parallelo): scrive `.social/regia/NN.json` con le note di regia (angolo, gancio, curiosità da usare, scena, tono, prima riga della didascalia). Copia l'oggetto `regia` di quel file nella voce della coda (campo `regia`): così arriva allo script del regista e a chi scrive il carosello.

## 5. Coda
Aggiorna `data/social-coda.json`, conservando le voci già presenti in `coda` e in `escluse` e il valore di `pausa`. Aggiungi le voci nuove:

```json
{
  "aggiornata": "AAAA-MM-GG",
  "pausa": false,
  "solo_coda": true,
  "coda": [
    {"chiave": "<chiave esatta>", "quando": "AAAA-MM-GG", "esito": "approvato", "motivo": "<una riga>",
     "regia": {"rubrica": "...", "angolo": "...", "gancio": "...", "curiosita": "...", "scena": "...", "tono": "...", "prima_riga": "...", "richiesta": "...", "evita": "..."}}
  ],
  "escluse": [
    {"chiave": "<chiave esatta>", "motivo": "<una riga>", "data": "AAAA-MM-GG"}
  ]
}
```

Metti in `escluse` solo i post RESPINTI dal verificatore. Non scrivere il campo `impronta`: alle rubriche approvate lo aggiunge il controllo finale, e lega l'approvazione alla versione che gli agenti hanno visto. Quelli scartati per un motivo di data restano disponibili.

## 5b. Imparare (ogni settimana)
Il Lab sale un gradino alla volta. Ogni settimana, dopo la coda:
1. Chiama **social-esploratore**: cerca fuori al massimo 3 idee nuove, con le fonti.
2. Chiama **social-analista** passandogli la risposta dell'esploratore: chiude l'esperimento passato, aggiorna le regole imparate, sceglie l'esperimento della settimana e scrive `.social/quaderno-proposta.json` e `.social/analisi.md`.
Il quaderno lo salva il controllo finale (seo/social_quaderno.py); chi scrive i post riceve da solo le regole confermate e l'istruzione dell'esperimento.

## 6. Rapporto
Scrivi `.social/rapporto.md`. Il repository è pubblico: niente dati personali. Usa questa forma:

```markdown
## La linea della settimana
Da `.social/linea.md`: su che cosa puntiamo e perché, in tre righe.

## Piano della settimana

| Quando | Rubrica | Post | Classe | Angolo e gancio | Perché |
|---|---|---|---|---|---|

## Controlli
Per ogni post: esito del verificatore, esito del guardiano, cartolina, eventuali correzioni fatte.

## Post scartati
Quali e perché.

## Da guardare tu
Segnalazioni sulle lezioni, punti da verificare, uscite rimaste scoperte. Se non c'è nulla, scrivi «Niente».

## WhatsApp
Per ogni post, il messaggio da mandare a mano ai colleghi.

## Cosa abbiamo imparato
Da `.social/analisi.md`: le regole nuove o cambiate, l'esito dell'esperimento passato, l'esperimento di questa settimana (che cosa cambia e come lo misuriamo), le idee nuove dell'esploratore. In italiano semplice: il docente può dire di no commentando.

## Numeri
Una riga con follower e iscritti. Se esiste `.social/analisi.md`, aggiungine qui il contenuto.
```
