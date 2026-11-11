<script lang="ts">
  import {
    NavigationMenuItemIndicator,
    type NavigationMenuItemIndicatorProps,
  } from '@ark-ui/svelte/navigation-menu';
  import { cn } from '@/lib/moduix/cn';

  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: NavigationMenuItemIndicatorProps = $props();

  const itemIndicatorClass = 'absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-current';
</script>

<NavigationMenuItemIndicator
  {...props}
  bind:ref
  class={cn(itemIndicatorClass, className)}
  data-slot="navigation-menu-item-indicator"
/>