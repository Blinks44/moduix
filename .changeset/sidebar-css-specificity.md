---
'@moduix/react': patch
'@moduix/solid': patch
'@moduix/vue': patch
'@moduix/svelte': patch
---

Scope `Sidebar` CSS Module overrides for `Splitter`, `Input`, and `Separator` parts with `[data-slot='sidebar-*']` so styles remain independent of stylesheet import order.