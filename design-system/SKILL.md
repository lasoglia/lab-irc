---
name: lab-irc-design
description: Use this skill to generate well-branded interfaces and assets for Lab IRC — a Catholic Religion teaching platform (Laboratorio di Religione Cattolica). Contains essential design guidelines, color tokens, typography specs, component library, and UI kit for the main site and exam platform. Use for production code or throwaway prototypes and mocks.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick reference

**Fonts:** Cormorant Garamond (display: titles, quotes) · Cinzel (inscription caps: eyebrows, Roman numerals, AMDG) · Figtree (body/UI). All in `tokens/fonts.css`, self-hosted in `fonts/` (no Google Fonts/CDN).

**Primary colour:** `#8B5CF6` (violet/purple). Gradient brand: `linear-gradient(135deg,#8B5CF6,#22D3EE)`.

**Dark theme (default):** body bg `#14131F`, card surface `#1E1C2E`, primary text `#ECEAF5`.

**Light theme:** set `data-tema="chiaro"` on `<html>`. Body bg `#FAF7F1` (warm parchment).

**Exam platform:** uses separate institutional palette — blue `#1E3A8A`, gold `#D4A017`.

**5 year colours:** `#FF7A59` (I) · `#4FB0FF` (II) · `#A78BFA` (III) · `#FB7BB5` (IV) · `#FBBF24` (V).

**Golden ratio:** Fibonacci spacing 5·8·13·21·34·55·89, type ×√φ from 16px, body line-height 1.618, layouts 1.618fr:1fr, durations 144/233/377/610/987ms.

**Key radius:** `21px` cards · `34px` hero · `13px` inputs · `999px` buttons.

**Motion:** cursor-reactive (magnetic buttons, tilting cards with following light, parallax), calm ease-out, never bouncy. Solemn gold `--lab-oro` for hairlines only.

**Easter egg:** mount `<AmdgEgg />` on every page (type "amdg", 7 clicks on logo, spiral ✦, footer `<Amdg />`).

**Typography:** Cormorant 600 for headings, italic 500 for the coloured word. Eyebrows: Cinzel 600, UPPERCASE, tracking .18em, `--lab-oro`. Figtree 400 body, 700 buttons.

**Mascots:** every year surface/artefact carries its `YearMascot` (1 Semino · 2 Ichthy · 3 Navicella · 4 Bussolina · 5 Terra). 2D web component `<lab-mascotte anno="N">` (site-root `/assets/mascotte/`; no AMDG on repeated clicks). Plain-HTML lesson artefacts: `assets/artefatti/` kit with `<body class="la" data-anno="N">`; lesson games: `assets/artefatti/giochi/` + one `giochi-dati.js` (copy `ui_kits/giochi/`).

**Always use Italian** for all UI copy.
