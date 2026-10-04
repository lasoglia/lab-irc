2D mascot of a school year — put it on every surface tied to that year (cards, year page, artefacts, games).

```jsx
<YearMascot year={3} />                        // Navicella, 55px (year card)
<YearMascot year={4} size={144} />             // year page hero
<YearMascot year={1} size={34} halo={false} /> // material card
```

- 1 Semino · 2 Ichthy · 3 Navicella · 4 Bussolina · 5 Terra
- Click → greeting and year lines (no AMDG on repeated clicks). `fumetto="sinistra"` near the right edge, `fumetto="sotto"` at the top of a page.
- Plain HTML: `<script src="/assets/mascotte/lab-mascotte.js" defer></script>` + `<lab-mascotte anno="3" size="89"></lab-mascotte>`. Static SVG: `assets/mascotte/svg/N-name.svg` or `LabMascotte.svg(N)`.
