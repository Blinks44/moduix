<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import { Stack } from '@moduix/svelte/stack';
  import {
    Toast,
    ToastCloseTrigger,
    ToastDescription,
    ToastTitle,
    ToastToaster,
    createToaster,
  } from '@moduix/svelte/toast';
  import styles from '@/components/examples/toast/toast-custom-composition.module.css';

  const toaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 24 });
</script>

<Stack align="center" gap="3">
  <ToastToaster {toaster}>
    {#snippet children()}
      <Toast class={styles.toast}>
        <Stack direction="row" align="flex-start" gap="2">
          <span aria-hidden="true">ⓘ</span>
          <div>
            <ToastTitle />
            <ToastDescription />
          </div>
        </Stack>
        <ToastCloseTrigger aria-label="Close custom toast">×</ToastCloseTrigger>
      </Toast>
    {/snippet}
  </ToastToaster>
  <Button
    onclick={() =>
      toaster.success({
        title: 'Workspace synced',
        description: 'Map edits are available to everyone.',
      })}
  >
    Create custom toast
  </Button>
</Stack>