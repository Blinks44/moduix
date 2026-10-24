import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableColumnHeader,
  TableHeader,
  TableRow,
  TableScrollArea,
} from '@moduix/solid/table';
import styles from '@/components/examples/table/table-sizes.module.css';

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

export default function TableSizesDemo() {
  return (
    <div class={styles.root}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <TableScrollArea>
          <Table size={size}>
            <TableCaption side="top">{size.toUpperCase()} project summary</TableCaption>
            <TableHeader>
              <TableRow>
                <TableColumnHeader>Project</TableColumnHeader>
                <TableColumnHeader>Owner</TableColumnHeader>
                <TableColumnHeader numeric>Open issues</TableColumnHeader>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project, index) => (
                <TableRow>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.owner}</TableCell>
                  <TableCell numeric>{index + 1}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableScrollArea>
      ))}
    </div>
  );
}