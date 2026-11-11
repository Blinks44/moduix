<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import { Stack } from '@moduix/svelte/stack';
  import { ToastToaster, createToaster } from '@moduix/svelte/toast';

  const toaster = createToaster({ placement: 'bottom-end', overlap: false, gap: 16 });
</script>

<Stack align="center" gap="3">
  <ToastToaster {toaster} />
  <Button
    onclick={() =>
      toaster.info({
        title: 'Expanded toast',
        description: 'Each notification remains fully visible in the stack.',
      })}
  >
    Create expanded toast
  </Button>
</Stack>