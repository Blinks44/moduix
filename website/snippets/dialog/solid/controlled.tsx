import { Button } from '@moduix/solid/button';
import { Dialog } from '@moduix/solid/dialog';
import { createSignal } from 'solid-js';

export default function ControlledDialogDemo() {
  const [open, setOpen] = createSignal(false);

  return (
    <Dialog open={open()} onOpenChange={(details) => setOpen(details.open)}>
      <Dialog.Trigger asChild={(props) => <Button {...props()}>Open controlled dialog</Button>} />
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Title>Publish changes?</Dialog.Title>
          <Dialog.CloseIcon />
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog>
  );
}