<script setup lang="ts">
import {
  TreeView,
  TreeViewLabel,
  TreeViewTree,
  createTreeCollection,
} from '../../src/components/tree-view';
import SsrTreeNode from './SsrTreeNode.vue';
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
</script>
<template>
  <TreeView :collection="collection" :default-expanded-value="['src']" as-child>
    <section>
      <TreeViewLabel>Project files</TreeViewLabel
      ><TreeViewTree
        ><SsrTreeNode
          v-for="(node, index) in collection.rootNode.children"
          :key="node.id"
          :node="node"
          :index-path="[index]"
      /></TreeViewTree>
    </section>
  </TreeView>
</template>