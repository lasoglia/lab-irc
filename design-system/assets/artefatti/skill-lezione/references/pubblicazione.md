# File pronti per il sito

Il sito personale di riferimento è [LAB-IRC](https://lasoglia.github.io/lab-irc/). Queste indicazioni descrivono la struttura letta il 19 settembre 2026; prima di una modifica reale al catalogo controlla la struttura corrente. Preparare i file non comporta pubblicarli: intervieni sul sito solo quando il docente lo richiede.

## Pacchetto di una lezione

Applica le regole di archiviazione del progetto e la sezione «Archiviazione e nomi» dei [principi](principi-e-lezione.md). Nel progetto IRC la cartella è `materiali/Anno <classe>/UDA <n> - <titolo>/Lezione <n> - <slug>/`, con `pubblica/` per gli studenti e `docente/` per dossier, sorgenti, note, prompt e fonti. Ogni nome in tabella è abbreviato: anteponi `<classe> <uda>-<lezione> ` quando gli identificativi sono noti, per esempio `V 1-1 il-cosmo-esaurisce-le-domande-fascicolo.pdf`. Fuori dal progetto, o con identificativi mancanti, usa la cartella indicata e non inventare numeri. Le risorse incorporate usano percorsi relativi, mai indirizzi del computer.

| Prodotto | Nome del file | Tipo nel catalogo LAB-IRC |
|---|---|---|
| Artefatto interattivo (cuore della lezione) | `<slug>-artefatto.html`, più `<slug>-testo.txt` con il testo della modalità Studio | `Artefatto interattivo` |
| Testo di studio | `<slug>-fascicolo.pdf` | `Documento/PDF` |
| Slide (facoltative) | `<slug>-slide.pdf`, con `<slug>-slide.pptx` disponibile al docente | `Slide` |

Le slide si producono solo su richiesta esplicita. Se sarebbero utili ma non sono richieste, suggeriscile in una riga senza produrle. Se esistono, il PDF è la versione consultabile senza visualizzatore Office e il PPTX resta a disposizione del docente; sono due formati dello stesso prodotto. Il sorgente `<slug>-lezione.js` dell'artefatto va nella cartella `docente/`.

Slug minuscolo senza accenti né spazi; includi UDA e tema quando disponibili. Non inventare numeri o UDA per compilare il nome. Sostituisci il prodotto corrente soltanto per una revisione richiesta. Se un file omonimo appartiene a un altro lavoro, conserva entrambi in cartelle distinte. Non accumulare versioni nella lezione: per le copie precedenti segui le regole di archiviazione del progetto.

## Catalogo

La versione osservata usa oggetti contenitore nei JSON: per esempio `data/materiali.json` ha una proprietà `materiali` che contiene l'array delle schede. Conserva l'involucro corrente, gli altri record e tutti i campi non interessati. Non sostituire l'intero file con il solo record nuovo.

Questo è un **esempio di record**, non un catalogo completo. Numeri e titoli sono illustrativi: usa quelli confermati per il materiale reale, mantenendo il prefisso nel nome del file:

```json
{
  "titolo": "Appunti per lo studente",
  "anno": "5",
  "uda": "Scienza e fede",
  "lezione": "Lemaitre e Einstein",
  "tipo": "Documento/PDF",
  "file": "/uploads/V 1-1 scienza-e-fede-lemaitre-einstein-fascicolo.pdf",
  "in_evidenza": false
}
```

Consegna un record per ciascun materiale di lezione richiesto e realmente creato. Se artefatto, fascicolo ed eventuali slide sono richiesti e completati, i record principali sono due o tre; il file `.txt` del testo si carica a parte, con un record `Documento/PDF` solo se il docente lo vuole in catalogo. La verifica UDA usa le tabelle delle prove, non questo catalogo dei materiali. Non registrare file mancanti né il solo prompt come `Slide`.

I campi `uda` e `lezione` devono coincidere con i titoli esistenti, compresi accenti e grafia. Nel caso già pubblicato il catalogo usa `Lemaitre e Einstein`: non correggerlo isolatamente in un nuovo record. Classe, UDA e lezione non note si risolvono prima dell'inserimento nel catalogo, senza bloccare la creazione del file. Le schede nuove di UDA o lezione si preparano soltanto se necessarie, controllando gli attuali `data/uda.json` e `data/lezioni.json`.

Il campo `file` usa `/uploads/...` secondo la convenzione del catalogo. L'URL pubblico del sito include il sottopercorso `/lab-irc/`: non trattare quel campo come un URL pubblico assoluto e non aggiungere due volte il prefisso. Verifica il collegamento risolto dal sito quando effettui una pubblicazione.

## HTML nel visualizzatore

Il visualizzatore osservato usa:

```html
<iframe sandbox="allow-scripts allow-forms allow-modals allow-popups allow-downloads"
        allow="fullscreen; clipboard-write"></iframe>
```

Manca `allow-same-origin`: l'artefatto riceve un'origine opaca. Lo storage del browser può generare eccezioni. Per questo l'artefatto usa stato in memoria e risorse incorporate (React, font e kit sono dentro l'HTML), senza dipendere dal sito padre. Le sole preferenze salvate dal kit (tema `tema_lab`, modalità LIM `lim_lab`, suoni, skin e ultima scheda dei giochi) sono protette da try/catch e nel sandbox si perdono senza errori: la modalità LIM si riattiva dal pulsante in testata o con il tasto L. Non correggere il problema indebolendo il sandbox.

## Prima della consegna

Controlla apertura del file, nomi coerenti, file realmente presenti, assenza di percorsi locali incorporati e separazione dalle note del docente. Per il PDF verifica anche dimensioni ragionevoli e testo selezionabile. Per le slide incorpora tutte le immagini, senza collegamenti temporanei. Per l'artefatto prova l'iframe e un'apertura autonoma offline.

Nelle note indica file da caricare, record relativo e verifiche svolte. Dichiara «pronto da caricare» quando è preparato; «pubblicato» soltanto dopo una pubblicazione richiesta ed effettivamente verificata.
