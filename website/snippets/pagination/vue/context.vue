<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import { Pagination, PaginationContext } from '@moduix/vue/pagination';
</script>

<template>
  <Pagination :count="200" :page-size="10">
    <PaginationContext v-slot="pagination">
      <output>Page {{ pagination.page }} of {{ pagination.totalPages }}</output>
      <Button size="sm" @click="pagination.goToFirstPage()">First</Button>
      <Button size="sm" @click="pagination.goToPrevPage()">Prev</Button>
      <Button size="sm" @click="pagination.goToNextPage()">Next</Button>
      <Button size="sm" @click="pagination.goToLastPage()">Last</Button>
    </PaginationContext>
  </Pagination>
</template>