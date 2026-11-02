// seo/reel.mjs — Monta il video del reel del giovedì (1080×1920, 30 secondi, MP4).
//
// Legge promozione/reel.json (scritto da seo/reel.py) e, se il video manca, lo
// crea in promozione/reel/: una pagina animata nello stile del sito (gancio,
// una scena per scheda del carosello con la sua illustrazione, invito al sito)
// fotografata fotogramma per fotogramma e montata con ffmpeg (H.264, con una
// traccia audio muta, come vogliono Instagram e Facebook). I video non più in
// elenco vengono cancellati.
//
// Uso:  PW_MODULE=<playwright-core/index.js> CHROME_PATH=<chrome> node seo/reel.mjs
// (ffmpeg deve esserci; FFMPEG=<percorso> per usarne un altro)

import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, unlinkSync, writeFileSync, copyFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const RADICE = join(dirname(fileURLToPath(import.meta.url)), '..');
const CARTELLA = join(RADICE, 'promozione', 'reel');
const PW = process.env.PW_MODULE || '/opt/node22/lib/node_modules/playwright/index.js';
const CHROME = process.env.CHROME_PATH || '/opt/pw-browsers/chromium';
const FFMPEG = process.env.FFMPEG || 'ffmpeg';
const FPS = 30;
const L = 1080, A = 1920;

const elencoFile = join(RADICE, 'promozione', 'reel.json');
const elenco = existsSync(elencoFile) ? JSON.parse(readFileSync(elencoFile, 'utf8')) : [];
mkdirSync(CARTELLA, { recursive: true });
const attesi = new Set(elenco.map((r) => r.video));
for (const f of readdirSync(CARTELLA)) if (/\.mp4$/.test(f) && !attesi.has(f)) { unlinkSync(join(CARTELLA, f)); console.log('  - tolto', f); }

const daFare = elenco.filter((r) => !existsSync(join(CARTELLA, r.video)));
if (!daFare.length) { console.log('Reel: niente da montare.'); process.exit(0); }
if (!existsSync(PW) || !existsSync(CHROME)) { console.log('! Manca Playwright o il browser: salto il reel.'); process.exit(0); }

