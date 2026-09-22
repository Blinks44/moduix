import { Button } from '@moduix/react/button';
import { Menu, MenuTrigger, MenuPositioner, MenuContent, MenuViewport, MenuItem, MenuSeparator } from '@moduix/react/menu';
import { Table, TableBody, TableCell, TableColumnHeader, TableHeader, TableRow, TableScrollArea } from '@moduix/react/table';

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
      <MenuTrigger asChild>
        <Button variant="ghost" size="icon-sm" aria-label={`Open actions for ${itemName}`}>
          <span aria-hidden>…</span>
        </Button>
      </MenuTrigger>
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
            <TableRow key={row.name}>
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
