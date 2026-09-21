import { Button } from '@moduix/react/button';
import {
  Dialog,
  DialogBackdrop,
  DialogCloseTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogPositioner,
  DialogTitle,
} from '@moduix/react/dialog';
import { Menu } from '@moduix/react/menu';
import { useState } from 'react';

export default function OpenFromMenuDialogDemo() {
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
            <Menu.Viewport>
              <Menu.Item value="edit">Edit</Menu.Item>
              <Menu.Item value="duplicate">Duplicate</Menu.Item>
              <Menu.Item value="delete" tone="destructive" onClick={() => setOpen(true)}>
                Delete...
              </Menu.Item>
            </Menu.Viewport>
          </Menu.Content>
        </Menu.Positioner>
      </Menu>

      <Dialog open={open} onOpenChange={(details) => setOpen(details.open)} role="alertdialog">
        <DialogBackdrop />
        <DialogPositioner>
          <DialogContent>
            <DialogTitle>Confirm delete</DialogTitle>
            <DialogDescription>This action cannot be undone.</DialogDescription>
            <DialogFooter>
              <DialogCloseTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </DialogCloseTrigger>
              <Button onClick={() => setOpen(false)}>Delete</Button>
            </DialogFooter>
          </DialogContent>
        </DialogPositioner>
      </Dialog>
    </>
  );
}