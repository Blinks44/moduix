<script lang="ts">
  import { Table, TableColumn, TableColumnGroup } from '@/components/table';

  let column: Element | null = $state(null);

  export const getColumn = () => column;
</script>

<Table>
  <TableColumnGroup>
    <TableColumn bind:ref={column} width="40%">
      {#snippet asChild(props)}<col {...props()} data-testid="custom-column" />{/snippet}
    </TableColumn>
  </TableColumnGroup>
</Table>