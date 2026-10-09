<script setup lang="ts">
import {
  TreeViewBranch,
  TreeViewBranchContent,
  TreeViewBranchControl,
  TreeViewBranchIndicator,
  TreeViewBranchIndentGuide,
  TreeViewBranchText,
  TreeViewItem,
  TreeViewItemText,
  TreeViewNode,
} from '@moduix/vue/tree-view';
type FileNode = { children?: FileNode[]; label: string; value: string };
defineProps<{ node: FileNode; indexPath: number[] }>();
</script>
<template>
  <TreeViewNode
    :node="node"
    :index-path="indexPath"
    v-slot="{ node: current, indexPath: path, state }"
  >
    <TreeViewBranch v-if="state.isBranch">
      <TreeViewBranchControl
        ><TreeViewBranchIndicator /><TreeViewBranchText>{{
          current.label
        }}</TreeViewBranchText></TreeViewBranchControl
      >
      <TreeViewBranchContent>
        <TreeViewBranchIndentGuide />
        <FileTreeNode
          v-for="(child, index) in current.children"
          :key="child.value"
          :node="child"
          :index-path="[...path, index]"
        />
      </TreeViewBranchContent>
    </TreeViewBranch>
    <TreeViewItem v-else
      ><TreeViewItemText>{{ current.label }}</TreeViewItemText></TreeViewItem
    >
  </TreeViewNode>
</template>