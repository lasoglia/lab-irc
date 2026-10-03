/* Lab IRC — Strumenti aggiuntivi della lezione (2 ottobre 2026).
   Animazioni esplicative e attività di classe, registrate come blocchi con LabLezione.blocco.
   Richiede lab-lezione.js caricato prima. Ogni blocco: pulsanti veri, tastiera, tocco, 360 px, prefers-reduced-motion.
   Blocchi: catena · animazione · strati · bilancia · stima · lente · leggi · ordina · bivio · varianti · consegna */
(function () {
  var w = window, d = document, R = w.React, LL = w.LabLezione, html = w.html;
  if (!LL || !R || !html) return;
  var useState = R.useState, useEffect = R.useEffect, useMemo = R.useMemo;
  var inline = LL.inline, md = LL.md, festa = LL.festa;
  var reduce = w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function say(t) { var m = d.querySelector('.ll-head-m lab-mascotte, .ll-masc lab-mascotte'); if (m && m.bubble) m.bubble(t); else if (w.LabArtefatto) w.LabArtefatto.say(t); }
  function cheer() { w.LabArtefatto && w.LabArtefatto.cheer(); }
  function oops() { w.LabArtefatto && w.LabArtefatto.oops(); }
  function plain(s) { return String(s || '').replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\*([^*]+)\*/g, '$1'); }
  function H(p) { return p.titolo ? html`<h3 className="ll-block-h">${inline(p.titolo, 'h')}</h3>` : null; }
  function num(x) { return Number(x).toLocaleString('it-IT'); }
  function mescola(n, seed) { // permutazione deterministica, mai identica all'ordine giusto
    var a = Array.from({ length: n }, function (_, i) { return i; }), s = (seed || 7) + n * 31;
    for (var i = n - 1; i > 0; i--) { s = (s * 9301 + 49297) % 233280; var j = Math.floor(s / 233280 * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    if (n > 1 && a.every(function (v, i) { return v === i; })) a.push(a.shift());
    return a;
  }
  function Sub(p) { var F = LL.blocchi[p.b.tipo]; return html`<section className="ll-block" data-tipo=${p.b.tipo}>${F ? F(p.b, p.ctx) : html`<p className="ll-hint">Blocco sconosciuto: ${p.b.tipo}</p>`}</section>`; }

  /* ---------- CATENA: anelli causa-effetto che si agganciano; poi «togli un anello» ---------- */
  LL.blocco('catena', function (p) {
    var a = p.anelli || [], s = useState(p.iniziali || 1), k = s[0], setK = s[1];
    var pl = useState(false), play = pl[0], setPlay = pl[1], r = useState(null), rotto = r[0], setRotto = r[1], m = useState(false), prova = m[0], setProva = m[1];
    useEffect(function () { if (!play) return; if (k >= a.length) { setPlay(false); return; } var t = setTimeout(function () { setK(k + 1); }, reduce ? 800 : 1618); return function () { clearTimeout(t); }; }, [play, k]);
    useEffect(function () { if (k === a.length && a.length > 1) say(p.fine || 'Catena completa: ogni anello regge quello dopo.'); }, [k]);
    function tocca(i) { if (!prova) return; if (rotto === i) { setRotto(null); return; } setRotto(i); oops(); }
    return html`<div className=${'lp-chain' + (prova ? ' is-test' : '')}>
      ${H(p)}
      <ol className="lp-chain-l" aria-live="polite">${a.slice(0, k).map(function (x, i) {
        var st = rotto === i ? ' is-broken' : rotto !== null && i > rotto ? ' is-fallen' : '';
        return html`<li key=${i} className=${'lp-ring' + st}>
          ${i > 0 && html`<span className="lp-link" aria-hidden="true"><i></i>${x.nesso && html`<em>${x.nesso}</em>`}</span>`}
          ${prova ? html`<button className="lp-node" aria-pressed=${rotto === i} onClick=${function () { tocca(i); }}><b>${inline(x.t, 't' + i)}</b>${x.d && html`<span>${inline(x.d, 'd' + i)}</span>`}</button>`
                  : html`<div className="lp-node"><b>${inline(x.t, 't' + i)}</b>${x.d && html`<span>${inline(x.d, 'd' + i)}</span>`}</div>`}
        </li>`; })}</ol>
      <div aria-live="polite">${rotto !== null && html`<p key=${'r' + rotto} className="ll-why is-ko"><strong>Senza «${plain(a[rotto].t)}». </strong>${inline(a[rotto].senza || 'Gli anelli che seguono perdono la loro ragione: la conseguenza non segue più.', 's')}</p>`}</div>
      <div className="ll-row">
        ${k < a.length
          ? [html`<button key="n" className="ll-btn" onClick=${function () { setPlay(false); setK(k + 1); }}>${p.pulsante || 'Anello successivo'}</button>`,
             html`<button key="p" className="ll-btn ll-btn--ghost" onClick=${function () { setPlay(!play); }}>${play ? 'Pausa' : 'Riproduci tutto'}</button>`]
          : [p.rottura !== false && a.length > 2 && html`<button key="t" className="ll-btn ll-btn--ghost" aria-pressed=${prova} onClick=${function () { setProva(!prova); setRotto(null); }}>${prova ? 'Ricomponi la catena' : 'Togli un anello'}</button>`,
             html`<button key="r" className="ll-link" onClick=${function () { setK(p.iniziali || 1); setProva(false); setRotto(null); }}>Riparti</button>`]}
        <span className="ll-tally">${k} / ${a.length}</span>
      </div>
      ${prova && rotto === null && html`<p className="ll-hint" style=${{ marginTop: 13 }}>Tocca un anello: che cosa cade, se lo togliamo?</p>`}
    </div>`;
  });

  /* ---------- ANIMAZIONE: storyboard a fotogrammi chiave; attori che si muovono, frecce che si disegnano ---------- */
  LL.blocco('animazione', function (p) {
    var passi = p.passi || [], att = p.attori || [], fr = p.frecce || [], rap = p.rapporto || 1.618;
    var s = useState(0), k = s[0], setK = s[1], pl = useState(false), play = pl[0], setPlay = pl[1];
    var ref = R.useRef(null), sz = useState([0, 0]), W = sz[0][0], Hh = sz[0][1], setSz = sz[1];
    var last = passi.length - 1;
    useEffect(function () { var el = ref.current; if (!el) return; function m() { setSz([el.clientWidth, el.clientHeight]); } m();
      if (w.ResizeObserver) { var ro = new ResizeObserver(m); ro.observe(el); return function () { ro.disconnect(); }; }
      w.addEventListener('resize', m); return function () { w.removeEventListener('resize', m); }; }, []);
    useEffect(function () { if (!play) return; if (k >= last) { setPlay(false); return; } var t = setTimeout(function () { setK(k + 1); }, p.ritmo || 2618); return function () { clearTimeout(t); }; }, [play, k]);
    var pos = {};
    for (var j = 0; j <= k; j++) { var A = (passi[j] && passi[j].attori) || {}; for (var id in A) pos[id] = Object.assign({}, pos[id] || {}, A[id]); }
    var P = passi[k] || {}, vis = P.frecce || [];
    function q(id) { var o = pos[id] || {}; return { x: o.x == null ? 50 : o.x, y: o.y == null ? 50 : o.y, s: o.s == null ? 1 : o.s, o: o.o == null ? (pos[id] ? 1 : 0) : o.o, t: o.t, on: o.on }; }
    function avvia() { if (play) { setPlay(false); return; } if (k >= last) setK(0); setPlay(true); }
    return html`<div className="lp-anim">
      ${H(p)}
      <div className="lp-stage" ref=${ref} style=${{ aspectRatio: String(rap) }}>
        <svg className="lp-arrows" viewBox=${'0 0 ' + (W || 1) + ' ' + (Hh || 1)} aria-hidden="true">
          <defs><marker id=${'lpH' + (p.id || '')} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" markerUnits="userSpaceOnUse" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="var(--lab-oro)" /></marker></defs>
          ${W > 0 && fr.map(function (f, i) {
            var fid = f.id || String(i); if (vis.indexOf(fid) < 0) return null;
            var A1 = q(f.da), B1 = q(f.a), x1 = A1.x / 100 * W, y1 = A1.y / 100 * Hh, x2 = B1.x / 100 * W, y2 = B1.y / 100 * Hh, dx = x2 - x1, dy = y2 - y1, L = Math.sqrt(dx * dx + dy * dy) || 1, c = Math.min(f.margine || 44, L / 3);
            var sx = x1 + dx / L * c, sy = y1 + dy / L * c, ex = x2 - dx / L * c, ey = y2 - dy / L * c, cv = (f.curva || 0) * Hh / 100;
            var mx = (sx + ex) / 2 - dy / L * cv, my = (sy + ey) / 2 + dx / L * cv;
            return html`<path key=${k + '-' + fid} className=${'lp-arrow' + (f.tratteggio ? ' is-dash' : '')} d=${'M' + sx + ' ' + sy + ' Q' + mx + ' ' + my + ' ' + ex + ' ' + ey} pathLength="1" marker-end=${'url(#lpH' + (p.id || '') + ')'} />`;
          })}
        </svg>
        ${fr.map(function (f, i) {
          var fid = f.id || String(i); if (!f.t || vis.indexOf(fid) < 0) return null;
          var A1 = q(f.da), B1 = q(f.a);
          return html`<span key=${'l' + k + fid} className="lp-arrow-t" style=${{ left: (A1.x + B1.x) / 2 + '%', top: (A1.y + B1.y) / 2 + '%' }}>${f.t}</span>`;
        })}
        ${att.map(function (a) { var z = q(a.id);
          return html`<div key=${a.id} className=${'lp-actor lp-f-' + (a.forma || 'pillola') + ' lp-c-' + (a.colore || 'accent') + (z.on ? ' is-on' : '')}
            style=${{ left: z.x + '%', top: z.y + '%', opacity: z.o, transform: 'translate(-50%,-50%) scale(' + z.s + ')' }} aria-hidden="true">${z.t != null ? z.t : a.t}</div>`; })}
      </div>
      <p key=${k} className="lp-cap" aria-live="polite"><span className="ll-tally">${k + 1} / ${passi.length}</span> ${inline(P.didascalia || '', 'c')}</p>
      <div className="ll-row lp-ctrl">
        <button className="ll-btn ll-btn--ghost lp-sq" disabled=${k === 0} onClick=${function () { setPlay(false); setK(k - 1); }} aria-label="Fotogramma precedente">←</button>
        <button className="ll-btn" onClick=${avvia}>${play ? 'Pausa' : k >= last ? 'Rivedi da capo' : k === 0 ? (p.pulsante || 'Avvia l’animazione') : 'Continua'}</button>
        <button className="ll-btn ll-btn--ghost lp-sq" disabled=${k >= last} onClick=${function () { setPlay(false); setK(k + 1); }} aria-label="Fotogramma successivo">→</button>
        <div className="lp-pips">${passi.map(function (x, i) { return html`<button key=${i} className=${'ll-dot' + (i < k ? ' is-seen' : '')} aria-current=${i === k ? 'step' : null} aria-label=${'Fotogramma ' + (i + 1)} onClick=${function () { setPlay(false); setK(i); }}></button>`; })}</div>
      </div>
    </div>`;
  });

  /* ---------- STRATI: livelli concentrici; si entra più a fondo con uno zoom ---------- */
  LL.blocco('strati', function (p) {
    var lv = p.livelli || [], n = lv.length, s = useState(-1), a = s[0], setA = s[1];
    useEffect(function () { if (a === n - 1 && n > 1) say(p.fine || 'Siamo arrivati al centro.'); }, [a]);
    return html`<div className="lp-layers">
      ${H(p)}
      <div className="lp-lay-g">
        <div className="lp-rings-w"><div className="lp-rings" style=${{ transform: 'scale(' + (a < 1 ? 1 : 1 + a * 0.16) + ')' }}>
          ${lv.map(function (l, i) { var size = 100 - i * (78 / Math.max(1, n - 1));
            return html`<button key=${i} className=${'lp-ring-b' + (i === a ? ' is-on' : '') + (a > -1 && i < a ? ' is-out' : '')} style=${{ width: size + '%', height: size + '%' }} aria-pressed=${i === a} onClick=${function () { setA(i); }}><span>${l.t}</span></button>`; })}
        </div></div>
        <div className="lp-lay-d" aria-live="polite">${a < 0
          ? html`<p className="ll-hint">${p.istruzione || 'Partite dal livello più esterno e scendete verso il centro.'}</p>`
          : html`<div key=${a} className="lp-lay-in"><small>Livello ${a + 1} di ${n}</small><b>${lv[a].t}</b>${md(lv[a].d, 'lp-p')}</div>`}</div>
      </div>
      <div className="ll-row">
        <button className="ll-btn" disabled=${a >= n - 1} onClick=${function () { setA(a + 1); }}>${a < 0 ? (p.pulsante || 'Entra nel primo livello') : 'Più a fondo'}</button>
        <button className="ll-btn ll-btn--ghost" disabled=${a <= 0} onClick=${function () { setA(a - 1); }}>Risali</button>
      </div>
    </div>`;
  });

  /* ---------- BILANCIA: argomenti sui due piatti; il peso lo discute la classe ---------- */
  LL.blocco('bilancia', function (p) {
    var g = p.argomenti || [], pi = p.piatti || ['A', 'B'];
    var s = useState(function () { return g.map(function () { return 0; }); }), v = s[0], setV = s[1], f = useState(null), foc = f[0], setFoc = f[1];
    var peso = [0, 0]; g.forEach(function (x, i) { peso[x.lato || 0] += v[i]; });
    var tilt = Math.max(-13, Math.min(13, (peso[1] - peso[0]) * 3.4));
    function tocca(i) { var c = v.slice(), x = g[i]; c[i] = p.libero ? (c[i] + 1) % 4 : (c[i] ? 0 : (x.peso || 1)); setV(c); setFoc(c[i] ? i : null); }
    var tutti = v.every(function (x) { return x > 0; });
    return html`<div className="lp-scale">
      ${H(p)}
      <div className="lp-beam-w" role="img" aria-label=${pi[0] + ': peso ' + peso[0] + '; ' + pi[1] + ': peso ' + peso[1]}>
        <div className="lp-beam" style=${{ transform: 'rotate(' + tilt + 'deg)' }}>
          ${[0, 1].map(function (l) { return html`<div key=${l} className=${'lp-pan lp-pan--' + l} style=${{ transform: 'rotate(' + (-tilt) + 'deg)' }}><b>${pi[l]}</b><span>${'●'.repeat(Math.min(peso[l], 12)) || '—'}</span></div>`; })}
        </div>
        <div className="lp-fulcrum"></div>
      </div>
      <p className="ll-hint">${p.istruzione || (p.libero ? 'Ogni tocco aggiunge peso (fino a 3), il quarto lo toglie. Il peso lo decide la classe, motivandolo.' : 'Tocca un argomento per metterlo sul suo piatto.')}</p>
      <div className="lp-args">${g.map(function (x, i) { return html`<button key=${i} className=${'lp-arg lp-arg--' + (x.lato || 0)} aria-pressed=${v[i] > 0} onClick=${function () { tocca(i); }}><small>${pi[x.lato || 0]}${v[i] ? ' · peso ' + v[i] : ''}</small>${inline(x.t, 'a' + i)}</button>`; })}</div>
      <div aria-live="polite">${foc !== null && g[foc].nota && html`<p key=${foc} className="ll-gloss">${inline(g[foc].nota, 'n')}</p>`}</div>
      ${tutti && p.domanda && html`<p className="ll-gloss">${inline(p.domanda, 'q')}</p>`}
      <div className="ll-row"><button className="ll-link" onClick=${function () { setV(g.map(function () { return 0; })); setFoc(null); }}>Svuota la bilancia</button></div>
    </div>`;
  });

  /* ---------- STIMA: la classe stima un valore, poi si svela quello documentato ---------- */
  LL.blocco('stima', function (p) {
    var min = +p.min, max = +p.max, st = +p.passo || 1, s = useState(Math.round((min + (max - min) / 2) / st) * st), v = s[0], setV = s[1], r = useState(false), rev = r[0], setRev = r[1];
    function pct(x) { return Math.max(0, Math.min(100, (x - min) / (max - min) * 100)); }
    var vicino = Math.abs(v - p.valore) <= (p.tolleranza != null ? p.tolleranza : (max - min) * 0.1);
    function svela() { setRev(true); if (vicino) { cheer(); festa(); } else say(p.battuta || 'Lontani, ma è proprio la distanza che ci interessa.'); }
    function step(x) { if (!rev) setV(Math.max(min, Math.min(max, +(v + x).toFixed(6)))); }
    return html`<div className="lp-est">
      <span className="la-meta">${p.etichetta || 'Stima della classe'}</span>
      <h3 className="la-q">${p.q}</h3>
      <div className="lp-est-v" aria-live="polite"><b>${num(v)}</b> ${p.unita || ''}</div>
      <div className="lp-est-t">
        <input type="range" min=${min} max=${max} step=${st} value=${v} disabled=${rev} onChange=${function (e) { setV(+e.target.value); }} aria-label=${'Stima della classe' + (p.unita ? ', in ' + p.unita : '')} />
        ${rev && html`<span className="lp-est-true" style=${{ left: pct(p.valore) + '%' }}><i></i><em>${num(p.valore)} ${p.unita || ''}</em></span>`}
      </div>
      <div className="lp-est-s"><span>${num(min)}</span><span>${num(max)}</span></div>
      <div className="ll-row">
        ${!rev ? [html`<button key="m" className="ll-btn ll-btn--ghost lp-sq" onClick=${function () { step(-st); }} aria-label="Diminuisci">−</button>`,
                  html`<button key="p" className="ll-btn ll-btn--ghost lp-sq" onClick=${function () { step(st); }} aria-label="Aumenta">+</button>`,
                  html`<button key="s" className="ll-btn" onClick=${svela}>${p.pulsante || 'Svela il dato'}</button>`]
               : html`<button className="ll-link" onClick=${function () { setRev(false); }}>Stima di nuovo</button>`}
      </div>
      <div aria-live="polite">${rev && html`<p className=${'ll-why ' + (vicino ? 'is-ok' : 'is-ko')}><strong>${vicino ? 'Ci siete. ' : 'Scarto di ' + num(Math.abs(v - p.valore)) + ' ' + (p.unita || '') + '. '}</strong>${inline(p.why || '', 'w')}${p.fonte ? html` <small className="lp-src">Fonte: ${p.fonte}</small>` : ''}</p>`}</div>
    </div>`;
  });

  /* ---------- LENTE: punti da esplorare su un'immagine o uno schema; modalità «trova il dettaglio» ---------- */
  LL.blocco('lente', function (p) {
    var pts = p.punti || [], tr = p.trova, s = useState(null), a = s[0], setA = s[1], f = useState(null), pick = f[0], setPick = f[1];
    var risolto = !tr || pick === tr.ok;
    function tocca(i) {
      if (!risolto) { setPick(i); if (i === tr.ok) { cheer(); festa(); setA(i); } else oops(); return; }
      setA(a === i ? null : i);
    }
    return html`<div className="lp-lens">
      ${H(p)}
      ${tr && html`<p className="lp-lens-q"><span className="la-meta">Trova il dettaglio</span> ${inline(tr.q, 'q')}</p>`}
      <figure className="lp-lens-f">
        <div className="lp-lens-s" style=${{ aspectRatio: String(p.rapporto || 1.618) }}>
          ${p.src ? html`<img src=${p.src} alt=${p.alt || ''} />` : html`<div className="lp-ph"><span>${p.alt || 'Immagine da incorporare'}</span></div>`}
          ${pts.map(function (x, i) { var cls = 'lp-pt' + (a === i ? ' is-on' : '') + (!risolto && pick === i ? ' is-wrong' : '') + (tr && risolto && i === tr.ok ? ' is-key' : '');
            return html`<button key=${i} className=${cls} style=${{ left: x.x + '%', top: x.y + '%' }} aria-pressed=${a === i} aria-label=${risolto ? x.t : 'Punto ' + (i + 1)} onClick=${function () { tocca(i); }}>${i + 1}</button>`; })}
        </div>
        ${(p.didascalia || p.fonte) && html`<figcaption>${inline(p.didascalia || '', 'f')}${p.fonte ? ' — ' + p.fonte : ''}</figcaption>`}
      </figure>
      <div aria-live="polite">
        ${!risolto && pick !== null && html`<p key=${'w' + pick} className="ll-why is-ko"><strong>Non qui. </strong>${inline((pts[pick] && pts[pick].no) || tr.indizio || 'Guardate di nuovo: che cosa risponde davvero alla domanda?', 'n')}</p>`}
        ${tr && risolto && pick === tr.ok && a === tr.ok && html`<p className="ll-why is-ok"><strong>Trovato. </strong>${inline(tr.why || '', 'y')}</p>`}
        ${a !== null && risolto && !(tr && a === tr.ok && pick === tr.ok) && html`<div key=${a} className="lp-lens-d"><b>${a + 1} · ${pts[a].t}</b>${md(pts[a].d, 'lp-p')}</div>`}
        ${risolto && a === null && html`<p className="ll-hint">${p.istruzione || 'Tocca un numero per leggere il dettaglio.'}</p>`}
      </div>
    </div>`;
  });

  /* ---------- LEGGI: lettura ravvicinata di una fonte; frasi che si aprono, oppure «trova la frase» ----------
     Marcatura nel testo: [[frase::glossa]] · [[!frase::glossa]] è la frase da trovare. */
  function segmenti(t) {
    var out = [], re = /\[\[(!?)([^\]]+?)::([^\]]*?)\]\]/g, last = 0, m;
    while ((m = re.exec(t))) { if (m.index > last) out.push({ t: t.slice(last, m.index) }); out.push({ t: m[2], g: m[3], ok: m[1] === '!' }); last = m.index + m[0].length; }
    if (last < t.length) out.push({ t: t.slice(last) });
    return out;
  }
  LL.blocco('leggi', function (p) {
    var paras = useMemo(function () { var n = 0; return String(p.testo || '').split(/\n\s*\n/).map(function (x) { return segmenti(x).map(function (sg) { if (sg.g != null) sg.i = n++; return sg; }); }); }, [p.testo]);
    var tutti = [].concat.apply([], paras).filter(function (x) { return x.g != null; });
    var s = useState(null), a = s[0], setA = s[1], f = useState([]), tent = f[0], setTent = f[1];
    var trova = !!p.q, risolto = !trova || tent.some(function (i) { return tutti[i] && tutti[i].ok; });
    function tocca(i) {
      setA(i);
      if (trova && !risolto) { setTent(tent.concat(i)); if (tutti[i].ok) { cheer(); festa(); } else oops(); }
    }
    var sel = a !== null ? tutti[a] : null;
    return html`<div className="lp-read">
      ${H(p)}
      ${trova && html`<p className="lp-lens-q"><span className="la-meta">Trova nel testo</span> ${inline(p.q, 'q')}</p>`}
      <blockquote className="lp-read-t">${paras.map(function (par, k) { return html`<p key=${k}>${par.map(function (sg, j) {
        if (sg.g == null) return html`<span key=${j}>${inline(sg.t, k + '-' + j)}</span>`;
        var cls = 'lp-seg' + (a === sg.i ? ' is-on' : '') + (trova && tent.indexOf(sg.i) > -1 ? (sg.ok ? ' is-right' : ' is-wrong') : '') + (trova && !risolto ? ' is-hunt' : '');
        return html`<button key=${j} className=${cls} aria-pressed=${a === sg.i} onClick=${function () { tocca(sg.i); }}>${inline(sg.t, 's' + j)}</button>`;
      })}</p>`; })}</blockquote>
      ${p.fonte && html`<p className="lp-read-f">${p.fonte}</p>`}
      <div aria-live="polite">${sel
        ? html`<p key=${a} className=${trova && tent.indexOf(a) > -1 && tent[tent.length - 1] === a ? 'll-why ' + (sel.ok ? 'is-ok' : 'is-ko') : 'll-gloss'}>${trova && tent[tent.length - 1] === a ? html`<strong>${sel.ok ? 'Proprio questa. ' : 'Non è questa. '}</strong>` : ''}${inline(sel.g, 'g')}</p>`
        : html`<p className="ll-hint" style=${{ marginTop: 13 }}>${p.istruzione || (trova ? 'Le parti sottolineate sono candidate: una sola risponde alla domanda.' : 'Tocca le parti sottolineate per aprirne il senso.')}</p>`}</div>
    </div>`;
  });

  /* ---------- ORDINA: rimettere in ordine passaggi di un ragionamento, fasi o eventi ---------- */
  LL.blocco('ordina', function (p) {
    var voci = p.voci || [], s = useState(function () { return mescola(voci.length, (p.q || '').length); }), ord = s[0], setOrd = s[1], c = useState(false), chk = c[0], setChk = c[1];
    function sposta(i, dlt) { var j = i + dlt; if (j < 0 || j >= ord.length) return; var o = ord.slice(), t = o[i]; o[i] = o[j]; o[j] = t; setOrd(o); setChk(false); }
    var giusti = ord.filter(function (v, i) { return v === i; }).length, tutto = giusti === voci.length;
    function controlla() { setChk(true); if (giusti === voci.length) { cheer(); festa(); } else oops(); }
    return html`<div className="lp-order">
      ${p.q && html`<h3 className="ll-block-h">${inline(p.q, 'q')}</h3>`}
      <ol className="lp-ord-l">${ord.map(function (v, i) { var x = voci[v], cls = 'lp-ord-i' + (chk ? (v === i ? ' is-right' : ' is-wrong') : '');
        return html`<li key=${v} className=${cls}>
          <span className="lp-ord-n">${i + 1}</span><span className="lp-ord-t">${inline(typeof x === 'string' ? x : x.t, 'o' + v)}${typeof x !== 'string' && x.y && html`<small>${x.y}</small>`}</span>
          <span className="lp-ord-b"><button className="ll-icon" disabled=${i === 0} onClick=${function () { sposta(i, -1); }} aria-label=${'Sposta su: ' + plain(typeof x === 'string' ? x : x.t)}>↑</button><button className="ll-icon" disabled=${i === ord.length - 1} onClick=${function () { sposta(i, 1); }} aria-label=${'Sposta giù: ' + plain(typeof x === 'string' ? x : x.t)}>↓</button></span>
        </li>`; })}</ol>
      <div className="ll-row">
        <button className="ll-btn" onClick=${controlla}>Controlla l’ordine</button>
        ${chk && !tutto && html`<button className="ll-btn ll-btn--ghost" onClick=${function () { setOrd(voci.map(function (_, i) { return i; })); setChk(true); }}>Mostra l’ordine giusto</button>`}
        ${chk && html`<span className="ll-tally" aria-live="polite">${giusti} / ${voci.length} al posto giusto</span>`}
      </div>
      ${chk && tutto && p.why && html`<p className="ll-why is-ok">${inline(p.why, 'w')}</p>`}
    </div>`;
  });

  /* ---------- BIVIO: un caso, più scelte, conseguenze; poi il criterio della fonte ---------- */
  LL.blocco('bivio', function (p) {
    var sc = p.scelte || [], s = useState(null), a = s[0], setA = s[1], v = useState([]), visti = v[0], setVisti = v[1], c = useState(false), fine = c[0], setFine = c[1];
    function scegli(i) { setA(i); if (visti.indexOf(i) < 0) setVisti(visti.concat(i)); }
    return html`<div className="lp-fork">
      <span className="la-meta">${p.etichetta || 'Un caso, più strade'}</span>
      <div className="lp-fork-c">${md(p.caso, 'lp-fork-p')}</div>
      <div className="lp-fork-s">${sc.map(function (x, i) { return html`<button key=${i} className=${'la-choice' + (a === i ? ' is-pick' : '') + (visti.indexOf(i) > -1 && a !== i ? ' is-seen' : '')} aria-pressed=${a === i} onClick=${function () { scegli(i); }}><span className="la-key">${'ABCDE'[i]}</span>${inline(x.t, 'c' + i)}</button>`; })}</div>
      <div aria-live="polite">${a !== null && html`<div key=${a} className=${'lp-fork-e lp-tono-' + (sc[a].tono || 'neutro')}><small>Se scegliete ${'ABCDE'[a]}</small>${md(sc[a].esito, 'lp-p')}</div>`}</div>
      <div className="ll-row">
        ${visti.length > 0 && visti.length < sc.length && html`<span className="ll-hint" style=${{ margin: 0 }}>Provate anche un’altra strada: ${sc.length - visti.length} da esplorare.</span>`}
        ${p.chiusura && visti.length > 0 && !fine && html`<button className="ll-btn ll-btn--solenne" onClick=${function () { setFine(true); say(p.battuta || 'Ora confrontiamo con il criterio.'); }}>${p.pulsante || 'Che cosa ne dice la fonte?'}</button>`}
      </div>
      ${fine && html`<div className="ll-gloss">${md(p.chiusura, 'lp-p')}</div>`}
    </div>`;
  });

  /* ---------- VARIANTI: il docente sceglie, in aula, fra attività alternative di pari durata ---------- */
  LL.blocco('varianti', function (p, ctx) {
    var op = p.opzioni || [], s = useState(p.scelta == null ? null : p.scelta), a = s[0], setA = s[1];
    if (a === null || !op[a]) return html`<div className="lp-var">
      ${H(p)}
      <p className="ll-hint">${p.istruzione || 'Una sola attività, a scelta: tutte portano alla stessa domanda.'}</p>
      <div className="lp-var-g">${op.map(function (o, i) { return html`<button key=${i} className="lp-var-c" onClick=${function () { setA(i); }}>
        <span className="lp-var-h"><b>${o.nome}</b>${o.durata && html`<span className="lp-pill">${o.durata}</span>`}</span>
        ${(o.descrizione || o.obiettivo) && html`<span className="lp-var-o">${inline(o.descrizione || o.obiettivo, 'o' + i)}</span>`}
      </button>`; })}</div>
    </div>`;
    var o = op[a];
    return html`<div className="lp-var is-picked">
      <div className="lp-var-bar"><span><small className="la-meta">Attività scelta</small><b>${o.nome}</b>${o.durata && html`<span className="lp-pill">${o.durata}</span>`}</span><button className="ll-link" onClick=${function () { setA(null); }}>Cambia attività</button></div>
      <div className="ll-blocks">${(o.blocchi || []).map(function (b, i) { return html`<${Sub} key=${a + '-' + i} b=${b} ctx=${ctx} />`; })}</div>
    </div>`;
  });

  /* ---------- CONSEGNA: lavoro di gruppo o a coppie con tempo, passi e prodotto atteso ---------- */
  LL.blocco('consegna', function (p) {
    var tot = Math.round((+p.minuti || 5) * 60), s = useState(tot), rem = s[0], setRem = s[1], r = useState(false), run = r[0], setRun = r[1];
    useEffect(function () { if (!run) return; if (rem <= 0) { setRun(false); LL.bip && LL.bip(); say(p.fine || 'Tempo! Un portavoce per gruppo.'); return; } var t = setTimeout(function () { setRem(rem - 1); }, 1000); return function () { clearTimeout(t); }; }, [run, rem]);
    var mm = Math.floor(Math.max(0, rem) / 60), ss = Math.max(0, rem) % 60, frac = Math.max(0, rem) / Math.max(1, tot);
    var fase = p.passi && p.passi.length ? Math.min(p.passi.length - 1, Math.floor((1 - frac) * p.passi.length)) : -1;
    return html`<div className="lp-task">
      <div className="lp-task-h">
        <div>${H(p)}${p.modalita && html`<span className="lp-pill">${p.modalita}</span>`}</div>
        <div className=${'lp-clock' + (rem <= 30 && rem > 0 ? ' is-late' : '') + (rem <= 0 ? ' is-over' : '')} role="timer" aria-live="off">
          <svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="44" className="lp-clock-bg" /><circle cx="50" cy="50" r="44" className="lp-clock-fg" pathLength="1" style=${{ strokeDashoffset: String(1 - frac) }} /></svg>
          <b>${mm}:${String(ss).padStart(2, '0')}</b>
        </div>
      </div>
      ${p.passi && html`<ol className="lp-task-p">${p.passi.map(function (x, i) { return html`<li key=${i} className=${run || rem < tot ? (i < fase ? 'is-done' : i === fase ? 'is-now' : '') : ''}>${inline(x, 'p' + i)}</li>`; })}</ol>`}
      ${p.ruoli && html`<div className="lp-roles">${p.ruoli.map(function (x, i) { return html`<span key=${i} className="lp-pill">${x}</span>`; })}</div>`}
      ${p.prodotto && html`<p className="ll-gloss"><strong>Alla fine: </strong>${inline(p.prodotto, 'pr')}</p>`}
      <div className="ll-row">
        <button className="ll-btn" onClick=${function () { if (rem <= 0) setRem(tot); setRun(!run); }}>${run ? 'Pausa' : rem < tot && rem > 0 ? 'Riprendi' : 'Avvia il tempo'}</button>
        <button className="ll-btn ll-btn--ghost" onClick=${function () { setRem(rem + 60); }}>+1 minuto</button>
        <button className="ll-link" onClick=${function () { setRun(false); setRem(tot); }}>Azzera</button>
      </div>
    </div>`;
  });

  /* ---------- AGGANCIO: rimando breve, chiuso di default (all'oggi, a un prerequisito, a un approfondimento) ---------- */
  LL.blocco('aggancio', function (p) {
    var s = useState(false), on = s[0], set = s[1];
    return html`<div className=${'lp-hook' + (on ? ' is-open' : '')}>
      <button className="lp-hook-b" aria-expanded=${on} onClick=${function () { set(!on); }}>
        <span className="lp-hook-k">${p.etichetta || 'Oggi'}</span><span className="lp-hook-t">${inline(p.titolo || '', 't')}</span><i aria-hidden="true">${on ? '−' : '+'}</i>
      </button>
      ${on && html`<div className="lp-hook-c">${md(p.t, 'lp-p')}${p.fonte && html`<small className="lp-src">${p.fonte}</small>`}</div>`}
    </div>`;
  });

  LL.plus = '2026-10-02';
})();
