import { For, Show } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import {
  TreeView,
  createTreeCollection,
  type TreeViewNodeProviderProps,
} from '@/components/tree-view/TreeView';
import { FileIcon, FolderIcon, FolderOpenIcon } from '@/lib/moduix/icons/ui/Icons';
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

function FileTreeNode(props: TreeViewNodeProviderProps<FileNode>) {
  return (
    <TreeView.Node node={props.node} indexPath={props.indexPath}>
      {(renderProps) => (
        <Show
          when={renderProps.state().isBranch}
          fallback={
            <TreeView.Item>
              <TreeView.ItemText>
                <FileIcon />
                <span class={styles.text}>{renderProps.node.name}</span>
              </TreeView.ItemText>
            </TreeView.Item>
          }
        >
          <TreeView.Branch>
            <TreeView.BranchControl>
              <TreeView.BranchIndicator />
              <TreeView.BranchText>
                <Show when={renderProps.state().expanded} fallback={<FolderIcon />}>
                  <FolderOpenIcon />
                </Show>
                <span class={styles.text}>{renderProps.node.name}</span>
              </TreeView.BranchText>
            </TreeView.BranchControl>
            <TreeView.BranchContent>
              <TreeView.BranchIndentGuide />
              <For each={renderProps.node.children}>
                {(child, index) => (
                  <FileTreeNode node={child} indexPath={[...renderProps.indexPath, index()]} />
                )}
              </For>
            </TreeView.BranchContent>
          </TreeView.Branch>
        </Show>
      )}
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

function TreeViewDemo(props: { collection?: typeof collection }) {
  const treeCollection = () => props.collection ?? collection;

  return (
    <TreeView
      collection={treeCollection()}
      defaultExpandedValue={['src', 'configuration']}
      class={styles.root}
    >
      <TreeView.Label>Project files</TreeView.Label>
      <TreeView.Tree>
        <For each={treeCollection().rootNode.children}>
          {(node, index) => <FileTreeNode node={node} indexPath={[index()]} />}
        </For>
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