const url = (rel) => pathToFileURL(join(RADICE, rel)).href;
const esc = (s) => String(s || '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const MASCOTTE = ['', '1-semino', '2-ichthy', '3-navicella', '4-bussolina', '5-terra'];
const ORO = '#E3C27A';

// I tempi delle scene, in secondi: gancio, una scena per scheda, invito finale
const T_GANCIO = 3.6, T_SCENA = 4.6, T_FINE = 3.8, T_PASSAGGIO = 0.45;

function pagina(r) {
  const colore = r.colore || ORO;
  const n = r.scene.length;
  const durata = T_GANCIO + n * T_SCENA + T_FINE;
  const scene = r.scene.map((s, i) => {
    const disegno = s.disegno && existsSync(join(RADICE, s.disegno))
      ? `<div class="disegno"><img src="${url(s.disegno)}"></div>`
      : `<div class="disegno vuoto"><img src="${url(`assets/mascotte/svg/${r.mascotte || MASCOTTE[+r.anno] || MASCOTTE[1]}.svg`)}"></div>`;
    return `<section class="scena" data-i="${i + 1}">
  <div class="conta" style="color:${colore}">${i + 1}<span>/${n}</span></div>
  ${disegno}
  <div class="eb">${esc(s.titolo)}</div>
  <h2>${esc(s.testo)}</h2></section>`;
  }).join('\n');
  return `<!doctype html><html lang="it"><head><meta charset="utf-8"><style>
@font-face{font-family:Cormorant;font-weight:600;src:url(${url('design-system/fonts/cormorant-garamond-latin-600-normal.woff2')})}
@font-face{font-family:Cormorant;font-weight:500;font-style:italic;src:url(${url('design-system/fonts/cormorant-garamond-latin-500-italic.woff2')})}
@font-face{font-family:Cinzel;font-weight:600;src:url(${url('design-system/fonts/cinzel-latin-600-normal.woff2')})}
@font-face{font-family:Figtree;font-weight:500;src:url(${url('design-system/fonts/figtree-latin-500-normal.woff2')})}
@font-face{font-family:Figtree;font-weight:700;src:url(${url('design-system/fonts/figtree-latin-700-normal.woff2')})}
html,body{margin:0;width:${L}px;height:${A}px;overflow:hidden;background:#14131F}
body{position:relative;color:#ECEAF5;font-family:Figtree}
.fondo{position:absolute;inset:-10%;background:radial-gradient(60% 40% at 15% 10%,rgba(139,92,246,.38),transparent 65%),radial-gradient(60% 40% at 90% 90%,${colore}38,transparent 65%)}
.bordo{position:absolute;inset:28px;border:1.5px solid rgba(227,194,122,.45);border-radius:44px}
.barra{position:absolute;left:80px;right:80px;top:150px;height:8px;border-radius:4px;background:rgba(255,255,255,.12);overflow:hidden}
.barra i{display:block;height:100%;width:100%;background:linear-gradient(90deg,#8B5CF6,#22D3EE);transform-origin:left;transform:scaleX(0)}
.alto{position:absolute;left:80px;right:80px;top:190px;display:flex;justify-content:space-between;align-items:center}
.logo{display:flex;align-items:center;gap:18px}
.logo i{width:72px;height:72px;border-radius:21px;background:linear-gradient(135deg,#8B5CF6,#22D3EE);display:grid;place-items:center;font:600 42px Cormorant;font-style:normal;color:#fff}
.logo b{font:600 46px Cormorant}.logo b span{background:linear-gradient(135deg,#A78BFA,#22D3EE);-webkit-background-clip:text;color:transparent}
.classe{font:600 24px Cinzel;letter-spacing:.16em;text-transform:uppercase;color:${colore};border:2px solid currentColor;border-radius:999px;padding:12px 24px}
section{position:absolute;left:80px;right:80px;top:320px;bottom:330px;display:flex;flex-direction:column;justify-content:center;opacity:0}
.gancio{align-items:flex-start}
.gancio .eb,.scena .eb{font:600 26px Cinzel;letter-spacing:.2em;text-transform:uppercase;color:${colore};display:flex;align-items:center;gap:16px;margin-bottom:30px}
.gancio .eb:before,.scena .eb:before{content:"";width:56px;height:2px;background:currentColor;flex:none}
.gancio h1{margin:0;font:600 112px/1.04 Cormorant;letter-spacing:-.01em;text-wrap:balance}
.gancio .tit{margin-top:44px;font:500 38px/1.35 Figtree;color:#C7C3DA}
.gancio .mascotte{width:300px;height:300px;margin-bottom:50px;filter:drop-shadow(0 20px 44px rgba(0,0,0,.4))}
.gancio .trenta{margin-top:56px;font:700 30px Figtree;color:#14131F;background:${ORO};border-radius:999px;padding:14px 30px}
.conta{font:600 40px Cinzel;letter-spacing:.08em;margin-bottom:26px}.conta span{opacity:.55;font-size:28px}
.disegno{background:rgba(255,255,255,.04);border:1.5px solid rgba(227,194,122,.3);border-radius:36px;padding:22px;margin-bottom:46px;overflow:hidden}
.disegno img{display:block;width:100%;height:auto;max-height:600px;object-fit:contain}
.disegno.vuoto{display:grid;place-items:center;height:420px}.disegno.vuoto img{width:340px;height:340px}
.scena h2{margin:0;font:600 70px/1.14 Cormorant;text-wrap:pretty}
.fine{align-items:center;text-align:center}
.fine .cinque{display:flex;gap:20px;margin-bottom:54px}.fine .cinque img{width:140px;height:140px}
.fine h2{margin:0;font:600 86px/1.08 Cormorant}.fine h2 em{font-style:italic;font-weight:500;color:${ORO}}
.fine p{margin:34px 0 0;font:500 36px/1.4 Figtree;color:#C7C3DA}
.fine .bio{margin-top:50px;font:700 38px Figtree;background:rgba(255,255,255,.08);border:2px solid rgba(227,194,122,.6);border-radius:999px;padding:20px 40px}
</style></head><body>
<div class="fondo"></div><div class="bordo"></div>
<div class="barra"><i></i></div>
<div class="alto"><div class="logo"><i>L</i><b>Lab <span>IRC</span></b></div><div class="classe">Classe ${esc(r.classe)}</div></div>
<section class="gancio">
  <img class="mascotte" src="${url(`assets/mascotte/svg/${r.mascotte || MASCOTTE[+r.anno] || MASCOTTE[1]}.svg`)}">
  <div class="eb">Religione · la lezione in 30 secondi</div>
  <h1>${esc(r.gancio)}</h1>
  <div class="tit">${esc(r.titolo)}</div>
</section>
${scene}
<section class="fine">
  <div class="cinque">${[1, 2, 3, 4, 5].map((k) => `<img src="${url(`assets/mascotte/svg/${MASCOTTE[k]}.svg`)}">`).join('')}</div>
  <h2>La lezione completa<br>è su <em>www.labirc.it</em></h2>
  <p>Slide, fascicolo e attività,<br>gratis per tutti i colleghi</p>
  <div class="bio">Link nella bio</div>
</section>
<script>
// Tutte le animazioni su un'unica linea del tempo, ferma: il montatore la sposta fotogramma per fotogramma
window.DURATA = ${durata * 1000};
const P = ${T_PASSAGGIO * 1000};
const opz = (inizio, durata) => ({ delay: inizio, duration: durata, fill: 'both', easing: 'ease-out' });
function scena(el, inizio, durata, ultima) {
  // entra salendo, resta, esce sfumando (l'ultima non esce)
  el.animate([{ opacity: 0, transform: 'translateY(60px)' }, { opacity: 1, transform: 'none' }], opz(inizio, P * 1.4));
  if (!ultima) el.animate([{ opacity: 1 }, { opacity: 0 }], { delay: inizio + durata - P, duration: P, fill: 'forwards' });
  return inizio + durata;
}
let t = 0;
const g = document.querySelector('.gancio');
t = scena(g, 0, ${T_GANCIO * 1000});
g.querySelector('.mascotte').animate([{ transform: 'scale(.4) rotate(-12deg)' }, { transform: 'scale(1.08)' }, { transform: 'none' }], opz(150, 700));
g.querySelector('.tit').animate([{ opacity: 0 }, { opacity: 1 }], opz(900, 600));
document.querySelectorAll('.scena').forEach((s) => {
  const inizio = t;
  t = scena(s, inizio, ${T_SCENA * 1000});
  const img = s.querySelector('.disegno img');
  if (img) img.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.07)' }], { delay: inizio, duration: ${T_SCENA * 1000}, fill: 'both', easing: 'linear' });
  s.querySelector('h2').animate([{ opacity: 0, transform: 'translateY(30px)' }, { opacity: 1, transform: 'none' }], opz(inizio + 350, 600));
});
const f = document.querySelector('.fine');
scena(f, t, ${T_FINE * 1000}, true);
f.querySelectorAll('.cinque img').forEach((m, k) => m.animate([{ transform: 'translateY(80px) scale(.5)', opacity: 0 }, { transform: 'none', opacity: 1 }], opz(t + 150 + k * 110, 500)));
f.querySelector('.bio').animate([{ transform: 'scale(1)' }, { transform: 'scale(1.06)' }, { transform: 'scale(1)' }], { delay: t + 1400, duration: 1200, iterations: 2, fill: 'both' });
document.querySelector('.barra i').animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: window.DURATA, fill: 'both', easing: 'linear' });
document.getAnimations().forEach((a) => a.pause());
window.vai = (ms) => document.getAnimations().forEach((a) => { a.currentTime = ms; });
</script></body></html>`;
}

function monta(uscita) {
  // ffmpeg riceve i fotogrammi in JPG dallo standard input e aggiunge l'audio muto
  const ff = spawn(FFMPEG, ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-i', '-',
    '-f', 'lavfi', '-i', 'anullsrc=r=48000:cl=stereo', '-shortest',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '21', '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-r', String(FPS),
    '-c:a', 'aac', '-b:a', '96k', '-movflags', '+faststart', uscita], { stdio: ['pipe', 'inherit', 'inherit'] });
  const fine = new Promise((ok, ko) => ff.on('close', (c) => (c === 0 ? ok() : ko(new Error(`ffmpeg è uscito con ${c}`)))));
  return { ff, fine };
}

