---
name: social-rapporto
description: Produce il rapporto sui risultati dei social del Lab IRC a partire dalle metriche raccolte.
disable-model-invocation: true
allowed-tools: Read Glob Grep Agent Write(.social/**) Edit(.social/**)
---

Chiama in primo piano (`run_in_background: false`) **social-analista** e mostra il contenuto di `.social/analisi.md`.
