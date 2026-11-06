<script lang="ts">
  import { PopoverPositioner, type PopoverPositionerProps } from '@ark-ui/svelte/popover';
  import { cn } from '@/lib/moduix/cn';
  import { OverlayPortal } from '@/lib/moduix/overlayPortal';

  let { class: className, ref = $bindable(null), ...props }: PopoverPositionerProps = $props();
</script>

<OverlayPortal>
  <PopoverPositioner
    {...props}
    bind:ref
    class={cn(
      'z-[var(--z-index,var(--moduix-z-popup))] max-w-(--available-width) outline-0',
      className,
    )}
    data-slot="popover-positioner"
  />
</OverlayPortal>