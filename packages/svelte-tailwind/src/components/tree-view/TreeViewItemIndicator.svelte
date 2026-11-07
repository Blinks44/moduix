<script lang="ts">
  import { TreeViewItemIndicator, type TreeViewItemIndicatorProps } from '@ark-ui/svelte/tree-view';
  import { cn } from '@/lib/moduix/cn';
  import { CheckIcon } from '@/lib/moduix/icons/ui';

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: TreeViewItemIndicatorProps = $props();
</script>

<TreeViewItemIndicator
  {...props}
  bind:ref
  class={cn('inline-flex size-4 shrink-0 items-center justify-center [&_svg]:size-3.5', className)}
  data-slot="tree-view-item-indicator"
>
  {#if children}
    {@render children()}
  {:else}
    <CheckIcon />
  {/if}
</TreeViewItemIndicator>