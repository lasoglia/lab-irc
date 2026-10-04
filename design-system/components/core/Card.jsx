import React from 'react';

/** Content card: subtle 3D tilt toward the cursor plus a light that follows it. */
export function Card({ children, style: extra, onClick, tilt = true, glow = 'rgba(139,92,246,.16)', tint = 'var(--lab-viola)' }) {
  const ref = React.useRef(null);
  const [hov, setHov] = React.useState(false);
  const [down, setDown] = React.useState(false);
  const [p, setP] = React.useState({ x: 50, y: 50 });

  const move = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setP({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };
  const rx = tilt && hov ? ((50 - p.y) / 50) * 2.5 : 0;
  const ry = tilt && hov ? ((p.x - 50) / 50) * 2.5 : 0;

  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseMove={move}
      onMouseLeave={() => { setHov(false); setDown(false); }}
      onMouseDown={() => onClick && setDown(true)}
      onMouseUp={() => setDown(false)}
      style={{
        position: 'relative', overflow: 'hidden',
        background: 'var(--lab-surface)', border: '1px solid',
        borderColor: hov ? `color-mix(in srgb, ${tint} 45%, var(--lab-line))` : 'var(--lab-line)',
        borderRadius: 'var(--lab-radius)', padding: 21,
        boxShadow: hov ? 'var(--lab-shadow-lg)' : 'var(--lab-shadow)',
        transform: `perspective(987px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(${hov ? -5 : 0}px) scale(${down ? 0.985 : 1})`,
        transition: hov
          ? 'transform 144ms linear, box-shadow 377ms ease, border-color 377ms ease'
          : 'transform 610ms var(--lab-ease-out), box-shadow 377ms ease, border-color 377ms ease',
        cursor: onClick ? 'pointer' : 'default',
        ...extra,
      }}
    >
      <span aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: hov ? 1 : 0, transition: 'opacity 377ms ease', background: `radial-gradient(233px circle at ${p.x}% ${p.y}%, ${glow}, transparent 61.8%)` }} />
      <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>{children}</div>
    </div>
  );
}
