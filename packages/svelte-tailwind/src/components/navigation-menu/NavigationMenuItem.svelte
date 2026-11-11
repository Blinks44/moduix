<script lang="ts">
  import { NavigationMenuItem, type NavigationMenuItemProps } from '@ark-ui/svelte/navigation-menu';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: NavigationMenuItemProps = $props();

  const itemClass =
    'relative group-has-[>[data-slot=navigation-menu-indicator]]/navigation-menu-list:static';
</script>

<NavigationMenuItem
  {...props}
  bind:ref
  class={cn(itemClass, className)}
  data-slot="navigation-menu-item"
/>