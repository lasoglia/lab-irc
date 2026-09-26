/* @ds-bundle: {"format":4,"namespace":"LabIrc_948687","components":[{"name":"Amdg","sourcePath":"components/brand/Amdg.jsx"},{"name":"AmdgEgg","sourcePath":"components/brand/AmdgEgg.jsx"},{"name":"YearMascot","sourcePath":"components/brand/YearMascot.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Chip","sourcePath":"components/core/Chip.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"Nota","sourcePath":"components/core/Nota.jsx"},{"name":"YearCard","sourcePath":"components/core/YearCard.jsx"},{"name":"ExamBadge","sourcePath":"components/exam/ExamBadge.jsx"}],"sourceHashes":{"assets/artefatti/lab-artefatto.js":"bf1b05ed34c4","assets/lab-tema.js":"230d6831fe00","components/brand/Amdg.jsx":"466f5bfee1a9","components/brand/AmdgEgg.jsx":"e0442c040d95","components/brand/YearMascot.jsx":"5196a74b5c05","components/core/Badge.jsx":"b335514d2292","components/core/Button.jsx":"9ab0a3a81309","components/core/Card.jsx":"32b976098131","components/core/Chip.jsx":"7aee5ec22509","components/core/Input.jsx":"025f1abd43bf","components/core/Nota.jsx":"058d8c240a14","components/core/YearCard.jsx":"4189187d7be4","components/exam/ExamBadge.jsx":"09b493980764"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.LabIrc_948687 = window.LabIrc_948687 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// assets/artefatti/lab-artefatto.js
try { (() => {
/* Lab IRC — Kit artefatti. Mettere in fondo al <body class="la" data-anno="1-5">.
   Aggiunge: tema salvato, luce che segue il cursore, schede reattive, mascotte dell'anno, easter egg AMDG.
   API: LabArtefatto.say(testo) · .cheer() · .oops() · .amdg() */
