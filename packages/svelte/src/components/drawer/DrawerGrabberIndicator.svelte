<script lang="ts">
  import { DrawerGrabberIndicator, type DrawerGrabberIndicatorProps } from '@ark-ui/svelte/drawer';
  import { clsx } from 'clsx';
  import styles from './Drawer.module.css';

  let { class: className, ref = $bindable(null), ...props }: DrawerGrabberIndicatorProps = $props();
</script>

<DrawerGrabberIndicator
  {...props}
  bind:ref
  class={clsx(styles.grabberIndicator, className)}
  data-slot="drawer-grabber-indicator"
/>