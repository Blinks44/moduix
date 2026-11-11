<script lang="ts">
  import { MenuIndicator, type MenuIndicatorProps } from '@ark-ui/svelte/menu';
  import { cn } from '@/lib/moduix/cn';
  import { ChevronDownIcon } from '@/lib/moduix/icons/ui';

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: MenuIndicatorProps = $props();
</script>

<MenuIndicator
  {...props}
  bind:ref
  class={cn('inline-flex size-4 shrink-0 items-center justify-center [&_svg]:size-full', className)}
  data-slot="menu-indicator"
>
  {#if children}
    {@render children()}
  {:else}
    <ChevronDownIcon />
  {/if}
</MenuIndicator>