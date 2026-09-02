import {
  TreeView,
  createTreeCollection,
  type TreeViewLoadChildrenDetails,
  type TreeViewNodeProviderProps,
} from '@moduix/react/tree-view';
import { useState } from 'react';

type FileNode = {
  children?: FileNode[];
  childrenCount?: number;
  id: string;
  name: string;
};

const initialCollection = createTreeCollection<FileNode>({
  nodeToString: (node) => node.name,
  nodeToValue: (node) => node.id,
  rootNode: {
    id: 'ROOT',
    name: '',
    children: [
      { id: 'src', name: 'src', childrenCount: 3 },
      { id: 'public', name: 'public', childrenCount: 2 },
      { id: 'package.json', name: 'package.json' },
    ],
  },
});

const childrenByValue: Record<string, FileNode[]> = {
  src: [
    { id: 'src/App.tsx', name: 'App.tsx' },
    { id: 'src/main.tsx', name: 'main.tsx' },
    { id: 'src/styles.css', name: 'styles.css' },
  ],
  public: [
    { id: 'public/favicon.svg', name: 'favicon.svg' },
    { id: 'public/logo.svg', name: 'logo.svg' },
  ],
};

function loadChildren({ valuePath }: TreeViewLoadChildrenDetails<FileNode>) {
  return new Promise<FileNode[]>((resolve) => {
    window.setTimeout(() => resolve(childrenByValue[valuePath.join('/')] ?? []), 350);
  });
}

function FileTreeNode({ node, indexPath }: TreeViewNodeProviderProps<FileNode>) {
  return (
    <TreeView.Node node={node} indexPath={indexPath}>
      {({ node: currentNode, indexPath: currentIndexPath, state }) =>
        state.isBranch ? (
          <TreeView.Branch>
            <TreeView.BranchControl>
              <TreeView.BranchIndicator />
              <TreeView.BranchText>
                {state.loading ? 'Loading…' : currentNode.name}
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
            <TreeView.ItemText>{currentNode.name}</TreeView.ItemText>
          </TreeView.Item>
        )
      }
    </TreeView.Node>
  );
}

export default function AsyncTreeViewDemo() {
  const [collection, setCollection] = useState(initialCollection);

  return (
    <TreeView
      collection={collection}
      loadChildren={loadChildren}
      onLoadChildrenComplete={(details) => setCollection(details.collection)}
    >
      <TreeView.Label>Lazy folders</TreeView.Label>
      <TreeView.Tree>
        {collection.rootNode.children?.map((node, index) => (
          <FileTreeNode key={node.id} node={node} indexPath={[index]} />
        ))}
      </TreeView.Tree>
    </TreeView>
  );
}