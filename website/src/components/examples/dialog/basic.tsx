import { Button } from '@moduix/react/button';
import {
  Dialog,
  DialogCloseIcon,
  DialogDescription,
  DialogHeader,
  DialogPanel,
  DialogTitle,
  DialogTrigger,
} from '@moduix/react/dialog';

export default function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>View notifications</Button>
      </DialogTrigger>
      <DialogPanel>
        <DialogHeader>
          <DialogTitle>Notifications</DialogTitle>
          <DialogCloseIcon />
          <DialogDescription>You are all caught up. Good job!</DialogDescription>
        </DialogHeader>
      </DialogPanel>
    </Dialog>
  );
}