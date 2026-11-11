<script lang="ts">
  import {
    FlexRender,
    createTable,
    columnVisibilityFeature,
    tableFeatures,
    type ColumnDef,
  } from '@tanstack/svelte-table';
  import { Badge } from '@/components/ui/badge';
  import {
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableColumnGroup,
    TableColumnHeader,
    TableHeader,
    TableRow,
    TableScrollArea,
  } from '@/components/ui/table';
  import styles from './payment-table.module.css';

  const features = tableFeatures({ columnVisibilityFeature });

  type Payment = {
    id: string;
    status: 'pending' | 'processing' | 'success' | 'failed';
    email: string;
    amount: number;
  };

  const payments: Payment[] = [
    { id: '728ed52f', status: 'pending', email: 'm@example.com', amount: 100 },
    { id: '489e1d42', status: 'processing', email: 'abe45@example.com', amount: 125 },
    { id: 'f47ac10b', status: 'success', email: 'monserrat44@example.com', amount: 837 },
  ];

  const columns: ColumnDef<typeof features, Payment>[] = [
    { accessorKey: 'status', header: 'Status' },
    { accessorKey: 'email', header: 'Email' },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ getValue }) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
          getValue<number>(),
        ),
    },
  ];

  const table = createTable({ features, data: payments, columns });
</script>

<TableScrollArea class={styles.root}>
  <Table class={styles.table}>
    <TableColumnGroup>
      <TableColumn width={128} /><TableColumn /><TableColumn width={128} />
    </TableColumnGroup>
    <TableHeader>
      {#each table.getHeaderGroups() as group (group.id)}
        <TableRow>
          {#each group.headers as header (header.id)}
            <TableColumnHeader colspan={header.colSpan} numeric={header.column.id === 'amount'}>
              {#if !header.isPlaceholder}<FlexRender {header} />{/if}
            </TableColumnHeader>
          {/each}
        </TableRow>
      {/each}
    </TableHeader>
    <TableBody>
      {#each table.getRowModel().rows as row (row.id)}
        <TableRow>
          {#each row.getVisibleCells() as cell (cell.id)}
            <TableCell numeric={cell.column.id === 'amount'}>
              {#if cell.column.id === 'status'}
                <Badge variant="outline">{cell.getValue()}</Badge>
              {:else}
                <FlexRender {cell} />
              {/if}
            </TableCell>
          {/each}
        </TableRow>
      {/each}
    </TableBody>
  </Table>
</TableScrollArea>