(function () {
  var d = document,
    w = window;
  try {
    var t = localStorage.getItem('tema_lab');
    if (t) d.documentElement.dataset.tema = t;
  } catch (e) {}
  var reduce = w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var M = {
    1: {
      name: 'Semino',
      eyes: [[19.5, 30], [28.5, 30]],
      smile: 'M20.5 35.5 Q24 38.5 27.5 35.5',
      body: '<path d="M24 19V12" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><ellipse cx="17" cy="11" rx="7" ry="4" fill="currentColor" transform="rotate(-25 17 11)"/><ellipse cx="31" cy="10" rx="7" ry="4" fill="currentColor" transform="rotate(25 31 10)"/><circle cx="24" cy="31" r="13" fill="currentColor"/>',
      lines: ['Ogni grande albero è stato un seme.', 'Da dove vengo? Bella domanda!', 'In principio… c’era una domanda.']
    },
    2: {
      name: 'Ichthy',
      eyes: [[13, 22]],
      smile: 'M7.5 27 Q9.5 28.8 11.5 27',
      body: '<path d="M34 24 L46 14 L46 34 Z" fill="currentColor"/><ellipse cx="21" cy="24" rx="16" ry="11" fill="currentColor"/>',
      lines: ['ΙΧΘΥΣ: Gesù Cristo, Figlio di Dio, Salvatore.', 'I primi cristiani mi disegnavano in segreto.', 'Venite dietro a me! (Mc 1,17)']
    },
    3: {
      name: 'Navicella',
      eyes: [[18.5, 32], [29.5, 32]],
      smile: 'M21.5 36.5 Q24 38.3 26.5 36.5',
      body: '<path d="M24 6V28" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M26.5 8 L40 25 H26.5 Z" fill="currentColor" fill-opacity=".7"/><path d="M4 28 H44 L37 41 H11 Z" fill="currentColor"/>',
      lines: ['Duc in altum! Prendi il largo. (Lc 5,4)', 'Duemila anni di mare… e ancora a galla.', 'Tempesta? Non temete!']
    },
    4: {
      name: 'Bussolina',
      eyes: [],
      smile: null,
      needle: true,
      body: '<circle cx="24" cy="24" r="18" fill="currentColor"/><circle cx="24" cy="24" r="13" fill="none" stroke="#fff" stroke-opacity=".45" stroke-width="1.5"/><path d="M24 7.5v3" stroke="#fff" stroke-width="2" stroke-linecap="round"/>',
      lines: ['La coscienza è la mia bussola.', 'E la tua, dove punta?', 'Libertà non è andare ovunque: è sapere dove.']
    },
    5: {
      name: 'Terra',
      eyes: [[19, 27], [29, 27]],
      smile: 'M20.5 32.5 Q24 35.5 27.5 32.5',
      body: '<circle cx="24" cy="27" r="16" fill="currentColor"/><path d="M11 22 Q24 30 37 22" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="2"/><path d="M24 11.5 C24 5 30 2 36.5 3 C36.5 9.5 31 12.5 24 11.5 Z" fill="#34D399"/>',
      lines: ['Laudato si’! Custodisci la casa comune.', 'Tutto è connesso.', 'Il futuro comincia adesso.']
    }
  };
  var CHEER = ['Esatto!', 'Bravissimo!', 'Proprio così!', 'Ottimo!'];
  var OOPS = ['Quasi… riprova!', 'Mmm, pensaci ancora.', 'Non proprio. Coraggio!'];
  var pick = function (a) {
    return a[Math.floor(Math.random() * a.length)];
  };
  var NEEDLE = '<g class="la-needle"><path d="M24 12 L27.5 24 L20.5 24 Z" fill="#fff"/><path d="M24 36 L27.5 24 L20.5 24 Z" fill="#14131F" fill-opacity=".55"/><circle cx="24" cy="24" r="2.4" fill="#fff"/></g>';
  var EYE = function (p) {
    return '<g transform="translate(' + p[0] + ' ' + p[1] + ')"><g class="la-lid"><circle r="3.4" fill="#fff"/><circle class="la-pupil" r="1.7" fill="#14131F"/></g></g>';
  };
  var egg = null;
  function amdg() {
    if (egg) return;
    egg = d.createElement('div');
    egg.className = 'la-amdg';
    egg.setAttribute('role', 'dialog');
    egg.setAttribute('aria-label', 'Ad maiorem Dei gloria');
    egg.innerHTML = '<div><div class="la-amdg-star">✦</div><div class="la-amdg-letters">' + ['A', 'M', 'D', 'G'].map(function (l, i) {
      return (i ? '<i style="animation-delay:' + (233 + i * 89) + 'ms">·</i>' : '') + '<b style="animation-delay:' + (233 + i * 144) + 'ms">' + l + '</b>';
    }).join('') + '</div><div class="la-amdg-line"></div><div class="la-amdg-lat">Ad maiorem Dei gloria</div><div class="la-amdg-it">Per la maggior gloria di Dio</div></div>';
    d.body.appendChild(egg);
    var el = egg,
      timer;
    var close = function () {
      if (egg !== el) return;
      egg = null;
      clearTimeout(timer);
      d.removeEventListener('keydown', esc);
      el.classList.add('is-out');
      setTimeout(function () {
        el.remove();
      }, 610);
    };
    var esc = function (e) {
      if (e.key === 'Escape') close();
    };
    el.addEventListener('click', close);
    d.addEventListener('keydown', esc);
    timer = setTimeout(close, 6180);
  }
  function mascot() {
    var y = +(d.body.getAttribute('data-anno') || 0),
      m = M[y];
    if (!m) return null;
    var el = d.createElement('button');
    el.type = 'button';
    el.className = 'la-mascot';
    el.setAttribute('aria-label', m.name);
    el.style.color = 'var(--lab-anno-' + y + ')';
    el.innerHTML = '<span class="la-bubble" hidden></span><svg viewBox="0 0 48 48" aria-hidden="true">' + m.body + (m.needle ? NEEDLE : '') + m.eyes.map(EYE).join('') + (m.smile ? '<path d="' + m.smile + '" fill="none" stroke="#14131F" stroke-width="1.6" stroke-linecap="round" stroke-opacity=".7"/>' : '') + '</svg>';
    d.body.appendChild(el);
    var bub = el.querySelector('.la-bubble'),
      pupils = el.querySelectorAll('.la-pupil'),
      needle = el.querySelector('.la-needle'),
      n = 0,
      bt;
    w.addEventListener('mousemove', function (e) {
      var r = el.getBoundingClientRect(),
        x = e.clientX - (r.left + r.width / 2),
        yy = e.clientY - (r.top + r.height / 2);
      var dd = Math.hypot(x, yy) || 1,
        k = Math.min(1, dd / 144);
      for (var i = 0; i < pupils.length; i++) {
        pupils[i].setAttribute('cx', (x / dd * 1.4 * k).toFixed(2));
        pupils[i].setAttribute('cy', (yy / dd * 1.4 * k).toFixed(2));
      }
      if (needle) needle.setAttribute('transform', 'rotate(' + (Math.atan2(yy, x) * 180 / Math.PI + 90).toFixed(1) + ' 24 24)');
    });
    (function blink() {
      setTimeout(function () {
        el.classList.add('blink');
        setTimeout(function () {
          el.classList.remove('blink');
          blink();
        }, 144);
      }, 2584 + Math.random() * 2584);
    })();
    function say(txt) {
      bub.textContent = txt;
      bub.hidden = false;
      bub.style.animation = 'none';
      void bub.offsetWidth;
      bub.style.animation = '';
      clearTimeout(bt);
      bt = setTimeout(function () {
        bub.hidden = true;
      }, 2618);
    }
    el.addEventListener('click', function () {
      n++;
      if (n >= 7) {
        n = 0;
        bub.hidden = true;
        amdg();
        return;
      }
      say(n === 1 ? 'Ciao, sono ' + m.name + '!' : m.lines[(n - 2) % m.lines.length]);
    });
    return {
      say: say
    };
  }
  function init() {
    var mas = mascot();
    if (!reduce) {
      var h = d.createElement('div');
      h.className = 'la-halo';
      h.setAttribute('aria-hidden', 'true');
      d.body.appendChild(h);
      var hx = innerWidth / 2,
        hy = innerHeight / 3,
        tx = hx,
        ty = hy;
      w.addEventListener('mousemove', function (e) {
        tx = e.clientX;
        ty = e.clientY;
        h.style.opacity = 1;
      });
      (function loop() {
        hx += (tx - hx) * .1618;
        hy += (ty - hy) * .1618;
        h.style.transform = 'translate(' + (hx - 233) + 'px,' + (hy - 233) + 'px)';
        requestAnimationFrame(loop);
      })();
    }
    var hot = null;
    d.addEventListener('mousemove', function (e) {
      var c = e.target.closest ? e.target.closest('.la-card') : null;
      if (hot && hot !== c) {
        hot.classList.remove('is-hot');
        hot.style.transform = '';
      }
      hot = c;
      if (!c) return;
      var r = c.getBoundingClientRect(),
        px = (e.clientX - r.left) / r.width,
        py = (e.clientY - r.top) / r.height;
      c.classList.add('is-hot');
      c.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
      c.style.setProperty('--my', (py * 100).toFixed(1) + '%');
      if (!c.hasAttribute('data-flat') && !reduce) c.style.transform = 'perspective(987px) rotateX(' + ((.5 - py) * 4).toFixed(2) + 'deg) rotateY(' + ((px - .5) * 4).toFixed(2) + 'deg) translateY(-3px)';
    });
    d.addEventListener('animationend', function (e) {
      if (e.animationName === 'labRise' && e.target.hasAttribute && e.target.hasAttribute('data-reveal')) e.target.removeAttribute('data-reveal');
    });
    var buf = '';
    d.addEventListener('keydown', function (e) {
      var tag = (e.target.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable || !e.key || e.key.length !== 1) return;
      buf = (buf + e.key.toLowerCase()).slice(-4);
      if (buf === 'amdg') amdg();
    });
    w.addEventListener('lab:amdg', amdg);
    var say = function (t) {
      if (mas) mas.say(t);
    };
    w.LabArtefatto = {
      say: say,
      cheer: function () {
        say(pick(CHEER));
      },
      oops: function () {
        say(pick(OOPS));
      },
      amdg: amdg
    };
    console.log('%cA · M · D · G', 'font: 600 21px Cinzel, Georgia, serif; color: #E3C27A; letter-spacing: .3em');
  }
  w.LabArtefatto = {
    say: function () {},
    cheer: function () {},
    oops: function () {},
    amdg: amdg
  };
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', init);else init();
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "assets/artefatti/lab-artefatto.js", error: String((e && e.message) || e) }); }

