import { Button, Menu, Table } from '@moduix/react';
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

function RowActionsMenu({ itemName }: { itemName: string }) {
  return (
    <Menu
      positioning={{
        placement: 'bottom-end',
      }}
    >
      <Menu.Trigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          className={styles.actionTrigger}
          aria-label={`Open actions for ${itemName}`}
        >
          <span aria-hidden className={styles.actionEllipsis}>
            ...
          </span>
        </Button>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Item value="open">Open project</Menu.Item>
          <Menu.Item value="copy-link">Copy link</Menu.Item>
          <Menu.Item value="duplicate">Duplicate</Menu.Item>
          <Menu.Separator />
          <Menu.Item value="archive" tone="destructive">
            Archive
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu>
  );
}

export default function TableRowActionsDemo() {
  return (
    <Table.ScrollArea className={styles.showcase}>
      <Table className={styles.table}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Project</Table.ColumnHeader>
            <Table.ColumnHeader>Owner</Table.ColumnHeader>
            <Table.ColumnHeader>Environment</Table.ColumnHeader>
            <Table.ColumnHeader>Updated</Table.ColumnHeader>
            <Table.ColumnHeader className={styles.actionsHead}>Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rows.map((row) => (
            <Table.Row key={row.name}>
              <Table.Cell>{row.name}</Table.Cell>
              <Table.Cell>{row.owner}</Table.Cell>
              <Table.Cell>{row.environment}</Table.Cell>
              <Table.Cell>{row.updated}</Table.Cell>
              <Table.Cell className={styles.actionsCell}>
                <RowActionsMenu itemName={row.name} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Table.ScrollArea>
  );
}