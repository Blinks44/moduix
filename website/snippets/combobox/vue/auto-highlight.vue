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
import styles from '@/components/examples/combobox/component-auto-highlight.module.css';

const departments = [
  { label: 'Engineering', value: 'engineering' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Sales', value: 'sales' },
  { label: 'Finance', value: 'finance' },
  { label: 'Human Resources', value: 'human-resources' },
  { label: 'Operations', value: 'operations' },
];
const filterOptions = useFilter({ sensitivity: 'base' });
const { collection, filter } = useListCollection({
  initialItems: departments,
  filter: (itemText, filterText) => filterOptions.value.contains(itemText, filterText),
});
</script>

<template>
  <Combobox
    :collection="collection"
    input-behavior="autohighlight"
    @input-value-change="filter($event.inputValue)"
  >
    <ComboboxLabel>Department</ComboboxLabel>
    <ComboboxControl>
      <ComboboxInput placeholder="e.g. Engineering" />
      <ComboboxClearTrigger aria-label="Clear selection" />
      <ComboboxTrigger aria-label="Open options" />
    </ComboboxControl>
    <ComboboxPositioner>
      <ComboboxContent :class="styles.content">
        <ComboboxEmpty>No departments found.</ComboboxEmpty>
        <ComboboxList>
          <ComboboxOption v-for="item in collection.items" :key="item.value" :item="item">
            {{ item.label }}
          </ComboboxOption>
        </ComboboxList>
      </ComboboxContent>
    </ComboboxPositioner>
  </Combobox>
</template>