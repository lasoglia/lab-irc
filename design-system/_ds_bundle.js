/* @ds-bundle: {"format":4,"namespace":"LabIrc_948687","components":[{"name":"Amdg","sourcePath":"components/brand/Amdg.jsx"},{"name":"AmdgEgg","sourcePath":"components/brand/AmdgEgg.jsx"},{"name":"YearMascot","sourcePath":"components/brand/YearMascot.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Chip","sourcePath":"components/core/Chip.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"Nota","sourcePath":"components/core/Nota.jsx"},{"name":"YearCard","sourcePath":"components/core/YearCard.jsx"},{"name":"ExamBadge","sourcePath":"components/exam/ExamBadge.jsx"}],"sourceHashes":{"assets/artefatti/giochi/giochi-2.js":"caf08a98e230","assets/artefatti/giochi/giochi.js":"2c7e221aafb1","assets/artefatti/lab-artefatto.js":"af6cd68e5065","assets/artefatti/lezione/lab-lezione-attivita.js":"c61697aaefd6","assets/artefatti/lezione/lab-lezione-percezione.js":"074041a4d4d4","assets/artefatti/lezione/lab-lezione-plus.js":"cfa0433d8407","assets/artefatti/lezione/lab-lezione.js":"967274d840d8","assets/lab-tema.js":"ee2d7357e4ea","assets/mascotte/lab-mascotte.js":"bbf35785c697","components/brand/Amdg.jsx":"466f5bfee1a9","components/brand/AmdgEgg.jsx":"e0442c040d95","components/brand/YearMascot.jsx":"0e90cdba393c","components/core/Badge.jsx":"b335514d2292","components/core/Button.jsx":"9ab0a3a81309","components/core/Card.jsx":"32b976098131","components/core/Chip.jsx":"7aee5ec22509","components/core/Input.jsx":"025f1abd43bf","components/core/Nota.jsx":"058d8c240a14","components/core/YearCard.jsx":"1946d59c9b9e","components/exam/ExamBadge.jsx":"09b493980764","ui_kits/giochi/giochi-dati-2.js":"7fe8b35e108a","ui_kits/giochi/giochi-dati.js":"4e02e175b39e","ui_kits/lezione/lezione-benedetto.js":"2e56ecaee50f","ui_kits/lezione/lezione-religiosita.js":"6665b6f4686e"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.LabIrc_948687 = window.LabIrc_948687 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// assets/artefatti/giochi/giochi-2.js
try { (() => {
/* Lab IRC — Giochi aggiuntivi. Caricare dopo giochi.js */
(function () {
  if (!window.Giochi || !window.GIOCHI_DATI) return;
  var G = window.Giochi,
    D = window.GIOCHI_DATI,
    h = G.h,
    $ = G.$,
    $$ = G.$$,
    sfx = G.sfx;
  var shuffle = function (a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1)),
        t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  };
  var shake = function (el) {
    el.classList.remove('is-shake');
    void el.offsetWidth;
    el.classList.add('is-shake');
  };

  /* ---------- QUIZ ---------- */
  G.register('quiz', function (root) {
    var Q = D.quiz,
      qi = 0,
      LIVES = 3,
      lives = LIVES,
      H = G.hud({
        lives: true
      });
    root.appendChild(H.el);
    H.lives(lives, LIVES);
    var board = h('<div class="g-board g-quiz"><h2 class="g-q"></h2><div class="g-opts"></div><p class="g-why" hidden></p><div class="g-actions"><button class="g-btn" data-next hidden>Avanti →</button></div></div>');
    root.appendChild(board);
    function ask() {
      var q = Q[qi],
        opts = $('.g-opts', board);
      H.prog(qi, Q.length, 'Domanda ' + (qi + 1) + ' di ' + Q.length);
      $('.g-q', board).textContent = q.q;
      $('.g-why', board).hidden = true;
      $('[data-next]', board).hidden = true;
      opts.innerHTML = '';
      q.a.forEach(function (a, i) {
        var b = h('<button class="g-opt" type="button"><span class="g-key">' + 'ABCD'[i] + '</span><span></span></button>');
        $('span:last-child', b).textContent = a;
        b.onclick = function () {
          pick(i, b);
        };
        opts.appendChild(b);
      });
      board.classList.remove('is-in');
      void board.offsetWidth;
      board.classList.add('is-in');
    }
    function pick(i, b) {
      var q = Q[qi],
        right = i === q.ok;
      $$('.g-opt', board).forEach(function (x, k) {
        x.disabled = true;
        if (k === q.ok) x.classList.add('is-right');else if (x !== b) x.classList.add('is-dim');
      });
      if (right) {
        H.score(H.get() + 20, b);
        sfx.ok();
        G.cheer();
      } else {
        b.classList.add('is-wrong');
        lives--;
        H.lives(lives, LIVES);
        sfx.ko();
        G.oops();
      }
      var w = $('.g-why', board);
      w.textContent = q.why;
      w.hidden = false;
      var n = $('[data-next]', board);
      n.hidden = false;
      n.textContent = qi === Q.length - 1 || lives <= 0 ? 'Vedi il risultato' : 'Avanti →';
    }
    $('[data-next]', board).onclick = function () {
      qi++;
      if (qi < Q.length && lives > 0) return ask();
      H.prog(Q.length, Q.length, 'Fatto');
      G.end(root, {
        kicker: lives > 0 ? 'Quiz finito' : 'Tentativi finiti',
        title: lives > 0 ? 'Quiz completato' : 'Game over',
        score: H.get(),
        max: Q.length * 20,
        again: function () {
          G.mount('quiz');
        }
      });
    };
    H.score(0);
    ask();
  });

  /* ---------- VERO / FALSO ---------- */
  G.register('vf', function (root) {
    var Q = D.vf,
      qi = 0,
      streak = 0,
      H = G.hud({});
    root.appendChild(H.el);
    var board = h('<div class="g-board g-vf"><div class="g-streak" hidden></div><div class="g-stmt"></div><p class="g-why" hidden></p>' + '<div class="g-vf-btns"><button class="g-vf-b" data-v="1" type="button"><b>Vero</b><small>tasto V</small></button><button class="g-vf-b" data-v="0" type="button"><b>Falso</b><small>tasto F</small></button></div>' + '<div class="g-actions"><button class="g-btn" data-next hidden>Avanti →</button></div></div>');
    root.appendChild(board);
    function ask() {
      H.prog(qi, Q.length, 'Frase ' + (qi + 1) + ' di ' + Q.length);
      var s = $('.g-stmt', board);
      s.textContent = Q[qi].s;
      s.className = 'g-stmt';
      void s.offsetWidth;
      s.classList.add('is-in');
      $('.g-why', board).hidden = true;
      $('[data-next]', board).hidden = true;
      $$('.g-vf-b', board).forEach(function (b) {
        b.disabled = false;
        b.className = 'g-vf-b';
      });
    }
    function pick(v) {
      var q = Q[qi],
        btns = $$('.g-vf-b', board);
      if (btns[0].disabled) return;
      var b = $('[data-v="' + (v ? 1 : 0) + '"]', board),
        right = v === q.v;
      btns.forEach(function (x) {
        x.disabled = true;
        x.classList.add(+x.dataset.v === +q.v ? 'is-right' : 'is-dim');
      });
      if (right) {
        streak++;
        H.score(H.get() + 10 * Math.min(streak, 3), b);
        sfx.ok();
        if (streak >= 2) G.say(streak + ' di fila!');
      } else {
        streak = 0;
        b.classList.remove('is-dim');
        b.classList.add('is-wrong');
        sfx.ko();
        G.oops();
      }
      var st = $('.g-streak', board);
      st.hidden = streak < 2;
      st.textContent = 'Combo ×' + Math.min(streak, 3);
      $('.g-stmt', board).classList.add(right ? 'is-ok' : 'is-ko');
      var w = $('.g-why', board);
      w.textContent = (q.v ? 'Vero. ' : 'Falso. ') + q.why;
      w.hidden = false;
      var n = $('[data-next]', board);
      n.hidden = false;
      n.textContent = qi === Q.length - 1 ? 'Vedi il risultato' : 'Avanti →';
    }
    $$('.g-vf-b', board).forEach(function (b) {
      b.onclick = function () {
        pick(b.dataset.v === '1');
      };
    });
    root.onkeydown = null;
    var key = function (e) {
      if (!document.body.contains(board)) return document.removeEventListener('keydown', key);
      var k = e.key.toLowerCase();
      if (k === 'v') pick(true);
      if (k === 'f') pick(false);
    };
    document.addEventListener('keydown', key);
    $('[data-next]', board).onclick = function () {
      qi++;
      if (qi < Q.length) return ask();
      H.prog(Q.length, Q.length, 'Fatto');
      G.end(root, {
        title: 'Vero o falso?',
        score: H.get(),
        max: 10 + 20 + 30 * (Q.length - 2),
        msg: 'Le risposte di fila valgono di più.',
        again: function () {
          G.mount('vf');
        }
      });
    };
    H.score(0);
    ask();
  });

  /* ---------- ABBINAMENTI ---------- */
  G.register('abbina', function (root) {
    var P = D.abbina,
      LIVES = 3,
      lives = LIVES,
      done = 0,
      sel = null,
      H = G.hud({
        lives: true
      });
    root.appendChild(H.el);
    H.lives(lives, LIVES);
    H.prog(0, P.length, '0 di ' + P.length + ' coppie');
    var board = h('<div class="g-board g-abbina"><p class="g-note">Tocca un termine a sinistra, poi la frase che gli corrisponde.</p><div class="g-cols"><div class="g-col" data-side="l"></div><div class="g-col" data-side="r"></div></div></div>');
    root.appendChild(board);
    P.forEach(function (p, i) {
      var b = h('<button class="g-pill" type="button" data-i="' + i + '"></button>');
      b.textContent = p[0];
      $('[data-side="l"]', board).appendChild(b);
    });
    shuffle(P.map(function (_, i) {
      return i;
    })).forEach(function (i) {
      var b = h('<button class="g-pill g-pill--r" type="button" data-i="' + i + '"></button>');
      b.textContent = P[i][1];
      $('[data-side="r"]', board).appendChild(b);
    });
    $$('[data-side="l"] .g-pill', board).forEach(function (b) {
      b.onclick = function () {
        $$('[data-side="l"] .g-pill', board).forEach(function (x) {
          x.classList.remove('is-sel');
        });
        sel = b;
        b.classList.add('is-sel');
        sfx.tick();
      };
    });
    $$('[data-side="r"] .g-pill', board).forEach(function (b) {
      b.onclick = function () {
        if (!sel) {
          shake(b);
          return G.say('Prima scegli un termine a sinistra.');
        }
        if (sel.dataset.i === b.dataset.i) {
          done++;
          var c = 'g-pair-' + done;
          [sel, b].forEach(function (x) {
            x.classList.remove('is-sel');
            x.classList.add('is-done', c);
            x.disabled = true;
            x.dataset.n = done;
          });
          H.score(H.get() + 20, b);
          sfx.ok();
          sel = null;
          H.prog(done, P.length, done + ' di ' + P.length + ' coppie');
          if (done === P.length) setTimeout(function () {
            G.end(root, {
              title: 'Tutte le coppie!',
              score: H.get(),
              max: P.length * 20,
              again: function () {
                G.mount('abbina');
              }
            });
          }, 500);
        } else {
          shake(b);
          shake(sel);
          lives--;
          H.lives(lives, LIVES);
          H.score(Math.max(0, H.get() - 5), b);
          sfx.ko();
          G.oops();
          if (lives <= 0) setTimeout(function () {
            G.end(root, {
              kicker: 'Tentativi finiti',
              title: 'Game over',
              score: H.get(),
              max: P.length * 20,
              again: function () {
                G.mount('abbina');
              }
            });
          }, 500);
        }
      };
    });
    H.score(0);
  });

  /* ---------- SEQUENZA ---------- */
  G.register('seq', function (root) {
    var S = D.seq,
      tries = 0,
      H = G.hud({});
    root.appendChild(H.el);
    H.prog(0, S.length, 'Metti in ordine dal più antico');
    var board = h('<div class="g-board g-seq"><ol class="g-seq-list"></ol><div class="g-actions"><span class="g-note">Usa le frecce o trascina.</span><button class="g-btn" data-check>Controlla</button></div></div>');
    root.appendChild(board);
    var list = $('ol', board),
      order = shuffle(S.map(function (_, i) {
        return i;
      }));
    if (order.every(function (v, i) {
      return v === i;
    })) order.reverse();
    order.forEach(function (i) {
      var li = h('<li class="g-seq-item" draggable="true" data-i="' + i + '"><span class="g-seq-n"></span><span class="g-seq-t"></span><span class="g-seq-y">' + S[i].y + '</span><span class="g-seq-mv"><button type="button" data-mv="-1" aria-label="Su">↑</button><button type="button" data-mv="1" aria-label="Giù">↓</button></span></li>');
      $('.g-seq-t', li).textContent = S[i].t;
      list.appendChild(li);
    });
    function renum() {
      $$('.g-seq-item', list).forEach(function (li, k) {
        $('.g-seq-n', li).textContent = k + 1;
      });
    }
    function locked(li) {
      return li && li.classList.contains('is-ok');
    }
    list.addEventListener('click', function (e) {
      var b = e.target.closest('[data-mv]');
      if (!b) return;
      var li = b.closest('li');
      if (locked(li)) return;
      var dir = +b.dataset.mv,
        sib = dir < 0 ? li.previousElementSibling : li.nextElementSibling;
      while (sib && locked(sib)) sib = dir < 0 ? sib.previousElementSibling : sib.nextElementSibling;
      if (!sib) return;
      if (dir < 0) list.insertBefore(li, sib);else list.insertBefore(li, sib.nextElementSibling);
      li.classList.remove('is-moved');
      void li.offsetWidth;
      li.classList.add('is-moved');
      $$('.is-wrong', list).forEach(function (x) {
        x.classList.remove('is-wrong');
      });
      sfx.tick();
      renum();
    });
    var drag = null;
    list.addEventListener('dragstart', function (e) {
      var li = e.target.closest('li');
      if (locked(li)) return e.preventDefault();
      drag = li;
      li.classList.add('is-drag');
    });
    list.addEventListener('dragend', function () {
      if (drag) drag.classList.remove('is-drag');
      drag = null;
      renum();
    });
    list.addEventListener('dragover', function (e) {
      e.preventDefault();
      var over = e.target.closest('li');
      if (!drag || !over || over === drag || locked(over)) return;
      var r = over.getBoundingClientRect();
      list.insertBefore(drag, e.clientY > r.top + r.height / 2 ? over.nextElementSibling : over);
    });
    $('[data-check]', board).onclick = function () {
      tries++;
      var items = $$('.g-seq-item', list),
        ok = 0;
      items.forEach(function (li, k) {
        var r = +li.dataset.i === k;
        li.classList.toggle('is-ok', r);
        li.classList.toggle('is-wrong', !r);
        li.draggable = !r;
        if (r) ok++;
      });
      H.prog(ok, S.length, ok + ' di ' + S.length + ' al posto giusto · tentativo ' + tries);
      if (ok === S.length) {
        var sc = Math.max(20, 120 - (tries - 1) * 20);
        H.score(sc, this);
        sfx.win();
        setTimeout(function () {
          G.end(root, {
            title: 'Linea del tempo completa',
            score: sc,
            max: 120,
            msg: tries === 1 ? 'Al primo tentativo!' : 'In ' + tries + ' tentativi.',
            again: function () {
              G.mount('seq');
            }
          });
        }, 700);
      } else {
        sfx.ko();
        G.say(ok ? ok + ' al posto giusto. Sposta le altre.' : 'Nessuna al posto giusto. Coraggio!');
      }
    };
    renum();
    H.score(0);
  });

  /* ---------- CATEGORIE ---------- */
  G.register('cat', function (root) {
    var C = D.cat,
      LIVES = 3,
      lives = LIVES,
      done = 0,
      sel = null,
      H = G.hud({
        lives: true
      });
    root.appendChild(H.el);
    H.lives(lives, LIVES);
    H.prog(0, C.items.length, '0 di ' + C.items.length + ' frasi');
    var board = h('<div class="g-board g-cat"><div class="g-pool"></div><div class="g-bins">' + C.bins.map(function (b, i) {
      return '<div class="g-bin" data-b="' + i + '" role="button" tabindex="0"><span class="g-bin-h">' + b + '</span><div class="g-bin-in"></div></div>';
    }).join('') + '</div></div>');
    root.appendChild(board);
    shuffle(C.items).forEach(function (it) {
      var c = h('<button class="g-chip-d" type="button" draggable="true" data-b="' + it[1] + '"></button>');
      c.textContent = it[0];
      $('.g-pool', board).appendChild(c);
    });
    function choose(c) {
      $$('.g-chip-d', board).forEach(function (x) {
        x.classList.remove('is-sel');
      });
      sel = c;
      if (c) {
        c.classList.add('is-sel');
        sfx.tick();
      }
      board.classList.toggle('is-picking', !!c);
    }
    function drop(bin) {
      if (!sel) return G.say('Tocca prima una frase.');
      var c = sel;
      choose(null);
      if (c.dataset.b === bin.dataset.b) {
        $('.g-bin-in', bin).appendChild(c);
        c.disabled = true;
        c.draggable = false;
        c.classList.add('is-in');
        done++;
        H.score(H.get() + 10, bin);
        sfx.ok();
        H.prog(done, C.items.length, done + ' di ' + C.items.length + ' frasi');
        if (done === C.items.length) setTimeout(function () {
          G.cheer();
          G.end(root, {
            title: 'Tutto al suo posto',
            score: H.get(),
            max: C.items.length * 10,
            again: function () {
              G.mount('cat');
            }
          });
        }, 500);
      } else {
        shake(bin);
        shake(c);
        lives--;
        H.lives(lives, LIVES);
        sfx.ko();
        G.oops();
        if (lives <= 0) setTimeout(function () {
          G.end(root, {
            kicker: 'Tentativi finiti',
            title: 'Game over',
            score: H.get(),
            max: C.items.length * 10,
            again: function () {
              G.mount('cat');
            }
          });
        }, 500);
      }
    }
    board.addEventListener('click', function (e) {
      var c = e.target.closest('.g-chip-d');
      if (c && !c.disabled) return choose(sel === c ? null : c);
      var b = e.target.closest('.g-bin');
      if (b) drop(b);
    });
    board.addEventListener('dragstart', function (e) {
      var c = e.target.closest('.g-chip-d');
      if (c) {
        choose(c);
        e.dataTransfer.setData('text', '');
      }
    });
    $$('.g-bin', board).forEach(function (b) {
      b.addEventListener('dragover', function (e) {
        e.preventDefault();
        b.classList.add('is-over');
      });
      b.addEventListener('dragleave', function () {
        b.classList.remove('is-over');
      });
      b.addEventListener('drop', function (e) {
        e.preventDefault();
        b.classList.remove('is-over');
        drop(b);
      });
      b.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          drop(b);
        }
      });
    });
    H.score(0);
    G.say('Tocca una frase, poi il contenitore giusto.');
  });

  /* ---------- MEMORY ---------- */
  G.register('memory', function (root) {
    var P = D.memory,
      moves = 0,
      found = 0,
      open = [],
      busy = false,
      sec = 0,
      H = G.hud({
        timer: true
      });
    root.appendChild(H.el);
    H.prog(0, P.length, '0 di ' + P.length + ' coppie · 0 mosse');
    var cards = shuffle([].concat.apply([], P.map(function (p, i) {
      return [{
        t: p[0],
        i: i,
        k: 'a'
      }, {
        t: p[1],
        i: i,
        k: 'b'
      }];
    })));
    var board = h('<div class="g-board g-memory"><div class="g-mem-grid"></div></div>');
    root.appendChild(board);
    cards.forEach(function (c) {
      var b = h('<button class="g-mem" type="button" aria-label="Carta coperta"><span class="g-mem-in"><span class="g-mem-f g-mem-back">?</span><span class="g-mem-f g-mem-face g-mem-' + c.k + '"></span></span></button>');
      $('.g-mem-face', b).textContent = c.t;
      b._c = c;
      $('.g-mem-grid', board).appendChild(b);
      b.onclick = function () {
        if (busy || b.classList.contains('is-open')) return;
        b.classList.add('is-open');
        b.setAttribute('aria-label', c.t);
        sfx.flip();
        open.push(b);
        if (open.length < 2) return;
        moves++;
        busy = true;
        var a = open[0],
          z = open[1];
        if (a._c.i === z._c.i) {
          found++;
          setTimeout(function () {
            a.classList.add('is-match');
            z.classList.add('is-match');
            sfx.ok();
            H.score(H.get() + 20, z);
            open = [];
            busy = false;
            if (found === P.length) {
              G.clear();
              var bonus = Math.max(0, 60 - (moves - P.length) * 5);
              H.score(H.get() + bonus);
              setTimeout(function () {
                G.end(root, {
                  title: 'Memoria d’acciaio',
                  score: H.get(),
                  max: P.length * 20 + 60,
                  msg: moves + ' mosse · ' + Math.floor(sec / 60) + ':' + ('0' + sec % 60).slice(-2),
                  again: function () {
                    G.mount('memory');
                  }
                });
              }, 600);
            }
          }, 350);
        } else setTimeout(function () {
          a.classList.remove('is-open');
          z.classList.remove('is-open');
          a.setAttribute('aria-label', 'Carta coperta');
          z.setAttribute('aria-label', 'Carta coperta');
          open = [];
          busy = false;
        }, 900);
        H.prog(found + (a._c.i === z._c.i ? 1 : 0), P.length, found + (a._c.i === z._c.i ? 1 : 0) + ' di ' + P.length + ' coppie · ' + moves + ' mosse');
      };
    });
    G.every(1000, function () {
      H.time(++sec);
    });
    H.score(0);
    G.say('Trova il termine e la sua definizione.');
  });

  /* ---------- COMPLETA IL TESTO ---------- */
  G.register('completa', function (root) {
    var C = D.completa,
      LIVES = 3,
      lives = LIVES,
      active = null,
      H = G.hud({
        lives: true
      });
    var answers = [],
      html = C.testo.replace(/\{([^}]+)\}/g, function (_, w) {
        answers.push(w);
        return '<button class="g-blank" type="button" data-k="' + (answers.length - 1) + '"></button>';
      });
    root.appendChild(H.el);
    H.lives(lives, LIVES);
    H.prog(0, answers.length, '0 di ' + answers.length + ' spazi');
    var board = h('<div class="g-board g-completa"><p class="g-text">' + html + '</p><div class="g-bank"></div><div class="g-actions"><button class="g-btn" data-check>Controlla</button></div></div>');
    root.appendChild(board);
    shuffle(answers.concat(C.extra)).forEach(function (wd) {
      var b = h('<button class="g-word" type="button"></button>');
      b.textContent = wd;
      $('.g-bank', board).appendChild(b);
    });
    var blanks = $$('.g-blank', board);
    function setActive(b) {
      blanks.forEach(function (x) {
        x.classList.toggle('is-active', x === b);
      });
      active = b;
    }
    function nextEmpty() {
      return blanks.filter(function (x) {
        return !x.dataset.w && !x.classList.contains('is-ok');
      })[0] || null;
    }
    blanks.forEach(function (b) {
      b.onclick = function () {
        if (b.classList.contains('is-ok')) return;
        if (b.dataset.w) {
          var w = $$('.g-word', board).filter(function (x) {
            return x.textContent === b.dataset.w && x.disabled;
          })[0];
          if (w) w.disabled = false;
          b.dataset.w = '';
          b.textContent = '';
          b.classList.remove('is-wrong');
        }
        setActive(b);
        sfx.tick();
      };
    });
    $$('.g-word', board).forEach(function (w) {
      w.onclick = function () {
        var b = active && !active.dataset.w ? active : nextEmpty();
        if (!b) return G.say('Tutti gli spazi sono pieni: controlla!');
        b.dataset.w = w.textContent;
        b.textContent = w.textContent;
        b.classList.remove('is-wrong');
        w.disabled = true;
        sfx.tick();
        setActive(nextEmpty());
      };
    });
    $('[data-check]', board).onclick = function () {
      var wrong = 0,
        gained = 0;
      blanks.forEach(function (b) {
        if (!b.dataset.w || b.classList.contains('is-ok')) return;
        if (b.dataset.w === answers[+b.dataset.k]) {
          b.classList.add('is-ok');
          gained += 15;
        } else {
          b.classList.add('is-wrong');
          wrong++;
        }
      });
      var ok = blanks.filter(function (b) {
        return b.classList.contains('is-ok');
      }).length;
      H.prog(ok, answers.length, ok + ' di ' + answers.length + ' spazi');
      if (gained) {
        H.score(H.get() + gained, this);
        sfx.ok();
      }
      if (wrong) {
        lives--;
        H.lives(lives, LIVES);
        sfx.ko();
        G.oops();
      }
      if (!gained && !wrong) G.say('Riempi almeno uno spazio.');
      if (ok === answers.length) setTimeout(function () {
        G.end(root, {
          title: 'Testo completo',
          score: H.get(),
          max: answers.length * 15,
          again: function () {
            G.mount('completa');
          }
        });
      }, 500);else if (lives <= 0) {
        blanks.forEach(function (b) {
          if (!b.classList.contains('is-ok')) {
            b.textContent = answers[+b.dataset.k];
            b.classList.remove('is-wrong');
            b.classList.add('is-shown');
          }
        });
        setTimeout(function () {
          G.end(root, {
            kicker: 'Tentativi finiti',
            title: 'Ecco il testo',
            score: H.get(),
            max: answers.length * 15,
            again: function () {
              G.mount('completa');
            }
          });
        }, 1400);
      }
    };
    setActive(blanks[0]);
    H.score(0);
  });

  /* ---------- SONDAGGIO ---------- */
  G.register('sondaggio', function (root) {
    var S = D.sondaggio,
      qi = 0,
      votes = G.store.get('giochi_sondaggio', {}),
      shown = false,
      last = -1,
      H = G.hud({});
    root.appendChild(H.el);
    var board = h('<div class="g-board g-poll"><span class="g-label">Sondaggio di classe · anonimo</span><h2 class="g-q"></h2><div class="g-poll-opts"></div>' + '<div class="g-debate" hidden><span class="g-label">Per il dibattito</span><p></p></div>' + '<div class="g-actions"><span class="g-note" data-tot></span><button class="g-btn g-btn--ghost" data-reset>Azzera</button><button class="g-btn g-btn--ghost" data-show>Mostra risultati</button><button class="g-btn" data-next>Prossima →</button></div></div>');
    root.appendChild(board);
    function v() {
      return votes[qi] = votes[qi] || S[qi].a.map(function () {
        return 0;
      });
    }
    function draw() {
      var q = S[qi],
        vv = v(),
        tot = vv.reduce(function (a, b) {
          return a + b;
        }, 0),
        max = Math.max.apply(null, vv);
      H.prog(qi + 1, S.length, 'Domanda ' + (qi + 1) + ' di ' + S.length);
      H.score(tot);
      $('.g-q', board).textContent = q.q;
      board.classList.toggle('is-shown', shown);
      var box = $('.g-poll-opts', board);
      box.innerHTML = '';
      q.a.forEach(function (a, i) {
        var pct = tot ? Math.round(vv[i] / tot * 100) : 0;
        var row = h('<div class="g-poll-row' + (shown && tot && vv[i] === max ? ' is-top' : '') + (i === last ? ' is-voted' : '') + '"><button class="g-poll-b" type="button"><span class="g-poll-ok" aria-hidden="true">✓ Votato</span><span class="g-poll-bar" style="width:' + (shown ? pct : 0) + '%"></span><span class="g-poll-a"></span><span class="g-poll-res">' + (shown ? '<b class="g-num g-num--sm">' + pct + '%</b><small class="g-poll-n">' + vv[i] + (vv[i] === 1 ? ' voto' : ' voti') + '</small>' : '') + '</span></button><button class="g-poll-minus" type="button" aria-label="Togli un voto">−</button></div>');
        $('.g-poll-a', row).textContent = a;
        $('.g-poll-b', row).onclick = function (e) {
          vv[i]++;
          G.store.set('giochi_sondaggio', votes);
          sfx.coin();
          G.pop(e.currentTarget, '+1', true);
          last = i;
          draw();
        };
        $('.g-poll-minus', row).onclick = function () {
          if (vv[i] > 0) {
            vv[i]--;
            G.store.set('giochi_sondaggio', votes);
            draw();
          }
        };
        box.appendChild(row);
      });
      var tn = $('[data-tot]', board);
      tn.setAttribute('aria-live', 'polite');
      tn.innerHTML = (last > -1 ? '<b class="g-poll-reg">✓ Voto registrato</b> · ' : '') + tot + (tot === 1 ? ' voto' : ' voti');
      last = -1;
      $('[data-show]', board).textContent = shown ? 'Nascondi risultati' : 'Mostra risultati';
      var db = $('.g-debate', board);
      db.hidden = !shown;
      $('p', db).textContent = q.dibattito;
      $('[data-next]', board).textContent = qi === S.length - 1 ? 'Ricomincia' : 'Prossima →';
    }
    $('[data-show]', board).onclick = function () {
      shown = !shown;
      if (shown) sfx.win();
      draw();
    };
    $('[data-reset]', board).onclick = function () {
      votes[qi] = null;
      G.store.set('giochi_sondaggio', votes);
      shown = false;
      draw();
    };
    $('[data-next]', board).onclick = function () {
      qi = (qi + 1) % S.length;
      shown = false;
      draw();
    };
    $('.g-hud-score .g-label', H.el).textContent = 'Voti';
    draw();
    G.say('Ognuno tocca la sua risposta. I risultati restano nascosti finché non li mostri.');
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "assets/artefatti/giochi/giochi-2.js", error: String((e && e.message) || e) }); }

