---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

Tooltip: CSS Modules drop all 41 `--moduix-tooltip-*` variables, including the `--moduix-tooltip-popup-*` motion family and `--moduix-tooltip-transition`. Colors, borders, spacing, sizes, and typography come from foundation tokens, so override them with a plain class on the part. Content motion now uses the shared `moduix-popup-in` and `moduix-popup-out` keyframes with the same 200ms ease-in-out default as the Tailwind packages, and reads only the shared `--moduix-popup-motion-*` variables.
When several valued triggers share one tooltip, only the current trigger shows the open background instead of all of them. Long content now grows with its text instead of spilling past the surface at a fixed 24rem height. In the Tailwind packages, a tooltip that Ark switches instantly between triggers (`data-instant`) no longer plays its enter animation, as in the CSS Modules packages; the trigger drops the unreachable `data-disabled` styles, and trigger and content use the `text-sm` token line height. React and Solid now re-export the Ark Tooltip part prop, detail, and hook types, as Vue already does.