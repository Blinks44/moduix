<script lang="ts">
  import { TreeViewNodeCheckbox, type TreeViewNodeCheckboxProps } from '@ark-ui/svelte/tree-view';
  import { clsx } from 'clsx';
  import styles from './TreeView.module.css';

  let { class: className, ref = $bindable(null), ...props }: TreeViewNodeCheckboxProps = $props();
</script>

<TreeViewNodeCheckbox
  {...props}
  bind:ref
  class={clsx(styles.nodeCheckbox, className)}
  data-slot="tree-view-node-checkbox"
/>