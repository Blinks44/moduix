<script lang="ts">
  import { TreeView, TreeViewLabel, TreeViewTree } from '@/components/tree-view';
  import type {
    TreeViewLoadChildrenCompleteDetails,
    TreeViewLoadChildrenErrorDetails,
  } from '@/components/tree-view';
  import { createFileCollection, type FileNode } from './files';
  import FileTreeNode from './FileTreeNode.svelte';

  let {
    complete,
    failed,
    loadChildren,
  }: {
    complete: (details: TreeViewLoadChildrenCompleteDetails<FileNode>) => void;
    failed: (details: TreeViewLoadChildrenErrorDetails<FileNode>) => void;
    loadChildren: () => Promise<FileNode[]>;
  } = $props();
  const lazyCollection = createFileCollection([{ id: 'src', name: 'src', childrenCount: 1 }]);

  export const getCollection = () => lazyCollection;
</script>

<TreeView
  collection={lazyCollection}
  {loadChildren}
  onLoadChildrenError={failed}
  onLoadChildrenComplete={complete}
>
  <TreeViewLabel>Lazy files</TreeViewLabel>
  <TreeViewTree>
    {#each lazyCollection.rootNode.children ?? [] as node, index (node.id)}
      <FileTreeNode {node} indexPath={[index]} />
    {/each}
  </TreeViewTree>
</TreeView>