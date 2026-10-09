import {
  Table,
  TableBody,
  TableCell,
  TableColumnHeader,
  TableHeader,
  TableRow,
  TableScrollArea,
} from '@moduix/react/table';

const metrics = [
  {
    service: 'Search API',
    requests: '1,204,122',
    errorRate: '0.12%',
    latency: '128 ms',
  },
  {
    service: 'Billing API',
    requests: '248,421',
    errorRate: '0.04%',
    latency: '96 ms',
  },
  {
    service: 'Docs site',
    requests: '82,304',
    errorRate: '0.00%',
    latency: '42 ms',
  },
];

export default function TableNumericColumnsDemo() {
  return (
    <TableScrollArea>
      <Table>
        <TableHeader>
          <TableRow>
            <TableColumnHeader>Service</TableColumnHeader>
            <TableColumnHeader numeric>Requests</TableColumnHeader>
            <TableColumnHeader numeric>Error rate</TableColumnHeader>
            <TableColumnHeader numeric>Latency</TableColumnHeader>
          </TableRow>
        </TableHeader>
        <TableBody>
          {metrics.map((metric) => (
            <TableRow key={metric.service}>
              <TableCell>{metric.service}</TableCell>
              <TableCell numeric>{metric.requests}</TableCell>
              <TableCell numeric>{metric.errorRate}</TableCell>
              <TableCell numeric>{metric.latency}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableScrollArea>
  );
}