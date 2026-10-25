/* Il lucchetto della pagina Verifiche (lo prepara admin/lucchetto.js dalla pagina di importazione).

   data/lucchetto.json contiene una parola di controllo cifrata con la password di ogni giorno
   (giorno × mese + numero segreto del docente). Se la password scritta la apre, è quella giusta:
   si ricorda fino a mezzanotte, sotto la stessa chiave che usano i giochi, così poi si aprono da soli.
   La data è quella del server del sito, in Italia: cambiare l'orologio del telefono non serve.
   Se data/lucchetto.json non c'è (nessun gioco chiuso), la pagina resta aperta. */
const CHIAVE = "lab-lucchetto";
const CONTROLLO = "lab-irc: password giusta";

function daB64(s) { const b = atob(s), u = new Uint8Array(b.length); for (let i = 0; i < b.length; i++) u[i] = b.charCodeAt(i); return u; }
function inItalia(d) {
  const p = {};
  new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Rome", year: "numeric", month: "2-digit", day: "2-digit" })
    .formatToParts(d).forEach((x) => { p[x.type] = x.value; });
  return `${p.year}-${p.month}-${p.day}`;
}
function leggiSalvata() { try { return JSON.parse(localStorage.getItem(CHIAVE) || "null"); } catch (e) { return null; } }
function salva(oggi, pw) { try { localStorage.setItem(CHIAVE, JSON.stringify({ oggi, pw })); } catch (e) { /* senza memoria: si richiede in ogni gioco */ } }

async function apre(P, oggi, pw) {
  const voce = P.giorni && P.giorni[oggi];
  if (!voce) return false;
  const [sale, iv, ct] = voce.split(".").map(daB64);
  try {
    const base = await crypto.subtle.importKey("raw", new TextEncoder().encode(pw), "PBKDF2", false, ["deriveKey"]);
    const kek = await crypto.subtle.deriveKey({ name: "PBKDF2", salt: sale, iterations: P.iter, hash: "SHA-256" }, base, { name: "AES-GCM", length: 256 }, false, ["decrypt"]);
    const grezza = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, kek, ct);
    const k = await crypto.subtle.importKey("raw", grezza, "AES-GCM", false, ["decrypt"]);
    const testo = await crypto.subtle.decrypt({ name: "AES-GCM", iv: daB64(P.iv) }, k, daB64(P.dati));
    return new TextDecoder().decode(testo) === CONTROLLO;
  } catch (e) { return false; }
}

/* { stato: "aperta" | "chiusa" | "scaduta" | "senza-rete", P, oggi } */
export async function statoLucchetto() {
  let r;
  try { r = await fetch("data/lucchetto.json", { cache: "no-store" }); } catch (e) { return { stato: "senza-rete" }; }
  if (r.status === 404) return { stato: "aperta" };
  if (!r.ok) return { stato: "senza-rete" };
  const P = await r.json();
  const data = r.headers.get("date");
  if (!data) return { stato: "senza-rete" };
  const oggi = inItalia(new Date(data));
  if (!P.giorni[oggi]) return { stato: "scaduta", P, oggi };
  const s = leggiSalvata();
  if (s && s.oggi === oggi && s.pw && (await apre(P, oggi, s.pw))) return { stato: "aperta", P, oggi };
  return { stato: "chiusa", P, oggi };
}

export async function provaPassword(P, oggi, pw) {
  const ok = await apre(P, oggi, pw);
  if (ok) salva(oggi, pw);
  return ok;
}
