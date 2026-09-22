import {
  Table,
  TableBody,
  TableCaption,
  TableColumnHeader,
  TableEmpty,
  TableHeader,
  TableRow,
  TableScrollArea,
} from '@moduix/solid/table';

const columnCount = 4;

export default function EmptyStateTableDemo() {
  return (
    <TableScrollArea>
      <Table>
        <TableCaption side="top">Projects filtered by the current workspace query.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableColumnHeader>Project</TableColumnHeader>
            <TableColumnHeader>Owner</TableColumnHeader>
            <TableColumnHeader>Updated</TableColumnHeader>
            <TableColumnHeader numeric>Open issues</TableColumnHeader>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableEmpty colSpan={columnCount}>No projects matched the current filters.</TableEmpty>
        </TableBody>
      </Table>
    </TableScrollArea>
  );
}