// assets/artefatti/giochi/giochi.js
try { (() => {
/* Lab IRC — Motore giochi. Richiede giochi-dati.js e (facoltativo) lab-artefatto.js */
(function () {
  if (!window.GIOCHI_DATI) return;
  var d = document,
    w = window,
    D = w.GIOCHI_DATI; /* senza #game il motore resta in attesa: Giochi.init(id) lo avvia (lezione React) */
  var $ = function (s, r) {
    return (r || d).querySelector(s);
  };
  var $$ = function (s, r) {
    return Array.prototype.slice.call((r || d).querySelectorAll(s));
  };
  var h = function (html) {
    var t = d.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstChild;
  };
  var say = function (t) {
    w.LabArtefatto && w.LabArtefatto.say(t);
  };
  var cheer = function () {
    w.LabArtefatto && w.LabArtefatto.cheer();
  };
  var oops = function () {
    w.LabArtefatto && w.LabArtefatto.oops();
  };
  var store = {
    get: function (k, v) {
      try {
        var x = localStorage.getItem(k);
        return x == null ? v : JSON.parse(x);
      } catch (e) {
        return v;
      }
    },
    set: function (k, v) {
      try {
        localStorage.setItem(k, JSON.stringify(v));
      } catch (e) {}
    }
  };

  /* ---------- suoni ---------- */
  var ac = null,
    muted = store.get('giochi_muto', false);
  function tone(freqs, dur, gap) {
    if (muted) return;
    try {
      ac = ac || new (w.AudioContext || w.webkitAudioContext)();
    } catch (e) {
      return;
    }
    var arcade = d.body.dataset.skin === 'arcade',
      t0 = ac.currentTime;
    freqs.forEach(function (f, i) {
      var o = ac.createOscillator(),
        g = ac.createGain(),
        t = t0 + i * (gap || dur);
      o.type = arcade ? 'square' : 'triangle';
      o.frequency.value = f;
      g.gain.setValueAtTime(arcade ? .06 : .16, t);
      g.gain.exponentialRampToValueAtTime(.0001, t + dur);
      o.connect(g);
      g.connect(ac.destination);
      o.start(t);
      o.stop(t + dur + .02);
    });
  }
  var sfx = {
    ok: function () {
      tone([660, 990], .12, .08);
    },
    ko: function () {
      tone([196, 147], .18, .12);
    },
    tick: function () {
      tone([1320], .03);
    },
    flip: function () {
      tone([520], .05);
    },
    win: function () {
      tone([523, 659, 784, 1047], .18, .11);
    },
    coin: function () {
      tone([988, 1319], .07, .05);
    }
  };

  /* ---------- HUD ---------- */
  var timers = [];
  function clearTimers() {
    timers.forEach(clearInterval);
    timers = [];
  }
  function every(ms, fn) {
    var id = setInterval(fn, ms);
    timers.push(id);
    return id;
  }
  function hud(opts) {
    var el = h('<div class="g-hud">' + '<div class="g-hud-score"><span class="g-label">Punti</span><b class="g-num" data-score>0</b></div>' + '<div class="g-hud-prog"><div class="g-prog"><i></i></div><span class="g-label" data-prog></span></div>' + '<div class="g-hud-side">' + (opts.lives ? '<span class="g-lives" aria-label="Tentativi"></span>' : '') + (opts.timer ? '<span class="g-clock"><span class="g-label">Tempo</span><b class="g-num g-num--sm" data-time>0:00</b></span>' : '') + '</div></div>');
    var score = 0,
      shown = 0,
      raf;
    var api = {
      el: el,
      score: function (v, from) {
        var delta = v - score;
        score = v;
        var s = $('[data-score]', el);
        s.classList.remove('is-pop');
        void s.offsetWidth;
        s.classList.add('is-pop');
        if (delta && from) popAt(from, (delta > 0 ? '+' : '') + delta, delta > 0);
        cancelAnimationFrame(raf);
        (function step() {
          shown += Math.sign(score - shown) * Math.max(1, Math.round(Math.abs(score - shown) / 6));
          s.textContent = shown;
          if (shown !== score) raf = requestAnimationFrame(step);
        })();
      },
      get: function () {
        return score;
      },
      prog: function (n, tot, label) {
        $('.g-prog i', el).style.width = (tot ? n / tot * 100 : 0) + '%';
        $('[data-prog]', el).textContent = label || n + ' / ' + tot;
      },
      lives: function (n, max) {
        var l = $('.g-lives', el);
        if (!l) return;
        l.innerHTML = '';
        for (var i = 0; i < max; i++) l.appendChild(h('<i class="g-life' + (i < n ? '' : ' is-lost') + '"></i>'));
      },
      time: function (sec) {
        var t = $('[data-time]', el);
        if (t) t.textContent = Math.floor(sec / 60) + ':' + ('0' + sec % 60).slice(-2);
      }
    };
    return api;
  }
  function popAt(target, text, good) {
    var r = target.getBoundingClientRect(),
      p = h('<span class="g-float' + (good ? '' : ' is-bad') + '">' + text + '</span>');
    p.style.left = r.left + r.width / 2 + 'px';
    p.style.top = r.top + 8 + 'px';
    d.body.appendChild(p);
    setTimeout(function () {
      p.remove();
    }, 1200);
  }
  function endScreen(root, o) {
    var pct = o.max ? o.score / o.max : 1,
      stars = pct >= .85 ? 3 : pct >= .5 ? 2 : 1;
    var el = h('<div class="g-end" role="dialog" aria-label="Risultato"><div class="g-end-in">' + '<span class="g-label">' + (o.kicker || 'Partita finita') + '</span>' + '<h2 class="g-end-title">' + o.title + '</h2>' + (o.hideScore ? '' : '<div class="g-stars">' + [1, 2, 3].map(function (i) {
      return '<i class="' + (i <= stars ? 'is-on' : '') + '" style="--i:' + i + '"></i>';
    }).join('') + '</div>' + '<b class="g-num g-num--xl">' + o.score + (o.max ? '<small> / ' + o.max + '</small>' : '') + '</b>') + (o.msg ? '<p class="g-end-msg">' + o.msg + '</p>' : '') + '<div class="g-actions"><button class="g-btn" data-again>Gioca ancora</button></div></div></div>');
    root.appendChild(el);
    $('[data-again]', el).onclick = o.again;
    sfx.win();
    say(stars === 3 ? 'Impeccabile!' : stars === 2 ? 'Bel lavoro, quasi perfetto.' : 'Si impara giocando. Riproviamo?');
  }

  /* ---------- 1 · FLASHCARD ---------- */
  function flash(root) {
    var cards = D.flash,
      queue = cards.map(function (_, i) {
        return i;
      }),
      missed = {},
      done = 0,
      H = hud({});
    root.appendChild(H.el);
    var board = h('<div class="g-board g-flash">' + '<div class="g-deck"><button class="g-card" type="button" aria-label="Gira la carta"><span class="g-card-in">' + '<span class="g-face g-front"><span class="g-label">Termine</span><span class="g-term"></span><span class="g-hint">Tocca per girare</span></span>' + '<span class="g-face g-back"><span class="g-label">Definizione</span><span class="g-def"></span></span></span></button></div>' + '<div class="g-actions"><button class="g-btn g-btn--ghost" data-a="rip" disabled>Da ripassare</button><button class="g-btn" data-a="ok" disabled>Lo sapevo</button></div></div>');
    root.appendChild(board);
    var card = $('.g-card', board),
      deck = $('.g-deck', board);
    function show() {
      if (!queue.length) {
        return endScreen(root, {
          title: 'Mazzo completato',
          score: H.get(),
          max: cards.length * 10,
          msg: Object.keys(missed).length ? 'Da ripassare: ' + Object.keys(missed).map(function (i) {
            return cards[i][0];
          }).join(', ') + '.' : 'Tutte al primo colpo.',
          again: restart
        });
      }
      var c = cards[queue[0]];
      card.classList.remove('is-flipped');
      card.classList.remove('is-in');
      void card.offsetWidth;
      card.classList.add('is-in');
      $('.g-term', board).textContent = c[0];
      $('.g-def', board).textContent = c[1];
      deck.style.setProperty('--left', Math.min(queue.length - 1, 3));
      $$('[data-a]', board).forEach(function (b) {
        b.disabled = true;
      });
      H.prog(done, cards.length, done + ' di ' + cards.length + ' imparate');
    }
    function flip() {
      card.classList.toggle('is-flipped');
      sfx.flip();
      $$('[data-a]', board).forEach(function (b) {
        b.disabled = false;
      });
    }
    card.onclick = flip;
    $('[data-a="ok"]', board).onclick = function (e) {
      var i = queue.shift();
      done++;
      if (!missed[i]) {
        H.score(H.get() + 10, e.currentTarget);
        sfx.coin();
        if (done % 3 === 0) cheer();
      } else sfx.ok();
      card.classList.add('is-out-r');
      setTimeout(function () {
        card.classList.remove('is-out-r');
        show();
      }, 280);
    };
    $('[data-a="rip"]', board).onclick = function () {
      var i = queue.shift();
      missed[i] = 1;
      queue.push(i);
      sfx.flip();
      card.classList.add('is-out-l');
      setTimeout(function () {
        card.classList.remove('is-out-l');
        show();
      }, 280);
    };
    function restart() {
      mount('flash');
    }
    H.score(0);
    show();
    say('Leggi il termine, prova a dire la definizione, poi gira.');
  }

  /* ---------- 2 · CRUCIVERBA ---------- */
  function cruci(root) {
    var C = D.cruci,
      cells = {},
      LIVES = 3,
      lives = LIVES,
      solved = {},
      active = 0,
      sec = 0,
      over = false;
    var H = hud({
      lives: true,
      timer: true
    });
    root.appendChild(H.el);
    H.lives(lives, LIVES);
    H.prog(0, C.words.length, '0 di ' + C.words.length + ' parole');
    C.words.forEach(function (wd, wi) {
      for (var k = 0; k < wd.w.length; k++) {
        var r = wd.r + (wd.dir === 'v' ? k : 0),
          c = wd.c + (wd.dir === 'o' ? k : 0),
          key = r + ',' + c;
        cells[key] = cells[key] || {
          r: r,
          c: c,
          ch: wd.w[k],
          words: []
        };
        cells[key].words.push(wi);
        if (k === 0) cells[key].num = wd.n;
      }
    });
    var board = h('<div class="g-board g-cruci"><div class="g-grid" style="--cols:' + C.cols + ';--rows:' + C.rows + '"></div>' + '<div class="g-clues"><div><span class="g-label">Orizzontali</span><ol data-dir="o"></ol></div><div><span class="g-label">Verticali</span><ol data-dir="v"></ol></div>' + '<div class="g-actions"><button class="g-btn g-btn--ghost" data-help>Svela una lettera · −5</button><button class="g-btn" data-check>Controlla</button></div></div></div>');
    root.appendChild(board);
    var grid = $('.g-grid', board);
    for (var r = 0; r < C.rows; r++) for (var c = 0; c < C.cols; c++) {
      var cl = cells[r + ',' + c];
      if (!cl) {
        grid.appendChild(h('<span class="g-cell is-void"></span>'));
        continue;
      }
      var el = h('<label class="g-cell">' + (cl.num ? '<small>' + cl.num + '</small>' : '') + '<input maxlength="1" autocomplete="off" autocapitalize="characters" spellcheck="false" aria-label="Riga ' + (r + 1) + ' colonna ' + (c + 1) + '"></label>');
      cl.el = el;
      cl.inp = $('input', el);
      grid.appendChild(el);
      (function (cl) {
        cl.inp.addEventListener('focus', function () {
          if (cl.words.indexOf(active) < 0) setActive(cl.words[0]);else paint();
        });
        cl.inp.addEventListener('click', function () {
          if (cl.words.length > 1 && d.activeElement === cl.inp && cl._clicked) setActive(cl.words[(cl.words.indexOf(active) + 1) % cl.words.length]);
          cl._clicked = true;
        });
        cl.inp.addEventListener('blur', function () {
          cl._clicked = false;
        });
        cl.inp.addEventListener('input', function () {
          cl.inp.value = cl.inp.value.replace(/[^a-zà-ù]/gi, '').toUpperCase().slice(-1);
          cl.el.classList.remove('is-wrong');
          if (cl.inp.value) {
            sfx.tick();
            move(cl, 1);
          }
        });
        cl.inp.addEventListener('keydown', function (e) {
          if (e.key === 'Backspace' && !cl.inp.value) {
            e.preventDefault();
            move(cl, -1, true);
          }
          if (e.key === 'Enter') check();
        });
      })(cl);
    }
    C.words.forEach(function (wd, wi) {
      var li = h('<li><button type="button"><b>' + wd.n + '</b><span>' + wd.clue + ' <em>(' + wd.w.length + ')</em></span></button></li>');
      $('button', li).onclick = function () {
        setActive(wi);
        cellsOf(wi)[0].inp.focus();
      };
      wd.li = li;
      $('ol[data-dir="' + wd.dir + '"]', board).appendChild(li);
    });
    function cellsOf(wi) {
      var wd = C.words[wi],
        out = [];
      for (var k = 0; k < wd.w.length; k++) out.push(cells[wd.r + (wd.dir === 'v' ? k : 0) + ',' + (wd.c + (wd.dir === 'o' ? k : 0))]);
      return out;
    }
    function setActive(wi) {
      active = wi;
      paint();
    }
    function paint() {
      Object.keys(cells).forEach(function (k) {
        cells[k].el.classList.remove('is-active');
      });
      cellsOf(active).forEach(function (cl) {
        cl.el.classList.add('is-active');
      });
      C.words.forEach(function (wd, wi) {
        wd.li.classList.toggle('is-active', wi === active);
        wd.li.classList.toggle('is-done', !!solved[wi]);
      });
    }
    function move(cl, dir, erase) {
      var list = cellsOf(active),
        i = list.indexOf(cl),
        nx = list[i + dir];
      if (nx) {
        nx.inp.focus();
        if (erase) nx.inp.value = '';
      }
    }
    function check() {
      if (over) return;
      var wrong = 0,
        gained = 0;
      C.words.forEach(function (wd, wi) {
        var cs = cellsOf(wi),
          full = cs.every(function (x) {
            return x.inp.value;
          });
        if (!full || solved[wi]) return;
        var ok = cs.every(function (x) {
          return x.inp.value === x.ch;
        });
        if (ok) {
          solved[wi] = 1;
          gained += 20;
          cs.forEach(function (x) {
            x.el.classList.add('is-ok');
            x.inp.readOnly = true;
          });
        } else cs.forEach(function (x) {
          if (x.inp.value !== x.ch) {
            x.el.classList.add('is-wrong');
            wrong++;
          }
        });
      });
      var n = Object.keys(solved).length;
      H.prog(n, C.words.length, n + ' di ' + C.words.length + ' parole');
      if (gained) {
        H.score(H.get() + gained, $('[data-check]', board));
        sfx.ok();
        cheer();
      }
      if (wrong) {
        lives--;
        H.lives(lives, LIVES);
        sfx.ko();
        oops();
        grid.classList.remove('is-shake');
        void grid.offsetWidth;
        grid.classList.add('is-shake');
      }
      if (!gained && !wrong) say('Completa almeno una parola, poi controlla.');
      paint();
      if (n === C.words.length) finish(true);else if (lives <= 0) finish(false);
    }
    function finish(win) {
      over = true;
      clearTimers();
      Object.keys(cells).forEach(function (k) {
        var x = cells[k];
        if (!win && x.inp.value !== x.ch) {
          x.inp.value = x.ch;
          x.el.classList.add('is-shown');
        }
        x.inp.readOnly = true;
      });
      var bonus = win ? Math.max(0, 60 - Math.floor(sec / 5)) : 0;
      if (bonus) H.score(H.get() + bonus);
      setTimeout(function () {
        endScreen(root, {
          kicker: win ? 'Cruciverba risolto' : 'Tentativi finiti',
          title: win ? 'Tutte le parole!' : 'Ecco la soluzione',
          score: H.get(),
          max: C.words.length * 20 + 60,
          msg: win ? 'Tempo ' + Math.floor(sec / 60) + ':' + ('0' + sec % 60).slice(-2) + ' · bonus velocità +' + bonus : 'Rileggi le definizioni e riprova.',
          again: function () {
            mount('cruci');
          }
        });
      }, win ? 500 : 1400);
    }
    $('[data-check]', board).onclick = check;
    $('[data-help]', board).onclick = function (e) {
      if (over) return;
      var miss = cellsOf(active).filter(function (x) {
        return x.inp.value !== x.ch;
      });
      if (!miss.length) return say('Questa parola è già giusta: controlla!');
      var x = miss[0];
      x.inp.value = x.ch;
      x.el.classList.remove('is-wrong');
      x.el.classList.add('is-shown');
      H.score(Math.max(0, H.get() - 5), e.currentTarget);
      sfx.flip();
    };
    every(1000, function () {
      if (!over) H.time(++sec);
    });
    H.score(0);
    setActive(1);
    say('Tocca una definizione o una casella. Tocca di nuovo per cambiare direzione.');
  }

  /* ---------- 3 · SFIDA A SQUADRE ---------- */
  function sfida(root) {
    var Q = D.sfida,
      names = store.get('giochi_squadre', ['Squadra Viola', 'Squadra Ciano']);
    var setup = h('<div class="g-board g-setup"><span class="g-label">Sfida a squadre · ' + Q.length + ' domande</span>' + '<h2 class="g-h">Chi gioca?</h2><div class="g-teams-in">' + names.map(function (n, i) {
      return '<label class="g-team-in" data-t="' + i + '"><span class="g-label">Squadra ' + (i + 1) + '</span><input value="' + n + '" maxlength="22"></label>';
    }).join('') + '</div><p class="g-note">A turno. 20 secondi per rispondere. Se sbagliate, l’altra squadra può rubare la domanda per metà punti.</p>' + '<div class="g-actions"><button class="g-btn" data-go>Si comincia</button></div></div>');
    root.appendChild(setup);
    $('[data-go]', setup).onclick = function () {
      names = $$('input', setup).map(function (x, i) {
        return x.value.trim() || 'Squadra ' + (i + 1);
      });
      store.set('giochi_squadre', names);
      setup.remove();
      play();
    };
    function play() {
      var pts = [0, 0],
        qi = 0,
        turn = 0;
      var top = h('<div class="g-hud g-hud--teams">' + names.map(function (n, i) {
        return '<div class="g-team" data-t="' + i + '"><span class="g-label">' + n + '</span><b class="g-num">0</b></div>';
      }).join('<div class="g-hud-prog"><div class="g-prog"><i></i></div><span class="g-label" data-prog></span></div>') + '</div>');
      root.appendChild(top);
      var board = h('<div class="g-board g-quiz"><div class="g-turn"><span class="g-label">Tocca a</span><b data-who></b><span class="g-steal" hidden>Rubata!</span></div>' + '<div class="g-timer"><i></i><b class="g-num g-num--sm" data-sec></b></div><h2 class="g-q"></h2><div class="g-opts"></div>' + '<div class="g-actions"><button class="g-btn" data-next hidden>Prossima domanda</button></div></div>');
      root.appendChild(board);
      var left, stealing, locked;
      function setScore(t, v, from) {
        var b = $('[data-t="' + t + '"] .g-num', top),
          delta = v - pts[t];
        pts[t] = v;
        b.textContent = v;
        b.classList.remove('is-pop');
        void b.offsetWidth;
        b.classList.add('is-pop');
        if (from) popAt(from, '+' + delta, true);
      }
      function who(t) {
        $('[data-who]', board).textContent = names[t];
        $$('.g-team', top).forEach(function (x) {
          x.classList.toggle('is-turn', +x.dataset.t === t);
        });
        board.dataset.t = t;
      }
      function startClock(s) {
        clearTimers();
        left = s;
        var tot = s;
        tick();
        every(1000, function () {
          left--;
          tick();
          if (left <= 3 && left > 0) sfx.tick();
          if (left <= 0) {
            clearTimers();
            miss(null);
          }
        });
        function tick() {
          $('[data-sec]', board).textContent = left;
          $('.g-timer i', board).style.width = left / tot * 100 + '%';
          board.classList.toggle('is-hurry', left <= 5);
        }
      }
      function ask() {
        var q = Q[qi];
        stealing = false;
        locked = false;
        turn = qi % 2;
        $('.g-steal', board).hidden = true;
        $('[data-next]', board).hidden = true;
        $('.g-q', board).textContent = q.q;
        who(turn);
        var opts = $('.g-opts', board);
        opts.innerHTML = '';
        opts.dataset.n = q.a.length;
        q.a.forEach(function (a, i) {
          var b = h('<button class="g-opt" type="button"><span class="g-key">' + 'ABCD'[i] + '</span><span>' + a + '</span></button>');
          b.onclick = function () {
            answer(i, b);
          };
          opts.appendChild(b);
        });
        top.querySelector('.g-prog i').style.width = qi / Q.length * 100 + '%';
        $('[data-prog]', top).textContent = 'Domanda ' + (qi + 1) + ' di ' + Q.length;
        board.classList.remove('is-in');
        void board.offsetWidth;
        board.classList.add('is-in');
        startClock(20);
      }
      function answer(i, btn) {
        if (locked) return;
        var q = Q[qi];
        if (i === q.ok) {
          locked = true;
          clearTimers();
          btn.classList.add('is-right');
          setScore(turn, pts[turn] + (stealing ? 50 : 100 + left * 5), btn);
          sfx.ok();
          cheer();
          reveal();
        } else {
          btn.classList.add('is-wrong');
          btn.disabled = true;
          miss(btn);
        }
      }
      function miss() {
        sfx.ko();
        if (!stealing) {
          stealing = true;
          turn = 1 - turn;
          who(turn);
          $('.g-steal', board).hidden = false;
          say(names[turn] + ', potete rubare!');
          startClock(10);
        } else {
          locked = true;
          clearTimers();
          oops();
          reveal();
        }
      }
      function reveal() {
        $$('.g-opt', board).forEach(function (b, i) {
          b.disabled = true;
          if (i === Q[qi].ok) b.classList.add('is-right');else if (!b.classList.contains('is-wrong')) b.classList.add('is-dim');
        });
        var nx = $('[data-next]', board);
        nx.hidden = false;
        nx.textContent = qi === Q.length - 1 ? 'Vedi il risultato' : 'Prossima domanda';
      }
      $('[data-next]', board).onclick = function () {
        qi++;
        if (qi < Q.length) return ask();
        top.querySelector('.g-prog i').style.width = '100%';
        var win = pts[0] === pts[1] ? -1 : pts[0] > pts[1] ? 0 : 1;
        endScreen(root, {
          kicker: 'Fine della sfida',
          title: win < 0 ? 'Pareggio!' : 'Vince ' + names[win],
          score: Math.max(pts[0], pts[1]),
          hideScore: false,
          max: 0,
          msg: names[0] + ' ' + pts[0] + ' · ' + names[1] + ' ' + pts[1],
          again: function () {
            mount('sfida');
          }
        });
      };
      ask();
    }
    say('Scegliete i nomi delle squadre.');
  }

  /* ---------- 4 · RIFLESSIONE ---------- */
  function rifl(root) {
    var R = D.rifl,
      saved = store.get('giochi_rifl', null);
    var board = h('<div class="g-board g-rifl"><span class="g-label">Riflessione personale · nessun punteggio</span><h2 class="g-h">' + R.domanda + '</h2>' + '<div class="g-spectrum"><input type="range" min="0" max="100" value="50" aria-label="Posizione"><div class="g-poles">' + R.poli.map(function (p) {
      return '<span>' + p + '</span>';
    }).join('') + '</div></div>' + '<label class="g-write"><span class="g-label">Perché</span><textarea rows="4" placeholder="' + R.spunto + '"></textarea></label>' + '<div class="g-actions"><span class="g-note">Resta su questo dispositivo. Nessuno la vede se non la condividi tu.</span><button class="g-btn" data-send>Consegna la carta</button></div></div>');
    root.appendChild(board);
    var range = $('input', board),
      ta = $('textarea', board);
    function label(v) {
      return v < 34 ? R.poli[0] : v > 66 ? R.poli[2] : R.poli[1];
    }
    function upd() {
      board.style.setProperty('--pos', range.value);
      $$('.g-poles span', board).forEach(function (s, i) {
        s.classList.toggle('is-on', R.poli[i] === label(+range.value));
      });
    }
    range.oninput = function () {
      upd();
    };
    range.onchange = function () {
      sfx.tick();
    };
    if (saved) {
      range.value = saved.v;
      ta.value = saved.t;
    }
    upd();
    $('[data-send]', board).onclick = function () {
      if (ta.value.trim().length < 8) {
        ta.focus();
        return say('Scrivi almeno una frase: anche un dubbio va bene.');
      }
      store.set('giochi_rifl', {
        v: +range.value,
        t: ta.value.trim()
      });
      board.remove();
      card();
    };
    function card() {
      var s = store.get('giochi_rifl');
      var el = h('<div class="g-board g-rifl-card"><div class="g-paper"><span class="g-label">La mia carta</span><span class="g-chip">' + label(s.v) + '</span><p></p><span class="g-sign">' + D.tema + '</span></div>' + '<p class="g-note">Ora confrontati con chi ti siede accanto: dove vi siete messi? Che cosa vi ha fatto pensare?</p>' + '<div class="g-actions"><button class="g-btn g-btn--ghost" data-edit>Riscrivi</button></div></div>');
      $('.g-paper p', el).textContent = s.t;
      root.appendChild(el);
      sfx.win();
      say('Grazie per la sincerità. Ogni domanda vera è già un passo.');
      $('[data-edit]', el).onclick = function () {
        mount('rifl');
      };
    }
    say('Qui non ci sono risposte giuste. Solo la tua.');
  }

  /* ---------- montaggio ---------- */
  var GAMES = {
    flash: flash,
    cruci: cruci,
    sfida: sfida,
    rifl: rifl
  };
  function mount(id) {
    clearTimers();
    var root = $('#game');
    root.innerHTML = '';
    root.dataset.game = id;
    $$('[data-game-tab]').forEach(function (b) {
      b.setAttribute('aria-selected', b.dataset.gameTab === id);
    });
    store.set('giochi_gioco', id);
    GAMES[id](root);
  }
  function skin(s) {
    d.body.dataset.skin = s;
    store.set('giochi_skin', s);
    $$('[data-skin-btn]').forEach(function (b) {
      b.setAttribute('aria-pressed', b.dataset.skinBtn === s);
    });
  }
  function init(start) {
    if (!$('#game')) return;
    var fixed = d.body.dataset.skinFixed;
    skin(fixed || store.get('giochi_skin', d.body.dataset.skin || 'arcade'));
    $$('[data-skin-btn]').forEach(function (b) {
      b.onclick = function () {
        skin(b.dataset.skinBtn);
        mount($('#game').dataset.game);
      };
    });
    $$('[data-game-tab]').forEach(function (b) {
      b.onclick = function () {
        mount(b.dataset.gameTab);
      };
    });
    var m = $('[data-mute]');
    if (m) {
      var upd = function () {
        m.setAttribute('aria-pressed', muted);
        m.textContent = muted ? 'Suoni: no' : 'Suoni: sì';
      };
      upd();
      m.onclick = function () {
        muted = !muted;
        store.set('giochi_muto', muted);
        upd();
        if (!muted) sfx.coin();
      };
    }
    var t = $('button[data-tema]');
    if (t) t.onclick = function () {
      var c = d.documentElement.dataset.tema === 'chiaro' ? 'scuro' : 'chiaro';
      d.documentElement.dataset.tema = c;
      try {
        localStorage.setItem('tema_lab', c);
      } catch (e) {}
    };
    var last = typeof start === 'string' && GAMES[start] ? start : store.get('giochi_gioco');
    mount(GAMES[last] && $('[data-game-tab="' + last + '"]') ? last : $('[data-game-tab]') ? $('[data-game-tab]').dataset.gameTab : 'flash');
  }
  w.Giochi = {
    init: init,
    mount: mount,
    skin: skin,
    sfx: sfx,
    hud: hud,
    end: endScreen,
    pop: popAt,
    h: h,
    $: $,
    $$: $$,
    say: say,
    cheer: cheer,
    oops: oops,
    store: store,
    every: every,
    clear: clearTimers,
    register: function (id, fn) {
      GAMES[id] = fn;
    }
  };
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', init);else init();
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "assets/artefatti/giochi/giochi.js", error: String((e && e.message) || e) }); }

// assets/artefatti/lab-artefatto.js
try { (() => {
/* Lab IRC — Kit artefatti. Mettere in fondo al <body class="la" data-anno="1-5">.
   Aggiunge: tema salvato, luce che segue il cursore, schede reattive, mascotte dell'anno (<lab-mascotte>, caricata da ../mascotte/), easter egg AMDG.
   API: LabArtefatto.say(testo) · .cheer() · .oops() · .amdg() · .lim(true|false)
   Modalità LIM: pulsante «LIM», tasto L o ?lim=1 → <html data-lim> (vedi lab-percezione.css). */
(function () {
  var cs = document.currentScript;
  if (!cs || !/lab-artefatto\.js/.test(cs.src || '')) return; /* incluso in un bundle: non fare nulla */
  var d = document,
    w = window;
  try {
    var t = localStorage.getItem('tema_lab');
    if (t) d.documentElement.dataset.tema = t;
  } catch (e) {}
  var root = d.documentElement,
    mascotEl = null,
    limBtn = null;
  var isLim = function () {
    return root.hasAttribute('data-lim');
  };
  try {
    var qm = /[?&]lim=(1|0)/.exec(location.search);
    if (qm) localStorage.setItem('lim_lab', qm[1]);
    if (localStorage.getItem('lim_lab') === '1') root.setAttribute('data-lim', '');
  } catch (e) {}
  function setLim(on) {
    if (on) root.setAttribute('data-lim', '');else root.removeAttribute('data-lim');
    try {
      localStorage.setItem('lim_lab', on ? '1' : '0');
    } catch (e) {}
    if (limBtn) limBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
    if (mascotEl) mascotEl.setAttribute('size', on ? '144' : '89');
    w.dispatchEvent(new CustomEvent('lab:lim', {
      detail: on
    }));
  }
  var reduce = w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var CHEER = ['Esatto!', 'Bravissimo!', 'Proprio così!', 'Ottimo!'];
  var OOPS = ['Quasi… riprova!', 'Mmm, pensaci ancora.', 'Non proprio. Coraggio!'];
  var pick = function (a) {
    return a[Math.floor(Math.random() * a.length)];
  };
  var SELF = d.currentScript && d.currentScript.src || '';
  var egg = null;
  function amdg() {
    if (egg) return;
    egg = d.createElement('div');
    egg.className = 'la-amdg';
    egg.setAttribute('role', 'dialog');
    egg.setAttribute('aria-label', 'Ad maiorem Dei gloriam');
    egg.innerHTML = '<div><div class="la-amdg-star">✦</div><div class="la-amdg-letters">' + ['A', 'M', 'D', 'G'].map(function (l, i) {
      return (i ? '<i style="animation-delay:' + (233 + i * 89) + 'ms">·</i>' : '') + '<b style="animation-delay:' + (233 + i * 144) + 'ms">' + l + '</b>';
    }).join('') + '</div><div class="la-amdg-line"></div><div class="la-amdg-lat">Ad maiorem Dei gloriam</div><div class="la-amdg-it">Per la maggior gloria di Dio</div></div>';
    d.body.appendChild(egg);
    var el = egg,
      timer;
    var close = function () {
      if (egg !== el) return;
      egg = null;
      clearTimeout(timer);
      d.removeEventListener('keydown', esc);
      el.classList.add('is-out');
      setTimeout(function () {
        el.remove();
      }, 610);
    };
    var esc = function (e) {
      if (e.key === 'Escape') close();
    };
    el.addEventListener('click', close);
    d.addEventListener('keydown', esc);
    timer = setTimeout(close, 6180);
  }
  function loadMascotte() {
    if (w.customElements && customElements.get('lab-mascotte')) return;
    if (d.querySelector('script[data-lab-mascotte]')) return;
    var sc = d.createElement('script');
    sc.src = SELF ? SELF.replace(/artefatti\/lab-artefatto\.js.*$/, 'mascotte/lab-mascotte.js') : '/assets/mascotte/lab-mascotte.js';
    sc.setAttribute('data-lab-mascotte', '');
    d.head.appendChild(sc);
  }
  function mascot() {
    var y = +(d.body.getAttribute('data-anno') || 0);
    if (!(y >= 1 && y <= 5) || d.body.hasAttribute('data-no-mascotte')) return null;
    loadMascotte();
    var wrap = d.createElement('div');
    wrap.className = 'la-mascot';
    var el = d.createElement('lab-mascotte');
    el.setAttribute('anno', y);
    el.setAttribute('size', isLim() ? '144' : '89');
    mascotEl = el;
    el.setAttribute('fumetto', 'sinistra');
    wrap.appendChild(el);
    d.body.appendChild(wrap);
    return {
      say: function (t) {
        if (el.bubble) el.bubble(t);
      }
    };
  }
  function init() {
    var mas = mascot();
    var tools = d.querySelector('.g-tools, .ll-tools');
    if (!d.body.classList.contains('ll')) {
      /* la lezione React disegna il suo pulsante LIM nella testata */
      limBtn = d.createElement('button');
      limBtn.type = 'button';
      limBtn.textContent = 'LIM';
      limBtn.setAttribute('data-lim-toggle', '');
      limBtn.title = 'Modalità LIM: caratteri grandi (tasto L)';
      limBtn.setAttribute('aria-pressed', isLim() ? 'true' : 'false');
      limBtn.className = !tools ? 'la-lim-btn' : tools.classList.contains('g-tools') ? 'g-tool' : 'll-tool';
      limBtn.addEventListener('click', function () {
        setLim(!isLim());
      });
      if (tools) tools.insertBefore(limBtn, tools.firstChild);else d.body.appendChild(limBtn);
    }
    if (!reduce) {
      var h = d.createElement('div');
      h.className = 'la-halo';
      h.setAttribute('aria-hidden', 'true');
      d.body.appendChild(h);
      var hx = innerWidth / 2,
        hy = innerHeight / 3,
        tx = hx,
        ty = hy;
      w.addEventListener('mousemove', function (e) {
        tx = e.clientX;
        ty = e.clientY;
        h.style.opacity = 1;
      });
      (function loop() {
        hx += (tx - hx) * .1618;
        hy += (ty - hy) * .1618;
        h.style.transform = 'translate(' + (hx - 233) + 'px,' + (hy - 233) + 'px)';
        requestAnimationFrame(loop);
      })();
    }
    var hot = null;
    d.addEventListener('mousemove', function (e) {
      var c = e.target.closest ? e.target.closest('.la-card') : null;
      if (hot && hot !== c) {
        hot.classList.remove('is-hot');
        hot.style.transform = '';
      }
      hot = c;
      if (!c) return;
      var r = c.getBoundingClientRect(),
        px = (e.clientX - r.left) / r.width,
        py = (e.clientY - r.top) / r.height;
      c.classList.add('is-hot');
      c.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
      c.style.setProperty('--my', (py * 100).toFixed(1) + '%');
      if (!c.hasAttribute('data-flat') && !reduce && !isLim()) c.style.transform = 'perspective(987px) rotateX(' + ((.5 - py) * 4).toFixed(2) + 'deg) rotateY(' + ((px - .5) * 4).toFixed(2) + 'deg) translateY(-3px)';
    });
    d.addEventListener('animationend', function (e) {
      if (e.animationName === 'labRise' && e.target.hasAttribute && e.target.hasAttribute('data-reveal')) e.target.removeAttribute('data-reveal');
    });
    var buf = '';
    d.addEventListener('keydown', function (e) {
      var tag = (e.target.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable || !e.key || e.key.length !== 1) return;
      if ((e.key === 'l' || e.key === 'L') && !e.ctrlKey && !e.metaKey && !e.altKey) setLim(!isLim());
      buf = (buf + e.key.toLowerCase()).slice(-4);
      if (buf === 'amdg') amdg();
    });
    w.addEventListener('lab:amdg', amdg);
    var say = function (t) {
      if (mas) mas.say(t);
    };
    w.LabArtefatto = {
      say: say,
      cheer: function () {
        say(pick(CHEER));
      },
      oops: function () {
        say(pick(OOPS));
      },
      amdg: amdg,
      lim: setLim
    };
    console.log('%cA · M · D · G', 'font: 600 21px Cinzel, Georgia, serif; color: #E3C27A; letter-spacing: .3em');
  }
  w.LabArtefatto = {
    say: function () {},
    cheer: function () {},
    oops: function () {},
    amdg: amdg
  };
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', init);else init();
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "assets/artefatti/lab-artefatto.js", error: String((e && e.message) || e) }); }

// assets/artefatti/lezione/lab-lezione-attivita.js
try { (() => {
/* Lab IRC — Attività di classe della lezione (React + htm). Dopo lab-lezione.js e lab-lezione-plus.js.
   Blocchi: domanda/sondaggio (ingresso → uscita con confronto) · nuvola · spettro · chi (chi lo dice?) · quiz (più domande, stelle)
            idee (da portare a casa) · continua · etimo (parti della parola) · agenda (scaletta cliccabile) · timer (= consegna)
   Stato solo in memoria: voti e parole restano finché la pagina è aperta, anche cambiando scena; nessun dato salvato. */
(function () {
  var w = window,
    d = document,
    R = w.React,
    LL = w.LabLezione,
    html = w.html;
  if (!LL || !R || !html) return;
  var useState = R.useState,
    useEffect = R.useEffect,
    useRef = R.useRef;
  var inline = LL.inline,
    md = LL.md,
    festa = LL.festa,
    plain = LL.plain;
  function say(t) {
    var m = d.querySelector('.ll-head-m lab-mascotte, .ll-masc lab-mascotte');
    if (m && m.bubble) m.bubble(t);else if (w.LabArtefatto) w.LabArtefatto.say(t);
  }
  function cheer() {
    w.LabArtefatto && w.LabArtefatto.cheer();
  }
  function oops() {
    w.LabArtefatto && w.LabArtefatto.oops();
  }
  function somma(v) {
    return v.reduce(function (a, b) {
      return a + b;
    }, 0);
  }
  function pct(v, i) {
    var t = somma(v);
    return t ? Math.round(v[i] / t * 100) : 0;
  }
  function hash(s) {
    var h = 7;
    for (var i = 0; i < s.length; i++) h = h * 31 + s.charCodeAt(i) | 0;
    return Math.abs(h);
  }
  function norm(x) {
    return String(x || '').trim().toLowerCase().replace(/\s+/g, ' ').slice(0, 24);
  }
  function useArma() {
    // conferma a due tocchi per le azioni che cancellano
    var s = useState(false),
      a = s[0],
      set = s[1],
      t = useRef(0);
    useEffect(function () {
      return function () {
        clearTimeout(t.current);
      };
    }, []);
    return [a, function (fn) {
      clearTimeout(t.current);
      if (!a) {
        set(true);
        t.current = setTimeout(function () {
          set(false);
        }, 3000);
        return;
      }
      set(false);
      fn();
    }];
  }
  var POLL = {},
    NUV = {},
    ac;
  LL.bip = function () {
    try {
      ac = ac || new (w.AudioContext || w.webkitAudioContext)();
      [0, .233, .466].forEach(function (t, i) {
        var o = ac.createOscillator(),
          g = ac.createGain(),
          t0 = ac.currentTime + t;
        o.frequency.value = i === 2 ? 880 : 660;
        g.gain.setValueAtTime(.0001, t0);
        g.gain.exponentialRampToValueAtTime(.2, t0 + .02);
        g.gain.exponentialRampToValueAtTime(.0001, t0 + .2);
        o.connect(g);
        g.connect(ac.destination);
        o.start(t0);
        o.stop(t0 + .22);
      });
    } catch (e) {}
  };

  /* ---------- SONDAGGIO: alzata di mano, il docente tocca; «confronta» mostra il voto d'ingresso (tratteggio) ---------- */
  function Sondaggio(p) {
    var op = p.opzioni || [],
      id = p.id || plain(p.q);
    var S = POLL[id] || (POLL[id] = {
      v: op.map(function () {
        return 0;
      }),
      h: [],
      show: false
    });
    if (S.v.length !== op.length) S.v = op.map(function () {
      return 0;
    });
    var f = useState(0),
      setF = f[1],
      fl = useState(null),
      flash = fl[0],
      setFlash = fl[1],
      mg = useState(''),
      msg = mg[0],
      setMsg = mg[1],
      arm = useArma(),
      tm = useRef(0);
    useEffect(function () {
      return function () {
        clearTimeout(tm.current);
      };
    }, []);
    function rif() {
      setF(function (x) {
        return x + 1;
      });
    }
    var R0 = p.confronta && POLL[p.confronta],
      ref = R0 && R0.v.length === op.length && somma(R0.v) > 0 ? R0.v : null;
    var tot = somma(S.v),
      max = Math.max.apply(null, S.v),
      show = S.show;
    function vota(i) {
      S.v[i]++;
      S.h.push(i);
      setFlash(i);
      clearTimeout(tm.current);
      tm.current = setTimeout(function () {
        setFlash(null);
      }, 1618);
      setMsg('✓ «' + plain(op[i]) + '» · ');
      rif();
    }
    function annulla() {
      var i = S.h.pop();
      if (i == null) return;
      if (S.v[i] > 0) S.v[i]--;
      setMsg('Tolto un voto a «' + plain(op[i]) + '» · ');
      rif();
    }
    function mostra() {
      S.show = !S.show;
      if (S.show && tot) {
        say(ref ? 'Ecco com’è cambiata la classe!' : 'Ecco che cosa pensa la classe!');
        festa();
      }
      rif();
    }
    return html`<div className=${'lx-poll' + (show ? ' is-shown' : '')}>
      ${p.etichetta && html`<span className="la-meta">${p.etichetta}</span>`}
      <h3 className="ll-block-h">${inline(p.q, 'q')}</h3>
      <p className="ll-hint">${p.istruzione || 'Alzata di mano: il docente tocca una risposta per ogni voto. Nessun nome, nessun punteggio.'}</p>
      <div className="lx-opts">${op.map(function (o, i) {
      var pc = pct(S.v, i),
        rp = ref ? pct(ref, i) : null,
        n = S.v[i];
      return html`<button key=${i} type="button" className=${'lx-opt' + (flash === i ? ' is-voted' : '') + (show && tot && n === max ? ' is-top' : '')} onClick=${function () {
        vota(i);
      }} aria-label=${plain(o) + ': aggiungi un voto' + (show ? ' (' + pc + '%, ' + n + (n === 1 ? ' voto)' : ' voti)') : '')}>
          <i className="lx-bar" style=${{
        width: (show ? pc : 0) + '%'
      }}></i>
          ${show && rp != null && html`<i className="lx-ref" style=${{
        width: rp + '%'
      }}></i>`}
          <span className="lx-opt-t">${inline(o, 'o' + i)}</span>
          <span className="lx-opt-r">${show ? html`<b>${pc}%</b><small>${n} ${n === 1 ? 'voto' : 'voti'}${rp != null ? ' · prima ' + rp + '%' : ''}</small>` : ''}</span>
          <span className="lx-ok" aria-hidden="true">✓ Votato</span>
        </button>`;
    })}</div>
      <div className="ll-row">
        <button className="ll-btn" onClick=${mostra}>${show ? 'Nascondi i risultati' : 'Mostra i risultati'}</button>
        <button className="ll-btn ll-btn--ghost" disabled=${!S.h.length} onClick=${annulla}>Annulla l’ultimo</button>
        <button className="ll-link" onClick=${function () {
      arm[1](function () {
        S.v = op.map(function () {
          return 0;
        });
        S.h = [];
        S.show = false;
        setMsg('Sondaggio azzerato · ');
        rif();
      });
    }}>${arm[0] ? 'Sicuro? Tocca ancora' : 'Azzera'}</button>
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
    var S = NUV[id] || (NUV[id] = function () {
      var o = {
        w: {},
        h: []
      };
      (p.semi || []).forEach(function (x) {
        x = norm(x);
        if (x) o.w[x] = (o.w[x] || 0) + 1;
      });
      return o;
    }());
    var f = useState(0),
      setF = f[1],
      v = useState(''),
      val = v[0],
      setVal = v[1],
      fr = useState(null),
      fresh = fr[0],
      setFresh = fr[1],
      arm = useArma();
    function rif() {
      setF(function (n) {
        return n + 1;
      });
    }
    function add(x) {
      x = norm(x);
      if (!x) return;
      S.w[x] = (S.w[x] || 0) + 1;
      S.h.push(x);
      setFresh(x);
      rif();
    }
    var keys = Object.keys(S.w),
      max = Math.max.apply(null, keys.map(function (k) {
        return S.w[k];
      }).concat(1)),
      tot = keys.reduce(function (a, k) {
        return a + S.w[k];
      }, 0);
    keys.sort(function (a, b) {
      return hash(a) % 13 - hash(b) % 13 || a.localeCompare(b, 'it');
    });
    return html`<div className="lx-cloud">
      <h3 className="ll-block-h">${inline(p.q, 'q')}</h3>
      <p className="ll-hint">${p.istruzione || 'Scrivete le parole che dicono i ragazzi; toccate una parola ripetuta per farla crescere.'}</p>
      <form className="lx-cloud-in" onSubmit=${function (e) {
      e.preventDefault();
      add(val);
      setVal('');
    }}>
        <input type="text" value=${val} maxLength="24" placeholder="Scrivi una parola…" aria-label="Nuova parola" onChange=${function (e) {
      setVal(e.target.value);
    }} />
        <button className="ll-btn" type="submit">Aggiungi</button>
      </form>
      <div className="lx-words" aria-live="polite">${keys.length ? keys.map(function (k) {
      var n = S.w[k],
        h = hash(k);
      return html`<button key=${k} type="button" className=${'lx-word' + (k === fresh ? ' is-new' : '')} title="Tocca per +1" style=${{
        '--s': (max > 1 ? 1 + 1.618 * (n - 1) / (max - 1) : 1.272).toFixed(3),
        '--c': COL[h % COL.length],
        '--r': (h % 5 - 2) * 1.5 + 'deg'
      }} onClick=${function () {
        add(k);
      }}>${k}${n > 1 && html`<sup>${n}</sup>`}</button>`;
    }) : html`<span className="lx-empty">Le parole della classe appariranno qui</span>`}</div>
      <div className="ll-row">
        <button className="ll-btn ll-btn--ghost" disabled=${!S.h.length} onClick=${function () {
      var k = S.h.pop();
      if (!k) return;
      if (--S.w[k] <= 0) delete S.w[k];
      setFresh(null);
      rif();
    }}>Annulla l’ultima</button>
        <button className="ll-link" onClick=${function () {
      arm[1](function () {
        S.w = {};
        S.h = [];
        setFresh(null);
        rif();
      });
    }}>${arm[0] ? 'Sicuro? Tocca ancora' : 'Pulisci'}</button>
        <span className="ll-tally">${keys.length} ${keys.length === 1 ? 'parola' : 'parole'} · ${tot} ${tot === 1 ? 'voce' : 'voci'}</span>
      </div>
    </div>`;
  });

  /* ---------- SPETTRO: posizioni su una linea (e chi ne sta fuori); ogni punto apre nome, etimologia, esempio ---------- */
  LL.blocco('spettro', function (p) {
    var pt = p.punti || [],
      s = useState(null),
      a = s[0],
      setA = s[1],
      v = useState({}),
      visti = v[0],
      setVisti = v[1];
    function tocca(i) {
      setA(i);
      var nv = Object.assign({}, visti);
      nv[i] = 1;
      if (Object.keys(nv).length === pt.length && Object.keys(visti).length < pt.length) say(p.fine || 'Le avete viste tutte!');
      setVisti(nv);
    }
    var x = a !== null ? pt[a] : null;
    return html`<div className="lx-spec">
      ${(p.q || p.titolo) && html`<h3 className="ll-block-h">${inline(p.q || p.titolo, 'q')}</h3>`}
      ${p.poli && html`<div className="lx-ends">${p.poli.map(function (y, i) {
      return html`<span key=${i}>${y}</span>`;
    })}</div>`}
      <div className="lx-axis" role="group" aria-label=${plain(p.q || p.titolo || 'Spettro delle posizioni')}>
        ${pt.map(function (q, i) {
      return html`<button key=${i} type="button" className=${'lx-pt' + (a === i ? ' is-on' : '') + (visti[i] ? ' is-seen' : '') + (q.fuori ? ' is-off' : '')} style=${{
        '--x': q.x == null ? 50 : q.x
      }} aria-pressed=${a === i} onClick=${function () {
        tocca(i);
      }}><i></i><span>${q.t}</span>${q.fuori && html`<small>${q.fuori === true ? 'fuori dalla linea' : q.fuori}</small>`}</button>`;
    })}
      </div>
      <div aria-live="polite">${x ? html`<div key=${a} className="lx-spec-c">${x.etim && html`<small>${inline(x.etim, 'e')}</small>`}<b>${x.t}</b>${md(x.def, 'lp-p')}${x.es && html`<p className="lx-ex">${inline(x.es, 'x')}</p>`}</div>` : html`<p className="ll-hint">${p.istruzione || 'Toccate un punto sulla linea: la posizione e da dove viene il suo nome.'}</p>`}</div>
    </div>`;
  });

  /* ---------- CHI LO DICE?: frasi d'autore da abbinare a una posizione ---------- */
  LL.blocco('chi', function (p) {
    var fr = p.frasi || [],
      op = p.opzioni || [],
      s = useState(function () {
        return fr.map(function () {
          return null;
        });
      }),
      ans = s[0],
      setAns = s[1];
    var done = ans.filter(function (x) {
        return x !== null;
      }).length,
      ok = ans.filter(function (x, i) {
        return x === fr[i].ok;
      }).length;
    function pick(qi, i) {
      if (ans[qi] !== null) return;
      var c = ans.slice();
      c[qi] = i;
      setAns(c);
      if (i === fr[qi].ok) cheer();else oops();
      if (c.every(function (x, j) {
        return x === fr[j].ok;
      })) {
        festa();
        setTimeout(function () {
          say(p.fine || 'Tutte giuste!');
        }, 1618);
      }
    }
    return html`<div className="lx-match">
      <div className="lx-top"><span className="la-meta">${p.etichetta || 'Chi lo dice?'}</span><span className="ll-tally" aria-live="polite">${done ? 'Indovinate ' + ok + ' su ' + fr.length : 'Abbinate ogni frase a una posizione'}</span></div>
      ${p.q && html`<h3 className="ll-block-h">${inline(p.q, 'q')}</h3>`}
      <div className="lx-qms">${fr.map(function (f, qi) {
      var a = ans[qi];
      return html`<article key=${qi} className=${'lx-qm' + (a === null ? '' : a === f.ok ? ' is-ok' : ' is-ko')}>
          <div className="lx-qm-t"><blockquote>${inline(f.t, 't' + qi)}</blockquote>${f.chi && html`<span className="lx-who">${f.chi}</span>`}</div>
          <div className="lx-qm-b">${op.map(function (o, i) {
        return html`<button key=${i} type="button" disabled=${a !== null} className=${a === null ? '' : i === f.ok ? 'is-right' : i === a ? 'is-wrong' : 'is-dim'} onClick=${function () {
          pick(qi, i);
        }}>${o}</button>`;
      })}</div>
          ${a !== null && f.why && html`<p className="lx-qm-why">${inline(f.why, 'w' + qi)}</p>`}
        </article>`;
    })}</div>
      ${done === fr.length && ok === fr.length && html`<p className="ll-why is-ok"><strong>Tutte giuste. </strong>${inline(p.why || 'Ogni frase dice una posizione diversa davanti alla stessa domanda.', 'w')}</p>`}
      ${done > 0 && html`<div className="ll-row"><button className="ll-link" onClick=${function () {
      setAns(fr.map(function () {
        return null;
      }));
    }}>Rifate l’abbinamento</button></div>`}
    </div>`;
  });

  /* ---------- QUIZ: più domande in fila, pallini di avanzamento, stelle alla fine ---------- */
  LL.blocco('quiz', function (p) {
    var D = p.domande || [],
      n = D.length,
      s = useState(0),
      k = s[0],
      setK = s[1],
      r = useState([]),
      res = r[0],
      setRes = r[1],
      pk = useState(null),
      pick = pk[0],
      setPick = pk[1];
    var fine = k >= n,
      q = D[k] || {},
      ok = res.filter(Boolean).length,
      st = ok === n ? 3 : ok >= Math.ceil(n / 2) ? 2 : ok ? 1 : 0;
    function choose(i) {
      if (pick !== null) return;
      setPick(i);
      var c = res.slice();
      c[k] = i === q.ok;
      setRes(c);
      if (i === q.ok) cheer();else oops();
    }
    function next() {
      setPick(null);
      setK(k + 1);
      if (k + 1 >= n && ok === n) festa();
    }
    return html`<div className="lx-quiz">
      <div className="lx-top"><span className="la-meta">${fine ? 'Risultato' : (p.etichetta || 'Verifica') + ' · domanda ' + (k + 1) + ' di ' + n}</span><span className="lx-pips" aria-hidden="true">${D.map(function (_, j) {
      return html`<i key=${j} className=${res[j] === true ? 'is-ok' : res[j] === false ? 'is-ko' : j === k ? 'is-on' : ''}></i>`;
    })}</span></div>
      ${!fine ? html`<div key=${k} className="lx-quiz-q">
        <h3 className="la-q">${inline(q.q, 'q')}</h3>
        <div className="la-choices">${(q.opzioni || []).map(function (o, i) {
      var cls = 'la-choice' + (pick === null ? '' : i === q.ok ? ' is-right' : i === pick ? ' is-wrong' : ' is-dim');
      return html`<button key=${i} className=${cls} disabled=${pick !== null} onClick=${function () {
        choose(i);
      }}><span className="la-key">${'ABCDE'[i]}</span>${inline(o, 'o' + i)}</button>`;
    })}</div>
        <div aria-live="polite">${pick !== null && html`<p className=${'ll-why ' + (pick === q.ok ? 'lx-yes' : 'is-ko')}><strong>${pick === q.ok ? 'Esatto. ' : 'Non proprio. '}</strong>${inline(q.why || '', 'w')}</p>`}</div>
        ${pick !== null && html`<div className="ll-row"><button className="ll-btn" onClick=${next}>${k < n - 1 ? 'Prossima domanda' : 'Vedi il risultato'}</button></div>`}
      </div>` : html`<div className="lx-quiz-end">
        <div className="lx-stars" role="img" aria-label=${st + ' stelle su 3'}>${[0, 1, 2].map(function (i) {
      return html`<i key=${i} className=${i < st ? 'is-on' : ''} style=${{
        '--i': i
      }}></i>`;
    })}</div>
        <b className="lx-score">${ok} / ${n}</b>
        <p className=${st === 3 ? 'll-why is-ok' : 'lx-quiz-msg'}>${st === 3 ? p.perfetto || 'Perfetto: avete capito tutto!' : st === 2 ? p.bene || 'Bene! Ancora un piccolo ripasso.' : p.ripasso || 'Riprendiamo insieme i concetti chiave.'}</p>
        <div className="ll-row"><button className="ll-btn ll-btn--ghost" onClick=${function () {
      setK(0);
      setRes([]);
      setPick(null);
    }}>Rifate il quiz</button></div>
      </div>`}
    </div>`;
  });

  /* ---------- IDEE DA PORTARE A CASA: una alla volta (effetto Zeigarnik) ---------- */
  LL.blocco('idee', function (p) {
    var I = p.idee || [],
      s = useState(0),
      n = s[0],
      setN = s[1];
    function tocca() {
      if (n < I.length) {
        setN(n + 1);
        if (n + 1 === I.length) {
          cheer();
          festa();
        }
      } else setN(0);
    }
    return html`<div className="lx-take">
      ${p.titolo && html`<h3 className="ll-block-h">${inline(p.titolo, 't')}</h3>`}
      <ol className="lx-take-l" aria-live="polite">${I.map(function (t, i) {
      return html`<li key=${i} className=${i < n ? 'is-on' : ''} aria-hidden=${i >= n}><span>${i + 1}</span><p>${i < n ? inline(t, 'i' + i) : ''}</p></li>`;
    })}</ol>
      <div className="ll-row"><button className=${'ll-btn' + (n === I.length ? ' ll-btn--ghost' : '')} onClick=${tocca}>${!n ? p.pulsante || 'Rivela la prima idea' : n < I.length ? 'Rivela la prossima · ' + (n + 1) + ' di ' + I.length : 'Ricomincia'}</button></div>
    </div>`;
  });

  /* ---------- CONTINUA: rimandi finali (giochi, compito, da capo) ---------- */
  LL.blocco('continua', function (p, ctx) {
    function fai(v) {
      if (v.vai === 'giochi') ctx.gioca(v.gioco);else if (v.vai === 'inizio') ctx.vai(0);else if (typeof v.vai === 'number') ctx.vai(v.vai - 1);else if (v.vai) w.location.href = v.vai;
    }
    return html`<div className="lx-next">${(p.voci || []).map(function (v, i) {
      var inn = [html`<b key="b">${v.t}</b>`, html`<span key="s">${inline(v.d || '', 'd' + i)}</span>`];
      return v.vai ? html`<button key=${i} type="button" className=${'lx-box' + (v.principale ? ' lx-box--main' : '')} onClick=${function () {
        fai(v);
      }}>${inn}<i aria-hidden="true">${v.vai === 'inizio' ? '↺' : '→'}</i></button>` : html`<div key=${i} className="lx-box">${inn}</div>`;
    })}</div>`;
  });

  /* ---------- ETIMO: la parola chiave si scompone; ogni parte si tocca ---------- */
  LL.blocco('etimo', function (p) {
    var P = p.parti || [],
      s = useState(function () {
        return P.map(function () {
          return false;
        });
      }),
      o = s[0],
      setO = s[1],
      tutte = o.every(Boolean);
    function tocca(i) {
      var c = o.slice();
      c[i] = !c[i];
      setO(c);
      if (c.every(Boolean) && !tutte) say(p.battuta || 'Ecco la storia della parola.');
    }
    return html`<div className=${'lx-etym' + (tutte ? ' is-all' : '')}>
      <span className="la-meta">${p.etichetta || 'Da dove viene la parola · toccate le parti'}</span>
      <p className="lx-etym-w">${p.parola}</p>
      <div className="lx-etym-parts">${P.map(function (x, i) {
      return [i > 0 && html`<span key=${'n' + i} className="lx-etym-plus" aria-hidden="true">${(p.nessi || [])[i - 1] || '+'}</span>`, html`<button key=${'p' + i} type="button" className="lx-etym-p" aria-expanded=${o[i]} onClick=${function () {
        tocca(i);
      }}><b>${x.t}</b><small>${inline(x.d || '', 'd' + i)}</small></button>`];
    })}</div>
      <div aria-live="polite">${tutte && p.spiegazione && html`<p className="ll-gloss">${inline(p.spiegazione, 's')}</p>`}</div>
    </div>`;
  });

  /* ---------- AGENDA: le fasi della lezione con i minuti; un tocco porta alla fase ---------- */
  LL.blocco('agenda', function (p, ctx) {
    var F = ctx.fasi || [],
      S = ctx.scene || [];
    return html`<div className="lx-agenda">
      <div className="lx-agenda-h"><b>${p.titolo || 'La lezione di oggi'}</b><span>${ctx.totale}′</span></div>
      ${F.map(function (f, fi) {
      return html`<button key=${fi} type="button" className="lx-ag" onClick=${function () {
        ctx.vai(f.idx[0]);
      }}><i>${fi + 1}</i><span><b>${f.n}</b><small>${f.idx.map(function (k) {
        return plain(S[k].titolo);
      }).join(' · ')}</small></span><em>${f.min}′</em></button>`;
    })}
    </div>`;
  });
  if (LL.blocchi.consegna) LL.blocco('timer', LL.blocchi.consegna);
  LL.attivita = '2026-10-03';
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "assets/artefatti/lezione/lab-lezione-attivita.js", error: String((e && e.message) || e) }); }

// assets/artefatti/lezione/lab-lezione-percezione.js
try { (() => {
/* Lab IRC — Percezione nella lezione: alimenta il filo di avanzamento (continuità, effetto Zeigarnik)
   e segna l'ultima scena (regola picco–fine). Il resto è CSS (lab-lezione-percezione.css). */
(function () {
  var d = document,
    r = d.documentElement,
    raf = 0;
  function upd() {
    raf = 0;
    var dots = d.querySelectorAll('.ll-nav .ll-dot'),
      n = dots.length,
      i = 0;
    for (var k = 0; k < n; k++) if (dots[k].getAttribute('aria-current') === 'step') i = k;
    r.style.setProperty('--lz-prog', n ? ((i + 1) / n).toFixed(4) : '0');
    r.style.setProperty('--lz-rail', n > 1 ? (i / (n - 1)).toFixed(4) : '0');
    d.body.toggleAttribute('data-lz-ultima', n > 1 && i === n - 1);
  }
  function plan() {
    if (!raf) raf = requestAnimationFrame(upd);
  }
  function start() {
    new MutationObserver(plan).observe(d.getElementById('app') || d.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['aria-current']
    });
    plan();
  }
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', start);else start();
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "assets/artefatti/lezione/lab-lezione-percezione.js", error: String((e && e.message) || e) }); }

// assets/artefatti/lezione/lab-lezione-plus.js
try { (() => {
/* Lab IRC — Strumenti aggiuntivi della lezione (2 ottobre 2026).
   Animazioni esplicative e attività di classe, registrate come blocchi con LabLezione.blocco.
   Richiede lab-lezione.js caricato prima. Ogni blocco: pulsanti veri, tastiera, tocco, 360 px, prefers-reduced-motion.
   Blocchi: catena · animazione · strati · bilancia · stima · lente · leggi · ordina · bivio · varianti · consegna */
(function () {
  var w = window,
    d = document,
    R = w.React,
    LL = w.LabLezione,
    html = w.html;
  if (!LL || !R || !html) return;
  var useState = R.useState,
    useEffect = R.useEffect,
    useMemo = R.useMemo;
  var inline = LL.inline,
    md = LL.md,
    festa = LL.festa;
  var reduce = w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function say(t) {
    var m = d.querySelector('.ll-head-m lab-mascotte, .ll-masc lab-mascotte');
    if (m && m.bubble) m.bubble(t);else if (w.LabArtefatto) w.LabArtefatto.say(t);
  }
  function cheer() {
    w.LabArtefatto && w.LabArtefatto.cheer();
  }
  function oops() {
    w.LabArtefatto && w.LabArtefatto.oops();
  }
  function plain(s) {
    return String(s || '').replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\*([^*]+)\*/g, '$1');
  }
  function H(p) {
    return p.titolo ? html`<h3 className="ll-block-h">${inline(p.titolo, 'h')}</h3>` : null;
  }
  function num(x) {
    return Number(x).toLocaleString('it-IT');
  }
  function mescola(n, seed) {
    // permutazione deterministica, mai identica all'ordine giusto
    var a = Array.from({
        length: n
      }, function (_, i) {
        return i;
      }),
      s = (seed || 7) + n * 31;
    for (var i = n - 1; i > 0; i--) {
      s = (s * 9301 + 49297) % 233280;
      var j = Math.floor(s / 233280 * (i + 1));
      var t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    if (n > 1 && a.every(function (v, i) {
      return v === i;
    })) a.push(a.shift());
    return a;
  }
  function Sub(p) {
    var F = LL.blocchi[p.b.tipo];
    return html`<section className="ll-block" data-tipo=${p.b.tipo}>${F ? F(p.b, p.ctx) : html`<p className="ll-hint">Blocco sconosciuto: ${p.b.tipo}</p>`}</section>`;
  }

  /* ---------- CATENA: anelli causa-effetto che si agganciano; poi «togli un anello» ---------- */
  LL.blocco('catena', function (p) {
    var a = p.anelli || [],
      s = useState(p.iniziali || 1),
      k = s[0],
      setK = s[1];
    var pl = useState(false),
      play = pl[0],
      setPlay = pl[1],
      r = useState(null),
      rotto = r[0],
      setRotto = r[1],
      m = useState(false),
      prova = m[0],
      setProva = m[1];
    useEffect(function () {
      if (!play) return;
      if (k >= a.length) {
        setPlay(false);
        return;
      }
      var t = setTimeout(function () {
        setK(k + 1);
      }, reduce ? 800 : 1618);
      return function () {
        clearTimeout(t);
      };
    }, [play, k]);
    useEffect(function () {
      if (k === a.length && a.length > 1) say(p.fine || 'Catena completa: ogni anello regge quello dopo.');
    }, [k]);
    function tocca(i) {
      if (!prova) return;
      if (rotto === i) {
        setRotto(null);
        return;
      }
      setRotto(i);
      oops();
    }
    return html`<div className=${'lp-chain' + (prova ? ' is-test' : '')}>
      ${H(p)}
      <ol className="lp-chain-l" aria-live="polite">${a.slice(0, k).map(function (x, i) {
      var st = rotto === i ? ' is-broken' : rotto !== null && i > rotto ? ' is-fallen' : '';
      return html`<li key=${i} className=${'lp-ring' + st}>
          ${i > 0 && html`<span className="lp-link" aria-hidden="true"><i></i>${x.nesso && html`<em>${x.nesso}</em>`}</span>`}
          ${prova ? html`<button className="lp-node" aria-pressed=${rotto === i} onClick=${function () {
        tocca(i);
      }}><b>${inline(x.t, 't' + i)}</b>${x.d && html`<span>${inline(x.d, 'd' + i)}</span>`}</button>` : html`<div className="lp-node"><b>${inline(x.t, 't' + i)}</b>${x.d && html`<span>${inline(x.d, 'd' + i)}</span>`}</div>`}
        </li>`;
    })}</ol>
      <div aria-live="polite">${rotto !== null && html`<p key=${'r' + rotto} className="ll-why is-ko"><strong>Senza «${plain(a[rotto].t)}». </strong>${inline(a[rotto].senza || 'Gli anelli che seguono perdono la loro ragione: la conseguenza non segue più.', 's')}</p>`}</div>
      <div className="ll-row">
        ${k < a.length ? [html`<button key="n" className="ll-btn" onClick=${function () {
      setPlay(false);
      setK(k + 1);
    }}>${p.pulsante || 'Anello successivo'}</button>`, html`<button key="p" className="ll-btn ll-btn--ghost" onClick=${function () {
      setPlay(!play);
    }}>${play ? 'Pausa' : 'Riproduci tutto'}</button>`] : [p.rottura !== false && a.length > 2 && html`<button key="t" className="ll-btn ll-btn--ghost" aria-pressed=${prova} onClick=${function () {
      setProva(!prova);
      setRotto(null);
    }}>${prova ? 'Ricomponi la catena' : 'Togli un anello'}</button>`, html`<button key="r" className="ll-link" onClick=${function () {
      setK(p.iniziali || 1);
      setProva(false);
      setRotto(null);
    }}>Riparti</button>`]}
        <span className="ll-tally">${k} / ${a.length}</span>
      </div>
      ${prova && rotto === null && html`<p className="ll-hint" style=${{
      marginTop: 13
    }}>Tocca un anello: che cosa cade, se lo togliamo?</p>`}
    </div>`;
  });

  /* ---------- ANIMAZIONE: storyboard a fotogrammi chiave; attori che si muovono, frecce che si disegnano ---------- */
  LL.blocco('animazione', function (p) {
    var passi = p.passi || [],
      att = p.attori || [],
      fr = p.frecce || [],
      rap = p.rapporto || 1.618;
    var s = useState(0),
      k = s[0],
      setK = s[1],
      pl = useState(false),
      play = pl[0],
      setPlay = pl[1];
    var ref = R.useRef(null),
      sz = useState([0, 0]),
      W = sz[0][0],
      Hh = sz[0][1],
      setSz = sz[1];
    var last = passi.length - 1;
    useEffect(function () {
      var el = ref.current;
      if (!el) return;
      function m() {
        setSz([el.clientWidth, el.clientHeight]);
      }
      m();
      if (w.ResizeObserver) {
        var ro = new ResizeObserver(m);
        ro.observe(el);
        return function () {
          ro.disconnect();
        };
      }
      w.addEventListener('resize', m);
      return function () {
        w.removeEventListener('resize', m);
      };
    }, []);
    useEffect(function () {
      if (!play) return;
      if (k >= last) {
        setPlay(false);
        return;
      }
      var t = setTimeout(function () {
        setK(k + 1);
      }, p.ritmo || 2618);
      return function () {
        clearTimeout(t);
      };
    }, [play, k]);
    var pos = {};
    for (var j = 0; j <= k; j++) {
      var A = passi[j] && passi[j].attori || {};
      for (var id in A) pos[id] = Object.assign({}, pos[id] || {}, A[id]);
    }
    var P = passi[k] || {},
      vis = P.frecce || [];
    function q(id) {
      var o = pos[id] || {};
      return {
        x: o.x == null ? 50 : o.x,
        y: o.y == null ? 50 : o.y,
        s: o.s == null ? 1 : o.s,
        o: o.o == null ? pos[id] ? 1 : 0 : o.o,
        t: o.t,
        on: o.on
      };
    }
    function avvia() {
      if (play) {
        setPlay(false);
        return;
      }
      if (k >= last) setK(0);
      setPlay(true);
    }
    return html`<div className="lp-anim">
      ${H(p)}
      <div className="lp-stage" ref=${ref} style=${{
      aspectRatio: String(rap)
    }}>
        <svg className="lp-arrows" viewBox=${'0 0 ' + (W || 1) + ' ' + (Hh || 1)} aria-hidden="true">
          <defs><marker id=${'lpH' + (p.id || '')} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" markerUnits="userSpaceOnUse" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="var(--lab-oro)" /></marker></defs>
          ${W > 0 && fr.map(function (f, i) {
      var fid = f.id || String(i);
      if (vis.indexOf(fid) < 0) return null;
      var A1 = q(f.da),
        B1 = q(f.a),
        x1 = A1.x / 100 * W,
        y1 = A1.y / 100 * Hh,
        x2 = B1.x / 100 * W,
        y2 = B1.y / 100 * Hh,
        dx = x2 - x1,
        dy = y2 - y1,
        L = Math.sqrt(dx * dx + dy * dy) || 1,
        c = Math.min(f.margine || 44, L / 3);
      var sx = x1 + dx / L * c,
        sy = y1 + dy / L * c,
        ex = x2 - dx / L * c,
        ey = y2 - dy / L * c,
        cv = (f.curva || 0) * Hh / 100;
      var mx = (sx + ex) / 2 - dy / L * cv,
        my = (sy + ey) / 2 + dx / L * cv;
      return html`<path key=${k + '-' + fid} className=${'lp-arrow' + (f.tratteggio ? ' is-dash' : '')} d=${'M' + sx + ' ' + sy + ' Q' + mx + ' ' + my + ' ' + ex + ' ' + ey} pathLength="1" marker-end=${'url(#lpH' + (p.id || '') + ')'} />`;
    })}
        </svg>
        ${fr.map(function (f, i) {
      var fid = f.id || String(i);
      if (!f.t || vis.indexOf(fid) < 0) return null;
      var A1 = q(f.da),
        B1 = q(f.a);
      return html`<span key=${'l' + k + fid} className="lp-arrow-t" style=${{
        left: (A1.x + B1.x) / 2 + '%',
        top: (A1.y + B1.y) / 2 + '%'
      }}>${f.t}</span>`;
    })}
        ${att.map(function (a) {
      var z = q(a.id);
      return html`<div key=${a.id} className=${'lp-actor lp-f-' + (a.forma || 'pillola') + ' lp-c-' + (a.colore || 'accent') + (z.on ? ' is-on' : '')}
            style=${{
        left: z.x + '%',
        top: z.y + '%',
        opacity: z.o,
        transform: 'translate(-50%,-50%) scale(' + z.s + ')'
      }} aria-hidden="true">${z.t != null ? z.t : a.t}</div>`;
    })}
      </div>
      <p key=${k} className="lp-cap" aria-live="polite"><span className="ll-tally">${k + 1} / ${passi.length}</span> ${inline(P.didascalia || '', 'c')}</p>
      <div className="ll-row lp-ctrl">
        <button className="ll-btn ll-btn--ghost lp-sq" disabled=${k === 0} onClick=${function () {
      setPlay(false);
      setK(k - 1);
    }} aria-label="Fotogramma precedente">←</button>
        <button className="ll-btn" onClick=${avvia}>${play ? 'Pausa' : k >= last ? 'Rivedi da capo' : k === 0 ? p.pulsante || 'Avvia l’animazione' : 'Continua'}</button>
        <button className="ll-btn ll-btn--ghost lp-sq" disabled=${k >= last} onClick=${function () {
      setPlay(false);
      setK(k + 1);
    }} aria-label="Fotogramma successivo">→</button>
        <div className="lp-pips">${passi.map(function (x, i) {
      return html`<button key=${i} className=${'ll-dot' + (i < k ? ' is-seen' : '')} aria-current=${i === k ? 'step' : null} aria-label=${'Fotogramma ' + (i + 1)} onClick=${function () {
        setPlay(false);
        setK(i);
      }}></button>`;
    })}</div>
      </div>
    </div>`;
  });

  /* ---------- STRATI: livelli concentrici; si entra più a fondo con uno zoom ---------- */
  LL.blocco('strati', function (p) {
    var lv = p.livelli || [],
      n = lv.length,
      s = useState(-1),
      a = s[0],
      setA = s[1];
    useEffect(function () {
      if (a === n - 1 && n > 1) say(p.fine || 'Siamo arrivati al centro.');
    }, [a]);
    return html`<div className="lp-layers">
      ${H(p)}
      <div className="lp-lay-g">
        <div className="lp-rings-w"><div className="lp-rings" style=${{
      transform: 'scale(' + (a < 1 ? 1 : 1 + a * 0.16) + ')'
    }}>
          ${lv.map(function (l, i) {
      var size = 100 - i * (78 / Math.max(1, n - 1));
      return html`<button key=${i} className=${'lp-ring-b' + (i === a ? ' is-on' : '') + (a > -1 && i < a ? ' is-out' : '')} style=${{
        width: size + '%',
        height: size + '%'
      }} aria-pressed=${i === a} onClick=${function () {
        setA(i);
      }}><span>${l.t}</span></button>`;
    })}
        </div></div>
        <div className="lp-lay-d" aria-live="polite">${a < 0 ? html`<p className="ll-hint">${p.istruzione || 'Partite dal livello più esterno e scendete verso il centro.'}</p>` : html`<div key=${a} className="lp-lay-in"><small>Livello ${a + 1} di ${n}</small><b>${lv[a].t}</b>${md(lv[a].d, 'lp-p')}</div>`}</div>
      </div>
      <div className="ll-row">
        <button className="ll-btn" disabled=${a >= n - 1} onClick=${function () {
      setA(a + 1);
    }}>${a < 0 ? p.pulsante || 'Entra nel primo livello' : 'Più a fondo'}</button>
        <button className="ll-btn ll-btn--ghost" disabled=${a <= 0} onClick=${function () {
      setA(a - 1);
    }}>Risali</button>
      </div>
    </div>`;
  });

  /* ---------- BILANCIA: argomenti sui due piatti; il peso lo discute la classe ---------- */
  LL.blocco('bilancia', function (p) {
    var g = p.argomenti || [],
      pi = p.piatti || ['A', 'B'];
    var s = useState(function () {
        return g.map(function () {
          return 0;
        });
      }),
      v = s[0],
      setV = s[1],
      f = useState(null),
      foc = f[0],
      setFoc = f[1];
    var peso = [0, 0];
    g.forEach(function (x, i) {
      peso[x.lato || 0] += v[i];
    });
    var tilt = Math.max(-13, Math.min(13, (peso[1] - peso[0]) * 3.4));
    function tocca(i) {
      var c = v.slice(),
        x = g[i];
      c[i] = p.libero ? (c[i] + 1) % 4 : c[i] ? 0 : x.peso || 1;
      setV(c);
      setFoc(c[i] ? i : null);
    }
    var tutti = v.every(function (x) {
      return x > 0;
    });
    return html`<div className="lp-scale">
      ${H(p)}
      <div className="lp-beam-w" role="img" aria-label=${pi[0] + ': peso ' + peso[0] + '; ' + pi[1] + ': peso ' + peso[1]}>
        <div className="lp-beam" style=${{
      transform: 'rotate(' + tilt + 'deg)'
    }}>
          ${[0, 1].map(function (l) {
      return html`<div key=${l} className=${'lp-pan lp-pan--' + l} style=${{
        transform: 'rotate(' + -tilt + 'deg)'
      }}><b>${pi[l]}</b><span>${'●'.repeat(Math.min(peso[l], 12)) || '—'}</span></div>`;
    })}
        </div>
        <div className="lp-fulcrum"></div>
      </div>
      <p className="ll-hint">${p.istruzione || (p.libero ? 'Ogni tocco aggiunge peso (fino a 3), il quarto lo toglie. Il peso lo decide la classe, motivandolo.' : 'Tocca un argomento per metterlo sul suo piatto.')}</p>
      <div className="lp-args">${g.map(function (x, i) {
      return html`<button key=${i} className=${'lp-arg lp-arg--' + (x.lato || 0)} aria-pressed=${v[i] > 0} onClick=${function () {
        tocca(i);
      }}><small>${pi[x.lato || 0]}${v[i] ? ' · peso ' + v[i] : ''}</small>${inline(x.t, 'a' + i)}</button>`;
    })}</div>
      <div aria-live="polite">${foc !== null && g[foc].nota && html`<p key=${foc} className="ll-gloss">${inline(g[foc].nota, 'n')}</p>`}</div>
      ${tutti && p.domanda && html`<p className="ll-gloss">${inline(p.domanda, 'q')}</p>`}
      <div className="ll-row"><button className="ll-link" onClick=${function () {
      setV(g.map(function () {
        return 0;
      }));
      setFoc(null);
    }}>Svuota la bilancia</button></div>
    </div>`;
  });

  /* ---------- STIMA: la classe stima un valore, poi si svela quello documentato ---------- */
  LL.blocco('stima', function (p) {
    var min = +p.min,
      max = +p.max,
      st = +p.passo || 1,
      s = useState(Math.round((min + (max - min) / 2) / st) * st),
      v = s[0],
      setV = s[1],
      r = useState(false),
      rev = r[0],
      setRev = r[1];
    function pct(x) {
      return Math.max(0, Math.min(100, (x - min) / (max - min) * 100));
    }
    var vicino = Math.abs(v - p.valore) <= (p.tolleranza != null ? p.tolleranza : (max - min) * 0.1);
    function svela() {
      setRev(true);
      if (vicino) {
        cheer();
        festa();
      } else say(p.battuta || 'Lontani, ma è proprio la distanza che ci interessa.');
    }
    function step(x) {
      if (!rev) setV(Math.max(min, Math.min(max, +(v + x).toFixed(6))));
    }
    return html`<div className="lp-est">
      <span className="la-meta">${p.etichetta || 'Stima della classe'}</span>
      <h3 className="la-q">${p.q}</h3>
      <div className="lp-est-v" aria-live="polite"><b>${num(v)}</b> ${p.unita || ''}</div>
      <div className="lp-est-t">
        <input type="range" min=${min} max=${max} step=${st} value=${v} disabled=${rev} onChange=${function (e) {
      setV(+e.target.value);
    }} aria-label=${'Stima della classe' + (p.unita ? ', in ' + p.unita : '')} />
        ${rev && html`<span className="lp-est-true" style=${{
      left: pct(p.valore) + '%'
    }}><i></i><em>${num(p.valore)} ${p.unita || ''}</em></span>`}
      </div>
      <div className="lp-est-s"><span>${num(min)}</span><span>${num(max)}</span></div>
      <div className="ll-row">
        ${!rev ? [html`<button key="m" className="ll-btn ll-btn--ghost lp-sq" onClick=${function () {
      step(-st);
    }} aria-label="Diminuisci">−</button>`, html`<button key="p" className="ll-btn ll-btn--ghost lp-sq" onClick=${function () {
      step(st);
    }} aria-label="Aumenta">+</button>`, html`<button key="s" className="ll-btn" onClick=${svela}>${p.pulsante || 'Svela il dato'}</button>`] : html`<button className="ll-link" onClick=${function () {
      setRev(false);
    }}>Stima di nuovo</button>`}
      </div>
      <div aria-live="polite">${rev && html`<p className=${'ll-why ' + (vicino ? 'is-ok' : 'is-ko')}><strong>${vicino ? 'Ci siete. ' : 'Scarto di ' + num(Math.abs(v - p.valore)) + ' ' + (p.unita || '') + '. '}</strong>${inline(p.why || '', 'w')}${p.fonte ? html` <small className="lp-src">Fonte: ${p.fonte}</small>` : ''}</p>`}</div>
    </div>`;
  });

  /* ---------- LENTE: punti da esplorare su un'immagine o uno schema; modalità «trova il dettaglio» ---------- */
  LL.blocco('lente', function (p) {
    var pts = p.punti || [],
      tr = p.trova,
      s = useState(null),
      a = s[0],
      setA = s[1],
      f = useState(null),
      pick = f[0],
      setPick = f[1];
    var risolto = !tr || pick === tr.ok;
    function tocca(i) {
      if (!risolto) {
        setPick(i);
        if (i === tr.ok) {
          cheer();
          festa();
          setA(i);
        } else oops();
        return;
      }
      setA(a === i ? null : i);
    }
    return html`<div className="lp-lens">
      ${H(p)}
      ${tr && html`<p className="lp-lens-q"><span className="la-meta">Trova il dettaglio</span> ${inline(tr.q, 'q')}</p>`}
      <figure className="lp-lens-f">
        <div className="lp-lens-s" style=${{
      aspectRatio: String(p.rapporto || 1.618)
    }}>
          ${p.src ? html`<img src=${p.src} alt=${p.alt || ''} />` : html`<div className="lp-ph"><span>${p.alt || 'Immagine da incorporare'}</span></div>`}
          ${pts.map(function (x, i) {
      var cls = 'lp-pt' + (a === i ? ' is-on' : '') + (!risolto && pick === i ? ' is-wrong' : '') + (tr && risolto && i === tr.ok ? ' is-key' : '');
      return html`<button key=${i} className=${cls} style=${{
        left: x.x + '%',
        top: x.y + '%'
      }} aria-pressed=${a === i} aria-label=${risolto ? x.t : 'Punto ' + (i + 1)} onClick=${function () {
        tocca(i);
      }}>${i + 1}</button>`;
    })}
        </div>
        ${(p.didascalia || p.fonte) && html`<figcaption>${inline(p.didascalia || '', 'f')}${p.fonte ? ' — ' + p.fonte : ''}</figcaption>`}
      </figure>
      <div aria-live="polite">
        ${!risolto && pick !== null && html`<p key=${'w' + pick} className="ll-why is-ko"><strong>Non qui. </strong>${inline(pts[pick] && pts[pick].no || tr.indizio || 'Guardate di nuovo: che cosa risponde davvero alla domanda?', 'n')}</p>`}
        ${tr && risolto && pick === tr.ok && a === tr.ok && html`<p className="ll-why is-ok"><strong>Trovato. </strong>${inline(tr.why || '', 'y')}</p>`}
        ${a !== null && risolto && !(tr && a === tr.ok && pick === tr.ok) && html`<div key=${a} className="lp-lens-d"><b>${a + 1} · ${pts[a].t}</b>${md(pts[a].d, 'lp-p')}</div>`}
        ${risolto && a === null && html`<p className="ll-hint">${p.istruzione || 'Tocca un numero per leggere il dettaglio.'}</p>`}
      </div>
    </div>`;
  });

  /* ---------- LEGGI: lettura ravvicinata di una fonte; frasi che si aprono, oppure «trova la frase» ----------
     Marcatura nel testo: [[frase::glossa]] · [[!frase::glossa]] è la frase da trovare. */
  function segmenti(t) {
    var out = [],
      re = /\[\[(!?)([^\]]+?)::([^\]]*?)\]\]/g,
      last = 0,
      m;
    while (m = re.exec(t)) {
      if (m.index > last) out.push({
        t: t.slice(last, m.index)
      });
      out.push({
        t: m[2],
        g: m[3],
        ok: m[1] === '!'
      });
      last = m.index + m[0].length;
    }
    if (last < t.length) out.push({
      t: t.slice(last)
    });
    return out;
  }
  LL.blocco('leggi', function (p) {
    var paras = useMemo(function () {
      var n = 0;
      return String(p.testo || '').split(/\n\s*\n/).map(function (x) {
        return segmenti(x).map(function (sg) {
          if (sg.g != null) sg.i = n++;
          return sg;
        });
      });
    }, [p.testo]);
    var tutti = [].concat.apply([], paras).filter(function (x) {
      return x.g != null;
    });
    var s = useState(null),
      a = s[0],
      setA = s[1],
      f = useState([]),
      tent = f[0],
      setTent = f[1];
    var trova = !!p.q,
      risolto = !trova || tent.some(function (i) {
        return tutti[i] && tutti[i].ok;
      });
    function tocca(i) {
      setA(i);
      if (trova && !risolto) {
        setTent(tent.concat(i));
        if (tutti[i].ok) {
          cheer();
          festa();
        } else oops();
      }
    }
    var sel = a !== null ? tutti[a] : null;
    return html`<div className="lp-read">
      ${H(p)}
      ${trova && html`<p className="lp-lens-q"><span className="la-meta">Trova nel testo</span> ${inline(p.q, 'q')}</p>`}
      <blockquote className="lp-read-t">${paras.map(function (par, k) {
      return html`<p key=${k}>${par.map(function (sg, j) {
        if (sg.g == null) return html`<span key=${j}>${inline(sg.t, k + '-' + j)}</span>`;
        var cls = 'lp-seg' + (a === sg.i ? ' is-on' : '') + (trova && tent.indexOf(sg.i) > -1 ? sg.ok ? ' is-right' : ' is-wrong' : '') + (trova && !risolto ? ' is-hunt' : '');
        return html`<button key=${j} className=${cls} aria-pressed=${a === sg.i} onClick=${function () {
          tocca(sg.i);
        }}>${inline(sg.t, 's' + j)}</button>`;
      })}</p>`;
    })}</blockquote>
      ${p.fonte && html`<p className="lp-read-f">${p.fonte}</p>`}
      <div aria-live="polite">${sel ? html`<p key=${a} className=${trova && tent.indexOf(a) > -1 && tent[tent.length - 1] === a ? 'll-why ' + (sel.ok ? 'is-ok' : 'is-ko') : 'll-gloss'}>${trova && tent[tent.length - 1] === a ? html`<strong>${sel.ok ? 'Proprio questa. ' : 'Non è questa. '}</strong>` : ''}${inline(sel.g, 'g')}</p>` : html`<p className="ll-hint" style=${{
      marginTop: 13
    }}>${p.istruzione || (trova ? 'Le parti sottolineate sono candidate: una sola risponde alla domanda.' : 'Tocca le parti sottolineate per aprirne il senso.')}</p>`}</div>
    </div>`;
  });

  /* ---------- ORDINA: rimettere in ordine passaggi di un ragionamento, fasi o eventi ---------- */
  LL.blocco('ordina', function (p) {
    var voci = p.voci || [],
      s = useState(function () {
        return mescola(voci.length, (p.q || '').length);
      }),
      ord = s[0],
      setOrd = s[1],
      c = useState(false),
      chk = c[0],
      setChk = c[1];
    function sposta(i, dlt) {
      var j = i + dlt;
      if (j < 0 || j >= ord.length) return;
      var o = ord.slice(),
        t = o[i];
      o[i] = o[j];
      o[j] = t;
      setOrd(o);
      setChk(false);
    }
    var giusti = ord.filter(function (v, i) {
        return v === i;
      }).length,
      tutto = giusti === voci.length;
    function controlla() {
      setChk(true);
      if (giusti === voci.length) {
        cheer();
        festa();
      } else oops();
    }
    return html`<div className="lp-order">
      ${p.q && html`<h3 className="ll-block-h">${inline(p.q, 'q')}</h3>`}
      <ol className="lp-ord-l">${ord.map(function (v, i) {
      var x = voci[v],
        cls = 'lp-ord-i' + (chk ? v === i ? ' is-right' : ' is-wrong' : '');
      return html`<li key=${v} className=${cls}>
          <span className="lp-ord-n">${i + 1}</span><span className="lp-ord-t">${inline(typeof x === 'string' ? x : x.t, 'o' + v)}${typeof x !== 'string' && x.y && html`<small>${x.y}</small>`}</span>
          <span className="lp-ord-b"><button className="ll-icon" disabled=${i === 0} onClick=${function () {
        sposta(i, -1);
      }} aria-label=${'Sposta su: ' + plain(typeof x === 'string' ? x : x.t)}>↑</button><button className="ll-icon" disabled=${i === ord.length - 1} onClick=${function () {
        sposta(i, 1);
      }} aria-label=${'Sposta giù: ' + plain(typeof x === 'string' ? x : x.t)}>↓</button></span>
        </li>`;
    })}</ol>
      <div className="ll-row">
        <button className="ll-btn" onClick=${controlla}>Controlla l’ordine</button>
        ${chk && !tutto && html`<button className="ll-btn ll-btn--ghost" onClick=${function () {
      setOrd(voci.map(function (_, i) {
        return i;
      }));
      setChk(true);
    }}>Mostra l’ordine giusto</button>`}
        ${chk && html`<span className="ll-tally" aria-live="polite">${giusti} / ${voci.length} al posto giusto</span>`}
      </div>
      ${chk && tutto && p.why && html`<p className="ll-why is-ok">${inline(p.why, 'w')}</p>`}
    </div>`;
  });

  /* ---------- BIVIO: un caso, più scelte, conseguenze; poi il criterio della fonte ---------- */
  LL.blocco('bivio', function (p) {
    var sc = p.scelte || [],
      s = useState(null),
      a = s[0],
      setA = s[1],
      v = useState([]),
      visti = v[0],
      setVisti = v[1],
      c = useState(false),
      fine = c[0],
      setFine = c[1];
    function scegli(i) {
      setA(i);
      if (visti.indexOf(i) < 0) setVisti(visti.concat(i));
    }
    return html`<div className="lp-fork">
      <span className="la-meta">${p.etichetta || 'Un caso, più strade'}</span>
      <div className="lp-fork-c">${md(p.caso, 'lp-fork-p')}</div>
      <div className="lp-fork-s">${sc.map(function (x, i) {
      return html`<button key=${i} className=${'la-choice' + (a === i ? ' is-pick' : '') + (visti.indexOf(i) > -1 && a !== i ? ' is-seen' : '')} aria-pressed=${a === i} onClick=${function () {
        scegli(i);
      }}><span className="la-key">${'ABCDE'[i]}</span>${inline(x.t, 'c' + i)}</button>`;
    })}</div>
      <div aria-live="polite">${a !== null && html`<div key=${a} className=${'lp-fork-e lp-tono-' + (sc[a].tono || 'neutro')}><small>Se scegliete ${'ABCDE'[a]}</small>${md(sc[a].esito, 'lp-p')}</div>`}</div>
      <div className="ll-row">
        ${visti.length > 0 && visti.length < sc.length && html`<span className="ll-hint" style=${{
      margin: 0
    }}>Provate anche un’altra strada: ${sc.length - visti.length} da esplorare.</span>`}
        ${p.chiusura && visti.length > 0 && !fine && html`<button className="ll-btn ll-btn--solenne" onClick=${function () {
      setFine(true);
      say(p.battuta || 'Ora confrontiamo con il criterio.');
    }}>${p.pulsante || 'Che cosa ne dice la fonte?'}</button>`}
      </div>
      ${fine && html`<div className="ll-gloss">${md(p.chiusura, 'lp-p')}</div>`}
    </div>`;
  });

  /* ---------- VARIANTI: il docente sceglie, in aula, fra attività alternative di pari durata ---------- */
  LL.blocco('varianti', function (p, ctx) {
    var op = p.opzioni || [],
      s = useState(p.scelta == null ? null : p.scelta),
      a = s[0],
      setA = s[1];
    if (a === null || !op[a]) return html`<div className="lp-var">
      ${H(p)}
      <p className="ll-hint">${p.istruzione || 'Una sola attività, a scelta: tutte portano alla stessa domanda.'}</p>
      <div className="lp-var-g">${op.map(function (o, i) {
      return html`<button key=${i} className="lp-var-c" onClick=${function () {
        setA(i);
      }}>
        <span className="lp-var-h"><b>${o.nome}</b>${o.durata && html`<span className="lp-pill">${o.durata}</span>`}</span>
        ${(o.descrizione || o.obiettivo) && html`<span className="lp-var-o">${inline(o.descrizione || o.obiettivo, 'o' + i)}</span>`}
      </button>`;
    })}</div>
    </div>`;
    var o = op[a];
    return html`<div className="lp-var is-picked">
      <div className="lp-var-bar"><span><small className="la-meta">Attività scelta</small><b>${o.nome}</b>${o.durata && html`<span className="lp-pill">${o.durata}</span>`}</span><button className="ll-link" onClick=${function () {
      setA(null);
    }}>Cambia attività</button></div>
      <div className="ll-blocks">${(o.blocchi || []).map(function (b, i) {
      return html`<${Sub} key=${a + '-' + i} b=${b} ctx=${ctx} />`;
    })}</div>
    </div>`;
  });

  /* ---------- CONSEGNA: lavoro di gruppo o a coppie con tempo, passi e prodotto atteso ---------- */
  LL.blocco('consegna', function (p) {
    var tot = Math.round((+p.minuti || 5) * 60),
      s = useState(tot),
      rem = s[0],
      setRem = s[1],
      r = useState(false),
      run = r[0],
      setRun = r[1];
    useEffect(function () {
      if (!run) return;
      if (rem <= 0) {
        setRun(false);
        LL.bip && LL.bip();
        say(p.fine || 'Tempo! Un portavoce per gruppo.');
        return;
      }
      var t = setTimeout(function () {
        setRem(rem - 1);
      }, 1000);
      return function () {
        clearTimeout(t);
      };
    }, [run, rem]);
    var mm = Math.floor(Math.max(0, rem) / 60),
      ss = Math.max(0, rem) % 60,
      frac = Math.max(0, rem) / Math.max(1, tot);
    var fase = p.passi && p.passi.length ? Math.min(p.passi.length - 1, Math.floor((1 - frac) * p.passi.length)) : -1;
    return html`<div className="lp-task">
      <div className="lp-task-h">
        <div>${H(p)}${p.modalita && html`<span className="lp-pill">${p.modalita}</span>`}</div>
        <div className=${'lp-clock' + (rem <= 30 && rem > 0 ? ' is-late' : '') + (rem <= 0 ? ' is-over' : '')} role="timer" aria-live="off">
          <svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="44" className="lp-clock-bg" /><circle cx="50" cy="50" r="44" className="lp-clock-fg" pathLength="1" style=${{
      strokeDashoffset: String(1 - frac)
    }} /></svg>
          <b>${mm}:${String(ss).padStart(2, '0')}</b>
        </div>
      </div>
      ${p.passi && html`<ol className="lp-task-p">${p.passi.map(function (x, i) {
      return html`<li key=${i} className=${run || rem < tot ? i < fase ? 'is-done' : i === fase ? 'is-now' : '' : ''}>${inline(x, 'p' + i)}</li>`;
    })}</ol>`}
      ${p.ruoli && html`<div className="lp-roles">${p.ruoli.map(function (x, i) {
      return html`<span key=${i} className="lp-pill">${x}</span>`;
    })}</div>`}
      ${p.prodotto && html`<p className="ll-gloss"><strong>Alla fine: </strong>${inline(p.prodotto, 'pr')}</p>`}
      <div className="ll-row">
        <button className="ll-btn" onClick=${function () {
      if (rem <= 0) setRem(tot);
      setRun(!run);
    }}>${run ? 'Pausa' : rem < tot && rem > 0 ? 'Riprendi' : 'Avvia il tempo'}</button>
        <button className="ll-btn ll-btn--ghost" onClick=${function () {
      setRem(rem + 60);
    }}>+1 minuto</button>
        <button className="ll-link" onClick=${function () {
      setRun(false);
      setRem(tot);
    }}>Azzera</button>
      </div>
    </div>`;
  });

  /* ---------- AGGANCIO: rimando breve, chiuso di default (all'oggi, a un prerequisito, a un approfondimento) ---------- */
  LL.blocco('aggancio', function (p) {
    var s = useState(false),
      on = s[0],
      set = s[1];
    return html`<div className=${'lp-hook' + (on ? ' is-open' : '')}>
      <button className="lp-hook-b" aria-expanded=${on} onClick=${function () {
      set(!on);
    }}>
        <span className="lp-hook-k">${p.etichetta || 'Oggi'}</span><span className="lp-hook-t">${inline(p.titolo || '', 't')}</span><i aria-hidden="true">${on ? '−' : '+'}</i>
      </button>
      ${on && html`<div className="lp-hook-c">${md(p.t, 'lp-p')}${p.fonte && html`<small className="lp-src">${p.fonte}</small>`}</div>`}
    </div>`;
  });
  LL.plus = '2026-10-02';
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "assets/artefatti/lezione/lab-lezione-plus.js", error: String((e && e.message) || e) }); }

// assets/artefatti/lezione/lab-lezione.js
try { (() => {
/* Lab IRC — Lezione interattiva in React 18 + htm (nessuna compilazione).
   Espone: window.html (template JSX-like), window.LabLezione = { registra, avvia, md, festa, blocchi }.
   Il file della lezione definisce window.LEZIONE e può registrare componenti propri. */
(function () {
  var R = window.React,
    w = window,
    d = document;
  var html = w.html = w.htm.bind(R.createElement);
  var useState = R.useState,
    useEffect = R.useEffect,
    useRef = R.useRef,
    useMemo = R.useMemo;
  var say = function (t) {
    // parla la mascotte visibile: quella della scena, se c'è, altrimenti quella in basso a destra
    var m = d.querySelector('.ll-head-m lab-mascotte, .ll-masc lab-mascotte');
    if (m && m.bubble) m.bubble(t);else if (w.LabArtefatto) w.LabArtefatto.say(t);
  };
  var cheer = function () {
    w.LabArtefatto && w.LabArtefatto.cheer();
  };
  var oops = function () {
    w.LabArtefatto && w.LabArtefatto.oops();
  };
  var reduce = w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var custom = {};
  var anno = function () {
    return +(d.body.getAttribute('data-anno') || 0);
  };
  var nomeMascotte = function () {
    var I = w.LabMascotte && w.LabMascotte.INFO;
    return I && I[anno()] ? I[anno()].nome : 'La mascotte';
  };
  function Mascotte(p) {
    // web component <lab-mascotte> del design system (2D, 144×144, aureola d'oro)
    return anno() ? html`<lab-mascotte anno=${String(anno())} size=${String(p.size || 89)} aureola=${p.aureola === false ? 'false' : null} fumetto=${p.fumetto || null} class=${p.className || null}></lab-mascotte>` : null;
  }
  var LOGO = '<svg viewBox="0 0 96 96" aria-hidden="true"><defs><linearGradient id="llLogo" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8B5CF6"/><stop offset="1" stop-color="#22D3EE"/></linearGradient></defs><rect x="4" y="4" width="88" height="88" rx="24" fill="url(#llLogo)"/><text x="50%" y="52%" dominant-baseline="central" text-anchor="middle" font-family="Cormorant Garamond, Georgia, serif" font-weight="600" font-size="56" fill="#fff">L</text><path d="M70 22 l2.4 5.6 5.6 2.4 -5.6 2.4 -2.4 5.6 -2.4 -5.6 -5.6 -2.4 5.6 -2.4 Z" fill="#FBBF24"/></svg>';

  /* ---------- glossario: {parola} o {forma|lemma} nel testo → etimologia + spiegazione; si riempie da solo ---------- */
  var GLOS = {},
    dfnSub = null;
  function chiave(k) {
    return String(k || '').trim().toLowerCase();
  }
  function glossa(k, o) {
    k = chiave(k);
    if (!k || !o) return;
    var g = GLOS[k] || (GLOS[k] = {
      w: o.w || String(k)
    });
    if (o.w) g.w = o.w;
    if (o.etim && !g.etim) g.etim = o.etim;
    if (o.def && !g.def) g.def = o.def;
  }
  function raccogli(L) {
    // glossario esplicito + blocchi «parola», «etimo», «spettro» (anche dentro le varianti)
    var G = L.glossario || {};
    Object.keys(G).forEach(function (k) {
      var v = G[k];
      glossa(k, typeof v === 'string' ? {
        def: v
      } : {
        w: v.parola,
        etim: v.etim || v.origine,
        def: v.def || v.significato
      });
    });
    (function scan(bs) {
      (bs || []).forEach(function (b) {
        if (!b) return;
        if (b.tipo === 'parola') glossa(b.parola, {
          w: b.parola,
          etim: b.origine,
          def: b.significato
        });
        if (b.tipo === 'etimo') glossa(b.parola, {
          w: b.parola,
          etim: b.etim,
          def: b.def || b.spiegazione
        });
        if (b.tipo === 'spettro') (b.punti || []).forEach(function (x) {
          if (x.etim || x.def) glossa(x.t, {
            w: x.t,
            etim: x.etim,
            def: x.def
          });
        });
        if (b.blocchi) scan(b.blocchi);
        (b.opzioni || []).forEach(function (o) {
          if (o && o.blocchi) scan(o.blocchi);
        });
      });
    })([].concat.apply([], (L.scene || []).map(function (s) {
      return s.blocchi || [];
    })));
  }
  function Dfn(p) {
    return html`<button type="button" className=${'ll-dfn' + (GLOS[chiave(p.k)] ? '' : ' is-orfana')} onClick=${function (e) {
      e.stopPropagation();
      if (dfnSub) dfnSub(chiave(p.k), e.currentTarget);
    }}>${p.w}</button>`;
  }
  function toTop(smooth) {
    d.querySelectorAll('.ll-scroll').forEach(function (s) {
      s.scrollTo({
        top: 0,
        behavior: smooth && !reduce ? 'smooth' : 'auto'
      });
    });
  }
  function Piede() {
    return html`<footer className="ll-foot"><span>© Matteo Sestili — Tutti i diritti riservati</span><button className="ll-amdg" onClick=${function () {
      w.LabArtefatto && w.LabArtefatto.amdg();
    }} aria-label="A M D G">AMDG</button></footer>`;
  }

  /* ---------- testo: **grassetto**, *corsivo*, {parola nuova}, paragrafi separati da riga vuota ---------- */
  function inline(s, key) {
    var out = [],
      re = /(\*\*[^*]+\*\*|\*[^*]+\*|\{[^{}\n]+\})/g,
      last = 0,
      m,
      i = 0;
    s = String(s == null ? '' : s);
    while (m = re.exec(s)) {
      if (m.index > last) out.push(s.slice(last, m.index));
      var t = m[0],
        pz;
      if (t[0] === '{') {
        pz = t.slice(1, -1).split('|');
        out.push(html`<${Dfn} key=${key + '-' + i++} w=${pz[0]} k=${pz[1] || pz[0]} />`);
      } else out.push(t.slice(0, 2) === '**' ? html`<strong key=${key + '-' + i++}>${inline(t.slice(2, -2), key + 's' + i)}</strong>` : html`<em key=${key + '-' + i++}>${inline(t.slice(1, -1), key + 'e' + i)}</em>`);
      last = m.index + t.length;
    }
    if (last < s.length) out.push(s.slice(last));
    return out;
  }
  function md(s, cls) {
    return String(s || '').split(/\n\s*\n/).filter(Boolean).map(function (p, i) {
      return html`<p key=${i} className=${cls || 'll-p'}>${inline(p.trim(), i)}</p>`;
    });
  }
  function plain(s) {
    return String(s || '').replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\*([^*]+)\*/g, '$1').replace(/\{([^{}|\n]+)(\|[^{}\n]*)?\}/g, '$1');
  }
  function titleNode(t) {
    // «Il *cosmo* esaurisce» → <em> sulla parola evidenziata
    return inline(t, 't').map(function (n) {
      return n && n.type === 'strong' ? html`<em key=${n.key}>${n.props.children}</em>` : n;
    });
  }

  /* ---------- festa discreta ---------- */
  function festa() {
    if (reduce) return;
    var box = d.createElement('div');
    box.className = 'll-party';
    box.setAttribute('aria-hidden', 'true');
    var cols = ['var(--lab-oro)', 'var(--la-accent)', 'var(--lab-ciano)', 'var(--lab-rosa)'];
    for (var i = 0; i < 34; i++) {
      var p = d.createElement('i');
      p.style.left = Math.random() * 100 + 'vw';
      p.style.background = cols[i % cols.length];
      p.style.setProperty('--dx', ((Math.random() - .5) * 233).toFixed(0) + 'px');
      p.style.setProperty('--r', ((Math.random() - .5) * 987).toFixed(0) + 'deg');
      p.style.animationDelay = (Math.random() * 377).toFixed(0) + 'ms';
      box.appendChild(p);
    }
    d.body.appendChild(box);
    setTimeout(function () {
      box.remove();
    }, 2400);
  }

  /* =================== BLOCCHI =================== */
  var B = {};
  B.testo = function (p) {
    return html`<div>${md(p.t)}</div>`;
  };
  B.rivela = function (p) {
    var n = useState(p.iniziali || 1),
      k = n[0],
      setK = n[1],
      passi = p.passi || [];
    return html`<div>
      ${p.titolo && html`<h3 className="ll-block-h">${p.titolo}</h3>`}
      <ol className="ll-steps" aria-live="polite">
        ${passi.slice(0, k).map(function (s, i) {
      return html`<li key=${i} className="ll-step"><div><b>${s.titolo}</b>${s.testo && html`<p>${inline(s.testo, i)}</p>`}</div></li>`;
    })}
      </ol>
      <div className="ll-row">
        ${k < passi.length ? html`<button className="ll-btn" onClick=${function () {
      setK(k + 1);
      if (k + 1 === passi.length) say(p.fine || 'Ecco il quadro completo.');
    }}>${p.pulsante || 'Mostra il passo successivo'}</button>` : html`<button className="ll-btn ll-btn--ghost" onClick=${function () {
      setK(p.iniziali || 1);
    }}>Riparti dal primo passo</button>`}
        <span className="ll-tally">${k} / ${passi.length}</span>
      </div>
    </div>`;
  };
  B.tappe = function (p) {
    var voci = p.voci || [],
      s = useState(p.aperta == null ? 0 : p.aperta),
      a = s[0],
      setA = s[1],
      v = voci[a];
    function key(e) {
      if (e.key === 'ArrowRight') {
        e.stopPropagation();
        setA(Math.min(voci.length - 1, a + 1));
      }
      if (e.key === 'ArrowLeft') {
        e.stopPropagation();
        setA(Math.max(0, a - 1));
      }
    }
    return html`<div>
      ${p.titolo && html`<h3 className="ll-block-h">${p.titolo}</h3>`}
      <div className="ll-tl" role="group" aria-label=${p.titolo || 'Linea del tempo'} onKeyDown=${key}>
        ${voci.map(function (x, i) {
      return html`<button key=${i} className="ll-tl-b" aria-pressed=${i === a} onClick=${function () {
        setA(i);
      }}><i></i><span>${x.data}</span>${x.breve || ''}</button>`;
    })}
      </div>
      ${v && html`<div key=${a} className="ll-tl-card" aria-live="polite"><small>${v.data}</small><b>${v.titolo}</b>${v.testo && html`<p>${inline(v.testo, a)}</p>`}</div>`}
    </div>`;
  };
  B.confronto = function (p) {
    var righe = p.righe || [],
      s = useState(p.tutto ? righe.length : 0),
      k = s[0],
      setK = s[1];
    return html`<div>
      ${p.titolo && html`<h3 className="ll-block-h">${p.titolo}</h3>`}
      <div className="ll-cmp" aria-live="polite">
        <div className="ll-cmp-h"></div><div className="ll-cmp-h">${p.a}</div><div className="ll-cmp-h">${p.b}</div>
        ${righe.map(function (r, i) {
      var on = i < k,
        cls = on ? i === k - 1 ? 'is-new' : '' : 'is-hidden';
      return html`<${R.Fragment} key=${i}>
            <div className="ll-cmp-k">${r.criterio || ''}</div>
            <div className=${cls} aria-hidden=${!on}>${on ? inline(r.a, 'a' + i) : '·'}</div>
            <div className=${cls} aria-hidden=${!on}>${on ? inline(r.b, 'b' + i) : '·'}</div>
          </${R.Fragment}>`;
    })}
      </div>
      <div className="ll-row">
        ${k < righe.length ? html`<button className="ll-btn" onClick=${function () {
      setK(k + 1);
    }}>${k ? 'Confronta ancora' : p.pulsante || 'Inizia il confronto'}</button>` : html`<button className="ll-btn ll-btn--ghost" onClick=${function () {
      setK(0);
    }}>Copri di nuovo</button>`}
        ${p.domanda && k === righe.length && html`<p className="ll-hint" style=${{
      margin: 0
    }}>${inline(p.domanda, 'q')}</p>`}
      </div>
    </div>`;
  };
  function Flip(props) {
    var s = useState(false),
      on = s[0],
      set = s[1],
      c = props.c;
    return html`<button className="ll-flip" aria-pressed=${on} onClick=${function () {
      set(!on);
    }}>
      <span className="ll-flip-in">
        <span className="ll-face"><small>${c.etichetta || 'Tocca per girare'}</small><b>${c.fronte}</b></span>
        <span className="ll-face ll-face--back" aria-hidden=${!on}><p>${inline(c.retro, 'r')}</p></span>
      </span>
    </button>`;
  }
  B.carte = function (p) {
    return html`<div>${p.titolo && html`<h3 className="ll-block-h">${p.titolo}</h3>`}
      <div className="ll-cards">${(p.carte || []).map(function (c, i) {
      return html`<${Flip} key=${i} c=${c} />`;
    })}</div></div>`;
  };
  B.citazione = function (p) {
    var s = useState(false),
      on = s[0],
      set = s[1];
    return html`<figure className="ll-quote">
      <blockquote>${inline(p.testo, 'c')}</blockquote>
      <figcaption>${p.fonte}</figcaption>
      ${p.commento && (on ? html`<p className="ll-gloss">${inline(p.commento, 'g')}</p>` : html`<div className="ll-row"><button className="ll-link" onClick=${function () {
      set(true);
    }}>${p.pulsante || 'Che cosa ci sta dicendo?'}</button></div>`)}
    </figure>`;
  };
  B.domanda = function (p) {
    var n = (p.opzioni || []).length,
      s = useState(function () {
        return Array(n).fill(0);
      }),
      v = s[0],
      setV = s[1];
    var sh = useState(false),
      show = sh[0],
      setShow = sh[1],
      tot = v.reduce(function (a, b) {
        return a + b;
      }, 0);
    function add(i, x) {
      var c = v.slice();
      c[i] = Math.max(0, c[i] + x);
      setV(c);
    }
    return html`<div>
      <h3 className="ll-block-h">${p.q}</h3>
      <p className="ll-hint">${p.istruzione || 'Alzata di mano: il docente tocca una risposta per ogni voto. Nessun nome, nessun punteggio.'}</p>
      <div className="ll-poll">${p.opzioni.map(function (o, i) {
      var pct = tot ? Math.round(v[i] / tot * 100) : 0;
      return html`<div key=${i} className="ll-poll-r">
          <button className="ll-poll-b" onClick=${function () {
        add(i, 1);
      }} aria-label=${o + ': aggiungi un voto'}><i style=${{
        width: (show ? pct : 0) + '%'
      }}></i><span>${o}</span><b>${show ? pct + '%' : ''}</b></button>
          <button className="ll-poll-m" onClick=${function () {
        add(i, -1);
      }} aria-label=${'Togli un voto a ' + o}>−</button></div>`;
    })}</div>
      <div className="ll-row">
        <button className="ll-btn" onClick=${function () {
      setShow(!show);
      if (!show && tot) festa();
    }}>${show ? 'Nascondi i risultati' : 'Mostra i risultati'}</button>
        <button className="ll-btn ll-btn--ghost" onClick=${function () {
      setV(Array(n).fill(0));
      setShow(false);
    }}>Azzera</button>
        <span className="ll-tally" aria-live="polite">${tot} ${tot === 1 ? 'voto' : 'voti'}</span>
      </div>
      ${show && p.dibattito && html`<p className="ll-gloss">${inline(p.dibattito, 'd')}</p>`}
    </div>`;
  };
  B.verifica = function (p) {
    var s = useState(null),
      pick = s[0],
      setPick = s[1],
      ok = pick === p.ok;
    function choose(i) {
      if (pick !== null) return;
      setPick(i);
      if (i === p.ok) {
        cheer();
        festa();
      } else oops();
    }
    return html`<div className="ll-check">
      <span className="la-meta">${p.etichetta || 'Verifica lampo'}</span>
      <h3 className="la-q">${p.q}</h3>
      <div className="la-choices">${p.opzioni.map(function (o, i) {
      var cls = 'la-choice' + (pick === null ? '' : i === p.ok ? ' is-right' : i === pick ? ' is-wrong' : ' is-dim');
      return html`<button key=${i} className=${cls} disabled=${pick !== null} onClick=${function () {
        choose(i);
      }}><span className="la-key">${'ABCDE'[i]}</span>${o}</button>`;
    })}</div>
      <div aria-live="polite">${pick !== null && html`<p className=${'ll-why ' + (ok ? 'is-ok' : 'is-ko')}><strong>${ok ? 'Esatto. ' : 'Non proprio. '}</strong>${inline(p.why, 'w')}</p>`}</div>
      ${pick !== null && html`<div className="ll-row"><button className="ll-link" onClick=${function () {
      setPick(null);
    }}>Riprova la domanda</button></div>`}
    </div>`;
  };
  B.smista = function (p) {
    var voci = p.voci || [],
      s = useState(0),
      i = s[0],
      setI = s[1],
      a = useState(null),
      ans = a[0],
      setAns = a[1],
      g = useState(0),
      good = g[0],
      setGood = g[1];
    var v = voci[i];
    function choose(c) {
      if (ans !== null) return;
      setAns(c);
      if (c === v.c) {
        setGood(good + 1);
        cheer();
      } else oops();
    }
    function next() {
      setAns(null);
      setI(i + 1);
      if (i + 1 === voci.length) festa();
    }
    if (!v) return html`<div className="ll-sort"><span className="ll-tally">${p.titolo || 'Smista'}</span>
      <p className="ll-sort-item">${good} su ${voci.length} al primo colpo.</p>${md(p.chiusura || 'Rileggete insieme gli elementi incerti: che cosa li rendeva difficili da collocare?')}
      <button className="ll-btn ll-btn--ghost" onClick=${function () {
      setI(0);
      setGood(0);
      setAns(null);
    }}>Ricomincia</button></div>`;
    return html`<div className="ll-sort">
      <div className="la-row"><span className="ll-tally">${p.titolo || 'Dove lo metti?'}</span><span className="ll-tally">${i + 1} / ${voci.length}</span></div>
      <p key=${i} className="ll-sort-item is-in">${v.t}</p>
      <div className="ll-bins">${p.categorie.map(function (c, k) {
      var cls = 'll-bin' + (ans === null ? '' : k === v.c ? ' is-right' : k === ans ? ' is-wrong' : '');
      return html`<button key=${k} className=${cls} disabled=${ans !== null && k !== v.c && k !== ans} onClick=${function () {
        choose(k);
      }}>${c}</button>`;
    })}</div>
      <div aria-live="polite">${ans !== null && html`<p className=${'ll-why ' + (ans === v.c ? 'is-ok' : 'is-ko')}>${inline(v.why || '', 'w')}</p>`}</div>
      ${ans !== null && html`<div className="ll-row"><button className="ll-btn" onClick=${next}>${i + 1 < voci.length ? 'Prossimo' : 'Vedi il risultato'}</button></div>`}
    </div>`;
  };
  B.mappa = function (p) {
    var nodi = p.nodi || [],
      s = useState(null),
      a = s[0],
      setA = s[1];
    var pos = nodi.map(function (_, i) {
      var t = -Math.PI / 2 + i * 2 * Math.PI / nodi.length;
      return [50 + 37 * Math.cos(t), 50 + 38 * Math.sin(t)];
    });
    return html`<div>
      ${p.titolo && html`<h3 className="ll-block-h">${p.titolo}</h3>`}
      <div className="ll-map">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${pos.map(function (q, i) {
      return html`<line key=${i} x1="50" y1="50" x2=${q[0]} y2=${q[1]} className=${a === i ? 'is-on' : ''} vectorEffect="non-scaling-stroke" />`;
    })}</svg>
        <div className="ll-map-c" style=${{
      left: '50%',
      top: '50%'
    }}>${p.centro}</div>
        ${nodi.map(function (n, i) {
      return html`<button key=${i} className="ll-map-n" style=${{
        left: pos[i][0] + '%',
        top: pos[i][1] + '%'
      }} aria-pressed=${a === i} onClick=${function () {
        setA(a === i ? null : i);
      }}>${n.t}</button>`;
    })}
      </div>
      <div aria-live="polite">${a !== null ? html`<p key=${a} className="ll-map-d"><b>${nodi[a].t}. </b>${inline(nodi[a].d, 'm')}</p>` : html`<p className="ll-hint" style=${{
      marginTop: 13
    }}>${p.istruzione || 'Tocca un concetto per vedere come si lega al centro.'}</p>`}</div>
    </div>`;
  };
  B.parola = function (p) {
    var s = useState(false),
      on = s[0],
      set = s[1],
      radice = (p.radice || '').toLowerCase();
    var letters = p.parola.split(''),
      start = radice ? p.parola.toLowerCase().indexOf(radice) : -1;
    return html`<div className=${'ll-word' + (on ? ' is-open' : '')}>
      <button className="ll-word-w" aria-expanded=${on} onClick=${function () {
      set(!on);
      if (!on) say(p.battuta || 'Le parole custodiscono una storia.');
    }}>
        ${letters.map(function (ch, i) {
      return html`<span key=${i} className=${start > -1 && i >= start && i < start + radice.length ? 'is-root' : ''} style=${{
        transitionDelay: i * 34 + 'ms'
      }}>${ch}</span>`;
    })}
      </button>
      <div className="ll-word-info" aria-live="polite">
        <small>${on ? p.origine || 'Origine' : 'Tocca la parola'}</small>
        ${on && md(p.significato)}
      </div>
    </div>`;
  };
  B.immagine = function (p) {
    return html`<figure className="ll-fig">${p.src ? html`<img src=${p.src} alt=${p.alt || ''} loading="lazy" />` : html`<div className="ll-fig-ph" style=${{
      aspectRatio: String(p.rapporto || 1.618)
    }}><span>${p.alt || 'Immagine da inserire'}</span></div>`}<figcaption>${inline(p.didascalia || '', 'f')}${p.fonte ? ' — ' + p.fonte : ''}</figcaption></figure>`;
  };
  B.nota = function (p) {
    // callout ambra del design system (Nota)
    return html`<div className="ll-nota" role="note">${p.icona !== '' && html`<span className="ll-nota-i" aria-hidden="true">${p.icona || '💡'}</span>`}<div>${md(p.t, 'll-nota-p')}</div></div>`;
  };
  B.mascotte = function (p) {
    // la mascotte dell'anno interviene con una battuta o una domanda
    var s = useState(!p.nascosta),
      on = s[0],
      set = s[1];
    return html`<div className=${'ll-masc' + (on ? ' is-on' : '')}>
      <${Mascotte} size=${89} />
      <div className="ll-masc-b">
        <small>${nomeMascotte()} ${p.etichetta || 'dice'}</small>
        ${on ? html`<p>${inline(p.t, 'm')}</p>` : html`<button className="ll-link" onClick=${function () {
      set(true);
    }}>${p.pulsante || 'Ascolta'}</button>`}
      </div>
    </div>`;
  };
  B.gioco = function (p, ctx) {
    return html`<div className="ll-play"><div><b>${p.titolo || 'Pausa gioco'}</b><p>${p.testo || ''}</p></div>
      <button className="ll-btn" onClick=${function () {
      ctx.gioca(p.id);
    }}>${p.pulsante || 'Si gioca'}</button></div>`;
  };
  B.custom = function (p, ctx) {
    var C = custom[p.nome];
    return C ? html`<${C} ...${p.props || {}} ctx=${ctx} />` : html`<p className="ll-hint">Componente «${p.nome}» non registrato.</p>`;
  };
  function Block(props) {
    var b = props.b,
      F = B[b.tipo];
    if (!F) return html`<p className="ll-hint">Blocco sconosciuto: ${b.tipo}</p>`;
    return html`<section className="ll-block" data-tipo=${b.tipo}>${F(b, props.ctx)}</section>`;
  }
  // I blocchi usano hook: ogni blocco è montato come componente con chiave stabile.
  var BlockC = function (props) {
    return Block(props);
  };

  /* =================== SCENA e MODI =================== */
  function Scena(props) {
    var s = props.s,
      ctx = props.ctx;
    return html`<article className=${'ll-scene ' + (props.dir < 0 ? 'is-prev' : 'is-next')} aria-labelledby="ll-h">
      <div className=${'ll-head' + (s.mascotte ? ' has-masc' : '')}>
        <div>
          ${s.momento && html`<p className="ll-moment">${s.momento}</p>`}
          <h2 className="ll-h" id="ll-h" tabIndex="-1">${titleNode(s.titolo)}</h2>
          ${s.lead && html`<p className="ll-lead">${inline(s.lead, 'l')}</p>`}
        </div>
        ${s.mascotte && html`<div className="ll-head-m"><${Mascotte} size=${144} fumetto="sinistra" /></div>`}
      </div>
      ${md(s.testo)}
      <div className="ll-blocks">${(s.blocchi || []).map(function (b, i) {
      return html`<${BlockC} key=${props.i + '-' + i} b=${b} ctx=${ctx} />`;
    })}</div>
    </article>`;
  }
  function Lezione(props) {
    var L = props.L,
      PR = L.percorsi || [],
      pr = useState(PR.length ? PR[0].id : null),
      perc = pr[0],
      setPerc = pr[1];
    var scene = (L.scene || []).filter(function (s) {
        return !perc || !s.percorsi || s.percorsi.indexOf(perc) > -1;
      }).map(function (s, k, a) {
        return s.mascotte == null && (k === 0 || k === a.length - 1) ? Object.assign({}, s, {
          mascotte: true
        }) : s;
      }),
      st = useState(0),
      i = st[0],
      setI = st[1],
      dr = useState(1),
      dir = dr[0],
      setDir = dr[1];
    var seen = useRef({
      0: true
    });
    var fasi = useMemo(function () {
      var out = [];
      scene.forEach(function (s, k) {
        var n = s.fase || s.momento || 'Lezione',
          f = out[out.length - 1];
        if (!f || f.n !== n) {
          f = {
            n: n,
            idx: [],
            min: 0
          };
          out.push(f);
        }
        f.idx.push(k);
        f.min += +s.minuti || 0;
      });
      return out;
    }, [perc]);
    var tot = fasi.reduce(function (a, f) {
      return a + f.min;
    }, 0);
    /* cronometro: parte da solo al primo «Avanti» e confronta il tempo con i minuti previsti per la scena */
    var ck = useRef({
        el: 0,
        run: false,
        t0: 0
      }),
      tk = useState(0),
      setTk = tk[1],
      ar = useState(false),
      armato = ar[0],
      setArmato = ar[1];
    function adesso() {
      var c = ck.current;
      return c.el + (c.run ? Date.now() - c.t0 : 0);
    }
    function avviaT() {
      var c = ck.current;
      if (!c.run) {
        c.run = true;
        c.t0 = Date.now();
        setTk(Date.now());
      }
    }
    function pausaT() {
      var c = ck.current;
      if (c.run) {
        c.el = adesso();
        c.run = false;
        setTk(Date.now());
      }
    }
    function azzeraT() {
      if (!armato) {
        setArmato(true);
        setTimeout(function () {
          setArmato(false);
        }, 3000);
        return;
      }
      ck.current = {
        el: 0,
        run: false,
        t0: 0
      };
      setArmato(false);
      setTk(Date.now());
    }
    var corre = ck.current.run;
    useEffect(function () {
      if (!corre) return;
      var t = setInterval(function () {
        setTk(Date.now());
      }, 1000);
      return function () {
        clearInterval(t);
      };
    }, [corre]);
    function go(n) {
      if (n < 0 || n >= scene.length || n === i) return;
      setDir(n > i ? 1 : -1);
      seen.current[n] = true;
      setI(n);
      toTop(true);
      if (n > 0 && !ck.current.run && !ck.current.el) avviaT();
      if (n === scene.length - 1) say(L.saluto || 'Ultima tappa: tiriamo le fila.');
    }
    var ctx2 = Object.assign({}, props.ctx, {
      vai: go,
      scene: scene,
      indice: i,
      fasi: fasi,
      totale: tot
    });
    var ms = adesso(),
      sec = Math.floor(ms / 1000),
      em = ms / 60000,
      prima = 0;
    for (var q = 0; q < i; q++) prima += +scene[q].minuti || 0;
    var fineS = prima + (+(scene[i] || {}).minuti || 0),
      stato = 'In orario',
      cls = '';
    if (!ms) {
      stato = 'Pronto';
      cls = ' is-idle';
    } else if (em > fineS) {
      stato = '+' + Math.ceil(em - fineS) + '′';
      cls = em > fineS + 3 ? ' is-very-late' : ' is-late';
    } else if (em < prima - 2) {
      stato = 'In anticipo';
      cls = ' is-early';
    }
    if (!corre && ms) stato = 'Pausa · ' + stato;
    function dot(k) {
      var s = scene[k];
      return html`<button key=${k} className=${'ll-dot' + (seen.current[k] ? ' is-seen' : '')} aria-current=${k === i ? 'step' : null} title=${k + 1 + '. ' + plain(s.titolo) + (s.minuti ? ' · ' + s.minuti + '′' : '')} aria-label=${'Scena ' + (k + 1) + ': ' + plain(s.titolo)} onClick=${function () {
        go(k);
      }}></button>`;
    }
    useEffect(function () {
      function key(e) {
        var t = (e.target.tagName || '').toLowerCase();
        if (props.attiva === false || t === 'input' || t === 'textarea' || e.target.isContentEditable || e.defaultPrevented) return;
        if (e.key === 'ArrowRight' || e.key === 'PageDown') go(i + 1);
        if (e.key === 'ArrowLeft' || e.key === 'PageUp') go(i - 1);
      }
      d.addEventListener('keydown', key);
      return function () {
        d.removeEventListener('keydown', key);
      };
    });
    useEffect(function () {
      var h = d.getElementById('ll-h');
      if (h && i) h.focus({
        preventScroll: true
      });
    }, [i]);
    useEffect(function () {
      if (props.attiva === false) return;
      d.body.dataset.mascScena = scene[i] && scene[i].mascotte ? '1' : '';
      return function () {
        d.body.dataset.mascScena = '';
      };
    }, [i, props.attiva]);
    useEffect(function () {
      if (props.onScena) props.onScena(i + 1);
    }, [i]);
    return html`<${R.Fragment}>
      <div className="ll-scroll"><main className="ll-stage">
        ${PR.length > 1 && i === 0 && html`<div className="ll-route" role="radiogroup" aria-label="Percorso della lezione"><span className="ll-moment">Percorso</span>${PR.map(function (x) {
      return html`<button key=${x.id} role="radio" aria-checked=${perc === x.id} onClick=${function () {
        setPerc(x.id);
        seen.current = {
          0: true
        };
      }}>${x.nome}</button>`;
    })}${(PR.filter(function (x) {
      return x.id === perc;
    })[0] || {}).descrizione && html`<p>${inline(PR.filter(function (x) {
      return x.id === perc;
    })[0].descrizione, 'pr')}</p>`}</div>`}
        <${Scena} key=${perc + '-' + i} i=${i} s=${scene[i]} dir=${dir} ctx=${ctx2} /></main><${Piede} /></div>
      <nav className="ll-nav" aria-label="Scene della lezione">
        <div className=${'ll-clock' + cls} role="group" aria-label="Cronometro della lezione">
          <button className="ll-clock-b" onClick=${corre ? pausaT : avviaT} aria-label=${corre ? 'Metti in pausa il cronometro' : 'Avvia il cronometro'}>${corre ? '❚❚' : '▶'}</button>
          <span className="ll-clock-t" role="timer">${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}<small> / ${tot}′</small></span>
          <span className="ll-clock-st" aria-live="polite">${stato}</span>
          ${ms > 0 && html`<button className="ll-clock-r" onClick=${azzeraT} aria-label="Azzera il cronometro" title="Azzera il cronometro">${armato ? 'Sicuro?' : '↺'}</button>`}
        </div>
        <div className="ll-navc">
          <button className="ll-navbtn" disabled=${i === 0} onClick=${function () {
      go(i - 1);
    }}>Indietro</button>
          <div className="ll-plan">${fasi.map(function (f, fi) {
      var on = f.idx.indexOf(i) > -1;
      return html`<div key=${fi} className=${'ll-fase' + (on ? ' is-on' : '') + (f.idx[f.idx.length - 1] < i ? ' is-done' : '')} style=${{
        flexGrow: f.min || 1
      }}><span className="ll-fase-n">${f.n}${f.min ? html`<small> · ${f.min}′</small>` : ''}</span><div className="ll-dots">${f.idx.map(dot)}</div></div>`;
    })}</div>
          <span className="ll-count"><b className="ll-count-f">${(fasi.filter(function (f) {
      return f.idx.indexOf(i) > -1;
    })[0] || {}).n || ''}</b>${i + 1} / ${scene.length}</span>
          <button className="ll-navbtn ll-navbtn--go" disabled=${i === scene.length - 1} onClick=${function () {
      go(i + 1);
    }}>Avanti</button>
        </div>
        <span className="ll-nav-m" aria-hidden="true"></span>
      </nav>
    </${R.Fragment}>`;
  }
  function testoStudio(L) {
    var S = L.studio || {},
      out = [plain(L.titolo), L.sottotitolo ? plain(L.sottotitolo) : '', ''];
    (S.sezioni || []).forEach(function (s) {
      out.push(plain(s.titolo).toUpperCase(), '', plain(s.testo), '');
    });
    if (S.fonti && S.fonti.length) {
      out.push('FONTI', '');
      S.fonti.forEach(function (f) {
        out.push('- ' + plain(f));
      });
      out.push('');
    }
    out.push('© Matteo Sestili — Tutti i diritti riservati');
    return out.join('\n');
  }
  function Studio(props) {
    var L = props.L,
      S = L.studio || {};
    function scarica() {
      var blob = new Blob(['﻿' + testoStudio(L)], {
          type: 'text/plain;charset=utf-8'
        }),
        a = d.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = (L.slug || 'lezione') + '-testo.txt';
      d.body.appendChild(a);
      a.click();
      setTimeout(function () {
        URL.revokeObjectURL(a.href);
        a.remove();
      }, 1000);
      cheer();
    }
    return html`<main className="ll-study">
      <div className="ll-study-top"><${Mascotte} size=${55} aureola=${false} /><p className="ll-study-meta">Da studiare · ${L.classe || ''}</p></div>
      <h1>${titleNode(L.titolo)}</h1>
      ${L.sottotitolo && html`<p className="ll-lead">${inline(L.sottotitolo, 's')}</p>`}
      <div className="ll-row" style=${{
      marginBottom: 34
    }}>
        <button className="ll-btn" onClick=${scarica}>Scarica il testo</button>
        <button className="ll-btn ll-btn--ghost" onClick=${function () {
      w.print();
    }}>Stampa</button>
      </div>
      ${(S.sezioni || []).map(function (s, i) {
      return html`<section key=${i}><h2>${s.titolo}</h2>${md(s.testo)}</section>`;
    })}
      ${S.fonti && S.fonti.length && html`<div className="ll-sources"><b>Fonti</b><ul>${S.fonti.map(function (f, i) {
      return html`<li key=${i}>${inline(f, 'f' + i)}</li>`;
    })}</ul></div>`}
    </main>`;
  }
  var GNAMES = {
    quiz: ['Ripasso', 'Quiz'],
    vf: ['Ripasso', 'Vero o falso'],
    flash: ['Ripasso', 'Flashcard'],
    memory: ['Ripasso', 'Memory'],
    abbina: ['Concetti', 'Abbinamenti'],
    cat: ['Concetti', 'Categorie'],
    seq: ['Storia', 'Linea del tempo'],
    completa: ['Parole', 'Completa'],
    cruci: ['Parole', 'Cruciverba'],
    sfida: ['Classe', 'Sfida a squadre'],
    sondaggio: ['Classe', 'Sondaggio'],
    rifl: ['Personale', 'Riflessione']
  };
  function Giochi(props) {
    var D = w.GIOCHI_DATI || {},
      ids = Object.keys(GNAMES).filter(function (k) {
        return D[k];
      });
    useEffect(function () {
      if (w.Giochi) w.Giochi.init(props.start);
      return function () {
        w.Giochi && w.Giochi.clear();
      };
    }, []);
    if (!ids.length) return html`<main className="ll-games"><p className="ll-hint">Questa lezione non contiene giochi.</p></main>`;
    return html`<div className="ll-games">
      <div className="ll-row" style=${{
      justifyContent: props.ritorno ? 'space-between' : 'flex-end',
      marginTop: 0,
      marginBottom: 13
    }}>${props.ritorno && html`<button className="ll-navbtn ll-navbtn--go" type="button" onClick=${props.ritorno}>Torna alla lezione · scena ${props.scena}</button>`}<button className="g-tool" type="button" data-mute>Suoni: sì</button></div>
      <nav className="g-tabs" role="tablist" aria-label="Giochi">${ids.map(function (k) {
      return html`<button key=${k} type="button" role="tab" data-game-tab=${k}><small>${GNAMES[k][0]}</small>${GNAMES[k][1]}</button>`;
    })}</nav>
      <main id="game"></main>
    </div>`;
  }
  var MODI = [['lezione', 'Lezione'], ['studio', 'Studio'], ['giochi', 'Giochi']];
  function App() {
    var L = w.LEZIONE || {},
      m = useState('lezione'),
      modo = m[0],
      setModo = m[1],
      g = useState(null),
      start = g[0],
      setStart = g[1];
    var rt = useState(false),
      ritorno = rt[0],
      setRitorno = rt[1],
      sc = useState(1),
      scena = sc[0],
      setScena = sc[1];
    var t = useState(d.documentElement.dataset.tema === 'chiaro'),
      chiaro = t[0],
      setChiaro = t[1];
    var hasGames = Object.keys(GNAMES).some(function (k) {
      return (w.GIOCHI_DATI || {})[k];
    });
    var modi = MODI.filter(function (x) {
      return x[0] !== 'giochi' || hasGames;
    }).filter(function (x) {
      return x[0] !== 'studio' || L.studio;
    });
    var gl = useState(false),
      glos = gl[0],
      setGlos = gl[1],
      pp = useState(null),
      pop = pp[0],
      setPop = pp[1],
      popRef = useRef(null);
    var lm = useState(d.documentElement.hasAttribute('data-lim')),
      lim = lm[0],
      setLim = lm[1];
    var voci = Object.keys(GLOS).sort(function (a, b) {
      return GLOS[a].w.localeCompare(GLOS[b].w, 'it');
    });
    useEffect(function () {
      d.body.dataset.modo = modo;
      toTop();
      setPop(null);
    }, [modo]);
    useEffect(function () {
      dfnSub = function (k, el) {
        setGlos(false);
        setPop(function (o) {
          return o && o.el === el ? null : {
            k: k,
            el: el
          };
        });
      };
      function sync(e) {
        setLim(!!(e && e.detail));
      }
      w.addEventListener('lab:lim', sync);
      return function () {
        dfnSub = null;
        w.removeEventListener('lab:lim', sync);
      };
    }, []);
    R.useLayoutEffect(function () {
      // il fumetto della parola si apre sotto (o sopra) la parola, dentro lo schermo, anche in LIM
      var p = popRef.current;
      if (!pop || !p) return;
      var r = pop.el.getBoundingClientRect(),
        z = p.currentCSSZoom || 1,
        pw = p.offsetWidth * z,
        ph = p.offsetHeight * z;
      var x = Math.max(13, Math.min(w.innerWidth - pw - 13, r.left + r.width / 2 - pw / 2)),
        y = r.bottom + 13 + ph < w.innerHeight ? r.bottom + 13 : Math.max(13, r.top - ph - 13);
      p.style.left = x / z + 'px';
      p.style.top = y / z + 'px';
      p.style.visibility = 'visible';
    }, [pop, lim]);
    useEffect(function () {
      if (!pop && !glos) return;
      function chiudi(e) {
        if (e.type === 'keydown' && e.key !== 'Escape') return;
        if (e.type === 'pointerdown' && e.target.closest && e.target.closest('.ll-pop,.ll-glos,.ll-dfn,[data-glos-btn]')) return;
        setPop(null);
        setGlos(false);
      }
      function scorri(e) {
        if (!(e.target && e.target.closest && e.target.closest('.ll-glos'))) setPop(null);
      }
      d.addEventListener('keydown', chiudi);
      d.addEventListener('pointerdown', chiudi);
      d.addEventListener('scroll', scorri, true);
      return function () {
        d.removeEventListener('keydown', chiudi);
        d.removeEventListener('pointerdown', chiudi);
        d.removeEventListener('scroll', scorri, true);
      };
    }, [pop, glos]);
    function toggleLim() {
      var on = !lim;
      if (w.LabArtefatto && w.LabArtefatto.lim) w.LabArtefatto.lim(on);else if (on) d.documentElement.setAttribute('data-lim', '');else d.documentElement.removeAttribute('data-lim');
      setLim(on);
    }
    var gp = pop ? GLOS[pop.k] || {
      w: pop.el.textContent
    } : null;
    function tema() {
      var c = chiaro ? 'scuro' : 'chiaro';
      d.documentElement.dataset.tema = c;
      try {
        localStorage.setItem('tema_lab', c);
      } catch (e) {}
      setChiaro(!chiaro);
    }
    function schermo() {
      try {
        if (d.fullscreenElement) d.exitFullscreen();else d.documentElement.requestFullscreen();
      } catch (e) {}
    }
    var ctx = {
      gioca: function (id) {
        setStart(id || null);
        setRitorno(true);
        setModo('giochi');
      },
      say: say,
      cheer: cheer,
      oops: oops,
      festa: festa
    };
    return html`<${R.Fragment}>
      <header className="ll-top">
        <div className="ll-brand"><span className="ll-logo" data-amdg-trigger dangerouslySetInnerHTML=${{
      __html: LOGO
    }}></span><span><small>Lab IRC · ${L.classe || ''}</small><b>${plain(L.titolo)}</b></span></div>
        <div className="ll-tools">
          <div className="ll-modes" role="tablist" aria-label="Modalità">${modi.map(function (x) {
      return html`<button key=${x[0]} role="tab" aria-selected=${modo === x[0]} onClick=${function () {
        if (x[0] === 'giochi') {
          setStart(null);
          setRitorno(modo === 'lezione');
        }
        setModo(x[0]);
      }}>${x[1]}</button>`;
    })}</div>
          ${voci.length > 0 && html`<button className="ll-chip" data-glos-btn="" aria-pressed=${glos} onClick=${function () {
      setPop(null);
      setGlos(!glos);
    }} title="Le parole nuove della lezione">Glossario<b>${voci.length}</b></button>`}
          <button className="ll-chip" aria-pressed=${lim} onClick=${toggleLim} title="Modalità LIM: tutto più grande in proporzione aurea (tasto L)">LIM</button>
          <button className="ll-icon" onClick=${tema} aria-label=${chiaro ? 'Passa al tema scuro' : 'Passa al tema chiaro'} title="Tema">${chiaro ? '🌙' : '☀️'}</button>
          <button className="ll-icon" onClick=${schermo} aria-label="Schermo intero" title="Schermo intero"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg></button>
        </div>
      </header>
      <div className="ll-lezione" style=${{
      display: modo === 'lezione' ? 'contents' : 'none'
    }}><${Lezione} L=${L} ctx=${ctx} attiva=${modo === 'lezione'} onScena=${setScena} /></div>
      ${modo === 'studio' && html`<div className="ll-scroll"><${Studio} L=${L} /><${Piede} /></div>`}
      ${modo === 'giochi' && html`<div className="ll-scroll"><${Giochi} start=${start} ritorno=${ritorno ? function () {
      setModo('lezione');
    } : null} scena=${scena} /><${Piede} /></div>`}
      ${gp && html`<div key=${pop.k + '|' + pop.el.textContent} className="ll-pop" role="dialog" aria-label=${'Parola nuova: ' + gp.w} ref=${popRef} style=${{
      visibility: 'hidden'
    }}>
        <button className="ll-pop-x" onClick=${function () {
      setPop(null);
    }} aria-label="Chiudi">×</button>
        <p className="ll-pop-k">Parola nuova</p>
        <p className="ll-pop-w">${gp.w}</p>
        ${gp.etim && html`<p className="ll-pop-e">${inline(gp.etim, 'pe')}</p>`}
        <p className="ll-pop-d">${gp.def ? inline(gp.def, 'pd') : 'Scheda da completare nel glossario della lezione.'}</p>
        <button className="ll-link" onClick=${function () {
      setPop(null);
      setGlos(true);
    }}>Tutto il glossario</button>
      </div>`}
      ${glos && html`<aside className="ll-glos" aria-label="Glossario">
        <button className="ll-pop-x" onClick=${function () {
      setGlos(false);
    }} aria-label="Chiudi">×</button>
        <p className="ll-moment">Parole nuove · ${voci.length}</p>
        <h2>Glossario</h2>
        <ol>${voci.map(function (k) {
      var g = GLOS[k];
      return html`<li key=${k}><b>${g.w}</b>${g.etim && html`<small>${inline(g.etim, 'ge' + k)}</small>`}${g.def && html`<p>${inline(g.def, 'gd' + k)}</p>`}</li>`;
    })}</ol>
      </aside>`}
    </${R.Fragment}>`;
  }

  /* Pulsanti magnetici del design system: seguono il cursore (0.236 / 0.382), rientrano lenti. */
  function magnete() {
    if (reduce || !w.matchMedia('(hover: hover)').matches) return;
    var cur = null;
    d.addEventListener('pointermove', function (e) {
      var b = e.target.closest ? e.target.closest('.ll-btn, .ll-navbtn--go') : null;
      if (cur && cur !== b) {
        cur.style.removeProperty('--bx');
        cur.style.removeProperty('--by');
      }
      cur = b;
      if (!b || b.disabled) return;
      var r = b.getBoundingClientRect();
      b.style.setProperty('--bx', ((e.clientX - r.left - r.width / 2) * .236).toFixed(1) + 'px');
      b.style.setProperty('--by', ((e.clientY - r.top - r.height / 2) * .382).toFixed(1) + 'px');
    });
    var n = 0,
      t; // 7 clic sul logo → AMDG
    d.addEventListener('click', function (e) {
      if (!e.target.closest || !e.target.closest('[data-amdg-trigger]')) return;
      clearTimeout(t);
      t = setTimeout(function () {
        n = 0;
      }, 1618);
      if (++n >= 7) {
        n = 0;
        w.LabArtefatto && w.LabArtefatto.amdg();
      }
    });
  }
  w.LabLezione = {
    registra: function (nome, comp) {
      custom[nome] = comp;
    },
    blocco: function (nome, fn) {
      B[nome] = fn;
    },
    md: md,
    inline: inline,
    plain: plain,
    festa: festa,
    blocchi: B,
    Mascotte: Mascotte,
    glossa: glossa,
    glossario: GLOS,
    avvia: function () {
      var L = w.LEZIONE || {};
      raccogli(L);
      if (L.titolo) d.title = plain(L.titolo) + ' · Lab IRC';
      magnete();
      w.ReactDOM.createRoot(d.getElementById('app')).render(html`<${App} />`);
    }
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "assets/artefatti/lezione/lab-lezione.js", error: String((e && e.message) || e) }); }

// assets/lab-tema.js
try { (() => {
/* =====================================================================
   lab-tema.js — interruttore chiaro/scuro condiviso per lab-irc
   ---------------------------------------------------------------------
   Da includere con UNA riga, alla fine del <body>:

       <script src="../assets/lab-tema.js"></script>

   Crea il pulsante 🌙/☀️ in basso a destra e ricorda la scelta sul
   dispositivo (localStorage). Usa la stessa logica data-tema dell'area
   verifiche, così la preferenza è coerente in tutto il sito.

   Per evitare il "lampo" di tema sbagliato al caricamento, metti anche
   questo nello <head> della pagina, PRIMA del CSS:

     <script>try{var t=localStorage.getItem('tema_lab');
       if(t)document.documentElement.dataset.tema=t;}catch(e){}</script>
   ===================================================================== */
(function () {
  var cs = document.currentScript;
  if (!cs || !/lab-tema\.js/.test(cs.src || "")) return; /* incluso in un bundle: non fare nulla */
  var CHIAVE = "tema_lab";
  function corrente() {
    /* Default del sito = "scuro" (Notte studio). */
    return document.documentElement.dataset.tema === "chiaro" ? "chiaro" : "scuro";
  }
  function applica(t) {
    document.documentElement.dataset.tema = t;
    try {
      localStorage.setItem(CHIAVE, t);
    } catch (e) {}
  }

  /* Applica subito la preferenza salvata (se lo script di <head> non c'era). */
  try {
    var salvato = localStorage.getItem(CHIAVE);
    if (salvato) document.documentElement.dataset.tema = salvato;
  } catch (e) {}
  function crea() {
    if (document.getElementById("labTema")) return;
    var btn = document.createElement("button");
    btn.id = "labTema";
    btn.type = "button";
    btn.setAttribute("aria-label", "Cambia tema chiaro/scuro");
    btn.textContent = corrente() === "scuro" ? "☀️" : "🌙";
    btn.addEventListener("click", function () {
      var nuovo = corrente() === "scuro" ? "chiaro" : "scuro";
      applica(nuovo);
      btn.textContent = nuovo === "scuro" ? "☀️" : "🌙";
    });
    document.body.appendChild(btn);
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", crea);
  } else {
    crea();
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "assets/lab-tema.js", error: String((e && e.message) || e) }); }

// assets/mascotte/lab-mascotte.js
try { (() => {
/* Lab IRC — Mascotte 2D. Web component senza dipendenze.
   Uso: <script src="lab-mascotte.js"></script>  <lab-mascotte anno="1" size="89"></lab-mascotte>
   Attributi: anno 1–5 · size px (default 89) · aureola="false" · parla="false" · statica (niente occhi che seguono)
   Al 7° clic emette window 'lab:amdg'. */
(() => {
  const C = {
    1: '#FF7A59',
    2: '#4FB0FF',
    3: '#A78BFA',
    4: '#FB7BB5',
    5: '#FBBF24'
  };
  const O = '#E3C27A',
    K = '#14131F',
    G = '#34D399';
  const eyes = pts => `<g data-occhi>${pts.map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="3.4" ry="5.5" fill="${K}"/><circle data-luce cx="${x - 1}" cy="${y - 2}" r="1.3" fill="#fff"/>`).join('')}</g>`;
  const smile = d => `<path d="${d}" fill="none" stroke="${K}" stroke-width="2.5" stroke-linecap="round"/>`;
  const leaf = (rot, c) => `<g transform="translate(72 36) rotate(${rot})"><path d="M0 0 Q17 -13 34 0 Q17 13 0 0Z" fill="${c}"/><path d="M5 0 H26" stroke="${O}" stroke-width="1" stroke-linecap="round"/></g>`;
  const HALO = `<circle cx="72" cy="72" r="68" fill="none" stroke="${O}" stroke-width=".8" stroke-opacity=".5"/>`;
  const BODY = {
    1: () => `<path d="M72 57 V36" stroke="${C[1]}" stroke-width="5" stroke-linecap="round"/>${leaf(-34, C[1])}${leaf(-146, C[1])}
      <circle cx="72" cy="89" r="34" fill="${C[1]}"/>${eyes([[61.5, 85], [82.5, 85]])}${smile('M66 99 Q72 104 78 99')}`,
    2: () => `<path d="M94 89 L123 68 Q115 89 123 110 Z" fill="${C[2]}" stroke-linejoin="round"/>
      <path d="M21 89 A47 47 0 0 1 102 89 A47 47 0 0 1 21 89 Z" fill="${C[2]}"/>
      <path d="M68 71 Q76 89 68 107" fill="none" stroke="${O}" stroke-width="1" stroke-linecap="round"/>${eyes([[42, 84]])}${smile('M29 95 Q33 98 37 95')}`,
    3: () => `<path d="M72 89 V21" stroke="${C[3]}" stroke-width="4" stroke-linecap="round"/>
      <path d="M72 5 V18 M66 10 H78" stroke="${O}" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M78 26 L112 81 H78 Z" fill="${C[3]}" fill-opacity=".618" stroke-linejoin="round"/>
      <path d="M66 47 L45 81 H66 Z" fill="${C[3]}" fill-opacity=".382"/>
      <path d="M18 89 H126 Q120 112 102 120 H42 Q24 112 18 89 Z" fill="${C[3]}"/>
      <path d="M21 89 H123" stroke="${O}" stroke-width="1.2" stroke-linecap="round"/>${eyes([[61.5, 101], [82.5, 101]])}${smile('M67 110 Q72 114 77 110')}`,
    4: () => `<circle cx="72" cy="30" r="5" fill="none" stroke="${O}" stroke-width="2"/><rect x="67" y="35" width="10" height="7" rx="2" fill="${O}"/>
      <circle cx="72" cy="89" r="47" fill="${C[4]}" stroke="${O}" stroke-width="1.2"/>
      <circle cx="72" cy="89" r="29" fill="none" stroke="#fff" stroke-opacity=".45" stroke-width="1.5"/>
      <path d="M72 55 V61 M72 117 V123 M38 89 H44 M100 89 H106" stroke="#fff" stroke-opacity=".7" stroke-width="2" stroke-linecap="round"/>
      <g data-ago><path d="M72 63 L77 89 L67 89 Z" fill="#fff"/><path d="M72 115 L77 89 L67 89 Z" fill="${K}" fill-opacity=".55"/></g>
      <circle cx="72" cy="89" r="3.4" fill="${O}"/>`,
    5: uid => `<defs><clipPath id="${uid}"><circle cx="72" cy="89" r="42"/></clipPath></defs>
      <g transform="rotate(23.4 72 89)"><path d="M72 39 A50 50 0 0 1 72 139" fill="none" stroke="${O}" stroke-width="1.6" stroke-linecap="round"/>
      <circle cx="72" cy="39" r="3" fill="${O}"/><circle cx="72" cy="139" r="3" fill="${O}"/></g>
      <circle cx="72" cy="89" r="42" fill="${C[5]}"/>
      <g clip-path="url(#${uid})" fill="${G}">
        <path d="M26 64 C38 58 50 64 48 75 C46 84 38 86 41 96 C44 105 37 112 28 108 Z"/>
        <path d="M76 49 C90 45 106 52 114 64 C106 70 97 65 93 72 C86 71 79 63 76 56 Z"/>
        <path d="M96 106 C104 101 114 106 112 115 C105 122 95 117 96 106 Z"/>
        <path d="M48 124 C60 117 78 119 88 128 C78 136 58 136 48 124 Z"/></g>
      <circle cx="72" cy="89" r="42" fill="none" stroke="#fff" stroke-opacity=".18" stroke-width="1.2"/>
      ${eyes([[61.5, 87], [82.5, 87]])}${smile('M66 100 Q72 105 78 100')}`
  };
  const INFO = {
    1: {
      nome: 'Semino',
      frasi: ['Ogni grande albero è stato un seme.', 'Da dove vengo? Bella domanda!', 'In principio… c’era una domanda.']
    },
    2: {
      nome: 'Ichthy',
      frasi: ['ΙΧΘΥΣ: Gesù Cristo, Figlio di Dio, Salvatore.', 'I primi cristiani mi disegnavano in segreto.', 'Venite dietro a me! (Mc 1,17)']
    },
    3: {
      nome: 'Navicella',
      frasi: ['Duc in altum! Prendi il largo. (Lc 5,4)', 'Duemila anni di mare… e ancora a galla.', 'Tempesta? Non temete!']
    },
    4: {
      nome: 'Bussolina',
      frasi: ['La coscienza è la mia bussola.', 'E la tua, dove punta?', 'Libertà non è andare ovunque: è sapere dove.']
    },
    5: {
      nome: 'Terra',
      frasi: ['Laudato si’! Custodisci la casa comune.', 'Tutto è connesso.', 'Il futuro comincia adesso.']
    }
  };
  let uidN = 0;
  function svg(n, {
    aureola = true,
    uid = 'lab-terra-' + ++uidN
  } = {}) {
    n = C[n] ? +n : 1;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 144" role="img" aria-label="${INFO[n].nome}" style="overflow:visible">${aureola ? HALO : ''}${BODY[n](uid)}</svg>`;
  }
  window.LabMascotte = {
    svg,
    INFO,
    COLORI: C
  };
  if (typeof customElements === 'undefined' || customElements.get('lab-mascotte')) return;
  const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  class El extends HTMLElement {
    static get observedAttributes() {
      return ['anno', 'size', 'aureola'];
    }
    connectedCallback() {
      if (!this.shadowRoot) this.attachShadow({
        mode: 'open'
      });
      this.render();
      this.clicks = 0;
      this.onMove = e => this.look(e);
      if (!this.hasAttribute('statica')) {
        addEventListener('mousemove', this.onMove);
        this.blinkLoop();
      }
    }
    disconnectedCallback() {
      removeEventListener('mousemove', this.onMove);
      clearTimeout(this.bt);
      clearTimeout(this.bt2);
      clearTimeout(this.mt);
    }
    attributeChangedCallback() {
      if (this.shadowRoot) this.render();
    }
    render() {
      const n = +this.getAttribute('anno') || 1,
        s = +this.getAttribute('size') || 89;
      this.n = C[n] ? n : 1;
      this.shadowRoot.innerHTML = `<style>
        :host{display:inline-block;position:relative;width:${s}px;height:${s}px;line-height:0;cursor:pointer;vertical-align:middle}
        .m{display:block;width:100%;height:100%;transition:transform 610ms cubic-bezier(.16,1,.3,1)}
        :host(:hover) .m{transform:translateY(-5px) rotate(-5deg);transition-duration:233ms}
        :host(:active) .m{transform:scale(.94)}
        svg{width:100%;height:100%}
        [data-occhi]{transition:transform 144ms linear}
        .b{position:absolute;left:50%;bottom:calc(100% + 8px);transform:translateX(-50%);width:max-content;max-width:189px;z-index:20;pointer-events:none;
          background:var(--lab-surface,#1E1C2E);color:var(--lab-ink,#ECEAF5);border:1px solid var(--lab-oro,#E3C27A);border-radius:13px;padding:8px 13px;
          font:500 13px/1.4 var(--lab-font-body,'Figtree',system-ui,sans-serif);text-align:left;box-shadow:0 8px 21px rgba(0,0,0,.3);animation:r 377ms cubic-bezier(.16,1,.3,1) both}
        :host([fumetto="sinistra"]) .b{left:auto;right:0;transform:none}
        @keyframes r{from{opacity:0;transform:translate(-50%,8px)}}
        @media (prefers-reduced-motion:reduce){.m,.b,[data-occhi]{transition:none;animation:none}}
      </style><span class="m">${svg(this.n, {
        aureola: this.getAttribute('aureola') !== 'false'
      })}</span>`;
      this.shadowRoot.querySelector('.m').onclick = e => this.click(e);
      this.occhi = [...this.shadowRoot.querySelectorAll('[data-occhi]')];
      this.ago = this.shadowRoot.querySelector('[data-ago]');
    }
    look(e) {
      if (this.raf) return;
      this.raf = requestAnimationFrame(() => {
        this.raf = null;
        const r = this.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2),
          y = e.clientY - (r.top + r.height * .6);
        const d = Math.hypot(x, y) || 1,
          k = Math.min(1, d / 144);
        this.occhi.forEach(g => g.setAttribute('transform', `translate(${(x / d * 1.6 * k).toFixed(2)} ${(y / d * 1.6 * k).toFixed(2)})`));
        if (this.ago) this.ago.setAttribute('transform', `rotate(${(Math.atan2(y, x) * 180 / Math.PI + 90).toFixed(1)} 72 89)`);
      });
    }
    blinkLoop() {
      if (reduce()) return;
      this.bt = setTimeout(() => {
        const set = (ry, v) => this.shadowRoot.querySelectorAll('[data-occhi] ellipse').forEach(el => el.setAttribute('ry', ry)) || this.shadowRoot.querySelectorAll('[data-luce]').forEach(el => el.style.visibility = v);
        set(.8, 'hidden');
        this.bt2 = setTimeout(() => {
          set(5.5, 'visible');
          this.blinkLoop();
        }, 144);
      }, 2584 + Math.random() * 2584);
    }
    click(e) {
      e.preventDefault();
      e.stopPropagation();
      this.clicks++;
      if (this.clicks >= 7) {
        this.clicks = 0;
        this.bubble(null);
        dispatchEvent(new Event('lab:amdg'));
        return;
      }
      if (this.getAttribute('parla') === 'false') return;
      const i = INFO[this.n];
      this.bubble(this.clicks === 1 ? `Ciao, sono ${i.nome}!` : i.frasi[(this.clicks - 2) % i.frasi.length]);
    }
    bubble(t) {
      this.shadowRoot.querySelector('.b')?.remove();
      clearTimeout(this.mt);
      if (!t) return;
      const b = document.createElement('span');
      b.className = 'b';
      b.textContent = t;
      this.shadowRoot.appendChild(b);
      this.mt = setTimeout(() => b.remove(), 2618);
    }
  }
  customElements.define('lab-mascotte', El);
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "assets/mascotte/lab-mascotte.js", error: String((e && e.message) || e) }); }

// components/brand/Amdg.jsx
try { (() => {
/** Near-invisible "A·M·D·G" mark. Glows gold on hover; a click opens the AmdgEgg reveal. */
function Amdg({
  size = 11
}) {
  const [hov, setHov] = React.useState(false);
  return /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    onMouseEnter: () => setHov(true),
    onMouseLeave: () => setHov(false),
    onClick: () => window.dispatchEvent(new Event('lab:amdg')),
    style: {
      fontFamily: 'var(--lab-font-inscription)',
      fontWeight: 600,
      fontSize: size,
      letterSpacing: hov ? '.5em' : '.3em',
      color: hov ? 'var(--lab-oro)' : 'var(--lab-muted)',
      opacity: hov ? 1 : 0.13,
      textShadow: hov ? '0 0 13px rgba(227,194,122,.6)' : 'none',
      transition: 'all 610ms var(--lab-ease-out)',
      cursor: 'default',
      userSelect: 'none',
      whiteSpace: 'nowrap'
    }
  }, "A\xB7M\xB7D\xB7G");
}
Object.assign(__ds_scope, { Amdg });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Amdg.jsx", error: String((e && e.message) || e) }); }

// components/brand/AmdgEgg.jsx
try { (() => {
const LETTERS = ['A', 'M', 'D', 'G'];

/**
 * Hidden AMDG reveal. Mount once per page. Triggers:
 *  • typing "amdg" anywhere (outside inputs)
 *  • 7 quick clicks on any element with [data-amdg-trigger]
 *  • window.dispatchEvent(new Event('lab:amdg'))
 * Closes on click, Esc, or after 6.18s.
 */
function AmdgEgg({
  secret = 'amdg',
  clicks = 7,
  duration = 6180
}) {
  const [phase, setPhase] = React.useState('off'); // off | in | out

  React.useEffect(() => {
    let buf = '',
      count = 0,
      t;
    const show = () => setPhase('in');
    const key = e => {
      const tag = (e.target.tagName || '').toLowerCase();
      if (e.key === 'Escape') {
        setPhase(p => p === 'in' ? 'out' : p);
        return;
      }
      if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable || e.key.length !== 1) return;
      buf = (buf + e.key.toLowerCase()).slice(-secret.length);
      if (buf === secret) show();
    };
    const click = e => {
      if (!e.target.closest || !e.target.closest('[data-amdg-trigger]')) return;
      count += 1;
      clearTimeout(t);
      t = setTimeout(() => {
        count = 0;
      }, 1618);
      if (count >= clicks) {
        count = 0;
        show();
      }
    };
    window.addEventListener('keydown', key);
    document.addEventListener('click', click);
    window.addEventListener('lab:amdg', show);
    if (!window.__labAmdgLogged) {
      window.__labAmdgLogged = true;
      console.log('%cA · M · D · G', 'font: 600 21px Cinzel, Georgia, serif; color: #E3C27A; letter-spacing: .3em');
      console.log('%cAd maiorem Dei gloriam — prova a scrivere "amdg".', 'font: italic 13px Georgia, serif; color: #8E89A6');
    }
    return () => {
      window.removeEventListener('keydown', key);
      document.removeEventListener('click', click);
      window.removeEventListener('lab:amdg', show);
      clearTimeout(t);
    };
  }, [secret, clicks]);
  React.useEffect(() => {
    if (phase === 'in') {
      const id = setTimeout(() => setPhase('out'), duration);
      return () => clearTimeout(id);
    }
    if (phase === 'out') {
      const id = setTimeout(() => setPhase('off'), 610);
      return () => clearTimeout(id);
    }
  }, [phase, duration]);
  if (phase === 'off') return null;
  return /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-label": "Ad maiorem Dei gloriam",
    onClick: () => setPhase('out'),
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      display: 'grid',
      placeItems: 'center',
      cursor: 'pointer',
      background: 'radial-gradient(circle at 50% 45%, rgba(227,194,122,.18), rgba(10,9,16,.95) 61.8%)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      opacity: phase === 'out' ? 0 : 1,
      transition: 'opacity 610ms ease',
      animation: 'labFade 610ms ease-out both'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: 34
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: '#E3C27A',
      fontSize: 34,
      animation: 'labBreath 2.6s ease-in-out infinite',
      marginBottom: 21
    }
  }, "\u2726"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'baseline',
      gap: '.2em',
      fontFamily: 'var(--lab-font-inscription, Georgia, serif)',
      fontWeight: 600,
      fontSize: 'clamp(55px, 11vw, 144px)',
      lineHeight: 1,
      color: '#F3E7C6',
      textShadow: '0 0 34px rgba(227,194,122,.45)'
    }
  }, LETTERS.map((l, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: l
  }, i > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#E3C27A',
      fontSize: '.382em',
      animation: `labFade 987ms ease ${233 + i * 89}ms both`
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      animation: `labRise 987ms cubic-bezier(.16,1,.3,1) ${233 + i * 144}ms both`
    }
  }, l)))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      width: 'min(377px, 61.8vw)',
      margin: '34px auto 21px',
      background: 'linear-gradient(90deg, transparent, #E3C27A, transparent)',
      animation: 'labLine 987ms cubic-bezier(.16,1,.3,1) 987ms both'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--lab-font-display, Georgia, serif)',
      fontStyle: 'italic',
      fontWeight: 500,
      fontSize: 'clamp(20px, 2.6vw, 26px)',
      color: 'rgba(243,231,198,.9)',
      animation: 'labRise 987ms cubic-bezier(.16,1,.3,1) 1220ms both'
    }
  }, "Ad maiorem Dei gloriam"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--lab-font-body, sans-serif)',
      fontSize: 12.5,
      fontWeight: 800,
      letterSpacing: '.2em',
      textTransform: 'uppercase',
      color: 'rgba(227,194,122,.7)',
      marginTop: 13,
      animation: 'labFade 987ms ease 1600ms both'
    }
  }, "Per la maggior gloria di Dio")));
}
Object.assign(__ds_scope, { AmdgEgg });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/AmdgEgg.jsx", error: String((e && e.message) || e) }); }

