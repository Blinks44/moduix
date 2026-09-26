import { Button } from '@moduix/react/button';
import {
  Dialog,
  DialogCloseIcon,
  DialogContent,
  DialogDescription,
  DialogPositioner,
  DialogTitle,
  DialogTrigger,
} from '@moduix/react/dialog';

export default function NonModalDialogDemo() {
  return (
    <Dialog modal={false}>
      <DialogTrigger asChild>
        <Button>Open non-modal dialog</Button>
      </DialogTrigger>
      <DialogPositioner>
        <DialogContent>
          <DialogTitle>Non-modal dialog</DialogTitle>
          <DialogDescription>The page remains interactive.</DialogDescription>
          <DialogCloseIcon />
        </DialogContent>
      </DialogPositioner>
    </Dialog>
  );
}