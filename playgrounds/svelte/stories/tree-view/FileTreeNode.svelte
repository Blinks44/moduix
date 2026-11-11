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
  } from '@/components/tree-view';
  import { FileIcon, FolderIcon, FolderOpenIcon } from '@/lib/moduix/icons/ui';
  import type { FileNode } from './files';
  import FileTreeNode from './FileTreeNode.svelte';

  let { indexPath, node }: { indexPath: number[]; node: FileNode } = $props();
</script>

<TreeViewNode {node} {indexPath}>
  {#snippet children({ node: currentNode, indexPath: currentIndexPath, state })}
    {#if state.isBranch}
      <TreeViewBranch>
        <TreeViewBranchControl>
          <TreeViewBranchIndicator />
          <TreeViewBranchText>
            {#if state.expanded}<FolderOpenIcon />{:else}<FolderIcon />{/if}{currentNode.name}
          </TreeViewBranchText>
        </TreeViewBranchControl>
        <TreeViewBranchContent>
          <TreeViewBranchIndentGuide />
          {#each currentNode.children ?? [] as child, index (child.id)}
            <FileTreeNode node={child} indexPath={[...currentIndexPath, index]} />
          {/each}
        </TreeViewBranchContent>
      </TreeViewBranch>
    {:else}
      <TreeViewItem>
        <TreeViewItemText><FileIcon />{currentNode.name}</TreeViewItemText>
      </TreeViewItem>
    {/if}
  {/snippet}
</TreeViewNode>