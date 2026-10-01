<script setup lang="ts">
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

const products = [
  { name: 'Laptop', category: 'Electronics', price: '$999.99' },
  { name: 'Coffee Maker', category: 'Home Appliances', price: '$49.99' },
  { name: 'Desk Chair', category: 'Furniture', price: '$150.00' },
];
</script>

<template>
  <TableScrollArea>
    <Table show-column-border>
      <TableColumnGroup>
        <TableColumn html-width="42%" />
        <TableColumn html-width="28%" />
        <TableColumn html-width="30%" />
      </TableColumnGroup>
      <TableHeader>
        <TableRow>
          <TableColumnHeader>Product</TableColumnHeader>
          <TableColumnHeader>Category</TableColumnHeader>
          <TableColumnHeader numeric>Price</TableColumnHeader>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="product in products" :key="product.name">
          <TableCell>{{ product.name }}</TableCell>
          <TableCell>{{ product.category }}</TableCell>
          <TableCell numeric>{{ product.price }}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </TableScrollArea>
</template>