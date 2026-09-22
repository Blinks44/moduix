---
'@moduix/react': minor
'@moduix/solid': minor
'@moduix/react-tailwind': minor
'@moduix/solid-tailwind': minor
---

AngleSlider: Redesign the dial as a circular track that fills from the top with a masked conic-gradient arc, a circle thumb matching the linear Slider, and the value text centered in the dial.
`AngleSliderDial` now renders the centered `ValueText` between `Control` children and `Thumb`; the pointer press suppresses the keyboard focus ring during and after the drag while keyboard focus keeps its ring.
The public `--moduix-angle-slider-*` variable set was retuned; the needle thumb, inner disc, center dot, and track/control border variables were removed.