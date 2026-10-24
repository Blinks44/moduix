<script setup lang="ts">
import {
  Pagination,
  PaginationFirstTrigger,
  PaginationItems,
  PaginationLastTrigger,
  PaginationNextTrigger,
  PaginationPrevTrigger,
} from '@moduix/vue/pagination';
</script>

<template>
  <Pagination :count="400" :page-size="20" :sibling-count="2">
    <PaginationFirstTrigger />
    <PaginationPrevTrigger />
    <PaginationItems />
    <PaginationNextTrigger />
    <PaginationLastTrigger />
  </Pagination>
</template>