// assets/lab-tema.js
try { (() => {
/* =====================================================================
   lab-tema.js — interruttore chiaro/scuro condiviso per lab-irc
   ---------------------------------------------------------------------
   Da includere con UNA riga, alla fine del <body>:

       <script src="../assets/lab-tema.js"></script>

   Crea il pulsante 🌙/☀️ in basso a destra e ricorda la scelta sul
   dispositivo (localStorage). Usa la stessa logica data-tema dell'area
   verifiche, così la preferenza è coerente in tutto il sito.

   Per evitare il "lampo" di tema sbagliato al caricamento, metti anche
   questo nello <head> della pagina, PRIMA del CSS:

     <script>try{var t=localStorage.getItem('tema_lab');
       if(t)document.documentElement.dataset.tema=t;}catch(e){}</script>
   ===================================================================== */
(function () {
  var CHIAVE = "tema_lab";
  function corrente() {
    /* Default del sito = "scuro" (Notte studio). */
    return document.documentElement.dataset.tema === "chiaro" ? "chiaro" : "scuro";
  }
  function applica(t) {
    document.documentElement.dataset.tema = t;
    try {
      localStorage.setItem(CHIAVE, t);
    } catch (e) {}
  }

  /* Applica subito la preferenza salvata (se lo script di <head> non c'era). */
  try {
    var salvato = localStorage.getItem(CHIAVE);
    if (salvato) document.documentElement.dataset.tema = salvato;
  } catch (e) {}
  function crea() {
    if (document.getElementById("labTema")) return;
    var btn = document.createElement("button");
    btn.id = "labTema";
    btn.type = "button";
    btn.setAttribute("aria-label", "Cambia tema chiaro/scuro");
    btn.textContent = corrente() === "scuro" ? "☀️" : "🌙";
    btn.addEventListener("click", function () {
      var nuovo = corrente() === "scuro" ? "chiaro" : "scuro";
      applica(nuovo);
      btn.textContent = nuovo === "scuro" ? "☀️" : "🌙";
    });
    document.body.appendChild(btn);
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", crea);
  } else {
    crea();
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "assets/lab-tema.js", error: String((e && e.message) || e) }); }

// components/brand/Amdg.jsx
try { (() => {
/** Near-invisible "A·M·D·G" mark. Glows gold on hover; a click opens the AmdgEgg reveal. */
function Amdg({
  size = 11
}) {
  const [hov, setHov] = React.useState(false);
  return /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    onMouseEnter: () => setHov(true),
    onMouseLeave: () => setHov(false),
    onClick: () => window.dispatchEvent(new Event('lab:amdg')),
    style: {
      fontFamily: 'var(--lab-font-inscription)',
      fontWeight: 600,
      fontSize: size,
      letterSpacing: hov ? '.5em' : '.3em',
      color: hov ? 'var(--lab-oro)' : 'var(--lab-muted)',
      opacity: hov ? 1 : 0.13,
      textShadow: hov ? '0 0 13px rgba(227,194,122,.6)' : 'none',
      transition: 'all 610ms var(--lab-ease-out)',
      cursor: 'default',
      userSelect: 'none',
      whiteSpace: 'nowrap'
    }
  }, "A\xB7M\xB7D\xB7G");
}
Object.assign(__ds_scope, { Amdg });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Amdg.jsx", error: String((e && e.message) || e) }); }

// components/brand/AmdgEgg.jsx
try { (() => {
const LETTERS = ['A', 'M', 'D', 'G'];

/**
 * Hidden AMDG reveal. Mount once per page. Triggers:
 *  • typing "amdg" anywhere (outside inputs)
 *  • 7 quick clicks on any element with [data-amdg-trigger]
 *  • window.dispatchEvent(new Event('lab:amdg'))
 * Closes on click, Esc, or after 6.18s.
 */
function AmdgEgg({
  secret = 'amdg',
  clicks = 7,
  duration = 6180
}) {
  const [phase, setPhase] = React.useState('off'); // off | in | out

  React.useEffect(() => {
    let buf = '',
      count = 0,
      t;
    const show = () => setPhase('in');
    const key = e => {
      const tag = (e.target.tagName || '').toLowerCase();
      if (e.key === 'Escape') {
        setPhase(p => p === 'in' ? 'out' : p);
        return;
      }
      if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable || e.key.length !== 1) return;
      buf = (buf + e.key.toLowerCase()).slice(-secret.length);
      if (buf === secret) show();
    };
    const click = e => {
      if (!e.target.closest || !e.target.closest('[data-amdg-trigger]')) return;
      count += 1;
      clearTimeout(t);
      t = setTimeout(() => {
        count = 0;
      }, 1618);
      if (count >= clicks) {
        count = 0;
        show();
      }
    };
    window.addEventListener('keydown', key);
    document.addEventListener('click', click);
    window.addEventListener('lab:amdg', show);
    if (!window.__labAmdgLogged) {
      window.__labAmdgLogged = true;
      console.log('%cA · M · D · G', 'font: 600 21px Cinzel, Georgia, serif; color: #E3C27A; letter-spacing: .3em');
      console.log('%cAd maiorem Dei gloria — prova a scrivere "amdg".', 'font: italic 13px Georgia, serif; color: #8E89A6');
    }
    return () => {
      window.removeEventListener('keydown', key);
      document.removeEventListener('click', click);
      window.removeEventListener('lab:amdg', show);
      clearTimeout(t);
    };
  }, [secret, clicks]);
  React.useEffect(() => {
    if (phase === 'in') {
      const id = setTimeout(() => setPhase('out'), duration);
      return () => clearTimeout(id);
    }
    if (phase === 'out') {
      const id = setTimeout(() => setPhase('off'), 610);
      return () => clearTimeout(id);
    }
  }, [phase, duration]);
  if (phase === 'off') return null;
  return /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-label": "Ad maiorem Dei gloria",
    onClick: () => setPhase('out'),
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      display: 'grid',
      placeItems: 'center',
      cursor: 'pointer',
      background: 'radial-gradient(circle at 50% 45%, rgba(227,194,122,.18), rgba(10,9,16,.95) 61.8%)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      opacity: phase === 'out' ? 0 : 1,
      transition: 'opacity 610ms ease',
      animation: 'labFade 610ms ease-out both'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: 34
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: '#E3C27A',
      fontSize: 34,
      animation: 'labBreath 2.6s ease-in-out infinite',
      marginBottom: 21
    }
  }, "\u2726"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'baseline',
      gap: '.2em',
      fontFamily: 'var(--lab-font-inscription, Georgia, serif)',
      fontWeight: 600,
      fontSize: 'clamp(55px, 11vw, 144px)',
      lineHeight: 1,
      color: '#F3E7C6',
      textShadow: '0 0 34px rgba(227,194,122,.45)'
    }
  }, LETTERS.map((l, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: l
  }, i > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#E3C27A',
      fontSize: '.382em',
      animation: `labFade 987ms ease ${233 + i * 89}ms both`
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      animation: `labRise 987ms cubic-bezier(.16,1,.3,1) ${233 + i * 144}ms both`
    }
  }, l)))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      width: 'min(377px, 61.8vw)',
      margin: '34px auto 21px',
      background: 'linear-gradient(90deg, transparent, #E3C27A, transparent)',
      animation: 'labLine 987ms cubic-bezier(.16,1,.3,1) 987ms both'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--lab-font-display, Georgia, serif)',
      fontStyle: 'italic',
      fontWeight: 500,
      fontSize: 'clamp(20px, 2.6vw, 26px)',
      color: 'rgba(243,231,198,.9)',
      animation: 'labRise 987ms cubic-bezier(.16,1,.3,1) 1220ms both'
    }
  }, "Ad maiorem Dei gloria"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--lab-font-body, sans-serif)',
      fontSize: 12.5,
      fontWeight: 800,
      letterSpacing: '.2em',
      textTransform: 'uppercase',
      color: 'rgba(227,194,122,.7)',
      marginTop: 13,
      animation: 'labFade 987ms ease 1600ms both'
    }
  }, "Per la maggior gloria di Dio")));
}
Object.assign(__ds_scope, { AmdgEgg });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/AmdgEgg.jsx", error: String((e && e.message) || e) }); }

