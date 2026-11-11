<script lang="ts">
  import { TreeViewBranchTrigger, type TreeViewBranchTriggerProps } from '@ark-ui/svelte/tree-view';
  import { clsx } from 'clsx';
  import { ChevronRightIcon } from '@/lib/moduix/icons/ui';
  import styles from './TreeView.module.css';

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: TreeViewBranchTriggerProps = $props();
</script>

<TreeViewBranchTrigger
  {...props}
  bind:ref
  class={clsx(styles.branchTrigger, className)}
  data-slot="tree-view-branch-trigger"
>
  {#if children}
    {@render children()}
  {:else}
    <ChevronRightIcon />
  {/if}
</TreeViewBranchTrigger>