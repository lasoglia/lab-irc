#!/usr/bin/env node
/* =====================================================================
   admin/chiudi-gioco.mjs — chiude a chiave (o rinnova) i giochi di verifica
   che si pubblicano su https://giochi.labirc.it (Cloudflare Pages), con lo
   STESSO lucchetto di admin/importa.html (admin/lucchetto.js).

   Uso (Node.js 20 o più recente; lucchetto.js deve stare nella stessa cartella):
       node chiudi-gioco.mjs <file-o-cartella> [altri file o cartelle]
       node chiudi-gioco.mjs --controlla <cartella>   solo controllo, non cambia niente

   - Lavora solo sui giochi di verifica: i file che finiscono con «-gioco.html».
   - Un gioco in chiaro viene chiuso fino al 31 agosto; uno già chiuso viene
     rinnovato (stesso contenuto, serrature da oggi al 31 agosto). Il file viene
     riscritto al suo posto: si usa sulla cartella che va su Cloudflare.
   - Il numero segreto NON si salva da nessuna parte: lo chiede all'avvio, oppure
     lo legge dalla variabile LUCCHETTO_NUMERO impostata solo nella finestra del
     terminale. Mai scriverlo in un file.
   - Con --controlla dice, per ogni gioco, se è chiuso e fino a quando: da fare
     prima di ogni pubblicazione su Cloudflare (esce con errore se uno è aperto).
   ===================================================================== */
import { readFileSync, writeFileSync, statSync, readdirSync } from 'node:fs';
import { join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import readline from 'node:readline';

const GIOCO = /[ _-]gioco\.html?$/i;

/* il lucchetto del sito, così com'è: si aspetta window, crypto, TextEncoder, btoa (tutto presente in Node 20) */
function caricaLucchetto() {
  const percorso = fileURLToPath(new URL('./lucchetto.js', import.meta.url));
  if (!globalThis.crypto || !globalThis.crypto.subtle) throw new Error('Serve Node.js 20 o più recente.');
  globalThis.window = globalThis;
  vm.runInThisContext(readFileSync(percorso, 'utf8'), { filename: percorso });
  return globalThis.LabLucchetto;
}

function trovaGiochi(voci) {
  const out = [];
  for (const v of voci) {
    let st;
    try { st = statSync(v); } catch { console.error(`Non trovo «${v}».`); process.exitCode = 1; continue; }
    if (st.isDirectory()) {
      for (const n of readdirSync(v).sort()) {
        const p = join(v, n);
        if (statSync(p).isDirectory()) out.push(...trovaGiochi([p]));
        else if (GIOCO.test(n)) out.push(p);
      }
    } else if (GIOCO.test(basename(v))) out.push(v);
    else console.log(`Salto «${basename(v)}»: non è un gioco di verifica (deve finire con «-gioco.html»).`);
  }
  return out;
}

function chiediNumero() {
  const env = (process.env.LUCCHETTO_NUMERO || '').trim();
  if (env) return Promise.resolve(env);
  if (!process.stdin.isTTY) return Promise.reject(new Error('Serve il numero segreto: scrivilo quando lo chiedo, oppure imposta LUCCHETTO_NUMERO solo in questa finestra.'));
  return new Promise((ok) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    rl._writeToOutput = (s) => { if (!rl._nascosto) rl.output.write(s); else if (s.includes('\n')) rl.output.write('\n'); };
    rl.question('Numero segreto del lucchetto (non si vede mentre lo scrivi): ', (r) => { rl.close(); ok(r.trim()); });
    rl._nascosto = true;
  });
}

async function main() {
  const argv = process.argv.slice(2);
  const solo = argv.includes('--controlla');
  const voci = argv.filter((a) => a !== '--controlla');
  if (!voci.length) { console.log('Uso: node chiudi-gioco.mjs [--controlla] <file-o-cartella> …'); process.exit(2); }
  const L = caricaLucchetto();
  const giochi = trovaGiochi(voci);
  if (!giochi.length) { console.log('Nessun gioco di verifica («…-gioco.html») trovato.'); return; }

  if (solo) {
    let aperti = 0;
    for (const g of giochi) {
      const t = readFileSync(g, 'utf8');
      if (L.eChiuso(t)) console.log(`chiuso fino al ${L.scadenza(t)}  ${basename(g)}`);
      else { aperti++; console.log(`APERTO (senza lucchetto)  ${basename(g)}`); }
    }
    if (aperti) { console.log(`\n${aperti} ${aperti === 1 ? 'gioco è aperto' : 'giochi sono aperti'}: non pubblicare, prima chiudili.`); process.exitCode = 1; }
    return;
  }

  const segreto = await chiediNumero();
  if (!/^\d{1,6}$/.test(segreto)) throw new Error('Il numero segreto è fatto solo di cifre (al massimo 6).');
  console.log(`Password di oggi: ${L.passwordDiOggi(segreto)}`);
  for (const g of giochi) {
    const testo = readFileSync(g, 'utf8');
    const eraChiuso = L.eChiuso(testo);
    let ultimo = -1;
    const chiaro = await L.apri(testo, segreto);
    const nuovo = await L.chiudi(chiaro, segreto, (f) => {
      const p = Math.floor(f * 10);
      if (p !== ultimo) { ultimo = p; process.stdout.write(`\r${basename(g)}: ${Math.round(f * 100)}%   `); }
    });
    writeFileSync(g, nuovo, 'utf8');
    process.stdout.write(`\r${eraChiuso ? 'rinnovato' : 'chiuso'} fino al ${L.scadenza(nuovo)}  ${basename(g)}\n`);
  }
}

main().catch((e) => { console.error(`\nNon ci sono riuscito: ${e && e.message ? e.message : e}`); process.exit(1); });
