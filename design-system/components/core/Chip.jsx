import React from 'react';

/** Filter chip / toggle pill with press compression. */
export function Chip({ children, active = false, onClick }) {
  const [hov, setHov] = React.useState(false);
  const [down, setDown] = React.useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setDown(false); }}
      onMouseDown={() => setDown(true)}
      onMouseUp={() => setDown(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--lab-font-body)',
        fontSize: 13.5, fontWeight: 600, padding: '8px 13px', borderRadius: 'var(--lab-radius-pill)',
        cursor: 'pointer', border: '1px solid',
        transform: `scale(${down ? 0.94 : 1}) translateY(${hov && !active ? -2 : 0}px)`,
        transition: 'transform 233ms var(--lab-ease-out), border-color 233ms ease, background 233ms ease, color 233ms ease',
        ...(active
          ? { background: 'var(--lab-ink)', borderColor: 'var(--lab-ink)', color: 'var(--lab-bg)' }
          : { background: 'var(--lab-surface)', borderColor: hov ? 'var(--lab-oro)' : 'var(--lab-line)', color: hov ? 'var(--lab-ink)' : 'var(--lab-ink-soft)' }),
      }}
    >
      {children}
    </button>
  );
}
