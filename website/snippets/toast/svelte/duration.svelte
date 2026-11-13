<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import { ToastToaster, createToaster } from '@moduix/svelte/toast';
  import styles from '@/components/examples/toast/toast-options.module.css';

  const durations = [
    { label: '1s', value: 1000 },
    { label: '3s', value: 3000 },
    { label: '5s', value: 5000 },
    { label: 'Permanent', value: Infinity },
  ];

  const toaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 16 });
  let duration = $state(durations[2]!);
  const showToast = () =>
    toaster.info({
      title: 'Reminder set',
      description:
        duration.value === Infinity
          ? 'This notification will stay until dismissed.'
          : `This notification will disappear in ${duration.label}.`,
      duration: duration.value,
    });
</script>

<div class={styles.root}>
  <ToastToaster {toaster} />
  <div data-preview-meta>
    <output>Duration: {duration.label}</output>
    {#each durations as item (item.label)}
      <Button
        variant={item.label === duration.label ? 'default' : 'outline'}
        onclick={() => (duration = item)}
      >
        {item.label}
      </Button>
    {/each}
    <Button onclick={showToast}>Show toast</Button>
  </div>
</div>