// components/brand/YearMascot.jsx
try { (() => {
/* Web component <lab-mascotte> — identical copy of assets/mascotte/lab-mascotte.js (keep in sync). */
function defineLabMascotte() {
  if (typeof window === 'undefined') return;
  /* Lab IRC — Mascotte 2D. Web component senza dipendenze.
     Uso: <script src="lab-mascotte.js"></script>  <lab-mascotte anno="1" size="89"></lab-mascotte>
     Attributi: anno 1–5 · size px (default 89) · aureola="false" · parla="false" · statica (niente occhi che seguono)
     Al 7° clic emette window 'lab:amdg'. */
  (() => {
    const C = {
      1: '#FF7A59',
      2: '#4FB0FF',
      3: '#A78BFA',
      4: '#FB7BB5',
      5: '#FBBF24'
    };
    const O = '#E3C27A',
      K = '#14131F',
      G = '#34D399';
    const eyes = pts => `<g data-occhi>${pts.map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="3.4" ry="5.5" fill="${K}"/><circle data-luce cx="${x - 1}" cy="${y - 2}" r="1.3" fill="#fff"/>`).join('')}</g>`;
    const smile = d => `<path d="${d}" fill="none" stroke="${K}" stroke-width="2.5" stroke-linecap="round"/>`;
    const leaf = (rot, c) => `<g transform="translate(72 36) rotate(${rot})"><path d="M0 0 Q17 -13 34 0 Q17 13 0 0Z" fill="${c}"/><path d="M5 0 H26" stroke="${O}" stroke-width="1" stroke-linecap="round"/></g>`;
    const HALO = `<circle cx="72" cy="72" r="68" fill="none" stroke="${O}" stroke-width=".8" stroke-opacity=".5"/>`;
    const BODY = {
      1: () => `<path d="M72 57 V36" stroke="${C[1]}" stroke-width="5" stroke-linecap="round"/>${leaf(-34, C[1])}${leaf(-146, C[1])}
      <circle cx="72" cy="89" r="34" fill="${C[1]}"/>${eyes([[61.5, 85], [82.5, 85]])}${smile('M66 99 Q72 104 78 99')}`,
      2: () => `<path d="M94 89 L123 68 Q115 89 123 110 Z" fill="${C[2]}" stroke-linejoin="round"/>
      <path d="M21 89 A47 47 0 0 1 102 89 A47 47 0 0 1 21 89 Z" fill="${C[2]}"/>
      <path d="M68 71 Q76 89 68 107" fill="none" stroke="${O}" stroke-width="1" stroke-linecap="round"/>${eyes([[42, 84]])}${smile('M29 95 Q33 98 37 95')}`,
      3: () => `<path d="M72 89 V21" stroke="${C[3]}" stroke-width="4" stroke-linecap="round"/>
      <path d="M72 5 V18 M66 10 H78" stroke="${O}" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M78 26 L112 81 H78 Z" fill="${C[3]}" fill-opacity=".618" stroke-linejoin="round"/>
      <path d="M66 47 L45 81 H66 Z" fill="${C[3]}" fill-opacity=".382"/>
      <path d="M18 89 H126 Q120 112 102 120 H42 Q24 112 18 89 Z" fill="${C[3]}"/>
      <path d="M21 89 H123" stroke="${O}" stroke-width="1.2" stroke-linecap="round"/>${eyes([[61.5, 101], [82.5, 101]])}${smile('M67 110 Q72 114 77 110')}`,
      4: () => `<circle cx="72" cy="30" r="5" fill="none" stroke="${O}" stroke-width="2"/><rect x="67" y="35" width="10" height="7" rx="2" fill="${O}"/>
      <circle cx="72" cy="89" r="47" fill="${C[4]}" stroke="${O}" stroke-width="1.2"/>
      <circle cx="72" cy="89" r="29" fill="none" stroke="#fff" stroke-opacity=".45" stroke-width="1.5"/>
      <path d="M72 55 V61 M72 117 V123 M38 89 H44 M100 89 H106" stroke="#fff" stroke-opacity=".7" stroke-width="2" stroke-linecap="round"/>
      <g data-ago><path d="M72 63 L77 89 L67 89 Z" fill="#fff"/><path d="M72 115 L77 89 L67 89 Z" fill="${K}" fill-opacity=".55"/></g>
      <circle cx="72" cy="89" r="3.4" fill="${O}"/>`,
      5: uid => `<defs><clipPath id="${uid}"><circle cx="72" cy="89" r="42"/></clipPath></defs>
      <g transform="rotate(23.4 72 89)"><path d="M72 39 A50 50 0 0 1 72 139" fill="none" stroke="${O}" stroke-width="1.6" stroke-linecap="round"/>
      <circle cx="72" cy="39" r="3" fill="${O}"/><circle cx="72" cy="139" r="3" fill="${O}"/></g>
      <circle cx="72" cy="89" r="42" fill="${C[5]}"/>
      <g clip-path="url(#${uid})" fill="${G}">
        <path d="M26 64 C38 58 50 64 48 75 C46 84 38 86 41 96 C44 105 37 112 28 108 Z"/>
        <path d="M76 49 C90 45 106 52 114 64 C106 70 97 65 93 72 C86 71 79 63 76 56 Z"/>
        <path d="M96 106 C104 101 114 106 112 115 C105 122 95 117 96 106 Z"/>
        <path d="M48 124 C60 117 78 119 88 128 C78 136 58 136 48 124 Z"/></g>
      <circle cx="72" cy="89" r="42" fill="none" stroke="#fff" stroke-opacity=".18" stroke-width="1.2"/>
      ${eyes([[61.5, 87], [82.5, 87]])}${smile('M66 100 Q72 105 78 100')}`
    };
    const INFO = {
      1: {
        nome: 'Semino',
        frasi: ['Ogni grande albero è stato un seme.', 'Da dove vengo? Bella domanda!', 'In principio… c’era una domanda.']
      },
      2: {
        nome: 'Ichthy',
        frasi: ['ΙΧΘΥΣ: Gesù Cristo, Figlio di Dio, Salvatore.', 'I primi cristiani mi disegnavano in segreto.', 'Venite dietro a me! (Mc 1,17)']
      },
      3: {
        nome: 'Navicella',
        frasi: ['Duc in altum! Prendi il largo. (Lc 5,4)', 'Duemila anni di mare… e ancora a galla.', 'Tempesta? Non temete!']
      },
      4: {
        nome: 'Bussolina',
        frasi: ['La coscienza è la mia bussola.', 'E la tua, dove punta?', 'Libertà non è andare ovunque: è sapere dove.']
      },
      5: {
        nome: 'Terra',
        frasi: ['Laudato si’! Custodisci la casa comune.', 'Tutto è connesso.', 'Il futuro comincia adesso.']
      }
    };
    let uidN = 0;
    function svg(n, {
      aureola = true,
      uid = 'lab-terra-' + ++uidN
    } = {}) {
      n = C[n] ? +n : 1;
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 144" role="img" aria-label="${INFO[n].nome}" style="overflow:visible">${aureola ? HALO : ''}${BODY[n](uid)}</svg>`;
    }
    window.LabMascotte = {
      svg,
      INFO,
      COLORI: C
    };
    if (typeof customElements === 'undefined' || customElements.get('lab-mascotte')) return;
    const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
    class El extends HTMLElement {
      static get observedAttributes() {
        return ['anno', 'size', 'aureola'];
      }
      connectedCallback() {
        if (!this.shadowRoot) this.attachShadow({
          mode: 'open'
        });
        this.render();
        this.clicks = 0;
        this.onMove = e => this.look(e);
        if (!this.hasAttribute('statica')) {
          addEventListener('mousemove', this.onMove);
          this.blinkLoop();
        }
      }
      disconnectedCallback() {
        removeEventListener('mousemove', this.onMove);
        clearTimeout(this.bt);
        clearTimeout(this.bt2);
        clearTimeout(this.mt);
      }
      attributeChangedCallback() {
        if (this.shadowRoot) this.render();
      }
      render() {
        const n = +this.getAttribute('anno') || 1,
          s = +this.getAttribute('size') || 89;
        this.n = C[n] ? n : 1;
        this.shadowRoot.innerHTML = `<style>
        :host{display:inline-block;position:relative;width:${s}px;height:${s}px;line-height:0;cursor:pointer;vertical-align:middle}
        .m{display:block;width:100%;height:100%;transition:transform 610ms cubic-bezier(.16,1,.3,1)}
        :host(:hover) .m{transform:translateY(-5px) rotate(-5deg);transition-duration:233ms}
        :host(:active) .m{transform:scale(.94)}
        svg{width:100%;height:100%}
        [data-occhi]{transition:transform 144ms linear}
        .b{position:absolute;left:50%;bottom:calc(100% + 8px);transform:translateX(-50%);width:max-content;max-width:189px;z-index:20;pointer-events:none;
          background:var(--lab-surface,#1E1C2E);color:var(--lab-ink,#ECEAF5);border:1px solid var(--lab-oro,#E3C27A);border-radius:13px;padding:8px 13px;
          font:500 13px/1.4 var(--lab-font-body,'Figtree',system-ui,sans-serif);text-align:left;box-shadow:0 8px 21px rgba(0,0,0,.3);animation:r 377ms cubic-bezier(.16,1,.3,1) both}
        @keyframes r{from{opacity:0;transform:translate(-50%,8px)}}
        @media (prefers-reduced-motion:reduce){.m,.b,[data-occhi]{transition:none;animation:none}}
      </style><span class="m">${svg(this.n, {
          aureola: this.getAttribute('aureola') !== 'false'
        })}</span>`;
        this.shadowRoot.querySelector('.m').onclick = e => this.click(e);
        this.occhi = [...this.shadowRoot.querySelectorAll('[data-occhi]')];
        this.ago = this.shadowRoot.querySelector('[data-ago]');
      }
      look(e) {
        if (this.raf) return;
        this.raf = requestAnimationFrame(() => {
          this.raf = null;
          const r = this.getBoundingClientRect();
          const x = e.clientX - (r.left + r.width / 2),
            y = e.clientY - (r.top + r.height * .6);
          const d = Math.hypot(x, y) || 1,
            k = Math.min(1, d / 144);
          this.occhi.forEach(g => g.setAttribute('transform', `translate(${(x / d * 1.6 * k).toFixed(2)} ${(y / d * 1.6 * k).toFixed(2)})`));
          if (this.ago) this.ago.setAttribute('transform', `rotate(${(Math.atan2(y, x) * 180 / Math.PI + 90).toFixed(1)} 72 89)`);
        });
      }
      blinkLoop() {
        if (reduce()) return;
        this.bt = setTimeout(() => {
          const set = (ry, v) => this.shadowRoot.querySelectorAll('[data-occhi] ellipse').forEach(el => el.setAttribute('ry', ry)) || this.shadowRoot.querySelectorAll('[data-luce]').forEach(el => el.style.visibility = v);
          set(.8, 'hidden');
          this.bt2 = setTimeout(() => {
            set(5.5, 'visible');
            this.blinkLoop();
          }, 144);
        }, 2584 + Math.random() * 2584);
      }
      click(e) {
        e.preventDefault();
        e.stopPropagation();
        this.clicks++;
        if (this.clicks >= 7) {
          this.clicks = 0;
          this.bubble(null);
          dispatchEvent(new Event('lab:amdg'));
          return;
        }
        if (this.getAttribute('parla') === 'false') return;
        const i = INFO[this.n];
        this.bubble(this.clicks === 1 ? `Ciao, sono ${i.nome}!` : i.frasi[(this.clicks - 2) % i.frasi.length]);
      }
      bubble(t) {
        this.shadowRoot.querySelector('.b')?.remove();
        clearTimeout(this.mt);
        if (!t) return;
        const b = document.createElement('span');
        b.className = 'b';
        b.textContent = t;
        this.shadowRoot.appendChild(b);
        this.mt = setTimeout(() => b.remove(), 2618);
      }
    }
    customElements.define('lab-mascotte', El);
  })();
}
defineLabMascotte();

