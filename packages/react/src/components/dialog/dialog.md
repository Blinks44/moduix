# Dialog

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/dialog
- Chakra UI: https://chakra-ui.com/docs/components/dialog

## Purpose

`Dialog` provides modal, non-modal, and alert-dialog workflows with Ark UI focus management,
dismissal behavior, layering, and accessibility.

## Upstream model to preserve

The wrapper follows `@ark-ui/react/dialog` directly. Preserve `Root`, `RootProvider`, `Trigger`,
`Backdrop`, `Positioner`, `Content`, `Title`, `Description`, and `CloseTrigger`.

Keep `Backdrop → Positioner → Content` explicit. `Root` owns the portal boundary.

## Current behavior contract

`Root` and `RootProvider` portal `Backdrop` and `Positioner` automatically by default. Set `portalled={false}` to render them inline, or pass `portalRef` to target a custom container. The structural parts remain explicit and independently styleable.

`Dialog.Root` passes Ark root props through unchanged, including controlled and uncontrolled open
state, focus targets, modal behavior, presence options, dismissal callbacks, `ids`, and
`role="dialog" | "alertdialog"`.

`onOpenChange` keeps the Ark callback shape: `(details) => void`, with the current state in
`details.open`. `modal` is boolean; the legacy `"trap-focus"` mode is not supported.

## Anatomy and exported parts

```text
Dialog.Root
├─ Dialog.Trigger
└─ Overlay subtree (automatically portalled)
   ├─ Dialog.Backdrop
   └─ Dialog.Positioner
      └─ Dialog.Content
         ├─ Dialog.CloseTrigger or Dialog.CloseIcon
         ├─ Dialog.Title
         ├─ Dialog.Description
         ├─ Dialog.Header
         ├─ Dialog.Body
         └─ Dialog.Footer

Dialog.RootProvider
└─ the same part tree connected to moduix useDialog()
```

Stable slots are `dialog-trigger`, `dialog-backdrop`, `dialog-positioner`, `dialog-content`,
`dialog-title`, `dialog-description`, `dialog-close-trigger`, `dialog-close-icon`,
`dialog-header`, `dialog-body`, and `dialog-footer`.

## Composition

```tsx
import { Button, Dialog } from '@moduix/react';

export function DialogDemo() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>Open dialog</Button>
      </Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Title>Project settings</Dialog.Title>
          <Dialog.Description>Update the project configuration.</Dialog.Description>
          <Dialog.CloseIcon />
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
```

Use `asChild` with one semantic child. Use `Dialog.RootProvider` instead of `Dialog.Root` when the
same state instance comes from moduix `useDialog()`.

## Upstream feature coverage

- Basic, controlled, root-provider, context, alert-dialog, lazy-mount, initial-focus, final-focus,
  non-modal, inside-scroll, outside-scroll, nested, and multiple-trigger flows are supported and
  documented.
- `closeOnEscape`, `closeOnInteractOutside`, `initialFocusEl`, `finalFocusEl`, `persistentElements`,
  `preventScroll`, `restoreFocus`, `trapFocus`, `ids`, and outside-interaction callbacks pass
  through.
- `lazyMount`, `unmountOnExit`, `present`, `immediate`, `skipAnimationOnMount`, and
  `onExitComplete` preserve Ark presence behavior.
- Open-from-menu, confirmation, and rapid-state-change patterns use the same controlled or Ark
  `useDialog()` contracts and require no wrapper-specific API.
- Close-behavior, conditional-rendering, z-index stacking, and dynamic-import guide patterns stay
  Ark-shaped: keep the root mounted, use `lazyMount`/`unmountOnExit` for portal content, and style
  stacking through `--layer-index`.

## Accessibility and state

Ark UI owns focus trapping, Escape handling, outside interaction, scroll prevention, focus
restoration, nested layer dismissal, and ARIA wiring. Render `Dialog.Title` or provide root
`aria-label`; use `Dialog.Description` for supporting accessible text.

