<script setup lang="ts">
import {
  TreeViewNode,
  TreeViewBranch,
  TreeViewBranchControl,
  TreeViewBranchIndicator,
  TreeViewBranchText,
  TreeViewBranchContent,
  TreeViewBranchIndentGuide,
  TreeViewItem,
  TreeViewItemText,
} from '@moduix/vue/tree-view';
type FileNode = {
  children?: FileNode[];
  id: string;
  name: string;
};
defineProps<{ node: FileNode; indexPath: number[] }>();
</script>

<template>
  <TreeViewNode
    :node="node"
    :index-path="indexPath"
    v-slot="{ node: currentNode, indexPath: currentIndexPath, state }"
  >
    <TreeViewBranch v-if="state.isBranch">
      <TreeViewBranchControl>
        <TreeViewBranchIndicator />
        <TreeViewBranchText>{{ currentNode.name }}</TreeViewBranchText>
      </TreeViewBranchControl>
      <TreeViewBranchContent>
        <TreeViewBranchIndentGuide />
        <BasicTreeNode
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
</template>