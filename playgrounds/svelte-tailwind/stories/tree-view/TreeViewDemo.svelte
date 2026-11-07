<script lang="ts">
  import {
    TreeView,
    TreeViewLabel,
    TreeViewTree,
    type TreeCollection,
  } from '@/components/tree-view';
  import { collection as defaultCollection, type FileNode } from './files';
  import FileTreeNode from './FileTreeNode.svelte';

  let { collection = defaultCollection }: { collection?: TreeCollection<FileNode> } = $props();
</script>

<TreeView {collection} defaultExpandedValue={['src', 'configuration']} class="w-full max-w-88">
  <TreeViewLabel>Project files</TreeViewLabel>
  <TreeViewTree>
    {#each collection.rootNode.children ?? [] as node, index (node.id)}
      <FileTreeNode {node} indexPath={[index]} />
    {/each}
  </TreeViewTree>
</TreeView>