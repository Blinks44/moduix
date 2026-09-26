import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableColumnHeader,
  TableHeader,
  TableRow,
} from '@moduix/react/table';
import styles from '@/components/examples/table/table-custom-composition.module.css';

const plans = [
  {
    name: 'Starter',
    seats: 'Up to 5',
    cost: '$19',
  },
  {
    name: 'Team',
    seats: 'Up to 25',
    cost: '$79',
  },
  {
    name: 'Enterprise',
    seats: 'Custom',
    cost: 'Contact sales',
  },
];

export default function TableCustomCompositionDemo() {
  return (
    <div className={styles.root}>
      <Table className={styles.table}>
        <TableCaption side="bottom">
          This version uses a plain wrapper instead of TableScrollArea.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableColumnHeader>Plan</TableColumnHeader>
            <TableColumnHeader>Seats</TableColumnHeader>
            <TableColumnHeader numeric>Monthly cost</TableColumnHeader>
          </TableRow>
        </TableHeader>
        <TableBody>
          {plans.map((plan) => (
            <TableRow key={plan.name}>
              <TableCell>{plan.name}</TableCell>
              <TableCell>{plan.seats}</TableCell>
              <TableCell numeric>{plan.cost}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}