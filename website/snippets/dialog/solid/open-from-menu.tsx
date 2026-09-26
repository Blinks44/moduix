import { Button } from '@moduix/solid/button';
import {
  Dialog,
  DialogBackdrop,
  DialogCloseTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogPositioner,
  DialogTitle,
} from '@moduix/solid/dialog';
import {
  Menu,
  MenuTrigger,
  MenuIndicator,
  MenuPositioner,
  MenuContent,
  MenuViewport,
  MenuItem,
} from '@moduix/solid/menu';
import { createSignal } from 'solid-js';

export default function OpenFromMenuDialogDemo() {
  const [open, setOpen] = createSignal(false);

  return (
    <>
      <Menu onSelect={(details) => details.value === 'delete' && setOpen(true)}>
        <MenuTrigger
          asChild={(props) => (
            <Button {...props()} variant="outline">
              Actions
              <MenuIndicator />
            </Button>
          )}
        />
        <MenuPositioner>
          <MenuContent>
            <MenuViewport>
              <MenuItem value="edit">Edit</MenuItem>
              <MenuItem value="duplicate">Duplicate</MenuItem>
              <MenuItem value="delete" tone="destructive">
                Delete...
              </MenuItem>
            </MenuViewport>
          </MenuContent>
        </MenuPositioner>
      </Menu>

      <Dialog open={open()} onOpenChange={(details) => setOpen(details.open)} role="alertdialog">
        <DialogBackdrop />
        <DialogPositioner>
          <DialogContent>
            <DialogTitle>Confirm delete</DialogTitle>
            <DialogDescription>This action cannot be undone.</DialogDescription>
            <DialogFooter>
              <DialogCloseTrigger
                asChild={(props) => (
                  <Button {...props()} variant="outline">
                    Cancel
                  </Button>
                )}
              />
              <Button onClick={() => setOpen(false)}>Delete</Button>
            </DialogFooter>
          </DialogContent>
        </DialogPositioner>
      </Dialog>
    </>
  );
}