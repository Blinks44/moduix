---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

Splitter: `SplitterResizeTrigger` and `SidebarResizeTrigger` now render `type="button"`, so clicking or pressing Space on a resize handle inside a form no longer submits it. An `asChild` host keeps its own `type`.
The root now fills its container (`height: 100%`, like Ark UI, Chakra UI, and shadcn/ui) instead of defaulting to `28rem`. Set a height on the root when its parent has none, for example for a vertical splitter or panels with little content. A nested splitter no longer needs a height override.
The CSS Modules packages keep 2 `--moduix-splitter-*` variables instead of 46: `resize-trigger-line-color` and `resize-trigger-size`, which style the divider line and hit area pseudo-elements. `Splitter` and `SplitterRootProvider` now remove Ark's inline `width` and `height` like the Tailwind packages, so a class sets the root size and `--moduix-splitter-width` and `--moduix-splitter-height` are removed. Change the root, panel, and indicator surfaces, the focus ring, and the disabled opacity with a class on the part.
Panels drop the `12.5rem` minimum height, which clipped panels in a root shorter than `200px` and had to be reset for vertical splitters, and no longer draw their own card background; the root background shows through, so default visuals stay the same. Panels also drop `overflow: auto` and `min-width`: Ark sets `overflow: hidden` inline, so panels never scrolled. Put long content in a scroll container.
The divider hover and drag tint in the CSS Modules packages now matches Tailwind (`muted-foreground` at 40%). Remove cursor, `min-width`, `position`, and z-index styles that Ark already applies inline or that had no effect, the trigger opacity transition, and the Tailwind `motion-reduce:before:transition-none` (the duration token already resolves to near zero). The indicator is centered by the trigger's flex alignment instead of `translate(-50%, -50%)`, and the Tailwind indicator now animates its drag scale.
import `cn` from `@/lib/moduix/cn`, so the component installed from the registry resolves it.