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
import { Menu, MenuTrigger, MenuIndicator, MenuPositioner, MenuContent, MenuViewport, MenuItem, MenuSeparator } from '@moduix/solid/menu';

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
              <MenuTrigger asChild={(props) => <Button {...props()} variant="outline" />}>
                Actions
                <MenuIndicator />
              </MenuTrigger>
              <MenuPositioner>
                <MenuContent>
                  <MenuViewport>
                    <MenuItem value="rename">Rename project</MenuItem>
                    <MenuItem value="duplicate">Duplicate project</MenuItem>
                    <MenuItem value="move">Move to folder</MenuItem>
                    <MenuSeparator />
                    <MenuItem value="archive" tone="destructive">
                      Archive project
                    </MenuItem>
                  </MenuViewport>
                </MenuContent>
              </MenuPositioner>
            </Menu>
          </div>
        </DialogContent>
      </DialogPositioner>
    </Dialog>
  );
}
