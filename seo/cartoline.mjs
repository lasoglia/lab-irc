// seo/cartoline.mjs — Disegna le immagini del kit social (1080×1350, in PNG e in JPG).
//
// Legge gli elenchi scritti da seo/promozione.py e seo/rubriche.py e crea in
// promozione/cartoline/ le immagini che mancano, nello stile del sito (font,
// colori, mascotte, avatar del prof):
//   promozione/cartoline.json   le lezioni: copertina + schede del carosello + scheda finale
//   promozione/prof.json        i post del prof (avatar con il fumetto)
//   promozione/domenica.json    gli speciali della domenica
// e per ogni post la sua storia verticale (1080×1920, <nome>-storia.png/jpg).
// Instagram accetta solo il JPG, il resto usa il PNG. Le immagini non più in
// elenco (testi riscritti, lezioni rinominate) vengono cancellate.
//
// Uso:  PW_MODULE=<percorso di playwright-core/index.js> CHROME_PATH=<chrome> node seo/cartoline.mjs
// (senza variabili usa il Playwright e il Chromium di questo computer, se ci sono)

import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, unlinkSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const RADICE = process.env.LAB_RADICE || join(dirname(fileURLToPath(import.meta.url)), '..');
// l'avatar del prof in una posa: assets/avatar/<posa>.png o .jpg (null se manca)
const avatarDi = (posa) => ['png', 'jpg'].map((e) => `assets/avatar/${posa}.${e}`).find((f) => existsSync(join(RADICE, f))) || null;
// PROVINO_CAROSELLI=<elenco.json> USCITA=<cartella>: disegna solo quei caroselli del martedì, per guardarli
const PROVINO = process.env.PROVINO_CAROSELLI || '';
const CARTELLA = PROVINO && process.env.USCITA ? process.env.USCITA : join(RADICE, 'promozione', 'cartoline');
const PW = process.env.PW_MODULE || '/opt/node22/lib/node_modules/playwright/index.js';
const CHROME = process.env.CHROME_PATH || '/opt/pw-browsers/chromium';

