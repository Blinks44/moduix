<script setup lang="ts">
import { File as FileIcon, Folder as FolderIcon, FolderOpen as FolderOpenIcon } from '@lucide/vue';
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
} from '@moduix/vue/tree-view';
import { defineComponent } from 'vue';
import type { PropType } from 'vue';

type FileNode = {
  children?: FileNode[];
  id: string;
  name: string;
};

const collection = createTreeCollection<FileNode>({
  nodeToString: (node) => node.name,
  nodeToValue: (node) => node.id,
  rootNode: {
    id: 'ROOT',
    name: '',
    children: [
      {
        id: 'src',
        name: 'src',
        children: [
          { id: 'src/App.tsx', name: 'App.tsx' },
          {
            id: 'src/components',
            name: 'components',
            children: [
              { id: 'src/components/Button.tsx', name: 'Button.tsx' },
              { id: 'src/components/Tree.tsx', name: 'Tree.tsx' },
            ],
          },
          { id: 'src/main.tsx', name: 'main.tsx' },
        ],
      },
      {
        id: 'public',
        name: 'public',
        children: [{ id: 'public/logo.svg', name: 'logo.svg' }],
      },
      { id: 'README.md', name: 'README.md' },
      { id: 'package.json', name: 'package.json' },
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
  TreeViewTree,
};

const FileTreeNode = defineComponent({
  name: 'FileTreeNode',
  components: { ...treeComponents, FileIcon, FolderIcon, FolderOpenIcon },
  props: {
    node: { type: Object as PropType<FileNode>, required: true },
    indexPath: { type: Array as PropType<number[]>, required: true },
  },
  template: `
    <TreeViewNode :node="node" :index-path="indexPath" v-slot="{ node: currentNode, indexPath: currentIndexPath, state }">
      <TreeViewBranch v-if="state.isBranch">
        <TreeViewBranchControl>
          <TreeViewBranchIndicator />
          <TreeViewBranchText>
            <FolderOpenIcon v-if="state.expanded" aria-hidden="true" />
            <FolderIcon v-else aria-hidden="true" />
            {{ currentNode.name }}
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
          <FileIcon aria-hidden="true" />
          {{ currentNode.name }}
        </TreeViewItemText>
      </TreeViewItem>
    </TreeViewNode>
  `,
});
</script>

<template>
  <TreeView :collection="collection" :default-expanded-value="['src', 'src/components']">
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
</template>