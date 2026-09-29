<script setup lang="ts">
import {
  Pagination,
  PaginationContext,
  PaginationEllipsis,
  PaginationItem,
  PaginationNextTrigger,
  PaginationPrevTrigger,
} from '@moduix/vue/pagination';
import styles from '@/components/examples/pagination/pagination-advanced-customization.module.css';
</script>

<template>
  <Pagination :class="styles.root" :count="200" :page-size="10" :sibling-count="2">
    <PaginationPrevTrigger />
    <PaginationContext v-slot="pagination">
      <template v-for="(page, index) in pagination.pages" :key="index">
        <PaginationItem v-if="page.type === 'page'" :type="page.type" :value="page.value">
          Page {{ page.value }}
        </PaginationItem>
        <PaginationEllipsis v-else :index="index" />
      </template>
    </PaginationContext>
    <PaginationNextTrigger />
  </Pagination>
</template>