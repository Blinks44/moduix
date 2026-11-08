<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import { Stack } from '@moduix/svelte/stack';
  import { ToastToaster, createToaster } from '@moduix/svelte/toast';

  const toaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 24 });
</script>

<Stack align="center" gap="3">
  <ToastToaster {toaster} />
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