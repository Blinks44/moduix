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
import { Menu } from '@moduix/solid/menu';
import { createSignal } from 'solid-js';

export default function OpenFromMenuDialogDemo() {
  const [open, setOpen] = createSignal(false);

  return (
    <>
      <Menu onSelect={(details) => details.value === 'delete' && setOpen(true)}>
        <Menu.Trigger
          asChild={(props) => (
            <Button {...props()} variant="outline">
              Actions
              <Menu.Indicator />
            </Button>
          )}
        />
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Viewport>
              <Menu.Item value="edit">Edit</Menu.Item>
              <Menu.Item value="duplicate">Duplicate</Menu.Item>
              <Menu.Item value="delete" tone="destructive">
                Delete...
              </Menu.Item>
            </Menu.Viewport>
          </Menu.Content>
        </Menu.Positioner>
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