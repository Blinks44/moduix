<script lang="ts">
  import { DrawerPositioner, type DrawerPositionerProps } from '@ark-ui/svelte/drawer';
  import { cn } from '@/lib/moduix/cn';
  import { OverlayPortal } from '@/lib/moduix/overlayPortal';

  let { class: className, ref = $bindable(null), ...props }: DrawerPositionerProps = $props();

  const positionerClass =
    'fixed inset-0 z-[var(--z-index,var(--moduix-z-popup))] flex items-end justify-center overflow-hidden overscroll-contain p-0 has-[>[data-slot=drawer-content][data-variant=island]]:pt-[max(var(--moduix-spacing-4),env(safe-area-inset-top,0px))] has-[>[data-slot=drawer-content][data-variant=island]]:pr-[max(var(--moduix-spacing-4),env(safe-area-inset-right,0px))] has-[>[data-slot=drawer-content][data-variant=island]]:pb-[max(var(--moduix-spacing-4),env(safe-area-inset-bottom,0px))] has-[>[data-slot=drawer-content][data-variant=island]]:pl-[max(var(--moduix-spacing-4),env(safe-area-inset-left,0px))] data-[swipe-direction=left]:items-stretch data-[swipe-direction=left]:justify-start data-[swipe-direction=right]:items-stretch data-[swipe-direction=right]:justify-end data-[swipe-direction=up]:items-start [&:not([hidden])_[data-slot=drawer-content][hidden]]:flex';
</script>

<OverlayPortal>
  <DrawerPositioner
    {...props}
    bind:ref
    class={cn(positionerClass, className)}
    data-slot="drawer-positioner"
  />
</OverlayPortal>