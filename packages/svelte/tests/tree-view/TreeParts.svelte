<script lang="ts">
  import { TreeViewLabel, TreeViewTree, type TreeCollection } from '@/components/tree-view';
  import type { FileNode } from './files';
  import FileTreeNode from './FileTreeNode.svelte';

  let { collection }: { collection: TreeCollection<FileNode> } = $props();
</script>

<TreeViewLabel>Project files</TreeViewLabel>
<TreeViewTree>
  {#each collection.rootNode.children ?? [] as node, index (node.id)}
    <FileTreeNode {node} indexPath={[index]} />
  {/each}
</TreeViewTree>