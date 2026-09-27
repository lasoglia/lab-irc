/* =====================================================================
   Le mascotte degli anni, disegnate in stile anime (occhioni lucidi,
   guance rosa, bocca "ω"). Un solo disegno per sito e artefatti:
   YearMascot.jsx lo importa, il kit degli artefatti
   (assets/artefatti/lab-artefatto.js) ne contiene una copia identica.

   disegna(anno, id, stato) → il contenuto <svg viewBox="0 0 64 64">
     id    prefisso unico per sfumature/ritagli (più mascotte nella pagina)
     stato { dx, dy }  sguardo (-1…1) · ang  gradi dell'ago (Bussolina)
           blink  occhi chiusi · felice  occhi ^ ^ e stellina · parla  bocca aperta
   Il colore dell'anno arriva da currentColor (color: var(--lab-anno-N)).
   ===================================================================== */

var INK = '#1B1430';
var BORDO = 'stroke="rgba(27,20,48,.38)" stroke-width="1.2" stroke-linejoin="round"';
var ORO = '#E3C27A', VERDE = '#5BD68A', VERDE_SCURO = '#34B36A';

var ARTE = {
  1: { name: 'Semino',
    lines: ['Ogni grande albero è stato un seme.', 'Da dove vengo? Bella domanda!', 'In principio… c’era una domanda.'],
    dietro: function () {
      return '<path d="M32 23 C32 19 31.2 16 32 12" stroke="' + VERDE_SCURO + '" stroke-width="2.6" fill="none" stroke-linecap="round"/>' +
        '<path d="M31.6 13.4 C27 6.5 19 6.2 14.5 9.6 C18.5 16.4 26.6 17 31.6 13.4Z" fill="' + VERDE + '" ' + BORDO + '/>' +
        '<path d="M32.4 12.6 C36.5 4.6 44.6 3.2 49.6 6 C46.8 12.6 38.8 15 32.4 12.6Z" fill="' + VERDE + '" ' + BORDO + '/>' +
        '<path d="M30 12.6 Q23 10.4 17.6 10 M34 11.6 Q40.6 7.6 46.6 6.6" stroke="#fff" stroke-opacity=".55" stroke-width=".9" fill="none" stroke-linecap="round"/>';
    },
    corpo: 'path d="M32 21 C44 21 50.5 30.5 50.5 40 C50.5 50 42.5 56.5 32 56.5 C21.5 56.5 13.5 50 13.5 40 C13.5 30.5 20 21 32 21Z"',
    lucido: [22.5, 29, -35],
    occhi: [[25, 39, 1.05], [39, 39, 1.05]], guance: [[19.2, 46], [44.8, 46]], bocca: [32, 46.6], stella: [50, 22] },

  2: { name: 'Ichthy',
    lines: ['ΙΧΘΥΣ: Gesù Cristo, Figlio di Dio, Salvatore.', 'I primi cristiani mi disegnavano in segreto.', 'Venite dietro a me! (Mc 1,17)'],
    dietro: function () {
      return '<path d="M44 35 C49.5 27 55.5 22.5 60.5 22 C58.2 28.5 58.2 41.5 60.5 48 C55.5 47.5 49.5 43 44 35Z" fill="currentColor" ' + BORDO + '/>' +
        '<path d="M50 30 Q54 34 50 40" stroke="#fff" stroke-opacity=".4" stroke-width="1" fill="none" stroke-linecap="round"/>' +
        '<path d="M23 22.5 C27 14 38.5 13.6 43 22.5Z" fill="currentColor" ' + BORDO + '/>' +
        '<circle cx="5" cy="21" r="2.1" fill="#fff" fill-opacity=".25" stroke="#fff" stroke-opacity=".75" stroke-width=".8"/>' +
        '<circle cx="9" cy="13.5" r="1.5" fill="#fff" fill-opacity=".25" stroke="#fff" stroke-opacity=".75" stroke-width=".7"/>' +
        '<circle cx="4.5" cy="8" r="1" fill="#fff" fill-opacity=".25" stroke="#fff" stroke-opacity=".75" stroke-width=".6"/>';
    },
    corpo: 'path d="M5.5 35.5 C7.5 24.5 19.5 20.5 29.5 20.5 C41.5 20.5 48.5 28 48.5 35.5 C48.5 43 41.5 50.5 29.5 50.5 C19.5 50.5 7.5 46.5 5.5 35.5Z"',
    sopra: function () {
      return '<path d="M31 28 q3 3 0 6 M36.5 26.5 q3 3 0 6 M36.5 34 q3 3 0 6 M42 30 q2.6 3 0 6" stroke="#fff" stroke-opacity=".38" stroke-width="1.1" fill="none" stroke-linecap="round"/>' +
        '<path d="M27 39 C30.5 44 35.5 45 38 42.5 C35.5 39 31 37.6 27 39Z" fill="#fff" fill-opacity=".32"/>';
    },
    lucido: [17, 26, -20],
    occhi: [[18.5, 33, 1.25]], guance: [[20, 42.5]], bocca: [10.5, 40.5], stella: [30, 12] },

  3: { name: 'Navicella',
    lines: ['Duc in altum! Prendi il largo. (Lc 5,4)', 'Duemila anni di mare… e ancora a galla.', 'Tempesta? Non temete!'],
    dietro: function () {
      return '<path d="M32 7 V37" stroke="' + ORO + '" stroke-width="2.2" stroke-linecap="round"/>' +
        '<path d="M32.5 7 L41 9.6 L32.5 12.2Z" fill="' + ORO + '"/>' +
        '<path d="M34.5 11.5 C44 18 48.5 27.5 49.5 34.5 H34.5Z" fill="#FFF8EE" ' + BORDO + '/>' +
        '<path d="M29.5 15.5 C24 22 21 28.5 19.8 34.5 H29.5Z" fill="#FFF8EE" fill-opacity=".92" ' + BORDO + '/>' +
        '<path d="M41.5 20.5 V30 M38.2 23.6 H44.8" stroke="' + ORO + '" stroke-width="1.7" stroke-linecap="round"/>' +
        '<path d="M3 55 Q10 51.5 17 55 T31 55 T45 55 T59 55 Q61 56 62 55.6 Q50 60.5 32 60.5 Q14 60.5 3 55Z" fill="#7DD3FC" fill-opacity=".6"/>';
    },
    corpo: 'path d="M5.5 36 H58.5 C56.5 46.5 50 54.5 40 55.5 H24 C14 54.5 7.5 46.5 5.5 36Z"',
    sopra: function () {
      return '<path d="M5.5 36 H58.5" stroke="' + ORO + '" stroke-width="2.2" stroke-linecap="round"/>';
    },
    lucido: [14, 40, -10],
    occhi: [[25, 43.5, 0.95], [39, 43.5, 0.95]], guance: [[17.8, 49], [46.2, 49]], bocca: [32, 49.6], stella: [13, 16] },

  4: { name: 'Bussolina', ago: [32, 28],
    lines: ['La coscienza è la mia bussola.', 'E la tua, dove punta?', 'Libertà non è andare ovunque: è sapere dove.'],
    dietro: function () {
      return '<circle cx="32" cy="9.5" r="3.6" fill="none" stroke="' + ORO + '" stroke-width="2"/>' +
        '<rect x="28.6" y="12" width="6.8" height="4.4" rx="1.6" fill="' + ORO + '"/>';
    },
    corpo: 'circle cx="32" cy="37" r="21"',
    sopra: function () {
      return '<circle cx="32" cy="37" r="20" fill="none" stroke="' + ORO + '" stroke-width="2"/>' +
        '<circle cx="32" cy="37" r="16.5" fill="#FFF7EE" stroke="rgba(27,20,48,.25)" stroke-width="1"/>' +
        '<path d="M32 20.8 L33.4 23.4 H30.6Z" fill="' + ORO + '"/>' +
        '<path d="M32 51.2 V53 M15.6 37 H17.4 M46.6 37 H48.4" stroke="rgba(27,20,48,.35)" stroke-width="1.2" stroke-linecap="round"/>';
    },
    lucido: [22, 26, -40],
    occhi: [[25.5, 40.8, 0.85], [38.5, 40.8, 0.85]], guance: [[21, 46.4], [43, 46.4]], bocca: [32, 47.4], stella: [52, 15] },

  5: { name: 'Terra',
    lines: ['Laudato si’! Custodisci la casa comune.', 'Tutto è connesso.', 'Il futuro comincia adesso.'],
    dietro: function () {
      return '<path d="M32 19 C32 15.5 33 13.4 35 11.6" stroke="' + VERDE_SCURO + '" stroke-width="2.4" fill="none" stroke-linecap="round"/>' +
        '<path d="M34.6 12 C36.4 5.4 43.4 3.2 48.6 4.2 C47.4 10.6 41.2 13.6 34.6 12Z" fill="' + VERDE + '" ' + BORDO + '/>' +
        '<path d="M36.5 10.8 Q42 7.6 46.4 5.8" stroke="#fff" stroke-opacity=".55" stroke-width=".9" fill="none" stroke-linecap="round"/>';
    },
    corpo: 'circle cx="32" cy="37.5" r="19.5"',
    sopra: function () {
      return '<path d="M13.6 31 C16.5 26.5 22 26.8 22 30.6 C22 34.4 17.4 35.4 14 34.6Z M41.2 24.6 C45.6 23.6 50 27 49.2 30.8 C45.8 32.4 41.4 30 41.2 24.6Z M24 53.6 C27 51.4 32 51.2 35 53.4 C33 56 27 56.2 24 53.6Z" fill="' + VERDE + '" fill-opacity=".9"/>';
    },
    lucido: [22, 27, -35],
    occhi: [[25, 38.5, 1], [39, 38.5, 1]], guance: [[19.2, 45.4], [44.8, 45.4]], bocca: [32, 46], stella: [11, 17] },
};

