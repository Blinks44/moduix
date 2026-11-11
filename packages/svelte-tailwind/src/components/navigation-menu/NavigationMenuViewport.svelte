<script lang="ts">
  import {
    NavigationMenuViewport,
    type NavigationMenuViewportProps,
  } from '@ark-ui/svelte/navigation-menu';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: NavigationMenuViewportProps = $props();

  const viewportClass =
    'relative mt-2.5 h-(--viewport-height) max-h-[min(32rem,calc(100dvh-1.5rem))] w-(--viewport-width) max-w-[min(40rem,calc(100vw-1.5rem))] origin-top overflow-hidden rounded-md bg-popover text-popover-foreground shadow-lg outline-1 outline-border transition-[width,height] duration-normal ease-in-out data-[orientation=vertical]:ms-2 data-[orientation=vertical]:mt-0 data-[state=closed]:pointer-events-none data-[state=closed]:animate-moduix-popup-out data-[state=open]:animate-moduix-popup-in motion-reduce:data-[state]:animate-none [&_[data-slot=navigation-menu-content]]:absolute [&_[data-slot=navigation-menu-content]]:top-0 [&_[data-slot=navigation-menu-content]]:right-auto [&_[data-slot=navigation-menu-content]]:left-0 [&_[data-slot=navigation-menu-content]]:max-h-none [&_[data-slot=navigation-menu-content]]:overflow-visible [&_[data-slot=navigation-menu-content]]:rounded-none [&_[data-slot=navigation-menu-content]]:bg-transparent [&_[data-slot=navigation-menu-content]]:shadow-none [&_[data-slot=navigation-menu-content]]:outline-0 [&_[data-slot=navigation-menu-content]]:will-change-[translate,opacity] [&_[data-slot=navigation-menu-content][data-motion=from-end][data-state=open]]:animate-moduix-navigation-menu-content-from-end [&_[data-slot=navigation-menu-content][data-motion=from-start][data-state=open]]:animate-moduix-navigation-menu-content-from-start [&_[data-slot=navigation-menu-content][data-motion=to-end][data-state=closed]]:animate-moduix-navigation-menu-content-to-end [&_[data-slot=navigation-menu-content][data-motion=to-start][data-state=closed]]:animate-moduix-navigation-menu-content-to-start motion-reduce:[&_[data-slot=navigation-menu-content][data-motion][data-state]]:animate-none [&_[data-slot=navigation-menu-content][data-state]]:animate-none';
</script>

<NavigationMenuViewport
  {...props}
  bind:ref
  class={cn(viewportClass, className)}
  data-slot="navigation-menu-viewport"
/>