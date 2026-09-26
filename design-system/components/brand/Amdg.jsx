import React from 'react';

/** Near-invisible "A·M·D·G" mark. Glows gold on hover; a click opens the AmdgEgg reveal. */
export function Amdg({ size = 11 }) {
  const [hov, setHov] = React.useState(false);
  return (
    <span
      aria-hidden="true"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => window.dispatchEvent(new Event('lab:amdg'))}
      style={{
        fontFamily: 'var(--lab-font-inscription)', fontWeight: 600, fontSize: size,
        letterSpacing: hov ? '.5em' : '.3em', color: hov ? 'var(--lab-oro)' : 'var(--lab-muted)',
        opacity: hov ? 1 : 0.13, textShadow: hov ? '0 0 13px rgba(227,194,122,.6)' : 'none',
        transition: 'all 610ms var(--lab-ease-out)', cursor: 'default', userSelect: 'none', whiteSpace: 'nowrap',
      }}
    >
      A·M·D·G
    </span>
  );
}
