import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@solidjs/testing-library';
import { For, Show } from 'solid-js';
import {
  TreeView,
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
  TreeViewTree,
  createTreeCollection,
  type TreeViewNodeProviderProps,
} from '@/index';

interface FileNode {
  children?: FileNode[];
  disabled?: boolean;
  id: string;
  name: string;
}

const collection = createTreeCollection<FileNode>({
  nodeToString: (node) => node.name,
  nodeToValue: (node) => node.id,
  rootNode: {
    id: 'ROOT',
    name: '',
    children: [
      { id: 'src', name: 'src', children: [{ id: 'src/App.tsx', name: 'App.tsx' }] },
      { id: 'README.md', name: 'README.md' },
    ],
  },
});

function FileTreeNode(props: TreeViewNodeProviderProps<FileNode>) {
  return (
    <TreeViewNode node={props.node} indexPath={props.indexPath}>
      {(renderProps) => (
        <Show
          when={renderProps.state().isBranch}
          fallback={
            <TreeViewItem>
              <TreeViewItemText>{renderProps.node.name}</TreeViewItemText>
            </TreeViewItem>
          }
        >
          <TreeViewBranch>
            <TreeViewBranchControl>
              <TreeViewBranchIndicator />
              <TreeViewBranchText>{renderProps.node.name}</TreeViewBranchText>
            </TreeViewBranchControl>
            <TreeViewBranchContent>
              <TreeViewBranchIndentGuide />
              <For each={renderProps.node.children}>
                {(child, index) => (
                  <FileTreeNode node={child} indexPath={[...renderProps.indexPath, index()]} />
                )}
              </For>
            </TreeViewBranchContent>
          </TreeViewBranch>
        </Show>
      )}
    </TreeViewNode>
  );
}

function TreeParts() {
  return (
    <>
      <TreeViewLabel>Project files</TreeViewLabel>
      <TreeViewTree>
        <For each={collection.rootNode.children}>
          {(node, index) => <FileTreeNode node={node} indexPath={[index()]} />}
        </For>
      </TreeViewTree>
    </>
  );
}

test('lets consumer Tailwind classes override conflicting defaults', async () => {
  const { container } = render(() => (
    <TreeView collection={collection} class="w-96">
      <TreeParts />
    </TreeView>
  ));

  const root = container.firstElementChild;
  expect([...root!.classList]).toEqual(expect.arrayContaining(['w-96']));
  await expect.element(page.locator('[data-slot="tree-view-root"]')).toHaveCSS('width', '384px');
});