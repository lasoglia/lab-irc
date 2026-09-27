# Lab IRC Design System

> *"Le grandi domande meritano risposte all'altezza."*

**Lab IRC** (Laboratorio di Religione Cattolica) is the personal teaching platform of Matteo Sestili, a Catholic Religion teacher in Italy. It provides a beautiful, organized space for sharing slides, documents, videos, and interactive learning tools with high school students — organized by school year (1st–5th).

The platform has two distinct products:

1. **Main Site** — A content hub at the top of the content hierarchy, organized by school year, learning unit (UDA), and lesson. Supports interactive HTML artifacts, PDF/slide downloads, and embedded YouTube videos. Features a signature dark "Notte Studio" aesthetic.
2. **Exam Platform** (`/esami`) — A separate web app for creating, administering, and grading exams. Uses a different institutional blue/gold palette, built for focus and clarity. Teacher and student views. Supabase-backed with anti-cheat features.

---

## Sources

- **GitHub:** https://github.com/lasoglia/lab-irc (branch: `main`)
  - `index.html` — main site (SPA, vanilla JS)
  - `assets/lab-style.css` — original CSS design system ("Notte Studio")
  - `assets/lab-tema.js` — theme toggle (dark/light, localStorage)
  - `esami/css/stile.css` — exam platform styles
  - `esami/js/docente.js` — teacher dashboard logic
  - `esami/js/studente.js` — student exam logic
  - `data/*.json` — content data (site, years, materials, tools, video)

> Explore the GitHub repository for deeper understanding of the component and content architecture. All design tokens in this system were derived directly from the source CSS.

---

## Content Fundamentals

**Language:** Italian throughout. All UI copy, error messages, and labels are in Italian.

**Tone:** Serious but warm. Intellectually curious. The voice is that of an engaged teacher who treats students as capable of depth. Not condescending; not overly formal.

**Voice:** First-person plural in UX contexts ("facciamo insieme", "costruiamo") — inclusive, collaborative. First-person singular for the teacher's own content ("condivido", "propongo").

**Tagline:** *"Le grandi domande meritano risposte all'altezza."* — Use only in hero contexts; treat it like a brand statement.

**Eyebrow labels:** SHORT · ALL CAPS · LETTER-SPACED (0.2em). Examples: `PER FARE LEZIONE`, `PERCORSO`, `INTERATTIVI`, `ANNO I`. Never use them for more than 3–4 words.

**Headings:** Cormorant Garamond — often paired with a gradient text effect (`lab-grad-text`) for the hero. Avoid gradient text on body copy or anything smaller than h2.

**Copy length:** Lean. Card descriptions are 1–2 short sentences. Intro text max ~60 characters. "Le grandi domande" is 4 words — every word earns its place.

**Numbers:** Used for content counts ("12 contenuti"), time ("30 minuti"), and question numbers ("Domanda 3 di 8"). Not decorative.

**Emoji:** Used sparingly and only in functional contexts:
- `🌙 / ☀️` — theme toggle (fixed bottom-right)
- `💡` — tip/hint callouts (`Nota` component)
- `✓` — completion confirmation screens
- `ℹ️` — anti-cheat / info warnings
- **Never** in nav items, headings, cards, or badges.

**Privacy language:** Always acknowledged briefly and respectfully. Data stays on European servers. Students identified by code + class, not by name (unless teacher explicitly opts in).

**CTAs:** Action-first. Examples: `Inizia →`, `Apri`, `Scarica`, `Guarda ▶`, `Consegna la verifica`, `+ Nuova verifica`. Arrow glyphs (`→`, `←`) are used in text CTAs, not as separate icon elements.

---

## Visual Foundations

### Color System

Two parallel palettes coexist in this design system:

**"Notte Studio" (main site)** — Dark by default. A deep slate/indigo base with vibrant purple, cyan, and amber accents. Activates with no attribute on `<html>`; light theme via `data-tema="chiaro"`.

