import { Button } from '@moduix/solid/button';
import {
  Dialog,
  DialogCloseIcon,
  DialogDescription,
  DialogHeader,
  DialogPanel,
  DialogTitle,
  DialogTrigger,
} from '@moduix/solid/dialog';

export default function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild={(props) => <Button {...props()}>View notifications</Button>} />
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