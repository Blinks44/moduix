<script setup lang="ts">
import { TableScrollArea, Table } from '../../src';
</script>

<template>
  <TableScrollArea>
    <Table as-child data-testid="table" class="hydrated-table">
      <section aria-label="Invoice table">Invoice table</section>
    </Table>
  </TableScrollArea>
</template>