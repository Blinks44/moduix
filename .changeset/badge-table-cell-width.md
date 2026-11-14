---
'@moduix/react': patch
'@moduix/react-tailwind': patch
'@moduix/solid': patch
'@moduix/solid-tailwind': patch
'@moduix/vue': patch
'@moduix/vue-tailwind': patch
'@moduix/svelte': patch
'@moduix/svelte-tailwind': patch
---

Badge: Stop clipping the label inside table cells. The root no longer sets `max-width: 100%`, which let auto-layout tables size a column narrower than its badges.