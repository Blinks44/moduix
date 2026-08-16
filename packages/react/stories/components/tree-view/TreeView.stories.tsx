import type { Meta, StoryObj } from '@storybook/react';
import {
  TreeView,
  createTreeCollection,
  type TreeViewNodeProviderProps,
} from '@/components/tree-view/TreeView';
import { FileIcon, FolderIcon, FolderOpenIcon } from '@/lib/moduix/icons/ui';
import styles from './TreeView.stories.module.css';

interface FileNode {
  disabled?: boolean;
  id: string;
  name: string;
  children?: FileNode[];
}

const collection = createTreeCollection<FileNode>({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
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
          {
            id: 'src/components',
            name: 'components',
            children: [
              { id: 'src/components/Button.tsx', name: 'Button.tsx' },
              { id: 'src/components/Dialog.tsx', name: 'Dialog.tsx' },
            ],
          },
        ],
      },
      {
        id: 'public',
        name: 'public',
        children: [{ id: 'public/favicon.svg', name: 'favicon.svg' }],
      },
      { id: 'package.json', name: 'package.json' },
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
              <TreeView.BranchText>
                {state.expanded ? <FolderOpenIcon /> : <FolderIcon />}
                {currentNode.name}
              </TreeView.BranchText>
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
            <TreeView.ItemText>
              <FileIcon />
              {currentNode.name}
            </TreeView.ItemText>
          </TreeView.Item>
        )
      }
    </TreeView.Node>
  );
}

const contentStressCollection = createTreeCollection<FileNode>({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: {
    id: 'ROOT',
    name: '',
    children: [
      {
        id: 'configuration',
        name: 'Configuration files with long descriptive names',
        children: [
          {
            id: 'configuration/environment',
            name: 'production-environment-overrides-and-secrets.example.ts',
          },
        ],
      },
      { id: 'readme', name: 'README-with-a-long-but-meaningful-description.md' },
    ],
  },
});

const disabledCollection = createTreeCollection<FileNode>({
  isNodeDisabled: (node) => node.disabled === true,
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: {
    id: 'ROOT',
    name: '',
    children: [
      { id: 'src', name: 'src', children: [{ id: 'src/App.tsx', name: 'App.tsx' }] },
      { disabled: true, id: 'archive', name: 'Archived project files' },
    ],
  },
});

function TreeViewDemo({
  collection: treeCollection = collection,
}: {
  collection?: typeof collection;
}) {
  return (
    <TreeView
      collection={treeCollection}
      defaultExpandedValue={['src', 'configuration']}
      className={styles.root}
    >
      <TreeView.Label>Project files</TreeView.Label>
      <TreeView.Tree>
        {treeCollection.rootNode.children?.map((node, index) => (
          <FileTreeNode key={node.id} node={node} indexPath={[index]} />
        ))}
      </TreeView.Tree>
    </TreeView>
  );
}

const meta = {
  title: 'Components/TreeView',
  component: TreeViewDemo,
} satisfies Meta<typeof TreeViewDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const ContentStress: Story = {
  args: { collection: contentStressCollection },
};

export const Disabled: Story = {
  args: { collection: disabledCollection },
};