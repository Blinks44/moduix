<script setup lang="ts">
import { createListCollection } from '@ark-ui/vue/collection';
import {
  Pagination,
  PaginationContext,
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
} from '@moduix/vue/pagination';
import {
  Select,
  SelectContent,
  SelectControl,
  SelectIndicator,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectPositioner,
  SelectTrigger,
  SelectValueText,
} from '@moduix/vue/select';
import type { SelectValueChangeDetails } from '@moduix/vue/select';
import styles from '@/components/examples/pagination/pagination-page-size-control.module.css';

const pageSizes = createListCollection({
  items: [
    { label: '5', value: '5' },
    { label: '10', value: '10' },
    { label: '20', value: '20' },
    { label: '50', value: '50' },
  ],
});

const handlePageSizeChange = (
  details: SelectValueChangeDetails,
  setPageSize: (size: number) => void,
) => {
  const nextValue = details.value[0];
  if (nextValue) setPageSize(Number(nextValue));
};
</script>

<template>
  <Pagination :count="200" :default-page-size="10">
    <PaginationContext v-slot="pagination">
      <div :class="styles.stack">
        <div :class="styles.row">
          <Select
            :class="styles.pageSizeSelect"
            :collection="pageSizes"
            :model-value="[String(pagination.pageSize)]"
            @value-change="handlePageSizeChange($event, pagination.setPageSize)"
          >
            <SelectLabel>Items per page</SelectLabel>
            <SelectControl>
              <SelectTrigger>
                <SelectValueText placeholder="Page size" />
              </SelectTrigger>
              <SelectIndicator />
            </SelectControl>
            <SelectPositioner>
              <SelectContent>
                <SelectItem v-for="item in pageSizes.items" :key="item.value" :item="item">
                  <SelectItemText>{{ item.label }}</SelectItemText>
                  <SelectItemIndicator />
                </SelectItem>
              </SelectContent>
            </SelectPositioner>
          </Select>
        </div>
        <div :class="styles.row">
          <PaginationPrevTrigger />
          <PaginationItems />
          <PaginationNextTrigger />
        </div>
        <output>Page {{ pagination.page }} of {{ pagination.totalPages }}</output>
      </div>
    </PaginationContext>
  </Pagination>
</template>