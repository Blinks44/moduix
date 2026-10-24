---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

Badge: The CSS Modules packages keep 3 `--moduix-badge-*` variables instead of 14: `bg`, `border-color`, and `color`, which override every variant. The `border-width`, `dot-size`, `font-size`, `font-weight`, `gap`, `height`, `icon-size`, `line-height`, `padding-x`, `padding-y`, and `radius` variables are removed in favor of foundation tokens; override those with a class on the part. Default visuals are unchanged.
In the Tailwind packages the hover of filled link badges uses the new `opacity-hover` theme utility instead of a fixed `opacity-90`. It reads `--moduix-opacity-hover`, the same token the CSS Modules packages use, so overriding that token now affects both styling tracks. `cn` knows the new utility, so a consumer class such as `[a&]:hover:opacity-75` still replaces the default.