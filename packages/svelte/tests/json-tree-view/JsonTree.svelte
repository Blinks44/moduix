<script lang="ts">
  import {
    JsonTreeView,
    JsonTreeViewTree,
    type JsonTreeViewRootProps,
  } from '@/components/json-tree-view';
  import { data as releaseData } from './data';

  let { data = releaseData, ...props }: Omit<JsonTreeViewRootProps, 'data'> & { data?: unknown } =
    $props();
</script>

<JsonTreeView {...props} {data}>
  <JsonTreeViewTree />
</JsonTreeView>