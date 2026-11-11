<script lang="ts">
  import {
    NavigationMenuArrow,
    type NavigationMenuArrowProps,
  } from '@ark-ui/svelte/navigation-menu';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: NavigationMenuArrowProps = $props();

  const arrowClass = 'relative top-1 size-2.5 rotate-45 border-s border-t border-border bg-popover';
</script>

<NavigationMenuArrow
  {...props}
  bind:ref
  class={cn(arrowClass, className)}
  data-slot="navigation-menu-arrow"
/>