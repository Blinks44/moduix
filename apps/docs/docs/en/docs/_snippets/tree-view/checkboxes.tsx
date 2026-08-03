import {
  TreeView,
  createTreeCollection,
  type TreeViewNodeProviderProps,
} from '@moduix/react/tree-view';

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

function FileTreeNode({ node, indexPath }: TreeViewNodeProviderProps<FileNode>) {
  return (
    <TreeView.Node node={node} indexPath={indexPath}>
      {({ node: currentNode, indexPath: currentIndexPath, state }) =>
        state.isBranch ? (
          <TreeView.Branch>
            <TreeView.BranchControl>
              <TreeView.BranchIndicator />
              <TreeView.NodeCheckbox>
                <TreeView.NodeCheckboxIndicator />
              </TreeView.NodeCheckbox>
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
            <TreeView.NodeCheckbox>
              <TreeView.NodeCheckboxIndicator />
            </TreeView.NodeCheckbox>
            <TreeView.ItemText>{currentNode.name}</TreeView.ItemText>
          </TreeView.Item>
        )
      }
    </TreeView.Node>
  );
}

export default function CheckboxTreeViewDemo() {
  return (
    <TreeView
      collection={collection}
      defaultCheckedValue={['src/App.tsx', 'config/vite.ts']}
      defaultExpandedValue={['src']}
    >
      <TreeView.Label>Checked files</TreeView.Label>
      <TreeView.Tree>
        {collection.rootNode.children?.map((node, index) => (
          <FileTreeNode key={node.id} node={node} indexPath={[index]} />
        ))}
      </TreeView.Tree>
    </TreeView>
  );
}