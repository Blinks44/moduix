<script lang="ts">
  import {
    TreeView,
    TreeViewItem,
    TreeViewItemText,
    TreeViewLabel,
    TreeViewNode,
    TreeViewNodeCheckbox,
    TreeViewNodeCheckboxIndicator,
    TreeViewTree,
  } from '@/components/tree-view';
  import { collection } from '../tree-view/files';
  import FileTreeNode from '../tree-view/FileTreeNode.svelte';

  let expandedValue = $state<string[]>([]);
  let selectedValue = $state<string[]>([]);
  let focusedValue = $state<string | undefined>();
  let checkedValue = $state<string[]>([]);

  export const write = (
    key: 'expandedValue' | 'selectedValue' | 'focusedValue' | 'checkedValue',
  ) => {
    if (key === 'expandedValue') expandedValue = ['src'];
    if (key === 'selectedValue') selectedValue = ['README.md'];
    if (key === 'focusedValue') focusedValue = 'README.md';
    if (key === 'checkedValue') checkedValue = ['README.md'];
  };
  export const read = () => ({ expandedValue, selectedValue, focusedValue, checkedValue });
</script>

<TreeView bind:expandedValue bind:selectedValue bind:focusedValue bind:checkedValue {collection}>
  <TreeViewLabel>Project files</TreeViewLabel>
  <TreeViewTree>
    <FileTreeNode node={collection.rootNode.children![0]!} indexPath={[0]} />
    <TreeViewNode node={collection.rootNode.children![1]!} indexPath={[1]}>
      {#snippet children({ node })}
        <TreeViewItem>
          <TreeViewNodeCheckbox aria-label="Check README">
            <TreeViewNodeCheckboxIndicator />
          </TreeViewNodeCheckbox>
          <TreeViewItemText>{node.name}</TreeViewItemText>
        </TreeViewItem>
      {/snippet}
    </TreeViewNode>
  </TreeViewTree>
</TreeView>