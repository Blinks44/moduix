import { Badge, Button, Checkbox, InputGroup, Menu, Table } from '@moduix/react';
import { Link } from '@tanstack/react-router';
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
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpDown,
  Columns3,
  Ellipsis,
  Search,
} from 'lucide-react';
import { useState } from 'react';
import styles from './home-data-table.module.css';

type ComponentRow = {
  category: string;
  id: string;
  installations: number;
  name: string;
  owner: string;
  release: string;
  status: 'Stable' | 'Preview';
  updated: string;
};

const componentRows: ComponentRow[] = [
  {
    id: 'accordion',
    name: 'Accordion',
    category: 'Disclosure',
    status: 'Stable',
    owner: 'Foundations',
    release: 'v1.7.0',
    updated: 'Today',
    installations: 4821,
  },
  {
    id: 'combobox',
    name: 'Combobox',
    category: 'Form control',
    status: 'Stable',
    owner: 'Foundations',
    release: 'v1.6.0',
    updated: 'Yesterday',
    installations: 3890,
  },
  {
    id: 'table',
    name: 'Table',
    category: 'Data display',
    status: 'Stable',
    owner: 'Foundations',
    release: 'v1.7.0',
    updated: '2 days ago',
    installations: 4367,
  },
  {
    id: 'date-picker',
    name: 'Date Picker',
    category: 'Form control',
    status: 'Stable',
    owner: 'Foundations',
    release: 'v1.7.0',
    updated: '3 days ago',
    installations: 3512,
  },
  {
    id: 'dialog',
    name: 'Dialog',
    category: 'Overlay',
    status: 'Stable',
    owner: 'Platform',
    release: 'v1.7.0',
    updated: '4 days ago',
    installations: 5669,
  },
  {
    id: 'lightbox',
    name: 'Lightbox',
    category: 'Overlay',
    status: 'Preview',
    owner: 'Media',
    release: 'v1.5.0',
    updated: 'Last week',
    installations: 1982,
  },
  {
    id: 'select',
    name: 'Select',
    category: 'Form control',
    status: 'Stable',
    owner: 'Foundations',
    release: 'v1.7.0',
    updated: 'Last week',
    installations: 5108,
  },
  {
    id: 'sidebar',
    name: 'Sidebar',
    category: 'Navigation',
    status: 'Preview',
    owner: 'Navigation',
    release: 'v1.6.0',
    updated: 'Jul 4',
    installations: 2239,
  },
  {
    id: 'split-button',
    name: 'Split Button',
    category: 'Action',
    status: 'Stable',
    owner: 'Foundations',
    release: 'v1.7.0',
    updated: 'Jul 2',
    installations: 1743,
  },
  {
    id: 'alert',
    name: 'Alert',
    category: 'Feedback',
    status: 'Stable',
    owner: 'Foundations',
    release: 'v1.7.0',
    updated: 'Jul 1',
    installations: 4286,
  },
  {
    id: 'avatar',
    name: 'Avatar',
    category: 'Data display',
    status: 'Stable',
    owner: 'Foundations',
    release: 'v1.6.0',
    updated: 'Jun 30',
    installations: 3954,
  },
  {
    id: 'button',
    name: 'Button',
    category: 'Action',
    status: 'Stable',
    owner: 'Foundations',
    release: 'v1.7.0',
    updated: 'Jun 28',
    installations: 6842,
  },
  {
    id: 'carousel',
    name: 'Carousel',
    category: 'Data display',
    status: 'Preview',
    owner: 'Media',
    release: 'v1.5.0',
    updated: 'Jun 26',
    installations: 1680,
  },
  {
    id: 'color-picker',
    name: 'Color Picker',
    category: 'Form control',
    status: 'Stable',
    owner: 'Foundations',
    release: 'v1.7.0',
    updated: 'Jun 24',
    installations: 2115,
  },
  {
    id: 'field',
    name: 'Field',
    category: 'Form control',
    status: 'Stable',
    owner: 'Foundations',
    release: 'v1.7.0',
    updated: 'Jun 21',
    installations: 4729,
  },
  {
    id: 'file-upload',
    name: 'File Upload',
    category: 'Form control',
    status: 'Preview',
    owner: 'Platform',
    release: 'v1.6.0',
    updated: 'Jun 19',
    installations: 1872,
  },
  {
    id: 'pagination',
    name: 'Pagination',
    category: 'Navigation',
    status: 'Stable',
    owner: 'Navigation',
    release: 'v1.7.0',
    updated: 'Jun 17',
    installations: 3317,
  },
  {
    id: 'tooltip',
    name: 'Tooltip',
    category: 'Overlay',
    status: 'Stable',
    owner: 'Platform',
    release: 'v1.7.0',
    updated: 'Jun 14',
    installations: 5091,
  },
];

