/* Lab IRC — Kit artefatti. Mettere in fondo al <body class="la" data-anno="1-5"> (o dopo i dati di una lezione con `anno`).
   Aggiunge: tema salvato, luce che segue il cursore, schede reattive, mascotte dell'anno, easter egg AMDG.
   API: LabArtefatto.say(testo) · .cheer() · .oops() · .amdg() */
(function () {
  var d = document, w = window;
  try { var t = localStorage.getItem('tema_lab'); if (t) d.documentElement.dataset.tema = t; } catch (e) {}
  if (!d.body.hasAttribute('data-anno') && w.GIOCHI_DATI && w.GIOCHI_DATI.anno) d.body.setAttribute('data-anno', w.GIOCHI_DATI.anno);
  var reduce = w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var M = {
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
      lines: ['Laudato si’! Custodisci la casa comune.', 'Tutto è connesso.', 'Il futuro comincia adesso.'] }
  };
  var CHEER = ['Esatto!', 'Bravissimo!', 'Proprio così!', 'Ottimo!'];
  var OOPS = ['Quasi… riprova!', 'Mmm, pensaci ancora.', 'Non proprio. Coraggio!'];
  var pick = function (a) { return a[Math.floor(Math.random() * a.length)]; };
  var NEEDLE = '<g class="la-needle"><path d="M24 12 L27.5 24 L20.5 24 Z" fill="#fff"/><path d="M24 36 L27.5 24 L20.5 24 Z" fill="#14131F" fill-opacity=".55"/><circle cx="24" cy="24" r="2.4" fill="#fff"/></g>';
  var EYE = function (p) { return '<g transform="translate(' + p[0] + ' ' + p[1] + ')"><g class="la-lid"><circle r="3.4" fill="#fff"/><circle class="la-pupil" r="1.7" fill="#14131F"/></g></g>'; };

  var egg = null;
  function amdg() {
    if (egg) return;
    egg = d.createElement('div');
    egg.className = 'la-amdg'; egg.setAttribute('role', 'dialog'); egg.setAttribute('aria-label', 'Ad maiorem Dei gloria');
    egg.innerHTML = '<div><div class="la-amdg-star">✦</div><div class="la-amdg-letters">' +
      ['A', 'M', 'D', 'G'].map(function (l, i) { return (i ? '<i style="animation-delay:' + (233 + i * 89) + 'ms">·</i>' : '') + '<b style="animation-delay:' + (233 + i * 144) + 'ms">' + l + '</b>'; }).join('') +
      '</div><div class="la-amdg-line"></div><div class="la-amdg-lat">Ad maiorem Dei gloria</div><div class="la-amdg-it">Per la maggior gloria di Dio</div></div>';
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
    el.innerHTML = '<span class="la-bubble" hidden></span><svg viewBox="0 0 48 48" aria-hidden="true">' + m.body + (m.needle ? NEEDLE : '') +
      m.eyes.map(EYE).join('') + (m.smile ? '<path d="' + m.smile + '" fill="none" stroke="#14131F" stroke-width="1.6" stroke-linecap="round" stroke-opacity=".7"/>' : '') + '</svg>';
    d.body.appendChild(el);
    var bub = el.querySelector('.la-bubble'), pupils = el.querySelectorAll('.la-pupil'), needle = el.querySelector('.la-needle'), n = 0, bt;
    w.addEventListener('mousemove', function (e) {
      var r = el.getBoundingClientRect(), x = e.clientX - (r.left + r.width / 2), yy = e.clientY - (r.top + r.height / 2);
      var dd = Math.hypot(x, yy) || 1, k = Math.min(1, dd / 144);
      for (var i = 0; i < pupils.length; i++) { pupils[i].setAttribute('cx', (x / dd * 1.4 * k).toFixed(2)); pupils[i].setAttribute('cy', (yy / dd * 1.4 * k).toFixed(2)); }
      if (needle) needle.setAttribute('transform', 'rotate(' + (Math.atan2(yy, x) * 180 / Math.PI + 90).toFixed(1) + ' 24 24)');
    });
    (function blink() { setTimeout(function () { el.classList.add('blink'); setTimeout(function () { el.classList.remove('blink'); blink(); }, 144); }, 2584 + Math.random() * 2584); })();
    function say(txt) {
      bub.textContent = txt; bub.hidden = false;
      bub.style.animation = 'none'; void bub.offsetWidth; bub.style.animation = '';
      clearTimeout(bt); bt = setTimeout(function () { bub.hidden = true; }, 2618);
    }
    el.addEventListener('click', function () {
      n++;
      if (n >= 7) { n = 0; bub.hidden = true; amdg(); return; }
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
