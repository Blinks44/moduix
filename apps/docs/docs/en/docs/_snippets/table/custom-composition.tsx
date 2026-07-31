import { Table } from '@moduix/react';

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
    <div
      style={{
        overflowX: 'auto',
        padding: 'var(--moduix-spacing-3)',
        border: 'var(--moduix-border-width-sm) dashed var(--moduix-color-border)',
        borderRadius: 'var(--moduix-radius-lg)',
      }}
    >
      <Table style={{ minWidth: '34rem' }}>
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
            <Table.Row key={plan.name}>
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