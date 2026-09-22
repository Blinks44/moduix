import { ScrollArea, ScrollAreaContent, ScrollAreaCorner, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from '@moduix/react/scroll-area';
import { Table, TableBody, TableCell, TableColumnHeader, TableHeader, TableRow } from '@moduix/react/table';
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
    <ScrollArea className={styles.root}>
      <ScrollAreaViewport>
        <ScrollAreaContent>
          <Table className={styles.table}>
            <TableHeader>
              <TableRow>
                <TableColumnHeader>Project</TableColumnHeader>
                <TableColumnHeader>Owner</TableColumnHeader>
                <TableColumnHeader>Environment</TableColumnHeader>
                <TableColumnHeader>Updated</TableColumnHeader>
                <TableColumnHeader numeric>Open issues</TableColumnHeader>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from(
                {
                  length: 12,
                },
                (_, index) => rows[index % rows.length],
              ).map((row, index) => (
                <TableRow key={`${row.name}-${index}`}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.owner}</TableCell>
                  <TableCell>{row.environment}</TableCell>
                  <TableCell>{row.updated}</TableCell>
                  <TableCell numeric>{index + 1}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollAreaContent>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar>
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
      <ScrollAreaScrollbar orientation="horizontal">
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
      <ScrollAreaCorner />
    </ScrollArea>
  );
}
