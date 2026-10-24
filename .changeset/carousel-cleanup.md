---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

Carousel: `CarouselControl` now centers its content, `CarouselAutoplayTrigger` grows with its label instead of overflowing, and hover styles no longer stick after a tap on touch screens.
The CSS Modules packages keep 9 `--moduix-carousel-*` variables instead of 25: hover, shadow, focus-ring, icon-size, autoplay min-width, indicator-gap, progress-text, and track-radius variables are removed; set those styles with a class on the part. Triggers use the card background and border tokens, and idle indicators use the muted foreground color at 50% in every package, so they stay visible on light surfaces.
`CarouselAutoplayIndicator` no longer uppercases its label. Vue `CarouselAutoplayIndicator` now forwards the Ark `fallback` slot.