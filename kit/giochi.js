/* Lab IRC — Motore giochi (stile Arcade). Richiede i dati della lezione (window.GIOCHI_DATI) e, facoltativo, lab-artefatto.js */
(function () {
  var d = document, w = window, D = w.GIOCHI_DATI;
  var $ = function (s, r) { return (r || d).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || d).querySelectorAll(s)); };
  var h = function (html) { var t = d.createElement('template'); t.innerHTML = html.trim(); return t.content.firstChild; };
  var say = function (t) { w.LabArtefatto && w.LabArtefatto.say(t); };
  var cheer = function () { w.LabArtefatto && w.LabArtefatto.cheer(); };
  var oops = function () { w.LabArtefatto && w.LabArtefatto.oops(); };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  /* Nel visore del sito (iframe sandbox) localStorage non è disponibile: si ripiega sulla memoria della pagina. */
  var mem = {};
  var store = { get: function (k, v) { var x; try { x = localStorage.getItem(k); } catch (e) { x = mem[k]; } if (x == null) return v; try { return JSON.parse(x); } catch (e) { return v; } },
    set: function (k, v) { var x = JSON.stringify(v); mem[k] = x; try { localStorage.setItem(k, x); } catch (e) {} } };

  /* ---------- suoni ---------- */
  var ac = null, muted = store.get('giochi_muto', false);
  function tone(freqs, dur, gap) {
    if (muted) return;
    try { ac = ac || new (w.AudioContext || w.webkitAudioContext)(); } catch (e) { return; }
    var t0 = ac.currentTime;
    freqs.forEach(function (f, i) {
      var o = ac.createOscillator(), g = ac.createGain(), t = t0 + i * (gap || dur);
      o.type = 'square'; o.frequency.value = f;
      g.gain.setValueAtTime(.06, t); g.gain.exponentialRampToValueAtTime(.0001, t + dur);
      o.connect(g); g.connect(ac.destination); o.start(t); o.stop(t + dur + .02);
    });
  }
  var sfx = {
    ok: function () { tone([660, 990], .12, .08); }, ko: function () { tone([196, 147], .18, .12); },
    tick: function () { tone([1320], .03); }, flip: function () { tone([520], .05); },
    win: function () { tone([523, 659, 784, 1047], .18, .11); }, coin: function () { tone([988, 1319], .07, .05); }
  };

  /* ---------- HUD ---------- */
  var timers = [];
  function clearTimers() { timers.forEach(clearInterval); timers = []; }
  function every(ms, fn) { var id = setInterval(fn, ms); timers.push(id); return id; }

  function hud(opts) {
    var el = h('<div class="g-hud">' +
      '<div class="g-hud-score"><span class="g-label">Punti</span><b class="g-num" data-score>0</b></div>' +
      '<div class="g-hud-prog"><div class="g-prog"><i></i></div><span class="g-label" data-prog></span></div>' +
      '<div class="g-hud-side">' + (opts.lives ? '<span class="g-lives" aria-label="Tentativi"></span>' : '') +
      (opts.timer ? '<span class="g-clock"><span class="g-label">Tempo</span><b class="g-num g-num--sm" data-time>0:00</b></span>' : '') + '</div></div>');
    var score = 0, shown = 0, raf;
    var api = {
      el: el,
      score: function (v, from) {
        var delta = v - score; score = v;
        var s = $('[data-score]', el); s.classList.remove('is-pop'); void s.offsetWidth; s.classList.add('is-pop');
        if (delta && from) popAt(from, (delta > 0 ? '+' : '') + delta, delta > 0);
        cancelAnimationFrame(raf);
        (function step() { shown += Math.sign(score - shown) * Math.max(1, Math.round(Math.abs(score - shown) / 6)); s.textContent = shown; if (shown !== score) raf = requestAnimationFrame(step); })();
      },
      get: function () { return score; },
      prog: function (n, tot, label) { $('.g-prog i', el).style.width = (tot ? n / tot * 100 : 0) + '%'; $('[data-prog]', el).textContent = label || (n + ' / ' + tot); },
      lives: function (n, max) { var l = $('.g-lives', el); if (!l) return; l.innerHTML = ''; for (var i = 0; i < max; i++) l.appendChild(h('<i class="g-life' + (i < n ? '' : ' is-lost') + '"></i>')); },
      time: function (sec) { var t = $('[data-time]', el); if (t) t.textContent = Math.floor(sec / 60) + ':' + ('0' + sec % 60).slice(-2); }
    };
    return api;
  }

  function popAt(target, text, good) {
    var r = target.getBoundingClientRect(), p = h('<span class="g-float' + (good ? '' : ' is-bad') + '">' + text + '</span>');
    p.style.left = (r.left + r.width / 2) + 'px'; p.style.top = (r.top + 8) + 'px';
    d.body.appendChild(p); setTimeout(function () { p.remove(); }, 1200);
  }

  function endScreen(root, o) {
    var pct = o.max ? o.score / o.max : 1, stars = pct >= .85 ? 3 : pct >= .5 ? 2 : 1;
    var el = h('<div class="g-end" role="dialog" aria-label="Risultato"><div class="g-end-in">' +
      '<span class="g-label">' + esc(o.kicker || 'Partita finita') + '</span>' +
      '<h2 class="g-end-title">' + esc(o.title) + '</h2>' +
      (o.hideScore ? '' : '<div class="g-stars">' + [1, 2, 3].map(function (i) { return '<i class="' + (i <= stars ? 'is-on' : '') + '" style="--i:' + i + '"></i>'; }).join('') + '</div>' +
      '<b class="g-num g-num--xl">' + o.score + (o.max ? '<small> / ' + o.max + '</small>' : '') + '</b>') +
      (o.msg ? '<p class="g-end-msg">' + esc(o.msg) + '</p>' : '') +
      '<div class="g-actions"><button class="g-btn" data-again>Gioca ancora</button></div></div></div>');
    root.appendChild(el);
    $('[data-again]', el).onclick = o.again;
    sfx.win(); say(stars === 3 ? 'Impeccabile!' : stars === 2 ? 'Bel lavoro, quasi perfetto.' : 'Si impara giocando. Riproviamo?');
  }

  /* ---------- 1 · FLASHCARD ---------- */
  function flash(root) {
    var cards = D.flash, queue = cards.map(function (_, i) { return i; }), missed = {}, done = 0, H = hud({});
    root.appendChild(H.el);
    var board = h('<div class="g-board g-flash">' +
      '<div class="g-deck"><button class="g-card" type="button" aria-label="Gira la carta"><span class="g-card-in">' +
      '<span class="g-face g-front"><span class="g-label">Termine</span><span class="g-term"></span><span class="g-hint">Tocca per girare</span></span>' +
      '<span class="g-face g-back"><span class="g-label">Definizione</span><span class="g-def"></span></span></span></button></div>' +
      '<div class="g-actions"><button class="g-btn g-btn--ghost" data-a="rip" disabled>Da ripassare</button><button class="g-btn" data-a="ok" disabled>Lo sapevo</button></div></div>');
    root.appendChild(board);
    var card = $('.g-card', board), deck = $('.g-deck', board);
    function show() {
      if (!queue.length) { return endScreen(root, { title: 'Mazzo completato', score: H.get(), max: cards.length * 10, msg: Object.keys(missed).length ? 'Da ripassare: ' + Object.keys(missed).map(function (i) { return cards[i][0]; }).join(', ') + '.' : 'Tutte al primo colpo.', again: restart }); }
      var c = cards[queue[0]];
      card.classList.remove('is-flipped'); card.classList.remove('is-in'); void card.offsetWidth; card.classList.add('is-in');
      $('.g-term', board).textContent = c[0]; $('.g-def', board).textContent = c[1];
      deck.style.setProperty('--left', Math.min(queue.length - 1, 3));
      $$('[data-a]', board).forEach(function (b) { b.disabled = true; });
      H.prog(done, cards.length, done + ' di ' + cards.length + ' imparate');
    }
    function flip() { card.classList.toggle('is-flipped'); sfx.flip(); $$('[data-a]', board).forEach(function (b) { b.disabled = false; }); }
    card.onclick = flip;
    $('[data-a="ok"]', board).onclick = function (e) {
      var i = queue.shift(); done++;
      if (!missed[i]) { H.score(H.get() + 10, e.currentTarget); sfx.coin(); if (done % 3 === 0) cheer(); } else sfx.ok();
      card.classList.add('is-out-r'); setTimeout(function () { card.classList.remove('is-out-r'); show(); }, 280);
    };
    $('[data-a="rip"]', board).onclick = function () {
      var i = queue.shift(); missed[i] = 1; queue.push(i); sfx.flip();
      card.classList.add('is-out-l'); setTimeout(function () { card.classList.remove('is-out-l'); show(); }, 280);
    };
    function restart() { mount('flash'); }
    H.score(0); show();
    say('Leggi il termine, prova a dire la definizione, poi gira.');
  }

  /* ---------- 2 · CRUCIVERBA ---------- */
  function cruci(root) {
    var C = D.cruci, cells = {}, LIVES = 3, lives = LIVES, solved = {}, active = 0, sec = 0, over = false;
    var H = hud({ lives: true, timer: true });
    root.appendChild(H.el); H.lives(lives, LIVES); H.prog(0, C.words.length, '0 di ' + C.words.length + ' parole');
    C.words.forEach(function (wd, wi) {
      for (var k = 0; k < wd.w.length; k++) {
        var r = wd.r + (wd.dir === 'v' ? k : 0), c = wd.c + (wd.dir === 'o' ? k : 0), key = r + ',' + c;
        cells[key] = cells[key] || { r: r, c: c, ch: wd.w[k], words: [] };
        cells[key].words.push(wi); if (k === 0) cells[key].num = wd.n;
      }
    });
    var board = h('<div class="g-board g-cruci"><div class="g-grid" style="--cols:' + C.cols + ';--rows:' + C.rows + '"></div>' +
      '<div class="g-clues"><div><span class="g-label">Orizzontali</span><ol data-dir="o"></ol></div><div><span class="g-label">Verticali</span><ol data-dir="v"></ol></div>' +
      '<div class="g-actions"><button class="g-btn g-btn--ghost" data-help>Svela una lettera · −5</button><button class="g-btn" data-check>Controlla</button></div></div></div>');
    root.appendChild(board);
    var grid = $('.g-grid', board);
    for (var r = 0; r < C.rows; r++) for (var c = 0; c < C.cols; c++) {
      var cl = cells[r + ',' + c];
      if (!cl) { grid.appendChild(h('<span class="g-cell is-void"></span>')); continue; }
      var el = h('<label class="g-cell">' + (cl.num ? '<small>' + cl.num + '</small>' : '') + '<input maxlength="1" autocomplete="off" autocapitalize="characters" spellcheck="false" aria-label="Riga ' + (r + 1) + ' colonna ' + (c + 1) + '"></label>');
      cl.el = el; cl.inp = $('input', el); grid.appendChild(el);
      (function (cl) {
        cl.inp.addEventListener('focus', function () { if (cl.words.indexOf(active) < 0) setActive(cl.words[0]); else paint(); });
        cl.inp.addEventListener('click', function () { if (cl.words.length > 1 && d.activeElement === cl.inp && cl._clicked) setActive(cl.words[(cl.words.indexOf(active) + 1) % cl.words.length]); cl._clicked = true; });
        cl.inp.addEventListener('blur', function () { cl._clicked = false; });
        cl.inp.addEventListener('input', function () {
          cl.inp.value = cl.inp.value.replace(/[^a-zà-ù]/gi, '').toUpperCase().slice(-1);
          cl.el.classList.remove('is-wrong'); if (cl.inp.value) { sfx.tick(); move(cl, 1); }
        });
        cl.inp.addEventListener('keydown', function (e) {
          if (e.key === 'Backspace' && !cl.inp.value) { e.preventDefault(); move(cl, -1, true); }
          if (e.key === 'Enter') check();
        });
      })(cl);
    }
    C.words.forEach(function (wd, wi) {
      var li = h('<li><button type="button"><b>' + wd.n + '</b><span>' + esc(wd.clue) + ' <em>(' + wd.w.length + ')</em></span></button></li>');
      $('button', li).onclick = function () { setActive(wi); cellsOf(wi)[0].inp.focus(); };
      wd.li = li; $('ol[data-dir="' + wd.dir + '"]', board).appendChild(li);
    });
    function cellsOf(wi) { var wd = C.words[wi], out = []; for (var k = 0; k < wd.w.length; k++) out.push(cells[(wd.r + (wd.dir === 'v' ? k : 0)) + ',' + (wd.c + (wd.dir === 'o' ? k : 0))]); return out; }
    function setActive(wi) { active = wi; paint(); }
    function paint() {
      Object.keys(cells).forEach(function (k) { cells[k].el.classList.remove('is-active'); });
      cellsOf(active).forEach(function (cl) { cl.el.classList.add('is-active'); });
      C.words.forEach(function (wd, wi) { wd.li.classList.toggle('is-active', wi === active); wd.li.classList.toggle('is-done', !!solved[wi]); });
    }
    function move(cl, dir, erase) {
      var list = cellsOf(active), i = list.indexOf(cl), nx = list[i + dir];
      if (nx) { nx.inp.focus(); if (erase) nx.inp.value = ''; }
    }
    function check() {
      if (over) return;
      var wrong = 0, gained = 0;
      C.words.forEach(function (wd, wi) {
        var cs = cellsOf(wi), full = cs.every(function (x) { return x.inp.value; });
        if (!full || solved[wi]) return;
        var ok = cs.every(function (x) { return x.inp.value === x.ch; });
        if (ok) { solved[wi] = 1; gained += 20; cs.forEach(function (x) { x.el.classList.add('is-ok'); x.inp.readOnly = true; }); }
        else cs.forEach(function (x) { if (x.inp.value !== x.ch) { x.el.classList.add('is-wrong'); wrong++; } });
      });
      var n = Object.keys(solved).length;
      H.prog(n, C.words.length, n + ' di ' + C.words.length + ' parole');
      if (gained) { H.score(H.get() + gained, $('[data-check]', board)); sfx.ok(); cheer(); }
      if (wrong) { lives--; H.lives(lives, LIVES); sfx.ko(); oops(); grid.classList.remove('is-shake'); void grid.offsetWidth; grid.classList.add('is-shake'); }
      if (!gained && !wrong) say('Completa almeno una parola, poi controlla.');
      paint();
      if (n === C.words.length) finish(true); else if (lives <= 0) finish(false);
    }
    function finish(win) {
      over = true; clearTimers();
      Object.keys(cells).forEach(function (k) { var x = cells[k]; if (!win && x.inp.value !== x.ch) { x.inp.value = x.ch; x.el.classList.add('is-shown'); } x.inp.readOnly = true; });
      var bonus = win ? Math.max(0, 60 - Math.floor(sec / 5)) : 0;
      if (bonus) H.score(H.get() + bonus);
      setTimeout(function () {
        endScreen(root, { kicker: win ? 'Cruciverba risolto' : 'Tentativi finiti', title: win ? 'Tutte le parole!' : 'Ecco la soluzione', score: H.get(), max: C.words.length * 20 + 60,
          msg: win ? 'Tempo ' + Math.floor(sec / 60) + ':' + ('0' + sec % 60).slice(-2) + ' · bonus velocità +' + bonus : 'Rileggi le definizioni e riprova.', again: function () { mount('cruci'); } });
      }, win ? 500 : 1400);
    }
    $('[data-check]', board).onclick = check;
    $('[data-help]', board).onclick = function (e) {
      if (over) return;
      var miss = cellsOf(active).filter(function (x) { return x.inp.value !== x.ch; });
      if (!miss.length) return say('Questa parola è già giusta: controlla!');
      var x = miss[0]; x.inp.value = x.ch; x.el.classList.remove('is-wrong'); x.el.classList.add('is-shown');
      H.score(Math.max(0, H.get() - 5), e.currentTarget); sfx.flip();
    };
    every(1000, function () { if (!over) H.time(++sec); });
    var first = 0; while (first < C.words.length - 1 && C.words[first].dir !== 'o') first++;
    H.score(0); setActive(first);
    say('Tocca una definizione o una casella. Tocca di nuovo per cambiare direzione.');
  }

  /* ---------- 3 · SFIDA A SQUADRE ---------- */
  function sfida(root) {
    var Q = D.sfida, names = store.get('giochi_squadre', ['Squadra Viola', 'Squadra Ciano']);
    var setup = h('<div class="g-board g-setup"><span class="g-label">Sfida a squadre · ' + Q.length + ' domande</span>' +
      '<h2 class="g-h">Chi gioca?</h2><div class="g-teams-in">' +
      names.map(function (n, i) { return '<label class="g-team-in" data-t="' + i + '"><span class="g-label">Squadra ' + (i + 1) + '</span><input value="' + esc(n) + '" maxlength="22"></label>'; }).join('') +
      '</div><p class="g-note">A turno. 20 secondi per rispondere. Se sbagliate, l’altra squadra può rubare la domanda per metà punti.</p>' +
      '<div class="g-actions"><button class="g-btn" data-go>Si comincia</button></div></div>');
    root.appendChild(setup);
    $('[data-go]', setup).onclick = function () {
      names = $$('input', setup).map(function (x, i) { return x.value.trim() || ('Squadra ' + (i + 1)); });
      store.set('giochi_squadre', names); setup.remove(); play();
    };
    function play() {
      var pts = [0, 0], qi = 0, turn = 0;
      var top = h('<div class="g-hud g-hud--teams">' + names.map(function (n, i) { return '<div class="g-team" data-t="' + i + '"><span class="g-label">' + esc(n) + '</span><b class="g-num">0</b></div>'; }).join('<div class="g-hud-prog"><div class="g-prog"><i></i></div><span class="g-label" data-prog></span></div>') + '</div>');
      root.appendChild(top);
      var board = h('<div class="g-board g-quiz"><div class="g-turn"><span class="g-label">Tocca a</span><b data-who></b><span class="g-steal" hidden>Rubata!</span></div>' +
        '<div class="g-timer"><i></i><b class="g-num g-num--sm" data-sec></b></div><h2 class="g-q"></h2><div class="g-opts"></div>' +
        '<div class="g-actions"><button class="g-btn" data-next hidden>Prossima domanda</button></div></div>');
      root.appendChild(board);
      var left, stealing, locked;
      function setScore(t, v, from) {
        var b = $('[data-t="' + t + '"] .g-num', top), delta = v - pts[t]; pts[t] = v; b.textContent = v;
        b.classList.remove('is-pop'); void b.offsetWidth; b.classList.add('is-pop'); if (from) popAt(from, '+' + delta, true);
      }
      function who(t) {
        $('[data-who]', board).textContent = names[t];
        $$('.g-team', top).forEach(function (x) { x.classList.toggle('is-turn', +x.dataset.t === t); });
        board.dataset.t = t;
      }
      function startClock(s) {
        clearTimers(); left = s; var tot = s; tick();
        every(1000, function () { left--; tick(); if (left <= 3 && left > 0) sfx.tick(); if (left <= 0) { clearTimers(); miss(null); } });
        function tick() { $('[data-sec]', board).textContent = left; $('.g-timer i', board).style.width = (left / tot * 100) + '%'; board.classList.toggle('is-hurry', left <= 5); }
      }
      function ask() {
        var q = Q[qi]; stealing = false; locked = false; turn = qi % 2;
        $('.g-steal', board).hidden = true; $('[data-next]', board).hidden = true;
        $('.g-q', board).textContent = q.q; who(turn);
        var opts = $('.g-opts', board); opts.innerHTML = ''; opts.dataset.n = q.a.length;
        q.a.forEach(function (a, i) {
          var b = h('<button class="g-opt" type="button"><span class="g-key">' + 'ABCD'[i] + '</span><span>' + esc(a) + '</span></button>');
          b.onclick = function () { answer(i, b); }; opts.appendChild(b);
        });
        top.querySelector('.g-prog i').style.width = (qi / Q.length * 100) + '%';
        $('[data-prog]', top).textContent = 'Domanda ' + (qi + 1) + ' di ' + Q.length;
        board.classList.remove('is-in'); void board.offsetWidth; board.classList.add('is-in');
        startClock(20);
      }
      function answer(i, btn) {
        if (locked) return; var q = Q[qi];
        if (i === q.ok) {
          locked = true; clearTimers(); btn.classList.add('is-right');
          setScore(turn, pts[turn] + (stealing ? 50 : 100 + left * 5), btn); sfx.ok(); cheer(); reveal();
        } else { btn.classList.add('is-wrong'); btn.disabled = true; miss(btn); }
      }
      function miss() {
        sfx.ko();
        if (!stealing) { stealing = true; turn = 1 - turn; who(turn); $('.g-steal', board).hidden = false; say(names[turn] + ', potete rubare!'); startClock(10); }
        else { locked = true; clearTimers(); oops(); reveal(); }
      }
      function reveal() {
        $$('.g-opt', board).forEach(function (b, i) { b.disabled = true; if (i === Q[qi].ok) b.classList.add('is-right'); else if (!b.classList.contains('is-wrong')) b.classList.add('is-dim'); });
        var nx = $('[data-next]', board); nx.hidden = false; nx.textContent = qi === Q.length - 1 ? 'Vedi il risultato' : 'Prossima domanda';
      }
      $('[data-next]', board).onclick = function () {
        qi++; if (qi < Q.length) return ask();
        top.querySelector('.g-prog i').style.width = '100%';
        var win = pts[0] === pts[1] ? -1 : pts[0] > pts[1] ? 0 : 1;
        endScreen(root, { kicker: 'Fine della sfida', title: win < 0 ? 'Pareggio!' : 'Vince ' + names[win], score: Math.max(pts[0], pts[1]), hideScore: false, max: 0,
          msg: names[0] + ' ' + pts[0] + ' · ' + names[1] + ' ' + pts[1], again: function () { mount('sfida'); } });
      };
      ask();
    }
    say('Scegliete i nomi delle squadre.');
  }

  /* ---------- 4 · RIFLESSIONE ---------- */
  function rifl(root) {
    var R = D.rifl, saved = store.get('giochi_rifl', null);
    var board = h('<div class="g-board g-rifl"><span class="g-label">Riflessione personale · nessun punteggio</span><h2 class="g-h">' + esc(R.domanda) + '</h2>' +
      '<div class="g-spectrum"><input type="range" min="0" max="100" value="50" aria-label="Posizione"><div class="g-poles">' + R.poli.map(function (p) { return '<span>' + esc(p) + '</span>'; }).join('') + '</div></div>' +
      '<label class="g-write"><span class="g-label">Perché</span><textarea rows="4" placeholder="' + esc(R.spunto) + '"></textarea></label>' +
      '<div class="g-actions"><span class="g-note">Resta su questo dispositivo. Nessuno la vede se non la condividi tu.</span><button class="g-btn" data-send>Consegna la carta</button></div></div>');
    root.appendChild(board);
    var range = $('input', board), ta = $('textarea', board);
    function label(v) { return v < 34 ? R.poli[0] : v > 66 ? R.poli[2] : R.poli[1]; }
    function upd() { board.style.setProperty('--pos', range.value); $$('.g-poles span', board).forEach(function (s, i) { s.classList.toggle('is-on', R.poli[i] === label(+range.value)); }); }
    range.oninput = function () { upd(); };
    range.onchange = function () { sfx.tick(); };
    if (saved) { range.value = saved.v; ta.value = saved.t; }
    upd();
    $('[data-send]', board).onclick = function () {
      if (ta.value.trim().length < 8) { ta.focus(); return say('Scrivi almeno una frase: anche un dubbio va bene.'); }
      store.set('giochi_rifl', { v: +range.value, t: ta.value.trim() });
      board.remove(); card();
    };
    function card() {
      var s = store.get('giochi_rifl');
      var el = h('<div class="g-board g-rifl-card"><div class="g-paper"><span class="g-label">La mia carta</span><span class="g-chip">' + esc(label(s.v)) + '</span><p></p><span class="g-sign">' + esc(D.tema) + '</span></div>' +
        '<p class="g-note">Ora confrontati con chi ti siede accanto: dove vi siete messi? Che cosa vi ha fatto pensare?</p>' +
        '<div class="g-actions"><button class="g-btn g-btn--ghost" data-edit>Riscrivi</button></div></div>');
      $('.g-paper p', el).textContent = s.t;
      root.appendChild(el); sfx.win(); say('Grazie per la sincerità. Ogni domanda vera è già un passo.');
      $('[data-edit]', el).onclick = function () { mount('rifl'); };
    }
    say('Qui non ci sono risposte giuste. Solo la tua.');
  }

  /* ---------- montaggio ---------- */
  var GAMES = { flash: flash, cruci: cruci, sfida: sfida, rifl: rifl };
  /* Ordine e gruppo delle schede. Compaiono solo i giochi che hanno dati nella lezione. */
  var TABS = [['quiz', 'Ripasso', 'Quiz'], ['vf', 'Ripasso', 'Vero o falso'], ['flash', 'Ripasso', 'Flashcard'], ['memory', 'Ripasso', 'Memory'],
    ['abbina', 'Concetti', 'Abbinamenti'], ['cat', 'Concetti', 'Categorie'], ['seq', 'Storia', 'Linea del tempo'],
    ['completa', 'Parole', 'Completa'], ['cruci', 'Parole', 'Cruciverba'], ['sfida', 'Classe', 'Sfida a squadre'],
    ['sondaggio', 'Classe', 'Sondaggio'], ['rifl', 'Personale', 'Riflessione']];
  var ROMAN = ['', 'I', 'II', 'III', 'IV', 'V'];
  function available() { return TABS.filter(function (t) { return GAMES[t[0]] && D[t[0]]; }).map(function (t) { return t[0]; }); }
  function mount(id) {
    if (available().indexOf(id) < 0) id = available()[0];
    clearTimers(); var root = $('#game'); root.innerHTML = ''; root.dataset.game = id;
    $$('[data-game-tab]').forEach(function (b) { b.setAttribute('aria-selected', b.dataset.gameTab === id); });
    store.set('giochi_gioco', id); GAMES[id](root);
  }

  function init() {
    d.title = 'Giochi · ' + D.tema;
    var brand = $('.g-brand');
    if (brand) brand.innerHTML = '<span class="g-label">Lab IRC' + (D.anno ? ' · Anno ' + ROMAN[D.anno] : '') + ' · Gioco</span><b>' + esc(D.tema) + '</b>';
    var nav = $('.g-tabs'), ids = available();
    if (nav) nav.innerHTML = TABS.filter(function (t) { return ids.indexOf(t[0]) >= 0; }).map(function (t) {
      return '<button type="button" role="tab" data-game-tab="' + t[0] + '"><small>' + t[1] + '</small>' + t[2] + '</button>';
    }).join('');
    $$('[data-game-tab]').forEach(function (b) { b.onclick = function () { mount(b.dataset.gameTab); }; });
    var m = $('[data-mute]');
    if (m) { var upd = function () { m.setAttribute('aria-pressed', muted); m.textContent = muted ? 'Suoni: no' : 'Suoni: sì'; }; upd(); m.onclick = function () { muted = !muted; store.set('giochi_muto', muted); upd(); if (!muted) sfx.coin(); }; }
    var t = $('[data-tema]');
    if (t) t.onclick = function () { var c = d.documentElement.dataset.tema === 'chiaro' ? 'scuro' : 'chiaro'; d.documentElement.dataset.tema = c; try { localStorage.setItem('tema_lab', c); } catch (e) {} };
    mount(store.get('giochi_gioco', ids[0]));
  }
  w.Giochi = { mount: mount, sfx: sfx, hud: hud, end: endScreen, pop: popAt, h: h, $: $, $$: $$, esc: esc, say: say, cheer: cheer, oops: oops, store: store, every: every, clear: clearTimers,
    register: function (id, fn) { GAMES[id] = fn; } };
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', init); else init();
})();
