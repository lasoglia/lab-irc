// seo/reel2.mjs — Il motore dei reel «Notte del Lab» (Progetto Reel).
// Un reel è una lista di inquadrature (preparata da seo/regia.py): ogni inquadratura ha un tipo
// (gancio, pagina del fascicolo, numero, frase del prof, chiusa), una durata, la frase della voce
// (che diventa i sottotitoli parola per parola, con la parola detta in oro) e la posa del prof.
// Regole di regia: gancio entro 1,5 s, un cambio ogni 2-3 s, zone sicure di Instagram libere,
// barra di avanzamento, voce davanti e musica sotto (seo/audio_reel.py).
//
// USO: node seo/reel2.mjs regia.json uscita.mp4   (PROVINO=cartella salva 12 fotogrammi)
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { spawn, spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const RADICE = join(dirname(fileURLToPath(import.meta.url)), '..');
const PW = process.env.PW_MODULE || '/opt/node22/lib/node_modules/playwright/index.js';
const CHROME = process.env.CHROME_PATH || '/opt/pw-browsers/chromium';
const FPS = 30, L = 1080, A = 1920;
const url = (p) => pathToFileURL(p.startsWith('/') ? p : join(RADICE, p)).href;
const esc = (s) => String(s || '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
// *parola* = in corsivo oro (come nel sito)
const ricco = (s) => esc(s).replace(/\*([^*]+)\*/g, '<i>$1</i>');
const avatar = (posa) => ['png', 'jpg'].map((e) => `assets/avatar/${posa}.${e}`).find((f) => existsSync(join(RADICE, f))) || 'assets/avatar/sorriso.png';

// I sottotitoli: la frase in blocchi di al massimo 6 parole; ogni parola ha il suo istante
// (senza voce vera: in proporzione alla lunghezza; con la voce: dai tempi di Whisper)
function sottotitoli(frase, inizio, durata) {
  const parole = String(frase || '').split(/\s+/).filter(Boolean);
  if (!parole.length) return [];
  const pesi = parole.map((p) => p.replace(/[^\p{L}\p{N}]/gu, '').length + 2);
  const totale = pesi.reduce((a, b) => a + b, 0);
  const utile = durata - 0.35;
  let t = inizio + 0.15;
  const tempi = parole.map((p, i) => { const s = t; t += (pesi[i] / totale) * utile; return { p, s, e: t }; });
  const blocchi = [];
  for (let i = 0; i < tempi.length; i += 6) blocchi.push(tempi.slice(i, i + 6));
  return blocchi;
}

function pagina(r) {
  const colore = r.colore || '#E3C27A';
  let t = 0;
  const scene = r.inquadrature.map((q, i) => { const s = { ...q, i, inizio: t }; t += q.durata; return s; });
  // (le durate sono già adattate alla voce da adatta())
  const durata = t;
  const blocchi = scene.flatMap((s) => sottotitoli(s.voce, s.inizio + (s.voce_durata ? 0.25 : 0), s.voce_durata ? s.voce_durata + 0.35 : s.durata));
  const vista = (s) => {
    switch (s.tipo) {
      case 'gancio': return `<div class="gancio"><div class="sopra">${esc(r.serie)}</div><h1>${ricco(s.testo)}</h1></div>`;
      case 'pagina': return `<div class="carta"><div class="foglio"><div class="tela">
          <img src="${url(s.immagine)}">${(s.evidenzia || []).map((e) => `<b class="evid" style="left:${e.x}px;top:${e.y}px;width:${e.w}px;height:${e.h}px"></b>`).join('')}
          ${s.cerchio ? `<svg class="cerchio" style="left:${s.cerchio.x - 30}px;top:${s.cerchio.y - 30}px;width:${s.cerchio.w + 60}px;height:${s.cerchio.h + 60}px" viewBox="0 0 100 100" preserveAspectRatio="none"><ellipse cx="50" cy="50" rx="46" ry="40" pathLength="1"/></svg>` : ''}
        </div></div><div class="didascalia">${esc(s.fonte || '')}</div></div>`;
      case 'numero': return `<div class="numero"><div class="cifra">${esc(s.numero)}</div><h2>${ricco(s.testo)}</h2></div>`;
      case 'prof': return `<div class="frase"><h2>${ricco(s.testo)}</h2></div>`;
      case 'chiusa': return `<div class="chiusa"><img class="masc" src="${url(`assets/mascotte/svg/${r.mascotte}.svg`)}"><div class="sopra">Per continuare</div><h2>La lezione completa è su <i>labirc.it</i></h2><div class="tit">${esc(r.titolo)}</div></div>`;
      default: return '';
    }
  };
  return `<!doctype html><html lang="it"><head><meta charset="utf-8"><style>
@font-face{font-family:Cormorant;font-weight:600;src:url(${url('design-system/fonts/cormorant-garamond-latin-600-normal.woff2')})}
@font-face{font-family:Cormorant;font-weight:500;font-style:italic;src:url(${url('design-system/fonts/cormorant-garamond-latin-500-italic.woff2')})}
@font-face{font-family:Cinzel;font-weight:600;src:url(${url('design-system/fonts/cinzel-latin-600-normal.woff2')})}
@font-face{font-family:Figtree;font-weight:700;src:url(${url('design-system/fonts/figtree-latin-700-normal.woff2')})}
@font-face{font-family:Figtree;font-weight:800;src:url(${url('design-system/fonts/figtree-latin-800-normal.woff2')})}
html,body{margin:0;width:${L}px;height:${A}px;overflow:hidden;background:#14131F;color:#ECEAF5;font-family:Figtree}
.vetrata{position:absolute;inset:0;background:radial-gradient(90% 45% at 100% 0%,${colore}55,transparent 62%),radial-gradient(70% 40% at 0% 8%,rgba(139,92,246,.35),transparent 62%),radial-gradient(80% 40% at 50% 100%,rgba(34,211,238,.12),transparent 70%),#14131F}
.grana{position:absolute;inset:0;opacity:.5;mix-blend-mode:overlay;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .09 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")}
.barra-anno{position:absolute;left:0;top:0;bottom:0;width:10px;background:${colore}}
.avanza{position:absolute;left:80px;right:140px;top:236px;height:6px;border-radius:3px;background:rgba(255,255,255,.12)}
.avanza i{display:block;height:100%;border-radius:3px;background:#E3C27A;transform-origin:left;transform:scaleX(0)}
.serie{position:absolute;left:80px;top:268px;display:flex;gap:14px;align-items:center}
.serie b{font:600 30px/1 Cinzel;letter-spacing:.16em;text-transform:uppercase;color:#14131F;background:#E3C27A;padding:14px 24px 11px;border-radius:999px}
.serie span{font:600 26px/1 Cinzel;letter-spacing:.16em;text-transform:uppercase;color:#C7C3DA}
.scena{position:absolute;left:80px;right:140px;top:360px;height:760px;display:flex;align-items:center;justify-content:center;opacity:0}
h1,h2{font-family:Cormorant;font-weight:600;margin:0;text-wrap:balance;font-variant-numeric:lining-nums}
h1 i,h2 i{font-style:italic;font-weight:500;color:#E3C27A}
.sopra{font:600 30px Cinzel;letter-spacing:.18em;text-transform:uppercase;color:#E3C27A;margin-bottom:26px}
.gancio{text-align:left;width:100%}.gancio h1{font-size:158px;line-height:.98}
.carta{width:100%;display:flex;flex-direction:column;gap:18px}
.foglio{position:relative;height:700px;border-radius:28px;overflow:hidden;background:#fff;box-shadow:0 30px 80px rgba(0,0,0,.55)}
.tela{position:absolute;left:0;top:0;width:1241px;height:1754px;transform-origin:0 0}
.tela>img{position:absolute;left:0;top:0;width:1241px}.tela>.evid,.tela>.cerchio{position:absolute}
.foglio .evid{background:rgba(251,191,36,.42);border-radius:6px;mix-blend-mode:multiply}
.cerchio{overflow:visible}.cerchio ellipse{fill:none;stroke:#E0365A;stroke-width:3.4;stroke-linecap:round;vector-effect:non-scaling-stroke;stroke-dasharray:1;stroke-dashoffset:1}
.didascalia{font:700 24px Figtree;color:#8E89A6;letter-spacing:.02em}
.numero{text-align:left;width:100%}.cifra{font:600 360px/.9 Cormorant;font-variant-numeric:lining-nums;background:linear-gradient(180deg,#F3DCA4,#E3C27A 55%,#A67C2E);-webkit-background-clip:text;color:transparent}
.numero h2{font-size:84px;line-height:1.05;margin-top:10px}
.frase h2{font-size:104px;line-height:1.04}
.chiusa{text-align:center}.chiusa .masc{width:230px;margin-bottom:26px}.chiusa h2{font-size:100px;line-height:1.04}
.chiusa .tit{margin-top:26px;font:700 32px Figtree;color:#C7C3DA}
.prof{position:absolute;left:80px;top:1120px;width:250px;height:250px}
.prof img{position:absolute;inset:0;width:100%;height:100%;border-radius:50%;object-fit:cover;box-shadow:0 0 0 7px #E3C27A,0 24px 60px rgba(0,0,0,.5);opacity:0}
.sott{position:absolute;left:360px;right:140px;top:1130px;height:300px;display:flex;align-items:center}
.blocco{position:absolute;left:0;right:0;font:800 60px/1.16 Figtree;letter-spacing:-.01em;opacity:0;text-shadow:0 4px 18px rgba(0,0,0,.6)}
.blocco span{color:#fff}
.logo{position:absolute;left:80px;top:1460px;font:700 26px Figtree;color:#8E89A6;letter-spacing:.04em}
</style></head><body>
<div class="vetrata"></div><div class="grana"></div><div class="barra-anno"></div>
<div class="avanza"><i></i></div>
<div class="serie"><b>${esc(r.serie)}</b><span>Anno ${esc(r.anno_romano || '')}</span></div>
${scene.map((s) => `<section class="scena t-${s.tipo}">${vista(s)}</section>`).join('\n')}
<div class="prof">${scene.map((s) => `<img src="${url(avatar(s.posa || 'sorriso'))}">`).join('')}</div>
<div class="sott">${blocchi.map((b) => `<div class="blocco">${b.map((w) => `<span>${esc(w.p)}</span>`).join(' ')}</div>`).join('')}</div>
<div class="logo">labirc.it${r.inquadrature.some((q) => q.voce_file) ? ' · voce generata con IA' : ''}</div>
<script>
window.DURATA = ${Math.round(durata * 1000)};
const scene = ${JSON.stringify(scene.map((s) => ({ tipo: s.tipo, inizio: s.inizio * 1000, durata: s.durata * 1000, zoom: s.zoom, zoom2: s.zoom2 })))};
const blocchi = ${JSON.stringify(blocchi.map((b) => b.map((w) => [w.s * 1000, w.e * 1000])))};
const molla = 'cubic-bezier(.34,1.56,.64,1)', morbido = 'cubic-bezier(.16,1,.3,1)';
const sez = [...document.querySelectorAll('.scena')], volti = [...document.querySelectorAll('.prof img')];
scene.forEach((s, i) => {
  const el = sez[i], ultima = i === scene.length - 1;
  el.animate([{ opacity: 0 }, { opacity: 1 }], { delay: s.inizio, duration: 160, fill: 'both' });
  if (!ultima) el.animate([{ opacity: 1 }, { opacity: 0 }], { delay: s.inizio + s.durata - 140, duration: 140, fill: 'forwards' });
  // stacco con «pugno»: entra un po' più grande e si assesta
  el.animate([{ transform: 'scale(1.07)' }, { transform: 'scale(1)' }], { delay: s.inizio, duration: 420, fill: 'both', easing: morbido });
  volti[i].animate([{ opacity: 1, transform: 'scale(.86)' }, { opacity: 1, transform: 'scale(1)' }], { delay: s.inizio, duration: 380, fill: ultima ? 'forwards' : 'none', easing: molla });
  volti[i].animate([{ opacity: 1 }, { opacity: 1 }], { delay: s.inizio + 380, duration: Math.max(1, s.durata - 380), fill: ultima ? 'forwards' : 'none' });
  if (s.tipo === 'pagina') {
    const f = el.querySelector('.foglio');
    const z = (q) => \`translate(\${-q.x * q.s + 430}px, \${-q.y * q.s + 350}px) scale(\${q.s})\`;
    f.querySelector('.tela').animate([{ transform: z(s.zoom) }, { transform: z(s.zoom2 || s.zoom) }], { delay: s.inizio, duration: s.durata, fill: 'both', easing: 'ease-in-out' });
    f.querySelectorAll('.evid').forEach((x) => x.animate([{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0 0 0)' }], { delay: s.inizio + 500, duration: 900, fill: 'both', easing: 'ease-out' }));
    f.querySelectorAll('.cerchio ellipse').forEach((x) => x.animate([{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { delay: s.inizio + 1500, duration: 700, fill: 'both', easing: 'ease-out' }));
  }
  if (s.tipo === 'numero') el.querySelector('.cifra').animate([{ transform: 'translateY(80px) scale(.7)', opacity: 0 }, { transform: 'none', opacity: 1 }], { delay: s.inizio + 60, duration: 700, fill: 'both', easing: molla });
  if (s.tipo === 'gancio' || s.tipo === 'prof' || s.tipo === 'chiusa') el.querySelectorAll('h1,h2,.sopra,.masc').forEach((x, k) => x.animate([{ transform: 'translateY(40px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { delay: s.inizio + 60 + k * 90, duration: 520, fill: 'both', easing: morbido }));
});
// sottotitoli: il blocco compare, la parola detta si accende in oro
[...document.querySelectorAll('.blocco')].forEach((b, i) => {
  const w = blocchi[i], s = w[0][0], e = w[w.length - 1][1];
  b.animate([{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'none' }], { delay: s + 40, duration: 120, fill: 'both' });
  b.animate([{ opacity: 1 }, { opacity: 0 }], { delay: e - 40, duration: 60, fill: 'forwards' });
  [...b.querySelectorAll('span')].forEach((p, k) => {
    p.animate([{ color: '#ffffff' }, { color: '#E3C27A' }], { delay: w[k][0], duration: 60, fill: 'forwards' });
  });
});
document.querySelector('.avanza i').animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: window.DURATA, fill: 'both', easing: 'linear' });
document.getAnimations().forEach((a) => a.pause());
window.vai = (ms) => document.getAnimations().forEach((a) => { a.currentTime = ms; });
</script></body></html>`;
}

// ogni inquadratura dura almeno quanto la sua voce, più un respiro
function adatta(r) {
  for (const q of r.inquadrature) {
    if (q.voce_file && existsSync(q.voce_file)) {
      const d = spawnSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', q.voce_file], { encoding: 'utf8' });
      q.voce_durata = parseFloat(d.stdout) || 0;
      q.durata = Math.max(q.durata, q.voce_durata + 0.6);
    }
  }
}

function colonnaSonora(r, cartella) {
  let t = 0;
  const cambi = r.inquadrature.map((q) => { const s = t; t += q.durata; return s; });
  const voce = r.inquadrature.map((q, i) => (q.voce_file ? { file: q.voce_file, inizio: cambi[i] + 0.25 } : null)).filter(Boolean);
  const tempi = { durata: t, seme: r.titolo, voce, pop: cambi.slice(1).map((s) => s + 0.05), whoosh: cambi.slice(1).map((s) => Math.max(0, s - 0.12)), campanello: [t - 3.2] };
  const f = join(cartella, 'tempi.json'), wav = join(cartella, 'audio.wav');
  writeFileSync(f, JSON.stringify(tempi));
  const e = spawnSync(process.env.PYTHON || 'python3', [join(RADICE, 'seo', 'audio_reel.py'), f, wav], { stdio: 'inherit' });
  return e.status === 0 && existsSync(wav) ? wav : null;
}

const [, , ingresso, uscita] = process.argv;
const r = JSON.parse(readFileSync(ingresso, 'utf8'));
adatta(r);
const pw = (await import(pathToFileURL(PW).href)).default;
const browser = await pw.chromium.launch({ executablePath: CHROME });
const pg = await browser.newPage({ viewport: { width: L, height: A } });
const lavoro = mkdtempSync(join(tmpdir(), 'reel2-'));
writeFileSync(join(lavoro, 'r.html'), pagina(r));
await pg.goto(pathToFileURL(join(lavoro, 'r.html')).href, { waitUntil: 'load' });
const durata = await pg.evaluate(async () => { await document.fonts.ready; return window.DURATA; });
const audio = colonnaSonora(r, lavoro);
const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-i', '-',
  ...(audio ? ['-i', audio] : ['-f', 'lavfi', '-i', 'anullsrc=r=48000:cl=stereo']), '-shortest', '-ar', '48000',
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '26', '-pix_fmt', 'yuv420p', '-r', String(FPS), '-c:a', 'aac', '-b:a', '96k', '-movflags', '+faststart', uscita],
{ stdio: ['pipe', 'inherit', 'inherit'] });
const fine = new Promise((ok) => ff.on('close', ok));
const n = Math.ceil((durata / 1000) * FPS);
for (let k = 0; k < n; k++) {
  await pg.evaluate((ms) => window.vai(ms), (k * 1000) / FPS);
  const jpg = await pg.screenshot({ type: 'jpeg', quality: 90 });
  if (!ff.stdin.write(jpg)) await new Promise((ok) => ff.stdin.once('drain', ok));
  if (process.env.PROVINO && k % Math.round(n / 12) === 0) writeFileSync(join(process.env.PROVINO, `f${String(k).padStart(4, '0')}.jpg`), jpg);
}
ff.stdin.end();
await fine;
await browser.close();
rmSync(lavoro, { recursive: true, force: true });
console.log(`reel: ${uscita} (${(durata / 1000).toFixed(1)} s, ${n} fotogrammi)`);
