import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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

test('preserves TreeView anatomy, labels, refs, and the Node convenience helper', () => {
  const ref = createRef<HTMLDivElement>();

  render(
    <TreeView ref={ref} collection={collection} defaultExpandedValue={['src']}>
      <TreeParts />
    </TreeView>,
  );

  const tree = screen.getByRole('tree', { name: 'Project files' });

  expect(ref.current).toHaveAttribute('data-slot', 'tree-view-root');
  expect(tree).toHaveAttribute('data-slot', 'tree-view-tree');
  expect(screen.getByRole('button', { name: 'src' })).toHaveAttribute(
    'data-slot',
    'tree-view-branch-control',
  );
  expect(screen.getByRole('treeitem', { name: 'App.tsx' })).toHaveAttribute(
    'data-slot',
    'tree-view-item',
  );
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
  expect(indicator).toHaveClass('indicator-class');
});

test('keeps component-owned utilities on empty visual parts', () => {
  render(
    <TreeView collection={collection} defaultExpandedValue={['src']}>
      <TreeParts />
    </TreeView>,
  );

  expect(document.querySelector('[data-slot="tree-view-branch-indicator"]')).toHaveClass(
    'inline-flex',
    'size-4',
    'shrink-0',
  );
  expect(document.querySelector('[data-slot="tree-view-branch-indent-guide"]')).toHaveClass(
    'absolute',
    'inset-y-0',
    'w-px',
    'bg-border',
  );
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
  const { container } = render(
    <TreeView collection={collection} className="w-96">
      <TreeParts />
    </TreeView>,
  );

  const root = container.firstElementChild;
  expect(root).toHaveClass('w-96');
  expect(root).not.toHaveClass('w-80');
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

  const src = screen.getByRole('button', { name: 'src' });
  fireEvent.click(src);

  await waitFor(() => expect(screen.getByRole('treeitem', { name: 'App.tsx' })).toBeVisible());
  expect(src).toHaveAttribute('data-state', 'open');
});

test('preserves Ark keyboard expansion and roving focus', async () => {
  render(
    <TreeView collection={collection}>
      <TreeParts />
    </TreeView>,
  );

  const src = screen.getByRole('button', { name: 'src' });
  src.focus();
  fireEvent.keyDown(src, { key: 'ArrowRight' });

  const app = await screen.findByRole('treeitem', { name: 'App.tsx' });
  expect(src).toHaveAttribute('data-state', 'open');

  fireEvent.keyDown(src, { key: 'ArrowDown' });

  await waitFor(() => expect(app).toHaveFocus());
});

test('preserves disabled node semantics', () => {
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

  const archive = screen.getByRole('treeitem', { name: 'Archived files' });

  expect(archive).toHaveAttribute('data-disabled');
  fireEvent.click(archive);
  expect(archive).not.toHaveAttribute('data-selected');
});

test('keeps RootProvider and semantic item composition available', () => {
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

  expect(screen.getByRole('tree', { name: 'Documentation' })).toHaveAttribute(
    'data-slot',
    'tree-view-tree',
  );
  const linkItem = screen.getByRole('treeitem', { name: 'README.md' });
  expect(linkItem.tagName).toBe('A');
  expect(linkItem).toHaveAttribute('href', '/docs');
  expect(linkItem).toHaveAttribute('data-slot', 'tree-view-item');
});