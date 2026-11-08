<script lang="ts">
  import { Stack } from '@moduix/svelte/stack';
  import {
    TreeView,
    TreeViewItem,
    TreeViewItemText,
    TreeViewLabel,
    TreeViewTree,
    TreeViewNode,
    createTreeCollection,
  } from '@moduix/svelte/tree-view';

  type FileNode = { children?: FileNode[]; id: string; name: string };

  const collection = createTreeCollection<FileNode>({
    nodeToString: (node) => node.name,
    nodeToValue: (node) => node.id,
    rootNode: {
      id: 'ROOT',
      name: '',
      children: [
        { id: 'eslint.config.js', name: 'eslint.config.js' },
        { id: 'package.json', name: 'package.json' },
        { id: 'README.md', name: 'README.md' },
        { id: 'src/App.tsx', name: 'App.tsx' },
        { id: 'src/main.tsx', name: 'main.tsx' },
        { id: 'tsconfig.json', name: 'tsconfig.json' },
      ],
    },
  });

  let selectedValue = $state<string[]>(['package.json']);
</script>

<Stack align="center" gap="3">
  <TreeView bind:selectedValue {collection} selectionMode="multiple">
    <TreeViewLabel>Selected files</TreeViewLabel>
    <TreeViewTree>
      {#each collection.rootNode.children ?? [] as node, index (node.id)}
        <TreeViewNode {node} indexPath={[index]}>
          {#snippet children({ node: currentNode })}
            <TreeViewItem>
              <TreeViewItemText>{currentNode.name}</TreeViewItemText>
            </TreeViewItem>
          {/snippet}
        </TreeViewNode>
      {/each}
    </TreeViewTree>
  </TreeView>
  <output aria-live="polite">Selected: {selectedValue.join(', ') || 'none'}</output>
</Stack>