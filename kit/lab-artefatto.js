/* Lab IRC — Kit artefatti. Mettere in fondo al <body class="la" data-anno="1-5"> (o dopo i dati di una lezione con `anno`),
   dopo lab-mascotte.js. Aggiunge: tema salvato, luce che segue il cursore, schede reattive, mascotte dell'anno, easter egg AMDG.
   API: LabArtefatto.say(testo) · .cheer() · .oops() · .amdg() */
(function () {
  var d = document, w = window;
  try { var t = localStorage.getItem('tema_lab'); if (t) d.documentElement.dataset.tema = t; } catch (e) {}
  if (!d.body.hasAttribute('data-anno') && w.GIOCHI_DATI && w.GIOCHI_DATI.anno) d.body.setAttribute('data-anno', w.GIOCHI_DATI.anno);
  var reduce = w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
      '</div><div class="la-amdg-line"></div><div class="la-amdg-lat">Ad maiorem Dei gloria</div><div class="la-amdg-it">Per la maggior gloria di Dio</div></div>';
    d.body.appendChild(egg);
    var el = egg, timer;
    var close = function () { if (egg !== el) return; egg = null; clearTimeout(timer); d.removeEventListener('keydown', esc); el.classList.add('is-out'); setTimeout(function () { el.remove(); }, 610); };
    var esc = function (e) { if (e.key === 'Escape') close(); };
    el.addEventListener('click', close); d.addEventListener('keydown', esc); timer = setTimeout(close, 6180);
  }

  /* Mascotte: il web component <lab-mascotte> (lab-mascotte.js) disegna, anima e al 7° clic lancia 'lab:amdg'.
     Qui le frasi passano dal fumetto del kit, allineato a destra perché la mascotte sta nell'angolo. */
  function mascot() {
    var y = +(d.body.getAttribute('data-anno') || 0), L = w.LabMascotte;
    if (!L || !L.INFO[y]) return null;
    var m = L.INFO[y], el = d.createElement('div');
    el.className = 'la-mascot'; el.tabIndex = 0; el.setAttribute('role', 'button'); el.setAttribute('aria-label', m.nome);
    el.innerHTML = '<span class="la-bubble" hidden></span><lab-mascotte anno="' + y + '" size="' + (innerWidth < 700 ? 55 : 89) + '" parla="false"></lab-mascotte>';
    d.body.appendChild(el);
    var bub = el.querySelector('.la-bubble'), comp = el.querySelector('lab-mascotte'), n = 0, bt;
    function say(txt) {
      bub.textContent = txt; bub.hidden = false;
      bub.style.animation = 'none'; void bub.offsetWidth; bub.style.animation = '';
      clearTimeout(bt); bt = setTimeout(function () { bub.hidden = true; }, 2618);
    }
    /* in cattura: il componente ferma la propagazione del clic */
    el.addEventListener('click', function () {
      n++;
      if (n >= 7) { n = 0; bub.hidden = true; return; }
      say(n === 1 ? 'Ciao, sono ' + m.nome + '!' : m.frasi[(n - 2) % m.frasi.length]);
    }, true);
    el.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault(); var inner = comp.shadowRoot && comp.shadowRoot.querySelector('.m'); if (inner) inner.click();
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
