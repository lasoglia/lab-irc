/* =====================================================================
   lab-motion.js — effetti di movimento del design system "Notte studio"
   ---------------------------------------------------------------------
   JavaScript vanilla, nessuna dipendenza. Da includere a fine <body>:

       <script src="assets/lab-motion.js"></script>

   Cosa fa (tutto proporzionato su φ = 1,618):
   1. ALONE      una luce morbida viola/oro segue il cursore (lerp 0,1618)
   2. SCHEDE     le card si inclinano (≤ 2,5°) verso il cursore, con una
                 luce che le segue; entrare è veloce, tornare è lento
   3. MAGNETI    i bottoni vengono "attratti" dal cursore (0,236 · 0,382)
   4. APPARIZIONE gli elementi fuori schermo compaiono quando ci si arriva
                 scorrendo, con sfasamento di 89 ms
   5. SPIRALE    disegna la spirale aurea dentro ogni [data-lab-spirale]
                 e fa "fluttuare" gli elementi [data-lab-parallax]

   Gli effetti legati al cursore esistono SOLO con un mouse vero: su touch
   non si attivano (niente trasformazioni lasciate a metà dopo un tap).
   Con "riduci movimento" attivo nel sistema non si anima nulla.

   Personalizzazione (facoltativa, PRIMA di includere lo script):
     window.LAB_MOTION = { schede: ".mia-card", magneti: ".mio-btn", ... }
   ===================================================================== */
