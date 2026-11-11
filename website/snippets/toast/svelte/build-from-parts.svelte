<script lang="ts">
  import { X as XIcon } from '@lucide/svelte';
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

  const toaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 24 });
</script>

<Stack align="center" gap="3">
  <ToastToaster {toaster}>
    {#snippet children()}
      <Toast>
        <ToastTitle />
        <ToastDescription />
        <ToastCloseTrigger><XIcon strokeWidth={3} /></ToastCloseTrigger>
      </Toast>
    {/snippet}
  </ToastToaster>
  <Button
    onclick={() =>
      toaster.create({
        title: 'Scheduled for tomorrow',
        description: 'Your meeting has been scheduled for tomorrow at 10am.',
        type: 'info',
      })}
  >
    Schedule meeting
  </Button>
</Stack>