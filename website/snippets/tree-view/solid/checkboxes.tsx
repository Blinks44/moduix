import {
  TreeView,
  createTreeCollection,
  type TreeViewNodeProviderProps,
} from '@moduix/solid/tree-view';
import { For, Show } from 'solid-js';

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

function FileTreeNode(props: TreeViewNodeProviderProps<FileNode>) {
  return (
    <TreeView.Node node={props.node} indexPath={props.indexPath}>
      {({ node: currentNode, indexPath: currentIndexPath, state }) => (
        <Show
          when={state().isBranch}
          fallback={
            <TreeView.Item>
              <TreeView.NodeCheckbox>
                <TreeView.NodeCheckboxIndicator />
              </TreeView.NodeCheckbox>
              <TreeView.ItemText>{currentNode.name}</TreeView.ItemText>
            </TreeView.Item>
          }
        >
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

export default function CheckboxTreeViewDemo() {
  return (
    <TreeView
      collection={collection}
      defaultCheckedValue={['src/App.tsx', 'config/vite.ts']}
      defaultExpandedValue={['src']}
    >
      <TreeView.Label>Checked files</TreeView.Label>
      <TreeView.Tree>
        <For each={collection.rootNode.children ?? []}>
          {(node, index) => <FileTreeNode node={node} indexPath={[index()]} />}
        </For>
      </TreeView.Tree>
    </TreeView>
  );
}