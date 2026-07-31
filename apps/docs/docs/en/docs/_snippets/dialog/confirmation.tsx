import { Button } from '@moduix/react/button';
import { Dialog, useDialog } from '@moduix/react/dialog';
import { Field } from '@moduix/react/field';
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

      <Dialog.RootProvider value={parentDialog}>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Title>Edit content</Dialog.Title>
            <Dialog.CloseIcon />
            <Dialog.Description>
              Unsaved changes ask for confirmation before closing.
            </Dialog.Description>
            <Dialog.Body>
              <Field>
                <Field.Label>Content</Field.Label>
                <Field.Textarea
                  value={formContent}
                  onChange={(event) => setFormContent(event.currentTarget.value)}
                  placeholder="Enter some text..."
                  rows={4}
                />
              </Field>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.RootProvider>

      <Dialog.RootProvider value={confirmDialog}>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Title>Discard changes?</Dialog.Title>
            <Dialog.Description>You have unsaved changes.</Dialog.Description>
            <Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <Button variant="outline">Keep editing</Button>
              </Dialog.CloseTrigger>
              <Button onClick={handleDiscard}>Discard</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.RootProvider>
    </>
  );
}