import { Button } from '@moduix/solid/button';
import {
  Dialog,
  DialogBackdrop,
  DialogCloseIcon,
  DialogContent,
  DialogPositioner,
  DialogTitle,
  DialogTrigger,
} from '@moduix/solid/dialog';
import { createSignal } from 'solid-js';

export default function ControlledDialogDemo() {
  const [open, setOpen] = createSignal(false);

  return (
    <Dialog open={open()} onOpenChange={(details) => setOpen(details.open)}>
      <DialogTrigger asChild={(props) => <Button {...props()}>Open controlled dialog</Button>} />
      <DialogBackdrop />
      <DialogPositioner>
        <DialogContent>
          <DialogTitle>Publish changes?</DialogTitle>
          <DialogCloseIcon />
        </DialogContent>
      </DialogPositioner>
    </Dialog>
  );
}