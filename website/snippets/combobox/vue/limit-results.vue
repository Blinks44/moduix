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
import styles from '@/components/examples/combobox/component-limit-results.module.css';

const cities = [
  'New York',
  'Los Angeles',
  'Chicago',
  'Houston',
  'Phoenix',
  'Philadelphia',
  'San Antonio',
  'San Diego',
  'Dallas',
  'San Jose',
  'Austin',
  'Jacksonville',
].map((label) => ({ label, value: label.toLowerCase().replaceAll(' ', '-') }));
const filterOptions = useFilter({ sensitivity: 'base' });
const { collection, filter } = useListCollection({
  initialItems: cities,
  filter: (itemText, filterText) => filterOptions.value.contains(itemText, filterText),
  limit: 5,
});
</script>

<template>
  <Combobox :collection="collection" @input-value-change="filter($event.inputValue)">
    <ComboboxLabel>City</ComboboxLabel>
    <ComboboxControl>
      <ComboboxInput placeholder="e.g. San" />
      <ComboboxTrigger aria-label="Open options" />
    </ComboboxControl>
    <ComboboxPositioner>
      <ComboboxContent :class="styles.content">
        <ComboboxEmpty>No cities found.</ComboboxEmpty>
        <ComboboxList>
          <ComboboxOption v-for="item in collection.items" :key="item.value" :item="item">
            {{ item.label }}
          </ComboboxOption>
        </ComboboxList>
      </ComboboxContent>
    </ComboboxPositioner>
  </Combobox>
</template>