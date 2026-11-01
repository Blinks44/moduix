import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/react';
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

test('lets consumer Tailwind classes override conflicting defaults', async () => {
  const { container } = render(
    <TreeView collection={collection} className="w-96">
      <TreeParts />
    </TreeView>,
  );

  const root = container.firstElementChild;
  expect([...root!.classList]).toEqual(expect.arrayContaining(['w-96']));
  await expect.element(page.locator('[data-slot="tree-view-root"]')).toHaveCSS('width', '384px');
});