// seo/cartoline.mjs — Disegna le cartoline per Instagram (1080×1350) del kit social.
//
// Legge promozione/cartoline.json (scritto da seo/promozione.py) e crea in
// promozione/cartoline/ un'immagine per ogni post, nello stile del sito
// (in PNG, e in JPG per Instagram, che accetta solo quel formato):
// font del sito, colore e mascotte della classe. Disegna solo le cartoline
// che mancano e cancella quelle non più in elenco.
//
// Uso:  PW_MODULE=<percorso di playwright-core/index.js> CHROME_PATH=<chrome> node seo/cartoline.mjs
// (senza variabili usa il Playwright e il Chromium di questo computer, se ci sono)

import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, unlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const RADICE = join(dirname(fileURLToPath(import.meta.url)), '..');
const CARTELLA = join(RADICE, 'promozione', 'cartoline');
const PW = process.env.PW_MODULE || '/opt/node22/lib/node_modules/playwright/index.js';
const CHROME = process.env.CHROME_PATH || '/opt/pw-browsers/chromium';

const elenco = JSON.parse(readFileSync(join(RADICE, 'promozione', 'cartoline.json'), 'utf8'));
mkdirSync(CARTELLA, { recursive: true });

// Le cartoline non più in elenco (lezioni rinominate o testi riscritti) se ne vanno
const jpg = (f) => f.replace(/\.png$/, '.jpg');
const attese = new Set(elenco.flatMap((c) => [c.file, jpg(c.file)]));
for (const f of readdirSync(CARTELLA)) if (/\.(png|jpg)$/.test(f) && !attese.has(f)) unlinkSync(join(CARTELLA, f));

const daFare = elenco.filter((c) => !existsSync(join(CARTELLA, c.file)) || !existsSync(join(CARTELLA, jpg(c.file))));
if (!daFare.length) { console.log('Cartoline già pronte: niente da disegnare.'); process.exit(0); }
if (!existsSync(PW) || !existsSync(CHROME)) {
  console.log(`! Manca Playwright o il browser: salto ${daFare.length} cartoline.`);
  process.exit(0);
}

const url = (rel) => pathToFileURL(join(RADICE, rel)).href;
const esc = (s) => String(s || '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const ROMANI = { 1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V' };
const COLORI = { 1: '#FF7A59', 2: '#4FB0FF', 3: '#A78BFA', 4: '#FB7BB5', 5: '#FBBF24' };

function html(c) {
  const sito = !c.anno;
  const colore = c.colore || '#E3C27A';
  const mascotte = sito
    ? `<div class="cinque">${[1, 2, 3, 4, 5].map((n) => `<img src="${url(`assets/mascotte/svg/${['', '1-semino', '2-ichthy', '3-navicella', '4-bussolina', '5-terra'][n]}.svg`)}">`).join('')}</div>`
    : `<img class="una" src="${url(`assets/mascotte/svg/${c.mascotte}.svg`)}">`;
  const anni = sito
    ? `<div class="anni">${[1, 2, 3, 4, 5].map((n) => `<span style="color:${COLORI[n]}">${ROMANI[n]}</span>`).join('')}</div>`
    : `<div class="anni"><span style="color:${colore}">${ROMANI[c.anno]}</span></div>`;
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
.bordo{position:absolute;inset:28px;border:1.5px solid rgba(227,194,122,.45);border-radius:40px}
.alto{display:flex;justify-content:space-between;align-items:center}
.logo{display:flex;align-items:center;gap:18px}
.logo i{width:68px;height:68px;border-radius:20px;background:linear-gradient(135deg,#8B5CF6,#22D3EE);display:grid;place-items:center;font:600 40px Cormorant;font-style:normal;color:#fff}
.logo b{font:600 42px Cormorant}.logo b span{background:linear-gradient(135deg,#A78BFA,#22D3EE);-webkit-background-clip:text;color:transparent}
.anni{display:flex;gap:10px}
.anni span{font:600 24px Cinzel;min-width:58px;height:58px;padding:0 6px;box-sizing:border-box;border-radius:29px;display:grid;place-items:center;border:2px solid currentColor}
.figura{flex:1;display:grid;place-items:center;min-height:0}
.una{width:330px;height:330px;filter:drop-shadow(0 18px 40px rgba(0,0,0,.35))}
.cinque{display:flex;flex-wrap:wrap;justify-content:center;width:620px;gap:14px 34px}
.cinque img{width:170px;height:170px}
.eb{font:600 22px Cinzel;letter-spacing:.2em;text-transform:uppercase;color:${colore};display:flex;align-items:center;gap:16px;margin-bottom:22px}
.eb:before{content:"";width:48px;height:2px;background:currentColor}
h1{margin:0;font:600 92px/1.04 Cormorant;letter-spacing:-.01em;text-wrap:balance}
h1 em{font-style:italic;font-weight:500;background:linear-gradient(135deg,#A78BFA,#22D3EE);-webkit-background-clip:text;color:transparent}
p{margin:26px 0 0;font:500 31px/1.42 Figtree;color:#C7C3DA;text-wrap:pretty}
.piede{margin-top:44px;display:flex;justify-content:space-between;align-items:flex-end;gap:30px;font-size:22px}
.piede .uda{color:#9A96B3;font-weight:500;max-width:600px;line-height:1.35}
.piede .web{font-weight:700;font-size:28px;color:#E3C27A;letter-spacing:.02em;white-space:nowrap}
</style></head><body><div class="bordo"></div>
<div class="alto"><div class="logo"><i>L</i><b>Lab <span>IRC</span></b></div>${anni}</div>
<div class="figura">${mascotte}</div>
<div class="testo"><div class="eb">${sito ? 'Religione Cattolica' : `Religione · classe ${esc(c.classe)}`}</div>
<h1>${sito ? 'Il laboratorio di <em>Religione</em>' : esc(c.titolo)}</h1>
<p>${esc(c.frase)}</p></div>
<div class="piede"><div class="uda">${sito ? 'Lezioni, fascicoli e giochi di verifica, dalla prima alla quinta' : esc(c.uda)}</div><div class="web">www.labirc.it</div></div>
</body></html>`;
}

const pw = (await import(pathToFileURL(PW).href)).default;
const browser = await pw.chromium.launch({ executablePath: CHROME });
const pagina = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
// La cartolina si apre da un file: così il browser può leggere font e mascotte del sito
const lavoro = mkdtempSync(join(tmpdir(), 'cartoline-'));
for (const c of daFare) {
  writeFileSync(join(lavoro, 'cartolina.html'), html(c));
  await pagina.goto(pathToFileURL(join(lavoro, 'cartolina.html')).href, { waitUntil: 'load' });
  await pagina.evaluate(async () => {
    await document.fonts.ready;
    // Titoli lunghi: rimpicciolisce finché tutto sta nella cartolina
    const h1 = document.querySelector('h1');
    let px = 92;
    while (px > 54 && (document.body.scrollHeight > 1350 || h1.getBoundingClientRect().height > px * 1.04 * 3 + 2)) {
      px -= 4; h1.style.fontSize = px + 'px';
    }
  });
  await pagina.screenshot({ path: join(CARTELLA, c.file) });
  await pagina.screenshot({ path: join(CARTELLA, jpg(c.file)), type: 'jpeg', quality: 90 });
  console.log('  ✓ cartolina', c.file);
}
await browser.close();
rmSync(lavoro, { recursive: true, force: true });
console.log(`Cartoline disegnate: ${daFare.length}`);
