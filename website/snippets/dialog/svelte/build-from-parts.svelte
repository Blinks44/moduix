<script lang="ts">
  import { X as XIcon } from '@lucide/svelte';
  import { Button } from '@moduix/svelte/button';
  import { CloseButton } from '@moduix/svelte/close-button';
  import {
    Dialog,
    DialogBackdrop,
    DialogCloseTrigger,
    DialogContent,
    DialogDescription,
    DialogPositioner,
    DialogTitle,
    DialogTrigger,
  } from '@moduix/svelte/dialog';
  import { Stack } from '@moduix/svelte/stack';
  import styles from '@/components/examples/dialog/dialog-build-from-parts.module.css';
</script>

<Dialog>
  <DialogTrigger>
    {#snippet asChild(props)}<Button {...props()}>View notifications</Button>{/snippet}
  </DialogTrigger>
  <DialogBackdrop />
  <DialogPositioner>
    <DialogContent>
      <Stack gap="1">
        <DialogTitle class={styles.title}>Notifications</DialogTitle>
        <DialogCloseTrigger>
          {#snippet asChild(props)}
            <CloseButton {...props()} aria-label="Close dialog" class={styles.closeButton}>
              <XIcon strokeWidth={3} />
            </CloseButton>
          {/snippet}
        </DialogCloseTrigger>
        <DialogDescription>You are all caught up. Good job!</DialogDescription>
      </Stack>
    </DialogContent>
  </DialogPositioner>
</Dialog>