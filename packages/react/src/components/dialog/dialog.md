# Dialog

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/dialog
- Chakra UI: https://chakra-ui.com/docs/components/dialog
- shadcn/ui: https://ui.shadcn.com/docs/components/dialog

These sources were compared on 2026-08-10.

## Purpose

`Dialog` provides modal, non-modal, and alert-dialog workflows with Ark UI focus management,
dismissal behavior, layering, and accessibility.

## Upstream model to preserve

The wrapper follows `@ark-ui/react/dialog` directly. Preserve `Dialog`, `DialogRootProvider`,
`DialogTrigger`, `DialogBackdrop`, `DialogPositioner`, `DialogContent`, `DialogTitle`,
`DialogDescription`, and `DialogCloseTrigger`.

Keep `DialogBackdrop → DialogPositioner → DialogContent` explicit. `Dialog` owns the portal boundary.

## Current behavior contract

`Dialog` and `DialogRootProvider` portal `DialogBackdrop` and `DialogPositioner` automatically by default. Set `portalled={false}` to render them inline, or pass `portalRef` to target a custom container. The structural parts remain explicit and independently styleable.

`Dialog` passes Ark root props through unchanged, including controlled and uncontrolled open
state, focus targets, modal behavior, presence options, dismissal callbacks, `ids`, and
`role="dialog" | "alertdialog"`.

`onOpenChange` keeps the Ark callback shape: `(details) => void`, with the current state in
`details.open`. `modal` is boolean; the legacy `"trap-focus"` mode is not supported.

`DialogContent` adds three moduix props, each mirrored as a data attribute:

| Prop             | Values                                   | Default     | Attribute              |
| ---------------- | ---------------------------------------- | ----------- | ---------------------- |
| `size`           | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'`      | `data-size`            |
| `placement`      | `'center' \| 'top' \| 'bottom'`          | `'center'`  | `data-placement`       |
| `scrollBehavior` | `'outside' \| 'inside'`                  | `'outside'` | `data-scroll-behavior` |

Sizes set widths of 24rem, 28rem, 32rem, and 36rem; `full` covers the viewport and removes the
positioner padding, border, and radius. `outside` scrolls the positioner; `inside` caps the content
at the viewport height and scrolls `DialogBody`. The types are exported as `DialogSize`,
`DialogPlacement`, and `DialogScrollBehavior`.

## Anatomy and exported parts

```text
Dialog
├─ DialogTrigger
└─ Overlay subtree (automatically portalled)
   ├─ DialogBackdrop
   └─ DialogPositioner
      └─ DialogContent
         ├─ DialogCloseTrigger or DialogCloseIcon
         ├─ DialogTitle
         ├─ DialogDescription
         ├─ DialogHeader
         ├─ DialogBody
         └─ DialogFooter

DialogRootProvider
└─ the same part tree connected to moduix useDialog()

DialogContext
└─ a render function with the current dialog state and methods
```

Stable slots are `dialog-trigger`, `dialog-backdrop`, `dialog-positioner`, `dialog-content`,
`dialog-title`, `dialog-description`, `dialog-close-trigger`, `dialog-close-icon`,
`dialog-header`, `dialog-body`, and `dialog-footer`.

## Composition

```tsx
import { Button } from '@moduix/react/button';
import {
  Dialog,
  DialogBackdrop,
  DialogBody,
  DialogCloseIcon,
  DialogCloseTrigger,
  DialogContext,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPositioner,
  DialogRootProvider,
  DialogTitle,
  DialogTrigger,
  useDialog,
  useDialogContext,
} from '@moduix/react/dialog';

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogBackdrop />
      <DialogPositioner>
        <DialogContent>
          <DialogTitle>Project settings</DialogTitle>
          <DialogDescription>Update the project configuration.</DialogDescription>
          <DialogCloseIcon />
        </DialogContent>
      </DialogPositioner>
    </Dialog>
  );
}
```

Use `asChild` with one semantic child. Use `DialogRootProvider` instead of `Dialog` when the
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
restoration, nested layer dismissal, and ARIA wiring. Render `DialogTitle` or provide root
`aria-label`; use `DialogDescription` for supporting accessible text.

Do not set static pointer-event behavior on `DialogPositioner`. Ark applies modal-aware inline
pointer events: modal positioners cover the viewport, while non-modal positioners become
pointer-transparent and keep `DialogContent` interactive.

`DialogContent` exposes `data-state`, `data-nested`, `data-has-nested`, `--layer-index`, and
`--nested-layer-count`. `DialogBackdrop` exposes `data-state` and `--layer-index`.
`DialogTrigger` exposes `data-state`, `data-value`, and `data-current`.

