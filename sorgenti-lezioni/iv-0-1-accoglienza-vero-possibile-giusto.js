
/* Lab IRC — Lezione interattiva in React 18 + htm (nessuna compilazione).
   Espone: window.html (template JSX-like), window.LabLezione = { registra, avvia, md, festa, blocchi }.
   Il file della lezione definisce window.LEZIONE e può registrare componenti propri. */
(function () {
  var R = window.React, w = window, d = document;
  var html = w.html = w.htm.bind(R.createElement);
  var useState = R.useState, useEffect = R.useEffect, useRef = R.useRef, useMemo = R.useMemo;
  var say = function (t) { // parla la mascotte visibile: quella della scena, se c'è, altrimenti quella in basso a destra
    var m = d.querySelector('.ll-head-m lab-mascotte, .ll-masc lab-mascotte');
    if (m && m.bubble) m.bubble(t); else if (w.LabArtefatto) w.LabArtefatto.say(t);
  };
  var cheer = function () { w.LabArtefatto && w.LabArtefatto.cheer(); };
  var oops = function () { w.LabArtefatto && w.LabArtefatto.oops(); };
  var reduce = w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var custom = {};
  var anno = function () { return +(d.body.getAttribute('data-anno') || 0); };
  var nomeMascotte = function () { var I = w.LabMascotte && w.LabMascotte.INFO; return I && I[anno()] ? I[anno()].nome : 'La mascotte'; };
  function Mascotte(p) { // web component <lab-mascotte> del design system (2D, 144×144, aureola d'oro)
    return anno() ? html`<lab-mascotte anno=${String(anno())} size=${String(p.size || 89)} aureola=${p.aureola === false ? 'false' : null} class=${p.className || null}></lab-mascotte>` : null;
  }
  var LOGO = '<svg viewBox="0 0 96 96" aria-hidden="true"><defs><linearGradient id="llLogo" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8B5CF6"/><stop offset="1" stop-color="#22D3EE"/></linearGradient></defs><rect x="4" y="4" width="88" height="88" rx="24" fill="url(#llLogo)"/><text x="50%" y="52%" dominant-baseline="central" text-anchor="middle" font-family="Cormorant Garamond, Georgia, serif" font-weight="600" font-size="56" fill="#fff">L</text><path d="M70 22 l2.4 5.6 5.6 2.4 -5.6 2.4 -2.4 5.6 -2.4 -5.6 -5.6 -2.4 5.6 -2.4 Z" fill="#FBBF24"/></svg>';

  /* ---------- testo: **grassetto**, *corsivo*, paragrafi separati da riga vuota ---------- */
  function inline(s, key) {
    var out = [], re = /(\*\*[^*]+\*\*|\*[^*]+\*)/g, last = 0, m, i = 0;
    s = String(s == null ? '' : s);
    while ((m = re.exec(s))) {
      if (m.index > last) out.push(s.slice(last, m.index));
      var t = m[0];
      out.push(t.slice(0, 2) === '**' ? html`<strong key=${key + '-' + i++}>${t.slice(2, -2)}</strong>` : html`<em key=${key + '-' + i++}>${t.slice(1, -1)}</em>`);
      last = m.index + t.length;
    }
    if (last < s.length) out.push(s.slice(last));
    return out;
  }
  function md(s, cls) {
    return String(s || '').split(/\n\s*\n/).filter(Boolean).map(function (p, i) { return html`<p key=${i} className=${cls || 'll-p'}>${inline(p.trim(), i)}</p>`; });
  }
  function plain(s) { return String(s || '').replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\*([^*]+)\*/g, '$1'); }
  function titleNode(t) { // «Il *cosmo* esaurisce» → <em> sulla parola evidenziata
    return inline(t, 't').map(function (n) { return n && n.type === 'strong' ? html`<em key=${n.key}>${n.props.children}</em>` : n; });
  }

  /* ---------- festa discreta ---------- */
  function festa() {
    if (reduce) return;
    var box = d.createElement('div'); box.className = 'll-party'; box.setAttribute('aria-hidden', 'true');
    var cols = ['var(--lab-oro)', 'var(--la-accent)', 'var(--lab-ciano)', 'var(--lab-rosa)'];
    for (var i = 0; i < 34; i++) {
      var p = d.createElement('i');
      p.style.left = (Math.random() * 100) + 'vw'; p.style.background = cols[i % cols.length];
      p.style.setProperty('--dx', ((Math.random() - .5) * 233).toFixed(0) + 'px');
      p.style.setProperty('--r', ((Math.random() - .5) * 987).toFixed(0) + 'deg');
      p.style.animationDelay = (Math.random() * 377).toFixed(0) + 'ms';
      box.appendChild(p);
    }
    d.body.appendChild(box); setTimeout(function () { box.remove(); }, 2400);
  }

  /* =================== BLOCCHI =================== */
  var B = {};

  B.testo = function (p) { return html`<div>${md(p.t)}</div>`; };

  B.rivela = function (p) {
    var n = useState(p.iniziali || 1), k = n[0], setK = n[1], passi = p.passi || [];
    return html`<div>
      ${p.titolo && html`<h3 className="ll-block-h">${p.titolo}</h3>`}
      <ol className="ll-steps" aria-live="polite">
        ${passi.slice(0, k).map(function (s, i) { return html`<li key=${i} className="ll-step"><div><b>${s.titolo}</b>${s.testo && html`<p>${inline(s.testo, i)}</p>`}</div></li>`; })}
      </ol>
      <div className="ll-row">
        ${k < passi.length
          ? html`<button className="ll-btn" onClick=${function () { setK(k + 1); if (k + 1 === passi.length) say(p.fine || 'Ecco il quadro completo.'); }}>${p.pulsante || 'Mostra il passo successivo'}</button>`
          : html`<button className="ll-btn ll-btn--ghost" onClick=${function () { setK(p.iniziali || 1); }}>Riparti dal primo passo</button>`}
        <span className="ll-tally">${k} / ${passi.length}</span>
      </div>
    </div>`;
  };

  B.tappe = function (p) {
    var voci = p.voci || [], s = useState(p.aperta == null ? 0 : p.aperta), a = s[0], setA = s[1], v = voci[a];
    function key(e) { if (e.key === 'ArrowRight') { e.stopPropagation(); setA(Math.min(voci.length - 1, a + 1)); } if (e.key === 'ArrowLeft') { e.stopPropagation(); setA(Math.max(0, a - 1)); } }
    return html`<div>
      ${p.titolo && html`<h3 className="ll-block-h">${p.titolo}</h3>`}
      <div className="ll-tl" role="group" aria-label=${p.titolo || 'Linea del tempo'} onKeyDown=${key}>
        ${voci.map(function (x, i) { return html`<button key=${i} className="ll-tl-b" aria-pressed=${i === a} onClick=${function () { setA(i); }}><i></i><span>${x.data}</span>${x.breve || ''}</button>`; })}
      </div>
      ${v && html`<div key=${a} className="ll-tl-card" aria-live="polite"><small>${v.data}</small><b>${v.titolo}</b>${v.testo && html`<p>${inline(v.testo, a)}</p>`}</div>`}
    </div>`;
  };

  B.confronto = function (p) {
    var righe = p.righe || [], s = useState(p.tutto ? righe.length : 0), k = s[0], setK = s[1];
    return html`<div>
      ${p.titolo && html`<h3 className="ll-block-h">${p.titolo}</h3>`}
      <div className="ll-cmp" aria-live="polite">
        <div className="ll-cmp-h"></div><div className="ll-cmp-h">${p.a}</div><div className="ll-cmp-h">${p.b}</div>
        ${righe.map(function (r, i) {
          var on = i < k, cls = on ? (i === k - 1 ? 'is-new' : '') : 'is-hidden';
          return html`<${R.Fragment} key=${i}>
            <div className="ll-cmp-k">${r.criterio || ''}</div>
            <div className=${cls} aria-hidden=${!on}>${on ? inline(r.a, 'a' + i) : '·'}</div>
            <div className=${cls} aria-hidden=${!on}>${on ? inline(r.b, 'b' + i) : '·'}</div>
          </${R.Fragment}>`;
        })}
      </div>
      <div className="ll-row">
        ${k < righe.length
          ? html`<button className="ll-btn" onClick=${function () { setK(k + 1); }}>${k ? 'Confronta ancora' : (p.pulsante || 'Inizia il confronto')}</button>`
          : html`<button className="ll-btn ll-btn--ghost" onClick=${function () { setK(0); }}>Copri di nuovo</button>`}
        ${p.domanda && k === righe.length && html`<p className="ll-hint" style=${{ margin: 0 }}>${inline(p.domanda, 'q')}</p>`}
      </div>
    </div>`;
  };

  function Flip(props) {
    var s = useState(false), on = s[0], set = s[1], c = props.c;
    return html`<button className="ll-flip" aria-pressed=${on} onClick=${function () { set(!on); }}>
      <span className="ll-flip-in">
        <span className="ll-face"><small>${c.etichetta || 'Tocca per girare'}</small><b>${c.fronte}</b></span>
        <span className="ll-face ll-face--back" aria-hidden=${!on}><p>${inline(c.retro, 'r')}</p></span>
      </span>
    </button>`;
  }
  B.carte = function (p) {
    return html`<div>${p.titolo && html`<h3 className="ll-block-h">${p.titolo}</h3>`}
      <div className="ll-cards">${(p.carte || []).map(function (c, i) { return html`<${Flip} key=${i} c=${c} />`; })}</div></div>`;
  };

  B.citazione = function (p) {
    var s = useState(false), on = s[0], set = s[1];
    return html`<figure className="ll-quote">
      <blockquote>${inline(p.testo, 'c')}</blockquote>
      <figcaption>${p.fonte}</figcaption>
      ${p.commento && (on ? html`<p className="ll-gloss">${inline(p.commento, 'g')}</p>` : html`<div className="ll-row"><button className="ll-link" onClick=${function () { set(true); }}>${p.pulsante || 'Che cosa ci sta dicendo?'}</button></div>`)}
    </figure>`;
  };

  B.domanda = function (p) {
    var n = (p.opzioni || []).length, s = useState(function () { return Array(n).fill(0); }), v = s[0], setV = s[1];
    var sh = useState(false), show = sh[0], setShow = sh[1], tot = v.reduce(function (a, b) { return a + b; }, 0);
    function add(i, x) { var c = v.slice(); c[i] = Math.max(0, c[i] + x); setV(c); }
    return html`<div>
      <h3 className="ll-block-h">${p.q}</h3>
      <p className="ll-hint">${p.istruzione || 'Alzata di mano: il docente tocca una risposta per ogni voto. Nessun nome, nessun punteggio.'}</p>
      <div className="ll-poll">${p.opzioni.map(function (o, i) {
        var pct = tot ? Math.round(v[i] / tot * 100) : 0;
        return html`<div key=${i} className="ll-poll-r">
          <button className="ll-poll-b" onClick=${function () { add(i, 1); }} aria-label=${o + ': aggiungi un voto'}><i style=${{ width: (show ? pct : 0) + '%' }}></i><span>${o}</span><b>${show ? pct + '%' : ''}</b></button>
          <button className="ll-poll-m" onClick=${function () { add(i, -1); }} aria-label=${'Togli un voto a ' + o}>−</button></div>`;
      })}</div>
      <div className="ll-row">
        <button className="ll-btn" onClick=${function () { setShow(!show); if (!show && tot) festa(); }}>${show ? 'Nascondi i risultati' : 'Mostra i risultati'}</button>
        <button className="ll-btn ll-btn--ghost" onClick=${function () { setV(Array(n).fill(0)); setShow(false); }}>Azzera</button>
        <span className="ll-tally" aria-live="polite">${tot} ${tot === 1 ? 'voto' : 'voti'}</span>
      </div>
      ${show && p.dibattito && html`<p className="ll-gloss">${inline(p.dibattito, 'd')}</p>`}
    </div>`;
  };

  B.verifica = function (p) {
    var s = useState(null), pick = s[0], setPick = s[1], ok = pick === p.ok;
    function choose(i) { if (pick !== null) return; setPick(i); if (i === p.ok) { cheer(); festa(); } else oops(); }
    return html`<div className="ll-check">
      <span className="la-meta">${p.etichetta || 'Verifica lampo'}</span>
      <h3 className="la-q">${p.q}</h3>
      <div className="la-choices">${p.opzioni.map(function (o, i) {
        var cls = 'la-choice' + (pick === null ? '' : i === p.ok ? ' is-right' : i === pick ? ' is-wrong' : ' is-dim');
        return html`<button key=${i} className=${cls} disabled=${pick !== null} onClick=${function () { choose(i); }}><span className="la-key">${'ABCDE'[i]}</span>${o}</button>`;
      })}</div>
      <div aria-live="polite">${pick !== null && html`<p className=${'ll-why ' + (ok ? 'is-ok' : 'is-ko')}><strong>${ok ? 'Esatto. ' : 'Non proprio. '}</strong>${inline(p.why, 'w')}</p>`}</div>
      ${pick !== null && html`<div className="ll-row"><button className="ll-link" onClick=${function () { setPick(null); }}>Riprova la domanda</button></div>`}
    </div>`;
  };

  B.smista = function (p) {
    var voci = p.voci || [], s = useState(0), i = s[0], setI = s[1], a = useState(null), ans = a[0], setAns = a[1], g = useState(0), good = g[0], setGood = g[1];
    var v = voci[i];
    function choose(c) { if (ans !== null) return; setAns(c); if (c === v.c) { setGood(good + 1); cheer(); } else oops(); }
    function next() { setAns(null); setI(i + 1); if (i + 1 === voci.length) festa(); }
    if (!v) return html`<div className="ll-sort"><span className="ll-tally">${p.titolo || 'Smista'}</span>
      <p className="ll-sort-item">${good} su ${voci.length} al primo colpo.</p>${md(p.chiusura || 'Rileggete insieme gli elementi incerti: che cosa li rendeva difficili da collocare?')}
      <button className="ll-btn ll-btn--ghost" onClick=${function () { setI(0); setGood(0); setAns(null); }}>Ricomincia</button></div>`;
    return html`<div className="ll-sort">
      <div className="la-row"><span className="ll-tally">${p.titolo || 'Dove lo metti?'}</span><span className="ll-tally">${i + 1} / ${voci.length}</span></div>
      <p key=${i} className="ll-sort-item is-in">${v.t}</p>
      <div className="ll-bins">${p.categorie.map(function (c, k) {
        var cls = 'll-bin' + (ans === null ? '' : k === v.c ? ' is-right' : k === ans ? ' is-wrong' : '');
        return html`<button key=${k} className=${cls} disabled=${ans !== null && k !== v.c && k !== ans} onClick=${function () { choose(k); }}>${c}</button>`;
      })}</div>
      <div aria-live="polite">${ans !== null && html`<p className=${'ll-why ' + (ans === v.c ? 'is-ok' : 'is-ko')}>${inline(v.why || '', 'w')}</p>`}</div>
      ${ans !== null && html`<div className="ll-row"><button className="ll-btn" onClick=${next}>${i + 1 < voci.length ? 'Prossimo' : 'Vedi il risultato'}</button></div>`}
    </div>`;
  };

  B.mappa = function (p) {
    var nodi = p.nodi || [], s = useState(null), a = s[0], setA = s[1];
    var pos = nodi.map(function (_, i) { var t = -Math.PI / 2 + i * 2 * Math.PI / nodi.length; return [50 + 37 * Math.cos(t), 50 + 38 * Math.sin(t)]; });
    return html`<div>
      ${p.titolo && html`<h3 className="ll-block-h">${p.titolo}</h3>`}
      <div className="ll-map">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${pos.map(function (q, i) { return html`<line key=${i} x1="50" y1="50" x2=${q[0]} y2=${q[1]} className=${a === i ? 'is-on' : ''} vectorEffect="non-scaling-stroke" />`; })}</svg>
        <div className="ll-map-c" style=${{ left: '50%', top: '50%' }}>${p.centro}</div>
        ${nodi.map(function (n, i) { return html`<button key=${i} className="ll-map-n" style=${{ left: pos[i][0] + '%', top: pos[i][1] + '%' }} aria-pressed=${a === i} onClick=${function () { setA(a === i ? null : i); }}>${n.t}</button>`; })}
      </div>
      <div aria-live="polite">${a !== null ? html`<p key=${a} className="ll-map-d"><b>${nodi[a].t}. </b>${inline(nodi[a].d, 'm')}</p>` : html`<p className="ll-hint" style=${{ marginTop: 13 }}>${p.istruzione || 'Tocca un concetto per vedere come si lega al centro.'}</p>`}</div>
    </div>`;
  };

  B.parola = function (p) {
    var s = useState(false), on = s[0], set = s[1], radice = (p.radice || '').toLowerCase();
    var letters = p.parola.split(''), start = radice ? p.parola.toLowerCase().indexOf(radice) : -1;
    return html`<div className=${'ll-word' + (on ? ' is-open' : '')}>
      <button className="ll-word-w" aria-expanded=${on} onClick=${function () { set(!on); if (!on) say(p.battuta || 'Le parole custodiscono una storia.'); }}>
        ${letters.map(function (ch, i) { return html`<span key=${i} className=${start > -1 && i >= start && i < start + radice.length ? 'is-root' : ''} style=${{ transitionDelay: (i * 34) + 'ms' }}>${ch}</span>`; })}
      </button>
      <div className="ll-word-info" aria-live="polite">
        <small>${on ? (p.origine || 'Origine') : 'Tocca la parola'}</small>
        ${on && md(p.significato)}
      </div>
    </div>`;
  };

  B.immagine = function (p) {
    return html`<figure className="ll-fig"><img src=${p.src} alt=${p.alt || ''} loading="lazy" /><figcaption>${inline(p.didascalia || '', 'f')}${p.fonte ? ' — ' + p.fonte : ''}</figcaption></figure>`;
  };

  B.nota = function (p) { // callout ambra del design system (Nota)
    return html`<div className="ll-nota" role="note">${p.icona !== '' && html`<span className="ll-nota-i" aria-hidden="true">${p.icona || '💡'}</span>`}<div>${md(p.t, 'll-nota-p')}</div></div>`;
  };

  B.mascotte = function (p) { // la mascotte dell'anno interviene con una battuta o una domanda
    var s = useState(!p.nascosta), on = s[0], set = s[1];
    return html`<div className=${'ll-masc' + (on ? ' is-on' : '')}>
      <${Mascotte} size=${89} />
      <div className="ll-masc-b">
        <small>${nomeMascotte()} ${p.etichetta || 'dice'}</small>
        ${on ? html`<p>${inline(p.t, 'm')}</p>` : html`<button className="ll-link" onClick=${function () { set(true); }}>${p.pulsante || 'Ascolta'}</button>`}
      </div>
    </div>`;
  };

  B.gioco = function (p, ctx) {
    return html`<div className="ll-play"><div><b>${p.titolo || 'Pausa gioco'}</b><p>${p.testo || ''}</p></div>
      <button className="ll-btn" onClick=${function () { ctx.gioca(p.id); }}>${p.pulsante || 'Si gioca'}</button></div>`;
  };

  B.custom = function (p, ctx) {
    var C = custom[p.nome];
    return C ? html`<${C} ...${p.props || {}} ctx=${ctx} />` : html`<p className="ll-hint">Componente «${p.nome}» non registrato.</p>`;
  };

  function Block(props) {
    var b = props.b, F = B[b.tipo];
    if (!F) return html`<p className="ll-hint">Blocco sconosciuto: ${b.tipo}</p>`;
    return html`<section className="ll-block">${F(b, props.ctx)}</section>`;
  }
  // I blocchi usano hook: ogni blocco è montato come componente con chiave stabile.
  var BlockC = function (props) { return Block(props); };

  /* =================== SCENA e MODI =================== */
  function Scena(props) {
    var s = props.s, ctx = props.ctx;
    return html`<article className=${'ll-scene ' + (props.dir < 0 ? 'is-prev' : 'is-next')} aria-labelledby="ll-h">
      <div className=${'ll-head' + (s.mascotte ? ' has-masc' : '')}>
        <div>
          ${s.momento && html`<p className="ll-moment">${s.momento}</p>`}
          <h2 className="ll-h" id="ll-h" tabIndex="-1">${titleNode(s.titolo)}</h2>
          ${s.lead && html`<p className="ll-lead">${inline(s.lead, 'l')}</p>`}
        </div>
        ${s.mascotte && html`<div className="ll-head-m"><${Mascotte} size=${144} /></div>`}
      </div>
      ${md(s.testo)}
      <div className="ll-blocks">${(s.blocchi || []).map(function (b, i) { return html`<${BlockC} key=${props.i + '-' + i} b=${b} ctx=${ctx} />`; })}</div>
    </article>`;
  }

  function Lezione(props) {
    var L = props.L, scene = (L.scene || []).map(function (s, k, a) { return s.mascotte == null && (k === 0 || k === a.length - 1) ? Object.assign({}, s, { mascotte: true }) : s; }), st = useState(0), i = st[0], setI = st[1], dr = useState(1), dir = dr[0], setDir = dr[1];
    var seen = useRef({ 0: true });
    function go(n) { if (n < 0 || n >= scene.length || n === i) return; setDir(n > i ? 1 : -1); seen.current[n] = true; setI(n); w.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); if (n === scene.length - 1) say(L.saluto || 'Ultima tappa: tiriamo le fila.'); }
    useEffect(function () {
      function key(e) {
        var t = (e.target.tagName || '').toLowerCase();
        if (t === 'input' || t === 'textarea' || e.target.isContentEditable || e.defaultPrevented) return;
        if (e.key === 'ArrowRight' || e.key === 'PageDown') go(i + 1);
        if (e.key === 'ArrowLeft' || e.key === 'PageUp') go(i - 1);
      }
      d.addEventListener('keydown', key); return function () { d.removeEventListener('keydown', key); };
    });
    useEffect(function () { var h = d.getElementById('ll-h'); if (h && i) h.focus({ preventScroll: true }); }, [i]);
    useEffect(function () { d.body.dataset.mascScena = scene[i] && scene[i].mascotte ? '1' : ''; return function () { d.body.dataset.mascScena = ''; }; }, [i]);
    return html`<${R.Fragment}>
      <main className="ll-stage"><${Scena} key=${i} i=${i} s=${scene[i]} dir=${dir} ctx=${props.ctx} /></main>
      <nav className="ll-nav" aria-label="Scene della lezione">
        <button className="ll-navbtn" disabled=${i === 0} onClick=${function () { go(i - 1); }}>Indietro</button>
        <div className="ll-dots">${scene.map(function (s, k) { return html`<button key=${k} className=${'ll-dot' + (seen.current[k] ? ' is-seen' : '')} aria-current=${k === i ? 'step' : null} title=${plain(s.titolo)} aria-label=${'Scena ' + (k + 1) + ': ' + plain(s.titolo)} onClick=${function () { go(k); }}></button>`; })}</div>
        <span className="ll-count">${i + 1} / ${scene.length}</span>
        <button className="ll-navbtn ll-navbtn--go" disabled=${i === scene.length - 1} onClick=${function () { go(i + 1); }}>Avanti</button>
      </nav>
    </${R.Fragment}>`;
  }

  function testoStudio(L) {
    var S = L.studio || {}, out = [plain(L.titolo), (L.sottotitolo ? plain(L.sottotitolo) : ''), ''];
    (S.sezioni || []).forEach(function (s) { out.push(plain(s.titolo).toUpperCase(), '', plain(s.testo), ''); });
    if (S.fonti && S.fonti.length) { out.push('FONTI', ''); S.fonti.forEach(function (f) { out.push('- ' + plain(f)); }); out.push(''); }
    out.push('© Matteo Sestili — Tutti i diritti riservati');
    return out.join('\n');
  }
  function Studio(props) {
    var L = props.L, S = L.studio || {};
    function scarica() {
      var blob = new Blob(['﻿' + testoStudio(L)], { type: 'text/plain;charset=utf-8' }), a = d.createElement('a');
      a.href = URL.createObjectURL(blob); a.download = (L.slug || 'lezione') + '-testo.txt'; d.body.appendChild(a); a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000); cheer();
    }
    return html`<main className="ll-study">
      <div className="ll-study-top"><${Mascotte} size=${55} aureola=${false} /><p className="ll-study-meta">Da studiare · ${L.classe || ''}</p></div>
      <h1>${titleNode(L.titolo)}</h1>
      ${L.sottotitolo && html`<p className="ll-lead">${inline(L.sottotitolo, 's')}</p>`}
      <div className="ll-row" style=${{ marginBottom: 34 }}>
        <button className="ll-btn" onClick=${scarica}>Scarica il testo</button>
        <button className="ll-btn ll-btn--ghost" onClick=${function () { w.print(); }}>Stampa</button>
      </div>
      ${(S.sezioni || []).map(function (s, i) { return html`<section key=${i}><h2>${s.titolo}</h2>${md(s.testo)}</section>`; })}
      ${S.fonti && S.fonti.length && html`<div className="ll-sources"><b>Fonti</b><ul>${S.fonti.map(function (f, i) { return html`<li key=${i}>${inline(f, 'f' + i)}</li>`; })}</ul></div>`}
    </main>`;
  }

  var GNAMES = { quiz: ['Ripasso', 'Quiz'], vf: ['Ripasso', 'Vero o falso'], flash: ['Ripasso', 'Flashcard'], memory: ['Ripasso', 'Memory'], abbina: ['Concetti', 'Abbinamenti'], cat: ['Concetti', 'Categorie'], seq: ['Storia', 'Linea del tempo'], completa: ['Parole', 'Completa'], cruci: ['Parole', 'Cruciverba'], sfida: ['Classe', 'Sfida a squadre'], sondaggio: ['Classe', 'Sondaggio'], rifl: ['Personale', 'Riflessione'] };
  function Giochi(props) {
    var D = w.GIOCHI_DATI || {}, ids = Object.keys(GNAMES).filter(function (k) { return D[k]; });
    useEffect(function () { if (w.Giochi) w.Giochi.init(props.start); return function () { w.Giochi && w.Giochi.clear(); }; }, []);
    if (!ids.length) return html`<main className="ll-games"><p className="ll-hint">Questa lezione non contiene giochi.</p></main>`;
    return html`<div className="ll-games">
      <div className="ll-row" style=${{ justifyContent: 'flex-end', marginTop: 0, marginBottom: 13 }}><button className="g-tool" type="button" data-mute>Suoni: sì</button></div>
      <nav className="g-tabs" role="tablist" aria-label="Giochi">${ids.map(function (k) { return html`<button key=${k} type="button" role="tab" data-game-tab=${k}><small>${GNAMES[k][0]}</small>${GNAMES[k][1]}</button>`; })}</nav>
      <main id="game"></main>
    </div>`;
  }

  var MODI = [['lezione', 'Lezione'], ['studio', 'Studio'], ['giochi', 'Giochi']];
  function App() {
    var L = w.LEZIONE || {}, m = useState('lezione'), modo = m[0], setModo = m[1], g = useState(null), start = g[0], setStart = g[1];
    var t = useState(d.documentElement.dataset.tema === 'chiaro'), chiaro = t[0], setChiaro = t[1];
    var hasGames = Object.keys(GNAMES).some(function (k) { return (w.GIOCHI_DATI || {})[k]; });
    var modi = MODI.filter(function (x) { return x[0] !== 'giochi' || hasGames; }).filter(function (x) { return x[0] !== 'studio' || L.studio; });
    useEffect(function () { d.body.dataset.modo = modo; w.scrollTo(0, 0); }, [modo]);
    function tema() { var c = chiaro ? 'scuro' : 'chiaro'; d.documentElement.dataset.tema = c; try { localStorage.setItem('tema_lab', c); } catch (e) {} setChiaro(!chiaro); }
    function schermo() { try { if (d.fullscreenElement) d.exitFullscreen(); else d.documentElement.requestFullscreen(); } catch (e) {} }
    var ctx = { gioca: function (id) { setStart(id || null); setModo('giochi'); }, say: say, cheer: cheer, oops: oops, festa: festa };
    return html`<${R.Fragment}>
      <header className="ll-top">
        <div className="ll-brand"><span className="ll-logo" data-amdg-trigger dangerouslySetInnerHTML=${{ __html: LOGO }}></span><span><small>Lab IRC · ${L.classe || ''}</small><b>${plain(L.titolo)}</b></span></div>
        <div className="ll-tools">
          <div className="ll-modes" role="tablist" aria-label="Modalità">${modi.map(function (x) { return html`<button key=${x[0]} role="tab" aria-selected=${modo === x[0]} onClick=${function () { if (x[0] === 'giochi') setStart(null); setModo(x[0]); }}>${x[1]}</button>`; })}</div>
          <button className="ll-icon" onClick=${tema} aria-label=${chiaro ? 'Passa al tema scuro' : 'Passa al tema chiaro'} title="Tema">${chiaro ? '🌙' : '☀️'}</button>
          <button className="ll-icon" onClick=${schermo} aria-label="Schermo intero" title="Schermo intero"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg></button>
        </div>
      </header>
      ${modo === 'lezione' && html`<${Lezione} L=${L} ctx=${ctx} />`}
      ${modo === 'studio' && html`<${Studio} L=${L} />`}
      ${modo === 'giochi' && html`<${Giochi} start=${start} />`}
      <footer className="ll-foot"><span>© Matteo Sestili — Tutti i diritti riservati</span><button className="ll-amdg" onClick=${function () { w.LabArtefatto && w.LabArtefatto.amdg(); }} aria-label="A M D G">AMDG</button></footer>
    </${R.Fragment}>`;
  }

  /* Pulsanti magnetici del design system: seguono il cursore (0.236 / 0.382), rientrano lenti. */
  function magnete() {
    if (reduce || !w.matchMedia('(hover: hover)').matches) return;
    var cur = null;
    d.addEventListener('pointermove', function (e) {
      var b = e.target.closest ? e.target.closest('.ll-btn, .ll-navbtn--go') : null;
      if (cur && cur !== b) { cur.style.removeProperty('--bx'); cur.style.removeProperty('--by'); }
      cur = b; if (!b || b.disabled) return;
      var r = b.getBoundingClientRect();
      b.style.setProperty('--bx', ((e.clientX - r.left - r.width / 2) * .236).toFixed(1) + 'px');
      b.style.setProperty('--by', ((e.clientY - r.top - r.height / 2) * .382).toFixed(1) + 'px');
    });
    var n = 0, t; // 7 clic sul logo → AMDG
    d.addEventListener('click', function (e) {
      if (!e.target.closest || !e.target.closest('[data-amdg-trigger]')) return;
      clearTimeout(t); t = setTimeout(function () { n = 0; }, 1618);
      if (++n >= 7) { n = 0; w.LabArtefatto && w.LabArtefatto.amdg(); }
    });
  }

  w.LabLezione = {
    registra: function (nome, comp) { custom[nome] = comp; },
    blocco: function (nome, fn) { B[nome] = fn; },
    md: md, inline: inline, festa: festa, blocchi: B, Mascotte: Mascotte,
    avvia: function () {
      var L = w.LEZIONE || {};
      if (L.titolo) d.title = plain(L.titolo) + ' · Lab IRC';
      magnete();
      w.ReactDOM.createRoot(d.getElementById('app')).render(html`<${App} />`);
    }
  };
})();

