# Chi cura chi non può ricambiare? · Note del docente (Anno III, UDA 1, lezione 3)

Artefatto: `uploads/iii-1-3-chi-cura-chi-non-puo-ricambiare-artefatto.html` (stesso nome di prima: il sito lo collega per nome).
Sorgente: `sorgenti-lezioni/iii-1-3-chi-cura-chi-non-puo-ricambiare.js` · Testo di studio: `…-chi-cura-chi-non-puo-ricambiare.testo.txt`.
Fascicolo (invariato): `uploads/iii-1-3-chi-cura-chi-non-puo-ricambiare-fascicolo.pdf`.

La guida completa per condurre l'ora (regia scena per scena, nozioni, domande dei ragazzi, piano di regia, variante senza
proiettore) è **dentro l'artefatto**: pulsante «Guida» nella testata o tasto G. Queste note dicono soltanto che cosa è
cambiato il 14 ottobre 2026 e come si aggiorna il file.

## Che cosa è cambiato il 14 ottobre 2026 e perché

Il docente ha segnalato che la lezione non diceva da dove partiva, perché, né dove voleva arrivare, e che il passaggio dagli
ospedali in generale a Santo Spirito in Sassia arrivava senza una ragione. Il motivo: Santo Spirito compariva sullo schermo
solo alla scena 5, mentre le scene 1–4 parlavano di un aiuto in generale, di un Vangelo e di una parola.

Ora **Santo Spirito è il filo dell'ora fin dalla prima scena**, che è anche il terzo «luogo che cambia la vita» dell'unità,
dopo il monastero (lezione 1) e l'università (lezione 2).

- **Scena 1** (4′, era 3′): si parte dal luogo, un ospedale fondato da un papa più di ottocento anni fa e ancora pubblico, che
  all'inizio accoglieva chi non poteva restituire nulla. Dopo la nuvola, un riquadro mostra la domanda e **il percorso
  dell'ora in quattro passi**: un'idea, un problema, una soluzione, che cosa ne resta.
- **Ogni scena comincia dicendo a che passo si è** e riprendendo la precedente: «Primo passo, l'idea» (Lc 14), «Secondo passo,
  il problema» (chi paga, come si fa durare l'aiuto), «Terzo passo, la soluzione» (la parola *hospitale*: è ciò che il papa
  farà costruire in Sassia), «Torniamo al Lungotevere dell'inizio» (le date), «Sappiamo chi ha deciso di costruirlo: che
  cosa faceva davvero?» (norma, pratica, memoria), «Ultimo passo: che cosa ne resta?» (il caso di oggi, *Deus caritas est*),
  «Torniamo al Lungotevere e alla domanda» (chiusura).
- **Scena 5**: le etichette della linea del tempo sono le quattro cose che l'animazione della scena 3 aveva indicato per
  un'istituzione: *Il luogo, Le persone, La regola, I mezzi* (più *La conferma* e *Cento case*). Così la storia di Santo
  Spirito diventa la risposta concreta al problema della scena 3, non un argomento nuovo.
- **Scena 3**: sullo schermo resta Mt 25,40; la definizione del Catechismo (n. 1822) è passata nella regia, letta dal docente.
- **Scena 7** (Sfida): 7′ invece di 8′, per dare il minuto in più alla scena 1. Totale sempre 50′.
- **Studio**: nuova prima sezione «La domanda e il luogo»; le altre cominciano con il passo a cui appartengono.
- **Guida**: aggiornati «In breve», «Prima della lezione» (il percorso come bussola), la variante senza proiettore e la regia
  di ogni scena (prima frase = il ponte). Il controllo automatico della Guida (`LabGuida.controlla`) dà 0 errori e 0 avvisi.
- **Lezione 2**: nell'ultima scena c'è ora l'aggancio «Tra sette giorni · Chi cura chi non può ricambiare?».

Non sono cambiati: ordine delle scene, strumenti, contenuti, citazioni, fonti, giochi, grafica.

**LIM.** In LIM l'animazione della scena 3 era più alta dello schermo (didascalia e comandi sotto la barra). Una regola CSS
valida solo in LIM, scritta nel file della lezione, mette il palco a sinistra e didascalia e comandi a destra, con etichette
un po' più piccole su una riga: portata in vista, l'animazione sta intera in una schermata (1366×768 e 1920×1080).
Sullo schermo normale non cambia nulla.

**Telefono.** Sotto i 720 px restava una fascia vuota di 144 px sotto la barra delle scene (difetto del kit corretto il
7 ottobre nelle altre lezioni, assente nel kit di questa). La stessa regola, `body.la.ll{padding-bottom:0}`, è ora nel
file della lezione. Le altre correzioni del 7 ottobre per il telefono (strumenti del visore su una riga) non sono state
portate: qui c'è anche il pulsante «Guida» e su una riga non ci starebbe.

## Come si aggiorna l'artefatto

Questo artefatto è stato assemblato con una versione del kit che contiene la **Guida del docente**; il kit in
`design-system/assets/artefatti/skill-lezione/` non ce l'ha. **Non ricostruirlo con `build_artefatto.py`**: la Guida
sparirebbe. Per aggiornarlo si sostituisce lo script della lezione dentro l'HTML:

```bash
python3 -I - sorgenti-lezioni/iii-1-3-chi-cura-chi-non-puo-ricambiare.js uploads/iii-1-3-chi-cura-chi-non-puo-ricambiare-artefatto.html <<'EOF'
import sys, re
src = open(sys.argv[1], encoding='utf8').read(); p = sys.argv[2]; h = open(p, encoding='utf8').read()
m = [x for x in re.finditer(r'<script>(.*?)</script>', h, re.S) if 'window.LEZIONE = {' in x.group(1)]
assert len(m) == 1 and '</script' not in src.lower()
m = m[0]; open(p, 'w', encoding='utf8').write(h[:m.start(1)] + '\n' + src.rstrip('\n') + '\n' + h[m.end(1):])
EOF
node design-system/assets/artefatti/skill-lezione/scripts/esporta_testo.js \
  sorgenti-lezioni/iii-1-3-chi-cura-chi-non-puo-ricambiare.js sorgenti-lezioni/iii-1-3-chi-cura-chi-non-puo-ricambiare.testo.txt
```

## Collaudo (14 ottobre 2026)

Chromium (Playwright) sull'artefatto:

- **Prova mirata, 29 controlli superati su 29.** Scena 1 con luogo, domanda e quattro passi; nuvola. Ogni lead fa da ponte
  (10 scene). Guida aperta dal pulsante con la regia nuova, chiusa con il tasto G. Scena 5: etichette, scheda «I mezzi»,
  verifica con risposta sbagliata e giusta. Sfida e ritorno alla scena 7. Studio con «La domanda e il luogo» per prima.
  LIM 1366×768 e 1920×1080: animazione intera fra testata e barra. Console senza errori.
- **Collaudo generico, superato** (50 minuti, Sfida, 360 px senza scorrimento orizzontale, visore 55 px, nessuna richiesta di
  rete), salvo il controllo «palco in vista all'apertura della scena» in LIM. La scena 3 ha sopra il ponte e Mt 25,40:
  in LIM si scorre una volta per arrivare all'animazione, come nelle altre lezioni.
- **Controllo della Guida** (`LabGuida.controlla` del kit della lezione): 0 errori, 0 avvisi; «Da sapere» 15 minuti di lettura.
- Sito (copia locale): la lezione si apre nel visore dalla pagina dell'unità.
