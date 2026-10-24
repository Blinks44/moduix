<script setup lang="ts">
import {
  Pagination,
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
} from '@moduix/vue/pagination';
</script>

<template>
  <Pagination :count="200" :page-size="10" :sibling-count="2">
    <PaginationPrevTrigger />
    <PaginationItems />
    <PaginationNextTrigger />
  </Pagination>
</template>