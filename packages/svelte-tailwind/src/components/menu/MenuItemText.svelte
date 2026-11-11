<script lang="ts">
  import { MenuItemText, type MenuItemTextProps } from '@ark-ui/svelte/menu';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: MenuItemTextProps = $props();
</script>

<MenuItemText
  {...props}
  bind:ref
  class={cn(
    'min-w-0 overflow-hidden text-ellipsis whitespace-nowrap [&>svg]:me-2 [&>svg]:inline-block [&>svg]:size-4 [&>svg]:align-middle',
    className,
  )}
  data-slot="menu-item-text"
/>