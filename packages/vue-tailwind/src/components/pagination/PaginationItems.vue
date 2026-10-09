<script setup lang="ts">
import { PaginationContext } from '@ark-ui/vue/pagination';
import PaginationEllipsis from './PaginationEllipsis.vue';
import PaginationItem from './PaginationItem.vue';

defineSlots<{}>();
</script>

<template>
  <PaginationContext v-slot="pagination">
    <template
      v-for="(page, index) in pagination.pages"
      :key="page.type === 'page' ? page.value : 'ellipsis-' + index"
    >
      <PaginationItem v-if="page.type === 'page'" :type="page.type" :value="page.value">
        {{ page.value }}
      </PaginationItem>
      <PaginationEllipsis v-else :index="index" />
    </template>
  </PaginationContext>
</template>