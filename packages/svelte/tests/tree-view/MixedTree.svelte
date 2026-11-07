<script lang="ts">
  import {
    TreeView,
    TreeViewBranch,
    TreeViewBranchControl,
    TreeViewBranchText,
    TreeViewNodeCheckbox,
    TreeViewNodeCheckboxIndicator,
    TreeViewNodeProvider,
  } from '@/components/tree-view';
  import { createFileCollection } from './files';

  let { checkedValue }: { checkedValue: string[] } = $props();

  const checkboxCollection = createFileCollection([
    {
      id: 'src',
      name: 'src',
      children: [
        { id: 'src/App.tsx', name: 'App.tsx' },
        { id: 'src/main.tsx', name: 'main.tsx' },
      ],
    },
  ]);
</script>

<TreeView collection={checkboxCollection} {checkedValue}>
  <TreeViewNodeProvider node={checkboxCollection.rootNode.children![0]!} indexPath={[0]}>
    <TreeViewBranch>
      <TreeViewBranchControl>
        <TreeViewNodeCheckbox aria-label="Check source">
          <TreeViewNodeCheckboxIndicator data-testid="default-indicator" />
          <TreeViewNodeCheckboxIndicator>
            {#snippet indeterminate()}<span>Mixed icon</span>{/snippet}
          </TreeViewNodeCheckboxIndicator>
        </TreeViewNodeCheckbox>
        <TreeViewBranchText>src</TreeViewBranchText>
      </TreeViewBranchControl>
    </TreeViewBranch>
  </TreeViewNodeProvider>
</TreeView>