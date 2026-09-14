import { Button } from '@moduix/solid/button';
import { Dialog } from '@moduix/solid/dialog';

export default function DialogDemo() {
  return (
    <Dialog>
      <Dialog.Trigger asChild={(props) => <Button {...props()}>View notifications</Button>} />
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Notifications</Dialog.Title>
            <Dialog.CloseIcon />
            <Dialog.Description>You are all caught up. Good job!</Dialog.Description>
          </Dialog.Header>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog>
  );
}