Do not set static pointer-event behavior on `Dialog.Positioner`. Ark applies modal-aware inline
pointer events: modal positioners cover the viewport, while non-modal positioners become
pointer-transparent and keep `Dialog.Content` interactive.

`Dialog.Content` exposes `data-state`, `data-nested`, `data-has-nested`, `--layer-index`, and
`--nested-layer-count`. `Dialog.Backdrop` exposes `data-state` and `--layer-index`.
`Dialog.Trigger` exposes `data-state`, `data-value`, and `data-current`.

Refs on DOM parts target the underlying Ark DOM element. `Dialog.CloseIcon` forwards its ref to the
rendered `CloseButton.Root`.

## Defaults and styling

Moduix supplies visual defaults for native trigger/close buttons, backdrop, centered positioner,
content surface, typography, layout helpers, motion, and close icon.

Open and close animations use Ark `data-state="open|closed"`. Nested scaling uses
`--nested-layer-count` and transitions through `--dialog-nested-transition`. Like `Drawer`, nested
dialogs animate the parent `Content` with CSS `scale` and `translate` individual transform
properties so the parent recedes downward and remains visibly layered behind the active dialog. Tune
the effect with `--dialog-nested-scale-step`, `--dialog-nested-translate-step`, and
`--dialog-nested-transition`. Layer order uses `--layer-index`. `Dialog.CloseIcon` is positioned at
the content's block-start/inline-end corner by default, including when it is composed outside
`Dialog.Header`. Public `--dialog-*` tokens live in `theme.css`.

## Intentional sugar and differences from upstream

- `Dialog.CloseIcon` composes Ark `CloseTrigger` with the moduix close button and defaults its
  accessible label to `"Close dialog"`.
- `Dialog.Header`, `Dialog.Body`, and `Dialog.Footer` are native layout helpers.
- moduix exports Ark's `useDialog` and `useDialogContext` hooks alongside `Dialog`, so provider and
  context workflows stay on the moduix public surface. Direct Ark imports remain escape hatches.
- `Dialog.Trigger` and `Dialog.CloseTrigger` receive moduix button styling only when they render
  their native button. `asChild` leaves the child component's visual styling in control.
- Legacy exports were removed: `createDialogHandle`, `DialogPortal`, `DialogViewport`,
  `DialogPopup`, flat part aliases, hidden `DialogContent` overlay composition, `render`, `handle`,
  and payload APIs.

## Agent notes

Do not introduce a convenience component that hides `Backdrop`, `Positioner`, or `Content`. Keep
Ark callback detail objects, `RootProvider`, `useDialog`, and `useDialogContext` unchanged.

## Local changelog

- 2026-07-10: Re-exported `useDialog` and `useDialogContext` so provider and context workflows use
  the moduix package surface.
- 2026-07-02: Removed `Dialog.Context`, Ark dialog hooks, and duplicate Ark type exports from the
  moduix surface. Kept `RootProvider`, structural parts, and existing dialog-specific sugar.
- 2026-07-01: Made overlay portalling automatic by default, added `portalled` and `portalRef`, and removed explicit `Portal` wrappers from recommended composition.

- 2026-06-29: Synced nested dialog motion with Drawer by adding animated parent scale and downward
  offset so the parent remains visibly layered behind the active nested dialog.
- 2026-06-25: Audited Ark migration, corrected public docs snippets to use `Dialog.RootProvider`,
  added open-from-menu and confirmation examples, and removed stale story CSS left from pre-Ark
  popup naming.
- 2026-06-18: Adopted Ark UI, adopted Ark anatomy and callbacks, exposed
  provider/context hooks, moved to explicit overlay composition, migrated state styling, and
  removed all legacy compatibility APIs.
- 2026-06-18: Aligned positioner pointer events with Ark, made close-icon placement independent of
  header composition, and added smooth nested-layer scale and overlay transitions.