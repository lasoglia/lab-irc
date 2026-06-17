// Client Supabase con privilegi service_role, usato SOLO lato server (Edge Function).
// La chiave service_role arriva dalle variabili d'ambiente della funzione:
// non è MAI nel repository né nel client.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

export function adminClient() {
  const url = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !serviceKey) {
    throw new Error("Variabili d'ambiente Supabase mancanti");
  }
  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
