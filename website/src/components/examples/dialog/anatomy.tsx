import { Button } from '@moduix/react/button';
import {
  Dialog,
  DialogBackdrop,
  DialogBody,
  DialogCloseIcon,
  DialogCloseTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPositioner,
  DialogTitle,
  DialogTrigger,
} from '@moduix/react/dialog';
import { Textarea } from '@moduix/react/textarea';

// Anatomy scene: the dialog stays open and inline so every part can be outlined.
export default function DialogAnatomy() {
  return (
    <div style={{ minHeight: 360, width: '100%' }}>
      <Dialog open modal={false} portalled={false}>
        <DialogTrigger asChild>
          <Button variant="outline">Open form</Button>
        </DialogTrigger>
        <DialogBackdrop />
        <DialogPositioner>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit content</DialogTitle>
              <DialogCloseIcon />
              <DialogDescription>
                Unsaved changes ask for confirmation before closing.
              </DialogDescription>
            </DialogHeader>
            <DialogBody>
              <Textarea aria-label="Content" placeholder="Enter some text..." />
            </DialogBody>
            <DialogFooter>
              <DialogCloseTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </DialogCloseTrigger>
              <Button>Save</Button>
            </DialogFooter>
          </DialogContent>
        </DialogPositioner>
      </Dialog>
    </div>
  );
}