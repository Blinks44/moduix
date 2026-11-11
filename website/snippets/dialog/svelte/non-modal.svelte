<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    Dialog,
    DialogCloseIcon,
    DialogContent,
    DialogDescription,
    DialogPositioner,
    DialogTitle,
    DialogTrigger,
  } from '@moduix/svelte/dialog';
</script>

<Dialog modal={false}>
  <DialogTrigger>
    {#snippet asChild(props)}<Button {...props()}>Open non-modal dialog</Button>{/snippet}
  </DialogTrigger>
  <DialogPositioner>
    <DialogContent>
      <DialogTitle>Non-modal dialog</DialogTitle>
      <DialogDescription>The page remains interactive.</DialogDescription>
      <DialogCloseIcon />
    </DialogContent>
  </DialogPositioner>
</Dialog>