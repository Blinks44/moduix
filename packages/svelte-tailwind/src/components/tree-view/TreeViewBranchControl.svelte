<script lang="ts">
  import { TreeViewBranchControl, type TreeViewBranchControlProps } from '@ark-ui/svelte/tree-view';
  import { cn } from '@/lib/moduix/cn';
  import { treeViewRowVariants } from './TreeView.variants';

  let { class: className, ref = $bindable(null), ...props }: TreeViewBranchControlProps = $props();

  const componentClass = 'ps-[calc(var(--_tree-view-indent)+var(--moduix-spacing-2))]';
</script>

<TreeViewBranchControl
  {...props}
  bind:ref
  class={cn(treeViewRowVariants(), componentClass, className)}
  data-slot="tree-view-branch-control"
/>