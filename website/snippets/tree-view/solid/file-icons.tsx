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
import { File as FileIcon, Folder as FolderIcon, FolderOpen as FolderOpenIcon } from 'lucide-solid';
import { For, Show } from 'solid-js';

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

function FileTreeNode(props: TreeViewNodeProviderProps<FileNode>) {
  return (
    <TreeViewNode node={props.node} indexPath={props.indexPath}>
      {({ node: currentNode, indexPath: currentIndexPath, state }) => (
        <Show
          when={state().isBranch}
          fallback={
            <TreeViewItem>
              <TreeViewItemText>
                <FileIcon aria-hidden="true" />
                {currentNode.name}
              </TreeViewItemText>
            </TreeViewItem>
          }
        >
          <TreeViewBranch>
            <TreeViewBranchControl>
              <TreeViewBranchIndicator />
              <TreeViewBranchText>
                {state().expanded ? (
                  <FolderOpenIcon aria-hidden="true" />
                ) : (
                  <FolderIcon aria-hidden="true" />
                )}
                {currentNode.name}
              </TreeViewBranchText>
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

export default function FileIconsTreeViewDemo() {
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