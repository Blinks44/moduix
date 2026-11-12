<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import { Stack } from '@moduix/svelte/stack';
  import {
    TreeViewLabel,
    TreeViewRootProvider,
    TreeViewTree,
    createTreeCollection,
    useTreeView,
  } from '@moduix/svelte/tree-view';
  import RootProviderTreeNode from './RootProviderTreeNode.svelte';

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

  const id = $props.id();
  const treeView = useTreeView({ id, collection, defaultExpandedValue: ['src'] });
</script>

<Stack align="center" gap="3">
  <TreeViewRootProvider value={treeView}>
    <TreeViewLabel>Project files</TreeViewLabel>
    <TreeViewTree>
      {#each collection.rootNode.children ?? [] as node, index (node.id)}
        <RootProviderTreeNode {node} indexPath={[index]} />
      {/each}
    </TreeViewTree>
  </TreeViewRootProvider>
  <div data-preview-meta>
    <output aria-live="polite">Expanded: {treeView().expandedValue.join(', ') || 'none'}</output>
    <Stack direction="row" gap="2">
      <Button variant="outline" onclick={() => treeView().expand()}>Expand all</Button>
      <Button variant="outline" onclick={() => treeView().collapse()}>Collapse all</Button>
    </Stack>
  </div>
</Stack>