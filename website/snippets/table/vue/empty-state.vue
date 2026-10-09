<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCaption,
  TableColumnHeader,
  TableEmpty,
  TableHeader,
  TableRow,
  TableScrollArea,
} from '@moduix/vue/table';

const columnCount = 4;
</script>

<template>
  <TableScrollArea>
    <Table>
      <TableCaption side="top">Projects filtered by the current workspace query.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableColumnHeader>Project</TableColumnHeader>
          <TableColumnHeader>Owner</TableColumnHeader>
          <TableColumnHeader>Updated</TableColumnHeader>
          <TableColumnHeader numeric>Open issues</TableColumnHeader>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableEmpty :col-span="columnCount">No projects matched the current filters.</TableEmpty>
      </TableBody>
    </Table>
  </TableScrollArea>
</template>