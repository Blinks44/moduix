<script lang="ts">
  import { Table, TableBody, TableEmpty } from '@/components/table';

  let empty: Element | null = $state(null);

  export const getEmpty = () => empty;
</script>

<Table>
  <TableBody>
    <TableEmpty colSpan={3} data-testid="default-empty" />
    <TableEmpty bind:ref={empty} colSpan={3} data-testid="custom-empty">
      No invoices found.
    </TableEmpty>
  </TableBody>
</Table>