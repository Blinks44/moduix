import {
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
    <TreeView.Node node={props.node} indexPath={props.indexPath}>
      {({ node: currentNode, indexPath: currentIndexPath, state }) => (
        <Show
          when={state().isBranch}
          fallback={
            <TreeView.Item>
              <TreeView.ItemText>{currentNode.label}</TreeView.ItemText>
            </TreeView.Item>
          }
        >
          <TreeView.Branch>
            <TreeView.BranchControl>
              <TreeView.BranchIndicator />
              <TreeView.BranchText>{currentNode.label}</TreeView.BranchText>
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

export default function TreeViewBasicDemo() {
  return (
    <TreeView collection={collection} defaultExpandedValue={['src', 'src/components']}>
      <TreeView.Label>Project files</TreeView.Label>
      <TreeView.Tree>
        <For each={collection.rootNode.children ?? []}>
          {(node, index) => <FileTreeNode node={node} indexPath={[index()]} />}
        </For>
      </TreeView.Tree>
    </TreeView>
  );
}