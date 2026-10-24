---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

Marquee: The CSS Modules packages keep 2 of the 7 `--moduix-marquee-*` variables, `edge-color` and `edge-size`, and drop `width`, `height`, `vertical-height`, `color`, and `edge-z-index`; set the size with a class instead. The `--marquee-edge-color` and `--marquee-edge-size` aliases are removed, so use the `--moduix-marquee-edge-*` variables. A vertical marquee is still `15rem` tall by default.
The root no longer sets a text color and inherits it from its parent in every package. Styles that Ark already applies inline are no longer repeated: root `position` and `overflow`, viewport size, and edge `pointer-events`; `MarqueeViewport` has no moduix styles or Tailwind classes. CSS Modules now use the shared foundation `moduix-marquee-x` and `moduix-marquee-y` keyframes, as Tailwind already did.
`prefers-reduced-motion: reduce` now also stops vertical marquees in the CSS Modules packages; before, the vertical animation overrode the reset. React and Solid re-export the Ark Marquee part props, pause details, side, and hook types, as Vue already did, and Vue Tailwind `Marquee` declares its emits like the CSS Modules package.