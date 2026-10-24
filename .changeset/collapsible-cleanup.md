---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

Collapsible: `CollapsibleIndicator` inside a disabled trigger is no longer dimmed twice, and `CollapsibleBody` now has `data-scope="collapsible"` and `data-part="body"` in React and Solid, as in Vue. React and Solid also re-export the Ark Collapsible prop and hook types.
The CSS Modules packages keep 9 of the 29 `--moduix-collapsible-*` variables (trigger gap, padding and font size, indicator size, content color and font size, body gap and padding) and use the shared foundation keyframes. The removed root width and color, trigger color, background, radius and line-height, focus ring, disabled opacity, transition, indicator rotation and content opacity variables now use foundation tokens; override them with a class on the part. The trigger inherits the root color and has no hover background hook; use `asChild` with your own button for a boxed trigger.