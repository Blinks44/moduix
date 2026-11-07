<script lang="ts">
  import {
    TreeViewBranchIndentGuide,
    type TreeViewBranchIndentGuideProps,
  } from '@ark-ui/svelte/tree-view';
  import { clsx } from 'clsx';
  import styles from './TreeView.module.css';

  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: TreeViewBranchIndentGuideProps = $props();
</script>

<TreeViewBranchIndentGuide
  {...props}
  bind:ref
  class={clsx(styles.branchIndentGuide, className)}
  data-slot="tree-view-branch-indent-guide"
/>