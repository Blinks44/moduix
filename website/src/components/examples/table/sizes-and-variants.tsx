import { Table, TableBody, TableCaption, TableCell, TableColumnHeader, TableHeader, TableRow, TableScrollArea } from '@moduix/react/table';
import styles from '@/components/examples/table/table-sizes-and-variants.module.css';

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
    <div className={styles.root}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <TableScrollArea key={size}>
          <Table size={size} variant={size === 'md' ? 'outline' : 'line'}>
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
                <TableRow key={project.name}>
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
