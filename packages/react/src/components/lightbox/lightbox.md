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
consumer-owned. `LightboxHeader`, `LightboxBody`, and `LightboxFooter` are plain
layout helpers for captions, metadata, or actions around the media surface.

## Anatomy and exported parts

```text
Lightbox
├─ LightboxTrigger
├─ LightboxBind
└─ Overlay subtree (automatically portalled)
   ├─ LightboxBackdrop
   └─ LightboxPositioner
      ├─ LightboxCloseTrigger or LightboxCloseIcon
      └─ LightboxContent
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
    <Lightbox aria-label="Mountain ridge at sunset">
      <LightboxTrigger asChild>
        <button type="button">
          <img src={thumbnail} alt="Mountain ridge at sunset" />
        </button>
      </LightboxTrigger>
      <LightboxBackdrop />
      <LightboxPositioner>
        <LightboxCloseIcon />
        <LightboxContent>
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
`@moduix/react` as direct top-level hooks. When the close control should stay pinned to the viewport corner, render
`LightboxCloseIcon` as a sibling of `LightboxContent` inside `LightboxPositioner` so it does
not inherit content transforms.

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
source on pointer hover or keyboard focus.

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

The current gallery thumbnail uses
`--moduix-lightbox-gallery-thumbnail-active-translate-y` with a one-border-width upward offset, so themes
can tune or remove the selected-state lift without replacing the thumbnail selector.

Content motion falls back to the shared `--moduix-popup-motion-*` tokens; `--moduix-lightbox-*` content-motion
variables remain the more specific override. Backdrop motion remains separate.

When `prefers-reduced-motion: reduce` is active, backdrop and content animations run for 1ms. This
keeps Ark's exit lifecycle intact while avoiding visible motion.

Moduix styles a zoom cursor on the trigger, a blurred backdrop, a centered positioner, transparent
content, constrained image/video media, state-driven motion, and a fixed close icon anchored to the
viewport corner.

Public variables use Ark part names: `--moduix-lightbox-backdrop-*`, `--moduix-lightbox-positioner-padding`,
`--moduix-lightbox-content-*`, `--moduix-lightbox-media-*`, `--moduix-lightbox-close-icon-*`,
`--moduix-lightbox-trigger-focus-ring-*`, and
`--moduix-lightbox-transition`. Gallery layout uses `--moduix-lightbox-gallery-*` variables for width, aspect
ratio, viewport height, gap, track background, and thumbnail sizing/state.

## Intentional sugar and differences from upstream

- `LightboxImage` is a styled native `<img>` that accepts native image props.
- `LightboxImage closeOnClick` is narrow Moduix sugar for image-preview workflows.
- `LightboxGallery` is a styled composition boundary for a nested `Carousel`; it adds no state,
  image registry, render callbacks, or translated Carousel API.
- `LightboxBind` is narrow zero-render sugar for binding image selection to CMS or external DOM.
  Consumers keep ownership of image state and the complete overlay composition.
- `LightboxHeader`, `LightboxBody`, and `LightboxFooter` provide only layout and stable slots.
- `useLightbox` and `useLightboxContext` are direct Ark hook re-exports for the normal advanced
  state path; they do not alter callback detail objects or dialog state behavior.
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

- 2026-08-11: Added a reduced-motion animation path and coverage for the accessible close icon's
  focus restoration.

- 2026-08-01: Defaulted portalled overlay presence to lazy mounting and unmounting after exit.

- 2026-07-28: Required `LightboxBind.selector` so external previews always target a semantic
  keyboard-accessible activator; made the positioner scrollable and constrained content by its
  configured viewport padding.
- 2026-07-28: Documented non-modal composition without `Backdrop`; it preserves interaction with
  page content outside the lightbox.
- 2026-07-21: Routed shared dimensions, spacing, icon geometry, and focus-ring fallbacks through foundation tokens so density and theme presets can retune the component consistently.
- 2026-07-16: Added shared `--moduix-popup-motion-*` fallbacks for content motion; backdrop motion remains separate.
- 2026-07-10: Re-exported `useLightbox` and `useLightboxContext` as direct moduix package exports
  so `LightboxRootProvider` and context examples no longer require direct Ark imports.
- 2026-07-05: Added a library-colored focus-visible outline to `LightboxTrigger` after focus
  restoration and exposed `--moduix-lightbox-trigger-focus-ring-*` tokens for trigger ring overrides.
- 2026-07-05: Changed `LightboxGallery` from a forced width to a centered max-width cap so `Lightbox + Carousel` keeps its natural centered size inside `LightboxContent`.
- 2026-07-05: Kept `LightboxGallery` centered inside the new `Content` grid layout so `Lightbox + Carousel` stays visually centered.
- 2026-07-05: Added `LightboxHeader`, `LightboxBody`, and `LightboxFooter`, and documented the layout-helper composition path around media content.
- 2026-07-01: Made overlay portalling automatic by default, added `portalled` and `portalRef`, and removed explicit `Portal` wrappers from recommended composition.
- 2026-07-03: Kept `LightboxRootProvider` but removed moduix re-exports of Ark dialog hooks, contexts, and
  renamed detail-object types; advanced state access now imports from `@ark-ui/react/dialog`.

- 2026-06-19: Adopted Ark UI Dialog, adopted Ark anatomy, flat exports,
  callbacks, provider/context hooks, data-state styling, and explicit overlay composition; removed
  all legacy adapters and image/gallery state helpers.
- 2026-06-19: Restored delegated CMS capture as `LightboxGallery`, using Ark dialog state under
  the hood while keeping the base composition explicit.
- 2026-06-25: Re-audited the Ark Dialog contract after migration, documented inherited focus,
  presence, id, and non-modal props, converted `LightboxImage` to an Ark factory part, and
  simplified `closeOnClick` composition.
- 2026-06-30: Documented `Lightbox + Carousel` as the recommended pattern for structured server or
  CMS image arrays and clarified that the then-current `LightboxGallery` helper stayed limited to
  delegated DOM capture.
- 2026-06-30: Reassigned `LightboxGallery` to the styled Carousel composition path and renamed the
  delegated DOM helper to `LightboxBind`; added stable gallery sizing and thumbnail styles.
- 2026-06-30: Replaced the layout-oriented `LightboxImage` with native `LightboxImage` and renamed
  the external DOM helper from `LightboxBind` to user-facing `LightboxBind`.
- 2026-06-30: Reduced `LightboxBind` to a zero-render context behavior part with
  `onImageSelect(details)` so consumers own the full overlay composition.
- 2026-06-30: Simplified `LightboxBind` to native click activation while retaining full-size image
  preload on pointer hover and keyboard focus.