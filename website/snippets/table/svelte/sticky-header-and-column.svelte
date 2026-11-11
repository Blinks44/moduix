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
  import styles from '@/components/examples/table/table-sticky-header-and-column.module.css';

  const rows = [
    {
      name: 'Docs redesign',
      owner: 'Product Design',
      environment: 'Production',
      updated: '2 hours ago',
    },
    { name: 'Billing migration', owner: 'Growth', environment: 'Staging', updated: 'Yesterday' },
    { name: 'Command palette', owner: 'Platform', environment: 'Preview', updated: 'Today' },
  ];
  const stickyRows = Array.from({ length: 12 }, (_, index) => ({
    ...rows[index % rows.length],
    index,
  }));
</script>

<TableScrollArea class={styles.scrollArea}>
  <Table stickyHeader interactive class={styles.table}>
    <TableHeader>
      <TableRow>
        <TableColumnHeader data-sticky="start">Project</TableColumnHeader>
        <TableColumnHeader>Owner</TableColumnHeader>
        <TableColumnHeader>Environment</TableColumnHeader>
        <TableColumnHeader>Updated</TableColumnHeader>
        <TableColumnHeader numeric>Open issues</TableColumnHeader>
      </TableRow>
    </TableHeader>
    <TableBody>
      {#each stickyRows as row (row.name + row.index)}
        <TableRow>
          <TableCell data-sticky="start">{row.name}</TableCell>
          <TableCell>{row.owner}</TableCell>
          <TableCell>{row.environment}</TableCell>
          <TableCell>{row.updated}</TableCell>
          <TableCell numeric>{row.index + 1}</TableCell>
        </TableRow>
      {/each}
    </TableBody>
  </Table>
</TableScrollArea>