import { Table } from '@moduix/react';
import styles from '@/components/examples/table.module.css';

const products = [
  {
    name: 'Laptop',
    category: 'Electronics',
    price: '$999.99',
  },
  {
    name: 'Coffee Maker',
    category: 'Home Appliances',
    price: '$49.99',
  },
  {
    name: 'Desk Chair',
    category: 'Furniture',
    price: '$150.00',
  },
];

export default function TableColumnGroupAndBordersDemo() {
  return (
    <Table.ScrollArea className={styles.showcase}>
      <Table showColumnBorder className={styles.table}>
        <Table.ColumnGroup>
          <Table.Column htmlWidth="42%" />
          <Table.Column htmlWidth="28%" />
          <Table.Column htmlWidth="30%" />
        </Table.ColumnGroup>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Product</Table.ColumnHeader>
            <Table.ColumnHeader>Category</Table.ColumnHeader>
            <Table.ColumnHeader numeric>Price</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {products.map((product) => (
            <Table.Row key={product.name}>
              <Table.Cell>{product.name}</Table.Cell>
              <Table.Cell>{product.category}</Table.Cell>
              <Table.Cell numeric>{product.price}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Table.ScrollArea>
  );
}