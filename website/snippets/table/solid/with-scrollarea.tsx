import { ScrollArea } from '@moduix/solid/scroll-area';
import { Table } from '@moduix/solid/table';
import styles from '@/components/examples/table/table-with-scrollarea.module.css';

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

export default function TableWithScrollareaDemo() {
  return (
    <ScrollArea class={styles.root}>
      <ScrollArea.Viewport>
        <ScrollArea.Content>
          <Table class={styles.table}>
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
              {Array.from({ length: 12 }, (_, index) => rows[index % rows.length]).map(
                (row, index) => (
                  <Table.Row>
                    <Table.Cell>{row.name}</Table.Cell>
                    <Table.Cell>{row.owner}</Table.Cell>
                    <Table.Cell>{row.environment}</Table.Cell>
                    <Table.Cell>{row.updated}</Table.Cell>
                    <Table.Cell numeric>{index + 1}</Table.Cell>
                  </Table.Row>
                ),
              )}
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