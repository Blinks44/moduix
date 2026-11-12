<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import { Stack } from '@moduix/vue/stack';
import {
  TreeViewLabel,
  TreeViewRootProvider,
  TreeViewTree,
  createTreeCollection,
  useTreeView,
} from '@moduix/vue/tree-view';
import FileTreeNode from './RootProviderTreeNode.vue';

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
  <Stack align="center" gap="3">
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
    <div data-preview-meta>
      <output aria-live="polite">
        Expanded: {{ treeView.expandedValue.join(', ') || 'none' }}
      </output>
      <Stack direction="row" gap="2">
        <Button variant="outline" @click="treeView.expand()">Expand all</Button>
        <Button variant="outline" @click="treeView.collapse()">Collapse all</Button>
      </Stack>
    </div>
  </Stack>
</template>