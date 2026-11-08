<script lang="ts">
  import { Stack } from '@moduix/svelte/stack';
  import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableColumnHeader,
    TableHeader,
    TableRow,
    TableScrollArea,
  } from '@moduix/svelte/table';

  const projects = [
    { name: 'Docs redesign', owner: 'Product Design' },
    { name: 'Billing migration', owner: 'Growth' },
  ];
  const sizes = ['sm', 'md', 'lg'] as const;
</script>

<Stack gap="4">
  {#each sizes as size (size)}
    <TableScrollArea>
      <Table {size}>
        <TableCaption side="top">{size.toUpperCase()} project summary</TableCaption>
        <TableHeader>
          <TableRow>
            <TableColumnHeader>Project</TableColumnHeader>
            <TableColumnHeader>Owner</TableColumnHeader>
            <TableColumnHeader numeric>Open issues</TableColumnHeader>
          </TableRow>
        </TableHeader>
        <TableBody>
          {#each projects as project, index (project.name)}
            <TableRow>
              <TableCell>{project.name}</TableCell>
              <TableCell>{project.owner}</TableCell>
              <TableCell numeric>{index + 1}</TableCell>
            </TableRow>
          {/each}
        </TableBody>
      </Table>
    </TableScrollArea>
  {/each}
</Stack>