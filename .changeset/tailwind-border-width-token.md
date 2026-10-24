---
'@moduix/react-tailwind': patch
'@moduix/solid-tailwind': patch
'@moduix/vue-tailwind': patch
---

Tailwind: the default border width (`border`, `border-t`, `border-x`, `divide-y`, and similar) now comes from `--moduix-border-width-sm` through the `--default-border-width` theme variable, as in the CSS Modules packages. Overriding the token now changes borders in both styling tracks. Default visuals are unchanged (1px).