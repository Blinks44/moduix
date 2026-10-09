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
  ComboboxItemGroup,
  ComboboxItemGroupLabel,
  ComboboxLabel,
  ComboboxOption,
  ComboboxPositioner,
  ComboboxTrigger,
} from '@moduix/vue/combobox';
import styles from '@/components/examples/combobox/component-custom-objects-and-grouping.module.css';

const countries = [
  { country: 'Canada', code: 'CA', continent: 'North America' },
  { country: 'United States', code: 'US', continent: 'North America' },
  { country: 'Germany', code: 'DE', continent: 'Europe' },
  { country: 'France', code: 'FR', continent: 'Europe' },
  { country: 'Japan', code: 'JP', continent: 'Asia' },
  { country: 'South Korea', code: 'KR', continent: 'Asia' },
];
const filterOptions = useFilter({ sensitivity: 'base' });
const { collection, filter } = useListCollection({
  initialItems: countries,
  itemToString: (item) => item.country,
  itemToValue: (item) => item.code,
  filter: (itemText, filterText) => filterOptions.value.contains(itemText, filterText),
  groupBy: (item) => item.continent,
});
</script>

<template>
  <Combobox :collection="collection" @input-value-change="filter($event.inputValue)">
    <ComboboxLabel>Country</ComboboxLabel>
    <ComboboxControl>
      <ComboboxInput placeholder="e.g. Canada" />
      <ComboboxClearTrigger aria-label="Clear selection" />
      <ComboboxTrigger aria-label="Open options" />
    </ComboboxControl>
    <ComboboxPositioner>
      <ComboboxContent :class="styles.content">
        <ComboboxEmpty>No countries found.</ComboboxEmpty>
        <ComboboxItemGroup v-for="[continent, items] in collection.group()" :key="continent">
          <ComboboxItemGroupLabel>{{ continent }}</ComboboxItemGroupLabel>
          <ComboboxOption v-for="item in items" :key="item.code" :item="item">
            {{ item.country }}
          </ComboboxOption>
        </ComboboxItemGroup>
      </ComboboxContent>
    </ComboboxPositioner>
  </Combobox>
</template>