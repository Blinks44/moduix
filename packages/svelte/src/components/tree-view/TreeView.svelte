<script module lang="ts">
  import type {
    TreeNode,
    TreeViewRootProps as ArkTreeViewRootProps,
  } from '@ark-ui/svelte/tree-view';

  export type TreeViewRootProps<T extends TreeNode = TreeNode> = ArkTreeViewRootProps<T>;
</script>

<script lang="ts" generics="T extends TreeNode = TreeNode">
  import { TreeViewRoot } from '@ark-ui/svelte/tree-view';
  import { clsx } from 'clsx';
  import styles from './TreeView.module.css';

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
  class={clsx(styles.root, className)}
  data-slot="tree-view-root"
/>