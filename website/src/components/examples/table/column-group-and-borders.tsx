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
} from '@moduix/react/table';

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
    <TableScrollArea>
      <Table showColumnBorder>
        <TableColumnGroup>
          <TableColumn htmlWidth="42%" />
          <TableColumn htmlWidth="28%" />
          <TableColumn htmlWidth="30%" />
        </TableColumnGroup>
        <TableHeader>
          <TableRow>
            <TableColumnHeader>Product</TableColumnHeader>
            <TableColumnHeader>Category</TableColumnHeader>
            <TableColumnHeader numeric>Price</TableColumnHeader>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.name}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell numeric>{product.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableScrollArea>
  );
}