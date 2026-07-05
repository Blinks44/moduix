/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Badge, Table, Card, ScrollArea } from '@moduix/react';
import styles from '@/components/examples/table.module.css';

const invoices = [
  {
    id: 'INV001',
    status: 'Paid',
    method: 'Credit Card',
    amount: '$250.00',
  },
  {
    id: 'INV002',
    status: 'Pending',
    method: 'PayPal',
    amount: '$150.00',
  },
  {
    id: 'INV003',
    status: 'Unpaid',
    method: 'Bank Transfer',
    amount: '$350.00',
  },
  {
    id: 'INV004',
    status: 'Paid',
    method: 'Credit Card',
    amount: '$450.00',
  },
];

export function TableDemo() {
  return (
    <Table.ScrollArea className={styles.shell}>
      <Table className={styles.table}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Invoice</Table.ColumnHeader>
            <Table.ColumnHeader>Status</Table.ColumnHeader>
            <Table.ColumnHeader>Method</Table.ColumnHeader>
            <Table.ColumnHeader numeric>Amount</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {invoices.map((invoice) => (
            <Table.Row key={invoice.id}>
              <Table.Cell>{invoice.id}</Table.Cell>
              <Table.Cell>
                <Badge variant={invoice.status === 'Paid' ? 'secondary' : 'outline'}>
                  {invoice.status}
                </Badge>
              </Table.Cell>
              <Table.Cell>{invoice.method}</Table.Cell>
              <Table.Cell numeric>{invoice.amount}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Table.ScrollArea>
  );
}

//#endregion