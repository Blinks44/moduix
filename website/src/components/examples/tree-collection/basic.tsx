import {
  TreeView,
  createTreeCollection,
  type TreeViewNodeProviderProps,
} from '@moduix/react/tree-view';

type FileNode = {
  children?: FileNode[];
  label: string;
  value: string;
};

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

function FileTreeNode({ node, indexPath }: TreeViewNodeProviderProps<FileNode>) {
  return (
    <TreeView.Node node={node} indexPath={indexPath}>
      {({ node: currentNode, indexPath: currentIndexPath, state }) =>
        state.isBranch ? (
          <TreeView.Branch>
            <TreeView.BranchControl>
              <TreeView.BranchIndicator />
              <TreeView.BranchText>{currentNode.label}</TreeView.BranchText>
            </TreeView.BranchControl>
            <TreeView.BranchContent>
              <TreeView.BranchIndentGuide />
              {currentNode.children?.map((child, index) => (
                <FileTreeNode
                  key={child.value}
                  node={child}
                  indexPath={[...currentIndexPath, index]}
                />
              ))}
            </TreeView.BranchContent>
          </TreeView.Branch>
        ) : (
          <TreeView.Item>
            <TreeView.ItemText>{currentNode.label}</TreeView.ItemText>
          </TreeView.Item>
        )
      }
    </TreeView.Node>
  );
}

export default function TreeViewBasicDemo() {
  return (
    <TreeView collection={collection} defaultExpandedValue={['src', 'src/components']}>
      <TreeView.Label>Project files</TreeView.Label>
      <TreeView.Tree>
        {collection.rootNode.children?.map((node, index) => (
          <FileTreeNode key={node.value} node={node} indexPath={[index]} />
        ))}
      </TreeView.Tree>
    </TreeView>
  );
}