import { Button } from '@moduix/react/button';
import { Dialog } from '@moduix/react/dialog';

export default function DeleteAccountDialog() {
  return (
    <Dialog role="alertdialog">
      <Dialog.Trigger asChild>
        <Button>Delete account</Button>
      </Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Title>Are you absolutely sure?</Dialog.Title>
          <Dialog.Description>This action cannot be undone.</Dialog.Description>
          <Dialog.Footer>
            <Dialog.CloseTrigger asChild id="cancel-delete-account">
              <Button variant="outline">Cancel</Button>
            </Dialog.CloseTrigger>
            <Dialog.CloseTrigger asChild id="confirm-delete-account">
              <Button>Delete account</Button>
            </Dialog.CloseTrigger>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog>
  );
}