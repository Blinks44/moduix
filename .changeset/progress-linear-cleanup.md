---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

ProgressLinear: the horizontal root now fills its container instead of defaulting to `12rem`, like Chakra UI and shadcn/ui; set `width` on the root to keep a fixed size. Indeterminate progress now sweeps right to left in RTL instead of reversing an animation that ended mid-track. In Tailwind, the vertical indeterminate range fills the track width instead of shrinking to 35%, and reduced motion stops the vertical animation too. CSS Modules keep only `--moduix-progress-linear-track-bg`, `--moduix-progress-linear-range-bg`, and the new `--moduix-progress-linear-track-size`, which replaces `--moduix-progress-linear-track-height` and `--moduix-progress-linear-track-width` and sets the bar thickness in both orientations. The other 22 variables (root color, gap, width, height, and vertical width, label and value text typography, track border and radius, range radius and transition, and the indeterminate color, width, and animations) are removed: set `width` or `height` on the root, or override the style with a class on the part. The root no longer forces `--moduix-color-foreground` and inherits the surrounding text color. `ProgressLinearView` is no longer styled with `display: contents`, which could show a hidden view when the reset stylesheet was not loaded. React and Solid now re-export the Ark Progress part prop, details, and hook types; Vue no longer re-exports the Ark `Progress*BaseProps` types.