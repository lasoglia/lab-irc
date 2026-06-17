// Inizializza il client Supabase per il browser.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "../config.js";

export const configurato =
  SUPABASE_URL && !SUPABASE_URL.startsWith("INCOLLA") &&
  SUPABASE_ANON_KEY && !SUPABASE_ANON_KEY.startsWith("INCOLLA");

// SICUREZZA (scelta concordata): la sessione del docente NON viene salvata nel
// browser (persistSession:false). Resta solo in memoria: ricaricando la pagina
// il docente rifà il login. Così nessun artefatto HTML del sito può rubarla.
export const sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  },
});