/** Year mascot (2D): renders <lab-mascotte>. Eyes follow the cursor, blinks, speaks on click, 7th click → AMDG. */
function YearMascot({
  year = 1,
  size = 55,
  speak = true,
  halo = true,
  still = false
}) {
  const props = {
    anno: String(year),
    size: String(size)
  };
  if (!speak) props.parla = 'false';
  if (!halo) props.aureola = 'false';
  if (still) props.statica = '';
  return React.createElement('lab-mascotte', props);
}
Object.assign(__ds_scope, { YearMascot });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/YearMascot.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
/**
 * Small colour-coded label for content types, categories, and status.
 */
function Badge({
  children,
  variant = 'viola'
}) {
  const palette = {
    viola: {
      bg: 'rgba(139,92,246,.22)',
      color: 'var(--lab-viola-2, #A78BFA)'
    },
    ciano: {
      bg: 'rgba(34,211,238,.22)',
      color: 'var(--lab-ciano, #22D3EE)'
    },
    ambra: {
      bg: 'rgba(251,191,36,.24)',
      color: 'var(--lab-ambra, #FBBF24)'
    },
    rosa: {
      bg: 'rgba(244,114,182,.22)',
      color: 'var(--lab-rosa, #F472B6)'
    },
    verde: {
      bg: 'rgba(52,211,153,.22)',
      color: 'var(--lab-verde, #34D399)'
    },
    rosso: {
      bg: 'rgba(251,113,133,.22)',
      color: 'var(--lab-rosso, #FB7185)'
    }
  };
  const p = palette[variant] ?? palette.viola;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      fontSize: 11.5,
      fontWeight: 800,
      letterSpacing: '.04em',
      textTransform: 'uppercase',
      padding: '4px 11px',
      borderRadius: 8,
      background: p.bg,
      color: p.color,
      fontFamily: 'inherit'
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Pill button with magnetic cursor pull, light sweep and press compression. */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  disabled = false,
  type = 'button'
}) {
  const ref = React.useRef(null);
  const [hov, setHov] = React.useState(false);
  const [down, setDown] = React.useState(false);
  const [off, setOff] = React.useState({
    x: 0,
    y: 0
  });
  const sm = size === 'sm';
  const move = e => {
    if (disabled || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setOff({
      x: (e.clientX - r.left - r.width / 2) * 0.236,
      y: (e.clientY - r.top - r.height / 2) * 0.382
    });
  };
  const leave = () => {
    setHov(false);
    setDown(false);
    setOff({
      x: 0,
      y: 0
    });
  };
  const vars = {
    primary: {
      background: 'var(--lab-grad)',
      color: '#fff',
      boxShadow: hov ? '0 13px 34px -13px rgba(139,92,246,.75)' : '0 8px 21px -13px rgba(139,92,246,.6)'
    },
    ghost: {
      background: 'transparent',
      color: hov ? 'var(--lab-ink)' : 'var(--lab-ink-soft)',
      borderColor: hov ? 'var(--lab-viola)' : 'var(--lab-line)'
    },
    gold: {
      background: 'var(--lab-ambra)',
      color: '#3a2a06',
      boxShadow: hov ? '0 13px 34px -13px rgba(251,191,36,.6)' : 'none'
    },
    solemn: {
      background: 'transparent',
      color: 'var(--lab-oro)',
      borderColor: hov ? 'var(--lab-oro)' : 'color-mix(in srgb, var(--lab-oro) 45%, transparent)',
      fontFamily: 'var(--lab-font-inscription)',
      textTransform: 'uppercase',
      letterSpacing: '.18em',
      fontSize: sm ? 12 : 13,
      fontWeight: 700
    }
  };
  const v = vars[variant] ?? vars.primary;
  const filled = variant === 'primary' || variant === 'gold';
  const style = {
    position: 'relative',
    overflow: 'hidden',
    isolation: 'isolate',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    fontFamily: 'var(--lab-font-body)',
    fontWeight: 700,
    lineHeight: 1,
    letterSpacing: '.01em',
    fontSize: sm ? 13.5 : 15,
    padding: sm ? '8px 13px' : '13px 21px',
    borderRadius: 'var(--lab-radius-pill)',
    border: '1px solid transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    textDecoration: 'none',
    opacity: disabled ? 0.5 : 1,
    transform: `translate(${off.x}px, ${off.y}px) scale(${down ? 0.96 : 1})`,
    transition: `transform ${hov ? 233 : 610}ms var(--lab-ease-out), box-shadow 377ms ease, border-color 377ms ease, color 233ms ease`,
    ...v
  };
  const sweep = filled ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: '38.2%',
      left: hov ? '130%' : '-60%',
      background: 'linear-gradient(100deg, transparent, rgba(255,255,255,.38), transparent)',
      transform: 'skewX(-20deg)',
      transition: hov ? 'left 987ms var(--lab-ease-out)' : 'none',
      zIndex: 0,
      pointerEvents: 'none'
    }
  }) : /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      background: variant === 'solemn' ? 'var(--lab-oro-soft)' : 'rgba(139,92,246,.12)',
      transform: `scaleY(${hov ? 1 : 0})`,
      transformOrigin: 'bottom',
      transition: 'transform 377ms var(--lab-ease-out)',
      zIndex: 0,
      pointerEvents: 'none'
    }
  });
  const evts = {
    ref,
    style,
    onMouseEnter: () => !disabled && setHov(true),
    onMouseMove: move,
    onMouseLeave: leave,
    onMouseDown: () => !disabled && setDown(true),
    onMouseUp: () => setDown(false)
  };
  const inner = /*#__PURE__*/React.createElement(React.Fragment, null, sweep, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      zIndex: 1,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8
    }
  }, children));
  if (href) return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    onClick: onClick
  }, evts), inner);
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    onClick: onClick,
    disabled: disabled
  }, evts), inner);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
