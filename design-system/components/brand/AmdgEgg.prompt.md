Hidden AMDG easter egg — mount once on any Lab IRC page; it stays invisible until discovered.

```jsx
<AmdgEgg />
<span data-amdg-trigger>…logo…</span>             {/* 7 quick clicks */}
<button onClick={() => window.dispatchEvent(new Event('lab:amdg'))}>✦</button>
```

Triggers: type "amdg" · 7 clicks on `[data-amdg-trigger]` · `lab:amdg` event. Closes on click / Esc / 6.18s.
Never advertise it in the UI — discovery is the point. Pair with `<Amdg />` marks hidden in footers.
