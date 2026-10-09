<script setup lang="ts">
import {
  Pagination,
  PaginationFirstTrigger,
  PaginationItems,
  PaginationLastTrigger,
  PaginationNextTrigger,
  PaginationPrevTrigger,
} from '@moduix/vue/pagination';
import styles from '@/components/examples/pagination/pagination-with-edges.module.css';
</script>

<template>
  <Pagination :class="styles.root" :count="400" :page-size="20" :sibling-count="2">
    <PaginationFirstTrigger />
    <PaginationPrevTrigger />
    <PaginationItems />
    <PaginationNextTrigger />
    <PaginationLastTrigger />
  </Pagination>
</template>