const leggi = (nome) => {
  const p = join(RADICE, 'promozione', nome);
  return existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : [];
};
const url = (rel) => pathToFileURL(join(RADICE, rel)).href;
const esc = (s) => String(s || '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const jpg = (f) => f.replace(/\.png$/, '.jpg');
const ROMANI = { 1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V' };
const COLORI = { 1: '#FF7A59', 2: '#4FB0FF', 3: '#A78BFA', 4: '#FB7BB5', 5: '#FBBF24' };
const MASCOTTE = ['', '1-semino', '2-ichthy', '3-navicella', '4-bussolina', '5-terra'];
const ORO = '#E3C27A';

/* ---------- la base comune: font, cornice, logo ---------- */
function pagina(colore, corpo, stile = '') {
  return `<!doctype html><html lang="it"><head><meta charset="utf-8"><style>
@font-face{font-family:Cormorant;font-weight:600;src:url(${url('design-system/fonts/cormorant-garamond-latin-600-normal.woff2')})}
@font-face{font-family:Cormorant;font-weight:500;font-style:italic;src:url(${url('design-system/fonts/cormorant-garamond-latin-500-italic.woff2')})}
@font-face{font-family:Cinzel;font-weight:600;src:url(${url('design-system/fonts/cinzel-latin-600-normal.woff2')})}
@font-face{font-family:Figtree;font-weight:500;src:url(${url('design-system/fonts/figtree-latin-500-normal.woff2')})}
@font-face{font-family:Figtree;font-weight:700;src:url(${url('design-system/fonts/figtree-latin-700-normal.woff2')})}
html,body{margin:0;width:1080px;height:1350px;overflow:hidden}
body{box-sizing:border-box;padding:92px 96px 86px;display:flex;flex-direction:column;position:relative;
  background:radial-gradient(80% 55% at 10% 0%,rgba(139,92,246,.30),transparent 62%),radial-gradient(70% 50% at 100% 100%,${colore}2E,transparent 62%),#14131F;
  color:#ECEAF5;font-family:Figtree}
.bordo{position:absolute;inset:28px;border:1.5px solid rgba(227,194,122,.45);border-radius:40px;pointer-events:none}
.alto{display:flex;justify-content:space-between;align-items:center}
.logo{display:flex;align-items:center;gap:18px}
.logo i{width:68px;height:68px;border-radius:20px;background:linear-gradient(135deg,#8B5CF6,#22D3EE);display:grid;place-items:center;font:600 40px Cormorant;font-style:normal;color:#fff}
.logo b{font:600 42px Cormorant}.logo b span{background:linear-gradient(135deg,#A78BFA,#22D3EE);-webkit-background-clip:text;color:transparent}
.anni{display:flex;gap:10px}
.anni span{font:600 24px Cinzel;min-width:58px;height:58px;padding:0 6px;box-sizing:border-box;border-radius:29px;display:grid;place-items:center;border:2px solid currentColor}
.eb{font:600 22px Cinzel;letter-spacing:.2em;text-transform:uppercase;color:${colore};display:flex;align-items:center;gap:16px;margin-bottom:22px}
.eb:before{content:"";width:48px;height:2px;background:currentColor;flex:none}
h1{margin:0;font:600 92px/1.04 Cormorant;letter-spacing:-.01em;text-wrap:balance}
h1 em{font-style:italic;font-weight:500;background:linear-gradient(135deg,#A78BFA,#22D3EE);-webkit-background-clip:text;color:transparent}
p{margin:26px 0 0;font:500 31px/1.42 Figtree;color:#C7C3DA;text-wrap:pretty}
.piede{margin-top:44px;display:flex;justify-content:space-between;align-items:flex-end;gap:30px;font-size:22px}
.piede .uda{color:#9A96B3;font-weight:500;max-width:600px;line-height:1.35}
.piede .web{font-weight:700;font-size:28px;color:${ORO};letter-spacing:.02em;white-space:nowrap}
${stile}
</style></head><body><div class="bordo"></div>${corpo}</body></html>`;
}
const logo = '<div class="logo"><i>L</i><b>Lab <span>IRC</span></b></div>';

/* ---------- lezioni: la copertina ---------- */
function copertina(c) {
  const sito = !c.anno;
  const colore = c.colore || ORO;
  const figura = sito
    ? `<div class="cinque">${[1, 2, 3, 4, 5].map((n) => `<img src="${url(`assets/mascotte/svg/${MASCOTTE[n]}.svg`)}">`).join('')}</div>`
    : `<img class="una" src="${url(`assets/mascotte/svg/${c.mascotte}.svg`)}">`;
  const anni = sito
    ? `<div class="anni">${[1, 2, 3, 4, 5].map((n) => `<span style="color:${COLORI[n]}">${ROMANI[n]}</span>`).join('')}</div>`
    : `<div class="anni"><span style="color:${colore}">${ROMANI[c.anno]}</span></div>`;
  return pagina(colore, `
<div class="alto">${logo}${anni}</div>
<div class="figura">${figura}</div>
<div class="testo"><div class="eb">${sito ? 'Religione Cattolica' : `Religione · classe ${esc(c.classe)}`}</div>
<h1>${sito ? 'Il laboratorio di <em>Religione</em>' : esc(c.titolo)}</h1>
<p>${esc(c.frase)}</p></div>
<div class="piede"><div class="uda">${sito ? 'Lezioni, fascicoli e giochi di verifica, dalla prima alla quinta' : esc(c.uda)}</div><div class="web">www.labirc.it</div></div>`,
  `.figura{flex:1;display:grid;place-items:center;min-height:0}
.una{width:330px;height:330px;filter:drop-shadow(0 18px 40px rgba(0,0,0,.35))}
.cinque{display:flex;flex-wrap:wrap;justify-content:center;width:620px;gap:14px 34px}
.cinque img{width:170px;height:170px}`);
}

/* ---------- lezioni: una scheda del carosello (con il disegno di Claude, se c'è) ---------- */
function scheda(c, i, totale, s, disegno) {
  const colore = c.colore || ORO;
  const mascotte = c.anno ? `<img class="mini" src="${url(`assets/mascotte/svg/${c.mascotte}.svg`)}">` : '';
  const figura = disegno && existsSync(join(RADICE, disegno)) ? `<div class="disegno"><img src="${url(disegno)}"></div>` : '';
  return pagina(colore, `
<div class="alto">${logo}<div class="conta" style="color:${colore}">${i}/${totale}</div></div>
<div class="centro ${figura ? 'con-disegno' : ''}">${figura}<div class="eb">${esc(s.titolo)}</div><h2>${esc(s.testo)}</h2></div>
<div class="piede"><div class="uda">${esc(c.titolo)}</div>${mascotte}</div>`,
  `.conta{font:600 26px Cinzel;letter-spacing:.12em}
.centro{flex:1;display:flex;flex-direction:column;justify-content:center;min-height:0}
.disegno{background:rgba(255,255,255,.035);border:1.5px solid rgba(227,194,122,.28);border-radius:30px;padding:18px;margin:34px 0 40px}
.disegno img{display:block;width:100%;height:auto;max-height:540px;object-fit:contain}
h2{margin:0;font:600 64px/1.16 Cormorant;text-wrap:pretty}
.con-disegno h2{font-size:50px}
.mini{width:120px;height:120px}`);
}

/* ---------- lezioni: l'ultima scheda, l'invito al sito ---------- */
function finale(c, totale) {
  const colore = c.colore || ORO;
  return pagina(colore, `
<div class="alto">${logo}<div class="conta" style="color:${colore}">${totale}/${totale}</div></div>
<div class="centro">
<div class="cinque">${[1, 2, 3, 4, 5].map((n) => `<img src="${url(`assets/mascotte/svg/${MASCOTTE[n]}.svg`)}">`).join('')}</div>
<div class="eb" style="justify-content:center">${esc(c.saluto || 'Per continuare')}</div>
<h2>${c.invito || 'La lezione completa<br>è su <em>www.labirc.it</em>'}</h2>
<div class="bio">Link nella bio</div></div>
<div class="piede"><div class="uda">${esc(c.titolo)}</div><div class="web">www.labirc.it</div></div>`,
  `.conta{font:600 26px Cinzel;letter-spacing:.12em}
.centro{flex:1;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:10px}
.cinque{display:flex;gap:18px;margin-bottom:34px}.cinque img{width:120px;height:120px}
h2{margin:0;font:600 68px/1.12 Cormorant}
h2 em{font-style:italic;font-weight:500;color:${ORO}}
.bio{margin-top:26px;font:700 30px Figtree;color:#ECEAF5;background:rgba(255,255,255,.07);border:1.5px solid rgba(227,194,122,.5);border-radius:999px;padding:14px 30px}`);
}

/* ---------- il prof: una vignetta della striscia a fumetti ----------
   in scena il prof (avatar, con l'espressione della vignetta) e lo studente (la mascotte
   della classe); il fumetto parte da chi parla, l'altro resta un po' in ombra */
function vignetta(p, i, totale, v) {
  const anno = String(p.anno || '1');
  const colore = COLORI[anno] || '#22D3EE';
  const parlaProf = v.parla !== 'studente';
  const posa = avatarDi(v.posa) ? v.posa : 'sorriso';
  return pagina(colore, `
<div class="alto">${logo}<div class="rubrica">${esc(p.formato)} · ${i}/${totale}</div></div>
${v.didascalia ? `<div class="didascalia">${esc(v.didascalia)}</div>` : '<div class="spazio"></div>'}
<div class="fumetto ${parlaProf ? 'da-prof' : 'da-studente'}"><h2>${esc(v.fumetto)}</h2></div>
<div class="scena">
  <img class="prof ${parlaProf ? 'parla' : ''}" src="${url(avatarDi(posa))}">
  <img class="studente ${parlaProf ? '' : 'parla'}" src="${url(`assets/mascotte/svg/${MASCOTTE[+anno] || MASCOTTE[1]}.svg`)}">
</div>
<div class="piede"><div class="uda">${esc(p.titolo)}${i === totale ? ' · la lezione è su labirc.it' : ''}</div><div class="web">www.labirc.it</div></div>`,
  `.rubrica{font:600 21px Cinzel;letter-spacing:.16em;text-transform:uppercase;color:${colore};border:2px solid currentColor;border-radius:999px;padding:10px 22px}
.didascalia{align-self:flex-start;margin-top:40px;background:${ORO};color:#14131F;font:700 26px Figtree;padding:12px 22px;border-radius:10px;transform:rotate(-1.2deg)}
.spazio{height:40px}
.fumetto{position:relative;margin-top:30px;background:#FBFAFF;color:#14131F;border-radius:46px;padding:46px 54px;box-shadow:0 18px 40px rgba(0,0,0,.35)}
.fumetto:after{content:"";position:absolute;bottom:-50px;border:26px solid transparent;border-top:34px solid #FBFAFF}
.da-prof:after{left:150px;border-left:30px solid #FBFAFF}
.da-studente:after{right:150px;border-right:30px solid #FBFAFF}
h2{margin:0;font:600 58px/1.18 Cormorant;text-wrap:pretty}
.scena{flex:1;min-height:0;display:flex;align-items:flex-end;justify-content:space-between;margin-top:56px;
  background:radial-gradient(60% 40% at 50% 100%,${colore}33,transparent 70%)}
.scena img{transition:none;filter:saturate(.75) brightness(.8)}
.scena img.parla{filter:none}
.prof{width:470px;height:470px;border-radius:50%;object-fit:cover;box-shadow:0 0 0 6px rgba(227,194,122,.5),0 30px 70px rgba(0,0,0,.45)}
.prof.parla{box-shadow:0 0 0 8px ${ORO},0 30px 70px rgba(0,0,0,.45)}
.studente{width:300px;height:300px;margin-bottom:20px}
.studente.parla{transform:scale(1.08) translateY(-10px)}`);
}

/* ---------- la domenica: «La grande domanda» (copertina) ---------- */
function sfondoIA(d) {
  return d.sfondo && existsSync(join(RADICE, d.sfondo))
    ? `<div class="sfondo-ia" style="background-image:url(${url(d.sfondo)})"></div><div class="velo-ia"></div>` : '';
}
const STILE_SFONDO = `.sfondo-ia{position:absolute;inset:0;background-size:cover;background-position:center;opacity:.6}
.velo-ia{position:absolute;inset:0;background:linear-gradient(180deg,rgba(20,19,31,.7),rgba(20,19,31,.35) 35%,rgba(20,19,31,.75) 70%,#14131F)}
.alto,.centro,.piede{position:relative;z-index:1}`;

function domenica(d) {
  const colore = d.colore || ORO;
  if (d.formato === 'shabbat') return pagina(colore, `
${sfondoIA(d)}<div class="alto">${logo}<div class="giorno" style="color:${colore}">${esc(d.data_breve)}</div></div>
<div class="centro"><div class="candele"><i></i><i></i></div>
<div class="eb" style="justify-content:center">Lo Shabbat del Lab</div>
<h1>${esc(d.titolo)}</h1><p>${esc(d.frase)}</p>
<div class="sfoglia">Sfoglia e scopri &rarr;</div></div>
<div class="piede"><div class="uda">Dalle fonti ebraiche</div><div class="web">www.labirc.it</div></div>`,
  `.giorno{font:600 24px Cinzel;letter-spacing:.14em;text-transform:uppercase}
.centro{flex:1;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center}
.candele{display:flex;gap:70px;margin-bottom:46px}
.candele i{position:relative;display:block;width:46px;height:170px;border-radius:10px;background:linear-gradient(180deg,#FBFAFF,#C7C3DA)}
.candele i:before{content:"";position:absolute;left:50%;top:-74px;width:40px;height:66px;margin-left:-20px;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;background:radial-gradient(circle at 50% 70%,#FFF7D6,#FBBF24 55%,#FF7A59);box-shadow:0 0 50px 18px rgba(251,191,36,.45)}
.candele i:after{content:"";position:absolute;left:50%;top:-10px;width:4px;height:12px;margin-left:-2px;background:#14131F}
h1{font-size:90px}
p{max-width:840px}
.sfoglia{margin-top:44px;font:700 28px Figtree;color:#14131F;background:${ORO};border-radius:999px;padding:14px 30px}
${STILE_SFONDO}`);
  if (d.formato === 'grande-domanda') return pagina(colore, `
${sfondoIA(d)}<div class="alto">${logo}<div class="giorno" style="color:${colore}">${esc(d.data_breve)}</div></div>
<div class="centro"><div class="punto" style="color:${colore}">?</div>
<div class="eb" style="justify-content:center">La grande domanda</div>
<h1>${esc(d.titolo)}</h1><p>${esc(d.frase)}</p>
<div class="sfoglia">Sfoglia la risposta &rarr;</div></div>
<div class="piede"><div class="uda">Dalle lezioni del Lab IRC</div><div class="web">www.labirc.it</div></div>`,
  `.giorno{font:600 24px Cinzel;letter-spacing:.14em;text-transform:uppercase}
.centro{flex:1;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center}
.punto{font:600 260px/1 Cormorant;margin-bottom:6px;text-shadow:0 0 80px currentColor;opacity:.95}
h1{font-size:94px}
p{max-width:840px}
.sfoglia{margin-top:44px;font:700 28px Figtree;color:#14131F;background:${ORO};border-radius:999px;padding:14px 30px}
${STILE_SFONDO}`);
  return pagina(colore, `
<div class="alto">${logo}<div class="giorno" style="color:${colore}">${esc(d.data_breve)}</div></div>
<div class="centro"><div class="stella" style="color:${colore}">✦</div>
<div class="eb" style="justify-content:center">La domenica del Lab · ${esc(d.tempo)}</div>
<h1>${esc(d.titolo)}</h1><p>${esc(d.frase)}</p></div>
<div class="piede"><div class="uda">${esc(d.lezione || '')}</div><div class="web">www.labirc.it</div></div>`,
  `.giorno{font:600 24px Cinzel;letter-spacing:.14em;text-transform:uppercase}
.centro{flex:1;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center}
.stella{font-size:120px;line-height:1;margin-bottom:30px;text-shadow:0 0 60px currentColor}
h1{font-size:86px}
p{max-width:820px}`);
}

/* ---------- i caroselli del martedì (seo/caroselli.py): «Parole con una storia», «In classe domani»,
   «In numeri», nello stile «Notte del Lab» dei reel (seo/reel2.mjs): vetrata, grana, barra dell'anno,
   etichetta della rubrica in oro, pagine VERE del fascicolo con l'evidenziatore e il cerchio ---------- */
const GRANA = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .09 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`;
// *parola* = in corsivo oro, come nei reel
const ricco = (s) => esc(s).replace(/\*([^*]+)\*/g, '<i>$1</i>');
function notte(colore, corpo, stile = '') {
  return pagina(colore, corpo, `
body{padding:84px 96px 76px;background:radial-gradient(90% 45% at 100% 0%,${colore}55,transparent 62%),radial-gradient(70% 40% at 0% 8%,rgba(139,92,246,.35),transparent 62%),radial-gradient(80% 40% at 50% 100%,rgba(34,211,238,.12),transparent 70%),#14131F}
body:before{content:"";position:absolute;inset:0;opacity:.5;mix-blend-mode:overlay;background-image:${GRANA};pointer-events:none}
.bordo{display:none}
.barra-anno{position:absolute;left:0;top:0;bottom:0;width:10px;background:${colore}}
.alto{position:relative;z-index:1}
.rubrica{display:flex;gap:14px;align-items:center}
.rubrica b{font:600 26px/1 Cinzel;letter-spacing:.16em;text-transform:uppercase;color:#14131F;background:${ORO};padding:14px 22px 11px;border-radius:999px}
.rubrica span{font:600 22px/1 Cinzel;letter-spacing:.16em;text-transform:uppercase;color:#C7C3DA}
.conta{font:600 26px Cinzel;letter-spacing:.12em;color:${colore}}
.centro{position:relative;z-index:1;flex:1;display:flex;flex-direction:column;justify-content:center;min-height:0}
.kicker{font:600 26px Cinzel;letter-spacing:.18em;text-transform:uppercase;color:${ORO};display:flex;align-items:center;gap:16px;margin-bottom:26px}
.kicker:before{content:"";width:44px;height:2px;background:currentColor;flex:none}
h1,h2{font-family:Cormorant;font-weight:600;margin:0;text-wrap:balance;font-variant-numeric:lining-nums;letter-spacing:-.01em}
h1 i,h2 i,p i{font-style:italic;font-weight:500;color:${ORO}}
h2{font-size:70px;line-height:1.08;text-wrap:pretty}
p{font:500 34px/1.4 Figtree;color:#D9D6E8}
.cifra{font:600 300px/.9 Cormorant;font-variant-numeric:lining-nums;background:linear-gradient(180deg,#F3DCA4,#E3C27A 55%,#A67C2E);-webkit-background-clip:text;color:transparent;letter-spacing:-.02em;margin-bottom:18px}
.foglio{position:relative;width:100%;border-radius:28px;overflow:hidden;background:#fff;box-shadow:0 30px 80px rgba(0,0,0,.55)}
.tela{position:absolute;left:0;top:0;width:1241px;height:1754px;transform-origin:0 0}
.tela>img{position:absolute;left:0;top:0;width:1241px}.tela>.evid,.tela>.cerchio{position:absolute}
.evid{background:rgba(251,191,36,.42);border-radius:6px;mix-blend-mode:multiply}
.cerchio{overflow:visible}.cerchio ellipse{fill:none;stroke:#E0365A;stroke-width:3.4;stroke-linecap:round;vector-effect:non-scaling-stroke}
.fonte{margin-top:16px;font:700 22px Figtree;color:#8E89A6;letter-spacing:.02em}
.citazione{font:500 46px/1.3 Cormorant;font-style:italic;color:#ECEAF5;border-left:4px solid ${ORO};padding:10px 0 10px 30px}
.pillola{align-self:flex-start;font:700 28px Figtree;color:#14131F;background:${ORO};border-radius:999px;padding:14px 30px}
.piede{position:relative;z-index:1;margin-top:34px;align-items:center}
.piede .uda{font-weight:500;font-size:22px;color:#9A96B3;max-width:640px}
.piede .web{font:700 26px Figtree;color:${ORO}}
.piede .masc{width:110px;height:110px;flex:none}
${stile}`);
}
// la pagina vera del fascicolo, disegnata con pdftoppm (poppler) quando serve; null se non si può
const pagineFatte = new Map();
function paginaPdf(fascicolo, n) {
  const chiave = `${fascicolo}#${n}`;
  if (pagineFatte.has(chiave)) return pagineFatte.get(chiave);
  let file = null;
  const pdf = join(RADICE, fascicolo);
  if (existsSync(pdf)) {
    const radice = join(lavoro, `pagina-${pagineFatte.size}`);
    const e = spawnSync('pdftoppm', ['-r', '150', '-f', String(n), '-l', String(n), '-singlefile', '-jpeg', '-jpegopt', 'quality=88', pdf, radice]);
    if (e.status === 0 && existsSync(radice + '.jpg')) file = radice + '.jpg';
    else console.log(`  ! pagina ${n} di ${fascicolo} non disegnata (pdftoppm): la scheda mostra la citazione`);
  }
  pagineFatte.set(chiave, file);
  return file;
}
// il foglio: la pagina vera stretta sulla frase evidenziata (L × A pixel), con l'evidenziatore e il cerchio
function foglio(s, L, A) {
  const file = s.fascicolo && s.pagina && (s.evidenzia || []).length ? paginaPdf(s.fascicolo, s.pagina) : null;
  if (!file) return s.citazione ? `<div class="citazione">«${esc(s.citazione)}»</div>` : '';
  const r = s.evidenzia;
  const x0 = Math.min(...r.map((q) => q.x)), x1 = Math.max(...r.map((q) => q.x + q.w));
  const y0 = Math.min(...r.map((q) => q.y)), y1 = Math.max(...r.map((q) => q.y + q.h));
  const scala = Math.min(1.9, Math.max(0.9, (L - 90) / Math.max(x1 - x0, 480)));
  const tx = Math.max(L - 1241 * scala, Math.min(0, L / 2 - (x0 + x1) / 2 * scala));
  const ty = Math.max(A - 1754 * scala, Math.min(0, A / 2 - (y0 + y1) / 2 * scala));
  return `<div class="foglio" style="height:${A}px"><div class="tela" style="transform:translate(${tx.toFixed(1)}px,${ty.toFixed(1)}px) scale(${scala.toFixed(3)})">
    <img src="${pathToFileURL(file).href}">${r.map((e) => `<b class="evid" style="left:${e.x}px;top:${e.y}px;width:${e.w}px;height:${e.h}px"></b>`).join('')}
    ${s.cerchio ? `<svg class="cerchio" style="left:${s.cerchio.x - 30}px;top:${s.cerchio.y - 30}px;width:${s.cerchio.w + 60}px;height:${s.cerchio.h + 60}px" viewBox="0 0 100 100" preserveAspectRatio="none"><ellipse cx="50" cy="50" rx="46" ry="40"/></svg>` : ''}
  </div></div><div class="fonte">Dal fascicolo della lezione, pagina ${s.pagina}</div>`;
}
const intestazione = (c, destra) => `<div class="alto"><div class="rubrica"><b>${esc(c.rubrica)}</b><span>Anno ${ROMANI[+c.anno] || ''}</span></div>${destra}</div>`;
const piedeMartedi = (c) => `<div class="piede"><div class="uda">${esc(c.titolo)}</div><div class="web">www.labirc.it</div>${c.mascotte ? `<img class="masc" src="${url(`assets/mascotte/svg/${c.mascotte}.svg`)}">` : ''}</div>`;
function martediCopertina(c, totale) {
  const colore = c.colore || ORO;
  const numero = c.rubrica === 'In numeri';
  const parola = c.rubrica === 'Parole con una storia';
  return notte(colore, `<div class="barra-anno"></div>${intestazione(c, `<div class="conta">1/${totale}</div>`)}
<div class="centro">${numero ? `<div class="cifra">${esc(c.copertina.titolo)}</div>` : `<h1 class="${parola ? 'parola' : ''}">${ricco(c.copertina.titolo)}</h1>`}
<p>${ricco(c.copertina.frase)}</p><div class="pillola">Sfoglia &rarr;</div></div>
${piedeMartedi(c)}`, `h1{font-size:118px;line-height:1.02}h1.parola{font-size:190px;line-height:.95}
.cifra{font-size:340px}p{margin:30px 0 40px;font-size:40px}`);
}
function martediScheda(c, i, totale, s) {
  const colore = c.colore || ORO;
  let corpo;
  if (s.tipo === 'numero') {
    corpo = `<div class="cifra">${esc(s.numero || '')}</div><div class="kicker">${esc(s.titolo)}</div><h2>${ricco(s.testo)}</h2>${foglio(s, 888, 250)}`;
  } else if (s.tipo === 'pagina') {
    corpo = `<div class="kicker">${esc(s.titolo)}</div>${foglio(s, 888, 560)}<h2 class="sotto">${ricco(s.testo)}</h2>`;
  } else {
    corpo = `<div class="kicker">${esc(s.titolo)}</div><h2>${ricco(s.testo)}</h2>`;
  }
  return notte(colore, `<div class="barra-anno"></div>${intestazione(c, `<div class="conta">${i}/${totale}</div>`)}
<div class="centro">${corpo}</div>${piedeMartedi(c)}`,
  `.cifra{font-size:230px;line-height:.95}.t-numero h2{font-size:54px}
.foglio{margin-top:26px}h2.sotto{margin-top:30px;font-size:48px}`).replace('<body>', `<body class="t-${s.tipo}">`);
}
function martediFinale(c, totale) {
  const colore = c.colore || ORO;
  return notte(colore, `<div class="barra-anno"></div>${intestazione(c, `<div class="conta">${totale}/${totale}</div>`)}
<div class="centro">
<div class="cinque">${[1, 2, 3, 4, 5].map((n) => `<img src="${url(`assets/mascotte/svg/${MASCOTTE[n]}.svg`)}">`).join('')}</div>
<div class="kicker">${esc(c.finale || 'Per continuare')}</div>
<h2>La lezione completa<br>è su <i>www.labirc.it</i></h2>
<div class="bio">Link nella bio</div></div>
${piedeMartedi(c)}`,
  `.centro{align-items:center;text-align:center}.kicker{justify-content:center}.kicker:before{display:none}
.cinque{display:flex;gap:18px;margin-bottom:40px}.cinque img{width:120px;height:120px}
h2{font-size:84px}.bio{margin-top:30px;font:700 30px Figtree;color:#ECEAF5;background:rgba(255,255,255,.07);border:1.5px solid rgba(227,194,122,.5);border-radius:999px;padding:14px 30px}`);
}

/* ---------- la storia (1080×1920): il post del giorno, con l'invito a guardarlo ----------
   Instagram e Facebook coprono in alto il nome e in basso la barra delle risposte:
   tutto quello che conta sta nella fascia centrale. La copertina si legge dal JPG (i PNG
   non si salvano più): la storia viene sempre dopo la copertina nell'elenco dei lavori. */
const storiaDi = (f) => f.replace(/\.png$/, '-storia.png');
function storia(colore, immagine, etichetta, invito) {
  return pagina(colore, `
<div class="alto">${logo}<div class="tag" style="color:${colore}">${esc(etichetta)}</div></div>
<div class="centro"><img class="post" src="${pathToFileURL(join(CARTELLA, jpg(immagine))).href}"></div>
<div class="invito">${esc(invito)}</div>
<div class="piede"><div class="uda"></div><div class="web">www.labirc.it</div></div>`,
  `html,body{height:1920px}
body{padding:190px 80px 270px}
.tag{font:600 22px Cinzel;letter-spacing:.16em;text-transform:uppercase;border:2px solid currentColor;border-radius:999px;padding:12px 22px}
.centro{flex:1;display:grid;place-items:center;min-height:0}
.post{width:860px;height:auto;border-radius:34px;box-shadow:0 0 0 2px rgba(227,194,122,.45),0 40px 90px rgba(0,0,0,.55);transform:rotate(-1.5deg)}
.invito{text-align:center;font:600 54px/1.15 Cormorant;margin-top:10px}
.piede{justify-content:center;margin-top:26px}`);
}

/* ---------- la vetrina: copertina di Facebook (1640×624) e icone delle storie in evidenza ---------- */
const CANDELE = `.candele{display:flex;gap:70px}
.candele i{position:relative;display:block;width:46px;height:170px;border-radius:10px;background:linear-gradient(180deg,#FBFAFF,#C7C3DA)}
.candele i:before{content:"";position:absolute;left:50%;top:-74px;width:40px;height:66px;margin-left:-20px;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;background:radial-gradient(circle at 50% 70%,#FFF7D6,#FBBF24 55%,#FF7A59);box-shadow:0 0 50px 18px rgba(251,191,36,.45)}`;
function copertinaFacebook() {
  return pagina(ORO, `
<div class="riga"><div class="testo">${logo}
<h1>Il laboratorio di <em>Religione</em></h1>
<p>Lezioni, fascicoli e giochi gratis · dalla prima alla quinta</p>
<div class="web">www.labirc.it</div></div>
<div class="figure"><img class="prof" src="${url('assets/avatar/sorriso.png')}">
<div class="cinque">${[1, 2, 3, 4, 5].map((n) => `<img src="${url(`assets/mascotte/svg/${MASCOTTE[n]}.svg`)}">`).join('')}</div></div></div>`,
  `html,body{width:1640px;height:624px}
body{padding:0 150px}
.bordo{inset:22px;border-radius:30px}
.riga{flex:1;display:flex;align-items:center;justify-content:space-between;gap:60px}
.testo{display:flex;flex-direction:column;gap:22px;max-width:760px}
h1{font-size:84px}
p{margin:0;font-size:30px}
.web{font:700 30px Figtree;color:${ORO}}
.figure{display:flex;flex-direction:column;align-items:center;gap:26px}
.prof{width:300px;height:300px;border-radius:50%;object-fit:cover;box-shadow:0 0 0 7px ${ORO},0 24px 60px rgba(0,0,0,.45)}
.cinque{display:flex;gap:12px}.cinque img{width:78px;height:78px}`);
}
function iconaVetrina(k, titolo) {
  const segni = {
    lezioni: `<div class="cinque">${[1, 2, 3, 4, 5].map((n) => `<img src="${url(`assets/mascotte/svg/${MASCOTTE[n]}.svg`)}">`).join('')}</div>`,
    domanda: '<div class="punto">?</div>',
    shabbat: '<div class="candele"><i></i><i></i></div>',
    prof: `<img class="prof" src="${url('assets/avatar/sorriso.png')}">`,
    come: '<div class="passi"><b>1</b><b>2</b><b>3</b></div>',
    sapevi: '<div class="punto esclama">!</div>',
    giochi: `<div class="blocchi">${['#FF7A59', '#4FB0FF', '#A78BFA', '#FB7BB5', '#FBBF24', '#E3C27A'].map((c) => `<i style="background:${c}"></i>`).join('')}</div>`,
  };
  // niente scritta: Instagram mostra il nome della raccolta sotto il cerchio
  return pagina(ORO, `<div class="centro" title="${esc(titolo)}">${segni[k]}</div>`,
  `html,body{width:1080px;height:1080px}
body{padding:0;align-items:center;justify-content:center;background:radial-gradient(60% 60% at 50% 45%,rgba(139,92,246,.45),transparent 70%),#14131F}
.bordo{inset:110px;border-radius:50%;border:6px solid ${ORO}}
.centro{display:flex;flex-direction:column;align-items:center}
.cinque{display:flex;flex-wrap:wrap;justify-content:center;width:600px;gap:20px 34px}.cinque img{width:170px;height:170px}
.punto{font:600 520px/0.9 Cormorant;color:#FB7BB5;text-shadow:0 0 90px rgba(251,123,181,.6)}
.prof{width:600px;height:600px;border-radius:50%;object-fit:cover}
.esclama{color:#E3C27A;text-shadow:0 0 90px rgba(227,194,122,.55)}
.blocchi{display:grid;grid-template-columns:repeat(3,150px);gap:22px;transform:rotate(-8deg)}.blocchi i{width:150px;height:150px;border-radius:18px;box-shadow:inset 0 -18px 0 rgba(0,0,0,.25),0 18px 40px rgba(0,0,0,.45)}
.passi{display:flex;gap:34px}.passi b{width:170px;height:170px;border-radius:50%;display:grid;place-items:center;font:600 100px Cormorant;color:#14131F;background:${ORO}}
${CANDELE}
.candele{margin-top:80px;transform:scale(1.5)}`);
}

/* ---------- l'elenco di tutto quello che va disegnato ---------- */
// Pulizia: Instagram, Facebook e Telegram tengono una copia loro di ogni post, quindi le
// immagini di un post uscito ovunque da almeno GIORNI_PULIZIA giorni non servono più:
// non si ridisegnano e si cancellano (il sito resta leggero). Si salvano solo in JPG.
const GIORNI_PULIZIA = 2;
const registro = (nome) => (existsSync(join(RADICE, 'data', nome)) ? JSON.parse(readFileSync(join(RADICE, 'data', nome), 'utf8')) : {});
const registroMeta = registro('meta.json'), registroTg = registro('telegram.json');
const limitePulizia = new Date(Date.now() - GIORNI_PULIZIA * 864e5).toISOString().slice(0, 10);
const giaUscito = (chiave) => {
  const m = registroMeta[chiave] || {}, date = [registroTg[chiave], m.facebook, m.instagram];
  return date.every(Boolean) && date.every((d) => d <= limitePulizia);
};
// Si disegnano solo i post che servono: quelli in coda (data/social-coda.json) da oggi in
// poi, più i candidati del piano settimanale (CANDIDATI=.social/candidati.json), che gli
// agenti devono vedere. Le immagini vanno poi su Cloudflare R2 (seo/media_r2.py): nel repo
// non entrano, così niente doppioni; quelle già là non si ridisegnano.
const SERVONO = (() => {
  const chiavi = new Set();
  const coda = registro('social-coda.json');
  const ieri = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
  for (const v of coda.coda || []) if (String(v.quando) >= ieri) chiavi.add(v.chiave);
  if (process.env.CANDIDATI && existsSync(process.env.CANDIDATI)) {
    for (const k of Object.values(JSON.parse(readFileSync(process.env.CANDIDATI, 'utf8')))) chiavi.add(k);
  }
  return chiavi;
})();
const serve = (chiave) => SERVONO.has(chiave) && !giaUscito(chiave);
const R2 = (() => {
  const f = join(RADICE, 'data', 'media-r2.json');
  const limite = new Date(Date.now() - 28 * 864e5).toISOString().slice(0, 10);
  const r = existsSync(f) ? JSON.parse(readFileSync(f, 'utf8')) : {};
  return (file) => Boolean(r[`cartoline/${file}`] && r[`cartoline/${file}`] >= limite);
})();
const lavori = [];
for (const c of leggi('cartoline.json').filter((x) => serve(x.chiave))) {
  const immagini = c.immagini && c.immagini.length ? c.immagini : [c.file];
  lavori.push({ file: immagini[0], html: () => copertina(c), adatta: 'h1' });
  const schede = c.carosello || [];
  const totale = immagini.length;
  schede.forEach((s, k) => lavori.push({ file: immagini[k + 1], html: () => scheda(c, k + 2, totale, s, (c.illustrazioni || [])[k]), adatta: 'h2' }));
  if (schede.length) lavori.push({ file: immagini[totale - 1], html: () => finale(c, totale), v: 2 });
}
// i caroselli del martedì (seo/caroselli.py): stessa chiave della lezione in coda; con PROVINO solo quelli
const caroselliMartedi = PROVINO ? JSON.parse(readFileSync(PROVINO, 'utf8')) : leggi('caroselli.json').filter((x) => serve(x.chiave));
for (const c of caroselliMartedi) {
  const totale = c.immagini.length;
  lavori.push({ file: c.immagini[0], html: () => martediCopertina(c, totale), adatta: 'h1,.cifra' });
  (c.schede || []).forEach((s, k) => lavori.push({ file: c.immagini[k + 1], html: () => martediScheda(c, k + 2, totale, s), adatta: 'h2' }));
  lavori.push({ file: c.immagini[totale - 1], html: () => martediFinale(c, totale) });
}
for (const p of leggi('prof.json').filter((x) => serve(x.chiave))) {
  const vignette = p.vignette || [];
  // senza le illustrazioni del prof (assets/avatar/) le strisce aspettano: meglio nessuna che sgranata
  const manca = vignette.find((v) => !avatarDi(v.posa));
  if (manca) { console.log(`! Manca l'avatar «${manca.posa}» in assets/avatar/: salto la striscia ${p.chiave}.`); continue; }
  vignette.forEach((v, k) => lavori.push({ file: p.immagini[k], html: () => vignetta(p, k + 1, vignette.length, v), adatta: 'h2' }));
}
for (const d of [...leggi('domenica.json'), ...leggi('sabato.json')].filter((x) => serve(x.chiave))) {
  lavori.push({ file: d.file, html: () => domenica(d), adatta: 'h1', v: d.sfondo ? 2 : 1 });
  // il carosello della domenica e del sabato: le schede con i disegni, poi il saluto finale
  const schede = d.carosello || [];
  const totale = (d.immagini || []).length;
  const shabbat = d.formato === 'shabbat';
  const piede = { colore: d.colore || ORO, titolo: shabbat ? `Lo Shabbat del Lab · ${d.titolo}` : d.formato === 'grande-domanda' ? `La grande domanda · ${d.titolo}` : `La domenica del Lab · ${d.tempo}` };
  schede.forEach((s, k) => lavori.push({ file: d.immagini[k + 1], html: () => scheda(piede, k + 2, totale, s, (d.illustrazioni || [])[k]), adatta: 'h2' }));
  const fonti = [...new Set((d.fonti || []).map((f) => { try { return new URL(f.url).hostname.replace(/^www\./, ''); } catch { return ''; } }).filter(Boolean))];
  if (schede.length) lavori.push({ file: d.immagini[totale - 1], v: 2, html: () => finale({
    colore: d.colore || ORO, saluto: shabbat ? 'Shabbat shalom' : 'Buona domenica',
    titolo: shabbat ? `Fonti: ${fonti.join(' · ') || 'fonti ebraiche'}` : d.lezione,
    invito: shabbat ? 'Il laboratorio di Religione<br>è su <em>www.labirc.it</em>'
      : d.formato === 'grande-domanda' ? `${(d.lezioni || []).length > 1 ? 'Le lezioni complete<br>sono' : 'La lezione completa<br>è'} su <em>www.labirc.it</em>` : '' }, totale) });
}
// le storie vengono per ultime (mostrano la copertina appena disegnata), solo in JPG
// e solo per i post non ancora usciti su Facebook e Instagram
const daRaccontare = (chiave) => !(registroMeta[chiave] && registroMeta[chiave].facebook && registroMeta[chiave].instagram);
const prima_ = lavori.length;
for (const c of leggi('cartoline.json').filter((x) => serve(x.chiave) && daRaccontare(x.chiave))) {
  const prima = (c.immagini && c.immagini[0]) || c.file;
  lavori.push({ file: storiaDi(prima), alto: 1920, html: () => storia(c.colore || ORO, prima,
    c.anno ? `Nuova lezione · classe ${c.classe}` : 'Religione Cattolica', 'Il post completo è sul profilo') });
}
for (const c of caroselliMartedi.filter((x) => PROVINO || daRaccontare(x.chiave))) {
  lavori.push({ file: storiaDi(c.immagini[0]), alto: 1920, html: () => storia(c.colore || ORO, c.immagini[0], esc(c.rubrica), 'Il carosello completo è sul profilo') });
}
for (const p of leggi('prof.json').filter((x) => serve(x.chiave) && daRaccontare(x.chiave))) {
  if (!lavori.some((l) => l.file === p.immagini[0])) continue;
  lavori.push({ file: storiaDi(p.immagini[0]), alto: 1920, html: () => storia(COLORI[p.anno] || '#22D3EE', p.immagini[0], `Il prof del Lab · ${p.formato}`, 'Il post completo è sul profilo') });
}
for (const d of [...leggi('domenica.json'), ...leggi('sabato.json')].filter((x) => serve(x.chiave) && daRaccontare(x.chiave))) lavori.push({ file: storiaDi(d.file), alto: 1920, v: d.sfondo ? 2 : 1, html: () => storia(d.colore || ORO, d.file, d.formato === 'shabbat' ? 'Lo Shabbat del Lab' : d.formato === 'grande-domanda' ? 'La grande domanda' : 'La domenica del Lab', d.carosello && d.carosello.length ? 'La risposta è nel carosello sul profilo' : 'Buona domenica dal Lab') });
for (const l of lavori) l.soloJpg = true;   // solo JPG: i PNG pesavano il doppio e non li usa nessuno

{
  const vetrina = existsSync(join(RADICE, 'promozione', 'vetrina.json')) ? JSON.parse(readFileSync(join(RADICE, 'promozione', 'vetrina.json'), 'utf8')) : null;
  if (vetrina) {
    lavori.push({ file: vetrina.copertina_facebook, largo: 1640, alto: 624, html: copertinaFacebook });
    if (vetrina.storia && vetrina.benvenuto) lavori.push({ file: vetrina.storia, alto: 1920, soloJpg: true,
      html: () => storia(ORO, vetrina.benvenuto.file, 'Benvenuto nel Lab', 'Ogni giorno di scuola una lezione: seguici!') });
    for (const i of vetrina.icone || []) lavori.push({ file: i.file, largo: 1080, alto: 1080, html: () => iconaVetrina(i.chiave, i.titolo) });
  }
}

mkdirSync(CARTELLA, { recursive: true });
if (PROVINO) lavori.splice(0, lavori.length, ...lavori.filter((l) => caroselliMartedi.some((c) => c.immagini.includes(l.file) || storiaDi(c.immagini[0]) === l.file)));
const attese = new Set(lavori.flatMap((l) => (l.soloJpg ? [jpg(l.file)] : [l.file, jpg(l.file)])));
if (!PROVINO) for (const f of readdirSync(CARTELLA)) if (/\.(png|jpg)$/.test(f) && !attese.has(f)) unlinkSync(join(CARTELLA, f));

// Quando cambia la grafica di un tipo di immagine (il suo «v»), quelle già disegnate si rifanno:
// promozione/cartoline/versioni.json ricorda con che versione è stata disegnata ciascuna
const VERSIONI = join(CARTELLA, 'versioni.json');
const versioni = existsSync(VERSIONI) ? JSON.parse(readFileSync(VERSIONI, 'utf8')) : {};
const vecchia = (l) => (versioni[l.file] || 1) !== (l.v || 1);
const daFare = PROVINO ? lavori : lavori.filter((l) => vecchia(l) || (!R2(jpg(l.file)) && ((!l.soloJpg && !existsSync(join(CARTELLA, l.file))) || !existsSync(join(CARTELLA, jpg(l.file))))));
const salvaVersioni = () => {
  const tieni = Object.fromEntries(lavori.filter((l) => (l.v || 1) > 1 && !vecchia(l)).map((l) => [l.file, l.v]));
  writeFileSync(VERSIONI, JSON.stringify(tieni, null, 1) + '\n');
};
if (!daFare.length) { salvaVersioni(); console.log('Immagini già pronte: niente da disegnare.'); process.exit(0); }
if (!existsSync(PW) || !existsSync(CHROME)) {
  console.log(`! Manca Playwright o il browser: salto ${daFare.length} immagini.`);
  process.exit(0);
}

const pw = (await import(pathToFileURL(PW).href)).default;
const browser = await pw.chromium.launch({ executablePath: CHROME });
const scheda_ = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
// Ogni immagine si apre da un file: così il browser può leggere font, mascotte e avatar del sito
var lavoro = mkdtempSync(join(tmpdir(), 'cartoline-'));
for (const l of daFare) {
  writeFileSync(join(lavoro, 'cartolina.html'), l.html());
  const alto = l.alto || 1350, largo = l.largo || 1080;
  if (scheda_.viewportSize().height !== alto || scheda_.viewportSize().width !== largo) await scheda_.setViewportSize({ width: largo, height: alto });
  await scheda_.goto(pathToFileURL(join(lavoro, 'cartolina.html')).href, { waitUntil: 'load' });
  await scheda_.evaluate(async ([sel, alto]) => {
    await document.fonts.ready;
    // Testi lunghi: rimpicciolisce finché tutto sta nell'immagine
    const t = sel && document.querySelector(sel);
    if (!t) return;
    let px = parseFloat(getComputedStyle(t).fontSize);
    while (px > 40 && document.body.scrollHeight > alto) { px -= 3; t.style.fontSize = px + 'px'; }
    // le schede «pagina» e «numero» dei caroselli: se non basta, si stringe anche il foglio
    const f = document.querySelector('.foglio');
    let h = f ? parseFloat(f.style.height) : 0;
    while (f && h > 220 && document.body.scrollHeight > alto) { h -= 20; f.style.height = h + 'px'; }
  }, [l.adatta || '', alto]);
  if (!l.soloJpg) await scheda_.screenshot({ path: join(CARTELLA, l.file) });
  await scheda_.screenshot({ path: join(CARTELLA, jpg(l.file)), type: 'jpeg', quality: 90 });
  versioni[l.file] = l.v || 1;
  console.log('  ✓', l.soloJpg ? jpg(l.file) : l.file);
}
await browser.close();
salvaVersioni();
rmSync(lavoro, { recursive: true, force: true });
console.log(`Immagini disegnate: ${daFare.length}`);
