import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
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
} from '@/components/tree-view';
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

const treeComponents = {
  FileIcon,
  FolderIcon,
  FolderOpenIcon,
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
};

const FileTreeNode = defineComponent({
  name: 'FileTreeNode',
  components: treeComponents,
  props: {
    node: { type: Object as PropType<FileNode>, required: true },
    indexPath: { type: Array as PropType<number[]>, required: true },
  },
  setup() {
    return { styles };
  },
  template: `
    <TreeViewNode :node="node" :index-path="indexPath" v-slot="{ node: currentNode, indexPath: currentIndexPath, state }">
      <TreeViewBranch v-if="state.isBranch">
        <TreeViewBranchControl>
          <TreeViewBranchIndicator />
          <TreeViewBranchText>
            <FolderOpenIcon v-if="state.expanded" />
            <FolderIcon v-else />
            <span :class="styles.text">{{ currentNode.name }}</span>
          </TreeViewBranchText>
        </TreeViewBranchControl>
        <TreeViewBranchContent>
          <TreeViewBranchIndentGuide />
          <FileTreeNode
            v-for="(child, index) in currentNode.children"
            :key="child.id"
            :node="child"
            :index-path="[...currentIndexPath, index]"
          />
        </TreeViewBranchContent>
      </TreeViewBranch>
      <TreeViewItem v-else>
        <TreeViewItemText>
          <FileIcon />
          <span :class="styles.text">{{ currentNode.name }}</span>
        </TreeViewItemText>
      </TreeViewItem>
    </TreeViewNode>
  `,
});

const storyComponents = { ...treeComponents, FileTreeNode };

const TreeViewDemo = defineComponent({
  name: 'TreeViewDemo',
  components: storyComponents,
  props: {
    collection: {
      type: Object as PropType<typeof collection>,
      default: () => collection,
    },
  },
  setup() {
    return { styles };
  },
  template: `
    <TreeView
      :collection="collection"
      :default-expanded-value="['src', 'configuration']"
      :class="styles.root"
    >
      <TreeViewLabel>Project files</TreeViewLabel>
      <TreeViewTree>
        <FileTreeNode
          v-for="(node, index) in collection.rootNode.children"
          :key="node.id"
          :node="node"
          :index-path="[index]"
        />
      </TreeViewTree>
    </TreeView>
  `,
});

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