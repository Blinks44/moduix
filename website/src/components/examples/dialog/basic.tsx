import { Button } from '@moduix/react/button';
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
} from '@moduix/react/dialog';

export default function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>View notifications</Button>
      </DialogTrigger>
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