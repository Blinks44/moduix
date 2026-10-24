<script setup lang="ts">
import { useListCollection } from '@ark-ui/vue/collection';
import type { ComboboxInputValueChangeDetails } from '@ark-ui/vue/combobox';
import {
  Combobox,
  ComboboxContent,
  ComboboxControl,
  ComboboxInput,
  ComboboxLabel,
  ComboboxList,
  ComboboxOption,
  ComboboxPositioner,
  ComboboxTrigger,
} from '@moduix/vue/combobox';

const domains = ['gmail.com', 'outlook.com', 'proton.me'];
const { collection, set } = useListCollection<string>({ initialItems: [] });

function handleInputValueChange(details: ComboboxInputValueChangeDetails) {
  if (details.reason !== 'input-change') return;
  const name = details.inputValue.trim();
  set(name ? domains.map((domain) => name + '@' + domain) : []);
}
</script>

<template>
  <Combobox :collection="collection" @input-value-change="handleInputValueChange">
    <ComboboxLabel>Email</ComboboxLabel>
    <ComboboxControl>
      <ComboboxInput placeholder="e.g. alex" />
      <ComboboxTrigger aria-label="Open options" />
    </ComboboxControl>
    <ComboboxPositioner>
      <ComboboxContent>
        <ComboboxList>
          <ComboboxOption v-for="item in collection.items" :key="item" :item="item">
            {{ item }}
          </ComboboxOption>
        </ComboboxList>
      </ComboboxContent>
    </ComboboxPositioner>
  </Combobox>
</template>