# Lightbox

Upstream docs:

- Ark UI has no dedicated Lightbox primitive: https://ark-ui.com/docs/components
- Ark UI Dialog: https://ark-ui.com/docs/components/dialog
- Ark UI composition: https://ark-ui.com/docs/guides/composition
- Ark UI styling: https://ark-ui.com/docs/guides/styling
- Ark UI ref: https://ark-ui.com/docs/guides/ref
- Chakra UI Carousel lightbox recipe: https://chakra-ui.com/docs/components/carousel

## Purpose

`Lightbox` is an image-first dialog recipe with Moduix media sizing, backdrop, motion, and close
control defaults.

## Upstream model to preserve

There is no Ark UI `Lightbox` primitive. The wrapper follows `@ark-ui/react/dialog` directly and
preserves its root, provider, trigger, backdrop, positioner, content, title, description, and close
contracts. `LightboxRootProvider` remains the moduix bridge for Ark state created with
`useLightbox()`.

Keep `LightboxBackdrop → LightboxPositioner → LightboxContent` explicit. `Lightbox` owns the portal
boundary.

## Current behavior contract

`Lightbox` and `LightboxRootProvider` portal `LightboxBackdrop` and `LightboxPositioner`
automatically by default. Set `portalled={false}` to render them inline, or pass `portalRef` to
target a custom container. The structural parts remain explicit and independently styleable.

`Lightbox` is the root component. Its props pass through unchanged,
including controlled and uncontrolled open state, trigger values, focus lifecycle, dismissal,
presence, `ids`, modal behavior, and Ark callback detail objects.

For `modal={false}`, omit `LightboxBackdrop`: Ark keeps the positioner pointer-transparent outside
`LightboxContent`, so the surrounding page remains interactive.

The base `Lightbox` parts do not manage image sources or gallery state. `LightboxImage` renders a
styled native image for the single-image path and adds the wrapper-specific `closeOnClick`
interaction. `LightboxGallery` is a layout and styling boundary for a composed `Carousel`; it does
not own image data or slide state. `LightboxBind` is a zero-render behavior part for CMS or
third-party markup that cannot render `LightboxTrigger` directly. It requires a selector for a
semantic button or link, uses the surrounding Dialog context, and leaves all overlay markup
consumer-owned. `LightboxHeader`, `LightboxBody`, and `LightboxFooter` are
layout helpers for captions, metadata, or actions around the media surface.

## Anatomy and exported parts

```text
Lightbox
├─ LightboxTrigger
├─ LightboxBind
└─ Overlay subtree (automatically portalled)
   ├─ LightboxBackdrop
   └─ LightboxPositioner
      └─ LightboxContent
         ├─ LightboxCloseTrigger or LightboxCloseIcon
         ├─ LightboxHeader (moduix)
         │  ├─ LightboxTitle
         │  └─ LightboxDescription
         ├─ LightboxBody (moduix)
         │  ├─ LightboxImage
         │  └─ LightboxGallery
         │     └─ Carousel
         └─ LightboxFooter (moduix)

LightboxRootProvider
└─ the same part tree connected to useLightbox()

LightboxContext
└─ render-prop access to the surrounding Dialog state
```

Stable slots are `lightbox-trigger`, `lightbox-backdrop`, `lightbox-positioner`,
`lightbox-content`, `lightbox-title`, `lightbox-description`, `lightbox-close-trigger`,
`lightbox-close-icon`, `lightbox-header`, `lightbox-body`, `lightbox-footer`, `lightbox-image`,
and `lightbox-gallery`. `LightboxImage` also exposes `data-close-on-click` when that behavior is
enabled.

`LightboxGallery` is a moduix layout part. `LightboxBind` is a zero-render behavior helper, not
an Ark anatomy part.

## Composition

```tsx
import {
  Lightbox,
  LightboxTrigger,
  LightboxBackdrop,
  LightboxPositioner,
  LightboxCloseIcon,
  LightboxContent,
  LightboxBody,
  LightboxImage,
} from '@moduix/react/lightbox';

export function LightboxDemo() {
  return (
    <Lightbox>
      <LightboxTrigger asChild>
        <button type="button">
          <img src={thumbnail} alt="Mountain ridge at sunset" />
        </button>
      </LightboxTrigger>
      <LightboxBackdrop />
      <LightboxPositioner>
        <LightboxContent aria-label="Mountain ridge at sunset">
          <LightboxCloseIcon />
          <LightboxBody>
            <LightboxImage src={fullSize} alt="Mountain ridge at sunset" />
          </LightboxBody>
        </LightboxContent>
      </LightboxPositioner>
    </Lightbox>
  );
}
```

