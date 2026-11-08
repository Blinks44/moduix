<script lang="ts">
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
  } from '@moduix/svelte/table';

  const products = [
    { name: 'Laptop', category: 'Electronics', price: '$999.99' },
    { name: 'Coffee Maker', category: 'Home Appliances', price: '$49.99' },
    { name: 'Desk Chair', category: 'Furniture', price: '$150.00' },
  ];
</script>

<TableScrollArea>
  <Table showColumnBorder>
    <TableColumnGroup>
      <TableColumn width="42%" />
      <TableColumn width="28%" />
      <TableColumn width="30%" />
    </TableColumnGroup>
    <TableHeader>
      <TableRow>
        <TableColumnHeader>Product</TableColumnHeader>
        <TableColumnHeader>Category</TableColumnHeader>
        <TableColumnHeader numeric>Price</TableColumnHeader>
      </TableRow>
    </TableHeader>
    <TableBody>
      {#each products as product (product.name)}
        <TableRow>
          <TableCell>{product.name}</TableCell>
          <TableCell>{product.category}</TableCell>
          <TableCell numeric>{product.price}</TableCell>
        </TableRow>
      {/each}
    </TableBody>
  </Table>
</TableScrollArea>