/** Content card: subtle 3D tilt toward the cursor plus a light that follows it. */
function Card({
  children,
  style: extra,
  onClick,
  tilt = true,
  glow = 'rgba(139,92,246,.16)'
}) {
  const ref = React.useRef(null);
  const [hov, setHov] = React.useState(false);
  const [down, setDown] = React.useState(false);
  const [p, setP] = React.useState({
    x: 50,
    y: 50
  });
  const move = e => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setP({
      x: (e.clientX - r.left) / r.width * 100,
      y: (e.clientY - r.top) / r.height * 100
    });
  };
  const rx = tilt && hov ? (50 - p.y) / 50 * 2.5 : 0;
  const ry = tilt && hov ? (p.x - 50) / 50 * 2.5 : 0;
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    onClick: onClick,
    onMouseEnter: () => setHov(true),
    onMouseMove: move,
    onMouseLeave: () => {
      setHov(false);
      setDown(false);
    },
    onMouseDown: () => onClick && setDown(true),
    onMouseUp: () => setDown(false),
    style: {
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--lab-surface)',
      border: '1px solid',
      borderColor: hov ? 'color-mix(in srgb, var(--lab-viola) 38%, var(--lab-line))' : 'var(--lab-line)',
      borderRadius: 'var(--lab-radius)',
      padding: 21,
      boxShadow: hov ? 'var(--lab-shadow-lg)' : 'var(--lab-shadow)',
      transform: `perspective(987px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(${hov ? -5 : 0}px) scale(${down ? 0.985 : 1})`,
      transition: hov ? 'transform 144ms linear, box-shadow 377ms ease, border-color 377ms ease' : 'transform 610ms var(--lab-ease-out), box-shadow 377ms ease, border-color 377ms ease',
      cursor: onClick ? 'pointer' : 'default',
      ...extra
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      opacity: hov ? 1 : 0,
      transition: 'opacity 377ms ease',
      background: `radial-gradient(233px circle at ${p.x}% ${p.y}%, ${glow}, transparent 61.8%)`
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1,
      height: '100%'
    }
  }, children));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Chip.jsx
