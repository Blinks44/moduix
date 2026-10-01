<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableColumnHeader,
  TableHeader,
  TableRow,
  TableScrollArea,
} from '@moduix/vue/table';
import styles from '@/components/examples/table/table-sticky-header-and-column.module.css';

const rows = [
  {
    name: 'Docs redesign',
    owner: 'Product Design',
    environment: 'Production',
    updated: '2 hours ago',
  },
  { name: 'Billing migration', owner: 'Growth', environment: 'Staging', updated: 'Yesterday' },
  { name: 'Command palette', owner: 'Platform', environment: 'Preview', updated: 'Today' },
];
const stickyRows = Array.from({ length: 12 }, (_, index) => ({
  ...rows[index % rows.length],
  index,
}));
</script>

<template>
  <TableScrollArea :class="styles.scrollArea">
    <Table sticky-header interactive :class="styles.table">
      <TableHeader>
        <TableRow>
          <TableColumnHeader data-sticky="start">Project</TableColumnHeader>
          <TableColumnHeader>Owner</TableColumnHeader>
          <TableColumnHeader>Environment</TableColumnHeader>
          <TableColumnHeader>Updated</TableColumnHeader>
          <TableColumnHeader numeric>Open issues</TableColumnHeader>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="row in stickyRows" :key="row.name + row.index">
          <TableCell data-sticky="start">{{ row.name }}</TableCell>
          <TableCell>{{ row.owner }}</TableCell>
          <TableCell>{{ row.environment }}</TableCell>
          <TableCell>{{ row.updated }}</TableCell>
          <TableCell numeric>{{ row.index + 1 }}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </TableScrollArea>
</template>