<script lang="ts">
  import {
    TreeViewBranch,
    TreeViewBranchContent,
    TreeViewBranchControl,
    TreeViewBranchIndentGuide,
    TreeViewBranchIndicator,
    TreeViewBranchText,
    TreeViewItem,
    TreeViewNode,
  } from '@moduix/svelte/tree-view';
  import LinksTreeNode from './LinksTreeNode.svelte';

  type LinkNode = {
    children?: LinkNode[];
    href?: string;
    id: string;
    name: string;
  };

  let { node, indexPath }: { node: LinkNode; indexPath: number[] } = $props();
</script>

<TreeViewNode {node} {indexPath}>
  {#snippet children({ node: currentNode, indexPath: currentIndexPath, state })}
    {#if state.isBranch}
      <TreeViewBranch>
        <TreeViewBranchControl>
          <TreeViewBranchIndicator />
          <TreeViewBranchText>{currentNode.name}</TreeViewBranchText>
        </TreeViewBranchControl>
        <TreeViewBranchContent>
          <TreeViewBranchIndentGuide />
          {#each currentNode.children ?? [] as child, index (child.id)}
            <LinksTreeNode node={child} indexPath={[...currentIndexPath, index]} />
          {/each}
        </TreeViewBranchContent>
      </TreeViewBranch>
    {:else}
      <TreeViewItem>
        {#snippet asChild(props)}
          <a {...props()} href={currentNode.href}>{currentNode.name}</a>
        {/snippet}
      </TreeViewItem>
    {/if}
  {/snippet}
</TreeViewNode>