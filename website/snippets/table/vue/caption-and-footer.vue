<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableColumnHeader,
  TableFooter,
  TableHeader,
  TableRow,
  TableScrollArea,
} from '@moduix/vue/table';

const invoices = [
  { id: 'INV001', status: 'Paid', method: 'Credit Card', amount: '$250.00' },
  { id: 'INV002', status: 'Pending', method: 'PayPal', amount: '$150.00' },
  { id: 'INV003', status: 'Unpaid', method: 'Bank Transfer', amount: '$350.00' },
  { id: 'INV004', status: 'Paid', method: 'Credit Card', amount: '$450.00' },
];
</script>

<template>
  <TableScrollArea>
    <Table>
      <TableCaption side="top"
        >A list of recent invoices for the current billing cycle.</TableCaption
      >
      <TableHeader>
        <TableRow>
          <TableColumnHeader>Invoice</TableColumnHeader>
          <TableColumnHeader>Status</TableColumnHeader>
          <TableColumnHeader>Method</TableColumnHeader>
          <TableColumnHeader numeric>Amount</TableColumnHeader>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="invoice in invoices" :key="invoice.id">
          <TableCell>{{ invoice.id }}</TableCell>
          <TableCell>{{ invoice.status }}</TableCell>
          <TableCell>{{ invoice.method }}</TableCell>
          <TableCell numeric>{{ invoice.amount }}</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell :colspan="3">Total</TableCell>
          <TableCell numeric>$1,200.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  </TableScrollArea>
</template>