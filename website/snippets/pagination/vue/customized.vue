<script setup lang="ts">
import {
  Pagination,
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
} from '@moduix/vue/pagination';
import type { PaginationItemLabelDetails } from '@moduix/vue/pagination';

const translations = {
  nextTriggerLabel: 'Next page',
  prevTriggerLabel: 'Previous page',
  itemLabel: (details: PaginationItemLabelDetails) => 'Page ' + details.page,
};
</script>

<template>
  <Pagination :count="400" :page-size="20" :sibling-count="3" :translations="translations">
    <PaginationPrevTrigger />
    <PaginationItems />
    <PaginationNextTrigger />
  </Pagination>
</template>