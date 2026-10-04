Base card with cursor-reactive tilt and following light. Container for all card-shaped content.

```jsx
<Card>
  <Badge variant="ciano">Slide</Badge>
  <h3 style={{ fontFamily: 'var(--lab-font-display)', margin: '13px 0 8px' }}>Lemaître e l'origine dell'universo</h3>
  <p style={{ color: 'var(--lab-muted)', margin: 0 }}>Il sacerdote che ipotizzò il Big Bang.</p>
</Card>

<Card style={{ background: 'linear-gradient(135deg,#7A5AC9,#4A338C)', color: '#fff' }} glow="rgba(255,255,255,.18)">…</Card>
```

- `tilt={false}` for dense/list contexts.
- `glow` tints the cursor light (use the year colour or white on coloured cards).
- `tint` is the colour mixed into the border on hover (45% over `--lab-line`); default `var(--lab-viola)` — pass the year colour (e.g. `tint="var(--lab-anno-3)"`) so year-tinted cards don't turn violet.
