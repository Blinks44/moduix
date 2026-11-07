<script module lang="ts">
  import type {
    TreeNode,
    TreeViewNodeProviderProps,
    TreeViewNodeState,
  } from '@ark-ui/svelte/tree-view';
  import type { Snippet } from 'svelte';

  export interface TreeViewNodeRenderProps<T extends TreeNode = TreeNode> {
    indexPath: number[];
    node: T;
    state: TreeViewNodeState;
  }

  export interface TreeViewNodeProps<T extends TreeNode = TreeNode> extends Omit<
    TreeViewNodeProviderProps<T>,
    'children'
  > {
    children?: Snippet<[TreeViewNodeRenderProps<T>]>;
  }
</script>

<script lang="ts" generics="T extends TreeNode = TreeNode">
  import { TreeViewNodeContext, TreeViewNodeProvider } from '@ark-ui/svelte/tree-view';

  let { children, indexPath, node }: TreeViewNodeProps<T> = $props();
</script>

<TreeViewNodeProvider {indexPath} {node}>
  <TreeViewNodeContext>
    {#snippet render(state)}
      {@render children?.({ indexPath, node, state: state() })}
    {/snippet}
  </TreeViewNodeContext>
</TreeViewNodeProvider>