import React from 'react';

const LETTERS = ['A', 'M', 'D', 'G'];

/**
 * Hidden AMDG reveal. Mount once per page. Triggers:
 *  • typing "amdg" anywhere (outside inputs)
 *  • 7 quick clicks on any element with [data-amdg-trigger]
 *  • window.dispatchEvent(new Event('lab:amdg'))
 * Closes on click, Esc, or after 6.18s.
 */
export function AmdgEgg({ secret = 'amdg', clicks = 7, duration = 6180 }) {
  const [phase, setPhase] = React.useState('off'); // off | in | out

  React.useEffect(() => {
    let buf = '', count = 0, t;
    const show = () => setPhase('in');
    const key = (e) => {
      const tag = (e.target.tagName || '').toLowerCase();
      if (e.key === 'Escape') { setPhase((p) => (p === 'in' ? 'out' : p)); return; }
      if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable || e.key.length !== 1) return;
      buf = (buf + e.key.toLowerCase()).slice(-secret.length);
      if (buf === secret) show();
    };
    const click = (e) => {
      if (!e.target.closest || !e.target.closest('[data-amdg-trigger]')) return;
      count += 1; clearTimeout(t); t = setTimeout(() => { count = 0; }, 1618);
      if (count >= clicks) { count = 0; show(); }
    };
    window.addEventListener('keydown', key);
    document.addEventListener('click', click);
    window.addEventListener('lab:amdg', show);
    if (!window.__labAmdgLogged) {
      window.__labAmdgLogged = true;
      console.log('%cA · M · D · G', 'font: 600 21px Cinzel, Georgia, serif; color: #E3C27A; letter-spacing: .3em');
      console.log('%cAd maiorem Dei gloria — prova a scrivere "amdg".', 'font: italic 13px Georgia, serif; color: #8E89A6');
    }
    return () => { window.removeEventListener('keydown', key); document.removeEventListener('click', click); window.removeEventListener('lab:amdg', show); clearTimeout(t); };
  }, [secret, clicks]);

  React.useEffect(() => {
    if (phase === 'in') { const id = setTimeout(() => setPhase('out'), duration); return () => clearTimeout(id); }
    if (phase === 'out') { const id = setTimeout(() => setPhase('off'), 610); return () => clearTimeout(id); }
  }, [phase, duration]);

  if (phase === 'off') return null;

  return (
    <div
      role="dialog" aria-label="Ad maiorem Dei gloria"
      onClick={() => setPhase('out')}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999, display: 'grid', placeItems: 'center', cursor: 'pointer',
        background: 'radial-gradient(circle at 50% 45%, rgba(227,194,122,.18), rgba(10,9,16,.95) 61.8%)',
        backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
        opacity: phase === 'out' ? 0 : 1, transition: 'opacity 610ms ease',
        animation: 'labFade 610ms ease-out both',
      }}
    >
      <div style={{ textAlign: 'center', padding: 34 }}>
        <div style={{ color: '#E3C27A', fontSize: 34, animation: 'labBreath 2.6s ease-in-out infinite', marginBottom: 21 }}>✦</div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: '.2em', fontFamily: 'var(--lab-font-inscription, Georgia, serif)', fontWeight: 600, fontSize: 'clamp(55px, 11vw, 144px)', lineHeight: 1, color: '#F3E7C6', textShadow: '0 0 34px rgba(227,194,122,.45)' }}>
          {LETTERS.map((l, i) => (
            <React.Fragment key={l}>
              {i > 0 && <span style={{ color: '#E3C27A', fontSize: '.382em', animation: `labFade 987ms ease ${233 + i * 89}ms both` }}>·</span>}
              <span style={{ display: 'inline-block', animation: `labRise 987ms cubic-bezier(.16,1,.3,1) ${233 + i * 144}ms both` }}>{l}</span>
            </React.Fragment>
          ))}
        </div>
        <div style={{ height: 1, width: 'min(377px, 61.8vw)', margin: '34px auto 21px', background: 'linear-gradient(90deg, transparent, #E3C27A, transparent)', animation: 'labLine 987ms cubic-bezier(.16,1,.3,1) 987ms both' }} />
        <div style={{ fontFamily: 'var(--lab-font-display, Georgia, serif)', fontStyle: 'italic', fontWeight: 500, fontSize: 'clamp(20px, 2.6vw, 26px)', color: 'rgba(243,231,198,.9)', animation: 'labRise 987ms cubic-bezier(.16,1,.3,1) 1220ms both' }}>
          Ad maiorem Dei gloria
        </div>
        <div style={{ fontFamily: 'var(--lab-font-body, sans-serif)', fontSize: 12.5, fontWeight: 800, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(227,194,122,.7)', marginTop: 13, animation: 'labFade 987ms ease 1600ms both' }}>
          Per la maggior gloria di Dio
        </div>
      </div>
    </div>
  );
}
