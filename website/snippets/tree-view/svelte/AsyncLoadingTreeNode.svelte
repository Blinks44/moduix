<script lang="ts">
  import {
    TreeViewBranch,
    TreeViewBranchContent,
    TreeViewBranchControl,
    TreeViewBranchIndentGuide,
    TreeViewBranchIndicator,
    TreeViewBranchText,
    TreeViewItem,
    TreeViewItemText,
    TreeViewNode,
  } from '@moduix/svelte/tree-view';
  import AsyncLoadingTreeNode from './AsyncLoadingTreeNode.svelte';

  type FileNode = {
    children?: FileNode[];
    childrenCount?: number;
    id: string;
    name: string;
  };

  let { node, indexPath }: { node: FileNode; indexPath: number[] } = $props();
</script>

<TreeViewNode {node} {indexPath}>
  {#snippet children({ node: currentNode, indexPath: currentIndexPath, state })}
    {#if state.isBranch}
      <TreeViewBranch>
        <TreeViewBranchControl>
          <TreeViewBranchIndicator />
          <TreeViewBranchText>{state.loading ? 'Loading…' : currentNode.name}</TreeViewBranchText>
        </TreeViewBranchControl>
        <TreeViewBranchContent>
          <TreeViewBranchIndentGuide />
          {#each currentNode.children ?? [] as child, index (child.id)}
            <AsyncLoadingTreeNode node={child} indexPath={[...currentIndexPath, index]} />
          {/each}
        </TreeViewBranchContent>
      </TreeViewBranch>
    {:else}
      <TreeViewItem>
        <TreeViewItemText>{currentNode.name}</TreeViewItemText>
      </TreeViewItem>
    {/if}
  {/snippet}
</TreeViewNode>