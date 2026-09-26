<script setup lang="ts">
import { useListCollection } from '@ark-ui/vue/collection';
import { useFilter } from '@ark-ui/vue/locale';
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
  ComboboxTrigger,
} from '@moduix/vue/combobox';
import { ref } from 'vue';
import styles from '@/components/examples/combobox/component-controlled.module.css';

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
const value = ref<string[]>(['mango']);
</script>

<template>
  <div :class="styles.stack">
    <Combobox
      v-model="value"
      :collection="collection"
      @input-value-change="filter($event.inputValue)"
    >
      <ComboboxLabel>Choose fruit</ComboboxLabel>
      <ComboboxControl>
        <ComboboxInput />
        <ComboboxClearTrigger aria-label="Clear selection" />
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
    <output>Selected: {{ value[0] ?? 'none' }}</output>
  </div>
</template>