// seo/orologio-cloudflare.js — L'orologio del Lab IRC, un Worker gratuito di Cloudflare.
//
// GitHub fa partire le Action programmate anche con ore di ritardo. Questo Worker gira ogni
// 10 minuti (Cron Trigger «*/10 * * * *») e, all'ora giusta di Roma (ora legale compresa),
// fa partire l'Action «Social · post automatico» (promozione-telegram.yml).
// Non contiene chiavi: il token di GitHub sta nel segreto GITHUB_TOKEN del Worker
// (token «fine-grained», solo il repository lab-irc, permesso Actions: Read and write).
// L'Action di GitHub resta anche programmata la sera, come rete di sicurezza: se un post
// è già uscito non esce due volte.
//
// Per cambiare gli orari si cambia PIANO e si incolla di nuovo il codice nel Worker.

const REPO = 'lasoglia/lab-irc';
const WORKFLOW = 'promozione-telegram.yml';

// giorni: 0 domenica, 1 lunedì … 6 sabato · ora di Roma, multipla di 10 minuti ·
// si parte 10 minuti prima dell'uscita (l'Action prepara e poi pubblica)
const PIANO = [
  { giorni: [1, 3, 5], ora: '18:50', coda: 'oggi', che: 'reel delle 19' },
  { giorni: [2], ora: '13:20', coda: 'oggi', che: 'carosello delle 13:30' },
  { giorni: [6], ora: '10:50', coda: 'oggi', che: 'Shabbat delle 11' },
  { giorni: [0], ora: '17:50', coda: 'oggi', che: 'grande domanda delle 18' },
  { giorni: [0], ora: '19:20', coda: 'video', che: 'video della grande domanda alle 19:30' },
];

function oraDiRoma(data) {
  const parti = Object.fromEntries(new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Rome', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(data).map((p) => [p.type, p.value]));
  const giorno = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(parti.weekday);
  return { giorno, ora: `${parti.hour}:${parti.minute}` };
}

async function lancia(env, coda) {
  const risposta = await fetch(`https://api.github.com/repos/${REPO}/actions/workflows/${WORKFLOW}/dispatches`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'orologio-lab-irc',
    },
    body: JSON.stringify({ ref: 'main', inputs: { coda } }),
  });
  if (!risposta.ok) console.log(`GitHub ha risposto ${risposta.status}: ${await risposta.text()}`);
  return risposta.ok;
}

export default {
  async scheduled(evento, env, ctx) {
    const { giorno, ora } = oraDiRoma(new Date(evento.scheduledTime));
    for (const voce of PIANO) {
      if (voce.giorni.includes(giorno) && voce.ora === ora) ctx.waitUntil(lancia(env, voce.coda));
    }
  },

  // Aprendo l'indirizzo del Worker si vede il piano; con /verifica si controlla il token
  // (sola lettura: non fa partire niente).
  async fetch(richiesta, env) {
    const url = new URL(richiesta.url);
    if (url.pathname === '/verifica') {
      const r = await fetch(`https://api.github.com/repos/${REPO}/actions/workflows/${WORKFLOW}`, {
        headers: { Authorization: `Bearer ${env.GITHUB_TOKEN}`, Accept: 'application/vnd.github+json', 'User-Agent': 'orologio-lab-irc' },
      });
      return new Response(r.ok ? 'ok: il token funziona e vede l\'Action dei social.' : `problema: GitHub risponde ${r.status}`,
        { headers: { 'content-type': 'text/plain; charset=utf-8' } });
    }
    const adesso = oraDiRoma(new Date());
    const righe = PIANO.map((v) => `${v.giorni.map((g) => ['dom', 'lun', 'mar', 'mer', 'gio', 'ven', 'sab'][g]).join(', ')} ${v.ora}: ${v.che}`);
    return new Response(`Orologio del Lab IRC: attivo. Ora di Roma: ${adesso.ora}.\n\n${righe.join('\n')}\n`,
      { headers: { 'content-type': 'text/plain; charset=utf-8' } });
  },
};
