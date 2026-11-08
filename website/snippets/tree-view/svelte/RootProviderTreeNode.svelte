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
    TreeViewNodeContext,
    TreeViewNodeProvider,
  } from '@moduix/svelte/tree-view';
  import RootProviderTreeNode from './RootProviderTreeNode.svelte';

  type FileNode = { children?: FileNode[]; id: string; name: string };

  let { node, indexPath }: { node: FileNode; indexPath: number[] } = $props();
</script>

<TreeViewNodeProvider {node} {indexPath}>
  <TreeViewNodeContext>
    {#snippet render(state)}
      {#if state().isBranch}
        <TreeViewBranch>
          <TreeViewBranchControl>
            <TreeViewBranchIndicator />
            <TreeViewBranchText>{node.name}</TreeViewBranchText>
          </TreeViewBranchControl>
          <TreeViewBranchContent>
            <TreeViewBranchIndentGuide />
            {#each node.children ?? [] as child, index (child.id)}
              <RootProviderTreeNode node={child} indexPath={[...indexPath, index]} />
            {/each}
          </TreeViewBranchContent>
        </TreeViewBranch>
      {:else}
        <TreeViewItem>
          <TreeViewItemText>{node.name}</TreeViewItemText>
        </TreeViewItem>
      {/if}
    {/snippet}
  </TreeViewNodeContext>
</TreeViewNodeProvider>