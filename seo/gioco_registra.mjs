#!/usr/bin/env node
/*
 * seo/gioco_registra.mjs — Registra una partita a un gioco di verifica, per i reel.
 *
 * Apre il gioco nel browser (servito in locale, perché il lucchetto chiede la data al server),
 * lo apre con la password del giorno (giorno × mese + LUCCHETTO_NUMERO, che vive SOLO nei
 * segreti di GitHub e mai nel repo), poi gioca da solo seguendo una piccola regia:
 * uno sguardo intorno, la camminata fino a un testimone, la domanda, una risposta sbagliata,
 * l'Ombra da dissolvere, la risposta giusta e il frammento. Un taglio netto quando la strada
 * è troppo lunga o bloccata.
 *
 * Il tempo del gioco lo decide il registratore: ogni fotogramma avanza di 1/30 di secondo,
 * qualunque sia la velocità del computer, così il video è fluido anche su un server lento.
 * Il nome scritto nel gioco è di fantasia: nessun dato di studenti.
 *
 * USO
 * ---
 *   LUCCHETTO_NUMERO=… node seo/gioco_registra.mjs uploads/<gioco>.html uscita.mp4 [momenti.json]
 *   (momenti.json: i secondi in cui accade ogni cosa, per le scritte del reel)
 */
import { spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { createServer } from 'node:net';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const RADICE = join(dirname(fileURLToPath(import.meta.url)), '..');
const PW = process.env.PW_MODULE || '/opt/node22/lib/node_modules/playwright/index.js';
const CHROME = process.env.CHROME_PATH || '/opt/pw-browsers/chromium';
const FPS = 30, PASSO = 1000 / FPS;
const L = 432, A = 768, SCALA = 2.5;   // 1080 × 1920

const [, , gioco, uscita, fileMomenti] = process.argv;
if (!gioco || !uscita) { console.error('uso: node seo/gioco_registra.mjs uploads/<gioco>.html uscita.mp4 [momenti.json]'); process.exit(2); }
const numero = (process.env.LUCCHETTO_NUMERO || '').trim();
if (!numero) { console.log('Gioco: segreto LUCCHETTO_NUMERO non impostato, niente registrazione.'); process.exit(0); }

// --- il sito servito in locale: il lucchetto legge la data dall'intestazione della risposta
const porta = await new Promise((ok) => { const s = createServer().listen(0, () => { const p = s.address().port; s.close(() => ok(p)); }); });
const server = spawn('python3', ['-m', 'http.server', String(porta), '--bind', '127.0.0.1'], { cwd: RADICE, stdio: 'ignore' });
await new Promise((ok) => setTimeout(ok, 1200));

const pw = (await import(pathToFileURL(PW).href)).default;
const browser = await pw.chromium.launch({
  executablePath: CHROME,
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
});
const pg = await browser.newPage({ viewport: { width: L, height: A }, deviceScaleFactor: SCALA });
pg.on('pageerror', (e) => console.log('  ! errore nella pagina:', e.message));
const fine = () => { try { server.kill(); } catch { /* già chiuso */ } };

try {
  await pg.goto(`http://127.0.0.1:${porta}/${gioco.replace(/^\/+/, '')}`, { waitUntil: 'load' });
  await pg.waitForSelector('#lc-pw', { state: 'attached' });
  await pg.waitForTimeout(1500);
  const [, mese, giorno] = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Rome' }).format(new Date()).split('-').map(Number);
  await pg.evaluate((p) => { document.getElementById('lc-pw').value = p; document.getElementById('lc-form').requestSubmit(); },
    String(giorno * mese + Number(numero)));
  await pg.waitForSelector('#campo-nome', { state: 'visible', timeout: 30000 });
  await pg.fill('#campo-nome', 'Prova Lab');
  await pg.evaluate(() => { const c = document.getElementById('campo-classe'); if (c && !c.value) c.value = 'Lab'; });
  await pg.click('text=Inizia il viaggio');
  await pg.waitForFunction(() => typeof modo !== 'undefined' && modo !== 'inizio', null, { timeout: 30000 });
  await pg.waitForTimeout(600);
  await pg.evaluate(() => { if (modo === 'intro') document.getElementById('intro-via')?.click(); });
  await pg.waitForFunction(() => modo === 'esplora', null, { timeout: 30000 });

  // --- il tempo del gioco passa solo quando lo dice il registratore
  await pg.evaluate(() => {
    const coda = [], timer = [];
    let n = 1e7;
    window.__T = performance.now();
    performance.now = () => window.__T;
    window.requestAnimationFrame = (cb) => { coda.push(cb); return ++n; };
    window.cancelAnimationFrame = () => {};
    window.setTimeout = (fn, ms = 0, ...a) => { timer.push({ id: ++n, t: window.__T + (+ms || 0), fn, a }); return n; };
    window.clearTimeout = (id) => { const k = timer.findIndex((x) => x.id === id); if (k >= 0) timer.splice(k, 1); };
    window.__passo = (ms) => {
      window.__T += ms;
      timer.sort((x, y) => x.t - y.t);
      while (timer.length && timer[0].t <= window.__T) { const x = timer.shift(); try { typeof x.fn === 'function' && x.fn(...x.a); } catch (e) { console.error(e); } }
      try { giocatore.invulnerabile = 1; giocatore.vita = Math.max(giocatore.vita, 3); } catch { /* prima del via */ }
      for (const cb of coda.splice(0)) cb(window.__T);
    };
    // la regia: legge e muove il giocatore con le stesse funzioni del gioco
    window.__regia = {
      stato() {
        const g = giocatore;
        return { modo, x: g.x, z: g.z, frammenti: [...(zaino.tracce[mondo.n] || [])].length, opzioni: opzioniCorrenti.map((o) => !!o.giusta) };
      },
      testimone() {
        const g = giocatore;
        const liberi = mondo.npc.filter((p) => p.stato !== 'fatto' && p.stato !== 'ombra' && requisitoSoddisfatto(p));
        liberi.sort((a, b) => Math.hypot(a.x - g.x, a.z - g.z) - Math.hypot(b.x - g.x, b.z - g.z));
        return liberi[0] ? mondo.npc.indexOf(liberi[0]) : -1;
      },
      punto(chi) {
        if (chi.tipo === 'npc') { const p = mondo.npc[chi.i]; return p && { x: p.x, z: p.z, y: p.y }; }
        const m = mondo.mostri.filter((o) => o.vivo).sort((a, b) => Math.hypot(a.x - giocatore.x, a.z - giocatore.z) - Math.hypot(b.x - giocatore.x, b.z - giocatore.z))[0];
        return m && { x: m.x, z: m.z, y: m.y };
      },
      // un passo verso il bersaglio: gira lo sguardo con dolcezza e cammina; ritorna la distanza
      guida(chi, cammina = true, vicino = 2) {
        const t = this.punto(chi), g = giocatore;
        if (!t) return -1;
        const dx = t.x - g.x, dz = t.z - g.z, d = Math.hypot(dx, dz);
        const voluto = Math.atan2(-dx, -dz);
        let delta = voluto - yaw;
        while (delta > Math.PI) delta -= 2 * Math.PI;
        while (delta < -Math.PI) delta += 2 * Math.PI;
        yaw += delta * 0.18;
        mira += (0.08 - mira) * 0.15;
        comandi.avanti = cammina && d > vicino && Math.abs(delta) < 1.2;
        return d;
      },
      salta() { richiediSalto(); },
      ferma() { for (const k in comandi) comandi[k] = false; },
      // taglio: il giocatore ricompare davanti al bersaglio, a «dist» passi, che lo guarda
      vicinoA(chi, dist = 1.9) {
        const t = this.punto(chi), g = giocatore;
        if (!t) return;
        const ang = Math.atan2(g.x - t.x, g.z - t.z);
        for (const prova of [0, 0.6, -0.6, 1.2, -1.2, 1.8, -1.8, Math.PI]) {
          const x = t.x + Math.sin(ang + prova) * dist, z = t.z + Math.cos(ang + prova) * dist;
          const y = suoloIn(x, z);
          if (Math.abs(y - t.y) <= 1.01 && puoAndare(x, z, y, 0.3)) {
            g.x = x; g.z = z; g.y = y; g.yVista = y; g.vx = g.vz = g.vy = 0;
            yaw = Math.atan2(-(t.x - x), -(t.z - z)); mira = 0.08;
            return true;
          }
        }
        return false;
      },
      parla() { interagisci(); },
      scegli(giusta) {
        const i = opzioniCorrenti.findIndex((o) => !!o.giusta === giusta);
        if (i >= 0) evidenzia(i);
        return i;
      },
      conferma() { const o = opzioniCorrenti[opzioneScelta < 0 ? 0 : opzioneScelta]; if (o) o.bottone.click(); },
      colpisci() { if (ombraDavanti(ARMI.spada.portata)) colpisci(); },   // mai un colpo a un testimone
      guarda(dYaw) { yaw += dYaw; },
    };
  });
} catch (e) {
  fine(); await browser.close();
  console.error('Gioco: non riesco ad aprirlo:', e.message);
  process.exit(1);
}

// --- registrazione
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
async function aspettaModo(voluti, max = 4) {
  for (let k = 0; k < max * FPS; k++) { if (voluti.includes((await R(() => window.__regia.stato())).modo)) return true; await fotogramma(); }
  return false;
}
// cammina verso il bersaglio; se non si avvicina salta, se ancora non si avvicina (o è lontano) taglia
async function raggiungi(chi, max = 7, vicino = 2) {
  const storia = [];
  for (let k = 0; k < max * FPS; k++) {
    const d = await R(([c, v]) => window.__regia.guida(c, true, v), [chi, vicino]);
    if (d < 0) return false;
    if (d <= vicino + 0.15) { await R(() => window.__regia.ferma()); return true; }
    storia.push(d);
    const mezzo = storia.length > 15 ? storia[storia.length - 16] - d : 1;    // quanto si è avvicinato in mezzo secondo
    if (mezzo < 0.25 && k % 15 === 0) await R(() => window.__regia.salta());
    if (storia.length > 36 && storia[storia.length - 37] - d < 0.4) break;      // in 1,2 s quasi niente: si taglia
    await fotogramma();
  }
  await R(() => window.__regia.ferma());
  const ok = await R((c) => window.__regia.vicinoA(c), chi);
  segna('taglio');
  return ok;
}

try {
  segna('inizio');
  await per(2.4, () => R(() => window.__regia.guarda(0.012)));           // uno sguardo intorno
  const i = await R(() => window.__regia.testimone());
  if (i < 0) throw new Error('nessun testimone libero');
  const npc = { tipo: 'npc', i };
  await raggiungi(npc, 6);
  await per(0.4, () => R((c) => window.__regia.guida(c, false), npc));
  segna('parla');
  await R(() => window.__regia.parla());
  await aspettaModo(['spiega', 'domanda']);
  if ((await R(() => window.__regia.stato())).modo === 'spiega') {   // la presentazione del testimone
    await per(2.6);
    await R(() => window.__regia.conferma());
  }
  await aspettaModo(['domanda']);
  segna('domanda');
  await per(3.2);
  await R(() => window.__regia.scegli(false));
  await per(0.9);
  segna('sbagliata');
  await R(() => window.__regia.conferma());
  await per(3.0);
  await R(() => window.__regia.conferma());                              // «Affronta l'Ombra»
  await aspettaModo(['esplora']);
  await per(0.6);
  segna('ombra');
  const ombra = { tipo: 'ombra' };
  await raggiungi(ombra, 4, 1.8);
  for (let k = 0; k < 7 * FPS; k++) {
    const d = await R((c) => window.__regia.guida(c, true, 1.6), ombra);
    if (d < 0) break;
    if (k % 14 === 0 && d < 2.3) await R(() => window.__regia.colpisci());
    if (!(await R(() => mondo.mostri.some((m) => m.vivo)))) { await per(0.8); break; }
    await fotogramma();
  }
  segna('ombra dissolta');
  await per(0.8, () => R((c) => window.__regia.guida(c, false), npc));
  await raggiungi(npc, 4);
  await per(0.4, () => R((c) => window.__regia.guida(c, false), npc));
  await R(() => window.__regia.parla());
  await aspettaModo(['domanda', 'spiega']);
  if ((await R(() => window.__regia.stato())).modo === 'spiega') { await per(1.5); await R(() => window.__regia.conferma()); await aspettaModo(['domanda']); }
  await per(1.8);
  await R(() => window.__regia.scegli(true));
  await per(0.8);
  segna('giusta');
  await R(() => window.__regia.conferma());
  await per(4.0);
  segna('frammento');
  await R(() => window.__regia.conferma());
  await per(1.6, () => R(() => window.__regia.guarda(-0.01)));
  segna('fine');
} catch (e) {
  console.log('  ! regia interrotta:', e.message);
  segna('fine');
}

ff.stdin.end();
await chiuso;
await browser.close();
fine();
if (fileMomenti) writeFileSync(fileMomenti, JSON.stringify({ gioco, durata: +(fotogrammi / FPS).toFixed(2), momenti }, null, 1));
console.log(`gioco: ${uscita} (${(fotogrammi / FPS).toFixed(1)} s, ${fotogrammi} fotogrammi)`);
