<script lang="ts">
  import { HoverCardPositioner, type HoverCardPositionerProps } from '@ark-ui/svelte/hover-card';
  import { cn } from '@/lib/moduix/cn';
  import { OverlayPortal } from '@/lib/moduix/overlayPortal';

  let { class: className, ref = $bindable(null), ...props }: HoverCardPositionerProps = $props();
</script>

<OverlayPortal>
  <HoverCardPositioner
    {...props}
    bind:ref
    class={cn(
      'z-[var(--z-index,var(--moduix-z-popup))] max-w-(--available-width) outline-0',
      className,
    )}
    data-slot="hover-card-positioner"
  />
</OverlayPortal>