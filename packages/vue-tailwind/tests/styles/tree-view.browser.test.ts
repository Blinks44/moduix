import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/vue';
import { defineComponent } from 'vue';
import type { Component, PropType } from 'vue';
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
  TreeViewNodeRenameInput,
  TreeViewRootProvider,
  TreeViewTree,
  createTreeCollection,
} from '@/components/tree-view';

interface FileNode {
  children?: FileNode[];
  childrenCount?: number;
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

const treeComponents = {
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
  TreeViewNodeRenameInput,
  TreeViewRootProvider,
  TreeViewTree,
} as unknown as Record<string, Component>;

const FileTreeNode = defineComponent({
  name: 'FileTreeNode',
  components: treeComponents,
  props: {
    node: { type: Object as PropType<FileNode>, required: true },
    indexPath: { type: Array as PropType<number[]>, required: true },
  },
  template: `
    <TreeViewNode :node="node" :index-path="indexPath" v-slot="{ node: currentNode, indexPath: currentIndexPath, state }">
      <TreeViewBranch v-if="state.isBranch">
        <TreeViewBranchControl>
          <TreeViewBranchIndicator />
          <TreeViewBranchText>{{ currentNode.name }}</TreeViewBranchText>
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
        <TreeViewItemText>{{ currentNode.name }}</TreeViewItemText>
      </TreeViewItem>
    </TreeViewNode>
  `,
});

const storyComponents = { ...treeComponents, FileTreeNode };

const TreeParts = defineComponent({
  components: { ...storyComponents },
  setup() {
    return { collection };
  },
  template: `
    <TreeViewLabel>Project files</TreeViewLabel>
    <TreeViewTree>
      <FileTreeNode
        v-for="(node, index) in collection.rootNode.children"
        :key="node.id"
        :node="node"
        :index-path="[index]"
      />
    </TreeViewTree>
  `,
});

test('lets consumer Tailwind classes override conflicting defaults', async () => {
  const Harness = defineComponent({
    components: { ...storyComponents, TreeParts },
    setup() {
      return { collection };
    },
    template: `
      <TreeView class="w-96" :collection="collection">
        <TreeParts />
      </TreeView>
    `,
  });

  const { container } = render(Harness);
  const root = container.firstElementChild;

  expect([...root!.classList]).toEqual(expect.arrayContaining(['w-96']));
  await expect.element(page.locator('[data-slot="tree-view-root"]')).toHaveCSS('width', '384px');
});