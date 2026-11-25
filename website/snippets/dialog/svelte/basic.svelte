<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    Dialog,
    DialogCloseIcon,
    DialogDescription,
    DialogHeader,
    DialogPanel,
    DialogTitle,
    DialogTrigger,
  } from '@moduix/svelte/dialog';
</script>

<Dialog>
  <DialogTrigger>
    {#snippet asChild(props)}<Button {...props()}>View notifications</Button>{/snippet}
  </DialogTrigger>
  <DialogPanel>
    <DialogHeader>
      <DialogTitle>Notifications</DialogTitle>
      <DialogCloseIcon />
      <DialogDescription>You are all caught up. Good job!</DialogDescription>
    </DialogHeader>
  </DialogPanel>
</Dialog>