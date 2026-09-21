import { Button } from '@moduix/solid/button';
import {
  Dialog,
  DialogBackdrop,
  DialogCloseIcon,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogPositioner,
  DialogTitle,
  DialogTrigger,
} from '@moduix/solid/dialog';

export default function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild={(props) => <Button {...props()}>View notifications</Button>} />
      <DialogBackdrop />
      <DialogPositioner>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Notifications</DialogTitle>
            <DialogCloseIcon />
            <DialogDescription>You are all caught up. Good job!</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </DialogPositioner>
    </Dialog>
  );
}