function f(n) { return Math.round(n * 100) / 100; }

function occhio(x, y, s, lato, id, st) {
  if (st.blink || st.felice) {
    return '<path d="M' + f(x - 3.7 * s) + ' ' + f(y + 0.8 * s) + ' Q' + f(x) + ' ' + f(y - 3.4 * s) + ' ' + f(x + 3.7 * s) + ' ' + f(y + 0.8 * s) + '" stroke="' + INK + '" stroke-width="' + f(1.6 * s) + '" fill="none" stroke-linecap="round"/>';
  }
  var dx = f((st.dx || 0) * 1.1), dy = f((st.dy || 0) * 1.1);
  return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">' +
    '<ellipse rx="3.9" ry="4.8" fill="#fff"/>' +
    '<g clip-path="url(#' + id + 'c)"><g transform="translate(' + dx + ' ' + dy + ')">' +
      '<ellipse cy=".3" rx="3.2" ry="4.1" fill="url(#' + id + 'i)"/>' +
      '<ellipse cy=".6" rx="1.6" ry="2.2" fill="#120E20"/>' +
      '<ellipse cy="2.9" rx="2.1" ry=".9" fill="#fff" fill-opacity=".38"/>' +
      '<circle cx="-1.25" cy="-1.55" r="1.4" fill="#fff"/>' +
      '<circle cx="1.35" cy="1.3" r=".62" fill="#fff"/>' +
    '</g></g>' +
    '<path d="M-4.3 -2 Q-0.4 -6.9 4.3 -2.4" stroke="' + INK + '" stroke-width="1.35" fill="none" stroke-linecap="round" transform="scale(' + lato + ' 1)"/>' +
    '<path d="M3.7 -3.1 L5.7 -3.6" stroke="' + INK + '" stroke-width="1" stroke-linecap="round" transform="scale(' + lato + ' 1)"/>' +
    '</g>';
}

