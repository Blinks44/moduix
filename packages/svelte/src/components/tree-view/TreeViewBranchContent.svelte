<script lang="ts">
  import { TreeViewBranchContent, type TreeViewBranchContentProps } from '@ark-ui/svelte/tree-view';
  import { clsx } from 'clsx';
  import styles from './TreeView.module.css';

  let { class: className, ref = $bindable(null), ...props }: TreeViewBranchContentProps = $props();
</script>

<TreeViewBranchContent
  {...props}
  bind:ref
  class={clsx(styles.branchContent, className)}
  data-slot="tree-view-branch-content"
/>