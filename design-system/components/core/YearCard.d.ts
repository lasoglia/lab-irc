/**
 * Navigation card for one of the five school years. Tilts toward the cursor, the Roman numeral
 * (Cinzel) drifts with parallax, the colour bar widens, a light in the year colour follows the
 * pointer, and the year's mascot sits bottom-right (clickable easter egg).
 * The surface is tinted with the year colour via `--lab-tinta-card` (default 10%) and the numeral /
 * count text mix the year colour with ink via `--lab-tinta-icona` (default 100%) — both CSS
 * variables can be lowered by the host page (e.g. in the light theme) for contrast.
 * @startingPoint section="Content" subtitle="Year navigation card (anni 1–5)" viewport="700x280"
 */
export interface YearCardProps {
  /** Year number (1–5); drives colour, Roman numeral and mascot */
  year: 1 | 2 | 3 | 4 | 5;
  /** e.g. "Primo anno" */
  name: string;
  description?: string;
  /** Item count shown at the bottom */
  count?: number;
  href?: string;
  /** If provided, default navigation is prevented and this runs instead */
  onClick?: (e: MouseEvent) => void;
  /** Show the year mascot — default true */
  mascot?: boolean;
  /** Phone layout: one ~110–130px row — numeral (33px) and name (22px) on the same line, no description, count below, mascot centred on the right — default false */
  compatto?: boolean;
}
