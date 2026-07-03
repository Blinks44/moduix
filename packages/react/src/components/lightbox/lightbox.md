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
keeps its `Root`, `RootProvider`, `Trigger`, `Backdrop`, `Positioner`, `Content`, `Title`,
`Description`, and `CloseTrigger` contracts. `RootProvider` remains the moduix bridge for Ark
state created with `useDialog()`.

Keep `Backdrop → Positioner → Content` explicit. `Root` owns the portal boundary.

## Current behavior contract

`Root` and `RootProvider` portal `Backdrop` and `Positioner` automatically by default. Set `portalled={false}` to render them inline, or pass `portalRef` to target a custom container. The structural parts remain explicit and independently styleable.

`Lightbox` and `Lightbox.Root` are the same root component. Root props pass through unchanged,
including controlled and uncontrolled open state, trigger values, focus lifecycle, dismissal,
presence, `ids`, modal behavior, and Ark callback detail objects.

The base `Lightbox` parts do not manage image sources or gallery state. `Lightbox.Image` renders a
styled native image for the single-image path and adds the wrapper-specific `closeOnClick`
interaction. `Lightbox.Gallery` is a layout and styling boundary for a composed `Carousel`; it does
not own image data or slide state. `Lightbox.Bind` is a zero-render behavior part for CMS or
third-party markup that cannot render `Lightbox.Trigger` directly. It uses the surrounding Dialog
context and leaves all overlay markup consumer-owned.

## Anatomy and exported parts

```text
Lightbox.Root
├─ Lightbox.Trigger
├─ Lightbox.Bind
└─ Overlay subtree (automatically portalled)
   ├─ Lightbox.Backdrop
   └─ Lightbox.Positioner
      ├─ Lightbox.CloseTrigger or Lightbox.CloseIcon
      └─ Lightbox.Content
         ├─ Lightbox.Title
         ├─ Lightbox.Description
         ├─ Lightbox.Image
         └─ Lightbox.Gallery
            └─ Carousel.Root

Lightbox.RootProvider
└─ the same part tree connected to Ark useDialog()
```

Stable slots are `lightbox-trigger`, `lightbox-backdrop`, `lightbox-positioner`,
`lightbox-content`, `lightbox-title`, `lightbox-description`, `lightbox-close-trigger`,
`lightbox-close-icon`, `lightbox-image`, and `lightbox-gallery`. `Lightbox.Image` also exposes
`data-close-on-click` when that behavior is enabled.

`Lightbox.Gallery` is a moduix layout part. `Lightbox.Bind` is a zero-render behavior helper, not
an Ark anatomy part.

## Composition

```tsx
import { Lightbox } from '@moduix/react';

export function LightboxDemo() {
  return (
    <Lightbox aria-label="Mountain ridge at sunset">
      <Lightbox.Trigger asChild>
        <button type="button">
          <img src={thumbnail} alt="Mountain ridge at sunset" />
        </button>
      </Lightbox.Trigger>
      <Lightbox.Backdrop />
      <Lightbox.Positioner>
        <Lightbox.CloseIcon />
        <Lightbox.Content>
          <Lightbox.Image src={fullSize} alt="Mountain ridge at sunset" />
        </Lightbox.Content>
      </Lightbox.Positioner>
    </Lightbox>
  );
}
```

Use `asChild` with one semantic child. An image alone is not an interactive trigger; wrap it in a
button. Use `Lightbox.RootProvider` instead of `Lightbox.Root` when state comes from
Ark `useDialog()`. When the close control should stay pinned to the viewport corner, render
`Lightbox.CloseIcon` as a sibling of `Lightbox.Content` inside `Lightbox.Positioner` so it does
not inherit content transforms.

For a known image collection, render `Carousel.Root` inside `Lightbox.Gallery`. Keep the current
page controlled and update it from `Lightbox.Trigger value` through
`onTriggerValueChange(details)`. `Lightbox.Gallery` supplies sizing and layout only; Carousel keeps
its Ark state, controls, indicators, dragging, and keyboard behavior.

For external markup, render `Lightbox.Bind` inside the root, store
`LightboxImageSelectDetails` from `onImageSelect`, and compose the same explicit overlay tree. Bind
opens the surrounding Dialog through context but does not render `Backdrop`, `Positioner`,
`Content`, `CloseIcon`, or `Image`. Use a semantic button or link as the matched `selector` when
images must be keyboard-accessible; Bind relies on the element's native click activation. It
preloads the resolved full-size source on pointer hover or keyboard focus.

## Upstream feature coverage

- Basic, controlled, root-provider, lazy-mount, initial-focus, final-focus, nested, and
  multiple-trigger flows come from Ark Dialog unchanged.
- Gallery selection uses `Trigger.value` and `onTriggerValueChange(details)`.
- Structured server or CMS image arrays compose `Carousel` inside `Lightbox.Gallery` and sync the
  current slide through `Trigger.value`, `onTriggerValueChange(details)`, and carousel page state.
- `Lightbox.Gallery` styles Carousel controls, a stable media viewport, dot indicators, and image
  thumbnail indicators without wrapping or translating Carousel props.
- `Lightbox.Bind` listens to external markup, calls `onImageSelect(details)`, and opens its parent
  Dialog through context. It renders nothing and intentionally stays single-image capture, not a
  hidden carousel or image registry. Its props are `rootRef`, `rootSelector`, `selector`, and the
  required `onImageSelect`. It listens for native click activation and preloads the resolved image
  on pointer hover or focus.
