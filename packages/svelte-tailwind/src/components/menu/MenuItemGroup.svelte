<script lang="ts">
  import { MenuItemGroup, type MenuItemGroupProps } from '@ark-ui/svelte/menu';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: MenuItemGroupProps = $props();
</script>

<MenuItemGroup {...props} bind:ref class={cn('grid', className)} data-slot="menu-item-group" />