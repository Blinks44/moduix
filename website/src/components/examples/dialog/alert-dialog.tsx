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
  DialogTrigger,
} from '@moduix/react/dialog';

export default function DeleteAccountDialog() {
  return (
    <Dialog role="alertdialog">
      <DialogTrigger asChild>
        <Button>Delete account</Button>
      </DialogTrigger>
      <DialogBackdrop />
      <DialogPositioner>
        <DialogContent>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
          <DialogFooter>
            <DialogCloseTrigger asChild id="cancel-delete-account">
              <Button variant="outline">Cancel</Button>
            </DialogCloseTrigger>
            <DialogCloseTrigger asChild id="confirm-delete-account">
              <Button>Delete account</Button>
            </DialogCloseTrigger>
          </DialogFooter>
        </DialogContent>
      </DialogPositioner>
    </Dialog>
  );
}