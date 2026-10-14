---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

Breadcrumbs: Links, separators, and the ellipsis now inherit the root text color, so setting `color` (or `--moduix-breadcrumbs-color`) on `Breadcrumbs` recolors the whole trail. Default visuals are unchanged.
The CSS Modules packages drop 13 `--moduix-breadcrumbs-*` variables: `max-width`, `link-color`, `link-radius`, `link-text-decoration`, `link-text-decoration-hover`, `link-underline-offset`, `link-transition`, `focus-ring-color`, `focus-ring-width`, `ellipsis-color`, `ellipsis-size`, `separator-color`, and `separator-font-size`. Style the parts through their `data-slot` selectors or your own class instead.