<script lang="ts">
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
  } from '@moduix/svelte/tree-view';
  import FileTreeNode from './FileTreeNode.svelte';

  type FileNode = { children?: FileNode[]; label: string; value: string };

  let { node, indexPath }: { node: FileNode; indexPath: number[] } = $props();
</script>

<TreeViewNode {node} {indexPath}>
  {#snippet children({ node: current, indexPath: path, state })}
    {#if state.isBranch}
      <TreeViewBranch>
        <TreeViewBranchControl>
          <TreeViewBranchIndicator />
          <TreeViewBranchText>{current.label}</TreeViewBranchText>
        </TreeViewBranchControl>
        <TreeViewBranchContent>
          <TreeViewBranchIndentGuide />
          {#each current.children ?? [] as child, index (child.value)}
            <FileTreeNode node={child} indexPath={[...path, index]} />
          {/each}
        </TreeViewBranchContent>
      </TreeViewBranch>
    {:else}
      <TreeViewItem>
        <TreeViewItemText>{current.label}</TreeViewItemText>
      </TreeViewItem>
    {/if}
  {/snippet}
</TreeViewNode>