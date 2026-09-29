<script setup lang="ts">
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRootProvider,
  usePagination,
} from '@moduix/vue/pagination';
import styles from '@/components/examples/pagination/pagination-root-provider.module.css';

const pagination = usePagination({
  count: 200,
  pageSize: 10,
  siblingCount: 2,
});
</script>

<template>
  <div :class="styles.stack">
    <button type="button" @click="pagination.goToNextPage()">Next page</button>
    <PaginationRootProvider :class="styles.root" :value="pagination">
      <PaginationPrevTrigger />
      <PaginationItems />
      <PaginationNextTrigger />
    </PaginationRootProvider>
  </div>
</template>