// components/brand/YearMascot.jsx
try { (() => {
const NEEDLE_UP = 'M24 12 L27.5 24 L20.5 24 Z';
const NEEDLE_DN = 'M24 36 L27.5 24 L20.5 24 Z';
const M = {
  1: {
    name: 'Semino',
    eyes: [[19.5, 30], [28.5, 30]],
    smile: 'M20.5 35.5 Q24 38.5 27.5 35.5',
    body: '<path d="M24 19V12" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><ellipse cx="17" cy="11" rx="7" ry="4" fill="currentColor" transform="rotate(-25 17 11)"/><ellipse cx="31" cy="10" rx="7" ry="4" fill="currentColor" transform="rotate(25 31 10)"/><circle cx="24" cy="31" r="13" fill="currentColor"/>',
    lines: ['Ogni grande albero è stato un seme.', 'Da dove vengo? Bella domanda!', 'In principio… c’era una domanda.']
  },
  2: {
    name: 'Ichthy',
    eyes: [[13, 22]],
    smile: 'M7.5 27 Q9.5 28.8 11.5 27',
    body: '<path d="M34 24 L46 14 L46 34 Z" fill="currentColor"/><ellipse cx="21" cy="24" rx="16" ry="11" fill="currentColor"/>',
    lines: ['ΙΧΘΥΣ: Gesù Cristo, Figlio di Dio, Salvatore.', 'I primi cristiani mi disegnavano in segreto.', 'Venite dietro a me! (Mc 1,17)']
  },
  3: {
    name: 'Navicella',
    eyes: [[18.5, 32], [29.5, 32]],
    smile: 'M21.5 36.5 Q24 38.3 26.5 36.5',
    body: '<path d="M24 6V28" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M26.5 8 L40 25 H26.5 Z" fill="currentColor" fill-opacity=".7"/><path d="M4 28 H44 L37 41 H11 Z" fill="currentColor"/>',
    lines: ['Duc in altum! Prendi il largo. (Lc 5,4)', 'Duemila anni di mare… e ancora a galla.', 'Tempesta? Non temete!']
  },
  4: {
    name: 'Bussolina',
    eyes: [],
    smile: null,
    needle: true,
    body: '<circle cx="24" cy="24" r="18" fill="currentColor"/><circle cx="24" cy="24" r="13" fill="none" stroke="#fff" stroke-opacity=".45" stroke-width="1.5"/><path d="M24 7.5v3" stroke="#fff" stroke-width="2" stroke-linecap="round"/>',
    lines: ['La coscienza è la mia bussola.', 'E la tua, dove punta?', 'Libertà non è andare ovunque: è sapere dove.']
  },
  5: {
    name: 'Terra',
    eyes: [[19, 27], [29, 27]],
    smile: 'M20.5 32.5 Q24 35.5 27.5 32.5',
    body: '<circle cx="24" cy="27" r="16" fill="currentColor"/><path d="M11 22 Q24 30 37 22" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="2"/><path d="M24 11.5 C24 5 30 2 36.5 3 C36.5 9.5 31 12.5 24 11.5 Z" fill="#34D399"/>',
    lines: ['Laudato si’! Custodisci la casa comune.', 'Tutto è connesso.', 'Il futuro comincia adesso.']
  }
};

/** Year mascot: eyes (or needle) follow the cursor, blinks, speaks on click, 7th click → AMDG. */
function YearMascot({
  year = 1,
  size = 48,
  speak = true
}) {
  const ref = React.useRef(null);
  const clicks = React.useRef(0);
  const [look, setLook] = React.useState({
    dx: 0,
    dy: 0,
    ang: 0
  });
  const [blink, setBlink] = React.useState(false);
  const [hov, setHov] = React.useState(false);
  const [msg, setMsg] = React.useState(null);
  const m = M[year] || M[1];
  React.useEffect(() => {
    const mv = e => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2),
        y = e.clientY - (r.top + r.height / 2);
      const d = Math.hypot(x, y) || 1,
        k = Math.min(1, d / 144);
      setLook({
        dx: x / d * 1.4 * k,
        dy: y / d * 1.4 * k,
        ang: Math.atan2(y, x) * 180 / Math.PI + 90
      });
    };
    window.addEventListener('mousemove', mv);
    let t, t2;
    const loop = () => {
      t = setTimeout(() => {
        setBlink(true);
        t2 = setTimeout(() => {
          setBlink(false);
          loop();
        }, 144);
      }, 2584 + Math.random() * 2584);
    };
    loop();
    return () => {
      window.removeEventListener('mousemove', mv);
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, []);
  React.useEffect(() => {
    if (!msg) return;
    const id = setTimeout(() => setMsg(null), 2618);
    return () => clearTimeout(id);
  }, [msg]);
  const click = e => {
    e.preventDefault();
    e.stopPropagation();
    clicks.current += 1;
    if (clicks.current >= 7) {
      clicks.current = 0;
      setMsg(null);
      window.dispatchEvent(new Event('lab:amdg'));
      return;
    }
    if (speak) setMsg(clicks.current === 1 ? `Ciao, sono ${m.name}!` : m.lines[(clicks.current - 2) % m.lines.length]);
  };
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    role: "img",
    "aria-label": m.name,
    onClick: click,
    onMouseEnter: () => setHov(true),
    onMouseLeave: () => setHov(false),
    style: {
      position: 'relative',
      display: 'inline-block',
      width: size,
      height: size,
      lineHeight: 0,
      color: `var(--lab-anno-${year})`,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 48 48",
    width: size,
    height: size,
    "aria-hidden": "true",
    style: {
      overflow: 'visible',
      transform: `rotate(${hov ? -8 : 0}deg) scale(${hov ? 1.13 : 1})`,
      transition: 'transform 377ms cubic-bezier(.16,1,.3,1)',
      filter: hov ? 'drop-shadow(0 5px 8px rgba(0,0,0,.35))' : 'none'
    }
  }, /*#__PURE__*/React.createElement("g", {
    dangerouslySetInnerHTML: {
      __html: m.body
    }
  }), m.needle && /*#__PURE__*/React.createElement("g", {
    transform: `rotate(${look.ang.toFixed(1)} 24 24)`
  }, /*#__PURE__*/React.createElement("path", {
    d: NEEDLE_UP,
    fill: "#fff"
  }), /*#__PURE__*/React.createElement("path", {
    d: NEEDLE_DN,
    fill: "#14131F",
    fillOpacity: ".55"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "24",
    cy: "24",
    r: "2.4",
    fill: "#fff"
  })), m.eyes.map(([x, y], i) => /*#__PURE__*/React.createElement("g", {
    key: i,
    transform: `translate(${x} ${y}) scale(1 ${blink ? 0.12 : 1})`
  }, /*#__PURE__*/React.createElement("circle", {
    r: "3.4",
    fill: "#fff"
  }), /*#__PURE__*/React.createElement("circle", {
    r: "1.7",
    cx: look.dx,
    cy: look.dy,
    fill: "#14131F"
  }))), m.smile && /*#__PURE__*/React.createElement("path", {
    d: m.smile,
    fill: "none",
    stroke: "#14131F",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeOpacity: ".7"
  })), msg && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 0,
      bottom: 'calc(100% + 8px)',
      width: 'max-content',
      maxWidth: 189,
      zIndex: 20,
      pointerEvents: 'none',
      background: 'var(--lab-surface)',
      color: 'var(--lab-ink)',
      border: '1px solid var(--lab-oro)',
      borderRadius: 13,
      padding: '8px 13px',
      fontFamily: 'var(--lab-font-body)',
      fontSize: 13,
      fontWeight: 500,
      lineHeight: 1.4,
      textAlign: 'left',
      boxShadow: 'var(--lab-shadow)',
      animation: 'labRise 377ms cubic-bezier(.16,1,.3,1) both'
    }
  }, msg));
}
Object.assign(__ds_scope, { YearMascot });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/YearMascot.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
/**
 * Small colour-coded label for content types, categories, and status.
 */
