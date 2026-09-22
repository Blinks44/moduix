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
import {
  Menu,
  MenuTrigger,
  MenuIndicator,
  MenuPositioner,
  MenuContent,
  MenuViewport,
  MenuItem,
} from '@moduix/react/menu';
import { useState } from 'react';

export default function OpenFromMenuDialogDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Menu>
        <MenuTrigger asChild>
          <Button variant="outline">
            Actions
            <MenuIndicator />
          </Button>
        </MenuTrigger>
        <MenuPositioner>
          <MenuContent>
            <MenuViewport>
              <MenuItem value="edit">Edit</MenuItem>
              <MenuItem value="duplicate">Duplicate</MenuItem>
              <MenuItem value="delete" tone="destructive" onClick={() => setOpen(true)}>
                Delete...
              </MenuItem>
            </MenuViewport>
          </MenuContent>
        </MenuPositioner>
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