Use `asChild` with one semantic child. An image alone is not an interactive trigger; wrap it in a
button. Use `LightboxRootProvider` instead of `Lightbox` when state comes from
`useLightbox()`. Read child state with `useLightboxContext()`; both APIs are available from
`@moduix/react` as direct top-level hooks. Render `LightboxCloseIcon` inside `LightboxContent`, outside `LightboxBody`, so it stays in Ark's accessibility tree and focus trap. Content fades while Body owns scale/translate motion; the fixed close control stays pinned to the viewport.

For a known image collection, render `Carousel` inside `LightboxGallery`. Keep the current
page controlled and update it from `LightboxTrigger value` through
`onTriggerValueChange(details)`. `LightboxGallery` supplies sizing and layout only; Carousel keeps
its Ark state, controls, indicators, dragging, and keyboard behavior.

For external markup, render `LightboxBind` inside the root, store
`LightboxImageSelectDetails` from `onImageSelect`, and compose the same explicit overlay tree.
`LightboxBind` opens the surrounding Dialog through context but does not render `LightboxBackdrop`,
`LightboxPositioner`, `LightboxContent`, `LightboxCloseIcon`, or `LightboxImage`. Use a semantic
button or link as the matched `selector` when images must be keyboard-accessible;
`LightboxBind` relies on the element's native click activation. It preloads the resolved full-size
source on pointer hover or keyboard focus. Native clicks already cancelled with
`event.preventDefault()` do not select an image or open the dialog.

Image resolution prefers `data-lightbox-src`, then a nonempty responsive `currentSrc`, then
the image's `src`. An explicitly empty `data-lightbox-src` excludes that image from binding.

## Upstream feature coverage

- Basic, controlled, root-provider, lazy-mount, initial-focus, final-focus, nested, and
  multiple-trigger flows come from Ark Dialog unchanged.
- Gallery selection uses `LightboxTrigger.value` and `onTriggerValueChange(details)`.
- Structured server or CMS image arrays compose `Carousel` inside `LightboxGallery` and sync the
  current slide through `LightboxTrigger.value`, `onTriggerValueChange(details)`, and carousel page state.
- `LightboxGallery` styles Carousel controls, a stable media viewport, dot indicators, and image
  thumbnail indicators without wrapping or translating Carousel props.
- `LightboxBind` listens to external markup, calls `onImageSelect(details)`, and opens its parent
  Dialog through context. It renders nothing and intentionally stays single-image capture, not a
  hidden carousel or image registry. Its props are `rootRef`, `rootSelector`, the required semantic
  `selector`, and the required `onImageSelect`. It listens for native click activation and preloads the resolved image
  on pointer hover or focus.
- `LightboxImageSelectDetails` contains `src`, optional `alt`, and the source
  `HTMLImageElement` as `element`.
- `open`, `defaultOpen`, `onOpenChange(details)`, `ids`, `initialFocusEl`, `finalFocusEl`, `modal`,
  `persistentElements`, `restoreFocus`, dismissal callbacks, focus props, `lazyMount`,
  `unmountOnExit`, `present`, `immediate`, `skipAnimationOnMount`, and `onExitComplete` pass
  through.
- Chakra's carousel lightbox recipe can be composed inside `LightboxContent`; carousel behavior is
  intentionally not duplicated here.
- `LightboxImage closeOnClick` closes through Dialog context after the native image `onClick`
  handler unless that handler calls `event.preventDefault()`.
- `useLightbox` and `useLightboxContext` re-export Ark's state hooks unchanged as direct top-level
  moduix package exports for the normal `LightboxRootProvider` and child-state paths.

## Accessibility and state

Ark owns focus trapping, Escape handling, outside interaction, scroll locking, focus restoration,
layering, and ARIA wiring. Render `LightboxTitle` or provide root `aria-label`. Media still needs
useful native `alt`, captions, or equivalent accessible text.

Refs on Ark Dialog parts target their DOM elements. `LightboxCloseIcon` forwards its ref to the
library `CloseButton`. `LightboxImage` forwards its ref to the native `HTMLImageElement`.

