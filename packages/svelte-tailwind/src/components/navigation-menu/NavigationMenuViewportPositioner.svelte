<script lang="ts">
  import {
    NavigationMenuViewportPositioner,
    type NavigationMenuViewportPositionerProps,
  } from '@ark-ui/svelte/navigation-menu';
  import { cn } from '@/lib/moduix/cn';

  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: NavigationMenuViewportPositionerProps = $props();

  const viewportPositionerClass =
    'absolute z-60 flex data-[orientation=horizontal]:top-full data-[orientation=horizontal]:left-0 data-[orientation=horizontal]:[translate:var(--viewport-x,0px)_0] data-[orientation=vertical]:start-full data-[orientation=vertical]:top-[var(--viewport-y,0px)]';
</script>

<NavigationMenuViewportPositioner
  {...props}
  bind:ref
  class={cn(viewportPositionerClass, className)}
  data-slot="navigation-menu-viewport-positioner"
/>