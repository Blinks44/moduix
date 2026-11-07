<script lang="ts">
  import { Table, TableBody, TableEmpty } from '@/components/table';

  let empty: Element | null = $state(null);

  export const getEmpty = () => empty;
</script>

<Table>
  <TableBody>
    <TableEmpty bind:ref={empty} colSpan={2} class="custom-empty">
      {#snippet asChild(props)}
        <td {...props()} data-testid="custom-empty-cell">Nothing to review.</td>
      {/snippet}
    </TableEmpty>
  </TableBody>
</Table>