function Badge({
  children,
  variant = 'viola'
}) {
  const palette = {
    viola: {
      bg: 'rgba(139,92,246,.22)',
      color: 'var(--lab-viola-2, #A78BFA)'
    },
    ciano: {
      bg: 'rgba(34,211,238,.22)',
      color: 'var(--lab-ciano, #22D3EE)'
    },
    ambra: {
      bg: 'rgba(251,191,36,.24)',
      color: 'var(--lab-ambra, #FBBF24)'
    },
    rosa: {
      bg: 'rgba(244,114,182,.22)',
      color: 'var(--lab-rosa, #F472B6)'
    },
    verde: {
      bg: 'rgba(52,211,153,.22)',
      color: 'var(--lab-verde, #34D399)'
    },
    rosso: {
      bg: 'rgba(251,113,133,.22)',
      color: 'var(--lab-rosso, #FB7185)'
    }
  };
  const p = palette[variant] ?? palette.viola;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      fontSize: 11.5,
      fontWeight: 800,
      letterSpacing: '.04em',
      textTransform: 'uppercase',
      padding: '4px 11px',
      borderRadius: 8,
      background: p.bg,
      color: p.color,
      fontFamily: 'inherit'
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Pill button with magnetic cursor pull, light sweep and press compression. */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  disabled = false,
  type = 'button'
}) {
  const ref = React.useRef(null);
  const [hov, setHov] = React.useState(false);
  const [down, setDown] = React.useState(false);
  const [off, setOff] = React.useState({
    x: 0,
    y: 0
  });
  const sm = size === 'sm';
  const move = e => {
    if (disabled || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setOff({
      x: (e.clientX - r.left - r.width / 2) * 0.236,
      y: (e.clientY - r.top - r.height / 2) * 0.382
    });
  };
  const leave = () => {
    setHov(false);
    setDown(false);
    setOff({
      x: 0,
      y: 0
    });
  };
  const vars = {
    primary: {
      background: 'var(--lab-grad)',
      color: '#fff',
      boxShadow: hov ? '0 13px 34px -13px rgba(139,92,246,.75)' : '0 8px 21px -13px rgba(139,92,246,.6)'
    },
    ghost: {
      background: 'transparent',
      color: hov ? 'var(--lab-ink)' : 'var(--lab-ink-soft)',
      borderColor: hov ? 'var(--lab-viola)' : 'var(--lab-line)'
    },
    gold: {
      background: 'var(--lab-ambra)',
      color: '#3a2a06',
      boxShadow: hov ? '0 13px 34px -13px rgba(251,191,36,.6)' : 'none'
    },
    solemn: {
      background: 'transparent',
      color: 'var(--lab-oro)',
      borderColor: hov ? 'var(--lab-oro)' : 'color-mix(in srgb, var(--lab-oro) 45%, transparent)',
      fontFamily: 'var(--lab-font-inscription)',
      textTransform: 'uppercase',
      letterSpacing: '.18em',
      fontSize: sm ? 12 : 13,
      fontWeight: 700
    }
  };
  const v = vars[variant] ?? vars.primary;
  const filled = variant === 'primary' || variant === 'gold';
  const style = {
    position: 'relative',
    overflow: 'hidden',
    isolation: 'isolate',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    fontFamily: 'var(--lab-font-body)',
    fontWeight: 700,
    lineHeight: 1,
    letterSpacing: '.01em',
    fontSize: sm ? 13.5 : 15,
    padding: sm ? '8px 13px' : '13px 21px',
    borderRadius: 'var(--lab-radius-pill)',
    border: '1px solid transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    textDecoration: 'none',
    opacity: disabled ? 0.5 : 1,
    transform: `translate(${off.x}px, ${off.y}px) scale(${down ? 0.96 : 1})`,
    transition: `transform ${hov ? 233 : 610}ms var(--lab-ease-out), box-shadow 377ms ease, border-color 377ms ease, color 233ms ease`,
    ...v
  };
  const sweep = filled ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: '38.2%',
      left: hov ? '130%' : '-60%',
      background: 'linear-gradient(100deg, transparent, rgba(255,255,255,.38), transparent)',
      transform: 'skewX(-20deg)',
      transition: hov ? 'left 987ms var(--lab-ease-out)' : 'none',
      zIndex: 0,
      pointerEvents: 'none'
    }
  }) : /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      background: variant === 'solemn' ? 'var(--lab-oro-soft)' : 'rgba(139,92,246,.12)',
      transform: `scaleY(${hov ? 1 : 0})`,
      transformOrigin: 'bottom',
      transition: 'transform 377ms var(--lab-ease-out)',
      zIndex: 0,
      pointerEvents: 'none'
    }
  });
  const evts = {
    ref,
    style,
    onMouseEnter: () => !disabled && setHov(true),
    onMouseMove: move,
    onMouseLeave: leave,
    onMouseDown: () => !disabled && setDown(true),
    onMouseUp: () => setDown(false)
  };
  const inner = /*#__PURE__*/React.createElement(React.Fragment, null, sweep, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      zIndex: 1,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8
    }
  }, children));
  if (href) return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    onClick: onClick
  }, evts), inner);
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    onClick: onClick,
    disabled: disabled
  }, evts), inner);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
