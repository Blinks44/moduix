import { Badge } from '@moduix/solid/badge';
import { Table } from '@moduix/solid/table';
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
    <Table.ScrollArea class="data-table">
      <Table class="data-table-table">
        <Table.ColumnGroup>
          <Table.Column htmlWidth={128} />
          <Table.Column />
          <Table.Column htmlWidth={128} />
        </Table.ColumnGroup>
        <Table.Header>
          <For each={table.getHeaderGroups()}>
            {(headerGroup) => (
              <Table.Row>
                <For each={headerGroup.headers}>
                  {(header) => (
                    <Table.ColumnHeader
                      colSpan={header.colSpan}
                      numeric={header.column.id === 'amount'}
                    >
                      <Show when={!header.isPlaceholder}>
                        <table.FlexRender header={header} />
                      </Show>
                    </Table.ColumnHeader>
                  )}
                </For>
              </Table.Row>
            )}
          </For>
        </Table.Header>
        <Table.Body>
          <For each={table.getRowModel().rows}>
            {(row) => (
              <Table.Row>
                <For each={row.getVisibleCells()}>
                  {(cell) => (
                    <Table.Cell numeric={cell.column.id === 'amount'}>
                      <Show
                        when={cell.column.id === 'status'}
                        fallback={<table.FlexRender cell={cell} />}
                      >
                        <Badge variant="outline">{cell.getValue<string>()}</Badge>
                      </Show>
                    </Table.Cell>
                  )}
                </For>
              </Table.Row>
            )}
          </For>
        </Table.Body>
      </Table>
    </Table.ScrollArea>
  );
}