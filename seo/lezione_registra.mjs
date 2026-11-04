#!/usr/bin/env node
/*
 * seo/lezione_registra.mjs — Registra a schermo una lezione interattiva (uploads/*-artefatto.html),
 * per i reel delle lezioni (inquadratura «lezione» del regista, montata da seo/reel_lezioni.py).
 *
 * Apre la lezione nel browser (servita in locale) e la sfoglia come in classe: la prima scena con
 * un leggero scorrimento, «Avanti» per due o tre scene, poi la modalità Giochi e il Quiz: una
 * risposta sbagliata, «Avanti», una risposta giusta con la spiegazione.
 *
 * Il tempo della pagina lo decide il registratore: ogni fotogramma avanza di 1/30 di secondo
 * (orologio, setTimeout, requestAnimationFrame E animazioni CSS), così il video è fluido anche su
 * un server lento. Le lezioni sono aperte: niente password. Nessun dato di studenti.
 *
 * USO
 * ---
 *   node seo/lezione_registra.mjs uploads/<lezione>-artefatto.html uscita.mp4 [momenti.json]
 *   (momenti.json: i secondi in cui accade ogni cosa, per i tagli del reel)
 */
import { spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { createServer } from 'node:net';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const RADICE = join(dirname(fileURLToPath(import.meta.url)), '..');
const PW = process.env.PW_MODULE || '/opt/node22/lib/node_modules/playwright/index.js';
const CHROME = process.env.CHROME_PATH || '/opt/pw-browsers/chromium';
const FPS = 30;
const L = 432, A = 768, SCALA = 2.5;   // 1080 × 1920

const [, , lezione, uscita, fileMomenti] = process.argv;
if (!lezione || !uscita) { console.error('uso: node seo/lezione_registra.mjs uploads/<lezione>-artefatto.html uscita.mp4 [momenti.json]'); process.exit(2); }

const porta = await new Promise((ok) => { const s = createServer().listen(0, () => { const p = s.address().port; s.close(() => ok(p)); }); });
const server = spawn('python3', ['-m', 'http.server', String(porta), '--bind', '127.0.0.1'], { cwd: RADICE, stdio: 'ignore' });
await new Promise((ok) => setTimeout(ok, 1200));
const fine = () => { try { server.kill(); } catch { /* già chiuso */ } };

const pw = (await import(pathToFileURL(PW).href)).default;
const browser = await pw.chromium.launch({ executablePath: CHROME });
const pg = await browser.newPage({ viewport: { width: L, height: A }, deviceScaleFactor: SCALA });
pg.on('pageerror', (e) => console.log('  ! errore nella pagina:', e.message));

try {
  await pg.goto(`http://127.0.0.1:${porta}/${lezione.replace(/^\/+/, '')}`, { waitUntil: 'load' });
  await pg.waitForFunction(() => typeof LEZIONE !== 'undefined' && document.querySelector('.ll-scroll'), null, { timeout: 30000 });
  await pg.evaluate(() => document.fonts && document.fonts.ready);
  await pg.waitForTimeout(800);
  // --- il tempo della pagina passa solo quando lo dice il registratore (animazioni CSS comprese)
  await pg.evaluate(() => {
    const coda = [], timer = [];
    let n = 1e7;
    window.__T = performance.now();
    performance.now = () => window.__T;
    window.requestAnimationFrame = (cb) => { coda.push(cb); return ++n; };
    window.cancelAnimationFrame = () => {};
    window.setTimeout = (fn, ms = 0, ...a) => { timer.push({ id: ++n, t: window.__T + (+ms || 0), fn, a }); return n; };
    window.clearTimeout = (id) => { const k = timer.findIndex((x) => x.id === id); if (k >= 0) timer.splice(k, 1); };
    const anima = () => {
      for (const a of document.getAnimations()) {
        if (a.__v === undefined) { a.__v = window.__T - (a.currentTime || 0); a.pause(); }
        a.currentTime = window.__T - a.__v;
      }
    };
    window.__passo = (ms) => {
      window.__T += ms;
      timer.sort((x, y) => x.t - y.t);
      while (timer.length && timer[0].t <= window.__T) { const x = timer.shift(); try { typeof x.fn === 'function' && x.fn(...x.a); } catch (e) { console.error(e); } }
      for (const cb of coda.splice(0)) cb(window.__T);
      anima();
    };
    // lo scorrimento della vista che si vede (Lezione e Giochi hanno ciascuna il suo)
    const scorre = () => [...document.querySelectorAll('.ll-scroll')].filter((e) => e.offsetParent && e.clientHeight > 0)
      .sort((a, b) => (b.scrollHeight - b.clientHeight) - (a.scrollHeight - a.clientHeight))[0] || null;
    const bottone = (re) => [...document.querySelectorAll('button')].find((b) => b.offsetParent && re.test(b.textContent.trim()));
    window.__regia = {
      // scorrimento morbido verso «dove» (pixel): un passo a ogni fotogramma
      scorriA(dove) { const s = scorre(); if (s) s.scrollTop += (dove - s.scrollTop) * 0.12; },
      alto() { const s = scorre(); return s ? s.scrollTop : 0; },
      fondo() { const s = scorre(); return s ? Math.max(0, s.scrollHeight - s.clientHeight) : 0; },
      azzera() { const s = scorre(); if (s) s.scrollTop = 0; },
      avanti() { const b = bottone(/^Avanti/); if (b) b.click(); return !!b; },
      giochi() { const b = bottone(/^Giochi$/); if (b) b.click(); return !!b; },
      // la posizione della domanda del quiz dentro lo scorrimento (per inquadrarla con le risposte)
      domanda() {
        const s = scorre(), q = document.querySelector('.g-q') || document.querySelector('.g-opts');
        if (!s || !q) return 0;
        return Math.max(0, Math.min(this.fondo(), s.scrollTop + q.getBoundingClientRect().top - s.getBoundingClientRect().top - 150));
      },
      // la risposta giusta (o sbagliata) della domanda in corso, cercata per testo
      rispondi(giusta) {
        const testo = document.querySelector('.g-q')?.textContent.trim().toLowerCase() || '';
        const d = (LEZIONE.giochi.quiz || []).find((x) => testo && x.q.toLowerCase().includes(testo.slice(0, 40))) || (LEZIONE.giochi.quiz || [])[0];
        const opz = [...document.querySelectorAll('button.g-opt')].filter((b) => b.offsetParent && !b.disabled);
        if (!opz.length) return false;
        const giustaTesto = d ? d.a[d.ok] : null;
        const b = opz.find((o) => (giustaTesto && o.textContent.includes(giustaTesto)) === giusta) || opz[giusta ? 0 : opz.length - 1];
        b.click();
        return true;
      },
      prossima() { const b = bottone(/^Avanti\s*→/); if (b) b.click(); return !!b; },
      scene() { return LEZIONE.scene.map((s) => (s.blocchi || []).map((x) => x.tipo)); },
    };
  });
} catch (e) {
  fine(); await browser.close();
  console.error('Lezione: non riesco ad aprirla:', e.message);
  process.exit(1);
}

const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-i', '-',
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '24', '-pix_fmt', 'yuv420p', '-r', String(FPS), '-movflags', '+faststart', uscita],
{ stdio: ['pipe', 'inherit', 'inherit'] });
const chiuso = new Promise((ok) => ff.on('close', ok));
let fotogrammi = 0;
const momenti = [];
const segna = (cosa) => { momenti.push({ cosa, s: +(fotogrammi / FPS).toFixed(2) }); console.log(`  · ${(fotogrammi / FPS).toFixed(1)} s ${cosa}`); };
const R = (codice, ...a) => pg.evaluate(codice, ...a);
async function fotogramma(azione) {
  if (azione) await azione();
  await R(() => window.__passo(1000 / 30));
  const jpg = await pg.screenshot({ type: 'jpeg', quality: 88 });
  if (!ff.stdin.write(jpg)) await new Promise((ok) => ff.stdin.once('drain', ok));
  fotogrammi++;
}
async function per(secondi, azione) { for (let k = 0; k < Math.round(secondi * FPS); k++) await fotogramma(azione); }
// resta sulla scena e la percorre: ferma, poi scende piano verso «quanto» del contenuto
async function scena(secondi, quanto = 0.45) {
  const fondo = await R(() => window.__regia.fondo());
  const meta = Math.min(fondo, 520) * quanto;
  await per(Math.min(0.9, secondi / 3));
  await per(secondi - Math.min(0.9, secondi / 3), () => R((d) => window.__regia.scorriA(d), meta));
}

