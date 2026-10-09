<script setup lang="ts">
import { createListCollection } from '@ark-ui/vue/collection';
import type { ComboboxInputValueChangeDetails } from '@ark-ui/vue/combobox';
import {
  Combobox,
  ComboboxClearTrigger,
  ComboboxContent,
  ComboboxControl,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxLabel,
  ComboboxList,
  ComboboxOption,
  ComboboxPositioner,
  ComboboxStatus,
  ComboboxTrigger,
} from '@moduix/vue/combobox';
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import styles from '@/components/examples/combobox/component-async-search.module.css';

const fruits = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Mango', value: 'mango' },
  { label: 'Orange', value: 'orange' },
  { label: 'Pineapple', value: 'pineapple' },
  { label: 'Strawberry', value: 'strawberry' },
];
const query = ref('');
const items = ref<typeof fruits>([]);
const loading = ref(false);
const collection = computed(() => createListCollection({ items: items.value }));
let timeout: number | undefined;

watch(query, (value) => {
  if (timeout !== undefined) window.clearTimeout(timeout);
  if (!value) {
    items.value = [];
    loading.value = false;
    return;
  }
  loading.value = true;
  timeout = window.setTimeout(() => {
    items.value = fruits.filter((item) => item.label.toLowerCase().includes(value.toLowerCase()));
    loading.value = false;
  }, 300);
});

function handleInputValueChange(details: ComboboxInputValueChangeDetails) {
  if (details.reason === 'input-change' || details.inputValue === '') {
    query.value = details.inputValue;
  }
}

onBeforeUnmount(() => {
  if (timeout !== undefined) window.clearTimeout(timeout);
});
</script>

<template>
  <Combobox
    :collection="collection"
    :input-value="query"
    @input-value-change="handleInputValueChange"
  >
    <ComboboxLabel>Search fruit</ComboboxLabel>
    <ComboboxControl>
      <ComboboxInput placeholder="Start typing" />
      <ComboboxClearTrigger aria-label="Clear search" />
      <ComboboxTrigger aria-label="Open options" />
    </ComboboxControl>
    <ComboboxPositioner>
      <ComboboxContent :class="styles.content">
        <ComboboxStatus v-if="!query">Start typing to search…</ComboboxStatus>
        <ComboboxStatus v-if="loading">Searching…</ComboboxStatus>
        <ComboboxEmpty v-if="!loading && query">No results found.</ComboboxEmpty>
        <ComboboxList>
          <ComboboxOption v-for="item in collection.items" :key="item.value" :item="item">
            {{ item.label }}
          </ComboboxOption>
        </ComboboxList>
      </ComboboxContent>
    </ComboboxPositioner>
  </Combobox>
</template>