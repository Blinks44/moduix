<script lang="ts">
  import { PopoverPositioner, type PopoverPositionerProps } from '@ark-ui/svelte/popover';
  import { clsx } from 'clsx';
  import { OverlayPortal } from '@/lib/moduix/overlayPortal';
  import styles from './Popover.module.css';

  let { class: className, ref = $bindable(null), ...props }: PopoverPositionerProps = $props();
</script>

<OverlayPortal>
  <PopoverPositioner
    {...props}
    bind:ref
    class={clsx(styles.positioner, className)}
    data-slot="popover-positioner"
  />
</OverlayPortal>