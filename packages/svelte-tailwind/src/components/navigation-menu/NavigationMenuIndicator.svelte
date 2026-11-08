<script lang="ts">
  import {
    NavigationMenuIndicator,
    type NavigationMenuIndicatorProps,
  } from '@ark-ui/svelte/navigation-menu';
  import { cn } from '@/lib/moduix/cn';

  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: NavigationMenuIndicatorProps = $props();

  const indicatorClass =
    'pointer-events-none absolute -bottom-2.5 left-0 z-61 flex h-2.5 w-[var(--trigger-width,0px)] [translate:var(--trigger-x,0px)_0] justify-center transition-[translate,width] duration-normal ease-in-out data-[state=closed]:animate-[moduix-fade-out_var(--moduix-transition-default)_forwards] data-[state=open]:animate-[moduix-fade-in_var(--moduix-transition-default)] motion-reduce:data-[state]:animate-none';
</script>

<NavigationMenuIndicator
  {...props}
  bind:ref
  class={cn(indicatorClass, className)}
  data-slot="navigation-menu-indicator"
/>