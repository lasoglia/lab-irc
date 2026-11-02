---
name: social-post
description: Controlla e, se serve, riscrive un singolo post del kit social, cercandolo per titolo o argomento.
argument-hint: "[titolo o argomento della lezione]"
disable-model-invocation: true
allowed-tools: Read Glob Grep Agent Edit(.social/**) Write(.social/**) Edit(data/social-coda.json) Write(data/social-coda.json)
---

Lavora sul post richiesto: $ARGUMENTS

1. Leggi `.claude/social-regole.md`. Se `.social/stato.md` manca, esegui `python seo/social_stato.py`, chiedendo il permesso se serve.
2. Trova il candidato in `.social/stato.md`. Se il risultato è ambiguo, mostra le opzioni e chiedi quale.
3. Chiama **social-verificatore** e **social-guardiano** sulla sua scheda.
4. Se chiedono correzioni, chiama **social-redattore** e fai ricontrollare una volta.
5. Mostra i testi finali e gli esiti.
6. Metti il post in coda solo se viene chiesto, alla prossima data libera di lunedì, mercoledì o venerdì, sempre con entrambi gli esiti favorevoli.

Chiama sempre gli agenti in primo piano (`run_in_background: false`) e aspetta il loro risultato.
