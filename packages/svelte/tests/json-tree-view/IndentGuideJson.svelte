<script lang="ts">
  import {
    JsonTreeViewRoot,
    JsonTreeViewTree as ArkJsonTreeViewTree,
  } from '@ark-ui/svelte/json-tree-view';
  import { JsonTreeView, JsonTreeViewTree } from '@/components/json-tree-view';
  import { data } from './data';

  let { ark = false }: { ark?: boolean } = $props();
</script>

{#if ark}
  <JsonTreeViewRoot {data} defaultExpandedDepth={3}
    ><ArkJsonTreeViewTree indentGuide /></JsonTreeViewRoot
  >
{:else}
  <JsonTreeView {data} defaultExpandedDepth={3}><JsonTreeViewTree indentGuide /></JsonTreeView>
{/if}