---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

JsonTreeView: the branch indicator stays on the first line when a long preview wraps; before, it was centered on the whole row.
Branch content now opens and closes with the shared `moduix-collapsible-content-*` keyframes and `--moduix-transition-default`, like TreeView; reduced motion turns the animation off.
Rows no longer set `user-select: none`, so inspected keys and values can be selected and copied.
The Tailwind packages take the row line height and indentation from foundation tokens instead of fixed `leading-4`, `rem` values, and `min-h-5`, so presets such as `dense` apply to them like in the CSS Modules packages. The focus ring in the CSS Modules packages uses `--moduix-focus-ring-inset-width`, like other components.
Removed dead disabled styles (Ark's JSON tree has no disabled root or nodes) and no-op resets on the generated rows.