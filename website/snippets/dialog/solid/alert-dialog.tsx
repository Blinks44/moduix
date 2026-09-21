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
  DialogTrigger,
} from '@moduix/solid/dialog';

export default function DeleteAccountDialog() {
  return (
    <Dialog role="alertdialog">
      <DialogTrigger asChild={(props) => <Button {...props()}>Delete account</Button>} />
      <DialogBackdrop />
      <DialogPositioner>
        <DialogContent>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
          <DialogFooter>
            <DialogCloseTrigger
              asChild={(props) => (
                <Button {...props()} id="cancel-delete-account" variant="outline">
                  Cancel
                </Button>
              )}
            />
            <DialogCloseTrigger
              asChild={(props) => (
                <Button {...props()} id="confirm-delete-account">
                  Delete account
                </Button>
              )}
            />
          </DialogFooter>
        </DialogContent>
      </DialogPositioner>
    </Dialog>
  );
}