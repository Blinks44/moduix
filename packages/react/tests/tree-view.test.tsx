import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createRef, useState } from 'react';
import {
  TreeView,
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
    <TreeView.Node node={node} indexPath={indexPath}>
      {({ node: currentNode, indexPath: currentIndexPath, state }) =>
        state.isBranch ? (
          <TreeView.Branch>
            <TreeView.BranchControl>
              <TreeView.BranchIndicator />
              <TreeView.BranchText>{currentNode.name}</TreeView.BranchText>
            </TreeView.BranchControl>
            <TreeView.BranchContent>
              <TreeView.BranchIndentGuide />
              {currentNode.children?.map((child, index) => (
                <FileTreeNode
                  key={child.id}
                  node={child}
                  indexPath={[...currentIndexPath, index]}
                />
              ))}
            </TreeView.BranchContent>
          </TreeView.Branch>
        ) : (
          <TreeView.Item>
            <TreeView.ItemText>{currentNode.name}</TreeView.ItemText>
          </TreeView.Item>
        )
      }
    </TreeView.Node>
  );
}

function TreeParts() {
  return (
    <>
      <TreeView.Label>Project files</TreeView.Label>
      <TreeView.Tree>
        {collection.rootNode.children?.map((node, index) => (
          <FileTreeNode key={node.id} node={node} indexPath={[index]} />
        ))}
      </TreeView.Tree>
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
      <TreeView.Label>Archives</TreeView.Label>
      <TreeView.Tree>
        <TreeView.Node node={disabledCollection.rootNode.children![0]} indexPath={[0]}>
          {({ node }) => (
            <TreeView.Item>
              <TreeView.ItemText>{node.name}</TreeView.ItemText>
            </TreeView.Item>
          )}
        </TreeView.Node>
      </TreeView.Tree>
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
      <TreeView.RootProvider value={treeView}>
        <TreeView.Label>Documentation</TreeView.Label>
        <TreeView.Tree>
          <TreeView.NodeProvider node={collection.rootNode.children![1]} indexPath={[1]}>
            <TreeView.Item asChild>
              <a href="/docs">README.md</a>
            </TreeView.Item>
          </TreeView.NodeProvider>
        </TreeView.Tree>
      </TreeView.RootProvider>
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