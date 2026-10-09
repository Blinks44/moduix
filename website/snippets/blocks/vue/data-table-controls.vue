<script setup lang="ts">
import { ArrowDown, ArrowUp, ArrowUpDown } from '@lucide/vue';
import {
  FlexRender,
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
  useTable,
  type ColumnDef,
} from '@tanstack/vue-table';
import { computed } from 'vue';
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
const table = useTable({
  features,
  data: payments,
  columns,
  getRowId: (row: Payment) => row.id,
  initialState: { pagination: { pageIndex: 0, pageSize: 5 } },
});
const pagination = computed(() => table.atoms.pagination.get());
const emailFilter = computed(() => String(table.getColumn('email')?.getFilterValue() ?? ''));
const allChecked = computed(() =>
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

<template>
  <div :class="styles.root">
    <div :class="styles.toolbar">
      <Input
        aria-label="Filter emails"
        placeholder="Filter emails..."
        :model-value="emailFilter"
        @update:model-value="table.getColumn('email')?.setFilterValue($event)"
      />
      <span
        >{{ table.getFilteredSelectedRowModel().rows.length }} of
        {{ table.getFilteredRowModel().rows.length }} row(s) selected</span
      >
    </div>
    <TableScrollArea>
      <Table interactive :class="styles.interactiveTable">
        <TableColumnGroup
          ><TableColumn :html-width="48" /><TableColumn
            :html-width="128" /><TableColumn /><TableColumn :html-width="128"
        /></TableColumnGroup>
        <TableHeader
          ><TableRow v-for="group in table.getHeaderGroups()" :key="group.id">
            <TableColumnHeader
              v-for="header in group.headers"
              :key="header.id"
              :col-span="header.colSpan"
              :numeric="header.column.id === 'amount'"
              :aria-sort="sortDirection(header.column.getIsSorted())"
              :class="header.column.id === 'select' ? styles.selectionColumn : undefined"
            >
              <template v-if="!header.isPlaceholder">
                <Checkbox
                  v-if="header.column.id === 'select'"
                  :checked="allChecked"
                  aria-label="Select all rows on this page"
                  @checked-change="table.toggleAllPageRowsSelected($event.checked === true)"
                  ><CheckboxControl /><CheckboxHiddenInput
                /></Checkbox>
                <Button
                  v-else-if="header.column.getCanSort()"
                  type="button"
                  variant="ghost"
                  size="sm"
                  :aria-label="`Sort ${header.column.id} ${header.column.getIsSorted() === 'asc' ? 'descending' : 'ascending'}`"
                  @click="header.column.toggleSorting(header.column.getIsSorted() === 'asc')"
                >
                  <FlexRender :header="header" />
                  <ArrowUp
                    v-if="header.column.getIsSorted() === 'asc'"
                    aria-hidden="true"
                    :size="16"
                  /><ArrowDown
                    v-else-if="header.column.getIsSorted() === 'desc'"
                    aria-hidden="true"
                    :size="16"
                  /><ArrowUpDown v-else aria-hidden="true" :size="16" />
                </Button>
                <FlexRender v-else :header="header" />
              </template>
            </TableColumnHeader> </TableRow
        ></TableHeader>
        <TableBody>
          <TableEmpty
            v-if="!table.getRowModel().rows.length"
            :col-span="table.getVisibleLeafColumns().length"
            >No results.</TableEmpty
          >
          <TableRow
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            :data-selected="row.getIsSelected() || undefined"
          >
            <TableCell
              v-for="cell in row.getVisibleCells()"
              :key="cell.id"
              :numeric="cell.column.id === 'amount'"
              :class="cell.column.id === 'select' ? styles.selectionColumn : undefined"
            >
              <Checkbox
                v-if="cell.column.id === 'select'"
                :checked="row.getIsSelected()"
                :disabled="!row.getCanSelect()"
                :aria-label="`Select ${row.original.email}`"
                @checked-change="row.toggleSelected($event.checked === true)"
                ><CheckboxControl /><CheckboxHiddenInput
              /></Checkbox>
              <Badge v-else-if="cell.column.id === 'status'" variant="outline">{{
                cell.getValue()
              }}</Badge
              ><FlexRender v-else :cell="cell" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableScrollArea>
    <div :class="styles.pagination">
      <span>Page {{ pagination.pageIndex + 1 }} of {{ table.getPageCount() }}</span>
      <div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          :disabled="!table.getCanPreviousPage()"
          @click="table.previousPage()"
          >Previous</Button
        ><Button
          type="button"
          variant="outline"
          size="sm"
          :disabled="!table.getCanNextPage()"
          @click="table.nextPage()"
          >Next</Button
        >
      </div>
    </div>
  </div>
</template>