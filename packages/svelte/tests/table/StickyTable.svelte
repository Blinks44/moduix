<script lang="ts">
  import {
    Table,
    TableBody,
    TableCell,
    TableColumnHeader,
    TableHeader,
    TableRow,
    TableScrollArea,
  } from '@/components/table';
</script>

<TableScrollArea>
  <Table>
    <TableHeader>
      <TableRow><TableColumnHeader data-sticky="start">Project</TableColumnHeader></TableRow>
    </TableHeader>
    <TableBody>
      <TableRow><TableCell data-sticky="start">Docs redesign</TableCell></TableRow>
    </TableBody>
  </Table>
</TableScrollArea>