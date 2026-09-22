import { Button } from '@moduix/solid/button';
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
} from '@moduix/solid/dialog';
import { Field, FieldLabel } from '@moduix/solid/field';
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
                  value={formContent()}
                  onInput={(event) => setFormContent(event.currentTarget.value)}
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
              <DialogCloseTrigger
                asChild={(props) => (
                  <Button {...props()} variant="outline">
                    Keep editing
                  </Button>
                )}
              />
              <Button onClick={handleDiscard}>Discard</Button>
            </DialogFooter>
          </DialogContent>
        </DialogPositioner>
      </DialogRootProvider>
    </>
  );
}