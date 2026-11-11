<script lang="ts">
  import {
    TreeView,
    type TreeViewFocusChangeDetails,
    type TreeViewSelectionChangeDetails,
  } from '@/components/tree-view';
  import { collection, type FileNode } from './files';
  import TreeParts from './TreeParts.svelte';

  let {
    focusChange,
    selectionChange,
  }: {
    focusChange: (details: TreeViewFocusChangeDetails<FileNode>) => void;
    selectionChange: (details: TreeViewSelectionChangeDetails<FileNode>) => void;
  } = $props();
  let selectedValue: string[] = $state([]);
  let focusedValue: string | undefined = $state();

  export const read = () => ({ focusedValue, selectedValue });
</script>

<TreeView
  bind:selectedValue
  bind:focusedValue
  {collection}
  onSelectionChange={selectionChange}
  onFocusChange={focusChange}
>
  <TreeParts {collection} />
</TreeView>