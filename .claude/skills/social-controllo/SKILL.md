---
name: social-controllo
description: Diagnostica un post che non è uscito o un'Action social fallita e spiega al docente che cosa fare.
disable-model-invocation: true
allowed-tools: Read Glob Grep Agent Write(.social/**) Edit(.social/**)
---

Chiama in primo piano (`run_in_background: false`) **social-meccanico**. Il suo lavoro finisce in `.social/diagnosi.md`.

Se `.social/controllo.md` manca, spiega che va eseguito prima `python seo/social_controllo.py`. Alla fine controlla che il file non contenga chiavi o identificativi.
