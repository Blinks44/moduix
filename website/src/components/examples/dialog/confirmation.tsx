import { Button } from '@moduix/react/button';
import {
  DialogBackdrop,
  DialogBody,
  DialogCloseIcon,
  DialogCloseTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogPositioner,
  DialogRootProvider,
  DialogTitle,
  useDialog,
} from '@moduix/react/dialog';
import { Field, FieldLabel } from '@moduix/react/field';
import { Textarea } from '@moduix/react/textarea';
import { useState } from 'react';

export default function ConfirmationDialogDemo() {
  const [formContent, setFormContent] = useState('');
  const [open, setOpen] = useState(false);
  const confirmDialog = useDialog();
  const parentDialog = useDialog({
    open,
    onOpenChange(details) {
      if (!details.open && formContent.trim()) {
        confirmDialog.setOpen(true);
        return;
      }
      setOpen(details.open);
    },
  });
  const handleDiscard = () => {
    setFormContent('');
    confirmDialog.setOpen(false);
    setOpen(false);
  };
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open form</Button>

      <DialogRootProvider value={parentDialog}>
        <DialogBackdrop />
        <DialogPositioner>
          <DialogContent>
            <DialogTitle>Edit content</DialogTitle>
            <DialogCloseIcon />
            <DialogDescription>
              Unsaved changes ask for confirmation before closing.
            </DialogDescription>
            <DialogBody>
              <Field>
                <FieldLabel>Content</FieldLabel>
                <Textarea
                  value={formContent}
                  onChange={(event) => setFormContent(event.currentTarget.value)}
                  placeholder="Enter some text..."
                  rows={4}
                />
              </Field>
            </DialogBody>
          </DialogContent>
        </DialogPositioner>
      </DialogRootProvider>

      <DialogRootProvider value={confirmDialog}>
        <DialogBackdrop />
        <DialogPositioner>
          <DialogContent>
            <DialogTitle>Discard changes?</DialogTitle>
            <DialogDescription>You have unsaved changes.</DialogDescription>
            <DialogFooter>
              <DialogCloseTrigger asChild>
                <Button variant="outline">Keep editing</Button>
              </DialogCloseTrigger>
              <Button onClick={handleDiscard}>Discard</Button>
            </DialogFooter>
          </DialogContent>
        </DialogPositioner>
      </DialogRootProvider>
    </>
  );
}
