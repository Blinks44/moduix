import {
  Table,
  TableBody,
  TableCell,
  TableColumnHeader,
  TableHeader,
  TableRow,
  TableScrollArea,
} from '@moduix/react/table';
import styles from '@/components/examples/table/table-sticky-header-and-column.module.css';

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

export default function TableStickyHeaderAndColumnDemo() {
  return (
    <TableScrollArea className={styles.scrollArea}>
      <Table stickyHeader interactive className={styles.table}>
        <TableHeader>
          <TableRow>
            <TableColumnHeader data-sticky="start">Project</TableColumnHeader>
            <TableColumnHeader>Owner</TableColumnHeader>
            <TableColumnHeader>Environment</TableColumnHeader>
            <TableColumnHeader>Updated</TableColumnHeader>
            <TableColumnHeader numeric>Open issues</TableColumnHeader>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 12 }, (_, index) => rows[index % rows.length]).map((row, index) => (
            <TableRow key={`${row.name}-${index}`}>
              <TableCell data-sticky="start">{row.name}</TableCell>
              <TableCell>{row.owner}</TableCell>
              <TableCell>{row.environment}</TableCell>
              <TableCell>{row.updated}</TableCell>
              <TableCell numeric>{index + 1}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableScrollArea>
  );
}