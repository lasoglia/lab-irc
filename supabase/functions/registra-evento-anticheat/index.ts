// =====================================================================
//  Edge Function: registra-evento-anticheat
//  Lo studente non può scrivere direttamente sulla tabella eventi_anticheat
//  (RLS nega tutto al ruolo anon, come da regole di sicurezza). Questa
//  funzione registra l'evento lato server, identificando la consegna dal
//  token_consegna (segreto dello studente) senza esporre l'id interno.
// =====================================================================
import { corsHeaders, jsonResponse } from "../_shared/cors.ts";
import { adminClient } from "../_shared/admin.ts";

const TIPI_VALIDI = new Set(["cambio_scheda", "perdita_focus"]);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return jsonResponse({ errore: "Metodo non consentito" }, 405);

  try {
    const { token_consegna, tipo, dettagli } = await req.json();
    if (!token_consegna || !TIPI_VALIDI.has(tipo)) {
      return jsonResponse({ errore: "Dati mancanti." }, 400);
    }

    const db = adminClient();

    const { data: consegna, error: cErr } = await db
      .from("consegne")
      .select("id")
      .eq("token_consegna", token_consegna)
      .single();

    if (cErr || !consegna) return jsonResponse({ errore: "Consegna non trovata." }, 404);

    await db.from("eventi_anticheat").insert({
      consegna_id: consegna.id,
      tipo,
      dettagli: dettagli ?? null,
    });

    return jsonResponse({ ok: true });
  } catch (_e) {
    return jsonResponse({ errore: "Richiesta non valida." }, 400);
  }
});
