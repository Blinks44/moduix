<script setup lang="ts">
import {
  Pagination,
  PaginationContext,
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
} from '@moduix/vue/pagination';
import styles from '@/components/examples/pagination/pagination-page-range.module.css';
</script>

<template>
  <Pagination :count="200" :page-size="10">
    <PaginationContext v-slot="pagination">
      <div :class="styles.stack">
        <div :class="styles.row">
          <PaginationPrevTrigger />
          <PaginationItems />
          <PaginationNextTrigger />
        </div>
        <div data-preview-meta>
          <output>
            Showing {{ pagination.pageRange.start + 1 }}-{{ pagination.pageRange.end }} of
            {{ pagination.count }} results
          </output>
        </div>
      </div>
    </PaginationContext>
  </Pagination>
</template>