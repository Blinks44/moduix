<script lang="ts">
  import { Table } from '@/components/table';

  let root: Element | null = $state(null);

  export const getRoot = () => root;
</script>

<Table bind:ref={root} size="sm">
  {#snippet asChild(props)}<section {...props()} aria-label="Invoice table"></section>{/snippet}
</Table>