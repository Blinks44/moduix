import { Button, Dialog } from '@moduix/react';

export default function DialogDemo() {
  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button>View notifications</Button>
      </Dialog.Trigger>
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