<script lang="ts">
  import {
    JsonTreeViewRootProvider,
    JsonTreeViewTree,
    useJsonTreeView,
  } from '@/components/json-tree-view';
  import { data } from './data';

  let { handleClick }: { handleClick: () => void } = $props();
  const tree = useJsonTreeView({ id: 'provider-json', data, defaultExpandedDepth: 1 });
</script>

<JsonTreeViewRootProvider value={tree} data-probe="provider" onclick={handleClick}>
  <JsonTreeViewTree />
</JsonTreeViewRootProvider>