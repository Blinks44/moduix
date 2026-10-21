---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

RatingGroup: the filled default star now inherits the `RatingGroupItemIndicator` color, so a color class or `style` on the indicator recolors it. Previously the star kept the primary color.
The CSS Modules packages keep 4 `--moduix-rating-group-*` variables instead of 18: `active-color`, `color`, `gap`, and `icon-size`. `icon-size` replaces the per-size `icon-size-xs`…`icon-size-xl` variables and applies to every size. The `root-gap`, `disabled-opacity`, `focus-ring-*`, `label-*`, and `transition` variables are removed in favor of foundation tokens; set those with a class on the part.
The root no longer sets a muted text color that no part used. Remove no-op item styles (`line-height`, unused color and opacity transitions, `pointer-events: none` on disabled items that Ark already ignores), the stroke transition, the duplicated icon size utilities, and `motion-reduce:transition-none` in Tailwind, where the duration already comes from tokens.