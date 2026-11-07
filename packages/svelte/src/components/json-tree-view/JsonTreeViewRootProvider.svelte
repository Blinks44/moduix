<script lang="ts">
  import {
    JsonTreeViewRootProvider,
    type JsonTreeViewRootProviderProps,
  } from '@ark-ui/svelte/json-tree-view';
  import { clsx } from 'clsx';
  import styles from './JsonTreeView.module.css';

  let { class: className, ...props }: JsonTreeViewRootProviderProps = $props();
</script>

<JsonTreeViewRootProvider
  {...props}
  class={clsx(styles.root, className)}
  data-slot="json-tree-view-root-provider"
/>