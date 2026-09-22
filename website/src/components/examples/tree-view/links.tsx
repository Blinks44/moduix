import {
  TreeViewTree,
  TreeViewLabel,
  TreeViewItem,
  TreeViewBranchIndentGuide,
  TreeViewBranchContent,
  TreeViewBranchText,
  TreeViewBranchIndicator,
  TreeViewBranchControl,
  TreeViewBranch,
  TreeViewNode,
  TreeView,
  createTreeCollection,
  type TreeViewNodeProviderProps,
} from '@moduix/react/tree-view';

type LinkNode = { children?: LinkNode[]; href?: string; id: string; name: string };

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

function LinkTreeNode({ node, indexPath }: TreeViewNodeProviderProps<LinkNode>) {
  return (
    <TreeViewNode node={node} indexPath={indexPath}>
      {({ node: currentNode, indexPath: currentIndexPath, state }) =>
        state.isBranch ? (
          <TreeViewBranch>
            <TreeViewBranchControl>
              <TreeViewBranchIndicator />
              <TreeViewBranchText>{currentNode.name}</TreeViewBranchText>
            </TreeViewBranchControl>
            <TreeViewBranchContent>
              <TreeViewBranchIndentGuide />
              {currentNode.children?.map((child, index) => (
                <LinkTreeNode
                  key={child.id}
                  node={child}
                  indexPath={[...currentIndexPath, index]}
                />
              ))}
            </TreeViewBranchContent>
          </TreeViewBranch>
        ) : (
          <TreeViewItem asChild>
            <a href={currentNode.href}>{currentNode.name}</a>
          </TreeViewItem>
        )
      }
    </TreeViewNode>
  );
}

export default function LinkedTreeViewDemo() {
  return (
    <TreeView collection={collection} defaultExpandedValue={['docs', 'docs/guides']}>
      <TreeViewLabel>Documentation</TreeViewLabel>
      <TreeViewTree>
        {collection.rootNode.children?.map((node, index) => (
          <LinkTreeNode key={node.id} node={node} indexPath={[index]} />
        ))}
      </TreeViewTree>
    </TreeView>
  );
}
