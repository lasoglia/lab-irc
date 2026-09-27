# Mascotte Lab IRC — pacchetto per il sito

Cartella da copiare nel repo `lasoglia/lab-irc` come `assets/mascotte/`.

## Contenuto
- `lab-mascotte.js` — web component animato (occhi che seguono il cursore, battito di ciglia, frasi al clic, AMDG al 7° clic). Nessuna dipendenza.
- `svg/1-semino.svg` … `svg/5-terra.svg` — versioni statiche (favicon, PDF, slide, stampa).

## Prompt per Claude Code
> Ho aggiunto `assets/mascotte/`. Leggi `ISTRUZIONI.md`. Sostituisci le mascotte attuali (YearMascot) in tutto il sito con il web component `<lab-mascotte anno="N">`: carica `assets/mascotte/lab-mascotte.js` una volta in `index.html` e in `assets/artefatti/lab-artefatto.js`, poi usa `<lab-mascotte anno="N" size="...">` su card anno (55px), pagina anno (144px), card materiale (34px, `aureola="false"`) e artefatti (89px). Mantieni l'evento `lab:amdg` collegato ad AmdgEgg.

## Uso
```html
<script src="/assets/mascotte/lab-mascotte.js" defer></script>
<lab-mascotte anno="3" size="89"></lab-mascotte>
```
Attributi: `anno` 1–5 · `size` in px (default 89; consigliati 34 · 55 · 89 · 144) · `aureola="false"` · `parla="false"` · `statica`.

Da JS: `LabMascotte.svg(5)` restituisce la stringa SVG.

## Geometria
Riquadro 144 × 144. Misure dalla serie di Fibonacci (13 · 21 · 34 · 55 · 89); corpo centrato a y = 89 (144 / φ). Occhi 3,4 × 5,5 (φ). Opacità vele 0,618 / 0,382. Asse della Terra inclinato di 23,4°.
