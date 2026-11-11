<script lang="ts">
  import { JsonTreeView, JsonTreeViewTree } from '@/components/json-tree-view';
  import { data } from '../json-tree-view/data';
</script>

<JsonTreeView {data} defaultExpandedDepth={1}>
  <JsonTreeViewTree />
</JsonTreeView>