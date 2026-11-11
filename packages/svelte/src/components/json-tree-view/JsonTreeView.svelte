<script lang="ts">
  import { JsonTreeViewRoot, type JsonTreeViewRootProps } from '@ark-ui/svelte/json-tree-view';
  import { clsx } from 'clsx';
  import styles from './JsonTreeView.module.css';

  let {
    checkedValue = $bindable(),
    class: className,
    expandedValue = $bindable(),
    focusedValue = $bindable(),
    selectedValue = $bindable(),
    ...props
  }: JsonTreeViewRootProps = $props();
</script>

<JsonTreeViewRoot
  {...props}
  bind:expandedValue
  bind:selectedValue
  bind:focusedValue
  bind:checkedValue
  class={clsx(styles.root, className)}
  data-slot="json-tree-view-root"
/>