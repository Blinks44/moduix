<script setup lang="ts">
import { Badge } from '@moduix/vue/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableColumnGroup,
  TableColumnHeader,
  TableHeader,
  TableRow,
  TableScrollArea,
} from '@moduix/vue/table';
import {
  FlexRender,
  useTable,
  columnVisibilityFeature,
  tableFeatures,
  type ColumnDef,
} from '@tanstack/vue-table';

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

const table = useTable({ features, data: payments, columns });
</script>
<template>
  <TableScrollArea class="data-table"
    ><Table class="data-table-table">
      <TableColumnGroup
        ><TableColumn :html-width="128" /><TableColumn /><TableColumn :html-width="128"
      /></TableColumnGroup>
      <TableHeader
        ><TableRow v-for="group in table.getHeaderGroups()" :key="group.id">
          <TableColumnHeader
            v-for="header in group.headers"
            :key="header.id"
            :col-span="header.colSpan"
            :numeric="header.column.id === 'amount'"
            ><FlexRender v-if="!header.isPlaceholder" :header="header"
          /></TableColumnHeader> </TableRow
      ></TableHeader>
      <TableBody
        ><TableRow v-for="row in table.getRowModel().rows" :key="row.id">
          <TableCell
            v-for="cell in row.getVisibleCells()"
            :key="cell.id"
            :numeric="cell.column.id === 'amount'"
            ><Badge v-if="cell.column.id === 'status'" variant="outline">{{
              cell.getValue()
            }}</Badge
            ><FlexRender v-else :cell="cell"
          /></TableCell> </TableRow
      ></TableBody> </Table
  ></TableScrollArea>
</template>