<script lang="ts">
  import {
    Positioner as DialogPositioner,
    type DialogPositionerProps,
  } from '@ark-ui/svelte/dialog';
  import { cn } from '@/lib/moduix/cn';
  import { OverlayPortal } from '@/lib/moduix/overlayPortal';

  let { class: className, ref = $bindable(null), ...props }: DialogPositionerProps = $props();
</script>

<OverlayPortal>
  <DialogPositioner
    {...props}
    bind:ref
    class={cn(
      'fixed inset-0 z-[var(--z-index,var(--moduix-z-popup))] grid items-start justify-items-center overflow-hidden overscroll-contain px-4 pt-[10dvh] pb-4',
      className,
    )}
    data-slot="command-palette-positioner"
  />
</OverlayPortal>