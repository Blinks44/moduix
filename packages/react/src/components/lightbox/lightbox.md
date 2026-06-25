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
`Description`, `CloseTrigger`, and `Context` contracts. `useLightbox()` and
`useLightboxContext()` are renamed exports of Ark `useDialog()` and `useDialogContext()`.

Keep `Portal → Backdrop → Positioner → Content` explicit. Use the public `Portal` export from
`moduix`.

## Current behavior contract

`Lightbox` and `Lightbox.Root` are the same root component. Root props pass through unchanged,
including controlled and uncontrolled open state, trigger values, focus lifecycle, dismissal,
presence, `ids`, modal behavior, and Ark callback detail objects.

The base `Lightbox` parts do not manage image sources or gallery state. Consumers compose media
inside `Lightbox.Frame` and use Ark multiple-trigger values for explicit galleries.
`Lightbox.Frame` is a local Ark factory `div` part. It adds the only wrapper-specific interaction
prop on the composed content path: `closeOnClick`. `Lightbox.Gallery` is the delegated capture
helper for CMS or third-party markup that cannot render `Lightbox.Trigger` directly.

## Anatomy and exported parts

```text
Lightbox.Root
├─ Lightbox.Trigger
└─ Portal
   ├─ Lightbox.Backdrop
   └─ Lightbox.Positioner
      ├─ Lightbox.CloseTrigger or Lightbox.CloseIcon
      └─ Lightbox.Content
         ├─ Lightbox.Title
         ├─ Lightbox.Description
         └─ Lightbox.Frame

Lightbox.RootProvider
└─ the same part tree connected to useLightbox()
```

Stable slots are `lightbox-trigger`, `lightbox-backdrop`, `lightbox-positioner`,
`lightbox-content`, `lightbox-title`, `lightbox-description`, `lightbox-close-trigger`,
`lightbox-close-icon`, and `lightbox-frame`. `Lightbox.Frame` also exposes
`data-scope="lightbox"` and `data-part="frame"` because it is a local Ark factory part.

`Lightbox.Gallery` is a behavior helper, not an Ark anatomy part.

## Composition

```tsx
import { Lightbox, Portal } from '@moduix/react';

export function LightboxDemo() {
  return (
    <Lightbox aria-label="Mountain ridge at sunset">
      <Lightbox.Trigger asChild>
        <button type="button">
          <img src={thumbnail} alt="Mountain ridge at sunset" />
        </button>
      </Lightbox.Trigger>
      <Portal>
        <Lightbox.Backdrop />
        <Lightbox.Positioner>
          <Lightbox.CloseIcon />
          <Lightbox.Content>
            <Lightbox.Frame>
              <img src={fullSize} alt="Mountain ridge at sunset" />
            </Lightbox.Frame>
          </Lightbox.Content>
        </Lightbox.Positioner>
      </Portal>
    </Lightbox>
  );
}
```

Use `asChild` with one semantic child. An image alone is not an interactive trigger; wrap it in a
button. Use `Lightbox.RootProvider` instead of `Lightbox.Root` when state comes from
`useLightbox()`. When the close control should stay pinned to the viewport corner, render
`Lightbox.CloseIcon` as a sibling of `Lightbox.Content` inside `Lightbox.Positioner` so it does
not inherit content transforms.

## Upstream feature coverage

- Basic, controlled, root-provider, context, lazy-mount, initial-focus, final-focus, nested, and
  multiple-trigger flows come from Ark Dialog unchanged.
- Gallery selection uses `Trigger.value` and `onTriggerValueChange(details)`.
- `Lightbox.Gallery` restores delegated CMS capture by listening to external markup and opening an
  internal Ark-driven lightbox from resolved image sources.
- `open`, `defaultOpen`, `onOpenChange(details)`, `ids`, `initialFocusEl`, `finalFocusEl`, `modal`,
  `persistentElements`, `restoreFocus`, dismissal callbacks, focus props, `lazyMount`,
  `unmountOnExit`, `present`, `immediate`, `skipAnimationOnMount`, and `onExitComplete` pass
  through.
- Chakra's carousel lightbox recipe can be composed inside `Lightbox.Content`; carousel behavior is
  intentionally not duplicated here.
- `Lightbox.Frame closeOnClick` composes Ark `CloseTrigger asChild` around the frame so media can
  dismiss the lightbox without extra consumer wiring.

## Accessibility and state

Ark owns focus trapping, Escape handling, outside interaction, scroll locking, focus restoration,
layering, and ARIA wiring. Render `Lightbox.Title` or provide root `aria-label`. Media still needs
useful native `alt`, captions, or equivalent accessible text.

Refs on Ark Dialog parts target their DOM elements. `Lightbox.CloseIcon` forwards its ref to the
library `CloseButton.Root`. `Lightbox.Frame` forwards its ref to its Ark factory `div`.

Ark parts expose `data-scope="dialog"`, `data-part`, and `data-state="open|closed"`.
`Lightbox.Content` also preserves nested-dialog state and `--layer-index` /
`--nested-layer-count`; `Lightbox.Backdrop` preserves `--layer-index`.

## Defaults and styling

Moduix styles a zoom cursor on the trigger, a blurred backdrop, a centered positioner, transparent
content, constrained image/video media, state-driven motion, and a fixed close icon anchored to the
viewport corner.

Public variables use Ark part names: `--lightbox-backdrop-*`, `--lightbox-positioner-padding`,
`--lightbox-content-*`, `--lightbox-media-*`, `--lightbox-close-icon-*`, and
`--lightbox-transition`.

## Intentional sugar and differences from upstream

- `Lightbox.Frame` is an Ark factory layout helper for constrained image or video content.
- `Lightbox.Frame closeOnClick` is narrow Moduix sugar for image-preview workflows.
- `Lightbox.Gallery` is narrow Moduix sugar for delegated image capture from CMS or external DOM.
- `Lightbox.CloseIcon` composes Ark `CloseTrigger` with the library `CloseButton.Root` and defaults
  its label to `"Close image"`.
- Part wrappers add `data-slot` hooks and lightbox-specific visual defaults.
- Legacy adapters, hidden overlay composition, flat part exports, and image registry props stay
  removed.

## Agent notes

Do not add a convenience component that hides `Portal`, `Backdrop`, `Positioner`, or `Content`.
Keep delegated capture scoped to `Lightbox.Gallery`; do not smear source-capture behavior back into
the base `Lightbox` parts.

## Local changelog

- 2026-06-19: Adopted Ark UI Dialog, adopted Ark anatomy, namespace exports,
  callbacks, provider/context hooks, data-state styling, and explicit overlay composition; removed
  all legacy adapters and image/gallery state helpers.
- 2026-06-19: Restored delegated CMS capture as `Lightbox.Gallery`, using Ark dialog state under
  the hood while keeping the base composition explicit.
- 2026-06-25: Re-audited the Ark Dialog contract after migration, documented inherited focus,
  presence, id, and non-modal props, converted `Lightbox.Frame` to an Ark factory part, and
  simplified `closeOnClick` composition.