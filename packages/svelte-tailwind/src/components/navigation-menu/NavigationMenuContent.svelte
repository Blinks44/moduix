<script lang="ts">
  import {
    NavigationMenuContent,
    type NavigationMenuContentProps,
  } from '@ark-ui/svelte/navigation-menu';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: NavigationMenuContentProps = $props();

  const contentClass =
    'absolute start-0 top-[calc(100%+0.5rem)] z-60 flex max-h-[min(24rem,calc(100dvh-1.5rem))] w-max max-w-[min(20rem,calc(100vw-1.5rem))] min-w-[min(max(var(--trigger-width,0px),12rem),calc(100vw-1.5rem))] origin-top-left flex-col overflow-auto overscroll-contain rounded-md bg-popover py-1 text-popover-foreground shadow-lg outline-1 outline-border data-[state=closed]:pointer-events-none data-[state=closed]:animate-moduix-popup-out group-has-[>[data-slot=navigation-menu-indicator]]/navigation-menu-list:data-[state=closed]:animate-none data-[state=open]:animate-moduix-popup-in motion-reduce:data-[state]:animate-none rtl:origin-top-right [&_[data-slot=navigation-menu-link]]:mx-1 [&_[data-slot=navigation-menu-link]]:justify-start [&_[data-slot=navigation-menu-link]]:rounded-sm [&_[data-slot=navigation-menu-link]]:px-2';
</script>

<NavigationMenuContent
  {...props}
  bind:ref
  class={cn(contentClass, className)}
  data-slot="navigation-menu-content"
/>