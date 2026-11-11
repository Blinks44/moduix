<script module lang="ts">
  import type { TreeViewNodeCheckboxIndicatorProps as ArkTreeViewNodeCheckboxIndicatorProps } from '@ark-ui/svelte/tree-view';
  import type { HTMLAttributes } from 'svelte/elements';

  export interface TreeViewNodeCheckboxIndicatorProps
    extends
      ArkTreeViewNodeCheckboxIndicatorProps,
      Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
    ref?: HTMLSpanElement | null;
  }
</script>

<script lang="ts">
  import { TreeViewNodeCheckboxIndicator } from '@ark-ui/svelte/tree-view';
  import { clsx } from 'clsx';
  import { CheckIcon, IndeterminateIcon } from '@/lib/moduix/icons/ui';
  import styles from './TreeView.module.css';

  let {
    children: childrenSnippet,
    class: className,
    fallback,
    indeterminate: indeterminateSnippet,
    ref = $bindable(null),
    ...props
  }: TreeViewNodeCheckboxIndicatorProps = $props();
</script>

<span
  {...props}
  bind:this={ref}
  class={clsx(styles.nodeCheckboxIndicator, className)}
  data-slot="tree-view-node-checkbox-indicator"
>
  <TreeViewNodeCheckboxIndicator {fallback}>
    {#snippet indeterminate()}
      {#if indeterminateSnippet}
        {@render indeterminateSnippet()}
      {:else}
        <IndeterminateIcon />
      {/if}
    {/snippet}
    {#snippet children()}
      {#if childrenSnippet}
        {@render childrenSnippet()}
      {:else}
        <CheckIcon />
      {/if}
    {/snippet}
  </TreeViewNodeCheckboxIndicator>
</span>