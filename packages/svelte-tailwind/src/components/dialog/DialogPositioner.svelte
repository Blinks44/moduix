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
      'fixed inset-0 z-[var(--z-index,var(--moduix-z-popup))] grid [scrollbar-gutter:stable_both-edges] place-items-center-safe overflow-y-auto overscroll-contain p-4 has-[>[data-slot=dialog-content][data-size=full]]:p-0',
      className,
    )}
    data-slot="dialog-positioner"
  />
</OverlayPortal>