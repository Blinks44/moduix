---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

Focused fields tint their border with `--moduix-ring` and show a 3px outer halo at half the ring color, so focus stays visible next to the darker field border. Select, Combobox, and the ColorPicker trigger keep the halo while open, NumberInput shows one halo around the stepper group, and slider thumbs use the same halo.
Invalid fields keep a destructive border and show a destructive halo only while focused.
New `--moduix-focus-ring-halo-width` token and `outline-focus-halo` Tailwind utility.