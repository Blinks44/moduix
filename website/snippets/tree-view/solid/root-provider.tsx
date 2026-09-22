import {
  Button,
} from '@moduix/solid/button';
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
  TreeViewNode,
  TreeViewRootProvider,
  TreeViewTree,
  createTreeCollection,
  type TreeViewNodeProviderProps,
  useTreeView,
} from '@moduix/solid/tree-view';
import { For, Show } from 'solid-js';
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

function FileTreeNode(props: TreeViewNodeProviderProps<FileNode>) {
  return (
    <TreeViewNode node={props.node} indexPath={props.indexPath}>
      {({ node: currentNode, indexPath: currentIndexPath, state }) => (
        <Show
          when={state().isBranch}
          fallback={
            <TreeViewItem>
              <TreeViewItemText>{currentNode.name}</TreeViewItemText>
            </TreeViewItem>
          }
        >
          <TreeViewBranch>
            <TreeViewBranchControl>
              <TreeViewBranchIndicator />
              <TreeViewBranchText>{currentNode.name}</TreeViewBranchText>
            </TreeViewBranchControl>
            <TreeViewBranchContent>
              <TreeViewBranchIndentGuide />
              <For each={currentNode.children ?? []}>
                {(child, index) => (
                  <FileTreeNode node={child} indexPath={[...currentIndexPath, index()]} />
                )}
              </For>
            </TreeViewBranchContent>
          </TreeViewBranch>
        </Show>
      )}
    </TreeViewNode>
  );
}

export default function RootProviderTreeViewDemo() {
  const treeView = useTreeView({ collection, defaultExpandedValue: ['src'] });

  return (
    <div class={styles.root}>
      <TreeViewRootProvider value={treeView}>
        <TreeViewLabel>Project files</TreeViewLabel>
        <TreeViewTree>
          <For each={collection.rootNode.children ?? []}>
            {(node, index) => <FileTreeNode node={node} indexPath={[index()]} />}
          </For>
        </TreeViewTree>
      </TreeViewRootProvider>
      <output aria-live="polite">Expanded: {treeView().expandedValue.join(', ') || 'none'}</output>
      <div class={styles.actions}>
        <Button variant="outline" onClick={() => treeView().expand()}>
          Expand all
        </Button>
        <Button variant="outline" onClick={() => treeView().collapse()}>
          Collapse all
        </Button>
      </div>
    </div>
  );
}
