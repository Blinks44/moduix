---
'@moduix/react-tailwind': minor
'@moduix/solid-tailwind': minor
'@moduix/vue-tailwind': minor
---

Tailwind packages: focus rings use the new `outline-focus`, `outline-focus-inset`, `outline-offset-focus`, and `outline-offset-focus-inset` theme utilities instead of fixed `outline-2`, `outline-1`, `outline-offset-2`, and `-outline-offset-1`. They read `--moduix-focus-ring-width`, `--moduix-focus-ring-inset-width`, `--moduix-focus-ring-offset`, and `--moduix-focus-ring-inset-offset`, the same tokens the CSS Modules packages use, so overriding those tokens now changes focus rings in both styling tracks. Default visuals are unchanged. `cn` knows the new utilities, so a consumer class such as `focus-visible:outline-4` still replaces the default. Outlines that draw a border rather than a focus ring (Menu, Navigation Menu, and Popover content) keep `outline-1`.