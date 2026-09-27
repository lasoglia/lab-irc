/* Lab IRC — Kit artefatti. Mettere in fondo al <body class="la" data-anno="1-5">.
   Aggiunge: tema salvato, luce che segue il cursore, schede reattive, mascotte dell'anno, easter egg AMDG.
   API: LabArtefatto.say(testo) · .cheer() · .oops() · .amdg() */
(function () {
  var d = document, w = window;
  try { var t = localStorage.getItem('tema_lab'); if (t) d.documentElement.dataset.tema = t; } catch (e) {}
  var reduce = w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- mascotte (copia di components/brand/mascotte-arte.js: tenere uguali) --- */
  var INK = '#17122A';
  var TRATTO = 'stroke="' + INK + '" stroke-width="1.8" stroke-linejoin="round"';
  var OMBRA = '#140E28';
  var ORO = '#E3C27A', VERDE = '#4CC47E', CREMA = '#FFF8EC';

  /* ciuffo a punte (foglie/germoglio) con la sua ombra netta */
  function ciuffo(d, ombra) {
    return '<path d="' + d + '" fill="' + VERDE + '" ' + TRATTO + '/>' +
      (ombra ? '<path d="' + ombra + '" fill="' + OMBRA + '" fill-opacity=".25"/>' : '');
  }

  var ARTE = {
    1: { name: 'Semino',
      lines: ['Ogni grande albero è stato un seme.', 'Da dove vengo? Bella domanda!', 'In principio… c’era una domanda.'],
      /* germoglio a punte, come un ciuffo ribelle */
      dietro: function () {
        return ciuffo('M29 33 L21 13 L35 25 L37 5 L46 23 L55 7 L55.5 25 L68 14 L61 33Z', 'M46 23 L55 7 L55.5 25 L68 14 L61 33 L50 31Z');
      },
      corpo: 'path d="M44.5 26 C62 26 72 41 72 55 C72 70 60.5 81 44.5 81 C28.5 81 17 70 17 55 C17 41 27 26 44.5 26Z"',
      luce: [39.5, 49, 29],
      riflesso: 'M24 49 C25 40 31 33 38 30',
      occhi: [[31.5, 47], [57.5, 47]], bocca: [44.5, 60] },

    2: { name: 'Ichthy',
      lines: ['ΙΧΘΥΣ: Gesù Cristo, Figlio di Dio, Salvatore.', 'I primi cristiani mi disegnavano in segreto.', 'Venite dietro a me! (Mc 1,17)'],
      dietro: function () {
        return '<path d="M63 50 L84 33 L79 50 L84 67Z" fill="currentColor" ' + TRATTO + '/>' +
          '<path d="M71 50 L84 67 L79 50Z" fill="' + OMBRA + '" fill-opacity=".25"/>' +
          '<path d="M27 36 L34 21 L40 33 L48 22 L53 36Z" fill="currentColor" ' + TRATTO + '/>' +
          '<circle cx="7" cy="30" r="2.6" fill="none" stroke="' + INK + '" stroke-opacity=".5" stroke-width="1.1"/>' +
          '<circle cx="11" cy="20" r="1.6" fill="none" stroke="' + INK + '" stroke-opacity=".5" stroke-width="1"/>';
      },
      /* 55 × 34: il rapporto aureo */
      corpo: 'ellipse cx="40" cy="50" rx="27.5" ry="17"',
      luce: [36, 46, 27.5, 17],
      riflesso: 'M20 45 C23 39 29 36 36 35',
      sopra: function () {
        return '<path d="M49 41 q3.5 4 0 8 M55 39 q3.5 5 0 10 M49 52 q3.5 4 0 8" stroke="' + INK + '" stroke-opacity=".32" stroke-width="1.2" fill="none" stroke-linecap="round"/>' +
          '<path d="M37 55 Q45 53.5 48.5 60 Q41.5 62 37 55Z" fill="currentColor" ' + TRATTO + '/>';
      },
      occhi: [[33.5, 46]], bocca: [17.5, 55], profilo: true },

    3: { name: 'Navicella',
      lines: ['Duc in altum! Prendi il largo. (Lc 5,4)', 'Duemila anni di mare… e ancora a galla.', 'Tempesta? Non temete!'],
      dietro: function () {
        return '<path d="M44.5 11 V50" stroke="' + INK + '" stroke-width="3.4" stroke-linecap="round"/>' +
          '<path d="M44.5 11 V50" stroke="' + ORO + '" stroke-width="1.8" stroke-linecap="round"/>' +
          '<path d="M45.5 10 L57 13 L45.5 16Z" fill="' + ORO + '" ' + TRATTO + '/>' +
          '<path d="M47.5 17 C58 25 65 34 68 46 H47.5Z" fill="' + CREMA + '" ' + TRATTO + '/>' +
          '<path d="M58 30 C62 35 65 40 68 46 H58Z" fill="' + OMBRA + '" fill-opacity=".14"/>' +
          '<path d="M41.5 21 C34 29 28.5 37 26 46 H41.5Z" fill="' + CREMA + '" ' + TRATTO + '/>' +
          '<path d="M55.5 26 V39 M51 30.5 H60" stroke="' + ORO + '" stroke-width="2.2" stroke-linecap="round"/>' +
          '<path d="M6 79 q5.5 -4 11 0 t11 0 t11 0 t11 0 t11 0 t11 0 t11 0" stroke="#7DD3FC" stroke-width="2.2" fill="none" stroke-linecap="round"/>';
      },
      /* scafo 55 in basso, 55·φ ≈ 89 × … in coperta; alto 21 (= 55/φ²) */
      corpo: 'path d="M11 50 H78 L67 71 H22Z"',
      luce: [40, 45, 40],
      riflesso: 'M17 55 H38',
      sopra: function () {
        return '<path d="M11 50 H78" stroke="' + INK + '" stroke-width="4.2" stroke-linecap="round"/>' +
          '<path d="M11 50 H78" stroke="' + ORO + '" stroke-width="2.2" stroke-linecap="round"/>';
      },
      occhi: [[33.5, 59.5], [55.5, 59.5]], bocca: [44.5, 66.5], piccoli: true, senzaCiglia: true },

    4: { name: 'Bussolina', ago: [44.5, 37],
      lines: ['La coscienza è la mia bussola.', 'E la tua, dove punta?', 'Libertà non è andare ovunque: è sapere dove.'],
      dietro: function () {
        return '<circle cx="44.5" cy="10" r="5" fill="none" stroke="' + INK + '" stroke-width="4.4"/>' +
          '<circle cx="44.5" cy="10" r="5" fill="none" stroke="' + ORO + '" stroke-width="2.4"/>' +
          '<rect x="39.5" y="14.5" width="10" height="8" rx="1.5" fill="' + ORO + '" ' + TRATTO + '/>';
      },
      corpo: 'circle cx="44.5" cy="50" r="27.5"',
      luce: [40, 45, 27.5],
      riflesso: 'M21 45 C22 36 28 29 36 26',
      sopra: function () {
        return '<circle cx="44.5" cy="50" r="24" fill="none" stroke="' + ORO + '" stroke-width="2.6"/>' +
          '<circle cx="44.5" cy="50" r="21" fill="' + CREMA + '" ' + TRATTO + '/>' +
          '<path d="M44.5 29.5 L46.5 33.5 H42.5Z" fill="' + INK + '"/>' +
          '<path d="M44.5 67 V70 M24 50 H27 M62 50 H65" stroke="' + INK + '" stroke-opacity=".45" stroke-width="1.4" stroke-linecap="round"/>';
      },
      occhi: [[33.5, 51.5], [55.5, 51.5]], bocca: [44.5, 62], piccoli: true },

    5: { name: 'Terra',
      lines: ['Laudato si’! Custodisci la casa comune.', 'Tutto è connesso.', 'Il futuro comincia adesso.'],
      dietro: function () {
        return ciuffo('M35 29 L30 12 L41 22 L45 5 L50 22 L60 11 L55 29Z', 'M45 5 L50 22 L60 11 L55 29 L47 27Z');
      },
      corpo: 'circle cx="44.5" cy="52" r="27.5"',
      luce: [39.5, 47, 27.5],
      riflesso: 'M22 48 C23 39 29 32 37 29',
      sopra: function () {
        return '<g clip-path="url(#' + this.id + 'k)"><path d="M28 31 C32 28.5 37.5 30 35.5 33.5 C32.5 35.5 28 34 28 31Z M17.5 58 C21 55 25.5 57 24.5 61.5 C23.5 65.5 19 66 17.8 63.5Z M50 72.5 C55 69 63 70 64.5 74 C59.5 78.5 52 77.5 50 72.5Z" fill="' + VERDE + '" fill-opacity=".92"/></g>';
      },
      occhi: [[31.5, 45.5], [57.5, 45.5]], bocca: [44.5, 58.5] },
  };

  function f(n) { return Math.round(n * 100) / 100; }

  /* occhio a mandorla 13 × 8; lato = -1 per l'occhio sinistro (specchiato) */
  var MANDORLA = 'M-6.5 1 C-4.8 -4.4 2.8 -5.2 6.5 -1.6 C4.4 3.4 -3.2 4.2 -6.5 1Z';
  var GRANDE = 1.236;   /* 2/φ */

  function occhio(x, y, lato, id, st, k, ciglia) {
    var g = '<g transform="translate(' + x + ' ' + y + ') scale(' + k + ')">';
    var sp = 'scale(' + lato + ' 1)';
    if (st.blink || st.felice) {
      /* occhi chiusi: arco verso l'alto, sorriso "anime" */
      return g + '<path d="M-6.5 1.8 Q0 -4.2 6.5 1.8" stroke="' + INK + '" stroke-width="2.2" fill="none" stroke-linecap="round" transform="' + sp + '"/>' +
        (ciglia === false ? '' : '<path d="M-5.2 -8.2 Q0.5 -10.6 6.2 -9" stroke="' + INK + '" stroke-width="1.8" fill="none" stroke-linecap="round" transform="' + sp + '"/>') + '</g>';
    }
    var dx = f((st.dx || 0) * 2), dy = f((st.dy || 0) * 1.1);
    return g +
      '<path d="' + MANDORLA + '" fill="#fff" transform="' + sp + '"/>' +
      '<g clip-path="url(#' + id + (lato < 0 ? 'L' : 'R') + ')"><g transform="translate(' + dx + ' ' + dy + ')">' +
        '<circle r="4.3" fill="currentColor"/>' +
        '<path d="M-4.3 0 A4.3 4.3 0 0 1 4.3 0Z" fill="' + OMBRA + '" fill-opacity=".38"/>' +
        '<circle r="1.65" fill="#0D0A18"/>' +
        '<circle r="4.3" fill="none" stroke="#0D0A18" stroke-width=".8"/>' +
        '<circle cx="-1.5" cy="-1.6" r="1.25" fill="#fff"/>' +
        '<circle cx="1.6" cy="1.7" r=".5" fill="#fff" fill-opacity=".85"/>' +
      '</g></g>' +
      /* palpebra spessa con la punta esterna, riga sotto, sopracciglio deciso */
      '<path d="M-7 1.3 C-5 -4.9 3.2 -5.8 7 -1.7 L8.6 -3.2" stroke="' + INK + '" stroke-width="2.1" fill="none" stroke-linecap="round" stroke-linejoin="round" transform="' + sp + '"/>' +
      '<path d="M-1.8 3.4 Q1.8 3.4 4.6 1.9" stroke="' + INK + '" stroke-opacity=".55" stroke-width="1" fill="none" stroke-linecap="round" transform="' + sp + '"/>' +
      (ciglia === false ? '' : '<path d="M-5.6 -7.6 Q0.5 -10.6 6.4 -9.4" stroke="' + INK + '" stroke-width="1.8" fill="none" stroke-linecap="round" transform="' + sp + '"/>') +
      '</g>';
  }

  function bocca(p, st, k) {
    var g = '<g transform="translate(' + p[0] + ' ' + p[1] + ') scale(' + k + ')">';
    if (st.parla) {
      return g + '<path d="M-4 -0.8 Q0 0 4 -0.8 Q3.2 4.6 0 4.9 Q-3.2 4.6 -4 -0.8Z" fill="#3A1224" ' + TRATTO + '/>' +
        '<path d="M-2 3.6 Q0 2.2 2 3.6 Q0 4.6 -2 3.6Z" fill="#D9637C"/></g>';
    }
    return g + '<path d="M-3 -0.2 Q0 2.1 3.2 -0.8" stroke="' + INK + '" stroke-width="1.5" fill="none" stroke-linecap="round"/></g>';
  }

  /* rossore "a tratteggio" quando è contenta */
  function rossore(o, k) {
    var s = '';
    o.forEach(function (e) {
      var x = e[0], y = e[1] + 8 * k;
      s += '<path d="M' + f(x - 4) + ' ' + f(y + 1.5) + ' l1.6 -3 M' + f(x - 1) + ' ' + f(y + 1.5) + ' l1.6 -3 M' + f(x + 2) + ' ' + f(y + 1.5) + ' l1.6 -3" stroke="#E0456B" stroke-opacity=".7" stroke-width="1.1" stroke-linecap="round"/>';
    });
    return s;
  }

  function disegna(anno, id, st) {
    var m = ARTE[anno] || ARTE[1];
    st = st || {};
    var k = m.piccoli ? 0.85 : 1;
    m.id = id;
    var L = m.luce;
    /* ombra "cel": tutto il corpo in ombra, poi la parte in luce sopra, spostata in alto a sinistra */
    var luce = L.length === 4
      ? '<ellipse cx="' + L[0] + '" cy="' + L[1] + '" rx="' + L[2] + '" ry="' + L[3] + '" fill="currentColor"/>'
      : '<circle cx="' + L[0] + '" cy="' + L[1] + '" r="' + L[2] + '" fill="currentColor"/>';
    var s = '<defs>' +
      '<clipPath id="' + id + 'k"><' + m.corpo + '/></clipPath>' +
      '<clipPath id="' + id + 'R"><path d="' + MANDORLA + '"/></clipPath>' +
      '<clipPath id="' + id + 'L"><path d="' + MANDORLA + '" transform="scale(-1 1)"/></clipPath>' +
      '</defs>';
    s += m.dietro();
    s += '<' + m.corpo + ' fill="currentColor"/>';
    s += '<g clip-path="url(#' + id + 'k)"><rect width="89" height="89" fill="' + OMBRA + '" fill-opacity=".3"/>' + luce + '</g>';
    s += '<path d="' + m.riflesso + '" stroke="#fff" stroke-opacity=".55" stroke-width="2.4" fill="none" stroke-linecap="round"/>';
    s += '<' + m.corpo + ' fill="none" ' + TRATTO + '/>';
    if (m.sopra) s += m.sopra();
    if (m.ago) {
      var a = m.ago;
      s += '<g transform="rotate(' + f(st.ang || 0) + ' ' + a[0] + ' ' + a[1] + ')">' +
        '<path d="M' + a[0] + ' ' + (a[1] - 8) + ' L' + (a[0] + 2.6) + ' ' + a[1] + ' L' + (a[0] - 2.6) + ' ' + a[1] + 'Z" fill="currentColor" ' + TRATTO.replace('1.8', '1.1') + '/>' +
        '<path d="M' + a[0] + ' ' + (a[1] + 5) + ' L' + (a[0] + 2.6) + ' ' + a[1] + ' L' + (a[0] - 2.6) + ' ' + a[1] + 'Z" fill="' + INK + '"/>' +
        '<circle cx="' + a[0] + '" cy="' + a[1] + '" r="1.6" fill="' + ORO + '" stroke="' + INK + '" stroke-width=".8"/></g>';
    }
    if (st.felice) s += rossore(m.occhi, k);
    s += m.occhi.map(function (o, i) { return occhio(o[0], o[1], m.occhi.length > 1 && i === 0 ? -1 : 1, id, st, k * GRANDE, !m.senzaCiglia); }).join('');
    s += bocca(m.bocca, st, k);
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
    el.innerHTML = '<span class="la-bubble" hidden></span><svg viewBox="0 0 89 89" aria-hidden="true"></svg>';
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
