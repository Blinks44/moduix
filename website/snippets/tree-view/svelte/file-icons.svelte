<script lang="ts">
  import {
    TreeView,
    TreeViewLabel,
    TreeViewTree,
    createTreeCollection,
  } from '@moduix/svelte/tree-view';
  import FileIconsTreeNode from './FileIconsTreeNode.svelte';

  type FileNode = {
    children?: FileNode[];
    id: string;
    name: string;
  };

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
            {
              id: 'src/components',
              name: 'components',
              children: [
                { id: 'src/components/Button.tsx', name: 'Button.tsx' },
                { id: 'src/components/Tree.tsx', name: 'Tree.tsx' },
              ],
            },
            { id: 'src/main.tsx', name: 'main.tsx' },
          ],
        },
        {
          id: 'public',
          name: 'public',
          children: [{ id: 'public/logo.svg', name: 'logo.svg' }],
        },
        { id: 'README.md', name: 'README.md' },
        { id: 'package.json', name: 'package.json' },
      ],
    },
  });
</script>

<TreeView {collection} defaultExpandedValue={['src', 'src/components']}>
  <TreeViewLabel>Project files</TreeViewLabel>
  <TreeViewTree>
    {#each collection.rootNode.children ?? [] as node, index (node.id)}
      <FileIconsTreeNode {node} indexPath={[index]} />
    {/each}
  </TreeViewTree>
</TreeView>