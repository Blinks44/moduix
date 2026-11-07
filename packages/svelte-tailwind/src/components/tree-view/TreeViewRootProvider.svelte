<script module lang="ts">
  import type {
    TreeNode,
    TreeViewRootProviderProps as ArkTreeViewRootProviderProps,
  } from '@ark-ui/svelte/tree-view';

  export type TreeViewRootProviderProps<T extends TreeNode = TreeNode> =
    ArkTreeViewRootProviderProps<T>;
</script>

<script lang="ts" generics="T extends TreeNode = TreeNode">
  import { TreeViewRootProvider } from '@ark-ui/svelte/tree-view';
  import { cn } from '@/lib/moduix/cn';
  import { treeViewRootVariants } from './TreeView.variants';

  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: TreeViewRootProviderProps<T> = $props();
</script>

<TreeViewRootProvider
  {...props}
  bind:ref
  class={cn(treeViewRootVariants(), className)}
  data-slot="tree-view-root-provider"
/>