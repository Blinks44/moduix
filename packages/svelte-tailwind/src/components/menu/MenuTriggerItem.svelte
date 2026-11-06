<script lang="ts">
  import { MenuTriggerItem, type MenuTriggerItemProps } from '@ark-ui/svelte/menu';
  import { cn } from '@/lib/moduix/cn';
  import { menuItemStyles } from './Menu.variants';

  let { class: className, ref = $bindable(null), ...props }: MenuTriggerItemProps = $props();
</script>

<MenuTriggerItem
  {...props}
  bind:ref
  class={cn(menuItemStyles({ layout: 'triggerItem' }), className)}
  data-slot="menu-trigger-item"
/>