<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    Dialog,
    DialogBackdrop,
    DialogCloseIcon,
    DialogContent,
    DialogPositioner,
    DialogTitle,
    DialogTrigger,
  } from '@moduix/svelte/dialog';

  let open = $state(false);
</script>

<Dialog bind:open>
  <DialogTrigger>
    {#snippet asChild(props)}<Button {...props()}>Open controlled dialog</Button>{/snippet}
  </DialogTrigger>
  <DialogBackdrop />
  <DialogPositioner>
    <DialogContent>
      <DialogTitle>Publish changes?</DialogTitle>
      <DialogCloseIcon />
    </DialogContent>
  </DialogPositioner>
</Dialog>