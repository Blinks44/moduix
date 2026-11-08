<script lang="ts">
  import { NavigationMenuList, type NavigationMenuListProps } from '@ark-ui/svelte/navigation-menu';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: NavigationMenuListProps = $props();

  const listClass =
    'group/navigation-menu-list m-0 flex max-w-full list-none items-center gap-1 p-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch';
</script>

<NavigationMenuList
  {...props}
  bind:ref
  class={cn(listClass, className)}
  data-slot="navigation-menu-list"
/>