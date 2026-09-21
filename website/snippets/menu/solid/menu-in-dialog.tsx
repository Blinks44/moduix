import { Button } from '@moduix/solid/button';
import {
  Dialog,
  DialogBackdrop,
  DialogCloseIcon,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogPositioner,
  DialogTitle,
  DialogTrigger,
} from '@moduix/solid/dialog';
import { Menu } from '@moduix/solid/menu';

export default function MenuInDialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild={(props) => <Button {...props()}>Open dialog</Button>} />
      <DialogBackdrop />
      <DialogPositioner>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Project settings</DialogTitle>
            <DialogCloseIcon />
            <DialogDescription>Choose an action without leaving the dialog.</DialogDescription>
          </DialogHeader>
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
        </DialogContent>
      </DialogPositioner>
    </Dialog>
  );
}