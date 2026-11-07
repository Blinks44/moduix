<script lang="ts">
  import {
    TreeView,
    TreeViewItem,
    TreeViewItemText,
    TreeViewLabel,
    TreeViewNodeProvider,
    TreeViewNodeRenameInput,
    TreeViewTree,
    type TreeViewRenameCompleteDetails,
    type TreeViewRenameStartDetails,
  } from '@/components/tree-view';
  import { collection, type FileNode } from './files';

  let {
    beforeRename,
    renameComplete,
    renameStart,
  }: {
    beforeRename: (details: TreeViewRenameCompleteDetails) => boolean;
    renameComplete: (details: TreeViewRenameCompleteDetails) => void;
    renameStart: (details: TreeViewRenameStartDetails<FileNode>) => void;
  } = $props();
  let input: Element | null = $state(null);

  export const getInput = () => input;
</script>

<TreeView
  {collection}
  canRename={() => true}
  onRenameStart={renameStart}
  onBeforeRename={beforeRename}
  onRenameComplete={renameComplete}
>
  <TreeViewLabel>Rename files</TreeViewLabel>
  <TreeViewTree>
    <TreeViewNodeProvider node={collection.rootNode.children![1]!} indexPath={[1]}>
      <TreeViewItem>
        <TreeViewItemText>README.md</TreeViewItemText>
        <TreeViewNodeRenameInput bind:ref={input} data-probe="rename">
          {#snippet asChild(props)}<input {...props()} aria-label="File name" />{/snippet}
        </TreeViewNodeRenameInput>
      </TreeViewItem>
    </TreeViewNodeProvider>
  </TreeViewTree>
</TreeView>