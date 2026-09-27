/**
 * The mascot ("logo simpatico") of a school year. Same figure appears on the YearCard,
 * the year page, material cards and every lesson artefact of that year.
 * 1 Semino (seme) · 2 Ichthy (pesce) · 3 Navicella (barca di Pietro) · 4 Bussolina (coscienza) · 5 Terra (casa comune).
 * Eyes follow the cursor (Bussolina's needle points at it), it blinks and speaks a line on click.
 * Rendered by the <lab-mascotte> web component (assets/mascotte/lab-mascotte.js).
 */
export interface YearMascotProps {
  /** School year 1–5 — picks figure, colour (--lab-anno-N) and lines */
  year: 1 | 2 | 3 | 4 | 5;
  /** Pixel size — default 55 (consigliati 34 · 55 · 89 · 144) */
  size?: number;
  /** Show the speech bubble on click — default true */
  speak?: boolean;
  /** Golden halo ring — default true */
  aureola?: boolean;
}
