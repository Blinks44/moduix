<script lang="ts">
  import { MenuItemGroupLabel, type MenuItemGroupLabelProps } from '@ark-ui/svelte/menu';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: MenuItemGroupLabelProps = $props();
</script>

<MenuItemGroupLabel
  {...props}
  bind:ref
  class={cn(
    'cursor-default px-2.5 py-1 text-xs font-normal text-muted-foreground select-none',
    className,
  )}
  data-slot="menu-item-group-label"
/>