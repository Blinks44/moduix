<script lang="ts">
  import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableColumn,
    TableColumnGroup,
    TableColumnHeader,
    TableFooter,
    TableHeader,
    TableRow,
    TableScrollArea,
  } from '@/components/table';
</script>

<TableScrollArea data-testid="scroll-area">
  <Table data-testid="table" size="lg">
    <TableColumnGroup data-testid="column-group">
      <TableColumn data-testid="column" width="40%" />
    </TableColumnGroup>
    <TableCaption data-testid="caption" side="top">Recent invoices</TableCaption>
    <TableHeader data-testid="header">
      <TableRow data-testid="header-row">
        <TableColumnHeader data-testid="column-header" scope="col">Invoice</TableColumnHeader>
        <TableColumnHeader data-testid="numeric-header" numeric>Amount</TableColumnHeader>
      </TableRow>
    </TableHeader>
    <TableBody data-testid="body">
      <TableRow data-testid="row">
        <TableCell data-testid="cell">INV001</TableCell>
        <TableCell numeric>$250.00</TableCell>
      </TableRow>
    </TableBody>
    <TableFooter data-testid="footer">
      <TableRow>
        <TableCell colspan={1}>Total</TableCell>
        <TableCell numeric>$250.00</TableCell>
      </TableRow>
    </TableFooter>
  </Table>
</TableScrollArea>