/** Content card: subtle 3D tilt toward the cursor plus a light that follows it. */
function Card({
  children,
  style: extra,
  onClick,
  tilt = true,
  glow = 'rgba(139,92,246,.16)'
}) {
  const ref = React.useRef(null);
  const [hov, setHov] = React.useState(false);
  const [down, setDown] = React.useState(false);
  const [p, setP] = React.useState({
    x: 50,
    y: 50
  });
  const move = e => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setP({
      x: (e.clientX - r.left) / r.width * 100,
      y: (e.clientY - r.top) / r.height * 100
    });
  };
  const rx = tilt && hov ? (50 - p.y) / 50 * 2.5 : 0;
  const ry = tilt && hov ? (p.x - 50) / 50 * 2.5 : 0;
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    onClick: onClick,
    onMouseEnter: () => setHov(true),
    onMouseMove: move,
    onMouseLeave: () => {
      setHov(false);
      setDown(false);
    },
    onMouseDown: () => onClick && setDown(true),
    onMouseUp: () => setDown(false),
    style: {
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--lab-surface)',
      border: '1px solid',
      borderColor: hov ? 'color-mix(in srgb, var(--lab-viola) 38%, var(--lab-line))' : 'var(--lab-line)',
      borderRadius: 'var(--lab-radius)',
      padding: 21,
      boxShadow: hov ? 'var(--lab-shadow-lg)' : 'var(--lab-shadow)',
      transform: `perspective(987px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(${hov ? -5 : 0}px) scale(${down ? 0.985 : 1})`,
      transition: hov ? 'transform 144ms linear, box-shadow 377ms ease, border-color 377ms ease' : 'transform 610ms var(--lab-ease-out), box-shadow 377ms ease, border-color 377ms ease',
      cursor: onClick ? 'pointer' : 'default',
      ...extra
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      opacity: hov ? 1 : 0,
      transition: 'opacity 377ms ease',
      background: `radial-gradient(233px circle at ${p.x}% ${p.y}%, ${glow}, transparent 61.8%)`
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1,
      height: '100%'
    }
  }, children));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Chip.jsx
