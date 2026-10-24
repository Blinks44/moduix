---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

ScrollArea: The root no longer sets a text color, so content inherits the color of its container, and the viewport inherits the root `border-radius` instead of a fixed medium radius. A rounded root now also rounds the clipped content and the focus ring.
The prop types are renamed to `ScrollAreaRootProps` and `ScrollAreaRootProviderProps` (previously `ModuixScrollAreaRootProps` and `ModuixScrollAreaRootProviderProps`), and `ScrollAreaVariant` is exported. In Vue, `ScrollAreaRootProps` and `ScrollAreaRootProviderProps` now include `fade` and `variant` instead of being the bare Ark types.
The CSS Modules packages keep 3 `--moduix-scroll-area-*` variables instead of 27: `fade-size`, `scrollbar-size`, and `thumb-bg`. The others are removed in favor of foundation tokens; set those with a class on the part.
Remove styles that Ark already sets inline (positions, `touch-action`, `user-select`) and no-op styles on the content, corner, scrollbar track, and thumb. The scrollbar hover growth in CSS Modules now applies only on devices that support hover, as in Tailwind.