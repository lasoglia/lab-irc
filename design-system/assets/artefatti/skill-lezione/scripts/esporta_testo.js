#!/usr/bin/env node
/* Esporta il testo della modalità Studio di lezione.js in un file .txt (UTF-8 con BOM),
   identico a quello del pulsante «Scarica il testo» (stessa pulizia di LabLezione.plain:
   **grassetto**, *corsivo* e {parola|lemma} del glossario diventano testo semplice).
   Uso: node esporta_testo.js lezione.js <slug>-testo.txt */
const fs = require('fs'), vm = require('vm');
const [src, out] = process.argv.slice(2);
if (!src || !out) { console.error('Uso: node esporta_testo.js lezione.js out.txt'); process.exit(1); }
const noop = function () { return null; };
const ctx = { console }; ctx.window = ctx;
const plain = s => String(s || '').replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\*([^*]+)\*/g, '$1').replace(/\{([^{}|\n]+)(\|[^{}\n]*)?\}/g, '$1');
ctx.window.LabLezione = { registra: noop, blocco: noop, md: noop, inline: noop, plain, festa: noop, glossa: noop, Mascotte: noop, blocchi: {}, glossario: {} };
ctx.window.React = { useState: noop, useEffect: noop, useRef: noop, useMemo: noop, useLayoutEffect: noop, createElement: noop, Fragment: 'f' };
ctx.html = noop;
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(src, 'utf8'), ctx);
const L = ctx.LEZIONE;
if (!L) { console.error('window.LEZIONE non trovato'); process.exit(1); }
const S = L.studio || {}, o = [plain(L.titolo), L.sottotitolo ? plain(L.sottotitolo) : '', ''];
(S.sezioni || []).forEach(s => o.push(plain(s.titolo).toUpperCase(), '', plain(s.testo), ''));
if (S.fonti && S.fonti.length) { o.push('FONTI', ''); S.fonti.forEach(f => o.push('- ' + plain(f))); o.push(''); }
o.push('© Matteo Sestili — Tutti i diritti riservati');
fs.writeFileSync(out, '﻿' + o.join('\n'), 'utf8');
console.log('Creato ' + out);
