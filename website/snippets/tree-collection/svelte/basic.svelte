<script lang="ts">
  import {
    TreeView,
    TreeViewLabel,
    TreeViewTree,
    createTreeCollection,
  } from '@moduix/svelte/tree-view';
  import FileTreeNode from './FileTreeNode.svelte';

  type FileNode = { children?: FileNode[]; label: string; value: string };

  const collection = createTreeCollection<FileNode>({
    rootNode: {
      label: '',
      value: 'ROOT',
      children: [
        {
          label: 'src',
          value: 'src',
          children: [
            { label: 'App.tsx', value: 'src/App.tsx' },
            {
              label: 'components',
              value: 'src/components',
              children: [
                { label: 'Button.tsx', value: 'src/components/Button.tsx' },
                { label: 'Tree.tsx', value: 'src/components/Tree.tsx' },
              ],
            },
            { label: 'main.tsx', value: 'src/main.tsx' },
          ],
        },
        {
          label: 'public',
          value: 'public',
          children: [{ label: 'logo.svg', value: 'public/logo.svg' }],
        },
        { label: 'README.md', value: 'README.md' },
        { label: 'package.json', value: 'package.json' },
      ],
    },
  });
</script>

<TreeView {collection} defaultExpandedValue={['src', 'src/components']}>
  <TreeViewLabel>Project files</TreeViewLabel>
  <TreeViewTree>
    {#each collection.rootNode.children ?? [] as node, index (node.value)}
      <FileTreeNode {node} indexPath={[index]} />
    {/each}
  </TreeViewTree>
</TreeView>