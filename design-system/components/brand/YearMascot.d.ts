/**
 * The 2D mascot of a school year — same figure on the year card, year page, material cards and every
 * lesson artefact/game of that year. Wraps the dependency-free web component <lab-mascotte>
 * (site-root /assets/mascotte/lab-mascotte.js); static SVGs in assets/mascotte/svg/.
 * 1 Semino (seme) · 2 Ichthy (pesce) · 3 Navicella (barca di Pietro) · 4 Bussolina (coscienza) · 5 Terra (casa comune).
 * 144×144 Fibonacci geometry, gold halo. Eyes follow the cursor (Bussolina's needle points at it), blinks,
 * speaks on click (no AMDG on repeated clicks).
 * Sizes: 34 material card (halo=false) · 55 year card · 89 artefact · 144 year page.
 */
export interface YearMascotProps {
  /** School year 1–5 */
  year: 1 | 2 | 3 | 4 | 5;
  /** Pixel size — default 55. Use 34 · 55 · 89 · 144 */
  size?: number;
  /** Speech bubble on click — default true */
  speak?: boolean;
  /** Gold halo ring — default true; false on small material cards */
  halo?: boolean;
  /** Eyes don't follow the cursor, no blinking — default false */
  still?: boolean;
  /** Speech-bubble direction: "sinistra" (default, near the right edge) or "sotto" (opens below) */
  fumetto?: "sinistra" | "sotto";
  /** @deprecated use halo */
  aureola?: boolean;
}
