<script lang="ts">
  import { TreeViewTree, type TreeViewTreeProps } from '@ark-ui/svelte/tree-view';
  import { clsx } from 'clsx';
  import styles from './TreeView.module.css';

  let { class: className, ref = $bindable(null), ...props }: TreeViewTreeProps = $props();
</script>

<TreeViewTree {...props} bind:ref class={clsx(styles.tree, className)} data-slot="tree-view-tree" />