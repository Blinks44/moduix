---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

ColorPicker: `ColorPickerSwatch` and `ColorPickerValueSwatch` now draw their own checkerboard under translucent colors, so `ColorPickerTrigger` renders only the value swatch by default and you no longer need a `ColorPickerTransparencyGrid` wrapper next to a value swatch. A `ColorPickerSwatchIndicator` composed inside your own `ColorPickerSwatch` now appears for the selected color in the Tailwind packages. Default children of `ColorPickerTrigger`, `ColorPickerArea`, `ColorPickerChannelSlider`, and `ColorPickerSwatchTrigger` are now the exported moduix parts. React and Solid re-export the Ark Color Picker types, as Vue already did, and the Tailwind packages no longer need `class-variance-authority` for this component.
The CSS Modules packages keep 8 of the 89 `--moduix-color-picker-*` variables (`width`, `radius`, `trigger-size`, `content-width`, `area-height`, `thumb-size`, `channel-slider-height`, `swatch-size`). Colors, spacing, typography, focus rings, disabled opacity, and motion now come from foundation tokens; override them with a class on the part. Popup motion still follows `--moduix-popup-motion-*`. Both styling tracks now share one look for thumb focus (outer ring), the color area border, the swatch focus outline, and hover on touch screens.