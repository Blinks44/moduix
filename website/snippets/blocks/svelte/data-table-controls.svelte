<script lang="ts">
  import ArrowDown from '@lucide/svelte/icons/arrow-down';
  import ArrowUp from '@lucide/svelte/icons/arrow-up';
  import ArrowUpDown from '@lucide/svelte/icons/arrow-up-down';
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
  import { Input } from '@/components/ui/input';
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
  import styles from './payment-table.module.css';

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
    { id: 'select', enableSorting: false, enableHiding: false },
    { accessorKey: 'status', header: 'Status', enableSorting: false },
    { accessorKey: 'email', header: 'Email', filterFn: 'includesString' },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ getValue }) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
          getValue<number>(),
        ),
    },
  ];
  const table = createTable({
    features,
    data: payments,
    columns,
    getRowId: (row: Payment) => row.id,
    initialState: { pagination: { pageIndex: 0, pageSize: 5 } },
  });
  const pagination = $derived(table.atoms.pagination.get());
  const emailFilter = $derived(String(table.getColumn('email')?.getFilterValue() ?? ''));
  const allChecked = $derived(
    table.getIsAllPageRowsSelected()
      ? true
      : table.getIsSomePageRowsSelected()
        ? 'indeterminate'
        : false,
  );
  function sortDirection(value: false | 'asc' | 'desc') {
    return value === 'asc' ? 'ascending' : value === 'desc' ? 'descending' : 'none';
  }
</script>

<div class={styles.root}>
  <div class={styles.toolbar}>
    <Input
      aria-label="Filter emails"
      placeholder="Filter emails..."
      value={emailFilter}
      oninput={(event) => table.getColumn('email')?.setFilterValue(event.currentTarget.value)}
    />
    <span>
      {table.getFilteredSelectedRowModel().rows.length} of
      {table.getFilteredRowModel().rows.length} row(s) selected
    </span>
  </div>
  <TableScrollArea>
    <Table interactive class={styles.interactiveTable}>
      <TableColumnGroup>
        <TableColumn width={48} /><TableColumn width={128} /><TableColumn /><TableColumn
          width={128}
        />
      </TableColumnGroup>
      <TableHeader>
        {#each table.getHeaderGroups() as group (group.id)}
          <TableRow>
            {#each group.headers as header (header.id)}
              <TableColumnHeader
                colspan={header.colSpan}
                numeric={header.column.id === 'amount'}
                aria-sort={sortDirection(header.column.getIsSorted())}
                class={header.column.id === 'select' ? styles.selectionColumn : undefined}
              >
                {#if !header.isPlaceholder}
                  {#if header.column.id === 'select'}
                    <Checkbox
                      checked={allChecked}
                      aria-label="Select all rows on this page"
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
                        <ArrowUp aria-hidden="true" size={16} />
                      {:else if header.column.getIsSorted() === 'desc'}
                        <ArrowDown aria-hidden="true" size={16} />
                      {:else}
                        <ArrowUpDown aria-hidden="true" size={16} />
                      {/if}
                    </Button>
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
        {#if !table.getRowModel().rows.length}
          <TableEmpty colSpan={table.getVisibleLeafColumns().length}>No results.</TableEmpty>
        {/if}
        {#each table.getRowModel().rows as row (row.id)}
          <TableRow data-selected={row.getIsSelected() || undefined}>
            {#each row.getVisibleCells() as cell (cell.id)}
              <TableCell
                numeric={cell.column.id === 'amount'}
                class={cell.column.id === 'select' ? styles.selectionColumn : undefined}
              >
                {#if cell.column.id === 'select'}
                  <Checkbox
                    checked={row.getIsSelected()}
                    disabled={!row.getCanSelect()}
                    aria-label={`Select ${row.original.email}`}
                    onCheckedChange={(details) => row.toggleSelected(details.checked === true)}
                  >
                    <CheckboxControl /><CheckboxHiddenInput />
                  </Checkbox>
                {:else if cell.column.id === 'status'}
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
  <div class={styles.pagination}>
    <span>Page {pagination.pageIndex + 1} of {table.getPageCount()}</span>
    <div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={!table.getCanPreviousPage()}
        onclick={() => table.previousPage()}>Previous</Button
      ><Button
        type="button"
        variant="outline"
        size="sm"
        disabled={!table.getCanNextPage()}
        onclick={() => table.nextPage()}>Next</Button
      >
    </div>
  </div>
</div>