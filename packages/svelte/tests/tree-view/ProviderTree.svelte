<script lang="ts">
  import {
    TreeViewItem,
    TreeViewLabel,
    TreeViewNodeProvider,
    TreeViewRootProvider,
    TreeViewTree,
    useTreeView,
  } from '@/components/tree-view';
  import { collection } from './files';

  const treeView = useTreeView({ id: 'provider-tree', collection });
  const refs: Record<'provider' | 'item', Element | null> = $state({ provider: null, item: null });

  export const getRefs = () => refs;
</script>

<TreeViewRootProvider bind:ref={refs.provider} value={treeView}>
  {#snippet asChild(props)}
    <section {...props()} data-probe="provider-host">
      <TreeViewLabel>Documentation</TreeViewLabel>
      <TreeViewTree>
        <TreeViewNodeProvider node={collection.rootNode.children![1]!} indexPath={[1]}>
          <TreeViewItem bind:ref={refs.item}>
            {#snippet asChild(itemProps)}<a {...itemProps()} href="/docs">README.md</a>{/snippet}
          </TreeViewItem>
        </TreeViewNodeProvider>
      </TreeViewTree>
    </section>
  {/snippet}
</TreeViewRootProvider>