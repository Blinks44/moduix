import { Table } from '@moduix/react';
import styles from '@/components/examples/table.module.css';

const projects = [
  {
    name: 'Docs redesign',
    owner: 'Product Design',
    updated: '2 hours ago',
  },
  {
    name: 'Billing migration',
    owner: 'Growth',
    updated: 'Yesterday',
  },
  {
    name: 'Command palette',
    owner: 'Platform',
    updated: 'Today',
  },
];

export default function TableStripedRowsDemo() {
  return (
    <Table.ScrollArea className={styles.showcase}>
      <Table striped interactive className={styles.table}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Project</Table.ColumnHeader>
            <Table.ColumnHeader>Owner</Table.ColumnHeader>
            <Table.ColumnHeader>Updated</Table.ColumnHeader>
            <Table.ColumnHeader numeric>Open issues</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {projects.map((project, index) => (
            <Table.Row key={project.name}>
              <Table.Cell>{project.name}</Table.Cell>
              <Table.Cell>{project.owner}</Table.Cell>
              <Table.Cell>{project.updated}</Table.Cell>
              <Table.Cell numeric>{index + 1}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Table.ScrollArea>
  );
}