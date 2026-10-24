---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

ProgressCircular: Indeterminate progress now spins a quarter-circle arc instead of a dot-sized dash, and stays a visible static arc under reduced motion. CSS Modules keep only `--moduix-progress-circular-size`, `--moduix-progress-circular-thickness`, `--moduix-progress-circular-track-bg`, and `--moduix-progress-circular-range-bg`; the other 17 variables (root color, gap, and width, label and value text typography, range linecap and transition, and the indeterminate color, animation, and dash patterns) are removed, so override those styles with a class on the part. The root no longer forces `--moduix-color-foreground` and inherits the surrounding text color. `ProgressCircularView` is no longer styled with `display: contents`, which could show a hidden view when the reset stylesheet was not loaded. React and Solid now re-export the Ark Progress part prop, details, and hook types; Vue no longer re-exports the Ark `Progress*BaseProps` types.