try { (() => {
/** Filter chip / toggle pill with press compression. */
function Chip({
  children,
  active = false,
  onClick
}) {
  const [hov, setHov] = React.useState(false);
  const [down, setDown] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    onMouseEnter: () => setHov(true),
    onMouseLeave: () => {
      setHov(false);
      setDown(false);
    },
    onMouseDown: () => setDown(true),
    onMouseUp: () => setDown(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      fontFamily: 'var(--lab-font-body)',
      fontSize: 13.5,
      fontWeight: 600,
      padding: '8px 13px',
      borderRadius: 'var(--lab-radius-pill)',
      cursor: 'pointer',
      border: '1px solid',
      transform: `scale(${down ? 0.94 : 1}) translateY(${hov && !active ? -2 : 0}px)`,
      transition: 'transform 233ms var(--lab-ease-out), border-color 233ms ease, background 233ms ease, color 233ms ease',
      ...(active ? {
        background: 'var(--lab-ink)',
        borderColor: 'var(--lab-ink)',
        color: 'var(--lab-bg)'
      } : {
        background: 'var(--lab-surface)',
        borderColor: hov ? 'var(--lab-oro)' : 'var(--lab-line)',
        color: hov ? 'var(--lab-ink)' : 'var(--lab-ink-soft)'
      })
    }
  }, children);
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Chip.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Labelled form input — supports text, email, password, number, and textarea.
 */
function Input({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  hint,
  multiline = false,
  rows = 4,
  id,
  required = false
}) {
  const [focused, setFocused] = React.useState(false);
  const inputId = id ?? `lab-input-${Math.random().toString(36).slice(2)}`;
  const fieldStyle = {
    width: '100%',
    fontFamily: 'inherit',
    fontSize: 15,
    color: 'var(--lab-ink, #ECEAF5)',
    background: 'var(--lab-surface-2, #272438)',
    border: '1.5px solid',
    borderColor: focused ? 'var(--lab-viola, #8B5CF6)' : 'var(--lab-line, #322E45)',
    borderRadius: 'var(--lab-radius-sm, 12px)',
    padding: '11px 14px',
    outline: 'none',
    boxShadow: focused ? '0 0 0 3px rgba(139,92,246,.25)' : 'none',
    transition: 'border-color .15s ease, box-shadow .15s ease',
    resize: multiline ? 'vertical' : 'none',
    display: 'block',
    boxSizing: 'border-box'
  };
  const handlers = {
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false)
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 0
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      display: 'block',
      fontWeight: 600,
      fontSize: 14,
      color: 'var(--lab-ink-soft, #C7C3DA)',
      marginBottom: 5
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--lab-rosso)',
      marginLeft: 4
    }
  }, "*")), multiline ? /*#__PURE__*/React.createElement("textarea", _extends({
    id: inputId,
    rows: rows,
    placeholder: placeholder,
    value: value,
    onChange: onChange,
    style: fieldStyle
  }, handlers)) : /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    type: type,
    placeholder: placeholder,
    value: value,
    onChange: onChange,
    required: required,
    style: fieldStyle
  }, handlers)), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: 'var(--lab-muted)',
      marginTop: 4
    }
  }, hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/Nota.jsx
