/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Button, Dialog, Menu } from '@moduix/react';

export function MenuInDialogDemo() {
  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button>Open dialog</Button>
      </Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Project settings</Dialog.Title>
            <Dialog.CloseIcon />
            <Dialog.Description>Choose an action without leaving the dialog.</Dialog.Description>
          </Dialog.Header>
          <Menu portalled={false} positioning={{ strategy: 'fixed', hideWhenDetached: true }}>
            <Menu.Trigger asChild>
              <Button variant="outline">
                Actions
                <Menu.Indicator />
              </Button>
            </Menu.Trigger>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item value="rename">Rename project</Menu.Item>
                <Menu.Item value="duplicate">Duplicate project</Menu.Item>
                <Menu.Separator />
                <Menu.Item value="archive" tone="destructive">
                  Archive project
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Menu>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog>
  );
}

//#endregion