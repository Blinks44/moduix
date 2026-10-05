<script setup lang="ts">
import {
  Table,
  TableColumnGroup,
  TableColumn,
  TableCaption,
  TableHeader,
  TableRow,
  TableColumnHeader,
  TableBody,
  TableEmpty,
  TableFooter,
  TableCell,
} from '../../src';
</script>

<template>
  <Table>
    <TableColumnGroup><TableColumn html-width="50%" /><TableColumn /></TableColumnGroup>
    <TableCaption>Invoices</TableCaption>
    <TableHeader
      ><TableRow
        ><TableColumnHeader>Invoice</TableColumnHeader
        ><TableColumnHeader>Amount</TableColumnHeader></TableRow
      ></TableHeader
    >
    <TableBody><TableEmpty ref="emptyRef" :col-span="2" /></TableBody>
    <TableFooter
      ><TableRow><TableCell :colspan="2">Total</TableCell></TableRow></TableFooter
    >
  </Table>
</template>