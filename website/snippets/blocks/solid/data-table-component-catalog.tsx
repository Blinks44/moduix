import {
  columnFilteringFeature,
  columnVisibilityFeature,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_includesString,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_text,
  tableFeatures,
  createTable,
  type ColumnDef,
  type ColumnFiltersState,
  type RowSelectionState,
  type SortingState,
} from '@tanstack/solid-table';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpDown,
  Columns3,
  Ellipsis,
  Search,
} from 'lucide-solid';
import { createSignal, For, Show } from 'solid-js';
import { Badge } from '@/registry/solid/ui/badge';
import { Button } from '@/registry/solid/ui/button';
import { Checkbox, CheckboxControl, CheckboxHiddenInput } from '@/registry/solid/ui/checkbox';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/registry/solid/ui/input-group';
import {
  Menu,
  MenuTrigger,
  MenuPositioner,
  MenuContent,
  MenuViewport,
  MenuItem,
  MenuItemGroup,
  MenuItemGroupLabel,
  MenuCheckboxItem,
  MenuItemIndicator,
  MenuItemText,
} from '@/registry/solid/ui/menu';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableColumnGroup,
  TableColumnHeader,
  TableEmpty,
  TableHeader,
  TableRow,
  TableScrollArea,
} from '@/registry/solid/ui/table';
import styles from './data-table.module.css';

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
  actions: 80,
  category: 148,
  installations: 116,
  name: 196,
  owner: 136,
  release: 100,
  select: 52,
  status: 104,
  updated: 118,
};

const columns: ColumnDef<typeof features, ComponentRow>[] = [
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
        <CheckboxControl />
        <CheckboxHiddenInput />
      </Checkbox>
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        aria-label={`Select ${row.original.name}`}
        onCheckedChange={(details) => row.toggleSelected(details.checked === true)}
      >
        <CheckboxControl />
        <CheckboxHiddenInput />
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
      <div class={styles.componentName}>
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
    header: () => <span class={styles.visuallyHidden}>Actions</span>,
    cell: ({ row }) => <RowActions id={row.original.id} name={row.original.name} />,
    enableHiding: false,
    enableSorting: false,
  },
];

