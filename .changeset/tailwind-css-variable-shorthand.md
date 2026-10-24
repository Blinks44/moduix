---
'@moduix/react-tailwind': patch
'@moduix/solid-tailwind': patch
'@moduix/vue-tailwind': patch
---

Use the Tailwind v4 `utility-(--variable)` shorthand instead of `utility-[var(--variable)]` for CSS variable values in component classes. The generated CSS and class merging are unchanged.