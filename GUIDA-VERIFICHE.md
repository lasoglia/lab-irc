# Guida alle verifiche online (Fase 1 — MVP)

Questa guida ti porta dal niente alla **prima verifica funzionante**. È pensata
per chi non programma: segui i punti **in ordine**. La parte "tecnica" è solo
una, si fa **una volta sola** e poi non si tocca più.

> Due ambienti, due ruoli:
> - **GitHub Pages** = il sito che si vede (le pagine). Già esiste.
> - **Supabase** = il "motore" nascosto (database + correzione). Lo creiamo ora.
> Sono due cose separate, con due "pubblicazioni" diverse. È normale.

---

## Parte A — Crea il progetto Supabase (server in UE)

1. Vai su **https://supabase.com** e registrati (gratuito).
2. Clicca **New project**.
3. Dai un nome (es. `verifiche-irc`), scegli una password per il database
   (salvala da qualche parte) e — **importante** — alla voce *Region* scegli
   **Central EU (Frankfurt)**. Serve per tenere i dati in Europa.
4. Attendi 1–2 minuti che il progetto sia pronto.

### Dove trovare URL e chiavi
Nel progetto: **Project Settings** (icona ingranaggio in basso a sinistra) →
**API**. Qui vedrai:
- **Project URL** (es. `https://abcd1234.supabase.co`)
- **Project API keys**: la chiave **anon public** (pubblica) e la chiave
  **service_role** (SEGRETA: non si copia mai nel sito).

---

## Parte B — Crea le tabelle e le regole di sicurezza

1. Nel progetto Supabase apri **SQL Editor** (menù a sinistra) → **New query**.
2. Apri nel repository il file **`supabase/migrations/0001_schema.sql`**,
   copia **tutto** il contenuto e incollalo nell'editor SQL.
3. Clicca **Run**. Se vedi "Success", le tabelle e le regole sono create.

> Cosa hai appena fatto: hai creato le tabelle (verifiche, domande, soluzioni,
> consegne, risposte) e le **regole di sicurezza (RLS)**. Le soluzioni finiscono
> in una tabella che lo studente non può leggere in alcun modo.

---

## Parte C — Carica le funzioni di correzione (Edge Function)

Le tre funzioni (`avvia-verifica`, `salva-risposte`, `consegna-verifica`)
correggono e calcolano i voti **sul server**. Si caricano con la CLI di Supabase.

