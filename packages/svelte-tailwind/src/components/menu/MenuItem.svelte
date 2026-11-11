<script module lang="ts">
  import type { MenuItemProps as ArkMenuItemProps } from '@ark-ui/svelte/menu';

  export type MenuItemTone = 'default' | 'destructive';

  export interface MenuItemProps extends ArkMenuItemProps {
    /** Visual intent of the item. */
    tone?: MenuItemTone;
  }
</script>

<script lang="ts">
  import { MenuItem } from '@ark-ui/svelte/menu';
  import { cn } from '@/lib/moduix/cn';
  import { menuItemStyles } from './Menu.variants';

  let {
    class: className,
    ref = $bindable(null),
    tone = 'default',
    ...props
  }: MenuItemProps = $props();
</script>

<MenuItem
  {...props}
  bind:ref
  class={cn(menuItemStyles({ layout: 'item', tone }), className)}
  data-tone={tone}
  data-slot="menu-item"
/>