<script setup lang="ts">
import { createListCollection } from '@ark-ui/vue/collection';
import {
  useCombobox,
  ComboboxClearTrigger,
  ComboboxContent,
  ComboboxControl,
  ComboboxInput,
  ComboboxLabel,
  ComboboxList,
  ComboboxOption,
  ComboboxPositioner,
  ComboboxRootProvider,
  ComboboxTrigger,
} from '@moduix/vue/combobox';

const jobTitles = [
  { label: 'Designer', value: 'designer' },
  { label: 'Developer', value: 'developer' },
  { label: 'Product Manager', value: 'product-manager' },
];
const collection = createListCollection({ items: jobTitles });
const combobox = useCombobox({ collection });
</script>

<template>
  <ComboboxRootProvider :value="combobox">
    <ComboboxLabel>Job title</ComboboxLabel>
    <ComboboxControl>
      <ComboboxInput />
      <ComboboxClearTrigger aria-label="Clear selection" />
      <ComboboxTrigger aria-label="Open options" />
    </ComboboxControl>
    <ComboboxPositioner>
      <ComboboxContent>
        <ComboboxList>
          <ComboboxOption v-for="item in collection.items" :key="item.value" :item="item">
            {{ item.label }}
          </ComboboxOption>
        </ComboboxList>
      </ComboboxContent>
    </ComboboxPositioner>
  </ComboboxRootProvider>
</template>