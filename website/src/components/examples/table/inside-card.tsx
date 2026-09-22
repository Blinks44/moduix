import { Card, CardBody, CardHeader, CardTitle } from '@moduix/react/card';
import {
  Table,
  TableBody,
  TableCell,
  TableColumnHeader,
  TableHeader,
  TableRow,
  TableScrollArea,
} from '@moduix/react/table';

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
                <TableRow key={project.name}>
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