<script lang="ts">
  import { TooltipPositioner, type TooltipPositionerProps } from '@ark-ui/svelte/tooltip';
  import { cn } from '@/lib/moduix/cn';
  import { OverlayPortal } from '@/lib/moduix/overlayPortal';

  let { class: className, ref = $bindable(null), ...props }: TooltipPositionerProps = $props();
</script>

<OverlayPortal>
  <TooltipPositioner
    {...props}
    bind:ref
    class={cn(
      'z-[var(--z-index,var(--moduix-z-popup))] max-w-(--available-width) outline-0',
      className,
    )}
    data-slot="tooltip-positioner"
  />
</OverlayPortal>