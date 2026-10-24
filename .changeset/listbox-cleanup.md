---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

Listbox: The CSS Modules packages keep 2 of the 87 `--moduix-listbox-*` variables, `width` and `content-max-height`. Colors, spacing, typography, focus rings, disabled opacity, the grid and horizontal layout values, and the variables forwarded to `CloseButton` now come from foundation tokens; override them with a class on the part. Items, group labels, and list padding still follow the shared `--moduix-popup-*` variables.
The Tailwind filter input now reserves the same 44px for `ListboxClearTrigger` as CSS Modules instead of 40px, and Tailwind `ListboxContent` no longer contains overscroll, so page scrolling chains past the list in every package. `ListboxClearTrigger` keeps the `CloseButton` colors, hover, and icon and only sets its size and position. React and Solid re-export the Ark Listbox part props, callback details, and hook types.
Disabled items now dim once, through the shared disabled opacity, and keep their regular text color instead of also switching to the muted foreground color.