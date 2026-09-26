import React from 'react';

/**
 * Pill button / link. Reacts to the cursor: magnetic pull (0.236 × offset), light sweep on filled
 * variants, rising fill on outline variants, 0.96 press compression. Golden padding 13/21 (md), 8/13 (sm).
 * @startingPoint section="Core" subtitle="Button — primary, ghost, gold, solemn" viewport="700x220"
 */
export interface ButtonProps {
  children: React.ReactNode;
  /** primary = gradient CTA · ghost = secondary · gold = exam/highlight · solemn = gold hairline, uppercase, for ceremonial moments */
  variant?: 'primary' | 'ghost' | 'gold' | 'solemn';
  size?: 'md' | 'sm';
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}
