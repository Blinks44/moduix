import { Button } from '@moduix/solid/button';
import { Dialog } from '@moduix/solid/dialog';

export default function DeleteAccountDialog() {
  return (
    <Dialog role="alertdialog">
      <Dialog.Trigger asChild={(props) => <Button {...props()}>Delete account</Button>} />
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Title>Are you absolutely sure?</Dialog.Title>
          <Dialog.Description>This action cannot be undone.</Dialog.Description>
          <Dialog.Footer>
            <Dialog.CloseTrigger
              asChild={(props) => (
                <Button {...props()} id="cancel-delete-account" variant="outline">
                  Cancel
                </Button>
              )}
            />
            <Dialog.CloseTrigger
              asChild={(props) => (
                <Button {...props()} id="confirm-delete-account">
                  Delete account
                </Button>
              )}
            />
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog>
  );
}