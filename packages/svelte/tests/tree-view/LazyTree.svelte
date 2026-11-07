<script lang="ts">
  import { TreeView, TreeViewLabel, TreeViewTree } from '@/components/tree-view';
  import type { TreeViewLoadChildrenCompleteDetails } from '@/components/tree-view';
  import { createFileCollection, type FileNode } from './files';
  import FileTreeNode from './FileTreeNode.svelte';

  let {
    complete,
    loadChildren,
  }: {
    complete: (details: TreeViewLoadChildrenCompleteDetails<FileNode>) => void;
    loadChildren: () => Promise<FileNode[]>;
  } = $props();
  let lazyCollection = $state.raw(
    createFileCollection([{ id: 'src', name: 'src', childrenCount: 1 }]),
  );

  export const getCollection = () => lazyCollection;
</script>

<TreeView
  collection={lazyCollection}
  {loadChildren}
  onLoadChildrenComplete={(details) => {
    lazyCollection = details.collection;
    complete(details);
  }}
>
  <TreeViewLabel>Lazy files</TreeViewLabel>
  <TreeViewTree>
    {#each lazyCollection.rootNode.children ?? [] as node, index (node.id)}
      <FileTreeNode {node} indexPath={[index]} />
    {/each}
  </TreeViewTree>
</TreeView>