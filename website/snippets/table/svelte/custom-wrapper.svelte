<script lang="ts">
  import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableColumnHeader,
    TableHeader,
    TableRow,
  } from '@moduix/svelte/table';
  import styles from '@/components/examples/table/table-custom-wrapper.module.css';

  const plans = [
    { name: 'Starter', seats: 'Up to 5', cost: '$19' },
    { name: 'Team', seats: 'Up to 25', cost: '$79' },
    { name: 'Enterprise', seats: 'Custom', cost: 'Contact sales' },
  ];
</script>

<div class={styles.root}>
  <Table class={styles.table}>
    <TableCaption side="bottom">
      This version uses a plain wrapper instead of TableScrollArea.
    </TableCaption>
    <TableHeader>
      <TableRow>
        <TableColumnHeader>Plan</TableColumnHeader>
        <TableColumnHeader>Seats</TableColumnHeader>
        <TableColumnHeader numeric>Monthly cost</TableColumnHeader>
      </TableRow>
    </TableHeader>
    <TableBody>
      {#each plans as plan (plan.name)}
        <TableRow>
          <TableCell>{plan.name}</TableCell>
          <TableCell>{plan.seats}</TableCell>
          <TableCell numeric>{plan.cost}</TableCell>
        </TableRow>
      {/each}
    </TableBody>
  </Table>
</div>