(function(){
  "use strict";
  if(window.LabMotion) return;

  var PHI = 1.618;
  var EASE = "cubic-bezier(.16,1,.3,1)";
  var cfg = window.LAB_MOTION || {};
  var SEL = {
    schede:  cfg.schede  || ".lab-card,.card,.ycard,.fcard,.tile,[data-lab-tilt]",
    magneti: cfg.magneti || ".lab-btn,.go,[data-lab-magnete]",
    appari:  cfg.appari  || ".lab-appari",
    /* elementi con animazione d'ingresso CSS: se nascono fuori schermo,
       l'animazione aspetta che ci si arrivi scorrendo */
    attendi: cfg.attendi || ".ycard,.fcard,.card,.tile,.reveal,.shead,.quote"
  };

  var mqRidotto = window.matchMedia ? matchMedia("(prefers-reduced-motion: reduce)") : null;
  var mqMouse   = window.matchMedia ? matchMedia("(hover: hover) and (pointer: fine)") : null;
  function ridotto(){ return !!(mqRidotto && mqRidotto.matches); }
  function conMouse(){ return !!(mqMouse && mqMouse.matches); }
  function nelVisore(){ return document.body && document.body.classList.contains("viewing"); }

  /* ------------------------------------------------------------------
     5a. SPIRALE AUREA — quadrati di Fibonacci + archi di un quarto
     ------------------------------------------------------------------ */
  function spiraleSVG(){
    var W = 1618, H = 1000, passi = 10;
    var r = { x:0, y:0, w:W, h:H };
    var quadrati = "", d = "M 0 " + H;
    for(var i = 0; i < passi; i++){
      var s, q, fine;
      switch(i % 4){
        case 0: /* quadrato a sinistra: arco da basso-sx ad alto-dx */
          s = r.h; q = { x:r.x, y:r.y };
          fine = [q.x + s, q.y];
          r = { x:r.x + s, y:r.y, w:r.w - s, h:r.h }; break;
        case 1: /* in alto: da alto-sx a basso-dx */
          s = r.w; q = { x:r.x, y:r.y };
          fine = [q.x + s, q.y + s];
          r = { x:r.x, y:r.y + s, w:r.w, h:r.h - s }; break;
        case 2: /* a destra: da alto-dx a basso-sx */
          s = r.h; q = { x:r.x + r.w - s, y:r.y };
          fine = [q.x, q.y + s];
          r = { x:r.x, y:r.y, w:r.w - s, h:r.h }; break;
        default: /* in basso: da basso-dx ad alto-sx */
          s = r.w; q = { x:r.x, y:r.y + r.h - s };
          fine = [q.x, q.y];
          r = { x:r.x, y:r.y, w:r.w, h:r.h - s }; break;
      }
      quadrati += '<rect x="'+q.x.toFixed(2)+'" y="'+q.y.toFixed(2)+'" width="'+s.toFixed(2)+'" height="'+s.toFixed(2)+'"/>';
      d += " A "+s.toFixed(2)+" "+s.toFixed(2)+" 0 0 1 "+fine[0].toFixed(2)+" "+fine[1].toFixed(2);
    }
    /* l'"occhio" della spirale: dove convergono i quadrati */
    var ox = r.x + r.w / 2, oy = r.y + r.h / 2;
    var stella = "M0 -34 L8 -8 L34 0 L8 8 L0 34 L-8 8 L-34 0 L-8 -8 Z";
    return ''
      + '<svg class="lab-spirale-svg" viewBox="-21 -21 '+(W+42)+' '+(H+42)+'" fill="none" aria-hidden="true" focusable="false">'
      +   '<defs>'
      +     '<linearGradient id="labSpiraleTratto" x1="0" y1="1" x2="1" y2="0">'
      +       '<stop offset="0" stop-color="var(--lab-viola,#8B5CF6)"/>'
      +       '<stop offset=".618" stop-color="var(--lab-ciano,#22D3EE)"/>'
      +       '<stop offset="1" stop-color="var(--lab-oro,#E3C27A)"/>'
      +     '</linearGradient>'
      +     '<radialGradient id="labSpiraleOcchio"><stop offset="0" stop-color="var(--lab-oro,#E3C27A)" stop-opacity=".55"/><stop offset="1" stop-color="var(--lab-oro,#E3C27A)" stop-opacity="0"/></radialGradient>'
      +   '</defs>'
      +   '<g class="lab-spirale-quadrati">'+quadrati+'</g>'
      +   '<path class="lab-spirale-arco" pathLength="1000" d="'+d+'"/>'
      +   '<circle cx="'+ox.toFixed(2)+'" cy="'+oy.toFixed(2)+'" r="89" fill="url(#labSpiraleOcchio)" class="lab-spirale-alone"/>'
      +   '<g class="lab-spirale-occhio" data-amdg-open transform="translate('+ox.toFixed(2)+' '+oy.toFixed(2)+')">'
      +     '<circle r="55" fill="transparent"/>'
      +     '<path d="'+stella+'"/>'
      +   '</g>'
      + '</svg>';
  }

  function stile(){
    if(document.getElementById("lab-motion-stile")) return;
    var css = ""
      /* alone del cursore */
      + "#labAlone{position:fixed;left:0;top:0;width:466px;height:466px;border-radius:50%;pointer-events:none;z-index:0;opacity:0;"
      +   "transition:opacity 610ms ease;will-change:transform;"
      +   "background:radial-gradient(circle,var(--lab-alone,rgba(139,92,246,.10)),rgba(227,194,122,.04) 38.2%,transparent 61.8%)}"
      + "body.viewing #labAlone{display:none}"
      /* strato di luce delle schede */
      + ".lab-luce{position:absolute;inset:0;border-radius:inherit;pointer-events:none;z-index:0;opacity:0;"
      +   "transition:opacity 377ms ease;"
      +   "background:radial-gradient(233px circle at var(--lab-mx,50%) var(--lab-my,50%),var(--lab-luce-c,var(--lab-luce,rgba(139,92,246,.16))),transparent 61.8%)}"
      + ".lab-luce.on{opacity:1}"
      /* spirale aurea */
      + "[data-lab-spirale]{position:relative}"
      + ".lab-spirale-svg{display:block;width:100%;height:auto;overflow:visible}"
      + ".lab-spirale-quadrati rect{stroke:var(--lab-oro,#E3C27A);stroke-opacity:.26;stroke-width:1;vector-effect:non-scaling-stroke}"
      + ".lab-spirale-arco{stroke:url(#labSpiraleTratto);stroke-width:2.6;stroke-linecap:round;vector-effect:non-scaling-stroke;"
      +   "stroke-dasharray:1000;stroke-dashoffset:0;animation:labMotionDisegna 2584ms cubic-bezier(.16,1,.3,1) 377ms both}"
      + ".lab-spirale-quadrati{animation:labMotionAppari 1597ms ease 233ms both}"
      + ".lab-spirale-alone{animation:labMotionRespiro 4181ms ease-in-out infinite}"
      + ".lab-spirale-occhio{cursor:pointer;fill:var(--lab-oro,#E3C27A);transition:filter 610ms "+EASE+"}"
      + ".lab-spirale-occhio path{transform-box:fill-box;transform-origin:center;transition:transform 610ms "+EASE+"}"
      + ".lab-spirale-occhio:hover{filter:drop-shadow(0 0 13px rgba(227,194,122,.8))}"
      + ".lab-spirale-occhio:hover path{transform:rotate(45deg) scale(1.236)}"
      + "@keyframes labMotionDisegna{from{stroke-dashoffset:1000}to{stroke-dashoffset:0}}"
      + "@keyframes labMotionAppari{from{opacity:0}to{opacity:1}}"
      + "@keyframes labMotionRespiro{0%,100%{opacity:.55}50%{opacity:1}}"
      + "@media (prefers-reduced-motion: reduce){.lab-spirale-arco,.lab-spirale-quadrati,.lab-spirale-alone{animation:none}#labAlone{display:none}}";
    var el = document.createElement("style");
    el.id = "lab-motion-stile";
    el.textContent = css;
    document.head.appendChild(el);
  }

  function riempiSpirali(radice){
    var nodi = (radice || document).querySelectorAll ? (radice || document).querySelectorAll("[data-lab-spirale]") : [];
    if(radice && radice.matches && radice.matches("[data-lab-spirale]")) nodi = [radice].concat([].slice.call(nodi));
    [].forEach.call(nodi, function(n){
      if(!n.dataset.labPronta){ n.dataset.labPronta = "1"; n.innerHTML = spiraleSVG(); }
    });
  }

  /* ------------------------------------------------------------------
     1. ALONE del cursore + 5b. PARALLASSE
     ------------------------------------------------------------------ */
  var alone = null, mx = innerWidth / 2, my = innerHeight / 3, ax = mx, ay = my, rafAlone = 0, attivoMouse = false;
  var par = { x:0, y:0, tx:0, ty:0 };

  function cicloMouse(){
    ax += (mx - ax) * 0.1618;
    ay += (my - ay) * 0.1618;
    if(alone) alone.style.transform = "translate(" + (ax - 233).toFixed(1) + "px," + (ay - 233).toFixed(1) + "px)";
    par.x += (par.tx - par.x) * 0.0618;
    par.y += (par.ty - par.y) * 0.0618;
    var elementi = document.querySelectorAll("[data-lab-parallax]");
    for(var i = 0; i < elementi.length; i++){
      var e = elementi[i], forza = parseFloat(e.getAttribute("data-lab-parallax")) || 21;
      e.style.transform = "translate(" + (par.x * forza).toFixed(2) + "px," + (par.y * forza / PHI).toFixed(2) + "px)"
        + " rotate(" + (par.x * 1.3).toFixed(2) + "deg)";
    }
    var fermo = Math.abs(mx - ax) < .3 && Math.abs(my - ay) < .3 && Math.abs(par.tx - par.x) < .001 && Math.abs(par.ty - par.y) < .001;
    rafAlone = fermo ? 0 : requestAnimationFrame(cicloMouse);
  }
  function avviaCiclo(){ if(!rafAlone) rafAlone = requestAnimationFrame(cicloMouse); }

  function montaAlone(){
    if(alone || !document.body) return;
    alone = document.createElement("div");
    alone.id = "labAlone";
    alone.setAttribute("aria-hidden", "true");
    document.body.insertBefore(alone, document.body.firstChild);
  }

  /* ------------------------------------------------------------------
     2. SCHEDE inclinate con luce
     ------------------------------------------------------------------ */
  var schedaAttiva = null, schedaPremuta = false;

  function luceDi(el){
    var l = el.querySelector(":scope > .lab-luce");
    if(!l){
      l = document.createElement("span");
      l.className = "lab-luce";
      l.setAttribute("aria-hidden", "true");
      el.insertBefore(l, el.firstChild);
      var pos = getComputedStyle(el).position;
      if(pos === "static") el.style.position = "relative";
      /* tinta della luce: colore dell'anno se c'è, bianco sui riquadri pieni */
      if(el.classList.contains("tile")) el.style.setProperty("--lab-luce-c", "rgba(255,255,255,.22)");
      else if(getComputedStyle(el).getPropertyValue("--c").trim())
        el.style.setProperty("--lab-luce-c", "color-mix(in srgb, var(--c) 22%, transparent)");
    }
    return l;
  }

  function inclina(el, e){
    var r = el.getBoundingClientRect();
    if(!r.width || !r.height) return;
    var px = (e.clientX - r.left) / r.width * 100, py = (e.clientY - r.top) / r.height * 100;
    var rx = (50 - py) / 50 * 2.5, ry = (px - 50) / 50 * 2.5;
    el.style.setProperty("--lab-mx", px.toFixed(1) + "%");
    el.style.setProperty("--lab-my", py.toFixed(1) + "%");
    el.style.transition = "transform 144ms linear, box-shadow 377ms ease, border-color 377ms ease";
    el.style.transform = "perspective(987px) rotateX(" + rx.toFixed(2) + "deg) rotateY(" + ry.toFixed(2) + "deg) translateY(-5px)"
      + (schedaPremuta ? " scale(.985)" : "");
  }

  function rilascia(el){
    if(!el) return;
    var l = el.querySelector(":scope > .lab-luce");
    if(l) l.classList.remove("on");
    el.style.transition = "transform 610ms " + EASE + ", box-shadow 377ms ease, border-color 377ms ease";
    el.style.transform = "";
    clearTimeout(el._labT);
    el._labT = setTimeout(function(){ if(el !== schedaAttiva) el.style.transition = ""; }, 640);
  }

  /* ------------------------------------------------------------------
     3. MAGNETI
     ------------------------------------------------------------------ */
  var magneteAttivo = null, magnetePremuto = false;

  function attrai(el, e){
    var r = el.getBoundingClientRect();
    var dx = (e.clientX - r.left - r.width / 2) * 0.236;
    var dy = (e.clientY - r.top - r.height / 2) * 0.382;
    dx = Math.max(-13, Math.min(13, dx)); dy = Math.max(-8, Math.min(8, dy));
    el.style.transition = "transform 233ms " + EASE + ", box-shadow 377ms ease, filter 233ms ease";
    el.style.transform = "translate(" + dx.toFixed(1) + "px," + dy.toFixed(1) + "px)" + (magnetePremuto ? " scale(.96)" : "");
  }
  function lasciaMagnete(el){
    if(!el) return;
    el.style.transition = "transform 610ms " + EASE + ", box-shadow 377ms ease, filter 233ms ease";
    el.style.transform = "";
    clearTimeout(el._labT);
    el._labT = setTimeout(function(){ if(el !== magneteAttivo) el.style.transition = ""; }, 640);
  }

  /* ------------------------------------------------------------------
     Gestori del puntatore (delegati: valgono anche per le card create dopo)
     ------------------------------------------------------------------ */
  var ultimoEvt = null, rafPuntatore = 0;

  function aggiornaPuntatore(){
    rafPuntatore = 0;
    var e = ultimoEvt;
    if(!e || nelVisore()) return;
    var t = e.target && e.target.closest ? e.target : null;

    var scheda = t ? t.closest(SEL.schede) : null;
    if(scheda !== schedaAttiva){ rilascia(schedaAttiva); schedaAttiva = scheda; }
    if(scheda){ luceDi(scheda).classList.add("on"); inclina(scheda, e); }

    var mag = t ? t.closest(SEL.magneti) : null;
    if(mag && mag.disabled) mag = null;
    if(mag !== magneteAttivo){ lasciaMagnete(magneteAttivo); magneteAttivo = mag; }
    if(mag) attrai(mag, e);
  }

  function suMovimento(e){
    if(e.pointerType && e.pointerType !== "mouse") return;
    mx = e.clientX; my = e.clientY;
    par.tx = e.clientX / innerWidth * 2 - 1;
    par.ty = e.clientY / innerHeight * 2 - 1;
    if(alone && !attivoMouse){ attivoMouse = true; alone.style.opacity = "1"; }
    avviaCiclo();
    ultimoEvt = e;
    if(!rafPuntatore) rafPuntatore = requestAnimationFrame(aggiornaPuntatore);
  }

  function suUscitaFinestra(){
    if(alone){ alone.style.opacity = "0"; attivoMouse = false; }
    rilascia(schedaAttiva); schedaAttiva = null;
    lasciaMagnete(magneteAttivo); magneteAttivo = null;
    par.tx = 0; par.ty = 0; avviaCiclo();
  }

  function suPressione(e){
    if(e.pointerType && e.pointerType !== "mouse") return;
    if(schedaAttiva){ schedaPremuta = true; inclina(schedaAttiva, e); }
    if(magneteAttivo){ magnetePremuto = true; attrai(magneteAttivo, e); }
  }
  function suRilascio(e){
    schedaPremuta = false; magnetePremuto = false;
    if(ultimoEvt) aggiornaPuntatore();
  }

  var effettiMouseAttivi = false;
  function attivaEffettiMouse(){
    if(effettiMouseAttivi || ridotto() || !conMouse()) return;
    effettiMouseAttivi = true;
    montaAlone();
    document.addEventListener("pointermove", suMovimento, { passive:true });
    document.addEventListener("pointerdown", suPressione, { passive:true });
    document.addEventListener("pointerup", suRilascio, { passive:true });
    document.documentElement.addEventListener("mouseleave", suUscitaFinestra);
    /* il visore degli artefatti copre tutto: rimettiamo tutto a riposo */
    window.addEventListener("blur", suUscitaFinestra);
  }
  function disattivaEffettiMouse(){
    if(!effettiMouseAttivi) return;
    effettiMouseAttivi = false;
    suUscitaFinestra();
    document.removeEventListener("pointermove", suMovimento);
    document.removeEventListener("pointerdown", suPressione);
    document.removeEventListener("pointerup", suRilascio);
    document.documentElement.removeEventListener("mouseleave", suUscitaFinestra);
    window.removeEventListener("blur", suUscitaFinestra);
    if(alone){ alone.remove(); alone = null; }
    [].forEach.call(document.querySelectorAll("[data-lab-parallax]"), function(e){ e.style.transform = ""; });
  }

  /* ------------------------------------------------------------------
     4. APPARIZIONE allo scroll
     ------------------------------------------------------------------ */
  var io = null, codaVisti = [], timerCoda = 0;

  function sfasa(){
    timerCoda = 0;
    codaVisti.sort(function(a, b){
      var ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
      return (ra.top - rb.top) || (ra.left - rb.left);
    });
    codaVisti.forEach(function(el, k){
      var ritardo = Math.min(k, 8) * 89;
      if(el.classList.contains("lab-appari")){
        el.style.transitionDelay = ritardo + "ms";
        el.classList.add("lab-visto");
      } else {
        el.style.animationDelay = ritardo + "ms";
        el.style.animationPlayState = "running";
      }
    });
    codaVisti = [];
  }

  function creaOsservatore(){
    if(io || !("IntersectionObserver" in window)) return;
    io = new IntersectionObserver(function(voci){
      voci.forEach(function(v){
        if(!v.isIntersecting) return;
        io.unobserve(v.target);
        codaVisti.push(v.target);
      });
      if(codaVisti.length && !timerCoda) timerCoda = setTimeout(sfasa, 34);
    }, { rootMargin:"0px 0px -8% 0px", threshold:0.12 });
  }

  function fuoriSchermo(el){
    var r = el.getBoundingClientRect();
    return r.top > innerHeight * .92 || r.bottom < 0;
  }

  function preparaApparizioni(radice){
    if(ridotto()) {
      [].forEach.call((radice || document).querySelectorAll(SEL.appari), function(el){ el.classList.add("lab-visto"); });
      return;
    }
    creaOsservatore();
    if(!io){
      [].forEach.call((radice || document).querySelectorAll(SEL.appari), function(el){ el.classList.add("lab-visto"); });
      return;
    }
    var base = radice || document;
    var lista = [].slice.call(base.querySelectorAll(SEL.appari + "," + SEL.attendi));
    if(base.matches && base.matches(SEL.appari + "," + SEL.attendi)) lista.unshift(base);
    lista.forEach(function(el){
      if(el._labOss) return;
      el._labOss = true;
      if(el.matches(SEL.appari)){
        if(fuoriSchermo(el)) io.observe(el); else el.classList.add("lab-visto");
      } else if(fuoriSchermo(el)){
        /* animazione d'ingresso in pausa finché non arriva sullo schermo */
        el.style.animationPlayState = "paused";
        io.observe(el);
      }
    });
  }

  /* contenuti creati dopo (la home, le pagine anno… sono generate in JS) */
  function osservaNuoviContenuti(){
    if(!("MutationObserver" in window)) return;
    new MutationObserver(function(mut){
      for(var i = 0; i < mut.length; i++){
        var aggiunti = mut[i].addedNodes;
        for(var j = 0; j < aggiunti.length; j++){
          var n = aggiunti[j];
          if(n.nodeType !== 1) continue;
          riempiSpirali(n);
          preparaApparizioni(n);
        }
      }
    }).observe(document.body, { childList:true, subtree:true });
  }

  /* ------------------------------------------------------------------
     Avvio
     ------------------------------------------------------------------ */
  function avvio(){
    stile();
    riempiSpirali(document);
    preparaApparizioni(document);
    osservaNuoviContenuti();
    attivaEffettiMouse();
    function cambio(){ if(ridotto() || !conMouse()) disattivaEffettiMouse(); else attivaEffettiMouse(); }
    if(mqRidotto && mqRidotto.addEventListener){ mqRidotto.addEventListener("change", cambio); }
    if(mqMouse && mqMouse.addEventListener){ mqMouse.addEventListener("change", cambio); }
  }

  window.LabMotion = { spiraleSVG: spiraleSVG, aggiorna: function(r){ riempiSpirali(r); preparaApparizioni(r); } };

  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", avvio);
  else avvio();
})();
