/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Badge, Button, Checkbox, Input, Table } from '@moduix/react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type RowSelectionState,
  type SortingState,
} from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { useState } from 'react';

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

const columns: ColumnDef<Payment>[] = [
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
        <Checkbox.Control />
      </Checkbox>
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        aria-label={`Select ${row.original.email}`}
        onCheckedChange={(details) => row.toggleSelected(details.checked === true)}
      >
        <Checkbox.Control />
      </Checkbox>
    ),
    enableHiding: false,
    enableSorting: false,
  },
  { accessorKey: 'status', header: 'Status', enableSorting: false },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <Button
        type="button"
        variant="ghost"
        size="sm"
        aria-label={`Sort email ${column.getIsSorted() === 'asc' ? 'descending' : 'ascending'}`}
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Email
        {column.getIsSorted() === 'asc' ? (
          <ArrowUp aria-hidden size={16} />
        ) : column.getIsSorted() === 'desc' ? (
          <ArrowDown aria-hidden size={16} />
        ) : (
          <ArrowUpDown aria-hidden size={16} />
        )}
      </Button>
    ),
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => (
      <Button
        type="button"
        variant="ghost"
        size="sm"
        aria-label={`Sort amount ${column.getIsSorted() === 'asc' ? 'descending' : 'ascending'}`}
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Amount
        {column.getIsSorted() === 'asc' ? (
          <ArrowUp aria-hidden size={16} />
        ) : column.getIsSorted() === 'desc' ? (
          <ArrowDown aria-hidden size={16} />
        ) : (
          <ArrowUpDown aria-hidden size={16} />
        )}
      </Button>
    ),
    cell: ({ getValue }) =>
      new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
        getValue<number>(),
      ),
  },
];

export function InteractiveDataTableDemo() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const table = useReactTable({
    data: payments,
    columns,
    getRowId: (row) => row.id,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    initialState: { pagination: { pageSize: 5 } },
    state: { columnFilters, rowSelection, sorting },
  });

  return (
    <div className="data-table">
      <div className="data-table-toolbar">
        <Input
          placeholder="Filter emails..."
          aria-label="Filter emails"
          value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('email')?.setFilterValue(event.target.value)}
        />
        <span>
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected
        </span>
      </div>

      <Table.ScrollArea>
        <Table interactive className="data-table-table">
          <Table.ColumnGroup>
            <Table.Column htmlWidth={48} />
            <Table.Column htmlWidth={128} />
            <Table.Column />
            <Table.Column htmlWidth={128} />
          </Table.ColumnGroup>
          <Table.Header>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Row key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Table.ColumnHeader
                    key={header.id}
                    colSpan={header.colSpan}
                    className={
                      header.column.id === 'select' ? 'data-table-selection-column' : undefined
                    }
                    numeric={header.column.id === 'amount'}
                    aria-sort={
                      header.column.getCanSort()
                        ? header.column.getIsSorted() === 'asc'
                          ? 'ascending'
                          : header.column.getIsSorted() === 'desc'
                            ? 'descending'
                            : 'none'
                        : undefined
                    }
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </Table.ColumnHeader>
                ))}
              </Table.Row>
            ))}
          </Table.Header>
          <Table.Body>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <Table.Row key={row.id} data-selected={row.getIsSelected() || undefined}>
                  {row.getVisibleCells().map((cell) => (
                    <Table.Cell
                      key={cell.id}
                      className={
                        cell.column.id === 'select' ? 'data-table-selection-column' : undefined
                      }
                      numeric={cell.column.id === 'amount'}
                    >
                      {cell.column.id === 'status' ? (
                        <Badge variant="outline">{cell.getValue<string>()}</Badge>
                      ) : (
                        flexRender(cell.column.columnDef.cell, cell.getContext())
                      )}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))
            ) : (
              <Table.Empty colSpan={table.getVisibleLeafColumns().length}>No results.</Table.Empty>
            )}
          </Table.Body>
        </Table>
      </Table.ScrollArea>

      <div className="data-table-pagination">
        <span>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
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

//#endregion