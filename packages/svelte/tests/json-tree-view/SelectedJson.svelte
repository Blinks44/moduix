<script lang="ts">
  import { JsonTreeView, JsonTreeViewTree } from '@/components/json-tree-view';
  import { data } from './data';

  let selectedValue: string[] = $state([]);

  export const read = () => selectedValue;
</script>

<JsonTreeView {data} defaultExpandedDepth={3} bind:selectedValue>
  <JsonTreeViewTree />
</JsonTreeView>