function DataTable() {
  const [sorting, setSorting] = createSignal<SortingState>([]);
  const [columnFilters, setColumnFilters] = createSignal<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = createSignal<RowSelectionState>({});
  const table = createTable({
    features,
    data: componentRows,
    columns,
    getRowId: (row) => row.id,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    initialState: { pagination: { pageIndex: 0, pageSize: 6 } },
    get state() {
      return { columnFilters: columnFilters(), rowSelection: rowSelection(), sorting: sorting() };
    },
  });

  return (
    <div class={styles.root}>
      <div class={styles.toolbar}>
        <InputGroup class={styles.search}>
          <InputGroupAddon>
            <Search size={16} aria-hidden="true" />
          </InputGroupAddon>
          <InputGroupInput
            placeholder="Search components..."
            aria-label="Search components"
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onInput={(event) => table.getColumn('name')?.setFilterValue(event.currentTarget.value)}
          />
        </InputGroup>
        <div class={styles.toolbarActions}>
          <ColumnVisibilityMenu table={table} />
          <span class={styles.selectionSummary}>
            {table.getFilteredSelectedRowModel().rows.length} selected
          </span>
        </div>
      </div>

      <TableScrollArea class={styles.scrollArea}>
        <Table interactive class={styles.table}>
          <TableColumnGroup>
            <For each={table.getVisibleLeafColumns()}>
              {(column) => (
                <TableColumn htmlWidth={columnWidths[column.id as keyof typeof columnWidths]} />
              )}
            </For>
          </TableColumnGroup>
          <TableHeader>
            <For each={table.getHeaderGroups()}>
              {(headerGroup) => (
                <TableRow>
                  <For each={headerGroup.headers}>
                    {(header) => (
                      <TableColumnHeader
                        colSpan={header.colSpan}
                        class={
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
                        {header.isPlaceholder ? null : <table.FlexRender header={header} />}
                      </TableColumnHeader>
                    )}
                  </For>
                </TableRow>
              )}
            </For>
          </TableHeader>
          <TableBody>
            <Show
              when={table.getRowModel().rows.length}
              fallback={
                <TableEmpty colSpan={table.getVisibleLeafColumns().length}>
                  No components found.
                </TableEmpty>
              }
            >
              <For each={table.getRowModel().rows}>
                {(row) => (
                  <TableRow data-selected={row.getIsSelected() || undefined}>
                    <For each={row.getVisibleCells()}>
                      {(cell) => (
                        <TableCell
                          class={
                            cell.column.id === 'select' || cell.column.id === 'actions'
                              ? styles.iconColumn
                              : undefined
                          }
                          numeric={cell.column.id === 'installations'}
                        >
                          {<table.FlexRender cell={cell} />}
                        </TableCell>
                      )}
                    </For>
                  </TableRow>
                )}
              </For>
            </Show>
          </TableBody>
        </Table>
      </TableScrollArea>

      <div class={styles.pagination}>
        <span class={styles.pageSummary}>
          Showing {table.getRowModel().rows.length} of {table.getFilteredRowModel().rows.length}{' '}
          components
        </span>
        <div class={styles.paginationControls}>
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
          <span class={styles.pageSummary}>
            Page {table.atoms.pagination.get().pageIndex + 1} of {table.getPageCount()}
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

function ColumnVisibilityMenu(props: {
  table: ReturnType<typeof createTable<typeof features, ComponentRow>>;
}) {
  return (
    <Menu closeOnSelect={false} positioning={{ placement: 'bottom-end', gutter: 8 }}>
      <MenuTrigger
        asChild={(triggerProps) => (
          <Button {...triggerProps()} type="button" variant="outline" size="sm">
            <Columns3 size={16} aria-hidden="true" />
            Columns
          </Button>
        )}
      />
      <MenuPositioner>
        <MenuContent>
          <MenuViewport>
            <MenuItemGroup>
              <MenuItemGroupLabel>Visible columns</MenuItemGroupLabel>
              <For each={props.table.getAllLeafColumns().filter((column) => column.getCanHide())}>
                {(column) => (
                  <MenuCheckboxItem
                    checked={column.getIsVisible()}
                    value={column.id}
                    onCheckedChange={() => column.toggleVisibility()}
                  >
                    <MenuItemIndicator />
                    <MenuItemText>
                      {column.id === 'installations' ? 'Installs' : column.id}
                    </MenuItemText>
                  </MenuCheckboxItem>
                )}
              </For>
            </MenuItemGroup>
          </MenuViewport>
        </MenuContent>
      </MenuPositioner>
    </Menu>
  );
}

function RowActions(props: { id: string; name: string }) {
  return (
    <Menu positioning={{ placement: 'bottom-end', gutter: 8 }}>
      <MenuTrigger
        asChild={(triggerProps) => (
          <Button
            {...triggerProps()}
            type="button"
            variant="ghost"
            size="sm"
            class={styles.rowActionsTrigger}
            aria-label={`Actions for ${props.name}`}
          >
            <Ellipsis size={16} aria-hidden="true" />
          </Button>
        )}
      />
      <MenuPositioner>
        <MenuContent>
          <MenuViewport>
            <MenuItem
              value="open-docs"
              asChild={(itemProps) => (
                <a {...itemProps()} href={`#${props.id}`}>
                  Open details
                </a>
              )}
            />
            <MenuItem
              value="copy-identifier"
              onSelect={() => void navigator.clipboard.writeText(props.id)}
            >
              Copy identifier
            </MenuItem>
          </MenuViewport>
        </MenuContent>
      </MenuPositioner>
    </Menu>
  );
}

function SortIcon(props: { direction: false | 'asc' | 'desc' }) {
  return (
    <Show
      when={props.direction === 'asc'}
      fallback={
        <Show
          when={props.direction === 'desc'}
          fallback={<ArrowUpDown size={16} aria-hidden="true" />}
        >
          <ArrowDown size={16} aria-hidden="true" />
        </Show>
      }
    >
      <ArrowUp size={16} aria-hidden="true" />
    </Show>
  );
}

export { DataTable };