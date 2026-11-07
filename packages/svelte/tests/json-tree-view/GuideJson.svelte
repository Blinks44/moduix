<script lang="ts">
  import { JsonTreeView, JsonTreeViewTree } from '@/components/json-tree-view';
  import { data } from './data';
</script>

<JsonTreeView {data} defaultExpandedDepth={3}>
  <JsonTreeViewTree>
    {#snippet indentGuide()}<span data-testid="guide">|</span>{/snippet}
    {#snippet renderValue(node)}
      {#if node.type === 'text'}<span data-testid="value">{node.value}</span>{/if}
    {/snippet}
  </JsonTreeViewTree>
</JsonTreeView>