<script setup lang="ts">
import {
  Pagination,
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
} from '@moduix/vue/pagination';
import type { PaginationPageChangeDetails } from '@moduix/vue/pagination';
import { ref } from 'vue';
import styles from '@/components/examples/pagination/pagination-controlled.module.css';

const page = ref(5);
const handlePageChange = (details: PaginationPageChangeDetails) => {
  page.value = details.page;
};
</script>

<template>
  <div :class="styles.stack">
    <Pagination
      v-model:page="page"
      :class="styles.root"
      :count="200"
      :page-size="10"
      :sibling-count="2"
      @page-change="handlePageChange"
    >
      <PaginationPrevTrigger />
      <PaginationItems />
      <PaginationNextTrigger />
    </Pagination>
    <output>Current page: {{ page }}</output>
  </div>
</template>