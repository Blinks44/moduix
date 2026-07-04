/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Table, ScrollArea } from '@moduix/react';
import styles from '@/components/examples/table.module.css';

const metrics = [
  {
    service: 'Search API',
    requests: '1,204,122',
    errorRate: '0.12%',
    latency: '128 ms',
  },
  {
    service: 'Billing API',
    requests: '248,421',
    errorRate: '0.04%',
    latency: '96 ms',
  },
  {
    service: 'Docs site',
    requests: '82,304',
    errorRate: '0.00%',
    latency: '42 ms',
  },
];

export function TableNumericColumnsDemo() {
  return (
    <Table.ScrollArea className={styles.shell}>
      <Table className={styles.table}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Service</Table.ColumnHeader>
            <Table.ColumnHeader numeric>Requests</Table.ColumnHeader>
            <Table.ColumnHeader numeric>Error rate</Table.ColumnHeader>
            <Table.ColumnHeader numeric>Latency</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {metrics.map((metric) => (
            <Table.Row key={metric.service}>
              <Table.Cell>{metric.service}</Table.Cell>
              <Table.Cell numeric>{metric.requests}</Table.Cell>
              <Table.Cell numeric>{metric.errorRate}</Table.Cell>
              <Table.Cell numeric>{metric.latency}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Table.ScrollArea>
  );
}

//#endregion