try { (() => {
/**
 * Amber left-bordered informational callout box.
 */
function Nota({
  children,
  icon
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderLeft: '4px solid var(--lab-ambra, #FBBF24)',
      background: 'rgba(251,191,36,.12)',
      borderRadius: '0 var(--lab-radius-sm, 12px) var(--lab-radius-sm, 12px) 0',
      padding: '14px 18px',
      color: 'var(--lab-ink-soft, #C7C3DA)',
      fontSize: 15,
      lineHeight: 1.55,
      display: 'flex',
      gap: 10,
      alignItems: 'flex-start'
    }
  }, icon !== undefined && /*#__PURE__*/React.createElement("span", {
    style: {
      flexShrink: 0,
      fontSize: 16
    }
  }, icon), /*#__PURE__*/React.createElement("div", null, children));
}
Object.assign(__ds_scope, { Nota });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Nota.jsx", error: String((e && e.message) || e) }); }

// components/core/YearCard.jsx
try { (() => {
const COLORS = {
  1: 'var(--lab-anno-1)',
  2: 'var(--lab-anno-2)',
  3: 'var(--lab-anno-3)',
  4: 'var(--lab-anno-4)',
  5: 'var(--lab-anno-5)'
};
const ROMAN = {
  1: 'I',
  2: 'II',
  3: 'III',
  4: 'IV',
  5: 'V'
};

/** School-year card: colour bar, Roman numeral with parallax, cursor light, year mascot. */
function YearCard({
  year = 1,
  name,
  description,
  count,
  href = '#',
  onClick,
  mascot = true
}) {
  const ref = React.useRef(null);
  const [hov, setHov] = React.useState(false);
  const [p, setP] = React.useState({
    x: 50,
    y: 50
  });
  const color = COLORS[year] ?? 'var(--lab-viola)';
  const move = e => {
    const r = ref.current.getBoundingClientRect();
    setP({
      x: (e.clientX - r.left) / r.width * 100,
      y: (e.clientY - r.top) / r.height * 100
    });
  };
  const rx = hov ? (50 - p.y) / 50 * 3 : 0;
  const ry = hov ? (p.x - 50) / 50 * 3 : 0;
  const settle = 'transform 610ms cubic-bezier(.16,1,.3,1)';
  return /*#__PURE__*/React.createElement("a", {
    ref: ref,
    href: href,
    onClick: onClick ? e => {
      e.preventDefault();
      onClick(e);
    } : undefined,
    onMouseEnter: () => setHov(true),
    onMouseMove: move,
    onMouseLeave: () => setHov(false),
    style: {
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 233,
      background: 'var(--lab-surface)',
      border: '1px solid var(--lab-line)',
      borderRadius: 'var(--lab-radius)',
      padding: '34px 21px 21px 34px',
      textDecoration: 'none',
      color: 'var(--lab-ink)',
      boxShadow: hov ? 'var(--lab-shadow-lg)' : 'var(--lab-shadow)',
      transform: `perspective(987px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(${hov ? -8 : 0}px)`,
      transition: hov ? 'transform 144ms linear, box-shadow 377ms ease' : `${settle}, box-shadow 377ms ease`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: hov ? 8 : 5,
      background: color,
      transition: 'width 377ms cubic-bezier(.16,1,.3,1)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      opacity: hov ? 1 : 0,
      transition: 'opacity 377ms ease',
      background: `radial-gradient(233px circle at ${p.x}% ${p.y}%, color-mix(in srgb, ${color} 22%, transparent), transparent 61.8%)`
    }
  }), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      right: -34,
      top: -34,
      width: 144,
      height: 144,
      borderRadius: '50%',
      background: color,
      opacity: hov ? 0.14 : 0.06,
      transform: `scale(${hov ? 1.236 : 1})`,
      transition: '610ms cubic-bezier(.16,1,.3,1)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      fontFamily: 'var(--lab-font-inscription)',
      fontWeight: 600,
      fontSize: 46,
      lineHeight: 1,
      color,
      transform: `translate(${hov ? (p.x - 50) * 0.13 : 0}px, ${hov ? (p.y - 50) * 0.08 : 0}px)`,
      transition: hov ? 'transform 144ms linear' : settle
    }
  }, ROMAN[year] ?? year), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      fontFamily: 'var(--lab-font-display)',
      fontWeight: 600,
      fontSize: 25,
      lineHeight: 1.15,
      marginTop: 13
    }
  }, name), description && /*#__PURE__*/React.createElement("p", {
    style: {
      position: 'relative',
      color: 'var(--lab-muted)',
      fontSize: 14,
      lineHeight: 1.5,
      margin: '8px 0 0',
      flex: 1
    }
  }, description), count != null && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontSize: 11.5,
      fontWeight: 800,
      letterSpacing: '.13em',
      textTransform: 'uppercase',
      color,
      marginTop: 21
    }
  }, count, " contenuti", /*#__PURE__*/React.createElement("span", {
    style: {
      transform: `translateX(${hov ? 5 : 0}px)`,
      opacity: hov ? 1 : 0,
      transition: '377ms cubic-bezier(.16,1,.3,1)'
    }
  }, "\u2192")), mascot && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 13,
      bottom: 13,
      zIndex: 2,
      transform: `translateY(${hov ? -5 : 0}px)`,
      transition: settle
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.YearMascot, {
    year: year,
    size: 34
  })));
}
Object.assign(__ds_scope, { YearCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/YearCard.jsx", error: String((e && e.message) || e) }); }

// components/exam/ExamBadge.jsx
try { (() => {
const CONFIG = {
  bozza: {
    label: 'Bozza',
    bg: '#eee',
    color: '#555'
  },
  pubblicata: {
    label: 'Pubblicata',
    bg: '#e3f2e9',
    color: '#1c7c4a'
  },
  chiusa: {
    label: 'Chiusa',
    bg: '#fbe6e4',
    color: '#b42318'
  },
  corretta: {
    label: 'Corretta',
    bg: '#e3f2e9',
    color: '#1c7c4a'
  },
  consegnata: {
    label: 'Da correggere',
    bg: '#fff4d6',
    color: '#a87c0c'
  },
  in_corso: {
    label: 'In corso',
    bg: 'var(--exam-blu-light, #e8edf9)',
    color: 'var(--exam-blu, #1E3A8A)'
  }
};

/**
 * Exam-platform status pill. Maps lifecycle states to the institutional
 * blue/gold/green/red palette used in the Area Verifiche.
 */
function ExamBadge({
  status
}) {
  const c = CONFIG[status] ?? CONFIG.bozza;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      fontSize: '.72rem',
      fontWeight: 800,
      letterSpacing: '.03em',
      textTransform: 'uppercase',
      padding: '3px 9px',
      borderRadius: 999,
      background: c.bg,
      color: c.color,
      fontFamily: 'inherit'
    }
  }, c.label);
}
Object.assign(__ds_scope, { ExamBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/exam/ExamBadge.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Amdg = __ds_scope.Amdg;

__ds_ns.AmdgEgg = __ds_scope.AmdgEgg;

__ds_ns.YearMascot = __ds_scope.YearMascot;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Nota = __ds_scope.Nota;

__ds_ns.YearCard = __ds_scope.YearCard;

__ds_ns.ExamBadge = __ds_scope.ExamBadge;

})();
