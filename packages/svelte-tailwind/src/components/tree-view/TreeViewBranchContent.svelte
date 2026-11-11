<script lang="ts">
  import { TreeViewBranchContent, type TreeViewBranchContentProps } from '@ark-ui/svelte/tree-view';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: TreeViewBranchContentProps = $props();

  const componentClass =
    'relative flex min-w-0 flex-col gap-1 overflow-hidden data-[state=closed]:animate-moduix-collapsible-closed data-[state=open]:animate-moduix-collapsible-open motion-reduce:data-[state]:animate-none';
</script>

<TreeViewBranchContent
  {...props}
  bind:ref
  class={cn(componentClass, className)}
  data-slot="tree-view-branch-content"
/>