import React from 'react';

/**
 * Small colour-coded label. Use to tag content type (Slide, Video, Artefatto)
 * or semantic state (success, warning, error).
 */
export interface BadgeProps {
  /** Badge label */
  children: React.ReactNode;
  /** Colour variant — maps to a Lab IRC accent colour; default: 'viola' */
  variant?: 'viola' | 'ciano' | 'ambra' | 'rosa' | 'verde' | 'rosso';
}
