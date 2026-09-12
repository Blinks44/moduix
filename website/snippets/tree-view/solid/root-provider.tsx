import { Button } from '@moduix/solid/button';
import {
  TreeView,
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
    <TreeView.Node node={props.node} indexPath={props.indexPath}>
      {({ node: currentNode, indexPath: currentIndexPath, state }) => (
        <Show
          when={state().isBranch}
          fallback={
            <TreeView.Item>
              <TreeView.ItemText>{currentNode.name}</TreeView.ItemText>
            </TreeView.Item>
          }
        >
          <TreeView.Branch>
            <TreeView.BranchControl>
              <TreeView.BranchIndicator />
              <TreeView.BranchText>{currentNode.name}</TreeView.BranchText>
            </TreeView.BranchControl>
            <TreeView.BranchContent>
              <TreeView.BranchIndentGuide />
              <For each={currentNode.children ?? []}>
                {(child, index) => (
                  <FileTreeNode node={child} indexPath={[...currentIndexPath, index()]} />
                )}
              </For>
            </TreeView.BranchContent>
          </TreeView.Branch>
        </Show>
      )}
    </TreeView.Node>
  );
}

export default function RootProviderTreeViewDemo() {
  const treeView = useTreeView({ collection, defaultExpandedValue: ['src'] });

  return (
    <div class={styles.root}>
      <TreeView.RootProvider value={treeView}>
        <TreeView.Label>Project files</TreeView.Label>
        <TreeView.Tree>
          <For each={collection.rootNode.children ?? []}>
            {(node, index) => <FileTreeNode node={node} indexPath={[index()]} />}
          </For>
        </TreeView.Tree>
      </TreeView.RootProvider>
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