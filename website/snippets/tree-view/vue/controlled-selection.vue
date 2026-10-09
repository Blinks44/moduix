<script setup lang="ts">
import {
  TreeView,
  TreeViewItem,
  TreeViewItemText,
  TreeViewLabel,
  TreeViewTree,
  TreeViewNode,
  createTreeCollection,
} from '@moduix/vue/tree-view';
import { ref } from 'vue';
import styles from '@/components/examples/tree-view/tree-view-controlled-selection.module.css';

type FileNode = { children?: FileNode[]; id: string; name: string };

const collection = createTreeCollection<FileNode>({
  nodeToString: (node) => node.name,
  nodeToValue: (node) => node.id,
  rootNode: {
    id: 'ROOT',
    name: '',
    children: [
      { id: 'eslint.config.js', name: 'eslint.config.js' },
      { id: 'package.json', name: 'package.json' },
      { id: 'README.md', name: 'README.md' },
      { id: 'src/App.tsx', name: 'App.tsx' },
      { id: 'src/main.tsx', name: 'main.tsx' },
      { id: 'tsconfig.json', name: 'tsconfig.json' },
    ],
  },
});

const selectedValue = ref<string[]>(['package.json']);
</script>

<template>
  <div :class="styles.root">
    <TreeView
      v-model:selected-value="selectedValue"
      :collection="collection"
      selection-mode="multiple"
    >
      <TreeViewLabel>Selected files</TreeViewLabel>
      <TreeViewTree>
        <TreeViewNode
          v-for="(node, index) in collection.rootNode.children"
          :key="node.id"
          :node="node"
          :index-path="[index]"
          v-slot="{ node: currentNode }"
        >
          <TreeViewItem
            ><TreeViewItemText>{{ currentNode.name }}</TreeViewItemText></TreeViewItem
          >
        </TreeViewNode>
      </TreeViewTree>
    </TreeView>
    <output aria-live="polite">Selected: {{ selectedValue.join(', ') || 'none' }}</output>
  </div>
</template>