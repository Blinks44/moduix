import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { createSignal, For, Show } from 'solid-js';
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
  TreeViewNodeCheckbox,
  TreeViewNodeCheckboxIndicator,
  TreeViewNodeProvider,
  TreeViewRootProvider,
  TreeViewTree,
  createTreeCollection,
  type TreeViewNodeProviderProps,
  useTreeView,
} from '../src';

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

test('preserves TreeView anatomy, labels, refs, and the Node convenience helper', async () => {
  let rootRef!: HTMLDivElement;

  render(() => (
    <TreeView
      ref={(element) => (rootRef = element)}
      collection={collection}
      defaultExpandedValue={['src']}
    >
      <TreeParts />
    </TreeView>
  ));

  expect(rootRef!.getAttribute('data-slot')).toBe('tree-view-root');
  await expect
    .element(page.getByRole('tree', { name: 'Project files', exact: true }))
    .toHaveAttribute('data-slot', 'tree-view-tree');
  await expect
    .element(page.getByRole('button', { name: 'src', exact: true }))
    .toHaveAttribute('data-slot', 'tree-view-branch-control');
  await expect
    .element(page.getByRole('treeitem', { name: 'App.tsx', exact: true }))
    .toHaveAttribute('data-slot', 'tree-view-item');
});

test('wraps the checkbox indicator with its data-slot and consumer class', () => {
  render(() => (
    <TreeView collection={collection}>
      <TreeViewLabel>Checked files</TreeViewLabel>
      <TreeViewTree>
        <TreeViewNode node={collection.rootNode.children![1]} indexPath={[1]}>
          {({ node }) => (
            <TreeViewItem>
              <TreeViewNodeCheckbox>
                <TreeViewNodeCheckboxIndicator class="indicator-class" />
              </TreeViewNodeCheckbox>
              <TreeViewItemText>{node.name}</TreeViewItemText>
            </TreeViewItem>
          )}
        </TreeViewNode>
      </TreeViewTree>
    </TreeView>
  ));

  const indicator = document.querySelector('[data-slot="tree-view-node-checkbox-indicator"]');

  expect(indicator?.tagName).toBe('SPAN');
  expect([...indicator!.classList]).toEqual(expect.arrayContaining(['indicator-class']));
});

test('keeps component-owned utilities on empty visual parts', () => {
  render(() => (
    <TreeView collection={collection} defaultExpandedValue={['src']}>
      <TreeParts />
    </TreeView>
  ));

  expect([
    ...document.querySelector('[data-slot="tree-view-branch-indicator"]')!.classList,
  ]).toEqual(expect.arrayContaining(['inline-flex', 'size-4', 'shrink-0']));
  expect([
    ...document.querySelector('[data-slot="tree-view-branch-indent-guide"]')!.classList,
  ]).toEqual(expect.arrayContaining(['absolute', 'inset-y-0', 'w-px', 'bg-border']));
});

test('lets consumer Tailwind classes override conflicting defaults', async () => {
  const { container } = render(() => (
    <TreeView collection={collection} class="w-96">
      <TreeParts />
    </TreeView>
  ));

  const root = container.firstElementChild;
  expect([...root!.classList]).toEqual(expect.arrayContaining(['w-96']));
  expect(root!.classList.contains('w-80')).toBe(false);
  await expect.element(page.locator('[data-slot="tree-view-root"]')).toHaveCSS('width', '384px');
});

test('keeps expansion and Ark callback details controlled by the consumer', async () => {
  function ControlledTreeView() {
    const [expandedValue, setExpandedValue] = createSignal<string[]>([]);

    return (
      <TreeView
        collection={collection}
        expandedValue={expandedValue()}
        onExpandedChange={(details) => setExpandedValue(details.expandedValue)}
      >
        <TreeParts />
      </TreeView>
    );
  }

  render(() => <ControlledTreeView />);

  await page.getByRole('button', { name: 'src', exact: true }).click();

  await expect.element(page.getByRole('treeitem', { name: 'App.tsx', exact: true })).toBeVisible();
  await expect
    .element(page.getByRole('button', { name: 'src', exact: true }))
    .toHaveAttribute('data-state', 'open');
});

test('preserves Ark keyboard expansion and roving focus', async () => {
  render(() => (
    <TreeView collection={collection}>
      <TreeParts />
    </TreeView>
  ));

  const button = page.getByRole('button', { name: 'src', exact: true });
  await button.press('ArrowRight');

  await expect.element(button).toHaveAttribute('data-state', 'open');

  await button.press('ArrowDown');

  await expect.element(page.getByRole('treeitem', { name: 'App.tsx', exact: true })).toBeFocused();
});

test('preserves disabled node semantics', async () => {
  const disabledCollection = createTreeCollection<FileNode>({
    isNodeDisabled: (node) => node.disabled === true,
    nodeToString: (node) => node.name,
    nodeToValue: (node) => node.id,
    rootNode: {
      id: 'ROOT',
      name: '',
      children: [{ disabled: true, id: 'archive', name: 'Archived files' }],
    },
  });

  render(() => (
    <TreeView collection={disabledCollection}>
      <TreeViewLabel>Archives</TreeViewLabel>
      <TreeViewTree>
        <TreeViewNode node={disabledCollection.rootNode.children![0]} indexPath={[0]}>
          {({ node }) => (
            <TreeViewItem>
              <TreeViewItemText>{node.name}</TreeViewItemText>
            </TreeViewItem>
          )}
        </TreeViewNode>
      </TreeViewTree>
    </TreeView>
  ));

  await expect
    .element(page.getByRole('treeitem', { name: 'Archived files', exact: true }))
    .toHaveAttribute('data-disabled');
  // Dispatch checks the event guard; native clicks reject aria-disabled nodes.
  screen
    .getByRole('treeitem', { name: 'Archived files' })
    .dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
  await expect
    .element(page.getByRole('treeitem', { name: 'Archived files', exact: true }))
    .not.toHaveAttribute('data-selected');
});

test('keeps RootProvider and semantic item composition available', async () => {
  function ProviderTreeView() {
    const treeView = useTreeView({ collection });

    return (
      <TreeViewRootProvider value={treeView}>
        <TreeViewLabel>Documentation</TreeViewLabel>
        <TreeViewTree>
          <TreeViewNodeProvider node={collection.rootNode.children![1]} indexPath={[1]}>
            <TreeViewItem
              asChild={(props) => (
                <a {...props()} href="/docs">
                  README.md
                </a>
              )}
            />
          </TreeViewNodeProvider>
        </TreeViewTree>
      </TreeViewRootProvider>
    );
  }

  render(() => <ProviderTreeView />);

  await expect
    .element(page.getByRole('tree', { name: 'Documentation', exact: true }))
    .toHaveAttribute('data-slot', 'tree-view-tree');
  const linkItem = screen.getByRole('treeitem', { name: 'README.md' });
  expect(linkItem.tagName).toBe('A');
  await expect
    .element(page.getByRole('treeitem', { name: 'README.md', exact: true }))
    .toHaveAttribute('href', '/docs');
  await expect
    .element(page.getByRole('treeitem', { name: 'README.md', exact: true }))
    .toHaveAttribute('data-slot', 'tree-view-item');
});