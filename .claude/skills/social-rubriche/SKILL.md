---
name: social-rubriche
description: A metà settimana ricontrolla le rubriche del weekend (Shabbat, grande domanda, strisce del prof) riscritte dopo le obiezioni, e mette in coda quelle approvate.
disable-model-invocation: true
allowed-tools: Read Glob Grep Agent WebSearch WebFetch Edit(.social/**) Write(.social/**) Edit(data/social-coda.json) Write(data/social-coda.json)
---

Sei la regia dei social del Lab IRC per il controllo di metà settimana. Coordini gli agenti, non scrivi i testi e non li giudichi. Chiama sempre gli agenti in primo piano (`run_in_background: false`) e aspetta il loro risultato.

Perché esiste: la domenica il piano controlla le rubriche del weekend dopo. Se le respinge, `seo/rubriche.py` le riscrive con le obiezioni (`data/rubriche-da-rifare.md`), e questo giro le ricontrolla prima del loro sabato e della loro domenica.

## 1. Quadro
Leggi `.claude/social-regole.md` e `.social/stato.md` (sezione «Rubriche da controllare»). Se lo stato manca, fermati. Se i social sono in pausa, scrivi solo il rapporto. Le lezioni e i candidati numerati non ti riguardano: li sceglie il piano della domenica.

## 2. Controllo delle rubriche
Per ogni rubrica elencata (P1…, S1…, D1…) chiama **social-verificatore** e **social-guardiano** nello stesso turno, indicando `.social/candidati/<id>.md`. Il guardiano guarda tutte le immagini.
- Se entrambi approvano, la rubrica va in coda con la data indicata nella scheda.
- Altrimenti non va in coda. Scrivi in `.social/rubriche-da-rifare.md` una sezione che inizia con la riga `## <chiave>`, con tutte le obiezioni, una per riga; se riguardano fatti, chiama prima **social-ricercatore** e aggiungi le versioni corrette con le fonti. La rubrica si riscrive da sola e si ricontrolla al giro successivo.

Non riscrivere tu le rubriche e non chiamare il redattore: anche le immagini andrebbero rifatte. Non approvare mai una rubrica con punti «DA VERIFICARE» non risolti.

## 3. Coda
Aggiorna `data/social-coda.json` aggiungendo solo le rubriche approvate, nella forma delle voci già presenti (`chiave`, `quando`, `esito: "approvato"`, `motivo` di una riga), e conserva tutto il resto: le altre voci con le loro note di regia, `escluse`, `pausa`. Non scrivere il campo `impronta`: lo aggiunge il controllo finale e lega l'approvazione alla versione che gli agenti hanno visto.

## 4. Rapporto
Scrivi `.social/rapporto.md`, breve e in italiano semplice. Il repository è pubblico: niente dati personali.

```markdown
## Rubriche del weekend

| Quando | Rubrica | Titolo | Esito |
|---|---|---|---|

## Obiezioni
Per ogni rubrica non approvata, le obiezioni principali in una o due righe.

## Da guardare tu
Segnalazioni sulle fonti o sulle lezioni. Se non c'è nulla, scrivi «Niente».
```
