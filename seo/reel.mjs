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

// il reel del giovedì (seo/reel.py) e i video della domenica (seo/rubriche.py)
const leggi = (nome) => { const f = join(RADICE, 'promozione', nome); return existsSync(f) ? JSON.parse(readFileSync(f, 'utf8')) : []; };
const elenco = [...leggi('reel.json'), ...leggi('reel-domenica.json'), ...leggi('reel-vetrina.json')];
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
const T_GANCIO = 3.8, T_SCENA = 4.6, T_FINE = 3.8, T_PASSAGGIO = 0.4;
// Le espressioni del prof, scena dopo scena (assets/avatar/<posa>.png)
const POSE = ['spiega', 'sorpreso', 'sorriso', 'buffo', 'spiega', 'pensieroso', 'sorriso', 'sorpreso'];

/* Il video è una striscia a fumetti animata: in basso il prof (il suo avatar, che cambia
   espressione) e la mascotte della classe; sopra, il fumetto di chi parla e, se c'è,
   il disegno della scheda. La mascotte fa la domanda, il prof risponde. */
function pagina(r) {
  const colore = r.colore || ORO;
  const n = r.scene.length;
  const durata = T_GANCIO + n * T_SCENA + T_FINE;
  const mascotte = url(`assets/mascotte/svg/${r.mascotte || MASCOTTE[+r.anno] || MASCOTTE[1]}.svg`);
  const pose = ['pensieroso', ...r.scene.map((_, i) => POSE[i % POSE.length]), 'ride'];
  const disegno = (s) => (s.disegno && existsSync(join(RADICE, s.disegno)) ? `<div class="disegno"><img src="${url(s.disegno)}"></div>` : '');
  const scene = r.scene.map((s, i) => `<section class="scena da-prof">
  ${disegno(s)}
  <div class="fumetto"><div class="eb">${i + 1}/${n} · ${esc(s.titolo)}</div><h2>${esc(s.testo)}</h2></div></section>`).join('\n');
  return `<!doctype html><html lang="it"><head><meta charset="utf-8"><style>
@font-face{font-family:Cormorant;font-weight:600;src:url(${url('design-system/fonts/cormorant-garamond-latin-600-normal.woff2')})}
@font-face{font-family:Cormorant;font-weight:500;font-style:italic;src:url(${url('design-system/fonts/cormorant-garamond-latin-500-italic.woff2')})}
@font-face{font-family:Cinzel;font-weight:600;src:url(${url('design-system/fonts/cinzel-latin-600-normal.woff2')})}
@font-face{font-family:Figtree;font-weight:500;src:url(${url('design-system/fonts/figtree-latin-500-normal.woff2')})}
@font-face{font-family:Figtree;font-weight:700;src:url(${url('design-system/fonts/figtree-latin-700-normal.woff2')})}
html,body{margin:0;width:${L}px;height:${A}px;overflow:hidden;background:#14131F}
body{position:relative;color:#ECEAF5;font-family:Figtree}
.fondo{position:absolute;inset:-10%;background:radial-gradient(60% 40% at 15% 10%,rgba(139,92,246,.38),transparent 65%),radial-gradient(70% 35% at 50% 85%,${colore}40,transparent 70%)}
.sfondo-ia{position:absolute;inset:-4%;background-size:cover;background-position:center;opacity:.55;filter:saturate(1.05)}
.velo{position:absolute;inset:0;background:linear-gradient(180deg,rgba(20,19,31,.55),rgba(20,19,31,.25) 40%,rgba(20,19,31,.8) 75%,#14131F)}
.punti{position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,.07) 2px,transparent 2.5px);background-size:34px 34px}
.bordo{position:absolute;inset:28px;border:1.5px solid rgba(227,194,122,.45);border-radius:44px}
.barra{position:absolute;left:80px;right:80px;top:150px;height:8px;border-radius:4px;background:rgba(255,255,255,.12);overflow:hidden}
.barra i{display:block;height:100%;width:100%;background:linear-gradient(90deg,#8B5CF6,#22D3EE);transform-origin:left;transform:scaleX(0)}
.alto{position:absolute;left:80px;right:80px;top:190px;display:flex;justify-content:space-between;align-items:center}
.logo{display:flex;align-items:center;gap:18px}
.logo i{width:72px;height:72px;border-radius:21px;background:linear-gradient(135deg,#8B5CF6,#22D3EE);display:grid;place-items:center;font:600 42px Cormorant;font-style:normal;color:#fff}
.logo b{font:600 46px Cormorant}.logo b span{background:linear-gradient(135deg,#A78BFA,#22D3EE);-webkit-background-clip:text;color:transparent}
.classe{font:600 24px Cinzel;letter-spacing:.16em;text-transform:uppercase;color:${colore};border:2px solid currentColor;border-radius:999px;padding:12px 24px}
section{position:absolute;left:80px;right:80px;top:310px;height:720px;display:flex;flex-direction:column;justify-content:flex-end;opacity:0}
.disegno{background:rgba(255,255,255,.05);border:1.5px solid rgba(227,194,122,.3);border-radius:30px;padding:14px;margin-bottom:34px;transform:rotate(-1.2deg);min-height:0;flex:0 1 auto}
.disegno img{display:block;width:100%;height:auto;max-height:300px;object-fit:contain}
.fumetto{position:relative;background:#FBFAFF;color:#14131F;border-radius:48px;padding:40px 46px;box-shadow:0 22px 50px rgba(0,0,0,.4)}
.fumetto:after{content:"";position:absolute;bottom:-58px;border:28px solid transparent;border-top:40px solid #FBFAFF}
.da-prof .fumetto:after{left:170px;border-left:34px solid #FBFAFF}
.da-mascotte .fumetto:after{right:150px;border-right:34px solid #FBFAFF}
.fumetto .eb{font:700 24px Figtree;letter-spacing:.06em;text-transform:uppercase;color:${colore === ORO ? '#9A6B12' : colore};filter:brightness(.8);margin-bottom:12px}
.fumetto h1,.fumetto h2{margin:0;font:700 54px/1.18 Figtree;letter-spacing:-.01em;text-wrap:pretty}
.fumetto h1{font-size:68px}
.sopra{font:600 26px Cinzel;letter-spacing:.18em;text-transform:uppercase;color:${colore};margin-bottom:26px;text-align:right}
.fine .fumetto{text-align:center}
.fine .fumetto h2{font:600 76px/1.08 Cormorant}.fine .fumetto em{font-style:italic;font-weight:500;color:#7C4DDB}
.fine .bio{display:inline-block;margin-top:22px;font:700 34px Figtree;color:#fff;background:#14131F;border-radius:999px;padding:16px 36px}
.fine .cinque{display:flex;justify-content:center;gap:16px;margin-bottom:34px}.fine .cinque img{width:110px;height:110px}
.palco{position:absolute;left:70px;right:70px;top:1090px;height:520px}
.prof{position:absolute;left:0;bottom:0;width:500px;height:500px}
.prof img{position:absolute;inset:0;width:100%;height:100%;border-radius:50%;object-fit:cover;opacity:0;box-shadow:0 0 0 8px ${ORO},0 34px 80px rgba(0,0,0,.5)}
.mascotte{position:absolute;right:20px;bottom:20px;width:300px;height:300px;filter:drop-shadow(0 22px 40px rgba(0,0,0,.45))}
.ombra{position:absolute;bottom:-14px;height:30px;border-radius:50%;background:rgba(0,0,0,.35);filter:blur(8px)}
</style></head><body>
${r.sfondo && existsSync(join(RADICE, r.sfondo)) ? `<div class="sfondo-ia" style="background-image:url(${url(r.sfondo)})"></div><div class="velo"></div>` : ''}
<div class="fondo"></div><div class="punti"></div><div class="bordo"></div>
<div class="barra"><i></i></div>
<div class="alto"><div class="logo"><i>L</i><b>Lab <span>IRC</span></b></div><div class="classe">${esc(r.etichetta || 'Classe ' + r.classe)}</div></div>
<section class="gancio da-mascotte">
  <div class="sopra">${esc(r.sottotitolo || 'La lezione in 30 secondi')}</div>
  <div class="fumetto"><h1>${esc(r.gancio)}</h1></div>
</section>
${scene}
<section class="fine da-prof">
  <div class="cinque">${[1, 2, 3, 4, 5].map((k) => `<img src="${url(`assets/mascotte/svg/${MASCOTTE[k]}.svg`)}">`).join('')}</div>
  <div class="fumetto"><h2>${r.finale ? `${esc(r.finale)}<br>Il Lab è su <em>www.labirc.it</em>` : `${r.etichetta ? 'La risposta completa' : 'La lezione completa'}<br>è su <em>www.labirc.it</em>`}</h2><div class="bio">Link nella bio</div></div>
</section>
<div class="palco">
  <div class="ombra" style="left:90px;width:320px"></div><div class="ombra" style="right:60px;width:220px"></div>
  <div class="prof">${pose.map((p) => `<img src="${url(`assets/avatar/${p}.png`)}">`).join('')}</div>
  <img class="mascotte" src="${mascotte}">
</div>
<script>
window.DURATA = ${durata * 1000};
const P = ${T_PASSAGGIO * 1000};
const molla = 'cubic-bezier(.34,1.56,.64,1)';
const tempi = [${T_GANCIO * 1000}, ...Array(${n}).fill(${T_SCENA * 1000}), ${T_FINE * 1000}];
const sezioni = [...document.querySelectorAll('section')];
const volti = [...document.querySelectorAll('.prof img')];
const prof = document.querySelector('.prof'), mascotte = document.querySelector('.mascotte');
let t = 0;
sezioni.forEach((s, i) => {
  const d = tempi[i], ultima = i === sezioni.length - 1;
  s.animate([{ opacity: 0 }, { opacity: 1 }], { delay: t, duration: P, fill: 'both' });
  if (!ultima) s.animate([{ opacity: 1 }, { opacity: 0 }], { delay: t + d - P, duration: P, fill: 'forwards' });
  // il fumetto «scoppia» fuori da chi parla
  s.querySelector('.fumetto').animate([{ transform: 'scale(.55) rotate(-3deg)' }, { transform: 'none' }],
    { delay: t + 80, duration: 520, fill: 'both', easing: molla });
  const dis = s.querySelector('.disegno');
  if (dis) dis.animate([{ transform: 'translateY(-40px) rotate(-6deg)', opacity: 0 }, { transform: 'rotate(-1.2deg)', opacity: 1 }],
    { delay: t + 300, duration: 600, fill: 'both', easing: molla });
  // il volto del prof di questa scena
  volti[i].animate([{ opacity: 1 }, { opacity: 1 }], { delay: t, duration: d, fill: ultima ? 'forwards' : 'none' });
  // chi parla fa un saltello
  const chi = s.classList.contains('da-mascotte') ? mascotte : prof;
  chi.animate([{ transform: 'translateY(0) scale(1)' }, { transform: 'translateY(-46px) scale(1.04)' }, { transform: 'translateY(0) scale(1)' }],
    { delay: t + 40, duration: 420, easing: 'ease-out' });
  t += d;
});
// entrata in scena all'inizio, e la mascotte che dondola
prof.animate([{ transform: 'translateX(-620px) rotate(-14deg)' }, { transform: 'none' }], { duration: 700, fill: 'backwards', easing: molla });
mascotte.animate([{ transform: 'translateY(0) rotate(-3deg)' }, { transform: 'translateY(-16px) rotate(3deg)' }, { transform: 'translateY(0) rotate(-3deg)' }],
  { delay: 700, duration: 1400, iterations: Infinity, easing: 'ease-in-out' });
document.querySelectorAll('.fine .cinque img').forEach((m, k) => m.animate([{ transform: 'translateY(60px) scale(.4)', opacity: 0 }, { transform: 'none', opacity: 1 }],
  { delay: t - ${T_FINE * 1000} + 200 + k * 110, duration: 500, fill: 'both', easing: molla }));
const sf = document.querySelector('.sfondo-ia');
if (sf) sf.animate([{ transform: 'scale(1) translateY(0)' }, { transform: 'scale(1.12) translateY(-2%)' }], { duration: window.DURATA, fill: 'both', easing: 'linear' });
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
        const t = s.querySelector('.fumetto h1, .fumetto h2');
        let px = parseFloat(getComputedStyle(t).fontSize);
        s.style.opacity = 1;
        // il contenuto è allineato in basso: se sborda, sborda in alto (offsetTop ignora le animazioni)
        const sborda = () => s.firstElementChild.offsetTop < 0;
        const img = s.querySelector('.disegno img');
        let h = 300;
        while (img && h > 180 && sborda()) { h -= 20; img.style.maxHeight = h + 'px'; }
        while (px > 40 && sborda()) { px -= 3; t.style.fontSize = px + 'px'; }
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
