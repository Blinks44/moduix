<script lang="ts">
  import { DrawerBackdrop, type DrawerBackdropProps } from '@ark-ui/svelte/drawer';
  import { clsx } from 'clsx';
  import { OverlayPortal } from '@/lib/moduix/overlayPortal';
  import styles from './Drawer.module.css';

  let { class: className, ref = $bindable(null), ...props }: DrawerBackdropProps = $props();
</script>

<OverlayPortal>
  <DrawerBackdrop
    {...props}
    bind:ref
    class={clsx(styles.backdrop, className)}
    data-slot="drawer-backdrop"
  />
</OverlayPortal>