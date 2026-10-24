---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

Breadcrumbs: Export the `BreadcrumbsPathLink` and `BreadcrumbsPathProps` types for typing `BreadcrumbsPath` links outside the component.
`BreadcrumbsEllipsis` now shows a horizontal ellipsis icon instead of the `...` text by default; pass children to keep custom content.
A native `button` that directly wraps `BreadcrumbsEllipsis`, such as a collapsed-path `MenuTrigger`, is now styled as a breadcrumb trigger with the link hover color and focus ring, so it no longer needs its own reset styles.
Links, separators, and the ellipsis now inherit the root text color, so setting `color` (or `--moduix-breadcrumbs-color`) on `Breadcrumbs` recolors the whole trail. Default visuals are unchanged.
The CSS Modules packages drop 13 `--moduix-breadcrumbs-*` variables: `max-width`, `link-color`, `link-radius`, `link-text-decoration`, `link-text-decoration-hover`, `link-underline-offset`, `link-transition`, `focus-ring-color`, `focus-ring-width`, `ellipsis-color`, `ellipsis-size`, `separator-color`, and `separator-font-size`. Style the parts through their `data-slot` selectors or your own class instead.
Vue: take the default `aria-label` from the shared accessibility labels, as React and Solid already do. The registry item now depends on `a11y-labels`.