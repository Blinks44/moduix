<script lang="ts">
  import {
    TreeView,
    TreeViewItem,
    TreeViewItemText,
    TreeViewLabel,
    TreeViewNode,
    TreeViewNodeCheckbox,
    TreeViewNodeCheckboxIndicator,
    TreeViewTree,
  } from '@/components/tree-view';
  import { collection } from './files';
</script>

<TreeView {collection}>
  <TreeViewLabel>Checked files</TreeViewLabel>
  <TreeViewTree>
    <TreeViewNode node={collection.rootNode.children![1]!} indexPath={[1]}>
      {#snippet children({ node })}
        <TreeViewItem>
          <TreeViewNodeCheckbox>
            <TreeViewNodeCheckboxIndicator class="indicator-class" />
          </TreeViewNodeCheckbox>
          <TreeViewItemText>{node.name}</TreeViewItemText>
        </TreeViewItem>
      {/snippet}
    </TreeViewNode>
  </TreeViewTree>
</TreeView>