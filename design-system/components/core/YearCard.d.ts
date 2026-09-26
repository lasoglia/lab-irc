/**
 * Navigation card for one of the five school years. Tilts toward the cursor, the Roman numeral
 * (Cinzel) drifts with parallax, the colour bar widens, a light in the year colour follows the
 * pointer, and the year's mascot sits bottom-right (clickable easter egg).
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
}
