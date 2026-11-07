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
  import { clsx } from 'clsx';
  import styles from './TreeView.module.css';

  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: TreeViewRootProviderProps<T> = $props();
</script>

<TreeViewRootProvider
  {...props}
  bind:ref
  class={clsx(styles.root, className)}
  data-slot="tree-view-root-provider"
/>