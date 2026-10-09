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
} from '@moduix/vue/tree-view';
type LinkNode = {
  children?: LinkNode[];
  href?: string;
  id: string;
  name: string;
};
defineProps<{ node: LinkNode; indexPath: number[] }>();
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
        <LinksTreeNode
          v-for="(child, index) in currentNode.children"
          :key="child.id"
          :node="child"
          :index-path="[...currentIndexPath, index]"
        />
      </TreeViewBranchContent>
    </TreeViewBranch>
    <TreeViewItem v-else as-child>
      <a :href="currentNode.href">{{ currentNode.name }}</a>
    </TreeViewItem>
  </TreeViewNode>
</template>