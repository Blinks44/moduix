<script setup lang="ts">
import { ref } from 'vue';
import {
  Pagination,
  PaginationContext,
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRootProvider,
  usePagination,
} from '../src/components/pagination';

const page = ref(2);
const pageSize = ref(10);
const pagination = usePagination({ count: 30, defaultPage: 1, pageSize: 10 });
</script>

<template>
  <Pagination v-model:page="page" v-model:page-size="pageSize" :count="30">
    <PaginationPrevTrigger />
    <PaginationItems />
    <PaginationNextTrigger />
    <PaginationContext v-slot="api">
      <output>{{ api.page }} of {{ api.totalPages }}</output>
      <button type="button" @click="api.setPageSize(5)">Set page size</button>
    </PaginationContext>
  </Pagination>

  <PaginationRootProvider :value="pagination">
    <PaginationPrevTrigger />
    <PaginationItems />
    <PaginationNextTrigger />
  </PaginationRootProvider>
</template>