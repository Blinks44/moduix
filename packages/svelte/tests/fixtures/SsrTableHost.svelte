<script lang="ts">
  import { Table, TableScrollArea } from '@/components/table';
</script>

<TableScrollArea>
  <Table data-testid="table" class="hydrated-table">
    {#snippet asChild(props)}<section {...props()} aria-label="Invoice table">
        Invoice table
      </section>{/snippet}
  </Table>
</TableScrollArea>