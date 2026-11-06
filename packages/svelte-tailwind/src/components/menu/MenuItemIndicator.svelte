<script lang="ts">
  import { MenuItemIndicator, type MenuItemIndicatorProps } from '@ark-ui/svelte/menu';
  import { cn } from '@/lib/moduix/cn';
  import { CheckIcon } from '@/lib/moduix/icons/ui';

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: MenuItemIndicatorProps = $props();
</script>

<MenuItemIndicator
  {...props}
  bind:ref
  class={cn('inline-flex size-3 items-center justify-center [&_svg]:size-full', className)}
  data-slot="menu-item-indicator"
>
  {#if children}
    {@render children()}
  {:else}
    <CheckIcon />
  {/if}
</MenuItemIndicator>