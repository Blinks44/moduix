import { Button } from '@moduix/react/button';
import {
  TreeViewBranch,
  TreeViewBranchContent,
  TreeViewBranchControl,
  TreeViewBranchIndicator,
  TreeViewBranchIndentGuide,
  TreeViewBranchText,
  TreeViewItem,
  TreeViewItemText,
  TreeViewLabel,
  TreeViewNodeContext,
  TreeViewNodeProvider,
  TreeViewRootProvider,
  TreeViewTree,
  createTreeCollection,
  type TreeViewNodeProviderProps,
  useTreeView,
} from '@moduix/react/tree-view';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/tree-view/tree-view-root-provider.module.css';

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
    <TreeViewNodeProvider node={node} indexPath={indexPath}>
      <TreeViewNodeContext>
        {(state) =>
          state.isBranch ? (
            <TreeViewBranch>
              <TreeViewBranchControl>
                <TreeViewBranchIndicator />
                <TreeViewBranchText>{node.name}</TreeViewBranchText>
              </TreeViewBranchControl>
              <TreeViewBranchContent>
                <TreeViewBranchIndentGuide />
                {node.children?.map((child, index) => (
                  <FileTreeNode key={child.id} node={child} indexPath={[...indexPath, index]} />
                ))}
              </TreeViewBranchContent>
            </TreeViewBranch>
          ) : (
            <TreeViewItem>
              <TreeViewItemText>{node.name}</TreeViewItemText>
            </TreeViewItem>
          )
        }
      </TreeViewNodeContext>
    </TreeViewNodeProvider>
  );
}

export default function RootProviderTreeViewDemo() {
  const treeView = useTreeView({ collection, defaultExpandedValue: ['src'] });

  return (
    <div className={styles.root}>
      <TreeViewRootProvider value={treeView}>
        <TreeViewLabel>Project files</TreeViewLabel>
        <TreeViewTree>
          {collection.rootNode.children?.map((node, index) => (
            <FileTreeNode key={node.id} node={node} indexPath={[index]} />
          ))}
        </TreeViewTree>
      </TreeViewRootProvider>
      <PreviewMeta>
        <output aria-live="polite">Expanded: {treeView.expandedValue.join(', ') || 'none'}</output>
        <div className={styles.actions}>
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