<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    DialogBackdrop,
    DialogCloseIcon,
    DialogContext,
    DialogContent,
    DialogDescription,
    DialogPositioner,
    DialogRootProvider,
    DialogTitle,
    useDialog,
  } from '@moduix/svelte/dialog';

  const id = $props.id();

  const dialog = useDialog({ id });
</script>

<Button onclick={() => dialog().setOpen(true)}>
  Dialog is {dialog().open ? 'open' : 'closed'}
</Button>
<DialogRootProvider value={dialog}>
  <DialogBackdrop />
  <DialogPositioner>
    <DialogContent>
      <DialogTitle>Status</DialogTitle>
      <DialogDescription>
        <DialogContext>
          {#snippet render(context)}
            Dialog is {context().open ? 'open' : 'closed'}
          {/snippet}
        </DialogContext>
      </DialogDescription>
      <DialogCloseIcon />
    </DialogContent>
  </DialogPositioner>
</DialogRootProvider>