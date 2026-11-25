<script setup lang="ts">
import {
  Combobox,
  ComboboxDropdown,
  ComboboxEmpty,
  ComboboxField,
  ComboboxLabel,
  ComboboxList,
  ComboboxOption,
  useFilteredCollection,
} from '@moduix/vue/combobox';

const fruits = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Mango', value: 'mango' },
];

const { collection, filter } = useFilteredCollection({
  initialItems: fruits,
});
</script>

<template>
  <Combobox :collection="collection" :filter="filter">
    <ComboboxLabel>Choose fruit</ComboboxLabel>
    <ComboboxField
      placeholder="e.g. Mango"
      clear-label="Clear selection"
      trigger-label="Open options"
    />
    <ComboboxDropdown>
      <ComboboxEmpty>No fruits found.</ComboboxEmpty>
      <ComboboxList>
        <ComboboxOption v-for="item in collection.items" :key="item.value" :item="item">
          {{ item.label }}
        </ComboboxOption>
      </ComboboxList>
    </ComboboxDropdown>
  </Combobox>
</template>