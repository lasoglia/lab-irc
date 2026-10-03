/* Lab IRC — Attività di classe della lezione (React + htm). Dopo lab-lezione.js e lab-lezione-plus.js.
   Blocchi: domanda/sondaggio (ingresso → uscita con confronto) · nuvola · spettro · chi (chi lo dice?) · quiz (più domande, stelle)
            idee (da portare a casa) · continua · etimo (parti della parola) · agenda (scaletta cliccabile) · timer (= consegna)
   Stato solo in memoria: voti e parole restano finché la pagina è aperta, anche cambiando scena; nessun dato salvato. */
(function () {
  var w = window, d = document, R = w.React, LL = w.LabLezione, html = w.html;
  if (!LL || !R || !html) return;
  var useState = R.useState, useEffect = R.useEffect, useRef = R.useRef;
  var inline = LL.inline, md = LL.md, festa = LL.festa, plain = LL.plain;
  function say(t) { var m = d.querySelector('.ll-head-m lab-mascotte, .ll-masc lab-mascotte'); if (m && m.bubble) m.bubble(t); else if (w.LabArtefatto) w.LabArtefatto.say(t); }
  function cheer() { w.LabArtefatto && w.LabArtefatto.cheer(); }
  function oops() { w.LabArtefatto && w.LabArtefatto.oops(); }
  function somma(v) { return v.reduce(function (a, b) { return a + b; }, 0); }
  function pct(v, i) { var t = somma(v); return t ? Math.round(v[i] / t * 100) : 0; }
  function hash(s) { var h = 7; for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return Math.abs(h); }
  function norm(x) { return String(x || '').trim().toLowerCase().replace(/\s+/g, ' ').slice(0, 24); }
  function useArma() { // conferma a due tocchi per le azioni che cancellano
    var s = useState(false), a = s[0], set = s[1], t = useRef(0);
    useEffect(function () { return function () { clearTimeout(t.current); }; }, []);
    return [a, function (fn) { clearTimeout(t.current); if (!a) { set(true); t.current = setTimeout(function () { set(false); }, 3000); return; } set(false); fn(); }];
  }
  var POLL = {}, NUV = {}, ac;
  LL.bip = function () {
    try {
      ac = ac || new (w.AudioContext || w.webkitAudioContext)();
      [0, .233, .466].forEach(function (t, i) {
        var o = ac.createOscillator(), g = ac.createGain(), t0 = ac.currentTime + t; o.frequency.value = i === 2 ? 880 : 660;
        g.gain.setValueAtTime(.0001, t0); g.gain.exponentialRampToValueAtTime(.2, t0 + .02); g.gain.exponentialRampToValueAtTime(.0001, t0 + .2);
        o.connect(g); g.connect(ac.destination); o.start(t0); o.stop(t0 + .22);
      });
    } catch (e) {}
  };

  /* ---------- SONDAGGIO: alzata di mano, il docente tocca; «confronta» mostra il voto d'ingresso (tratteggio) ---------- */
  function Sondaggio(p) {
    var op = p.opzioni || [], id = p.id || plain(p.q);
    var S = POLL[id] || (POLL[id] = { v: op.map(function () { return 0; }), h: [], show: false });
    if (S.v.length !== op.length) S.v = op.map(function () { return 0; });
    var f = useState(0), setF = f[1], fl = useState(null), flash = fl[0], setFlash = fl[1], mg = useState(''), msg = mg[0], setMsg = mg[1], arm = useArma(), tm = useRef(0);
    useEffect(function () { return function () { clearTimeout(tm.current); }; }, []);
    function rif() { setF(function (x) { return x + 1; }); }
    var R0 = p.confronta && POLL[p.confronta], ref = R0 && R0.v.length === op.length && somma(R0.v) > 0 ? R0.v : null;
    var tot = somma(S.v), max = Math.max.apply(null, S.v), show = S.show;
    function vota(i) { S.v[i]++; S.h.push(i); setFlash(i); clearTimeout(tm.current); tm.current = setTimeout(function () { setFlash(null); }, 1618); setMsg('✓ «' + plain(op[i]) + '» · '); rif(); }
    function annulla() { var i = S.h.pop(); if (i == null) return; if (S.v[i] > 0) S.v[i]--; setMsg('Tolto un voto a «' + plain(op[i]) + '» · '); rif(); }
    function mostra() { S.show = !S.show; if (S.show && tot) { say(ref ? 'Ecco com’è cambiata la classe!' : 'Ecco che cosa pensa la classe!'); festa(); } rif(); }
    return html`<div className=${'lx-poll' + (show ? ' is-shown' : '')}>
      ${p.etichetta && html`<span className="la-meta">${p.etichetta}</span>`}
      <h3 className="ll-block-h">${inline(p.q, 'q')}</h3>
      <p className="ll-hint">${p.istruzione || 'Alzata di mano: il docente tocca una risposta per ogni voto. Nessun nome, nessun punteggio.'}</p>
      <div className="lx-opts">${op.map(function (o, i) {
        var pc = pct(S.v, i), rp = ref ? pct(ref, i) : null, n = S.v[i];
        return html`<button key=${i} type="button" className=${'lx-opt' + (flash === i ? ' is-voted' : '') + (show && tot && n === max ? ' is-top' : '')} onClick=${function () { vota(i); }} aria-label=${plain(o) + ': aggiungi un voto' + (show ? ' (' + pc + '%, ' + n + (n === 1 ? ' voto)' : ' voti)') : '')}>
          <i className="lx-bar" style=${{ width: (show ? pc : 0) + '%' }}></i>
          ${show && rp != null && html`<i className="lx-ref" style=${{ width: rp + '%' }}></i>`}
          <span className="lx-opt-t">${inline(o, 'o' + i)}</span>
          <span className="lx-opt-r">${show ? html`<b>${pc}%</b><small>${n} ${n === 1 ? 'voto' : 'voti'}${rp != null ? ' · prima ' + rp + '%' : ''}</small>` : ''}</span>
          <span className="lx-ok" aria-hidden="true">✓ Votato</span>
        </button>`;
      })}</div>
      <div className="ll-row">
        <button className="ll-btn" onClick=${mostra}>${show ? 'Nascondi i risultati' : 'Mostra i risultati'}</button>
        <button className="ll-btn ll-btn--ghost" disabled=${!S.h.length} onClick=${annulla}>Annulla l’ultimo</button>
        <button className="ll-link" onClick=${function () { arm[1](function () { S.v = op.map(function () { return 0; }); S.h = []; S.show = false; setMsg('Sondaggio azzerato · '); rif(); }); }}>${arm[0] ? 'Sicuro? Tocca ancora' : 'Azzera'}</button>
        <span className="ll-tally" aria-live="polite">${msg}${tot} ${tot === 1 ? 'voto' : 'voti'}</span>
      </div>
      ${show && ref && html`<p className="ll-hint lx-ref-k"><i aria-hidden="true"></i>Il tratteggio segna il voto d’inizio lezione.</p>`}
      ${show && p.dibattito && html`<p className="ll-gloss">${inline(p.dibattito, 'd')}</p>`}
    </div>`;
  }
  LL.blocco('domanda', Sondaggio);
  LL.blocco('sondaggio', Sondaggio);

  /* ---------- NUVOLA DI PAROLE: la parola ripetuta cresce (scala φ) ---------- */
  var COL = ['var(--la-accent)', 'var(--lab-oro)', 'var(--lab-ciano)', 'var(--lab-rosa)', 'var(--lab-verde)'];
  LL.blocco('nuvola', function (p) {
    var id = p.id || plain(p.q);
    var S = NUV[id] || (NUV[id] = (function () { var o = { w: {}, h: [] }; (p.semi || []).forEach(function (x) { x = norm(x); if (x) o.w[x] = (o.w[x] || 0) + 1; }); return o; })());
    var f = useState(0), setF = f[1], v = useState(''), val = v[0], setVal = v[1], fr = useState(null), fresh = fr[0], setFresh = fr[1], arm = useArma();
    function rif() { setF(function (n) { return n + 1; }); }
    function add(x) { x = norm(x); if (!x) return; S.w[x] = (S.w[x] || 0) + 1; S.h.push(x); setFresh(x); rif(); }
    var keys = Object.keys(S.w), max = Math.max.apply(null, keys.map(function (k) { return S.w[k]; }).concat(1)), tot = keys.reduce(function (a, k) { return a + S.w[k]; }, 0);
    keys.sort(function (a, b) { return hash(a) % 13 - hash(b) % 13 || a.localeCompare(b, 'it'); });
    return html`<div className="lx-cloud">
      <h3 className="ll-block-h">${inline(p.q, 'q')}</h3>
      <p className="ll-hint">${p.istruzione || 'Scrivete le parole che dicono i ragazzi; toccate una parola ripetuta per farla crescere.'}</p>
      <form className="lx-cloud-in" onSubmit=${function (e) { e.preventDefault(); add(val); setVal(''); }}>
        <input type="text" value=${val} maxLength="24" placeholder="Scrivi una parola…" aria-label="Nuova parola" onChange=${function (e) { setVal(e.target.value); }} />
        <button className="ll-btn" type="submit">Aggiungi</button>
      </form>
      <div className="lx-words" aria-live="polite">${keys.length ? keys.map(function (k) {
        var n = S.w[k], h = hash(k);
        return html`<button key=${k} type="button" className=${'lx-word' + (k === fresh ? ' is-new' : '')} title="Tocca per +1" style=${{ '--s': (max > 1 ? 1 + 1.618 * (n - 1) / (max - 1) : 1.272).toFixed(3), '--c': COL[h % COL.length], '--r': ((h % 5) - 2) * 1.5 + 'deg' }} onClick=${function () { add(k); }}>${k}${n > 1 && html`<sup>${n}</sup>`}</button>`;
      }) : html`<span className="lx-empty">Le parole della classe appariranno qui</span>`}</div>
      <div className="ll-row">
        <button className="ll-btn ll-btn--ghost" disabled=${!S.h.length} onClick=${function () { var k = S.h.pop(); if (!k) return; if (--S.w[k] <= 0) delete S.w[k]; setFresh(null); rif(); }}>Annulla l’ultima</button>
        <button className="ll-link" onClick=${function () { arm[1](function () { S.w = {}; S.h = []; setFresh(null); rif(); }); }}>${arm[0] ? 'Sicuro? Tocca ancora' : 'Pulisci'}</button>
        <span className="ll-tally">${keys.length} ${keys.length === 1 ? 'parola' : 'parole'} · ${tot} ${tot === 1 ? 'voce' : 'voci'}</span>
      </div>
    </div>`;
  });

  /* ---------- SPETTRO: posizioni su una linea (e chi ne sta fuori); ogni punto apre nome, etimologia, esempio ---------- */
  LL.blocco('spettro', function (p) {
    var pt = p.punti || [], s = useState(null), a = s[0], setA = s[1], v = useState({}), visti = v[0], setVisti = v[1];
    function tocca(i) { setA(i); var nv = Object.assign({}, visti); nv[i] = 1; if (Object.keys(nv).length === pt.length && Object.keys(visti).length < pt.length) say(p.fine || 'Le avete viste tutte!'); setVisti(nv); }
    var x = a !== null ? pt[a] : null;
    return html`<div className="lx-spec">
      ${(p.q || p.titolo) && html`<h3 className="ll-block-h">${inline(p.q || p.titolo, 'q')}</h3>`}
      ${p.poli && html`<div className="lx-ends">${p.poli.map(function (y, i) { return html`<span key=${i}>${y}</span>`; })}</div>`}
      <div className="lx-axis" role="group" aria-label=${plain(p.q || p.titolo || 'Spettro delle posizioni')}>
        ${pt.map(function (q, i) { return html`<button key=${i} type="button" className=${'lx-pt' + (a === i ? ' is-on' : '') + (visti[i] ? ' is-seen' : '') + (q.fuori ? ' is-off' : '')} style=${{ '--x': q.x == null ? 50 : q.x }} aria-pressed=${a === i} onClick=${function () { tocca(i); }}><i></i><span>${q.t}</span>${q.fuori && html`<small>${q.fuori === true ? 'fuori dalla linea' : q.fuori}</small>`}</button>`; })}
      </div>
      <div aria-live="polite">${x
        ? html`<div key=${a} className="lx-spec-c">${x.etim && html`<small>${inline(x.etim, 'e')}</small>`}<b>${x.t}</b>${md(x.def, 'lp-p')}${x.es && html`<p className="lx-ex">${inline(x.es, 'x')}</p>`}</div>`
        : html`<p className="ll-hint">${p.istruzione || 'Toccate un punto sulla linea: la posizione e da dove viene il suo nome.'}</p>`}</div>
    </div>`;
  });

  /* ---------- CHI LO DICE?: frasi d'autore da abbinare a una posizione ---------- */
  LL.blocco('chi', function (p) {
    var fr = p.frasi || [], op = p.opzioni || [], s = useState(function () { return fr.map(function () { return null; }); }), ans = s[0], setAns = s[1];
    var done = ans.filter(function (x) { return x !== null; }).length, ok = ans.filter(function (x, i) { return x === fr[i].ok; }).length;
    function pick(qi, i) {
      if (ans[qi] !== null) return; var c = ans.slice(); c[qi] = i; setAns(c);
      if (i === fr[qi].ok) cheer(); else oops();
      if (c.every(function (x, j) { return x === fr[j].ok; })) { festa(); setTimeout(function () { say(p.fine || 'Tutte giuste!'); }, 1618); }
    }
    return html`<div className="lx-match">
      <div className="lx-top"><span className="la-meta">${p.etichetta || 'Chi lo dice?'}</span><span className="ll-tally" aria-live="polite">${done ? 'Indovinate ' + ok + ' su ' + fr.length : 'Abbinate ogni frase a una posizione'}</span></div>
      ${p.q && html`<h3 className="ll-block-h">${inline(p.q, 'q')}</h3>`}
      <div className="lx-qms">${fr.map(function (f, qi) {
        var a = ans[qi];
        return html`<article key=${qi} className=${'lx-qm' + (a === null ? '' : a === f.ok ? ' is-ok' : ' is-ko')}>
          <div className="lx-qm-t"><blockquote>${inline(f.t, 't' + qi)}</blockquote>${f.chi && html`<span className="lx-who">${f.chi}</span>`}</div>
          <div className="lx-qm-b">${op.map(function (o, i) { return html`<button key=${i} type="button" disabled=${a !== null} className=${a === null ? '' : i === f.ok ? 'is-right' : i === a ? 'is-wrong' : 'is-dim'} onClick=${function () { pick(qi, i); }}>${o}</button>`; })}</div>
          ${a !== null && f.why && html`<p className="lx-qm-why">${inline(f.why, 'w' + qi)}</p>`}
        </article>`;
      })}</div>
      ${done === fr.length && ok === fr.length && html`<p className="ll-why is-ok"><strong>Tutte giuste. </strong>${inline(p.why || 'Ogni frase dice una posizione diversa davanti alla stessa domanda.', 'w')}</p>`}
      ${done > 0 && html`<div className="ll-row"><button className="ll-link" onClick=${function () { setAns(fr.map(function () { return null; })); }}>Rifate l’abbinamento</button></div>`}
    </div>`;
  });

  /* ---------- QUIZ: più domande in fila, pallini di avanzamento, stelle alla fine ---------- */
  LL.blocco('quiz', function (p) {
    var D = p.domande || [], n = D.length, s = useState(0), k = s[0], setK = s[1], r = useState([]), res = r[0], setRes = r[1], pk = useState(null), pick = pk[0], setPick = pk[1];
    var fine = k >= n, q = D[k] || {}, ok = res.filter(Boolean).length, st = ok === n ? 3 : ok >= Math.ceil(n / 2) ? 2 : ok ? 1 : 0;
    function choose(i) { if (pick !== null) return; setPick(i); var c = res.slice(); c[k] = i === q.ok; setRes(c); if (i === q.ok) cheer(); else oops(); }
    function next() { setPick(null); setK(k + 1); if (k + 1 >= n && ok === n) festa(); }
    return html`<div className="lx-quiz">
      <div className="lx-top"><span className="la-meta">${fine ? 'Risultato' : (p.etichetta || 'Verifica') + ' · domanda ' + (k + 1) + ' di ' + n}</span><span className="lx-pips" aria-hidden="true">${D.map(function (_, j) { return html`<i key=${j} className=${res[j] === true ? 'is-ok' : res[j] === false ? 'is-ko' : j === k ? 'is-on' : ''}></i>`; })}</span></div>
      ${!fine ? html`<div key=${k} className="lx-quiz-q">
        <h3 className="la-q">${inline(q.q, 'q')}</h3>
        <div className="la-choices">${(q.opzioni || []).map(function (o, i) { var cls = 'la-choice' + (pick === null ? '' : i === q.ok ? ' is-right' : i === pick ? ' is-wrong' : ' is-dim'); return html`<button key=${i} className=${cls} disabled=${pick !== null} onClick=${function () { choose(i); }}><span className="la-key">${'ABCDE'[i]}</span>${inline(o, 'o' + i)}</button>`; })}</div>
        <div aria-live="polite">${pick !== null && html`<p className=${'ll-why ' + (pick === q.ok ? 'lx-yes' : 'is-ko')}><strong>${pick === q.ok ? 'Esatto. ' : 'Non proprio. '}</strong>${inline(q.why || '', 'w')}</p>`}</div>
        ${pick !== null && html`<div className="ll-row"><button className="ll-btn" onClick=${next}>${k < n - 1 ? 'Prossima domanda' : 'Vedi il risultato'}</button></div>`}
      </div>` : html`<div className="lx-quiz-end">
        <div className="lx-stars" role="img" aria-label=${st + ' stelle su 3'}>${[0, 1, 2].map(function (i) { return html`<i key=${i} className=${i < st ? 'is-on' : ''} style=${{ '--i': i }}></i>`; })}</div>
        <b className="lx-score">${ok} / ${n}</b>
        <p className=${st === 3 ? 'll-why is-ok' : 'lx-quiz-msg'}>${st === 3 ? (p.perfetto || 'Perfetto: avete capito tutto!') : st === 2 ? (p.bene || 'Bene! Ancora un piccolo ripasso.') : (p.ripasso || 'Riprendiamo insieme i concetti chiave.')}</p>
        <div className="ll-row"><button className="ll-btn ll-btn--ghost" onClick=${function () { setK(0); setRes([]); setPick(null); }}>Rifate il quiz</button></div>
      </div>`}
    </div>`;
  });

  /* ---------- IDEE DA PORTARE A CASA: una alla volta (effetto Zeigarnik) ---------- */
  LL.blocco('idee', function (p) {
    var I = p.idee || [], s = useState(0), n = s[0], setN = s[1];
    function tocca() { if (n < I.length) { setN(n + 1); if (n + 1 === I.length) { cheer(); festa(); } } else setN(0); }
    return html`<div className="lx-take">
      ${p.titolo && html`<h3 className="ll-block-h">${inline(p.titolo, 't')}</h3>`}
      <ol className="lx-take-l" aria-live="polite">${I.map(function (t, i) { return html`<li key=${i} className=${i < n ? 'is-on' : ''} aria-hidden=${i >= n}><span>${i + 1}</span><p>${i < n ? inline(t, 'i' + i) : ''}</p></li>`; })}</ol>
      <div className="ll-row"><button className=${'ll-btn' + (n === I.length ? ' ll-btn--ghost' : '')} onClick=${tocca}>${!n ? (p.pulsante || 'Rivela la prima idea') : n < I.length ? 'Rivela la prossima · ' + (n + 1) + ' di ' + I.length : 'Ricomincia'}</button></div>
    </div>`;
  });

  /* ---------- CONTINUA: rimandi finali (giochi, compito, da capo) ---------- */
  LL.blocco('continua', function (p, ctx) {
    function fai(v) { if (v.vai === 'giochi') ctx.gioca(v.gioco); else if (v.vai === 'inizio') ctx.vai(0); else if (typeof v.vai === 'number') ctx.vai(v.vai - 1); else if (v.vai) w.location.href = v.vai; }
    return html`<div className="lx-next">${(p.voci || []).map(function (v, i) {
      var inn = [html`<b key="b">${v.t}</b>`, html`<span key="s">${inline(v.d || '', 'd' + i)}</span>`];
      return v.vai
        ? html`<button key=${i} type="button" className=${'lx-box' + (v.principale ? ' lx-box--main' : '')} onClick=${function () { fai(v); }}>${inn}<i aria-hidden="true">${v.vai === 'inizio' ? '↺' : '→'}</i></button>`
        : html`<div key=${i} className="lx-box">${inn}</div>`;
    })}</div>`;
  });

  /* ---------- ETIMO: la parola chiave si scompone; ogni parte si tocca ---------- */
  LL.blocco('etimo', function (p) {
    var P = p.parti || [], s = useState(function () { return P.map(function () { return false; }); }), o = s[0], setO = s[1], tutte = o.every(Boolean);
    function tocca(i) { var c = o.slice(); c[i] = !c[i]; setO(c); if (c.every(Boolean) && !tutte) say(p.battuta || 'Ecco la storia della parola.'); }
    return html`<div className=${'lx-etym' + (tutte ? ' is-all' : '')}>
      <span className="la-meta">${p.etichetta || 'Da dove viene la parola · toccate le parti'}</span>
      <p className="lx-etym-w">${p.parola}</p>
      <div className="lx-etym-parts">${P.map(function (x, i) { return [i > 0 && html`<span key=${'n' + i} className="lx-etym-plus" aria-hidden="true">${(p.nessi || [])[i - 1] || '+'}</span>`, html`<button key=${'p' + i} type="button" className="lx-etym-p" aria-expanded=${o[i]} onClick=${function () { tocca(i); }}><b>${x.t}</b><small>${inline(x.d || '', 'd' + i)}</small></button>`]; })}</div>
      <div aria-live="polite">${tutte && p.spiegazione && html`<p className="ll-gloss">${inline(p.spiegazione, 's')}</p>`}</div>
    </div>`;
  });

  /* ---------- AGENDA: le fasi della lezione con i minuti; un tocco porta alla fase ---------- */
  LL.blocco('agenda', function (p, ctx) {
    var F = ctx.fasi || [], S = ctx.scene || [];
    return html`<div className="lx-agenda">
      <div className="lx-agenda-h"><b>${p.titolo || 'La lezione di oggi'}</b><span>${ctx.totale}′</span></div>
      ${F.map(function (f, fi) { return html`<button key=${fi} type="button" className="lx-ag" onClick=${function () { ctx.vai(f.idx[0]); }}><i>${fi + 1}</i><span><b>${f.n}</b><small>${f.idx.map(function (k) { return plain(S[k].titolo); }).join(' · ')}</small></span><em>${f.min}′</em></button>`; })}
    </div>`;
  });

  if (LL.blocchi.consegna) LL.blocco('timer', LL.blocchi.consegna);
  LL.attivita = '2026-10-03';
})();
