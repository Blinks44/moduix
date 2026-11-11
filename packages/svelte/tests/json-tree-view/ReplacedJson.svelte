<script lang="ts">
  import JsonTree from './JsonTree.svelte';

  let { data }: { data: unknown } = $props();
</script>

<JsonTree {data} defaultExpandedDepth={2} />