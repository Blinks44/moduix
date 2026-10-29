<script setup lang="ts">
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRootProvider,
  usePagination,
} from '@moduix/vue/pagination';
import { Stack } from '@moduix/vue/stack';

const pagination = usePagination({
  count: 200,
  pageSize: 10,
  siblingCount: 2,
});
</script>

<template>
  <Stack align="flex-start" gap="3">
    <button type="button" @click="pagination.goToNextPage()">Next page</button>
    <PaginationRootProvider :value="pagination">
      <PaginationPrevTrigger />
      <PaginationItems />
      <PaginationNextTrigger />
    </PaginationRootProvider>
  </Stack>
</template>