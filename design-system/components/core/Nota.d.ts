import React from 'react';

/**
 * Amber left-bordered informational callout.
 * Use for tips, privacy notices, anti-cheat warnings, pedagogical hints.
 * Matches the `.lab-nota` and `.nota` pattern from the existing stylesheets.
 */
export interface NotaProps {
  /** Callout content — text or JSX */
  children: React.ReactNode;
  /** Optional leading icon (emoji or SVG); omit to show no icon */
  icon?: React.ReactNode;
}
