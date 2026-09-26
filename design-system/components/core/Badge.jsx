import React from 'react';

/**
 * Small colour-coded label for content types, categories, and status.
 */
export function Badge({ children, variant = 'viola' }) {
  const palette = {
    viola: { bg: 'rgba(139,92,246,.22)', color: 'var(--lab-viola-2, #A78BFA)' },
    ciano: { bg: 'rgba(34,211,238,.22)',  color: 'var(--lab-ciano, #22D3EE)'  },
    ambra: { bg: 'rgba(251,191,36,.24)',  color: 'var(--lab-ambra, #FBBF24)'  },
    rosa:  { bg: 'rgba(244,114,182,.22)', color: 'var(--lab-rosa, #F472B6)'   },
    verde: { bg: 'rgba(52,211,153,.22)',  color: 'var(--lab-verde, #34D399)'  },
    rosso: { bg: 'rgba(251,113,133,.22)', color: 'var(--lab-rosso, #FB7185)'  },
  };

  const p = palette[variant] ?? palette.viola;

  return (
    <span style={{
      display: 'inline-block',
      fontSize: 11.5, fontWeight: 800,
      letterSpacing: '.04em', textTransform: 'uppercase',
      padding: '4px 11px', borderRadius: 8,
      background: p.bg, color: p.color,
      fontFamily: 'inherit',
    }}>
      {children}
    </span>
  );
}
