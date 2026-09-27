import React from 'react';
import { ARTE, disegna } from './mascotte-arte.js';

/** Year mascot (stile anime): eyes (or needle) follow the cursor, blinks, speaks on click. */
export function YearMascot({ year = 1, size = 48, speak = true }) {
  const ref = React.useRef(null);
  const clicks = React.useRef(0);
  const uid = 'm' + React.useId().replace(/[^a-zA-Z0-9]/g, '');
  const [look, setLook] = React.useState({ dx: 0, dy: 0, ang: 0 });
  const [blink, setBlink] = React.useState(false);
  const [hov, setHov] = React.useState(false);
  const [felice, setFelice] = React.useState(false);
  const [msg, setMsg] = React.useState(null);
  const m = ARTE[year] || ARTE[1];

  React.useEffect(() => {
    let raf = 0, ev = null;
    const calc = () => {
      raf = 0;
      const el = ref.current; if (!el || !ev) return;
      const r = el.getBoundingClientRect();
      const x = ev.clientX - (r.left + r.width / 2), y = ev.clientY - (r.top + r.height / 2);
      const d = Math.hypot(x, y) || 1, k = Math.min(1, d / 144);
      setLook({ dx: (x / d) * k, dy: (y / d) * k, ang: (Math.atan2(y, x) * 180) / Math.PI + 90 });
    };
    const mv = (e) => { ev = e; if (!raf) raf = requestAnimationFrame(calc); };
    window.addEventListener('mousemove', mv);
    let t, t2;
    const loop = () => { t = setTimeout(() => { setBlink(true); t2 = setTimeout(() => { setBlink(false); loop(); }, 144); }, 2584 + Math.random() * 2584); };
    loop();
    return () => { window.removeEventListener('mousemove', mv); cancelAnimationFrame(raf); clearTimeout(t); clearTimeout(t2); };
  }, []);

  React.useEffect(() => {
    if (!msg) return;
    const id = setTimeout(() => setMsg(null), 2618);
    return () => clearTimeout(id);
  }, [msg]);

  React.useEffect(() => {
    if (!felice) return;
    const id = setTimeout(() => setFelice(false), 890);
    return () => clearTimeout(id);
  }, [felice]);

  const click = (e) => {
    e.preventDefault(); e.stopPropagation();
    clicks.current += 1;
    setFelice(true);
    if (speak) setMsg(clicks.current === 1 ? `Ciao, sono ${m.name}!` : m.lines[(clicks.current - 2) % m.lines.length]);
  };

  const svg = disegna(year, uid, { dx: look.dx, dy: look.dy, ang: look.ang, blink, felice, parla: !!msg });

  return (
    <span
      ref={ref} role="img" aria-label={m.name} onClick={click}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ position: 'relative', display: 'inline-block', width: size, height: size, lineHeight: 0, color: `var(--lab-anno-${year})`, cursor: 'pointer' }}
    >
      <span className="lab-mascotte-bob" style={{ display: 'inline-block', animation: 'labBob 3.2s ease-in-out infinite' }}>
        <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true"
          style={{ overflow: 'visible', transform: `rotate(${hov ? -8 : 0}deg) scale(${felice ? 1.16 : hov ? 1.1 : 1})`, transition: 'transform 377ms cubic-bezier(.34,1.56,.64,1)', filter: hov ? 'drop-shadow(0 5px 8px rgba(0,0,0,.35))' : 'drop-shadow(0 2px 3px rgba(0,0,0,.18))' }}
          dangerouslySetInnerHTML={{ __html: svg }} />
      </span>
      {msg && (
        <span style={{ position: 'absolute', right: 0, bottom: 'calc(100% + 8px)', width: 'max-content', maxWidth: 189, zIndex: 20, pointerEvents: 'none', background: 'var(--lab-surface)', color: 'var(--lab-ink)', border: '1px solid var(--lab-oro)', borderRadius: 13, padding: '8px 13px', fontFamily: 'var(--lab-font-body)', fontSize: 13, fontWeight: 500, lineHeight: 1.4, textAlign: 'left', boxShadow: 'var(--lab-shadow)', animation: 'labRise 377ms cubic-bezier(.16,1,.3,1) both' }}>
          {msg}
        </span>
      )}
    </span>
  );
}
