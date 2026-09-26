Status pill for exam lifecycle states in the Area Verifiche teacher dashboard.

```jsx
<ExamBadge status="bozza" />      // grey — draft
<ExamBadge status="pubblicata" /> // green — live
<ExamBadge status="chiusa" />     // red — closed
<ExamBadge status="in_corso" />   // blue — student active
<ExamBadge status="consegnata" /> // amber — needs grading
<ExamBadge status="corretta" />   // green — graded
```

**Lifecycle flow:** `bozza` → `pubblicata` → `chiusa`
**Submission states:** `in_corso` → `consegnata` → `corretta`

Note: uses `--exam-*` colour tokens (institutional blue/gold), not the Notte Studio accent palette.
