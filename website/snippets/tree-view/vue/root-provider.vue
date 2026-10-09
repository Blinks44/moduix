<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  TreeViewLabel,
  TreeViewRootProvider,
  TreeViewTree,
  createTreeCollection,
  useTreeView,
} from '@moduix/vue/tree-view';
import FileTreeNode from './RootProviderTreeNode.vue';
import styles from '@/components/examples/tree-view/tree-view-root-provider.module.css';

type FileNode = { children?: FileNode[]; id: string; name: string };

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

const treeView = useTreeView({ collection, defaultExpandedValue: ['src'] });
</script>

<template>
  <div :class="styles.root">
    <TreeViewRootProvider :value="treeView">
      <TreeViewLabel>Project files</TreeViewLabel>
      <TreeViewTree>
        <FileTreeNode
          v-for="(node, index) in collection.rootNode.children"
          :key="node.id"
          :node="node"
          :index-path="[index]"
        />
      </TreeViewTree>
    </TreeViewRootProvider>
    <output aria-live="polite">
      Expanded: {{ treeView.expandedValue.join(', ') || 'none' }}
    </output>
    <div :class="styles.actions">
      <Button variant="outline" @click="treeView.expand()">Expand all</Button>
      <Button variant="outline" @click="treeView.collapse()">Collapse all</Button>
    </div>
  </div>
</template>