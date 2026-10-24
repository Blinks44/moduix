---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

AngleSlider: Markers below the value now take the fill color, so they follow `--moduix-angle-slider-indicator-bg` and turn destructive with `invalid`; an invalid thumb keeps its destructive border and gets a destructive focus ring, like `Slider`.
The ring thickness defaults to `--moduix-spacing-2` in both styling tracks. In Tailwind the ring mask used a fixed `0.5rem` while the start cap, thumb, and markers used spacing tokens, so a density preset misaligned them.
The CSS Modules packages keep 5 `--moduix-angle-slider-*` variables instead of 25: `size`, `ring-thickness`, `thumb-size`, `indicator-bg`, and `track-bg`. The color, gap, disabled opacity, label and value text, focus ring, invalid, thumb border, background and shadow, marker, and transition variables are removed in favor of foundation tokens; style those with a class on the part. Default visuals are unchanged.
The Tailwind private fill property is renamed to `--_angle-slider-fill`, and the redundant reduced-motion transition rule is removed (thumb transitions already use token durations).