try {
  const tipi = await R(() => window.__regia.scene());
  // quante scene sfogliare: si arriva alla prima scena (dopo la prima) con un blocco da toccare, al massimo la quarta
  const interattivi = ['smista', 'parola', 'leggi', 'chi', 'rivela', 'bivio', 'carte', 'quiz', 'domanda'];
  let arrivo = tipi.findIndex((b, i) => i > 0 && b.some((t) => interattivi.includes(t)));
  arrivo = arrivo < 1 ? 2 : Math.min(arrivo + 1, 3);
  segna('scena 1');
  await scena(2.6, 0.35);
  for (let i = 1; i <= arrivo; i++) {
    await R(() => window.__regia.avanti());
    await per(0.15);
    await R(() => window.__regia.azzera());
    segna(`scena ${i + 1}`);
    await scena(i === arrivo ? 4.6 : 2.3, i === arrivo ? 0.6 : 0.3);   // l'ultima scena basta per un pezzo di 4 s
  }
  segna('giochi');
  await R(() => window.__regia.giochi());
  await per(1.0);
  const dove = await R(() => window.__regia.domanda());
  await per(1.0, () => R((d) => window.__regia.scorriA(d), dove));
  segna('quiz');
  await per(2.2);
  await R(() => window.__regia.rispondi(false));
  segna('sbagliata');
  await per(2.8);
  if (await R(() => window.__regia.prossima())) {
    await per(0.6);
    const dove2 = await R(() => window.__regia.domanda());
    await per(0.8, () => R((d) => window.__regia.scorriA(d), dove2));
    segna('quiz 2');
    await per(2.0);
    await R(() => window.__regia.rispondi(true));
    segna('giusta');
    await per(3.2);
  }
  segna('fine');
} catch (e) {
  console.log('  ! regia interrotta:', e.message);
  segna('fine');
}

ff.stdin.end();
await chiuso;
await browser.close();
fine();
if (fileMomenti) writeFileSync(fileMomenti, JSON.stringify({ lezione, durata: +(fotogrammi / FPS).toFixed(2), momenti }, null, 1));
console.log(`lezione: ${uscita} (${(fotogrammi / FPS).toFixed(1)} s, ${fotogrammi} fotogrammi)`);
