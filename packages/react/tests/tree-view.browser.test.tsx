import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef, useState } from 'react';
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

function FileTreeNode({ node, indexPath }: TreeViewNodeProviderProps<FileNode>) {
  return (
    <TreeViewNode node={node} indexPath={indexPath}>
      {({ node: currentNode, indexPath: currentIndexPath, state }) =>
        state.isBranch ? (
          <TreeViewBranch>
            <TreeViewBranchControl>
              <TreeViewBranchIndicator />
              <TreeViewBranchText>{currentNode.name}</TreeViewBranchText>
            </TreeViewBranchControl>
            <TreeViewBranchContent>
              <TreeViewBranchIndentGuide />
              {currentNode.children?.map((child, index) => (
                <FileTreeNode
                  key={child.id}
                  node={child}
                  indexPath={[...currentIndexPath, index]}
                />
              ))}
            </TreeViewBranchContent>
          </TreeViewBranch>
        ) : (
          <TreeViewItem>
            <TreeViewItemText>{currentNode.name}</TreeViewItemText>
          </TreeViewItem>
        )
      }
    </TreeViewNode>
  );
}

function TreeParts() {
  return (
    <>
      <TreeViewLabel>Project files</TreeViewLabel>
      <TreeViewTree>
        {collection.rootNode.children?.map((node, index) => (
          <FileTreeNode key={node.id} node={node} indexPath={[index]} />
        ))}
      </TreeViewTree>
    </>
  );
}

test('preserves TreeView anatomy, labels, refs, and the Node convenience helper', async () => {
  const ref = createRef<HTMLDivElement>();

  render(
    <TreeView ref={ref} collection={collection} defaultExpandedValue={['src']}>
      <TreeParts />
    </TreeView>,
  );

  expect(ref.current!.getAttribute('data-slot')).toBe('tree-view-root');
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
  render(
    <TreeView collection={collection}>
      <TreeViewLabel>Checked files</TreeViewLabel>
      <TreeViewTree>
        <TreeViewNode node={collection.rootNode.children![1]} indexPath={[1]}>
          {({ node }) => (
            <TreeViewItem>
              <TreeViewNodeCheckbox>
                <TreeViewNodeCheckboxIndicator className="indicator-class" />
              </TreeViewNodeCheckbox>
              <TreeViewItemText>{node.name}</TreeViewItemText>
            </TreeViewItem>
          )}
        </TreeViewNode>
      </TreeViewTree>
    </TreeView>,
  );

  const indicator = document.querySelector('[data-slot="tree-view-node-checkbox-indicator"]');

  expect(indicator?.tagName).toBe('SPAN');
  expect([...indicator!.classList]).toEqual(expect.arrayContaining(['indicator-class']));
});

test('keeps expansion and Ark callback details controlled by the consumer', async () => {
  function ControlledTreeView() {
    const [expandedValue, setExpandedValue] = useState<string[]>([]);

    return (
      <TreeView
        collection={collection}
        expandedValue={expandedValue}
        onExpandedChange={(details) => setExpandedValue(details.expandedValue)}
      >
        <TreeParts />
      </TreeView>
    );
  }

  render(<ControlledTreeView />);

  await page.getByRole('button', { name: 'src', exact: true }).click();

  await expect.element(page.getByRole('treeitem', { name: 'App.tsx', exact: true })).toBeVisible();
  await expect
    .element(page.getByRole('button', { name: 'src', exact: true }))
    .toHaveAttribute('data-state', 'open');
});

test('preserves Ark keyboard expansion and roving focus', async () => {
  render(
    <TreeView collection={collection}>
      <TreeParts />
    </TreeView>,
  );

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

  render(
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
    </TreeView>,
  );

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
            <TreeViewItem asChild>
              <a href="/docs">README.md</a>
            </TreeViewItem>
          </TreeViewNodeProvider>
        </TreeViewTree>
      </TreeViewRootProvider>
    );
  }

  render(<ProviderTreeView />);

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