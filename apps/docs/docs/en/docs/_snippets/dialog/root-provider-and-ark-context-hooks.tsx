import { Button, Dialog, useDialog, useDialogContext } from '@moduix/react';

function DialogStatusText() {
  const dialog = useDialogContext();
  return <>Dialog is {dialog.open ? 'open' : 'closed'}</>;
}
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
              <DialogStatusText />
            </Dialog.Description>
            <Dialog.CloseIcon />
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.RootProvider>
    </>
  );
}