function guancia(p) {
  var x = p[0], y = p[1];
  return '<ellipse cx="' + x + '" cy="' + y + '" rx="3.3" ry="1.9" fill="#FF6F91" fill-opacity=".5"/>' +
    '<path d="M' + f(x - 2.1) + ' ' + f(y + 0.9) + ' l.9 -1.8 M' + f(x - 0.4) + ' ' + f(y + 0.9) + ' l.9 -1.8 M' + f(x + 1.3) + ' ' + f(y + 0.9) + ' l.9 -1.8" stroke="#fff" stroke-opacity=".75" stroke-width=".6" stroke-linecap="round"/>';
}

function bocca(p, parla) {
  var x = p[0], y = p[1];
  if (parla) {
    return '<path d="M' + f(x - 2.6) + ' ' + f(y - 0.5) + ' Q' + x + ' ' + f(y + 4.4) + ' ' + f(x + 2.6) + ' ' + f(y - 0.5) + 'Z" fill="#6B1F35" stroke="' + INK + '" stroke-width=".8" stroke-linejoin="round"/>' +
      '<ellipse cx="' + x + '" cy="' + f(y + 2) + '" rx="1.3" ry=".8" fill="#FF8FA3"/>';
  }
  return '<path d="M' + f(x - 2.4) + ' ' + y + ' Q' + f(x - 1.2) + ' ' + f(y + 1.7) + ' ' + x + ' ' + y + ' Q' + f(x + 1.2) + ' ' + f(y + 1.7) + ' ' + f(x + 2.4) + ' ' + y + '" stroke="' + INK + '" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
}

