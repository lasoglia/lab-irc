import React from 'react';
import { YearMascot } from '../brand/YearMascot.jsx';

const COLORS = { 1: 'var(--lab-anno-1)', 2: 'var(--lab-anno-2)', 3: 'var(--lab-anno-3)', 4: 'var(--lab-anno-4)', 5: 'var(--lab-anno-5)' };
const ROMAN = { 1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V' };

/**
 * School-year card: colour bar, Roman numeral with parallax, cursor light, year mascot.
 * The surface is tinted with the year colour (`--lab-tinta-card`, default 10%); the numeral and
 * the count row mix the year colour with ink (`--lab-tinta-icona`, default 100%) so the light
 * theme can lower them for contrast. `compatto` turns it into a single ~110–130px row for phones.
 */
export function YearCard({ year = 1, name, description, count, href = '#', onClick, mascot = true, compatto = false }) {
  const ref = React.useRef(null);
  const [hov, setHov] = React.useState(false);
  const [p, setP] = React.useState({ x: 50, y: 50 });
  const color = COLORS[year] ?? 'var(--lab-viola)';
  /* Year colour softened toward ink for text (the bar and the orb keep the full colour). */
  const inkColor = `color-mix(in srgb, ${color} var(--lab-tinta-icona, 100%), var(--lab-ink))`;

  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    setP({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };
  const rx = hov ? ((50 - p.y) / 50) * 3 : 0;
  const ry = hov ? ((p.x - 50) / 50) * 3 : 0;
  const settle = 'transform 610ms cubic-bezier(.16,1,.3,1)';

  const numeral = (
    <span style={{ position: 'relative', fontFamily: 'var(--lab-font-inscription)', fontWeight: 600, fontSize: compatto ? 33 : 46, lineHeight: 1, color: inkColor, transform: `translate(${hov ? (p.x - 50) * 0.13 : 0}px, ${hov ? (p.y - 50) * 0.08 : 0}px)`, transition: hov ? 'transform 144ms linear' : settle }}>
      {ROMAN[year] ?? year}
    </span>
  );
  const title = (
    <span style={{ position: 'relative', fontFamily: 'var(--lab-font-display)', fontWeight: 600, fontSize: compatto ? 22 : 25, lineHeight: 1.15, marginTop: compatto ? 0 : 13 }}>{name}</span>
  );

  return (
    <a
      ref={ref}
      href={href}
      onClick={onClick ? (e) => { e.preventDefault(); onClick(e); } : undefined}
      onMouseEnter={() => setHov(true)}
      onMouseMove={move}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: compatto ? 0 : 233,
        background: `linear-gradient(160deg, color-mix(in srgb, ${color} var(--lab-tinta-card, 10%), var(--lab-surface)), var(--lab-surface) 61.8%)`,
        border: `1px solid color-mix(in srgb, ${color} ${hov ? 45 : 22}%, var(--lab-line))`, borderRadius: 'var(--lab-radius)',
        padding: compatto ? '21px 89px 21px 34px' : '34px 21px 21px 34px', textDecoration: 'none', color: 'var(--lab-ink)',
        boxShadow: hov ? 'var(--lab-shadow-lg)' : 'var(--lab-shadow)',
        transform: `perspective(987px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(${hov ? -8 : 0}px)`,
        transition: hov ? 'transform 144ms linear, box-shadow 377ms ease, border-color 377ms ease' : `${settle}, box-shadow 377ms ease, border-color 377ms ease`,
      }}
    >
      <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: hov ? 8 : 5, background: color, transition: 'width 377ms cubic-bezier(.16,1,.3,1)' }} />
      <span aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: hov ? 1 : 0, transition: 'opacity 377ms ease', background: `radial-gradient(233px circle at ${p.x}% ${p.y}%, color-mix(in srgb, ${color} 22%, transparent), transparent 61.8%)` }} />
      <span aria-hidden="true" style={{ position: 'absolute', right: -34, top: -34, width: 144, height: 144, borderRadius: '50%', background: color, opacity: hov ? 0.18 : 0.10, transform: `scale(${hov ? 1.236 : 1})`, transition: '610ms cubic-bezier(.16,1,.3,1)', pointerEvents: 'none' }} />
      {compatto ? (
        <span style={{ position: 'relative', display: 'flex', alignItems: 'baseline', gap: 13 }}>
          {numeral}
          {title}
        </span>
      ) : (
        <>
          {numeral}
          {title}
        </>
      )}
      {!compatto && description && <p style={{ position: 'relative', color: 'var(--lab-muted)', fontSize: 14, lineHeight: 1.5, margin: '8px 0 0', flex: 1 }}>{description}</p>}
      {count != null && (
        <span style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 8, fontSize: 11.5, fontWeight: 800, letterSpacing: '.13em', textTransform: 'uppercase', color: inkColor, marginTop: compatto ? 8 : 21 }}>
          {count} {count === 1 ? 'contenuto' : 'contenuti'}
          <span style={{ transform: `translateX(${hov ? 5 : 0}px)`, opacity: hov ? 1 : 0, transition: '377ms cubic-bezier(.16,1,.3,1)' }}>→</span>
        </span>
      )}
      {mascot && (
        <span style={compatto
          ? { position: 'absolute', right: 8, top: '50%', zIndex: 2, transform: `translateY(calc(-50% + ${hov ? -5 : 0}px))`, transition: settle }
          : { position: 'absolute', right: 8, bottom: 8, zIndex: 2, transform: `translateY(${hov ? -5 : 0}px)`, transition: settle }}>
          <YearMascot year={year} size={55} />
        </span>
      )}
    </a>
  );
}
