<script setup lang="ts">
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
  type TreeViewLoadChildrenDetails,
} from '@moduix/vue/tree-view';
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import { shallowRef } from 'vue';

type FileNode = {
  children?: FileNode[];
  childrenCount?: number;
  id: string;
  name: string;
};

const initialCollection = createTreeCollection<FileNode>({
  nodeToString: (node) => node.name,
  nodeToValue: (node) => node.id,
  rootNode: {
    id: 'ROOT',
    name: '',
    children: [
      { id: 'src', name: 'src', childrenCount: 3 },
      { id: 'public', name: 'public', childrenCount: 2 },
      { id: 'package.json', name: 'package.json' },
    ],
  },
});

const childrenByValue: Record<string, FileNode[]> = {
  src: [
    { id: 'src/App.tsx', name: 'App.tsx' },
    { id: 'src/main.tsx', name: 'main.tsx' },
    { id: 'src/styles.css', name: 'styles.css' },
  ],
  public: [
    { id: 'public/favicon.svg', name: 'favicon.svg' },
    { id: 'public/logo.svg', name: 'logo.svg' },
  ],
};

function loadChildren({ valuePath }: TreeViewLoadChildrenDetails<FileNode>) {
  return new Promise<FileNode[]>((resolve) => {
    window.setTimeout(() => resolve(childrenByValue[valuePath.join('/')] ?? []), 350);
  });
}

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
  TreeViewTree,
};

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
          <TreeViewBranchText>{{ state.loading ? 'Loading…' : currentNode.name }}</TreeViewBranchText>
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

const collection = shallowRef(initialCollection);
</script>

<template>
  <TreeView
    :collection="collection"
    :load-children="loadChildren"
    @load-children-complete="collection = $event.collection"
  >
    <TreeViewLabel>Lazy folders</TreeViewLabel>
    <TreeViewTree>
      <FileTreeNode
        v-for="(node, index) in collection.rootNode.children"
        :key="node.id"
        :node="node"
        :index-path="[index]"
      />
    </TreeViewTree>
  </TreeView>
</template>