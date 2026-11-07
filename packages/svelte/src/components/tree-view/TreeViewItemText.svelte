<script lang="ts">
  import { TreeViewItemText, type TreeViewItemTextProps } from '@ark-ui/svelte/tree-view';
  import { clsx } from 'clsx';
  import styles from './TreeView.module.css';

  let { class: className, ref = $bindable(null), ...props }: TreeViewItemTextProps = $props();
</script>

<TreeViewItemText
  {...props}
  bind:ref
  class={clsx(styles.itemText, className)}
  data-slot="tree-view-item-text"
/>