Ark parts expose `data-scope="dialog"`, `data-part`, and `data-state="open|closed"`.
`LightboxContent` also preserves nested-dialog state and `--layer-index` /
`--nested-layer-count`; `LightboxBackdrop` preserves `--layer-index`.

## Defaults and styling

Dismissible overlays share the `--moduix-z-popup` base. Content adds Ark's `--layer-index`;
Ark mirrors its computed `--z-index` onto positioners and backdrops. Backdrops sit one level below
content. Customize stacking on content rather than independently raising its surrounding parts.

Moduix styles a zoom cursor and focus ring on the trigger, a blurred backdrop, a centered
positioner, transparent content, constrained image/video media, state-driven motion, and a fixed
close icon anchored to the viewport corner.

The CSS Modules variants keep two public variables, `--moduix-lightbox-content-max-width` (80vw)
and `--moduix-lightbox-content-max-height` (80dvh). They cap both `LightboxContent` and
`LightboxImage`, so one override on `LightboxContent` resizes the whole media surface. Colors,
spacing, typography, and gallery sizing come from foundation tokens; override them with a class
on the part.

The backdrop uses the shared Dialog backdrop keyframes and reads `--moduix-backdrop-bg` and
`--moduix-backdrop-filter`. Content fades and a direct `LightboxBody` child scales from `0.82`;
both read the shared `--moduix-popup-motion-*` variables with the popup default of 200ms
ease-in-out, and exits keep their last frame until unmount. The split exists because a transform on
Content would make it the containing block of the fixed close icon. `LightboxCloseIcon` sets the
`CloseButton` size, color, and background variables and fades together with Content.

When `prefers-reduced-motion: reduce` is active, backdrop and content animations run for 1ms. This
keeps Ark's exit lifecycle intact while avoiding visible motion.

## Intentional sugar and differences from upstream

- `LightboxImage` is a styled native `<img>` that accepts native image props.
- `LightboxImage closeOnClick` is narrow Moduix sugar for image-preview workflows.
- `LightboxGallery` is a styled composition boundary for a nested `Carousel`; it adds no state,
  image registry, render callbacks, or translated Carousel API.
- `LightboxBind` is narrow zero-render sugar for binding image selection to CMS or external DOM.
  Consumers keep ownership of image state and the complete overlay composition.
- `LightboxHeader`, `LightboxBody`, and `LightboxFooter` provide layout and stable slots. A direct `LightboxBody` child also owns the media's scale/translate motion.
- `useLightbox`, `useLightboxContext`, and `LightboxContext` are direct Ark re-exports for the
  normal advanced state path; they do not alter callback detail objects or dialog state behavior.
- Structured image data and slide state stay consumer-owned.
- `LightboxCloseIcon` composes Ark `CloseTrigger` with the library `CloseButton` and defaults
  its label to `"Close image"`.
- Part wrappers add `data-slot` hooks and lightbox-specific visual defaults.
- Legacy adapters, hidden overlay composition, flat part exports, and image registry props stay
  removed.

## Agent notes

Do not add a convenience component that hides `Backdrop`, `Positioner`, or `Content`.
Keep external DOM binding scoped to `LightboxBind`; do not smear source-capture behavior back
into the base `Lightbox` parts or `LightboxGallery`. When data already exists as a structured image
array, prefer explicit `LightboxGallery + Carousel` composition.

## Mount lifecycle

The portalled overlay content defaults to `lazyMount` and `unmountOnExit`. It is absent from the
DOM until first open and is removed after its exit animation. Set `unmountOnExit={false}` to retain
content after the first open; set both props to `false` only when eager initial rendering is needed.

## Local changelog

- 2026-10-17: Public CSS variables went from 63 to two, `--moduix-lightbox-content-max-width` and
  `--moduix-lightbox-content-max-height`, which now also cap `LightboxImage`. The backdrop uses the
  Dialog backdrop keyframes and shared backdrop variables; motion uses the shared popup variables
  with a 200ms ease-in-out default and keeps the exit frame. `LightboxCloseIcon` no longer mirrors
  `data-state` and fades with Content. Gallery thumbnail hover is limited to hover-capable
  pointers. Added `LightboxContext` and the `LightboxRootProps`, `LightboxRootProviderProps`, and
  `LightboxImageProps` types.
- 2026-10-05: Moved the close control inside Content for accessibility and focus trapping;
  scale/translate motion belongs to Body, keeping the close icon viewport-fixed.