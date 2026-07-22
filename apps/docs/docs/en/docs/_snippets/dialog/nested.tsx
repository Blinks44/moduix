import { Button, Dialog, useDialog } from '@moduix/react';

export default function NestedDialogDemo() {
  const parent = useDialog();
  const child = useDialog();
  return (
    <>
      <Button onClick={() => parent.setOpen(true)}>Open parent</Button>
      <Dialog.RootProvider value={parent}>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Title>Parent dialog</Dialog.Title>
            <Button onClick={() => child.setOpen(true)}>Open nested</Button>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.RootProvider>
      <Dialog.RootProvider value={child}>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Title>Nested dialog</Dialog.Title>
            <Dialog.CloseIcon />
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.RootProvider>
    </>
  );
}