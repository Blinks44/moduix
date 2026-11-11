<script lang="ts">
  import { TreeViewBranchTrigger, type TreeViewBranchTriggerProps } from '@ark-ui/svelte/tree-view';
  import { cn } from '@/lib/moduix/cn';
  import { ChevronRightIcon } from '@/lib/moduix/icons/ui';

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: TreeViewBranchTriggerProps = $props();

  const componentClass =
    'inline-flex size-4 shrink-0 items-center justify-center transition-transform duration-normal ease-in-out data-[state=open]:rotate-90 [&_svg]:size-3.5';
</script>

<TreeViewBranchTrigger
  {...props}
  bind:ref
  class={cn(componentClass, className)}
  data-slot="tree-view-branch-trigger"
>
  {#if children}
    {@render children()}
  {:else}
    <ChevronRightIcon />
  {/if}
</TreeViewBranchTrigger>