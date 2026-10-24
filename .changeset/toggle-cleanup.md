---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

Toggle: The CSS Modules packages keep 6 `--moduix-toggle-*` variables instead of 55: `bg`, `bg-hover` (hover and active), `bg-pressed` (also the pressed border), `border-color`, `color`, and `color-pressed`. They apply to every variant, so to theme one variant set them on `[data-slot='toggle-root'][data-variant='<variant>']`. Per-variant, per-size, active, radius, border-width, gap, typography, icon-size, focus-ring, transition, and disabled-opacity variables are removed in favor of foundation tokens; override those with a class. Default visuals are unchanged, and `ToggleGroup` items follow the same variables.
In the Tailwind packages a size utility on an icon, such as `size-5`, now overrides the default 16px icon size inside `Toggle` and `ToggleIndicator`, as in `Button`. Remove the redundant hover media query, `box-border`, `display: block` on icons, `text-inherit` on the indicator, the pressed ghost text color that matched the default, and the dead disabled `cursor`.
React and Solid export the Ark types `ToggleContextProps`, `ToggleIndicatorProps`, `UseToggleContext`, `UseToggleProps`, and `UseToggleReturn`, as Vue already did.