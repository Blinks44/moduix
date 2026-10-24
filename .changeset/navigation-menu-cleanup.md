---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

NavigationMenu: The CSS Modules packages keep 5 of the 56 `--moduix-navigation-menu-*` variables, `content-min-width`, `content-max-width`, `content-max-height`, `viewport-max-width`, and `viewport-max-height`. Colors, spacing, typography, radius, shadow, focus ring, the indicator, the arrow, and z-index now come from foundation tokens; override them with a class on the part. Content and viewport motion use the shared `moduix-popup-in` and `moduix-popup-out` keyframes with `--moduix-popup-motion-*`, and the directional viewport content motion uses the foundation `moduix-navigation-menu-content-*` keyframes, so the `--moduix-navigation-menu-content-*` motion family and `--moduix-navigation-menu-viewport-motion-distance` are removed. In the Tailwind packages the `animate-moduix-navigation-menu-content-*` utilities now read `--moduix-popup-motion-duration` and `--moduix-popup-motion-easing` like the CSS Modules packages.
The indicator and the horizontal viewport positioner now stay under the open trigger in right-to-left layouts: Ark measures `--trigger-x` and `--viewport-x` from the left edge, so both now use physical `left` placement (the Tailwind indicator and every viewport positioner used the inline start before). The Tailwind indicator now fades out with the viewport instead of disappearing at once, and the CSS Modules focus ring no longer sits 2px away from the control, matching Tailwind.
React and Solid export the Ark Navigation Menu part prop, value-change detail, and hook types, as Vue already did.