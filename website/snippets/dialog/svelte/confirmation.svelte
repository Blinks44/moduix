<script lang="ts">
  import { Button } from '@moduix/svelte/button';
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
  } from '@moduix/svelte/dialog';
  import { Field, FieldLabel } from '@moduix/svelte/field';

  const id = $props.id();

  let formContent = $state('');
  let open = $state(false);
  const confirmDialog = useDialog({ id: `${id}-confirm` });
  const parentDialog = useDialog(() => ({
    id: `${id}-parent`,
    open,
    onOpenChange(details) {
      if (!details.open && formContent.trim()) {
        confirmDialog().setOpen(true);
        return;
      }
      open = details.open;
    },
  }));

  const handleDiscard = () => {
    formContent = '';
    confirmDialog().setOpen(false);
    open = false;
  };
</script>

<Button onclick={() => (open = true)}>Open form</Button>

<DialogRootProvider value={parentDialog}>
  <DialogBackdrop />
  <DialogPositioner>
    <DialogContent>
      <DialogTitle>Edit content</DialogTitle>
      <DialogCloseIcon />
      <DialogDescription>Unsaved changes ask for confirmation before closing.</DialogDescription>
      <DialogBody>
        <Field>
          <FieldLabel>Content</FieldLabel>
          <textarea bind:value={formContent} placeholder="Enter some text..." rows="4"></textarea>
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
        <DialogCloseTrigger>
          {#snippet asChild(props)}<Button {...props()} variant="outline">Keep editing</Button
            >{/snippet}
        </DialogCloseTrigger>
        <Button onclick={handleDiscard}>Discard</Button>
      </DialogFooter>
    </DialogContent>
  </DialogPositioner>
</DialogRootProvider>