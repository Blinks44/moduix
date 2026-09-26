<script setup lang="ts">
import { useListCollection } from '@ark-ui/vue/collection';
import { useFilter } from '@ark-ui/vue/locale';
import {
  Combobox,
  ComboboxContent,
  ComboboxControl,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxItemText,
  ComboboxLabel,
  ComboboxList,
  ComboboxPositioner,
  ComboboxTrigger,
} from '@moduix/vue/combobox';
import { useVirtualizer } from '@tanstack/vue-virtual';
import { computed, ref } from 'vue';
import styles from '@/components/examples/combobox/component-virtualized.module.css';

const results = Array.from({ length: 1000 }, (_, index) => ({
  label: `Result ${String(index + 1).padStart(4, '0')}`,
  value: `result-${index + 1}`,
}));
const filterOptions = useFilter({ sensitivity: 'base' });
const { collection, filter, reset } = useListCollection({
  initialItems: results,
  filter: (itemText, filterText) => filterOptions.value.contains(itemText, filterText),
});
const scrollElement = ref<HTMLDivElement | null>(null);
const virtualizer = useVirtualizer(
  computed(() => ({
    count: collection.value.size,
    getScrollElement: () => scrollElement.value,
    estimateSize: () => 32,
    overscan: 8,
  })),
);
const virtualItems = computed(() =>
  virtualizer.value.getVirtualItems().flatMap((virtualItem) => {
    const item = collection.value.items[virtualItem.index];
    return item ? [{ item, virtualItem }] : [];
  }),
);
const totalSize = computed(() => virtualizer.value.getTotalSize());
</script>

<template>
  <Combobox
    :collection="collection"
    :scroll-to-index-fn="
      ({ index }) => virtualizer.scrollToIndex(index, { align: 'center', behavior: 'auto' })
    "
    @input-value-change="filter($event.inputValue)"
  >
    <ComboboxLabel>Large dataset</ComboboxLabel>
    <ComboboxControl>
      <ComboboxInput placeholder="Search 1,000 results" />
      <ComboboxTrigger aria-label="Open options" @click="reset" />
    </ComboboxControl>
    <ComboboxPositioner>
      <ComboboxContent :class="[styles.content, styles.virtualContent]">
        <ComboboxEmpty>No results found.</ComboboxEmpty>
        <div ref="scrollElement" :class="styles.virtualScroller">
          <ComboboxList
            :class="styles.virtualList"
            :style="{ height: `${totalSize}px`, width: '100%' }"
          >
            <ComboboxItem
              v-for="{ item, virtualItem } in virtualItems"
              :key="item.value"
              :item="item"
              :aria-setsize="collection.size"
              :aria-posinset="virtualItem.index + 1"
              :class="styles.virtualItem"
              :style="{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }"
            >
              <ComboboxItemText>{{ item.label }}</ComboboxItemText>
              <ComboboxItemIndicator />
            </ComboboxItem>
          </ComboboxList>
        </div>
      </ComboboxContent>
    </ComboboxPositioner>
  </Combobox>
</template>