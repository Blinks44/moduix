<script lang="ts">
  import {
    TreeView,
    TreeViewLabel,
    TreeViewTree,
    createTreeCollection,
  } from '@moduix/svelte/tree-view';
  import LinksTreeNode from './LinksTreeNode.svelte';

  type LinkNode = {
    children?: LinkNode[];
    href?: string;
    id: string;
    name: string;
  };

  const collection = createTreeCollection<LinkNode>({
    nodeToString: (node) => node.name,
    nodeToValue: (node) => node.id,
    rootNode: {
      id: 'ROOT',
      name: '',
      children: [
        {
          id: 'docs',
          name: 'docs',
          children: [
            { id: 'docs/getting-started', name: 'getting-started.mdx', href: '/docs' },
            { id: 'docs/tree-view', name: 'tree-view.mdx', href: '/docs/tree-view' },
            {
              id: 'docs/guides',
              name: 'guides',
              children: [
                { id: 'docs/guides/styling', name: 'styling.mdx', href: '/docs' },
                { id: 'docs/guides/testing', name: 'testing.mdx', href: '/docs' },
              ],
            },
          ],
        },
        { id: 'CHANGELOG.md', name: 'CHANGELOG.md', href: '/docs' },
      ],
    },
  });
</script>

<TreeView {collection} defaultExpandedValue={['docs', 'docs/guides']}>
  <TreeViewLabel>Documentation</TreeViewLabel>
  <TreeViewTree>
    {#each collection.rootNode.children ?? [] as node, index (node.id)}
      <LinksTreeNode {node} indexPath={[index]} />
    {/each}
  </TreeViewTree>
</TreeView>