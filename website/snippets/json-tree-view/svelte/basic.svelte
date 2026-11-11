<script lang="ts">
  import { JsonTreeView, JsonTreeViewTree } from '@moduix/svelte/json-tree-view';

  const deployment = {
    environment: 'production',
    release: {
      branch: 'main',
      commit: '0f4c9d7',
      status: 'ready',
    },
    services: ['docs', 'registry', 'website'],
  };
</script>

<JsonTreeView data={deployment} defaultExpandedDepth={2}>
  <JsonTreeViewTree />
</JsonTreeView>