### Installa la CLI (una volta sola)
- **Windows:** installa [Scoop](https://scoop.sh) e poi `scoop install supabase`
- **Mac:** `brew install supabase/tap/supabase`
- In alternativa vedi: https://supabase.com/docs/guides/cli

### Collega il progetto e carica le funzioni
Apri il terminale **nella cartella del repository** e incolla, una riga alla volta:

```bash
# 1) Login (si apre il browser)
supabase login

# 2) Collega questo repository al tuo progetto.
#    Sostituisci REFERENCE_ID con quello che trovi in
#    Supabase → Project Settings → General → Reference ID
supabase link --project-ref REFERENCE_ID

# 3) Imposta la chiave SEGRETA service_role (NON va nel sito!)
#    Copiala da Supabase → Project Settings → API → service_role
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=INCOLLA_QUI_LA_SERVICE_ROLE

# 4) Carica le tre funzioni
supabase functions deploy avvia-verifica
supabase functions deploy salva-risposte
supabase functions deploy consegna-verifica
```

> Nota: `SUPABASE_URL` e la chiave anon sono già disponibili alle funzioni in
> automatico; tu devi impostare **solo** la `service_role` (punto 3).
> Questo è un **deploy separato** da GitHub Pages: riguarda solo Supabase.

---

## Parte D — Collega il sito a Supabase

1. Nel repository apri il file **`esami/config.js`**.
2. Incolla tra le virgolette:
   - in `SUPABASE_URL` → il **Project URL**
   - in `SUPABASE_ANON_KEY` → la chiave **anon public**
3. Salva (su GitHub: matita ✏️ → *Commit changes*).

⚠️ In questo file va **solo** la chiave **anon** (è pubblica, va bene così).
La **service_role** non si incolla mai qui: vive solo su Supabase (Parte C).

Dopo 1–2 minuti l'area verifiche sarà online a:
`https://lasoglia.github.io/lab-irc/esami/`

---

## Parte E — Crea il primo account docente

1. Apri `https://lasoglia.github.io/lab-irc/esami/`
2. Clicca **Crea un account**, inserisci email e una password.
3. Se Supabase chiede la conferma via email, controlla la posta e conferma.
   (In alternativa, per evitare la conferma: Supabase → **Authentication** →
   **Providers** → Email → disattiva *Confirm email*.)
4. Torna alla pagina ed **entra**.

---

## Collaudo (prova in 5 minuti)

1. **Docente:** entra → *Nuova verifica* → titolo, classe, durata. Aggiungi
   una domanda a **scelta multipla** (seleziona il pallino della risposta giusta)
   e una **a risposta aperta**. *Salva bozza*.
2. Nell'elenco, clicca **Pubblica** → poi **Link** → **Copia** l'indirizzo.
3. **Studente:** apri quel link (anche in una finestra anonima o sul telefono).
   Inserisci un **codice** (es. `S01`) e la **classe**. Svolgi e **Consegna**.
4. **Docente:** dalla verifica clicca **Risultati**: vedrai la consegna con il
   punteggio delle domande chiuse; la domanda aperta risulta "da correggere".

✅ Se questo flusso funziona, l'MVP è a posto.

### Cosa controllare (checklist)
- [ ] Lo studente vede solo codice + classe (niente nome, salvo richiesta).
- [ ] Il timer scorre; allo scadere la verifica si invia da sola.
- [ ] Dopo la consegna la verifica è bloccata.
- [ ] Le risposte aperte appaiono in MAIUSCOLO mentre si scrive.
- [ ] Nel link dello studente non compaiono mai le risposte corrette
      (puoi verificarlo: tasto destro → *Visualizza sorgente*, non ci sono).

---

## Novità della Fase 2 (robustezza)

Rispetto alla Fase 1, due Edge Function sono cambiate: bisogna **ricaricarle**
su Supabase (stessa procedura della Parte C):

```
supabase functions deploy avvia-verifica
supabase functions deploy consegna-verifica
```

Cosa cambia per chi usa il sito:

- **Ripresa della verifica**: se uno studente chiude il browser (o gli si
  scarica il telefono) e riapre lo stesso link inserendo lo **stesso codice
  e la stessa classe**, ritrova esattamente il punto in cui era: il tempo
  rimanente è quello vero, calcolato dal server fin dal primo avvio, non
  riparte da capo.
- **Tempo autorevole anche alla consegna**: se la verifica viene inviata in
  ritardo rispetto alla scadenza (oltre qualche secondo di margine tecnico),
  il server ignora eventuali ultime modifiche e corregge solo ciò che era
  già stato salvato in tempo.
- **Tema chiaro/scuro**: in basso a destra, sia per il docente che per lo
  studente, c'è un piccolo pulsante (🌙/☀️) per cambiare tema. La scelta
  resta salvata solo su quel dispositivo.
- **Connessione che va e viene**: durante il salvataggio automatico, se la
  rete manca per un istante il sito ritenta da solo; se manca proprio al
  momento della consegna finale, il sito avvisa lo studente e (se era una
  consegna automatica per tempo scaduto) ritenta da solo ogni pochi secondi.

---

## Novità della Fase 3 (statistiche e anti-cheat opzionale)

Questa volta non c'è nessuna funzione da ricaricare su Supabase: sono solo
modifiche al sito, quindi bastano 1-2 minuti dopo il salvataggio su GitHub
perché compaiano online.

Cosa cambia:

- **Statistiche nei risultati**: aprendo "Risultati" di una verifica trovi
  ora un riquadro con consegne ricevute, media, voto più alto/più basso e,
  per ogni domanda, la percentuale di risposte corrette (scelta multipla) o
  il punteggio medio assegnato (risposta aperta).
- **Esporta CSV**: nella pagina "Risultati" c'è un pulsante "Esporta CSV"
  che scarica un file apribile con Excel o Fogli Google, con tutti i dati
  della tabella (utile per il registro o per condividerli).
- **Interruttore anti-cheat**: nell'editor di una verifica (quando è in
  bozza) trovi ora la voce "Attiva il controllo anti-cheat per questa
  verifica". È **spenta di default**: se la lasci com'è, nulla cambia per
  gli studenti. Se la attivi, durante quella verifica copia/incolla e tasto
  destro sono bloccati e il sistema registra se lo studente cambia
  scheda/finestra; questi eventi si vedono poi cliccando "Correggi" sulla
  singola consegna.

---

## Privacy (leggi prima dell'uso reale)

- Di default si usano **codici pseudonimi**, non nomi reali: la corrispondenza
  codice→studente resta **offline**, in mano al docente.
- La modalità "nomi reali" è disattivata e va attivata solo dopo aver verificato
  la base giuridica con **DS/DSGA/DPO** della scuola.
- I dati stanno su **server UE (Frankfurt)**.
- L'informativa in `esami/privacy.html` è un **segnaposto**: va completata con il
  **DPO/RPD** dell'istituto prima di usare la piattaforma con gli studenti.

---

## Se qualcosa non va

- *"Configurazione mancante"* sull'area verifiche → manca il punto della Parte D.
- *"Verifica non trovata"* per lo studente → la verifica non è **pubblicata**,
  oppure il link è sbagliato.
- L'accesso docente non funziona → controlla email/password; se hai appena creato
  l'account, potrebbe servire la conferma via email (Parte E, punto 3).
- La consegna dà errore → controlla che le funzioni siano caricate (Parte C) e
  che la `service_role` sia impostata.
