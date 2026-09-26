import React from 'react';

/** Pill button with magnetic cursor pull, light sweep and press compression. */
export function Button({ children, variant = 'primary', size = 'md', href, onClick, disabled = false, type = 'button' }) {
  const ref = React.useRef(null);
  const [hov, setHov] = React.useState(false);
  const [down, setDown] = React.useState(false);
  const [off, setOff] = React.useState({ x: 0, y: 0 });
  const sm = size === 'sm';

  const move = (e) => {
    if (disabled || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setOff({ x: (e.clientX - r.left - r.width / 2) * 0.236, y: (e.clientY - r.top - r.height / 2) * 0.382 });
  };
  const leave = () => { setHov(false); setDown(false); setOff({ x: 0, y: 0 }); };

  const vars = {
    primary: { background: 'var(--lab-grad)', color: '#fff', boxShadow: hov ? '0 13px 34px -13px rgba(139,92,246,.75)' : '0 8px 21px -13px rgba(139,92,246,.6)' },
    ghost: { background: 'transparent', color: hov ? 'var(--lab-ink)' : 'var(--lab-ink-soft)', borderColor: hov ? 'var(--lab-viola)' : 'var(--lab-line)' },
    gold: { background: 'var(--lab-ambra)', color: '#3a2a06', boxShadow: hov ? '0 13px 34px -13px rgba(251,191,36,.6)' : 'none' },
    solemn: { background: 'transparent', color: 'var(--lab-oro)', borderColor: hov ? 'var(--lab-oro)' : 'color-mix(in srgb, var(--lab-oro) 45%, transparent)', fontFamily: 'var(--lab-font-inscription)', textTransform: 'uppercase', letterSpacing: '.18em', fontSize: sm ? 12 : 13, fontWeight: 700 },
  };
  const v = vars[variant] ?? vars.primary;
  const filled = variant === 'primary' || variant === 'gold';

  const style = {
    position: 'relative', overflow: 'hidden', isolation: 'isolate',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    fontFamily: 'var(--lab-font-body)', fontWeight: 700, lineHeight: 1, letterSpacing: '.01em',
    fontSize: sm ? 13.5 : 15, padding: sm ? '8px 13px' : '13px 21px',
    borderRadius: 'var(--lab-radius-pill)', border: '1px solid transparent',
    cursor: disabled ? 'not-allowed' : 'pointer', textDecoration: 'none', opacity: disabled ? 0.5 : 1,
    transform: `translate(${off.x}px, ${off.y}px) scale(${down ? 0.96 : 1})`,
    transition: `transform ${hov ? 233 : 610}ms var(--lab-ease-out), box-shadow 377ms ease, border-color 377ms ease, color 233ms ease`,
    ...v,
  };

  const sweep = filled
    ? <span aria-hidden="true" style={{ position: 'absolute', top: 0, bottom: 0, width: '38.2%', left: hov ? '130%' : '-60%', background: 'linear-gradient(100deg, transparent, rgba(255,255,255,.38), transparent)', transform: 'skewX(-20deg)', transition: hov ? 'left 987ms var(--lab-ease-out)' : 'none', zIndex: 0, pointerEvents: 'none' }} />
    : <span aria-hidden="true" style={{ position: 'absolute', inset: 0, background: variant === 'solemn' ? 'var(--lab-oro-soft)' : 'rgba(139,92,246,.12)', transform: `scaleY(${hov ? 1 : 0})`, transformOrigin: 'bottom', transition: 'transform 377ms var(--lab-ease-out)', zIndex: 0, pointerEvents: 'none' }} />;

  const evts = {
    ref, style,
    onMouseEnter: () => !disabled && setHov(true), onMouseMove: move, onMouseLeave: leave,
    onMouseDown: () => !disabled && setDown(true), onMouseUp: () => setDown(false),
  };
  const inner = <>{sweep}<span style={{ position: 'relative', zIndex: 1, display: 'inline-flex', alignItems: 'center', gap: 8 }}>{children}</span></>;

  if (href) return <a href={href} onClick={onClick} {...evts}>{inner}</a>;
  return <button type={type} onClick={onClick} disabled={disabled} {...evts}>{inner}</button>;
}
