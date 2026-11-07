<script lang="ts">
  import { TreeView } from '@/components/tree-view';
  import { collection } from './files';
  import TreeParts from './TreeParts.svelte';

  let { events }: { events: string[][] } = $props();
  let expandedValue: string[] = $state([]);
</script>

<TreeView
  bind:expandedValue
  {collection}
  onExpandedChange={(details) => events.push(details.expandedValue)}
>
  <TreeParts {collection} />
</TreeView>
<output>Expanded: {expandedValue.join(', ')}</output>