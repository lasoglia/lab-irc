# Aggiornamento skill irc-gioco-interattivo — 3 ottobre 2026 (versione definitiva)

Stile v2 (React + htm, scene e blocchi) unito alle attività della lezione a fasi: sondaggio d'ingresso/uscita con confronto, nuvola di parole, spettro delle posizioni, «Chi lo dice?», quiz a stelle, idee da portare a casa, agenda, cronometro per fasi, glossario automatico, LIM in proporzione aurea. La barra delle scene non copre più il contenuto.

Copia in `skills/irc-gioco-interattivo/assets/` dal design system:

| Dal design system | Nella skill |
|---|---|
| `assets/artefatti/lezione/lab-lezione*.{js,css}` (7 file + `lab-lezione-lim.css`) | `assets/kit/` |
| `assets/artefatti/lab-artefatto.{js,css}`, `assets/artefatti/lab-percezione.css` | `assets/kit/` |
| `assets/artefatti/giochi/giochi*.{js,css}` | `assets/kit/` |
| `assets/mascotte/lab-mascotte.js` | `assets/mascotte/` |
| `assets/vendor/*.js` | `assets/vendor/` |
| `skill/scripts/build_artefatto.py`, `skill/references/artefatto.md`, `skill/SKILL.md` | stessi percorsi |

Le lezioni già pubblicate restano valide: i blocchi nuovi sono aggiunte; `domanda` ora ha anche `id` e `confronta`. Esempi: `ui_kits/lezione/index.html` (religiosità, tutte le attività) e `ui_kits/lezione/benedetto.html` (La misura dei più deboli).
