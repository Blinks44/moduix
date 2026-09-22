import { Card, CardBody, CardHeader, CardTitle } from '@moduix/solid/card';
import { Table, TableBody, TableCell, TableColumnHeader, TableHeader, TableRow, TableScrollArea } from '@moduix/solid/table';

const projects = [
  {
    name: 'Docs redesign',
    owner: 'Product Design',
    updated: '2 hours ago',
    issues: '3 open',
  },
  {
    name: 'Billing migration',
    owner: 'Growth',
    updated: 'Yesterday',
    issues: '1 blocked',
  },
  {
    name: 'Command palette',
    owner: 'Platform',
    updated: 'Today',
    issues: 'Healthy',
  },
];

export default function TableInsideCardDemo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Projects</CardTitle>
      </CardHeader>
      <CardBody>
        <TableScrollArea>
          <Table>
            <TableHeader>
              <TableRow>
                <TableColumnHeader>Project</TableColumnHeader>
                <TableColumnHeader>Owner</TableColumnHeader>
                <TableColumnHeader>Updated</TableColumnHeader>
                <TableColumnHeader>Health</TableColumnHeader>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.owner}</TableCell>
                  <TableCell>{project.updated}</TableCell>
                  <TableCell>{project.issues}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableScrollArea>
      </CardBody>
    </Card>
  );
}
