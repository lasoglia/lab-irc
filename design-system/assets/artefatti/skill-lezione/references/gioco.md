# Giochi dentro l'artefatto

I giochi fanno parte dell'artefatto di lezione (modalità **Giochi**) e sono richiamati dalle scene con il blocco `{ tipo: 'gioco', id }`. Il motore è quello di LAB-IRC: dodici meccaniche, HUD con punti, vite, tempo, suoni sintetici disattivabili, schermata finale con stelle e skin `arcade` (predefinita) o `tavolo` (`--skin tavolo`). Si scrivono soltanto i dati in `LEZIONE.giochi`; compaiono solo le schede dei giochi presenti.

Se il docente chiede **solo un gioco**, produci comunque un artefatto con lo stesso assemblaggio: una o due scene essenziali (consegna e restituzione) e i giochi. Non serve una lezione completa.

## Sfida a squadre sempre presente

In ogni lezione interattiva inserisci **Sfida a squadre**, il gioco `sfida` del motore, con un insieme non vuoto di domande sul dossier. È obbligatorio per tutte le classi: gli esempi di meccaniche sotto non limitano questa regola. Le attività delle scene non lo sostituiscono. Usa nomi collettivi delle squadre, senza nomi degli studenti; non assegnare punti alle convinzioni personali.

Può costituire la pausa oppure affiancare un'altra meccanica nella modalità Giochi. Non aggiungere minuti oltre i 50: se è il gioco della pausa, riserva 5–8 minuti comprensivi di consegna e restituzione; altrimenti dichiara nelle note quando usarlo. Se la pausa precede una spiegazione, le domande richiedono soltanto nozioni già affrontate. Le note riportano soluzioni, ragioni, restituzione e variante senza proiettore. Collauda avvio, alternanza dei turni, errore e rubata, punteggio e risultato.

## La pausa gioco

In ogni lezione c'è **almeno una pausa gioco** presa dal motore giochi: 5–8 minuti, restituzione compresa, lanciata da una scena con il blocco `gioco`. Finito il gioco, «Torna alla lezione · scena N» riporta alla stessa scena: il kit conserva la posizione e le risposte già date. Il punto e la meccanica li decide il contenuto:

- **in apertura**, se bisogna attivare ciò che i ragazzi già sanno: crea curiosità e raccogli ipotesi; le soluzioni non richiedono nozioni ancora da spiegare (adatti: `cat` con situazioni concrete, `vf` su luoghi comuni, `rifl`);
- **a metà**, se serve cambiare ritmo dopo il nucleo più denso: fai distinguere, collegare, correggere un equivoco appena emerso (`vf`, `abbina`, `memory`, `cat`, `seq`, `sfida`);
- **in chiusura**, se serve ripassare: usa il concetto in un caso nuovo e restituisci una spiegazione breve (`quiz` con `why`, `completa`, `cruci`).

Scegli **una meccanica principale** per la pausa. Gli altri giochi restano disponibili per il ripasso a casa, ma non entrano nel conteggio dei 50 minuti; a fine lezione il blocco `continua` può rimandarvi (`vai: 'giochi'`). Non mettere la pausa gioco soltanto fra le varianti del laboratorio: se il docente sceglie un'altra variante, il gioco sparirebbe dall'ora. Un glossario cliccabile, da solo, non è un gioco.

Le attività di classe della lezione (sondaggio d'ingresso e d'uscita, nuvola di parole, «Chi lo dice?», quiz a stelle: vedi [artefatto.md](artefatto.md)) danno ritmo e divertimento dentro le scene, ma non sostituiscono la pausa gioco. Il sondaggio d'opinione sta nella lezione (blocco `domanda`, con `confronta` per il prima e il dopo); il gioco `sondaggio` resta per il ripasso o per un dibattito.

## Meccaniche per classe (esempi, non vincoli)

| Classe | Meccaniche adatte | Che cosa fa lo studente |
|---|---|---|
| I | `cat`, `abbina`, `memory`, `vf` | Riconosce un dettaglio, sceglie, dice il motivo. |
| II | `seq`, `abbina`, `sfida` | Riconosce una relazione, ordina, confronta due conseguenze. |
| III | `cat` con fatto e interpretazione, `seq`, `quiz` | Seleziona l'indizio che sostiene una ricostruzione. |
| IV | `quiz` sulle cause, `sfida`, `completa` | Individua un salto logico, pesa gli elementi. |
| V | `rifl`, `quiz` argomentativo, `sfida` | Sceglie una ragione difendibile, riconosce un limite. |

Evita i quiz di sole date se l'obiettivo è un principio teologico. Non far classificare come giusta o sbagliata una posizione personale: per quello servono il sondaggio della lezione (`domanda`) e `rifl`, senza punteggio.

## Formato dei dati

```js
giochi: {
  quiz:  [ { q: 'Domanda', a: ['A', 'B', 'C', 'D'], ok: 1, why: 'Spiegazione' } ],          // 3 vite
  vf:    [ { s: 'Affermazione', v: false, why: 'Perché' } ],                                // tasti V/F
  flash: [ ['Termine', 'Definizione'] ],
  memory:[ ['Termine', 'Abbinamento breve'] ],                                              // 5–8 coppie
  abbina:[ ['Sinistra', 'Destra'] ],                                                        // max 5 coppie
  cat:   { bins: ['Categoria A', 'Categoria B'], items: [ ['Frase', 0], ['Frase', 1] ] },   // indice del contenitore
  seq:   [ { t: 'Evento', y: 'Data' } ],                                                    // già in ordine corretto
  completa: { testo: 'Frase con {parola} da {completare}.', extra: ['distrattore'] },
  cruci: { rows: 8, cols: 9, words: [ { n: 1, dir: 'o'|'v', r: 0, c: 0, w: 'PAROLA', clue: 'Definizione' } ] },
  sfida: [ { q: 'Domanda', a: ['A', 'B', 'C', 'D'], ok: 0 } ],                              // due squadre alla LIM
  sondaggio: [ { q: 'Domanda aperta', a: ['Sì', 'No', 'Non so'], dibattito: 'Rilancio' } ],
  rifl:  { domanda: 'Oggi, dove ti collochi?', poli: ['Polo A', 'Centro', 'Polo B'], spunto: 'Traccia per la frase' }
}
```

Controlli sui dati:

- `quiz`, `sfida`: varia la posizione di `ok`; ogni distrattore deve essere plausibile, non ridicolo; `why` spiega la risposta, non la ripete.
- `seq`: gli eventi si scrivono nell'ordine giusto (il motore li mescola); le date devono essere verificate.
- `cruci`: parole in maiuscolo senza spazi né apostrofi; le lettere negli incroci devono coincidere. Verifica la griglia con uno script prima dell'assemblaggio: ogni cella condivisa deve ricevere la stessa lettera e nessuna parola deve uscire da `rows` o `cols`.
- `completa`: ogni `{parola}` deve essere l'unica soluzione sensata in quel punto. Qui le graffe segnano i buchi da completare: è un formato dei giochi, diverso dalle parole nuove `{parola}` delle scene.
- `rifl`: la frase scritta resta **solo in memoria** e sparisce alla chiusura (il motore della skill non la salva nel browser); non si raccoglie né si valuta.
- `sondaggio`: i voti si contano a mano alzata e restano solo nella pagina aperta; nessun nome.

## Nelle note del docente

Per ogni gioco usato nell'ora indica: momento e minuti, compresa la restituzione; regola in una frase; soluzioni e ragioni; due domande di restituzione; variante senza proiettore (voce, mani alzate o carta).
