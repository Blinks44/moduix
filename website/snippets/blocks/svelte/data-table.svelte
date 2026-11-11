<script lang="ts">
  import ArrowDown from '@lucide/svelte/icons/arrow-down';
  import ArrowLeft from '@lucide/svelte/icons/arrow-left';
  import ArrowRight from '@lucide/svelte/icons/arrow-right';
  import ArrowUp from '@lucide/svelte/icons/arrow-up';
  import ArrowUpDown from '@lucide/svelte/icons/arrow-up-down';
  import Columns3 from '@lucide/svelte/icons/columns-3';
  import Ellipsis from '@lucide/svelte/icons/ellipsis';
  import Search from '@lucide/svelte/icons/search';
  import {
    FlexRender,
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
    type ColumnDef,
  } from '@tanstack/svelte-table';
  import { Badge } from '@/components/ui/badge';
  import { Button } from '@/components/ui/button';
  import { Checkbox, CheckboxControl, CheckboxHiddenInput } from '@/components/ui/checkbox';
  import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
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
  } from '@/components/ui/menu';
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
  } from '@/components/ui/table';
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
    { id: 'select', header: '', enableHiding: false, enableSorting: false },
    { accessorKey: 'name', header: 'Component' },
    { accessorKey: 'category', header: 'Category', enableSorting: false },
    { accessorKey: 'status', header: 'Status', enableSorting: false },
    { accessorKey: 'owner', header: 'Owner', enableSorting: false },
    { accessorKey: 'release', header: 'Release', enableSorting: false },
    { accessorKey: 'updated', header: 'Updated' },
    {
      accessorKey: 'installations',
      header: 'Installs',
      cell: ({ getValue }) => new Intl.NumberFormat('en-US').format(getValue<number>()),
    },
    { id: 'actions', header: 'Actions', enableHiding: false, enableSorting: false },
  ];
  const table = createTable({
    features,
    data: componentRows,
    columns,
    getRowId: (row: ComponentRow) => row.id,
    initialState: { pagination: { pageIndex: 0, pageSize: 6 } },
  });
  const pagination = $derived(table.atoms.pagination.get());
  const filterValue = $derived(String(table.getColumn('name')?.getFilterValue() ?? ''));
  const allChecked = $derived(
    table.getIsAllPageRowsSelected()
      ? true
      : table.getIsSomePageRowsSelected()
        ? 'indeterminate'
        : false,
  );
  const widthForColumn = (id: string) => columnWidths[id as keyof typeof columnWidths];
  const sortDirection = (direction: false | 'asc' | 'desc') =>
    direction === 'asc' ? 'ascending' : direction === 'desc' ? 'descending' : 'none';
  const copyIdentifier = (id: string) => navigator.clipboard.writeText(id);
</script>

