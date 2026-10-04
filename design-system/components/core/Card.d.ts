import React from 'react';

/**
 * Base content card. On hover it lifts 5px, tilts ≤2.5° toward the cursor (perspective 987px)
 * and a soft radial light follows the pointer. Radius 21, padding 21.
 */
export interface CardProps {
  children: React.ReactNode;
  /** Extra inline styles (e.g. background override, padding: 0 for media cards) */
  style?: React.CSSProperties;
  onClick?: () => void;
  /** 3D tilt toward the cursor — default true. Disable for dense lists. */
  tilt?: boolean;
  /** Colour of the cursor-following light — default soft violet */
  glow?: string;
  /** Colour mixed into the border on hover (45% over --lab-line) — default 'var(--lab-viola)'; pass the year colour on year-tinted cards */
  tint?: string;
}
