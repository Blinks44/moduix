<script setup lang="ts">
import { TreeView, TreeViewLabel, TreeViewTree, createTreeCollection } from '@moduix/vue/tree-view';
import FileTreeNode from './FileTreeNode.vue';
type FileNode = { children?: FileNode[]; label: string; value: string };
const collection = createTreeCollection<FileNode>({
  rootNode: {
    label: '',
    value: 'ROOT',
    children: [
      {
        label: 'src',
        value: 'src',
        children: [
          { label: 'App.tsx', value: 'src/App.tsx' },
          {
            label: 'components',
            value: 'src/components',
            children: [
              { label: 'Button.tsx', value: 'src/components/Button.tsx' },
              { label: 'Tree.tsx', value: 'src/components/Tree.tsx' },
            ],
          },
          { label: 'main.tsx', value: 'src/main.tsx' },
        ],
      },
      {
        label: 'public',
        value: 'public',
        children: [{ label: 'logo.svg', value: 'public/logo.svg' }],
      },
      { label: 'README.md', value: 'README.md' },
      { label: 'package.json', value: 'package.json' },
    ],
  },
});
</script>
<template>
  <TreeView :collection="collection" :default-expanded-value="['src', 'src/components']">
    <TreeViewLabel>Project files</TreeViewLabel>
    <TreeViewTree
      ><FileTreeNode
        v-for="(node, index) in collection.rootNode.children"
        :key="node.value"
        :node="node"
        :index-path="[index]"
    /></TreeViewTree>
  </TreeView>
</template>