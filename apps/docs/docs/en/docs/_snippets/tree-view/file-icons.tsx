import {
  TreeView,
  createTreeCollection,
  type TreeViewNodeProviderProps,
} from '@moduix/react/tree-view';
import { File as FileIcon, Folder as FolderIcon, FolderOpen as FolderOpenIcon } from 'lucide-react';

type FileNode = {
  children?: FileNode[];
  id: string;
  name: string;
};

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
          {
            id: 'src/components',
            name: 'components',
            children: [
              { id: 'src/components/Button.tsx', name: 'Button.tsx' },
              { id: 'src/components/Tree.tsx', name: 'Tree.tsx' },
            ],
          },
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
              <TreeView.BranchText>
                {state.expanded ? <FolderOpenIcon aria-hidden /> : <FolderIcon aria-hidden />}
                {currentNode.name}
              </TreeView.BranchText>
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
            <TreeView.ItemText>
              <FileIcon aria-hidden />
              {currentNode.name}
            </TreeView.ItemText>
          </TreeView.Item>
        )
      }
    </TreeView.Node>
  );
}

export default function FileIconsTreeViewDemo() {
  return (
    <TreeView collection={collection} defaultExpandedValue={['src', 'src/components']}>
      <TreeView.Label>Project files</TreeView.Label>
      <TreeView.Tree>
        {collection.rootNode.children?.map((node, index) => (
          <FileTreeNode key={node.id} node={node} indexPath={[index]} />
        ))}
      </TreeView.Tree>
    </TreeView>
  );
}