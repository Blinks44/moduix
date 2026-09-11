import { Table } from '@moduix/solid/table';
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
    <div class={styles.root}>
      <Table class={styles.table}>
        <Table.Caption side="bottom">
          This version uses a plain wrapper instead of Table.ScrollArea.
        </Table.Caption>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Plan</Table.ColumnHeader>
            <Table.ColumnHeader>Seats</Table.ColumnHeader>
            <Table.ColumnHeader numeric>Monthly cost</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {plans.map((plan) => (
            <Table.Row>
              <Table.Cell>{plan.name}</Table.Cell>
              <Table.Cell>{plan.seats}</Table.Cell>
              <Table.Cell numeric>{plan.cost}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}