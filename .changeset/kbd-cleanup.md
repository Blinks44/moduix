---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

Kbd: CSS Modules keep eight `--moduix-kbd-*` variables (`bg`, `border-color`, `border-width`, `color`, `height`, `padding-x`, `radius`, `shadow`) and drop `font-family`, `font-size`, `font-weight`, `line-height`, `min-width`, `padding-y`, `group-gap`, and `group-separator-color`; typography and `KbdGroup` styles come from foundation tokens, so override them with a class. The minimum width always follows `--moduix-kbd-height`.
The keycap edge shadow now follows the text color in CSS Modules, as it already did in Tailwind, so recoloring a key also tints its edge. `KbdGroup` drops no-op resets for padding, border, background, shadow, and font in every package.
A keycap now keeps its label on one line instead of breaking it inside a word in narrow containers; `KbdGroup` still wraps between keycaps. A direct `svg` child is sized to 12px with a 4px gap to the label, matching the keycap text; a size class on the icon overrides it.