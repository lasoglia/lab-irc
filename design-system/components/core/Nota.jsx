import React from 'react';

/**
 * Amber left-bordered informational callout box.
 */
export function Nota({ children, icon }) {
  return (
    <div style={{
      borderLeft: '4px solid var(--lab-ambra, #FBBF24)',
      background: 'rgba(251,191,36,.12)',
      borderRadius: '0 var(--lab-radius-sm, 12px) var(--lab-radius-sm, 12px) 0',
      padding: '14px 18px',
      color: 'var(--lab-ink-soft, #C7C3DA)',
      fontSize: 15, lineHeight: 1.55,
      display: 'flex', gap: 10, alignItems: 'flex-start',
    }}>
      {icon !== undefined && (
        <span style={{ flexShrink: 0, fontSize: 16 }}>{icon}</span>
      )}
      <div>{children}</div>
    </div>
  );
}
