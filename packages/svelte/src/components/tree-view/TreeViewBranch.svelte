<script lang="ts">
  import { TreeViewBranch, type TreeViewBranchProps } from '@ark-ui/svelte/tree-view';
  import { clsx } from 'clsx';
  import styles from './TreeView.module.css';

  let { class: className, ref = $bindable(null), ...props }: TreeViewBranchProps = $props();
</script>

<TreeViewBranch
  {...props}
  bind:ref
  class={clsx(styles.branch, className)}
  data-slot="tree-view-branch"
/>