/* Lab IRC — Strumenti con costrutti HTML nativi (kit definitivo, 5 ottobre 2026). Dopo lab-lezione-attivita.js.
   Blocchi: html (markup libero con lo stile del kit) · dubbi (<details>) · scegli (<select> nel testo) · griglia (<table> + caselle)
            dialogo (battute una alla volta) · storia (bivi a più passi) · originale (<ruby>: lingua originale e traslitterazione)
            traguardi (<input type=checkbox> + <progress>) · prima-dopo (<input type=range>) · scheda (<dialog>) · sintesi (contenteditable) · galleria (scroll-snap)
   Ogni blocco: pulsanti e controlli veri, tastiera, tocco, 360 px, solo token del design system. Nulla viene salvato. */
(function () {
  var w = window, d = document, R = w.React, LL = w.LabLezione, html = w.html;
  if (!LL || !R || !html) return;
  var useState = R.useState, useEffect = R.useEffect, useRef = R.useRef, useMemo = R.useMemo;
  var inline = LL.inline, md = LL.md, festa = LL.festa, plain = LL.plain;
  function say(t) { var m = d.querySelector('.ll-head-m lab-mascotte, .ll-masc lab-mascotte'); if (m && m.bubble) m.bubble(t); else if (w.LabArtefatto) w.LabArtefatto.say(t); }
  function cheer() { w.LabArtefatto && w.LabArtefatto.cheer(); }
  function oops() { w.LabArtefatto && w.LabArtefatto.oops(); }
  function H(p) { return p.titolo ? html`<h3 className="ll-block-h">${inline(p.titolo, 'h')}</h3>` : null; }

  /* ---------- HTML: costrutti liberi (table, dl, details, mark, ruby, kbd, figure…) con lo stile del kit ---------- */
  LL.blocco('html', function (p) {
    return html`<div className="lx-html">${H(p)}<div className="lx-html-in" dangerouslySetInnerHTML=${{ __html: p.t || p.html || '' }}></div>${p.fonte && html`<small className="lp-src">${p.fonte}</small>`}</div>`;
  });

  /* ---------- DUBBI: obiezioni e risposte in <details>/<summary>; con name= se ne apre uno alla volta ---------- */
  LL.blocco('dubbi', function (p) {
    var V = p.voci || [], s = useState({}), ap = s[0], setAp = s[1], nome = 'lx-dubbi-' + (p.id || plain(p.titolo || '').length), n = Object.keys(ap).length;
    return html`<div className="lx-faq">${H(p)}
      ${V.map(function (v, i) { return html`<details key=${i} className="lx-det" name=${p.esclusivo === false ? null : nome} onToggle=${function (e) { if (!e.target.open) return; var c = Object.assign({}, ap); c[i] = 1; setAp(c); if (Object.keys(c).length === V.length && n < V.length) say(p.fine || 'Tutti i dubbi aperti: ora se ne discute.'); }}>
        <summary><span className="lx-det-k">${i + 1}</span><span className="lx-det-q">${inline(v.q, 'q' + i)}</span><i aria-hidden="true"></i></summary>
        <div className="lx-det-b">${md(v.r, 'lp-p')}${v.fonte && html`<small className="lp-src">${v.fonte}</small>`}</div>
      </details>`; })}
      <p className="ll-tally" aria-live="polite">${n} / ${V.length} ${n === 1 ? 'aperto' : 'aperti'}</p>
    </div>`;
  });

  /* ---------- SCEGLI: nel testo, [*giusta|altra|altra] diventa un <select>; poi «Controlla» con il perché ---------- */
  function spezza(t) {
    var out = [], re = /\[([^\]]+)\]/g, last = 0, m, k = 0;
    while ((m = re.exec(t))) {
      if (m.index > last) out.push({ t: t.slice(last, m.index) });
      var ok = 0, ops = m[1].split('|').map(function (o, i) { o = o.trim(); if (o[0] === '*') { ok = i; o = o.slice(1); } return o; });
      out.push({ ops: ops, ok: ok, i: k++ }); last = m.index + m[0].length;
    }
    if (last < t.length) out.push({ t: t.slice(last) });
    return out;
  }
  LL.blocco('scegli', function (p) {
    var segs = useMemo(function () { return spezza(p.testo || ''); }, [p.testo]), gaps = segs.filter(function (x) { return x.ops; });
    var s = useState({}), v = s[0], setV = s[1], c = useState(false), chk = c[0], setChk = c[1];
    var giusti = gaps.filter(function (g) { return v[g.i] === g.ok; }).length, tutti = gaps.every(function (g) { return v[g.i] != null; });
    function controlla() { setChk(true); if (giusti === gaps.length) { cheer(); festa(); } else oops(); }
    return html`<div className="lx-pick"><span className="la-meta">${p.etichetta || 'Scegli la parola giusta'}</span>${H(p)}
      <p className="lx-pick-t">${segs.map(function (sg, j) {
        if (!sg.ops) return html`<span key=${j}>${inline(sg.t, 's' + j)}</span>`;
        var st = chk ? (v[sg.i] === sg.ok ? ' is-right' : ' is-wrong') : (v[sg.i] != null ? ' is-set' : '');
        return html`<select key=${j} className=${'lx-sel' + st} value=${v[sg.i] == null ? '' : String(v[sg.i])} aria-label=${'Spazio ' + (sg.i + 1)} onChange=${function (e) { var c2 = Object.assign({}, v); if (e.target.value === '') delete c2[sg.i]; else c2[sg.i] = +e.target.value; setV(c2); setChk(false); }}>
          <option value="">…</option>${sg.ops.map(function (o, k) { return html`<option key=${k} value=${String(k)}>${o}</option>`; })}
        </select>`; })}</p>
      <div className="ll-row">
        <button className="ll-btn" disabled=${!tutti} onClick=${controlla}>Controlla</button>
        ${chk && html`<span className="ll-tally" aria-live="polite">${giusti} / ${gaps.length} giuste</span>`}
        <button className="ll-link" onClick=${function () { setV({}); setChk(false); }}>Ricomincia</button>
      </div>
      <div aria-live="polite">${chk && html`<p className=${'ll-why ' + (giusti === gaps.length ? 'is-ok' : 'is-ko')}><strong>${giusti === gaps.length ? 'Tutte giuste. ' : 'Rivedete le parole segnate. '}</strong>${inline(p.why || '', 'w')}</p>`}</div>
    </div>`;
  });

  /* ---------- GRIGLIA: righe × colonne, caselle da spuntare (<table> + <input type=checkbox>), poi controllo ---------- */
  LL.blocco('griglia', function (p) {
    var Rg = p.righe || [], C = p.colonne || [], ok = p.ok || [];
    var s = useState({}), v = s[0], setV = s[1], c = useState(false), chk = c[0], setChk = c[1];
    function key(i, j) { return i + ':' + j; }
    var tot = Rg.length * C.length, giuste = 0;
    Rg.forEach(function (_, i) { C.forEach(function (_, j) { if (!!v[key(i, j)] === !!(ok[i] && ok[i][j])) giuste++; }); });
    function controlla() { setChk(true); if (giuste === tot) { cheer(); festa(); } else oops(); }
    return html`<div className="lx-grid">${H(p)}<p className="ll-hint">${p.istruzione || 'Spuntate le caselle vere, poi controllate.'}</p>
      <div className="lx-grid-w"><table className="lx-tab"><thead><tr><th scope="col"><span className="lx-vh">Riga</span></th>${C.map(function (x, j) { return html`<th key=${j} scope="col">${inline(x, 'c' + j)}</th>`; })}</tr></thead>
        <tbody>${Rg.map(function (r, i) { return html`<tr key=${i}><th scope="row">${inline(r, 'r' + i)}</th>${C.map(function (_, j) {
          var on = !!v[key(i, j)], giusta = !!(ok[i] && ok[i][j]), st = chk ? (on === giusta ? ' is-right' : ' is-wrong') : '';
          return html`<td key=${j}><label className=${'lx-cell' + (on ? ' is-on' : '') + st}><input type="checkbox" checked=${on} onChange=${function () { var n = Object.assign({}, v); n[key(i, j)] = !on; setV(n); setChk(false); }} aria-label=${plain(r) + ' · ' + plain(C[j])} /><span aria-hidden="true">${on ? '✓' : ''}</span></label></td>`; })}</tr>`; })}</tbody></table></div>
      <div className="ll-row">
        <button className="ll-btn" onClick=${controlla}>Controlla la griglia</button>
        ${chk && html`<span className="ll-tally" aria-live="polite">${giuste} / ${tot} caselle giuste</span>`}
        <button className="ll-link" onClick=${function () { setV({}); setChk(false); }}>Svuota</button>
      </div>
      <div aria-live="polite">${chk && giuste === tot && p.why && html`<p className="ll-why is-ok">${inline(p.why, 'w')}</p>`}</div>
    </div>`;
  });

  /* ---------- DIALOGO: una fonte in forma di dialogo, battuta per battuta; le parti si possono leggere a voce ---------- */
  LL.blocco('dialogo', function (p) {
    var V = p.voci || [], s = useState(p.iniziali || 1), k = s[0], setK = s[1], chi = [];
    V.forEach(function (x) { if (chi.indexOf(x.chi) < 0) chi.push(x.chi); });
    useEffect(function () { if (k === V.length && V.length > 1) say(p.fine || 'Fine del dialogo: che cosa è cambiato fra la prima e l’ultima battuta?'); }, [k]);
    return html`<div className="lx-dlg">${H(p)}${p.istruzione && html`<p className="ll-hint">${inline(p.istruzione, 'i')}</p>`}
      <ol className="lx-dlg-l" aria-live="polite">${V.slice(0, k).map(function (x, i) { var lato = chi.indexOf(x.chi) % 2;
        return html`<li key=${i} className=${'lx-line lx-line--' + lato}><span className="lx-who" aria-hidden="true">${(x.chi || '?').charAt(0)}</span><div><small>${x.chi}</small><p>${inline(x.t, 'd' + i)}</p></div></li>`; })}</ol>
      ${p.fonte && html`<p className="lp-read-f">${p.fonte}</p>`}
      <div className="ll-row">
        ${k < V.length ? html`<button className="ll-btn" onClick=${function () { setK(k + 1); }}>${p.pulsante || 'Battuta successiva'}</button>` : html`<button className="ll-btn ll-btn--ghost" onClick=${function () { setK(p.iniziali || 1); }}>Rileggi dall’inizio</button>`}
        <span className="ll-tally">${k} / ${V.length}</span>
      </div>
    </div>`;
  });

  /* ---------- STORIA: bivi a più passi; il percorso resta visibile, si può tornare indietro ---------- */
  LL.blocco('storia', function (p) {
    var N = p.nodi || {}, primo = p.inizio || Object.keys(N)[0], s = useState([{ id: primo }]), path = s[0], setPath = s[1];
    var cur = N[path[path.length - 1].id] || {}, fine = !!cur.fine || !(cur.scelte && cur.scelte.length);
    return html`<div className="lx-story"><span className="la-meta">${p.etichetta || 'Una storia a bivi'}</span>${H(p)}
      <ol className="lx-story-p">${path.map(function (st, i) { var n = N[st.id] || {}; return html`<li key=${i} className=${i === path.length - 1 ? 'is-now' : ''}>${st.via && html`<small>${inline(st.via, 'v' + i)}</small>`}${md(n.t, 'lp-p')}</li>`; })}</ol>
      ${!fine ? html`<div className="lx-story-c">${cur.scelte.map(function (c, i) { return html`<button key=${i} className="la-choice" onClick=${function () { setPath(path.concat({ id: c.vai, via: c.t })); if (c.nota) say(c.nota); }}><span className="la-key">${'ABCDE'[i]}</span>${inline(c.t, 'c' + i)}</button>`; })}</div>`
        : html`<div className=${'lp-fork-e lp-tono-' + (cur.tono || 'neutro')}><small>${cur.esito || 'Fine della storia'}</small>${p.chiusura && md(p.chiusura, 'lp-p')}</div>`}
      <div className="ll-row">
        ${path.length > 1 && html`<button className="ll-link" onClick=${function () { setPath(path.slice(0, -1)); }}>Torna indietro</button>`}
        ${path.length > 1 && html`<button className="ll-link" onClick=${function () { setPath([{ id: primo }]); }}>Da capo</button>`}
        <span className="ll-tally">${path.length} ${path.length === 1 ? 'passo' : 'passi'}</span>
      </div>
    </div>`;
  });

  /* ---------- ORIGINALE: la fonte nella sua lingua con <ruby> (traslitterazione sopra); si tocca una parola ---------- */
  LL.blocco('originale', function (p) {
    var P = p.parole || [], s = useState(null), a = s[0], setA = s[1], t = useState(false), tr = t[0], setTr = t[1];
    return html`<div className="lx-orig">${H(p)}<span className="la-meta">${p.lingua || 'Testo originale'}</span>
      <p className="lx-orig-t" dir=${p.direzione || 'ltr'} lang=${p.lang || null}>${P.map(function (x, i) { return html`<button key=${i} type="button" className=${'lx-ruby' + (a === i ? ' is-on' : '')} aria-pressed=${a === i} onClick=${function () { setA(a === i ? null : i); }}><ruby>${x.o}<rp>(</rp><rt>${x.tr || ''}</rt><rp>)</rp></ruby></button>`; })}</p>
      <div aria-live="polite">${a !== null ? html`<p key=${a} className="ll-gloss"><b dir=${p.direzione || 'ltr'}>${P[a].o}</b> · <i>${P[a].tr}</i> — ${inline(P[a].it || '', 'i')}</p>` : html`<p className="ll-hint">${p.istruzione || 'Tocca una parola: sopra la pronuncia, sotto il significato.'}</p>`}</div>
      <div className="ll-row">
        ${p.traduzione && html`<button className="ll-btn ll-btn--ghost" aria-pressed=${tr} onClick=${function () { setTr(!tr); }}>${tr ? 'Nascondi la traduzione' : 'Mostra la traduzione'}</button>`}
        ${p.fonte && html`<span className="lp-src">${p.fonte}</span>`}
      </div>
      ${tr && html`<blockquote className="lp-read-t lx-orig-tr">${inline(p.traduzione, 'tr')}</blockquote>`}
    </div>`;
  });

  /* ---------- TRAGUARDI: che cosa sappiamo fare ora; caselle e <progress>, per alzata di mano ---------- */
  LL.blocco('traguardi', function (p) {
    var V = p.voci || [], s = useState({}), v = s[0], setV = s[1], n = V.filter(function (_, i) { return v[i]; }).length;
    function toggle(i) { var c = Object.assign({}, v); c[i] = !c[i]; setV(c); var m = V.filter(function (_, k) { return c[k]; }).length; if (m === V.length && n < V.length) { cheer(); festa(); say(p.fine || 'Tutti i traguardi: bel lavoro!'); } }
    return html`<div className="lx-goals">${H(p)}<p className="ll-hint">${p.istruzione || 'Alzata di mano: chi saprebbe spiegarlo a un compagno? Il docente spunta.'}</p>
      <ul className="lx-goals-l">${V.map(function (t, i) { return html`<li key=${i}><label className=${'lx-goal' + (v[i] ? ' is-on' : '')}><input type="checkbox" checked=${!!v[i]} onChange=${function () { toggle(i); }} /><span className="lx-goal-k" aria-hidden="true">${v[i] ? '✓' : ''}</span><span>${inline(t, 'g' + i)}</span></label></li>`; })}</ul>
      <div className="lx-goals-p"><progress max=${V.length} value=${n} aria-label="Traguardi raggiunti"></progress><span className="ll-tally">${n} / ${V.length}</span></div>
    </div>`;
  });

  /* ---------- PRIMA / DOPO: due immagini (o due stati) confrontati con un cursore (<input type=range>) ---------- */
  LL.blocco('prima-dopo', function (p) {
    var s = useState(50), x = s[0], setX = s[1], A = p.a || {}, B = p.b || {};
    function pane(o, cls) { return html`<div className=${'lx-pane ' + cls}>${o.src ? html`<img src=${o.src} alt=${o.alt || ''} />` : html`<div className="lp-ph"><span>${o.alt || 'Immagine da incorporare'}</span></div>`}<span className="lx-pane-k">${o.etichetta || ''}</span></div>`; }
    return html`<div className="lx-ba">${H(p)}
      <div className="lx-ba-s" style=${{ aspectRatio: String(p.rapporto || 1.618), '--x': x + '%' }}>${pane(A, 'lx-pane--a')}${pane(B, 'lx-pane--b')}<i className="lx-ba-bar" aria-hidden="true"></i>
        <input type="range" min="0" max="100" value=${x} aria-label=${'Confronto fra ' + (A.etichetta || 'prima') + ' e ' + (B.etichetta || 'dopo')} onInput=${function (e) { setX(+e.target.value); }} onChange=${function (e) { setX(+e.target.value); }} /></div>
      ${(p.didascalia || p.fonte) && html`<p className="lx-cap">${inline(p.didascalia || '', 'f')}${p.fonte ? ' — ' + p.fonte : ''}</p>`}
      <div className="ll-row lp-ctrl">
        <button className="ll-btn ll-btn--ghost" aria-pressed=${x === 100} onClick=${function () { setX(100); }}>${A.etichetta || 'Prima'}</button>
        <button className="ll-btn ll-btn--ghost" aria-pressed=${x === 50} onClick=${function () { setX(50); }}>Metà</button>
        <button className="ll-btn ll-btn--ghost" aria-pressed=${x === 0} onClick=${function () { setX(0); }}>${B.etichetta || 'Dopo'}</button>
      </div>
    </div>`;
  });

  /* ---------- SCHEDA: un approfondimento in <dialog> (biografia, documento), senza lasciare la scena ---------- */
  LL.blocco('scheda', function (p) {
    var ref = useRef(null);
    function apri() { var el = ref.current; if (!el) return; if (el.showModal) el.showModal(); else el.setAttribute('open', ''); }
    function chiudi() { var el = ref.current; if (!el) return; if (el.close) el.close(); else el.removeAttribute('open'); }
    return html`<div className="lx-sched">
      <div className="lx-sched-h"><span className="la-meta">${p.etichetta || 'Scheda'}</span><b>${inline(p.titolo || '', 't')}</b>${p.sotto && html`<span>${inline(p.sotto, 's')}</span>`}</div>
      <button className="ll-btn ll-btn--ghost" onClick=${apri}>${p.pulsante || 'Apri la scheda'}</button>
      <dialog ref=${ref} className="lx-dialog" aria-label=${plain(p.titolo || 'Scheda')} onClick=${function (e) { if (e.target === e.currentTarget) chiudi(); }}>
        <div className="lx-dialog-in">
          <button className="ll-pop-x" onClick=${chiudi} aria-label="Chiudi">×</button>
          <p className="ll-moment">${p.etichetta || 'Scheda'}</p>
          <h3>${inline(p.titolo || '', 'dt')}</h3>
          ${p.src && html`<img src=${p.src} alt=${p.alt || ''} />`}
          ${md(p.t, 'lp-p')}
          ${p.fonte && html`<small className="lp-src">${p.fonte}</small>`}
        </div>
      </dialog>
    </div>`;
  });

  /* ---------- SINTESI: la frase che la classe costruisce insieme (contenteditable); il docente scrive, nulla si salva ---------- */
  LL.blocco('sintesi', function (p) {
    var ref = useRef(null), s = useState(0), n = s[0], setN = s[1], max = p.max || 280;
    return html`<div className="lx-syn">
      ${(p.q || p.titolo) && html`<h3 className="ll-block-h">${inline(p.q || p.titolo, 'q')}</h3>`}
      <p className="ll-hint">${p.istruzione || 'Il docente scrive la frase che la classe costruisce insieme. Non viene salvata.'}</p>
      <div className="lx-syn-in" ref=${ref} contentEditable="true" role="textbox" aria-multiline="true" aria-label=${plain(p.q || p.titolo || 'Sintesi della classe')} data-ph=${p.segnaposto || 'Scrivete qui la frase della classe…'} onInput=${function (e) { setN(e.currentTarget.textContent.length); }} suppressContentEditableWarning=${true}></div>
      <div className="ll-row">
        <button className="ll-btn ll-btn--ghost" onClick=${function () { if (ref.current) { ref.current.textContent = ''; setN(0); ref.current.focus(); } }}>Pulisci</button>
        <span className=${'ll-tally' + (n > max ? ' is-over' : '')} aria-live="polite">${n} / ${max}</span>
      </div>
    </div>`;
  });

  /* ---------- GALLERIA: più figure con didascalia, scorrimento a scatti (scroll-snap), frecce e pallini ---------- */
  LL.blocco('galleria', function (p) {
    var F = p.figure || [], ref = useRef(null), s = useState(0), i = s[0], setI = s[1];
    function vai(k) { var el = ref.current; k = Math.max(0, Math.min(F.length - 1, k)); if (el && el.children[k]) el.scrollTo({ left: el.children[k].offsetLeft - el.offsetLeft, behavior: 'smooth' }); setI(k); }
    function onScroll() { var el = ref.current; if (!el) return; var k = Math.round(el.scrollLeft / Math.max(1, el.clientWidth)); if (k !== i) setI(k); }
    return html`<div className="lx-gal">${H(p)}
      <div className="lx-gal-s" ref=${ref} onScroll=${onScroll} tabIndex="0" aria-label=${plain(p.titolo || 'Galleria')}>${F.map(function (f, k) {
        return html`<figure key=${k} className="lx-gal-f" style=${{ '--r': String(p.rapporto || 1.618) }}>${f.src ? html`<img src=${f.src} alt=${f.alt || ''} loading="lazy" />` : html`<div className="lp-ph"><span>${f.alt || 'Immagine da incorporare'}</span></div>`}<figcaption><b>${k + 1} / ${F.length}</b> ${inline(f.didascalia || '', 'c' + k)}${f.fonte ? ' — ' + f.fonte : ''}</figcaption></figure>`; })}</div>
      <div className="ll-row lp-ctrl">
        <button className="ll-btn ll-btn--ghost lp-sq" disabled=${i === 0} onClick=${function () { vai(i - 1); }} aria-label="Figura precedente">←</button>
        <div className="lp-pips">${F.map(function (_, k) { return html`<button key=${k} className=${'ll-dot' + (k < i ? ' is-seen' : '')} aria-current=${k === i ? 'step' : null} aria-label=${'Figura ' + (k + 1)} onClick=${function () { vai(k); }}></button>`; })}</div>
        <button className="ll-btn ll-btn--ghost lp-sq" disabled=${i >= F.length - 1} onClick=${function () { vai(i + 1); }} aria-label="Figura successiva">→</button>
      </div>
    </div>`;
  });

  LL.extra = '2026-10-05';
})();
