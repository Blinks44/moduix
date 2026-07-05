/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { useDialog, useDialogContext } from '@ark-ui/react/dialog';
import { Button, Dialog } from '@moduix/react';

function DialogStatusText() {
  const dialog = useDialogContext();
  return <>Dialog is {dialog.open ? 'open' : 'closed'}</>;
}
export function DialogStateDemo() {
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

//#endregion