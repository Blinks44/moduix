<script lang="ts">
  import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableColumn,
    TableColumnGroup,
    TableColumnHeader,
    TableEmpty,
    TableFooter,
    TableHeader,
    TableRow,
  } from '@/components/table';
</script>

<Table>
  <TableColumnGroup><TableColumn width="50%" /><TableColumn /></TableColumnGroup>
  <TableCaption>Invoices</TableCaption>
  <TableHeader>
    <TableRow>
      <TableColumnHeader>Invoice</TableColumnHeader>
      <TableColumnHeader>Amount</TableColumnHeader>
    </TableRow>
  </TableHeader>
  <TableBody><TableEmpty colSpan={2} /></TableBody>
  <TableFooter><TableRow><TableCell colspan={2}>Total</TableCell></TableRow></TableFooter>
</Table>