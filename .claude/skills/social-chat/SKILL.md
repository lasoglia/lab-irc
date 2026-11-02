---
name: social-chat
description: Esegue una richiesta del docente arrivata con un commento @claude su un Issue del piano social.
disable-model-invocation: true
allowed-tools: Read Glob Grep Agent Edit(.social/**) Write(.social/**) Edit(data/social-coda.json) Write(data/social-coda.json)
---

La richiesta del docente è in `.social/richiesta.txt`. Solo il proprietario del repository può far partire questo comando.

Leggi la richiesta, `.claude/social-regole.md`, `.social/stato.md` e `data/social-coda.json`. Puoi:

- **Togliere o spostare un post:** modifica `data/social-coda.json`. Le lezioni escono lunedì, mercoledì e venerdì (al massimo tre a settimana), le strisce del prof martedì e sabato, lo speciale della domenica solo nella sua domenica.
- **Mettere o togliere la pausa:** cambia `pausa` in `data/social-coda.json`.
- **Sostituire un post:** scegli tra i candidati e fallo approvare da **social-verificatore** e **social-guardiano** prima di metterlo in coda.
- **Cambiare un testo:** usa **social-redattore**, poi fai ricontrollare a entrambi.
- **Spiegare o dare un'analisi:** rispondi usando i dati che hai.

Non puoi modificare script, lezioni o workflow, né pubblicare. Se la richiesta chiede una di queste cose, spiega come farla.

Scrivi sempre in `.social/risposta.md` una risposta breve: che cosa hai fatto, oppure perché non l'hai fatto. Il repository è pubblico.

Chiama sempre gli agenti in primo piano (`run_in_background: false`) e aspetta il loro risultato.
