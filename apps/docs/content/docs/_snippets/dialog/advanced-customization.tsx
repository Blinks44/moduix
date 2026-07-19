/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Button, Dialog } from '@moduix/react';

export function AdvancedCustomizationDialogDemo() {
  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button>Open custom dialog</Button>
      </Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Title>Custom content layout</Dialog.Title>
          <Dialog.Description>
            Compose the Ark parts directly when the layout helpers do not fit.
          </Dialog.Description>
          <Dialog.CloseTrigger asChild>
            <Button variant="outline">Close</Button>
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog>
  );
}

//#endregion