<div class={styles.root}>
  <div class={styles.toolbar}>
    <InputGroup class={styles.search}>
      <InputGroupAddon><Search size={16} aria-hidden="true" /></InputGroupAddon>
      <InputGroupInput
        aria-label="Filter components"
        placeholder="Search components..."
        value={filterValue}
        oninput={(event) => table.getColumn('name')?.setFilterValue(event.currentTarget.value)}
      />
    </InputGroup>
    <div class={styles.toolbarActions}>
      <Menu closeOnSelect={false} positioning={{ placement: 'bottom-end', gutter: 8 }}>
        <MenuTrigger>
          {#snippet asChild(props)}
            <Button {...props()} type="button" variant="outline" size="sm">
              <Columns3 size={16} aria-hidden="true" />Columns
            </Button>
          {/snippet}
        </MenuTrigger>
        <MenuPositioner>
          <MenuContent>
            <MenuViewport>
              <MenuItemGroup>
                <MenuItemGroupLabel>Visible columns</MenuItemGroupLabel>
                {#each table
                  .getAllLeafColumns()
                  .filter((column) => column.getCanHide()) as column (column.id)}
                  <MenuCheckboxItem
                    checked={column.getIsVisible()}
                    value={column.id}
                    onCheckedChange={(checked) => column.toggleVisibility(checked)}
                  >
                    <MenuItemIndicator />
                    <MenuItemText
                      >{column.id === 'installations' ? 'Installs' : column.id}</MenuItemText
                    >
                  </MenuCheckboxItem>
                {/each}
              </MenuItemGroup>
            </MenuViewport>
          </MenuContent>
        </MenuPositioner>
      </Menu>
      <span class={styles.selectionSummary}>
        {table.getFilteredSelectedRowModel().rows.length} of
        {table.getFilteredRowModel().rows.length} selected
      </span>
    </div>
  </div>
  <TableScrollArea class={styles.scrollArea}>
    <Table interactive class={styles.table}>
      <TableColumnGroup>
        {#each table.getVisibleLeafColumns() as column (column.id)}
          <TableColumn width={widthForColumn(column.id)} />
        {/each}
      </TableColumnGroup>
      <TableHeader>
        {#each table.getHeaderGroups() as group (group.id)}
          <TableRow>
            {#each group.headers as header (header.id)}
              <TableColumnHeader
                colspan={header.colSpan}
                numeric={header.column.id === 'installations'}
                class={['select', 'actions'].includes(header.column.id)
                  ? styles.iconColumn
                  : undefined}
                aria-sort={header.column.getCanSort()
                  ? sortDirection(header.column.getIsSorted())
                  : undefined}
              >
                {#if !header.isPlaceholder}
                  {#if header.column.id === 'select'}
                    <Checkbox
                      checked={allChecked}
                      aria-label="Select all visible components"
                      onCheckedChange={(details) =>
                        table.toggleAllPageRowsSelected(details.checked === true)}
                    >
                      <CheckboxControl /><CheckboxHiddenInput />
                    </Checkbox>
                  {:else if header.column.getCanSort()}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      aria-label={`Sort ${header.column.id} ${header.column.getIsSorted() === 'asc' ? 'descending' : 'ascending'}`}
                      onclick={() =>
                        header.column.toggleSorting(header.column.getIsSorted() === 'asc')}
                    >
                      <FlexRender {header} />
                      {#if header.column.getIsSorted() === 'asc'}
                        <ArrowUp size={16} aria-hidden="true" />
                      {:else if header.column.getIsSorted() === 'desc'}
                        <ArrowDown size={16} aria-hidden="true" />
                      {:else}
                        <ArrowUpDown size={16} aria-hidden="true" />
                      {/if}
                    </Button>
                  {:else if header.column.id === 'actions'}
                    <span class={styles.visuallyHidden}>Actions</span>
                  {:else}
                    <FlexRender {header} />
                  {/if}
                {/if}
              </TableColumnHeader>
            {/each}
          </TableRow>
        {/each}
      </TableHeader>
      <TableBody>
        {#each table.getRowModel().rows as row (row.id)}
          <TableRow data-selected={row.getIsSelected() ? '' : undefined}>
            {#each row.getVisibleCells() as cell (cell.id)}
              <TableCell
                numeric={cell.column.id === 'installations'}
                class={['select', 'actions'].includes(cell.column.id)
                  ? styles.iconColumn
                  : undefined}
              >
                {#if cell.column.id === 'select'}
                  <Checkbox
                    checked={row.getIsSelected()}
                    aria-label={`Select ${row.original.name}`}
                    onCheckedChange={(details) => row.toggleSelected(details.checked === true)}
                  >
                    <CheckboxControl /><CheckboxHiddenInput />
                  </Checkbox>
                {:else if cell.column.id === 'name'}
                  <div class={styles.componentName}>
                    <strong>{row.original.name}</strong><span>{row.original.id}</span>
                  </div>
                {:else if cell.column.id === 'status'}
                  <Badge variant={row.original.status === 'Stable' ? 'secondary' : 'outline'}>
                    {row.original.status}
                  </Badge>
                {:else if cell.column.id === 'actions'}
                  <Menu positioning={{ placement: 'bottom-end', gutter: 8 }}>
                    <MenuTrigger>
                      {#snippet asChild(props)}
                        <Button
                          {...props()}
                          type="button"
                          variant="ghost"
                          size="sm"
                          class={styles.rowActionsTrigger}
                          aria-label={`Actions for ${row.original.name}`}
                        >
                          <Ellipsis size={16} aria-hidden="true" />
                        </Button>
                      {/snippet}
                    </MenuTrigger>
                    <MenuPositioner>
                      <MenuContent>
                        <MenuViewport>
                          <MenuItem value="open-docs">
                            {#snippet asChild(props)}
                              <a {...props()} href={`#${row.original.id}`}>Open details</a>
                            {/snippet}
                          </MenuItem>
                          <MenuItem
                            value="copy-identifier"
                            onSelect={() => copyIdentifier(row.original.id)}
                          >
                            Copy identifier
                          </MenuItem>
                        </MenuViewport>
                      </MenuContent>
                    </MenuPositioner>
                  </Menu>
                {:else}
                  <FlexRender {cell} />
                {/if}
              </TableCell>
            {/each}
          </TableRow>
        {/each}
        {#if !table.getRowModel().rows.length}
          <TableEmpty colSpan={table.getVisibleLeafColumns().length}>No results.</TableEmpty>
        {/if}
      </TableBody>
    </Table>
  </TableScrollArea>
  <div class={styles.pagination}>
    <span class={styles.pageSummary}>
      Showing {table.getRowModel().rows.length} of
      {table.getFilteredRowModel().rows.length} components
    </span>
    <div class={styles.paginationControls}>
      <Button
        type="button"
        variant="outline"
        size="sm"
        aria-label="Previous page"
        disabled={!table.getCanPreviousPage()}
        onclick={() => table.previousPage()}
      >
        <ArrowLeft size={16} aria-hidden="true" />
      </Button>
      <span class={styles.pageSummary}
        >Page {pagination.pageIndex + 1} of {table.getPageCount()}</span
      >
      <Button
        type="button"
        variant="outline"
        size="sm"
        aria-label="Next page"
        disabled={!table.getCanNextPage()}
        onclick={() => table.nextPage()}
      >
        <ArrowRight size={16} aria-hidden="true" />
      </Button>
    </div>
  </div>
</div>