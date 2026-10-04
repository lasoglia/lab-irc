Compact uppercase label for content type or semantic category.

```jsx
<Badge variant="viola">Artefatto interattivo</Badge>
<Badge variant="ciano">Slide</Badge>
<Badge variant="rosa">Video</Badge>
<Badge variant="verde">Successo</Badge>
<Badge variant="ambra">In evidenza</Badge>
<Badge variant="rosso">Errore</Badge>
<Badge variant="neutro">Materiale</Badge>
```

**Colour mapping**
- `viola` — purple (default; brand primary; for interactive tools)
- `ciano` — cyan (slides, documents)
- `rosa` — pink (video content)
- `verde` — green (success, confirmed)
- `ambra` — amber (highlighted, featured)
- `rosso` — red (error, danger)
- `neutro` — ink-tinted grey (`color-mix` 8% ink + `--lab-ink-soft` text; generic or secondary labels that should not compete with the accents)

Always use short labels (1–3 words). Text is auto-uppercased.
