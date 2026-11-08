<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    Dialog,
    DialogBackdrop,
    DialogBody,
    DialogCloseIcon,
    DialogContent,
    DialogHeader,
    DialogPositioner,
    DialogTitle,
    DialogTrigger,
    type DialogSize,
  } from '@moduix/svelte/dialog';
  import { Stack } from '@moduix/svelte/stack';

  const sizes: DialogSize[] = ['sm', 'md', 'lg', 'xl', 'full'];
</script>

<Stack direction="row" wrap="wrap" gap="2">
  {#each sizes as size (size)}
    <Dialog>
      <DialogTrigger>
        {#snippet asChild(props)}<Button {...props()} variant="outline">Open {size}</Button
          >{/snippet}
      </DialogTrigger>
      <DialogBackdrop />
      <DialogPositioner>
        <DialogContent {size}>
          <DialogHeader>
            <DialogTitle>Size {size}</DialogTitle>
            <DialogCloseIcon />
          </DialogHeader>
          <DialogBody>
            The size prop picks a width preset. The full size covers the viewport.
          </DialogBody>
        </DialogContent>
      </DialogPositioner>
    </Dialog>
  {/each}
</Stack>