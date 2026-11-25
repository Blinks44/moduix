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

SplitButton: Align the divider on the exact seam with full height across filled variants, collapse borders only on outline variants to avoid hover overlap, and scope CSS Module selectors under `.root` so styles remain independent of stylesheet order.