<script lang="ts">
  import { DrawerSwipeArea, type DrawerSwipeAreaProps } from '@ark-ui/svelte/drawer';
  import { clsx } from 'clsx';
  import styles from './Drawer.module.css';

  let { class: className, ref = $bindable(null), ...props }: DrawerSwipeAreaProps = $props();
</script>

<DrawerSwipeArea
  {...props}
  bind:ref
  class={clsx(styles.swipeArea, className)}
  data-slot="drawer-swipe-area"
/>