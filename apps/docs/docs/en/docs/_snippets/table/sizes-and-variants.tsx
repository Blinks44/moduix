import { Table } from '@moduix/react';
import styles from '@/components/examples/table.module.css';

const projects = [
  {
    name: 'Docs redesign',
    owner: 'Product Design',
  },
  {
    name: 'Billing migration',
    owner: 'Growth',
  },
];

export default function TableSizesAndVariantsDemo() {
  return (
    <div className={styles.stack}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Table.ScrollArea key={size} className={styles.showcase}>
          <Table size={size} variant={size === 'md' ? 'outline' : 'line'} className={styles.table}>
            <Table.Caption side="top">{size.toUpperCase()} project summary</Table.Caption>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Project</Table.ColumnHeader>
                <Table.ColumnHeader>Owner</Table.ColumnHeader>
                <Table.ColumnHeader numeric>Open issues</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {projects.map((project, index) => (
                <Table.Row key={project.name}>
                  <Table.Cell>{project.name}</Table.Cell>
                  <Table.Cell>{project.owner}</Table.Cell>
                  <Table.Cell numeric>{index + 1}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Table.ScrollArea>
      ))}
    </div>
  );
}