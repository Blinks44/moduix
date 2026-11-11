<script lang="ts">
  import { TreeViewItem, type TreeViewItemProps } from '@ark-ui/svelte/tree-view';
  import { clsx } from 'clsx';
  import styles from './TreeView.module.css';

  let { class: className, ref = $bindable(null), ...props }: TreeViewItemProps = $props();
</script>

<TreeViewItem {...props} bind:ref class={clsx(styles.item, className)} data-slot="tree-view-item" />