const pw = (await import(pathToFileURL(PW).href)).default;
const browser = await pw.chromium.launch({ executablePath: CHROME });
const scheda = await browser.newPage({ viewport: { width: L, height: A } });
const lavoro = mkdtempSync(join(tmpdir(), 'reel-'));
try {
  for (const r of daFare) {
    writeFileSync(join(lavoro, 'reel.html'), pagina(r));
    await scheda.goto(pathToFileURL(join(lavoro, 'reel.html')).href, { waitUntil: 'load' });
    const durata = await scheda.evaluate(async () => {
      await document.fonts.ready;
      // testi lunghi: rimpiccioliti finché ogni scena sta nel suo spazio
      for (const s of document.querySelectorAll('section')) {
        const t = s.querySelector('h1, h2');
        let px = parseFloat(getComputedStyle(t).fontSize);
        s.style.opacity = 1;
        while (px > 40 && s.scrollHeight > s.clientHeight + 2) { px -= 3; t.style.fontSize = px + 'px'; }
        s.style.opacity = '';
      }
      return window.DURATA;
    });
    const fotogrammi = Math.ceil((durata / 1000) * FPS);
    const provvisorio = join(lavoro, 'reel.mp4');
    const { ff, fine } = monta(provvisorio);
    for (let k = 0; k < fotogrammi; k++) {
      await scheda.evaluate((ms) => window.vai(ms), (k * 1000) / FPS);
      const jpg = await scheda.screenshot({ type: 'jpeg', quality: 92 });
      if (!ff.stdin.write(jpg)) await new Promise((ok) => ff.stdin.once('drain', ok));
    }
    ff.stdin.end();
    await fine;
    copyFileSync(provvisorio, join(CARTELLA, r.video));
    console.log(`  ✓ reel ${r.video} (${fotogrammi} fotogrammi, ${(durata / 1000).toFixed(1)} s)`);
  }
} finally {
  await browser.close();
  rmSync(lavoro, { recursive: true, force: true });
}
