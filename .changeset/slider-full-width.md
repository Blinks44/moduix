---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

Slider: the horizontal root now fills its container instead of defaulting to `12rem`, like Chakra UI and shadcn/ui and matching ProgressLinear. Set `--moduix-slider-width` (CSS Modules) or a width utility (Tailwind) on the root to keep a fixed size. Vertical sliders are unchanged.