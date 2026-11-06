<script lang="ts">
  import { DrawerGrabber, type DrawerGrabberProps } from '@ark-ui/svelte/drawer';
  import { clsx } from 'clsx';
  import styles from './Drawer.module.css';

  let { class: className, ref = $bindable(null), ...props }: DrawerGrabberProps = $props();
</script>

<DrawerGrabber
  {...props}
  bind:ref
  class={clsx(styles.grabber, className)}
  data-slot="drawer-grabber"
/>