**Institutional (exam platform)** — Light by default. Clean white backgrounds with institutional blue (`#1E3A8A`) and gold (`#D4A017`). More utilitarian and accessible.

### Typography

Three voices, each with one job:
- **Cormorant Garamond** (display) — titles, card titles, quotes. Weight 600; italic 500 for the coloured hero word and quotes. The feel of a liturgical book: solemn, literary.
- **Cinzel** (inscription) — Roman lapidary capitals for eyebrows (13px, 600, tracking .18em), Roman year numerals, meta labels and AMDG. Never for sentences.
- **Figtree** (body/UI) — friendly, young geometric sans for all running text, buttons, forms. 400–800.

Solemn serif + inscription caps give the gravitas; Figtree keeps it young and readable.

### Backgrounds & Texture

- Default page background: `#14131F` — a deep slate with indigo undertones, not pure black.
- A **subtle SVG noise texture** is overlaid on `body::before` at 55% opacity, 3% intensity — gives depth without distraction.
- **Hero areas** use animated radial gradient blobs in the 5 year colours (18s float animation, `labFloaty` keyframe).
- The **glass header** uses `backdrop-filter: saturate(160%) blur(12px)` on a semi-transparent background — sticky, doesn't cover content.

### Golden ratio (φ = 1.618)

The whole system is proportioned on φ:
- **Spacing** is Fibonacci: `5 · 8 · 13 · 21 · 34 · 55 · 89 · 144` (`--lab-space-1–8`). Card padding/gaps 21, section rhythm 89.
- **Type** steps by √φ from 16px: `12.5 · 16 · 20.5 · 26 · 33 · 42 · 55 · 68`. Body line-height = **1.618**.
- **Layouts** split `1.618fr : 1fr` (hero, section heads, about, tool tiles, footer).
- **Radius** Fibonacci: `8 · 13 · 21 (card) · 34 (hero) · pill`.
- **Durations** are Fibonacci ms: `144 · 233 · 377 · 610 · 987`, stagger `89ms`.
- Magic numbers are φ-derived too: magnetic pull 0.236, cursor-light fade at 61.8%, perspective 987px.
- The hero shows a **rose window (rosone)**: 10 stained-glass petals in the year colours lit by the cursor like sunlight, a gold light beam pointing at the pointer, 3D tilt, petals navigate to their year, the central cross hides AMDG.

### Card System

- **Base card:** `--lab-surface` bg, `1px solid --lab-line`, `21px` radius, 21px padding, `--lab-shadow`.
- **Hover:** `translateY(-5px)` lift, shadow upgrades to `--lab-shadow-lg`, border gains a violet tint via `color-mix`.
- **Anno card:** left-bar `7px wide` in the year colour + a `120px` circular glow orb top-right (opacity 7→13% on hover).
- **Featured card:** gold `outline: 2px solid --lab-ambra` + "In evidenza" badge at top.

### Buttons

Pill shape (`999px`). Three variants:
- `primary` — gradient fill (violet→cyan), purple glow shadow, `brightness(1.08)` on hover.
- `ghost` — transparent, muted border → violet border + violet text on hover.
- `gold` — amber fill, dark text, `brightness(1.06)` on hover.

All buttons lift `translateY(-2px)` on hover, snap back on press.

### Hover / Press States

- Cards: lift 5px + 3D tilt + cursor light + border tint; press 0.985
- Buttons: magnetic follow, light sweep (filled) or rising fill (outline); press 0.96
- Nav links: gold hairline underline grows from the centre
- Chips: gold border + 2px lift; active = inverted ink; press 0.94
- Search: widens 170→233px on focus with gold border

### Solemn gold

