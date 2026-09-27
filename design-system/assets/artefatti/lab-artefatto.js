/* Lab IRC — Kit artefatti. Mettere in fondo al <body class="la" data-anno="1-5">.
   Aggiunge: tema salvato, luce che segue il cursore, schede reattive, mascotte dell'anno, easter egg AMDG.
   API: LabArtefatto.say(testo) · .cheer() · .oops() · .amdg() */
(function () {
  var d = document, w = window;
  try { var t = localStorage.getItem('tema_lab'); if (t) d.documentElement.dataset.tema = t; } catch (e) {}
  var reduce = w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- mascotte (copia di components/brand/mascotte-arte.js: tenere uguali) --- */
  var INK = '#1B1430';
  var BORDO = 'stroke="rgba(27,20,48,.38)" stroke-width="1.2" stroke-linejoin="round"';
  var ORO = '#E3C27A', VERDE = '#5BD68A', VERDE_SCURO = '#34B36A';

  var ARTE = {
    1: { name: 'Semino',
      lines: ['Ogni grande albero è stato un seme.', 'Da dove vengo? Bella domanda!', 'In principio… c’era una domanda.'],
      dietro: function () {
        return '<path d="M32 23 C32 19 31.2 16 32 12" stroke="' + VERDE_SCURO + '" stroke-width="2.6" fill="none" stroke-linecap="round"/>' +
          '<path d="M31.6 13.4 C27 6.5 19 6.2 14.5 9.6 C18.5 16.4 26.6 17 31.6 13.4Z" fill="' + VERDE + '" ' + BORDO + '/>' +
          '<path d="M32.4 12.6 C36.5 4.6 44.6 3.2 49.6 6 C46.8 12.6 38.8 15 32.4 12.6Z" fill="' + VERDE + '" ' + BORDO + '/>' +
          '<path d="M30 12.6 Q23 10.4 17.6 10 M34 11.6 Q40.6 7.6 46.6 6.6" stroke="#fff" stroke-opacity=".55" stroke-width=".9" fill="none" stroke-linecap="round"/>';
      },
      corpo: 'path d="M32 21 C44 21 50.5 30.5 50.5 40 C50.5 50 42.5 56.5 32 56.5 C21.5 56.5 13.5 50 13.5 40 C13.5 30.5 20 21 32 21Z"',
      lucido: [22.5, 29, -35],
      occhi: [[25, 39, 1.05], [39, 39, 1.05]], guance: [[19.2, 46], [44.8, 46]], bocca: [32, 46.6], stella: [50, 22] },

    2: { name: 'Ichthy',
      lines: ['ΙΧΘΥΣ: Gesù Cristo, Figlio di Dio, Salvatore.', 'I primi cristiani mi disegnavano in segreto.', 'Venite dietro a me! (Mc 1,17)'],
      dietro: function () {
        return '<path d="M44 35 C49.5 27 55.5 22.5 60.5 22 C58.2 28.5 58.2 41.5 60.5 48 C55.5 47.5 49.5 43 44 35Z" fill="currentColor" ' + BORDO + '/>' +
          '<path d="M50 30 Q54 34 50 40" stroke="#fff" stroke-opacity=".4" stroke-width="1" fill="none" stroke-linecap="round"/>' +
          '<path d="M23 22.5 C27 14 38.5 13.6 43 22.5Z" fill="currentColor" ' + BORDO + '/>' +
          '<circle cx="5" cy="21" r="2.1" fill="#fff" fill-opacity=".25" stroke="#fff" stroke-opacity=".75" stroke-width=".8"/>' +
          '<circle cx="9" cy="13.5" r="1.5" fill="#fff" fill-opacity=".25" stroke="#fff" stroke-opacity=".75" stroke-width=".7"/>' +
          '<circle cx="4.5" cy="8" r="1" fill="#fff" fill-opacity=".25" stroke="#fff" stroke-opacity=".75" stroke-width=".6"/>';
      },
      corpo: 'path d="M5.5 35.5 C7.5 24.5 19.5 20.5 29.5 20.5 C41.5 20.5 48.5 28 48.5 35.5 C48.5 43 41.5 50.5 29.5 50.5 C19.5 50.5 7.5 46.5 5.5 35.5Z"',
      sopra: function () {
        return '<path d="M31 28 q3 3 0 6 M36.5 26.5 q3 3 0 6 M36.5 34 q3 3 0 6 M42 30 q2.6 3 0 6" stroke="#fff" stroke-opacity=".38" stroke-width="1.1" fill="none" stroke-linecap="round"/>' +
          '<path d="M27 39 C30.5 44 35.5 45 38 42.5 C35.5 39 31 37.6 27 39Z" fill="#fff" fill-opacity=".32"/>';
      },
      lucido: [17, 26, -20],
      occhi: [[18.5, 33, 1.25]], guance: [[20, 42.5]], bocca: [10.5, 40.5], stella: [30, 12] },

    3: { name: 'Navicella',
      lines: ['Duc in altum! Prendi il largo. (Lc 5,4)', 'Duemila anni di mare… e ancora a galla.', 'Tempesta? Non temete!'],
      dietro: function () {
        return '<path d="M32 7 V37" stroke="' + ORO + '" stroke-width="2.2" stroke-linecap="round"/>' +
          '<path d="M32.5 7 L41 9.6 L32.5 12.2Z" fill="' + ORO + '"/>' +
          '<path d="M34.5 11.5 C44 18 48.5 27.5 49.5 34.5 H34.5Z" fill="#FFF8EE" ' + BORDO + '/>' +
          '<path d="M29.5 15.5 C24 22 21 28.5 19.8 34.5 H29.5Z" fill="#FFF8EE" fill-opacity=".92" ' + BORDO + '/>' +
          '<path d="M41.5 20.5 V30 M38.2 23.6 H44.8" stroke="' + ORO + '" stroke-width="1.7" stroke-linecap="round"/>' +
          '<path d="M3 55 Q10 51.5 17 55 T31 55 T45 55 T59 55 Q61 56 62 55.6 Q50 60.5 32 60.5 Q14 60.5 3 55Z" fill="#7DD3FC" fill-opacity=".6"/>';
      },
      corpo: 'path d="M5.5 36 H58.5 C56.5 46.5 50 54.5 40 55.5 H24 C14 54.5 7.5 46.5 5.5 36Z"',
      sopra: function () {
        return '<path d="M5.5 36 H58.5" stroke="' + ORO + '" stroke-width="2.2" stroke-linecap="round"/>';
      },
      lucido: [14, 40, -10],
      occhi: [[25, 43.5, 0.95], [39, 43.5, 0.95]], guance: [[17.8, 49], [46.2, 49]], bocca: [32, 49.6], stella: [13, 16] },

    4: { name: 'Bussolina', ago: [32, 28],
      lines: ['La coscienza è la mia bussola.', 'E la tua, dove punta?', 'Libertà non è andare ovunque: è sapere dove.'],
      dietro: function () {
        return '<circle cx="32" cy="9.5" r="3.6" fill="none" stroke="' + ORO + '" stroke-width="2"/>' +
          '<rect x="28.6" y="12" width="6.8" height="4.4" rx="1.6" fill="' + ORO + '"/>';
      },
      corpo: 'circle cx="32" cy="37" r="21"',
      sopra: function () {
        return '<circle cx="32" cy="37" r="20" fill="none" stroke="' + ORO + '" stroke-width="2"/>' +
          '<circle cx="32" cy="37" r="16.5" fill="#FFF7EE" stroke="rgba(27,20,48,.25)" stroke-width="1"/>' +
          '<path d="M32 20.8 L33.4 23.4 H30.6Z" fill="' + ORO + '"/>' +
          '<path d="M32 51.2 V53 M15.6 37 H17.4 M46.6 37 H48.4" stroke="rgba(27,20,48,.35)" stroke-width="1.2" stroke-linecap="round"/>';
      },
      lucido: [22, 26, -40],
      occhi: [[25.5, 40.8, 0.85], [38.5, 40.8, 0.85]], guance: [[21, 46.4], [43, 46.4]], bocca: [32, 47.4], stella: [52, 15] },

    5: { name: 'Terra',
      lines: ['Laudato si’! Custodisci la casa comune.', 'Tutto è connesso.', 'Il futuro comincia adesso.'],
      dietro: function () {
        return '<path d="M32 19 C32 15.5 33 13.4 35 11.6" stroke="' + VERDE_SCURO + '" stroke-width="2.4" fill="none" stroke-linecap="round"/>' +
          '<path d="M34.6 12 C36.4 5.4 43.4 3.2 48.6 4.2 C47.4 10.6 41.2 13.6 34.6 12Z" fill="' + VERDE + '" ' + BORDO + '/>' +
          '<path d="M36.5 10.8 Q42 7.6 46.4 5.8" stroke="#fff" stroke-opacity=".55" stroke-width=".9" fill="none" stroke-linecap="round"/>';
      },
      corpo: 'circle cx="32" cy="37.5" r="19.5"',
      sopra: function () {
        return '<path d="M13.6 31 C16.5 26.5 22 26.8 22 30.6 C22 34.4 17.4 35.4 14 34.6Z M41.2 24.6 C45.6 23.6 50 27 49.2 30.8 C45.8 32.4 41.4 30 41.2 24.6Z M24 53.6 C27 51.4 32 51.2 35 53.4 C33 56 27 56.2 24 53.6Z" fill="' + VERDE + '" fill-opacity=".9"/>';
      },
      lucido: [22, 27, -35],
      occhi: [[25, 38.5, 1], [39, 38.5, 1]], guance: [[19.2, 45.4], [44.8, 45.4]], bocca: [32, 46], stella: [11, 17] },
  };

  function f(n) { return Math.round(n * 100) / 100; }

  function occhio(x, y, s, lato, id, st) {
    if (st.blink || st.felice) {
      return '<path d="M' + f(x - 3.7 * s) + ' ' + f(y + 0.8 * s) + ' Q' + f(x) + ' ' + f(y - 3.4 * s) + ' ' + f(x + 3.7 * s) + ' ' + f(y + 0.8 * s) + '" stroke="' + INK + '" stroke-width="' + f(1.6 * s) + '" fill="none" stroke-linecap="round"/>';
    }
    var dx = f((st.dx || 0) * 1.1), dy = f((st.dy || 0) * 1.1);
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">' +
      '<ellipse rx="3.9" ry="4.8" fill="#fff"/>' +
      '<g clip-path="url(#' + id + 'c)"><g transform="translate(' + dx + ' ' + dy + ')">' +
        '<ellipse cy=".3" rx="3.2" ry="4.1" fill="url(#' + id + 'i)"/>' +
        '<ellipse cy=".6" rx="1.6" ry="2.2" fill="#120E20"/>' +
        '<ellipse cy="2.9" rx="2.1" ry=".9" fill="#fff" fill-opacity=".38"/>' +
        '<circle cx="-1.25" cy="-1.55" r="1.4" fill="#fff"/>' +
        '<circle cx="1.35" cy="1.3" r=".62" fill="#fff"/>' +
      '</g></g>' +
      '<path d="M-4.3 -2 Q-0.4 -6.9 4.3 -2.4" stroke="' + INK + '" stroke-width="1.35" fill="none" stroke-linecap="round" transform="scale(' + lato + ' 1)"/>' +
      '<path d="M3.7 -3.1 L5.7 -3.6" stroke="' + INK + '" stroke-width="1" stroke-linecap="round" transform="scale(' + lato + ' 1)"/>' +
      '</g>';
  }

  function guancia(p) {
    var x = p[0], y = p[1];
    return '<ellipse cx="' + x + '" cy="' + y + '" rx="3.3" ry="1.9" fill="#FF6F91" fill-opacity=".5"/>' +
      '<path d="M' + f(x - 2.1) + ' ' + f(y + 0.9) + ' l.9 -1.8 M' + f(x - 0.4) + ' ' + f(y + 0.9) + ' l.9 -1.8 M' + f(x + 1.3) + ' ' + f(y + 0.9) + ' l.9 -1.8" stroke="#fff" stroke-opacity=".75" stroke-width=".6" stroke-linecap="round"/>';
  }

  function bocca(p, parla) {
    var x = p[0], y = p[1];
    if (parla) {
      return '<path d="M' + f(x - 2.6) + ' ' + f(y - 0.5) + ' Q' + x + ' ' + f(y + 4.4) + ' ' + f(x + 2.6) + ' ' + f(y - 0.5) + 'Z" fill="#6B1F35" stroke="' + INK + '" stroke-width=".8" stroke-linejoin="round"/>' +
        '<ellipse cx="' + x + '" cy="' + f(y + 2) + '" rx="1.3" ry=".8" fill="#FF8FA3"/>';
    }
    return '<path d="M' + f(x - 2.4) + ' ' + y + ' Q' + f(x - 1.2) + ' ' + f(y + 1.7) + ' ' + x + ' ' + y + ' Q' + f(x + 1.2) + ' ' + f(y + 1.7) + ' ' + f(x + 2.4) + ' ' + y + '" stroke="' + INK + '" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
  }

  function stellina(p) {
    return '<path transform="translate(' + p[0] + ' ' + p[1] + ')" d="M0 -3.4 L.9 -.9 L3.4 0 L.9 .9 L0 3.4 L-.9 .9 L-3.4 0 L-.9 -.9Z" fill="#FFE8A3" stroke="' + ORO + '" stroke-width=".5"/>';
  }

  function disegna(anno, id, st) {
    var m = ARTE[anno] || ARTE[1];
    st = st || {};
    var l = m.lucido;
    var s = '<defs>' +
      '<linearGradient id="' + id + 'i" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1E1636"/><stop offset=".62" stop-color="currentColor"/><stop offset="1" stop-color="currentColor"/></linearGradient>' +
      '<linearGradient id="' + id + 'o" x1="0" y1="0" x2="0" y2="1"><stop offset=".45" stop-color="#140E28" stop-opacity="0"/><stop offset="1" stop-color="#140E28" stop-opacity=".3"/></linearGradient>' +
      '<radialGradient id="' + id + 'l" cx=".32" cy=".26" r=".75"><stop offset="0" stop-color="#fff" stop-opacity=".5"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/></radialGradient>' +
      '<clipPath id="' + id + 'c"><ellipse rx="3.9" ry="4.8"/></clipPath>' +
      '</defs>';
    s += m.dietro();
    s += '<' + m.corpo + ' fill="currentColor" ' + BORDO + '/>';
    s += '<' + m.corpo + ' fill="url(#' + id + 'o)"/>';
    s += '<' + m.corpo + ' fill="url(#' + id + 'l)"/>';
    s += '<ellipse cx="' + l[0] + '" cy="' + l[1] + '" rx="4.2" ry="2.3" fill="#fff" fill-opacity=".6" transform="rotate(' + l[2] + ' ' + l[0] + ' ' + l[1] + ')"/>';
    if (m.sopra) s += m.sopra();
    if (m.ago) {
      var a = m.ago;
      s += '<g transform="rotate(' + f(st.ang || 0) + ' ' + a[0] + ' ' + a[1] + ')">' +
        '<path d="M' + a[0] + ' ' + (a[1] - 7.5) + ' L' + (a[0] + 2.1) + ' ' + a[1] + ' L' + (a[0] - 2.1) + ' ' + a[1] + 'Z" fill="currentColor" stroke="rgba(27,20,48,.35)" stroke-width=".6"/>' +
        '<path d="M' + a[0] + ' ' + (a[1] + 6) + ' L' + (a[0] + 2.1) + ' ' + a[1] + ' L' + (a[0] - 2.1) + ' ' + a[1] + 'Z" fill="#3A3350"/>' +
        '<circle cx="' + a[0] + '" cy="' + a[1] + '" r="1.4" fill="' + ORO + '"/></g>';
    }
    s += m.guance.map(guancia).join('');
    s += m.occhi.map(function (o, i) { return occhio(o[0], o[1], o[2], m.occhi.length > 1 && i === 0 ? -1 : 1, id, st); }).join('');
    s += bocca(m.bocca, st.parla);
    if (st.felice) s += stellina(m.stella);
    return s;
  }
  var M = ARTE;
  var CHEER = ['Esatto!', 'Bravissimo!', 'Proprio così!', 'Ottimo!'];
  var OOPS = ['Quasi… riprova!', 'Mmm, pensaci ancora.', 'Non proprio. Coraggio!'];
  var pick = function (a) { return a[Math.floor(Math.random() * a.length)]; };

  var egg = null;
  function amdg() {
    if (egg) return;
    egg = d.createElement('div');
    egg.className = 'la-amdg'; egg.setAttribute('role', 'dialog'); egg.setAttribute('aria-label', 'Ad maiorem Dei gloria');
    egg.innerHTML = '<div><div class="la-amdg-star">✦</div><div class="la-amdg-letters">' +
      ['A', 'M', 'D', 'G'].map(function (l, i) { return (i ? '<i style="animation-delay:' + (233 + i * 89) + 'ms">·</i>' : '') + '<b style="animation-delay:' + (233 + i * 144) + 'ms">' + l + '</b>'; }).join('') +
      '</div><div class="la-amdg-line"></div><div class="la-amdg-lat">Ad maiorem Dei gloria</div></div>';
    d.body.appendChild(egg);
    var el = egg, timer;
    var close = function () { if (egg !== el) return; egg = null; clearTimeout(timer); d.removeEventListener('keydown', esc); el.classList.add('is-out'); setTimeout(function () { el.remove(); }, 610); };
    var esc = function (e) { if (e.key === 'Escape') close(); };
    el.addEventListener('click', close); d.addEventListener('keydown', esc); timer = setTimeout(close, 6180);
  }

  function mascot() {
    var y = +(d.body.getAttribute('data-anno') || 0), m = M[y];
    if (!m) return null;
    var el = d.createElement('button');
    el.type = 'button'; el.className = 'la-mascot'; el.setAttribute('aria-label', m.name);
    el.style.color = 'var(--lab-anno-' + y + ')';
    el.innerHTML = '<span class="la-bubble" hidden></span><svg viewBox="0 0 64 64" aria-hidden="true"></svg>';
    d.body.appendChild(el);
    var bub = el.querySelector('.la-bubble'), svg = el.querySelector('svg'), n = 0, bt, ft, raf = 0;
    var st = { dx: 0, dy: 0, ang: 0, blink: false, felice: false, parla: false };
    var id = 'lam' + Math.random().toString(36).slice(2, 8);
    var draw = function () { raf = 0; svg.innerHTML = disegna(y, id, st); };
    var redraw = function () { if (!raf) raf = requestAnimationFrame(draw); };
    draw();
    w.addEventListener('mousemove', function (e) {
      var r = el.getBoundingClientRect(), x = e.clientX - (r.left + r.width / 2), yy = e.clientY - (r.top + r.height / 2);
      var dd = Math.hypot(x, yy) || 1, k = Math.min(1, dd / 144);
      st.dx = x / dd * k; st.dy = yy / dd * k; st.ang = Math.atan2(yy, x) * 180 / Math.PI + 90;
      redraw();
    });
    (function blink() { setTimeout(function () { st.blink = true; redraw(); setTimeout(function () { st.blink = false; redraw(); blink(); }, 144); }, 2584 + Math.random() * 2584); })();
    function say(txt) {
      bub.textContent = txt; bub.hidden = false;
      bub.style.animation = 'none'; void bub.offsetWidth; bub.style.animation = '';
      st.parla = true; st.felice = true; redraw();
      clearTimeout(ft); ft = setTimeout(function () { st.felice = false; redraw(); }, 890);
      clearTimeout(bt); bt = setTimeout(function () { bub.hidden = true; st.parla = false; redraw(); }, 2618);
    }
    el.addEventListener('click', function () {
      n++;
      say(n === 1 ? 'Ciao, sono ' + m.name + '!' : m.lines[(n - 2) % m.lines.length]);
    });
    return { say: say };
  }

  function init() {
    var mas = mascot();

    if (!reduce) {
      var h = d.createElement('div'); h.className = 'la-halo'; h.setAttribute('aria-hidden', 'true'); d.body.appendChild(h);
      var hx = innerWidth / 2, hy = innerHeight / 3, tx = hx, ty = hy;
      w.addEventListener('mousemove', function (e) { tx = e.clientX; ty = e.clientY; h.style.opacity = 1; });
      (function loop() { hx += (tx - hx) * .1618; hy += (ty - hy) * .1618; h.style.transform = 'translate(' + (hx - 233) + 'px,' + (hy - 233) + 'px)'; requestAnimationFrame(loop); })();
    }

    var hot = null;
    d.addEventListener('mousemove', function (e) {
      var c = e.target.closest ? e.target.closest('.la-card') : null;
      if (hot && hot !== c) { hot.classList.remove('is-hot'); hot.style.transform = ''; }
      hot = c; if (!c) return;
      var r = c.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      c.classList.add('is-hot'); c.style.setProperty('--mx', (px * 100).toFixed(1) + '%'); c.style.setProperty('--my', (py * 100).toFixed(1) + '%');
      if (!c.hasAttribute('data-flat') && !reduce) c.style.transform = 'perspective(987px) rotateX(' + ((.5 - py) * 4).toFixed(2) + 'deg) rotateY(' + ((px - .5) * 4).toFixed(2) + 'deg) translateY(-3px)';
    });
    d.addEventListener('animationend', function (e) { if (e.animationName === 'labRise' && e.target.hasAttribute && e.target.hasAttribute('data-reveal')) e.target.removeAttribute('data-reveal'); });

    var buf = '';
    d.addEventListener('keydown', function (e) {
      var tag = (e.target.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable || !e.key || e.key.length !== 1) return;
      buf = (buf + e.key.toLowerCase()).slice(-4); if (buf === 'amdg') amdg();
    });
    w.addEventListener('lab:amdg', amdg);

    var say = function (t) { if (mas) mas.say(t); };
    w.LabArtefatto = { say: say, cheer: function () { say(pick(CHEER)); }, oops: function () { say(pick(OOPS)); }, amdg: amdg };
    console.log('%cA · M · D · G', 'font: 600 21px Cinzel, Georgia, serif; color: #E3C27A; letter-spacing: .3em');
  }

  w.LabArtefatto = { say: function () {}, cheer: function () {}, oops: function () {}, amdg: amdg };
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', init); else init();
})();
