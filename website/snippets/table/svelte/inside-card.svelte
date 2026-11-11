<script lang="ts">
  import { Card, CardBody, CardHeader, CardTitle } from '@moduix/svelte/card';
  import {
    Table,
    TableBody,
    TableCell,
    TableColumnHeader,
    TableHeader,
    TableRow,
    TableScrollArea,
  } from '@moduix/svelte/table';

  const projects = [
    { name: 'Docs redesign', owner: 'Product Design', updated: '2 hours ago', issues: '3 open' },
    { name: 'Billing migration', owner: 'Growth', updated: 'Yesterday', issues: '1 blocked' },
    { name: 'Command palette', owner: 'Platform', updated: 'Today', issues: 'Healthy' },
  ];
</script>

<Card>
  <CardHeader><CardTitle>Projects</CardTitle></CardHeader>
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
          {#each projects as project (project.name)}
            <TableRow>
              <TableCell>{project.name}</TableCell>
              <TableCell>{project.owner}</TableCell>
              <TableCell>{project.updated}</TableCell>
              <TableCell>{project.issues}</TableCell>
            </TableRow>
          {/each}
        </TableBody>
      </Table>
    </TableScrollArea>
  </CardBody>
</Card>