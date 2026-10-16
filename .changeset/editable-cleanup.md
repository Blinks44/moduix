---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

Editable: the root now fills its container, so entering edit mode no longer changes its width; with `autoResize` it still follows the text width. Long values wrap inside the area, the preview keeps line breaks, and controls are top-aligned, so textarea compositions need no extra styles. A disabled editable is dimmed once (triggers no longer dim again, and the root no longer dims inside a disabled `Field` or `Fieldset`). Edit, submit, and cancel triggers drop their square styling under `asChild`, so a composed `Button` keeps its own look. Keyboard focus on the preview now shows the focus ring.
CSS Modules keep one variable, `--moduix-editable-area-height` (area height and trigger size); the other 42 are removed, override colors, spacing, and radius with a plain class instead. React and Solid now re-export the Ark Editable part props, callback details, and hook types.