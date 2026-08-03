import {
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
    <TreeView.Node node={node} indexPath={indexPath}>
      {({ node: currentNode, indexPath: currentIndexPath, state }) =>
        state.isBranch ? (
          <TreeView.Branch>
            <TreeView.BranchControl>
              <TreeView.BranchIndicator />
              <TreeView.BranchText>{currentNode.name}</TreeView.BranchText>
            </TreeView.BranchControl>
            <TreeView.BranchContent>
              <TreeView.BranchIndentGuide />
              {currentNode.children?.map((child, index) => (
                <LinkTreeNode
                  key={child.id}
                  node={child}
                  indexPath={[...currentIndexPath, index]}
                />
              ))}
            </TreeView.BranchContent>
          </TreeView.Branch>
        ) : (
          <TreeView.Item asChild>
            <a href={currentNode.href}>{currentNode.name}</a>
          </TreeView.Item>
        )
      }
    </TreeView.Node>
  );
}

export default function LinkedTreeViewDemo() {
  return (
    <TreeView collection={collection} defaultExpandedValue={['docs', 'docs/guides']}>
      <TreeView.Label>Documentation</TreeView.Label>
      <TreeView.Tree>
        {collection.rootNode.children?.map((node, index) => (
          <LinkTreeNode key={node.id} node={node} indexPath={[index]} />
        ))}
      </TreeView.Tree>
    </TreeView>
  );
}