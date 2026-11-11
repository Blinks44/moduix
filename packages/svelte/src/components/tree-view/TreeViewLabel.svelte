<script lang="ts">
  import { TreeViewLabel, type TreeViewLabelProps } from '@ark-ui/svelte/tree-view';
  import { clsx } from 'clsx';
  import styles from './TreeView.module.css';

  let { class: className, ref = $bindable(null), ...props }: TreeViewLabelProps = $props();
</script>

<TreeViewLabel
  {...props}
  bind:ref
  class={clsx(styles.label, className)}
  data-slot="tree-view-label"
/>