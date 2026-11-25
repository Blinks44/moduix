<script lang="ts">
  import { JsonTreeViewTree, type JsonTreeViewTreeProps } from '@ark-ui/svelte/json-tree-view';
  import { clsx } from 'clsx';
  import { UiIcon } from '@/lib/moduix/icons/ui';
  import styles from './JsonTreeView.module.css';

  let { arrow, class: className, ...props }: JsonTreeViewTreeProps = $props();
</script>

{#snippet defaultArrow()}
  <UiIcon icon="chevron-right" aria-hidden="true" />
{/snippet}

<JsonTreeViewTree
  {...props}
  arrow={arrow ?? defaultArrow}
  class={clsx(styles.tree, className)}
  data-slot="json-tree-view-tree"
/>