<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import { Stack } from '@moduix/svelte/stack';
  import { ToastToaster, createToaster } from '@moduix/svelte/toast';

  const types = ['info', 'success', 'warning', 'error'] as const;
  const toaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 16 });
</script>

<Stack align="center" gap="3">
  <ToastToaster {toaster} />
  {#each types as type (type)}
    <Button
      onclick={() =>
        toaster.create({
          title: type === 'info' ? 'Update available' : `${type} toast`,
          description: `This notification uses the ${type} status style.`,
          type,
        })}
    >
      {type}
    </Button>
  {/each}
</Stack>