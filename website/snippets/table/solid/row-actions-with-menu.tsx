import { Button } from '@moduix/solid/button';
import { Menu, MenuTrigger, MenuPositioner, MenuContent, MenuViewport, MenuItem, MenuSeparator } from '@moduix/solid/menu';
import { Table, TableBody, TableCell, TableColumnHeader, TableHeader, TableRow, TableScrollArea } from '@moduix/solid/table';

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
    <TableScrollArea>
      <Table interactive>
        <TableHeader>
          <TableRow>
            <TableColumnHeader>Project</TableColumnHeader>
            <TableColumnHeader>Owner</TableColumnHeader>
            <TableColumnHeader>Environment</TableColumnHeader>
            <TableColumnHeader>Updated</TableColumnHeader>
            <TableColumnHeader>Actions</TableColumnHeader>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.owner}</TableCell>
              <TableCell>{row.environment}</TableCell>
              <TableCell>{row.updated}</TableCell>
              <TableCell>
                <RowActionsMenu itemName={row.name} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableScrollArea>
  );
}
