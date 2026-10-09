<script setup lang="ts">
import {
  Pagination,
  PaginationPrevTrigger,
  PaginationItems,
  PaginationNextTrigger,
} from '../../src';
</script>

<template>
  <Pagination id="pagination-ssr" :count="30" :default-page="2" :page-size="10">
    <PaginationPrevTrigger />
    <PaginationItems />
    <PaginationNextTrigger />
  </Pagination>
</template>