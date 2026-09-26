import React from 'react';

/**
 * Filter chip / pill toggle for content-type or category filter bars.
 * Render a group of Chips with one managing `active` state.
 */
export interface ChipProps {
  /** Chip label */
  children: React.ReactNode;
  /** Whether this chip is the currently selected filter */
  active?: boolean;
  /** Click handler — toggle active state in parent */
  onClick?: () => void;
}
