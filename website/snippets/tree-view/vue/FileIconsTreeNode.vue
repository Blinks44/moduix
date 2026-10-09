<script setup lang="ts">
import { File as FileIcon, Folder as FolderIcon, FolderOpen as FolderOpenIcon } from '@lucide/vue';
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
        <TreeViewBranchText>
          <FolderOpenIcon v-if="state.expanded" aria-hidden="true" />
          <FolderIcon v-else aria-hidden="true" />
          {{ currentNode.name }}
        </TreeViewBranchText>
      </TreeViewBranchControl>
      <TreeViewBranchContent>
        <TreeViewBranchIndentGuide />
        <FileIconsTreeNode
          v-for="(child, index) in currentNode.children"
          :key="child.id"
          :node="child"
          :index-path="[...currentIndexPath, index]"
        />
      </TreeViewBranchContent>
    </TreeViewBranch>
    <TreeViewItem v-else>
      <TreeViewItemText>
        <FileIcon aria-hidden="true" />
        {{ currentNode.name }}
      </TreeViewItemText>
    </TreeViewItem>
  </TreeViewNode>
</template>