<script lang="ts">
  import {
    TreeView,
    TreeViewItem,
    TreeViewItemText,
    TreeViewLabel,
    TreeViewNode,
    TreeViewTree,
  } from '@/components/tree-view';
  import { createFileCollection } from './files';

  const disabledCollection = createFileCollection([
    { disabled: true, id: 'archive', name: 'Archived files' },
  ]);
</script>

<TreeView collection={disabledCollection}>
  <TreeViewLabel>Archives</TreeViewLabel>
  <TreeViewTree>
    <TreeViewNode node={disabledCollection.rootNode.children![0]!} indexPath={[0]}>
      {#snippet children({ node })}
        <TreeViewItem><TreeViewItemText>{node.name}</TreeViewItemText></TreeViewItem>
      {/snippet}
    </TreeViewNode>
  </TreeViewTree>
</TreeView>