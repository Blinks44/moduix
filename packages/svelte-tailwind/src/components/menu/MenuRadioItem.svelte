<script module lang="ts">
  import type { MenuRadioItemProps as ArkMenuRadioItemProps } from '@ark-ui/svelte/menu';
  import type { MenuIndicatorPosition } from './MenuCheckboxItem.svelte';

  export interface MenuRadioItemProps extends ArkMenuRadioItemProps {
    /** Where the radio indicator sits relative to the label. */
    indicator?: MenuIndicatorPosition;
  }
</script>

<script lang="ts">
  import { MenuRadioItem } from '@ark-ui/svelte/menu';
  import { cn } from '@/lib/moduix/cn';
  import { menuItemStyles } from './Menu.variants';

  let {
    class: className,
    indicator = 'start',
    ref = $bindable(null),
    ...props
  }: MenuRadioItemProps = $props();
</script>

<MenuRadioItem
  {...props}
  bind:ref
  class={cn(menuItemStyles({ layout: 'indicatorItem', indicator }), className)}
  data-indicator-position={indicator}
  data-slot="menu-radio-item"
/>