Refs on DOM parts target the underlying Ark DOM element. `DialogCloseIcon` forwards its ref to the
rendered `CloseButton`.

## Defaults and styling

Native `DialogTrigger` and `DialogCloseTrigger` buttons are unstyled. Compose them with `asChild`
and `Button`, as every example does.

Moduix supplies visual defaults for the backdrop, centered positioner, content surface, typography,
layout helpers, motion, and close icon. Every value comes from a foundation token, so presets retune
the dialog without component variables. The only public variable is `--moduix-dialog-width`, which
overrides the width of every `size` except `full`. Change anything else for one dialog with a class
on the part; component styles live in `@layer moduix.components`, so an unlayered class wins.

`DialogDescription` is muted; `DialogBody` inherits the content color. `DialogHeader` stacks its
children with a small gap. The close icon is a `CloseButton`; restyle it with a class or the
`--moduix-close-button-*` variables.

The backdrop reads the shared `--moduix-backdrop-bg` and `--moduix-backdrop-filter`. Content motion
reads the shared `--moduix-popup-motion-*` variables; set them on `DialogContent` for a local
exception. Backdrop motion has no variables.

Dismissible overlays share the `--moduix-z-popup` base. Content adds Ark's `--layer-index`;
Ark mirrors its computed `--z-index` onto the positioner and backdrop, which sits one level below.
Set custom stacking on content, not an independent positioner/backdrop layer.

`DialogPositioner` centers content with `place-items: safe center` and scrolls when content is
taller than the viewport, so the top of tall content stays reachable; `DialogContent` has no
`max-height` unless `scrollBehavior="inside"` is set. When `DialogCloseIcon` is present,
`DialogTitle` reserves inline-end space for it. `DialogFooter` wraps its actions when they do not
fit on one line.

Open and close animations use Ark `data-state="open|closed"`. Like `Drawer`, nested dialogs scale
and move the parent `Content` down with the CSS `scale` and `translate` properties, driven by
`--nested-layer-count`, so the parent stays visibly layered behind the active dialog.
`DialogCloseIcon` sits in the content's block-start/inline-end corner, including when it is
composed outside `DialogHeader`. When the system requests reduced motion, backdrop and content
animations are disabled; Ark presence completes the exit at once.

## Intentional sugar and differences from upstream

- `DialogCloseIcon` composes Ark `CloseTrigger` with the moduix close button and defaults its
  accessible label to `"Close dialog"`.
- `DialogHeader`, `DialogBody`, and `DialogFooter` are native layout helpers.
- moduix exports Ark's `useDialog` and `useDialogContext` hooks alongside `Dialog`, and includes
  `DialogContext`, so provider and context workflows stay on the moduix public surface. Direct Ark
  imports remain escape hatches.
- `DialogTrigger` and `DialogCloseTrigger` add no styles; use `asChild` with `Button`.
- `DialogContent` adds `size`, `placement`, and `scrollBehavior` presets, following Chakra UI's
  dialog options.
- Legacy exports were removed: `createDialogHandle`, `DialogPortal`, `DialogViewport`,
  `DialogPopup`, flat part aliases, hidden `DialogContent` overlay composition, `render`, `handle`,
  and payload APIs.

## Agent notes

Do not introduce a convenience component that hides `Backdrop`, `Positioner`, or `Content`. Keep
Ark callback detail objects, `DialogRootProvider`, `useDialog`, and `useDialogContext` unchanged.

## Mount lifecycle

The portalled overlay content defaults to `lazyMount` and `unmountOnExit`. It is absent from the
DOM until first open and is removed after its exit animation. Set `unmountOnExit={false}` to retain
content after the first open; set both props to `false` only when eager initial rendering is needed.

## Local changelog

- 2026-10-15: Public CSS variables went from 45 to one, `--moduix-dialog-width`. Motion uses the
  shared `--moduix-popup-motion-*` variables, the backdrop uses `--moduix-backdrop-bg` and
  `--moduix-backdrop-filter`, and everything else comes from tokens. `DialogHeader` is a plain
  stack instead of a two-column grid. The Tailwind close icon keeps the `CloseButton` focus ring.
- 2026-10-13: Added `size`, `placement`, and `scrollBehavior` to `DialogContent`. Removed native
  trigger styling. `DialogBody` inherits the content color. Tall content scrolls the positioner,
  long titles keep clear of `DialogCloseIcon`, and footer actions wrap.
- 2026-10-02: Aligned content, positioner, and backdrop stacking with Ark layer indices and its
  mirrored z-index.