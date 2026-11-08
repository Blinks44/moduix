<script lang="ts">
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
    { name: 'Docs redesign', owner: 'Product Design', updated: '2 hours ago' },
    { name: 'Billing migration', owner: 'Growth', updated: 'Yesterday' },
    { name: 'Command palette', owner: 'Platform', updated: 'Today' },
  ];
</script>

<TableScrollArea>
  <Table striped interactive>
    <TableHeader>
      <TableRow>
        <TableColumnHeader>Project</TableColumnHeader>
        <TableColumnHeader>Owner</TableColumnHeader>
        <TableColumnHeader>Updated</TableColumnHeader>
        <TableColumnHeader numeric>Open issues</TableColumnHeader>
      </TableRow>
    </TableHeader>
    <TableBody>
      {#each projects as project, index (project.name)}
        <TableRow>
          <TableCell>{project.name}</TableCell>
          <TableCell>{project.owner}</TableCell>
          <TableCell>{project.updated}</TableCell>
          <TableCell numeric>{index + 1}</TableCell>
        </TableRow>
      {/each}
    </TableBody>
  </Table>
</TableScrollArea>