try { (() => {
/** Filter chip / toggle pill with press compression. */
function Chip({
  children,
  active = false,
  onClick
}) {
  const [hov, setHov] = React.useState(false);
  const [down, setDown] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    onMouseEnter: () => setHov(true),
    onMouseLeave: () => {
      setHov(false);
      setDown(false);
    },
    onMouseDown: () => setDown(true),
    onMouseUp: () => setDown(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      fontFamily: 'var(--lab-font-body)',
      fontSize: 13.5,
      fontWeight: 600,
      padding: '8px 13px',
      borderRadius: 'var(--lab-radius-pill)',
      cursor: 'pointer',
      border: '1px solid',
      transform: `scale(${down ? 0.94 : 1}) translateY(${hov && !active ? -2 : 0}px)`,
      transition: 'transform 233ms var(--lab-ease-out), border-color 233ms ease, background 233ms ease, color 233ms ease',
      ...(active ? {
        background: 'var(--lab-ink)',
        borderColor: 'var(--lab-ink)',
        color: 'var(--lab-bg)'
      } : {
        background: 'var(--lab-surface)',
        borderColor: hov ? 'var(--lab-oro)' : 'var(--lab-line)',
        color: hov ? 'var(--lab-ink)' : 'var(--lab-ink-soft)'
      })
    }
  }, children);
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Chip.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Labelled form input — supports text, email, password, number, and textarea.
 */
function Input({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  hint,
  multiline = false,
  rows = 4,
  id,
  required = false
}) {
  const [focused, setFocused] = React.useState(false);
  const inputId = id ?? `lab-input-${Math.random().toString(36).slice(2)}`;
  const fieldStyle = {
    width: '100%',
    fontFamily: 'inherit',
    fontSize: 15,
    color: 'var(--lab-ink, #ECEAF5)',
    background: 'var(--lab-surface-2, #272438)',
    border: '1.5px solid',
    borderColor: focused ? 'var(--lab-viola, #8B5CF6)' : 'var(--lab-line, #322E45)',
    borderRadius: 'var(--lab-radius-sm, 12px)',
    padding: '11px 14px',
    outline: 'none',
    boxShadow: focused ? '0 0 0 3px rgba(139,92,246,.25)' : 'none',
    transition: 'border-color .15s ease, box-shadow .15s ease',
    resize: multiline ? 'vertical' : 'none',
    display: 'block',
    boxSizing: 'border-box'
  };
  const handlers = {
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false)
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 0
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      display: 'block',
      fontWeight: 600,
      fontSize: 14,
      color: 'var(--lab-ink-soft, #C7C3DA)',
      marginBottom: 5
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--lab-rosso)',
      marginLeft: 4
    }
  }, "*")), multiline ? /*#__PURE__*/React.createElement("textarea", _extends({
    id: inputId,
    rows: rows,
    placeholder: placeholder,
    value: value,
    onChange: onChange,
    style: fieldStyle
  }, handlers)) : /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    type: type,
    placeholder: placeholder,
    value: value,
    onChange: onChange,
    required: required,
    style: fieldStyle
  }, handlers)), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: 'var(--lab-muted)',
      marginTop: 4
    }
  }, hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/Nota.jsx
