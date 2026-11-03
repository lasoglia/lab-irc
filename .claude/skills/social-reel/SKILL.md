---
name: social-reel
description: Da un argomento o dal titolo di una lezione prepara un reel completo con il metodo del Lab - angoli validati, ganci, copione pronto per il montaggio e didascalia.
argument-hint: "[argomento o titolo della lezione]"
disable-model-invocation: true
allowed-tools: Read Glob Grep WebSearch WebFetch Agent Write(seo/prove/**) Write(.social/**) Edit(.social/**) Bash(python seo/fascicolo.py *) Bash(python3 seo/fascicolo.py *)
---

Prepara un reel su: $ARGUMENTS

Leggi prima `.claude/social-regole.md` e `.claude/social-metodo.md`: il metodo dice come lavorare, le regole dicono che cosa non si fa mai e prevalgono sempre. Leggi anche le regole apprese e l'esperimento attivo in `data/social-quaderno.json`, se c'è.

1. **La lezione.** Trova la lezione in `promozione/cartoline.json` (titolo, anno, classe) e il suo fascicolo in `uploads/*-fascicolo.pdf`. Leggi il fascicolo con `python seo/fascicolo.py uploads/<file>.pdf`. Se trovi più lezioni possibili, scegli quella più vicina all'argomento e dillo; se non ce n'è nessuna, fermati e spiega il perché.

2. **Angoli.** Cerca sul web le domande vere che le persone fanno su questo tema. Proponi 5 angoli, dal più promettente al meno, ognuno con la sua leva e la frase del fascicolo che contiene la risposta. Scarta gli angoli senza risposta nel fascicolo.

3. **Ganci.** Per l'angolo migliore scrivi almeno 5 ganci di 12 parole al massimo, ognuno con una leva sola, annotata.

4. **Copioni.** Scrivi 3 copioni con 3 ganci diversi, nel formato di `seo/prove/dionigi.json` (vedi `seo/regia.py` per i campi; tipi `gancio`, `pagina`, `numero`, `prof`, `chiusa`; le pose sono in `seo/pose_prof.json`). Le inquadrature `pagina` citano frasi **esatte** del fascicolo, almeno 4 parole consecutive. Il campo `voce` è ciò che si dice ad alta voce: niente sigle da leggere, `labirc.it` resta scritto così. Durata totale 20-35 secondi.

5. **Controllo.** Scegli il copione migliore e salvalo in `seo/prove/<parola-chiave>.json`. Esegui `python seo/fascicolo.py seo/prove/<parola-chiave>.json`: se una citazione non viene trovata, correggila copiando la frase dal fascicolo e ricontrolla. Fai giudicare il copione a **social-verificatore** (fedeltà e correttezza) e a **social-guardiano** (regole e tono), dandogli il percorso del file, e applica le correzioni.

6. **Didascalia.** Scrivi la didascalia Instagram (300-1100 caratteri) e quella Facebook (300-1000) con i quattro ingredienti del metodo, più 3-5 hashtag senza #, sempre `religionecattolica` e `irc`. Salvale in `.social/reel-<parola-chiave>.md` insieme ai 5 angoli, a tutti i ganci con la loro leva e agli altri due copioni.

7. **Ganci di riserva.** Aggiungi i ganci non usati in `.social/ganci-di-riserva.md`, con lezione e leva: serviranno agli esperimenti del quaderno.

Alla fine rispondi in breve e in italiano semplice: l'angolo scelto e il perché, il gancio, le frasi dette dalla voce, gli esiti dei due agenti, i file scritti. Per vedere il video si lancia l'Action «Social · reel di prova» con il copione `seo/prove/<parola-chiave>.json`. Non pubblicare nulla e non mettere nulla in coda.

Chiama sempre gli agenti in primo piano (`run_in_background: false`) e aspetta il loro risultato.
