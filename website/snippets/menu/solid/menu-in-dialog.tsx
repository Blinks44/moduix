import { Button } from '@moduix/solid/button';
import { Dialog } from '@moduix/solid/dialog';
import { Menu } from '@moduix/solid/menu';

export default function MenuInDialogDemo() {
  return (
    <Dialog>
      <Dialog.Trigger asChild={(props) => <Button {...props()}>Open dialog</Button>} />
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Project settings</Dialog.Title>
            <Dialog.CloseIcon />
            <Dialog.Description>Choose an action without leaving the dialog.</Dialog.Description>
          </Dialog.Header>
          <div>
            <Menu portalled={false} positioning={{ strategy: 'fixed', hideWhenDetached: true }}>
              <Menu.Trigger asChild={(props) => <Button {...props()} variant="outline" />}>
                Actions
                <Menu.Indicator />
              </Menu.Trigger>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Viewport>
                    <Menu.Item value="rename">Rename project</Menu.Item>
                    <Menu.Item value="duplicate">Duplicate project</Menu.Item>
                    <Menu.Item value="move">Move to folder</Menu.Item>
                    <Menu.Separator />
                    <Menu.Item value="archive" tone="destructive">
                      Archive project
                    </Menu.Item>
                  </Menu.Viewport>
                </Menu.Content>
              </Menu.Positioner>
            </Menu>
          </div>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog>
  );
}