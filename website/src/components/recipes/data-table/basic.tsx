import { Badge } from '@moduix/react/badge';
import { Table, TableBody, TableCell, TableColumn, TableColumnGroup, TableColumnHeader, TableHeader, TableRow, TableScrollArea } from '@moduix/react/table';
import {
  columnVisibilityFeature,
  flexRender,
  tableFeatures,
  useTable,
  type ColumnDef,
} from '@tanstack/react-table';

const features = tableFeatures({ columnVisibilityFeature });

type Payment = {
  id: string;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
  amount: number;
};

const payments: Payment[] = [
  { id: '728ed52f', status: 'pending', email: 'm@example.com', amount: 100 },
  { id: '489e1d42', status: 'processing', email: 'abe45@example.com', amount: 125 },
  { id: 'f47ac10b', status: 'success', email: 'monserrat44@example.com', amount: 837 },
];

const columns: ColumnDef<typeof features, Payment>[] = [
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'email', header: 'Email' },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ getValue }) =>
      new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
        getValue<number>(),
      ),
  },
];

export default function DataTableDemo() {
  const table = useTable({
    features,
    data: payments,
    columns,
  });

  return (
    <TableScrollArea className="data-table">
      <Table className="data-table-table">
        <TableColumnGroup>
          <TableColumn htmlWidth={128} />
          <TableColumn />
          <TableColumn htmlWidth={128} />
        </TableColumnGroup>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableColumnHeader
                  key={header.id}
                  colSpan={header.colSpan}
                  numeric={header.column.id === 'amount'}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableColumnHeader>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} numeric={cell.column.id === 'amount'}>
                  {cell.column.id === 'status' ? (
                    <Badge variant="outline">{cell.getValue<string>()}</Badge>
                  ) : (
                    flexRender(cell.column.columnDef.cell, cell.getContext())
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableScrollArea>
  );
}
