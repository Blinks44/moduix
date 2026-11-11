<script lang="ts">
  import { JsonTreeView, JsonTreeViewTree } from '@/components/json-tree-view';
  import { data } from './data';
</script>

<JsonTreeView {data} defaultExpandedDepth={1}>
  <JsonTreeViewTree>
    {#snippet arrow()}<span data-testid="custom-arrow">+</span>{/snippet}
  </JsonTreeViewTree>
</JsonTreeView>