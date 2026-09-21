import { Badge } from '@moduix/solid/badge';
import { Button } from '@moduix/solid/button';
import { Checkbox, CheckboxControl, CheckboxHiddenInput } from '@moduix/solid/checkbox';
import { Input } from '@moduix/solid/input';
import { Table } from '@moduix/solid/table';
import {
  columnFilteringFeature,
  columnVisibilityFeature,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  createTable,
  filterFn_includesString,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_text,
  tableFeatures,
  type Column,
  type ColumnDef,
  type ColumnFiltersState,
  type RowSelectionState,
  type SortingState,
} from '@tanstack/solid-table';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-solid';
import { For, Show, createSignal } from 'solid-js';

const features = tableFeatures({
  columnFilteringFeature,
  filteredRowModel: createFilteredRowModel(),
  filterFns: { includesString: filterFn_includesString },
  columnVisibilityFeature,
  rowPaginationFeature,
  paginatedRowModel: createPaginatedRowModel(),
  rowSelectionFeature,
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  sortFns: { alphanumeric: sortFn_alphanumeric, text: sortFn_text },
});

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
  { id: '1d4e6b8a', status: 'success', email: 'silas22@example.com', amount: 874 },
  { id: '9f4d7a1e', status: 'failed', email: 'carmella@example.com', amount: 721 },
  { id: 'e42fd2b7', status: 'pending', email: 'ken99@example.com', amount: 316 },
  { id: 'e1cc54f1', status: 'processing', email: 'jules81@example.com', amount: 242 },
  { id: '1b78e240', status: 'success', email: 'tina52@example.com', amount: 668 },
];

const columns: ColumnDef<typeof features, Payment>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected()
            ? true
            : table.getIsSomePageRowsSelected()
              ? 'indeterminate'
              : false
        }
        aria-label="Select all rows on this page"
        onCheckedChange={(details) => table.toggleAllPageRowsSelected(details.checked === true)}
      >
        <CheckboxControl />
        <CheckboxHiddenInput />
      </Checkbox>
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        aria-label={`Select ${row.original.email}`}
        onCheckedChange={(details) => row.toggleSelected(details.checked === true)}
      >
        <CheckboxControl />
        <CheckboxHiddenInput />
      </Checkbox>
    ),
    enableHiding: false,
    enableSorting: false,
  },
  { accessorKey: 'status', header: 'Status', enableSorting: false },
  {
    accessorKey: 'email',
    header: ({ column }) => <SortButton label="Email" column={column} />,
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => <SortButton label="Amount" column={column} />,
    cell: ({ getValue }) =>
      new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
        getValue<number>(),
      ),
  },
];

export default function DataTableDemo() {
  const [sorting, setSorting] = createSignal<SortingState>([]);
  const [columnFilters, setColumnFilters] = createSignal<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = createSignal<RowSelectionState>({});
  const table = createTable({
    features,
    data: payments,
    columns,
    getRowId: (row) => row.id,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    initialState: { pagination: { pageIndex: 0, pageSize: 5 } },
    get state() {
      return {
        columnFilters: columnFilters(),
        rowSelection: rowSelection(),
        sorting: sorting(),
      };
    },
  });

  return (
    <div class="data-table">
      <div class="data-table-toolbar">
        <Input
          placeholder="Filter emails..."
          aria-label="Filter emails"
          value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
          onInput={(event) => table.getColumn('email')?.setFilterValue(event.currentTarget.value)}
        />
        <span>
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected
        </span>
      </div>

      <Table.ScrollArea>
        <Table interactive class="data-table-table">
          <Table.ColumnGroup>
            <Table.Column htmlWidth={48} />
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
                        class={
                          header.column.id === 'select' ? 'data-table-selection-column' : undefined
                        }
                        numeric={header.column.id === 'amount'}
                        aria-sort={sortDirection(header.column.getIsSorted())}
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
            <Show
              when={table.getRowModel().rows.length}
              fallback={
                <Table.Empty colSpan={table.getVisibleLeafColumns().length}>
                  No results.
                </Table.Empty>
              }
            >
              <For each={table.getRowModel().rows}>
                {(row) => (
                  <Table.Row data-selected={row.getIsSelected() || undefined}>
                    <For each={row.getVisibleCells()}>
                      {(cell) => (
                        <Table.Cell
                          class={
                            cell.column.id === 'select' ? 'data-table-selection-column' : undefined
                          }
                          numeric={cell.column.id === 'amount'}
                        >
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
            </Show>
          </Table.Body>
        </Table>
      </Table.ScrollArea>

      <div class="data-table-pagination">
        <span>
          Page {table.atoms.pagination.get().pageIndex + 1} of {table.getPageCount()}
        </span>
        <div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

function SortButton(props: { label: string; column: Column<typeof features, Payment> }) {
  const direction = () => props.column.getIsSorted();

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      aria-label={`Sort ${props.label.toLowerCase()} ${direction() === 'asc' ? 'descending' : 'ascending'}`}
      onClick={() => props.column.toggleSorting(direction() === 'asc')}
    >
      {props.label}
      <Show
        when={direction() === 'asc'}
        fallback={
          <Show when={direction() === 'desc'} fallback={<ArrowUpDown aria-hidden size={16} />}>
            <ArrowDown aria-hidden size={16} />
          </Show>
        }
      >
        <ArrowUp aria-hidden size={16} />
      </Show>
    </Button>
  );
}

function sortDirection(direction: false | 'asc' | 'desc') {
  if (direction === 'asc') return 'ascending';
  if (direction === 'desc') return 'descending';
  return 'none';
}