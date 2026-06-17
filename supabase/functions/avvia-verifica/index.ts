// =====================================================================
//  Edge Function: avvia-verifica
//  Lo studente apre il link e inserisce codice + classe.
//  Questa funzione (lato server) crea la consegna e restituisce le
//  domande SENZA le soluzioni. Le soluzioni non escono mai dal server.
// =====================================================================
import { corsHeaders, jsonResponse } from "../_shared/cors.ts";
import { adminClient } from "../_shared/admin.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return jsonResponse({ errore: "Metodo non consentito" }, 405);

  try {
    const { token_pubblico, codice_studente, classe, nome_reale } = await req.json();

    if (!token_pubblico || !codice_studente || !classe) {
      return jsonResponse({ errore: "Servono codice e classe." }, 400);
    }

    const db = adminClient();

    // La verifica deve esistere ed essere PUBBLICATA
    const { data: esame, error: eErr } = await db
      .from("esami")
      .select("id, titolo, durata_minuti, stato, mostra_nomi_reali, anticheat_config")
      .eq("token_pubblico", token_pubblico)
      .single();

    if (eErr || !esame) return jsonResponse({ errore: "Verifica non trovata." }, 404);
    if (esame.stato !== "pubblicata") {
      return jsonResponse({ errore: "Questa verifica non è al momento disponibile." }, 403);
    }

    // Crea la consegna. Il nome reale si salva solo se la verifica lo prevede.
    const { data: consegna, error: cErr } = await db
      .from("consegne")
      .insert({
        esame_id: esame.id,
        codice_studente: String(codice_studente).trim(),
        classe: String(classe).trim(),
        nome_reale: esame.mostra_nomi_reali && nome_reale ? String(nome_reale).trim() : null,
      })
      .select("id, token_consegna, started_at")
      .single();

    if (cErr || !consegna) return jsonResponse({ errore: "Impossibile avviare la verifica." }, 500);

    // Domande SENZA soluzioni
    const { data: domande, error: dErr } = await db
      .from("domande")
      .select("id, tipo, testo, opzioni, punteggio, ordine")
      .eq("esame_id", esame.id)
      .order("ordine", { ascending: true });

    if (dErr) return jsonResponse({ errore: "Errore nel caricamento delle domande." }, 500);

    return jsonResponse({
      token_consegna: consegna.token_consegna,
      consegna_id: consegna.id,
      started_at: consegna.started_at,
      esame: {
        titolo: esame.titolo,
        durata_minuti: esame.durata_minuti,
        anticheat: !!(esame.anticheat_config && esame.anticheat_config.attivo),
      },
      domande: domande ?? [],
    });
  } catch (_e) {
    return jsonResponse({ errore: "Richiesta non valida." }, 400);
  }
});
