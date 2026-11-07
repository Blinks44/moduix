<script lang="ts">
  import {
    TreeView,
    TreeViewItem,
    TreeViewItemText,
    TreeViewLabel,
    TreeViewNodeCheckbox,
    TreeViewNodeCheckboxIndicator,
    TreeViewNodeProvider,
    TreeViewTree,
    type TreeViewCheckedChangeDetails,
  } from '@/components/tree-view';
  import { collection } from './files';

  let { checkedChange }: { checkedChange: (details: TreeViewCheckedChangeDetails) => void } =
    $props();
  let checkedValue: string[] = $state([]);

  export const read = () => checkedValue;
  export const write = (value: string[]) => {
    checkedValue = value;
  };
</script>

<TreeView bind:checkedValue {collection} onCheckedChange={checkedChange}>
  <TreeViewLabel>Checkbox files</TreeViewLabel>
  <TreeViewTree>
    <TreeViewNodeProvider node={collection.rootNode.children![1]!} indexPath={[1]}>
      <TreeViewItem>
        <TreeViewNodeCheckbox aria-label="Check README">
          <TreeViewNodeCheckboxIndicator>
            {#snippet children()}<span>Checked icon</span>{/snippet}
            {#snippet fallback()}<span>Unchecked icon</span>{/snippet}
          </TreeViewNodeCheckboxIndicator>
        </TreeViewNodeCheckbox>
        <TreeViewItemText>README.md</TreeViewItemText>
      </TreeViewItem>
    </TreeViewNodeProvider>
  </TreeViewTree>
</TreeView>