<script lang="ts">
  import { DrawerCloseTrigger, type DrawerCloseTriggerProps } from '@ark-ui/svelte/drawer';
  import { clsx } from 'clsx';
  import { useA11yLabels } from '@/lib/moduix/a11yLabels';
  import CloseButton from '../close-button/CloseButton.svelte';
  import styles from './Drawer.module.css';

  let {
    children,
    class: className,
    ref = $bindable(null),
    'aria-label': ariaLabel,
    ...props
  }: Omit<DrawerCloseTriggerProps, 'asChild'> = $props();

  const labels = useA11yLabels();
</script>

<DrawerCloseTrigger {...props} bind:ref>
  {#snippet asChild(triggerProps)}
    <CloseButton
      {...triggerProps()}
      aria-label={ariaLabel ?? labels().closeDrawer}
      class={clsx(styles.closeIcon, className)}
      data-slot="drawer-close-icon"
      {children}
    />
  {/snippet}
</DrawerCloseTrigger>