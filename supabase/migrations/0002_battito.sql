-- =====================================================================
--  Battito: tiene attivo il progetto gratuito di Supabase.
--  Il piano gratuito mette in pausa il progetto dopo 7 giorni senza
--  attività; una semplice lettura con la chiave pubblica non basta.
--  Ogni giorno l'Action «Supabase · tienilo sveglio» chiama battito(),
--  che SCRIVE la data e l'ora in una tabella di una sola riga.
--  Nessun dato personale; la tabella non cresce mai (sempre una riga);
--  con la chiave pubblica si può solo chiamare questa funzione.
--  Da eseguire una volta: Supabase → SQL Editor → New query → Run.
-- =====================================================================
create table if not exists public.battito (
  id     int primary key default 1 check (id = 1),
  ultimo timestamptz not null default now()
);
alter table public.battito enable row level security;   -- nessuna regola: nessuno la legge o la scrive direttamente

create or replace function public.battito()
returns timestamptz
language sql
security definer
set search_path = public
as $$
  insert into public.battito (id, ultimo) values (1, now())
  on conflict (id) do update set ultimo = excluded.ultimo
  returning ultimo;
$$;

revoke all on function public.battito() from public;
grant execute on function public.battito() to anon;
