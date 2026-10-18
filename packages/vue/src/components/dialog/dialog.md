# Dialog (Vue)

## Upstream reference

[Ark UI Dialog](https://ark-ui.com/docs/components/dialog). The React adapter's `dialog.md` holds
the full shared contract; this file records the Vue specifics. The Vue Tailwind adapter shares this
behavior contract.

## Purpose

A styled Ark UI modal, non-modal, and alert-dialog surface with explicit anatomy.

## Composition

```vue
<Dialog>
  <DialogTrigger as-child><Button>Open dialog</Button></DialogTrigger>
  <DialogBackdrop />
  <DialogPositioner>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Notifications</DialogTitle>
        <DialogCloseIcon />
        <DialogDescription>You are all caught up.</DialogDescription>
      </DialogHeader>
      <DialogBody>Content</DialogBody>
      <DialogFooter>
        <DialogCloseTrigger as-child><Button>Close</Button></DialogCloseTrigger>
      </DialogFooter>
    </DialogContent>
  </DialogPositioner>
</Dialog>
```

## Public contract

- Exports `Dialog`, `DialogRootProvider`, `DialogContext`, `DialogTrigger`, `DialogBackdrop`,
  `DialogPositioner`, `DialogContent`, `DialogTitle`, `DialogDescription`, `DialogCloseTrigger`,
  `DialogCloseIcon`, `DialogHeader`, `DialogBody`, `DialogFooter`, `useDialog`, and
  `useDialogContext`, plus Ark's dialog types and moduix `DialogSize`, `DialogPlacement`, and
  `DialogScrollBehavior`. `DialogRootProps`, `DialogRootProviderProps`, and `DialogContentProps` are
  the moduix props (Ark props plus `portalled`, `portalRef`, `size`, `placement`, and
  `scrollBehavior`), as in React and Solid.
- `Dialog` and `DialogRootProvider` default `lazyMount`, `unmountOnExit`, and `portalled` to
  `true`. `DialogBackdrop` and `DialogPositioner` portal automatically; `portalled=false` keeps
  them inline and `portalRef` chooses a target.
- `DialogRootProvider` receives the store returned by `useDialog()`. Ark emits such as
  `open-change` pass through unchanged with Ark detail objects.
- `DialogContent` adds `size` (`sm`, `md`, `lg`, `xl`, `full`; default `md`), `placement`
  (`center`, `top`, `bottom`; default `center`), and `scroll-behavior` (`outside`, `inside`;
  default `outside`), rendered as `data-size`, `data-placement`, and `data-scroll-behavior`.
  `inside` caps the content at the viewport height and scrolls `DialogBody`.
- `DialogCloseIcon` renders `CloseButton` inside Ark `CloseTrigger` and defaults its `aria-label` to
  `a11yLabels.closeDialog` ("Close dialog"); pass `aria-label` to replace it.
- `DialogContext` exposes the dialog API through its default scoped slot.

## Preservation notes

- Keep Ark props, emits, and detail objects transparent. Props are declared only where moduix
  changes a default or adds a prop, so Boolean props such as `as-child` and `modal` keep Vue's
  Boolean casting.
- Native `DialogTrigger` and `DialogCloseTrigger` buttons are unstyled; compose them with `as-child`
  and `Button`.
- Keep consumer classes last and attrs on the rendered host. Refs on parts expose the rendered host
  through `$el`.
- Keep the root mounted while changing open state so Escape dismissal, focus restoration, and exit
  animations run.

## Styling and accessibility

Ark owns focus trapping, Escape and outside dismissal, scroll locking, nested layers, and ARIA
wiring. Render `DialogTitle` or give the root an `aria-label`.

The positioner centers content with `place-items: safe center` and scrolls tall content; content has
no `max-height` unless `scroll-behavior="inside"` is set. `DialogTitle` keeps clear of
`DialogCloseIcon`, `DialogFooter` wraps actions, `DialogDescription` is muted, and `DialogBody`
inherits the content color. Content and backdrop animations use the shared foundation keyframes and
are disabled under reduced motion; Ark presence completes the exit at once.

Styles come from foundation tokens. The only public variable is `--moduix-dialog-width`; content
motion reads the shared `--moduix-popup-motion-*` variables, and the backdrop reads
`--moduix-backdrop-bg` and `--moduix-backdrop-filter`.

## Local changelog

- 2026-10-15: Public CSS variables went from 45 to `--moduix-dialog-width` only; `DialogHeader` is
  a plain stack.
- 2026-10-13: Added this file. Added `size`, `placement`, and `scroll-behavior` to `DialogContent`,
  removed native trigger styling, made `DialogBody` inherit the content color, and moved the
  `DialogCloseIcon` default label to `a11yLabels`.