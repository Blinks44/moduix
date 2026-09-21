import { Button } from '@moduix/solid/button';
import { Menu, MenuTrigger, MenuPositioner, MenuContent, MenuViewport, MenuItem, MenuSeparator } from '@moduix/solid/menu';
import { Table } from '@moduix/solid/table';

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

function RowActionsMenu(props: { itemName: string }) {
  return (
    <Menu positioning={{ placement: 'bottom-end' }}>
      <MenuTrigger
        asChild={(triggerProps) => (
          <Button
            {...triggerProps()}
            variant="ghost"
            size="icon-sm"
            aria-label={`Open actions for ${props.itemName}`}
          >
            <span aria-hidden="true">…</span>
          </Button>
        )}
      />
      <MenuPositioner>
        <MenuContent>
          <MenuViewport>
            <MenuItem value="open">Open project</MenuItem>
            <MenuItem value="copy-link">Copy link</MenuItem>
            <MenuItem value="duplicate">Duplicate</MenuItem>
            <MenuSeparator />
            <MenuItem value="archive" tone="destructive">
              Archive
            </MenuItem>
          </MenuViewport>
        </MenuContent>
      </MenuPositioner>
    </Menu>
  );
}

export default function TableRowActionsDemo() {
  return (
    <Table.ScrollArea>
      <Table interactive>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Project</Table.ColumnHeader>
            <Table.ColumnHeader>Owner</Table.ColumnHeader>
            <Table.ColumnHeader>Environment</Table.ColumnHeader>
            <Table.ColumnHeader>Updated</Table.ColumnHeader>
            <Table.ColumnHeader>Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rows.map((row) => (
            <Table.Row>
              <Table.Cell>{row.name}</Table.Cell>
              <Table.Cell>{row.owner}</Table.Cell>
              <Table.Cell>{row.environment}</Table.Cell>
              <Table.Cell>{row.updated}</Table.Cell>
              <Table.Cell>
                <RowActionsMenu itemName={row.name} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Table.ScrollArea>
  );
}
