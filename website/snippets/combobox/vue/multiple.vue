<script setup lang="ts">
import { useListCollection } from '@ark-ui/vue/collection';
import { useFilter } from '@ark-ui/vue/locale';
import {
  Combobox,
  ComboboxContent,
  ComboboxControl,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxLabel,
  ComboboxList,
  ComboboxOption,
  ComboboxPositioner,
  ComboboxTrigger,
} from '@moduix/vue/combobox';
import { computed, ref } from 'vue';
import styles from '@/components/examples/combobox/component-multiple.module.css';

const fruits = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Mango', value: 'mango' },
  { label: 'Orange', value: 'orange' },
];
const filterOptions = useFilter({ sensitivity: 'base' });
const { collection, filter } = useListCollection({
  initialItems: fruits,
  filter: (itemText, filterText) => filterOptions.value.contains(itemText, filterText),
});
const value = ref<string[]>([]);
const selectedItems = computed(() => fruits.filter((item) => value.value.includes(item.value)));
</script>

<template>
  <Combobox
    v-model="value"
    :collection="collection"
    multiple
    @input-value-change="filter($event.inputValue)"
  >
    <ComboboxLabel>Fruits</ComboboxLabel>
    <div :class="styles.tags">
      <span v-if="selectedItems.length === 0" :class="styles.note">None selected</span>
      <span v-for="item in selectedItems" :key="item.value" :class="styles.tag">{{
        item.label
      }}</span>
    </div>
    <ComboboxControl>
      <ComboboxInput placeholder="Search fruits" />
      <ComboboxTrigger aria-label="Open options" />
    </ComboboxControl>
    <ComboboxPositioner>
      <ComboboxContent :class="styles.content">
        <ComboboxEmpty>No fruits found.</ComboboxEmpty>
        <ComboboxList>
          <ComboboxOption v-for="item in collection.items" :key="item.value" :item="item">
            {{ item.label }}
          </ComboboxOption>
        </ComboboxList>
      </ComboboxContent>
    </ComboboxPositioner>
  </Combobox>
</template>