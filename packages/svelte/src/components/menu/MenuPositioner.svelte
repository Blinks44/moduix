<script lang="ts">
  import { MenuPositioner, type MenuPositionerProps } from '@ark-ui/svelte/menu';
  import { clsx } from 'clsx';
  import { OverlayPortal } from '@/lib/moduix/overlayPortal';
  import styles from './Menu.module.css';

  let { class: className, ref = $bindable(null), ...props }: MenuPositionerProps = $props();
</script>

<OverlayPortal>
  <MenuPositioner
    {...props}
    bind:ref
    class={clsx(styles.positioner, className)}
    data-slot="menu-positioner"
  />
</OverlayPortal>