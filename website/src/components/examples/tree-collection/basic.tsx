import {
  TreeViewTree,
  TreeViewLabel,
  TreeViewItemText,
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
    <TreeViewNode node={node} indexPath={indexPath}>
      {({ node: currentNode, indexPath: currentIndexPath, state }) =>
        state.isBranch ? (
          <TreeViewBranch>
            <TreeViewBranchControl>
              <TreeViewBranchIndicator />
              <TreeViewBranchText>{currentNode.label}</TreeViewBranchText>
            </TreeViewBranchControl>
            <TreeViewBranchContent>
              <TreeViewBranchIndentGuide />
              {currentNode.children?.map((child, index) => (
                <FileTreeNode
                  key={child.value}
                  node={child}
                  indexPath={[...currentIndexPath, index]}
                />
              ))}
            </TreeViewBranchContent>
          </TreeViewBranch>
        ) : (
          <TreeViewItem>
            <TreeViewItemText>{currentNode.label}</TreeViewItemText>
          </TreeViewItem>
        )
      }
    </TreeViewNode>
  );
}

export default function TreeViewBasicDemo() {
  return (
    <TreeView collection={collection} defaultExpandedValue={['src', 'src/components']}>
      <TreeViewLabel>Project files</TreeViewLabel>
      <TreeViewTree>
        {collection.rootNode.children?.map((node, index) => (
          <FileTreeNode key={node.value} node={node} indexPath={[index]} />
        ))}
      </TreeViewTree>
    </TreeView>
  );
}