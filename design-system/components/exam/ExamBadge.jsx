import React from 'react';

const CONFIG = {
  bozza:      { label: 'Bozza',      bg: '#eee',     color: '#555'    },
  pubblicata: { label: 'Pubblicata', bg: '#e3f2e9',  color: '#1c7c4a' },
  chiusa:     { label: 'Chiusa',     bg: '#fbe6e4',  color: '#b42318' },
  corretta:   { label: 'Corretta',   bg: '#e3f2e9',  color: '#1c7c4a' },
  consegnata: { label: 'Da correggere', bg: '#fff4d6', color: '#a87c0c' },
  in_corso:   { label: 'In corso',   bg: 'var(--exam-blu-light, #e8edf9)', color: 'var(--exam-blu, #1E3A8A)' },
};

/**
 * Exam-platform status pill. Maps lifecycle states to the institutional
 * blue/gold/green/red palette used in the Area Verifiche.
 */
export function ExamBadge({ status }) {
  const c = CONFIG[status] ?? CONFIG.bozza;

  return (
    <span style={{
      display: 'inline-block',
      fontSize: '.72rem', fontWeight: 800,
      letterSpacing: '.03em', textTransform: 'uppercase',
      padding: '3px 9px', borderRadius: 999,
      background: c.bg, color: c.color,
      fontFamily: 'inherit',
    }}>
      {c.label}
    </span>
  );
}
