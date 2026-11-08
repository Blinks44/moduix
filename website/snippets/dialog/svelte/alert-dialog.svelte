<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    Dialog,
    DialogBackdrop,
    DialogCloseTrigger,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogPositioner,
    DialogTitle,
    DialogTrigger,
  } from '@moduix/svelte/dialog';
</script>

<Dialog role="alertdialog">
  <DialogTrigger>
    {#snippet asChild(props)}<Button {...props()}>Delete account</Button>{/snippet}
  </DialogTrigger>
  <DialogBackdrop />
  <DialogPositioner>
    <DialogContent>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>This action cannot be undone.</DialogDescription>
      <DialogFooter>
        <DialogCloseTrigger>
          {#snippet asChild(props)}
            <Button {...props()} id="cancel-delete-account" variant="outline">Cancel</Button>
          {/snippet}
        </DialogCloseTrigger>
        <DialogCloseTrigger>
          {#snippet asChild(props)}
            <Button {...props()} id="confirm-delete-account">Delete account</Button>
          {/snippet}
        </DialogCloseTrigger>
      </DialogFooter>
    </DialogContent>
  </DialogPositioner>
</Dialog>