const columnWidths = {
  actions: 56,
  category: 148,
  installations: 116,
  name: 196,
  owner: 136,
  release: 100,
  select: 52,
  status: 104,
  updated: 118,
};

const columns: ColumnDef<ComponentRow>[] = [
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
        aria-label="Select all visible components"
        onCheckedChange={(details) => table.toggleAllPageRowsSelected(details.checked === true)}
      >
        <Checkbox.Control />
      </Checkbox>
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        aria-label={`Select ${row.original.name}`}
        onCheckedChange={(details) => row.toggleSelected(details.checked === true)}
      >
        <Checkbox.Control />
      </Checkbox>
    ),
    enableHiding: false,
    enableSorting: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button
        type="button"
        variant="ghost"
        size="sm"
        aria-label={`Sort component ${column.getIsSorted() === 'asc' ? 'descending' : 'ascending'}`}
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Component
        <SortIcon direction={column.getIsSorted()} />
      </Button>
    ),
    cell: ({ row }) => (
      <div className={styles.componentName}>
        <strong>{row.original.name}</strong>
        <span>{row.original.id}</span>
      </div>
    ),
  },
  { accessorKey: 'category', header: 'Category', enableSorting: false },
  {
    accessorKey: 'status',
    header: 'Status',
    enableSorting: false,
    cell: ({ getValue }) => (
      <Badge variant={getValue<ComponentRow['status']>() === 'Stable' ? 'secondary' : 'outline'}>
        {getValue<ComponentRow['status']>()}
      </Badge>
    ),
  },
  { accessorKey: 'owner', header: 'Owner', enableSorting: false },
  { accessorKey: 'release', header: 'Release', enableSorting: false },
  {
    accessorKey: 'updated',
    header: ({ column }) => (
      <Button
        type="button"
        variant="ghost"
        size="sm"
        aria-label={`Sort updated date ${column.getIsSorted() === 'asc' ? 'descending' : 'ascending'}`}
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Updated
        <SortIcon direction={column.getIsSorted()} />
      </Button>
    ),
  },
  {
    accessorKey: 'installations',
    header: ({ column }) => (
      <Button
        type="button"
        variant="ghost"
        size="sm"
        aria-label={`Sort installations ${column.getIsSorted() === 'asc' ? 'descending' : 'ascending'}`}
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Installs
        <SortIcon direction={column.getIsSorted()} />
      </Button>
    ),
    cell: ({ getValue }) => new Intl.NumberFormat('en-US').format(getValue<number>()),
  },
  {
    id: 'actions',
    header: () => <span className={styles.visuallyHidden}>Actions</span>,
    cell: ({ row }) => <RowActions id={row.original.id} name={row.original.name} />,
    enableHiding: false,
    enableSorting: false,
  },
];

function HomeDataTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const table = useReactTable({
    data: componentRows,
    columns,
    getRowId: (row) => row.id,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    initialState: { pagination: { pageSize: 6 } },
    state: { columnFilters, rowSelection, sorting },
  });

  return (
    <div className={styles.root}>
      <div className={styles.toolbar}>
        <InputGroup className={styles.search}>
          <InputGroup.Addon>
            <Search size={16} aria-hidden="true" />
          </InputGroup.Addon>
          <InputGroup.Input
            placeholder="Search components..."
            aria-label="Search components"
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
          />
        </InputGroup>
        <div className={styles.toolbarActions}>
          <ColumnVisibilityMenu table={table} />
          <span className={styles.selectionSummary}>
            {table.getFilteredSelectedRowModel().rows.length} selected
          </span>
        </div>
      </div>

      <Table.ScrollArea className={styles.scrollArea}>
        <Table interactive className={styles.table}>
          <Table.ColumnGroup>
            {table.getVisibleLeafColumns().map((column) => (
              <Table.Column
                key={column.id}
                htmlWidth={columnWidths[column.id as keyof typeof columnWidths]}
              />
            ))}
          </Table.ColumnGroup>
          <Table.Header>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Row key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Table.ColumnHeader
                    key={header.id}
                    colSpan={header.colSpan}
                    className={
                      header.column.id === 'select' || header.column.id === 'actions'
                        ? styles.iconColumn
                        : undefined
                    }
                    numeric={header.column.id === 'installations'}
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
                        cell.column.id === 'select' || cell.column.id === 'actions'
                          ? styles.iconColumn
                          : undefined
                      }
                      numeric={cell.column.id === 'installations'}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))
            ) : (
              <Table.Empty colSpan={table.getVisibleLeafColumns().length}>
                No components found.
              </Table.Empty>
            )}
          </Table.Body>
        </Table>
      </Table.ScrollArea>

      <div className={styles.pagination}>
        <span className={styles.pageSummary}>
          Showing {table.getRowModel().rows.length} of {table.getFilteredRowModel().rows.length}{' '}
          components
        </span>
        <div className={styles.paginationControls}>
          <Button
            type="button"
            variant="outline"
            size="sm"
            aria-label="Previous page"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ArrowLeft size={16} aria-hidden="true" />
          </Button>
          <span className={styles.pageSummary}>
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            aria-label="Next page"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ArrowRight size={16} aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function ColumnVisibilityMenu({
  table,
}: {
  table: ReturnType<typeof useReactTable<ComponentRow>>;
}) {
  return (
    <Menu closeOnSelect={false} positioning={{ placement: 'bottom-end', gutter: 8 }}>
      <Menu.Trigger asChild>
        <Button type="button" variant="outline" size="sm">
          <Columns3 size={16} aria-hidden="true" />
          Columns
        </Button>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.ItemGroup>
            <Menu.ItemGroupLabel>Visible columns</Menu.ItemGroupLabel>
            {table
              .getAllLeafColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <Menu.CheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  value={column.id}
                  onCheckedChange={() => column.toggleVisibility()}
                >
                  <Menu.ItemIndicator />
                  <Menu.ItemText>
                    {column.id === 'installations' ? 'Installs' : column.id}
                  </Menu.ItemText>
                </Menu.CheckboxItem>
              ))}
          </Menu.ItemGroup>
        </Menu.Content>
      </Menu.Positioner>
    </Menu>
  );
}

function RowActions({ id, name }: { id: string; name: string }) {
  const installCommand = `npx shadcn@latest add Blinks44/moduix/react-${id}`;

  return (
    <Menu positioning={{ placement: 'bottom-end', gutter: 8 }}>
      <Menu.Trigger asChild>
        <Button type="button" variant="ghost" size="sm" aria-label={`Actions for ${name}`}>
          <Ellipsis size={16} aria-hidden="true" />
        </Button>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Item value="open-docs" asChild>
            <Link to="/docs/$" params={{ _splat: id }}>
              Open documentation
            </Link>
          </Menu.Item>
          <Menu.Item
            value="copy-install"
            onSelect={() => void navigator.clipboard.writeText(installCommand)}
          >
            Copy install command
          </Menu.Item>
          <Menu.Separator />
          <Menu.Item value="view-source" asChild>
            <a
              href={`https://github.com/Blinks44/moduix/tree/main/packages/react/src/components/${id}`}
              target="_blank"
              rel="noreferrer"
            >
              View source
            </a>
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu>
  );
}

function SortIcon({ direction }: { direction: false | 'asc' | 'desc' }) {
  if (direction === 'asc') {
    return <ArrowUp size={16} aria-hidden="true" />;
  }

  if (direction === 'desc') {
    return <ArrowDown size={16} aria-hidden="true" />;
  }

  return <ArrowUpDown size={16} aria-hidden="true" />;
}

export { HomeDataTable };