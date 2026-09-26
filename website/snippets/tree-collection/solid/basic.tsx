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
  TreeViewItem,
  TreeViewNode,
  TreeView,
  createTreeCollection,
  type TreeViewNodeProviderProps,
} from '@moduix/solid/tree-view';
import { For, Show } from 'solid-js';

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

function FileTreeNode(props: TreeViewNodeProviderProps<FileNode>) {
  return (
    <TreeViewNode node={props.node} indexPath={props.indexPath}>
      {({ node: currentNode, indexPath: currentIndexPath, state }) => (
        <Show
          when={state().isBranch}
          fallback={
            <TreeViewItem>
              <TreeViewItemText>{currentNode.label}</TreeViewItemText>
            </TreeViewItem>
          }
        >
          <TreeViewBranch>
            <TreeViewBranchControl>
              <TreeViewBranchIndicator />
              <TreeViewBranchText>{currentNode.label}</TreeViewBranchText>
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

export default function TreeViewBasicDemo() {
  return (
    <TreeView collection={collection} defaultExpandedValue={['src', 'src/components']}>
      <TreeViewLabel>Project files</TreeViewLabel>
      <TreeViewTree>
        <For each={collection.rootNode.children ?? []}>
          {(node, index) => <FileTreeNode node={node} indexPath={[index()]} />}
        </For>
      </TreeViewTree>
    </TreeView>
  );
}