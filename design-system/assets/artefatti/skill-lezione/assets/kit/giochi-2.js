/* Lab IRC — Giochi aggiuntivi. Caricare dopo giochi.js */
/* Versione per le skill IRC (03/10/2026): i voti del sondaggio restano solo in memoria (Giochi.mem), mai nel browser. */
(function () {
  if (!window.Giochi || !window.GIOCHI_DATI) return;
  var G = window.Giochi, D = window.GIOCHI_DATI, h = G.h, $ = G.$, $$ = G.$$, sfx = G.sfx;
  var shuffle = function (a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; };
  var shake = function (el) { el.classList.remove('is-shake'); void el.offsetWidth; el.classList.add('is-shake'); };

  /* ---------- QUIZ ---------- */
  G.register('quiz', function (root) {
    var Q = D.quiz, qi = 0, LIVES = 3, lives = LIVES, H = G.hud({ lives: true });
    root.appendChild(H.el); H.lives(lives, LIVES);
    var board = h('<div class="g-board g-quiz"><h2 class="g-q"></h2><div class="g-opts"></div><p class="g-why" hidden></p><div class="g-actions"><button class="g-btn" data-next hidden>Avanti →</button></div></div>');
    root.appendChild(board);
    function ask() {
      var q = Q[qi], opts = $('.g-opts', board); H.prog(qi, Q.length, 'Domanda ' + (qi + 1) + ' di ' + Q.length);
      $('.g-q', board).textContent = q.q; $('.g-why', board).hidden = true; $('[data-next]', board).hidden = true; opts.innerHTML = '';
      q.a.forEach(function (a, i) {
        var b = h('<button class="g-opt" type="button"><span class="g-key">' + 'ABCD'[i] + '</span><span></span></button>'); $('span:last-child', b).textContent = a;
        b.onclick = function () { pick(i, b); }; opts.appendChild(b);
      });
      board.classList.remove('is-in'); void board.offsetWidth; board.classList.add('is-in');
    }
    function pick(i, b) {
      var q = Q[qi], right = i === q.ok;
      $$('.g-opt', board).forEach(function (x, k) { x.disabled = true; if (k === q.ok) x.classList.add('is-right'); else if (x !== b) x.classList.add('is-dim'); });
      if (right) { H.score(H.get() + 20, b); sfx.ok(); G.cheer(); } else { b.classList.add('is-wrong'); lives--; H.lives(lives, LIVES); sfx.ko(); G.oops(); }
      var w = $('.g-why', board); w.textContent = q.why; w.hidden = false;
      var n = $('[data-next]', board); n.hidden = false; n.textContent = (qi === Q.length - 1 || lives <= 0) ? 'Vedi il risultato' : 'Avanti →';
    }
    $('[data-next]', board).onclick = function () {
      qi++;
      if (qi < Q.length && lives > 0) return ask();
      H.prog(Q.length, Q.length, 'Fatto');
      G.end(root, { kicker: lives > 0 ? 'Quiz finito' : 'Tentativi finiti', title: lives > 0 ? 'Quiz completato' : 'Game over', score: H.get(), max: Q.length * 20, again: function () { G.mount('quiz'); } });
    };
    H.score(0); ask();
  });

  /* ---------- VERO / FALSO ---------- */
  G.register('vf', function (root) {
    var Q = D.vf, qi = 0, streak = 0, H = G.hud({});
    root.appendChild(H.el);
    var board = h('<div class="g-board g-vf"><div class="g-streak" hidden></div><div class="g-stmt"></div><p class="g-why" hidden></p>' +
      '<div class="g-vf-btns"><button class="g-vf-b" data-v="1" type="button"><b>Vero</b><small>tasto V</small></button><button class="g-vf-b" data-v="0" type="button"><b>Falso</b><small>tasto F</small></button></div>' +
      '<div class="g-actions"><button class="g-btn" data-next hidden>Avanti →</button></div></div>');
    root.appendChild(board);
    function ask() {
      H.prog(qi, Q.length, 'Frase ' + (qi + 1) + ' di ' + Q.length);
      var s = $('.g-stmt', board); s.textContent = Q[qi].s; s.className = 'g-stmt'; void s.offsetWidth; s.classList.add('is-in');
      $('.g-why', board).hidden = true; $('[data-next]', board).hidden = true;
      $$('.g-vf-b', board).forEach(function (b) { b.disabled = false; b.className = 'g-vf-b'; });
    }
    function pick(v) {
      var q = Q[qi], btns = $$('.g-vf-b', board); if (btns[0].disabled) return;
      var b = $('[data-v="' + (v ? 1 : 0) + '"]', board), right = v === q.v;
      btns.forEach(function (x) { x.disabled = true; x.classList.add(+x.dataset.v === +q.v ? 'is-right' : 'is-dim'); });
      if (right) { streak++; H.score(H.get() + 10 * Math.min(streak, 3), b); sfx.ok(); if (streak >= 2) G.say(streak + ' di fila!'); }
      else { streak = 0; b.classList.remove('is-dim'); b.classList.add('is-wrong'); sfx.ko(); G.oops(); }
      var st = $('.g-streak', board); st.hidden = streak < 2; st.textContent = 'Combo ×' + Math.min(streak, 3);
      $('.g-stmt', board).classList.add(right ? 'is-ok' : 'is-ko');
      var w = $('.g-why', board); w.textContent = (q.v ? 'Vero. ' : 'Falso. ') + q.why; w.hidden = false;
      var n = $('[data-next]', board); n.hidden = false; n.textContent = qi === Q.length - 1 ? 'Vedi il risultato' : 'Avanti →';
    }
    $$('.g-vf-b', board).forEach(function (b) { b.onclick = function () { pick(b.dataset.v === '1'); }; });
    root.onkeydown = null;
    var key = function (e) { if (!document.body.contains(board)) return document.removeEventListener('keydown', key); var k = e.key.toLowerCase(); if (k === 'v') pick(true); if (k === 'f') pick(false); };
    document.addEventListener('keydown', key);
    $('[data-next]', board).onclick = function () {
      qi++; if (qi < Q.length) return ask();
      H.prog(Q.length, Q.length, 'Fatto');
      G.end(root, { title: 'Vero o falso?', score: H.get(), max: 10 + 20 + 30 * (Q.length - 2), msg: 'Le risposte di fila valgono di più.', again: function () { G.mount('vf'); } });
    };
    H.score(0); ask();
  });

  /* ---------- ABBINAMENTI ---------- */
  G.register('abbina', function (root) {
    var P = D.abbina, LIVES = 3, lives = LIVES, done = 0, sel = null, H = G.hud({ lives: true });
    root.appendChild(H.el); H.lives(lives, LIVES); H.prog(0, P.length, '0 di ' + P.length + ' coppie');
    var board = h('<div class="g-board g-abbina"><p class="g-note">Tocca un termine a sinistra, poi la frase che gli corrisponde.</p><div class="g-cols"><div class="g-col" data-side="l"></div><div class="g-col" data-side="r"></div></div></div>');
    root.appendChild(board);
    P.forEach(function (p, i) { var b = h('<button class="g-pill" type="button" data-i="' + i + '"></button>'); b.textContent = p[0]; $('[data-side="l"]', board).appendChild(b); });
    shuffle(P.map(function (_, i) { return i; })).forEach(function (i) { var b = h('<button class="g-pill g-pill--r" type="button" data-i="' + i + '"></button>'); b.textContent = P[i][1]; $('[data-side="r"]', board).appendChild(b); });
    $$('[data-side="l"] .g-pill', board).forEach(function (b) {
      b.onclick = function () { $$('[data-side="l"] .g-pill', board).forEach(function (x) { x.classList.remove('is-sel'); }); sel = b; b.classList.add('is-sel'); sfx.tick(); };
    });
    $$('[data-side="r"] .g-pill', board).forEach(function (b) {
      b.onclick = function () {
        if (!sel) { shake(b); return G.say('Prima scegli un termine a sinistra.'); }
        if (sel.dataset.i === b.dataset.i) {
          done++; var c = 'g-pair-' + done; [sel, b].forEach(function (x) { x.classList.remove('is-sel'); x.classList.add('is-done', c); x.disabled = true; x.dataset.n = done; });
          H.score(H.get() + 20, b); sfx.ok(); sel = null; H.prog(done, P.length, done + ' di ' + P.length + ' coppie');
          if (done === P.length) setTimeout(function () { G.end(root, { title: 'Tutte le coppie!', score: H.get(), max: P.length * 20, again: function () { G.mount('abbina'); } }); }, 500);
        } else {
          shake(b); shake(sel); lives--; H.lives(lives, LIVES); H.score(Math.max(0, H.get() - 5), b); sfx.ko(); G.oops();
          if (lives <= 0) setTimeout(function () { G.end(root, { kicker: 'Tentativi finiti', title: 'Game over', score: H.get(), max: P.length * 20, again: function () { G.mount('abbina'); } }); }, 500);
        }
      };
    });
    H.score(0);
  });

  /* ---------- SEQUENZA ---------- */
  G.register('seq', function (root) {
    var S = D.seq, tries = 0, H = G.hud({});
    root.appendChild(H.el); H.prog(0, S.length, 'Metti in ordine dal più antico');
    var board = h('<div class="g-board g-seq"><ol class="g-seq-list"></ol><div class="g-actions"><span class="g-note">Usa le frecce o trascina.</span><button class="g-btn" data-check>Controlla</button></div></div>');
    root.appendChild(board);
    var list = $('ol', board), order = shuffle(S.map(function (_, i) { return i; }));
    if (order.every(function (v, i) { return v === i; })) order.reverse();
    order.forEach(function (i) {
      var li = h('<li class="g-seq-item" draggable="true" data-i="' + i + '"><span class="g-seq-n"></span><span class="g-seq-t"></span><span class="g-seq-y">' + S[i].y + '</span><span class="g-seq-mv"><button type="button" data-mv="-1" aria-label="Su">↑</button><button type="button" data-mv="1" aria-label="Giù">↓</button></span></li>');
      $('.g-seq-t', li).textContent = S[i].t; list.appendChild(li);
    });
    function renum() { $$('.g-seq-item', list).forEach(function (li, k) { $('.g-seq-n', li).textContent = k + 1; }); }
    function locked(li) { return li && li.classList.contains('is-ok'); }
    list.addEventListener('click', function (e) {
      var b = e.target.closest('[data-mv]'); if (!b) return; var li = b.closest('li'); if (locked(li)) return;
      var dir = +b.dataset.mv, sib = dir < 0 ? li.previousElementSibling : li.nextElementSibling;
      while (sib && locked(sib)) sib = dir < 0 ? sib.previousElementSibling : sib.nextElementSibling;
      if (!sib) return;
      if (dir < 0) list.insertBefore(li, sib); else list.insertBefore(li, sib.nextElementSibling);
      li.classList.remove('is-moved'); void li.offsetWidth; li.classList.add('is-moved'); $$('.is-wrong', list).forEach(function (x) { x.classList.remove('is-wrong'); }); sfx.tick(); renum();
    });
    var drag = null;
    list.addEventListener('dragstart', function (e) { var li = e.target.closest('li'); if (locked(li)) return e.preventDefault(); drag = li; li.classList.add('is-drag'); });
    list.addEventListener('dragend', function () { if (drag) drag.classList.remove('is-drag'); drag = null; renum(); });
    list.addEventListener('dragover', function (e) {
      e.preventDefault(); var over = e.target.closest('li'); if (!drag || !over || over === drag || locked(over)) return;
      var r = over.getBoundingClientRect(); list.insertBefore(drag, e.clientY > r.top + r.height / 2 ? over.nextElementSibling : over);
    });
    $('[data-check]', board).onclick = function () {
      tries++; var items = $$('.g-seq-item', list), ok = 0;
      items.forEach(function (li, k) { var r = +li.dataset.i === k; li.classList.toggle('is-ok', r); li.classList.toggle('is-wrong', !r); li.draggable = !r; if (r) ok++; });
      H.prog(ok, S.length, ok + ' di ' + S.length + ' al posto giusto · tentativo ' + tries);
      if (ok === S.length) { var sc = Math.max(20, 120 - (tries - 1) * 20); H.score(sc, this); sfx.win();
        setTimeout(function () { G.end(root, { title: 'Linea del tempo completa', score: sc, max: 120, msg: tries === 1 ? 'Al primo tentativo!' : 'In ' + tries + ' tentativi.', again: function () { G.mount('seq'); } }); }, 700);
      } else { sfx.ko(); G.say(ok ? ok + ' al posto giusto. Sposta le altre.' : 'Nessuna al posto giusto. Coraggio!'); }
    };
    renum(); H.score(0);
  });

  /* ---------- CATEGORIE ---------- */
  G.register('cat', function (root) {
    var C = D.cat, LIVES = 3, lives = LIVES, done = 0, sel = null, H = G.hud({ lives: true });
    root.appendChild(H.el); H.lives(lives, LIVES); H.prog(0, C.items.length, '0 di ' + C.items.length + ' frasi');
    var board = h('<div class="g-board g-cat"><div class="g-pool"></div><div class="g-bins">' + C.bins.map(function (b, i) { return '<div class="g-bin" data-b="' + i + '" role="button" tabindex="0"><span class="g-bin-h">' + b + '</span><div class="g-bin-in"></div></div>'; }).join('') + '</div></div>');
    root.appendChild(board);
    shuffle(C.items).forEach(function (it) { var c = h('<button class="g-chip-d" type="button" draggable="true" data-b="' + it[1] + '"></button>'); c.textContent = it[0]; $('.g-pool', board).appendChild(c); });
    function choose(c) { $$('.g-chip-d', board).forEach(function (x) { x.classList.remove('is-sel'); }); sel = c; if (c) { c.classList.add('is-sel'); sfx.tick(); } board.classList.toggle('is-picking', !!c); }
    function drop(bin) {
      if (!sel) return G.say('Tocca prima una frase.');
      var c = sel; choose(null);
      if (c.dataset.b === bin.dataset.b) {
        $('.g-bin-in', bin).appendChild(c); c.disabled = true; c.draggable = false; c.classList.add('is-in'); done++;
        H.score(H.get() + 10, bin); sfx.ok(); H.prog(done, C.items.length, done + ' di ' + C.items.length + ' frasi');
        if (done === C.items.length) setTimeout(function () { G.cheer(); G.end(root, { title: 'Tutto al suo posto', score: H.get(), max: C.items.length * 10, again: function () { G.mount('cat'); } }); }, 500);
      } else {
        shake(bin); shake(c); lives--; H.lives(lives, LIVES); sfx.ko(); G.oops();
        if (lives <= 0) setTimeout(function () { G.end(root, { kicker: 'Tentativi finiti', title: 'Game over', score: H.get(), max: C.items.length * 10, again: function () { G.mount('cat'); } }); }, 500);
      }
    }
    board.addEventListener('click', function (e) {
      var c = e.target.closest('.g-chip-d'); if (c && !c.disabled) return choose(sel === c ? null : c);
      var b = e.target.closest('.g-bin'); if (b) drop(b);
    });
    board.addEventListener('dragstart', function (e) { var c = e.target.closest('.g-chip-d'); if (c) { choose(c); e.dataTransfer.setData('text', ''); } });
    $$('.g-bin', board).forEach(function (b) {
      b.addEventListener('dragover', function (e) { e.preventDefault(); b.classList.add('is-over'); });
      b.addEventListener('dragleave', function () { b.classList.remove('is-over'); });
      b.addEventListener('drop', function (e) { e.preventDefault(); b.classList.remove('is-over'); drop(b); });
      b.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); drop(b); } });
    });
    H.score(0); G.say('Tocca una frase, poi il contenitore giusto.');
  });

  /* ---------- MEMORY ---------- */
  G.register('memory', function (root) {
    var P = D.memory, moves = 0, found = 0, open = [], busy = false, sec = 0, H = G.hud({ timer: true });
    root.appendChild(H.el); H.prog(0, P.length, '0 di ' + P.length + ' coppie · 0 mosse');
    var cards = shuffle([].concat.apply([], P.map(function (p, i) { return [{ t: p[0], i: i, k: 'a' }, { t: p[1], i: i, k: 'b' }]; })));
    var board = h('<div class="g-board g-memory"><div class="g-mem-grid"></div></div>'); root.appendChild(board);
    cards.forEach(function (c) {
      var b = h('<button class="g-mem" type="button" aria-label="Carta coperta"><span class="g-mem-in"><span class="g-mem-f g-mem-back">?</span><span class="g-mem-f g-mem-face g-mem-' + c.k + '"></span></span></button>');
      $('.g-mem-face', b).textContent = c.t; b._c = c; $('.g-mem-grid', board).appendChild(b);
      b.onclick = function () {
        if (busy || b.classList.contains('is-open')) return;
        b.classList.add('is-open'); b.setAttribute('aria-label', c.t); sfx.flip(); open.push(b);
        if (open.length < 2) return;
        moves++; busy = true; var a = open[0], z = open[1];
        if (a._c.i === z._c.i) {
          found++; setTimeout(function () { a.classList.add('is-match'); z.classList.add('is-match'); sfx.ok(); H.score(H.get() + 20, z); open = []; busy = false;
            if (found === P.length) { G.clear(); var bonus = Math.max(0, 60 - (moves - P.length) * 5); H.score(H.get() + bonus);
              setTimeout(function () { G.end(root, { title: 'Memoria d’acciaio', score: H.get(), max: P.length * 20 + 60, msg: moves + ' mosse · ' + Math.floor(sec / 60) + ':' + ('0' + sec % 60).slice(-2), again: function () { G.mount('memory'); } }); }, 600); }
          }, 350);
        } else setTimeout(function () { a.classList.remove('is-open'); z.classList.remove('is-open'); a.setAttribute('aria-label', 'Carta coperta'); z.setAttribute('aria-label', 'Carta coperta'); open = []; busy = false; }, 900);
        H.prog(found + (a._c.i === z._c.i ? 1 : 0), P.length, (found + (a._c.i === z._c.i ? 1 : 0)) + ' di ' + P.length + ' coppie · ' + moves + ' mosse');
      };
    });
    G.every(1000, function () { H.time(++sec); });
    H.score(0); G.say('Trova il termine e la sua definizione.');
  });

  /* ---------- COMPLETA IL TESTO ---------- */
  G.register('completa', function (root) {
    var C = D.completa, LIVES = 3, lives = LIVES, active = null, H = G.hud({ lives: true });
    var answers = [], html = C.testo.replace(/\{([^}]+)\}/g, function (_, w) { answers.push(w); return '<button class="g-blank" type="button" data-k="' + (answers.length - 1) + '"></button>'; });
    root.appendChild(H.el); H.lives(lives, LIVES); H.prog(0, answers.length, '0 di ' + answers.length + ' spazi');
    var board = h('<div class="g-board g-completa"><p class="g-text">' + html + '</p><div class="g-bank"></div><div class="g-actions"><button class="g-btn" data-check>Controlla</button></div></div>');
    root.appendChild(board);
    shuffle(answers.concat(C.extra)).forEach(function (wd) { var b = h('<button class="g-word" type="button"></button>'); b.textContent = wd; $('.g-bank', board).appendChild(b); });
    var blanks = $$('.g-blank', board);
    function setActive(b) { blanks.forEach(function (x) { x.classList.toggle('is-active', x === b); }); active = b; }
    function nextEmpty() { return blanks.filter(function (x) { return !x.dataset.w && !x.classList.contains('is-ok'); })[0] || null; }
    blanks.forEach(function (b) { b.onclick = function () {
      if (b.classList.contains('is-ok')) return;
      if (b.dataset.w) { var w = $$('.g-word', board).filter(function (x) { return x.textContent === b.dataset.w && x.disabled; })[0]; if (w) w.disabled = false; b.dataset.w = ''; b.textContent = ''; b.classList.remove('is-wrong'); }
      setActive(b); sfx.tick();
    }; });
    $$('.g-word', board).forEach(function (w) { w.onclick = function () {
      var b = active && !active.dataset.w ? active : nextEmpty(); if (!b) return G.say('Tutti gli spazi sono pieni: controlla!');
      b.dataset.w = w.textContent; b.textContent = w.textContent; b.classList.remove('is-wrong'); w.disabled = true; sfx.tick(); setActive(nextEmpty());
    }; });
    $('[data-check]', board).onclick = function () {
      var wrong = 0, gained = 0;
      blanks.forEach(function (b) {
        if (!b.dataset.w || b.classList.contains('is-ok')) return;
        if (b.dataset.w === answers[+b.dataset.k]) { b.classList.add('is-ok'); gained += 15; } else { b.classList.add('is-wrong'); wrong++; }
      });
      var ok = blanks.filter(function (b) { return b.classList.contains('is-ok'); }).length;
      H.prog(ok, answers.length, ok + ' di ' + answers.length + ' spazi');
      if (gained) { H.score(H.get() + gained, this); sfx.ok(); }
      if (wrong) { lives--; H.lives(lives, LIVES); sfx.ko(); G.oops(); }
      if (!gained && !wrong) G.say('Riempi almeno uno spazio.');
      if (ok === answers.length) setTimeout(function () { G.end(root, { title: 'Testo completo', score: H.get(), max: answers.length * 15, again: function () { G.mount('completa'); } }); }, 500);
      else if (lives <= 0) { blanks.forEach(function (b) { if (!b.classList.contains('is-ok')) { b.textContent = answers[+b.dataset.k]; b.classList.remove('is-wrong'); b.classList.add('is-shown'); } });
        setTimeout(function () { G.end(root, { kicker: 'Tentativi finiti', title: 'Ecco il testo', score: H.get(), max: answers.length * 15, again: function () { G.mount('completa'); } }); }, 1400); }
    };
    setActive(blanks[0]); H.score(0);
  });

  /* ---------- SONDAGGIO ---------- */
  G.register('sondaggio', function (root) {
    var S = D.sondaggio, qi = 0, votes = G.mem.sondaggio || (G.mem.sondaggio = {}), shown = false, last = -1, H = G.hud({});
    root.appendChild(H.el);
    var board = h('<div class="g-board g-poll"><span class="g-label">Sondaggio di classe · anonimo</span><h2 class="g-q"></h2><div class="g-poll-opts"></div>' +
      '<div class="g-debate" hidden><span class="g-label">Per il dibattito</span><p></p></div>' +
      '<div class="g-actions"><span class="g-note" data-tot></span><button class="g-btn g-btn--ghost" data-reset>Azzera</button><button class="g-btn g-btn--ghost" data-show>Mostra risultati</button><button class="g-btn" data-next>Prossima →</button></div></div>');
    root.appendChild(board);
    function v() { return votes[qi] = votes[qi] || S[qi].a.map(function () { return 0; }); }
    function draw() {
      var q = S[qi], vv = v(), tot = vv.reduce(function (a, b) { return a + b; }, 0), max = Math.max.apply(null, vv);
      H.prog(qi + 1, S.length, 'Domanda ' + (qi + 1) + ' di ' + S.length); H.score(tot);
      $('.g-q', board).textContent = q.q; board.classList.toggle('is-shown', shown);
      var box = $('.g-poll-opts', board); box.innerHTML = '';
      q.a.forEach(function (a, i) {
        var pct = tot ? Math.round(vv[i] / tot * 100) : 0;
        var row = h('<div class="g-poll-row' + (shown && tot && vv[i] === max ? ' is-top' : '') + (i === last ? ' is-voted' : '') + '"><button class="g-poll-b" type="button"><span class="g-poll-ok" aria-hidden="true">✓ Votato</span><span class="g-poll-bar" style="width:' + (shown ? pct : 0) + '%"></span><span class="g-poll-a"></span><span class="g-poll-res">' + (shown ? '<b class="g-num g-num--sm">' + pct + '%</b><small class="g-poll-n">' + vv[i] + (vv[i] === 1 ? ' voto' : ' voti') + '</small>' : '') + '</span></button><button class="g-poll-minus" type="button" aria-label="Togli un voto">−</button></div>');
        $('.g-poll-a', row).textContent = a;
        $('.g-poll-b', row).onclick = function (e) { vv[i]++; G.mem.sondaggio = votes; sfx.coin(); G.pop(e.currentTarget, '+1', true); last = i; draw(); };
        $('.g-poll-minus', row).onclick = function () { if (vv[i] > 0) { vv[i]--; G.mem.sondaggio = votes; draw(); } };
        box.appendChild(row);
      });
      var tn = $('[data-tot]', board); tn.setAttribute('aria-live', 'polite');
      tn.innerHTML = (last > -1 ? '<b class="g-poll-reg">✓ Voto registrato</b> · ' : '') + tot + (tot === 1 ? ' voto' : ' voti');
      last = -1;
      $('[data-show]', board).textContent = shown ? 'Nascondi risultati' : 'Mostra risultati';
      var db = $('.g-debate', board); db.hidden = !shown; $('p', db).textContent = q.dibattito;
      $('[data-next]', board).textContent = qi === S.length - 1 ? 'Ricomincia' : 'Prossima →';
    }
    $('[data-show]', board).onclick = function () { shown = !shown; if (shown) sfx.win(); draw(); };
    $('[data-reset]', board).onclick = function () { votes[qi] = null; G.mem.sondaggio = votes; shown = false; draw(); };
    $('[data-next]', board).onclick = function () { qi = (qi + 1) % S.length; shown = false; draw(); };
    $('.g-hud-score .g-label', H.el).textContent = 'Voti';
    draw(); G.say('Ognuno tocca la sua risposta. I risultati restano nascosti finché non li mostri.');
  });
})();
