// =====================================================================
//  Edge Function: salva-risposte
//  Autosalvataggio: lo studente invia le risposte parziali, identificandosi
//  con il proprio token_consegna (segreto). Nessun voto viene mai inviato
//  dal client: qui si salva solo il contenuto delle risposte.
// =====================================================================
import { corsHeaders, jsonResponse } from "../_shared/cors.ts";
import { adminClient } from "../_shared/admin.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return jsonResponse({ errore: "Metodo non consentito" }, 405);

  try {
    const { token_consegna, risposte } = await req.json();
    if (!token_consegna || !Array.isArray(risposte)) {
      return jsonResponse({ errore: "Dati mancanti." }, 400);
    }

    const db = adminClient();

    // La consegna deve esistere ed essere ancora "in_corso"
    const { data: consegna, error: cErr } = await db
      .from("consegne")
      .select("id, esame_id, started_at, stato")
      .eq("token_consegna", token_consegna)
      .single();

    if (cErr || !consegna) return jsonResponse({ errore: "Consegna non trovata." }, 404);
    if (consegna.stato !== "in_corso") {
      return jsonResponse({ errore: "La verifica è già stata consegnata." }, 409);
    }

    // Controllo scadenza tempo (il server è l'autorità sul timer)
    const { data: esame } = await db
      .from("esami")
      .select("durata_minuti")
      .eq("id", consegna.esame_id)
      .single();
    const scadenza = new Date(consegna.started_at).getTime() + (esame?.durata_minuti ?? 0) * 60000;
    if (Date.now() > scadenza + 5000) {
      return jsonResponse({ errore: "Tempo scaduto.", scaduto: true }, 409);
    }

    // Quali domande appartengono davvero a questa verifica
    const { data: domande } = await db
      .from("domande").select("id").eq("esame_id", consegna.esame_id);
    const valide = new Set((domande ?? []).map((d) => d.id));

    const righe = risposte
      .filter((r) => r && valide.has(r.domanda_id))
      .map((r) => ({
        consegna_id: consegna.id,
        domanda_id: r.domanda_id,
        contenuto: r.contenuto ?? null,
      }));

    if (righe.length) {
      const { error: upErr } = await db
        .from("risposte")
        .upsert(righe, { onConflict: "consegna_id,domanda_id" });
      if (upErr) return jsonResponse({ errore: "Salvataggio non riuscito." }, 500);
    }

    return jsonResponse({ ok: true, salvate: righe.length });
  } catch (_e) {
    return jsonResponse({ errore: "Richiesta non valida." }, 400);
  }
});
