<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    Dialog,
    DialogBackdrop,
    DialogCloseIcon,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogPositioner,
    DialogTitle,
    DialogTrigger,
  } from '@moduix/svelte/dialog';
</script>

<Dialog>
  <DialogTrigger>
    {#snippet asChild(props)}<Button {...props()}>View notifications</Button>{/snippet}
  </DialogTrigger>
  <DialogBackdrop />
  <DialogPositioner>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Notifications</DialogTitle>
        <DialogCloseIcon />
        <DialogDescription>You are all caught up. Good job!</DialogDescription>
      </DialogHeader>
    </DialogContent>
  </DialogPositioner>
</Dialog>