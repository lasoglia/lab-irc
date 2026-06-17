-- =====================================================================
--  LAB-IRC · Piattaforma verifiche · Schema iniziale
-- =====================================================================
--  Come si applica (te lo spiego nel README):
--    supabase db push
--  oppure incollando questo file nell'editor SQL di Supabase.
--
--  PRINCIPI DI SICUREZZA (vedi §3 del progetto):
--   - RLS attiva su TUTTE le tabelle.
--   - Il ruolo "anon" (lo studente, non autenticato) NON ha alcuna policy:
--     quindi non può leggere/scrivere nulla direttamente. Lo studente passa
--     SOLO dalle Edge Function, che usano la chiave service_role lato server.
--   - Il docente (ruolo "authenticated") accede solo ai PROPRI dati.
--   - Le SOLUZIONI stanno in una tabella separata: il ruolo anon non può
--     leggerla in nessun modo. Le legge solo l'Edge Function di correzione.
-- =====================================================================

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------
--  TABELLE
-- ---------------------------------------------------------------------

-- Profilo del docente (collegato all'utente di Supabase Auth)
create table if not exists public.profili_docenti (
  id        uuid primary key references auth.users(id) on delete cascade,
  nome      text,
  creato_il timestamptz not null default now()
);

-- Le verifiche
create table if not exists public.esami (
  id                uuid primary key default gen_random_uuid(),
  titolo            text not null,
  classe            text not null,
  durata_minuti     integer not null default 30 check (durata_minuti > 0),
  stato             text not null default 'bozza'
                      check (stato in ('bozza','pubblicata','chiusa')),
  -- token usato nel link pubblico per gli studenti (non espone l'id interno)
  token_pubblico    uuid not null unique default gen_random_uuid(),
  -- privacy: di default NON si raccolgono nomi reali (solo codice + classe)
  mostra_nomi_reali boolean not null default false,
  -- anti-cheat: spento di default, configurabile per singola verifica
  anticheat_config  jsonb not null default '{"attivo": false}'::jsonb,
  created_by        uuid not null references auth.users(id) on delete cascade,
  created_at        timestamptz not null default now(),
  published_at      timestamptz
);

-- Le domande di una verifica
create table if not exists public.domande (
  id        uuid primary key default gen_random_uuid(),
  esame_id  uuid not null references public.esami(id) on delete cascade,
  tipo      text not null check (tipo in ('scelta_multipla','aperta')),
  testo     text not null,
  opzioni   jsonb,        -- scelta_multipla: ["Opzione A","Opzione B", ...]
  punteggio numeric not null default 1 check (punteggio >= 0),
  ordine    integer not null default 0
);

-- Le soluzioni (TABELLA SENSIBILE: mai leggibile dal ruolo anon)
create table if not exists public.soluzioni (
  id                uuid primary key default gen_random_uuid(),
  domanda_id        uuid not null unique references public.domande(id) on delete cascade,
  -- scelta_multipla: {"indice": 0}  (indice dell'opzione corretta)
  risposta_corretta jsonb not null
);

-- Le consegne (un tentativo di uno studente su una verifica)
create table if not exists public.consegne (
  id             uuid primary key default gen_random_uuid(),
  esame_id       uuid not null references public.esami(id) on delete cascade,
  codice_studente text not null,
  classe         text not null,
  nome_reale     text,                          -- valorizzato solo se mostra_nomi_reali = true
  -- segreto dello studente: gli permette di salvare/riprendere la SUA consegna
  -- senza login (serve a timer e autosalvataggio). Non è mai esposto ad altri.
  token_consegna uuid not null unique default gen_random_uuid(),
  started_at     timestamptz not null default now(),
  submitted_at   timestamptz,
  punteggio      numeric,
  punteggio_max  numeric,
  percentuale    numeric,
  stato          text not null default 'in_corso'
                   check (stato in ('in_corso','consegnata','corretta'))
);

-- Le risposte dello studente
create table if not exists public.risposte (
  id                 uuid primary key default gen_random_uuid(),
  consegna_id        uuid not null references public.consegne(id) on delete cascade,
  domanda_id         uuid not null references public.domande(id) on delete cascade,
  -- scelta_multipla: {"indice": 1}   aperta: {"testo": "..."}
  contenuto          jsonb,
  corretto           boolean,   -- null = ancora da correggere (domande aperte)
  punteggio_ottenuto numeric,
  unique (consegna_id, domanda_id)
);

-- Eventi anti-cheat (popolata in Fase 4; tabella già pronta)
create table if not exists public.eventi_anticheat (
  id          uuid primary key default gen_random_uuid(),
  consegna_id uuid not null references public.consegne(id) on delete cascade,
  tipo        text not null,
  avvenuto_il timestamptz not null default now(),
  dettagli    jsonb
);

-- ---------------------------------------------------------------------
--  INDICI
-- ---------------------------------------------------------------------
create index if not exists idx_esami_created_by    on public.esami(created_by);
create index if not exists idx_esami_token         on public.esami(token_pubblico);
create index if not exists idx_domande_esame       on public.domande(esame_id);
create index if not exists idx_consegne_esame      on public.consegne(esame_id);
create index if not exists idx_risposte_consegna   on public.risposte(consegna_id);
create index if not exists idx_eventi_consegna     on public.eventi_anticheat(consegna_id);

-- ---------------------------------------------------------------------
--  ROW LEVEL SECURITY
-- ---------------------------------------------------------------------
alter table public.profili_docenti enable row level security;
alter table public.esami           enable row level security;
alter table public.domande         enable row level security;
alter table public.soluzioni       enable row level security;
alter table public.consegne        enable row level security;
alter table public.risposte        enable row level security;
alter table public.eventi_anticheat enable row level security;

-- Nessuna policy per il ruolo "anon": di default è tutto NEGATO.
-- Lo studente opera solo tramite Edge Function (service_role).

-- ---- profili_docenti: ognuno vede/gestisce solo se stesso ----
create policy "profilo_select" on public.profili_docenti
  for select to authenticated using (id = auth.uid());
create policy "profilo_insert" on public.profili_docenti
  for insert to authenticated with check (id = auth.uid());
create policy "profilo_update" on public.profili_docenti
  for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

-- ---- esami: il docente gestisce solo i propri ----
create policy "esami_select" on public.esami
  for select to authenticated using (created_by = auth.uid());
create policy "esami_insert" on public.esami
  for insert to authenticated with check (created_by = auth.uid());
create policy "esami_update" on public.esami
  for update to authenticated using (created_by = auth.uid()) with check (created_by = auth.uid());
create policy "esami_delete" on public.esami
  for delete to authenticated using (created_by = auth.uid());

-- ---- domande: accesso solo se la verifica è del docente ----
create policy "domande_select" on public.domande
  for select to authenticated using (
    exists (select 1 from public.esami e where e.id = domande.esame_id and e.created_by = auth.uid()));
create policy "domande_insert" on public.domande
  for insert to authenticated with check (
    exists (select 1 from public.esami e where e.id = domande.esame_id and e.created_by = auth.uid()));
create policy "domande_update" on public.domande
  for update to authenticated using (
    exists (select 1 from public.esami e where e.id = domande.esame_id and e.created_by = auth.uid()))
  with check (
    exists (select 1 from public.esami e where e.id = domande.esame_id and e.created_by = auth.uid()));
create policy "domande_delete" on public.domande
  for delete to authenticated using (
    exists (select 1 from public.esami e where e.id = domande.esame_id and e.created_by = auth.uid()));

-- ---- soluzioni: SOLO il docente proprietario (mai il ruolo anon) ----
create policy "soluzioni_select" on public.soluzioni
  for select to authenticated using (
    exists (select 1 from public.domande d join public.esami e on e.id = d.esame_id
            where d.id = soluzioni.domanda_id and e.created_by = auth.uid()));
create policy "soluzioni_insert" on public.soluzioni
  for insert to authenticated with check (
    exists (select 1 from public.domande d join public.esami e on e.id = d.esame_id
            where d.id = soluzioni.domanda_id and e.created_by = auth.uid()));
create policy "soluzioni_update" on public.soluzioni
  for update to authenticated using (
    exists (select 1 from public.domande d join public.esami e on e.id = d.esame_id
            where d.id = soluzioni.domanda_id and e.created_by = auth.uid()))
  with check (
    exists (select 1 from public.domande d join public.esami e on e.id = d.esame_id
            where d.id = soluzioni.domanda_id and e.created_by = auth.uid()));
create policy "soluzioni_delete" on public.soluzioni
  for delete to authenticated using (
    exists (select 1 from public.domande d join public.esami e on e.id = d.esame_id
            where d.id = soluzioni.domanda_id and e.created_by = auth.uid()));

-- ---- consegne: il docente legge/aggiorna/cancella quelle delle proprie verifiche ----
--  (l'inserimento lo fa l'Edge Function con service_role, che ignora la RLS)
create policy "consegne_select" on public.consegne
  for select to authenticated using (
    exists (select 1 from public.esami e where e.id = consegne.esame_id and e.created_by = auth.uid()));
create policy "consegne_update" on public.consegne
  for update to authenticated using (
    exists (select 1 from public.esami e where e.id = consegne.esame_id and e.created_by = auth.uid()))
  with check (
    exists (select 1 from public.esami e where e.id = consegne.esame_id and e.created_by = auth.uid()));
create policy "consegne_delete" on public.consegne
  for delete to authenticated using (
    exists (select 1 from public.esami e where e.id = consegne.esame_id and e.created_by = auth.uid()));

-- ---- risposte: il docente legge/aggiorna quelle delle proprie verifiche ----
--  (l'update servirà alla correzione manuale delle domande aperte, Fase 3)
create policy "risposte_select" on public.risposte
  for select to authenticated using (
    exists (select 1 from public.consegne c join public.esami e on e.id = c.esame_id
            where c.id = risposte.consegna_id and e.created_by = auth.uid()));
create policy "risposte_update" on public.risposte
  for update to authenticated using (
    exists (select 1 from public.consegne c join public.esami e on e.id = c.esame_id
            where c.id = risposte.consegna_id and e.created_by = auth.uid()))
  with check (
    exists (select 1 from public.consegne c join public.esami e on e.id = c.esame_id
            where c.id = risposte.consegna_id and e.created_by = auth.uid()));

-- ---- eventi_anticheat: il docente legge quelli delle proprie verifiche ----
create policy "eventi_select" on public.eventi_anticheat
  for select to authenticated using (
    exists (select 1 from public.consegne c join public.esami e on e.id = c.esame_id
            where c.id = eventi_anticheat.consegna_id and e.created_by = auth.uid()));
