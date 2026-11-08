<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import { Stack } from '@moduix/svelte/stack';
  import { ToastToaster, createToaster } from '@moduix/svelte/toast';

  const durations = [
    { label: '1s', value: 1000 },
    { label: '3s', value: 3000 },
    { label: '5s', value: 5000 },
    { label: 'Permanent', value: Infinity },
  ];
  const toaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 16 });
</script>

<Stack align="center" gap="3">
  <ToastToaster {toaster} />
  {#each durations as duration (duration.label)}
    <Button
      onclick={() =>
        toaster.info({
          title: 'Reminder set',
          description:
            duration.value === Infinity
              ? 'This notification will stay until dismissed.'
              : `This notification will disappear in ${duration.label}.`,
          duration: duration.value,
        })}
    >
      {duration.label}
    </Button>
  {/each}
</Stack>