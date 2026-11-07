<script lang="ts">
  import { TreeViewBranchText, type TreeViewBranchTextProps } from '@ark-ui/svelte/tree-view';
  import { clsx } from 'clsx';
  import styles from './TreeView.module.css';

  let { class: className, ref = $bindable(null), ...props }: TreeViewBranchTextProps = $props();
</script>

<TreeViewBranchText
  {...props}
  bind:ref
  class={clsx(styles.branchText, className)}
  data-slot="tree-view-branch-text"
/>