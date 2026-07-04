/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Button, Dialog } from '@moduix/react';

export function DialogDemo() {
  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button>View notifications</Button>
      </Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Notifications</Dialog.Title>
            <Dialog.CloseIcon />
            <Dialog.Description>You are all caught up. Good job!</Dialog.Description>
          </Dialog.Header>
          <Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <Button variant="outline">Close</Button>
            </Dialog.CloseTrigger>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog>
  );
}

//#endregion