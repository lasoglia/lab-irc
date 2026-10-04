/* Lab IRC — Kit artefatti. Mettere in fondo al <body class="la" data-anno="1-5">.
   Aggiunge: tema salvato, luce che segue il cursore, schede reattive, mascotte dell'anno (<lab-mascotte>, caricata da /assets/mascotte/ del sito), easter egg AMDG.
   API: LabArtefatto.say(testo) · .cheer() · .oops() · .amdg() · .lim(true|false)
   Modalità LIM: pulsante «LIM», tasto L o ?lim=1 → <html data-lim> (vedi lab-percezione.css).
   In visore: ?in=visore (lo aggiunge il Visore del sito, che ha già la sua barra da 55 px) → <html data-visore>: la testata della lezione si riduce alla riga delle schede. */
(function () {
  var cs = document.currentScript;
  if (cs && cs.src && !/lab-artefatto\.js/.test(cs.src)) return; /* incluso in un altro file (bundle): non fare nulla; inline va bene */
  var d = document, w = window;
  try { var t = localStorage.getItem('tema_lab'); if (t) d.documentElement.dataset.tema = t; } catch (e) {}
  var root = d.documentElement, mascotEl = null, limBtn = null;
  var isLim = function () { return root.hasAttribute('data-lim'); };
  /* l'indirizzo (?lim=1, usato anche dal visore del sito) vale anche dove lo storage è bloccato */
  var qm = /[?&]lim=(1|0)/.exec(location.search);
  if (qm) { if (qm[1] === '1') root.setAttribute('data-lim', ''); }
  else { try { if (localStorage.getItem('lim_lab') === '1') root.setAttribute('data-lim', ''); } catch (e) {} }
  try { if (qm) localStorage.setItem('lim_lab', qm[1]); } catch (e) {}
  /* ?in=visore: dentro l'iframe del sito (sandbox senza storage) niente logo, titolo, schermo intero e LIM doppi */
  var inVisore = /[?&]in=visore(?:&|$)/.test(location.search);
  if (inVisore) root.setAttribute('data-visore', '');
  function setLim(on) {
    if (on) root.setAttribute('data-lim', ''); else root.removeAttribute('data-lim');
    try { localStorage.setItem('lim_lab', on ? '1' : '0'); } catch (e) {}
    if (limBtn) limBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
    if (mascotEl) mascotEl.setAttribute('size', on ? '144' : '89');
    w.dispatchEvent(new CustomEvent('lab:lim', { detail: on }));
  }
  var reduce = w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var CHEER = ['Esatto!', 'Bravissimo!', 'Proprio così!', 'Ottimo!'];
  var OOPS = ['Quasi… riprova!', 'Mmm, pensaci ancora.', 'Non proprio. Coraggio!'];
  var pick = function (a) { return a[Math.floor(Math.random() * a.length)]; };
  var SELF = (d.currentScript && d.currentScript.src) || '';

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

  function loadMascotte() {
    if (w.customElements && customElements.get('lab-mascotte')) return;
    if (d.querySelector('script[data-lab-mascotte]')) return;
    var sc = d.createElement('script');
    /* la mascotte del sito (niente AMDG al 7° clic): /assets/mascotte/ alla radice del sito */
    sc.src = new URL('../../../assets/mascotte/lab-mascotte.js', SELF || location.href).href;
    sc.setAttribute('data-lab-mascotte', ''); d.head.appendChild(sc);
  }
  function mascot() {
    var y = +(d.body.getAttribute('data-anno') || 0);
    if (!(y >= 1 && y <= 5) || d.body.hasAttribute('data-no-mascotte')) return null;
    loadMascotte();
    var wrap = d.createElement('div'); wrap.className = 'la-mascot';
    var el = d.createElement('lab-mascotte'); el.setAttribute('anno', y); el.setAttribute('size', isLim() ? '144' : '89'); mascotEl = el; el.setAttribute('fumetto', 'sinistra');
    wrap.appendChild(el); d.body.appendChild(wrap);
    return { say: function (t) { if (w.customElements) w.customElements.whenDefined('lab-mascotte').then(function () { if (el.bubble) el.bubble(t); }); } };
  }

  function init() {
    var mas = mascot();

    var tools = d.querySelector('.g-tools, .ll-tools');
    if (!d.body.classList.contains('ll')) { /* la lezione React disegna il suo pulsante LIM nella testata */
    limBtn = d.createElement('button'); limBtn.type = 'button'; limBtn.textContent = 'LIM';
    limBtn.setAttribute('data-lim-toggle', ''); limBtn.title = 'Modalità LIM: caratteri grandi (tasto L)';
    limBtn.setAttribute('aria-pressed', isLim() ? 'true' : 'false');
    limBtn.className = !tools ? 'la-lim-btn' : tools.classList.contains('g-tools') ? 'g-tool' : 'll-tool';
    limBtn.addEventListener('click', function () { setLim(!isLim()); });
    if (tools) tools.insertBefore(limBtn, tools.firstChild); else d.body.appendChild(limBtn);
    }

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
      if (!c.hasAttribute('data-flat') && !reduce && !isLim()) c.style.transform = 'perspective(987px) rotateX(' + ((.5 - py) * 4).toFixed(2) + 'deg) rotateY(' + ((px - .5) * 4).toFixed(2) + 'deg) translateY(-3px)';
    });
    d.addEventListener('animationend', function (e) { if (e.animationName === 'labRise' && e.target.hasAttribute && e.target.hasAttribute('data-reveal')) e.target.removeAttribute('data-reveal'); });

    var buf = '';
    d.addEventListener('keydown', function (e) {
      var tag = (e.target.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable || !e.key || e.key.length !== 1) return;
      if ((e.key === 'l' || e.key === 'L') && !e.ctrlKey && !e.metaKey && !e.altKey) setLim(!isLim());
      buf = (buf + e.key.toLowerCase()).slice(-4); if (buf === 'amdg') amdg();
    });
    w.addEventListener('lab:amdg', amdg);

    var say = function (t) { if (mas) mas.say(t); };
    w.LabArtefatto = { say: say, cheer: function () { say(pick(CHEER)); }, oops: function () { say(pick(OOPS)); }, amdg: amdg, lim: setLim, visore: inVisore };
    console.log('%cA · M · D · G', 'font: 600 21px Cinzel, Georgia, serif; color: #E3C27A; letter-spacing: .3em');
  }

  w.LabArtefatto = { say: function () {}, cheer: function () {}, oops: function () {}, amdg: amdg, visore: inVisore };
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', init); else init();
})();
