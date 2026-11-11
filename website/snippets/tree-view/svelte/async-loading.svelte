<script lang="ts">
  import {
    TreeView,
    TreeViewLabel,
    TreeViewTree,
    createTreeCollection,
  } from '@moduix/svelte/tree-view';
  import type { TreeViewLoadChildrenDetails } from '@moduix/svelte/tree-view';
  import AsyncLoadingTreeNode from './AsyncLoadingTreeNode.svelte';

  type FileNode = {
    children?: FileNode[];
    childrenCount?: number;
    id: string;
    name: string;
  };

  const initialCollection = createTreeCollection<FileNode>({
    nodeToString: (node) => node.name,
    nodeToValue: (node) => node.id,
    rootNode: {
      id: 'ROOT',
      name: '',
      children: [
        { id: 'src', name: 'src', childrenCount: 3 },
        { id: 'public', name: 'public', childrenCount: 2 },
        { id: 'package.json', name: 'package.json' },
      ],
    },
  });

  const childrenByValue: Record<string, FileNode[]> = {
    src: [
      { id: 'src/App.tsx', name: 'App.tsx' },
      { id: 'src/main.tsx', name: 'main.tsx' },
      { id: 'src/styles.css', name: 'styles.css' },
    ],
    public: [
      { id: 'public/favicon.svg', name: 'favicon.svg' },
      { id: 'public/logo.svg', name: 'logo.svg' },
    ],
  };

  function loadChildren({ valuePath }: TreeViewLoadChildrenDetails<FileNode>) {
    return new Promise<FileNode[]>((resolve) => {
      window.setTimeout(() => resolve(childrenByValue[valuePath.join('/')] ?? []), 350);
    });
  }

  let collection = $state.raw(initialCollection);
</script>

<TreeView
  {collection}
  {loadChildren}
  onLoadChildrenComplete={(details) => (collection = details.collection)}
>
  <TreeViewLabel>Lazy folders</TreeViewLabel>
  <TreeViewTree>
    {#each collection.rootNode.children ?? [] as node, index (node.id)}
      <AsyncLoadingTreeNode {node} indexPath={[index]} />
    {/each}
  </TreeViewTree>
</TreeView>