`--lab-oro` (#E3C27A dark / #A67C2E light) is used sparingly for hairlines, eyebrows, focus rings, the spiral and AMDG. It is what makes the youthful palette feel solemn — never fill large areas with it.

### Animation

Calm, dynamic, never bouncy. Entry: `labRise` (↑34px + blur 8px → sharp) over 987ms, `cubic-bezier(.16,1,.3,1)`, staggered 89ms; below-the-fold content reveals on scroll. Cursor-reactive everywhere: a soft violet/gold halo follows the pointer (lerp 0.1618), cards tilt ≤2.5–3° toward it with a following radial light, buttons are magnetic, the hero spiral and year numerals drift with parallax. Hover-in is fast (144–233ms), settle-back is slow (610ms) — that asymmetry is what feels solemn.

Always respect `@media (prefers-reduced-motion: reduce)` — all transitions and animations disabled.

### Light Theme

Activates with `data-tema="chiaro"` on `<html>`. Surface: warm parchment (`#FAF7F1` → `#F3EFE6`). Accents shift slightly deeper for contrast. Year colours are more muted. Gradients and glow adjust to work on light backgrounds.

---

## Easter eggs — A·M·D·G

*Ad maiorem Dei gloria.* Hidden, never advertised. Mount `<AmdgEgg />` once per page; it reveals a full-screen gold "A · M · D · G" with the Latin line only (no Italian translation) when:
1. the visitor types **amdg** anywhere;
2. they click the **logo 7 times** quickly (`data-amdg-trigger`);
3. they click the **cross at the centre of the rose window**;
4. they click the near-invisible **`<Amdg />` mark** in the footer (13% opacity, glows on hover);
5. (passive) they **select the hero paragraph** — a transparent "A·M·D·G" appears in the selection;
6. (dev) they open the **console**.

## Year mascots

Each school year has a small friendly mascot (`YearMascot`), used on the year card, the year page, every material card and every lesson artefact of that year — the same figure everywhere:
1 **Semino** (seed — le radici) · 2 **Ichthy** (fish — Gesù) · 3 **Navicella** (Peter's boat — la Chiesa) · 4 **Bussolina** (compass — la coscienza) · 5 **Terra** (earth with leaf — la casa comune).
Eyes follow the cursor (Bussolina's needle points at it), they blink, a click shows a year-themed line (e.g. "Duc in altum!"). No AMDG on repeated clicks.
The figures come from the Claude Design package in `/assets/mascotte/` (web component `<lab-mascotte>`, golden halo, 144×144 grid); `YearMascot` wraps it. Sizes: 34 (material card, no halo) · 55 (year card) · 89 (artefact) · 144 (year page).

## Lesson artefacts kit

`assets/artefatti/lab-artefatto.css` + `lab-artefatto.js` give plain-HTML artefacts and games the same style: `<body class="la" data-anno="N">`, classes `.la-card`, `.la-btn`, `.la-choice`…, the year mascot bottom-right, cursor halo and AMDG. See `assets/artefatti/README.md` and the example `ui_kits/artefatto/index.html`.

## Iconography

The codebase uses **inline SVG icons** throughout — no icon font. All icons follow the Lucide icon style: 24×24 viewBox, `2px` stroke, round line caps and joins, geometric and minimal.

Icons are embedded directly in HTML as `<svg>` elements with `stroke="currentColor"` so they inherit text colour. No sprite or icon font is used.

**Common icons in the codebase:**
- Search: `<circle cx="11" cy="11" r="7"/> <path d="M21 21l-4-4"/>`
- Arrow right: `<path d="M5 12h14M13 6l6 6-6 6"/>`
- External link: `<path d="M7 17L17 7M9 7h8v8"/>`
- Back arrow: `<path d="M19 12H5M5 12l7-7M5 12l7 7"/>`
- Folder: `<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"/>`
- Book: `<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/> <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>`
- Download: `<path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14"/>`
- Play: `<path d="M8 5v14l11-7z" fill="currentColor"/>`

**CDN alternative:** Lucide Icons (https://unpkg.com/lucide@latest/dist/umd/lucide.js) is the closest match to this icon style. Use it if you need icons beyond what's in the codebase.

**No emoji as icons** in production UI — only `🌙☀️✓💡ℹ️` in the specific functional contexts described in Content Fundamentals above.

---

## File Manifest

```
styles.css                    # Global CSS entry point (@imports only)

tokens/
  fonts.css                   # Self-hosted @font-face (Cormorant Garamond, Cinzel, Figtree)
  colors.css                  # All color custom properties
  typography.css              # Font family, size, weight, tracking tokens
  spacing.css                 # Spacing scale + border radius + max-widths
  shadows.css                 # Shadow, glow, focus-ring tokens
  animation.css               # @keyframes + easing + duration tokens
  theme-light.css             # Light theme overrides (html[data-tema="chiaro"])
  base.css                    # Body reset, h1-h4, a, ::selection, .lab-wrap utility

assets/
  lab-style.css               # Original monolithic CSS (source of truth; reference only)
  lab-tema.js                 # Theme toggle script (include at end of <body>)
  artefatti/                  # Kit for lesson artefacts: lab-artefatto.css / .js / README.md

components/
  core/
    Button.jsx / .d.ts / .prompt.md      # Primary, ghost, gold; md/sm sizes
    Badge.jsx / .d.ts / .prompt.md       # Viola, ciano, ambra, rosa, verde, rosso
    Chip.jsx / .d.ts / .prompt.md        # Filter pill with active state
    Card.jsx / .d.ts / .prompt.md        # Base content card with hover lift
    YearCard.jsx / .d.ts / .prompt.md    # School year card with colored left bar
    Input.jsx / .d.ts / .prompt.md       # Labelled text/textarea input
    Nota.jsx / .d.ts / .prompt.md        # Amber info callout
    components.card.html                 # @dsCard: all core component specimens
    yearcards.card.html                  # @dsCard: YearCard specimens
  brand/
    YearMascot.jsx / .d.ts / .prompt.md # Year mascots (Semino, Ichthy, Navicella, Bussolina, Terra)
    mascots.card.html
    AmdgEgg.jsx / .d.ts / .prompt.md    # Hidden AMDG full-screen reveal
    Amdg.jsx / .d.ts / .prompt.md       # Near-invisible AMDG signature mark
    brand.card.html
  exam/
    ExamBadge.jsx / .d.ts / .prompt.md  # Exam lifecycle status pill
    exam-components.card.html            # @dsCard: exam component specimens

guidelines/
  colors-brand.card.html       # Brand violet, cyan, gradients
  colors-semantic.card.html    # Verde, rosso, ambra, warm gradient
  colors-surface.card.html     # All surface/bg/line tokens
  colors-text.card.html        # Ink hierarchy: primary, soft, muted
  colors-years.card.html       # Five year accent colours
  colors-exam.card.html        # Institutional blue/gold palette
  type-display.card.html       # Cormorant Garamond specimens
  type-body.card.html          # Figtree weight scale
  type-scale.card.html         # All size tokens
  golden-ratio.card.html       # φ spacing, type scale, 1.618:1 layout
  spacing-radius.card.html     # Border radius system
  foundations-shadows.card.html  # Shadow + glow examples
  foundations-animation.card.html  # Animation keyframes + tokens
  brand-gradients.card.html    # All gradient tokens
  brand-pattern.card.html      # Eyebrow + heading pattern

ui_kits/
  main-site/
    index.html               # Interactive main site prototype (home + year detail)
  exam-platform/
    index.html               # Interactive exam platform (teacher + student views)
  artefatto/
    index.html               # Example lesson artefact (quiz) built with the artefacts kit

readme.md                    # This file
SKILL.md                     # Claude Code agent skill file
```

---

## Contributing & Iteration

**Font files:** Cormorant Garamond, Cinzel and Figtree are self-hosted in `fonts/` (OFL) and declared with `@font-face` in `tokens/fonts.css` — no Google Fonts.

**New components:** Add `<Name>.jsx` + `<Name>.d.ts` to `components/core/` or `components/exam/`. Update the relevant `.card.html` specimen file to include the new component.

**Adding content types:** The exam platform and main site both use a content-type badge system (`Badge` and `ExamBadge`). New types get new variant values.
