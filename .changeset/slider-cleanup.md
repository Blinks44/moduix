---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

Slider: The horizontal root is now a grid that puts `SliderLabel` and `SliderValueText` on one row above the control, like ProgressLinear, so the usual header wrapper is no longer needed. An existing wrapper still works, 8px narrower than the root. The root no longer forces `--moduix-color-foreground` and inherits the surrounding text color.
`SliderMarkerGroup` now reserves one line for marker labels, so content after a slider with marks no longer overlaps them. Marker dots stay centered in RTL. `SliderDraggingIndicator` no longer stretches in vertical sliders; it sits beside a vertical thumb and above a horizontal one.
The CSS Modules packages keep 4 `--moduix-slider-*` variables instead of 50: `track-size`, `track-bg`, `range-bg`, and `thumb-size`. The root size, gap, color, label and value text typography, control size, track border and radius, range radius, thumb border, background, radius and shadows, focus ring, invalid colors, marker, dragging indicator, and transition variables are removed in favor of foundation tokens; set `width` or `height` on the root, or override the style with a class on the part.
Remove styles that Ark already applies inline (`position`, `touch-action`, `user-select`), the thumb `pointer-events: none` while disabled, and the reduced-motion block that the duration tokens already cover. React and Solid now re-export the Ark Slider part prop, details, and hook types; Vue no longer re-exports the Ark `Slider*BaseProps` types.
the horizontal root now fills its container instead of defaulting to `12rem`, like Chakra UI and shadcn/ui and matching ProgressLinear. Set `width` on the root to keep a fixed size. Vertical sliders are unchanged.