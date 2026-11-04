#!/usr/bin/env node
/*
 * seo/storie.mjs — Disegna una storia verticale (1080 × 1920, JPG) nello stile «Notte del Lab».
 *
 *   node seo/storie.mjs scheda.json uscita.jpg
 *
 * scheda.json: {"sopra": "Mercoledì 11 novembre", "titolo": "Oggi: *San Martino*",
 *               "testo": "…", "piede": "Stasera alle 19 · labirc.it", "anno": "2",
 *               "posa": "sorriso", "mascotte": "2-ichthy"}
 * *parola* = in corsivo oro. Le storie non hanno link nel testo e non fanno domande a quiz.
 */
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const RADICE = process.env.LAB_RADICE || join(dirname(fileURLToPath(import.meta.url)), '..');
const PW = process.env.PW_MODULE || '/opt/node22/lib/node_modules/playwright/index.js';
const CHROME = process.env.CHROME_PATH || '/opt/pw-browsers/chromium';
const COLORI = { 1: '#FF7A59', 2: '#4FB0FF', 3: '#A78BFA', 4: '#FB7BB5', 5: '#FBBF24' };
const url = (p) => pathToFileURL(join(RADICE, p)).href;
const esc = (s) => String(s || '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const ricco = (s) => esc(s).replace(/\*([^*]+)\*/g, '<i>$1</i>');
const primo = (...f) => f.find((x) => x && existsSync(join(RADICE, x))) || '';

const [, , ingresso, uscita] = process.argv;
if (!ingresso || !uscita) { console.error('uso: node seo/storie.mjs scheda.json uscita.jpg'); process.exit(2); }
const s = JSON.parse(readFileSync(ingresso, 'utf8'));
const colore = COLORI[s.anno] || '#E3C27A';
const avatar = primo(...['png', 'jpg'].map((e) => `assets/avatar/${s.posa || 'sorriso'}.${e}`), 'assets/avatar/sorriso.png', 'assets/avatar/sorriso.jpg');
const mascotte = s.mascotte ? primo(`assets/mascotte/svg/${s.mascotte}.svg`) : '';

const html = `<!doctype html><html lang="it"><head><meta charset="utf-8"><style>
@font-face{font-family:Cormorant;font-weight:600;src:url(${url('design-system/fonts/cormorant-garamond-latin-600-normal.woff2')})}
@font-face{font-family:Cormorant;font-weight:500;font-style:italic;src:url(${url('design-system/fonts/cormorant-garamond-latin-500-italic.woff2')})}
@font-face{font-family:Cinzel;font-weight:600;src:url(${url('design-system/fonts/cinzel-latin-600-normal.woff2')})}
@font-face{font-family:Figtree;font-weight:700;src:url(${url('design-system/fonts/figtree-latin-700-normal.woff2')})}
html,body{margin:0;width:1080px;height:1920px;overflow:hidden;background:#14131F;color:#ECEAF5;font-family:Figtree}
.vetrata{position:absolute;inset:0;background:radial-gradient(90% 45% at 100% 0%,${colore}55,transparent 62%),radial-gradient(70% 40% at 0% 10%,rgba(139,92,246,.35),transparent 62%),radial-gradient(80% 40% at 50% 100%,rgba(34,211,238,.12),transparent 70%),#14131F}
.barra{position:absolute;left:0;top:0;bottom:0;width:10px;background:${colore}}
.cornice{position:absolute;left:90px;right:90px;top:250px;bottom:330px;display:flex;flex-direction:column;justify-content:center}
.sopra{font:600 32px Cinzel;letter-spacing:.18em;text-transform:uppercase;color:#E3C27A;margin-bottom:36px}
h1{font:600 132px/1 Cormorant;margin:0;text-wrap:balance;font-variant-numeric:lining-nums}
h1 i{font-style:italic;font-weight:500;color:#E3C27A}
.testo{margin-top:44px;font:700 46px/1.3 Figtree;color:#D9D6E8;text-wrap:pretty}
.masc{width:190px;margin-bottom:40px}
.piede{position:absolute;left:90px;right:90px;bottom:170px;display:flex;align-items:center;gap:30px}
.piede img{width:150px;height:150px;border-radius:50%;object-fit:cover;box-shadow:0 0 0 6px #E3C27A,0 20px 50px rgba(0,0,0,.5)}
.piede div{font:700 38px/1.25 Figtree;color:#ECEAF5}.piede b{display:block;font:600 26px Cinzel;letter-spacing:.14em;color:#8E89A6;text-transform:uppercase;margin-top:8px}
</style></head><body><div class="vetrata"></div><div class="barra"></div>
<div class="cornice">${mascotte ? `<img class="masc" src="${url(mascotte)}">` : ''}
<div class="sopra">${esc(s.sopra)}</div><h1>${ricco(s.titolo)}</h1>${s.testo ? `<div class="testo">${ricco(s.testo)}</div>` : ''}</div>
<div class="piede">${avatar ? `<img src="${url(avatar)}">` : ''}<div>${ricco(s.piede || 'labirc.it')}<b>Lab IRC</b></div></div>
</body></html>`;

const pw = (await import(pathToFileURL(PW).href)).default;
const browser = await pw.chromium.launch({ executablePath: CHROME });
const pg = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
// da un file vero: da una pagina vuota il browser non carica font e immagini locali
const lavoro = mkdtempSync(join(tmpdir(), 'storia-'));
writeFileSync(join(lavoro, 's.html'), html);
await pg.goto(pathToFileURL(join(lavoro, 's.html')).href, { waitUntil: 'load' });
await pg.evaluate(() => document.fonts.ready);
writeFileSync(uscita, await pg.screenshot({ type: 'jpeg', quality: 90 }));
await browser.close();
rmSync(lavoro, { recursive: true, force: true });
console.log(`storia: ${uscita}`);
