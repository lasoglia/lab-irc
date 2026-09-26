Labelled input for forms across both the main site and exam platform.

```jsx
<Input label="Il tuo codice" placeholder="es. MARIO24" required />
<Input label="Classe" type="text" placeholder="es. 3A" hint="Come compare nel registro." />
<Input label="Risposta" multiline rows={5} placeholder="SCRIVI QUI…" />
```

**Focus state** — border shifts to `--lab-viola`, violet focus ring appears.

**Multiline** — set `multiline={true}` for textarea; `rows` controls initial height.

For exam student answers, the original codebase forces `text-transform: uppercase` — apply via a wrapper or custom styling if needed.
