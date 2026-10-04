Year navigation card — the primary entry-point grid on the Lab IRC homepage.

```jsx
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 16 }}>
  <YearCard year={1} name="Primo anno"   description="Le radici: il senso del sacro." count={12} href="#anno/1" />
  <YearCard year={2} name="Secondo anno" description="Gesù di Nazaret."               count={9}  href="#anno/2" />
  <YearCard year={3} name="Terzo anno"   description="La Chiesa nella storia."        count={14} href="#anno/3" />
  <YearCard year={4} name="Quarto anno"  description="Etica e questioni di senso."    count={8}  href="#anno/4" />
  <YearCard year={5} name="Quinto anno"  description="Le sfide del presente."         count={11} href="#anno/5" />
</div>
```

**Year colour palette** (from CSS tokens)
| Year | Dark theme token | Colour |
|------|-----------------|--------|
| 1 | `--lab-anno-1` | `#FF7A59` orange-red |
| 2 | `--lab-anno-2` | `#4FB0FF` sky blue |
| 3 | `--lab-anno-3` | `#A78BFA` soft violet |
| 4 | `--lab-anno-4` | `#FB7BB5` pink |
| 5 | `--lab-anno-5` | `#FBBF24` amber |

The left-bar and the glow orb always use the full year colour; the surface is a soft year-tinted gradient (`--lab-tinta-card`, default 10%) and the border mixes 22% year colour (45% on hover). Hover lifts + expands the glow orb.

- `compatto` (phone layout): one ~110–130px row — numeral (33px) and name (22px) on the same baseline, no description, count below, mascot centred on the right. `<YearCard compatto year={3} name="Terzo anno" count={14} href="#anno/3" />`
- Numeral and count text use `color-mix(in srgb, <year colour> var(--lab-tinta-icona, 100%), var(--lab-ink))` — the host page lowers `--lab-tinta-icona` (e.g. 80%) and `--lab-tinta-card` (e.g. 7%) in the light theme to keep contrast ≥3:1 on amber.
