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

`Dialog` and `Dialog` are equivalent roots. `Backdrop` and `Positioner` are portalled by
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