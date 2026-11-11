<script lang="ts">
  import { TooltipPositioner, type TooltipPositionerProps } from '@ark-ui/svelte/tooltip';
  import { clsx } from 'clsx';
  import { OverlayPortal } from '@/lib/moduix/overlayPortal';
  import styles from './Tooltip.module.css';

  let { class: className, ref = $bindable(null), ...props }: TooltipPositionerProps = $props();
</script>

<OverlayPortal>
  <TooltipPositioner
    {...props}
    bind:ref
    class={clsx(styles.positioner, className)}
    data-slot="tooltip-positioner"
  />
</OverlayPortal>