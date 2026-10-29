<script setup lang="ts">
import { useListCollection } from '@ark-ui/vue/collection';
import { useFilter } from '@ark-ui/vue/locale';
import { Check as CheckIcon, ChevronsUpDown as ChevronsUpDownIcon, X as XIcon } from '@lucide/vue';
import { CloseButton } from '@moduix/vue/close-button';
import {
  Combobox,
  ComboboxClearTrigger,
  ComboboxContent,
  ComboboxControl,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxLabel,
  ComboboxList,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxItemText,
  ComboboxPositioner,
  ComboboxTrigger,
} from '@moduix/vue/combobox';

const fruits = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Mango', value: 'mango' },
];
const filterOptions = useFilter({ sensitivity: 'base' });
const { collection, filter } = useListCollection({
  initialItems: fruits,
  filter: (itemText, filterText) => filterOptions.value.contains(itemText, filterText),
});
</script>

<template>
  <Combobox :collection="collection" @input-value-change="filter($event.inputValue)">
    <ComboboxLabel>Choose fruit</ComboboxLabel>
    <ComboboxControl>
      <ComboboxInput placeholder="e.g. Mango" />
      <ComboboxClearTrigger as-child aria-label="Clear selection">
        <CloseButton><XIcon :stroke-width="3" /></CloseButton>
      </ComboboxClearTrigger>
      <ComboboxTrigger aria-label="Open options">
        <ChevronsUpDownIcon :stroke-width="3" />
      </ComboboxTrigger>
    </ComboboxControl>
    <ComboboxPositioner>
      <ComboboxContent>
        <ComboboxEmpty>No fruits found.</ComboboxEmpty>
        <ComboboxList>
          <ComboboxItem v-for="item in collection.items" :key="item.value" :item="item">
            <ComboboxItemText>{{ item.label }}</ComboboxItemText>
            <ComboboxItemIndicator>
              <CheckIcon :stroke-width="3" />
            </ComboboxItemIndicator>
          </ComboboxItem>
        </ComboboxList>
      </ComboboxContent>
    </ComboboxPositioner>
  </Combobox>
</template>