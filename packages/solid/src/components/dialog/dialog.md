# Dialog (Solid)

`Dialog` is a styled Ark UI modal, non-modal, and alert-dialog surface. The Solid adapter
preserves the React component's explicit anatomy, callbacks, focus behavior, lifecycle, portal
placement, runtime state, and CSS hooks.

## Composition

```tsx
<Dialog>
  <Dialog.Trigger asChild={(props) => <Button {...props()}>Open dialog</Button>} />
  <Dialog.Backdrop />
  <Dialog.Positioner>
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>Notifications</Dialog.Title>
        <Dialog.CloseIcon />
        <Dialog.Description>You are all caught up.</Dialog.Description>
      </Dialog.Header>
      <Dialog.Body>Content</Dialog.Body>
      <Dialog.Footer>
        <Dialog.CloseTrigger asChild={(props) => <Button {...props()}>Close</Button>} />
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Positioner>
</Dialog>
```

`Dialog` and `Dialog.Root` are equivalent roots. `Backdrop` and `Positioner` are portalled by
default; use `portalled={false}` or `portalRef` on the root to control overlay placement.
`lazyMount` and `unmountOnExit` default to `true`.

## API surface

The adapter exports `Dialog`, `useDialog`, and `useDialogContext`. `Dialog` exposes `Root`,
`RootProvider`, `Context`, `Trigger`, `Backdrop`, `Positioner`, `Content`, `Title`, `Description`,
`CloseTrigger`, `CloseIcon`, `Header`, `Body`, and `Footer`.

`Dialog.RootProvider` receives the accessor returned by `useDialog()`:

```tsx
const dialog = useDialog();

<Dialog.RootProvider value={dialog}>
  <Dialog.Positioner>
    <Dialog.Content>
      <Dialog.Title>Preferences</Dialog.Title>
    </Dialog.Content>
  </Dialog.Positioner>
</Dialog.RootProvider>;
```

Ark owns open state, focus management, dismissal, IDs, state attributes, and runtime CSS
variables. Callback handlers receive Ark detail objects, including `details.open`.

## Solid composition notes

Ark Solid uses render-function `asChild`:
`asChild={(props) => <button {...props()} type="button" />}`. Its factory does not forward `ref`
through `asChild`, so ordinary refs and custom-host composition are supported as separate native
paths. `Dialog.CloseIcon` composes `CloseButton.Root` through the same native render-function
contract and defaults its accessible label to `Close dialog`.