<script lang="ts">
  import {
    TreeView,
    TreeViewLabel,
    TreeViewTree,
    createTreeCollection,
  } from '@moduix/svelte/tree-view';
  import CheckboxesTreeNode from './CheckboxesTreeNode.svelte';

  type FileNode = { children?: FileNode[]; id: string; name: string };

  const collection = createTreeCollection<FileNode>({
    nodeToString: (node) => node.name,
    nodeToValue: (node) => node.id,
    rootNode: {
      id: 'ROOT',
      name: '',
      children: [
        {
          id: 'src',
          name: 'src',
          children: [
            { id: 'src/App.tsx', name: 'App.tsx' },
            { id: 'src/main.tsx', name: 'main.tsx' },
            { id: 'src/styles.css', name: 'styles.css' },
          ],
        },
        {
          id: 'config',
          name: 'config',
          children: [
            { id: 'config/vite.ts', name: 'vite.ts' },
            { id: 'config/tsconfig.json', name: 'tsconfig.json' },
          ],
        },
        { id: 'README.md', name: 'README.md' },
      ],
    },
  });
</script>

<TreeView
  {collection}
  defaultCheckedValue={['src/App.tsx', 'config/vite.ts']}
  defaultExpandedValue={['src']}
>
  <TreeViewLabel>Checked files</TreeViewLabel>
  <TreeViewTree>
    {#each collection.rootNode.children ?? [] as node, index (node.id)}
      <CheckboxesTreeNode {node} indexPath={[index]} />
    {/each}
  </TreeViewTree>
</TreeView>