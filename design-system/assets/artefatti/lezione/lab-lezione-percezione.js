/* Lab IRC — Percezione nella lezione: alimenta il filo di avanzamento (continuità, effetto Zeigarnik)
   e segna l'ultima scena (regola picco–fine). Il resto è CSS (lab-lezione-percezione.css). */
(function () {
  var d = document, r = d.documentElement, raf = 0;
  function upd() {
    raf = 0;
    var dots = d.querySelectorAll('.ll-nav .ll-dot'), n = dots.length, i = 0;
    for (var k = 0; k < n; k++) if (dots[k].getAttribute('aria-current') === 'step') i = k;
    r.style.setProperty('--lz-prog', n ? ((i + 1) / n).toFixed(4) : '0');
    r.style.setProperty('--lz-rail', n > 1 ? (i / (n - 1)).toFixed(4) : '0');
    d.body.toggleAttribute('data-lz-ultima', n > 1 && i === n - 1);
  }
  function plan() { if (!raf) raf = requestAnimationFrame(upd); }
  function start() {
    new MutationObserver(plan).observe(d.getElementById('app') || d.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['aria-current'] });
    plan();
  }
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', start); else start();
})();
