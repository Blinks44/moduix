import {
  TreeView,
  createTreeCollection,
  type TreeViewLoadChildrenDetails,
  type TreeViewNodeProviderProps,
} from '@moduix/solid/tree-view';
import { createSignal, For, Show } from 'solid-js';

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
              <TreeView.BranchText>
                {state().loading ? 'Loading…' : currentNode.name}
              </TreeView.BranchText>
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

export default function AsyncTreeViewDemo() {
  const [collection, setCollection] = createSignal(initialCollection);

  return (
    <TreeView
      collection={collection()}
      loadChildren={loadChildren}
      onLoadChildrenComplete={(details) => setCollection(details.collection)}
    >
      <TreeView.Label>Lazy folders</TreeView.Label>
      <TreeView.Tree>
        <For each={collection().rootNode.children ?? []}>
          {(node, index) => <FileTreeNode node={node} indexPath={[index()]} />}
        </For>
      </TreeView.Tree>
    </TreeView>
  );
}