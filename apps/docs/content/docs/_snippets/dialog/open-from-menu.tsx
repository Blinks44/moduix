/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Button, Dialog, Menu } from '@moduix/react';
import { useState } from 'react';

export function OpenFromMenuDialogDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Menu>
        <Menu.Trigger asChild>
          <Button variant="outline">
            Actions
            <Menu.Indicator />
          </Button>
        </Menu.Trigger>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item value="edit">Edit</Menu.Item>
            <Menu.Item value="duplicate">Duplicate</Menu.Item>
            <Menu.Item value="delete" tone="destructive" onClick={() => setOpen(true)}>
              Delete...
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Menu>

      <Dialog open={open} onOpenChange={(details) => setOpen(details.open)} role="alertdialog">
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Title>Confirm delete</Dialog.Title>
            <Dialog.Description>This action cannot be undone.</Dialog.Description>
            <Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.CloseTrigger>
              <Button>Delete</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog>
    </>
  );
}

//#endregion