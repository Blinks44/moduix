<script setup lang="ts">
import {
  TreeViewNodeProvider,
  TreeViewNodeContext,
  TreeViewBranch,
  TreeViewBranchControl,
  TreeViewBranchIndicator,
  TreeViewBranchText,
  TreeViewBranchContent,
  TreeViewBranchIndentGuide,
  TreeViewItem,
  TreeViewItemText,
} from '@moduix/vue/tree-view';
type FileNode = { children?: FileNode[]; id: string; name: string };
defineProps<{ node: FileNode; indexPath: number[] }>();
</script>

<template>
  <TreeViewNodeProvider :node="node" :index-path="indexPath">
    <TreeViewNodeContext v-slot="state">
      <TreeViewBranch v-if="state.isBranch">
        <TreeViewBranchControl>
          <TreeViewBranchIndicator />
          <TreeViewBranchText>{{ node.name }}</TreeViewBranchText>
        </TreeViewBranchControl>
        <TreeViewBranchContent>
          <TreeViewBranchIndentGuide />
          <RootProviderTreeNode
            v-for="(child, index) in node.children"
            :key="child.id"
            :node="child"
            :index-path="[...indexPath, index]"
          />
        </TreeViewBranchContent>
      </TreeViewBranch>
      <TreeViewItem v-else>
        <TreeViewItemText>{{ node.name }}</TreeViewItemText>
      </TreeViewItem>
    </TreeViewNodeContext>
  </TreeViewNodeProvider>
</template>