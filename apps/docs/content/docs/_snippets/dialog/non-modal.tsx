/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Button, Dialog } from '@moduix/react';

export function NonModalDialogDemo() {
  return (
    <Dialog modal={false}>
      <Dialog.Trigger asChild>
        <Button>Open non-modal dialog</Button>
      </Dialog.Trigger>
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Title>Non-modal dialog</Dialog.Title>
          <Dialog.Description>The page remains interactive.</Dialog.Description>
          <Dialog.CloseIcon />
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog>
  );
}

//#endregion