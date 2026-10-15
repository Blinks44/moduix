# Dialog (Solid)

`Dialog` is a styled Ark UI modal, non-modal, and alert-dialog surface. The Solid adapter
preserves the React component's explicit anatomy, callbacks, focus behavior, lifecycle, portal
placement, runtime state, and CSS hooks.

## Composition

```tsx
<Dialog>
  <DialogTrigger asChild={(props) => <Button {...props()}>Open dialog</Button>} />
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
        <DialogCloseTrigger asChild={(props) => <Button {...props()}>Close</Button>} />
      </DialogFooter>
    </DialogContent>
  </DialogPositioner>
</Dialog>
```

`Backdrop` and `Positioner` are portalled by
default; use `portalled={false}` or `portalRef` on the root to control overlay placement.
`lazyMount` and `unmountOnExit` default to `true`.

## API surface

The adapter exports `Dialog`, `useDialog`, and `useDialogContext`, together with the flat values
`DialogRootProvider`, `DialogContext`, `DialogTrigger`, `DialogBackdrop`, `DialogPositioner`,
`DialogContent`, `DialogTitle`, `DialogDescription`, `DialogCloseTrigger`, `DialogCloseIcon`,
`DialogHeader`, `DialogBody`, and `DialogFooter`.

`DialogRootProvider` receives the accessor returned by `useDialog()`:

```tsx
const dialog = useDialog();

<DialogRootProvider value={dialog}>
  <DialogPositioner>
    <DialogContent>
      <DialogTitle>Preferences</DialogTitle>
    </DialogContent>
  </DialogPositioner>
</DialogRootProvider>;
```

Ark owns open state, focus management, dismissal, IDs, state attributes, and runtime CSS
variables. Callback handlers receive Ark detail objects, including `details.open`.

## Solid composition notes

Ark Solid uses render-function `asChild`:
`asChild={(props) => <button {...props()} type="button" />}`. Its factory does not forward `ref`
through `asChild`, so ordinary refs and custom-host composition are supported as separate native
paths. `DialogCloseIcon` composes `CloseButton` through the same native render-function
contract and defaults its accessible label to `Close dialog`.

## Styling contract

Content shares the `--moduix-z-popup` base and adds Ark `--layer-index`. Positioner and backdrop use
Ark's mirrored `--z-index`; the backdrop sits one level below. Customize stacking on content.

The positioner centers content with `place-items: safe center` and scrolls when content is taller
than the viewport; content has no `max-height`. `DialogTitle` reserves inline-end space when
`DialogCloseIcon` is present, and `DialogFooter` wraps actions that do not fit on one line.

`DialogContent` accepts `size` (`sm`, `md`, `lg`, `xl`, `full`; default `md`), `placement`
(`center`, `top`, `bottom`; default `center`), and `scrollBehavior` (`outside`, `inside`; default
`outside`). They render as `data-size`, `data-placement`, and `data-scroll-behavior`, and their
types are exported as `DialogSize`, `DialogPlacement`, and `DialogScrollBehavior`. `inside` caps
the content at the viewport height and scrolls `DialogBody`.

Native `DialogTrigger` and `DialogCloseTrigger` buttons are unstyled; use `asChild` with `Button`.
`DialogBody` inherits the content color; only `DialogDescription` is muted.

Styles come from foundation tokens. The only public variable is `--moduix-dialog-width`; content
motion reads the shared `--moduix-popup-motion-*` variables, and the backdrop reads
`--moduix-backdrop-bg` and `--moduix-backdrop-filter`. See the React `dialog.md` for the full
contract.