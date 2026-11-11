<script lang="ts">
  import { DrawerBackdrop, type DrawerBackdropProps } from '@ark-ui/svelte/drawer';
  import { cn } from '@/lib/moduix/cn';
  import { OverlayPortal } from '@/lib/moduix/overlayPortal';

  let { class: className, ref = $bindable(null), ...props }: DrawerBackdropProps = $props();

  const backdropClass =
    'fixed inset-0 z-[calc(var(--z-index,var(--moduix-z-popup))-1)] min-h-dvh bg-overlay backdrop-blur-xs [transition:opacity_calc(var(--drawer-swipe-strength,1)*var(--moduix-duration-slower))_var(--moduix-ease-out),backdrop-filter_calc(var(--drawer-swipe-strength,1)*var(--moduix-duration-slower))_var(--moduix-ease-out)] data-[state=closed]:animate-moduix-drawer-backdrop-out data-[state=open]:animate-moduix-drawer-backdrop-in data-[state=open]:data-swiping:[transition-duration:0s] motion-reduce:[transition-duration:1ms] motion-reduce:data-[state]:animate-none [&[hidden]:has(~[data-slot=drawer-positioner]:not([hidden]))]:block';
</script>

<OverlayPortal>
  <DrawerBackdrop
    {...props}
    bind:ref
    class={cn(backdropClass, className)}
    data-slot="drawer-backdrop"
  />
</OverlayPortal>