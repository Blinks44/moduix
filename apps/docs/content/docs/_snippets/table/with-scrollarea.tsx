/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { ScrollArea, Table } from '@moduix/react';
import styles from '@/components/examples/table.module.css';

const rows = [
  {
    name: 'Docs redesign',
    owner: 'Product Design',
    environment: 'Production',
    updated: '2 hours ago',
  },
  {
    name: 'Billing migration',
    owner: 'Growth',
    environment: 'Staging',
    updated: 'Yesterday',
  },
  {
    name: 'Command palette',
    owner: 'Platform',
    environment: 'Preview',
    updated: 'Today',
  },
];

export function TableWithScrollareaDemo() {
  return (
    <ScrollArea className={styles.scrollArea}>
      <ScrollArea.Viewport>
        <ScrollArea.Content>
          <Table className={styles.wideTable}>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Project</Table.ColumnHeader>
                <Table.ColumnHeader>Owner</Table.ColumnHeader>
                <Table.ColumnHeader>Environment</Table.ColumnHeader>
                <Table.ColumnHeader>Updated</Table.ColumnHeader>
                <Table.ColumnHeader numeric>Open issues</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Array.from(
                {
                  length: 12,
                },
                (_, index) => rows[index % rows.length],
              ).map((row, index) => (
                <Table.Row key={`${row.name}-${index}`}>
                  <Table.Cell>{row.name}</Table.Cell>
                  <Table.Cell>{row.owner}</Table.Cell>
                  <Table.Cell>{row.environment}</Table.Cell>
                  <Table.Cell>{row.updated}</Table.Cell>
                  <Table.Cell numeric>{index + 1}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar>
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar orientation="horizontal">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner />
    </ScrollArea>
  );
}

//#endregion