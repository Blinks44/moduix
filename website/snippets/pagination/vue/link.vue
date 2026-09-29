<script setup lang="ts">
import {
  Pagination,
  PaginationContext,
  PaginationEllipsis,
  PaginationItem,
  PaginationNextTrigger,
  PaginationPrevTrigger,
} from '@moduix/vue/pagination';
import styles from '@/components/examples/pagination/pagination-link.module.css';

const getPageUrl = (details: { page: number }) => '?page=' + details.page;
</script>

<template>
  <Pagination
    :class="styles.root"
    :count="200"
    :page-size="10"
    :sibling-count="2"
    type="link"
    :get-page-url="getPageUrl"
  >
    <PaginationPrevTrigger as-child><a>Previous</a></PaginationPrevTrigger>
    <PaginationContext v-slot="pagination">
      <template v-for="(page, index) in pagination.pages" :key="index">
        <PaginationItem v-if="page.type === 'page'" as-child :type="page.type" :value="page.value">
          <a>{{ page.value }}</a>
        </PaginationItem>
        <PaginationEllipsis v-else :index="index" />
      </template>
    </PaginationContext>
    <PaginationNextTrigger as-child><a>Next</a></PaginationNextTrigger>
  </Pagination>
</template>