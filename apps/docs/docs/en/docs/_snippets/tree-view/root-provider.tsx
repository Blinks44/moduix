import { Button } from '@moduix/react/button';
import {
  TreeView,
  createTreeCollection,
  type TreeViewNodeProviderProps,
  useTreeView,
} from '@moduix/react/tree-view';
import { PreviewMeta } from '@/components/mdx/Components';

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

function FileTreeNode({ node, indexPath }: TreeViewNodeProviderProps<FileNode>) {
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
                <FileTreeNode
                  key={child.id}
                  node={child}
                  indexPath={[...currentIndexPath, index]}
                />
              ))}
            </TreeView.BranchContent>
          </TreeView.Branch>
        ) : (
          <TreeView.Item>
            <TreeView.ItemText>{currentNode.name}</TreeView.ItemText>
          </TreeView.Item>
        )
      }
    </TreeView.Node>
  );
}

export default function RootProviderTreeViewDemo() {
  const treeView = useTreeView({ collection, defaultExpandedValue: ['src'] });

  return (
    <div style={{ display: 'grid', gap: '0.75rem', justifyItems: 'center' }}>
      <TreeView.RootProvider value={treeView}>
        <TreeView.Label>Project files</TreeView.Label>
        <TreeView.Tree>
          {collection.rootNode.children?.map((node, index) => (
            <FileTreeNode key={node.id} node={node} indexPath={[index]} />
          ))}
        </TreeView.Tree>
      </TreeView.RootProvider>
      <PreviewMeta
        style={{
          display: 'grid',
          gap: '0.5rem',
          justifyItems: 'center',
        }}
      >
        <output aria-live="polite">Expanded: {treeView.expandedValue.join(', ') || 'none'}</output>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button variant="outline" onClick={() => treeView.expand()}>
            Expand all
          </Button>
          <Button variant="outline" onClick={() => treeView.collapse()}>
            Collapse all
          </Button>
        </div>
      </PreviewMeta>
    </div>
  );
}