function stellina(p) {
  return '<path transform="translate(' + p[0] + ' ' + p[1] + ')" d="M0 -3.4 L.9 -.9 L3.4 0 L.9 .9 L0 3.4 L-.9 .9 L-3.4 0 L-.9 -.9Z" fill="#FFE8A3" stroke="' + ORO + '" stroke-width=".5"/>';
}

function disegna(anno, id, st) {
  var m = ARTE[anno] || ARTE[1];
  st = st || {};
  var l = m.lucido;
  var s = '<defs>' +
    '<linearGradient id="' + id + 'i" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1E1636"/><stop offset=".62" stop-color="currentColor"/><stop offset="1" stop-color="currentColor"/></linearGradient>' +
    '<linearGradient id="' + id + 'o" x1="0" y1="0" x2="0" y2="1"><stop offset=".45" stop-color="#140E28" stop-opacity="0"/><stop offset="1" stop-color="#140E28" stop-opacity=".3"/></linearGradient>' +
    '<radialGradient id="' + id + 'l" cx=".32" cy=".26" r=".75"><stop offset="0" stop-color="#fff" stop-opacity=".5"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/></radialGradient>' +
    '<clipPath id="' + id + 'c"><ellipse rx="3.9" ry="4.8"/></clipPath>' +
    '</defs>';
  s += m.dietro();
  s += '<' + m.corpo + ' fill="currentColor" ' + BORDO + '/>';
  s += '<' + m.corpo + ' fill="url(#' + id + 'o)"/>';
  s += '<' + m.corpo + ' fill="url(#' + id + 'l)"/>';
  s += '<ellipse cx="' + l[0] + '" cy="' + l[1] + '" rx="4.2" ry="2.3" fill="#fff" fill-opacity=".6" transform="rotate(' + l[2] + ' ' + l[0] + ' ' + l[1] + ')"/>';
  if (m.sopra) s += m.sopra();
  if (m.ago) {
    var a = m.ago;
    s += '<g transform="rotate(' + f(st.ang || 0) + ' ' + a[0] + ' ' + a[1] + ')">' +
      '<path d="M' + a[0] + ' ' + (a[1] - 7.5) + ' L' + (a[0] + 2.1) + ' ' + a[1] + ' L' + (a[0] - 2.1) + ' ' + a[1] + 'Z" fill="currentColor" stroke="rgba(27,20,48,.35)" stroke-width=".6"/>' +
      '<path d="M' + a[0] + ' ' + (a[1] + 6) + ' L' + (a[0] + 2.1) + ' ' + a[1] + ' L' + (a[0] - 2.1) + ' ' + a[1] + 'Z" fill="#3A3350"/>' +
      '<circle cx="' + a[0] + '" cy="' + a[1] + '" r="1.4" fill="' + ORO + '"/></g>';
  }
  s += m.guance.map(guancia).join('');
  s += m.occhi.map(function (o, i) { return occhio(o[0], o[1], o[2], m.occhi.length > 1 && i === 0 ? -1 : 1, id, st); }).join('');
  s += bocca(m.bocca, st.parla);
  if (st.felice) s += stellina(m.stella);
  return s;
}

export { ARTE, disegna };
