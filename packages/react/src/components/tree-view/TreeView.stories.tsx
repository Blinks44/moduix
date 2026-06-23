import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  FileIcon,
  FolderIcon,
  FolderOpenIcon,
  TreeView,
  createTreeCollection,
  type TreeViewNodeProviderProps,
} from '@moduix/react';
import styles from './TreeView.stories.module.css';

interface FileNode {
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
    <TreeView.NodeProvider node={node} indexPath={indexPath}>
      <TreeView.NodeContext>
        {(nodeState) =>
          node.children ? (
            <TreeView.Branch>
              <TreeView.BranchControl>
                <TreeView.BranchIndicator />
                <TreeView.BranchText>
                  {nodeState.expanded ? <FolderOpenIcon /> : <FolderIcon />}
                  {node.name}
                </TreeView.BranchText>
              </TreeView.BranchControl>
              <TreeView.BranchContent>
                <TreeView.BranchIndentGuide />
                {node.children.map((child, index) => (
                  <FileTreeNode key={child.id} node={child} indexPath={[...indexPath, index]} />
                ))}
              </TreeView.BranchContent>
            </TreeView.Branch>
          ) : (
            <TreeView.Item>
              <TreeView.ItemText>
                <FileIcon />
                {node.name}
              </TreeView.ItemText>
            </TreeView.Item>
          )
        }
      </TreeView.NodeContext>
    </TreeView.NodeProvider>
  );
}

function TreeViewDemo() {
  return (
    <TreeView collection={collection} defaultExpandedValue={['src']} className={styles.root}>
      <TreeView.Label>Project files</TreeView.Label>
      <TreeView.Tree>
        {collection.rootNode.children?.map((node, index) => (
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