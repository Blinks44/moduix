<script lang="ts">
  import {
    TreeViewNodeRenameInput,
    type TreeViewNodeRenameInputProps,
  } from '@ark-ui/svelte/tree-view';
  import { clsx } from 'clsx';
  import styles from './TreeView.module.css';

  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: TreeViewNodeRenameInputProps = $props();
</script>

<TreeViewNodeRenameInput
  {...props}
  bind:ref
  class={clsx(styles.nodeRenameInput, className)}
  data-slot="tree-view-node-rename-input"
/>