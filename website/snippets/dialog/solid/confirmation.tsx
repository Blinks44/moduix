import { Button } from '@moduix/solid/button';
import { Dialog, useDialog } from '@moduix/solid/dialog';
import { Field } from '@moduix/solid/field';
import { Textarea } from '@moduix/solid/textarea';
import { createSignal } from 'solid-js';

export default function ConfirmationDialogDemo() {
  const [formContent, setFormContent] = createSignal('');
  const [open, setOpen] = createSignal(false);
  const confirmDialog = useDialog();
  const parentDialog = useDialog(() => ({
    open: open(),
    onOpenChange(details) {
      if (!details.open && formContent().trim()) {
        confirmDialog().setOpen(true);
        return;
      }
      setOpen(details.open);
    },
  }));
  const handleDiscard = () => {
    setFormContent('');
    confirmDialog().setOpen(false);
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
                <Textarea
                  value={formContent()}
                  onInput={(event) => setFormContent(event.currentTarget.value)}
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
              <Dialog.CloseTrigger
                asChild={(props) => (
                  <Button {...props()} variant="outline">
                    Keep editing
                  </Button>
                )}
              />
              <Button onClick={handleDiscard}>Discard</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.RootProvider>
    </>
  );
}