try { (() => {
/**
 * Amber left-bordered informational callout box.
 */
function Nota({
  children,
  icon
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderLeft: '4px solid var(--lab-ambra, #FBBF24)',
      background: 'rgba(251,191,36,.12)',
      borderRadius: '0 var(--lab-radius-sm, 12px) var(--lab-radius-sm, 12px) 0',
      padding: '14px 18px',
      color: 'var(--lab-ink-soft, #C7C3DA)',
      fontSize: 15,
      lineHeight: 1.55,
      display: 'flex',
      gap: 10,
      alignItems: 'flex-start'
    }
  }, icon !== undefined && /*#__PURE__*/React.createElement("span", {
    style: {
      flexShrink: 0,
      fontSize: 16
    }
  }, icon), /*#__PURE__*/React.createElement("div", null, children));
}
Object.assign(__ds_scope, { Nota });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Nota.jsx", error: String((e && e.message) || e) }); }

// components/core/YearCard.jsx
try { (() => {
const COLORS = {
  1: 'var(--lab-anno-1)',
  2: 'var(--lab-anno-2)',
  3: 'var(--lab-anno-3)',
  4: 'var(--lab-anno-4)',
  5: 'var(--lab-anno-5)'
};
const ROMAN = {
  1: 'I',
  2: 'II',
  3: 'III',
  4: 'IV',
  5: 'V'
};

/** School-year card: colour bar, Roman numeral with parallax, cursor light, year mascot. */
function YearCard({
  year = 1,
  name,
  description,
  count,
  href = '#',
  onClick,
  mascot = true
}) {
  const ref = React.useRef(null);
  const [hov, setHov] = React.useState(false);
  const [p, setP] = React.useState({
    x: 50,
    y: 50
  });
  const color = COLORS[year] ?? 'var(--lab-viola)';
  const move = e => {
    const r = ref.current.getBoundingClientRect();
    setP({
      x: (e.clientX - r.left) / r.width * 100,
      y: (e.clientY - r.top) / r.height * 100
    });
  };
  const rx = hov ? (50 - p.y) / 50 * 3 : 0;
  const ry = hov ? (p.x - 50) / 50 * 3 : 0;
  const settle = 'transform 610ms cubic-bezier(.16,1,.3,1)';
  return /*#__PURE__*/React.createElement("a", {
    ref: ref,
    href: href,
    onClick: onClick ? e => {
      e.preventDefault();
      onClick(e);
    } : undefined,
    onMouseEnter: () => setHov(true),
    onMouseMove: move,
    onMouseLeave: () => setHov(false),
    style: {
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 233,
      background: 'var(--lab-surface)',
      border: '1px solid var(--lab-line)',
      borderRadius: 'var(--lab-radius)',
      padding: '34px 21px 21px 34px',
      textDecoration: 'none',
      color: 'var(--lab-ink)',
      boxShadow: hov ? 'var(--lab-shadow-lg)' : 'var(--lab-shadow)',
      transform: `perspective(987px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(${hov ? -8 : 0}px)`,
      transition: hov ? 'transform 144ms linear, box-shadow 377ms ease' : `${settle}, box-shadow 377ms ease`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: hov ? 8 : 5,
      background: color,
      transition: 'width 377ms cubic-bezier(.16,1,.3,1)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      opacity: hov ? 1 : 0,
      transition: 'opacity 377ms ease',
      background: `radial-gradient(233px circle at ${p.x}% ${p.y}%, color-mix(in srgb, ${color} 22%, transparent), transparent 61.8%)`
    }
  }), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      right: -34,
      top: -34,
      width: 144,
      height: 144,
      borderRadius: '50%',
      background: color,
      opacity: hov ? 0.14 : 0.06,
      transform: `scale(${hov ? 1.236 : 1})`,
      transition: '610ms cubic-bezier(.16,1,.3,1)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      fontFamily: 'var(--lab-font-inscription)',
      fontWeight: 600,
      fontSize: 46,
      lineHeight: 1,
      color,
      transform: `translate(${hov ? (p.x - 50) * 0.13 : 0}px, ${hov ? (p.y - 50) * 0.08 : 0}px)`,
      transition: hov ? 'transform 144ms linear' : settle
    }
  }, ROMAN[year] ?? year), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      fontFamily: 'var(--lab-font-display)',
      fontWeight: 600,
      fontSize: 25,
      lineHeight: 1.15,
      marginTop: 13
    }
  }, name), description && /*#__PURE__*/React.createElement("p", {
    style: {
      position: 'relative',
      color: 'var(--lab-muted)',
      fontSize: 14,
      lineHeight: 1.5,
      margin: '8px 0 0',
      flex: 1
    }
  }, description), count != null && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontSize: 11.5,
      fontWeight: 800,
      letterSpacing: '.13em',
      textTransform: 'uppercase',
      color,
      marginTop: 21
    }
  }, count, " contenuti", /*#__PURE__*/React.createElement("span", {
    style: {
      transform: `translateX(${hov ? 5 : 0}px)`,
      opacity: hov ? 1 : 0,
      transition: '377ms cubic-bezier(.16,1,.3,1)'
    }
  }, "\u2192")), mascot && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 8,
      bottom: 8,
      zIndex: 2,
      transform: `translateY(${hov ? -5 : 0}px)`,
      transition: settle
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.YearMascot, {
    year: year,
    size: 55
  })));
}
Object.assign(__ds_scope, { YearCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/YearCard.jsx", error: String((e && e.message) || e) }); }

// components/exam/ExamBadge.jsx
try { (() => {
const CONFIG = {
  bozza: {
    label: 'Bozza',
    bg: '#eee',
    color: '#555'
  },
  pubblicata: {
    label: 'Pubblicata',
    bg: '#e3f2e9',
    color: '#1c7c4a'
  },
  chiusa: {
    label: 'Chiusa',
    bg: '#fbe6e4',
    color: '#b42318'
  },
  corretta: {
    label: 'Corretta',
    bg: '#e3f2e9',
    color: '#1c7c4a'
  },
  consegnata: {
    label: 'Da correggere',
    bg: '#fff4d6',
    color: '#a87c0c'
  },
  in_corso: {
    label: 'In corso',
    bg: 'var(--exam-blu-light, #e8edf9)',
    color: 'var(--exam-blu, #1E3A8A)'
  }
};

/**
 * Exam-platform status pill. Maps lifecycle states to the institutional
 * blue/gold/green/red palette used in the Area Verifiche.
 */
function ExamBadge({
  status
}) {
  const c = CONFIG[status] ?? CONFIG.bozza;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      fontSize: '.72rem',
      fontWeight: 800,
      letterSpacing: '.03em',
      textTransform: 'uppercase',
      padding: '3px 9px',
      borderRadius: 999,
      background: c.bg,
      color: c.color,
      fontFamily: 'inherit'
    }
  }, c.label);
}
Object.assign(__ds_scope, { ExamBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/exam/ExamBadge.jsx", error: String((e && e.message) || e) }); }

// ui_kits/giochi/giochi-dati-2.js
try { (() => {
Object.assign(window.GIOCHI_DATI, {
  quiz: [{
    q: 'Che cosa indica la parola «religiosità»?',
    a: ['Andare a Messa ogni domenica', 'L’apertura dell’uomo alle domande di senso', 'Appartenere a una Chiesa', 'Credere nei miracoli'],
    ok: 1,
    why: 'Viene prima di ogni religione: è la domanda sul senso che ogni persona si porta dentro.'
  }, {
    q: 'Chi ha coniato il termine «agnostico» nel 1869?',
    a: ['Friedrich Nietzsche', 'Blaise Pascal', 'Thomas H. Huxley', 'Tommaso d’Aquino'],
    ok: 2,
    why: 'Il biologo inglese Huxley lo usò per chi ritiene inconoscibile l’esistenza di Dio.'
  }, {
    q: 'Per Feuerbach Dio è…',
    a: ['una proiezione dei desideri dell’uomo', 'il motore immobile', 'la natura stessa', 'una scommessa ragionevole'],
    ok: 0,
    why: 'L’uomo attribuisce a Dio le sue qualità migliori: per Feuerbach la teologia è antropologia.'
  }, {
    q: 'La «scommessa» di Pascal invita a…',
    a: ['non pensarci', 'puntare sull’esistenza di Dio', 'dimostrare Dio con la scienza', 'restare agnostici'],
    ok: 1,
    why: 'Se Dio c’è si guadagna tutto; se non c’è non si perde nulla.'
  }, {
    q: 'Quale di queste frasi è di un teista?',
    a: ['«Non lo sapremo mai»', '«Dio ha creato e poi si è ritirato»', '«Dio mi conosce e mi ama»', '«Dio è tutto ciò che esiste»'],
    ok: 2,
    why: 'Il teista crede in un Dio personale, in relazione con l’uomo.'
  }],
  vf: [{
    s: 'L’agnostico nega l’esistenza di Dio.',
    v: false,
    why: 'Non nega: sospende il giudizio.'
  }, {
    s: 'Il deismo si diffonde con l’Illuminismo.',
    v: true,
    why: 'Voltaire e altri pensano a un Dio «orologiaio» che non interviene.'
  }, {
    s: 'Religiosità e religione sono sinonimi.',
    v: false,
    why: 'La religiosità è la domanda, la religione una risposta organizzata.'
  }, {
    s: '«Dio è morto» è una frase di Nietzsche.',
    v: true,
    why: 'Compare ne «La gaia scienza» (1882).'
  }, {
    s: 'Si può essere atei «pratici» pur dicendosi credenti.',
    v: true,
    why: 'Succede quando la fede non incide sulla vita.'
  }, {
    s: 'Il panteismo crede in un Dio distinto dal mondo.',
    v: false,
    why: 'Per il panteismo Dio e il mondo coincidono.'
  }],
  abbina: [['Teista', 'Dio c’è ed è una Persona'], ['Ateo', 'Dio non c’è'], ['Agnostico', 'Non si può sapere'], ['Deista', 'Dio ha creato, poi si è ritirato'], ['Panteista', 'Dio è tutto ciò che esiste']],
  seq: [{
    t: 'Protagora: «Degli dèi non posso sapere né che sono né che non sono»',
    y: 'V sec. a.C.'
  }, {
    t: 'Tommaso d’Aquino propone le «cinque vie» verso Dio',
    y: 'XIII sec.'
  }, {
    t: 'Pascal scrive la «scommessa» nei Pensieri',
    y: '1670'
  }, {
    t: 'Feuerbach: Dio è proiezione dell’uomo',
    y: '1841'
  }, {
    t: 'Huxley conia la parola «agnostico»',
    y: '1869'
  }, {
    t: 'Nietzsche annuncia «Dio è morto»',
    y: '1882'
  }],
  cat: {
    bins: ['Teista', 'Agnostico', 'Ateo'],
    items: [['Prego perché qualcuno mi ascolta', 0], ['La ragione non basta a decidere', 1], ['L’universo si spiega da solo', 2], ['Dio si è fatto vicino all’uomo', 0], ['Forse sì, forse no: non lo sapremo', 1], ['Dio è un’invenzione umana', 2], ['La vita ha un senso perché è donata', 0], ['Mancano prove in un senso e nell’altro', 1], ['Dopo la morte non c’è nulla', 2]]
  },
  memory: [['Teismo', 'Dio personale'], ['Deismo', 'Dio orologiaio'], ['Agnosticismo', 'Non si può sapere'], ['Ateismo', 'Dio non c’è'], ['Panteismo', 'Dio è tutto'], ['Religiosità', 'Domanda di senso']],
  completa: {
    testo: 'La {religiosità} è l’apertura dell’uomo al mistero. Chi crede in un Dio personale è {teista}; chi nega che Dio esista è {ateo}; chi ritiene che la ragione non possa decidere è {agnostico}. Quest’ultima parola fu coniata da {Huxley} nel 1869.',
    extra: ['deista', 'Nietzsche', 'religione']
  },
  sondaggio: [{
    q: 'Si può essere felici senza Dio?',
    a: ['Sì', 'No', 'Non so', 'Dipende'],
    dibattito: 'Che cosa intendiamo per «felicità»? Basta stare bene?'
  }, {
    q: 'La scienza rende inutile la fede?',
    a: ['Sì', 'No', 'In parte'],
    dibattito: 'Scienza e fede rispondono alle stesse domande?'
  }, {
    q: 'Il dubbio è nemico della fede?',
    a: ['Sì', 'No', 'Non so'],
    dibattito: 'Pensate a un personaggio biblico che ha dubitato.'
  }]
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/giochi/giochi-dati-2.js", error: String((e && e.message) || e) }); }

// ui_kits/giochi/giochi-dati.js
try { (() => {
window.GIOCHI_DATI = {
  tema: 'Religiosità, teisti, agnostici e atei',
  flash: [['Religiosità', 'L’apertura dell’uomo al mistero e alle domande di senso, prima di ogni religione.'], ['Religione', 'La forma organizzata – credenze, riti, comunità – con cui l’uomo si rapporta al divino.'], ['Teismo', 'Fede in un Dio personale e creatore, che si prende cura del mondo.'], ['Deismo', 'Dio esiste e ha creato il mondo, ma non interviene nella storia.'], ['Agnosticismo', 'La ragione non può né dimostrare né negare l’esistenza di Dio.'], ['Ateismo teorico', 'Nega esplicitamente, con argomenti, che Dio esista.'], ['Ateismo pratico', 'Si vive come se Dio non ci fosse, senza porsi la questione.'], ['Panteismo', 'Dio coincide con la natura, con il tutto.']],
  cruci: {
    rows: 8,
    cols: 9,
    words: [{
      n: 1,
      dir: 'v',
      r: 0,
      c: 8,
      w: 'DIO',
      clue: 'L’Essere supremo delle religioni monoteiste'
    }, {
      n: 2,
      dir: 'o',
      r: 2,
      c: 0,
      w: 'AGNOSTICO',
      clue: 'Sospende il giudizio: non si può sapere se Dio esista'
    }, {
      n: 2,
      dir: 'v',
      r: 2,
      c: 0,
      w: 'ATEO',
      clue: 'Nega l’esistenza di Dio'
    }, {
      n: 3,
      dir: 'v',
      r: 2,
      c: 3,
      w: 'SACRO',
      clue: 'Ciò che è separato e riservato al divino'
    }, {
      n: 4,
      dir: 'v',
      r: 2,
      c: 5,
      w: 'TEISTA',
      clue: 'Crede in un Dio personale che ama il mondo'
    }]
  },
  sfida: [{
    q: 'Chi afferma che la ragione non può stabilire se Dio esista?',
    a: ['L’agnostico', 'L’ateo', 'Il teista', 'Il deista'],
    ok: 0
  }, {
    q: 'Il deista crede in un Dio che…',
    a: ['crea il mondo ma non interviene', 'si rivela nella storia', 'coincide con la natura', 'non esiste'],
    ok: 0
  }, {
    q: 'Religiosità e religione sono la stessa cosa.',
    a: ['Vero', 'Falso'],
    ok: 1
  }, {
    q: '«Ateo» viene dal greco a-theos. Significa…',
    a: ['senza Dio', 'contro gli dèi', 'oltre Dio', 'prima di Dio'],
    ok: 0
  }, {
    q: 'Chi vive come se Dio non esistesse, senza negarlo, pratica un ateismo…',
    a: ['teorico', 'pratico', 'militante', 'scientifico'],
    ok: 1
  }, {
    q: 'Il panteismo identifica Dio con…',
    a: ['la ragione', 'la natura, il tutto', 'la comunità', 'nessuna cosa'],
    ok: 1
  }, {
    q: 'Teista è chi…',
    a: ['sospende il giudizio', 'nega Dio', 'crede in un Dio personale', 'crede in molti dèi'],
    ok: 2
  }, {
    q: 'Pascal distingue il «Dio dei filosofi» dal «Dio di Abramo». Cioè…',
    a: ['due religioni diverse', 'politeismo e monoteismo', 'Dio pensato e Dio che si rivela', 'fede e superstizione'],
    ok: 2
  }],
  rifl: {
    domanda: 'Oggi, dove ti collochi?',
    poli: ['Credo', 'Non so', 'Non credo'],
    spunto: 'Che cosa ti fa pensare così? Un’esperienza, una domanda, una persona…'
  }
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/giochi/giochi-dati.js", error: String((e && e.message) || e) }); }

// ui_kits/lezione/lezione-benedetto.js
try { (() => {
/* Classe III · UDA 1 «Luoghi che cambiano la vita» · Lezione 1 — «La misura dei più deboli».
   Versione con gli strumenti nuovi (2 ottobre 2026). Contenuti dal dossier docente/III 1-1 …-contenuti.md.
   Citazioni della Regola: trad. Benedettini di Noci, Edizioni La Scala. Etimologie: Vocabolario Treccani. */
window.LEZIONE = {
  slug: 'iii-1-1-luoghi-che-cambiano-la-vita-regola-di-benedetto',
  classe: 'Anno III',
  titolo: 'La misura dei *più deboli*',
  sottotitolo: 'Perché una comunità si dà una regola: fine, misura e autorità nella Regola di Benedetto.',
  saluto: 'Ultima tappa: a che cosa serve, allora, una regola?',
  glossario: {
    'monastero': {
      etim: 'dal greco *monastḗrion*, da *mónos*, «solo»',
      def: 'La casa dove vivono i monaci. Il nome viene da «solo», eppure nel cenobio si vive insieme: per questo serve una regola.'
    },
    'emina': {
      parola: 'emina',
      etim: 'dal latino *hemina*, greco *hēmína*, «mezza» (metà di un sestario)',
      def: 'Antica misura romana di capacità, circa 0,27 litri.'
    },
    'discrezione': {
      etim: 'dal latino *discretio*, da *discernere*, «distinguere»',
      def: 'Nella Regola, la capacità di dare a ciascuno la misura giusta: «madre di tutte le virtù» (64,19).'
    }
  },
  scene: [{
    fase: 'Aggancio',
    momento: 'Apertura',
    minuti: 4,
    titolo: 'Dodici persone, *una casa*',
    lead: 'Immaginate di vivere in dodici nella stessa casa, per tutta la vita.',
    blocchi: [{
      tipo: 'domanda',
      id: 'ingresso',
      etichetta: 'Anonimo · per alzata di mano',
      q: 'Che cosa decidereste per primo?',
      opzioni: ['Gli orari', 'Chi comanda', 'Come dividere cibo e lavoro', 'Perché stiamo insieme'],
      dibattito: 'Di solito si parte dagli orari. Benedetto, quindici secoli fa, parte dall’ultima risposta: **perché** si sta insieme. Oggi seguiamo il suo ragionamento.'
    }, {
      tipo: 'aggancio',
      etichetta: 'Oggi',
      titolo: 'Anche una regola della vostra scuola si legge così',
      t: 'La circolare del 16 giugno 2025 vieta lo smartphone in orario scolastico, con alcune eccezioni. Prima di chiederci se è giusta, possiamo chiederci **a che cosa serve**.',
      fonte: 'MIM, circolare n. 3392 del 16 giugno 2025'
    }]
  }, {
    fase: 'Scoperta',
    momento: 'Contesto',
    minuti: 5,
    titolo: 'Una vita *in comune*',
    testo: 'Dal IV secolo molti cristiani dedicano la vita alla ricerca di Dio, alcuni da soli, altri insieme. Chi vive con altri deve decidere quando si prega, si lavora, si mangia, chi decide. **Per questo** i {monasteri|monastero} si danno delle regole.',
    blocchi: [{
      tipo: 'parola',
      parola: 'Cenobio',
      radice: 'ceno',
      origine: 'Dal greco koinóbion, attraverso il latino tardo coenobium',
      significato: 'Da *koinós*, «comune», e *bíos*, «vita»: il luogo dove più monaci fanno vita comune sotto la stessa regola.',
      battuta: 'Il nome dice già il problema: vivere insieme.'
    }, {
      tipo: 'tappe',
      voci: [{
        data: 'IV sec.',
        breve: 'Cenobi',
        titolo: 'Le prime comunità',
        testo: 'In Egitto Pacomio organizza i primi {cenobi|cenobio}; in Oriente Basilio di Cesarea scrive regole che valgono ancora oggi.'
      }, {
        data: 'c. 480',
        breve: 'Norcia',
        titolo: 'Nasce Benedetto',
        testo: 'Studia a Roma, poi vive circa tre anni in una grotta sopra Subiaco e organizza alcuni monasteri nella valle dell’Aniene.'
      }, {
        data: '529',
        breve: 'Montecassino',
        titolo: 'Montecassino',
        testo: 'Si trasferisce a Montecassino, dove scrive la Regola e muore nel 547.'
      }, {
        data: 'c. 592',
        breve: 'Gregorio',
        titolo: 'I «Dialoghi»',
        testo: 'Gregorio Magno ne racconta la vita: un racconto spirituale, con miracoli, da non leggere come una cronaca.'
      }]
    }]
  }, {
    fase: 'Scoperta',
    momento: 'Fonte',
    minuti: 5,
    titolo: 'Prima delle norme, *il fine*',
    lead: 'Prima di orari e razioni, la Regola dichiara per che cosa esiste il {monastero}.',
    blocchi: [{
      tipo: 'leggi',
      q: 'Quale parte della frase dà il criterio per giudicare tutte le norme che seguono?',
      testo: '«[[Istituiremo a tale scopo::Annuncia un progetto, ma non dice ancora come giudicare le norme.]] [[una scuola di servizio divino::È il **fine**: imparare a servire Dio, come in una scuola. Dice perché il monastero esiste.]]; e nell’organizzarla speriamo di [[!non programmare nulla di gravoso o d’insopportabile::È il **criterio**: ogni norma si giudica su questo limite. Per questo, più avanti, la misura si calcola sui più deboli.]].»',
      fonte: 'Regola di san Benedetto, Prologo 45-46 (trad. Benedettini di Noci)'
    }, {
      tipo: 'parola',
      parola: 'Regola',
      radice: 'reg',
      origine: 'Dal latino regula, derivato di regere',
      significato: 'Propriamente «guidare diritto». In origine era il **regolo**, l’assicella con cui si tracciano linee diritte; poi è passata a significare «norma».',
      battuta: 'Una riga dritta indica la direzione, ma non cammina al posto tuo.'
    }]
  }, {
    fase: 'Scoperta',
    momento: 'Spiegazione',
    minuti: 5,
    titolo: 'Tre parole da *non confondere*',
    blocchi: [{
      tipo: 'carte',
      carte: [{
        fronte: 'Fine',
        etichetta: 'Perché',
        retro: 'Ciò per cui un gruppo esiste. Nessuna organizzazione, da sola, lo produce.'
      }, {
        fronte: 'Regola',
        etichetta: 'Come',
        retro: 'La misura concreta che rende praticabile il fine ogni giorno: un’ora, una quantità, un limite.'
      }, {
        fronte: 'Efficienza',
        etichetta: 'Quanto',
        retro: 'Il rapporto fra risultato e risorse. Dice quanto bene ottieni qualcosa, non a che cosa serve.'
      }]
    }, {
      tipo: 'verifica',
      q: '«La mensa chiude alle 13.30 per ottimizzare i turni di pulizia.» Che cosa dichiara questa norma?',
      opzioni: ['Un fine della comunità', 'Un criterio di efficienza', 'Una forma di discrezione'],
      ok: 1,
      why: 'Dice come ottenere un risultato con meno risorse, non per che cosa la comunità mangia insieme. Non è sbagliata: semplicemente **non dichiara un fine**.'
    }]
  }, {
    fase: 'Scoperta',
    momento: 'Spiegazione',
    minuti: 5,
    titolo: 'Una misura pensata *sui più deboli*',
    lead: 'Avanzate un passo alla volta: che cosa cambia quando il fine è scritto?',
    blocchi: [{
      tipo: 'animazione',
      id: 'fine',
      rapporto: 1.9,
      attori: [{
        id: 'fine',
        t: 'Il fine',
        forma: 'cerchio',
        colore: 'oro'
      }, {
        id: 'o',
        t: 'Orario',
        forma: 'pillola'
      }, {
        id: 'r',
        t: 'Razione',
        forma: 'pillola'
      }, {
        id: 'l',
        t: 'Lavoro',
        forma: 'pillola'
      }, {
        id: 'deb',
        t: 'Chi fa più fatica',
        forma: 'riquadro',
        colore: 'rosa'
      }],
      frecce: [{
        id: 'f1',
        da: 'fine',
        a: 'o'
      }, {
        id: 'f2',
        da: 'fine',
        a: 'r'
      }, {
        id: 'f3',
        da: 'fine',
        a: 'l'
      }, {
        id: 'd1',
        da: 'deb',
        a: 'r',
        t: 'misura',
        curva: 6
      }, {
        id: 'd2',
        da: 'deb',
        a: 'l',
        curva: -6
      }],
      passi: [{
        didascalia: 'Tre norme, nessuno scopo scritto: **un elenco**. Su che cosa le giudichiamo?',
        attori: {
          o: {
            x: 20,
            y: 34
          },
          r: {
            x: 52,
            y: 70
          },
          l: {
            x: 80,
            y: 30
          }
        }
      }, {
        didascalia: 'La Regola scrive il **fine** prima delle norme: ora ogni norma dipende da una ragione.',
        attori: {
          fine: {
            x: 50,
            y: 20,
            on: true
          },
          o: {
            x: 18,
            y: 62
          },
          r: {
            x: 50,
            y: 66
          },
          l: {
            x: 82,
            y: 62
          }
        },
        frecce: ['f1', 'f2', 'f3']
      }, {
        didascalia: 'Entra **chi fa più fatica**: razione e lavoro si misurano su di lui.',
        attori: {
          fine: {
            on: false
          },
          deb: {
            x: 66,
            y: 88
          },
          r: {
            x: 42,
            y: 60
          },
          l: {
            x: 86,
            y: 54
          }
        },
        frecce: ['f1', 'f2', 'f3', 'd1', 'd2']
      }, {
        didascalia: '«Tenendo presente lo stato di salute dei più deboli» (40,3): **la misura comune è calcolata su chi fa più fatica**, e vale per tutti.',
        attori: {
          deb: {
            on: true
          },
          fine: {
            on: true
          }
        },
        frecce: ['f1', 'f2', 'f3', 'd1', 'd2']
      }]
    }, {
      tipo: 'aggancio',
      etichetta: 'Per capire',
      titolo: 'Quanto vino? Una misura discussa',
      t: 'Il latino dice {hemina|emina}, una misura romana di circa 0,27 litri. Quanto valesse esattamente al tempo di Benedetto è discusso; conta il criterio: la misura parte dai più deboli.',
      fonte: 'Regola 40,3; Vocabolario Treccani, voce «emina»'
    }]
  }, {
    fase: 'Scoperta',
    momento: 'Pausa gioco',
    minuti: 6,
    titolo: 'Fine, regola *o efficienza*?',
    testo: 'Ogni frase va nel suo contenitore. La classe decide, il docente tocca; dopo, confrontiamo le ragioni delle scelte da correggere.',
    blocchi: [{
      tipo: 'mascotte',
      t: 'Un indizio: «efficiente» non vuol dire «sbagliato». Chiedetevi soltanto se la frase **dice a che cosa serve**.'
    }, {
      tipo: 'gioco',
      id: 'cat',
      titolo: 'Smistiamo le frasi',
      testo: 'Dodici frasi, tre contenitori.',
      pulsante: 'Si gioca'
    }]
  }, {
    fase: 'Scoperta',
    momento: 'Spiegazione',
    minuti: 4,
    titolo: 'Anche chi comanda *sta sotto* la Regola',
    testo: 'L’abate fa le veci di Cristo, ma non può comandare nulla contro i comandamenti di Dio (2,4). Consulta tutta la comunità, anche il più giovane (3,3), e segue la Regola come tutti (3,7).',
    blocchi: [{
      tipo: 'parola',
      parola: 'Abate',
      radice: 'ab',
      origine: 'Dal latino tardo abbas, voce di origine aramaica',
      significato: '*Abbà*, «padre». La Regola lo spiega con san Paolo: l’abate è chiamato con il nome di Cristo, «Abbà, Padre!» (2,2-3; Rm 8,15).',
      battuta: 'Un padre, non un padrone: per questo ha dei limiti scritti.'
    }, {
      tipo: 'nota',
      icona: 'ℹ️',
      t: 'Non era una regola mite: prevede castighi (48,17-20) e, per gli ostinati, punizioni corporali (2,28), secondo l’uso del tempo, oggi inaccettabile. La novità è un’altra: **un limite scritto all’arbitrio di chi comanda**.'
    }]
  }, {
    fase: 'Scoperta',
    momento: 'Spiegazione',
    minuti: 4,
    titolo: 'Che cosa è nato *da una regola*',
    blocchi: [{
      tipo: 'catena',
      titolo: 'Dal cercare Dio alla biblioteca',
      anelli: [{
        t: 'Il fine: cercare Dio',
        d: '«Il loro obiettivo era: quaerere Deum» (Benedetto XVI, 2008).',
        senza: 'Senza questo fine resta un’organizzazione del lavoro: niente spinge a leggere e a studiare.'
      }, {
        nesso: 'Ma',
        t: 'Dio parla nella Scrittura',
        d: 'Cercarlo significa ascoltare una Parola scritta.',
        senza: 'Se la ricerca non passa per un testo, i libri non sono necessari.'
      }, {
        nesso: 'Per questo',
        t: 'Bisogna saper leggere',
        d: 'La lettura entra nella giornata: in Quaresima ognuno riceve un libro (48,15).',
        senza: 'Senza lettura, nessuna scuola: il testo resta chiuso.'
      }, {
        nesso: 'Quindi',
        t: 'Biblioteca e scuola fanno parte del monastero',
        d: 'Non per conservare una cultura, ma per cercare Dio: la cultura ne è l’effetto.'
      }],
      fine: 'Effetto, non scopo: è questo il punto.'
    }, {
      tipo: 'aggancio',
      etichetta: 'Con onestà',
      titolo: 'Non fu l’unica strada della cultura antica',
      t: 'La cultura antica passò anche per Bisanzio e per il mondo islamico. E *ora et labora*, che Paolo VI chiama «il suo famoso motto», non compare nel testo della Regola.'
    }, {
      tipo: 'aggancio',
      etichetta: 'Oggi',
      titolo: 'Benedetto, patrono d’Europa',
      t: 'Nel 1964 Paolo VI proclama Benedetto patrono d’Europa per l’impronta che i monasteri hanno lasciato sul continente.',
      fonte: 'Paolo VI, lettera apostolica *Pacis nuntius*, 24 ottobre 1964'
    }]
  }, {
    fase: 'Attività',
    momento: 'Laboratorio',
    minuti: 8,
    titolo: 'Tocca *a voi*',
    blocchi: [{
      tipo: 'varianti',
      opzioni: [{
        nome: 'Il caso della mensa',
        durata: '8 min',
        descrizione: 'Un caso concreto, tre soluzioni: scegliete e guardate che cosa succede.',
        blocchi: [{
          tipo: 'bivio',
          caso: 'Due studenti arrivano in mensa dopo le 13.30: il trasporto accessibile termina il giro più tardi. La mensa chiude alle 13.30 per i turni di pulizia.',
          scelte: [{
            t: 'La regola è uguale per tutti: si chiude alle 13.30',
            esito: 'La norma resta semplice ed efficiente. **Ma** chi ha un bisogno diverso resta senza pasto: la misura uguale tradisce il fine.'
          }, {
            t: 'Si mette da parte un piatto, senza cambiare l’orario',
            esito: 'Il bisogno viene riconosciuto con poca spesa. **Però** i due mangiano da soli: il pasto è garantito, la vita comune no.'
          }, {
            t: 'Un incaricato resta fino alle 14, a rotazione',
            esito: 'Fine e persone tornano al centro. **Resta da verificare** il costo per chi lavora: una soluzione si valuta anche sulle condizioni concrete.'
          }],
          chiusura: 'La Regola chiama questo criterio **{discrezione}**, «madre di tutte le virtù»: ordinare ogni cosa «in modo che i forti desiderino fare di più e i deboli non si scoraggino» (64,19).'
        }]
      }, {
        nome: 'Riscrivere un articolo',
        durata: '8 min',
        descrizione: 'In gruppi: trasformate una norma di efficienza in una norma che dichiara il fine.',
        blocchi: [{
          tipo: 'consegna',
          titolo: 'In gruppi da quattro',
          modalita: 'Gruppi',
          minuti: 6,
          passi: ['Leggete: «La mensa chiude alle 13.30 per ottimizzare i turni di pulizia».', 'Scrivete quale bisogno dovrebbe proteggere.', 'Riscrivete l’articolo in una frase che dichiari il fine.', 'Scegliete chi la legge alla classe.'],
          ruoli: ['Lettore', 'Scrittore', 'Tempo', 'Portavoce'],
          prodotto: 'una frase per gruppo alla lavagna; due minuti di confronto.'
        }]
      }, {
        nome: 'Pesare le ragioni',
        durata: '8 min',
        descrizione: 'La circolare sugli smartphone: mettete gli argomenti sulla bilancia e motivate il peso.',
        blocchi: [{
          tipo: 'bilancia',
          libero: true,
          piatti: ['Divieto', 'Uso educato'],
          argomenti: [{
            t: 'Protegge concentrazione e benessere',
            lato: 0,
            nota: 'È il fine dichiarato dalla circolare, motivato con studi di OCSE, OMS e ISS.'
          }, {
            t: 'Una misura uguale per tutti è più facile da rispettare',
            lato: 0,
            nota: 'Argomento di praticabilità: riguarda la **misura**, non il fine.'
          }, {
            t: 'Un divieto non insegna a usare bene lo strumento',
            lato: 1,
            nota: 'Obiezione seria: colpisce la misura. La circolare stessa chiede di educare a un uso responsabile.'
          }, {
            t: 'Alcuni studenti ne hanno bisogno per imparare',
            lato: 1,
            nota: 'La circolare lo prevede già come eccezione motivata: la misura comune non schiaccia i più fragili.'
          }],
          domanda: 'Gli argomenti di destra contestano il **fine** o la **misura**? Si può condividere uno scopo e discutere il mezzo.'
        }]
      }]
    }]
  }, {
    fase: 'Chiusura',
    momento: 'Prova',
    minuti: 4,
    titolo: 'A che cosa *serve* una regola?',
    blocchi: [{
      tipo: 'ordina',
      q: 'Rimettete in ordine il ragionamento di oggi',
      voci: ['Una comunità ha uno scopo che nessuno, da solo, tiene fermo', 'Per questo scrive il fine prima delle norme', 'Ogni misura si giudica sul fine e su chi fa più fatica', 'Anche chi comanda sta sotto la stessa regola'],
      why: 'Una regola è buona finché rende praticabile il fine anche a chi fa più fatica; quando smette di dire a che cosa serve, diventa soltanto organizzazione.'
    }, {
      tipo: 'verifica',
      etichetta: 'Ultima domanda',
      q: 'Quale di queste norme supera la prova di Benedetto?',
      opzioni: ['«Si lavora otto ore, senza eccezioni, perché rende di più»', '«Chi è malato riceve un lavoro adatto alle sue forze»', '«Decide l’abate, senza consultare nessuno, per fare prima»'],
      ok: 1,
      why: 'È la 48,24-25: la misura si adatta alla persona per non schiacciarla, e il fine resta lo stesso per tutti. Le altre due mettono l’efficienza al posto del fine.'
    }, {
      tipo: 'domanda',
      id: 'uscita',
      confronta: 'ingresso',
      etichetta: 'Di nuovo, a fine lezione',
      q: 'Dodici persone, una casa: che cosa decidereste per primo?',
      opzioni: ['Gli orari', 'Chi comanda', 'Come dividere cibo e lavoro', 'Perché stiamo insieme'],
      dibattito: 'Benedetto parte dal **perché**. Se il voto si è spostato, chiedete a chi ha cambiato idea che cosa l’ha convinto.'
    }]
  }],
  studio: {
    "sezioni": [{
      "titolo": "La domanda",
      "testo": "La circolare del 16 giugno 2025 prevede il divieto dello smartphone durante l’orario scolastico, con alcune eccezioni. Prima di chiederci se la norma sia giusta, possiamo chiederci a che cosa serva: una misura comune si condivide, o almeno si discute, solo quando se ne conosce lo scopo. Un testo del VI secolo, la Regola di Benedetto, permette di porre la domanda dall’inizio: perché una comunità si dà una regola?"
    }, {
      "titolo": "Una vita in comune ha bisogno di una regola",
      "testo": "Dal IV secolo molti cristiani dedicano la vita alla ricerca di Dio. Alcuni vivono da soli, gli anacoreti; altri insieme, in un **cenobio**, dal greco *koinóbion*: *koinós*, «comune», e *bíos*, «vita». Chi vive con altri deve stabilire quando si prega, quando si lavora, quanto si mangia, chi decide. **Per questo** i cenobi si danno delle regole. Per Basilio di Cesarea la regola non serve a opprimere: serve perché nessuno, da solo, tiene fermo uno scopo così alto.\n\nIn Italia, all’inizio del VI secolo, circola la *Regola del Maestro*, anonima, che la maggior parte degli studiosi considera la fonte di Benedetto: i primi sette capitoli la riprendono quasi alla lettera, la parte organizzativa con libertà, gli ultimi sei sono propri. Benedetto nasce a Norcia verso il 480, vive a Subiaco e dal 529 a Montecassino, dove muore nel 547. Quasi tutto ciò che sappiamo di lui viene dai *Dialoghi* di Gregorio Magno (verso il 592), un racconto spirituale da non leggere come una cronaca."
    }, {
      "titolo": "Il fine scritto prima delle norme",
      "testo": "**Quindi** la Regola dichiara il fine prima delle norme: «Istituiremo a tale scopo una scuola di servizio divino; e nell’organizzarla speriamo di non programmare nulla di gravoso o d’insopportabile» (Prol. 45-46). *Regola* viene dal latino *regula*, da *regere*, «guidare diritto»: in origine era il regolo, l’assicella per tracciare linee diritte.\n\nServono tre parole distinte. Il **fine** è ciò per cui un gruppo esiste. La **regola** è la misura concreta che lo rende praticabile ogni giorno. L’**efficienza** è il rapporto fra risultato e risorse: dice quanto bene si ottiene qualcosa, non a che cosa serva. Non è un male, ma sbaglia quando prende il posto del fine."
    }, {
      "titolo": "Una misura pensata su chi fa più fatica",
      "testo": "**Ne segue che** ogni norma si misura sul fine. Il capitolo 48 divide la giornata fra lavoro e *lectio divina* (da Pasqua al 1° ottobre prima il lavoro, poi l’ordine si rovescia), ma aggiunge: «Tutto però si faccia con moderazione, tenendo presente chi è di costituzione debole» (48,9). Nel lavoro, ai fratelli malati o gracili viene assegnato un compito adatto alle loro forze (48,24-25): non esiste una misura identica per ogni attività e ogni persona. La razione di vino è calcolata «tenendo presente lo stato di salute dei più deboli» (40,3); il latino dice *hemina*, una misura romana di circa 0,27 litri, e la quantità esatta del tempo di Benedetto è discussa. L’ospite va accolto «come Cristo in persona» (53,1, con Mt 25,35), soprattutto se povero o pellegrino (53,15), con una cucina separata perché la comunità non sia disturbata (53,16). I prodotti del monastero si vendono «a un prezzo più basso di quello usato dai secolari, affinché in tutto sia glorificato Dio» (57,8-9)."
    }, {
      "titolo": "Anche chi comanda sta sotto la Regola",
      "testo": "**Per questo** anche l’autorità ha dei limiti. *Abate* viene dal latino tardo *abbas*, di origine aramaica: *abbà*, «padre» (2,2-3; Rm 8,15). L’abate «non deve insegnare, stabilire o comandare nulla che sia contrario ai comandamenti di Dio» (2,4); consulta tutta la comunità, perché «spesso è al più giovane che Dio rivela la soluzione migliore» (3,3); e segue la Regola come tutti (3,7). La **discrezione**, «madre di tutte le virtù», regola ogni cosa «in modo che i forti desiderino fare di più e i deboli non si scoraggino» (64,19). La Regola non era mite: prevede castighi (48,17-20) e, per gli ostinati, punizioni corporali (2,28), secondo l’uso del tempo, oggi inaccettabile."
    }, {
      "titolo": "Che cosa è nato da una regola",
      "testo": "**Quindi** da questa forma di vita nasce un’istituzione. Per Benedetto XVI (Collège des Bernardins, 2008) i monaci non volevano creare né conservare una cultura: «Il loro obiettivo era: quaerere Deum, cercare Dio». Ma cercare Dio nella Scrittura richiede di saper leggere, e per questo nel monastero ci sono la biblioteca e la scuola. Nello stesso discorso ricorda che nel mondo greco il lavoro fisico era considerato cosa da servi, mentre per il monachesimo «il lavoro manuale è parte costitutiva». Nel 1964 Paolo VI proclama Benedetto patrono d’Europa (*Pacis nuntius*).\n\n**Eppure** i monasteri non furono l’unica via di trasmissione della cultura antica, che passò anche per Bisanzio e per il mondo islamico; e *ora et labora*, che Paolo VI chiama «il suo famoso motto», non compare nel testo della Regola."
    }, {
      "titolo": "Una regola di oggi",
      "testo": "La circolare del Ministero n. 3392 del 16 giugno 2025 vieta lo smartphone in orario scolastico, «anche a fini didattici». Il fine dichiarato è la salute e il benessere degli adolescenti e i loro risultati scolastici; la misura è un divieto uguale per tutti; le eccezioni comprendono motivate necessità personali e, a precise condizioni del progetto formativo, gli indirizzi tecnici dedicati a informatica e telecomunicazioni. Si può obiettare che un divieto non insegna da solo a usare bene uno strumento: l’obiezione colpisce la misura, non il fine, e la circolare stessa chiede di educare a un uso responsabile."
    }, {
      "titolo": "La risposta",
      "testo": "Una comunità si dà una regola quando ha uno scopo che non raggiunge per caso e che nessuno, da solo, tiene fermo. La regola ne è la misura quotidiana, ed è buona finché lo rende praticabile anche a chi fa più fatica; quando smette di dire a che cosa serve, diventa soltanto un’organizzazione."
    }],
    "fonti": ["*San Benedetto, Regola*, traduzione italiana in lingua corrente a cura dei Benedettini di Noci (Bari), Edizioni La Scala: Prologo 45-46; capp. 2, 3, 40, 48, 53, 57, 64, 73.", "A. de Vogüé, «Regula Benedicti», in *Dizionario degli Istituti di Perfezione*, vol. II, coll. 1555-1564.", "Benedetto XVI, Udienza generale del 9 aprile 2008; Discorso al Collège des Bernardins, 12 settembre 2008, vatican.va.", "Paolo VI, lettera apostolica *Pacis nuntius*, 24 ottobre 1964, vatican.va.", "*Vocabolario Treccani*, voci «regola», «abate», «cenobio», «emina».", "Ministero dell’Istruzione e del Merito, circolare 16 giugno 2025, n. 3392; testo originale nell’allegato dell’USR Emilia-Romagna, verificato il 1 ottobre 2026: https://www.istruzioneer.gov.it/2025/06/17/disposizioni-in-merito-allutilizzo-degli-smartphone-nel-ii-ciclo-di-istruzione/?download=61618"]
  },
  giochi: {
    "cat": {
      "bins": ["Fine", "Regola", "Efficienza"],
      "items": [["Una scuola di servizio divino", 0], ["Da Pasqua al 1° ottobre si lavora fin verso le dieci", 1], ["Un solo turno di mensa costa meno di due", 2], ["Accogliere l’ospite come Cristo", 0], ["Una razione di vino fissata per ogni fratello", 1], ["Più ore di lavoro producono più raccolto", 2], ["In Quaresima ciascuno riceve un libro da leggere per intero", 1], ["Decidere senza consultare fa risparmiare tempo", 2], ["Che in tutto sia glorificato Dio", 0], ["Due fratelli incaricati della cucina degli ospiti", 1], ["Produrre la stessa quantità usando meno risorse", 2], ["Custodire la carità fra i fratelli", 0]]
    },
    "vf": [{
      "s": "Benedetto inventa il monachesimo.",
      "v": false,
      "why": "Esisteva da due secoli in Oriente, e in Italia circolavano altre regole, come quella del Maestro."
    }, {
      "s": "Dal 1° ottobre la Regola mette la lettura prima del lavoro.",
      "v": true,
      "why": "Le giornate sono più corte e l’ordine si rovescia (48,10-11)."
    }, {
      "s": "Per la Regola l’ospite è un disturbo da contenere.",
      "v": false,
      "why": "Va accolto «come Cristo in persona» (53,1); la cucina separata serve a organizzare l’accoglienza, non a evitarla."
    }, {
      "s": "La Regola vincola anche l’abate.",
      "v": true,
      "why": "«In ogni cosa tutti seguano la Regola come maestra» (3,7), e l’abate renderà conto di ogni decisione (3,11)."
    }, {
      "s": "La Regola non prevede punizioni.",
      "v": false,
      "why": "Prevede controlli e castighi (48,17-20), anche corporali per gli ostinati (2,28), secondo l’uso del tempo."
    }, {
      "s": "«Ora et labora» è una frase della Regola.",
      "v": false,
      "why": "Non compare nel testo: è il motto con cui la tradizione ne riassume lo spirito. Paolo VI lo chiama «il suo famoso motto»."
    }, {
      "s": "Per Benedetto XVI i monaci volevano soprattutto conservare la cultura antica.",
      "v": false,
      "why": "Il loro obiettivo era «quaerere Deum, cercare Dio»: biblioteca e scuola ne furono l’effetto."
    }],
    "seq": [{
      "t": "Nascono i primi cenobi in Egitto e in Oriente",
      "y": "IV sec."
    }, {
      "t": "Benedetto nasce a Norcia",
      "y": "c. 480"
    }, {
      "t": "Si trasferisce a Montecassino",
      "y": "529"
    }, {
      "t": "Muore a Montecassino",
      "y": "547"
    }, {
      "t": "Gregorio Magno scrive i Dialoghi",
      "y": "c. 592"
    }, {
      "t": "Paolo VI lo proclama patrono d’Europa",
      "y": "1964"
    }],
    "quiz": [{
      "q": "Da dove vengono quasi tutte le notizie sulla vita di Benedetto?",
      "a": ["Dalla Regola stessa", "Dai Dialoghi di Gregorio Magno", "Da un diario di Montecassino", "Da una cronaca romana"],
      "ok": 1,
      "why": "Il secondo libro dei Dialoghi (verso il 592) è un racconto spirituale: va letto per il suo genere, non come una cronaca."
    }, {
      "q": "Che cos’è la «Regola del Maestro»?",
      "a": ["Una regola più tarda che copia Benedetto", "Il nome antico della Regola di Benedetto", "Un testo anonimo più lungo, usato da Benedetto come fonte", "Una regola scritta da Gregorio Magno"],
      "ok": 2,
      "why": "Per la maggior parte degli studiosi è precedente: Benedetto la seleziona, la accorcia e la corregge."
    }, {
      "q": "La parola «cenobio» significa…",
      "a": ["vita in comune", "casa di preghiera", "luogo isolato", "scuola di lettura"],
      "ok": 0,
      "why": "Dal greco koinós, «comune», e bíos, «vita»: il nome stesso dice perché serve una regola."
    }, {
      "q": "In 40,3 la razione di vino è calcolata…",
      "a": ["sulla media della comunità", "sui più deboli", "sui più robusti", "sul prezzo del vino"],
      "ok": 1,
      "why": "La misura è pensata su chi fa più fatica e vale per tutti; l’abate può aumentarla per clima o lavoro."
    }, {
      "q": "«Abate» viene da una parola aramaica che significa…",
      "a": ["maestro", "custode", "anziano", "padre"],
      "ok": 3,
      "why": "Abbà, «padre»: un padre, non un padrone. Per questo l’abate non può comandare nulla contro i comandamenti di Dio (2,4)."
    }, {
      "q": "Perché i monasteri vendono a un prezzo più basso di quello comune (57,8-9)?",
      "a": ["Per battere la concorrenza", "Perché i prodotti erano peggiori", "Affinché in tutto sia glorificato Dio", "Per ordine del vescovo"],
      "ok": 2,
      "why": "Il testo subordina il prezzo al fine religioso dichiarato. Il prezzo da solo non misura l’efficienza: per quella occorrono anche dati su risultati e risorse."
    }]
  }
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/lezione/lezione-benedetto.js", error: String((e && e.message) || e) }); }

// ui_kits/lezione/lezione-religiosita.js
try { (() => {
/* Lezione d'esempio del kit — Anno III · «Religiosità, teisti, agnostici e atei» (50 minuti, 4 fasi).
   Formato: window.LEZIONE = { titolo, scene: [{ fase, momento, minuti, titolo, lead, testo, blocchi: [...] }], glossario, studio }.
   Parole nuove: {parola} o {forma|lemma} in qualunque testo → fumetto con etimologia + Glossario automatico. */
window.LEZIONE = {
  slug: 'iii-religiosita-teisti-agnostici-atei',
  classe: 'Anno III',
  titolo: 'Religiosità, teisti, *agnostici* e atei',
  sottotitolo: 'Davanti alla domanda su Dio le persone prendono strade diverse. Oggi diamo un nome a queste strade, e scopriamo dove siamo noi.',
  saluto: 'Ultima tappa: che cosa portate a casa?',
  glossario: {
    'religiosità': {
      etim: 'dal latino *religio*',
      def: 'L’apertura dell’uomo al mistero e alle grandi domande sul senso della vita. Viene prima di ogni religione.'
    },
    'mistero': {
      etim: 'dal greco *mystḗrion*, da *mýein*, «chiudere (occhi e bocca)»',
      def: 'Ciò che supera la nostra comprensione: non un enigma da risolvere, ma una realtà così grande che non si finisce mai di conoscere.'
    },
    'memoriale': {
      parola: 'Memoriale',
      etim: 'dal latino *memoriale*, da *memor*, «che ricorda»',
      def: 'Il foglietto su cui Pascal scrisse la sua esperienza di fede della notte del 23 novembre 1654. Lo tenne cucito nella giacca per tutta la vita.'
    },
    'rivelare': {
      etim: 'dal latino *re-velare*, «togliere il velo»',
      def: 'Nella fede cristiana, Dio si fa conoscere all’uomo per primo, mostrando chi è.'
    }
  },
  scene: [{
    fase: 'Aggancio',
    momento: 'Religione Cattolica · Anno III',
    minuti: 2,
    titolo: 'Religiosità, teisti, *agnostici* e atei',
    lead: 'Davanti alla domanda su Dio le persone prendono strade diverse. Oggi diamo un nome a queste strade, e scopriamo dove siamo noi.',
    blocchi: [{
      tipo: 'agenda'
    }]
  }, {
    fase: 'Aggancio',
    momento: 'Sondaggio d’ingresso',
    minuti: 3,
    titolo: 'Una domanda *per cominciare*',
    blocchi: [{
      tipo: 'domanda',
      id: 'ingresso',
      etichetta: 'Anonimo · per alzata di mano',
      q: 'Si può essere felici senza Dio?',
      opzioni: ['Sì', 'No', 'Non so', 'Dipende']
    }]
  }, {
    fase: 'Aggancio',
    momento: 'Nuvola di parole',
    minuti: 3,
    titolo: 'Se dico *«Dio»*…',
    blocchi: [{
      tipo: 'nuvola',
      id: 'dio',
      q: 'Che parola vi viene in mente?',
      semi: ['mistero', 'padre', 'amore', 'domanda', 'paura', 'creatore', 'niente', 'mistero', 'fede', 'amore']
    }]
  }, {
    fase: 'Scoperta',
    momento: 'Parola chiave',
    minuti: 5,
    titolo: 'Una domanda *prima* di ogni religione',
    testo: 'La {religiosità} è l’apertura dell’uomo al {mistero} e alle domande di senso. Viene prima di ogni religione: credenti e non credenti se la portano dentro.',
    blocchi: [{
      tipo: 'etimo',
      parola: 'religione',
      etim: 'dal latino *religio*: da *re-ligare* o da *re-legere*',
      def: 'Il legame fra l’uomo e Dio, vissuto con parole, gesti e una comunità.',
      parti: [{
        t: 'religio',
        d: 'latino: scrupolo, legame sacro'
      }, {
        t: 're-ligare',
        d: '«legare di nuovo» (Lattanzio)'
      }, {
        t: 're-legere',
        d: '«rileggere con cura» (Cicerone)'
      }],
      nessi: ['→', 'o'],
      spiegazione: 'Due spiegazioni antiche: la religione è un **legame** fra l’uomo e Dio, oppure l’**attenzione** con cui si rilegge ciò che riguarda Dio.'
    }, {
      tipo: 'carte',
      carte: [{
        fronte: 'Da dove vengo?',
        etichetta: 'L’origine',
        retro: 'La vita è un caso o un dono?'
      }, {
        fronte: 'Chi sono?',
        etichetta: 'L’identità',
        retro: 'Che cosa mi rende davvero me?'
      }, {
        fronte: 'Dove vado?',
        etichetta: 'Il destino',
        retro: 'La morte è la fine di tutto?'
      }]
    }, {
      tipo: 'immagine',
      alt: 'Viandante sul mare di nebbia · Caspar David Friedrich, 1818',
      didascalia: '*Viandante sul mare di nebbia*, Caspar David Friedrich, 1818. Che cosa starà pensando?'
    }]
  }, {
    fase: 'Scoperta',
    momento: 'Quattro risposte',
    minuti: 6,
    titolo: 'Come si risponde alla *domanda su Dio*?',
    lead: 'Tre risposte stanno sulla stessa linea; una ne resta fuori.',
    blocchi: [{
      tipo: 'spettro',
      poli: ['Dio c’è', 'Non si può sapere', 'Dio non c’è'],
      punti: [{
        t: 'Teista',
        x: 6,
        etim: 'dal greco *theós*, «Dio»',
        def: 'Crede in un Dio personale, creatore, che si prende cura del mondo e si può incontrare.',
        es: '«Credo in Dio, Padre onnipotente, creatore del cielo e della terra.»'
      }, {
        t: 'Agnostico',
        x: 50,
        etim: 'dal greco *a-*, «non», e *gnōstós*, «conoscibile»: parola coniata da T. H. Huxley nel 1869',
        def: 'Sospende il giudizio: pensa che con la ragione non si possa sapere se Dio esiste o no.',
        es: '«Forse c’è, forse no: non lo posso sapere.»'
      }, {
        t: 'Ateo',
        x: 94,
        etim: 'dal greco *á-theos*, «senza Dio»',
        def: 'Nega l’esistenza di Dio: il mondo si spiega da solo, senza un creatore.',
        es: '«Dio non esiste: è un’invenzione dell’uomo.»'
      }, {
        t: 'Indifferente',
        x: 50,
        fuori: true,
        etim: 'dal latino *in-*, «non», e *differre*, «fare differenza»',
        def: 'Non si pone la domanda: la questione di Dio non lo interessa. Per questo sta fuori dalla linea: non risponde né sì né no.',
        es: '«Dio? Non ci ho mai pensato, e non mi cambia la vita.»'
      }]
    }]
  }, {
    fase: 'Scoperta',
    momento: 'Chi lo dice?',
    minuti: 5,
    titolo: 'Di quale posizione è *ogni frase*?',
    blocchi: [{
      tipo: 'chi',
      opzioni: ['Teista', 'Agnostico', 'Ateo'],
      frasi: [{
        t: '«Ci hai fatti per te, e il nostro cuore è inquieto finché non riposa in te.»',
        chi: 'Agostino d’Ippona · Confessioni',
        ok: 0,
        why: 'Per Agostino Dio è l’approdo del cuore umano: è la voce di chi crede.'
      }, {
        t: '«Degli dèi non posso sapere né che esistono né che non esistono.»',
        chi: 'Protagora · V secolo a.C.',
        ok: 1,
        why: 'È una delle prime formulazioni di ciò che oggi chiamiamo agnosticismo: il giudizio resta sospeso.'
      }, {
        t: '«Dio è morto! E noi l’abbiamo ucciso!»',
        chi: 'Friedrich Nietzsche · La gaia scienza',
        ok: 2,
        why: 'Lo grida l’«uomo folle» del racconto: Nietzsche descrive una cultura che ha smesso di credere.'
      }]
    }]
  }, {
    fase: 'Scoperta',
    momento: 'Una fonte · 23 novembre 1654',
    minuti: 4,
    titolo: 'Il Dio *dei filosofi* e il Dio di Abramo',
    blocchi: [{
      tipo: 'citazione',
      testo: 'Dio di Abramo, Dio di Isacco, Dio di Giacobbe, non dei filosofi e dei sapienti.',
      fonte: 'Blaise Pascal, Memoriale',
      pulsante: 'Che cosa ci sta dicendo?',
      commento: 'Pascal scrive queste righe su un foglietto, il {Memoriale|memoriale}, e lo tiene cucito nella giacca per tutta la vita: per lui Dio non è soltanto un’idea, ma **Qualcuno che si incontra**.'
    }, {
      tipo: 'confronto',
      a: 'Il Dio dei filosofi',
      b: 'Il Dio di Abramo',
      righe: [{
        criterio: 'Come lo si conosce',
        a: 'Un’idea a cui si arriva ragionando',
        b: 'Qualcuno che si {rivela|rivelare} e chiama per nome'
      }, {
        criterio: 'Dove lo si trova',
        a: 'La «prima causa» del mondo',
        b: 'Dentro la storia di un popolo'
      }, {
        criterio: 'Che cosa chiede',
        a: 'Si dimostra, ma resta lontano',
        b: 'Non si dimostra: si incontra'
      }]
    }]
  }, {
    fase: 'Attività',
    momento: 'A coppie',
    minuti: 6,
    titolo: 'Che cosa *gli rispondereste*?',
    lead: 'Un amico vi dice: «Non sono sicuro che Dio esista, ma ogni tanto me lo chiedo».',
    blocchi: [{
      tipo: 'consegna',
      titolo: 'A coppie, tre minuti',
      modalita: 'Coppie',
      minuti: 3,
      passi: ['Che posizione è la sua?', 'Che cosa gli rispondereste?', 'Scegliete una frase da dire alla classe.'],
      prodotto: 'una frase per coppia, letta ad alta voce.',
      fine: 'Tempo! Chi vuole condividere?'
    }]
  }, {
    fase: 'Attività',
    momento: 'Verifica lampo',
    minuti: 5,
    titolo: 'Tre domande, *tre stelle*',
    blocchi: [{
      tipo: 'quiz',
      domande: [{
        q: 'Chi «sospende il giudizio» sull’esistenza di Dio è…',
        opzioni: ['ateo', 'agnostico', 'teista'],
        ok: 1,
        why: 'Non afferma e non nega: pensa che la domanda resti senza una risposta certa.'
      }, {
        q: 'La religiosità…',
        opzioni: ['riguarda solo chi va in chiesa', 'è nata con il cristianesimo', 'è una domanda di senso di ogni persona'],
        ok: 2,
        why: 'Viene prima di ogni religione: anche chi non crede se la pone.'
      }, {
        q: 'Per Pascal il «Dio di Abramo» è un Dio che…',
        opzioni: ['si rivela e si incontra', 'si dimostra con la logica', 'non si interessa del mondo'],
        ok: 0,
        why: 'Non è soltanto un’idea: è Qualcuno che entra nella storia.'
      }]
    }]
  }, {
    fase: 'Attività',
    momento: 'Sondaggio d’uscita',
    minuti: 3,
    titolo: 'Avete *cambiato idea*?',
    blocchi: [{
      tipo: 'domanda',
      id: 'uscita',
      confronta: 'ingresso',
      etichetta: 'Anonimo · la stessa domanda dell’inizio',
      q: 'Si può essere felici senza Dio?',
      opzioni: ['Sì', 'No', 'Non so', 'Dipende'],
      dibattito: 'Che cosa ha fatto cambiare idea a qualcuno? E che cosa, invece, è rimasto fermo?'
    }]
  }, {
    fase: 'Chiusura',
    momento: 'Che cosa porto a casa',
    minuti: 5,
    titolo: 'Tre idee *da ricordare*',
    blocchi: [{
      tipo: 'idee',
      idee: ['La {religiosità} è una domanda che tutti si portano dentro, prima di ogni religione.', 'Teista, agnostico e ateo danno tre risposte diverse alla stessa domanda; l’indifferente non se la pone.', 'Per la fede cristiana Dio non è solo un’idea da dimostrare: è Qualcuno che si incontra.']
    }]
  }, {
    fase: 'Chiusura',
    momento: 'Per continuare',
    minuti: 3,
    titolo: 'Fissiamo quello che *abbiamo scoperto*',
    blocchi: [{
      tipo: 'continua',
      voci: [{
        t: 'Ripassate con i giochi',
        d: 'Quiz, memory, cruciverba e sfida a squadre su questa lezione.',
        vai: 'giochi',
        principale: true
      }, {
        t: 'Per casa',
        d: 'In tre righe: oggi dove vi collocate sulla linea, e perché?'
      }, {
        t: 'Da capo',
        d: 'Tornate all’inizio della lezione.',
        vai: 'inizio'
      }]
    }]
  }],
  studio: {
    sezioni: [{
      titolo: 'La domanda',
      testo: 'Si può essere felici senza Dio? La domanda divide, ma prima ancora unisce: chiunque se la pone sta già cercando un senso. Per rispondere bisogna dare un nome alle strade che le persone prendono davanti a Dio.'
    }, {
      titolo: 'La religiosità',
      testo: 'La {religiosità} è l’apertura dell’uomo al {mistero} e alle domande di senso: da dove vengo, chi sono, dove vado. Viene **prima** di ogni religione, e per questo riguarda credenti e non credenti.\n\nLa parola *religione* viene dal latino *religio*. Gli antichi la spiegavano in due modi: Lattanzio da *re-ligare*, «legare di nuovo», cioè un legame fra l’uomo e Dio; Cicerone da *re-legere*, «rileggere con cura», cioè l’attenzione con cui si torna su ciò che riguarda Dio.'
    }, {
      titolo: 'Quattro posizioni',
      testo: 'Il **teista** (dal greco *theós*, «Dio») crede in un Dio personale e creatore. L’**agnostico** (*a-gnōstós*, «non conoscibile»; la parola è di T. H. Huxley, 1869) sospende il giudizio: con la ragione, pensa, non si può sapere. L’**ateo** (*á-theos*, «senza Dio») nega che Dio esista. L’**indifferente** non si pone la domanda: per questo non sta sulla stessa linea delle altre tre posizioni.'
    }, {
      titolo: 'Il Dio dei filosofi e il Dio di Abramo',
      testo: 'La notte del 23 novembre 1654 Blaise Pascal scrive su un foglietto, il {Memoriale|memoriale}: «Dio di Abramo, Dio di Isacco, Dio di Giacobbe, non dei filosofi e dei sapienti». **Per questo** distingue due modi di pensare Dio: un’idea a cui si arriva ragionando, la «prima causa» del mondo, oppure Qualcuno che si {rivela|rivelare}, entra nella storia di un popolo e chiama per nome. Il primo si dimostra; il secondo si incontra.'
    }, {
      titolo: 'Per ricordare',
      testo: 'La religiosità è una domanda di tutti. Teista, agnostico e ateo rispondono in modi diversi alla stessa domanda; l’indifferente non se la pone. Per la fede cristiana Dio non è soltanto un’idea da dimostrare, ma Qualcuno da incontrare.'
    }],
    fonti: ['Blaise Pascal, *Memoriale* (23 novembre 1654).', 'Agostino d’Ippona, *Confessioni* I, 1.', 'Protagora, frammento sugli dèi (Diels-Kranz 80 B 4).', 'Friedrich Nietzsche, *La gaia scienza*, § 125.', 'Lattanzio, *Divinae institutiones* IV, 28; Cicerone, *De natura deorum* II, 72.', '*Vocabolario Treccani*, voci «religione», «agnostico», «ateo», «teismo», «mistero».']
  }
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/lezione/lezione-religiosita.js", error: String((e && e.message) || e) }); }

__ds_ns.Amdg = __ds_scope.Amdg;

__ds_ns.AmdgEgg = __ds_scope.AmdgEgg;

__ds_ns.YearMascot = __ds_scope.YearMascot;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Nota = __ds_scope.Nota;

__ds_ns.YearCard = __ds_scope.YearCard;

__ds_ns.ExamBadge = __ds_scope.ExamBadge;

})();
