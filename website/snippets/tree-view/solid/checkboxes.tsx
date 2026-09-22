import {
  TreeViewTree,
  TreeViewLabel,
  TreeViewBranchIndentGuide,
  TreeViewBranchContent,
  TreeViewBranchText,
  TreeViewBranchIndicator,
  TreeViewBranchControl,
  TreeViewBranch,
  TreeViewItemText,
  TreeViewNodeCheckboxIndicator,
  TreeViewNodeCheckbox,
  TreeViewItem,
  TreeViewNode,
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
    <TreeViewNode node={props.node} indexPath={props.indexPath}>
      {({ node: currentNode, indexPath: currentIndexPath, state }) => (
        <Show
          when={state().isBranch}
          fallback={
            <TreeViewItem>
              <TreeViewNodeCheckbox>
                <TreeViewNodeCheckboxIndicator />
              </TreeViewNodeCheckbox>
              <TreeViewItemText>{currentNode.name}</TreeViewItemText>
            </TreeViewItem>
          }
        >
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

export default function CheckboxTreeViewDemo() {
  return (
    <TreeView
      collection={collection}
      defaultCheckedValue={['src/App.tsx', 'config/vite.ts']}
      defaultExpandedValue={['src']}
    >
      <TreeViewLabel>Checked files</TreeViewLabel>
      <TreeViewTree>
        <For each={collection.rootNode.children ?? []}>
          {(node, index) => <FileTreeNode node={node} indexPath={[index()]} />}
        </For>
      </TreeViewTree>
    </TreeView>
  );
}
