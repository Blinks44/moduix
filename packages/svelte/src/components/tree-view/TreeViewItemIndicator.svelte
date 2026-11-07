<script lang="ts">
  import { TreeViewItemIndicator, type TreeViewItemIndicatorProps } from '@ark-ui/svelte/tree-view';
  import { clsx } from 'clsx';
  import { CheckIcon } from '@/lib/moduix/icons/ui';
  import styles from './TreeView.module.css';

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: TreeViewItemIndicatorProps = $props();
</script>

<TreeViewItemIndicator
  {...props}
  bind:ref
  class={clsx(styles.itemIndicator, className)}
  data-slot="tree-view-item-indicator"
>
  {#if children}
    {@render children()}
  {:else}
    <CheckIcon />
  {/if}
</TreeViewItemIndicator>