- `LightboxImageSelectDetails` contains `src`, optional `alt`, and the source
  `HTMLImageElement` as `element`.
- `open`, `defaultOpen`, `onOpenChange(details)`, `ids`, `initialFocusEl`, `finalFocusEl`, `modal`,
  `persistentElements`, `restoreFocus`, dismissal callbacks, focus props, `lazyMount`,
  `unmountOnExit`, `present`, `immediate`, `skipAnimationOnMount`, and `onExitComplete` pass
  through.
- Chakra's carousel lightbox recipe can be composed inside `Lightbox.Content`; carousel behavior is
  intentionally not duplicated here.
- `Lightbox.Image closeOnClick` closes through Dialog context after the native image `onClick`
  handler unless that handler calls `event.preventDefault()`.

## Accessibility and state

Ark owns focus trapping, Escape handling, outside interaction, scroll locking, focus restoration,
layering, and ARIA wiring. Render `Lightbox.Title` or provide root `aria-label`. Media still needs
useful native `alt`, captions, or equivalent accessible text.

Refs on Ark Dialog parts target their DOM elements. `Lightbox.CloseIcon` forwards its ref to the
library `CloseButton.Root`. `Lightbox.Image` forwards its ref to the native `HTMLImageElement`.

Ark parts expose `data-scope="dialog"`, `data-part`, and `data-state="open|closed"`.
`Lightbox.Content` also preserves nested-dialog state and `--layer-index` /
`--nested-layer-count`; `Lightbox.Backdrop` preserves `--layer-index`.

## Defaults and styling

Moduix styles a zoom cursor on the trigger, a blurred backdrop, a centered positioner, transparent
content, constrained image/video media, state-driven motion, and a fixed close icon anchored to the
viewport corner.

Public variables use Ark part names: `--lightbox-backdrop-*`, `--lightbox-positioner-padding`,
`--lightbox-content-*`, `--lightbox-media-*`, `--lightbox-close-icon-*`, and
`--lightbox-transition`. Gallery layout uses `--lightbox-gallery-*` variables for width, aspect
ratio, viewport height, gap, track background, and thumbnail sizing/state.

## Intentional sugar and differences from upstream

- `Lightbox.Image` is a styled native `<img>` that accepts native image props.
- `Lightbox.Image closeOnClick` is narrow Moduix sugar for image-preview workflows.
- `Lightbox.Gallery` is a styled composition boundary for a nested `Carousel`; it adds no state,
  image registry, render callbacks, or translated Carousel API.
- `Lightbox.Bind` is narrow zero-render sugar for binding image selection to CMS or external DOM.
  Consumers keep ownership of image state and the complete overlay composition.
- moduix does not re-export Ark dialog hooks, contexts, or detail-object types from `Lightbox`;
  import advanced state APIs from `@ark-ui/react/dialog` when needed.
- Structured image data and slide state stay consumer-owned.
- `Lightbox.CloseIcon` composes Ark `CloseTrigger` with the library `CloseButton.Root` and defaults
  its label to `"Close image"`.
- Part wrappers add `data-slot` hooks and lightbox-specific visual defaults.
- Legacy adapters, hidden overlay composition, flat part exports, and image registry props stay
  removed.

## Agent notes

Do not add a convenience component that hides `Backdrop`, `Positioner`, or `Content`.
Keep external DOM binding scoped to `Lightbox.Bind`; do not smear source-capture behavior back
into the base `Lightbox` parts or `Lightbox.Gallery`. When data already exists as a structured image
array, prefer explicit `Lightbox.Gallery + Carousel` composition.

## Local changelog

- 2026-07-01: Made overlay portalling automatic by default, added `portalled` and `portalRef`, and removed explicit `Portal` wrappers from recommended composition.
- 2026-07-03: Kept `RootProvider` but removed moduix re-exports of Ark dialog hooks, contexts, and
  renamed detail-object types; advanced state access now imports from `@ark-ui/react/dialog`.

- 2026-06-19: Adopted Ark UI Dialog, adopted Ark anatomy, namespace exports,
  callbacks, provider/context hooks, data-state styling, and explicit overlay composition; removed
  all legacy adapters and image/gallery state helpers.
- 2026-06-19: Restored delegated CMS capture as `Lightbox.Gallery`, using Ark dialog state under
  the hood while keeping the base composition explicit.
- 2026-06-25: Re-audited the Ark Dialog contract after migration, documented inherited focus,
  presence, id, and non-modal props, converted `Lightbox.Frame` to an Ark factory part, and
  simplified `closeOnClick` composition.
- 2026-06-30: Documented `Lightbox + Carousel` as the recommended pattern for structured server or
  CMS image arrays and clarified that the then-current `Lightbox.Gallery` helper stayed limited to
  delegated DOM capture.
- 2026-06-30: Reassigned `Lightbox.Gallery` to the styled Carousel composition path and renamed the
  delegated DOM helper to `Lightbox.Delegated`; added stable gallery sizing and thumbnail styles.
- 2026-06-30: Replaced the layout-oriented `Lightbox.Frame` with native `Lightbox.Image` and renamed
  the external DOM helper from `Lightbox.Delegated` to user-facing `Lightbox.Bind`.
- 2026-06-30: Reduced `Lightbox.Bind` to a zero-render context behavior part with
  `onImageSelect(details)` so consumers own the full overlay composition.
- 2026-06-30: Simplified `Lightbox.Bind` to native click activation while retaining full-size image
  preload on pointer hover and keyboard focus.