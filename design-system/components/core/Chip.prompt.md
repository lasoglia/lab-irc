Filter pill for grouping content by type or category. Rendered in a row above a content grid.

```jsx
const [active, setActive] = React.useState('tutti');
const types = ['tutti', 'Slide', 'PDF', 'Video'];

<div style={{ display: 'flex', gap: 9, flexWrap: 'wrap' }}>
  {types.map(t => (
    <Chip key={t} active={active === t} onClick={() => setActive(t)}>
      {t.charAt(0).toUpperCase() + t.slice(1)}
    </Chip>
  ))}
</div>
```

**States**
- inactive — surface background, muted border; hover shifts to cyan border + text
- active — solid cyan fill; on-brand dark text

Keep chip labels short (1–2 words). Always have a "Tutti" (all) option first.
