import {
  TreeViewTree,
  TreeViewLabel,
  TreeViewItemText,
  TreeViewItem,
  TreeViewBranchIndentGuide,
  TreeViewBranchContent,
  TreeViewBranchText,
  TreeViewNodeCheckboxIndicator,
  TreeViewNodeCheckbox,
  TreeViewBranchIndicator,
  TreeViewBranchControl,
  TreeViewBranch,
  TreeViewNode,
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
    <TreeViewNode node={node} indexPath={indexPath}>
      {({ node: currentNode, indexPath: currentIndexPath, state }) =>
        state.isBranch ? (
          <TreeViewBranch>
            <TreeViewBranchControl>
              <TreeViewBranchIndicator />
              <TreeViewNodeCheckbox>
                <TreeViewNodeCheckboxIndicator />
              </TreeViewNodeCheckbox>
              <TreeViewBranchText>{currentNode.name}</TreeViewBranchText>
            </TreeViewBranchControl>
            <TreeViewBranchContent>
              <TreeViewBranchIndentGuide />
              {currentNode.children?.map((child, index) => (
                <FileTreeNode
                  key={child.id}
                  node={child}
                  indexPath={[...currentIndexPath, index]}
                />
              ))}
            </TreeViewBranchContent>
          </TreeViewBranch>
        ) : (
          <TreeViewItem>
            <TreeViewNodeCheckbox>
              <TreeViewNodeCheckboxIndicator />
            </TreeViewNodeCheckbox>
            <TreeViewItemText>{currentNode.name}</TreeViewItemText>
          </TreeViewItem>
        )
      }
    </TreeViewNode>
  );
}

export default function CheckboxTreeViewDemo() {
  return (
    <TreeView
      collection={collection}
      defaultCheckedValue={['src/App.tsx', 'config/vite.ts']}
      defaultExpandedValue={['src']}
    >
      <TreeViewLabel>Checked files</TreeViewLabel>
      <TreeViewTree>
        {collection.rootNode.children?.map((node, index) => (
          <FileTreeNode key={node.id} node={node} indexPath={[index]} />
        ))}
      </TreeViewTree>
    </TreeView>
  );
}
