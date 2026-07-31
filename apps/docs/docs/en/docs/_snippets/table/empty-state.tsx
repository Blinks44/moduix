import { Table } from '@moduix/react';

const columnCount = 4;

export default function EmptyStateTableDemo() {
  return (
    <Table.ScrollArea>
      <Table>
        <Table.Caption side="top">Projects filtered by the current workspace query.</Table.Caption>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Project</Table.ColumnHeader>
            <Table.ColumnHeader>Owner</Table.ColumnHeader>
            <Table.ColumnHeader>Updated</Table.ColumnHeader>
            <Table.ColumnHeader numeric>Open issues</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Empty colSpan={columnCount}>No projects matched the current filters.</Table.Empty>
        </Table.Body>
      </Table>
    </Table.ScrollArea>
  );
}