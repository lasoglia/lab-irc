/* admin/lucchetto.js — il lucchetto dei giochi di verifica.

   Un gioco «chiuso» è una pagina che chiede la password del giorno, con dentro il gioco
   cifrato (AES-GCM). La password cambia ogni giorno con la regola del docente:

       password = giorno × mese + numero segreto        (es. 25/10, segreto 137 → 387)

   Il numero segreto resta sul computer del docente: qui si preparano, una volta sola, le
   serrature di tutti i giorni fino alla fine dell'anno scolastico. Ogni serratura custodisce
   la chiave del gioco, cifrata con una chiave ricavata (PBKDF2) dalla password di quel giorno.
   La pagina dello studente legge la data dal server del sito, non dall'orologio del telefono,
   e prova solo la serratura di oggi.

   Usato da admin/importa.html. Espone window.LabLucchetto. */
(function () {
  'use strict';
  var ITERAZIONI = 100000;
  var enc = new TextEncoder(), dec = new TextDecoder();

  function b64(u8) {
    var s = '', passo = 0x8000;
    for (var i = 0; i < u8.length; i += passo) s += String.fromCharCode.apply(null, u8.subarray(i, i + passo));
    return btoa(s);
  }
  function daB64(s) { var b = atob(s), u = new Uint8Array(b.length); for (var i = 0; i < b.length; i++) u[i] = b.charCodeAt(i); return u; }
  function casuali(n) { return crypto.getRandomValues(new Uint8Array(n)); }
  function iso(a, m, g) { return a + '-' + String(m).padStart(2, '0') + '-' + String(g).padStart(2, '0'); }

  /* la data di oggi in Italia, qualunque sia il fuso del computer */
  function oggiInItalia(d) {
    var p = {};
    new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Rome', year: 'numeric', month: '2-digit', day: '2-digit' })
      .formatToParts(d || new Date()).forEach(function (x) { p[x.type] = x.value; });
    return { a: +p.year, m: +p.month, g: +p.day };
  }

  function passwordDelGiorno(g, m, segreto) { return String(g * m + Number(segreto)); }

  /* dal giorno di oggi al 31 agosto (fine dell'anno scolastico); se mancano meno di 60 giorni,
     fino al 31 agosto dell'anno dopo */
  function giorniDaPreparare(oggi) {
    var inizio = new Date(Date.UTC(oggi.a, oggi.m - 1, oggi.g));
    var fine = new Date(Date.UTC(oggi.m >= 9 ? oggi.a + 1 : oggi.a, 7, 31));
    if ((fine - inizio) / 864e5 < 60) fine = new Date(Date.UTC(fine.getUTCFullYear() + 1, 7, 31));
    var out = [];
    for (var d = inizio; d <= fine; d = new Date(d.getTime() + 864e5)) out.push({ a: d.getUTCFullYear(), m: d.getUTCMonth() + 1, g: d.getUTCDate() });
    return out;
  }

  function chiaveDa(password, sale, uso) {
    return crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']).then(function (base) {
      return crypto.subtle.deriveKey({ name: 'PBKDF2', salt: sale, iterations: ITERAZIONI, hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, false, [uso]);
    });
  }

  /* legge i dati del lucchetto dentro una pagina già chiusa (null se il gioco è in chiaro) */
  function leggi(html) {
    var m = /<script type="application\/json" id="lab-lucchetto">([\s\S]*?)<\/script>/.exec(html);
    return m ? JSON.parse(m[1]) : null;
  }
  function eChiuso(html) { return !!leggi(html); }
  function scadenza(html) { var p = leggi(html); return p ? p.fino : ''; }

  /* cifra un testo e prepara le serrature di tutti i giorni: restituisce i dati del lucchetto */
  function sigilla(testo, titolo, segreto, avanzamento) {
    if (!/^\d{1,6}$/.test(String(segreto).trim())) return Promise.reject(new Error('Il numero segreto deve essere un numero intero.'));
    var chiaveGrezza = casuali(32), iv = casuali(12), giorni = giorniDaPreparare(oggiInItalia());
    var payload = { v: 1, iter: ITERAZIONI, titolo: titolo, iv: b64(iv), dati: '', giorni: {}, fino: '' };
    return crypto.subtle.importKey('raw', chiaveGrezza, 'AES-GCM', false, ['encrypt'])
      .then(function (k) { return crypto.subtle.encrypt({ name: 'AES-GCM', iv: iv }, k, enc.encode(testo)); })
      .then(function (ct) {
        payload.dati = b64(new Uint8Array(ct));
        var fatti = 0, i = 0;
        function una(d) {
          var sale = casuali(16), iv2 = casuali(12);
          return chiaveDa(passwordDelGiorno(d.g, d.m, segreto), sale, 'encrypt')
            .then(function (kek) { return crypto.subtle.encrypt({ name: 'AES-GCM', iv: iv2 }, kek, chiaveGrezza); })
            .then(function (c) {
              payload.giorni[iso(d.a, d.m, d.g)] = b64(sale) + '.' + b64(iv2) + '.' + b64(new Uint8Array(c));
              fatti++; if (avanzamento) avanzamento(fatti / giorni.length);
            });
        }
        /* otto serrature alla volta: il browser usa più processori */
        function lotto() { var l = giorni.slice(i, i + 8); i += 8; return l.length ? Promise.all(l.map(una)).then(lotto) : null; }
        return lotto();
      })
      .then(function () {
        var u = giorni[giorni.length - 1]; payload.fino = iso(u.a, u.m, u.g);
        return payload;
      });
  }

  /* chiude a chiave un gioco: restituisce la pagina con il lucchetto */
  function chiudi(html, segreto, avanzamento) {
    var t = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(html);
    var titolo = t ? t[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() : 'Verifica';
    return sigilla(html, titolo, segreto, avanzamento).then(pagina);
  }

  /* data/lucchetto.json: la pagina Verifiche del sito lo usa per controllare la password di oggi
     prima di mostrare l'archivio (dentro c'è solo una parola di controllo, cifrata come i giochi) */
  var CONTROLLO = 'lab-irc: password giusta';
  function verificatore(segreto, avanzamento) {
    return sigilla(CONTROLLO, 'Verifiche', segreto, avanzamento).then(function (p) { return JSON.stringify(p) + '\n'; });
  }

  /* riapre un gioco chiuso con il numero segreto (serve per rinnovare il lucchetto) */
  function apri(html, segreto) {
    var p = leggi(html);
    if (!p) return Promise.resolve(html);
    var giorno = Object.keys(p.giorni)[0], d = giorno.split('-');
    var parti = p.giorni[giorno].split('.');
    return chiaveDa(passwordDelGiorno(+d[2], +d[1], segreto), daB64(parti[0]), 'decrypt')
      .then(function (kek) { return crypto.subtle.decrypt({ name: 'AES-GCM', iv: daB64(parti[1]) }, kek, daB64(parti[2])); })
      .catch(function () { throw new Error('Il numero segreto non \u00e8 quello con cui \u00e8 stato chiuso \u00ab' + p.titolo + '\u00bb.'); })
      .then(function (grezza) { return crypto.subtle.importKey('raw', grezza, 'AES-GCM', false, ['decrypt']); })
      .then(function (k) { return crypto.subtle.decrypt({ name: 'AES-GCM', iv: daB64(p.iv) }, k, daB64(p.dati)); })
      .then(function (b) { return dec.decode(b); });
  }

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  /* la pagina che vede lo studente: chiede la password e, se è giusta, apre il gioco al suo posto */
  function pagina(payload) {
    return '<!doctype html>\n<html lang="it">\n<head>\n<meta charset="utf-8">\n'
      + '<meta name="viewport" content="width=device-width, initial-scale=1">\n'
      + '<meta name="robots" content="noindex">\n'
      + '<title>' + esc(payload.titolo) + ' \u00b7 verifica con password</title>\n'
      + '<link rel="stylesheet" href="../design-system/styles.css">\n'
      + '<style>\n' + STILE + '\n</style>\n</head>\n<body>\n'
      + '<main class="lucchetto">\n'
      + '<div class="sigillo" aria-hidden="true">\ud83d\udd12</div>\n'
      + '<p class="eb">Verifica di fine unit\u00e0</p>\n'
      + '<h1>' + esc(payload.titolo) + '</h1>\n'
      + '<p id="lc-testo">La verifica si apre con la password che il docente scrive alla lavagna.</p>\n'
      + '<form id="lc-form" autocomplete="off">\n'
      + '<label for="lc-pw">Password di oggi</label>\n'
      + '<div class="riga"><input id="lc-pw" inputmode="numeric" autocomplete="off" required>'
      + '<button id="lc-apri" type="submit">Apri</button></div>\n'
      + '</form>\n'
      + '<p id="lc-esito" role="status" aria-live="polite"></p>\n'
      + '<p class="firma">\u00a9 Matteo Sestili \u00b7 Tutti i diritti riservati \u00b7 <a href="../">Lab IRC</a></p>\n'
      + '</main>\n'
      + '<script type="application/json" id="lab-lucchetto">' + JSON.stringify(payload) + '</script>\n'
      + '<script>\n' + APRI + '\n</script>\n</body>\n</html>\n';
  }

  var STILE = [
    'html,body{margin:0;min-height:100%;background:#14131F;color:#ECEAF5}',
    'body{display:flex;align-items:center;justify-content:center;min-height:100vh;padding:24px 16px;box-sizing:border-box;font:17px/1.55 var(--lab-font-body,system-ui,sans-serif);',
    '  background:radial-gradient(70% 60% at 15% 0%,rgba(139,92,246,.22),transparent 62%),#14131F}',
    '.lucchetto{box-sizing:border-box;width:100%;max-width:440px;text-align:center;border:1.5px solid rgba(227,194,122,.45);border-radius:28px;padding:34px 24px 22px;background:rgba(255,255,255,.03)}',
    '.sigillo{font-size:40px;line-height:1}',
    '.eb{margin:14px 0 4px;font:600 12.5px var(--lab-font-inscription,serif);letter-spacing:.2em;text-transform:uppercase;color:#E3C27A}',
    'h1{margin:0 0 10px;font:600 clamp(28px,7vw,38px)/1.1 var(--lab-font-display,Georgia,serif)}',
    '#lc-testo{color:#C7C3DA;margin:0 0 22px}',
    'label{display:block;font-weight:700;font-size:14px;margin-bottom:8px;color:#C7C3DA}',
    '.riga{display:flex;gap:10px}',
    'input{flex:1;min-width:0;font:600 24px var(--lab-font-body,system-ui);text-align:center;letter-spacing:.12em;padding:12px;border-radius:14px;border:1.5px solid rgba(236,234,245,.25);background:#1D1B2B;color:#ECEAF5}',
    'input:focus{outline:2px solid #22D3EE;outline-offset:2px}',
    'button{font:700 17px var(--lab-font-body,system-ui);padding:0 22px;border:0;border-radius:14px;background:linear-gradient(135deg,#8B5CF6,#22D3EE);color:#fff;cursor:pointer;min-height:52px}',
    'button:disabled{opacity:.5;cursor:default}',
    '#lc-esito{min-height:1.6em;margin:14px 0 0;font-weight:600}',
    '#lc-esito.ko{color:#FF8A7A}',
    '.firma{margin:22px 0 0;font-size:12.5px;color:#9A96B3}.firma a{color:#9A96B3}'
  ].join('\n');

  /* il codice dentro la pagina dello studente (deve bastare a sé stesso) */
  var APRI = [
    '(function(){',
    'var P=JSON.parse(document.getElementById("lab-lucchetto").textContent);',
    'var CHIAVE="lab-lucchetto", ERRORI="lab-lucchetto-errori:"+location.pathname, form=document.getElementById("lc-form"), campo=document.getElementById("lc-pw"),',
    '    bott=document.getElementById("lc-apri"), esito=document.getElementById("lc-esito"), oggi=null;',
    'function msg(t,ko){esito.textContent=t;esito.className=ko?"ko":"";}',
    'function b64(s){var b=atob(s),u=new Uint8Array(b.length);for(var i=0;i<b.length;i++)u[i]=b.charCodeAt(i);return u;}',
    'function inItalia(d){var p={};new Intl.DateTimeFormat("en-CA",{timeZone:"Europe/Rome",year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(d).forEach(function(x){p[x.type]=x.value;});return p.year+"-"+p.month+"-"+p.day;}',
    '/* la data la d\u00e0 il server del sito: cambiare l\'orologio del telefono non serve */',
    'function dataDelServer(){return fetch(location.href.split("#")[0],{method:"HEAD",cache:"no-store"}).then(function(r){var h=r.headers.get("date");if(!h)throw new Error("data");return inItalia(new Date(h));});}',
    '/* la password di oggi, scritta qui o nella pagina Verifiche, vale per tutti i giochi fino a mezzanotte */',
    'function leggiSessione(){try{return JSON.parse(localStorage.getItem(CHIAVE)||"null");}catch(e){return null;}}',
    'function scriviSessione(v){try{localStorage.setItem(CHIAVE,JSON.stringify(v));}catch(e){}}',
    'function errori(n){try{if(n==null)return +sessionStorage.getItem(ERRORI)||0;sessionStorage.setItem(ERRORI,n);}catch(e){}return n||0;}',
    'function apri(pw){',
    '  var voce=P.giorni[oggi];if(!voce)return Promise.reject(new Error("giorno"));',
    '  var p=voce.split("."),te=new TextEncoder();',
    '  return crypto.subtle.importKey("raw",te.encode(pw),"PBKDF2",false,["deriveKey"])',
    '  .then(function(b){return crypto.subtle.deriveKey({name:"PBKDF2",salt:b64(p[0]),iterations:P.iter,hash:"SHA-256"},b,{name:"AES-GCM",length:256},false,["decrypt"]);})',
    '  .then(function(k){return crypto.subtle.decrypt({name:"AES-GCM",iv:b64(p[1])},k,b64(p[2]));})',
    '  .then(function(g){return crypto.subtle.importKey("raw",g,"AES-GCM",false,["decrypt"]);})',
    '  .then(function(k){return crypto.subtle.decrypt({name:"AES-GCM",iv:b64(P.iv)},k,b64(P.dati));})',
    '  .then(function(h){return new TextDecoder().decode(h);});',
    '}',
    'function mostra(html,pw){scriviSessione({oggi:oggi,pw:pw});errori(0);document.open();document.write(html);document.close();}',
    'function attesa(sec){bott.disabled=true;campo.disabled=true;(function giro(){if(sec<=0){bott.disabled=false;campo.disabled=false;msg("Puoi riprovare.");campo.focus();return;}msg("Troppi tentativi: riprova tra "+sec+" secondi.",true);sec--;setTimeout(giro,1000);})();}',
    'form.addEventListener("submit",function(e){',
    '  e.preventDefault();var pw=campo.value.replace(/\\s+/g,"");if(!pw||!oggi)return;',
    '  bott.disabled=true;msg("Controllo\u2026");',
    '  apri(pw).then(function(html){mostra(html,pw);}).catch(function(){',
    '    var n=errori(errori()+1);bott.disabled=false;campo.select();',
    '    if(n%3===0)attesa(30);else msg("Password non corretta.",true);',
    '  });',
    '});',
    'bott.disabled=true;msg("Un momento\u2026");',
    'dataDelServer().then(function(d){',
    '  oggi=d;',
    '  if(!P.giorni[oggi]){form.hidden=true;msg(oggi>P.fino?"Il lucchetto di questa verifica \u00e8 scaduto: avvisa il docente.":"Questa verifica non si pu\u00f2 ancora aprire.",true);return;}',
    '  var s=leggiSessione();',
    '  if(s&&s.oggi===oggi&&s.pw){msg("Riapro la verifica\u2026");return apri(s.pw).then(function(h){mostra(h,s.pw);}).catch(function(){bott.disabled=false;msg("");campo.focus();});}',
    '  bott.disabled=false;msg("");campo.focus();',
    '}).catch(function(){form.hidden=true;msg("Per aprire la verifica serve la connessione a internet.",true);});',
    '})();'
  ].join('\n');

  window.LabLucchetto = {
    chiudi: chiudi, apri: apri, verificatore: verificatore, eChiuso: eChiuso, scadenza: scadenza,
    passwordDiOggi: function (segreto) { var o = oggiInItalia(); return passwordDelGiorno(o.g, o.m, segreto); },
    utf8b64: function (testo) { return b64(enc.encode(testo)); },
    daB64utf8: function (s) { return dec.decode(daB64(s)); }
  };
})();
