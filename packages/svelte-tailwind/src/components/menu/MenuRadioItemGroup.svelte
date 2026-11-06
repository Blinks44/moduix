<script lang="ts">
  import { MenuRadioItemGroup, type MenuRadioItemGroupProps } from '@ark-ui/svelte/menu';
  import { cn } from '@/lib/moduix/cn';

  let {
    class: className,
    ref = $bindable(null),
    value = $bindable(),
    ...props
  }: MenuRadioItemGroupProps = $props();
</script>

<MenuRadioItemGroup
  {...props}
  bind:ref
  bind:value
  class={cn('grid', className)}
  data-slot="menu-radio-item-group"
/>