<script lang="ts">
  import { TreeView, TreeViewLabel, TreeViewTree } from '@/components/tree-view';
  import { collection } from '../tree-view/files';
  import FileTreeNode from '../tree-view/FileTreeNode.svelte';
</script>

<TreeView {collection} defaultExpandedValue={['src']}>
  {#snippet asChild(props)}
    <section {...props()}>
      <TreeViewLabel>Project files</TreeViewLabel>
      <TreeViewTree>
        {#each collection.rootNode.children ?? [] as node, index (node.id)}
          <FileTreeNode {node} indexPath={[index]} />
        {/each}
      </TreeViewTree>
    </section>
  {/snippet}
</TreeView>