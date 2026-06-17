// =====================================================================
//  Edge Function: consegna-verifica
//  Lo studente invia la verifica. Qui (lato server):
//   1) si blocca la consegna,
//   2) si leggono le SOLUZIONI (mai esposte al client),
//   3) si correggono le domande a scelta multipla e si calcola il punteggio,
//   4) le domande aperte restano "da correggere".
//  Il client non invia mai un voto: lo calcola e lo scrive il server.
// =====================================================================
import { corsHeaders, jsonResponse } from "../_shared/cors.ts";
import { adminClient } from "../_shared/admin.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return jsonResponse({ errore: "Metodo non consentito" }, 405);

  try {
    const { token_consegna, risposte } = await req.json();
    if (!token_consegna) return jsonResponse({ errore: "Dati mancanti." }, 400);

    const db = adminClient();

    const { data: consegna, error: cErr } = await db
      .from("consegne")
      .select("id, esame_id, started_at, stato")
      .eq("token_consegna", token_consegna)
      .single();

    if (cErr || !consegna) return jsonResponse({ errore: "Consegna non trovata." }, 404);
    if (consegna.stato !== "in_corso") {
      return jsonResponse({ errore: "Verifica già consegnata.", gia_consegnata: true }, 409);
    }

    // Salvataggio finale delle risposte inviate con la consegna (se presenti)
    if (Array.isArray(risposte) && risposte.length) {
      const { data: domande } = await db
        .from("domande").select("id").eq("esame_id", consegna.esame_id);
      const valide = new Set((domande ?? []).map((d) => d.id));
      const righe = risposte
        .filter((r) => r && valide.has(r.domanda_id))
        .map((r) => ({ consegna_id: consegna.id, domanda_id: r.domanda_id, contenuto: r.contenuto ?? null }));
      if (righe.length) {
        await db.from("risposte").upsert(righe, { onConflict: "consegna_id,domanda_id" });
      }
    }

    // Domande + soluzioni (lettura server-side)
    const { data: domande } = await db
      .from("domande")
      .select("id, tipo, punteggio")
      .eq("esame_id", consegna.esame_id);

    const { data: soluzioni } = await db
      .from("soluzioni")
      .select("domanda_id, risposta_corretta")
      .in("domanda_id", (domande ?? []).map((d) => d.id));

    const solById = new Map((soluzioni ?? []).map((s) => [s.domanda_id, s.risposta_corretta]));

    // Risposte salvate dello studente
    const { data: risposteSalvate } = await db
      .from("risposte")
      .select("id, domanda_id, contenuto")
      .eq("consegna_id", consegna.id);
    const rispById = new Map((risposteSalvate ?? []).map((r) => [r.domanda_id, r]));

    let punteggio = 0;
    let punteggioMax = 0;
    let haAperte = false;

    for (const d of domande ?? []) {
      punteggioMax += Number(d.punteggio) || 0;
      const risp = rispById.get(d.id);

      if (d.tipo === "scelta_multipla") {
        const sol = solById.get(d.id);
        const indiceCorretto = sol ? sol.indice : null;
        const indiceScelto = risp && risp.contenuto ? risp.contenuto.indice : null;
        const corretto = indiceCorretto !== null && Number(indiceScelto) === Number(indiceCorretto);
        const ottenuto = corretto ? (Number(d.punteggio) || 0) : 0;
        if (corretto) punteggio += ottenuto;
        if (risp) {
          await db.from("risposte").update({ corretto, punteggio_ottenuto: ottenuto }).eq("id", risp.id);
        }
      } else {
        // domanda aperta: da correggere a mano
        haAperte = true;
        if (risp) {
          await db.from("risposte").update({ corretto: null, punteggio_ottenuto: null }).eq("id", risp.id);
        }
      }
    }

    const percentuale = punteggioMax > 0 ? Math.round((punteggio / punteggioMax) * 1000) / 10 : 0;
    // Se ci sono domande aperte, la consegna resta "consegnata" (in attesa di
    // correzione manuale); altrimenti è già "corretta".
    const stato = haAperte ? "consegnata" : "corretta";

    await db.from("consegne").update({
      submitted_at: new Date().toISOString(),
      punteggio,
      punteggio_max: punteggioMax,
      percentuale,
      stato,
    }).eq("id", consegna.id);

    // Allo studente NON si comunicano le risposte corrette: solo conferma.
    return jsonResponse({ ok: true, consegnata: true, ha_domande_aperte: haAperte });
  } catch (_e) {
    return jsonResponse({ errore: "Richiesta non valida." }, 400);
  }
});
