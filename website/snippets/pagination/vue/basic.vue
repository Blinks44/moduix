<script setup lang="ts">
import {
  Pagination,
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
} from '@moduix/vue/pagination';
import styles from '@/components/examples/pagination/pagination-basic.module.css';
</script>

<template>
  <Pagination :class="styles.root" :count="200" :page-size="10" :sibling-count="2">
    <PaginationPrevTrigger />
    <PaginationItems />
    <PaginationNextTrigger />
  </Pagination>
</template>