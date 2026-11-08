<script lang="ts">
  import FileIcon from '@lucide/svelte/icons/file';
  import FolderIcon from '@lucide/svelte/icons/folder';
  import FolderOpenIcon from '@lucide/svelte/icons/folder-open';
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
  import FileIconsTreeNode from './FileIconsTreeNode.svelte';

  type FileNode = {
    children?: FileNode[];
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
          <TreeViewBranchText>
            {#if state.expanded}
              <FolderOpenIcon aria-hidden="true" />
            {:else}
              <FolderIcon aria-hidden="true" />
            {/if}
            {currentNode.name}
          </TreeViewBranchText>
        </TreeViewBranchControl>
        <TreeViewBranchContent>
          <TreeViewBranchIndentGuide />
          {#each currentNode.children ?? [] as child, index (child.id)}
            <FileIconsTreeNode node={child} indexPath={[...currentIndexPath, index]} />
          {/each}
        </TreeViewBranchContent>
      </TreeViewBranch>
    {:else}
      <TreeViewItem>
        <TreeViewItemText>
          <FileIcon aria-hidden="true" />
          {currentNode.name}
        </TreeViewItemText>
      </TreeViewItem>
    {/if}
  {/snippet}
</TreeViewNode>