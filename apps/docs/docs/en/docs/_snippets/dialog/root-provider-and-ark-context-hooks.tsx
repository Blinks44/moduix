import { Button, Dialog, useDialog } from '@moduix/react';
export default function DialogStateDemo() {
  const dialog = useDialog();
  return (
    <>
      <Button onClick={() => dialog.setOpen(true)}>
        Dialog is {dialog.open ? 'open' : 'closed'}
      </Button>
      <Dialog.RootProvider value={dialog}>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Title>Status</Dialog.Title>
            <Dialog.Description>
              <Dialog.Context>
                {(dialog) => <>Dialog is {dialog.open ? 'open' : 'closed'}</>}
              </Dialog.Context>
            </Dialog.Description>
            <Dialog.CloseIcon />
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.RootProvider>
    </>
  );
}