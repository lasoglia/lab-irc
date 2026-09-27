# Giochi Lezione · Lab IRC

Kit di 12 giochi interattivi in stile **Arcade notturno** per le lezioni di Lab IRC:
Quiz, Vero o falso, Flashcard, Memory, Abbinamenti, Categorie, Linea del tempo,
Completa, Cruciverba, Sfida a squadre, Sondaggio, Riflessione.

- `kit/`: stili e motore dei giochi (token del design system, `lab-artefatto`, `giochi`, `giochi-2`) e le mascotte definitive (`lab-mascotte.js`, versioni statiche in `kit/mascotte/svg/`)
- `lezioni/`: i contenuti. `<lezione>.js` sono i dati dei giochi, `<lezione>.html` le lezioni interattive
- `giochi.html`: la pagina. Si apre così com'è per lavorarci, perché carica i file separati
- `build.py`: crea un unico file `.html` autonomo, da caricare sul sito
- `dist/`: i file pronti da caricare

## Nuova lezione

1. Copia `lezioni/religiosita-teisti-agnostici-atei.js` e cambia i contenuti (`tema`, `anno` e i giochi).
   Se togli un gioco, la sua scheda sparisce.
2. `python3 build.py lezioni/<nuova-lezione>.js`
3. Carica `dist/giochi-<nuova-lezione>.html` dal Pannello: Materiali → Tipo "Artefatto interattivo".

## Lezioni interattive

`python3 build.py lezioni/<lezione>.html` crea `dist/lezione-<lezione>.html`: un file unico da caricare nello stesso modo.

| Lezione | Lezione interattiva | Giochi |
|---|---|---|
| II · UDA 1 · L1 «Sotto l’aquila» | `dist/lezione-sotto-l-aquila.html` | `dist/giochi-sotto-l-aquila.html` |
| III · «Religiosità, teisti, agnostici e atei» | | `dist/giochi-religiosita-teisti-agnostici-atei.html` |

Il design originale da Claude Design è in `project/` e `chats/`.

---

# CODING AGENTS: READ THIS FIRST

This is a **handoff bundle** from Claude Design (claude.ai/design).

A user mocked up designs in HTML/CSS/JS using an AI design tool, then exported this bundle so a coding agent can implement the designs for real.

## What you should do — IMPORTANT

**Read the chat transcripts first.** There are 1 chat transcript(s) in `chats/`. The transcripts show the full back-and-forth between the user and the design assistant — they tell you **what the user actually wants** and **where they landed** after iterating. Don't skip them. The final HTML files are the output, but the chat is where the intent lives.

**Read `project/Giochi Lezione.html` in full.** The user had this file open when they triggered the handoff, so it's almost certainly the primary design they want built. Read it top to bottom — don't skim. Then **follow its imports**: open every file it pulls in (shared components, CSS, scripts) so you understand how the pieces fit together before you start implementing.

**If anything is ambiguous, ask the user to confirm before you start implementing.** It's much cheaper to clarify scope up front than to build the wrong thing.

## About the design files

The design medium is **HTML/CSS/JS** — these are prototypes, not production code. Your job is to **recreate them pixel-perfectly** in whatever technology makes sense for the target codebase (React, Vue, native, whatever fits). Match the visual output; don't copy the prototype's internal structure unless it happens to fit.

**Don't render these files in a browser or take screenshots unless the user asks you to.** Everything you need — dimensions, colors, layout rules — is spelled out in the source. Read the HTML and CSS directly; a screenshot won't tell you anything they don't.

## Bundle contents

- `README.md` — this file
- `chats/` — conversation transcripts (read these!)
- `project/` — the `Stile per artefatti interattivi` project files (HTML prototypes, assets, components)
