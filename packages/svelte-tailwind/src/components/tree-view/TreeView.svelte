<script module lang="ts">
  import type {
    TreeNode,
    TreeViewRootProps as ArkTreeViewRootProps,
  } from '@ark-ui/svelte/tree-view';

  export type TreeViewRootProps<T extends TreeNode = TreeNode> = ArkTreeViewRootProps<T>;
</script>

<script lang="ts" generics="T extends TreeNode = TreeNode">
  import { TreeViewRoot } from '@ark-ui/svelte/tree-view';
  import { cn } from '@/lib/moduix/cn';
  import { treeViewRootVariants } from './TreeView.variants';

  let {
    checkedValue = $bindable(),
    class: className,
    expandedValue = $bindable(),
    focusedValue = $bindable(),
    ref = $bindable(null),
    selectedValue = $bindable(),
    ...props
  }: TreeViewRootProps<T> = $props();
</script>

<TreeViewRoot
  {...props}
  bind:ref
  bind:expandedValue
  bind:selectedValue
  bind:focusedValue
  bind:checkedValue
  class={cn(treeViewRootVariants(), className)}
  data-slot="tree-view-root"
/>