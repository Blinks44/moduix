<script lang="ts">
  import { DrawerPositioner, type DrawerPositionerProps } from '@ark-ui/svelte/drawer';
  import { clsx } from 'clsx';
  import { OverlayPortal } from '@/lib/moduix/overlayPortal';
  import styles from './Drawer.module.css';

  let { class: className, ref = $bindable(null), ...props }: DrawerPositionerProps = $props();
</script>

<OverlayPortal>
  <DrawerPositioner
    {...props}
    bind:ref
    class={clsx(styles.positioner, className)}
    data-slot="drawer-positioner"
  />
</OverlayPortal>