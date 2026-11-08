<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import { ToastToaster, createToaster } from '@moduix/svelte/toast';
  import styles from '@/components/examples/toast/toast-placement.module.css';

  const placements = [
    'top-start',
    'top',
    'top-end',
    'bottom-start',
    'bottom',
    'bottom-end',
  ] as const;
  type Placement = (typeof placements)[number];

  const toasters: Record<Placement, ReturnType<typeof createToaster>> = {
    'top-start': createToaster({ placement: 'top-start', overlap: true, gap: 16 }),
    top: createToaster({ placement: 'top', overlap: true, gap: 16 }),
    'top-end': createToaster({ placement: 'top-end', overlap: true, gap: 16 }),
    'bottom-start': createToaster({ placement: 'bottom-start', overlap: true, gap: 16 }),
    bottom: createToaster({ placement: 'bottom', overlap: true, gap: 16 }),
    'bottom-end': createToaster({ placement: 'bottom-end', overlap: true, gap: 16 }),
  };
  let placement = $state<Placement>('bottom-end');
  const showToast = () => {
    const currentPlacement = placement;
    toasters[currentPlacement].info({
      title: 'Notification',
      description: `This toast appears at ${currentPlacement}.`,
    });
  };
</script>

<div class={styles.root}>
  {#each placements as item (item)}
    <ToastToaster toaster={toasters[item]} />
  {/each}
  {#each placements as item (item)}
    <Button variant={item === placement ? 'default' : 'outline'} onclick={() => (placement = item)}>
      {item}
    </Button>
  {/each}
  <Button onclick={showToast}>Show toast</Button>
</div>