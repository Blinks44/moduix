import { Badge } from '@moduix/solid/badge';
import { Table, TableBody, TableCell, TableColumn, TableColumnGroup, TableColumnHeader, TableHeader, TableRow, TableScrollArea } from '@moduix/solid/table';
import {
  createTable,
  columnVisibilityFeature,
  tableFeatures,
  type ColumnDef,
} from '@tanstack/solid-table';
import { For, Show } from 'solid-js';

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

export default function DataTableDemo() {
  const table = createTable({ features, data: payments, columns });

  return (
    <TableScrollArea class="data-table">
      <Table class="data-table-table">
        <TableColumnGroup>
          <TableColumn htmlWidth={128} />
          <TableColumn />
          <TableColumn htmlWidth={128} />
        </TableColumnGroup>
        <TableHeader>
          <For each={table.getHeaderGroups()}>
            {(headerGroup) => (
              <TableRow>
                <For each={headerGroup.headers}>
                  {(header) => (
                    <TableColumnHeader
                      colSpan={header.colSpan}
                      numeric={header.column.id === 'amount'}
                    >
                      <Show when={!header.isPlaceholder}>
                        <table.FlexRender header={header} />
                      </Show>
                    </TableColumnHeader>
                  )}
                </For>
              </TableRow>
            )}
          </For>
        </TableHeader>
        <TableBody>
          <For each={table.getRowModel().rows}>
            {(row) => (
              <TableRow>
                <For each={row.getVisibleCells()}>
                  {(cell) => (
                    <TableCell numeric={cell.column.id === 'amount'}>
                      <Show
                        when={cell.column.id === 'status'}
                        fallback={<table.FlexRender cell={cell} />}
                      >
                        <Badge variant="outline">{cell.getValue<string>()}</Badge>
                      </Show>
                    </TableCell>
                  )}
                </For>
              </TableRow>
            )}
          </For>
        </TableBody>
      </Table>
    </TableScrollArea>
  );
}
