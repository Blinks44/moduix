import { Button } from '@moduix/solid/button';
import {
  Dialog,
  DialogCloseIcon,
  DialogContent,
  DialogDescription,
  DialogPositioner,
  DialogTitle,
  DialogTrigger,
} from '@moduix/solid/dialog';

export default function NonModalDialogDemo() {
  return (
    <Dialog modal={false}>
      <DialogTrigger asChild={(props) => <Button {...props()}>Open non-modal dialog</Button>} />
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