import React from 'react';

const NEEDLE_UP = 'M24 12 L27.5 24 L20.5 24 Z';
const NEEDLE_DN = 'M24 36 L27.5 24 L20.5 24 Z';

const M = {
  1: { name: 'Semino', eyes: [[19.5, 30], [28.5, 30]], smile: 'M20.5 35.5 Q24 38.5 27.5 35.5',
    body: '<path d="M24 19V12" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><ellipse cx="17" cy="11" rx="7" ry="4" fill="currentColor" transform="rotate(-25 17 11)"/><ellipse cx="31" cy="10" rx="7" ry="4" fill="currentColor" transform="rotate(25 31 10)"/><circle cx="24" cy="31" r="13" fill="currentColor"/>',
    lines: ['Ogni grande albero è stato un seme.', 'Da dove vengo? Bella domanda!', 'In principio… c’era una domanda.'] },
  2: { name: 'Ichthy', eyes: [[13, 22]], smile: 'M7.5 27 Q9.5 28.8 11.5 27',
    body: '<path d="M34 24 L46 14 L46 34 Z" fill="currentColor"/><ellipse cx="21" cy="24" rx="16" ry="11" fill="currentColor"/>',
    lines: ['ΙΧΘΥΣ: Gesù Cristo, Figlio di Dio, Salvatore.', 'I primi cristiani mi disegnavano in segreto.', 'Venite dietro a me! (Mc 1,17)'] },
  3: { name: 'Navicella', eyes: [[18.5, 32], [29.5, 32]], smile: 'M21.5 36.5 Q24 38.3 26.5 36.5',
    body: '<path d="M24 6V28" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M26.5 8 L40 25 H26.5 Z" fill="currentColor" fill-opacity=".7"/><path d="M4 28 H44 L37 41 H11 Z" fill="currentColor"/>',
    lines: ['Duc in altum! Prendi il largo. (Lc 5,4)', 'Duemila anni di mare… e ancora a galla.', 'Tempesta? Non temete!'] },
  4: { name: 'Bussolina', eyes: [], smile: null, needle: true,
    body: '<circle cx="24" cy="24" r="18" fill="currentColor"/><circle cx="24" cy="24" r="13" fill="none" stroke="#fff" stroke-opacity=".45" stroke-width="1.5"/><path d="M24 7.5v3" stroke="#fff" stroke-width="2" stroke-linecap="round"/>',
    lines: ['La coscienza è la mia bussola.', 'E la tua, dove punta?', 'Libertà non è andare ovunque: è sapere dove.'] },
  5: { name: 'Terra', eyes: [[19, 27], [29, 27]], smile: 'M20.5 32.5 Q24 35.5 27.5 32.5',
    body: '<circle cx="24" cy="27" r="16" fill="currentColor"/><path d="M11 22 Q24 30 37 22" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="2"/><path d="M24 11.5 C24 5 30 2 36.5 3 C36.5 9.5 31 12.5 24 11.5 Z" fill="#34D399"/>',
    lines: ['Laudato si’! Custodisci la casa comune.', 'Tutto è connesso.', 'Il futuro comincia adesso.'] },
};

/** Year mascot: eyes (or needle) follow the cursor, blinks, speaks on click, 7th click → AMDG. */
export function YearMascot({ year = 1, size = 48, speak = true }) {
  const ref = React.useRef(null);
  const clicks = React.useRef(0);
  const [look, setLook] = React.useState({ dx: 0, dy: 0, ang: 0 });
  const [blink, setBlink] = React.useState(false);
  const [hov, setHov] = React.useState(false);
  const [msg, setMsg] = React.useState(null);
  const m = M[year] || M[1];

  React.useEffect(() => {
    const mv = (e) => {
      const el = ref.current; if (!el) return;
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2), y = e.clientY - (r.top + r.height / 2);
      const d = Math.hypot(x, y) || 1, k = Math.min(1, d / 144);
      setLook({ dx: (x / d) * 1.4 * k, dy: (y / d) * 1.4 * k, ang: (Math.atan2(y, x) * 180) / Math.PI + 90 });
    };
    window.addEventListener('mousemove', mv);
    let t, t2;
    const loop = () => { t = setTimeout(() => { setBlink(true); t2 = setTimeout(() => { setBlink(false); loop(); }, 144); }, 2584 + Math.random() * 2584); };
    loop();
    return () => { window.removeEventListener('mousemove', mv); clearTimeout(t); clearTimeout(t2); };
  }, []);

  React.useEffect(() => {
    if (!msg) return;
    const id = setTimeout(() => setMsg(null), 2618);
    return () => clearTimeout(id);
  }, [msg]);

  const click = (e) => {
    e.preventDefault(); e.stopPropagation();
    clicks.current += 1;
    if (clicks.current >= 7) { clicks.current = 0; setMsg(null); window.dispatchEvent(new Event('lab:amdg')); return; }
    if (speak) setMsg(clicks.current === 1 ? `Ciao, sono ${m.name}!` : m.lines[(clicks.current - 2) % m.lines.length]);
  };

  return (
    <span
      ref={ref} role="img" aria-label={m.name} onClick={click}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ position: 'relative', display: 'inline-block', width: size, height: size, lineHeight: 0, color: `var(--lab-anno-${year})`, cursor: 'pointer' }}
    >
      <svg viewBox="0 0 48 48" width={size} height={size} aria-hidden="true"
        style={{ overflow: 'visible', transform: `rotate(${hov ? -8 : 0}deg) scale(${hov ? 1.13 : 1})`, transition: 'transform 377ms cubic-bezier(.16,1,.3,1)', filter: hov ? 'drop-shadow(0 5px 8px rgba(0,0,0,.35))' : 'none' }}>
        <g dangerouslySetInnerHTML={{ __html: m.body }} />
        {m.needle && (
          <g transform={`rotate(${look.ang.toFixed(1)} 24 24)`}>
            <path d={NEEDLE_UP} fill="#fff" />
            <path d={NEEDLE_DN} fill="#14131F" fillOpacity=".55" />
            <circle cx="24" cy="24" r="2.4" fill="#fff" />
          </g>
        )}
        {m.eyes.map(([x, y], i) => (
          <g key={i} transform={`translate(${x} ${y}) scale(1 ${blink ? 0.12 : 1})`}>
            <circle r="3.4" fill="#fff" />
            <circle r="1.7" cx={look.dx} cy={look.dy} fill="#14131F" />
          </g>
        ))}
        {m.smile && <path d={m.smile} fill="none" stroke="#14131F" strokeWidth="1.6" strokeLinecap="round" strokeOpacity=".7" />}
      </svg>
      {msg && (
        <span style={{ position: 'absolute', right: 0, bottom: 'calc(100% + 8px)', width: 'max-content', maxWidth: 189, zIndex: 20, pointerEvents: 'none', background: 'var(--lab-surface)', color: 'var(--lab-ink)', border: '1px solid var(--lab-oro)', borderRadius: 13, padding: '8px 13px', fontFamily: 'var(--lab-font-body)', fontSize: 13, fontWeight: 500, lineHeight: 1.4, textAlign: 'left', boxShadow: 'var(--lab-shadow)', animation: 'labRise 377ms cubic-bezier(.16,1,.3,1) both' }}>
          {msg}
        </span>
      )}
    </span>
  );
}
