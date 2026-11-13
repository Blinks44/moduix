<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import { ToastToaster, createToaster } from '@moduix/svelte/toast';
  import styles from '@/components/examples/toast/toast-options.module.css';

  const types = [
    { type: 'info', title: 'Update available', description: 'Version 2.4 is ready to install.' },
    { type: 'success', title: 'Changes saved', description: 'Your profile was updated.' },
    { type: 'warning', title: 'Storage almost full', description: 'You have used 90% of 5 GB.' },
    { type: 'error', title: 'Upload failed', description: 'The file is larger than 10 MB.' },
  ] as const;

  const toaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 16 });
  let selected = $state<(typeof types)[number]>(types[1]);
</script>

<div class={styles.root}>
  <ToastToaster {toaster} />
  <div data-preview-meta>
    <output>Type: {selected.type}</output>
    {#each types as item (item.type)}
      <Button
        variant={item.type === selected.type ? 'default' : 'outline'}
        onclick={() => (selected = item)}
      >
        {item.type}
      </Button>
    {/each}
    <Button onclick={() => toaster.create(selected)}>Show toast</Button>
  </div>
</div>