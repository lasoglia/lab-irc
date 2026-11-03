-- =====================================================================
--  Sicurezza (3 novembre 2026, dopo il controllo degli avvisi di Supabase)
--  1. Via la regola «eventi_insert» su eventi_anticheat: era nel database ma
--     non in 0001_schema.sql e permetteva a chiunque, con la chiave pubblica,
--     di inserire falsi eventi anti-copiatura. Gli studenti li registrano
--     solo tramite la Edge Function registra-evento-anticheat (service_role).
--  2. Doppia protezione: la chiave pubblica (anon) non ha più nessun
--     permesso diretto sulle tabelle. Gli studenti passano sempre dalle
--     Edge Function; il docente usa il ruolo authenticated; il battito
--     resta una funzione chiamabile da anon.
--  3. battito() non serve agli utenti autenticati.
-- =====================================================================
drop policy if exists "eventi_insert" on public.eventi_anticheat;

revoke all on public.profili_docenti, public.esami, public.domande, public.soluzioni,
              public.consegne, public.risposte, public.eventi_anticheat, public.battito from anon;
alter default privileges in schema public revoke all on tables from anon;

revoke execute on function public.battito() from authenticated;
grant execute on function public.battito() to anon;
