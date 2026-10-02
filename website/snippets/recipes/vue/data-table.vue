<script setup lang="ts">
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpDown,
  Columns3,
  Ellipsis,
  Search,
} from '@lucide/vue';
import { Badge } from '@moduix/vue/badge';
import { Button } from '@moduix/vue/button';
import { Checkbox, CheckboxControl, CheckboxHiddenInput } from '@moduix/vue/checkbox';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@moduix/vue/input-group';
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
} from '@moduix/vue/menu';
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
} from '@moduix/vue/table';
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
const table = useTable({
  features,
  data: componentRows,
  columns,
  getRowId: (row: ComponentRow) => row.id,
  initialState: { pagination: { pageIndex: 0, pageSize: 6 } },
});
const pagination = computed(() => table.atoms.pagination.get());
const filterValue = computed(() => String(table.getColumn('name')?.getFilterValue() ?? ''));
const widthForColumn = (id: string) => columnWidths[id as keyof typeof columnWidths];
const sortDirection = (direction: false | 'asc' | 'desc') =>
  direction === 'asc' ? 'ascending' : direction === 'desc' ? 'descending' : 'none';
const copyIdentifier = (id: string) => navigator.clipboard.writeText(id);
</script>
<template>
  <div :class="styles.root">
    <div :class="styles.toolbar">
      <InputGroup :class="styles.search"
        ><InputGroupAddon><Search :size="16" aria-hidden="true" /></InputGroupAddon
        ><InputGroupInput
          aria-label="Filter components"
          placeholder="Search components..."
          :model-value="filterValue"
          @update:model-value="table.getColumn('name')?.setFilterValue($event)"
      /></InputGroup>
      <div :class="styles.toolbarActions">
        <Menu :close-on-select="false" :positioning="{ placement: 'bottom-end', gutter: 8 }">
          <MenuTrigger as-child
            ><Button type="button" variant="outline" size="sm"
              ><Columns3 :size="16" aria-hidden="true" />Columns</Button
            ></MenuTrigger
          >
          <MenuPositioner
            ><MenuContent
              ><MenuViewport
                ><MenuItemGroup
                  ><MenuItemGroupLabel>Visible columns</MenuItemGroupLabel>
                  <MenuCheckboxItem
                    v-for="column in table
                      .getAllLeafColumns()
                      .filter((column) => column.getCanHide())"
                    :key="column.id"
                    :checked="column.getIsVisible()"
                    :value="column.id"
                    @checked-change="column.toggleVisibility($event.checked)"
                  >
                    <MenuItemIndicator /><MenuItemText>{{
                      column.id === 'installations' ? 'Installs' : column.id
                    }}</MenuItemText>
                  </MenuCheckboxItem>
                </MenuItemGroup></MenuViewport
              ></MenuContent
            ></MenuPositioner
          >
        </Menu>
        <span :class="styles.selectionSummary"
          >{{ table.getFilteredSelectedRowModel().rows.length }} of
          {{ table.getFilteredRowModel().rows.length }} selected</span
        >
      </div>
    </div>
    <TableScrollArea :class="styles.scrollArea">
      <Table interactive :class="styles.table">
        <TableColumnGroup
          ><TableColumn
            v-for="column in table.getVisibleLeafColumns()"
            :key="column.id"
            :html-width="widthForColumn(column.id)"
        /></TableColumnGroup>
        <TableHeader>
          <TableRow v-for="group in table.getHeaderGroups()" :key="group.id">
            <TableColumnHeader
              v-for="header in group.headers"
              :key="header.id"
              :col-span="header.colSpan"
              :numeric="header.column.id === 'installations'"
              :class="
                ['select', 'actions'].includes(header.column.id) ? styles.iconColumn : undefined
              "
              :aria-sort="
                header.column.getCanSort() ? sortDirection(header.column.getIsSorted()) : undefined
              "
            >
              <template v-if="!header.isPlaceholder">
                <Checkbox
                  v-if="header.column.id === 'select'"
                  :checked="
                    table.getIsAllPageRowsSelected()
                      ? true
                      : table.getIsSomePageRowsSelected()
                        ? 'indeterminate'
                        : false
                  "
                  aria-label="Select all visible components"
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
                  <FlexRender :header="header" /><ArrowUp
                    v-if="header.column.getIsSorted() === 'asc'"
                    :size="16"
                    aria-hidden="true"
                  /><ArrowDown
                    v-else-if="header.column.getIsSorted() === 'desc'"
                    :size="16"
                    aria-hidden="true"
                  /><ArrowUpDown v-else :size="16" aria-hidden="true" />
                </Button>
                <span v-else-if="header.column.id === 'actions'" :class="styles.visuallyHidden"
                  >Actions</span
                >
                <FlexRender v-else :header="header" />
              </template>
            </TableColumnHeader>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            :data-selected="row.getIsSelected() ? '' : undefined"
          >
            <TableCell
              v-for="cell in row.getVisibleCells()"
              :key="cell.id"
              :numeric="cell.column.id === 'installations'"
              :class="
                ['select', 'actions'].includes(cell.column.id) ? styles.iconColumn : undefined
              "
            >
              <Checkbox
                v-if="cell.column.id === 'select'"
                :checked="row.getIsSelected()"
                :aria-label="`Select ${row.original.name}`"
                @checked-change="row.toggleSelected($event.checked === true)"
                ><CheckboxControl /><CheckboxHiddenInput
              /></Checkbox>
              <div v-else-if="cell.column.id === 'name'" :class="styles.componentName">
                <strong>{{ row.original.name }}</strong
                ><span>{{ row.original.id }}</span>
              </div>
              <Badge
                v-else-if="cell.column.id === 'status'"
                :variant="row.original.status === 'Stable' ? 'secondary' : 'outline'"
                >{{ row.original.status }}</Badge
              >
              <Menu
                v-else-if="cell.column.id === 'actions'"
                :positioning="{ placement: 'bottom-end', gutter: 8 }"
              >
                <MenuTrigger as-child
                  ><Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    :class="styles.rowActionsTrigger"
                    :aria-label="`Actions for ${row.original.name}`"
                    ><Ellipsis :size="16" aria-hidden="true" /></Button
                ></MenuTrigger>
                <MenuPositioner
                  ><MenuContent
                    ><MenuViewport>
                      <MenuItem value="open-docs" as-child
                        ><a :href="`#${row.original.id}`">Open details</a></MenuItem
                      >
                      <MenuItem value="copy-identifier" @select="copyIdentifier(row.original.id)"
                        >Copy identifier</MenuItem
                      >
                    </MenuViewport></MenuContent
                  ></MenuPositioner
                >
              </Menu>
              <FlexRender v-else :cell="cell" />
            </TableCell>
          </TableRow>
          <TableEmpty
            v-if="!table.getRowModel().rows.length"
            :col-span="table.getVisibleLeafColumns().length"
            >No results.</TableEmpty
          >
        </TableBody>
      </Table>
    </TableScrollArea>
    <div :class="styles.pagination">
      <span :class="styles.pageSummary"
        >Showing {{ table.getRowModel().rows.length }} of
        {{ table.getFilteredRowModel().rows.length }} components</span
      >
      <div :class="styles.paginationControls">
        <Button
          type="button"
          variant="outline"
          size="sm"
          aria-label="Previous page"
          :disabled="!table.getCanPreviousPage()"
          @click="table.previousPage()"
          ><ArrowLeft :size="16" aria-hidden="true"
        /></Button>
        <span :class="styles.pageSummary"
          >Page {{ pagination.pageIndex + 1 }} of {{ table.getPageCount() }}</span
        >
        <Button
          type="button"
          variant="outline"
          size="sm"
          aria-label="Next page"
          :disabled="!table.getCanNextPage()"
          @click="table.nextPage()"
          ><ArrowRight :size="16" aria-hidden="true"
        /></Button>
      </div>
    </div>
  </div>
</template>