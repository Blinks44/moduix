<script setup lang="ts">
import { TreeView, TreeViewLabel, TreeViewTree, createTreeCollection } from '@moduix/vue/tree-view';
import type { TreeViewLoadChildrenDetails } from '@moduix/vue/tree-view';
import { shallowRef } from 'vue';
import FileTreeNode from './AsyncLoadingTreeNode.vue';

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