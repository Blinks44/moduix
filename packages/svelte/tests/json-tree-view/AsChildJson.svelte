<script lang="ts">
  import { JsonTreeView, JsonTreeViewTree } from '@/components/json-tree-view';
  import { data } from './data';
</script>

<JsonTreeView {data}>
  {#snippet asChild(props)}
    <section {...props()} aria-label="Release data">
      <JsonTreeViewTree />
    </section>
  {/snippet}
</JsonTreeView>