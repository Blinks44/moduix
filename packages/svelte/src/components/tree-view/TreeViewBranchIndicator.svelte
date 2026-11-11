<script lang="ts">
  import {
    TreeViewBranchIndicator,
    type TreeViewBranchIndicatorProps,
  } from '@ark-ui/svelte/tree-view';
  import { clsx } from 'clsx';
  import { ChevronRightIcon } from '@/lib/moduix/icons/ui';
  import styles from './TreeView.module.css';

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: TreeViewBranchIndicatorProps = $props();
</script>

<TreeViewBranchIndicator
  {...props}
  bind:ref
  class={clsx(styles.branchIndicator, className)}
  data-slot="tree-view-branch-indicator"
>
  {#if children}
    {@render children()}
  {:else}
    <ChevronRightIcon />
  {/if}
</TreeViewBranchIndicator>