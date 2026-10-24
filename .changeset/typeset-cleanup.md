---
'@moduix/react': patch
'@moduix/react-tailwind': patch
'@moduix/solid': patch
'@moduix/solid-tailwind': patch
'@moduix/vue': patch
'@moduix/vue-tailwind': minor
---

Typeset: `TypesetScroll` now owns its `overflow-x: auto`, so it scrolls wide content even outside a `Typeset` root or inside a `.not-typeset` subtree; before, it was a focusable wrapper that did not scroll there. Table cells with `align="left"` or `align="right"` (GFM column alignment) keep that physical alignment in right-to-left content; before, `right` was mapped to `end` and `left` was overridden by `start`.
Link hover underline is wrapped in `@media (hover: hover)`, so it no longer sticks after a tap on touch devices. Colors, borders, radius, and focus rings use foundation tokens directly instead of `currentColor` fallbacks, and duplicate or no-op rules (`margin-trim`, repeated heading `strong` weight and marker colors) are removed. Rendered output with foundation styles is unchanged.
The Vue Tailwind package ships the same `Typeset.module.css` as every other adapter instead of a global `Typeset.css`, so the global `.typeset` and `.typeset-scroll` classes are no longer emitted; target `data-slot="typeset"` and `data-slot="typeset-scroll"` instead. Registry consumers receive `Typeset.module.css`.