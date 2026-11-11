<script lang="ts">
  import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableRow,
    TableScrollArea,
  } from '@/components/table';

  let { handleClick }: { handleClick: () => void } = $props();
  const refs: Record<'table' | 'scrollArea' | 'caption' | 'row' | 'cell', Element | null> = $state({
    table: null,
    scrollArea: null,
    caption: null,
    row: null,
    cell: null,
  });

  export const getRefs = () => refs;
</script>

<TableScrollArea bind:ref={refs.scrollArea} data-testid="scroll-area" class="scroll-consumer">
  <Table bind:ref={refs.table} class="table-consumer" data-testid="table">
    <TableCaption bind:ref={refs.caption}>Invoices</TableCaption>
    <TableBody>
      <TableRow bind:ref={refs.row} data-testid="row" onclick={handleClick}>
        <TableCell bind:ref={refs.cell}>INV001</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</TableScrollArea>